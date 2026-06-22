package com.example.railone

import android.graphics.Color
import android.os.Bundle
import android.os.CountDownTimer
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat

class BookingDetailsActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_FROM_STATION = TicketDataStore.FROM_STATION
        const val EXTRA_TO_STATION = TicketDataStore.TO_STATION
        const val EXTRA_ROUTE_DISTANCE = TicketDataStore.ROUTE_DISTANCE
        const val EXTRA_VIA = TicketDataStore.VIA
        const val EXTRA_JOURNEY_CODE = TicketDataStore.JOURNEY_CODE
        const val EXTRA_PASSENGER_COUNT = TicketDataStore.PASSENGER_COUNT
        const val EXTRA_BOOKED_ON = TicketDataStore.BOOKED_ON
        const val EXTRA_VALID_TILL = TicketDataStore.VALID_TILL
        const val EXTRA_CLASS_FARE = TicketDataStore.CLASS_FARE
        const val EXTRA_BOOKING_DATE_LARGE = TicketDataStore.BOOKING_DATE_LARGE
    }

    // 5 minutes = 300,000 ms; tick every second
    private val TIMER_DURATION_MS = 300_000L
    private val TIMER_INTERVAL_MS = 1_000L

    private lateinit var tvTimerMinutes: TextView
    private lateinit var tvTimerSecondsColon: TextView
    private var countDownTimer: CountDownTimer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_booking_details)

        WindowCompat.setDecorFitsSystemWindows(window, true)
        window.statusBarColor = Color.parseColor("#1565C0")
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = false

        tvTimerMinutes = findViewById(R.id.tvTimerMinutes)
        tvTimerSecondsColon = findViewById(R.id.tvTimerSecondsColon)

        findViewById<View>(R.id.btnBackDetails).setOnClickListener { finish() }
        findViewById<View>(R.id.btnShare).setOnClickListener {
            Toast.makeText(this, "Share", Toast.LENGTH_SHORT).show()
        }
        findViewById<View>(R.id.btnBookConnecting).setOnClickListener {
            Toast.makeText(this, "Book Connecting Journey", Toast.LENGTH_SHORT).show()
        }

        applyInputOverrides()
        startCountdown()
    }

    private fun applyInputOverrides() {
        applyTextIfProvided(R.id.tvFromStation, EXTRA_FROM_STATION)
        applyTextIfProvided(R.id.tvToStation, EXTRA_TO_STATION)
        applyTextIfProvided(R.id.tvRouteDistance, EXTRA_ROUTE_DISTANCE)
        applyTextIfProvided(R.id.tvViaValue, EXTRA_VIA)
        applyTextIfProvided(R.id.tvJourneyTicketCode, EXTRA_JOURNEY_CODE)
        applyTextIfProvided(R.id.tvPassengerCount, EXTRA_PASSENGER_COUNT)
        applyTextIfProvided(R.id.tvBookedOnValue, EXTRA_BOOKED_ON)
        applyTextIfProvided(R.id.tvValidTillValue, EXTRA_VALID_TILL)
        applyTextIfProvided(R.id.tvClassFareInfo, EXTRA_CLASS_FARE)
        applyTextIfProvided(R.id.tvBookingDateLarge, EXTRA_BOOKING_DATE_LARGE)
    }

    private fun applyTextIfProvided(viewId: Int, key: String) {
        val intentValue = intent.getStringExtra(key)?.trim().orEmpty()
        val value = if (intentValue.isNotEmpty()) {
            TicketDataStore.save(this, key, intentValue)
            intentValue
        } else {
            TicketDataStore.read(this, key)
        }
        if (value.isNotEmpty()) {
            findViewById<TextView>(viewId).text = value
        }
    }

    private fun startCountdown() {
        countDownTimer = object : CountDownTimer(TIMER_DURATION_MS, TIMER_INTERVAL_MS) {
            override fun onTick(millisUntilFinished: Long) {
                val totalSeconds = millisUntilFinished / 1000L
                val minutes = totalSeconds / 60
                val seconds = totalSeconds % 60
                tvTimerMinutes.text = String.format("%02d", minutes)
                tvTimerSecondsColon.text = String.format(":%02d", seconds)
            }

            override fun onFinish() {
                tvTimerMinutes.text = "00"
                tvTimerSecondsColon.text = ":00"
                tvTimerMinutes.setTextColor(Color.parseColor("#888888"))
                tvTimerSecondsColon.setTextColor(Color.parseColor("#888888"))
            }
        }.start()
    }

    override fun onDestroy() {
        super.onDestroy()
        countDownTimer?.cancel()
    }
}

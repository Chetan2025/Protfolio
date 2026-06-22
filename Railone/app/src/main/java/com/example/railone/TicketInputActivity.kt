package com.example.railone

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat

class TicketInputActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ticket_input)

        WindowCompat.setDecorFitsSystemWindows(window, true)
        window.statusBarColor = Color.parseColor("#1565C0")
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = false

        findViewById<TextView>(R.id.btnBackInput).setOnClickListener { finish() }
        findViewById<TextView>(R.id.btnApplyTicket).setOnClickListener {
            val intent = Intent(this, BookingDetailsActivity::class.java)

            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_FROM_STATION, R.id.etFromStation)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_TO_STATION, R.id.etToStation)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_ROUTE_DISTANCE, R.id.etRouteDistance)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_VIA, R.id.etVia)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_JOURNEY_CODE, R.id.etJourneyCode)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_PASSENGER_COUNT, R.id.etPassengerCount)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_BOOKED_ON, R.id.etBookedOn)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_VALID_TILL, R.id.etValidTill)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_CLASS_FARE, R.id.etClassFare)
            putIfNotBlank(intent, BookingDetailsActivity.EXTRA_BOOKING_DATE_LARGE, R.id.etBookingDateLarge)

            startActivity(intent)
        }
    }

    private fun putIfNotBlank(intent: Intent, key: String, editTextId: Int) {
        val value = findViewById<EditText>(editTextId).text.toString().trim()
        if (value.isNotEmpty()) {
            intent.putExtra(key, value)
            TicketDataStore.save(this, key, value)
        }
    }
}

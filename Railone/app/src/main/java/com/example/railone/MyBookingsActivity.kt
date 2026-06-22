package com.example.railone

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.animation.ObjectAnimator
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MyBookingsActivity : AppCompatActivity() {

    private lateinit var tabUpcoming: LinearLayout
    private lateinit var tabCompleted: LinearLayout
    private lateinit var tabCancelled: LinearLayout
    private lateinit var tabAll: LinearLayout

    private lateinit var textUpcoming: TextView
    private lateinit var textCompleted: TextView
    private lateinit var textCancelled: TextView
    private lateinit var textAll: TextView

    private lateinit var iconUpcoming: ImageView
    private lateinit var iconCompleted: ImageView
    private lateinit var iconCancelled: ImageView
    private lateinit var iconAll: ImageView
    private lateinit var bookingContent: LinearLayout
    private lateinit var bookingEmptyState: LinearLayout
    private lateinit var ticketSectionTitle: TextView
    private lateinit var swipeRefreshBookings: SwipeRefreshLayout
    private lateinit var refreshIcon: ImageView
    private lateinit var tvMyUtsCode: TextView
    private lateinit var tvMyBookingDate: TextView
    private lateinit var tvMyFromStation: TextView
    private lateinit var tvMyRouteDistance: TextView
    private lateinit var tvMyToStation: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_bookings)

        WindowCompat.setDecorFitsSystemWindows(window, true)
        window.statusBarColor = Color.parseColor("#1565C0")
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = false

        tabUpcoming = findViewById(R.id.tabUpcoming)
        tabCompleted = findViewById(R.id.tabCompleted)
        tabCancelled = findViewById(R.id.tabCancelled)
        tabAll = findViewById(R.id.tabAll)

        textUpcoming = findViewById(R.id.textUpcoming)
        textCompleted = findViewById(R.id.textCompleted)
        textCancelled = findViewById(R.id.textCancelled)
        textAll = findViewById(R.id.textAll)

        iconUpcoming = findViewById(R.id.iconUpcoming)
        iconCompleted = findViewById(R.id.iconCompleted)
        iconCancelled = findViewById(R.id.iconCancelled)
        iconAll = findViewById(R.id.iconAll)
        bookingContent = findViewById(R.id.bookingContent)
        bookingEmptyState = findViewById(R.id.bookingEmptyState)
        ticketSectionTitle = findViewById(R.id.tvTicketSectionTitle)
        swipeRefreshBookings = findViewById(R.id.swipeRefreshBookings)
        refreshIcon = findViewById(R.id.btnRefreshTicket)
        tvMyUtsCode = findViewById(R.id.tvMyUtsCode)
        tvMyBookingDate = findViewById(R.id.tvMyBookingDate)
        tvMyFromStation = findViewById(R.id.tvMyFromStation)
        tvMyRouteDistance = findViewById(R.id.tvMyRouteDistance)
        tvMyToStation = findViewById(R.id.tvMyToStation)

        swipeRefreshBookings.setColorSchemeColors(Color.parseColor("#1565C0"))
        swipeRefreshBookings.setOnRefreshListener { performDummyRefresh() }

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        findViewById<View>(R.id.btnSort).setOnClickListener { }
        findViewById<View>(R.id.btnRefreshTicket).setOnClickListener { performDummyRefresh() }
        findViewById<View>(R.id.btnViewDetails).setOnClickListener {
            startActivity(Intent(this, BookingDetailsActivity::class.java))
        }

        tabUpcoming.setOnClickListener { selectTab("upcoming") }
        tabCompleted.setOnClickListener { selectTab("completed") }
        tabCancelled.setOnClickListener { selectTab("cancelled") }
        tabAll.setOnClickListener { selectTab("all") }

        applyStoredTicketDataToCard()
        selectTab("upcoming")
    }

    override fun onResume() {
        super.onResume()
        applyStoredTicketDataToCard()
    }

    private fun applyStoredTicketDataToCard() {
        val journeyCode = TicketDataStore.read(this, TicketDataStore.JOURNEY_CODE)
        val bookingDate = TicketDataStore.read(this, TicketDataStore.BOOKING_DATE_LARGE)
        val fromStation = TicketDataStore.read(this, TicketDataStore.FROM_STATION)
        val routeDistance = TicketDataStore.read(this, TicketDataStore.ROUTE_DISTANCE)
        val toStation = TicketDataStore.read(this, TicketDataStore.TO_STATION)

        if (journeyCode.isNotEmpty()) {
            tvMyUtsCode.text = "UTS: $journeyCode"
        }
        if (bookingDate.isNotEmpty()) {
            tvMyBookingDate.text = bookingDate
        }
        if (fromStation.isNotEmpty()) {
            tvMyFromStation.text = fromStation
        }
        if (routeDistance.isNotEmpty()) {
            tvMyRouteDistance.text = routeDistance
        }
        if (toStation.isNotEmpty()) {
            tvMyToStation.text = toStation
        }
    }

    private fun selectTab(tab: String) {
        setTabStyle(tabUpcoming, textUpcoming, iconUpcoming, tab == "upcoming")
        setTabStyle(tabCompleted, textCompleted, iconCompleted, tab == "completed")
        setTabStyle(tabCancelled, textCancelled, iconCancelled, tab == "cancelled")
        setTabStyle(tabAll, textAll, iconAll, tab == "all")

        when (tab) {
            "upcoming" -> {
                ticketSectionTitle.text = "Upcoming (1)"
                bookingContent.visibility = View.VISIBLE
                bookingEmptyState.visibility = View.GONE
            }

            "all" -> {
                ticketSectionTitle.text = "All (1)"
                bookingContent.visibility = View.VISIBLE
                bookingEmptyState.visibility = View.GONE
            }

            "completed" -> {
                ticketSectionTitle.text = "Completed (0)"
                bookingContent.visibility = View.GONE
                bookingEmptyState.visibility = View.VISIBLE
            }

            else -> {
                ticketSectionTitle.text = "Cancelled (0)"
                bookingContent.visibility = View.GONE
                bookingEmptyState.visibility = View.VISIBLE
            }
        }
    }

    private fun setTabStyle(layout: LinearLayout, textView: TextView, iconView: ImageView, selected: Boolean) {
        if (selected) {
            layout.setBackgroundResource(R.drawable.bg_booking_tab_selected)
            textView.setTextColor(Color.parseColor("#D69A3A"))
            textView.paint.isFakeBoldText = true
            iconView.setColorFilter(Color.parseColor("#D69A3A"))
        } else {
            layout.setBackgroundResource(R.drawable.bg_booking_tab_unselected)
            textView.setTextColor(Color.parseColor("#757A88"))
            textView.paint.isFakeBoldText = false
            iconView.setColorFilter(Color.parseColor("#8C8E96"))
        }
    }

    private fun performDummyRefresh() {
        swipeRefreshBookings.isRefreshing = true

        ObjectAnimator.ofFloat(refreshIcon, View.ROTATION, refreshIcon.rotation, refreshIcon.rotation + 720f).apply {
            duration = 900
            start()
        }

        Handler(Looper.getMainLooper()).postDelayed({
            swipeRefreshBookings.isRefreshing = false
        }, 1000)
    }
}

package com.example.railone

import android.content.Context

object TicketDataStore {
    const val FROM_STATION = "extra_from_station"
    const val TO_STATION = "extra_to_station"
    const val ROUTE_DISTANCE = "extra_route_distance"
    const val VIA = "extra_via"
    const val JOURNEY_CODE = "extra_journey_code"
    const val PASSENGER_COUNT = "extra_passenger_count"
    const val BOOKED_ON = "extra_booked_on"
    const val VALID_TILL = "extra_valid_till"
    const val CLASS_FARE = "extra_class_fare"
    const val BOOKING_DATE_LARGE = "extra_booking_date_large"

    private const val PREFS_NAME = "railone_ticket_data"

    fun save(context: Context, key: String, value: String) {
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            .edit()
            .putString(key, value)
            .apply()
    }

    fun read(context: Context, key: String): String {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            .getString(key, "")
            .orEmpty()
    }
}

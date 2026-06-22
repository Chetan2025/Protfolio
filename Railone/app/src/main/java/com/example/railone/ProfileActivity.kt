package com.example.railone

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.LinearLayout
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat

class ProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        WindowCompat.setDecorFitsSystemWindows(window, true)
        window.statusBarColor = Color.parseColor("#D7F1FB")
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = true

        findViewById<View>(R.id.btnProfileBack).setOnClickListener { finish() }

        bindClick(R.id.cardChangePassword, "Change Password")
        bindClick(R.id.cardMyAccount, "My Account")
        bindClick(R.id.cardBiometric, "Biometric")
        bindClick(R.id.cardTransferTicket, "Transfer Ticket")
        bindClick(R.id.cardTransaction, "My Transaction")
        bindClick(R.id.cardAadhaar, "Link Your Aadhar")

        findViewById<LinearLayout>(R.id.navHome).setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
        findViewById<LinearLayout>(R.id.navBookings).setOnClickListener {
            startActivity(Intent(this, MyBookingsActivity::class.java))
            finish()
        }
        findViewById<LinearLayout>(R.id.navYou).setOnClickListener { }
        findViewById<LinearLayout>(R.id.navMenu).setOnClickListener {
            Toast.makeText(this, "Menu", Toast.LENGTH_SHORT).show()
        }
    }

    private fun bindClick(viewId: Int, label: String) {
        findViewById<View>(viewId).setOnClickListener {
            Toast.makeText(this, label, Toast.LENGTH_SHORT).show()
        }
    }
}

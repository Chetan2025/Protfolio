package com.example.railone

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Make status bar light (white icons on light background)
        WindowCompat.setDecorFitsSystemWindows(window, true)
        window.statusBarColor = Color.WHITE
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightStatusBars = true

        // Bottom nav click listeners
        val drawerLayout = findViewById<DrawerLayout>(R.id.drawerLayout)
        val navHome = findViewById<LinearLayout>(R.id.navHome)
        val navBookings = findViewById<LinearLayout>(R.id.navBookings)
        val navYou = findViewById<LinearLayout>(R.id.navYou)
        val navMenu = findViewById<LinearLayout>(R.id.navMenu)

        navHome.setOnClickListener {
            setNavSelected(navHome, navBookings, navYou, navMenu)
            if (drawerLayout.isDrawerOpen(GravityCompat.END)) {
                drawerLayout.closeDrawer(GravityCompat.END)
            }
        }
        navBookings.setOnClickListener {
            setNavSelected(navBookings, navHome, navYou, navMenu)
            if (drawerLayout.isDrawerOpen(GravityCompat.END)) {
                drawerLayout.closeDrawer(GravityCompat.END)
            }
            startActivity(Intent(this, MyBookingsActivity::class.java))
        }
        navYou.setOnClickListener {
            setNavSelected(navYou, navHome, navBookings, navMenu)
            if (drawerLayout.isDrawerOpen(GravityCompat.END)) {
                drawerLayout.closeDrawer(GravityCompat.END)
            }
            startActivity(Intent(this, ProfileActivity::class.java))
        }
        navMenu.setOnClickListener {
            setNavSelected(navMenu, navHome, navBookings, navYou)
            if (!drawerLayout.isDrawerOpen(GravityCompat.END)) {
                drawerLayout.openDrawer(GravityCompat.END)
            }
        }

        // Journey planner click listeners
        bindClick(R.id.jpReserved, "Reserved")
        bindClick(R.id.jpUnreserved, "Unreserved")
        bindClick(R.id.jpPlatform, "Platform")

        // More offerings click listeners
        bindClick(R.id.offerSearchTrains, "Search Trains")
        bindClick(R.id.offerPnrStatus, "PNR Status")
        bindClick(R.id.offerCoachPosition, "Coach Position")
        bindClick(R.id.offerTrackTrain, "Track Your Train")
        bindClick(R.id.cardOrderFood, "Order Food")
        bindClick(R.id.cardFileRefund, "File Refund")
        bindClick(R.id.cardRailMadad, "Rail Madad")
        bindClick(R.id.cardWaves, "Go To WAVES")

        // Social media click listeners
        findViewById<View>(R.id.btnSocialX).setOnClickListener {
            Toast.makeText(this, "X (Twitter)", Toast.LENGTH_SHORT).show()
        }
        findViewById<View>(R.id.btnSocialFb).setOnClickListener {
            Toast.makeText(this, "Facebook", Toast.LENGTH_SHORT).show()
        }
        findViewById<View>(R.id.btnSocialIg).setOnClickListener {
            Toast.makeText(this, "Instagram", Toast.LENGTH_SHORT).show()
        }
        findViewById<View>(R.id.btnSocialYt).setOnClickListener {
            Toast.makeText(this, "YouTube", Toast.LENGTH_SHORT).show()
        }

        // Notification button
        findViewById<View>(R.id.btnNotification).setOnClickListener {
            Toast.makeText(this, "Notifications", Toast.LENGTH_SHORT).show()
        }

        // Language button
        findViewById<View>(R.id.btnLanguage).setOnClickListener {
            Toast.makeText(this, "Language Toggle", Toast.LENGTH_SHORT).show()
        }

        // Drawer menu: open ticket input screen
        findViewById<View>(R.id.menuShowHideServices).setOnClickListener {
            if (drawerLayout.isDrawerOpen(GravityCompat.END)) {
                drawerLayout.closeDrawer(GravityCompat.END)
            }
            startActivity(Intent(this, TicketInputActivity::class.java))
        }
    }

    private fun setNavSelected(selected: LinearLayout, vararg others: LinearLayout) {
        // Selected: white text, others: light blue text
        updateNavItem(selected, "#FFFFFF", true)
        for (other in others) {
            updateNavItem(other, "#90CAF9", false)
        }
    }

    private fun bindClick(viewId: Int, label: String) {
        findViewById<View?>(viewId)?.setOnClickListener {
            Toast.makeText(this, label, Toast.LENGTH_SHORT).show()
        }
    }

    private fun updateNavItem(nav: LinearLayout, colorHex: String, bold: Boolean) {
        for (i in 0 until nav.childCount) {
            val child = nav.getChildAt(i)
            if (child is TextView) {
                child.setTextColor(Color.parseColor(colorHex))
                child.paint.isFakeBoldText = bold
            }
        }
    }
}

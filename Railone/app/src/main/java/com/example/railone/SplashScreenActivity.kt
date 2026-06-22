package com.example.railone

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.animation.AnimationUtils
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity

class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)

        val splashLogo = findViewById<ImageView>(R.id.splashLogo)
        splashLogo.setImageBitmap(trimWhiteBorder(BitmapFactory.decodeResource(resources, R.drawable.logo)))

        // Load zoom animation
        val zoomAnim = AnimationUtils.loadAnimation(this, R.anim.splash_zoom_in)

        // Start zoom animation on logo immediately
        splashLogo.startAnimation(zoomAnim)

        // After zoom animation (1.5s) + delay, go to mPIN page
        Handler(Looper.getMainLooper()).postDelayed({
            startActivity(Intent(this, LoginMpinActivity::class.java))
            finish()
            // Fade transition
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
        }, 1700) // 1500 (zoom) + 200 buffer
    }

    private fun trimWhiteBorder(source: Bitmap): Bitmap {
        val width = source.width
        val height = source.height
        val tolerance = 245

        var left = width
        var top = height
        var right = -1
        var bottom = -1

        for (y in 0 until height) {
            for (x in 0 until width) {
                val pixel = source.getPixel(x, y)
                val red = Color.red(pixel)
                val green = Color.green(pixel)
                val blue = Color.blue(pixel)

                if (red < tolerance || green < tolerance || blue < tolerance) {
                    if (x < left) left = x
                    if (x > right) right = x
                    if (y < top) top = y
                    if (y > bottom) bottom = y
                }
            }
        }

        if (right < left || bottom < top) {
            return source
        }

        val padding = 24
        val safeLeft = (left - padding).coerceAtLeast(0)
        val safeTop = (top - padding).coerceAtLeast(0)
        val safeRight = (right + padding).coerceAtMost(width - 1)
        val safeBottom = (bottom + padding).coerceAtMost(height - 1)

        return Bitmap.createBitmap(
            source,
            safeLeft,
            safeTop,
            safeRight - safeLeft + 1,
            safeBottom - safeTop + 1
        )
    }
}


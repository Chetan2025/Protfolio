package com.example.railone

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.InputFilter
import android.text.TextWatcher
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.getSystemService

class LoginMpinActivity : AppCompatActivity() {

    private lateinit var etHiddenMpin: EditText
    private lateinit var boxes: List<TextView>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login_mpin)

        etHiddenMpin = findViewById(R.id.etHiddenMpin)
        boxes = listOf(
            findViewById(R.id.mpinBox1),
            findViewById(R.id.mpinBox2),
            findViewById(R.id.mpinBox3),
            findViewById(R.id.mpinBox4),
            findViewById(R.id.mpinBox5),
            findViewById(R.id.mpinBox6)
        )

        etHiddenMpin.filters = arrayOf(InputFilter.LengthFilter(6))

        findViewById<LinearLayout>(R.id.mpinBoxRow).setOnClickListener {
            focusMpinInput()
        }

        etHiddenMpin.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) = Unit
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) = Unit

            override fun afterTextChanged(s: Editable?) {
                val value = s?.toString().orEmpty()
                renderBoxes(value)

                if (value.length == 6) {
                    if (value == "976400") {
                        startActivity(Intent(this@LoginMpinActivity, MainActivity::class.java))
                        finish()
                    } else {
                        Toast.makeText(this@LoginMpinActivity, "Invalid mPIN", Toast.LENGTH_SHORT).show()
                        etHiddenMpin.text?.clear()
                    }
                }
            }
        })

        etHiddenMpin.post { focusMpinInput() }
    }

    private fun renderBoxes(value: String) {
        for (i in boxes.indices) {
            boxes[i].text = if (i < value.length) "*" else ""
        }
    }

    private fun focusMpinInput() {
        etHiddenMpin.requestFocus()
        val imm = getSystemService<InputMethodManager>()
        imm?.showSoftInput(etHiddenMpin, InputMethodManager.SHOW_IMPLICIT)
    }
}

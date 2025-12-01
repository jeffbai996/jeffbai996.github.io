import { useState, useRef, useEffect } from 'react'
import './OTPInput.css'

export default function OTPInput({ length = 6, onComplete, disabled = false, error = null }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const inputRefs = useRef([])

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // Reset when error changes
  useEffect(() => {
    if (error) {
      setValues(Array(length).fill(''))
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }
  }, [error, length])

  const handleChange = (index, value) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1)

    const newValues = [...values]
    newValues[index] = digit
    setValues(newValues)

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }

    // Check if complete
    if (digit && index === length - 1) {
      const code = newValues.join('')
      if (code.length === length) {
        onComplete?.(code)
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!values[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1].focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)

    if (pastedData) {
      const newValues = [...values]
      for (let i = 0; i < pastedData.length; i++) {
        newValues[i] = pastedData[i]
      }
      setValues(newValues)

      // Focus last filled or next empty input
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex].focus()

      // Check if complete
      if (pastedData.length === length) {
        onComplete?.(pastedData)
      }
    }
  }

  return (
    <div className={`otp-input-container ${error ? 'otp-error' : ''}`}>
      <div className="otp-inputs">
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className="otp-input"
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && <p className="otp-error-message">{error}</p>}
    </div>
  )
}

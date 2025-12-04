import React, { useState, useEffect } from 'react'
import './FeeCalculator.css'

export default function FeeCalculator({
  title = 'Fee Calculator',
  fields = [],
  calculateFee,
  currency = '¤',
  showBreakdown = true
}) {
  const [values, setValues] = useState({})
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

  // Initialize values
  useEffect(() => {
    const initialValues = {}
    fields.forEach(field => {
      initialValues[field.id] = field.defaultValue || ''
    })
    setValues(initialValues)
  }, [fields])

  const handleChange = (fieldId, value) => {
    setValues(prev => ({ ...prev, [fieldId]: value }))

    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    fields.forEach(field => {
      const value = values[field.id]

      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required`
      }

      if (field.validation && value) {
        const error = field.validation(value)
        if (error) {
          newErrors[field.id] = error
        }
      }

      if (field.type === 'number' && value) {
        const num = parseFloat(value)
        if (isNaN(num)) {
          newErrors[field.id] = 'Please enter a valid number'
        } else if (field.min !== undefined && num < field.min) {
          newErrors[field.id] = `Minimum value is ${field.min}`
        } else if (field.max !== undefined && num > field.max) {
          newErrors[field.id] = `Maximum value is ${field.max}`
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCalculate = () => {
    if (!validate()) {
      return
    }

    const calculationResult = calculateFee(values)
    setResult(calculationResult)
  }

  const handleReset = () => {
    const initialValues = {}
    fields.forEach(field => {
      initialValues[field.id] = field.defaultValue || ''
    })
    setValues(initialValues)
    setResult(null)
    setErrors({})
  }

  const renderField = (field) => {
    const value = values[field.id] || ''
    const error = errors[field.id]

    switch (field.type) {
      case 'number':
        return (
          <input
            type="number"
            className={`calculator-input ${error ? 'error' : ''}`}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step || '1'}
          />
        )

      case 'select':
        return (
          <select
            className={`calculator-input ${error ? 'error' : ''}`}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="radio-group">
            {field.options.map((option) => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
                <span className="radio-label">{option.label}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={value === true || value === 'true'}
              onChange={(e) => handleChange(field.id, e.target.checked)}
            />
            <span>{field.checkboxLabel || field.label}</span>
          </label>
        )

      default:
        return (
          <input
            type="text"
            className={`calculator-input ${error ? 'error' : ''}`}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
          />
        )
    }
  }

  return (
    <div className="fee-calculator">
      <div className="calculator-header">
        <h3 className="calculator-title">{title}</h3>
      </div>

      <div className="calculator-body">
        <div className="calculator-form">
          {fields.map((field) => (
            <div key={field.id} className="form-field">
              <label className="field-label">
                {field.label}
                {field.required && <span className="required-mark">*</span>}
              </label>
              {field.description && (
                <div className="field-description">{field.description}</div>
              )}
              {renderField(field)}
              {errors[field.id] && (
                <div className="field-error">{errors[field.id]}</div>
              )}
            </div>
          ))}

          <div className="calculator-actions">
            <button
              className="btn btn-primary calculator-btn"
              onClick={handleCalculate}
            >
              Calculate Fee
            </button>
            <button
              className="btn btn-secondary calculator-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="calculator-result">
            <div className="result-header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
              <h4>Calculation Result</h4>
            </div>

            <div className="result-total">
              <span className="result-label">Total Fee:</span>
              <span className="result-amount">
                {currency}{typeof result.total === 'number' ? result.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : result.total}
              </span>
            </div>

            {showBreakdown && result.breakdown && result.breakdown.length > 0 && (
              <div className="result-breakdown">
                <div className="breakdown-title">Fee Breakdown:</div>
                {result.breakdown.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <span className="breakdown-label">{item.label}</span>
                    <span className="breakdown-value">
                      {currency}{typeof item.amount === 'number' ? item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.amount}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {result.notes && (
              <div className="result-notes">
                <strong>Notes:</strong>
                <ul>
                  {result.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { describe, it, expect } from 'vitest'
import { redactSensitiveText } from '../privacy'

describe('redactSensitiveText', () => {
  it('redacts common personal identifiers before text leaves the browser', () => {
    const text = [
      'Email me at citizen@example.com.',
      'My phone is +1 (555) 123-4567.',
      'SSN 123-45-6789.',
      'Card 4111 1111 1111 1111.',
      'DOB: 1990-04-12.',
    ].join(' ')

    expect(redactSensitiveText(text)).toBe(
      'Email me at [email redacted]. My phone is [phone redacted]. SSN [national id redacted]. Card [card redacted]. DOB: [date redacted].'
    )
  })

  it('leaves ordinary service questions readable', () => {
    expect(redactSensitiveText('How do I renew my passport at IMMD?')).toBe('How do I renew my passport at IMMD?')
  })
})

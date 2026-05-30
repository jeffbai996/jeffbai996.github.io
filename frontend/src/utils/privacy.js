const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
const CARD_RE = /\b(?:\d[ -]*?){13,19}\b/g
const NATIONAL_ID_RE = /\b\d{3}-\d{2}-\d{4}\b/g
const PHONE_RE = /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}\b/g
const LABELED_DATE_RE = /\b(DOB|date of birth|birth date)\s*:\s*\d{4}-\d{2}-\d{2}\b/gi

export function redactSensitiveText(text = '') {
  return String(text)
    .replace(EMAIL_RE, '[email redacted]')
    .replace(CARD_RE, '[card redacted]')
    .replace(NATIONAL_ID_RE, '[national id redacted]')
    .replace(PHONE_RE, '[phone redacted]')
    .replace(LABELED_DATE_RE, '$1: [date redacted]')
}

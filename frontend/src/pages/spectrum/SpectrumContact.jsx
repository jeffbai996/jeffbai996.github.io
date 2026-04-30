import { useState } from 'react'

const FAQ = [
  { q: 'Do you deliver?', a: "We don't currently offer delivery. All purchases are made in-store. Online ordering with in-store pickup is launching Q3 2026." },
  { q: 'Can I pre-order online?', a: 'Online ordering launches Q3 2026. Until then, please visit any of our 6 stores to purchase.' },
  { q: 'Do I need to be a Praya citizen to shop?', a: 'No. You must be 19 or older with a valid government-issued photo ID. Praya residents and visitors are both welcome.' },
  { q: "What's your return policy?", a: "Defective or damaged products can be returned within 30 days with proof of purchase. Cannabis products themselves are non-returnable once opened." },
  { q: 'How do I get a wholesale account?', a: 'Use the contact form with subject "Wholesale" and someone from our wholesale team will reach out within 1-2 business days.' }
]

export default function SpectrumContact() {
  const [open, setOpen] = useState(null)
  const [toast, setToast] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setToast("Thanks — we'll be in touch within 1-2 business days.")
    e.target.reset()
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <section className="sp-section container">
      <h1 style={{ textTransform: 'lowercase' }}>contact</h1>
      <p style={{ color: 'var(--sp-muted)', marginTop: '8px', marginBottom: '32px' }}>Reach our team — we read every message.</p>

      <div className="sp-contact-grid">
        <form className="sp-contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="contact-subject">Subject</label>
            <select id="contact-subject" name="subject" required defaultValue="">
              <option value="" disabled>Select a topic</option>
              <option value="general">General</option>
              <option value="wholesale">Wholesale</option>
              <option value="press">Press</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" required />
          </div>
          <button type="submit" className="sp-btn sp-btn-primary">Send message</button>
        </form>
        <aside>
          <h3 style={{ textTransform: 'lowercase' }}>general contact</h3>
          <p style={{ marginTop: '8px' }}>hello@spectrumcannabis.praya</p>
          <p>(010) 311-2200</p>
          <p style={{ color: 'var(--sp-muted)', marginTop: '16px' }}>
            Spectrum HQ<br />
            80 Leman Street<br />
            Oakville, Praya
          </p>
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Customer service hours: Mon–Fri 09:00–18:00</p>
        </aside>
      </div>

      <h2 style={{ textTransform: 'lowercase', marginBottom: '16px' }}>frequently asked</h2>
      <div>
        {FAQ.map((item, i) => (
          <div key={item.q} className="sp-faq-item">
            <button
              type="button"
              className="sp-faq-q"
              onClick={() => setOpen(o => o === i ? null : i)}
              aria-expanded={open === i}
              style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
            >
              <span>{item.q}</span>
              <span aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="sp-faq-a">{item.a}</p>}
          </div>
        ))}
      </div>

      {toast && <div className="sp-toast" role="status" aria-live="polite">{toast}</div>}
    </section>
  )
}

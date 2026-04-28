import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SEO from '../components/SEO'
import {
  DIRECTOR_GENERAL,
  VISA_CLASSES,
  CITIZENSHIP_STEPS,
  FORMS_INDEX,
  OFFICES,
  LEGISLATION,
  OVERSTAY_TIERS,
  QUICK_ACTIONS
} from '../data/immdData'
import {
  lookupStatus,
  recommendVisa,
  calculateOverstay
} from '../utils/immdLogic'
import './DeptImmigration.css'

function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDismiss, 3000)
    return () => clearTimeout(t)
  }, [message, onDismiss])
  if (!message) return null
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#0e2a47',
        color: '#fff',
        padding: '0.75rem 1.25rem',
        borderLeft: '4px solid #c9a449',
        zIndex: 2000
      }}
    >
      {message}
    </div>
  )
}
Toast.propTypes = {
  message: PropTypes.string,
  onDismiss: PropTypes.func.isRequired
}

function Modal({ isOpen, onClose, title, children }) {
  const closeRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(modalRef.current.querySelectorAll(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        {children}
        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button ref={closeRef} className="primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

function StatusChecker() {
  const [ref, setRef] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ref.trim()) return
    setResult(lookupStatus(ref.trim()))
  }

  const statusClass =
    !result ? '' :
    result.notFound ? 'status-notfound' :
    result.status === 'Approved' ? 'status-approved' :
    result.status === 'Denied' ? 'status-denied' : ''

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <label htmlFor="status-ref" style={{ flex: '1 1 200px' }}>
          <span style={{ display: 'block', marginBottom: '0.25rem' }}>Application reference</span>
          <input
            id="status-ref"
            type="text"
            value={ref}
            onChange={e => setRef(e.target.value)}
            placeholder="e.g. V2-2026-04387"
            style={{ width: '100%', padding: '0.5rem', fontFamily: 'monospace' }}
          />
        </label>
        <button type="submit" className="primary" style={{ alignSelf: 'flex-end' }}>Check Status</button>
      </form>
      <div aria-live="polite">
        {result && (
          <div className={`status-result ${statusClass}`}>
            {result.notFound ? (
              <p>No application found for reference <strong>{result.reference}</strong>. Verify the reference and try again.</p>
            ) : (
              <>
                <p><strong>Reference:</strong> {result.ref}</p>
                <p><strong>Visa class:</strong> {result.class}</p>
                <p><strong>Status:</strong> {result.status}</p>
                <p><strong>Submitted:</strong> {result.submitted}</p>
                {result.decision && <p><strong>Decision date:</strong> {result.decision}</p>}
                {result.interviewDate && <p><strong>Interview scheduled:</strong> {result.interviewDate}</p>}
                {result.denialReason && <p><strong>Reason:</strong> {result.denialReason}</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function EligibilityWizard() {
  const [duration, setDuration] = useState('')
  const [purpose, setPurpose] = useState('')
  const [hasJobOffer, setHasJobOffer] = useState(false)
  const [hasEnrollment, setHasEnrollment] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setResult(recommendVisa({ duration, purpose, hasJobOffer, hasEnrollment }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          <span style={{ display: 'block', marginBottom: '0.25rem' }}>Expected duration of stay</span>
          <select value={duration} onChange={e => setDuration(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }}>
            <option value="">— Select —</option>
            <option value="day">1 day</option>
            <option value="weeks">A few weeks</option>
            <option value="months">Several months</option>
            <option value="year">About a year</option>
            <option value="years">Multiple years</option>
          </select>
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '0.25rem' }}>Purpose of visit</span>
          <select value={purpose} onChange={e => setPurpose(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }}>
            <option value="">— Select —</option>
            <option value="tourism">Tourism / visit</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="family">Family / long-term</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={hasJobOffer} onChange={e => setHasJobOffer(e.target.checked)} />
          {' '}I have a job offer from a Praya employer
        </label>
        <label>
          <input type="checkbox" checked={hasEnrollment} onChange={e => setHasEnrollment(e.target.checked)} />
          {' '}I am enrolled at a Praya institution
        </label>
        <button type="submit" className="primary">Recommend a Visa</button>
      </form>
      <div aria-live="polite">
        {result && (
          <div className="status-result" style={{ marginTop: '1rem' }}>
            <p><strong>Recommended:</strong> {result.recommendation}</p>
            <p>{result.rationale}</p>
            {result.caveats && result.caveats.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <strong>Conditions and caveats:</strong>
                <ul style={{ marginTop: '0.25rem', paddingLeft: '1.25rem' }}>
                  {result.caveats.map((caveat, i) => (
                    <li key={i}>{caveat}</li>
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

function OverstayCalculator() {
  const [days, setDays] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const n = parseInt(days, 10)
    setResult(calculateOverstay(n))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ flex: '1 1 200px' }}>
          <span style={{ display: 'block', marginBottom: '0.25rem' }}>Days overstayed</span>
          <input
            type="number"
            min="1"
            required
            value={days}
            onChange={e => setDays(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </label>
        <button type="submit" className="primary">Calculate</button>
      </form>
      <div aria-live="polite">
        {result && (
          <div className="status-result" style={{ marginTop: '1rem' }}>
            <p><strong>Tier:</strong> {result.tier}</p>
            <p><strong>Fine:</strong> {result.fineDisplay}</p>
            <p><strong>Re-entry ban:</strong> {result.ban}</p>
            {result.deportation && <p className="deportation-warning"><strong>Deportation applies.</strong> Right to counsel and appeal via the 3rd District Court.</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default function IMMD() {
  const [biometricsOpen, setBiometricsOpen] = useState(false)
  const [formModal, setFormModal] = useState(null)
  const [toast, setToast] = useState('')

  const [bioDate, setBioDate] = useState('')
  const [bioOffice, setBioOffice] = useState('IMMD Central')

  const handleBiometricsSubmit = (e) => {
    e.preventDefault()
    setBiometricsOpen(false)
    setToast(`Biometrics appointment confirmed at ${bioOffice} on ${bioDate}.`)
    setBioDate('')
  }

  const handleFormDownload = (code) => {
    setFormModal(null)
    setToast(`Form ${code} downloaded.`)
  }

  return (
    <div className="layout-immigration">
      <SEO
        path="/immd"
        title="Immigration Department — Republic of Praya"
        description="Visas, residency, citizenship, PPIC, passports, and work/student permits. Issued by the Immigration Department (IMMD)."
      />

      {/* 1. HERO */}
      <section className="dept-hero">
        <div className="container">
          <h1>Immigration Department (IMMD)</h1>
          <p className="director-byline">{DIRECTOR_GENERAL.name} · {DIRECTOR_GENERAL.title}</p>
          <blockquote className="director-quote">{DIRECTOR_GENERAL.quote}</blockquote>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.85 }}>
            Emergency line for detained or overstayed persons: <strong>(010) 204-4999</strong> · available 24/7
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 0' }}>

        {/* 2. QUICK ACTIONS */}
        <section aria-labelledby="quick-actions-heading">
          <h2 id="quick-actions-heading">Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {QUICK_ACTIONS.map(qa => (
              <a
                key={qa.id}
                href={qa.id === 'biometrics' ? '#biometrics' : `#${qa.id}`}
                onClick={(e) => {
                  if (qa.id === 'biometrics') {
                    e.preventDefault()
                    setBiometricsOpen(true)
                  }
                }}
                className="card quick-action-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <h3 style={{ marginTop: 0 }}>{qa.label}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{qa.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* APPLICATION STATUS — inline section, addressable via #status */}
        <section aria-labelledby="status-heading" id="status" style={{ marginTop: '3rem' }}>
          <h2 id="status-heading">Check Application Status</h2>
          <div className="card">
            <p>Enter your application reference number to check current status. References follow the pattern <code>[CLASS]-[YEAR]-[5-digit-sequence]</code>, e.g. <code>V2-2026-04387</code>.</p>
            <StatusChecker />
          </div>
        </section>

        {/* 3. VISA CATEGORIES */}
        <section aria-labelledby="visa-heading" id="apply" style={{ marginTop: '3rem' }}>
          <h2 id="visa-heading">Visa Categories</h2>
          <p>All fees in P$ (Praya Dollars). Fees are per-applicant; dependants require separate applications.</p>
          <table className="visa-table">
            <caption className="sr-only">Full list of IMMD visa and permit classes</caption>
            <thead>
              <tr>
                <th scope="col">Class</th>
                <th scope="col">Name</th>
                <th scope="col">Duration</th>
                <th scope="col">Fee (P$)</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {VISA_CLASSES.map(v => (
                <tr key={v.code} className={`visa-category-${v.category}`}>
                  <th scope="row"><strong>{v.code}</strong></th>
                  <td>{v.name}</td>
                  <td>{v.duration}</td>
                  <td>{v.fee === 0 ? 'Free' : `P$${v.fee}`}</td>
                  <td>{v.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 4. RESIDENCY PATHWAY + ELIGIBILITY WIZARD */}
        <section aria-labelledby="residency-heading" id="renew" style={{ marginTop: '3rem' }}>
          <h2 id="residency-heading">Residency Pathway</h2>
          <p>The F-series is the primary residency ladder. F0 covers short stays; F1 permits property and vehicle ownership; F2 and F3 count toward citizenship eligibility. The E-class (employment) and S-class (student) are parallel tracks that also qualify for citizenship advancement.</p>
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Not sure which visa you need?</h3>
            <p>Answer a few questions and we&apos;ll recommend a class. This is guidance only — final determination is made by IMMD caseworkers.</p>
            <EligibilityWizard />
          </div>
        </section>

        {/* 5. CITIZENSHIP */}
        <section aria-labelledby="citizenship-heading" id="citizenship" style={{ marginTop: '3rem' }}>
          <h2 id="citizenship-heading">Citizenship</h2>
          <p>Praya citizenship is attained through the PIC-to-PPIC pathway. Applicants must hold an F1 or higher residency visa, or an E-class employment visa, for a minimum of six months of continuous residency before advancing to the I-7 citizenship application.</p>
          <div className="citizenship-ladder">
            {CITIZENSHIP_STEPS.map(s => (
              <div key={s.step} className="step">
                <div className="step-number">{s.step}</div>
                <div>
                  <p style={{ margin: 0 }}>{s.label}
                    {s.form && <span className="form-badge">Form {s.form}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Ceremony & Oath</h3>
            <p>Citizenship ceremonies are held monthly at IMMD Central in Oakville. Applicants take the Oath of Praya before a ceremonial officer. Dual citizenship is recognized; there is no requirement to renounce prior nationality.</p>
          </div>
        </section>

        {/* 6. PPIC */}
        <section aria-labelledby="ppic-heading" id="lost-ppic" style={{ marginTop: '3rem' }}>
          <h2 id="ppic-heading">PPIC (Praya Permanent Identity Card)</h2>
          <p>The PPIC is the permanent identity document issued to naturalized citizens under Form C-2. It is required for voting, certain banking services, and property ownership beyond F1 scope.</p>
          <ul>
            <li><strong>Issuance:</strong> Form C-2 — P$75</li>
            <li><strong>Replacement (lost/stolen):</strong> Form C-3 — P$50</li>
            <li><strong>Renewal:</strong> 10-year cycle; biometrics re-capture required</li>
            <li><strong>Biometrics:</strong> Fingerprint + facial capture at IMMD Central or Braemar County</li>
          </ul>
        </section>

        {/* 7. PASSPORTS */}
        <section aria-labelledby="passport-heading" style={{ marginTop: '3rem' }}>
          <h2 id="passport-heading">Passports</h2>
          <p>Praya passports are issued under Form PP-1 (new) or PP-R (renewal). Passports are machine-readable and include an embedded biometric chip per the Digital Immigration Regulations 2023.</p>
          <ul>
            <li><strong>New passport (PP-1):</strong> P$120 — standard 4-week processing</li>
            <li><strong>Expedited (PP-1):</strong> P$200 — 5 business days</li>
            <li><strong>Renewal (PP-R):</strong> P$80 — standard 2-week processing</li>
          </ul>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Passport validity: 10 years for adults; 5 years for minors. Apply in person at IMMD Central.</p>
        </section>

        {/* 8. WORK & STUDY */}
        <section aria-labelledby="work-study-heading" style={{ marginTop: '3rem' }}>
          <h2 id="work-study-heading">Work & Study Permits</h2>
          <p>Employment and student pathways are separate from the F-series residency track, but both qualify for citizenship advancement under the six-month continuous-residency rule.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>E-class Employment Visa</h3>
              <p>Sponsored by a Praya employer. 12 months renewable. P$150.</p>
              <p>Submit Form E-APP with employer verification letter and background check.</p>
            </div>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>S1 Short-term Student Permit</h3>
              <p>Up to 6 months. P$80. For language programs, exchange, workshops.</p>
            </div>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>S2 Degree-program Student Permit</h3>
              <p>Up to 4 years. P$250. Full-time enrollment at an accredited institution such as the Praya School of Design.</p>
            </div>
          </div>
        </section>

        {/* 9. EXPRESS PATHWAYS */}
        <section aria-labelledby="express-heading" style={{ marginTop: '3rem' }}>
          <h2 id="express-heading">Express Pathways</h2>
          <p>Express processing is available for applicants with exceptional circumstances, documented employer sponsorship, or construction-project sponsorship.</p>
          <ul>
            <li><strong>I-6 Express Immigration:</strong> P$500. 5-business-day processing. Requires documented exceptional circumstances and sponsorship from a Praya resident or employer.</li>
            <li><strong>I-12 Express Construction:</strong> P$400. Tied to a specific construction project; requires project sponsorship and trade certification.</li>
          </ul>
        </section>

        {/* 10. ENFORCEMENT & APPEALS */}
        <section aria-labelledby="enforcement-heading" style={{ marginTop: '3rem' }}>
          <h2 id="enforcement-heading">Enforcement & Appeals</h2>
          <p>Overstays are enforced on a tiered basis. Appeals are heard by the 3rd District Court (Justice David Choe presiding), with further appeal available to the 3rd Circuit Court (Justice Anandvivek Balasubramanian).</p>
          <table className="visa-table" style={{ marginTop: '1rem' }}>
            <caption className="sr-only">Overstay enforcement tiers</caption>
            <thead>
              <tr><th scope="col">Overstay range</th><th scope="col">Fine</th><th scope="col">Re-entry ban</th><th scope="col">Notes</th></tr>
            </thead>
            <tbody>
              {OVERSTAY_TIERS.map((t, i) => (
                <tr key={t.range} className={i === 2 ? 'overstay-tier tier-severe' : 'overstay-tier'}>
                  <th scope="row">{t.range}</th>
                  <td>{t.fine}</td>
                  <td>{t.ban}</td>
                  <td>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card" style={{ marginTop: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>Overstay Calculator</h3>
            <p>Enter the number of days overstayed to estimate the applicable fine and re-entry ban.</p>
            <OverstayCalculator />
          </div>
        </section>

        {/* 11. FORMS & FEES */}
        <section aria-labelledby="forms-heading" style={{ marginTop: '3rem' }}>
          <h2 id="forms-heading">Forms & Fees</h2>
          <table className="visa-table">
            <caption className="sr-only">All IMMD forms and their fees</caption>
            <thead>
              <tr><th scope="col">Form</th><th scope="col">Name</th><th scope="col">Fee</th><th scope="col"><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody>
              {FORMS_INDEX.map(f => (
                <tr key={f.code}>
                  <th scope="row"><span className="form-badge">{f.code}</span></th>
                  <td>{f.name}</td>
                  <td>{f.fee === null ? (f.feeNote || '—') : `P$${f.fee}${f.feeNote ? ' (' + f.feeNote + ')' : ''}`}</td>
                  <td>
                    <button type="button" className="secondary" onClick={() => setFormModal(f)}>View / Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 12. LEGISLATION */}
        <section aria-labelledby="legislation-heading" style={{ marginTop: '3rem' }}>
          <h2 id="legislation-heading">Governing Legislation</h2>
          {LEGISLATION.map(l => (
            <div key={l.act} className="legislation-card">
              <h3>{l.act}</h3>
              <p>{l.summary}</p>
              <ul>{l.sections.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </section>

        {/* 13. CONTACT / OFFICES */}
        <section aria-labelledby="offices-heading" id="biometrics" style={{ marginTop: '3rem' }}>
          <h2 id="offices-heading">Offices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {OFFICES.map(o => (
              <div key={o.name} className="office-card">
                <h3>{o.name}</h3>
                <p>{o.address}</p>
                <p className="office-hours">{o.hours}</p>
                <p><strong>Phone:</strong> {o.phone}</p>
                <ul>{o.services.map(s => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Biometrics booking modal */}
      <Modal isOpen={biometricsOpen} onClose={() => setBiometricsOpen(false)} title="Book a Biometrics Appointment">
        <form onSubmit={handleBiometricsSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <label>
            <span style={{ display: 'block', marginBottom: '0.25rem' }}>Office</span>
            <select value={bioOffice} onChange={e => setBioOffice(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
              {OFFICES.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
            </select>
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: '0.25rem' }}>Date</span>
            <input type="date" value={bioDate} onChange={e => setBioDate(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
          </label>
          <button type="submit" className="primary">Confirm Appointment</button>
        </form>
      </Modal>

      {/* Form preview modal */}
      <Modal isOpen={!!formModal} onClose={() => setFormModal(null)} title={formModal ? `Form ${formModal.code} — ${formModal.name}` : ''}>
        {formModal && (
          <div>
            <p><strong>Category:</strong> {formModal.category}</p>
            <p><strong>Fee:</strong> {formModal.fee === null ? (formModal.feeNote || '—') : `P$${formModal.fee}`}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>This is a preview. The printable PDF is available via the Download button.</p>
            <button type="button" className="primary" onClick={() => handleFormDownload(formModal.code)}>Download PDF</button>
          </div>
        )}
      </Modal>

      {/* Toast notifications */}
      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  )
}

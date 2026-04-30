import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SEO from '../components/SEO'
import {
  CHIEF_ELECTORAL_OFFICER,
  ELECTORAL_STATUS,
  DISTRICTS,
  LEGISLATION,
  FORMS_INDEX,
  OFFICES,
  QUICK_ACTIONS
} from '../data/ecData'
import {
  lookupDistrict,
  lookupVoterStatus,
  validatePreRegistration
} from '../utils/ecLogic'
import './DeptElectoral.css'

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
        background: '#6b1422',
        color: '#fff',
        padding: '0.75rem 1.25rem',
        borderLeft: '4px solid #b08a3a',
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

function DistrictLookup() {
  const [postal, setPostal] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!postal.trim()) return
    setResult(lookupDistrict(postal.trim()))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ec-postal" style={{ display: 'block', marginBottom: '0.4rem' }}>
        Postal code
      </label>
      <input
        id="ec-postal"
        type="text"
        value={postal}
        onChange={(e) => setPostal(e.target.value)}
        placeholder="e.g. 40321"
        style={{ padding: '0.5rem', width: '12rem', marginRight: '0.5rem' }}
      />
      <button type="submit" className="primary">Find district</button>

      {result && !result.notFound && result.code && (
        <div className="ec-result" role="status" aria-live="polite">
          <strong>{result.code}</strong> · {result.region}
          {' '}— see the Boundary Order 2014 gazette for street-level boundaries.
        </div>
      )}
      {result && result.notFound && (
        <div className="ec-result error" role="status" aria-live="polite">
          Postal code <code>{result.postalCode}</code> did not resolve to a district.
          Contact the EC Records Annexe to verify.
        </div>
      )}
    </form>
  )
}

function VoterStatusChecker() {
  const [ref, setRef] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ref.trim()) return
    setResult(lookupVoterStatus(ref.trim()))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ec-voter-ref" style={{ display: 'block', marginBottom: '0.4rem' }}>
        Pre-registration reference
      </label>
      <input
        id="ec-voter-ref"
        type="text"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        placeholder="e.g. V-2026-00874"
        style={{ padding: '0.5rem', width: '14rem', marginRight: '0.5rem' }}
      />
      <button type="submit" className="primary">Check status</button>

      {result && result.ref && (
        <div className="ec-result" role="status" aria-live="polite">
          <strong>{result.ref}</strong> · {result.status} · District {result.district}
          {' '}· registered {result.registered}
        </div>
      )}
      {result && result.notFound && (
        <div className="ec-result error" role="status" aria-live="polite">
          No pre-registration found for <code>{result.reference}</code>.
        </div>
      )}
    </form>
  )
}

function PreRegistrationForm({ onSubmitted }) {
  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    nationalId: '',
    postalCode: '',
    email: ''
  })
  const [errors, setErrors] = useState([])
  const [submitted, setSubmitted] = useState(null)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const r = validatePreRegistration(form)
    if (!r.ok) {
      setErrors(r.errors)
      setSubmitted(null)
      return
    }
    setErrors([])
    const reference = `V-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0')}`
    setSubmitted({ reference, district: r.district })
    onSubmitted?.(`Pre-registration submitted. Reference ${reference}.`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
        <div>
          <label htmlFor="ec-fullname" style={{ display: 'block', marginBottom: '0.3rem' }}>Full legal name</label>
          <input id="ec-fullname" type="text" value={form.fullName} onChange={update('fullName')} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label htmlFor="ec-dob" style={{ display: 'block', marginBottom: '0.3rem' }}>Date of birth (YYYY-MM-DD)</label>
          <input id="ec-dob" type="date" value={form.dateOfBirth} onChange={update('dateOfBirth')} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label htmlFor="ec-natid" style={{ display: 'block', marginBottom: '0.3rem' }}>National ID number</label>
          <input id="ec-natid" type="text" value={form.nationalId} onChange={update('nationalId')} placeholder="ID-NAT-..." style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label htmlFor="ec-postal-form" style={{ display: 'block', marginBottom: '0.3rem' }}>Postal code</label>
          <input id="ec-postal-form" type="text" value={form.postalCode} onChange={update('postalCode')} placeholder="e.g. 40321" style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label htmlFor="ec-email" style={{ display: 'block', marginBottom: '0.3rem' }}>Email</label>
          <input id="ec-email" type="email" value={form.email} onChange={update('email')} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button type="submit" className="primary">Submit pre-registration</button>
      </div>

      {errors.length > 0 && (
        <div className="ec-result error" role="alert">
          <strong>Cannot submit:</strong>
          <ul style={{ margin: '0.5rem 0 0 1.25rem' }}>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      {submitted && (
        <div className="ec-result" role="status" aria-live="polite">
          Pre-registration accepted. Reference <strong>{submitted.reference}</strong>.
          District <strong>{submitted.district.code}</strong> ({submitted.district.region}).
        </div>
      )}
    </form>
  )
}
PreRegistrationForm.propTypes = {
  onSubmitted: PropTypes.func
}

export default function EC() {
  const [toast, setToast] = useState('')
  const [formModal, setFormModal] = useState(null)

  const handleFormDownload = (code) => {
    setFormModal(null)
    setToast(`Form ${code} downloaded.`)
  }

  return (
    <div className="layout-electoral">
      <SEO
        path="/ec"
        title="Electoral Commission — Republic of Praya"
        description="Voter pre-registration, electoral districts, campaign finance, and observer accreditation. Issued by the Electoral Commission (EC)."
      />

      {/* HERO */}
      <section className="dept-hero">
        <div className="container">
          <h1>Electoral Commission (EC)</h1>
          <p className="director-byline">
            {CHIEF_ELECTORAL_OFFICER.name} · {CHIEF_ELECTORAL_OFFICER.title}
          </p>
          <blockquote className="director-quote">{CHIEF_ELECTORAL_OFFICER.quote}</blockquote>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 0' }}>

        {/* STATUS BANNER */}
        <div className={`ec-status-banner ${ELECTORAL_STATUS.electionsActivated ? 'activated' : ''}`} role="region" aria-label="Electoral status">
          <h3>
            {ELECTORAL_STATUS.electionsActivated
              ? 'Election cycle: ACTIVATED'
              : 'Election cycle: NOT YET ACTIVATED'}
          </h3>
          <p style={{ margin: 0 }}>{ELECTORAL_STATUS.message}</p>
          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.9rem' }}>
            <span className="ec-pill">Pre-registration: {ELECTORAL_STATUS.preRegistrationOpen ? 'open' : 'closed'}</span>
            <span className="ec-pill">Observer accreditation: {ELECTORAL_STATUS.observerAccreditationOpen ? 'open' : 'closed'}</span>
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <section aria-labelledby="ec-quick-actions-heading" style={{ marginTop: '2rem' }}>
          <h2 id="ec-quick-actions-heading">Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {QUICK_ACTIONS.map(qa => (
              <a
                key={qa.id}
                href={`#${qa.id}`}
                className="card quick-action-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <h3 style={{ marginTop: 0 }}>{qa.label}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{qa.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* DISTRICT LOOKUP */}
        <section aria-labelledby="ec-district-heading" id="district" style={{ marginTop: '3rem' }}>
          <h2 id="ec-district-heading">Find My District</h2>
          <div className="card">
            <p>Praya is divided into <strong>24 electoral districts</strong>, gazetted under the Boundary Order 2014. Enter your postal code to find which district you live in. Street-level boundaries are available at the EC Records Annexe.</p>
            <DistrictLookup />
          </div>
        </section>

        {/* DISTRICT TABLE */}
        <section aria-labelledby="ec-districts-heading" style={{ marginTop: '3rem' }}>
          <h2 id="ec-districts-heading">Electoral Districts</h2>
          <p>Numbered short codes for the 24 districts. Each district elects one representative under the Electoral Act 2014.</p>
          <table className="ec-table">
            <caption className="sr-only">All 24 electoral districts</caption>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Number</th>
                <th scope="col">Region</th>
              </tr>
            </thead>
            <tbody>
              {DISTRICTS.map(d => (
                <tr key={d.code}>
                  <th scope="row">{d.code}</th>
                  <td>{d.number}</td>
                  <td>{d.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* VOTER PRE-REGISTRATION */}
        <section aria-labelledby="ec-preregister-heading" id="preregister" style={{ marginTop: '3rem' }}>
          <h2 id="ec-preregister-heading">Pre-Register to Vote</h2>
          <p>Form V-1 establishes your place on the voter roll once the election cycle is proclaimed. Pre-registration is free and open to any Praya citizen aged 18 or older. You will receive a reference number to track your status.</p>
          <div className="card">
            <PreRegistrationForm onSubmitted={setToast} />
          </div>
        </section>

        {/* VOTER ROLL STATUS */}
        <section aria-labelledby="ec-roll-heading" id="roll" style={{ marginTop: '3rem' }}>
          <h2 id="ec-roll-heading">Check Voter Roll Status</h2>
          <div className="card">
            <p>Enter your pre-registration reference number (format <code>V-YEAR-5DIGIT</code>, e.g. <code>V-2026-00874</code>) to confirm your record is on file.</p>
            <VoterStatusChecker />
          </div>
        </section>

        {/* OBSERVER */}
        <section aria-labelledby="ec-observer-heading" id="observer" style={{ marginTop: '3rem' }}>
          <h2 id="ec-observer-heading">Election Observer Accreditation</h2>
          <div className="card">
            <p>Accredited observers may attend polling stations, counting halls, and the central tabulation room. Accreditation is open to civil society organizations, accredited journalists, and academic institutions. File <strong>Form EC-OBS</strong> at least 30 days before a scheduled poll. Accreditation is free and renewable per cycle.</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              While the election cycle is not activated, observer accreditation is held in abeyance and renewed automatically on proclamation.
            </p>
          </div>
        </section>

        {/* CAMPAIGN FINANCE */}
        <section aria-labelledby="ec-finance-heading" id="finance" style={{ marginTop: '3rem' }}>
          <h2 id="ec-finance-heading">Campaign Finance</h2>
          <div className="card">
            <p>Under the Campaign Finance Disclosure Act 2020, candidates and registered campaign committees must disclose donations and expenditures on a quarterly basis. Filings are public and form the EC&apos;s disclosure ledger.</p>
            <ul>
              <li><strong>Form CF-1 (Candidate Filing Notification):</strong> $100. Required to enter a race in any district.</li>
              <li><strong>Form CF-2 (Campaign Committee Registration):</strong> $50. Required for any committee accepting more than $1,000 in aggregate donations.</li>
              <li><strong>Form CF-3 (Quarterly Disclosure):</strong> Free. Due 15 days after the close of each calendar quarter.</li>
            </ul>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              The public disclosure ledger opens upon proclamation; pre-activation filings are accepted and held by the EC Records Annexe.
            </p>
          </div>
        </section>

        {/* FORMS INDEX */}
        <section aria-labelledby="ec-forms-heading" style={{ marginTop: '3rem' }}>
          <h2 id="ec-forms-heading">Forms Index</h2>
          <p>All EC forms are filed at HQ, county offices, or — once the cycle is proclaimed — through PrayaPass. Click a form for details.</p>
          <table className="ec-table">
            <caption className="sr-only">Index of EC forms</caption>
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Fee</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {FORMS_INDEX.map(f => (
                <tr key={f.code}>
                  <th scope="row">
                    <button
                      type="button"
                      onClick={() => setFormModal(f)}
                      style={{ background: 'none', border: 'none', color: 'var(--ec-burgundy, #6b1422)', cursor: 'pointer', fontWeight: 600, padding: 0, font: 'inherit' }}
                    >
                      {f.code}
                    </button>
                  </th>
                  <td>{f.name}</td>
                  <td>{f.fee === 0 ? (f.feeNote || 'Free') : `$${f.fee}${f.feeNote ? ' (' + f.feeNote + ')' : ''}`}</td>
                  <td>{f.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* LEGISLATION */}
        <section aria-labelledby="ec-law-heading" id="law" style={{ marginTop: '3rem' }}>
          <h2 id="ec-law-heading">Electoral Legislation</h2>
          <p>The EC operates under four principal statutes. Full text is available at the Department of Justice records office.</p>
          {LEGISLATION.map(law => (
            <div key={law.act} className="card" style={{ marginTop: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>{law.act}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>{law.summary}</p>
              <ul style={{ marginBottom: 0 }}>
                {law.sections.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* OFFICES */}
        <section aria-labelledby="ec-offices-heading" style={{ marginTop: '3rem' }}>
          <h2 id="ec-offices-heading">Offices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {OFFICES.map(o => (
              <div key={o.name} className="card">
                <h3 style={{ marginTop: 0 }}>{o.name}</h3>
                <p style={{ margin: '0 0 0.5rem 0' }}>{o.address}</p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.85 }}>{o.hours}</p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                  <strong>Phone:</strong> {o.phone}
                </p>
                <ul style={{ margin: 0, fontSize: '0.85rem' }}>
                  {o.services.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FORM DETAIL MODAL */}
      <Modal
        isOpen={!!formModal}
        onClose={() => setFormModal(null)}
        title={formModal ? `Form ${formModal.code} — ${formModal.name}` : ''}
      >
        {formModal && (
          <div>
            <p><strong>Fee:</strong> {formModal.fee === 0 ? (formModal.feeNote || 'Free') : `$${formModal.fee}${formModal.feeNote ? ' (' + formModal.feeNote + ')' : ''}`}</p>
            <p><strong>Category:</strong> {formModal.category}</p>
            <p>File at the Electoral Commission Headquarters or any county office. Once the election cycle is proclaimed, this form will be available through PrayaPass.</p>
            <button type="button" className="primary" onClick={() => handleFormDownload(formModal.code)}>
              Download Form {formModal.code}
            </button>
          </div>
        )}
      </Modal>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  )
}

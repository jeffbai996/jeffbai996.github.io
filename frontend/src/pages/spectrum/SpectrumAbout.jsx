import { SPECTRUM_TEAM } from '../../data/spectrumTeam'

export default function SpectrumAbout() {
  return (
    <section className="sp-section container">
      <h1 style={{ textTransform: 'lowercase' }}>about spectrum</h1>

      <div style={{ maxWidth: '70ch', marginTop: '32px' }}>
        <p>Spectrum was founded in 2019, in the early years of federal cannabis legalization in Praya. We opened our first store in Oakville and grew the business one location at a time, on the premise that the people who buy from us deserve the same quality, transparency, and care that we&apos;d want from our own dispensary.</p>
        <p style={{ marginTop: '16px' }}>We grow most of what we sell at our Surowski Valley facility. The catalog is curated, not exhaustive — we&apos;d rather stock fewer products and stand behind every one than chase volume.</p>
        <p style={{ marginTop: '16px' }}>Cannabis, for everyone — we mean it. Every store, every batch, every customer.</p>
      </div>

      <div className="sp-values-grid">
        <div>
          <h3 style={{ textTransform: 'lowercase' }}>quality</h3>
          <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>Every batch is lab-tested. The full Certificate of Analysis is available for any product we sell, on request, at any location.</p>
        </div>
        <div>
          <h3 style={{ textTransform: 'lowercase' }}>transparency</h3>
          <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>Every product lists its strain, terpene profile, and sourcing. No proprietary secrecy on what&apos;s inside.</p>
        </div>
        <div>
          <h3 style={{ textTransform: 'lowercase' }}>community</h3>
          <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>Locally owned, locally operated, locally staffed. Every Spectrum employee is a Praya resident.</p>
        </div>
      </div>

      <h2 style={{ textTransform: 'lowercase', marginTop: '64px' }}>the team</h2>
      <div className="sp-team-grid">
        {SPECTRUM_TEAM.map(person => (
          <div key={person.id}>
            <div className="sp-team-portrait" style={{ background: person.accentColor }} />
            <div style={{ padding: '16px 0' }}>
              <h3 style={{ textTransform: 'none' }}>{person.name}</h3>
              <p style={{ color: 'var(--sp-muted)', fontSize: '0.95rem' }}>{person.role}</p>
              <p style={{ marginTop: '8px' }}>{person.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sp-license-block">
        Licensed by the Cannabis Tax Bureau, Director-General David Pereira · License #CTB-2019-0042 · Issued 2019-04-22
      </div>
    </section>
  )
}

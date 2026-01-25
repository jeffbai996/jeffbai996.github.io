import React from 'react';
import {
  FARE_ZONES,
  FARE_TYPES,
  PASSES,
  HSR_FARES
} from '../../data/transitData';
import './Transit.css';

export default function FaresInfo() {
  return (
    <div className="fares-info">
      <div className="fares-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          Fares & Passes
        </h3>
        <p>Ticket prices and travel passes for the Praya transit network</p>
      </div>

      <div className="fares-content">
        <section className="fare-section">
          <h4>Zone-Based Fares (MRT & ISR)</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Fares are calculated based on the zones you travel through. Tap your fare card on entry and exit.
          </p>

          <table className="fare-zones-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Area</th>
                <th>Base Fare</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(FARE_ZONES).map(([zone, info]) => (
                <tr key={zone}>
                  <td><strong>Zone {zone}</strong></td>
                  <td>{info.name}</td>
                  <td><strong>${info.baseFare.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
            <strong>Note:</strong> Additional $0.40 per zone crossed. Maximum fare: $8.00 for any single journey.
          </div>
        </section>

        <section className="fare-section" style={{ marginTop: '32px' }}>
          <h4>Fare Concessions</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {Object.entries(FARE_TYPES).map(([key, type]) => (
              <div
                key={key}
                style={{
                  padding: '16px',
                  background: 'var(--bg-elevated)',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {type.name}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: type.multiplier === 0 ? '#16a34a' : 'var(--text-primary)' }}>
                  {type.multiplier === 0 ? 'Free' : `${type.multiplier * 100}%`}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {type.multiplier === 1 ? 'Full fare' : type.multiplier === 0 ? 'No charge' : 'of adult fare'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="fare-section" style={{ marginTop: '32px' }}>
          <h4>Travel Passes</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Unlimited travel passes for frequent travelers and visitors.
          </p>

          <div className="passes-grid">
            {PASSES.map(pass => (
              <div key={pass.id} className="pass-card">
                <div className="pass-name">{pass.name}</div>
                <div className="pass-price">
                  <span className="currency">$</span>{pass.price.toFixed(2)}
                </div>
                <div className="pass-validity">
                  Valid for {pass.validity} • {pass.zones}
                </div>
                <div className="pass-description">{pass.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="fare-section" style={{ marginTop: '32px' }}>
          <h4>High Speed Rail (HSR) Fares</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Reserved seating with three travel classes. Book in advance for best prices.
          </p>

          <table className="fare-zones-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Standard</th>
                <th>Business</th>
                <th>First</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Praya → Midland</strong> (28 min)</td>
                <td>$35</td>
                <td>$55</td>
                <td>$85</td>
              </tr>
              <tr>
                <td><strong>Praya → Riverport</strong> (48 min)</td>
                <td>$58</td>
                <td>$92</td>
                <td>$145</td>
              </tr>
              <tr>
                <td><strong>Praya → Wellington</strong> (72 min)</td>
                <td>$85</td>
                <td>$135</td>
                <td>$210</td>
              </tr>
              <tr>
                <td><strong>Praya → Seaside</strong> (35 min)</td>
                <td>$42</td>
                <td>$68</td>
                <td>—</td>
              </tr>
              <tr>
                <td><strong>Praya → Harbour City</strong> (58 min)</td>
                <td>$68</td>
                <td>$108</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>

          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
            <strong>First Class</strong> includes lounge access, meal service, and extra legroom. <strong>Business Class</strong> includes power outlets and wider seats.
          </div>
        </section>

        <section className="fare-section" style={{ marginTop: '32px' }}>
          <h4>Payment Methods</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <strong>Praya Card</strong>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Reloadable contactless card. Available at all stations. $5 card deposit (refundable).
              </p>
            </div>

            <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
                <strong>Mobile Pay</strong>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Use Apple Pay, Google Pay, or Praya Transit app. Just tap your phone at gates.
              </p>
            </div>

            <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <strong>Single Tickets</strong>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Purchase at ticket machines. $0.50 surcharge for paper tickets.
              </p>
            </div>

            <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/>
                  <path d="M12 6v2m0 8v2"/>
                </svg>
                <strong>Contactless Bank Cards</strong>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                Visa, Mastercard, Amex contactless. Same fare as Praya Card.
              </p>
            </div>
          </div>
        </section>

        <section className="fare-section" style={{ marginTop: '32px', padding: '20px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px' }}>
          <h4 style={{ color: '#2563eb', marginBottom: '12px' }}>Fare Tips</h4>
          <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Always tap out to avoid maximum fare charges</li>
            <li style={{ marginBottom: '8px' }}>Same-day interchanges within 30 minutes are free</li>
            <li style={{ marginBottom: '8px' }}>Weekly Pass pays for itself in 4 round trips from Zone 3</li>
            <li style={{ marginBottom: '8px' }}>Off-peak discount (10%) available 9:30am-4pm and after 7pm</li>
            <li>Children under 3 travel free with adult</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

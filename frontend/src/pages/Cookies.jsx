import React from 'react'
import './StaticPages.css'

export default function Cookies() {
  return (
    <div className="static-page">
      <div className="static-container">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last Updated: January 25, 2026</p>

        <section>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, authenticate your identity, and improve your browsing experience.
          </p>
          <p>
            The Republic of Praya government portal uses cookies to provide secure, efficient government services.
          </p>
        </section>

        <section>
          <h2>2. Types of Cookies We Use</h2>

          <h3>2.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the Portal to function and cannot be disabled. They enable core functionality including:
          </p>
          <ul>
            <li><strong>Session Management:</strong> Keep you logged into your PrayaPass account</li>
            <li><strong>Security:</strong> Protect against cross-site request forgery (CSRF)</li>
            <li><strong>Load Balancing:</strong> Distribute traffic across servers</li>
            <li><strong>Form Submission:</strong> Remember your progress when filling out applications</li>
          </ul>
          <p><em>Duration: Session-only (deleted when you close your browser) or up to 24 hours</em></p>

          <h3>2.2 Functional Cookies</h3>
          <p>
            These cookies enhance your experience by remembering your choices:
          </p>
          <ul>
            <li><strong>Language Preference:</strong> Remember your language selection</li>
            <li><strong>Theme Settings:</strong> Store your light/dark mode preference</li>
            <li><strong>Accessibility:</strong> Remember accessibility options you've enabled</li>
            <li><strong>Recently Viewed:</strong> Track services you've recently accessed</li>
          </ul>
          <p><em>Duration: Up to 1 year</em></p>

          <h3>2.3 Analytics Cookies</h3>
          <p>
            These cookies help us understand how the Portal is used so we can improve it:
          </p>
          <ul>
            <li><strong>Page Views:</strong> Track which pages are most visited</li>
            <li><strong>User Flow:</strong> Understand navigation patterns</li>
            <li><strong>Error Tracking:</strong> Identify technical issues</li>
            <li><strong>Performance Metrics:</strong> Monitor page load times</li>
          </ul>
          <p>
            Analytics data is anonymized and aggregated. Individual users are not identifiable.
          </p>
          <p><em>Duration: Up to 2 years</em></p>

          <h3>2.4 Security Cookies</h3>
          <p>
            These cookies protect your account and prevent fraud:
          </p>
          <ul>
            <li><strong>Authentication Tokens:</strong> Verify your identity</li>
            <li><strong>Fraud Detection:</strong> Identify suspicious login attempts</li>
            <li><strong>Rate Limiting:</strong> Prevent automated attacks</li>
          </ul>
          <p><em>Duration: Session-only to 30 days</em></p>
        </section>

        <section>
          <h2>3. Third-Party Cookies</h2>
          <p>
            We use limited third-party services that may set cookies:
          </p>
          <ul>
            <li><strong>Payment Processors:</strong> For secure payment processing (PCI-DSS compliant)</li>
            <li><strong>Content Delivery Networks:</strong> For faster page loading</li>
          </ul>
          <p>
            We do not use third-party advertising cookies or social media tracking cookies.
          </p>
        </section>

        <section>
          <h2>4. Managing Cookies</h2>

          <h3>4.1 Browser Settings</h3>
          <p>
            You can control cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Delete existing cookies</li>
            <li>Block all cookies</li>
            <li>Block third-party cookies</li>
            <li>Clear cookies when you close your browser</li>
          </ul>

          <h3>4.2 Impact of Disabling Cookies</h3>
          <p>
            <strong>Warning:</strong> Disabling essential cookies will prevent you from:
          </p>
          <ul>
            <li>Logging into your PrayaPass account</li>
            <li>Submitting online forms</li>
            <li>Making payments</li>
            <li>Accessing secure services</li>
          </ul>
          <p>
            You can safely disable functional and analytics cookies, though your experience may be less personalized.
          </p>

          <h3>4.3 Browser-Specific Instructions</h3>
          <p><strong>Google Chrome:</strong></p>
          <ol>
            <li>Click the three-dot menu → Settings</li>
            <li>Privacy and security → Cookies and other site data</li>
            <li>Choose your preferred cookie settings</li>
          </ol>

          <p><strong>Firefox:</strong></p>
          <ol>
            <li>Click the menu button → Settings</li>
            <li>Privacy & Security → Cookies and Site Data</li>
            <li>Choose your preferred cookie settings</li>
          </ol>

          <p><strong>Safari:</strong></p>
          <ol>
            <li>Preferences → Privacy</li>
            <li>Choose your cookie blocking options</li>
          </ol>

          <p><strong>Microsoft Edge:</strong></p>
          <ol>
            <li>Click the three-dot menu → Settings</li>
            <li>Cookies and site permissions → Cookies and site data</li>
            <li>Choose your preferred cookie settings</li>
          </ol>
        </section>

        <section>
          <h2>5. Cookie List</h2>
          <p>Here are the specific cookies we use:</p>

          <table className="cookie-table">
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>praya_session</code></td>
                <td>Maintains your login session</td>
                <td>Essential</td>
                <td>Session</td>
              </tr>
              <tr>
                <td><code>csrf_token</code></td>
                <td>Security protection</td>
                <td>Essential</td>
                <td>Session</td>
              </tr>
              <tr>
                <td><code>prayapass_auth</code></td>
                <td>Authentication token</td>
                <td>Essential</td>
                <td>24 hours</td>
              </tr>
              <tr>
                <td><code>theme_preference</code></td>
                <td>Light/dark mode setting</td>
                <td>Functional</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td><code>language</code></td>
                <td>Language preference</td>
                <td>Functional</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td><code>_ga</code></td>
                <td>Google Analytics visitor ID</td>
                <td>Analytics</td>
                <td>2 years</td>
              </tr>
              <tr>
                <td><code>_gid</code></td>
                <td>Google Analytics session ID</td>
                <td>Analytics</td>
                <td>24 hours</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>6. Other Tracking Technologies</h2>

          <h3>6.1 Local Storage</h3>
          <p>
            We use browser local storage to save your preferences and application progress. Unlike cookies, this data is not sent to our servers.
          </p>

          <h3>6.2 Session Storage</h3>
          <p>
            Temporary storage for form data to prevent loss during navigation. Cleared when you close the browser tab.
          </p>

          <h3>6.3 Pixels and Beacons</h3>
          <p>
            We do not use tracking pixels or web beacons for advertising purposes.
          </p>
        </section>

        <section>
          <h2>7. Updates to Cookie Policy</h2>
          <p>
            We may update this Cookie Policy to reflect changes in technology or regulations. Material changes will be announced through the Portal with a 30-day notice period.
          </p>
        </section>

        <section>
          <h2>8. Contact Information</h2>
          <p>
            For questions about our use of cookies:
          </p>
          <p>
            <strong>Email:</strong> privacy@govpraya.org<br/>
            <strong>Email (General):</strong> info@govpraya.org<br/>
            <strong>Phone:</strong> 311
          </p>
        </section>

        <section>
          <h2>9. Your Consent</h2>
          <p>
            By using the Praya government portal, you consent to our use of essential cookies necessary for the Portal to function. You can control optional cookies through your browser settings as described above.
          </p>
        </section>
      </div>
    </div>
  )
}

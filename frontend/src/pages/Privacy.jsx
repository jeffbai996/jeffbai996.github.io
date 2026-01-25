import React from 'react'
import './StaticPages.css'

export default function Privacy() {
  return (
    <div className="static-page">
      <div className="static-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 25, 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            The Republic of Praya is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our government services portal.
          </p>
          <p>
            We collect only the information necessary to provide government services and comply with applicable laws.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information</h3>
          <p>When you create a PrayaPass account or use our services, we may collect:</p>
          <ul>
            <li>Full name, date of birth, and National ID number</li>
            <li>Contact information (address, phone number, email)</li>
            <li>Identification documents (passport, driver's license)</li>
            <li>Financial information (for tax filing and payments)</li>
            <li>Biometric data (for identity verification, with consent)</li>
            <li>Employment and income information</li>
            <li>Family information (for benefits and services)</li>
            <li>Health information (for healthcare services, with consent)</li>
          </ul>

          <h3>2.2 Technical Information</h3>
          <p>We automatically collect certain information when you use the Portal:</p>
          <ul>
            <li>IP address and device identifiers</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
            <li>Login timestamps</li>
          </ul>

          <h3>2.3 Cookies and Tracking</h3>
          <p>
            We use cookies and similar technologies to enhance your experience. See our Cookie Policy for details.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li><strong>Provide Services:</strong> Process applications, payments, and requests</li>
            <li><strong>Verify Identity:</strong> Confirm your identity for security purposes</li>
            <li><strong>Communicate:</strong> Send service notifications, alerts, and updates</li>
            <li><strong>Improve Services:</strong> Analyze usage patterns to enhance the Portal</li>
            <li><strong>Comply with Law:</strong> Meet legal and regulatory requirements</li>
            <li><strong>Prevent Fraud:</strong> Detect and prevent fraudulent activities</li>
            <li><strong>Administer Benefits:</strong> Determine eligibility for government programs</li>
            <li><strong>Statistical Analysis:</strong> Generate anonymous statistics for policy planning</li>
          </ul>
        </section>

        <section>
          <h2>4. Information Sharing</h2>

          <h3>4.1 Government Agencies</h3>
          <p>
            We may share your information with other Praya government agencies as necessary to provide services or comply with legal obligations. Examples include:
          </p>
          <ul>
            <li>Revenue Department (for tax purposes)</li>
            <li>National Police Agency (for background checks)</li>
            <li>Health Department (for healthcare services)</li>
            <li>Social Welfare Department (for benefits administration)</li>
          </ul>

          <h3>4.2 Third-Party Service Providers</h3>
          <p>
            We engage trusted third parties to assist with:
          </p>
          <ul>
            <li>Payment processing (PCI-DSS compliant)</li>
            <li>Cloud hosting and data storage</li>
            <li>Identity verification services</li>
            <li>Technical support and maintenance</li>
          </ul>
          <p>
            These providers are contractually obligated to protect your information and use it only for authorized purposes.
          </p>

          <h3>4.3 Legal Requirements</h3>
          <p>We may disclose your information when required by law or to:</p>
          <ul>
            <li>Comply with court orders or subpoenas</li>
            <li>Respond to lawful government requests</li>
            <li>Protect our rights and property</li>
            <li>Prevent fraud or criminal activity</li>
            <li>Protect public safety</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>We implement robust security measures including:</p>
          <ul>
            <li><strong>Encryption:</strong> 256-bit SSL/TLS for data in transit</li>
            <li><strong>Secure Storage:</strong> Encrypted databases with access controls</li>
            <li><strong>Authentication:</strong> Multi-factor authentication for sensitive services</li>
            <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
            <li><strong>Employee Training:</strong> Privacy and security awareness programs</li>
            <li><strong>Access Restrictions:</strong> Role-based access to personal information</li>
          </ul>
          <p>
            While no system is 100% secure, we continuously work to protect your information against unauthorized access, alteration, or destruction.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion where legally permitted</li>
            <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong>Restriction:</strong> Limit how we process your information</li>
            <li><strong>Object:</strong> Object to certain processing activities</li>
            <li><strong>Withdraw Consent:</strong> Withdraw previously given consent</li>
          </ul>
          <p>
            To exercise these rights, contact us at info@govpraya.org or through your PrayaPass account. Some limitations may apply based on legal requirements.
          </p>
        </section>

        <section>
          <h2>7. Data Retention</h2>
          <p>
            We retain your information only as long as necessary to provide services and comply with legal obligations. Retention periods vary by data type:
          </p>
          <ul>
            <li><strong>Account Information:</strong> Duration of account plus 7 years</li>
            <li><strong>Tax Records:</strong> 7 years from filing date</li>
            <li><strong>Criminal Records:</strong> Per judicial retention requirements</li>
            <li><strong>Healthcare Records:</strong> 10 years or as required by law</li>
            <li><strong>Transaction Logs:</strong> 3 years for audit purposes</li>
          </ul>
          <p>
            After retention periods expire, data is securely deleted or anonymized.
          </p>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            The Portal is not intended for children under 13 without parental guidance. We do not knowingly collect personal information from children under 13 except when:
          </p>
          <ul>
            <li>A parent or guardian provides the information</li>
            <li>Required for government services (birth certificates, health records)</li>
            <li>Authorized by applicable law</li>
          </ul>
        </section>

        <section>
          <h2>9. International Data Transfers</h2>
          <p>
            Your information is primarily stored and processed within the Republic of Praya. In limited cases, data may be transferred internationally (e.g., for passport verification or international mail). We ensure adequate safeguards are in place for such transfers.
          </p>
        </section>

        <section>
          <h2>10. Third-Party Links</h2>
          <p>
            The Portal may contain links to external websites. We are not responsible for the privacy practices of these sites. Please review their privacy policies before providing personal information.
          </p>
        </section>

        <section>
          <h2>11. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Significant changes will be announced through the Portal with a 30-day notice period. Your continued use after changes take effect constitutes acceptance.
          </p>
        </section>

        <section>
          <h2>12. Contact Information</h2>
          <p>For privacy-related questions or concerns:</p>
          <p>
            <strong>Data Protection Officer</strong><br/>
            Email: privacy@govpraya.org<br/>
            Email (General): info@govpraya.org<br/>
            Phone: 311<br/>
            Mail: Office of the Chief Executive, Republic of Praya
          </p>
        </section>

        <section>
          <h2>13. Complaints</h2>
          <p>
            If you believe your privacy rights have been violated, you may file a complaint with:
          </p>
          <ul>
            <li>Our Data Protection Officer (contact above)</li>
            <li>The Department of Justice</li>
            <li>The Praya Data Protection Authority</li>
          </ul>
          <p>
            We are committed to resolving privacy concerns promptly and fairly.
          </p>
        </section>
      </div>
    </div>
  )
}

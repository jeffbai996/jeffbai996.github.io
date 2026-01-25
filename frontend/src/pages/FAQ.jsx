import React, { useState } from 'react'
import './StaticPages.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is PrayaPass?',
          a: 'PrayaPass is your unified government account that gives you secure access to all online services across departments. With one account, you can file taxes, apply for documents, make payments, and access over 127 government services 24/7.'
        },
        {
          q: 'How do I create a PrayaPass account?',
          a: 'Click "Register" on the main portal, provide your National ID number, email, and create a secure password. You\'ll receive a verification email to activate your account. For added security, we recommend enabling two-factor authentication.'
        },
        {
          q: 'I forgot my PrayaPass password. What should I do?',
          a: 'Click "Forgot Password" on the login page. Enter your email address, and we\'ll send you a password reset link. The link expires after 1 hour for security. If you don\'t receive the email, check your spam folder or contact support.'
        },
        {
          q: 'What are your office hours?',
          a: 'Most government offices are open Monday-Friday, 8AM-5PM. Post offices are open Monday-Friday 8AM-6PM and Saturday 9AM-1PM. Online services are available 24/7. Emergency services (Police: 911, Health: 911) are available 24/7. Border crossings operate 24/7.'
        },
        {
          q: 'How can I contact a specific department?',
          a: 'Each department page has dedicated contact information. For general inquiries, call 311 or email info@govpraya.org. For emergencies, dial 911.'
        }
      ]
    },
    {
      category: 'Documents & IDs',
      questions: [
        {
          q: 'How do I apply for a National ID?',
          a: 'Visit the Interior Department portal (/interior/id) or any Interior office. New applications cost $25, renewals are $15. You\'ll need proof of citizenship (birth certificate or passport) and proof of address. Processing takes 5-7 business days. PrayaPass account required for online applications.'
        },
        {
          q: 'What documents do I need for a passport?',
          a: 'You need: (1) Completed application form, (2) National ID, (3) Birth certificate, (4) Two passport photos, (5) Payment ($80 standard or $150 expedited). Apply through Interior Department (/interior/passport). Standard processing: 10-14 days. Expedited: 3-5 days.'
        },
        {
          q: 'How do I renew my driver\'s license?',
          a: 'Visit Transport Department (/transport/license) online or at any licensing center. Cost: $30 for renewal (valid 5 years). You\'ll need your current license and updated vision test. Book appointments online to skip wait times.'
        },
        {
          q: 'Can I track my document application status?',
          a: 'Yes! Log into your PrayaPass account and visit "My Applications" to track all pending documents in real-time. You\'ll receive email notifications when status changes.'
        }
      ]
    },
    {
      category: 'Taxes & Payments',
      questions: [
        {
          q: 'When is the tax filing deadline?',
          a: 'Individual tax returns are due April 15 annually. You can file for a 6-month extension until October 15 (taxes owed must still be paid by April 15). Quarterly estimated payments are due April 15, June 15, September 15, and January 15.'
        },
        {
          q: 'How do I file my taxes online?',
          a: 'Visit Revenue Department (/revenue/file). Free e-file is available for incomes under $75,000. Login to PrayaPass, gather your W-2s/1099s, and follow the guided filing process. Refunds via direct deposit typically arrive within 21 days.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept: (1) Bank account (ACH) - FREE, (2) Credit/Debit cards - 1.99% fee, (3) Check or money order by mail. All online payments use 256-bit SSL encryption and are PCI-DSS compliant for security.'
        },
        {
          q: 'Can I set up a payment plan for taxes owed?',
          a: 'Yes! Short-term plans (≤180 days) have no setup fee. Long-term plans (up to 72 months) have a $31 fee (waived for low income). Automatic payments from your bank account get lower fees. Contact Revenue Department at 1-800-TAX-HELP.'
        },
        {
          q: 'How do I check my tax refund status?',
          a: 'Visit Revenue Department (/revenue/refunds) and enter your SSN, filing status, and exact refund amount. Refunds are typically processed in 21 days for e-filed returns with direct deposit, up to 6 weeks for paper checks.'
        }
      ]
    },
    {
      category: 'Police & Emergency Services',
      questions: [
        {
          q: 'When should I call 911 vs 311?',
          a: '911 is for life-threatening emergencies: crimes in progress, serious injuries, fires, missing children. 311 is for non-emergencies: noise complaints, minor incidents, general government questions. If in doubt, call 911.'
        },
        {
          q: 'How do I get a police clearance certificate?',
          a: 'Visit National Police Agency (/npa/services). Cost: $20. Processing: 3 business days. You need a National ID and biometric fingerprints. The certificate shows criminal history and open warrants. Required for many employment and visa applications.'
        },
        {
          q: 'Can I file a police report online?',
          a: 'Yes, for non-emergency incidents: theft under $2,500, vandalism, lost property, identity fraud, vehicle accidents without injuries. Visit NPA portal (/npa/report). For serious crimes or emergencies, call 911 immediately.'
        },
        {
          q: 'How do I apply for a firearm license?',
          a: 'Through National Police Agency (/npa/services). Requirements: (1) Safety training certification, (2) Secure storage proof, (3) Biometric background check, (4) No felony convictions, (5) Mental health clearance. Processing: 30-45 days.'
        }
      ]
    },
    {
      category: 'Health & Social Services',
      questions: [
        {
          q: 'How do I enroll in National Health Insurance?',
          a: 'Visit Health Department (/health/insurance). Plans: Standard ($50-$350/month) or Premium ($180-$520/month) based on income. Open enrollment: November 1 - December 31, coverage starts January 1. Special enrollment for life events (birth, marriage, job loss).'
        },
        {
          q: 'Where can I get vaccinations?',
          a: 'Visit Health Department (/health/vaccinations) to find clinic locations. Many vaccinations are free or low-cost. View your vaccination records online through PrayaPass. Schedule appointments to avoid wait times.'
        },
        {
          q: 'How do I apply for social benefits?',
          a: 'Visit Social Welfare Department (/swd/benefits). Available programs: Financial assistance, disability support, elderly care, family services. Eligibility is income-based. Apply online through PrayaPass or visit any SWD office with proof of income and ID.'
        },
        {
          q: 'How do I apply for public housing?',
          a: 'Visit Housing Authority (/housing/apply). Eligibility is income-based. Application is free and online through PrayaPass. Check waitlist status in your account. Average wait time varies by region (6-18 months).'
        }
      ]
    },
    {
      category: 'Business Services',
      questions: [
        {
          q: 'How do I register a new business?',
          a: 'Visit Companies Registry (/cr/register). Steps: (1) Reserve business name, (2) File articles of incorporation, (3) Register for tax ID with Revenue Department, (4) Obtain necessary licenses. Most registration can be done online through PrayaPass.'
        },
        {
          q: 'What licenses do I need for a cannabis business?',
          a: 'Visit Cannabis Tax Bureau (/ctb/apply). License types: Dispensary, cultivation, processing, testing. Requirements: Business plan, secure location, background checks, insurance, compliance with zoning laws. Processing: 60-90 days. Monthly tax returns required.'
        },
        {
          q: 'How do I get a building permit?',
          a: 'Visit Buildings Department (/bd/permits). Submit: (1) Site plans, (2) Architectural drawings, (3) Structural calculations, (4) Zoning approval. Fees vary by project size. Inspections required at multiple stages. Track permit status online.'
        },
        {
          q: 'Do I need a business account for taxes?',
          a: 'Yes, all businesses must register with Revenue Department (/revenue). You\'ll get a business tax ID for filing corporate taxes, VAT, payroll taxes. File quarterly estimated taxes if income exceeds $1,000/quarter.'
        }
      ]
    },
    {
      category: 'Postal & Shipping',
      questions: [
        {
          q: 'How do I track a package?',
          a: 'Visit Praya Post (/post/track) and enter your tracking number (format: PP + numbers). Get real-time updates on package location and estimated delivery. Sign up for email/SMS notifications.'
        },
        {
          q: 'What are your shipping rates?',
          a: 'Domestic: Starting at $5 for small parcels. International: Starting at $15. Express shipping available. Calculate exact rates at /post/ship based on weight, size, and destination. Bulk discounts available for businesses.'
        },
        {
          q: 'How do I rent a P.O. Box?',
          a: 'Visit any post office or apply online through Praya Post portal. Small boxes: $60/year, Large boxes: $120/year. You\'ll need two forms of ID. Package delivery to P.O. boxes available at select locations.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'The website isn\'t working. What should I do?',
          a: 'First, try: (1) Clear browser cache and cookies, (2) Try a different browser, (3) Disable browser extensions, (4) Check /status for service outages. If problems persist, contact support at info@govpraya.org with error details and screenshots.'
        },
        {
          q: 'Why can\'t I login to PrayaPass?',
          a: 'Common issues: (1) Caps lock is on, (2) Browser blocking cookies, (3) Account locked after 5 failed attempts (unlocks after 30 minutes), (4) Password expired (reset required every 90 days for security). Use "Forgot Password" if needed.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes! We use 256-bit SSL encryption (same as banks), PCI-DSS compliant payment processing, and never store full credit card numbers. All transactions are monitored for fraud. Look for the padlock icon in your browser address bar.'
        },
        {
          q: 'Can I use the portal on my mobile device?',
          a: 'Yes! The portal is fully responsive and works on smartphones and tablets. For the best mobile experience, use modern browsers (Chrome, Safari, Firefox, Edge). Some complex forms may be easier on desktop.'
        }
      ]
    },
    {
      category: 'Immigration & Travel',
      questions: [
        {
          q: 'What do I need to declare at customs?',
          a: 'Declare: All items purchased abroad, gifts received, items for commercial use, amounts over $800, alcohol/tobacco over limits. Visit CBCA portal (/cbca/travel) for complete lists of prohibited/restricted items and duty-free allowances.'
        },
        {
          q: 'How do I apply for a work visa?',
          a: 'Visit Customs & Border Control (/cbca). Requirements vary by visa type. Generally need: (1) Job offer from Praya employer, (2) Passport, (3) Proof of qualifications, (4) Background check, (5) Health examination. Processing: 60-90 days. Some visas require employer sponsorship.'
        },
        {
          q: 'What items are prohibited from import?',
          a: 'Prohibited: Illegal drugs, weapons (without permits), counterfeit goods, certain agricultural products, endangered species. Restricted: Prescription medications (need documentation), large cash amounts (must declare), firearms (require licenses). See /cbca/prohibited for full list.'
        }
      ]
    },
    {
      category: 'Accessibility & Language',
      questions: [
        {
          q: 'Do you offer services in other languages?',
          a: 'Primary language is English. Many offices have multilingual staff for common languages (Spanish, Chinese, French). Translation services available for documents (fees apply). Interpretation available at major offices - contact department 48 hours in advance to arrange.'
        },
        {
          q: 'Are government buildings wheelchair accessible?',
          a: 'Yes! All Praya government facilities are ADA-compliant with: wheelchair ramps, elevators, accessible parking, accessible restrooms, priority service windows. Sign language interpreters available (request 48 hours in advance). Contact info@govpraya.org for specific accommodations.'
        },
        {
          q: 'Can I get documents in alternative formats?',
          a: 'Yes! Available formats: Large print, Braille, audio recordings, electronic (screen reader compatible). Request alternative formats when applying or contact the department directly. Most formats provided at no additional cost.'
        }
      ]
    }
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  let questionIndex = 0

  return (
    <div className="static-page">
      <div className="static-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Find answers to common questions about Republic of Praya government services.
          Can't find what you're looking for? Contact us at <strong>info@govpraya.org</strong> or call <strong>311</strong>.
        </p>

        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2>{category.category}</h2>
            {category.questions.map((faq, qIndex) => {
              const currentIndex = questionIndex++
              return (
                <div key={qIndex} className="faq-item">
                  <button
                    className={`faq-question ${openIndex === currentIndex ? 'active' : ''}`}
                    onClick={() => toggleQuestion(currentIndex)}
                  >
                    <span>{faq.q}</span>
                    <svg
                      className="faq-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {openIndex === currentIndex && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        <section className="faq-contact">
          <h2>Still Have Questions?</h2>
          <p>Our support team is here to help:</p>
          <div className="contact-grid">
            <div className="contact-method">
              <strong>Email</strong>
              <p>info@govpraya.org</p>
            </div>
            <div className="contact-method">
              <strong>Phone</strong>
              <p>311 (General Inquiries)</p>
              <p>911 (Emergencies Only)</p>
            </div>
            <div className="contact-method">
              <strong>Hours</strong>
              <p>Mon-Fri: 8AM-5PM</p>
              <p>Online Services: 24/7</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

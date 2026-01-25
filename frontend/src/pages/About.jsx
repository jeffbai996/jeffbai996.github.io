import React from 'react'
import { Link } from 'react-router-dom'
import './StaticPages.css'

export default function About() {
  return (
    <div className="static-page">
      <div className="static-container">
        <h1>About the Republic of Praya</h1>

        <section className="about-hero">
          <p className="about-tagline">
            A modern, digital-first nation committed to transparency, efficiency, and accessibility through technology.
          </p>
        </section>

        <section>
          <h2>Our History</h2>
          <p>
            Founded on <strong>February 26, 2011</strong>, the Republic of Praya has grown from its original settlement on Flower Island to a thriving city-state. What began as a small coastal community has evolved into a modern nation of <strong>4.2 million citizens</strong>, known for its innovative approach to governance and commitment to digital transformation.
          </p>
          <p>
            Our founding principles emphasized transparency, efficiency, and citizen-centered governance—values that continue to guide our nation today.
          </p>
        </section>

        <section>
          <h2>Geography & Regions</h2>
          <p>
            The Republic of Praya encompasses diverse regions across our island nation:
          </p>

          <h3>Praya (Main City-State)</h3>
          <ul>
            <li><strong>Downtown:</strong> Our bustling commercial and government center, home to the Legislative Council and major government offices</li>
            <li><strong>Surowski Valley:</strong> A residential and cultural district known for its parks and museums</li>
            <li><strong>Western District:</strong> Industrial and technology hub, hosting our innovation centers and research facilities</li>
            <li><strong>Flower Island:</strong> The historic original settlement, now a protected heritage site</li>
          </ul>

          <h3>Braemar County</h3>
          <ul>
            <li><strong>Braemar City:</strong> The county seat, known for its educational institutions and agricultural markets</li>
            <li><strong>Oakville:</strong> A growing suburban community with excellent schools and family services</li>
          </ul>
        </section>

        <section>
          <h2>Climate & Environment</h2>
          <p>
            Praya experiences a <strong>temperate maritime climate</strong>, similar to Juneau, Vancouver, or Hokkaido. Our seasons are characterized by:
          </p>
          <ul>
            <li><strong>Winter (November-April):</strong> Cold and snowy with temperatures ranging from -5°C to 5°C. Significant snowfall brings 180-250 cm annually, with depths of 40-70 cm in cities and 150-200 cm in mountain regions.</li>
            <li><strong>Summer (May-October):</strong> Mild and comfortable with temperatures between 12°C and 20°C, perfect for outdoor activities.</li>
          </ul>
          <p>
            Our National Weather Service provides 24/7 monitoring through 50+ weather stations to keep citizens safe during winter storms and year-round weather events.
          </p>
        </section>

        <section>
          <h2>Government Structure</h2>

          <h3>Executive Leadership</h3>
          <div className="leadership-grid">
            <div className="leader-card">
              <h4>Office of the Chief Executive</h4>
              <p><strong>Jeff Bai</strong></p>
              <p className="leader-role">Head of State and Government</p>
            </div>
            <div className="leader-card">
              <h4>Governor, Braemar County</h4>
              <p><strong>Karson Mo</strong></p>
              <p className="leader-role">County Administrator</p>
            </div>
            <div className="leader-card">
              <h4>Governor, Praya County</h4>
              <p><strong>Michael Tang</strong></p>
              <p className="leader-role">County Administrator</p>
            </div>
          </div>

          <h3>Legislative Council</h3>
          <p>
            Our unicameral <Link to="/lc">Legislative Council</Link> is responsible for enacting laws and providing oversight of government operations. Council members are elected to represent districts across Praya and Braemar County.
          </p>

          <h3>Government Departments</h3>
          <p>
            The Republic operates <strong>16 major departments</strong> serving citizens across all aspects of government:
          </p>
          <div className="departments-grid">
            <div className="dept-item">
              <strong>National Police Agency</strong>
              <p>Public safety and emergency response</p>
            </div>
            <div className="dept-item">
              <strong>Revenue Department</strong>
              <p>Tax collection and financial services</p>
            </div>
            <div className="dept-item">
              <strong>Health Department</strong>
              <p>Public health and medical services</p>
            </div>
            <div className="dept-item">
              <strong>Interior Department</strong>
              <p>Civil records and land registry</p>
            </div>
            <div className="dept-item">
              <strong>Transport Department</strong>
              <p>Licensing and highway management</p>
            </div>
            <div className="dept-item">
              <strong>Bank of Praya</strong>
              <p>Central banking and monetary policy</p>
            </div>
            <div className="dept-item">
              <strong>Department of Justice</strong>
              <p>Courts and legal services</p>
            </div>
            <div className="dept-item">
              <strong>Housing Authority</strong>
              <p>Public housing programs</p>
            </div>
            <div className="dept-item">
              <strong>Customs & Border Control</strong>
              <p>Immigration and trade facilitation</p>
            </div>
            <div className="dept-item">
              <strong>Social Welfare Department</strong>
              <p>Social benefits and family services</p>
            </div>
            <div className="dept-item">
              <strong>Companies Registry</strong>
              <p>Business incorporation services</p>
            </div>
            <div className="dept-item">
              <strong>Buildings Department</strong>
              <p>Construction permits and safety</p>
            </div>
            <div className="dept-item">
              <strong>Cannabis Tax Bureau</strong>
              <p>Cannabis industry regulation</p>
            </div>
            <div className="dept-item">
              <strong>Praya Post</strong>
              <p>National postal service</p>
            </div>
            <div className="dept-item">
              <strong>National Weather Service</strong>
              <p>Weather forecasting and climate data</p>
            </div>
            <div className="dept-item">
              <strong>Public Service Commission</strong>
              <p>Utilities regulation</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Digital Government Initiative</h2>
          <p>
            Praya is a leader in digital government services. Our <strong>PrayaPass</strong> unified account system provides citizens with:
          </p>
          <ul>
            <li><strong>127 online services</strong> available 24/7</li>
            <li><strong>Single sign-on</strong> across all government departments</li>
            <li><strong>Secure payment processing</strong> with bank-level encryption</li>
            <li><strong>Real-time application tracking</strong> for documents and requests</li>
            <li><strong>Mobile-responsive design</strong> for access on any device</li>
            <li><strong>99.9% system uptime</strong> for reliable service delivery</li>
          </ul>
          <p>
            We are committed to making government services accessible, transparent, and efficient for all citizens.
          </p>
        </section>

        <section>
          <h2>Economy & Currency</h2>
          <p>
            The Republic of Praya operates a modern mixed economy with strong sectors in technology, finance, tourism, and agriculture. Our official currency is the <strong>Praya Dollar ($)</strong>, managed by the Bank of Praya, which maintains monetary policy and financial stability.
          </p>
          <p>
            Key economic indicators:
          </p>
          <ul>
            <li>Stable inflation rate around 2-3% annually</li>
            <li>Strong employment with diverse job opportunities</li>
            <li>Progressive taxation system supporting robust social services</li>
            <li>Thriving small business sector with streamlined registration</li>
          </ul>
        </section>

        <section>
          <h2>Public Services & Infrastructure</h2>

          <h3>Healthcare</h3>
          <p>
            Our universal National Health Insurance program covers <strong>94.2% of citizens</strong> with access to 1,247 healthcare facilities nationwide. Life expectancy averages 81.3 years.
          </p>

          <h3>Education</h3>
          <p>
            Free public education from primary through secondary levels, with affordable higher education options and vocational training programs.
          </p>

          <h3>Transportation</h3>
          <p>
            Well-maintained national highway system, efficient public transit in urban areas, and modern port facilities supporting international trade.
          </p>

          <h3>Public Safety</h3>
          <p>
            Low crime rates supported by professional police force with 3,421 active officers. Average emergency response time: 7 minutes 42 seconds.
          </p>
        </section>

        <section>
          <h2>Culture & Society</h2>
          <p>
            Praya is a diverse, multicultural society that values:
          </p>
          <ul>
            <li><strong>Inclusivity:</strong> Equal rights and opportunities for all citizens</li>
            <li><strong>Innovation:</strong> Embracing technology while preserving heritage</li>
            <li><strong>Sustainability:</strong> Protecting our environment for future generations</li>
            <li><strong>Education:</strong> Investing in our citizens' knowledge and skills</li>
            <li><strong>Community:</strong> Strong neighborhoods and civic participation</li>
          </ul>
        </section>

        <section>
          <h2>Environment & Sustainability</h2>
          <p>
            The Republic of Praya is committed to environmental stewardship:
          </p>
          <ul>
            <li>Protected parks and nature reserves managed by the Interior Department</li>
            <li>Real-time air quality monitoring through 87 stations (6 regions)</li>
            <li>Clean energy initiatives and carbon reduction goals</li>
            <li>Sustainable urban planning and green building standards</li>
            <li>Marine conservation programs protecting coastal ecosystems</li>
          </ul>
        </section>

        <section>
          <h2>National Statistics</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">4.2M</div>
              <div className="stat-label">Citizens</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">127</div>
              <div className="stat-label">Online Services</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">System Uptime</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">94.2%</div>
              <div className="stat-label">Health Coverage</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">87%</div>
              <div className="stat-label">E-File Rate</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">16</div>
              <div className="stat-label">Major Departments</div>
            </div>
          </div>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            We welcome inquiries from citizens, residents, and international visitors:
          </p>
          <div className="contact-info">
            <p><strong>General Inquiries:</strong> 311 or info@govpraya.org</p>
            <p><strong>Emergencies:</strong> 911</p>
            <p><strong>Office of the Chief Executive:</strong> Republic of Praya</p>
            <p><strong>Online Services:</strong> Available 24/7 through this portal</p>
          </div>
        </section>

        <section className="about-footer">
          <p>
            <em>The Republic of Praya: Building a better future through innovation, transparency, and service to our citizens.</em>
          </p>
        </section>
      </div>
    </div>
  )
}

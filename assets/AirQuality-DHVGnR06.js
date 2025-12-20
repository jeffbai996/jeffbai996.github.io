import{g as o,j as e,a as n}from"./index-BiQY3Ub6.js";import{b as l,L as i}from"./vendor-react-cPoFM-5f.js";/* empty css                   */import"./chatbot-utils-BA5qZPu5.js";import"./vendor-google-gkihbV2W.js";const d=[{range:"0-50",level:"Good",color:"#10b981",bgColor:"rgba(16, 185, 129, 0.15)",description:"Air quality is satisfactory, and air pollution poses little or no risk.",healthAdvice:"No precautions necessary. Ideal conditions for outdoor activities.",sensitiveGroups:"All individuals can enjoy outdoor activities without restrictions.",outdoorWorkers:"Normal working conditions. No protective measures required."},{range:"51-100",level:"Moderate",color:"#f59e0b",bgColor:"rgba(245, 158, 11, 0.15)",description:"Air quality is acceptable. However, there may be a risk for some people who are unusually sensitive to air pollution.",healthAdvice:"People with respiratory or heart conditions should limit prolonged outdoor exertion.",sensitiveGroups:"Unusually sensitive individuals may experience symptoms. Consider reducing intense outdoor activity.",outdoorWorkers:"Consider more frequent breaks for sensitive individuals."},{range:"101-150",level:"Unhealthy for Sensitive Groups",color:"#f97316",bgColor:"rgba(249, 115, 22, 0.15)",description:"Members of sensitive groups may experience health effects. The general public is less likely to be affected.",healthAdvice:"Children, elderly, and those with respiratory conditions should limit outdoor activity.",sensitiveGroups:"People with asthma, heart disease, or lung disease should significantly reduce outdoor exertion.",outdoorWorkers:"Workers with respiratory conditions should wear protective masks or limit exposure time."},{range:"151-200",level:"Unhealthy",color:"#ef4444",bgColor:"rgba(239, 68, 68, 0.15)",description:"Some members of the general public may experience health effects; sensitive groups may experience more serious health effects.",healthAdvice:"Everyone should reduce prolonged outdoor exertion. Sensitive groups should avoid outdoor activity.",sensitiveGroups:"All sensitive groups should remain indoors with air filtration if possible.",outdoorWorkers:"Employers should consider rescheduling outdoor work or provide respiratory protection (N95 masks)."},{range:"201-300",level:"Very Unhealthy",color:"#a855f7",bgColor:"rgba(168, 85, 247, 0.15)",description:"Health alert: The risk of health effects is increased for everyone.",healthAdvice:"Everyone should avoid prolonged outdoor exertion. Consider staying indoors.",sensitiveGroups:"All sensitive groups must avoid any outdoor activity. Use air purifiers indoors.",outdoorWorkers:"Outdoor work should be suspended or relocated indoors where possible. Essential outdoor work requires N95 or P100 masks."},{range:"301-500",level:"Hazardous",color:"#991b1b",bgColor:"rgba(153, 27, 27, 0.15)",description:"Health warning of emergency conditions: everyone is more likely to be affected.",healthAdvice:"Everyone should avoid all outdoor activity. Stay indoors with windows closed.",sensitiveGroups:"Emergency conditions - remain indoors, seal doors and windows, run air purifiers continuously.",outdoorWorkers:"All non-essential outdoor work must be suspended. Emergency responders require full respiratory protection."}],c=[{name:"PM2.5",fullName:"Fine Particulate Matter",description:"Tiny particles less than 2.5 micrometers in diameter that can penetrate deep into the lungs and bloodstream. These particles are so small they can enter the bloodstream and affect the cardiovascular system.",sources:"Vehicle emissions, industrial processes, wildfires, construction, cooking, burning of fossil fuels",healthEffects:"Aggravated asthma, decreased lung function, irregular heartbeat, heart attacks, premature death",standards:"WHO guideline: 5 μg/m³ annual mean; Praya standard: 12 μg/m³"},{name:"PM10",fullName:"Coarse Particulate Matter",description:"Particles between 2.5 and 10 micrometers in diameter that can irritate the respiratory system. While larger than PM2.5, they still pose significant health risks.",sources:"Dust, pollen, mold spores, road dust, construction sites, mining operations",healthEffects:"Respiratory irritation, aggravated asthma, lung damage, reduced lung function",standards:"WHO guideline: 15 μg/m³ annual mean; Praya standard: 50 μg/m³"},{name:"O₃",fullName:"Ground-Level Ozone",description:"A harmful gas formed when pollutants react with sunlight. Not to be confused with protective stratospheric ozone. Ground-level ozone is the main ingredient in smog.",sources:"Vehicle exhaust, industrial emissions, gasoline vapors, chemical solvents reacting with sunlight",healthEffects:"Chest pain, coughing, throat irritation, airway inflammation, reduced lung function, worsened bronchitis and emphysema",standards:"WHO guideline: 100 μg/m³ 8-hour mean; Praya standard: 120 μg/m³"},{name:"NO₂",fullName:"Nitrogen Dioxide",description:"A reddish-brown gas with a pungent odor that can irritate airways and aggravate respiratory diseases. It also contributes to the formation of ground-level ozone and particulate matter.",sources:"Vehicle engines, power plants, industrial facilities, home heating",healthEffects:"Airway inflammation, increased asthma attacks, reduced lung function, increased susceptibility to respiratory infections",standards:"WHO guideline: 10 μg/m³ annual mean; Praya standard: 40 μg/m³"},{name:"SO₂",fullName:"Sulfur Dioxide",description:"A colorless gas with a sharp odor that can harm the respiratory system and contribute to acid rain. It is highly reactive and can form secondary pollutants.",sources:"Power plants burning coal/oil, industrial processes, volcanic eruptions, shipping emissions",healthEffects:"Irritation of nose, throat, and airways, aggravated asthma, increased respiratory symptoms, hospital admissions",standards:"WHO guideline: 40 μg/m³ 24-hour mean; Praya standard: 75 μg/m³"},{name:"CO",fullName:"Carbon Monoxide",description:"A colorless, odorless gas that reduces oxygen delivery to the body's organs and tissues. At high concentrations, it can be lethal.",sources:"Vehicle exhaust, fuel combustion, industrial processes, faulty heating systems, fires",healthEffects:"Reduced oxygen delivery, chest pain in heart patients, impaired vision and coordination, headaches, dizziness, at high levels: fatal",standards:"WHO guideline: 4 mg/m³ 24-hour mean; Praya standard: 9 ppm"}],h=[{region:"Capital District",stations:15,status:"Online",avgAQI:38,trend:"stable"},{region:"Northern Province",stations:12,status:"Online",avgAQI:45,trend:"improving"},{region:"Eastern Coastal",stations:18,status:"Online",avgAQI:52,trend:"stable"},{region:"Southern Region",stations:14,status:"Online",avgAQI:41,trend:"improving"},{region:"Western Highlands",stations:10,status:"Online",avgAQI:35,trend:"stable"},{region:"Central Plains",stations:18,status:"Online",avgAQI:48,trend:"worsening"}],m=[{year:2020,goodDays:285,moderateDays:55,unhealthyDays:25},{year:2021,goodDays:295,moderateDays:50,unhealthyDays:20},{year:2022,goodDays:302,moderateDays:48,unhealthyDays:15},{year:2023,goodDays:310,moderateDays:45,unhealthyDays:10},{year:2024,goodDays:312,moderateDays:45,unhealthyDays:8}];function b(){const t=o(),s=n();return l.useEffect(()=>(document.body.classList.add("theme-dark-aqi"),()=>document.body.classList.remove("theme-dark-aqi")),[]),e.jsxs("div",{className:"aqi-dark-page",children:[e.jsx("header",{className:"dept-header aqi-dark-header",children:e.jsxs("div",{className:"container",children:[e.jsxs(i,{to:"/air-quality",className:"dept-logo",children:[e.jsx("div",{className:"logo-mark",style:{background:"linear-gradient(135deg, #10b981 0%, #059669 100%)"},children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17 7a5 5 0 0 0-10 0"}),e.jsx("path",{d:"M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),e.jsx("path",{d:"M19 12c0 7-7 10-7 10S5 19 5 12"})]})}),e.jsx("div",{className:"logo-text",children:e.jsx("h1",{children:"Air Quality Index"})})]}),e.jsxs("nav",{className:"nav",children:[e.jsx(i,{to:"/",className:"nav-link",children:"Gov Portal"}),e.jsx(i,{to:"/health",className:"nav-link",children:"Health Dept"})]})]})}),e.jsx("section",{className:"aqi-hero-dark",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"hero-content",children:[e.jsxs("div",{className:"hero-badge",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})}),"Environmental Health Monitoring"]}),e.jsxs("h2",{children:["Understanding ",e.jsx("span",{children:"Air Quality"})]}),e.jsx("p",{children:"The Air Quality Index (AQI) is a standardized indicator used to communicate the current state of air pollution and its potential health effects. The Republic of Praya operates a comprehensive network of 87 monitoring stations across all regions, providing real-time data to protect public health and inform policy decisions."}),e.jsx("p",{className:"hero-sub",children:"Our monitoring system tracks six major pollutants 24/7, with data updated every hour. Citizens can access real-time readings and receive alerts when air quality deteriorates in their area."})]})})}),e.jsx("section",{className:"stats-bar-dark",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Current AQI"}),e.jsx("span",{className:"stat-value",style:{color:t.color},children:t.value}),e.jsx("span",{className:"stat-change",children:t.label})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Monitoring Stations"}),e.jsx("span",{className:"stat-value",children:s.airQuality.monitoringStations}),e.jsx("span",{className:"stat-change",children:"Nationwide"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:'Days "Good" This Year'}),e.jsx("span",{className:"stat-value",children:s.airQuality.goodDaysThisYear}),e.jsxs("span",{className:"stat-change",children:["Out of ",s.airQuality.totalDaysThisYear]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-label",children:"Last Updated"}),e.jsx("span",{className:"stat-value",children:s.airQuality.lastUpdated.replace(" ago","")}),e.jsx("span",{className:"stat-change",children:"Ago"})]})]})})}),e.jsx("section",{className:"section-dark",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header-dark",children:[e.jsx("h2",{children:"AQI Scale Reference"}),e.jsx("p",{children:"Understanding what the numbers mean for your health and daily activities"})]}),e.jsx("div",{className:"aqi-scale-container-dark",children:d.map((a,r)=>e.jsxs("div",{className:"aqi-level-card-dark",style:{borderLeft:`4px solid ${a.color}`,background:a.bgColor},children:[e.jsxs("div",{className:"aqi-level-header-dark",children:[e.jsx("div",{className:"aqi-range-dark",style:{color:a.color},children:a.range}),e.jsx("div",{className:"aqi-level-name-dark",style:{color:a.color},children:a.level})]}),e.jsx("p",{className:"aqi-description-dark",children:a.description}),e.jsxs("div",{className:"aqi-details-grid",children:[e.jsxs("div",{className:"aqi-detail-block",children:[e.jsx("strong",{children:"General Health Advice:"}),e.jsx("p",{children:a.healthAdvice})]}),e.jsxs("div",{className:"aqi-detail-block",children:[e.jsx("strong",{children:"Sensitive Groups:"}),e.jsx("p",{children:a.sensitiveGroups})]}),e.jsxs("div",{className:"aqi-detail-block",children:[e.jsx("strong",{children:"Outdoor Workers:"}),e.jsx("p",{children:a.outdoorWorkers})]})]})]},r))})]})}),e.jsx("section",{className:"section-dark section-alt",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header-dark",children:[e.jsx("h2",{children:"Key Pollutants Monitored"}),e.jsx("p",{children:"Learn about the pollutants that affect air quality in Praya and their health implications"})]}),e.jsx("div",{className:"pollutants-grid-dark",children:c.map((a,r)=>e.jsxs("div",{className:"pollutant-card-dark",children:[e.jsxs("div",{className:"pollutant-header-dark",children:[e.jsx("span",{className:"pollutant-symbol-dark",children:a.name}),e.jsx("span",{className:"pollutant-name-dark",children:a.fullName})]}),e.jsx("p",{className:"pollutant-description-dark",children:a.description}),e.jsxs("div",{className:"pollutant-details",children:[e.jsxs("div",{className:"pollutant-detail",children:[e.jsx("strong",{children:"Common Sources:"}),e.jsx("p",{children:a.sources})]}),e.jsxs("div",{className:"pollutant-detail",children:[e.jsx("strong",{children:"Health Effects:"}),e.jsx("p",{children:a.healthEffects})]}),e.jsxs("div",{className:"pollutant-detail standards",children:[e.jsx("strong",{children:"Standards:"}),e.jsx("p",{children:a.standards})]})]})]},r))})]})}),e.jsx("section",{className:"section-dark",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header-dark",children:[e.jsx("h2",{children:"Regional Monitoring Network"}),e.jsx("p",{children:"Real-time status of air quality monitoring stations across Praya"})]}),e.jsx("div",{className:"monitoring-table-container",children:e.jsxs("table",{className:"monitoring-table-dark",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Region"}),e.jsx("th",{children:"Active Stations"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Average AQI"}),e.jsx("th",{children:"Trend"})]})}),e.jsx("tbody",{children:h.map((a,r)=>e.jsxs("tr",{children:[e.jsx("td",{children:a.region}),e.jsx("td",{children:a.stations}),e.jsx("td",{children:e.jsx("span",{className:"status-badge online",children:a.status})}),e.jsx("td",{children:e.jsx("span",{className:`aqi-badge ${a.avgAQI<=50?"good":a.avgAQI<=100?"moderate":"unhealthy"}`,children:a.avgAQI})}),e.jsx("td",{children:e.jsx("span",{className:`trend-indicator ${a.trend}`,children:a.trend==="improving"?"↓ Improving":a.trend==="worsening"?"↑ Worsening":"→ Stable"})})]},r))})]})})]})}),e.jsx("section",{className:"section-dark section-alt",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header-dark",children:[e.jsx("h2",{children:"Air Quality Trends (2020-2024)"}),e.jsx("p",{children:"Historical data showing improvement in air quality over the past five years"})]}),e.jsx("div",{className:"historical-grid",children:m.map((a,r)=>e.jsxs("div",{className:"historical-card-dark",children:[e.jsx("div",{className:"year-label",children:a.year}),e.jsxs("div",{className:"days-breakdown",children:[e.jsxs("div",{className:"day-stat good",children:[e.jsx("span",{className:"day-count",children:a.goodDays}),e.jsx("span",{className:"day-label",children:"Good Days"})]}),e.jsxs("div",{className:"day-stat moderate",children:[e.jsx("span",{className:"day-count",children:a.moderateDays}),e.jsx("span",{className:"day-label",children:"Moderate Days"})]}),e.jsxs("div",{className:"day-stat unhealthy",children:[e.jsx("span",{className:"day-count",children:a.unhealthyDays}),e.jsx("span",{className:"day-label",children:"Unhealthy Days"})]})]})]},r))})]})}),e.jsx("section",{className:"section-dark",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header-dark",children:[e.jsx("h2",{children:"Protecting Your Health"}),e.jsx("p",{children:"Practical steps to reduce your exposure to air pollution"})]}),e.jsxs("div",{className:"tips-grid-dark",children:[e.jsxs("div",{className:"tip-card-dark",children:[e.jsx("div",{className:"tip-icon-dark",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]})}),e.jsx("h3",{children:"Check Daily AQI"}),e.jsx("p",{children:"Monitor air quality forecasts before planning outdoor activities, especially for exercise. Use the official Praya Air app for real-time updates and personalized alerts based on your location."})]}),e.jsxs("div",{className:"tip-card-dark",children:[e.jsx("div",{className:"tip-icon-dark",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]})}),e.jsx("h3",{children:"Stay Indoors on High AQI Days"}),e.jsx("p",{children:"When AQI exceeds 150, limit outdoor exposure. Keep windows closed, use air filtration systems, and consider running HEPA air purifiers in rooms where you spend the most time."})]}),e.jsxs("div",{className:"tip-card-dark",children:[e.jsx("div",{className:"tip-icon-dark",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M8 12h8M12 8v8"})]})}),e.jsx("h3",{children:"Use N95 Masks When Needed"}),e.jsx("p",{children:"Properly fitted N95 or KN95 masks can filter fine particles during poor air quality episodes. Ensure a tight seal around your nose and mouth for maximum protection."})]}),e.jsxs("div",{className:"tip-card-dark",children:[e.jsx("div",{className:"tip-icon-dark",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})})}),e.jsx("h3",{children:"Know Your Sensitivity"}),e.jsx("p",{children:"Children, elderly individuals, and those with respiratory or cardiovascular conditions should take extra precautions. Consult your doctor about personal air quality thresholds."})]}),e.jsxs("div",{className:"tip-card-dark",children:[e.jsx("div",{className:"tip-icon-dark",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),e.jsx("h3",{children:"Time Your Activities"}),e.jsx("p",{children:"Ozone levels typically peak in afternoon hours. Schedule outdoor exercise for early morning when pollution levels are generally lower, especially during summer months."})]}),e.jsxs("div",{className:"tip-card-dark",children:[e.jsx("div",{className:"tip-icon-dark",children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e.jsx("h3",{children:"Reduce Indoor Sources"}),e.jsx("p",{children:"Minimize indoor air pollution by avoiding smoking indoors, using exhaust fans when cooking, and ensuring proper ventilation. Consider houseplants that help filter indoor air."})]})]})]})}),e.jsx("section",{className:"section-dark section-alt",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"section-header-dark",children:[e.jsx("h2",{children:"Air Quality Alerts & Notifications"}),e.jsx("p",{children:"Stay informed with our multi-channel alert system"})]}),e.jsxs("div",{className:"alerts-info-grid",children:[e.jsxs("div",{className:"alert-info-card",children:[e.jsx("h3",{children:"Mobile App Alerts"}),e.jsx("p",{children:"Download the Praya Air app for iOS and Android. Receive push notifications when air quality in your area changes significantly. Set custom thresholds based on your health needs."})]}),e.jsxs("div",{className:"alert-info-card",children:[e.jsx("h3",{children:"SMS Alerts"}),e.jsx("p",{children:"Register your phone number at gov.praya/air-alerts to receive text message notifications when AQI reaches Unhealthy levels in your registered locations."})]}),e.jsxs("div",{className:"alert-info-card",children:[e.jsx("h3",{children:"Email Digest"}),e.jsx("p",{children:"Subscribe to daily or weekly air quality reports delivered to your inbox. Includes regional analysis, health recommendations, and upcoming forecast."})]}),e.jsxs("div",{className:"alert-info-card",children:[e.jsx("h3",{children:"Emergency Broadcasts"}),e.jsx("p",{children:"During hazardous air quality events, emergency broadcasts will be issued through the National Emergency Alert System on TV and radio."})]})]})]})}),e.jsx("footer",{className:"footer-dark",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"footer-grid",children:[e.jsxs("div",{className:"footer-brand-dark",children:[e.jsx("h4",{children:"Air Quality Monitoring"}),e.jsx("p",{children:"A service of the Republic of Praya's Department of Health and Environmental Protection Agency, providing real-time air quality data to protect public health. Operating 87 monitoring stations across all regions with data updated hourly."})]}),e.jsxs("div",{className:"footer-section-dark",children:[e.jsx("h5",{children:"Related Services"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(i,{to:"/health",children:"Health Department"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Environmental Agency"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Weather Service"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Climate Action"})})]})]}),e.jsxs("div",{className:"footer-section-dark",children:[e.jsx("h5",{children:"Resources"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"#",children:"Air Quality Reports"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Historical Data"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Research Publications"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"API Documentation"})})]})]}),e.jsxs("div",{className:"footer-section-dark",children:[e.jsx("h5",{children:"Government"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(i,{to:"/",children:"Gov Portal"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Public Health Alerts"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Contact Us"})}),e.jsx("li",{children:e.jsx("a",{href:"#",children:"Accessibility"})})]})]})]}),e.jsxs("div",{className:"footer-bottom-dark",children:[e.jsx("span",{children:"© 2024 Republic of Praya. Air Quality Monitoring Service."}),e.jsxs("div",{className:"footer-legal-dark",children:[e.jsx("a",{href:"#",children:"Terms"}),e.jsx("a",{href:"#",children:"Privacy"}),e.jsx("a",{href:"#",children:"Data Policy"})]})]})]})}),e.jsx("style",{children:`
        .aqi-dark-page {
          background: #0f172a;
          min-height: 100vh;
          color: #e2e8f0;
        }

        .aqi-dark-header {
          background: #1e293b !important;
          border-bottom: 1px solid #334155;
        }

        .aqi-dark-header .logo-text h1 {
          color: #f1f5f9;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
        }

        .aqi-dark-header .nav-link {
          color: #94a3b8;
        }

        .aqi-dark-header .nav-link:hover {
          color: #10b981;
        }

        .aqi-hero-dark {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 4rem 0;
          border-bottom: 1px solid #334155;
        }

        .aqi-hero-dark .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .aqi-hero-dark h2 {
          font-size: 2.5rem;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }

        .aqi-hero-dark h2 span {
          color: #10b981;
        }

        .aqi-hero-dark p {
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 800px;
          margin-bottom: 1rem;
        }

        .aqi-hero-dark .hero-sub {
          font-size: 1rem;
          color: #64748b;
        }

        .stats-bar-dark {
          background: #1e293b;
          padding: 2rem 0;
          border-bottom: 1px solid #334155;
        }

        .stats-bar-dark .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }

        .stats-bar-dark .stat-item {
          text-align: center;
        }

        .stats-bar-dark .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .stats-bar-dark .stat-value {
          color: #f1f5f9;
          font-size: 2rem;
          font-weight: 700;
          display: block;
        }

        .stats-bar-dark .stat-value.good {
          color: #10b981;
        }

        .stats-bar-dark .stat-change {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .section-dark {
          padding: 4rem 0;
          background: #0f172a;
        }

        .section-dark.section-alt {
          background: #1e293b;
        }

        .section-header-dark {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-header-dark h2 {
          font-size: 1.75rem;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }

        .section-header-dark p {
          color: #94a3b8;
        }

        .aqi-scale-container-dark {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .aqi-level-card-dark {
          padding: 1.5rem;
          border-radius: 8px;
          transition: transform 0.2s ease;
        }

        .aqi-level-card-dark:hover {
          transform: translateX(4px);
        }

        .aqi-level-header-dark {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .aqi-range-dark {
          font-size: 1.5rem;
          font-weight: 700;
          min-width: 100px;
        }

        .aqi-level-name-dark {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .aqi-description-dark {
          color: #cbd5e1;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .aqi-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .aqi-detail-block {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem;
          border-radius: 6px;
        }

        .aqi-detail-block strong {
          color: #f1f5f9;
          font-size: 0.85rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .aqi-detail-block p {
          color: #94a3b8;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .pollutants-grid-dark {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .pollutant-card-dark {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
          transition: border-color 0.2s ease;
        }

        .pollutant-card-dark:hover {
          border-color: #10b981;
        }

        .pollutant-header-dark {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pollutant-symbol-dark {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .pollutant-name-dark {
          font-weight: 600;
          color: #f1f5f9;
        }

        .pollutant-description-dark {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .pollutant-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pollutant-detail {
          padding-top: 0.75rem;
          border-top: 1px solid #334155;
        }

        .pollutant-detail:first-child {
          border-top: none;
          padding-top: 0;
        }

        .pollutant-detail strong {
          color: #cbd5e1;
          font-size: 0.8rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .pollutant-detail p {
          color: #64748b;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .pollutant-detail.standards p {
          color: #10b981;
        }

        .monitoring-table-container {
          overflow-x: auto;
        }

        .monitoring-table-dark {
          width: 100%;
          border-collapse: collapse;
          background: #1e293b;
          border-radius: 8px;
          overflow: hidden;
        }

        .monitoring-table-dark th,
        .monitoring-table-dark td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #334155;
        }

        .monitoring-table-dark th {
          background: #0f172a;
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .monitoring-table-dark td {
          color: #e2e8f0;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-badge.online {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .aqi-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
        }

        .aqi-badge.good {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .aqi-badge.moderate {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .aqi-badge.unhealthy {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .trend-indicator {
          font-size: 0.85rem;
        }

        .trend-indicator.improving {
          color: #10b981;
        }

        .trend-indicator.worsening {
          color: #ef4444;
        }

        .trend-indicator.stable {
          color: #94a3b8;
        }

        .historical-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .historical-card-dark {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .year-label {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }

        .days-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .day-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          border-radius: 6px;
        }

        .day-stat.good {
          background: rgba(16, 185, 129, 0.15);
        }

        .day-stat.moderate {
          background: rgba(245, 158, 11, 0.15);
        }

        .day-stat.unhealthy {
          background: rgba(239, 68, 68, 0.15);
        }

        .day-count {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .day-stat.good .day-count { color: #10b981; }
        .day-stat.moderate .day-count { color: #f59e0b; }
        .day-stat.unhealthy .day-count { color: #ef4444; }

        .day-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .tips-grid-dark {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .tip-card-dark {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .tip-icon-dark {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .tip-icon-dark svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .tip-card-dark h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #f1f5f9;
        }

        .tip-card-dark p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .alerts-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .alert-info-card {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .alert-info-card h3 {
          color: #10b981;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }

        .alert-info-card p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .footer-dark {
          background: #0f172a;
          border-top: 1px solid #334155;
          padding: 3rem 0 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

        .footer-brand-dark h4 {
          color: #f1f5f9;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .footer-brand-dark p {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .footer-section-dark h5 {
          color: #f1f5f9;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .footer-section-dark ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section-dark li {
          margin-bottom: 0.5rem;
        }

        .footer-section-dark a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-section-dark a:hover {
          color: #10b981;
        }

        .footer-bottom-dark {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid #334155;
          color: #64748b;
          font-size: 0.85rem;
        }

        .footer-legal-dark a {
          color: #64748b;
          text-decoration: none;
          margin-left: 1.5rem;
        }

        .footer-legal-dark a:hover {
          color: #10b981;
        }
      `})]})}export{b as default};

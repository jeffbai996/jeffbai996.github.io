import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

// Citizen Services Knowledge Base
const knowledgeBase = [
  {
    keywords: ['tax', 'taxes', 'pay tax', 'file tax', 'revenue', 'income tax'],
    response: "For tax-related inquiries, please visit the Revenue Department (RD). You can file taxes online through your PrayaPass account, or visit any RD office during business hours (Mon-Fri, 8AM-5PM). Need help with cannabis taxes specifically? Visit the Cannabis Tax Bureau (CTB)."
  },
  {
    keywords: ['cannabis', 'marijuana', 'ctb', 'cannabis tax', 'cannabis license', 'dispensary'],
    response: "The Cannabis Tax Bureau (CTB) handles all cannabis-related licensing and taxation. For new dispensary licenses, visit the CTB portal. Current license holders can file monthly tax returns online. For questions, call the CTB hotline or visit during business hours."
  },
  {
    keywords: ['id', 'identification', 'passport', 'driver license', 'drivers license', 'birth certificate', 'documents'],
    response: "The Interior Department handles all identification documents including National IDs, passports, and birth certificates. To apply or renew, log in with your PrayaPass account or visit an Interior office. Processing times: National ID (5-7 days), Passport (10-14 days), Birth Certificate (3-5 days)."
  },
  {
    keywords: ['police', 'crime', 'report', 'emergency', 'npa', 'law enforcement', 'theft', 'accident'],
    response: "For emergencies, call 911 immediately. For non-emergency police matters, contact the National Police Agency (NPA). You can file police reports online through the NPA portal or visit your local station. The NPA also handles background checks and permits."
  },
  {
    keywords: ['court', 'legal', 'lawsuit', 'attorney', 'lawyer', 'doj', 'justice', 'case'],
    response: "The Department of Justice (DOJ) oversees all court proceedings and legal matters. For case information, use the DOJ case lookup tool. For legal aid services, contact the Public Defender's Office. Court schedules and filings are available on the DOJ portal."
  },
  {
    keywords: ['bank', 'banking', 'account', 'loan', 'bop', 'savings', 'currency', 'praya dollar'],
    response: "The Bank of Praya (BOP) is the national central bank. For personal banking needs, visit any BOP branch or use online banking. The official currency is the Praya Dollar (¤). For business loans or mortgages, schedule an appointment with a BOP financial advisor."
  },
  {
    keywords: ['customs', 'border', 'import', 'export', 'cbca', 'shipping', 'travel'],
    response: "The Customs and Border Control Agency (CBCA) handles all import/export regulations and border control. For import permits, apply online through the CBCA portal. Travelers should review entry requirements before visiting. Duty-free allowances and prohibited items are listed on our website."
  },
  {
    keywords: ['health', 'hospital', 'medical', 'doctor', 'insurance', 'clinic', 'healthcare'],
    response: "The Department of Health manages public health services and healthcare regulations. For medical emergencies, call 911 or visit the nearest hospital. Health insurance inquiries can be directed to the National Health Insurance office. Vaccination schedules and public health advisories are available online."
  },
  {
    keywords: ['housing', 'rent', 'apartment', 'home', 'property', 'landlord', 'tenant'],
    response: "The Housing Authority assists with public housing applications, tenant rights, and landlord regulations. For public housing waitlist status, check your PrayaPass account. Rental assistance programs and eviction protection information are available at any Housing Authority office."
  },
  {
    keywords: ['mail', 'post', 'package', 'shipping', 'postal', 'letter', 'delivery'],
    response: "Praya Post handles all domestic and international mail services. Track packages online using your tracking number. Post office hours are Mon-Fri 8AM-6PM, Sat 9AM-1PM. For bulk mailing or business accounts, contact your local post office or apply online."
  },
  {
    keywords: ['login', 'account', 'prayapass', 'password', 'register', 'sign up', 'forgot password'],
    response: "PrayaPass is your unified government account. To create an account, click 'Register' and follow the steps. Forgot your password? Use the 'Forgot Password' link on the login page. For account security issues, contact PrayaPass support or visit any government office with valid ID."
  },
  {
    keywords: ['legislative', 'law', 'bill', 'council', 'vote', 'representative'],
    response: "The Legislative Council (LC) is responsible for creating and passing laws. You can track current bills, view voting records, and contact your representative through the LC portal. Public hearings are announced on the official website and are open to all citizens."
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: "Hello! Welcome to Praya Citizen Services. I'm here to help you navigate government services. You can ask me about taxes, IDs, police services, healthcare, housing, and more. How can I assist you today?"
  },
  {
    keywords: ['help', 'what can you do', 'services', 'options'],
    response: "I can help you with information about: \n• Taxes & Revenue (RD, CTB)\n• IDs & Documents (Interior)\n• Police & Justice (NPA, DOJ)\n• Banking (BOP)\n• Customs & Border (CBCA)\n• Health Services\n• Housing Authority\n• Postal Services\n• PrayaPass Account Help\n\nJust ask me a question about any of these services!"
  },
  {
    keywords: ['hours', 'open', 'closed', 'business hours', 'schedule', 'when'],
    response: "Most government offices are open Monday-Friday, 8AM-5PM. Some services vary:\n• Post Offices: Mon-Fri 8AM-6PM, Sat 9AM-1PM\n• Emergency Services: 24/7\n• Online Services: Available 24/7\n\nFor specific office hours, please check the department's page or call ahead."
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    response: "You're welcome! Is there anything else I can help you with regarding government services?"
  }
]

// Find best matching response
function findResponse(message) {
  const lowerMessage = message.toLowerCase()
  let bestMatch = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        score += keyword.length // Longer matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response
  }

  return "I'm not sure I understand that question. I can help you with:\n• Taxes & Revenue\n• IDs & Passports\n• Police & Legal matters\n• Banking\n• Healthcare\n• Housing\n• Postal Services\n\nCould you please rephrase your question or ask about one of these topics?"
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm the Praya Citizen Services Assistant. How can I help you today?",
      time: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim(),
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const response = findResponse(userMessage.text)
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response,
        time: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`chat-widget-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-widget-header">
          <div className="chat-widget-header-info">
            <div className="chat-widget-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <div>
              <h3>Citizen Services</h3>
              <span className="chat-widget-status">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>
          <button className="chat-widget-close" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-widget-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.type}`}>
              <div className="chat-message-content">
                {msg.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
              <span className="chat-message-time">{formatTime(msg.time)}</span>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot">
              <div className="chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-widget-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="chat-send-button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="chat-widget-footer">
          Powered by Praya Citizen Services
        </div>
      </div>
    </>
  )
}

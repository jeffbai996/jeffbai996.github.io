/**
 * Standalone Chatbot Embed for Static Pages
 * This creates a fully functional chat widget with department-specific context
 * Dark theme with Gemini API integration
 */
(function() {
  'use strict';

  // Department context mapping based on page URL
  const DEPARTMENT_CONTEXTS = {
    'NPA_Praya.html': {
      name: 'National Police Agency',
      abbrev: 'NPA',
      color: '#1d4ed8',
      focus: 'You are helping users with National Police Agency services including emergency response, crime reporting, police clearance certificates, and firearm licensing.',
      services: ['Emergency Response (911)', 'Crime Reporting', 'Police Clearance Certificates', 'Firearm Licensing', 'Traffic Services', 'Background Checks'],
      hours: 'Emergency: 24/7 | Walk-in: Mon-Fri 8AM-6PM',
      contact: 'Emergency: 911 | Non-emergency: 311'
    },
    'BOP_Praya.html': {
      name: 'Bank of Praya',
      abbrev: 'BOP',
      color: '#0ea5e9',
      focus: 'You are helping users with Bank of Praya services including central banking, monetary policy, personal banking, and business loans.',
      services: ['Personal Banking', 'Business Loans', 'Mortgage Services', 'Currency Exchange', 'Economic Reports'],
      hours: 'Mon-Fri 9AM-5PM | Sat 9AM-1PM',
      contact: '+854 300 0000'
    },
    'CTB_Praya.html': {
      name: 'Cannabis Tax Bureau',
      abbrev: 'CTB',
      color: '#2d8659',
      focus: 'You are helping users with Cannabis Tax Bureau services including dispensary licensing, cultivation permits, and tax filing for cannabis businesses.',
      services: ['Dispensary Licensing', 'Cultivation Permits', 'Tax Filing', 'Compliance Audits', 'Business Registration'],
      hours: 'Mon-Fri 8AM-5PM',
      contact: '+854 400 0000'
    },
    'DOJ_Praya.html': {
      name: 'Department of Justice',
      abbrev: 'DOJ',
      color: '#991b1b',
      focus: 'You are helping users with Department of Justice services including court system, case lookup, legal aid, and criminal code information.',
      services: ['Court Case Lookup', 'Legal Aid Services', 'Criminal Records', 'Public Defender', 'Victim Services'],
      hours: 'Mon-Fri 8AM-5PM',
      contact: '+854 500 0000'
    },
    'ID_Praya.html': {
      name: 'Interior Department',
      abbrev: 'ID',
      color: '#78716c',
      focus: 'You are helping users with Interior Department services including national IDs, passports, birth certificates, land registry, and building permits.',
      services: ['National ID Cards', 'Passports', 'Birth Certificates', 'Marriage Certificates', 'Land Registry', 'Building Permits'],
      hours: 'Mon-Fri 8AM-5PM | Sat 9AM-1PM',
      contact: '+854 600 0000'
    },
    'TD_Praya.html': {
      name: 'Transport Department',
      abbrev: 'TD',
      color: '#0d9488',
      focus: 'You are helping users with Transport Department services including driver licensing, vehicle registration, and road safety.',
      services: ['Driver Licensing', 'Vehicle Registration', 'Road Safety Programs', 'Commercial Vehicle Permits', 'Traffic Violations'],
      hours: 'Mon-Fri 8AM-5PM',
      contact: '+854 700 0000'
    },
    'RD_Praya.html': {
      name: 'Revenue Department',
      abbrev: 'RD',
      color: '#0ea5e9',
      focus: 'You are helping users with Revenue Department services including tax filing, business accounts, and tax benefits.',
      services: ['Tax Filing', 'Business Tax Registration', 'Tax Refunds', 'Payment Plans', 'Tax Benefits'],
      hours: 'Mon-Fri 8AM-5PM',
      contact: '+854 800 0000'
    },
    'Praya_Post.html': {
      name: 'Praya Post',
      abbrev: 'PP',
      color: '#f97316',
      focus: 'You are helping users with Praya Post services including package delivery, international mail, and P.O. box rentals.',
      services: ['Package Tracking', 'Domestic Mail', 'International Shipping', 'P.O. Box Rentals', 'Certified Mail'],
      hours: 'Mon-Fri 8AM-6PM | Sat 9AM-1PM',
      contact: '+854 900 0000'
    },
    'Health_Praya.html': {
      name: 'Health Department',
      abbrev: 'HD',
      color: '#dc2626',
      focus: 'You are helping users with Health Department services including public health, disease control, healthcare licensing, and vaccination schedules.',
      services: ['Vaccination Programs', 'Health Inspections', 'Medical Licensing', 'Disease Control', 'Public Health Alerts'],
      hours: 'Mon-Fri 8AM-5PM',
      contact: '+854 100 0000'
    },
    'Housing_Authority_Praya.html': {
      name: 'Housing Authority',
      abbrev: 'HA',
      color: '#ea580c',
      focus: 'You are helping users with Housing Authority services including public housing applications, eligibility checks, and rental assistance programs.',
      services: ['Public Housing Applications', 'Rental Assistance', 'Section 8 Vouchers', 'Tenant Rights', 'Housing Inspections'],
      hours: 'Mon-Fri 8AM-5PM',
      contact: '+854 110 0000'
    },
    'CBCA_Praya.html': {
      name: 'Customs & Border Control Agency',
      abbrev: 'CBCA',
      color: '#0891b2',
      focus: 'You are helping users with Customs & Border Control services including import/export permits, customs declarations, and immigration.',
      services: ['Import/Export Permits', 'Customs Declarations', 'Immigration Services', 'Visa Processing', 'Border Crossing Info'],
      hours: 'Border: 24/7 | Office: Mon-Fri 8AM-5PM',
      contact: '+854 120 0000'
    },
    'LC_Praya.html': {
      name: 'Legislative Council',
      abbrev: 'LC',
      color: '#6366f1',
      focus: 'You are helping users with Legislative Council services including bill tracking, voting records, and contacting representatives.',
      services: ['Bill Tracking', 'Voting Records', 'Contact Representatives', 'Public Hearings', 'Legislative Calendar'],
      hours: 'Mon-Fri 9AM-5PM',
      contact: '+854 130 0000'
    },
    'PSE_Praya.html': {
      name: 'Praya Stock Exchange',
      abbrev: 'PSE',
      color: '#0ea5e9',
      focus: 'You are helping users with Praya Stock Exchange services including securities trading, market data, and investment information.',
      services: ['Market Data', 'Stock Listings', 'Investment Information', 'Broker Registration', 'Trading Rules'],
      hours: 'Trading: Mon-Fri 9AM-4PM',
      contact: '+854 140 0000'
    }
  };

  // Detect current department from URL
  function detectDepartment() {
    const path = window.location.pathname;
    for (const [filename, context] of Object.entries(DEPARTMENT_CONTEXTS)) {
      if (path.includes(filename)) {
        return context;
      }
    }
    return null;
  }

  // Chat state
  let conversationHistory = [];
  let isOpen = false;
  const currentDepartment = detectDepartment();

  // Color utility functions
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
      (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
      .toString(16).slice(1);
  }

  // Create chat widget with dark theme
  function createChatWidget() {
    // Get department-specific color or use default
    const primaryColor = currentDepartment ? currentDepartment.color : '#f97316';
    const darkColor = shadeColor(primaryColor, -20);

    // Dark theme CSS variables
    const bgDark = '#0b1020';
    const bgCard = '#101726';
    const bgElevated = '#0f172a';
    const borderColor = '#1f2937';
    const borderSubtle = '#1e293b';
    const textPrimary = '#f8fafc';
    const textSecondary = '#cbd5e1';
    const textMuted = '#94a3b8';

    // Add styles - Dark Theme
    const styles = document.createElement('style');
    styles.textContent = `
      #praya-chat-button {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        border: none;
        box-shadow: 0 4px 20px ${hexToRgba(primaryColor, 0.4)};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 9998;
        color: white;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }

      #praya-chat-button:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 28px ${hexToRgba(primaryColor, 0.5)};
      }

      #praya-chat-button:active {
        transform: scale(0.95);
      }

      #praya-chat-button svg {
        width: 28px;
        height: 28px;
      }

      #praya-chat-widget {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 380px;
        max-width: calc(100vw - 48px);
        height: 550px;
        max-height: calc(100vh - 140px);
        background: ${bgCard};
        border: 1px solid ${borderColor};
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        display: none;
        flex-direction: column;
        z-index: 9999;
        overflow: hidden;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }

      #praya-chat-widget.open {
        display: flex;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .chat-header {
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        color: white;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }

      .chat-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .chat-header-text h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
      }

      .chat-header-text p {
        margin: 4px 0 0 0;
        font-size: 12px;
        opacity: 0.9;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .chat-header-text .status-dot {
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .chat-close {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        opacity: 0.9;
        transition: all 0.2s;
      }

      .chat-close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.25);
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        background: ${bgDark};
        display: flex;
        flex-direction: column;
        gap: 12px;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: contain;
      }

      .chat-messages::-webkit-scrollbar {
        width: 6px;
      }

      .chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }

      .chat-messages::-webkit-scrollbar-thumb {
        background: ${borderColor};
        border-radius: 3px;
      }

      .chat-message {
        max-width: 85%;
        display: flex;
        flex-direction: column;
        animation: messageSlide 0.3s ease;
      }

      @keyframes messageSlide {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .chat-message.user {
        align-self: flex-end;
      }

      .chat-message.bot {
        align-self: flex-start;
      }

      .message-bubble {
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
      }

      .chat-message.bot .message-bubble {
        background: ${bgCard};
        color: ${textPrimary};
        border: 1px solid ${borderSubtle};
        border-bottom-left-radius: 4px;
      }

      .chat-message.user .message-bubble {
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        color: white;
        border-bottom-right-radius: 4px;
      }

      .message-time {
        font-size: 10px;
        color: ${textMuted};
        margin-top: 4px;
        padding: 0 4px;
      }

      .chat-message.user .message-time {
        text-align: right;
      }

      .chat-input-container {
        padding: 12px 16px;
        background: ${bgCard};
        border-top: 1px solid ${borderSubtle};
        flex-shrink: 0;
      }

      .chat-input-wrapper {
        display: flex;
        gap: 8px;
      }

      .chat-input {
        flex: 1;
        padding: 12px 16px;
        background: ${bgElevated};
        border: 1px solid ${borderColor};
        border-radius: 24px;
        font-size: 16px;
        font-family: inherit;
        outline: none;
        color: ${textPrimary};
        transition: border-color 0.2s;
        -webkit-appearance: none;
      }

      .chat-input:focus {
        border-color: ${primaryColor};
      }

      .chat-input::placeholder {
        color: ${textMuted};
      }

      .chat-send {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
      }

      .chat-send:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 4px 12px ${hexToRgba(primaryColor, 0.4)};
      }

      .chat-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .chat-send svg {
        width: 20px;
        height: 20px;
      }

      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 16px;
        background: ${bgCard};
        border: 1px solid ${borderSubtle};
        border-radius: 16px;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
      }

      .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${textMuted};
        animation: typing 1.4s infinite;
      }

      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-4px);
          opacity: 1;
        }
      }

      .chat-error {
        color: #ef4444;
        font-size: 13px;
        padding: 8px 12px;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        border-radius: 8px;
        margin-bottom: 8px;
      }

      .chat-footer {
        padding: 8px 16px;
        background: ${bgCard};
        border-top: 1px solid ${borderSubtle};
        font-size: 11px;
        color: ${textMuted};
        text-align: center;
        flex-shrink: 0;
      }

      /* Mobile Responsive */
      @media (max-width: 480px) {
        #praya-chat-button {
          bottom: 16px;
          right: 16px;
          width: 56px;
          height: 56px;
        }

        #praya-chat-button svg {
          width: 26px;
          height: 26px;
        }

        #praya-chat-widget {
          bottom: 80px;
          right: 12px;
          left: 12px;
          width: auto;
          max-width: none;
          height: 520px;
          max-height: calc(100vh - 100px);
          max-height: calc(100dvh - 100px);
          border-radius: 12px;
        }

        .chat-header {
          padding: 14px 16px;
        }

        .chat-header-text h3 {
          font-size: 14px;
        }

        .chat-header-text p {
          font-size: 11px;
        }

        .chat-messages {
          padding: 12px;
          gap: 10px;
        }

        .chat-message {
          max-width: 90%;
        }

        .message-bubble {
          padding: 10px 14px;
          font-size: 14px;
          border-radius: 14px;
        }

        .chat-message.bot .message-bubble {
          border-bottom-left-radius: 3px;
        }

        .chat-message.user .message-bubble {
          border-bottom-right-radius: 3px;
        }

        .chat-input-container {
          padding: 10px 12px;
        }

        .chat-input {
          padding: 11px 14px;
          font-size: 16px;
          border-radius: 22px;
        }

        .chat-send {
          width: 42px;
          height: 42px;
          min-width: 42px;
          min-height: 42px;
        }

        .chat-send svg {
          width: 18px;
          height: 18px;
        }

        .chat-footer {
          padding: 6px 12px;
          font-size: 10px;
        }
      }

      /* iOS-specific fixes */
      @supports (-webkit-touch-callout: none) {
        #praya-chat-widget {
          height: 480px !important;
          max-height: 65vh !important;
        }

        .chat-input {
          font-size: 16px !important;
        }

        .chat-messages {
          -webkit-overflow-scrolling: touch;
        }
      }

      /* Extra small devices */
      @media (max-width: 360px) {
        #praya-chat-button {
          bottom: 12px;
          right: 12px;
          width: 52px;
          height: 52px;
        }

        #praya-chat-widget {
          bottom: 72px;
          right: 8px;
          left: 8px;
          height: calc(100vh - 90px);
          border-radius: 10px;
        }

        .message-bubble {
          padding: 9px 12px;
          font-size: 13px;
        }
      }
    `;

    document.head.appendChild(styles);

    // Create button
    const button = document.createElement('button');
    button.id = 'praya-chat-button';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    button.setAttribute('aria-label', 'Open chatbot');
    button.setAttribute('title', 'Need help? Chat with us');

    // Create widget with dark theme
    const widget = document.createElement('div');
    widget.id = 'praya-chat-widget';
    widget.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-header-text">
            <h3>Citizen Services</h3>
            <p><span class="status-dot"></span>${currentDepartment ? currentDepartment.name : 'GOV.PRAYA'}</p>
          </div>
        </div>
        <button class="chat-close" aria-label="Close chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="chat-message bot">
          <div class="message-bubble">
            ${currentDepartment
              ? `Welcome to ${currentDepartment.name} Citizen Services! I'm your AI assistant powered by GP.AI. I can help you with:\n\n${currentDepartment.services.slice(0, 4).map(s => '• ' + s).join('\n')}\n\nHow can I assist you today?`
              : 'Welcome to GOV.PRAYA Citizen Services! I\'m your AI assistant. How can I help you today?'
            }
          </div>
        </div>
      </div>
      <div class="chat-input-container">
        <div class="chat-input-wrapper">
          <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." autocomplete="off" />
          <button class="chat-send" id="chat-send" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="chat-footer">
        Powered by GP.AI
      </div>
    `;

    document.body.appendChild(button);
    document.body.appendChild(widget);

    // Event listeners
    button.addEventListener('click', toggleChat);
    widget.querySelector('.chat-close').addEventListener('click', toggleChat);

    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  function toggleChat() {
    isOpen = !isOpen;
    const widget = document.getElementById('praya-chat-widget');
    if (isOpen) {
      widget.classList.add('open');
      setTimeout(() => {
        document.getElementById('chat-input').focus();
      }, 100);
    } else {
      widget.classList.remove('open');
    }
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    // Format text with line breaks and bold
    const formattedText = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    messageDiv.innerHTML = `
      <div class="message-bubble">${formattedText}</div>
      <span class="message-time">${formatTime(new Date())}</span>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function showError(message) {
    const container = document.querySelector('.chat-input-container');
    let errorDiv = container.querySelector('.chat-error');

    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'chat-error';
      container.insertBefore(errorDiv, container.firstChild);
    }

    errorDiv.textContent = message;

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  async function sendMessage() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, true);
    conversationHistory.push({ role: 'user', text: message });
    input.value = '';

    // Disable input
    sendBtn.disabled = true;
    input.disabled = true;

    // Show typing indicator
    showTypingIndicator();

    try {
      // Build context-aware system prompt with rich department info
      let systemPrompt = `You are a helpful, professional AI assistant for the Republic of Praya government portal. You provide accurate, concise information about government services.`;

      if (currentDepartment) {
        systemPrompt += `\n\n## Current Department: ${currentDepartment.name} (${currentDepartment.abbrev})

${currentDepartment.focus}

### Available Services:
${currentDepartment.services.map(s => '- ' + s).join('\n')}

### Hours of Operation:
${currentDepartment.hours}

### Contact:
${currentDepartment.contact}

The user is currently on the ${currentDepartment.name} page. Prioritize information relevant to this department while still being helpful with general government questions. Be conversational but professional.`;
      }

      systemPrompt += `\n\n## Response Guidelines:
- Keep responses concise (under 150 words) unless detailed info is requested
- Use bullet points for lists of services or steps
- Be friendly and helpful
- If you don't have specific information, direct users to contact the department or visit the main portal
- Format important terms in bold using **term**
- Always provide actionable next steps when possible`;

      const response = await callGeminiAPI(message, systemPrompt);

      hideTypingIndicator();
      addMessage(response, false);
      conversationHistory.push({ role: 'model', text: response });

    } catch (error) {
      hideTypingIndicator();
      showError(error.message || 'Failed to get response. Please try again.');
      console.error('Chat error:', error);
    } finally {
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  async function callGeminiAPI(userMessage, systemPrompt) {
    // API key will be injected during build from GitHub secrets
    const apiKey = 'GEMINI_API_KEY_PLACEHOLDER';

    if (!apiKey || apiKey === 'GEMINI_API_KEY_PLACEHOLDER') {
      // Provide helpful fallback responses
      return getFallbackResponse(userMessage);
    }

    try {
      // Build the full request with conversation history
      const contents = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I am ready to help users with government services for this department, keeping responses concise, professional, and helpful.' }]
        }
      ];

      // Add conversation history (last 6 exchanges) - FIXED: use 'model' not 'assistant'
      const recentHistory = conversationHistory.slice(-12);
      recentHistory.forEach(msg => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',  // Ensure correct role for Gemini API
          parts: [{ text: msg.text }]
        });
      });

      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1500,
              topP: 0.95,
              topK: 40,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API error:', errorData);

        if (response.status === 429) {
          throw new Error('API quota exceeded. Please try again later.');
        } else if (response.status === 400 && errorData.error?.message?.includes('safety')) {
          throw new Error('Response blocked due to safety filters. Please rephrase your question.');
        } else {
          throw new Error('Failed to get response. Please try again.');
        }
      }

      const data = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated. Please try rephrasing your question.');
      }

      const candidate = data.candidates[0];
      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        throw new Error('Invalid response format. Please try again.');
      }

      return candidate.content.parts[0].text;
    } catch (error) {
      console.error('Gemini API call failed:', error);
      // Fall back to basic responses if API fails
      if (error.message.includes('quota') || error.message.includes('safety') || error.message.includes('rephras')) {
        throw error;
      }
      return getFallbackResponse(userMessage);
    }
  }

  function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Department-specific responses with richer context
    if (currentDepartment) {
      // Hours and availability
      if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time') || lowerMessage.includes('when')) {
        return `**${currentDepartment.name} Hours:**\n${currentDepartment.hours}\n\nFor specific service availability, please contact: ${currentDepartment.contact}`;
      }

      // Contact information
      if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
        return `**Contact ${currentDepartment.name}:**\n${currentDepartment.contact}\n\n**Hours:** ${currentDepartment.hours}\n\nYou can also visit our office in person during business hours.`;
      }

      // Services
      if (lowerMessage.includes('service') || lowerMessage.includes('help') || lowerMessage.includes('what can') || lowerMessage.includes('do you')) {
        return `**${currentDepartment.name} Services:**\n\n${currentDepartment.services.map(s => '• ' + s).join('\n')}\n\nHow can I help you with any of these services?`;
      }

      // Generic department help
      return `I'm here to help with **${currentDepartment.name}** services!\n\n**Available Services:**\n${currentDepartment.services.slice(0, 4).map(s => '• ' + s).join('\n')}\n\n**Contact:** ${currentDepartment.contact}\n**Hours:** ${currentDepartment.hours}\n\nWhat would you like to know more about?`;
    }

    // Generic fallback
    return `Thank you for your question! For comprehensive help with all government services, please visit the main portal at https://jeffbai996.github.io/ where our full AI-powered assistant can provide detailed guidance.\n\nYou can also contact specific departments directly for immediate assistance.`;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  } else {
    createChatWidget();
  }
})();

/**
 * Standalone Chatbot Embed for Static Pages
 * This creates a fully functional chat widget with department-specific context
 */
(function() {
  'use strict';

  // Department context mapping based on page URL
  const DEPARTMENT_CONTEXTS = {
    'NPA_Praya.html': {
      name: 'National Police Agency',
      abbrev: 'NPA',
      color: '#1d4ed8',
      focus: 'You are helping users with National Police Agency services including emergency response, crime reporting, police clearance certificates, and firearm licensing.'
    },
    'BOP_Praya.html': {
      name: 'Bank of Praya',
      abbrev: 'BOP',
      color: '#0ea5e9',
      focus: 'You are helping users with Bank of Praya services including central banking, monetary policy, personal banking, and business loans.'
    },
    'CTB_Praya.html': {
      name: 'Cannabis Tax Bureau',
      abbrev: 'CTB',
      color: '#2d8659',
      focus: 'You are helping users with Cannabis Tax Bureau services including dispensary licensing, cultivation permits, and tax filing.'
    },
    'DOJ_Praya.html': {
      name: 'Department of Justice',
      abbrev: 'DOJ',
      color: '#991b1b',
      focus: 'You are helping users with Department of Justice services including court system, case lookup, legal aid, and criminal code information.'
    },
    'ID_Praya.html': {
      name: 'Interior Department',
      abbrev: 'ID',
      color: '#78716c',
      focus: 'You are helping users with Interior Department services including national IDs, passports, birth certificates, land registry, and building permits.'
    },
    'TD_Praya.html': {
      name: 'Transport Department',
      abbrev: 'TD',
      color: '#0d9488',
      focus: 'You are helping users with Transport Department services including driver licensing, vehicle registration, and road safety.'
    },
    'RD_Praya.html': {
      name: 'Revenue Department',
      abbrev: 'RD',
      color: '#0ea5e9',
      focus: 'You are helping users with Revenue Department services including tax filing, business accounts, and tax benefits.'
    },
    'Praya_Post.html': {
      name: 'Praya Post',
      abbrev: 'PP',
      color: '#f97316',
      focus: 'You are helping users with Praya Post services including package delivery, international mail, and P.O. box rentals.'
    },
    'Health_Praya.html': {
      name: 'Health Department',
      abbrev: 'HD',
      color: '#dc2626',
      focus: 'You are helping users with Health Department services including public health, disease control, healthcare licensing, and vaccination schedules.'
    },
    'Housing_Authority_Praya.html': {
      name: 'Housing Authority',
      abbrev: 'HA',
      color: '#ea580c',
      focus: 'You are helping users with Housing Authority services including public housing applications, eligibility checks, and rental assistance programs.'
    },
    'CBCA_Praya.html': {
      name: 'Customs & Border Control Agency',
      abbrev: 'CBCA',
      color: '#0891b2',
      focus: 'You are helping users with Customs & Border Control services including import/export permits, customs declarations, and immigration.'
    },
    'LC_Praya.html': {
      name: 'Legislative Council',
      abbrev: 'LC',
      color: '#6366f1',
      focus: 'You are helping users with Legislative Council services including bill tracking, voting records, and contacting representatives.'
    },
    'PSE_Praya.html': {
      name: 'Praya Stock Exchange',
      abbrev: 'PSE',
      color: '#0ea5e9',
      focus: 'You are helping users with Praya Stock Exchange services including securities trading, market data, and investment information.'
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

  // Create chat widget
  function createChatWidget() {
    // Get department-specific color or use default
    const primaryColor = currentDepartment ? currentDepartment.color : '#1d4ed8';
    const darkColor = shadeColor(primaryColor, -20);

    // Add styles
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
        box-shadow: 0 4px 12px ${hexToRgba(primaryColor, 0.4)}, 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 9998;
        color: white;
      }

      #praya-chat-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px ${hexToRgba(primaryColor, 0.5)}, 0 4px 8px rgba(0, 0, 0, 0.15);
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
        height: 600px;
        max-height: calc(100vh - 150px);
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
        z-index: 9999;
        overflow: hidden;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }

      #praya-chat-widget.open {
        display: flex;
      }

      .chat-header {
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .chat-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .chat-avatar {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
      }

      .chat-header-text h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .chat-header-text p {
        margin: 4px 0 0 0;
        font-size: 12px;
        opacity: 0.9;
      }

      .chat-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        opacity: 0.8;
      }

      .chat-close:hover {
        opacity: 1;
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #f8fafc;
      }

      .chat-message {
        margin-bottom: 16px;
        display: flex;
        gap: 12px;
      }

      .chat-message.user {
        flex-direction: row-reverse;
      }

      .message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        flex-shrink: 0;
      }

      .chat-message.bot .message-avatar {
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        color: white;
      }

      .chat-message.user .message-avatar {
        background: #64748b;
        color: white;
      }

      .message-bubble {
        max-width: 75%;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
      }

      .chat-message.bot .message-bubble {
        background: white;
        color: #0f172a;
        border-bottom-left-radius: 4px;
      }

      .chat-message.user .message-bubble {
        background: ${primaryColor};
        color: white;
        border-bottom-right-radius: 4px;
      }

      .chat-input-container {
        padding: 16px;
        background: white;
        border-top: 1px solid #e2e8f0;
      }

      .chat-input-wrapper {
        display: flex;
        gap: 8px;
      }

      .chat-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 24px;
        font-size: 14px;
        font-family: inherit;
        outline: none;
      }

      .chat-input:focus {
        border-color: ${primaryColor};
      }

      .chat-send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${primaryColor} 0%, ${darkColor} 100%);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .chat-send:hover {
        transform: scale(1.05);
      }

      .chat-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
      }

      .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #64748b;
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
          opacity: 0.3;
        }
        30% {
          opacity: 1;
        }
      }

      .chat-error {
        color: #ef4444;
        font-size: 13px;
        padding: 8px 12px;
        background: #fee2e2;
        border-radius: 8px;
        margin-top: 8px;
      }

      @media (max-width: 768px) {
        #praya-chat-button {
          width: 56px;
          height: 56px;
          bottom: 16px;
          right: 16px;
        }

        #praya-chat-button svg {
          width: 24px;
          height: 24px;
        }

        #praya-chat-widget {
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          border-radius: 0;
        }

        .chat-header {
          padding: 16px;
        }

        .message-bubble {
          max-width: 85%;
        }

        .chat-input-container {
          padding: 12px;
        }
      }

      @media (max-width: 480px) {
        .chat-header-text h3 {
          font-size: 14px;
        }

        .chat-header-text p {
          font-size: 11px;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          font-size: 14px;
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

    // Create widget
    const widget = document.createElement('div');
    widget.id = 'praya-chat-widget';
    widget.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">${currentDepartment ? currentDepartment.abbrev : 'CS'}</div>
          <div class="chat-header-text">
            <h3>Citizen Services</h3>
            <p>${currentDepartment ? currentDepartment.name : 'GOV.PRAYA'}</p>
          </div>
        </div>
        <button class="chat-close" aria-label="Close chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="chat-message bot">
          <div class="message-avatar">${currentDepartment ? currentDepartment.abbrev : 'CS'}</div>
          <div class="message-bubble">
            ${currentDepartment
              ? `Welcome to ${currentDepartment.name} Citizen Services! I'm here to help you navigate our services. How can I assist you today?`
              : 'Welcome to GOV.PRAYA Citizen Services! How can I help you today?'
            }
          </div>
        </div>
      </div>
      <div class="chat-input-container">
        <div class="chat-input-wrapper">
          <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." />
          <button class="chat-send" id="chat-send" aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
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
      document.getElementById('chat-input').focus();
    } else {
      widget.classList.remove('open');
    }
  }

  function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    const avatar = currentDepartment ? currentDepartment.abbrev : 'CS';
    messageDiv.innerHTML = `
      <div class="message-avatar">${isUser ? 'You' : avatar}</div>
      <div class="message-bubble">${escapeHtml(text)}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = 'typing-indicator';

    const avatar = currentDepartment ? currentDepartment.abbrev : 'CS';
    typingDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-bubble typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
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
      // Build context-aware system prompt
      let systemPrompt = `You are a helpful assistant for the Republic of Praya government portal.`;

      if (currentDepartment) {
        systemPrompt += `\n\n${currentDepartment.focus}\n\nThe user is currently on the ${currentDepartment.name} page, so prioritize information relevant to this department while still being able to help with general government services.`;
      }

      systemPrompt += `\n\nKeep responses concise (under 150 words), professional, and helpful. If you don't have specific information, direct users to contact the department or visit the main portal at https://jeffbai996.github.io/`;

      const response = await callGeminiAPI(message, systemPrompt);

      hideTypingIndicator();
      addMessage(response, false);
      conversationHistory.push({ role: 'assistant', text: response });

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
          parts: [{ text: 'I understand. I will help users with government services for this department, keeping responses concise and professional.' }]
        }
      ];

      // Add conversation history (last 4 exchanges)
      const recentHistory = conversationHistory.slice(-8);
      recentHistory.forEach(msg => {
        contents.push({
          role: msg.role,
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

    // Department-specific responses
    if (currentDepartment) {
      if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
        return `For specific hours and contact information, please check the details on this page. You can also visit the main portal at https://jeffbai996.github.io/ for comprehensive information about all government services.`;
      }

      if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        return `Contact information for ${currentDepartment.name} can be found on this page. For assistance across all departments, visit https://jeffbai996.github.io/`;
      }

      return `I'm here to help with ${currentDepartment.name} services! For detailed assistance with AI-powered chat, please visit the main government portal at https://jeffbai996.github.io/ where our full chatbot is available.`;
    }

    return `For comprehensive help with all government services, please visit the main portal at https://jeffbai996.github.io/ where our AI-powered assistant can provide detailed guidance.`;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  } else {
    createChatWidget();
  }
})();

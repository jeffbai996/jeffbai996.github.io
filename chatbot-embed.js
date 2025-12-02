/**
 * Standalone Chatbot Embed for Static Pages
 * This creates a floating chat button that opens the main portal with chatbot
 */
(function() {
  'use strict';

  // Create chatbot button
  function createChatButton() {
    const button = document.createElement('button');
    button.id = 'praya-chat-button';
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    button.setAttribute('aria-label', 'Open chatbot');
    button.setAttribute('title', 'Need help? Chat with us');

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
        background: linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%);
        border: none;
        box-shadow: 0 4px 12px rgba(29, 78, 216, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 9999;
        color: white;
      }

      #praya-chat-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(29, 78, 216, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      #praya-chat-button:active {
        transform: scale(0.95);
      }

      #praya-chat-button svg {
        width: 28px;
        height: 28px;
      }

      @media (max-width: 768px) {
        #praya-chat-button {
          width: 56px;
          height: 56px;
          bottom: 20px;
          right: 20px;
        }

        #praya-chat-button svg {
          width: 24px;
          height: 24px;
        }
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(button);

    // Add click handler to open main portal with chatbot
    button.addEventListener('click', function() {
      // Navigate to main portal
      window.location.href = 'https://jeffbai996.github.io/';
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatButton);
  } else {
    createChatButton();
  }
})();

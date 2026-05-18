/**
 * Gemini Live API WebSocket Service
 * Handles real-time voice communication with Gemini 3.1 Flash Lite
 */

// DISABLED 2026-05-18: Gemini Live (WebSocket bidi) cannot be proxied through
// the gp-llm Cloudflare Worker (REST + SSE only). Sending the API key via
// browser WebSocket query param is the bug that caused the 2026-04-30 GCP
// suspension. Until a WebSocket-capable proxy ships (DO + WS upgrade, or a
// dedicated voice proxy), this service is hard-disabled. See squad-store #117.
const GEMINI_LIVE_DISABLED = true
const GEMINI_LIVE_MODEL = 'gemini-3.1-flash-lite-preview'
// Kept for backwards compat with any caller that imports it as a sentinel.
const WEBSOCKET_URL = ''

// System instruction for the voice assistant
const SYSTEM_INSTRUCTION = `You are a helpful voice assistant for GOV.PRAYA, the official government portal of the Republic of Praya.

Your role:
- Help citizens navigate government services across 15 departments
- Provide concise, spoken responses (keep answers brief for voice)
- Be friendly, professional, and helpful
- For emergencies, always direct to call 911

Key departments: National Police Agency, Bank of Praya, Cannabis Tax Bureau, Department of Justice, Interior Department, Transport Department, Revenue Department, Praya Post, Health Department, Housing Authority, Customs & Border Control, Legislative Council, Buildings Department, Companies Registry, Social Welfare Department.

Currency: Praya Dollar ($)

Keep responses conversational and under 3 sentences when possible for voice clarity.`

class GeminiLiveService {
  constructor() {
    this.ws = null
    this.isConnected = false
    this.isSetupComplete = false
    this.listeners = new Map()
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 3
    this.audioQueue = []
    this.isModelSpeaking = false
  }

  /**
   * Add event listener
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }

  /**
   * Remove event listener
   */
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  /**
   * Emit event to all listeners
   */
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          // Silently handle listener errors in production
        }
      })
    }
  }

  /**
   * Connect to Gemini Live API
   */
  async connect() {
    return new Promise((resolve, reject) => {
      // Hard-disabled — Gemini Live cannot proxy through the REST/SSE Worker.
      // Until a WebSocket-capable proxy ships, voice is off. Text chat still
      // works via geminiService → gp-llm Worker.
      if (GEMINI_LIVE_DISABLED) {
        const error = new Error('Gemini Live voice is temporarily disabled (no WebSocket proxy yet). Text chat still works via gp-llm Worker.')
        this.emit('error', error)
        reject(error)
        return
      }

      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve()
        return
      }

      try {
        this.ws = new WebSocket(WEBSOCKET_URL)

        // Connection timeout — cleared on open/error so a valid connection
        // isn't rejected after it's already succeeded
        const connectionTimeoutId = setTimeout(() => {
          if (!this.isSetupComplete) {
            reject(new Error('Connection timeout'))
          }
        }, 10000)

        this.ws.onopen = () => {
          this.isConnected = true
          this.reconnectAttempts = 0
          this.sendSetupMessage()
          this.emit('connected')
        }

        this.ws.onmessage = (event) => {
          this.handleMessage(event)
          if (!this.isSetupComplete) {
            this.isSetupComplete = true
            clearTimeout(connectionTimeoutId)
            resolve()
          }
        }

        this.ws.onerror = (error) => {
          clearTimeout(connectionTimeoutId)
          this.emit('error', error)
          reject(error)
        }

        this.ws.onclose = (event) => {
          clearTimeout(connectionTimeoutId)
          this.isConnected = false
          this.isSetupComplete = false
          this.emit('disconnected', { code: event.code, reason: event.reason })

          // Attempt reconnect if not intentional close
          if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++
            setTimeout(() => this.connect(), 2000 * this.reconnectAttempts)
          }
        }

      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Send setup message to configure the session
   */
  sendSetupMessage() {
    const setupMessage = {
      setup: {
        model: `models/${GEMINI_LIVE_MODEL}`,
        generationConfig: {
          responseModalities: 'audio',  // String, not array
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: 'Aoede'  // Available voice for Live API
              }
            }
          }
        },
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        }
      }
    }

    this.sendJSON(setupMessage)
  }

  /**
   * Handle incoming WebSocket messages
   */
  async handleMessage(event) {
    try {
      // Handle both text and Blob messages
      let messageText
      if (event.data instanceof Blob) {
        messageText = await event.data.text()
      } else {
        messageText = event.data
      }

      const data = JSON.parse(messageText)

      // Setup complete acknowledgment
      if (data.setupComplete) {
        this.isSetupComplete = true
        this.emit('setupComplete')
        return
      }

      // Server content (audio/text response)
      if (data.serverContent) {
        const content = data.serverContent

        // Check for interruption
        if (content.interrupted) {
          this.isModelSpeaking = false
          this.emit('interrupted')
          return
        }

        // Handle model turn (audio response)
        if (content.modelTurn && content.modelTurn.parts) {
          this.isModelSpeaking = true
          for (const part of content.modelTurn.parts) {
            if (part.inlineData && part.inlineData.mimeType?.startsWith('audio/')) {
              // Audio data received
              this.emit('audio', {
                data: part.inlineData.data,
                mimeType: part.inlineData.mimeType
              })
            }
            if (part.text) {
              // Text transcription of model's speech
              this.emit('transcript', {
                type: 'model',
                text: part.text
              })
            }
          }
        }

        // Turn complete
        if (content.turnComplete) {
          this.isModelSpeaking = false
          this.emit('turnComplete')
        }
      }

      // Tool calls (if configured)
      if (data.toolCall) {
        this.emit('toolCall', data.toolCall)
      }

    } catch (error) {
      // Emit so callers can surface or log parse failures
      this.emit('error', error)
    }
  }

  /**
   * Send audio data to the API
   * @param {string} base64Audio - Base64 encoded PCM audio (16-bit, 16kHz)
   */
  sendAudio(base64Audio) {
    if (!this.isConnected || !this.isSetupComplete) {
      return
    }

    const message = {
      realtimeInput: {
        mediaChunks: [{
          mimeType: 'audio/pcm;rate=16000',
          data: base64Audio
        }]
      }
    }

    this.sendJSON(message)
  }

  /**
   * Send text message (for hybrid text/voice mode)
   * @param {string} text - Text message to send
   */
  sendText(text) {
    if (!this.isConnected || !this.isSetupComplete) {
      return
    }

    const message = {
      clientContent: {
        turns: [{
          role: 'user',
          parts: [{ text }]
        }],
        turnComplete: true
      }
    }

    this.sendJSON(message)
  }

  /**
   * Send JSON message over WebSocket
   */
  sendJSON(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  /**
   * Disconnect from the API
   */
  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect')
      this.ws = null
    }
    this.isConnected = false
    this.isSetupComplete = false
    this.isModelSpeaking = false
  }

  /**
   * Check if connected and ready
   */
  isReady() {
    return this.isConnected && this.isSetupComplete
  }

  /**
   * Check if model is currently speaking
   */
  isSpeaking() {
    return this.isModelSpeaking
  }
}

// Export singleton instance
const geminiLiveService = new GeminiLiveService()
export default geminiLiveService

/**
 * useGeminiLive React Hook
 * Provides a clean React interface for Gemini Live voice chat
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import geminiLiveService from '../services/geminiLiveService'
import { AudioCapture, AudioPlayback } from '../utils/audioUtils'

// Connection states
export const ConnectionState = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error'
}

// Voice mode states
export const VoiceState = {
  IDLE: 'idle',           // Not listening
  LISTENING: 'listening', // Capturing audio
  PROCESSING: 'processing', // Waiting for response
  SPEAKING: 'speaking'    // Model is speaking
}

/**
 * Hook for managing Gemini Live voice chat
 * @returns {Object} Voice chat state and controls
 */
export function useGeminiLive() {
  // Connection state
  const [connectionState, setConnectionState] = useState(ConnectionState.DISCONNECTED)
  const [error, setError] = useState(null)

  // Voice state
  const [voiceState, setVoiceState] = useState(VoiceState.IDLE)
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false)
  const [volume, setVolume] = useState(0) // Current mic volume (0-1)

  // Transcripts for display
  const [transcripts, setTranscripts] = useState([])

  // Refs for audio handling
  const audioCapture = useRef(null)
  const audioPlayback = useRef(null)
  const isConnecting = useRef(false)

  /**
   * Connect to Gemini Live API
   */
  const connect = useCallback(async () => {
    if (isConnecting.current || connectionState === ConnectionState.CONNECTED) {
      return
    }

    isConnecting.current = true
    setConnectionState(ConnectionState.CONNECTING)
    setError(null)

    try {
      await geminiLiveService.connect()
      setConnectionState(ConnectionState.CONNECTED)
    } catch (err) {
      setConnectionState(ConnectionState.ERROR)
      setError(err.message || 'Failed to connect to voice service')
    } finally {
      isConnecting.current = false
    }
  }, [connectionState])

  /**
   * Disconnect from Gemini Live API
   */
  const disconnect = useCallback(() => {
    geminiLiveService.disconnect()
    setConnectionState(ConnectionState.DISCONNECTED)
    setVoiceState(VoiceState.IDLE)
    setIsVoiceModeActive(false)

    // Stop audio capture
    if (audioCapture.current) {
      audioCapture.current.stop()
    }

    // Stop audio playback
    if (audioPlayback.current) {
      audioPlayback.current.stop()
    }
  }, [])

  /**
   * Start voice mode (continuous listening)
   */
  const startVoiceMode = useCallback(async () => {
    if (!geminiLiveService.isReady()) {
      // Connect first if not connected
      await connect()
    }

    if (!geminiLiveService.isReady()) {
      setError('Voice service not ready')
      return
    }

    try {
      // Initialize audio playback
      if (!audioPlayback.current) {
        audioPlayback.current = new AudioPlayback()
        await audioPlayback.current.init()
      }

      // Start audio capture
      if (!audioCapture.current) {
        audioCapture.current = new AudioCapture()
      }

      await audioCapture.current.start((base64Audio) => {
        // Send audio to Gemini
        geminiLiveService.sendAudio(base64Audio)
      })

      setIsVoiceModeActive(true)
      setVoiceState(VoiceState.LISTENING)
    } catch (err) {
      setError(err.message || 'Failed to access microphone')
      setVoiceState(VoiceState.IDLE)
    }
  }, [connect])

  /**
   * Stop voice mode
   */
  const stopVoiceMode = useCallback(() => {
    if (audioCapture.current) {
      audioCapture.current.stop()
    }

    if (audioPlayback.current) {
      audioPlayback.current.stop()
    }

    setIsVoiceModeActive(false)
    setVoiceState(VoiceState.IDLE)
  }, [])

  /**
   * Toggle voice mode
   */
  const toggleVoiceMode = useCallback(async () => {
    if (isVoiceModeActive) {
      stopVoiceMode()
    } else {
      await startVoiceMode()
    }
  }, [isVoiceModeActive, startVoiceMode, stopVoiceMode])

  /**
   * Send text message (hybrid mode)
   */
  const sendTextMessage = useCallback((text) => {
    if (!geminiLiveService.isReady()) {
      return false
    }

    geminiLiveService.sendText(text)
    return true
  }, [])

  /**
   * Set up event listeners
   */
  useEffect(() => {
    // Handle audio response from Gemini
    const handleAudio = async (audioData) => {
      if (audioPlayback.current) {
        await audioPlayback.current.addToQueue(audioData.data)
      }
      setVoiceState(VoiceState.SPEAKING)
    }

    // Handle transcript
    const handleTranscript = (transcript) => {
      setTranscripts(prev => [...prev, transcript])
    }

    // Handle turn complete
    const handleTurnComplete = () => {
      setVoiceState(isVoiceModeActive ? VoiceState.LISTENING : VoiceState.IDLE)
    }

    // Handle interruption
    const handleInterrupted = () => {
      if (audioPlayback.current) {
        audioPlayback.current.stop()
      }
      setVoiceState(VoiceState.LISTENING)
    }

    // Handle disconnect
    const handleDisconnected = () => {
      setConnectionState(ConnectionState.DISCONNECTED)
      setVoiceState(VoiceState.IDLE)
    }

    // Handle errors
    const handleError = (err) => {
      setError('Connection error occurred')
    }

    // Register listeners
    geminiLiveService.on('audio', handleAudio)
    geminiLiveService.on('transcript', handleTranscript)
    geminiLiveService.on('turnComplete', handleTurnComplete)
    geminiLiveService.on('interrupted', handleInterrupted)
    geminiLiveService.on('disconnected', handleDisconnected)
    geminiLiveService.on('error', handleError)

    // Cleanup
    return () => {
      geminiLiveService.off('audio', handleAudio)
      geminiLiveService.off('transcript', handleTranscript)
      geminiLiveService.off('turnComplete', handleTurnComplete)
      geminiLiveService.off('interrupted', handleInterrupted)
      geminiLiveService.off('disconnected', handleDisconnected)
      geminiLiveService.off('error', handleError)
    }
  }, [isVoiceModeActive])

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (audioCapture.current) {
        audioCapture.current.stop()
      }
      if (audioPlayback.current) {
        audioPlayback.current.dispose()
      }
      geminiLiveService.disconnect()
    }
  }, [])

  /**
   * Clear transcripts
   */
  const clearTranscripts = useCallback(() => {
    setTranscripts([])
  }, [])

  return {
    // Connection
    connectionState,
    isConnected: connectionState === ConnectionState.CONNECTED,
    connect,
    disconnect,

    // Voice mode
    voiceState,
    isVoiceModeActive,
    startVoiceMode,
    stopVoiceMode,
    toggleVoiceMode,

    // Audio state
    volume,
    isListening: voiceState === VoiceState.LISTENING,
    isSpeaking: voiceState === VoiceState.SPEAKING,
    isProcessing: voiceState === VoiceState.PROCESSING,

    // Transcripts
    transcripts,
    clearTranscripts,

    // Text mode
    sendTextMessage,

    // Error handling
    error,
    clearError: () => setError(null)
  }
}

export default useGeminiLive

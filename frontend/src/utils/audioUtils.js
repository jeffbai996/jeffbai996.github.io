/**
 * Audio Utilities for Gemini Live Voice Chat
 * Handles microphone capture and audio playback
 */

// Audio format constants
const INPUT_SAMPLE_RATE = 16000   // Gemini expects 16kHz input
const OUTPUT_SAMPLE_RATE = 24000  // Gemini outputs 24kHz
const CHUNK_DURATION_MS = 100     // Send audio every 100ms

/**
 * Audio Capture class - captures microphone input and converts to PCM
 */
export class AudioCapture {
  constructor() {
    this.audioContext = null
    this.mediaStream = null
    this.workletNode = null
    this.sourceNode = null
    this.isCapturing = false
    this.onAudioData = null
  }

  /**
   * Initialize and start audio capture
   * @param {Function} onAudioData - Callback receiving base64 PCM audio chunks
   */
  async start(onAudioData) {
    if (this.isCapturing) {
      return
    }

    this.onAudioData = onAudioData

    try {
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: INPUT_SAMPLE_RATE,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      // Create audio context with target sample rate
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: INPUT_SAMPLE_RATE
      })

      // If browser doesn't support the sample rate, we'll need to resample
      const actualSampleRate = this.audioContext.sampleRate

      // Create source from microphone
      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream)

      // Create script processor for audio data extraction
      // Using ScriptProcessorNode as AudioWorklet requires HTTPS and more setup
      const bufferSize = 4096
      this.processorNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1)

      // Buffer to accumulate samples for chunking
      let sampleBuffer = []
      const samplesPerChunk = Math.floor(INPUT_SAMPLE_RATE * CHUNK_DURATION_MS / 1000)

      this.processorNode.onaudioprocess = (event) => {
        if (!this.isCapturing) return

        const inputData = event.inputBuffer.getChannelData(0)

        // Resample if necessary
        let samples
        if (actualSampleRate !== INPUT_SAMPLE_RATE) {
          samples = this.resample(inputData, actualSampleRate, INPUT_SAMPLE_RATE)
        } else {
          samples = inputData
        }

        // Add to buffer
        for (let i = 0; i < samples.length; i++) {
          sampleBuffer.push(samples[i])
        }

        // Send chunks when we have enough samples
        while (sampleBuffer.length >= samplesPerChunk) {
          const chunk = sampleBuffer.splice(0, samplesPerChunk)
          const pcmData = this.floatTo16BitPCM(chunk)
          const base64 = this.arrayBufferToBase64(pcmData)

          if (this.onAudioData) {
            this.onAudioData(base64)
          }
        }
      }

      // Connect nodes
      this.sourceNode.connect(this.processorNode)
      this.processorNode.connect(this.audioContext.destination)

      this.isCapturing = true
    } catch (error) {
      throw error
    }
  }

  /**
   * Stop audio capture
   */
  stop() {
    this.isCapturing = false

    if (this.processorNode) {
      this.processorNode.disconnect()
      this.processorNode = null
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect()
      this.sourceNode = null
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop())
      this.mediaStream = null
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
      this.audioContext = null
    }
  }

  /**
   * Resample audio data to target sample rate
   */
  resample(inputSamples, inputRate, outputRate) {
    if (inputRate === outputRate) {
      return inputSamples
    }

    const ratio = inputRate / outputRate
    const outputLength = Math.floor(inputSamples.length / ratio)
    const output = new Float32Array(outputLength)

    for (let i = 0; i < outputLength; i++) {
      const srcIndex = i * ratio
      const srcIndexFloor = Math.floor(srcIndex)
      const srcIndexCeil = Math.min(srcIndexFloor + 1, inputSamples.length - 1)
      const t = srcIndex - srcIndexFloor

      // Linear interpolation
      output[i] = inputSamples[srcIndexFloor] * (1 - t) + inputSamples[srcIndexCeil] * t
    }

    return output
  }

  /**
   * Convert float audio samples to 16-bit PCM
   */
  floatTo16BitPCM(samples) {
    const buffer = new ArrayBuffer(samples.length * 2)
    const view = new DataView(buffer)

    for (let i = 0; i < samples.length; i++) {
      // Clamp to [-1, 1] and convert to 16-bit
      const s = Math.max(-1, Math.min(1, samples[i]))
      const val = s < 0 ? s * 0x8000 : s * 0x7FFF
      view.setInt16(i * 2, val, true) // little-endian
    }

    return buffer
  }

  /**
   * Convert ArrayBuffer to base64 string
   */
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
  }
}


/**
 * Audio Playback class - plays PCM audio from Gemini
 */
export class AudioPlayback {
  constructor() {
    this.audioContext = null
    this.gainNode = null
    this.audioQueue = []
    this.isPlaying = false
    this.currentSource = null
    this.onPlaybackStart = null
    this.onPlaybackEnd = null
  }

  /**
   * Initialize audio playback
   */
  async init() {
    if (this.audioContext) return

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: OUTPUT_SAMPLE_RATE
    })

    // Create gain node for volume control
    this.gainNode = this.audioContext.createGain()
    this.gainNode.connect(this.audioContext.destination)
    this.gainNode.gain.value = 1.0
  }

  /**
   * Add audio chunk to playback queue
   * @param {string} base64Audio - Base64 encoded PCM audio (24kHz, 16-bit)
   */
  async addToQueue(base64Audio) {
    if (!this.audioContext) {
      await this.init()
    }

    // Resume audio context if suspended (required for autoplay policies)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }

    // Decode base64 to ArrayBuffer
    const pcmData = this.base64ToArrayBuffer(base64Audio)

    // Convert to AudioBuffer
    const audioBuffer = this.pcmToAudioBuffer(pcmData)

    // Add to queue
    this.audioQueue.push(audioBuffer)

    // Start playback if not already playing
    if (!this.isPlaying) {
      this.playNext()
    }
  }

  /**
   * Play next item in queue
   */
  playNext() {
    if (this.audioQueue.length === 0) {
      this.isPlaying = false
      if (this.onPlaybackEnd) {
        this.onPlaybackEnd()
      }
      return
    }

    this.isPlaying = true
    if (this.onPlaybackStart && this.audioQueue.length === 1) {
      this.onPlaybackStart()
    }

    const audioBuffer = this.audioQueue.shift()

    // Create buffer source
    this.currentSource = this.audioContext.createBufferSource()
    this.currentSource.buffer = audioBuffer
    this.currentSource.connect(this.gainNode)

    // Play next when this ends
    this.currentSource.onended = () => {
      this.playNext()
    }

    this.currentSource.start()
  }

  /**
   * Stop all playback and clear queue
   */
  stop() {
    if (this.currentSource) {
      try {
        this.currentSource.stop()
      } catch (e) {
        // Ignore if already stopped
      }
      this.currentSource = null
    }

    this.audioQueue = []
    this.isPlaying = false
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  setVolume(volume) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume))
    }
  }

  /**
   * Convert base64 to ArrayBuffer
   */
  base64ToArrayBuffer(base64) {
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  /**
   * Convert PCM data to AudioBuffer
   */
  pcmToAudioBuffer(pcmData) {
    const dataView = new DataView(pcmData)
    const numSamples = pcmData.byteLength / 2 // 16-bit = 2 bytes per sample

    // Create audio buffer
    const audioBuffer = this.audioContext.createBuffer(
      1, // mono
      numSamples,
      OUTPUT_SAMPLE_RATE
    )

    const channelData = audioBuffer.getChannelData(0)

    // Convert 16-bit PCM to float
    for (let i = 0; i < numSamples; i++) {
      const int16 = dataView.getInt16(i * 2, true) // little-endian
      channelData[i] = int16 / 32768 // Convert to -1.0 to 1.0 range
    }

    return audioBuffer
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.stop()
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
      this.audioContext = null
    }
  }
}


/**
 * Voice Activity Detection helper
 * Simple energy-based VAD for visual feedback
 */
export class VoiceActivityDetector {
  constructor() {
    this.audioContext = null
    this.analyser = null
    this.dataArray = null
    this.isActive = false
    this.onVoiceActivity = null
    this.animationFrame = null
  }

  /**
   * Start monitoring audio stream for voice activity
   * @param {MediaStream} stream - Audio stream to monitor
   * @param {Function} callback - Called with volume level (0-1)
   */
  start(stream, callback) {
    this.onVoiceActivity = callback

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 256

    const source = this.audioContext.createMediaStreamSource(stream)
    source.connect(this.analyser)

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.isActive = true

    this.monitor()
  }

  /**
   * Monitor audio levels
   */
  monitor() {
    if (!this.isActive) return

    this.analyser.getByteFrequencyData(this.dataArray)

    // Calculate average volume
    let sum = 0
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i]
    }
    const average = sum / this.dataArray.length
    const normalizedVolume = average / 255

    if (this.onVoiceActivity) {
      this.onVoiceActivity(normalizedVolume)
    }

    this.animationFrame = requestAnimationFrame(() => this.monitor())
  }

  /**
   * Stop monitoring
   */
  stop() {
    this.isActive = false

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
    }
  }
}

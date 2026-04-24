import { useState, useRef, useEffect, useCallback } from 'react'
import geminiService from '../services/geminiService'
import { classifyIntent } from '../utils/intentRecognition'
import { classifyIntentHybrid } from '../utils/semanticClassifier'
import { findResponse } from '../logic/chatRuleBased'
import { callGeminiAPI, shouldUseGemini } from '../logic/chatGemini'
import conversationMemory from '../utils/conversationMemory'
import {
  findRelevantSubPage,
  generateNavigationOffer,
  getDepartmentPriorityBoost
} from '../utils/departmentContext'
import {
  extractAndLinkEntities,
  generateEntityContext
} from '../utils/entityLinker'
import {
  generateProactiveTip,
  detectProactiveIntervention
} from '../utils/proactiveSuggestions'

export function useConversation({ departmentContext, currentDeptData, initialGreeting }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: initialGreeting,
      time: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState(null)
  const [streamingText, setStreamingText] = useState('')
  const [suggestionChips, setSuggestionChips] = useState([])

  const streamingRef = useRef(null)

  // Track conversation context for follow-ups with enhanced memory
  // Using useRef to persist across renders without triggering re-renders
  const conversationContextRef = useRef({
    lastIntent: null,
    awaitingFollowUp: false,
    entities: {},
    conversationHistory: [],
    currentTopics: [],
    userPreferences: {},
    clarificationCount: 0,
    lastResponseTime: null,
    lastStrategy: null,
    offeredRelated: false
  })

  // Track recent messages to detect spam/repetition
  const recentMessagesRef = useRef([])

  // Combined unmount cleanup: clear streaming timeout + cancel in-flight Gemini request
  useEffect(() => {
    return () => {
      if (streamingRef.current) {
        clearTimeout(streamingRef.current)
        streamingRef.current = null
      }
      geminiService.cancel()
    }
  }, [])

  // Stream response with typing effect
  const streamResponse = useCallback((response, botMessageId) => {
    let charIndex = 0
    if (streamingRef.current) {
      clearTimeout(streamingRef.current)
    }

    const streamNextChunk = () => {
      if (charIndex < response.length) {
        const char = response[charIndex]
        const isPunctuation = /[.,!?;:]/.test(char)
        const isEndOfSentence = /[.!?]/.test(char)
        const isNewline = char === '\n'

        let charsToAdd
        if (isPunctuation) {
          charsToAdd = 1
        } else if (isNewline) {
          charsToAdd = 1
        } else {
          charsToAdd = Math.min(Math.floor(Math.random() * 5) + 3, response.length - charIndex)
        }

        const newText = response.slice(0, charIndex + charsToAdd)
        charIndex += charsToAdd

        setStreamingText(newText)
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: newText }
            : msg
        ))

        let delay
        if (isEndOfSentence) {
          delay = 100 + Math.random() * 80
        } else if (isPunctuation) {
          delay = 50 + Math.random() * 40
        } else if (isNewline) {
          delay = 70 + Math.random() * 50
        } else if (Math.random() < 0.12) {
          delay = 40 + Math.random() * 60
        } else {
          delay = 8 + Math.random() * 12
        }

        streamingRef.current = setTimeout(streamNextChunk, delay)
      } else {
        streamingRef.current = null
        setStreamingMessageId(null)
        setStreamingText('')
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: response, isStreaming: false }
            : msg
        ))
        // Show AI suggestion chips if available
        if (conversationContextRef.current.geminiSuggestions?.length > 0) {
          setSuggestionChips(conversationContextRef.current.geminiSuggestions)
          conversationContextRef.current.geminiSuggestions = []
        }
        // Reset clarification count on successful response
        conversationContextRef.current.clarificationCount = 0
      }
    }

    streamNextChunk()
  }, [])

  // Process a message — Enhanced with intelligent routing
  const sendMessage = useCallback(async (messageText) => {
    // Cancel any previous in-flight request
    geminiService.cancel()

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setSuggestionChips([])

    // Track message in conversation memory
    conversationMemory.addMessage({ sender: 'user', text: messageText })

    // Check for linked entities (case numbers, tracking numbers, etc.)
    const linkedEntities = extractAndLinkEntities(messageText)
    if (linkedEntities.length > 0) {
      // Merge entities into context
      linkedEntities.forEach(entity => {
        conversationContextRef.current.entities[entity.type] = entity.value
      })
    }

    // Check for relevant sub-page to offer navigation
    const relevantSubPage = findRelevantSubPage(messageText, departmentContext.id)

    // Use hybrid intent classification (semantic + regex)
    const hybridResult = classifyIntentHybrid(messageText, {
      lastIntent: conversationContextRef.current.lastIntent,
      topics: conversationMemory.getSummary().activeTopics
    })

    // Also get standard intent result for compatibility
    const intentResult = hybridResult.intent ? {
      intent: hybridResult.intent,
      ...hybridResult.details,
      confidence: hybridResult.confidence
    } : classifyIntent(messageText)

    // Get department priority boost
    // eslint-disable-next-line no-unused-vars
    const priorityBoost = getDepartmentPriorityBoost(messageText, departmentContext.id)

    // Check if we should use Gemini AI using intelligent routing
    const routingDecision = shouldUseGemini(messageText, intentResult, messages, conversationContextRef.current)

    // Check for proactive intervention needs
    const intervention = detectProactiveIntervention(messageText, {
      topics: conversationMemory.getSummary().activeTopics,
      messageCount: conversationMemory.getSummary().messageCount,
      offeredRelated: conversationContextRef.current.offeredRelated
    })

    if (routingDecision.useGemini) {
      // Try calling Gemini API with enhanced context
      const geminiResponse = await callGeminiAPI(
        messageText,
        messages,
        currentDeptData,
        routingDecision.enhancedContext,
        conversationContextRef.current
      )

      if (geminiResponse) {
        // Build final response with enhancements
        let finalResponse = geminiResponse

        // Add entity context if we found linked entities
        if (linkedEntities.length > 0) {
          const entityInfo = generateEntityContext(linkedEntities)
          if (entityInfo && !finalResponse.includes(entityInfo)) {
            finalResponse = entityInfo + '\n\n' + finalResponse
          }
        }

        // Append navigation offer if relevant
        if (relevantSubPage) {
          finalResponse += generateNavigationOffer(relevantSubPage)
        }

        // Add proactive tip if relevant
        const memorySummary = conversationMemory.getSummary()
        if (memorySummary.activeTopics.length > 0) {
          const tip = generateProactiveTip(memorySummary.activeTopics[0])
          if (tip && !finalResponse.includes(tip)) {
            finalResponse += `\n\n💡 ${tip}`
          }
        }

        // Track bot response in memory
        conversationMemory.addMessage({ sender: 'bot', text: finalResponse })

        // Use Gemini response
        const botMessageId = Date.now() + 1
        const botMessage = {
          id: botMessageId,
          type: 'bot',
          text: '',
          time: new Date(),
          isStreaming: true
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
        setStreamingMessageId(botMessageId)
        setStreamingText('')

        // Stream the Gemini response
        streamResponse(finalResponse, botMessageId)
        return
      }
      // If Gemini fails, fall back to rule-based system
    }

    // Use rule-based system with semantic enhancement
    setTimeout(() => {
      let response = findResponse(messageText, conversationContextRef.current, recentMessagesRef.current)

      // Add entity context if we found linked entities
      if (linkedEntities.length > 0) {
        const entityInfo = generateEntityContext(linkedEntities)
        if (entityInfo && !response.includes(entityInfo)) {
          response = entityInfo + '\n\n' + response
        }
      }

      // Append navigation offer if relevant
      if (relevantSubPage) {
        response += generateNavigationOffer(relevantSubPage)
      }

      // Add intervention response if needed
      if (intervention && intervention.type === 'assistance') {
        response = intervention.message + '\n\n' + response
      }

      // Track bot response in memory
      conversationMemory.addMessage({ sender: 'bot', text: response })

      const botMessageId = Date.now() + 1
      const botMessage = {
        id: botMessageId,
        type: 'bot',
        text: '',
        time: new Date(),
        isStreaming: true
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setStreamingMessageId(botMessageId)
      setStreamingText('')

      streamResponse(response, botMessageId)
    }, 400 + Math.random() * 200)
  }, [departmentContext.id, currentDeptData, messages, streamResponse])

  // Append a bot greeting without classification or streaming (for dept-change)
  const addGreeting = useCallback((text) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, time: new Date() }])
  }, [])

  // Clear suggestion chips
  const clearSuggestionChips = useCallback(() => {
    setSuggestionChips([])
  }, [])

  return {
    messages,
    isTyping,
    streamingMessageId,
    streamingText,
    suggestionChips,
    sendMessage,
    addGreeting,
    clearSuggestionChips,
  }
}

// frontend/src/logic/chatGemini.js
// Bridge between the chat widget and the Gemini API service.
// - shouldUseGemini: routing decision (rule-based vs AI) with fallback
// - callGeminiAPI: wrapper that adds department context + memory + entity data
//
// Cancellation ('Request cancelled' errors) is swallowed silently so new messages
// can supersede in-flight ones without surfacing as errors.

import geminiService from '../services/geminiService'
import { departmentData } from '../utils/departmentCrawler'
import conversationMemory from '../utils/conversationMemory'
import {
  analyzeQueryComplexity,
  determineResponseStrategy,
  buildEnhancedContext,
  ResponseStrategy
} from '../utils/intelligentRouter'

export const GEMINI_ENABLED = geminiService.isAvailable()

// Detect if a query needs Gemini AI assistance using enhanced intelligence
export function shouldUseGemini(message, intentResult, messages, conversationContext) {
  if (!GEMINI_ENABLED) return { useGemini: false, strategy: ResponseStrategy.RULE_BASED }

  // Use intelligent router for decision making
  const complexity = analyzeQueryComplexity(message, {
    clarificationCount: conversationContext.clarificationCount
  })

  const strategy = determineResponseStrategy(intentResult, complexity, {
    geminiEnabled: GEMINI_ENABLED
  })

  // Store the strategy for later use
  conversationContext.lastStrategy = strategy

  return {
    useGemini: strategy.useGemini,
    strategy: strategy.strategy,
    reason: strategy.reason,
    enhancedContext: strategy.enhancedContext || false,
    complexity
  }
}

// Call Gemini API for complex queries with enhanced context
export async function callGeminiAPI(message, messages, currentDeptData = null, useEnhancedContext = false, conversationContext = {}) {
  try {
    // Prepare conversation history (last 10 messages)
    const history = messages.slice(-10).map(msg => ({
      sender: msg.type,
      text: msg.text,
      timestamp: msg.time
    }))

    // Find relevant departments for context, prioritizing current department
    let relevantDepartments = []

    // If we're on a department page, prioritize that department's data
    if (currentDeptData) {
      relevantDepartments.push(currentDeptData)
    }

    // Add other relevant departments based on query
    const additionalDepts = departmentData.filter(dept => {
      // Skip if already added
      if (currentDeptData && dept.id === currentDeptData.id) return false

      const searchText = message.toLowerCase()
      return dept.keywords?.some(kw => searchText.includes(kw.toLowerCase())) ||
             dept.name.toLowerCase().includes(searchText) ||
             dept.description.toLowerCase().includes(searchText)
    })

    relevantDepartments = [...relevantDepartments, ...additionalDepts]

    // Build enhanced context if requested
    let enhancedContext = {}
    if (useEnhancedContext) {
      const memorySummary = conversationMemory.getSummary()
      enhancedContext = buildEnhancedContext(
        message,
        history,
        conversationContext.entities,
        currentDeptData
      )
      // Add memory summary data
      enhancedContext.sentiment = memorySummary.sentiment
      enhancedContext.userGoals = memorySummary.userGoals
      enhancedContext.activeTopics = memorySummary.activeTopics
    }

    // Call Gemini service with enhanced context
    const result = await geminiService.generateResponse(
      message,
      relevantDepartments,
      history,
      enhancedContext
    )

    if (result.success && result.response) {
      // If there are proactive suggestions from Gemini, store them
      if (result.suggestions && result.suggestions.length > 0) {
        conversationContext.geminiSuggestions = result.suggestions
      }
      return result.response
    }

    return null
  } catch (error) {
    if (error.message === 'Request cancelled') return null  // superseded by newer message
    return null
  }
}

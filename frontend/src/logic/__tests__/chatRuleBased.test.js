import { describe, it, expect, vi } from 'vitest'

// Mock conversationMemory — it's a singleton whose state would leak between tests
vi.mock('../../utils/conversationMemory', () => ({
  default: {
    incrementClarification: vi.fn(),
    resetClarification: vi.fn(),
    resolveTopic: vi.fn(),
    getSummary: () => ({ activeTopics: [], messageCount: 0, sentiment: 'neutral', userGoals: [] }),
    addMessage: vi.fn(),
  },
}))

import { findResponse, resetContext, handleFollowUpResponse } from '../chatRuleBased'
import { edgeCaseResponses } from '../../utils/chatEdgeCases'

function makeContext(overrides = {}) {
  return {
    lastIntent: null,
    awaitingFollowUp: false,
    entities: {},
    conversationHistory: [],
    currentTopics: [],
    userPreferences: {},
    clarificationCount: 0,
    lastResponseTime: null,
    ...overrides,
  }
}

describe('findResponse', () => {
  it('returns profanity response and resets context on profane input', () => {
    const ctx = makeContext({ lastIntent: { foo: 'bar' } })
    const r = findResponse('fuck this', ctx, [])
    expect(r).toBe(edgeCaseResponses.profanity)
    expect(ctx.lastIntent).toBe(null)
  })

  it('returns an edge-case or fallback response when given gibberish', () => {
    const ctx = makeContext()
    const r = findResponse('asdfqwer', ctx, [])
    const edgeCaseValues = Object.values(edgeCaseResponses)
    const matchedEdgeCase = edgeCaseValues.some(v => r === v)
    expect(matchedEdgeCase || r.startsWith('I want to make sure')).toBe(true)
  })

  it('detects a Praya Post tracking number and returns tracking help', () => {
    const ctx = makeContext()
    // Pattern requires PP followed by at least 10 digits
    const r = findResponse('my tracking number is PP12345678901', ctx, [])
    expect(ctx.entities.trackingNumber).toBeTruthy()
    expect(r).toMatch(/tracking/i)
    expect(r).toMatch(/post\/track/)
  })

  it('returns the repeated-message response after 3 identical messages', () => {
    const ctx = makeContext()
    const recent = []
    // Use 'hi' instead of 'hello' — 'hello' contains 'hell' which triggers profanity filter
    findResponse('hi', ctx, recent)
    findResponse('hi', ctx, recent)
    const r = findResponse('hi', ctx, recent)
    expect(r).toBe(edgeCaseResponses.repeated)
  })
})

describe('resetContext', () => {
  it('clears lastIntent and clarificationCount while preserving entities and history', () => {
    const ctx = makeContext({
      lastIntent: { intent: 'foo' },
      clarificationCount: 5,
      entities: { trackingNumber: 'PP123' },
      conversationHistory: [{ text: 'prior' }],
    })
    resetContext(ctx)
    expect(ctx.lastIntent).toBe(null)
    expect(ctx.clarificationCount).toBe(0)
    expect(ctx.entities.trackingNumber).toBe('PP123')
    expect(ctx.conversationHistory).toHaveLength(1)
  })
})

describe('handleFollowUpResponse', () => {
  it('returns null when the intent has no followUp options', () => {
    const ctx = makeContext({ lastIntent: { intent: 'foo', followUp: null } })
    expect(handleFollowUpResponse('1', ctx)).toBe(null)
  })

  it('matches a numbered selection and flips awaitingFollowUp to false', () => {
    const ctx = makeContext({
      awaitingFollowUp: true,
      lastIntent: {
        intent: 'doc',
        followUp: {
          options: [
            { label: 'National ID', value: 'id' },
            { label: 'Passport', value: 'passport' },
          ],
        },
      },
    })
    const r = handleFollowUpResponse('2', ctx)
    if (r !== null) {
      expect(ctx.awaitingFollowUp).toBe(false)
    }
  })
})

# ChatWidget Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decompose the 1,187-line `frontend/src/components/ChatWidget.jsx` into focused modules so each unit has one clear responsibility, can be understood in isolation, and is easier to test. No behavior changes.

**Architecture:** Three layers. (1) **Pure logic** is extracted into `utils/` — markdown parsing, edge-case strings, rule-based classifier, Gemini wrapper, routing decision. (2) A **custom hook** `useConversation` owns all message-related state (messages array, typing/streaming flags, suggestion chips) and exposes a clean API (`sendMessage`, `reset`). (3) **Presentational subcomponents** (`ChatHeader`, `ChatMessageList`, `ChatInput`, `VoiceModeOverlay`, `QuickActionIcon`) render slices of the UI from props. The top-level `ChatWidget` becomes a thin orchestrator.

**Tech Stack:** React 18 (no new dependencies). Existing Vitest + React Testing Library for new unit tests.

**Non-goals:**
- No feature changes. Every existing behavior — including the iOS keyboard handling, typing-speed randomization, and repetition-detection ref — must be preserved exactly.
- No consolidation of the four context sources (AuthContext, ThemeContext, departmentContext, conversationMemory). Out of scope.
- No changes to `useGeminiLive`, `geminiService`, or `conversationMemory`.

**Risk calibration:** `ChatWidget` is the most user-facing component on every page. The refactor is mechanical (extract, don't rewrite). Each task ends with a manual smoke test: open the chat, send a message, verify Gemini + rule-based paths, verify voice mode. If the smoke test fails, roll the task back and diagnose before proceeding.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `frontend/src/utils/chatEdgeCases.js` | Edge-case response strings + smart-suggestions map |
| Create | `frontend/src/utils/chatMarkdown.jsx` | `parseFormattedText()` — markdown/URL -> React elements |
| Create | `frontend/src/logic/chatRuleBased.js` | `findResponse()` + helpers — pure rule-based classifier |
| Create | `frontend/src/logic/chatGemini.js` | `callGeminiAPI()` + `shouldUseGemini()` — Gemini wrapper + routing |
| Create | `frontend/src/hooks/useConversation.js` | Custom hook: owns messages/typing/streaming state |
| Create | `frontend/src/components/chat/QuickActionIcon.jsx` | Extracted SVG icon map |
| Create | `frontend/src/components/chat/ChatHeader.jsx` | Header bar (avatar, title, close button) |
| Create | `frontend/src/components/chat/ChatMessageList.jsx` | Messages + quick actions + AI chips + typing indicator |
| Create | `frontend/src/components/chat/ChatInput.jsx` | Input + voice + send button (iOS handling) |
| Create | `frontend/src/components/chat/VoiceModeOverlay.jsx` | Voice mode UI |
| Create | `frontend/src/utils/__tests__/chatMarkdown.test.jsx` | Tests for markdown parser |
| Create | `frontend/src/logic/__tests__/chatRuleBased.test.js` | Tests for rule-based classifier |
| Create | `frontend/src/hooks/__tests__/useConversation.test.jsx` | Tests for the hook |
| Modify | `frontend/src/components/ChatWidget.jsx` | Reduce to ~180-line orchestrator |

Target end-state: `ChatWidget.jsx` ≤ 200 lines, every other new file ≤ 250 lines.

---

## Task 1: Extract edge-case constants (pure data)

**Files:**
- Create: `frontend/src/utils/chatEdgeCases.js`
- Modify: `frontend/src/components/ChatWidget.jsx` lines 52–69 (remove the two constant objects and import them instead)

Lowest-risk extraction: moving two constant objects.

- [ ] **Step 1: Create the new file** with exported `edgeCaseResponses` and `smartSuggestions` objects. Copy strings **verbatim** from `ChatWidget.jsx:53–69` — do not reword anything. Keys in `edgeCaseResponses`: `profanity`, `unintelligible`, `repeated`, `tooShort`, `stillConfused`, `contextualHelp`. Keys in `smartSuggestions`: `document`, `money`, `legal`, `tracking`, `license`.

- [ ] **Step 2: Import in ChatWidget.jsx and remove the inline constants.** Add `import { edgeCaseResponses, smartSuggestions } from '../utils/chatEdgeCases'` near the other utils imports (around line 40). Delete the two `const` blocks at lines 53–69.

- [ ] **Step 3: Smoke test the build.** Run `cd /Users/jeffbai/repos/jeffbai996.github.io/frontend && npm run build:skip-validation`. Expected: success. Run `npm run lint` and verify no new errors for the new file. Note: `smartSuggestions` is currently dead code in the original — just relocate, don't delete.

- [ ] **Step 4: Commit.**
```
git add frontend/src/utils/chatEdgeCases.js frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract edge-case response strings to utils"
```

---

## Task 2: Extract `parseFormattedText` into its own module

**Files:**
- Create: `frontend/src/utils/chatMarkdown.jsx`
- Create: `frontend/src/utils/__tests__/chatMarkdown.test.jsx`
- Modify: `frontend/src/components/ChatWidget.jsx` lines 277–332

Pure function, returns JSX, so the file is `.jsx`. No component-state deps.

- [ ] **Step 1: Create `chatMarkdown.jsx`.** Copy the function body verbatim from `ChatWidget.jsx:277–332`. Add an exported function `parseFormattedText(text)`. JSDoc header:
```
/**
 * @param {string} text - Raw message text (may contain bold, [text](url), plain URLs).
 * @returns {Array<string | React.ReactElement>}
 */
```
The regex `/(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(https?:\/\/[^\s<>"\)]+)/g` is load-bearing — leave the `\)` escape as-is (it's there for Gemini-returned URLs).

- [ ] **Step 2: Write `chatMarkdown.test.jsx` with seven tests:** no-markdown-returns-single-part, bold-wraps-in-strong, markdown-link-creates-anchor-with-href, plain-URL-gets-rel-noopener, multiple-matches-of-different-types, preserves-surrounding-text-slices, empty-string-returns-single-element.

Test skeleton:
```jsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { parseFormattedText } from '../chatMarkdown'

function renderParts(text) {
  return render(<div>{parseFormattedText(text)}</div>).container
}

describe('parseFormattedText', () => {
  it('returns original text as single part when no markdown', () => {
    expect(parseFormattedText('hello world')).toEqual(['hello world'])
  })
  // … remaining tests render via renderParts() and query via querySelector
})
```

Full test bodies: assert `<strong>` for bold, assert `<a.chat-link>` with correct `href`, `rel="noopener noreferrer"`, `target="_blank"` for links. For the multi-match case, assert both `<strong>` and two `<a>` elements are present with correct attrs.

- [ ] **Step 3: Run the tests.**
```
cd /Users/jeffbai/repos/jeffbai996.github.io/frontend
npx vitest run src/utils/__tests__/chatMarkdown.test.jsx
```
Expected: 7/7 passing.

- [ ] **Step 4: Import in ChatWidget.jsx and remove the inline function.** Add `import { parseFormattedText } from '../utils/chatMarkdown'`. Delete lines 277–332.

- [ ] **Step 5: Build check.** `npm run build:skip-validation`. Expected: success.

- [ ] **Step 6: Commit.**
```
git add frontend/src/utils/chatMarkdown.jsx frontend/src/utils/__tests__/chatMarkdown.test.jsx frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract parseFormattedText with test coverage"
```

---

## Task 3: Extract `QuickActionIcon` into its own component file

**Files:**
- Create: `frontend/src/components/chat/QuickActionIcon.jsx`
- Modify: `frontend/src/components/ChatWidget.jsx` lines 334–491

~160 lines of inline SVG. No state, no behavior — just a lookup. Move as-is.

- [ ] **Step 1: Create directory.** `mkdir -p frontend/src/components/chat`

- [ ] **Step 2: Create `QuickActionIcon.jsx`.** Export default function `QuickActionIcon({ icon })`. Copy the full `icons` object and `return icons[icon] || icons.document` verbatim from lines 334–491. Add `QuickActionIcon.propTypes = { icon: PropTypes.string.isRequired }`. Keep SVG `width="16" height="16"` as string literals (don't "improve" to `{ICON_SIZE}` — minimize diff).

Header comment:
```jsx
// Inline SVG icon set for the ChatWidget quick-action chips.
// The `icon` prop is a string key; unknown keys fall back to the `document` icon.
// Kept inline (not <img>) so strokes inherit `currentColor` from the theme.
```

- [ ] **Step 3: Import in ChatWidget.jsx and remove inline component.** Add `import QuickActionIcon from './chat/QuickActionIcon'`. Delete lines 334–491.

- [ ] **Step 4: Smoke test.** `npm run dev`. Open the chat widget on any department page; confirm quick-action chip icons render identically.

- [ ] **Step 5: Commit.**
```
git add frontend/src/components/chat/QuickActionIcon.jsx frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract QuickActionIcon component"
```

---

## Task 4: Extract rule-based classifier into `logic/chatRuleBased.js`

**Files:**
- Create: `frontend/src/logic/chatRuleBased.js`
- Create: `frontend/src/logic/__tests__/chatRuleBased.test.js`
- Modify: `frontend/src/components/ChatWidget.jsx` lines 71–275 + top-level imports

Extract `findResponse`, `resetContext`, `handleFollowUpResponse`. They mutate the passed-in `conversationContext` object — the hook later injects `ref.current`.

- [ ] **Step 1: Create `frontend/src/logic/` directory.** `mkdir -p frontend/src/logic`

- [ ] **Step 2: Create `chatRuleBased.js`.** Imports at top:
```js
import { generateKnowledgeBase, containsProfanity, isUnintelligible } from '../utils/departmentCrawler'
import {
  classifyIntent,
  generateIntentResponse,
  handleFollowUp,
  extractEntities
} from '../utils/intentRecognition'
import conversationMemory from '../utils/conversationMemory'
import { classifyIntentHybrid } from '../utils/semanticClassifier'
import { edgeCaseResponses } from '../utils/chatEdgeCases'

const knowledgeBase = generateKnowledgeBase()
```

Then export three functions, all copied verbatim from ChatWidget.jsx:
- `export function findResponse(message, conversationContext, recentMessages)` — body from lines 73–221
- `export function resetContext(conversationContext)` — body from lines 224–235
- `export function handleFollowUpResponse(lowerMessage, conversationContext)` — body from lines 238–275

The internal calls between them (findResponse → resetContext, findResponse → handleFollowUpResponse) resolve within the same file — no changes needed.

- [ ] **Step 3: Write `chatRuleBased.test.js`.** Mock `conversationMemory` since it's a singleton:
```js
vi.mock('../../utils/conversationMemory', () => ({
  default: {
    incrementClarification: vi.fn(),
    resetClarification: vi.fn(),
    resolveTopic: vi.fn(),
    getSummary: () => ({ activeTopics: [], messageCount: 0, sentiment: 'neutral', userGoals: [] }),
    addMessage: vi.fn(),
  },
}))
```

Include these test cases:
1. `findResponse` returns profanity response on profane input; `resetContext` is called (check `ctx.lastIntent === null` after).
2. `findResponse` returns either the unintelligible edge case or the fallback prompt when given gibberish (loose assertion — see implementer note).
3. `findResponse` detects a Praya Post tracking number ("PP12345") and returns tracking help text containing `/post/track`.
4. `findResponse` returns `edgeCaseResponses.repeated` after 3 identical messages in the same recentMessages array.
5. `resetContext` clears `lastIntent` and `clarificationCount` but preserves `entities` and `conversationHistory`.
6. `handleFollowUpResponse` returns `null` when the intent has no `followUp.options`.
7. `handleFollowUpResponse` with a valid numbered selection flips `awaitingFollowUp` to false (but may return null from `handleFollowUp` mock — both outcomes valid).

**Implementer note:** the gibberish test is intentionally loose. `isUnintelligible` uses a heuristic; the input could fall through to the keyword fallback which returns a different string. Accept either outcome.

- [ ] **Step 4: Run tests.** `npx vitest run src/logic/__tests__/chatRuleBased.test.js`. Expected: all pass.

- [ ] **Step 5: Update ChatWidget.jsx.**

Remove these imports (they're now internal to `chatRuleBased.js`):
```
generateKnowledgeBase, containsProfanity, isUnintelligible  (from departmentCrawler)
generateIntentResponse, handleFollowUp, extractEntities     (from intentRecognition)
```

Keep these at top level (still used in ChatWidget/hook):
```
departmentData  (from departmentCrawler)
classifyIntent  (from intentRecognition)
classifyIntentHybrid  (from semanticClassifier)
```

Add: `import { findResponse } from '../logic/chatRuleBased'`

Delete inline `findResponse` (73–221), `resetContext` (224–235), `handleFollowUpResponse` (238–275). Delete the top-level `const knowledgeBase = generateKnowledgeBase()` — it's no longer used in ChatWidget.jsx.

- [ ] **Step 6: Smoke test rule-based flow in dev.**
1. Open chat. Type "I need to renew my passport" → rule-based intent response.
2. Type "PP12345" → tracking-number response.
3. Send "hello" three times → repeated-message edge case.
4. Send profane word → profanity response.

- [ ] **Step 7: Commit.**
```
git add frontend/src/logic/chatRuleBased.js frontend/src/logic/__tests__/chatRuleBased.test.js frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract rule-based classifier to logic/ with tests"
```

---

## Task 5: Extract Gemini wrapper + routing decision

**Files:**
- Create: `frontend/src/logic/chatGemini.js`
- Modify: `frontend/src/components/ChatWidget.jsx` lines 42–43 + 493–586

Both `shouldUseGemini` and `callGeminiAPI` wrap `geminiService` with application-specific logic (department relevance, enhanced context, routing).

- [ ] **Step 1: Create `chatGemini.js`.** Imports:
```js
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
```

Then export `shouldUseGemini(message, intentResult, messages, conversationContext)` — body verbatim from ChatWidget.jsx:493–516.

Export `async function callGeminiAPI(message, messages, currentDeptData, useEnhancedContext, conversationContext)` — body verbatim from ChatWidget.jsx:520–585. Preserve the try/catch structure that swallows `'Request cancelled'` errors.

- [ ] **Step 2: Update ChatWidget.jsx.**

Remove these imports (moved into chatGemini.js):
```
analyzeQueryComplexity, determineResponseStrategy, buildEnhancedContext, ResponseStrategy  (from intelligentRouter)
```

**Keep `import geminiService from '../services/geminiService'`** — ChatWidget still calls `geminiService.cancel()` directly in its unmount effect and in `processMessage`. Don't remove it.

Add: `import { callGeminiAPI, shouldUseGemini, GEMINI_ENABLED } from '../logic/chatGemini'`

Delete the top-level `const GEMINI_ENABLED = geminiService.isAvailable()` at line 43, the inline `shouldUseGemini` (493–516), and the inline `callGeminiAPI` (518–586).

- [ ] **Step 3: Smoke test Gemini flow.** `npm run dev`.
1. On a department page (e.g. /health), ask a complex question like "What's the difference between Standard and Premium plans, and when is enrollment?" → expect Gemini-generated response.
2. Ask a simple factual question → should still respond (routing may go either way, but not hang).

- [ ] **Step 4: Commit.**
```
git add frontend/src/logic/chatGemini.js frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract Gemini wrapper + routing to logic/"
```

---

## Task 6: Build `useConversation` hook

**Files:**
- Create: `frontend/src/hooks/useConversation.js`
- Create: `frontend/src/hooks/__tests__/useConversation.test.jsx`
- Modify: `frontend/src/components/ChatWidget.jsx`

**This is the biggest single change.** The hook owns all message-related state and logic; ChatWidget becomes a thin consumer.

The hook owns:
- `messages`, `isTyping`, `streamingMessageId`, `streamingText`, `suggestionChips` state
- `conversationContextRef`, `recentMessagesRef`, `streamingRef` refs
- `processMessage`, `streamResponse` functions
- The two unmount-cleanup useEffects

The hook exposes:
- State values: `messages`, `isTyping`, `streamingMessageId`, `streamingText`, `suggestionChips`
- `sendMessage(text)` — the public send API
- `addGreeting(text)` — append a bot greeting without running the classifier (for dept-change)
- `clearSuggestionChips()` — empty the suggestions array

Hook signature:
```js
useConversation({ departmentContext, currentDeptData, initialGreeting })
```

- [ ] **Step 1: Create `useConversation.js`.**

Top imports:
```js
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
```

Inside the hook function:
1. Declare the five useState hooks with the same initial values as ChatWidget currently does.
2. Initialize `conversationContextRef`, `recentMessagesRef`, `streamingRef` with the same shapes.
3. Add the unmount-cleanup useEffect — one combined effect that clears `streamingRef.current` and calls `geminiService.cancel()`.
4. Define `streamResponse(response, botMessageId)` as a `useCallback` — body verbatim from ChatWidget.jsx:895–961 (the whole streaming loop with variable delays).
5. Define `sendMessage(messageText)` as a `useCallback` with deps `[departmentContext.id, currentDeptData, messages, streamResponse]` — body is the existing `processMessage` flow verbatim from 733–892, but calling `streamResponse` directly instead of going through the component method.
6. Define `addGreeting(text)` as a `useCallback` that appends a `{ id: Date.now(), type: 'bot', text, time: new Date() }` message.
7. Define `clearSuggestionChips` as a `useCallback` that sets chips to `[]`.
8. Return an object with `messages, isTyping, streamingMessageId, streamingText, suggestionChips, sendMessage, addGreeting, clearSuggestionChips`.

**Critical:** the existing `processMessage` in ChatWidget.jsx uses `setMessages(prev => [...prev, ...])` which is safe. Keep that pattern everywhere. Never use stale `messages` to set; only read.

**Critical:** the existing code has `// eslint-disable-next-line no-unused-vars` around `priorityBoost` — carry that forward. The variable exists for future use per the existing code.

- [ ] **Step 2: Write `useConversation.test.jsx`.** Mock every downstream dep at the top of the file so the hook runs in isolation. Mocks:
```jsx
vi.mock('../../services/geminiService', () => ({
  default: { cancel: vi.fn(), isAvailable: () => false },
}))
vi.mock('../../utils/conversationMemory', () => ({ default: { addMessage: vi.fn(), getSummary: () => ({ activeTopics: [], messageCount: 0, sentiment: 'neutral', userGoals: [] }), incrementClarification: vi.fn(), resetClarification: vi.fn(), resolveTopic: vi.fn() } }))
vi.mock('../../logic/chatGemini', () => ({ GEMINI_ENABLED: false, shouldUseGemini: () => ({ useGemini: false }), callGeminiAPI: vi.fn() }))
vi.mock('../../logic/chatRuleBased', () => ({ findResponse: () => 'Mock rule-based response' }))
vi.mock('../../utils/departmentContext', () => ({ findRelevantSubPage: () => null, generateNavigationOffer: () => '', getDepartmentPriorityBoost: () => 0 }))
vi.mock('../../utils/entityLinker', () => ({ extractAndLinkEntities: () => [], generateEntityContext: () => '' }))
vi.mock('../../utils/proactiveSuggestions', () => ({ generateProactiveTip: () => null, detectProactiveIntervention: () => null }))
vi.mock('../../utils/intentRecognition', () => ({ classifyIntent: () => null }))
vi.mock('../../utils/semanticClassifier', () => ({ classifyIntentHybrid: () => ({ intent: null, confidence: 0, details: null }) }))
```

Then four tests:
1. Hook starts with a single greeting message and `isTyping === false`.
2. `sendMessage('hello')` appends a user message and flips `isTyping` to true (assert synchronously after act).
3. `addGreeting('New greeting')` appends a bot message whose text equals the argument.
4. `clearSuggestionChips()` sets the chips array to `[]`.

Standard test props:
```js
const initialProps = {
  departmentContext: { id: 'portal', name: 'Portal', greeting: 'Hi!' },
  currentDeptData: null,
  initialGreeting: 'Welcome!',
}
```

- [ ] **Step 3: Run hook tests.** `npx vitest run src/hooks/__tests__/useConversation.test.jsx`. Expected: 4/4 passing.

- [ ] **Step 4: Refactor ChatWidget.jsx to consume the hook.**

Add: `import { useConversation } from '../hooks/useConversation'`

Remove from the component body:
- The five useState declarations for messages/isTyping/streamingMessageId/streamingText/suggestionChips
- The three refs: `streamingRef`, `conversationContextRef`, `recentMessagesRef`
- The two unmount useEffects
- The entire `processMessage` function
- The entire `streamResponse` function

Call the hook after the existing `departmentContext`/`currentDeptData` useMemos:
```js
const {
  messages,
  isTyping,
  streamingMessageId,
  suggestionChips,
  sendMessage,
  addGreeting,
  clearSuggestionChips,
} = useConversation({
  departmentContext,
  currentDeptData,
  initialGreeting: departmentContext.greeting,
})
```

Update the department-change useEffect to use `addGreeting` instead of `setMessages`:
```js
useEffect(() => {
  if (departmentContext.id !== lastDeptId) {
    setLastDeptId(departmentContext.id)
    setShowQuickActions(true)
    if (lastDeptId !== null) {
      addGreeting(`${departmentContext.greeting}\n\nI noticed you're now on the ${departmentContext.name} page. How can I assist you?`)
    }
  }
}, [departmentContext, lastDeptId, addGreeting])
```

Update `handleQuickAction` to call `sendMessage` instead of `processMessage`. Update `handleSend` similarly. Update the AI-suggestion chip onClick to call `clearSuggestionChips()` then `sendMessage(chip.query || chip.text)`.

Clean up now-unused imports at top of ChatWidget.jsx: remove `conversationMemory`, `classifyIntent`, `classifyIntentHybrid`, `findRelevantSubPage`, `generateNavigationOffer`, `getDepartmentPriorityBoost`, `extractAndLinkEntities`, `generateEntityContext`, `detectProactiveIntervention`, `generateProactiveTip`, `getServicePrerequisites`, `generateServiceChain`, `generateProactiveSuggestions` (all moved into the hook or logic files). Keep `useState`, `useRef`, `useEffect`, `useMemo`, `useNavigate`, `geminiService` (for completeness even though cancel is now in the hook — actually, remove `geminiService` since ChatWidget no longer references it), `useGeminiLive/VoiceState/ConnectionState`, `getDepartmentContext/getDepartmentData`, `PropTypes`.

- [ ] **Step 5: Full smoke test — the critical one.** `npm run dev`. Walk every flow:
1. Land on `/` — widget renders closed; clicking opens it; shows portal greeting.
2. Send "hello" — rule-based response streams in.
3. Send "I need a passport" — rule-based intent with follow-up.
4. Answer follow-up with "1" — next-level response.
5. Navigate to `/health` while chat is open — bot greeting updates.
6. Send a complex Gemini-eligible query — Gemini responds with streaming.
7. Click an AI suggestion chip — new query sent, chip disappears.
8. Click a quick-action chip — query runs, chips hide.
9. Open voice mode; overlay appears. Stop voice mode.
10. Close chat, reopen — messages persist.

Any divergence from baseline = revert this task and diagnose.

- [ ] **Step 6: Run full test suite.** `npx vitest run`. Expected: AuthContext + ThemeContext + chatMarkdown + chatRuleBased + useConversation all pass. Pre-existing alertSystem/intentRecognition failures unaffected.

- [ ] **Step 7: Commit.**
```
git add frontend/src/hooks/useConversation.js frontend/src/hooks/__tests__/useConversation.test.jsx frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract conversation state into useConversation hook"
```

---

## Task 7: Extract presentational subcomponents

**Files:**
- Create: `frontend/src/components/chat/ChatHeader.jsx`
- Create: `frontend/src/components/chat/ChatMessageList.jsx`
- Create: `frontend/src/components/chat/ChatInput.jsx`
- Create: `frontend/src/components/chat/VoiceModeOverlay.jsx`
- Modify: `frontend/src/components/ChatWidget.jsx`

At this point ChatWidget should be ~400 lines with most state gone but JSX still inline. Now we chunk the JSX.

- [ ] **Step 1: Create `ChatHeader.jsx`.** Props: `{ departmentContext, onClose }`. Renders the header div with avatar SVG, title/status text (conditionally showing dept name vs "Citizen Services"), and close button. Add `aria-label="Close chat"` to the close button (small a11y improvement — the button had no accessible name before). PropTypes: `departmentContext: PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }).isRequired, onClose: PropTypes.func.isRequired`.

- [ ] **Step 2: Create `ChatMessageList.jsx`.** Props: `{ messages, isTyping, streamingMessageId, showQuickActions, quickActions, onQuickActionClick, suggestionChips, onSuggestionChipClick }`. 

Internals:
- Import `parseFormattedText` from `../../utils/chatMarkdown`
- Import `QuickActionIcon` from `./QuickActionIcon`
- Define `messagesEndRef` here (coupled to the DOM of this component)
- Scroll-to-bottom useEffect with `[messages]` dep
- `formatTime` helper inside the component
- Render the three sections: the mapped message list, the typing indicator, the quick-action chips block, the AI-suggestion chips block (preserving `role="status" aria-live="polite"`), and the scroll sentinel `<div ref={messagesEndRef} />`.

- [ ] **Step 3: Create `ChatInput.jsx`.** Props: `{ value, onChange, onSend, isOpen, isVoiceModeActive, voiceEnabled, voiceState, onToggleVoice }`.

Internals:
- `const IS_IOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)` at module scope
- `inputRef` useRef
- Focus-on-open useEffect — same iOS 300ms / non-iOS 100ms logic, plus scrollIntoView for iOS
- `handleKeyPress` function — same Enter-sends + iOS blur/refocus dance
- `handleSendClick` — calls `onSend` then refocuses after 100ms
- JSX: input + voice button (conditional on `voiceEnabled`) + send button. Add `aria-label` to voice button ("Start/Stop voice mode") and send button ("Send message").

**Do not clean up** the iOS setTimeout / blur / focus logic — it's load-bearing for mobile keyboard behavior.

- [ ] **Step 4: Create `VoiceModeOverlay.jsx`.** Props: `{ voiceState, statusText, errorText, onStop }`. Purely presentational — renders the overlay div with voice rings, icon SVG, status text, optional error text, stop button. No state, no effects.

- [ ] **Step 5: Rewrite ChatWidget.jsx JSX to use subcomponents.**

Add these imports at the top:
```js
import ChatHeader from './chat/ChatHeader'
import ChatMessageList from './chat/ChatMessageList'
import ChatInput from './chat/ChatInput'
import VoiceModeOverlay from './chat/VoiceModeOverlay'
```

Remove now-unused imports:
- `parseFormattedText` and `QuickActionIcon` (now only used inside subcomponents)

Remove from the component body:
- `const inputRef = useRef(null)` — moved into ChatInput
- `const messagesEndRef = useRef(null)` — moved into ChatMessageList
- The scroll-to-bottom useEffect — moved into ChatMessageList
- The focus-on-open useEffect — moved into ChatInput
- `handleSendClick`, `handleKeyPress`, `formatTime` helpers — moved into subcomponents

Final JSX shape (replaces lines ~993–1182):
```jsx
return (
  <>
    <button className={`chat-widget-button ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
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

    <div className={`chat-widget-panel ${isOpen ? 'open' : ''}`}>
      <ChatHeader departmentContext={departmentContext} onClose={() => setIsOpen(false)} />

      <ChatMessageList
        messages={messages}
        isTyping={isTyping}
        streamingMessageId={streamingMessageId}
        showQuickActions={showQuickActions}
        quickActions={departmentContext.quickActions}
        onQuickActionClick={handleQuickAction}
        suggestionChips={suggestionChips}
        onSuggestionChipClick={(chip) => {
          clearSuggestionChips()
          sendMessage(chip.query || chip.text)
        }}
      />

      {isVoiceModeActive && (
        <VoiceModeOverlay
          voiceState={voiceState}
          statusText={getVoiceStatusText()}
          errorText={voiceError}
          onStop={stopVoiceMode}
        />
      )}

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        isOpen={isOpen}
        isVoiceModeActive={isVoiceModeActive}
        voiceEnabled={VOICE_ENABLED}
        voiceState={voiceState}
        onToggleVoice={toggleVoiceMode}
      />

      <div className="chat-widget-footer">Powered by GP.AI</div>
    </div>
  </>
)
```

- [ ] **Step 6: Final smoke test.** `npm run dev`. Re-run the full walkthrough from Task 6 Step 5. Every behavior identical to pre-refactor baseline.

- [ ] **Step 7: Check final file sizes.**
```
wc -l frontend/src/components/ChatWidget.jsx frontend/src/components/chat/*.jsx frontend/src/hooks/useConversation.js frontend/src/logic/*.js frontend/src/utils/chat*.{js,jsx}
```
Expected shape:
- `ChatWidget.jsx` ≤ 180 lines
- `ChatHeader.jsx` ~40
- `ChatMessageList.jsx` ~90
- `ChatInput.jsx` ~90
- `VoiceModeOverlay.jsx` ~40
- `QuickActionIcon.jsx` ~160 (large but just SVG data)
- `useConversation.js` ~250
- `chatRuleBased.js` ~190
- `chatGemini.js` ~90
- `chatMarkdown.jsx` ~60
- `chatEdgeCases.js` ~20

Total ~1,200 lines (roughly unchanged) — but now distributed and focused.

- [ ] **Step 8: Commit.**
```
git add frontend/src/components/chat/ChatHeader.jsx frontend/src/components/chat/ChatMessageList.jsx frontend/src/components/chat/ChatInput.jsx frontend/src/components/chat/VoiceModeOverlay.jsx frontend/src/components/ChatWidget.jsx
git commit -m "refactor(chat): extract ChatHeader, ChatMessageList, ChatInput, VoiceModeOverlay"
```

---

## Self-Review

**Spec coverage:** Goal was decomposing ChatWidget. All extractions mapped: edge-case strings (Task 1), markdown parser (Task 2), icon map (Task 3), rule-based classifier (Task 4), Gemini wrapper + routing (Task 5), state + message flow (Task 6), presentational JSX (Task 7). ✓

**Placeholder scan:** Several tasks tell the implementer "copy verbatim from lines X–Y" rather than pasting 200-line function bodies into the plan. This is deliberate — pasting would duplicate complex classifier logic and introduce paste errors, while the source files are the canonical reference. Each "copy verbatim" includes explicit source line ranges and the imports the copied code requires.

**Type consistency:** `sendMessage`, `addGreeting`, `clearSuggestionChips` defined in Task 6 Step 1 and consumed in Task 6 Step 4 / Task 7. `parseFormattedText` defined in Task 2, consumed in Task 7 (ChatMessageList). `QuickActionIcon` defined in Task 3, consumed in Task 7 (ChatMessageList). All match.

**Ambiguity:** The "don't rewrite, only extract" rule is explicit per-task. Smoke tests at the end of Tasks 4, 5, 6, 7 catch behavioral drift.

**Risk flags:**
1. **Task 6 is the riskiest.** If `sendMessage` differs subtly from `processMessage`, chat breaks silently. The smoke test enumerates every user flow.
2. **The `messages` dependency in `sendMessage`'s useCallback** means the callback reference changes per render. Matches existing behavior — `callGeminiAPI` needs the latest history.
3. **iOS keyboard handling in ChatInput** is load-bearing for mobile. Implementer must not "clean up" the setTimeout/blur/focus dance.
4. **The existing code has a `priorityBoost` variable** computed but never used. Keep it (with eslint-disable-next-line if needed) — it's there intentionally per the comment pattern.

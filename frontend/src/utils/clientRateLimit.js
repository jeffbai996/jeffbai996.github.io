/**
 * Defense-in-depth client-side rate limit for the public chatbot.
 *
 * The Cloudflare Worker (gp-llm) is the authoritative rate-limit + budget
 * boundary — per CLAUDE.md it enforces per-IP rate limits and a daily
 * budget cap. This client-side throttle is a backup: if the Worker's
 * limit is ever misconfigured, mis-deployed, or temporarily disabled,
 * this stops a single tab from accidentally hammering the chatbot via a
 * stuck input handler, runaway useEffect, or test script.
 *
 * Token-bucket: refills tokens at a steady rate up to a small cap. A
 * human-paced chat needs ~1 token every few seconds; a script trying
 * to spam runs out almost immediately.
 *
 * Intentionally generous — not a security feature, just a guardrail.
 */

const MAX_TOKENS = 5;          // Burst capacity. Lets a chatty user fire a
                               // few quick messages without feeling throttled.
const REFILL_PER_MS = 5 / (60 * 1000);  // 5 tokens / minute steady-state.

let tokens = MAX_TOKENS;
let lastRefillAt = Date.now();

function refill() {
  const now = Date.now();
  const elapsed = now - lastRefillAt;
  if (elapsed <= 0) return;
  tokens = Math.min(MAX_TOKENS, tokens + elapsed * REFILL_PER_MS);
  lastRefillAt = now;
}

/**
 * Returns true if a request is allowed right now (and consumes one token).
 * Returns false if the bucket is empty.
 */
export function tryAcquireChatToken() {
  refill();
  if (tokens >= 1) {
    tokens -= 1;
    return true;
  }
  return false;
}

/**
 * For tests: reset the bucket to full.
 */
export function _resetChatRateLimit() {
  tokens = MAX_TOKENS;
  lastRefillAt = Date.now();
}

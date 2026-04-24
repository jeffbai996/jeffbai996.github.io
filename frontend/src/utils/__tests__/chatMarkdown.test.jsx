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

  it('wraps bold text in <strong>', () => {
    const container = renderParts('Visit **this page** now')
    const strong = container.querySelector('strong')
    expect(strong).not.toBeNull()
    expect(strong.textContent).toBe('this page')
  })

  it('creates <a class="chat-link"> with correct href, target, and rel for markdown links', () => {
    const container = renderParts('See [Praya Gov](https://govpraya.org) for details')
    const anchor = container.querySelector('a.chat-link')
    expect(anchor).not.toBeNull()
    expect(anchor.getAttribute('href')).toBe('https://govpraya.org')
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer')
    expect(anchor.textContent).toBe('Praya Gov')
  })

  it('creates <a> with rel="noopener noreferrer" and target="_blank" for plain URLs', () => {
    const container = renderParts('Visit https://govpraya.org for info')
    const anchor = container.querySelector('a.chat-link')
    expect(anchor).not.toBeNull()
    expect(anchor.getAttribute('href')).toBe('https://govpraya.org')
    expect(anchor.getAttribute('target')).toBe('_blank')
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('handles multiple matches of different types in one string', () => {
    const container = renderParts('**Bold** and [link](https://example.com) and https://plain.org here')
    const strong = container.querySelector('strong')
    const anchors = container.querySelectorAll('a.chat-link')
    expect(strong).not.toBeNull()
    expect(strong.textContent).toBe('Bold')
    expect(anchors).toHaveLength(2)
    expect(anchors[0].getAttribute('href')).toBe('https://example.com')
    expect(anchors[0].textContent).toBe('link')
    expect(anchors[1].getAttribute('href')).toBe('https://plain.org')
  })

  it('preserves surrounding text slices (leading and trailing text)', () => {
    const parts = parseFormattedText('before **word** after')
    // First element is leading text, last is trailing text
    expect(parts[0]).toBe('before ')
    expect(parts[parts.length - 1]).toBe(' after')
  })

  it('returns [""] for empty string', () => {
    expect(parseFormattedText('')).toEqual([''])
  })
})

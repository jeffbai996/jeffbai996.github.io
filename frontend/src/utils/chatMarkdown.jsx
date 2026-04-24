// frontend/src/utils/chatMarkdown.jsx
// Convert inline markdown (bold, markdown-links, plain URLs) into React elements.
// Used by chat messages to render bot responses with safe, styled inline formatting.
// External links always open in a new tab with rel="noopener noreferrer".

/**
 * @param {string} text - Raw message text, possibly containing **bold**, [text](url), or plain URLs.
 * @returns {Array<string | React.ReactElement>} - Parts ready to render inline.
 */
export function parseFormattedText(text) {
  const parts = []
  // Combined regex for bold (**text**), markdown links [text](url), and plain URLs
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(https?:\/\/[^\s<>")]+)/g
  let lastIndex = 0
  let match
  let keyIndex = 0

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      // Bold text: **text**
      parts.push(<strong key={`bold-${keyIndex++}`}>{match[2]}</strong>)
    } else if (match[3]) {
      // Markdown link: [text](url)
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {match[4]}
        </a>
      )
    } else if (match[6]) {
      // Plain URL
      parts.push(
        <a
          key={`url-${keyIndex++}`}
          href={match[6]}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {match[6]}
        </a>
      )
    }

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

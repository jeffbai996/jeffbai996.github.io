import PropTypes from 'prop-types'

// Reverse-rainbow VIBGYOR Minecraft concrete colors, left to right
const COLORS = ['#8932B8', '#3C44AA', '#3AB3DA', '#5E7C16', '#FED83D', '#F9801D', '#B02E26']

export default function SpectrumLogo({ size = 'md', wordmark = true }) {
  const sizeClass = `sp-logo-${size}`
  return (
    <span className={`sp-logo ${sizeClass}`} aria-label="Spectrum Cannabis">
      <svg
        className="sp-logo-bar"
        viewBox="0 0 140 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* 14 blocks: 7 wide × 2 tall — each block 20×20 in viewBox units */}
        {COLORS.map((c, i) => (
          <g key={c}>
            <rect x={i * 20} y="0" width="20" height="20" fill={c} />
            <rect x={i * 20} y="20" width="20" height="20" fill={c} />
          </g>
        ))}
      </svg>
      {wordmark && <span className="sp-logo-wordmark">spectrum cannabis</span>}
    </span>
  )
}

SpectrumLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  wordmark: PropTypes.bool
}

import React, { useState } from 'react'
import './InteractiveMap.css'

export default function InteractiveMap({ locations = [], defaultCenter = { lat: 14.5995, lng: 120.9842 }, height = '400px' }) {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [hoveredLocation, setHoveredLocation] = useState(null)

  // Calculate bounds to fit all locations
  const calculateCenter = () => {
    if (locations.length === 0) return defaultCenter

    const sumLat = locations.reduce((sum, loc) => sum + loc.lat, 0)
    const sumLng = locations.reduce((sum, loc) => sum + loc.lng, 0)

    return {
      lat: sumLat / locations.length,
      lng: sumLng / locations.length
    }
  }

  const center = locations.length > 0 ? calculateCenter() : defaultCenter

  return (
    <div className="interactive-map-container" style={{ height }}>
      <div className="map-display">
        <div className="map-placeholder">
          {/* SVG Map Representation */}
          <svg viewBox="0 0 800 600" className="map-svg">
            {/* Background */}
            <rect width="800" height="600" fill="#f0f4f8" />

            {/* Grid lines */}
            {[...Array(10)].map((_, i) => (
              <g key={`grid-${i}`}>
                <line
                  x1={i * 80}
                  y1="0"
                  x2={i * 80}
                  y2="600"
                  stroke="#e0e7ee"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1={i * 60}
                  x2="800"
                  y2={i * 60}
                  stroke="#e0e7ee"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Location markers */}
            {locations.map((location, index) => {
              // Convert lat/lng to SVG coordinates (simplified)
              const x = ((location.lng - center.lng) * 1000 + 400) % 800
              const y = ((center.lat - location.lat) * 1000 + 300) % 600

              const isSelected = selectedLocation === index
              const isHovered = hoveredLocation === index
              const markerSize = isSelected || isHovered ? 16 : 12

              return (
                <g
                  key={`location-${index}`}
                  onMouseEnter={() => setHoveredLocation(index)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={() => setSelectedLocation(selectedLocation === index ? null : index)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Marker shadow */}
                  <circle
                    cx={x}
                    cy={y + 2}
                    r={markerSize}
                    fill="rgba(0,0,0,0.15)"
                  />

                  {/* Marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={markerSize}
                    fill={isSelected ? '#2563eb' : isHovered ? '#3b82f6' : '#ef4444'}
                    stroke="white"
                    strokeWidth="2"
                  />

                  {/* Marker label */}
                  {(isSelected || isHovered) && (
                    <g>
                      <rect
                        x={x + 20}
                        y={y - 15}
                        width="120"
                        height="30"
                        fill="white"
                        stroke="#e0e7ee"
                        strokeWidth="1"
                        rx="4"
                      />
                      <text
                        x={x + 80}
                        y={y + 5}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#1e293b"
                        fontWeight="600"
                      >
                        {location.name}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Map legend */}
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: '#ef4444' }}></div>
            <span>Office Location</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: '#2563eb' }}></div>
            <span>Selected</span>
          </div>
        </div>
      </div>

      {/* Location details panel */}
      <div className="map-locations-panel">
        <h4 className="panel-title">Locations</h4>
        <div className="locations-list">
          {locations.map((location, index) => (
            <div
              key={`loc-${index}`}
              className={`location-item ${selectedLocation === index ? 'selected' : ''} ${hoveredLocation === index ? 'hovered' : ''}`}
              onClick={() => setSelectedLocation(selectedLocation === index ? null : index)}
              onMouseEnter={() => setHoveredLocation(index)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <div className="location-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="location-info">
                <div className="location-name">{location.name}</div>
                <div className="location-address">{location.address}</div>
                {selectedLocation === index && location.phone && (
                  <div className="location-details">
                    <div className="detail-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                      <span>{location.phone}</span>
                    </div>
                    {location.hours && (
                      <div className="detail-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{location.hours}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {locations.length === 0 && (
            <div className="no-locations">
              <p>No locations to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { MRT_LINES, ISR_LINES } from '../../data/transitData';
import './Transit.css';

export default function TransitMap() {
  const [hoveredStation, setHoveredStation] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);

  // SVG map dimensions
  const width = 800;
  const height = 600;

  // Station positions (simplified schematic layout)
  const stationPositions = {
    // Line 1 (Praya Line) - vertical spine
    'PIA': { x: 400, y: 50 },
    'APC': { x: 400, y: 90 },
    'NGT': { x: 400, y: 130 },
    'RVN': { x: 400, y: 170 },
    'UNI': { x: 400, y: 210 },
    'SCP': { x: 400, y: 250 },
    'EXC': { x: 400, y: 290 },
    'MDT': { x: 400, y: 330 },
    'CTL': { x: 400, y: 380 },
    'CVC': { x: 400, y: 420 },
    'WFT': { x: 400, y: 460 },
    'HBV': { x: 400, y: 500 },
    'MRB': { x: 400, y: 540 },
    'SPT': { x: 350, y: 500 },
    'IDP': { x: 300, y: 530 },
    'PYS': { x: 250, y: 560 },

    // Line 2 (Center Line) - horizontal
    'WLD': { x: 100, y: 380 },
    'LKS': { x: 150, y: 380 },
    'PKW': { x: 200, y: 380 },
    'WMK': { x: 250, y: 380 },
    'STD': { x: 300, y: 380 },
    'FIN': { x: 350, y: 380 },
    'OLD': { x: 450, y: 380 },
    'ESQ': { x: 500, y: 380 },
    'TKP': { x: 550, y: 380 },
    'EGT': { x: 600, y: 380 },
    'VLV': { x: 650, y: 420 },
    'ETM': { x: 700, y: 460 },

    // Line 3 (Braemar Line) - diagonal
    'BRH': { x: 200, y: 100 },
    'FRP': { x: 250, y: 140 },
    'HLC': { x: 300, y: 180 },
    'NWD': { x: 350, y: 210 },
    'MED': { x: 420, y: 300 },
    'ART': { x: 450, y: 340 },
    'CMP': { x: 480, y: 420 },
    'GDN': { x: 550, y: 450 },
    'GRF': { x: 600, y: 480 },

    // Line 4 (Oakville Line) - circular
    'CVC2': { x: 450, y: 460 },
    'SPH': { x: 500, y: 500 },
    'BCH': { x: 550, y: 520 },
    'OKV': { x: 600, y: 500 },
    'SND': { x: 650, y: 460 },
    'CLW': { x: 680, y: 400 },
    'WBK': { x: 150, y: 330 },
    'HLP': { x: 120, y: 280 },
    'VLJ': { x: 150, y: 230 },
    'NTN': { x: 200, y: 300 },
    'RVD': { x: 250, y: 340 }
  };

  const getStationPos = (code) => {
    return stationPositions[code] || { x: 400, y: 300 };
  };

  const renderLine = (line, lineId) => {
    if (!line.stations) return null;

    const points = line.stations.map(s => {
      const pos = getStationPos(s.code);
      return `${pos.x},${pos.y}`;
    }).join(' ');

    const isHighlighted = selectedLine === null || selectedLine === lineId;

    return (
      <g key={lineId} className={`transit-line ${isHighlighted ? '' : 'dimmed'}`}>
        <polyline
          points={points}
          fill="none"
          stroke={line.color}
          strokeWidth={selectedLine === lineId ? 8 : 6}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isHighlighted ? 1 : 0.3}
        />
        {line.stations.map((station, index) => {
          const pos = getStationPos(station.code);
          const isInterchange = station.interchange && station.interchange.length > 0;
          const isTerminus = index === 0 || index === line.stations.length - 1;

          return (
            <g
              key={station.id}
              className="station-marker"
              onMouseEnter={() => setHoveredStation(station)}
              onMouseLeave={() => setHoveredStation(null)}
            >
              {isInterchange ? (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isTerminus ? 10 : 8}
                  fill="#ffffff"
                  stroke={line.color}
                  strokeWidth={3}
                />
              ) : (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isTerminus ? 8 : 5}
                  fill={isTerminus ? '#ffffff' : line.color}
                  stroke={isTerminus ? line.color : 'none'}
                  strokeWidth={isTerminus ? 3 : 0}
                />
              )}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div className="transit-map">
      <div className="map-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
          System Map
        </h3>
        <p>Interactive map of the Praya transit network</p>
      </div>

      <div className="map-legend">
        <div className="legend-title">Lines</div>
        <div className="legend-items">
          {Object.entries(MRT_LINES).map(([id, line]) => (
            <button
              key={id}
              className={`legend-item ${selectedLine === id ? 'active' : ''}`}
              onClick={() => setSelectedLine(selectedLine === id ? null : id)}
              style={{ '--line-color': line.color }}
            >
              <span className="legend-color" style={{ background: line.color }} />
              <span className="legend-label">{id} - {line.name}</span>
            </button>
          ))}
          {Object.entries(ISR_LINES).map(([id, line]) => (
            <button
              key={id}
              className={`legend-item ${selectedLine === id ? 'active' : ''}`}
              onClick={() => setSelectedLine(selectedLine === id ? null : id)}
              style={{ '--line-color': line.color }}
            >
              <span className="legend-color" style={{ background: line.color }} />
              <span className="legend-label">{id} - {line.name}</span>
            </button>
          ))}
        </div>
        <div className="legend-symbols">
          <div className="symbol-item">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="6" fill="#fff" stroke="#333" strokeWidth="2"/>
            </svg>
            <span>Interchange</span>
          </div>
          <div className="symbol-item">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="6" fill="#fff" stroke="#333" strokeWidth="3"/>
            </svg>
            <span>Terminus</span>
          </div>
        </div>
      </div>

      <div className="map-container">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="map-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Render lines */}
          {Object.entries(MRT_LINES).map(([id, line]) => renderLine(line, id))}

          {/* Station labels for key stations */}
          {hoveredStation && (
            <g className="station-tooltip">
              <rect
                x={getStationPos(hoveredStation.code).x - 60}
                y={getStationPos(hoveredStation.code).y - 35}
                width="120"
                height="28"
                rx="4"
                fill="var(--bg-elevated)"
                stroke="var(--border-subtle)"
              />
              <text
                x={getStationPos(hoveredStation.code).x}
                y={getStationPos(hoveredStation.code).y - 17}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="11"
                fontWeight="600"
              >
                {hoveredStation.name}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="map-info">
        <div className="info-section">
          <h4>Map Legend</h4>
          <ul>
            <li><strong>Circle stations:</strong> Regular stops</li>
            <li><strong>White circles:</strong> Interchanges between lines</li>
            <li><strong>Large circles:</strong> Terminal stations</li>
          </ul>
        </div>
        <div className="info-section">
          <h4>Quick Facts</h4>
          <ul>
            <li><strong>MRT Lines:</strong> 4 lines, {Object.values(MRT_LINES).reduce((acc, l) => acc + l.stations.length, 0)} stations</li>
            <li><strong>Total Length:</strong> {Object.values(MRT_LINES).reduce((acc, l) => acc + l.totalLength, 0).toFixed(1)} km</li>
            <li><strong>Operating Hours:</strong> 05:30 - 00:30</li>
          </ul>
        </div>
      </div>

      <div className="download-section">
        <h4>Download Maps</h4>
        <div className="download-links">
          <a href="#" className="download-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            System Map (PDF)
          </a>
          <a href="#" className="download-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Pocket Map (PDF)
          </a>
          <a href="#" className="download-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Accessibility Map (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

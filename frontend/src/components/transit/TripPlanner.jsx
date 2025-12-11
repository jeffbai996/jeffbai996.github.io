import React, { useState, useMemo } from 'react';
import {
  getAllStations,
  findRoute,
  MRT_LINES,
  ISR_LINES,
  FARE_MATRIX,
  FARE_TYPES
} from '../../data/transitData';
import './Transit.css';

export default function TripPlanner() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fareType, setFareType] = useState('adult');
  const [departureTime, setDepartureTime] = useState('now');
  const [route, setRoute] = useState(null);
  const [error, setError] = useState('');

  const stations = useMemo(() => getAllStations(), []);

  const handleSearch = () => {
    setError('');
    setRoute(null);

    if (!from || !to) {
      setError('Please select both origin and destination stations');
      return;
    }

    if (from === to) {
      setError('Origin and destination cannot be the same');
      return;
    }

    const foundRoute = findRoute(from, to);
    if (foundRoute) {
      // Calculate fare
      const fromStation = stations.find(s => s.code === from);
      const toStation = stations.find(s => s.code === to);
      const baseFare = FARE_MATRIX.calculateFare(fromStation?.zone || 1, toStation?.zone || 1);
      const finalFare = baseFare * FARE_TYPES[fareType].multiplier;

      setRoute({
        ...foundRoute,
        fare: finalFare.toFixed(2),
        baseFare: baseFare.toFixed(2)
      });
    } else {
      setError('No route found. Please try different stations.');
    }
  };

  const swapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setRoute(null);
  };

  const getLineInfo = (lineId) => {
    return MRT_LINES[lineId] || ISR_LINES[lineId] || { name: lineId, color: '#6b7280' };
  };

  return (
    <div className="trip-planner">
      <div className="planner-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          Trip Planner
        </h3>
        <p>Plan your journey across the Praya transit network</p>
      </div>

      <div className="planner-form">
        <div className="station-inputs">
          <div className="input-group">
            <label>From</label>
            <div className="station-select-wrapper">
              <span className="station-icon origin">A</span>
              <select
                value={from}
                onChange={(e) => { setFrom(e.target.value); setRoute(null); }}
                className="station-select"
              >
                <option value="">Select origin station</option>
                {stations.map(station => (
                  <option key={station.code} value={station.code}>
                    {station.name} ({station.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="swap-btn" onClick={swapStations} title="Swap stations">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/>
            </svg>
          </button>

          <div className="input-group">
            <label>To</label>
            <div className="station-select-wrapper">
              <span className="station-icon destination">B</span>
              <select
                value={to}
                onChange={(e) => { setTo(e.target.value); setRoute(null); }}
                className="station-select"
              >
                <option value="">Select destination station</option>
                {stations.map(station => (
                  <option key={station.code} value={station.code}>
                    {station.name} ({station.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="options-row">
          <div className="input-group small">
            <label>Fare Type</label>
            <select value={fareType} onChange={(e) => setFareType(e.target.value)}>
              {Object.entries(FARE_TYPES).map(([key, type]) => (
                <option key={key} value={key}>{type.name}</option>
              ))}
            </select>
          </div>

          <div className="input-group small">
            <label>Depart</label>
            <select value={departureTime} onChange={(e) => setDepartureTime(e.target.value)}>
              <option value="now">Now</option>
              <option value="15">In 15 minutes</option>
              <option value="30">In 30 minutes</option>
              <option value="60">In 1 hour</option>
            </select>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            Find Route
          </button>
        </div>
      </div>

      {error && (
        <div className="planner-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          {error}
        </div>
      )}

      {route && (
        <div className="route-result">
          <div className="route-summary">
            <div className="summary-item">
              <span className="summary-label">Duration</span>
              <span className="summary-value">{route.estimatedTime} min</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Changes</span>
              <span className="summary-value">{route.changes}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Fare</span>
              <span className="summary-value fare">
                <span className="currency">¤</span>{route.fare}
                {fareType !== 'adult' && (
                  <span className="original-fare">(¤{route.baseFare})</span>
                )}
              </span>
            </div>
          </div>

          <div className="route-details">
            {route.type === 'direct' ? (
              <div className="route-segment">
                <div className="segment-line" style={{ '--line-color': getLineInfo(route.line).color }}>
                  <span className="line-badge" style={{ background: getLineInfo(route.line).color }}>
                    {route.line}
                  </span>
                  <span className="line-name">{getLineInfo(route.line).name}</span>
                </div>
                <div className="segment-stations">
                  <div className="segment-station origin">
                    <span className="station-dot" style={{ borderColor: getLineInfo(route.line).color }}></span>
                    <span className="station-name">{route.from.name}</span>
                    <span className="station-code">{route.from.code}</span>
                  </div>
                  <div className="segment-travel">
                    <span className="travel-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                      </svg>
                    </span>
                    <span className="travel-time">~{route.estimatedTime} min</span>
                  </div>
                  <div className="segment-station destination">
                    <span className="station-dot filled" style={{ background: getLineInfo(route.line).color }}></span>
                    <span className="station-name">{route.to.name}</span>
                    <span className="station-code">{route.to.code}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {route.segments.map((segment, index) => (
                  <div key={index} className="route-segment">
                    <div className="segment-line" style={{ '--line-color': getLineInfo(segment.line).color }}>
                      <span className="line-badge" style={{ background: getLineInfo(segment.line).color }}>
                        {segment.line}
                      </span>
                      <span className="line-name">{getLineInfo(segment.line).name}</span>
                    </div>
                    <div className="segment-stations">
                      <div className="segment-station origin">
                        <span className="station-dot" style={{ borderColor: getLineInfo(segment.line).color }}></span>
                        <span className="station-name">{segment.from.name}</span>
                        <span className="station-code">{segment.from.code}</span>
                      </div>
                      <div className="segment-travel">
                        <span className="travel-arrow">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M19 12l-7 7-7-7"/>
                          </svg>
                        </span>
                      </div>
                      <div className="segment-station destination">
                        <span className="station-dot filled" style={{ background: getLineInfo(segment.line).color }}></span>
                        <span className="station-name">{segment.to.name}</span>
                        <span className="station-code">{segment.to.code}</span>
                      </div>
                    </div>
                    {index < route.segments.length - 1 && (
                      <div className="interchange-indicator">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 1l4 4-4 4"/>
                          <path d="M3 11V9a4 4 0 014-4h14"/>
                          <path d="M7 23l-4-4 4-4"/>
                          <path d="M21 13v2a4 4 0 01-4 4H3"/>
                        </svg>
                        <span>Change at {route.changeAt.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="route-tips">
            <h4>Journey Tips</h4>
            <ul>
              <li>Board from designated platform areas for faster boarding</li>
              <li>Tap your fare card on entry and exit</li>
              {route.changes > 0 && (
                <li>Follow interchange signs at {route.changeAt?.name}</li>
              )}
              <li>Check service status before travelling</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

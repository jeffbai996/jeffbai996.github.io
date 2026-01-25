import React, { useState, useMemo } from 'react';
import {
  MRT_LINES,
  ISR_LINES,
  HSR_LINES,
  BUS_ROUTES,
  BUS_FRANCHISEES,
  generateTimetable
} from '../../data/transitData';
import './Transit.css';

export default function Timetable() {
  const [selectedType, setSelectedType] = useState('mrt');
  const [selectedLine, setSelectedLine] = useState('L1');
  const [selectedDirection, setSelectedDirection] = useState('outbound');
  const [selectedDay, setSelectedDay] = useState('weekday');
  const [selectedStation, setSelectedStation] = useState(null);

  const lines = useMemo(() => {
    switch (selectedType) {
      case 'mrt':
        return MRT_LINES;
      case 'isr':
        return ISR_LINES;
      case 'hsr':
        return HSR_LINES;
      case 'bus':
        return BUS_ROUTES;
      default:
        return MRT_LINES;
    }
  }, [selectedType]);

  const currentLine = lines[selectedLine];

  const stations = useMemo(() => {
    if (!currentLine) return [];
    if (currentLine.stations) {
      return selectedDirection === 'inbound'
        ? [...currentLine.stations].reverse()
        : currentLine.stations;
    }
    if (currentLine.routes) {
      const route = currentLine.routes[0];
      return selectedDirection === 'inbound'
        ? [...route.stations].reverse()
        : route.stations;
    }
    return [];
  }, [currentLine, selectedDirection]);

  const timetable = useMemo(() => {
    if (selectedType === 'bus') return null;
    return generateTimetable(selectedLine, selectedDirection, selectedDay);
  }, [selectedLine, selectedDirection, selectedDay, selectedType]);

  const getLineColor = (line) => {
    if (line?.color) return line.color;
    if (selectedType === 'bus') {
      const operator = BUS_FRANCHISEES[line?.operator];
      return operator?.color || '#6b7280';
    }
    return '#6b7280';
  };

  const getCurrentTimeSlot = () => {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const getNextDepartures = (stationIndex) => {
    if (!timetable || timetable.length === 0) return [];
    const currentTime = getCurrentTimeSlot();

    return timetable
      .filter(train => {
        const departure = train[stationIndex];
        return departure && departure.time >= currentTime;
      })
      .slice(0, 5)
      .map(train => train[stationIndex]);
  };

  return (
    <div className="timetable-viewer">
      <div className="timetable-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          Timetables & Schedules
        </h3>
        <p>View departure times for all transit services</p>
      </div>

      <div className="timetable-controls">
        <div className="control-group type-selector">
          <button
            className={`type-btn ${selectedType === 'mrt' ? 'active' : ''}`}
            onClick={() => { setSelectedType('mrt'); setSelectedLine('L1'); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="3" width="16" height="18" rx="2"/>
              <path d="M9 18h6M12 3v15"/>
            </svg>
            MRT
          </button>
          <button
            className={`type-btn ${selectedType === 'isr' ? 'active' : ''}`}
            onClick={() => { setSelectedType('isr'); setSelectedLine('ISR'); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 18h14M5 14h14M3 10h18M4 6h16"/>
            </svg>
            ISR
          </button>
          <button
            className={`type-btn ${selectedType === 'hsr' ? 'active' : ''}`}
            onClick={() => { setSelectedType('hsr'); setSelectedLine('HSR'); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            HSR
          </button>
          <button
            className={`type-btn ${selectedType === 'bus' ? 'active' : ''}`}
            onClick={() => { setSelectedType('bus'); setSelectedLine('1'); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6v6M16 6v6M2 6h20v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              <circle cx="7" cy="18" r="2"/>
              <circle cx="17" cy="18" r="2"/>
            </svg>
            Bus
          </button>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label>{selectedType === 'bus' ? 'Route' : 'Line'}</label>
            <select
              value={selectedLine}
              onChange={(e) => setSelectedLine(e.target.value)}
              style={{ borderColor: getLineColor(currentLine) }}
            >
              {Object.entries(lines).map(([key, line]) => (
                <option key={key} value={key}>
                  {selectedType === 'bus'
                    ? `${key} - ${line.name}`
                    : `${key} - ${line.name}`}
                </option>
              ))}
            </select>
          </div>

          {selectedType !== 'bus' && (
            <div className="control-group">
              <label>Direction</label>
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
              >
                <option value="outbound">
                  {stations[0]?.name} → {stations[stations.length - 1]?.name}
                </option>
                <option value="inbound">
                  {stations[stations.length - 1]?.name} → {stations[0]?.name}
                </option>
              </select>
            </div>
          )}

          <div className="control-group">
            <label>Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="weekday">Weekday</option>
              <option value="weekend">Weekend/Holiday</option>
            </select>
          </div>
        </div>
      </div>

      {currentLine && (
        <div className="line-info-bar" style={{ background: getLineColor(currentLine) }}>
          <div className="line-info-content">
            <span className="line-badge">{selectedLine}</span>
            <span className="line-name">{currentLine.name}</span>
            <span className="line-meta">
              {selectedType === 'bus' ? (
                <>
                  <span>Operator: {BUS_FRANCHISEES[currentLine.operator]?.name}</span>
                  <span className="separator">|</span>
                  <span>Fare: ${currentLine.fare}</span>
                </>
              ) : (
                <>
                  <span>{currentLine.totalLength || currentLine.routes?.[0]?.journeyTime || '—'} {currentLine.totalLength ? 'km' : 'min'}</span>
                  <span className="separator">|</span>
                  <span>{stations.length} stations</span>
                  <span className="separator">|</span>
                  <span>Every {currentLine.frequency?.[selectedDay === 'weekend' ? 'weekend' : 'peak'] || '—'} min</span>
                </>
              )}
            </span>
          </div>
        </div>
      )}

      {selectedType !== 'bus' ? (
        <div className="timetable-content">
          <div className="station-list">
            <h4>Stations</h4>
            {stations.map((station, index) => (
              <div
                key={station.id || station.code}
                className={`station-item ${selectedStation === index ? 'selected' : ''}`}
                onClick={() => setSelectedStation(index)}
              >
                <div className="station-marker">
                  <span
                    className="marker-line"
                    style={{ background: getLineColor(currentLine) }}
                  />
                  <span
                    className={`marker-dot ${index === 0 || index === stations.length - 1 ? 'terminus' : ''}`}
                    style={{ borderColor: getLineColor(currentLine) }}
                  />
                </div>
                <div className="station-details">
                  <span className="station-name">{station.name}</span>
                  <span className="station-code">{station.code}</span>
                  {station.interchange && station.interchange.length > 0 && (
                    <div className="interchange-badges">
                      {station.interchange.map(line => {
                        const interLine = MRT_LINES[line] || ISR_LINES[line];
                        return (
                          <span
                            key={line}
                            className="interchange-badge"
                            style={{ background: interLine?.color || '#6b7280' }}
                          >
                            {line}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="station-facilities">
                  {station.facilities?.includes('parking') && (
                    <span className="facility-icon" title="Parking">P</span>
                  )}
                  {station.facilities?.includes('bus') && (
                    <span className="facility-icon" title="Bus interchange">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="departures-panel">
            {selectedStation !== null ? (
              <>
                <h4>Next Departures from {stations[selectedStation]?.name}</h4>
                <div className="departures-list">
                  {getNextDepartures(selectedStation).length > 0 ? (
                    getNextDepartures(selectedStation).map((dep, i) => (
                      <div key={i} className="departure-item">
                        <span className="departure-time">{dep.time}</span>
                        <span className="departure-dest">
                          to {selectedDirection === 'outbound'
                            ? stations[stations.length - 1]?.name
                            : stations[0]?.name}
                        </span>
                        {i === 0 && <span className="departure-badge">Next</span>}
                      </div>
                    ))
                  ) : (
                    <p className="no-departures">No more departures today</p>
                  )}
                </div>
                <div className="departures-info">
                  <p>
                    <strong>Operating Hours:</strong>{' '}
                    {currentLine.operatingHours?.start} - {currentLine.operatingHours?.end}
                  </p>
                  <p>
                    <strong>Frequency:</strong>{' '}
                    Peak: every {currentLine.frequency?.peak} min |
                    Off-peak: every {currentLine.frequency?.offPeak} min
                  </p>
                </div>
              </>
            ) : (
              <div className="select-station-prompt">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <p>Select a station to view departure times</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bus-schedule-content">
          <div className="bus-route-info">
            <h4>Route {selectedLine} - {currentLine?.name}</h4>
            <div className="bus-details">
              <div className="detail-item">
                <span className="detail-label">Operator</span>
                <span className="detail-value">{BUS_FRANCHISEES[currentLine?.operator]?.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type</span>
                <span className="detail-value">{currentLine?.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Fare</span>
                <span className="detail-value">${currentLine?.fare}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Operating Hours</span>
                <span className="detail-value">{currentLine?.hours}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Frequency</span>
                <span className="detail-value">
                  Peak: {currentLine?.frequency?.peak} min | Off-peak: {currentLine?.frequency?.offPeak} min
                </span>
              </div>
            </div>
          </div>

          <div className="bus-operators-info">
            <h4>Bus Operators</h4>
            <div className="operators-grid">
              {Object.values(BUS_FRANCHISEES).map(operator => (
                <div key={operator.id} className="operator-card" style={{ borderColor: operator.color }}>
                  <div className="operator-header" style={{ background: operator.color }}>
                    <span className="operator-id">{operator.id}</span>
                    <span className="operator-name">{operator.name}</span>
                  </div>
                  <div className="operator-stats">
                    <div className="stat">
                      <span className="stat-value">{operator.routes}</span>
                      <span className="stat-label">Routes</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{operator.fleet}</span>
                      <span className="stat-label">Buses</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{operator.dailyRidership}</span>
                      <span className="stat-label">Daily Riders</span>
                    </div>
                  </div>
                  <p className="operator-desc">{operator.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

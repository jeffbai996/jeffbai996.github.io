import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './PSE.css'

// Generate realistic market data with technical indicators
const generateMarketData = (days = 60) => {
  const data = []
  let basePrice = 8500
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000

  for (let i = days - 1; i >= 0; i--) {
    const timestamp = now - (i * dayMs)
    const change = (Math.random() - 0.48) * 100
    basePrice += change
    const open = basePrice
    const close = basePrice + (Math.random() - 0.5) * 50
    const high = Math.max(open, close) + Math.random() * 30
    const low = Math.min(open, close) - Math.random() * 30
    const volume = Math.floor(Math.random() * 5000000 + 2000000)

    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume
    })
  }

  return data
}

// Calculate RSI
const calculateRSI = (data, period = 14) => {
  const rsi = []
  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      rsi.push(null)
      continue
    }

    let gains = 0
    let losses = 0

    for (let j = i - period + 1; j <= i; j++) {
      const change = data[j].close - data[j - 1].close
      if (change > 0) gains += change
      else losses -= change
    }

    const avgGain = gains / period
    const avgLoss = losses / period
    const rs = avgGain / (avgLoss || 1)
    const rsiValue = 100 - (100 / (1 + rs))

    rsi.push(rsiValue)
  }

  return rsi
}

// Calculate MACD
const calculateMACD = (data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
  const prices = data.map(d => d.close)

  // Calculate EMA
  const calculateEMA = (prices, period) => {
    const k = 2 / (period + 1)
    const ema = [prices[0]]

    for (let i = 1; i < prices.length; i++) {
      ema.push(prices[i] * k + ema[i - 1] * (1 - k))
    }

    return ema
  }

  const fastEMA = calculateEMA(prices, fastPeriod)
  const slowEMA = calculateEMA(prices, slowPeriod)

  const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i])
  const signalLine = calculateEMA(macdLine, signalPeriod)
  const histogram = macdLine.map((macd, i) => macd - signalLine[i])

  return { macdLine, signalLine, histogram }
}

export default function PSE() {
  const [marketData] = useState(() => generateMarketData(60))
  const [selectedStock, setSelectedStock] = useState('PSE')
  const [timeframe, setTimeframe] = useState('1D')
  const [chartLoaded, setChartLoaded] = useState(false)
  const [chartError, setChartError] = useState(false)
  const mainChartRef = useRef(null)
  const rsiChartRef = useRef(null)
  const macdChartRef = useRef(null)

  const currentPrice = marketData[marketData.length - 1]?.close || 8742
  const previousPrice = marketData[marketData.length - 2]?.close || 8637
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = (priceChange / previousPrice) * 100

  const watchlist = [
    { symbol: 'PNB', name: 'Praya National Bank', price: 142.50, change: 2.4 },
    { symbol: 'TECH', name: 'Praya Technologies', price: 87.32, change: -1.2 },
    { symbol: 'INDU', name: 'Industrial Group', price: 215.80, change: 3.1 },
    { symbol: 'ENER', name: 'Praya Energy Corp', price: 52.15, change: -0.8 },
    { symbol: 'CONS', name: 'Consumer Goods Ltd', price: 98.44, change: 1.5 }
  ]

  const topMovers = [
    { rank: 1, symbol: 'INDU', name: 'Industrial Group', percent: 3.1, value: 215.80 },
    { rank: 2, symbol: 'PNB', name: 'Praya National Bank', percent: 2.4, value: 142.50 },
    { rank: 3, symbol: 'CONS', name: 'Consumer Goods', percent: 1.5, value: 98.44 }
  ]

  const news = [
    { time: '2h ago', tag: 'MARKETS', title: 'PSE Composite hits new record high', excerpt: 'Index surges past 8,750 on strong financial sector performance.' },
    { time: '4h ago', tag: 'EARNINGS', title: 'Praya National Bank reports Q4 earnings beat', excerpt: 'Net profit up 18% YoY as lending activity accelerates.' },
    { time: '6h ago', tag: 'IPO', title: 'Tech startup TechCorp files for IPO', excerpt: 'Company seeks to raise ¤500M in early 2025 listing.' }
  ]

  useEffect(() => {
    // Only initialize charts after Chart.js is loaded
    if (!chartLoaded || typeof window === 'undefined' || !window.Chart) {
      return
    }

    // Initialize main price chart
    if (mainChartRef.current) {
      const ctx = mainChartRef.current.getContext('2d')

      if (window.mainChart) {
        window.mainChart.destroy()
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

      window.mainChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: marketData.map((d, i) => {
            const date = new Date(d.timestamp)
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }),
          datasets: [{
            label: 'PSE Composite Index',
            data: marketData.map(d => d.close),
            borderColor: '#3b82f6',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#3b82f6',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(16, 24, 37, 0.95)',
              titleColor: '#e8ecf2',
              bodyColor: '#9ca3af',
              borderColor: '#2a3544',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return 'Index: ' + context.parsed.y.toFixed(2)
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 11
                },
                maxRotation: 0
              }
            },
            y: {
              position: 'right',
              grid: {
                color: 'rgba(156, 163, 175, 0.1)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 11
                },
                callback: function(value) {
                  return value.toLocaleString()
                }
              }
            }
          }
        }
      })
    }

    // Initialize RSI chart
    if (rsiChartRef.current) {
      const ctx = rsiChartRef.current.getContext('2d')

      if (window.rsiChart) {
        window.rsiChart.destroy()
      }

      const rsiData = calculateRSI(marketData)

      window.rsiChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: marketData.map((d, i) => i),
          datasets: [{
            label: 'RSI',
            data: rsiData,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(16, 24, 37, 0.95)',
              titleColor: '#e8ecf2',
              bodyColor: '#9ca3af',
              borderColor: '#2a3544',
              borderWidth: 1,
              padding: 8,
              displayColors: false,
              callbacks: {
                title: () => '',
                label: function(context) {
                  return 'RSI: ' + (context.parsed.y || 0).toFixed(2)
                }
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              position: 'right',
              min: 0,
              max: 100,
              grid: {
                color: 'rgba(156, 163, 175, 0.1)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 10
                },
                stepSize: 50
              }
            }
          }
        }
      })

      // Add reference lines for overbought/oversold
      const chartArea = window.rsiChart.chartArea
      if (chartArea) {
        const yAxis = window.rsiChart.scales.y
        ctx.save()
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)'
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])

        // Overbought line (70)
        const y70 = yAxis.getPixelForValue(70)
        ctx.beginPath()
        ctx.moveTo(chartArea.left, y70)
        ctx.lineTo(chartArea.right, y70)
        ctx.stroke()

        // Oversold line (30)
        const y30 = yAxis.getPixelForValue(30)
        ctx.beginPath()
        ctx.moveTo(chartArea.left, y30)
        ctx.lineTo(chartArea.right, y30)
        ctx.stroke()

        ctx.restore()
      }
    }

    // Initialize MACD chart
    if (macdChartRef.current) {
      const ctx = macdChartRef.current.getContext('2d')

      if (window.macdChart) {
        window.macdChart.destroy()
      }

      const { macdLine, signalLine, histogram } = calculateMACD(marketData)

      window.macdChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: marketData.map((d, i) => i),
          datasets: [
            {
              type: 'bar',
              label: 'Histogram',
              data: histogram,
              backgroundColor: histogram.map(h => h >= 0 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'),
              borderWidth: 0
            },
            {
              type: 'line',
              label: 'MACD',
              data: macdLine,
              borderColor: '#3b82f6',
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
              tension: 0.4
            },
            {
              type: 'line',
              label: 'Signal',
              data: signalLine,
              borderColor: '#ef4444',
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(16, 24, 37, 0.95)',
              titleColor: '#e8ecf2',
              bodyColor: '#9ca3af',
              borderColor: '#2a3544',
              borderWidth: 1,
              padding: 8,
              displayColors: true,
              callbacks: {
                title: () => '',
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(2)
                }
              }
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              position: 'right',
              grid: {
                color: 'rgba(156, 163, 175, 0.1)',
                drawBorder: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 10
                }
              }
            }
          }
        }
      })
    }

    return () => {
      if (window.mainChart) window.mainChart.destroy()
      if (window.rsiChart) window.rsiChart.destroy()
      if (window.macdChart) window.macdChart.destroy()
    }
  }, [marketData, chartLoaded])

  // Load Chart.js first
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.Chart) {
        setChartLoaded(true)
      } else {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
        script.async = true

        // Set timeout to handle CDN failures
        const timeout = setTimeout(() => {
          if (!window.Chart) {
            console.error('Chart.js load timeout')
            setChartError(true)
          }
        }, 10000) // 10 second timeout

        script.onload = () => {
          clearTimeout(timeout)
          setChartLoaded(true)
        }

        script.onerror = () => {
          clearTimeout(timeout)
          console.error('Failed to load Chart.js')
          setChartError(true)
        }

        document.head.appendChild(script)

        return () => clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <div className="pse-container">
      {/* Header */}
      <header className="pse-header">
        <div className="pse-header-content">
          <Link to="/pse" className="pse-logo">
            <div className="pse-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
              </svg>
            </div>
            <div className="pse-logo-text">
              <h1>Praya Stock Exchange</h1>
              <span>Professional Trading Platform</span>
            </div>
          </Link>
          <nav className="pse-nav">
            <Link to="/pse" className="pse-nav-link active">Markets</Link>
            <Link to="/pse" className="pse-nav-link">Analysis</Link>
            <Link to="/pse" className="pse-nav-link">News</Link>
            <Link to="/bop" className="pse-link-bop">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Bank of Praya
            </Link>
          </nav>
        </div>
      </header>

      {/* Market Status Bar */}
      <div className="pse-status-bar">
        <div className="pse-status-content">
          <div className="pse-status-item">
            <span className="pse-status-label">Market Status</span>
            <span className="pse-status-badge">
              <span className="pse-status-pulse"></span>
              OPEN
            </span>
          </div>
          <div className="pse-status-item">
            <span className="pse-status-label">PSE Index</span>
            <span className="pse-status-value">{currentPrice.toFixed(2)}</span>
            <span className={`pse-status-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="pse-status-item">
            <span className="pse-status-label">Market Cap</span>
            <span className="pse-status-value">¤892B</span>
            <span className="pse-status-change" style={{ color: 'var(--pse-text-muted)' }}>Total Value</span>
          </div>
          <div className="pse-status-item">
            <span className="pse-status-label">Volume</span>
            <span className="pse-status-value">¤3.2B</span>
            <span className="pse-status-change" style={{ color: 'var(--pse-text-muted)' }}>Today</span>
          </div>
          <div className="pse-status-item">
            <span className="pse-status-label">Trades</span>
            <span className="pse-status-value">124K</span>
            <span className="pse-status-change" style={{ color: 'var(--pse-text-muted)' }}>Today</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pse-main">
        <div className="pse-grid">
          {/* Left Column - Charts */}
          <div>
            {/* Main Price Chart */}
            <div className="pse-card" style={{ marginBottom: '20px' }}>
              <div className="pse-card-header">
                <div>
                  <h2 className="pse-card-title">PSE Composite Index</h2>
                  <p className="pse-card-subtitle">Real-time market performance</p>
                </div>
                <div className="pse-card-actions">
                  <button className={`pse-card-action ${timeframe === '1D' ? 'active' : ''}`} onClick={() => setTimeframe('1D')}>1D</button>
                  <button className={`pse-card-action ${timeframe === '1W' ? 'active' : ''}`} onClick={() => setTimeframe('1W')}>1W</button>
                  <button className={`pse-card-action ${timeframe === '1M' ? 'active' : ''}`} onClick={() => setTimeframe('1M')}>1M</button>
                  <button className={`pse-card-action ${timeframe === '1Y' ? 'active' : ''}`} onClick={() => setTimeframe('1Y')}>1Y</button>
                </div>
              </div>
              <div className="pse-card-body">
                <div className="pse-chart-container">
                  {chartError ? (
                    <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--pse-text-muted)' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.5 }}>
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Chart unavailable</p>
                      <p style={{ fontSize: '13px', opacity: 0.7 }}>Unable to load charting library. Please check your connection and refresh.</p>
                      <button
                        onClick={() => window.location.reload()}
                        style={{
                          marginTop: '16px',
                          padding: '8px 16px',
                          background: 'var(--pse-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px'
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  ) : !chartLoaded ? (
                    <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--pse-text-muted)' }}>
                      <div style={{ width: '32px', height: '32px', border: '3px solid var(--pse-border)', borderTopColor: 'var(--pse-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                      <p style={{ fontSize: '13px' }}>Loading charts...</p>
                    </div>
                  ) : (
                    <canvas ref={mainChartRef}></canvas>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Indicators */}
            <div className="pse-card" style={{ marginBottom: '20px' }}>
              <div className="pse-card-header">
                <h3 className="pse-card-title">Technical Indicators</h3>
              </div>
              <div className="pse-card-body">
                {/* RSI Indicator */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--pse-text-primary)' }}>
                      Relative Strength Index (RSI)
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--pse-text-muted)' }}>
                      Period: 14
                    </span>
                  </div>
                  <div className="pse-indicator-chart">
                    <canvas ref={rsiChartRef}></canvas>
                  </div>
                </div>

                {/* MACD Indicator */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--pse-text-primary)' }}>
                      MACD (Moving Average Convergence Divergence)
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--pse-text-muted)' }}>
                      12, 26, 9
                    </span>
                  </div>
                  <div className="pse-indicator-chart">
                    <canvas ref={macdChartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>

            {/* Market News */}
            <div className="pse-card">
              <div className="pse-card-header">
                <h3 className="pse-card-title">Market News</h3>
              </div>
              {news.map((item, i) => (
                <div key={i} className="pse-news-item">
                  <div className="pse-news-meta">
                    <span className="pse-news-time">{item.time}</span>
                    <span className="pse-news-tag">{item.tag}</span>
                  </div>
                  <h4 className="pse-news-title">{item.title}</h4>
                  <p className="pse-news-excerpt">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Watchlist */}
            <div className="pse-card" style={{ marginBottom: '20px' }}>
              <div className="pse-card-header">
                <h3 className="pse-card-title">Watchlist</h3>
              </div>
              <div className="pse-watchlist">
                {watchlist.map((stock, i) => (
                  <div key={i} className="pse-watchlist-item" onClick={() => setSelectedStock(stock.symbol)}>
                    <div>
                      <div className="pse-watchlist-symbol">{stock.symbol}</div>
                      <div className="pse-watchlist-name">{stock.name}</div>
                    </div>
                    <div className="pse-watchlist-price">
                      <div className="pse-watchlist-value">¤{stock.price.toFixed(2)}</div>
                      <div className={`pse-watchlist-change ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Movers */}
            <div className="pse-card" style={{ marginBottom: '20px' }}>
              <div className="pse-card-header">
                <h3 className="pse-card-title">Top Gainers</h3>
              </div>
              <div className="pse-card-body">
                <div className="pse-movers">
                  {topMovers.map((mover) => (
                    <div key={mover.rank} className="pse-mover-item">
                      <div className="pse-mover-info">
                        <div className="pse-mover-rank">{mover.rank}</div>
                        <div>
                          <div className="pse-mover-symbol">{mover.symbol}</div>
                          <div className="pse-mover-name">{mover.name}</div>
                        </div>
                      </div>
                      <div className="pse-mover-change">
                        <div className="pse-mover-percent text-success">+{mover.percent}%</div>
                        <div className="pse-mover-value">¤{mover.value.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Info */}
            <div className="pse-info-panel">
              <h4>Trading Information</h4>
              <div className="pse-info-row">
                <span className="pse-info-label">Market Opens</span>
                <span className="pse-info-value">9:30 AM</span>
              </div>
              <div className="pse-info-row">
                <span className="pse-info-label">Market Closes</span>
                <span className="pse-info-value">4:00 PM</span>
              </div>
              <div className="pse-info-row">
                <span className="pse-info-label">After Hours</span>
                <span className="pse-info-value">4:00 - 6:30 PM</span>
              </div>
              <div className="pse-info-row">
                <span className="pse-info-label">Settlement</span>
                <span className="pse-info-value">T+2</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pse-footer">
        <div className="pse-footer-content">
          <div className="pse-footer-grid">
            <div className="pse-footer-brand">
              <h4>Praya Stock Exchange</h4>
              <p>The primary securities exchange of the Republic of Praya, facilitating capital formation and providing a transparent marketplace for investors and traders worldwide.</p>
            </div>
            <div className="pse-footer-section">
              <h5>Trading</h5>
              <ul>
                <li><a href="#">Market Data</a></li>
                <li><a href="#">Trading Platform</a></li>
                <li><a href="#">Order Types</a></li>
                <li><a href="#">Fees &amp; Commissions</a></li>
              </ul>
            </div>
            <div className="pse-footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Education Center</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Market Reports</a></li>
                <li><a href="#">Research</a></li>
              </ul>
            </div>
            <div className="pse-footer-section">
              <h5>Related</h5>
              <ul>
                <li><Link to="/bop">Bank of Praya</Link></li>
                <li><Link to="/">Government Portal</Link></li>
                <li><a href="#">Securities Commission</a></li>
                <li><a href="#">Economic Data</a></li>
              </ul>
            </div>
          </div>
          <div className="pse-footer-bottom">
            <span>&copy; 2024 Republic of Praya. Praya Stock Exchange.</span>
            <div className="pse-footer-legal">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Disclosures</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

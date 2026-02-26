'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Home() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString())
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16))
  const [copied, setCopied] = useState<string | null>(null)

  const convertTimestamp = useCallback((ts: string) => {
    const num = parseInt(ts, 10)
    if (isNaN(num)) return null
    
    // Handle seconds or milliseconds
    const ms = ts.length > 10 ? num : num * 1000
    return new Date(ms)
  }, [])

  const convertDate = useCallback((dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return null
    return Math.floor(date.getTime() / 1000)
  }, [])

  const date = convertTimestamp(timestamp)
  const epochFromDate = convertDate(dateInput)

  const copyToClipboard = useCallback((value: string, type: string) => {
    navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000)
    setTimestamp(now.toString())
    setDateInput(new Date().toISOString().slice(0, 16))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" 
                style={{ 
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                ⏰
              </div>
              <div>
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Epoch Converter</span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Timestamp to Date</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#tool" className="text-sm font-medium transition-colors hover:text-cyan-600" style={{ color: 'var(--color-text-secondary)' }}>Tool</a>
              <a href="#features" className="text-sm font-medium transition-colors hover:text-cyan-600" style={{ color: 'var(--color-text-secondary)' }}>Features</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-6" 
            style={{ 
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-xl)'
            }}>
            ⏰
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Epoch Converter
          </h1>
          <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
            Convert between Unix timestamps and human-readable dates instantly.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <main id="tool" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="p-6 md:p-8 bg-white rounded-2xl border" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
          <button onClick={setNow} className="btn-primary mb-6">⏰ Set to Now</button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Timestamp to Date */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Timestamp to Date</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Unix Timestamp (seconds)</label>
                  <input
                    type="text"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="1700000000"
                    className="input"
                  />
                </div>
                {date && (
                  <div className="p-4 rounded-lg border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Date & Time</span>
                      <button
                        onClick={() => copyToClipboard(formatDate(date), 'date')}
                        className="text-xs font-medium transition-colors hover:text-cyan-700"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {copied === 'date' ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{formatDate(date)}</p>
                    <div className="mt-2 text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                      <p>ISO: {date.toISOString()}</p>
                      <p>UTC: {date.toUTCString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Date to Timestamp */}
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Date to Timestamp</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Select Date & Time</label>
                  <input
                    type="datetime-local"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="input"
                  />
                </div>
                {epochFromDate && (
                  <div className="p-4 rounded-lg border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Unix Timestamp</span>
                      <button
                        onClick={() => copyToClipboard(epochFromDate.toString(), 'epoch')}
                        className="text-xs font-medium transition-colors hover:text-cyan-700"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {copied === 'epoch' ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                    <p className="text-2xl font-bold font-mono" style={{ color: 'var(--color-primary)' }}>{epochFromDate}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Seconds since Jan 1, 1970</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white border-t py-16" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Features</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⏰', title: 'Bidirectional', desc: 'Convert both ways: timestamp to date and date to timestamp.' },
              { icon: '📋', title: 'One-Click Copy', desc: 'Copy results instantly to your clipboard.' },
              { icon: '⚡', title: 'Real-time', desc: 'Results update as you type.' },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  backgroundColor: 'var(--neutral-50)', 
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-200)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--neutral-900)', color: 'var(--neutral-400)' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" 
                style={{ background: 'var(--gradient-primary)' }}>
                ⏰
              </div>
              <span className="font-semibold" style={{ color: 'var(--neutral-100)' }}>Epoch Converter</span>
            </div>
            <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

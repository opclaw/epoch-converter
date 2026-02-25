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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">⏰</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Epoch Converter</h1>
                <p className="text-sm text-slate-500">Timestamp to Date</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#tool" className="text-sm font-medium text-slate-600 hover:text-amber-600">Tool</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-amber-600">Features</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-3xl shadow-xl mb-6">⏰</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Epoch Converter</h2>
            <p className="text-lg md:text-xl text-slate-600">Convert between Unix timestamps and human-readable dates instantly.</p>
          </div>
        </div>
      </section>

      <main id="tool" className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <button onClick={setNow} className="btn-primary bg-amber-600 hover:bg-amber-700 mb-6">⏰ Set to Now</button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Timestamp to Date */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Timestamp to Date</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unix Timestamp (seconds)</label>
                  <input
                    type="text"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="1700000000"
                    className="input"
                  />
                </div>
                {date && (
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-500">Date & Time</span>
                      <button
                        onClick={() => copyToClipboard(formatDate(date), 'date')}
                        className="text-xs font-medium text-amber-600 hover:text-amber-700"
                      >
                        {copied === 'date' ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                    <p className="text-slate-900 font-medium">{formatDate(date)}</p>
                    <div className="mt-2 text-xs text-slate-500 space-y-1">
                      <p>ISO: {date.toISOString()}</p>
                      <p>UTC: {date.toUTCString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Date to Timestamp */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Date to Timestamp</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date & Time</label>
                  <input
                    type="datetime-local"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="input"
                  />
                </div>
                {epochFromDate && (
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-500">Unix Timestamp</span>
                      <button
                        onClick={() => copyToClipboard(epochFromDate.toString(), 'epoch')}
                        className="text-xs font-medium text-amber-600 hover:text-amber-700"
                      >
                        {copied === 'epoch' ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 font-mono">{epochFromDate}</p>
                    <p className="text-xs text-slate-500 mt-1">Seconds since Jan 1, 1970</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Features</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⏰', title: 'Bidirectional', desc: 'Convert both ways: timestamp to date and date to timestamp.' },
              { icon: '📋', title: 'One-Click Copy', desc: 'Copy results instantly to your clipboard.' },
              { icon: '⚡', title: 'Real-time', desc: 'Results update as you type.' },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-amber-200 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}

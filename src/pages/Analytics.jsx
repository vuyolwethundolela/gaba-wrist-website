import React, { useEffect, useState } from 'react'
import { useProducts } from '../data/useProducts.js'

const RANGES = [
  { days: 7, label: 'Last 7 days' },
  { days: 30, label: 'Last 30 days' },
  { days: 90, label: 'Last 90 days' },
  { days: 365, label: 'Last year' },
]

const cardStyle = { border: '1px solid var(--border)', padding: '16px' }
const numberStyle = { fontSize: '32px', lineHeight: 1.1 }
const smallStyle = { fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }

function Stat({ label, value, note }) {
  return (
    <div style={cardStyle}>
      <p className="text-muted" style={smallStyle}>{label}</p>
      <p className="font-display" style={numberStyle}>{value}</p>
      {note && <p className="text-muted" style={{ fontSize: '12px', marginTop: '4px' }}>{note}</p>}
    </div>
  )
}

export default function Analytics({ api }) {
  const [days, setDays] = useState(30)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const catalogue = useProducts()

  useEffect(() => {
    let alive = true
    setStats(null)
    setError('')
    api('/rest/v1/rpc/admin_stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days }),
    })
      .then((response) => response.json())
      .then((data) => alive && setStats(data))
      .catch((err) => alive && setError(err.message))
    return () => {
      alive = false
    }
  }, [days, api])

  const counts = new Map((stats?.products || []).map((p) => [p.product_id, Number(p.enquiries)]))
  const ranked = catalogue
    .map((p) => ({ id: p.id, name: p.name, category: p.category, enquiries: counts.get(p.id) || 0 }))
    .sort((a, b) => b.enquiries - a.enquiries)
  const enquiredCount = ranked.filter((p) => p.enquiries > 0).length
  const most = ranked.length && ranked[0].enquiries > 0 ? ranked[0] : null
  const zero = ranked.filter((p) => p.enquiries === 0)
  const least = zero.length ? null : ranked[ranked.length - 1]

  return (
    <section className="mb-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl">Website activity</h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={{ padding: '8px 10px', border: '1px solid var(--border)', background: 'transparent', color: 'inherit', fontSize: '14px' }}
        >
          {RANGES.map((range) => (
            <option key={range.days} value={range.days} style={{ color: '#000' }}>{range.label}</option>
          ))}
        </select>
      </div>

      {error && <p style={{ color: '#d9534f', fontSize: '14px' }}>{error}</p>}
      {!stats && !error && <p className="text-muted text-sm">Loading…</p>}

      {stats && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Visitors" value={stats.visitors} note="Unique browsers" />
            <Stat label="Page views" value={stats.page_views} />
            <Stat label="Enquiries" value={stats.enquiries} note="Items enquired in total" />
            <Stat label="Items enquired" value={`${enquiredCount} of ${ranked.length}`} note="Different items" />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div style={cardStyle}>
              <p className="text-muted" style={smallStyle}>Most enquired</p>
              {most ? (
                <>
                  <p style={{ fontSize: '16px', marginTop: '6px' }}>{most.name}</p>
                  <p className="text-muted" style={{ fontSize: '12px' }}>{most.id} · {most.enquiries} enquiries</p>
                </>
              ) : (
                <p className="text-muted" style={{ fontSize: '14px', marginTop: '6px' }}>No enquiries in this period.</p>
              )}
            </div>
            <div style={cardStyle}>
              <p className="text-muted" style={smallStyle}>Least enquired</p>
              {zero.length > 0 ? (
                <>
                  <p style={{ fontSize: '16px', marginTop: '6px' }}>{zero.length} items with no enquiries</p>
                  <p className="text-muted" style={{ fontSize: '12px' }}>
                    {zero.slice(0, 5).map((p) => p.id).join(', ')}{zero.length > 5 ? '…' : ''}
                  </p>
                </>
              ) : least ? (
                <>
                  <p style={{ fontSize: '16px', marginTop: '6px' }}>{least.name}</p>
                  <p className="text-muted" style={{ fontSize: '12px' }}>{least.id} · {least.enquiries} enquiries</p>
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div style={cardStyle}>
              <p className="text-muted" style={{ ...smallStyle, marginBottom: '8px' }}>Top items by enquiries</p>
              {ranked.filter((p) => p.enquiries > 0).slice(0, 10).map((p) => (
                <p key={p.id} style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '3px 0' }}>
                  <span>{p.name}</span>
                  <span className="text-muted">{p.enquiries}</span>
                </p>
              ))}
              {enquiredCount === 0 && <p className="text-muted" style={{ fontSize: '13px' }}>Nothing yet.</p>}
            </div>
            <div style={cardStyle}>
              <p className="text-muted" style={{ ...smallStyle, marginBottom: '8px' }}>Most visited pages</p>
              {(stats.top_pages || []).map((p) => (
                <p key={p.path} style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '3px 0' }}>
                  <span>{p.path}</span>
                  <span className="text-muted">{p.views}</span>
                </p>
              ))}
              {(stats.top_pages || []).length === 0 && <p className="text-muted" style={{ fontSize: '13px' }}>Nothing yet.</p>}
            </div>
          </div>
          <p className="text-muted" style={{ fontSize: '12px', marginTop: '10px' }}>
            Counts start from when tracking went live. A visitor is one browser on one device, so one person on two devices counts twice.
          </p>
        </>
      )}
    </section>
  )
}

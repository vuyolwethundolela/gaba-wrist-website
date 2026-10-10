import React, { useCallback, useEffect, useState } from 'react'
import { CATEGORIES, products as staticProducts } from '../data/products.js'
import { clearProductsCache } from '../data/useProducts.js'
  import Analytics from './Analytics.jsx'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const SESSION_KEY = 'gw-admin-session'
const BUCKET = 'product-images'
const PREFIX = {
  [CATEGORIES.MENS]: 'M',
  [CATEGORIES.LADIES]: 'L',
  [CATEGORIES.UNISEX]: 'U',
  [CATEGORIES.JEWELLERY]: 'J',
}
const categoryList = Object.values(CATEGORIES)
const emptyForm = { category: CATEGORIES.MENS, name: '', description: '', price: '', is_active: true }

const readSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}
const saveSession = (session) => {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else localStorage.removeItem(SESSION_KEY)
  } catch {}
}

async function authRequest(grant, body) {
  const response = await fetch(`${url}/auth/v1/token?grant_type=${grant}`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error_description || data.msg || 'Login failed.')
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
    email: data.user?.email || '',
  }
}

async function validSession() {
  const session = readSession()
  if (!session) return null
  if (Date.now() < session.expires_at) return session
  try {
    const fresh = await authRequest('refresh_token', { refresh_token: session.refresh_token })
    saveSession(fresh)
    return fresh
  } catch {
    saveSession(null)
    return null
  }
}

async function api(path, options = {}) {
  const session = await validSession()
  if (!session) throw new Error('Your session has expired. Please log in again.')
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, ...(options.headers || {}) },
  })
  if (!response.ok) {
    let message = 'Request failed.'
    try {
      const data = await response.json()
      message = data.message || data.error || message
    } catch {}
    throw new Error(message)
  }
  return response
}

async function uploadImage(file, id) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = `${id}-${Date.now()}.${ext}`
  await api(`/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  return `${url}/storage/v1/object/public/${BUCKET}/${path}`
}

function nextId(category, rows) {
  const letter = PREFIX[category]
  const pattern = new RegExp(`^GW-${letter}(\\d+)$`)
  const ids = [...staticProducts.map((p) => p.id), ...rows.map((r) => r.id)]
  const max = ids.reduce((highest, id) => {
    const match = pattern.exec(id)
    return match ? Math.max(highest, Number(match[1])) : highest
  }, 0)
  return `GW-${letter}${String(max + 1).padStart(3, '0')}`
}

const fieldStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'inherit',
  fontSize: '14px',
}
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }
const buttonStyle = {
  padding: '10px 18px',
  border: '1px solid var(--gold)',
  color: 'var(--gold)',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  background: 'transparent',
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const session = await authRequest('password', { email: email.trim(), password })
      saveSession(session)
      onLogin(session)
    } catch (err) {
      setError(err.message)
    }
    setBusy(false)
  }

  return (
    <form onSubmit={submit} className="gold-border mx-auto max-w-md p-6" style={{ backgroundColor: 'var(--bg-elevated)' }}>
      <h1 className="font-display mb-6 text-3xl">Admin login</h1>
      <label style={labelStyle}>Email</label>
      <input style={{ ...fieldStyle, marginBottom: '16px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
      <label style={labelStyle}>Password</label>
      <input style={{ ...fieldStyle, marginBottom: '16px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
      {error && <p style={{ color: '#d9534f', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
      <button type="submit" style={buttonStyle} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}

function Dashboard({ session, onLogout }) {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)

  const loadRows = useCallback(async () => {
    try {
      const response = await api('/rest/v1/products?select=*&order=created_at.desc')
      setRows(await response.json())
    } catch (err) {
      setStatus({ type: 'error', text: err.message })
    }
  }, [])

  useEffect(() => {
    loadRows()
  }, [loadRows])

  const currentId = editingId || nextId(form.category, rows)
  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }))

  const reset = () => {
    setForm(emptyForm)
    setFile(null)
    setEditingId(null)
    const input = document.getElementById('gw-image-input')
    if (input) input.value = ''
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.description.trim() || !form.price.trim()) {
      setStatus({ type: 'error', text: 'Please complete the name, description and price.' })
      return
    }
    if (!editingId && !file) {
      setStatus({ type: 'error', text: 'Please choose a photo.' })
      return
    }
    if (file && (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)) {
      setStatus({ type: 'error', text: 'The photo must be an image under 5 MB.' })
      return
    }
    setBusy(true)
    setStatus({ type: 'info', text: 'Saving…' })
    try {
      const fields = {
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        price: form.price.trim(),
        is_active: form.is_active,
      }
      if (file) fields.image_url = await uploadImage(file, currentId)

      if (editingId) {
        await api(`/rest/v1/products?id=eq.${encodeURIComponent(editingId)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify(fields),
        })
      } else {
        await api('/rest/v1/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ id: currentId, ...fields }),
        })
      }
      clearProductsCache()
      reset()
      await loadRows()
      setStatus({ type: 'success', text: editingId ? 'Item updated.' : 'Item added. It is now live on the website.' })
    } catch (err) {
      setStatus({ type: 'error', text: err.message })
    }
    setBusy(false)
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    setForm({ category: row.category, name: row.name, description: row.description, price: row.price, is_active: row.is_active })
    setFile(null)
    setStatus(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleActive = async (row) => {
    try {
      await api(`/rest/v1/products?id=eq.${encodeURIComponent(row.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ is_active: !row.is_active }),
      })
      clearProductsCache()
      await loadRows()
    } catch (err) {
      setStatus({ type: 'error', text: err.message })
    }
  }

  const remove = async (row) => {
    if (!window.confirm(`Delete ${row.name} (${row.id})? This cannot be undone.`)) return
    try {
      await api(`/rest/v1/products?id=eq.${encodeURIComponent(row.id)}`, { method: 'DELETE' })
      clearProductsCache()
      if (editingId === row.id) reset()
      await loadRows()
      setStatus({ type: 'success', text: 'Item deleted.' })
    } catch (err) {
      setStatus({ type: 'error', text: err.message })
    }
  }

  const statusColor = status?.type === 'error' ? '#d9534f' : status?.type === 'success' ? '#3c9d5d' : 'inherit'

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-display text-3xl sm:text-4xl">Manage products</h1>
          <p className="text-sm text-muted">Signed in as {session.email}</p>
        </div>
        <button type="button" style={buttonStyle} onClick={onLogout}>Log out</button>
      </div>

      <form onSubmit={submit} className="gold-border mb-12 grid gap-4 p-5 md:p-6" style={{ backgroundColor: 'var(--bg-elevated)' }}>
        <h2 className="font-display text-2xl">{editingId ? `Edit ${editingId}` : 'Add a new item'}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label style={labelStyle}>Category</label>
            <select style={fieldStyle} value={form.category} onChange={(e) => setField('category', e.target.value)} disabled={Boolean(editingId)}>
              {categoryList.map((name) => (
                <option key={name} value={name} style={{ color: '#000' }}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Reference (automatic)</label>
            <input style={{ ...fieldStyle, opacity: 0.7 }} value={currentId} readOnly />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Name</label>
          <input style={fieldStyle} value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="e.g. CURREN Luxury Chronograph Watch" />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...fieldStyle, minHeight: '110px' }} value={form.description} onChange={(e) => setField('description', e.target.value)} placeholder="Describe the item. Do not add the price here." />
        </div>

        <div>
          <label style={labelStyle}>Price (rand, text allowed)</label>
          <input style={fieldStyle} value={form.price} onChange={(e) => setField('price', e.target.value)} placeholder="e.g. 699 or 700 for both" />
          <p className="text-muted" style={{ fontSize: '12px', marginTop: '4px' }}>
            Shown as "Price: R{form.price || '…'}." at the end of the description, like the existing items.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Photo {editingId ? '(leave empty to keep the current one)' : ''}</label>
          <input id="gw-image-input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <input type="checkbox" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} />
          Visible on the website
        </label>

        {status && <p style={{ color: statusColor, fontSize: '14px' }}>{status.text}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" style={buttonStyle} disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Add item'}</button>
          {editingId && <button type="button" style={buttonStyle} onClick={reset}>Cancel edit</button>}
        </div>
      </form>

      <h2 className="font-display mb-4 text-2xl">Items added here ({rows.length})</h2>
      <p className="text-muted mb-4" style={{ fontSize: '13px' }}>
        The original 24 items live in the code and are not listed here.
      </p>
      <div className="grid gap-3">
        {rows.length === 0 && <p className="text-muted text-sm">No items added yet.</p>}
        {rows.map((row) => (
          <div key={row.id} className="flex flex-wrap items-center gap-4 border p-3" style={{ borderColor: 'var(--border)' }}>
            <img src={row.image_url} alt="" style={{ width: 64, height: 64, objectFit: 'cover' }} />
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <p style={{ fontSize: '14px' }}>{row.name}</p>
              <p className="text-muted" style={{ fontSize: '12px' }}>
                {row.id} · {row.category} · R{row.price} · {row.is_active ? 'Visible' : 'Hidden'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" style={buttonStyle} onClick={() => startEdit(row)}>Edit</button>
              <button type="button" style={buttonStyle} onClick={() => toggleActive(row)}>{row.is_active ? 'Hide' : 'Show'}</button>
              <button type="button" style={{ ...buttonStyle, borderColor: '#d9534f', color: '#d9534f' }} onClick={() => remove(row)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    validSession().then(setSession)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  const logout = () => {
    saveSession(null)
    setSession(null)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-5 sm:py-16 md:px-10 md:py-20">
      {session === undefined ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : session ? (
        <Dashboard session={session} onLogout={logout} />
      ) : (
        <Login onLogin={setSession} />
      )}
    </div>
  )
}

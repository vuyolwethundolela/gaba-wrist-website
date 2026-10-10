const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

function visitorId() {
  try {
    let id = localStorage.getItem('gw-visitor')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('gw-visitor', id)
    }
    return id
  } catch {
    return 'unknown'
  }
}

function shouldSkip() {
  try {
    if (localStorage.getItem('gw-admin-session')) return true
  } catch {}
  if (navigator.webdriver) return true
  return /bot|crawl|spider|slurp|preview/i.test(navigator.userAgent)
}

let last = { key: '', time: 0 }

export function trackEvent(type, data = {}) {
  if (!url || !key || shouldSkip()) return
  const signature = `${type}:${data.path || ''}:${data.product_id || ''}`
  if (signature === last.key && Date.now() - last.time < 2000) return
  last = { key: signature, time: Date.now() }
  try {
    fetch(`${url}/rest/v1/site_events`, {
      method: 'POST',
      keepalive: true,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ event_type: type, visitor_id: visitorId(), ...data }),
    }).catch(() => {})
  } catch {}
}

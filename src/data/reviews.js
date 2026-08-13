const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const endpoint = `${url}/rest/v1/reviews`
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }

export async function getPublicReviews() {
  const response = await fetch(`${endpoint}?select=id,reviewer_name,rating,comment,created_at&is_approved=eq.true&order=created_at.desc&limit=6`, { headers })
  if (!response.ok) throw new Error('Could not load reviews.')
  return response.json()
}

export async function submitReview({ name, rating, review }) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ reviewer_name: name.trim(), rating, comment: review.trim() }),
  })
  if (!response.ok) throw new Error('Could not submit your review. Please try again.')
}

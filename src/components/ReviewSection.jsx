import React, { useState } from 'react'
import { submitReview } from '../data/reviews.js'

export default function ReviewSection() {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
  const [status, setStatus] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    if (!rating || !name.trim() || !review.trim()) { setStatus('Please complete your name, rating and review.'); return }
    setStatus('Submitting your review…')
    try { await submitReview({ name, rating, review }); setRating(0); setName(''); setReview(''); setStatus('Thank you for sharing your experience.') }
    catch (error) { setStatus(error.message) }
  }
  return <section className="mx-auto max-w-xl px-5 pb-10 md:px-10"><div className="gold-border p-4 md:p-5" style={{ backgroundColor: 'var(--bg-elevated)' }}><p className="eyebrow mb-1">Your experience matters</p><h2 className="font-display text-xl sm:text-2xl">Rate and review our service</h2><p className="mt-1 text-xs text-muted">Share your experience with Gaba Wrist.</p><form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2"><div><label className="mb-1 block text-xs uppercase tracking-widest2 text-muted">Your rating</label><div className="flex gap-1">{[1,2,3,4,5].map((star) => <button key={star} type="button" onClick={() => setRating(star)} aria-label={`${star} stars`} className="text-xl" style={{ color: star <= rating ? 'var(--gold)' : 'var(--border)' }}>★</button>)}</div></div><div><label htmlFor="reviewer" className="mb-1 block text-xs uppercase tracking-widest2 text-muted">Your name</label><input id="reviewer" required value={name} onChange={(event) => setName(event.target.value)} className="w-full border bg-transparent px-3 py-1.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: 'var(--border)' }} /></div><div className="md:col-span-2"><label htmlFor="review" className="mb-1 block text-xs uppercase tracking-widest2 text-muted">Your review</label><textarea id="review" required rows="2" value={review} onChange={(event) => setReview(event.target.value)} className="w-full resize-none border bg-transparent px-3 py-1.5 text-sm outline-none focus:border-[var(--gold)]" style={{ borderColor: 'var(--border)' }} /></div><div><button className="btn-gold" type="submit">Submit review</button></div></form>{status && <p className="mt-3 text-xs text-muted" role="status">{status}</p>}</div></section>
}

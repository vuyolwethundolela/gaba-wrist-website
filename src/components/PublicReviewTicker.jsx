import React, { useEffect, useState } from 'react'
import { getPublicReviews } from '../data/reviews.js'

function ReviewCard({ review }) {
  return <article className="review-ticker-card"><p className="text-sm" style={{ color: 'var(--gold)' }}>{'★'.repeat(review.rating)}</p><p className="mt-1 text-xs text-muted">“{review.comment}”</p><p className="mt-1 text-xs">— {review.reviewer_name}</p></article>
}

export default function PublicReviewTicker() {
  const [reviews, setReviews] = useState([])
  useEffect(() => { getPublicReviews().then(setReviews).catch(() => setReviews([])) }, [])
  if (!reviews.length) return null
  return <section className="overflow-hidden border-y py-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated-2)' }} aria-label="Customer reviews"><p className="eyebrow mb-3 text-center">What customers say</p><div className="review-ticker"><div className="review-ticker-track">{reviews.map((review) => <ReviewCard key={review.id} review={review} />)}</div></div></section>
}

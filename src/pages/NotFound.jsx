import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl">Page Not Found</h1>
      <p className="mt-4 text-sm text-muted">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-gold mt-8">
        Back to Home
      </Link>
    </div>
  )
}

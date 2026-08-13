import React, { useEffect } from 'react'
import { useEnquiry } from '../context/EnquiryContext.jsx'
import { buildProductEmailHref } from '../data/business.js'

export default function ProductModal({ product, onClose }) {
  const { openEnquiry } = useEnquiry()

  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 animate-fade"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-3xl gold-border md:grid-cols-2"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border text-lg"
          style={{ borderColor: 'var(--border)', color: 'var(--gold)', backgroundColor: 'var(--bg)' }}
        >
          &times;
        </button>

        <div className="aspect-square w-full overflow-hidden">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center p-7 md:p-8">
          <p className="eyebrow mb-2">{product.category}</p>
          <h2 className="font-display text-3xl">{product.name}</h2>
          <p className="mt-1 text-xs text-muted">Reference: {product.reference}</p>
          <div className="gold-rule my-5" />
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={buildProductEmailHref([product])} className="btn-outline text-center">Email Us</a>
            <button type="button" onClick={() => openEnquiry(product)} className="btn-gold text-center">Enquire Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

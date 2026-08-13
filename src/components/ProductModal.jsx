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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-3 py-4 animate-fade sm:items-center sm:px-4 sm:py-8"
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
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center border text-base sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-lg"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--gold)',
            backgroundColor: 'var(--bg)',
          }}
        >
          &times;
        </button>

        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-5 sm:p-7 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="mb-5 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 sm:hidden"
            style={{ color: 'var(--gold)' }}
          >
            <span aria-hidden="true">←</span>
            Back to products
          </button>

          <p className="eyebrow mb-2">{product.category}</p>

          <h2 className="font-display text-2xl sm:text-3xl">
            {product.name}
          </h2>

          <p className="mt-1 text-xs text-muted">
            Reference: {product.reference}
          </p>

          <div className="gold-rule my-4 sm:my-5" />

          <p className="text-xs leading-relaxed text-muted sm:text-sm">
            {product.description}
          </p>

          <div className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-3">
            <a
              href={buildProductEmailHref([product])}
              className="btn-outline text-center text-xs"
            >
              Email Us
            </a>

            <button
              type="button"
              onClick={() => openEnquiry(product)}
              className="btn-gold text-center text-xs"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
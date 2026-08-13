import React from 'react'
import ProductCard from './ProductCard.jsx'
import { useEnquiry } from '../context/EnquiryContext.jsx'
import { buildProductEmailHref } from '../data/business.js'

export default function ProductGrid({ products, onView }) {
  const {
    selectedProducts,
    openSelectedEnquiry,
    removeSelectedProduct,
    clearSelectedProducts,
  } = useEnquiry()

  if (!products || products.length === 0) {
    return (
      <div className="gold-border flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-2xl">No products in this collection yet</p>
        <p className="mt-2 text-sm text-muted">
          Please check back soon, or enquire on WhatsApp for availability.
        </p>
      </div>
    )
  }

  return (
    <>
      {selectedProducts.length > 0 && (
        <div
          className="sticky top-20 z-30 mb-6 border px-3 py-3 sm:px-4 sm:py-4"
          style={{
            borderColor: 'var(--gold)',
            backgroundColor: 'var(--bg-elevated)',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs sm:text-sm">
              <span style={{ color: 'var(--gold)' }}>
                {selectedProducts.length}
              </span>{' '}
              item{selectedProducts.length > 1 ? 's' : ''} selected for enquiry
            </p>

            <button
              type="button"
              onClick={clearSelectedProducts}
              className="shrink-0 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
              style={{ color: 'var(--gold)' }}
              aria-label="Close selection and deselect all items"
            >
              × Close
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-1 border px-2 py-1 text-xs"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--bg)',
                }}
              >
                <span className="max-w-[120px] truncate sm:max-w-[180px]">
                  {product.name}
                </span>

                <button
                  type="button"
                  onClick={() => removeSelectedProduct(product.id)}
                  className="ml-1 text-sm leading-none transition-opacity hover:opacity-60"
                  style={{ color: 'var(--gold)' }}
                  aria-label={`Remove ${product.name} from selection`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <a
              href={buildProductEmailHref(selectedProducts)}
              className="btn-outline w-full text-center text-xs sm:w-auto"
            >
              Email selected
            </a>

            <button
              type="button"
              onClick={openSelectedEnquiry}
              className="btn-gold w-full text-center text-xs sm:w-auto"
            >
              Enquire about selected
            </button>
          </div>
        </div>
      )}

      <div className="product-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onView={onView} />
        ))}
      </div>
    </>
  )
}
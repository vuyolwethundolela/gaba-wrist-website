import React from 'react'
import { useEnquiry } from '../context/EnquiryContext.jsx'

// Pulls "Price: R..." out of the description so it can be shown as its own
// line on the card. The full, unmodified description is still what gets
// sent to WhatsApp — this is purely a display convenience.
function extractPrice(description) {
  const match = description.match(/Price:\s*R[\d,.]+/i)
  return match ? match[0] : null
}

export default function ProductCard({ product, onView }) {
  const { openEnquiry, selectedProducts, toggleProduct } = useEnquiry()
  const price = extractPrice(product.description)
  const isSelected = selectedProducts.some((item) => item.id === product.id)

  return (
    <div
      className="group product-card flex flex-col gold-border transition-shadow duration-500 hover:shadow-goldlg"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block aspect-square w-full overflow-hidden"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
        />

        <span
          className="absolute right-2 top-2 border px-1.5 py-0.5 text-[9px] tracking-widest2 sm:right-3 sm:top-3 sm:px-2 sm:py-1 sm:text-[10px]"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg)',
            color: 'var(--gold)',
          }}
        >
          {product.reference}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-lg leading-snug sm:text-xl">
          {product.name}
        </h3>

        <p className="mt-1.5 line-clamp-3 flex-1 text-xs text-muted sm:mt-2 sm:text-sm">
          {product.description}
        </p>

        {price && (
          <p
            className="mt-2 text-xs tracking-wide sm:mt-3 sm:text-sm"
            style={{ color: 'var(--gold)' }}
          >
            {price}
          </p>
        )}

        <button
          type="button"
          onClick={() => toggleProduct(product)}
          className="mt-3 w-full border px-2 py-1.5 text-[9px] uppercase tracking-widest2 transition-colors sm:mt-5 sm:px-3 sm:py-2 sm:text-[10px]"
          style={{
            borderColor: isSelected ? 'var(--gold)' : 'var(--border)',
            color: isSelected ? 'var(--gold)' : 'var(--text-muted)',
          }}
        >
          {isSelected ? 'Selected for enquiry ✓' : 'Add to enquiry'}
        </button>

        <div className="mt-1.5 flex gap-1.5 sm:mt-2 sm:gap-2">
          <button
            type="button"
            onClick={() => onView(product)}
            className="btn-outline flex-1 px-2 py-1.5 text-[9px] text-center sm:px-3 sm:py-2 sm:text-[10px]"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={() => openEnquiry(product)}
            className="btn-gold flex-1 px-2 py-1.5 text-[9px] text-center sm:px-3 sm:py-2 sm:text-[10px]"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  )
}
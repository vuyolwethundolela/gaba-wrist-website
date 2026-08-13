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
    <div className="group product-card flex flex-col gold-border transition-shadow duration-500 hover:shadow-goldlg" style={{ backgroundColor: 'var(--bg-elevated)' }}>
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
        <span className="absolute right-3 top-3 border px-2 py-1 text-[10px] tracking-widest2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--gold)' }}>
          {product.reference}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug">{product.name}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{product.description}</p>
        {price && <p className="mt-3 text-sm tracking-wide" style={{ color: 'var(--gold)' }}>{price}</p>}

        <button type="button" onClick={() => toggleProduct(product)} className="mt-5 w-full border px-3 py-2 text-[10px] uppercase tracking-widest2 transition-colors" style={{ borderColor: isSelected ? 'var(--gold)' : 'var(--border)', color: isSelected ? 'var(--gold)' : 'var(--text-muted)' }}>
          {isSelected ? 'Selected for enquiry ✓' : 'Add to enquiry'}
        </button>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={() => onView(product)} className="btn-outline flex-1 text-center">
            View Details
          </button>
          <button type="button" onClick={() => openEnquiry(product)} className="btn-gold flex-1 text-center">
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  )
}

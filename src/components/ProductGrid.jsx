import React from 'react'
import ProductCard from './ProductCard.jsx'
import { useEnquiry } from '../context/EnquiryContext.jsx'
import { buildProductEmailHref } from '../data/business.js'

export default function ProductGrid({ products, onView }) {
  const { selectedProducts, openSelectedEnquiry } = useEnquiry()
  if (!products || products.length === 0) {
    return (
      <div className="gold-border flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-2xl">No products in this collection yet</p>
        <p className="mt-2 text-sm text-muted">Please check back soon, or enquire on WhatsApp for availability.</p>
      </div>
    )
  }

  return (
    <>
      {selectedProducts.length > 0 && <div className="sticky top-20 z-30 mb-6 flex flex-col gap-3 border px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between" style={{ borderColor: 'var(--gold)', backgroundColor: 'var(--bg-elevated)' }}><p className="text-sm"><span style={{ color: 'var(--gold)' }}>{selectedProducts.length}</span> item{selectedProducts.length > 1 ? 's' : ''} selected for enquiry</p><div className="flex gap-2"><a href={buildProductEmailHref(selectedProducts)} className="btn-outline text-center">Email selected</a><button type="button" onClick={openSelectedEnquiry} className="btn-gold text-center">Enquire about selected</button></div></div>}
      <div className="product-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onView={onView} />
      ))}
      </div>
    </>
  )
}

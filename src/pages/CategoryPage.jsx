import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductsByCategory } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductModal from '../components/ProductModal.jsx'

export default function CategoryPage({ category, title, intro }) {
  const [viewProduct, setViewProduct] = useState(null)
  const navigate = useNavigate()
  const products = getProductsByCategory(category)

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-16 md:px-10 md:py-20">
      <button
        type="button"
        onClick={handleBack}
        className="mb-8 inline-flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 sm:hidden"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--gold)',
        }}
        aria-label="Go back to previous page"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>

      <div className="mb-10 max-w-2xl sm:mb-12">
        <p className="eyebrow mb-3">Collection</p>
        <h1 className="font-display text-3xl sm:text-5xl">{title}</h1>
        <div className="gold-rule my-5 w-24" />
        <p className="text-sm leading-relaxed text-muted">{intro}</p>
      </div>

      <ProductGrid products={products} onView={setViewProduct} />

      <ProductModal
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />
    </div>
  )
}
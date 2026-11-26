import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'
import { useProductsByCategory } from '../data/useProducts.js'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductModal from '../components/ProductModal.jsx'

const TABS = [
  { key: 'men', label: "Men's Fragrance", category: CATEGORIES.FRAGRANCE_MEN },
  { key: 'women', label: "Women's Fragrance", category: CATEGORIES.FRAGRANCE_WOMEN },
]

export default function Fragrance() {
  const navigate = useNavigate()
  const [viewProduct, setViewProduct] = useState(null)
  const [chosen, setChosen] = useState(null)
  const menProducts = useProductsByCategory(CATEGORIES.FRAGRANCE_MEN)
  const womenProducts = useProductsByCategory(CATEGORIES.FRAGRANCE_WOMEN)

  // Until the visitor picks a tab, open the one that has items (Men's if both or neither do).
  const active = chosen ?? (menProducts.length === 0 && womenProducts.length > 0 ? 'women' : 'men')
  const products = active === 'men' ? menProducts : womenProducts

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-16 md:px-10 md:py-20">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 sm:hidden"
        style={{ borderColor: 'var(--border)', color: 'var(--gold)' }}
        aria-label="Go back to previous page"
      >
        <span aria-hidden="true">←</span>
        Back
      </button>

      <div className="mb-8 max-w-2xl sm:mb-10">
        <p className="eyebrow mb-3">Collection</p>
        <h1 className="font-display text-3xl sm:text-5xl">Fragrance</h1>
        <div className="gold-rule my-5 w-24" />
        <p className="text-sm leading-relaxed text-muted">
          Signature scents for him and for her — from fresh daytime notes to deeper evening fragrances.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3" role="tablist" aria-label="Fragrance sections">
        {TABS.map((tab) => {
          const isActive = tab.key === active
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setChosen(tab.key)}
              className="border px-4 py-3 text-xs uppercase tracking-widest transition-opacity hover:opacity-80"
              style={{
                borderColor: isActive ? 'var(--gold)' : 'var(--border)',
                color: isActive ? 'var(--gold)' : 'inherit',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <ProductGrid products={products} onView={setViewProduct} />

      <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} />
    </div>
  )
}

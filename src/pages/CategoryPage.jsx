import React, { useState } from 'react'
import { getProductsByCategory } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductModal from '../components/ProductModal.jsx'

export default function CategoryPage({ category, title, intro }) {
  const [viewProduct, setViewProduct] = useState(null)
  const products = getProductsByCategory(category)

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-3">Collection</p>
        <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
        <div className="gold-rule my-5 w-24" />
        <p className="text-sm leading-relaxed text-muted">{intro}</p>
      </div>

      <ProductGrid products={products} onView={setViewProduct} />

      <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} />
    </div>
  )
}

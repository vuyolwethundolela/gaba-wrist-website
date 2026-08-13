import React from 'react'
import CategoryPage from './CategoryPage.jsx'
import { CATEGORIES } from '../data/products.js'

export default function UnisexWatches() {
  return (
    <CategoryPage
      category={CATEGORIES.UNISEX}
      title="Unisex Watches"
      intro="Versatile, minimal timepieces designed to move seamlessly with any lifestyle and pair effortlessly with any wardrobe."
    />
  )
}

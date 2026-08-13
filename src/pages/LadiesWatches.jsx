import React from 'react'
import CategoryPage from './CategoryPage.jsx'
import { CATEGORIES } from '../data/products.js'

export default function LadiesWatches() {
  return (
    <CategoryPage
      category={CATEGORIES.LADIES}
      title="Ladies' Watches"
      intro="Elegant, refined designs that bring effortless sophistication to everyday wear and special occasions alike."
    />
  )
}

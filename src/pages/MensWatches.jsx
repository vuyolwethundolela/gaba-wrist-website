import React from 'react'
import CategoryPage from './CategoryPage.jsx'
import { CATEGORIES } from '../data/products.js'

export default function MensWatches() {
  return (
    <CategoryPage
      category={CATEGORIES.MENS}
      title="Men's Watches"
      intro="Refined timepieces designed for confidence and presence — from classic gold to executive black, each piece is built for formal and everyday wear alike."
    />
  )
}

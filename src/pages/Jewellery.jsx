import React from 'react'
import CategoryPage from './CategoryPage.jsx'
import { CATEGORIES } from '../data/products.js'

export default function Jewellery() {
  return (
    <CategoryPage
      category={CATEGORIES.JEWELLERY}
      title="Jewellery"
      intro="Fine gold-tone pieces — bracelets, necklaces, rings and sets — thoughtfully designed to complement your personal style."
    />
  )
}

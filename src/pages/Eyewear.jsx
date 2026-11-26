import React from 'react'
import CategoryPage from './CategoryPage.jsx'
import { CATEGORIES } from '../data/products.js'

export default function Eyewear() {
  return (
    <CategoryPage
      category={CATEGORIES.EYEWEAR}
      title="Eyewear"
      intro="Sunglasses and frames selected to sharpen your look — comfortable, stylish and ready for everyday wear."
    />
  )
}

import { useEffect, useState } from 'react'
import { products as staticProducts } from './products.js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const toProduct = (row) => ({
  id: row.id,
  reference: row.id,
  name: row.name,
  category: row.category,
  description: `${row.description} Price: R${row.price}.`,
  image: row.image_url,
})

let cache = null
let pending = null

export function clearProductsCache() {
  cache = null
  pending = null
}

export function fetchDatabaseProducts() {
  if (cache) return Promise.resolve(cache)
  if (!pending) {
    pending = fetch(
      `${url}/rest/v1/products?select=id,name,category,description,price,image_url&is_active=eq.true&order=created_at.asc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )
      .then((response) => (response.ok ? response.json() : []))
      .then((rows) => (cache = rows.map(toProduct)))
      .catch(() => (cache = []))
  }
  return pending
}

export function useProducts() {
  const [extra, setExtra] = useState(cache || [])
  useEffect(() => {
    let alive = true
    fetchDatabaseProducts().then((items) => {
      if (alive) setExtra(items)
    })
    return () => {
      alive = false
    }
  }, [])
  return [...staticProducts, ...extra]
}

export function useProductsByCategory(category) {
  return useProducts().filter((product) => product.category === category)
}

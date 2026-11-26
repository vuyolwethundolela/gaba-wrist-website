import React from 'react'
import { Link } from 'react-router-dom'
import { getProductByReference, CATEGORIES } from '../data/products.js'
import { useProducts } from '../data/useProducts.js'

const COLLECTIONS = [
  {
    title: "Men's Watches",
    desc: 'Refined timepieces built for presence, precision and everyday confidence.',
    image: getProductByReference('GW-M004').image,
    to: '/mens-watches',
    category: CATEGORIES.MENS,
  },
  {
    title: "Ladies' Watches",
    desc: 'Elegant designs that bring effortless sophistication to every occasion.',
    image: getProductByReference('GW-L002').image,
    to: '/ladies-watches',
    category: CATEGORIES.LADIES,
  },
  {
    title: 'Unisex Watches',
    desc: 'Versatile, minimal pieces designed to move seamlessly with your lifestyle.',
    image: getProductByReference('GW-U001').image,
    to: '/unisex-watches',
    category: CATEGORIES.UNISEX,
  },
  {
    title: 'Jewellery',
    desc: 'Fine gold-tone pieces to complement your personal style and story.',
    image: getProductByReference('GW-J001').image,
    to: '/jewellery',
    category: CATEGORIES.JEWELLERY,
  },
  {
    title: 'Eyewear',
    desc: 'Sunglasses and frames chosen to sharpen your look and protect your eyes in style.',
    image: getProductByReference('GW-E004').image,
    to: '/eyewear',
    category: CATEGORIES.EYEWEAR,
  },
  {
    title: 'Fragrance',
    desc: 'Signature scents for him and for her, from fresh daytime notes to evening depth.',
    image: getProductByReference('GW-FM002').image,
    to: '/fragrance',
    category: [CATEGORIES.FRAGRANCE_MEN, CATEGORIES.FRAGRANCE_WOMEN],
  },
]

export default function CategorySection() {
  const allProducts = useProducts()
  const isEmpty = (category) => {
    const list = Array.isArray(category) ? category : [category]
    return !allProducts.some((product) => list.includes(product.category))
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">The Collection</p>
        <h2 className="font-display text-3xl sm:text-4xl">Shop by Category</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c, i) => (
          <Link
            to={c.to}
            key={c.title}
            className="group animate-rise relative block overflow-hidden gold-border"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-110"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.85) 100%)' }}
              />
            </div>
            {isEmpty(c.category) && (
              <span
                className="absolute right-3 top-3 border px-2 py-1 text-[10px] uppercase tracking-widest2"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--gold)' }}
              >
                Coming soon
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-2xl text-white">{c.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/75">{c.desc}</p>
              <span className="mt-4 inline-block text-[11px] tracking-widest2 text-[#e4c682] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                VIEW COLLECTION →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

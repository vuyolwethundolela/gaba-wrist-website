import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'

const CATEGORY_LINKS = {
  "Men's Watches": '/mens-watches',
  "Ladies' Watches": '/ladies-watches',
  'Unisex Watches': '/unisex-watches',
  Jewellery: '/jewellery',
}
const INTERVAL = 5000
const FEATURED_REFERENCES = [
  'GW-M004', 'GW-M005',
  'GW-L002', 'GW-L005',
  'GW-U001', 'GW-U003',
  'GW-J005', 'GW-J006',
]
const SLIDES = FEATURED_REFERENCES.map((reference) => products.find((product) => product.reference === reference)).filter(Boolean)

export default function HeroSlider() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * SLIDES.length))
  const timer = useRef(null)
  const showRandomSlide = () => setIndex((current) => {
    if (SLIDES.length < 2) return current
    let next = current
    while (next === current) next = Math.floor(Math.random() * SLIDES.length)
    return next
  })

  useEffect(() => {
    timer.current = setInterval(showRandomSlide, INTERVAL)
    return () => clearInterval(timer.current)
  }, [])

  const slide = SLIDES[index]
  return <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
    {SLIDES.map((product, productIndex) => <React.Fragment key={product.id}><div className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-35 transition-opacity duration-[1600ms]" style={{ backgroundImage: `url(${product.image})`, opacity: productIndex === index ? 0.35 : 0 }} /><img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-contain p-6 md:p-10 transition-opacity duration-[1600ms] ease-in-out" style={{ opacity: productIndex === index ? 1 : 0 }} /></React.Fragment>)}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg) 30%, transparent) 0%, color-mix(in srgb, var(--bg) 10%, transparent) 45%, color-mix(in srgb, var(--bg) 65%, transparent) 100%)' }} />
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow animate-fade mb-5 text-[#e4c682]">{slide.category}</p>
      <h1 className="font-display animate-fade text-5xl tracking-[0.05em] text-white sm:text-6xl md:text-7xl">GABA WRIST</h1>
      <p className="animate-fade mt-5 max-w-md text-sm tracking-[0.2em] text-white/85 sm:text-base">LUXURY STYLE WITHIN REACH</p>
      <Link to={CATEGORY_LINKS[slide.category]} className="btn-gold animate-fade mt-10" style={{ animationDelay: '0.2s' }}>Explore Collection</Link>
    </div>
    <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      {SLIDES.map((product, productIndex) => <button key={product.id} aria-label={`Show ${product.name}`} onClick={() => setIndex(productIndex)} className="h-1.5 transition-all duration-500" style={{ width: productIndex === index ? '28px' : '10px', backgroundColor: productIndex === index ? '#e4c682' : 'rgba(255,255,255,0.4)' }} />)}
    </div>
  </section>
}

import React from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import CategorySection from '../components/CategorySection.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'

export default function Home() {
  return (
    <div>
      <HeroSlider />

      <CategorySection />

      <section className="mx-auto max-w-5xl px-5 py-20 text-center md:px-10">
        <p className="eyebrow mb-3">The Gaba Wrist Promise</p>
        <h2 className="font-display text-3xl sm:text-4xl">Browse. Enquire. It's That Simple.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted">
          Every piece in our collection is shown with its full description and price — no guesswork, no waiting
          for a reply. Choose what you love and enquire directly on WhatsApp in seconds.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/mens-watches" className="btn-gold">
            Explore Collection
          </Link>
          <WhatsAppButton label="Chat With Us" />
        </div>
      </section>
    </div>
  )
}

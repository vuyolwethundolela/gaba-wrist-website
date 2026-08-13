import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
      <p className="eyebrow mb-3 text-center">Our Story</p>
      <h1 className="font-display text-center text-4xl sm:text-5xl">About Gaba Wrist</h1>
      <div className="gold-rule mx-auto my-8 w-24" />

      <div className="space-y-6 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          Gaba Wrist is a contemporary watch and jewellery brand focused on bringing timeless style, elegance and
          personal expression to every customer.
        </p>
        <p>
          Our collection brings together men's watches, ladies' watches, unisex watches and jewellery, giving
          customers the freedom to find pieces that complement their individual style and occasion.
        </p>
        <p>
          At Gaba Wrist, we believe that the right accessory is more than simply something you wear — it is part
          of how you present yourself.
        </p>
        <p>
          Whether you are looking for a sophisticated everyday watch, a statement piece for a special occasion or
          jewellery to complement your style, Gaba Wrist aims to make the selection process simple, personal and
          convenient.
        </p>
        <p>
          Customers can browse the collection online, select an item they are interested in and enquire directly
          through WhatsApp. This allows the Gaba Wrist team to assist customers with product information,
          availability and collection or delivery arrangements.
        </p>
      </div>

      <div className="gold-rule my-10" />

      <p className="text-center font-display text-2xl" style={{ color: 'var(--gold)' }}>
        Gaba Wrist — LUXURY STYLE WITHIN REACH
      </p>

      <div className="mt-10 text-center">
        <Link to="/contact" className="btn-outline">
          Get In Touch
        </Link>
      </div>
    </div>
  )
}

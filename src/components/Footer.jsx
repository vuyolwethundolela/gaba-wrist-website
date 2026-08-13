import React from 'react'
import { Link } from 'react-router-dom'
import { business, mailtoHref } from '../data/business.js'
import SocialIcons from './SocialIcons.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/mens-watches', label: "Men's Watches" },
  { to: '/ladies-watches', label: "Ladies' Watches" },
  { to: '/unisex-watches', label: 'Unisex Watches' },
  { to: '/jewellery', label: 'Jewellery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-10 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl tracking-[0.12em]" style={{ color: 'var(--gold)' }}>
            GABA <span style={{ color: 'var(--text)' }}>WRIST</span>
          </span>
          <p className="mt-3 text-sm italic text-muted">{business.tagline}</p>
          <div className="mt-6">
            <SocialIcons />
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-muted transition-colors hover:text-[var(--gold)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Contact</h4>
          <p className="text-sm">{business.owner}</p>
          <WhatsAppButton label={`WhatsApp: ${business.whatsappDisplay}`} className="mt-2 !p-0 !text-left !normal-case !tracking-normal bg-transparent hover:bg-transparent" />
          <a href={mailtoHref} className="mt-2 block text-sm text-muted transition-colors hover:text-[var(--gold)]">
            {business.email}
          </a>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Enquire</h4>
          <p className="text-sm text-muted">
            Browse the collection, choose a piece and enquire directly on WhatsApp — our team will assist with
            availability, collection and delivery.
          </p>
          <WhatsAppButton label="Chat With Us" className="mt-5" />
        </div>
      </div>

      <div className="gold-rule" />

      <div className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-muted md:px-10">
        &copy; {new Date().getFullYear()} Gaba Wrist. All rights reserved. Created by{' '}
        <a href="https://wa.me/27658938239?text=I%20am%20interested%20in%20having%20a%20website%20created%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">Quandro NaniTeck</a>.
      </div>
    </footer>
  )
}

import React from 'react'
import { business, mailtoHref } from '../data/business.js'
import SocialIcons from '../components/SocialIcons.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-10 md:py-24">
      <p className="eyebrow mb-3 text-center">Get In Touch</p>
      <h1 className="font-display text-center text-4xl sm:text-5xl">Contact Us</h1>
      <div className="gold-rule mx-auto my-8 w-24" />

      <div className="grid gap-10 gold-border p-8 md:grid-cols-2 md:p-12" style={{ backgroundColor: 'var(--bg-elevated)' }}>
        <div>
          <h2 className="font-display text-2xl" style={{ color: 'var(--gold)' }}>
            Gaba Wrist
          </h2>
          <p className="mt-2 text-sm text-muted">Owner: {business.owner}</p>

          <div className="mt-8 space-y-5">
            <div>
              <p className="eyebrow mb-1">Email</p>
              <a href={mailtoHref} className="text-sm transition-colors hover:text-[var(--gold)]">
                {business.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-1">WhatsApp</p>
              <WhatsAppButton label={business.whatsappDisplay} className="!p-0 !text-left !normal-case !tracking-normal bg-transparent hover:bg-transparent" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={mailtoHref} className="btn-outline text-center">
              Email Us
            </a>
            <WhatsAppButton label="Chat With Gaba Wrist on WhatsApp" className="text-center" />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="eyebrow mb-4">Follow Us</p>
            <SocialIcons />
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted md:mt-0">
            Browse the collection, choose the piece you love and enquire directly on WhatsApp — we'll get back to
            you with everything you need to know, including collection and delivery options.
          </p>
        </div>
      </div>
    </div>
  )
}

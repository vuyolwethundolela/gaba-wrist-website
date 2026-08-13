import React from 'react'
import { business } from '../data/business.js'
import { useEnquiry } from '../context/EnquiryContext.jsx'

const ICON_PROPS = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' }

const SOCIALS = [
  {
    label: 'Facebook',
    href: business.facebook,
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M13.5 21v-7.5h2.4l.4-2.8h-2.8V8.9c0-.8.2-1.4 1.4-1.4h1.5V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8h2.5V21h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: business.instagram,
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 2.2c2.7 0 3 0 4.1.06 1 .05 1.6.2 2 .35.5.19.9.42 1.3.82.4.4.63.8.82 1.3.15.4.3 1 .35 2 .05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1-.2 1.6-.35 2-.19.5-.42.9-.82 1.3-.4.4-.8.63-1.3.82-.4.15-1 .3-2 .35-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1-.05-1.6-.2-2-.35a3.5 3.5 0 0 1-1.3-.82 3.5 3.5 0 0 1-.82-1.3c-.15-.4-.3-1-.35-2-.05-1.1-.06-1.4-.06-4.1s0-3 .06-4.1c.05-1 .2-1.6.35-2 .19-.5.42-.9.82-1.3.4-.4.8-.63 1.3-.82.4-.15 1-.3 2-.35C9 2.2 9.3 2.2 12 2.2Zm0 1.8c-2.6 0-2.9 0-4 .06-.9.04-1.3.17-1.6.28-.4.16-.7.34-1 .64-.3.3-.48.6-.64 1-.11.3-.24.7-.28 1.6C4.4 8.6 4.4 8.9 4.4 11.5s0 2.9.06 4c.04.9.17 1.3.28 1.6.16.4.34.7.64 1 .3.3.6.48 1 .64.3.11.7.24 1.6.28 1.1.06 1.4.06 4 .06s2.9 0 4-.06c.9-.04 1.3-.17 1.6-.28.4-.16.7-.34 1-.64.3-.3.48-.6.64-1 .11-.3.24-.7.28-1.6.06-1.1.06-1.4.06-4s0-2.9-.06-4c-.04-.9-.17-1.3-.28-1.6a2.6 2.6 0 0 0-.64-1 2.6 2.6 0 0 0-1-.64c-.3-.11-.7-.24-1.6-.28-1.1-.06-1.4-.06-4-.06Zm0 3.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm0 1.8a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm4.4-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: business.tiktok,
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M15.8 2h-2.6v13.3a2.6 2.6 0 1 1-2.1-2.55v-2.66a5.27 5.27 0 1 0 4.7 5.24V9.1a6.8 6.8 0 0 0 3.9 1.24V7.7a4.2 4.2 0 0 1-3.9-4.13V2Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    isWhatsApp: true,
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.84 11.84 0 0 0 5.64 1.44h.01c6.54 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.14-3.38-8.43ZM12.05 21.5h-.01a9.7 9.7 0 0 1-4.95-1.36l-.35-.21-3.8 1 1.02-3.7-.23-.38a9.63 9.63 0 0 1-1.48-5.15c0-5.35 4.35-9.7 9.7-9.7 2.59 0 5.02 1.01 6.85 2.85a9.62 9.62 0 0 1 2.84 6.86c0 5.35-4.35 9.7-9.6 9.7Z" />
      </svg>
    ),
  },
]

export default function SocialIcons({ className = '' }) {
  const { openGeneralEnquiry } = useEnquiry()
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.isWhatsApp ? '#' : s.href}
          target={s.isWhatsApp ? undefined : '_blank'}
          rel={s.isWhatsApp ? undefined : 'noopener noreferrer'}
          aria-label={s.label}
          className="flex h-10 w-10 items-center justify-center border transition-all duration-300 hover:-translate-y-0.5"
          style={{ borderColor: 'var(--border)', color: 'var(--gold)' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          onClick={(event) => { if (s.isWhatsApp) { event.preventDefault(); openGeneralEnquiry() } }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}

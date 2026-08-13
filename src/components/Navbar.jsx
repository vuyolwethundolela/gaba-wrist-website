import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/mens-watches', label: "Men's Watches" },
  { to: '/ladies-watches', label: "Ladies' Watches" },
  { to: '/unisex-watches', label: 'Unisex Watches' },
  { to: '/jewellery', label: 'Jewellery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  const linkClass = ({ isActive }) =>
    `eyebrow transition-colors duration-300 hover:text-[var(--gold-bright,#e4c682)] ${
      isActive ? 'text-[var(--gold)]' : 'text-muted'
    }`

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'shadow-lg backdrop-blur' : ''}`}
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 92%, transparent)' : 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <NavLink to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.12em]" style={{ color: 'var(--gold)' }}>
            GABA <span style={{ color: 'var(--text)' }}>WRIST</span>
          </span>
          <span className="hidden text-[9px] tracking-widest2 text-muted md:block">
            LUXURY STYLE WITHIN REACH
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className="block h-px w-6 transition-transform duration-300"
              style={{ backgroundColor: 'var(--gold)', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block h-px w-6 transition-opacity duration-300"
              style={{ backgroundColor: 'var(--gold)', opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-px w-6 transition-transform duration-300"
              style={{ backgroundColor: 'var(--gold)', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-lux lg:hidden ${open ? 'max-h-[520px]' : 'max-h-0'}`}
        style={{ borderTop: open ? '1px solid var(--border)' : 'none' }}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-b py-3 text-sm tracking-widest2 uppercase ${isActive ? 'text-[var(--gold)]' : 'text-muted'}`
              }
              style={{ borderColor: 'var(--border)' }}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex items-center justify-between pt-4">
            <span className="eyebrow">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

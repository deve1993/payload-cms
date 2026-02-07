'use client'

import React, { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/progetti', label: 'Progetti' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/contatti', label: 'Contatti' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="header-logo">
          <img src="/logo-white.png" alt="Pixarts" />
        </a>

        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="/contatti" className="btn btn-primary">
            Contattaci
          </a>
        </nav>

        <button
          className={`mobile-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/contatti"
          className="btn btn-primary"
          onClick={() => setMenuOpen(false)}
        >
          Contattaci
        </a>
      </nav>
    </header>
  )
}

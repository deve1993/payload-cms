import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

// Componente Logo Pixarts - Design corretto con lettere sottili
const PixartsLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 350 80"
    width="320"
    height="73"
    style={{ display: 'block' }}
  >
    <defs>
      {/* Gradient per la X */}
      <linearGradient id="x-gradient-home" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF6B2C', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FFB347', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* P - linea verticale con arco */}
    <path d="M10 10 L10 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M10 10 L10 10 Q35 10 35 25 Q35 40 10 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* I - linea verticale con puntino */}
    <circle cx="55" cy="14" r="3" fill="white"/>
    <path d="M55 24 L55 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* X - con gradient arancione */}
    <path d="M75 10 L110 70" stroke="url(#x-gradient-home)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M110 10 L75 70" stroke="url(#x-gradient-home)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

    {/* A - triangolo senza barra orizzontale */}
    <path d="M130 70 L155 10 L180 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

    {/* R - linea verticale con arco e gamba */}
    <path d="M200 10 L200 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M200 10 Q225 10 225 25 Q225 40 200 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M210 40 L230 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* T - linea verticale con barra superiore */}
    <path d="M250 10 L290 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M270 10 L270 70" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* S - curva serpentina */}
    <path d="M310 18 Q310 10 325 10 Q340 10 340 22 Q340 34 325 38 Q310 42 310 54 Q310 70 325 70 Q340 70 340 62" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
)

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        <PixartsLogo />
        {!user && <h1>Benvenuto in Pixarts CMS</h1>}
        {user && <h1>Bentornato, {user.email}</h1>}
        <p className="subtitle">Sistema di gestione contenuti multi-tenant</p>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes?.admin || '/admin'}
            rel="noopener noreferrer"
          >
            Pannello Admin
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentazione
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Powered by Pixarts &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

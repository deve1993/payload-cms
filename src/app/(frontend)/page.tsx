import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        <img
          src="/logo-white.png"
          alt="Pixarts"
          style={{
            display: 'block',
            width: '320px',
            height: 'auto',
            marginBottom: '20px',
          }}
        />
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

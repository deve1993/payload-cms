import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export const metadata = {
  title: 'Servizi',
  description: 'Scopri tutti i servizi digitali di Pixarts: web design, sviluppo, e-commerce e marketing digitale.',
}

export default async function ServiziPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const servicesData = await payload
    .find({ collection: 'services', limit: 50, sort: 'order' })
    .catch(() => ({ docs: [] }))

  const services = servicesData.docs

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <span>Servizi</span>
          </div>
          <h1>I Nostri <span className="gradient-text">Servizi</span></h1>
          <p>
            Soluzioni digitali complete per far crescere il tuo business online e offline.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {services.length > 0 ? (
            <div className="grid grid-3">
              {services.map((service: any) => (
                <a key={service.id} href={`/servizi/${service.slug}`} className="card service-card">
                  {service.image && typeof service.image === 'object' && service.image.url && (
                    <img
                      className="card-image"
                      src={service.image.url}
                      alt={service.title || ''}
                      loading="lazy"
                    />
                  )}
                  <div className="card-body">
                    {service.icon && <div className="card-icon">{service.icon}</div>}
                    <h3 className="card-title">{service.title}</h3>
                    {service.excerpt && <p className="card-text">{service.excerpt}</p>}
                    {service.pricing?.showPrice && service.pricing.price && (
                      <div className="card-meta">
                        <span className="card-tag">{service.pricing.price}</span>
                        {service.pricing.priceDescription && (
                          <span>{service.pricing.priceDescription}</span>
                        )}
                      </div>
                    )}
                    <span className="card-link">
                      Scopri di pi&ugrave;
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3>Servizi in aggiornamento</h3>
              <p>Stiamo aggiornando la nostra lista dei servizi. Torna presto!</p>
            </div>
          )}
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2>Hai bisogno di un <span className="gradient-text">servizio personalizzato</span>?</h2>
          <p>Contattaci per discutere le tue esigenze specifiche.</p>
          <a href="/contatti" className="btn btn-primary">Richiedi Info</a>
        </div>
      </section>
    </>
  )
}

import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@/payload.config'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function ServiceDetailPage({ params }: Args) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const services = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const service = services.docs[0] as any

  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero Image */}
      <div className="detail-hero">
        {service.image && typeof service.image === 'object' && service.image.url ? (
          <img
            className="detail-hero-image"
            src={service.image.url}
            alt={service.title || ''}
          />
        ) : (
          <div
            className="detail-hero-image"
            style={{ background: 'linear-gradient(135deg, #111, #1a1a1a)' }}
          />
        )}
      </div>

      <section className="section">
        <div className="container">
          <div className="breadcrumb" style={{ justifyContent: 'flex-start', marginBottom: '32px' }}>
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/servizi">Servizi</a>
            <span className="breadcrumb-separator">/</span>
            <span>{service.title}</span>
          </div>

          <h1 style={{ marginBottom: '16px' }}>{service.title}</h1>
          {service.excerpt && (
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', lineHeight: '1.7', marginBottom: '32px' }}>
              {service.excerpt}
            </p>
          )}

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Caratteristiche</h2>
              <div className="grid grid-2">
                {service.features.map((feature: any, i: number) => (
                  <div key={i} className="card" style={{ padding: '24px' }}>
                    <h3 className="card-title">{feature.title}</h3>
                    {feature.description && <p className="card-text">{feature.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {service.gallery && service.gallery.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Galleria</h2>
              <div className="detail-gallery">
                {service.gallery.map((item: any, i: number) => (
                  <div key={i}>
                    {item.image && typeof item.image === 'object' && item.image.url && (
                      <img src={item.image.url} alt={item.caption || ''} loading="lazy" />
                    )}
                    {item.caption && (
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          {service.pricing?.showPrice && service.pricing.price && (
            <div className="card" style={{ padding: '32px', marginTop: '48px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Prezzo</h2>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#FF6B2C' }}>
                {service.pricing.price}
              </div>
              {service.pricing.priceDescription && (
                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  {service.pricing.priceDescription}
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a
              href={service.cta?.link || '/contatti'}
              className="btn btn-primary"
            >
              {service.cta?.text || 'Richiedi Info'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })

  return services.docs.map((service) => ({
    slug: service.slug,
  }))
}

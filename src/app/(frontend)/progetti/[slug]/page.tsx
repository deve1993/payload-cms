import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@/payload.config'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: Args) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projects = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = projects.docs[0] as any

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Hero Image */}
      <div className="detail-hero">
        {project.featuredImage && typeof project.featuredImage === 'object' && project.featuredImage.url ? (
          <img
            className="detail-hero-image"
            src={project.featuredImage.url}
            alt={project.title || ''}
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
            <a href="/progetti">Progetti</a>
            <span className="breadcrumb-separator">/</span>
            <span>{project.title}</span>
          </div>

          <div className="card-meta" style={{ marginBottom: '16px' }}>
            {project.category && <span className="card-tag">{project.category}</span>}
            {project.year && <span className="card-tag">{project.year}</span>}
            {project.client && <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Cliente: {project.client}</span>}
          </div>

          <h1 style={{ marginBottom: '16px' }}>{project.title}</h1>
          {project.excerpt && (
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', lineHeight: '1.7', marginBottom: '32px' }}>
              {project.excerpt}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {project.tags.map((tagItem: any, i: number) => (
                <span key={i} className="card-tag">{tagItem.tag}</span>
              ))}
            </div>
          )}

          {/* Project Info Sidebar */}
          <div className="detail-meta" style={{ marginBottom: '32px' }}>
            {project.client && (
              <div className="detail-meta-item">
                <span className="detail-meta-label">Cliente</span>
                <span className="detail-meta-value">{project.client}</span>
              </div>
            )}
            {project.category && (
              <div className="detail-meta-item">
                <span className="detail-meta-label">Categoria</span>
                <span className="detail-meta-value">{project.category}</span>
              </div>
            )}
            {project.year && (
              <div className="detail-meta-item">
                <span className="detail-meta-label">Anno</span>
                <span className="detail-meta-value">{project.year}</span>
              </div>
            )}
            {project.duration && (
              <div className="detail-meta-item">
                <span className="detail-meta-label">Durata</span>
                <span className="detail-meta-value">{project.duration}</span>
              </div>
            )}
          </div>

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Risultati</h2>
              <div className="stats-grid">
                {project.results.map((result: any, i: number) => (
                  <div key={i} className="stat-item">
                    <div className="stat-value">{result.metric}</div>
                    <div className="stat-label">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Galleria</h2>
              <div className="detail-gallery">
                {project.gallery.map((item: any, i: number) => (
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

          {/* Testimonial */}
          {project.testimonial?.enabled && project.testimonial.quote && (
            <div className="card testimonial-card" style={{ marginBottom: '48px' }}>
              <p className="testimonial-quote">{project.testimonial.quote}</p>
              <div className="testimonial-author">
                <div>
                  {project.testimonial.author && (
                    <div className="testimonial-name">{project.testimonial.author}</div>
                  )}
                  {project.testimonial.role && (
                    <div className="testimonial-role">{project.testimonial.role}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* External Link */}
          <div style={{ textAlign: 'center', marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {project.link?.enabled && project.link.url && (
              <a
                href={project.link.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.link.text || 'Visita il sito'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <a href="/contatti" className="btn btn-outline">
              Richiedi un progetto simile
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

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  return projects.docs.map((project) => ({
    slug: project.slug,
  }))
}

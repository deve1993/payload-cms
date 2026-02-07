import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export const metadata = {
  title: 'Progetti',
  description: 'Esplora il portfolio dei nostri progetti: siti web, app, e-commerce e soluzioni digitali.',
}

export default async function ProgettiPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projectsData = await payload
    .find({ collection: 'projects', limit: 50, sort: '-createdAt' })
    .catch(() => ({ docs: [] }))

  const projects = projectsData.docs

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <span>Progetti</span>
          </div>
          <h1>I Nostri <span className="gradient-text">Progetti</span></h1>
          <p>
            Lavori realizzati con passione e dedizione per clienti in diversi settori.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {projects.length > 0 ? (
            <div className="grid grid-2">
              {projects.map((project: any) => (
                <a key={project.id} href={`/progetti/${project.slug}`} className="card project-card">
                  {project.featuredImage && typeof project.featuredImage === 'object' && project.featuredImage.url && (
                    <img
                      className="card-image"
                      src={project.featuredImage.url}
                      alt={project.title || ''}
                      loading="lazy"
                    />
                  )}
                  <div className="card-body">
                    <div className="card-meta">
                      {project.category && <span className="card-tag">{project.category}</span>}
                      {project.year && <span>{project.year}</span>}
                      {project.client && <span>{project.client}</span>}
                    </div>
                    <h3 className="card-title">{project.title}</h3>
                    {project.excerpt && <p className="card-text">{project.excerpt}</p>}
                    {project.tags && project.tags.length > 0 && (
                      <div className="card-meta" style={{ flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                        {project.tags.map((tagItem: any, i: number) => (
                          <span key={i} className="card-tag">{tagItem.tag}</span>
                        ))}
                      </div>
                    )}
                    <span className="card-link">
                      Vedi Dettagli
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
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M7 2v20M2 12h20M2 7h5M2 17h5" />
                </svg>
              </div>
              <h3>Portfolio in costruzione</h3>
              <p>Stiamo preparando il nostro portfolio. Torna presto!</p>
            </div>
          )}
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2>Vuoi un progetto <span className="gradient-text">come questi</span>?</h2>
          <p>Raccontaci la tua idea e la trasformeremo in realt&agrave;.</p>
          <a href="/contatti" className="btn btn-primary">Inizia Ora</a>
        </div>
      </section>
    </>
  )
}

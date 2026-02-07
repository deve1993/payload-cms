import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [servicesData, projectsData, testimonialsData, statsData] = await Promise.all([
    payload.find({ collection: 'services', limit: 6, sort: 'order' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'projects', limit: 4, sort: '-createdAt' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'testimonials', limit: 3 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'stats', limit: 4, sort: 'order' }).catch(() => ({ docs: [] })),
  ])

  const services = servicesData.docs
  const projects = projectsData.docs
  const testimonials = testimonialsData.docs
  const stats = statsData.docs

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Soluzioni Digitali</div>
            <h1>
              Trasformiamo le tue <span className="gradient-text">idee in realt&agrave; digitali</span>
            </h1>
            <p>
              Progettiamo e sviluppiamo esperienze digitali che fanno crescere il tuo business.
              Siti web, e-commerce, app e strategie di marketing su misura.
            </p>
            <div className="hero-actions">
              <a href="/contatti" className="btn btn-primary">
                Inizia un Progetto
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="/progetti" className="btn btn-outline">
                Vedi i Progetti
              </a>
            </div>
          </div>
          {stats.length > 0 && (
            <div className="hero-stats">
              {stats.map((stat: any) => (
                <div key={stat.id} className="hero-stat">
                  <div className="hero-stat-value">
                    {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                  </div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section">
        <div className="container">
          <span className="section-label">I Nostri Servizi</span>
          <h2 className="section-title">Cosa Facciamo</h2>
          <p className="section-subtitle">
            Offriamo una gamma completa di servizi digitali per il tuo business.
          </p>
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
                    {service.icon && (
                      <div className="card-icon">{service.icon}</div>
                    )}
                    <h3 className="card-title">{service.title}</h3>
                    {service.excerpt && (
                      <p className="card-text">{service.excerpt}</p>
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
            <div className="grid grid-3">
              {['Web Design', 'Sviluppo Web', 'E-Commerce'].map((title) => (
                <div key={title} className="card service-card">
                  <div className="card-body">
                    <div className="card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h3 className="card-title">{title}</h3>
                    <p className="card-text">
                      Soluzioni professionali su misura per le esigenze del tuo business.
                    </p>
                    <span className="card-link">
                      Scopri di pi&ugrave;
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/servizi" className="btn btn-outline">Tutti i Servizi</a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section projects-section">
        <div className="container">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">I Nostri Progetti</h2>
          <p className="section-subtitle">
            Scopri alcuni dei lavori che abbiamo realizzato per i nostri clienti.
          </p>
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
                    </div>
                    <h3 className="card-title">{project.title}</h3>
                    {project.excerpt && (
                      <p className="card-text">{project.excerpt}</p>
                    )}
                    <span className="card-link">
                      Vedi Progetto
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
              <h3>Progetti in arrivo</h3>
              <p>Stiamo preparando il nostro portfolio. Torna presto!</p>
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/progetti" className="btn btn-outline">Tutti i Progetti</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section testimonials-section">
          <div className="container">
            <span className="section-label">Testimonianze</span>
            <h2 className="section-title">Cosa Dicono di Noi</h2>
            <p className="section-subtitle">
              La soddisfazione dei nostri clienti &egrave; la nostra migliore referenza.
            </p>
            <div className="grid grid-3">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="card testimonial-card">
                  {testimonial.rating && (
                    <div className="testimonial-rating">
                      {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  )}
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    {testimonial.image && typeof testimonial.image === 'object' && testimonial.image.url && (
                      <img
                        className="testimonial-avatar"
                        src={testimonial.image.url}
                        alt={testimonial.name || ''}
                        loading="lazy"
                      />
                    )}
                    <div>
                      <div className="testimonial-name">{testimonial.name}</div>
                      {testimonial.role && (
                        <div className="testimonial-role">
                          {testimonial.role}
                          {testimonial.company ? ` - ${testimonial.company}` : ''}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Pronto a <span className="gradient-text">iniziare</span>?</h2>
          <p>
            Contattaci per discutere del tuo prossimo progetto. Siamo pronti ad aiutarti.
          </p>
          <a href="/contatti" className="btn btn-primary">
            Richiedi un Preventivo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}

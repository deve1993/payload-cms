import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export const metadata = {
  title: 'Chi Siamo',
  description: 'Scopri il team di Pixarts: professionisti appassionati di tecnologia e design digitale.',
}

export default async function ChiSiamoPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [teamData, valuesData, statsData] = await Promise.all([
    payload.find({ collection: 'team', limit: 20, sort: 'order' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'values', limit: 10, sort: 'order' }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'stats', limit: 4, sort: 'order' }).catch(() => ({ docs: [] })),
  ])

  const team = teamData.docs
  const values = valuesData.docs
  const stats = statsData.docs

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <span>Chi Siamo</span>
          </div>
          <h1>Chi <span className="gradient-text">Siamo</span></h1>
          <p>
            Un team di professionisti appassionati di tecnologia e innovazione digitale.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container" style={{ maxWidth: '768px', textAlign: 'center' }}>
          <span className="section-label">La Nostra Missione</span>
          <h2 className="section-title">Creiamo esperienze digitali che fanno la differenza</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', lineHeight: '1.8' }}>
            Siamo un team di designer, sviluppatori e strateghi digitali che lavorano insieme
            per trasformare le idee dei nostri clienti in prodotti digitali di successo.
            Ogni progetto &egrave; unico e merita un approccio su misura.
          </p>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="section stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat: any) => (
                <div key={stat.id} className="stat-item">
                  <div className="stat-value">
                    {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {values.length > 0 && (
        <section className="section">
          <div className="container">
            <span className="section-label">I Nostri Valori</span>
            <h2 className="section-title">In cosa crediamo</h2>
            <p className="section-subtitle">I principi che guidano il nostro lavoro ogni giorno.</p>
            <div className="grid grid-3">
              {values.map((value: any) => (
                <div key={value.id} className="card">
                  <div className="card-body" style={{ padding: '32px' }}>
                    {value.icon && <div className="card-icon">{value.icon}</div>}
                    <h3 className="card-title">{value.title}</h3>
                    {value.description && <p className="card-text">{value.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      <section className="section team-section" style={{ background: '#111' }}>
        <div className="container">
          <span className="section-label">Il Team</span>
          <h2 className="section-title">Le persone dietro Pixarts</h2>
          <p className="section-subtitle">Professionisti dedicati al tuo successo digitale.</p>
          {team.length > 0 ? (
            <div className="grid grid-4">
              {team.map((member: any) => (
                <div key={member.id} className="card team-card">
                  {member.image && typeof member.image === 'object' && member.image.url ? (
                    <img
                      className="card-image"
                      src={member.image.url}
                      alt={member.name || ''}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="card-image"
                      style={{
                        background: 'linear-gradient(135deg, #FF6B2C, #FFB347)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: '#000',
                        fontWeight: '700',
                      }}
                    >
                      {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <h3 className="card-title">{member.name}</h3>
                    {member.role && <p className="card-text">{member.role}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Team in aggiornamento</h3>
              <p>Stiamo aggiornando la pagina del team. Torna presto!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Vuoi <span className="gradient-text">lavorare con noi</span>?</h2>
          <p>Siamo sempre alla ricerca di nuove sfide e collaborazioni.</p>
          <a href="/contatti" className="btn btn-primary">Contattaci</a>
        </div>
      </section>
    </>
  )
}

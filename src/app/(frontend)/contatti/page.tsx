import React from 'react'

export const metadata = {
  title: 'Contatti',
  description: 'Contattaci per discutere del tuo prossimo progetto digitale. Siamo a tua disposizione.',
}

export default function ContattiPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <span>Contatti</span>
          </div>
          <h1><span className="gradient-text">Contattaci</span></h1>
          <p>
            Siamo pronti ad ascoltare le tue esigenze e aiutarti a realizzare i tuoi obiettivi digitali.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>
                Inviaci un messaggio
              </h2>
              <form>
                <div className="contact-grid" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Nome *</label>
                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Il tuo nome"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input
                      className="form-input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="La tua email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Telefono</label>
                  <input
                    className="form-input"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Il tuo numero"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Oggetto *</label>
                  <select className="form-select" id="subject" name="subject" required>
                    <option value="">Seleziona un argomento</option>
                    <option value="web-design">Web Design</option>
                    <option value="sviluppo">Sviluppo Web</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="marketing">Marketing Digitale</option>
                    <option value="consulenza">Consulenza</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Messaggio *</label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    name="message"
                    placeholder="Descrivi il tuo progetto o la tua richiesta..."
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Invia Messaggio
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="detail-sidebar">
              <div className="contact-info-card">
                <h3 style={{ marginBottom: '24px', fontSize: '1.125rem' }}>
                  Informazioni
                </h3>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-value">info@pixarts.it</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info-label">Sede</div>
                    <div className="contact-info-value">Italia</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-info-label">Orari</div>
                    <div className="contact-info-value">Lun - Ven: 9:00 - 18:00</div>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <h3 style={{ marginBottom: '16px', fontSize: '1.125rem' }}>
                  Risposta rapida
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                  Rispondiamo a tutte le richieste entro 24 ore lavorative.
                  Per urgenze, contattaci direttamente via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

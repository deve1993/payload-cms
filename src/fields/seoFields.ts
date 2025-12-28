import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  localized: true,
  admin: {
    description: 'Ottimizzazione per i motori di ricerca',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Titolo che appare nei risultati di ricerca (50-60 caratteri)',
      },
      maxLength: 60,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'Descrizione che appare nei risultati di ricerca (150-160 caratteri)',
      },
      maxLength: 160,
    },
    {
      name: 'metaKeywords',
      type: 'text',
      label: 'Meta Keywords',
      admin: {
        description: 'Parole chiave separate da virgola (opzionale)',
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
      admin: {
        description: 'Immagine per la condivisione sui social (1200x630px consigliato)',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
      admin: {
        description: 'URL canonico se diverso da quello predefinito',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'No Index',
      defaultValue: false,
      admin: {
        description: 'Impedisce ai motori di ricerca di indicizzare questa pagina',
      },
    },
    {
      name: 'noFollow',
      type: 'checkbox',
      label: 'No Follow',
      defaultValue: false,
      admin: {
        description: 'Impedisce ai motori di ricerca di seguire i link in questa pagina',
      },
    },
    {
      name: 'structuredData',
      type: 'json',
      label: 'Structured Data (JSON-LD)',
      admin: {
        description: 'Dati strutturati per rich snippets (opzionale)',
      },
    },
  ],
}

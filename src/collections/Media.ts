import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Media pubblici per il frontend
    create: filterByTenant,
    update: filterByTenant,
    delete: filterByTenant,
  },
  fields: [
    tenantField,
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Testo Alternativo',
      admin: {
        description: 'Descrizione dell\'immagine per accessibilità e SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Didascalia',
      admin: {
        description: 'Didascalia opzionale dell\'immagine',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'small',
        width: 400,
        height: undefined,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'medium',
        width: 800,
        height: undefined,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'large',
        width: 1200,
        height: undefined,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'xlarge',
        width: 1920,
        height: undefined,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 90,
          },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}

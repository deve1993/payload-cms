import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'
import { seoFields } from '../fields/seoFields'
import { createEnsureUniqueTenantSlug } from '../hooks/ensureUniqueTenantSlug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Servizio',
    plural: 'Servizi',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    defaultColumns: ['title', 'slug', 'order', 'tenant'],
  },
  access: {
    read: filterByTenant,
    create: isAuthenticated,
    update: filterByTenant,
    delete: filterByTenant,
  },
  hooks: {
    beforeValidate: [createEnsureUniqueTenantSlug('services')],
  },
  fields: [
    tenantField,
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titolo',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: 'Estratto',
      admin: {
        description: 'Breve descrizione per anteprime',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Contenuto',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icona',
      admin: {
        description: 'Nome icona (es: "cog", "wrench", "lightbulb")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galleria',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Immagine',
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          label: 'Didascalia',
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Caratteristiche',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Titolo',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Descrizione',
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Prezzi',
      fields: [
        {
          name: 'showPrice',
          type: 'checkbox',
          label: 'Mostra Prezzo',
          defaultValue: false,
        },
        {
          name: 'price',
          type: 'text',
          label: 'Prezzo',
          admin: {
            condition: (_, siblingData) => siblingData?.showPrice,
            description: 'Es: "€99", "Da €50/mese"',
          },
        },
        {
          name: 'priceDescription',
          type: 'text',
          localized: true,
          label: 'Descrizione Prezzo',
          admin: {
            condition: (_, siblingData) => siblingData?.showPrice,
            description: 'Es: "al mese", "una tantum"',
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          label: 'Testo Bottone',
          defaultValue: 'Richiedi Info',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
    seoFields,
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'In Evidenza',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Attivo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

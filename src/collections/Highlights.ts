import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Highlights: CollectionConfig = {
  slug: 'highlights',
  labels: {
    singular: 'Highlight',
    plural: 'Highlights',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    defaultColumns: ['title', 'type', 'order', 'tenant'],
  },
  access: {
    read: filterByTenant,
    create: filterByTenant,
    update: filterByTenant,
    delete: filterByTenant,
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
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: 'Sottotitolo',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Descrizione',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Tipo',
      options: [
        { label: 'Generico', value: 'generic' },
        { label: 'Prodotto', value: 'product' },
        { label: 'Servizio', value: 'service' },
        { label: 'Evento', value: 'event' },
        { label: 'Notizia', value: 'news' },
        { label: 'Promozione', value: 'promo' },
      ],
      defaultValue: 'generic',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icona',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
    },
    {
      name: 'value',
      type: 'text',
      label: 'Valore',
      admin: {
        description: 'Es: "50%", "€999", "TOP"',
      },
    },
    {
      name: 'badge',
      type: 'text',
      localized: true,
      label: 'Badge',
      admin: {
        description: 'Es: "Nuovo", "Bestseller", "Offerta"',
      },
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Abilita Link',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Testo Link',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
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

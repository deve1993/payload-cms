import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ',
  },
  admin: {
    useAsTitle: 'question',
    group: 'Contenuti',
    defaultColumns: ['question', 'category', 'order', 'tenant'],
  },
  access: {
    read: filterByTenant,
    create: isAuthenticated,
    update: filterByTenant,
    delete: filterByTenant,
  },
  fields: [
    tenantField,
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
      label: 'Domanda',
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Risposta',
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      label: 'Categoria',
      admin: {
        description: 'Es: "Generale", "Pagamenti", "Spedizioni"',
      },
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

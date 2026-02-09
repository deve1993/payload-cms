import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Values: CollectionConfig = {
  slug: 'values',
  labels: {
    singular: 'Valore',
    plural: 'Valori',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    defaultColumns: ['title', 'icon', 'order', 'tenant'],
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
    {
      name: 'icon',
      type: 'text',
      label: 'Icona',
      admin: {
        description: 'Nome icona (es: "heart", "shield", "star")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
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

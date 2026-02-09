import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Benefits: CollectionConfig = {
  slug: 'benefits',
  labels: {
    singular: 'Beneficio',
    plural: 'Benefici',
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
        description: 'Nome icona (es: "check", "thumbs-up", "award")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
    },
    {
      name: 'highlight',
      type: 'text',
      localized: true,
      label: 'Testo Evidenziato',
      admin: {
        description: 'Es: "100% Garantito", "Risparmio 30%"',
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

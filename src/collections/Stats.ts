import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Stats: CollectionConfig = {
  slug: 'stats',
  labels: {
    singular: 'Statistica',
    plural: 'Statistiche',
  },
  admin: {
    useAsTitle: 'label',
    group: 'Contenuti',
    defaultColumns: ['label', 'value', 'order', 'tenant'],
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
      name: 'value',
      type: 'text',
      required: true,
      label: 'Valore',
      admin: {
        description: 'Es: "150+", "99%", "24/7"',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      label: 'Etichetta',
      admin: {
        description: 'Es: "Clienti Soddisfatti", "Progetti Completati"',
      },
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
        description: 'Nome icona (es: "users", "chart", "trophy")',
      },
    },
    {
      name: 'prefix',
      type: 'text',
      label: 'Prefisso',
      admin: {
        description: 'Es: "$", "€"',
      },
    },
    {
      name: 'suffix',
      type: 'text',
      label: 'Suffisso',
      admin: {
        description: 'Es: "+", "%", "K"',
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

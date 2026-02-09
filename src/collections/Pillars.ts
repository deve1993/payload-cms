import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Pillars: CollectionConfig = {
  slug: 'pillars',
  labels: {
    singular: 'Pilastro',
    plural: 'Pilastri',
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
      name: 'color',
      type: 'text',
      label: 'Colore',
      admin: {
        description: 'Es: "#FF5733", "blue"',
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

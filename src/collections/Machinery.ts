import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Machinery: CollectionConfig = {
  slug: 'machinery',
  labels: {
    singular: 'Macchinario',
    plural: 'Macchinari',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Contenuti',
    defaultColumns: ['name', 'category', 'manufacturer', 'order', 'tenant'],
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
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Nome Macchinario',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Descrizione',
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      label: 'Categoria',
      admin: {
        description: 'Es: "CNC", "Stampaggio", "Assemblaggio"',
      },
    },
    {
      name: 'manufacturer',
      type: 'text',
      label: 'Produttore',
    },
    {
      name: 'model',
      type: 'text',
      label: 'Modello',
    },
    {
      name: 'year',
      type: 'text',
      label: 'Anno',
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
      name: 'specifications',
      type: 'array',
      label: 'Specifiche Tecniche',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Etichetta',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Valore',
        },
      ],
    },
    {
      name: 'capabilities',
      type: 'array',
      label: 'Capacità',
      fields: [
        {
          name: 'capability',
          type: 'text',
          required: true,
          localized: true,
          label: 'Capacità',
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

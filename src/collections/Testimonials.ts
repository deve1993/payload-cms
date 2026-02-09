import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonianza',
    plural: 'Testimonianze',
  },
  admin: {
    useAsTitle: 'author',
    group: 'Contenuti',
    defaultColumns: ['author', 'company', 'rating', 'order', 'tenant'],
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
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Testimonianza',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Nome Autore',
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      label: 'Ruolo',
      admin: {
        description: 'Es: "CEO", "Marketing Manager"',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Azienda',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Autore',
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Azienda',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Valutazione',
      min: 1,
      max: 5,
      admin: {
        description: 'Da 1 a 5 stelle',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'In Evidenza',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mostra in home page',
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

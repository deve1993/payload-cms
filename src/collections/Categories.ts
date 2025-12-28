import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'tenant'],
    group: 'Blog',
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
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Nome Categoria',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Descrizione',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
    },
  ],
}

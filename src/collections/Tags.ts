import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Tags: CollectionConfig = {
  slug: 'tags',
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
      label: 'Nome Tag',
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
  ],
}

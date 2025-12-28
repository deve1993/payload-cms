import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Media pubblici per il frontend
    create: filterByTenant,
    update: filterByTenant,
    delete: filterByTenant,
  },
  fields: [
    tenantField,
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

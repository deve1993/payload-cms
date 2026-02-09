import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Membro Team',
    plural: 'Team',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Contenuti',
    defaultColumns: ['name', 'role', 'order', 'tenant'],
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
      label: 'Nome',
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      label: 'Ruolo',
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      label: 'Biografia',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefono',
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
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

import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'tenant'],
    group: 'Navigazione',
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
      label: 'Nome Menu',
      admin: {
        description: 'Nome identificativo del menu (es. Menu Principale, Menu Footer)',
      },
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Header Principale', value: 'header' },
        { label: 'Footer', value: 'footer' },
        { label: 'Sidebar', value: 'sidebar' },
        { label: 'Mobile', value: 'mobile' },
      ],
      label: 'Posizione',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Voci Menu',
      labels: {
        singular: 'Voce',
        plural: 'Voci',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Etichetta',
        },
        {
          name: 'linkType',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Link Interno', value: 'internal' },
            { label: 'Link Esterno', value: 'external' },
          ],
          label: 'Tipo Link',
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Pagina',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'internal',
          },
          filterOptions: ({ user }) => {
            if (user?.role === 'super-admin') return {}
            return {
              tenant: {
                equals: typeof user?.tenant === 'string' ? user?.tenant : user?.tenant?.id,
              },
            }
          },
        },
        {
          name: 'externalLink',
          type: 'text',
          label: 'URL Esterno',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Apri in nuova scheda',
          defaultValue: false,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icona',
          admin: {
            description: 'Nome icona (es. home, info, mail)',
          },
        },
        {
          name: 'submenu',
          type: 'array',
          label: 'Sottomenu',
          labels: {
            singular: 'Sotto-voce',
            plural: 'Sotto-voci',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: 'Etichetta',
            },
            {
              name: 'linkType',
              type: 'radio',
              defaultValue: 'internal',
              options: [
                { label: 'Link Interno', value: 'internal' },
                { label: 'Link Esterno', value: 'external' },
              ],
              label: 'Tipo Link',
            },
            {
              name: 'internalLink',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Pagina',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'internal',
              },
              filterOptions: ({ user }) => {
                if (user?.role === 'super-admin') return {}
                return {
                  tenant: {
                    equals: typeof user?.tenant === 'string' ? user?.tenant : user?.tenant?.id,
                  },
                }
              },
            },
            {
              name: 'externalLink',
              type: 'text',
              label: 'URL Esterno',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'external',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Apri in nuova scheda',
              defaultValue: false,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              label: 'Descrizione',
              admin: {
                description: 'Descrizione opzionale per mega menu',
              },
            },
          ],
        },
      ],
    },
  ],
}

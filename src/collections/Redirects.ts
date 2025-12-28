import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type', 'active', 'tenant'],
    group: 'Configurazione Sito',
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
      name: 'from',
      type: 'text',
      required: true,
      label: 'URL Origine',
      admin: {
        description: 'Percorso da reindirizzare (es. /vecchia-pagina)',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value && !value.startsWith('/')) {
              return '/' + value
            }
            return value
          },
        ],
      },
    },
    {
      name: 'toType',
      type: 'radio',
      label: 'Tipo Destinazione',
      defaultValue: 'internal',
      options: [
        { label: 'Pagina Interna', value: 'internal' },
        { label: 'URL Personalizzato', value: 'custom' },
      ],
    },
    {
      name: 'toPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Pagina Destinazione',
      admin: {
        condition: (_, siblingData) => siblingData?.toType === 'internal',
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
      name: 'to',
      type: 'text',
      label: 'URL Destinazione',
      admin: {
        condition: (_, siblingData) => siblingData?.toType === 'custom',
        description: 'URL completo o percorso relativo (es. /nuova-pagina o https://esempio.com)',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Tipo Redirect',
      defaultValue: '301',
      options: [
        {
          label: '301 - Permanente (SEO friendly)',
          value: '301',
        },
        {
          label: '302 - Temporaneo',
          value: '302',
        },
        {
          label: '307 - Temporaneo (mantiene metodo)',
          value: '307',
        },
        {
          label: '308 - Permanente (mantiene metodo)',
          value: '308',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Usa 301 per redirect permanenti (migliore per SEO)',
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
    {
      name: 'priority',
      type: 'number',
      label: 'Priorità',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Numeri più alti = priorità maggiore',
      },
    },
    {
      name: 'matchType',
      type: 'select',
      label: 'Tipo Match',
      defaultValue: 'exact',
      options: [
        { label: 'Esatto', value: 'exact' },
        { label: 'Inizia con', value: 'startsWith' },
        { label: 'Regex', value: 'regex' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Come confrontare l\'URL origine',
      },
    },
    {
      name: 'preserveQueryString',
      type: 'checkbox',
      label: 'Preserva Query String',
      defaultValue: true,
      admin: {
        description: 'Mantiene i parametri URL (es. ?ref=abc)',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Note',
      admin: {
        description: 'Note interne sul redirect',
      },
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Statistiche',
      admin: {
        readOnly: true,
        condition: (data) => data?.stats?.hitCount > 0,
      },
      fields: [
        {
          name: 'hitCount',
          type: 'number',
          label: 'Numero Utilizzi',
          defaultValue: 0,
        },
        {
          name: 'lastHit',
          type: 'date',
          label: 'Ultimo Utilizzo',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
  ],
  indexes: [
    {
      fields: { from: 1, tenant: 1 },
      unique: true,
    },
  ],
}

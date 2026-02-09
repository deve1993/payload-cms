import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Headers: CollectionConfig = {
  slug: 'headers',
  labels: {
    singular: 'Testata',
    plural: 'Testate',
  },
  admin: {
    useAsTitle: 'internalName',
    group: 'Configurazione Sito',
    defaultColumns: ['internalName', 'tenant'],
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
      name: 'internalName',
      type: 'text',
      required: true,
      label: 'Nome Interno',
      defaultValue: 'Header Principale',
    },
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Immagine',
        },
        {
          name: 'darkImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Dark Mode',
          admin: {
            description: 'Logo alternativo per dark mode (opzionale)',
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Testo Logo',
          localized: true,
          admin: {
            description: 'Mostrato se non è presente un\'immagine logo',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link Logo',
          defaultValue: '/',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'relationship',
      relationTo: 'menus',
      label: 'Menu Principale',
      admin: {
        description: 'Seleziona il menu da mostrare nell\'header',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Mostra CTA',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Testo Bottone',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
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
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Pagina',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled && siblingData?.linkType === 'internal',
          },
        },
        {
          name: 'externalLink',
          type: 'text',
          label: 'URL Esterno',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled && siblingData?.linkType === 'external',
          },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Stile Bottone',
          defaultValue: 'primary',
          options: [
            { label: 'Primario', value: 'primary' },
            { label: 'Secondario', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Informazioni Contatto',
      fields: [
        {
          name: 'showPhone',
          type: 'checkbox',
          label: 'Mostra Telefono',
          defaultValue: false,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Numero Telefono',
          admin: {
            condition: (_, siblingData) => siblingData?.showPhone,
          },
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Etichetta Telefono',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.showPhone,
            description: 'es. "Chiamaci"',
          },
        },
        {
          name: 'showEmail',
          type: 'checkbox',
          label: 'Mostra Email',
          defaultValue: false,
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          admin: {
            condition: (_, siblingData) => siblingData?.showEmail,
          },
        },
        {
          name: 'emailLabel',
          type: 'text',
          label: 'Etichetta Email',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.showEmail,
            description: 'es. "Scrivici"',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'showSocial',
          type: 'checkbox',
          label: 'Mostra Social nell\'Header',
          defaultValue: false,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Link Social',
          admin: {
            condition: (_, siblingData) => siblingData?.showSocial,
          },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Telegram', value: 'telegram' },
              ],
              label: 'Piattaforma',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
            },
          ],
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Impostazioni Header',
      fields: [
        {
          name: 'sticky',
          type: 'checkbox',
          label: 'Header Sticky',
          defaultValue: true,
          admin: {
            description: 'L\'header rimane fisso durante lo scroll',
          },
        },
        {
          name: 'transparent',
          type: 'checkbox',
          label: 'Header Trasparente',
          defaultValue: false,
          admin: {
            description: 'Header trasparente sulla hero (se supportato dal tema)',
          },
        },
        {
          name: 'showLanguageSwitcher',
          type: 'checkbox',
          label: 'Mostra Selettore Lingua',
          defaultValue: true,
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          label: 'Mostra Ricerca',
          defaultValue: false,
        },
      ],
    },
  ],
}

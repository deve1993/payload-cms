import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Piè di Pagina',
  admin: {
    group: 'Configurazione Sito',
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Logo Footer',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Immagine',
        },
        {
          name: 'text',
          type: 'text',
          label: 'Testo Logo',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrizione',
          localized: true,
          admin: {
            description: 'Breve descrizione sotto il logo',
          },
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Colonne Menu',
      maxRows: 4,
      labels: {
        singular: 'Colonna',
        plural: 'Colonne',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Titolo Colonna',
        },
        {
          name: 'menu',
          type: 'relationship',
          relationTo: 'menus',
          label: 'Menu',
          admin: {
            description: 'Seleziona un menu esistente',
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
          name: 'showContactSection',
          type: 'checkbox',
          label: 'Mostra Sezione Contatti',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titolo Sezione',
          localized: true,
          defaultValue: 'Contattaci',
          admin: {
            condition: (_, siblingData) => siblingData?.showContactSection,
          },
        },
        {
          name: 'address',
          type: 'group',
          label: 'Indirizzo',
          admin: {
            condition: (_, siblingData) => siblingData?.showContactSection,
          },
          fields: [
            {
              name: 'show',
              type: 'checkbox',
              label: 'Mostra Indirizzo',
              defaultValue: true,
            },
            {
              name: 'street',
              type: 'text',
              label: 'Via/Indirizzo',
              admin: {
                condition: (_, siblingData) => siblingData?.show,
              },
            },
            {
              name: 'city',
              type: 'text',
              label: 'Città',
              admin: {
                condition: (_, siblingData) => siblingData?.show,
              },
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'CAP',
              admin: {
                condition: (_, siblingData) => siblingData?.show,
              },
            },
            {
              name: 'country',
              type: 'text',
              label: 'Paese',
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.show,
              },
            },
          ],
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefono',
          admin: {
            condition: (_, siblingData) => siblingData?.showContactSection,
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          admin: {
            condition: (_, siblingData) => siblingData?.showContactSection,
          },
        },
        {
          name: 'vatNumber',
          type: 'text',
          label: 'Partita IVA',
          admin: {
            condition: (_, siblingData) => siblingData?.showContactSection,
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
          label: 'Mostra Social nel Footer',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titolo Sezione',
          localized: true,
          defaultValue: 'Seguici',
          admin: {
            condition: (_, siblingData) => siblingData?.showSocial,
          },
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
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Mostra Form Newsletter',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titolo',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrizione',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Testo Bottone',
          localized: true,
          defaultValue: 'Iscriviti',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'placeholderText',
          type: 'text',
          label: 'Placeholder Email',
          localized: true,
          defaultValue: 'La tua email',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Footer',
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
      ],
    },
    {
      name: 'bottomBar',
      type: 'group',
      label: 'Barra Inferiore',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Testo Copyright',
          localized: true,
          admin: {
            description: 'Usa {year} per inserire l\'anno corrente automaticamente',
          },
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Link Legali',
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
            },
            {
              name: 'externalLink',
              type: 'text',
              label: 'URL Esterno',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'external',
              },
            },
          ],
        },
        {
          name: 'showPaymentIcons',
          type: 'checkbox',
          label: 'Mostra Icone Pagamento',
          defaultValue: false,
        },
        {
          name: 'paymentMethods',
          type: 'select',
          hasMany: true,
          label: 'Metodi di Pagamento',
          admin: {
            condition: (_, siblingData) => siblingData?.showPaymentIcons,
          },
          options: [
            { label: 'Visa', value: 'visa' },
            { label: 'Mastercard', value: 'mastercard' },
            { label: 'American Express', value: 'amex' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Apple Pay', value: 'applepay' },
            { label: 'Google Pay', value: 'googlepay' },
            { label: 'Stripe', value: 'stripe' },
            { label: 'Bonifico', value: 'banktransfer' },
          ],
        },
      ],
    },
  ],
}

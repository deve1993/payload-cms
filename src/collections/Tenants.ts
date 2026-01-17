import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    description: 'Gestione dei clienti/siti web',
  },
  access: {
    // Solo super admin può gestire i tenant
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      // Gli utenti normali vedono solo il proprio tenant
      if (user?.tenant) {
        return {
          id: {
            equals: typeof user.tenant === 'string' ? user.tenant : user.tenant.id,
          },
        }
      }
      return false
    },
    create: ({ req: { user } }) => user?.role === 'super-admin',
    update: ({ req: { user } }) => user?.role === 'super-admin',
    delete: ({ req: { user } }) => user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Cliente',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Subdominio',
      admin: {
        description: 'Es: "cliente1" per cliente1.tuodominio.com',
      },
    },
    {
      name: 'domain',
      type: 'text',
      label: 'Dominio Personalizzato',
      admin: {
        description: 'Es: www.sitodelcliente.com (opzionale)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Attivo',
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Impostazioni',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
        },
        {
          name: 'primaryColor',
          type: 'text',
          label: 'Colore Primario',
          admin: {
            description: 'Es: #3498db',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          label: 'Colore Secondario',
          admin: {
            description: 'Es: #2ecc71',
          },
        },
        {
          name: 'siteName',
          type: 'text',
          label: 'Nome Sito',
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          label: 'Descrizione Sito',
          admin: {
            description: 'Meta description per SEO',
          },
        },
      ],
    },
    {
      name: 'locales',
      type: 'select',
      hasMany: true,
      label: 'Lingue Attive',
      defaultValue: ['it'],
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'English', value: 'en' },
        { label: 'Čeština', value: 'cs' },
      ],
      admin: {
        description: 'Lingue supportate dal sito',
      },
    },
    {
      name: 'defaultLocale',
      type: 'select',
      label: 'Lingua Predefinita',
      defaultValue: 'it',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'English', value: 'en' },
        { label: 'Čeština', value: 'cs' },
      ],
    },
    {
      name: 'modules',
      type: 'select',
      hasMany: true,
      label: 'Moduli Attivi',
      admin: {
        description: 'Funzionalità aggiuntive attive per questo tenant',
      },
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Prenotazioni', value: 'reservations' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Recensioni', value: 'reviews' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Galleria', value: 'gallery' },
        { label: 'Multi-Location', value: 'multi-location' },
        { label: 'Eventi', value: 'events' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Affiliati', value: 'affiliates' },
      ],
    },
    {
      name: 'modulesConfig',
      type: 'json',
      label: 'Configurazione Moduli',
      admin: {
        description: 'Configurazione JSON per moduli specifici (es: orari prenotazioni, provider pagamenti)',
      },
    },
    {
      name: 'design',
      type: 'group',
      label: 'Design System',
      admin: {
        description: 'Tokens di design per il sito',
      },
      fields: [
        {
          name: 'style',
          type: 'select',
          label: 'Stile',
          options: [
            { label: 'Moderno', value: 'modern' },
            { label: 'Classico', value: 'classic' },
            { label: 'Minimalista', value: 'minimal' },
            { label: 'Audace', value: 'bold' },
            { label: 'Elegante', value: 'elegant' },
          ],
          defaultValue: 'modern',
        },
        {
          name: 'borderRadius',
          type: 'select',
          label: 'Arrotondamento',
          options: [
            { label: 'Nessuno (0px)', value: '0' },
            { label: 'Leggero (4px)', value: '4' },
            { label: 'Medio (8px)', value: '8' },
            { label: 'Grande (12px)', value: '12' },
            { label: 'Pill (9999px)', value: '9999' },
          ],
          defaultValue: '8',
        },
        {
          name: 'fontHeading',
          type: 'text',
          label: 'Font Titoli',
          admin: {
            description: 'Es: Inter, Playfair Display',
          },
        },
        {
          name: 'fontBody',
          type: 'text',
          label: 'Font Testo',
          admin: {
            description: 'Es: Inter, Open Sans',
          },
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
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
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contatti',
      fields: [
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
          name: 'address',
          type: 'textarea',
          label: 'Indirizzo',
        },
        {
          name: 'vatNumber',
          type: 'text',
          label: 'Partita IVA',
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: {
            description: 'Es: G-XXXXXXXXXX',
          },
        },
        {
          name: 'plausibleDomain',
          type: 'text',
          label: 'Plausible Domain',
        },
      ],
    },
  ],
}

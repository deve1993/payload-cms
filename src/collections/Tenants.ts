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
          name: 'primaryColor',
          type: 'text',
          label: 'Colore Primario',
          admin: {
            description: 'Es: #3498db',
          },
        },
        {
          name: 'siteName',
          type: 'text',
          label: 'Nome Sito',
        },
      ],
    },
  ],
}

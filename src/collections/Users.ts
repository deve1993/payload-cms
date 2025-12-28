import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      if (user?.tenant) {
        return {
          tenant: {
            equals: typeof user.tenant === 'string' ? user.tenant : user.tenant.id,
          },
        }
      }
      return false
    },
    create: ({ req: { user } }) => user?.role === 'super-admin' || user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'super-admin' || user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin Tenant', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'super-admin',
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      hasMany: false,
      admin: {
        description: 'Il cliente/sito a cui appartiene questo utente',
        condition: (data) => data?.role !== 'super-admin',
      },
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Permetti la creazione del primo utente (setup iniziale)
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super-admin') return true
      if (user.tenant) {
        return {
          tenant: {
            equals: typeof user.tenant === 'string' ? user.tenant : user.tenant.id,
          },
        }
      }
      return false
    },
    create: async ({ req }) => {
      // Permetti creazione se non ci sono utenti (setup iniziale)
      if (!req.user) {
        const existingUsers = await req.payload.find({
          collection: 'users',
          limit: 1,
        })
        return existingUsers.totalDocs === 0
      }
      return req.user.role === 'super-admin' || req.user.role === 'admin'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'super-admin' || user.role === 'admin'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'super-admin'
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
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
      required: false,
      hasMany: false,
      saveToJWT: true,
      admin: {
        description: 'Il cliente/sito a cui appartiene questo utente (non richiesto per Super Admin)',
        condition: (data) => data?.role !== 'super-admin',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            // Tenant è obbligatorio solo per non-super-admin
            if (data?.role !== 'super-admin' && !value) {
              throw new Error('Il tenant è obbligatorio per utenti non Super Admin')
            }
            return value
          },
        ],
      },
    },
  ],
}

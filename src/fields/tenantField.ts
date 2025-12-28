import type { Field } from 'payload'

export const tenantField: Field = {
  name: 'tenant',
  type: 'relationship',
  relationTo: 'tenants',
  required: true,
  hasMany: false,
  admin: {
    position: 'sidebar',
    description: 'Il cliente proprietario di questo contenuto',
  },
  hooks: {
    beforeChange: [
      ({ req, value }) => {
        // Se l'utente non è super-admin, forza il tenant dell'utente
        if (req.user?.role !== 'super-admin' && req.user?.tenant) {
          return typeof req.user.tenant === 'string' ? req.user.tenant : req.user.tenant.id
        }
        return value
      },
    ],
  },
}

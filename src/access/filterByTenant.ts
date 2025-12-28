import type { Access } from 'payload'

export const filterByTenant: Access = ({ req: { user } }) => {
  // Super admin vede tutto
  if (user?.role === 'super-admin') {
    return true
  }

  // Utenti con tenant vedono solo i propri contenuti
  if (user?.tenant) {
    return {
      tenant: {
        equals: typeof user.tenant === 'string' ? user.tenant : user.tenant.id,
      },
    }
  }

  // Nessun accesso se non autenticato
  return false
}

export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'admin'
}

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}

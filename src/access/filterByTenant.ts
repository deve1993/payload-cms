import type { Access, Where } from 'payload'

/**
 * READ/UPDATE/DELETE access: filtra per tenant.
 * Super admin vede tutto, altri vedono solo il proprio tenant.
 * NON usare per `create` — usare isAuthenticated o isAdminOrSuperAdmin.
 */
export const filterByTenant: Access = ({ req: { user } }) => {
  if (user?.role === 'super-admin') return true

  if (user?.tenant) {
    return {
      tenant: {
        equals: typeof user.tenant === 'string' ? user.tenant : user.tenant.id,
      },
    }
  }

  return false
}

/**
 * READ access per contenuti pubblici: pubblicati visibili a tutti,
 * bozze solo al proprio tenant.
 */
export const publicReadOrTenant: Access = ({ req: { user } }) => {
  if (!user) {
    const where: Where = { _status: { equals: 'published' } }
    return where
  }

  if (user.role === 'super-admin') return true

  if (user.tenant) {
    return {
      tenant: {
        equals: typeof user.tenant === 'string' ? user.tenant : user.tenant.id,
      },
    }
  }

  return false
}

/**
 * CREATE access: qualsiasi utente autenticato con tenant può creare.
 * Il tenantField hook forza automaticamente il tenant dell'utente.
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'admin'
}

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}

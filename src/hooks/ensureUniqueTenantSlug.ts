import type { CollectionBeforeValidateHook, Where } from 'payload'
import { APIError } from 'payload'

export const createEnsureUniqueTenantSlug = (
  collectionSlug: string,
): CollectionBeforeValidateHook => {
  return async ({ data, req, operation, originalDoc }) => {
    if (!data?.slug || !data?.tenant) return data

    const tenantId =
      typeof data.tenant === 'string' ? data.tenant : data.tenant?.id || data.tenant

    const where: Where = {
      and: [
        { tenant: { equals: tenantId } },
        { slug: { equals: data.slug } },
        ...(operation === 'update' && originalDoc?.id
          ? [{ id: { not_equals: originalDoc.id } }]
          : []),
      ],
    }

    const existing = await req.payload.find({
      collection: collectionSlug as 'pages',
      where,
      limit: 1,
      depth: 0,
      req,
    })

    if (existing.totalDocs > 0) {
      throw new APIError(
        `Esiste già un documento con slug "${data.slug}" per questo tenant.`,
        400,
      )
    }

    return data
  }
}

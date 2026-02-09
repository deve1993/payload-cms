import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'
import { seoFields } from '../fields/seoFields'
import { createEnsureUniqueTenantSlug } from '../hooks/ensureUniqueTenantSlug'
import { revalidateOnChange } from '../hooks/revalidateOnChange'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const path = data?.slug === 'home' ? '' : data?.slug
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/${path}`
      },
    },
  },
  access: {
    read: filterByTenant,
    create: isAuthenticated,
    update: filterByTenant,
    delete: filterByTenant,
  },
  hooks: {
    beforeValidate: [createEnsureUniqueTenantSlug('pages')],
    afterChange: [revalidateOnChange],
  },
  fields: [
    tenantField,
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titolo',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Contenuto',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine Hero',
    },
    seoFields,
  ],
}

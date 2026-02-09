import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'
import { seoFields } from '../fields/seoFields'
import { createEnsureUniqueTenantSlug } from '../hooks/ensureUniqueTenantSlug'
import { revalidateOnChange } from '../hooks/revalidateOnChange'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'tenant'],
    group: 'Blog',
    livePreview: {
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/blog/${data?.slug}`
      },
    },
  },
  access: {
    read: filterByTenant,
    create: isAuthenticated,
    update: filterByTenant,
    delete: filterByTenant,
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 10,
  },
  hooks: {
    beforeValidate: [createEnsureUniqueTenantSlug('posts')],
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
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: 'Estratto',
      admin: {
        description: 'Breve descrizione dell\'articolo (usata nelle anteprime)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: 'Contenuto',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine in evidenza',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'Categoria',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ user }) => {
        if (user?.role === 'super-admin') return true
        return {
          tenant: {
            equals: typeof user?.tenant === 'string' ? user?.tenant : user?.tenant?.id,
          },
        }
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Tags',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ user }) => {
        if (user?.role === 'super-admin') return true
        return {
          tenant: {
            equals: typeof user?.tenant === 'string' ? user?.tenant : user?.tenant?.id,
          },
        }
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Autore',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data Pubblicazione',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Bozza', value: 'draft' },
        { label: 'Pubblicato', value: 'published' },
        { label: 'Programmato', value: 'scheduled' },
      ],
      label: 'Stato',
      admin: {
        position: 'sidebar',
      },
    },
    seoFields,
  ],
}

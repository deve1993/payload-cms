import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'
import { seoFields } from '../fields/seoFields'
import { createEnsureUniqueTenantSlug } from '../hooks/ensureUniqueTenantSlug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Progetto',
    plural: 'Progetti',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenuti',
    defaultColumns: ['title', 'client', 'category', 'year', 'tenant'],
  },
  access: {
    read: filterByTenant,
    create: isAuthenticated,
    update: filterByTenant,
    delete: filterByTenant,
  },
  hooks: {
    beforeValidate: [createEnsureUniqueTenantSlug('projects')],
  },
  fields: [
    tenantField,
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Titolo Progetto',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: 'Estratto',
      admin: {
        description: 'Breve descrizione per anteprime',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Descrizione Completa',
    },
    {
      name: 'client',
      type: 'text',
      label: 'Cliente',
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      label: 'Categoria',
      admin: {
        description: 'Es: "Web Design", "Industriale", "Consulenza"',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          localized: true,
          label: 'Tag',
        },
      ],
    },
    {
      name: 'year',
      type: 'text',
      label: 'Anno',
    },
    {
      name: 'duration',
      type: 'text',
      localized: true,
      label: 'Durata',
      admin: {
        description: 'Es: "3 mesi", "1 anno"',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine Principale',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galleria',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Immagine',
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          label: 'Didascalia',
        },
      ],
    },
    {
      name: 'testimonial',
      type: 'group',
      label: 'Testimonianza Cliente',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Mostra Testimonianza',
          defaultValue: false,
        },
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
          label: 'Citazione',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'author',
          type: 'text',
          label: 'Autore',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'role',
          type: 'text',
          localized: true,
          label: 'Ruolo',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      label: 'Risultati',
      fields: [
        {
          name: 'metric',
          type: 'text',
          required: true,
          label: 'Metrica',
          admin: {
            description: 'Es: "+50%", "€100K"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Etichetta',
          admin: {
            description: 'Es: "Aumento vendite", "Risparmio"',
          },
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link Esterno',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Mostra Link',
          defaultValue: false,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Testo Link',
          localized: true,
          defaultValue: 'Visita il sito',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
          },
        },
      ],
    },
    seoFields,
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'In Evidenza',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Attivo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

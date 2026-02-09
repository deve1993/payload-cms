import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant, isAuthenticated } from '../access/filterByTenant'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: {
    singular: 'Certificazione',
    plural: 'Certificazioni',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Contenuti',
    defaultColumns: ['name', 'issuer', 'year', 'order', 'tenant'],
  },
  access: {
    read: filterByTenant,
    create: isAuthenticated,
    update: filterByTenant,
    delete: filterByTenant,
  },
  fields: [
    tenantField,
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Nome Certificazione',
      admin: {
        description: 'Es: "ISO 9001:2015", "CE Mark"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Descrizione',
    },
    {
      name: 'issuer',
      type: 'text',
      label: 'Ente Certificatore',
    },
    {
      name: 'year',
      type: 'text',
      label: 'Anno',
    },
    {
      name: 'expirationDate',
      type: 'date',
      label: 'Data Scadenza',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo/Badge',
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      label: 'Documento PDF',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link Verifica',
    },
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

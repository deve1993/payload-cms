import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Invio Form',
    plural: 'Invii Form',
  },
  admin: {
    useAsTitle: 'submittedAt',
    defaultColumns: ['form', 'submittedAt', 'status', 'tenant'],
    group: 'Moduli',
  },
  access: {
    read: filterByTenant,
    create: () => true, // Public can submit forms
    update: filterByTenant,
    delete: filterByTenant,
  },
  fields: [
    tenantField,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Form',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submissionData',
      type: 'json',
      required: true,
      label: 'Dati Inviati',
      admin: {
        description: 'Dati grezzi del form submission',
        readOnly: true,
      },
    },
    {
      name: 'formattedData',
      type: 'array',
      label: 'Dati Formattati',
      admin: {
        readOnly: true,
        description: 'Visualizzazione leggibile dei dati',
      },
      fields: [
        {
          name: 'field',
          type: 'text',
          label: 'Campo',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etichetta',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Valore',
        },
      ],
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      label: 'Data Invio',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      type: 'select',
      label: 'Stato',
      defaultValue: 'new',
      options: [
        { label: 'Nuovo', value: 'new' },
        { label: 'Letto', value: 'read' },
        { label: 'In Lavorazione', value: 'processing' },
        { label: 'Completato', value: 'completed' },
        { label: 'Spam', value: 'spam' },
        { label: 'Archiviato', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Note Interne',
      admin: {
        description: 'Note visibili solo agli admin',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadati',
      admin: {
        readOnly: true,
        condition: (data) => !!data?.metadata,
      },
      fields: [
        {
          name: 'ip',
          type: 'text',
          label: 'Indirizzo IP',
        },
        {
          name: 'userAgent',
          type: 'text',
          label: 'User Agent',
        },
        {
          name: 'referrer',
          type: 'text',
          label: 'Referrer',
        },
        {
          name: 'pageUrl',
          type: 'text',
          label: 'Pagina di Invio',
        },
        {
          name: 'locale',
          type: 'text',
          label: 'Lingua',
        },
      ],
    },
    {
      name: 'files',
      type: 'array',
      label: 'File Allegati',
      admin: {
        readOnly: true,
        condition: (data) => data?.files?.length > 0,
      },
      fields: [
        {
          name: 'fieldName',
          type: 'text',
          label: 'Nome Campo',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'File',
        },
      ],
    },
    {
      name: 'emailsSent',
      type: 'array',
      label: 'Email Inviate',
      admin: {
        readOnly: true,
        condition: (data) => data?.emailsSent?.length > 0,
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Conferma Utente', value: 'user' },
          ],
          label: 'Tipo',
        },
        {
          name: 'to',
          type: 'text',
          label: 'Destinatario',
        },
        {
          name: 'sentAt',
          type: 'date',
          label: 'Data Invio',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Inviata', value: 'sent' },
            { label: 'Fallita', value: 'failed' },
          ],
          label: 'Stato',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.submittedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}

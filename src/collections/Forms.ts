import type { CollectionConfig } from 'payload'
import { tenantField } from '../fields/tenantField'
import { filterByTenant } from '../access/filterByTenant'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant'],
    group: 'Forms',
  },
  access: {
    read: filterByTenant,
    create: filterByTenant,
    update: filterByTenant,
    delete: filterByTenant,
  },
  fields: [
    tenantField,
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nome Form',
      admin: {
        description: 'Nome identificativo del form',
      },
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
      name: 'fields',
      type: 'array',
      label: 'Campi Form',
      labels: {
        singular: 'Campo',
        plural: 'Campi',
      },
      fields: [
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          label: 'Tipo Campo',
          options: [
            { label: 'Testo', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Telefono', value: 'phone' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Numero', value: 'number' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Select (Dropdown)', value: 'select' },
            { label: 'Radio', value: 'radio' },
            { label: 'File Upload', value: 'file' },
            { label: 'Data', value: 'date' },
            { label: 'Data e Ora', value: 'datetime' },
            { label: 'Hidden', value: 'hidden' },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome Campo',
          admin: {
            description: 'Nome tecnico del campo (senza spazi)',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Etichetta',
          admin: {
            description: 'Etichetta mostrata all\'utente',
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          localized: true,
          label: 'Placeholder',
          admin: {
            condition: (_, siblingData) =>
              ['text', 'email', 'phone', 'textarea', 'number'].includes(siblingData?.fieldType),
          },
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Campo Obbligatorio',
          defaultValue: false,
        },
        {
          name: 'width',
          type: 'select',
          label: 'Larghezza',
          defaultValue: 'full',
          options: [
            { label: 'Intera Larghezza', value: 'full' },
            { label: 'Metà', value: 'half' },
            { label: 'Un Terzo', value: 'third' },
            { label: 'Due Terzi', value: 'twoThirds' },
          ],
        },
        {
          name: 'defaultValue',
          type: 'text',
          label: 'Valore Default',
          admin: {
            condition: (_, siblingData) =>
              ['text', 'email', 'phone', 'textarea', 'number', 'hidden'].includes(siblingData?.fieldType),
          },
        },
        // Options for select and radio
        {
          name: 'options',
          type: 'array',
          label: 'Opzioni',
          admin: {
            condition: (_, siblingData) =>
              ['select', 'radio'].includes(siblingData?.fieldType),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: 'Etichetta',
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Valore',
            },
          ],
        },
        // Textarea specific
        {
          name: 'rows',
          type: 'number',
          label: 'Numero Righe',
          defaultValue: 4,
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'textarea',
          },
        },
        // Number specific
        {
          name: 'min',
          type: 'number',
          label: 'Valore Minimo',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'number',
          },
        },
        {
          name: 'max',
          type: 'number',
          label: 'Valore Massimo',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'number',
          },
        },
        // File upload specific
        {
          name: 'allowedFileTypes',
          type: 'select',
          hasMany: true,
          label: 'Tipi File Permessi',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'file',
          },
          options: [
            { label: 'Immagini (jpg, png, gif, webp)', value: 'images' },
            { label: 'PDF', value: 'pdf' },
            { label: 'Documenti (doc, docx)', value: 'documents' },
            { label: 'Fogli di calcolo (xls, xlsx)', value: 'spreadsheets' },
            { label: 'Archivi (zip, rar)', value: 'archives' },
          ],
        },
        {
          name: 'maxFileSize',
          type: 'number',
          label: 'Dimensione Max (MB)',
          defaultValue: 5,
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'file',
          },
        },
        // Checkbox specific
        {
          name: 'checkboxLabel',
          type: 'richText',
          label: 'Testo Checkbox',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'checkbox',
            description: 'Puoi usare link per termini e condizioni',
          },
        },
        // Validation
        {
          name: 'validation',
          type: 'group',
          label: 'Validazione',
          fields: [
            {
              name: 'pattern',
              type: 'text',
              label: 'Pattern Regex',
              admin: {
                description: 'Espressione regolare per validazione personalizzata',
              },
            },
            {
              name: 'errorMessage',
              type: 'text',
              localized: true,
              label: 'Messaggio Errore',
              admin: {
                description: 'Messaggio mostrato se la validazione fallisce',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Configurazione',
          fields: [
            {
              name: 'submitButton',
              type: 'group',
              label: 'Bottone Invio',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: 'Testo Bottone',
                  defaultValue: 'Invia',
                },
                {
                  name: 'loadingText',
                  type: 'text',
                  localized: true,
                  label: 'Testo Durante Invio',
                  defaultValue: 'Invio in corso...',
                },
                {
                  name: 'style',
                  type: 'select',
                  label: 'Stile Bottone',
                  defaultValue: 'primary',
                  options: [
                    { label: 'Primario', value: 'primary' },
                    { label: 'Secondario', value: 'secondary' },
                    { label: 'Outline', value: 'outline' },
                  ],
                },
              ],
            },
            {
              name: 'successMessage',
              type: 'richText',
              localized: true,
              label: 'Messaggio Successo',
              admin: {
                description: 'Messaggio mostrato dopo l\'invio del form',
              },
            },
            {
              name: 'errorMessage',
              type: 'richText',
              localized: true,
              label: 'Messaggio Errore',
              admin: {
                description: 'Messaggio mostrato se l\'invio fallisce',
              },
            },
            {
              name: 'redirectOnSuccess',
              type: 'group',
              label: 'Redirect dopo Invio',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Abilita Redirect',
                  defaultValue: false,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL Redirect',
                  admin: {
                    condition: (_, siblingData) => siblingData?.enabled,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Notifiche Email',
          fields: [
            {
              name: 'emails',
              type: 'group',
              label: 'Configurazione Email',
              fields: [
                {
                  name: 'sendToAdmin',
                  type: 'checkbox',
                  label: 'Invia Email Admin',
                  defaultValue: true,
                },
                {
                  name: 'adminEmails',
                  type: 'text',
                  label: 'Email Destinatari',
                  admin: {
                    description: 'Email separate da virgola',
                    condition: (_, siblingData) => siblingData?.sendToAdmin,
                  },
                },
                {
                  name: 'adminSubject',
                  type: 'text',
                  localized: true,
                  label: 'Oggetto Email Admin',
                  admin: {
                    condition: (_, siblingData) => siblingData?.sendToAdmin,
                  },
                },
                {
                  name: 'sendConfirmationToUser',
                  type: 'checkbox',
                  label: 'Invia Conferma all\'Utente',
                  defaultValue: false,
                },
                {
                  name: 'userEmailField',
                  type: 'text',
                  label: 'Campo Email Utente',
                  admin: {
                    description: 'Nome del campo email nel form',
                    condition: (_, siblingData) => siblingData?.sendConfirmationToUser,
                  },
                },
                {
                  name: 'userSubject',
                  type: 'text',
                  localized: true,
                  label: 'Oggetto Email Utente',
                  admin: {
                    condition: (_, siblingData) => siblingData?.sendConfirmationToUser,
                  },
                },
                {
                  name: 'userMessage',
                  type: 'richText',
                  localized: true,
                  label: 'Messaggio Email Utente',
                  admin: {
                    condition: (_, siblingData) => siblingData?.sendConfirmationToUser,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Anti-Spam',
          fields: [
            {
              name: 'spam',
              type: 'group',
              label: 'Protezione Spam',
              fields: [
                {
                  name: 'honeypot',
                  type: 'checkbox',
                  label: 'Abilita Honeypot',
                  defaultValue: true,
                  admin: {
                    description: 'Campo nascosto per catturare bot',
                  },
                },
                {
                  name: 'recaptcha',
                  type: 'checkbox',
                  label: 'Abilita reCAPTCHA',
                  defaultValue: false,
                },
                {
                  name: 'recaptchaSiteKey',
                  type: 'text',
                  label: 'reCAPTCHA Site Key',
                  admin: {
                    condition: (_, siblingData) => siblingData?.recaptcha,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

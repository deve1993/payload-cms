import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { it } from '@payloadcms/translations/languages/it'
import { en } from '@payloadcms/translations/languages/en'
import { cs } from '@payloadcms/translations/languages/cs'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Tenants } from './collections/Tenants'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Menus } from './collections/Menus'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormSubmissions'
import { Redirects } from './collections/Redirects'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['pages', 'posts'],
      url: ({ data, collectionConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        if (collectionConfig?.slug === 'pages') {
          const slug = data?.slug === 'home' ? '' : data?.slug || ''
          return `${baseUrl}/${slug}`
        }
        if (collectionConfig?.slug === 'posts') {
          return `${baseUrl}/blog/${data?.slug || ''}`
        }
        return baseUrl
      },
    },
  },
  collections: [
    Tenants,
    Users,
    Media,
    Pages,
    Categories,
    Tags,
    Posts,
    Menus,
    Forms,
    FormSubmissions,
    Redirects,
  ],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
  // Configurazione email con Resend
  email: resendAdapter({
    defaultFromAddress: 'noreply@pixarts.eu',
    defaultFromName: 'Pixarts CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  // Traduzioni interfaccia admin
  i18n: {
    supportedLanguages: { en, it, cs },
    fallbackLanguage: 'en',
  },
  // Configurazione localizzazione contenuti
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Italiano',
        code: 'it',
      },
      {
        label: 'Čeština',
        code: 'cs',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
})

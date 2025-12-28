import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: Request) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Ottieni il tenant dal header o query param
  const url = new URL(request.url)
  const tenantSlug = request.headers.get('x-tenant-slug') || url.searchParams.get('tenant')

  let tenantFilter = {}

  // Se c'è un tenant specifico, filtra per quello
  if (tenantSlug) {
    const tenants = await payload.find({
      collection: 'tenants',
      where: {
        slug: { equals: tenantSlug },
      },
      limit: 1,
    })

    if (tenants.docs[0]) {
      tenantFilter = {
        tenant: { equals: tenants.docs[0].id },
      }
    }
  }

  // Ottieni tutte le pagine (filtrate per tenant se specificato)
  const pages = await payload.find({
    collection: 'pages',
    where: {
      ...tenantFilter,
      'seo.noIndex': { not_equals: true },
    },
    limit: 1000,
  })

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.docs
    .map((page) => {
      const slug = page.slug === 'home' ? '' : page.slug
      const loc = `${baseUrl}/${slug}`
      const lastmod = new Date(page.updatedAt).toISOString()
      const priority = page.slug === 'home' ? '1.0' : '0.8'

      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

import type { Metadata } from 'next'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Args = {
  params: Promise<{ slug: string }>
}

async function getTenantFromHeaders() {
  const headersList = await getHeaders()
  return headersList.get('x-tenant-slug') || null
}

async function resolveTenantId(payload: Awaited<ReturnType<typeof getPayload>>, tenantSlug: string) {
  const tenants = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: tenantSlug } },
    limit: 1,
  })
  return tenants.docs[0]?.id || null
}

async function getPageData(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const tenantSlug = await getTenantFromHeaders()
  const tenantId = tenantSlug ? await resolveTenantId(payload, tenantSlug) : null

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      ...(tenantId && { tenant: { equals: tenantId } }),
    },
    overrideAccess: false,
    limit: 1,
    depth: 2,
  })

  return pages.docs[0] || null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageData(slug)

  if (!page) return {}

  const pageData = page as unknown as Record<string, unknown>
  const meta = pageData.meta as
    | { title?: string; description?: string; image?: { url?: string } }
    | undefined

  return {
    title: meta?.title || (page.title as string),
    description: meta?.description || undefined,
    openGraph: meta?.image?.url
      ? { images: [{ url: meta.image.url }] }
      : undefined,
  }
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const page = await getPageData(slug)

  if (!page) {
    notFound()
  }

  const pageRecord = page as unknown as Record<string, unknown>
  const content = pageRecord.content

  return (
    <article className="page">
      <RefreshRouteOnSave />
      <h1>{page.title as string}</h1>
      {content ? <RichText data={content as SerializedEditorState} /> : null}
    </article>
  )
}

export async function generateStaticParams() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const pages = await payload.find({
      collection: 'pages',
      limit: 100,
    })

    return pages.docs.map((page) => ({
      slug: page.slug,
    }))
  } catch {
    return []
  }
}

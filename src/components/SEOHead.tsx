import type { Metadata } from 'next'
import type { Media as MediaType } from '@/payload-types'

type SEOData = {
  metaTitle?: string | null
  metaDescription?: string | null
  metaKeywords?: string | null
  ogImage?: string | MediaType | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  noFollow?: boolean | null
  structuredData?: Record<string, unknown> | null
}

type GenerateMetadataProps = {
  title: string
  seo?: SEOData | null
  slug?: string
  baseUrl?: string
}

export function generatePageMetadata({
  title,
  seo,
  slug,
  baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
}: GenerateMetadataProps): Metadata {
  const metaTitle = seo?.metaTitle || title
  const metaDescription = seo?.metaDescription || undefined
  const canonicalUrl = seo?.canonicalUrl || (slug ? `${baseUrl}/${slug === 'home' ? '' : slug}` : baseUrl)

  // Gestione immagine OG
  let ogImageUrl: string | undefined
  if (seo?.ogImage) {
    if (typeof seo.ogImage === 'string') {
      ogImageUrl = seo.ogImage
    } else if (seo.ogImage.url) {
      ogImageUrl = seo.ogImage.url
    }
  }

  const robots: string[] = []
  if (seo?.noIndex) robots.push('noindex')
  if (seo?.noFollow) robots.push('nofollow')

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.metaKeywords || undefined,
    robots: robots.length > 0 ? robots.join(', ') : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription || undefined,
      url: canonicalUrl,
      siteName: metaTitle,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription || undefined,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

// Componente per JSON-LD
export function StructuredData({ data }: { data?: Record<string, unknown> | null }) {
  if (!data) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

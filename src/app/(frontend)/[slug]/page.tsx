import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = pages.docs[0]

  if (!page) {
    notFound()
  }

  return (
    <article className="page">
      <RefreshRouteOnSave />
      <h1>{page.title}</h1>
      {page.content && (
        <div className="content">
          {/* Render rich text content here */}
        </div>
      )}
    </article>
  )
}

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}

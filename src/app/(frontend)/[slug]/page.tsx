import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
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

  const page = pages.docs[0] as any

  if (!page) {
    notFound()
  }

  return (
    <>
      <RefreshRouteOnSave />
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-separator">/</span>
            <span>{page.title}</span>
          </div>
          <h1>{page.title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '768px' }}>
          {page.content && (
            <div className="detail-content">
              {/* Rich text content rendered by Payload */}
            </div>
          )}
        </div>
      </section>
    </>
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

import type { CollectionAfterChangeHook } from 'payload'

const REVALIDATION_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET

export const revalidateOnChange: CollectionAfterChangeHook = async ({
  doc,
  collection,
  req,
}) => {
  if (!REVALIDATION_SECRET) return doc

  const slug = (doc as Record<string, unknown>).slug as string | undefined
  if (!slug) return doc

  try {
    await fetch(`${REVALIDATION_URL}/api/revalidate?secret=${REVALIDATION_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection: collection.slug, slug }),
    })
  } catch {
    req.payload.logger.error(`Revalidation failed for ${collection.slug}/${slug}`)
  }

  return doc
}

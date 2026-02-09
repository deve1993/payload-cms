import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { collection, slug } = body as { collection?: string; slug?: string }

    if (collection === 'pages' && slug) {
      const pagePath = slug === 'home' ? '/' : `/${slug}`
      revalidatePath(pagePath)
      return NextResponse.json({ revalidated: true, path: pagePath })
    }

    if (collection === 'posts' && slug) {
      revalidatePath(`/blog/${slug}`)
      return NextResponse.json({ revalidated: true, path: `/blog/${slug}` })
    }

    if (collection) {
      revalidateTag(collection)
      return NextResponse.json({ revalidated: true, tag: collection })
    }

    revalidatePath('/')
    return NextResponse.json({ revalidated: true, path: '/' })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}

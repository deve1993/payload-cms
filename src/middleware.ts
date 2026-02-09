import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Estrai il subdominio
  // Es: cliente1.tuodominio.com -> cliente1
  // Es: localhost:3000 -> null (sviluppo)
  const subdomain = getSubdomain(hostname)

  // Se c'è un subdominio, aggiungilo come header per il backend
  if (subdomain) {
    const response = NextResponse.next()
    response.headers.set('x-tenant-slug', subdomain)
    return response
  }

  return NextResponse.next()
}

function getSubdomain(hostname: string): string | null {
  // In sviluppo locale (localhost), nessun subdominio
  if (hostname.includes('localhost')) {
    return null
  }

  // Rimuovi la porta se presente
  const host = hostname.split(':')[0]

  // Dividi per punti
  const parts = host.split('.')

  // Se abbiamo almeno 3 parti (subdomain.domain.tld), il primo è il subdominio
  // Ignora 'www'
  if (parts.length >= 3 && parts[0] !== 'www') {
    return parts[0]
  }

  return null
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}

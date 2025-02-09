import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(req.headers)

  // Add Sanity Studio specific headers
  if (req.nextUrl.pathname.startsWith('/studio')) {
    requestHeaders.set('x-url', req.url)
    requestHeaders.set('x-sanity-studio', '1')
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
} 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('wedding_auth')?.value
  const expected = process.env.SITE_PASSWORD

  if (token === expected) {
    return NextResponse.next()
  }

  const enterUrl = new URL('/enter', request.url)
  enterUrl.searchParams.set('from', request.nextUrl.pathname)
  return NextResponse.redirect(enterUrl)
}

export const config = {
  matcher: [
    '/((?!enter|api/auth|_next/static|_next/image|favicon\\.ico).*)',
  ],
}

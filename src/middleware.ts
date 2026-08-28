import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Simple mock authentication check
  const token = request.cookies.get('auth_token')?.value
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  if (request.nextUrl.pathname === '/' && token) {
    // If logged in, maybe redirect to their unit dashboard.
    // For now, extract unit from mock token (e.g., mock-token-TUH)
    const unit = token.split('-').pop()?.toLowerCase() || 'tuh'
    return NextResponse.redirect(new URL(`/dashboard/${unit}`, request.url))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/', '/dashboard/:path*'],
}

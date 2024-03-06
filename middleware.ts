import { applyExperiments } from 'lib/experiments-middleware'
import { type NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /**
     * Matches a path like
     * /2023/01/27/world/europe/this-is-the-title.html
     * or
     * /2023/01/27/us/this-is-the-title.html
     */
    '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:section([^/]+)/:slug+',
    '/(interactive|live)/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:section([^/]+)/:slug+',
    // Articles don't have a date in the path
    '/article/:slug([^/]+)',
    '/experiments/:slug+',
    '/paywall/:slug+',
  ],
}

export function middleware(req: NextRequest) {
  const userId = req.cookies.get('user_id')
  const url = req.nextUrl

  // Trying to access the paywall page directly is disallowed
  if (url.pathname.startsWith('/paywall/')) {
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }

  // If the user is not logged in, redirect to the paywall page, this example is simple
  // and does not validate the cookie but it's recommended to do so.
  if (!userId) {
    req.nextUrl.pathname = `/paywall${url.pathname}`
    return NextResponse.rewrite(req.nextUrl)
  }

  return applyExperiments(req)
}

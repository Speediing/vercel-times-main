import { applyExperiments } from 'lib/experiments-middleware'
import {
  getServerSession,
  newSession,
  persistSession,
  setServerSessionCookie,
} from 'lib/session'
import { type NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import BloomFilter from 'bloom-filters/dist/bloom/bloom-filter'

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

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = await getServerSession(req)
  const userId = req.cookies.get('user_id')
  const url = req.nextUrl

  // Trying to access the paywall page directly is disallowed
  if (url.pathname.startsWith('/paywall/')) {
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }

  if (session?.userId) {
    console.log('Logged in', session)
    return applyExperiments(req)
  }

  if (!session) {
    console.log('No session, creating a new one')
    const response = NextResponse.next()
    return setServerSessionCookie(newSession(), response)
  }

  console.log('Session', session)
  const okResponse = await applyExperiments(req)
  const bf = BloomFilter.fromJSON(session.articlesBf)
  if (bf.has(url.pathname)) {
    console.log('User has already read this article', url.pathname)
    return okResponse
  }

  if (session.readCount < 3) {
    console.log('Allowed new read', url.pathname)
    bf.add(url.pathname)
    session.readCount++
    session.articlesBf = bf.saveAsJSON()
    event.waitUntil(persistSession(req, session))
    return setServerSessionCookie(session, okResponse)
  }

  console.log('Paywall triggered', url.pathname)

  // If the user is not logged in, redirect to the paywall page, this example is simple
  // and does not validate the cookie but it's recommended to do so.
  req.nextUrl.pathname = `/paywall${url.pathname}`
  return NextResponse.rewrite(req.nextUrl)
}

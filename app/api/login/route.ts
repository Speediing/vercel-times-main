import { newSession, setServerSessionCookie } from 'lib/session'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(_req: Request) {
  const res = NextResponse.json({ done: true }, { status: 200 })
  // It doesn't matter what's the value of the cookie, we only use it to
  // disable the paywall
  return setServerSessionCookie(newSession(crypto.randomUUID()), res)
}

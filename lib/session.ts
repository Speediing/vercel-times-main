import { cookies } from 'next/headers'
import { decryptJWECookie, encryptJWECookie } from './cookies'
import { NextRequest, NextResponse } from 'next/server'
import BloomFilter from 'bloom-filters/dist/bloom/bloom-filter'
import { kv } from '@vercel/kv'

export interface Session {
  userId: string
  // Article bloom filter
  articlesBf: ReturnType<typeof BloomFilter.prototype.saveAsJSON>
  readCount: number
}

export function newSession(userId?: string): Session {
  return {
    userId: userId || '',
    articlesBf: BloomFilter.create(10, 0.01).saveAsJSON(),
    readCount: 0,
  }
}

export async function getServerSession(req: NextRequest) {
  const cookie = cookies().get('session')?.value
  if (cookie) {
    return await decryptJWECookie<Session>(cookie)
  }
  const fingerprint = getFingerprint(req)
  const restored = await kv.get<Session>(`session:${fingerprint}`)
  const session = newSession()
  if (restored) {
    console.log('Restored session from KV', restored)
    session.readCount = restored.readCount
  }
  return session
}

export async function persistSession(req: NextRequest, session: Session) {
  const fingerprint = getFingerprint(req)
  return kv.set<Session>(`session:${fingerprint}`, session)
}

export async function resetSession(req: NextRequest) {
  const fingerprint = getFingerprint(req)
  await kv.del(`session:${fingerprint}`)
  const response = NextResponse.json({})
  response.cookies.set('session', '', { maxAge: 0 })
  return response
}

export async function setServerSessionCookie(
  session: Session,
  response: NextResponse,
) {
  const value = await encryptJWECookie(session, '380d')
  console.log('Setting session cookie', value)
  response.cookies.set({
    name: 'session',
    value,
    httpOnly: true,
    secure: true,
    maxAge: 380 * 24 * 60 * 60,
  })
  return response
}

export function getFingerprint(req: NextRequest) {
  return req.ip || 'unknown-ip'
}

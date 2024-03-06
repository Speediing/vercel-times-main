import { resetSession } from 'lib/session'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(_req: NextRequest) {
  return resetSession(_req)
}

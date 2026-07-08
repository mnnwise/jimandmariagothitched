import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!password || password !== process.env.SITE_PASSWORD) {
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = Response.json({ ok: true })
  const headers = new Headers(response.headers)
  headers.set(
    'Set-Cookie',
    `wedding_auth=${process.env.SITE_PASSWORD}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 30}`
  )

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  })
}

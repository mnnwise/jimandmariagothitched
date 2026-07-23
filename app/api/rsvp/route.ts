import { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export type RsvpRecord = {
  id: string
  name: string
  attending: 'yes' | 'no'
  guest_count: number | null
  dietary_restrictions: string
  notes: string
  submitted_at: string
}

type RsvpStore = Record<string, string>

async function getKv() {
  const { createClient } = await import('@vercel/kv')
  return createClient({
    url: process.env.RSVPs_KV_REST_API_URL!,
    token: process.env.RSVPs_KV_REST_API_TOKEN!,
  })
}

async function readRsvps(): Promise<RsvpRecord[]> {
  if (process.env.RSVPs_KV_REST_API_URL) {
    const kv = await getKv()
    const store = (await kv.hgetall<RsvpStore>('rsvps')) ?? {}
    return Object.values(store).map((v) => JSON.parse(v))
  }
  const file = path.join(process.cwd(), 'data', 'rsvps.json')
  const store: RsvpStore = JSON.parse(await fs.readFile(file, 'utf-8'))
  return Object.values(store).map((v) => JSON.parse(v))
}

async function saveRsvp(rsvp: RsvpRecord): Promise<void> {
  if (process.env.RSVPs_KV_REST_API_URL) {
    const kv = await getKv()
    await kv.hset('rsvps', { [rsvp.id]: JSON.stringify(rsvp) })
  } else {
    const file = path.join(process.cwd(), 'data', 'rsvps.json')
    const store: RsvpStore = JSON.parse(await fs.readFile(file, 'utf-8'))
    store[rsvp.id] = JSON.stringify(rsvp)
    await fs.writeFile(file, JSON.stringify(store, null, 2), 'utf-8')
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, attending, guest_count, dietary_restrictions, notes } = body

  if (!name?.trim()) {
    return Response.json({ error: 'Name is required.' }, { status: 400 })
  }
  if (!['yes', 'no'].includes(attending)) {
    return Response.json({ error: 'Please select whether you\'re attending.' }, { status: 400 })
  }

  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
  const rsvp: RsvpRecord = {
    id,
    name: name.trim(),
    attending,
    guest_count: guest_count ? Number(guest_count) : null,
    dietary_restrictions: (dietary_restrictions ?? '').trim(),
    notes: (notes ?? '').trim(),
    submitted_at: new Date().toISOString(),
  }

  try {
    await saveRsvp(rsvp)
  } catch {
    return Response.json({ error: 'Failed to save your RSVP. Please try again.' }, { status: 500 })
  }
  return Response.json(rsvp, { status: 201 })
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')
  if (!key || key !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rsvps = await readRsvps()
  rsvps.sort((a, b) => a.submitted_at.localeCompare(b.submitted_at))
  return Response.json(rsvps)
}

import { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Storage: Vercel KV in production, local JSON file in development
// ---------------------------------------------------------------------------

type ReservedState = Record<string, string> // id -> reservedBy name

async function readReserved(): Promise<ReservedState> {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import('@vercel/kv')
    return (await kv.hgetall<ReservedState>('reserved')) ?? {}
  }
  const file = path.join(process.cwd(), 'data', 'registry.json')
  return JSON.parse(await fs.readFile(file, 'utf-8'))
}

async function markReserved(id: string, reservedBy: string): Promise<void> {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import('@vercel/kv')
    await kv.hset('reserved', { [id]: reservedBy })
  } else {
    const file = path.join(process.cwd(), 'data', 'registry.json')
    const state = JSON.parse(await fs.readFile(file, 'utf-8'))
    state[id] = reservedBy
    await fs.writeFile(file, JSON.stringify(state, null, 2), 'utf-8')
  }
}

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------

function parseCSVRow(row: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < row.length; i++) {
    const char = row[i]
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(current); current = ''
    } else {
      current += char
    }
  }
  values.push(current)
  return values
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/)
  const headers = parseCSVRow(lines[0]).map((h) => h.toLowerCase().trim())
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCSVRow(line)
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? '').trim()]))
  })
}

async function fetchSheetItems() {
  const res = await fetch(process.env.REGISTRY_SHEET_URL!, { cache: 'no-store' })
  return parseCSV(await res.text())
}

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------

export async function GET() {
  const [rows, reserved] = await Promise.all([fetchSheetItems(), readReserved()])
  const items = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    store: row.store,
    link: row.link,
    reserved: !!reserved[row.id],
    reservedBy: reserved[row.id] ?? null,
  }))
  return Response.json(items)
}

export async function PATCH(request: NextRequest) {
  const { id, reservedBy } = await request.json()

  if (!id || typeof reservedBy !== 'string' || !reservedBy.trim()) {
    return Response.json({ error: 'id and reservedBy are required' }, { status: 400 })
  }

  const reserved = await readReserved()
  if (reserved[id]) {
    return Response.json({ error: 'Item already reserved' }, { status: 409 })
  }

  await markReserved(id, reservedBy.trim())

  const rows = await fetchSheetItems()
  const row = rows.find((r) => r.id === id)
  if (!row) return Response.json({ error: 'Item not found' }, { status: 404 })

  return Response.json({ ...row, reserved: true, reservedBy: reservedBy.trim() })
}

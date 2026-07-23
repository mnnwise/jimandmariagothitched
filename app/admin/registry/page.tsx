import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

type RegistryRow = {
  id: string
  name: string
  store: string
  price: string
  link: string
  reserved: boolean
  reservedBy: string | null
}

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

async function getItems(): Promise<RegistryRow[]> {
  const [sheetRes, reserved] = await Promise.all([
    fetch(process.env.REGISTRY_SHEET_URL!, { cache: 'no-store' }),
    (async () => {
      if (process.env.RSVPs_KV_REST_API_URL) {
        const { createClient } = await import('@vercel/kv')
        const kv = createClient({
          url: process.env.RSVPs_KV_REST_API_URL!,
          token: process.env.RSVPs_KV_REST_API_TOKEN!,
        })
        return (await kv.hgetall<Record<string, string>>('reserved')) ?? {}
      }
      const file = path.join(process.cwd(), 'data', 'registry.json')
      return JSON.parse(await fs.readFile(file, 'utf-8')) as Record<string, string>
    })(),
  ])

  const rows = parseCSV(await sheetRes.text())
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    store: row.store,
    price: row.price,
    link: row.link,
    reserved: !!reserved[row.id],
    reservedBy: reserved[row.id] ?? null,
  }))
}

export default async function AdminRegistryPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const { key } = await searchParams

  if (!key || key !== process.env.ADMIN_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#5A86CB]">
        <p className="text-[#F2DCDB] text-sm tracking-widest uppercase font-light">Access denied.</p>
      </div>
    )
  }

  const items = await getItems()
  const reserved = items.filter((i) => i.reserved)
  const available = items.filter((i) => !i.reserved)

  return (
    <div className="min-h-screen bg-[#5A86CB] px-4 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#6C0820] mb-2 font-light">Admin</p>
          <h1 className="font-[family-name:var(--font-script)] text-5xl text-[#F2AEBC] mb-6">
            Registry
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-[#F2DCDB] font-light">
            <span>Reserved: <strong>{reserved.length}</strong></span>
            <span>Available: <strong>{available.length}</strong></span>
            <span>Total items: <strong>{items.length}</strong></span>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-[#F2DCDB] font-light text-sm">No registry items found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3D5D91]">
                  {['Item', 'Store', 'Price', 'Status', 'Reserved by', 'Link'].map((h) => (
                    <th key={h} className="pb-3 pr-6 text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[#3D5D91]/30 hover:bg-[#3D5D91]/10">
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm">{item.name}</td>
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm whitespace-nowrap">{item.store}</td>
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm whitespace-nowrap">{item.price}</td>
                    <td className="py-3 pr-6 text-sm whitespace-nowrap">
                      <span className={`text-xs tracking-[0.15em] uppercase font-light ${
                        item.reserved ? 'text-[#F2AEBC]' : 'text-[#F2DCDB]/50'
                      }`}>
                        {item.reserved ? 'Reserved' : 'Available'}
                      </span>
                    </td>
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm">{item.reservedBy ?? '—'}</td>
                    <td className="py-3 text-sm">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs tracking-[0.15em] uppercase font-light text-[#aac5e8] underline underline-offset-2 hover:text-white transition-colors"
                        >
                          View
                        </a>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

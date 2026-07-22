import { promises as fs } from 'fs'
import path from 'path'
import type { RsvpRecord } from '@/app/api/rsvp/route'

export const dynamic = 'force-dynamic'

async function getRsvps(): Promise<RsvpRecord[]> {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import('@vercel/kv')
    const store = (await kv.hgetall<Record<string, string>>('rsvps')) ?? {}
    return Object.values(store).map((v) => JSON.parse(v))
  }
  const file = path.join(process.cwd(), 'data', 'rsvps.json')
  const store: Record<string, string> = JSON.parse(await fs.readFile(file, 'utf-8'))
  return Object.values(store).map((v) => JSON.parse(v))
}

export default async function AdminRsvpsPage({
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

  const rsvps = await getRsvps()
  rsvps.sort((a, b) => a.submitted_at.localeCompare(b.submitted_at))

  const attending = rsvps.filter((r) => r.attending === 'yes')
  const notAttending = rsvps.filter((r) => r.attending === 'no')
  const totalGuests = attending.reduce((sum, r) => sum + (r.guest_count ?? 0), 0)

  return (
    <div className="min-h-screen bg-[#5A86CB] px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#6C0820] mb-2 font-light">Admin</p>
          <h1 className="font-[family-name:var(--font-script)] text-5xl text-[#F2AEBC] mb-6">
            RSVPs
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-[#F2DCDB] font-light">
            <span>✓ Attending: <strong>{attending.length}</strong> ({totalGuests} guests total)</span>
            <span>✗ Not attending: <strong>{notAttending.length}</strong></span>
            <span>Total responses: <strong>{rsvps.length}</strong></span>
          </div>
        </div>

        {rsvps.length === 0 ? (
          <p className="text-[#F2DCDB] font-light text-sm">No RSVPs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3D5D91]">
                  {['Name', 'Attending', 'Guests', 'Dietary', 'Notes', 'Submitted'].map((h) => (
                    <th key={h} className="pb-3 pr-6 text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r) => (
                  <tr key={r.id} className="border-b border-[#3D5D91]/30 hover:bg-[#3D5D91]/10">
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm whitespace-nowrap">{r.name}</td>
                    <td className="py-3 pr-6 text-sm whitespace-nowrap">
                      <span className={`text-xs tracking-[0.15em] uppercase font-light ${
                        r.attending === 'yes' ? 'text-[#F2AEBC]' : 'text-[#d498aa]'
                      }`}>
                        {r.attending === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm">{r.guest_count ?? '—'}</td>
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm max-w-[200px]">{r.dietary_restrictions || '—'}</td>
                    <td className="py-3 pr-6 text-[#F2DCDB] font-light text-sm max-w-[200px]">{r.notes || '—'}</td>
                    <td className="py-3 text-[#F2DCDB]/60 font-light text-xs whitespace-nowrap">
                      {new Date(r.submitted_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
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

import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Registry Admin' }

type RegistryRow = {
  id: string
  name: string
  store: string
  price: string
  link: string
  reserved: boolean
  reservedBy: string | null
}

async function getRegistryItems(): Promise<RegistryRow[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/registry`, { cache: 'no-store' })
  return res.json()
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

  const items = await getRegistryItems()
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

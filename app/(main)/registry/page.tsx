'use client'

import { useEffect, useState } from 'react'

type RegistryItem = {
  id: string
  name: string
  description: string
  price: string
  store: string
  link: string
  reserved: boolean
  reservedBy: string | null
}

function ReserveModal({
  item,
  onClose,
  onConfirm,
}: {
  item: RegistryItem
  onClose: () => void
  onConfirm: (name: string) => Promise<void>
}) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError('')
    try {
      await onConfirm(name.trim())
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#3D5D91]/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#dce8f7] w-full sm:max-w-md sm:mx-6 p-6 sm:p-10 shadow-xl rounded-t-2xl sm:rounded-none">
        <p className="text-xs tracking-[0.25em] uppercase text-[#6C0820] mb-2 font-light">Reserve this gift</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#3D5D91] mb-1">
          {item.name}
        </h2>
        <p className="text-sm text-[#3D5D91] font-light mb-7">
          {item.price} &mdash; {item.store}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#3D5D91] font-light mb-2">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First & Last Name"
              required
              className="w-full border-b border-[#4a76bb] bg-transparent py-3 text-base text-[#3D5D91] placeholder:text-[#7a9ec0] focus:outline-none focus:border-[#3D5D91] transition-colors"
            />
          </div>
          {error && <p className="text-xs text-[#d498aa]">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 py-4 sm:py-3 bg-[#3D5D91] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#2d4a7a] active:bg-[#2d4a7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              {loading ? 'Reserving…' : 'Confirm Reservation'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-4 sm:py-3 sm:px-5 border border-[#4a76bb] text-[#3D5D91] text-xs tracking-[0.2em] uppercase font-light hover:border-[#F2AEBC] active:border-[#F2AEBC] transition-colors touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function SuccessModal({ item, onClose }: { item: RegistryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#3D5D91]/40 backdrop-blur-sm">
      <div className="bg-[#dce8f7] w-full sm:max-w-md sm:mx-6 p-6 sm:p-10 shadow-xl rounded-t-2xl sm:rounded-none text-center">
        <div className="w-12 h-12 rounded-full bg-[#aac5e8] flex items-center justify-center mx-auto mb-5">
          <svg className="w-5 h-5 text-[#3D5D91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xs tracking-[0.25em] uppercase text-[#6C0820] mb-2 font-light">Reserved!</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#3D5D91] mb-3">
          {item.name}
        </h2>
        <p className="text-sm text-[#3D5D91] font-light mb-7">
          Thank you so much, {item.reservedBy}. The couple will be thrilled!
        </p>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-4 sm:py-3 bg-[#f5d0da] text-[#3D5D91] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#F2AEBC] active:bg-[#F2AEBC] transition-colors touch-manipulation"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default function RegistryPage() {
  const [items, setItems] = useState<RegistryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null)
  const [successItem, setSuccessItem] = useState<RegistryItem | null>(null)

  useEffect(() => {
    fetch('/api/registry')
      .then((r) => r.json())
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
  }, [])

  async function handleReserve(name: string) {
    if (!selectedItem) return
    const res = await fetch('/api/registry', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedItem.id, reservedBy: name }),
    })
    if (!res.ok) throw new Error('Failed')
    const updated: RegistryItem = await res.json()
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
    setSelectedItem(null)
    setSuccessItem(updated)
  }

  const available = items.filter((i) => !i.reserved)
  const reserved = items.filter((i) => i.reserved)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-[#6C0820] mb-4 font-light">Celebrate with us</p>
        <h1 className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-[#F2AEBC] mb-4">
          Gift Registry
        </h1>
        <div className="w-12 h-px bg-[#F2AEBC] mx-auto mb-5" />
        <p className="text-sm text-[#3D5D91] font-light max-w-lg mx-auto leading-relaxed">
          Gifts are not needed! But if you are one of those people who will get us a gift anyway, here are a few ideas. Simply tap &ldquo;Reserve&rdquo; to let other guests know it&apos;s taken.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24 text-[#3D5D91] font-light text-sm tracking-widest uppercase">
          Loading…
        </div>
      ) : (
        <>
          {/* Available items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#4a76bb]">
            {available.map((item) => (
              <div key={item.id} className="bg-[#dce8f7] p-5 sm:p-7 flex flex-col">
                <p className="text-xs tracking-[0.2em] uppercase text-[#6C0820] mb-3 font-light">
                  {item.store}
                </p>
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#3D5D91] mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-[#3D5D91] font-light leading-relaxed flex-1 mb-5">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-[family-name:var(--font-cormorant)] text-lg text-[#3D5D91] font-light">
                    {item.price}
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-xs tracking-[0.18em] uppercase font-light px-5 py-3 bg-[#3D5D91] text-white hover:bg-[#2d4a7a] active:bg-[#2d4a7a] transition-colors touch-manipulation min-h-[44px]"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Reserved items */}
          {reserved.length > 0 && (
            <div className="mt-12 md:mt-16">
              <p className="text-xs tracking-[0.25em] uppercase text-[#3D5D91] font-light mb-6 text-center">
                Already reserved
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#4a76bb]">
                {reserved.map((item) => (
                  <div key={item.id} className="bg-[#dce8f7]/60 p-5 sm:p-7 flex flex-col opacity-60">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#3D5D91] mb-3 font-light">
                      {item.store}
                    </p>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#3D5D91] mb-2 leading-snug line-through decoration-[#F2AEBC]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#3D5D91] font-light leading-relaxed flex-1 mb-5">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-[family-name:var(--font-cormorant)] text-lg text-[#3D5D91] font-light">
                        {item.price}
                      </span>
                      <span className="text-xs tracking-[0.15em] uppercase font-light text-[#F2AEBC] border border-[#f5d0da] px-4 py-2">
                        Reserved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {selectedItem && (
        <ReserveModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleReserve}
        />
      )}
      {successItem && (
        <SuccessModal item={successItem} onClose={() => setSuccessItem(null)} />
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'

type Attending = 'yes' | 'no' | ''

export default function RsvpPage() {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<Attending>('')
  const [guestCount, setGuestCount] = useState('')
  const [dietary, setDietary] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        attending,
        guest_count: guestCount ? Number(guestCount) : null,
        dietary_restrictions: dietary,
        notes,
      }),
    })

    if (res.ok) {
      setSuccess(true)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="w-12 h-px bg-[#F2AEBC] mx-auto mb-10" />
        <h2 className="font-[family-name:var(--font-script)] text-5xl text-[#F2AEBC] mb-6">
          You&apos;re in!
        </h2>
        <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#F2DCDB] leading-relaxed">
          Woot woot! We can&apos;t wait to boogie with you.
        </p>
        <div className="w-12 h-px bg-[#F2AEBC] mx-auto mt-10" />
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 md:py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#6C0820] mb-4 font-light">
          November 14th, 2026
        </p>
        <h1 className="font-[family-name:var(--font-script)] text-6xl md:text-7xl text-[#F2AEBC] mb-4">
          RSVP
        </h1>
        <div className="w-12 h-px bg-[#F2AEBC] mx-auto mb-6" />
        <p className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#F2DCDB] leading-relaxed">
          Let us know if you can make it to the party.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* Name */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light mb-2">
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First &amp; Last Name"
            required
            className="w-full border-b border-[#4a76bb] bg-transparent py-3 text-base text-[#F2DCDB] placeholder:text-[#F2DCDB]/50 focus:outline-none focus:border-[#6C0820] transition-colors"
          />
        </div>

        {/* Attending */}
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light mb-4">
            Will you be there?
          </label>
          <div className="flex gap-3 flex-wrap">
            {(['yes', 'no'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAttending(opt)}
                className={`px-6 py-3 text-xs tracking-[0.18em] uppercase font-light transition-colors touch-manipulation ${
                  attending === opt
                    ? 'bg-[#6C0820] text-white'
                    : 'border border-[#4a76bb] text-[#F2DCDB] hover:border-[#6C0820]'
                }`}
              >
                {opt === 'yes' ? 'Yes!' : "Can't make it"}
              </button>
            ))}
          </div>
        </div>

        {/* Fields only shown when attending yes */}
        {attending === 'yes' && (
          <>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light mb-2">
                How big is your party?
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="0"
                required
                className="w-24 border-b border-[#4a76bb] bg-transparent py-3 text-base text-[#F2DCDB] placeholder:text-[#F2DCDB]/50 focus:outline-none focus:border-[#6C0820] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light mb-2">
                Dietary restrictions{' '}
                <span className="normal-case tracking-normal text-[#F2DCDB]/50">— optional</span>
              </label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="e.g. vegetarian, nut allergy"
                className="w-full border-b border-[#4a76bb] bg-transparent py-3 text-base text-[#F2DCDB] placeholder:text-[#F2DCDB]/50 focus:outline-none focus:border-[#6C0820] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#6C0820] font-light mb-2">
                Anything else{' '}
                <span className="normal-case tracking-normal text-[#F2DCDB]/50">— optional</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes, questions, confetti requests…"
                className="w-full border-b border-[#4a76bb] bg-transparent py-3 text-base text-[#F2DCDB] placeholder:text-[#F2DCDB]/50 focus:outline-none focus:border-[#6C0820] transition-colors"
              />
            </div>
          </>
        )}

        {error && (
          <p className="text-xs text-[#d498aa] tracking-wide">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !name.trim() || !attending}
          className="w-full py-4 sm:py-3 bg-[#6C0820] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#4a0016] active:bg-[#4a0016] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          {loading ? 'Sending…' : 'Send RSVP'}
        </button>

      </form>
    </div>
  )
}

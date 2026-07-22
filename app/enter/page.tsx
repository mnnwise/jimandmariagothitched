'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function EnterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const from = searchParams.get('from') || '/'
      router.replace(from)
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#5A86CB] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-white/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#f5d0da]/25 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-cormorant)] text-5xl font-light italic text-[#3D5D91] mb-3">
            Jim &amp; Maria
          </p>
          <div className="w-10 h-px bg-[#F2AEBC] mx-auto mb-4" />
          <p className="text-xs tracking-[0.25em] uppercase text-[#3D5D91] font-light">
            Private — guests only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-[#3D5D91] font-light mb-2">
              Password
            </label>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border-b border-[#4a76bb] bg-transparent py-3 text-base text-[#3D5D91] placeholder:text-[#7a9ec0] focus:outline-none focus:border-[#3D5D91] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-[#d498aa] tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 sm:py-3 bg-[#3D5D91] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#2d4a7a] active:bg-[#2d4a7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {loading ? 'Entering…' : 'Enter'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#3D5D91] font-light">
          April 25th, 2026 &bull; Las Vegas, Nevada
        </p>
      </div>
    </div>
  )
}

export default function EnterPage() {
  return (
    <Suspense>
      <EnterForm />
    </Suspense>
  )
}

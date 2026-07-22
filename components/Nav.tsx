'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links: { href: string; label: string; mobileLabel?: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/rsvp', label: 'RSVP' },
  { href: '/photos', label: 'Photos' },
  { href: '/details', label: 'The Details', mobileLabel: 'Details' },
  { href: '/registry', label: 'Registry' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-[#4a76bb] bg-[#5A86CB]/90 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic tracking-wide text-[#6C0820] hover:text-[#4a0016] transition-colors"
        >
          J &amp; M
        </Link>
        <ul className="flex gap-5 sm:gap-8">
          {links.map(({ href, label, mobileLabel }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase font-light transition-colors touch-manipulation ${
                  pathname === href
                    ? 'text-[#6C0820] border-b border-[#6C0820] pb-0.5'
                    : 'text-[#6C0820] hover:text-[#4a0016]'
                }`}
              >
                {mobileLabel ? (
                  <>
                    <span className="sm:hidden">{mobileLabel}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </>
                ) : label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

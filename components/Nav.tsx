'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/photos', label: 'Photos' },
  { href: '/details', label: 'The Details' },
  { href: '/registry', label: 'Registry' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-[#4a76bb] bg-[#5A86CB]/90 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic tracking-wide text-[#3D5D91] hover:text-[#6C0820] transition-colors"
        >
          J &amp; M
        </Link>
        <ul className="flex gap-5 sm:gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase font-light transition-colors touch-manipulation ${
                  pathname === href
                    ? 'text-[#3D5D91] border-b border-[#3D5D91] pb-0.5'
                    : 'text-[#3D5D91] hover:text-[#3D5D91]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

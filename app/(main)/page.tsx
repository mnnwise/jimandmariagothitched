import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero: title + two photo strips ── */}
      <section className="w-full bg-[#c5dce9] flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 px-8 py-16 sm:py-20 overflow-hidden">
        <div className="flex-shrink-0 text-center">
          <h1 className="font-[family-name:var(--font-script)] text-[52pt] sm:text-[72pt] text-[#1e3348] leading-tight rotate-[-15deg] inline-block">
            Jim and Maria<br />got hitched!
          </h1>
        </div>
        <div className="flex gap-4 sm:gap-6 items-center">
          <div className="relative w-28 sm:w-40 h-72 sm:h-[440px] rotate-[-7deg] shadow-xl overflow-hidden flex-shrink-0">
            <Image src="/photos/1000036139.jpg" alt="Photo strip" fill className="object-cover" priority />
          </div>
          <div className="relative w-28 sm:w-40 h-72 sm:h-[440px] rotate-[6deg] shadow-xl overflow-hidden flex-shrink-0">
            <Image src="/photos/1000036140.jpg" alt="Photo strip" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Invite text + buttons */}
      <section className="flex flex-col items-center text-center px-6 py-16">
        <div className="w-16 h-px bg-[#d4a5a5] mx-auto mb-8" />
        <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#4d6b7e] max-w-lg mx-auto leading-relaxed mb-14">
          Did you really think we were going to get MARRIED and not throw ourselves a fun ass party?
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/details"
            className="px-8 py-3 bg-[#1e3348] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#2d4e66] transition-colors"
          >
            The Details
          </Link>
          <Link
            href="/photos"
            className="px-8 py-3 bg-[#d4a5a5] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#c08888] transition-colors"
          >
            Our Photos
          </Link>
          <Link
            href="/registry"
            className="px-8 py-3 bg-[#1e3348] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#2d4e66] transition-colors"
          >
            Gift Registry
          </Link>
        </div>
      </section>

    </div>
  )
}

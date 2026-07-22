import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero: title + two photo strips ── */}
      <section className="w-full bg-[#5A86CB] flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 px-8 py-12 sm:py-16">
        <div className="flex-shrink-0 text-center">
          <h1 className="font-[family-name:var(--font-script)] text-[64pt] sm:text-[96pt] text-[#3D5D91] leading-tight rotate-[-15deg] inline-block">
            Jim and Maria<br />got hitched!
          </h1>
        </div>
        <div className="flex gap-6 sm:gap-10 items-center">
          <div className="rotate-[-7deg] shadow-xl flex-shrink-0">
            <Image src="/photos/1000036139.jpg" alt="Photo strip" width={658} height={3289} className="h-[52vh] sm:h-[68vh] w-auto" priority />
          </div>
          <div className="rotate-[6deg] shadow-xl flex-shrink-0">
            <Image src="/photos/1000036140.jpg" alt="Photo strip" width={656} height={3339} className="h-[52vh] sm:h-[68vh] w-auto" priority />
          </div>
        </div>
      </section>

      {/* Invite text + buttons */}
      <section className="flex flex-col items-center text-center px-6 py-16">
        <div className="w-16 h-px bg-[#F2AEBC] mx-auto mb-8" />
        <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#3D5D91] max-w-lg mx-auto leading-relaxed mb-14">
          Did you really think we were going to get MARRIED and not throw ourselves a fun ass party?
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/details"
            className="px-8 py-3 bg-[#3D5D91] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#2d4a7a] transition-colors"
          >
            The Details
          </Link>
          <Link
            href="/photos"
            className="px-8 py-3 bg-[#F2AEBC] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#d498aa] transition-colors"
          >
            Our Photos
          </Link>
          <Link
            href="/registry"
            className="px-8 py-3 bg-[#3D5D91] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#2d4a7a] transition-colors"
          >
            Gift Registry
          </Link>
        </div>
      </section>

    </div>
  )
}

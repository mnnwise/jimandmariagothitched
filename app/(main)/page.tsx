import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── MOBILE hero: photo with text overlaid upper-left ── */}
      <section className="sm:hidden relative w-full h-[55vh]">
        <Image
          src="/photos/M and J-75 copy.jpg"
          alt="Jim and Maria"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#c5dce9]/40 via-[#c5dce9]/10 to-transparent" />
        <div className="absolute top-5 left-5">
          <h1 className="font-[family-name:var(--font-script)] text-[36pt] text-[#1e3348] leading-tight rotate-[-15deg] text-center">
            <span className="block">Jim</span>
            <span className="block">and</span>
            <span className="block">Maria</span>
            <span className="block -translate-x-[5%]">got</span>
            <span className="block -translate-x-[5%]">hitched!</span>
          </h1>
        </div>
      </section>

      {/* ── DESKTOP hero: text overlaid on photo ── */}
      <section className="hidden sm:block relative w-full h-[85vh] overflow-hidden">
        <Image
          src="/photos/M and J-75 copy.jpg"
          alt="Jim and Maria"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#c5dce9]/60 via-[#c5dce9]/20 to-transparent" />
        <div className="absolute inset-0 flex items-start pt-[12%]">
          <div className="pl-[12%] max-w-[55%]">
            <h1 className="font-[family-name:var(--font-script)] text-[72pt] text-[#1e3348] leading-tight rotate-[-15deg]">
              Jim and Maria<br />got hitched!
            </h1>
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

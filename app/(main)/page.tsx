import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero — full-bleed photo with title overlaid on left */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <Image
          src="/photos/M and J-130.jpg"
          alt="Jim and Maria"
          fill
          className="object-cover object-center"
          priority
        />
        {/* dark gradient on left so text is legible over wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#c5dce9]/60 via-[#c5dce9]/20 to-transparent" />

        {/* Title overlaid — upper-left, near groom's shoulder */}
        <div className="absolute inset-0 flex items-start pt-[12%]">
          <div className="pl-[12%] max-w-[55%]">
            <h1 className="font-[family-name:var(--font-script)] text-[56pt] sm:text-[72pt] text-[#1e3348] leading-tight rotate-[-15deg]">
              Jim and Maria<br />got hitched!
            </h1>
          </div>
        </div>
      </section>

      {/* Invite text + buttons */}
      <section className="flex flex-col items-center text-center px-6 py-16">
        <div className="w-16 h-px bg-[#d4a5a5] mx-auto mb-8" />
        <p className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[#4d6b7e] max-w-lg mx-auto leading-relaxed mb-14">
          Did you think we were going to get MARRIED and not throw an epic party? Think again! We request the honor of your presence at Middle Child Clubhouse on Saturday, November 14th, 2026. More details below.
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

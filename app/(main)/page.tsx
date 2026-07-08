import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 right-1/4 w-64 h-64 rounded-full bg-[#e8c5c5]/25 blur-3xl pointer-events-none" />

        <p className="text-xs tracking-[0.3em] uppercase text-[#b06070] mb-6 font-light">
          Together forever
        </p>
        <h1 className="font-[family-name:var(--font-script)] text-[72pt] text-[#1e3348] leading-tight mb-4 rotate-[-15deg]">
          Jim and Maria<br />got hitched!
        </h1>
        <div className="w-16 h-px bg-[#d4a5a5] mx-auto my-6" />
        <p className="font-[family-name:var(--font-cormorant)] text-2xl italic font-light text-[#4d6b7e] mb-2">
          Saturday, April 25th, 2026
        </p>
        <p className="text-sm tracking-widest uppercase text-[#4d6b7e] font-light mb-14">
          Las Vegas, Nevada
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
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

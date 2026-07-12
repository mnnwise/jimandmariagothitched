export default function DetailsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="text-center mb-10 md:mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-[#b06070] mb-4 font-light">Mark your calendars</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light text-[#1e3348] mb-4">
          The Details
        </h1>
        <div className="w-12 h-px bg-[#d4a5a5] mx-auto" />
      </div>

      <div className="space-y-10 text-center">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#b06070] mb-2 font-light">When</p>
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#1e3348]">Saturday, November 14th, 2026</p>
          <p className="text-sm text-[#4d6b7e] font-light mt-1">More details to follow soon</p>
        </div>

        <div className="w-8 h-px bg-[#d4a5a5] mx-auto" />

        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#b06070] mb-2 font-light">Where</p>
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#1e3348]">Middle Child Clubhouse</p>
          <p className="text-sm text-[#4d6b7e] font-light mt-1">More details to follow soon</p>
        </div>
      </div>
    </div>
  )
}

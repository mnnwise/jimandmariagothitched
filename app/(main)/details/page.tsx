export default function DetailsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16">

      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-[#b06070] mb-4 font-light">Mark your calendars</p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light text-[#1e3348] mb-4">
          The Details
        </h1>
        <div className="w-12 h-px bg-[#d4a5a5] mx-auto" />
      </div>

      <div className="space-y-12">

        {/* The party */}
        <section>
          <p className="text-xs tracking-[0.25em] uppercase text-[#b06070] mb-4 font-light">The party</p>
          <p className="text-sm text-[#4d6b7e] font-light leading-relaxed">
            We are doing a full buy out of one of our favorite Fishtown restaurants, Middle Child, to host this shindig. Please join us for drinks, dinner, and dancing on Saturday, November 14th at 6:30pm. We&apos;ll close things down around midnight.
          </p>
        </section>

        <div className="w-8 h-px bg-[#d4a5a5]" />

        {/* Attire */}
        <section>
          <p className="text-xs tracking-[0.25em] uppercase text-[#b06070] mb-4 font-light">Suggested attire</p>
          <p className="text-sm text-[#4d6b7e] font-light leading-relaxed">
            The happy couple encourages you to dress as fun and wild as you dare! Do you have a vegas showgirl outfit gathering dust in your closet? Care to give your own wedding dress another moment in the sun? Any random chance you may or may not have an Austin Powers costume tucked away in the drawer somewhere? The more over the top, the better.
          </p>
          <p className="text-sm text-[#4d6b7e] font-light leading-relaxed mt-4">
            Alternatively, cocktail attire also works :)
          </p>
        </section>

        <div className="w-8 h-px bg-[#d4a5a5]" />

        {/* Accommodations */}
        <section>
          <p className="text-xs tracking-[0.25em] uppercase text-[#b06070] mb-4 font-light">Local accommodations</p>
          <p className="text-sm text-[#4d6b7e] font-light leading-relaxed mb-6">
            While we have not reserved a room block anywhere in particular, there are several lovely boutique hotels in the area that we can recommend:
          </p>
          <div className="space-y-5">
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#1e3348]">Anna &amp; Bel</p>
              <p className="text-xs text-[#4d6b7e] font-light mb-1">5 minute drive to Middle Child</p>
              <a href="#" className="text-xs tracking-[0.15em] uppercase font-light text-[#b06070] hover:text-[#1e3348] transition-colors border-b border-[#e8c5c5] pb-0.5">
                Reservations
              </a>
            </div>
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#1e3348]">The Gas Lamp Hotel</p>
              <p className="text-xs text-[#4d6b7e] font-light mb-1">10 minute drive to Middle Child</p>
              <a href="#" className="text-xs tracking-[0.15em] uppercase font-light text-[#b06070] hover:text-[#1e3348] transition-colors border-b border-[#e8c5c5] pb-0.5">
                Reservations
              </a>
            </div>
          </div>
        </section>

        <div className="w-8 h-px bg-[#d4a5a5]" />

        {/* Transit */}
        <section>
          <p className="text-xs tracking-[0.25em] uppercase text-[#b06070] mb-4 font-light">Transit and parking</p>
          <p className="text-sm text-[#4d6b7e] font-light leading-relaxed mb-4">
            Street parking in the neighborhood is notoriously tricky but can be done. There is a public pay-to-park lot a few blocks north of the restaurant at 1320 N Front St. A breeze of a walk to the party.
          </p>
          <p className="text-sm text-[#4d6b7e] font-light leading-relaxed">
            Alternatively, the restaurant is just steps away from the Girard stop on the Market-Frankford line if the L is more your vibe.
          </p>
        </section>

      </div>
    </div>
  )
}

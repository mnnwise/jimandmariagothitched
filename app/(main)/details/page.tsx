export default function DetailsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16">

      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-[#6C0820] mb-4 font-light">Mark your calendars</p>
        <h1 className="font-[family-name:var(--font-script)] text-6xl md:text-7xl text-[#F2AEBC] mb-4">
          The Details
        </h1>
        <div className="w-12 h-px bg-[#F2AEBC] mx-auto" />
      </div>

      <div className="space-y-12">

        {/* The party */}
        <section>
          <p className="text-sm tracking-[0.25em] uppercase text-[#6C0820] mb-4 font-semibold">The party</p>
          <p className="text-base text-[#3D5D91] font-light leading-relaxed">
            We are renting out one of our favorite Fishtown restaurants, Middle Child Clubhouse (1232 N Front St.), for the evening. Please join us for drinks, dinner, and dancing on Saturday, November 14th at 6pm. We&apos;ll close things down around midnight.
          </p>
        </section>

        <div className="w-8 h-px bg-[#F2AEBC]" />

        {/* Attire */}
        <section>
          <p className="text-sm tracking-[0.25em] uppercase text-[#6C0820] mb-4 font-semibold">Suggested attire</p>
          <p className="text-base text-[#3D5D91] font-light leading-relaxed">
            Technically speaking, we&apos;re looking for cocktail attire, but the happy couple encourages you to dress as fun and wild as you dare! The more over the top, the better.
          </p>
        </section>

        <div className="w-8 h-px bg-[#F2AEBC]" />

        {/* Accommodations */}
        <section>
          <p className="text-sm tracking-[0.25em] uppercase text-[#6C0820] mb-4 font-semibold">Local accommodations</p>
          <p className="text-base text-[#3D5D91] font-light leading-relaxed mb-6">
            While we have not reserved a room block anywhere in particular, there are several lovely boutique hotels in the area that we can recommend:
          </p>
          <div className="space-y-5">
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#3D5D91]">Anna &amp; Bel</p>
              <p className="text-xs text-[#3D5D91] font-light mb-1">5 minute drive to Middle Child</p>
              <a href="https://annaandbel.com/reservations" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.15em] uppercase font-light text-[#6C0820] hover:text-[#4a0016] transition-colors border-b border-[#6C0820] pb-0.5">
                Reservations
              </a>
            </div>
            <div>
              <p className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[#3D5D91]">The Gas Lamp Hotel</p>
              <p className="text-xs text-[#3D5D91] font-light mb-1">10 minute drive to Middle Child</p>
              <a href="https://thegaslamphotel.com/book" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.15em] uppercase font-light text-[#6C0820] hover:text-[#4a0016] transition-colors border-b border-[#6C0820] pb-0.5">
                Reservations
              </a>
            </div>
          </div>
        </section>

        <div className="w-8 h-px bg-[#F2AEBC]" />

        {/* Transit */}
        <section>
          <p className="text-sm tracking-[0.25em] uppercase text-[#6C0820] mb-4 font-semibold">Transit and parking</p>
          <p className="text-base text-[#3D5D91] font-light leading-relaxed mb-4">
            We strongly recommend taking a rideshare to the party. Street parking in the neighborhood is notoriously tricky but can be done. There is a public pay-to-park lot a few blocks north of the restaurant at 1320 N Front St. A breeze of a walk to the party.
          </p>
          <p className="text-base text-[#3D5D91] font-light leading-relaxed">
            Alternatively, the restaurant is just steps away from the Girard stop on the Market-Frankford line if the L is more your vibe.
          </p>
        </section>

      </div>
    </div>
  )
}

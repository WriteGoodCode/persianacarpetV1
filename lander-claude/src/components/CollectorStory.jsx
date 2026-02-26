import useScrollFadeIn from '../hooks/useScrollFadeIn'

export default function CollectorStory() {
  const ref1 = useScrollFadeIn(0)
  const ref2 = useScrollFadeIn(100)
  const ref3 = useScrollFadeIn(200)
  const ref4 = useScrollFadeIn(300)

  return (
    <section className="bg-sand py-20 sm:py-28 md:py-36 px-6">
      <div className="max-w-7xl mx-auto md:pl-[8vw] md:max-w-3xl md:mr-auto md:ml-[8vw]">
        <p
          ref={ref1}
          className="fade-in-section font-heading text-espresso text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-none mb-12"
        >
          Not a showroom. Not a warehouse. A private collection, built over decades.
        </p>

        <div className="space-y-8 font-body text-espresso/80 text-base sm:text-lg leading-relaxed max-w-[65ch]">
          <p ref={ref2} className="fade-in-section">
            Persiana Carpets works outside the conventional trade. We acquire directly from
            families, estates, and private collectors across Iran — pieces that commercial
            dealers never see. Each rug is hand-selected for its artistry, provenance, and
            condition. We hold a small, curated inventory at any given time, because we
            believe the right piece finds the right home.
          </p>

          <p ref={ref3} className="fade-in-section">
            Every piece we offer comes with a 30-day authentication guarantee. We document
            origin, materials, and age with the same rigour a gallery applies to fine art.
            If a rug doesn't meet our standard of attribution, it doesn't enter our collection.
            That promise has kept the trust of collectors across the south of England for years.
          </p>

          <p ref={ref4} className="fade-in-section">
            We show by appointment only — in person, at our viewing room in Woodley, Reading.
            No pressure, no sales theatre. You come, you see the pieces, you take your time.
            Private viewing by appointment means exactly that: your visit, your pace, your decision.
          </p>
        </div>
      </div>
    </section>
  )
}

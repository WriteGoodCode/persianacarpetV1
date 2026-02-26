import useScrollFadeIn from '../hooks/useScrollFadeIn'

const PHONE = 'tel:07905350666'
const PHONE_DISPLAY = '07905 350666'

export default function AuthCallout() {
  const ref = useScrollFadeIn(0)

  return (
    <section className="bg-terracotta py-16 sm:py-24 px-6">
      <div ref={ref} className="fade-in-section max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-sand text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-none mb-6">
          Every piece, authenticated
        </h2>
        <p className="font-body text-sand/85 text-base sm:text-lg leading-relaxed mb-8 max-w-[55ch] mx-auto">
          We guarantee the provenance, materials, and age of every rug we sell.
          If it doesn't meet our standard of attribution within 30 days, we take it back. No questions.
        </p>
        <a
          href={PHONE}
          className="btn-hover inline-flex items-center gap-2 bg-sand text-terracotta font-body font-semibold px-6 py-3 rounded-full text-base active:scale-[0.98] active:-translate-y-[1px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Enquire — {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  )
}

const PHONE = 'tel:07905350666'
const PHONE_DISPLAY = '07905 350666'

export default function Footer() {
  return (
    <footer
      className="bg-espresso text-sand px-6 pt-16 sm:pt-24 pb-8 rounded-t-3xl"
      style={{ backgroundColor: '#2C1810' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Final CTA */}
        <h2 className="font-heading text-sand text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-none mb-4">
          Ready to find your piece?
        </h2>
        <p className="font-body text-sand/60 text-base mb-8">
          Call us to arrange a private viewing. No obligation, no pressure.
        </p>
        <a
          href={PHONE}
          className="btn-hover inline-flex items-center gap-2 bg-terracotta text-sand font-body font-semibold px-6 py-3 rounded-full text-base active:scale-[0.98] active:-translate-y-[1px] mb-16"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {PHONE_DISPLAY}
        </a>

        {/* Divider */}
        <div className="border-t border-sand/10 pt-8">
          <p className="font-heading text-sand text-lg mb-1">Persiana Carpets</p>
          <p className="font-body text-sand/40 text-sm mb-1">
            Museum-quality Persian rugs from private collections
          </p>
          <p className="font-body text-sand/40 text-sm mb-1">
            Woodley, Reading, UK · {PHONE_DISPLAY}
          </p>
          <p className="font-body text-sand/25 text-xs mt-6">
            &copy; {new Date().getFullYear()} Persiana Carpets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const PHONE = 'tel:07905350666'
const PHONE_DISPLAY = '07905 350666'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden">
      {/* Hero image — right-weighted on desktop, full cover on mobile */}
      <img
        src="https://persianacarpets.com/wp-content/uploads/2026/01/persian-carpet-for-sale.webp"
        alt="Museum-quality Persian carpet displayed in a private gallery setting"
        className="absolute inset-0 w-full h-full object-cover object-right-top"
        loading="eager"
      />

      {/* Gradient: left-heavy fade for text legibility on desktop, bottom fade on mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/40 to-transparent md:block hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent md:hidden" />

      {/* Content — left-aligned asymmetric layout */}
      <div
        className="relative min-h-[100dvh] flex items-end md:items-center"
        style={{
          animation: 'heroFadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        }}
      >
        <div className="w-full px-6 pb-12 sm:px-10 md:pl-[8vw] md:pr-0 md:pb-0 md:max-w-[55%] lg:max-w-[48%]">
          <h1 className="font-heading text-sand text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none mb-5">
            Pieces that commercial dealers never see
          </h1>
          <p className="font-body text-sand/90 text-base sm:text-lg max-w-[55ch] mb-7 leading-relaxed">
            Museum-quality Persian rugs, sourced from private collections across Iran.
            Available for private viewing in Reading, England.
          </p>

          {/* Trust badges */}
          <div className="flex flex-col gap-3 mb-9">
            <span className="flex items-center gap-2 text-sand/80 text-sm font-body">
              <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              30-day authentication guarantee
            </span>
            <span className="flex items-center gap-2 text-sand/80 text-sm font-body">
              <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Private viewing by appointment
            </span>
          </div>

          <a
            href={PHONE}
            className="btn-hover inline-flex items-center gap-2 bg-terracotta text-sand font-body font-semibold px-6 py-3 rounded-full text-base active:scale-[0.98] active:-translate-y-[1px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

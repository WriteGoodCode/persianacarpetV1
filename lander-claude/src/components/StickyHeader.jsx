import { useState, useEffect } from 'react'

const PHONE = 'tel:07905350666'
const PHONE_DISPLAY = '07905 350666'

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl">
      <div
        className={`
          flex items-center justify-between px-5 py-3 rounded-full
          border border-espresso/10
          transition-all duration-500
          ${scrolled
            ? 'bg-sand/90 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(44,24,16,0.08)] border-sand-dark/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
            : 'bg-sand/70 backdrop-blur-sm border-sand-dark/10'
          }
        `}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-heading text-espresso text-sm sm:text-base font-bold whitespace-nowrap">
            Persiana Carpets
          </span>
          <span className="hidden sm:inline text-espresso/50 text-xs font-body tracking-wide">
            Woodley, Reading
          </span>
        </div>

        <a
          href={PHONE}
          className="btn-hover flex items-center gap-2 bg-terracotta text-sand text-sm font-body font-semibold px-4 py-2 rounded-full whitespace-nowrap active:scale-[0.98] active:-translate-y-[1px]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  )
}

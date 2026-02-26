import { useEffect, useRef } from 'react'

export default function useParallax(speed = 0.08) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const viewH = window.innerHeight
          const center = rect.top + rect.height / 2 - viewH / 2
          const offset = center * speed
          const clamped = Math.max(-30, Math.min(30, offset))
          el.style.transform = `translateY(${clamped}px) scale(1.02)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}

import useScrollFadeIn from '../hooks/useScrollFadeIn'
import useParallax from '../hooks/useParallax'

const rugs = [
  {
    id: 1,
    src: 'https://persianacarpets.com/wp-content/uploads/2026/02/kashan-1924-vase-flower-persian-run.webp',
    alt: 'Kashan vase flower Persian rug woven in 1924',
    origin: 'Kashan, Iran',
    year: '1924',
    materials: 'Wool, organic dyes',
    dimensions: '1.0 × 1.5 m',
    desc: 'Vase flower design',
  },
  {
    id: 2,
    src: 'https://persianacarpets.com/wp-content/uploads/2026/02/isfahan-1983-nomadic-life-persian-rug.webp',
    alt: 'Isfahan pictorial Persian rug depicting nomadic life, woven in 1983',
    origin: 'Isfahan, Iran',
    year: '1983',
    materials: 'Kurk wool & silk',
    dimensions: '1.52 × 1.10 m',
    desc: 'Pictorial scene of nomadic life',
  },
  {
    id: 3,
    src: 'https://persianacarpets.com/wp-content/uploads/2026/02/tabriz-1964-king-party-persian-rug.webp',
    alt: 'Tabriz Persian rug depicting The King Party, woven in 1964',
    origin: 'Tabriz, Iran',
    year: '1964',
    materials: 'Wool & fine fur',
    dimensions: '2.0 × 3.0 m',
    desc: '"The King Party"',
  },
  {
    id: 4,
    src: 'https://persianacarpets.com/wp-content/uploads/2026/02/arak-1984-blossom-sarogh-persian-rug.webp',
    alt: 'Arak Sarogh-style blossom Persian rug woven in 1984',
    origin: 'Arak, Iran',
    year: '1984',
    materials: 'Wool',
    dimensions: '3.0 × 1.95 m',
    desc: 'Sarogh-style vase flower',
  },
]

function RugCard({ rug, index }) {
  const textRef = useScrollFadeIn(100)
  const imgRef = useParallax(0.06)

  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-8 sm:py-12">
      {/* Rug image */}
      <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-10">
        <img
          ref={imgRef}
          src={rug.src}
          alt={rug.alt}
          className="parallax-img w-full h-auto object-contain rounded-sm"
          loading="lazy"
        />
      </div>

      {/* Caption card */}
      <div
        ref={textRef}
        className="fade-in-section absolute bottom-12 left-6 sm:left-10 md:left-16 bg-sand/95 backdrop-blur-sm rounded-lg p-5 sm:p-6 max-w-xs shadow-[0_12px_40px_-8px_rgba(44,24,16,0.2)]"
      >
        <p className="font-heading text-espresso text-lg mb-1">{rug.desc}</p>
        <p className="font-body text-espresso/60 text-sm mb-3">{rug.origin} · {rug.year}</p>
        <div className="flex flex-col gap-1 text-xs font-body text-espresso/50">
          <span>{rug.materials}</span>
          <span>{rug.dimensions}</span>
        </div>
      </div>
    </div>
  )
}

export default function RugShowcase() {
  const headingRef = useScrollFadeIn(0)

  return (
    <section className="bg-espresso py-16 sm:py-24" style={{ backgroundColor: '#1A1510' }}>
      <h2
        ref={headingRef}
        className="fade-in-section font-heading text-sand text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-none text-center mb-4"
      >
        From the collection
      </h2>
      <p className="font-body text-sand/50 text-sm text-center mb-16">
        A selection of pieces currently available
      </p>

      <div className="space-y-8 sm:space-y-12">
        {rugs.map((rug, i) => (
          <RugCard key={rug.id} rug={rug} index={i} />
        ))}
      </div>
    </section>
  )
}

import useScrollFadeIn from '../hooks/useScrollFadeIn'

const steps = [
  {
    num: '1',
    title: 'Get in Touch',
    desc: "Call or send a message. Tell us what you're looking for \u2014 or simply that you'd like to see what we have.",
  },
  {
    num: '2',
    title: 'See the Pieces',
    desc: "We arrange a private viewing at our Reading showroom. No crowds, no pressure \u2014 just you and the rugs.",
  },
  {
    num: '3',
    title: 'Decide Without Pressure',
    desc: "Take your time. The right rug speaks to you. We're here to answer questions, not to sell.",
  },
]

function StepRow({ step, delay, align }) {
  const ref = useScrollFadeIn(delay)
  return (
    <div
      ref={ref}
      className={`fade-in-section flex items-start gap-6 ${
        align === 'right' ? 'md:ml-auto' : ''
      }`}
      style={{ maxWidth: '480px' }}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-terracotta text-terracotta font-heading text-lg">
        {step.num}
      </div>
      <div>
        <h3 className="font-heading text-espresso italic text-lg mb-2">{step.title}</h3>
        <p className="font-body text-espresso/70 text-base leading-relaxed max-w-[55ch]">{step.desc}</p>
      </div>
    </div>
  )
}

export default function HowToBuy() {
  const headingRef = useScrollFadeIn(0)

  /* Zig-zag alignment: left, right-offset, left — avoids banned 3-col equal grid */
  const alignments = ['left', 'right', 'left']

  return (
    <section className="py-20 sm:py-28 px-6" style={{ backgroundColor: '#EDE2D4' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          ref={headingRef}
          className="fade-in-section font-heading text-espresso text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-none mb-16"
        >
          How it works
        </h2>

        <div className="flex flex-col gap-14">
          {steps.map((step, i) => (
            <StepRow
              key={step.num}
              step={step}
              delay={i * 120}
              align={alignments[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

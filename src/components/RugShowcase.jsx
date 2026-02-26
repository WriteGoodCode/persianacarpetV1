import { useEffect, useRef } from 'react';

const rugs = [
    {
        origin: "Kashan, Iran",
        year: "Woven 1924",
        desc: "Vase flower design in wool with organic dyes.",
        dims: "1.0 × 1.5m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/kashan-1924-vase-flower-persian-run.webp"
    },
    {
        origin: "Isfahan, Iran",
        year: "Woven 1983",
        desc: "Pictorial scene woven in Kurk wool and silk.",
        dims: "1.52 × 1.10m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/isfahan-1983-nomadic-life-persian-rug.webp"
    },
    {
        origin: "Tabriz, Iran",
        year: "Woven 1964",
        desc: "“The King Party” in wool and fine fur.",
        dims: "2.0 × 3.0m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/tabriz-1964-king-party-persian-rug.webp"
    },
    {
        origin: "Arak, Iran",
        year: "Woven 1984",
        desc: "Sarogh style vase flower in wool.",
        dims: "3.0 × 1.95m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/arak-1984-blossom-sarogh-persian-rug.webp"
    }
];

export function RugShowcase() {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 });

        const rugs = containerRef.current?.querySelectorAll('.rug-container');
        // For parallax, simpler to use a generic event listener locally instead of tracking all elements in animation frames
        const handleScroll = () => {
            rugs?.forEach(rug => {
                const rect = rug.getBoundingClientRect();
                // If rug is somewhat in view
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const img = rug.querySelector('img');
                    const speed = 0.05; // very subtle parallax per spec
                    const yPos = -(rect.top * speed);
                    img.style.transform = `translateY(${yPos}px) scale(1.02)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        rugs?.forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section ref={containerRef} className="bg-[#0a0a0e] pt-32 pb-12 w-full flex flex-col items-center">
            <div className="w-full text-center mb-12 md:mb-16 max-w-2xl px-6">
                <h2 className="font-serif italic text-4xl md:text-5xl text-ivory mb-6 tracking-tight">The Gallery</h2>
                <p className="font-sans font-light text-ivory/60 text-lg">Curated artifacts from our private showing.</p>
            </div>

            <div className="w-full flex flex-col gap-32 focus:outline-none focus:ring-0">
                {rugs.map((rug, idx) => (
                    <article
                        key={idx}
                        className="rug-container fade-up relative w-[95%] max-w-6xl mx-auto h-[85vh] md:h-[95vh] rounded-[2rem] overflow-hidden bg-[#111] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
                    >
                        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                            <img
                                src={rug.img}
                                alt={`${rug.origin} Persian Rug`}
                                className="w-full h-full object-contain mix-blend-normal transition-transform duration-300 ease-out p-4 md:p-8"
                            />
                            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none rounded-[2rem]" />
                        </div>

                        {/* Caption Card */}
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 bg-ivory/85 backdrop-blur-md text-obsidian p-4 md:p-6 rounded-[1rem] shadow-xl max-w-[220px] md:max-w-[280px] flex flex-col gap-3">
                            <div>
                                <h3 className="font-serif italic text-xl md:text-2xl font-semibold mb-1">{rug.origin}</h3>
                                <p className="font-mono text-[10.5px] uppercase tracking-widest text-obsidian/70 font-semibold">{rug.year}</p>
                            </div>
                            <p className="font-sans text-xs font-medium leading-relaxed text-obsidian/90 mt-1">
                                {rug.desc}
                            </p>
                            <div className="mt-3 pt-3 border-t border-obsidian/15 flex items-center justify-between">
                                <span className="font-sans text-[10.5px] tracking-wider uppercase font-semibold text-obsidian/70">Dimensions</span>
                                <span className="font-mono text-xs font-medium">{rug.dims}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

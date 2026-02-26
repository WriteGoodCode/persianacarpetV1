import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

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
    const zoomContainerRef = useRef(null);
    const zoomImageRef = useRef(null);
    const ctaRef = useRef(null);
    const closeBtnRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [panPos, setPanPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Timer for CTA
    const ctaTimerRef = useRef(null);

    // Initial scroll setup
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 });

        const rugElements = containerRef.current?.querySelectorAll('.rug-container');

        const handleScroll = () => {
            rugElements?.forEach(rug => {
                const rect = rug.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const img = rug.querySelector('.parallax-img');
                    if (img) {
                        const speed = 0.05;
                        const yPos = -(rect.top * speed);
                        img.style.transform = `translateY(${yPos}px) scale(1.02)`;
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        rugElements?.forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Zoom Effect & Controls
    useEffect(() => {
        if (!selectedImage) return;

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            // Native fallback for mobile
            window.open(selectedImage, '_blank');
            setSelectedImage(null);
            return;
        }

        // Open Animation
        document.body.style.overflow = 'hidden'; // Focus trap / lock scroll

        gsap.to(zoomContainerRef.current, {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out"
        });

        gsap.fromTo(zoomImageRef.current,
            { scale: 0.95, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "expo.out", // Emulates spring physical feel without actual spring stiffness parameter
                clearProps: "scale" // Clear so panning transform isn't fighting it
            }
        );

        // CTA Timer
        ctaTimerRef.current = setTimeout(() => {
            gsap.to(ctaRef.current, {
                autoAlpha: 0.7,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        }, 3000);

        // Escape key listener
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeZoom();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (ctaTimerRef.current) clearTimeout(ctaTimerRef.current);
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    const closeZoom = () => {
        if (ctaTimerRef.current) clearTimeout(ctaTimerRef.current);

        gsap.to([zoomContainerRef.current, zoomImageRef.current, ctaRef.current], {
            autoAlpha: 0,
            scale: 0.98,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                setSelectedImage(null);
                setPanPos({ x: 0, y: 0 });
            }
        });
    };

    // Panning logic
    useEffect(() => {
        if (!selectedImage || window.innerWidth < 768) return;

        const handleMouseMove = (e) => {
            if (!zoomImageRef.current || !zoomContainerRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate percentage from center (-0.5 to 0.5)
            const xPct = (clientX / innerWidth) - 0.5;
            const yPct = (clientY / innerHeight) - 0.5;

            // Move image opposite to mouse, scaled by 30% of window size for inertia/heft
            const moveX = -(xPct * innerWidth * 0.3);
            const moveY = -(yPct * innerHeight * 0.3);

            // Use GSAP for smooth inertia interpolation
            gsap.to(zoomImageRef.current, {
                x: moveX,
                y: moveY,
                duration: 1.5,
                ease: "power3.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [selectedImage]);

    return (
        <>
            <section id="carpets" ref={containerRef} className="bg-[#0a0a0e] pt-32 pb-12 w-full flex flex-col items-center relative z-10">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .zoom-cursor-hover { cursor: zoom-in; }
                    .is-zoomed { cursor: grab; }
                    .is-zoomed:active { cursor: grabbing; }
                `}} />

                <div className="w-full text-center mb-12 md:mb-16 max-w-2xl px-6">
                    <h2 className="font-serif italic text-4xl md:text-5xl text-ivory mb-6 tracking-tight">The Gallery</h2>
                    <p className="font-sans font-medium text-ivory/60 text-lg">Curated artifacts from our private showing.</p>
                    <p className="font-sans font-light text-ivory/40 text-base mt-2">Pieces starting from £1,000 to over £50,000</p>
                </div>

                <div className="w-full flex flex-col gap-32 focus:outline-none focus:ring-0">
                    {rugs.map((rug, idx) => (
                        <article
                            key={idx}
                            className="rug-container fade-up relative w-[95%] max-w-6xl mx-auto h-[85vh] md:h-[95vh] rounded-[2rem] overflow-hidden bg-[#111] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] group zoom-cursor-hover"
                            onClick={() => setSelectedImage(rug.img)}
                        >
                            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                                <img
                                    src={rug.img}
                                    alt={`${rug.origin} Persian Rug`}
                                    className="parallax-img w-full h-full object-contain mix-blend-normal transition-transform duration-300 ease-out p-4 md:p-8"
                                />
                                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none rounded-[2rem]" />

                                {/* Subtle magnifier hint that fades in on desktop hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block pointer-events-none" />
                            </div>

                            {/* Caption Card - Frosted Gaussian Blur like the TopBar */}
                            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 bg-white/80 backdrop-blur-[40px] backdrop-saturate-200 border border-white/40 text-obsidian p-4 md:p-6 rounded-[1rem] shadow-xl max-w-[220px] md:max-w-[280px] flex flex-col gap-3 pointer-events-auto cursor-default" onClick={(e) => e.stopPropagation()}>
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

            {/* Fullscreen Zoom Overlay */}
            <div
                ref={zoomContainerRef}
                className="fixed inset-0 z-[100] bg-[#050508]/95 hidden md:flex items-center justify-center opacity-0 invisible"
                onClick={closeZoom} // Click outside to close
            >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden is-zoomed">
                    {selectedImage && (
                        <img
                            ref={zoomImageRef}
                            src={selectedImage}
                            alt="Magnified Rug Detail"
                            className="max-w-none w-[130vw] h-[130vh] object-contain select-none pointer-events-none object-center"
                            draggable="false"
                        />
                    )}
                </div>

                {/* Close Button */}
                <button
                    ref={closeBtnRef}
                    onClick={(e) => { e.stopPropagation(); closeZoom(); }}
                    className="absolute top-8 right-8 z-[110] text-white/50 hover:text-white transition-colors duration-300 p-2"
                    aria-label="Close zoomed view"
                >
                    <X className="w-8 h-8" strokeWidth={1.5} />
                </button>

                {/* Optional CTA */}
                <a
                    ref={ctaRef}
                    href="tel:07905350666"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[110] text-white opacity-0 invisible translate-y-4 font-sans text-sm tracking-wide border-b border-white/30 pb-1 hover:opacity-100 hover:border-white transition-all duration-300"
                >
                    Request private viewing
                </a>
            </div>
        </>
    );
}

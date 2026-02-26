import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

export function Hero() {
    const containerRef = useRef(null);

    // Use Vanilla JS observer for simple fade ups rather than heavy GSAP
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = containerRef.current?.querySelectorAll('.fade-up');
        elements?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-[10vh] px-6 md:px-12 lg:px-24"
        >
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0 bg-obsidian">
                <img
                    src="https://persianacarpets.com/wp-content/uploads/2026/01/persian-carpet-for-sale.webp"
                    alt="Persian Rug Detail"
                    className="w-full h-full object-cover opacity-90"
                />
                {/* Only bottom gradient to not wash out the rug, per new spec */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent mix-blend-multiply opacity-80 h-3/4 bottom-0 mt-auto" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-start gap-4 md:gap-6">
                <div className="flex flex-col gap-1 md:gap-2">
                    <h1 className="fade-up font-sans font-medium tracking-widest text-champagne uppercase text-[10px] md:text-sm drop-shadow-md">
                        Persian Carpets and Rugs
                    </h1>

                    <h2 className="fade-up font-serif italic text-4xl md:text-6xl lg:text-[5rem] leading-[1.05] text-ivory tracking-tight text-balance shadow-black drop-shadow-lg">
                        Pieces commercial carpet dealers never see.
                    </h2>
                </div>

                <h2 className="fade-up font-sans text-xl md:text-2xl font-light text-ivory/90 leading-relaxed text-balance drop-shadow-md mt-2 md:mt-0">
                    Handmade Persian Rugs selected for mastery, not turnover.
                </h2>

                <div className="fade-up mt-2 flex flex-col md:flex-row gap-4 md:gap-8 max-w-lg mb-6 text-sm font-sans tracking-wide text-ivory/80">
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-champagne text-obsidian">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                        UK-wide delivery.
                    </div>
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-champagne text-obsidian">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                        Private viewing by appointment
                    </div>
                </div>

                <div className="fade-up flex flex-col items-center md:items-start gap-3">
                    <a
                        href="tel:07905350666"
                        className="inline-flex items-center justify-center rounded-full font-medium transition-transform duration-500 will-change-transform hover:scale-[1.03] bg-ivory text-obsidian px-8 py-3 md:px-10 md:py-3.5 text-base md:text-lg"
                    >
                        Call: 07905 350666
                    </a>
                    <p className="font-sans text-ivory/60 text-sm tracking-wide md:ml-4 fade-up">
                        Call to arrange a viewing
                    </p>
                </div>
            </div>
        </section>
    );
}

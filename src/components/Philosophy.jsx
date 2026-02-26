import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Philosophy() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax Background
            gsap.to('.parallax-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Word-by-word reveal
            gsap.from('.manifesto-word', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 65%',
                },
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const line1 = "Most dealers focus on: turnover and margin.";
    const line2_1 = "We focus on: ";
    const line2_2 = "mastery.";

    return (
        <section
            ref={containerRef}
            className="relative w-full py-40 overflow-hidden bg-slate text-center flex flex-col items-center justify-center px-6"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="parallax-bg absolute -inset-[20%] w-[140%] h-[140%] bg-[url('https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-slate/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
                <p className="font-sans font-medium text-lg md:text-xl text-ivory/60 tracking-wider">
                    {line1.split(' ').map((word, i) => (
                        <span key={i} className="manifesto-word inline-block mr-2">{word}</span>
                    ))}
                </p>

                <h2 className="font-serif italic text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-ivory mt-4 text-balance">
                    {line2_1.split(' ').map((word, i) => (
                        <span key={i} className="manifesto-word inline-block mr-3 md:mr-4">{word}</span>
                    ))}
                    <span className="manifesto-word inline-block text-champagne">{line2_2}</span>
                </h2>
            </div>
        </section>
    );
}

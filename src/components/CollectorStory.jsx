import { useEffect, useRef } from 'react';

export function CollectorStory() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.15 });

        const paragraphs = sectionRef.current?.querySelectorAll('.fade-up');
        // Add staggered inline transition delays
        paragraphs?.forEach((el, index) => {
            el.style.transitionDelay = `${index * 150}ms`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-ivory text-obsidian pt-32 md:pt-48 pb-16 md:pb-24 px-6">
            <div className="max-w-3xl mx-auto flex flex-col gap-10">

                <h2 className="fade-up font-serif italic text-4xl md:text-5xl text-obsidian mb-6 tracking-tight drop-shadow-sm">
                    The Collector Difference in Persian Carpets
                </h2>

                <div className="flex flex-col gap-8 font-sans font-light text-xl text-obsidian/85 leading-[1.8] text-balance">
                    <p className="fade-up">
                        Dr. Hossein Donyavi and Dr. Manoochehr Salahi have spent thirty years pursuing exceptional Persian carpets.
                    </p>

                    <p className="fade-up">
                        Not as dealers, but as collectors who love the craft.
                    </p>

                    <p className="fade-up">
                        Every summer they spend months in Iran, visiting auctions, private collections, and artisan workshops across Tabriz, Isfahan, Kerman, and Shiraz.
                    </p>

                    <p className="fade-up">
                        They go where the exceptional pieces are.
                    </p>

                    <p className="fade-up">
                        Both trained as landscape architects; careers spent understanding how materials and craftsmanship shape a space.
                    </p>

                    <p className="fade-up">
                        That eye now serves you.
                    </p>
                </div>

            </div>
        </section>
    );
}

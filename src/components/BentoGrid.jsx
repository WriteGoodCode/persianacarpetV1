import { useEffect, useRef } from 'react';

export function BentoGrid() {
    const gridRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const items = gridRef.current?.querySelectorAll('.fade-up');
        items?.forEach((el, index) => {
            el.style.transitionDelay = `${index * 150}ms`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-ivory text-obsidian pt-12 md:pt-24 pb-32 md:pb-48 px-6">
            <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[1fr]">

                {/* Private Viewing - Wide */}
                <div className="fade-up md:col-span-2 bg-[#f4f0ea] border border-obsidian/5 p-8 md:p-12 rounded-[2rem] flex flex-col justify-end min-h-[250px] shadow-sm">
                    <h3 className="font-serif italic text-2xl md:text-3xl text-obsidian mb-3">Private Viewing, By Appointment</h3>
                    <p className="font-sans text-obsidian/70 leading-relaxed text-lg max-w-lg">
                        No retail floor. We lay out selected pieces at our Woodley showroom, or ship to you anywhere in the UK.
                    </p>
                </div>

                {/* Verified Authentic - Tall */}
                <div className="fade-up md:row-span-2 bg-obsidian text-ivory p-8 md:p-12 rounded-[2rem] flex flex-col justify-between shadow-xl">
                    <div className="w-12 h-12 bg-champagne/20 rounded-full flex items-center justify-center mb-12">
                        <div className="w-3 h-3 bg-champagne rounded-full" />
                    </div>
                    <div>
                        <h3 className="font-serif italic text-2xl md:text-3xl text-ivory mb-3">Verified Authentic</h3>
                        <p className="font-sans text-ivory/70 leading-relaxed text-lg">
                            30-day independent authentication guarantee. Have it certified. Full refund if it fails.
                        </p>
                    </div>
                </div>

                {/* Carpets Others Miss - Square */}
                <div className="fade-up bg-champagne text-obsidian p-8 md:p-10 rounded-[2rem] flex flex-col justify-end shadow-sm">
                    <h3 className="font-serif italic text-2xl text-obsidian mb-2">Carpets Others Miss</h3>
                    <p className="font-sans text-obsidian/85 leading-relaxed font-medium">
                        Commercial dealers buy for turnover. We select for mastery.
                    </p>
                </div>

                {/* Collectors - Square */}
                <div className="fade-up bg-[#f4f0ea] border border-obsidian/5 p-8 md:p-10 rounded-[2rem] flex flex-col justify-end shadow-sm">
                    <h3 className="font-serif italic text-2xl text-obsidian mb-2">Collectors, Not Salespeople</h3>
                    <p className="font-sans text-obsidian/70 leading-relaxed">
                        Your questions answered by the person who found the piece. Every question answered firsthand.
                    </p>
                </div>

            </div>
        </section>
    );
}

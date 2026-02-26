import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

export function TopBar() {
    const barRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                // Frosted glass effect: lower opacity on the white background, but more blur
                barRef.current?.classList.add('bg-white/40', 'backdrop-blur-xl', 'backdrop-saturate-150', 'shadow-sm', 'border-white/20', 'text-obsidian');
                barRef.current?.classList.remove('bg-transparent', 'border-transparent', 'text-ivory');
            } else {
                barRef.current?.classList.remove('bg-white/40', 'backdrop-blur-xl', 'backdrop-saturate-150', 'shadow-sm', 'border-white/20', 'text-obsidian');
                barRef.current?.classList.add('bg-transparent', 'border-transparent', 'text-ivory');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <div
                ref={barRef}
                className="pointer-events-auto flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-transparent border border-transparent w-[95%] max-w-6xl text-ivory"
            >
                <div className="flex flex-col">
                    <span className="font-serif italic font-semibold text-xl md:text-2xl tracking-normal">
                        Persiana Carpets
                    </span>
                </div>

                <div>
                    <a
                        href="tel:07905350666"
                        className="group relative inline-flex items-center gap-2 justify-center overflow-hidden rounded-full transition-transform duration-500 will-change-transform hover:scale-[1.03] bg-obsidian text-champagne px-6 md:px-7 py-1 md:py-[5px] shadow-sm"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span className="hidden md:inline font-sans font-bold tracking-wide text-base">07905 350666</span>
                            <span className="md:hidden font-sans font-bold tracking-wide text-sm">Call Us</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

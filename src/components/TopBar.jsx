import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

export function TopBar() {
    const barRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                barRef.current?.classList.add('bg-obsidian/80', 'backdrop-blur-md', 'shadow-sm', 'border-white/10');
                barRef.current?.classList.remove('bg-transparent', 'border-transparent');
            } else {
                barRef.current?.classList.remove('bg-obsidian/80', 'backdrop-blur-md', 'shadow-sm', 'border-white/10');
                barRef.current?.classList.add('bg-transparent', 'border-transparent');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <div
                ref={barRef}
                className="pointer-events-auto flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-transparent border border-transparent w-[95%] max-w-6xl"
            >
                <div className="flex flex-col">
                    <span className="font-serif italic font-semibold text-xl md:text-2xl tracking-normal text-ivory">
                        Persiana Carpets
                    </span>
                </div>

                <div>
                    <a
                        href="tel:07905350666"
                        className="group relative inline-flex items-center gap-2 justify-center overflow-hidden rounded-full font-medium transition-transform duration-500 will-change-transform hover:scale-[1.03] bg-champagne text-obsidian px-6 md:px-7 py-1.5 md:py-2 text-sm"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5" />
                            <span className="hidden md:inline font-sans font-medium tracking-wide">07905 350666</span>
                            <span className="md:hidden font-sans font-medium tracking-wide">Call Us</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

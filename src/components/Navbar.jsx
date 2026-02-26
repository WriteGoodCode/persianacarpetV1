import { useEffect, useState } from 'react';
import { Button } from './Button';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Threshold for scroll mutation
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Collection', href: '#collection' },
        { name: 'About', href: '#about' },
        { name: 'Process', href: '#process' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
            <div
                className={twMerge(
                    "pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    isScrolled
                        ? "bg-obsidian/60 backdrop-blur-xl border border-white/5 w-[90%] md:w-[70%]"
                        : "bg-transparent border border-transparent w-[95%] md:w-[85%]"
                )}
            >
                <div className="flex items-center gap-2">
                    <span className="font-serif italic font-semibold text-xl tracking-wide">
                        Persiana
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-300 hover:-translate-y-[1px] will-change-transform block"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div>
                    <Button variant="nav">Call Now</Button>
                </div>
            </div>
        </nav>
    );
}

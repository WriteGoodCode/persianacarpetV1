import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BentoGrid() {
    const gridRef = useRef(null);

    useEffect(() => {
        if (!gridRef.current) return;

        // 1. Setup Text Reveal
        // Split text manually for performance rather than pulling in SplitText plugin
        const wrapCharacters = (element) => {
            const text = element.innerText;
            element.innerHTML = '';
            for (let char of text) {
                const span = document.createElement('span');
                span.innerText = char === ' ' ? '\u00A0' : char; // preserve spaces
                span.style.opacity = 0;
                span.style.display = 'inline-block';
                element.appendChild(span);
            }
            return element.querySelectorAll('span');
        };

        const cards = gridRef.current.querySelectorAll('.bento-card');

        cards.forEach((card) => {
            const headline = card.querySelector('h3');
            const body = card.querySelector('p');

            // Only split if elements exist
            const headlineChars = headline ? wrapCharacters(headline) : [];
            const bodyChars = body ? wrapCharacters(body) : [];

            // Setup Intersection Observer for scroll reveal
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Unobserve immediately so it only plays once
                        observer.unobserve(entry.target);

                        // GSAP Timeline for this specific card
                        const tl = gsap.timeline();

                        // Fade up the card itself quickly
                        tl.to(card, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out"
                        });

                        // Reveal headline characters (30ms per char)
                        if (headlineChars.length) {
                            tl.to(headlineChars, {
                                opacity: 1,
                                stagger: 0.03,
                                duration: 0.1,
                                ease: "none"
                            }, "-=0.3"); // Overlap slightly with card reveal
                        }

                        // Reveal body characters (15ms per char) after headline finishes
                        if (bodyChars.length) {
                            tl.to(bodyChars, {
                                opacity: 1,
                                stagger: 0.015,
                                duration: 0.1,
                                ease: "none"
                            });
                        }
                    }
                });
            }, { threshold: 0.3 }); // 30% of card must be visible

            observer.observe(card);
        });

        // 2. Setup Cursor Follow Highlight (Desktop Only)
        // Check if mobile by touch support rather than just width to catch tablets
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (!isTouchDevice) {
            cards.forEach(card => {
                const bodyText = card.querySelector('.highlight-target');
                if (!bodyText) return;

                // Create highlight element
                const highlight = document.createElement('div');
                highlight.className = 'absolute pointer-events-none rounded-sm z-0 blur-md';
                highlight.style.backgroundColor = 'rgba(180, 160, 120, 0.15)';
                highlight.style.height = '32px'; // Rough line height
                highlight.style.width = '100%'; // Full width of the paragraph container
                highlight.style.left = '0';
                highlight.style.opacity = '0';
                // Note: we place it in the relative container of the paragraph 
                bodyText.parentElement.style.position = 'relative';
                bodyText.style.position = 'relative';
                bodyText.style.zIndex = '1';
                bodyText.parentElement.appendChild(highlight);

                let hideTimeout;

                const moveHighlight = (e) => {
                    clearTimeout(hideTimeout);
                    const rect = bodyText.getBoundingClientRect();
                    // Check if actually hovering over the text block
                    if (e.clientX >= rect.left && e.clientX <= rect.right &&
                        e.clientY >= rect.top && e.clientY <= rect.bottom) {

                        // Find relative Y position within the container
                        const relativeY = e.clientY - rect.top;

                        // Show and move highlight
                        gsap.to(highlight, {
                            opacity: 1,
                            y: relativeY - 16, // center on cursor roughly
                            duration: 0.1,
                            ease: "power1.out"
                        });
                    } else {
                        // Hide if left text area but still in card
                        gsap.to(highlight, { opacity: 0, duration: 0.3 });
                    }
                };

                const leaveCard = () => {
                    hideTimeout = setTimeout(() => {
                        gsap.to(highlight, { opacity: 0, duration: 0.3 });
                    }, 500); // Wait 0.5s before hiding as requested
                };

                card.addEventListener('mousemove', moveHighlight);
                card.addEventListener('mouseleave', leaveCard);

                // Cleanup generic listeners attached to standard DOM nodes is important in React
                bodyText._cleanupStats = { moveHighlight, leaveCard };
            });
        }

        // 3. Setup Pulsing Badge Animation
        const badgeOuter = gridRef.current.querySelector('.auth-badge-outer');
        const badgeInner = gridRef.current.querySelector('.auth-badge-inner');

        if (badgeOuter && badgeInner) {
            // Combine scale and glowing box shadow in a seamless yoyo
            gsap.to([badgeOuter, badgeInner], {
                scale: 1.08,
                boxShadow: "0 0 15px rgba(180, 150, 80, 0.3)",
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut" // Smooth breathing curve
            });
        }

        // Complete Cleanup Function
        return () => {
            // In a perfect world we kill all specific GSAP tweens, but clearing the timeline animations via unmount is usually fine for these.
            if (!isTouchDevice) {
                cards.forEach(card => {
                    const bodyText = card.querySelector('.highlight-target');
                    if (bodyText && bodyText._cleanupStats) {
                        card.removeEventListener('mousemove', bodyText._cleanupStats.moveHighlight);
                        card.removeEventListener('mouseleave', bodyText._cleanupStats.leaveCard);
                        const hl = card.querySelector('div.blur-md');
                        if (hl) hl.remove();
                    }
                });
            }
        };

    }, []);

    return (
        <section className="bg-ivory text-obsidian pt-12 md:pt-24 pb-32 md:pb-48 px-6">
            <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[1fr]">

                {/* Private Viewing - Wide */}
                <div className="bento-card opacity-0 translate-y-8 md:col-span-2 bg-[#f4f0ea] border border-obsidian/5 p-8 md:p-12 rounded-[2rem] flex flex-col justify-end min-h-[250px] shadow-sm">
                    <h3 className="font-serif italic text-2xl md:text-3xl text-obsidian mb-3 font-semibold">Private Viewing, By Appointment</h3>
                    <div className="w-full">
                        <p className="highlight-target font-sans text-obsidian/85 leading-relaxed text-lg max-w-lg">
                            No retail floor. We lay out selected pieces at our Woodley showroom, or ship to you anywhere in the UK.
                        </p>
                    </div>
                </div>

                {/* Verified Authentic - Tall */}
                <div className="bento-card opacity-0 translate-y-8 md:row-span-2 bg-obsidian text-ivory p-8 md:p-12 rounded-[2rem] flex flex-col justify-between shadow-xl">
                    <div className="auth-badge-outer w-12 h-12 bg-champagne/20 rounded-full flex items-center justify-center mb-12">
                        <div className="auth-badge-inner w-3 h-3 bg-champagne rounded-full" />
                    </div>
                    <div>
                        <h3 className="font-serif italic text-2xl md:text-3xl text-ivory mb-3 font-semibold">Verified Authentic</h3>
                        <div className="w-full">
                            <p className="highlight-target font-sans text-ivory/80 leading-relaxed text-lg">
                                30-day independent authentication guarantee. Have it certified. Full refund if it fails.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Carpets Others Miss - Square */}
                <div className="bento-card opacity-0 translate-y-8 bg-champagne text-obsidian p-8 md:p-10 rounded-[2rem] flex flex-col justify-end shadow-sm">
                    <h3 className="font-serif italic text-2xl text-obsidian mb-2 font-semibold">Carpets Others Miss</h3>
                    <div className="w-full">
                        <p className="highlight-target font-sans text-obsidian/90 leading-relaxed font-medium">
                            Commercial dealers buy for turnover. We select for mastery.
                        </p>
                    </div>
                </div>

                {/* Collectors - Square */}
                <div className="bento-card opacity-0 translate-y-8 bg-[#f4f0ea] border border-obsidian/5 p-8 md:p-10 rounded-[2rem] flex flex-col justify-end shadow-sm">
                    <h3 className="font-serif italic text-2xl text-obsidian mb-2 font-semibold">Collectors, Not Salespeople</h3>
                    <div className="w-full">
                        <p className="highlight-target font-sans text-obsidian/85 leading-relaxed">
                            Your questions answered by the person who found the piece. Every question answered firsthand.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BentoGrid() {
    const gridRef = useRef(null);

    useEffect(() => {
        if (!gridRef.current) return;

        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const isMobile = window.innerWidth < 768 || isTouchDevice;

        const cards = gridRef.current.querySelectorAll('.bento-card');

        if (isMobile) {
            // Simple fade-up for mobile, no text splitting
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => observer.observe(card));
        } else {
            // Complex GSAP Animations for Desktop
            // 1. Setup Text Reveal
            // Improved text splitting: split by words first, then characters, so words don't break across lines
            const wrapCharacters = (element) => {
                const text = element.innerText;
                element.innerHTML = '';
                const words = text.split(' ');

                const allCharSpans = [];

                words.forEach((word, wordIndex) => {
                    // Create word wrapper to prevent breaking mid-word
                    const wordSpan = document.createElement('span');
                    wordSpan.style.display = 'inline-block';
                    // Add trailing space for all words except the last one
                    const wordWithSpace = wordIndex < words.length - 1 ? word + ' ' : word;

                    for (let char of wordWithSpace) {
                        const charSpan = document.createElement('span');
                        charSpan.innerText = char === ' ' ? '\u00A0' : char; // preserve spaces
                        charSpan.style.opacity = 0;
                        charSpan.style.display = 'inline-block';
                        wordSpan.appendChild(charSpan);
                        allCharSpans.push(charSpan);
                    }

                    element.appendChild(wordSpan);
                    // Add actual space between word wrappers so browser can naturally wrap them
                    if (wordIndex < words.length - 1) {
                        element.appendChild(document.createTextNode(' '));
                    }
                });

                return allCharSpans;
            };

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

            // 2. Setup Cursor Follow Radial Glow (Desktop Only)
            cards.forEach(card => {
                // Ensure card can contain absolute overflow glow properly
                card.style.position = 'relative';
                card.style.overflow = 'hidden';

                // Create the radial glow element
                const glow = document.createElement('div');
                glow.className = 'pointer-events-none absolute z-0 opacity-0';
                // 250px diameter roughly, centered on pointer
                glow.style.width = '250px';
                glow.style.height = '250px';
                glow.style.left = '-125px'; // offset by half width
                glow.style.top = '-125px'; // offset by half height
                glow.style.background = 'radial-gradient(circle, rgba(180, 160, 120, 0.12) 0%, rgba(180, 160, 120, 0) 70%)';

                // Ensure text stays above the glow
                const children = Array.from(card.children);
                children.forEach(child => {
                    if (child !== glow && child.tagName !== 'DIV' || child.classList.contains('w-full') || child.classList.contains('relative')) {
                        // Only elevate content holding divs and text
                        child.style.position = 'relative';
                        child.style.zIndex = '1';
                    }
                });

                card.appendChild(glow);

                const moveGlow = (e) => {
                    const rect = card.getBoundingClientRect();
                    const relativeX = e.clientX - rect.left;
                    const relativeY = e.clientY - rect.top;

                    gsap.to(glow, {
                        x: relativeX,
                        y: relativeY,
                        opacity: 1,
                        duration: 0.15,
                        ease: "power2.out"
                    });
                };

                const leaveCard = () => {
                    gsap.to(glow, {
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                };

                card.addEventListener('mousemove', moveGlow);
                card.addEventListener('mouseleave', leaveCard);

                card._cleanupGlow = { moveGlow, leaveCard, glow };
            });
        }

        // 3. Setup Pulsing Badge Animation (Runs everywhere)
        const badgeOuter = gridRef.current.querySelector('.auth-badge-outer');
        const badgeInner = gridRef.current.querySelector('.auth-badge-inner');

        if (badgeOuter && badgeInner) {
            gsap.to([badgeOuter, badgeInner], {
                scale: 1.08,
                boxShadow: "0 0 15px rgba(180, 150, 80, 0.3)",
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Complete Cleanup Function
        return () => {
            if (!isTouchDevice) {
                cards.forEach(card => {
                    if (card._cleanupGlow) {
                        card.removeEventListener('mousemove', card._cleanupGlow.moveGlow);
                        card.removeEventListener('mouseleave', card._cleanupGlow.leaveCard);
                        if (card._cleanupGlow.glow && card.contains(card._cleanupGlow.glow)) {
                            card.removeChild(card._cleanupGlow.glow);
                        }
                    }
                });
            }
        };

    }, []);

    return (
        <section className="bg-ivory text-obsidian pt-12 md:pt-24 pb-32 md:pb-48 px-6 relative z-10">
            <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[1fr]">

                {/* Private Viewing - Wide */}
                <div className="bento-card opacity-0 translate-y-8 md:col-span-2 bg-[#f4f0ea] border border-obsidian/5 p-8 md:p-12 rounded-[2rem] flex flex-col justify-end min-h-[250px] shadow-sm relative overflow-hidden">
                    <h3 className="font-serif italic text-2xl md:text-3xl text-obsidian mb-3 font-semibold relative z-10">Private Viewing, By Appointment</h3>
                    <div className="w-full relative z-10">
                        <p className="highlight-target font-sans text-obsidian/85 leading-relaxed text-lg max-w-lg">
                            No retail floor. We lay out selected pieces at our Woodley showroom, or ship to you anywhere in the UK.
                        </p>
                    </div>
                </div>

                {/* Verified Authentic - Tall */}
                <div className="bento-card opacity-0 translate-y-8 md:row-span-2 bg-obsidian text-ivory p-8 md:p-12 rounded-[2rem] flex flex-col justify-between shadow-xl relative overflow-hidden">
                    <div className="auth-badge-outer w-12 h-12 bg-champagne/20 rounded-full flex items-center justify-center mb-12 relative z-10">
                        <div className="auth-badge-inner w-3 h-3 bg-champagne rounded-full" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="font-serif italic text-2xl md:text-3xl text-ivory mb-3 font-semibold">Verified Authentic</h3>
                        <div className="w-full">
                            <p className="highlight-target font-sans text-ivory/80 leading-relaxed text-lg">
                                30-day independent authentication guarantee. Have it certified. Full refund if it fails.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Carpets Others Miss - Square */}
                <div className="bento-card opacity-0 translate-y-8 bg-champagne text-obsidian p-8 md:p-10 rounded-[2rem] flex flex-col justify-end shadow-sm relative overflow-hidden">
                    <h3 className="font-serif italic text-2xl text-obsidian mb-2 font-semibold relative z-10">Carpets Others Miss</h3>
                    <div className="w-full relative z-10">
                        <p className="highlight-target font-sans text-obsidian/90 leading-relaxed font-medium">
                            Commercial dealers buy for turnover. We select for mastery.
                        </p>
                    </div>
                </div>

                {/* Collectors - Square */}
                <div className="bento-card opacity-0 translate-y-8 bg-[#f4f0ea] border border-obsidian/5 p-8 md:p-10 rounded-[2rem] flex flex-col justify-end shadow-sm relative overflow-hidden">
                    <h3 className="font-serif italic text-2xl text-obsidian mb-2 font-semibold relative z-10">Collectors, Not Salespeople</h3>
                    <div className="w-full relative z-10">
                        <p className="highlight-target font-sans text-obsidian/85 leading-relaxed">
                            Your questions answered by the person who found the piece. Every question answered firsthand.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

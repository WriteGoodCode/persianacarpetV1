import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MousePointer2 } from 'lucide-react';
import clsx from 'clsx';

function DiagnosticShuffler() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.shuffler-card');
            let tl = gsap.timeline({ repeat: -1 });

            // Default Setup
            cards.forEach((card, i) => {
                gsap.set(card, {
                    y: i * 8,
                    scale: 1 - i * 0.05,
                    zIndex: cards.length - i,
                    opacity: 1 - i * 0.2
                });
            });

            // Simple cycling animation
            cards.forEach((_, index) => {
                tl.to('.shuffler-card', {
                    y: (i) => {
                        let nextPos = (i - 1 + cards.length) % cards.length;
                        return nextPos * 8;
                    },
                    scale: (i) => {
                        let nextPos = (i - 1 + cards.length) % cards.length;
                        return 1 - nextPos * 0.05;
                    },
                    zIndex: (i) => {
                        let nextPos = (i - 1 + cards.length) % cards.length;
                        return cards.length - nextPos;
                    },
                    opacity: (i) => {
                        let nextPos = (i - 1 + cards.length) % cards.length;
                        return 1 - nextPos * 0.2;
                    },
                    duration: 0.8,
                    ease: 'back.inOut(1.2)'
                }, `+=${2.2}`) // wait 2.2s between shuffles
                    .add(() => {
                        // Re-sort DOM order physically isn't strictly necessary if zIndex and scale handle it visually,
                        // but array shifting ensures the `i` logic above maps stably over multiple iterations.
                        // For simplicity in React, we're relying on GSAP to continuously shift properties based on calculated index.
                        // A safer GSAP-only loop is to stagger the properties.
                        // Actually, since we use relative functional values above based on initial `i`, we need a stateful mapping if we don't reorder DOM.
                    }, '<');
            });
            // The above loop has a flaw: functional modifiers run once per tween creation, not per iteration unless dynamic.
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // For React, building a robust shuffler interval is often easier:
    const [items, setItems] = useState([
        { id: 1, label: 'Tabriz, Iran', metric: '1M+ Knots/sqm' },
        { id: 2, label: 'Isfahan, Iran', metric: 'Kurk Wool & Silk' },
        { id: 3, label: 'Kerman, Iran', metric: 'Pre-1920s Antique' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const next = [...prev];
                const first = next.shift();
                next.push(first);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-48 w-full max-w-[240px] mx-auto perspective-[1000px]">
            {items.map((item, i) => (
                <div
                    key={item.id}
                    className="absolute inset-x-0 mx-auto top-0 bg-[#16161D] border border-white/5 rounded-2xl p-5 shadow-2xl transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] w-full flex flex-col justify-between h-32"
                    style={{
                        transform: `translateY(${i * 15}px) scale(${1 - i * 0.08})`,
                        zIndex: 10 - i,
                        opacity: 1 - i * 0.3
                    }}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-champagne">Origin</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne/40"></span>
                    </div>
                    <div>
                        <p className="font-serif font-medium text-ivory text-lg">{item.label}</p>
                        <p className="font-sans font-light text-xs text-ivory/50 tracking-wide mt-1">{item.metric}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function TelemetryTypewriter() {
    const [text, setText] = useState('');
    const [cursorPhase, setCursorPhase] = useState(true);
    const messages = [
        "Verifying provenance...",
        "Scanning structural knots...",
        "Identifying organic dyes...",
        "Certified authentic.",
        "Expert approved."
    ];

    useEffect(() => {
        let cursorInterval = setInterval(() => setCursorPhase(p => !p), 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        let msgIndex = 0;
        let charIndex = 0;
        let timeoutId;

        const typeWriter = () => {
            const currentMsg = messages[msgIndex];
            if (charIndex < currentMsg.length) {
                setText(currentMsg.substring(0, charIndex + 1));
                charIndex++;
                timeoutId = setTimeout(typeWriter, Math.random() * 30 + 40); // 40-70ms per char
            } else {
                // finished typing msg
                timeoutId = setTimeout(() => {
                    if (msgIndex === messages.length - 1) {
                        // last message (Expert approved) stays longer, then loops
                        setTimeout(() => {
                            msgIndex = 0;
                            charIndex = 0;
                            setText('');
                            typeWriter();
                        }, 3000);
                    } else {
                        // clear and next
                        setText('');
                        msgIndex++;
                        charIndex = 0;
                        typeWriter();
                    }
                }, 1200);
            }
        };

        timeoutId = setTimeout(typeWriter, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="h-48 w-full bg-[#1A1A22] rounded-2xl p-6 border border-white/5 flex flex-col font-mono text-sm leading-relaxed overflow-hidden shadow-inner relative">
            <div className="flex items-center gap-2 mb-4 opacity-50 text-xs">
                <div className="h-2 w-2 rounded-sm bg-champagne animate-pulse"></div>
                <span>SYSTEM.AUTH.PROTOCOL</span>
            </div>
            <div className="text-champagne flex-1 whitespace-pre-wrap break-words">
                <span className="opacity-40">{'>'} </span>{text}
                <span className={clsx("inline-block w-2 bg-champagne ml-0.5 align-middle h-[14px]", cursorPhase ? "opacity-100" : "opacity-0")}></span>
            </div>
        </div>
    );
}

function CursorProtocolScheduler() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

            // Initial un-active day
            gsap.set('.sched-day', { backgroundColor: 'transparent', color: '#FAF8F5' });
            gsap.set('.sched-btn', { scale: 1, backgroundColor: 'transparent' });

            // Cursor moves to Thursday (index 3)
            tl.to('.sched-cursor', { x: 140, y: 45, duration: 1.2, delay: 0.5 })
                // Clicks Thursday
                .to('.sched-cursor', { scale: 0.8, duration: 0.15 })
                .to('.sched-day-target', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 }, '<')
                .to('.sched-cursor', { scale: 1, duration: 0.15 })
                // Details fade in below
                .to('.sched-details', { opacity: 1, y: 0, duration: 0.4 })
                // Cursor moves to Confirm Button
                .to('.sched-cursor', { x: 100, y: 130, duration: 1 })
                // Hover button
                .to('.sched-btn', { backgroundColor: 'rgba(201,168,76,0.1)', duration: 0.2 })
                // Click button
                .to('.sched-cursor', { scale: 0.8, duration: 0.15 })
                .to('.sched-btn', { scale: 0.95, duration: 0.1 }, '<')
                .to('.sched-btn', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.1 })
                .to('.sched-cursor', { scale: 1, duration: 0.15 })
                .to('.sched-btn', { scale: 1, duration: 0.1 }, '<')
                // Completed state pause
                .to({}, { duration: 1.5 })
                // Reset
                .to('.sched-details', { opacity: 0, y: 10, duration: 0.3 })
                .to('.sched-day-target', { backgroundColor: 'transparent', color: '#FAF8F5', duration: 0.3 }, '<')
                .to('.sched-btn', { backgroundColor: 'transparent', color: '#C9A84C', duration: 0.3 }, '<')
                .to('.sched-cursor', { x: 0, y: 0, duration: 1 }, '<');

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div ref={containerRef} className="h-48 w-full max-w-[280px] mx-auto relative select-none">
            {/* Fake UI */}
            <div className="bg-[#1A1A22] border border-white/5 rounded-2xl p-5 h-full flex flex-col">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-mono text-ivory/50 uppercase">Select Day</span>
                    <span className="text-xs font-mono text-champagne">Sept // 2026</span>
                </div>

                <div className="flex justify-between gap-1 mb-3">
                    {days.map((d, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "w-7 h-9 rounded-md flex items-center justify-center text-xs font-medium font-mono transition-colors",
                                i === 3 ? "sched-day-target sched-day relative" : "sched-day text-white/50"
                            )}
                        >
                            {d}
                            {i === 3 && <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-champagne rounded-full"></div>}
                        </div>
                    ))}
                </div>

                <div className="sched-details opacity-0 translate-y-2 flex-1 flex flex-col justify-end">
                    <div className="sched-btn w-full border border-champagne/30 text-champagne rounded-lg py-2 text-center text-xs font-medium transition-colors">
                        Confirm Viewing
                    </div>
                </div>
            </div>

            {/* Animated Cursor */}
            <div className="sched-cursor absolute top-0 left-0 z-10 pointer-events-none drop-shadow-md text-white/90">
                <MousePointer2 className="w-6 h-6 fill-black" strokeWidth={1.5} />
            </div>
        </div>
    );
}


export function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-16 bg-obsidian relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="feature-card bg-obsidian rounded-[2rem] border border-champagne/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-champagne/30 transition-colors duration-500 overflow-hidden group flex flex-col">
                        <DiagnosticShuffler />
                        <div className="mt-12">
                            <h3 className="font-serif italic text-2xl text-ivory mb-3">Carpets Others Miss</h3>
                            <p className="font-sans font-light text-ivory/70 text-sm leading-relaxed text-balance">
                                Commercial dealers buy for turnover. We select for mastery.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card bg-obsidian rounded-[2rem] border border-champagne/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-champagne/30 transition-colors duration-500 overflow-hidden group flex flex-col">
                        <TelemetryTypewriter />
                        <div className="mt-12">
                            <h3 className="font-serif italic text-2xl text-ivory mb-3">Verified Authentic</h3>
                            <p className="font-sans font-light text-ivory/70 text-sm leading-relaxed text-balance">
                                30-day independent authentication guarantee. Have it certified. Full refund if it fails.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card bg-obsidian rounded-[2rem] border border-champagne/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-champagne/30 transition-colors duration-500 overflow-hidden group flex flex-col">
                        <CursorProtocolScheduler />
                        <div className="mt-12">
                            <h3 className="font-serif italic text-2xl text-ivory mb-3">Private Viewing, By Appointment</h3>
                            <p className="font-sans font-light text-ivory/70 text-sm leading-relaxed text-balance">
                                No retail floor. We lay out selected pieces at our Woodley showroom, or ship to you anywhere in the UK.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

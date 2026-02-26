import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Card1Canvas() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30 mix-blend-screen">
            <div className="w-[800px] h-[800px] border border-champagne/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[600px] h-[600px] border border-champagne/30 rotate-45 animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute w-[400px] h-[400px] border border-champagne/40 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>
    );
}

function Card2Canvas() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyMDEsIDE2OCwgNzYsIDAuNSkiLz48L3N2Zz4=')]">
            <div className="w-full h-1 bg-champagne/50 shadow-[0_0_15px_rgba(201,168,76,0.8)] filter blur-[1px] animate-[slideDown_4s_ease-in-out_infinite]" />
            <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
        </div>
    );
}

function Card3Canvas() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30 mix-blend-screen">
            <div className="w-full h-[200px] flex items-center justify-center gap-2">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 bg-champagne/60 rounded-full"
                        style={{
                            height: `${Math.random() * 100 + 20}%`,
                            animation: `pulseHeight ${Math.random() * 1.5 + 1}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </div>
            <style>{`
        @keyframes pulseHeight {
          0% { transform: scaleY(0.3); opacity: 0.3; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
}

const steps = [
    {
        step: "Step 01",
        title: "Get in Touch",
        desc: "Call or enquire online. Tell us about your space, your taste, what you're looking for.",
        Canvas: Card1Canvas,
    },
    {
        step: "Step 02",
        title: "See the Pieces",
        desc: "Visit our private showroom in Woodley, Reading. Or we ship selected pieces to you with detailed photographs beforehand.",
        Canvas: Card2Canvas,
    },
    {
        step: "Step 03",
        title: "Decide Without Pressure",
        desc: "Take your time. If a piece is right, you'll know.",
        Canvas: Card3Canvas,
    }
];

export function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${cards.length * 100}%`,
                pin: true,
                scrub: 1,
                animation: gsap.timeline()
                    // Card 1 scales down when Card 2 comes up
                    .to(cards[0], { scale: 0.9, opacity: 0.5, filter: 'blur(20px)', ease: 'none', duration: 1 }, 0)
                    .fromTo(cards[1], { yPercent: 100 }, { yPercent: 0, ease: 'none', duration: 1 }, 0)

                    // Card 2 scales down when Card 3 comes up
                    .to(cards[1], { scale: 0.9, opacity: 0.5, filter: 'blur(20px)', ease: 'none', duration: 1 }, 1)
                    .fromTo(cards[2], { yPercent: 100 }, { yPercent: 0, ease: 'none', duration: 1 }, 1)
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-obsidian overflow-hidden">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={clsx(
                        "protocol-card absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-16",
                        index === 0 ? "z-10 bg-slate" :
                            index === 1 ? "z-20 bg-[#1A1A22]" : "z-30 bg-[#22222D]"
                    )}
                >
                    <step.Canvas />

                    <div className="relative z-10 max-w-2xl px-8 py-16 bg-obsidian/40 backdrop-blur-xl border border-white/5 rounded-[3rem] text-center shadow-2xl flex flex-col items-center">
                        <span className="font-mono text-champagne mb-6 tracking-widest uppercase">{step.step}</span>
                        <h2 className="font-serif italic text-4xl md:text-5xl text-ivory mb-6">{step.title}</h2>
                        <p className="font-sans font-light text-ivory/70 text-lg md:text-xl leading-relaxed text-balance">
                            {step.desc}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}

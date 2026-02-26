import React from 'react';

const inventory = [
    {
        origin: "Kashan, Iran",
        year: "Woven 1924",
        desc: "Vase flower design in wool with organic dyes.",
        dims: "1.0 × 1.5m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/kashan-1924-vase-flower-persian-run.webp"
    },
    {
        origin: "Isfahan, Iran",
        year: "Woven 1983",
        desc: "Pictorial scene woven in Kurk wool and silk.",
        dims: "1.52 × 1.10m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/isfahan-1983-nomadic-life-persian-rug.webp"
    },
    {
        origin: "Tabriz, Iran",
        year: "Woven 1964",
        desc: "\"The King Party\" in wool and fine fur.",
        dims: "2.0 × 3.0m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/tabriz-1964-king-party-persian-rug.webp"
    },
    {
        origin: "Arak, Iran",
        year: "Woven 1984",
        desc: "Sarogh style vase flower in wool.",
        dims: "3.0 × 1.95m",
        img: "https://persianacarpets.com/wp-content/uploads/2026/02/arak-1984-blossom-sarogh-persian-rug.webp"
    }
];

export function Inventory() {
    return (
        <section className="py-32 px-6 md:px-16 bg-obsidian text-ivory/80">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h2 className="font-serif italic text-4xl md:text-5xl text-ivory mb-2 tracking-tight">
                            Sample Inventory
                        </h2>
                        <p className="font-sans font-light tracking-widest text-sm uppercase text-champagne">
                            Hand-Knotted Persian Carpets
                        </p>
                    </div>
                    <div className="bg-slate px-6 py-3 rounded-full border border-white/5 w-fit">
                        <span className="font-mono text-sm tracking-wide">Pieces from £1,000 to £50,000</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {inventory.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] mb-6">
                                {/* Background image zoom effect */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                                    style={{ backgroundImage: `url(${item.img})` }}
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-serif italic text-2xl text-ivory transition-colors duration-300 group-hover:text-champagne">{item.origin}</h3>
                                    <span className="font-mono text-sm text-ivory/60">{item.year}</span>
                                </div>
                                <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-4 mt-2">
                                    <p className="font-sans font-light text-sm text-balance max-w-sm">
                                        {item.desc}
                                    </p>
                                    <span className="font-mono text-xs whitespace-nowrap text-ivory/40">{item.dims}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

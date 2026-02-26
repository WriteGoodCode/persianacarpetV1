export function Authentication() {
    return (
        <section className="bg-champagne text-obsidian py-32 md:py-48 px-6 text-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">

                <h2 className="font-serif italic text-5xl md:text-6xl font-semibold tracking-tight leading-[1.3] md:leading-[1.4]">
                    A Piece No One Else Will Ever Have
                </h2>

                <p className="font-sans text-xl md:text-2xl font-normal leading-relaxed text-obsidian/80 text-balance mt-2">
                    Yours alone. History that exists nowhere else.
                </p>

                <div className="mt-6 flex flex-col items-center gap-3">
                    <a
                        href="tel:07905350666"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-semibold transition-transform duration-500 will-change-transform hover:scale-[1.03] bg-obsidian text-ivory px-8 py-3 text-lg"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            07905 350666
                        </span>
                    </a>
                    <span className="font-sans text-sm text-obsidian/70 font-medium">
                        Speak with the Collectors
                    </span>
                </div>

            </div>
        </section>
    );
}

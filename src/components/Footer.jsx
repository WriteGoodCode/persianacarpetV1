export function Footer() {
    return (
        <footer className="bg-obsidian border-t border-[#1a1a24] pt-32 pb-16 px-6 md:px-12 text-ivory">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

                <h2 className="font-serif italic text-4xl md:text-5xl mb-4 text-champagne">
                    Ready to take home a part of history?
                </h2>

                <p className="font-sans text-ivory/70 text-lg mb-12">
                    Enquire about a piece
                </p>

                <form className="w-full max-w-lg mx-auto flex flex-col gap-4 mb-16" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-slate text-ivory placeholder-ivory/40 px-6 py-4 rounded-full border border-white/5 focus:outline-none focus:border-champagne/50 transition-colors"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-slate text-ivory placeholder-ivory/40 px-6 py-4 rounded-full border border-white/5 focus:outline-none focus:border-champagne/50 transition-colors"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full bg-slate text-ivory placeholder-ivory/40 px-6 py-4 rounded-full border border-white/5 focus:outline-none focus:border-champagne/50 transition-colors"
                    />
                    <textarea
                        placeholder="Tell us what you're interested in, such as type and size."
                        className="w-full bg-slate text-ivory placeholder-ivory/40 px-6 py-4 rounded-[2rem] border border-white/5 focus:outline-none focus:border-champagne/50 transition-colors min-h-[120px] resize-none"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full mt-2 group relative inline-flex items-center justify-center rounded-full font-medium transition-transform duration-500 will-change-transform hover:scale-[1.03] bg-champagne text-obsidian px-10 py-4 text-lg"
                    >
                        Get More Info
                    </button>

                    <div className="flex flex-col items-center text-center mt-6">
                        <p className="font-sans text-sm text-ivory/50">
                            We hate spam too.
                            <br /><br />
                            Your information is used only to contact you regarding your enquiry.
                            <br /><br />
                            <a href="tel:07905350666" className="text-champagne hover:text-ivory transition-colors">
                                Call for more info: 📞 07905 350666
                            </a>
                        </p>
                    </div>
                </form>

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-[#1a1a24]">
                    <div className="flex flex-col items-start gap-1">
                        <span className="font-serif italic text-2xl font-semibold tracking-wide text-ivory text-left">
                            Persiana Carpets
                        </span>
                        <span className="font-sans text-xs text-ivory/50 uppercase tracking-widest text-left">
                            Woodley, Reading, UK
                        </span>
                    </div>

                    <p className="font-sans text-xs text-ivory/30">
                        &copy; {new Date().getFullYear()} Persiana Carpets. All rights reserved.
                    </p>

                    <p className="font-sans text-xs text-ivory/30">
                        Designed by Write Good Code.
                    </p>
                </div>

            </div>
        </footer>
    );
}

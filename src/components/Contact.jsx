import { Button } from './Button';

export function Contact() {
    return (
        <section className="py-32 px-6 md:px-16 bg-[#121218] text-ivory">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                <div className="text-center mb-16">
                    <p className="font-sans text-champagne font-semibold tracking-widest uppercase text-sm mb-4">
                        Contact Us
                    </p>
                    <h2 className="font-serif italic text-5xl md:text-6xl tracking-tight text-balance">
                        Speak With a Collector
                    </h2>
                </div>

                <form className="w-full max-w-2xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-mono text-xs text-ivory/50 tracking-wider">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-mono text-xs text-ivory/50 tracking-wider">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tel" className="font-mono text-xs text-ivory/50 tracking-wider">Telephone</label>
                        <input
                            type="tel"
                            id="tel"
                            className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm"
                            placeholder="+44 7000 000000"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="msg" className="font-mono text-xs text-ivory/50 tracking-wider">Message</label>
                        <textarea
                            id="msg"
                            rows={4}
                            className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm resize-none"
                            placeholder="Tell us about the space or piece you are looking for..."
                        />
                    </div>

                    <div className="mt-8">
                        <Button variant="primary" className="w-full py-5 text-base">
                            Submit Request
                        </Button>
                    </div>

                    <p className="font-sans font-light text-center text-xs text-ivory/40 mt-4 text-balance">
                        Privacy note: We hate spam, too. Your information is used only to contact you regarding your enquiry.
                    </p>
                </form>

            </div>
        </section>
    );
}

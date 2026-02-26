import { Phone, Search, Check } from 'lucide-react';

export function HowToBuy() {
    return (
        <section id="how-to-buy" className="py-24 px-6 md:px-16 bg-white relative z-10">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-[#6D3D3D] mb-24 tracking-normal">
                    How to Buy a Persian Rug
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">

                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-10 w-full flex justify-center">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-[20px] px-5 py-1 text-xs md:text-[13px] font-bold font-sans text-gray-700 shadow-sm z-10 shadow-gray-200/50">
                                Step 01
                            </div>
                            <div className="w-[180px] h-[180px] rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.06)]">
                                <Phone className="w-16 h-16 text-[#6D3D3D] fill-[#6D3D3D]" strokeWidth={0} />
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl text-[#1a202c] mb-4">Get in Touch</h3>
                        <p className="font-sans text-gray-600 leading-relaxed max-w-xs text-center mx-auto">
                            Call or enquire online. Tell us about your space, your taste, what you're looking for.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-10 w-full flex justify-center">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-[20px] px-5 py-1 text-xs md:text-[13px] font-bold font-sans text-gray-700 shadow-sm z-10 shadow-gray-200/50">
                                Step 02
                            </div>
                            <div className="w-[180px] h-[180px] rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.06)]">
                                <Search className="w-16 h-16 text-[#6D3D3D]" strokeWidth={3} />
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl text-[#1a202c] mb-4">See the Pieces</h3>
                        <p className="font-sans text-gray-600 leading-relaxed max-w-xs text-center mx-auto">
                            Visit our private showroom in Woodley, Reading. Or we ship selected pieces to you with detailed photographs beforehand.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <div className="relative mb-10 w-full flex justify-center">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-[20px] px-5 py-1 text-xs md:text-[13px] font-bold font-sans text-gray-700 shadow-sm z-10 shadow-gray-200/50">
                                Step 03
                            </div>
                            <div className="w-[180px] h-[180px] rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.06)]">
                                <Check className="w-[72px] h-[72px] text-[#6D3D3D]" strokeWidth={4} />
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl text-[#1a202c] mb-4">Decide Without Pressure</h3>
                        <p className="font-sans text-gray-600 leading-relaxed max-w-sm text-center mx-auto">
                            Take your time. If a piece is right, you'll know.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

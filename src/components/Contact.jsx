import { useState } from 'react';
import { Button } from './Button';

export function Contact() {
    const [status, setStatus] = useState('idle');

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');
        const form = e.target;

        try {
            const token = await new Promise((resolve, reject) => {
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute('6LewcuYrAAAAANiVfJwMLgdf2E5p3RJkmVg25rSb', { action: 'contact' })
                        .then(resolve)
                        .catch(reject);
                });
            });

            const data = new FormData(form);
            data.append('g-recaptcha-response', token);

            const res = await fetch('https://persianacarpets.com/lp/persianV1/form-handler.php', {
                method: 'POST',
                body: data,
            });

            if (res.ok) {
                setStatus('sent');
                form.reset();
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'form_submission',
                    form_name: 'contact_main',
                });
                setTimeout(() => {
                    window.location.href = 'https://persianacarpets.com/persian-carpets/thank-you-lp1/';
                }, 1500);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

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

                <form className="w-full max-w-2xl flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="_cc" value="leads@writegoodcode.com" />
                    <input type="hidden" name="_subject" value="New Enquiry — Persiana Carpets Landing Page" />
                    <input type="text" name="_honey" style={{ display: 'none' }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-mono text-xs text-ivory/50 tracking-wider">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-mono text-xs text-ivory/50 tracking-wider">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tel" className="font-mono text-xs text-ivory/50 tracking-wider">Telephone</label>
                        <input
                            type="tel"
                            id="tel"
                            name="phone"
                            className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm"
                            placeholder="+44 7000 000000"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="msg" className="font-mono text-xs text-ivory/50 tracking-wider">Message</label>
                        <textarea
                            id="msg"
                            name="message"
                            rows={4}
                            className="w-full bg-slate border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-champagne/50 transition-colors font-sans text-sm resize-none"
                            placeholder="Tell us about the space or piece you are looking for..."
                            required
                        />
                    </div>

                    <div className="mt-8">
                        <Button type="submit" variant="primary" className="w-full py-5 text-base" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent — Redirecting...' : 'Submit Request'}
                        </Button>
                    </div>

                    {status === 'error' && (
                        <p className="font-sans text-center text-sm text-red-400">
                            Something went wrong. Please try again or call us directly.
                        </p>
                    )}

                    <p className="font-sans font-light text-center text-xs text-ivory/40 mt-4 text-balance">
                        Privacy note: We hate spam, too. Your information is used only to contact you regarding your enquiry.
                    </p>
                </form>

            </div>
        </section>
    );
}

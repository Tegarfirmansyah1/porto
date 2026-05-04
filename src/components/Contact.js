// src/components/Contact.js
"use client";

import { useState, useEffect } from 'react';

export default function Contact() {
    const [status, setStatus] = useState({
        submitting: false,
        succeeded: false,
        error: null,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ ...status, submitting: true });

        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            message: event.target.message.value,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            setStatus({ submitting: false, succeeded: true, error: null });
            event.target.reset(); // Mengosongkan form setelah berhasil

        } catch (error) {
            setStatus({ submitting: false, succeeded: false, error: error.message });
        }
    };

    // Efek untuk mereset form setelah jeda
    useEffect(() => {
        if (status.succeeded) {
            const timer = setTimeout(() => {
                setStatus({ submitting: false, succeeded: false, error: null });
            }, 5000); // 5 detik
            return () => clearTimeout(timer);
        }
    }, [status.succeeded]);

    if (status.succeeded) {
        return (
            <section id="contact" className="bg-background py-20 scroll-mt-[150px]">
                <div className="max-w-xl mx-auto px-4 text-center">
                    
                    <div className="bg-background/50 p-8 rounded-xl border-4 border-text shadow-lg min-h-[420px] flex flex-col justify-center items-center">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 font-retro text-text">Terima Kasih!</h3>
                        <p className="text-lg text-text font-retro">Pesanmu sudah terkirim. Saya akan segera membalasnya.</p>
                        <p className="text-9xl mt-6">🎉</p> 
                    </div>
                </div>
            </section>
        );
    }
    
    return (
        <section id="contact" className="bg-background py-20 scroll-mt-[88px]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-retro text-text">Get In Touch</h2>
                <div className="max-w-xl mx-auto bg-background/50 p-6 md:p-8 rounded-xl border-4 border-text shadow-lg min-h-[420px]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                                <input
                                    id="name"
                                    type="text" 
                                    name="name"
                                    placeholder="Name"
                                    required
                                    className="w-full px-4 py-3 bg-background border-2 border-text rounded-lg focus:outline-none focus:ring-2 focus:ring-info font-retro text-lg transition duration-300 placeholder:text-text placeholder:opacity-75"
                                />
                            </div>
                            <div>
                                <input
                                    id="email"
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-3 bg-background border-2 border-text rounded-lg focus:outline-none focus:ring-2 focus:ring-info font-retro text-lg transition duration-300 placeholder:text-text placeholder:opacity-75"
                                />
                            </div>
                            <div>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your Message"
                                    required 
                                    rows="4"
                                    className="w-full px-4 py-3 bg-background border-2 border-text rounded-lg focus:outline-none focus:ring-2 focus:ring-info font-retro text-lg transition duration-300 placeholder:text-text placeholder:opacity-75"
                                ></textarea>
                            </div>
                        <button 
                            type="submit"
                            disabled={status.submitting}
                            className="w-full bg-primary text-text px-8 py-3 rounded-lg hover:bg-secondary transition duration-300 font-retro border-2 border-text shadow-[5px_5px_0px_theme(colors.text)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-sm md:text-lg disabled:bg-gray-400 disabled:cursor-not-allowed" 
                        >
                            {status.submitting ? 'Mengirim...' : 'Send Message'}
                        </button>
                        {status.error && (
                            <p className="text-red-500 text-center font-retro mt-4">Oops! Terjadi kesalahan. Coba lagi nanti.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AutoCarousel({ designs }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-swipe setiap 3 detik
    useEffect(() => {
        if (!designs || designs.length === 0) return;
        
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % designs.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [designs]);

    if (!designs || designs.length === 0) return null;

    return (
        <div className="relative w-full h-[400px] md:h-[450px] flex justify-center items-center overflow-hidden py-8">
            {designs.map((design, index) => {
                // Menghitung jarak kartu dari posisi tengah (activeIndex)
                const total = designs.length;
                let offset = (index - activeIndex) % total;
                
                // Memastikan rotasi (loop) posisi tetap mulus tanpa terputus
                if (offset < -Math.floor(total / 2)) offset += total;
                if (offset > Math.floor(total / 2)) offset -= total;

                // Menentukan class Tailwind untuk transisi gaya 3D
                let positionClasses = "";
                let zIndex = 0;

                if (offset === 0) {
                    // KARTU TENGAH (Fokus)
                    positionClasses = "translate-x-0 scale-100 opacity-100 blur-0 shadow-[8px_8px_0px_rgba(0,0,0,1)]";
                    zIndex = 30;
                } else if (offset === 1) {
                    // KARTU KANAN
                    positionClasses = "translate-x-[70%] md:translate-x-[85%] scale-75 opacity-50 blur-[2px] cursor-pointer hover:opacity-80 hover:blur-none shadow-none";
                    zIndex = 20;
                } else if (offset === -1) {
                    // KARTU KIRI
                    positionClasses = "-translate-x-[70%] md:-translate-x-[85%] scale-75 opacity-50 blur-[2px] cursor-pointer hover:opacity-80 hover:blur-none shadow-none";
                    zIndex = 20;
                } else {
                    // KARTU TERSEMBUNYI (Lebih dari 1 langkah di belakang)
                    positionClasses = offset > 0 
                        ? "translate-x-[150%] scale-50 opacity-0" 
                        : "-translate-x-[150%] scale-50 opacity-0";
                    zIndex = 10;
                }

                return (
                    <div 
                        key={design.id} 
                        onClick={() => setActiveIndex(index)} // Klik untuk menggeser secara manual
                        className={`absolute w-64 md:w-80 bg-white border-4 border-text rounded-xl overflow-hidden transition-all duration-700 ease-in-out ${positionClasses}`}
                        style={{ zIndex }}
                    >
                        <Image 
                            src={design.imageUrl} 
                            alt={design.title} 
                            width={400} 
                            height={400} 
                            className="w-full h-64 md:h-72 object-cover border-b-4 border-text"
                        />
                        <div className="p-4 text-center bg-gray-100">
                            <h3 className="font-bold font-retro text-lg truncate text-black">{design.title}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function GalleryGrid({ designs }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(true); // State baru untuk melacak loading gambar

    // Fungsi untuk membuka modal dan mereset status loading
    const openModal = (design) => {
        setSelectedImage(design);
        setIsImageLoading(true); // Set true setiap kali gambar baru diklik
    };

    if (!designs || designs.length === 0) {
        return <div className="text-center text-lg">Belum ada karya desain.</div>;
    }

    return (
        <>
            {/* Grid Galeri */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {designs.map((design) => (
                    <div 
                        key={design.id} 
                        onClick={() => openModal(design)} 
                        className="break-inside-avoid relative rounded-xl overflow-hidden shadow-md border-4 border-text hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 bg-white cursor-pointer group"
                    >
                        <Image 
                            src={design.imageUrl} 
                            alt={design.title} 
                            width={600} 
                            height={800} 
                            className="w-full h-auto object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                            <span className="bg-primary text-text px-4 py-2 font-bold font-retro rounded-lg border-4 border-text shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110">
                                🔍 Perbesar
                            </span>
                        </div>

                        <div className="p-4 border-t-4 border-text bg-gray-100 relative z-20">
                            <h3 className="font-bold text-xl">{design.title}</h3>
                            {design.description && <p className="text-sm mt-2">{design.description}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal / Lightbox */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 md:p-8 transition-opacity"
                    onClick={() => setSelectedImage(null)} 
                >
                    <button 
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-red-500 hover:bg-red-600 border-4 border-white font-bold px-4 py-2 rounded-lg font-retro shadow-[4px_4px_0px_rgba(255,255,255,1)] z-50 transition-transform hover:scale-105"
                        onClick={() => setSelectedImage(null)}
                    >
                        X
                    </button>
                    
                    <div 
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center min-h-[300px]"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* ANIMASI LOADING SPINNER (Bergaya Retro) */}
                        {isImageLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-4">
                                <div className="w-16 h-16 border-8 border-gray-300 border-t-black rounded-full animate-spin"></div>
                                <span className="text-white font-retro font-bold animate-pulse text-xl drop-shadow-md">
                                    MEMUAT...
                                </span>
                            </div>
                        )}

                        <Image 
                            src={selectedImage.imageUrl} 
                            alt={selectedImage.title} 
                            width={1200} 
                            height={1200} 
                            // Set isImageLoading ke false saat gambar selesai dimuat oleh browser
                            onLoad={() => setIsImageLoading(false)} 
                            // Sembunyikan gambar (opacity-0) selama loading agar transisinya mulus
                            className={`w-auto max-h-[75vh] object-contain border-4 border-white rounded-xl shadow-[8px_8px_0px_rgba(255,255,255,0.5)] bg-bg transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                        />
                        
                        {/* Judul akan disembunyikan sampai gambar selesai loading */}
                        {!isImageLoading && (
                            <div className="mt-4 bg-white px-6 py-2 rounded-lg border-4 border-text shadow-[4px_4px_0px_rgba(255,255,255,1)] text-center max-w-lg animate-fade-in">
                                <h3 className="font-bold font-retro text-lg md:text-xl text-black">{selectedImage.title}</h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import AutoCarousel from './autoCarousel';

export default async function Gallery() {
    // Hanya ambil 5 karya terbaru untuk di carousel halaman utama
    const { data: designs, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) console.error("Gagal mengambil data galeri:", error);

    return (
        <section id="gallery" className="py-20 bg-primary scroll-mt-[68px]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-retro text-text">Design Gallery</h2>
                        <p className="text-sm md:text-base text-text font-retro mt-2">Cuplikan karya grafis dan visual saya.</p>
                    </div>
                    {/* Tombol ke halaman penuh */}
                    <Link href="/gallery" className="hidden md:inline-block bg-accent text-text font-bold py-2 px-4 border-2 border-text rounded hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all font-retro">
                        Lihat Semua →
                    </Link>
                </div>
               <AutoCarousel designs={designs} />
                
                {/* Tombol mobile */}
                <Link href="/gallery" className="md:hidden block text-center mt-6 bg-accent text-text font-bold py-3 px-4 border-4 border-text rounded hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all font-retro">
                    Lihat Semua Karya →
                </Link>
            </div>
        </section>
    );
}
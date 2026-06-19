import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import GalleryGrid from '@/components/GalleryGrid'; 

export const dynamic = 'force-dynamic';

export default async function FullGalleryPage() {
    
    const { data: designs, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) console.error("Gagal mengambil data galeri:", error);

    return (
        <main className="py-24 bg-bg min-h-screen text-black font-retro">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/#gallery" className="inline-block mb-8 text-sm font-bold bg-gray-200 border-4 border-text px-4 py-2 rounded-lg hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition duration-200">
                    ← Kembali
                </Link>
                
                <h1 className="text-4xl text-text md:text-5xl font-bold mb-4 border-b-4 border-text pb-4">Galeri Desain</h1>
                <p className="mb-12 text-lg text-text">Kumpulan eksplorasi visual, desain grafis, dan aset yang saya buat.</p>

                {/* Sisipkan grid yang sudah dilengkapi fitur modal/zoom di sini */}
                <GalleryGrid designs={designs} />
            </div>
        </main>
    );
}
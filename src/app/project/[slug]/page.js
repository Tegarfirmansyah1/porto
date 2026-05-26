import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default async function ProjectDetail({ params }) {
    // Ambil slug langsung dari parameter bawaan Next.js
    const { slug } = params;

    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-retro gap-4 text-black bg-bg">
                <h2 className="text-2xl font-bold">Proyek tidak ditemukan!</h2>
                <Link href="/" className="text-secondary hover:underline font-bold">
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <main className="py-20 bg-bg min-h-screen text-black font-retro">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/#projects" className="inline-block mb-6 text-sm font-bold bg-gray-200 border-4 border-text px-4 py-2 rounded-lg hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition duration-200">
                    ← Kembali ke Portfolio
                </Link>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 border-b-4 border-text pb-4">{project.title}</h1>
                
                <div className="border-4 border-text rounded-xl overflow-hidden bg-white p-4 mb-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                    <Image 
                        src={project.imgSrc} 
                        alt={project.title} 
                        width={800} 
                        height={450} 
                        className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                        priority
                    />
                </div>

                {/* SISA KODE KONTEN DESKRIPSI ANDA SAMA SEPERTI SEBELUMNYA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-secondary">Deskripsi Proyek</h2>
                            <p className="text-sm md:text-base leading-relaxed bg-gray-100 p-4 border-4 border-text rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] text-justify">
                                {project.longDescription || project.description}
                            </p>
                        </div>
                        {project.challenges && (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-accent">Tantangan & Solusi</h2>
                                <p className="text-sm md:text-base leading-relaxed bg-gray-100 p-4 border-4 border-text rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] text-justify">
                                    {project.challenges}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Teknologi yang Digunakan</h2>
                            <div className="flex flex-wrap gap-2 bg-gray-100 p-4 border-4 border-text rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                {project.tags?.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-accent text-text rounded-full text-xs md:text-sm font-bold border-2 border-text">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.liveDemo && (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Tautan</h2>
                                <a 
                                    href={project.liveDemo} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="block text-center bg-secondary text-text py-3 rounded-xl hover:bg-blue font-bold border-4 border-text shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition duration-200"
                                >
                                    Kunjungi Live Demo →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
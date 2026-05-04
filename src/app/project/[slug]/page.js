

import { projectData } from "@/data/projectData";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetailPage({ params }) {
    const { slug } = params;
    
    const project = projectData.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="bg-retro-bg min-h-screen flex items-center justify-center">
                <div className="text-center font-retro">
                    <h1 className="text-4xl text-retro-red-orange">404</h1>
                    <p className="text-2xl text-retro-text">Proyek tidak ditemukan.</p>
                    <Link href="/" className="text-retro-purple hover:underline mt-4 inline-block">Kembali ke Halaman Utama</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pt-28 font-retro">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 md:p-8 rounded-xl border-4 border-text shadow-lg">
                    <Link href="/#projects" className="text-accent hover:underline mb-6 inline-block">
                        &larr; Back
                    </Link>

                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">{project.title}</h1>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-secondary text-text rounded-full text-sm border-2 border-text">{tag}</span>
                        ))}
                    </div>

                    <Image src={project.imgSrc} alt={project.title} width={800} height={450} className="rounded-lg border-2 border-text w-full object-cover mb-6" />

                    <h2 className="text-2xl font-bold text-black mb-2">Tentang Proyek</h2>
                    <p className="text-black text-lg mb-6">{project.longDescription}</p>

                    <h2 className="text-2xl font-bold text-black mb-2">Tantangan & Solusi</h2>
                    <p className="text-black text-lg mb-8">{project.challenges}</p>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-center bg-success text-white py-3 px-6 rounded-md text-sm md:text-lg border-2 border-retro-text hover:bg-retro-purple transition-colors">Lihat Live Demo</a>
                    </div>
                </div>
            </main>
        </div>
    );
}
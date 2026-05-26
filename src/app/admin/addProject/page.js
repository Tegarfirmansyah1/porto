'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Navsecond';
import Footer from "@/components/Footer";



export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', longDescription: '', challenges: '', liveDemo: '', tags: ''
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [file, setFile] = useState(null);
  const router = useRouter();

    useEffect(() => {
    const checkUser = async () => {
        // Cek apakah ada sesi login yang aktif
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
        // Jika tidak ada session (belum login), tendang ke halaman login
        alert('Anda harus login terlebih dahulu!');
        router.push('/admin/login');
        } else {
        // Jika sudah login, matikan status checking dan tampilkan form
        setIsCheckingAuth(false);
        }
    };

    checkUser();
    }, [router]);

  // Jika masih proses pengecekan, tampilkan tulisan loading (mencegah form berkedip)
  if (isCheckingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-white">Memeriksa akses...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Upload Gambar ke Supabase Storage (opsional, jika ada file)
    let imageUrl = '';
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: imgData, error: imgError } = await supabase.storage
        .from('projectImage')
        .upload(fileName, file);
        
      if (imgError) throw imgError;
      
      const { data: publicUrlData } = supabase.storage
        .from('projectImage')
        .getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    // 2. Insert data ke Tabel Projects
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()); // Ubah string CSV jadi array
    
    const { data, error } = await supabase
      .from('projects')
      .insert([
        { 
          ...formData, 
          imgSrc: imageUrl, 
          tags: tagsArray 
        }
      ]);

    if (error) {
      alert('Gagal menambahkan project!');
      console.error(error);
    } else {
      alert('Project berhasil ditambahkan!');
      // Reset form atau redirect
    }
  };

return (
        <div>
          <Nav/>
          <main>
            <div className="min-h-screen flex items-center justify-center bg-bg font-retro p-4">
                <form onSubmit={handleSubmit} className="mt-28 mb-10 bg-white p-8 rounded-xl border-4 border-text shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-4 w-full max-w-md">
                <h2 className="text-2xl text-black font-bold mb-4">Add New Project</h2>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="w-full mb-3 p-2 border rounded" />
                <input type="text" name="slug" placeholder="Slug (unique)" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required className="w-full mb-3 p-2 border rounded" />
                <textarea name="description" placeholder="Short Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required className="w-full mb-3 p-2 border rounded" />
                <textarea name="longDescription" placeholder="Long Description" value={formData.longDescription} onChange={e => setFormData({ ...formData, longDescription: e.target.value })} required className="w-full mb-3 p-2 border rounded" />
                <textarea name="challenges" placeholder="Challenges Faced" value={formData.challenges} onChange={e => setFormData({ ...formData, challenges: e.target.value })} required className="w-full mb-3 p-2 border rounded" />
                <input type="text" name="liveDemo" placeholder="Live Demo URL" value={formData.liveDemo} onChange={e => setFormData({ ...formData, liveDemo: e.target.value })} className="w-full mb-3 p-2 border rounded" />
                <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full mb-3 p-2 border rounded" />
                <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full text-black mb-3 p-2 border rounded" />
                <button type="submit" className="bg-secondary text-text font-bold p-3 rounded border-2 border-text hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">Add Project</button>
                </form>
            </div>
          </main>
          <Footer />
        </div>

  );
}
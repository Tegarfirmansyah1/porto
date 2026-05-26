'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import imageCompression from 'browser-image-compression';
import NavSecond from '@/components/Navsecond';
import Footer from "@/components/Footer";

export default function AddGallery() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // (Opsional) Tambahkan useEffect pengecekan login di sini seperti pada addProject

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih gambar terlebih dahulu!");
    setIsUploading(true);

    try {
      // 1. Kompresi Gambar
      const options = {
        maxSizeMB: 0.3, // Maksimal 300KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      // 2. Upload ke Supabase Storage
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { data: imgData, error: imgError } = await supabase.storage
        .from('galeryImage')
        .upload(fileName, compressedFile);
        
      if (imgError) throw imgError;

      const { data: publicUrlData } = supabase.storage
        .from('galeryImage')
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData.publicUrl;

      // 3. Simpan ke Database
      const { error: dbError } = await supabase
        .from('gallery')
        .insert([{ title, description, imageUrl }]);

      if (dbError) throw dbError;

      alert("Karya desain berhasil ditambahkan!");
      router.push('/admin/addGallery');
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
<div>
    <NavSecond />
    <div className="min-h-screen flex items-center justify-center bg-bg font-retro p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border-4 border-text shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-4">Tambah Karya Desain</h2>
        <input type="text" placeholder="Judul Karya" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 text-black border-2 border-text rounded bg-gray-100" required />
        <textarea placeholder="Deskripsi (Opsional)" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 text-black border-2 border-text rounded bg-gray-100 h-24" />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="p-2 text-black border-2 border-text rounded bg-gray-100" required />
        <button type="submit" disabled={isUploading} className="bg-secondary text-text font-bold p-3 rounded border-2 border-text hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
          {isUploading ? 'Mengunggah...' : 'Upload Karya'}
        </button>
      </form>
    </div>
    <Footer />
</div>
  );
}
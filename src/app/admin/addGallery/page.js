'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import imageCompression from 'browser-image-compression';
import NavSecond from '@/components/Navsecond';
import Footer from "@/components/Footer";
import Image from 'next/image';

export default function ManageGallery() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // State untuk Edit & Data List
  const [editingId, setEditingId] = useState(null); 
  const [oldImageUrl, setOldImageUrl] = useState(''); 
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching galleries:", error);
    else setGalleries(data);
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setEditingId(null);
    setOldImageUrl('');
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !file) return alert("Pilih gambar terlebih dahulu!");
    setIsUploading(true);

    try {
      let imageUrl = oldImageUrl; 

      if (file) {
        // 1. Kompresi Gambar
        const options = {
          maxSizeMB: 0.3, 
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // 2. Upload ke Supabase Storage (Bucket: galeryImage)
        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        
        const { error: imgError } = await supabase.storage
          .from('galeryImage')
          .upload(fileName, compressedFile);
          
        if (imgError) throw imgError;

        const { data: publicUrlData } = supabase.storage
          .from('galeryImage')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrlData.publicUrl;
      }

      // 3. Simpan ke Database
      if (editingId) {
        const { error: dbError } = await supabase
          .from('gallery')
          .update({ title, description, imageUrl })
          .eq('id', editingId);

        if (dbError) throw dbError;
        alert("Karya desain berhasil diperbarui!");
      } else {
        const { error: dbError } = await supabase
          .from('gallery')
          .insert([{ title, description, imageUrl }]);

        if (dbError) throw dbError;
        alert("Karya desain berhasil ditambahkan!");
      }

      resetForm();
      fetchGalleries(); 
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description || '');
    setOldImageUrl(item.imageUrl);
    setFile(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleDelete = async (id, imageUrl) => {
    if (!confirm("Apakah Anda yakin ingin menghapus karya ini?")) return;

    try {
      if (imageUrl) {
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        await supabase.storage.from('galeryImage').remove([fileName]);
      }

      const { error: dbError } = await supabase.from('gallery').delete().eq('id', id);
      if (dbError) throw dbError;

      alert("Karya berhasil dihapus!");
      fetchGalleries(); 
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div>
      <NavSecond />
      <div className="min-h-screen flex flex-col items-center bg-bg font-retro p-4 gap-12 pt-12 pb-24">
        
        {/* FORM MENGGUNAKAN STYLE YANG ANDA MINTA */}
        <form onSubmit={handleSubmit} className="bg-white mt-28 p-8 rounded-xl border-4 border-text shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-4">
            {editingId ? 'Edit Karya Desain' : 'Tambah Karya Desain'}
          </h2>
          
          <input type="text" placeholder="Judul Karya" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 text-black border-2 border-text rounded bg-gray-100" required />
          <textarea placeholder="Deskripsi (Opsional)" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 text-black border-2 border-text rounded bg-gray-100 h-24" />
          
          <div className="flex flex-col gap-1">
            {editingId && oldImageUrl && !file && (
              <span className="text-xs font-bold text-gray-500 mb-1">Ganti Gambar (Opsional)</span>
            )}
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="p-2 text-black border-2 border-text rounded bg-gray-100" required={!editingId} />
          </div>

          <div className="flex gap-2 mt-2">
            <button type="submit" disabled={isUploading} className="flex-1 bg-secondary text-text font-bold p-3 rounded border-2 border-text hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
              {isUploading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Upload Karya')}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-red-500 text-white font-bold px-4 rounded border-2 border-text hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                Batal
              </button>
            )}
          </div>
        </form>

        {/* LIST DATA GALLERY */}
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-text mb-6 border-b-4 border-text inline-block pr-8 pb-2">Daftar Karya Desain</h2>
          
          {isLoading ? (
            <p className="text-text font-bold">Memuat data galeri...</p>
          ) : galleries.length === 0 ? (
            <p className="text-text">Belum ada karya desain yang diupload.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((item) => {
                // PENGAMANAN EMPTY STRING NEXT IMAGE
                const imgSrc = item.imageUrl && item.imageUrl !== "" ? item.imageUrl : '/assets/images/project1.png';

                return (
                  <div key={item.id} className="bg-white rounded-xl border-4 border-text shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
                    <div className="relative h-48 w-full border-b-4 border-text bg-gray-200">
                      <Image 
                        src={imgSrc} 
                        alt={item.title} 
                        fill
                        unoptimized={true}
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-black mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">{item.description || 'Tidak ada deskripsi'}</p>
                      
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => handleEdit(item)} className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded border-2 border-text hover:bg-yellow-500 transition-all">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id, item.imageUrl)} className="flex-1 bg-red-500 text-white font-bold py-2 rounded border-2 border-text hover:bg-red-600 transition-all">
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}
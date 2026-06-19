'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import imageCompression from 'browser-image-compression';
import NavSecond from '@/components/Navsecond';
import Footer from "@/components/Footer";
import Image from 'next/image';

export default function AddProject() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    challenges: '',
    liveDemo: '',
    tags: ''
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [oldImgSrc, setOldImgSrc] = useState(''); 
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching projects:", error);
    else setProjects(data);
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      longDescription: '',
      challenges: '',
      liveDemo: '',
      tags: ''
    });
    setFile(null);
    setEditingId(null);
    setOldImgSrc('');
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !file) return alert("Pilih gambar terlebih dahulu!");
    setIsUploading(true);

    try {
      let currentImgSrc = oldImgSrc;

      if (file) {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        
        const { error: imgError } = await supabase.storage
          .from('projectImage')
          .upload(fileName, compressedFile);
          
        if (imgError) throw imgError;

        const { data: publicUrlData } = supabase.storage
          .from('projectImage')
          .getPublicUrl(fileName);
        
        currentImgSrc = publicUrlData.publicUrl;
      }

      // PERBAIKAN TAGS: Memecah string "s, project, a" menjadi Array ["s", "project", "a"]
      // .map(tag => tag.trim()) digunakan agar spasi dihilangkan (contoh: " project " jadi "project")
      const formattedTags = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') 
        : [];

      const projectPayload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDescription: formData.longDescription,
        challenges: formData.challenges,
        liveDemo: formData.liveDemo,
        tags: formattedTags, // Mengirim data sebagai Array, bukan teks biasa
        imgSrc: currentImgSrc 
      };

      if (editingId) {
        const { error: dbError } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', editingId);
        if (dbError) throw dbError;
        alert("Project berhasil diperbarui!");
      } else {
        const { error: dbError } = await supabase
          .from('projects')
          .insert([projectPayload]);
        if (dbError) throw dbError;
        alert("Project berhasil ditambahkan!");
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data. Cek Console browser (F12) untuk detail error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    
    // PERBAIKAN EDIT TAGS: Jika data berupa array, gabungkan kembali jadi string dipisah koma
    const tagsString = Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '');

    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      description: item.description || '',
      longDescription: item.longDescription || '',
      challenges: item.challenges || '',
      liveDemo: item.liveDemo || '',
      tags: tagsString // Memasukkan string kembali ke form
    });
    setOldImgSrc(item.imgSrc);
    setFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, imgSrcParam) => {
    if (!confirm("Apakah Anda yakin ingin menghapus project ini?")) return;

    try {
      if (imgSrcParam) {
        const fileName = imgSrcParam.substring(imgSrcParam.lastIndexOf('/') + 1);
        await supabase.storage.from('projectImage').remove([fileName]);
      }
      
      const { error: dbError } = await supabase.from('projects').delete().eq('id', id);
      if (dbError) throw dbError;

      alert("Project berhasil dihapus!");
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div>
      <NavSecond />
      <div className="min-h-screen flex flex-col items-center bg-bg font-retro p-4 gap-12 pt-12 pb-24">
        
        <form onSubmit={handleSubmit} className="mt-28 mb-10 bg-white p-8 rounded-xl border-4 border-text shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-2xl text-black font-bold mb-4">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          <input type="text" name="slug" placeholder="Slug (unique)" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          <textarea name="description" placeholder="Short Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          <textarea name="longDescription" placeholder="Long Description" value={formData.longDescription} onChange={e => setFormData({ ...formData, longDescription: e.target.value })} required className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          <textarea name="challenges" placeholder="Challenges Faced" value={formData.challenges} onChange={e => setFormData({ ...formData, challenges: e.target.value })} required className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          <input type="text" name="liveDemo" placeholder="Live Demo URL" value={formData.liveDemo} onChange={e => setFormData({ ...formData, liveDemo: e.target.value })} className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full mb-3 p-2 text-black border-2 border-text rounded bg-gray-100" />
          
          <div className="flex flex-col mb-3">
             {editingId && oldImgSrc && !file && (
              <span className="text-xs font-bold text-gray-500 mb-1">Ganti Gambar (Opsional)</span>
             )}
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="w-full text-black p-2 border-2 border-text rounded bg-gray-100" />
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={isUploading} className="flex-1 bg-secondary text-text font-bold p-3 rounded border-2 border-text hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
              {isUploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Add Project')}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="bg-red-500 text-white font-bold p-3 rounded border-2 border-text hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-text mb-6 border-b-4 border-text inline-block pr-8 pb-2">Daftar Project</h2>
          
          {isLoading ? (
            <p className="text-text font-bold">Memuat data project...</p>
          ) : projects.length === 0 ? (
            <p className="text-text">Belum ada project yang diupload.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((item) => {
                const imageSource = item.imgSrc && item.imgSrc !== "" ? item.imgSrc : '/assets/images/project1.png';

                return (
                  <div key={item.id} className="bg-white rounded-xl border-4 border-text shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
                    <div className="relative h-48 w-full border-b-4 border-text bg-gray-200">
                      <Image 
                        src={imageSource} 
                        alt={item.title} 
                        fill
                        unoptimized={true}
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-black mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-gray-700 text-sm font-semibold mb-1">Slug: {item.slug}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">{item.description || '-'}</p>
                      
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => handleEdit(item)} className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded border-2 border-text hover:bg-yellow-500 transition-all">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id, item.imgSrc)} className="flex-1 bg-red-500 text-white font-bold py-2 rounded border-2 border-text hover:bg-red-600 transition-all">
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
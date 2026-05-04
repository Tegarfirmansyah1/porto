// app/maintenance/page.js
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    
    // Container utama untuk memenuhi layar dan menengahkan konten
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-retro">
      
      {/* Kartu konten maintenance */}
      <div className="text-center w-full max-w-md bg-background/50 p-8 rounded-xl border-4 border-text shadow-lg">
        
        {/* Ikon */}
        <div className="text-6xl mb-4">
          🚧
        </div>
        
        {/* Judul Utama */}
        <h1 className="text-4xl font-bold text-text mb-2">
          Segera Kembali!
        </h1>
        
        {/* Pesan Penjelasan */}
        <p className="text-text/80 text-lg mb-8">
          Maaf, halaman proyek ini sedang dalam pemeliharaan agar menjadi lebih baik. Silakan periksa kembali lagi nanti.
        </p>
        
        {/* Tombol Kembali ke Halaman Utama */}
        <Link href="/" className="inline-block bg-primary text-text px-8 py-3 rounded-lg hover:bg-secondary transition-colors border-2 border-text shadow-[5px_5px_0px_theme(colors.text)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-xl">
            Kembali ke Portofolio
        </Link>

      </div>
    </div>
  );
}
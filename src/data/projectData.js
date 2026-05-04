
export const projectData = [
  {
    slug: "ecommerce-platform",
    imgSrc: "/assets/images/project1.png",
    title: "E-commerce Platform",
    description: "A full-stack online shopping platform built with PHP and SQL.",
    longDescription: "Ini adalah platform e-commerce fungsional yang dibuat dari awal, mencakup fitur-fitur penting seperti katalog produk, keranjang belanja, proses checkout, dan panel admin untuk mengelola produk. Tujuannya adalah untuk memahami alur kerja e-commerce secara end-to-end.",
    challenges: "Tantangan utama adalah merancang skema database yang efisien untuk relasi antara user, produk, dan transaksi. Solusinya adalah dengan normalisasi database dan penggunaan query SQL yang dioptimalkan untuk performa.",
    tags: ["PHP", "SQL", "Bootstrap"],
    liveDemo: "https://tegar-firmansyah.vercel.app/maintenance", 
  },
  {
    slug: "chatting-web-prototype",
    imgSrc: "/assets/images/project2.png",
    title: "Prototipe Chating Web",
    description: "Desain UI/UX with prototype chatting web built with Figma.",
    longDescription: "Proyek ini berfokus pada desain antarmuka (UI) dan pengalaman pengguna (UX) untuk aplikasi web chatting. Prosesnya meliputi pembuatan wireframe, mockup high-fidelity, dan prototipe interaktif menggunakan Figma. Tujuannya adalah menciptakan desain yang bersih, intuitif, dan mudah digunakan.",
    challenges: "Menjaga konsistensi desain di berbagai komponen (chat bubbles, contact list, settings) adalah tantangan utama. Saya menyelesaikannya dengan membuat Design System sederhana di Figma, yang mencakup komponen, warna, dan tipografi yang dapat digunakan kembali.",
    tags: ["Figma", "CorelDraw", "UI/UX"],
    liveDemo: "https://www.figma.com/design/MVQmZn1wxAM6XS6YPnrOuK/Gars?node-id=0-1&m=dev&t=7TuSv3Pq0wuuqWdt-1",
  },
  {
    slug: "Progress-Tracker",
    imgSrc: "/assets/images/project3.png",
    title: "UPLY Progress Tracker",
    description: "Website Progres Tracker yang dibangun menggunakan Next.js,TypeScript, Tailwind CSS dan Supabase.",
    longDescription: "Uply adalah aplikasi web full-stack pelacak progres (progress tracker) yang dirancang untuk membantu pengguna mencatat, memonitor, dan membagikan aktivitas mereka melalui fitur seperti dashboard analitik, pengisian log, riwayat aktivitas (history), pengaturan (settings), dan fitur berbagi (share). Aplikasi produktivitas ini dibangun dengan teknologi modern, memanfaatkan kerangka kerja Next.js dan TypeScript untuk performa aplikasi yang optimal, serta Tailwind CSS untuk menghasilkan desain antarmuka yang responsif. Untuk mendukung keamanan dan penyimpanan datanya, Uply dilengkapi dengan sistem autentikasi pengguna (login) dan mengandalkan Supabase sebagai layanan backend terintegrasi untuk mengelola manajemen basis data secara efisien.",
    challenges: "Tantangan utama dalam membangun Uply berpusat pada kompleksitas integrasi kerangka kerja Next.js dan TypeScript dengan layanan backend Supabase. Kendala teknis yang paling krusial biasanya melibatkan pengelolaan state autentikasi pengguna pada halaman login dan memproteksi rute privat seperti dashboard, history, dan settings secara aman di tingkat server. Sebagai solusinya, konfigurasi modul klien Supabase diimplementasikan secara terpusat untuk menjaga sinkronisasi sesi pengguna dengan mulus tanpa mengorbankan performa. Selain itu, penerapan TypeScript dimaksimalkan untuk mendefinisikan tipe data yang ketat antara database relasional dan komponen antarmuka, sehingga meminimalisir bug dan memastikan fungsionalitas fitur pencatatan log berjalan dengan sangat stabil.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    liveDemo: "https://uply.tegarfirmansyah.my.id",
  },
   {
    slug: "shortened-url",
    imgSrc: "/assets/images/project4.png",
    title: "Shortened URL",
    description: "Shortened URL website built with Tailwind CSS and FullStack Next js.",
    longDescription: "Aplikasi ini memungkinkan pengguna untuk memendekkan URL yang panjang menjadi link yang lebih singkat dan mudah dibagikan. Dibangun secara full-stack dengan Next.js, aplikasi ini menangani request di sisi server, berinteraksi dengan database untuk menyimpan URL asli dan yang dipendekkan, serta menyediakan antarmuka yang bersih di sisi klien.",
    challenges: "Tantangan utamanya adalah membangun sistem full-stack yang kompleks. Ini mencakup pembuatan REST API untuk logika autentikasi pengguna, validasi slug kustom secara real-time untuk mencegah duplikasi, dan merancang skema database untuk menyimpan data URL serta melacak jumlah klik. Di sisi backend, saya juga mengimplementasikan logika untuk mengatur masa aktif tautan (URL expiry).",tags: ["Next.js", "Full-Stack", "Tailwind CSS"],
    liveDemo: "https://5ort.vercel.app",
  }
];
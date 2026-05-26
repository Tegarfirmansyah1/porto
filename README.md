# Portofolio Pribadi Tegar Firmansyah

 Selamat datang di repositori kode untuk situs portofolio pribadi saya. Proyek ini dibangun untuk menampilkan proyek-proyek, keahlian, dan perjalanan saya sebagai seorang Web Developer. Situs ini dirancang dengan estetika retro yang unik dan dilengkapi dengan beberapa tema yang dapat diganti.

**[Lihat Live Demo](https://tegarfirmansyah.my.id)**

## Fitur Utama

  - **Desain Retro & Responsif**: Antarmuka yang terinspirasi dari gaya retro, sepenuhnya responsif dan dapat diakses di berbagai perangkat, dari desktop hingga mobile.
  - **Multi-Tema Dinamis**: Pengguna dapat memilih antara tiga tema berbeda (Retro, Modern Dark, Forest) secara *real-time* menggunakan *Theme Switcher*.
  - **Bagian Portofolio**:
      - **Hero Section**: Sambutan hangat dengan tautan cepat untuk melihat karya-karya saya.
      - **Projects**: Galeri proyek yang menampilkan karya-karya terbaik saya, lengkap dengan deskripsi, teknologi yang digunakan, dan tautan ke halaman detail.
      - **Skills**: Visualisasi keahlian utama saya di bidang pengembangan web dan desain.
      - **Contact Form**: Formulir kontak fungsional yang terintegrasi dengan **Resend** untuk mengirim email langsung dari situs.
  - **Halaman Detail Proyek**: Setiap proyek memiliki halaman khususnya sendiri yang di-generate secara dinamis, menampilkan informasi mendalam tentang proyek tersebut.
  - **SEO-Friendly**: Dikonfigurasi dengan metadata yang relevan untuk optimisasi mesin pencari (SEO), termasuk verifikasi untuk Google Search Console.
  - **Custom CMS & Database Dinamis**: Tidak lagi menggunakan data statis. Portofolio ini terintegrasi dengan Supabase, dilengkapi dengan sistem login kustom untuk menambah, mengedit, atau menghapus proyek dan karya desain secara *real-time*.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi modern untuk memastikan performa yang cepat dan pengalaman pengembangan yang efisien:

  - **Framework**: [Next.js](https://nextjs.org/) (App Router)
  - **Library UI**: [React](https://reactjs.org/)
  - **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  - **Pengiriman Email**: [Resend](https://resend.com/)
  - **Deployment**: [Vercel](https://vercel.com/)
  - **Database, Auth & Storage**: [Supabase](https://supabase.com/)

## Arsitektur Database (Supabase)

Proyek ini memanfaatkan Supabase (PostgreSQL) untuk manajemen data dinamis dengan struktur berikut:

- **Tabel `projects`**: Menyimpan detail portofolio web (termasuk *slug* unik, judul, deskripsi panjang, tantangan teknis, tag teknologi, dan tautan *live demo*).
- **Tabel `gallery`**: Menyimpan metadata untuk karya desain grafis/visual.
- **Supabase Storage**: Bucket penyimpanan untuk aset gambar proyek dan galeri. (Gambar dikompresi secara otomatis di sisi klien sebelum diunggah untuk menghemat ruang).

## Memulai Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/Tegarfirmansyah1/porto.git
    cd porto
    ```

2.  **Instal dependensi:**

    ```bash
    npm install
    ```

3.  **Konfigurasi Variabel Lingkungan:**
    Buat file `.env.local` di root proyek tambahkan API Key dari Resend dan database URL Anda.

    ```
    env
    #RESEND_API_KEY="YOUR_API_KEY"
    #YOUR DATABASE URL
    ```

4.  **Jalankan server pengembangan:**

    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Hubungi Saya

Anda dapat menghubungi saya melalui:

  - **LinkedIn**: [Tegar Firmansyah](https://www.linkedin.com/in/tegar-firmansyah-081581244)
  - **GitHub**: [@Tegarfirmansyah1](https://github.com/Tegarfirmansyah1)
  - **Instagram**: [@tegarfirmansyah\_00](https://www.instagram.com/tegarfirmansyah_00)

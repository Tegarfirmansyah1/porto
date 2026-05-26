/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // GANTI INI dengan ID Supabase Anda (bisa dilihat di URL Dashboard Supabase)
        hostname: 'ixnljjhcijkyccwkjkuc.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
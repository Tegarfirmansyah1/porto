
import { Inter } from "next/font/google";
import ThemeProvider from '@/components/ThemeProvider';
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tegar Firmansyah | Full-Stack Web Developer",
  description: "Portofolio pribadi Tegar Firmansyah, seorang web developer yang berfokus pada Next.js, React, dan Tailwind CSS. Lihat proyek-proyek terbaru saya di sini.",
verification: {
    google: 'BAdKHHR56G4z4xt0qZA7cjEjdBFv1BZdyWXB039gQms', 
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

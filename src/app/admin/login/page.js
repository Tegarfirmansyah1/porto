'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Footer from "@/components/Footer";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Proses login ke Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Login gagal: ' + error.message);
    } else {
      alert('Login berhasil!');
      router.push('/admin/addProject'); // Arahkan ke halaman form post project
    }
  };

  return (
    <div>
        <nav id="navbar" className="fixed w-full bg-background shadow-lg z-50 border-b-4 border-text">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between items-center py-5">
                            <span className="text-2xl font-bold text-text font-retro">Portofolio</span>
                            
                            <div className="md:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="text-text focus:outline-none">
                                    {isOpen ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                    )}
                                </button>
                            </div>
        
                            <div className="hidden md:flex space-x-8 font-retro text-lg">
                                    <ThemeSwitcher />
                            </div>
                        </div>
                        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
                                <ThemeSwitcher />
                        </div>
                    </div>
                </nav>
            <main>
                <div className="min-h-screen flex items-center justify-center bg-retro">
                <form onSubmit={handleLogin} className="bg-primary p-8 rounded-lg shadow-lg flex flex-col gap-4">
                    <h2 className="text-text text-2xl font-bold mb-4">Admin Login</h2>
                    <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-2 rounded text-text"
                    required
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="p-2 rounded text-text"
                    required
                    />
                    <button type="submit" className="bg-accent text-text p-2 rounded hover:bg-hover transition duration-300 font-bold">
                    Login
                    </button>
                </form>
                </div>
            </main>
            <Footer />
    </div>
  );
}
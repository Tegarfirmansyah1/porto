'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useState } from 'react';

export default function NavSecond() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('Berhasil logout!');
    router.push('/admin/login');
  };

  return (
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
                            <Link href="/admin/addGallery" className="mt-2 text-text hover:text-hover transition duration-300">
                            Gallery
                            </Link>
                            <Link href="/admin/addProject" className="mt-2 text-text hover:text-hover transition duration-300">
                            Project
                            </Link>
                                    <ThemeSwitcher />
                            <button onClick={handleLogout} className="pt-2 px-1 py-2 rounded text-red-500 hover:text-red-700 font-bold">
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
                       <div className='mr-[-10]'> <ThemeSwitcher /> </div>
                        <Link href="/admin/addGallery" className="mt-2 text-text font-bold hover:text-hover transition duration-300">
                        Gallery
                        </Link>
                       <br/>
                        <Link href="/admin/addProject" className="mt-2 text-text font-bold hover:text-hover transition duration-300">
                        Project
                        </Link>
                        <br/>
                        <button onClick={handleLogout} className=" rounded text-red-500 hover:text-red-700 font-bold">
                        Logout
                        </button>
                    </div>
                </div>
            </nav>
    
  );
}
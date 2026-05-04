"use client";

import { useState, useEffect } from 'react';
import ThemeContext from '@/context/ThemeContext';

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('retro'); 

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'retro';
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
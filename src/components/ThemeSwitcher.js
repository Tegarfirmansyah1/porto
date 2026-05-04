"use client";

import { useTheme } from '@/context/ThemeContext';

const themes = ['retro', 'modern-dark', 'forest'];

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="p-2 pt-0 bg-text/5 rounded-lg flex items-center gap-2">
            <span className="text-lg font-retro text-text">Tema:</span>
            <div className="flex gap-1">
                {themes.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${
                            theme === t ? 'border-purple' : 'border-transparent'
                        } ${t === 'retro' ? 'bg-[#FFC567]' : ''} ${t === 'modern-dark' ? 'bg-[#363636]' : ''} ${t === 'forest' ? 'bg-[#059669]' : ''}`}
                        aria-label={`Ganti ke tema ${t}`}
                    />
                ))}
            </div>
        </div>
    );
}
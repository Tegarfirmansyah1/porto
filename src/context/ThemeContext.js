"use client";

import { createContext, useContext } from 'react';

const ThemeContext = createContext({
  theme: 'retro', 
  setTheme: () => {}, 
});

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
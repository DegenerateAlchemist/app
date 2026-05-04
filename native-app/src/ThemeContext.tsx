import React, { createContext, useContext, useState } from 'react';
import { colors } from './theme';
const ThemeContext = createContext<any>(null);
export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('dark');
  const c = colors[theme === 'dark' ? 'dark' : 'light'];
  return (
    <ThemeContext.Provider value={{ theme, setTheme, c }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

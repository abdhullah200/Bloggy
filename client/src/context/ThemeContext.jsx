import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Apply theme to document root - always dark mode
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Always apply dark mode
    html.classList.add('dark');
    body.style.backgroundColor = '#141414'; // Night color
    body.style.color = '#E3DBDB'; // Timberwolf
    localStorage.setItem('theme', 'dark');
  }, []);

  // Always dark mode theme with purple accent
  const theme = {
    colors: {
      primary: '#B838FF', // Purple button color
      background: '#141414', // Night color
      surface: '#8A6552', // Raw umber color
      text: '#E3DBDB', // Timberwolf color
      textSecondary: '#FBC4AB', // Apricot color
      border: '#4a5568',
      accent: '#B838FF' // Purple accent
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode: true, 
      toggleTheme: () => {
        console.log('Theme toggle disabled - always dark mode');
      }, 
      colors: theme.colors,
      theme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
import React, { createContext, useContext, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand store for theme management
const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'dark' | 'light' | 'system'
      resolvedTheme: 'dark', // actual theme being used

      setTheme: (theme) => {
        set({ theme });

        // Resolve system preference if needed
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
          set({ resolvedTheme: systemTheme });
        } else {
          set({ resolvedTheme: theme });
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// React Context for theme
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeStore();

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      useThemeStore.setState({ resolvedTheme: newTheme });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export { useThemeStore };

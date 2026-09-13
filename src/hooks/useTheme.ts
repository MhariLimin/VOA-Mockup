import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const documentTheme = document.documentElement.dataset.theme;
  return documentTheme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('voa-theme', theme);
    const themeColour = theme === 'dark' ? '#081522' : '#f7f6f2';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColour);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
  };
}

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("nextroundprep_theme");
    return (saved as Theme) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === "light") {
      root.classList.add("theme-light");
      body.classList.add("theme-light");
      root.classList.remove("theme-dark");
      body.classList.remove("theme-dark");
    } else {
      root.classList.add("theme-dark");
      body.classList.add("theme-dark");
      root.classList.remove("theme-light");
      body.classList.remove("theme-light");
    }
    
    localStorage.setItem("nextroundprep_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

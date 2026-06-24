import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

// Readonly props — inmutables por contrato (SonarCloud S6534)
type ThemeProviderProps = {
  readonly children: React.ReactNode;
  readonly defaultTheme?: Theme;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // useMemo evita que el objeto cambie en cada render y genere re-renders innecesarios
  // en todos los consumidores del context (SonarCloud S6481)
  const contextValue = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

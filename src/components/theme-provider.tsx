"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: Theme) {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  storageKey = "theme",
}: {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    defaultTheme === "system" ? "dark" : defaultTheme
  );

  useEffect(() => {
    // Detecting client mount has no SSR equivalent — localStorage isn't available on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = storedTheme ?? defaultTheme;
    const nextTheme = initialTheme === "system" && !enableSystem ? "dark" : initialTheme;

    setThemeState(nextTheme);
    setResolvedTheme(resolveTheme(nextTheme));
  }, [defaultTheme, enableSystem, storageKey]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const nextResolved = resolveTheme(theme);
    const root = document.documentElement;
    const themeAttribute = attribute === "class" ? "class" : attribute;

    if (themeAttribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(nextResolved);
    } else {
      root.setAttribute(themeAttribute, nextResolved);
    }
    root.style.colorScheme = nextResolved;
    // Re-renders consumers (e.g. ThemeToggle) when the DOM-applied resolved theme changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolvedTheme(nextResolved);
    window.localStorage.setItem(storageKey, theme);

    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const updated = resolveTheme("system");
      if (themeAttribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(updated);
      } else {
        root.setAttribute(themeAttribute, updated);
      }
      root.style.colorScheme = updated;
      setResolvedTheme(updated);
    };

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [attribute, mounted, storageKey, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme) => {
        const effectiveTheme = nextTheme === "system" && !enableSystem ? "dark" : nextTheme;
        setThemeState(effectiveTheme);
      },
    }),
    [enableSystem, resolvedTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
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

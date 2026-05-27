import React, { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { ThemeContext } from "./ThemeContext";
import { THEMES, type ThemeName, type ThemeVariables } from "./themes";

const DEFAULT_STORAGE_KEY = "themejs:selected-theme";

export type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: ThemeName;
  storageKey?: string;
}>;

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps): React.ReactElement {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }

    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme && savedTheme in THEMES) {
      return savedTheme as ThemeName;
    }

    return defaultTheme;
  });

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const allThemeKeys: Record<string, true> = {};

    Object.keys(THEMES).forEach((themeKey) => {
      const themeValues = THEMES[themeKey as ThemeName] as ThemeVariables;
      Object.keys(themeValues).forEach((key) => {
        allThemeKeys[key] = true;
      });
    });

    Object.keys(allThemeKeys).forEach((key) => {
      root.style.removeProperty(key);
    });

    const activeTheme: ThemeName = theme;
    const selectedThemeVariables: ThemeVariables = { ...THEMES[activeTheme] };
    for (const key of Object.keys(selectedThemeVariables) as Array<
      keyof ThemeVariables
    >) {
      root.style.setProperty(key, selectedThemeVariables[key]);
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, theme);
    }
  }, [theme, storageKey]);

  const setTheme = (nextTheme: ThemeName) => {
    setThemeState(nextTheme);
  };

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
}

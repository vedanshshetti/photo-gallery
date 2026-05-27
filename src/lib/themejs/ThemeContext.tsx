import { createContext, type Context } from "react";
import type { ThemeName } from "./themes";

export interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export const ThemeContext: Context<ThemeContextValue | undefined> =
  createContext<ThemeContextValue | undefined>(undefined);

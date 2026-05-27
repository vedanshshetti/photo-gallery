export type ThemeVariables = Record<string, string>;

export const THEMES = {
  light: {
    "--background-color": "#ffffff",
    "--text-color": "#0f0f0f",
    "--accent-color": "#cdcdcd",
  },
  dark: {
    "--background-color": "#121212",
    "--text-color": "#f0f0f0",
    "--accent-color": "#434343",
  },
  ocean: {
    "--background-color": "#ecfeff",
    "--text-color": "#0f172a",
    "--accent-color": "#0891b2",
  },
  cappucino: {
    "--background-color": "#987663",
    "--text-color": "#4a312c",
    "--accent-color": "#987a5a",
  },
  solarized: {
    "--background-color": "#fdf6e3",
    "--text-color": "#657b83",
    "--accent-color": "#b58900",
  },
  forest: {
    "--background-color": "#e6f5e5",
    "--text-color": "#22543d",
    "--accent-color": "#68d391",
  },
  sunset: {
    "--background-color": "#ffecd2",
    "--text-color": "#341a1a",
    "--accent-color": "#ff6e42",
  },
  dracula: {
    "--background-color": "#282a36",
    "--text-color": "#f8f8f2",
    "--accent-color": "#bd93f9",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

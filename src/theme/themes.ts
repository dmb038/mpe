export interface ThemeConfig {
  name: string;
  label: string;
  icon: string;
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  surface: string;
  onBackground: string;
  onSurface: string;
  fontFamily: string;
  displayFont: string;
}

export const themes: Record<string, ThemeConfig> = {
  mpe: {
    name: "mpe",
    label: "Merriman Park Estates",
    icon: "🏡",
    primary: "#2E5339",
    secondary: "#6F5B3E",
    tertiary: "#375E7E",
    background: "#F5F3EE",
    surface: "#FFFFFF",
    onBackground: "#1A1A1A",
    onSurface: "#1A1A1A",
    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    displayFont: "'Fraunces', serif",
  },
};

export function getThemeCSS(theme: ThemeConfig): string {
  return `
    :root {
      --color-primary: ${theme.primary};
      --color-secondary: ${theme.secondary};
      --color-tertiary: ${theme.tertiary};
      --color-background: ${theme.background};
      --color-surface: ${theme.surface};
      --color-on-background: ${theme.onBackground};
      --color-on-surface: ${theme.onSurface};
      --font-family-body: ${theme.fontFamily};
      --font-family-display: ${theme.displayFont};
    }
  `;
}

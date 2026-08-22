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
  mcdonalds: {
    name: "mcdonalds",
    label: "McDonald's",
    icon: "🍟",
    primary: "#DA291C",
    secondary: "#FFC72C",
    tertiary: "#DA291C",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    onBackground: "#000000",
    onSurface: "#000000",
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    displayFont: "'Segoe UI Black', sans-serif",
  },
  apple: {
    name: "apple",
    label: "Apple",
    icon: "🍎",
    primary: "#000000",
    secondary: "#555555",
    tertiary: "#A2A2A2",
    background: "#FFFFFF",
    surface: "#F5F5F7",
    onBackground: "#1D1D1D",
    onSurface: "#1D1D1D",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    displayFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
  },
  stanley: {
    name: "stanley",
    label: "Stanley",
    icon: "🔨",
    primary: "#000000",
    secondary: "#FFD100",
    tertiary: "#333333",
    background: "#F8F8F8",
    surface: "#FFFFFF",
    onBackground: "#1A1A1A",
    onSurface: "#1A1A1A",
    fontFamily: "'Arial', 'Helvetica', sans-serif",
    displayFont: "'Arial Black', 'Arial', sans-serif",
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

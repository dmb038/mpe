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
  borderRadius: number;
  buttonPadding: string;
  shadowStyle: string;
  density: "compact" | "comfortable" | "spacious";
  accentColor?: string;
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
    borderRadius: 8,
    buttonPadding: "12px 24px",
    shadowStyle: "0 2px 8px rgba(0,0,0,0.08)",
    density: "comfortable",
  },
  mcdonalds: {
    name: "mcdonalds",
    label: "McDonald's",
    icon: "🍟",
    primary: "#DA291C",
    secondary: "#FFC72C",
    tertiary: "#DA291C",
    background: "#FFFFFF",
    surface: "#FFFAED",
    onBackground: "#000000",
    onSurface: "#000000",
    fontFamily: "'Segoe UI', 'Arial Black', sans-serif",
    displayFont: "'Segoe UI Black', 'Arial Black', sans-serif",
    borderRadius: 12,
    buttonPadding: "16px 32px",
    shadowStyle: "0 4px 12px rgba(218,41,28,0.25)",
    density: "compact",
    accentColor: "#FFC72C",
  },
  apple: {
    name: "apple",
    label: "Apple",
    icon: "🍎",
    primary: "#000000",
    secondary: "#EFEFEF",
    tertiary: "#A2A2A2",
    background: "#FFFFFF",
    surface: "#F5F5F7",
    onBackground: "#1D1D1D",
    onSurface: "#1D1D1D",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    displayFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
    borderRadius: 6,
    buttonPadding: "11px 18px",
    shadowStyle: "0 1px 3px rgba(0,0,0,0.12)",
    density: "spacious",
  },
  stanley: {
    name: "stanley",
    label: "Stanley",
    icon: "🔨",
    primary: "#000000",
    secondary: "#FFD100",
    tertiary: "#333333",
    background: "#F0F0F0",
    surface: "#FFFFFF",
    onBackground: "#1A1A1A",
    onSurface: "#1A1A1A",
    fontFamily: "'Arial', 'Helvetica', sans-serif",
    displayFont: "'Arial Black', 'Arial', sans-serif",
    borderRadius: 0,
    buttonPadding: "14px 28px",
    shadowStyle: "0 3px 10px rgba(0,0,0,0.3)",
    density: "compact",
    accentColor: "#FFD100",
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
      --border-radius: ${theme.borderRadius}px;
      --button-padding: ${theme.buttonPadding};
      --shadow-style: ${theme.shadowStyle};
    }
  `;
}

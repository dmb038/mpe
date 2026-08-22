"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { colorTokens, shapeTokens, typeTokens } from "@/theme/tokens";
import { themes, type ThemeConfig } from "@/theme/themes";

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    return { currentTheme: "mpe", setTheme: () => {} };
  }
  return context;
}

function createCustomTheme(themeConfig: ThemeConfig) {
  return createTheme({
    cssVariables: true,
    shape: {
      borderRadius: shapeTokens.medium,
    },
    palette: {
      mode: "light",
      primary: {
        main: themeConfig.primary,
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: themeConfig.secondary,
        contrastText: "#FFFFFF",
      },
      background: {
        default: themeConfig.background,
        paper: themeConfig.surface,
      },
      text: {
        primary: themeConfig.onBackground,
        secondary: themeConfig.onSurface,
      },
    },
    typography: {
      fontFamily: themeConfig.fontFamily,
      h1: { fontFamily: themeConfig.displayFont, fontWeight: 500, letterSpacing: -0.5 },
      h2: { fontFamily: themeConfig.displayFont, fontWeight: 500, letterSpacing: -0.25 },
      h3: { fontFamily: themeConfig.displayFont, fontWeight: 500 },
      h4: { fontFamily: themeConfig.displayFont, fontWeight: 500 },
      h5: { fontFamily: themeConfig.displayFont, fontWeight: 600 },
      h6: { fontFamily: themeConfig.displayFont, fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: themeConfig.surface,
            color: themeConfig.onSurface,
            boxShadow: "none",
            borderBottom: `1px solid ${themeConfig.onBackground}20`,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: shapeTokens.full,
            paddingLeft: 20,
            paddingRight: 20,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: shapeTokens.large,
            border: `1px solid ${themeConfig.onBackground}20`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: shapeTokens.full,
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: shapeTokens.small,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [currentThemeName, setCurrentThemeName] = useState("mpe");
  const [muiTheme, setMuiTheme] = useState(createCustomTheme(themes.mpe));
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("mpe-theme") || "mpe";
    const themeConfig = themes[savedTheme as keyof typeof themes];
    if (themeConfig) {
      setCurrentThemeName(savedTheme);
      setMuiTheme(createCustomTheme(themeConfig));
    }
    setIsHydrated(true);
  }, []);

  const setTheme = (themeName: string) => {
    const themeConfig = themes[themeName as keyof typeof themes];
    if (themeConfig) {
      setCurrentThemeName(themeName);
      setMuiTheme(createCustomTheme(themeConfig));
      localStorage.setItem("mpe-theme", themeName);
    }
  };

  if (!isHydrated) {
    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme: currentThemeName, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

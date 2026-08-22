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
  const isApple = themeConfig.name === "apple";
  const isMcdonalds = themeConfig.name === "mcdonalds";
  const isStanley = themeConfig.name === "stanley";

  return createTheme({
    cssVariables: true,
    shape: {
      borderRadius: themeConfig.borderRadius,
    },
    palette: {
      mode: "light",
      primary: {
        main: themeConfig.primary,
        contrastText: isApple ? themeConfig.primary : "#FFFFFF",
      },
      secondary: {
        main: themeConfig.secondary,
        contrastText: isMcdonalds || isStanley ? "#000000" : "#FFFFFF",
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
      h1: {
        fontFamily: themeConfig.displayFont,
        fontWeight: isMcdonalds || isStanley ? 900 : 500,
        letterSpacing: isMcdonalds ? 0.5 : -0.5,
        fontSize: isMcdonalds ? "2.8rem" : "2.2rem",
      },
      h2: {
        fontFamily: themeConfig.displayFont,
        fontWeight: isMcdonalds ? 800 : 500,
        letterSpacing: isMcdonalds ? 0.3 : -0.25,
      },
      h3: {
        fontFamily: themeConfig.displayFont,
        fontWeight: isMcdonalds || isStanley ? 700 : 500,
      },
      h4: {
        fontFamily: themeConfig.displayFont,
        fontWeight: isMcdonalds || isStanley ? 700 : 500,
      },
      h5: {
        fontFamily: themeConfig.displayFont,
        fontWeight: isMcdonalds ? 800 : 600,
      },
      h6: {
        fontFamily: themeConfig.displayFont,
        fontWeight: isMcdonalds ? 800 : 600,
      },
      button: {
        textTransform: isMcdonalds ? "uppercase" : "none",
        fontWeight: isMcdonalds || isStanley ? 700 : 600,
        letterSpacing: isMcdonalds ? 0.5 : 0,
      },
      body1: {
        fontSize: isApple ? "0.95rem" : "1rem",
        lineHeight: isApple ? 1.6 : 1.5,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isMcdonalds ? themeConfig.primary : themeConfig.surface,
            color: isMcdonalds ? "#FFFFFF" : themeConfig.onSurface,
            boxShadow: isMcdonalds ? `0 4px 12px rgba(218,41,28,0.3)` : "none",
            borderBottom: isMcdonalds ? "none" : `1px solid ${themeConfig.onBackground}20`,
            borderRadius: isStanley ? 0 : "8px",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: isStanley ? 0 : themeConfig.borderRadius,
            padding: themeConfig.buttonPadding,
            fontWeight: isMcdonalds ? 700 : 600,
            textTransform: isMcdonalds ? "uppercase" : "none",
            boxShadow: isMcdonalds ? themeConfig.shadowStyle : "none",
            border: isStanley ? `2px solid ${themeConfig.primary}` : "none",
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: isMcdonalds ? `0 6px 16px rgba(218,41,28,0.35)` : "none",
              transform: isStanley ? "scale(1.02)" : "none",
            },
          },
          contained: {
            backgroundColor: themeConfig.primary,
            color: isMcdonalds || (isApple && themeConfig.primary === "#000000") ? "#FFFFFF" : themeConfig.onBackground,
          },
          outlined: {
            borderColor: themeConfig.primary,
            color: themeConfig.primary,
            borderWidth: isStanley ? 2 : 1,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: isStanley ? 0 : themeConfig.borderRadius,
            border: isStanley ? `2px solid ${themeConfig.onBackground}` : `1px solid ${themeConfig.onBackground}20`,
            boxShadow: isMcdonalds ? themeConfig.shadowStyle : isApple ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            backgroundColor: isMcdonalds ? "#FFFAED" : themeConfig.surface,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: isStanley ? 0 : themeConfig.borderRadius + 12,
            fontWeight: isMcdonalds ? 700 : 500,
            backgroundColor: isMcdonalds ? themeConfig.secondary : themeConfig.secondary + "20",
            color: isMcdonalds ? "#000000" : themeConfig.onBackground,
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: isStanley ? 0 : themeConfig.borderRadius,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: isStanley ? 0 : themeConfig.borderRadius,
            backgroundColor: isApple ? "#F5F5F7" : themeConfig.surface,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isMcdonalds ? themeConfig.primary : "inherit",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: isStanley ? 0 : "inherit",
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

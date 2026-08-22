import { createTheme } from "@mui/material/styles";
import { colorTokens, shapeTokens, typeTokens } from "./tokens";

const { light } = colorTokens;

export const theme = createTheme({
  cssVariables: true,
  shape: {
    borderRadius: shapeTokens.medium,
  },
  palette: {
    mode: "light",
    primary: {
      main: light.primary,
      contrastText: light.onPrimary,
    },
    secondary: {
      main: light.secondary,
      contrastText: light.onSecondary,
    },
    error: {
      main: light.error,
      contrastText: light.onError,
    },
    background: {
      default: light.background,
      paper: light.surface,
    },
    text: {
      primary: light.onBackground,
      secondary: light.onSurfaceVariant,
    },
    divider: light.outlineVariant,
  },
  typography: {
    fontFamily: typeTokens.bodyFont,
    h1: { fontFamily: typeTokens.displayFont, fontWeight: 500, letterSpacing: -0.5 },
    h2: { fontFamily: typeTokens.displayFont, fontWeight: 500, letterSpacing: -0.25 },
    h3: { fontFamily: typeTokens.displayFont, fontWeight: 500 },
    h4: { fontFamily: typeTokens.displayFont, fontWeight: 500 },
    h5: { fontFamily: typeTokens.displayFont, fontWeight: 600 },
    h6: { fontFamily: typeTokens.displayFont, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --color-primary: ${light.primary};
          --color-secondary: ${light.secondary};
          --color-tertiary: ${light.tertiary};
          --color-background: ${light.background};
          --color-surface: ${light.surface};
          --color-on-background: ${light.onBackground};
          --color-on-surface: ${light.onSurface};
          --font-family-body: ${typeTokens.bodyFont};
          --font-family-display: ${typeTokens.displayFont};
        }

        body {
          font-family: var(--font-family-body);
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-family-display);
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: light.surface,
          color: light.onSurface,
          boxShadow: "none",
          borderBottom: `1px solid ${light.outlineVariant}`,
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
        contained: {
          color: "#FFFFFF",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: shapeTokens.large,
          border: `1px solid ${light.outlineVariant}`,
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

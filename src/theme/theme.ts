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

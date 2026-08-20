/**
 * Material Design 3–style color roles for the MPE site.
 *
 * Palette rationale: primary is a deep forest green (the neighborhood's mature
 * tree canopy and R.P. Brooks Park), secondary is a warm taupe/brown tying
 * back to the original site's `#5A491D` heritage accent, tertiary is a sky
 * blue nodding to the old map-pin icon color. MUI has no built-in M3 token
 * system, so these roles are hand-defined and mapped onto MUI's palette API
 * in theme.ts.
 */
export const colorTokens = {
  light: {
    primary: "#2E5339",
    onPrimary: "#FFFFFF",
    primaryContainer: "#B7F0C1",
    onPrimaryContainer: "#00210D",

    secondary: "#6F5B3E",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#FBDFB6",
    onSecondaryContainer: "#271904",

    tertiary: "#375E7E",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#D2E4FF",
    onTertiaryContainer: "#001C34",

    error: "#B3261E",
    onError: "#FFFFFF",
    errorContainer: "#F9DEDC",
    onErrorContainer: "#410E0B",

    background: "#F8FAF4",
    onBackground: "#1A1C18",

    surface: "#F8FAF4",
    onSurface: "#1A1C18",
    surfaceVariant: "#DFE4D7",
    onSurfaceVariant: "#43483E",

    outline: "#73796D",
    outlineVariant: "#C3C8BA",
  },
} as const;

export const typeTokens = {
  displayFont: "var(--font-display)",
  bodyFont: "var(--font-body)",
};

export const shapeTokens = {
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 28,
  full: 999,
};

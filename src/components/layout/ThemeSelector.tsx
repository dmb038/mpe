"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { themes } from "@/theme/themes";

export default function ThemeSelector() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentTheme, setCurrentTheme] = React.useState("mpe");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem("mpe-theme", themeName);

    const theme = themes[themeName as keyof typeof themes];
    const style = document.getElementById("theme-selector-style") || document.createElement("style");
    style.id = "theme-selector-style";
    style.innerHTML = `
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
    if (!document.getElementById("theme-selector-style")) {
      document.head.appendChild(style);
    }

    handleClose();
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("mpe-theme") || "mpe";
    setCurrentTheme(savedTheme);
    handleThemeChange(savedTheme);
  }, []);

  const currentThemeData = themes[currentTheme as keyof typeof themes];

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          ml: 1,
          minWidth: "auto",
          p: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
        title="Change design theme"
      >
        {currentThemeData?.icon || "🎨"}
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {Object.entries(themes).map(([key, theme]) => (
          <MenuItem
            key={key}
            onClick={() => handleThemeChange(key)}
            selected={key === currentTheme}
          >
            <span style={{ marginRight: 8, fontSize: "1.2rem" }}>{theme.icon}</span>
            {theme.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

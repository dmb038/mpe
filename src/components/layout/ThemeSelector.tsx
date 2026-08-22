"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { themes } from "@/theme/themes";
import { useThemeContext } from "@/context/ThemeContext";

export default function ThemeSelector() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { currentTheme, setTheme } = useThemeContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    handleClose();
  };

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

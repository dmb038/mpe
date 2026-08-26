"use client";

import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { marketingNav } from "@/lib/nav";

function DesktopNavItem({ item }: { item: (typeof marketingNav)[number] }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!item.children) {
    return (
      <Button component={Link} href={item.href ?? "#"} color="inherit">
        {item.label}
      </Button>
    );
  }

  return (
    <>
      <Button
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ExpandMoreIcon fontSize="small" />}
      >
        {item.label}
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {item.children.map((child) => (
          <MenuItem
            key={child.href}
            component={Link}
            href={child.href}
            onClick={() => setAnchorEl(null)}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 280, pt: 2 }} role="presentation">
        <List>
          {marketingNav.map((item) =>
            item.children ? (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() =>
                    setExpanded(expanded === item.label ? null : item.label)
                  }
                >
                  <ListItemText primary={item.label} />
                  {expanded === item.label ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={expanded === item.label} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.href}
                        component={Link}
                        href={child.href}
                        onClick={onClose}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItemButton
                key={item.label}
                component={Link}
                href={item.href ?? "#"}
                onClick={onClose}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            )
          )}
          <ListItemButton component={Link} href="https://merrimanparkestates.membershiptoolkit.com/" onClick={onClose}>
            <ListItemText primary="Resident Portal" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <AppBar position="sticky" component="header">
      <Toolbar sx={{ gap: 1 }}>
        <Box
          component={Link}
          href="/"
          sx={{ display: "flex", alignItems: "center", mr: 2, flexGrow: 1 }}
        >
          <Image src="/images/logo.png" alt="MPE logo" width={44} height={25} priority />
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
          {marketingNav.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
          <Button
            component={Link}
            href="/flock-request"
            color="inherit"
            startIcon={<VideocamOutlinedIcon fontSize="small" />}
          >
            Flock Request
          </Button>
          <Button component={Link} href="https://merrimanparkestates.membershiptoolkit.com/" variant="contained" sx={{ ml: 1 }}>
            Resident Portal
          </Button>
        </Box>

        <IconButton
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </AppBar>
  );
}

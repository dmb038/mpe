"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/actions/auth";

const links = [
  { label: "Home", href: "/portal", icon: HomeOutlinedIcon },
  { label: "Directory", href: "/portal/directory", icon: PeopleAltOutlinedIcon },
  { label: "Account", href: "/portal/account", icon: PersonOutlineIcon },
];

export default function PortalNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <AppBar position="sticky" component="header">
      <Toolbar sx={{ gap: 0.5 }}>
        <Box component={Link} href="/" sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          <Image src="/images/logo.png" alt="MPE logo" width={36} height={20} />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ mr: 3, display: { xs: "none", sm: "block" }, fontFamily: "var(--font-display)" }}
        >
          Resident Portal
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
          {links.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              color="inherit"
              startIcon={<link.icon fontSize="small" />}
              sx={{
                bgcolor: pathname === link.href ? "action.selected" : "transparent",
              }}
            >
              {link.label}
            </Button>
          ))}
          {isAdmin && (
            <Button
              component={Link}
              href="/portal/admin"
              color="inherit"
              startIcon={<AdminPanelSettingsOutlinedIcon fontSize="small" />}
              sx={{ bgcolor: pathname.startsWith("/portal/admin") ? "action.selected" : "transparent" }}
            >
              Admin
            </Button>
          )}
        </Box>
        <Button color="inherit" startIcon={<LogoutIcon fontSize="small" />} onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

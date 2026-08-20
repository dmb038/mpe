import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Section from "@/components/layout/Section";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import { CardLink } from "@/components/ui/LinkComponents";

export const metadata: Metadata = { title: "Portal Home" };
export const dynamic = "force-dynamic";

const links = [
  { icon: PeopleAltOutlinedIcon, title: "Resident Directory", href: "/portal/directory", description: "Search and browse your neighbors." },
  { icon: PersonOutlineIcon, title: "Account Settings", href: "/portal/account", description: "Manage your profile and privacy." },
  { icon: CalendarMonthOutlinedIcon, title: "Calendar", href: "/calendar", description: "Upcoming Association events." },
  { icon: VideocamOutlinedIcon, title: "Flock Footage Request", href: "/flock-request", description: "Request a camera footage review." },
];

export default async function PortalHomePage() {
  const resident = await getCurrentResident();

  return (
    <Section>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Welcome{resident ? `, ${resident.full_name.split(" ")[0]}` : ""}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here&apos;s what you can do in the resident portal.
      </Typography>
      <Grid container spacing={3}>
        {links.map((link) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={link.href}>
            <CardLink href={link.href} sx={{ height: "100%", display: "block", textDecoration: "none" }}>
              <CardContent>
                <link.icon sx={{ fontSize: 28, color: "primary.main", mb: 1.5 }} />
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                  {link.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {link.description}
                </Typography>
              </CardContent>
            </CardLink>
          </Grid>
        ))}
      </Grid>
      <Card variant="outlined" sx={{ mt: 4, maxWidth: 480 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Membership dues
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This portal handles the resident directory. Dues are still paid through Membership
            Toolkit — see the Dues page for details.
          </Typography>
        </CardContent>
      </Card>
    </Section>
  );
}

import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { ButtonLink, CardLink } from "@/components/ui/LinkComponents";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Section from "@/components/layout/Section";
import { colorTokens } from "@/theme/tokens";

const stats = [
  { icon: ParkOutlinedIcon, label: "Established", value: "1958" },
  { icon: GroupsOutlinedIcon, label: "Neighborhood", value: "12 streets" },
  { icon: SchoolOutlinedIcon, label: "School district", value: "Richardson ISD" },
  { icon: PeopleAltOutlinedIcon, label: "Association", value: "Voluntary" },
];

const quickLinks = [
  {
    icon: CalendarMonthOutlinedIcon,
    title: "Neighborhood Calendar",
    description: "See upcoming meetings, club events, and school holidays.",
    href: "/calendar",
  },
  {
    icon: PeopleAltOutlinedIcon,
    title: "Resident Portal & Directory",
    description: "Sign in to browse the resident directory and manage your account.",
    href: "/portal/login",
  },
  {
    icon: VideocamOutlinedIcon,
    title: "Flock Footage Request",
    description: "Ask the Security Taskforce to review neighborhood camera footage.",
    href: "/flock-request",
  },
];

export default function HomePage() {
  return (
    <>
      <Box sx={{ position: "relative", bgcolor: colorTokens.light.surfaceVariant }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: "center", py: { xs: 6, md: 10 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                sx={{ color: colorTokens.light.secondary, letterSpacing: 1.5 }}
              >
                Lake Highlands · Dallas, Texas
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 2 }}
              >
                Merriman Park Estates
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.15rem", color: "text.secondary", mb: 1.5 }}>
                MPE is a well-maintained and quiet neighborhood in Lake Highlands, Dallas —
                south of Walnut Hill, east of Abrams, and west of Skillman. Homes are unique
                to their owners, nestled in rolling hills among well-established, mature trees.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.15rem", color: "text.secondary", mb: 3 }}>
                This just isn&apos;t a place to live&nbsp;&mdash;&nbsp;it is our home.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <ButtonLink href="https://merrimanparkestates.membershiptoolkit.com/packet/2863" variant="contained" size="large">
                  Dues & Membership
                </ButtonLink>
                <ButtonLink href="https://merrimanparkestates.membershiptoolkit.com/directory" variant="outlined" size="large">
                  Directory
                </ButtonLink>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                <Image
                  src="/images/hero-neighborhood.jpg"
                  alt="Merriman Park Estates neighborhood"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Section>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <stat.icon sx={{ fontSize: 32, color: "primary.main", mb: 1 }} />
                  <Typography variant="h5" sx={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Box sx={{ bgcolor: colorTokens.light.surfaceVariant, py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ mb: 1 }}>
            Get connected
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>
            A few of the things residents use this site for most.
          </Typography>
          <Grid container spacing={3}>
            {quickLinks.map((link) => (
              <Grid size={{ xs: 12, md: 4 }} key={link.title}>
                <CardLink href={link.href} sx={{ height: "100%", display: "block", textDecoration: "none" }}>
                  <CardContent sx={{ p: 3 }}>
                    <link.icon sx={{ fontSize: 28, color: "secondary.main", mb: 1.5 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
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
        </Container>
      </Box>

      <Section>
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              A neighborhood built on community
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Since 1958, MPE has grown from twelve original families into a close-knit
              neighborhood surrounded by the Lake Highlands Town Center and Creekside
              shopping, with a park along Merriman Parkway and growing trail connectivity
              to White Rock Lake.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The Neighborhood Association is entirely voluntary — residents and homeowners
              choose to join and pay dues that fund neighborhood security cameras, community
              events, and local improvements.
            </Typography>
            <ButtonLink href="/info/dues" sx={{ mt: 2 }}>
              Learn about membership dues →
            </ButtonLink>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 2,
              }}
            >
              <Image
                src="/images/location-map.jpg"
                alt="Map of the Merriman Park Estates neighborhood"
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Section>
    </>
  );
}

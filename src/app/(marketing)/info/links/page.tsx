import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { footerLinks } from "@/lib/nav";

export const metadata: Metadata = { title: "Links" };

const cityLinks = [
  { label: "District 10 City of Dallas Representative", href: "https://dallascityhall.com/government/citycouncil/district10/Pages/default.aspx" },
  { label: "Dallas City Council District Map", href: "https://dallascityhall.com/government/citycouncil/district10/Pages/map.aspx" },
  { label: "Dallas Central Appraisal District", href: "https://www.dallascad.org" },
  { label: "Lake Highlands Area Improvement Association", href: "https://www.lhaia.org" },
  { label: "Who Represents You — Texas Senate", href: "https://fyi.legis.texas.gov" },
  { label: "Who Represents You — Texas House", href: "https://house.state.tx.us/members" },
  { label: "DART", href: "https://www.dart.org" },
  { label: "City of Dallas", href: "https://dallascityhall.com" },
];

const mpeLinks = [
  { label: "MPE Facebook Group", href: "https://www.facebook.com/groups/mpedallas/" },
  { label: "MPE on Nextdoor", href: "https://nextdoor.com/neighborhood/merrimanparkestates--dallas--tx/" },
  { label: "Membership Toolkit (dues & directory app)", href: footerLinks.membershipToolkit },
];

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <List disablePadding>
          {links.map((link) => (
            <ListItemButton
              key={link.href}
              component="a"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              sx={{ borderRadius: 1, px: 1 }}
            >
              <ListItemText primary={link.label} />
              <OpenInNewIcon fontSize="small" sx={{ color: "text.secondary" }} />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default function LinksPage() {
  return (
    <>
      <PageHero eyebrow="Info" title="Links" />
      <Section>
        <Stack spacing={3}>
          <LinkList title="City & State" links={cityLinks} />
          <LinkList title="MPE Tools" links={mpeLinks} />
        </Stack>
      </Section>
    </>
  );
}

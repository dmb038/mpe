import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import { TextLink } from "@/components/ui/LinkComponents";

export const metadata: Metadata = { title: "Clubs" };

const clubs = [
  {
    name: "MPE Club (Neighborhood Association)",
    founded: "March 7, 1958",
    dues: "See the Dues page for the current amount",
    description:
      "Founded at a special social gathering attended by the first residents of the Estates, the MPE Club exists for fellowship and to address civic concerns. It funds sidewalks, landscaping, playground facilities, street lighting, and sign toppers, and hosts an annual fall picnic with the Women's Social Club. Membership is open to any MPE homeowner and includes voting rights and a biennial directory. MPE also participates in the Tom Thumb Good Neighbor rewards program (card #4757).",
  },
  {
    name: "Garden Club",
    founded: "1974",
    dues: "$20/year",
    description:
      "Cultivates gardening enthusiasm, supports neighborhood beautification, and expands horticultural knowledge. Maintains landscaping on Merriman Parkway and at R.P. Brooks Park, and recognizes a yard/alley of the month. Meets the second Thursday of the month, September through May, with speakers on topics like spring bulbs, local birds, and water conservation.",
  },
  {
    name: "Women's Social Club",
    founded: undefined,
    dues: "$30/year (April–March membership year)",
    description:
      "Over 60 members strong, hosting monthly dinners and socials, an Easter egg hunt, family couples parties, happy hours, and children's playgroups. Members also help with the neighborhood carnival, pumpkin painting, and the welcoming committee. Meets on alternating Tuesdays/Thursdays during the second week of the month.",
  },
  {
    name: "VIP Club (Volunteers In Patrol)",
    founded: "1997",
    dues: undefined,
    description:
      "A crime-prevention patrol using volunteers' personal vehicles marked \"CRIME PATROL.\" New patrollers complete a two-hour training plus a ride-along with a veteran patroller. Shifts are flexible and run until midnight; most volunteers patrol about four hours a month. The club meets bi-monthly on the third Monday at 7:00 PM.",
  },
];

export default function ClubsPage() {
  return (
    <>
      <PageHero eyebrow="Info" title="Clubs" description="MPE's four resident-run clubs." />
      <Section>
        <Stack spacing={3}>
          {clubs.map((club) => (
            <Card key={club.name} variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" sx={{ flexWrap: "wrap", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <Typography variant="h6">{club.name}</Typography>
                  {club.founded && <Chip size="small" label={`Est. ${club.founded}`} />}
                  {club.dues && <Chip size="small" label={club.dues} color="secondary" variant="outlined" />}
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  {club.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Want to get involved with a club? Find its contact on the{" "}
          <TextLink href="/contacts/other" variant="body2" sx={{ color: "primary.main" }}>
            Other Contacts
          </TextLink>{" "}
          page.
        </Typography>
      </Section>
    </>
  );
}

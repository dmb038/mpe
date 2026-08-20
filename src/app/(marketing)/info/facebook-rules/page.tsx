import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";

export const metadata: Metadata = { title: "Facebook Group Rules" };

const rules = [
  {
    title: "Membership",
    body: "Open to current MPE Neighborhood Association members and their immediate family only. Not a member yet? Visit the Dues page to join.",
  },
  {
    title: "Politics, Religion & Health Issues",
    body: "No discussion of partisan politics, religion, or health issues. Non-partisan announcements are fine.",
  },
  {
    title: "Tone & Language",
    body: "No foul or abusive language. Don't call out individuals or specific addresses without their permission.",
  },
  {
    title: "Kind & Courteous",
    body: "No hate speech or bullying, ever.",
  },
  {
    title: "Advertising, Services & Buy/Sell/Trade",
    body: "Allowed and moderated. If you had a negative experience with a service provider, limit your post to \"I had a negative experience, contact me directly\" rather than a public review.",
  },
  {
    title: "Reporting Posts & Comments",
    body: "Use the \"...\" menu on a post to Report it, or press-and-hold a comment to Report it to Group Admins.",
  },
  {
    title: "Administration",
    body: "Group Admins and the Neighborhood Association Board make the final call on all moderation decisions.",
  },
];

export default function FacebookRulesPage() {
  return (
    <>
      <PageHero eyebrow="Info" title="Facebook Group Rules" />
      <Section maxWidth="md">
        <Stack spacing={4}>
          {rules.map((rule, i) => (
            <Stack key={rule.title} spacing={0.5} direction="row" sx={{ alignItems: "flex-start", gap: 2 }}>
              <Typography variant="h5" sx={{ color: "primary.main", minWidth: 36 }}>
                {i + 1}
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="h6">{rule.title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {rule.body}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Section>
    </>
  );
}

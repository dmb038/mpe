import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import ContactGrid from "@/components/content/ContactCard";

export const metadata: Metadata = { title: "Association Board" };

const board = [
  { name: "Taylor Wood", role: "President" },
  { name: "Cece Muir", role: "Vice President" },
  { name: "Felipe Serrano", role: "Secretary" },
  { name: "Evan Richter", role: "Treasurer" },
  { name: "Josh Ongena", role: "Past President" },
  { name: "Keith Jones", role: "Trustee" },
  { name: "Jason Duffy", role: "Trustee" },
];

export default function BoardPage() {
  return (
    <>
      <PageHero eyebrow="Contacts" title="Association Board" />
      <Section>
        <ContactGrid contacts={board} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          To reach the board, use the Email Us form or the Security Taskforce contact for
          camera/security matters.
        </Typography>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import ContactGrid from "@/components/content/ContactCard";

export const metadata: Metadata = { title: "Other Contacts" };

const contacts = [
  { name: "Travis Dunbar", role: "Volunteers In Patrol (VIP)" },
  { name: "David Schroeder", role: "The Estater Newsletter" },
  { name: "Marcia Howard", role: "The Estater Newsletter" },
  { name: "Ric Moseley", role: "Website" },
  { name: "Ric Moseley", role: "Facebook Group" },
  { name: "Joanie Dunson", role: "Facebook Group" },
  { name: "Annalisa Tisdale", role: "Women's Social Club" },
  { name: "Abnous Poer", role: "Women's Social Club" },
  { name: "Kathleen Thompson", role: "Garden Club" },
];

export default function OtherContactsPage() {
  return (
    <>
      <PageHero eyebrow="Contacts" title="Other Contacts" />
      <Section>
        <ContactGrid contacts={contacts} />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/layout/Section";
import EmailUsForm from "@/components/forms/EmailUsForm";

export const metadata: Metadata = { title: "Email Us" };

export default function EmailUsPage() {
  return (
    <>
      <PageHero eyebrow="Contacts" title="Email Us" description="Have a question or something to share with the board? Send us a message." />
      <Section maxWidth="sm">
        <EmailUsForm />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Section from "@/components/layout/Section";
import { createAdminClient } from "@/lib/supabase/admin";
import FlockRequestsAdminList from "@/components/content/FlockRequestsAdminList";

export const metadata: Metadata = { title: "Flock Requests" };
export const dynamic = "force-dynamic";

export default async function AdminFlockRequestsPage() {
  const admin = createAdminClient();
  const { data: requests } = await admin
    .from("flock_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <Section>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Flock Footage Requests
      </Typography>
      <FlockRequestsAdminList requests={requests ?? []} />
    </Section>
  );
}

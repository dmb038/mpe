import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Section from "@/components/layout/Section";
import { CardLink } from "@/components/ui/LinkComponents";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const admin = createAdminClient();
  const [{ count: residentCount }, { count: newRequestCount }] = await Promise.all([
    admin.from("residents").select("*", { count: "exact", head: true }).eq("status", "active"),
    admin.from("flock_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const links = [
    { icon: PeopleAltOutlinedIcon, title: "Residents", href: "/portal/admin/residents", description: `${residentCount ?? 0} active accounts` },
    { icon: UploadFileOutlinedIcon, title: "Import Resident CSV", href: "/portal/admin/residents/import", description: "Bulk add/update residents" },
    { icon: VideocamOutlinedIcon, title: "Flock Requests", href: "/portal/admin/flock-requests", description: `${newRequestCount ?? 0} awaiting review` },
  ];

  return (
    <Section>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Admin
      </Typography>
      <Grid container spacing={3}>
        {links.map((link) => (
          <Grid size={{ xs: 12, sm: 4 }} key={link.href}>
            <CardLink href={link.href} sx={{ display: "block", textDecoration: "none" }}>
              <CardContent>
                <link.icon sx={{ fontSize: 28, color: "primary.main", mb: 1.5 }} />
                <Typography variant="subtitle1">{link.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {link.description}
                </Typography>
              </CardContent>
            </CardLink>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Section from "@/components/layout/Section";
import { createClient } from "@/lib/supabase/server";
import { getCurrentResident } from "@/lib/supabase/getCurrentResident";
import AccountSettingsForm from "@/components/forms/AccountSettingsForm";
import PasskeyManager from "@/components/passkeys/PasskeyManager";

export const metadata: Metadata = { title: "Account Settings" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const resident = await getCurrentResident();
  if (!resident) return null;

  const supabase = await createClient();
  const [{ data: prefs }, { data: passkeys }] = await Promise.all([
    supabase.from("directory_preferences").select("*").eq("resident_id", resident.id).single(),
    supabase.from("webauthn_credentials").select("id, device_label, created_at").eq("resident_id", resident.id),
  ]);

  return (
    <Section maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Account Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={0.5} sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {resident.full_name} · {resident.address_line1}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Account email: {resident.csv_email}
                </Typography>
              </Stack>
              <AccountSettingsForm
                initial={{
                  show_in_directory: prefs?.show_in_directory ?? true,
                  show_email: prefs?.show_email ?? false,
                  show_phone: prefs?.show_phone ?? false,
                  show_household: prefs?.show_household ?? true,
                  display_email: resident.display_email ?? "",
                  display_phone: resident.display_phone ?? "",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Passkeys
              </Typography>
              <PasskeyManager passkeys={passkeys ?? []} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Section>
  );
}

import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Section from "@/components/layout/Section";
import PayDuesForm from "@/components/forms/PayDuesForm";

export const metadata: Metadata = { title: "Pay Dues" };

export default function PayDuesPage() {
  return (
    <Section maxWidth="sm">
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Pay Your Dues
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Membership dues help fund neighborhood security cameras, community events, and local
            improvements.
          </Typography>
        </Stack>

        <Alert severity="info">
          2026 dues are <strong>$125.00</strong>. Payments are processed securely by Stripe.
        </Alert>

        <PayDuesForm />

        <Stack spacing={1.5} sx={{ pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Prefer to pay by check?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mail your check to:<br />
            MPE Board<br />
            Lake Highlands, Dallas, TX 75238<br />
            <br />
            Please include your name and address on the memo line.
          </Typography>
        </Stack>
      </Stack>
    </Section>
  );
}

import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthCard from "@/components/layout/AuthCard";
import LoginForm from "@/components/forms/LoginForm";
import { TextLink } from "@/components/ui/LinkComponents";

export const metadata: Metadata = { title: "Resident Portal Login" };

export default function LoginPage() {
  return (
    <AuthCard title="Resident Portal" description="Log in to access the directory and your account.">
      <LoginForm />
      <Stack sx={{ mt: 3, alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          New to the portal?{" "}
          <TextLink href="/portal/signup" variant="body2" sx={{ color: "primary.main", display: "inline" }}>
            Verify your address to sign up
          </TextLink>
        </Typography>
      </Stack>
    </AuthCard>
  );
}

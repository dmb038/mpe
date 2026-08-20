import type { Metadata } from "next";
import AuthCard from "@/components/layout/AuthCard";
import SetPasswordForm from "@/components/forms/SetPasswordForm";

export const metadata: Metadata = { title: "Set Your Password" };

export default function SetCredentialsPage() {
  return (
    <AuthCard title="Set your password" description="Choose a password for future logins.">
      <SetPasswordForm />
    </AuthCard>
  );
}

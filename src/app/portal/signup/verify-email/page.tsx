import type { Metadata } from "next";
import AuthCard from "@/components/layout/AuthCard";
import EmailCodeForm from "@/components/forms/EmailCodeForm";

export const metadata: Metadata = { title: "Check Your Email" };

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Check your email"
      description="We sent a 6-digit code to the email address on file. Enter it below to continue."
    >
      <EmailCodeForm />
    </AuthCard>
  );
}

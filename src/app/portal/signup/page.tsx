import type { Metadata } from "next";
import AuthCard from "@/components/layout/AuthCard";
import SignupForm from "@/components/forms/SignupForm";

export const metadata: Metadata = { title: "Verify Your Address" };

export default function SignupPage() {
  return (
    <AuthCard
      title="Join the Resident Portal"
      description="Enter your email, address, and mobile number exactly as they're on file with the Association so we can verify you."
    >
      <SignupForm />
    </AuthCard>
  );
}

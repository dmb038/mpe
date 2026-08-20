"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { signupVerifySchema, type SignupVerifyInput } from "@/lib/validation/schemas";
import { verifyResident } from "@/actions/signup";

export default function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupVerifyInput>({
    resolver: zodResolver(signupVerifySchema),
    defaultValues: { email: "", address: "", mobile: "" },
  });

  async function onSubmit(data: SignupVerifyInput) {
    setServerError(null);
    const result = await verifyResident(data);
    if (result.ok) {
      router.push("/portal/signup/verify-email");
    } else {
      setServerError(result.error);
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <TextField
        label="Email address"
        type="email"
        required
        helperText={errors.email?.message ?? "The email address the Association has on file for you"}
        error={!!errors.email}
        {...register("email")}
      />
      <TextField
        label="Street address"
        required
        placeholder="e.g. 123 Merriman Pkwy"
        helperText={errors.address?.message}
        error={!!errors.address}
        {...register("address")}
      />
      <TextField
        label="Mobile number"
        required
        helperText={errors.mobile?.message}
        error={!!errors.mobile}
        {...register("mobile")}
      />
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Verify my address"}
      </Button>
    </Stack>
  );
}

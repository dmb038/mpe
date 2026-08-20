"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { loginSchema, type LoginInput } from "@/lib/validation/schemas";
import { login } from "@/actions/auth";
import PasskeyLoginButton from "@/components/passkeys/PasskeyLoginButton";

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  const email = watch("email");

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    const result = await login(data);
    if (result.ok) {
      router.push("/portal");
      router.refresh();
    } else {
      setServerError(result.error);
    }
  }

  return (
    <Stack spacing={2.5}>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <TextField
          label="Email"
          type="email"
          required
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          required
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Log in"}
        </Button>
      </Stack>
      <Divider>or</Divider>
      <PasskeyLoginButton email={email ?? ""} />
    </Stack>
  );
}

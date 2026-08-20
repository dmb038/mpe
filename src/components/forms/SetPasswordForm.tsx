"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { setCredentialsSchema } from "@/lib/validation/schemas";
import { setCredentials } from "@/actions/signup";
import PasskeyRegisterButton from "@/components/passkeys/PasskeyRegisterButton";
import { z } from "zod";

type Input = z.infer<typeof setCredentialsSchema>;

export default function SetPasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({
    resolver: zodResolver(setCredentialsSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(data: Input) {
    setServerError(null);
    const result = await setCredentials(data);
    if (result.ok) {
      setAccountCreated(true);
    } else {
      setServerError(result.error);
    }
  }

  if (accountCreated) {
    return (
      <Stack spacing={2.5} sx={{ alignItems: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Your account is ready.
        </Alert>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Optionally add a passkey now for faster sign-in next time — you can always do this
          later from your account settings.
        </Typography>
        <PasskeyRegisterButton />
        <Button variant="text" onClick={() => router.push("/portal")}>
          Skip for now, take me to the portal
        </Button>
      </Stack>
    );
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <TextField
        label="Password"
        type="password"
        required
        helperText={errors.password?.message}
        error={!!errors.password}
        {...register("password")}
      />
      <TextField
        label="Confirm password"
        type="password"
        required
        helperText={errors.confirmPassword?.message}
        error={!!errors.confirmPassword}
        {...register("confirmPassword")}
      />
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Create account"}
      </Button>
    </Stack>
  );
}

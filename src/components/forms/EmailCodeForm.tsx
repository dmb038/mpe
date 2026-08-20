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
import { emailCodeSchema } from "@/lib/validation/schemas";
import { confirmEmailCode } from "@/actions/signup";
import { z } from "zod";

type Input = z.infer<typeof emailCodeSchema>;

export default function EmailCodeForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({ resolver: zodResolver(emailCodeSchema), defaultValues: { code: "" } });

  async function onSubmit(data: Input) {
    setServerError(null);
    const result = await confirmEmailCode(data);
    if (result.ok) {
      router.push("/portal/signup/set-credentials");
    } else {
      setServerError(result.error);
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <TextField
        label="6-digit code"
        required
        slotProps={{ htmlInput: { maxLength: 6, inputMode: "numeric" } }}
        error={!!errors.code}
        helperText={errors.code?.message}
        {...register("code")}
      />
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Verify code"}
      </Button>
    </Stack>
  );
}

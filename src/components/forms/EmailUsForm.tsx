"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { contactSchema, type ContactInput } from "@/lib/validation/schemas";
import { submitContactMessage } from "@/actions/contact";

export default function EmailUsForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    const result = await submitContactMessage(data);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  }

  if (status === "success") {
    return <Alert severity="success">Message sent — thanks for reaching out! We&apos;ll get back to you soon.</Alert>;
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
      {serverError && <Alert severity="error">{serverError}</Alert>}
      <TextField
        label="Name"
        required
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        type="email"
        required
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField label="Subject" {...register("subject")} error={!!errors.subject} helperText={errors.subject?.message} />
      <TextField
        label="Message"
        required
        multiline
        minRows={5}
        {...register("message")}
        error={!!errors.message}
        helperText={errors.message?.message}
      />
      {/* Honeypot field — hidden from real users, catches simple bots */}
      <input type="text" tabIndex={-1} autoComplete="off" style={{ display: "none" }} {...register("company")} />
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ alignSelf: "flex-start" }}>
        {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Send message"}
      </Button>
    </Stack>
  );
}

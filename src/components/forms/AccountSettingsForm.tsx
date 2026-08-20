"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { updateVisibilityPrefs } from "@/actions/directory";
import { accountSettingsSchema, type AccountSettingsInput } from "@/lib/validation/schemas";

export default function AccountSettingsForm({ initial }: { initial: AccountSettingsInput }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AccountSettingsInput>({ resolver: zodResolver(accountSettingsSchema), defaultValues: initial });

  async function onSubmit(data: AccountSettingsInput) {
    setStatus("idle");
    const result = await updateVisibilityPrefs(data);
    setStatus(result.ok ? "success" : "error");
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
      {status === "success" && <Alert severity="success">Settings saved.</Alert>}
      {status === "error" && <Alert severity="error">Something went wrong saving your settings.</Alert>}

      <Typography variant="subtitle1">Directory visibility</Typography>
      <Controller
        name="show_in_directory"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
            label="Show me in the resident directory"
          />
        )}
      />
      <Controller
        name="show_email"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
            label="Show my email address"
          />
        )}
      />
      <Controller
        name="show_phone"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
            label="Show my phone number"
          />
        )}
      />
      <Controller
        name="show_household"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
            label="Show household member names"
          />
        )}
      />

      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Contact info shown to neighbors
      </Typography>
      <TextField
        label="Display email (optional — defaults to your account email)"
        {...register("display_email")}
      />
      <TextField label="Display phone (optional)" {...register("display_phone")} />

      <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ alignSelf: "flex-start" }}>
        {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Save settings"}
      </Button>
    </Stack>
  );
}

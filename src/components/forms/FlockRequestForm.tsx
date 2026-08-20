"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { flockRequestSchema, type FlockRequestInput } from "@/lib/validation/schemas";
import { submitFlockRequest } from "@/actions/flockRequest";

export default function FlockRequestForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [notSure, setNotSure] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FlockRequestInput>({
    resolver: zodResolver(flockRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      incidentDate: "",
      incidentNotSure: "",
      description: "",
      company: "",
    },
  });

  async function onSubmit(data: FlockRequestInput) {
    setServerError(null);
    const result = await submitFlockRequest(data);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  }

  if (status === "success") {
    return (
      <Alert severity="success">
        Request sent — the Security Taskforce will review it and follow up by email, typically
        within 24–48 hours.
      </Alert>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2.5} noValidate>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <TextField
          label="Your name"
          required
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email address"
          type="email"
          required
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {!notSure ? (
          <Controller
            name="incidentDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Approximate date/time of the footage"
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toISOString() : "")}
                slotProps={{
                  textField: {
                    error: !!errors.incidentDate,
                    helperText: errors.incidentDate?.message,
                  },
                }}
              />
            )}
          />
        ) : (
          <TextField
            label="Roughly when did this happen?"
            placeholder="e.g. sometime last Tuesday evening"
            required
            {...register("incidentNotSure")}
            error={!!errors.incidentNotSure}
            helperText={errors.incidentNotSure?.message}
          />
        )}
        <FormControlLabel
          control={<Checkbox checked={notSure} onChange={(e) => setNotSure(e.target.checked)} />}
          label="I'm not sure of the exact date/time"
        />

        <TextField
          label="What are you looking for?"
          placeholder="Describe the activity, vehicle, or subject of the footage request"
          required
          multiline
          minRows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <input type="text" tabIndex={-1} autoComplete="off" style={{ display: "none" }} {...register("company")} />

        <Button type="submit" variant="contained" size="large" disabled={isSubmitting} sx={{ alignSelf: "flex-start" }}>
          {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Submit request"}
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}

"use client";

import { useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { importResidentsCsv, type CsvImportSummary } from "@/actions/admin";

export default function CsvImportForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ summary: CsvImportSummary; parseErrors: string[] } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Choose a CSV file first.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.set("file", file);
    const response = await importResidentsCsv(formData);
    setIsSubmitting(false);

    if (response.ok) {
      setResult({ summary: response.summary, parseErrors: response.parseErrors });
    } else {
      setError(response.error);
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5}>
      {error && <Alert severity="error">{error}</Alert>}

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Button component="label" variant="outlined" startIcon={<UploadFileOutlinedIcon />}>
          Choose CSV file
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            hidden
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {fileName ?? "No file chosen"}
        </Typography>
      </Stack>

      <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ alignSelf: "flex-start" }}>
        {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Import"}
      </Button>

      {result && (
        <Alert severity={result.summary.rows_flagged > 0 ? "warning" : "success"}>
          <Typography variant="body2">
            {result.summary.rows_inserted} inserted, {result.summary.rows_updated} updated,{" "}
            {result.summary.rows_flagged} flagged for review, {result.summary.rows_skipped} skipped.
          </Typography>
        </Alert>
      )}
      {result && (result.parseErrors.length > 0 || result.summary.errors.length > 0) && (
        <List dense>
          {[...result.parseErrors, ...result.summary.errors.map((e) => `${e.address ?? "Unknown row"}: ${e.reason}`)].map(
            (msg, i) => (
              <ListItem key={i} disableGutters>
                <ListItemText primary={msg} slotProps={{ primary: { variant: "body2", color: "text.secondary" } }} />
              </ListItem>
            )
          )}
        </List>
      )}
    </Stack>
  );
}

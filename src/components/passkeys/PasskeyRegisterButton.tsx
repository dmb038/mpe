"use client";

import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useRouter } from "next/navigation";

export default function PasskeyRegisterButton() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setStatus("loading");
    setError(null);
    try {
      const optionsRes = await fetch("/api/webauthn/register/options", { method: "POST" });
      if (!optionsRes.ok) throw new Error((await optionsRes.json()).error ?? "Couldn't start registration");
      const optionsJSON = await optionsRes.json();

      const response = await startRegistration({ optionsJSON });

      const verifyRes = await fetch("/api/webauthn/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      const result = await verifyRes.json();
      if (!verifyRes.ok || !result.ok) throw new Error(result.error ?? "Couldn't save that passkey");

      setStatus("success");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong adding your passkey.");
    }
  }

  return (
    <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
      {status === "success" && <Alert severity="success">Passkey added.</Alert>}
      {status === "error" && error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="outlined"
        startIcon={<KeyOutlinedIcon />}
        onClick={handleClick}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Follow your device's prompt…" : "Add a passkey"}
      </Button>
    </Stack>
  );
}

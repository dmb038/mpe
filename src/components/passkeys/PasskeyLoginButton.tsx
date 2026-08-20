"use client";

import { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useRouter } from "next/navigation";

export default function PasskeyLoginButton({ email }: { email: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setStatus("loading");
    setError(null);
    try {
      const optionsRes = await fetch("/api/webauthn/authenticate/options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const optionsJSON = await optionsRes.json();
      if (!optionsRes.ok) throw new Error(optionsJSON.error ?? "Couldn't start sign-in");

      const response = await startAuthentication({ optionsJSON });

      const verifyRes = await fetch("/api/webauthn/authenticate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      const result = await verifyRes.json();
      if (!verifyRes.ok || !result.ok) throw new Error(result.error ?? "Couldn't sign you in");

      router.push("/portal");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Passkey sign-in failed. Try your password instead.");
    }
  }

  return (
    <Stack spacing={1.5} sx={{ alignItems: "stretch" }}>
      {status === "error" && error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="outlined"
        size="large"
        startIcon={<KeyOutlinedIcon />}
        onClick={handleClick}
        disabled={!email || status === "loading"}
      >
        {status === "loading" ? "Follow your device's prompt…" : "Sign in with a passkey"}
      </Button>
    </Stack>
  );
}

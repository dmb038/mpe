"use client";

import { useTransition } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Divider from "@mui/material/Divider";
import { deletePasskey } from "@/actions/passkeys";
import PasskeyRegisterButton from "./PasskeyRegisterButton";

export type PasskeySummary = { id: string; device_label: string | null; created_at: string };

export default function PasskeyManager({ passkeys }: { passkeys: PasskeySummary[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Stack spacing={2}>
      {passkeys.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No passkeys registered yet.
        </Typography>
      ) : (
        <Stack divider={<Divider />} spacing={1}>
          {passkeys.map((passkey) => (
            <Stack key={passkey.id} direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <KeyOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Stack>
                  <Typography variant="body2">{passkey.device_label ?? "Passkey"}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Added {new Date(passkey.created_at).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton
                size="small"
                disabled={isPending}
                onClick={() => startTransition(async () => { await deletePasskey(passkey.id); })}
                aria-label="Remove passkey"
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
      <PasskeyRegisterButton />
    </Stack>
  );
}

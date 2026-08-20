"use client";

import { useState, useTransition } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { updateFlockRequestStatus } from "@/actions/admin";
import type { Database, FlockRequestStatus } from "@/types/database.types";

type FlockRequest = Database["public"]["Tables"]["flock_requests"]["Row"];

const statusColor: Record<FlockRequestStatus, "warning" | "info" | "success" | "default"> = {
  new: "warning",
  in_review: "info",
  fulfilled: "success",
  closed: "default",
};

function RequestCard({ request }: { request: FlockRequest }) {
  const [status, setStatus] = useState<FlockRequestStatus>(request.status);
  const [notes, setNotes] = useState(request.admin_notes ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Stack>
            <Typography variant="subtitle1">{request.requester_name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {request.requester_email}
            </Typography>
          </Stack>
          <Chip size="small" label={status} color={statusColor[status]} />
        </Stack>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>When:</strong>{" "}
          {request.incident_datetime
            ? new Date(request.incident_datetime).toLocaleString()
            : request.incident_date_text ?? "Not specified"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {request.description}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "flex-start" } }}>
          <Select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value as FlockRequestStatus)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="new">new</MenuItem>
            <MenuItem value="in_review">in_review</MenuItem>
            <MenuItem value="fulfilled">fulfilled</MenuItem>
            <MenuItem value="closed">closed</MenuItem>
          </Select>
          <TextField
            size="small"
            label="Admin notes"
            fullWidth
            multiline
            minRows={1}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await updateFlockRequestStatus(request.id, status, notes);
                setSaved(true);
              })
            }
          >
            {saved ? "Saved" : "Save"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function FlockRequestsAdminList({ requests }: { requests: FlockRequest[] }) {
  if (requests.length === 0) {
    return <Typography color="text.secondary">No requests yet.</Typography>;
  }
  return (
    <Stack spacing={2}>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </Stack>
  );
}

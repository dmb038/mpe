"use client";

import { useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import type { Database } from "@/types/database.types";

type DirectoryRow = Database["public"]["Views"]["directory_view"]["Row"];

export default function DirectorySearch({ residents }: { residents: DirectoryRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return residents;
    return residents.filter(
      (r) => r.full_name.toLowerCase().includes(q) || r.address_line1.toLowerCase().includes(q)
    );
  }, [residents, query]);

  return (
    <>
      <TextField
        fullWidth
        placeholder="Search by name or street address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3, maxWidth: 480 }}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
      />
      {filtered.length === 0 ? (
        <Typography color="text.secondary">No residents match that search.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((resident) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resident.id}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1">{resident.full_name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {resident.address_line1}, {resident.city}
                  </Typography>
                  <Stack spacing={0.5}>
                    {resident.email && (
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <EmailOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                        <Typography variant="body2">{resident.email}</Typography>
                      </Stack>
                    )}
                    {resident.phone && (
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <PhoneOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                        <Typography variant="body2">{resident.phone}</Typography>
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

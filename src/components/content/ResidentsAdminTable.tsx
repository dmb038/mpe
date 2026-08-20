"use client";

import { useTransition } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { updateResidentRole, updateResidentStatusAction } from "@/actions/admin";
import type { Database, ResidentRole } from "@/types/database.types";

type Resident = Database["public"]["Tables"]["residents"]["Row"];

const statusColor: Record<Resident["status"], "default" | "success" | "warning" | "error"> = {
  unclaimed: "default",
  pending_verification: "warning",
  active: "success",
  disabled: "error",
};

export default function ResidentsAdminTable({ residents }: { residents: Resident[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {residents.map((resident) => (
            <TableRow key={resident.id} hover>
              <TableCell>{resident.full_name}</TableCell>
              <TableCell>{resident.address_line1}</TableCell>
              <TableCell>{resident.csv_email}</TableCell>
              <TableCell>
                {resident.status === "active" || resident.status === "disabled" ? (
                  <Select
                    size="small"
                    value={resident.status}
                    disabled={isPending}
                    onChange={(e) =>
                      startTransition(async () => {
                        await updateResidentStatusAction(resident.id, e.target.value as "active" | "disabled");
                      })
                    }
                  >
                    <MenuItem value="active">active</MenuItem>
                    <MenuItem value="disabled">disabled</MenuItem>
                  </Select>
                ) : (
                  <Chip size="small" label={resident.status} color={statusColor[resident.status]} />
                )}
              </TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={resident.role}
                  disabled={isPending}
                  onChange={(e) =>
                    startTransition(async () => {
                      await updateResidentRole(resident.id, e.target.value as ResidentRole);
                    })
                  }
                >
                  <MenuItem value="resident">resident</MenuItem>
                  <MenuItem value="board">board</MenuItem>
                  <MenuItem value="admin">admin</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

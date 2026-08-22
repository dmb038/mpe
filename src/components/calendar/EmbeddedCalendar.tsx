"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function EmbeddedCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const calendarDays = [];
  // Previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }
  // Next month's days
  const remaining = 42 - calendarDays.length; // 6 rows × 7 days
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  return (
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, overflow: "hidden" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}>
        <IconButton onClick={prevMonth} sx={{ color: "inherit" }} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {MONTHS[month]} {year}
        </Typography>
        <IconButton onClick={nextMonth} sx={{ color: "inherit" }} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Day labels */}
      <Grid container sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}>
        {DAYS_OF_WEEK.map((day) => (
          <Grid key={day} size={{ xs: 12 / 7 }} sx={{ p: 1, textAlign: "center" }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar days */}
      <Grid container>
        {calendarDays.map((item, idx) => (
          <Grid
            key={idx}
            size={{ xs: 12 / 7 }}
            sx={{
              p: 1,
              minHeight: 60,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              bgcolor: item.isCurrentMonth ? "background.paper" : "action.hover",
              borderRight: (idx + 1) % 7 !== 0 ? "1px solid" : "none",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: item.isCurrentMonth ? 500 : 400,
                color: item.isCurrentMonth ? "text.primary" : "text.disabled",
              }}
            >
              {item.day}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

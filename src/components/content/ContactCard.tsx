import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export type Contact = { name: string; role: string };

export default function ContactGrid({ contacts }: { contacts: Contact[] }) {
  return (
    <Grid container spacing={2}>
      {contacts.map((contact) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${contact.name}-${contact.role}`}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </Avatar>
                <Stack>
                  <Typography variant="subtitle1">{contact.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {contact.role}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

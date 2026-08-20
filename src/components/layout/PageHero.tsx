import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { colorTokens } from "@/theme/tokens";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Box
      sx={{
        bgcolor: colorTokens.light.primaryContainer,
        borderBottom: "1px solid var(--mui-palette-divider)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {eyebrow && (
          <Typography
            variant="overline"
            sx={{ color: colorTokens.light.primary, letterSpacing: 1.5 }}
          >
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: description ? 1.5 : 0 }}
        >
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ maxWidth: 720, color: "text.secondary", fontSize: "1.05rem" }}>
            {description}
          </Typography>
        )}
      </Container>
    </Box>
  );
}

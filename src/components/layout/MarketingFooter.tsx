import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import { marketingNav, footerLinks } from "@/lib/nav";
import { TextLink } from "@/components/ui/LinkComponents";

export default function MarketingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        bgcolor: "var(--mui-palette-primary-main)",
        color: "var(--mui-palette-primary-contrastText)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" sx={{ fontFamily: "var(--font-display)", mb: 1 }}>
              Merriman Park Estates
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, maxWidth: 320 }}>
              A tree-lined neighborhood in Lake Highlands, Dallas, established in 1958
              and home to a voluntary Neighborhood Association.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                component="a"
                href={footerLinks.social[0].href}
                target="_blank"
                rel="noreferrer"
                aria-label="MPE Facebook Group"
                sx={{ color: "inherit" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href={footerLinks.social[1].href}
                target="_blank"
                rel="noreferrer"
                aria-label="MPE on Nextdoor"
                sx={{ color: "inherit" }}
              >
                <HolidayVillageIcon />
              </IconButton>
            </Stack>
          </Grid>

          {marketingNav
            .filter((item) => item.children)
            .map((item) => (
              <Grid size={{ xs: 6, sm: 2.5 }} key={item.label}>
                <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
                  {item.label}
                </Typography>
                <Stack spacing={0.75}>
                  {item.children!.map((child) => (
                    <TextLink
                      key={child.href}
                      href={child.href}
                      variant="body2"
                      sx={{ opacity: 0.9, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      {child.label}
                    </TextLink>
                  ))}
                </Stack>
              </Grid>
            ))}
        </Grid>

        <Typography variant="body2" sx={{ opacity: 0.7, mt: 5 }}>
          © {new Date().getFullYear()} Merriman Park Estates Neighborhood Association ·
          {" "}
          <Typography
            component="a"
            href={footerLinks.membershipToolkit}
            target="_blank"
            rel="noreferrer"
            variant="body2"
            sx={{ color: "inherit", textDecoration: "underline" }}
          >
            Pay dues via Membership Toolkit
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
}

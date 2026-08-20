import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export default function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 6 }}>
      <Container maxWidth="xs">
        <Stack spacing={3} sx={{ alignItems: "center", mb: 3 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/images/logo.png" alt="MPE logo" width={44} height={25} />
          </Link>
        </Stack>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: description ? 1 : 3, textAlign: "center" }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
                {description}
              </Typography>
            )}
            {children}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

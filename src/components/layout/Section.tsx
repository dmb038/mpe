import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import type { ContainerProps } from "@mui/material/Container";

export default function Section({
  children,
  maxWidth = "lg",
  ...rest
}: { children: React.ReactNode } & ContainerProps) {
  return (
    <Box component="section" sx={{ py: { xs: 5, md: 7 } }}>
      <Container maxWidth={maxWidth} {...rest}>
        {children}
      </Container>
    </Box>
  );
}

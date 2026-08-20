import Box from "@mui/material/Box";
import { colorTokens } from "@/theme/tokens";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colorTokens.light.surfaceVariant }}>
      {children}
    </Box>
  );
}

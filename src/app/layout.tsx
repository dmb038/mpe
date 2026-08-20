import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

const bodyFont = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Merriman Park Estates | MPE Dallas",
    template: "%s | MPE Dallas",
  },
  description:
    "Merriman Park Estates (MPE) is a quiet, tree-lined neighborhood in Lake Highlands, Dallas, established in 1958 and home to a voluntary neighborhood association.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

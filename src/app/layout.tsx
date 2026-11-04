import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const font = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "NCA Safe Space",
  description: "Case management for NCA Safe Space",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "NCA Safe Space" },
};
export const viewport: Viewport = { themeColor: "#0f6f7c", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={font.className}><Providers>{children}</Providers></body>
    </html>
  );
}

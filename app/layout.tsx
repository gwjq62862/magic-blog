import type { Metadata } from "next";
import { Inter, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

import NavbarProvider from "@/components/ui/Navbar/NavbarProvider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const myanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  variable: "--font-myanmar",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Magic Mind Blog – Psychology & Mental Health Insights",
  description:
    "Magic Mind Blog shares practical psychology, mental health tips, and self‑growth stories to help you understand your mind and live calmer, more intentional days.",
  metadataBase: new URL("https://magic-blog-blond.vercel.app/"),
  openGraph: {
    title: "Magic Mind Blog – Psychology & Mental Health Insights",
    description:
      "Articles on anxiety, confidence, relationships, and everyday psychology written in simple language for real life.",
    url: "https://magic-blog-blond.vercel.app/",
    siteName: "Magic Mind Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Mind Blog – Psychology & Mental Health Insights",
    description:
      "Mental health and psychology posts to help you understand yourself and others.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-display bg-(--color-bg-light) dark:bg-(--color-bg-dark) text-white ${inter.variable} ${myanmar.variable}`}
      >
        <ConvexClientProvider>
          <NavbarProvider />
          {children}
          <SpeedInsights/>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

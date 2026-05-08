import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const bebasNeue = localFont({
  src: [
    {
      path: "./fonts/bebas-neue-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/bebas-neue-latin-ext.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const dmSans = localFont({
  src: [
    {
      path: "./fonts/dm-sans-latin.woff2",
      weight: "100 1000",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans-latin-ext.woff2",
      weight: "100 1000",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "./fonts/jetbrains-mono-latin.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-latin-ext.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-vietnamese.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-greek.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-cyrillic.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "./fonts/jetbrains-mono-cyrillic-ext.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  title: "MZL — Front-End Developer",
  description:
    "Michael's portfolio. Front-end focused React & TypeScript developer with a passion for interactive design.",
  keywords: ["front-end", "React", "TypeScript", "Next.js", "developer", "portfolio"],
  openGraph: {
    title: "MZL — Front-End Developer",
    description:
      "Front-end focused React & TypeScript developer with a passion for interactive design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-dvh overflow-x-hidden antialiased">
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

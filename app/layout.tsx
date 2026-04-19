import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
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
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-dvh overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}

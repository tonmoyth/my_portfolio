import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nurislam Hasan Tonmoy | Full-stack Developer Portfolio",
  description: "Portfolio of Nurislam Hasan Tonmoy, a full-stack developer building fast websites, ordering systems, and booking flows.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}


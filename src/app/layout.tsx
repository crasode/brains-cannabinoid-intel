import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brainsai.app"),
  title: "Brains Clinical Intelligence",
  description:
    "Commercial cannabinoid clinical intelligence platform for tracking active trials, leading institutions, sponsor activity, patents, grants, and high-value opportunities.",
  openGraph: {
    title: "Brains Clinical Intelligence",
    description:
      "Commercial cannabinoid clinical intelligence platform for tracking active trials, leading institutions, sponsor activity, patents, grants, and high-value opportunities.",
    url: "https://brainsai.app",
    siteName: "Brains Clinical Intelligence",
    images: ["/opengraph-image"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brains Clinical Intelligence",
    description:
      "Commercial cannabinoid clinical intelligence platform for tracking active trials, leading institutions, sponsor activity, patents, grants, and high-value opportunities.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

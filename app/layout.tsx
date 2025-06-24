import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://qr-code-j449q3nk5-captaincrouton89s-projects.vercel.app'),
  title: "Free QR Code Generator - Create Custom QR Codes Online",
  description: "Generate QR codes instantly for free. Customize colors, size, and error correction. Download as PNG or SVG. Perfect for URLs, text, business cards, and marketing materials.",
  keywords: ["QR code generator", "free QR code", "custom QR code", "QR code maker", "barcode generator", "URL to QR code", "QR code creator"],
  authors: [{ name: "QR Code Generator" }],
  creator: "QR Code Generator",
  publisher: "QR Code Generator",
  robots: "index, follow",
  openGraph: {
    title: "Free QR Code Generator - Create Custom QR Codes Online",
    description: "Generate QR codes instantly for free. Customize colors, size, and error correction. Download as PNG or SVG.",
    type: "website",
    url: "https://qr-code-j449q3nk5-captaincrouton89s-projects.vercel.app",
    siteName: "QR Code Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator - Create Custom QR Codes Online",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator - Create Custom QR Codes Online",
    description: "Generate QR codes instantly for free. Customize colors, size, and error correction. Download as PNG or SVG.",
    images: ["/og-image.png"],
    creator: "@qrcodegen",
  },
  alternates: {
    canonical: "https://qr-code-j449q3nk5-captaincrouton89s-projects.vercel.app",
  },
  category: "technology",
  classification: "QR Code Generator Tool",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "application-name": "QR Code Generator",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

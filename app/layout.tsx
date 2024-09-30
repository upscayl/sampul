import type { Metadata } from "next";
import { DM_Sans as Font } from "next/font/google";
import "./globals.css";

const font = Font({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sampul - Custom Resolution Image Samples",
  description: "Custom Resolution Image Samples",
  openGraph: {
    url: "https://sampul.upscayl.org/",
    description: "Custom Resolution Image Samples",
    siteName: "Sampul",
    images: [
      {
        url: "https://sampul.upscayl.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sampul - Custom Resolution Image Samples",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}

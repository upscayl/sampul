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

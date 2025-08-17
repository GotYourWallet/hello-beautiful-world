// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Hello, Beautiful World",
  description: "Tiny Next.js + Tailwind starter with Docker & Azure",
  openGraph: { title: "Hello, Beautiful World", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white">{children}</body>
    </html>
  );
}
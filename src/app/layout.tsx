import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Portfolio | Marcin",
  description: "Programmer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-black text-white selection:bg-brand-500/30 selection:text-brand-50">
        {children}
      </body>
    </html>
  );
}

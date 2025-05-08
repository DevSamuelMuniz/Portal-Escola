import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans  } from "next/font/google";
import "./globals.css";

import "leaflet/dist/leaflet.css";


const josefin_Sans  = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Escolar",
  description: "Encontre a escola ideal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} ${josefin_Sans.className} antialiased`} 
      >
        {children}
      </body>
    </html>
  );
}

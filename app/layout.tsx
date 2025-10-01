import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { Providers } from "./provider";
import { DM_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], 
  variable: "--font-dm-sans",
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
  title: "Bankd",
  description: "Banking app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${dmSans.variable} antialiased`}
      >
        <Providers>
          <Notifications />
          {children}
        </Providers>
      </body>
    </html>
  );
}
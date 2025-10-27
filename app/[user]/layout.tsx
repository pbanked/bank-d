import type { Metadata } from "next";

import "../globals.css";
import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import { Notifications } from "@mantine/notifications";
import { Providers } from "../provider";
import { DM_Sans } from "next/font/google";
import { Navbar } from "@/components/navbar/navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], 
  variable: "--font-dm-sans",
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
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
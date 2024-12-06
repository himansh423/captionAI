import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/provider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Captiony",
  description: "AI captionn generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Navbar/>{children}</Providers>
      </body>
    </html>
  );
}

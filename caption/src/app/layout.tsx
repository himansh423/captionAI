import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Booleanix - AI Caption Generator",
  description:
    "Booleanix is an AI-powered platform that simplifies caption creation, delivering creative captions for social media, marketing, and personal use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="canonical" href="https://www.booleanix.com/" />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

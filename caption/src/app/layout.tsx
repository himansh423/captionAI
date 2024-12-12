import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

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
  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Privacy Policy",
        item: "https://www.booleanix.com/privacy-policy",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms & Conditions",
        item: "https://www.booleanix.com/terms-and-conditions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact Us",
        item: "https://www.booleanix.com/contact-us",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.booleanix.com/" />
        <Script id="breadcrumb-schema" type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </Script>
        <meta property="og:title" content="Booleanix - AI Caption Generator" />
        <meta property="og:site_name" content="Booleanix" />
        <meta property="og:url" content="https://www.booleanix.com" />
        <meta
          property="og:description"
          content="Booleanix is an AI-powered platform that simplifies caption creation, delivering creative captions for social media, marketing, and personal use."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.booleanix.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.958c6f9f.png&w=1920&q=75"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@booleanix" />
        <meta name="twitter:title" content="Booleanix - AI Caption Generator" />
        <meta
          name="twitter:description"
          content="Booleanix is an AI-powered platform that simplifies caption creation, delivering creative captions for social media, marketing, and personal use."
        />
        <meta
          name="twitter:image"
          content="https://www.booleanix.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.958c6f9f.png&w=1920&q=75"
        />
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

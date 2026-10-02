import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { serif, sans } from "@/lib/fonts";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScreenLoader from "@/components/ScreenLoader";

const siteUrl = "https://necessarytreasures.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Necessary Treasures | Handmade Candles, Leather, Engraving & Custom Creations",
    template: "%s | Necessary Treasures",
  },
  description:
    "Necessary Treasures is a husband-and-wife handmade studio crafting candles, leather goods, laser engravings, acrylic pieces, and custom creations — made by hand, made to mean something.",
  keywords: [
    "handmade candles",
    "leather goods",
    "laser engraving",
    "acrylic crafts",
    "custom orders",
    "handmade gifts",
    "Necessary Treasures",
  ],
  openGraph: {
    title: "Necessary Treasures | Made by hand. Made to mean something.",
    description:
      "Thoughtfully crafted candles, leather goods, engravings, acrylic pieces, and custom creations from a husband-and-wife handmade studio.",
    url: siteUrl,
    siteName: "Necessary Treasures",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 800 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Necessary Treasures",
    description: "Made by hand. Made to mean something.",
    images: ["/images/hero.jpg"],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Necessary Treasures",
              url: siteUrl,
              description:
                "A husband-and-wife handmade studio crafting candles, leather goods, laser engravings, acrylic pieces, and custom creations.",
              sameAs: ["https://instagram.com", "https://facebook.com"],
            }),
          }}
        />
        <CartProvider>
          <ScreenLoader />
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

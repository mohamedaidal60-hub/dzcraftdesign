import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "DZCRAFTDESIGN — Mode Algérienne Premium",
  description: "Découvrez DZCRAFTDESIGN, la marque de mode qui célèbre l'Algérie. Collections adulte, enfant, bébé et accessoires fabriqués en Algérie. Livraison partout en Europe.",
  keywords: "mode algérienne, vêtements algérie, DZCRAFTDESIGN, collection algérienne, made in Algeria",
  openGraph: {
    title: "DZCRAFTDESIGN — Mode Algérienne Premium",
    description: "La marque qui célèbre l'Algérie. Collections fabriquées en Algérie.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}

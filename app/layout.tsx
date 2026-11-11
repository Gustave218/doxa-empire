import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Doxa Empire · Fashion, Coaching & Life in Kenya", template: "%s · Doxa Empire" },
  description: "Shop dresses and handmade Maasai slippers, learn to build a business with coaching videos and ebooks, and settle in Kenya with confidence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <a href="#main" className="skip">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

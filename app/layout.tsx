import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--sans", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Doxa Empire · Mode, formation et vie au Kenya", template: "%s · Doxa Empire" },
  description: "Achetez robes et sandales maasaï faites main, apprenez à bâtir votre business avec nos vidéos et ebooks, et installez vous au Kenya en toute confiance.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={sans.variable}>
      <body>
        <AuthProvider>
        <CartProvider>
          <a href="#main" className="skip">Aller au contenu</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

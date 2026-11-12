import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ShopBrowser } from "./ShopBrowser";
import { TruckIcon, ShieldIcon, ReturnIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Robes, sandales en cuir et sandales maasaï faites main. Livrées partout au Kenya.",
};

export default function ShopPage() {
  return (
    <>
      <h1 className="sr-only">Boutique Doxa Empire</h1>
      <div className="perks">
        <div className="wrap perks-row">
          <Link href="/delivery"><TruckIcon size={20} /> Livraison rapide</Link>
          <Link href="/refunds"><ReturnIcon size={20} /> Remboursé si livraison en retard</Link>
          <Link href="/terms"><ShieldIcon size={20} /> Paiement sécurisé par carte et mobile money</Link>
        </div>
      </div>
      <Suspense fallback={<div className="wrap section">Chargement…</div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}

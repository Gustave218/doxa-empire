import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "./ShopBrowser";
import { TruckIcon, ShieldIcon, ReturnIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Robes, sandales en cuir et sandales maasaï faites main. Livrées partout au Kenya.",
};

export default function ShopPage() {
  return (
    <>
      <section className="shop-hero">
        <div className="wrap">
          <p className="eyebrow">La sélection Doxa · Saison 01</p>
          <h1 className="serif display-xl">Habillée pour <em>toutes</em> les soirées de Nairobi.</h1>
          <p className="lede">Robes qui affirment votre style, sandales en cuir souple et perles faites main par des artisans maasaï.</p>
        </div>
      </section>
      <div className="perks">
        <div className="wrap perks-row">
          <span><TruckIcon size={20} /> Livraison le jour même à Nairobi</span>
          <span><ReturnIcon size={20} /> Retours faciles sous 14 jours</span>
          <span><ShieldIcon size={20} /> Paiement sécurisé par carte et mobile money</span>
        </div>
      </div>
      <Suspense fallback={<div className="wrap section">Chargement…</div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}

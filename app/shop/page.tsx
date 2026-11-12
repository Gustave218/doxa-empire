import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "./ShopBrowser";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Robes, sandales en cuir et sandales maasaï faites main. Livrées partout au Kenya.",
};

export default function ShopPage() {
  return (
    <>
      <h1 className="sr-only">Boutique Doxa Empire</h1>
      <Suspense fallback={<div className="wrap section">Chargement…</div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}

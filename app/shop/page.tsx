import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "./ShopBrowser";
import { TruckIcon, ShieldIcon, ReturnIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Shop",
  description: "Dresses, leather slides and handmade Maasai slippers. Delivered across Kenya.",
};

export default function ShopPage() {
  return (
    <>
      <section className="shop-hero">
        <div className="wrap">
          <p className="eyebrow">The Doxa Edit · Season 01</p>
          <h1 className="serif display-xl">Dressed for <em>every</em> Nairobi evening.</h1>
          <p className="lede">Statement dresses, soft leather slides and beadwork handmade by Maasai artisans.</p>
        </div>
      </section>
      <div className="perks">
        <div className="wrap perks-row">
          <span><TruckIcon size={20} /> Same-day Nairobi delivery</span>
          <span><ReturnIcon size={20} /> 14-day easy returns</span>
          <span><ShieldIcon size={20} /> Secure card & mobile money</span>
        </div>
      </div>
      <Suspense fallback={<div className="wrap section">Loading…</div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}

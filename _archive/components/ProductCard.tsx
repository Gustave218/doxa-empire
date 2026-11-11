"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, productHref, totalStock, type Product } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import { BookCover } from "./BookCover";

export function ProductCard({ p }: { p: Product }) {
  const { currency } = useCart();
  const soldOut = p.type === "physical" && totalStock(p) === 0;
  return (
    <Link href={productHref(p)} className="card">
      <div className={`card-media ${p.type === "ebook" ? "card-media-book" : ""}`}>
        {p.images ? (
          <>
            <Image src={p.images[0]} alt={p.name} fill sizes="(min-width: 900px) 25vw, 50vw" style={{ objectFit: "cover" }} />
            {p.images[1] && <Image className="card-alt" src={p.images[1]} alt="" fill sizes="(min-width: 900px) 25vw, 50vw" style={{ objectFit: "cover" }} />}
          </>
        ) : p.type === "ebook" ? (
          <BookCover p={p} />
        ) : (
          <div className={`card-type card-type-${p.type}`}>
            <span>{p.type === "course" ? `${p.lessons?.length} lessons` : p.duration}</span>
            <strong>{p.name}</strong>
          </div>
        )}
        {soldOut ? <span className="badge badge-dark">Sold out</span> : p.badge && <span className="badge">{p.badge}</span>}
      </div>
      <p className="card-name">{p.name}</p>
      <p className="card-price">{formatPrice(p.price, currency)}</p>
      {p.colours && p.colours.length > 1 && <p className="muted small">{p.colours.length} colours</p>}
    </Link>
  );
}

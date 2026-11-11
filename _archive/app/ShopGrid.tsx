"use client";

import { useMemo, useState } from "react";
import { totalStock, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";

const SIZES = ["36", "37", "38", "39", "40", "41", "42"];

export function ShopGrid({ products }: { products: Product[] }) {
  const { currency } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");
  const [inStock, setInStock] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) => (size ? p.sizes?.some((s) => s.size === size && s.stock > 0) : true));
    if (inStock) l = l.filter((p) => totalStock(p) > 0);
    const price = (p: Product) => p.price[currency] ?? Infinity;
    if (sort === "low") l = [...l].sort((a, b) => price(a) - price(b));
    if (sort === "high") l = [...l].sort((a, b) => price(b) - price(a));
    return l;
  }, [products, size, sort, inStock, currency]);

  return (
    <>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by size">
          {SIZES.map((s) => (
            <button key={s} className="chip" aria-pressed={size === s} onClick={() => setSize(size === s ? null : s)}>{s}</button>
          ))}
        </div>
        <div className="chips">
          <button className="chip" aria-pressed={inStock} onClick={() => setInStock(!inStock)}>In stock</button>
          <label>
            <span className="sr-only">Sort</span>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <p className="muted small">{list.length} styles</p>
      {list.length === 0 ? (
        <div className="empty">
          <p>No slippers in size {size} right now.</p>
          <button className="btn btn-outline" onClick={() => setSize(null)}>Show all sizes</button>
        </div>
      ) : (
        <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      )}
    </>
  );
}

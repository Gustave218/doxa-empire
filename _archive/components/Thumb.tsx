import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { BookCover } from "./BookCover";

/** Small square image for any product type. */
export function Thumb({ p }: { p: Product }) {
  if (p.images?.[0]) {
    return (
      <div className="thumb">
        <Image src={p.images[0]} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
      </div>
    );
  }
  if (p.type === "ebook") return <div className="thumb thumb-book"><BookCover p={p} small /></div>;
  return <div className={`thumb thumb-type thumb-${p.type}`}>{p.type === "course" ? "Course" : "Coaching"}</div>;
}

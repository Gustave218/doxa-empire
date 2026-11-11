import type { MetadataRoute } from "next";
import { shopProducts } from "@/lib/catalog";

const BASE = process.env.SITE_URL || "https://example.com"; // set SITE_URL when the domain is known

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/shop", "/coaching", "/ebooks", "/travel", "/about", "/contact"];
  return [...fixed.map((p) => ({ url: BASE + p })), ...shopProducts.map((p) => ({ url: `${BASE}/shop/${p.slug}` }))];
}

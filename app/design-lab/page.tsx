import Link from "next/link";

export const metadata = { title: "Design lab · Doxa Empire" };

const directions = [
  {
    href: "/design-lab/a",
    name: "A · Masthead",
    type: "Bodoni Moda + Hanken Grotesk",
    idea:
      "The home page is a magazine cover: a huge masthead, one full-length portrait, and three cover lines that are the three doors, followed by a black contents page where each door is one enormous line. It draws on fashion cover layouts in the tradition of Harper's Bazaar and Vogue Italia and on printed contents pages, and the ebooks sit on a real shelf with spines.",
  },
  {
    href: "/design-lab/b",
    name: "B · Signboard",
    type: "Archivo only, condensed 62% for display, normal width for reading",
    idea:
      "The brand is a painted shopfront: a slab of pink signage with the founder's photo breaking out of it, then three solid colour bands you cannot miss on a phone. It draws on hand-painted Nairobi shop signage and newspaper street posters, crossed with the blunt type of Balenciaga and Off-White campaigns, and the Shop is a lookbook strip followed by a plain, fast grid.",
  },
  {
    href: "/design-lab/c",
    name: "C · Lookbook",
    type: "Gloock + Familjen Grotesk on a warm paper neutral",
    idea:
      "This is a quieter, more expensive edit: asymmetric spreads where photographs do the work and each door is a full-width picture with a label tab pinned to its corner. It draws on printed lookbooks, The Gentlewoman, and gallery catalogues, and pink appears only once per screen, as a block for the moment that matters.",
  },
];

export default function DesignLab() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "32px 16px", maxWidth: 820, margin: "0 auto", color: "#222" }}>
      <h1 style={{ fontSize: 32, margin: "0 0 8px" }}>Design lab</h1>
      <p style={{ margin: "0 0 32px", fontSize: 16 }}>Three directions. Each shows the hero, the three doors and one Shop or Academy section. Grey blocks are photos still needed.</p>
      {directions.map((d) => (
        <section key={d.href} style={{ borderTop: "1px solid #222", padding: "20px 0 28px" }}>
          <h2 style={{ fontSize: 24, margin: "0 0 4px" }}>
            <Link href={d.href} style={{ color: "#b0145f" }}>{d.name}</Link>
          </h2>
          <p style={{ margin: "0 0 10px", fontSize: 14, color: "#55565a" }}>{d.type}</p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55 }}>{d.idea}</p>
        </section>
      ))}
    </main>
  );
}

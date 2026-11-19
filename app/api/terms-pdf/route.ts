import { NextResponse } from "next/server";

const lines = [
  "DOXA EMPIRE - CONDITIONS GENERALES",
  "Derniere mise a jour : 19 novembre 2026",
  "",
  "1. Services de voyage, d'installation et pour etudiants",
  "Doxa Empire propose une formule familles, nouveaux arrivants et vacanciers a 500 USD",
  "avec accompagnement pendant un mois, ainsi qu'une formule etudiants a 700 USD.",
  "",
  "2. Paiement non remboursable",
  "Une fois qu'une formule de voyage, d'installation ou d'accompagnement etudiant est",
  "payee, le montant est definitif et non remboursable. Cette regle s'applique des",
  "l'acceptation du paiement, meme en cas d'annulation ou de modification par le client.",
  "",
  "3. Durée de la formule familles",
  "La formule familles, nouveaux arrivants et vacanciers comprend un accompagnement",
  "pendant un mois a compter de l'accord confirme avec Doxa Empire.",
  "",
  "4. Services apres un mois",
  "Apres cette periode d'un mois, toute prestation supplementaire peut etre facturee",
  "selon sa nature, sa duree, sa complexite et les conditions convenues avec le client.",
  "Certaines prestations supplementaires peuvent aussi etre gratuites, selon ce qui",
  "sera convenu directement avec Doxa Empire.",
  "",
  "5. Contenu des formules",
  "La formule a 500 USD peut inclure la reservation de logement, l'accueil a l'aeroport,",
  "la carte SIM, les démarches de visa, les achats essentiels pour la maison et les courses.",
  "La formule etudiants a 700 USD peut inclure la recherche d'universite, l'admission,",
  "la demande de Student Pass, le logement étudiant et l'accueil.",
  "",
  "6. Garanties",
  "Doxa Empire accompagne le client, mais ne garantit pas l'obtention d'un visa,",
  "d'un permis étudiant, d'une admission universitaire ou d'un logement. Les décisions",
  "appartiennent aux autorités et établissements concernés.",
  "",
  "Contact: WhatsApp au +254 707 898 058",
];

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export async function GET() {
  const stream = ["BT", "/F1 11 Tf", "50 790 Td", "14 TL"];
  for (const line of lines) {
    stream.push(`(${escapePdfText(line)}) Tj`, "T*");
  }
  stream.push("ET");
  const content = stream.join("\n");

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new NextResponse(Buffer.from(pdf, "utf8"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="conditions-generales-doxa-empire.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

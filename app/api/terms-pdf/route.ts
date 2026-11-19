import { NextResponse } from "next/server";

const paragraphs = [
  "DOXA EMPIRE - CONDITIONS GENERALES",
  "Derniere mise a jour : 19 novembre 2026",
  "",
  "Ces conditions s'appliquent a tout achat et a toute utilisation du site Doxa Empire : boutique, cours video, ebooks et services de voyage et d'installation. En passant commande, vous acceptez ces conditions.",
  "",
  "QUI SOMMES-NOUS",
  "Doxa Empire est une entreprise fondee par Gloria, presente a Nairobi (Kenya) et a Kinshasa (RD Congo). Contact : WhatsApp au +254 707 898 058.",
  "",
  "VOTRE COMPTE",
  "Un compte est necessaire pour certaines commandes. Vous etes responsable de l'exactitude des informations fournies et de la confidentialite de votre mot de passe. Vous devez nous signaler toute utilisation non autorisee de votre compte.",
  "",
  "PRIX ET PAIEMENT",
  "Les prix sont affiches en dollars americains (USD), toutes taxes applicables comprises. Le paiement se fait par carte bancaire (Visa, Mastercard) ou par mobile money lorsque cette option est disponible. Toute somme payee pour une formule de voyage ou d'accompagnement est definitive et non remboursable.",
  "",
  "PRODUITS PHYSIQUES (BOUTIQUE)",
  "Les robes et sandales sont livrees a l'adresse indiquee lors de la commande, dans le delai convenu avec vous. Les photos sont aussi fideles que possible, mais de legeres variations de couleur peuvent exister.",
  "",
  "PRODUITS NUMERIQUES (COURS VIDEO ET EBOOKS)",
  "Les cours video et les ebooks sont livres immediatement apres paiement. Ils sont reserves a votre usage personnel : il est interdit de les partager, revendre ou distribuer sans autorisation ecrite.",
  "",
  "SERVICES DE VOYAGE, D'INSTALLATION ET POUR ETUDIANTS",
  "Doxa Empire propose une formule Familles, nouveaux arrivants et vacanciers a 500 USD, avec un accompagnement pendant un mois, et une formule Etudiants a 700 USD. Le contenu precis, les delais et les services inclus sont confirmes avec le client avant paiement.",
  "Selon la formule choisie, l'accompagnement peut inclure la reservation d'un logement, l'accueil a l'aeroport, l'aide pour obtenir une carte SIM, l'accompagnement dans les demarches de visa ou de permis etudiant, les achats essentiels pour la maison, les courses au supermarche, la recherche d'universite, l'aide a l'admission et l'accompagnement pour l'installation.",
  "",
  "DUREE DE L'ACCOMPAGNEMENT",
  "La formule Familles, nouveaux arrivants et vacanciers couvre une periode d'accompagnement limitee a un mois a compter de l'accord confirme. La formule Etudiants est encadree par le plan convenu avec le client.",
  "",
  "SERVICES APRES UN MOIS",
  "Apres cette periode, tout service supplementaire demande peut etre facture selon sa nature, sa duree et sa complexite. Certains services supplementaires peuvent aussi etre gratuits, selon ce qui sera convenu directement avec Doxa Empire. Toute prestation supplementaire et ses conditions doivent etre convenues avec le client avant sa realisation.",
  "",
  "PAIEMENTS ET REMBOURSEMENTS DES SERVICES DE VOYAGE",
  "Une fois qu'une formule de voyage, d'installation ou d'accompagnement etudiant est payee, le montant est non remboursable, y compris en cas d'annulation ou de modification par le client. Les achats numeriques ne sont ni repris ni rembourses apres livraison. Les articles physiques sont traites selon la page Retours et remboursements.",
  "",
  "PROPRIETE INTELLECTUELLE",
  "Les textes, videos, ebooks, photos, logos et la marque Doxa Empire nous appartiennent. Toute reproduction sans autorisation ecrite est interdite.",
  "",
  "RESPONSABILITE",
  "Les cours et ebooks presentent notre experience et des methodes pratiques ; les resultats dependent de votre travail et de votre marche et ne sont pas garantis. Doxa Empire ne peut garantir l'obtention d'un visa, d'un permis etudiant, d'une admission universitaire ou d'un logement, car les decisions appartiennent aux autorites et etablissements concernes.",
  "",
  "LITIGES ET DROIT APPLICABLE",
  "En cas de probleme, contactez-nous d'abord sur WhatsApp au +254 707 898 058 : nous cherchons une solution amiable. A defaut, le droit kenyan s'applique.",
  "",
  "MODIFICATIONS",
  "Nous pouvons mettre a jour ces conditions. La version applicable est celle publiee en ligne au moment de votre commande.",
];

function wrap(text: string, maxLength: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (line && `${line} ${word}`.length > maxLength) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export async function GET() {
  const lines = paragraphs.flatMap((paragraph) => paragraph ? wrap(paragraph, 88) : [""]);
  const linesPerPage = 48;
  const pageLines: string[][] = [];
  for (let i = 0; i < lines.length; i += linesPerPage) {
    pageLines.push(lines.slice(i, i + linesPerPage));
  }

  const objects: string[] = [];
  const pageObjectIds = pageLines.map((_, index) => 4 + index * 2);
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(`<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageLines.length} >>`);
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  for (let i = 0; i < pageLines.length; i++) {
    const pageId = 4 + i * 2;
    const streamId = pageId + 1;
    const stream = ["BT", "/F1 10 Tf", "52 790 Td", "14 TL"];
    for (const line of pageLines[i]) {
      stream.push(`(${escapePdfText(line)}) Tj`, "T*");
    }
    stream.push("ET");
    const content = stream.join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${streamId} 0 R >>`);
    objects.push(`<< /Length ${Buffer.byteLength(content, "ascii")} >>\nstream\n${content}\nendstream`);
  }

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new NextResponse(Buffer.from(pdf, "ascii"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="conditions-generales-doxa-empire.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

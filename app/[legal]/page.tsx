import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; sections: [string, string][] }> = {
  terms: { title: "Terms of sale", sections: [
    ["Who we are", "Doxa Empire. Registered business name and address: [NEEDS CLIENT]."],
    ["Orders and payment", "Prices are shown in KES or USD. Your order is confirmed once we have checked your payment."],
    ["Digital products", "Courses and ebooks are for your personal use. Sharing download links or account access is not allowed."],
    ["Coaching", "Sessions are booked after payment. Rescheduling and cancellation rules: [NEEDS CLIENT]."],
  ]},
  privacy: { title: "Privacy", sections: [
    ["What we collect", "Your name, email, phone number, delivery address and, for student enquiries, your nationality, school and arrival date."],
    ["What we never collect online", "Passports or other identity documents."],
    ["Why", "To deliver your order, give you access to what you bought, and reply to your enquiry."],
    ["Your rights", "Ask us to see, correct or delete your data at any time. Contact: [NEEDS CLIENT]. Kenya Data Protection Act compliance to be reviewed."],
  ]},
  refunds: { title: "Returns and refunds", sections: [
    ["Shop items", "Return unworn items within [NEEDS CLIENT] days. Exchange for another size subject to stock."],
    ["Courses and ebooks", "Because they are delivered instantly, digital products are not refundable once accessed. [NEEDS CLIENT: confirm]"],
    ["Coaching", "[NEEDS CLIENT]"],
  ]},
  delivery: { title: "Delivery", sections: [
    ["Nairobi", "1 to 2 working days. Fee shown at checkout."],
    ["Rest of Kenya", "2 to 4 working days by courier."],
    ["International", "On request. Message us on WhatsApp."],
    ["Fees and couriers", "[NEEDS CLIENT]"],
  ]},
};

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const p = pages[(await params).legal];
  return p ? { title: p.title, robots: { index: false } } : {};
}

export default async function Legal({ params }: { params: Promise<{ legal: string }> }) {
  const p = pages[(await params).legal];
  if (!p) notFound();
  return (
    <div className="wrap prose">
      <h1 className="serif h1">{p.title}</h1>
      <p className="notice">Draft for client and legal review. Not final.</p>
      {p.sections.map(([h, t]) => (<section key={h}><h2>{h}</h2><p>{t}</p></section>))}
    </div>
  );
}

import type { Metadata } from "next";
import { ChatIcon, MailIcon, PinIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact", description: "Talk to Doxa Empire on WhatsApp, email or visit us in Nairobi." };

// Contact details are placeholders until the client confirms them.
const CHANNELS = [
  { Icon: ChatIcon, t: "WhatsApp", d: "Fastest reply, 8am–9pm daily", v: "+254 700 000 000" },
  { Icon: MailIcon, t: "Email", d: "We reply within one working day", v: "hello@doxaempire.co.ke" },
  { Icon: PhoneIcon, t: "Call", d: "Mon–Sat, 9am–6pm EAT", v: "+254 700 000 000" },
  { Icon: PinIcon, t: "Visit", d: "Showroom by appointment", v: "Westlands, Nairobi" },
];

export default function ContactPage() {
  return (
    <div className="wrap section">
      <div className="section-head center">
        <p className="eyebrow">Contact</p>
        <h1 className="serif display-xl">We&apos;d love to <em>hear from you.</em></h1>
        <p className="lede center-block">Questions about an order, a course or your move to Kenya? Reach us however suits you.</p>
      </div>
      <div className="contact-grid">
        {CHANNELS.map(({ Icon, t, d, v }) => (
          <div key={t} className="contact-card">
            <Icon size={26} />
            <h2 className="serif h3">{t}</h2>
            <p className="muted small">{d}</p>
            <p className="contact-v">{v}</p>
          </div>
        ))}
      </div>
      <p className="center small muted">Contact details shown are placeholders for the preview.</p>
    </div>
  );
}

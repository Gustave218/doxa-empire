import type { Metadata } from "next";
import { ChatIcon, MailIcon, PinIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact", description: "Écrivez à Doxa Empire sur WhatsApp, par email ou rendez nous visite à Nairobi." };

// Contact details are placeholders until the client confirms them.
const CHANNELS = [
  { Icon: ChatIcon, t: "WhatsApp", d: "Réponse la plus rapide, de 8 h à 21 h tous les jours", v: "+254 707 898 058" },
  { Icon: MailIcon, t: "Email", d: "Réponse sous un jour ouvré", v: "hello@doxaempire.co.ke" },
  { Icon: PhoneIcon, t: "Appel", d: "Du lundi au samedi, de 9 h à 18 h (heure de Nairobi)", v: "+254 707 898 058" },
  { Icon: PinIcon, t: "Visite", d: "Showroom sur rendez vous", v: "Westlands, Nairobi" },
];

export default function ContactPage() {
  return (
    <div className="wrap section">
      <div className="section-head center">
        <p className="eyebrow">Contact</p>
        <h1 className="serif display-xl">Nous serions ravis <em>de vous lire.</em></h1>
        <p className="lede center-block">Une question sur une commande, un cours ou votre installation au Kenya ? Contactez nous comme vous préférez.</p>
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
      <p className="center small muted">Certaines coordonnées sont provisoires.</p>
    </div>
  );
}

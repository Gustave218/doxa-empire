"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Pages with a main action button near the bottom of the phone screen. The
// floating button is hidden there so it never covers "Add to bag" or "Pay".
const HIDE_ON = [/^\/shop\/.+/, /^\/cart/, /^\/checkout/, /^\/coaching/, /^\/ebooks/];

export function WhatsAppButton() {
  const path = usePathname();
  if (HIDE_ON.some((r) => r.test(path))) return null;
  // Number: [NEEDS CLIENT]. Until then this opens the contact page.
  return (
    <Link href="/contact" className="wa-float" aria-label="Chat with us on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg>
    </Link>
  );
}

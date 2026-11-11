// Line icons (24px grid, stroke = currentColor) and payment marks.
// Payment marks are simplified showcase versions; swap for the official
// artwork from each provider's brand kit when the real integrations go live.

type P = { size?: number; className?: string };
const base = (size = 22) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true,
});

export const BagIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
);
export const SearchIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const MenuIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const CloseIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const PlusIcon = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14" /></svg>
);
export const TrashIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
);
export const ArrowIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const LockIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>
);
export const PlayIcon = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className}><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" /></svg>
);
export const StarIcon = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className}><path fill="currentColor" d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z" /></svg>
);
export const CheckIcon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const TruckIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
export const ShieldIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3 5 6v6c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const ReturnIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="m8 5-4 4 4 4" /></svg>
);
export const BookIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" /></svg>
);
export const PlaneIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M10.5 13.5 3 11l1.5-1.5 8 1 4.5-4.5a2 2 0 0 1 3 3L15.5 13.5l1 8L15 23l-2.5-7.5" /></svg>
);
export const VideoIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></svg>
);
export const PhoneIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>
);
export const CardIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 9.5h19M6 15h4" /></svg>
);
export const HomeIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>
);
export const CapIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></svg>
);
export const SunIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const PinIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
export const ChatIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 5h16v11H9l-5 4V5Z" /></svg>
);
export const MailIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
);

/* ---------------- Payment marks ---------------- */

type M = { height?: number; className?: string };

export const VisaMark = ({ height = 22, className }: M) => (
  <svg viewBox="0 0 64 22" height={height} className={className} role="img" aria-label="Visa">
    <text x="32" y="18" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="21" letterSpacing="-0.5" fill="#1A1F71">VISA</text>
    <path d="M6 20.5h9" stroke="#F7B600" strokeWidth="2" />
  </svg>
);

export const MastercardMark = ({ height = 22, className }: M) => (
  <svg viewBox="0 0 36 22" height={height} className={className} role="img" aria-label="Mastercard">
    <circle cx="13" cy="11" r="10" fill="#EB001B" />
    <circle cx="23" cy="11" r="10" fill="#F79E1B" />
    <path d="M18 2.3a10 10 0 0 1 0 17.4 10 10 0 0 1 0-17.4Z" fill="#FF5F00" />
  </svg>
);

export const MpesaMark = ({ height = 22, className }: M) => (
  <svg viewBox="0 0 74 22" height={height} className={className} role="img" aria-label="M-Pesa">
    <rect width="74" height="22" rx="4" fill="#4CAF33" />
    <rect x="4" y="4" width="9" height="14" rx="2" fill="#fff" />
    <rect x="6" y="6.5" width="5" height="7" rx="0.6" fill="#4CAF33" />
    <text x="43" y="15.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11.5" fill="#fff">M-PESA</text>
  </svg>
);

export const AirtelMark = ({ height = 22, className }: M) => (
  <svg viewBox="0 0 74 22" height={height} className={className} role="img" aria-label="Airtel Money">
    <rect width="74" height="22" rx="4" fill="#E40000" />
    <path d="M11 5.5c3.6-.4 5.6 1.8 4.8 5-.7 2.9-3.8 5.6-7 5.9 1.9-1 3.7-3 3.8-5 .1-1.6-1.2-2.7-3.2-2.6l1.6-3.3Z" fill="#fff" />
    <text x="45" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#fff">airtel money</text>
  </svg>
);

export const OrangeMark = ({ height = 22, className }: M) => (
  <svg viewBox="0 0 74 22" height={height} className={className} role="img" aria-label="Orange Money">
    <rect width="74" height="22" rx="4" fill="#000" />
    <rect x="4" y="4" width="14" height="14" fill="#FF7900" />
    <rect x="6" y="13.5" width="10" height="2" fill="#fff" />
    <text x="46" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10.5" fill="#FF7900">orange money</text>
  </svg>
);

export const CardMarks = ({ height = 22 }: M) => (
  <span className="marks"><VisaMark height={height} /><MastercardMark height={height} /></span>
);
export const MobileMarks = ({ height = 22 }: M) => (
  <span className="marks"><MpesaMark height={height} /><AirtelMark height={height} /><OrangeMark height={height} /></span>
);

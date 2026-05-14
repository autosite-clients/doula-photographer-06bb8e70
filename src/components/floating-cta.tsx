interface FloatingCtaProps {
  whatsappNumber?: string;
  phone?: string;
  themeColor: string;
}

/**
 * Floating WhatsApp CTA — bottom-left (RTL convention) with continuous pulse
 * animation that draws the eye without being annoying. The pulse uses CSS
 * `whatsapp-pulse` keyframes from globals.css and respects reduced-motion.
 *
 * Color: WhatsApp green by convention, NOT theme color — users recognize the
 * green = WhatsApp without thinking. This is one of the rare cases where
 * brand consistency beats site theming.
 */
export function FloatingCta({ whatsappNumber, phone }: FloatingCtaProps) {
  const num = whatsappNumber || phone;
  if (!num) return null;
  const digits = num.replace(/\D/g, '');
  if (!digits) return null;
  const normalized = digits.startsWith('0') ? `972${digits.slice(1)}` : digits;
  const url = `https://wa.me/${normalized}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="שליחת הודעה בווטסאפ"
      className="whatsapp-pulse group fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
    >
      {/* Tooltip on hover (desktop only) */}
      <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
        ✨ שלחי הודעה
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 sm:h-8 sm:w-8"
      >
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zm-7.01 15.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.41a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.65.8-.79.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.39 1 2.55c.12.16 1.74 2.66 4.21 3.73 1.47.63 2.04.69 2.78.58.45-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.18-.48-.3z" />
      </svg>
    </a>
  );
}

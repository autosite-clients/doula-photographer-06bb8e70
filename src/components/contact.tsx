import type { SketchContent } from '../types';

interface ContactProps {
  contact: SketchContent['contact'];
  businessName: string;
  themeColor: string;
}

/**
 * Contact — premium variant.
 *
 * Layout: split on desktop (left = info card, right = map), stacked on mobile.
 * - Big WhatsApp CTA at top (the primary action for Israeli SMBs)
 * - Info card with subtle icons next to each row (phone/mail/clock/pin)
 * - Map at desktop right side, full-width on mobile (always visible)
 * - Footer with copyright + tiny "powered by AutoSite" attribution
 */
export function Contact({ contact, businessName, themeColor }: ContactProps) {
  const whatsappUrl = whatsappLink(contact);
  const hasMap = Boolean(contact.mapEmbed);

  return (
    <section id="contact" className="bg-gradient-to-b from-rose-50/40 to-rose-100/40 pb-24 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            יצירת קשר
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            בואו נדבר
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-rose-800/80 sm:text-lg">
            הדרך הטובה ביותר ליצור קשר היא בווטסאפ — אענה אישית בתוך כמה שעות.
          </p>

          {whatsappUrl && (
            <div className="mt-8 sm:mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-9 py-4 text-base font-medium text-white shadow-2xl transition hover:scale-[1.02] sm:px-12 sm:py-5 sm:text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zm-7.01 15.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.41a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24z" />
                </svg>
                שליחת הודעה בווטסאפ
              </a>
            </div>
          )}
        </div>

        {/* Split: info card + map */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
          {/* Info card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-rose-100 sm:p-8">
            <h3 className="font-serif text-xl text-rose-900 sm:text-2xl">פרטי קשר</h3>
            <dl className="mt-5 space-y-4 text-base text-rose-800 sm:mt-6 sm:text-lg">
              {contact.phone && (
                <Row label="טלפון" icon="phone">
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-rose-700 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </Row>
              )}
              {contact.email && (
                <Row label="אימייל" icon="mail">
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-rose-700 hover:underline"
                  >
                    {contact.email}
                  </a>
                </Row>
              )}
              {contact.address && (
                <Row label="אזור" icon="pin">
                  {contact.address}
                </Row>
              )}
              {contact.workingHours && (
                <Row label="שעות" icon="clock">
                  {contact.workingHours}
                </Row>
              )}
              {contact.instagramHandle && (
                <Row label="אינסטגרם" icon="ig">
                  <a
                    href={`https://instagram.com/${contact.instagramHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-rose-700 hover:underline"
                  >
                    @{contact.instagramHandle}
                  </a>
                </Row>
              )}
            </dl>
          </div>

          {/* Map (or graphic placeholder if no map) */}
          {hasMap && contact.mapEmbed && (
            <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-rose-100">
              <iframe
                src={contact.mapEmbed}
                title="מיקום על המפה"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full border-0 sm:h-full sm:min-h-[20rem]"
                allowFullScreen
              />
            </div>
          )}
          {!hasMap && (
            <div
              className="flex items-center justify-center rounded-2xl ring-1 ring-rose-100 sm:min-h-[20rem]"
              style={{
                background: `linear-gradient(135deg, ${themeColor}10, ${themeColor}25)`,
              }}
            >
              <p className="px-8 text-center font-serif text-lg leading-relaxed text-rose-900/70 sm:text-xl">
                שירות זמין לכל הארץ
              </p>
            </div>
          )}
        </div>

        <p className="mt-16 text-center text-sm text-rose-500">
          © {new Date().getFullYear()} {businessName}
        </p>
      </div>
    </section>
  );
}

function whatsappLink(contact: SketchContent['contact']): string | null {
  const num = contact.whatsappNumber || contact.phone;
  if (!num) return null;
  const digits = num.replace(/\D/g, '');
  if (!digits) return null;
  const normalized = digits.startsWith('0') ? `972${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

function Row({
  label,
  icon,
  children,
}: {
  label: string;
  icon: 'phone' | 'mail' | 'pin' | 'clock' | 'ig';
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <Icon kind={icon} />
      </span>
      <div className="flex-1 text-right">
        <dt className="text-xs uppercase tracking-wide text-rose-500">{label}</dt>
        <dd className="mt-0.5 text-base text-rose-900">{children}</dd>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: 'phone' | 'mail' | 'pin' | 'clock' | 'ig' }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-5 w-5',
    'aria-hidden': true,
  };
  switch (kind) {
    case 'phone':
      return (
        <svg {...props}>
          <path d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.5 2A2 2 0 018.94 9l-1.45.726a11.045 11.045 0 005.784 5.784l.726-1.45a2 2 0 012.485-.797l2 .5A2 2 0 0119 15.72V18a2 2 0 01-2 2A14 14 0 013 5z" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...props}>
          <path d="M3 8l9 6 9-6m-18 0V6a2 2 0 012-2h14a2 2 0 012 2v2m-18 0v10a2 2 0 002 2h14a2 2 0 002-2V8" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...props}>
          <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case 'ig':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
  }
}

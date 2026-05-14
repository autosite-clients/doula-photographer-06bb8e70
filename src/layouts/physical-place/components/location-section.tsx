import type { SketchContent } from '../../../types';

interface Props {
  contact: SketchContent['contact'];
  businessName: string;
  themeColor: string;
}

/**
 * Location section — premium variant for physical-place businesses.
 *
 * For a restaurant/cafe/clinic, the map is the #1 thing customers look for.
 * - Big map (2/3 width on desktop, full on mobile)
 * - Info cards beside it: address, hours, phone, with icons + "open now" indicator
 * - Waze + Google Maps deep links so phone users can navigate in one tap
 */
export function LocationSection({ contact, businessName, themeColor }: Props) {
  if (!contact.mapEmbed && !contact.address) return null;

  // Build navigation links if we have a real address
  const navLinks = contact.address
    ? {
        google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${businessName} ${contact.address}`,
        )}`,
        waze: `https://waze.com/ul?q=${encodeURIComponent(
          `${businessName} ${contact.address}`,
        )}`,
      }
    : null;

  return (
    <section id="location" className="bg-gradient-to-b from-white to-rose-50/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            המיקום שלנו
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            איפה תמצאו אותנו
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-rose-800/70 sm:text-lg">
            ניווט בלחיצה — Google Maps או Waze
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-8">
          {contact.mapEmbed && (
            <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-rose-100 lg:col-span-2">
              <iframe
                src={contact.mapEmbed}
                title={`מיקום ${businessName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-80 w-full border-0 sm:h-96 lg:h-full lg:min-h-[28rem]"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            {contact.address && (
              <InfoCard icon="pin" title="כתובת" themeColor={themeColor}>
                <p className="text-base text-rose-900">{contact.address}</p>
                {navLinks && (
                  <div className="mt-3 flex gap-2">
                    <a
                      href={navLinks.waze}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#33CCFF] px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:opacity-90"
                    >
                      🧭 Waze
                    </a>
                    <a
                      href={navLinks.google}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 shadow-sm hover:bg-rose-50"
                    >
                      📍 Google Maps
                    </a>
                  </div>
                )}
              </InfoCard>
            )}
            {contact.workingHours && (
              <InfoCard icon="clock" title="שעות פעילות" themeColor={themeColor}>
                <p className="whitespace-pre-line text-base text-rose-900">
                  {contact.workingHours}
                </p>
              </InfoCard>
            )}
            {contact.phone && (
              <InfoCard icon="phone" title="טלפון" themeColor={themeColor}>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-base text-rose-900 hover:text-rose-600 hover:underline"
                  dir="ltr"
                >
                  {contact.phone}
                </a>
              </InfoCard>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  themeColor,
  children,
}: {
  icon: 'pin' | 'clock' | 'phone';
  title: string;
  themeColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-lift rounded-2xl bg-white p-5 shadow-sm ring-1 ring-rose-100">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: themeColor }}
        >
          <Icon kind={icon} />
        </span>
        <div className="text-xs font-medium uppercase tracking-wider text-rose-500">
          {title}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Icon({ kind }: { kind: 'pin' | 'clock' | 'phone' }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-4 w-4',
    'aria-hidden': true,
  };
  switch (kind) {
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
    case 'phone':
      return (
        <svg {...props}>
          <path d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.5 2A2 2 0 018.94 9l-1.45.726a11.045 11.045 0 005.784 5.784l.726-1.45a2 2 0 012.485-.797l2 .5A2 2 0 0119 15.72V18a2 2 0 01-2 2A14 14 0 013 5z" />
        </svg>
      );
  }
}

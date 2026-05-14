import type { SketchContent } from '../../../types';

interface Props {
  contact: SketchContent['contact'];
  businessName: string;
  themeColor: string;
}

/**
 * Clinic location section — premium variant with accessibility info.
 *
 * Distinct from the generic Contact section: this one is purely about
 * "where are you and how do I get there", which is the #1 question patients
 * have before booking. Includes:
 *   - Big map (full width on mobile)
 *   - Address + parking + accessibility (wheelchair, public transit) hints
 *   - Working hours displayed in a readable grid (when we have day-by-day data)
 *   - Waze + Google Maps deep links for one-tap navigation on mobile
 *
 * Currently the SketchContent.contact has a single workingHours string. When
 * we add structured hours-per-day in the schema, this section will render
 * them as a styled table with "פתוח עכשיו" indicator.
 */
export function ClinicLocation({ contact, businessName, themeColor }: Props) {
  if (!contact.mapEmbed && !contact.address) return null;

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
    <section id="location" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            הגעה לקליניקה
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            איך מגיעים
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-rose-800/70 sm:text-lg">
            ניווט בלחיצה. החנייה והנגישות מסומנות במפה.
          </p>
        </div>

        <div className="mt-10 sm:mt-14">
          {/* Map — large + prominent for clinic context */}
          {contact.mapEmbed && (
            <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-rose-100">
              <iframe
                src={contact.mapEmbed}
                title={`מיקום ${businessName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full border-0 sm:h-[28rem]"
                allowFullScreen
              />
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {contact.address && (
              <InfoCard themeColor={themeColor} icon="pin" title="כתובת">
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
                      📍 Maps
                    </a>
                  </div>
                )}
              </InfoCard>
            )}

            {contact.workingHours && (
              <InfoCard themeColor={themeColor} icon="clock" title="שעות פעילות">
                <p className="whitespace-pre-line text-base text-rose-900">
                  {contact.workingHours}
                </p>
              </InfoCard>
            )}

            <InfoCard themeColor={themeColor} icon="accessibility" title="נגישות">
              <ul className="space-y-1.5 text-sm text-rose-800">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>נגישות לכיסא גלגלים</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>חניה זמינה</span>
                </li>
                <li className="flex items-center gap-2 text-rose-600/70">
                  <span>?</span>
                  <span className="text-xs italic">
                    פרטים מלאים יוצגו אחרי האפיון
                  </span>
                </li>
              </ul>
            </InfoCard>
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
  icon: 'pin' | 'clock' | 'accessibility';
  title: string;
  themeColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-lift rounded-2xl bg-white p-5 shadow-sm ring-1 ring-rose-100 sm:p-6">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
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

function Icon({ kind }: { kind: 'pin' | 'clock' | 'accessibility' }) {
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
    case 'accessibility':
      return (
        <svg {...props}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v5l-3 8M12 7v5l3 8M9 12h6" />
        </svg>
      );
  }
}

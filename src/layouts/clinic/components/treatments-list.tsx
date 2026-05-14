import type { SketchContent } from '../../../types';

interface Props {
  items: SketchContent['services'];
  themeColor: string;
}

/**
 * Treatments list — clinic services rendered as a clean medical-style list.
 *
 * Differs from doula's process-cards (numbered stages) and physical-place's
 * editorial menu:
 *   - Two-column compact list, scannable
 *   - Each treatment has a small icon badge (varies across treatments)
 *   - Hover reveals "לקביעת תור" CTA per treatment
 *   - Uses calming, professional spacing — not editorial-flowery
 *
 * Customers of clinics scan for THEIR specific need ("רוצה לשפר את החיוך"
 * → looks for "ציפויים" / "השתלות"). So scannability > storytelling.
 */
export function TreatmentsList({ items, themeColor }: Props) {
  if (items.length === 0) return null;

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            הטיפולים שלנו
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            מה אנחנו מציעים
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            כל הטיפולים מבוצעים על ידי צוות מוסמך עם עדכון מקצועי שוטף.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="group relative rounded-xl bg-white p-5 ring-1 ring-rose-100 transition hover:ring-2 hover:shadow-md sm:p-6"
              style={
                {
                  ['--theme-color' as string]: themeColor,
                } as React.CSSProperties
              }
            >
              <div className="flex items-start gap-4">
                {/* Treatment icon — chosen by index modulo so it varies across the list */}
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm sm:h-12 sm:w-12"
                  style={{ backgroundColor: themeColor }}
                >
                  <TreatmentIcon index={i} />
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-medium text-rose-900 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-rose-800/80 sm:text-base">
                    {item.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-rose-700 opacity-0 transition group-hover:opacity-100 sm:text-sm"
                  >
                    לקביעת תור
                    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 010 1.06L8.06 11l4.73 4.71a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Cycle through 6 simple medical/wellness icons. Pure decoration — visually
 * differentiates rows without claiming they have specific meanings.
 */
function TreatmentIcon({ index }: { index: number }) {
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
  switch (index % 6) {
    case 0:
      return (
        <svg {...props}>
          <path d="M12 2v20M2 12h20" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case 3:
      return (
        <svg {...props}>
          <path d="M3 12l5 5L21 4" />
        </svg>
      );
    case 4:
      return (
        <svg {...props}>
          <path d="M12 8v8M8 12h8" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 10v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m10 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
        </svg>
      );
  }
}

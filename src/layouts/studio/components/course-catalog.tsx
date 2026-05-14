import type { SketchContent } from '../../../types';

interface Props {
  services: SketchContent['services'];
  themeColor: string;
}

/**
 * Course catalog — studio's services rendered as course cards.
 *
 * Differs from doula's process (numbered stages) and fitness's plans
 * (popularity badge): studios have multiple PARALLEL offerings, all equal.
 *   - Equal-weight cards (no "popular" highlight)
 *   - Each card has level indicator chip ("מתחילים", "מתקדמים")
 *   - Color-coded category strip (different gradient per card index)
 *   - "להרשמה" CTA on each
 */
export function CourseCatalog({ services, themeColor }: Props) {
  if (services.length === 0) return null;

  // Cycle through 3 level chips so the catalog feels organized even before
  // we have real level metadata in SketchContent
  const levelChips = ['פתוח לכולם', 'מתחילים', 'מתקדמים'];

  return (
    <section id="services" className="bg-rose-50/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            הקטלוג שלנו
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            הקורסים והסדנאות
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            כל קורס מתאים לרמה אחרת. בחרו את שלכם והצטרפו.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {services.map((service, i) => {
            const level = levelChips[i % levelChips.length];
            // Each card gets a distinct gradient strip — gives the catalog
            // a sense of variety while staying within the brand palette
            const gradientHues = [
              'from-rose-200 via-rose-100 to-amber-100',
              'from-amber-100 via-rose-100 to-rose-200',
              'from-rose-100 via-amber-50 to-rose-100',
            ];
            const gradient = gradientHues[i % gradientHues.length];
            return (
              <li
                key={service.title}
                className="card-lift group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-rose-100"
              >
                <div className={`h-2 bg-gradient-to-l ${gradient}`} />
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${themeColor}15`,
                        color: themeColor,
                      }}
                    >
                      {level}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-rose-300 transition group-hover:scale-110 group-hover:text-rose-500"
                    >
                      <path d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-medium text-rose-900 sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 line-clamp-4 text-base leading-relaxed text-rose-800/85">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: themeColor }}
                  >
                    להרשמה
                    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 010 1.06L8.06 11l4.73 4.71a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import type { SketchContent } from '../../../types';

interface Props {
  services: SketchContent['services'];
  themeColor: string;
}

/**
 * Training plans — fitness-trainer's services rendered as program cards.
 *
 * Differs from doula's "Services" because:
 *   - Cards have a "popular" badge on the middle option (psychology: anchor)
 *   - Each card has a "התחל" CTA per plan, not just one global
 *   - Visual hierarchy: middle card is slightly raised, larger
 *   - Brand color border on the popular card to draw the eye
 *
 * NOTE: until we add real pricing fields to SketchContent.services (future
 * schema work), the cards show description only. The structure is ready for
 * pricing the moment we add it.
 */
export function TrainingPlans({ services, themeColor }: Props) {
  if (services.length === 0) return null;
  // Popular = the middle one. If only 2 services, the second is highlighted.
  const popularIndex = services.length >= 3 ? Math.floor(services.length / 2) : services.length - 1;

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            תוכניות אימון
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            בחרי את הקצב שלך
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            כל תוכנית מותאמת לרמה, לזמן הפנוי, וליעדים שלך.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-7 md:grid-cols-3">
          {services.map((service, i) => {
            const isPopular = i === popularIndex;
            return (
              <li
                key={service.title}
                className={[
                  'card-lift relative flex flex-col rounded-2xl p-7 shadow-sm sm:p-8',
                  isPopular
                    ? 'bg-rose-900 text-white sm:scale-105'
                    : 'bg-white text-rose-900 ring-1 ring-rose-100',
                ].join(' ')}
                // Apply themeColor border via inline style — Tailwind's `ring`
                // utility doesn't accept dynamic colors, so we paint a regular
                // border that matches the brand.
                style={
                  isPopular
                    ? { boxShadow: `0 0 0 3px ${themeColor}, 0 20px 40px -12px rgba(0,0,0,0.18)` }
                    : undefined
                }
              >
                {isPopular && (
                  <span
                    className="absolute -top-3 right-1/2 translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg"
                    style={{ backgroundColor: themeColor }}
                  >
                    ⭐ פופולרי
                  </span>
                )}

                <h3
                  className={[
                    'font-serif text-2xl font-medium sm:text-3xl',
                    isPopular ? 'text-white' : 'text-rose-900',
                  ].join(' ')}
                >
                  {service.title}
                </h3>

                <p
                  className={[
                    'mt-4 flex-1 text-base leading-relaxed',
                    isPopular ? 'text-white/90' : 'text-rose-800/85',
                  ].join(' ')}
                >
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className={[
                    'mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition hover:scale-[1.02]',
                    isPopular
                      ? 'bg-white text-rose-900 shadow-lg hover:shadow-xl'
                      : 'border border-rose-300 text-rose-900 hover:bg-rose-50',
                  ].join(' ')}
                >
                  התחילי עכשיו
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 010 1.06L8.06 11l4.73 4.71a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-rose-700/70">
          לא בטוחה איזו תוכנית מתאימה לך?{' '}
          <a href="#contact" className="font-medium text-rose-700 underline hover:text-rose-900">
            כתבי לי בווטסאפ
          </a>
          {' '}ונדבר.
        </p>
      </div>
    </section>
  );
}

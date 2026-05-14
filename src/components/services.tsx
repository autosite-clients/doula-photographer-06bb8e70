import type { SketchContent } from '../types';

interface ServicesProps {
  items: SketchContent['services'];
  themeColor: string;
}

/**
 * Services — premium cards.
 *
 * - Numbered (01/02/03) — gives a "process" feel that doulas/photographers
 *   often want to communicate (you go through stages with them).
 * - Subtle hover lift (`card-lift` from globals)
 * - Icon strip in brand color at the top of each card, gradient fade
 * - The number itself is a large decorative serif for editorial feel
 */
export function Services({ items, themeColor }: ServicesProps) {
  if (items.length === 0) return null;

  return (
    <section id="services" className="bg-rose-50/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            השירותים שלי
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            איך זה עובד
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-rose-800/70 sm:text-lg">
            כל מסע נראה אחר. הנה איך אני מלווה אותך לאורכו.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {items.map((item, i) => {
            const number = String(i + 1).padStart(2, '0');
            return (
              <li
                key={item.title}
                className="card-lift relative flex flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-rose-100 sm:p-8"
              >
                {/* Brand-colored gradient strip at top */}
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${themeColor}, ${themeColor}80, ${themeColor}40)`,
                  }}
                />

                {/* Big decorative number */}
                <span
                  className="mb-4 font-serif text-5xl leading-none opacity-30"
                  style={{ color: themeColor }}
                  aria-hidden
                >
                  {number}
                </span>

                <h3 className="font-serif text-xl font-medium text-rose-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-rose-800/85">
                  {item.description}
                </p>

                {/* Hint of expandability — chevron on the right */}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-rose-700">
                  <span>קראי עוד</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 010 1.06L8.06 11l4.73 4.71a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import type { SketchContent } from '../../../types';

interface Props {
  services: SketchContent['services'];
  themeColor: string;
}

/**
 * Photography packages — services rendered as visual photo-backed cards.
 *
 * Each package = "session type" (engagement / wedding / family / newborn).
 * Different from fitness "popular" highlighting because in photography,
 * customers self-select by life event, not by intensity.
 *
 * Cards have a subtle gradient overlay tinted with the brand color,
 * giving them a unified look while still feeling photographic.
 */
export function PackagesGrid({ services, themeColor }: Props) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            חבילות צילום
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            לאיזה רגע נצלם?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            כל חבילה כוללת ייעוץ, צילום, ותיעוד מלא לאחר העריכה.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, i) => {
            const number = String(i + 1).padStart(2, '0');
            return (
              <li
                key={service.title}
                className="card-lift group relative flex flex-col overflow-hidden rounded-2xl shadow-md ring-1 ring-rose-100"
              >
                {/* Top color band */}
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, ${themeColor}, ${themeColor}80)`,
                  }}
                />
                <div className="flex flex-1 flex-col bg-white p-7 sm:p-8">
                  <div className="flex items-baseline justify-between">
                    <span
                      className="font-serif text-3xl font-bold opacity-25"
                      style={{ color: themeColor }}
                    >
                      {number}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-rose-300 transition group-hover:rotate-6"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-medium text-rose-900 sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-rose-800/85">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-base font-medium text-rose-800 hover:text-rose-600"
                    style={{ color: themeColor }}
                  >
                    לשריון תאריך
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

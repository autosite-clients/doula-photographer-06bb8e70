import type { SketchContent } from '../../../types';

interface Props {
  items: SketchContent['services'];
  themeColor: string;
}

/**
 * Menu/Offerings section — premium editorial layout for physical-place
 * businesses (restaurant, cafe, salon, clinic).
 *
 * Why "editorial menu" not feature cards:
 *   - Restaurants/cafes naturally read top-to-bottom on a menu, not left-to-right
 *   - Dotted leader between title and description = classic menu typography
 *   - Each row has subtle hover background (invitation to read)
 *   - No prices column (we don't have prices in sketch yet) — but the layout
 *     reserves space for it cleanly when we add it later
 */
export function MenuSection({ items, themeColor }: Props) {
  if (items.length === 0) return null;

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            מה אצלנו
          </p>
          <span
            className="mx-auto mt-4 block h-px w-20"
            style={{ backgroundColor: themeColor, opacity: 0.5 }}
          />
          <h2 className="mt-4 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            התפריט
          </h2>
          <span
            className="mx-auto mt-4 block h-px w-20"
            style={{ backgroundColor: themeColor, opacity: 0.5 }}
          />
        </div>

        <ul className="mt-12 sm:mt-16">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="group relative -mx-4 rounded-lg px-4 py-6 transition hover:bg-rose-50/40 sm:-mx-6 sm:px-6 sm:py-7"
            >
              {/* Subtle separator line - last item has no border */}
              {i < items.length - 1 && (
                <span
                  className="absolute inset-x-4 bottom-0 h-px bg-rose-100 sm:inset-x-6"
                  aria-hidden
                />
              )}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="shrink-0 font-serif text-xl text-rose-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="flex-1 text-base leading-relaxed text-rose-800/80 sm:text-right sm:text-lg">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Decorative footer ornament */}
        <div className="mt-12 flex items-center justify-center gap-3 text-rose-400">
          <span className="h-px w-12 bg-rose-300" />
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
          <span className="h-px w-12 bg-rose-300" />
        </div>
      </div>
    </section>
  );
}

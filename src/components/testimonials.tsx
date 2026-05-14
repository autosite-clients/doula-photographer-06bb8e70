interface TestimonialsProps {
  items: Array<{ name: string; quote: string }>;
}

/**
 * Testimonials — premium "Wall of Love" variant.
 *
 * - Mobile: vertical stack (single column) with subtle stagger
 * - Desktop: 3-column masonry-feel using CSS columns (browser balances heights)
 * - Cards have varying soft tints (3 alternating colors) so the wall doesn't
 *   look monotonous, gentle hover lift
 * - Quote mark is decorative typography, not an icon — feels more editorial
 */
export function Testimonials({ items }: TestimonialsProps) {
  if (items.length === 0) return null;

  // 3 alternating soft-tint variations (rose / amber / cream) — feels organic
  const tints = [
    'bg-white ring-rose-100',
    'bg-rose-50/70 ring-rose-200',
    'bg-amber-50/50 ring-amber-100',
  ];

  return (
    <section id="testimonials" className="bg-gradient-to-b from-rose-50/40 via-white to-rose-50/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            ממליצות
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            המילים שלהן
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            לא ציטוטים שיווקיים — מה שאמרו לי ב-WhatsApp, באינסטגרם, בגוגל.
          </p>
        </div>

        {/* Wall of love: CSS columns balance heights automatically. break-inside avoids splits. */}
        <div className="mt-10 sm:columns-2 lg:columns-3 sm:gap-6 sm:mt-14">
          {items.map((item, i) => {
            const tint = tints[i % tints.length];
            // Subtle staggered fade-in for the first few; further down items don't animate (perceived perf)
            const animClass = i < 6 ? `animate-fade-in-up delay-${(i % 4) * 100}` : '';
            return (
              <figure
                key={`${item.name}-${i}`}
                className={[
                  'mb-4 break-inside-avoid rounded-2xl p-6 shadow-sm ring-1 transition hover:shadow-md sm:mb-6 sm:p-7',
                  tint,
                  animClass,
                ].join(' ')}
              >
                {/* Decorative typographic quote mark — not an icon */}
                <span
                  aria-hidden
                  className="block font-serif text-5xl leading-none text-rose-300"
                  style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
                >
                  &rdquo;
                </span>
                <blockquote className="mt-2 whitespace-pre-line font-serif text-base leading-relaxed text-rose-900 sm:text-lg">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-end gap-2 text-sm">
                  <span className="font-medium text-rose-700">{item.name}</span>
                  <span className="h-px w-6 bg-rose-300" aria-hidden />
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

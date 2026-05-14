interface Props {
  themeColor: string;
  testimonialCount: number;
  galleryCount: number;
}

/**
 * Stats strip below the hero — social proof at a glance.
 *
 * For fitness clients, the question is "does this work?". A row of big numbers
 * (clients trained, transformations, years experience) answers that in 4
 * seconds before they scroll further.
 *
 * The numbers come from REAL data we have:
 *   - testimonialCount → "לקוחות מרוצים"
 *   - galleryCount → "תמונות מאימונים אמיתיים"
 *   - These are honest counts, not inflated marketing numbers.
 */
export function ResultsBanner({ themeColor, testimonialCount, galleryCount }: Props) {
  // Don't render if we have no real numbers to show
  if (testimonialCount === 0 && galleryCount === 0) return null;

  const stats: Array<{ value: string; label: string }> = [];
  if (testimonialCount > 0) {
    stats.push({
      value: `+${testimonialCount}`,
      label: 'לקוחות שאהבו את התהליך',
    });
  }
  if (galleryCount > 0) {
    stats.push({
      value: `+${galleryCount}`,
      label: 'תיעוד אימונים אמיתיים',
    });
  }
  // Always include a "personal attention" qualitative stat for fitness
  stats.push({
    value: '1:1',
    label: 'תוכנית מותאמת אישית',
  });

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
      }}
    >
      {/* Decorative diagonal stripes for visual texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0, transparent 10px, white 10px, white 11px)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <ul className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
          {stats.map((s, i) => (
            <li
              key={i}
              className={[
                'animate-fade-in-up',
                i === 0 ? 'delay-100' : i === 1 ? 'delay-200' : 'delay-300',
              ].join(' ')}
            >
              <div className="font-serif text-4xl font-bold leading-none sm:text-5xl md:text-6xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-wider text-white/85 sm:text-base">
                {s.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

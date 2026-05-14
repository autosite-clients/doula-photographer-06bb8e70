import type { SketchPhoto } from '../../../types';

interface Props {
  images: SketchPhoto[];
  themeColor: string;
}

/**
 * Portfolio grid for photographers — visual-first, generous spacing.
 *
 * Differs from doula's gallery:
 *   - Larger images (per row 2 on desktop, not 3) — the work needs space
 *   - Mixed aspect ratios — tall portrait + wide landscape mix breaks rhythm
 *   - Each image has caption space below for photo title + date metadata
 *   - "View all work" CTA at bottom (when there are more than ~12 images)
 *
 * For a photographer, the gallery IS the value proposition. We treat it like
 * a real portfolio site (think Squarespace/Format), not a thumb strip.
 */
export function PortfolioGrid({ images, themeColor }: Props) {
  if (images.length === 0) return null;

  return (
    <section id="gallery" className="bg-rose-50/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            הפורטפוליו
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            העבודות שלי
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            כל תמונה — הזמנה לרגע אחר. אפשר לדפדף, להתאהב, ולכתוב לי.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {images.slice(0, 12).map((image, i) => {
            // Mix aspect ratios for visual rhythm
            const aspect = i % 4 === 0 ? 'aspect-[4/5]' : i % 4 === 1 ? 'aspect-[3/2]' : i % 4 === 2 ? 'aspect-[5/4]' : 'aspect-[2/3]';
            return (
              <figure
                key={`${image.src}-${i}`}
                className="group zoom-on-hover relative overflow-hidden rounded-xl shadow-md ring-1 ring-rose-100 card-lift"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                  className={['w-full object-cover', aspect].join(' ')}
                />
                {/* Caption strip on hover */}
                {image.alt && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-right text-base text-white opacity-0 transition group-hover:opacity-100">
                    {image.alt}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>

        {images.length > 12 && (
          <div className="mt-10 text-center sm:mt-14">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-medium text-white shadow-lg transition hover:scale-[1.02] sm:px-9 sm:py-3.5 sm:text-lg"
              style={{ backgroundColor: themeColor }}
            >
              עוד {images.length - 12}+ עבודות במייל
              <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 010 1.06L8.06 11l4.73 4.71a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

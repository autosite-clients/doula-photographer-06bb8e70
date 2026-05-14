import type { SketchPhoto } from '../types';

interface GalleryProps {
  images: SketchPhoto[];
}

/**
 * Gallery — premium variant with mosaic layout (1st image hero-wide on desktop),
 * zoom-on-hover, and overlay caption on hover.
 *
 * Layout strategy: a 12-column grid where the first image spans 2 cells (creates
 * a "feature image" feel without true masonry JS overhead). Mobile = 2 columns.
 */
export function Gallery({ images }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <section id="gallery" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            רגעים אמיתיים
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            גלריה
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            כל תמונה — סיפור. מציאות, לא בימוי.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 md:mt-14 md:grid-cols-12">
          {images.map((image, i) => {
            // First image: spans 2 grid cells horizontally on desktop = "hero" feel
            // Every 5th image: also spans 2 cells = breaks rhythm, keeps visual interest
            const isFeature = i === 0 || (i > 0 && i % 5 === 0);
            const desktopSpan = isFeature ? 'md:col-span-6' : 'md:col-span-3';
            const aspect = isFeature ? 'md:aspect-[16/10]' : 'md:aspect-[4/5]';

            return (
              <figure
                key={`${image.src}-${i}`}
                className={[
                  'group zoom-on-hover relative overflow-hidden rounded-lg ring-1 ring-rose-100 card-lift sm:rounded-xl',
                  desktopSpan,
                ].join(' ')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={['aspect-square w-full object-cover', aspect].join(' ')}
                />
                {/* Overlay caption on hover (desktop only — mobile too cluttered) */}
                {image.alt && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/70 to-transparent p-4 text-right text-sm text-white opacity-0 transition group-hover:opacity-100 md:block">
                    {image.alt}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>

        {images.length > 9 && (
          <p className="mt-6 text-center text-sm text-rose-700/70">
            עוד {images.length - 9} תמונות — תוכלי לראות עוד אחרי שניצור קשר
          </p>
        )}
      </div>
    </section>
  );
}

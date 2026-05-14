import type { SketchContent } from '../types';

interface AboutProps {
  about: SketchContent['about'];
}

/**
 * About — premium variant.
 *
 * - Side-by-side image + text on desktop, stacked on mobile (image first
 *   on mobile so the user sees a face right after hero)
 * - Image has rounded shape with subtle inner ring + soft shadow
 * - Decorative quote-style opening if first paragraph is short
 * - First paragraph slightly larger ("lede") — a magazine convention that
 *   signals "this is the heart of the about"
 */
export function About({ about }: AboutProps) {
  const paras = about.body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (about.image) {
    return (
      <section id="about" className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:gap-20">
          <div className="order-2 text-right md:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
              עליי
            </p>
            <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
              {about.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-rose-800/90 sm:mt-8 sm:text-lg">
              {paras.map((p, i) => (
                <p
                  key={i}
                  // First paragraph as lede: slightly larger, slightly bolder
                  className={i === 0 ? 'text-[1.05em] font-medium text-rose-900' : ''}
                >
                  {p}
                </p>
              ))}
            </div>
            {/* Subtle signature line */}
            <div className="mt-8 flex items-center justify-end gap-3">
              <span className="h-px w-12 bg-rose-300" aria-hidden />
              <span className="font-serif text-sm italic text-rose-600">
                {/* If we want a name signature later — placeholder for now */}
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="group relative overflow-hidden rounded-2xl ring-1 ring-rose-100 sm:rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.image.src}
                alt={about.image.alt}
                referrerPolicy="no-referrer"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-96 md:h-[32rem]"
              />
              {/* Soft inner shadow at bottom for depth */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-900/10 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No image variant — centered editorial layout
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
          עליי
        </p>
        <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
          {about.title}
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-rose-800/90 sm:mt-8 sm:text-lg">
          {paras.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? 'text-[1.05em] font-medium text-rose-900' : ''}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

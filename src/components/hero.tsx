import type { SketchBranding, SketchContent } from '../types';
import { TrustBar } from './trust-bar';

interface HeroProps {
  hero: SketchContent['hero'];
  branding: SketchBranding;
  /** Optional trust signals (Google rating, follower counts) */
  trust?: SketchContent['trust'];
}

/**
 * Hero — premium variant.
 * Adds:
 *   - Ken Burns subtle zoom on the image (22s loop)
 *   - Staggered fade-in-up animations on text
 *   - Scroll-down indicator bobbing at the bottom
 *   - Honors prefers-reduced-motion (CSS handles it)
 */
export function Hero({ hero, branding, trust }: HeroProps) {
  if (hero.image) {
    return (
      <section
        id="top"
        className="relative isolate min-h-[88svh] overflow-hidden bg-rose-900 sm:min-h-[78vh]"
      >
        {/* Image with subtle Ken Burns zoom */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover animate-ken-burns"
          />
        </div>

        {/* Layered gradients — bottom-up for text legibility, side gradient for RTL anchor */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/55 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col items-end justify-end px-4 pt-24 pb-20 text-right text-white sm:min-h-[78vh] sm:px-6 sm:pt-36 sm:pb-32">
          {branding.tagline && (
            <p className="animate-fade-in-up mb-3 text-[11px] uppercase tracking-[0.3em] text-rose-100/90 sm:text-sm sm:tracking-[0.35em]">
              {branding.tagline}
            </p>
          )}
          <h1 className="animate-fade-in-up delay-100 font-serif text-4xl leading-[1.05] drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="animate-fade-in-up delay-200 mt-5 max-w-2xl text-base leading-relaxed text-white/95 sm:mt-7 sm:text-xl">
            {hero.subheadline}
          </p>
          <div className="animate-fade-in-up delay-300 mt-7 flex flex-wrap items-center justify-end gap-3 sm:mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-medium text-white shadow-2xl ring-1 ring-white/20 transition hover:scale-[1.02] hover:shadow-rose-500/40 active:scale-[0.98] sm:px-10 sm:py-4 sm:text-lg"
              style={{ backgroundColor: branding.themeColor }}
            >
              {hero.ctaText}
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
            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-base font-medium text-white/95 backdrop-blur-sm transition hover:bg-white/10 sm:px-8 sm:text-lg"
            >
              גלי עוד
            </a>
          </div>
          {trust && (
            <div className="animate-fade-in-up delay-400 mt-6 sm:mt-8">
              <TrustBar
                trust={trust}
                themeColor={branding.themeColor}
                tone="on-image"
                align="end"
              />
            </div>
          )}
        </div>

        {/* Scroll indicator — subtle bobbing arrow at bottom */}
        <a
          href="#about"
          aria-label="גלילה למטה"
          className="animate-scroll-bob absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 sm:block"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>
    );
  }

  // Fallback: no hero image — gradient background
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-bl from-rose-100 via-rose-50 to-white"
    >
      <div className="mx-auto max-w-4xl px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-32 sm:pb-36">
        {branding.tagline && (
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.25em] text-rose-600 sm:text-sm sm:tracking-[0.3em]">
            {branding.tagline}
          </p>
        )}
        <h1 className="animate-fade-in-up delay-100 mt-7 font-serif text-4xl leading-[1.05] text-rose-900 sm:mt-9 sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>
        <p className="animate-fade-in-up delay-200 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-rose-800/90 sm:mt-7 sm:text-xl">
          {hero.subheadline}
        </p>
        <div className="animate-fade-in-up delay-300 mt-9 sm:mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-medium text-white shadow-xl transition hover:scale-[1.02] hover:opacity-95 active:scale-[0.98] sm:px-10 sm:py-4 sm:text-lg"
            style={{ backgroundColor: branding.themeColor }}
          >
            {hero.ctaText}
          </a>
        </div>
        {trust && (
          <div className="animate-fade-in-up delay-400 mt-6 sm:mt-8">
            <TrustBar
              trust={trust}
              themeColor={branding.themeColor}
              tone="on-light"
              align="center"
            />
          </div>
        )}
      </div>
    </section>
  );
}

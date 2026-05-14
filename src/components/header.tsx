import type { SketchBranding } from '../types';

interface HeaderProps {
  branding: SketchBranding;
}

/**
 * Header — premium variant.
 *
 * - Sticky with background blur (visual depth)
 * - Logo + name + tagline as cohesive brand mark
 * - Nav links with smooth underline-on-hover (not just color change)
 * - CTA button with subtle scale-on-hover
 */
export function Header({ branding }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-rose-100/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#top"
          className="group flex min-w-0 items-center gap-3 text-rose-900 sm:gap-3.5"
        >
          {branding.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={branding.logoUrl}
              alt={`לוגו ${branding.businessName}`}
              referrerPolicy="no-referrer"
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-rose-200 transition group-hover:ring-rose-300 sm:h-12 sm:w-12"
            />
          ) : (
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:text-lg"
              style={{ backgroundColor: branding.themeColor }}
            >
              {branding.businessName.slice(0, 1)}
            </span>
          )}
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-serif text-base text-rose-900 sm:text-lg">
              {branding.businessName}
            </span>
            {branding.tagline && (
              <span className="hidden truncate text-xs text-rose-700/80 sm:block">
                {branding.tagline}
              </span>
            )}
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-rose-800 sm:flex">
          <NavLink href="#about">עליי</NavLink>
          <NavLink href="#services">שירותים</NavLink>
          <NavLink href="#gallery">גלריה</NavLink>
          <NavLink href="#testimonials">ממליצות</NavLink>
        </nav>

        {/* CTA always visible — on mobile it's the only nav element */}
        <a
          href="#contact"
          className="shrink-0 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:scale-[1.04] hover:shadow-md sm:px-6 sm:py-2.5"
          style={{ backgroundColor: branding.themeColor }}
        >
          צור קשר
        </a>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative px-1 py-0.5 transition hover:text-rose-600"
    >
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-right scale-x-0 bg-rose-500 transition group-hover:scale-x-100" />
    </a>
  );
}

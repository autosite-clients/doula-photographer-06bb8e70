interface Props {
  businessName: string;
  themeColor: string;
}

/**
 * Team section — placeholder cards for the clinic's staff.
 *
 * Until we add a `team` field to SketchContent, this section shows a
 * "the team" intro card with a CTA to learn more. When the customer-input
 * onboarding form has a "list your team" question, the answers populate here.
 *
 * For now, it's an inviting placeholder rather than fake names — we never
 * fabricate people.
 */
export function TeamSection({ businessName, themeColor }: Props) {
  return (
    <section id="team" className="bg-rose-50/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            הצוות שלנו
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            פנים מאחורי הטיפול
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-rose-800/70 sm:text-lg">
            כל אחד ואחת בצוות {businessName} מביא/ה ניסיון, הסמכה, וגישה אישית
            למטופלים. נכיר אתכם בפגישת הייעוץ הראשונה.
          </p>
        </div>

        {/* Placeholder cards — visually appealing without fake data */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card-lift overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-rose-100"
            >
              {/* Decorative gradient as photo placeholder */}
              <div
                className="aspect-[4/5] w-full"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}25, ${themeColor}10, ${themeColor}30)`,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-16 w-16 opacity-30"
                    style={{ color: themeColor }}
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-rose-900">חבר/ת צוות {i}</h3>
                <p className="mt-2 text-sm text-rose-800/70">
                  פרטי הצוות יוצגו כאן אחרי האפיון
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-medium text-white shadow-lg transition hover:scale-[1.02] sm:px-9 sm:py-3.5 sm:text-lg"
            style={{ backgroundColor: themeColor }}
          >
            לקביעת פגישת ייעוץ
            <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 010 1.06L8.06 11l4.73 4.71a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

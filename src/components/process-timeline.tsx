interface ProcessTimelineProps {
  steps?: Array<{ title: string; description: string }>;
  themeColor: string;
  /** Optional headline override (default: "איך זה עובד") */
  headline?: string;
  /** Optional preheadline override (default: "התהליך") */
  preHeadline?: string;
}

/**
 * Process timeline — vertical timeline with numbered steps for service flows.
 *
 * Use cases per archetype:
 *   - Doula: "ראשית פגישה → ליווי הריון → לידה → פגישת תיעוד"
 *   - Photographer: "ייעוץ → תיאום → צילום → עריכה → אלבום"
 *   - Lawyer: "ייעוץ ראשוני → איסוף חומרים → ייעוץ מעמיק → טיפול"
 *
 * The component is generic — accepts any 3-7 steps. Renders a vertical line
 * on desktop with numbered dots, horizontal cards on mobile.
 *
 * Skips rendering if no steps. Per-archetype layouts decide whether to
 * include this section.
 */
export function ProcessTimeline({
  steps,
  themeColor,
  headline = 'איך זה עובד',
  preHeadline = 'התהליך',
}: ProcessTimelineProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section id="process" className="bg-rose-50/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            {preHeadline}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-rose-800/70 sm:text-lg">
            שקיפות מלאה — מהפגישה הראשונה ועד הסיום.
          </p>
        </div>

        {/* Timeline — numbered steps with vertical connector line on desktop */}
        <ol className="relative mt-12 sm:mt-16">
          {/* Vertical line behind the dots */}
          <span
            aria-hidden
            className="absolute right-5 top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 sm:block"
          />

          {steps.map((step, i) => (
            <li
              key={i}
              className="relative flex gap-5 pb-8 last:pb-0 sm:gap-7 sm:pb-10"
            >
              {/* Number badge */}
              <span
                className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-base font-bold text-white shadow-md sm:h-11 sm:w-11 sm:text-lg"
                style={{ backgroundColor: themeColor }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Content card */}
              <div className="card-lift flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-rose-100 sm:p-6">
                <h3 className="font-serif text-lg font-medium text-rose-900 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-rose-800/85 sm:text-lg">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

interface Props {
  themeColor: string;
}

/**
 * Schedule hint — placeholder for the weekly class schedule.
 *
 * For studios, "when do classes happen" is a top-3 question. We can't fake
 * a schedule (real days/times require operator input), so we show a stylized
 * empty grid with a strong CTA: "kabel et ha-luach be-WhatsApp".
 *
 * When SketchContent gets a `schedule` field (future), this component renders
 * the real thing — a 7-column day grid with class blocks.
 */
export function ScheduleHint({ themeColor }: Props) {
  const days = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

  return (
    <section id="schedule" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            לוח שיעורים
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            השבוע באולפן
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70 sm:text-lg">
            לוח עדכני נשלח בווטסאפ — כל שבוע מתחדש לפי הביקוש.
          </p>
        </div>

        {/* Stylized calendar placeholder */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-bl from-rose-50/40 to-white shadow-sm ring-1 ring-rose-100 sm:mt-14">
          <div className="grid grid-cols-7 border-b border-rose-100 bg-white">
            {days.map((d) => (
              <div
                key={d}
                className="border-l border-rose-100 px-2 py-3 text-center font-serif text-sm text-rose-900 last:border-l-0 sm:py-4 sm:text-base"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: 7 * 3 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-l border-rose-100 p-3 last:border-l-0 sm:p-5"
                style={{
                  backgroundColor: i % 4 === 0 ? `${themeColor}10` : undefined,
                }}
              >
                <div className="h-12 rounded bg-rose-100/50 sm:h-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-medium text-white shadow-lg transition hover:scale-[1.02] sm:px-9 sm:py-3.5 sm:text-lg"
            style={{ backgroundColor: themeColor }}
          >
            לקבלת הלוח השבועי
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

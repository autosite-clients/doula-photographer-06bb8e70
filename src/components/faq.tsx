interface FaqProps {
  items?: Array<{ question: string; answer: string }>;
  themeColor: string;
}

/**
 * FAQ accordion — uses native <details>/<summary> for zero-JS interactivity.
 *
 * Why <details> not a JS accordion:
 *   - Works without JS (progressive enhancement)
 *   - Native keyboard accessibility (Enter/Space to toggle)
 *   - Browser-native open/close animations (we layer custom transitions)
 *   - SEO-friendly: search engines see the answer text even when collapsed
 *
 * Renders nothing if no items — cross-archetype graceful skip.
 */
export function Faq({ items, themeColor }: FaqProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rose-500">
            שאלות נפוצות
          </p>
          <h2 className="mt-3 font-serif text-3xl text-rose-900 sm:text-4xl md:text-5xl">
            לפני שתכתבו לי
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-rose-800/70 sm:text-lg">
            אם השאלה שלכם כאן — אולי תקבלו תשובה כבר עכשיו. אם לא — אשמח לענות בווטסאפ.
          </p>
        </div>

        <div className="mt-10 space-y-3 sm:mt-14 sm:space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group overflow-hidden rounded-xl bg-rose-50/40 transition open:bg-white open:shadow-md open:ring-1 open:ring-rose-100"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-right hover:bg-rose-50 sm:px-7 sm:py-6">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition group-open:rotate-45"
                  style={{ backgroundColor: themeColor }}
                  aria-hidden
                >
                  ＋
                </span>
                <span className="flex-1 font-serif text-base text-rose-900 sm:text-lg">
                  {item.question}
                </span>
              </summary>
              <div className="border-t border-rose-100 px-5 py-5 text-right text-base leading-relaxed text-rose-800/85 sm:px-7 sm:py-6 sm:text-lg">
                {item.answer.split(/\n+/).map((para, j) => (
                  <p key={j} className={j > 0 ? 'mt-3' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

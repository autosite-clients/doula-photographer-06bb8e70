import type { SketchContent } from '../types';

interface Props {
  trust: NonNullable<SketchContent['trust']>;
  /** Theme color for accent rings/icons */
  themeColor?: string;
  /**
   * "on-image" → white text on translucent dark badges (use over hero image).
   * "on-light" → dark text on white badges (use on light backgrounds).
   * Default: on-light.
   */
  tone?: 'on-image' | 'on-light';
  /** Justify content. Default: center. RTL pages often want "end". */
  align?: 'start' | 'center' | 'end';
}

/**
 * Trust bar — small strip with real numbers from public sources.
 *
 * Renders 1-3 badges:
 *   - Google rating (★ 4.9 · 27 ביקורות)
 *   - Total social followers ("1.2K עוקבים ברשתות")
 *   - Years-active or platform-specific (future)
 *
 * Only shows what we actually have. The sketch generator already filters
 * out weak signals (rating < 4, < 3 reviews, < 200 followers) so anything
 * that arrives here deserves to be displayed.
 *
 * Renders nothing if no signals — important fallback so we never show
 * an empty placeholder strip.
 */
export function TrustBar({
  trust,
  themeColor = '#c95757',
  tone = 'on-light',
  align = 'center',
}: Props) {
  const hasGoogle = typeof trust.googleRating === 'number';
  const totalFollowers = computeTotalFollowers(trust);
  const hasFollowers = totalFollowers !== null;

  if (!hasGoogle && !hasFollowers) return null;

  const isOnImage = tone === 'on-image';
  const justify =
    align === 'start'
      ? 'justify-start'
      : align === 'end'
        ? 'justify-end'
        : 'justify-center';

  // Tone-dependent badge classes — extracted to keep JSX readable
  const badgeClass = isOnImage
    ? 'border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md'
    : 'border border-rose-200/70 bg-white/80 text-rose-900 shadow-sm backdrop-blur-sm';

  const subTextClass = isOnImage ? 'text-white/85' : 'text-rose-800/80';

  return (
    <div
      dir="rtl"
      className={`flex flex-wrap items-center gap-3 text-sm sm:gap-4 sm:text-base ${justify}`}
    >
      {hasGoogle && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${badgeClass}`}
        >
          {/* Star icon */}
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="#facc15"
            className="h-4 w-4"
          >
            <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118L10 16.011l-3.976 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L1.664 9.1c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <span className="font-medium">
            {trust.googleRating!.toFixed(1)}
          </span>
          <span className={subTextClass}>
            · {trust.googleReviewCount} ביקורות בגוגל
          </span>
        </span>
      )}

      {hasFollowers && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${badgeClass}`}
        >
          {/* Users icon */}
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill={isOnImage ? '#ffffff' : themeColor}
            className="h-4 w-4"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span className="font-medium">{formatCount(totalFollowers!)}</span>
          <span className={subTextClass}>עוקבים ברשתות</span>
        </span>
      )}
    </div>
  );
}

/**
 * Pick the most truthful "total followers" we can show. If we have a
 * cross-platform total from the generator, use it. Otherwise sum what we
 * have (only counts that passed the per-platform threshold). Returns null
 * if nothing meaningful.
 */
function computeTotalFollowers(
  trust: NonNullable<SketchContent['trust']>,
): number | null {
  if (typeof trust.totalFollowers === 'number') return trust.totalFollowers;
  const sum =
    (trust.instagramFollowers ?? 0) +
    (trust.facebookFollowers ?? 0) +
    (trust.tiktokFollowers ?? 0);
  return sum >= 500 ? sum : null;
}

/**
 * Hebrew-friendly number formatting:
 *   1234   → "1,234"
 *   12345  → "12.3K"
 *   123456 → "123K"
 */
function formatCount(n: number): string {
  if (n >= 10000) {
    const k = n / 1000;
    return k >= 100 ? `${Math.round(k)}K` : `${k.toFixed(1)}K`;
  }
  return n.toLocaleString('he-IL');
}

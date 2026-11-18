export type AppLocale = 'vi' | 'en';

export const SUPPORTED_LOCALES: AppLocale[] = ['vi', 'en'];
export const DEFAULT_LOCALE: AppLocale = 'en';

interface ParsedLanguage {
  code: string;
  quality: number;
}

/**
 * Parses the Accept-Language header taking into account quality values (q=).
 * Returns parsed languages sorted by priority descending.
 */
export function parseAcceptLanguage(header: string | null | undefined): ParsedLanguage[] {
  if (!header || !header.trim()) {
    return [];
  }

  return header
    .split(',')
    .map((item) => {
      const parts = item.trim().split(';');
      const code = parts[0]?.trim().toLowerCase() || '';
      let quality = 1.0;

      for (let i = 1; i < parts.length; i++) {
        const param = parts[i]?.trim();
        if (param && param.startsWith('q=')) {
          const parsedQ = parseFloat(param.substring(2));
          if (!isNaN(parsedQ)) {
            quality = parsedQ;
          }
        }
      }

      return { code, quality };
    })
    .filter((item) => item.code.length > 0)
    .sort((a, b) => b.quality - a.quality);
}

/**
 * Resolves the target locale for visits to `/`:
 * 1. Saved preference in cookie takes first priority.
 * 2. Highest-priority language in Accept-Language:
 *    - Base language is 'vi' -> 'vi'
 *    - Anything else -> 'en'
 * 3. Fallback -> 'en'
 */
export function resolvePreferredLocale(
  acceptLanguage: string | null | undefined,
  cookieLocale: string | null | undefined
): AppLocale {
  if (cookieLocale === 'vi' || cookieLocale === 'en') {
    return cookieLocale;
  }

  const parsed = parseAcceptLanguage(acceptLanguage);
  if (parsed.length === 0) {
    return DEFAULT_LOCALE;
  }

  // Highest quality language item
  const highest = parsed[0];
  const baseLang = highest.code.split('-')[0];

  if (baseLang === 'vi') {
    return 'vi';
  }

  return 'en';
}

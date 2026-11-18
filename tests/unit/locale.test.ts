import { describe, it, expect } from 'vitest';
import { resolvePreferredLocale } from '@/lib/locale';

describe('Locale Resolution Rules (Section 6 Requirements)', () => {
  it('redirects to /vi when highest-priority language is Vietnamese', () => {
    const locale = resolvePreferredLocale('vi-VN,vi;q=0.9,en;q=0.8', null);
    expect(locale).toBe('vi');
  });

  it('redirects to /en when highest-priority language is English', () => {
    const locale = resolvePreferredLocale('en-US,en;q=0.9,vi;q=0.7', null);
    expect(locale).toBe('en');
  });

  it('redirects to /en when highest-priority language is Japanese even if vi is present', () => {
    const locale = resolvePreferredLocale('ja-JP,vi;q=0.5', null);
    expect(locale).toBe('en');
  });

  it('redirects to /en when Accept-Language header is missing', () => {
    const locale = resolvePreferredLocale(null, null);
    expect(locale).toBe('en');
  });

  it('honors saved cookie preference over browser Accept-Language header', () => {
    // Browser is vi, but user manually chose English
    const locale = resolvePreferredLocale('vi-VN,vi;q=0.9', 'en');
    expect(locale).toBe('en');

    // Browser is en, but user manually chose Vietnamese
    const localeVi = resolvePreferredLocale('en-US,en;q=0.9', 'vi');
    expect(localeVi).toBe('vi');
  });
});

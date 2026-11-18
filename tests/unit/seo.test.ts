import { describe, it, expect, vi } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

vi.mock('@/data/repositories/blogSitemapRepository', () => ({
  getBlogSitemapEntries: async () => [{ locale: 'en', slug: 'published-journal', updated_at: '2026-11-18T00:00:00Z' }],
}));

describe('SEO Essentials (Section 13, Phase 5)', () => {
  it('generates a valid robots.txt configuration with sitemap reference', () => {
    const rob = robots();
    expect(rob.sitemap).toBe('https://vietexplore.vercel.app/sitemap.xml');
    expect(rob.rules).toBeDefined();
  });

  it('generates a complete sitemap covering all provinces and destinations for both locales', async () => {
    const sm = await sitemap();
    expect(sm.length).toBeGreaterThan(120);

    // Verify presence of home pages
    expect(sm.some((e) => e.url === 'https://vietexplore.vercel.app/vi')).toBe(true);
    expect(sm.some((e) => e.url === 'https://vietexplore.vercel.app/en')).toBe(true);

    // Verify presence of dynamic province & destination
    expect(sm.some((e) => e.url.includes('/vi/provinces/ha-noi'))).toBe(true);
    expect(sm.some((e) => e.url.includes('/en/destinations/vinh-ha-long'))).toBe(true);
    expect(sm.some((e) => e.url.endsWith('/en/blog/published-journal'))).toBe(true);
    expect(sm.some((e) => /\/admin|\/login/.test(e.url))).toBe(false);
  });
});

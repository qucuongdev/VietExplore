import { describe, expect, it, vi } from 'vitest';
import { generateMetadata as destinationMetadata } from '@/app/[locale]/destinations/[slug]/page';
import { generateMetadata as provinceMetadata } from '@/app/[locale]/provinces/[slug]/page';
import { generateMetadata as destinationsMetadata } from '@/app/[locale]/destinations/page';
import { generateMetadata as provincesMetadata } from '@/app/[locale]/provinces/page';
import { generateMetadata as exploreMetadata } from '@/app/[locale]/explore/page';
import en from '../../messages/en.json';
import viMessages from '../../messages/vi.json';

vi.mock('@/i18n/navigation', () => ({ Link: () => null }));

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async ({ locale, namespace }: { locale: string; namespace: 'destinations' | 'provinces' }) => {
    const messages = locale === 'vi' ? viMessages : en;
    return (key: 'title' | 'subtitle') => messages[namespace][key];
  },
}));

describe.each(['vi', 'en'])('Page metadata in %s', (locale) => {
  it.each([
    { path: '/destinations/vinh-ha-long', slug: 'vinh-ha-long', generate: destinationMetadata },
    { path: '/provinces/ha-noi', slug: 'ha-noi', generate: provinceMetadata },
    { path: '/destinations', slug: '', generate: destinationsMetadata },
    { path: '/provinces', slug: '', generate: provincesMetadata },
    { path: '/explore', slug: '', generate: exploreMetadata },
  ])('uses the actual path for canonical and language alternatives: $path', async ({ path, slug, generate }) => {
    const metadata = await generate({ params: Promise.resolve({ locale, slug }) });
    expect(metadata.alternates).toEqual({
      canonical: `/${locale}${path}`,
      languages: { vi: `/vi${path}`, en: `/en${path}` },
    });
    expect(metadata.title).toMatch(/ — VietExplore$/);
    expect(metadata.description).toBeTruthy();
    expect(metadata.openGraph).toMatchObject({ url: `/${locale}${path}`, title: metadata.title });
  });

  it('uses the destination name and summary in search and sharing metadata', async () => {
    const metadata = await destinationMetadata({ params: Promise.resolve({ locale, slug: 'vinh-ha-long' }) });
    expect(metadata.title).toBe(`${locale === 'vi' ? 'Vịnh Hạ Long' : 'Ha Long Bay'} — VietExplore`);
    expect(metadata.openGraph).toMatchObject({ images: [expect.objectContaining({ url: expect.any(String) })] });
  });
});

it('does not generate valid metadata for missing destinations or provinces', async () => {
  const params = Promise.resolve({ locale: 'en', slug: 'does-not-exist' });
  await expect(destinationMetadata({ params })).rejects.toThrow('NEXT_NOT_FOUND');
  await expect(provinceMetadata({ params })).rejects.toThrow('NEXT_NOT_FOUND');
});

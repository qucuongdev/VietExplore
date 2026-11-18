import { MetadataRoute } from 'next';
import { getAllProvinces } from '@/data/repositories/provinceRepository';
import { getAllDestinations } from '@/data/repositories/destinationRepository';
import { getBlogSitemapEntries } from '@/data/repositories/blogSitemapRepository';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vietexplore.vercel.app';
  const locales = ['vi', 'en'];

  const provinces = getAllProvinces();
  const destinations = getAllDestinations();

  const entries: MetadataRoute.Sitemap = [];

  // Static root & directories
  for (const locale of locales) {
    entries.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${locale}/provinces`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/destinations`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/explore`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    );

    // Dynamic Provinces
    for (const p of provinces) {
      entries.push({
        url: `${baseUrl}/${locale}/provinces/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    // Dynamic Destinations
    for (const d of destinations) {
      entries.push({
        url: `${baseUrl}/${locale}/destinations/${d.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  for (const post of await getBlogSitemapEntries()) {
    entries.push({ url: `${baseUrl}/${post.locale}/blog/${post.slug}`, lastModified: post.updated_at, changeFrequency: 'weekly', priority: 0.7 });
  }
  return entries;
}

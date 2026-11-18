import { destinations } from '../destinations';
import { Destination } from '@/types/content';
import { removeVietnameseDiacritics } from '@/lib/utils';

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByProvince(provinceId: string): Destination[] {
  return destinations.filter((d) => d.provinceId === provinceId);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured === true);
}

export interface SearchOptions {
  query?: string;
  categoryId?: string;
  provinceId?: string;
}

export function searchDestinations(options: SearchOptions): Destination[] {
  const { query, categoryId, provinceId } = options;

  let results = [...destinations];

  // Category filter
  if (categoryId && categoryId !== 'all') {
    results = results.filter((d) => d.categoryIds.includes(categoryId));
  }

  // Province filter
  if (provinceId && provinceId !== 'all') {
    results = results.filter((d) => d.provinceId === provinceId);
  }

  // Search query (Vietnamese diacritic-insensitive & English case-insensitive)
  if (query && query.trim()) {
    const normalizedQuery = removeVietnameseDiacritics(query);

    results = results.filter((d) => {
      const viName = removeVietnameseDiacritics(d.name.vi);
      const enName = d.name.en.toLowerCase();
      const viSummary = removeVietnameseDiacritics(d.summary.vi);
      const enSummary = d.summary.en.toLowerCase();

      return (
        viName.includes(normalizedQuery) ||
        enName.includes(normalizedQuery) ||
        viSummary.includes(normalizedQuery) ||
        enSummary.includes(normalizedQuery)
      );
    });
  }

  return results;
}

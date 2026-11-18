import { describe, it, expect } from 'vitest';
import { provinces } from '@/data/provinces';
import { destinations } from '@/data/destinations';
import { categories } from '@/data/categories';
import {
  getAllProvinces,
  getProvinceBySlug,
  getCentrallyGovernedCities,
  getProvincesOnly,
} from '@/data/repositories/provinceRepository';
import {
  getAllDestinations,
  getDestinationBySlug,
  getFeaturedDestinations,
  getDestinationsByProvince,
  searchDestinations,
} from '@/data/repositories/destinationRepository';
import { getAllCategories, getCategoryById } from '@/data/repositories/categoryRepository';

describe('Data Integrity & Contract Tests (Section 7, 8, 14)', () => {
  describe('Provinces Dataset', () => {
    it('contains exactly 34 official provincial-level entities', () => {
      expect(provinces.length).toBe(34);
      expect(getAllProvinces().length).toBe(34);
    });

    it('contains exactly 6 centrally governed cities and 28 provinces', () => {
      const cities = getCentrallyGovernedCities();
      const provs = getProvincesOnly();
      expect(cities.length).toBe(6);
      expect(provs.length).toBe(28);
    });

    it('has unique IDs and slugs for all provinces', () => {
      const ids = new Set(provinces.map((p) => p.id));
      const slugs = new Set(provinces.map((p) => p.slug));
      expect(ids.size).toBe(34);
      expect(slugs.size).toBe(34);
    });

    it('has valid non-empty names and summaries in both vi and en', () => {
      for (const p of provinces) {
        expect(p.name.vi.trim().length).toBeGreaterThan(0);
        expect(p.name.en.trim().length).toBeGreaterThan(0);
        expect(p.summary.vi.trim().length).toBeGreaterThan(0);
        expect(p.summary.en.trim().length).toBeGreaterThan(0);
      }
    });

    it('retrieves province by slug correctly', () => {
      const haNoi = getProvinceBySlug('ha-noi');
      expect(haNoi).toBeDefined();
      expect(haNoi?.kind).toBe('city');
      expect(haNoi?.name.vi).toBe('Hà Nội');

      const lamDong = getProvinceBySlug('lam-dong');
      expect(lamDong).toBeDefined();
      expect(lamDong?.name.vi).toBe('Lâm Đồng');
    });
  });

  describe('Categories Dataset', () => {
    it('has at least 4 well-defined categories with translations', () => {
      expect(categories.length).toBeGreaterThanOrEqual(4);
      expect(getAllCategories().length).toBeGreaterThanOrEqual(4);
      for (const cat of categories) {
        expect(cat.name.vi.length).toBeGreaterThan(0);
        expect(cat.name.en.length).toBeGreaterThan(0);
      }
    });

    it('retrieves category by ID', () => {
      const beaches = getCategoryById('beaches');
      expect(beaches).toBeDefined();
      expect(beaches?.slug).toBe('beaches');
    });
  });

  describe('Destinations Dataset', () => {
    it('contains at least 24 genuine destinations', () => {
      expect(destinations.length).toBeGreaterThanOrEqual(24);
      expect(getAllDestinations().length).toBeGreaterThanOrEqual(24);
    });

    it('spans across at least 12 distinct province/city entities', () => {
      const representedProvinces = new Set(destinations.map((d) => d.provinceId));
      expect(representedProvinces.size).toBeGreaterThanOrEqual(12);
    });

    it('has unique IDs and slugs for all destinations', () => {
      const ids = new Set(destinations.map((d) => d.id));
      const slugs = new Set(destinations.map((d) => d.slug));
      expect(ids.size).toBe(destinations.length);
      expect(slugs.size).toBe(destinations.length);
    });

    it('retrieves destination by slug correctly', () => {
      const haLong = getDestinationBySlug('vinh-ha-long');
      expect(haLong).toBeDefined();
      expect(haLong?.provinceId).toBe('p-quang-ninh');
      expect(haLong?.featured).toBe(true);
    });

    it('every destination references a valid existing provinceId', () => {
      const provinceIds = new Set(provinces.map((p) => p.id));
      for (const dest of destinations) {
        expect(provinceIds.has(dest.provinceId)).toBe(true);
      }
    });

    it('every destination references valid existing categoryIds', () => {
      const categoryIds = new Set(categories.map((c) => c.id));
      for (const dest of destinations) {
        expect(dest.categoryIds.length).toBeGreaterThan(0);
        for (const catId of dest.categoryIds) {
          expect(categoryIds.has(catId)).toBe(true);
        }
      }
    });

    it('has at least 6 featured destinations with verified imagery', () => {
      const featured = getFeaturedDestinations();
      expect(featured.length).toBeGreaterThanOrEqual(6);
      for (const f of featured) {
        expect(f.images.length).toBeGreaterThan(0);
        expect(f.images[0].licenseName).toBeDefined();
        expect(f.images[0].sourceUrl).toBeDefined();
      }
    });
  });

  describe('Search & Filter Repository Behavior', () => {
    it('filters destinations by provinceId correctly and Hanoi has rich curation', () => {
      const lamDongDestinations = getDestinationsByProvince('p-lam-dong');
      expect(lamDongDestinations.length).toBeGreaterThanOrEqual(2);
      expect(lamDongDestinations.some((d) => d.slug === 'ho-xuan-huong-da-lat')).toBe(true);

      const hanoiDestinations = getDestinationsByProvince('p-ha-noi');
      expect(hanoiDestinations.length).toBeGreaterThanOrEqual(8);
      expect(hanoiDestinations.some((d) => d.slug === 'van-mieu-quoc-tu-giam')).toBe(true);
      expect(hanoiDestinations.some((d) => d.slug === 'hoang-thanh-thang-long')).toBe(true);
      expect(hanoiDestinations.some((d) => d.slug === 'ho-tay-chua-tran-quoc')).toBe(true);
    });

    it('performs accent-insensitive Vietnamese search', () => {
      // Searching "da lat" should match "Hồ Xuân Hương & Trung tâm Đà Lạt"
      const resultsWithoutAccent = searchDestinations({ query: 'da lat' });
      expect(resultsWithoutAccent.length).toBeGreaterThan(0);
      expect(resultsWithoutAccent.some((d) => d.slug === 'ho-xuan-huong-da-lat')).toBe(true);

      // Searching "Đà Lạt" with accents
      const resultsWithAccent = searchDestinations({ query: 'Đà Lạt' });
      expect(resultsWithAccent.length).toBeGreaterThan(0);
      expect(resultsWithAccent.some((d) => d.slug === 'ho-xuan-huong-da-lat')).toBe(true);
    });

    it('filters by category correctly', () => {
      const beachDestinations = searchDestinations({ categoryId: 'beaches' });
      expect(beachDestinations.length).toBeGreaterThan(0);
      for (const dest of beachDestinations) {
        expect(dest.categoryIds).toContain('beaches');
      }
    });
  });
});

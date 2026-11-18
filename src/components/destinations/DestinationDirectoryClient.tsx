'use client';

import { useState, useMemo, useTransition } from 'react';
import { Destination, Province, Category, Locale } from '@/types/content';
import DestinationCard from './DestinationCard';
import { Search, SlidersHorizontal, X, RotateCcw, Compass } from 'lucide-react';
import { removeVietnameseDiacritics } from '@/lib/utils';
import { usePathname, useRouter } from '@/i18n/navigation';

interface DestinationDirectoryClientProps {
  destinations: Destination[];
  provinces: Province[];
  categories: Category[];
  locale: Locale;
  initialQuery?: string;
  initialCategory?: string;
  initialProvince?: string;
}

export default function DestinationDirectoryClient({
  destinations,
  provinces,
  categories,
  locale,
  initialQuery = '',
  initialCategory = 'all',
  initialProvince = 'all',
}: DestinationDirectoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);

  // Sync state with URL query parameters
  const updateUrlParams = (newQuery: string, newCategory: string, newProvince: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (newQuery.trim()) params.set('q', newQuery.trim());
      if (newCategory && newCategory !== 'all') params.set('category', newCategory);
      if (newProvince && newProvince !== 'all') params.set('province', newProvince);

      const qs = params.toString();
      const target = qs ? `${pathname}?${qs}` : pathname;
      router.replace(target, { scroll: false });
    });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrlParams(val, selectedCategory, selectedProvince);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    updateUrlParams(query, catId, selectedProvince);
  };

  const handleProvinceChange = (provId: string) => {
    setSelectedProvince(provId);
    updateUrlParams(query, selectedCategory, provId);
  };

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedProvince('all');
    updateUrlParams('', 'all', 'all');
  };

  // Filtered list
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // Category filter
      if (selectedCategory !== 'all' && !dest.categoryIds.includes(selectedCategory)) {
        return false;
      }

      // Province filter
      if (selectedProvince !== 'all' && dest.provinceId !== selectedProvince) {
        return false;
      }

      // Search query (diacritic-insensitive)
      if (query.trim()) {
        const queryNorm = removeVietnameseDiacritics(query);
        const nameViNorm = removeVietnameseDiacritics(dest.name.vi);
        const nameEnNorm = dest.name.en.toLowerCase();
        const summaryViNorm = removeVietnameseDiacritics(dest.summary.vi);
        const summaryEnNorm = dest.summary.en.toLowerCase();

        return (
          nameViNorm.includes(queryNorm) ||
          nameEnNorm.includes(queryNorm) ||
          summaryViNorm.includes(queryNorm) ||
          summaryEnNorm.includes(queryNorm)
        );
      }

      return true;
    });
  }, [destinations, query, selectedCategory, selectedProvince]);

  const hasActiveFilters = query.trim() !== '' || selectedCategory !== 'all' || selectedProvince !== 'all';
  const selectedCategoryObj = categories.find((c) => c.id === selectedCategory);
  const selectedProvinceObj = provinces.find((p) => p.id === selectedProvince);

  return (
    <div className="w-full">
      {/* Search & Filter Header Toolbar */}
      <div className="bg-white rounded-3xl border border-[#E2DDD5] p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5B665F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={locale === 'vi' ? 'Tìm theo tên điểm đến, di tích, bãi biển...' : 'Search destination name, heritage, beach...'}
              className="w-full pl-9 pr-9 py-2.5 bg-[#F8F7F3] border border-[#E2DDD5] rounded-xl text-sm text-[#202723] placeholder:text-[#5B665F] focus:outline-hidden focus:ring-2 focus:ring-[#194D42]"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B665F] hover:text-[#202723] p-1"
                aria-label="Xóa từ khóa"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Province Dropdown */}
          <div className="min-w-[200px]">
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F7F3] border border-[#E2DDD5] rounded-xl text-sm text-[#202723] focus:outline-hidden focus:ring-2 focus:ring-[#194D42]"
              aria-label={locale === 'vi' ? 'Lọc theo tỉnh thành' : 'Filter by province'}
            >
              <option value="all">{locale === 'vi' ? 'Tất cả 34 Tỉnh thành' : 'All 34 Provinces'}</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name[locale] || p.name.vi} ({p.kind === 'city' ? 'TP' : 'Tỉnh'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 pt-4 border-t border-[#E2DDD5]/70 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5B665F] shrink-0 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{locale === 'vi' ? 'Trải nghiệm:' : 'Experience:'}</span>
          </div>

          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#194D42] text-white shadow-xs'
                : 'bg-[#F8F7F3] text-[#5B665F] hover:bg-[#EFECE6] hover:text-[#202723]'
            }`}
          >
            {locale === 'vi' ? 'Tất cả danh mục' : 'All categories'}
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#194D42] text-white shadow-xs'
                    : 'bg-[#F8F7F3] text-[#5B665F] hover:bg-[#EFECE6] hover:text-[#202723]'
                }`}
              >
                {cat.name[locale]}
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips & Clear Action */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-[#E2DDD5]/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#5B665F] font-medium">
              {locale === 'vi' ? 'Đang lọc theo:' : 'Active filters:'}
            </span>

            {query.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F0EC] text-[#194D42] font-medium">
                <span>&quot;{query}&quot;</span>
                <button
                  type="button"
                  onClick={() => handleQueryChange('')}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && selectedCategoryObj && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F0EC] text-[#194D42] font-medium">
                <span>{selectedCategoryObj.name[locale]}</span>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedProvince !== 'all' && selectedProvinceObj && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F0EC] text-[#194D42] font-medium">
                <span>{selectedProvinceObj.name[locale]}</span>
                <button
                  type="button"
                  onClick={() => handleProvinceChange('all')}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#C87956] hover:underline font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{locale === 'vi' ? 'Đặt lại toàn bộ' : 'Clear all'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Result Status Bar */}
      <div className="flex items-center justify-between text-xs text-[#5B665F] mb-6">
        <span>
          {locale === 'vi'
            ? `Tìm thấy ${filteredDestinations.length} điểm đến du lịch`
            : `${filteredDestinations.length} destinations found`}
        </span>
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} locale={locale} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-[#E2DDD5] p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F0EC] text-[#194D42] flex items-center justify-center mx-auto mb-4">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#202723] mb-2">
            {locale === 'vi' ? 'Không tìm thấy điểm đến phù hợp' : 'No destinations match your criteria'}
          </h3>
          <p className="text-xs sm:text-sm text-[#5B665F] mb-6 leading-relaxed">
            {locale === 'vi'
              ? 'Hãy thử tìm kiếm với từ khóa khác, hoặc xóa các tiêu chí lọc đang chọn.'
              : 'Try adjusting your search terms or clearing some of the active filter options.'}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-[#194D42] text-white text-xs font-semibold hover:bg-[#143e35] transition-colors"
          >
            {locale === 'vi' ? 'Xóa toàn bộ bộ lọc' : 'Reset all filters'}
          </button>
        </div>
      )}
    </div>
  );
}

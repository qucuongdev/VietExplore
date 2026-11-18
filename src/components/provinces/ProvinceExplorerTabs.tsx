'use client';

import { useState, useMemo } from 'react';
import { Province, Locale, Region } from '@/types/content';
import ProvinceCard from './ProvinceCard';
import { Search, MapPin } from 'lucide-react';
import { removeVietnameseDiacritics } from '@/lib/utils';

interface ProvinceExplorerTabsProps {
  provinces: Province[];
  locale: Locale;
  initialRegion?: 'all' | Region;
  showSearch?: boolean;
}

export default function ProvinceExplorerTabs({
  provinces,
  locale,
  initialRegion = 'all',
  showSearch = true,
}: ProvinceExplorerTabsProps) {
  const [selectedRegion, setSelectedRegion] = useState<'all' | Region>(initialRegion);
  const [searchQuery, setSearchQuery] = useState('');

  const regionTabs: { id: 'all' | Region; labelVi: string; labelEn: string }[] = [
    { id: 'all', labelVi: 'Tất cả 34 Tỉnh thành', labelEn: 'All 34 Provinces' },
    { id: 'north', labelVi: 'Miền Bắc', labelEn: 'Northern' },
    { id: 'central', labelVi: 'Miền Trung', labelEn: 'Central' },
    { id: 'south', labelVi: 'Miền Nam', labelEn: 'Southern' },
  ];

  const filteredProvinces = useMemo(() => {
    return provinces.filter((p) => {
      // Region filter
      if (selectedRegion !== 'all' && p.region !== selectedRegion) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const queryNorm = removeVietnameseDiacritics(searchQuery);
        const nameViNorm = removeVietnameseDiacritics(p.name.vi);
        const nameEnNorm = p.name.en.toLowerCase();
        return nameViNorm.includes(queryNorm) || nameEnNorm.includes(queryNorm);
      }

      return true;
    });
  }, [provinces, selectedRegion, searchQuery]);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Region Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EFECE6] border border-[#E2DDD5] rounded-2xl overflow-x-auto scrollbar-none">
          {regionTabs.map((tab) => {
            const isActive = selectedRegion === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#194D42] text-white shadow-xs'
                    : 'text-[#5B665F] hover:text-[#202723] hover:bg-white/50'
                }`}
              >
                {locale === 'vi' ? tab.labelVi : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-[#5B665F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'vi' ? 'Tìm tỉnh hoặc thành phố...' : 'Search province or city...'}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2DDD5] rounded-xl text-xs sm:text-sm text-[#202723] placeholder:text-[#5B665F] focus:outline-hidden focus:ring-2 focus:ring-[#194D42] focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-[#5B665F] mb-6">
        <span>
          {locale === 'vi'
            ? `Hiển thị ${filteredProvinces.length} trên 34 đơn vị hành chính`
            : `Showing ${filteredProvinces.length} of 34 provincial entities`}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-[#C87956] hover:underline font-medium"
          >
            {locale === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProvinces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProvinces.map((province) => (
            <ProvinceCard key={province.id} province={province} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E2DDD5] p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F0EC] text-[#194D42] flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-lg font-bold text-[#202723] mb-1">
            {locale === 'vi' ? 'Không tìm thấy địa phương phù hợp' : 'No matching province found'}
          </h4>
          <p className="text-xs text-[#5B665F] mb-6">
            {locale === 'vi'
              ? 'Hãy thử kiểm tra lại từ khóa hoặc chọn tab khu vực khác.'
              : 'Try checking your search keyword or selecting a different region.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
            }}
            className="px-4 py-2 bg-[#194D42] text-white text-xs font-semibold rounded-xl hover:bg-[#143e35] transition-colors"
          >
            {locale === 'vi' ? 'Xem lại tất cả 34 tỉnh thành' : 'Reset and view all 34 provinces'}
          </button>
        </div>
      )}
    </div>
  );
}

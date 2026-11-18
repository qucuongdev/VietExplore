import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Search, Compass, MapPin, Sparkles, ArrowRight, Waves, Mountain, Landmark, Trees, Building2 } from 'lucide-react';
import { getFeaturedDestinations } from '@/data/repositories/destinationRepository';
import { getAllProvinces } from '@/data/repositories/provinceRepository';
import DestinationCard from '@/components/destinations/DestinationCard';
import ProvinceExplorerTabs from '@/components/provinces/ProvinceExplorerTabs';
import { Locale } from '@/types/content';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || 'vi';

  const t = await getTranslations('home');

  const featuredDestinations = getFeaturedDestinations().slice(0, 6);
  const allProvinces = getAllProvinces();

  const categories = [
    { icon: Waves, nameVi: 'Biển đảo', nameEn: 'Coastal & Islands', id: 'beaches' },
    { icon: Mountain, nameVi: 'Núi non & Cao nguyên', nameEn: 'Mountains & Highlands', id: 'mountains' },
    { icon: Landmark, nameVi: 'Di sản & Văn hóa', nameEn: 'Heritage & Culture', id: 'heritage' },
    { icon: Trees, nameVi: 'Sinh thái & Rừng quốc gia', nameEn: 'Nature & Reserves', id: 'nature' },
    { icon: Building2, nameVi: 'Đô thị & Nhịp sống', nameEn: 'Urban & City Escapes', id: 'urban' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-[#194D42] text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C87956_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C87956]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs tracking-wider uppercase font-medium text-white/90 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C87956]" />
            <span>Nghị quyết 2025 • 34 Đơn vị Tỉnh Thành</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-tight mb-6">
            {t('heroTitle')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            {t('heroSubtitle')}
          </p>

          {/* Search bar */}
          <form
            action={`/${currentLocale}/destinations`}
            method="GET"
            className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 text-[#202723]"
          >
            <div className="flex items-center gap-3 flex-1 px-3 w-full">
              <Search className="w-5 h-5 text-[#5B665F] shrink-0" />
              <input
                type="text"
                name="q"
                placeholder={t('searchPlaceholder')}
                className="w-full bg-transparent border-none text-sm text-[#202723] placeholder:text-[#5B665F] focus:outline-hidden py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#194D42] hover:bg-[#143e35] text-white font-medium text-sm rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{t('searchButton')}</span>
            </button>
          </form>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 w-full">
        <div className="bg-white rounded-2xl border border-[#E2DDD5] p-4 shadow-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/destinations?category=${cat.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EFECE6] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#194D42] group-hover:bg-[#194D42] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-[#202723]">
                    {currentLocale === 'vi' ? cat.nameVi : cat.nameEn}
                  </span>
                  <span className="block text-[11px] text-[#5B665F]">
                    {currentLocale === 'vi' ? cat.nameEn : cat.nameVi}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87956] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLocale === 'vi' ? 'Tuyển chọn biên tập' : 'Curated Selection'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202723]">
              {t('featuredTitle')}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#194D42] hover:text-[#143e35] transition-colors"
          >
            <span>{t('viewAllDestinations')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((dest, idx) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              locale={currentLocale}
              priority={idx < 3}
            />
          ))}
        </div>
      </section>

      {/* 34 Provinces Explorer Section */}
      <section className="bg-white border-y border-[#E2DDD5] py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87956] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Nghị quyết tổ chức lại năm 2025</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202723]">
                {t('provincesTitle')}
              </h2>
              <p className="text-sm text-[#5B665F] mt-2 max-w-xl">
                {t('provincesSubtitle')}
              </p>
            </div>
            <Link
              href="/provinces"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#194D42] hover:text-[#143e35] transition-colors"
            >
              <span>{t('viewAllProvinces')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProvinceExplorerTabs
            provinces={allProvinces}
            locale={currentLocale}
            showSearch={true}
          />
        </div>
      </section>

      {/* Editorial Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F7F3]">
        <div className="max-w-4xl mx-auto text-center bg-[#EFECE6] border border-[#E2DDD5] rounded-3xl p-10 md:p-14">
          <Compass className="w-10 h-10 text-[#194D42] mx-auto mb-5" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202723] mb-4">
            {currentLocale === 'vi'
              ? 'Tôn chỉ biên tập & Sự chuẩn xác địa lý'
              : 'Editorial Standards & Geographic Accuracy'}
          </h2>
          <p className="text-sm sm:text-base text-[#5B665F] leading-relaxed max-w-2xl mx-auto mb-8">
            {currentLocale === 'vi'
              ? 'VietExplore kiên định với việc không tạo số liệu giả, không tự bịa đặt giá cả hay đánh giá ảo. Tất cả địa danh đều được ánh xạ chính xác theo cơ cấu đơn vị hành chính chính thức của Việt Nam.'
              : 'VietExplore is committed to factual integrity: zero fabricated ratings, simulated prices, or fake attraction counts. Every tourist destination is meticulously mapped to Vietnam’s current administrative divisions.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/destinations"
              className="px-6 py-3 rounded-xl bg-[#194D42] text-white text-sm font-semibold hover:bg-[#143e35] transition-colors"
            >
              {t('viewAllDestinations')}
            </Link>
            <Link
              href="/explore"
              className="px-6 py-3 rounded-xl bg-white border border-[#E2DDD5] text-[#202723] text-sm font-semibold hover:bg-[#F8F7F3] transition-colors"
            >
              {t('exploreMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

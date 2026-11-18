import { getTranslations } from 'next-intl/server';
import { getAllDestinations } from '@/data/repositories/destinationRepository';
import { getAllProvinces } from '@/data/repositories/provinceRepository';
import { getAllCategories } from '@/data/repositories/categoryRepository';
import DestinationDirectoryClient from '@/components/destinations/DestinationDirectoryClient';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Compass } from 'lucide-react';
import { Locale } from '@/types/content';

export default async function DestinationsDirectoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; province?: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || 'vi';

  const { q, category, province } = await searchParams;

  const t = await getTranslations('destinations');

  const destinations = getAllDestinations();
  const provinces = getAllProvinces();
  const categories = getAllCategories();

  const breadcrumbs = [
    { label: currentLocale === 'vi' ? 'Điểm đến' : 'Destinations', href: '/destinations' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#194D42] text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>{currentLocale === 'vi' ? 'Cẩm nang khám phá' : 'Discovery Directory'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202723] mb-4 tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-base text-[#5B665F] leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Client Filter & Listing */}
      <DestinationDirectoryClient
        destinations={destinations}
        provinces={provinces}
        categories={categories}
        locale={currentLocale}
        initialQuery={q || ''}
        initialCategory={category || 'all'}
        initialProvince={province || 'all'}
      />
    </div>
  );
}

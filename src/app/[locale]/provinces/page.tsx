import { getTranslations } from 'next-intl/server';
import { getAllProvinces } from '@/data/repositories/provinceRepository';
import ProvinceExplorerTabs from '@/components/provinces/ProvinceExplorerTabs';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MapPin } from 'lucide-react';
import { Locale } from '@/types/content';

export default async function ProvincesDirectoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || 'vi';

  const t = await getTranslations('provinces');
  const provinces = getAllProvinces();

  const breadcrumbs = [
    { label: currentLocale === 'vi' ? '34 Tỉnh thành' : '34 Provinces', href: '/provinces' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#194D42] text-xs font-semibold mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{currentLocale === 'vi' ? 'Nghị quyết 2025' : '2025 Reorganization'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202723] mb-4 tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm sm:text-base text-[#5B665F] leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Explorer with Tabs & Search */}
      <ProvinceExplorerTabs
        provinces={provinces}
        locale={currentLocale}
        showSearch={true}
      />
    </div>
  );
}

import { notFound } from 'next/navigation';
import { getProvinceBySlug, getAllProvinces } from '@/data/repositories/provinceRepository';
import { getDestinationsByProvince } from '@/data/repositories/destinationRepository';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import DestinationCard from '@/components/destinations/DestinationCard';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, Compass } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Locale } from '@/types/content';

export function generateStaticParams() {
  const all = getAllProvinces();
  return all.map((p) => ({ slug: p.slug }));
}

export default async function ProvinceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const currentLocale = (locale as Locale) || 'vi';

  const province = getProvinceBySlug(slug);
  if (!province) {
    notFound();
  }

  const destinations = getDestinationsByProvince(province.id);
  const name = province.name[currentLocale] || province.name.vi;
  const summary = province.summary[currentLocale] || province.summary.vi;
  const isCity = province.kind === 'city';

  const breadcrumbs = [
    { label: currentLocale === 'vi' ? '34 Tỉnh thành' : '34 Provinces', href: '/provinces' },
    { label: name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Breadcrumb items={breadcrumbs} />

      {/* Hero Banner for Province */}
      <div className="relative rounded-3xl bg-white border border-[#E2DDD5] overflow-hidden shadow-xs mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Text Info */}
          <div className="p-8 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={isCity ? 'secondary' : 'primary'} className="text-xs font-semibold">
                {isCity
                  ? currentLocale === 'vi' ? 'Thành phố trực thuộc TW' : 'Centrally Governed City'
                  : currentLocale === 'vi' ? 'Tỉnh' : 'Province'}
              </Badge>
              <span className="text-xs text-[#5B665F] font-medium uppercase tracking-wider">
                {province.region === 'north'
                  ? currentLocale === 'vi' ? 'Khu vực Miền Bắc' : 'Northern Vietnam'
                  : province.region === 'central'
                  ? currentLocale === 'vi' ? 'Khu vực Miền Trung' : 'Central Vietnam'
                  : currentLocale === 'vi' ? 'Khu vực Miền Nam' : 'Southern Vietnam'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202723] mb-4">
              {name}
            </h1>

            <p className="text-sm sm:text-base text-[#5B665F] leading-relaxed mb-6">
              {summary}
            </p>

            <div className="flex items-center gap-4 text-xs text-[#5B665F] pt-4 border-t border-[#E2DDD5]/70">
              <div className="flex items-center gap-1.5 font-medium text-[#194D42]">
                <MapPin className="w-4 h-4 text-[#C87956]" />
                <span>Mã định danh: {province.id}</span>
              </div>
              <span>•</span>
              <span>
                {destinations.length > 0
                  ? currentLocale === 'vi'
                    ? `${destinations.length} điểm đến đã biên tập`
                    : `${destinations.length} curated destinations`
                  : currentLocale === 'vi'
                  ? 'Đang tiếp tục biên tập điểm đến'
                  : 'Curating destinations'}
              </span>
            </div>
          </div>

          {/* Visual Area */}
          <div className="relative aspect-16/10 lg:aspect-auto lg:h-full lg:col-span-5 bg-[#EFECE6] border-t lg:border-t-0 lg:border-l border-[#E2DDD5]">
            <ImageWithFallback
              src={province.image?.src}
              alt={province.image?.alt[currentLocale] || name}
              fallbackTitle={name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202723]">
              {currentLocale === 'vi' ? `Điểm đến nổi bật tại ${name}` : `Destinations in ${name}`}
            </h2>
            <p className="text-xs sm:text-sm text-[#5B665F] mt-1">
              {currentLocale === 'vi'
                ? `Khám phá các danh lam thắng cảnh và di tích thuộc địa phận ${name}`
                : `Explore natural and cultural landmarks within ${name}`}
            </p>
          </div>
        </div>

        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} locale={currentLocale} />
            ))}
          </div>
        ) : (
          /* Honest Empty State */
          <div className="bg-white rounded-3xl border border-[#E2DDD5] p-12 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F0EC] text-[#194D42] flex items-center justify-center mx-auto mb-4">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#202723] mb-2">
              {currentLocale === 'vi'
                ? `Chưa có điểm đến được biên tập cho ${name}`
                : `No curated destinations for ${name} yet`}
            </h3>
            <p className="text-xs sm:text-sm text-[#5B665F] mb-6 leading-relaxed">
              {currentLocale === 'vi'
                ? 'Để đảm bảo tính xác thực, chúng tôi chỉ đưa vào các điểm đến đã được kiểm tra nguồn gốc và tọa độ địa lý. Dữ liệu cho tỉnh thành này đang được hoàn thiện.'
                : 'To maintain editorial integrity, we only publish verified destinations with authentic provenance. Curated entries for this province will be added in upcoming editions.'}
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-[#194D42] text-white text-xs font-semibold hover:bg-[#143e35] transition-colors"
            >
              {currentLocale === 'vi' ? 'Xem các điểm đến khác' : 'Browse other destinations'}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

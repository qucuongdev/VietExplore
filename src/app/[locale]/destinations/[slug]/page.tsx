import { notFound } from 'next/navigation';
import { getDestinationBySlug, getAllDestinations, getDestinationsByProvince } from '@/data/repositories/destinationRepository';
import { getProvinceById } from '@/data/repositories/provinceRepository';
import { getCategoryById } from '@/data/repositories/categoryRepository';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import DestinationGallery from '@/components/destinations/DestinationGallery';
import DestinationCard from '@/components/destinations/DestinationCard';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, Navigation, Sparkles, ShieldCheck, ArrowLeft, Clock, Lightbulb, Compass, Film } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Locale } from '@/types/content';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();
  const currentLocale = locale === 'vi' ? 'vi' : 'en';
  const image = destination.images[0];
  return createPageMetadata({
    locale,
    path: `/destinations/${destination.slug}`,
    title: destination.name[currentLocale],
    description: destination.summary[currentLocale],
    image: image ? { src: image.src, alt: image.alt[currentLocale] } : undefined,
  });
}

export function generateStaticParams() {
  const all = getAllDestinations();
  return all.map((d) => ({ slug: d.slug }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const currentLocale = (locale as Locale) || 'vi';

  const destination = getDestinationBySlug(slug);
  if (!destination) {
    notFound();
  }

  const province = getProvinceById(destination.provinceId);
  const name = destination.name[currentLocale] || destination.name.vi;
  const summary = destination.summary[currentLocale] || destination.summary.vi;
  const description = destination.description
    ? destination.description[currentLocale] || destination.description.vi
    : summary;

  const provinceName = province ? province.name[currentLocale] || province.name.vi : '';

  // Related destinations (in same province or general)
  const related = province
    ? getDestinationsByProvince(province.id)
        .filter((d) => d.id !== destination.id)
        .slice(0, 3)
    : [];

  const breadcrumbs = [
    { label: currentLocale === 'vi' ? 'Điểm đến' : 'Destinations', href: '/destinations' },
    ...(province
      ? [{ label: provinceName, href: `/provinces/${province.slug}` }]
      : []),
    { label: name },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Breadcrumb items={breadcrumbs} />

      {/* Main Content Article */}
      <article className="bg-white rounded-3xl border border-[#E2DDD5] overflow-hidden shadow-xs mb-16">
        {/* Interactive Multi-Image Gallery */}
        <div className="relative">
          <DestinationGallery
            images={destination.images}
            destinationName={name}
            locale={currentLocale}
          />

          {/* Badges overlay on top of gallery */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 z-20 pointer-events-none">
            {destination.categoryIds.map((catId) => {
              const cat = getCategoryById(catId);
              if (!cat) return null;
              return (
                <Badge
                  key={cat.id}
                  variant="primary"
                  className="bg-[#194D42]/90 backdrop-blur-md text-xs font-semibold shadow-xs"
                >
                  {cat.name[currentLocale]}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 md:p-14">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#E2DDD5]">
            <div className="flex-1">
              {province && (
                <Link
                  href={`/provinces/${province.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C87956] hover:text-[#b36846] transition-colors mb-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{provinceName}</span>
                  <span className="text-[#5B665F] font-normal">
                    ({province.kind === 'city' ? 'Thành phố TW' : 'Tỉnh'})
                  </span>
                </Link>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202723] tracking-tight">
                {name}
              </h1>
            </div>

            {/* Coordinates Badge */}
            {destination.coordinates && (
              <div className="flex items-center gap-2 p-3 bg-[#E8F0EC] rounded-2xl text-xs text-[#194D42] shrink-0 font-medium border border-[#194D42]/10">
                <Navigation className="w-4 h-4 text-[#C87956]" />
                <div>
                  <span className="block text-[10px] text-[#5B665F] uppercase tracking-wider">Tọa độ địa lý</span>
                  <span>
                    {destination.coordinates.latitude.toFixed(4)}°B, {destination.coordinates.longitude.toFixed(4)}°Đ
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Overview & Travel Narrative */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* Lead Summary */}
              <div className="p-5 rounded-2xl bg-[#F8F7F3] border-l-4 border-[#194D42] text-base sm:text-lg text-[#202723] font-serif leading-relaxed">
                {summary}
              </div>

              {/* Main Editorial Story */}
              <div className="text-sm sm:text-base text-[#202723]/90 leading-relaxed space-y-4">
                <p className="whitespace-pre-line leading-loose">{description}</p>
              </div>

              {/* Vlog Travelogue (Timeline Journey) */}
              {destination.travelogue && destination.travelogue.length > 0 && (
                <section className="pt-8 border-t border-[#E2DDD5]/80">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#C87956] mb-6">
                    <Film className="w-4 h-4" />
                    <span>
                      {currentLocale === 'vi' ? 'Nhật ký trải nghiệm thực tế (Travelogue Vlog)' : 'Experience Travelogue (Vlog Journey)'}
                    </span>
                  </div>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E2DDD5] before:z-0">
                    {destination.travelogue.map((stop, sIdx) => (
                      <div key={sIdx} className="relative z-10 flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-[#194D42] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                          {sIdx + 1}
                        </div>
                        <div className="flex-1 bg-[#F8F7F3] rounded-2xl p-5 border border-[#E2DDD5]">
                          {stop.time && (
                            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C87956] mb-1">
                              <Clock className="w-3 h-3" />
                              <span>{stop.time}</span>
                            </div>
                          )}
                          <h4 className="font-serif text-base sm:text-lg font-bold text-[#202723] mb-2">
                            {stop.title[currentLocale] || stop.title.vi}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#5B665F] leading-relaxed mb-3">
                            {stop.narrative[currentLocale] || stop.narrative.vi}
                          </p>
                          {stop.image && (
                            <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-3 border border-[#E2DDD5]/80 shadow-xs">
                              <ImageWithFallback
                                src={stop.image.src}
                                alt={stop.image.alt[currentLocale] || stop.title[currentLocale]}
                                fallbackTitle={stop.title[currentLocale]}
                                fill
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                              />
                            </div>
                          )}
                          {stop.tip && (
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white text-xs text-[#194D42] font-medium border border-[#E2DDD5]/60">
                              <Lightbulb className="w-3.5 h-3.5 text-[#C87956] shrink-0" />
                              <span>{stop.tip[currentLocale] || stop.tip.vi}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Verified Editorial Fact Check Box */}
              <div className="mt-8 p-5 rounded-2xl bg-[#E8F0EC]/60 border border-[#194D42]/15 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#194D42] shrink-0 mt-0.5" />
                <div className="text-xs text-[#5B665F] leading-relaxed">
                  <span className="font-semibold text-[#202723] block mb-0.5">
                    {currentLocale === 'vi' ? 'Tiêu chuẩn minh bạch & Bản quyền' : 'Transparency & Licensing Standards'}
                  </span>
                  {currentLocale === 'vi'
                    ? `Dữ liệu hình ảnh và lộ trình thực tế được đối soát trực tiếp với vị trí địa lý tại ${provinceName}. Mọi hình ảnh đều có chứng nhận giấy phép mở và ghi nhận tác giả chính thức.`
                    : `Photographic assets and itinerary notes are cross-referenced with geographic coordinates in ${provinceName}. All images adhere to verified open licenses with explicit author credits.`}
                </div>
              </div>
            </div>

            {/* Sidebar (Highlights & Insider Tips) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="bg-[#EFECE6]/60 rounded-3xl border border-[#E2DDD5] p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87956] mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>{currentLocale === 'vi' ? 'Điểm nhấn không thể bỏ qua' : 'Key Highlights'}</span>
                  </div>
                  <ul className="space-y-3">
                    {destination.highlights.map((h, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#202723]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#194D42] shrink-0 mt-2" />
                        <span className="leading-relaxed">{h[currentLocale] || h.vi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Insider Tips */}
              {destination.insiderTips && destination.insiderTips.length > 0 && (
                <div className="bg-white rounded-3xl border border-[#E2DDD5] p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#194D42] mb-4">
                    <Compass className="w-4 h-4 text-[#C87956]" />
                    <span>{currentLocale === 'vi' ? 'Bí kíp dân bản địa' : 'Local Insider Tips'}</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#5B665F]">
                    {destination.insiderTips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5">
                        <span className="text-[#C87956] font-bold text-sm leading-none">•</span>
                        <span className="leading-relaxed">{tip[currentLocale] || tip.vi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Navigation link back */}
          <div className="pt-8 border-t border-[#E2DDD5] flex items-center justify-between">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#194D42] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentLocale === 'vi' ? 'Quay lại danh sách điểm đến' : 'Back to destinations'}</span>
            </Link>

            {province && (
              <Link
                href={`/provinces/${province.slug}`}
                className="text-xs font-semibold text-[#C87956] hover:underline"
              >
                {currentLocale === 'vi' ? `Xem tất cả tại ${provinceName} →` : `Explore all in ${provinceName} →`}
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Related Destinations */}
      {related.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202723]">
              {currentLocale === 'vi' ? `Điểm đến khác tại ${provinceName}` : `More in ${provinceName}`}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} locale={currentLocale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

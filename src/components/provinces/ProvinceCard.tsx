import { Link } from '@/i18n/navigation';
import { Province, Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, MapPin } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { getDestinationsByProvince } from '@/data/repositories/destinationRepository';

interface ProvinceCardProps {
  province: Province;
  locale: Locale;
}

export default function ProvinceCard({ province, locale }: ProvinceCardProps) {
  const destinations = getDestinationsByProvince(province.id);
  const count = destinations.length;

  const name = province.name[locale] || province.name.vi;
  const summary = province.summary[locale] || province.summary.vi;

  const isCity = province.kind === 'city';
  const regionNames: Record<Province['region'], { vi: string; en: string }> = {
    north: { vi: 'Miền Bắc', en: 'Northern Region' },
    central: { vi: 'Miền Trung', en: 'Central Region' },
    south: { vi: 'Miền Nam', en: 'Southern Region' },
  };

  return (
    <Link
      href={`/provinces/${province.slug}`}
      className="group flex flex-col bg-white rounded-3xl border border-[#E2DDD5] overflow-hidden hover:border-[#194D42] hover:shadow-lg transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#194D42]"
    >
      {/* Visual header */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-[#EFECE6]">
        <ImageWithFallback
          src={province.image?.src}
          alt={province.image?.alt[locale] || name}
          fallbackTitle={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <Badge
            variant={isCity ? 'secondary' : 'primary'}
            className="text-[11px] font-semibold backdrop-blur-xs shadow-xs"
          >
            {isCity
              ? locale === 'vi' ? 'Thành phố TW' : 'Central City'
              : locale === 'vi' ? 'Tỉnh' : 'Province'}
          </Badge>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-medium text-[#202723] shadow-xs">
            {regionNames[province.region][locale]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#C87956] font-medium mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isCity ? '6 Đô thị trung tâm' : '28 Tỉnh thành mới'}</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#202723] group-hover:text-[#194D42] transition-colors mb-2">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-[#5B665F] line-clamp-2 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-[#E2DDD5]/60 flex items-center justify-between text-xs">
          <span className={`font-medium ${count > 0 ? 'text-[#194D42]' : 'text-[#5B665F]'}`}>
            {count > 0
              ? locale === 'vi' ? `${count} điểm đến` : `${count} destinations`
              : locale === 'vi' ? 'Đang cập nhật' : 'Curating data'}
          </span>
          <div className="flex items-center gap-1 text-[#194D42] font-semibold text-xs group-hover:translate-x-1 transition-transform">
            <span>{locale === 'vi' ? 'Khám phá' : 'Explore'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

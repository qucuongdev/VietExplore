import { Link } from '@/i18n/navigation';
import { Destination, Locale } from '@/types/content';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Badge } from '@/components/ui/Badge';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { getProvinceById } from '@/data/repositories/provinceRepository';
import { getCategoryById } from '@/data/repositories/categoryRepository';

interface DestinationCardProps {
  destination: Destination;
  locale: Locale;
  priority?: boolean;
}

export default function DestinationCard({
  destination,
  locale,
  priority = false,
}: DestinationCardProps) {
  const province = getProvinceById(destination.provinceId);
  const primaryCategory = destination.categoryIds.length > 0 
    ? getCategoryById(destination.categoryIds[0]) 
    : undefined;

  const image = destination.images[0];
  const name = destination.name[locale] || destination.name.vi;
  const summary = destination.summary[locale] || destination.summary.vi;
  const provinceName = province ? (province.name[locale] || province.name.vi) : '';

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group flex flex-col bg-white rounded-3xl border border-[#E2DDD5] overflow-hidden hover:border-[#194D42] hover:shadow-lg transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#194D42]"
    >
      {/* Image container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#EFECE6]">
        <ImageWithFallback
          src={image?.src}
          alt={image?.alt[locale] || name}
          fallbackTitle={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {primaryCategory && (
            <Badge variant="primary" className="bg-[#194D42]/90 backdrop-blur-xs text-[11px] shadow-xs">
              {primaryCategory.name[locale]}
            </Badge>
          )}
          {province && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-medium text-[#202723] shadow-xs">
              <MapPin className="w-3 h-3 text-[#C87956]" />
              <span className="line-clamp-1">{provinceName}</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#202723] group-hover:text-[#194D42] transition-colors line-clamp-1">
              {name}
            </h3>
            <div className="w-7 h-7 rounded-full bg-[#E8F0EC] text-[#194D42] flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#5B665F] line-clamp-2 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-[#E2DDD5]/60 flex items-center justify-between text-xs text-[#5B665F]">
          <span className="inline-flex items-center gap-1 font-medium text-[#194D42]">
            Khám phá chi tiết
          </span>
          {destination.coordinates && (
            <span className="text-[11px] text-[#5B665F]/80">
              {destination.coordinates.latitude.toFixed(2)}°N, {destination.coordinates.longitude.toFixed(2)}°E
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

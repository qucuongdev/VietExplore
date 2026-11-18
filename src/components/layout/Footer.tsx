import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export default async function Footer() {
  const tNav = await getTranslations('navigation');
  const tFooter = await getTranslations('footer');

  return (
    <footer className="w-full bg-[#EFECE6] border-t border-[#E2DDD5] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-[#194D42] text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#194D42]">
                Viet<span className="text-[#C87956]">Explore</span>
              </span>
            </div>
            <p className="text-sm text-[#5B665F] max-w-md leading-relaxed mb-4">
              {tFooter('tagline')}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#5B665F]">
              <ShieldCheck className="w-4 h-4 text-[#194D42]" />
              <span>{tFooter('legalNotice')}</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202723] mb-3">
              {tFooter('quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/provinces"
                  className="text-[#5B665F] hover:text-[#194D42] transition-colors"
                >
                  {tNav('provinces')}
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-[#5B665F] hover:text-[#194D42] transition-colors"
                >
                  {tNav('destinations')}
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-[#5B665F] hover:text-[#194D42] transition-colors"
                >
                  {tNav('explore')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#202723] mb-3">
              {tFooter('imageSources')}
            </h4>
            <p className="text-xs text-[#5B665F] leading-relaxed mb-3">
              Tất cả hình ảnh và thông tin vị trí tuân thủ chính sách bản quyền mở (Pexels, Unsplash, Pixabay) và dữ liệu hành chính kiểm chứng.
            </p>
            <Link
              href="/explore#sources"
              className="inline-flex items-center text-xs font-medium text-[#C87956] hover:underline"
            >
              Xem chi tiết nguồn & giấy phép →
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2DDD5]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B665F]">
          <p>{tFooter('copyright')}</p>
          <p className="flex items-center gap-1">
            Thiết kế vì tình yêu Việt Nam <Heart className="w-3.5 h-3.5 text-[#C87956] fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
}

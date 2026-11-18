import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2DDD5] p-8 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#E8F0EC] text-[#194D42] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#202723] mb-2">
          {t('notFound')}
        </h1>
        <p className="text-sm text-[#5B665F] mb-8 leading-relaxed">
          {t('notFoundDesc')}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#194D42] text-white text-sm font-semibold hover:bg-[#143e35] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>{t('backHome')}</span>
        </Link>
      </div>
    </div>
  );
}

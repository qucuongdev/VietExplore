'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleToggle = (nextLocale: 'vi' | 'en') => {
    if (nextLocale === locale) return;

    startTransition(() => {
      // Set cookie for persistence
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      const queryString = searchParams?.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      
      router.replace(targetUrl, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-full text-xs font-medium border border-[#E2DDD5]">
      <div className="pl-1.5 pr-0.5 text-[#5B665F]">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleToggle('vi')}
        aria-label="Chuyển sang tiếng Việt"
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === 'vi'
            ? 'bg-[#194D42] text-white font-semibold shadow-xs'
            : 'text-[#202723] hover:text-[#194D42]'
        }`}
      >
        VI
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleToggle('en')}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === 'en'
            ? 'bg-[#194D42] text-white font-semibold shadow-xs'
            : 'text-[#202723] hover:text-[#194D42]'
        }`}
      >
        EN
      </button>
    </div>
  );
}

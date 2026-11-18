import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import { Compass } from 'lucide-react';
import AccountActions from '@/components/auth/AccountActions';

export default async function Header() {
  const t = await getTranslations('navigation');
  const tCommon = await getTranslations('common');
  const tBlog = await getTranslations('blog');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F7F3]/90 backdrop-blur-md border-b border-[#E2DDD5]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-hidden focus:ring-2 focus:ring-[#194D42] rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-[#194D42] text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-[#194D42]">
            Viet<span className="text-[#C87956]">Explore</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/provinces"
            className="text-sm font-medium text-[#202723] hover:text-[#194D42] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#194D42] rounded-sm py-1"
          >
            {t('provinces')}
          </Link>
          <Link
            href="/destinations"
            className="text-sm font-medium text-[#202723] hover:text-[#194D42] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#194D42] rounded-sm py-1"
          >
            {t('destinations')}
          </Link>
          <Link
            href="/explore"
            className="text-sm font-medium text-[#202723] hover:text-[#194D42] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#194D42] rounded-sm py-1"
          >
            {t('explore')}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-[#202723] hover:text-[#194D42] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#194D42] rounded-sm py-1">{tBlog('nav')}</Link>
        </nav>

        {/* Actions & Language Switcher */}
        <div className="flex items-center gap-3">
          <AccountActions />
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <MobileMenu
            t={{
              home: t('home'),
              provinces: t('provinces'),
              destinations: t('destinations'),
              explore: t('explore'),
              menu: t('menu'),
              close: tCommon('close'),
              blog: tBlog('nav'),
            }}
          />
        </div>
      </div>
    </header>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Compass, MapPin, Sparkles, Home } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  t: {
    home: string;
    provinces: string;
    destinations: string;
    explore: string;
    menu: string;
    close: string;
    blog: string;
  };
}

export default function MobileMenu({ t }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle Escape key & body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.menu}
        className="p-2 text-[#202723] hover:text-[#194D42] focus:outline-hidden focus:ring-2 focus:ring-[#194D42] rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-4/5 max-w-xs h-full bg-[#F8F7F3] border-l border-[#E2DDD5] p-6 shadow-xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD5]">
                <span className="font-serif text-xl font-bold tracking-tight text-[#194D42]">
                  VietExplore
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label={t.close}
                  className="p-1.5 text-[#5B665F] hover:text-[#202723] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                <Link href="/blog" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-accent"><Compass className="size-4" />{t.blog}</Link>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/'
                      ? 'bg-[#194D42] text-white'
                      : 'text-[#202723] hover:bg-[#EFECE6]'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {t.home}
                </Link>

                <Link
                  href="/provinces"
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/provinces')
                      ? 'bg-[#194D42] text-white'
                      : 'text-[#202723] hover:bg-[#EFECE6]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {t.provinces}
                </Link>

                <Link
                  href="/destinations"
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/destinations')
                      ? 'bg-[#194D42] text-white'
                      : 'text-[#202723] hover:bg-[#EFECE6]'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  {t.destinations}
                </Link>

                <Link
                  href="/explore"
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/explore')
                      ? 'bg-[#194D42] text-white'
                      : 'text-[#202723] hover:bg-[#EFECE6]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.explore}
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E2DDD5]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5B665F]">Ngôn ngữ / Language</span>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

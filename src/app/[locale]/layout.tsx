import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, Lora } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Lora({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isVi = locale === 'vi';
  const title = isVi
    ? 'VietExplore — Cẩm nang Khám phá Du lịch 34 Tỉnh thành Việt Nam'
    : 'VietExplore — Discover Vietnam across 34 Provinces & Cities';
  const description = isVi
    ? 'Cẩm nang du lịch biên soạn tinh tế, chất lượng tạp chí trên 34 đơn vị hành chính mới của Việt Nam.'
    : 'An editorial discovery guide to the natural wonders and heritage across Vietnam’s 34 newly organized provinces and cities.';

  return {
    title,
    description,
    metadataBase: new URL('https://vietexplore.vercel.app'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        vi: '/vi',
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      siteName: 'VietExplore',
      locale: isVi ? 'vi_VN' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`h-full scroll-smooth ${sansFont.variable} ${serifFont.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F3] text-[#202723] font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

interface PageMetadataOptions {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
}

export function createPageMetadata({ locale, path, title, description, image }: PageMetadataOptions): Metadata {
  const pageTitle = `${title} — VietExplore`;
  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        vi: `/vi${path}`,
        en: `/en${path}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: `/${locale}${path}`,
      siteName: 'VietExplore',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
  };
}

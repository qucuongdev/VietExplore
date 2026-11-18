'use client';

import { useState } from 'react';
import { ImageAsset, Locale } from '@/types/content';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import ModalDialog from '@/components/ui/ModalDialog';
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, X, ZoomIn } from 'lucide-react';

interface DestinationGalleryProps {
  images: ImageAsset[];
  destinationName: string;
  locale: Locale;
}

export default function DestinationGallery({
  images,
  destinationName,
  locale,
}: DestinationGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-16/9 md:aspect-18/9 max-h-[560px] w-full bg-[#EFECE6] overflow-hidden rounded-t-3xl">
        <ImageWithFallback
          src={null}
          alt={destinationName}
          fallbackTitle={destinationName}
          fill
        />
      </div>
    );
  }

  return (
    <GalleryWithImages
      key={images.map((image) => image.src).join('|')}
      images={images}
      destinationName={destinationName}
      locale={locale}
    />
  );
}

function GalleryWithImages({ images, destinationName, locale }: DestinationGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeImage = images[activeIndex] || images[0];
  const total = images.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Main Feature Image Container (Clickable to open Lightbox) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
        aria-label={locale === 'vi' ? 'Nhấp để xem ảnh toàn màn hình' : 'Click to view full image'}
        className="group relative aspect-16/9 md:aspect-18/9 max-h-[560px] w-full bg-[#1A1A1A] overflow-hidden rounded-t-3xl cursor-zoom-in focus:outline-hidden focus:ring-2 focus:ring-[#194D42]"
      >
        <ImageWithFallback
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt[locale] || destinationName}
          fallbackTitle={destinationName}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-102"
        />

        {/* Floating Zoom / Fullscreen Button & Counter */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium transition-all shadow-md focus:outline-hidden focus:ring-2 focus:ring-white"
            title={locale === 'vi' ? 'Xem toàn ảnh (toàn màn hình)' : 'View full image'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{locale === 'vi' ? 'Xem toàn ảnh' : 'View full'}</span>
            <span className="text-white/70">
              ({activeIndex + 1}/{total})
            </span>
          </button>
        </div>

        {/* Hover Hint Overlay in Center */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium shadow-lg">
            <ZoomIn className="w-4 h-4" />
            {locale === 'vi' ? 'Nhấp để xem kích thước đầy đủ' : 'Click to view full size'}
          </span>
        </div>

        {/* Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label={locale === 'vi' ? 'Ảnh trước' : 'Previous photo'}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-10 focus:outline-hidden focus:ring-2 focus:ring-white shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label={locale === 'vi' ? 'Ảnh kế tiếp' : 'Next photo'}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-10 focus:outline-hidden focus:ring-2 focus:ring-white shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Caption & License Credit Bar */}
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs sm:text-sm text-white/95 font-medium max-w-xl line-clamp-1">
            {activeImage.alt[locale] || destinationName}
          </p>

          {activeImage.sourceUrl && (
            <a
              href={activeImage.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-white/80 hover:text-white transition-colors shrink-0"
              title={locale === 'vi' ? 'Xem nguồn ảnh gốc' : 'View original photo source'}
              onClick={(e) => e.stopPropagation()}
            >
              <span>{activeImage.photographer || 'Photo Contributor'}</span>
              <span>•</span>
              <span className="underline">{activeImage.licenseName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Thumbnails Strip (if > 1 image) */}
      {total > 1 && (
        <div className="flex items-center gap-3 p-3 bg-[#EFECE6] border-t border-[#E2DDD5] overflow-x-auto scrollbar-none">
          {images.map((img, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={img.src + idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  isCurrent
                    ? 'border-[#194D42] shadow-md scale-102 ring-2 ring-[#194D42]/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`Xem ảnh ${idx + 1}`}
              >
                <ImageWithFallback
                  src={img.src}
                  alt={img.alt[locale] || destinationName}
                  fallbackTitle={`${destinationName} ${idx + 1}`}
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <ModalDialog
          label={activeImage.alt[locale] || destinationName}
          className="fixed inset-0 m-0 w-screen h-dvh max-w-none max-h-none border-0 p-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
          onClose={() => setIsLightboxOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              if (event.key === 'ArrowLeft') handlePrev();
              else handleNext();
            }
          }}
        >
          {/* Lightbox Top Header */}
          <div
            className="flex items-center justify-between p-4 sm:p-6 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-white">
              <h3 className="text-sm sm:text-base font-semibold truncate max-w-xs sm:max-w-md text-white/90">
                {destinationName}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono text-white/80">
                {activeIndex + 1} / {total}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
              aria-label={locale === 'vi' ? 'Đóng (phím Esc)' : 'Close (Esc key)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Stage (Uncropped Full Image View) */}
          <div
            className="relative flex-1 flex items-center justify-center px-4 sm:px-16 py-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[72vh] sm:max-h-[78vh] flex items-center justify-center">
              <ImageWithFallback
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt[locale] || destinationName}
                fallbackTitle={destinationName}
                fill
                priority
                sizes="100vw"
                objectFit="contain"
                className="object-contain w-full h-full drop-shadow-2xl"
              />
            </div>

            {/* Prev/Next buttons in Lightbox */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={locale === 'vi' ? 'Ảnh trước' : 'Previous image'}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-colors z-20 focus:outline-hidden focus:ring-2 focus:ring-white shadow-lg"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={locale === 'vi' ? 'Ảnh kế tiếp' : 'Next image'}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-colors z-20 focus:outline-hidden focus:ring-2 focus:ring-white shadow-lg"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer: Full Caption, Credit & Thumbnails */}
          <div
            className="p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption & Source */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-5xl mx-auto w-full text-center sm:text-left">
              <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">
                {activeImage.alt[locale] || destinationName}
              </p>

              {activeImage.sourceUrl && (
                <a
                  href={activeImage.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs text-white/70 hover:text-white transition-colors shrink-0"
                >
                  <span>{activeImage.photographer || 'Photo Contributor'}</span>
                  <span>•</span>
                  <span className="underline">{activeImage.licenseName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Lightbox Thumbnails Strip */}
            {total > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1 overflow-x-auto scrollbar-none max-w-4xl mx-auto w-full">
                {images.map((img, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={img.src + idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative w-14 h-10 sm:w-18 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        isCurrent
                          ? 'border-white scale-105 shadow-md ring-2 ring-white/50 opacity-100'
                          : 'border-white/20 opacity-40 hover:opacity-80'
                      }`}
                      aria-label={`Xem ảnh ${idx + 1}`}
                    >
                      <ImageWithFallback
                        src={img.src}
                        alt={img.alt[locale] || destinationName}
                        fallbackTitle={`${destinationName} ${idx + 1}`}
                        fill
                        className="w-full h-full object-cover"
                        sizes="72px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </ModalDialog>
      )}
    </div>
  );
}

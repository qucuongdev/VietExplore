'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Compass, ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | null;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className = '',
  objectFit = 'cover',
  fill,
  width,
  height,
  priority,
  sizes,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showFallback = !src || hasError;

  if (showFallback) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#194D42]/15 via-[#E8F0EC] to-[#C87956]/15 border border-[#E2DDD5] text-[#5B665F] p-2 text-center overflow-hidden ${
          fill ? 'w-full h-full' : ''
        } ${className}`}
        style={fill ? undefined : { width: width || '100%', height: height || '100%' }}
        role="img"
        aria-label={alt}
      >
        <div className="w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#194D42] mb-1 shadow-xs">
          {src ? <ImageOff className="w-3.5 h-3.5 text-[#5B665F]" /> : <Compass className="w-3.5 h-3.5 text-[#194D42]" />}
        </div>
        {fallbackTitle && (
          <span className="text-[11px] font-semibold text-[#202723] line-clamp-1 max-w-[90%]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${
          fill ? `${objectFit === 'contain' ? 'object-contain' : 'object-cover'} w-full h-full` : ''
        }`}
        {...rest}
      />
    </div>
  );
}

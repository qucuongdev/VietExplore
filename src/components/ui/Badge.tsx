import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle';
}

export function Badge({
  className,
  variant = 'subtle',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-[#194D42] text-white',
    secondary: 'bg-[#C87956] text-white',
    outline: 'border border-[#E2DDD5] text-[#202723] bg-white',
    subtle: 'bg-[#E8F0EC] text-[#194D42]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

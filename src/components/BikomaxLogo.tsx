import React, { useState } from 'react';
import logoBlack from '../assets/logo.png';
import logoWhite from '../assets/logo-white.png';

interface BikomaxLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'adaptive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BikomaxLogo: React.FC<BikomaxLogoProps> = ({
  className = '',
  variant = 'adaptive',
  size = 'md',
  showTagline = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9 md:h-10',
    lg: 'h-10 sm:h-12 md:h-14',
    xl: 'h-16 sm:h-20',
  }[size];

  // If showTagline is explicitly false, clip to the top wordmark portion
  const cropWrapper = !showTagline ? 'overflow-hidden max-h-[64%]' : '';

  if (!imageError) {
    if (variant === 'light') {
      return (
        <div className={`inline-flex items-center ${cropWrapper} ${className}`}>
          <img
            src={logoWhite}
            alt="BIKOMAX - Flawless • Functional • Refined"
            className={`${sizeClasses} w-auto object-contain select-none`}
            onError={() => setImageError(true)}
            loading="eager"
          />
        </div>
      );
    }

    if (variant === 'dark') {
      return (
        <div className={`inline-flex items-center ${cropWrapper} ${className}`}>
          <img
            src={logoBlack}
            alt="BIKOMAX - Flawless • Functional • Refined"
            className={`${sizeClasses} w-auto object-contain select-none`}
            onError={() => setImageError(true)}
            loading="eager"
          />
        </div>
      );
    }

    // Adaptive variant
    return (
      <div className={`inline-flex items-center ${cropWrapper} ${className}`}>
        <img
          src={logoBlack}
          alt="BIKOMAX - Flawless • Functional • Refined"
          className={`${sizeClasses} w-auto object-contain select-none dark:hidden`}
          onError={() => setImageError(true)}
          loading="eager"
        />
        <img
          src={logoWhite}
          alt="BIKOMAX - Flawless • Functional • Refined"
          className={`${sizeClasses} w-auto object-contain select-none hidden dark:block`}
          onError={() => setImageError(true)}
          loading="eager"
        />
      </div>
    );
  }

  // Fallback if image fails to load
  const textColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-[#0A0A0A]'
      : 'text-[#0A0A0A] dark:text-white';

  const taglineColor =
    variant === 'light'
      ? 'text-neutral-300'
      : variant === 'dark'
      ? 'text-neutral-700'
      : 'text-neutral-600 dark:text-neutral-300';

  const fallbackSizes = {
    sm: {
      brand: 'text-lg tracking-[-0.03em] font-black',
      tagline: 'text-[9px] tracking-wider font-medium',
      gap: 'gap-0',
    },
    md: {
      brand: 'text-2xl sm:text-3xl tracking-[-0.04em] font-black',
      tagline: 'text-[11px] sm:text-xs tracking-wide font-normal',
      gap: 'gap-0.5',
    },
    lg: {
      brand: 'text-4xl sm:text-5xl tracking-[-0.04em] font-black',
      tagline: 'text-sm sm:text-base tracking-widest font-normal',
      gap: 'gap-1.5',
    },
    xl: {
      brand: 'text-5xl sm:text-6xl md:text-7xl tracking-[-0.04em] font-black',
      tagline: 'text-base sm:text-lg tracking-[0.2em] font-light',
      gap: 'gap-2',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none font-sans ${fallbackSizes.gap} ${className}`}>
      <span
        style={{ letterSpacing: '-0.04em', fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
        className={`leading-none uppercase font-black ${fallbackSizes.brand} ${textColor}`}
      >
        BIKOMAX
      </span>
      {showTagline && (
        <span
          className={`leading-tight uppercase font-medium flex items-center tracking-normal ${fallbackSizes.tagline} ${taglineColor}`}
        >
          Flawless <span className="mx-1.5 text-amber-500 text-[0.8em] font-bold">·</span> Functional <span className="mx-1.5 text-amber-500 text-[0.8em] font-bold">·</span> Refined
        </span>
      )}
    </div>
  );
};

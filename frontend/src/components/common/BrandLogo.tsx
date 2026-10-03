import React from 'react';
import { brandConfig } from '../../config/brandConfig';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false,
}) => {
  const isLight = variant === 'light';

  // Single shade for the entire "ROYAL PREMIUM WATER" brand typography
  const brandShade = isLight ? 'text-white' : 'text-[#0B2D5C]';
  const subtitleShade = isLight ? 'text-white/80' : 'text-[#0B2D5C]/75';

  const sizeClasses = {
    sm: {
      badge: 'w-7 h-7 sm:w-8 sm:h-8',
      icon: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      mainText: 'text-sm sm:text-base font-extrabold tracking-tight',
      subText: 'text-[7.5px] sm:text-[8.5px] tracking-[0.2em] font-bold',
    },
    md: {
      badge: 'w-9 h-9 sm:w-10 sm:h-10',
      icon: 'w-5 h-5 sm:w-5.5 sm:h-5.5',
      mainText: 'text-base sm:text-lg md:text-xl font-extrabold tracking-tight',
      subText: 'text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.24em] font-bold',
    },
    lg: {
      badge: 'w-12 h-12 sm:w-14 sm:h-14',
      icon: 'w-7 h-7 sm:w-8 sm:h-8',
      mainText: 'text-xl sm:text-2xl md:text-3xl font-black tracking-tight',
      subText: 'text-[10px] sm:text-xs md:text-sm tracking-[0.26em] font-bold',
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Water Bottle Logo Emblem Badge */}
      <div
        className={`relative ${sizeClasses.badge} shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm ${
          isLight
            ? 'bg-white/15 border border-white/30 backdrop-blur-md text-white'
            : 'bg-[#0B2D5C] border border-[#0B2D5C] text-white shadow-[0_4px_14px_rgba(11,45,92,0.18)]'
        }`}
        aria-hidden="true"
      >
        {/* Distinctive Water Bottle Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses.icon}`}
        >
          {/* Bottle Cap (Tamper-evident sealed cap) */}
          <rect
            x="13"
            y="2"
            width="6"
            height="3"
            rx="0.75"
            fill="currentColor"
            opacity="0.95"
          />
          {/* Cap ridges / seal ring */}
          <line x1="14" y1="3.5" x2="18" y2="3.5" stroke={isLight ? '#0B2D5C' : '#00A8C6'} strokeWidth="0.6" strokeLinecap="round" />
          <rect
            x="13.5"
            y="5"
            width="5"
            height="1.2"
            rx="0.4"
            fill="currentColor"
            opacity="0.7"
          />

          {/* Bottle Neck */}
          <path
            d="M14 6.2 L14 8.5 L10.5 12.5 C10.2 12.8 10 13.3 10 13.8 L10 27 C10 28.1 10.9 29 12 29 L20 29 C21.1 29 22 28.1 22 27 L22 13.8 C22 13.3 21.8 12.8 21.5 12.5 L18 8.5 L18 6.2 Z"
            fill={isLight ? 'rgba(255,255,255,0.2)' : 'rgba(0,168,198,0.25)'}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Water Fill Wave Level inside bottle */}
          <path
            d="M10.8 17 C13.5 16 15.5 17.5 18 16.5 C19.5 16 20.8 16.2 21.2 16.5 L21.2 27 C21.2 27.6 20.7 28.2 20 28.2 L12 28.2 C11.3 28.2 10.8 27.6 10.8 27 Z"
            fill={isLight ? '#FFFFFF' : '#00A8C6'}
            opacity={isLight ? '0.85' : '0.9'}
          />

          {/* Ergonomic grip contour lines / ribs on bottle */}
          <path
            d="M12.5 19.5 C14.5 20.2 17.5 20.2 19.5 19.5"
            stroke={isLight ? '#0B2D5C' : '#FFFFFF'}
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M12.5 22.5 C14.5 23.2 17.5 23.2 19.5 22.5"
            stroke={isLight ? '#0B2D5C' : '#FFFFFF'}
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Pure Water Droplet / Sparkle Reflection in Heart of Bottle */}
          <path
            d="M16 12.8 C16 12.8 17.3 14.5 17.3 15.3 C17.3 16 16.7 16.6 16 16.6 C15.3 16.6 14.7 16 14.7 15.3 C14.7 14.5 16 12.8 16 12.8 Z"
            fill="#FFFFFF"
          />
          <circle cx="16.5" cy="14.8" r="0.4" fill="#0B2D5C" opacity="0.6" />

          {/* Bottle Gloss / Shine Highlight */}
          <path
            d="M11.5 14.5 L11.5 26"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Brand Text in ONE UNIFIED SHADE */}
      <div className="flex flex-col justify-center select-none">
        <div className={`font-heading ${sizeClasses.mainText} ${brandShade} leading-tight`}>
          ROYAL PREMIUM WATER
        </div>
        <div className={`uppercase ${sizeClasses.subText} ${subtitleShade} leading-none mt-0.5`}>
          PACKAGED DRINKING WATER
        </div>
        {showTagline && (
          <span
            className={`text-xs mt-1 ${
              isLight ? 'text-white/70' : 'text-[#536579]'
            }`}
          >
            {brandConfig.tagline}
          </span>
        )}
      </div>
    </div>
  );
};

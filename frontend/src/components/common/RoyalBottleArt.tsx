import React, { useId } from 'react';

interface RoyalBottleArtProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showDroplets?: boolean;
  labelVariant?: 'default' | 'gold' | 'compact';
  volumeLabel?: string;
}

export const RoyalBottleArt: React.FC<RoyalBottleArtProps> = ({
  size = 'md',
  className = '',
  showDroplets = true,
  labelVariant = 'default',
  volumeLabel,
}) => {
  const uid = useId().replace(/[:]/g, '');

  const sizeMap = {
    sm: 'w-20 sm:w-24 h-44 sm:h-48',
    md: 'w-28 sm:w-32 md:w-36 h-56 sm:h-60 md:h-64',
    lg: 'w-44 sm:w-52 h-[320px] sm:h-[370px]',
    hero: 'w-52 sm:w-68 md:w-84 h-[380px] sm:h-[460px] md:h-[540px]',
  };

  const capGradId = `capGrad_${uid}`;
  const capHighId = `capHigh_${uid}`;
  const bottleGradId = `bottleGrad_${uid}`;
  const waterLvlId = `waterLvl_${uid}`;
  const labelGradId = `labelGrad_${uid}`;
  const goldGradId = `goldGrad_${uid}`;
  const shadowId = `shadow_${uid}`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      role="img"
      aria-label={`Royal Premium Water bottled product display - ${volumeLabel || 'available sizes'}`}
    >
      {/* Background Soft Aqua Glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-radial from-[#00A8C6]/20 via-[#1557A6]/10 to-transparent blur-2xl scale-110 pointer-events-none" />

      {/* SVG Royal Water Bottle */}
      <svg
        viewBox="0 0 240 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_16px_30px_rgba(11,45,92,0.18)] filter transition-transform duration-500 hover:scale-[1.02]"
      >
        <defs>
          {/* Glass & Water Gradients */}
          <linearGradient id={capGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071D3A" />
            <stop offset="30%" stopColor="#0B2D5C" />
            <stop offset="65%" stopColor="#1557A6" />
            <stop offset="100%" stopColor="#071D3A" />
          </linearGradient>

          <linearGradient id={capHighId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8F9FC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1557A6" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={bottleGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8F9FC" stopOpacity="0.75" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E8F9FC" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D9E8F0" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id={waterLvlId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00A8C6" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#00A8C6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1557A6" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id={labelGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#071D3A" />
            <stop offset="45%" stopColor="#0B2D5C" />
            <stop offset="85%" stopColor="#1557A6" />
            <stop offset="100%" stopColor="#071D3A" />
          </linearGradient>

          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B38F22" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#F5D061" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          <filter id={shadowId} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0B2D5C" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* --- WATER CONTENT INSIDE BOTTLE --- */}
        <path
          d="M 64 125 C 64 125, 95 130, 120 130 C 145 130, 176 125, 176 125 L 176 210 C 188 225, 196 245, 198 280 L 198 560 C 198 585, 180 598, 155 600 L 85 600 C 60 598, 42 585, 42 560 L 42 280 C 44 245, 52 225, 64 210 Z"
          fill={`url(#${waterLvlId})`}
        />

        {/* Water Surface Ripple at Top */}
        <ellipse cx="120" cy="128" rx="56" ry="6" fill="#7dd3fc" fillOpacity="0.7" />

        {/* --- BOTTLE GLASS SILHOUETTE --- */}
        <path
          d="M 94 30 L 146 30 L 146 54 L 140 58 L 140 76 C 140 85, 146 95, 154 110 C 168 135, 178 175, 178 210 L 178 220 C 188 235, 198 255, 200 280 L 200 565 C 200 592, 178 605, 150 606 L 90 606 C 62 605, 40 592, 40 565 L 40 280 C 42 255, 52 235, 62 220 L 62 210 C 62 175, 72 135, 86 110 C 94 95, 100 85, 100 76 L 100 58 L 94 54 Z"
          fill={`url(#${bottleGradId})`}
          stroke="#00A8C6"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          filter={`url(#${shadowId})`}
        />

        {/* Ergonomic Grip Ribs / Contours */}
        <path d="M 44 240 Q 120 248 196 240" stroke="#D9E8F0" strokeWidth="2.5" strokeOpacity="0.8" fill="none" />
        <path d="M 44 255 Q 120 263 196 255" stroke="#E8F9FC" strokeWidth="2" strokeOpacity="0.7" fill="none" />
        <path d="M 42 465 Q 120 473 198 465" stroke="#D9E8F0" strokeWidth="2.5" strokeOpacity="0.7" fill="none" />
        <path d="M 42 480 Q 120 488 198 480" stroke="#E8F9FC" strokeWidth="2" strokeOpacity="0.6" fill="none" />
        <path d="M 42 495 Q 120 503 198 495" stroke="#00A8C6" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

        {/* --- ROYAL BLUE CAP --- */}
        {/* Safety Seal Ring */}
        <rect x="94" y="58" width="52" height="6" rx="2" fill="#0B2D5C" />
        <line x1="94" y1="64" x2="146" y2="64" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3,2" />
        
        {/* Main Bottle Cap with Texture Ribs */}
        <rect x="92" y="24" width="56" height="34" rx="4" fill={`url(#${capGradId})`} />
        {/* Vertical Grip Ridges on Cap */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={97 + i * 5.5}
            y1="25"
            x2={97 + i * 5.5}
            y2="57"
            stroke="#1557A6"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
        ))}
        {/* Cap Highlight */}
        <rect x="92" y="24" width="56" height="34" rx="4" fill={`url(#${capHighId})`} />
        <ellipse cx="120" cy="24" rx="28" ry="4" fill="#1557A6" fillOpacity="0.5" />

        {/* --- BOTTLE NECK REFLECTIONS --- */}
        <path
          d="M 102 78 L 102 105 C 92 125, 80 155, 75 190"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />

        {/* Left Edge Light Reflection Strip */}
        <path
          d="M 52 280 L 52 560"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M 60 290 L 60 550"
          stroke="#e0f2fe"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* Right Edge Reflection Strip */}
        <path
          d="M 188 285 L 188 555"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* --- THE SIGNATURE ROYAL PREMIUM WATER LABEL --- */}
        <g id={`label_${uid}`}>
          {/* Label Container Band */}
          <rect
            x="39"
            y="275"
            width="162"
            height="180"
            rx="4"
            fill={`url(#${labelGradId})`}
            stroke="#D4AF37"
            strokeWidth="1.5"
          />

          {/* Golden Upper & Lower Accent Ribbons */}
          <line x1="39" y1="281" x2="201" y2="281" stroke={`url(#${goldGradId})`} strokeWidth="2.5" />
          <line x1="43" y1="285" x2="197" y2="285" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
          
          <line x1="43" y1="445" x2="197" y2="445" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="39" y1="449" x2="201" y2="449" stroke={`url(#${goldGradId})`} strokeWidth="2.5" />

          {/* Royal Crown Crest Emblem */}
          <g transform="translate(120, 310)">
            {/* Crown Motif */}
            <path
              d="M -16 6 L -10 -8 L 0 -1 L 10 -8 L 16 6 Z"
              fill={`url(#${goldGradId})`}
              stroke="#ffffff"
              strokeWidth="0.6"
            />
            {/* Water Drop in Crown Core */}
            <path
              d="M 0 -7 C 2.5 -3, 5 -1, 5 2 C 5 4.8, 2.8 7, 0 7 C -2.8 7, -5 4.8, -5 2 C -5 -1, -2.5 -3, 0 -7 Z"
              fill="#00A8C6"
            />
            {/* Tiny Golden Pearls on Crown Tips */}
            <circle cx="-10" cy="-8" r="1.5" fill="#FFE58F" />
            <circle cx="0" cy="-1" r="1.5" fill="#FFE58F" />
            <circle cx="10" cy="-8" r="1.5" fill="#FFE58F" />
          </g>

          {/* BRAND TITLE "ROYAL" */}
          <text
            x="120"
            y="348"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Outfit', sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="3"
          >
            ROYAL
          </text>

          {/* BRAND SUBTITLE "PREMIUM WATER" */}
          <text
            x="120"
            y="368"
            textAnchor="middle"
            fill="#D4AF37"
            fontFamily="'Manrope', sans-serif"
            fontWeight="700"
            fontSize="10"
            letterSpacing="2.5"
          >
            PREMIUM WATER
          </text>

          {/* Marathi Subtitle / Tagline on Label */}
          <text
            x="120"
            y="388"
            textAnchor="middle"
            fill="#E8F9FC"
            fontFamily="sans-serif"
            fontWeight="600"
            fontSize="9"
            letterSpacing="0.8"
          >
            शुद्ध पाणी • उत्तम जीवन
          </text>

          {/* Decorative Divider */}
          <line x1="75" y1="398" x2="165" y2="398" stroke="#00A8C6" strokeWidth="1" strokeOpacity="0.9" />
          <circle cx="120" cy="398" r="2" fill="#D4AF37" />

          {/* Packaged Drinking Water Label Descriptor */}
          <text
            x="120"
            y="415"
            textAnchor="middle"
            fill="#BFD4E3"
            fontFamily="'Manrope', sans-serif"
            fontWeight="500"
            fontSize="7.5"
            letterSpacing="1"
          >
            PACKAGED DRINKING WATER
          </text>

          {/* Editable Volume Placeholder on Bottle Label */}
          <rect
            x="70"
            y="424"
            width="100"
            height="14"
            rx="3"
            fill="#071D3A"
            fillOpacity="0.8"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
          <text
            x="120"
            y="434"
            textAnchor="middle"
            fill="#FFE58F"
            fontFamily="'Manrope', sans-serif"
            fontWeight="700"
            fontSize="7"
            letterSpacing="0.5"
          >
            {volumeLabel || '[AVAILABLE SIZE]'}
          </text>
        </g>

        {/* --- CONDENSATION WATER DROPLETS --- */}
        {showDroplets && (
          <g id={`droplets_${uid}`} fill="#bae6fd" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.5">
            <ellipse cx="65" cy="235" rx="3.5" ry="4.5" />
            <ellipse cx="78" cy="250" rx="2.5" ry="3" />
            <ellipse cx="170" cy="245" rx="3" ry="4" />
            <ellipse cx="180" cy="270" rx="2" ry="3" />
            <ellipse cx="50" cy="485" rx="3.5" ry="5" />
            <ellipse cx="56" cy="510" rx="2.5" ry="3.5" />
            <ellipse cx="178" cy="495" rx="3" ry="4.5" />
            <ellipse cx="184" cy="530" rx="2" ry="3" />
            <ellipse cx="110" cy="535" rx="2.5" ry="3.5" />
            <ellipse cx="130" cy="545" rx="3.5" ry="4" />
          </g>
        )}

        {/* Base Curvature & Reflection */}
        <path
          d="M 55 585 C 80 600, 160 600, 185 585"
          stroke="#00A8C6"
          strokeWidth="3"
          strokeOpacity="0.6"
          fill="none"
        />
        <ellipse cx="120" cy="595" rx="60" ry="6" fill="#0B2D5C" fillOpacity="0.25" />
      </svg>

      {/* Ambient Floating Water Particles */}
      {size === 'hero' && (
        <>
          <div className="absolute top-1/4 -left-3 sm:-left-6 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#00A8C6]/30 blur-xs animate-float" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-1/2 -right-3 sm:-right-6 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#1557A6]/25 blur-xs animate-float" style={{ animationDelay: '1.2s' }} />
          <div className="absolute bottom-16 -left-2 sm:-left-4 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#00A8C6]/35 blur-xs animate-float" style={{ animationDelay: '2.1s' }} />
        </>
      )}
    </div>
  );
};

import React from 'react';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  fillColor?: string;
  className?: string;
  height?: number;
  inverted?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  position = 'bottom',
  fillColor = '#ffffff',
  className = '',
  height = 48,
  inverted = false,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className} ${
        position === 'top' ? 'rotate-180 -mb-1' : '-mt-1'
      }`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{ height: `${height}px` }}
      >
        <path
          d={
            inverted
              ? 'M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z'
              : 'M0,0 C200,80 400,-20 600,60 C800,140 1000,20 1200,50 L1200,120 L0,120 Z'
          }
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

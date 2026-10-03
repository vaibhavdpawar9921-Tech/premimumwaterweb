import React from 'react';
import { Language } from '../../types';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  language: Language;
  onToggle: (lang: Language) => void;
  variant?: 'light' | 'dark';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  onToggle,
  variant = 'dark',
  className = '',
}) => {
  const isLight = variant === 'light';

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
        isLight
          ? 'bg-white/10 border border-white/20 text-white'
          : 'bg-[#F5FAFC] border border-[#D9E8F0] text-[#102033]'
      } ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="pl-1.5 pr-1 text-[#00A8C6] flex items-center">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => onToggle('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? isLight
              ? 'bg-white text-[#0B2D5C] shadow-xs font-bold'
              : 'bg-[#0B2D5C] text-white shadow-xs font-bold'
            : isLight
            ? 'text-white/80 hover:text-white'
            : 'text-[#536579] hover:text-[#1557A6]'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => onToggle('mr')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          language === 'mr'
            ? isLight
              ? 'bg-[#D4AF37] text-[#071D3A] shadow-xs font-bold'
              : 'bg-[#0B2D5C] text-white shadow-xs font-bold'
            : isLight
            ? 'text-white/80 hover:text-white'
            : 'text-[#536579] hover:text-[#1557A6]'
        }`}
        aria-pressed={language === 'mr'}
      >
        मराठी
      </button>
    </div>
  );
};

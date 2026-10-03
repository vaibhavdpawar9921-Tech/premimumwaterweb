import React, { useEffect } from 'react';
import { X, Image as ImageIcon, Tag } from 'lucide-react';
import { GalleryItem, Language } from '../../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  language: Language;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  language,
}) => {
  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isEn = language === 'en';
  const title = isEn ? item.titleEn : item.titleMr;
  const desc = isEn ? item.descriptionEn : item.descriptionMr;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D3A]/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#071D3A] border border-[#1557A6]/40 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Box */}
        <div className="relative w-full h-72 sm:h-96 bg-gradient-to-br from-[#071D3A] via-[#0B2D5C] to-[#1557A6] flex flex-col items-center justify-center p-8 text-center border-b border-[#1557A6]/30">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#00A8C6] mb-4 shadow-lg">
            <ImageIcon className="w-10 h-10" />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] bg-[#071D3A]/80 px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 mb-2">
            {item.imagePlaceholderNote}
          </p>
          <span className="text-[11px] text-[#BFD4E3]">
            Brand Asset Preview • Royal Premium Water Official Visual
          </span>
        </div>

        {/* Details Footer */}
        <div className="p-6 text-white space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#00A8C6]/20 text-[#00A8C6] border border-[#00A8C6]/30">
              <Tag className="w-3 h-3" />
              {item.category}
            </span>
          </div>
          <h3 className="text-xl font-bold font-heading text-white">{title}</h3>
          <p className="text-sm text-[#BFD4E3] leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

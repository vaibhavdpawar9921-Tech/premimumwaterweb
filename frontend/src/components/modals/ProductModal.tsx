import React, { useEffect } from 'react';
import { X, Check, MessageCircle, Send } from 'lucide-react';
import { ProductItem, Language } from '../../types';
import { translations } from '../../data/translations';
import { RoyalBottleArt } from '../common/RoyalBottleArt';
import { getWhatsAppUrl } from '../../config/brandConfig';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  language: Language;
  onEnquireNow: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  language,
  onEnquireNow,
}) => {
  useEffect(() => {
    if (!product) return;

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
  }, [product, onClose]);

  if (!product) return null;

  const t = translations[language].products;
  const isEn = language === 'en';

  const name = isEn ? product.nameEn : product.nameMr;
  const tagline = isEn ? product.taglineEn : product.taglineMr;
  const description = isEn ? product.descriptionEn : product.descriptionMr;
  const features = isEn ? product.featuresEn : product.featuresMr;
  const badge = isEn ? product.badgeEn : product.badgeMr;

  const handleWhatsApp = () => {
    const msg = `Hello Royal Premium Water, I would like to enquire about ${product.nameEn} (${product.sizePlaceholder}).`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071D3A] via-[#0B2D5C] to-[#1557A6] text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
                {product.code}
              </span>
              {badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00A8C6]/20 text-[#E8F9FC] border border-[#00A8C6]/30">
                  {badge}
                </span>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-heading mt-1">{name}</h3>
            <p className="text-xs text-[#E8F9FC] mt-1">{tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#BFD4E3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Bottle Visual Column */}
            <div className="md:col-span-5 flex flex-col items-center justify-center py-4 bg-radial from-[#E8F9FC] to-[#F5FAFC] rounded-2xl border border-[#D9E8F0]">
              <RoyalBottleArt
                size="md"
                volumeLabel={product.sizePlaceholder}
                className="transform hover:scale-105 transition-transform duration-300"
              />
              <div className="mt-4 px-3 py-1 rounded-full bg-[#0B2D5C] text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/40">
                {product.sizePlaceholder}
              </div>
            </div>

            {/* Information Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#0B2D5C] uppercase tracking-wider">
                  Product Overview
                </h4>
                <p className="text-sm text-[#536579] mt-1 leading-relaxed">
                  {description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#0B2D5C] uppercase tracking-wider mb-2">
                  Key Specifications
                </h4>
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-[#536579]">
                      <div className="w-4 h-4 rounded-full bg-[#E8F9FC] text-[#00A8C6] flex items-center justify-center shrink-0 border border-[#D9E8F0]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-[#102033]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#E8F9FC] border border-[#D9E8F0] rounded-xl text-[11px] text-[#0B2D5C] leading-snug">
                {t.placeholderNotice}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-6 border-t border-[#D9E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl border border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Inquiry</span>
            </button>

            <div className="w-full sm:w-auto flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-3 min-h-[44px] rounded-xl text-[#536579] hover:bg-[#F5FAFC] text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.closeModal}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEnquireNow(name);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.enquireBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

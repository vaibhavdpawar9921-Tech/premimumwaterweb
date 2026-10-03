import React from 'react';
import { ArrowRight, Info, Sparkles } from 'lucide-react';
import { RoyalBottleArt } from '../components/common/RoyalBottleArt';
import { useAdminData } from '../context/AdminDataContext';
import { ProductItem, Language } from '../types';
import { translations } from '../data/translations';

interface ProductsSectionProps {
  language: Language;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  language,
  onSelectProduct,
  onEnquireProduct,
}) => {
  const { products } = useAdminData();
  const t = translations[language].products;
  const isEn = language === 'en';

  return (
    <section id="products" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] text-xs font-bold uppercase tracking-wider">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D5C] font-heading tracking-tight">
            {t.heading}
          </h2>
          <p className="text-[#536579] text-sm sm:text-base">
            {t.subheading}
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const name = isEn ? product.nameEn : product.nameMr;
            const tagline = isEn ? product.taglineEn : product.taglineMr;
            const badge = isEn ? product.badgeEn : product.badgeMr;

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#D9E8F0] shadow-xs hover:shadow-[0_10px_30px_rgba(11,45,92,0.08)] hover:border-[#00A8C6] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge & Code */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold text-[#1557A6] uppercase">
                      {product.code}
                    </span>
                    {badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0]">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Bottle Visual Canvas */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProduct(product);
                      }
                    }}
                    aria-label={`View detailed specifications for ${name}`}
                    className="w-full h-64 sm:h-72 bg-[#F5FAFC] rounded-2xl flex items-center justify-center border border-[#D9E8F0] group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer relative overflow-hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00A8C6]"
                  >
                    <div className="absolute inset-0 bg-radial from-[#E8F9FC] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <RoyalBottleArt
                      size="md"
                      volumeLabel={product.sizePlaceholder}
                    />
                  </div>

                  {/* Size Placeholder Badge (Editable template) */}
                  <div className="mt-5">
                    <span className="inline-block text-xs font-mono font-bold text-[#1557A6] bg-[#E8F9FC] border border-[#D9E8F0] px-2.5 py-1 rounded-md">
                      {product.sizePlaceholder}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xl font-bold text-[#0B2D5C] mt-2.5 font-heading">
                    {name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#536579] mt-1 leading-relaxed">
                    {tagline}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-[#D9E8F0] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 min-h-[44px] rounded-xl border border-[#1557A6] text-[#1557A6] hover:bg-[#1557A6] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{t.detailsBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEnquireProduct(name)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3 min-h-[44px] rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>{t.enquireBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Note regarding parameters */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#536579]/70 max-w-xl mx-auto">
            {t.placeholderNotice}
          </p>
        </div>
      </div>
    </section>
  );
};

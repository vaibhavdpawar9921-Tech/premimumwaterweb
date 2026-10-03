import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, Tag } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { GalleryItem, Language } from '../types';
import { translations } from '../data/translations';

interface GallerySectionProps {
  language: Language;
  onSelectImage: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  language,
  onSelectImage,
}) => {
  const { galleryItems } = useAdminData();
  const t = translations[language].gallery;
  const isEn = language === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'products', label: t.categories.products },
    { id: 'brand', label: t.categories.brand },
    { id: 'team', label: t.categories.team },
    { id: 'distribution', label: t.categories.distribution },
    { id: 'social', label: t.categories.social },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] text-xs font-bold uppercase tracking-wider">
            <span>Visual Glimpses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D5C] font-heading tracking-tight">
            {t.heading}
          </h2>
          <p className="text-[#536579] text-sm sm:text-base">
            {t.subheading}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12" role="group" aria-label="Filter gallery by category">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`px-4 py-2.5 min-h-[40px] rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0B2D5C] text-white shadow-xs'
                  : 'bg-[#F5FAFC] text-[#536579] hover:bg-[#E8F9FC] hover:text-[#1557A6] border border-[#D9E8F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const title = isEn ? item.titleEn : item.titleMr;
            const desc = isEn ? item.descriptionEn : item.descriptionMr;

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectImage(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectImage(item);
                  }
                }}
                aria-label={`View full image: ${title}`}
                className="group relative bg-[#071D3A] rounded-[16px] overflow-hidden shadow-xs hover:shadow-[0_10px_30px_rgba(11,45,92,0.08)] transition-all duration-300 cursor-pointer border border-[#D9E8F0] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00A8C6]"
              >
                {/* Visual Canvas Card */}
                <div className="relative h-64 sm:h-72 w-full bg-gradient-to-br from-[#071D3A] via-[#0B2D5C] to-[#1557A6] flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-[#00A8C6] mb-3 border border-white/20 shadow-xs">
                    <ImageIcon className="w-7 h-7" />
                  </div>

                  <span className="font-mono text-[11px] font-bold text-[#D4AF37] bg-[#071D3A]/80 px-3 py-1 rounded-md border border-[#D4AF37]/30">
                    {item.imagePlaceholderNote}
                  </span>

                  {/* Hover Overlay with transparent dark navy overlay rgba(7, 29, 58, 0.65) */}
                  <div className="absolute inset-0 bg-[rgba(7,29,58,0.65)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-[#0B2D5C] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5 text-[#00A8C6]" />
                    </div>
                  </div>
                </div>

                {/* Info Bar at Bottom */}
                <div className="p-5 bg-white border-t border-[#D9E8F0] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A8C6] bg-[#E8F9FC] border border-[#D9E8F0] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#1557A6] font-semibold transition-colors">
                      {t.viewImage} →
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0B2D5C] font-heading pt-1">
                    {title}
                  </h3>
                  <p className="text-xs text-[#536579] line-clamp-1">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

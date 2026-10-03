import React from 'react';
import { ArrowRight, CheckCircle2, Droplets, Sparkles, Award } from 'lucide-react';
import { RoyalBottleArt } from '../components/common/RoyalBottleArt';
import { Language } from '../types';
import { translations } from '../data/translations';
import { brandConfig } from '../config/brandConfig';

interface BrandIntroSectionProps {
  language: Language;
  onKnowStoryClick: () => void;
}

export const BrandIntroSection: React.FC<BrandIntroSectionProps> = ({
  language,
  onKnowStoryClick,
}) => {
  const t = translations[language].brandIntro;

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Bottle Visual Showcase Card */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-[#E8F9FC]/70 via-[#F5FAFC] to-white rounded-3xl p-8 border border-[#D9E8F0] shadow-[0_10px_30px_rgba(11,45,92,0.08)] flex flex-col items-center">
              {/* Top Pill Tag */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0B2D5C] font-bold text-xs shadow-xs border border-[#D9E8F0] mb-6">
                <Droplets className="w-3.5 h-3.5 text-[#00A8C6]" />
                <span>{t.purityTag}</span>
              </div>

              {/* Bottle Render */}
              <div className="py-2">
                <RoyalBottleArt
                  size="lg"
                  volumeLabel="[AVAILABLE SIZE]"
                />
              </div>

              {/* Bottom Tag */}
              <div className="mt-6 w-full text-center py-2.5 px-4 rounded-xl bg-[#0B2D5C] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.qualityBadge}</span>
              </div>
            </div>
          </div>

          {/* Story & Philosophy Text */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00A8C6] bg-[#E8F9FC] border border-[#D9E8F0] px-3.5 py-1 rounded-full">
              <span>Brand Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2D5C] font-heading tracking-tight leading-tight">
              {t.heading}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#536579] leading-relaxed font-normal">
              <p className="font-medium text-[#102033] border-l-4 border-[#00A8C6] pl-4 py-1">
                "{t.body}"
              </p>
              <p className="text-[#536579] text-sm sm:text-base">
                {t.secondaryText}
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#102033]">
                <CheckCircle2 className="w-4 h-4 text-[#00A8C6] shrink-0" />
                <span>Hygienic Bottled Freshness</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#102033]">
                <CheckCircle2 className="w-4 h-4 text-[#00A8C6] shrink-0" />
                <span>Quality-Disciplined Handling</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#102033]">
                <CheckCircle2 className="w-4 h-4 text-[#00A8C6] shrink-0" />
                <span>Reliable Regional Distribution</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#102033]">
                <CheckCircle2 className="w-4 h-4 text-[#00A8C6] shrink-0" />
                <span>Customer-First Business Support</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onKnowStoryClick}
                className="inline-flex items-center gap-2 text-[#0B2D5C] hover:text-[#1557A6] font-bold text-sm group cursor-pointer transition-colors"
              >
                <span>{t.knowStory}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, Sparkles, Droplet, ShieldCheck } from 'lucide-react';
import { RoyalBottleArt } from '../components/common/RoyalBottleArt';
import { WaveDivider } from '../components/common/WaveDivider';
import { Language } from '../types';
import { translations } from '../data/translations';
import { brandConfig } from '../config/brandConfig';

interface HeroSectionProps {
  language: Language;
  onExploreProducts: () => void;
  onBecomeDealer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreProducts,
  onBecomeDealer,
}) => {
  const t = translations[language].hero;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between bg-[#F5FAFC] bg-[linear-gradient(135deg,#F5FAFC_0%,#E8F9FC_50%,#FFFFFF_100%)] pt-28 sm:pt-32 pb-12 overflow-hidden"
    >
      {/* Subtle Background Radial Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] -z-10 rounded-full bg-radial from-[#00A8C6]/15 via-[#1557A6]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 -z-10 rounded-full bg-radial from-[#1557A6]/10 via-[#00A8C6]/10 to-transparent blur-2xl pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-8">
          {/* LEFT COLUMN: Brand Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small Section Label with tiny Gold Accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F9FC] border border-[#D9E8F0] text-[#00A8C6] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#0B2D5C]">{t.badge}</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] font-heading">
              <span className="block text-[#0B2D5C]">{t.heading}</span>
              <span className="block text-[#0B2D5C]">
                {brandConfig.name}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-[#536579] max-w-xl font-normal leading-relaxed">
              {t.supportingText}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-sm shadow-[0_10px_30px_rgba(11,45,92,0.12)] hover:shadow-[0_15px_40px_rgba(11,45,92,0.18)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px]"
              >
                <span>{t.exploreProducts}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBecomeDealer}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-transparent hover:bg-[#1557A6] text-[#1557A6] hover:text-white border-2 border-[#1557A6] font-bold text-sm transition-all duration-200 cursor-pointer min-h-[44px]"
              >
                <span>{t.becomeDealer}</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-md border-t border-[#D9E8F0]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] flex items-center justify-center shrink-0">
                  <Droplet className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2D5C]">{t.quickStatsPurity}</h4>
                  <p className="text-[11px] text-[#536579] leading-snug">{t.quickStatsPurityDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2D5C]">{t.quickStatsSupply}</h4>
                  <p className="text-[11px] text-[#536579] leading-snug">{t.quickStatsSupplyDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Premium Royal Water Bottle Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-6 lg:mt-0">
            {/* Water Environment Layer & Water Splash Circles */}
            <div className="relative w-full max-w-md min-h-[420px] sm:min-h-[500px] flex items-center justify-center py-4">
              {/* Soft Aqua Water Ripple Radii */}
              <div className="absolute inset-4 rounded-full border border-[#00A8C6]/30 animate-ripple pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-[#1557A6]/20 animate-ripple pointer-events-none" style={{ animationDelay: '1.5s' }} />
              <div className="absolute inset-16 rounded-full bg-radial from-[#00A8C6]/15 via-[#1557A6]/10 to-transparent blur-xl pointer-events-none" />

              {/* Floating Royal Bottle Art */}
              <div className="relative z-10 animate-float">
                <RoyalBottleArt
                  size="hero"
                  volumeLabel="[AVAILABLE SIZE]"
                  showDroplets={true}
                />
              </div>

              {/* Badge Overlay */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(11,45,92,0.08)] border border-[#D9E8F0] flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#E8F9FC] text-[#00A8C6] flex items-center justify-center shrink-0 border border-[#D9E8F0]">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase font-bold text-[#00A8C6]">
                    Quality Focus
                  </div>
                  <div className="text-xs font-bold text-[#0B2D5C]">
                    Hygienically Bottled
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Transition Wave */}
      <WaveDivider position="bottom" fillColor="#ffffff" height={40} />
    </section>
  );
};

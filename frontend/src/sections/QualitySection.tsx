import React from 'react';
import {
  Droplets,
  ShieldCheck,
  Microscope,
  Cpu,
  PackageCheck,
  Truck,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { processSteps } from '../data/websiteData';
import { Language } from '../types';
import { translations } from '../data/translations';

interface QualitySectionProps {
  language: Language;
}

const stepIcons: Record<string, LucideIcon> = {
  Droplets: Droplets,
  ShieldCheck: ShieldCheck,
  Microscope: Microscope,
  Cpu: Cpu,
  PackageCheck: PackageCheck,
  Truck: Truck,
};

export const QualitySection: React.FC<QualitySectionProps> = ({ language }) => {
  const t = translations[language].quality;
  const isEn = language === 'en';

  return (
    <section id="quality" className="py-20 md:py-28 bg-[#F5FAFC] relative overflow-hidden border-y border-[#D9E8F0]">
      {/* Ambient Water Rings */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-radial from-[#00A8C6]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-radial from-[#1557A6]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F9FC] border border-[#D9E8F0] text-[#00A8C6] text-xs font-bold uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5" />
            <span>Purity Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2D5C] font-heading tracking-tight">
            {t.heading}
          </h2>
          <p className="text-[#536579] text-sm sm:text-base">
            {t.subheading}
          </p>
        </div>

        {/* Timeline Process Cards */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-[#00A8C6]/20 via-[#1557A6]/30 to-[#00A8C6]/20 -translate-y-6 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {processSteps.map((step) => {
              const Icon = stepIcons[step.icon] || Droplets;
              const title = isEn ? step.titleEn : step.titleMr;
              const desc = isEn ? step.descEn : step.descMr;

              return (
                <div
                  key={step.stepNumber}
                  className="relative group bg-white rounded-2xl p-5 border border-[#D9E8F0] hover:border-[#00A8C6] shadow-xs hover:shadow-[0_10px_30px_rgba(11,45,92,0.08)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-6 h-6 rounded-full bg-[#E8F9FC] border border-[#D9E8F0] text-[#00A8C6] text-xs font-mono font-bold flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#E8F9FC] text-[#1557A6] flex items-center justify-center group-hover:scale-110 transition-transform border border-[#D9E8F0]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-sm font-bold text-[#0B2D5C] font-heading mb-1.5">
                      {title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-[#536579] leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {step.isPlaceholderLabel && (
                    <div className="mt-4 pt-3 border-t border-[#D9E8F0] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[10px] font-mono text-[#D4AF37] font-semibold tracking-wide block">
                        Verified Technology
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ethical Transparency Box */}
        <div className="mt-14 max-w-2xl mx-auto p-5 rounded-2xl bg-white border border-[#D9E8F0] shadow-[0_10px_30px_rgba(11,45,92,0.06)] text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2D5C]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.noteTitle}</span>
          </div>
          <p className="text-xs text-[#536579] leading-relaxed">
            {t.noteDesc}
          </p>
        </div>
      </div>
    </section>
  );
};

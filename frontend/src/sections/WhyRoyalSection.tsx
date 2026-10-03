import React from 'react';
import {
  Sparkles,
  Target,
  ShieldAlert,
  RefreshCw,
  Award,
  HeartHandshake,
  LucideIcon,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhyRoyalSectionProps {
  language: Language;
}

const iconMap: Record<string, LucideIcon> = {
  'Pure & Fresh': Sparkles,
  'Quality Focus': Target,
  'Hygienic Handling': ShieldAlert,
  'Reliable Supply': RefreshCw,
  'Premium Presentation': Award,
  'Customer Focus': HeartHandshake,
  // Marathi mappings
  'शुद्ध आणि ताजे': Sparkles,
  'गुणवत्तेवर लक्ष': Target,
  'स्वच्छतापूर्ण हाताळणी': ShieldAlert,
  'विश्वसनीय पुरवठा': RefreshCw,
  'प्रीमियम प्रेझेंटेशन': Award,
  'ग्राहक समाधान': HeartHandshake,
};

export const WhyRoyalSection: React.FC<WhyRoyalSectionProps> = ({ language }) => {
  const t = translations[language].whyRoyal;

  return (
    <section id="why-royal" className="py-20 md:py-28 bg-[#E8F9FC] relative border-y border-[#D9E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#00A8C6] border border-[#D9E8F0] text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>Brand Strengths</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D5C] font-heading tracking-tight">
            {t.heading}
          </h2>
          <p className="text-[#536579] text-sm sm:text-base">
            {t.subheading}
          </p>
        </div>

        {/* 6 Feature Cards Bento / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, idx) => {
            const Icon = iconMap[feature.title] || Sparkles;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-7 border border-[#D9E8F0] shadow-[0_10px_30px_rgba(11,45,92,0.06)] hover:border-[#00A8C6] hover:shadow-[0_15px_40px_rgba(11,45,92,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] flex items-center justify-center mb-5 group-hover:text-[#1557A6] group-hover:border-[#00A8C6] transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0B2D5C] mb-2 font-heading group-hover:text-[#1557A6] transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#536579] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Subtle bottom accent line on hover */}
                <div className="mt-6 pt-4 border-t border-[#D9E8F0] flex items-center justify-between text-[11px] font-semibold text-[#536579]/70">
                  <span>Standard 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8C6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

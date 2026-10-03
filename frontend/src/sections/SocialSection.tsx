import React from 'react';
import { Instagram, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../config/brandConfig';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SocialSectionProps {
  language: Language;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ language }) => {
  const t = translations[language].social;

  const instagramLink = brandConfig.instagram.includes('[')
    ? 'https://instagram.com'
    : brandConfig.instagram;

  return (
    <section className="py-16 md:py-20 bg-[#071D3A] text-white relative overflow-hidden border-t border-[#1557A6]/30">
      {/* Background Subtle Wave Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-radial from-[#00A8C6]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              {t.connectTag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {t.heading}
            </h2>
            <p className="text-sm text-[#BFD4E3] leading-relaxed">
              {t.subheading}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-pink-600/20 transition-all transform hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span>{t.instagramCta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

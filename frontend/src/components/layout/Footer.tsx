import React from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Instagram,
  ArrowUp,
  ShieldCheck,
  Droplets,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { Language, PageId } from '../../types';
import { translations } from '../../data/translations';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin,
}) => {
  const t = translations[language].footer;
  const navT = translations[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: navT.home },
    { id: 'about', label: navT.about },
    { id: 'products', label: navT.products },
    { id: 'quality', label: navT.quality },
    { id: 'gallery', label: navT.gallery },
    { id: 'dealership', label: navT.dealership },
    { id: 'contact', label: navT.contact },
  ];

  return (
    <footer className="bg-[#071D3A] text-[#BFD4E3] pt-16 pb-12 border-t border-[#1557A6]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1557A6]/30">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="md" />
            <p className="text-sm text-[#D4AF37] font-medium">
              "{brandConfig.tagline}"
            </p>
            <p className="text-xs text-[#BFD4E3] leading-relaxed max-w-sm">
              {brandConfig.brandStoryShort}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={brandConfig.instagram.includes('[') ? '#' : brandConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B2D5C] border border-[#1557A6]/40 flex items-center justify-center text-white hover:text-[#00A8C6] hover:border-[#00A8C6] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B2D5C] border border-[#1557A6]/40 flex items-center justify-center text-white hover:text-[#00A8C6] hover:border-[#00A8C6] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.quickLinks}
              </h4>
            </div>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-white hover:text-[#00A8C6] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.contactUs}
              </h4>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[#BFD4E3]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#00A8C6] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#BFD4E3]/70 text-xs">Phone:</span>
                  <span className="font-mono text-white">{brandConfig.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#BFD4E3]/70 text-xs">WhatsApp:</span>
                  <span className="font-mono text-white">{brandConfig.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00A8C6] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#BFD4E3]/70 text-xs">Email:</span>
                  <span className="font-mono text-white">{brandConfig.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#BFD4E3]/70 text-xs">Address:</span>
                  <span className="text-white">{brandConfig.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BFD4E3]">
          <p>© 2026 Royal Premium Water. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="text-[#BFD4E3] hover:text-[#00A8C6] transition-colors cursor-pointer"
            >
              {t.privacy}
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="text-[#BFD4E3] hover:text-[#00A8C6] transition-colors cursor-pointer"
            >
              {t.terms}
            </button>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-[#D4AF37] hover:text-white transition-colors cursor-pointer font-semibold flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </>
            )}
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#00A8C6] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

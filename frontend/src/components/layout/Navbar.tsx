import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Language, PageId } from '../../types';
import { translations } from '../../data/translations';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenEnquiryModal: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
  onOpenEnquiryModal,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'products', label: t.products },
    { id: 'quality', label: t.quality },
    { id: 'gallery', label: t.gallery },
    { id: 'dealership', label: t.dealership },
    { id: 'contact', label: t.contact },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-[0_4px_20px_rgba(11,45,92,0.06)] border-b border-[#D9E8F0] py-3'
          : 'bg-white/95 backdrop-blur-sm py-4 border-b border-[#D9E8F0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left focus:outline-hidden cursor-pointer"
            aria-label="Royal Premium Water Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#1557A6] bg-[#E8F9FC] font-bold'
                      : 'text-[#102033] hover:text-[#1557A6] hover:bg-[#F5FAFC]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Desktop Actions: Language Switcher + Primary CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher
              language={language}
              onToggle={onLanguageChange}
              variant="dark"
            />

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="p-2.5 rounded-xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] text-[#0B2D5C] hover:text-[#1557A6] transition-colors cursor-pointer"
                title="Admin Portal Login"
                aria-label="Admin Portal Login"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenEnquiryModal}
              className="inline-flex items-center gap-2 bg-[#0B2D5C] hover:bg-[#1557A6] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{t.enquireNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button + Mobile Lang Switcher */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher
              language={language}
              onToggle={onLanguageChange}
              variant="dark"
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#102033] hover:text-[#1557A6] hover:bg-[#F5FAFC] transition-colors focus:outline-hidden cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="lg:hidden fixed inset-0 top-[65px] bg-[#071D3A]/40 backdrop-blur-xs z-30 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-nav-menu"
            className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-[#D9E8F0] shadow-xl transition-all duration-300 z-40 animate-in slide-in-from-top-2 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
              <nav className="grid grid-cols-1 gap-1" aria-label="Mobile Navigation">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#E8F9FC] text-[#1557A6]'
                          : 'text-[#102033] hover:bg-[#F5FAFC] hover:text-[#1557A6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#1557A6]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-[#D9E8F0] space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiryModal();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold py-3.5 px-4 rounded-xl shadow-md text-sm cursor-pointer transition-all active:scale-[0.99]"
                >
                  <span>{t.enquireNow}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`tel:${brandConfig.phone.replace(/[^0-9+]/g, '')}`}
                    className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#F5FAFC] hover:bg-[#E8F9FC] rounded-lg text-[#102033] font-medium transition-colors border border-[#D9E8F0]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#1557A6]" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-medium transition-colors border border-emerald-200/60"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 bg-[#E8F9FC] hover:bg-[#d6f3f8] text-[#0B2D5C] rounded-lg text-xs font-bold transition-colors border border-[#00A8C6]/30 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00A8C6]" />
                    <span>Admin Portal Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

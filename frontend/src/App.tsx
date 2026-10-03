/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { HeroSection } from './sections/HeroSection';
import { BrandIntroSection } from './sections/BrandIntroSection';
import { WhyRoyalSection } from './sections/WhyRoyalSection';
import { ProductsSection } from './sections/ProductsSection';
import { QualitySection } from './sections/QualitySection';
import { DealershipSection } from './sections/DealershipSection';
import { GallerySection } from './sections/GallerySection';
import { TeamSection } from './sections/TeamSection';
import { SocialSection } from './sections/SocialSection';
import { ContactSection } from './sections/ContactSection';
import { DealershipModal } from './components/modals/DealershipModal';
import { ProductModal } from './components/modals/ProductModal';
import { LightboxModal } from './components/modals/LightboxModal';
import { LegalModal } from './components/modals/LegalModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useAdminData } from './context/AdminDataContext';
import { Language, ProductItem, GalleryItem } from './types';
import { brandConfig } from './config/brandConfig';

export default function App() {
  const { adminUser, isAdminViewOpen, setIsAdminViewOpen } = useAdminData();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals state
  const [isDealershipModalOpen, setIsDealershipModalOpen] = useState(false);
  const [dealershipPreselectedProduct, setDealershipPreselectedProduct] = useState<
    string | undefined
  >(undefined);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenAdmin = () => {
    if (adminUser) {
      setIsAdminViewOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Smooth scroll to section
  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Open dealership enquiry modal
  const handleOpenEnquiryModal = (productName?: string) => {
    setDealershipPreselectedProduct(productName);
    setIsDealershipModalOpen(true);
  };

  // Setup ScrollSpy with IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'why-royal',
      'products',
      'quality',
      'dealership',
      'gallery',
      'team',
      'contact',
    ];

    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            // Map 'why-royal' to 'about' in navbar if desired or keep track
            const mappedId = id === 'why-royal' ? 'about' : id;
            setActiveSection(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // If Admin is logged in and in Admin View, show full Admin Dashboard
  if (adminUser && isAdminViewOpen) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#536579] selection:bg-[#00A8C6] selection:text-white font-sans antialiased">
      {/* Top Professional Sticky Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenEnquiryModal={() => handleOpenEnquiryModal()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          language={language}
          onExploreProducts={() => handleNavigate('products')}
          onBecomeDealer={() => handleNavigate('dealership')}
        />

        {/* 2. Brand Introduction Section */}
        <BrandIntroSection
          language={language}
          onKnowStoryClick={() => handleNavigate('quality')}
        />

        {/* 3. Why Royal Strengths */}
        <WhyRoyalSection language={language} />

        {/* 4. Products Portfolio Section */}
        <ProductsSection
          language={language}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onEnquireProduct={(productName) => handleOpenEnquiryModal(productName)}
        />

        {/* 5. Quality & Process Timeline Section */}
        <QualitySection language={language} />

        {/* 6. Distribution & Dealership Section */}
        <DealershipSection language={language} />

        {/* 7. Gallery Section */}
        <GallerySection
          language={language}
          onSelectImage={(item) => setSelectedGalleryItem(item)}
        />

        {/* 8. Leadership & Team Section */}
        <TeamSection language={language} />

        {/* 9. Social Follow Section */}
        <SocialSection language={language} />

        {/* 10. Contact & Location Section */}
        <ContactSection language={language} />
      </main>

      {/* Global Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp language={language} />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Dealership / Order Enquiry Modal */}
      <DealershipModal
        isOpen={isDealershipModalOpen}
        onClose={() => {
          setIsDealershipModalOpen(false);
          setDealershipPreselectedProduct(undefined);
        }}
        language={language}
        preselectedProduct={dealershipPreselectedProduct}
      />

      {/* Product Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        language={language}
        onEnquireNow={(productName) => handleOpenEnquiryModal(productName)}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        language={language}
      />

      {/* Legal Information Modal (Privacy Policy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}

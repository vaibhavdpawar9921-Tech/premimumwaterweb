import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { brandConfig } from '../../config/brandConfig';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D3A]/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D9E8F0] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#071D3A] via-[#0B2D5C] to-[#1557A6] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isPrivacy ? (
              <ShieldCheck className="w-5 h-5 text-[#00A8C6]" />
            ) : (
              <FileText className="w-5 h-5 text-[#D4AF37]" />
            )}
            <h3 className="text-lg font-bold font-heading text-white">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#BFD4E3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto text-[#536579] text-sm space-y-4 leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="font-semibold text-[#0B2D5C]">
                Effective Date: 2026 • Royal Premium Water
              </p>
              <p>
                Royal Premium Water values your trust and is dedicated to protecting your privacy.
                This Privacy Policy describes how we handle information collected through our
                website and direct distribution enquiry forms.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">1. Information We Collect</h4>
              <p>
                When you submit a dealership enquiry or contact us via WhatsApp or phone, we collect
                details such as your name, business name, mobile phone number, email address, and city.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">2. Use of Information</h4>
              <p>
                We use this information solely to process business requests, verify territorial
                distribution availability, respond to inquiries, and ensure customer service quality.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">3. Data Protection & Confidentiality</h4>
              <p>
                We do not sell, trade, or rent your personal or business information to third
                parties. All communication is held in strict commercial confidence.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">4. Contact Channels</h4>
              <p>
                For privacy inquiries or data update requests, you can contact our administrative
                office at {brandConfig.email} or {brandConfig.phone}.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#0B2D5C]">
                Last Updated: 2026 • Royal Premium Water
              </p>
              <p>
                By accessing this website, submitting distribution enquiries, or ordering packaged
                drinking water products from Royal Premium Water, you agree to comply with the
                following terms and conditions.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">1. Brand Identity & Trademarks</h4>
              <p>
                The name "Royal Premium Water", logos, bottle visual trademarks, and website content
                are the intellectual property of the brand. Unauthorized commercial duplication is
                prohibited.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">2. Distribution & Dealership Terms</h4>
              <p>
                Submission of a dealership enquiry does not constitute a confirmed franchise,
                dealership, or exclusive territory grant. Territory allocations and commercial
                supply agreements are formalized through explicit written contract between both
                parties.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">3. Product Handling & Storage</h4>
              <p>
                Packaged drinking water products must be stored in cool, clean, and hygienic conditions
                away from direct sunlight and odor-emitting substances to maintain freshness and
                tamper-proof integrity.
              </p>
              <h4 className="font-bold text-[#0B2D5C] pt-2">4. Jurisdiction & Modifications</h4>
              <p>
                Terms and operational conditions may be updated periodically. Disputes, if any, are
                subject to local legal jurisdiction in Maharashtra, India.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-[#D9E8F0] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0B2D5C] hover:bg-[#1557A6] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

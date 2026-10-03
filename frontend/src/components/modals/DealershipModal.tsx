import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, MessageCircle, Send } from 'lucide-react';
import { Language, DealershipFormData } from '../../types';
import { translations } from '../../data/translations';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { useAdminData } from '../../context/AdminDataContext';

interface DealershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedProduct?: string;
}

export const DealershipModal: React.FC<DealershipModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedProduct,
}) => {
  const { addEnquiry } = useAdminData();
  const t = translations[language].dealership;

  const initialForm: DealershipFormData = {
    fullName: '',
    businessName: '',
    mobileNumber: '',
    email: '',
    city: '',
    area: '',
    businessType: 'Distributor',
    message: preselectedProduct ? `Enquiry regarding ${preselectedProduct}` : '',
  };

  const [formData, setFormData] = useState<DealershipFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync preselected product if modal is opened or product changes
  useEffect(() => {
    if (isOpen && preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        message: `Enquiry regarding ${preselectedProduct}`,
      }));
    }
  }, [isOpen, preselectedProduct]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    // Indian mobile phone format validation: 10 digits (optionally starting with +91 or 0)
    const phoneClean = formData.mobileNumber.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (!phoneRegex.test(phoneClean)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (!formData.city.trim()) {
      errs.city = 'City / District is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message or requirement';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    addEnquiry({
      type: 'dealership',
      fullName: formData.fullName,
      businessName: formData.businessName,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      city: formData.city,
      area: formData.area,
      businessType: formData.businessType,
      productName: preselectedProduct,
      message: formData.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(initialForm);
    setErrors({});
    onClose();
  };

  const handleWhatsAppEnquiry = () => {
    const msg = `Hello Royal Premium Water, I am ${formData.fullName || 'a business partner'} from ${
      formData.city || 'my city'
    }. I am interested in Dealership / Distribution (${formData.businessType}).`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#071D3A] via-[#0B2D5C] to-[#1557A6] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
              Royal Premium Water
            </span>
            <h3 className="text-xl font-bold font-heading">{t.formTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#BFD4E3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#0B2D5C]">{t.successTitle}</h4>
              <p className="text-sm text-[#536579] max-w-md mx-auto leading-relaxed">
                {t.successDesc}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B2D5C] text-white text-sm font-semibold hover:bg-[#1557A6] transition-colors cursor-pointer"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.whatsappDirect}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#536579] mb-2">
                {t.availabilityNotice}
              </p>

              {Object.keys(errors).length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{t.errorTitle} {t.errorDesc}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="dealer-fullName" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    id="dealer-fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="e.g. Ramesh Patil"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border min-h-[44px] bg-white text-[#102033] placeholder:text-[#8799A8] ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                    } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="dealer-businessName" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.businessName}
                  </label>
                  <input
                    id="dealer-businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder="e.g. Patil Enterprises"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile Number */}
                <div>
                  <label htmlFor="dealer-mobileNumber" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.mobileNumber} *
                  </label>
                  <input
                    id="dealer-mobileNumber"
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileNumber: e.target.value })
                    }
                    placeholder="10-digit mobile number"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border min-h-[44px] bg-white text-[#102033] placeholder:text-[#8799A8] ${
                      errors.mobileNumber
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                    } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                  />
                  {errors.mobileNumber ? (
                    <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber}</p>
                  ) : (
                    <p className="text-[10px] text-[#536579] mt-0.5">{t.mobileHelp}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="dealer-email" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.email} <span className="text-[#536579] font-normal">{t.emailOptional}</span>
                  </label>
                  <input
                    id="dealer-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. ramesh@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border min-h-[44px] bg-white text-[#102033] placeholder:text-[#8799A8] ${
                      errors.email
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                    } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label htmlFor="dealer-city" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.city} *
                  </label>
                  <input
                    id="dealer-city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="e.g. Pune / Kolhapur"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border min-h-[44px] bg-white text-[#102033] placeholder:text-[#8799A8] ${
                      errors.city
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                    } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                  />
                  {errors.city && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Area */}
                <div>
                  <label htmlFor="dealer-area" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.area}
                  </label>
                  <input
                    id="dealer-area"
                    type="text"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    placeholder="e.g. Hadapsar / Market Yard"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label htmlFor="dealer-businessType" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                    {t.businessType}
                  </label>
                  <select
                    id="dealer-businessType"
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessType: e.target.value as DealershipFormData['businessType'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 cursor-pointer min-h-[44px]"
                  >
                    <option value="Distributor">{t.types.distributor}</option>
                    <option value="Dealer">{t.types.dealer}</option>
                    <option value="Retailer">{t.types.retailer}</option>
                    <option value="Wholesaler">{t.types.wholesaler}</option>
                    <option value="Other">{t.types.other}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="dealer-message" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                  {t.message} *
                </label>
                <textarea
                  id="dealer-message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={t.messagePlaceholder}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#102033] placeholder:text-[#8799A8] ${
                    errors.message
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                  } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl border border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.whatsappDirect}</span>
                </button>

                <div className="w-full sm:w-auto flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-3 min-h-[44px] rounded-xl text-[#536579] hover:bg-[#F5FAFC] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

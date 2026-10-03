import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Building2,
  PhoneCall,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { Language, DealershipFormData } from '../types';
import { translations } from '../data/translations';
import { brandConfig, getWhatsAppUrl } from '../config/brandConfig';
import { useAdminData } from '../context/AdminDataContext';

interface DealershipSectionProps {
  language: Language;
}

export const DealershipSection: React.FC<DealershipSectionProps> = ({ language }) => {
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
    message: '',
  };

  const [formData, setFormData] = useState<DealershipFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

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
      errs.message = 'Please specify your requirements or shop details';
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
      message: formData.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsApp = () => {
    const msg = `Hello Royal Premium Water, I am interested in Dealership / Distribution opportunities in my area (${
      formData.city || 'my location'
    }).`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="dealership" className="py-20 md:py-28 bg-[#0B2D5C] text-white relative overflow-hidden">
      {/* Subtle Aqua Decorative Elements */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-radial from-[#00A8C6]/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-radial from-[#00A8C6]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Business Value & Availability Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#00A8C6] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#00A8C6]" />
              <span>Commercial Partnership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
              {t.heading}
            </h2>

            {/* Gold Accent Line */}
            <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />

            <p className="text-base sm:text-lg text-[#E8F9FC] leading-relaxed font-medium">
              {t.subheading}
            </p>

            <p className="text-sm text-[#E8F9FC]/90 leading-relaxed">
              {t.explanation}
            </p>

            {/* Availability Disclaimer Banner */}
            <div className="p-4 bg-white/10 border border-white/15 rounded-2xl flex items-start gap-3 backdrop-blur-xs">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs text-[#E8F9FC] font-medium leading-relaxed">
                {t.availabilityNotice}
              </p>
            </div>

            {/* Quick Benefits for Distributors */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-white/10 border border-white/15 rounded-xl shadow-xs backdrop-blur-xs">
                <Building2 className="w-5 h-5 text-[#00A8C6]" />
                <span className="text-xs font-bold text-white">
                  Reliable wholesale dispatch schedules
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/10 border border-white/15 rounded-xl shadow-xs backdrop-blur-xs">
                <PhoneCall className="w-5 h-5 text-[#00A8C6]" />
                <span className="text-xs font-bold text-white">
                  Dedicated regional relationship coordinator
                </span>
              </div>
            </div>

            {/* Instant WhatsApp Enquiry Button (WhatsApp recognizable green) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.whatsappDirect}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dealership Application Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(7,29,58,0.25)] border border-[#D9E8F0] text-[#102033]">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2D5C] font-heading">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-[#536579] max-w-md mx-auto leading-relaxed">
                  {t.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(initialForm);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#0B2D5C] text-white text-xs font-bold hover:bg-[#1557A6] transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0B2D5C] font-heading">
                    {t.formTitle}
                  </h3>
                  <p className="text-xs text-[#536579] mt-1">
                    {t.formSubtitle}
                  </p>
                </div>

                {Object.keys(errors).length > 0 && (
                  <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{t.errorTitle} {t.errorDesc}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Anand Kulkarni"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#102033] placeholder:text-[#8799A8] ${
                          errors.fullName
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                        } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.businessName}
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({ ...formData, businessName: e.target.value })
                        }
                        placeholder="e.g. Royal Traders"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.mobileNumber} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, mobileNumber: e.target.value })
                        }
                        placeholder="10-digit mobile number"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#102033] placeholder:text-[#8799A8] ${
                          errors.mobileNumber
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                        } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                      />
                      {errors.mobileNumber ? (
                        <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber}</p>
                      ) : (
                        <p className="text-[10px] text-[#536579] mt-0.5">{t.mobileHelp}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.email} <span className="text-[#536579] font-normal">{t.emailOptional}</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. anand@example.com"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#102033] placeholder:text-[#8799A8] ${
                          errors.email
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                        } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.city} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="e.g. Satara"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#102033] placeholder:text-[#8799A8] ${
                          errors.city
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                        } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                      />
                      {errors.city && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.area}
                      </label>
                      <input
                        type="text"
                        value={formData.area}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                        placeholder="e.g. MIDC / City Centre"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.businessType}
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessType: e.target.value as DealershipFormData['businessType'],
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 cursor-pointer"
                      >
                        <option value="Distributor">{t.types.distributor}</option>
                        <option value="Dealer">{t.types.dealer}</option>
                        <option value="Retailer">{t.types.retailer}</option>
                        <option value="Wholesaler">{t.types.wholesaler}</option>
                        <option value="Other">{t.types.other}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                      {t.message} *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t.messagePlaceholder}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#102033] placeholder:text-[#8799A8] ${
                        errors.message
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-[#D9E8F0] focus:border-[#00A8C6]'
                      } focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

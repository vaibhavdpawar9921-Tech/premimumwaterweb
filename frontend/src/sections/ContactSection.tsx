import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../config/brandConfig';
import { Language, ContactFormData } from '../types';
import { translations } from '../data/translations';
import { useAdminData } from '../context/AdminDataContext';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const { addEnquiry } = useAdminData();
  const t = translations[language].contact;

  const initialForm: ContactFormData = {
    name: '',
    mobile: '',
    email: '',
    city: '',
    message: '',
  };

  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }

    const phoneClean = formData.mobile.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(phoneClean)) {
      errs.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (!formData.city.trim()) {
      errs.city = 'Please specify your city';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message or inquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    addEnquiry({
      type: 'contact',
      fullName: formData.name,
      mobileNumber: formData.mobile,
      email: formData.email,
      city: formData.city,
      message: formData.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleDirections = () => {
    if (brandConfig.googleMapsUrl.includes('[')) {
      // Open standard search query for Maharashtra regional maps
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          'Maharashtra, India'
        )}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.open(brandConfig.googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5FAFC] relative border-t border-[#D9E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] text-xs font-bold uppercase tracking-wider">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D5C] font-heading tracking-tight">
            {t.heading}
          </h2>
          <p className="text-[#536579] text-sm sm:text-base">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Official Contact Channels & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D9E8F0] shadow-[0_10px_30px_rgba(11,45,92,0.06)] space-y-5">
              <h3 className="text-lg font-bold text-[#0B2D5C] font-heading flex items-center gap-2">
                <span>{brandConfig.name}</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#536579]">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#102033]">{t.phoneLabel}</span>
                    <span className="font-mono text-[#536579]">{brandConfig.phone}</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#102033]">{t.whatsappLabel}</span>
                    <span className="font-mono text-[#536579]">{brandConfig.whatsapp}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#102033]">{t.emailLabel}</span>
                    <span className="font-mono text-[#536579]">{brandConfig.email}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#D4AF37] border border-[#D9E8F0] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#102033]">{t.addressLabel}</span>
                    <span className="text-[#536579]">{brandConfig.address}</span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5FAFC] text-[#536579] border border-[#D9E8F0] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#102033]">{t.hoursLabel}</span>
                    <span className="text-[#536579]">{brandConfig.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Box */}
            <div className="bg-[#071D3A] text-white rounded-3xl p-6 relative overflow-hidden border border-[#1557A6]/40 shadow-[0_10px_30px_rgba(7,29,58,0.2)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#00A8C6]" />
                  <h4 className="text-sm font-bold text-white">Google Maps Location</h4>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37]">
                  {brandConfig.googleMapsUrl}
                </span>
              </div>

              <p className="text-xs text-[#BFD4E3] leading-relaxed mb-4">
                Visit or navigate directly to the Royal Premium Water commercial depot.
              </p>

              <button
                type="button"
                onClick={handleDirections}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A8C6] hover:bg-[#1557A6] text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                <span>{t.getDirections}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E8F0] shadow-[0_10px_30px_rgba(11,45,92,0.06)]">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2D5C] font-heading">
                  Thank you! Your message has been sent.
                </h3>
                <p className="text-xs sm:text-sm text-[#536579] max-w-md mx-auto leading-relaxed">
                  {t.successNote}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(initialForm);
                  }}
                  className="px-6 py-2.5 bg-[#0B2D5C] hover:bg-[#1557A6] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-[#0B2D5C] font-heading mb-1">
                  {t.sendMessageTitle}
                </h3>
                <p className="text-xs text-[#536579] mb-6">
                  For retail enquiries, event supply, or questions regarding our packaging.
                </p>

                {Object.keys(errors).length > 0 && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Please ensure all required fields are filled correctly.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.nameField} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-mobile" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.mobileField} *
                      </label>
                      <input
                        id="contact-mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.emailField}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-city" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                        {t.cityField} *
                      </label>
                      <input
                        id="contact-city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="Your city / locality"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1">
                      {t.messageField} *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="How can we assist you with packaged water supply?"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : t.sendBtn}</span>
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

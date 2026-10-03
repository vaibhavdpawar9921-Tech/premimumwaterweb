import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../../config/brandConfig';
import { Language } from '../../types';

interface FloatingWhatsAppProps {
  language: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const text = {
    en: {
      buttonLabel: 'Chat on WhatsApp',
      chatPrompt: 'Need fresh water supply or dealership info?',
      subtext: 'Direct message Royal Premium Water team',
      startChat: 'Chat Now on WhatsApp',
      numberDisplay: brandConfig.whatsapp,
      close: 'Close',
    },
    mr: {
      buttonLabel: 'व्हॉट्सॲपवर संपर्क करा',
      chatPrompt: 'ताजा पाणी पुरवठा किंवा डीलरशिप हवी आहे का?',
      subtext: 'रॉयल प्रीमियम वॉटर टीमशी थेट बोला',
      startChat: 'आत्ताच चॅट करा',
      numberDisplay: brandConfig.whatsapp,
      close: 'बंद करा',
    },
  }[language];

  const handleOpenWhatsApp = () => {
    const url = getWhatsAppUrl(brandConfig.defaultWhatsAppMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Quick Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">ROYAL WATER</h4>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Official Business Desk
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              aria-label={text.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3">
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {text.chatPrompt}
            </p>
            <div className="mt-2 text-[11px] bg-slate-50 rounded-lg p-2 text-slate-500 border border-slate-100">
              <span className="font-semibold text-slate-700">WhatsApp: </span>
              <span className="font-mono">{text.numberDisplay}</span>
            </div>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{text.startChat}</span>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-emerald-400/40"
          aria-label={text.buttonLabel}
        >
          {/* Subtle pulsating outer ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-75" />
          <MessageCircle className="w-7 h-7 relative z-10" />
        </button>

        {/* Hover Pill Tooltip on desktop */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {text.buttonLabel}
          </div>
        )}
      </div>
    </div>
  );
};

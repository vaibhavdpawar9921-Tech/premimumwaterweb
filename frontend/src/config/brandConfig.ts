/**
 * Central Brand Configuration for ROYAL PREMIUM WATER
 * 
 * NOTE FOR SITE OWNER / DEVELOPER:
 * All business information, contact channels, social handles, and map coordinates
 * can be updated from this single configuration file. Placeholders are clearly marked
 * with brackets [ ... ] and can be replaced with real verified company credentials.
 */

export const brandConfig = {
  name: 'ROYAL PREMIUM WATER',
  marathiName: 'रॉयल प्रीमियम वॉटर',
  tagline: 'Pure Water. Better Life.',
  taglineMarathi: 'शुद्ध पाणी. उत्तम जीवन.',
  subTagline: 'Refreshing purity for every moment.',
  subTaglineMarathi: 'प्रत्येक क्षणासाठी ताजी आणि शुद्ध अनुभूती.',
  brandStoryShort:
    'Royal Premium Water is committed to delivering refreshing packaged drinking water with a focus on purity, quality and reliable service.',
  brandStoryShortMarathi:
    'रॉयल प्रीमियम वॉटर शुद्धता, दर्जा आणि विश्वासार्ह सेवेवर भर देऊन ताजे पॅकेज्ड पिण्याचे पाणी पोहोचवण्यासाठी कटिबद्ध आहे.',
  
  // Contact details (Editable Placeholders)
  phone: '[PHONE NUMBER]',
  whatsapp: '[WHATSAPP NUMBER]', // Single central WhatsApp number variable
  email: '[EMAIL ADDRESS]',
  address: '[BUSINESS ADDRESS]',
  workingHours: '[BUSINESS HOURS]',
  
  // Location & Map (Editable Placeholder)
  googleMapsUrl: '[GOOGLE_MAPS_URL]',
  googleMapsEmbedQuery: 'Maharashtra, India', // Fallback display region
  
  // Social Media (Editable Placeholders)
  instagram: '[INSTAGRAM_URL]',
  instagramHandle: '@royalpremiumwater',
  
  // Default WhatsApp pre-filled messages
  defaultWhatsAppMessage:
    'Hello Royal Premium Water, I am interested in your products and would like to know more.',
  dealershipWhatsAppMessage:
    'Hello Royal Premium Water, I am interested in dealership / distribution opportunities in my area.',
  
  // Visual Theme - Exact Royal Premium Water System
  colors: {
    royalDeep: '#0B2D5C',
    royalBlue: '#1557A6',
    aqua: '#00A8C6',
    lightAqua: '#E8F9FC',
    white: '#FFFFFF',
    darkText: '#102033',
    secondaryText: '#536579',
    lightBg: '#F5FAFC',
    border: '#D9E8F0',
    gold: '#D4AF37',
    darkNavy: '#071D3A',

    // Backward-compatible aliases
    primary: '#0B2D5C',
    accentAqua: '#00A8C6',
    goldAccent: '#D4AF37',
    softBg: '#F5FAFC',
  },
  
  // Copyright year
  copyrightYear: 2026,
};

/**
 * Generate a sanitized WhatsApp chat URL
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const number = brandConfig.whatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(customMessage || brandConfig.defaultWhatsAppMessage);
  
  // If the number still contains placeholder brackets or is empty, use standard WhatsApp intent or click-to-chat fallback
  if (!number || brandConfig.whatsapp.includes('[')) {
    return `https://wa.me/?text=${message}`;
  }
  return `https://wa.me/${number}?text=${message}`;
}

/**
 * Check if a field is still a template placeholder
 */
export function isPlaceholder(val: string): boolean {
  return val.includes('[') && val.includes(']');
}

export type Language = 'en' | 'mr';

export type PageId =
  | 'home'
  | 'about'
  | 'products'
  | 'quality'
  | 'gallery'
  | 'dealership'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface ProductItem {
  id: string;
  code: string;
  nameEn: string;
  nameMr: string;
  sizePlaceholder: string;
  taglineEn: string;
  taglineMr: string;
  descriptionEn: string;
  descriptionMr: string;
  featuresEn: string[];
  featuresMr: string[];
  badgeEn?: string;
  badgeMr?: string;
  bottleColor?: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  titleEn: string;
  titleMr: string;
  descEn: string;
  descMr: string;
}

export interface ProcessStep {
  stepNumber: number;
  titleEn: string;
  titleMr: string;
  descEn: string;
  descMr: string;
  icon: string;
  isPlaceholderLabel?: boolean;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleMr: string;
  category: 'products' | 'brand' | 'team' | 'distribution' | 'social';
  descriptionEn: string;
  descriptionMr: string;
  imagePlaceholderNote: string;
  dominantColor: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roleEn: string;
  roleMr: string;
  bioEn: string;
  bioMr: string;
  isPlaceholder: boolean;
}

export interface DealershipFormData {
  fullName: string;
  businessName: string;
  mobileNumber: string;
  email: string;
  city: string;
  area: string;
  businessType: 'Distributor' | 'Dealer' | 'Retailer' | 'Wholesaler' | 'Other';
  message: string;
}

export interface ContactFormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  message: string;
}

export interface AdminEnquiry {
  id: string;
  type: 'dealership' | 'contact' | 'product_enquiry';
  fullName: string;
  businessName?: string;
  mobileNumber: string;
  email?: string;
  city: string;
  area?: string;
  businessType?: string;
  productName?: string;
  message?: string;
  status: 'new' | 'in_review' | 'contacted' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
}

export interface AdminUser {
  username: string;
  role: string;
  token?: string;
}

export interface BrandConfigData {
  name: string;
  marathiName: string;
  tagline: string;
  taglineMarathi: string;
  subTagline: string;
  subTaglineMarathi: string;
  brandStoryShort: string;
  brandStoryShortMarathi: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  instagram: string;
  instagramHandle: string;
}

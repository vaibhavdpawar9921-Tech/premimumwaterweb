import React, { useState } from 'react';
import {
  Package,
  Users,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Mail,
  Search,
  Filter,
  Save,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Eye,
  X,
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { ProductItem, GalleryItem, AdminEnquiry, BrandConfigData } from '../../types';
import { RoyalBottleArt } from '../common/RoyalBottleArt';
import { BrandLogo } from '../common/BrandLogo';

export const AdminDashboard: React.FC = () => {
  const {
    adminUser,
    logout,
    setIsAdminViewOpen,
    activeAdminTab,
    setActiveAdminTab,
    products,
    addProduct,
    editProduct,
    deleteProduct,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    galleryItems,
    addGalleryItem,
    editGalleryItem,
    deleteGalleryItem,
    brandContent,
    updateBrandContent,
    resetBrandContent,
  } = useAdminData();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('all');

  // Modals for Products
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [productFormData, setProductFormData] = useState({
    code: '',
    nameEn: '',
    nameMr: '',
    sizePlaceholder: '[Available Size: 500ml / 1 Litre]',
    taglineEn: '',
    taglineMr: '',
    descriptionEn: '',
    descriptionMr: '',
    featuresEn: 'Food-grade ergonomic bottle, Tamper-evident sealed cap, Hygienically bottled',
    featuresMr: 'फूड-ग्रेड मजबूत बाटली, सुरक्षित सीलबंद झाकण, स्वच्छतेने बॉटलिंग केलेले',
    badgeEn: 'New Launch',
    badgeMr: 'नवीन उत्पादन',
    bottleColor: '#1557A6',
  });

  // Modal for Gallery
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryFormData, setGalleryFormData] = useState({
    titleEn: '',
    titleMr: '',
    category: 'products' as GalleryItem['category'],
    descriptionEn: '',
    descriptionMr: '',
    imagePlaceholderNote: '[IMAGE PREVIEW]',
    dominantColor: '#0B2D5C',
  });

  // Website Content Form state
  const [contentFormData, setContentFormData] = useState<BrandConfigData>(brandContent);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Selected enquiry for detail drawer
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(null);

  // Filtered Enquiries
  const dealerEnquiries = enquiries.filter((e) => e.type === 'dealership');
  const generalEnquiries = enquiries.filter((e) => e.type === 'contact' || e.type === 'product_enquiry');

  // Product modal handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      code: `Product 0${products.length + 1}`,
      nameEn: '',
      nameMr: '',
      sizePlaceholder: '[Available Size: 500ml / 1 Litre]',
      taglineEn: '',
      taglineMr: '',
      descriptionEn: '',
      descriptionMr: '',
      featuresEn: 'Food-grade bottle, Sealed cap, Hygienic bottling, Pure taste',
      featuresMr: 'फूड-ग्रेड बाटली, सीलबंद झाकण, स्वच्छ बॉटलिंग, शुद्ध चव',
      badgeEn: 'Premium Selection',
      badgeMr: 'प्रीमियम निवड',
      bottleColor: '#1557A6',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProductFormData({
      code: prod.code,
      nameEn: prod.nameEn,
      nameMr: prod.nameMr,
      sizePlaceholder: prod.sizePlaceholder,
      taglineEn: prod.taglineEn,
      taglineMr: prod.taglineMr,
      descriptionEn: prod.descriptionEn,
      descriptionMr: prod.descriptionMr,
      featuresEn: prod.featuresEn.join(', '),
      featuresMr: prod.featuresMr.join(', '),
      badgeEn: prod.badgeEn || '',
      badgeMr: prod.badgeMr || '',
      bottleColor: prod.bottleColor || '#1557A6',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: productFormData.code,
      nameEn: productFormData.nameEn,
      nameMr: productFormData.nameMr,
      sizePlaceholder: productFormData.sizePlaceholder,
      taglineEn: productFormData.taglineEn,
      taglineMr: productFormData.taglineMr,
      descriptionEn: productFormData.descriptionEn,
      descriptionMr: productFormData.descriptionMr,
      featuresEn: productFormData.featuresEn.split(',').map((s) => s.trim()).filter(Boolean),
      featuresMr: productFormData.featuresMr.split(',').map((s) => s.trim()).filter(Boolean),
      badgeEn: productFormData.badgeEn,
      badgeMr: productFormData.badgeMr,
      bottleColor: productFormData.bottleColor,
    };

    if (editingProduct) {
      editProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setIsProductModalOpen(false);
  };

  // Gallery modal handlers
  const handleOpenAddGallery = () => {
    setEditingGalleryItem(null);
    setGalleryFormData({
      titleEn: '',
      titleMr: '',
      category: 'products',
      descriptionEn: '',
      descriptionMr: '',
      imagePlaceholderNote: '[NEW GALLERY IMAGE]',
      dominantColor: '#0B2D5C',
    });
    setIsGalleryModalOpen(true);
  };

  const handleOpenEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryFormData({
      titleEn: item.titleEn,
      titleMr: item.titleMr,
      category: item.category,
      descriptionEn: item.descriptionEn,
      descriptionMr: item.descriptionMr,
      imagePlaceholderNote: item.imagePlaceholderNote,
      dominantColor: item.dominantColor,
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGalleryItem) {
      editGalleryItem(editingGalleryItem.id, galleryFormData);
    } else {
      addGalleryItem(galleryFormData);
    }
    setIsGalleryModalOpen(false);
  };

  // Website Content save handler
  const handleSaveWebsiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandContent(contentFormData);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // WhatsApp quick trigger
  const handleTriggerWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = `Hello ${name}, regarding your Royal Premium Water enquiry...`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5FAFC] text-[#102033] flex flex-col font-sans">
      {/* Top Professional Header Bar */}
      <header className="bg-white border-b border-[#D9E8F0] sticky top-0 z-30 shadow-[0_4px_20px_rgba(11,45,92,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div className="hidden sm:block pl-3 border-l border-[#D9E8F0]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B2D5C] block">
                Admin Console
              </span>
              <span className="text-[10px] text-[#536579]">
                Management & Operations
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F9FC] border border-[#00A8C6]/30 text-xs text-[#0B2D5C] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin: {adminUser?.username || 'Superadmin'}</span>
            </div>

            <button
              onClick={() => setIsAdminViewOpen(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#1557A6] bg-[#F5FAFC] hover:bg-[#E8F9FC] border border-[#D9E8F0] transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Live Website</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#0B2D5C] text-white overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: Sparkles },
              { id: 'products', label: `Products (${products.length})`, icon: Package },
              {
                id: 'dealers',
                label: `View Dealer Enquiries (${dealerEnquiries.length})`,
                icon: Users,
                badge: dealerEnquiries.filter((d) => d.status === 'new').length,
              },
              {
                id: 'enquiries',
                label: `View Enquiries (${generalEnquiries.length})`,
                icon: MessageSquare,
                badge: generalEnquiries.filter((d) => d.status === 'new').length,
              },
              { id: 'gallery', label: `Manage Gallery (${galleryItems.length})`, icon: ImageIcon },
              { id: 'content', label: 'Manage Website Content', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#D4AF37] text-white bg-white/10'
                      : 'border-transparent text-[#BFD4E3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#00A8C6]" />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#D4AF37] text-[#0B2D5C]">
                      {tab.badge} new
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Tab View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ==================================================== */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Executive Welcome Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#071D3A] via-[#0B2D5C] to-[#1557A6] text-white shadow-[0_10px_30px_rgba(11,45,92,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-radial from-[#00A8C6]/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] bg-black/20 px-3 py-1 rounded-full mb-3 border border-[#D4AF37]/30">
                  Operations Control
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                  Welcome to Royal Premium Water Administration
                </h1>
                <p className="text-sm text-[#E8F9FC] mt-2 leading-relaxed">
                  Real-time control over products catalogue, regional dealership inquiries, customer inquiries, visual gallery, and live public website information.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveAdminTab('products')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0B2D5C] hover:bg-[#E8F9FC] font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-[#1557A6]" />
                    <span>Manage Products</span>
                  </button>
                  <button
                    onClick={() => setActiveAdminTab('dealers')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A8C6] hover:bg-[#008ba4] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Review Dealer Leads</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-[#D9E8F0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#536579]">Active Products</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#00A8C6] flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-[#0B2D5C] font-heading">{products.length}</span>
                  <span className="text-xs text-[#536579] ml-2">in public catalogue</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D9E8F0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#536579]">Dealer Enquiries</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#1557A6] flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-[#0B2D5C] font-heading">{dealerEnquiries.length}</span>
                  <span className="text-xs text-amber-600 font-semibold ml-2">
                    {dealerEnquiries.filter((d) => d.status === 'new').length} require response
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D9E8F0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#536579]">Customer Enquiries</span>
                  <div className="w-9 h-9 rounded-xl bg-[#E8F9FC] text-[#00A8C6] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-[#0B2D5C] font-heading">{generalEnquiries.length}</span>
                  <span className="text-xs text-[#536579] ml-2">messages received</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#D9E8F0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#536579]">Gallery Assets</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D4AF37] flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-[#0B2D5C] font-heading">{galleryItems.length}</span>
                  <span className="text-xs text-[#536579] ml-2">curated photos</span>
                </div>
              </div>
            </div>

            {/* Operations Control Tree (Direct Mapping to User Flow) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D9E8F0] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D9E8F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A8C6]" />
                    <h3 className="text-lg font-bold text-[#0B2D5C] font-heading">
                      Dashboard Navigation & Operations
                    </h3>
                  </div>
                  <p className="text-xs text-[#536579] mt-0.5">
                    1-Click access to product inventory, customer & dealership enquiries, gallery media, and website content
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#1557A6] bg-[#E8F9FC] px-3 py-1 rounded-lg border border-[#D9E8F0] self-start sm:self-auto font-semibold">
                  Admin Console Tree
                </span>
              </div>

              {/* Grid of the 7 Operations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pt-1">
                {/* 1. Add Product */}
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] hover:border-[#00A8C6]/50 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0B2D5C] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#1557A6] flex items-center gap-1">
                      Add Product
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Create new packaged water bottle sizes, specs & badges
                    </p>
                  </div>
                </button>

                {/* 2. Edit Product */}
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('products')}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] hover:border-[#00A8C6]/50 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1557A6] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#1557A6] flex items-center gap-1">
                      Edit Product
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Update descriptions, Marathi names, and features
                    </p>
                  </div>
                </button>

                {/* 3. Delete Product */}
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('products')}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-red-50/50 hover:border-red-200 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-red-700 flex items-center gap-1">
                      Delete Product
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Remove discontinued pack sizes from public store
                    </p>
                  </div>
                </button>

                {/* 4. View Enquiries */}
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('enquiries')}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] hover:border-[#00A8C6]/50 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00A8C6] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#1557A6] flex items-center gap-1">
                      View Enquiries
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#00A8C6] text-white rounded-full">
                        {generalEnquiries.length}
                      </span>
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Customer messages, order inquiries, and calls
                    </p>
                  </div>
                </button>

                {/* 5. View Dealer Enquiries */}
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('dealers')}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] hover:border-[#00A8C6]/50 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#071D3A] text-[#00A8C6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#1557A6] flex items-center gap-1">
                      View Dealer Enquiries
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#D4AF37] text-[#0B2D5C] font-extrabold rounded-full">
                        {dealerEnquiries.length}
                      </span>
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Distributor applications, volumes, locations & status
                    </p>
                  </div>
                </button>

                {/* 6. Manage Gallery */}
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('gallery')}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] hover:border-[#00A8C6]/50 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#1557A6] flex items-center gap-1">
                      Manage Gallery
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Add, categorize & edit facility & product photos
                    </p>
                  </div>
                </button>

                {/* 7. Manage Website Content */}
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('content')}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[#D9E8F0] bg-[#F5FAFC] hover:bg-[#E8F9FC] hover:border-[#00A8C6]/50 transition-all text-left group cursor-pointer sm:col-span-2 lg:col-span-2 xl:col-span-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D5C] group-hover:text-[#1557A6] flex items-center gap-1">
                      Manage Website Content
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-[11px] text-[#536579] mt-0.5 leading-snug">
                      Edit phone numbers, WhatsApp, business address, tagline, and brand story live
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-3xl p-6 border border-[#D9E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0B2D5C] font-heading">
                    Latest Regional Dealership Leads
                  </h3>
                  <p className="text-xs text-[#536579]">
                    Entrepreneurs and retail distributors seeking partnerships
                  </p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('dealers')}
                  className="text-xs font-bold text-[#1557A6] hover:text-[#00A8C6] transition-colors"
                >
                  View All ({dealerEnquiries.length}) →
                </button>
              </div>

              <div className="divide-y divide-[#D9E8F0]">
                {dealerEnquiries.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0B2D5C]">{lead.fullName}</span>
                        {lead.businessName && (
                          <span className="text-xs text-[#536579]">({lead.businessName})</span>
                        )}
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            lead.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : lead.status === 'contacted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#536579] mt-1 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-[#1557A6]" />
                          {lead.mobileNumber}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#00A8C6]" />
                          {lead.city} {lead.area ? `(${lead.area})` : ''}
                        </span>
                        <span className="text-[#0B2D5C] font-semibold">{lead.businessType}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTriggerWhatsApp(lead.mobileNumber, lead.fullName)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEnquiry(lead);
                          setActiveAdminTab('dealers');
                        }}
                        className="p-1.5 rounded-xl bg-[#F5FAFC] hover:bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0] transition-colors cursor-pointer"
                        title="View details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PRODUCTS (Add, Edit, Delete Product) */}
        {/* ==================================================== */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D9E8F0] shadow-sm">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] font-heading">
                  Products Management
                </h2>
                <p className="text-xs text-[#536579] mt-1">
                  Add new water pack sizes, edit descriptions, features, or remove obsolete catalogue items.
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#D9E8F0] p-6 shadow-sm hover:shadow-[0_10px_30px_rgba(11,45,92,0.08)] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Bottle Visual & Badge */}
                    <div className="relative py-6 bg-radial from-[#E8F9FC] to-[#F5FAFC] rounded-2xl border border-[#D9E8F0] flex items-center justify-center mb-4">
                      {product.badgeEn && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0B2D5C] text-[#D4AF37] border border-[#D4AF37]/30">
                          {product.badgeEn}
                        </span>
                      )}
                      <span className="absolute top-3 left-3 text-[11px] font-mono font-bold text-[#1557A6]">
                        {product.code}
                      </span>
                      <RoyalBottleArt size="sm" volumeLabel={product.sizePlaceholder} />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-[#0B2D5C] font-heading">
                        {product.nameEn}
                      </h3>
                      <p className="text-xs text-[#1557A6] font-medium font-marathi">
                        {product.nameMr}
                      </p>
                      <p className="text-xs font-mono text-[#00A8C6] font-semibold">
                        {product.sizePlaceholder}
                      </p>
                      <p className="text-xs text-[#536579] line-clamp-2 mt-2">
                        {product.descriptionEn}
                      </p>
                    </div>

                    {/* Features list tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.featuresEn.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#E8F9FC] text-[#0B2D5C] px-2 py-0.5 rounded-md border border-[#D9E8F0]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 pt-4 border-t border-[#D9E8F0] flex items-center justify-between">
                    <span className="text-[11px] text-[#536579]">Live on Website</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditProduct(product)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F5FAFC] hover:bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0] text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${product.nameEn}? This will remove it from the public website.`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: DEALER ENQUIRIES ("View Dealer Enquiries") */}
        {/* ==================================================== */}
        {activeAdminTab === 'dealers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Filter Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#D9E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0]">
                    Distribution Inquiries
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] font-heading mt-1">
                  Dealer & Distributorship Applications
                </h2>
                <p className="text-xs text-[#536579]">
                  Total {dealerEnquiries.length} business applicants across targeted regional territories.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-[#D9E8F0] text-xs font-semibold bg-white text-[#102033] focus:border-[#00A8C6] focus:outline-hidden"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New ({dealerEnquiries.filter((d) => d.status === 'new').length})</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>

            {/* Enquiries Table Card */}
            <div className="bg-white rounded-3xl border border-[#D9E8F0] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F5FAFC] border-b border-[#D9E8F0] text-[#0B2D5C] font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-4">Applicant & Business</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Territory / City</th>
                      <th className="p-4">Business Model</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Quick Response</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D9E8F0]">
                    {dealerEnquiries
                      .filter((e) => statusFilter === 'all' || e.status === statusFilter)
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#F5FAFC]/60 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-[#0B2D5C] block text-sm">{lead.fullName}</span>
                            {lead.businessName ? (
                              <span className="text-[#536579] font-medium">{lead.businessName}</span>
                            ) : (
                              <span className="text-[#8799A8] italic">Individual Applicant</span>
                            )}
                            {lead.productName && (
                              <span className="block text-[11px] text-[#1557A6] mt-0.5">
                                Int: {lead.productName}
                              </span>
                            )}
                          </td>

                          <td className="p-4 space-y-1">
                            <div className="font-mono text-[#102033] font-semibold flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#1557A6]" />
                              <span>{lead.mobileNumber}</span>
                            </div>
                            {lead.email && (
                              <div className="text-[#536579] flex items-center gap-1.5">
                                <Mail className="w-3 h-3 text-[#00A8C6]" />
                                <span>{lead.email}</span>
                              </div>
                            )}
                          </td>

                          <td className="p-4">
                            <span className="font-bold text-[#102033] block">{lead.city}</span>
                            {lead.area && <span className="text-[#536579] text-[11px]">{lead.area}</span>}
                          </td>

                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-md bg-[#E8F9FC] text-[#0B2D5C] border border-[#D9E8F0] font-semibold text-[11px]">
                              {lead.businessType || 'Distributor'}
                            </span>
                          </td>

                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateEnquiryStatus(lead.id, e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                                lead.status === 'new'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : lead.status === 'in_review'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : lead.status === 'contacted'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="in_review">In Review</option>
                              <option value="contacted">Contacted</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => handleTriggerWhatsApp(lead.mobileNumber, lead.fullName)}
                                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete enquiry from ${lead.fullName}?`)) {
                                    deleteEnquiry(lead.id);
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: GENERAL ENQUIRIES ("View Enquiries") */}
        {/* ==================================================== */}
        {activeAdminTab === 'enquiries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-3xl border border-[#D9E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] font-heading">
                  General Customer Enquiries
                </h2>
                <p className="text-xs text-[#536579] mt-1">
                  Direct customer enquiries submitted through the website contact form and event requests.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0]">
                {generalEnquiries.length} Total Inquiries
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {generalEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-3xl border border-[#D9E8F0] p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-base text-[#0B2D5C]">{enq.fullName}</h4>
                        <div className="flex items-center gap-3 text-xs text-[#536579] mt-1">
                          <span className="font-mono text-[#102033]">{enq.mobileNumber}</span>
                          <span>•</span>
                          <span>{enq.city}</span>
                        </div>
                      </div>
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-[#F5FAFC] cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F5FAFC] border border-[#D9E8F0] text-xs text-[#102033] leading-relaxed">
                      "{enq.message || 'General enquiry regarding product supply'}"
                    </div>

                    {enq.email && (
                      <p className="text-xs text-[#536579] flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#00A8C6]" />
                        <span>{enq.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#D9E8F0] flex items-center justify-between">
                    <span className="text-[10px] text-[#8799A8]">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTriggerWhatsApp(enq.mobileNumber, enq.fullName)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </button>
                      <button
                        onClick={() => deleteEnquiry(enq.id)}
                        className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: MANAGE GALLERY */}
        {/* ==================================================== */}
        {activeAdminTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-3xl border border-[#D9E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] font-heading">
                  Manage Visual Gallery
                </h2>
                <p className="text-xs text-[#536579] mt-1">
                  Upload, categorize, edit, or delete plant, packaging, and brand images shown in the gallery section.
                </p>
              </div>

              <button
                onClick={handleOpenAddGallery}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#D9E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-44 bg-gradient-to-br from-[#071D3A] via-[#0B2D5C] to-[#1557A6] flex flex-col items-center justify-center p-4 text-center relative">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-[#D4AF37] border border-[#D4AF37]/30 mb-2">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-white px-2 py-1 bg-black/30 rounded">
                      {item.imagePlaceholderNote}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-sm text-[#0B2D5C] font-heading">{item.titleEn}</h4>
                    <p className="text-xs text-[#1557A6] font-marathi">{item.titleMr}</p>
                    <p className="text-xs text-[#536579] line-clamp-2">{item.descriptionEn}</p>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditGallery(item)}
                      className="px-3 py-1.5 rounded-xl bg-[#F5FAFC] hover:bg-[#E8F9FC] text-[#1557A6] border border-[#D9E8F0] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this gallery photo?')) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: MANAGE WEBSITE CONTENT */}
        {/* ==================================================== */}
        {activeAdminTab === 'content' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-3xl border border-[#D9E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] font-heading">
                  Manage Website Content
                </h2>
                <p className="text-xs text-[#536579] mt-1">
                  Update primary brand phone, WhatsApp number, factory address, taglines, and social links in real time.
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Changes saved successfully!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveWebsiteContent} className="bg-white rounded-3xl border border-[#D9E8F0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Official Brand Name (English)
                  </label>
                  <input
                    type="text"
                    value={contentFormData.name}
                    onChange={(e) => setContentFormData({ ...contentFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Official Brand Name (मराठी)
                  </label>
                  <input
                    type="text"
                    value={contentFormData.marathiName}
                    onChange={(e) => setContentFormData({ ...contentFormData, marathiName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Main Brand Tagline (English)
                  </label>
                  <input
                    type="text"
                    value={contentFormData.tagline}
                    onChange={(e) => setContentFormData({ ...contentFormData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Main Brand Tagline (मराठी)
                  </label>
                  <input
                    type="text"
                    value={contentFormData.taglineMarathi}
                    onChange={(e) => setContentFormData({ ...contentFormData, taglineMarathi: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Official Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={contentFormData.phone}
                    onChange={(e) => setContentFormData({ ...contentFormData, phone: e.target.value })}
                    placeholder="+91 98220 12345"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Official WhatsApp Number (Floating Button & Chat)
                  </label>
                  <input
                    type="text"
                    value={contentFormData.whatsapp}
                    onChange={(e) => setContentFormData({ ...contentFormData, whatsapp: e.target.value })}
                    placeholder="+91 98220 12345"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={contentFormData.email}
                    onChange={(e) => setContentFormData({ ...contentFormData, email: e.target.value })}
                    placeholder="contact@royalpremiumwater.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Plant Working Hours
                  </label>
                  <input
                    type="text"
                    value={contentFormData.workingHours}
                    onChange={(e) => setContentFormData({ ...contentFormData, workingHours: e.target.value })}
                    placeholder="Mon - Sat: 8:00 AM - 8:00 PM"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Plant / Bottling Facility Address
                  </label>
                  <textarea
                    rows={2}
                    value={contentFormData.address}
                    onChange={(e) => setContentFormData({ ...contentFormData, address: e.target.value })}
                    placeholder="Plot No. 12, Water Purification Park, Maharashtra, India"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                    Brand Story / Overview Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={contentFormData.brandStoryShort}
                    onChange={(e) => setContentFormData({ ...contentFormData, brandStoryShort: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset content to defaults?')) {
                      resetBrandContent();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#536579] hover:bg-[#F5FAFC] border border-[#D9E8F0] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Live Website Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* ==================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D3A]/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D9E8F0] overflow-hidden my-8">
            <div className="bg-[#0B2D5C] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Catalogue Manager
                </span>
                <h3 className="text-xl font-bold font-heading">
                  {editingProduct ? 'Edit Product Item' : 'Add New Product Item'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Product Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.code}
                    onChange={(e) => setProductFormData({ ...productFormData, code: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Size / Volume Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.sizePlaceholder}
                    onChange={(e) => setProductFormData({ ...productFormData, sizePlaceholder: e.target.value })}
                    placeholder="[Available Size: 500ml / 1 Litre]"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.nameEn}
                    onChange={(e) => setProductFormData({ ...productFormData, nameEn: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Product Name (मराठी) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.nameMr}
                    onChange={(e) => setProductFormData({ ...productFormData, nameMr: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Tagline (English)
                  </label>
                  <input
                    type="text"
                    value={productFormData.taglineEn}
                    onChange={(e) => setProductFormData({ ...productFormData, taglineEn: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Tagline (मराठी)
                  </label>
                  <input
                    type="text"
                    value={productFormData.taglineMr}
                    onChange={(e) => setProductFormData({ ...productFormData, taglineMr: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Promotional Badge (English)
                  </label>
                  <input
                    type="text"
                    value={productFormData.badgeEn}
                    onChange={(e) => setProductFormData({ ...productFormData, badgeEn: e.target.value })}
                    placeholder="e.g. Signature Bottle"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Promotional Badge (मराठी)
                  </label>
                  <input
                    type="text"
                    value={productFormData.badgeMr}
                    onChange={(e) => setProductFormData({ ...productFormData, badgeMr: e.target.value })}
                    placeholder="e.g. लोकप्रिय बाटली"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Description (English) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={productFormData.descriptionEn}
                    onChange={(e) => setProductFormData({ ...productFormData, descriptionEn: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Description (मराठी) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={productFormData.descriptionMr}
                    onChange={(e) => setProductFormData({ ...productFormData, descriptionMr: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                    Key Features (English, comma-separated)
                  </label>
                  <input
                    type="text"
                    value={productFormData.featuresEn}
                    onChange={(e) => setProductFormData({ ...productFormData, featuresEn: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9E8F0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#536579] hover:bg-[#F5FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* GALLERY ADD / EDIT MODAL */}
      {/* ==================================================== */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D3A]/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#D9E8F0] overflow-hidden my-8">
            <div className="bg-[#0B2D5C] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Gallery Editor
                </span>
                <h3 className="text-xl font-bold font-heading">
                  {editingGalleryItem ? 'Edit Photo Asset' : 'Add Photo Asset'}
                </h3>
              </div>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={galleryFormData.titleEn}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, titleEn: e.target.value })}
                  placeholder="e.g. Modern Bottling Line"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                  Title (मराठी) *
                </label>
                <input
                  type="text"
                  required
                  value={galleryFormData.titleMr}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, titleMr: e.target.value })}
                  placeholder="e.g. आधुनिक बॉटलिंग प्रकल्प"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                  Category *
                </label>
                <select
                  value={galleryFormData.category}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                >
                  <option value="products">Products</option>
                  <option value="brand">Brand</option>
                  <option value="team">Team</option>
                  <option value="distribution">Distribution</option>
                  <option value="social">Social</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102033] uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={galleryFormData.descriptionEn}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, descriptionEn: e.target.value })}
                  placeholder="Short description of this photo"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#D9E8F0]"
                />
              </div>

              <div className="pt-4 border-t border-[#D9E8F0] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#536579]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  {editingGalleryItem ? 'Save Photo' : 'Upload to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

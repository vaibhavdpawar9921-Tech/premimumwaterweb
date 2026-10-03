import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductItem,
  GalleryItem,
  AdminEnquiry,
  AdminUser,
  BrandConfigData,
} from '../types';
import { productsList as defaultProducts, galleryItems as defaultGallery } from '../data/websiteData';
import { brandConfig as defaultBrandConfig } from '../config/brandConfig';

interface AdminDataContextType {
  // Auth
  adminUser: AdminUser | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAdminViewOpen: boolean;
  setIsAdminViewOpen: (open: boolean) => void;
  activeAdminTab: 'overview' | 'products' | 'enquiries' | 'dealers' | 'gallery' | 'content';
  setActiveAdminTab: (tab: 'overview' | 'products' | 'enquiries' | 'dealers' | 'gallery' | 'content') => void;

  // Products
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  editProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  // Enquiries
  enquiries: AdminEnquiry[];
  addEnquiry: (data: {
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
  }) => void;
  updateEnquiryStatus: (id: string, status: AdminEnquiry['status'], notes?: string) => void;
  deleteEnquiry: (id: string) => void;

  // Gallery
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  editGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Website Content
  brandContent: BrandConfigData;
  updateBrandContent: (newConfig: Partial<BrandConfigData>) => void;
  resetBrandContent: () => void;
}

const initialEnquiries: AdminEnquiry[] = [
  {
    id: 'enq-001',
    type: 'dealership',
    fullName: 'Rajesh Patil',
    businessName: 'Patil Beverages & Supermarket',
    mobileNumber: '+91 98220 12345',
    email: 'rajesh.patil@example.com',
    city: 'Pune',
    area: 'Hadapsar Industrial Zone',
    businessType: 'Distributor',
    productName: 'Royal Premium Water - Daily Refresh (1 Litre)',
    message: 'We have 4 distribution delivery vans and supply to 120+ retail shops. Looking for direct regional distributorship.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: 'Urgent dealership enquiry. High volume potential.',
  },
  {
    id: 'enq-002',
    type: 'dealership',
    fullName: 'Sunil Deshmukh',
    businessName: 'Deshmukh Grand Hotel & Resorts',
    mobileNumber: '+91 94225 67890',
    email: 'purchase@deshmukhresorts.com',
    city: 'Nashik',
    area: 'Gangapur Road',
    businessType: 'Hotel / Restaurant Partner',
    productName: 'Royal Premium Water - Compact Pack (300ml)',
    message: 'Require 500 cases of 300ml custom branded / Royal Premium Water bottles monthly for guest rooms and banquet hall.',
    status: 'in_review',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: 'Quotation sent via email. Follow up on Tuesday.',
  },
  {
    id: 'enq-003',
    type: 'dealership',
    fullName: 'Aniket Shinde',
    businessName: 'Shinde Wholesalers',
    mobileNumber: '+91 98901 11223',
    email: 'aniket@shindetraders.in',
    city: 'Satara',
    area: 'MIDC',
    businessType: 'Retail Wholesaler',
    productName: 'Royal Premium Water - Bulk Supply (20 Litre Can)',
    message: 'Interested in bulk bubble top 20L supply for corporate offices in Satara and Karad.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    notes: 'Called manager. Samples dispatched for lab & taste check.',
  },
  {
    id: 'enq-004',
    type: 'contact',
    fullName: 'Mahesh Kulkarni',
    mobileNumber: '+91 97654 33221',
    email: 'mahesh.k@gmail.com',
    city: 'Mumbai',
    message: 'Do you deliver 1-litre bottles for wedding events with custom printed bottle neck ribbons?',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'enq-005',
    type: 'contact',
    fullName: 'Pooja Sawant',
    mobileNumber: '+91 98231 44556',
    email: 'pooja.sawant@techcorp.com',
    city: 'Pune',
    message: 'Can we schedule regular weekly delivery of 20L cans for our IT park office of 60 employees?',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    notes: 'Connected with local delivery partner.',
  },
];

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('royal_admin_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'products' | 'enquiries' | 'dealers' | 'gallery' | 'content'
  >('overview');

  // Products state with LocalStorage persistence
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const stored = localStorage.getItem('royal_products_v2');
      return stored ? JSON.parse(stored) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  // Enquiries state
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(() => {
    try {
      const stored = localStorage.getItem('royal_enquiries_v2');
      return stored ? JSON.parse(stored) : initialEnquiries;
    } catch {
      return initialEnquiries;
    }
  });

  // Gallery items state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem('royal_gallery_v2');
      return stored ? JSON.parse(stored) : defaultGallery;
    } catch {
      return defaultGallery;
    }
  });

  // Brand Content state
  const [brandContent, setBrandContent] = useState<BrandConfigData>(() => {
    try {
      const stored = localStorage.getItem('royal_brand_content_v2');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {
      name: defaultBrandConfig.name,
      marathiName: defaultBrandConfig.marathiName,
      tagline: defaultBrandConfig.tagline,
      taglineMarathi: defaultBrandConfig.taglineMarathi,
      subTagline: defaultBrandConfig.subTagline,
      subTaglineMarathi: defaultBrandConfig.subTaglineMarathi,
      brandStoryShort: defaultBrandConfig.brandStoryShort,
      brandStoryShortMarathi: defaultBrandConfig.brandStoryShortMarathi,
      phone: defaultBrandConfig.phone,
      whatsapp: defaultBrandConfig.whatsapp,
      email: defaultBrandConfig.email,
      address: defaultBrandConfig.address,
      workingHours: defaultBrandConfig.workingHours,
      googleMapsUrl: defaultBrandConfig.googleMapsUrl,
      instagram: defaultBrandConfig.instagram,
      instagramHandle: defaultBrandConfig.instagramHandle,
    };
  });

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem('royal_products_v2', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to persist products to storage', e);
    }
  }, [products]);

  // Persist enquiries
  useEffect(() => {
    try {
      localStorage.setItem('royal_enquiries_v2', JSON.stringify(enquiries));
    } catch (e) {
      console.warn('Failed to persist enquiries to storage', e);
    }
  }, [enquiries]);

  // Persist gallery
  useEffect(() => {
    try {
      localStorage.setItem('royal_gallery_v2', JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Failed to persist gallery to storage', e);
    }
  }, [galleryItems]);

  // Persist brand content
  useEffect(() => {
    try {
      localStorage.setItem('royal_brand_content_v2', JSON.stringify(brandContent));
    } catch (e) {
      console.warn('Failed to persist brand content to storage', e);
    }
  }, [brandContent]);

  // Authentication
  const login = async (username: string, password: string) => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Standard demo / master credentials:
    // User: admin or admin@royalwater.com
    // Password: admin or royal2025
    if (
      (cleanUser === 'admin' || cleanUser === 'admin@royalwater.com') &&
      (cleanPass === 'admin' || cleanPass === 'royal2025' || cleanPass === 'admin123')
    ) {
      const userObj: AdminUser = {
        username: 'admin',
        role: 'superadmin',
        token: 'mock_jwt_royal_' + Date.now(),
      };
      setAdminUser(userObj);
      localStorage.setItem('royal_admin_session', JSON.stringify(userObj));
      setIsAdminViewOpen(true);
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid credentials. Please enter username "admin" and password "royal2025"',
    };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('royal_admin_session');
    setIsAdminViewOpen(false);
  };

  // Products CRUD
  const addProduct = (item: Omit<ProductItem, 'id'>) => {
    const newId = `product-${String(products.length + 1).padStart(2, '0')}`;
    const newProduct: ProductItem = {
      ...item,
      id: newId,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = (id: string, updated: Partial<ProductItem>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updated } : prod))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  // Enquiries CRUD
  const addEnquiry = (data: {
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
  }) => {
    const newEnquiry: AdminEnquiry = {
      id: 'enq-' + Date.now().toString().slice(-6),
      type: data.type,
      fullName: data.fullName,
      businessName: data.businessName || '',
      mobileNumber: data.mobileNumber,
      email: data.email || '',
      city: data.city,
      area: data.area || '',
      businessType: data.businessType || 'Distributor',
      productName: data.productName || '',
      message: data.message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const updateEnquiryStatus = (
    id: string,
    status: AdminEnquiry['status'],
    notes?: string
  ) => {
    setEnquiries((prev) =>
      prev.map((enq) => {
        if (enq.id === id) {
          return {
            ...enq,
            status,
            ...(notes !== undefined ? { notes } : {}),
          };
        }
        return enq;
      })
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newId = `gal-${Date.now().toString().slice(-4)}`;
    const newGal: GalleryItem = {
      ...item,
      id: newId,
    };
    setGalleryItems((prev) => [newGal, ...prev]);
  };

  const editGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((gal) => (gal.id === id ? { ...gal, ...updated } : gal))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((gal) => gal.id !== id));
  };

  // Brand Content
  const updateBrandContent = (newConfig: Partial<BrandConfigData>) => {
    setBrandContent((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  const resetBrandContent = () => {
    const original: BrandConfigData = {
      name: defaultBrandConfig.name,
      marathiName: defaultBrandConfig.marathiName,
      tagline: defaultBrandConfig.tagline,
      taglineMarathi: defaultBrandConfig.taglineMarathi,
      subTagline: defaultBrandConfig.subTagline,
      subTaglineMarathi: defaultBrandConfig.subTaglineMarathi,
      brandStoryShort: defaultBrandConfig.brandStoryShort,
      brandStoryShortMarathi: defaultBrandConfig.brandStoryShortMarathi,
      phone: defaultBrandConfig.phone,
      whatsapp: defaultBrandConfig.whatsapp,
      email: defaultBrandConfig.email,
      address: defaultBrandConfig.address,
      workingHours: defaultBrandConfig.workingHours,
      googleMapsUrl: defaultBrandConfig.googleMapsUrl,
      instagram: defaultBrandConfig.instagram,
      instagramHandle: defaultBrandConfig.instagramHandle,
    };
    setBrandContent(original);
  };

  return (
    <AdminDataContext.Provider
      value={{
        adminUser,
        login,
        logout,
        isAdminViewOpen,
        setIsAdminViewOpen,
        activeAdminTab,
        setActiveAdminTab,
        products,
        addProduct,
        editProduct,
        deleteProduct,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        galleryItems,
        addGalleryItem,
        editGalleryItem,
        deleteGalleryItem,
        brandContent,
        updateBrandContent,
        resetBrandContent,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};

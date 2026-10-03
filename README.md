# The-Royal-Premium-Water

Official web application for **Royal Premium Water** (शुद्ध पाणी. उत्तम जीवन. / Pure Water. Better Life.).

Premium packaged drinking water brand focused on multi-stage purification, hygienic bottling standards, regional distribution, and bulk water supply & dealership inquiries.

## Features

- **Responsive Brand Showcase**: Tailored for mobile (360px–430px) through ultra-wide desktop displays.
- **Bilingual Interface**: Seamless switching between English and Marathi (मराठी).
- **Product Specifications**: 250ml, 500ml, 1 Litre, 2 Litre, and 20 Litre bulk bubble-top jars.
- **Interactive Dealership Inquiry**: Dedicated dealership application modal with Indian mobile number validation and instant WhatsApp integration.
- **Water Quality & Process**: Interactive 8-stage purification process breakdown and mineral balance highlights.
- **Facility & Gallery**: Visual category filtering and modal lightbox display.
- **Direct Communication**: Instant calling, WhatsApp quick-message triggers, and contact form.
- **Accessibility & SEO**: Semantic ARIA tags, WCAG AA contrast standards, OpenGraph, and Schema.org `LocalBusiness` JSON-LD structured data.

## Tech Stack

- React 18+ (TypeScript)
- Vite
- Tailwind CSS
- Lucide React Icons

## Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── config/
│   │   ├── data/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/
    ├── models/
    │   ├── Product.js
    │   ├── Enquiry.js
    │   └── Admin.js
    ├── routes/
    │   ├── productRoutes.js
    │   └── enquiryRoutes.js
    ├── controllers/
    │   ├── productController.js
    │   └── enquiryController.js
    ├── server.js
    ├── .env
    └── package.json
```

## Getting Started

### Root (Frontend Dev Server & Build)
```bash
npm run dev      # Launches Vite dev server at http://localhost:3000
npm run build    # Builds production bundle to /dist
npm run lint     # TypeScript check for frontend
```

### Backend (Express API Server)
```bash
cd backend
npm install
npm run dev      # Runs Express on port 5000 (http://localhost:5000)
```

## Admin Portal & Dashboard

Access the administrative interface directly from the website header (Shield lock icon) or the footer ("Admin Portal" link).

- **Default Username**: `admin` (or `admin@royalwater.com`)
- **Default Password**: `royal2025` (or click "Auto-fill Demo")

### Dashboard Capabilities

- **Add Product**: Create new water bottles with bilingual English/Marathi titles, size labels, badges, and features.
- **Edit Product**: Update descriptions, features, and bottle variants in real time.
- **Delete Product**: Remove products with immediate live catalog updates.
- **View Enquiries**: Review general contact messages, customer event requirements, and change review status.
- **View Dealer Enquiries**: High-priority dealership & distribution lead tracker with one-click direct WhatsApp chat, telephone calling, and status workflow (`New`, `In Review`, `Contacted`, `Approved`).
- **Manage Gallery**: Add, edit, categorize, and delete photo assets.
- **Manage Website Content**: Live editor for central phone numbers, WhatsApp, plant address, brand story, taglines, and social links.

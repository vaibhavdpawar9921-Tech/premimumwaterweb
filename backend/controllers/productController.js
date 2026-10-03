const Product = require('../models/Product');

// Default initial catalog
const defaultProducts = [
  {
    code: 'Product 01',
    nameEn: 'Royal Premium Water - Compact Pack',
    nameMr: 'रॉयल प्रीमियम वॉटर - कॉम्पॅक्ट पॅक',
    sizePlaceholder: '[Available Size: 250ml / 300ml]',
    taglineEn: 'Ideal for conferences, events, and hospitality.',
    taglineMr: 'परिषद, विशेष कार्यक्रम आणि आदरातिथ्यासाठी योग्य.',
    descriptionEn:
      'Designed with high-clarity food-grade packaging. Compact, convenient, and strictly handled for pure refreshment on the go.',
    descriptionMr:
      'अत्याधुनिक आणि स्वच्छ पॅकेजिंग. प्रवासात, परिषदांमध्ये आणि स्वागत समारंभासाठी अत्यंत सोयीस्कर.',
    featuresEn: [
      'Food-grade ergonomic bottle',
      'Tamper-evident sealed cap',
      'Hygienically bottled',
      'Ready for bulk distribution',
    ],
    featuresMr: [
      'फूड-ग्रेड मजबूत बाटली',
      'सुरक्षित सीलबंद झाकण',
      'स्वच्छतेने बॉटलिंग केलेले',
      'बल्क वितरणासाठी उपलब्ध',
    ],
    badgeEn: 'Popular for Events',
    badgeMr: 'इव्हेंट्ससाठी लोकप्रिय',
    bottleColor: '#00A8C6',
    price: 10,
    inStock: true,
  },
  {
    code: 'Product 02',
    nameEn: 'Royal Premium Water - Daily Refresh',
    nameMr: 'रॉयल प्रीमियम वॉटर - डेली रिफ्रेश',
    sizePlaceholder: '[Available Size: 500ml / 1 Litre]',
    taglineEn: 'Everyday hydration for travel, office, and home.',
    taglineMr: 'प्रवास, कार्यालय आणि दैनंदिन वापरासाठी परिपूर्ण.',
    descriptionEn:
      'The signature Royal Premium Water bottle combining distinct royal blue branding with pristine taste and assured clarity.',
    descriptionMr:
      'रॉयल प्रीमियम वॉटरची मुख्य ओळख असणारी बाटली, जी शुद्ध चव आणि आकर्षक रॉयल लूकसह उपलब्ध आहे.',
    featuresEn: [
      'Signature Royal Blue grip contour',
      'Freshness sealed guarantee',
      'Balanced, neutral taste',
      'High-durability bottle design',
    ],
    featuresMr: [
      'आकर्षक रॉयल ब्लू डिझाइन',
      'ताजेपणाची खात्रीशीर सील',
      'संतुलित व नैसर्गिक चव',
      'मजबूत पॅकिंग',
    ],
    badgeEn: 'Signature Bottle',
    badgeMr: 'सिग्नेचर बाटली',
    bottleColor: '#1557A6',
    price: 20,
    inStock: true,
  },
  {
    code: 'Product 03',
    nameEn: 'Royal Premium Water - Institutional & Home Supply',
    nameMr: 'रॉयल प्रीमियम वॉटर - संस्थात्मक व घरगुती पुरवठा',
    sizePlaceholder: '[Available Size: 2 Litre / 20 Litre Can]',
    taglineEn: 'Reliable bulk supply for offices, restaurants, and families.',
    taglineMr: 'कार्यालये, हॉटेल्स आणि कुटुंबांसाठी नियमित पुरवठा.',
    descriptionEn:
      'Large format hygienic container option engineered for continuous dispenser usage and uninterrupted daily pure hydration.',
    descriptionMr:
      'मोठ्या प्रमाणातील दैनंदिन पाण्याच्या गरजेसाठी सुरक्षित, पुन्हा वापरण्यायोग्य आणि स्वच्छतापूर्ण कंटेनर.',
    featuresEn: [
      'Multi-washed sanitized container',
      'Leak-proof sealed valve',
      'Scheduled doorstep delivery option',
      'Ideal for corporate dispensers',
    ],
    featuresMr: [
      'स्वच्छ निर्जंतुक कंटेनर',
      'गळतीमुक्त सुरक्षित व्हॉल्व्ह',
      'वेळेवर थेट पुरवठा पर्याय',
      'कार्यालयीन वापरासाठी उत्तम',
    ],
    badgeEn: 'Bulk Supply Ready',
    badgeMr: 'बल्क सप्लाय पर्याय',
    bottleColor: '#0B2D5C',
    price: 80,
    inStock: true,
  },
];

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ code: 1 });

    // Seed defaults if collection is empty
    if (!products || products.length === 0) {
      try {
        products = await Product.insertMany(defaultProducts);
      } catch (seedErr) {
        // Fallback to in-memory list if DB write fails
        return res.status(200).json({
          success: true,
          count: defaultProducts.length,
          data: defaultProducts,
        });
      }
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    // If DB is offline, return default catalogue
    return res.status(200).json({
      success: true,
      count: defaultProducts.length,
      data: defaultProducts,
    });
  }
};

// @desc    Get single product by ID or code
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const query = req.params.id;
    let product;

    if (query.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(query);
    } else {
      product = await Product.findOne({
        $or: [{ code: query }, { 'code': new RegExp(query, 'i') }],
      });
    }

    if (!product) {
      const fallback = defaultProducts.find(
        (p) => p.code.toLowerCase() === query.toLowerCase()
      );
      if (fallback) {
        return res.status(200).json({ success: true, data: fallback });
      }
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

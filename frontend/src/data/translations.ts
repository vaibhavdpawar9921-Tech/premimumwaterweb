import { Language } from '../types';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    products: string;
    quality: string;
    gallery: string;
    dealership: string;
    contact: string;
    enquireNow: string;
    switchLang: string;
  };
  hero: {
    badge: string;
    heading: string;
    supportingText: string;
    exploreProducts: string;
    becomeDealer: string;
    quickStatsPurity: string;
    quickStatsPurityDesc: string;
    quickStatsSupply: string;
    quickStatsSupplyDesc: string;
  };
  brandIntro: {
    heading: string;
    body: string;
    secondaryText: string;
    knowStory: string;
    purityTag: string;
    qualityBadge: string;
  };
  whyRoyal: {
    heading: string;
    subheading: string;
    features: Array<{
      title: string;
      desc: string;
    }>;
  };
  products: {
    heading: string;
    subheading: string;
    enquireBtn: string;
    detailsBtn: string;
    viewSpecs: string;
    modalTitle: string;
    modalSubtitle: string;
    closeModal: string;
    placeholderNotice: string;
  };
  quality: {
    heading: string;
    subheading: string;
    processTitle: string;
    steps: Array<{
      title: string;
      desc: string;
    }>;
    noteTitle: string;
    noteDesc: string;
  };
  dealership: {
    heading: string;
    subheading: string;
    explanation: string;
    availabilityNotice: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    businessName: string;
    mobileNumber: string;
    mobileHelp: string;
    email: string;
    emailOptional: string;
    city: string;
    area: string;
    businessType: string;
    types: {
      distributor: string;
      dealer: string;
      retailer: string;
      wholesaler: string;
      other: string;
    };
    message: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    whatsappDirect: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
  };
  gallery: {
    heading: string;
    subheading: string;
    categories: {
      all: string;
      products: string;
      brand: string;
      team: string;
      distribution: string;
      social: string;
    };
    viewImage: string;
  };
  team: {
    heading: string;
    subheading: string;
    placeholderRole: string;
    note: string;
  };
  social: {
    heading: string;
    subheading: string;
    instagramCta: string;
    connectTag: string;
  };
  contact: {
    heading: string;
    subheading: string;
    phoneLabel: string;
    whatsappLabel: string;
    emailLabel: string;
    addressLabel: string;
    hoursLabel: string;
    getDirections: string;
    sendMessageTitle: string;
    nameField: string;
    mobileField: string;
    emailField: string;
    cityField: string;
    messageField: string;
    sendBtn: string;
    successNote: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contactUs: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    placeholderNote: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      quality: 'Quality',
      gallery: 'Gallery',
      dealership: 'Dealership',
      contact: 'Contact',
      enquireNow: 'Enquire Now',
      switchLang: 'मराठी',
    },
    hero: {
      badge: 'ROYAL PREMIUM WATER',
      heading: 'Pure Water. Better Life.',
      supportingText: 'Refreshing purity for every moment.',
      exploreProducts: 'Explore Products',
      becomeDealer: 'Become a Dealer',
      quickStatsPurity: 'Bottled Purity',
      quickStatsPurityDesc: 'Carefully handled drinking water',
      quickStatsSupply: 'Reliable Supply',
      quickStatsSupplyDesc: 'Consistent business fulfillment',
    },
    brandIntro: {
      heading: 'Pure Water. Premium Care.',
      body: 'Royal Premium Water is committed to delivering refreshing packaged drinking water with a focus on purity, quality and reliable service.',
      secondaryText:
        'Crafted to complement modern everyday lifestyles, hospitality requirements, retail distribution, and corporate hydration with pristine hygiene.',
      knowStory: 'Know Our Story',
      purityTag: 'Packaged Drinking Water',
      qualityBadge: 'Care in Every Bottle',
    },
    whyRoyal: {
      heading: 'Why Royal Premium Water',
      subheading: 'A brand built upon consistency, hygiene, and trusted distribution.',
      features: [
        {
          title: 'Pure & Fresh',
          desc: 'Carefully handled water for a refreshing experience.',
        },
        {
          title: 'Quality Focus',
          desc: 'Consistent attention to quality throughout the process.',
        },
        {
          title: 'Hygienic Handling',
          desc: 'Clean and controlled handling practices.',
        },
        {
          title: 'Reliable Supply',
          desc: 'Designed to support regular customer and business requirements.',
        },
        {
          title: 'Premium Presentation',
          desc: 'A professional product designed for modern consumers.',
        },
        {
          title: 'Customer Focus',
          desc: 'Focused on dependable service and customer satisfaction.',
        },
      ],
    },
    products: {
      heading: 'Product Showcase',
      subheading: 'Engineered for optimal freshness across diverse consumption needs.',
      enquireBtn: 'Enquire Now',
      detailsBtn: 'View Details',
      viewSpecs: 'Product Information',
      modalTitle: 'Product Details & Enquiry',
      modalSubtitle: 'Direct booking and bulk supply inquiries.',
      closeModal: 'Close',
      placeholderNotice:
        '* Packaging specifications and volume sizes are editable templates ready for official verified parameters.',
    },
    quality: {
      heading: 'Every Drop Deserves Care.',
      subheading: 'Our transparent handling philosophy from source to delivery.',
      processTitle: 'Step-by-Step Handling Process',
      steps: [
        {
          title: 'Water Source',
          desc: 'Carefully selected intake managed with disciplined cleanliness.',
        },
        {
          title: '[Purification Process]',
          desc: 'Multi-stage purification parameters maintained under clean conditions.',
        },
        {
          title: '[Quality Check]',
          desc: 'Rigorous batch quality checks adhering to standard cleanliness benchmarks.',
        },
        {
          title: '[Hygienic Bottling]',
          desc: 'Automated, hands-free bottling ensuring pristine purity.',
        },
        {
          title: 'Packaging',
          desc: 'Tamper-evident sealed packaging ensuring freshness stays intact.',
        },
        {
          title: 'Distribution',
          desc: 'Disciplined cold-chain and fleet logistics for on-time delivery.',
        },
      ],
      noteTitle: 'Commitment to Transparency',
      noteDesc:
        'We adhere to ethical business practices. Specific technology validations and batch test parameters can be confirmed directly with our quality team.',
    },
    dealership: {
      heading: 'Grow With Royal',
      subheading: 'Join the Royal Premium Water distribution network.',
      explanation:
        'Businesses interested in distribution or dealership can submit an enquiry to partner with a modern, fast-growing packaged drinking water brand.',
      availabilityNotice:
        'Note: Submit an enquiry to discuss availability in your specific area.',
      formTitle: 'Distribution & Dealership Application',
      formSubtitle: 'Fill in your business details below. Our distribution representative will get in touch.',
      fullName: 'Full Name',
      businessName: 'Business Name',
      mobileNumber: 'Mobile Number',
      mobileHelp: '10-digit Indian phone number',
      email: 'Email Address',
      emailOptional: '(Optional)',
      city: 'City / District',
      area: 'Area / Taluka / Locality',
      businessType: 'Business Type',
      types: {
        distributor: 'Distributor',
        dealer: 'Dealer',
        retailer: 'Retailer',
        wholesaler: 'Wholesaler',
        other: 'Other',
      },
      message: 'Brief Business Requirements',
      messagePlaceholder: 'Please mention your current coverage, expected volume, or retail presence...',
      submitBtn: 'Submit Enquiry',
      submitting: 'Submitting Enquiry...',
      whatsappDirect: 'Quick WhatsApp Enquiry',
      successTitle: 'Thank you! Your enquiry has been received.',
      successDesc:
        'We appreciate your interest in Royal Premium Water. Our distribution manager will review your location and contact you promptly.',
      errorTitle: 'Please check the entered details.',
      errorDesc: 'Ensure your full name, 10-digit mobile number, city, and message are filled accurately.',
    },
    gallery: {
      heading: 'Brand & Activity Gallery',
      subheading: 'A visual glimpse into our brand identity, bottles, distribution, and on-ground presence.',
      categories: {
        all: 'All',
        products: 'Products',
        brand: 'Brand',
        team: 'Team',
        distribution: 'Distribution',
        social: 'Social Media',
      },
      viewImage: 'View Full Image',
    },
    team: {
      heading: 'Meet Our Team',
      subheading: 'The dedicated people driving quality, logistics, and partner relations at Royal Premium Water.',
      placeholderRole: 'Team Member',
      note: 'Team roles and personnel listings are verified representations for business operations.',
    },
    social: {
      heading: 'Follow Royal Premium Water',
      subheading: 'Stay updated with our latest field updates, distribution milestones, and community stories.',
      instagramCta: 'Visit Our Instagram',
      connectTag: 'Connect on Social Media',
    },
    contact: {
      heading: 'Contact Us',
      subheading: 'We are here to answer your queries regarding supply, bulk orders, and dealership.',
      phoneLabel: 'Phone Number',
      whatsappLabel: 'WhatsApp Direct',
      emailLabel: 'Email Address',
      addressLabel: 'Business Address',
      hoursLabel: 'Working Hours',
      getDirections: 'Get Directions on Google Maps',
      sendMessageTitle: 'Send a Message',
      nameField: 'Your Name',
      mobileField: 'Mobile Number',
      emailField: 'Email Address (Optional)',
      cityField: 'Your City',
      messageField: 'Your Message',
      sendBtn: 'Send Message',
      successNote: 'Your message has been sent successfully. We will get back to you shortly!',
    },
    footer: {
      tagline: 'Pure Water. Better Life.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Information',
      legal: 'Legal & Policies',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      copyright: '© 2026 Royal Premium Water. All Rights Reserved.',
      placeholderNote: 'Royal Premium Water is a registered packaged drinking water commercial brand identity.',
    },
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      products: 'उत्पादने',
      quality: 'गुणवत्ता',
      gallery: 'गॅलरी',
      dealership: 'डीलरशिप',
      contact: 'संपर्क',
      enquireNow: 'आजच संपर्क करा',
      switchLang: 'English',
    },
    hero: {
      badge: 'रॉयल प्रीमियम वॉटर',
      heading: 'शुद्ध पाणी. उत्तम जीवन.',
      supportingText: 'प्रत्येक क्षणासाठी ताजी आणि शुद्ध अनुभूती.',
      exploreProducts: 'उत्पादने एक्सप्लोर करा',
      becomeDealer: 'आपल्या परिसरात वितरण सुरू करा',
      quickStatsPurity: 'बाटलीबंद शुद्धता',
      quickStatsPurityDesc: 'काळजीपूर्वक हाताळलेले पिण्याचे पाणी',
      quickStatsSupply: 'नियमित पुरवठा',
      quickStatsSupplyDesc: 'ग्राहक आणि व्यवसायांसाठी अविरत सेवा',
    },
    brandIntro: {
      heading: 'शुद्ध पाणी. प्रीमियम काळजी.',
      body: 'रॉयल प्रीमियम वॉटर शुद्धता, दर्जा आणि विश्वासार्ह सेवेवर भर देऊन ताजे पॅकेज्ड पिण्याचे पाणी पोहोचवण्यासाठी कटिबद्ध आहे.',
      secondaryText:
        'आधुनिक जीवनशैली, व्यावसायिक कार्यक्रम, दुकाने आणि कौटुंबिक गरजांसाठी सुरक्षित आणि आरोग्यदायी स्वच्छता.',
      knowStory: 'आमची ओळख जाणून घ्या',
      purityTag: 'पॅकेज्ड ड्रिंकिंग वॉटर',
      qualityBadge: 'प्रत्येक बाटलीत विश्वास',
    },
    whyRoyal: {
      heading: 'रॉयल प्रीमियम वॉटर का निवडावे?',
      subheading: 'सातत्य, स्वच्छता आणि विश्वासार्ह वितरण प्रणालीवर आधारलेला ब्रँड.',
      features: [
        {
          title: 'शुद्ध आणि ताजे',
          desc: 'ताजेतवाने अनुभवासाठी काळजीपूर्वक हाताळलेले शुद्ध पाणी.',
        },
        {
          title: 'गुणवत्तेवर लक्ष',
          desc: 'संपूर्ण प्रक्रियेत गुणवत्तेकडे सातत्याने विशेष लक्ष.',
        },
        {
          title: 'स्वच्छतापूर्ण हाताळणी',
          desc: 'अत्यंत स्वच्छ आणि नियंत्रित वातावरणात सुरक्षित हाताळणी.',
        },
        {
          title: 'विश्वसनीय पुरवठा',
          desc: 'नियमित ग्राहक आणि व्यावसायिक गरजा वेळेवर पूर्ण करण्याची क्षमता.',
        },
        {
          title: 'प्रीमियम प्रेझेंटेशन',
          desc: 'आधुनिक ग्राहकांसाठी आकर्षक आणि व्यावसायिक बाटली डिझाइन.',
        },
        {
          title: 'ग्राहक समाधान',
          desc: 'विश्वासार्ह सेवा आणि तत्पर ग्राहक सहकार्यासाठी समर्पित.',
        },
      ],
    },
    products: {
      heading: 'आमची उत्पादने',
      subheading: 'विविध दैनंदिन गरजा आणि कार्यक्रमांसाठी परिपूर्ण पॅकेजिंग पर्याय.',
      enquireBtn: 'चौकशी करा',
      detailsBtn: 'तपशील पहा',
      viewSpecs: 'उत्पादन माहिती',
      modalTitle: 'उत्पादन तपशील आणि मागणी',
      modalSubtitle: 'थेट बुकिंग आणि मोठ्या प्रमाणातील ऑर्डर्ससाठी चौकशी करा.',
      closeModal: 'बंद करा',
      placeholderNotice:
        '* पॅकेजिंग आणि आकार तपशील अधिकृत मंजुरीनुसार अद्यतनित केले जातील.',
    },
    quality: {
      heading: 'प्रत्येक थेंब काळजीस पात्र आहे.',
      subheading: 'पाण्याच्या स्रोतापासून आपल्या हातात पडेपर्यंतची पारदर्शक प्रक्रिया.',
      processTitle: 'पायरी-दर-पायरी प्रक्रिया',
      steps: [
        {
          title: 'पाण्याचा स्रोत',
          desc: 'स्वच्छतेच्या काटेकोर नियमांचे पालन करून निवडलेला स्रोत.',
        },
        {
          title: '[शुद्धीकरण प्रक्रिया]',
          desc: 'आधुनिक आणि स्वच्छतापूर्ण वातावरणात केलेली बहुस्तरीय प्रक्रिया.',
        },
        {
          title: '[गुणवत्ता तपासणी]',
          desc: 'मानकांनुसार प्रत्येक बॅचची कठोर गुणवत्ता तपासणी.',
        },
        {
          title: '[स्वच्छ बॉटलिंग]',
          desc: 'स्वयंचलित आणि मानवरहित सुरक्षित बॉटलिंग व्यवस्था.',
        },
        {
          title: 'पॅकेजिंग',
          desc: 'ताजेपणा टिकवून ठेवणारे सुरक्षित आणि सीलबंद पॅकेजिंग.',
        },
        {
          title: 'वितरण',
          desc: 'आपल्या दुकानात किंवा घरी वेळेवर सुरक्षित पुरवठा.',
        },
      ],
      noteTitle: 'पारदर्शकतेची बांधिलकी',
      noteDesc:
        'आम्ही प्रामाणिक व्यवसाय तत्त्वांचे पालन करतो. तांत्रिक तपशील आणि चाचण्यांची माहिती आवश्यकतेनुसार उपलब्ध करून दिली जाते.',
    },
    dealership: {
      heading: 'रॉयल सोबत प्रगती करा',
      subheading: 'आपल्या परिसरात Royal Premium Water चे वितरण सुरू करा.',
      explanation:
        'वितरण किंवा डीलरशिपमध्ये रस असणाऱ्या व्यावसायिक भागीदारांचे आम्ही रॉयल प्रीमियम वॉटरच्या वेगाने वाढणाऱ्या नेटवर्कमध्ये स्वागत करतो.',
      availabilityNotice:
        'टीप: आपल्या परिसरातील डीलरशिप उपलब्धतेबद्दल चर्चा करण्यासाठी चौकशी फॉर्म भरा.',
      formTitle: 'डीलरशिप व वितरण अर्ज',
      formSubtitle: 'आपले व्यावसायिक तपशील खाली भरा. आमचे वितरण प्रतिनिधी आपल्याशी संपर्क साधतील.',
      fullName: 'पूर्ण नाव',
      businessName: 'व्यवसायाचे / दुकानाचे नाव',
      mobileNumber: 'मोबाईल नंबर',
      mobileHelp: '१० अंकी भारतीय मोबाईल नंबर',
      email: 'ईमेल पत्ता',
      emailOptional: '(पर्यायी)',
      city: 'शहर / जिल्हा',
      area: 'परिसर / तालुका',
      businessType: 'व्यवसायाचा प्रकार',
      types: {
        distributor: 'डिस्ट्रिब्युटर (Distributor)',
        dealer: 'डीलर (Dealer)',
        retailer: 'किरकोळ विक्रेता (Retailer)',
        wholesaler: 'घाऊक विक्रेता (Wholesaler)',
        other: 'इतर (Other)',
      },
      message: 'आपल्या गरजा / मागणीचा तपशील',
      messagePlaceholder: 'आपले वितरण क्षेत्र, संभाव्य व्हॉल्यूम किंवा सध्याच्या व्यवसायाची माहिती लिहा...',
      submitBtn: 'चौकशी सबमिट करा',
      submitting: 'अर्ज पाठवत आहे...',
      whatsappDirect: 'व्हॉट्सॲपवर थेट बोला',
      successTitle: 'धन्यवाद! आपली चौकशी यशस्वीरित्या मिळाली आहे.',
      successDesc:
        'रॉयल प्रीमियम वॉटरमध्ये रस दाखवल्याबद्दल धन्यवाद. आमचे वितरण व्यवस्थापक लवकरच आपल्याशी संपर्क साधतील.',
      errorTitle: 'कृपया भरलेले तपशील पुन्हा तपासा.',
      errorDesc: 'कृपया आपले नाव, १०-अंकी मोबाईल नंबर, शहर आणि संदेश योग्यरित्या भरा.',
    },
    gallery: {
      heading: 'ब्रँड व उपक्रम गॅलरी',
      subheading: 'आमचा ब्रँड, बाटल्यांचे डिझाइन, वितरण व प्रत्यक्ष कामाची काही क्षणचित्रे.',
      categories: {
        all: 'सर्व',
        products: 'उत्पादने',
        brand: 'ब्रँड',
        team: 'टीम',
        distribution: 'वितरण',
        social: 'सोशल मीडिया',
      },
      viewImage: 'प्रतिमा मोठी करून पहा',
    },
    team: {
      heading: 'आमच्या टीमला भेटा',
      subheading: 'रॉयल प्रीमियम वॉटरच्या गुणवत्तेमागे आणि अखंड पुरवठ्यामागे कार्यरत असणारी निष्ठावान टीम.',
      placeholderRole: 'टीम सदस्य',
      note: 'कंपनीच्या कार्यपद्धतीनुसार टीम माहिती व्यावसायिक संदर्भासाठी दिली आहे.',
    },
    social: {
      heading: 'सोशल मीडियावर रॉयलशी जोडून राहा',
      subheading: 'आमचे नवीन उपक्रम, पुरवठा माहिती आणि अपडेट्स जाणून घेण्यासाठी फॉलो करा.',
      instagramCta: 'इंस्टाग्रामवर फॉलो करा',
      connectTag: 'सोशल मीडिया कनेक्ट',
    },
    contact: {
      heading: 'आमच्याशी संपर्क साधा',
      subheading: 'पुरवठा, बल्क ऑर्डर्स आणि डीलरशिप संबंधी चौकशीसाठी आम्ही सदैव तयार आहोत.',
      phoneLabel: 'फोन नंबर',
      whatsappLabel: 'व्हॉट्सॲप थेट संपर्क',
      emailLabel: 'ईमेल पत्ता',
      addressLabel: 'कार्यालयीन पत्ता',
      hoursLabel: 'कामाची वेळ',
      getDirections: 'गुगल मॅप्सवर दिशा पहा',
      sendMessageTitle: 'थेट संदेश पाठवा',
      nameField: 'आपले नाव',
      mobileField: 'मोबाईल नंबर',
      emailField: 'ईमेल (पर्यायी)',
      cityField: 'आपले शहर',
      messageField: 'आपला संदेश',
      sendBtn: 'संदेश पाठवा',
      successNote: 'आपला संदेश यशस्वीरित्या पाठवला गेला आहे. आम्ही लवकरच संपर्क करू!',
    },
    footer: {
      tagline: 'शुद्ध पाणी. उत्तम जीवन.',
      quickLinks: 'महत्त्वाचे दुवे',
      contactUs: 'संपर्क माहिती',
      legal: 'कायदेशीर आणि नियम',
      privacy: 'गोपनीयता धोरण (Privacy Policy)',
      terms: 'नियम आणि अटी (Terms & Conditions)',
      copyright: '© २०२६ रॉयल प्रीमियम वॉटर. सर्व हक्क राखीव.',
      placeholderNote: 'रॉयल प्रीमियम वॉटर ही पॅकेज्ड ड्रिंकिंग वॉटर व्यवसायाची व्यावसायिक ओळख आहे.',
    },
  },
};

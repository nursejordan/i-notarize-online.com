// Mock data for i-Notarize-Online landing page
// This file contains all the mock data used in the frontend components
// It will be replaced with real API calls during backend integration

export const mockData = {
  // Business Information
  business: {
    name: "i-Notarize-Online",
    domain: "i-notarize-online.com",
    notaryName: "Yordanos Mathewos",
    licenseNumber: "NY-2024-001234",
    phone: "(555) 123-4567",
    email: "yordanos@i-notarize-online.com",
    address: {
      state: "New York",
      serviceArea: "Greater New York Area & Worldwide"
    }
  },

  // Services and Pricing
  services: [
    {
      id: "remote",
      name: "Remote Online Notarization",
      basePrice: 25,
      description: "Secure video-based notarization from anywhere",
      availability: "24/7",
      features: ["Instant delivery", "Legally binding", "Secure platform"]
    },
    {
      id: "mobile", 
      name: "Mobile Notary Service",
      basePrice: 75,
      description: "Professional notary comes to your location",
      availability: "8 AM - 8 PM",
      features: ["NYC metro area", "Same-day service", "Volume discounts"]
    },
    {
      id: "bulk",
      name: "Bulk Services",
      basePrice: null,
      description: "Custom pricing for businesses and law firms",
      availability: "By appointment",
      features: ["Volume pricing", "Priority scheduling", "Dedicated support"]
    }
  ],

  // Document types commonly notarized
  documentTypes: [
    "Real Estate Documents",
    "Power of Attorney", 
    "Wills & Trusts",
    "Loan Documents",
    "Affidavits",
    "Contracts & Agreements",
    "Medical Forms",
    "Financial Documents"
  ],

  // Service coverage areas
  coverage: {
    mobile: [
      "Manhattan",
      "Brooklyn", 
      "Queens",
      "Bronx",
      "Staten Island",
      "Long Island",
      "Westchester",
      "Nassau County",
      "Suffolk County"
    ],
    remote: [
      "All 50 US States",
      "Washington DC", 
      "Puerto Rico",
      "International (US Citizens)",
      "Military (APO/FPO)"
    ]
  },

  // Travel fees for mobile service
  travelFees: [
    {
      area: "Manhattan & Brooklyn",
      fee: 0,
      description: "No travel fee within 10 miles"
    },
    {
      area: "Queens, Bronx, Staten Island", 
      fee: 25,
      description: "Flat rate within boroughs"
    },
    {
      area: "Long Island, Westchester",
      fee: "1/mile",
      description: "Per mile beyond 25 mile radius"
    }
  ],

  // Customer testimonials
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Real Estate Agent",
      rating: 5,
      content: "Yordanos made our urgent closing possible with her remote service. Professional, quick, and legally compliant. Highly recommended!",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen", 
      role: "Business Owner",
      rating: 5,
      content: "Needed multiple documents notarized for my business. The mobile service was convenient and saved me hours of travel time.",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      role: "Healthcare Professional", 
      rating: 5,
      content: "Perfect for my busy schedule. The remote notarization was seamless and the documents were ready immediately.",
      date: "2024-01-08"
    }
  ],

  // Business statistics
  stats: {
    documentsNotarized: "500+",
    averageRating: "4.9",
    averageSessionTime: "15min", 
    serviceAvailability: "24/7"
  },

  // Credentials and certifications
  credentials: [
    {
      title: "NY State Licensed",
      description: "Official notary commission in New York State",
      detail: "License #NY-2024-001234"
    },
    {
      title: "Bonded & Insured",
      description: "$10,000 surety bond and E&O insurance", 
      detail: "Full protection coverage"
    },
    {
      title: "Platform Certified",
      description: "Verified on OneNotary.us and BlueNotary.us",
      detail: "Trusted partner networks"
    }
  ],

  // Platform partnerships
  partners: [
    {
      name: "OneNotary.us",
      url: "https://onenotary.us/become-an-online-notary/",
      description: "Online notary platform partner"
    },
    {
      name: "BlueNotary.us", 
      url: "https://bluenotary.us/for-notaries",
      description: "Remote notarization platform"
    }
  ],

  // Additional services and fees
  additionalServices: [
    {
      service: "Document scan & prep",
      price: 10
    },
    {
      service: "Rush processing (< 2 hours)",
      price: 15
    },
    {
      service: "Certified copies", 
      price: 5,
      unit: "each"
    },
    {
      service: "Apostille coordination",
      price: 25
    }
  ],

  // Business hours
  businessHours: {
    remote: "24/7",
    mobile: "8 AM - 8 PM",
    phoneSupport: "7 AM - 10 PM", 
    weekend: "Available"
  },

  // FAQ data (for future use)
  faqs: [
    {
      question: "Is remote notarization legally binding?",
      answer: "Yes, remote online notarization (RON) is legally binding and recognized in most US states. New York allows RON for documents that will be used outside the state."
    },
    {
      question: "What do I need for a remote notarization session?",
      answer: "You need a government-issued photo ID, a device with camera and internet, and your unsigned documents in digital format."
    },
    {
      question: "How long does the notarization process take?",
      answer: "Most remote sessions take 15-30 minutes. Mobile sessions may take longer depending on the number of documents and complexity."
    },
    {
      question: "Do you provide services on weekends?",
      answer: "Yes, remote services are available 24/7. Mobile services are available on weekends by appointment."
    }
  ],

  // Form submission endpoints (mock)
  api: {
    contactForm: "/api/contact/submit",
    bookingForm: "/api/booking/create",
    quoteRequest: "/api/quote/request"
  }
};

// Helper functions for mock data
export const getMockService = (serviceId) => {
  return mockData.services.find(service => service.id === serviceId);
};

export const getMockTestimonials = (limit = null) => {
  return limit ? mockData.testimonials.slice(0, limit) : mockData.testimonials;
};

export const getMockCoverageArea = (type) => {
  return mockData.coverage[type] || [];
};

export const formatPrice = (price) => {
  if (price === null) return "Custom";
  if (typeof price === "string") return price;
  return `$${price}`;
};

// Mock API call functions (simulate network delays)
export const mockApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      });
    }, delay);
  });
};

export const mockContactSubmit = (formData) => {
  return mockApiCall({
    message: "Contact form submitted successfully",
    reference: `REQ-${Date.now()}`,
    formData
  });
};

export const mockBookingSubmit = (bookingData) => {
  return mockApiCall({
    message: "Booking request submitted successfully", 
    bookingId: `BOOK-${Date.now()}`,
    bookingData
  });
};

export default mockData;
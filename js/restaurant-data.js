const LOCAL_RESTAURANT_DATA = {
    
  "restaurant": {
    "name": "Bayt Al Mandi",
    "shortName": "Bayt Al Mandi",
    "tagline": "Slow-smoked Yemeni tradition",
    "description": "Authentic Yemeni mandi and madhbi, cooked in a clay taboon oven and served the traditional way.",
    "cuisine": "Arabic / Yemeni",
    "currency": "SAR",
    "currencyPosition": "before",
    "language": "en",
    "direction": "ltr",

    "logo": "assets/logo/logo.png",
    "favicon": "assets/logo/logo.png",

    "hero": {
      "image": "assets/hero/hero.jpg",
      "title": "Slow-Smoked. Deeply Traditional.",
      "subtitle": "Mandi, madhbi and charcoal grills prepared the Yemeni way since 1998.",
      "menuButtonText": "View Menu",
      "locationButtonText": "Find Location"
    },

    "contact": {
      "phone": "+966501234567",
      "whatsapp": "+966501234567",
      "email": "hello@baytalmandi.example",
      "instagram": "https://instagram.com/",
      "tiktok": ""
    },

    "location": {
      "name": "Bayt Al Mandi - Al Olaya",
      "address": "Al Olaya Street, Riyadh 12241, Saudi Arabia",
      "googleMapsUrl": "https://maps.google.com/?q=Al+Olaya+Street+Riyadh",
      "googleMapsEmbedUrl": "https://www.google.com/maps?q=Al%20Olaya%20Street%20Riyadh&output=embed"
    },

    "openingHours": [
      { "days": "Sunday - Thursday", "hours": "11:00 AM - 1:00 AM" },
      { "days": "Friday - Saturday", "hours": "1:00 PM - 2:00 AM" }
    ]
  },

  "theme": {
    "primary": "#1c1410",
    "secondary": "#ffffff",
    "accent": "#c79a52",
    "background": "#f7f3ec",
    "surface": "#ffffff",
    "text": "#1b1510",
    "mutedText": "#7a6d60",
    "heroOverlay": "linear-gradient(180deg, rgba(20,13,8,0.55) 0%, rgba(20,13,8,0.75) 100%)",
    "headingFont": "\"Cormorant Garamond\", Georgia, serif",
    "bodyFont": "\"Karla\", system-ui, sans-serif",
    "googleFonts": ["Cormorant Garamond:wght@500;600;700", "Karla:wght@400;500;600"],
    "borderRadius": "18px"
  },

  "menuIntro": "Everything is cooked to order in our clay taboon oven.",

  "categories": [
    { "id": "mandi", "name": "Mandi" },
    { "id": "madhbi", "name": "Madhbi" },
    { "id": "grills", "name": "Grills" },
    { "id": "starters", "name": "Starters" },
    { "id": "desserts", "name": "Desserts" },
    { "id": "drinks", "name": "Drinks" }
  ],

  "menu": [
    {
      "id": 1,
      "category": "mandi",
      "name": "Chicken Mandi",
      "description": "Half chicken slow-smoked over charcoal, served on saffron basmati rice.",
      "halfPrice": 32,
      "fullPrice": 60,
      "calories": 650,
      "image": "assets/menu/chicken-mandi.jpg",
      "available": true,
      "badge": "Bestseller",
      "dietary": []
    },
    {
      "id": 2,
      "category": "mandi",
      "name": "Lamb Mandi",
      "description": "Tender lamb shank rested for six hours over aromatic rice with almonds and raisins.",
      "halfPrice": 58,
      "fullPrice": 110,
      "calories": 820,
      "image": "assets/menu/lamb-mandi.jpg",
      "available": true,
      "badge": "Chef's Choice",
      "dietary": []
    },
    {
      "id": 3,
      "category": "mandi",
      "name": "Family Mandi Platter",
      "description": "A full platter of chicken and lamb with rice, salads and sauces. Serves 4-5.",
      "halfPrice": 95,
      "fullPrice": 185,
      "calories": 2400,
      "image": "assets/menu/lamb-mandi.jpg",
      "available": true,
      "badge": "Popular",
      "dietary": []
    },
    {
      "id": 4,
      "category": "madhbi",
      "name": "Chicken Madhbi",
      "description": "Flame-grilled on a hot stone slab and brushed with our house tomato marinade.",
      "price": 36,
      "calories": 700,
      "image": "assets/menu/mixed-grill.jpg",
      "available": true,
      "badge": "Spicy",
      "dietary": []
    },
    {
      "id": 5,
      "category": "madhbi",
      "name": "Lamb Madhbi",
      "description": "Stone-grilled lamb pieces with smoked butter rice.",
      "price": 62,
      "calories": 890,
      "image": "assets/menu/lamb-mandi.jpg",
      "available": true,
      "badge": "",
      "dietary": []
    },
    {
      "id": 6,
      "category": "grills",
      "name": "Mixed Grill Platter",
      "description": "Shish tawook, kofta and lamb kebab with grilled vegetables and flatbread.",
      "price": 74,
      "calories": 980,
      "image": "assets/menu/mixed-grill.jpg",
      "available": true,
      "badge": "Bestseller",
      "dietary": []
    },
    {
      "id": 7,
      "category": "grills",
      "name": "Shish Tawook",
      "description": "Marinated chicken skewers with garlic cream and pickles.",
      "price": 38,
      "calories": 520,
      "image": "assets/menu/mixed-grill.jpg",
      "available": true,
      "badge": "",
      "dietary": []
    },
    {
      "id": 8,
      "category": "grills",
      "name": "Lamb Kofta",
      "description": "Hand-minced lamb with parsley and onion, grilled over charcoal.",
      "price": 42,
      "calories": 610,
      "image": "",
      "available": true,
      "badge": "",
      "dietary": []
    },
    {
      "id": 9,
      "category": "starters",
      "name": "Hummus Beiruti",
      "description": "Chickpea puree with olive oil and pine nuts, served with warm bread.",
      "price": 18,
      "calories": 310,
      "image": "assets/menu/hummus.jpg",
      "available": true,
      "badge": "",
      "dietary": ["Vegetarian"]
    },
    {
      "id": 10,
      "category": "starters",
      "name": "Fattoush",
      "description": "Crisp garden salad with sumac, pomegranate molasses and toasted bread.",
      "price": 20,
      "calories": 240,
      "image": "",
      "available": true,
      "badge": "New",
      "dietary": ["Vegan"]
    },
    {
      "id": 11,
      "category": "starters",
      "name": "Lentil Shorba",
      "description": "Warm spiced lentil soup with lemon.",
      "price": 14,
      "image": "",
      "available": true,
      "badge": "",
      "dietary": ["Vegan"]
    },
    {
      "id": 12,
      "category": "desserts",
      "name": "Kunafa Nabulsia",
      "description": "Crisp shredded pastry with melted cheese, syrup and pistachio.",
      "price": 26,
      "calories": 520,
      "image": "assets/menu/kunafa.jpg",
      "available": true,
      "badge": "Popular",
      "dietary": ["Vegetarian"]
    },
    {
      "id": 13,
      "category": "desserts",
      "name": "Date Pudding",
      "description": "Warm Ajwa date cake with cardamom cream.",
      "price": 22,
      "calories": 440,
      "image": "",
      "available": false,
      "badge": "",
      "dietary": ["Vegetarian"]
    },
    {
      "id": 14,
      "category": "drinks",
      "name": "Moroccan Mint Tea",
      "description": "Green tea steeped with fresh mint, served with dates.",
      "price": 12,
      "calories": 80,
      "image": "assets/menu/mint-tea.jpg",
      "available": true,
      "badge": "",
      "dietary": ["Vegan"]
    },
    {
      "id": 15,
      "category": "drinks",
      "name": "Fresh Mango Juice",
      "description": "Cold-pressed mango, no added sugar.",
      "price": 16,
      "calories": 150,
      "image": "",
      "available": true,
      "badge": "",
      "dietary": ["Vegan"]
    },
    {
      "id": 16,
      "category": "drinks",
      "name": "Arabic Coffee",
      "description": "Lightly roasted qahwa with saffron and cardamom.",
      "price": 10,
      "image": "",
      "available": true,
      "badge": "",
      "dietary": ["Vegan"]
    }
  ],

  "labels": {
    "all": "All",
    "menuHeading": "Our Menu",
    "searchPlaceholder": "Search our menu...",
    "noResults": "No menu items found.",
    "visitHeading": "Visit Us",
    "call": "Call",
    "whatsapp": "WhatsApp",
    "directions": "Get Directions",
    "unavailable": "Currently Unavailable",
    "half": "Half",
    "full": "Full",
    "nav": { "menu": "Menu", "location": "Location", "contact": "Contact" }
  },

  "footer": {
    "copyright": "© 2026 Bayt Al Mandi. All rights reserved."
  }
};
export interface Product {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  image: string;
  inStock: boolean;
  isPopular?: boolean;
}

export const CATEGORIES = [
  { id: 'all', name: 'सब सामान', englishName: 'All Products' },
  { id: 'mithila-specials', name: 'मिथिला स्पेशल', englishName: 'Mithila Specials' },
  { id: 'dal-chawal', name: 'दाल और चावल', englishName: 'Dals & Rice' },
  { id: 'spices-oils', name: 'मसाले और तेल', englishName: 'Spices & Oils' },
  { id: 'snacks-staples', name: 'नाश्ता और सत्तू', englishName: 'Snacks & Staples' },
  { id: 'daily-essentials', name: 'रोज़ाना की ज़रूरतें', englishName: 'Daily Essentials' }
];

export const products: Product[] = [
  // Mithila Specials
  {
    id: 'm1',
    name: 'Premium Mithila Makhana',
    hindiName: 'प्रीमियम मिथिला मखाना',
    description: 'Directly sourced organic, large size Phool Makhana (Foxnuts) from Darbhanga. High in protein and antioxidants.',
    price: 180,
    originalPrice: 220,
    unit: '250 gm',
    category: 'mithila-specials',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80', // Foxnuts / Cashews working image
    inStock: true,
    isPopular: true
  },
  {
    id: 'm2',
    name: 'Mithila Special Katarni Rice',
    hindiName: 'मिथिला कतरनी चावल',
    description: 'Superfine aromatic Katarni rice from the fields of Mithila. Famous for its unique aroma and sweet taste.',
    price: 90,
    originalPrice: 110,
    unit: '1 kg',
    category: 'mithila-specials',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80', // Rice
    inStock: true,
    isPopular: true
  },
  {
    id: 'm3',
    name: 'Homemade Mithila Aam ka Achar',
    hindiName: 'घर का बना मिथिला आम का अचार',
    description: 'Traditional home-style sun-dried mango pickle prepared with pure mustard oil and hand-ground spices.',
    price: 149,
    originalPrice: 180,
    unit: '500 gm',
    category: 'mithila-specials',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80', // Spices / Curry working image
    inStock: true,
    isPopular: true
  },
  {
    id: 'm4',
    name: 'Pure Desi Cow Ghee (Mithila Style)',
    hindiName: 'शुद्ध देसी गाय का घी',
    description: 'Aromatic, granular, and pure cow ghee prepared using traditional bilona method.',
    price: 380,
    originalPrice: 420,
    unit: '500 ml',
    category: 'mithila-specials',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', // Oil/Ghee jar working image
    inStock: true,
    isPopular: true
  },

  // Dals & Rice
  {
    id: 'd1',
    name: 'Unpolished Toor / Arhar Dal',
    hindiName: 'बिना पॉलिश की अरहर दाल',
    description: 'High-protein, unpolished Toor Dal. Cooks easily and contains rich natural nutrition.',
    price: 165,
    originalPrice: 190,
    unit: '1 kg',
    category: 'dal-chawal',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80', // Lentils
    inStock: true
  },
  {
    id: 'd2',
    name: 'Premium Masoor Dal (Split)',
    hindiName: 'प्रीमियम मसूर दाल (मलका)',
    description: 'Superior quality, cleaned red split lentils. Great taste and high nutritional value.',
    price: 110,
    originalPrice: 130,
    unit: '1 kg',
    category: 'dal-chawal',
    image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=600&auto=format&fit=crop&q=80', // Red Lentils
    inStock: true
  },
  {
    id: 'd3',
    name: 'Sona Masoori Rice (Daily Use)',
    hindiName: 'सोना मसूरी चावल (रोज़ाना)',
    description: 'Lightweight and aromatic medium grain rice. Perfect for daily meals.',
    price: 58,
    originalPrice: 68,
    unit: '1 kg',
    category: 'dal-chawal',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80', // Rice grains working image
    inStock: true
  },

  // Spices & Oils
  {
    id: 's1',
    name: 'Kachi Ghani Mustard Oil',
    hindiName: 'कच्ची घानी सरसों तेल (शुद्ध)',
    description: '100% pure cold-pressed mustard oil with a strong aroma and sharp taste. Ideal for Indian cooking.',
    price: 175,
    originalPrice: 195,
    unit: '1 Litre',
    category: 'spices-oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', // Oil bottle
    inStock: true,
    isPopular: true
  },
  {
    id: 's2',
    name: 'Pure Turmeric Powder (Haldi)',
    hindiName: 'शुद्ध हल्दी पाउडर',
    description: 'High curcumin turmeric powder sourced from trusted farmers. Gives rich color and immunity benefits.',
    price: 45,
    originalPrice: 55,
    unit: '200 gm',
    category: 'spices-oils',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80', // Turmeric powder
    inStock: true
  },
  {
    id: 's3',
    name: 'Mithila Special Panch Phoron',
    hindiName: 'मिथिला स्पेशल पंचफोरन',
    description: 'A traditional five-spice blend (Fenugreek, Fennel, Cumin, Mustard, Nigella seeds) for authentic tadka.',
    price: 35,
    originalPrice: 45,
    unit: '100 gm',
    category: 'spices-oils',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80', // Indian spices
    inStock: true
  },

  // Snacks & Staples
  {
    id: 'sn1',
    name: 'Pure Chana Sattu',
    hindiName: 'शुद्ध चना सत्तू (बिहारी सुपरफ़ूड)',
    description: 'Traditionally roasted and stone-ground gram flour. High in fiber and instant energy booster.',
    price: 90,
    originalPrice: 110,
    unit: '500 gm',
    category: 'snacks-staples',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80', // Flour bag/bowl
    inStock: true,
    isPopular: true
  },
  {
    id: 'sn2',
    name: 'Fine Besan (Gram Flour)',
    hindiName: 'बारीक बेसन',
    description: 'Superior quality chana dal besan, perfect for making pakodas, kadhi, and traditional sweets.',
    price: 60,
    originalPrice: 70,
    unit: '500 gm',
    category: 'snacks-staples',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', // Flour / Baking
    inStock: true
  },
  {
    id: 'sn3',
    name: 'Spiced Potato Bhujia',
    hindiName: 'चटपटी आलू भुजिया',
    description: 'Crispy and spicy potato noodles snack. An all-time favorite tea-time companion.',
    price: 40,
    originalPrice: 45,
    unit: '200 gm',
    category: 'snacks-staples',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80', // Crispy snacks / bhujia/chutney
    inStock: true
  },

  // Daily Essentials
  {
    id: 'e1',
    name: 'Tata Salt (Vacuum Evaporated)',
    hindiName: 'टाटा नमक',
    description: 'Iodized salt that helps mental development of children. Trusted by millions of households.',
    price: 28,
    originalPrice: 30,
    unit: '1 kg',
    category: 'daily-essentials',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80', // Salt / Turmeric crystal
    inStock: true
  },
  {
    id: 'e2',
    name: 'Liril Lemon & Tea Tree Soap',
    hindiName: 'लिरिल साबुन',
    description: 'Refresh yourself with the splash of fresh lemons. Gives a clean and hygienic bath experience.',
    price: 45,
    originalPrice: 48,
    unit: '125 gm',
    category: 'daily-essentials',
    image: 'https://images.unsplash.com/photo-1607006342411-9a336f168f2f?w=600&auto=format&fit=crop&q=80', // Soap bar
    inStock: true
  },
  {
    id: 'e3',
    name: 'Red Label Tea (Strong Chai)',
    hindiName: 'रेड लेबल चाय पत्ती',
    description: 'Brooke Bond Red Label Tea, rich in taste and aroma to kickstart your mornings.',
    price: 150,
    originalPrice: 170,
    unit: '500 gm',
    category: 'daily-essentials',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80', // Black tea / Chai cup
    inStock: true
  }
];

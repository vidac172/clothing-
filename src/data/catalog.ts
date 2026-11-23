import { CategoryKey, CouponCode, MegaMenuColumn, Product } from '../types/commerce';

export const HERO_CAMPAIGN_IMAGE =
  '/src/assets/images/hero_fashion_campaign_1795409045019.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'vrv-w-blazer-01',
    brand: 'ATELIER VERVE',
    title: 'Structured Single-Breasted Crimson Blazer',
    subtitle: 'Tailored wool-blend suiting blazer with sharp notched lapels',
    category: 'Women',
    subCategory: 'Blazers & Coats',
    price: 4299,
    mrp: 6999,
    discountPercent: 39,
    rating: 4.8,
    ratingCount: '1.6k',
    ratingCountNum: 1620,
    image: '/src/assets/images/product_womens_blazer_1795409025670.jpg',
    badgeText: '39% OFF',
    badgeVariant: 'primary',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lowStockSizes: ['XS'],
    colors: [
      { name: 'Crimson Rose', hex: '#b92b49' },
      { name: 'Midnight Charcoal', hex: '#282c3f' },
      { name: 'Ivory Cream', hex: '#f4f0e8' },
    ],
    fabric: '68% Recycled Polyester, 28% Viscose, 4% Elastane',
    fit: 'Tailored Structured Fit',
    care: 'Dry Clean Only',
    origin: 'Designed in Milan, Tailored in India',
    description:
      'Cut with precision shoulder architecture and a softly nipped waist, this crimson-rose single-breasted blazer transitions effortlessly from boardroom tailoring to evening layering.',
    highlights: [
      'Fully lined breathable satin-twill interior',
      'Welt chest pocket and twin flap front pockets',
      'Horn-effect single front button with four-button cuffs',
      'Crease-resistant midweight suiting drape',
    ],
    isNew: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Ananya Sharma',
        rating: 5,
        date: '14 Oct 2026',
        verifiedSize: 'S',
        comment:
          'The shoulder structure is impeccable and the crimson shade is rich without feeling loud. Fits true to size.',
        helpfulCount: 34,
      },
      {
        id: 'rev-2',
        author: 'Meera Nair',
        rating: 4.5,
        date: '02 Nov 2026',
        verifiedSize: 'M',
        comment:
          'Lovely weight for year-round office wear. Pairs cleanly with charcoal pleated trousers and denim alike.',
        helpfulCount: 19,
      },
    ],
  },
  {
    id: 'vrv-w-dress-02',
    brand: 'SORAIA STUDIO',
    title: 'Champagne Pleated Satin Wrap Midi Dress',
    subtitle: 'Sunburst micro-pleated fluid satin midi dress with waist tie',
    category: 'Women',
    subCategory: 'Dresses',
    price: 3599,
    mrp: 5999,
    discountPercent: 40,
    rating: 4.7,
    ratingCount: '2.1k',
    ratingCountNum: 2140,
    image: '/src/assets/images/product_womens_silk_dress_1795409025733.jpg',
    badgeText: 'BESTSELLER',
    badgeVariant: 'discount',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lowStockSizes: ['XL'],
    colors: [
      { name: 'Champagne Blush', hex: '#e5ccb8' },
      { name: 'Emerald Silk', hex: '#146b5c' },
      { name: 'Obsidian Black', hex: '#1f222e' },
    ],
    fabric: '100% Matte-Luster Japanese Satin',
    fit: 'Fluid Wrap A-Line',
    care: 'Gentle Cold Hand Wash or Dry Clean',
    origin: 'Crafted in India',
    description:
      'Engineered with fine accordion knife pleats that catch movement on every stride, finished with blouson sleeves and an adjustable self-fabric waist sash.',
    highlights: [
      'True wrap V-neckline with concealed modesty snap',
      'Permanent heat-set micro pleats hold shape all evening',
      'Elasticated cuffs for versatile sleeve styling',
      'Midi length designed to pair with minimalist heels',
    ],
    isNew: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Rhea Kapoor',
        rating: 5,
        date: '29 Oct 2026',
        verifiedSize: 'S',
        comment:
          'Wore this to a cocktail reception—the pleats move like liquid and the champagne tone photographs beautifully.',
        helpfulCount: 41,
      },
    ],
  },
  {
    id: 'vrv-m-overshirt-03',
    brand: 'KOVA MENSWEAR',
    title: 'Textured Oatmeal Linen-Cotton Overshirt',
    subtitle: 'Relaxed utility shacket with twin chest patch pockets',
    category: 'Men',
    subCategory: 'Topwear',
    price: 2799,
    mrp: 4499,
    discountPercent: 38,
    rating: 4.6,
    ratingCount: '980',
    ratingCountNum: 980,
    image: '/src/assets/images/product_mens_overshirt_1795409027788.jpg',
    badgeText: '38% OFF',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    lowStockSizes: ['XXL'],
    colors: [
      { name: 'Warm Oatmeal', hex: '#cbbba3' },
      { name: 'Slate Olive', hex: '#555d50' },
      { name: 'Deep Navy', hex: '#222b3e' },
    ],
    fabric: '55% European Flax Linen, 45% Combed Organic Cotton',
    fit: 'Relaxed Modern Layering Fit',
    care: 'Machine Wash Cold, Line Dry',
    origin: 'Made in India',
    description:
      'A breathable transitional overshirt woven in a tactile oatmeal slub blend. Wear unbuttoned over heavyweight tees or buttoned cleanly with pleated wool trousers.',
    highlights: [
      'Breathable 240 GSM linen-cotton weave',
      'Corozo matte buttons with reinforced placket',
      'Dual utility chest pockets and straight hem',
      'Pre-washed for a lived-in soft drape from day one',
    ],
    isNew: false,
    reviews: [
      {
        id: 'rev-4',
        author: 'Arjun Mehta',
        rating: 4.8,
        date: '05 Nov 2026',
        verifiedSize: 'L',
        comment:
          'Great fabric weight—heavy enough to drape like a light jacket without overheating indoors.',
        helpfulCount: 22,
      },
    ],
  },
  {
    id: 'vrv-m-denim-04',
    brand: 'NORTHFIELD DENIM',
    title: 'Raw Indigo Selvedge Trucker Jacket',
    subtitle: '13.5 oz Japanese-inspired selvedge denim with copper rivets',
    category: 'Men',
    subCategory: 'Jackets',
    price: 3899,
    mrp: 5999,
    discountPercent: 35,
    rating: 4.9,
    ratingCount: '1.3k',
    ratingCountNum: 1310,
    image: '/src/assets/images/product_mens_denim_jacket_1795409026256.jpg',
    badgeText: 'TOP RATED',
    badgeVariant: 'discount',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Deep Indigo', hex: '#1d2d4e' },
      { name: 'Washed Charcoal', hex: '#383b42' },
    ],
    fabric: '99% Cotton Selvedge Denim, 1% Comfort Stretch',
    fit: 'Classic Structured Trucker Fit',
    care: 'Cold Spot Clean or Wash Inside Out',
    origin: 'Crafted in India',
    description:
      'Tailored from deep indigo selvedge denim with signature tobacco topstitching and red-line cuff detailing designed to develop personalized fades over years of wear.',
    highlights: [
      '13.5 oz crisp selvedge denim with subtle 1% stretch',
      'Brushed antique copper shank buttons',
      'Two button-flap chest pockets and side welt handwarmer pockets',
      'Adjustable waist tabs for a customized silhouette',
    ],
    isNew: false,
    reviews: [
      {
        id: 'rev-5',
        author: 'Kabir Verma',
        rating: 5,
        date: '19 Oct 2026',
        verifiedSize: 'M',
        comment:
          'Rare to find genuine selvedge cuff detail and clean contrast stitching at this price point. Zero loose threads.',
        helpfulCount: 28,
      },
    ],
  },
  {
    id: 'vrv-f-kurta-05',
    brand: 'ZARIYA COUTURE',
    title: 'Ivory & Rose-Gold Embroidered Chanderi Kurta Set',
    subtitle: '3-piece festive silk-blend kurta, trousers & organza dupatta',
    category: 'Indian & Festive',
    subCategory: 'Kurta Sets',
    price: 5499,
    mrp: 8999,
    discountPercent: 39,
    rating: 4.9,
    ratingCount: '2.8k',
    ratingCountNum: 2840,
    image: '/src/assets/images/product_festive_kurta_1795409025251.jpg',
    badgeText: 'FESTIVE EDIT',
    badgeVariant: 'urgency',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    lowStockSizes: ['XS', 'XL'],
    colors: [
      { name: 'Ivory Rose-Gold', hex: '#efe7d6' },
      { name: 'Blush Lotus', hex: '#e7c3c6' },
    ],
    fabric: 'Chanderi Silk Blend Kurta with Pure Silk Organza Dupatta',
    fit: 'Straight Tailored Festive Fit',
    care: 'Dry Clean Recommended',
    origin: 'Hand-Finished in Jaipur, India',
    description:
      'An understated heirloom silhouette crafted in luminous ivory Chanderi silk-blend, elevated with delicate rose-gold zari neckline embroidery and a whisper-light organza dupatta.',
    highlights: [
      'Includes straight-cut kurta, cigarette trousers & scalloped dupatta',
      'Intricate rose-gold zari and resham yoke embroidery',
      'Soft mulmul cotton lining for breathable all-day comfort',
      'Side seam pockets seamlessly integrated into trousers',
    ],
    isNew: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Diya Malhotra',
        rating: 5,
        date: '09 Nov 2026',
        verifiedSize: 'M',
        comment:
          'Wore this for a daytime wedding celebration. The ivory and muted rose-gold zari looks extraordinarily refined.',
        helpfulCount: 53,
      },
    ],
  },
  {
    id: 'vrv-w-knit-06',
    brand: 'MARA & CO.',
    title: 'Coral Fine-Ribbed Cropped Knit Cardigan',
    subtitle: 'Breathable mercerized cotton-viscose button-down rib top',
    category: 'Women',
    subCategory: 'Topwear',
    price: 1899,
    mrp: 3199,
    discountPercent: 41,
    rating: 4.5,
    ratingCount: '840',
    ratingCountNum: 840,
    image: '/src/assets/images/product_womens_knit_set_1795409029327.jpg',
    badgeText: '41% OFF',
    badgeVariant: 'primary',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Coral Terracotta', hex: '#de654c' },
      { name: 'Ecru Cream', hex: '#f2ece1' },
      { name: 'Espresso', hex: '#3d2c27' },
    ],
    fabric: '72% Mercerized Cotton, 28% Modal Viscose',
    fit: 'Contoured Cropped Fit',
    care: 'Machine Wash Gentle in Mesh Bag',
    origin: 'Made in India',
    description:
      'Knitted in an ultra-fine vertical rib that flatters without clinging, this vibrant coral-terracotta short-sleeve cardigan pairs cleanly with high-rise wide-leg ecru denim.',
    highlights: [
      'Soft dyed-to-match matte buttons down the center front',
      'Flattering V-neckline with clean tubular edge trim',
      'Cool-touch mercerized knit ideal for warm climates',
      'Retains stretch recovery wash after wash',
    ],
    isNew: false,
    reviews: [
      {
        id: 'rev-7',
        author: 'Nisha Patel',
        rating: 4.5,
        date: '24 Oct 2026',
        verifiedSize: 'S',
        comment:
          'Super flattering neckline and the coral shade brings instant energy to neutral trousers.',
        helpfulCount: 15,
      },
    ],
  },
  {
    id: 'vrv-ft-sneaker-07',
    brand: 'STUDIO S FOOTWEAR',
    title: 'Sculpted Leather & Suede Court Sneakers',
    subtitle: 'Off-white Italian calf leather with crimson suede heel tab',
    category: 'Footwear',
    subCategory: 'Sneakers',
    price: 4699,
    mrp: 7499,
    discountPercent: 37,
    rating: 4.8,
    ratingCount: '1.9k',
    ratingCountNum: 1920,
    image: '/src/assets/images/product_sneakers_runner_1795409025832.jpg',
    badgeText: 'LIMITED DROP',
    badgeVariant: 'urgency',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    lowStockSizes: ['UK 6', 'UK 10'],
    colors: [
      { name: 'Off-White / Crimson', hex: '#b91f38' },
      { name: 'Triple Chalk', hex: '#efede8' },
    ],
    fabric: 'Full-Grain Leather Upper, Suede Overlays, Margom-Style Rubber Sole',
    fit: 'True to UK Sizing',
    care: 'Wipe with Damp Cloth; Suede Brush for Overlays',
    origin: 'Hand-Lasted in Portugal',
    description:
      'Minimalist low-top court architecture elevated with cool stone suede paneling, perforated vamp ventilation, and a signature crimson suede heel tab.',
    highlights: [
      'Cushioned ergonomic memory-foam leather insole',
      'Stitched cup-sole construction for long-term durability',
      'Breathable soft calfskin collar lining',
      'Includes spare tonal flat waxed cotton laces',
    ],
    isNew: true,
    reviews: [
      {
        id: 'rev-8',
        author: 'Rohan Deshmukh',
        rating: 5,
        date: '11 Nov 2026',
        verifiedSize: 'UK 9',
        comment:
          'Zero break-in period and the crimson suede heel accent makes them stand out subtly with tailored trousers.',
        helpfulCount: 39,
      },
    ],
  },
  {
    id: 'vrv-ac-tote-08',
    brand: 'MAISON VERVE',
    title: 'Pebbled Cognac Italian Leather Structured Tote',
    subtitle: 'Architectural work-to-weekend carryall with brushed gold clasp',
    category: 'Accessories',
    subCategory: 'Handbags',
    price: 5999,
    mrp: 9499,
    discountPercent: 37,
    rating: 4.9,
    ratingCount: '1.1k',
    ratingCountNum: 1120,
    image: '/src/assets/images/product_leather_tote_1795409026839.jpg',
    badgeText: '37% OFF',
    badgeVariant: 'discount',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac Tan', hex: '#a86438' },
      { name: 'Noir Black', hex: '#202229' },
    ],
    fabric: '100% Full-Grain Pebbled Leather with Micro-Suede Lining',
    fit: 'Fits up to 14" Laptop (36cm × 26cm × 14cm)',
    care: 'Condition Periodically with Neutral Leather Balm',
    origin: 'Crafted in Florence & Finished in India',
    description:
      'Structured yet supple, this cognac pebbled leather tote anchors every daily ensemble with protective brass base feet, a custom brushed-gold turn clasp, and organized interior compartments.',
    highlights: [
      'Dedicated padded 14-inch laptop divider + zip security pocket',
      'Reinforced double shoulder straps with 24cm drop',
      'Custom brushed light-gold clasp closure',
      'Protective metal base studs and cotton dust bag included',
    ],
    isNew: false,
    reviews: [
      {
        id: 'rev-9',
        author: 'Priya Menon',
        rating: 5,
        date: '01 Nov 2026',
        verifiedSize: 'One Size',
        comment:
          'Stands completely upright on its own even when empty, holds my laptop cleanly, and the pebbled grain feels genuinely luxe.',
        helpfulCount: 27,
      },
    ],
  },
];

export const MEGA_MENU_DATA: Record<Exclude<CategoryKey, 'All'>, MegaMenuColumn[]> = {
  Women: [
    {
      title: 'Westernwear',
      items: [
        { label: 'Blazers & Tailoring', category: 'Women', subCategory: 'Blazers & Coats' },
        { label: 'Dresses & Midis', category: 'Women', subCategory: 'Dresses' },
        { label: 'Knits & Cardigans', category: 'Women', subCategory: 'Topwear' },
        { label: 'All Women’s Styles', category: 'Women' },
      ],
    },
    {
      title: 'Indian & Festive',
      items: [
        { label: 'Embroidered Kurta Sets', category: 'Indian & Festive', subCategory: 'Kurta Sets' },
        { label: 'Chanderi & Organza Edit', category: 'Indian & Festive' },
      ],
    },
    {
      title: 'Footwear & Bags',
      items: [
        { label: 'Structured Leather Totes', category: 'Accessories', subCategory: 'Handbags' },
        { label: 'Court Sneakers', category: 'Footwear', subCategory: 'Sneakers' },
      ],
    },
  ],
  Men: [
    {
      title: 'Topwear',
      items: [
        { label: 'Linen & Utility Overshirts', category: 'Men', subCategory: 'Topwear' },
        { label: 'Selvedge Denim Jackets', category: 'Men', subCategory: 'Jackets' },
        { label: 'All Men’s Styles', category: 'Men' },
      ],
    },
    {
      title: 'Footwear',
      items: [
        { label: 'Minimalist Court Sneakers', category: 'Footwear', subCategory: 'Sneakers' },
        { label: 'Limited Drop Footwear', category: 'Footwear' },
      ],
    },
    {
      title: 'Featured Edits',
      items: [
        { label: 'New Season Arrivals', category: 'All' },
        { label: 'Best Rated Staples', category: 'Men' },
      ],
    },
  ],
  'Indian & Festive': [
    {
      title: 'Celebration Couture',
      items: [
        { label: 'Chanderi Kurta Sets', category: 'Indian & Festive', subCategory: 'Kurta Sets' },
        { label: 'Zari Embroidered Edit', category: 'Indian & Festive' },
      ],
    },
    {
      title: 'Pair With',
      items: [
        { label: 'Structured Leather Bags', category: 'Accessories', subCategory: 'Handbags' },
        { label: 'Satin Evening Dresses', category: 'Women', subCategory: 'Dresses' },
      ],
    },
  ],
  Footwear: [
    {
      title: 'Contemporary Footwear',
      items: [
        { label: 'Leather Court Sneakers', category: 'Footwear', subCategory: 'Sneakers' },
        { label: 'All Footwear', category: 'Footwear' },
      ],
    },
    {
      title: 'Complete The Look',
      items: [
        { label: 'Selvedge Denim Outerwear', category: 'Men', subCategory: 'Jackets' },
        { label: 'Ribbed Knitwear', category: 'Women', subCategory: 'Topwear' },
      ],
    },
  ],
  Accessories: [
    {
      title: 'Leather Goods',
      items: [
        { label: 'Italian Pebbled Totes', category: 'Accessories', subCategory: 'Handbags' },
        { label: 'All Accessories', category: 'Accessories' },
      ],
    },
    {
      title: 'Workwear Pairings',
      items: [
        { label: 'Tailored Crimson Blazers', category: 'Women', subCategory: 'Blazers & Coats' },
        { label: 'Linen-Cotton Overshirts', category: 'Men', subCategory: 'Topwear' },
      ],
    },
  ],
};

export const COUPONS: CouponCode[] = [
  {
    code: 'VERVE20',
    title: 'Extra 20% Off',
    description: '20% off on orders above ₹2,999 (max discount ₹1,500)',
    type: 'percent',
    value: 20,
    minOrder: 2999,
    maxDiscount: 1500,
  },
  {
    code: 'FIRST500',
    title: 'Flat ₹500 Off',
    description: 'Flat ₹500 instant savings on orders above ₹2,499',
    type: 'flat',
    value: 500,
    minOrder: 2499,
  },
];

export const CATEGORY_SPOTLIGHTS: {
  key: Exclude<CategoryKey, 'All'>;
  title: string;
  caption: string;
  offer: string;
  image: string;
}[] = [
  {
    key: 'Women',
    title: 'Women’s Tailoring',
    caption: 'Blazers, Satin & Knits',
    offer: 'Up to 41% Off',
    image: '/src/assets/images/product_womens_blazer_1795409025670.jpg',
  },
  {
    key: 'Men',
    title: 'Men’s Essentials',
    caption: 'Overshirts & Selvedge',
    offer: 'Up to 38% Off',
    image: '/src/assets/images/product_mens_overshirt_1795409027788.jpg',
  },
  {
    key: 'Indian & Festive',
    title: 'Indian & Festive',
    caption: 'Chanderi & Zari Sets',
    offer: 'Festive Edit',
    image: '/src/assets/images/product_festive_kurta_1795409025251.jpg',
  },
  {
    key: 'Footwear',
    title: 'Footwear Studio',
    caption: 'Italian Calf & Suede',
    offer: 'Limited Drop',
    image: '/src/assets/images/product_sneakers_runner_1795409025832.jpg',
  },
  {
    key: 'Accessories',
    title: 'Leather Goods',
    caption: 'Structured Daily Totes',
    offer: '37% Off',
    image: '/src/assets/images/product_leather_tote_1795409026839.jpg',
  },
];

export const ALL_BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand)));

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

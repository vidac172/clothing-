export type CategoryKey =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Indian & Festive'
  | 'Footwear'
  | 'Accessories';

export type ScreenView =
  | 'home'
  | 'catalog'
  | 'product'
  | 'wishlist'
  | 'checkout';

export type SortOption =
  | 'recommended'
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'discount'
  | 'rating';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verifiedSize: string;
  comment: string;
  helpfulCount: number;
}

export interface ProductColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  brand: string;
  title: string;
  subtitle: string;
  category: Exclude<CategoryKey, 'All'>;
  subCategory: string;
  price: number;
  mrp: number;
  discountPercent: number;
  rating: number;
  ratingCount: string;
  ratingCountNum: number;
  image: string;
  badgeText?: string;
  badgeVariant?: 'primary' | 'discount' | 'urgency';
  sizes: string[];
  lowStockSizes?: string[];
  colors: ProductColorOption[];
  fabric: string;
  fit: string;
  care: string;
  origin: string;
  description: string;
  highlights: string[];
  isNew?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface FilterState {
  category: CategoryKey;
  subCategory: string | null;
  brands: string[];
  priceRange: 'all' | 'under_3000' | '3000_5000' | 'above_5000';
  minDiscount: number;
  minRating: number;
  searchQuery: string;
}

export interface MegaMenuColumn {
  title: string;
  items: {
    label: string;
    category: CategoryKey;
    subCategory?: string;
  }[];
}

export interface CouponCode {
  code: string;
  title: string;
  description: string;
  type: 'percent' | 'flat';
  value: number;
  minOrder: number;
  maxDiscount?: number;
}

export interface OrderRecord {
  orderId: string;
  placedAt: string;
  estimatedDelivery: string;
  items: {
    product: Product;
    size: string;
    color: string;
    quantity: number;
  }[];
  totalMrp: number;
  totalDiscount: number;
  couponDiscount: number;
  shippingFee: number;
  finalAmount: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
}

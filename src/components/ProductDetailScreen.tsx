import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  Truck,
} from 'lucide-react';
import { COUPONS, PRODUCTS, formatINR } from '../data/catalog';
import { CategoryKey, Product } from '../types/commerce';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';
import { SizeChartModal } from './SizeChartModal';

interface ProductDetailScreenProps {
  product: Product;
  isWishlisted: boolean;
  wishlistIds: string[];
  appliedCouponCode: string | null;
  onApplyCoupon: (code: string) => void;
  onAddToBag: (product: Product, size: string, color: string) => void;
  onQuickAdd: (product: Product, size: string) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenProduct: (product: Product) => void;
  onNavigateCategory: (cat: CategoryKey) => void;
  onBack: () => void;
}

type GalleryView = 'full' | 'detail' | 'texture';

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  isWishlisted,
  wishlistIds,
  appliedCouponCode,
  onApplyCoupon,
  onAddToBag,
  onQuickAdd,
  onToggleWishlist,
  onOpenProduct,
  onNavigateCategory,
  onBack,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.length === 1 ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name ?? 'Default'
  );
  const [sizeError, setSizeError] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [galleryView, setGalleryView] = useState<GalleryView>('full');
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddClick = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onAddToBag(product, selectedSize, selectedColor);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1600);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincode.trim();
    if (/^\d{6}$/.test(cleaned)) {
      setDeliveryResult(
        `Express delivery to ${cleaned} by Thu, 26 Nov · Pay on Delivery available`
      );
    } else {
      setDeliveryResult('Please enter a valid 6-digit postal PIN code.');
    }
  };

  const imageTransformClass =
    galleryView === 'detail'
      ? 'scale-[1.35] origin-top'
      : galleryView === 'texture'
        ? 'scale-[1.6] origin-center'
        : 'scale-100';

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
      {/* Breadcrumb + Back */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <nav className="flex items-center gap-1.5 text-xs text-[#535766] overflow-hidden" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => onNavigateCategory('All')}
            className="hover:text-[#ff3f6c] transition-colors cursor-pointer shrink-0"
          >
            Collections
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#d4d5d9] shrink-0" />
          <button
            type="button"
            onClick={() => onNavigateCategory(product.category)}
            className="hover:text-[#ff3f6c] transition-colors cursor-pointer shrink-0"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#d4d5d9] shrink-0" />
          <span className="font-semibold text-[#282c3f] truncate">{product.title}</span>
        </nav>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-[#535766] hover:text-[#ff3f6c] shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Contiguous PDP Split: Sticky Gallery Left + Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-6 lg:sticky lg:top-[92px] space-y-3">
          <div className="aspect-[3/4] rounded card-resting-border bg-[#f5f5f6] overflow-hidden relative">
            <ResilientImage
              src={product.image}
              alt={`${product.brand} ${product.title}`}
              loading="eager"
              className={`w-full h-full object-cover object-top transition-transform duration-300 ease-out ${imageTransformClass}`}
            />
            {product.badgeText && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ff3f6c] text-white font-display text-[11px] font-bold uppercase tracking-wider">
                {product.badgeText}
              </span>
            )}
          </div>

          {/* Interactive Framing View Switcher */}
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'full', label: 'Full Silhouette', scale: 'scale-100' },
                { id: 'detail', label: 'Tailoring Focus', scale: 'scale-[1.35] origin-top' },
                { id: 'texture', label: 'Fabric & Drape', scale: 'scale-[1.6] origin-center' },
              ] as const
            ).map((view) => (
              <button
                key={view.id}
                type="button"
                onClick={() => setGalleryView(view.id)}
                className={`group rounded overflow-hidden border transition-all text-left cursor-pointer ${
                  galleryView === view.id
                    ? 'border-[#ff3f6c] ring-1 ring-[#ff3f6c]'
                    : 'border-[#eaeaec] hover:border-[#d4d5d9]'
                }`}
              >
                <div className="aspect-[4/3] bg-[#f5f5f6] overflow-hidden">
                  <ResilientImage
                    src={product.image}
                    alt={`${product.title} — ${view.label}`}
                    className={`w-full h-full object-cover object-top ${view.scale}`}
                  />
                </div>
                <p
                  className={`py-1.5 px-2 text-center font-display text-[11px] font-semibold ${
                    galleryView === view.id ? 'text-[#ff3f6c] bg-[#fff1f4]' : 'text-[#535766]'
                  }`}
                >
                  {view.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Rating */}
          <div className="pb-5 border-b border-[#eaeaec]">
            <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[#282c3f]">
              {product.brand}
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#282c3f] mt-1 leading-snug">
              {product.title}
            </h1>
            <p className="text-sm text-[#535766] mt-1">{product.subtitle}</p>

            {/* Rating Pill */}
            <div className="inline-flex items-center gap-2 mt-3.5 px-3 py-1 rounded-full border border-[#eaeaec] bg-white">
              <span className="font-display text-xs font-bold text-[#282c3f] tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <Star className="w-3.5 h-3.5 text-[#14958f] fill-[#14958f]" />
              <span className="text-[#d4d5d9]">|</span>
              <span className="text-xs text-[#535766] tabular-nums">
                {product.ratingCount} Verified Ratings
              </span>
            </div>
          </div>

          {/* Pricing Block */}
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-display text-2xl sm:text-[26px] font-bold text-[#282c3f] tabular-nums">
                {formatINR(product.price)}
              </span>
              <span className="text-base text-[#535766] line-through tabular-nums">
                MRP {formatINR(product.mrp)}
              </span>
              <span className="font-display text-base font-bold text-[#03a685] tabular-nums">
                ({product.discountPercent}% OFF)
              </span>
            </div>
            <p className="text-xs font-medium text-[#03a685] mt-1">
              inclusive of all taxes · You save {formatINR(product.mrp - product.price)}
            </p>
          </div>

          {/* Color Selector */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.06em] text-[#282c3f] mb-2.5">
              Color: <span className="text-[#535766] font-semibold normal-case">{selectedColor}</span>
            </p>
            <div className="flex items-center gap-2.5">
              {product.colors.map((c) => {
                const active = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    aria-label={`Select color ${c.name}`}
                    className={`w-8 h-8 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                      active ? 'border-[#ff3f6c] scale-105' : 'border-[#d4d5d9] hover:border-[#282c3f]'
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-xs font-bold uppercase tracking-[0.06em] text-[#282c3f]">
                Select Size
              </span>
              {product.category !== 'Accessories' && (
                <button
                  type="button"
                  onClick={() => setSizeChartOpen(true)}
                  className="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-[#ff3f6c] hover:text-[#b90041] cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                const isLowStock = product.lowStockSizes?.includes(size);
                return (
                  <div key={size} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`min-w-[52px] h-12 px-3 rounded-full font-display text-xs font-bold border transition-all cursor-pointer ${
                        active
                          ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                          : 'border-[#d4d5d9] bg-white text-[#282c3f] hover:border-[#ff3f6c]'
                      }`}
                    >
                      {size}
                    </button>
                    {isLowStock && (
                      <span className="font-display text-[10px] font-bold text-[#ff905a] mt-1">
                        2 left
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {sizeError && (
              <p className="text-xs font-semibold text-[#ba1a1a] mt-2">
                Please select a size before adding to your bag.
              </p>
            )}
          </div>

          {/* Primary & Secondary Action Buttons (48px height, 4px radius) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            <button
              type="button"
              onClick={handleAddClick}
              className={`sm:col-span-7 h-12 rounded font-display text-sm font-bold uppercase tracking-[0.06em] inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
                addedFeedback
                  ? 'bg-[#03a685] text-white'
                  : 'bg-[#ff3f6c] hover:bg-[#df2457] text-white'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`sm:col-span-5 h-12 rounded border font-display text-sm font-bold uppercase tracking-[0.06em] inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isWishlisted
                  ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                  : 'border-[#d4d5d9] bg-white text-[#282c3f] hover:border-[#ff3f6c] hover:bg-[#ff3f6c] hover:text-white'
              }`}
            >
              <Heart
                className="w-4 h-4"
                fill={isWishlisted ? '#ff3f6c' : 'none'}
              />
              <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
            </button>
          </div>

          {/* Warm Peach Best Offers Box */}
          <div className="bg-[#fdf1e6] rounded p-4 space-y-2.5 border border-[#ff905a]/25">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#ff3f6c]" />
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f]">
                Best Offers
              </h2>
            </div>
            <div className="space-y-2">
              {COUPONS.map((coupon) => {
                const isApplied = appliedCouponCode === coupon.code;
                return (
                  <div
                    key={coupon.code}
                    className="flex items-center justify-between gap-3 bg-white/80 rounded px-3 py-2 border border-[#ff905a]/20"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-xs font-bold text-[#282c3f]">
                        {coupon.title} · <span className="text-[#ff3f6c]">{coupon.code}</span>
                      </p>
                      <p className="text-xs text-[#535766]">{coupon.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onApplyCoupon(coupon.code)}
                      className={`shrink-0 font-display text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded cursor-pointer ${
                        isApplied
                          ? 'bg-[#03a685]/15 text-[#03a685]'
                          : 'text-[#ff3f6c] hover:bg-[#fff1f4]'
                      }`}
                    >
                      {isApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="pt-2 border-t border-[#eaeaec]">
            <div className="flex items-center gap-2 mb-2.5">
              <Truck className="w-4 h-4 text-[#282c3f]" />
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f]">
                Delivery Options
              </h2>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit PIN code"
                className="flex-1 h-10 px-3.5 rounded bg-[#f5f5f6] border border-[#d4d5d9] focus:bg-white focus:border-[#ff3f6c] focus:outline-none text-sm tabular-nums"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded font-display text-xs font-bold uppercase tracking-wider text-[#ff3f6c] border border-[#d4d5d9] hover:border-[#ff3f6c] cursor-pointer"
              >
                Check
              </button>
            </form>
            {deliveryResult && (
              <p
                className={`text-xs mt-2 font-medium ${
                  deliveryResult.startsWith('Express') ? 'text-[#03a685]' : 'text-[#ba1a1a]'
                }`}
              >
                {deliveryResult}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#535766]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14958f]" />
                100% Original Products
              </span>
              <span>Easy 14-day returns &amp; exchanges</span>
            </div>
          </div>

          {/* Product Details & Specs */}
          <div className="pt-5 border-t border-[#eaeaec] space-y-4">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f]">
              Product Details
            </h2>
            <p className="text-sm text-[#535766] leading-relaxed">
              {product.description}
            </p>
            <ul className="space-y-1.5 text-sm text-[#282c3f] list-disc pl-5">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-[#f5f5f6] text-xs">
              <div>
                <dt className="text-[#535766]">Material</dt>
                <dd className="font-medium text-[#282c3f] mt-0.5">{product.fabric}</dd>
              </div>
              <div>
                <dt className="text-[#535766]">Fit &amp; Dimensions</dt>
                <dd className="font-medium text-[#282c3f] mt-0.5">{product.fit}</dd>
              </div>
              <div>
                <dt className="text-[#535766]">Care Instructions</dt>
                <dd className="font-medium text-[#282c3f] mt-0.5">{product.care}</dd>
              </div>
              <div>
                <dt className="text-[#535766]">Craftsmanship</dt>
                <dd className="font-medium text-[#282c3f] mt-0.5">{product.origin}</dd>
              </div>
            </dl>
          </div>

          {/* Verified Customer Reviews */}
          <div className="pt-5 border-t border-[#eaeaec]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f]">
                Verified Customer Reviews
              </h2>
              <span className="font-display text-xs font-bold text-[#14958f] tabular-nums">
                {product.rating.toFixed(1)} / 5.0 ({product.ratingCount})
              </span>
            </div>

            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded bg-[#f5f5f6]/70 border border-[#eaeaec]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#14958f] text-white font-display text-[11px] font-bold tabular-nums">
                        {rev.rating.toFixed(1)}
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </span>
                      <span className="font-display text-xs font-bold text-[#282c3f]">
                        {rev.author}
                      </span>
                    </div>
                    <span className="text-xs text-[#535766]">{rev.date}</span>
                  </div>
                  <p className="text-sm text-[#282c3f] mt-2 leading-relaxed">
                    {rev.comment}
                  </p>
                  <p className="text-xs text-[#535766] mt-2">
                    Verified Buyer · Size purchased: <strong className="text-[#282c3f]">{rev.verifiedSize}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Styles Shelf */}
      <section className="mt-16 pt-10 border-t border-[#eaeaec]">
        <h2 className="font-display text-xl font-bold text-[#282c3f] mb-6">
          Complete Your Wardrobe
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isWishlisted={wishlistIds.includes(item.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      </section>

      <SizeChartModal
        isOpen={sizeChartOpen}
        category={product.category}
        onClose={() => setSizeChartOpen(false)}
      />
    </div>
  );
};

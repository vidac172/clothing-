import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Tag, X } from 'lucide-react';
import {
  CATEGORY_SPOTLIGHTS,
  HERO_CAMPAIGN_IMAGE,
  PRODUCTS,
} from '../data/catalog';
import { CategoryKey, Product, SortOption } from '../types/commerce';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface StorefrontHomeProps {
  wishlistIds: string[];
  appliedCouponCode: string | null;
  onApplyCoupon: (code: string) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product, size: string) => void;
  onOpenProduct: (product: Product) => void;
  onNavigateCatalog: (category: CategoryKey) => void;
}

const QUICK_FILTER_TABS: CategoryKey[] = [
  'All',
  'Women',
  'Men',
  'Indian & Festive',
  'Footwear',
  'Accessories',
];

export const StorefrontHome: React.FC<StorefrontHomeProps> = ({
  wishlistIds,
  appliedCouponCode,
  onApplyCoupon,
  onToggleWishlist,
  onQuickAdd,
  onOpenProduct,
  onNavigateCatalog,
}) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [selectedTab, setSelectedTab] = useState<CategoryKey>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  const displayedProducts = useMemo(() => {
    const filtered =
      selectedTab === 'All'
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === selectedTab);

    switch (sortBy) {
      case 'price_asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'discount':
        return filtered.sort((a, b) => b.discountPercent - a.discountPercent);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      default:
        return filtered;
    }
  }, [selectedTab, sortBy]);

  return (
    <div>
      {/* Slim Dismissible Warm Peach Offer Strip (<= 40px) */}
      {!bannerDismissed && (
        <div className="bg-[#fdf1e6] border-b border-[#ff905a]/25">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs overflow-hidden">
              <Tag className="w-3.5 h-3.5 text-[#ff3f6c] shrink-0" />
              <p className="text-[#282c3f] truncate">
                <span className="font-display font-bold uppercase tracking-wider text-[#ff3f6c] mr-1.5">
                  Season Edit:
                </span>
                Extra 20% off orders above ₹2,999 with code{' '}
                <strong className="font-display font-bold">VERVE20</strong>
              </p>
              <button
                type="button"
                onClick={() => onApplyCoupon('VERVE20')}
                className="shrink-0 inline-flex items-center gap-1 font-display text-[11px] font-bold uppercase tracking-wider text-[#ff3f6c] hover:text-[#b90041] underline underline-offset-2 cursor-pointer"
              >
                {appliedCouponCode === 'VERVE20' ? (
                  <>
                    <Check className="w-3 h-3 text-[#03a685]" />
                    <span className="text-[#03a685]">Applied</span>
                  </>
                ) : (
                  'Apply Code'
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss offer banner"
              className="p-1 text-[#535766] hover:text-[#282c3f] shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 1: Storefront Split Editorial Hero */}
      <section className="bg-[#fbf8ff] border-b border-[#eaeaec]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white rounded card-resting-border overflow-hidden">
            {/* Left Copy Column */}
            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-[#ff3f6c]">
                Autumn / Winter ’26 Collection
              </p>
              <h1
                className="font-display text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.18] tracking-[-0.02em] text-[#282c3f] mt-3"
                style={{ textWrap: 'balance' }}
              >
                Sharp Tailoring Meets Festive Radiance
              </h1>
              <p className="text-sm sm:text-base text-[#535766] leading-relaxed mt-4 max-w-md">
                Discover structured crimson suiting, Japanese-inspired selvedge denim, and hand-finished Chanderi ensembles—crafted for crisp lines and effortless movement.
              </p>

              {/* Primary + Secondary CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateCatalog('All')}
                  className="h-12 px-7 rounded bg-[#ff3f6c] hover:bg-[#df2457] active:scale-[0.98] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-[0.06em] inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateCatalog('Indian & Festive')}
                  className="h-12 px-6 rounded border border-[#d4d5d9] hover:border-[#ff3f6c] hover:bg-[#ff3f6c] hover:text-white text-[#282c3f] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.06em] transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  Festive Edit
                </button>
              </div>

              {/* Clean unboxed commercial trust metadata */}
              <div className="mt-8 pt-6 border-t border-[#eaeaec] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#535766]">
                <span className="font-medium text-[#282c3f]">Up to 41% Off Launch Prices</span>
                <span aria-hidden="true">·</span>
                <span>14-Day Easy Returns</span>
                <span aria-hidden="true">·</span>
                <span>Express Dispatch</span>
              </div>
            </div>

            {/* Right Editorial Studio Campaign Image (precisely framed to right photographic region) */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] bg-[#f5f5f6] overflow-hidden">
              <img
                src={HERO_CAMPAIGN_IMAGE}
                alt="VERVE Autumn Winter tailored outerwear campaign in sunlit studio"
                referrerPolicy="no-referrer"
                className="absolute top-0 right-0 w-[158%] max-w-none h-full object-cover object-right"
              />
              {/* Subtle bottom scrim for floating lookbook tag */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#161b2d]/45 via-[#161b2d]/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                <div className="bg-white/95 backdrop-blur-sm rounded px-3.5 py-2 shadow-sm">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-[#ff3f6c]">
                    Featured Look
                  </p>
                  <p className="font-display text-xs font-bold text-[#282c3f] mt-0.5">
                    Atelier Verve Suiting &amp; Coats
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenProduct(PRODUCTS[0])}
                  className="bg-white/95 hover:bg-[#ff3f6c] text-[#282c3f] hover:text-white transition-colors rounded px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-wider shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Shop Look →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Shop by Category Spotlight */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-10 pt-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#ff3f6c]">
              Curated Departments
            </p>
            <h2 className="font-display text-[22px] lg:text-[28px] font-bold tracking-[-0.02em] text-[#282c3f] mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCatalog('All')}
            className="font-display text-xs font-bold uppercase tracking-[0.06em] text-[#ff3f6c] hover:text-[#b90041] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <span>All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CATEGORY_SPOTLIGHTS.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => onNavigateCatalog(cat.key)}
              className="group relative rounded overflow-hidden card-resting-border bg-white text-left transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="aspect-[3/4] bg-[#f5f5f6] overflow-hidden relative">
                <ResilientImage
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b2d]/75 via-[#161b2d]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                  <span className="inline-block font-display text-[10px] font-bold uppercase tracking-wider text-[#fdf1e6] bg-[#ff3f6c] px-2 py-0.5 rounded-full mb-1.5">
                    {cat.offer}
                  </span>
                  <h3 className="font-display text-sm font-bold leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/85 mt-0.5">{cat.caption}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 3: Trending Now / Featured Edit Grid */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-10 pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#eaeaec]">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#ff3f6c]">
              The Runway Edit
            </p>
            <h2 className="font-display text-[22px] lg:text-[28px] font-bold tracking-[-0.02em] text-[#282c3f] mt-1">
              Trending Styles
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Filter Chips (32px height, #fff1f4 + #ff3f6c selected state) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="tablist" aria-label="Filter trending styles">
              {QUICK_FILTER_TABS.map((tab) => {
                const selected = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setSelectedTab(tab)}
                    className={`h-8 px-3.5 rounded-full font-display text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selected
                        ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                        : 'border-[#eaeaec] bg-white text-[#282c3f] hover:border-[#d4d5d9]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Sort Select */}
            <label className="flex items-center gap-2 text-xs text-[#535766] ml-auto md:ml-2">
              <span className="font-display font-semibold uppercase tracking-wider hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-8 px-2.5 rounded border border-[#d4d5d9] bg-white font-display text-xs font-semibold text-[#282c3f] focus:border-[#ff3f6c] focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">What’s New</option>
                <option value="discount">Better Discount</option>
                <option value="rating">Customer Rating</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* 4-column desktop / 3-column tablet / 2-column mobile Product Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onNavigateCatalog(selectedTab)}
            className="h-12 px-8 rounded border border-[#d4d5d9] hover:border-[#ff3f6c] hover:bg-[#ff3f6c] hover:text-white text-[#282c3f] font-display text-xs font-bold uppercase tracking-[0.08em] transition-all cursor-pointer"
          >
            Open Full Filterable Catalog
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { Check, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { ALL_BRANDS, PRODUCTS } from '../data/catalog';
import {
  CategoryKey,
  FilterState,
  Product,
  SortOption,
} from '../types/commerce';
import { ProductCard } from './ProductCard';

interface CatalogScreenProps {
  filters: FilterState;
  sortBy: SortOption;
  wishlistIds: string[];
  onUpdateFilters: (next: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSortChange: (sort: SortOption) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product, size: string) => void;
  onOpenProduct: (product: Product) => void;
  onNavigateHome: () => void;
}

const CATEGORIES: CategoryKey[] = [
  'All',
  'Women',
  'Men',
  'Indian & Festive',
  'Footwear',
  'Accessories',
];

const PRICE_RANGES: { id: FilterState['priceRange']; label: string }[] = [
  { id: 'all', label: 'All Prices' },
  { id: 'under_3000', label: 'Under ₹3,000' },
  { id: '3000_5000', label: '₹3,000 – ₹5,000' },
  { id: 'above_5000', label: 'Above ₹5,000' },
];

const DISCOUNT_OPTIONS = [
  { value: 0, label: 'Any Discount' },
  { value: 35, label: '35% & Above' },
  { value: 38, label: '38% & Above' },
  { value: 40, label: '40% & Above' },
];

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  filters,
  sortBy,
  wishlistIds,
  onUpdateFilters,
  onResetFilters,
  onSortChange,
  onToggleWishlist,
  onQuickAdd,
  onOpenProduct,
  onNavigateHome,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.subCategory && p.subCategory !== filters.subCategory) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;

      if (filters.priceRange === 'under_3000' && p.price >= 3000) return false;
      if (filters.priceRange === '3000_5000' && (p.price < 3000 || p.price > 5000)) return false;
      if (filters.priceRange === 'above_5000' && p.price <= 5000) return false;

      if (filters.minDiscount > 0 && p.discountPercent < filters.minDiscount) return false;
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;

      if (query) {
        const hay = `${p.brand} ${p.title} ${p.subtitle} ${p.category} ${p.subCategory}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price_asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'discount':
        return [...list].sort((a, b) => b.discountPercent - a.discountPercent);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      default:
        return list;
    }
  }, [filters, sortBy]);

  const toggleBrand = (brand: string) => {
    const exists = filters.brands.includes(brand);
    const nextBrands = exists
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onUpdateFilters({ brands: nextBrands });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    Boolean(filters.subCategory) ||
    filters.brands.length > 0 ||
    filters.priceRange !== 'all' ||
    filters.minDiscount > 0 ||
    filters.minRating > 0 ||
    filters.searchQuery.trim().length > 0;

  const renderFilterSections = () => (
    <div className="divide-y divide-[#eaeaec]">
      {/* Category Radio Group */}
      <div className="pb-5">
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3">
          Categories
        </h3>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => {
            const checked = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onUpdateFilters({ category: cat, subCategory: null })}
                className="w-full flex items-center gap-3 text-left group cursor-pointer"
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? 'border-[#ff3f6c] bg-[#ff3f6c]'
                      : 'border-[#535766] group-hover:border-[#ff3f6c]'
                  }`}
                >
                  {checked && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-sm ${
                    checked ? 'font-semibold text-[#282c3f]' : 'text-[#535766] group-hover:text-[#282c3f]'
                  }`}
                >
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Checkbox Group */}
      <div className="py-5">
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3">
          Brands
        </h3>
        <div className="space-y-2.5">
          {ALL_BRANDS.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className="w-full flex items-center gap-3 text-left group cursor-pointer"
              >
                <span
                  className={`w-[18px] h-[18px] rounded-[3px] border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? 'border-[#ff3f6c] bg-[#ff3f6c] text-white'
                      : 'border-[#535766] group-hover:border-[#ff3f6c]'
                  }`}
                >
                  {checked && <Check className="w-3 h-3" strokeWidth={3} />}
                </span>
                <span
                  className={`text-sm ${
                    checked ? 'font-semibold text-[#282c3f]' : 'text-[#535766] group-hover:text-[#282c3f]'
                  }`}
                >
                  {brand}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Radio Group */}
      <div className="py-5">
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3">
          Price Range
        </h3>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => {
            const checked = filters.priceRange === range.id;
            return (
              <button
                key={range.id}
                type="button"
                onClick={() => onUpdateFilters({ priceRange: range.id })}
                className="w-full flex items-center gap-3 text-left group cursor-pointer"
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? 'border-[#ff3f6c] bg-[#ff3f6c]'
                      : 'border-[#535766] group-hover:border-[#ff3f6c]'
                  }`}
                >
                  {checked && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-sm tabular-nums ${
                    checked ? 'font-semibold text-[#282c3f]' : 'text-[#535766] group-hover:text-[#282c3f]'
                  }`}
                >
                  {range.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="py-5">
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3">
          Discount
        </h3>
        <div className="space-y-2.5">
          {DISCOUNT_OPTIONS.map((opt) => {
            const checked = filters.minDiscount === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdateFilters({ minDiscount: opt.value })}
                className="w-full flex items-center gap-3 text-left group cursor-pointer"
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? 'border-[#ff3f6c] bg-[#ff3f6c]'
                      : 'border-[#535766] group-hover:border-[#ff3f6c]'
                  }`}
                >
                  {checked && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-sm tabular-nums ${
                    checked ? 'font-semibold text-[#282c3f]' : 'text-[#535766] group-hover:text-[#282c3f]'
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="pt-5">
        <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3">
          Customer Rating
        </h3>
        <div className="space-y-2.5">
          {[0, 4.6, 4.8].map((val) => {
            const checked = filters.minRating === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => onUpdateFilters({ minRating: val })}
                className="w-full flex items-center gap-3 text-left group cursor-pointer"
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors shrink-0 ${
                    checked
                      ? 'border-[#ff3f6c] bg-[#ff3f6c]'
                      : 'border-[#535766] group-hover:border-[#ff3f6c]'
                  }`}
                >
                  {checked && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span
                  className={`text-sm tabular-nums ${
                    checked ? 'font-semibold text-[#282c3f]' : 'text-[#535766] group-hover:text-[#282c3f]'
                  }`}
                >
                  {val === 0 ? 'All Ratings' : `${val.toFixed(1)}★ & Above`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
      {/* Breadcrumb & Title Header */}
      <nav className="flex items-center gap-1.5 text-xs text-[#535766] mb-3" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#ff3f6c] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#d4d5d9]" />
        <button
          type="button"
          onClick={() => onUpdateFilters({ category: filters.category, subCategory: null })}
          className="hover:text-[#ff3f6c] transition-colors cursor-pointer"
        >
          {filters.category === 'All' ? 'All Collections' : filters.category}
        </button>
        {filters.subCategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#d4d5d9]" />
            <span className="font-semibold text-[#282c3f]">{filters.subCategory}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#eaeaec]">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h1 className="font-display text-xl lg:text-2xl font-bold text-[#282c3f]">
            {filters.searchQuery.trim()
              ? `Search: “${filters.searchQuery}”`
              : filters.subCategory
                ? filters.subCategory
                : filters.category === 'All'
                  ? 'All Collections'
                  : filters.category}
          </h1>
          <span className="text-sm text-[#535766] tabular-nums">
            — {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden h-9 px-3.5 rounded border border-[#d4d5d9] inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-[#282c3f] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff3f6c]" />
            <span>Filters</span>
          </button>

          <label className="flex items-center gap-2 text-xs text-[#535766] ml-auto">
            <span className="font-display font-semibold uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-9 px-3 rounded border border-[#d4d5d9] bg-white font-display text-xs font-semibold text-[#282c3f] focus:border-[#ff3f6c] focus:outline-none cursor-pointer"
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

      {/* Main Split: Sticky Filter Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2.5 pr-4 border-r border-[#eaeaec]">
          <div className="sticky top-[92px]">
            <div className="flex items-center justify-between mb-5">
              <span className="font-display text-sm font-bold uppercase tracking-[0.06em] text-[#282c3f]">
                Filters
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="font-display text-xs font-bold uppercase tracking-wider text-[#ff3f6c] hover:text-[#b90041] cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            {renderFilterSections()}
          </div>
        </aside>

        {/* Results Column */}
        <div className="lg:col-span-9">
          {/* Active Filter Chips Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {filters.category !== 'All' && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ category: 'All', subCategory: null })}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{filters.category}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.subCategory && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ subCategory: null })}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{filters.subCategory}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{brand}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}
              {filters.priceRange !== 'all' && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ priceRange: 'all' })}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>
                    {PRICE_RANGES.find((r) => r.id === filters.priceRange)?.label}
                  </span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.minDiscount > 0 && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ minDiscount: 0 })}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{filters.minDiscount}%+ Off</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.minRating > 0 && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ minRating: 0 })}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{filters.minRating.toFixed(1)}★ &amp; Up</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {filters.searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ searchQuery: '' })}
                  className="h-8 px-3 rounded-full border border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c] font-display text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>“{filters.searchQuery}”</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="py-16 px-6 text-center bg-[#f5f5f6] rounded border border-[#eaeaec]">
              <h2 className="font-display text-lg font-bold text-[#282c3f]">
                No matching styles found
              </h2>
              <p className="text-sm text-[#535766] mt-1.5 max-w-md mx-auto">
                Try broadening your selected filters or clearing your search query to explore the full VERVE collection.
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-5 h-11 px-6 rounded bg-[#ff3f6c] hover:bg-[#df2457] text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#161b2d]/45 backdrop-blur-xs lg:hidden flex justify-end"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-white h-full shadow-overlay-panel flex flex-col"
          >
            <div className="px-5 py-4 border-b border-[#eaeaec] flex items-center justify-between">
              <span className="font-display text-sm font-bold uppercase tracking-wider text-[#282c3f]">
                Filters
              </span>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="font-display text-xs font-bold uppercase text-[#ff3f6c] cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="p-1 text-[#535766]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {renderFilterSections()}
            </div>
            <div className="p-4 border-t border-[#eaeaec]">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full h-12 rounded bg-[#ff3f6c] text-white font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Show {filteredProducts.length} Styles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

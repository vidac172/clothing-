import React, { useEffect, useRef, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { MEGA_MENU_DATA, PRODUCTS, formatINR } from '../data/catalog';
import { CategoryKey, Product, ScreenView } from '../types/commerce';
import { ResilientImage } from './ResilientImage';

interface NavbarProps {
  activeScreen: ScreenView;
  activeCategory: CategoryKey;
  searchQuery: string;
  wishlistCount: number;
  bagCount: number;
  onNavigateHome: () => void;
  onSelectCategory: (category: CategoryKey, subCategory?: string | null) => void;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onOpenProduct: (product: Product) => void;
  onOpenWishlist: () => void;
  onOpenBagDrawer: () => void;
}

const NAV_CATEGORIES: { label: string; key: Exclude<CategoryKey, 'All'> }[] = [
  { label: 'Women', key: 'Women' },
  { label: 'Men', key: 'Men' },
  { label: 'Festive', key: 'Indian & Festive' },
  { label: 'Footwear', key: 'Footwear' },
  { label: 'Accessories', key: 'Accessories' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  activeCategory,
  searchQuery,
  wishlistCount,
  bagCount,
  onNavigateHome,
  onSelectCategory,
  onSearchChange,
  onSearchSubmit,
  onOpenProduct,
  onOpenWishlist,
  onOpenBagDrawer,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<Exclude<CategoryKey, 'All'> | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuEnter = (key: Exclude<CategoryKey, 'All'>) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredMenu(key);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 120);
  };

  const quickMatches = searchQuery.trim().length > 0
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
        );
      }).slice(0, 4)
    : [];

  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sticky-bar border-b border-[#eaeaec]"
      onMouseLeave={handleMenuLeave}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 lg:h-[74px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Left: Brand Wordmark + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 -ml-2 text-[#282c3f] hover:text-[#ff3f6c] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setHoveredMenu(null);
              onNavigateHome();
            }}
            className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[#282c3f] flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff3f6c]"
          >
            <span>VERVE</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff3f6c] mt-2" aria-hidden="true" />
          </button>
        </div>

        {/* Center-Left: Desktop Primary Navigation Links */}
        <nav className="hidden lg:flex items-center h-full gap-7 shrink-0" aria-label="Main categories">
          {NAV_CATEGORIES.map((item) => {
            const isActive =
              (activeScreen === 'catalog' && activeCategory === item.key) ||
              hoveredMenu === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onMouseEnter={() => handleMenuEnter(item.key)}
                onClick={() => {
                  setHoveredMenu(null);
                  onSelectCategory(item.key, null);
                }}
                className={`relative h-full flex items-center font-display text-xs font-bold uppercase tracking-[0.06em] whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#ff3f6c]' : 'text-[#282c3f] hover:text-[#ff3f6c]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff3f6c] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Center-Right: Search Bar (44px height, #f5f5f6 surface) */}
        <div ref={searchRef} className="relative flex-1 max-w-md hidden sm:block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchFocused(false);
              onSearchSubmit(searchQuery);
            }}
            className="relative"
          >
            <Search
              className="w-4 h-4 text-[#535766] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for blazers, kurta sets, sneakers..."
              aria-label="Search products and brands"
              className="w-full h-11 pl-10 pr-9 rounded bg-[#f5f5f6] border border-transparent focus:bg-white focus:border-[#d4d5d9] focus:outline-none text-sm text-[#282c3f] placeholder:text-[#535766] placeholder:font-medium transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#535766] hover:text-[#282c3f] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Instant Search Dropdown */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded border border-[#eaeaec] shadow-overlay-panel overflow-hidden z-50">
              {quickMatches.length > 0 ? (
                <div className="divide-y divide-[#f5f5f6]">
                  {quickMatches.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSearchFocused(false);
                        onOpenProduct(item);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-[#fbf8ff] transition-colors text-left cursor-pointer"
                    >
                      <ResilientImage
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-12 object-cover rounded shrink-0 bg-[#f5f5f6]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-xs font-bold text-[#282c3f] truncate">
                          {item.brand}
                        </p>
                        <p className="text-xs text-[#535766] truncate">{item.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display text-xs font-bold text-[#282c3f] tabular-nums">
                          {formatINR(item.price)}
                        </p>
                        <p className="font-display text-[10px] font-bold text-[#03a685] tabular-nums">
                          {item.discountPercent}% OFF
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchFocused(false);
                      onSearchSubmit(searchQuery);
                    }}
                    className="w-full py-2.5 px-4 text-center font-display text-xs font-bold uppercase tracking-wider text-[#ff3f6c] hover:bg-[#fff1f4] transition-colors cursor-pointer"
                  >
                    View all results for “{searchQuery}”
                  </button>
                </div>
              ) : (
                <div className="p-4 text-sm text-[#535766] text-center">
                  No styles found for “{searchQuery}”.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Wishlist & Shopping Bag Actions */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <button
            type="button"
            onClick={onOpenWishlist}
            className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] transition-colors cursor-pointer ${
              activeScreen === 'wishlist'
                ? 'text-[#ff3f6c]'
                : 'text-[#282c3f] hover:text-[#ff3f6c]'
            }`}
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <div className="relative">
              <Heart
                className="w-5 h-5"
                strokeWidth={1.9}
                fill={activeScreen === 'wishlist' ? '#ff3f6c' : 'none'}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#ff3f6c] text-white font-display text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden md:block font-display text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Wishlist
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenBagDrawer}
            className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] transition-colors cursor-pointer ${
              activeScreen === 'checkout'
                ? 'text-[#ff3f6c]'
                : 'text-[#282c3f] hover:text-[#ff3f6c]'
            }`}
            aria-label={`Shopping bag, ${bagCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.9} />
              {bagCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#ff3f6c] text-white font-display text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {bagCount}
                </span>
              )}
            </div>
            <span className="hidden md:block font-display text-[10px] font-bold uppercase tracking-wider mt-0.5">
              Bag
            </span>
          </button>
        </div>
      </div>

      {/* Full-Width Desktop Mega-Menu Dropdown (Level 3 Elevation) */}
      {hoveredMenu && (
        <div
          onMouseEnter={() => handleMenuEnter(hoveredMenu)}
          onMouseLeave={handleMenuLeave}
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-t border-[#eaeaec] shadow-overlay-panel z-50"
        >
          <div className="max-w-[1440px] mx-auto px-10 py-8 grid grid-cols-12 gap-8">
            <div className="col-span-8 grid grid-cols-3 gap-8">
              {MEGA_MENU_DATA[hoveredMenu].map((column) => (
                <div key={column.title}>
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#ff3f6c] mb-3.5">
                    {column.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {column.items.map((link) => (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() => {
                            setHoveredMenu(null);
                            onSelectCategory(link.category, link.subCategory ?? null);
                          }}
                          className="text-sm text-[#282c3f] hover:text-[#ff3f6c] hover:font-medium transition-colors text-left cursor-pointer"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Editorial Spotlight inside Mega-Menu */}
            <div className="col-span-4 bg-[#fdf1e6] rounded p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff905a]">
                  Season Offer
                </p>
                <p className="font-display text-base font-bold text-[#282c3f] mt-1">
                  Extra 20% Off {hoveredMenu}
                </p>
                <p className="text-xs text-[#535766] mt-1">
                  Apply code <span className="font-display font-bold text-[#282c3f]">VERVE20</span> at checkout.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setHoveredMenu(null);
                    onSelectCategory(hoveredMenu, null);
                  }}
                  className="mt-4 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-[#ff3f6c] hover:text-[#b90041] cursor-pointer"
                >
                  Shop {hoveredMenu} →
                </button>
              </div>
              {PRODUCTS.find((p) => p.category === hoveredMenu) && (
                <ResilientImage
                  src={PRODUCTS.find((p) => p.category === hoveredMenu)!.image}
                  alt={hoveredMenu}
                  className="w-24 h-32 object-cover rounded shrink-0"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#eaeaec] bg-white px-4 py-4 space-y-4 shadow-overlay-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onSearchSubmit(searchQuery);
            }}
            className="relative sm:hidden"
          >
            <Search className="w-4 h-4 text-[#535766] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search styles, brands..."
              className="w-full h-11 pl-10 pr-4 rounded bg-[#f5f5f6] text-sm text-[#282c3f] placeholder:text-[#535766] focus:outline-none focus:bg-white focus:border focus:border-[#d4d5d9]"
            />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {NAV_CATEGORIES.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectCategory(item.key, null);
                }}
                className={`py-2.5 px-3 rounded text-left font-display text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  activeCategory === item.key && activeScreen === 'catalog'
                    ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                    : 'border-[#eaeaec] text-[#282c3f] hover:border-[#ff3f6c]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectCategory('All', null);
              }}
              className="py-2.5 px-3 rounded text-left font-display text-xs font-bold uppercase tracking-wider border border-[#eaeaec] text-[#ff3f6c] bg-[#fdf1e6] cursor-pointer"
            >
              View All Styles
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

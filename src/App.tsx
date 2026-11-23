import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogScreen } from './components/CatalogScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { StorefrontHome } from './components/StorefrontHome';
import { WishlistScreen } from './components/WishlistScreen';
import { COUPONS, PRODUCTS } from './data/catalog';
import {
  CartItem,
  CategoryKey,
  FilterState,
  OrderRecord,
  Product,
  ScreenView,
  SortOption,
} from './types/commerce';

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  subCategory: null,
  brands: [],
  priceRange: 'all',
  minDiscount: 0,
  minRating: 0,
  searchQuery: '',
};

export default function App() {
  const [screen, setScreen] = useState<ScreenView>('home');
  const [previousScreen, setPreviousScreen] = useState<ScreenView>('home');
  const [activeProductId, setActiveProductId] = useState<string>(PRODUCTS[0].id);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'vrv-w-blazer-01',
    'vrv-f-kurta-05',
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      productId: 'vrv-w-dress-02',
      size: 'S',
      color: 'Champagne Blush',
      quantity: 1,
    },
  ]);

  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [bagDrawerOpen, setBagDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen, activeProductId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  const activeProduct =
    PRODUCTS.find((p) => p.id === activeProductId) ?? PRODUCTS[0];

  const bagCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const bagSubtotal = useMemo(() => {
    return cartItems.reduce((sum, ci) => {
      const prod = PRODUCTS.find((p) => p.id === ci.productId);
      return sum + (prod ? prod.price * ci.quantity : 0);
    }, 0);
  }, [cartItems]);

  const couponDiscount = useMemo(() => {
    if (!appliedCouponCode) return 0;
    const coupon = COUPONS.find((c) => c.code === appliedCouponCode);
    if (!coupon || bagSubtotal < coupon.minOrder) return 0;
    if (coupon.type === 'flat') return coupon.value;
    const pct = Math.round((bagSubtotal * coupon.value) / 100);
    return coupon.maxDiscount ? Math.min(pct, coupon.maxDiscount) : pct;
  }, [appliedCouponCode, bagSubtotal]);

  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`Removed ${product.brand} from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        if (product) showToast(`Saved ${product.brand} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const handleAddToBag = (product: Product, size: string, color?: string) => {
    const resolvedColor = color || product.colors[0]?.name || 'Standard';
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.size === size
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          size,
          color: resolvedColor,
          quantity: 1,
        },
      ];
    });
    showToast(`Added ${product.brand} (${size}) to Bag`);
  };

  const handleUpdateQty = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const handleMoveWishlistToBag = (product: Product, size: string) => {
    handleAddToBag(product, size, product.colors[0]?.name);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const handleApplyCoupon = (code: string | null) => {
    setAppliedCouponCode(code);
    if (code) {
      showToast(`Coupon ${code} saved for checkout`);
    }
  };

  const handleOpenProduct = (product: Product) => {
    if (screen !== 'product') {
      setPreviousScreen(screen);
    }
    setActiveProductId(product.id);
    setScreen('product');
  };

  const handleSelectCategory = (
    category: CategoryKey,
    subCategory: string | null = null
  ) => {
    setFilters({
      ...DEFAULT_FILTERS,
      category,
      subCategory,
    });
    setScreen('catalog');
  };

  const handleSearchSubmit = (q: string) => {
    setFilters((prev) => ({
      ...prev,
      category: 'All',
      subCategory: null,
      searchQuery: q,
    }));
    setScreen('catalog');
  };

  const handlePlaceOrder = (_order: OrderRecord) => {
    setCartItems([]);
    setAppliedCouponCode(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#282c3f]">
      <Navbar
        activeScreen={screen}
        activeCategory={filters.category}
        searchQuery={filters.searchQuery}
        wishlistCount={wishlistIds.length}
        bagCount={bagCount}
        onNavigateHome={() => setScreen('home')}
        onSelectCategory={handleSelectCategory}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        onSearchSubmit={handleSearchSubmit}
        onOpenProduct={handleOpenProduct}
        onOpenWishlist={() => setScreen('wishlist')}
        onOpenBagDrawer={() => setBagDrawerOpen(true)}
      />

      <main className="flex-1">
        {screen === 'home' && (
          <StorefrontHome
            wishlistIds={wishlistIds}
            appliedCouponCode={appliedCouponCode}
            onApplyCoupon={(code) => handleApplyCoupon(code)}
            onToggleWishlist={handleToggleWishlist}
            onQuickAdd={(product, size) => handleAddToBag(product, size)}
            onOpenProduct={handleOpenProduct}
            onNavigateCatalog={(category) => handleSelectCategory(category, null)}
          />
        )}

        {screen === 'catalog' && (
          <CatalogScreen
            filters={filters}
            sortBy={sortBy}
            wishlistIds={wishlistIds}
            onUpdateFilters={(next) =>
              setFilters((prev) => ({ ...prev, ...next }))
            }
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            onSortChange={setSortBy}
            onToggleWishlist={handleToggleWishlist}
            onQuickAdd={(product, size) => handleAddToBag(product, size)}
            onOpenProduct={handleOpenProduct}
            onNavigateHome={() => setScreen('home')}
          />
        )}

        {screen === 'product' && (
          <ProductDetailScreen
            key={activeProduct.id}
            product={activeProduct}
            isWishlisted={wishlistIds.includes(activeProduct.id)}
            wishlistIds={wishlistIds}
            appliedCouponCode={appliedCouponCode}
            onApplyCoupon={(code) => handleApplyCoupon(code)}
            onAddToBag={handleAddToBag}
            onQuickAdd={(product, size) => handleAddToBag(product, size)}
            onToggleWishlist={handleToggleWishlist}
            onOpenProduct={handleOpenProduct}
            onNavigateCategory={(cat) => handleSelectCategory(cat, null)}
            onBack={() =>
              setScreen(previousScreen === 'product' ? 'catalog' : previousScreen)
            }
          />
        )}

        {screen === 'wishlist' && (
          <WishlistScreen
            wishlistIds={wishlistIds}
            onRemoveWishlist={handleToggleWishlist}
            onMoveToBag={handleMoveWishlistToBag}
            onOpenProduct={handleOpenProduct}
            onExploreCatalog={() => handleSelectCategory('All', null)}
          />
        )}

        {screen === 'checkout' && (
          <CheckoutScreen
            items={cartItems}
            appliedCouponCode={appliedCouponCode}
            couponDiscount={couponDiscount}
            onApplyCoupon={handleApplyCoupon}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onPlaceOrder={handlePlaceOrder}
            onContinueShopping={() => setScreen('home')}
          />
        )}
      </main>

      <Footer
        onSelectCategory={(cat) => handleSelectCategory(cat, null)}
        onNavigateHome={() => setScreen('home')}
      />

      {/* Slide-Over Level-3 Shopping Bag Drawer */}
      <CartDrawer
        isOpen={bagDrawerOpen}
        items={cartItems}
        appliedCouponCode={appliedCouponCode}
        couponDiscount={couponDiscount}
        onClose={() => setBagDrawerOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onOpenProduct={handleOpenProduct}
        onProceedToCheckout={() => setScreen('checkout')}
      />

      {/* Subtle Floating Action Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#282c3f] text-white px-4 py-3 rounded shadow-overlay-panel flex items-center gap-2.5 text-xs font-display font-semibold tracking-wide"
        >
          <CheckCircle2 className="w-4 h-4 text-[#03a685] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { PRODUCTS, formatINR } from '../data/catalog';
import { Product } from '../types/commerce';
import { ResilientImage } from './ResilientImage';

interface WishlistScreenProps {
  wishlistIds: string[];
  onRemoveWishlist: (productId: string) => void;
  onMoveToBag: (product: Product, size: string) => void;
  onOpenProduct: (product: Product) => void;
  onExploreCatalog: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistIds,
  onRemoveWishlist,
  onMoveToBag,
  onOpenProduct,
  onExploreCatalog,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const items = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
      <div className="flex items-baseline gap-2.5 pb-5 border-b border-[#eaeaec]">
        <h1 className="font-display text-2xl font-bold text-[#282c3f]">My Wishlist</h1>
        <span className="text-sm text-[#535766] tabular-nums">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#fff1f4] text-[#ff3f6c] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display text-lg font-bold text-[#282c3f]">
            Your wishlist is currently empty
          </h2>
          <p className="text-sm text-[#535766] mt-1.5">
            Save your favourite tailored silhouettes, festive sets, and footwear here for quick sizing and checkout later.
          </p>
          <button
            type="button"
            onClick={onExploreCatalog}
            className="mt-6 h-12 px-7 rounded bg-[#ff3f6c] hover:bg-[#df2457] text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {items.map((product) => {
            const chosenSize = selectedSizes[product.id] ?? product.sizes[0];
            return (
              <div
                key={product.id}
                className="bg-white rounded card-resting-border overflow-hidden flex flex-col"
              >
                <div
                  onClick={() => onOpenProduct(product)}
                  className="relative aspect-[3/4] bg-[#f5f5f6] overflow-hidden cursor-pointer"
                >
                  <ResilientImage
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveWishlist(product.id);
                    }}
                    aria-label={`Remove ${product.title} from wishlist`}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-[#282c3f] hover:text-[#ff3f6c] flex items-center justify-center shadow-sm cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-display text-xs font-bold uppercase text-[#282c3f] truncate">
                      {product.brand}
                    </p>
                    <p className="text-xs text-[#535766] truncate mt-0.5">
                      {product.title}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2 tabular-nums">
                      <span className="font-display text-sm font-bold text-[#282c3f]">
                        {formatINR(product.price)}
                      </span>
                      <span className="text-xs text-[#535766] line-through">
                        {formatINR(product.mrp)}
                      </span>
                      <span className="font-display text-xs font-semibold text-[#03a685]">
                        ({product.discountPercent}% OFF)
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#f5f5f6] space-y-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() =>
                            setSelectedSizes((prev) => ({ ...prev, [product.id]: sz }))
                          }
                          className={`h-7 px-2 rounded text-[11px] font-display font-bold border transition-colors cursor-pointer ${
                            chosenSize === sz
                              ? 'border-[#ff3f6c] bg-[#fff1f4] text-[#ff3f6c]'
                              : 'border-[#eaeaec] text-[#535766] hover:border-[#282c3f]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onMoveToBag(product, chosenSize)}
                      className="w-full h-10 rounded border border-[#ff3f6c] text-[#ff3f6c] hover:bg-[#ff3f6c] hover:text-white font-display text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

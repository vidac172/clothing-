import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { formatINR } from '../data/catalog';
import { Product } from '../types/commerce';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product, size: string) => void;
  onOpenProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onOpenProduct,
}) => {
  const [recentlyAddedSize, setRecentlyAddedSize] = useState<string | null>(null);

  const badgeStyles =
    product.badgeVariant === 'discount'
      ? 'bg-[#03a685] text-white'
      : product.badgeVariant === 'urgency'
        ? 'bg-[#fdf1e6] text-[#994211] border border-[#ff905a]/40'
        : 'bg-[#ff3f6c] text-white';

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onQuickAdd(product, size);
    setRecentlyAddedSize(size);
    window.setTimeout(() => setRecentlyAddedSize(null), 1100);
  };

  return (
    <article
      onClick={() => onOpenProduct(product)}
      className="group relative bg-white rounded card-resting-border overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer flex flex-col"
    >
      {/* 3:4 Vertical Fashion Imagery Stage */}
      <div className="relative aspect-[3/4] bg-[#f5f5f6] overflow-hidden">
        <ResilientImage
          src={product.image}
          alt={`${product.brand} ${product.title}`}
          fallbackTitle={product.brand}
          className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        {/* Top-Left Discount / Offer Badge */}
        {product.badgeText && (
          <span
            className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full font-display text-[10px] font-bold uppercase tracking-[0.06em] ${badgeStyles}`}
          >
            {product.badgeText}
          </span>
        )}

        {/* Top-Right Floating Circular Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer ${
            isWishlisted
              ? 'bg-[#fff1f4] text-[#ff3f6c] shadow-sm'
              : 'bg-white/90 text-[#282c3f] hover:bg-white hover:text-[#ff3f6c] shadow-sm'
          }`}
        >
          <Heart
            className="w-4 h-4"
            strokeWidth={2}
            fill={isWishlisted ? '#ff3f6c' : 'none'}
          />
        </button>

        {/* Bottom-Left Semi-Transparent Floating Rating Chip */}
        <div className="absolute bottom-2.5 left-2.5 group-hover:opacity-0 transition-opacity duration-150 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <span className="font-display text-[11px] font-bold text-[#282c3f] tabular-nums">
            {product.rating.toFixed(1)}
          </span>
          <Star className="w-3 h-3 text-[#14958f] fill-[#14958f]" />
          <span className="text-[#d4d5d9] text-[10px]" aria-hidden="true">|</span>
          <span className="font-display text-[10px] font-semibold text-[#535766] tabular-nums">
            {product.ratingCount}
          </span>
        </div>

        {/* Hover Quick-Size Add Overlay */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-[#eaeaec] px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#535766]">
              {recentlyAddedSize ? `Added ${recentlyAddedSize} to Bag` : 'Quick Add Size'}
            </span>
            {recentlyAddedSize && (
              <span className="font-display text-[10px] font-bold text-[#03a685]">
                Added
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => handleSizeClick(e, size)}
                className={`min-w-[30px] h-7 px-2 rounded text-[11px] font-display font-bold transition-colors cursor-pointer ${
                  recentlyAddedSize === size
                    ? 'bg-[#03a685] text-white border border-[#03a685]'
                    : 'bg-white text-[#282c3f] border border-[#d4d5d9] hover:border-[#ff3f6c] hover:text-[#ff3f6c] hover:bg-[#fff1f4]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card Content Block */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.04em] text-[#282c3f] truncate">
            {product.brand}
          </h3>
          <p className="text-xs text-[#535766] mt-0.5 truncate leading-4">
            {product.title}
          </p>
        </div>

        {/* Price Block: Selling Price + Strikethrough MRP + Discount Green % */}
        <div className="mt-2.5 flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
          <span className="font-display text-sm font-bold text-[#282c3f] tabular-nums">
            {formatINR(product.price)}
          </span>
          <span className="text-xs text-[#535766] line-through tabular-nums">
            {formatINR(product.mrp)}
          </span>
          <span className="font-display text-xs font-semibold text-[#03a685] tabular-nums">
            ({product.discountPercent}% OFF)
          </span>
        </div>
      </div>
    </article>
  );
};

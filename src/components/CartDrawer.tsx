import React from 'react';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { PRODUCTS, formatINR } from '../data/catalog';
import { CartItem, Product } from '../types/commerce';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  appliedCouponCode: string | null;
  couponDiscount: number;
  onClose: () => void;
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onOpenProduct: (product: Product) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  appliedCouponCode,
  couponDiscount,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onOpenProduct,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const resolvedItems = items
    .map((ci) => {
      const product = PRODUCTS.find((p) => p.id === ci.productId);
      return product ? { ...ci, product } : null;
    })
    .filter((x): x is CartItem & { product: Product } => x !== null);

  const totalMrp = resolvedItems.reduce((sum, i) => sum + i.product.mrp * i.quantity, 0);
  const subtotal = resolvedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const mrpSavings = totalMrp - subtotal;
  const finalTotal = Math.max(0, subtotal - couponDiscount);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161b2d]/45 backdrop-blur-xs flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-overlay-panel flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eaeaec] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff3f6c]" />
            <h2 className="font-display text-base font-bold text-[#282c3f]">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#535766] tabular-nums">
              ({resolvedItems.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="p-1.5 text-[#535766] hover:text-[#282c3f] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {resolvedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#f5f5f6] text-[#535766] flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <p className="font-display text-base font-bold text-[#282c3f]">
              Your bag is empty
            </p>
            <p className="text-sm text-[#535766] mt-1">
              Hover over any style to quick-add a size or browse our new season collections.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 h-11 px-6 rounded bg-[#ff3f6c] text-white font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#eaeaec]">
              {resolvedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="py-4 first:pt-1 flex gap-3.5"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenProduct(item.product);
                    }}
                    className="w-20 h-[106px] rounded bg-[#f5f5f6] overflow-hidden shrink-0 cursor-pointer"
                  >
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-xs font-bold uppercase text-[#282c3f] truncate">
                          {item.product.brand}
                        </p>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.productId, item.size)}
                          aria-label={`Remove ${item.product.title}`}
                          className="text-[#535766] hover:text-[#ba1a1a] p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#535766] truncate mt-0.5">
                        {item.product.title}
                      </p>
                      <p className="text-[11px] text-[#535766] mt-1">
                        Size: <strong className="text-[#282c3f]">{item.size}</strong>
                        <span className="mx-1.5">·</span>
                        {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="inline-flex items-center border border-[#d4d5d9] rounded">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, item.size, -1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#282c3f] hover:bg-[#f5f5f6] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-display text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.productId, item.size, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#282c3f] hover:bg-[#f5f5f6] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right tabular-nums">
                        <span className="font-display text-sm font-bold text-[#282c3f]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                        <span className="text-[11px] text-[#535766] line-through ml-1.5">
                          {formatINR(item.product.mrp * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="border-t border-[#eaeaec] p-6 bg-[#fbf8ff] space-y-3">
              {appliedCouponCode && couponDiscount > 0 && (
                <div className="flex items-center justify-between text-xs bg-[#fdf1e6] text-[#282c3f] px-3 py-2 rounded">
                  <span className="inline-flex items-center gap-1.5 font-display font-bold">
                    <Tag className="w-3.5 h-3.5 text-[#ff3f6c]" />
                    Coupon {appliedCouponCode} applied
                  </span>
                  <span className="font-display font-bold text-[#03a685] tabular-nums">
                    -{formatINR(couponDiscount)}
                  </span>
                </div>
              )}

              <div className="space-y-1.5 text-sm tabular-nums">
                <div className="flex justify-between text-[#535766]">
                  <span>Total MRP</span>
                  <span>{formatINR(totalMrp)}</span>
                </div>
                <div className="flex justify-between text-[#03a685]">
                  <span>Discount on MRP</span>
                  <span>-{formatINR(mrpSavings)}</span>
                </div>
                <div className="flex justify-between font-display text-base font-bold text-[#282c3f] pt-2 border-t border-[#eaeaec]">
                  <span>Estimated Total</span>
                  <span>{formatINR(finalTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full h-12 rounded bg-[#ff3f6c] hover:bg-[#df2457] active:scale-[0.99] text-white font-display text-sm font-bold uppercase tracking-[0.06em] transition-all cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

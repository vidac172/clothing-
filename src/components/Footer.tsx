import React from 'react';
import { RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { CategoryKey } from '../types/commerce';

interface FooterProps {
  onSelectCategory: (cat: CategoryKey) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-[#f5f5f6] border-t border-[#eaeaec] mt-16">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#eaeaec]">
          <div className="md:col-span-4 space-y-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-display text-xl font-extrabold tracking-[-0.04em] text-[#282c3f] flex items-center gap-1 cursor-pointer"
            >
              <span>VERVE</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff3f6c] mt-1.5" aria-hidden="true" />
            </button>
            <p className="text-sm text-[#535766] max-w-sm leading-relaxed">
              Contemporary fashion retail engineered for effortless wardrobe curation—balancing runway sharpness with everyday clarity.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3.5">
              Online Shopping
            </h4>
            <ul className="space-y-2 text-sm text-[#535766]">
              {(['Women', 'Men', 'Indian & Festive', 'Footwear', 'Accessories'] as const).map(
                (cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => onSelectCategory(cat)}
                      className="hover:text-[#ff3f6c] transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f] mb-3.5">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-sm text-[#535766]">
              <li>14-Day Hassle-Free Returns & Exchanges</li>
              <li>Complimentary Express Delivery Above ₹1,999</li>
              <li>Cash on Delivery Available Nationwide</li>
              <li>Verified Quality & Authenticity Guarantee</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#282c3f] shrink-0 mt-0.5" strokeWidth={1.7} />
              <p className="text-xs text-[#535766] leading-relaxed">
                <strong className="font-display text-[#282c3f]">100% Original</strong> guarantee for all styles across Atelier Verve & partner labels.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-[#282c3f] shrink-0 mt-0.5" strokeWidth={1.7} />
              <p className="text-xs text-[#535766] leading-relaxed">
                <strong className="font-display text-[#282c3f]">Return within 14 days</strong> of receiving your order with doorstep pickup.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#282c3f] shrink-0 mt-0.5" strokeWidth={1.7} />
              <p className="text-xs text-[#535766] leading-relaxed">
                <strong className="font-display text-[#282c3f]">Express Dispatch</strong> within 24 hours from our regional fulfillment studios.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#535766]">
          <p>© 2026 VERVE Fashion Commerce. All rights reserved.</p>
          <p>Prices inclusive of applicable taxes · Free shipping on orders over ₹1,999</p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from 'lucide-react';
import { COUPONS, PRODUCTS, formatINR } from '../data/catalog';
import { CartItem, OrderRecord, Product } from '../types/commerce';
import { ResilientImage } from './ResilientImage';

interface CheckoutScreenProps {
  items: CartItem[];
  appliedCouponCode: string | null;
  couponDiscount: number;
  onApplyCoupon: (code: string | null) => void;
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
  onContinueShopping: () => void;
}

type CheckoutStep = 'bag' | 'address' | 'payment' | 'confirmed';

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  appliedCouponCode,
  couponDiscount,
  onApplyCoupon,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
  onContinueShopping,
}) => {
  const [step, setStep] = useState<CheckoutStep>('bag');
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  // Address Form
  const [fullName, setFullName] = useState('Aarav Kapoor');
  const [phone, setPhone] = useState('9820411589');
  const [street, setStreet] = useState('14B Linking Road, Bandra West');
  const [city, setCity] = useState('Mumbai, Maharashtra');
  const [pincode, setPincode] = useState('400050');
  const [addressError, setAddressError] = useState<string | null>(null);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<
    'UPI / Instant Pay' | 'Credit / Debit Card' | 'Cash on Delivery'
  >('UPI / Instant Pay');

  const resolvedItems = items
    .map((ci) => {
      const product = PRODUCTS.find((p) => p.id === ci.productId);
      return product ? { ...ci, product } : null;
    })
    .filter((x): x is CartItem & { product: Product } => x !== null);

  const totalMrp = resolvedItems.reduce((sum, i) => sum + i.product.mrp * i.quantity, 0);
  const subtotal = resolvedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const mrpDiscount = totalMrp - subtotal;
  const shippingFee = subtotal >= 1999 || subtotal === 0 ? 0 : 149;
  const finalAmount = Math.max(0, subtotal - couponDiscount + shippingFee);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = couponInput.trim().toUpperCase();
    const match = COUPONS.find((c) => c.code === cleaned);
    if (!match) {
      setCouponMessage('Invalid coupon code. Try VERVE20 or FIRST500.');
      return;
    }
    if (subtotal < match.minOrder) {
      setCouponMessage(
        `Add ${formatINR(match.minOrder - subtotal)} more to unlock ${match.code}.`
      );
      return;
    }
    onApplyCoupon(match.code);
    setCouponMessage(`Applied ${match.code} — ${match.title}`);
    setCouponInput('');
  };

  const handleAddressContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !/^\d{10}$/.test(phone.trim()) || !street.trim() || !/^\d{6}$/.test(pincode.trim())) {
      setAddressError('Please fill in your full name, 10-digit phone number, address, and 6-digit PIN code.');
      return;
    }
    setAddressError(null);
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    const orderNum = `VRV-${Math.floor(104000 + Math.random() * 890000)}`;
    const record: OrderRecord = {
      orderId: orderNum,
      placedAt: '22 Nov 2026',
      estimatedDelivery: 'Thu, 26 Nov 2026',
      items: resolvedItems.map((i) => ({
        product: i.product,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
      })),
      totalMrp,
      totalDiscount: mrpDiscount,
      couponDiscount,
      shippingFee,
      finalAmount,
      paymentMethod,
      shippingAddress: {
        fullName,
        phone,
        street,
        city,
        pincode,
      },
    };
    setConfirmedOrder(record);
    setStep('confirmed');
    onPlaceOrder(record);
  };

  // Order Confirmed State
  if (step === 'confirmed' && confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 lg:px-10 py-12">
        <div className="bg-white rounded card-resting-border p-8 sm:p-10">
          <div className="flex items-center gap-3 text-[#03a685]">
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.1em]">
                Order Confirmed
              </p>
              <h1 className="font-display text-2xl font-bold text-[#282c3f]">
                Thank you, {confirmedOrder.shippingAddress.fullName}
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#535766] mt-3">
            Order <strong className="font-display text-[#282c3f]">{confirmedOrder.orderId}</strong> is confirmed and preparing for dispatch. Estimated delivery by{' '}
            <strong className="text-[#282c3f]">{confirmedOrder.estimatedDelivery}</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 rounded bg-[#f5f5f6] text-xs">
            <div>
              <p className="font-display font-bold uppercase tracking-wider text-[#535766]">
                Delivering To
              </p>
              <p className="font-semibold text-[#282c3f] mt-1">
                {confirmedOrder.shippingAddress.fullName}
              </p>
              <p className="text-[#535766] mt-0.5">
                {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city} — {confirmedOrder.shippingAddress.pincode}
              </p>
              <p className="text-[#535766] mt-0.5 tabular-nums">
                Phone: +91 {confirmedOrder.shippingAddress.phone}
              </p>
            </div>
            <div>
              <p className="font-display font-bold uppercase tracking-wider text-[#535766]">
                Payment Summary
              </p>
              <p className="font-semibold text-[#282c3f] mt-1">
                {confirmedOrder.paymentMethod}
              </p>
              <p className="text-[#03a685] font-semibold mt-0.5 tabular-nums">
                Total Savings: {formatINR(confirmedOrder.totalDiscount + confirmedOrder.couponDiscount)}
              </p>
              <p className="font-display text-sm font-bold text-[#282c3f] mt-1 tabular-nums">
                Amount Payable: {formatINR(confirmedOrder.finalAmount)}
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-[#eaeaec] border-t border-b border-[#eaeaec]">
            {confirmedOrder.items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ResilientImage
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-12 h-16 object-cover rounded shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-xs font-bold uppercase text-[#282c3f]">
                      {item.product.brand}
                    </p>
                    <p className="text-xs text-[#535766] truncate">{item.product.title}</p>
                    <p className="text-[11px] text-[#535766] mt-0.5">
                      Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-display text-sm font-bold text-[#282c3f] tabular-nums shrink-0">
                  {formatINR(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={onContinueShopping}
              className="h-12 px-7 rounded bg-[#ff3f6c] hover:bg-[#df2457] text-white font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Bag State
  if (resolvedItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#fff1f4] text-[#ff3f6c] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="font-display text-xl font-bold text-[#282c3f]">
          Hey, your shopping bag feels light
        </h1>
        <p className="text-sm text-[#535766] mt-1.5">
          Add styles from our tailored suiting, denim, festive, or footwear edits to begin checkout.
        </p>
        <button
          type="button"
          onClick={onContinueShopping}
          className="mt-6 h-12 px-7 rounded bg-[#ff3f6c] hover:bg-[#df2457] text-white font-display text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: 'bag', label: '1. Bag' },
    { id: 'address', label: '2. Address' },
    { id: 'payment', label: '3. Payment' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-8">
      {/* Stepper Header */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 pb-7 mb-7 border-b border-[#eaeaec]">
        {steps.map((s, idx) => {
          const isCurrent = step === s.id;
          const isCompleted =
            (step === 'address' && idx === 0) ||
            (step === 'payment' && idx <= 1);
          return (
            <button
              key={s.id}
              type="button"
              disabled={!isCompleted && !isCurrent}
              onClick={() => isCompleted && setStep(s.id)}
              className={`font-display text-xs font-bold uppercase tracking-[0.12em] pb-1.5 border-b-2 transition-colors ${
                isCurrent
                  ? 'border-[#ff3f6c] text-[#ff3f6c]'
                  : isCompleted
                    ? 'border-[#03a685] text-[#03a685] cursor-pointer'
                    : 'border-transparent text-[#535766]/60'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Step Content */}
        <div className="lg:col-span-8 space-y-5">
          {step === 'bag' && (
            <>
              <div className="bg-[#fdf1e6] rounded px-4 py-3 flex items-center justify-between gap-3 border border-[#ff905a]/25">
                <div className="flex items-center gap-2 text-xs text-[#282c3f]">
                  <Truck className="w-4 h-4 text-[#ff3f6c] shrink-0" />
                  <span>
                    {shippingFee === 0
                      ? 'You unlocked Complimentary Express Delivery on this bag.'
                      : `Add ${formatINR(1999 - subtotal)} more for Complimentary Express Delivery.`}
                  </span>
                </div>
                <span className="font-display text-[11px] font-bold uppercase text-[#03a685] shrink-0">
                  {shippingFee === 0 ? 'Free Shipping' : 'Standard ₹149'}
                </span>
              </div>

              <div className="bg-white rounded card-resting-border divide-y divide-[#eaeaec]">
                {resolvedItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="p-5 flex gap-4"
                  >
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-32 object-cover object-top rounded shrink-0 bg-[#f5f5f6]"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-xs font-bold uppercase text-[#282c3f]">
                              {item.product.brand}
                            </p>
                            <h2 className="text-sm font-medium text-[#282c3f] mt-0.5">
                              {item.product.title}
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.productId, item.size)}
                            aria-label="Remove item"
                            className="text-[#535766] hover:text-[#ba1a1a] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#535766] mt-1.5">
                          Size: <strong className="text-[#282c3f]">{item.size}</strong>
                          <span className="mx-2">·</span>
                          Color: <strong className="text-[#282c3f]">{item.color}</strong>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                        <div className="inline-flex items-center border border-[#d4d5d9] rounded">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.productId, item.size, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f6] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-display text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.productId, item.size, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f6] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-baseline gap-2 tabular-nums">
                          <span className="font-display text-base font-bold text-[#282c3f]">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                          <span className="text-xs text-[#535766] line-through">
                            {formatINR(item.product.mrp * item.quantity)}
                          </span>
                          <span className="font-display text-xs font-bold text-[#03a685]">
                            ({item.product.discountPercent}% OFF)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 'address' && (
            <form
              id="checkout-address-form"
              onSubmit={handleAddressContinue}
              className="bg-white rounded card-resting-border p-6 space-y-4"
            >
              <h2 className="font-display text-base font-bold text-[#282c3f]">
                Delivery Address
              </h2>

              {addressError && (
                <p className="text-xs font-medium text-[#ba1a1a] bg-[#ffdad6]/50 px-3 py-2 rounded">
                  {addressError}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#535766] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded border border-[#d4d5d9] focus:border-[#ff3f6c] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#535766] mb-1.5">
                    Mobile Number (10 digits)
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-11 px-3.5 rounded border border-[#d4d5d9] focus:border-[#ff3f6c] focus:outline-none text-sm tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#535766] mb-1.5">
                  Street Address &amp; Landmark
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full h-11 px-3.5 rounded border border-[#d4d5d9] focus:border-[#ff3f6c] focus:outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#535766] mb-1.5">
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3.5 rounded border border-[#d4d5d9] focus:border-[#ff3f6c] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#535766] mb-1.5">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full h-11 px-3.5 rounded border border-[#d4d5d9] focus:border-[#ff3f6c] focus:outline-none text-sm tabular-nums"
                  />
                </div>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded card-resting-border p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#282c3f]">
                  Choose Payment Mode
                </h2>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#14958f] font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  100% Secure Checkout
                </span>
              </div>

              <div className="space-y-3">
                {(
                  [
                    {
                      id: 'UPI / Instant Pay',
                      desc: 'Instant verification via Google Pay, PhonePe, or BHIM UPI',
                    },
                    {
                      id: 'Credit / Debit Card',
                      desc: 'Visa, Mastercard, RuPay, and Amex supported',
                    },
                    {
                      id: 'Cash on Delivery',
                      desc: 'Pay in cash or UPI upon doorstep delivery (No extra fee)',
                    },
                  ] as const
                ).map((method) => {
                  const selected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-4 rounded border text-left flex items-start gap-3.5 transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#ff3f6c] bg-[#fff1f4]/50'
                          : 'border-[#eaeaec] hover:border-[#d4d5d9]'
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                          selected ? 'border-[#ff3f6c] bg-[#ff3f6c]' : 'border-[#535766]'
                        }`}
                      >
                        {selected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-[#282c3f] flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#535766]" />
                          {method.id}
                        </p>
                        <p className="text-xs text-[#535766] mt-0.5">{method.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded bg-[#f5f5f6] text-xs text-[#535766]">
                Delivering to <strong className="text-[#282c3f]">{fullName}</strong> · {street}, {city} — {pincode}
              </div>
            </div>
          )}
        </div>

        {/* Right Price Summary & Coupons Column */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-[92px]">
          {/* Coupons Box */}
          <div className="bg-white rounded card-resting-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[#ff3f6c]" />
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f]">
                Coupons &amp; Offers
              </h3>
            </div>

            {appliedCouponCode ? (
              <div className="flex items-center justify-between bg-[#fdf1e6] border border-[#ff905a]/30 rounded px-3 py-2.5">
                <div>
                  <p className="font-display text-xs font-bold text-[#282c3f] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#03a685]" />
                    {appliedCouponCode} Applied
                  </p>
                  <p className="text-xs text-[#03a685] font-semibold tabular-nums">
                    Saving {formatINR(couponDiscount)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onApplyCoupon(null);
                    setCouponMessage(null);
                  }}
                  className="font-display text-xs font-bold uppercase text-[#ff3f6c] cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter VERVE20 or FIRST500"
                  className="flex-1 h-10 px-3 rounded bg-[#f5f5f6] border border-[#d4d5d9] focus:bg-white focus:border-[#ff3f6c] focus:outline-none text-xs uppercase font-display font-semibold"
                />
                <button
                  type="submit"
                  className="h-10 px-4 rounded border border-[#ff3f6c] text-[#ff3f6c] hover:bg-[#ff3f6c] hover:text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}
            {couponMessage && (
              <p className="text-xs text-[#535766] mt-2">{couponMessage}</p>
            )}
          </div>

          {/* Price Details Card */}
          <div className="bg-white rounded card-resting-border p-5 space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.08em] text-[#282c3f]">
              Price Details ({resolvedItems.reduce((a, b) => a + b.quantity, 0)} Items)
            </h3>

            <div className="space-y-2 text-sm tabular-nums">
              <div className="flex justify-between text-[#535766]">
                <span>Total MRP</span>
                <span>{formatINR(totalMrp)}</span>
              </div>
              <div className="flex justify-between text-[#03a685]">
                <span>Discount on MRP</span>
                <span>-{formatINR(mrpDiscount)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#03a685]">
                  <span>Coupon Discount</span>
                  <span>-{formatINR(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#535766]">
                <span>Shipping Fee</span>
                <span className={shippingFee === 0 ? 'text-[#03a685] font-medium' : ''}>
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eaeaec] flex justify-between font-display text-base font-bold text-[#282c3f] tabular-nums">
              <span>Total Amount</span>
              <span>{formatINR(finalAmount)}</span>
            </div>

            {step === 'bag' && (
              <button
                type="button"
                onClick={() => setStep('address')}
                className="w-full h-12 rounded bg-[#ff3f6c] hover:bg-[#df2457] active:scale-[0.99] text-white font-display text-sm font-bold uppercase tracking-[0.06em] transition-all cursor-pointer"
              >
                Place Order
              </button>
            )}

            {step === 'address' && (
              <button
                type="submit"
                form="checkout-address-form"
                className="w-full h-12 rounded bg-[#ff3f6c] hover:bg-[#df2457] active:scale-[0.99] text-white font-display text-sm font-bold uppercase tracking-[0.06em] transition-all cursor-pointer"
              >
                Continue to Payment
              </button>
            )}

            {step === 'payment' && (
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full h-12 rounded bg-[#ff3f6c] hover:bg-[#df2457] active:scale-[0.99] text-white font-display text-sm font-bold uppercase tracking-[0.06em] transition-all cursor-pointer"
              >
                Confirm &amp; Pay {formatINR(finalAmount)}
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

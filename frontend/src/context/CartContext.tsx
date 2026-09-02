'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

type CurrencyType = 'USD' | 'EUR' | 'BDT';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  // Compare State
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isCompared: (productId: number) => boolean;
  isCompareDrawerOpen: boolean;
  openCompareDrawer: () => void;
  closeCompareDrawer: () => void;
  // Currency
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (priceUSD: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CURRENCY_RATES: Record<CurrencyType, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  BDT: { symbol: '৳', rate: 119.5 },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tech_shop_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('tech_shop_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCurrency = localStorage.getItem('tech_shop_currency') as CurrencyType;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) setCurrency(savedCurrency);
    } catch (e) {
      console.error('Failed to load storage data', e);
    }
    setIsInitialized(true);
  }, []);

  // Save cart changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('tech_shop_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart, isInitialized]);

  // Save wishlist changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('tech_shop_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist, isInitialized]);

  // Save currency
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('tech_shop_currency', currency);
    } catch (e) {
      console.error('Failed to save currency', e);
    }
  }, [currency, isInitialized]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart! ⚡`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TECH10') {
      setCouponCode('TECH10');
      setCouponDiscountPercent(0.10);
      showToast('🎉 10% Discount applied with TECH10!');
      return true;
    } else if (clean === 'CYBER20') {
      setCouponCode('CYBER20');
      setCouponDiscountPercent(0.20);
      showToast('🚀 20% Flash Discount applied with CYBER20!');
      return true;
    } else {
      showToast('❌ Invalid promo code. Try "TECH10" or "CYBER20"');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  // Compare Functions
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name.slice(0, 18)} from comparison`);
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 devices simultaneously');
          return prev;
        }
        showToast(`Added ${product.name.slice(0, 18)} to comparison ⚖️`);
        setIsCompareDrawerOpen(true);
        return [...prev, product];
      }
    });
  };

  const removeFromCompare = (productId: number) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isCompared = (productId: number) => compareList.some(p => p.id === productId);

  const formatPrice = (priceUSD: number): string => {
    const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = priceUSD * info.rate;
    if (currency === 'BDT') {
      return `${info.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${info.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * couponDiscountPercent * 100) / 100;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 15;
  const totalPrice = Math.round((subtotal - discount + shipping) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        totalPrice,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        couponCode,
        applyCoupon,
        removeCoupon,
        toastMessage,
        showToast,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        openQuickView: (p: Product) => setQuickViewProduct(p),
        closeQuickView: () => setQuickViewProduct(null),
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
        isCompareDrawerOpen,
        openCompareDrawer: () => setIsCompareDrawerOpen(true),
        closeCompareDrawer: () => setIsCompareDrawerOpen(false),
        currency,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

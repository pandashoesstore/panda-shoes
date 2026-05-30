'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem } from '@/lib/supabase';

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size: string) => void;
  update: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('panda-cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('panda-cart', JSON.stringify(items));
  }, [items]);

  const add = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId && i.size === item.size);
      if (exists) return prev.map((i) => i.productId === item.productId && i.size === item.size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, item];
    });
  };

  const remove = (productId: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));

  const update = (productId: string, size: string, qty: number) => {
    if (qty < 1) { remove(productId, size); return; }
    setItems((prev) => prev.map((i) => i.productId === productId && i.size === size ? { ...i, qty } : i));
  };

  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};

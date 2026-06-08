'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
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

async function getUid(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  console.log('Session check:', data.session?.user?.id ?? 'NO SESSION');
  return data.session?.user?.id ?? null;
}

async function saveToSupabase(uid: string, items: CartItem[]) {
  const { error } = await supabase.from('user_carts').upsert(
    { user_id: uid, items, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  );
  if (error) console.error('Cart save error:', error.message);
  else console.log('Cart saved to Supabase:', items.length, 'items');
}

async function loadFromSupabase(uid: string): Promise<CartItem[] | null> {
  const { data, error } = await supabase
    .from('user_carts')
    .select('items')
    .eq('user_id', uid)
    .single();
  if (error) { console.error('Cart load error:', error.message); return null; }
  return data?.items ?? null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load cart on mount
  useEffect(() => {
    (async () => {
      const uid = await getUid();
      if (uid) {
        const remote = await loadFromSupabase(uid);
        if (remote && remote.length > 0) {
          setItems(remote);
          localStorage.setItem('panda-cart', JSON.stringify(remote));
          setReady(true);
          return;
        }
      }
      const local = localStorage.getItem('panda-cart');
      if (local) {
        try { setItems(JSON.parse(local)); } catch (_) {}
      }
      setReady(true);
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.id) {
        const remote = await loadFromSupabase(session.user.id);
        if (remote && remote.length > 0) {
          setItems(remote);
          localStorage.setItem('panda-cart', JSON.stringify(remote));
        }
      } else if (event === 'SIGNED_OUT') {
        setItems([]);
        localStorage.removeItem('panda-cart');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Save cart whenever items change (after initial load)
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem('panda-cart', JSON.stringify(items));
    (async () => {
      const uid = await getUid();
      if (uid) await saveToSupabase(uid, items);
    })();
  }, [items, ready]);

  const add = (item: CartItem) => setItems((prev) => {
    const exists = prev.find((i) => i.productId === item.productId && i.size === item.size);
    if (exists) return prev.map((i) =>
      i.productId === item.productId && i.size === item.size ? { ...i, qty: i.qty + 1 } : i
    );
    return [...prev, item];
  });

  const remove = (productId: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));

  const update = (productId: string, size: string, qty: number) => {
    if (qty < 1) { remove(productId, size); return; }
    setItems((prev) => prev.map((i) =>
      i.productId === productId && i.size === size ? { ...i, qty } : i
    ));
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

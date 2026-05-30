'use client';
import { useState } from 'react';
import Navbar from '@/components/shop/Navbar';
import CartDrawer from '@/components/shop/CartDrawer';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <main>{children}</main>
    </>
  );
}

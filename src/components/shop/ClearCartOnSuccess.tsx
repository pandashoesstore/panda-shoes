'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export default function ClearCartOnSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const { clear, count } = useCart();

  useEffect(() => {
    if (params.get('order') !== 'success') return;
    localStorage.removeItem('panda-cart');
    clear();
    if (count === 0) router.replace('/', { scroll: false });
  }, [params, count, clear, router]);

  return null;
}

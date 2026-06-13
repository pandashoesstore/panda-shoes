'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/supabase';

export default function AddToBagPanel({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [toast, setToast] = useState(false);
  const { add } = useCart();

  const sizes: string[] = Array.isArray(product.sizes) ? product.sizes : [];

  const handleAdd = () => {
    if (!selectedSize) { alert('Please select a size first'); return; }
    add({
      productId: product.id, name: product.name, brand: product.brand,
      price: product.price, size: selectedSize, qty: 1,
      image_url: product.image_url, gender: (product as any).gender,
      category: (product as any).category, deal: (product as any).deal ?? null,
    });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#999', margin: '18px 0 10px' }}>Select Size</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {sizes.map((s) => (
          <button key={s} onClick={() => setSelectedSize(s)}
            style={{
              minWidth: 44, height: 44, padding: '0 10px', borderRadius: 10, cursor: 'pointer',
              border: selectedSize === s ? '2px solid #111' : '1.5px solid #ddd',
              background: selectedSize === s ? '#111' : '#fff',
              color: selectedSize === s ? '#fff' : '#333', fontWeight: 700, fontSize: 15,
            }}>{s}</button>
        ))}
      </div>
      <button onClick={handleAdd}
        style={{
          width: '100%', maxWidth: 380, padding: '16px', borderRadius: 14, border: 'none',
          background: toast ? '#3a7a37' : '#111', color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer',
        }}>
        {toast ? '✓ Added to Bag!' : 'Add to Bag'}
      </button>
    </div>
  );
}

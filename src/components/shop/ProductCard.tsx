'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/supabase';
import styles from './ProductCard.module.css';

const BRAND_LOGOS: Record<string, string> = {
  'Florsheim': 'https://logo.clearbit.com/florsheim.com',
  'Timberland': 'https://logo.clearbit.com/timberland.com',
  'Timberland Pro': 'https://logo.clearbit.com/timberland.com',
  'Skechers': 'https://logo.clearbit.com/skechers.com',
  'Rockport': 'https://logo.clearbit.com/rockport.com',
  'Caterpillar': 'https://logo.clearbit.com/cat.com',
  'Columbia': 'https://logo.clearbit.com/columbia.com',
  'Fila': 'https://logo.clearbit.com/fila.com',
  'Wolverine': 'https://logo.clearbit.com/wolverine.com',
  'K-Swiss': 'https://logo.clearbit.com/kswiss.com',
  'Hush Puppies Kids': 'https://logo.clearbit.com/hushpuppies.com',
  'Perry Ellis': 'https://logo.clearbit.com/perryellis.com',
  'Perry Ellis Kids': 'https://logo.clearbit.com/perryellis.com',
  'US Polo Association': 'https://logo.clearbit.com/uspoloassn.com',
};

const SIZE_MAP: Record<string, string[]> = {
  mens:   ['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13'],
  womens: ['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','11'],
  kids:   ['1','2','3','4','5','6','7','8','9','10','11','12','13','1Y','2Y','3Y'],
};

export default function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [toast, setToast] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { add } = useCart();
  const router = useRouter();

  const sizes = product.sizes?.length ? product.sizes : SIZE_MAP[product.gender] || SIZE_MAP.mens;
  const brandLogo = BRAND_LOGOS[product.brand];

  const handleAdd = () => {
    if (!selectedSize) { alert('Please select a size first'); return; }
    add({ productId: product.id, name: product.name, brand: product.brand, price: product.price, size: selectedSize, qty: 1, image_url: product.image_url, gender: product.gender, category: product.category, deal: product.deal ?? null });
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className={styles.card}>
      {product.is_new && <div className={styles.newBadge}>NEW</div>}
      <div className={styles.imgBox} onClick={() => router.push(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className={styles.productImg} />
        ) : (
          <div className={styles.placeholder}>
            {brandLogo && !logoError ? (
              <img src={brandLogo} alt={product.brand} className={styles.brandLogoLarge} onError={() => setLogoError(true)} />
            ) : (
              <span className={styles.placeholderIcon}>👟</span>
            )}
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.brandRow}>
          {brandLogo && !logoError && (
            <img src={brandLogo} alt={product.brand} className={styles.brandLogoSmall} onError={() => setLogoError(true)} />
          )}
          <span className={styles.brand}>{product.brand}</span>
        </div>
        <div className={styles.name} onClick={() => router.push(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>{product.name}</div>
        <div className={styles.style}>{product.style}</div>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
        <div className={styles.sizeLabel}>Select Size</div>
        <div className={styles.sizes}>
          {sizes.map((s) => (
            <button key={s} className={`${styles.sizeBtn} ${selectedSize === s ? styles.selected : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
          ))}
        </div>
        <button className={`${styles.addBtn} ${toast ? styles.added : ''}`} onClick={handleAdd}>
          {toast ? '✓ Added to Bag!' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
}

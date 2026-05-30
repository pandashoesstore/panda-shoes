import { supabase } from '@/lib/supabase';
import StoreLayout from '@/components/shop/StoreLayout';
import ProductCard from '@/components/shop/ProductCard';
import styles from './shop.module.css';

export const revalidate = 60;

export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('brand');

  const brands = Array.from(new Set((products || []).map((p) => p.brand))).sort();

  return (
    <StoreLayout>
      <div className={styles.shopPage}>
        <div className={styles.shopHeader}>
          <div className="container">
            <p className={styles.eyebrow}>All Brands</p>
            <h1 className={styles.pageTitle}>Our Collection</h1>
            <p className={styles.subtitle}>{brands.length}+ brands · {products?.length || 0} styles</p>
          </div>
        </div>
        <div className="container">
          <div className={styles.brandList}>
            {brands.map((brand) => {
              const brandProducts = (products || []).filter((p) => p.brand === brand);
              return (
                <div key={brand} className={styles.brandSection} id={`brand-${brand.replace(/\s+/g, '-')}`}>
                  <div className={styles.brandHeader}>
                    <h2 className={styles.brandName}>{brand}</h2>
                    <div className={styles.brandDivider} />
                    <span className={styles.brandTag}>{brandProducts[0]?.category}</span>
                  </div>
                  <div className={styles.productGrid}>
                    {brandProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

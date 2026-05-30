import { supabase } from '@/lib/supabase';
import StoreLayout from '@/components/shop/StoreLayout';
import ProductCard from '@/components/shop/ProductCard';
import { notFound } from 'next/navigation';
import styles from '../shop.module.css';

export const revalidate = 60;

const GENDER_LABELS: Record<string, string> = { mens: "Men's", womens: "Women's", kids: "Kids'" };

export async function generateStaticParams() {
  return [{ gender: 'mens' }, { gender: 'womens' }, { gender: 'kids' }];
}

export default async function GenderPage({ params }: { params: { gender: string } }) {
  const { gender } = params;
  if (!['mens', 'womens', 'kids'].includes(gender)) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('gender', gender)
    .eq('is_active', true)
    .order('category');

  const categories = Array.from(new Set((products || []).map((p) => p.category)));
  const label = GENDER_LABELS[gender];

  return (
    <StoreLayout>
      <div className={styles.shopPage}>
        <div className={styles.shopHeader}>
          <div className="container">
            <p className={styles.eyebrow}>{label}</p>
            <h1 className={styles.pageTitle}>{label} <span style={{ fontStyle: 'italic', color: 'var(--grn)' }}>Collection</span></h1>
            <p className={styles.subtitle}>{products?.length || 0} styles available</p>
          </div>
        </div>
        <div className="container">
          {/* Category tabs */}
          <div className={styles.catTabs}>
            <a href={`/shop/${gender}`} className={styles.catTab}>All</a>
            {categories.map((cat) => (
              <a key={cat} href={`#cat-${cat}`} className={styles.catTab} style={{ textTransform: 'capitalize' }}>{cat}</a>
            ))}
          </div>
          <div className={styles.brandList}>
            {categories.map((cat) => {
              const catProducts = (products || []).filter((p) => p.category === cat);
              const brands = [...new Set(catProducts.map((p) => p.brand))];
              return (
                <div key={cat} id={`cat-${cat}`}>
                  <h2 className={styles.catH2} style={{ textTransform: 'capitalize' }}>{cat}</h2>
                  {brands.map((brand) => {
                    const bp = catProducts.filter((p) => p.brand === brand);
                    return (
                      <div key={brand} className={styles.brandSection}>
                        <div className={styles.brandHeader}>
                          <h3 className={styles.brandName}>{brand}</h3>
                          <div className={styles.brandDivider} />
                          <span className={styles.brandTag}>{bp[0]?.style || cat}</span>
                        </div>
                        <div className={styles.productGrid}>
                          {bp.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

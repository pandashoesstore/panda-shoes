import { supabase } from '@/lib/supabase';
import StoreLayout from '@/components/shop/StoreLayout';
import ShopFilter from '@/components/shop/ShopFilter';
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
        <ShopFilter products={products || []} gender={gender} />
      </div>
    </StoreLayout>
  );
}

import { getAdminClient } from '@/lib/supabase';
import ProductForm from './ProductForm';
import styles from '../admin.module.css';

export const revalidate = 0;

export default async function ProductsPage() {
  const supabase = getAdminClient();
  const { data: products } = await supabase.from('products').select('*').order('brand');

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Products</h1>
        <p className={styles.pageSubtitle}>{products?.length || 0} products in catalog</p>
      </div>

      <div className={styles.card} style={{ marginBottom: 32 }}>
        <div className={styles.cardTitle}>Add New Product</div>
        <ProductForm />
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>All Products</div>
        <table className={styles.table}>
          <thead>
            <tr><th>Brand</th><th>Name</th><th>Gender</th><th>Category</th><th>Price</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {(products || []).map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 700 }}>{p.brand}</td>
                <td>{p.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{p.gender}</td>
                <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                <td style={{ fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                <td>
                  <span className={`${styles.badge} ${p.is_active ? styles.badgePaid : styles.badgeCancelled}`}>
                    {p.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <form action={`/api/admin/products/${p.id}`} method="POST">
                    <input type="hidden" name="_method" value="PATCH" />
                    <input type="hidden" name="is_active" value={p.is_active ? 'false' : 'true'} />
                    <button className={styles.actionBtn} type="submit" formAction={`/api/admin/products`}>
                      {p.is_active ? 'Hide' : 'Show'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

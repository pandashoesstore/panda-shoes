import { getAdminClient } from '@/lib/supabase';
import styles from './admin.module.css';

export const revalidate = 30;

export default async function AdminDashboard() {
  const supabase = getAdminClient();

  const [{ data: orders }, { data: products }, { count: productCount }] = await Promise.all([
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('orders').select('total, status'),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ]);

  const totalRevenue = (products || []).filter((o) => o.status === 'paid' || o.status === 'fulfilled').reduce((s, o) => s + (o.total || 0), 0);
  const paidOrders = (products || []).filter((o) => o.status === 'paid').length;
  const pendingOrders = (products || []).filter((o) => o.status === 'pending').length;

  const statusClass: Record<string, string> = {
    pending: styles.badgePending,
    paid: styles.badgePaid,
    fulfilled: styles.badgeFulfilled,
    cancelled: styles.badgeCancelled,
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>Welcome back — here's what's happening at Panda Shoes.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Revenue</div>
          <div className={`${styles.statValue} ${styles.statGreen}`}>${totalRevenue.toFixed(2)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Paid Orders</div>
          <div className={styles.statValue}>{paidOrders}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending Orders</div>
          <div className={styles.statValue}>{pendingOrders}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active Products</div>
          <div className={styles.statValue}>{productCount || 0}</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Recent Orders</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((o) => (
              <tr key={o.id}>
                <td><a href={`/admin/orders/${o.id}`} style={{ color: 'var(--grn)', fontWeight: 600, fontFamily: 'monospace' }}>{o.id.slice(0, 8).toUpperCase()}</a></td>
                <td><div>{o.customer_name}</div><div style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>{o.customer_email}</div></td>
                <td>{Array.isArray(o.items) ? o.items.length : 0} items</td>
                <td style={{ fontWeight: 700 }}>${(o.total || 0).toFixed(2)}</td>
                <td><span className={`${styles.badge} ${statusClass[o.status] || ''}`}>{o.status}</span></td>
                <td style={{ color: 'var(--mid)' }}>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {!orders?.length && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--mid)' }}>No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { getAdminClient } from '@/lib/supabase';
import styles from '../admin.module.css';

export const revalidate = 0;

export default async function OrdersPage() {
  const supabase = getAdminClient();
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

  const statusClass: Record<string, string> = {
    pending: styles.badgePending,
    paid: styles.badgePaid,
    fulfilled: styles.badgeFulfilled,
    cancelled: styles.badgeCancelled,
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Orders</h1>
        <p className={styles.pageSubtitle}>{orders?.length || 0} total orders</p>
      </div>
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((o) => (
              <tr key={o.id}>
                <td>
                  <a href={`/admin/orders/${o.id}`} style={{ color: 'var(--grn)', fontWeight: 700, fontFamily: 'monospace' }}>
                    #{o.id.slice(0, 8).toUpperCase()}
                  </a>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{o.customer_name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--mid)' }}>{o.customer_email}</div>
                </td>
                <td>{Array.isArray(o.items) ? o.items.reduce((s: number, i: any) => s + i.qty, 0) : 0} items</td>
                <td style={{ fontWeight: 700 }}>${(o.total || 0).toFixed(2)}</td>
                <td><span className={`${styles.badge} ${statusClass[o.status] || ''}`}>{o.status}</span></td>
                <td style={{ color: 'var(--mid)', fontSize: '0.82rem' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                <td><a href={`/admin/orders/${o.id}`} className={styles.actionBtn}>View</a></td>
              </tr>
            ))}
            {!orders?.length && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--mid)' }}>No orders yet. Share your store link to start selling!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

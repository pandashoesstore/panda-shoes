import { getAdminClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import OrderActions from './OrderActions';
import styles from '../../admin.module.css';

export const revalidate = 0;

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = getAdminClient();
  const { data: order } = await supabase.from('orders').select('*').eq('id', params.id).single();
  if (!order) notFound();

  const statusClass: Record<string, string> = {
    pending: styles.badgePending, paid: styles.badgePaid,
    fulfilled: styles.badgeFulfilled, cancelled: styles.badgeCancelled,
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <a href="/admin/orders" style={{ color: 'var(--grn)', fontSize: '0.85rem', fontWeight: 600 }}>← Back to Orders</a>
        <h1 className={styles.pageTitle} style={{ marginTop: 8 }}>
          Order #{order.id.slice(0, 8).toUpperCase()}
          <span className={`${styles.badge} ${statusClass[order.status] || ''}`} style={{ marginLeft: 12, fontSize: '0.8rem', verticalAlign: 'middle' }}>{order.status}</span>
        </h1>
        <p className={styles.pageSubtitle}>Placed {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Customer */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Customer</div>
          <p style={{ fontWeight: 700, marginBottom: 4 }}>{order.customer_name}</p>
          <p style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{order.customer_email}</p>
          {order.customer_phone && <p style={{ color: 'var(--mid)', fontSize: '0.85rem' }}>{order.customer_phone}</p>}
          {order.shipping_address && (
            <div style={{ marginTop: 16, padding: '12px', background: 'var(--gry)', borderRadius: 8, fontSize: '0.85rem' }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Ship to:</p>
              <p>{order.shipping_address.line1}</p>
              <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Order Status</div>
          <OrderActions orderId={order.id} currentStatus={order.status} />
        </div>

        {/* Items */}
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardTitle}>Items Ordered</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Brand</th><th>Product</th><th>Size</th><th>Qty</th><th>Price</th><th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(order.items) ? order.items : []).map((item: any, i: number) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{item.brand}</td>
                  <td>{item.name}</td>
                  <td>Size {item.size}</td>
                  <td>×{item.qty}</td>
                  <td>${item.price?.toFixed(2)}</td>
                  <td style={{ fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: 16, paddingTop: 16, borderTop: '2px solid var(--blk)' }}>
            <strong style={{ fontSize: '1.1rem' }}>Total: ${(order.total || 0).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

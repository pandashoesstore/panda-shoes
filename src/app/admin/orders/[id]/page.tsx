import { getAdminClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import OrderActions from './OrderActions';
import styles from '../../admin.module.css';

export const revalidate = 0;

const DELIVERY_LABELS: Record<string, string> = {
  pickup: '🏪 In-Store Pickup',
  local: '🚚 Local Delivery',
  shipping: '📦 Ship to Me',
};

const SHIPPING_LABELS: Record<string, string> = {
  standard: 'USPS Ground Advantage (5–7 days)',
  express: 'USPS Priority Mail (2–3 days)',
  overnight: 'USPS Priority Express (1 day)',
};

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
        </div>

        {/* Actions */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Order Status</div>
          <OrderActions orderId={order.id} currentStatus={order.status} trackingNumber={order.tracking_number || ''} />
        </div>

        {/* Delivery */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Delivery Method</div>
          <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
            {DELIVERY_LABELS[order.delivery_method] || order.delivery_method || '🏪 In-Store Pickup'}
          </p>
          {order.shipping_tier && (
            <p style={{ fontSize: '0.85rem', color: 'var(--mid)' }}>{SHIPPING_LABELS[order.shipping_tier] || order.shipping_tier}</p>
          )}
          {order.delivery_address && (
            <div style={{ marginTop: 12, padding: '12px', background: 'var(--gry)', borderRadius: 8, fontSize: '0.85rem' }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>
                {order.delivery_method === 'local' ? 'Delivery Address:' : 'Ship to:'}
              </p>
              <p>{order.delivery_address.line1}</p>
              <p>{order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zip}</p>
            </div>
          )}
          {order.tracking_number && (
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#f0fff0', borderRadius: 8, fontSize: '0.85rem', border: '1px solid #3a7a37' }}>
              <p style={{ fontWeight: 600, color: '#3a7a37', marginBottom: 2 }}>📦 Tracking Number</p>
              <a href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${order.tracking_number}`} target="_blank" rel="noopener noreferrer" style={{ color: '#3a7a37', fontWeight: 700, fontFamily: 'monospace' }}>
                {order.tracking_number}
              </a>
            </div>
          )}
        </div>

        {/* Order Totals */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Order Breakdown</div>
          <table style={{ width: '100%', fontSize: '0.88rem', borderCollapse: 'collapse' }}>
            <tbody>
              <tr><td style={{ padding: '6px 0', color: 'var(--mid)' }}>Subtotal</td><td style={{ textAlign: 'right', fontWeight: 600 }}>${(order.subtotal || 0).toFixed(2)}</td></tr>
              {order.discount_amount > 0 && (
                <tr><td style={{ padding: '6px 0', color: '#3a7a37' }}>
                  Discount {order.promo_code ? `(${order.promo_code})` : order.deal_applied ? `(${order.deal_applied})` : ''}
                </td><td style={{ textAlign: 'right', color: '#3a7a37', fontWeight: 600 }}>−${(order.discount_amount || 0).toFixed(2)}</td></tr>
              )}
              {order.shipping_cost > 0 && (
                <tr><td style={{ padding: '6px 0', color: 'var(--mid)' }}>Shipping</td><td style={{ textAlign: 'right', fontWeight: 600 }}>${(order.shipping_cost || 0).toFixed(2)}</td></tr>
              )}
              {order.shipping_cost === 0 && (
                <tr><td style={{ padding: '6px 0', color: 'var(--mid)' }}>Shipping</td><td style={{ textAlign: 'right', color: '#3a7a37', fontWeight: 600 }}>Free</td></tr>
              )}
              {order.tax_amount > 0 && (
                <tr><td style={{ padding: '6px 0', color: 'var(--mid)' }}>Tax</td><td style={{ textAlign: 'right', fontWeight: 600 }}>${(order.tax_amount || 0).toFixed(2)}</td></tr>
              )}
              {order.tip_amount > 0 && (
                <tr><td style={{ padding: '6px 0', color: 'var(--mid)' }}>Tip 🙏</td><td style={{ textAlign: 'right', fontWeight: 600 }}>${(order.tip_amount || 0).toFixed(2)}</td></tr>
              )}
              <tr style={{ borderTop: '2px solid var(--blk)' }}>
                <td style={{ padding: '10px 0 0', fontWeight: 800, fontSize: '1rem' }}>Total</td>
                <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '1rem', paddingTop: 10 }}>${(order.total || 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Items */}
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardTitle}>Items Ordered</div>
          <table className={styles.table}>
            <thead>
              <tr><th>Brand</th><th>Product</th><th>Size</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
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
        </div>

      </div>
    </div>
  );
}

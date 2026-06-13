'use client';
import { useState } from 'react';
import styles from '../admin.module.css';

const INITIAL_DEALS = [
  { id: '2for30', active: true, badge: '2 for $30', desc: "Women's comfort sandals, slip-ins · Kids' sandals, Crocs", price: 30 },
  { id: '2for32', active: true, badge: '2 for $32', desc: "Women's sandals", price: 32 },
];

const INITIAL_PROMOS = [
  { id: 'PANDA10', active: true, label: '10% off first order', minOrder: 59.99, discount: '10%', type: 'percent' },
];

export default function DealsPage() {
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [editDeal, setEditDeal] = useState<any>(null);
  const [editPromo, setEditPromo] = useState<any>(null);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Deals & Promotions</h1>
        <p className={styles.pageSubtitle}>Manage active deals and promo codes</p>
      </div>

      {/* DEALS */}
      <div className={styles.card} style={{ marginBottom: 24 }}>
        <div className={styles.cardTitle}>🔥 Active Deals</div>
        <table className={styles.table}>
          <thead>
            <tr><th>Deal</th><th>Description</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {deals.map(d => (
              <tr key={d.id}>
                <td style={{ fontWeight: 800, fontSize: '1rem' }}>{d.badge}</td>
                <td style={{ fontSize: '0.84rem', color: 'var(--mid)' }}>{d.desc}</td>
                <td style={{ fontWeight: 700 }}>${d.price}</td>
                <td>
                  <span className={`${styles.badge} ${d.active ? styles.badgePaid : styles.badgeCancelled}`}>
                    {d.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button className={styles.actionBtn} onClick={() => setEditDeal({...d})}>Edit</button>
                  <button className={styles.actionBtn} style={{ background: d.active ? '#fee' : '#f0fff0', color: d.active ? '#c0392b' : '#3a7a37' }}
                    onClick={() => setDeals(prev => prev.map(x => x.id === d.id ? {...x, active: !x.active} : x))}>
                    {d.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PROMO CODES */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>🎟️ Promo Codes</div>
        <table className={styles.table}>
          <thead>
            <tr><th>Code</th><th>Discount</th><th>Min Order</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {promos.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1rem' }}>{p.id}</td>
                <td>{p.label}</td>
                <td>${p.minOrder.toFixed(2)}</td>
                <td>
                  <span className={`${styles.badge} ${p.active ? styles.badgePaid : styles.badgeCancelled}`}>
                    {p.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button className={styles.actionBtn} onClick={() => setEditPromo({...p})}>Edit</button>
                  <button className={styles.actionBtn} style={{ background: p.active ? '#fee' : '#f0fff0', color: p.active ? '#c0392b' : '#3a7a37' }}
                    onClick={() => setPromos(prev => prev.map(x => x.id === p.id ? {...x, active: !x.active} : x))}>
                    {p.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Deal Modal */}
      {editDeal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.card} style={{ width: 420, maxWidth: '90vw' }}>
            <div className={styles.cardTitle}>Edit Deal — {editDeal.badge}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              <label className={styles.formLabel}>Badge Text
                <input className={styles.formInput} value={editDeal.badge} onChange={e => setEditDeal({...editDeal, badge: e.target.value})} />
              </label>
              <label className={styles.formLabel}>Description
                <input className={styles.formInput} value={editDeal.desc} onChange={e => setEditDeal({...editDeal, desc: e.target.value})} />
              </label>
              <label className={styles.formLabel}>Deal Price ($)
                <input className={styles.formInput} type="number" value={editDeal.price} onChange={e => setEditDeal({...editDeal, price: parseFloat(e.target.value)})} />
              </label>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className={styles.submitBtn} onClick={() => { setDeals(prev => prev.map(x => x.id === editDeal.id ? editDeal : x)); setEditDeal(null); }}>Save</button>
                <button className={styles.actionBtn} onClick={() => setEditDeal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Promo Modal */}
      {editPromo && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.card} style={{ width: 420, maxWidth: '90vw' }}>
            <div className={styles.cardTitle}>Edit Promo — {editPromo.id}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              <label className={styles.formLabel}>Promo Code
                <input className={styles.formInput} value={editPromo.id} onChange={e => setEditPromo({...editPromo, id: e.target.value.toUpperCase()})} />
              </label>
              <label className={styles.formLabel}>Label / Description
                <input className={styles.formInput} value={editPromo.label} onChange={e => setEditPromo({...editPromo, label: e.target.value})} />
              </label>
              <label className={styles.formLabel}>Minimum Order ($)
                <input className={styles.formInput} type="number" value={editPromo.minOrder} onChange={e => setEditPromo({...editPromo, minOrder: parseFloat(e.target.value)})} />
              </label>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className={styles.submitBtn} onClick={() => { setPromos(prev => prev.map(x => x.id === editPromo.id ? editPromo : x)); setEditPromo(null); }}>Save</button>
                <button className={styles.actionBtn} onClick={() => setEditPromo(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

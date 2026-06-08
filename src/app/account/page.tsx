'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import StoreLayout from '@/components/shop/StoreLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './account.module.css';

const SECTIONS = ['orders','profile','addresses','payment','wishlist','sizes','notifications'];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [active, setActive] = useState('orders');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return; }
      setUser(data.user);
      const { data: prof } = await supabase.from('user_profiles').select('*').eq('user_id', data.user.id).single();
      if (prof) setProfile(prof);
      const { data: ords } = await supabase.from('orders').select('*').eq('customer_email', data.user.email).order('created_at', { ascending: false }).limit(10);
      if (ords) setOrders(ords);
    });
  }, []);

  const displayName = profile.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Member';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2);

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    await supabase.from('user_profiles').upsert({ ...profile, user_id: user.id, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  const statusColors: Record<string, string> = {
    paid: styles.statusPaid, pending: styles.statusPending,
    fulfilled: styles.statusFulfilled, cancelled: styles.statusCancelled,
  };

  const DELIVERY_LABELS: Record<string, string> = {
    pickup: 'In-store pickup', local: 'Local delivery', shipping: 'Shipped',
  };

  if (!user) return <StoreLayout><div className={styles.loading}>Loading...</div></StoreLayout>;

  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className={styles.layout}>

          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <div className={styles.profileCard}>
              <div className={styles.avatar}>{initials}</div>
              <div className={styles.profileName}>{displayName}</div>
              <div className={styles.profileEmail}>{user.email}</div>
              <span className={styles.memberBadge}>Panda Club Member</span>
            </div>
            <nav className={styles.sideNav}>
              {[
                { id:'orders', icon:'📦', label:'Orders' },
                { id:'profile', icon:'👤', label:'Profile' },
                { id:'addresses', icon:'📍', label:'Addresses' },
                { id:'sizes', icon:'📏', label:'Size Profile' },
                { id:'notifications', icon:'🔔', label:'Notifications' },
                { id:'payment', icon:'💳', label:'Payment' },
              ].map(s => (
                <button key={s.id} className={`${styles.navItem} ${active === s.id ? styles.navActive : ''}`} onClick={() => setActive(s.id)}>
                  <span>{s.icon}</span>{s.label}
                </button>
              ))}
              <button className={styles.navLogout} onClick={handleLogout}>🚪 Log Out</button>
            </nav>
          </aside>

          {/* MAIN */}
          <main className={styles.main}>

            {/* STATS */}
            <div className={styles.statsRow}>
              <div className={styles.stat}><div className={styles.statNum}>{orders.length}</div><div className={styles.statLabel}>Total orders</div></div>
              <div className={styles.stat}><div className={styles.statNum}>{profile.size_mens || profile.size_womens || '—'}</div><div className={styles.statLabel}>Saved size</div></div>
              <div className={styles.stat}><div className={styles.statNum}>{new Date(user.created_at).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</div><div className={styles.statLabel}>Member since</div></div>
            </div>

            {/* ORDERS */}
            {active === 'orders' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Order history</h2>
                {orders.length === 0 ? (
                  <div className={styles.empty}><p>No orders yet.</p><Link href="/shop" className={styles.shopLink}>Start shopping →</Link></div>
                ) : orders.map(o => (
                  <div key={o.id} className={styles.orderRow}>
                    <div className={styles.orderEmoji}>👟</div>
                    <div className={styles.orderInfo}>
                      <div className={styles.orderItems}>
                        {(Array.isArray(o.items) ? o.items : []).slice(0,2).map((item: any, i: number) => (
                          <span key={i} className={styles.orderItem}>{item.brand} {item.name} (Sz {item.size})</span>
                        ))}
                        {(o.items?.length || 0) > 2 && <span className={styles.orderMore}>+{o.items.length - 2} more</span>}
                      </div>
                      <div className={styles.orderMeta}>
                        {new Date(o.created_at).toLocaleDateString()} · {DELIVERY_LABELS[o.delivery_method] || 'In-store pickup'}
                        {o.tracking_number && <a href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${o.tracking_number}`} target="_blank" rel="noopener noreferrer" className={styles.trackLink}> · Track package →</a>}
                      </div>
                    </div>
                    <span className={`${styles.status} ${statusColors[o.status] || ''}`}>{o.status}</span>
                    <div className={styles.orderTotal}>${(o.total || 0).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}

            {/* PROFILE */}
            {active === 'profile' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Profile</h2>
                <div className={styles.form}>
                  <label className={styles.label}>Full name<input className={styles.input} value={profile.full_name || ''} onChange={e => setProfile({...profile, full_name: e.target.value})} placeholder="Your name" /></label>
                  <label className={styles.label}>Email<input className={styles.input} value={user.email} disabled /></label>
                  <label className={styles.label}>Phone<input className={styles.input} value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="(201) 555-0123" /></label>
                  <button className={styles.saveBtn} onClick={saveProfile} disabled={saving}>{saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save changes'}</button>
                </div>
              </div>
            )}

            {/* ADDRESSES */}
            {active === 'addresses' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Saved address</h2>
                <div className={styles.form}>
                  <label className={styles.label}>Street address<input className={styles.input} value={profile.address_line1 || ''} onChange={e => setProfile({...profile, address_line1: e.target.value})} placeholder="123 Main St" /></label>
                  <div className={styles.row}>
                    <label className={styles.label}>City<input className={styles.input} value={profile.address_city || ''} onChange={e => setProfile({...profile, address_city: e.target.value})} placeholder="Union City" /></label>
                    <label className={styles.label}>ZIP<input className={styles.input} value={profile.address_zip || ''} onChange={e => setProfile({...profile, address_zip: e.target.value})} placeholder="07087" /></label>
                  </div>
                  <label className={styles.label}>State
                    <select className={styles.input} value={profile.address_state || 'NJ'} onChange={e => setProfile({...profile, address_state: e.target.value})}>
                      {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <button className={styles.saveBtn} onClick={saveProfile} disabled={saving}>{saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save address'}</button>
                </div>
              </div>
            )}

            {/* SIZE PROFILE */}
            {active === 'sizes' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Size profile</h2>
                <p className={styles.sectionSub}>Save your sizes so checkout pre-fills automatically.</p>
                <div className={styles.form}>
                  <label className={styles.label}>Men's shoe size
                    <select className={styles.input} value={profile.size_mens || ''} onChange={e => setProfile({...profile, size_mens: e.target.value})}>
                      <option value="">Not set</option>
                      {['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','14','15'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className={styles.label}>Women's shoe size
                    <select className={styles.input} value={profile.size_womens || ''} onChange={e => setProfile({...profile, size_womens: e.target.value})}>
                      <option value="">Not set</option>
                      {['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','12'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className={styles.label}>Width preference
                    <select className={styles.input} value={profile.size_width || ''} onChange={e => setProfile({...profile, size_width: e.target.value})}>
                      <option value="">Not set</option>
                      {['Narrow (AA)','Regular (B/D)','Wide (2E)','Extra Wide (4E)'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <button className={styles.saveBtn} onClick={saveProfile} disabled={saving}>{saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save sizes'}</button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {active === 'notifications' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <p className={styles.sectionSub}>Choose what you want to hear about. Emails will be sent once our email service is fully set up.</p>
                <div className={styles.toggleList}>
                  {[
                    { key:'notif_order_updates', label:'Order updates', sub:'Confirmation, status changes, tracking number' },
                    { key:'notif_deals', label:'Deals & promos', sub:'Exclusive discount codes and limited time offers' },
                    { key:'notif_new_arrivals', label:'New arrivals', sub:'Be the first to know when new styles land' },
                  ].map(n => (
                    <div key={n.key} className={styles.toggleRow}>
                      <div>
                        <div className={styles.toggleLabel}>{n.label}</div>
                        <div className={styles.toggleSub}>{n.sub}</div>
                      </div>
                      <button className={`${styles.toggle} ${profile[n.key] !== false ? styles.toggleOn : ''}`}
                        onClick={() => { setProfile({...profile, [n.key]: profile[n.key] === false ? true : false}); }}>
                        <span className={styles.toggleThumb}/>
                      </button>
                    </div>
                  ))}
                </div>
                <button className={styles.saveBtn} onClick={saveProfile} disabled={saving} style={{marginTop:16}}>{saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save preferences'}</button>
              </div>
            )}

            {/* PAYMENT */}
            {active === 'payment' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment methods</h2>
                <div className={styles.paymentNote}>
                  <span>🔒</span>
                  <div>
                    <p>Your payment info is stored securely by Stripe — we never see your card number.</p>
                    <p>Saved cards coming soon. For now, you can enter your card at checkout.</p>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </StoreLayout>
  );
}

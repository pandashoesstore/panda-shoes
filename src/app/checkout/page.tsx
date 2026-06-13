'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import StoreLayout from '@/components/shop/StoreLayout';
import { loadStripe } from '@stripe/stripe-js';
import { Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import styles from './checkout.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PROMOS: Record<string, { label: string; calc: (sub: number) => number | null }> = {
  'PANDA10': { label: '10% off', calc: (sub) => sub >= 59.99 ? parseFloat((sub * 0.1).toFixed(2)) : null },
};

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Standard Shipping (USPS)', days: '5–7 business days · USPS Ground Advantage', price: 7.99 },
  { id: 'express',  label: 'Express Shipping (USPS)', days: '2–3 business days · USPS Priority Mail', price: 14.99 },
  { id: 'overnight',label: 'Overnight Shipping (USPS)', days: '1 business day · USPS Priority Mail Express', price: 24.99 },
];

const TIP_PRESETS = [1, 2, 5, 10];
// State tax rules for footwear
const STATE_TAX: Record<string, { rate: number; threshold: number | null }> = {
  NJ: { rate: 0.06625, threshold: 110 },  // exempt under $110
  NY: { rate: 0.08875, threshold: 110 },  // exempt under $110
  CT: { rate: 0.0635,  threshold: 50  },  // exempt under $50
  PA: { rate: 0,       threshold: null }, // fully exempt
  DE: { rate: 0,       threshold: null }, // no sales tax
  OR: { rate: 0,       threshold: null }, // no sales tax
  MT: { rate: 0,       threshold: null }, // no sales tax
  NH: { rate: 0,       threshold: null }, // no sales tax
  AK: { rate: 0,       threshold: null }, // no sales tax
  MN: { rate: 0,       threshold: null }, // clothing exempt
  VT: { rate: 0,       threshold: null }, // clothing exempt
  RI: { rate: 0,       threshold: null }, // clothing exempt
  FL: { rate: 0.06,    threshold: null }, // all taxable
  GA: { rate: 0.04,    threshold: null },
  TX: { rate: 0.0625,  threshold: null },
  CA: { rate: 0.0725,  threshold: null },
  IL: { rate: 0.0625,  threshold: null },
  OH: { rate: 0.0575,  threshold: null },
  MI: { rate: 0.06,    threshold: null },
  VA: { rate: 0.053,   threshold: null },
  MD: { rate: 0.06,    threshold: null },
  MA: { rate: 0.0625,  threshold: null },
  NC: { rate: 0.0475,  threshold: null },
  SC: { rate: 0.06,    threshold: null },
  TN: { rate: 0.07,    threshold: null },
  AZ: { rate: 0.056,   threshold: null },
  WA: { rate: 0.065,   threshold: null },
  CO: { rate: 0.029,   threshold: null },
  WI: { rate: 0.05,    threshold: null },
  IN: { rate: 0.07,    threshold: null },
  MO: { rate: 0.04225, threshold: null },
  LA: { rate: 0.0445,  threshold: null },
  AL: { rate: 0.04,    threshold: null },
  MS: { rate: 0.07,    threshold: null },
  AR: { rate: 0.065,   threshold: null },
  KY: { rate: 0.06,    threshold: null },
  WV: { rate: 0.06,    threshold: null },
  NE: { rate: 0.055,   threshold: null },
  KS: { rate: 0.065,   threshold: null },
  IA: { rate: 0.06,    threshold: null },
  ND: { rate: 0.05,    threshold: null },
  SD: { rate: 0.045,   threshold: null },
  WY: { rate: 0.04,    threshold: null },
  NV: { rate: 0.0685,  threshold: null },
  UT: { rate: 0.0485,  threshold: null },
  ID: { rate: 0.06,    threshold: null },
  NM: { rate: 0.05125, threshold: null },
  OK: { rate: 0.045,   threshold: null },
  HI: { rate: 0.04,    threshold: null },
  ME: { rate: 0.055,   threshold: null },
};

function calcTax(items: any[], state: string) {
  const rule = STATE_TAX[state.toUpperCase()];
  if (!rule || rule.rate === 0) return 0;
  return items.reduce((tax, item) => {
    const taxable = rule.threshold === null || item.price >= rule.threshold;
    if (taxable) tax += item.price * item.qty * rule.rate;
    return tax;
  }, 0);
}

function getTaxLabel(state: string) {
  const rule = STATE_TAX[state.toUpperCase()];
  if (!rule || rule.rate === 0) return 'Tax Exempt';
  return 'Sales Tax';
}

export default function CheckoutPage() {
  const { items, total, count, remove } = useCart();
  const [loading, setLoading]   = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', phone: '' });
  const [address, setAddress]   = useState({ line1: '', city: '', state: 'NJ', zip: '' });
  const [delivery, setDelivery] = useState<'pickup' | 'local' | 'shipping'>('pickup');
  const [shippingTier, setShippingTier] = useState(SHIPPING_OPTIONS[0]);
  const [promoCode, setPromoCode]       = useState('');
  const [promoApplied, setPromoApplied] = useState<{ code: string; label: string; amount: number } | null>(null);
  const [promoError, setPromoError]     = useState('');
  const [tip, setTip]           = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<'2for30' | '2for32' | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setIsMember(true);
        setForm(f => ({ ...f, email: data.user!.email || '', name: data.user!.user_metadata?.full_name || data.user!.user_metadata?.name || '' }));
      }
    });
  }, []);

  if (count === 0) return (
    <StoreLayout>
      <div className={styles.empty}>
        <span>🛍️</span><h2>Your bag is empty</h2>
        <a href="/shop" className={styles.shopLink}>Continue Shopping →</a>
      </div>
    </StoreLayout>
  );

  function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    const promo = PROMOS[code];
    if (!promo) { setPromoError('Invalid promo code.'); return; }
    const discount = promo.calc(total);
    if (discount === null) { setPromoError('Minimum order of $59.99 required.'); return; }
    setPromoApplied({ code, label: promo.label, amount: discount });
    setPromoError('');
  }

  // Items that qualify for each deal
  const DEAL_30_KEYWORDS = ['slip-in', 'slip in', 'slipin', 'sandal', 'croc'];
  const DEAL_32_KEYWORDS = ['sandal'];

  function itemQualifies(item: any, deal: '2for30' | '2for32') {
    if (item.deal) return item.deal === deal;
    const combined = ((item.name || '') + ' ' + (item.category || '') + ' ' + (item.gender || '')).toLowerCase();
    if (deal === '2for30') {
      return DEAL_30_KEYWORDS.some(k => combined.includes(k));
    }
    if (deal === '2for32') {
      return DEAL_32_KEYWORDS.some(k => combined.includes(k));
    }
    return false;
  }

  function getDealDiscount(deal: '2for30' | '2for32') {
    const qualifying = items.filter(i => itemQualifies(i, deal));
    if (qualifying.length < 2) return 0;
    const sorted = [...qualifying].sort((a, b) => a.price - b.price);
    const twoCheapest = sorted[0].price + sorted[1].price;
    const dealPrice = deal === '2for30' ? 30 : 32;
    return parseFloat(Math.max(0, twoCheapest - dealPrice).toFixed(2));
  }

  function dealQualifies(deal: '2for30' | '2for32') {
    return items.filter(i => itemQualifies(i, deal)).length >= 2;
  }

  const promoDiscount = promoApplied?.amount ?? 0;
  const dealDiscount  = selectedDeal ? getDealDiscount(selectedDeal) : 0;
  const shippingCost  = delivery === 'shipping' ? shippingTier.price : 0;
  const state         = address.state || 'NJ';
  const tax           = parseFloat(calcTax(items, state).toFixed(2));
  const finalTotal    = parseFloat(Math.max(0, total - promoDiscount - dealDiscount + shippingCost + tax + tip).toFixed(2));

  const handleCheckout = async () => {
    if (!form.name || !form.email) { alert('Please fill in your name and email.'); return; }
    if (delivery === 'local' && !isMember) { alert('Local delivery is for members only. Please sign up first.'); return; }
    if (delivery === 'local' && !address.line1) { alert('Please enter your delivery address.'); return; }
    if (delivery === 'shipping' && !address.line1) { alert('Please enter your shipping address.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items, customer: form, address,
          deliveryMethod: delivery,
          shippingTier: delivery === 'shipping' ? shippingTier.id : null,
          shippingCost,
          tipAmount: tip,
          discountAmount: promoDiscount + dealDiscount,
          taxAmount: tax,
          promoCode: promoApplied?.code || null,
        }),
      });
      const { sessionId, error } = await res.json();
      if (error) throw new Error(error);
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (e: any) {
      alert('Checkout failed: ' + e.message);
    } finally { setLoading(false); }
  };

  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.left}>
              <h1 className={styles.title}>Checkout</h1>

              {/* DELIVERY METHOD */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Delivery Method</h2>
                <div className={styles.deliveryOptions}>
                  {[
                    { id: 'pickup', icon: '🏪', label: 'In-Store Pickup', sub: 'Free · Ready same day' },
                    { id: 'local',  icon: '🚚', label: 'Local Delivery',  sub: isMember ? 'Free · Bergen & Hudson County' : 'Members only — Sign up free' },
                    { id: 'shipping', icon: '📦', label: 'Ship to Me', sub: `From $${SHIPPING_OPTIONS[0].price}` },
                  ].map(opt => (
                    <label key={opt.id} className={`${styles.deliveryCard} ${delivery === opt.id ? styles.deliverySelected : ''} ${opt.id === 'local' && !isMember ? styles.deliveryDisabled : ''}`}>
                      <input type="radio" name="delivery" value={opt.id}
                        disabled={opt.id === 'local' && !isMember}
                        checked={delivery === opt.id}
                        onChange={() => setDelivery(opt.id as any)}
                        style={{display:'none'}} />
                      <span className={styles.deliveryIcon}>{opt.icon}</span>
                      <div>
                        <div className={styles.deliveryLabel}>{opt.label}</div>
                        <div className={styles.deliverySub}>{opt.sub}</div>
                      </div>
                      {delivery === opt.id && <span className={styles.deliveryCheck}>✓</span>}
                    </label>
                  ))}
                </div>
                {delivery === 'pickup' && (
                  <div className={styles.pickupInfo}>
                    <div className={styles.pickupStore}><strong>📍 Panda Shoe Center</strong><br/>4105 Bergenline Ave, Union City NJ 07087<br/>(201) 348-0524</div>
                    <div className={styles.pickupStore}><strong>📍 Panda Shoes</strong><br/>4501 Bergenline Ave, Union City NJ 07087<br/>(201) 319-0251</div>
                  </div>
                )}
                {delivery === 'local' && !isMember && (
                  <div className={styles.memberAlert}>
                    🔒 Local delivery is a free member perk. <a href="/signup">Sign up free →</a>
                  </div>
                )}
                {delivery === 'shipping' && (
                  <div className={styles.shippingTiers}>
                    {SHIPPING_OPTIONS.map(opt => (
                      <label key={opt.id} className={`${styles.tierCard} ${shippingTier.id === opt.id ? styles.tierSelected : ''}`}>
                        <input type="radio" name="tier" checked={shippingTier.id === opt.id} onChange={() => setShippingTier(opt)} style={{display:'none'}} />
                        <div>
                          <div className={styles.tierLabel}>{opt.label}</div>
                          <div className={styles.tierDays}>{opt.days}</div>
                        </div>
                        <div className={styles.tierPrice}>{`$${opt.price.toFixed(2)}`}</div>
                      </label>
                    ))}
                                  </div>
                )}
              </div>

              {/* ADDRESS */}
              {(delivery === 'local' && isMember) || delivery === 'shipping' ? (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>{delivery === 'local' ? 'Delivery Address' : 'Shipping Address'}</h2>
                  <div className={styles.form}>
                    <label className={styles.label}>Street Address *
                      <input className={styles.input} value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})} placeholder="123 Main St" />
                    </label>
                    <div className={styles.row}>
                      <label className={styles.label}>City *
                        <input className={styles.input} value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="Union City" />
                      </label>
                      <label className={styles.label}>ZIP *
                        <input className={styles.input} value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} placeholder="07087" />
                      </label>
                    </div>
                    <label className={styles.label}>State *
                      <select className={styles.input} value={address.state} onChange={e => setAddress({...address, state: e.target.value})}>
                        {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              ) : null}

              {/* CUSTOMER INFO */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Your Information</h2>
                <div className={styles.form}>
                  <label className={styles.label}>Full Name *
                    <input className={styles.input} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith" />
                  </label>
                  <label className={styles.label}>Email Address *
                    <input className={styles.input} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com" />
                  </label>
                  <label className={styles.label}>Phone (optional)
                    <input className={styles.input} type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(201) 555-0123" />
                  </label>
                </div>
              </div>

              {/* PROMO */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Promo Code</h2>
                {promoApplied ? (
                  <div className={styles.promoApplied}>
                    <span>✅ <strong>{promoApplied.code}</strong> — {promoApplied.label} (−${promoApplied.amount.toFixed(2)})</span>
                    <button onClick={() => { setPromoApplied(null); setPromoCode(''); }} className={styles.promoRemove}>Remove</button>
                  </div>
                ) : (
                  <div className={styles.promoRow}>
                    <input className={styles.input} value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} placeholder="e.g. PANDA10" onKeyDown={e => e.key === 'Enter' && applyPromo()} />
                    <button className={styles.promoBtn} onClick={applyPromo}>Apply</button>
                  </div>
                )}
                {promoError && <p className={styles.promoError}>{promoError}</p>}
              </div>

              {/* DEALS */}
              {(dealQualifies('2for30') || dealQualifies('2for32')) && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>🔥 Available Deals</h2>
                  <p className={styles.dealNote}>Select a deal if your cart qualifies.</p>
                  <div className={styles.dealOptions}>
                    {([['2for30','2 for $30','Women\'s slip-ins · Kids\' sandals, Crocs'],
                       ['2for32','2 for $32','Women\'s sandals']] as const).map(([id, badge, desc]) => {
                      const qualifies = dealQualifies(id);
                      return (
                        <label key={id} className={`${styles.dealCard} ${selectedDeal === id ? styles.dealSelected : ''} ${!qualifies ? styles.dealDisabled : ''}`}>
                          <input type="radio" name="deal" checked={selectedDeal === id}
                            disabled={!qualifies}
                            onChange={() => qualifies && setSelectedDeal(selectedDeal === id ? null : id)}
                            style={{display:'none'}} />
                          <div className={styles.dealBadge}>{badge}</div>
                          <div className={styles.dealDesc}>{desc}</div>
                          {!qualifies && <div style={{fontSize:'0.75rem',color:'#aaa',marginTop:'4px'}}>No qualifying items in cart</div>}
                          {qualifies && getDealDiscount(id) > 0 && <div className={styles.dealSavings}>You save ${getDealDiscount(id).toFixed(2)}</div>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TIP */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Add a Tip 🙏</h2>
                <p className={styles.dealNote}>For local delivery drivers — 100% goes to them.</p>
                <div className={styles.tipOptions}>
                  {TIP_PRESETS.map(t => (
                    <button key={t} className={`${styles.tipBtn} ${tip === t ? styles.tipSelected : ''}`}
                      onClick={() => { setTip(tip === t ? 0 : t); setCustomTip(''); }}>${t}</button>
                  ))}
                  <input className={styles.tipCustom} type="number" min="0" placeholder="Custom $" value={customTip}
                    onChange={e => { setCustomTip(e.target.value); setTip(parseFloat(e.target.value) || 0); }} />
                </div>
              </div>

              <div className={styles.secureNote}>🔒 Payment processed securely by Stripe — we never see your card number.</div>
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className={styles.right}>
              <div className={styles.summary}>
                <h2 className={styles.sectionTitle}>Order Summary</h2>
                <div className={styles.summaryItems}>
                  {items.map(item => (
                    <div key={`${item.productId}-${item.size}`} className={styles.summaryItem} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                      <button onClick={() => remove(item.productId, item.size)} style={{background:'none',border:'none',cursor:'pointer',color:'#ff4438',padding:'4px',flexShrink:0,display:'flex'}}>
                        <Trash2 size={22}/>
                      </button>
                      <div className={styles.summaryEmoji} style={{flexShrink:0}}>👟</div>
                      <div className={styles.summaryInfo} style={{flex:1}}>
                        <div className={styles.summaryBrand}>{item.brand}</div>
                        <div className={styles.summaryName}>{item.name}</div>
                        <div className={styles.summaryDetail}>Size {item.size} · Qty {item.qty}</div>
                      </div>
                      <div className={styles.summaryPrice}>${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryLine}><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                {promoDiscount > 0 && <div className={`${styles.summaryLine} ${styles.discount}`}><span>Promo ({promoApplied?.code})</span><span>−${promoDiscount.toFixed(2)}</span></div>}
                {dealDiscount > 0 && <div className={`${styles.summaryLine} ${styles.discount}`}><span>Deal discount</span><span>−${dealDiscount.toFixed(2)}</span></div>}
                <div className={styles.summaryLine}><span>Shipping</span><span>{shippingCost === 0 ? (delivery === 'pickup' ? 'Free (Pickup)' : delivery === 'local' ? 'Free (Member)' : 'FREE') : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className={styles.summaryLine}><span>Tax ({getTaxLabel(address.state || 'NJ')})</span><span>{tax > 0 ? `$${tax.toFixed(2)}` : 'Exempt'}</span></div>
                {tip > 0 && <div className={styles.summaryLine}><span>Tip 🙏</span><span>+${tip.toFixed(2)}</span></div>}
                <div className={`${styles.summaryLine} ${styles.summaryTotal}`}><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
                <button className={styles.payBtn} onClick={handleCheckout} disabled={loading}>
                  {loading ? 'Redirecting...' : `Pay $${finalTotal.toFixed(2)} with Stripe →`}
                </button>
                <div className={styles.stripeLogos}><span>Powered by</span><strong> Stripe</strong><span> · Visa · Mastercard · Amex · Apple Pay</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

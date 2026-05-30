'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import StoreLayout from '@/components/shop/StoreLayout';
import { loadStripe } from '@stripe/stripe-js';
import styles from './checkout.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, total, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  if (count === 0) {
    return (
      <StoreLayout>
        <div className={styles.empty}>
          <span>🛍️</span>
          <h2>Your bag is empty</h2>
          <a href="/shop" className={styles.shopLink}>Continue Shopping →</a>
        </div>
      </StoreLayout>
    );
  }

  const handleCheckout = async () => {
    if (!form.name || !form.email) { alert('Please fill in your name and email.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: form }),
      });
      const { sessionId, error } = await res.json();
      if (error) throw new Error(error);
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (e: any) {
      alert('Checkout failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className="container">
          <div className={styles.layout}>
            {/* LEFT: Customer Info */}
            <div className={styles.left}>
              <h1 className={styles.title}>Checkout</h1>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Your Information</h2>
                <div className={styles.form}>
                  <label className={styles.label}>Full Name *
                    <input className={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
                  </label>
                  <label className={styles.label}>Email Address *
                    <input className={styles.input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
                  </label>
                  <label className={styles.label}>Phone (optional)
                    <input className={styles.input} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(201) 555-0123" />
                  </label>
                </div>
              </div>
              <div className={styles.secureNote}>
                🔒 Your payment info is collected securely by Stripe — we never see your card number.
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className={styles.right}>
              <div className={styles.summary}>
                <h2 className={styles.sectionTitle}>Order Summary</h2>
                <div className={styles.summaryItems}>
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className={styles.summaryItem}>
                      <div className={styles.summaryEmoji}>👟</div>
                      <div className={styles.summaryInfo}>
                        <div className={styles.summaryBrand}>{item.brand}</div>
                        <div className={styles.summaryName}>{item.name}</div>
                        <div className={styles.summaryDetail}>Size {item.size} · Qty {item.qty}</div>
                      </div>
                      <div className={styles.summaryPrice}>${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryTotal}>
                  <span>Subtotal</span><span>${total.toFixed(2)}</span>
                </div>
                <p className={styles.taxNote}>Taxes & shipping calculated by Stripe at next step</p>
                <button className={styles.payBtn} onClick={handleCheckout} disabled={loading}>
                  {loading ? 'Redirecting...' : `Pay with Stripe →`}
                </button>
                <div className={styles.stripeLogos}>
                  <span>Powered by</span>
                  <strong>Stripe</strong>
                  <span>· Visa · Mastercard · Amex · Apple Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

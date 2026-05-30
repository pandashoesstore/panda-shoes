'use client';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import StoreLayout from '@/components/shop/StoreLayout';
import Link from 'next/link';
import styles from './success.module.css';

export default function SuccessPage() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, []); // eslint-disable-line

  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.icon}>🎉</div>
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.sub}>Thank you for shopping with Panda Shoes. You'll receive a confirmation email shortly.</p>
          <div className={styles.info}>
            <p>📦 We'll prepare your order and contact you about pickup or shipping.</p>
            <p>📧 Check your email for your order details.</p>
            <p>📞 Questions? Call us at (201) 555-0123</p>
          </div>
          <Link href="/shop" className={styles.btn}>Continue Shopping</Link>
        </div>
      </div>
    </StoreLayout>
  );
}

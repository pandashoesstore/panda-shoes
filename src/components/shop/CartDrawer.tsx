'use client';
import { useCart } from '@/lib/cart-context';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, update, total, count } = useCart();
  const router = useRouter();

  const goCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.drawer} ${open ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.title}>
            <ShoppingBag size={20} />
            <span>Your Bag</span>
            {count > 0 && <span className={styles.countBadge}>{count}</span>}
          </div>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛍️</span>
              <p>Your bag is empty.</p>
              <p className={styles.emptyHint}>Add some panda-approved kicks!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className={styles.item}>
                <div className={styles.itemEmoji}>👟</div>
                <div className={styles.itemInfo}>
                  <div className={styles.itemBrand}>{item.brand}</div>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemSize}>Size {item.size}</div>
                  <div className={styles.itemQtyRow}>
                    <button onClick={() => update(item.productId, item.size, item.qty - 1)}><Minus size={12} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => update(item.productId, item.size, item.qty + 1)}><Plus size={12} /></button>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</div>
                  <button className={styles.removeBtn} onClick={() => remove(item.productId, item.size)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className={styles.taxNote}>Taxes & shipping calculated at checkout</p>
            <button className={styles.checkoutBtn} onClick={goCheckout}>
              Checkout → ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

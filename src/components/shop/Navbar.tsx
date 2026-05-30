'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Navbar.module.css';

const GENDERS = [
  { key: 'mens', label: "Men's" },
  { key: 'womens', label: "Women's" },
  { key: 'kids', label: "Kids'" },
];

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className={styles.topbar}>
        <span>📍 4105 Bergenline Ave · (201) 348-0524</span>
        <span>|</span>
        <span>📍 4501 Bergenline Ave · (201) 319-0251</span>
        <span>|</span>
        <span>⏰ Mon-Wed 10am-7pm · Thu-Sat 10am-8pm · Sun 11am-6pm</span>
      </div>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image src="/panda-logo.jpeg" alt="Panda Shoes" width={58} height={58} className={styles.logoImg} priority />
          </Link>
          <div className={styles.links}>
            {GENDERS.map((g) => (
              <Link key={g.key} href={`/shop/${g.key}`} className={styles.navLink}>
                {g.label}
              </Link>
            ))}
            <Link href="/shop" className={styles.navLink}>All Brands</Link>
          </div>
          <div className={styles.right}>
            <button className={styles.cartBtn} onClick={onCartOpen}>
              <ShoppingBag size={18} />
              Bag
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </button>
            <button className={styles.burger} onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {GENDERS.map((g) => (
            <Link key={g.key} href={`/shop/${g.key}`} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {g.label}
            </Link>
          ))}
          <Link href="/shop" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>All Brands</Link>
        </div>
      )}
    </>
  );
}

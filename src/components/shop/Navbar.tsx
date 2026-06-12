'use client';
import Link from 'next/link';
import SearchBar from './SearchBar';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './Navbar.module.css';

const GENDERS = [
  { key: 'mens', label: "Men's" },
  { key: 'womens', label: "Women's" },
  { key: 'kids', label: "Kids'" },
];

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    // Listen for login/logout changes in real time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const displayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || 'Account';

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image src="/panda-logo.png" alt="Panda Shoes" width={58} height={58} className={styles.logoImg} priority />
          </Link>

          <div className={styles.links}>
            {GENDERS.map((g) => (
              <Link key={g.key} href={`/shop/${g.key}`} className={styles.navLink}>
                {g.label}
              </Link>
            ))}
            <Link href="/brands" className={styles.navLink}>All Brands</Link>
            <Link href="/membership" className={styles.navLink}>Membership</Link>
            <SearchBar />
          </div>

          <div className={styles.right}>
            {user ? (
              <>
                <a href='/account' style={{textDecoration:'none'}} className={styles.userGreet}>
                  <User size={15} /> Hi, {displayName.split(' ')[0]}
                </a>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  <LogOut size={14} /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.authLink}>Log In</Link>
                <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
              </>
            )}
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
          <SearchBar onNavigate={() => setMobileOpen(false)} />
          <Link href="/brands" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>All Brands</Link>
          {user ? (
            <>
              <span className={styles.mobileLink}>Hi, {displayName.split(' ')[0]}</span>
              <button className={styles.mobileLink} onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Log In</Link>
              <Link href="/signup" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

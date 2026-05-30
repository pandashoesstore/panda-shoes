import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>🐼 Panda Admin</div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navItem}>📊 Dashboard</Link>
          <Link href="/admin/orders" className={styles.navItem}>📦 Orders</Link>
          <Link href="/admin/products" className={styles.navItem}>👟 Products</Link>
          <div className={styles.navDivider} />
          <Link href="/" className={styles.navItem}>← Back to Store</Link>
        </nav>
      </aside>
      <main className={styles.adminMain}>{children}</main>
    </div>
  );
}

'use client';
import StoreLayout from '@/components/shop/StoreLayout';
import Link from 'next/link';
import styles from './membership.module.css';

export default function MembershipPage() {
  const perks = [
    { icon: '💳', title: 'Store Credit & Exchange', desc: 'Not the perfect fit? Members get store credit or a free exchange on eligible returns — no hassle.' },
    { icon: '👟', title: '60-Day Wear Test', desc: "Wear them for real. If they're not right within 60 days, bring them back for store credit or an exchange." },
    { icon: '🚚', title: 'Free Local Delivery', desc: 'Free delivery throughout Bergen & Hudson County — about 40 minutes from our Union City stores.' },
  ];
  const details = [
    { num: '01', title: 'Store Credit & Exchange', desc: 'Eligible returns come back as store credit or an exchange — your choice. (Members do not receive cash refunds; benefit applies to store credit and exchanges only.)' },
    { num: '02', title: '60-Day Wear Test', desc: 'Members have 60 days from purchase to bring shoes back if they are not the right fit. Returns within the wear test are issued as store credit or exchange only. Shoes should be in clean, wearable condition.' },
    { num: '03', title: 'Delivery', desc: 'Members get free local delivery within Bergen County and Hudson County. For orders outside the local zone, standard shipping is calculated at checkout and paid by the customer.' },
  ];

  return (
    <StoreLayout>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.badge}>🐼 Panda Club · Free to Join</div>
          <h1 className={styles.heroTitle}>Become a <em>Panda Member</em></h1>
          <p className={styles.heroSub}>Join free and unlock store credit, easy exchanges, a 60-day wear test, and free local delivery across Bergen &amp; Hudson County.</p>
          <div className={styles.heroCtas}>
            <Link href="/signup" className={styles.btnPrimary}>Sign Up Free</Link>
            <Link href="/login" className={styles.btnSecondary}>Log In →</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.eyebrow}>Member Benefits</p>
          <h2 className={styles.title}>Why Join <em>Panda Club</em></h2>
          <div className={styles.perkGrid}>
            {perks.map((p) => (
              <div key={p.title} className={styles.perkCard}>
                <span className={styles.perkIcon}>{p.icon}</span>
                <div className={styles.perkTitle}>{p.title}</div>
                <div className={styles.perkDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.eyebrow}>The Details</p>
          <h2 className={styles.title}>How It <em>Works</em></h2>
          <div className={styles.detailList}>
            {details.map((d) => (
              <div key={d.num} className={styles.detailCard}>
                <div className={styles.detailNum}>{d.num}</div>
                <div>
                  <div className={styles.detailTitle}>{d.title}</div>
                  <div className={styles.detailDesc}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className={styles.eyebrow}>Delivery Zones</p>
          <h2 className={styles.title}>Where We <em>Deliver Free</em></h2>
          <div className={styles.zoneGrid}>
            <div className={`${styles.zone} ${styles.zoneFree}`}>
              <div className={styles.zoneLabel}>Local Zone</div>
              <div className={styles.zoneBig}>FREE for Members</div>
              <div className={styles.zoneText}>📍 Bergen County, NJ<br />📍 Hudson County, NJ</div>
              <div className={styles.zoneText}>~40 minutes from our Union City stores.</div>
            </div>
            <div className={`${styles.zone} ${styles.zonePaid}`}>
              <div className={styles.zoneLabel}>Everywhere Else</div>
              <div className={styles.zoneBig}>Shipping at Checkout</div>
              <div className={styles.zoneText}>Shipping is calculated at checkout and paid by the customer. Fast, tracked delivery via USPS.</div>
              <div className={styles.zoneText}>Tip: pick up free at either Union City location anytime.</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: '#0a1a0a', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', fontWeight: 700 }}>
          Membership is free. Benefits apply to eligible items in clean, wearable condition, as store credit or exchange only (no cash refunds). Free local delivery applies to Bergen and Hudson County. © {new Date().getFullYear()} Panda Shoes.
        </p>
      </footer>
    </StoreLayout>
  );
}

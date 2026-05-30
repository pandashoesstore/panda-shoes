'use client';
import StoreLayout from '@/components/shop/StoreLayout';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const genders = [
    { key: 'mens', label: "Men's", desc: 'Dress shoes, boots, sneakers & casual', emoji: '👞', bg: 'mens' },
    { key: 'womens', label: "Women's", desc: 'Heels, sandals, boots & comfort styles', emoji: '👠', bg: 'womens' },
    { key: 'kids', label: "Kids'", desc: 'Sneakers, character shoes & dress styles', emoji: '👟', bg: 'kids' },
  ];

  const features = [
    { icon: '📍', title: 'Two Locations', desc: '4105 & 4501 Bergenline Ave, Union City NJ' },
    { icon: '🏠', title: 'Family Owned', desc: 'Proudly serving Union City families for years' },
    { icon: '👟', title: '40+ Brands', desc: "Men's, women's & kids' styles for every occasion" },
    { icon: '💰', title: 'Best Prices', desc: 'Quality footwear at prices the whole family can afford' },
  ];

  const topBrands = [
    { name: 'Timberland', cat: 'Boots', logo: 'https://logo.clearbit.com/timberland.com' },
    { name: 'Skechers', cat: 'Sport & Comfort', logo: 'https://logo.clearbit.com/skechers.com' },
    { name: 'Fila', cat: 'Sport', logo: 'https://logo.clearbit.com/fila.com' },
    { name: 'Caterpillar', cat: 'Work Boots', logo: 'https://logo.clearbit.com/cat.com' },
    { name: 'Disney', cat: "Kids' Character", logo: null },
    { name: 'Nickelodeon', cat: "Kids' Character", logo: null },
    { name: 'Stacy Adams', cat: "Men's Dress", logo: null },
    { name: 'Florsheim', cat: "Men's Dress", logo: 'https://logo.clearbit.com/florsheim.com' },
    { name: 'Wolverine', cat: 'Work Boots', logo: 'https://logo.clearbit.com/wolverine.com' },
    { name: 'K-Swiss', cat: 'Tennis & Sport', logo: 'https://logo.clearbit.com/kswiss.com' },
    { name: 'Rockport', cat: "Men's Dress", logo: 'https://logo.clearbit.com/rockport.com' },
    { name: 'Josmo', cat: 'Kids', logo: null },
  ];

  const tickerBrands = ['Florsheim', 'Timberland', 'Skechers', 'Rockport', 'Caterpillar', 'Columbia', 'Fila', 'Stacy Adams', 'Wolverine', 'K-Swiss', 'Pierre Dumas', 'Josmo', 'Nunn Bush', 'Easy Street', 'Spring Step', 'Life Stride', 'Patrick Ewing', 'Hush Puppies'];

  return (
    <StoreLayout>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroPattern} />
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>🐼 Union City&apos;s #1 Shoe Store</div>
            <h1 className={styles.heroTitle}>
              Every Step<br />
              <em>Starts</em> With<br />
              <span>Panda</span> Shoes
            </h1>
            <p className={styles.heroSub}>
              Premium footwear for the whole family — 40+ top brands, hundreds of styles, two convenient locations on Bergenline Ave.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/shop" className={styles.btnPrimary}>Shop All Brands</Link>
              <Link href="/shop" className={styles.btnSecondary}>See What&apos;s New →</Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>40+</div>
                <div className={styles.statLabel}>Brands</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>2</div>
                <div className={styles.statLabel}>Locations</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>4.4★</div>
                <div className={styles.statLabel}>Google Rating</div>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroLogoWrap}>
              <Image src="/panda-logo.jpeg" alt="Panda Shoes" width={380} height={380} className={styles.heroLogo} priority />
              <div className={`${styles.heroBubble} ${styles.heroBubble1}`}>🔥 New Arrivals!</div>
              <div className={`${styles.heroBubble} ${styles.heroBubble2}`}>⭐ 40+ Brands</div>
              <div className={`${styles.heroBubble} ${styles.heroBubble3}`}>👟 All Sizes</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {[...tickerBrands, ...tickerBrands].map((b, i) => (
            <span key={i} className={styles.tickerItem}>✦ {b}</span>
          ))}
        </div>
      </div>

      {/* SHOP BY GENDER */}
      <section className={styles.genderSection}>
        <div className="container">
          <p className={styles.sectionEyebrow}>Shop by Category</p>
          <h2 className={styles.sectionTitle}>Find Your <em>Perfect Fit</em></h2>
          <div className={styles.genderGrid}>
            {genders.map((g) => (
              <Link key={g.key} href={`/shop/${g.key}`} className={styles.genderCard}>
                <div className={`${styles.genderBg} ${styles[g.bg as keyof typeof styles]}`}>
                  {g.emoji}
                </div>
                <div className={styles.genderOverlay} />
                <div className={styles.genderInfo}>
                  <div className={styles.genderEmoji}>{g.emoji}</div>
                  <div className={styles.genderLabel}>{g.label}</div>
                  <div className={styles.genderDesc}>{g.desc}</div>
                  <div className={styles.genderArrow}>Shop Now →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      <section className={styles.brandsSection}>
        <div className="container">
          <p className={styles.sectionEyebrow}>Our Brands</p>
          <h2 className={styles.sectionTitle}>40+ <em>Top Brands</em></h2>
          <div className={styles.brandsGrid}>
            {topBrands.map((b) => (
              <Link key={b.name} href={`/shop`} className={styles.brandCard}>
                {b.logo ? (
                  <img src={b.logo} alt={b.name} className={styles.brandLogoImg} onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                ) : (
                  <div className={styles.brandLogoEmoji}>👟</div>
                )}
                <div className={styles.brandCardName}>{b.name}</div>
                <div className={styles.brandCardCat}>{b.cat}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureItem}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className={styles.locationsSection}>
        <div className="container">
          <p className={styles.sectionEyebrow}>Visit Us</p>
          <h2 className={styles.sectionTitle}>Two <em>Locations</em></h2>
          <div className={styles.locGrid}>
            {[
              { num: '01', name: 'Panda Shoe Center', addr: '4105 Bergenline Ave', city: 'Union City, NJ 07087', phone: '(201) 348-0524' },
              { num: '02', name: 'Panda Shoes', addr: '4501 Bergenline Ave', city: 'Union City, NJ 07087', phone: '(201) 319-0251' },
            ].map((loc) => (
              <div key={loc.num} className={styles.locCard}>
                <div className={styles.locNum}>{loc.num}</div>
                <div className={styles.locName}>{loc.name}</div>
                <div className={styles.locDetail}>
                  <span className={styles.locIcon}>📍</span>
                  <span className={styles.locText}>{loc.addr}<br />{loc.city}</span>
                </div>
                <div className={styles.locDetail}>
                  <span className={styles.locIcon}>📞</span>
                  <span className={`${styles.locText} ${styles.locPhone}`}>{loc.phone}</span>
                </div>
                <div className={styles.locHours}>
                  <div className={styles.locHoursTitle}>Store Hours</div>
                  <div className={styles.locHourRow}><span className={styles.locHourDay}>Mon – Wed</span><span className={styles.locHourTime}>10am – 7pm</span></div>
                  <div className={styles.locHourRow}><span className={styles.locHourDay}>Thu – Sat</span><span className={styles.locHourTime}>10am – 8pm</span></div>
                  <div className={styles.locHourRow}><span className={styles.locHourDay}>Sunday</span><span className={styles.locHourTime}>11am – 6pm</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0a1a0a', padding: '40px 0', textAlign: 'center' }}>
        <Image src="/panda-logo.jpeg" alt="Panda Shoes" width={80} height={80} style={{ margin: '0 auto 16px', borderRadius: '50%' }} />
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', fontWeight: 700 }}>
          © {new Date().getFullYear()} Panda Shoes · Union City, NJ · All Rights Reserved
        </p>
      </footer>
    </StoreLayout>
  );
}

'use client';
import StoreLayout from '@/components/shop/StoreLayout';
import CategoryCards from '@/components/CategoryCards';
import { useCart } from '@/lib/cart-context';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import DealsSection from '@/components/shop/DealsSection';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const { clear } = useCart();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('order') === 'success') {
      clear();
    }
  }, []);
  const genders = [
    { key: 'mens', label: "Men's", desc: 'Dress shoes, boots, sneakers & casual', emoji: '\u{1F45E}', bg: 'mens' },
    { key: 'womens', label: "Women's", desc: 'Heels, sandals, boots & comfort styles', emoji: '\u{1F460}', bg: 'womens' },
    { key: 'kids', label: "Kids'", desc: 'Sneakers, character shoes & dress styles', emoji: '\u{1F45F}', bg: 'kids' },
  ];

  const topBrands = [
    { name: 'Timberland', cat: 'Boots', logo: '/timberland-logo.png' },
    { name: 'Skechers', cat: 'Sport & Comfort', logo: '/skechers-logo.png' },
    { name: 'Fila', cat: 'Sport', logo: '/fila-logo.png' },
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
            <div className={styles.heroBadge}>{'\u{1F43C}'} Union City&apos;s #1 Shoe Store</div>
            <h1 className={styles.heroTitle}>
              Every Step<br />
              <em>Starts</em> With<br />
              <span>Panda</span> Shoes
            </h1>
            <p className={styles.heroSub}>
              Premium footwear for the whole family &mdash; 40+ top brands, hundreds of styles, two convenient locations on Bergenline Ave.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/shop" className={styles.btnPrimary}>Shop All Brands</Link>
              <Link href="/shop" className={styles.btnSecondary}>See What&apos;s New &rarr;</Link>
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
                <div className={styles.statNum}>4.4{'\u2605'}</div>
                <div className={styles.statLabel}>Avg Google Rating</div>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroLogoWrap}>
              <Image src="/panda-logo.png" alt="Panda Shoes" width={380} height={380} className={styles.heroLogo} priority />
              <div className={`${styles.heroBubble} ${styles.heroBubble1}`}>{'\u{1F525}'} New Arrivals!</div>
              <div className={`${styles.heroBubble} ${styles.heroBubble2}`}>{'\u2B50'} 40+ Brands</div>
              <div className={`${styles.heroBubble} ${styles.heroBubble3}`}>{'\u{1F45F}'} All Sizes</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className={styles.ticker}>
        <div className={styles.tickerInner}>
          {[...tickerBrands, ...tickerBrands].map((b, i) => (
            <span key={i} className={styles.tickerItem}>{'\u2726'} {b}</span>
          ))}
        </div>
      </div>

      <DealsSection />
      <CategoryCards />

      {/* TOP BRANDS */}
      <section className={styles.brandsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}><em>Top Brands</em></h2>
          <div className={styles.featuredBrands}>
            {[
              { name: 'Skechers', logo: '/skechers-logo.png' },
              { name: 'Timberland', logo: '/timberland-logo.png' },
              { name: 'Columbia', logo: '/columbia-logo.png' },
              { name: 'Fila', logo: '/fila-logo.png' },
            ].map((b) => (
              <Link key={b.name} href="/shop" className={styles.featuredBrandLink}>
                <img src={b.logo} alt={b.name} className={styles.featuredLogo} />
              </Link>
            ))}
          </div>
          <div className={styles.seeAllWrap}>
            <Link href="/brands" className={styles.seeAllBtn}>See All 40+ Brands &rarr;</Link>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <p className={styles.sectionEyebrow}>Customer Love</p>
          <h2 className={styles.sectionTitle}>What Our <em>Customers</em> Say</h2>
          <div className={styles.reviewsGrid}>
            {[
              { name: 'Gusbaker8', text: 'Very good place, the service is good, the girls who work there are very friendly from the moment you arrive, and the prices are reasonable.', date: 'Google Review' },
              { name: 'Gearo Mortem', text: 'They have all the shoes you will need at the best possible price.', date: 'Google Review' },
              { name: 'Pedro Sho', text: 'Best price for Columbia boots in the area.', date: 'Google Review' },
              { name: 'Miguel Gonzalez', text: 'Variety in tennis shoes and sneakers.', date: 'Google Review' },
              { name: 'Laura Matos', text: 'The store manager was very attentive and courteous.', date: 'Google Review' },
              { name: 'Monica Jimenez', text: 'It is a good place to buy shoes at a good price.', date: 'Google Review' },
              { name: 'Lici Lopez', text: 'I made a very good purchase there.', date: 'Google Review' },
            ].map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.reviewStars}>{'\u2B50\u2B50\u2B50\u2B50\u2B50'}</div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <div className={styles.reviewAuthor}>
                  <div className={styles.reviewAvatar}>{r.name[0]}</div>
                  <div>
                    <div className={styles.reviewName}>{r.name}</div>
                    <div className={styles.reviewDate}>{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.reviewsBadge} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <a href="https://www.google.com/search?q=Panda+Shoe+Center+4105+Bergenline+Union+City+NJ+reviews" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'10px'}}>
              <span className={styles.reviewsBadgeStars}>{'\u2B50'} 4.4</span>
              <span>Panda Shoe Center &middot; 4105 Bergenline Ave &middot; See reviews &rarr;</span>
            </a>
            <a href="https://www.google.com/search?q=Panda+Shoes+4501+Bergenline+Union+City+NJ+reviews" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'10px'}}>
              <span className={styles.reviewsBadgeStars}>{'\u2B50'} 4.3</span>
              <span>Panda Shoes &middot; 4501 Bergenline Ave &middot; See reviews &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <p className={styles.sectionEyebrow}>About Us</p>
              <h2 className={styles.sectionTitle}>Family Owned <em>Since 1984</em></h2>
              <p className={styles.aboutText}>
                For over 40 years, Panda Shoes has been a trusted name on Bergenline Avenue. What started as a single family-owned shop has grown into two locations serving Union City and the surrounding community with quality footwear at affordable prices.
              </p>
              <p className={styles.aboutText}>
                We carry 40+ trusted brands including Skechers, Timberland, Columbia, Fila, Caterpillar, Wolverine, and many more &mdash; from work boots and everyday sneakers to dress shoes and kids&apos; styles. Whatever your family needs, we&apos;ve got it.
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.aboutStat}>
                  <div className={styles.aboutStatNum}>40+</div>
                  <div className={styles.aboutStatLabel}>Years in Business</div>
                </div>
                <div className={styles.aboutStat}>
                  <div className={styles.aboutStatNum}>2</div>
                  <div className={styles.aboutStatLabel}>Locations</div>
                </div>
                <div className={styles.aboutStat}>
                  <div className={styles.aboutStatNum}>40+</div>
                  <div className={styles.aboutStatLabel}>Brands</div>
                </div>
                <div className={styles.aboutStat}>
                  <div className={styles.aboutStatNum}>4.4{'\u2605'}</div>
                  <div className={styles.aboutStatLabel}>Google Rating</div>
                </div>
              </div>
            </div>
            <div className={styles.aboutRight}>
              <Image src="/panda-logo.png" alt="Panda Shoes" width={300} height={300} className={styles.aboutLogo} />
            </div>
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
              { num: '01', name: 'Panda Shoe Center', addr: '4105 Bergenline Ave', city: 'Union City, NJ 07087', rating: '4.4', phone: '(201) 348-0524', map: 'https://maps.google.com/maps?q=4105+Bergenline+Ave+Union+City+NJ+07087&t=&z=16&ie=UTF8&iwloc=&output=embed' },
              { num: '02', name: 'Panda Shoes', addr: '4501 Bergenline Ave', city: 'Union City, NJ 07087', rating: '4.3', phone: '(201) 319-0251', map: 'https://maps.google.com/maps?q=4501+Bergenline+Ave+Union+City+NJ+07087&t=&z=16&ie=UTF8&iwloc=&output=embed' },
            ].map((loc) => (
              <div key={loc.num} className={styles.locCard}>
                <div className={styles.locNum}>{loc.num}</div>
                <div className={styles.mapContainer}>
                  <iframe src={loc.map} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <div className={styles.mapInfoCard}>
                    <div className={styles.mapInfoName}>{loc.name}</div>
                    <div className={styles.mapInfoAddr}>{loc.addr}<br />{loc.city}</div>
                    <div className={styles.mapInfoRating}>
                      <span className={styles.mapInfoStar}>{'\u2605'}</span> {loc.rating}
                    </div>
                  </div>
                </div>
                <div className={styles.locFooter}>
                  <div className={styles.locHours}>
                    <div className={styles.locHoursTitle}>Store Hours</div>
                    <div className={styles.locHourRow}><span className={styles.locHourDay}>Mon &ndash; Wed</span><span className={styles.locHourTime}>10am &ndash; 7pm</span></div>
                    <div className={styles.locHourRow}><span className={styles.locHourDay}>Thu &ndash; Sat</span><span className={styles.locHourTime}>10am &ndash; 8pm</span></div>
                    <div className={styles.locHourRow}><span className={styles.locHourDay}>Sunday</span><span className={styles.locHourTime}>11am &ndash; 6pm</span></div>
                  </div>
                  <div className={styles.locPhoneBlock}>
                    <div className={styles.locPhoneLabel}>Phone Number</div>
                    <div className={styles.locPhone}>{loc.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Image src="/panda-logo.png" alt="Panda Shoes" width={70} height={70} className={styles.footerLogo} />
            <p className={styles.footerAbout}>Family-owned since 1984, serving Union City with quality footwear at affordable prices for the whole family.</p>
            <div className={styles.footerSocials}>
              <a href="https://www.facebook.com/61586754634946" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>f</a>
              <a href="https://www.instagram.com/pandashoescenter/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>ig</a>
              <a href="https://www.tiktok.com/@pandashoesnj" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>tk</a>
              <a href="https://www.youtube.com/@PandaShoesNJ" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>yt</a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <div className={styles.footerColTitle}>Customer Service</div>
            <a href="/returns" className={styles.footerLink}>Exchanges &amp; Returns</a>
            <a href="/shipping" className={styles.footerLink}>Shipping &amp; Handling</a>
            <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
          </div>
          <div className={styles.footerCol}>
            <div className={styles.footerColTitle}>Explore</div>
            <a href="/shop" className={styles.footerLink}>Shop All</a>
            <a href="/shop/mens" className={styles.footerLink}>Men&apos;s</a>
            <a href="/shop/womens" className={styles.footerLink}>Women&apos;s</a>
            <a href="/shop/kids" className={styles.footerLink}>Kids&apos;</a>
          </div>
          <div className={styles.footerCol}>
            <div className={styles.footerColTitle}>Return Policy</div>
            <p className={styles.footerPolicy}>Returns accepted within 15 days for store credit or exchange only. No cash refunds. All sales are final.</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} Panda Shoes &middot; Union City, NJ &middot; All Rights Reserved</p>
        </div>
      </footer>
    </StoreLayout>
  );
}

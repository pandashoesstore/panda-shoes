'use client';
import StoreLayout from '@/components/shop/StoreLayout';
import styles from './returns.module.css';

export default function ReturnsPage() {
  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Customer Service</p>
          <h1 className={styles.title}>Exchanges &amp; Returns</h1>
          <p className={styles.updated}>Last updated: May 31, 2026</p>

          <div className={styles.highlight}>
            <h2>Important: All Sales Are Final</h2>
            <p>Panda Shoes does not offer cash refunds under any circumstances. All purchases are considered final at the time of sale. We do, however, offer store credit or even exchanges within our return window to ensure you find the perfect fit. This return and exchange policy is available exclusively to registered Panda Shoes members. You must have an active account to be eligible for any returns or exchanges.</p>
          </div>

          <section className={styles.section}>
            <h2>Return Window</h2>
            <p>You have 15 days from the date of purchase to return or exchange eligible items. After 15 days, unfortunately we are unable to offer any store credit or exchange.</p>
          </section>

          <section className={styles.section}>
            <h2>What We Offer</h2>
            <p>When you return an eligible item within the 15-day window, you may choose one of the following options:</p>
            <div className={styles.options}>
              <div className={styles.option}>
                <div className={styles.optionIcon}>{'\u{1F4B3}'}</div>
                <h3>Store Credit</h3>
                <p>Receive store credit for the full purchase price of your returned item. Store credit never expires and can be used at either of our two Union City locations.</p>
              </div>
              <div className={styles.option}>
                <div className={styles.optionIcon}>{'\u{1F504}'}</div>
                <h3>Even Exchange</h3>
                <p>Exchange your item for a different size, color, or style of equal value. If the replacement item costs more, you pay the difference. If it costs less, the remaining balance is issued as store credit.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Conditions for Returns &amp; Exchanges</h2>
            <p>To be eligible for a return or exchange, items must meet the following conditions:</p>
            <div className={styles.list}>
              <div className={styles.listItem}>{'\u2713'} Items must be unworn and in original condition</div>
              <div className={styles.listItem}>{'\u2713'} Items must be in original packaging with all tags attached</div>
              <div className={styles.listItem}>{'\u2713'} Items must not show signs of wear, scuffing, or damage</div>
              <div className={styles.listItem}>{'\u2713'} You must present your original receipt or proof of purchase</div>
              <div className={styles.listItem}>{'\u2713'} Returns must be made within 15 days of purchase date</div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Items That Cannot Be Returned</h2>
            <p>The following items are not eligible for return or exchange under any circumstances:</p>
            <div className={styles.list}>
              <div className={styles.listItem}>{'\u2717'} Clearance or sale items marked as final sale</div>
              <div className={styles.listItem}>{'\u2717'} Items that have been worn, used, or damaged after purchase</div>
              <div className={styles.listItem}>{'\u2717'} Items without original packaging or tags</div>
              <div className={styles.listItem}>{'\u2717'} Items returned after the 15-day window</div>
              <div className={styles.listItem}>{'\u2717'} Socks, insoles, and shoe care products</div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>How to Make a Return or Exchange</h2>
            <p>Returns and exchanges are processed in-store only at either of our two locations. Simply bring the item along with your receipt to either store during business hours:</p>
            <div className={styles.stores}>
              <div className={styles.store}>
                <h3>Panda Shoe Center</h3>
                <p>4105 Bergenline Ave, Union City, NJ 07087</p>
                <p>{'\u{1F4DE}'} (201) 348-0524</p>
              </div>
              <div className={styles.store}>
                <h3>Panda Shoes</h3>
                <p>4501 Bergenline Ave, Union City, NJ 07087</p>
                <p>{'\u{1F4DE}'} (201) 319-0251</p>
              </div>
            </div>
            <p className={styles.hours}>Mon&ndash;Wed 10am&ndash;7pm &middot; Thu&ndash;Sat 10am&ndash;8pm &middot; Sun 11am&ndash;6pm</p>
          </section>

          <section className={styles.section}>
            <h2>Online Orders</h2>
            <p>For items purchased through our website, the same 15-day return policy applies. You may return items by visiting either store location in person, or by shipping the item back to us at your own expense. Please contact us before shipping any returns so we can provide you with instructions and a return authorization.</p>
            <p>Shipping costs for returns are non-refundable. We recommend using a trackable shipping method, as we cannot be responsible for items lost in transit.</p>
          </section>

          <section className={styles.section}>
            <h2>Defective or Damaged Items</h2>
            <p>If you receive a defective or damaged item, please contact us immediately. We will work with you to arrange an exchange or issue store credit. Defective items may be returned beyond the 15-day window at our discretion, provided you have proof of purchase and the defect is a manufacturing issue and not the result of normal wear and tear.</p>
          </section>

          <section className={styles.section}>
            <h2>Questions?</h2>
            <p>If you have any questions about our return and exchange policy, please do not hesitate to contact us at either store location or reach out to us on social media. Our team is happy to help you find the right fit.</p>
          </section>

          <div className={styles.reminder}>
            <strong>Remember:</strong> No cash refunds. Store credit or even exchange only. 15-day return window. All sales are final.
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

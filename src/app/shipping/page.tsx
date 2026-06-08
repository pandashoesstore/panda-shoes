'use client';
import StoreLayout from '@/components/shop/StoreLayout';
import styles from './shipping.module.css';

export default function ShippingPage() {
  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Customer Service</p>
          <h1 className={styles.title}>Shipping &amp; Handling</h1>
          <p className={styles.updated}>Last updated: May 31, 2026</p>

          <p className={styles.intro}>At Panda Shoes, we offer multiple ways to get your footwear to you. Whether you prefer picking up in store, local delivery, or shipping to your door, we have you covered.</p>

          <section className={styles.section}>
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}>{'\u{1F3EA}'}</div>
              <div>
                <h2>In-Store Pickup</h2>
                <div className={styles.badge}>FREE</div>
                <p>Order online and pick up at either of our two Union City locations. Your order will be ready for pickup within 1&ndash;2 business hours of placing your order. You will receive a confirmation email or text when your order is ready.</p>
                <div className={styles.details}>
                  <div className={styles.detail}>
                    <strong>Pickup Locations:</strong>
                    <p>4105 Bergenline Ave, Union City, NJ 07087</p>
                    <p>4501 Bergenline Ave, Union City, NJ 07087</p>
                  </div>
                  <div className={styles.detail}>
                    <strong>Pickup Hours:</strong>
                    <p>Mon&ndash;Wed 10am&ndash;7pm</p>
                    <p>Thu&ndash;Sat 10am&ndash;8pm</p>
                    <p>Sun 11am&ndash;6pm</p>
                  </div>
                </div>
                <p className={styles.note}>Please bring a valid photo ID and your order confirmation when picking up. Orders not picked up within 7 days may be restocked.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}>{'\u{1F69A}'}</div>
              <div>
                <h2>Local Delivery</h2>
                <div className={styles.badge}>FREE for Members</div>
                <p>We offer free local delivery within our delivery area for registered members. You must sign up for a free Panda Shoes account so we can process your order with your name, delivery address, and contact information. Local delivery orders are typically delivered within 1&ndash;3 business days.</p>
                <div className={styles.deliveryArea}>
                  <h3>Delivery Area</h3>
                  <p>We deliver to all of Hudson County and Bergen County, New Jersey. This includes but is not limited to:</p>
                  <div className={styles.countyGrid}>
                    <div>
                      <strong>Hudson County</strong>
                      <p>Union City, West New York, North Bergen, Guttenberg, Weehawken, Hoboken, Jersey City, Secaucus, Bayonne, Kearny, Harrison, East Newark</p>
                    </div>
                    <div>
                      <strong>Bergen County</strong>
                      <p>Fort Lee, Cliffside Park, Edgewater, Fairview, Palisades Park, Ridgefield, Hackensack, Englewood, Teaneck, Bergenfield, Paramus, Garfield, Lodi, and surrounding areas</p>
                    </div>
                  </div>
                </div>
                <p className={styles.note}>Delivery is available Monday through Saturday. You will receive a text or call when your delivery is on the way. Someone must be available to receive the order at the delivery address.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}>{'\u{1F4E6}'}</div>
              <div>
                <h2>Standard Shipping (Out of Area)</h2>
                <div className={styles.badgeGray}>Customer pays shipping</div>
                <p>For customers outside of Hudson County and Bergen County, we offer standard shipping via USPS or UPS. Shipping costs are calculated at checkout based on the weight of your order and your delivery address.</p>
                <div className={styles.shippingTable}>
                  <div className={styles.shippingRow}>
                    <span>New Jersey (outside delivery area)</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className={styles.shippingRow}>
                    <span>New York, Connecticut, Pennsylvania</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className={styles.shippingRow}>
                    <span>All other US states</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <p>Standard shipping typically takes 3&ndash;7 business days depending on your location. You will receive a tracking number via email once your order has shipped.</p>
                <p className={styles.note}>Shipping costs are non-refundable. We are not responsible for delays caused by the shipping carrier. For lost or damaged shipments, please contact us and we will work with the carrier to resolve the issue.</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Order Processing</h2>
            <p>All orders are processed within 1&ndash;2 business days (Monday through Saturday, excluding holidays). Orders placed after 5:00 PM or on Sundays will be processed the following business day.</p>
            <p>You will receive an order confirmation email immediately after placing your order, followed by a shipping or delivery notification when your order is on its way.</p>
          </section>

          <section className={styles.section}>
            <h2>Order Tracking</h2>
            <p>For shipped orders, a tracking number will be emailed to you once your package has been dispatched. You can use this tracking number on the carrier&apos;s website (USPS.com or UPS.com) to monitor your delivery status.</p>
            <p>For local deliveries, you will receive a text message or phone call when your order is out for delivery.</p>
          </section>

          <section className={styles.section}>
            <h2>New Jersey Sales Tax on Footwear</h2>
            <p>New Jersey has specific sales tax rules for clothing and footwear under <strong>N.J.S.A. 54:32B-8.4</strong>. Here is exactly how it applies to your Panda Shoes order:</p>

            <div className={styles.methodCard} style={{marginTop:'16px'}}>
              <div className={styles.methodIcon}>✅</div>
              <div>
                <h3>Tax-Exempt (No Sales Tax)</h3>
                <p>Most shoes and footwear priced <strong>under $110 per item</strong> are exempt from New Jersey sales tax. This includes:</p>
                <ul style={{paddingLeft:'20px',marginTop:'8px',lineHeight:'2'}}>
                  <li>Sneakers, athletic shoes, and casual shoes under $110</li>
                  <li>Boots, sandals, and dress shoes under $110</li>
                  <li>Children&apos;s shoes of any type under $110</li>
                  <li>Slippers and comfort footwear under $110</li>
                </ul>
                <p className={styles.note}>The $110 threshold applies <strong>per individual item</strong>, not per order total. Each pair of shoes is evaluated separately.</p>
              </div>
            </div>

            <div className={styles.methodCard} style={{marginTop:'16px'}}>
              <div className={styles.methodIcon}>💰</div>
              <div>
                <h3>Taxable Items (6.625% NJ Sales Tax)</h3>
                <p>Items priced at <strong>$110 or more per item</strong> are subject to New Jersey sales tax at the current rate of <strong>6.625%</strong>. This includes:</p>
                <ul style={{paddingLeft:'20px',marginTop:'8px',lineHeight:'2'}}>
                  <li>Any single pair of shoes priced at $110 or more</li>
                  <li>Work boots or specialty footwear priced at $110 or more</li>
                  <li>Designer or premium footwear priced at $110 or more</li>
                </ul>
                <div className={styles.shippingTable} style={{marginTop:'12px'}}>
                  <div className={styles.shippingRow}><span>Item price under $110</span><span style={{color:'#3a7a37',fontWeight:700}}>No tax</span></div>
                  <div className={styles.shippingRow}><span>Item price $110 or more</span><span style={{fontWeight:700}}>6.625% tax applies</span></div>
                  <div className={styles.shippingRow}><span>NJ Tax Rate</span><span style={{fontWeight:700}}>6.625%</span></div>
                </div>
              </div>
            </div>

            <div className={styles.methodCard} style={{marginTop:'16px'}}>
              <div className={styles.methodIcon}>📦</div>
              <div>
                <h3>Shipping &amp; Tax Rules</h3>
                <p>Under New Jersey law (<strong>N.J.A.C. 18:24-27.1</strong>), shipping and handling charges follow these rules:</p>
                <ul style={{paddingLeft:'20px',marginTop:'8px',lineHeight:'2'}}>
                  <li><strong>Exempt orders only</strong> — if all items in your order are under $110, shipping is <strong>not taxable</strong></li>
                  <li><strong>Mixed orders</strong> — if your order contains items over $110, the shipping charge is proportionally taxable based on the taxable portion of the order</li>
                  <li><strong>Separately stated</strong> — Panda Shoes always shows shipping as a separate line item, which is required for proper tax treatment under NJ law</li>
                  <li><strong>Local delivery</strong> — free member delivery is not subject to tax as no delivery charge is collected</li>
                </ul>
                <p className={styles.note}>Tax is calculated automatically at checkout based on the price of each individual item in your order. You will see an itemized breakdown before completing your purchase.</p>
              </div>
            </div>

            <div className={styles.methodCard} style={{marginTop:'16px'}}>
              <div className={styles.methodIcon}>📋</div>
              <div>
                <h3>Tax Exemption Certificates</h3>
                <p>If you are a tax-exempt organization (church, school, nonprofit, or reseller), you may qualify for a full sales tax exemption on taxable items. To apply your exemption:</p>
                <ul style={{paddingLeft:'20px',marginTop:'8px',lineHeight:'2'}}>
                  <li>Contact us before placing your order</li>
                  <li>Provide a valid New Jersey ST-5 (exempt organization) or ST-3 (reseller) certificate</li>
                  <li>Tax exemption applies to in-store and online purchases once verified</li>
                </ul>
                <p className={styles.note}>Tax exemption certificates must be renewed annually. Contact us at (201) 348-0524 or (201) 319-0251 for assistance.</p>
              </div>
            </div>

            <p style={{marginTop:'16px',fontSize:'0.85rem',color:'#888'}}>
              <strong>Legal reference:</strong> New Jersey clothing and footwear tax exemption is governed by N.J.S.A. 54:32B-8.4. The 6.625% sales tax rate is set by N.J.S.A. 54:32B-3. Shipping tax rules are governed by N.J.A.C. 18:24-27.1. Tax laws are subject to change — consult a tax professional for specific advice.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Questions?</h2>
            <p>If you have any questions about shipping or your order status, please contact us:</p>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <strong>Panda Shoe Center</strong>
                <p>(201) 348-0524</p>
              </div>
              <div className={styles.contactItem}>
                <strong>Panda Shoes</strong>
                <p>(201) 319-0251</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StoreLayout>
  );
}

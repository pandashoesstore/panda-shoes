'use client';
import StoreLayout from '@/components/shop/StoreLayout';
import styles from './privacy.module.css';

export default function PrivacyPage() {
  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: May 31, 2026</p>

          <p className={styles.intro}>This Privacy Policy describes how Panda Shoes (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and discloses your personal information when you visit our website at panda-shoes.vercel.app (the &ldquo;Site&rdquo;), visit our stores, use our services, or make a purchase from us (collectively, the &ldquo;Services&rdquo;).</p>

          <p className={styles.intro}>Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.</p>

          <section className={styles.section}>
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site and update the &ldquo;Last updated&rdquo; date above.</p>
          </section>

          <section className={styles.section}>
            <h2>Information We Collect</h2>
            <p>The types of personal information we collect depend on how you interact with us. We may collect the following types of information:</p>

            <h3>Information You Provide Directly</h3>
            <div className={styles.list}>
              <div className={styles.listItem}><strong>Contact details:</strong> your name, address, phone number, and email address.</div>
              <div className={styles.listItem}><strong>Order information:</strong> your billing address, shipping address, payment confirmation, email address, and phone number.</div>
              <div className={styles.listItem}><strong>Account information:</strong> your username, password, and security information used for account purposes.</div>
              <div className={styles.listItem}><strong>Shopping information:</strong> items you view, add to your cart, save, or purchase.</div>
              <div className={styles.listItem}><strong>Customer support information:</strong> any information you include when communicating with us.</div>
            </div>

            <h3>Information Collected Automatically</h3>
            <p>When you visit our Site, we may automatically collect certain information about your device and your interaction with the Site, including your IP address, browser type, operating system, referring URLs, and information about how you use our Site. We may use cookies and similar technologies to collect this information.</p>

            <h3>Information from Third Parties</h3>
            <p>We may receive information about you from third parties, including our payment processors (such as Stripe), analytics providers, and marketing partners. This information is treated in accordance with this Privacy Policy.</p>
          </section>

          <section className={styles.section}>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <div className={styles.list}>
              <div className={styles.listItem}><strong>Providing products and services:</strong> to process your payments, fulfill your orders, send order notifications, manage your account, arrange shipping, and facilitate returns and exchanges.</div>
              <div className={styles.listItem}><strong>Marketing and advertising:</strong> to send you promotional communications by email or text message, and to show you relevant advertisements. You may opt out of marketing communications at any time.</div>
              <div className={styles.listItem}><strong>Security and fraud prevention:</strong> to detect, investigate, or take action regarding possible fraudulent, illegal, or malicious activity.</div>
              <div className={styles.listItem}><strong>Customer support and improvement:</strong> to provide customer service, respond to your inquiries, and improve our Services.</div>
              <div className={styles.listItem}><strong>Legal compliance:</strong> to comply with applicable legal obligations, enforce our terms of service, and protect our rights.</div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Cookies</h2>
            <p>We use cookies and similar tracking technologies on our Site to improve your experience, analyze site traffic, and understand user behavior. Cookies are small data files stored on your device when you visit our Site.</p>
            <p>Most browsers allow you to control cookies through their settings. You can choose to block or delete cookies, but doing so may affect the functionality of the Site.</p>
          </section>

          <section className={styles.section}>
            <h2>How We Share Your Information</h2>
            <p>We may share your personal information in the following circumstances:</p>
            <div className={styles.list}>
              <div className={styles.listItem}>With service providers who perform services on our behalf, such as payment processing (Stripe), email services (Resend), analytics, and hosting (Vercel, Supabase).</div>
              <div className={styles.listItem}>When required by law, regulation, or legal process, such as in response to a subpoena or court order.</div>
              <div className={styles.listItem}>In connection with a business transaction, such as a merger, acquisition, or sale of assets.</div>
              <div className={styles.listItem}>To protect the rights, property, or safety of Panda Shoes, our customers, or others.</div>
            </div>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className={styles.section}>
            <h2>Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            <p>We recommend that you do not share your account credentials with anyone else. If you believe your account has been compromised, please contact us immediately.</p>
          </section>

          <section className={styles.section}>
            <h2>Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.</p>
          </section>

          <section className={styles.section}>
            <h2>Children&apos;s Privacy</h2>
            <p>Our Services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us and we will take steps to delete that information.</p>
          </section>

          <section className={styles.section}>
            <h2>Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <div className={styles.list}>
              <div className={styles.listItem}><strong>Access:</strong> the right to request access to your personal information.</div>
              <div className={styles.listItem}><strong>Correction:</strong> the right to request correction of inaccurate information.</div>
              <div className={styles.listItem}><strong>Deletion:</strong> the right to request deletion of your personal information.</div>
              <div className={styles.listItem}><strong>Opt-out:</strong> the right to opt out of marketing communications.</div>
            </div>
            <p>To exercise any of these rights, please contact us using the information below. We will respond to your request within a reasonable timeframe as required by applicable law.</p>
          </section>

          <section className={styles.section}>
            <h2>Third-Party Links</h2>
            <p>Our Site may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.</p>
          </section>

          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className={styles.contact}>
              <p><strong>Panda Shoes</strong></p>
              <p>4105 Bergenline Ave, Union City, NJ 07087</p>
              <p>Phone: (201) 348-0524</p>
              <p>4501 Bergenline Ave, Union City, NJ 07087</p>
              <p>Phone: (201) 319-0251</p>
            </div>
          </section>
        </div>
      </div>
    </StoreLayout>
  );
}

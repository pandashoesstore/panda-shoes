'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import StoreLayout from '@/components/shop/StoreLayout';
import Link from 'next/link';
import Image from 'next/image';
import styles from './signup.module.css';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'NJ',
    zip: '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in your name, email, and password.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            zip: form.zip,
          },
        },
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (authError) throw authError;
    } catch (e: any) {
      setError(e.message || 'Google signup failed.');
    }
  };

  if (success) {
    return (
      <StoreLayout>
        <div className={styles.page}>
          <div className={styles.card}>
            <Image src="/panda-logo.png" alt="Panda Shoes" width={80} height={80} className={styles.logo} />
            <h1 className={styles.title}>Check Your Email</h1>
            <p className={styles.successText}>
              We sent a confirmation link to <strong>{form.email}</strong>. Click the link in the email to activate your account, then come back and log in.
            </p>
            <Link href="/login" className={styles.btn} style={{display: 'inline-block', textDecoration: 'none', textAlign: 'center', marginTop: '16px'}}>Go to Login</Link>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <Image src="/panda-logo.png" alt="Panda Shoes" width={80} height={80} className={styles.logo} />
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.sub}>Sign up to unlock free local delivery, order tracking, and exclusive member deals.</p>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.googleBtn} onClick={handleGoogle}>
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#34A853" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#FBBC05" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continue with Google
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerText}>or sign up with email</span>
            <span className={styles.dividerLine}></span>
          </div>

          <div className={styles.form}>
            <div className={styles.sectionLabel}>Account Info</div>
            <label className={styles.label}>
              Full Name *
              <input className={styles.input} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Smith" />
            </label>
            <label className={styles.label}>
              Email Address *
              <input className={styles.input} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
            </label>
            <label className={styles.label}>
              Phone Number
              <input className={styles.input} type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(201) 555-0123" />
            </label>

            <div className={styles.sectionLabel}>Delivery Address</div>
            <p className={styles.sectionSub}>Required for free local delivery in Hudson &amp; Bergen County</p>
            <label className={styles.label}>
              Street Address
              <input className={styles.input} value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="123 Main St, Apt 4B" />
            </label>
            <div className={styles.row}>
              <label className={styles.label}>
                City
                <input className={styles.input} value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Union City" />
              </label>
              <label className={styles.label}>
                State
                <input className={styles.input} value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="NJ" />
              </label>
              <label className={styles.label}>
                ZIP
                <input className={styles.input} value={form.zip} onChange={(e) => update('zip', e.target.value)} placeholder="07087" />
              </label>
            </div>

            <div className={styles.sectionLabel}>Password</div>
            <label className={styles.label}>
              Password *
              <input className={styles.input} type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 6 characters" />
            </label>
            <label className={styles.label}>
              Confirm Password *
              <input className={styles.input} type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} placeholder="Re-enter your password" onKeyDown={(e) => e.key === 'Enter' && handleSignup()} />
            </label>

            <button className={styles.btn} onClick={handleSignup} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <p className={styles.switch}>
            Already have an account?{' '}
            <Link href="/login" className={styles.link}>Log In</Link>
          </p>
        </div>
      </div>
    </StoreLayout>
  );
}

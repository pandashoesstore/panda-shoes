'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

const GENDERS = ['mens', 'womens', 'kids'];
const CATEGORIES: Record<string, string[]> = {
  mens: ['dress', 'boots', 'sports', 'casual'],
  womens: ['heels', 'sandals', 'boots', 'comfort', 'sneakers'],
  kids: ['sneakers', 'boots', 'character', 'dress', 'girls'],
};

export default function ProductForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', brand: '', gender: 'mens', category: 'dress',
    style: '', price: '', is_new: false,
  });

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.brand || !form.price) { alert('Name, brand, and price are required'); return; }
    setSaving(true);
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
    });
    if (res.ok) {
      setForm({ name: '', brand: '', gender: 'mens', category: 'dress', style: '', price: '', is_new: false });
      router.refresh();
    } else {
      alert('Failed to add product');
    }
    setSaving(false);
  };

  return (
    <div>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Brand *</label>
          <input className={styles.formInput} value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="e.g. Florsheim" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Product Name *</label>
          <input className={styles.formInput} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Cap Toe Oxford" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Gender *</label>
          <select className={styles.formSelect} value={form.gender} onChange={(e) => { set('gender', e.target.value); set('category', CATEGORIES[e.target.value][0]); }}>
            {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Category *</label>
          <select className={styles.formSelect} value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES[form.gender].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Style</label>
          <input className={styles.formInput} value={form.style} onChange={(e) => set('style', e.target.value)} placeholder="e.g. Oxford, Loafer, Boot" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Price (USD) *</label>
          <input className={styles.formInput} type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="79.99" />
        </div>
      </div>
      <div className={styles.formRow}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600 }}>
          <input type="checkbox" checked={form.is_new} onChange={(e) => set('is_new', e.target.checked)} />
          Mark as New Arrival
        </label>
        <button className={styles.btnPrimary} onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : '+ Add Product'}
        </button>
      </div>
    </div>
  );
}

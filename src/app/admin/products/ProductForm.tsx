'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';
import { supabase } from '@/lib/supabase';

const GENDERS = ['mens', 'womens', 'kids'];
const CATEGORIES: Record<string, string[]> = {
  mens: ['dress', 'boots', 'sports', 'casual'],
  womens: ['heels', 'sandals', 'boots', 'comfort', 'sneakers'],
  kids: ['sneakers', 'boots', 'character', 'dress', 'girls'],
};

export default function ProductForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '', brand: '', gender: 'mens', category: 'dress',
    style: '', price: '', image_url: '', is_new: false,
  });

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const handleFile = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file);
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    set('image_url', data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.brand || !form.price) { alert('Name, brand, and price are required'); return; }
    setSaving(true);
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
    });
    if (res.ok) {
      setForm({ name: '', brand: '', gender: 'mens', category: 'dress', style: '', price: '', image_url: '', is_new: false });
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
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Image URL</label>
          <input className={styles.formInput} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="https://... (paste photo link)" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Or Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} style={{ fontSize: 13 }} />
          {uploading && <span style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>Uploading...</span>}
          {form.image_url && <img src={form.image_url} alt="preview" style={{ display: 'block', marginTop: 8, width: 70, height: 70, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />}
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

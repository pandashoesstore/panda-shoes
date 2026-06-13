'use client';
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/supabase';

function norm(s: string) { return (s || '').trim(); }

export default function ShopFilter({ products, gender }: { products: Product[]; gender: string }) {
  const [open, setOpen] = useState(false);
  const [fBrands, setFBrands] = useState<string[]>([]);
  const [fCats, setFCats] = useState<string[]>([]);
  const [fColors, setFColors] = useState<string[]>([]);
  const [fSizes, setFSizes] = useState<string[]>([]);

  const brands = useMemo(() => [...new Set(products.map(p => norm(p.brand)).filter(Boolean))].sort(), [products]);
  const cats   = useMemo(() => [...new Set(products.map(p => norm((p as any).category)).filter(Boolean))].sort(), [products]);
  const colors = useMemo(() => [...new Set(products.map(p => norm((p as any).color)).filter(Boolean))].sort(), [products]);
  const sizes  = useMemo(() => {
    const all = new Set<string>();
    products.forEach(p => (Array.isArray(p.sizes) ? p.sizes : []).forEach((s: string) => all.add(String(s))));
    return [...all].sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [products]);

  const toggle = (val: string, list: string[], setter: (v: string[]) => void) =>
    setter(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);

  const filtered = useMemo(() => products.filter(p => {
    if (fBrands.length && !fBrands.includes(norm(p.brand))) return false;
    if (fCats.length && !fCats.includes(norm((p as any).category))) return false;
    if (fColors.length && !fColors.includes(norm((p as any).color))) return false;
    if (fSizes.length) {
      const ps = (Array.isArray(p.sizes) ? p.sizes : []).map(String);
      if (!fSizes.some(s => ps.includes(s))) return false;
    }
    return true;
  }), [products, fBrands, fCats, fColors, fSizes]);

  const activeCount = fBrands.length + fCats.length + fColors.length + fSizes.length;
  const clearAll = () => { setFBrands([]); setFCats([]); setFColors([]); setFSizes([]); };

  const Section = ({ title, opts, sel, setter, cap }: any) => (
    <div style={{ borderBottom: '1px solid #eee', padding: '14px 0' }}>
      <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: '#333', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, maxHeight: 180, overflowY: 'auto' }}>
        {opts.map((o: string) => (
          <button key={o} onClick={() => toggle(o, sel, setter)}
            style={{
              padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 600,
              border: sel.includes(o) ? '1.5px solid #111' : '1.5px solid #ddd',
              background: sel.includes(o) ? '#111' : '#fff', color: sel.includes(o) ? '#fff' : '#444',
              textTransform: cap ? 'capitalize' : 'none',
            }}>{o}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
        <button onClick={() => setOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 18px', borderRadius: 12, border: '1.5px solid #111', background: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ width: 16, height: 2, background: '#111' }} />
            <span style={{ width: 16, height: 2, background: '#111' }} />
            <span style={{ width: 16, height: 2, background: '#111' }} />
          </span>
          Filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
        <span style={{ fontSize: 14, color: '#888' }}>{filtered.length} of {products.length} shoes</span>
      </div>

      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 'min(340px, 86vw)', background: '#fff', padding: '20px 22px', overflowY: 'auto', boxShadow: '4px 0 24px rgba(0,0,0,.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Filters</h3>
              <button onClick={() => setOpen(false)} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            {activeCount > 0 && <button onClick={clearAll} style={{ background: 'none', border: 'none', color: '#c0392b', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: '4px 0', marginBottom: 6 }}>Clear all ({activeCount})</button>}
            {cats.length > 1 && <Section title="Category" opts={cats} sel={fCats} setter={setFCats} cap />}
            {brands.length > 1 && <Section title="Brand" opts={brands} sel={fBrands} setter={setFBrands} />}
            {colors.length > 1 && <Section title="Color" opts={colors} sel={fColors} setter={setFColors} cap />}
            {sizes.length > 1 && <Section title="Size" opts={sizes} sel={fSizes} setter={setFSizes} />}
            <button onClick={() => setOpen(false)}
              style={{ width: '100%', marginTop: 18, padding: 14, borderRadius: 12, border: 'none', background: '#111', color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Show {filtered.length} shoes
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20, paddingTop: 12 }}>
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {filtered.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: '#999' }}>No shoes match these filters.</p>}
    </div>
  );
}

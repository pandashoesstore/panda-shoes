'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const GENDERS = [
  { key: 'mens', label: "Men's" },
  { key: 'womens', label: "Women's" },
  { key: 'kids', label: "Kids'" },
];

export default function HomeFilter() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [opts, setOpts] = useState<{ brands: string[]; cats: string[]; colors: string[]; sizes: string[] }>({ brands: [], cats: [], colors: [], sizes: [] });

  const [gender, setGender] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    if (!open || loaded) return;
    (async () => {
      const { data } = await supabase.from('products').select('brand,category,color,sizes').eq('is_active', true);
      const brands = new Set<string>(), cats = new Set<string>(), colors = new Set<string>(), sizes = new Set<string>();
      (data || []).forEach((p: any) => {
        if (p.brand) brands.add(p.brand.trim());
        if (p.category) cats.add(p.category.trim());
        if (p.color) colors.add(p.color.trim());
        (Array.isArray(p.sizes) ? p.sizes : []).forEach((s: string) => sizes.add(String(s)));
      });
      setOpts({
        brands: [...brands].sort(),
        cats: [...cats].sort(),
        colors: [...colors].sort(),
        sizes: [...sizes].sort((a, b) => parseFloat(a) - parseFloat(b)),
      });
      setLoaded(true);
    })();
  }, [open, loaded]);

  const go = () => {
    if (!gender) { alert("Please pick a category first"); return; }
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (cat) params.set('cat', cat);
    if (color) params.set('color', color);
    if (size) params.set('size', size);
    const qs = params.toString();
    router.push(`/shop/${gender}${qs ? '?' + qs : ''}`);
  };

  const Pills = ({ label, options, val, setter, cap }: any) => (
    <div style={{ borderBottom: '1px solid #eee', padding: '14px 0' }}>
      <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: '#333', marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, maxHeight: 150, overflowY: 'auto' }}>
        {options.map((o: string) => (
          <button key={o} onClick={() => setter(val === o ? null : o)}
            style={{
              padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 13, fontWeight: 600,
              border: val === o ? '1.5px solid #111' : '1.5px solid #ddd',
              background: val === o ? '#111' : '#fff', color: val === o ? '#fff' : '#444',
              textTransform: cap ? 'capitalize' : 'none',
            }}>{o}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f6f4ef', padding: '20px 16px', textAlign: 'center' }}>
      <button onClick={() => setOpen(true)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 11, padding: '14px 28px', borderRadius: 14, border: 'none', background: '#111', color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
        <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 3.5 }}>
          <span style={{ width: 18, height: 2.5, background: '#fff' }} />
          <span style={{ width: 18, height: 2.5, background: '#fff' }} />
          <span style={{ width: 18, height: 2.5, background: '#fff' }} />
        </span>
        Find Your Shoe
      </button>

      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 'min(360px, 88vw)', background: '#fff', padding: '20px 22px', overflowY: 'auto', textAlign: 'left', boxShadow: '4px 0 24px rgba(0,0,0,.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Find Your Shoe</h3>
              <button onClick={() => setOpen(false)} style={{ fontSize: 26, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>

            <div style={{ padding: '4px 0 14px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: '#333', marginBottom: 10 }}>Who's it for? <span style={{ color: '#c0392b' }}>*</span></div>
              <div style={{ display: 'flex', gap: 8 }}>
                {GENDERS.map(g => (
                  <button key={g.key} onClick={() => setGender(g.key)}
                    style={{
                      flex: 1, padding: '12px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 700,
                      border: gender === g.key ? '2px solid #111' : '1.5px solid #ddd',
                      background: gender === g.key ? '#111' : '#fff', color: gender === g.key ? '#fff' : '#444',
                    }}>{g.label}</button>
                ))}
              </div>
            </div>

            {!loaded && <p style={{ padding: '16px 0', color: '#999', fontSize: 14 }}>Loading options…</p>}
            {loaded && <>
              <Pills label="Brand" options={opts.brands} val={brand} setter={setBrand} />
              <Pills label="Category" options={opts.cats} val={cat} setter={setCat} cap />
              <Pills label="Color" options={opts.colors} val={color} setter={setColor} cap />
              <Pills label="Size" options={opts.sizes} val={size} setter={setSize} />
            </>}

            <button onClick={go}
              style={{ width: '100%', marginTop: 18, padding: 15, borderRadius: 13, border: 'none', background: gender ? '#3a7a37' : '#bbb', color: '#fff', fontWeight: 800, fontSize: 16, cursor: gender ? 'pointer' : 'not-allowed' }}>
              Show Shoes
            </button>
            {(brand || cat || color || size || gender) &&
              <button onClick={() => { setGender(null); setBrand(null); setCat(null); setColor(null); setSize(null); }}
                style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 10, border: 'none', background: 'none', color: '#c0392b', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Clear all
              </button>}
          </div>
        </div>
      )}
    </div>
  );
}

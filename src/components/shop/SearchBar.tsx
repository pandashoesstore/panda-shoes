'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Result = { id: string; name: string; brand: string; style: string; price: number; gender: string; category: string };

export default function SearchBar({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
    const t = setTimeout(async () => {
      const term = q.trim();
      let query = supabase
        .from('products')
        .select('id,name,brand,style,price,gender,category')
        .eq('is_active', true)
        .limit(8);
      for (const w of term.split(/\s+/)) {
        query = query.or(`name.ilike.%${w}%,brand.ilike.%${w}%,style.ilike.%${w}%`);
      }
      const { data } = await query;
      setResults(data || []);
      setOpen(true);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  function go(r: Result) {
    setOpen(false); setQ('');
    onNavigate?.();
    router.push(`/product/${r.id}`);
  }

  return (
    <div ref={boxRef} style={{ position: 'relative', minWidth: 200, flex: '0 1 260px' }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        placeholder="Search shoes…"
        style={{
          width: '100%', padding: '9px 14px', borderRadius: 999,
          border: '1.5px solid #e5e0d7', fontSize: 14, outline: 'none',
          fontFamily: 'inherit', background: '#fff',
        }}
      />
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 200,
          background: '#fff', borderRadius: 16, border: '1px solid #eee',
          boxShadow: '0 16px 40px rgba(0,0,0,.14)', overflow: 'hidden', maxHeight: 380, overflowY: 'auto',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: 14, fontSize: 13.5, color: '#999' }}>No shoes found for “{q}”</div>
          ) : results.map((r) => (
            <button key={r.id} onClick={() => go(r)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '11px 14px',
              background: 'none', border: 'none', borderBottom: '1px solid #f4f1ea',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#b0a9a0' }}>{r.brand}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#232323', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span>{r.name}</span><span>${Number(r.price).toFixed(2)}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

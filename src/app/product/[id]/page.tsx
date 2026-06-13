import { supabase } from '@/lib/supabase';
import StoreLayout from '@/components/shop/StoreLayout';
import AddToBagPanel from './AddToBagPanel';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await supabase
    .from('products').select('*').eq('id', params.id).single();

  if (!product) notFound();

  const genderLabel = product.gender === 'mens' ? "Men's" : product.gender === 'womens' ? "Women's" : product.gender === 'kids' ? "Kids'" : '';

  return (
    <StoreLayout>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 20px' }}>
        <a href={`/shop/${product.gender}`} style={{ fontSize: 14, color: '#777', textDecoration: 'none' }}>← Back to {genderLabel || 'Shop'}</a>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, marginTop: 24 }}>
          <div style={{ background: '#f6f4ef', borderRadius: 24, minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={product.name} style={{ maxWidth: '100%', maxHeight: 360, objectFit: 'contain' }} />
            ) : (
              <span style={{ fontSize: 90, opacity: 0.4 }}>👟</span>
            )}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#999' }}>{product.brand}</div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, margin: '8px 0 4px', lineHeight: 1.1 }}>{product.name}</h1>
            <div style={{ fontSize: 13, color: '#aaa', marginBottom: 14 }}>Style: {product.style}{product.color ? ` · ${product.color}` : ''}</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {genderLabel && <span style={{ background: '#f0ede4', borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 700 }}>{genderLabel}</span>}
              {product.category && <span style={{ background: '#f0ede4', borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 700, textTransform: 'capitalize' }}>{product.category}</span>}
              {product.deal && <span style={{ background: '#3a7a37', color: '#fff', borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 800 }}>{product.deal === '2for30' ? '2 for $30' : '2 for $32'}</span>}
            </div>
            <div style={{ fontSize: 32, fontWeight: 900 }}>${Number(product.price).toFixed(2)}</div>
            {product.deal && <p style={{ color: '#3a7a37', fontWeight: 700, fontSize: 14, margin: '6px 0 0' }}>Buy any 2 qualifying styles for {product.deal === '2for30' ? '$30' : '$32'} — applied at checkout.</p>}
            <AddToBagPanel product={product} />
            <p style={{ marginTop: 26, fontSize: 13.5, color: '#888', lineHeight: 1.6 }}>
              Available at Panda Shoes, Union City NJ. Free pickup at both Bergenline Ave locations, local delivery, or shipping at checkout.
            </p>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

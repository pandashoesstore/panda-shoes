'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { usePathname } from 'next/navigation';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email'|'code'>('email');
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;
    if (localStorage.getItem('panda_promo_done')) return;
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    });
  }, [pathname]);

  function dismiss() {
    localStorage.setItem('panda_promo_done', '1');
    setVisible(false);
  }

  async function handleSubmit() {
    if (!email || !email.includes('@')) { setError('Please enter a valid email.'); return; }
    setError('');
    try {
      await supabase.from('promo_signups').insert({ email, promo: 'PANDA10' });
    } catch (_) {}
    setStep('code');
  }

  function copyCode() {
    navigator.clipboard.writeText('PANDA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!visible) return null;

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.72)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',fontFamily:'Nunito,system-ui,sans-serif'}}>
      <div style={{background:'#111',borderRadius:'20px',maxWidth:'420px',width:'100%',overflow:'hidden',position:'relative'}}>

        <div style={{background:'#fff',padding:'28px 28px 22px',textAlign:'center',position:'relative',borderRadius:'20px 20px 0 0'}}>
          <button onClick={dismiss} style={{position:'absolute',top:'14px',right:'16px',background:'rgba(0,0,0,0.08)',border:'none',color:'#111',width:'28px',height:'28px',borderRadius:'50%',cursor:'pointer',fontSize:'15px',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
          <div style={{width:'80px',height:'80px',margin:'0 auto 14px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:'80px',height:'80px',borderRadius:'50%',overflow:'hidden',margin:'0 auto 14px'}}><Image src="/panda-logo.jpeg" alt="Panda Shoes" width={80} height={80} style={{objectFit:'cover',width:'100%',height:'100%'}} /></div>
          </div>
          <div style={{background:'#3a7a37',color:'#fff',fontSize:'0.68rem',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',padding:'5px 14px',borderRadius:'999px',display:'inline-block',marginBottom:'12px'}}>Welcome Offer</div>
          <div style={{color:'#111',fontSize:'3rem',fontWeight:900,lineHeight:1,marginBottom:'4px'}}>10% OFF</div>
          <div style={{color:'rgba(0,0,0,0.5)',fontSize:'0.88rem',fontWeight:600}}>your first order of <span style={{color:'#111'}}>$59.99 or more</span></div>
        </div>

        {step === 'email' && (
          <div style={{padding:'24px 28px 28px'}}>
            <p style={{textAlign:'center',color:'rgba(255,255,255,0.7)',fontSize:'0.9rem',margin:'0 0 18px',lineHeight:1.5}}>Enter your email to unlock your exclusive discount code.</p>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="you@example.com"
              style={{width:'100%',padding:'13px 14px',border:'1.5px solid #ddd',borderRadius:'10px',fontSize:'0.9rem',fontFamily:'inherit',boxSizing:'border-box' as any,marginBottom:'10px',outline:'none'}}
            />
            {error && <div style={{color:'#c0392b',fontSize:'0.8rem',marginBottom:'8px'}}>{error}</div>}
            <button onClick={handleSubmit} style={{width:'100%',background:'#3a7a37',color:'#fff',border:'none',borderRadius:'10px',padding:'14px',fontWeight:800,fontSize:'0.95rem',cursor:'pointer',textTransform:'uppercase',letterSpacing:'0.5px',fontFamily:'inherit'}}>Get My Code →</button>
            <div style={{textAlign:'center',marginTop:'12px'}}>
              <button onClick={dismiss} style={{background:'none',border:'none',color:'rgba(255,255,255,0.4)',fontSize:'0.78rem',cursor:'pointer',textDecoration:'underline',fontFamily:'inherit'}}>No thanks, I'll pay full price</button>
            </div>
          </div>
        )}

        {step === 'code' && (
          <div style={{padding:'24px 28px 28px'}}>
            <div style={{textAlign:'center',marginBottom:'16px'}}>
              <div style={{fontSize:'1.8rem',marginBottom:'4px'}}>🎉</div>
              <p style={{fontWeight:800,fontSize:'1rem',color:'#fff',margin:'0 0 4px'}}>Your code is ready!</p>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'0.84rem',margin:0}}>Use it at checkout for 10% off your first order.</p>
            </div>
            <div style={{background:'#f5f5f5',borderRadius:'12px',padding:'16px',display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px',border:'2px dashed #ccc'}}>
              <div>
                <div style={{fontSize:'0.65rem',color:'#888',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'4px'}}>Promo Code</div>
                <div style={{fontSize:'1.4rem',fontWeight:900,letterSpacing:'3px',color:'#111'}}>PANDA10</div>
              </div>
              <button onClick={copyCode} style={{background:copied?'#3a7a37':'#111',color:'#fff',border:'none',borderRadius:'8px',padding:'10px 18px',fontWeight:800,fontSize:'0.82rem',cursor:'pointer',textTransform:'uppercase',fontFamily:'inherit',transition:'background 0.2s'}}>{copied?'Copied!':'Copy'}</button>
            </div>
            <button onClick={dismiss} style={{width:'100%',background:'#3a7a37',color:'#fff',border:'none',borderRadius:'10px',padding:'14px',fontWeight:800,fontSize:'0.95rem',cursor:'pointer',textTransform:'uppercase',fontFamily:'inherit'}}>Start Shopping →</button>
          </div>
        )}
      </div>
    </div>
  );
}

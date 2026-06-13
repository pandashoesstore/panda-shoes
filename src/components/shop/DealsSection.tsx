'use client';
export default function DealsSection() {
  return (
    <section style={{background:'#111',padding:'clamp(40px,6vw,72px) clamp(16px,4vw,52px)'}}>
      <div style={{maxWidth:'1180px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'inline-block',background:'#3a7a37',color:'#fff',fontSize:'0.7rem',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',padding:'6px 16px',borderRadius:'999px',marginBottom:'12px'}}>🔥 Limited Time</div>
          <h2 style={{color:'#fff',fontSize:'clamp(1.8rem,4vw,2.4rem)',fontWeight:900,margin:'0 0 6px',lineHeight:1}}>Hot Deals</h2>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'0.9rem',margin:0}}>In-store only · While supplies last</p>
        </div>
        <div style={{maxWidth:'620px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{background:'#1a1a1a',borderRadius:'16px',overflow:'hidden',border:'1px solid #333'}}>
            <div style={{background:'#3a7a37',padding:'20px 24px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
              <div>
                <div style={{color:'rgba(255,255,255,0.8)',fontSize:'0.72rem',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'4px'}}>{"Women's & Kids'"}</div>
                <div style={{display:'flex',alignItems:'baseline',gap:'6px'}}>
                  <span style={{color:'#fff',fontSize:'2.8rem',fontWeight:900,lineHeight:1}}>2</span>
                  <span style={{color:'rgba(255,255,255,0.7)',fontSize:'1.1rem',fontWeight:700}}>for</span>
                  <span style={{color:'#FFD700',fontSize:'2.8rem',fontWeight:900,lineHeight:1}}>$30</span>
                </div>
              </div>
              <div style={{background:'rgba(0,0,0,0.2)',borderRadius:'12px',padding:'10px 16px',textAlign:'center'}}>
                <div style={{color:'rgba(255,255,255,0.6)',fontSize:'0.68rem',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase'}}>Mix & Match</div>
                <div style={{color:'#fff',fontSize:'0.82rem',fontWeight:800}}>Any 2 styles</div>
              </div>
            </div>
            <div style={{padding:'18px 24px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
              <div>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:'0.68rem',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'10px'}}>{"Women's"}</div>
                {["Slip-Ins"].map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'center',gap:'8px',color:'rgba(255,255,255,0.85)',fontSize:'0.88rem',fontWeight:600,marginBottom:'7px'}}><span style={{color:'#3a7a37'}}>✓</span>{item}</div>
                ))}
              </div>
              <div>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:'0.68rem',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'10px'}}>{"Kids'"}</div>
                {["Sandals","Crocs"].map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'center',gap:'8px',color:'rgba(255,255,255,0.85)',fontSize:'0.88rem',fontWeight:600,marginBottom:'7px'}}><span style={{color:'#3a7a37'}}>✓</span>{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{background:'#1a1a1a',borderRadius:'16px',border:'2px solid #FFD700',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 24px',gap:'16px',flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
              <div style={{background:'#FFD700',borderRadius:'12px',width:'48px',height:'48px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',flexShrink:0}}>👡</div>
              <div>
                <div style={{color:'#FFD700',fontSize:'0.7rem',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:'3px'}}>Special Deal</div>
                <div style={{color:'#fff',fontSize:'1rem',fontWeight:800}}>{"Women's Sandals"}</div>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'baseline',gap:'5px'}}>
              <span style={{color:'#fff',fontSize:'2.4rem',fontWeight:900,lineHeight:1}}>2</span>
              <span style={{color:'rgba(255,255,255,0.6)',fontSize:'1rem',fontWeight:700}}>for</span>
              <span style={{color:'#FFD700',fontSize:'2.4rem',fontWeight:900,lineHeight:1}}>$32</span>
            </div>
          </div>
        </div>
        <p style={{textAlign:'center',color:'rgba(255,255,255,0.3)',fontSize:'0.75rem',marginTop:'20px'}}>Available in-store at both Bergenline Ave locations</p>
      </div>
    </section>
  );
}

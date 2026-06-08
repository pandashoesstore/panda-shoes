"use client";
const CSS = ".pcards{--ink:#1c1a16;--muted:#7b746a;font-family:'Hanken Grotesk',system-ui,sans-serif;color:var(--ink);background:radial-gradient(1100px 460px at 50% -8%,#fffdf6,transparent),#fdfaf3;padding:clamp(26px,5vw,68px) clamp(14px,4vw,52px);overflow-x:hidden}.pcards .wrap{max-width:1180px;margin:0 auto}.pcards .head{display:flex;align-items:center;gap:14px}.pcards .panda{width:60px;height:60px;object-fit:contain;filter:drop-shadow(0 4px 8px rgba(0,0,0,.12))}.pcards .eyebrow{font-family:'Fredoka',sans-serif;font-weight:600;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:#ff4438;background:#ffe9e4;padding:7px 14px;border-radius:999px}.pcards .title-lg{font-family:'Fredoka',sans-serif;font-weight:700;font-size:clamp(2.1rem,5.4vw,3.6rem);line-height:1;letter-spacing:-.01em;margin:16px 0 6px}.pcards .title-lg .y{color:#ffb200}.pcards .title-lg .b{color:#5b6cf0}.pcards .title-lg .r{color:#ff4438}.pcards .sub{color:var(--muted);font-size:1.04rem;max-width:48ch}.pcards .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:clamp(18px,2.4vw,28px);margin-top:clamp(26px,4vw,46px)}.pcards .card{position:relative;border-radius:28px;overflow:hidden;background:#fff;border:2px solid #f0ebe0;box-shadow:0 2px 4px rgba(20,15,5,.05);display:flex;flex-direction:column;transition:transform .5s cubic-bezier(.2,.85,.25,1),box-shadow .5s}.pcards .card:hover{transform:translateY(-12px) rotate(-1.2deg);box-shadow:0 34px 60px -26px rgba(20,15,5,.42)}.pcards .stage{position:relative;aspect-ratio:1/.95;overflow:hidden;display:grid;place-items:center;background-size:200% 200%;animation:pcsim 9s ease infinite}.pcards .men .stage{background:linear-gradient(135deg,#fff7e3,#ffe6a6,#fff2cf)}.pcards .wom .stage{background:linear-gradient(135deg,#eef1ff,#cdd6ff,#eef4ff)}.pcards .kid .stage{background:linear-gradient(135deg,#fff1ec,#ffd9d0,#fff3ef)}@keyframes pcsim{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}.pcards .shoe{position:relative;z-index:3;width:90%;height:90%;object-fit:contain;mix-blend-mode:multiply;transform:rotate(-7deg);animation:pcfl 3.6s ease-in-out infinite;transition:transform .5s cubic-bezier(.2,.85,.25,1)}.pcards .wom .shoe{animation-delay:.5s}.pcards .kid .shoe{animation-delay:1s;animation-name:pcflk;transform:rotate(6deg)}@keyframes pcfl{0%,100%{transform:rotate(-7deg) translateY(0)}50%{transform:rotate(-7deg) translateY(-15px)}}@keyframes pcflk{0%,100%{transform:rotate(6deg) translateY(0)}50%{transform:rotate(6deg) translateY(-15px)}}.pcards .card:hover .shoe{transform:rotate(0) scale(1.13) translateY(-6px);animation-play-state:paused}.pcards .shadow{position:absolute;z-index:1;left:50%;bottom:11%;transform:translateX(-50%);width:55%;height:24px;border-radius:50%;background:rgba(0,0,0,.17);filter:blur(13px)}.pcards .sticker{position:absolute;z-index:4;top:14px;right:14px;width:74px;height:74px;display:grid;place-items:center;animation:pcwob 5s ease-in-out infinite;transition:transform .5s cubic-bezier(.2,.85,.25,1)}@keyframes pcwob{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(4deg)}}.pcards .card:hover .sticker{transform:rotate(22deg) scale(1.12)}.pcards .sticker svg{position:absolute;inset:0;width:100%;height:100%}.pcards .sticker span{position:relative;z-index:2;font-family:'Fredoka',sans-serif;font-weight:700;font-size:.6rem;line-height:1;text-align:center;text-transform:uppercase;color:#fff;width:54px}.pcards .info{padding:20px 22px 24px;display:flex;flex-direction:column;gap:10px;flex:1}.pcards .pill{align-self:flex-start;font-family:'Fredoka',sans-serif;font-weight:600;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:999px}.pcards .men .pill{background:#fff1c9;color:#a8780d}.pcards .wom .pill{background:#e7ebff;color:#404fb5}.pcards .kid .pill{background:#ffe1da;color:#d23420}.pcards .t{font-family:'Fredoka',sans-serif;font-weight:700;font-size:1.7rem;letter-spacing:-.01em}.pcards .d{color:var(--muted);font-size:.95rem;line-height:1.5;flex:1}.pcards .shop{align-self:flex-start;margin-top:4px;display:inline-flex;align-items:center;gap:9px;font-family:'Fredoka',sans-serif;font-weight:600;font-size:.98rem;color:#fff;padding:13px 22px;border-radius:999px;text-decoration:none;transition:transform .25s cubic-bezier(.34,1.56,.64,1),gap .3s,filter .3s}.pcards .men .shop{background:#1c1a16}.pcards .wom .shop{background:#2e3a8c}.pcards .kid .shop{background:#e5392b}.pcards .shop:hover{gap:14px;transform:translateY(-2px) scale(1.04);filter:brightness(1.08)}@media(prefers-reduced-motion:reduce){.pcards *{animation:none!important}}";
const CATS = [
  {key:"men",cls:"men",img:"/mens.jpg",sf:"#1c1a16",sticker:"Work Ready",pill:"Men's",title:"Built to Work",desc:"Rugged boots and tough kicks for long days — waterproof builds, serious grip.",cta:"Shop Men's",href:"/shop/mens"},
  {key:"wom",cls:"wom",img:"/womens.jpg",sf:"#5b6cf0",sticker:"So Comfy",pill:"Women's",title:"All-Day Easy",desc:"Lightweight slip-ons and memory-foam comfort that move from morning to night.",cta:"Shop Women's",href:"/shop/womens"},
  {key:"kid",cls:"kid",img:"/kids.jpg",sf:"#e5392b",sticker:"Kid Fave",pill:"Kids'",title:"Little Legends",desc:"Fun, comfy, easy-on sneakers for playgrounds and classrooms.",cta:"Shop Kids'",href:"/shop/kids"},
];
function Star({fill}){return React.createElement("svg",{viewBox:"0 0 100 100"},React.createElement("path",{d:"M50 4l9 13 15-6 2 16 16 4-9 13 9 13-16 4-2 16-15-6-9 13-9-13-15 6-2-16-16-4 9-13-9-13 16-4 2-16 15 6z",fill}));}
function Arr(){return React.createElement("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.6",strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M5 12h14M13 6l6 6-6 6"}));}
import React from "react";
export default function CategoryCards(){
  return(
    React.createElement("section",{className:"pcards"},
      React.createElement("style",{dangerouslySetInnerHTML:{__html:CSS}}),
      React.createElement("div",{className:"wrap"},
        React.createElement("div",{className:"head"},
          React.createElement("img",{className:"panda",src:"/panda-logo.png",alt:"Panda Shoes"})
        ),
        React.createElement("h2",{className:"title-lg"},
          "Pick your ",React.createElement("span",{className:"y"},"pair"),", ",
          React.createElement("span",{className:"b"},"find")," your ",
          React.createElement("span",{className:"r"},"fit")
        ),
        React.createElement("p",{className:"sub"},"Work-ready boots, all-day comfort, and little-feet favorites."),
        React.createElement("div",{className:"grid"},
          CATS.map(c=>React.createElement("article",{className:"card "+c.cls,key:c.key},
            React.createElement("div",{className:"stage"},
              React.createElement("div",{className:"sticker"},React.createElement(Star,{fill:c.sf}),React.createElement("span",null,c.sticker)),
              React.createElement("div",{className:"shadow"}),
              React.createElement("img",{className:"shoe",src:c.img,alt:c.pill})
            ),
            React.createElement("div",{className:"info"},
              React.createElement("span",{className:"pill"},c.pill),
              React.createElement("h3",{className:"t"},c.title),
              React.createElement("p",{className:"d"},c.desc),
              React.createElement("a",{className:"shop",href:c.href},c.cta," ",React.createElement(Arr,null))
            )
          ))
        )
      )
    )
  );
}

// ===========================================
// more.js — AvicnKnov Premium "More" Section
// Glassmorphic · Live Animated · Fully Responsive
// ===========================================

function init_tabContentMore(){
  const container = document.getElementById('tabContentMore');
  if(!container) return;

  // Inject styles (scoped to this section)
  if(!document.getElementById('moreStyles')){
    const style = document.createElement('style');
    style.id = 'moreStyles';
    style.textContent = `
      /* ===== MORE SECTION ROOT ===== */
      .more-root{
        position:relative;
        width:100%;
        min-height:100vh;
        padding:40px clamp(16px,4vw,60px) 80px;
        overflow:hidden;
        background:#000;
      }

      /* ===== LIVE ANIMATED BACKGROUND ===== */
      .more-bg{
        position:absolute;inset:0;z-index:0;pointer-events:none;
        background:
          radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.05) 0%, transparent 40%),
          radial-gradient(ellipse at 80% 90%, rgba(255,255,255,0.04) 0%, transparent 45%),
          #050505;
      }
      .more-bg-grid{
        position:absolute;inset:0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size:60px 60px;
        mask-image:radial-gradient(ellipse at center, #000 30%, transparent 80%);
        -webkit-mask-image:radial-gradient(ellipse at center, #000 30%, transparent 80%);
        animation:gridShift 40s linear infinite;
      }
      @keyframes gridShift{
        0%{background-position:0 0,0 0;}
        100%{background-position:60px 60px,60px 60px;}
      }
      .more-bg svg.map-svg{
        position:absolute;inset:0;width:100%;height:100%;
        opacity:0.18;
      }
      .map-path{
        fill:none;stroke:#fff;stroke-width:1.2;
        stroke-dasharray:8 6;
        animation:dashFlow 18s linear infinite;
      }
      @keyframes dashFlow{to{stroke-dashoffset:-300;}}

      /* Floating particles */
      .more-particle{
        position:absolute;
        width:3px;height:3px;
        background:#fff;border-radius:50%;
        opacity:0;
        pointer-events:none;
        box-shadow:0 0 8px #fff;
      }

      /* ===== CONTENT WRAPPER ===== */
      .more-content{
        position:relative;z-index:2;
        max-width:1400px;margin:0 auto;
      }

      /* ===== HEADER ===== */
      .more-header{
        text-align:center;
        margin-bottom:50px;
        animation:fadeUpMore .8s ease both;
      }
      .more-badge{
        display:inline-flex;align-items:center;gap:8px;
        padding:6px 16px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.12);
        border-radius:100px;
        backdrop-filter:blur(20px);
        font-size:11px;letter-spacing:2px;text-transform:uppercase;
        color:#aaa;
        margin-bottom:18px;
      }
      .more-badge-dot{
        width:6px;height:6px;border-radius:50%;
        background:#00e676;
        box-shadow:0 0 10px #00e676;
        animation:pulseDot 1.8s infinite;
      }
      @keyframes pulseDot{0%,100%{opacity:1;}50%{opacity:0.4;}}
      .more-title{
        font-family:'Bebas Neue',sans-serif;
        font-size:clamp(38px,6vw,72px);
        letter-spacing:4px;
        background:linear-gradient(180deg,#fff 0%,#888 100%);
        -webkit-background-clip:text;
        background-clip:text;
        -webkit-text-fill-color:transparent;
        line-height:1;
        margin-bottom:14px;
      }
      .more-subtitle{
        font-size:clamp(13px,1.5vw,15px);
        color:#888;
        max-width:600px;
        margin:0 auto;
        line-height:1.7;
      }

      /* ===== GLASS CARDS ===== */
      .more-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(340px,1fr));
        gap:24px;
        margin-bottom:60px;
      }
      .glass-card{
        position:relative;
        background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%);
        border:1px solid rgba(255,255,255,0.1);
        border-radius:20px;
        padding:28px 24px;
        backdrop-filter:blur(24px) saturate(180%);
        cursor:pointer;
        overflow:hidden;
        transition:all .4s cubic-bezier(.2,.8,.2,1);
        text-decoration:none;
        color:#fff;
        display:flex;flex-direction:column;
      }
      .glass-card:hover{
        transform:translateY(-6px);
        border-color:rgba(255,255,255,0.25);
        background:linear-gradient(135deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.04) 100%);
      }
      .card-icon-wrap{
        width:56px;height:56px;
        border-radius:16px;
        background:rgba(255,255,255,0.05);
        display:flex;align-items:center;justify-content:center;
        margin-bottom:20px;
        border:1px solid rgba(255,255,255,0.1);
      }
      .card-icon-wrap svg{width:26px;height:26px;stroke:#fff;fill:none;stroke-width:1.8;}

      .card-title{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:2px;margin-bottom:10px;}
      .card-desc{font-size:13px;color:#999;line-height:1.65;margin-bottom:20px;flex:1;}
      .card-action{
        display:flex;align-items:center;justify-content:space-between;
        padding:12px 18px;
        background:rgba(255,255,255,0.04);
        border-radius:12px;
        font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;
        transition: .3s;
      }
      .glass-card:hover .card-action{background:#fff;color:#000;}

      /* ===== ROADMAP SECTION ===== */
      .more-section-title{
        font-family:'Bebas Neue',sans-serif;
        font-size:32px;letter-spacing:3px;color:#fff;
        margin:80px 0 10px;
        display:flex;align-items:center;gap:15px;
      }
      .more-section-title::before{content:'';width:4px;height:28px;background:#fff;border-radius:2px;}
      
      .roadmap-items{display:flex;flex-direction:column;gap:20px;margin-top:40px;}
      .roadmap-item{
        display:grid;grid-template-columns:1fr 60px 1fr;align-items:center;
        opacity:0;transform:translateY(30px);transition: .7s ease;
      }
      .roadmap-item.visible{opacity:1;transform:translateY(0);}

      .roadmap-card{
        background:rgba(255,255,255,0.03);
        border:1px solid rgba(255,255,255,0.08);
        padding:24px;border-radius:20px;backdrop-filter:blur(10px);
      }
      .roadmap-card-tag{
        display:inline-block;padding:4px 12px;border-radius:100px;
        font-size:9px;font-weight:800;letter-spacing:1px;margin-bottom:12px;
        background:rgba(255,255,255,0.05);color:#aaa;border:1px solid rgba(255,255,255,0.1);
      }
      .roadmap-card-tag.hot{color:#ff6400;border-color:rgba(255,100,0,0.3);background:rgba(255,100,0,0.05);}
      
      .roadmap-card-title{font-family:'Bebas Neue',sans-serif;font-size:22px;color:#fff;margin-bottom:8px;letter-spacing:1.5px;}
      .roadmap-card-desc{font-size:13px;color:#888;line-height:1.7;}
      .roadmap-card-eta{font-family:monospace;font-size:10px;color:#555;margin-top:15px;display:block;}

      .roadmap-node-col{display:flex;justify-content:center;position:relative;height:100%;}
      .roadmap-node{
        width:40px;height:40px;border-radius:50%;background:#111;
        border:1px solid rgba(255,255,255,0.2);
        display:flex;align-items:center;justify-content:center;z-index:2;
      }
      .roadmap-node svg{width:20px;height:20px;stroke:#fff;fill:none;}

      /* Alignment */
      .roadmap-item:nth-child(even) .roadmap-card-wrap{grid-column:3;}
      .roadmap-item:nth-child(even) .roadmap-node-col{grid-column:2;}
      .roadmap-item:nth-child(odd) .roadmap-card-wrap{grid-column:1;}
      .roadmap-item:nth-child(odd) .roadmap-node-col{grid-column:2;}

      @media(max-width:768px){
        .roadmap-item{grid-template-columns:50px 1fr;}
        .roadmap-item .roadmap-node-col{grid-column:1;}
        .roadmap-item .roadmap-card-wrap{grid-column:2 !important;}
      }
    `;
    document.head.appendChild(style);
  }

  const SVG = {
    ai: `<svg viewBox="0 0 24 24"><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/><circle cx="12" cy="12" r="3"/></svg>`,
    event: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    group: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><circle cx="19" cy="8" r="3"/></svg>`,
    referral: `<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`,
    copy: `<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    launchpad: `<svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13 0-3a2.1 2.1 0 0 0-3 0Z"/><path d="m12 15-3-3m1.5 1.5L22 2l-11.5 11.5Z"/><path d="M13 5.4l-.1-.1A5.8 5.8 0 0 1 12 1a5.8 5.8 0 0 1-1 4.3L11 5.4M18.6 11l.1-.1A5.8 5.8 0 0 0 23 10a5.8 5.8 0 0 0-4.3-1l-.1.1"/></svg>`,
    wallet: `<svg viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z"/></svg>`,
    nft: `<svg viewBox="0 0 24 24"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.9 1.3H2l4.9 3.5a2 2 0 0 1 .7 2.2L5.7 21 10.6 17.4a2 2 0 0 1 2.8 0L18.3 21l-1.9-5.2a2 2 0 0 1 .7-2.2L22 10.1h-6.2a2 2 0 0 1-1.9-1.3L12 3Z"/></svg>`,
    staking: `<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    analytics: `<svg viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
  };

  container.innerHTML = `
    <div class="more-root">
      <div class="more-bg"><div class="more-bg-grid"></div></div>
      <div class="more-content">
        <div class="more-header">
          <div class="more-badge"><span class="more-badge-dot"></span>THE ECOSYSTEM</div>
          <div class="more-title">AVICNKNOV UNIVERSE</div>
          <div class="more-subtitle">A high-performance trading suite designed for the next generation of professional traders. One platform, infinite possibilities.</div>
        </div>

        <div class="more-grid">
          <a class="glass-card" href="trading.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg></div>
            <div class="card-title">SPOT TRADING</div>
            <div class="card-desc">Trade instantly with deep liquidity and zero slippage on our institutional-grade engine. Access hundreds of pairs with industry-leading security and ultra-fast execution speeds today.</div>
            <div class="card-action">Enter Terminal <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </a>
          <a class="glass-card" href="futures.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
            <div class="card-title">FUTURES PRO</div>
            <div class="card-desc">Maximize your capital with up to 100x leverage on perpetual contracts. Experience low-latency trading with advanced order types, real-time funding rates, and professional risk management tools.</div>
            <div class="card-action">Trade Futures <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
          </a>
        </div>

        <div class="more-section-title">PLATFORM ROADMAP</div>
        <div class="roadmap-items">
          <!-- 1. AI -->
          <div class="roadmap-item">
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag hot">NEXT GEN AI</div>
                <div class="roadmap-card-title">AI NEURAL INTELLIGENCE</div>
                <div class="roadmap-card-desc">A proprietary neural engine trained on 240+ live market signals—including whale tracking and sentiment radar. It reads the complex market data so you don't have to. Your edge, supercharged.</div>
                <span class="roadmap-card-eta">ETA: Q3 2025</span>
              </div>
            </div>
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.ai}</div></div>
          </div>

          <!-- 2. Events -->
          <div class="roadmap-item">
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.event}</div></div>
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag">LIVE FEED</div>
                <div class="roadmap-card-title">MARKET EVENTS ENGINE</div>
                <div class="roadmap-card-desc">Real-time event feeds featuring token launches, protocol upgrades, and global macro announcements. Get notified the second volatility strikes, ensuring you are always the first to know and act.</div>
                <span class="roadmap-card-eta">ETA: Q3 2025</span>
              </div>
            </div>
          </div>

          <!-- 3. Groups -->
          <div class="roadmap-item">
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag hot">SOCIAL</div>
                <div class="roadmap-card-title">TRADER GROUPS & SIGNALS</div>
                <div class="roadmap-card-desc">Join elite trader collectives and access curated signal groups directly inside AvicnKnov. Share live setups, copy winning strategies, and claim your spot in the most profitable trading alpha communities.</div>
                <span class="roadmap-card-eta">ETA: Q4 2025</span>
              </div>
            </div>
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.group}</div></div>
          </div>

          <!-- 4. Referral -->
          <div class="roadmap-item">
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.referral}</div></div>
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag">PASSIVE</div>
                <div class="roadmap-card-title">REFERRAL EMPIRE</div>
                <div class="roadmap-card-desc">Build your own revenue stream by inviting your network. Earn up to 40% lifetime commissions on every trade made by your referrals across spot, futures, and all ecosystem products.</div>
                <span class="roadmap-card-eta">ETA: Q4 2025</span>
              </div>
            </div>
          </div>

          <!-- 5. Copy Trading -->
          <div class="roadmap-item">
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag hot">AUTOMATED</div>
                <div class="roadmap-card-title">COPY TRADING VAULTS</div>
                <div class="roadmap-card-desc">Mirror the exact moves of world-class traders in real-time with a single click. Allocate capital into audited strategy vaults and capture massive upside without manual monitoring or complex setup.</div>
                <span class="roadmap-card-eta">ETA: Q1 2026</span>
              </div>
            </div>
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.copy}</div></div>
          </div>

          <!-- 6. Launchpad -->
          <div class="roadmap-item">
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.launchpad}</div></div>
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag">EXCLUSIVE</div>
                <div class="roadmap-card-title">AQUARIUS LAUNCHPAD</div>
                <div class="roadmap-card-desc">Access high-potential, AI-vetted token launches before they hit the mainstream market. Our rigorous 72-hour due-diligence process ensures that only hyper-curated, safe, and audited projects reach our exclusive members.</div>
                <span class="roadmap-card-eta">ETA: Q1 2026</span>
              </div>
            </div>
          </div>

          <!-- 7. Smart Wallet -->
          <div class="roadmap-item">
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag">SECURITY</div>
                <div class="roadmap-card-title">SMART WALLET SUITE</div>
                <div class="roadmap-card-desc">A fully non-custodial smart wallet integrated directly into the platform. Manage assets across 30+ chains with multi-sig security, biometric authentication, and institutional-grade control within a sleek mobile interface.</div>
                <span class="roadmap-card-eta">ETA: Q2 2026</span>
              </div>
            </div>
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.wallet}</div></div>
          </div>

          <!-- 8. NFT -->
          <div class="roadmap-item">
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.nft}</div></div>
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag">DIGITAL ASSETS</div>
                <div class="roadmap-card-title">NFT MARKETPLACE PRO</div>
                <div class="roadmap-card-desc">Trade and fractionalize blue-chip NFTs with zero gas friction. Our marketplace aggregates floor prices and rarity scores, allowing you to flip digital assets using professional trading tools and precision.</div>
                <span class="roadmap-card-eta">ETA: Q2 2026</span>
              </div>
            </div>
          </div>

          <!-- 9. Staking -->
          <div class="roadmap-item">
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag hot">YIELD</div>
                <div class="roadmap-card-title">STAKING & YIELD VAULTS</div>
                <div class="roadmap-card-desc">Put your idle capital to work with automated yield optimization. Earn maximum APY across battle-tested DeFi protocols while maintaining full liquidity control with our flexible, high-security staking lock-up terms.</div>
                <span class="roadmap-card-eta">ETA: Q3 2026</span>
              </div>
            </div>
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.staking}</div></div>
          </div>

          <!-- 10. Analytics -->
          <div class="roadmap-item">
            <div class="roadmap-node-col"><div class="roadmap-node">${SVG.analytics}</div></div>
            <div class="roadmap-card-wrap">
              <div class="roadmap-card">
                <div class="roadmap-card-tag">DATA</div>
                <div class="roadmap-card-title">ADVANCED ANALYTICS HUB</div>
                <div class="roadmap-card-desc">Institutional-grade market data featuring on-chain flow analysis and liquidation cluster mapping. Understand exactly where big money is positioned before major moves happen with our unified data-driven pro dashboard.</div>
                <span class="roadmap-card-eta">ETA: Q3 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Animation Trigger
  const updateRoadmap = () => {
    container.querySelectorAll('.roadmap-item').forEach(item => {
      if(item.getBoundingClientRect().top < window.innerHeight * 0.85) item.classList.add('visible');
    });
  };
  window.addEventListener('scroll', updateRoadmap);
  setTimeout(updateRoadmap, 100);
}

init_tabContentMore();

// ===========================================
// more.js — AvicnKnov Premium "More" Section
// Clean Version: Removed Stats, Graphs, and Specific Cards
// ===========================================

function init_tabContentMore(){
  const container = document.getElementById('tabContentMore');
  if(!container) return;

  // Inject styles
  if(!document.getElementById('moreStyles')){
    const style = document.createElement('style');
    style.id = 'moreStyles';
    style.textContent = `
      .more-root{
        position:relative; width:100%; min-height:100vh;
        padding:40px clamp(16px,4vw,60px) 80px; overflow:hidden; background:#000;
      }
      .more-bg{ position:absolute;inset:0;z-index:0;pointer-events:none; background:#050505; }
      .more-bg-grid{
        position:absolute;inset:0;
        background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size:60px 60px; animation:gridShift 40s linear infinite;
      }
      @keyframes gridShift{ 0%{background-position:0 0;} 100%{background-position:60px 60px;} }
      
      .more-bg svg.map-svg{ position:absolute;inset:0;width:100%;height:100%; opacity:0.15; }
      .map-path{ fill:none;stroke:#fff;stroke-width:1; stroke-dasharray:8 6; animation:dashFlow 18s linear infinite; }
      @keyframes dashFlow{to{stroke-dashoffset:-300;}}

      .more-content{ position:relative;z-index:2; max-width:1400px;margin:0 auto; }
      .more-header{ text-align:center; margin-bottom:50px; animation:fadeUpMore .8s ease both; }
      .more-badge{
        display:inline-flex;align-items:center;gap:8px; padding:6px 16px;
        background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12);
        border-radius:100px; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#aaa; margin-bottom:18px;
      }
      .more-title{
        font-family:'Bebas Neue',sans-serif; font-size:clamp(38px,6vw,72px);
        letter-spacing:4px; background:linear-gradient(180deg,#fff 0%,#888 100%);
        -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:14px;
      }
      .more-subtitle{ font-size:clamp(13px,1.5vw,15px); color:#888; max-width:600px; margin:0 auto; line-height:1.7; }

      .more-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; margin-bottom:60px; }
      .more-grid.featured{ grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:24px; }

      .glass-card{
        position:relative; background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%);
        border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:28px 24px;
        backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
        cursor:pointer; text-decoration:none; color:#fff; display:flex; flex-direction:column;
        transition:all .4s cubic-bezier(.2,.8,.2,1); animation:cardEntry .8s ease forwards;
      }
      @keyframes cardEntry{ from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
      
      .glass-card:hover{ transform:translateY(-6px); border-color:rgba(255,255,255,0.25); background:rgba(255,255,255,0.08); }

      .card-icon-wrap{
        width:56px;height:56px; border-radius:16px; background:rgba(255,255,255,0.08);
        display:flex; align-items:center; justify-content:center; margin-bottom:20px;
      }
      .card-icon-wrap svg{ width:26px; height:26px; stroke:#fff; stroke-width:1.8; fill:none; }

      .card-title{ font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; margin-bottom:10px; }
      .card-desc{ font-size:13px; color:#999; line-height:1.65; margin-bottom:24px; flex:1; }

      .card-action{
        display:flex; align-items:center; justify-content:space-between;
        padding:12px 18px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);
        border-radius:12px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1.5px; transition:all .3s;
      }
      .glass-card:hover .card-action{ background:#fff; color:#000; }

      .card-live-badge{
        position:absolute; top:18px; right:18px; padding:3px 9px;
        background:rgba(0,230,118,0.1); border:1px solid rgba(0,230,118,0.3);
        border-radius:100px; font-size:9px; color:#00e676; font-family:monospace;
      }

      .more-section-title{
        font-family:'Bebas Neue',sans-serif; font-size:26px; letter-spacing:3px; color:#fff;
        margin:60px 0 8px; display:flex; align-items:center; gap:12px;
      }
      .more-section-title::before{ content:''; width:4px; height:20px; background:#fff; border-radius:2px; }
      .more-section-sub{ font-size:12px; color:#666; text-transform:uppercase; margin-bottom:28px; }

      .cta-panel{
        padding:50px 40px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1);
        border-radius:24px; text-align:center; backdrop-filter:blur(20px);
      }
      .cta-title{ font-family:'Bebas Neue',sans-serif; font-size:36px; margin-bottom:12px; }
      .cta-buttons{ display:flex; justify-content:center; gap:14px; margin-top:24px; }
      .cta-btn{
        padding:14px 32px; border-radius:12px; font-size:13px; font-weight:700; text-transform:uppercase;
        text-decoration:none; transition:all .3s;
      }
      .cta-btn-primary{ background:#fff; color:#000; }
      .cta-btn-secondary{ background:rgba(255,255,255,0.05); color:#fff; border:1px solid rgba(255,255,255,0.2); }

      @media(max-width:768px){
        .more-grid,.more-grid.featured{ grid-template-columns:1fr; }
        .cta-buttons{ flex-direction:column; }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== BUILD HTML =====
  container.innerHTML = `
    <div class="more-root">
      <div class="more-bg">
        <div class="more-bg-grid"></div>
        <svg class="map-svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path class="map-path" d="M50,400 Q200,200 400,350 T800,300 Q1000,250 1150,450"/>
          <path class="map-path" d="M100,600 Q300,500 500,650 T900,550" style="animation-delay:-3s"/>
        </svg>
      </div>

      <div class="more-content">
        <!-- Header -->
        <div class="more-header">
          <div class="more-badge">EXPLORE THE ECOSYSTEM</div>
          <div class="more-title">MORE FROM AVICNKNOV</div>
          <div class="more-subtitle">Discover everything our platform offers — from live trading to advanced tools and the entire universe.</div>
        </div>

        <!-- Core Trading -->
        <div class="more-section-title">CORE TRADING</div>
        <div class="more-section-sub">Direct access to live markets</div>
        <div class="more-grid featured">
          
          <a class="glass-card" href="trading.html">
            <span class="card-live-badge">LIVE</span>
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            </div>
            <div class="card-title">SPOT TRADING</div>
            <div class="card-desc">Trade 150+ crypto pairs instantly on AvicnKnov's lightning-fast spot engine with deep liquidity.</div>
            <div class="card-action">
              <span>Start Trading Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="futures.html">
            <span class="card-live-badge">LIVE</span>
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><path d="M3 3v18h18"/></svg>
            </div>
            <div class="card-title">FUTURES & DERIVATIVES</div>
            <div class="card-desc">Access perpetual contracts with up to 100x leverage and high-conviction execution.</div>
            <div class="card-action">
              <span>Explore Futures</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>
        </div>

        <!-- Advanced Tools -->
        <div class="more-section-title">ADVANCED TOOLS</div>
        <div class="more-section-sub">Infrastructure for serious traders</div>
        <div class="more-grid">
          <a class="glass-card" href="trading.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg></div>
            <div class="card-title">PRO CHARTS</div>
            <div class="card-desc">TradingView-grade charting with 100+ indicators and multi-timeframe analysis.</div>
            <div class="card-action"><span>Open Charts</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
          </a>

          <a class="glass-card" href="trading.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg></div>
            <div class="card-title">PAPER TRADING</div>
            <div class="card-desc">Practice with real market data and zero risk using our simulated engine.</div>
            <div class="card-action"><span>Start Practicing</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
          </a>

          <a class="glass-card" href="profile.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <div class="card-title">SECURITY CENTER</div>
            <div class="card-desc">Manage 2FA, biometric login, and real-time security audit logs.</div>
            <div class="card-action"><span>Manage Security</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
          </a>
        </div>

        <!-- Learn & Connect -->
        <div class="more-section-title">LEARN & CONNECT</div>
        <div class="more-section-sub">Support and Community</div>
        <div class="more-grid">
          <a class="glass-card" href="help.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <div class="card-title">HELP CENTER</div>
            <div class="card-desc">24/7 live support and detailed guides for all platform features.</div>
            <div class="card-action"><span>Get Help</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
          </a>

          <a class="glass-card" href="setting.html">
            <div class="card-icon-wrap"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
            <div class="card-title">SETTINGS</div>
            <div class="card-desc">Customize theme, notifications, and trading preferences.</div>
            <div class="card-action"><span>Open Settings</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
          </a>
        </div>

        <!-- Footer CTA -->
        <div class="cta-panel">
          <div class="cta-title">READY TO TRADE?</div>
          <p style="color:#888; margin-bottom:20px;">Join millions of traders on the world's most advanced platform.</p>
          <div class="cta-buttons">
            <a class="cta-btn cta-btn-primary" href="trading.html">Launch Terminal</a>
            <a class="cta-btn cta-btn-secondary" href="futures.html">View Futures</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // 3D Tilt Effect
  container.querySelectorAll('.glass-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rotX = ((y - r.height/2)/(r.height/2)) * -5;
      const rotY = ((x - r.width/2)/(r.width/2)) * 5;
      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

// Auto-init
if(document.getElementById('tabContentMore')){ init_tabContentMore(); }

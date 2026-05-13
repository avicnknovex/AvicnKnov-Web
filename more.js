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

      /* ===== LIVE ANIMATED TREASURE-MAP BACKGROUND ===== */
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
      .map-node{
        fill:#fff;
        animation:nodePulse 2.2s ease-in-out infinite;
      }
      @keyframes nodePulse{
        0%,100%{opacity:0.3;r:3;}
        50%{opacity:1;r:5;}
      }
      .map-ring{
        fill:none;stroke:#fff;stroke-width:1;
        transform-origin:center;
        animation:ringExpand 4s ease-out infinite;
      }
      @keyframes ringExpand{
        0%{r:5;opacity:0.8;}
        100%{r:40;opacity:0;}
      }

      /* Floating particles */
      .more-particle{
        position:absolute;
        width:3px;height:3px;
        background:#fff;border-radius:50%;
        opacity:0;
        pointer-events:none;
        box-shadow:0 0 8px #fff;
      }

      /* Scanning beam */
      .more-scan{
        position:absolute;top:0;left:-100%;width:60%;height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,0.025),transparent);
        animation:scanMove 8s linear infinite;
        pointer-events:none;
      }
      @keyframes scanMove{
        0%{left:-60%;}
        100%{left:100%;}
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
      @keyframes fadeUpMore{
        from{opacity:0;transform:translateY(30px);}
        to{opacity:1;transform:translateY(0);}
      }
      .more-badge{
        display:inline-flex;align-items:center;gap:8px;
        padding:6px 16px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.12);
        border-radius:100px;
        backdrop-filter:blur(20px);
        -webkit-backdrop-filter:blur(20px);
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

      /* ===== PREMIUM GLASS GRID ===== */
      .more-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
        gap:20px;
        margin-bottom:60px;
      }

      /* Wider featured cards */
      .more-grid.featured{
        grid-template-columns:repeat(auto-fit,minmax(340px,1fr));
        gap:24px;
      }

      /* ===== PREMIUM 3D GLASS BUTTON CARD ===== */
      .glass-card{
        position:relative;
        background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%);
        border:1px solid rgba(255,255,255,0.1);
        border-radius:20px;
        padding:28px 24px;
        backdrop-filter:blur(24px) saturate(180%);
        -webkit-backdrop-filter:blur(24px) saturate(180%);
        cursor:pointer;
        overflow:hidden;
        transition:all .4s cubic-bezier(.2,.8,.2,1);
        text-decoration:none;
        color:#fff;
        display:flex;flex-direction:column;
        opacity:0;
        transform:translateY(40px);
        animation:cardEntry .8s ease forwards;
        will-change:transform;
        box-shadow:
          0 8px 24px rgba(0,0,0,0.4),
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.3);
      }
      @keyframes cardEntry{
        to{opacity:1;transform:translateY(0);}
      }

      /* Shimmer overlay */
      .glass-card::before{
        content:'';
        position:absolute;
        top:-50%;left:-50%;
        width:200%;height:200%;
        background:linear-gradient(115deg,
          transparent 30%,
          rgba(255,255,255,0.08) 45%,
          rgba(255,255,255,0.15) 50%,
          rgba(255,255,255,0.08) 55%,
          transparent 70%
        );
        transform:translateX(-100%) translateY(-100%) rotate(0deg);
        transition:transform 1.2s cubic-bezier(.2,.8,.2,1);
        pointer-events:none;
      }
      .glass-card:hover::before{
        transform:translateX(50%) translateY(50%) rotate(0deg);
      }

      /* Glow border on hover */
      .glass-card::after{
        content:'';
        position:absolute;inset:0;
        border-radius:20px;
        padding:1px;
        background:linear-gradient(135deg,rgba(255,255,255,0.4),rgba(255,255,255,0) 50%,rgba(255,255,255,0.2));
        -webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);
        -webkit-mask-composite:xor;
        mask-composite:exclude;
        opacity:0;
        transition:opacity .4s;
        pointer-events:none;
      }
      .glass-card:hover::after{opacity:1;}

      .glass-card:hover{
        transform:translateY(-6px) scale(1.01);
        border-color:rgba(255,255,255,0.25);
        background:linear-gradient(135deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.04) 100%);
        box-shadow:
          0 20px 60px rgba(0,0,0,0.6),
          0 0 40px rgba(255,255,255,0.08),
          inset 0 1px 0 rgba(255,255,255,0.2);
      }
      .glass-card:active{transform:translateY(-2px) scale(0.99);}

      /* Card icon */
      .card-icon-wrap{
        position:relative;
        width:56px;height:56px;
        border-radius:16px;
        background:linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04));
        border:1px solid rgba(255,255,255,0.15);
        display:flex;align-items:center;justify-content:center;
        margin-bottom:20px;
        box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 4px 12px rgba(0,0,0,0.3);
        transition:all .4s;
      }
      .glass-card:hover .card-icon-wrap{
        transform:rotate(-5deg) scale(1.08);
        background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08));
      }
      .card-icon-wrap svg{
        width:26px;height:26px;
        stroke:#fff;stroke-width:1.8;fill:none;
        filter:drop-shadow(0 2px 4px rgba(255,255,255,0.2));
      }
      /* Icon live pulse ring */
      .card-icon-wrap::after{
        content:'';
        position:absolute;inset:-4px;
        border-radius:18px;
        border:1px solid rgba(255,255,255,0.2);
        opacity:0;
        animation:iconRing 3s ease-in-out infinite;
      }
      @keyframes iconRing{
        0%{opacity:0;transform:scale(0.9);}
        50%{opacity:1;transform:scale(1.05);}
        100%{opacity:0;transform:scale(1.15);}
      }

      .card-title{
        font-family:'Bebas Neue',sans-serif;
        font-size:22px;letter-spacing:2px;
        margin-bottom:10px;
        color:#fff;
      }
      .card-desc{
        font-size:13px;
        color:#999;
        line-height:1.65;
        margin-bottom:20px;
        flex:1;
      }

      /* Live ticker mini graph inside card */
      .card-graph{
        position:relative;
        height:50px;
        margin-bottom:18px;
        border-radius:10px;
        background:rgba(255,255,255,0.02);
        border:1px solid rgba(255,255,255,0.06);
        overflow:hidden;
      }
      .card-graph svg{width:100%;height:100%;display:block;}
      .graph-line{
        fill:none;
        stroke:#fff;
        stroke-width:1.5;
        stroke-linecap:round;
        stroke-linejoin:round;
        filter:drop-shadow(0 0 4px rgba(255,255,255,0.5));
      }
      .graph-fill{
        fill:url(#graphGrad);
        opacity:0.4;
      }
      .graph-dot{
        fill:#fff;
        filter:drop-shadow(0 0 6px #fff);
      }

      /* Live stat row */
      .card-stats{
        display:flex;justify-content:space-between;
        padding:10px 0;
        border-top:1px solid rgba(255,255,255,0.06);
        margin-bottom:16px;
        font-family:'Space Mono',monospace;
      }
      .card-stat{
        display:flex;flex-direction:column;gap:2px;
      }
      .card-stat-label{
        font-size:9px;color:#666;
        text-transform:uppercase;letter-spacing:1px;
      }
      .card-stat-value{
        font-size:13px;color:#fff;font-weight:700;
      }
      .card-stat-value.live{color:#00e676;}

      /* Action button inside card */
      .card-action{
        display:flex;align-items:center;justify-content:space-between;
        padding:12px 18px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;
        font-size:13px;font-weight:600;
        color:#fff;
        transition:all .3s;
        text-transform:uppercase;
        letter-spacing:1.5px;
      }
      .glass-card:hover .card-action{
        background:rgba(255,255,255,0.95);
        color:#000;
        border-color:#fff;
      }
      .card-action svg{
        width:16px;height:16px;
        transition:transform .3s;
      }
      .glass-card:hover .card-action svg{transform:translateX(4px);}

      /* Live indicator badge */
      .card-live-badge{
        position:absolute;top:18px;right:18px;
        display:inline-flex;align-items:center;gap:5px;
        padding:3px 9px;
        background:rgba(0,230,118,0.1);
        border:1px solid rgba(0,230,118,0.3);
        border-radius:100px;
        font-family:'Space Mono',monospace;
        font-size:9px;font-weight:700;
        color:#00e676;
        letter-spacing:1px;
        backdrop-filter:blur(10px);
      }
      .card-live-badge::before{
        content:'';
        width:5px;height:5px;border-radius:50%;
        background:#00e676;
        box-shadow:0 0 6px #00e676;
        animation:pulseDot 1.5s infinite;
      }

      /* Soon badge */
      .card-soon-badge{
        position:absolute;top:18px;right:18px;
        padding:3px 9px;
        background:rgba(255,255,255,0.06);
        border:1px solid rgba(255,255,255,0.15);
        border-radius:100px;
        font-family:'Space Mono',monospace;
        font-size:9px;font-weight:700;
        color:#aaa;
        letter-spacing:1px;
      }

      /* ===== SECTION DIVIDER ===== */
      .more-section-title{
        font-family:'Bebas Neue',sans-serif;
        font-size:clamp(22px,3vw,30px);
        letter-spacing:3px;
        color:#fff;
        margin:60px 0 8px;
        display:flex;align-items:center;gap:14px;
      }
      .more-section-title::before{
        content:'';
        width:4px;height:24px;
        background:linear-gradient(180deg,#fff,#555);
        border-radius:2px;
      }
      .more-section-sub{
        font-size:12px;
        color:#666;
        text-transform:uppercase;
        letter-spacing:1.5px;
        margin-bottom:28px;
      }

      /* ===== INFO BANNER (Live stats) ===== */
      .info-banner{
        position:relative;
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
        gap:1px;
        background:rgba(255,255,255,0.08);
        border:1px solid rgba(255,255,255,0.12);
        border-radius:20px;
        overflow:hidden;
        backdrop-filter:blur(20px);
        margin-bottom:60px;
        animation:fadeUpMore .8s .2s ease both;
      }
      .info-cell{
        position:relative;
        background:rgba(10,10,10,0.7);
        padding:24px 20px;
        text-align:center;
        overflow:hidden;
      }
      .info-cell::before{
        content:'';
        position:absolute;top:0;left:-100%;width:100%;height:2px;
        background:linear-gradient(90deg,transparent,#fff,transparent);
        animation:topBeam 4s linear infinite;
      }
      @keyframes topBeam{
        0%{left:-100%;}100%{left:100%;}
      }
      .info-cell-value{
        font-family:'Bebas Neue',sans-serif;
        font-size:clamp(24px,3vw,34px);
        letter-spacing:2px;
        color:#fff;
        margin-bottom:4px;
      }
      .info-cell-label{
        font-size:10px;
        color:#888;
        text-transform:uppercase;
        letter-spacing:1.5px;
        font-family:'Space Mono',monospace;
      }
      .info-cell-live{
        display:inline-block;
        width:6px;height:6px;border-radius:50%;
        background:#00e676;
        margin-right:5px;
        animation:pulseDot 1.5s infinite;
        vertical-align:middle;
      }

      /* ===== CTA FOOTER PANEL ===== */
      .cta-panel{
        position:relative;
        padding:50px 40px;
        background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01));
        border:1px solid rgba(255,255,255,0.12);
        border-radius:24px;
        text-align:center;
        backdrop-filter:blur(20px);
        overflow:hidden;
      }
      .cta-panel::before{
        content:'';
        position:absolute;inset:0;
        background:radial-gradient(circle at 50% 0%,rgba(255,255,255,0.1),transparent 70%);
        pointer-events:none;
      }
      .cta-title{
        font-family:'Bebas Neue',sans-serif;
        font-size:clamp(28px,4vw,42px);
        letter-spacing:3px;
        margin-bottom:12px;
        position:relative;
      }
      .cta-desc{
        font-size:14px;color:#999;
        max-width:560px;margin:0 auto 24px;
        line-height:1.7;
        position:relative;
      }
      .cta-buttons{
        display:flex;justify-content:center;gap:14px;flex-wrap:wrap;
        position:relative;
      }
      .cta-btn{
        padding:14px 32px;
        border-radius:12px;
        font-family:'DM Sans',sans-serif;
        font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
        text-decoration:none;
        cursor:pointer;
        transition:all .3s cubic-bezier(.2,.8,.2,1);
        display:inline-flex;align-items:center;gap:8px;
      }
      .cta-btn-primary{
        background:#fff;color:#000;
        border:1px solid #fff;
        box-shadow:0 4px 20px rgba(255,255,255,0.2);
      }
      .cta-btn-primary:hover{
        transform:translateY(-3px);
        box-shadow:0 8px 30px rgba(255,255,255,0.35);
      }
      .cta-btn-secondary{
        background:rgba(255,255,255,0.05);
        color:#fff;
        border:1px solid rgba(255,255,255,0.2);
        backdrop-filter:blur(10px);
      }
      .cta-btn-secondary:hover{
        background:rgba(255,255,255,0.1);
        border-color:#fff;
        transform:translateY(-3px);
      }

      /* ===== RESPONSIVE ===== */
      @media(max-width:768px){
        .more-root{padding:24px 16px 60px;}
        .more-grid,.more-grid.featured{grid-template-columns:1fr;gap:16px;}
        .glass-card{padding:24px 20px;}
        .info-banner{grid-template-columns:1fr 1fr;}
        .cta-panel{padding:32px 22px;}
        .cta-buttons{flex-direction:column;}
        .cta-btn{width:100%;justify-content:center;}
      }
      @media(max-width:420px){
        .info-banner{grid-template-columns:1fr;}
        .more-title{font-size:38px;}
      }
    `;
    document.head.appendChild(style);
  }

  // ===== BUILD HTML =====
  container.innerHTML = `
    <div class="more-root">
      <!-- Animated Background -->
      <div class="more-bg">
        <div class="more-bg-grid"></div>
        <svg class="map-svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <radialGradient id="nodeGrad">
              <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <path class="map-path" d="M50,400 Q200,200 400,350 T800,300 Q1000,250 1150,450"/>
          <path class="map-path" d="M100,600 Q300,500 500,650 T900,550 Q1050,500 1180,600" style="animation-delay:-3s"/>
          <path class="map-path" d="M80,150 Q280,80 480,180 T880,150 Q1040,120 1170,200" style="animation-delay:-6s"/>
          <circle class="map-node" cx="200" cy="280" r="3"/>
          <circle class="map-node" cx="500" cy="350" r="3" style="animation-delay:-0.5s"/>
          <circle class="map-node" cx="800" cy="300" r="3" style="animation-delay:-1s"/>
          <circle class="map-node" cx="350" cy="600" r="3" style="animation-delay:-1.5s"/>
          <circle class="map-node" cx="700" cy="580" r="3" style="animation-delay:-2s"/>
          <circle class="map-node" cx="1000" cy="450" r="3" style="animation-delay:-2.5s"/>
          <circle class="map-ring" cx="500" cy="350" r="5"/>
          <circle class="map-ring" cx="800" cy="300" r="5" style="animation-delay:-1.5s"/>
          <circle class="map-ring" cx="350" cy="600" r="5" style="animation-delay:-2.5s"/>
        </svg>
        <div class="more-scan"></div>
      </div>

      <!-- Content -->
      <div class="more-content">

        <!-- Header -->
        <div class="more-header">
          <div class="more-badge">
            <span class="more-badge-dot"></span>
            EXPLORE THE ECOSYSTEM
          </div>
          <div class="more-title">MORE FROM AVICNKNOV</div>
          <div class="more-subtitle">Discover everything our platform offers — from live trading and futures to upcoming launches, advanced tools and the entire AvicnKnov universe.</div>
        </div>

        <!-- Live Stats Banner -->
        <div class="info-banner">
          <div class="info-cell">
            <div class="info-cell-value" id="liveVol">$0.00</div>
            <div class="info-cell-label"><span class="info-cell-live"></span>24H Volume</div>
          </div>
          <div class="info-cell">
            <div class="info-cell-value" id="liveTrades">0</div>
            <div class="info-cell-label"><span class="info-cell-live"></span>Live Trades / sec</div>
          </div>
          <div class="info-cell">
            <div class="info-cell-value" id="liveUsers">0</div>
            <div class="info-cell-label"><span class="info-cell-live"></span>Active Traders</div>
          </div>
          <div class="info-cell">
            <div class="info-cell-value" id="livePairs">0</div>
            <div class="info-cell-label"><span class="info-cell-live"></span>Active Pairs</div>
          </div>
        </div>

        <!-- Primary Trading Section -->
        <div class="more-section-title">CORE TRADING</div>
        <div class="more-section-sub">Direct access to live markets and derivatives</div>
        <div class="more-grid featured">

          <!-- TRADING CARD -->
          <a class="glass-card" href="trading.html" style="animation-delay:.05s">
            <span class="card-live-badge">LIVE</span>
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            </div>
            <div class="card-title">SPOT TRADING</div>
            <div class="card-desc">Trade 150+ crypto pairs instantly on AvicnKnov's lightning-fast spot engine. Click the action below to enter the live trading terminal and start trading right now with deep liquidity and sub-millisecond execution.</div>
            <div class="card-graph">
              <svg viewBox="0 0 200 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path class="graph-fill" id="graphFill1"></path>
                <path class="graph-line" id="graphLine1"></path>
                <circle class="graph-dot" id="graphDot1" r="2.5"></circle>
              </svg>
            </div>
            <div class="card-stats">
              <div class="card-stat"><span class="card-stat-label">Status</span><span class="card-stat-value live">● ONLINE</span></div>
              <div class="card-stat"><span class="card-stat-label">Latency</span><span class="card-stat-value">0.24ms</span></div>
              <div class="card-stat"><span class="card-stat-label">Pairs</span><span class="card-stat-value">150+</span></div>
            </div>
            <div class="card-action">
              <span>Start Trading Now</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <!-- FUTURES CARD -->
          <a class="glass-card" href="futures.html" style="animation-delay:.15s">
            <span class="card-live-badge">LIVE</span>
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><path d="M3 3v18h18"/></svg>
            </div>
            <div class="card-title">FUTURES &amp; DERIVATIVES</div>
            <div class="card-desc">Access perpetual contracts with up to 100x leverage. View detailed market depth, funding rates, open interest, and execute high-conviction trades on our advanced derivatives engine.</div>
            <div class="card-graph">
              <svg viewBox="0 0 200 50" preserveAspectRatio="none">
                <path class="graph-fill" id="graphFill2"></path>
                <path class="graph-line" id="graphLine2"></path>
                <circle class="graph-dot" id="graphDot2" r="2.5"></circle>
              </svg>
            </div>
            <div class="card-stats">
              <div class="card-stat"><span class="card-stat-label">Leverage</span><span class="card-stat-value">100x</span></div>
              <div class="card-stat"><span class="card-stat-label">Open Int.</span><span class="card-stat-value" id="liveOI">$0</span></div>
              <div class="card-stat"><span class="card-stat-label">Funding</span><span class="card-stat-value live">+0.012%</span></div>
            </div>
            <div class="card-action">
              <span>Explore Futures</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>
        </div>

        <!-- Advanced Tools Section -->
        <div class="more-section-title">ADVANCED TOOLS</div>
        <div class="more-section-sub">Professional infrastructure for serious traders</div>
        <div class="more-grid">

          <a class="glass-card" href="trading.html" style="animation-delay:.05s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>
            </div>
            <div class="card-title">PRO CHARTS</div>
            <div class="card-desc">TradingView-grade charting with 100+ indicators, drawing tools, multi-timeframe analysis and live order-book heatmaps.</div>
            <div class="card-action">
              <span>Open Charts</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="futures.html" style="animation-delay:.1s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/></svg>
            </div>
            <div class="card-title">AI INTELLIGENCE</div>
            <div class="card-desc">Proprietary neural engine analyzing 240+ market signals in real time. Predictive sentiment, whale tracking and trade setups.</div>
            <div class="card-action">
              <span>Activate AI</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="trading.html" style="animation-delay:.15s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </div>
            <div class="card-title">PAPER TRADING</div>
            <div class="card-desc">Practice with real market data and zero risk. The same engine, the same liquidity — without using a single rupee of capital.</div>
            <div class="card-action">
              <span>Start Practicing</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="profile.html" style="animation-delay:.2s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div class="card-title">PORTFOLIO</div>
            <div class="card-desc">Track every position, every trade, every P&amp;L event. Real-time portfolio analytics with cross-asset performance breakdown.</div>
            <div class="card-action">
              <span>View Portfolio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="trading.html" style="animation-delay:.25s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <div class="card-title">AQUARIUS LAUNCHPAD</div>
            <div class="card-desc">Be first in line for hyper-curated token launches. AI-vetted contracts and exclusive early access for AvicnKnov members.</div>
            <div class="card-action">
              <span>View Launches</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="profile.html" style="animation-delay:.3s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div class="card-title">SECURITY CENTER</div>
            <div class="card-desc">2FA, biometric login, withdrawal whitelists, anti-phishing codes, device management and a real-time security audit log.</div>
            <div class="card-action">
              <span>Manage Security</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>
        </div>

        <!-- Learn & Community Section -->
        <div class="more-section-title">LEARN &amp; CONNECT</div>
        <div class="more-section-sub">Knowledge, support and the AvicnKnov community</div>
        <div class="more-grid">

          <a class="glass-card" href="help.html" style="animation-delay:.05s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="card-title">HELP CENTER</div>
            <div class="card-desc">24/7 live support with sub-2-minute response times. Browse guides, FAQs and contact our team directly.</div>
            <div class="card-action">
              <span>Get Help</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="about.html" style="animation-delay:.1s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div class="card-title">ABOUT AVICNKNOV</div>
            <div class="card-desc">Our story, our mission and the team building the future of decentralized finance. Discover what makes us different.</div>
            <div class="card-action">
              <span>Read More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="service.html" style="animation-delay:.15s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div class="card-title">TERMS OF SERVICE</div>
            <div class="card-desc">Read our legal terms, user agreements and platform policies. Transparency is part of our promise to you.</div>
            <div class="card-action">
              <span>View Terms</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="policy.html" style="animation-delay:.2s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="card-title">PRIVACY POLICY</div>
            <div class="card-desc">How we collect, protect and handle your data. Your privacy is engineered into every layer of our system.</div>
            <div class="card-action">
              <span>Read Policy</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <a class="glass-card" href="setting.html" style="animation-delay:.25s">
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <div class="card-title">SETTINGS</div>
            <div class="card-desc">Customize your experience — language, theme, notifications, regional preferences and trading defaults.</div>
            <div class="card-action">
              <span>Open Settings</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <div class="glass-card" style="animation-delay:.3s;cursor:default;">
            <span class="card-soon-badge">SOON</span>
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="card-title">REFERRAL PROGRAM</div>
            <div class="card-desc">Earn up to 40% lifetime commission on every friend you invite to AvicnKnov. Launching very soon — stay tuned.</div>
            <div class="card-action" style="opacity:.6;">
              <span>Coming Soon</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
        </div>

        <!-- Final CTA Panel -->
        <div class="cta-panel">
          <div class="cta-title">READY TO TRADE?</div>
          <div class="cta-desc">Join 2 million+ traders already using AvicnKnov to navigate the world's deepest crypto markets with institutional precision.</div>
          <div class="cta-buttons">
            <a class="cta-btn cta-btn-primary" href="trading.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Launch Terminal
            </a>
            <a class="cta-btn cta-btn-secondary" href="futures.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              View Futures
            </a>
          </div>
        </div>

      </div>
    </div>
  `;

  // ===== FLOATING PARTICLES =====
  const bg = container.querySelector('.more-bg');
  for(let i=0;i<22;i++){
    const p = document.createElement('div');
    p.className = 'more-particle';
    p.style.left = Math.random()*100 + '%';
    p.style.top = Math.random()*100 + '%';
    const dur = 8 + Math.random()*12;
    const delay = Math.random()*8;
    p.style.animation = `partFloat ${dur}s ${delay}s linear infinite`;
    bg.appendChild(p);
  }
  if(!document.getElementById('moreParticleAnim')){
    const s = document.createElement('style');
    s.id = 'moreParticleAnim';
    s.textContent = `
      @keyframes partFloat{
        0%{transform:translateY(0) translateX(0);opacity:0;}
        10%{opacity:0.6;}
        50%{transform:translateY(-100px) translateX(20px);opacity:1;}
        90%{opacity:0.4;}
        100%{transform:translateY(-200px) translateX(-10px);opacity:0;}
      }
    `;
    document.head.appendChild(s);
  }

  // ===== LIVE STAT COUNTERS =====
  const liveVol = document.getElementById('liveVol');
  const liveTrades = document.getElementById('liveTrades');
  const liveUsers = document.getElementById('liveUsers');
  const livePairs = document.getElementById('livePairs');
  const liveOI = document.getElementById('liveOI');

  let volBase = 2.4;
  let tradesBase = 1247;
  let usersBase = 84320;
  let pairsBase = 152;
  let oiBase = 840;

  function fmt(n,d=2){return n.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});}

  function tickStats(){
    volBase += (Math.random()-0.3)*0.002;
    tradesBase += Math.floor((Math.random()-0.4)*8);
    usersBase += Math.floor((Math.random()-0.45)*4);
    if(Math.random()>0.95) pairsBase += Math.random()>0.5?1:-1;
    oiBase += (Math.random()-0.4)*0.6;

    if(liveVol) liveVol.textContent = '$' + fmt(volBase,2) + 'B';
    if(liveTrades) liveTrades.textContent = fmt(tradesBase,0);
    if(liveUsers) liveUsers.textContent = fmt(usersBase,0);
    if(livePairs) livePairs.textContent = fmt(pairsBase,0);
    if(liveOI) liveOI.textContent = '$' + fmt(oiBase,1) + 'M';
  }
  tickStats();
  const statInt = setInterval(tickStats, 1200);

  // ===== LIVE MINI GRAPHS =====
  function buildGraph(lineId, fillId, dotId, trendUp=true){
    const line = document.getElementById(lineId);
    const fill = document.getElementById(fillId);
    const dot = document.getElementById(dotId);
    if(!line) return null;

    let points = [];
    const W = 200, H = 50;
    const N = 30;
    let base = trendUp ? 30 : 35;
    for(let i=0;i<N;i++){
      base += (Math.random()-0.5)*5 + (trendUp?0.3:-0.2);
      base = Math.max(8, Math.min(42, base));
      points.push(base);
    }

    function render(){
      const step = W/(points.length-1);
      let d = '';
      let f = `M 0 ${H} L 0 ${points[0]} `;
      points.forEach((y,i)=>{
        const x = i*step;
        d += (i===0?'M':'L') + ` ${x} ${y} `;
        if(i>0) f += `L ${x} ${y} `;
      });
      f += `L ${W} ${H} Z`;
      line.setAttribute('d', d);
      fill.setAttribute('d', f);
      if(dot){
        dot.setAttribute('cx', W);
        dot.setAttribute('cy', points[points.length-1]);
      }
    }
    render();

    return setInterval(()=>{
      points.shift();
      let last = points[points.length-1];
      last += (Math.random()-0.5)*5 + (trendUp?0.4:-0.3);
      last = Math.max(8, Math.min(42, last));
      points.push(last);
      render();
    }, 800);
  }

  const g1 = buildGraph('graphLine1','graphFill1','graphDot1', true);
  const g2 = buildGraph('graphLine2','graphFill2','graphDot2', false);

  // ===== CARD 3D TILT (mouse) =====
  container.querySelectorAll('.glass-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width/2, cy = r.height/2;
      const rotX = ((y-cy)/cy) * -4;
      const rotY = ((x-cx)/cx) * 4;
      card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });

  // Cleanup hook (if needed when leaving tab)
  container._cleanup = ()=>{
    clearInterval(statInt);
    if(g1) clearInterval(g1);
    if(g2) clearInterval(g2);
  };
}

// Auto-run if already loaded
if(document.getElementById('tabContentMore') && document.getElementById('tabContentMore').classList.contains('active')){
  init_tabContentMore();
}

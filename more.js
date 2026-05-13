.// ===========================================
// more.js — AvicnKnov Premium "Discovery" Section
// Glassmorphic · Live Path Connection · Premium
// ===========================================

function init_tabContentMore(){
  const container = document.getElementById('tabContentMore');
  if(!container) return;

  // Inject Styles
  if(!document.getElementById('moreStyles')){
    const style = document.createElement('style');
    style.id = 'moreStyles';
    style.textContent = `
      .more-root {
        position:relative; width:100%; min-height:100vh;
        padding:60px clamp(16px,4vw,60px) 100px;
        overflow:hidden; background:#000; color:#fff;
        font-family: 'DM Sans', sans-serif;
      }

      /* Background Elements */
      .more-bg { position:absolute; inset:0; z-index:0; pointer-events:none; }
      .more-bg-grid {
        position:absolute; inset:0;
        background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size:80px 80px;
        mask-image:radial-gradient(circle at center, #000, transparent 90%);
      }

      /* Header */
      .more-header { text-align:center; margin-bottom:80px; position:relative; z-index:2; }
      .more-title {
        font-family:'Bebas Neue',sans-serif; font-size:clamp(40px,8vw,80px);
        letter-spacing:4px; margin-bottom:15px;
        background: linear-gradient(180deg, #fff 30%, #555 100%);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      }
      .more-subtitle { color:#888; max-width:650px; margin:0 auto; font-size:16px; line-height:1.6; }

      /* Core Grid */
      .more-grid {
        display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap:30px; max-width:1200px; margin:0 auto 100px; position:relative; z-index:2;
      }

      /* Premium Glass Card */
      .glass-card {
        position:relative; background:rgba(255,255,255,0.03);
        border:1px solid rgba(255,255,255,0.08); border-radius:24px;
        padding:40px 30px; backdrop-filter:blur(20px);
        transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        text-decoration:none; color:inherit; display:flex; flex-direction:column;
      }
      .glass-card:hover {
        background:rgba(255,255,255,0.07); transform:translateY(-10px);
        border-color:rgba(255,255,255,0.2);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.05);
      }

      .card-icon-wrap {
        width:64px; height:64px; border-radius:18px;
        background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
        display:flex; align-items:center; justify-content:center; margin-bottom:25px;
        border:1px solid rgba(255,255,255,0.1);
      }
      .card-icon-wrap svg { width:32px; height:32px; stroke:#fff; fill:none; }

      .card-title { font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:2px; margin-bottom:12px; }
      .card-desc { color:#999; font-size:14px; line-height:1.7; margin-bottom:30px; flex:1; }

      .card-action {
        display:flex; align-items:center; justify-content:center; gap:10px;
        padding:15px; background:rgba(255,255,255,0.05); border-radius:14px;
        font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:1px;
        transition:0.3s; border:1px solid rgba(255,255,255,0.1);
      }
      .glass-card:hover .card-action { background:#fff; color:#000; }

      /* Roadmap Section (The River/Path) */
      .roadmap-section { position:relative; max-width:1000px; margin:0 auto; padding:40px 0; }
      .roadmap-svg-container {
        position:absolute; inset:0; z-index:1; width:100%; height:100%;
      }
      .roadmap-path {
        fill:none; stroke:rgba(255,255,255,0.15); stroke-width:3;
        stroke-dasharray: 10 10; animation: dashMove 20s linear infinite;
      }
      @keyframes dashMove { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }

      .roadmap-items { position:relative; z-index:2; display:flex; flex-direction:column; gap:80px; }
      .roadmap-item {
        display:flex; align-items:center; gap:30px; width:100%;
        opacity:0.8; transition:0.4s;
      }
      .roadmap-item:nth-child(even) { flex-direction: row-reverse; text-align:right; }
      .roadmap-item:hover { opacity:1; transform: scale(1.02); }

      .roadmap-node {
        width:20px; height:20px; background:#fff; border-radius:50%;
        box-shadow: 0 0 20px #fff; position:relative;
      }
      .roadmap-node::after {
        content:''; position:absolute; inset:-10px; border:1px solid #fff;
        border-radius:50%; animation: pulseNode 2s infinite;
      }
      @keyframes pulseNode { 0%{transform:scale(1); opacity:1;} 100%{transform:scale(2.5); opacity:0;} }

      .roadmap-content { flex:1; max-width:400px; }
      .roadmap-tag { font-size:10px; font-weight:800; color:#00e676; letter-spacing:2px; margin-bottom:8px; display:block; }
      .roadmap-h { font-family:'Bebas Neue',sans-serif; font-size:32px; letter-spacing:1px; margin-bottom:10px; }
      .roadmap-p { color:#777; font-size:14px; line-height:1.6; }

      @media(max-width:768px){
        .roadmap-item, .roadmap-item:nth-child(even) { flex-direction:column; text-align:center; gap:15px; }
        .roadmap-svg-container { display:none; }
      }
    `;
    document.head.appendChild(style);
  }

  // Build HTML
  container.innerHTML = `
    <div class="more-root">
      <div class="more-bg">
        <div class="more-bg-grid"></div>
      </div>

      <div class="more-header">
        <div class="more-title">AVICNKNOV ECOSYSTEM</div>
        <div class="more-subtitle">The next generation of decentralized intelligence and high-performance trading tools.</div>
      </div>

      <!-- MAIN TRADING CARDS -->
      <div class="more-grid">
        <!-- TRADING -->
        <a class="glass-card" href="trading.html">
          <div class="card-icon-wrap">
            <svg viewBox="0 0 24 24"><path d="M12 2v20m-5-5l5 5 5-5M7 7l5-5 5 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-title">TRADING</div>
          <div class="card-desc">Experience lightning-fast execution on our spot engine. Trade 150+ assets with deep liquidity and institutional-grade security.</div>
          <div class="card-action">Launch Terminal</div>
        </a>

        <!-- FUTURES -->
        <a class="glass-card" href="futures.html">
          <div class="card-icon-wrap">
            <svg viewBox="0 0 24 24" style="stroke:#00e676;">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="rgba(0,230,118,0.2)" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-title">FUTURES</div>
          <div class="card-desc">Unlock 100x leverage on perpetual contracts. Advanced risk management and real-time funding analysis for professional traders.</div>
          <div class="card-action">Enter Futures</div>
        </a>
      </div>

      <!-- UPCOMING ROADMAP (The Path) -->
      <div class="more-header" style="margin-bottom:40px;">
        <div class="more-title" style="font-size:40px;">FUTURE DISCOVERY</div>
        <p style="color:#666;">Coming soon to the AvicnKnov universe</p>
      </div>

      <div class="roadmap-section">
        <div class="roadmap-svg-container">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 400 800">
            <path class="roadmap-path" d="M200,0 C200,200 50,300 50,400 C50,500 350,600 350,700 C350,800 200,900 200,1000" />
          </svg>
        </div>

        <div class="roadmap-items">
          <!-- AI ORACLE -->
          <div class="roadmap-item">
            <div class="roadmap-content">
              <span class="roadmap-tag">INTELLIGENCE</span>
              <div class="roadmap-h">AI ORACLE NEXUS</div>
              <p class="roadmap-p">A proprietary neural engine that predicts market volatility before it happens. Connect your strategy to the ultimate brain of crypto.</p>
            </div>
            <div class="roadmap-node"></div>
            <div style="flex:1;"></div>
          </div>

          <!-- GLOBAL EVENTS -->
          <div class="roadmap-item">
            <div style="flex:1;"></div>
            <div class="roadmap-node"></div>
            <div class="roadmap-content">
              <span class="roadmap-tag">SOCIAL</span>
              <div class="roadmap-h">VORTEX EVENTS</div>
              <p class="roadmap-p">Participate in global trading tournaments and exclusive crypto summits. Real-time competition with massive prize pools.</p>
            </div>
          </div>

          <!-- SYNDICATE GROUPS -->
          <div class="roadmap-item">
            <div class="roadmap-content">
              <span class="roadmap-tag">COMMUNITY</span>
              <div class="roadmap-h">ELITE SYNDICATES</div>
              <p class="roadmap-p">Form trading guilds, share alpha in encrypted groups, and copy-trade the world's most profitable whales in one click.</p>
            </div>
            <div class="roadmap-node"></div>
            <div style="flex:1;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 3D TILT EFFECT
  container.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rotX = ((y - r.height/2) / r.height) * -10;
      const rotY = ((x - r.width/2) / r.width) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });
}

init_tabContentMore();

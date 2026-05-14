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
      .card-icon-wrap.emoji-icon{
        font-size:26px;
        line-height:1;
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

      /* ===== COMING SOON ROADMAP ===== */
      .roadmap-section{
        position:relative;
        margin:80px 0 60px;
      }
      .roadmap-svg-track{
        position:absolute;
        left:50%;
        top:0;
        transform:translateX(-50%);
        width:4px;
        height:100%;
        pointer-events:none;
        z-index:1;
      }
      @media(max-width:768px){
        .roadmap-svg-track{left:28px;transform:none;}
      }
      .roadmap-track-line{
        stroke:#222;
        stroke-width:2;
        fill:none;
      }
      .roadmap-track-live{
        stroke:url(#roadGrad);
        stroke-width:2;
        fill:none;
        stroke-dasharray:6 4;
        animation:dashFlow 3s linear infinite;
      }
      .roadmap-items{
        position:relative;
        z-index:2;
        display:flex;
        flex-direction:column;
        gap:0;
      }
      .roadmap-item{
        display:grid;
        grid-template-columns:1fr 60px 1fr;
        align-items:center;
        min-height:160px;
        opacity:0;
        transform:translateY(30px);
        transition:opacity .7s ease, transform .7s ease;
      }
      .roadmap-item.visible{
        opacity:1;
        transform:translateY(0);
      }
      .roadmap-item:nth-child(even) .roadmap-card-wrap{ grid-column:3; }
      .roadmap-item:nth-child(even) .roadmap-spacer{ grid-column:1; order:-1; }
      .roadmap-item:nth-child(even) .roadmap-node-col{ grid-column:2; order:0; }

      @media(max-width:768px){
        .roadmap-item{
          grid-template-columns:60px 1fr;
          grid-template-rows:auto;
        }
        .roadmap-item .roadmap-node-col{ grid-column:1; }
        .roadmap-item .roadmap-card-wrap{ grid-column:2; }
        .roadmap-item .roadmap-spacer{ display:none; }
        .roadmap-item:nth-child(even) .roadmap-card-wrap{ grid-column:2; }
        .roadmap-item:nth-child(even) .roadmap-spacer{ display:none; }
        .roadmap-item:nth-child(even) .roadmap-node-col{ grid-column:1; order:0; }
      }

      .roadmap-node-col{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        position:relative;
        height:100%;
      }
      .roadmap-node{
        position:relative;
        width:44px;height:44px;
        border-radius:50%;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.15);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 0 20px rgba(255,255,255,0.05);
        z-index:3;
        transition:all .4s;
        cursor:default;
      }
      .roadmap-node svg{
        width:20px;height:20px;
        stroke:#fff;stroke-width:1.7;fill:none;
        stroke-linecap:round;stroke-linejoin:round;
        filter:drop-shadow(0 0 4px rgba(255,255,255,0.3));
        transition:all .4s;
      }
      .roadmap-item.visible .roadmap-node{
        border-color:rgba(255,255,255,0.4);
        box-shadow:0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05);
      }
      .roadmap-item.visible .roadmap-node svg{
        filter:drop-shadow(0 0 8px rgba(255,255,255,0.6));
      }
      .roadmap-node-ring{
        position:absolute;inset:-8px;
        border-radius:50%;
        border:1px solid rgba(255,255,255,0.15);
        animation:nodeRingPulse 2.5s ease-in-out infinite;
      }
      @keyframes nodeRingPulse{
        0%{opacity:0;transform:scale(0.85);}
        50%{opacity:1;transform:scale(1);}
        100%{opacity:0;transform:scale(1.2);}
      }
      .roadmap-node-ring2{
        position:absolute;inset:-18px;
        border-radius:50%;
        border:1px solid rgba(255,255,255,0.06);
        animation:nodeRingPulse 2.5s 0.8s ease-in-out infinite;
      }

      /* Connector line from node to card */
      .roadmap-connector{
        position:absolute;
        top:50%;
        height:1px;
        background:linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05));
        transform-origin:left center;
        transform:scaleX(0);
        transition:transform 0.6s 0.3s ease;
        z-index:2;
        pointer-events:none;
      }
      .roadmap-item.visible .roadmap-connector{
        transform:scaleX(1);
      }
      /* For even items (right side), flip direction */
      .roadmap-item:nth-child(even) .roadmap-connector{
        background:linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.3));
        transform-origin:right center;
        right:0;
        left:auto;
      }
      @media(max-width:768px){
        .roadmap-connector{ display:none; }
      }

      .roadmap-card-wrap{
        padding:16px;
      }
      .roadmap-card{
        position:relative;
        background:linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.01) 100%);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:18px;
        padding:22px 20px;
        backdrop-filter:blur(20px);
        overflow:hidden;
        transition:all .4s cubic-bezier(.2,.8,.2,1);
      }
      .roadmap-item.visible .roadmap-card{
        border-color:rgba(255,255,255,0.15);
        box-shadow:0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.03);
      }
      .roadmap-card::before{
        content:'';
        position:absolute;top:0;left:-200%;width:80%;height:1px;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent);
        animation:topBeam 4s linear infinite;
      }
      @keyframes topBeam{0%{left:-80%;}100%{left:120%;}}

      .roadmap-card-tag{
        display:inline-flex;align-items:center;gap:6px;
        padding:3px 10px;
        background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.12);
        border-radius:100px;
        font-family:'Space Mono',monospace;
        font-size:9px;letter-spacing:1.5px;text-transform:uppercase;
        color:#888;
        margin-bottom:12px;
      }
      .roadmap-card-tag.hot{
        background:rgba(255,100,0,0.08);
        border-color:rgba(255,100,0,0.25);
        color:#ff6400;
      }
      .roadmap-card-tag.hot::before{
        content:'';
        width:5px;height:5px;border-radius:50%;
        background:#ff6400;
        box-shadow:0 0 6px #ff6400;
        animation:pulseDot 1.5s infinite;
      }
      .roadmap-card-tag.cool::before{
        content:'';
        width:5px;height:5px;border-radius:50%;
        background:#00b4ff;
        box-shadow:0 0 6px #00b4ff;
        animation:pulseDot 1.8s infinite;
      }
      .roadmap-card-tag.cool{
        background:rgba(0,180,255,0.06);
        border-color:rgba(0,180,255,0.2);
        color:#00b4ff;
      }

      .roadmap-card-title{
        font-family:'Bebas Neue',sans-serif;
        font-size:20px;letter-spacing:2px;
        color:#fff;
        margin-bottom:8px;
      }
      .roadmap-card-desc{
        font-size:12px;
        color:#888;
        line-height:1.7;
      }
      .roadmap-card-eta{
        margin-top:14px;
        font-family:'Space Mono',monospace;
        font-size:10px;
        color:#555;
        letter-spacing:1px;
        display:flex;align-items:center;gap:6px;
      }
      .roadmap-card-eta::before{
        content:'';
        display:inline-block;
        width:12px;height:1px;
        background:#555;
      }
      .roadmap-spacer{ }

      /* ===== RESPONSIVE ===== */
      @media(max-width:768px){
        .more-root{padding:24px 16px 60px;}
        .more-grid,.more-grid.featured{grid-template-columns:1fr;gap:16px;}
        .glass-card{padding:24px 20px;}
        .cta-panel{padding:32px 22px;}
        .cta-buttons{flex-direction:column;}
        .cta-btn{width:100%;justify-content:center;}
      }
      @media(max-width:420px){
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

        <!-- Primary Trading Section -->
        <div class="more-section-title">CORE TRADING</div>
        <div class="more-section-sub">Direct access to live markets and derivatives</div>
        <div class="more-grid featured">

          <!-- SPOT TRADING CARD -->
          <a class="glass-card" href="trading.html" style="animation-delay:.05s">
            <span class="card-live-badge">LIVE</span>
            <div class="card-icon-wrap">
              <svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            </div>
            <div class="card-title">SPOT TRADING</div>
            <div class="card-desc">Trade 150+ crypto pairs instantly on AvicnKnov's lightning-fast spot engine. Click the action below to enter the live trading terminal and start trading right now with deep liquidity and sub-millisecond execution.</div>
            <div class="card-action">
              <span>Start Trading Now</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>

          <!-- FUTURES CARD -->
          <a class="glass-card" href="futures.html" style="animation-delay:.15s">
            <span class="card-live-badge">LIVE</span>
            <div class="card-icon-wrap emoji-icon" style="font-size:28px;">
              🛸
            </div>
            <div class="card-title">FUTURES &amp; DERIVATIVES</div>
            <div class="card-desc">Access perpetual contracts with up to 100x leverage. View detailed market depth, funding rates, open interest, and execute high-conviction trades on our advanced derivatives engine.</div>
            <div class="card-action">
              <span>Explore Futures</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </a>
        </div>

        <!-- Coming Soon Roadmap -->
        <div class="more-section-title">WHAT'S COMING</div>
        <div class="more-section-sub">The next evolution of the AvicnKnov universe — lock in, it's about to get wild</div>

        <div class="roadmap-section" id="roadmapSection">
          <!-- SVG track line drawn by JS -->
          <svg class="roadmap-svg-track" id="roadmapTrackSvg" viewBox="0 0 4 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(255,255,255,0.5)"/>
                <stop offset="100%" stop-color="rgba(255,255,255,0.1)"/>
              </linearGradient>
            </defs>
            <line x1="2" y1="0" x2="2" y2="1000" class="roadmap-track-line"/>
            <line x1="2" y1="0" x2="2" y2="1000" class="roadmap-track-live" id="roadmapLiveLine"/>
          </svg>

          <div class="roadmap-items" id="roadmapItems">

            <!-- ITEM 1: AI Neural Intelligence -->
            <div class="roadmap-item" data-index="0">
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag hot">DROPPING FIRST</div>
                  <div class="roadmap-card-title">AI NEURAL INTELLIGENCE</div>
                  <div class="roadmap-card-desc">Proprietary neural engine trained on 240+ live market signals. Whale tracking, sentiment radar, predictive setups — it reads the market so you don't have to. Your edge, amplified.</div>
                  <div class="roadmap-card-eta">ETA · Q3 2025</div>
                </div>
              </div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); right:22px; left:auto;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.24z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.24z"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-spacer"></div>
            </div>

            <!-- ITEM 2: Live Events -->
            <div class="roadmap-item" data-index="1">
              <div class="roadmap-spacer"></div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); left:22px;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag cool">LIVE EVENTS ENGINE</div>
                  <div class="roadmap-card-title">MARKET EVENTS &amp; ALERTS</div>
                  <div class="roadmap-card-desc">Real-time event feeds — token launches, listings, protocol upgrades, macro announcements. Get notified the second something market-moving happens. First to know. First to act.</div>
                  <div class="roadmap-card-eta">ETA · Q3 2025</div>
                </div>
              </div>
            </div>

            <!-- ITEM 3: Groups / Community -->
            <div class="roadmap-item" data-index="2">
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag hot">HIGH DEMAND</div>
                  <div class="roadmap-card-title">TRADER GROUPS &amp; SIGNALS</div>
                  <div class="roadmap-card-desc">Join private trader collectives, share calls, copy top-performing wallets and access curated signal groups inside AvicnKnov. The alpha is here — claim it now.</div>
                  <div class="roadmap-card-eta">ETA · Q4 2025</div>
                </div>
              </div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); right:22px; left:auto;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-spacer"></div>
            </div>

            <!-- ITEM 4: Referral -->
            <div class="roadmap-item" data-index="3">
              <div class="roadmap-spacer"></div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); left:22px;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag">LAUNCHING SOON</div>
                  <div class="roadmap-card-title">REFERRAL EMPIRE</div>
                  <div class="roadmap-card-desc">Invite your network, earn up to 40% lifetime commissions on every trade. Build a passive revenue stream inside AvicnKnov. Stack forever, not just once.</div>
                  <div class="roadmap-card-eta">ETA · Q4 2025</div>
                </div>
              </div>
            </div>

            <!-- ITEM 5: Copy Trading -->
            <div class="roadmap-item" data-index="4">
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag cool">GAME CHANGER</div>
                  <div class="roadmap-card-title">COPY TRADING VAULTS</div>
                  <div class="roadmap-card-desc">One click mirrors elite trader moves in real time. Allocate capital into verified strategy vaults — let the pros execute while you capture every ounce of upside.</div>
                  <div class="roadmap-card-eta">ETA · Q1 2026</div>
                </div>
              </div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); right:22px; left:auto;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-spacer"></div>
            </div>

            <!-- ITEM 6: Aquarius Launchpad -->
            <div class="roadmap-item" data-index="5">
              <div class="roadmap-spacer"></div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); left:22px;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag hot">ALPHA ACCESS</div>
                  <div class="roadmap-card-title">AQUARIUS LAUNCHPAD</div>
                  <div class="roadmap-card-desc">AI-vetted token launches with exclusive early access reserved for AvicnKnov members only. Hyper-curated projects, zero compromise. Be first in line. Be inside. Be Aquarius.</div>
                  <div class="roadmap-card-eta">ETA · Q1 2026</div>
                </div>
              </div>
            </div>

            <!-- ITEM 7: Smart Portfolio Analytics -->
            <div class="roadmap-item" data-index="6">
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag cool">DEEP ANALYTICS</div>
                  <div class="roadmap-card-title">SMART PORTFOLIO ANALYTICS</div>
                  <div class="roadmap-card-desc">Track every position, PnL curve, risk ratio and drawdown in one intelligent dashboard. Institutional-grade analytics built for traders who demand total market control.</div>
                  <div class="roadmap-card-eta">ETA · Q2 2026</div>
                </div>
              </div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); right:22px; left:auto;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-spacer"></div>
            </div>

            <!-- ITEM 8: Staking & Earn Vaults -->
            <div class="roadmap-item" data-index="7">
              <div class="roadmap-spacer"></div>
              <div class="roadmap-node-col">
                <div class="roadmap-connector" style="width:calc(100% - 22px); left:22px;"></div>
                <div class="roadmap-node">
                  <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                </div>
                <div class="roadmap-node-ring"></div>
                <div class="roadmap-node-ring2"></div>
              </div>
              <div class="roadmap-card-wrap">
                <div class="roadmap-card">
                  <div class="roadmap-card-tag">PASSIVE INCOME</div>
                  <div class="roadmap-card-title">STAKING &amp; EARN VAULTS</div>
                  <div class="roadmap-card-desc">Lock assets in high-yield staking vaults and auto-compounding earn pools. Generate passive returns on idle capital while staying fully positioned inside the AvicnKnov ecosystem.</div>
                  <div class="roadmap-card-eta">ETA · Q2 2026</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Final CTA Panel -->
        <div class="cta-panel">
          <div class="cta-title">READY TO TRADE?</div>
          <div class="cta-desc">Join 2 million+ traders already using AvicnKnov to navigate the world's deepest crypto markets with institutional precision.</div>
          <div class="cta-buttons">
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

  // ===== ROADMAP SCROLL REVEAL =====
  const roadmapItems = container.querySelectorAll('.roadmap-item');
  const roadmapSection = container.querySelector('#roadmapSection');
  const liveLine = container.querySelector('#roadmapLiveLine');

  function updateRoadmap(){
    if(!roadmapSection) return;
    const sectionRect = roadmapSection.getBoundingClientRect();
    const sectionH = roadmapSection.offsetHeight;
    const windowH = window.innerHeight;

    // How far through the section we are (0 to 1)
    const scrolled = Math.max(0, Math.min(1, (windowH - sectionRect.top) / (sectionH + windowH)));

    // Animate the dashed live line height
    if(liveLine){
      const drawPct = Math.min(scrolled * 1.4, 1);
      liveLine.setAttribute('y2', Math.floor(drawPct * 1000));
    }

    // Reveal each roadmap item
    roadmapItems.forEach((item, i)=>{
      const rect = item.getBoundingClientRect();
      const triggerPoint = windowH * 0.82;
      if(rect.top < triggerPoint){
        item.classList.add('visible');
      }
    });
  }

  // Listen on the scroll parent (could be a tab container or window)
  window.addEventListener('scroll', updateRoadmap, { passive:true });
  // Also try the container's scroll parent
  let scrollParent = container.parentElement;
  while(scrollParent && scrollParent !== document.body){
    scrollParent.addEventListener('scroll', updateRoadmap, { passive:true });
    scrollParent = scrollParent.parentElement;
  }
  // Initial check
  setTimeout(updateRoadmap, 100);

  // Cleanup hook
  container._cleanup = ()=>{
    window.removeEventListener('scroll', updateRoadmap);
  };
}

// Auto-run if already loaded
if(document.getElementById('tabContentMore') && document.getElementById('tabContentMore').classList.contains('active')){
  init_tabContentMore();
}

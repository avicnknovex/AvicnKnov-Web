/**
 * AvicnKnov Web — more.js
 * Self-contained premium page builder
 * Just include: <script src="more.js"></script>
 * ─────────────────────────────────────────
 */

(function () {
  "use strict";

  /* ════════════════════════════════════════
     1.  INJECT FONTS + STYLES
  ════════════════════════════════════════ */
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
  document.head.appendChild(fontLink);

  const style = document.createElement("style");
  style.textContent = `
    /* ── RESET / BASE ── */
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{
      background:#000;color:#fff;
      font-family:'Rajdhani',sans-serif;
      min-height:100vh;overflow-x:hidden;cursor:none;
    }

    /* ── CURSOR ── */
    #avk-cursor{
      width:10px;height:10px;background:#fff;border-radius:50%;
      position:fixed;top:0;left:0;pointer-events:none;z-index:99999;
      transform:translate(-50%,-50%);transition:transform .08s;
      mix-blend-mode:difference;
    }
    #avk-cursor-ring{
      width:38px;height:38px;border:1.5px solid rgba(255,255,255,.45);
      border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;
      z-index:99998;transform:translate(-50%,-50%);
      transition:all .18s cubic-bezier(.23,1,.32,1);
      mix-blend-mode:difference;
    }
    body:hover #avk-cursor-ring{opacity:1;}

    /* ── CANVAS BG ── */
    #avk-canvas{
      position:fixed;top:0;left:0;width:100%;height:100%;
      z-index:0;pointer-events:none;opacity:.65;
    }

    /* ── NOISE GRAIN ── */
    #avk-noise{
      position:fixed;top:-50%;left:-50%;width:200%;height:200%;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.038'/%3E%3C/svg%3E");
      pointer-events:none;z-index:1;animation:avk-noise .4s steps(2) infinite;
    }
    @keyframes avk-noise{
      0%{transform:translate(0,0);}
      25%{transform:translate(-1%,-1%);}
      50%{transform:translate(1%,.5%);}
      75%{transform:translate(-.5%,1%);}
      100%{transform:translate(1%,-1%);}
    }

    /* ── MAIN WRAPPER ── */
    #avk-root{
      position:relative;z-index:10;
      max-width:1100px;margin:0 auto;padding:0 22px 90px;
    }

    /* ── HEADER ── */
    #avk-header{
      padding:56px 0 36px;text-align:center;position:relative;
      animation:avk-rise .9s ease both;
    }
    #avk-header::before{
      content:'';position:absolute;top:0;left:50%;
      transform:translateX(-50%);width:1px;height:56px;
      background:linear-gradient(to bottom,transparent,rgba(255,255,255,.4));
    }
    .avk-label{
      font-family:'Space Mono',monospace;font-size:10px;
      letter-spacing:6px;color:rgba(255,255,255,.3);
      text-transform:uppercase;margin-bottom:14px;
    }
    .avk-sitename{
      font-family:'Cinzel',serif;font-size:clamp(28px,6vw,62px);
      font-weight:900;letter-spacing:4px;
      background:linear-gradient(120deg,#fff 0%,rgba(255,255,255,.45) 50%,#fff 100%);
      background-size:200%;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;
      animation:avk-shimmer 5s ease infinite 1.2s;
    }
    @keyframes avk-shimmer{
      0%,100%{background-position:0%;}50%{background-position:100%;}
    }
    .avk-tagline{
      font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:300;
      letter-spacing:4px;color:rgba(255,255,255,.28);margin-top:10px;
    }
    .avk-hline{
      width:0;height:1px;margin:24px auto 0;
      background:linear-gradient(to right,transparent,rgba(255,255,255,.5),transparent);
      animation:avk-expand 1.4s ease .6s forwards;
    }
    @keyframes avk-expand{to{width:140px;}}

    /* ── TICKER ── */
    #avk-ticker-wrap{
      overflow:hidden;border-top:1px solid rgba(255,255,255,.07);
      border-bottom:1px solid rgba(255,255,255,.07);
      background:rgba(255,255,255,.025);padding:9px 0;
      margin-bottom:52px;animation:avk-rise .9s ease .5s both;
    }
    #avk-ticker{
      display:flex;gap:52px;white-space:nowrap;
      animation:avk-tick 20s linear infinite;
    }
    .avk-tick-item{
      font-family:'Space Mono',monospace;font-size:11px;
      color:rgba(255,255,255,.4);display:flex;align-items:center;gap:8px;
    }
    .avk-tick-item b{color:rgba(255,255,255,.8);}
    .avk-tick-dot{
      width:5px;height:5px;border-radius:50%;background:#fff;
      animation:avk-pulse 1.6s ease infinite;
    }
    @keyframes avk-tick{from{transform:translateX(0);}to{transform:translateX(-50%);}}
    @keyframes avk-pulse{
      0%,100%{opacity:1;transform:scale(1);}
      50%{opacity:.25;transform:scale(.55);}
    }

    /* ── SECTION LABEL ── */
    .avk-section-label{
      font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:5px;
      color:rgba(255,255,255,.22);text-transform:uppercase;
      display:flex;align-items:center;gap:14px;margin-bottom:24px;
    }
    .avk-section-label::after{
      content:'';flex:1;height:1px;
      background:linear-gradient(to right,rgba(255,255,255,.14),transparent);
    }

    /* ── BUTTON GRID ── */
    .avk-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
      gap:18px;margin-bottom:52px;
    }
    .avk-grid.avk-2col{grid-template-columns:repeat(2,1fr);}
    @media(max-width:600px){
      .avk-grid.avk-2col{grid-template-columns:1fr;}
    }

    /* ── CARD ── */
    .avk-card{
      position:relative;
      background:rgba(255,255,255,.032);
      border:1px solid rgba(255,255,255,.1);
      border-radius:16px;padding:28px 24px;
      cursor:none;overflow:hidden;
      transition:all .38s cubic-bezier(.23,1,.32,1);
      backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
      animation:avk-rise .9s ease both;
    }
    /* shine sweep */
    .avk-card::before{
      content:'';position:absolute;top:0;left:-120%;
      width:55%;height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.045),transparent);
      transition:left .55s ease;pointer-events:none;
    }
    /* glow border */
    .avk-card::after{
      content:'';position:absolute;inset:-1px;border-radius:17px;
      background:linear-gradient(135deg,rgba(255,255,255,.14) 0%,transparent 55%,rgba(255,255,255,.07) 100%);
      opacity:0;transition:opacity .38s;pointer-events:none;z-index:-1;
    }
    .avk-card:hover{
      transform:translateY(-7px) scale(1.018);
      border-color:rgba(255,255,255,.26);
      box-shadow:
        0 22px 55px rgba(0,0,0,.65),
        0 0 0 1px rgba(255,255,255,.09),
        inset 0 1px 0 rgba(255,255,255,.12);
      background:rgba(255,255,255,.065);
    }
    .avk-card:hover::before{left:150%;}
    .avk-card:hover::after{opacity:1;}
    .avk-card:active{transform:translateY(-2px) scale(.985);transition:all .08s;}

    /* card — corner markers */
    .avk-c{position:absolute;width:9px;height:9px;}
    .avk-c.tl{top:9px;left:9px;border-top:1px solid rgba(255,255,255,.2);border-left:1px solid rgba(255,255,255,.2);}
    .avk-c.tr{top:9px;right:9px;border-top:1px solid rgba(255,255,255,.2);border-right:1px solid rgba(255,255,255,.2);}
    .avk-c.bl{bottom:9px;left:9px;border-bottom:1px solid rgba(255,255,255,.2);border-left:1px solid rgba(255,255,255,.2);}
    .avk-c.br{bottom:9px;right:9px;border-bottom:1px solid rgba(255,255,255,.2);border-right:1px solid rgba(255,255,255,.2);}

    /* card — top accent */
    .avk-top-line{
      position:absolute;top:0;left:24px;right:24px;height:1px;
      background:linear-gradient(to right,transparent,rgba(255,255,255,.55),transparent);
      opacity:0;transition:opacity .4s;
    }
    .avk-card:hover .avk-top-line{opacity:1;}

    /* card icon */
    .avk-icon{
      width:50px;height:50px;
      border:1px solid rgba(255,255,255,.13);border-radius:13px;
      display:flex;align-items:center;justify-content:center;
      font-size:22px;background:rgba(255,255,255,.035);
      position:relative;margin-bottom:18px;
      transition:all .38s ease;
    }
    .avk-card:hover .avk-icon{
      border-color:rgba(255,255,255,.35);background:rgba(255,255,255,.1);
      box-shadow:0 0 22px rgba(255,255,255,.1);transform:scale(1.08);
    }
    .avk-live-dot{
      position:absolute;top:-4px;right:-4px;width:10px;height:10px;
      background:#fff;border-radius:50%;border:2px solid #000;
      animation:avk-livepulse 1.8s ease infinite;
    }
    @keyframes avk-livepulse{
      0%{box-shadow:0 0 0 0 rgba(255,255,255,.75);}
      70%{box-shadow:0 0 0 9px rgba(255,255,255,0);}
      100%{box-shadow:0 0 0 0 rgba(255,255,255,0);}
    }

    /* card text */
    .avk-tag{
      font-family:'Space Mono',monospace;font-size:9.5px;
      letter-spacing:3px;color:rgba(255,255,255,.28);
      text-transform:uppercase;margin-bottom:6px;
    }
    .avk-title{
      font-family:'Cinzel',serif;font-size:21px;font-weight:700;
      color:#fff;margin-bottom:9px;letter-spacing:.8px;
    }
    .avk-desc{
      font-family:'Rajdhani',sans-serif;font-size:13.5px;font-weight:300;
      color:rgba(255,255,255,.42);line-height:1.75;margin-bottom:22px;
    }

    /* card CTA arrow */
    .avk-cta{
      display:inline-flex;align-items:center;gap:10px;
      font-family:'Space Mono',monospace;font-size:10px;
      letter-spacing:2px;color:rgba(255,255,255,.6);
      text-transform:uppercase;text-decoration:none;
      transition:all .3s ease;
    }
    .avk-card:hover .avk-cta{color:#fff;gap:18px;}
    .avk-arrow{
      width:26px;height:1px;background:rgba(255,255,255,.38);
      position:relative;transition:width .3s,background .3s;
    }
    .avk-arrow::after{
      content:'';position:absolute;right:0;top:-3px;
      width:6px;height:6px;
      border-right:1px solid rgba(255,255,255,.5);
      border-top:1px solid rgba(255,255,255,.5);
      transform:rotate(45deg);transition:border-color .3s;
    }
    .avk-card:hover .avk-arrow{width:38px;background:#fff;}
    .avk-card:hover .avk-arrow::after{border-color:#fff;}

    /* card stats row */
    .avk-stats{
      display:flex;gap:18px;margin-top:18px;padding-top:18px;
      border-top:1px solid rgba(255,255,255,.055);
    }
    .avk-stat-val{
      font-family:'Space Mono',monospace;font-size:13px;
      color:#fff;font-weight:700;display:block;
    }
    .avk-stat-lbl{
      font-family:'Rajdhani',sans-serif;font-size:11px;
      color:rgba(255,255,255,.28);letter-spacing:1px;display:block;
    }

    /* WIDE card */
    .avk-card.avk-wide{
      grid-column:1/-1;
      display:grid;grid-template-columns:1fr 1fr;gap:38px;align-items:center;
    }
    .avk-wide-right{
      border-left:1px solid rgba(255,255,255,.055);
      padding-left:38px;
    }
    .avk-wide-right .avk-stats{
      flex-direction:column;gap:14px;border-top:none;padding-top:0;
    }
    @media(max-width:580px){
      .avk-card.avk-wide{grid-template-columns:1fr;}
      .avk-wide-right{border-left:none;padding-left:0;
        border-top:1px solid rgba(255,255,255,.055);padding-top:22px;}
    }

    /* DISABLED card */
    .avk-card.avk-dim{
      opacity:.42;pointer-events:none;
    }
    .avk-card.avk-dim::before,.avk-card.avk-dim::after{display:none;}
    .avk-soon-badge{
      position:absolute;top:14px;right:14px;
      font-family:'Space Mono',monospace;font-size:9px;
      letter-spacing:2px;color:rgba(255,255,255,.3);
      border:1px solid rgba(255,255,255,.12);border-radius:20px;
      padding:3px 10px;text-transform:uppercase;
    }

    /* ── GRAPH CARD ── */
    #avk-graph-card{
      background:rgba(255,255,255,.028);
      border:1px solid rgba(255,255,255,.09);
      border-radius:16px;padding:26px;
      backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
      margin-bottom:52px;
      animation:avk-rise .9s ease 1.5s both;
    }
    #avk-graph-head{
      display:flex;justify-content:space-between;align-items:center;
      margin-bottom:18px;
    }
    #avk-graph-title{
      font-family:'Cinzel',serif;font-size:15px;color:#fff;letter-spacing:1px;
    }
    #avk-graph-badge{
      display:flex;align-items:center;gap:6px;
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.09);border-radius:20px;
      padding:4px 12px;
      font-family:'Space Mono',monospace;font-size:9.5px;
      color:rgba(255,255,255,.45);
    }
    .avk-lb{
      width:6px;height:6px;border-radius:50%;background:#fff;
      animation:avk-livepulse 1.6s ease infinite;
    }
    #avk-chart-canvas{width:100%;height:160px;display:block;}

    /* ── ABOUT GRID ── */
    #avk-about{
      margin-bottom:52px;animation:avk-rise .9s ease 1.8s both;
    }
    .avk-about-grid{
      display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:1px;background:rgba(255,255,255,.055);
      border-radius:16px;overflow:hidden;
      border:1px solid rgba(255,255,255,.07);
    }
    .avk-about-cell{
      background:#000;padding:26px 22px;
      transition:background .3s;
    }
    .avk-about-cell:hover{background:rgba(255,255,255,.03);}
    .avk-about-num{
      font-family:'Cinzel',serif;font-size:34px;font-weight:900;
      color:rgba(255,255,255,.1);line-height:1;margin-bottom:7px;
      transition:color .3s;
    }
    .avk-about-cell:hover .avk-about-num{color:rgba(255,255,255,.28);}
    .avk-about-ht{
      font-family:'Space Mono',monospace;font-size:9.5px;
      letter-spacing:2px;color:rgba(255,255,255,.55);
      text-transform:uppercase;margin-bottom:5px;
    }
    .avk-about-txt{
      font-family:'Rajdhani',sans-serif;font-size:13px;
      color:rgba(255,255,255,.28);line-height:1.65;
    }

    /* ── FOOTER ── */
    #avk-footer{
      text-align:center;padding-top:38px;
      border-top:1px solid rgba(255,255,255,.055);
      animation:avk-rise .9s ease 2s both;
    }
    .avk-ft-name{
      font-family:'Cinzel',serif;font-size:18px;
      letter-spacing:5px;color:rgba(255,255,255,.18);
    }
    .avk-ft-copy{
      font-family:'Space Mono',monospace;font-size:9.5px;
      color:rgba(255,255,255,.1);margin-top:8px;letter-spacing:2px;
    }

    /* ── SHARED ANIMATION ── */
    @keyframes avk-rise{
      from{opacity:0;transform:translateY(18px);}
      to{opacity:1;transform:translateY(0);}
    }
  `;
  document.head.appendChild(style);

  /* ════════════════════════════════════════
     2.  TICKER DATA
  ════════════════════════════════════════ */
  const TICKERS = [
    { sym: "BTC/USDT", val: "67,420.15", chg: "+2.34%" },
    { sym: "ETH/USDT", val: "3,521.88",  chg: "+1.78%" },
    { sym: "BNB/USDT", val: "584.30",    chg: "-0.55%" },
    { sym: "SOL/USDT", val: "172.44",    chg: "+4.12%" },
    { sym: "XRP/USDT", val: "0.5821",    chg: "+0.98%" },
    { sym: "AVAX/USDT",val: "36.72",     chg: "-1.03%" },
    { sym: "MATIC",    val: "0.8834",    chg: "+2.55%" },
    { sym: "DOT/USDT", val: "7.310",     chg: "-0.22%" },
    { sym: "DOGE/USDT",val: "0.1524",    chg: "+5.60%" },
    { sym: "LINK/USDT",val: "14.980",    chg: "+1.45%" },
  ];

  /* ════════════════════════════════════════
     3.  BUILD DOM
  ════════════════════════════════════════ */
  function buildDOM() {
    /* Cursor */
    const cur  = el("div", { id: "avk-cursor" });
    const ring = el("div", { id: "avk-cursor-ring" });
    document.body.prepend(ring, cur);

    /* Noise */
    document.body.prepend(el("div", { id: "avk-noise" }));

    /* Canvas */
    const canvas = el("canvas", { id: "avk-canvas" });
    document.body.prepend(canvas);

    /* Root wrapper */
    const root = el("div", { id: "avk-root" });
    document.body.appendChild(root);

    /* ── Header ── */
    root.appendChild(htmlToNode(`
      <header id="avk-header">
        <div class="avk-label">Navigate · Trade · Grow</div>
        <h1 class="avk-sitename">AvicnKnov Web</h1>
        <p class="avk-tagline">YOUR FINANCIAL INTELLIGENCE PLATFORM</p>
        <div class="avk-hline"></div>
      </header>
    `));

    /* ── Ticker ── */
    const tw = el("div", { id: "avk-ticker-wrap" });
    const ticker = el("div", { id: "avk-ticker" });
    const items = [...TICKERS, ...TICKERS]; // double for seamless loop
    items.forEach(t => {
      const up = !t.chg.startsWith("-");
      ticker.insertAdjacentHTML("beforeend", `
        <span class="avk-tick-item">
          <span class="avk-tick-dot"></span>
          ${t.sym} <b>${t.val}</b>
          <span style="color:rgba(255,255,255,${up ? ".75" : ".28"})">${t.chg}</span>
        </span>
      `);
    });
    tw.appendChild(ticker);
    root.appendChild(tw);

    /* ── Buttons Section ── */
    root.appendChild(htmlToNode(`<div class="avk-section-label">Primary Actions</div>`));
    const grid = el("div", { class: "avk-grid" });

    /* ─ Trading Card ─ */
    grid.appendChild(makeCard({
      delay: "1.1s",
      icon: "📈",
      live: true,
      tag: "Live Market",
      title: "Trading",
      desc: "Access real-time markets with advanced order types — buy, sell and manage positions across crypto, equities and commodities instantly on AvicnKnov Web.",
      cta: "Open Trading Desk",
      href: "trading.html",
      stats: [
        { val: "24/7",   lbl: "Access" },
        { val: "Live",   lbl: "Data" },
        { val: "0.01%",  lbl: "Fee" },
      ],
    }));

    /* ─ Practice Card ─ */
    grid.appendChild(makeCard({
      delay: "1.3s",
      icon: "🎯",
      live: false,
      tag: "Paper Trading",
      title: "Practice",
      desc: "Master every strategy risk-free on our live exchange simulator. Real market prices, virtual capital. Click Practice and go straight to our exchange — no deposit needed.",
      cta: "Start Practice Mode",
      href: "trading.html?mode=practice",
      stats: [
        { val: "$100K",  lbl: "Virtual" },
        { val: "Real",   lbl: "Prices" },
        { val: "Free",   lbl: "Always" },
      ],
    }));

    root.appendChild(grid);

    /* ─ Futures Wide Card ─ */
    root.appendChild(htmlToNode(`<div class="avk-section-label">Derivatives</div>`));
    const grid2 = el("div", { class: "avk-grid avk-2col" });
    grid2.appendChild(makeWideCard());
    root.appendChild(grid2);

    /* ─ Coming Soon Cards ─ */
    root.appendChild(htmlToNode(`<div class="avk-section-label" style="margin-top:52px">More Coming Soon</div>`));
    const grid3 = el("div", { class: "avk-grid" });
    const soon = [
      { icon: "💼", tag: "Portfolio",  title: "Portfolio",  desc: "Unified P&L tracking, risk metrics and performance analytics across all your positions." },
      { icon: "📡", tag: "AI Signals", title: "Signals",    desc: "AI-powered trade signals and real-time market sentiment from our intelligence engine." },
      { icon: "📰", tag: "Insights",   title: "Research",   desc: "Deep-dive market research, on-chain data and macro analysis curated by experts." },
      { icon: "🔐", tag: "Vault",      title: "Wallet",     desc: "Non-custodial multi-chain wallet with DeFi integrations and staking support." },
    ];
    soon.forEach((s, i) => {
      grid3.appendChild(makeCard({
        delay: `${1.1 + i * 0.15}s`,
        icon: s.icon,
        live: false,
        tag: s.tag,
        title: s.title,
        desc: s.desc,
        cta: "In Development",
        href: null,
        stats: [],
        disabled: true,
      }));
    });
    root.appendChild(grid3);

    /* ── Graph ── */
    root.appendChild(htmlToNode(`<div class="avk-section-label" style="margin-top:52px">Platform Activity</div>`));
    root.appendChild(htmlToNode(`
      <div id="avk-graph-card">
        <div id="avk-graph-head">
          <span id="avk-graph-title">Live Market Pulse — AvicnKnov Web</span>
          <span id="avk-graph-badge"><span class="avk-lb"></span>&nbsp;LIVE</span>
        </div>
        <canvas id="avk-chart-canvas"></canvas>
      </div>
    `));

    /* ── About ── */
    root.appendChild(htmlToNode(`<div class="avk-section-label">About the Platform</div>`));
    root.appendChild(htmlToNode(`
      <div id="avk-about">
        <div class="avk-about-grid">
          <div class="avk-about-cell">
            <div class="avk-about-num">01</div>
            <div class="avk-about-ht">Mission</div>
            <div class="avk-about-txt">AvicnKnov Web brings institutional-grade trading tools to every trader — from beginners to professionals.</div>
          </div>
          <div class="avk-about-cell">
            <div class="avk-about-num">02</div>
            <div class="avk-about-ht">Technology</div>
            <div class="avk-about-txt">Built on a high-frequency matching engine with sub-millisecond latency and 99.99% platform uptime.</div>
          </div>
          <div class="avk-about-cell">
            <div class="avk-about-num">03</div>
            <div class="avk-about-ht">Security</div>
            <div class="avk-about-txt">Multi-layer encryption, cold storage, 2FA and real-time fraud detection keep your assets safe at all times.</div>
          </div>
          <div class="avk-about-cell">
            <div class="avk-about-num">04</div>
            <div class="avk-about-ht">Community</div>
            <div class="avk-about-txt">Join thousands of traders already building wealth on AvicnKnov Web. More features rolling out every week.</div>
          </div>
        </div>
      </div>
    `));

    /* ── Footer ── */
    root.appendChild(htmlToNode(`
      <footer id="avk-footer">
        <div class="avk-ft-name">AvicnKnov Web</div>
        <div class="avk-ft-copy">© ${new Date().getFullYear()} AvicnKnov Web · All Rights Reserved</div>
      </footer>
    `));
  }

  /* ════════════════════════════════════════
     4.  CARD BUILDERS
  ════════════════════════════════════════ */
  function makeCard({ delay, icon, live, tag, title, desc, cta, href, stats, disabled }) {
    const d = el("div", {
      class: "avk-card" + (disabled ? " avk-dim" : ""),
      style: `animation-delay:${delay}`,
    });
    if (!disabled && href) d.onclick = () => location.href = href;

    d.innerHTML = `
      <div class="avk-top-line"></div>
      <div class="avk-c tl"></div><div class="avk-c tr"></div>
      <div class="avk-c bl"></div><div class="avk-c br"></div>
      ${disabled ? '<span class="avk-soon-badge">Soon</span>' : ""}
      <div class="avk-icon">
        ${icon}
        ${live ? '<span class="avk-live-dot"></span>' : ""}
      </div>
      <div class="avk-tag">${tag}</div>
      <div class="avk-title">${title}</div>
      <div class="avk-desc">${desc}</div>
      <span class="avk-cta">${cta}<span class="avk-arrow"></span></span>
      ${stats.length ? `
        <div class="avk-stats">
          ${stats.map(s => `<div><span class="avk-stat-val">${s.val}</span><span class="avk-stat-lbl">${s.lbl}</span></div>`).join("")}
        </div>` : ""}
    `;
    return d;
  }

  function makeWideCard() {
    const d = el("div", {
      class: "avk-card avk-wide",
      style: "animation-delay:1.5s",
    });
    d.onclick = () => location.href = "future.html";
    d.innerHTML = `
      <div class="avk-top-line"></div>
      <div class="avk-c tl"></div><div class="avk-c tr"></div>
      <div class="avk-c bl"></div><div class="avk-c br"></div>
      <div>
        <div class="avk-icon" style="font-size:26px">🔮<span class="avk-live-dot"></span></div>
        <div class="avk-tag">Derivatives · Perpetuals · Leverage</div>
        <div class="avk-title">Futures</div>
        <div class="avk-desc">
          Trade the future — not just the present. Access perpetual contracts, commodity futures and index derivatives with precision execution and deep liquidity across all major markets on AvicnKnov Web.
        </div>
        <span class="avk-cta">Explore Futures Plans<span class="avk-arrow"></span></span>
      </div>
      <div class="avk-wide-right">
        <div class="avk-stats">
          <div><span class="avk-stat-val">125x</span><span class="avk-stat-lbl">Max Leverage</span></div>
          <div><span class="avk-stat-val">0.01%</span><span class="avk-stat-lbl">Maker Fee</span></div>
          <div><span class="avk-stat-val">Instant</span><span class="avk-stat-lbl">Settlement</span></div>
          <div><span class="avk-stat-val">50+</span><span class="avk-stat-lbl">Contracts</span></div>
          <div><span class="avk-stat-val">24/7</span><span class="avk-stat-lbl">Live Markets</span></div>
        </div>
      </div>
    `;
    return d;
  }

  /* ════════════════════════════════════════
     5.  CANVAS — TREASURE MAP ANIMATION
  ════════════════════════════════════════ */
  function initCanvas() {
    const canvas = document.getElementById("avk-canvas");
    const ctx = canvas.getContext("2d");
    let W, H, nodes, paths, particles;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildMap();
    }

    /* Build a random node network (like a treasure map / circuit / river) */
    function buildMap() {
      const count = Math.floor((W * H) / 26000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .18,
        vy: (Math.random() - .5) * .18,
        r: Math.random() * 2.5 + .8,
        alpha: Math.random() * .5 + .2,
      }));

      /* Connect nearby nodes into path segments */
      paths = [];
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (j <= i) return;
          const dx = n.x - m.x, dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) paths.push({ a: i, b: j, dist });
        });
      });

      /* Flowing particles along paths */
      particles = paths.slice(0, Math.min(paths.length, 60)).map(p => ({
        path: p,
        t: Math.random(),
        speed: Math.random() * .003 + .001,
        size: Math.random() * 2 + 1,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      /* Move nodes */
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      /* Recalculate path connections lazily (every 90 frames) */
      draw._f = (draw._f || 0) + 1;
      if (draw._f % 90 === 0) {
        paths = [];
        nodes.forEach((n, i) => {
          nodes.forEach((m, j) => {
            if (j <= i) return;
            const dx = n.x - m.x, dy = n.y - m.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 160) paths.push({ a: i, b: j, dist: d });
          });
        });
      }

      /* Draw paths (map lines) */
      paths.forEach(p => {
        const a = nodes[p.a], b = nodes[p.b];
        const alpha = (1 - p.dist / 160) * .18;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        /* Slight curve for river feel */
        const mx = (a.x + b.x) / 2 + (Math.random() - .5) * 4;
        const my = (a.y + b.y) / 2 + (Math.random() - .5) * 4;
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = .6;
        ctx.stroke();
      });

      /* Draw nodes */
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${n.alpha * .6})`;
        ctx.fill();
      });

      /* Draw flowing particles */
      particles.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const a = nodes[p.path.a], b = nodes[p.path.b];
        if (!a || !b) return;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
        grad.addColorStop(0, "rgba(255,255,255,.85)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fill();
      });

      /* Occasional big glow points (X marks on map) */
      if (draw._f % 180 === 0) {
        draw._glows = nodes
          .filter(() => Math.random() < .06)
          .slice(0, 3)
          .map(n => ({ x: n.x, y: n.y, life: 80 }));
      }
      (draw._glows || []).forEach(g => {
        g.life--;
        if (g.life <= 0) return;
        const a = (g.life / 80) * .35;
        const r = (1 - g.life / 80) * 30 + 4;
        const gr = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, r);
        gr.addColorStop(0, `rgba(255,255,255,${a})`);
        gr.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(g.x, g.y, r, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
  }

  /* ════════════════════════════════════════
     6.  LIVE CHART
  ════════════════════════════════════════ */
  function initChart() {
    const canvas = document.getElementById("avk-chart-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;
    const POINTS = 80;
    let data = Array.from({ length: POINTS }, (_, i) => 50 + Math.sin(i * .3) * 12 + Math.random() * 8);

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight || 160;
    }

    function pushPoint() {
      const last = data[data.length - 1];
      data.push(last + (Math.random() - .48) * 3.2);
      if (data.length > POINTS) data.shift();
    }

    function drawChart() {
      resize();
      ctx.clearRect(0, 0, W, H);

      const min = Math.min(...data) - 4;
      const max = Math.max(...data) + 4;
      const range = max - min || 1;
      const px = (v) => W * (v / (POINTS - 1));
      const py = (v) => H - ((v - min) / range) * (H * .88) - H * .06;

      /* Grid lines */
      for (let i = 0; i <= 4; i++) {
        const y = H * .06 + (H * .88) * (i / 4);
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(W, y);
        ctx.strokeStyle = "rgba(255,255,255,.04)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* Fill area */
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(255,255,255,.12)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.moveTo(px(0), py(data[0]));
      data.forEach((v, i) => {
        if (i === 0) return;
        const cpx = (px(i - 1) + px(i)) / 2;
        ctx.bezierCurveTo(cpx, py(data[i - 1]), cpx, py(v), px(i), py(v));
      });
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      /* Line */
      ctx.beginPath();
      ctx.moveTo(px(0), py(data[0]));
      data.forEach((v, i) => {
        if (i === 0) return;
        const cpx = (px(i - 1) + px(i)) / 2;
        ctx.bezierCurveTo(cpx, py(data[i - 1]), cpx, py(v), px(i), py(v));
      });
      ctx.strokeStyle = "rgba(255,255,255,.7)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(255,255,255,.5)";
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      /* Live dot at end */
      const lx = px(data.length - 1);
      const ly = py(data[data.length - 1]);
      ctx.beginPath();
      ctx.arc(lx, ly, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      const t = Date.now() % 1200 / 1200;
      const pulse = Math.sin(t * Math.PI * 2) * .5 + .5;
      ctx.beginPath();
      ctx.arc(lx, ly, 4 + pulse * 10, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${.35 * (1 - pulse)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    let lastPush = 0;
    function loop(ts) {
      if (ts - lastPush > 420) { pushPoint(); lastPush = ts; }
      drawChart();
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ════════════════════════════════════════
     7.  CURSOR TRACKING
  ════════════════════════════════════════ */
  function initCursor() {
    const cursor = document.getElementById("avk-cursor");
    const ring   = document.getElementById("avk-cursor-ring");
    let rx = 0, ry = 0, mx = 0, my = 0;

    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener("mouseenter", () => { cursor.style.opacity = 1; ring.style.opacity = 1; });
    document.addEventListener("mouseleave", () => { cursor.style.opacity = 0; ring.style.opacity = 0; });

    document.querySelectorAll(".avk-card").forEach(c => {
      c.addEventListener("mouseenter", () => {
        ring.style.width = "60px";
        ring.style.height = "60px";
        ring.style.borderColor = "rgba(255,255,255,.7)";
      });
      c.addEventListener("mouseleave", () => {
        ring.style.width = "38px";
        ring.style.height = "38px";
        ring.style.borderColor = "rgba(255,255,255,.45)";
      });
    });

    function animCursor() {
      rx += (mx - rx) * .12;
      ry += (my - ry) * .12;
      cursor.style.left = mx + "px";
      cursor.style.top  = my + "px";
      ring.style.left   = rx + "px";
      ring.style.top    = ry + "px";
      requestAnimationFrame(animCursor);
    }
    animCursor();
  }

  /* ════════════════════════════════════════
     8.  LIVE TICKER PRICE UPDATES
  ════════════════════════════════════════ */
  function initTickerUpdates() {
    setInterval(() => {
      const items = document.querySelectorAll(".avk-tick-item");
      items.forEach((item, i) => {
        const t = TICKERS[i % TICKERS.length];
        const base = parseFloat(t.val.replace(/,/g, ""));
        const wobble = (Math.random() - .5) * base * .002;
        const newVal = (base + wobble).toFixed(base < 10 ? 4 : 2);
        const bEl = item.querySelector("b");
        const sEl = item.querySelectorAll("span")[1];
        if (bEl) bEl.textContent = parseFloat(newVal).toLocaleString("en-US", { minimumFractionDigits: newVal < 10 ? 4 : 2 });
        if (sEl) {
          const chg = ((wobble / base) * 100).toFixed(2);
          const up  = chg >= 0;
          sEl.textContent = (up ? "+" : "") + chg + "%";
          sEl.style.color = `rgba(255,255,255,${up ? ".75" : ".3"})`;
        }
      });
    }, 2200);
  }

  /* ════════════════════════════════════════
     9.  HELPERS
  ════════════════════════════════════════ */
  function el(tag, attrs = {}) {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") e.className = v;
      else e.setAttribute(k, v);
    });
    return e;
  }
  function htmlToNode(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  /* ════════════════════════════════════════
     10. BOOT
  ════════════════════════════════════════ */
  function boot() {
    buildDOM();
    initCanvas();
    requestAnimationFrame(() => {
      initChart();
      initCursor();
      initTickerUpdates();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();

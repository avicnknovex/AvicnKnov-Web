// ============================================================
//  AvicnKnov Web — more.js
//  Premium Navigation & UI Module
//  Black & White Glass Morphism | Treasure Map Live Animation
// ============================================================

(function () {
  "use strict";

  /* ──────────────────────────────────────────────
     CONFIG
  ────────────────────────────────────────────── */
  const CONFIG = {
    tradingURL: "trading.html",
    futuresURL: "future.html",
    siteName: "AvicnKnov Web",
    liveTickerSymbols: ["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD", "AVAX/USD"],
    graphPoints: 40,
    animationFPS: 60,
  };

  /* ──────────────────────────────────────────────
     INJECT GOOGLE FONTS + STYLES
  ────────────────────────────────────────────── */
  function injectStyles() {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.textContent = `
      /* ── RESET & BASE ── */
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --white:      #ffffff;
        --off-white:  #f0ede8;
        --glass-bg:   rgba(255,255,255,0.06);
        --glass-border: rgba(255,255,255,0.18);
        --glass-shine: rgba(255,255,255,0.35);
        --dark:       #080808;
        --dark-2:     #111111;
        --dark-3:     #1a1a1a;
        --ink:        rgba(255,255,255,0.75);
        --ink-dim:    rgba(255,255,255,0.38);
        --accent:     #ffffff;
        --glow:       rgba(255,255,255,0.12);
        --gold-trace: rgba(210,185,130,0.25);
        --font-display: 'Bebas Neue', sans-serif;
        --font-body:    'DM Mono', monospace;
        --font-serif:   'Playfair Display', serif;
        --radius:       14px;
        --radius-lg:    22px;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--dark);
        color: var(--white);
        font-family: var(--font-body);
        overflow-x: hidden;
        min-height: 100vh;
      }

      /* ── CANVAS BACKGROUND ── */
      #avicn-map-canvas {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        opacity: 0.55;
      }

      /* ── GRAIN OVERLAY ── */
      body::after {
        content: '';
        position: fixed;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        opacity: 0.35;
      }

      /* ── WRAPPER ── */
      #avicn-more-root {
        position: relative;
        z-index: 2;
        max-width: 980px;
        margin: 0 auto;
        padding: 60px 24px 100px;
      }

      /* ── HEADER ── */
      .avicn-header {
        text-align: center;
        margin-bottom: 54px;
        animation: fadeSlideDown 0.9s cubic-bezier(.16,1,.3,1) both;
      }

      .avicn-header__eyebrow {
        font-family: var(--font-body);
        font-size: 11px;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: var(--ink-dim);
        margin-bottom: 10px;
      }

      .avicn-header__title {
        font-family: var(--font-display);
        font-size: clamp(52px, 9vw, 96px);
        line-height: 0.92;
        letter-spacing: 0.02em;
        color: var(--white);
        text-shadow: 0 0 60px rgba(255,255,255,0.08);
      }

      .avicn-header__title span {
        color: transparent;
        -webkit-text-stroke: 1px rgba(255,255,255,0.5);
      }

      .avicn-header__sub {
        margin-top: 14px;
        font-size: 12px;
        color: var(--ink-dim);
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      /* ── LIVE TICKER STRIP ── */
      .avicn-ticker {
        position: relative;
        overflow: hidden;
        border-top: 1px solid var(--glass-border);
        border-bottom: 1px solid var(--glass-border);
        padding: 10px 0;
        margin-bottom: 52px;
        background: rgba(255,255,255,0.03);
        animation: fadeIn 1.2s ease both;
        animation-delay: 0.4s;
      }

      .avicn-ticker__track {
        display: flex;
        gap: 60px;
        animation: tickerScroll 18s linear infinite;
        white-space: nowrap;
        width: max-content;
      }

      .avicn-ticker__item {
        font-size: 11px;
        letter-spacing: 0.12em;
        color: var(--ink);
      }

      .avicn-ticker__item .val { color: var(--white); font-weight: 500; }
      .avicn-ticker__item .up  { color: #b5ffb5; }
      .avicn-ticker__item .dn  { color: #ffb5b5; }

      /* ── GRID ── */
      .avicn-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      /* ── GLASS CARD ── */
      .avicn-card {
        position: relative;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: 32px 28px 28px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.35s cubic-bezier(.16,1,.3,1),
                    box-shadow 0.35s ease,
                    border-color 0.35s ease;
        backdrop-filter: blur(18px) saturate(160%);
        -webkit-backdrop-filter: blur(18px) saturate(160%);
        animation: cardEntrance 0.7s cubic-bezier(.16,1,.3,1) both;
      }

      .avicn-card:nth-child(1) { animation-delay: 0.15s; }
      .avicn-card:nth-child(2) { animation-delay: 0.28s; }
      .avicn-card:nth-child(3) { animation-delay: 0.40s; }
      .avicn-card:nth-child(4) { animation-delay: 0.52s; }

      .avicn-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--glass-shine) 0%, transparent 55%);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
      }

      .avicn-card::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -60%;
        width: 220%;
        height: 220%;
        background: radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 65%);
        transform: rotate(-25deg);
        pointer-events: none;
        transition: transform 0.6s ease;
      }

      .avicn-card:hover {
        transform: translateY(-6px) scale(1.012);
        box-shadow: 0 24px 60px rgba(0,0,0,0.55),
                    0 0 0 1px rgba(255,255,255,0.22),
                    inset 0 1px 0 rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.32);
      }

      .avicn-card:hover::before { opacity: 1; }

      .avicn-card:hover::after {
        transform: rotate(-25deg) translate(10%, -5%);
      }

      /* ── CARD BADGE ── */
      .avicn-card__badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 9px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--ink-dim);
        border: 1px solid var(--glass-border);
        border-radius: 99px;
        padding: 4px 10px;
        margin-bottom: 18px;
        background: rgba(255,255,255,0.04);
      }

      .avicn-card__badge .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--white);
        animation: pulse 2s infinite;
      }

      /* ── CARD TITLE ── */
      .avicn-card__title {
        font-family: var(--font-display);
        font-size: 38px;
        letter-spacing: 0.04em;
        line-height: 1;
        color: var(--white);
        margin-bottom: 10px;
      }

      /* ── CARD DESC ── */
      .avicn-card__desc {
        font-size: 11.5px;
        line-height: 1.7;
        color: var(--ink-dim);
        margin-bottom: 24px;
        max-width: 260px;
      }

      /* ── CTA BUTTON ── */
      .avicn-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-body);
        font-size: 10.5px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--dark);
        background: var(--white);
        border: none;
        border-radius: 8px;
        padding: 12px 22px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(.16,1,.3,1);
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(255,255,255,0.12),
                    inset 0 1px 0 rgba(255,255,255,0.9);
      }

      .avicn-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
        transform: translateX(-100%);
        transition: transform 0.5s ease;
      }

      .avicn-btn:hover::before { transform: translateX(100%); }

      .avicn-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 32px rgba(255,255,255,0.2),
                    inset 0 1px 0 rgba(255,255,255,1);
      }

      .avicn-btn:active { transform: translateY(0); }

      .avicn-btn--ghost {
        background: transparent;
        color: var(--white);
        border: 1px solid var(--glass-border);
        box-shadow: none;
      }

      .avicn-btn--ghost:hover {
        background: rgba(255,255,255,0.08);
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        border-color: rgba(255,255,255,0.4);
      }

      /* ── ARROW ── */
      .avicn-btn .arrow {
        display: inline-block;
        transition: transform 0.3s ease;
      }
      .avicn-btn:hover .arrow { transform: translateX(4px); }

      /* ── LIVE GRAPH MINI ── */
      .avicn-graph-wrap {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 50px;
        opacity: 0.35;
        pointer-events: none;
      }

      .avicn-graph-wrap canvas {
        width: 100%;
        height: 100%;
      }

      /* ── LARGE CHART SECTION ── */
      .avicn-chart-section {
        margin-bottom: 40px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: 30px 28px 22px;
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        animation: fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) 0.6s both;
      }

      .avicn-chart-section__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .avicn-chart-section__label {
        font-family: var(--font-display);
        font-size: 22px;
        letter-spacing: 0.06em;
        color: var(--white);
      }

      .avicn-chart-section__live {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: var(--ink-dim);
      }

      .avicn-chart-section__live .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ffffff;
        animation: pulse 1.5s infinite;
      }

      #avicn-main-chart {
        width: 100%;
        height: 160px;
        display: block;
      }

      /* ── INFO ROW ── */
      .avicn-info-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 40px;
        animation: fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) 0.75s both;
      }

      .avicn-info-pill {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius);
        padding: 18px 20px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .avicn-info-pill__label {
        font-size: 9.5px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--ink-dim);
        margin-bottom: 8px;
      }

      .avicn-info-pill__value {
        font-family: var(--font-display);
        font-size: 28px;
        letter-spacing: 0.04em;
        color: var(--white);
      }

      .avicn-info-pill__value small {
        font-family: var(--font-body);
        font-size: 10px;
        color: var(--ink-dim);
        letter-spacing: 0.12em;
        margin-left: 6px;
      }

      /* ── FOOTER NOTE ── */
      .avicn-footer-note {
        text-align: center;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: var(--ink-dim);
        text-transform: uppercase;
        border-top: 1px solid var(--glass-border);
        padding-top: 30px;
        margin-top: 20px;
        animation: fadeIn 1.5s ease 1s both;
      }

      .avicn-footer-note a {
        color: var(--ink);
        text-decoration: none;
        border-bottom: 1px solid var(--glass-border);
        padding-bottom: 1px;
        transition: color 0.2s, border-color 0.2s;
      }
      .avicn-footer-note a:hover { color: var(--white); border-color: var(--white); }

      /* ── KEYFRAMES ── */
      @keyframes fadeSlideDown {
        from { opacity: 0; transform: translateY(-28px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      @keyframes cardEntrance {
        from { opacity: 0; transform: translateY(36px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes tickerScroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.75); }
      }

      /* ── RESPONSIVE ── */
      @media (max-width: 600px) {
        .avicn-grid { grid-template-columns: 1fr; }
        .avicn-info-row { grid-template-columns: 1fr 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ──────────────────────────────────────────────
     TREASURE MAP BACKGROUND CANVAS
  ────────────────────────────────────────────── */
  function createMapCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "avicn-map-canvas";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let W, H;
    const nodes = [];
    const paths = [];
    const particles = [];
    let tick = 0;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function buildMap() {
      nodes.length = 0;
      paths.length = 0;
      particles.length = 0;

      const count = Math.floor((W * H) / 22000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 3.5 + 1.2,
          pulse: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.018 + 0.008,
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            paths.push({ a: i, b: j, dist });
          }
        }
      }

      for (let k = 0; k < 18; k++) {
        const pathIdx = Math.floor(Math.random() * paths.length);
        particles.push({
          pathIdx,
          t: Math.random(),
          speed: Math.random() * 0.004 + 0.001,
        });
      }
    }

    function drawCross(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
      ctx.restore();
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      tick++;

      // Draw paths
      paths.forEach((p) => {
        const na = nodes[p.a];
        const nb = nodes[p.b];
        const alpha = 0.06 + 0.04 * Math.sin(tick * 0.01 + p.dist * 0.01);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.5;
        // Dashed treasure-map style
        ctx.setLineDash([4, 8]);
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw nodes
      nodes.forEach((n) => {
        n.pulse += n.speed;
        const pAlpha = 0.15 + 0.12 * Math.abs(Math.sin(n.pulse));
        const pSize = n.r + 1.5 * Math.abs(Math.sin(n.pulse));

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pSize * 4);
        grd.addColorStop(0, `rgba(255,255,255,${pAlpha * 0.6})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, pSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${pAlpha + 0.1})`;
        ctx.fill();
      });

      // Traveling particles (caravans along map paths)
      particles.forEach((pt) => {
        pt.t += pt.speed;
        if (pt.t > 1) pt.t = 0;
        const p = paths[pt.pathIdx];
        if (!p) return;
        const na = nodes[p.a];
        const nb = nodes[p.b];
        const px = na.x + (nb.x - na.x) * pt.t;
        const py = na.y + (nb.y - na.y) * pt.t;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      });

      // Scatter crosses
      if (tick % 90 === 0) {
        for (let c = 0; c < 3; c++) {
          drawCross(
            Math.random() * W,
            Math.random() * H,
            6,
            0.15
          );
        }
      }

      requestAnimationFrame(frame);
    }

    resize();
    buildMap();
    frame();
    window.addEventListener("resize", () => { resize(); buildMap(); });
  }

  /* ──────────────────────────────────────────────
     LIVE TICKER
  ────────────────────────────────────────────── */
  function createTicker() {
    function randomPrice(base) {
      return (base + (Math.random() - 0.5) * base * 0.04).toFixed(2);
    }
    const bases = { "BTC/USD": 67400, "ETH/USD": 3540, "SOL/USD": 182, "BNB/USD": 594, "AVAX/USD": 38 };

    function buildItems() {
      return CONFIG.liveTickerSymbols.map((sym) => {
        const price = randomPrice(bases[sym]);
        const change = ((Math.random() - 0.48) * 3.5).toFixed(2);
        const cls = parseFloat(change) >= 0 ? "up" : "dn";
        const sign = parseFloat(change) >= 0 ? "+" : "";
        return `<span class="avicn-ticker__item">
          ${sym} &nbsp;<span class="val">$${parseFloat(price).toLocaleString()}</span>&nbsp;
          <span class="${cls}">${sign}${change}%</span>
        </span>`;
      }).join("");
    }

    const ticker = document.createElement("div");
    ticker.className = "avicn-ticker";
    const track = document.createElement("div");
    track.className = "avicn-ticker__track";
    track.innerHTML = buildItems() + buildItems(); // duplicate for seamless loop
    ticker.appendChild(track);

    // Refresh prices every 3s
    setInterval(() => {
      track.innerHTML = buildItems() + buildItems();
    }, 3000);

    return ticker;
  }

  /* ──────────────────────────────────────────────
     MINI SPARKLINE
  ────────────────────────────────────────────── */
  function createSparkline(container) {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 50;
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let data = Array.from({ length: CONFIG.graphPoints }, () => Math.random());

    function normalize(arr) {
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return arr.map((v) => (v - min) / (max - min + 0.001));
    }

    function draw() {
      ctx.clearRect(0, 0, 100, 50);
      const norm = normalize(data);
      ctx.beginPath();
      norm.forEach((v, i) => {
        const x = (i / (norm.length - 1)) * 100;
        const y = 48 - v * 44;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      const grad = ctx.createLinearGradient(0, 0, 100, 0);
      grad.addColorStop(0, "rgba(255,255,255,0.2)");
      grad.addColorStop(1, "rgba(255,255,255,0.9)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latest point
      const lx = 98;
      const ly = 48 - norm[norm.length - 1] * 44;
      ctx.beginPath();
      ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }

    draw();
    setInterval(() => {
      data.push(Math.random());
      data.shift();
      draw();
    }, 800);
  }

  /* ──────────────────────────────────────────────
     MAIN CHART
  ────────────────────────────────────────────── */
  function createMainChart(canvas) {
    const ctx = canvas.getContext("2d");
    const W = canvas.clientWidth || 600;
    const H = 160;
    canvas.width = W;
    canvas.height = H;

    let series = Array.from({ length: 80 }, (_, i) => ({
      x: i,
      y: 50 + Math.sin(i * 0.18) * 20 + Math.random() * 14,
    }));

    function draw() {
      const w = canvas.parentElement.offsetWidth - 56 || W;
      canvas.width = w;
      ctx.clearRect(0, 0, w, H);

      // Grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach((f) => {
        ctx.beginPath();
        ctx.moveTo(0, H * f);
        ctx.lineTo(w, H * f);
        ctx.stroke();
      });

      // Area fill
      const pts = series.slice(-60);
      const minY = Math.min(...pts.map((p) => p.y));
      const maxY = Math.max(...pts.map((p) => p.y));
      const scaleX = w / (pts.length - 1);
      const scaleY = (H - 20) / (maxY - minY + 0.001);

      const toX = (i) => i * scaleX;
      const toY = (v) => H - 10 - (v - minY) * scaleY;

      const areaGrad = ctx.createLinearGradient(0, 0, 0, H);
      areaGrad.addColorStop(0, "rgba(255,255,255,0.14)");
      areaGrad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      pts.forEach((p, i) => {
        i === 0 ? ctx.moveTo(toX(i), toY(p.y)) : ctx.lineTo(toX(i), toY(p.y));
      });
      ctx.lineTo(toX(pts.length - 1), H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Line
      const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
      lineGrad.addColorStop(0, "rgba(255,255,255,0.3)");
      lineGrad.addColorStop(1, "rgba(255,255,255,1)");

      ctx.beginPath();
      pts.forEach((p, i) => {
        i === 0 ? ctx.moveTo(toX(i), toY(p.y)) : ctx.lineTo(toX(i), toY(p.y));
      });
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Last point glow
      const lastX = toX(pts.length - 1);
      const lastY = toY(pts[pts.length - 1].y);
      const grd = ctx.createRadialGradient(lastX, lastY, 0, lastX, lastY, 10);
      grd.addColorStop(0, "rgba(255,255,255,0.5)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(lastX, lastY, 10, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }

    draw();

    setInterval(() => {
      const last = series[series.length - 1];
      series.push({ x: last.x + 1, y: last.y + (Math.random() - 0.49) * 5 });
      if (series.length > 200) series.shift();
      draw();
    }, 700);

    window.addEventListener("resize", draw);
  }

  /* ──────────────────────────────────────────────
     LIVE STATS UPDATER
  ────────────────────────────────────────────── */
  function startLiveStats(pills) {
    const data = [
      { base: 1284733, format: (v) => "$" + Math.round(v).toLocaleString() },
      { base: 47382, format: (v) => Math.round(v).toLocaleString() },
      { base: 98.72, format: (v) => v.toFixed(2) + "%" },
    ];
    function update() {
      pills.forEach((pill, i) => {
        const d = data[i];
        const noise = 1 + (Math.random() - 0.5) * 0.002;
        d.base *= noise;
        const el = pill.querySelector(".avicn-info-pill__value");
        if (el) el.firstChild.textContent = d.format(d.base);
      });
    }
    setInterval(update, 1800);
  }

  /* ──────────────────────────────────────────────
     BUILD DOM
  ────────────────────────────────────────────── */
  function buildUI() {
    const root = document.createElement("div");
    root.id = "avicn-more-root";

    // Header
    root.innerHTML = `
      <header class="avicn-header">
        <p class="avicn-header__eyebrow">AvicnKnov Web — Premium Trading Platform</p>
        <h1 class="avicn-header__title">AVICN<span>KNOV</span></h1>
        <p class="avicn-header__sub">Professional Exchange &nbsp;|&nbsp; Real-Time Markets &nbsp;|&nbsp; Advanced Charts</p>
      </header>
    `;

    // Ticker
    root.appendChild(createTicker());

    // Cards
    const grid = document.createElement("div");
    grid.className = "avicn-grid";

    const cards = [
      {
        badge: "Live",
        title: "TRADING",
        desc: "Access real-time spot markets with professional-grade tools. Execute trades instantly on our secure exchange.",
        ctaText: "Open Trading Desk",
        ctaGhost: "Practice Mode",
        url: CONFIG.tradingURL,
        sparkline: true,
      },
      {
        badge: "Active",
        title: "FUTURES",
        desc: "Trade perpetual and dated futures contracts with up to 125x leverage. Advanced order types included.",
        ctaText: "Explore Futures",
        ctaGhost: "View Plans",
        url: CONFIG.futuresURL,
        sparkline: true,
      },
      {
        badge: "New",
        title: "ANALYTICS",
        desc: "Deep-dive market intelligence, on-chain data feeds, and AI-powered pattern recognition across all pairs.",
        ctaText: "Open Analytics",
        ctaGhost: "Learn More",
        url: "#analytics",
        sparkline: false,
      },
      {
        badge: "Beta",
        title: "API ACCESS",
        desc: "Integrate AvicnKnov data directly into your systems. REST & WebSocket. Rate limits up to 10k req/min.",
        ctaText: "Get API Keys",
        ctaGhost: "Documentation",
        url: "#api",
        sparkline: false,
      },
    ];

    cards.forEach((c) => {
      const card = document.createElement("div");
      card.className = "avicn-card";
      card.innerHTML = `
        <div class="avicn-card__badge"><span class="dot"></span>${c.badge}</div>
        <div class="avicn-card__title">${c.title}</div>
        <p class="avicn-card__desc">${c.desc}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="${c.url}" class="avicn-btn">
            ${c.ctaText} <span class="arrow">&#8594;</span>
          </a>
          <a href="${c.url}" class="avicn-btn avicn-btn--ghost">
            ${c.ctaGhost}
          </a>
        </div>
        ${c.sparkline ? '<div class="avicn-graph-wrap"></div>' : ""}
      `;
      if (c.sparkline) {
        const wrap = card.querySelector(".avicn-graph-wrap");
        createSparkline(wrap);
      }
      grid.appendChild(card);
    });

    root.appendChild(grid);

    // Main chart section
    const chartSection = document.createElement("div");
    chartSection.className = "avicn-chart-section";
    chartSection.innerHTML = `
      <div class="avicn-chart-section__header">
        <span class="avicn-chart-section__label">BTC / USD — Live Chart</span>
        <span class="avicn-chart-section__live"><span class="dot"></span>LIVE FEED</span>
      </div>
      <canvas id="avicn-main-chart"></canvas>
    `;
    root.appendChild(chartSection);

    // Info pills
    const infoRow = document.createElement("div");
    infoRow.className = "avicn-info-row";
    const pillData = [
      { label: "24H Volume", value: "$1,284,733", small: "USD" },
      { label: "Active Traders", value: "47,382", small: "online" },
      { label: "Uptime", value: "98.72%", small: "30d avg" },
    ];
    pillData.forEach((p) => {
      const pill = document.createElement("div");
      pill.className = "avicn-info-pill";
      pill.innerHTML = `
        <div class="avicn-info-pill__label">${p.label}</div>
        <div class="avicn-info-pill__value">${p.value}<small>${p.small}</small></div>
      `;
      infoRow.appendChild(pill);
    });
    root.appendChild(infoRow);

    // Footer note
    root.insertAdjacentHTML(
      "beforeend",
      `<div class="avicn-footer-note">
        &copy; ${new Date().getFullYear()} AvicnKnov Web &mdash; All rights reserved. &nbsp;|&nbsp;
        <a href="${CONFIG.tradingURL}">Trade Now</a> &nbsp;|&nbsp;
        <a href="${CONFIG.futuresURL}">Futures</a> &nbsp;|&nbsp;
        <a href="#terms">Terms</a>
      </div>`
    );

    document.body.appendChild(root);

    // Kick off live chart
    const mainCanvas = document.getElementById("avicn-main-chart");
    if (mainCanvas) createMainChart(mainCanvas);

    // Kick off live stats
    const pills = Array.from(infoRow.querySelectorAll(".avicn-info-pill"));
    startLiveStats(pills);
  }

  /* ──────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────── */
  function init() {
    injectStyles();
    createMapCanvas();
    buildUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

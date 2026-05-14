(function() {
  'use strict';

  /* ─── STYLES ─────────────────────────────────────────────────── */
  const CSS = `
  #moreRoot {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    background: #0a0a0a;
  }
  #moreCanvas {
    position: fixed;
    inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.45;
  }
  .more-inner {
    position: relative;
    z-index: 2;
    padding: 48px 40px 80px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ─── PAGE HEADER ─── */
  .more-page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 52px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .more-page-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 6vw, 76px);
    letter-spacing: 5px;
    line-height: 0.92;
    color: #fff;
  }
  .more-page-title span { color: #444; }
  .more-live-chip {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 6px 14px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #aaa;
    backdrop-filter: blur(12px);
    margin-bottom: 6px;
  }
  .more-live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #00e676;
    animation: morePulse 1.6s ease-in-out infinite;
  }
  @keyframes morePulse {
    0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(0,230,118,0.5); }
    50% { opacity: 0.5; transform: scale(0.8); box-shadow: 0 0 0 6px rgba(0,230,118,0); }
  }

  /* ─── PRIMARY ACTION BUTTONS ─── */
  .more-primary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }
  @media (max-width: 680px) {
    .more-primary-grid { grid-template-columns: 1fr; }
  }

  .more-prime-card {
    position: relative;
    border-radius: 20px;
    padding: 36px 32px 32px;
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    min-height: 220px;
  }
  .more-prime-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.08) 0%, transparent 65%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .more-prime-card::after {
    content: '';
    position: absolute;
    top: -1px; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: opacity 0.3s;
  }
  .more-prime-card:hover {
    transform: translateY(-5px) scale(1.015);
    box-shadow: 0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15);
  }
  .more-prime-card:hover::before { opacity: 1; }
  .more-prime-card.card-dark {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.15);
  }

  .mpcard-live-indicator {
    position: absolute;
    top: 18px; right: 18px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 4px 10px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 1px;
    color: #00e676;
  }
  .mpcard-live-indicator-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #00e676;
    animation: morePulse 1.2s ease-in-out infinite;
  }

  .mpcard-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s ease, background 0.3s ease;
  }
  .more-prime-card:hover .mpcard-icon {
    transform: scale(1.12) rotate(-4deg);
    background: rgba(255,255,255,0.1);
  }
  .mpcard-icon svg { width: 24px; height: 24px; stroke: #fff; stroke-width: 1.5; fill: none; }

  .mpcard-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #666;
  }
  .mpcard-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: 3px;
    line-height: 1;
    color: #fff;
  }
  .mpcard-desc {
    font-size: 12.5px;
    color: #777;
    line-height: 1.65;
    max-width: 320px;
  }
  .mpcard-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #fff;
    width: fit-content;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    backdrop-filter: blur(8px);
  }
  .mpcard-action svg { width: 13px; height: 13px; stroke: #aaa; stroke-width: 2.5; fill: none; transition: transform 0.2s; }
  .more-prime-card:hover .mpcard-action {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.3);
    transform: translateX(3px);
  }
  .more-prime-card:hover .mpcard-action svg { transform: translateX(3px); }

  /* Heartbeat line on card */
  .mpcard-heartbeat {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    overflow: hidden;
    border-radius: 0 0 20px 20px;
  }
  .mpcard-heartbeat canvas {
    width: 100%; height: 100%;
  }

  /* ─── FEATURE GRID ─── */
  .more-section-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .more-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #333, transparent);
  }

  .more-feat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }

  .more-feat-card {
    position: relative;
    padding: 26px 24px;
    border-radius: 16px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s, border-color 0.3s, background 0.3s;
  }
  .more-feat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .more-feat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border-color: rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05);
  }
  .more-feat-card:hover::before { opacity: 1; }

  .mfc-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
  }
  .more-feat-card:hover .mfc-icon { transform: scale(1.1) rotate(-5deg); }
  .mfc-icon svg { width: 18px; height: 18px; stroke: #bbb; stroke-width: 1.5; fill: none; }
  .mfc-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #fff;
  }
  .mfc-sub {
    font-size: 11.5px;
    color: #555;
    line-height: 1.55;
  }
  .mfc-arrow {
    margin-top: auto;
    width: 26px; height: 26px;
    border-radius: 7px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
  }
  .more-feat-card:hover .mfc-arrow {
    background: rgba(255,255,255,0.1);
    transform: translate(2px, -2px);
  }
  .mfc-arrow svg { width: 12px; height: 12px; stroke: #888; stroke-width: 2.5; fill: none; }

  /* ─── INFO BANNER ─── */
  .more-banner {
    position: relative;
    padding: 28px 32px;
    border-radius: 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(20px);
    overflow: hidden;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .more-banner::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%);
    pointer-events: none;
  }
  .more-banner-icon {
    width: 56px; height: 56px;
    border-radius: 15px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .more-banner-icon svg { width: 26px; height: 26px; stroke: #fff; stroke-width: 1.5; fill: none; }
  .more-banner-body { flex: 1; min-width: 220px; }
  .more-banner-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2.5px;
    color: #fff;
    margin-bottom: 5px;
  }
  .more-banner-text { font-size: 12.5px; color: #666; line-height: 1.6; }
  .more-banner-btn {
    padding: 11px 24px;
    border-radius: 10px;
    background: #fff;
    color: #000;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.2s, background 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .more-banner-btn:hover { background: #e0e0e0; transform: translateY(-1px); }

  /* ─── STAT ROW ─── */
  .more-stat-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .more-stat-card {
    padding: 22px 20px;
    border-radius: 14px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    text-align: center;
    transition: transform 0.25s, background 0.25s;
  }
  .more-stat-card:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.05);
  }
  .msc-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    letter-spacing: 2px;
    color: #fff;
    line-height: 1;
    margin-bottom: 5px;
  }
  .msc-lab {
    font-size: 10px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Space Mono', monospace;
  }

  /* ─── SCAN LINE EFFECT ─── */
  .more-scan-line {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    pointer-events: none;
    z-index: 1;
    animation: moreScanLine 6s linear infinite;
  }
  @keyframes moreScanLine {
    from { transform: translateY(0); }
    to { transform: translateY(100vh); }
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 600px) {
    .more-inner { padding: 32px 20px 60px; }
    .more-banner { flex-direction: column; }
    .more-feat-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 400px) {
    .more-feat-grid { grid-template-columns: 1fr; }
  }
  `;

  /* ─── INJECT STYLES ─────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('moreStyles')) return;
    const style = document.createElement('style');
    style.id = 'moreStyles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ─── HTML TEMPLATE ─────────────────────────────────────────── */
  const HTML = `
  <div id="moreRoot">
    <canvas id="moreCanvas"></canvas>
    <div class="more-scan-line"></div>

    <div class="more-inner">

      <!-- PAGE HEADER -->
      <div class="more-page-header">
        <div>
          <div class="more-live-chip">
            <span class="more-live-dot"></span>
            AvicnKnov Exchange · All Services
          </div>
          <div class="more-page-title">EXPLORE<br/><span>MORE</span></div>
        </div>
      </div>

      <!-- STAT ROW -->
      <div class="more-stat-row">
        <div class="more-stat-card">
          <div class="msc-val">$2.4B</div>
          <div class="msc-lab">24h Volume</div>
        </div>
        <div class="more-stat-card">
          <div class="msc-val">150+</div>
          <div class="msc-lab">Markets</div>
        </div>
        <div class="more-stat-card">
          <div class="msc-val">99.9%</div>
          <div class="msc-lab">Uptime</div>
        </div>
        <div class="more-stat-card">
          <div class="msc-val">2M+</div>
          <div class="msc-lab">Traders</div>
        </div>
        <div class="more-stat-card">
          <div class="msc-val">&lt;0.3ms</div>
          <div class="msc-lab">Execution</div>
        </div>
      </div>

      <!-- PRIMARY ACTIONS -->
      <div class="more-section-label">Primary Trading Desks</div>
      <div class="more-primary-grid">

        <!-- SPOT TRADING -->
        <a class="more-prime-card card-dark" href="trading.html">
          <div class="mpcard-live-indicator">
            <span class="mpcard-live-indicator-dot"></span> LIVE
          </div>
          <div class="mpcard-icon">
            <svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </div>
          <div class="mpcard-label">Spot Market</div>
          <div class="mpcard-title">TRADING</div>
          <div class="mpcard-desc">Buy and sell 150+ crypto assets with real-time order books, advanced charting, and sub-0.3ms execution. Professional tools for every level of trader.</div>
          <div class="mpcard-action">
            Open Trading Desk
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
          <div class="mpcard-heartbeat"><canvas id="hbCanvasTrade" height="2"></canvas></div>
        </a>

        <!-- FUTURES -->
        <a class="more-prime-card" href="futures.html">
          <div class="mpcard-live-indicator">
            <span class="mpcard-live-indicator-dot"></span> LIVE
          </div>
          <div class="mpcard-icon">
            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="mpcard-label">Derivatives Market</div>
          <div class="mpcard-title">FUTURES</div>
          <div class="mpcard-desc">Leverage up to 125x on perpetual and quarterly futures contracts. Deep liquidity, cross-margin, and isolated-margin accounts with professional risk tools.</div>
          <div class="mpcard-action">
            Open Futures Desk
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
          <div class="mpcard-heartbeat"><canvas id="hbCanvasFutures" height="2"></canvas></div>
        </a>

      </div>

      <!-- ANNOUNCEMENT BANNER -->
      <div class="more-banner">
        <div class="more-banner-icon">
          <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </div>
        <div class="more-banner-body">
          <div class="more-banner-title">Aquarius Launchpad — Now Live</div>
          <div class="more-banner-text">AI-vetted token launches, hyper-curated projects, and real-time liquidity bootstrapping. The future of token discovery is here — exclusively on AvicnKnov.</div>
        </div>
        <button class="more-banner-btn" onclick="window.location.href='trading.html'">Explore Now</button>
      </div>

      <!-- FEATURE LINKS -->
      <div class="more-section-label">All Services</div>
      <div class="more-feat-grid" id="moreFeatGrid"></div>

      <!-- ABOUT BANNER -->
      <div class="more-section-label">About AvicnKnov</div>
      <div class="more-banner" style="flex-direction:column;align-items:flex-start;gap:16px;">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div class="more-banner-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="more-banner-title" style="font-size:20px;">AvicnKnov Exchange</div>
        </div>
        <div class="more-banner-text" style="font-size:13px;max-width:740px;color:#666;">
          AvicnKnov is a sovereign trading ecosystem engineered for the next era of finance. Powered by a self-evolving AI infrastructure, the Aquarius Token Launchpad, and institutional execution rails that most platforms cannot replicate. Whether you are deploying your first $10 or managing a $10M book — this is the last exchange you will ever need.
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:4px;">
          <a href="about.html" style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#fff;text-decoration:none;font-size:12px;font-weight:600;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            About Us
          </a>
          <a href="help.html" style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#fff;text-decoration:none;font-size:12px;font-weight:600;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            Help Center
          </a>
          <a href="service.html" style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#fff;text-decoration:none;font-size:12px;font-weight:600;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Terms of Service
          </a>
        </div>
      </div>

    </div><!-- end more-inner -->
  </div>
  `;

  /* ─── FEATURE ITEMS ─────────────────────────────────────────── */
  const FEATURES = [
    {
      name: 'Spot Trading',
      sub: 'Buy & sell 150+ crypto pairs with real-time execution.',
      href: 'trading.html',
      icon: `<svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`
    },
    {
      name: 'Futures',
      sub: 'Perpetual & quarterly contracts up to 125x leverage.',
      href: 'futures.html',
      icon: `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    },
    {
      name: 'AvicnKnov AI',
      sub: 'Neural trade intelligence — 240+ live market signals.',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>`
    },
    {
      name: 'Aquarius Launchpad',
      sub: 'AI-vetted token launches & liquidity bootstrapping.',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
    },
    {
      name: 'Analytics Suite',
      sub: 'Institutional-grade heatmaps, order-book data & on-chain flows.',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
    },
    {
      name: 'Security Vault',
      sub: '98% cold storage. $500M insurance fund protecting your assets.',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
    },
    {
      name: 'Profile',
      sub: 'Manage your account, KYC and personal details.',
      href: 'profile.html',
      icon: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    },
    {
      name: 'Settings',
      sub: 'Preferences, notifications, API keys and security.',
      href: 'setting.html',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
    },
    {
      name: 'Help Center',
      sub: '24/7 support with sub-2-minute response times.',
      href: 'help.html',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    },
    {
      name: 'About AvicnKnov',
      sub: 'Our mission, team, and the story behind the exchange.',
      href: 'about.html',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    },
    {
      name: 'Privacy Policy',
      sub: 'How we collect, use and protect your personal data.',
      href: 'policy.html',
      icon: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      name: 'Terms of Service',
      sub: 'Platform rules, legal agreements, and usage policies.',
      href: 'service.html',
      icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
    }
  ];

  /* ─── BACKGROUND CANVAS — TREASURE MAP / RIVER FLOW ─────────── */
  function initMapCanvas() {
    const canvas = document.getElementById('moreCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.getElementById('moreRoot').scrollHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Flowing river-path nodes
    const RIVERS = 5;
    const rivers = [];
    for (let r = 0; r < RIVERS; r++) {
      const pts = [];
      const startX = Math.random() * canvas.width;
      let x = startX, y = -40;
      const steps = 30 + Math.floor(Math.random() * 20);
      for (let i = 0; i < steps; i++) {
        x += (Math.random() - 0.5) * 140;
        y += (canvas.height + 80) / steps;
        pts.push({ x, y });
      }
      rivers.push({
        pts,
        offset: Math.random() * 1000,
        speed: 0.2 + Math.random() * 0.4,
        width: 0.6 + Math.random() * 1.2,
        alpha: 0.03 + Math.random() * 0.06
      });
    }

    // Grid dots (map grid)
    const COLS = Math.ceil(window.innerWidth / 60);
    const ROWS = 40;
    const dots = [];
    for (let c = 0; c <= COLS; c++) {
      for (let row = 0; row <= ROWS; row++) {
        dots.push({
          x: c * 60 + (Math.random() - 0.5) * 20,
          y: row * 60 + (Math.random() - 0.5) * 20,
          r: Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          freq: 0.3 + Math.random() * 0.7
        });
      }
    }

    // Contour lines (treasure map)
    const CONTOURS = 8;
    const contours = [];
    for (let c = 0; c < CONTOURS; c++) {
      const cx = 0.2 + Math.random() * 0.6;
      const cy = 0.1 + Math.random() * 0.8;
      const radX = 80 + Math.random() * 200;
      const radY = 60 + Math.random() * 160;
      const rot = Math.random() * Math.PI;
      contours.push({ cx, cy, radX, radY, rot, alpha: 0.015 + Math.random() * 0.025 });
    }

    // Particles flowing along rivers
    const particles = [];
    for (let i = 0; i < 60; i++) {
      const ri = Math.floor(Math.random() * RIVERS);
      particles.push({
        ri,
        t: Math.random(),
        speed: 0.0003 + Math.random() * 0.0008,
        size: 0.8 + Math.random() * 1.6,
        alpha: 0.1 + Math.random() * 0.25
      });
    }

    let frame = 0;
    let animId;

    function catmullRom(pts, t) {
      const n = pts.length;
      const seg = Math.min(Math.floor(t * (n - 1)), n - 2);
      const lt = (t * (n - 1)) - seg;
      const p0 = pts[Math.max(seg - 1, 0)];
      const p1 = pts[seg];
      const p2 = pts[Math.min(seg + 1, n - 1)];
      const p3 = pts[Math.min(seg + 2, n - 1)];
      const t2 = lt * lt, t3 = lt * lt * lt;
      return {
        x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*lt + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
        y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*lt + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
      };
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const t = frame * 0.008;

      // ── Contour ellipses
      contours.forEach(co => {
        ctx.save();
        ctx.translate(co.cx * W, co.cy * H);
        ctx.rotate(co.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, co.radX, co.radY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${co.alpha})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([8, 16]);
        ctx.lineDashOffset = t * 12;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // ── Grid dots
      dots.forEach(d => {
        const pulse = 0.5 + 0.5 * Math.sin(t * d.freq + d.phase);
        const a = 0.06 * pulse;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      // ── River paths
      rivers.forEach(rv => {
        ctx.beginPath();
        const pts = rv.pts;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 2; i++) {
          const cx1 = (pts[i].x + pts[i+1].x) / 2;
          const cy1 = (pts[i].y + pts[i+1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, cx1, cy1);
        }
        ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
        ctx.strokeStyle = `rgba(255,255,255,${rv.alpha})`;
        ctx.lineWidth = rv.width;
        ctx.stroke();
      });

      // ── Flowing particles along rivers
      particles.forEach(p => {
        const rv = rivers[p.ri];
        const pos = catmullRom(rv.pts, p.t);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
      });

      // ── Faint crosshair marks (treasure map X)
      const MARKS = [
        { xr: 0.18, yr: 0.22 }, { xr: 0.75, yr: 0.45 },
        { xr: 0.5, yr: 0.72 }, { xr: 0.88, yr: 0.15 }
      ];
      MARKS.forEach(m => {
        const mx = m.xr * W, my = m.yr * H;
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.5 + mx));
        ctx.save();
        ctx.globalAlpha = 0.04 * pulse;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        const sz = 10;
        ctx.beginPath();
        ctx.moveTo(mx - sz, my - sz); ctx.lineTo(mx + sz, my + sz);
        ctx.moveTo(mx + sz, my - sz); ctx.lineTo(mx - sz, my + sz);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mx, my, sz * 1.8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      frame++;
      animId = requestAnimationFrame(draw);
    }

    draw();

    // Cleanup when tab changes
    return () => cancelAnimationFrame(animId);
  }

  /* ─── HEARTBEAT LINE CANVAS ─────────────────────────────────── */
  function initHeartbeat(canvasId, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = 2;
    const ctx = canvas.getContext('2d');
    let offset = 0;
    function draw() {
      const W = canvas.width;
      ctx.clearRect(0, 0, W, 2);
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      const pos = (offset % W) / W;
      grad.addColorStop(Math.max(0, pos - 0.15), 'transparent');
      grad.addColorStop(pos, color || 'rgba(255,255,255,0.8)');
      grad.addColorStop(Math.min(1, pos + 0.15), 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, 2);
      offset += 2.5;
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─── BUILD FEATURE GRID ─────────────────────────────────────── */
  function buildFeatGrid() {
    const grid = document.getElementById('moreFeatGrid');
    if (!grid) return;
    grid.innerHTML = FEATURES.map(f => `
      <a class="more-feat-card" href="${f.href}">
        <div class="mfc-icon">${f.icon}</div>
        <div class="mfc-name">${f.name}</div>
        <div class="mfc-sub">${f.sub}</div>
        <div class="mfc-arrow">
          <svg viewBox="0 0 24 24"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </div>
      </a>
    `).join('');
  }

  /* ─── STAGGER ENTRANCE ANIMATION ─────────────────────────────── */
  function staggerEntrance() {
    const items = document.querySelectorAll(
      '#moreRoot .more-prime-card, #moreRoot .more-feat-card, #moreRoot .more-banner, #moreRoot .more-stat-card'
    );
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = (el.style.transform || '') + ' translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s cubic-bezier(.22,.68,0,1.2) ${i * 0.04}s`;
      setTimeout(() => {
        el.style.opacity = '';
        el.style.transform = '';
      }, 60 + i * 40);
    });
  }

  /* ─── MAIN INIT ─────────────────────────────────────────────── */
  window.init_tabContentMore = function () {
    const container = document.getElementById('tabContentMore');
    if (!container) return;

    injectStyles();
    container.innerHTML = HTML;
    buildFeatGrid();

    requestAnimationFrame(() => {
      initMapCanvas();
      initHeartbeat('hbCanvasTrade', 'rgba(255,255,255,0.7)');
      initHeartbeat('hbCanvasFutures', 'rgba(255,255,255,0.7)');
      staggerEntrance();
    });
  };

  // Auto-init if container is already in DOM and visible
  if (document.getElementById('tabContentMore') &&
      document.getElementById('tabContentMore').classList.contains('active')) {
    window.init_tabContentMore();
  }

})();

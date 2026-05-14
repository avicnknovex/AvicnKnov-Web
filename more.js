/* ============================================================
   more.js — AvicnKnov Web · "More" Tab Module
   Loaded dynamically into #tabContentMore by index.html
   ============================================================ */

(function () {
  'use strict';

  /* ---- inject styles ---- */
  if (!document.getElementById('more-tab-styles')) {
    const style = document.createElement('style');
    style.id = 'more-tab-styles';
    style.textContent = `
/* ===== RESET / VARS ===== */
#moreTabRoot {
  --bg:        #090909;
  --s1:        #111111;
  --s2:        #181818;
  --b1:        #1e1e1e;
  --b2:        #2a2a2a;
  --w:         #ffffff;
  --g1:        #888888;
  --g2:        #444444;
  --accent:    #ffffff;
  --glass-bg:  rgba(255,255,255,0.04);
  --glass-bdr: rgba(255,255,255,0.10);
  --green:     #00e676;
  font-family: 'DM Sans', sans-serif;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--bg);
  position: relative;
}

/* ===== CANVAS BG ===== */
#moreBgCanvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ===== WRAPPER ===== */
.more-wrap {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 28px 120px;
}

/* ===== HEADER TITLE ===== */
.more-header {
  text-align: center;
  padding: 20px 0 64px;
  position: relative;
}
.more-site-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(44px, 8vw, 88px);
  letter-spacing: 8px;
  line-height: 1;
  background: linear-gradient(135deg, #fff 30%, #555 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  filter: drop-shadow(0 0 40px rgba(255,255,255,0.08));
}
.more-site-sub {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--g1);
  margin-top: 10px;
}
.more-header-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  margin: 20px auto 0;
  animation: moreLinePulse 3s ease-in-out infinite;
}
@keyframes moreLinePulse {
  0%,100%{ opacity:.3; width:60px; }
  50%{ opacity:1; width:120px; }
}

/* ===== NAV BUTTONS ===== */
.more-nav {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 72px;
}
.more-nav-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 32px 24px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid var(--glass-bdr);
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  transition: transform .35s cubic-bezier(.22,1,.36,1),
              box-shadow .35s ease,
              border-color .35s ease;
  overflow: hidden;
  min-width: 200px;
  max-width: 280px;
  flex: 1;
  text-decoration: none;
  color: inherit;
}
.more-nav-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 65%);
  opacity: 0;
  transition: opacity .35s;
}
.more-nav-btn:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.2);
}
.more-nav-btn:hover::before { opacity: 1; }
.more-nav-btn:active {
  transform: translateY(-2px) scale(0.985);
}

/* glass sheen on hover */
.more-nav-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 50%;
  height: 200%;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%);
  transform: skewX(-15deg);
  transition: left .6s ease;
}
.more-nav-btn:hover::after { left: 130%; }

/* ---- icon containers ---- */
.mnb-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform .35s cubic-bezier(.22,1,.36,1);
}
.more-nav-btn:hover .mnb-icon {
  transform: scale(1.1) rotate(-3deg);
}
.mnb-icon svg {
  width: 26px;
  height: 26px;
  stroke: #fff;
  stroke-width: 1.6;
  fill: none;
  position: relative;
  z-index: 1;
}
/* pulse ring on icon */
.mnb-icon::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.14);
  animation: mnbRing 2.5s ease-in-out infinite;
  opacity: 0;
}
.more-nav-btn:hover .mnb-icon::after { opacity: 1; }
@keyframes mnbRing {
  0%  { transform: scale(1);   opacity: .6; }
  60% { transform: scale(1.18);opacity: 0;  }
  100%{ transform: scale(1);   opacity: 0;  }
}

.mnb-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 3px;
  color: #fff;
  text-align: center;
}
.mnb-desc {
  font-size: 12px;
  color: var(--g1);
  text-align: center;
  line-height: 1.55;
  max-width: 200px;
}

/* click ripple */
.more-nav-btn.mnb-clicked {
  animation: mnbClick .45s ease;
}
@keyframes mnbClick {
  0%  { transform: translateY(-6px) scale(1.02); }
  30% { transform: translateY(-3px) scale(0.96); }
  70% { transform: translateY(-5px) scale(1.01); }
  100%{ transform: translateY(-6px) scale(1.02); }
}

/* ===== SECTION TITLE ===== */
.more-section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(22px, 3vw, 32px);
  letter-spacing: 5px;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
}
.more-section-sub {
  font-size: 12px;
  color: var(--g1);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 48px;
}

/* ===== TREASURE MAP TRACK ===== */
.treasure-track-section {
  position: relative;
  padding: 20px 0 60px;
}

/* SVG path track */
.treasure-svg-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: visible;
}
.treasure-svg-wrap svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.track-path {
  fill: none;
  stroke: rgba(255,255,255,0.06);
  stroke-width: 2;
  stroke-dasharray: 8 10;
}
.track-path-glow {
  fill: none;
  stroke: rgba(255,255,255,0.15);
  stroke-width: 1;
  stroke-dasharray: 8 10;
  filter: blur(2px);
}
.track-dot {
  fill: rgba(255,255,255,0.25);
}

/* Cards grid — alternating left/right */
.treasure-cards {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  z-index: 2;
}

.tc-row {
  display: flex;
  justify-content: flex-start;
  padding: 0 4%;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1);
}
.tc-row.right {
  justify-content: flex-end;
}
.tc-row.visible {
  opacity: 1;
  transform: translateY(0);
}

/* the card itself */
.tc-card {
  width: min(520px, 100%);
  border-radius: 18px;
  border: 1px solid var(--glass-bdr);
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 28px 28px 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform .4s cubic-bezier(.22,1,.36,1),
              box-shadow .4s ease,
              border-color .4s ease;
}
.tc-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 0%, transparent 60%);
  opacity: 0;
  transition: opacity .4s;
}
.tc-card:hover {
  transform: scale(1.025) translateY(-4px);
  box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.13);
  border-color: rgba(255,255,255,0.18);
}
.tc-card:hover::before { opacity: 1; }

/* glass sheen */
.tc-card::after {
  content: '';
  position: absolute;
  top: 0; left: -70%;
  width: 45%;
  height: 100%;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
  transform: skewX(-10deg);
  transition: left .7s ease;
  pointer-events: none;
}
.tc-card:hover::after { left: 130%; }

/* card click zoom */
.tc-card.tc-expanded {
  z-index: 10;
  transform: scale(1.04) translateY(-6px);
  box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.22);
}

/* card inner */
.tc-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.tc-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition: transform .3s ease;
}
.tc-card:hover .tc-icon { transform: scale(1.08) rotate(-2deg); }
.tc-icon svg {
  width: 22px; height: 22px;
  stroke: #fff; stroke-width: 1.6; fill: none;
  position: relative; z-index: 1;
}
.tc-icon-anim {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: tcIconPulse 2.8s ease-in-out infinite;
  opacity: 0;
}
.tc-card:hover .tc-icon-anim { opacity: 1; }
@keyframes tcIconPulse {
  0%,100%{ transform: scale(.8); opacity:0; }
  50%{ transform: scale(1.2); opacity:1; }
}

.tc-card-meta {
  flex: 1;
}
.tc-badge {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--g1);
  margin-bottom: 4px;
}
.tc-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 17px;
  letter-spacing: 2.5px;
  color: #fff;
  line-height: 1.1;
}

.tc-body {
  font-size: 13px;
  color: var(--g1);
  line-height: 1.75;
}

/* status chip */
.tc-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 16px;
  padding: 4px 11px;
  border-radius: 100px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--g1);
}
.tc-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--g1);
  animation: morePulse 2s ease-in-out infinite;
}
.tc-status.coming .tc-status-dot { background: #888; }
.tc-status.soon .tc-status-dot { background: #fff; }
@keyframes morePulse {
  0%,100%{ opacity:1; }
  50%{ opacity:.3; }
}

/* expanded detail overlay */
.tc-detail-overlay {
  display: none;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.tc-card.tc-expanded .tc-detail-overlay { display: block; }
.tc-detail-text {
  font-size: 12.5px;
  color: #bbb;
  line-height: 1.85;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 680px) {
  .more-nav { flex-direction: column; align-items: center; }
  .more-nav-btn { min-width: unset; width: 100%; max-width: 100%; }
  .tc-row, .tc-row.right { padding: 0; justify-content: center; }
  .tc-card { width: 100%; }
}
    `;
    document.head.appendChild(style);
  }

  /* ---- inject fonts if missing ---- */
  if (!document.querySelector('link[href*="Bebas"]')) {
    const lnk = document.createElement('link');
    lnk.rel = 'stylesheet';
    lnk.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap';
    document.head.appendChild(lnk);
  }

  /* ==========================
     FUTURE CARDS DATA
     ========================== */
  const futureCards = [
    {
      badge: 'Artificial Intelligence',
      title: 'AI-Powered Trade Assistant',
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/></svg>`,
      body: `AvicnKnov's proprietary neural AI engine will analyze over 240 live market signals simultaneously — from order-book microstructure and on-chain whale flows to social sentiment scores. It delivers real-time trade setups, risk alerts, and personalized strategy recommendations directly to your dashboard.`,
      detail: `The AI layer will learn from your trading behavior over time, adjusting its signal weights to match your risk profile. Integration will include automated stop-loss suggestions, volatility regime detection, and a natural-language query interface to ask the AI anything about current market conditions.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Live Events',
      title: 'AvicnKnov Live Events',
      icon: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      body: `Exclusive live trading sessions, market deep-dives, and Q&A events hosted directly inside AvicnKnov. Attend real-time webinars where senior analysts break down macro trends, on-chain data, and precise entry/exit levels — all streamed natively in the platform.`,
      detail: `Events will include interactive polls, live chart annotations, and replay archives. Premium members will gain early access to speakers and the ability to submit questions pre-event. Scheduled events will appear in your personalized calendar with push reminders.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Community',
      title: 'AvicnKnov Group Hub',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
      body: `A dedicated community layer inside AvicnKnov — topic-based groups, strategy sharing rooms, and curated feeds of the best trade ideas from verified community members. Connect with traders who share your style, market view, or favorite assets.`,
      detail: `Groups will support threaded discussion, chart embeds, and reputation scoring based on real trade accuracy. Verified analysts and institutional members will have distinct profile tiers. Content moderation will be AI-assisted with community voting.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Voice & Alerts',
      title: 'Live Call — Join Sessions',
      icon: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.62 1.22l3-.09a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      body: `Join live audio call sessions with top AvicnKnov analysts and verified community traders. Get real-time commentary on breaking market moves, live chart walkthroughs, and instant signal alerts — all in a single synchronized session experience.`,
      detail: `Sessions will include speaker queues, raise-hand features, and auto-generated transcripts with timestamped highlights. Recordings will be archived for 30 days. Premium users can unlock exclusive private sessions with institutional-level analysts.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Milestones',
      title: 'Achievements System',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
      body: `A gamified achievement layer tracking every milestone in your trading journey — from your first completed trade to advanced milestones like holding through volatility spikes, maintaining a 7-day winning streak, or hitting a 20x return on a single position.`,
      detail: `Over 80 unique achievement badges will be available at launch. Badges will be permanently attached to your profile and visible to the community. Rare achievements unlock cosmetic profile upgrades, reduced fees, and early access to new AvicnKnov features.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Premium Tier',
      title: 'Qinnt Premium Access',
      icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      body: `Qinnt is AvicnKnov's premium membership tier — unlocking exclusive analytics, priority order routing, reduced taker fees, and access to the full institutional-grade feature set. Qinnt members get the same tools used by the world's largest crypto desks.`,
      detail: `Tiers will include Qinnt Silver, Gold, and Platinum — each scaling fee discounts, analytics depth, and support priority. Platinum members gain a dedicated relationship manager, monthly strategy reports, and early access to every upcoming AvicnKnov product launch.`,
      status: 'soon',
      statusLabel: 'Opening Soon',
    },
    {
      badge: 'Announcement',
      title: 'Avicn & TQZ — The Reveal',
      icon: `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
      body: `The most anticipated announcement in AvicnKnov history. Avicn&TQZ is a landmark collaboration and product reveal that will permanently redefine the boundaries of what a next-generation crypto exchange can offer. Details are intentionally classified — and the wait is worth every second.`,
      detail: `What is known: it involves a new asset class, a cross-platform integration, and a technology that no other exchange currently operates. When it drops, AvicnKnov users will be the first — and for a limited window, the only — people in the world with access.`,
      status: 'soon',
      statusLabel: 'Classified — Dropping Soon',
    },
    {
      badge: 'Token Launchpad',
      title: 'Aquarius Launch Platform',
      icon: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      body: `AvicnKnov's Aquarius Launchpad is the most rigorous token launch system ever built. Every project undergoes AI-powered smart contract auditing, team verification, tokenomics scoring, and community vetting before a single token reaches the market.`,
      detail: `Aquarius introduces a novel bonding curve mechanic that prevents launch-day dumping, ensuring fair price discovery. Verified community members gain whitelist access to curated launches. Post-launch, every Aquarius token is tracked with real-time on-chain analytics for 180 days.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Portfolio Tools',
      title: 'Smart Portfolio Dashboard',
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
      body: `A fully unified portfolio command center — track every position, unrealized PnL, risk exposure, and asset correlation across spot and futures simultaneously. Visualize your entire financial picture with one-click depth.`,
      detail: `Includes heat-map views, export to CSV/PDF, tax lot tracking for multiple jurisdictions, and a risk score engine that flags over-concentration in correlated assets. Portfolio snapshots can be pinned and compared across time periods to review strategy evolution.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Copy Trading',
      title: 'Mirror Trade Engine',
      icon: `<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
      body: `Automatically mirror the trades of top-performing AvicnKnov traders — with full control over position sizing, maximum drawdown limits, and which markets to follow. Set your parameters once and Mirror Trade handles execution instantly.`,
      detail: `Traders who share their strategy earn a portion of copy fees, creating a sustainable signal economy. All mirrored traders are ranked by risk-adjusted return, not just raw gain — ensuring you follow consistent performers, not lucky streaks.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'On-Chain Analytics',
      title: 'Chain Intelligence Layer',
      icon: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
      body: `Live on-chain data feeds covering wallet flows, exchange deposit surges, miner behavior, stablecoin movements, and smart money accumulation patterns — all visualized directly inside AvicnKnov's analytics terminal.`,
      detail: `The Chain Intelligence layer will flag wallets associated with known institutional players and alert you when significant on-chain events occur in assets you hold. Cross-chain tracking covers Ethereum, Solana, BTC, and 12 additional networks at launch.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Security',
      title: 'Vault Shield — Cold Storage',
      icon: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      body: `AvicnKnov's Vault Shield program gives users direct access to institutional-grade cold storage — with multi-signature withdrawal authorization, time-locked transactions, and hardware wallet binding for maximum self-custody assurance.`,
      detail: `Vault Shield accounts will have a dedicated withdrawal delay window (configurable 0–72 hours) as a social engineering defense. Biometric re-authentication is required at each stage of the withdrawal pipeline. A $500M insurance fund backs all Vault Shield balances.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Developer Tools',
      title: 'AvicnKnov API Pro',
      icon: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      body: `A professional-grade REST and WebSocket API giving developers, quants, and algorithmic traders full access to AvicnKnov's order book, trade history, and account management endpoints — with sub-10ms WebSocket message delivery and 99.997% API uptime.`,
      detail: `API Pro will include a sandbox environment with simulated market data, a visual API key manager with granular permissions, rate limit dashboards, and native SDK packages for Python, JavaScript, and Rust. Institutional clients gain dedicated IP whitelisting and dedicated rate limit tiers.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Education',
      title: 'AvicnKnov Academy',
      icon: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      body: `An interactive education hub built inside the exchange — covering everything from crypto fundamentals and technical analysis to advanced futures mechanics and on-chain research methodology. Learn by doing: paper trade directly from lesson modules.`,
      detail: `Academy courses will be structured into skill paths with completion certificates stored on-chain as NFT credentials. Progress tracking, quiz systems, and community-answered discussion threads will accompany every module. Instructor-led tracks from verified analysts drop quarterly.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
    {
      badge: 'Global Access',
      title: 'Fiat Bridge — 80 Currencies',
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      body: `Deposit and withdraw in 80+ fiat currencies with bank transfer, card, and regional payment methods supported across every continent. AvicnKnov's Fiat Bridge processes conversions in seconds with near-zero spread and no hidden fees.`,
      detail: `Supported corridors will include SEPA, SWIFT, UPI, PromptPay, PIX, and local bank networks across Southeast Asia, Latin America, and Africa. KYC-verified users unlock higher limits. Instant card top-ups will be available at launch for 40 countries.`,
      status: 'coming',
      statusLabel: 'Coming Soon',
    },
  ];

  /* ==========================
     RENDER THE ROOT
     ========================== */
  const container = document.getElementById('tabContentMore');
  container.innerHTML = '';

  const root = document.createElement('div');
  root.id = 'moreTabRoot';

  root.innerHTML = `
    <!-- Animated canvas background -->
    <canvas id="moreBgCanvas"></canvas>

    <div class="more-wrap">

      <!-- HEADER -->
      <div class="more-header">
        <div class="more-site-name">AvicnKnov Web</div>
        <div class="more-site-sub">The Next Generation Exchange</div>
        <div class="more-header-line"></div>
      </div>

      <!-- NAV BUTTONS -->
      <div class="more-nav">
        <div class="more-nav-btn" id="mnbTrading" onclick="moreNavClick('trading.html', this)">
          <div class="mnb-icon">
            <svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </div>
          <div class="mnb-label">Trading</div>
          <div class="mnb-desc">Access the AvicnKnov spot trading terminal — one click to your first live trade on our exchange.</div>
        </div>
        <div class="more-nav-btn" id="mnbFutures" onclick="moreNavClick('futures.html', this)">
          <div class="mnb-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div class="mnb-label">Futures</div>
          <div class="mnb-desc">Explore upcoming futures options, advanced leverage mechanics, and every next-gen feature arriving on AvicnKnov.</div>
        </div>
      </div>

      <!-- TREASURE MAP SECTION -->
      <div class="more-section-title">What's Coming to AvicnKnov</div>
      <div class="more-section-sub">Scroll to explore the future — 15+ options arriving on the platform</div>

      <div class="treasure-track-section">
        <!-- SVG winding path drawn by JS -->
        <div class="treasure-svg-wrap" id="treasureSvgWrap"></div>
        <!-- Cards -->
        <div class="treasure-cards" id="treasureCards"></div>
      </div>

    </div>
  `;

  container.appendChild(root);

  /* ==========================
     BACKGROUND CANVAS
     ========================== */
  initMoreBg();

  /* ==========================
     RENDER TREASURE CARDS
     ========================== */
  const cardsWrap = document.getElementById('treasureCards');
  futureCards.forEach((card, idx) => {
    const row = document.createElement('div');
    row.className = 'tc-row' + (idx % 2 === 1 ? ' right' : '');

    row.innerHTML = `
      <div class="tc-card" onclick="moreTcCardClick(this)">
        <div class="tc-card-header">
          <div class="tc-icon">
            <div class="tc-icon-anim"></div>
            ${card.icon}
          </div>
          <div class="tc-card-meta">
            <div class="tc-badge">${card.badge}</div>
            <div class="tc-title">${card.title}</div>
          </div>
        </div>
        <div class="tc-body">${card.body}</div>
        <div class="tc-status ${card.status}">
          <span class="tc-status-dot"></span>
          ${card.statusLabel}
        </div>
        <div class="tc-detail-overlay">
          <div class="tc-detail-text">${card.detail}</div>
        </div>
      </div>
    `;
    cardsWrap.appendChild(row);
  });

  /* ==========================
     SCROLL REVEAL
     ========================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.tc-row').forEach(r => observer.observe(r));

  /* ==========================
     SVG TRACK PATH (treasure map)
     ========================== */
  function drawTreasurePath() {
    const svgWrap = document.getElementById('treasureSvgWrap');
    const cardsEl = document.getElementById('treasureCards');
    if (!svgWrap || !cardsEl) return;

    const h = cardsEl.offsetHeight + 80;
    svgWrap.style.height = h + 'px';

    const W = svgWrap.offsetWidth || 800;
    const H = h;

    const ns = 'http://www.w3.org/2000/svg';
    svgWrap.innerHTML = '';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');

    const rows = cardsEl.querySelectorAll('.tc-row');
    let points = [];
    rows.forEach((row, i) => {
      const rect = row.getBoundingClientRect();
      const wrapRect = svgWrap.getBoundingClientRect();
      const y = rect.top - wrapRect.top + rect.height / 2;
      const isRight = row.classList.contains('right');
      const x = isRight ? W * 0.72 : W * 0.28;
      points.push([x, y]);
    });

    if (points.length < 2) return;

    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur  = points[i];
      const midY = (prev[1] + cur[1]) / 2;
      d += ` C ${prev[0]} ${midY} ${cur[0]} ${midY} ${cur[0]} ${cur[1]}`;
    }

    // glow path
    const glow = document.createElementNS(ns, 'path');
    glow.setAttribute('d', d);
    glow.setAttribute('class', 'track-path-glow');
    svg.appendChild(glow);

    // main dashed path
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'track-path');
    svg.appendChild(path);

    // dots at each waypoint
    points.forEach(([x, y]) => {
      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', '4');
      dot.setAttribute('class', 'track-dot');
      svg.appendChild(dot);
    });

    // animate dashes
    const len = path.getTotalLength ? path.getTotalLength() : 2000;
    [path, glow].forEach(p => {
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = 'stroke-dashoffset 2s ease 0.3s';
      requestAnimationFrame(() => requestAnimationFrame(() => { p.style.strokeDashoffset = '0'; }));
    });

    svgWrap.appendChild(svg);
  }

  setTimeout(drawTreasurePath, 300);
  window.addEventListener('resize', drawTreasurePath);

  /* ==========================
     CARD CLICK (zoom + detail)
     ========================== */
  window.moreTcCardClick = function(card) {
    const isExp = card.classList.contains('tc-expanded');
    document.querySelectorAll('.tc-card.tc-expanded').forEach(c => c.classList.remove('tc-expanded'));
    if (!isExp) {
      card.classList.add('tc-expanded');
      setTimeout(drawTreasurePath, 350);
    }
  };

  /* ==========================
     NAV BUTTON CLICK
     ========================== */
  window.moreNavClick = function(href, btn) {
    btn.classList.add('mnb-clicked');
    btn.addEventListener('animationend', () => btn.classList.remove('mnb-clicked'), { once: true });
    setTimeout(() => { window.location.href = href; }, 360);
  };

  /* ==========================
     CANVAS BG — particle field
     ========================== */
  function initMoreBg() {
    const canvas = document.getElementById('moreBgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    let raf;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initParticles() {
      const count = Math.min(90, Math.floor(W * H / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random(),
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // subtle grain-like radial gradient
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
      grd.addColorStop(0, 'rgba(255,255,255,0.012)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.a += 0.004;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const alpha = 0.12 + 0.08 * Math.sin(p.a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      // connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      resize();
      initParticles();
      draw();
    });
  }

})();

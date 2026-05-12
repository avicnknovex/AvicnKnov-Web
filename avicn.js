(function(){
'use strict';

// ===== INJECT FONTS & STYLES =====
const styleEl = document.createElement('style');
styleEl.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

:root {
  --avq-bg: #08080a;
  --avq-surface: #0f0f12;
  --avq-surface2: #16161c;
  --avq-surface3: #1e1e26;
  --avq-border: #1e1e28;
  --avq-border2: #2a2a38;
  --avq-white: #ffffff;
  --avq-gray: #6b6b80;
  --avq-gray2: #3a3a4a;
  --avq-accent: #ffffff;
  --avq-green: #00e676;
  --avq-dim: rgba(255,255,255,0.06);
  --avq-road: #1a1a24;
}

#avicnQingRoot {
  background: var(--avq-bg);
  min-height: 100vh;
  color: var(--avq-white);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* GRAIN OVERLAY */
#avicnQingRoot::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

/* ZONE TABS */
.avq-zone-bar {
  position: sticky;
  top: 64px;
  z-index: 50;
  background: rgba(8,8,10,0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--avq-border2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  gap: 6px;
}

.avq-zone-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--avq-surface2);
  border: 1px solid var(--avq-border2);
  border-radius: 12px;
  padding: 4px;
}

.avq-zone-tab {
  padding: 9px 28px;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--avq-gray);
  cursor: pointer;
  transition: all 0.25s;
  border: none;
  background: none;
  letter-spacing: 0.5px;
  position: relative;
  white-space: nowrap;
}
.avq-zone-tab.active {
  background: var(--avq-white);
  color: #000;
  box-shadow: 0 2px 12px rgba(0,0,0,0.5);
}
.avq-zone-tab:hover:not(.active) {
  color: var(--avq-white);
  background: var(--avq-dim);
}

/* ZONE PANELS */
.avq-zone-panel {
  display: none;
  position: relative;
  z-index: 1;
}
.avq-zone-panel.active { display: block; }

/* ==================== WEB ZONE ==================== */
.avq-web-hero {
  padding: 80px 40px 40px;
  text-align: center;
  position: relative;
}
.avq-web-hero::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(255,255,255,0.035) 0%, transparent 70%);
  pointer-events: none;
}
.avq-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--avq-gray);
  margin-bottom: 24px;
  border: 1px solid var(--avq-border2);
  border-radius: 100px;
  padding: 7px 16px;
  background: var(--avq-surface2);
}
.avq-hero-eyebrow-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--avq-green);
  animation: avqPulse 2s infinite;
}
@keyframes avqPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

.avq-web-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px, 7vw, 96px);
  letter-spacing: 4px;
  line-height: 0.9;
  margin-bottom: 20px;
  color: var(--avq-white);
}
.avq-web-hero h1 span { color: var(--avq-gray); }

.avq-web-hero p {
  font-size: 15px;
  color: var(--avq-gray);
  max-width: 520px;
  margin: 0 auto 60px;
  line-height: 1.7;
}

/* MAP ROAD SYSTEM */
.avq-map-wrap {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px 120px;
}

.avq-road-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.avq-road-path {
  fill: none;
  stroke: var(--avq-road);
  stroke-width: 3;
  stroke-dasharray: 10 6;
  stroke-linecap: round;
}
.avq-road-path-glow {
  fill: none;
  stroke: rgba(255,255,255,0.06);
  stroke-width: 1;
  stroke-linecap: round;
}

.avq-road-node {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 72px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.avq-road-node.visible {
  opacity: 1;
  transform: translateY(0);
}
.avq-road-node:nth-child(even) {
  flex-direction: row-reverse;
}

.avq-node-pin {
  flex-shrink: 0;
  width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
}
.avq-pin-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--avq-surface2);
  border: 1px solid var(--avq-border2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s;
  flex-shrink: 0;
  box-shadow: 0 0 0 0 rgba(255,255,255,0);
}
.avq-road-node.visible .avq-pin-circle {
  box-shadow: 0 0 0 8px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.6);
}
.avq-pin-circle svg {
  width: 20px; height: 20px;
  stroke: var(--avq-white);
  stroke-width: 1.5;
  fill: none;
  flex-shrink: 0;
}
.avq-pin-number {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: var(--avq-white);
  color: #000;
  border-radius: 50%;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avq-node-card {
  flex: 1;
  background: var(--avq-surface);
  border: 1px solid var(--avq-border);
  border-radius: 16px;
  padding: 28px 32px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.avq-node-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.04) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.avq-node-card:hover {
  background: var(--avq-surface2);
  border-color: var(--avq-border2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}
.avq-node-card:hover::before { opacity: 1; }

.avq-node-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--avq-gray);
  margin-bottom: 10px;
}
.avq-node-tag-bar {
  width: 16px; height: 1px;
  background: var(--avq-gray2);
}

.avq-node-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 2px;
  color: var(--avq-white);
  margin-bottom: 10px;
  line-height: 1.1;
}
.avq-node-desc {
  font-size: 13px;
  color: var(--avq-gray);
  line-height: 1.75;
}
.avq-node-desc p {
  margin-bottom: 8px;
}
.avq-node-desc p:last-child { margin-bottom: 0; }

.avq-node-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--avq-border);
}
.avq-node-stat {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--avq-gray2);
  display: flex;
  align-items: center;
  gap: 5px;
}
.avq-node-stat svg {
  width: 11px; height: 11px;
  stroke: var(--avq-gray2);
  stroke-width: 2;
  fill: none;
  flex-shrink: 0;
}
.avq-future-badge {
  margin-left: auto;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--avq-border2);
  border-radius: 6px;
  padding: 4px 10px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--avq-gray);
}

/* ==================== EXCHANGE ZONE ==================== */
.avq-ex-hero {
  padding: 80px 40px 40px;
  text-align: center;
  position: relative;
}
.avq-ex-hero::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%);
  pointer-events: none;
}
.avq-ex-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(52px, 7vw, 96px);
  letter-spacing: 4px;
  line-height: 0.9;
  margin-bottom: 20px;
  color: var(--avq-white);
}
.avq-ex-hero h1 span { color: var(--avq-gray); }
.avq-ex-hero p {
  font-size: 15px;
  color: var(--avq-gray);
  max-width: 520px;
  margin: 0 auto 60px;
  line-height: 1.7;
}

/* EXCHANGE MAP */
.avq-ex-map-wrap {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px 120px;
}

.avq-ex-node {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.avq-ex-node.right-side {
  flex-direction: row-reverse;
  transform: translateX(30px);
}
.avq-ex-node.visible {
  opacity: 1;
  transform: translateX(0);
}

.avq-ex-pin {
  flex-shrink: 0;
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avq-ex-pin-circle {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: var(--avq-surface2);
  border: 1px solid var(--avq-border2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s;
  flex-shrink: 0;
}
.avq-ex-node.visible .avq-ex-pin-circle {
  box-shadow: 0 0 0 6px rgba(255,255,255,0.025), 0 4px 20px rgba(0,0,0,0.6);
}
.avq-ex-pin-circle svg {
  width: 20px; height: 20px;
  stroke: var(--avq-white);
  stroke-width: 1.5;
  fill: none;
}
.avq-ex-pin-num {
  margin-top: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  color: var(--avq-gray2);
  letter-spacing: 1px;
}

.avq-ex-card {
  flex: 1;
  background: var(--avq-surface);
  border: 1px solid var(--avq-border);
  border-radius: 16px;
  padding: 26px 30px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.avq-ex-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}
.avq-ex-card:hover {
  background: var(--avq-surface2);
  border-color: var(--avq-border2);
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(0,0,0,0.5);
}

.avq-ex-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--avq-gray2);
  margin-bottom: 8px;
}
.avq-ex-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 2px;
  color: var(--avq-white);
  margin-bottom: 10px;
}
.avq-ex-desc {
  font-size: 13px;
  color: var(--avq-gray);
  line-height: 1.75;
}
.avq-ex-desc p { margin-bottom: 8px; }
.avq-ex-desc p:last-child { margin-bottom: 0; }
.avq-ex-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--avq-border);
}
.avq-ex-badge {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 5px;
  border: 1px solid var(--avq-border2);
  color: var(--avq-gray2);
}
.avq-ex-badge.live {
  color: var(--avq-green);
  border-color: rgba(0,230,118,0.25);
  background: rgba(0,230,118,0.06);
}

/* CONNECTOR LINE */
.avq-connector {
  position: absolute;
  left: 92px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--avq-border2) 0px,
    var(--avq-border2) 6px,
    transparent 6px,
    transparent 14px
  );
  z-index: 1;
  pointer-events: none;
}
.avq-connector.right {
  left: auto;
  right: 92px;
}

/* SECTION DIVIDER */
.avq-section-div {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 32px;
  margin-bottom: 48px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.avq-section-div-line {
  flex: 1;
  height: 1px;
  background: var(--avq-border);
}
.avq-section-div-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--avq-gray2);
  white-space: nowrap;
}

/* SCROLL HINT */
.avq-scroll-hint {
  text-align: center;
  padding: 20px;
  color: var(--avq-gray2);
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.avq-scroll-arrow {
  display: inline-block;
  animation: avqBounce 1.4s infinite;
}
@keyframes avqBounce {
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(5px)}
}

/* RESPONSIVE */
@media(max-width:768px){
  .avq-road-node, .avq-ex-node { flex-direction: column !important; gap: 16px; }
  .avq-node-pin, .avq-ex-pin { flex-direction: row; width: 100%; }
  .avq-connector { display: none; }
  .avq-map-wrap, .avq-ex-map-wrap { padding: 0 16px 80px; }
  .avq-web-hero, .avq-ex-hero { padding: 60px 20px 30px; }
}
`;
document.head.appendChild(styleEl);

// ===== WEB ZONE DATA =====
const webZoneNodes = [
  {
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    tag: 'Future Vision',
    title: 'THE MASTER PLAN — WHERE WE ARE GOING',
    desc: [
      'AvicnKnov is not building a product. We are engineering a sovereign digital civilization — a self-sustaining ecosystem where every layer, from infrastructure to community, is owned, operated, and evolved entirely by us.',
      'We have mapped out a decades-long roadmap across seven core pillars. Every move is calculated. Every system is being built from the ground up. Nothing borrowed. Nothing compromised. The future we are architecting has never been attempted at this scale.',
      'What you see today is merely the foundation being poured. The structure rising above it will redefine what a digital platform can be — and we are just getting started.'
    ],
    stat: 'Phase 1 of 7 Active',
    badge: 'LONG-TERM VISION'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    tag: 'Community',
    title: 'THE AVICNKNOV NATION — COMMUNITY FIRST, FOREVER',
    desc: [
      'Our community is not a user base. It is a living, breathing civilization that we are committed to nurturing, protecting, and growing with absolute devotion. Every single member of the AvicnKnov community holds a place of honour in our architecture.',
      'We are actively building community infrastructure that will ensure every voice is heard, every contributor is recognized, and every loyal member receives unprecedented access to exclusive features, early releases, and direct communication channels with the core team.',
      'In the future, we will launch the AvicnKnov Nation Program — a structured community recognition system with tiers, privileges, and decision-making power. This is not a loyalty program. This is governance. Your participation shapes our direction.',
      'Crazy community events, exclusive digital experiences, global meetups across continents, ambassador programs in 50+ countries — the AvicnKnov Nation will be the most tightly-knit, powerful community in the digital world. We are not a platform with users. We are a nation with citizens.'
    ],
    stat: 'Community First Always',
    badge: 'FOUNDING PILLAR'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    tag: 'Platform Expansion',
    title: 'MULTI-PLATFORM DOMINATION — BUILT BY US, OWNED BY US',
    desc: [
      'AvicnKnov will not remain confined to a single interface. We are architecting a multi-platform empire — desktop, mobile, tablet, wearable, and beyond — each platform natively engineered from our own development stack.',
      'We will not rely on third-party app stores as our primary distribution. We are building AvicnKnov OS-level integrations, browser extensions, native desktop applications, and proprietary hardware interfaces that connect directly to our ecosystem.',
      'Every platform we launch will be an extension of the same core identity — seamlessly synced, independently powerful, and collectively invincible. Our own CDN, our own distribution network, our own update infrastructure. Pure AvicnKnov, zero external dependency.'
    ],
    stat: '12 Platforms Planned',
    badge: 'IN ENGINEERING'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    tag: 'Data & Privacy',
    title: 'SECURE ZONE ARCHITECTURE — YOUR DATA, FORTRESS-PROTECTED',
    desc: [
      'We are designing a revolutionary data protection system called the Secure Zone Architecture — a proprietary data isolation infrastructure where every single user receives an individually encrypted, geographically distributed data chamber.',
      'No user\'s data will ever share a physical boundary with another user\'s data. Each chamber is a hermetically sealed digital vault, accessible only through multi-layer biometric and cryptographic authentication. No data leakage. No cross-contamination. Ever.',
      'In the future, we will open-source the verification layer of this architecture — not to give it away, but to prove to the world that our security claims are mathematically verifiable. This is data privacy redefined at a civilizational level.',
      'Future phases include quantum-resistant encryption, self-destructing data protocols, and user-controlled data sovereignty where you decide what gets stored, for how long, and under what conditions. Your data dies when you say it dies.'
    ],
    stat: 'Zero Shared Infrastructure',
    badge: 'ENGINEERING PHASE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    tag: 'Ecosystem',
    title: 'THE AVICNKNOV UNIVERSE — GAMES, MEDIA & BEYOND',
    desc: [
      'The AvicnKnov ecosystem will expand into entertainment, gaming, original content creation, and digital media production — all built natively for and by our community. This is not a side project. This is a full entertainment vertical.',
      'We are developing AvicnKnov Games Studio, which will release exclusive community-owned gaming experiences where in-game assets have real ecosystem utility. Our proprietary game engine will be optimized for our platform infrastructure.',
      'AvicnKnov Originals will produce short films, documentary series, music productions, and digital art collections — all created in-house, showcasing the raw creative power of our community. Content that exists nowhere else, available only within the AvicnKnov universe.',
      'In the future, expect exclusive genre-breaking interactive experiences, community-voted storylines, collaborative music albums, and digital exhibitions that transform our platform from a service into a cultural institution.'
    ],
    stat: 'Studio In Development',
    badge: 'FUTURE LAUNCH'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    tag: 'Infrastructure',
    title: 'ZERO DEPENDENCY ARCHITECTURE — WE BUILD, WE OWN, WE CONTROL',
    desc: [
      'AvicnKnov is on a mission to achieve complete technological sovereignty. We are systematically replacing every third-party dependency in our stack with proprietary equivalents — our own databases, our own caching layers, our own CDN infrastructure, our own authentication systems.',
      'The final target is an AvicnKnov-exclusive technology stack where not a single critical system depends on external providers. This eliminates vulnerabilities, censorship risks, service disruptions, and pricing leverage that external vendors hold over dependent platforms.',
      'We call this Project Autonomy — an 8-year engineering roadmap to complete infrastructure independence. When complete, AvicnKnov will be one of fewer than 10 digital platforms in the world with genuine end-to-end technological sovereignty.'
    ],
    stat: 'Project Autonomy Active',
    badge: '8-YEAR MISSION'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    tag: 'Team Building',
    title: 'THE ELITE FORCE — BUILDING THE SHARPEST TEAM ON EARTH',
    desc: [
      'We are not hiring employees. We are recruiting civilization builders. The AvicnKnov team of the future will be a collection of the most passionate, most talented, most mission-aligned individuals from across the globe.',
      'We are building specialized rapid-response units — elite teams for help and support, product development, security operations, community management, and creative production — each functioning with military-grade efficiency and zero bureaucracy.',
      'The future team structure will include a 24/7 Rapid Response Support Unit capable of resolving any user issue within minutes, not hours. A Threat Intelligence Team that proactively hunts vulnerabilities before they become problems. And a Creative Strike Force that produces world-class content on demand.',
      'We will never outsource. We will never cut corners. Every team member will be deeply invested in the AvicnKnov mission, compensated at the highest levels, and empowered to make decisions that matter. The team we are building will be legendary.'
    ],
    stat: '24/7 Zero Downtime Support',
    badge: 'ACTIVE RECRUITMENT'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
    tag: 'Independence',
    title: 'NO COMPROMISE DOCTRINE — WE COMPETE ONLY WITH OURSELVES',
    desc: [
      'AvicnKnov does not benchmark against other platforms. We do not react to competitor moves. We do not adjust our roadmap based on what others are building. Our only competition is the previous version of ourselves.',
      'This is not arrogance. This is strategic clarity. When you compete with others, you inherit their limitations. When you compete only with yourself, you are limited only by your own imagination — and ours is boundless.',
      'We will never partner with a platform that compromises our values. We will never integrate a service that weakens our independence. Every collaboration we pursue must strengthen our ecosystem, not create dependency on external systems.',
      'The No Compromise Doctrine extends to our community, our data, our design, our technology, and our culture. In every domain, we hold ourselves to a standard that the rest of the industry has not yet imagined. And we will keep raising that standard, forever.'
    ],
    stat: 'Self-Competition Only',
    badge: 'CORE DOCTRINE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.61-.61a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.27 16z"/></svg>`,
    tag: 'Global Access',
    title: 'BORDERLESS DIGITAL PRESENCE — EVERY COUNTRY, EVERY CULTURE',
    desc: [
      'AvicnKnov is architecting a genuinely borderless digital presence. Not just multi-language support, but culturally adapted experiences, locally resonant design systems, and regionally optimized infrastructure in every market we serve.',
      'We will establish local data zones across 30+ countries, eliminating cross-border data latency and ensuring compliance with regional data sovereignty laws without compromising the unified AvicnKnov experience.',
      'Future expansion includes indigenous language support for underserved communities, culturally specific community spaces within the AvicnKnov Nation, and regional ambassador programs that organically grow our presence from the ground up in every corner of the world.'
    ],
    stat: '30+ Countries Planned',
    badge: 'GLOBAL EXPANSION'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
    tag: 'Identity',
    title: 'AVICNKNOV IDENTITY SYSTEM — THE BRAND THAT LIVES FOREVER',
    desc: [
      'We are building an identity system that transcends conventional branding. The AvicnKnov visual language, sonic identity, motion design grammar, and typographic system will form one of the most distinctive and memorable brand architectures in the digital world.',
      'Every touchpoint — from a loading animation to a notification sound — will be unmistakably AvicnKnov. This level of identity coherence is reserved for the most iconic brands in history, and we are engineering it from the ground up.',
      'In the future, AvicnKnov will release an open community design kit allowing members to create AvicnKnov-branded content within our guidelines — expanding our visual presence organically through the creativity of our Nation.'
    ],
    stat: 'Identity System Building',
    badge: 'BRAND ARCHITECTURE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
    tag: 'Future Events',
    title: 'AVICNKNOV LIVE — GLOBAL EVENTS & DIGITAL SUMMITS',
    desc: [
      'AvicnKnov Live is our forthcoming global events vertical — a series of physical and digital summits, workshops, hackathons, and community gatherings that bring the AvicnKnov Nation together across time zones and continents.',
      'We are planning the first AvicnKnov World Summit — a massive multi-day event where thousands of community members, builders, and visionaries converge to shape the future of the ecosystem together. This will not be a conference. This will be a movement.',
      'Monthly digital events, quarterly community challenges, annual world-class gatherings — the AvicnKnov events calendar will be one of the most exciting in the digital world. You will not want to miss a single one.'
    ],
    stat: 'First Summit In Planning',
    badge: 'COMING SOON'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>`,
    tag: 'Integration',
    title: 'AVICNKNOV CONNECT — NATIVE API ECOSYSTEM FOR DEVELOPERS',
    desc: [
      'We are building the AvicnKnov Connect API — a comprehensive, developer-first integration layer that allows builders to create applications, tools, and experiences that plug natively into the AvicnKnov ecosystem.',
      'Unlike generic APIs, AvicnKnov Connect will offer deep data access, real-time event streaming, community integration hooks, and identity federation — enabling developers to build products that feel like natural extensions of the platform.',
      'The future AvicnKnov Developer Nation will be a dedicated community within our ecosystem for builders, with its own resources, rewards, and recognition programs. We will fund the most innovative projects through the AvicnKnov Builder Grant — real capital for real builders.'
    ],
    stat: 'API In Architecture',
    badge: 'DEVELOPER FUTURE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M7 13.5c0 2.485 2.239 4.5 5 4.5s5-2.015 5-4.5"/><path d="M9 9.5h.01M15 9.5h.01"/></svg>`,
    tag: 'Wellness',
    title: 'AVICNKNOV WELFARE — EVERY MEMBER MATTERS, ALWAYS',
    desc: [
      'Beyond features and technology, AvicnKnov is committed to the genuine wellbeing of every member of our community. We are building welfare programs, mental health resources, financial literacy content, and support systems specifically designed for our Nation.',
      'In the future, we will launch the AvicnKnov Scholarship Program, supporting young builders and creators from underserved communities with education funding, mentorship access, and direct pathways into our ecosystem.',
      'We measure our success not only in metrics and revenue but in the quality of life we bring to the people who trust us with their time and attention. That is a responsibility we take with total seriousness.'
    ],
    stat: 'Welfare Programs Planned',
    badge: 'COMMUNITY WELFARE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>`,
    tag: 'Transparency',
    title: 'RADICAL TRANSPARENCY — OPEN ABOUT EVERYTHING, ALWAYS',
    desc: [
      'AvicnKnov operates under a Radical Transparency doctrine. We will publish detailed quarterly ecosystem reports, live development dashboards showing real-time progress on all major initiatives, and unfiltered community update calls where the core team addresses every question.',
      'We will never hide behind corporate language or deflect with PR-polished non-answers. When we make a mistake, we will say so — publicly, immediately, and with a concrete plan to fix it. Our community deserves truth, always.',
      'Future transparency initiatives include a live engineering changelog accessible to all community members, public security audit results, and a Community Oversight Board with real power to hold us accountable.'
    ],
    stat: 'Full Transparency Policy',
    badge: 'CORE VALUE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    tag: 'Architecture',
    title: 'LAYERED REALITY SYSTEM — BUILDING ABOVE EXISTING PARADIGMS',
    desc: [
      'AvicnKnov is developing what we call the Layered Reality System — a framework for creating digital experiences that exist across multiple layers simultaneously: information, interaction, community, and identity all operating in unified harmony.',
      'This architecture allows a single AvicnKnov interaction to carry meaning across all layers — a trade on the exchange ripples into community status, AI personalization, ecosystem rewards, and identity expression simultaneously.',
      'The Layered Reality System represents a fundamental shift from platform-as-service to platform-as-environment. We are not building a place you visit. We are building a world you inhabit. The implications for what is possible within our ecosystem are limitless.'
    ],
    stat: 'System In Design Phase',
    badge: 'PARADIGM SHIFT'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    tag: 'Education',
    title: 'AVICNKNOV ACADEMY — KNOWLEDGE IS THE ULTIMATE ASSET',
    desc: [
      'We are building the AvicnKnov Academy — a comprehensive, permanently free educational platform covering digital finance, technology, trading, security, and personal development — all curated specifically for our community.',
      'The Academy will feature structured learning paths from absolute beginner to institutional-level expertise, with live masterclasses from industry leaders, community-led study groups, and certification programs recognized within our ecosystem.',
      'Future Academy expansions include AvicnKnov-produced research papers, an open library of proprietary educational content, and direct mentorship programs connecting experienced community members with those just beginning their journey.'
    ],
    stat: 'Academy In Production',
    badge: 'FREE FOREVER'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    tag: 'Values',
    title: 'THE AVICNKNOV COVENANT — OUR UNBREAKABLE PROMISE TO YOU',
    desc: [
      'Everything we build, every decision we make, every line of code we write is guided by one absolute commitment: to make the lives of our community members genuinely better, more secure, more connected, and more empowered.',
      'We promise to never sell your data. We promise to never prioritize revenue over safety. We promise to never compromise our community\'s trust for any partnership, any investor pressure, or any external incentive.',
      'The AvicnKnov Covenant will be legally encoded into our organizational structure — not as a marketing claim, but as a binding constitutional commitment. This is our North Star. This is why we exist. And we will die before we betray it.',
      'You chose to trust AvicnKnov. We will spend every day proving that choice was the best decision you ever made.'
    ],
    stat: 'Legally Binding Future',
    badge: 'FOUNDING COVENANT'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    tag: 'Velocity',
    title: 'PERPETUAL MOMENTUM — WE NEVER STOP, WE NEVER SLOW DOWN',
    desc: [
      'AvicnKnov operates at a pace that most platforms cannot comprehend. We ship fast, learn faster, and iterate with a ferocity that turns months of traditional development into weeks, and weeks into days.',
      'Our engineering culture is built around the principle of Perpetual Momentum — the belief that the worst thing we can do is stand still while the world evolves around us. We embrace change not as a challenge but as our natural operating environment.',
      'Future velocity initiatives include our proprietary rapid-deployment infrastructure that allows zero-downtime updates at any scale, a community beta program where eager members receive experimental features before anyone else, and a live development stream where our community watches us build in real time.'
    ],
    stat: 'Always Shipping',
    badge: 'CORE CULTURE'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    tag: 'Foundation',
    title: 'THE AVICNKNOV FOUNDATION — GIVING BACK AT CIVILIZATIONAL SCALE',
    desc: [
      'A percentage of everything AvicnKnov generates will flow into the AvicnKnov Foundation — a non-profit arm dedicated to digital literacy, technology access, community empowerment, and environmental sustainability.',
      'The Foundation will fund internet access programs for underserved communities, technology education initiatives, open-source security projects, and carbon-neutral computing research. We will give back in proportion to what we build.',
      'This is not a CSR checkbox. This is a structural commitment woven into the DNA of our organization from day one. We are not just building a platform. We are funding a better world.'
    ],
    stat: 'Foundation Launching',
    badge: 'CIVILIZATIONAL IMPACT'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    tag: 'Legacy',
    title: 'THE CENTURY VISION — BUILT TO LAST A HUNDRED YEARS',
    desc: [
      'Most digital platforms think in quarters. Some think in years. AvicnKnov thinks in centuries. We are building institutional-grade systems, cultural infrastructure, and organizational frameworks designed to outlast every current paradigm in the digital world.',
      'The Century Vision is our commitment that AvicnKnov will be here not just in 10 years or 20 years, but in 100 years — serving a global civilization that we cannot yet fully imagine, with values and standards that remain as relevant then as they are today.',
      'We are not building for an exit. We are not building for an acquisition. We are building a permanent fixture of the digital world — as enduring as the greatest institutions humanity has ever created. The AvicnKnov story is just beginning, and it will never end.'
    ],
    stat: '100 Year Horizon',
    badge: 'THE FOREVER MISSION'
  }
];

// ===== EXCHANGE ZONE DATA =====
const exchangeNodes = [
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="19" cy="5" r="3"/></svg>`,
    tag: 'Core AI',
    title: 'AVICNKNOV NEURAL ENGINE — OUR PROPRIETARY AI BRAIN',
    desc: [
      'The AvicnKnov Neural Engine is not a third-party AI integration. It is a proprietary machine learning system we are engineering from scratch — trained exclusively on our platform\'s market data, user behavior patterns, and ecosystem signals.',
      'Current capabilities include real-time sentiment analysis across 240+ market indicators, whale movement detection with sub-second alert latency, and predictive pattern recognition that surfaces high-probability trade setups before they become obvious to the market.',
      'The Neural Engine continuously retrains itself on live data, meaning it gets smarter every single second the exchange operates. No static model. No stale predictions. Pure living intelligence that evolves faster than any human analyst team ever could.',
      'We are building this AI to understand markets the way the best traders do — not through rules, but through intuition developed from billions of data points. The result will be the most accurate, most adaptive, and most dangerous AI trading assistant ever deployed.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    tag: 'AI Evolution',
    title: 'NEURAL ENGINE 2.0 MAX — THE NEXT GENERATION AI UPGRADE',
    desc: [
      'We are engineering the Neural Engine 2.0 Max — a complete architectural overhaul of our AI system, moving from our current transformer-based models to a hybrid architecture combining reinforcement learning, graph neural networks, and custom attention mechanisms.',
      'The 2.0 Max model will have 10x the context window of the current system, allowing it to analyze month-long market microstructure in a single inference pass. It will understand cross-asset correlations that no current AI model can detect.',
      'New capabilities in 2.0 Max include natural language market commentary generated in real time, voice-activated trading assistant integration, and personalized AI that learns each user\'s trading style and adapts its recommendations accordingly.',
      'The 2.0 Max will also introduce explainable AI outputs — every recommendation will be accompanied by a transparent reasoning chain, showing exactly which data points and patterns drove the prediction. No black boxes. Full transparency into the machine mind.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    tag: 'Matching Engine',
    title: 'SUB-0.1MS MATCHING ENGINE — REDEFINING EXECUTION SPEED',
    desc: [
      'Our current matching engine processes 1.4 million orders per second at sub-0.3ms latency. We are not satisfied. The next generation matching engine is being engineered to break the 0.1ms barrier — a threshold that will place AvicnKnov in a class of fewer than five exchanges globally.',
      'The new engine uses a custom lock-free order book implementation written in bare-metal C++ with FPGA acceleration for the most latency-critical operations. We are eliminating every nanosecond of unnecessary processing with surgical precision.',
      'When the next-gen engine launches, institutional traders will experience execution quality previously only available at the most exclusive prime brokerage desks in the world — now accessible to every AvicnKnov user, regardless of account size.',
      'We are also building adaptive latency prioritization — a system that intelligently routes order flow to minimize slippage during periods of extreme market volatility, protecting retail users from the millisecond-level predatory strategies that plague other platforms.'
    ],
    badge: 'ENGINEERING',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    tag: 'Analytics',
    title: 'INSTITUTIONAL ANALYTICS TERMINAL — EVERY SIGNAL, ONE SCREEN',
    desc: [
      'The AvicnKnov Analytics Terminal is a professional-grade market intelligence platform built into the exchange — not bolted on as an afterthought. Every data point, every visualization, every tool has been designed specifically for our market structure.',
      'Current features include multi-timeframe order book depth visualization, real-time large-order detection with directional bias analysis, on-chain flow correlation overlays, and funding rate cross-exchange comparison — all updating at sub-second speed.',
      'Future terminal upgrades include cross-asset macro correlation mapping, options flow integration, custom scripted signal alerts using our proprietary query language, and AI-generated market narratives that explain what is happening in the order book in plain language.',
      'We are building the terminal that professional trading desks currently pay hundreds of thousands annually for equivalent tools — and making it freely available to every AvicnKnov user. Institutional power, democratized without compromise.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    tag: 'Security',
    title: 'MILITARY VAULT ARCHITECTURE — IMPENETRABLE BY DESIGN',
    desc: [
      'AvicnKnov\'s security architecture is built on the assumption that every known attack vector will eventually be attempted against us. Our defenses are not reactive — they are built ahead of the threat landscape by a dedicated security engineering team.',
      '98% of all assets are held in geographically distributed cold storage vaults with multi-signature authorization, time-locked release protocols, and physical security measures equivalent to state-level intelligence facilities.',
      'Our real-time threat detection system monitors 10,000+ behavioral signals simultaneously, flagging and isolating suspicious activity within milliseconds — before it can impact any user funds or system integrity.',
      'Future security developments include homomorphic encryption for transaction processing that allows verification without data exposure, quantum-resistant cryptographic key infrastructure, and a bug bounty program with industry-leading rewards that will attract the world\'s best security researchers to actively harden our platform.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    tag: 'Token Launches',
    title: 'AQUARIUS LAUNCHPAD — WHERE THE FUTURE GETS DISCOVERED',
    desc: [
      'The Aquarius Token Launchpad is AvicnKnov\'s revolutionary token discovery and launch platform — a curated ecosystem where only the highest-quality projects earn the right to launch in front of our community.',
      'Our AI-powered smart contract vetting system analyzes every project\'s code for vulnerabilities, economic design flaws, and malicious patterns before a single token sale begins. No rug pulls. No honeypots. No compromises on our community\'s safety.',
      'Aquarius features real-time liquidity bootstrapping mechanics, price discovery algorithms designed to prevent manipulative launch dynamics, and post-launch monitoring that flags anomalous trading patterns within seconds of detection.',
      'Future Aquarius capabilities include community governance over which projects qualify for launch, DAO-structured project incubation where our Nation actively mentors projects before launch, and Aquarius Futures — a forward market for pre-launch price discovery that creates an entirely new asset class exclusive to AvicnKnov.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    tag: 'Trading Products',
    title: 'LIVE HELP VOLUME DETECTION — TRADE WITH ZERO BLIND SPOTS',
    desc: [
      'We are building the Live Help Volume Detection system — an AI-powered real-time analysis layer that monitors order flow, identifies unusual volume concentrations, and surfaces actionable intelligence to traders before the market consensus recognizes the signal.',
      'The system detects block trade patterns, iceberg order strategies, and algorithmic accumulation signatures that are invisible to conventional charting tools. When our system sees unusual activity, you see it immediately — with context, magnitude, and directional probability.',
      'Future enhancements include cross-exchange volume arbitrage detection, dark pool flow estimation, options market maker hedging signal extraction, and a customizable alert system that notifies you the moment a volume signature matching your predefined criteria appears anywhere on the exchange.',
      'This is the kind of intelligence that institutional desks spend millions building in-house. We are putting it directly into the hands of every AvicnKnov trader, for free, forever.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M15 9H9l1.5 1.5M9 15h6l-1.5-1.5"/></svg>`,
    tag: 'Token Innovation',
    title: 'NEXT-GENERATION TOKEN ARCHITECTURE — ASSETS NEVER SEEN BEFORE',
    desc: [
      'AvicnKnov is developing entirely new token primitive types that do not exist on any current exchange — hybrid instruments that combine characteristics of equities, derivatives, and community governance tokens into single composable assets.',
      'We call these Composite Sovereignty Tokens — digital assets that carry embedded yield mechanics, built-in governance rights, automatic rebalancing against basket indices, and community utility functions all within a single token contract.',
      'Our token standards team is working with multiple blockchain protocols to define new EIP-level standards that will allow these novel instruments to be interoperable across the entire DeFi ecosystem — while being exclusively discoverable through AvicnKnov.',
      'Future token types include Memory Tokens that carry provable historical performance data on-chain, Community Bond Tokens issued by AvicnKnov Nation sub-communities, and Prediction Market Tokens that automatically settle against our AI\'s verified market forecasts.'
    ],
    badge: 'FUTURE LAUNCH',
    status: 'future'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    tag: 'Infrastructure',
    title: 'GLOBAL SERVER MESH — DATA CENTERS ON EVERY CONTINENT',
    desc: [
      'AvicnKnov is constructing a proprietary global server mesh — a network of edge compute nodes, matching engine replicas, and data processing clusters strategically positioned across six continents to guarantee sub-5ms round-trip latency for 95% of the world\'s population.',
      'Current infrastructure spans 9 primary data centers with full redundancy. Our expansion roadmap targets 47 edge nodes across 31 countries by end of the next three-year development cycle.',
      'Each node in the mesh operates independently with full matching engine capability, allowing automatic failover at the geographic level — if any node experiences issues, traffic is rerouted globally within milliseconds, with zero user-facing disruption.',
      'Future infrastructure ambitions include establishing proprietary data center facilities in strategic jurisdictions with ultra-low regulatory overhead, subsea cable partnerships for direct inter-datacenter fiber capacity, and quantum communication pilot infrastructure for the most latency-sensitive operations.'
    ],
    badge: 'EXPANDING',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    tag: 'Secure Data Rooms',
    title: 'EXCHANGE DATA FORTRESS — USER DATA NEVER LEAVES YOUR VAULT',
    desc: [
      'Every AvicnKnov exchange user is assigned a cryptographically isolated Data Fortress — a personal secure environment where all trading history, personal information, API keys, and behavioral data is stored in an individually encrypted partition.',
      'No user\'s exchange data is co-located with any other user\'s data at the physical storage layer. Each Data Fortress is independently encrypted with a key that requires multi-party authorization to access — including your own biometric signature.',
      'Our exchange\'s data architecture makes bulk user data breaches mathematically impossible — even if an attacker gained physical access to our infrastructure, they would face 2+ million individually encrypted data fortresses, each requiring independent cryptographic compromise.',
      'Future Data Fortress capabilities include user-controlled data export in standardized formats, automated data deletion scheduling, inheritance protocols for digital assets and trading history, and audit logs that prove to you exactly who accessed your data and when.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.61-.61a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.27 16z"/></svg>`,
    tag: 'Support System',
    title: 'EXCHANGE CONCIERGE — INSTITUTIONAL-GRADE USER SUPPORT',
    desc: [
      'The AvicnKnov Exchange Concierge is a dedicated support infrastructure designed around the reality that trading issues are time-critical. Every support interaction is triaged by AI within 3 seconds and routed to the optimal specialist within 60 seconds.',
      'For high-volume traders and institutional accounts, we offer dedicated account managers with direct communication channels — no ticket queues, no automated responses, no waiting. Your account manager knows your trading profile and can act immediately.',
      'Our support team receives real-time market context alongside every user query, allowing them to understand exactly what was happening in the market at the moment of any reported issue. This eliminates the back-and-forth that makes other platforms\' support so frustratingly slow.',
      'Future concierge capabilities include proactive outreach when our systems detect unusual activity on your account, personalized risk management check-ins for high-leverage positions, and a dedicated hotline for critical trading emergencies available 24 hours a day, 365 days a year.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    tag: 'Derivatives',
    title: 'PERPETUALS & OPTIONS SUITE — EVERY INSTRUMENT, ONE PLATFORM',
    desc: [
      'AvicnKnov\'s derivatives suite is being engineered to offer the deepest, most liquid, and most fairly priced options and perpetual futures market in the industry — with a pricing model that systematically eliminates the funding rate manipulation that plagues competitor platforms.',
      'Our perpetual futures use a proprietary funding rate algorithm that accounts for cross-exchange open interest imbalances, reducing funding costs for traders by an estimated 30-40% compared to traditional mark-price methodologies.',
      'The options suite is being built with a native volatility surface calculator, smart strike selection tools powered by our Neural Engine, and portfolio margin calculations that account for gamma and vega exposure across complex multi-leg positions.',
      'Future derivatives products include structured products with pre-defined risk parameters for conservative traders, variance swaps for pure volatility exposure, and exotic options types including barrier options and asian-average contracts — all natively supported on our exchange infrastructure.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>`,
    tag: 'API Trading',
    title: 'ULTRA-LOW LATENCY API — BUILT FOR ALGORITHMIC WARRIORS',
    desc: [
      'The AvicnKnov API infrastructure is engineered specifically for algorithmic and high-frequency trading operations — with co-location services, FIX protocol support, WebSocket streams with sub-millisecond event delivery, and REST endpoints optimized for minimum round-trip overhead.',
      'Our API handles 500,000+ requests per second per endpoint with guaranteed 99.99% uptime SLA for institutional API users. Rate limits are designed intelligently — scaled to account size, trading volume, and account tenure rather than applied as blunt restrictions.',
      'Developer tooling includes comprehensive SDKs in 8 programming languages, real-time API performance dashboards, sandbox environments with full exchange simulation, and a dedicated API support team available around the clock.',
      'Future API capabilities include streaming order book snapshots at microsecond granularity, proprietary data signals from our Neural Engine available via API subscription, and co-location rack space in our primary data centers for the most latency-sensitive algorithmic operations.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>`,
    tag: 'Liquidity',
    title: 'DEEP LIQUIDITY ARCHITECTURE — ZERO SLIPPAGE AT SCALE',
    desc: [
      'AvicnKnov has engineered a proprietary liquidity provision framework that incentivizes professional market makers through a combination of rebate structures, co-location privileges, and API priority that creates the deepest order books in our traded pairs.',
      'Our smart order routing layer automatically splits large orders across multiple internal liquidity pools to minimize market impact — protecting institutional traders from the slippage that makes large-scale execution prohibitively expensive on conventional venues.',
      'The Virtual Liquidity Reserve system supplements organic market maker activity during periods of extreme volatility, ensuring that even during black swan events, our users can execute orders without catastrophic spread widening.',
      'Future liquidity innovations include cross-chain atomic liquidity aggregation, integration with layer-2 liquidity protocols for gas-free deep liquidity access, and the AvicnKnov Liquidity Mining Protocol — a structured program that allows any user to contribute liquidity and earn real, transparent yield.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    tag: 'Cross-Chain',
    title: 'OMNICHAIN BRIDGE — TRADE EVERYTHING FROM ONE ACCOUNT',
    desc: [
      'The AvicnKnov OmniChain Bridge is our proprietary cross-chain settlement infrastructure — allowing traders to hold assets on any supported blockchain and trade them natively on our exchange without wrapping, without external bridges, and without multi-step conversion processes.',
      'Current cross-chain support includes Ethereum, Solana, BNB Chain, Avalanche, Cosmos, Arbitrum, and Optimism — with direct settlement finality in under 12 seconds across all supported chains through our proprietary relay network.',
      'Our bridge architecture has been audited by five independent security firms and uses a hybrid zero-knowledge proof and multi-party computation approach that eliminates the honeypot attack vectors that have resulted in billions in losses on other bridge protocols.',
      'Future OmniChain expansion targets 25 additional blockchain networks, a native stablecoin routing layer that eliminates intermediary conversion steps, and quantum-resistant cross-chain cryptography that future-proofs our bridge against emerging computational threats.'
    ],
    badge: 'EXPANDING',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    tag: 'Institutional',
    title: 'AVICNKNOV PRIME — INSTITUTIONAL SERVICES REDEFINED',
    desc: [
      'AvicnKnov Prime is our institutional services division — a white-glove trading infrastructure offering tailored for hedge funds, proprietary trading firms, family offices, and high-net-worth individual traders who require capabilities beyond what standard retail platforms can provide.',
      'Prime services include dedicated matching engine priority lanes, custom risk management frameworks, OTC desk access for block trades that require privacy, portfolio margin across the full derivatives suite, and bespoke reporting infrastructure for regulatory compliance in any jurisdiction.',
      'Our Prime relationship team maintains active communication with institutional accounts, providing real-time market intelligence, early access to platform developments, and direct input into our product roadmap for features that matter to serious market participants.',
      'Future Prime expansions include a proprietary dark pool for institutional block trading with guaranteed price improvement, custodial prime brokerage services with full asset segregation, and regulated lending programs that allow institutions to leverage their AvicnKnov holdings for external trading capital.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    tag: 'Speed Tech',
    title: 'PREDICTIVE ORDER ROUTING — YOUR ORDER WINS BEFORE IT IS SENT',
    desc: [
      'AvicnKnov is building Predictive Order Routing — an AI system that anticipates the optimal execution pathway for your order before you submit it, pre-positioning internal liquidity buffers to guarantee you receive the best possible fill price at the moment of execution.',
      'The system uses short-horizon price prediction models with 50-100ms lookahead to detect microstructure patterns that indicate imminent adverse price moves — and automatically adjusts your order parameters in real time to protect you from them.',
      'Predictive routing will reduce average effective spread by an estimated 15-20% for market orders above $50,000 — a saving that compounds into significant performance improvement for active traders over time.',
      'Future predictive capabilities include cross-asset correlation-based routing that considers your other open positions when optimizing new order execution, portfolio-aware slippage minimization for complex multi-leg strategy entry, and machine-learning trade scheduling for large orders that need to be worked throughout the session.'
    ],
    badge: 'IN ENGINEERING',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    tag: 'Compliance',
    title: 'REGULATORY EXCELLENCE — COMPLIANCE AS COMPETITIVE ADVANTAGE',
    desc: [
      'AvicnKnov is building a regulatory infrastructure designed not to meet the minimum legal requirements but to exceed them by such a significant margin that we become the benchmark against which other exchanges are measured by regulators globally.',
      'Our compliance technology stack includes real-time transaction monitoring, automated SAR filing infrastructure, KYC/AML systems that process verification in under 90 seconds while maintaining the highest accuracy standards in the industry, and a legal team with jurisdiction expertise across 40+ countries.',
      'We believe that regulatory excellence is not a constraint on our business — it is a competitive moat. The exchanges that will still be operating in 20 years are the ones that treated compliance as a core competency, not a checkbox. We are building for that future.',
      'Future regulatory initiatives include proactive engagement with emerging regulatory frameworks across Asia, Europe, and the Americas, self-regulatory organization membership to influence industry standards from the inside, and public advocacy for regulations that protect users without stifling innovation.'
    ],
    badge: 'ONGOING',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
    tag: 'Copy Trading',
    title: 'SIGNAL REPLICATION NETWORK — FOLLOW THE SHARPEST MINDS',
    desc: [
      'AvicnKnov is building the Signal Replication Network — the most transparent, most auditable, and most fair copy trading system ever created. Every signal provider\'s performance is verified on-chain, with immutable historical records that cannot be gamed or manipulated.',
      'Unlike traditional copy trading platforms, our system provides followers with complete statistical analysis of each signal provider: maximum drawdown, Sharpe ratio, win rate by market regime, correlation with overall market performance, and behavior during stress events.',
      'Our AI autonomously monitors signal providers for statistical gaming — detecting and flagging accounts that cherry-pick their visible trade history or use position sizing tricks to artificially inflate performance metrics. If you see a track record on AvicnKnov, it is real.',
      'Future network expansions include automated portfolio allocation across multiple signal providers with correlation-aware weighting, social trading community features where followers can communicate and collaborate, and a Signal Provider Certification Program with rigorous performance standards that creates a trusted tier of the most accomplished traders on our platform.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
    tag: 'Insurance',
    title: 'HALF BILLION SHIELD — THE INSURANCE FUND THAT MEANS SOMETHING',
    desc: [
      'The AvicnKnov $500M Insurance Fund is not a marketing figure. It is a real, independently audited reserve maintained in segregated cold storage, with monthly proof-of-reserve publications verified by a Big Four accounting firm.',
      'The fund covers platform-side losses from exchange failures, smart contract exploits, and infrastructure attacks — not individual trading losses from market moves. This distinction matters, and we communicate it with clarity that most platforms deliberately obscure.',
      'Claims processing will be handled by an independent Insurance Council with community representation — eliminating the conflict of interest that exists when an exchange\'s leadership team decides whether to compensate users for platform-side failures.',
      'Our fund growth strategy targets $2B by Year 5 and $10B by Year 10 — scaling proportionally with platform assets under custody. We will publish our fund growth trajectory publicly every quarter, along with detailed disclosures of the fund\'s composition and protection coverage.'
    ],
    badge: 'LIVE',
    status: 'live'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    tag: 'UX Innovation',
    title: 'ADAPTIVE INTERFACE ENGINE — THE EXCHANGE THAT KNOWS YOU',
    desc: [
      'AvicnKnov is building an Adaptive Interface Engine — an AI-powered UI system that learns your trading patterns, workflow preferences, and behavioral tendencies, and progressively transforms the exchange interface into the optimal environment for your personal trading style.',
      'A beginner\'s AvicnKnov looks different from an expert\'s AvicnKnov. Not because they chose a theme — but because the platform intelligently surfaced the tools they needed and gracefully stepped back the complexity they did not yet require.',
      'The system tracks which features you use, how long you spend on each tool, where your attention goes on the screen, and what actions precede your best and worst trading decisions — using this data to personalize your experience with precision that no amount of manual customization could match.',
      'Future interface innovations include gesture-based trading controls for touch devices, voice command integration for hands-free order management, and an AR trading overlay layer that surfaces market data in augmented reality for an entirely new mode of market visualization.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    tag: 'Governance',
    title: 'EXCHANGE GOVERNANCE DAO — YOUR VOICE SHAPES OUR MARKETS',
    desc: [
      'AvicnKnov Exchange Governance DAO is our framework for giving the most engaged community members real, binding influence over exchange parameters — listing decisions, fee structures, market-making incentive programs, and product prioritization.',
      'Governance rights are earned through a combination of trading volume, tenure, community contribution, and ecosystem participation — ensuring that voting power is concentrated in the hands of genuine long-term ecosystem participants, not speculative token holders.',
      'DAO proposals go through a structured deliberation process with mandatory discussion periods, economic impact modeling published before votes, and implementation timelines that the core team is contractually bound to honor.',
      'Future governance expansions include Sub-DAO structures for specific market categories, delegated voting for users who want to participate without active management, and a Governance Intelligence Layer that uses AI to model the second and third-order consequences of proposed parameter changes before they go to a vote.'
    ],
    badge: 'FUTURE LAUNCH',
    status: 'future'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    tag: 'Speed Future',
    title: 'QUANTUM-READY INFRASTRUCTURE — PREPARING FOR THE NEXT ERA',
    desc: [
      'The advent of quantum computing will fundamentally break most current cryptographic security systems within the next decade. AvicnKnov is not waiting for that event to begin preparing. We are already implementing quantum-resistant cryptographic standards across our entire infrastructure stack.',
      'Our quantum readiness roadmap includes migration to post-quantum key encapsulation mechanisms for all user authentication, lattice-based signature schemes for transaction signing, and hash-based digital signatures for our cold storage vault authorization systems.',
      'We have established a Quantum Security Research division tasked exclusively with monitoring developments in quantum computing and translating that intelligence into infrastructure updates ahead of any meaningful threat threshold.',
      'The exchanges that will survive the quantum transition are those that began preparing before the threat materialized. AvicnKnov will be one of the first global trading platforms to achieve full post-quantum cryptographic compliance — protecting our users\' assets and data against threats that have not yet been built.'
    ],
    badge: 'LONG-TERM MISSION',
    status: 'future'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    tag: 'Terminal',
    title: 'AVICNKNOV TERMINAL — PROFESSIONAL DESKTOP TRADING COMMAND CENTER',
    desc: [
      'The AvicnKnov Terminal is a native desktop application being built for Windows, macOS, and Linux — a standalone professional trading environment that runs locally with a dedicated connection to our exchange infrastructure, bypassing browser overhead for maximum performance.',
      'The Terminal will offer capabilities impossible in a browser environment: sub-millisecond local order entry from keyboard shortcuts, multi-monitor layouts with independent workspace management, and direct FIX protocol connectivity for algorithmically driven trading workflows.',
      'Built-in charting engine with unlimited indicators, custom scripting environment for signal development, backtesting framework integrated directly against our historical tick data, and a strategy marketplace where community-developed tools can be shared and monetized.',
      'Future Terminal versions will include built-in portfolio risk management dashboards, real-time P&L attribution by strategy and time period, and a collaborative trading mode where small teams can share screens, annotations, and trade ideas within the same Terminal session in real time.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    tag: 'Data Science',
    title: 'HISTORICAL INTELLIGENCE VAULT — A DECADE OF MARKET MEMORY',
    desc: [
      'AvicnKnov is building the most comprehensive historical market data repository in the industry — a tick-level, millisecond-resolution archive of every trade, order book event, funding rate change, liquidation, and large-order execution that has ever occurred on our exchange.',
      'This Historical Intelligence Vault will be accessible to all users at no cost, through a powerful query interface that allows research-grade market analysis without requiring external data providers or expensive Bloomberg terminals.',
      'The data is indexed with our proprietary market regime classification system, allowing researchers to instantly filter for specific market conditions — find every instance of a particular volatility pattern, identify how specific tokens behave during correlation breakdowns, or reconstruct the exact microstructure of any historical event.',
      'Future Vault capabilities include live comparison tools that overlay current market conditions against historical analogues, AI-generated market similarity scores that alert you when current conditions closely resemble historically significant periods, and academic research partnerships where verified researchers get enhanced access to anonymized aggregate data.'
    ],
    badge: 'IN DEVELOPMENT',
    status: 'dev'
  },
  {
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>`,
    tag: 'Broadcasting',
    title: 'AVICNKNOV LIVE MARKETS — REAL-TIME BROADCAST INTELLIGENCE',
    desc: [
      'AvicnKnov Live Markets is our forthcoming real-time market intelligence broadcast system — a continuous stream of curated market events, significant order flow developments, AI-detected pattern triggers, and expert commentary delivered directly into the trading interface.',
      'The broadcast is powered by our Neural Engine, which continuously scans all traded markets and surfaces the events most likely to be relevant to each individual user based on their holdings, watchlists, and historical interests.',
      'Community contributors with verified track records can submit market commentary and analysis to the broadcast feed, creating a curated stream of crowd-sourced intelligence that supplements our AI analysis with human market intuition.',
      'Future broadcast capabilities include a dedicated Live Markets audio stream for passive market monitoring while managing other tasks, integration with external information sources including regulatory announcements and macro economic data releases, and personalized market briefing reports delivered at your chosen frequency through your preferred channel.'
    ],
    badge: 'COMING SOON',
    status: 'dev'
  }
];

// ===== BUILD HTML =====
function buildAvicnQing(){
  const container = document.getElementById('tabContentAvicnQing');
  container.innerHTML = `
  <div id="avicnQingRoot">

    <!-- ZONE TAB BAR -->
    <div class="avq-zone-bar">
      <div class="avq-zone-tabs">
        <button class="avq-zone-tab active" id="avqTabWeb" onclick="avqSwitchZone('web')">Web Zone</button>
        <button class="avq-zone-tab" id="avqTabEx" onclick="avqSwitchZone('exchange')">Exchange Zone</button>
      </div>
    </div>

    <!-- WEB ZONE -->
    <div class="avq-zone-panel active" id="avqWebPanel">
      <div class="avq-web-hero">
        <div class="avq-hero-eyebrow">
          <span class="avq-hero-eyebrow-dot"></span>
          The Grand Vision
        </div>
        <h1>AVICNKNOV<br/><span>WEB ZONE</span></h1>
        <p>Twenty pillars of a civilization being built. Scroll the map and witness the architecture of what we are creating — for our community, by our team, forever.</p>
        <div class="avq-scroll-hint">
          Scroll to explore the roadmap
          <span class="avq-scroll-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </div>
      </div>

      <div class="avq-section-div">
        <div class="avq-section-div-line"></div>
        <div class="avq-section-div-label">The Master Roadmap</div>
        <div class="avq-section-div-line"></div>
      </div>

      <div class="avq-map-wrap" id="avqWebMap">
        ${webZoneNodes.map((node, i) => `
          <div class="avq-road-node${i % 2 === 1 ? ' even-node' : ''}" id="avqWebNode${i}">
            <div class="avq-node-pin">
              <div class="avq-pin-circle">
                ${node.icon}
                <div class="avq-pin-number">${String(i+1).padStart(2,'0')}</div>
              </div>
            </div>
            <div class="avq-node-card">
              <div class="avq-node-tag">
                <div class="avq-node-tag-bar"></div>
                ${node.tag}
              </div>
              <div class="avq-node-title">${node.title}</div>
              <div class="avq-node-desc">
                ${node.desc.map(p => `<p>${p}</p>`).join('')}
              </div>
              <div class="avq-node-footer">
                <div class="avq-node-stat">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ${node.stat}
                </div>
                <div class="avq-future-badge">${node.badge}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- EXCHANGE ZONE -->
    <div class="avq-zone-panel" id="avqExPanel">
      <div class="avq-ex-hero">
        <div class="avq-hero-eyebrow">
          <span class="avq-hero-eyebrow-dot"></span>
          Exchange Architecture
        </div>
        <h1>AVICNKNOV<br/><span>EXCHANGE ZONE</span></h1>
        <p>Thirty systems that power the most advanced trading platform being built today. Each node is a commitment to an uncompromising standard of technological excellence.</p>
        <div class="avq-scroll-hint">
          Explore the exchange architecture
          <span class="avq-scroll-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </div>
      </div>

      <div class="avq-section-div">
        <div class="avq-section-div-line"></div>
        <div class="avq-section-div-label">Exchange Technology Stack</div>
        <div class="avq-section-div-line"></div>
      </div>

      <div class="avq-ex-map-wrap" id="avqExMap">
        ${exchangeNodes.map((node, i) => `
          <div class="avq-ex-node${i % 2 === 1 ? ' right-side' : ''}" id="avqExNode${i}">
            <div class="avq-ex-pin">
              <div class="avq-ex-pin-circle">
                ${node.icon}
              </div>
              <div class="avq-ex-pin-num">${String(i+1).padStart(2,'0')}</div>
            </div>
            <div class="avq-ex-card">
              <div class="avq-ex-tag">${node.tag}</div>
              <div class="avq-ex-title">${node.title}</div>
              <div class="avq-ex-desc">
                ${node.desc.map(p => `<p>${p}</p>`).join('')}
              </div>
              <div class="avq-ex-footer">
                <div class="avq-ex-badge${node.status === 'live' ? ' live' : ''}">${node.badge}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

  </div>
  `;

  // Apply alternating direction for web nodes
  document.querySelectorAll('.avq-road-node.even-node').forEach(el => {
    el.style.flexDirection = 'row-reverse';
  });

  // Start intersection observer for scroll animations
  initAvqObserver();
}

// ===== ZONE SWITCHING =====
window.avqSwitchZone = function(zone){
  document.getElementById('avqTabWeb').classList.toggle('active', zone === 'web');
  document.getElementById('avqTabEx').classList.toggle('active', zone === 'exchange');
  document.getElementById('avqWebPanel').classList.toggle('active', zone === 'web');
  document.getElementById('avqExPanel').classList.toggle('active', zone === 'exchange');

  // Re-trigger observer for newly visible elements
  setTimeout(() => {
    observeAvqNodes();
  }, 50);
};

// ===== SCROLL ANIMATIONS =====
let avqObserver = null;

function initAvqObserver(){
  observeAvqNodes();
}

function observeAvqNodes(){
  if(avqObserver) avqObserver.disconnect();

  avqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.avq-road-node, .avq-ex-node').forEach(node => {
    avqObserver.observe(node);
  });
}

// ===== INIT =====
buildAvicnQing();

})();

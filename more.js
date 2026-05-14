/*!
 * more.js — AvicnKnov Web  |  Premium Experience Module
 * Self-contained: injects fonts, styles, canvas, and full DOM.
 * No dependencies. Fully responsive.
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     1.  FONTS
  ═══════════════════════════════════════════════════════════ */
  document.head.appendChild(
    Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap'
    })
  );
  if (!document.querySelector('meta[name="viewport"]')) {
    document.head.appendChild(
      Object.assign(document.createElement('meta'), {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      })
    );
  }

  /* ═══════════════════════════════════════════════════════════
     2.  STYLES
  ═══════════════════════════════════════════════════════════ */
  const CSS = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: #000;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
    }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.18); border-radius: 2px; }

    /* ── CANVAS BG ── */
    #avBg {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    /* ── WRAPPER ── */
    #avMain {
      position: relative;
      z-index: 1;
    }

    /* ══════════════════ HERO ══════════════════ */
    .av-hero {
      text-align: center;
      padding: clamp(70px,10vw,110px) 24px clamp(40px,6vw,70px);
    }
    .av-brand-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 18px;
    }
    .av-orn-line {
      flex: 1;
      max-width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.45));
    }
    .av-orn-line.r {
      background: linear-gradient(90deg, rgba(255,255,255,.45), transparent);
    }
    .av-orn-ico {
      width: 26px; height: 26px;
      animation: avSpinSlow 28s linear infinite;
      flex-shrink: 0;
    }
    @keyframes avSpinSlow { to { transform: rotate(360deg); } }

    .av-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.8rem, 9.5vw, 6rem);
      font-weight: 300;
      letter-spacing: .1em;
      line-height: 1;
      background: linear-gradient(140deg, #ffffff 0%, #888 45%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
      animation: avTitleShimmer 5s ease-in-out infinite;
    }
    .av-title em {
      font-style: italic;
      font-weight: 700;
    }
    @keyframes avTitleShimmer {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .av-tagline {
      font-size: clamp(.6rem, 1.8vw, .74rem);
      letter-spacing: .42em;
      text-transform: uppercase;
      color: rgba(255,255,255,.26);
      margin-top: 14px;
      font-weight: 300;
    }
    .av-live-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
      padding: 5px 16px;
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 30px;
      background: rgba(255,255,255,.04);
      font-size: .6rem;
      letter-spacing: .25em;
      text-transform: uppercase;
      color: rgba(255,255,255,.32);
    }
    .av-ldot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(255,255,255,.65);
      position: relative;
      animation: avLPulse 1.9s ease-in-out infinite;
    }
    .av-ldot::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,.3);
      animation: avLRing 1.9s ease-in-out infinite;
    }
    @keyframes avLPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.35)} }
    @keyframes avLRing  { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.8);opacity:0} }

    /* ══════════════════ BUTTONS ══════════════════ */
    .av-btns {
      display: flex;
      flex-wrap: wrap;
      gap: clamp(16px,3vw,28px);
      justify-content: center;
      padding: clamp(20px,4vw,50px) clamp(16px,5vw,48px);
      max-width: 1000px;
      margin: 0 auto;
    }
    .av-btn-card {
      flex: 1;
      min-width: min(100%, 300px);
      max-width: 450px;
      position: relative;
      border-radius: 22px;
      overflow: hidden;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: block;
      transition: transform .45s cubic-bezier(.23,1,.32,1), box-shadow .45s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .av-btn-card:hover {
      transform: translateY(-9px) scale(1.015);
      box-shadow: 0 24px 60px rgba(255,255,255,.06);
    }
    .av-btn-card:active { transform: scale(.97) !important; }

    /* Animated shimmer border via pseudo */
    .av-btn-card::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 23px;
      z-index: -1;
      background: linear-gradient(
        var(--av-deg, 0deg),
        rgba(255,255,255,.01) 0%,
        rgba(255,255,255,.45) 25%,
        rgba(255,255,255,.01) 50%
      );
      animation: avBorderRot 4s linear infinite;
    }
    @keyframes avBorderRot {
      from { --av-deg: 0deg; }
      to   { --av-deg: 360deg; }
    }
    /* Fallback for browsers without @property */
    @supports not (background: linear-gradient(var(--av-deg), white, black)) {
      .av-btn-card::before {
        background: linear-gradient(135deg,
          rgba(255,255,255,.02) 0%,
          rgba(255,255,255,.4) 30%,
          rgba(255,255,255,.02) 60%,
          rgba(255,255,255,.35) 100%);
        animation: avBorderFade 3s ease-in-out infinite;
      }
      @keyframes avBorderFade { 0%,100%{opacity:.5} 50%{opacity:1} }
    }

    .av-btn-glass {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,.12) 0%,
        rgba(255,255,255,.04) 50%,
        rgba(255,255,255,.08) 100%
      );
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 22px;
      z-index: 0;
    }
    .av-btn-glass::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 55%;
      background: linear-gradient(180deg, rgba(255,255,255,.07), transparent);
      border-radius: 22px 22px 0 0;
    }

    .av-btn-inner {
      position: relative;
      z-index: 1;
      padding: clamp(24px,4vw,36px) clamp(22px,4vw,32px);
    }
    .av-btn-head {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 18px;
    }
    .av-btn-ico-box {
      width: 58px; height: 58px;
      background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    .av-btn-ico-box::after {
      content: '';
      position: absolute;
      top: -100%; left: -100%;
      width: 300%; height: 300%;
      background: linear-gradient(
        135deg,
        transparent 30%,
        rgba(255,255,255,.09) 50%,
        transparent 70%
      );
      animation: avIconSheen 3.5s ease-in-out infinite;
    }
    @keyframes avIconSheen {
      0%  { transform: translateX(-100%) translateY(-100%); opacity: 0; }
      35% { opacity: 1; }
      100%{ transform: translateX(50%) translateY(50%); opacity: 0; }
    }
    .av-btn-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.3rem,3.2vw,1.7rem);
      font-weight: 600;
      letter-spacing: .04em;
      color: #fff;
      line-height: 1.1;
    }
    .av-btn-sub {
      font-size: .6rem;
      letter-spacing: .3em;
      text-transform: uppercase;
      color: rgba(255,255,255,.3);
      margin-top: 4px;
    }
    .av-btn-desc {
      font-size: clamp(.75rem,1.6vw,.83rem);
      line-height: 1.85;
      color: rgba(255,255,255,.5);
      font-weight: 300;
    }
    .av-btn-desc b {
      color: rgba(255,255,255,.85);
      font-weight: 400;
    }
    .av-btn-cta {
      margin-top: 22px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: .62rem;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(255,255,255,.38);
    }
    .av-cta-line {
      height: 1px;
      width: 22px;
      background: rgba(255,255,255,.35);
      transition: width .35s ease;
      position: relative;
      flex-shrink: 0;
    }
    .av-cta-line::after {
      content: '';
      position: absolute;
      right: 0; top: -3px;
      width: 7px; height: 7px;
      border-top: 1px solid rgba(255,255,255,.35);
      border-right: 1px solid rgba(255,255,255,.35);
      transform: rotate(45deg);
    }
    .av-btn-card:hover .av-cta-line { width: 42px; }

    /* Ripple */
    .av-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,.14);
      transform: scale(0);
      animation: avRipple .75s linear;
      pointer-events: none;
      z-index: 20;
    }
    @keyframes avRipple { to { transform: scale(6); opacity: 0; } }

    /* ══════════════════ MAP INTRO ══════════════════ */
    .av-map-intro {
      text-align: center;
      padding: 70px 24px 30px;
      position: relative;
    }
    .av-map-intro::before {
      content: '';
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%);
      width: 1px; height: 56px;
      background: linear-gradient(180deg, transparent, rgba(255,255,255,.28), transparent);
    }
    .av-map-intro-label {
      font-size: .64rem;
      letter-spacing: .42em;
      text-transform: uppercase;
      color: rgba(255,255,255,.22);
      margin-bottom: 10px;
    }
    .av-map-intro-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.5rem,4.5vw,2.4rem);
      font-weight: 300;
      letter-spacing: .06em;
      color: rgba(255,255,255,.65);
    }
    .av-map-intro-heading em {
      font-style: italic;
      color: #fff;
    }

    /* ══════════════════ TREASURE MAP ══════════════════ */
    .av-map {
      position: relative;
      max-width: 940px;
      margin: 0 auto;
      padding: 20px 0 120px;
    }

    /* Center track line */
    .av-track {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0; bottom: 0;
      width: 2px;
      z-index: 0;
      overflow: hidden;
    }
    .av-track-bg {
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,.05);
    }
    .av-track-fill {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 0;
      background: linear-gradient(
        180deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,.55) 25%,
        rgba(255,255,255,.4) 75%,
        rgba(255,255,255,0) 100%
      );
      transition: height .12s linear;
    }
    .av-track-ptcl {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 2px; height: 18px;
      background: linear-gradient(
        180deg,
        rgba(255,255,255,0),
        rgba(255,255,255,.7),
        rgba(255,255,255,0)
      );
      border-radius: 2px;
      animation: avPtclFlow var(--d,3s) linear infinite;
      animation-delay: var(--dl,0s);
      opacity: 0;
    }
    @keyframes avPtclFlow {
      0%   { top: 0%;  opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }

    /* Nodes container */
    .av-nodes {
      position: relative;
      z-index: 1;
      padding: 0 clamp(14px,4vw,48px);
    }

    /* Individual node row */
    .av-node {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: clamp(18px,3.5vw,38px);
      opacity: 0;
      transition: opacity .72s ease, transform .72s cubic-bezier(.23,1,.32,1);
    }
    .av-node.av-left {
      flex-direction: row;
      justify-content: flex-end;
      padding-right: calc(50% + 30px);
      transform: translateX(-55px);
    }
    .av-node.av-right {
      flex-direction: row;
      justify-content: flex-start;
      padding-left: calc(50% + 30px);
      transform: translateX(55px);
    }
    .av-node.av-vis {
      opacity: 1;
      transform: translateX(0) !important;
    }

    /* Glowing dot on track */
    .av-ndot {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 14px; height: 14px;
      z-index: 5;
    }
    .av-ndot-core {
      width: 14px; height: 14px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 14px rgba(255,255,255,.55),
                  0 0 30px rgba(255,255,255,.2);
      animation: avDotGlow 2.4s ease-in-out infinite;
    }
    .av-ndot-ring {
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,.3);
      animation: avDotRing 2.4s ease-in-out infinite;
    }
    @keyframes avDotGlow {
      0%,100%{ box-shadow:0 0 10px rgba(255,255,255,.4),0 0 20px rgba(255,255,255,.1); }
      50%    { box-shadow:0 0 22px rgba(255,255,255,.85),0 0 44px rgba(255,255,255,.28); }
    }
    @keyframes avDotRing {
      0%,100%{ transform:scale(1); opacity:.5; }
      50%    { transform:scale(1.5); opacity:1; }
    }

    /* Card */
    .av-ncard {
      position: relative;
      width: 100%;
      max-width: min(390px, 43vw);
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      transition: transform .35s cubic-bezier(.23,1,.32,1),
                  box-shadow .35s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .av-ncard:hover {
      transform: scale(1.04) translateY(-4px);
      box-shadow: 0 18px 50px rgba(255,255,255,.05);
    }
    .av-ncard:active { transform: scale(.97); }

    .av-ncard-glass {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,.1) 0%,
        rgba(255,255,255,.03) 60%,
        rgba(255,255,255,.07) 100%
      );
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 18px;
      z-index: 0;
    }
    .av-ncard-glass::before {
      content: '';
      position: absolute;
      top: 0; left: 15%; right: 15%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
    }

    .av-ncard-inner {
      position: relative;
      z-index: 1;
      padding: clamp(16px,3vw,24px);
    }
    .av-ncard-top {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }
    .av-ncard-ico {
      width: 38px; height: 38px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .av-ncard-meta { flex: 1; min-width: 0; }
    .av-ncard-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(.9rem,2.2vw,1.1rem);
      font-weight: 600;
      letter-spacing: .03em;
      color: rgba(255,255,255,.95);
      line-height: 1.25;
    }
    .av-ncard-badge {
      display: inline-block;
      margin-top: 5px;
      font-size: .54rem;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(255,255,255,.28);
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.08);
      padding: 2px 7px;
      border-radius: 10px;
    }
    .av-ncard-desc {
      font-size: clamp(.68rem,1.4vw,.75rem);
      line-height: 1.85;
      color: rgba(255,255,255,.4);
      font-weight: 300;
      margin-bottom: 12px;
    }
    .av-ncard-feats { display: flex; flex-direction: column; gap: 5px; }
    .av-ncard-feat {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: clamp(.63rem,1.3vw,.7rem);
      color: rgba(255,255,255,.36);
      line-height: 1.55;
    }
    .av-ncard-feat::before {
      content: '';
      width: 4px; height: 4px;
      border-radius: 50%;
      background: rgba(255,255,255,.28);
      flex-shrink: 0;
      margin-top: 5px;
    }
    .av-ncard-foot {
      margin-top: 14px;
      padding-top: 11px;
      border-top: 1px solid rgba(255,255,255,.06);
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: .58rem;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: rgba(255,255,255,.2);
    }
    .av-ncard-sdot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: rgba(255,255,255,.3);
      animation: avSDotBlink 2.6s ease-in-out infinite;
    }
    @keyframes avSDotBlink {
      0%,100%{ opacity:.3; box-shadow:none; }
      50%    { opacity:1; box-shadow:0 0 7px rgba(255,255,255,.55); }
    }

    /* Click hint */
    .av-ncard-hint {
      position: absolute;
      bottom: 10px; right: 14px;
      font-size: .54rem;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: rgba(255,255,255,.18);
    }

    /* ══════════════════ MODAL ══════════════════ */
    .av-modal-ov {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.84);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity .38s ease;
    }
    .av-modal-ov.av-open { opacity: 1; pointer-events: all; }

    .av-modal {
      position: relative;
      max-width: 530px;
      width: 100%;
      border-radius: 26px;
      overflow: hidden;
      transform: scale(.72) translateY(44px);
      transition: transform .42s cubic-bezier(.23,1,.32,1);
      max-height: 88vh;
      display: flex;
      flex-direction: column;
    }
    .av-modal-ov.av-open .av-modal {
      transform: scale(1) translateY(0);
    }
    .av-modal-glass {
      position: absolute;
      inset: 0;
      background: linear-gradient(155deg, rgba(24,24,24,.97), rgba(6,6,6,.99));
      backdrop-filter: blur(40px);
      border: 1px solid rgba(255,255,255,.11);
      border-radius: 26px;
    }
    .av-modal-glass::before {
      content: '';
      position: absolute;
      top: 0; left: 15%; right: 15%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
    }
    .av-modal-scroll {
      position: relative;
      z-index: 1;
      overflow-y: auto;
      padding: 36px 30px 32px;
      max-height: 88vh;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,.14) transparent;
    }
    .av-modal-close {
      position: absolute;
      top: 18px; right: 18px;
      width: 34px; height: 34px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: background .2s;
      flex-shrink: 0;
    }
    .av-modal-close:hover { background: rgba(255,255,255,.12); }
    .av-modal-icon {
      width: 62px; height: 62px;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 18px;
    }
    .av-modal-badge {
      display: block;
      font-size: .58rem;
      letter-spacing: .28em;
      text-transform: uppercase;
      color: rgba(255,255,255,.27);
      margin-bottom: 8px;
    }
    .av-modal-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.5rem,4.5vw,2.1rem);
      font-weight: 600;
      letter-spacing: .04em;
      color: #fff;
      margin-bottom: 16px;
      line-height: 1.15;
    }
    .av-modal-desc {
      font-size: clamp(.75rem,1.6vw,.83rem);
      line-height: 1.92;
      color: rgba(255,255,255,.5);
      font-weight: 300;
      margin-bottom: 22px;
    }
    .av-modal-feats-label {
      font-size: .6rem;
      letter-spacing: .3em;
      text-transform: uppercase;
      color: rgba(255,255,255,.22);
      margin-bottom: 10px;
    }
    .av-modal-feats { display: flex; flex-direction: column; gap: 7px; }
    .av-modal-feat {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 14px;
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.06);
      border-radius: 10px;
      font-size: clamp(.72rem,1.5vw,.78rem);
      color: rgba(255,255,255,.48);
      line-height: 1.65;
    }
    .av-modal-feat-n {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1rem;
      color: rgba(255,255,255,.18);
      flex-shrink: 0;
      line-height: 1.5;
      width: 20px;
      text-align: right;
    }

    /* ══════════════════ RESPONSIVE ══════════════════ */
    @media (max-width: 650px) {
      .av-node.av-left, .av-node.av-right {
        flex-direction: column;
        padding: 0 0 0 32px;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .av-node.av-left  { transform: translateX(-35px); }
      .av-node.av-right { transform: translateX(35px); }
      .av-ndot {
        left: 0;
        transform: translate(-50%, -50%);
      }
      .av-track {
        left: 15px;
        transform: none;
      }
      .av-ncard { max-width: 100%; }
      .av-modal-scroll { padding: 30px 22px 28px; }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ═══════════════════════════════════════════════════════════
     3.  SVG ICONS
  ═══════════════════════════════════════════════════════════ */

  /* Trading — animated candlestick + trend line */
  const ICON_TRADING = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      .tb1{transform-box:fill-box;transform-origin:50% 100%;animation:avBar1 2.1s ease-in-out infinite}
      .tb2{transform-box:fill-box;transform-origin:50% 100%;animation:avBar2 2.6s ease-in-out infinite}
      .tb3{transform-box:fill-box;transform-origin:50% 100%;animation:avBar3 1.9s ease-in-out infinite}
      .tl{stroke-dasharray:44;stroke-dashoffset:44;animation:avTLine 2s ease-out forwards,avTLinePulse 2s 2s ease-in-out infinite}
      @keyframes avBar1{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.38)}}
      @keyframes avBar2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.65)}}
      @keyframes avBar3{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.28)}}
      @keyframes avTLine{to{stroke-dashoffset:0}}
      @keyframes avTLinePulse{0%,100%{opacity:.55}50%{opacity:1}}
    </style>
    <line x1="1" y1="29" x2="33" y2="29" stroke="rgba(255,255,255,.14)" stroke-width=".8"/>
    <line x1="1" y1="21" x2="33" y2="21" stroke="rgba(255,255,255,.07)" stroke-width=".6"/>
    <line x1="1" y1="13" x2="33" y2="13" stroke="rgba(255,255,255,.07)" stroke-width=".6"/>
    <g class="tb1">
      <line x1="4" y1="11" x2="4" y2="28" stroke="rgba(255,255,255,.2)" stroke-width=".7"/>
      <rect x="1.5" y="16" width="5" height="9" rx=".9" fill="rgba(255,255,255,.72)"/>
    </g>
    <g class="tb2">
      <line x1="13" y1="9" x2="13" y2="25" stroke="rgba(255,255,255,.2)" stroke-width=".7"/>
      <rect x="10.5" y="13" width="5" height="8.5" rx=".9" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.5)" stroke-width=".8"/>
    </g>
    <g class="tb3">
      <line x1="22" y1="7" x2="22" y2="23" stroke="rgba(255,255,255,.2)" stroke-width=".7"/>
      <rect x="19.5" y="10" width="5" height="10" rx=".9" fill="rgba(255,255,255,.76)"/>
    </g>
    <polyline class="tl" points="2,27 7,20 13,22 19,14 25,9 32,5" stroke="rgba(255,255,255,.65)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  /* Futures — orbiting rocket */
  const ICON_FUTURES = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      .fr{transform-box:fill-box;transform-origin:50% 50%;animation:avFRise 2.2s ease-in-out infinite}
      .fo1{transform-box:fill-box;transform-origin:17px 18px;animation:avFOrb 3.2s linear infinite}
      .fo2{transform-box:fill-box;transform-origin:17px 18px;animation:avFOrb 5s linear infinite reverse}
      .ff{animation:avFFlame 1.3s ease-in-out infinite}
      @keyframes avFRise{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
      @keyframes avFOrb{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes avFFlame{0%,100%{opacity:.35}50%{opacity:.9}}
    </style>
    <ellipse cx="17" cy="19" rx="12" ry="5" stroke="rgba(255,255,255,.11)" stroke-width=".8" fill="none"/>
    <ellipse cx="17" cy="17" rx="9" ry="3.5" stroke="rgba(255,255,255,.07)" stroke-width=".7" fill="none" transform="rotate(-28 17 17)"/>
    <g class="fo1">
      <circle cx="29" cy="19" r="2" fill="rgba(255,255,255,.55)"/>
    </g>
    <g class="fo2">
      <circle cx="17" cy="27.5" r="1.4" fill="rgba(255,255,255,.35)"/>
    </g>
    <g class="fr">
      <path d="M17 4 C17 4 12.5 12 12.5 17 L17 20.5 L21.5 17 C21.5 12 17 4 17 4Z"
        fill="rgba(255,255,255,.88)"/>
      <path d="M12.5 17 L10 21.5 L17 20.5Z" fill="rgba(255,255,255,.38)"/>
      <path d="M21.5 17 L24 21.5 L17 20.5Z" fill="rgba(255,255,255,.38)"/>
      <circle cx="17" cy="12" r="2.2" fill="rgba(0,0,0,.55)"/>
      <path class="ff" d="M15.2 20.5 Q17 25.5 18.8 20.5" stroke="rgba(255,255,255,.65)" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;

  /* Small node icons */
  function nodeIcon(t) {
    const I = {
      ai:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.ni1{animation:niPls 1.5s ease-in-out infinite}.ni2{animation:niPls 1.5s .3s ease-in-out infinite}.ni3{animation:niPls 1.5s .6s ease-in-out infinite}@keyframes niPls{0%,100%{opacity:.4}50%{opacity:1}}</style><circle cx="11" cy="11" r="2.5" fill="rgba(255,255,255,.85)"/><circle class="ni1" cx="3.5" cy="5" r="1.5" fill="rgba(255,255,255,.55)"/><circle class="ni2" cx="18.5" cy="5" r="1.5" fill="rgba(255,255,255,.55)"/><circle class="ni3" cx="3.5" cy="17" r="1.5" fill="rgba(255,255,255,.55)"/><circle class="ni1" cx="18.5" cy="17" r="1.5" fill="rgba(255,255,255,.55)"/><line x1="5" y1="5.8" x2="9" y2="9.3" stroke="rgba(255,255,255,.25)" stroke-width=".8"/><line x1="17" y1="5.8" x2="13" y2="9.3" stroke="rgba(255,255,255,.25)" stroke-width=".8"/><line x1="5" y1="16.2" x2="9" y2="12.7" stroke="rgba(255,255,255,.25)" stroke-width=".8"/><line x1="17" y1="16.2" x2="13" y2="12.7" stroke="rgba(255,255,255,.25)" stroke-width=".8"/></svg>`,
      events:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nev{transform-box:fill-box;transform-origin:50% 50%;animation:nevAn 2s ease-in-out infinite}@keyframes nevAn{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.6)}}</style><rect x="3" y="4" width="16" height="15" rx="2.5" stroke="rgba(255,255,255,.52)" stroke-width=".9" fill="none"/><line x1="3" y1="9" x2="19" y2="9" stroke="rgba(255,255,255,.28)" stroke-width=".8"/><line x1="7" y1="2.5" x2="7" y2="5.5" stroke="rgba(255,255,255,.52)" stroke-width="1.2" stroke-linecap="round"/><line x1="15" y1="2.5" x2="15" y2="5.5" stroke="rgba(255,255,255,.52)" stroke-width="1.2" stroke-linecap="round"/><rect class="nev" x="5.5" y="12" width="4" height="3" rx="1" fill="rgba(255,255,255,.52)"/><rect class="nev" x="12.5" y="12" width="4" height="3" rx="1" fill="rgba(255,255,255,.32)"/></svg>`,
      community:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nc1{animation:ncAn 2s ease-in-out infinite}.nc2{animation:ncAn 2s .5s ease-in-out infinite}.nc3{animation:ncAn 2s 1s ease-in-out infinite}@keyframes ncAn{0%,100%{opacity:.4}50%{opacity:1}}</style><circle class="nc1" cx="11" cy="6.5" r="3" stroke="rgba(255,255,255,.7)" stroke-width=".9" fill="rgba(255,255,255,.1)"/><circle class="nc2" cx="5" cy="14" r="2.4" stroke="rgba(255,255,255,.5)" stroke-width=".9" fill="rgba(255,255,255,.07)"/><circle class="nc3" cx="17" cy="14" r="2.4" stroke="rgba(255,255,255,.5)" stroke-width=".9" fill="rgba(255,255,255,.07)"/><line x1="8.8" y1="9" x2="6.5" y2="11.8" stroke="rgba(255,255,255,.22)" stroke-width=".8"/><line x1="13.2" y1="9" x2="15.5" y2="11.8" stroke="rgba(255,255,255,.22)" stroke-width=".8"/></svg>`,
      call:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nca{transform-box:fill-box;transform-origin:50% 50%;animation:ncaAn 1.6s ease-in-out infinite}@keyframes ncaAn{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}</style><g class="nca"><path d="M7 4C7 4 5 4 5 7L5 9C5 9 5 10 6 10.8 7.5 11.8 9.5 13.8 10.5 15.2 11 16.2 12 16 14 16 17 16 17 14 17 14 16 12.5 15 12 14 11.5 13.5 11.5 13 12L12.5 12.5C11.5 11.5 9.5 9.5 8.5 8.5L9 8C9.5 7.5 9.5 7 9 6 8.5 5 7 4 7 4Z" stroke="rgba(255,255,255,.7)" stroke-width=".9" fill="rgba(255,255,255,.1)"/></g><path d="M15 3.5 Q19.5 5.5 19.5 9.5" stroke="rgba(255,255,255,.3)" stroke-width=".9" fill="none" stroke-linecap="round"/><path d="M14 5.5 Q17.5 7 17.5 9.5" stroke="rgba(255,255,255,.18)" stroke-width=".9" fill="none" stroke-linecap="round"/></svg>`,
      join:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nj{stroke-dasharray:52;animation:njAn 2.8s linear infinite}@keyframes njAn{0%{stroke-dashoffset:52}100%{stroke-dashoffset:0}}</style><polygon class="nj" points="11,2.5 13.5,8.5 19.5,9 15,13.5 16.5,20 11,17 5.5,20 7,13.5 2.5,9 8.5,8.5" stroke="rgba(255,255,255,.7)" stroke-width="1" fill="rgba(255,255,255,.1)" stroke-linejoin="round"/><polygon points="11,6 12.6,9.8 16.8,10.4 14,13.1 14.6,17.4 11,15.5 7.4,17.4 8,13.1 5.2,10.4 9.4,9.8" fill="rgba(255,255,255,.18)"/></svg>`,
      achievement:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nac{transform-box:fill-box;transform-origin:11px 9px;animation:nacAn 2s ease-in-out infinite}@keyframes nacAn{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}</style><g class="nac"><circle cx="11" cy="9" r="5.5" stroke="rgba(255,255,255,.68)" stroke-width=".9" fill="rgba(255,255,255,.06)"/><path d="M11 5.5L12.2 8.2H15L12.8 9.8 13.5 12.5 11 11 8.5 12.5 9.2 9.8 7 8.2H9.8Z" fill="rgba(255,255,255,.65)"/></g><path d="M8 14.5L6.5 19.5L11 17.5L15.5 19.5L14 14.5" stroke="rgba(255,255,255,.32)" stroke-width=".9" fill="none" stroke-linejoin="round"/></svg>`,
      quint:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nqu{transform-box:fill-box;transform-origin:11px 11px;animation:nquAn 8s linear infinite}@keyframes nquAn{to{transform:rotate(360deg)}}</style><g class="nqu"><polygon points="11,2 13.3,8 19.5,8 14.5,11.8 16.5,18 11,14.5 5.5,18 7.5,11.8 2.5,8 8.7,8" stroke="rgba(255,255,255,.48)" stroke-width=".8" fill="rgba(255,255,255,.06)" stroke-linejoin="round"/></g><circle cx="11" cy="11" r="2.5" fill="rgba(255,255,255,.55)"/></svg>`,
      avicn:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nav{stroke-dasharray:62;animation:navAn 2.8s ease-in-out infinite}@keyframes navAn{0%{stroke-dashoffset:62}60%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}</style><path class="nav" d="M3 19 L11 3 L19 19" stroke="rgba(255,255,255,.8)" stroke-width="1.3" fill="none" stroke-linejoin="round" stroke-linecap="round"/><line x1="7" y1="14" x2="15" y2="14" stroke="rgba(255,255,255,.35)" stroke-width=".9" stroke-linecap="round"/><circle cx="11" cy="11" r="1.6" fill="rgba(255,255,255,.65)"/></svg>`,
      neural:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nn1{animation:nnAn 1.5s ease-in-out infinite}.nn2{animation:nnAn 1.5s .25s ease-in-out infinite}.nn3{animation:nnAn 1.5s .5s ease-in-out infinite}.nn4{animation:nnAn 1.5s .75s ease-in-out infinite}@keyframes nnAn{0%,100%{opacity:.3}50%{opacity:1}}</style><circle class="nn1" cx="4.5" cy="4.5" r="2" fill="rgba(255,255,255,.7)"/><circle class="nn2" cx="17.5" cy="4.5" r="2" fill="rgba(255,255,255,.7)"/><circle class="nn3" cx="4.5" cy="17.5" r="2" fill="rgba(255,255,255,.7)"/><circle class="nn4" cx="17.5" cy="17.5" r="2" fill="rgba(255,255,255,.7)"/><circle cx="11" cy="11" r="2.8" fill="rgba(255,255,255,.88)"/><line x1="6.3" y1="5.3" x2="9.2" y2="8.8" stroke="rgba(255,255,255,.2)" stroke-width=".8"/><line x1="15.7" y1="5.3" x2="12.8" y2="8.8" stroke="rgba(255,255,255,.2)" stroke-width=".8"/><line x1="6.3" y1="16.7" x2="9.2" y2="13.2" stroke="rgba(255,255,255,.2)" stroke-width=".8"/><line x1="15.7" y1="16.7" x2="12.8" y2="13.2" stroke="rgba(255,255,255,.2)" stroke-width=".8"/></svg>`,
      portfolio:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.npf{transform-box:fill-box;transform-origin:11px 11px;animation:npfAn 6s linear infinite}@keyframes npfAn{to{transform:rotate(360deg)}}</style><g class="npf"><path d="M11 2.5 A8.5 8.5 0 0 1 19.5 11" stroke="rgba(255,255,255,.85)" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M19.5 11 A8.5 8.5 0 0 1 11 19.5" stroke="rgba(255,255,255,.45)" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M11 19.5 A8.5 8.5 0 0 1 2.5 11" stroke="rgba(255,255,255,.2)" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M2.5 11 A8.5 8.5 0 0 1 11 2.5" stroke="rgba(255,255,255,.08)" stroke-width="1.5" fill="none" stroke-linecap="round"/></g><circle cx="11" cy="11" r="2.2" fill="rgba(255,255,255,.55)"/></svg>`,
      alert:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nal{transform-box:fill-box;transform-origin:11px 7px;animation:nalAn 1.3s ease-in-out infinite}@keyframes nalAn{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}</style><g class="nal"><path d="M5 15 Q5 7.5 11 7.5 Q17 7.5 17 15Z" stroke="rgba(255,255,255,.7)" stroke-width=".9" fill="rgba(255,255,255,.08)"/><line x1="3" y1="15" x2="19" y2="15" stroke="rgba(255,255,255,.5)" stroke-width=".9" stroke-linecap="round"/><path d="M9.5 15.5 Q11 18 12.5 15.5" stroke="rgba(255,255,255,.5)" stroke-width=".9" fill="none" stroke-linecap="round"/><circle cx="11" cy="5.5" r="1.3" fill="rgba(255,255,255,.75)"/></g></svg>`,
      vip:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nvip{animation:nvipAn 2s ease-in-out infinite}@keyframes nvipAn{0%,100%{opacity:.55}50%{opacity:1}}</style><path class="nvip" d="M11 2 L13.5 7.8 L20 8.2 L15 13 L16.5 19.5 L11 16.5 L5.5 19.5 L7 13 L2 8.2 L8.5 7.8 Z" stroke="rgba(255,255,255,.68)" stroke-width=".9" fill="rgba(255,255,255,.08)" stroke-linejoin="round"/><text x="7.3" y="13.5" font-size="5.5" font-family="DM Sans,sans-serif" fill="rgba(255,255,255,.75)" font-weight="600" letter-spacing=".5">VIP</text></svg>`,
      academy:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nacd{transform-box:fill-box;transform-origin:11px 8px;animation:nacdAn 2.2s ease-in-out infinite}@keyframes nacdAn{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}</style><g class="nacd"><polygon points="11,3 20,8 11,13 2,8" stroke="rgba(255,255,255,.7)" stroke-width=".9" fill="rgba(255,255,255,.08)" stroke-linejoin="round"/></g><path d="M6 11 L6 16 Q11 18.5 16 16 L16 11" stroke="rgba(255,255,255,.38)" stroke-width=".9" fill="none"/><line x1="19" y1="8" x2="19" y2="14" stroke="rgba(255,255,255,.28)" stroke-width="1" stroke-linecap="round"/></svg>`,
      leaderboard:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nlb1{transform-box:fill-box;transform-origin:50% 100%;animation:nlbAn 2s ease-in-out infinite}.nlb2{transform-box:fill-box;transform-origin:50% 100%;animation:nlbAn 2s .4s ease-in-out infinite}.nlb3{transform-box:fill-box;transform-origin:50% 100%;animation:nlbAn 2s .8s ease-in-out infinite}@keyframes nlbAn{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.18)}}</style><g class="nlb1"><rect x="3.5" y="13.5" width="4" height="5" rx=".8" fill="rgba(255,255,255,.42)"/></g><g class="nlb2"><rect x="9" y="8" width="4" height="10.5" rx=".8" fill="rgba(255,255,255,.78)"/></g><g class="nlb3"><rect x="14.5" y="10.5" width="4" height="8" rx=".8" fill="rgba(255,255,255,.58)"/></g><line x1="2" y1="19.5" x2="20" y2="19.5" stroke="rgba(255,255,255,.28)" stroke-width=".8"/></svg>`,
      dex:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.ndx{stroke-dasharray:32;animation:ndxAn 2s linear infinite}@keyframes ndxAn{0%{stroke-dashoffset:32}100%{stroke-dashoffset:0}}</style><path class="ndx" d="M4 8 Q8 4 11 8 Q14 12 18 8" stroke="rgba(255,255,255,.7)" stroke-width="1.1" fill="none" stroke-linecap="round"/><path class="ndx" d="M4 14 Q8 18 11 14 Q14 10 18 14" stroke="rgba(255,255,255,.4)" stroke-width="1.1" fill="none" stroke-linecap="round" style="animation-delay:.6s"/><path d="M16.5 6 L18.5 8 L16.5 10" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 12 L3.5 14 L5.5 16" stroke="rgba(255,255,255,.45)" stroke-width=".9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      chart:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><style>.nch{stroke-dasharray:58;animation:nchAn 2.6s ease-in-out infinite}@keyframes nchAn{0%{stroke-dashoffset:58}70%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}</style><line x1="3" y1="3" x2="3" y2="19" stroke="rgba(255,255,255,.28)" stroke-width=".8"/><line x1="3" y1="19" x2="19" y2="19" stroke="rgba(255,255,255,.28)" stroke-width=".8"/><polyline class="nch" points="4,16 7,10.5 10,12.5 14,6.5 19,4" stroke="rgba(255,255,255,.82)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    };
    return I[t] || I.ai;
  }

  /* Ornament icon for hero */
  function ornamentIcon() {
    return `<svg class="av-orn-ico" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <polygon points="13,2 15.5,9 23,9 17,13.5 19,20.5 13,17 7,20.5 9,13.5 3,9 10.5,9"
        stroke="rgba(255,255,255,.32)" stroke-width=".8" fill="rgba(255,255,255,.07)" stroke-linejoin="round"/>
    </svg>`;
  }

  /* ═══════════════════════════════════════════════════════════
     4.  NODES DATA
  ═══════════════════════════════════════════════════════════ */
  const NODES = [
    {
      id:'ai-signals', icon:'ai', title:'Live AI Trading Signals', badge:'Q3 2025',
      side:'left', status:'In Development',
      desc:'AvicnKnov is engineering a real-time artificial intelligence signal engine built on deep neural networks trained on over a decade of global market data. This system will surface high-confidence entry and exit signals with full reasoning transparency, confidence scores, and recommended risk parameters — all displayed directly inside your dashboard so you can act without ever leaving the platform.',
      features:[
        'Neural network trained on 10+ years of multi-asset market history for precise pattern recognition',
        'Real-time signal delivery with 0–100 confidence scores and clear risk-to-reward breakdowns',
        'Coverage across cryptocurrency, forex, commodities, and equity derivatives markets',
        'Automated stop-loss and take-profit suggestions generated alongside every signal issued',
        'Full signal performance history with accuracy statistics, win rates, and drawdown metrics',
        'Push notification integration for instant mobile delivery of critical market signals',
        'Built-in backtesting module to validate any signal strategy against historical price data',
      ]
    },
    {
      id:'global-events', icon:'events', title:'Global Events Hub', badge:'Q4 2025',
      side:'right', status:'Planning',
      desc:'The Global Events Hub will be the central broadcasting and calendar system for everything happening inside the AvicnKnov ecosystem. From educational webinars and market outlook sessions to platform milestone celebrations, every event will be fully listed, categorized, and accessible to all registered users. An intelligent reminder system ensures you are always prepared before anything important begins.',
      features:[
        'Centralized calendar with advanced category filters, search, and personalized event feeds',
        'Embedded live webinar streams accessible directly from within the AvicnKnov dashboard interface',
        'Speaker profiles, detailed agendas, and pre-event materials published well in advance',
        'RSVP and seat reservation system for limited-capacity premium and exclusive event formats',
        'Post-event recording archive with chapters and searchable transcripts for every session',
        'Built-in global timezone converter on every event card so scheduling is never confusing',
        'Community event submission pipeline allowing verified users to propose and host their own events',
      ]
    },
    {
      id:'community', icon:'community', title:'AvicnKnov Community Network', badge:'Q4 2025',
      side:'left', status:'Planning',
      desc:'A powerful social and networking layer is being integrated directly into AvicnKnov connecting traders, analysts, and market enthusiasts from across the globe. Share insights, discuss live strategies, follow high-performing members, and build your personal professional network within a moderated and transparent environment. Community activity will be deeply tied to trading features so acting on information is instant.',
      features:[
        'Verified trader profiles displaying public performance history and portfolio snapshot statistics',
        'Structured discussion threads organized by market sector, asset class, and trading methodology',
        'Follow system allowing you to track posts, signals, and analysis from specific trusted members',
        'Reputation and endorsement system based on accuracy and community contribution over time',
        'End-to-end encrypted private messaging for confidential strategy and research discussions',
        'Community trading competitions and periodic challenges with real prizes and recognition',
        'AI-assisted moderation filtering spam, misinformation, and manipulative content automatically',
      ]
    },
    {
      id:'live-call', icon:'call', title:'Live Call Sessions', badge:'Q1 2026',
      side:'right', status:'Roadmap',
      desc:'AvicnKnov Live Call is a structured real-time audio and video session format where experienced analysts and core team members will walk participants through current market conditions, break down live trades, and take direct questions from the audience. Sessions will run as both open public broadcasts and exclusive calls reserved solely for premium account holders on the platform.',
      features:[
        'HD audio and video sessions embedded natively within the AvicnKnov platform interface',
        'Live question and answer module allowing viewers to submit and vote on questions in real time',
        'Screen sharing capability enabling live chart walkthroughs and platform demonstrations',
        'Automatic session recording with transcript generation and chapter markers for later review',
        'Premium-tier exclusive calls with strictly limited attendance and direct analyst interaction',
        'Multi-language subtitle generation for global accessibility across all session recordings',
        'Synchronized live chat sidebar for real-time community reactions throughout each broadcast',
      ]
    },
    {
      id:'join-events', icon:'join', title:'Join Events Program', badge:'Q1 2026',
      side:'left', status:'Roadmap',
      desc:'The Join Events Program is an interactive participation and rewards system that recognizes users for consistent and meaningful engagement across the AvicnKnov platform. Attending events, completing learning milestones, and contributing to community growth will earn exclusive event passes, digital collectibles, and early access privileges. Participation transforms from passive viewing into an active and genuinely rewarding journey.',
      features:[
        'Digital event passport tracking every attended event and completed program milestone',
        'Exclusive collectibles and commemorative items issued for attending major launch events',
        'Early access passes to beta features unlocked for active and consistent event participants',
        'Referral bonus system rewarding users who bring new verified members to the ecosystem',
        'Tiered participation levels unlocking progressively greater privileges and platform benefits',
        'Monthly program highlights showcasing top contributors and memorable event moments',
        'Cross-platform partnership events offering bonus rewards from projects allied with AvicnKnov',
      ]
    },
    {
      id:'achievements', icon:'achievement', title:'Achievements and Badges', badge:'Q2 2026',
      side:'right', status:'Roadmap',
      desc:'The Achievements System transforms your entire AvicnKnov journey into a visible record of skill, consistency, and contribution. Every meaningful platform milestone — from executing your first trade to topping the community leaderboard — is permanently honored with a collectible badge and optional public display. Rare limited-edition achievements will only be available during specific platform events, making timing and dedication matter.',
      features:[
        'Over 200 unique achievement badges spanning trading, education, and community contribution categories',
        'Five-tier rarity system from standard to diamond status with escalating prestige and platform visibility',
        'Public achievement showcase panel on every user profile for transparent community recognition',
        'Limited-edition event badges permanently closed after their launch window expires without exception',
        'Progress tracking with exact percentage completion figures and personalized tips to unlock each badge',
        'Daily and weekly streak badges rewarding consistent platform engagement and active trading habits',
        'Custom title system activated by completing major achievement sets to display alongside your username',
      ]
    },
    {
      id:'quint', icon:'quint', title:'Quint Options Platform', badge:'Q2 2026',
      side:'left', status:'In Development',
      desc:'Quint Options is a proprietary derivatives trading module being designed exclusively for the AvicnKnov exchange. It brings institutional-grade options functionality to all experience levels through a simplified yet powerful interface. Payoff curve visualizations, AI strategy recommendations, and clear Greeks displays will make complex instruments genuinely accessible without sacrificing the depth that experienced traders demand.',
      features:[
        'Simplified options chain interface with intuitive call and put selection and expiry navigation',
        'Real-time interactive payoff diagram showing exact profit and loss at every potential price level',
        'AI strategy recommender suggesting covered calls, straddles, and spreads based on current market context',
        'Full Greeks panel displaying delta, gamma, theta, and vega updated tick-by-tick for active positions',
        'Paper trading mode allowing full strategy simulation with zero real capital exposure or risk',
        'Multi-leg order builder supporting complex spread construction through a visual drag interface',
        'Expiry heatmap displaying open interest concentration across all available strike prices',
      ]
    },
    {
      id:'avicntqz', icon:'avicn', title:'Avicn and TQZ Launch', badge:'Q3 2026',
      side:'right', status:'Upcoming',
      desc:'The Avicn and TQZ Launch is the most anticipated milestone on the entire AvicnKnov roadmap and marks the beginning of the complete live platform era. The full public exchange will open, the TQZ utility token will activate, and a coordinated global campaign will celebrate early adopters who believed from the beginning. This single event transitions AvicnKnov from a building platform into a fully operational trading ecosystem.',
      features:[
        'Full public exchange activation with all trading pairs, order books, and matching engines live',
        'TQZ token generation event with a fully transparent supply distribution and vesting schedule',
        'Early adopter bonus program delivering special rewards to every user registered before launch day',
        'Global live launch broadcast including an all-hands team AMA and community celebration event',
        'TQZ staking program activated on day one with competitive annual yield rates and flexible terms',
        'Simultaneous listing announcements on major external platforms coordinated with the launch timeline',
        'Full media campaign including press releases, content partnerships, and influencer coordination',
      ]
    },
    {
      id:'neural', icon:'neural', title:'Neural Market Analytics', badge:'Q3 2026',
      side:'left', status:'Research',
      desc:'Neural Market Analytics is a deep intelligence layer that goes far beyond standard technical indicators to surface the invisible forces shaping market behavior. Cross-asset correlations, sentiment regime shifts, and structural breakout conditions will all be detected automatically and surfaced through a clean analytical interface. The goal is to give every AvicnKnov user a genuine and lasting information advantage over the broader market.',
      features:[
        'Real-time cross-asset correlation matrix identifying dangerous portfolio concentration and hedging opportunities',
        'Sentiment analysis pipeline processing news feeds, social media volumes, and on-chain transaction flows',
        'Anomaly detection system flagging unusual order flow and volume profiles before breakouts occur publicly',
        'Global macro cycle tracker linking price action phase to economic indicators and central bank event data',
        'Composite health index scoring every watched asset on momentum, structure, and sentiment simultaneously',
        'Pattern recognition library capable of identifying over 150 classical and modern chart formations automatically',
        'Predictive volume profiling estimating expected liquidity concentration at upcoming price levels and sessions',
      ]
    },
    {
      id:'portfolio', icon:'portfolio', title:'Smart Portfolio Manager', badge:'Q4 2026',
      side:'right', status:'Research',
      desc:'The Smart Portfolio Manager will automate the ongoing management of your trading positions using a combination of rule-based logic and adaptive AI-driven strategy execution. Define your target allocation and risk parameters once, and the system will continuously monitor, rebalance, and enforce discipline without requiring you to be present. It is the closest experience to having a dedicated professional managing your capital around the clock.',
      features:[
        'Continuous automated rebalancing maintaining your target asset allocation within defined tolerance bands',
        'Dynamic position sizing calculator adapting to current account equity and real-time volatility conditions',
        'Visual strategy builder using drag-and-drop logic blocks requiring no programming knowledge to use',
        'Live performance attribution analysis showing exactly which positions are contributing or detracting returns',
        'Automatic drawdown protection rules reducing exposure progressively as portfolio loss thresholds are approached',
        'Tax optimization module identifying harvesting opportunities and wash-sale conflicts in taxable accounts',
        'Multi-exchange portfolio aggregation pulling external wallet balances into a single consolidated view',
      ]
    },
    {
      id:'alerts', icon:'alert', title:'Quantum Price Alerts', badge:'Q4 2026',
      side:'left', status:'Roadmap',
      desc:'Quantum Price Alerts is an ultra-low latency notification infrastructure built directly at the exchange data feed level to guarantee you receive critical market signals faster than any conventional third-party alert service. Millisecond delivery, complex multi-condition triggers, and fully customizable delivery channels make this the most responsive and flexible alerting system available to retail traders anywhere.',
      features:[
        'Sub-10 millisecond alert delivery from trigger condition detection to final user notification',
        'Complex multi-condition triggers combining price levels, volume thresholds, and indicator values together',
        'Alert chaining system allowing one triggered alert to automatically activate a sequence of further alerts',
        'Multi-channel delivery supporting push notifications, email, SMS, and outbound webhook integrations',
        'Alert performance history showing historical frequency, false positive rate, and accuracy over time',
        'Intelligent grouping preventing notification overload during extreme volatility or rapid price movement',
        'Shared community alert templates enabling one-click deployment of proven strategies from top members',
      ]
    },
    {
      id:'vip', icon:'vip', title:'VIP Mentorship Program', badge:'Q1 2027',
      side:'right', status:'Planning',
      desc:'The VIP Mentorship Program is the most exclusive and personalized offering within the entire AvicnKnov ecosystem. Qualified participants are individually matched with verified professional traders for a structured multi-week engagement including one-on-one sessions, live trade reviews, personalized written feedback, and direct access to mentor market intelligence. This program is designed exclusively for serious traders committed to reaching consistent and sustainable profitability.',
      features:[
        'Curated mentor-mentee matching based on trading style, market focus, and stated performance objectives',
        'Weekly one-on-one video sessions with a dedicated professional analyst assigned specifically to you',
        'Live trade review meetings where your actual open and closed positions are analyzed line by line',
        'Detailed written performance feedback reports delivered after every significant trade you execute',
        'Shared access to your assigned mentor private watchlists and signal alerts throughout the program',
        'Progress benchmarking report comparing your development trajectory against defined program milestones',
        'Graduation certificate recognized across the AvicnKnov platform and partner community ecosystem',
      ]
    },
    {
      id:'academy', icon:'academy', title:'AvicnKnov Academy', badge:'Q1 2027',
      side:'left', status:'Planning',
      desc:'AvicnKnov Academy will be a comprehensive multi-level educational platform embedded directly inside the exchange interface. Covering everything from what a candlestick is for complete beginners to advanced options pricing theory and quantitative strategy design for professionals, the Academy offers structured learning paths that grow alongside your evolving skill level. All content is produced by verified practitioners and updated to reflect real current market conditions.',
      features:[
        'Full structured learning tracks from absolute beginner through to advanced professional trading methodology',
        'Over 500 video lessons produced by certified trading professionals and credentialed finance practitioners',
        'Interactive module quizzes and knowledge assessments following every lesson for measurable retention',
        'Simulated trading exercises using real historical market data for safe and practical hands-on learning',
        'Completion certificates and achievement badges tied to finishing each Academy learning track milestone',
        'Live workshop integration connecting specific course content directly to current real-market events',
        'Personalized curriculum engine recommending content based on your trading activity and learning history',
      ]
    },
    {
      id:'leaderboard', icon:'leaderboard', title:'Global Rankings Leaderboard', badge:'Q2 2027',
      side:'right', status:'Roadmap',
      desc:'The Global Rankings Leaderboard will publicly rank all active platform participants across a sophisticated set of risk-adjusted performance metrics, creating healthy competition and a powerful new layer of social proof and reputation within the broader community. Rankings reward responsible and consistent profitability rather than raw returns alone, ensuring that the most visible traders on the platform are genuinely worth following and learning from.',
      features:[
        'Risk-adjusted scoring using Sharpe ratio, Sortino ratio, and maximum drawdown in the ranking calculation',
        'Separate leaderboard views for weekly, monthly, quarterly, and all-time performance across all asset classes',
        'Anonymous participation option allowing skilled traders to compete without revealing personal identity',
        'Exclusive rewards for top 100 ranked traders including platform credits, fee discounts, and VIP upgrades',
        'Voluntary strategy transparency toggle letting ranked members share their methodology with followers',
        'Team and group leaderboard mode enabling corporate entities and trading groups to compete collectively',
        'Historical archive preserving every past leaderboard period for permanent study and strategy research',
      ]
    },
    {
      id:'dex', icon:'dex', title:'Decentralized Exchange Layer', badge:'Q3 2027',
      side:'left', status:'Research',
      desc:'AvicnKnov is developing a decentralized settlement layer allowing users to trade directly from self-custody wallets without ever relinquishing control of their assets to a centralized party. This hybrid architecture preserves the speed and liquidity advantages of centralized matching while providing the transparency and security guarantees of on-chain settlement. Users will have complete freedom to choose their preferred interaction model at any time.',
      features:[
        'Non-custodial wallet connection supporting all major hardware and software wallet providers natively',
        'On-chain settlement with fully public transaction verification on auditable blockchain ledgers',
        'Automated market maker liquidity pools enabling trading of long-tail and low-volume asset pairs',
        'Cross-chain bridge integration for seamless asset movement between supported blockchain networks',
        'Governance token voting rights for community participation in protocol parameter and listing decisions',
        'Optional zero-knowledge proof privacy layer for users requiring transaction confidentiality and anonymity',
        'Yield generation through liquidity provision with transparent fee distribution and clear reward accounting',
      ]
    },
    {
      id:'charting', icon:'chart', title:'Advanced Charting Studio', badge:'Q4 2027',
      side:'right', status:'Research',
      desc:'The Advanced Charting Studio will be a full professional-grade technical analysis environment built natively into the AvicnKnov platform. Combining a rich drawing tool library, a custom indicator scripting environment, multi-timeframe layouts, and seamless order execution from within any chart view, the studio is designed to meet the demands of the most rigorous technical analysts without requiring any external tools or additional subscriptions.',
      features:[
        'Over 100 built-in technical indicators covering all major momentum, trend, volume, and volatility categories',
        'Custom indicator scripting in a simplified syntax that non-developers can learn and use productively',
        'Multi-chart layout supporting up to nine simultaneous panels across different assets and timeframes',
        'Full drawing tool library including Fibonacci retracements, Gann fans, pitchforks, and Elliott wave tools',
        'Saveable chart templates enabling instant loading of complete multi-indicator analysis configurations',
        'Community chart sharing allowing published analysis to be viewed and copied by other platform members',
        'Historical replay mode simulating past price action bar by bar for strategy testing and skill development',
      ]
    },
  ];

  /* ═══════════════════════════════════════════════════════════
     5.  BUILD DOM
  ═══════════════════════════════════════════════════════════ */
  function buildDOM() {
    /* Background canvas */
    const cvs = document.createElement('canvas');
    cvs.id = 'avBg';
    document.body.insertBefore(cvs, document.body.firstChild);

    const main = document.createElement('div');
    main.id = 'avMain';

    /* ── Hero ── */
    const hero = document.createElement('section');
    hero.className = 'av-hero';
    hero.innerHTML = `
      <div class="av-brand-row">
        <div class="av-orn-line"></div>
        ${ornamentIcon()}
        <div class="av-orn-line r"></div>
      </div>
      <h1 class="av-title">Avicn<em>Knov</em> Web</h1>
      <p class="av-tagline">The Future of Intelligent Trading</p>
      <div class="av-live-pill">
        <span class="av-ldot"></span>
        Platform Online
      </div>
    `;
    main.appendChild(hero);

    /* ── Buttons ── */
    const btns = document.createElement('section');
    btns.className = 'av-btns';
    btns.innerHTML = `
      <a href="trading.html" class="av-btn-card" id="avBtnT">
        <div class="av-btn-glass"></div>
        <div class="av-btn-inner">
          <div class="av-btn-head">
            <div class="av-btn-ico-box">${ICON_TRADING}</div>
            <div>
              <div class="av-btn-name">Trading</div>
              <div class="av-btn-sub">Live Exchange Platform</div>
            </div>
          </div>
          <p class="av-btn-desc">
            <b>Step into your first trade.</b> The AvicnKnov Trading terminal is a direct
            gateway to our live exchange — execute market and limit orders, monitor
            real-time depth charts, and manage all your positions within one seamless
            interface. A single click places you live on our infrastructure.
          </p>
          <div class="av-btn-cta">
            <div class="av-cta-line"></div>
            Enter Exchange
          </div>
        </div>
      </a>
      <a href="futures.html" class="av-btn-card" id="avBtnF">
        <div class="av-btn-glass"></div>
        <div class="av-btn-inner">
          <div class="av-btn-head">
            <div class="av-btn-ico-box">${ICON_FUTURES}</div>
            <div>
              <div class="av-btn-name">Futures</div>
              <div class="av-btn-sub">Upcoming Features</div>
            </div>
          </div>
          <p class="av-btn-desc">
            <b>The horizon expands.</b> Explore the full AvicnKnov roadmap — from
            AI-powered analytics and live mentorship to decentralized exchange
            integration. Every upcoming feature is documented in detail so you can
            track what is coming and be first when it goes live.
          </p>
          <div class="av-btn-cta">
            <div class="av-cta-line"></div>
            Explore Roadmap
          </div>
        </div>
      </a>
    `;
    main.appendChild(btns);

    /* ── Map intro ── */
    const intro = document.createElement('div');
    intro.className = 'av-map-intro';
    intro.innerHTML = `
      <p class="av-map-intro-label">The Road Ahead</p>
      <h2 class="av-map-intro-heading">Upcoming <em>Milestones</em></h2>
    `;
    main.appendChild(intro);

    /* ── Treasure map ── */
    const map = document.createElement('section');
    map.className = 'av-map';

    /* Track */
    const track = document.createElement('div');
    track.className = 'av-track';
    track.innerHTML = `
      <div class="av-track-bg"></div>
      <div class="av-track-fill" id="avTFill"></div>
      ${Array.from({length:7},(_,i)=>`<div class="av-track-ptcl" style="--d:${2.4+i*.42}s;--dl:${i*.55}s"></div>`).join('')}
    `;
    map.appendChild(track);

    /* Nodes */
    const nodesWrap = document.createElement('div');
    nodesWrap.className = 'av-nodes';
    NODES.forEach((n, i) => {
      const row = document.createElement('div');
      row.className = `av-node ${n.side === 'left' ? 'av-left' : 'av-right'}`;
      row.dataset.id = n.id;
      row.style.transitionDelay = (i * 55) + 'ms';
      row.innerHTML = `
        <div class="av-ndot">
          <div class="av-ndot-core"></div>
          <div class="av-ndot-ring"></div>
        </div>
        <div class="av-ncard" data-id="${n.id}">
          <div class="av-ncard-glass"></div>
          <div class="av-ncard-inner">
            <div class="av-ncard-top">
              <div class="av-ncard-ico">${nodeIcon(n.icon)}</div>
              <div class="av-ncard-meta">
                <div class="av-ncard-title">${n.title}</div>
                <span class="av-ncard-badge">${n.badge}</span>
              </div>
            </div>
            <p class="av-ncard-desc">${n.desc.substring(0, 185).trim()}...</p>
            <div class="av-ncard-feats">
              ${n.features.slice(0, 3).map(f => `<div class="av-ncard-feat">${f}</div>`).join('')}
            </div>
            <div class="av-ncard-foot">
              <div class="av-ncard-sdot"></div>
              ${n.status}
            </div>
          </div>
          <span class="av-ncard-hint">Tap to expand</span>
        </div>
      `;
      nodesWrap.appendChild(row);
    });
    map.appendChild(nodesWrap);
    main.appendChild(map);
    document.body.appendChild(main);

    /* ── Modal ── */
    const ov = document.createElement('div');
    ov.className = 'av-modal-ov';
    ov.id = 'avMOv';
    ov.innerHTML = `
      <div class="av-modal" id="avModal">
        <div class="av-modal-glass"></div>
        <button class="av-modal-close" id="avMClose">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="2" y1="2" x2="12" y2="12" stroke="rgba(255,255,255,.65)" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="12" y1="2" x2="2" y2="12" stroke="rgba(255,255,255,.65)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="av-modal-scroll" id="avMScroll">
          <div class="av-modal-icon" id="avMIcon"></div>
          <span class="av-modal-badge" id="avMBadge"></span>
          <h2 class="av-modal-title" id="avMTitle"></h2>
          <p class="av-modal-desc" id="avMDesc"></p>
          <p class="av-modal-feats-label">Key Features</p>
          <div class="av-modal-feats" id="avMFeats"></div>
        </div>
      </div>
    `;
    document.body.appendChild(ov);
  }

  /* ═══════════════════════════════════════════════════════════
     6.  BACKGROUND CANVAS  (flowing river particles)
  ═══════════════════════════════════════════════════════════ */
  function initCanvas() {
    const cvs = document.getElementById('avBg');
    const ctx = cvs.getContext('2d');
    let W, H, pts;

    function resize() {
      W = cvs.width  = window.innerWidth;
      H = cvs.height = window.innerHeight;
    }

    function makePts() {
      pts = Array.from({length: 130}, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - .5) * .28,
        vy: Math.random() * .45 + .12,
        r:  Math.random() * 1.4 + .15,
        o:  Math.random() * .22 + .04,
        ph: Math.random() * Math.PI * 2,
        ps: Math.random() * .012 + .005,
        pa: Math.random() * 18 + 6,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.ph += p.ps;
        p.x  += p.vx + Math.sin(p.ph) * .12;
        p.y  += p.vy;
        if (p.y > H + 8) { p.y = -8; p.x = Math.random() * W; }
        if (p.x < -8)    p.x = W + 8;
        if (p.x > W + 8) p.x = -8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });
      /* Connection lines */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = dx*dx + dy*dy;
          if (d < 6400) { /* 80^2 */
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${.038 * (1 - d/6400)})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); makePts(); }, {passive:true});
    resize(); makePts(); draw();
  }

  /* ═══════════════════════════════════════════════════════════
     7.  SCROLL ANIMATIONS
  ═══════════════════════════════════════════════════════════ */
  function initScroll() {
    const rows = document.querySelectorAll('.av-node');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('av-vis');
      });
    }, { threshold: .12, rootMargin: '0px 0px -50px 0px' });
    rows.forEach(r => io.observe(r));

    function trackFill() {
      const mapEl = document.querySelector('.av-map');
      const fill  = document.getElementById('avTFill');
      if (!mapEl || !fill) return;
      const top = mapEl.getBoundingClientRect().top + window.scrollY;
      const h   = mapEl.offsetHeight;
      const pct = Math.min(100, Math.max(0,
        ((window.scrollY + window.innerHeight - top) / h) * 100
      ));
      fill.style.height = pct + '%';
    }
    window.addEventListener('scroll', trackFill, {passive:true});
    trackFill();
  }

  /* ═══════════════════════════════════════════════════════════
     8.  MODAL
  ═══════════════════════════════════════════════════════════ */
  let _activeModal = null;

  function openModal(id) {
    const n = NODES.find(x => x.id === id);
    if (!n) return;
    document.getElementById('avMIcon').innerHTML  = nodeIcon(n.icon);
    document.getElementById('avMBadge').textContent = n.badge + ' · ' + n.status;
    document.getElementById('avMTitle').textContent = n.title;
    document.getElementById('avMDesc').textContent  = n.desc;
    document.getElementById('avMFeats').innerHTML   = n.features.map((f,i) =>
      `<div class="av-modal-feat">
        <span class="av-modal-feat-n">${String(i+1).padStart(2,'0')}</span>
        <span>${f}</span>
      </div>`
    ).join('');
    document.getElementById('avMScroll').scrollTop = 0;
    document.getElementById('avMOv').classList.add('av-open');
    document.body.style.overflow = 'hidden';
    _activeModal = id;
  }

  function closeModal() {
    document.getElementById('avMOv').classList.remove('av-open');
    document.body.style.overflow = '';
    _activeModal = null;
  }

  /* ═══════════════════════════════════════════════════════════
     9.  RIPPLE
  ═══════════════════════════════════════════════════════════ */
  function ripple(el, e) {
    const r   = el.getBoundingClientRect();
    const div = document.createElement('div');
    const sz  = Math.max(r.width, r.height);
    div.className = 'av-ripple';
    div.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-r.left-sz/2}px;top:${e.clientY-r.top-sz/2}px`;
    el.appendChild(div);
    div.addEventListener('animationend', () => div.remove());
  }

  /* ═══════════════════════════════════════════════════════════
     10.  EVENT LISTENERS
  ═══════════════════════════════════════════════════════════ */
  function initEvents() {
    /* Button ripple */
    document.querySelectorAll('.av-btn-card').forEach(btn => {
      btn.addEventListener('click', function(e) { ripple(this, e); });
    });

    /* Node card click → modal */
    document.querySelectorAll('.av-ncard').forEach(card => {
      card.addEventListener('click', function(e) {
        ripple(this, e);
        const id = this.dataset.id;
        setTimeout(() => openModal(id), 140);
      });
    });

    /* Modal close */
    document.getElementById('avMClose').addEventListener('click', closeModal);
    document.getElementById('avMOv').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });

    /* Keyboard */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && _activeModal) closeModal();
    });
  }

  /* ═══════════════════════════════════════════════════════════
     11.  BOOT
  ═══════════════════════════════════════════════════════════ */
  function boot() {
    buildDOM();
    initCanvas();
    initScroll();
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

// more.js - Created for AvicnKnov Web
(function() {
    const container = document.getElementById('more-page-container');
    if (!container) return;

    // 1. Injecting Premium CSS
    const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

    :root {
        --bg: #000000;
        --glass: rgba(255, 255, 255, 0.03);
        --glass-border: rgba(255, 255, 255, 0.1);
        --accent: #ffffff;
    }

    #more-page-container {
        font-family: 'Plus Jakarta Sans', sans-serif;
        background: var(--bg);
        color: #fff;
        min-height: 100vh;
        overflow-x: hidden;
        position: relative;
        padding: 40px 20px;
    }

    /* Treasure Map / River Animation */
    .river-bg {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        z-index: 0;
        opacity: 0.15;
        pointer-events: none;
    }

    .river-path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: flow 20s linear infinite;
    }

    @keyframes flow {
        to { stroke-dashoffset: 0; }
    }

    /* Content Wrapper */
    .content-wrapper {
        position: relative;
        z-index: 2;
        max-width: 800px;
        margin: 0 auto;
    }

    .brand-header {
        text-align: center;
        margin-bottom: 60px;
    }

    .brand-header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: -1px;
        text-transform: uppercase;
    }

    /* Premium Glass Cards */
    .premium-card {
        background: var(--glass);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        padding: 30px;
        margin-bottom: 25px;
        transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        text-decoration: none;
        color: white;
        display: block;
        position: relative;
        overflow: hidden;
    }

    .premium-card:hover {
        transform: translateY(-10px) scale(1.02);
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        background: rgba(255, 255, 255, 0.07);
    }

    .card-content {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .icon-box {
        width: 60px;
        height: 60px;
        background: #fff;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 20px rgba(255,255,255,0.1);
    }

    .icon-box svg {
        width: 30px;
        height: 30px;
        stroke: #000;
    }

    .text-box h2 {
        font-size: 1.4rem;
        margin-bottom: 5px;
        font-weight: 700;
    }

    .text-box p {
        font-size: 0.9rem;
        color: #aaa;
        line-height: 1.4;
    }

    /* Live Indicator */
    .live-tag {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1px;
        color: #fff;
    }

    .pulse-dot {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px #fff;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
    }

    /* Decorative Chart Section */
    .chart-section {
        margin-top: 50px;
        padding: 30px;
        background: rgba(255,255,255,0.02);
        border-radius: 24px;
        border: 1px dashed rgba(255,255,255,0.1);
    }

    .chart-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .chart-visual {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: flex-end;
        gap: 8px;
    }

    .bar {
        flex: 1;
        background: linear-gradient(to top, #333, #fff);
        border-radius: 4px 4px 0 0;
        animation: barGrow 2s ease-out forwards;
        transform-origin: bottom;
    }

    @keyframes barGrow {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Generating HTML Content
    container.innerHTML = `
        <div class="river-bg">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path class="river-path" d="M0,200 Q250,100 500,200 T1000,200 T1500,200" fill="none" stroke="white" stroke-width="0.5" />
                <path class="river-path" d="M-100,500 Q200,400 450,500 T900,500" fill="none" stroke="white" stroke-width="0.3" style="animation-delay: -5s" />
                <path class="river-path" d="M50,800 Q300,700 600,800 T1100,800" fill="none" stroke="white" stroke-width="0.7" style="animation-delay: -10s" />
            </svg>
        </div>

        <div class="content-wrapper">
            <header class="brand-header">
                <h1>AvicnKnov Web</h1>
                <p style="color: #666; font-size: 0.8rem; margin-top: 10px;">PREMIUM ECOSYSTEM</p>
            </header>

            <!-- Trading Card -->
            <a href="trading.html" class="premium-card">
                <div class="live-tag">
                    <div class="pulse-dot"></div> LIVE MARKET
                </div>
                <div class="card-content">
                    <div class="icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    </div>
                    <div class="text-box">
                        <h2>Trading System</h2>
                        <p>Experience ultra-fast execution. Click to enter our professional exchange and start practicing with real-time assets.</p>
                    </div>
                </div>
            </a>

            <!-- Futures Card -->
            <a href="future.html" class="premium-card">
                <div class="card-content">
                    <div class="icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    </div>
                    <div class="text-box">
                        <h2>Future Plans</h2>
                        <p>Explore the roadmap of AvicnKnov Web. We are building the next generation of digital trading tools and automation.</p>
                    </div>
                </div>
            </a>

            <!-- Analysis Section -->
            <div class="chart-section">
                <div class="chart-header">
                    <span style="font-weight: 700; font-size: 0.9rem;">Market Overview</span>
                    <span style="color: #666; font-size: 0.7rem;">UPDATING LIVE...</span>
                </div>
                <div class="chart-visual" id="chartVisual"></div>
                <p style="margin-top: 20px; font-size: 0.8rem; color: #888; text-align: center;">
                    Our website features advanced algorithms and specialized options designed for precision and high performance.
                </p>
            </div>
        </div>
    `;

    // 3. Dynamic Chart Bars
    const chartVisual = document.getElementById('chartVisual');
    for(let i=0; i<15; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        const randomHeight = Math.floor(Math.random() * 80) + 20;
        bar.style.height = randomHeight + '%';
        bar.style.animationDelay = (i * 0.1) + 's';
        chartVisual.appendChild(bar);
    }
})();

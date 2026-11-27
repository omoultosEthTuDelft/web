/* Hero background: a small 2-D "molecular dynamics" toy.
   Particles drift with thermal noise, repel softly at short range, and
   draw bonds to close neighbours. Pauses when off-screen; static frame
   when the user prefers reduced motion. */
(function () {
  var canvas = document.querySelector('.hero-canvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, parts = [], running = true, mouse = { x: -1e4, y: -1e4 };
  var BOND = 110, R_REP = 26;

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(110, Math.max(35, (W * H) / 11000)));
    while (parts.length < n) parts.push(spawn());
    parts.length = n;
  }

  function spawn() {
    var big = Math.random() < 0.18;               // a few "heavy atoms"
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: big ? 2.6 + Math.random() * 1.4 : 1.2 + Math.random() * 1.0,
      hot: Math.random() < 0.12                     // accent-coloured species
    };
  }

  function step() {
    var i, j, a, b, dx, dy, d2, d, f;
    for (i = 0; i < parts.length; i++) {
      a = parts[i];
      for (j = i + 1; j < parts.length; j++) {
        b = parts[j];
        dx = a.x - b.x; dy = a.y - b.y; d2 = dx * dx + dy * dy;
        if (d2 < R_REP * R_REP && d2 > 0.01) {
          d = Math.sqrt(d2); f = (R_REP - d) / R_REP * 0.03;
          dx /= d; dy /= d;
          a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
        }
      }
      // pointer pushes particles away gently
      dx = a.x - mouse.x; dy = a.y - mouse.y; d2 = dx * dx + dy * dy;
      if (d2 < 120 * 120) { d = Math.sqrt(d2) || 1; a.vx += dx / d * 0.08; a.vy += dy / d * 0.08; }
      // thermostat-ish: noise + damping
      a.vx = a.vx * 0.985 + (Math.random() - 0.5) * 0.04;
      a.vy = a.vy * 0.985 + (Math.random() - 0.5) * 0.04;
      a.x += a.vx; a.y += a.vy;
      // periodic boundary conditions, naturally
      if (a.x < -10) a.x += W + 20; else if (a.x > W + 10) a.x -= W + 20;
      if (a.y < -10) a.y += H + 20; else if (a.y > H + 10) a.y -= H + 20;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, dx, dy, d2, al;
    ctx.lineWidth = 1;
    for (i = 0; i < parts.length; i++) {
      a = parts[i];
      for (j = i + 1; j < parts.length; j++) {
        b = parts[j];
        dx = a.x - b.x; dy = a.y - b.y; d2 = dx * dx + dy * dy;
        if (d2 < BOND * BOND) {
          al = (1 - Math.sqrt(d2) / BOND) * 0.35;
          ctx.strokeStyle = 'rgba(125, 211, 200,' + al.toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (i = 0; i < parts.length; i++) {
      a = parts[i];
      ctx.fillStyle = a.hot ? 'rgba(251, 146, 60, 0.9)' : 'rgba(204, 251, 241, 0.75)';
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
    }
  }

  function loop() {
    if (running) { step(); draw(); }
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  var host = canvas.parentElement;
  host.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  host.addEventListener('pointerleave', function () { mouse.x = mouse.y = -1e4; });

  if (reduce) { for (var k = 0; k < 200; k++) step(); draw(); return; }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { running = es[0].isIntersecting; }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () { running = !document.hidden; });
  loop();
})();

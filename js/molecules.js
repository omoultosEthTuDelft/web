/* Hero background: tumbling ball-and-stick molecules (H2, CO2, H2O, CH4,
   N2, NH3, PFOA and beta-cyclodextrin) in CPK colours, mixed with
   floating vulnerable code snippets, CWE tags and a few crawling bugs, drawn in 3-D with depth shading. Pauses when
   off-screen; shows a still frame when the user prefers reduced motion. */
(function () {
  var canvas = document.querySelector('.hero-canvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, mols = [], glyphs = [], tick = 0, running = true, mouse = { x: -1e4, y: -1e4 };

  // element: [base colour, display radius in Å]
  var EL = {
    H: ['#eef3f6', 0.31],
    C: ['#5d6872', 0.48],
    O: ['#e4434b', 0.46],
    N: ['#4a7fe0', 0.47],
    F: ['#8fdc5a', 0.42]
  };

  // geometries in Å; bonds as index pairs
  var t = 0.63;
  var SPECIES = [
    { w: 5, atoms: [['H', -0.37, 0, 0], ['H', 0.37, 0, 0]], bonds: [[0, 1]] },
    { w: 4, atoms: [['C', 0, 0, 0], ['O', -1.16, 0, 0], ['O', 1.16, 0, 0]], bonds: [[0, 1, 2], [0, 2, 2]] },
    { w: 4, atoms: [['O', 0, -0.12, 0], ['H', 0.757, 0.47, 0], ['H', -0.757, 0.47, 0]], bonds: [[0, 1], [0, 2]] },
    { w: 2, atoms: [['C', 0, 0, 0], ['H', t, t, t], ['H', t, -t, -t], ['H', -t, t, -t], ['H', -t, -t, t]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] },
    { w: 2, atoms: [['N', -0.55, 0, 0], ['N', 0.55, 0, 0]], bonds: [[0, 1, 2]] },
    { w: 1, atoms: [['N', 0, 0, 0.12], ['H', 0.94, 0, -0.27], ['H', -0.47, 0.81, -0.27], ['H', -0.47, -0.81, -0.27]], bonds: [[0, 1], [0, 2], [0, 3]] }
  ];
  SPECIES.push(pfoa(), cyclodextrin());
  SPECIES.forEach(centre);
  var bag = [];
  SPECIES.forEach(function (s, i) { for (var k = 0; k < s.w; k++) bag.push(i); });

  // PFOA: CF3(CF2)6COOH, planar zig-zag backbone, heavy atoms only
  function pfoa() {
    var A = [], B = [], i, sg, c, prev = -1;
    for (i = 0; i < 8; i++) {
      sg = i % 2 ? 1 : -1;
      c = A.length; A.push(['C', i * 1.27, sg * 0.42, 0]);
      if (prev >= 0) B.push([prev, c]);
      prev = c;
      if (i < 7) {                                   // two F per CF2 (three on CF3)
        A.push(['F', i * 1.27, sg * 1.05, 1.1]); B.push([c, A.length - 1]);
        A.push(['F', i * 1.27, sg * 1.05, -1.1]); B.push([c, A.length - 1]);
        if (i === 0) { A.push(['F', -1.3, -0.1, 0]); B.push([c, A.length - 1]); }
      } else {                                       // carboxylic acid head
        A.push(['O', i * 1.27 + 0.55, sg * 1.5, 0]); B.push([c, A.length - 1, 2]);
        A.push(['O', i * 1.27 + 1.25, -0.25, 0]);   B.push([c, A.length - 1]);
      }
    }
    return { w: 2, k: 0.62, atoms: A, bonds: B };
  }

  // beta-cyclodextrin: 7 glucopyranose rings on a truncated cone, joined by
  // glycosidic oxygens; hydroxyl oxygens on both rims (heavy atoms only)
  function cyclodextrin() {
    var A = [], B = [], n = 7, R = 5.4, u, k, firstC4 = [], lastC1 = [];
    function add(e, p) { A.push([e, p[0], p[1], p[2]]); return A.length - 1; }
    function comb(c, v, s) { return [c[0] + v[0] * s, c[1] + v[1] * s, c[2] + v[2] * s]; }
    function norm(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
    for (u = 0; u < n; u++) {
      var th = u * 2 * Math.PI / n,
          r = [Math.cos(th), Math.sin(th), 0], t = [-Math.sin(th), Math.cos(th), 0],
          a = norm([-0.28 * r[0], -0.28 * r[1], 1]),          // tilt: narrow (primary) rim on top
          c = [R * r[0], R * r[1], 0], ring = [];
      // ring order C1, C2, C3, C4, C5, O5 at hexagon angles 0, -60, -120, 180, 120, 60
      var ang = [0, -60, -120, 180, 120, 60], el = ['C', 'C', 'C', 'C', 'C', 'O'];
      for (k = 0; k < 6; k++) {
        var f = ang[k] * Math.PI / 180;
        ring.push(add(el[k], comb(comb(c, t, 1.45 * Math.cos(f)), a, 1.45 * Math.sin(f))));
      }
      for (k = 0; k < 6; k++) B.push([ring[k], ring[(k + 1) % 6]]);
      var P = function (i) { return A[i].slice(1); };
      var down = norm([r[0] * 0.6 - a[0] * 0.8, r[1] * 0.6 - a[1] * 0.8, -a[2] * 0.8]);
      B.push([ring[1], add('O', comb(P(ring[1]), down, 1.43))]);   // O2 (wide rim)
      B.push([ring[2], add('O', comb(P(ring[2]), down, 1.43))]);   // O3 (wide rim)
      var c6 = add('C', comb(P(ring[4]), norm([a[0] + 0.3 * r[0], a[1] + 0.3 * r[1], a[2]]), 1.5));
      B.push([ring[4], c6]);
      B.push([c6, add('O', comb(P(c6), a, 1.43))]);                 // O6 (narrow rim)
      firstC4.push(ring[3]); lastC1.push(ring[0]);
    }
    for (u = 0; u < n; u++) {                                       // glycosidic O4 bridges
      var p1 = A[lastC1[u]], p2 = A[firstC4[(u + 1) % n]];
      var mid = [(p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2, (p1[3] + p2[3]) / 2];
      var ml = Math.sqrt(mid[0] * mid[0] + mid[1] * mid[1]);
      mid[0] += mid[0] / ml * 0.5; mid[1] += mid[1] / ml * 0.5;
      var o = add('O', mid);
      B.push([lastC1[u], o], [o, firstC4[(u + 1) % n]]);
    }
    return { w: 1, k: 0.4, atoms: A, bonds: B, big: true };
  }

  function centre(sp) {
    var cx = 0, cy = 0, cz = 0, n = sp.atoms.length, i;
    for (i = 0; i < n; i++) { cx += sp.atoms[i][1]; cy += sp.atoms[i][2]; cz += sp.atoms[i][3]; }
    for (i = 0; i < n; i++) { sp.atoms[i][1] -= cx / n; sp.atoms[i][2] -= cy / n; sp.atoms[i][3] -= cz / n; }
    sp.k = sp.k || 1;
  }

  // ---- software-security flotsam ----
  var CODE = [
    'eval(user_input)', 'strcpy(buf, argv[1]);', '"SELECT * FROM t WHERE id=" + id',
    'pickle.loads(data)', 'os.system("ping " + host)', 'open("../../etc/passwd")',
    'el.innerHTML = msg;', 'free(p); free(p);', 'hashlib.md5(password)',
    'yaml.load(f)', 'requests.get(url, verify=False)', '${jndi:ldap://x/a}',
    'merge({}, req.body)', 'gets(line);', 'exec(code, globals())'
  ];
  var CWES = [
    'CWE-79 · XSS', 'CWE-89 · SQLi', 'CWE-787 · OOB write', 'CWE-416 · Use-after-free',
    'CWE-502 · Deserialization', 'CWE-22 · Path traversal', 'CWE-78 · OS cmd injection',
    'CWE-94 · Code injection', 'CWE-918 · SSRF', 'CWE-1321 · Prototype pollution',
    'CWE-327 · Weak crypto', 'CWE-120 · Buffer overflow', 'CWE-295 · Cert validation'
  ];
  var MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  function pick(a) { return a[(Math.random() * a.length) | 0]; }

  function spawnGlyph(anywhere) {
    var r = Math.random(), kind = r < 0.4 ? 'code' : r < 0.7 ? 'cwe' : 'bug', z = Math.random() * 0.85;
    return {
      kind: kind, text: kind === 'code' ? pick(CODE) : kind === 'cwe' ? pick(CWES) : '',
      x: Math.random() * W, y: anywhere ? Math.random() * H : H + 60, z: z,
      vx: (Math.random() - 0.5) * 0.2, vy: -(0.06 + Math.random() * 0.18) * (0.6 + z),
      rot: (Math.random() - 0.5) * 0.16, wr: (Math.random() - 0.5) * 0.001, t: Math.random() * 100
    };
  }

  function stepGlyphs() {
    for (var i = 0; i < glyphs.length; i++) {
      var g = glyphs[i];
      var dx = g.x - mouse.x, dy = g.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 140 * 140) { var d = Math.sqrt(d2) || 1, f = g.kind === 'bug' ? 0.25 : 0.05; g.vx += dx / d * f; g.vy += dy / d * f; }
      if (g.kind === 'bug') {                       // bugs wander and crawl
        g.vx += (Math.random() - 0.5) * 0.06;
        g.vx *= 0.96; g.vy = g.vy * 0.96 - 0.012;
      } else {
        g.vx *= 0.99; g.vy = g.vy * 0.99 - 0.002 * (0.6 + g.z);
        g.rot += g.wr; if (Math.abs(g.rot) > 0.12) g.wr = -g.wr;
      }
      g.x += g.vx; g.y += g.vy; g.t++;
      if (g.y < -60 || g.x < -220 || g.x > W + 220) glyphs[i] = spawnGlyph(false);
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function drawGlyph(g, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(g.x, g.y);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (g.kind === 'code') {
      var fs = 11 + g.z * 6, w;
      ctx.rotate(g.rot);
      ctx.font = fs + 'px ' + MONO;
      ctx.fillStyle = 'rgba(178, 230, 222, 0.95)';
      ctx.fillText(g.text, 0, 0);
      w = ctx.measureText(g.text).width;
      // red linter squiggle under the offending line
      ctx.strokeStyle = 'rgba(255, 99, 88, 0.95)'; ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (var x = -w / 2, k = 0; x <= w / 2; x += 2, k++) ctx.lineTo(x, fs * 0.8 + (k % 2 ? 1.6 : -0.4));
      ctx.stroke();
    } else if (g.kind === 'cwe') {
      var f2 = 10 + g.z * 5, pw, ph = f2 + 10;
      ctx.rotate(g.rot);
      ctx.font = '600 ' + f2 + 'px ' + MONO;
      pw = ctx.measureText(g.text).width + 18;
      roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2);
      ctx.fillStyle = 'rgba(240, 138, 60, 0.14)'; ctx.fill();
      ctx.strokeStyle = 'rgba(240, 138, 60, 0.85)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#ffb27a';
      ctx.fillText(g.text, 0, 0.5);
    } else {
      var sz = 7 + g.z * 9, wig = Math.sin(g.t * 0.35) * 0.35, side, j;
      ctx.rotate(Math.atan2(g.vy, g.vx) + Math.PI / 2);
      ctx.strokeStyle = 'rgba(255, 140, 90, 0.9)'; ctx.lineWidth = Math.max(1, sz * 0.12); ctx.lineCap = 'round';
      for (side = -1; side <= 1; side += 2) {      // six legs
        for (j = -1; j <= 1; j++) {
          var a = side * (Math.PI / 2 + j * 0.55 + (j === 0 ? wig : -wig) * side);
          ctx.beginPath(); ctx.moveTo(side * sz * 0.3, j * sz * 0.35);
          ctx.lineTo(side * sz * 0.3 + Math.sin(a) * sz * 0.75 * side * side, j * sz * 0.35 - Math.cos(a) * sz * 0.75);
          ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(side * sz * 0.12, -sz * 0.85);   // antennae
        ctx.lineTo(side * sz * 0.45, -sz * 1.35); ctx.stroke();
      }
      ctx.fillStyle = '#e8573a';
      ctx.beginPath(); ctx.ellipse(0, sz * 0.1, sz * 0.42, sz * 0.62, 0, 0, 6.2832); ctx.fill();
      ctx.fillStyle = '#7a2414';
      ctx.beginPath(); ctx.arc(0, -sz * 0.68, sz * 0.26, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = 'rgba(122, 36, 20, 0.8)'; ctx.lineWidth = Math.max(0.8, sz * 0.07);
      ctx.beginPath(); ctx.moveTo(0, -sz * 0.45); ctx.lineTo(0, sz * 0.7); ctx.stroke();   // wing split
    }
    ctx.restore();
  }

  // text glyphs nearly vanish while passing behind the hero text block
  var textBox = null;
  function measureText() {
    var el = document.querySelector('.hero-text');
    if (!el) return;
    var a = el.getBoundingClientRect(), c = canvas.getBoundingClientRect();
    textBox = { l: a.left - c.left - 30, r: a.right - c.left + 30, t: a.top - c.top - 20, b: a.bottom - c.top + 20 };
  }
  function textFade(g) {
    if (!textBox || g.kind === 'bug') return 1;
    var dx = Math.max(textBox.l - g.x, 0, g.x - textBox.r), dy = Math.max(textBox.t - g.y, 0, g.y - textBox.b);
    return Math.min(1, 0.08 + Math.max(dx, dy) / 90);
  }

  function fade(o) {   // dim things behind the text column so it stays readable
    var fx = Math.min(1, Math.max(0, (o.x / W - 0.3) / 0.4));
    return (0.35 + 0.6 * o.z) * (0.3 + 0.7 * fx);
  }

  // pre-rendered shaded spheres, one per element
  var SPR = 64, sprites = {};
  Object.keys(EL).forEach(function (e) {
    var c = document.createElement('canvas'); c.width = c.height = SPR;
    var g = c.getContext('2d'), r = SPR / 2;
    var grad = g.createRadialGradient(r * 0.7, r * 0.65, r * 0.08, r, r, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, EL[e][0]);
    grad.addColorStop(1, shade(EL[e][0], 0.35));
    g.fillStyle = grad; g.beginPath(); g.arc(r, r, r - 0.5, 0, 6.2832); g.fill();
    sprites[e] = c;
  });
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgb(' + Math.round((n >> 16) * f) + ',' + Math.round(((n >> 8) & 255) * f) + ',' + Math.round((n & 255) * f) + ')';
  }

  function spawn(anywhere) {
    var sp = SPECIES[bag[(Math.random() * bag.length) | 0]];
    var z = Math.random() * (sp.k < 1 ? 0.7 : 1);   // 0 = far, 1 = near; big molecules stay back
    return {
      sp: sp,
      x: Math.random() * W, y: anywhere ? Math.random() * H : H + 140,
      z: z,
      scale: 16 + z * 30,                     // px per Å
      vx: (Math.random() - 0.5) * 0.25, vy: -(0.08 + Math.random() * 0.22) * (0.6 + z),
      ax: Math.random() * 6.28, ay: Math.random() * 6.28, az: Math.random() * 6.28,
      wx: (Math.random() - 0.5) * 0.012, wy: (Math.random() - 0.5) * 0.014, wz: (Math.random() - 0.5) * 0.008
    };
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(32, Math.max(10, (W * H) / 24000)));
    while (mols.length < n) mols.push(spawn(true));
    mols.length = n;
    var ng = Math.round(n * 0.3);
    measureText();
    while (glyphs.length < ng) glyphs.push(spawnGlyph(true));
    glyphs.length = ng;
  }

  function step() {
    for (var i = 0; i < mols.length; i++) {
      var m = mols[i];
      var dx = m.x - mouse.x, dy = m.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 140 * 140) { var d = Math.sqrt(d2) || 1; m.vx += dx / d * 0.05; m.vy += dy / d * 0.05; m.wy += 0.0008; }
      m.vx *= 0.99; m.vy = m.vy * 0.99 - 0.002 * (0.6 + m.z);
      m.x += m.vx; m.y += m.vy;
      m.ax += m.wx; m.ay += m.wy; m.az += m.wz;
      if (m.y < -160 || m.x < -160 || m.x > W + 160) { mols[i] = spawn(false); mols[i].y = H + 140; }
    }
  }

  function project(m) {
    var cx = Math.cos(m.ax), sx = Math.sin(m.ax), cy = Math.cos(m.ay), sy = Math.sin(m.ay),
        cz = Math.cos(m.az), sz = Math.sin(m.az), out = [], sc = m.scale * m.sp.k;
    for (var k = 0; k < m.sp.atoms.length; k++) {
      var a = m.sp.atoms[k], x = a[1], y = a[2], z = a[3], t1;
      t1 = y * cx - z * sx; z = y * sx + z * cx; y = t1;     // rotate X
      t1 = x * cy + z * sy; z = -x * sy + z * cy; x = t1;    // rotate Y
      t1 = x * cz - y * sz; y = x * sz + y * cz; x = t1;     // rotate Z
      out.push({ e: a[0], x: m.x + x * sc, y: m.y + y * sc, z: z, r: EL[a[0]][1] * sc });
    }
    return out;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var all = mols.concat(glyphs);
    all.sort(function (a, b) { return a.z - b.z; });      // far first
    for (var i = 0; i < all.length; i++) {
      var m = all[i];
      if (m.kind) { drawGlyph(m, fade(m) * textFade(m)); continue; }
      var at = project(m);
      ctx.globalAlpha = fade(m);
      // bonds
      ctx.lineCap = 'round';
      for (var b = 0; b < m.sp.bonds.length; b++) {
        var p = at[m.sp.bonds[b][0]], q = at[m.sp.bonds[b][1]];
        ctx.strokeStyle = 'rgba(190, 205, 215, 0.85)';
        var es = m.scale * m.sp.k;
        if (m.sp.bonds[b][2] === 2) {
          var nx = -(q.y - p.y), ny = q.x - p.x, nl = Math.sqrt(nx * nx + ny * ny) || 1, o = es * 0.09;
          nx = nx / nl * o; ny = ny / nl * o;
          ctx.lineWidth = Math.max(1, es * 0.08);
          line(p.x + nx, p.y + ny, q.x + nx, q.y + ny); line(p.x - nx, p.y - ny, q.x - nx, q.y - ny);
        } else {
          ctx.lineWidth = Math.max(1.2, es * 0.13);
          line(p.x, p.y, q.x, q.y);
        }
      }
      // atoms, back to front
      at.sort(function (a, b) { return a.z - b.z; });
      for (var k = 0; k < at.length; k++) {
        var A = at[k];
        ctx.drawImage(sprites[A.e], A.x - A.r, A.y - A.r, A.r * 2, A.r * 2);
      }
    }
    ctx.globalAlpha = 1;
  }
  function line(x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }

  function loop() {
    if (running) { step(); stepGlyphs(); draw(); }
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  var host = canvas.parentElement;
  host.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  host.addEventListener('pointerleave', function () { mouse.x = mouse.y = -1e4; });

  if (reduce) { draw(); return; }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { running = es[0].isIntersecting; }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () { running = !document.hidden; });
  loop();
})();

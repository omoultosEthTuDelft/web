/* Research areas page: draws the areas as a "molecule" — one shaded sphere per
   area (size = number of papers), bonds between areas that share papers (width
   = number of shared papers) — and lists the papers for whatever is clicked.
   All data comes from publications/index.md (`topics`) and
   _data/research_areas.yml, embedded in the page by Jekyll. */
(function () {
  var dataEl = document.getElementById('areas-data');
  if (!dataEl) return;
  var DATA = JSON.parse(dataEl.textContent);
  var svg = document.getElementById('areas-svg');
  var stage = document.getElementById('areas-stage');
  var tip = document.getElementById('areas-tip');
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- data ----------
  var areas = DATA.areas.map(function (a) {
    return { key: a.key, title: a.title, scope: a.scope, color: a.color, image: a.image, papers: [] };
  });
  var byKey = {};
  areas.forEach(function (a) { byKey[a.key] = a; });
  var papers = DATA.papers.map(function (p) {
    return {
      n: parseInt(p.number, 10), title: p.title, authors: p.authors, venue: p.venue,
      pdf: p.pdf, topics: (p.topics || []).filter(function (t) { return byKey[t]; })
    };
  }).sort(function (a, b) { return b.n - a.n; });
  papers.forEach(function (p) { p.topics.forEach(function (t) { byKey[t].papers.push(p); }); });
  areas = areas.filter(function (a) { return a.papers.length; });

  var bonds = [];
  for (var i = 0; i < areas.length; i++) {
    for (var j = i + 1; j < areas.length; j++) {
      var A = areas[i], B = areas[j];
      var shared = A.papers.filter(function (p) { return p.topics.indexOf(B.key) >= 0; });
      if (shared.length) bonds.push({ a: A, b: B, papers: shared, w: shared.length });
    }
  }

  // ---------- layout: small force simulation, run once ----------
  var W, H, FONT;
  function layout() {
    var narrow = stage.clientWidth < 640;
    W = narrow ? 600 : 1000; H = narrow ? 860 : 600; FONT = narrow ? 24 : 16;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    areas.forEach(function (a, k) {
      a.r = (narrow ? 28 : 20) + (narrow ? 7.5 : 6.2) * Math.sqrt(a.papers.length);
      var t = k / areas.length * Math.PI * 2;
      a.x = W / 2 + Math.cos(t) * W * 0.35; a.y = H / 2 + Math.sin(t) * H * 0.3;
      a.vx = a.vy = 0;
    });
    for (var it = 0; it < 1400; it++) {
      var cool = 1 - it / 1400;
      areas.forEach(function (a) {
        areas.forEach(function (b) {
          if (a === b) return;
          var dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          var min = a.r + b.r + FONT * 6.5;              // room for the labels under each sphere
          var f = 60000 / (d * d) + (d < min ? (min - d) * 0.8 : 0);
          a.vx += dx / d * f * 0.05; a.vy += dy / d * f * 0.05;
        });
        // pull harder vertically than horizontally so the molecule fits the stage's shape
        a.vx += (W / 2 - a.x) * (narrow ? 0.008 : 0.0035); a.vy += (H / 2 - a.y) * (narrow ? 0.0035 : 0.009);
      });
      // keep labels at a similar height from overlapping each other
      areas.forEach(function (a) {
        areas.forEach(function (b) {
          if (a === b) return;
          var la = Math.min(a.title.length, 18) * FONT * 0.3, lb = Math.min(b.title.length, 18) * FONT * 0.3;
          var dx = b.x - a.x, dy = (b.y + b.r) - (a.y + a.r);
          var needX = la + lb + FONT, needY = FONT * 2.8;
          if (Math.abs(dx) < needX && Math.abs(dy) < needY) {
            var ox = needX - Math.abs(dx), oy = needY - Math.abs(dy);
            if (ox < oy * 1.5) { var sx = dx >= 0 ? 1 : -1; b.vx += sx * ox * 0.08; a.vx -= sx * ox * 0.08; }
            else { var sy = dy >= 0 ? 1 : -1; b.vy += sy * oy * 0.08; a.vy -= sy * oy * 0.08; }
          }
        });
      });
      // keep spheres off each other's labels (label block sits just under its sphere)
      areas.forEach(function (a) {
        var lw = Math.min(a.title.length, 18) * FONT * 0.32 + 12;      // half label width, roughly
        var ly = a.y + a.r + FONT * 1.6;
        areas.forEach(function (b) {
          if (a === b) return;
          var dx = b.x - a.x, dy = b.y - ly;
          var nx = Math.max(Math.abs(dx) - lw, 0), ny = Math.max(Math.abs(dy) - FONT * 1.4, 0);
          var gap = Math.sqrt(nx * nx + ny * ny);
          if (gap < b.r + 10) {
            var push = (b.r + 10 - gap) * 0.25, len = Math.sqrt(dx * dx + dy * dy) || 1;
            b.vx += dx / len * push; b.vy += dy / len * push;
            a.vx -= dx / len * push * 0.4; a.vy -= dy / len * push * 0.4;
          }
        });
      });
      bonds.forEach(function (bd) {
        var a = bd.a, b = bd.b, dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        var rest = a.r + b.r + Math.max(90, 190 - bd.w * 8);
        var f = (d - rest) * 0.02 * (1 + bd.w / 4);
        a.vx += dx / d * f; a.vy += dy / d * f; b.vx -= dx / d * f; b.vy -= dy / d * f;
      });
      areas.forEach(function (a) {
        a.vx *= 0.8; a.vy *= 0.8;
        a.x += a.vx * cool; a.y += a.vy * cool;
      });
    }
    // Zoom the view box to the molecule (spheres + labels) instead of moving the
    // spheres, so text, spheres and spacing all scale together and never collide.
    var pad = FONT * 1.5, labelH = FONT * 3.2;
    function halfW(a) { return Math.max(a.r, Math.min(a.title.length, 18) * FONT * 0.3); }
    var x0 = Math.min.apply(0, areas.map(function (a) { return a.x - halfW(a); })) - pad,
        x1 = Math.max.apply(0, areas.map(function (a) { return a.x + halfW(a); })) + pad,
        y0 = Math.min.apply(0, areas.map(function (a) { return a.y - a.r; })) - pad,
        y1 = Math.max.apply(0, areas.map(function (a) { return a.y + a.r + labelH; })) + pad;
    // widen or heighten the box to the stage's target shape so the panel keeps its proportions
    var bw = x1 - x0, bh = y1 - y0, target = W / H;
    if (bw / bh < target) { var ex = (bh * target - bw) / 2; x0 -= ex; bw = bh * target; }
    else { var ey = (bw / target - bh) / 2; y0 -= ey; bh = bw / target; }
    svg.setAttribute('viewBox', x0.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + bw.toFixed(1) + ' ' + bh.toFixed(1));
    areas.forEach(function (a) { a.phase = Math.random() * 6.28; });
  }

  // ---------- drawing ----------
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.round(f > 1 ? v + (255 - v) * (f - 1) : v * f); }
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  }
  function isLight(hex) {
    var n = parseInt(hex.slice(1), 16);
    return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) > 150;
  }
  function wrap(text, max) {
    if (text.length <= max) return [text];
    var words = text.split(' '), lines = [''];
    words.forEach(function (w) {
      var cur = lines[lines.length - 1];
      if (cur && (cur + ' ' + w).length > max) lines.push(w); else lines[lines.length - 1] = cur ? cur + ' ' + w : w;
    });
    return lines;
  }

  var gBonds, gAtoms;
  function draw() {
    while (svg.lastChild && svg.lastChild.nodeName !== 'title') svg.removeChild(svg.lastChild);
    var defs = el('defs', {}, svg);
    areas.forEach(function (a) {
      var g = el('radialGradient', { id: 'ag-' + a.key, cx: '36%', cy: '32%', r: '72%' }, defs);
      el('stop', { offset: '0', 'stop-color': shade(a.color, 1.75) }, g);
      el('stop', { offset: '.42', 'stop-color': a.color }, g);
      el('stop', { offset: '1', 'stop-color': shade(a.color, 0.38) }, g);
      var cp = el('clipPath', { id: 'ac-' + a.key }, defs);
      el('circle', { r: a.r }, cp);
    });
    // glassy highlight + darker rim laid over each picture so it reads as a sphere
    var sh = el('radialGradient', { id: 'ar-shine', cx: '34%', cy: '28%', r: '75%' }, defs);
    el('stop', { offset: '0', 'stop-color': '#ffffff', 'stop-opacity': '.38' }, sh);
    el('stop', { offset: '.35', 'stop-color': '#ffffff', 'stop-opacity': '0' }, sh);
    el('stop', { offset: '.78', 'stop-color': '#0b1a2a', 'stop-opacity': '.12' }, sh);
    el('stop', { offset: '1', 'stop-color': '#0b1a2a', 'stop-opacity': '.6' }, sh);
    gBonds = el('g', { class: 'ar-bonds' }, svg);
    gAtoms = el('g', { class: 'ar-atoms' }, svg);

    bonds.forEach(function (bd) {
      var g = el('g', { class: 'ar-bond', tabindex: '0', role: 'button',
        'aria-label': bd.a.title + ' and ' + bd.b.title + ': ' + bd.w + ' shared papers' }, gBonds);
      bd.line = el('line', { class: 'ar-bond-line', 'stroke-width': 2 + bd.w * 1.15 }, g);
      bd.hit = el('line', { class: 'ar-bond-hit', 'stroke-width': Math.max(18, 6 + bd.w * 1.6) }, g);
      bd.g = g;
      on(g, function () { return { type: 'pair', bond: bd }; });
    });

    areas.forEach(function (a) {
      var g = el('g', { class: 'ar-atom', tabindex: '0', role: 'button',
        'aria-label': a.title + ': ' + a.papers.length + ' papers' }, gAtoms);
      el('circle', { class: 'ar-halo', r: a.r + 7 }, g);
      el('circle', { class: 'ar-sphere', r: a.r, fill: 'url(#ag-' + a.key + ')' }, g);   // colour fallback + shadow
      if (a.image) {
        el('image', { href: DATA.base + '/' + a.image, x: -a.r, y: -a.r, width: 2 * a.r, height: 2 * a.r,
          preserveAspectRatio: 'xMidYMid slice', 'clip-path': 'url(#ac-' + a.key + ')' }, g);
        el('circle', { r: a.r, fill: 'url(#ar-shine)', 'pointer-events': 'none' }, g);
      }
      el('circle', { class: 'ar-ring', r: a.r - 1.5, stroke: a.color }, g);
      // paper count in a small badge on the sphere's lower right, in the area colour
      var br = Math.max(FONT * 0.95, a.r * 0.3), bx = a.r * 0.72, by = a.r * 0.62;
      el('circle', { class: 'ar-badge', cx: bx, cy: by, r: br, fill: a.color }, g);
      var n = el('text', { class: 'ar-count', x: bx, y: by + br * 0.36, 'font-size': br * 1.02,
        fill: isLight(a.color) ? '#0f2235' : '#ffffff' }, g);
      n.textContent = a.papers.length;
      var lines = wrap(a.title, 18);
      var lab = el('text', { class: 'ar-label', 'font-size': FONT, y: a.r + FONT * 1.35 }, g);
      lines.forEach(function (l, k) {
        var t = el('tspan', { x: 0, dy: k ? FONT * 1.2 : 0 }, lab); t.textContent = l;
      });
      a.g = g;
      on(g, function () { return { type: 'area', area: a }; });
    });
    place(0);
  }

  function place(t) {
    areas.forEach(function (a) {
      a.cx = a.x + (reduce ? 0 : Math.sin(t * 0.0007 + a.phase) * 3.5);
      a.cy = a.y + (reduce ? 0 : Math.cos(t * 0.0006 + a.phase * 1.3) * 3.5);
      a.g.setAttribute('transform', 'translate(' + a.cx.toFixed(1) + ' ' + a.cy.toFixed(1) + ')');
    });
    bonds.forEach(function (bd) {
      [bd.line, bd.hit].forEach(function (l) {
        l.setAttribute('x1', bd.a.cx.toFixed(1)); l.setAttribute('y1', bd.a.cy.toFixed(1));
        l.setAttribute('x2', bd.b.cx.toFixed(1)); l.setAttribute('y2', bd.b.cy.toFixed(1));
      });
    });
  }

  // ---------- interaction ----------
  var selected = null, hovered = null;
  function on(g, make) {
    g.addEventListener('mouseenter', function (e) { hovered = make(); highlight(); showTip(hovered, e); });
    g.addEventListener('mousemove', function (e) { showTip(hovered, e); });
    g.addEventListener('mouseleave', function () { hovered = null; highlight(); hideTip(); });
    g.addEventListener('click', function (e) { e.stopPropagation(); select(make()); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(make()); }
    });
    g.addEventListener('focus', function () { hovered = make(); highlight(); });
    g.addEventListener('blur', function () { hovered = null; highlight(); });
  }
  svg.addEventListener('click', function () { select(null); });

  function involved(s) {
    if (!s) return null;
    if (s.type === 'area') return { areas: [s.area], bonds: bonds.filter(function (b) { return b.a === s.area || b.b === s.area; }) };
    return { areas: [s.bond.a, s.bond.b], bonds: [s.bond] };
  }
  function highlight() {
    var s = involved(hovered || selected);
    stage.classList.toggle('has-focus', !!s);
    areas.forEach(function (a) {
      var lit = s && (s.areas.indexOf(a) >= 0 || s.bonds.some(function (b) { return b.a === a || b.b === a; }));
      a.g.classList.toggle('is-lit', !!lit);
      a.g.classList.toggle('is-main', !!(s && s.areas.indexOf(a) >= 0));
      a.g.classList.toggle('is-selected', !!(selected && involved(selected).areas.indexOf(a) >= 0));
    });
    bonds.forEach(function (b) {
      b.g.classList.toggle('is-lit', !!(s && s.bonds.indexOf(b) >= 0));
      b.g.classList.toggle('is-selected', !!(selected && selected.type === 'pair' && selected.bond === b));
    });
  }
  function showTip(s, e) {
    if (!s) return;
    tip.innerHTML = s.type === 'area'
      ? '<strong>' + s.area.title + '</strong><span>' + s.area.papers.length + ' papers</span>'
      : '<strong>' + s.bond.a.title + ' + ' + s.bond.b.title + '</strong><span>' + s.bond.w + ' shared paper' + (s.bond.w > 1 ? 's' : '') + '</span>';
    var r = stage.getBoundingClientRect();
    tip.style.left = Math.min(e.clientX - r.left + 14, r.width - 230) + 'px';
    tip.style.top = (e.clientY - r.top + 14) + 'px';
    tip.classList.add('show');
  }
  function hideTip() { tip.classList.remove('show'); }

  // ---------- paper list ----------
  var listTitle = document.getElementById('areas-list-title'),
      listScope = document.getElementById('areas-list-scope'),
      listEl = document.getElementById('areas-papers'),
      resetBtn = document.getElementById('areas-reset'),
      chipsEl = document.getElementById('areas-chips');
  resetBtn.addEventListener('click', function () { select(null); });

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function select(s) {
    selected = s; highlight(); renderList();
    // shareable link: /areas/#hydrogen or /areas/#hydrogen+water
    var h = !s ? '' : s.type === 'area' ? s.area.key : s.bond.a.key + '+' + s.bond.b.key;
    if (history.replaceState) history.replaceState(null, '', h ? '#' + h : location.pathname);
    Array.prototype.forEach.call(chipsEl.children, function (c) {
      c.setAttribute('aria-pressed', s && s.type === 'area' && s.area.key === c.dataset.key ? 'true' : 'false');
    });
  }
  function renderList() {
    var list, title, scope = '';
    var section = document.getElementById('areas-list');
    section.hidden = !selected;          // papers appear only for a selection
    if (!selected) { listEl.innerHTML = ''; return; }
    if (selected.type === 'area') { list = selected.area.papers; title = selected.area.title; scope = selected.area.scope; }
    else { list = selected.bond.papers; title = selected.bond.a.title + ' + ' + selected.bond.b.title; scope = 'Papers that span both areas'; }
    listTitle.innerHTML = esc(title) + ' <span class="areas-count">' + list.length + ' paper' + (list.length === 1 ? '' : 's') + '</span>';
    listScope.textContent = scope;
    listEl.innerHTML = list.map(function (p) {
      var tags = p.topics.map(function (t) {
        var a = byKey[t];
        return '<button type="button" class="paper-tag" data-key="' + t + '"><i style="background:' + a.color + '"></i>' + esc(a.title) + '</button>';
      }).join('');
      return '<article class="paper"><div class="pub-number">' + p.n + '</div><div class="paper-body">' +
        '<div class="pub-title">' + p.title + '</div>' +
        '<div class="pub-authors">' + esc(p.authors) + '.</div>' +
        '<div class="pub-venue">' + esc(p.venue) + '.</div>' +
        '<div class="paper-meta">' + tags +
        (p.pdf ? '<a class="badge badge-pill badge-pub" href="' + DATA.base + '/' + p.pdf + '"><i class="fa fa-download"></i>&nbsp;PDF</a>' : '') +
        '</div></div></article>';
    }).join('');
  }
  listEl.addEventListener('click', function (e) {
    var b = e.target.closest('.paper-tag');
    if (b) { select({ type: 'area', area: byKey[b.dataset.key] }); stage.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
  });

  chipsEl.innerHTML = areas.map(function (a) {
    return '<button type="button" class="area-chip" data-key="' + a.key + '" aria-pressed="false"><i style="background:' + a.color + '"></i>' +
      esc(a.title) + ' <span>' + a.papers.length + '</span></button>';
  }).join('');
  chipsEl.addEventListener('click', function (e) {
    var c = e.target.closest('.area-chip'); if (!c) return;
    var a = byKey[c.dataset.key];
    select(selected && selected.type === 'area' && selected.area === a ? null : { type: 'area', area: a });
  });

  // ---------- go ----------
  var mode = null;
  function build() {
    var m = stage.clientWidth < 640 ? 'narrow' : 'wide';
    if (m === mode) return;
    mode = m; layout(); draw(); highlight();
  }
  build(); renderList();
  (function fromHash() {
    var h = decodeURIComponent(location.hash.slice(1)).split('+');
    if (h.length === 1 && byKey[h[0]]) select({ type: 'area', area: byKey[h[0]] });
    else if (h.length === 2) {
      var bd = bonds.filter(function (b) { return (b.a.key === h[0] && b.b.key === h[1]) || (b.a.key === h[1] && b.b.key === h[0]); })[0];
      if (bd) select({ type: 'pair', bond: bd });
    }
  })();
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });

  if (!reduce) {
    var visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(stage);
    (function loop(t) { if (visible && !document.hidden) place(t); requestAnimationFrame(loop); })(0);
  }
})();

/* ==========================================================================
   リサーチページ共通：TL;DR / Main / Terms タブ ＋ 左サイド目次 ＋ 株価チャート
   手本 = 035_company/261017_powerx_deep_research.html

   ■ HTML の形
     <link rel="stylesheet" href="<相対>/030_research/_shared/research_tabs.css">
     <div class="page" data-terms-root>
       <div class="hero">…</div>
       <div class="ptabs" data-tabbar role="tablist">
         <button type="button" class="on" data-tab="tldr">TL;DR</button>
         <button type="button" data-tab="main">Main</button>
       </div>                                   ← Terms タブは terms.js がここに足す
       <div class="pane" data-pane="tldr">…</div>
       <div class="pane" data-pane="main" hidden>…（従来の本文・目次・Sources）…</div>
     </div>
     <aside class="side-nav" id="sideNav"></aside>   ← 任意。Main の節から自動生成
     <script src="<相対>/030_research/_shared/research_tabs.js" defer></script>
     <script src="<相対>/040_personal/0460_english/terms/terms.js" defer></script>

   ■ 左サイド目次：Main の中の `.sec[id]` / `section[id]`（.sec-label / .section-label をラベルに使う）。無ければ `h2[id]`。
   ■ TL;DR から `<a href="#節id">` で Main の節に飛ぶと、自動でタブを切り替える。
   ■ 最後に開いたタブはブラウザに記憶（localStorage、失敗しても既定の TL;DR で動く）。

   ■ 株価チャート（任意）
     <div class="chart pchart" data-price="PRICE_X" data-marks="all"> … タイトル等 … </div>
     <script>window.PRICE_X={
       data:[["2025-12-19",477],…],        // [日付, 終値]。日足・週足・月足どれでも可
       marks:{1:"2025-12-19",…},           // 番号マーカー（任意）。#mv1 … にリンク
       ref:{v:407,label:"公開価格 ¥407"},  // 水平の参照線（任意）
       cur:"¥", log:true                   // 通貨記号・対数目盛（既定 true）
     };</script>
     data-marks="1,4,6" で表示する番号を絞れる（TL;DR 用の縮約版など）。
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- tabs ---------- */
  function tabs() {
    var bar = document.querySelector('[data-tabbar]'); if (!bar) return;
    var KEY = 'research.tab.' + location.pathname;
    var panes = document.querySelectorAll('[data-pane]');
    function show(name, noScroll) {
      bar.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === name); });
      panes.forEach(function (p) { p.hidden = p.dataset.pane !== name; });
      var tp = document.querySelector('[data-terms-panel]'); if (tp) tp.hidden = true;
      var side = document.getElementById('sideNav'); if (side) side.style.visibility = name === 'main' ? '' : 'hidden';
      try { localStorage.setItem(KEY, name); } catch (e) {}
      if (!noScroll && bar.getBoundingClientRect().top < 56) bar.scrollIntoView({ block: 'start' });
      drawCharts();
    }
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]'); if (!b || b.dataset.tab === 't') return;
      show(b.dataset.tab);
    });
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a) return;
      var id = a.getAttribute('href').slice(1); if (!id) return;
      var el = document.getElementById(id); if (!el) return;
      var pane = el.closest('[data-pane]'); if (!pane || !pane.hidden) return;
      e.preventDefault(); show(pane.dataset.pane, true);
      setTimeout(function () { el.scrollIntoView({ block: 'start' }); history.replaceState(null, '', '#' + id); }, 0);
    });
    var start = panes[0] ? panes[0].dataset.pane : 'tldr';
    var h = location.hash.slice(1), he = h && document.getElementById(h);
    if (he && he.closest('[data-pane]')) start = he.closest('[data-pane]').dataset.pane;
    else { try { var s = localStorage.getItem(KEY); if (s && document.querySelector('[data-pane="' + s + '"]')) start = s; } catch (e) {} }
    show(start, true);
    if (he) setTimeout(function () { he.scrollIntoView({ block: 'start' }); }, 0);
  }

  /* ---------- side nav ---------- */
  function sideNav() {
    var host = document.getElementById('sideNav'); if (!host || host.dataset.static != null) return;
    var scope = document.querySelector('[data-pane="main"]') || document.querySelector('.page') || document.body;
    var secs = scope.querySelectorAll('.sec[id], section[id]'), items = [];
    if (secs.length) {
      secs.forEach(function (sec, i) {
        var lb = sec.querySelector('.sec-label, .section-label'); if (!lb) return;
        var c = lb.cloneNode(true), n = c.querySelector('.num');
        var num = n ? n.textContent.trim() : ('0' + (i + 1)).slice(-2); if (n) n.remove();
        c.querySelectorAll('.sec-updated,.updated').forEach(function (x) { x.remove(); });  /* geo の「Added / Last updated」を目次に出さない */
        items.push({ id: sec.id, num: num, t: c.textContent.trim() });
      });
    } else {
      scope.querySelectorAll('h2[id]').forEach(function (h, i) {
        var c = h.cloneNode(true); c.querySelectorAll('.sec-updated,.updated').forEach(function (x) { x.remove(); });
        items.push({ id: h.id, num: ('0' + (i + 1)).slice(-2), t: c.textContent.trim().replace(/^\d+\.\s*/, '') });
      });
    }
    if (!items.length) return;
    host.innerHTML = '<div class="side-nav-title">Contents</div><ul class="side-nav-list">' + items.map(function (x) {
      return '<li><a class="side-nav-link" href="#' + x.id + '" data-target="' + x.id + '"><span class="side-nav-num">' + x.num + '</span>' + x.t.replace(/</g, '&lt;') + '</a></li>';
    }).join('') + '</ul>';
    if (!('IntersectionObserver' in window)) return;
    var ids = items.map(function (x) { return x.id; }), vis = {}, cur = null;
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) vis[e.target.id] = 1; else delete vis[e.target.id]; });
      var f = null; for (var i = 0; i < ids.length; i++) if (vis[ids[i]]) { f = ids[i]; break; }
      if (f && f !== cur) { cur = f; host.querySelectorAll('.side-nav-link').forEach(function (a) { a.classList.toggle('active', a.dataset.target === f); }); }
    }, { rootMargin: '-12% 0px -70% 0px', threshold: 0 });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }

  /* ---------- price chart ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a, p) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function niceTicks(lo, hi, log) {
    var out = [];
    if (log) {
      for (var k = Math.floor(Math.log10(lo)); k <= Math.ceil(Math.log10(hi)); k++)
        [1, 2, 5].forEach(function (m) { var v = m * Math.pow(10, k); if (v >= lo && v <= hi) out.push(v); });
      if (out.length > 7) out = out.filter(function (v) { return /^1|^5/.test(String(v)); });
      if (out.length < 3) { out = []; var st = (hi - lo) / 4; for (var j = 0; j <= 4; j++) out.push(+(lo + st * j).toPrecision(2)); }
    } else {
      var step = Math.pow(10, Math.floor(Math.log10((hi - lo) / 4))), r = (hi - lo) / 4 / step;
      step *= r > 5 ? 10 : r > 2 ? 5 : r > 1 ? 2 : 1;
      for (var v = Math.ceil(lo / step) * step; v <= hi; v += step) out.push(+v.toPrecision(6));
    }
    return out;
  }
  function fmt(v) { return v >= 1e6 ? (v / 1e6) + 'M' : v >= 1000 ? (v / 1000) + 'k' : String(v); }
  function draw(host) {
    var P = window[host.dataset.price]; if (!P || !P.data || !P.data.length) return;
    var old = host.querySelector('svg'); if (old) old.remove();
    var ot = host.querySelector('.ptip'); if (ot) ot.remove();
    var D = P.data, cur = P.cur || '', log = P.log !== false;
    var W = Math.max(300, Math.min(host.clientWidth || 600, 860)), small = W < 520, H = small ? 260 : 320;
    var L = small ? 40 : 50, R = 10, T = 18, B = 26;
    var t0 = Date.parse(D[0][0]), xs = D.map(function (p) { return (Date.parse(p[0]) - t0) / 864e5; }), xmax = xs[xs.length - 1] || 1;
    var vals = D.map(function (p) { return p[1]; }); if (P.ref) vals.push(P.ref.v);
    var vmin = Math.min.apply(null, vals), vmax = Math.max.apply(null, vals);
    var lo = log ? vmin / 1.25 : vmin - (vmax - vmin) * .08, hi = log ? vmax * 1.2 : vmax + (vmax - vmin) * .1;
    if (!log && lo < 0 && vmin >= 0) lo = 0;
    var f = log ? Math.log : function (v) { return v; };
    function X(d) { return L + (W - L - R) * d / xmax; }
    function Y(v) { return T + (H - T - B) * (1 - (f(v) - f(lo)) / (f(hi) - f(lo))); }
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', role: 'img', 'aria-label': host.querySelector('.chart-title') ? host.querySelector('.chart-title').textContent : 'price chart', style: 'display:block;font-family:Poppins,"Noto Sans JP",sans-serif' }, host);
    niceTicks(lo, hi, log).forEach(function (v) {
      el('line', { x1: L, x2: W - R, y1: Y(v), y2: Y(v), stroke: '#e6e6e6' }, svg);
      el('text', { x: L - 6, y: Y(v) + 4, 'font-size': 10.5, fill: '#999', 'text-anchor': 'end' }, svg).textContent = fmt(v);
    });
    // x ticks: months for < 3 years, years otherwise
    var d0 = new Date(t0), d1 = new Date(t0 + xmax * 864e5), years = (d1 - d0) / 3.156e10, ticks = [];
    if (years < 3) {
      var stepM = years < 1.2 ? 2 : years < 2 ? 3 : 6;
      for (var dt = new Date(d0.getFullYear(), d0.getMonth() + 1, 1); dt <= d1; dt.setMonth(dt.getMonth() + 1))
        if (dt.getMonth() % stepM === 0) ticks.push({ x: (dt - t0) / 864e5, t: (dt.getMonth() === 0 ? "'" + String(dt.getFullYear()).slice(2) + ' ' : '') + (dt.getMonth() + 1) + '月' });
    } else {
      var stepY = years > 30 ? 10 : years > 15 ? 5 : years > 6 ? 2 : 1;
      for (var y = d0.getFullYear() + 1; y <= d1.getFullYear(); y++) if (y % stepY === 0) ticks.push({ x: (Date.UTC(y, 0, 1) - t0) / 864e5, t: String(y) });
    }
    ticks.forEach(function (k) {
      var x = X(k.x); el('line', { x1: x, x2: x, y1: T, y2: H - B, stroke: '#f0f0f0' }, svg);
      el('text', { x: x, y: H - 8, 'font-size': 10.5, fill: '#999', 'text-anchor': 'middle' }, svg).textContent = k.t;
    });
    if (P.ref) {
      el('line', { x1: L, x2: W - R, y1: Y(P.ref.v), y2: Y(P.ref.v), stroke: '#bbb', 'stroke-dasharray': '3 3' }, svg);
      el('text', { x: W - R, y: Y(P.ref.v) - 4, 'font-size': 10, fill: '#888', 'text-anchor': 'end' }, svg).textContent = P.ref.label || '';
    }
    el('path', { d: D.map(function (p, i) { return (i ? 'L' : 'M') + X(xs[i]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(''), fill: 'none', stroke: '#111', 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, svg);
    var want = !host.dataset.marks || host.dataset.marks === 'all' ? null : host.dataset.marks.split(',').map(Number);
    var idx = {}; D.forEach(function (p, i) { idx[p[0]] = i; });
    Object.keys(P.marks || {}).forEach(function (n) {
      n = +n; if (want && want.indexOf(n) < 0) return;
      var i = idx[P.marks[n]]; if (i == null) return;
      var cx = X(xs[i]), cy = Y(D[i][1]), up = n % 2 ? -1 : 1;
      if (cy + up * 32 < T) up = 1; if (cy + up * 32 > H - B) up = -1;
      var a = el('a', { href: '#mv' + n, 'class': 'mk' }, svg);
      el('line', { x1: cx, x2: cx, y1: cy, y2: cy + up * 16, stroke: '#999' }, a);
      el('circle', { cx: cx, cy: cy + up * 24, r: 8, fill: '#111' }, a);
      el('text', { x: cx, y: cy + up * 24 + 3.5, 'font-size': 9.5, 'font-weight': 700, fill: '#fff', 'text-anchor': 'middle' }, a).textContent = n;
      el('circle', { cx: cx, cy: cy, r: 2.6, fill: '#111' }, svg);
    });
    var tip = document.createElement('div'); tip.className = 'ptip'; host.appendChild(tip);
    var guide = el('line', { y1: T, y2: H - B, stroke: '#111', 'stroke-width': .6, visibility: 'hidden' }, svg);
    var dot = el('circle', { r: 3.5, fill: '#fff', stroke: '#111', 'stroke-width': 1.5, visibility: 'hidden' }, svg);
    function move(ev) {
      var r = svg.getBoundingClientRect(), sx = ((ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left) * W / r.width;
      var dd = (sx - L) / (W - L - R) * xmax, b = 0;
      for (var i = 1; i < xs.length; i++) if (Math.abs(xs[i] - dd) < Math.abs(xs[b] - dd)) b = i;
      var px = X(xs[b]), py = Y(D[b][1]);
      guide.setAttribute('x1', px); guide.setAttribute('x2', px); guide.setAttribute('visibility', 'visible');
      dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('visibility', 'visible');
      tip.style.display = 'block'; tip.textContent = D[b][0] + '  ' + cur + D[b][1].toLocaleString();
      tip.style.left = Math.min(Math.max(px * r.width / W, 60), r.width - 60) + 'px'; tip.style.top = (svg.offsetTop + py * r.height / H) + 'px';
    }
    function out() { tip.style.display = 'none'; guide.setAttribute('visibility', 'hidden'); dot.setAttribute('visibility', 'hidden'); }
    svg.addEventListener('mousemove', move); svg.addEventListener('touchmove', move, { passive: true });
    svg.addEventListener('mouseleave', out); svg.addEventListener('touchend', out);
  }
  function drawCharts() { document.querySelectorAll('.pchart[data-price]').forEach(function (h) { if (h.offsetParent !== null) draw(h); }); }

  function init() {
    tabs(); sideNav(); drawCharts();
    var to; window.addEventListener('resize', function () { clearTimeout(to); to = setTimeout(drawCharts, 80); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

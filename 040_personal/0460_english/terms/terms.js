/* ==========================================================================
   Terms エンジン（全ページ共通）
   - ページに <script src="<相対>/040_personal/0460_english/terms/terms.js" defer></script> を1行足すだけ
   - 本文から TERMS の日本語を探して <span class="tm"> で包む
   - ✓（known）の語は本文を英語に置き換える（ルー大柴スタイル）。hover で元の日本語
   - ページ先頭に Content / Terms のタブを出す。Terms はこのページに出てくる語の一覧
   - ✓ はブラウザ（localStorage）に保存。kyo24111.github.io 配下の全ページで共有
   - 「Sync to DB」で ✓ の一覧を GitHub API 経由で terms_known.js に commit（初回だけトークン入力）
     サイトへの反映は Pages の再ビルド後（1〜2分）。それまではブラウザ側の✓で表示する
   - 統合DBページ（#termDb がある）では一覧表だけを描く
   ========================================================================== */
(function () {
  'use strict';
  var me = document.currentScript;
  var SELF = me ? me.src : '';
  var BASE = SELF.replace(/040_personal\/0460_english\/terms\/terms\.js.*$/, '');
  var HUB = BASE + '040_personal/0460_english/terms/261017_term_db.html';
  var KEY = 'kyo.terms.known.v1';
  var TOKEN_KEY = 'kyo.terms.gh';
  var REPO = 'kyo24111/kyo24111.github.io', BRANCH = 'main';
  var KNOWN_PATH = '040_personal/0460_english/terms/terms_known.js';
  var DB = null;   // terms_known.js の id 集合
  var FIELDS = ['science', 'industry', 'market', 'finance', 'law', 'general'];

  /* ---------- state ---------- */
  var over = {};
  try { over = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { over = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(over)); } catch (e) {} }
  function dbKnown(t) { return DB ? DB.has(t.id) : !!t.known; }
  function isKnown(t) { return Object.prototype.hasOwnProperty.call(over, t.id) ? !!over[t.id] : dbKnown(t); }
  function setKnown(t, v) {
    if (v === dbKnown(t)) delete over[t.id]; else over[t.id] = v;
    save(); refresh();
  }
  /* DB に反映済みになった✓はブラウザ側から消す */
  function prune() {
    Object.keys(over).forEach(function (id) { var t = byId[id]; if (!t || over[id] === dbKnown(t)) delete over[id]; });
    save();
  }
  function pending() { return Object.keys(over).length; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pageKey() {
    var href = location.href.split('#')[0].split('?')[0];
    return BASE && href.indexOf(BASE) === 0 ? decodeURIComponent(href.slice(BASE.length)) : '';
  }

  /* ---------- css ---------- */
  var CSS = [
    '.tm{cursor:help}',
    '.tm-k{font-family:Poppins,"Noto Sans JP",sans-serif;font-weight:600;border-bottom:1px dotted currentColor;margin:0 .12em}',
    '.tx-bar{display:flex;gap:4px;margin:0 0 28px;border-bottom:1px solid #d8d8d8;font-family:Poppins,"Noto Sans JP",sans-serif}',
    '.tx-bar button{appearance:none;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;padding:9px 14px;font:inherit;font-size:12.5px;font-weight:600;color:#999;cursor:pointer;letter-spacing:.02em}',
    '.tx-bar button.on{color:#111;border-bottom-color:#111}',
    '.tx-bar .c{font-size:10.5px;color:#aaa;margin-left:5px;font-weight:500}',
    '.tx-panel{font-family:"Noto Sans JP",sans-serif;color:#1a1a1a}',
    '.tx-head{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-bottom:14px}',
    '.tx-stat{font-family:Poppins,sans-serif;font-size:13px;font-weight:700}',
    '.tx-stat span{font-weight:500;color:#999;font-size:11.5px;margin-left:6px}',
    '.tx-meter{flex:1 1 120px;height:4px;background:#eee;border-radius:2px;overflow:hidden;min-width:80px}',
    '.tx-meter i{display:block;height:100%;background:#111}',
    '.tx-tools{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:14px}',
    '.tx-tools input[type=search]{flex:1 1 160px;min-width:0;border:1px solid #d8d8d8;border-radius:8px;padding:7px 10px;font:inherit;font-size:13px}',
    '.tx-chip{appearance:none;border:1px solid #d8d8d8;background:#fff;border-radius:999px;padding:5px 12px;font-family:Poppins,"Noto Sans JP",sans-serif;font-size:11.5px;font-weight:600;color:#666;cursor:pointer}',
    '.tx-chip.on{background:#111;border-color:#111;color:#fff}',
    '.tx-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #eee;border-radius:10px}',
    '.tx-t{width:100%;border-collapse:collapse;font-size:13px;min-width:600px}',
    '.tx-t th{background:#f5f5f5;color:#666;font-weight:600;text-align:left;padding:9px 12px;font-size:11.5px;white-space:nowrap;border-bottom:1px solid #d8d8d8}',
    '.tx-t td{padding:9px 12px;border-bottom:1px solid #f0f0f0;vertical-align:top;line-height:1.6}',
    '.tx-t tr:last-child td{border-bottom:none}',
    '.tx-t tr.k td{background:#fafafa}',
    '.tx-t td.ck{width:36px;text-align:center}',
    '.tx-t input[type=checkbox]{width:16px;height:16px;accent-color:#111;cursor:pointer}',
    '.tx-en{font-family:Poppins,sans-serif;font-weight:600;white-space:nowrap}',
    '.tx-ja{white-space:nowrap}',
    '.tx-f{font-family:Poppins,sans-serif;font-size:10px;font-weight:600;border:1px solid #d8d8d8;border-radius:4px;padding:1px 6px;color:#666;white-space:nowrap}',
    '.tx-sub{display:block;font-size:10.5px;color:#aaa;margin-top:3px;font-family:Poppins,sans-serif}',
    '.tx-def{color:#444;font-size:12.5px}',
    '.tx-note{display:block;color:#999;font-size:11.5px;margin-top:2px}',
    '.tx-src a{color:#666;font-size:11.5px}',
    '.tx-foot{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:14px;font-size:12px;color:#999}',
    '.tx-foot a{color:#111}',
    '.tx-btn{appearance:none;border:1px solid #111;background:#111;color:#fff;border-radius:8px;padding:6px 12px;font-family:Poppins,sans-serif;font-size:11.5px;font-weight:600;cursor:pointer}',
    '.tx-btn:disabled{background:#fff;color:#aaa;border-color:#d8d8d8;cursor:default}',
    '.tx-link{appearance:none;border:none;background:none;padding:0;font:inherit;font-size:12px;color:#999;text-decoration:underline;cursor:pointer}',
    '.tx-msg{color:#666}',
    '.tx-out{width:100%;margin-top:10px;font-family:ui-monospace,Menlo,monospace;font-size:11.5px;border:1px solid #d8d8d8;border-radius:8px;padding:8px;min-height:64px}',
    '.tx-empty{padding:24px;text-align:center;color:#999;font-size:13px}'
  ].join('\n');
  function addCss() { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); }

  /* ---------- text matching ---------- */
  var T = [], byJa = {}, byId = {}, RE = null;
  function buildIndex() {
    T = window.TERMS || [];
    var keys = [];
    T.forEach(function (t) {
      byId[t.id] = t;
      [t.ja].concat(t.alt || []).forEach(function (j) { if (j && !byJa[j]) { byJa[j] = t; keys.push(j); } });
    });
    keys.sort(function (a, b) { return b.length - a.length; });
    if (keys.length) RE = new RegExp(keys.map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|'), 'g');
  }

  var SKIP = 'script,style,noscript,textarea,input,select,option,svg,code,pre,title,.tm,.tx-bar,.tx-panel,[data-no-terms]';
  var found = {}, spans = [], busy = false;

  function walk(root) {
    if (!RE || !root) return;
    if (root.nodeType === 1 && root.closest && root.closest(SKIP)) return;
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p || p.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        RE.lastIndex = 0;
        return RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (tw.nextNode()) nodes.push(tw.currentNode);
    nodes.forEach(wrapNode);
  }
  function wrapNode(n) {
    var s = n.nodeValue, last = 0, frag = document.createDocumentFragment(), m;
    RE.lastIndex = 0;
    while ((m = RE.exec(s))) {
      var t = byJa[m[0]];
      if (m.index > last) frag.appendChild(document.createTextNode(s.slice(last, m.index)));
      var sp = document.createElement('span');
      sp.className = 'tm'; sp.dataset.id = t.id; sp.dataset.ja = m[0];
      paint(sp, t);
      frag.appendChild(sp); spans.push(sp); found[t.id] = true;
      last = m.index + m[0].length;
    }
    if (last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
    n.parentNode.replaceChild(frag, n);
  }
  function paint(sp, t) {
    var k = isKnown(t);
    sp.textContent = k ? t.en : sp.dataset.ja;
    sp.title = k ? sp.dataset.ja : t.en;
    sp.classList.toggle('tm-k', k);
  }

  /* ---------- table (Terms タブ / 統合DB 共通) ---------- */
  function table(host, opt) {
    var st = { q: '', status: 'all', field: 'all' };
    host.innerHTML =
      '<div class="tx-head"><div class="tx-stat"></div><div class="tx-meter"><i></i></div></div>' +
      '<div class="tx-tools"><input type="search" placeholder="Search EN / 日本語">' +
      '<button class="tx-chip on" data-st="all">All</button><button class="tx-chip" data-st="todo">To learn</button><button class="tx-chip" data-st="known">Known</button></div>' +
      (opt.fields ? '<div class="tx-tools tx-fields"></div>' : '') +
      '<div class="tx-scroll"><table class="tx-t"><thead></thead><tbody></tbody></table></div>' +
      '<div class="tx-foot"><button class="tx-btn tx-sync"></button><span class="tx-msg"></span><button class="tx-link tx-exp">Copy diff</button>' +
      (opt.hubLink ? '<a href="' + HUB + '">統合 Term DB →</a>' : '') + '</div>';
    var tb = host.querySelector('tbody');
    host.querySelector('thead').innerHTML = '<tr><th>✓</th><th>English</th><th>日本語</th><th>Field</th><th>Definition</th>' + (opt.src ? '<th>Source</th>' : '') + '</tr>';
    if (opt.fields) {
      var fs = host.querySelector('.tx-fields');
      var used = FIELDS.filter(function (f) { return opt.list().some(function (t) { return t.field === f; }); });
      fs.innerHTML = ['all'].concat(used).map(function (f) { return '<button class="tx-chip' + (f === 'all' ? ' on' : '') + '" data-fd="' + f + '">' + (f === 'all' ? 'All fields' : f) + '</button>'; }).join('');
      fs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-fd]'); if (!b) return;
        st.field = b.dataset.fd; fs.querySelectorAll('[data-fd]').forEach(function (x) { x.classList.toggle('on', x === b); }); draw();
      });
    }
    host.querySelector('input[type=search]').addEventListener('input', function (e) { st.q = e.target.value.trim().toLowerCase(); draw(); });
    host.querySelectorAll('[data-st]').forEach(function (b) {
      b.addEventListener('click', function () { st.status = b.dataset.st; host.querySelectorAll('[data-st]').forEach(function (x) { x.classList.toggle('on', x === b); }); draw(); });
    });
    tb.addEventListener('change', function (e) {
      var c = e.target; if (!c.dataset || !c.dataset.id) return;
      setKnown(byId[c.dataset.id], c.checked);
    });
    host.querySelector('.tx-exp').addEventListener('click', function () { exportDiff(host); });
    host.querySelector('.tx-sync').addEventListener('click', function () { sync(host); });

    function draw() {
      var all = opt.list(), rows = all.filter(function (t) {
        var k = isKnown(t);
        if (st.status === 'todo' && k) return false;
        if (st.status === 'known' && !k) return false;
        if (st.field !== 'all' && t.field !== st.field) return false;
        if (st.q) {
          var hay = (t.en + ' ' + t.ja + ' ' + (t.alt || []).join(' ') + ' ' + (t.def || '')).toLowerCase();
          if (hay.indexOf(st.q) < 0) return false;
        }
        return true;
      });
      var nk = all.filter(isKnown).length;
      host.querySelector('.tx-stat').innerHTML = 'Known ' + nk + ' / ' + all.length + '<span>' + Math.round(all.length ? nk / all.length * 100 : 0) + '%</span>';
      host.querySelector('.tx-meter i').style.width = (all.length ? nk / all.length * 100 : 0) + '%';
      var sb = host.querySelector('.tx-sync'), np = pending();
      sb.textContent = np ? 'Sync to DB (' + np + ')' : 'Synced';
      sb.disabled = !np || syncing;
      tb.innerHTML = rows.length ? rows.map(function (t) {
        var k = isKnown(t);
        return '<tr class="' + (k ? 'k' : '') + '"><td class="ck"><input type="checkbox" data-id="' + esc(t.id) + '"' + (k ? ' checked' : '') + ' aria-label="' + esc(t.en) + '"></td>' +
          '<td class="tx-en">' + esc(t.en) + '</td>' +
          '<td class="tx-ja">' + esc(t.ja) + (t.alt && t.alt.length ? '<span class="tx-sub">' + esc(t.alt.join(' / ')) + '</span>' : '') + '</td>' +
          '<td><span class="tx-f">' + esc(t.field) + '</span>' + (t.sub ? '<span class="tx-sub">' + esc(t.sub) + '</span>' : '') + '</td>' +
          '<td class="tx-def">' + esc(t.def) + (t.note ? '<span class="tx-note">' + esc(t.note) + '</span>' : '') + '</td>' +
          (opt.src ? '<td class="tx-src">' + (t.src ? '<a href="' + esc(BASE + t.src) + '">' + esc(t.src.split('/').pop().replace(/\.html$/, '')) + '</a>' : '') + '</td>' : '') +
          '</tr>';
      }).join('') : '<tr><td colspan="6" class="tx-empty">該当なし</td></tr>';
    }
    draw();
    return draw;
  }

  /* ---------- Sync to DB（GitHub Contents API で terms_known.js を上書き） ---------- */
  var syncing = false;
  function msg(host, s) { host.querySelector('.tx-msg').textContent = s; }
  function sync(host) {
    var tok = '';
    try { tok = localStorage.getItem(TOKEN_KEY) || ''; } catch (e) {}
    if (!tok) {
      tok = (prompt('GitHub の fine-grained token を貼ってください（初回のみ・このブラウザに保存）\n対象: ' + REPO + ' だけ / 権限: Contents = Read and write') || '').trim();
      if (!tok) return;
      try { localStorage.setItem(TOKEN_KEY, tok); } catch (e) {}
    }
    var ids = T.filter(isKnown).map(function (t) { return t.id; }).sort();
    var body = '/* known（理解済み）の正本。Terms タブの「Sync to DB」ボタンが GitHub API でこのファイルを上書きする。手で直してもよい */\n' +
      'window.TERMS_KNOWN = ' + JSON.stringify(ids, null, 1).replace(/\n\s*/g, ' ') + ';\n';
    var url = 'https://api.github.com/repos/' + REPO + '/contents/' + KNOWN_PATH;
    var hd = { 'Authorization': 'Bearer ' + tok, 'Accept': 'application/vnd.github+json' };
    syncing = true; redraws.forEach(function (f) { f(); }); msg(host, 'Saving…');
    fetch(url + '?ref=' + BRANCH, { headers: hd, cache: 'no-store' })
      .then(function (r) { if (r.status === 404) return {}; if (!r.ok) throw r; return r.json(); })
      .then(function (cur) {
        return fetch(url, { method: 'PUT', headers: hd, body: JSON.stringify({
          message: 'terms: known update (' + ids.length + ' known)', branch: BRANCH,
          content: btoa(unescape(encodeURIComponent(body))), sha: cur.sha
        }) });
      })
      .then(function (r) { if (!r.ok) throw r; return r.json(); })
      .then(function () {
        DB = new Set(ids); prune();
        syncing = false; refresh();
        msg(host, 'Saved ✓ ' + ids.length + ' known — サイトへの反映は1〜2分後');
      })
      .catch(function (r) {
        syncing = false; redraws.forEach(function (f) { f(); });
        var st = r && r.status;
        if (st === 401 || st === 403) { try { localStorage.removeItem(TOKEN_KEY); } catch (e) {} msg(host, 'トークンが無効です。もう一度押すと再入力できます'); }
        else msg(host, '保存に失敗しました' + (st ? '（' + st + '）' : '') + '。Copy diff で Claude に渡してください');
      });
  }

  function exportDiff(host) {
    var known = [], unknown = [];
    T.forEach(function (t) { var k = isKnown(t), d = dbKnown(t); if (k && !d) known.push(t.id); if (!k && d) unknown.push(t.id); });
    var txt = 'terms known update\n' + JSON.stringify({ known: known, unknown: unknown });
    var out = host.querySelector('.tx-out');
    if (!out) { out = document.createElement('textarea'); out.className = 'tx-out'; out.readOnly = true; host.appendChild(out); }
    out.value = txt; out.select();
    try { navigator.clipboard.writeText(txt); } catch (e) {}
  }

  /* ---------- tabs ---------- */
  var redraws = [], tabCount = null;
  /* ページ側に自前のタブバー（[data-tabbar] + [data-pane]）がある場合は、そこに Terms タブを足すだけ。
     TL;DR / Main など自前タブの切替はページ側の JS が行い、Terms を押した時だけここで pane を隠す */
  function ownTabs(bar, root, list) {
    var b = document.createElement('button');
    b.type = 'button'; b.dataset.tab = 't'; b.innerHTML = 'Terms<span class="c"></span>';
    bar.appendChild(b);
    var panel = document.createElement('div');
    panel.className = 'tx-panel'; panel.hidden = true; panel.dataset.termsPanel = '';
    var panes = root.querySelectorAll('[data-pane]'), last = panes[panes.length - 1];
    if (last) last.parentNode.insertBefore(panel, last.nextSibling); else root.appendChild(panel);
    tabCount = b.querySelector('.c');
    redraws.push(table(panel, { list: list, hubLink: true, fields: true }));
    bar.addEventListener('click', function (e) {
      var x = e.target.closest('[data-tab]'); if (!x) return;
      var t = x.dataset.tab === 't';
      panel.hidden = !t;
      if (!t) return;
      bar.querySelectorAll('[data-tab]').forEach(function (y) { y.classList.toggle('on', y === x); });
      Array.prototype.forEach.call(panes, function (p) { p.hidden = true; });
      var side = document.getElementById('sideNav'); if (side) side.style.visibility = 'hidden';
    });
  }
  function tabs(root, list) {
    var own = root.querySelector('[data-tabbar]');
    if (own) return ownTabs(own, root, list);
    var bar = document.createElement('div');
    bar.className = 'tx-bar';
    bar.innerHTML = '<button class="on" data-tab="c">Content</button><button data-tab="t">Terms<span class="c"></span></button>';
    var panel = document.createElement('div');
    panel.className = 'tx-panel'; panel.hidden = true;
    /* パンくず（.crumb）があればその直後、無ければ最初の要素の前 */
    var first = root.firstElementChild;
    while (first && /^(STYLE|SCRIPT)$/.test(first.tagName)) first = first.nextElementSibling;
    if (first && first.classList.contains('crumb')) first = first.nextElementSibling;
    root.insertBefore(bar, first);
    root.appendChild(panel);
    tabCount = bar.querySelector('.c');
    redraws.push(table(panel, { list: list, hubLink: true, fields: true }));
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]'); if (!b) return;
      var t = b.dataset.tab === 't';
      bar.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      Array.prototype.forEach.call(root.children, function (el) {
        if (el === bar || el === panel || /^(STYLE|SCRIPT)$/.test(el.tagName)) return;
        if (t) { el.dataset.txHid = el.hidden ? '1' : '0'; el.hidden = true; }
        else if (el.dataset.txHid != null) { el.hidden = el.dataset.txHid === '1'; delete el.dataset.txHid; }
      });
      panel.hidden = !t;
      var side = document.getElementById('sideNav'); if (side) side.style.visibility = t ? 'hidden' : '';
      if (t) bar.scrollIntoView({ block: 'nearest' });
    });
  }

  function refresh() {
    spans = spans.filter(function (s) { return s.isConnected; });
    spans.forEach(function (sp) { paint(sp, byId[sp.dataset.id]); });
    redraws.forEach(function (f) { f(); });
    updateCount();
  }
  function pageList() {
    var pk = pageKey();
    return T.filter(function (t) { return found[t.id] || (pk && t.src === pk); });
  }
  function updateCount() { if (tabCount) tabCount.textContent = pageList().length; }

  /* ---------- init ---------- */
  function init() {
    if (window.TERMS_KNOWN) DB = new Set(window.TERMS_KNOWN);
    buildIndex(); prune(); addCss();
    var hub = document.getElementById('termDb');
    if (hub) { redraws.push(table(hub, { list: function () { return T; }, src: true, fields: true })); return; }
    busy = true; walk(document.body); busy = false;
    var root = document.querySelector('[data-terms-root]') || document.querySelector('.wrap') || document.querySelector('.wrapper') || document.querySelector('main') || document.body;
    tabs(root, pageList);
    updateCount();
    /* 後から描画される要素（モーダル・サイド目次など）にも適用 */
    new MutationObserver(function (ms) {
      if (busy) return;
      busy = true;
      var before = Object.keys(found).length;
      ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) walk(n); else if (n.nodeType === 3 && n.parentElement) walk(n.parentElement); }); });
      busy = false;
      if (Object.keys(found).length !== before) { redraws.forEach(function (f) { f(); }); updateCount(); }
    }).observe(document.body, { childList: true, subtree: true });
  }

  function load(file, done) {
    var s = document.createElement('script');
    s.src = BASE + '040_personal/0460_english/terms/' + file + '?v=' + Date.now();   // known は頻繁に変わるのでキャッシュさせない
    s.onload = s.onerror = done;
    document.head.appendChild(s);
  }
  function start() {
    var n = 0, need = (window.TERMS ? 0 : 1) + (window.TERMS_KNOWN ? 0 : 1);
    if (!need) return init();
    function one() { if (++n === need) init(); }
    if (!window.TERMS) load('terms_data.js', one);
    if (!window.TERMS_KNOWN) load('terms_known.js', one);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

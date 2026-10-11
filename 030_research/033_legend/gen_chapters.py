#!/usr/bin/env python3
"""legend: 章ごとの横断ページを生成する。

各人物ページの <section> を section-label（英語ラベル）で章に振り分け、
chapters/index.html（章一覧）と chapters/<slug>.html（章ごとの全人物）を書き出す。
人物を追加・編集したら再実行する:  python3 gen_chapters.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "chapters"

# (slug, 日本語名, 英語名, 説明, 対応する section-label)
CHAPTERS = [
    ("leadership", "リーダー論", "Leadership",
     "人の集め方・任せ方・切り方。チームビルディング、採用、統治スタイル、人間性",
     {"Team Building", "Hiring", "Leadership", "Characteristics", "Traits"}),
    ("achievements", "何を成し遂げたのか", "Achievements",
     "生涯の年表と、代表的な仕事",
     {"Achievements"}),
    ("world", "当時の世界", "World",
     "同時代の世界史と、その中での位置づけ",
     {"World"}),
    ("origins", "生い立ち", "Origins",
     "幼少期・学歴・原体験",
     {"Origins", "Origins & Education", "Childhood", "Childhood & Education", "Origin",
      "Prodigy", "Childhood Episodes", "Education", "Formative Journey"}),
    ("family", "家族", "Family",
     "親・配偶者・子供、家族観",
     {"Family", "Family Values", "Family & Roots", "Family Today"}),
    ("love", "恋愛", "Love",
     "恋愛・パートナー",
     {"Love", "Relationship"}),
    ("friends", "交友関係", "Friends",
     "友人・ライバル・主要な人間関係",
     {"Friends", "Network", "Friends & Rivals", "Rivals"}),
    ("work", "仕事術", "Work Style",
     "生産性・アイデアの出し方",
     {"Productivity", "Ideas"}),
    ("private", "私生活", "Private Life",
     "1日のルーティン・お酒・娯楽・健康・趣味",
     {"Private Life", "Personal Life", "Daily Life", "Routine", "Hobbies", "Interests",
      "Hobbies — Mindset"}),
    ("money", "お金", "Money",
     "お金との向き合い方・稼ぎ方・使い方",
     {"Money"}),
    ("philosophy", "哲学・思想", "Philosophy",
     "思想・信仰・政治的立場",
     {"Philosophy", "Philosophy & Politics", "Philosophy & Tech", "Intellect & Philosophy",
      "Views & Controversy", "Happiness", "Faith & Ethics", "Politics"}),
    ("idols", "尊敬していた人", "Idols",
     "誰に学び、誰を手本にしたか",
     {"Idols"}),
    ("legacy", "後世への影響", "Legacy",
     "彼／彼女を参考にした後世の人物",
     {"Legacy"}),
    ("why", "なぜLegendか", "Why Legend",
     "このリストに入れた理由",
     {"Why Legend", "Why it mattered", "Why It Matters"}),
    ("quotes", "名言", "Quotes",
     "残した言葉",
     {"Quotes"}),
    ("japan", "日本との関係", "Japan",
     "日本との接点",
     {"Japan Connection", "Japan", "Japan 1959"}),
    ("dark", "闇・批判", "Controversy",
     "論争・スキャンダル・負の側面",
     {"Dark Side", "Controversy", "Controversies"}),
]
LABEL2SLUG = {lb: c[0] for c in CHAPTERS for lb in c[4]}


def classify(label, h2):
    if h2.replace(" ", "").startswith("なぜLegend"):
        return "why"
    return LABEL2SLUG.get(label)


def load_people():
    src = (ROOT / "index.html").read_text()
    people = {}
    for line in src.splitlines():
        m = re.match(r'\s*\{f:"([^"]+)"', line)
        if not m:
            continue
        def get(k):
            mm = re.search(r'\b' + k + r':\s*("(?:[^"\\]|\\.)*"|\[[^\]]*\]|-?\d+|null)', line)
            return json.loads(mm.group(1)) if mm else None
        people[m.group(1)] = {k: get(k) for k in ("name", "desc", "born", "died", "nat", "genre")}
    return people


def fix_links(body):
    def rep(m):
        url = m.group(2)
        if re.match(r"(https?:|mailto:|/|#)", url):
            return m.group(0)
        return m.group(1) + "../" + url + '"'
    return re.sub(r'(href=")([^"]+)"', rep, body)


def extract(f):
    s = (ROOT / f).read_text()
    out = []
    for i, m in enumerate(re.finditer(r"<section\b([^>]*)>(.*?)</section>", s, re.S)):
        attrs, body = m.group(1), m.group(2)
        h = re.search(r"<h2[^>]*>(.*?)</h2>", body, re.S)
        if not h:
            continue
        h2 = html.unescape(re.sub(r"<[^>]+>", "", h.group(1))).strip()
        lm = re.search(r'class="section-label"[^>]*>(.*?)<', body)
        label = html.unescape(lm.group(1)).strip() if lm else ""
        slug = classify(label, h2)
        if not slug:
            continue
        idm = re.search(r'\bid="([^"]+)"', attrs)
        anchor = idm.group(1) if idm else f"sec-{i + 1}"  # 人物ページの目次JSと同じ採番
        body = re.sub(r'\s*<div class="section-label">.*?</div>', "", body, count=1, flags=re.S)
        body = body.replace(h.group(0), "", 1)
        body = re.sub(r"<table\b.*?</table>", lambda t: f'<div class="tblx">{t.group(0)}</div>', body, flags=re.S)
        out.append({"slug": slug, "h2": h2, "anchor": anchor, "body": fix_links(body.strip())})
    return out


def years(p):
    def y(v):
        return f"前{-v}" if v < 0 else str(v)
    if p.get("born") is None:
        return ""
    return f"{y(p['born'])}–{y(p['died']) if p.get('died') is not None else ''}"


def esc(t):
    return html.escape(t or "", quote=True)


# ---------------------------------------------------------------- templates
HEAD = """<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="chapters.css">
</head>
<body>
<!-- generated by gen_chapters.py — 手で編集しない -->
<div class="snav">
  <a class="snav-logo" href="/index.html">24111</a>
  <button class="snav-btn" id="snavBtn" onclick="snavToggle()" aria-label="menu"><span></span><span></span><span></span></button>
</div>
<div class="snav-overlay" id="snavOverlay" onclick="snavToggle()"></div>
<nav class="snav-panel" id="snavPanel">
  <a class="snav-a" href="/index.html" style="opacity:.5;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,.1)">home</a>
  <div class="snav-sec">
    <div class="snav-sec-label">Ideas</div>
    <a class="snav-a" href="/01_business_ideas/index.html">business ideas</a>
  </div>
  <div class="snav-sec">
    <div class="snav-sec-label">Research</div>
    <a class="snav-a" href="/030_research/032_geo-history/index.html">geo-history</a>
    <a class="snav-a" href="/030_research/033_legend/index.html">legend</a>
    <a class="snav-a" href="/030_research/035_company/index.html">company</a>
    <a class="snav-a" href="/030_research/036_industry/index.html">industry</a>
    <a class="snav-a" href="/030_research/037_net_search/index.html">net search</a>
    <a class="snav-a" href="/030_research/039_startup_news/index.html">startup news</a>
  </div>
  <div class="snav-sec">
    <div class="snav-sec-label">Personal</div>
    <a class="snav-a" href="/040_personal/profile/profile.html">profile</a>
    <a class="snav-a" href="/040_personal/0411_books/books.html">books</a>
    <a class="snav-a" href="/040_personal/0420_health/260419_health.html">health</a>
    <a class="snav-a" href="/040_personal/0451_travel/flight_record/flight_record.html">flights</a>
  </div>
</nav>
<script>function snavToggle(){{document.getElementById('snavBtn').classList.toggle('open');document.getElementById('snavPanel').classList.toggle('open');document.getElementById('snavOverlay').classList.toggle('open')}}</script>
"""

def _foot():
    src = (ROOT / "index.html").read_text()
    sns = re.search(r'<div class="snav-footer-sns">.*?</div>', src, re.S).group(0)
    return f'<footer class="snav-footer">\n  {sns}\n</footer>\n</body>\n</html>\n'


FOOT = _foot()


def tabs(active):
    return (f'<nav class="tabs"><a href="../index.html">People</a>'
            f'<a href="index.html"{" class=on" if active == "chapters" else ""}>Chapters</a></nav>')


def render_index(counts, n_people):
    rows = []
    for slug, jp, en, desc, _ in CHAPTERS:
        n = counts.get(slug, 0)
        if not n:
            continue
        rows.append(
            f'<a class="ch" href="{slug}.html"><span class="ch-en">{esc(en)}</span>'
            f'<span class="ch-jp">{esc(jp)}</span><span class="ch-desc">{esc(desc)}</span>'
            f'<span class="ch-n">{n} people</span></a>')
    return (HEAD.format(title="24111 / legend / chapters")
            + f"""<header class="page-header">
  <div class="breadcrumb"><a href="/index.html">24111</a> / <a href="../index.html">legend</a></div>
  <h1>chapters</h1>
  {tabs("chapters")}
</header>
<main class="main">
  <p class="lead">人物ページを章ごとに横に切った一覧。同じ章を{n_people}人ぶん並べて読み比べる。</p>
  <div class="ch-grid">
    {chr(10).join(rows)}
  </div>
</main>
""" + FOOT)


def render_chapter(ch, blocks):
    slug, jp, en, desc, _ = ch
    others = "".join(
        f'<option value="{c[0]}.html"{" selected" if c[0] == slug else ""}>{esc(c[2])} — {esc(c[1])}</option>'
        for c in CHAPTERS if c[0] in render_chapter.available)
    arts, toc = [], []
    for b in blocks:
        p, f = b["p"], b["f"]
        heads, bodies = [], []
        for sec in b["secs"]:
            parts = re.split(r"\s+[—–]\s+", sec["h2"], maxsplit=1)
            hl = parts[1] if len(parts) == 2 else sec["h2"]
            heads.append(f'<li><a href="../{f}.html#{sec["anchor"]}">{esc(hl)}</a></li>')
            sub = f'<div class="sec-h">{esc(sec["h2"])}</div>' if len(b["secs"]) > 1 else ""
            bodies.append(f'{sub}{sec["body"]}')
        genre = "".join(f'<span class="tg">{esc(g)}</span>' for g in (p.get("genre") or []))
        arts.append(f"""<article class="pb" id="p-{f}" data-born="{p.get('born') if p.get('born') is not None else 9999}" data-name="{esc(p['name'])}" data-q="{esc((p['name'] + ' ' + (p.get('desc') or '') + ' ' + ' '.join(s['h2'] for s in b['secs'])).lower())}">
  <header class="pb-h">
    <button class="pb-tg" type="button" aria-expanded="false" aria-label="toggle"></button>
    <div class="pb-who">
      <a class="pb-name" href="../{f}.html">{esc(p['name'])}</a>
      <span class="pb-yr">{years(p)}</span>{genre}
    </div>
    <ul class="pb-hl">{''.join(heads)}</ul>
  </header>
  <div class="pb-body">
{chr(10).join(bodies)}
    <a class="pb-more" href="../{f}.html#{b['secs'][0]['anchor']}">{esc(p['name'])} のページで読む →</a>
  </div>
</article>""")
        toc.append(f'<li><a href="#p-{f}">{esc(p["name"])}</a></li>')
    return (HEAD.format(title=f"24111 / legend / {jp}")
            + f"""<header class="page-header">
  <div class="breadcrumb"><a href="/index.html">24111</a> / <a href="../index.html">legend</a> / <a href="index.html">chapters</a></div>
  <h1>{esc(jp)} <span class="h1-en">{esc(en)}</span></h1>
  <p class="h-desc">{esc(desc)}</p>
  {tabs("chapters")}
</header>
<main class="wrap">
  <div class="bar">
    <select class="ctl" id="chsel" aria-label="chapter">{others}</select>
    <input class="ctl q" id="q" type="search" placeholder="Search name / headline…" autocomplete="off">
    <select class="ctl" id="sort" aria-label="sort">
      <option value="born:asc">Born — oldest</option>
      <option value="born:desc">Born — newest</option>
      <option value="name:asc">Name — A→Z</option>
    </select>
    <button class="ctl btn" id="all" type="button">Expand all</button>
  </div>
  <div class="cnt"><b id="cnt">{len(blocks)}</b> / {len(blocks)} people</div>
  <div id="list">
{chr(10).join(arts)}
  </div>
</main>
<nav class="ptoc" id="ptoc" aria-label="people"><div class="ptoc-lbl">People</div><ul id="ptocList">{''.join(toc)}</ul></nav>
<script>
(function () {{
  var list = document.getElementById('list'), arts = [].slice.call(list.children);
  var q = document.getElementById('q'), sort = document.getElementById('sort'), all = document.getElementById('all');
  var toc = document.getElementById('ptocList');
  function setOpen(a, on) {{ a.classList.toggle('open', on); a.querySelector('.pb-tg').setAttribute('aria-expanded', on); }}
  function syncAll() {{ all.textContent = arts.every(function (a) {{ return a.classList.contains('open') || a.hidden; }}) ? 'Collapse all' : 'Expand all'; }}
  list.addEventListener('click', function (e) {{
    if (e.target.closest('a')) return;
    var h = e.target.closest('.pb-h'); if (!h) return;
    var a = h.parentNode; setOpen(a, !a.classList.contains('open')); syncAll();
  }});
  all.addEventListener('click', function () {{
    var on = all.textContent === 'Expand all';
    arts.forEach(function (a) {{ if (!a.hidden) setOpen(a, on); }}); syncAll();
  }});
  function apply() {{
    var s = sort.value.split(':'), k = s[0], dir = s[1] === 'desc' ? -1 : 1, t = q.value.trim().toLowerCase(), n = 0;
    arts.sort(function (x, y) {{
      var a = x.dataset[k], b = y.dataset[k];
      if (k === 'born') {{ a = +a; b = +b; return (a - b) * dir; }}
      return a.localeCompare(b) * dir;
    }});
    arts.forEach(function (a) {{
      list.appendChild(a);
      a.hidden = !!t && a.dataset.q.indexOf(t) < 0;
      if (!a.hidden) n++;
      var li = toc.querySelector('a[href="#' + a.id + '"]').parentNode;
      toc.appendChild(li); li.hidden = a.hidden;
    }});
    document.getElementById('cnt').textContent = n;
    try {{ localStorage.setItem('legend-ch-sort', sort.value); }} catch (e) {{}}
  }}
  try {{ var sv = localStorage.getItem('legend-ch-sort'); if (sv) sort.value = sv; }} catch (e) {{}}
  q.addEventListener('input', apply); sort.addEventListener('change', apply);
  document.getElementById('chsel').addEventListener('change', function () {{ location.href = this.value; }});
  apply();
  /* #p-xxx で来たら開く */
  function openHash() {{ var a = location.hash && document.getElementById(location.hash.slice(1)); if (a && a.classList.contains('pb')) {{ setOpen(a, true); a.scrollIntoView(); }} }}
  window.addEventListener('hashchange', openHash); openHash();
  /* 目次: 現在地 */
  var nav = document.getElementById('ptoc'), tick = false;
  function spy() {{
    tick = false; var y = window.pageYOffset + 120, cur = null;
    arts.forEach(function (a) {{ if (!a.hidden && a.getBoundingClientRect().top + window.pageYOffset <= y) cur = a; }});
    [].forEach.call(toc.querySelectorAll('a'), function (l) {{ l.classList.toggle('on', !!cur && l.getAttribute('href') === '#' + cur.id); }});
    nav.classList.toggle('show', window.pageYOffset > 160);
  }}
  window.addEventListener('scroll', function () {{ if (!tick) {{ tick = true; requestAnimationFrame(spy); }} }}, {{ passive: true }});
  toc.addEventListener('click', function (e) {{ var l = e.target.closest('a'); if (l) setOpen(document.getElementById(l.getAttribute('href').slice(1)), true); }});
  spy();
}})();
</script>
""" + FOOT)


def main():
    people = load_people()
    by = {c[0]: [] for c in CHAPTERS}
    for f in sorted(people):
        if not (ROOT / f"{f}.html").exists():
            continue
        secs = extract(f"{f}.html")
        for slug in by:
            mine = [s for s in secs if s["slug"] == slug]
            if mine:
                by[slug].append({"f": f, "p": people[f], "secs": mine})
    OUT.mkdir(exist_ok=True)
    render_chapter.available = {k for k, v in by.items() if v}
    for ch in CHAPTERS:
        blocks = sorted(by[ch[0]], key=lambda b: (b["p"].get("born") or 9999))
        path = OUT / f"{ch[0]}.html"
        if blocks:
            path.write_text(render_chapter(ch, blocks))
        elif path.exists():
            path.unlink()
    counts = {k: len(v) for k, v in by.items()}
    (OUT / "index.html").write_text(render_index(counts, len(people)))
    for c in CHAPTERS:
        print(f"{counts[c[0]]:3d}  {c[0]:12s} {c[1]}")


if __name__ == "__main__":
    main()

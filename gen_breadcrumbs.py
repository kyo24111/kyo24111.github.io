#!/usr/bin/env python3
"""全HTMLの左上に「24111 / research / company / ページ名」形式のパンくずを差し込む。

- 各ページの <body> 直後に <!-- crumbs:start --> ... <!-- crumbs:end --> を挿入（再実行で置き換え＝冪等）
- 祖先ディレクトリは、そのディレクトリの index.html にリンク
- index.html が無いディレクトリには、子ディレクトリ・ページ一覧の index.html を自動生成
  （<meta name="generator" content="gen_breadcrumbs"> 付きのものだけ上書きする。手書き index は触らない）
- 公開ディレクトリの自動 index には gitignore 済み（local only）のページを載せない
- 新しいHTMLを作ったら `python3 gen_breadcrumbs.py` を流す

使い方: python3 gen_breadcrumbs.py [--dry-run]
"""
import html
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ROOT_LABEL = '24111'
GEN_META = '<meta name="generator" content="gen_breadcrumbs">'
START, END = '<!-- crumbs:start -->', '<!-- crumbs:end -->'

# クライアント向け成果物・生成物・第三者テンプレートは触らない
EXCLUDE_DIRS = {'.git', 'node_modules', 'decks', 'deploy', 'zips', 'slide-kit-main', '.claude'}
EXCLUDE_FILES = {'_private_index.html', 'index_local.html'}

CSS = ('<style>.wl-crumbs{display:flex;flex-wrap:wrap;align-items:center;gap:6px;max-width:100%;'
       'padding:10px 16px;font-family:Poppins,"Noto Sans JP",sans-serif;font-size:11px;font-weight:500;'
       'letter-spacing:.04em;line-height:1.4;color:#888;background:#fff;border-bottom:1px solid #eee;'
       'position:relative;z-index:5}'
       '.wl-crumbs a{color:#888;text-decoration:none}.wl-crumbs a:hover{color:#111;text-decoration:underline}'
       '.wl-crumbs .s{color:#ccc}.wl-crumbs .c{color:#111;font-weight:700}'
       '@media print{.wl-crumbs{display:none}}</style>')


def label_of_dir(name):
    """'040_personal' -> 'personal', '0420_health' -> 'health', '260910_ai_usecase_finder' -> 'ai_usecase_finder'"""
    s = re.sub(r'^\d+_', '', name)
    return s or name


def title_of(path):
    try:
        with open(path, encoding='utf-8', errors='ignore') as f:
            head = f.read(20000)
    except OSError:
        return None
    m = re.search(r'<title[^>]*>(.*?)</title>', head, re.S | re.I)
    if not m:
        return None
    t = html.unescape(re.sub(r'\s+', ' ', m.group(1))).strip()
    t = re.split(r'\s+[|｜–—]\s+', t)[0].strip()  # "xxx | 24111" の後ろを落とす
    return t or None


def ignored_set(paths):
    if not paths:
        return set()
    r = subprocess.run(['git', 'check-ignore', '--stdin'], cwd=ROOT, input='\n'.join(paths),
                       capture_output=True, text=True)
    return set(r.stdout.split('\n')) - {''}


_TRACKED = None


def tracked():
    global _TRACKED
    if _TRACKED is None:
        r = subprocess.run(['git', 'ls-files', '-z'], cwd=ROOT, capture_output=True, text=True)
        _TRACKED = set(r.stdout.split('\0')) - {''}
    return _TRACKED


def walk():
    pages = []
    for d, dirs, files in os.walk(ROOT):
        dirs[:] = sorted(x for x in dirs if x not in EXCLUDE_DIRS and not x.startswith('.'))
        for f in files:
            if f.endswith('.html') and f not in EXCLUDE_FILES:
                pages.append(os.path.relpath(os.path.join(d, f), ROOT))
    return sorted(pages)


def is_generated_index(path):
    try:
        with open(os.path.join(ROOT, path), encoding='utf-8', errors='ignore') as f:
            return GEN_META in f.read(3000)
    except OSError:
        return False


def crumbs_html(rel):
    """rel = ページのリポジトリ相対パス"""
    parts = rel.split(os.sep)
    dirs, fname = parts[:-1], parts[-1]
    depth = len(dirs)
    up = lambda n: '../' * n
    items = []
    if not (depth == 0 and fname == 'index.html'):
        items.append(f'<a href="{up(depth)}index.html">{ROOT_LABEL}</a>')
    else:
        items.append(f'<span class="c">{ROOT_LABEL}</span>')
    for i, d in enumerate(dirs):
        is_last_dir = i == depth - 1
        lab = html.escape(label_of_dir(d))
        if is_last_dir and fname == 'index.html':
            items.append(f'<span class="c">{lab}</span>')
        else:
            items.append(f'<a href="{up(depth - i - 1)}index.html">{lab}</a>')
    if fname != 'index.html':
        t = title_of(os.path.join(ROOT, rel)) or fname[:-5]
        items.append(f'<span class="c">{html.escape(t)}</span>')
    return (f'{START}{CSS}<nav class="wl-crumbs" aria-label="breadcrumb">'
            + '<span class="s">/</span>'.join(items) + f'</nav>{END}')


def inject(rel, dry):
    path = os.path.join(ROOT, rel)
    with open(path, encoding='utf-8', errors='surrogateescape', newline='') as f:
        s = f.read()
    block = crumbs_html(rel)
    if START in s and END in s:
        new = re.sub(re.escape(START) + r'.*?' + re.escape(END), lambda _: block, s, count=1, flags=re.S)
    else:
        m = re.search(r'<body[^>]*>', s, re.I)
        if not m:
            # <body> を書かない断片HTML：charset 宣言の直後に置く（パーサが暗黙の body を作る）
            m = re.search(r'<meta[^>]*charset[^>]*>', s, re.I)
        if not m:
            return 'nobody'
        new = s[:m.end()] + '\n' + block + s[m.end():]
    if new == s:
        return 'same'
    if not dry:
        with open(path, 'w', encoding='utf-8', errors='surrogateescape', newline='') as f:
            f.write(new)
    return 'updated'


INDEX_TMPL = '''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{gen}
<title>{title}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#fff;color:#111;font-family:'Noto Sans JP',sans-serif;font-size:14px;line-height:1.7}}
.page{{max-width:880px;margin:0 auto;padding:28px 16px 80px}}
h1{{font-family:Poppins,sans-serif;font-size:1.3rem;font-weight:700;margin-bottom:4px}}
.sub{{font-size:11px;color:#888;margin-bottom:20px}}
h2{{font-family:Poppins,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#888;margin:18px 0 6px}}
ul{{list-style:none;border-top:1px solid #eee}}
li{{border-bottom:1px solid #eee}}
li a{{display:flex;gap:10px;align-items:baseline;padding:9px 4px;color:#111;text-decoration:none}}
li a:hover{{background:#f5f5f5}}
li .f{{font-family:Poppins,sans-serif;font-size:10.5px;color:#aaa;margin-left:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:45%}}
</style>
</head>
<body>
<div class="page">
<h1>{title}</h1>
<div class="sub">自動生成の一覧（gen_breadcrumbs.py）</div>
{body}
</div>
</body>
</html>
'''


def list_body(d, subdirs, files):
    body = ''
    if subdirs:
        body += '<h2>Folders</h2><ul>' + ''.join(
            f'<li><a href="{html.escape(s)}/index.html">{html.escape(label_of_dir(s))}'
            f'<span class="f">{html.escape(s)}/</span></a></li>' for s in subdirs) + '</ul>'
    if files:
        body += '<h2>Pages</h2><ul>' + ''.join(
            f'<li><a href="{html.escape(os.path.basename(f))}">'
            f'{html.escape(title_of(os.path.join(ROOT, f)) or os.path.basename(f)[:-5])}'
            f'<span class="f">{html.escape(os.path.basename(f))}</span></a></li>' for f in files) + '</ul>'
    return body


def build_indexes(pages, dry):
    """index.html が無い祖先ディレクトリに一覧ページを作る"""
    page_set = set(pages)
    need = set()
    for p in pages:
        parts = p.split(os.sep)[:-1]
        for i in range(1, len(parts) + 1):
            need.add(os.sep.join(parts[:i]))
    made = []
    for d in sorted(need):
        idx = os.path.join(d, 'index.html')
        if idx in page_set and not is_generated_index(idx):
            continue  # 手書き index はそのまま
        # 子ディレクトリ（ページを含むもの）と直下ページ
        subdirs = sorted({p.split(os.sep)[len(d.split(os.sep))] for p in pages
                          if p.startswith(d + os.sep) and len(p.split(os.sep)) > len(d.split(os.sep)) + 1})
        files = sorted([p for p in pages if os.path.dirname(p) == d and os.path.basename(p) != 'index.html'],
                       reverse=True)
        # 公開ディレクトリなら local only のページ・ディレクトリは載せない。
        # 代わりに全件版 index_local.html（*_local.html で gitignore 済み）を作り、file:// で開いた時だけリンクを出す
        idx_ignored = bool(ignored_set([idx]))
        local_link = ''
        if not idx_ignored:
            # 公開一覧に載せるのは「すでに git 管理下（＝公開済み）」のものだけ。
            # 未コミットのページ（投資先の非公開ページ等）も local 扱いにする
            tr = tracked()
            ign = {f for f in files if f not in tr} | {
                os.path.join(d, s) + '/' for s in subdirs
                if not any(t.startswith(os.path.join(d, s) + os.sep) for t in tr)
                or ignored_set([os.path.join(d, s, 'index.html')])}
            if ign:
                lidx = os.path.join(d, 'index_local.html')
                made.append(lidx)
                if not dry:
                    with open(os.path.join(ROOT, lidx), 'w', encoding='utf-8') as f:
                        f.write(INDEX_TMPL.format(gen=GEN_META, title=html.escape(label_of_dir(os.path.basename(d))) + '（local含む全件）',
                                                  body=list_body(d, subdirs, files)))
                local_link = ('<p class="sub" id="lo" hidden><a href="index_local.html">local only を含む全件 →</a></p>'
                              '<script>if(location.protocol==="file:")document.getElementById("lo").hidden=false</script>')
            files = [f for f in files if f not in ign]
            subdirs = [s for s in subdirs if os.path.join(d, s) + '/' not in ign]
        body = list_body(d, subdirs, files)
        if not body:
            body = '<p class="sub">公開ページはありません。</p>'
        body = local_link + body
        out = INDEX_TMPL.format(gen=GEN_META, title=html.escape(label_of_dir(os.path.basename(d))), body=body)
        made.append(idx)
        if not dry:
            with open(os.path.join(ROOT, idx), 'w', encoding='utf-8') as f:
                f.write(out)
    return made


def main():
    dry = '--dry-run' in sys.argv
    pages = walk()
    made = build_indexes(pages, dry)
    if not dry:
        pages = sorted(set(pages) | set(made))
    stats = {}
    for p in pages:
        r = inject(p, dry)
        stats.setdefault(r, []).append(p)
    print(f'indexes generated: {len(made)}')
    for k, v in stats.items():
        print(f'{k}: {len(v)}')
    for p in stats.get('nobody', []):
        print('  no <body>:', p)


if __name__ == '__main__':
    main()

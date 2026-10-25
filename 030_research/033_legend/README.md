# Legend

偉人のリサーチをする場所。
起業家、経営者、政治家といった方々のリサーチをまとめます。

## index.html（list view）

- 一覧は `index.html` 内の `PEOPLE` 配列から描画する（1行=1人）。タイルを手書きしない。
- 人物を追加したら1行足す: `{f, name, desc, born, died, nat[], genre[], added}`
  - `born`/`died` は年（紀元前は負数、存命は `null`）。Era は生年から自動判定。
  - `nat` は国籍（複数可）、`genre` は Founder / Investor / Tech / AI / Industrialist / Finance / Ruler / Statesman / Military / Revolutionary / Scientist / Thinker / Philanthropy / Activist / Executive から選ぶ。
  - `added` は追加日（YYYY-MM-DD）。
- フィルタはグループ内OR・グループ間AND。状態はURLハッシュに保存される。

## 人物ページの形式（2026-10-25〜）— TL;DR / Main / Terms の3タブ

時間がない時は TL;DR だけで「何者か・何を盗めるか」が分かるようにする。部品は `../_shared/research_tabs.css/js`、Terms タブは terms.js が自動で足す。手本 = `andrew_carnegie.html`。

- **TL;DR**（`<div class="sec">` ＋ `.sec-label`。`<section>` / `.section-label` は使わない＝chapters に混ざるため）：In One Line / Life in Steps / What They Achieved / Why Legend / Character / Dark Side / Quotes / Lessons for Kyo
- **Main**（`<section id>` ＋ `.section-label`）：既存本文を削らず、ラベルは `gen_chapters.py` の `CHAPTERS` に揃える。全員必須 = Why Legend / Origins / Achievements / Leadership / Philosophy / Dark Side / Legacy / Quotes / References。用語集は `Glossary`、出典は `References`（どちらも章ページには出さない）
- 既存の section id は変えない（chapters からの深いリンク先）
- 公開repoなので Lessons for Kyo に会社売却など非公開の話を書かない

## chapters/（章ごとの横断ページ）

- 各人物ページの `<section>` を `section-label`（英語ラベル）で章に振り分け、`chapters/<slug>.html` に全人物ぶん並べる（例: リーダー論 = `chapters/leadership.html`）。
- `chapters/*.html` は生成物。手で編集しない。**人物を追加・編集したら `python3 gen_chapters.py` を再実行**。
- 章の定義・ラベルの対応表は `gen_chapters.py` 冒頭の `CHAPTERS`。新しいラベルを使ったらそこに足す。CSSは `chapters/chapters.css`（手書き）。

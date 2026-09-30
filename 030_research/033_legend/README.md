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

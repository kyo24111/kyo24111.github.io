# Company

企業についてリサーチをまとめる場所。
過去の資金調達、創業メンバー、グロース、事件などを対象とします。

`index.html` は **All / Startup / Company** の3タブ構成。
- **All** … 全社のソート可能リスト（企業名・HQ・Founder/CEO・重要人物・売上・Industry）
- **Startup** … 新興・アーリー/グロース期のスタートアップ（業種別グリッド）
- **Company** … 大型・確立企業（SpaceX など）

旧フォルダ名は `035_startup`（2026-06 に `035_company` へ改称）。

## 共通コンポーネントの書き方

新規ページは直近のリサーチHTMLをコピーして作る。以下は崩れやすい箇所の決まりごと。

### Q&A（開閉式）
`<details>` の**直下に置いた要素**が回答本文になる。回答は `<div class="qa-a">` で包む。

```html
<div class="sec qa" id="sN">
  <div class="sec-label"><span class="num">N</span> Q&amp;A</div>
  <h2>事業理解のための問答</h2>
  <details>
    <summary>問い</summary>
    <div class="qa-a">答え。<strong>強調</strong>はstrong/bで。</div>
  </details>
</div>
```

- **`.qa-a` を付け忘れて生の `<p>` を置くと余白が消えてカード左端に張り付く**（2026-08 に実際に発生）。
  対策として CSS 側を `.qa details>*:not(summary)` で書いてあるので、付け忘れても崩れないが、**書き方は `.qa-a` に統一する**。
- 開いた状態は「背景=白 / 枠線=黒」に変わる。閉じている間はグレーカード。
- 640px以下では回答の左インデントを 48px → 18px に落とす（@media に記載済み）。

### 創業者プロフィール（.person）
創業者は**このページ内に細かく書く**のが既定。`033_legend/` に本人ページがある場合だけ、
そちらへ `../033_legend/<name>.html` で飛ばす（例：Peter Thiel）。

```html
<div class="person">
  <div class="p-head"><span class="p-name">名前</span><span class="p-role">Co-founder / CEO</span></div>
  <div class="p-line">年齢／出身／学歴の一行サマリ</div>
  <ul>
    <li><b>見出し：</b>本文。高校時代→大学→前職→現職の順に、<b>固有名詞と数字</b>で書く</li>
  </ul>
  <div class="p-quote">本人の発言か、第三者の評</div>
</div>
```

### コラム
本文の途中に挿し込む読み物ブロックは `.col-box`。`<span class="col-lbl">Column</span>` + `<h3>` +
小見出し `.col-sub` + 引用 `blockquote` + 数字グリッド `.col-num` で構成する。

### その他
- 金額は **M / B / T** 表記。会計ラベルと目次は英語。
- 装飾のカラーは使わない（白・グレー・黒）。意味を持つラベルのみ例外。
- 出力前に `node --experimental-websocket ~/.claude/scripts/respcheck.js <file>` で320〜1440pxを実測する。
  `nav#snavPanel` のはみ出し指摘はハンバーガーのオフキャンバス要素による既知の誤検知（`scrollWidth == viewport` なら実害なし）。

## ファイル一覧

| ファイル | 企業 | セクター | 調査日 |
|--------|------|---------|--------|
| [260417_kobold_metals_deep_research.html](260417_kobold_metals_deep_research.html) | KoBold Metals | AI × クリティカルミネラル探索 | 2026-04-17 |
| [260829_flapping_airplanes_deep_research.html](260829_flapping_airplanes_deep_research.html) | Flapping Airplanes | AI基礎研究（データ効率） | 2026-08-29 |
| [260829_etched_deep_research.html](260829_etched_deep_research.html) | Etched | Transformer専用ASIC（AI半導体） | 2026-08-29 |

# Company

企業についてリサーチをまとめる場所。
過去の資金調達、創業メンバー、グロース、事件などを対象とします。

`index.html` は **All / Startup / Company** の3タブ構成。
- **All** … 全社のソート可能リスト（企業名・HQ・Founder/CEO・重要人物・売上・Industry）
- **Startup** … 新興・アーリー/グロース期のスタートアップ（業種別グリッド）
- **Company** … 大型・確立企業（SpaceX など）

旧フォルダ名は `035_startup`（2026-06 に `035_company` へ改称）。

## 最新フォーマット（2026-10-25〜）— TL;DR / Main / Terms の3タブ

方針：**時間がない時は TL;DR だけ読めば会社が分かる**。深掘りは Main。手本 = [261017_powerx_deep_research.html](261017_powerx_deep_research.html)。
部品（タブ・左サイド目次・株価チャート）は共通ファイル `../_shared/research_tabs.css` / `research_tabs.js` を読み込むだけ。使い方は JS 冒頭のコメント。

**ページの骨格**
1. hero（h1・バッジ・`Created / Last updated`・3行以内の説明・KPI 4〜5個）
2. タブバー `<div class="ptabs" data-tabbar>` に TL;DR / Main。Terms タブは terms.js が自動で足す
3. `<div class="pane" data-pane="tldr">` … 下記の TL;DR 構成
4. `<div class="pane" data-pane="main" hidden>` … 目次＋従来の本文＋Sources（内容は削らない）

**TL;DR の構成**（sec-label は英語、本文は中学生でも分かる日本語。専門用語は一言で言い換える。各節の末尾に `Mainで詳しく →`）
| # | Label | 中身 |
|---|---|---|
| 01 | In One Line | 何の会社か・何がポイントか を2〜3文（`.oneliner`） |
| 02 | (業界の前提) | 必要なら「◯◯ブームとは」等、会社を理解する前提を1節（例：系統用蓄電所ブーム） |
| 03 | How It Makes Money | 稼ぎ方を3〜4ステップの `.flow` ＋ 儲けの源泉を1段落 |
| 04 | Key Numbers | `.tl-kpis` 4〜6個（推移は「3 → 62 → 193」の形で） |
| 05 | Why It Matters | 何がすごいか `.cards` 3〜4枚 |
| 06 | Risks | リスク `.cards.risk` 3〜5枚 |
| 07 | Stock（上場）/ Funding（未上場） | 上場：縮約版の株価チャート＋上がった理由／下がった理由／いま の3行。未上場：調達・評価額・主要株主 |
| 08 | Bottom Line (NFA) | `.verdict` に筆者の読み＋次に見るイベント表 |

**Main の決まりごと**
- 節の並び・ラベルは英語（Overview → 業界 → Business → Customers/Backlog → Financials → Founding Story → Funding → … → Competitors → Japan Connections → Stock → Valuation/Bull/Bear → Q&A → Vocabulary → Sources）
- 上場企業は **Stock: Price History & Major Moves** を必ず入れる：日足/週足チャート（`.pchart` に番号マーカー）＋番号付きの急騰・暴落タイムライン（`#mv1`…、各項目に 公式/報道/推定 タグ、理由が見つからなければ「個別材料が見当たらない」と書く）＋局面のパターン表＋Upcoming catalysts。株価データは Yahoo Finance chart API（`query1.finance.yahoo.com/v8/finance/chart/<ticker>`）で取れる
- 表はすべて `.t-wrap` で横スクロール。数字の生データは `<details class="raw">`
- 用語は `040_personal/0460_english/terms/terms_data.js` に追加（src=このページ）すると Terms タブに出る

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
| [261005_cambridge_aerospace_deep_research.html](261005_cambridge_aerospace_deep_research.html) | Cambridge Aerospace | 防衛テック（低コスト迎撃ミサイル） | 2026-10-05 |
| [261011_asml_deep_research.html](261011_asml_deep_research.html) | ASML | EUV露光装置（半導体製造装置） | 2026-10-11 |
| [261013_nucor_deep_research.html](261013_nucor_deep_research.html) | Nucor | 鉄鋼（電炉ミニミル） | 2026-10-13 |
| [261013_duke_energy_deep_research.html](261013_duke_energy_deep_research.html) | Duke Energy | 規制電力・ガス公益事業（原子力） | 2026-10-13 |
| [261017_powerx_deep_research.html](261017_powerx_deep_research.html) | PowerX | 系統用蓄電システム（BESS・国産組立／中国製セル） | 2026-10-17 |
| [261025_vertiv_deep_research.html](261025_vertiv_deep_research.html) | Vertiv | データセンター電源・冷却（液冷・UPS・スイッチギア） | 2026-10-25 |
| [261025_schneider_electric_deep_research.html](261025_schneider_electric_deep_research.html) | Schneider Electric | 電化・配電／データセンター電源・冷却／産業オートメーション | 2026-10-25 |
| [261025_novelis_deep_research.html](261025_novelis_deep_research.html) | Novelis | アルミ圧延・リサイクル（Hindalco傘下・非上場） | 2026-10-25 |

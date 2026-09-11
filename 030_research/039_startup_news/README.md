# 039_startup_news — スタートアップ・ニュース深掘り

**作成日**: 260911

---

## このフォルダについて

スタートアップの **資金調達 / M&A / IPO / プロダクト発表** のニュースを、
1件 = 1ページ（HTML）で深掘りするフォルダ。

Kyoからお題（企業名＋トピック）を投げる → そのニュースをリサーチしてページ化 → 一覧に1行追加。

- 一覧は [index.html](index.html)。各行が1ニュース＝1ページ
- カテゴリのチップで絞り込み、列見出しでソート
- 公開repo（kyo24111.github.io）配下 ＝ 第三者の機密は載せない

### メインページ（index.html）のカラム

| カラム | 内容 |
|--------|------|
| Headline | ニュースの見出し（各ページへリンク）＋当事者 |
| Date | ニュースが出た日 |
| Category | M&A・資金調達・IPO 等の複数ラベル（チップで絞り込み可） |
| Amount | 金額（EV / ラウンドサイズ など）とサブ情報 |
| Requested | Kyoが作成を依頼した日（＝ページ作成日） |
| Summary | 内容サマリ（数字を入れる） |
| Source | 一次情報のURL |

---

## 各ニュースページの構成（目安）

1. **Deal / News Summary** — 何が起きたか。KPIをheroに出す
2. **Terms** — 条件の分解（EV / equity value / ロールオーバー / クロージング時期 / アドバイザー）
3. **What the Company Is** — 事業と数字（ARR・ユーザー数・顧客数）
4. **Valuation Bridge** — 評価額の変化を分解し、マルチプルで比較
5. **Funding History** — 調達履歴。誰がいくら取り戻すか（liquidation preference）まで
6. **Why Now** — 売り手／買い手それぞれの論理
7. **Competitive Map** — 競合地図
8. **Bull / Bear** — 強気・弱気の対比表
9. **Implications** — Kyoへの示唆
10. **Q&A** — 用語と論点（`<details>` で開閉）
11. **Sources** — 一次情報を優先してリンク

## 書き方のルール

- 金額は **$1.355B / $600M / $2.2T** のようにM/B/Tで英語表記。会計ラベル（ARR / EV / Equity Value 等）とTOCも英語
- 白背景モノクローム（`#fff` / グレー / `#111`）。装飾カラーは使わない
- 一次情報（企業のプレスリリース・IR）を優先し、データベース系（PitchBook等）と食い違う場合は **表記揺れとして明記**
- 推測は「読み筋」「筆者の読み」と明示して、事実と分ける
- ファイル名は `YYMMDD_企業名_トピック.html`
- 各ページの末尾に `Last updated: YYYY-MM-DD`

---

## 収録済み

| 日付 | ニュース | ページ |
|------|----------|--------|
| 2026-09-10 | Miro、Bending Spoonsへ $1.355Bで売却 | [260911_miro_bending_spoons.html](260911_miro_bending_spoons.html) |
| 2026-01-14 | Skild AI、$1.4B Series C（評価額 $14B超） | [260911_skild_ai_series_c.html](260911_skild_ai_series_c.html) |

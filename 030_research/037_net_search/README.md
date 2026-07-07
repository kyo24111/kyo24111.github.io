# 037_net_search — ネット収集リサーチ

**作成日**: 260416 ／ **改称**: 260705（`037_other` → `037_net_search`）

---

## このフォルダについて

ネット上の **YouTube / 記事 / ポッドキャスト** を収集し、
**要約・全文（整文）・周辺知識のQ&A** に落とし込むフォルダ。

- 各コンテンツ = 1ページ（HTML）
- 一覧は [index.html](index.html)（メインページ）。各ページを行にしたテーブルで管理
- フォルダごと `.gitignore`（非公開・ローカル閲覧のみ）

### メインページ（index.html）のカラム

| カラム | 内容 |
|--------|------|
| 題名 | コンテンツのタイトル（各ページへリンク） |
| 公開日 | コンテンツが出た日（YouTube投稿日 / 記事post日） |
| ジャンル | 地政学・エネルギー・AI 等、複数ラベル（チップで絞り込み可） |
| 依頼日 | Kyoが作成を依頼した日（＝ページ作成日） |
| サマリ | 超簡単な内容サマリ |
| 元URL | 元投稿のURL |

### 各コンテンツページの中身（目安）

- TL;DR / キーポイント / 見出し付き詳細サマリ
- 整文スクリプト（情報量を保ったまま読める全文）
- 周辺知識・用語のQ&A・解説
- ※Dwarkesh系は英語原文＋日英対訳の5セクション構成（下記）

---

## Dwarkesh Podcast とは

**Dwarkesh Patel**（ドワルケシュ・パテル）によるロングフォームインタビューポッドキャスト。
AI研究者・起業家・投資家・経済学者など、世界最前線の知識人を深く掘り下げる。
トランスクリプトは [dwarkesh.com](https://www.dwarkesh.com) で全文公開。

Dwarkesh系ファイルは5セクション構成：原文（verbatim）／英語（整形版）／日本語訳（全文）／日本語（要点）／知識・単語解説。

---

## コンテンツ一覧

| ファイル | 種別 | 題名 | 公開日 | 依頼日 |
|--------|------|------|--------|--------|
| [260707_pivot_us_midterms_maga.html](260707_pivot_us_midterms_maga.html) | YouTube | MAGA分裂と隠れトランプ — 2026中間選挙（PIVOT） | 2026-07-06 | 2026-07-07 |
| [260707_pivot_inpex.html](260707_pivot_inpex.html) | YouTube | INPEXの正体 — 4兆円LNGと脱炭素（PIVOT・提供INPEX） | 2026-06-24 | 2026-07-07 |
| [260706_pivot_semiconductor_industry_map.html](260706_pivot_semiconductor_industry_map.html) | YouTube | 半導体産業の業界研究（インダストリーマップ2026・PIVOT CAREER） | 2026-07-04 | 2026-07-06 |
| [260705_pivot_sovereign_ai_1tn.html](260705_pivot_sovereign_ai_1tn.html) | YouTube | 日の丸AIに1兆円 — 国産AIは本当に可能か（PIVOT） | 2026-07-02 | 2026-07-05 |
| [260705_pivot_us_china_ai_energy.html](260705_pivot_us_china_ai_energy.html) | YouTube | 米中AI競争 主戦場は電力・エネルギーへ（PIVOT） | 2026-06-30 | 2026-07-05 |
| [260602_patrick_collison_reading.html](260602_patrick_collison_reading.html) | YouTube | Patrick Collison — 読書論 | 2018-05 | 2026-06-02 |
| [260416_dwarkesh_jensen_huang.html](260416_dwarkesh_jensen_huang.html) | Podcast | Dwarkesh × Jensen Huang（NVIDIA CEO） | 2026-04-15 | 2026-04-16 |

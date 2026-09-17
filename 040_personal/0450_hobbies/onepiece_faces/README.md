# onepiece_faces — 顔画像

- 出典: [ONE PIECE Fandom Wiki](https://onepiece.fandom.com) の各キャラクター記事のポートレート画像（アニメ立ち絵）。
  **著作権は尾田栄一郎／集英社および各アニメ製作委員会に帰属。**
  ページ側（`260911_onepiece.html`）のフッターにクレジットを記載し、`noindex, noarchive` を設定している。
- 対応表: `face_map.json`（node id → 記事タイトル / ファイル名 / 取得URL）
- 生成手順: `dl/<node id>.png` に元画像を置き `python3 crop.py` で 220x220 の顔クロップを生成。
  `crop.py` は lbpcascade_animeface で顔を検出し、画面上側かつ妥当なサイズの候補だけを採用する。
  それでもずれる場合は `crop_overrides.json` に
  `"<node id>": [一辺(Hに対する割合), 中心X(Wに対する割合), 上端Y(Hに対する割合)]` を追記して再実行。
  実行後に `sheet.html` が再生成されるので、ブラウザで開いて目視確認する（赤枠＝顔未検出＝フォールバック or 手動補正）。
- `dl/`（元画像・約48MB）と `lbpcascade_animeface.xml` は git 管理外。クロップ済みの `*.jpg` だけをコミットする。
  カスケードは [nagadomi/lbpcascade_animeface](https://github.com/nagadomi/lbpcascade_animeface) の `lbpcascade_animeface.xml` をこのフォルダに置く。
- ページ側は `ONEPIECE.faces.ids` に無い人物を頭文字アバターにフォールバックする。
  画像を足したら `260911_onepiece_data.js` の `faces.ids` にも id を追加すること。

## 未収録

- `king`（キング）— Fandom の infobox 画像が暗い夜間シーンで顔が写っておらず、
  差し替え用の `King Portrait.png` を取得しようとしたところ Cloudflare に 403 で弾かれた（レート制限）。
  時間を空けて次のように取り直す:

  ```sh
  cd onepiece_faces
  curl -sA "Mozilla/5.0" "https://onepiece.fandom.com/api.php?action=query&titles=File:King_Portrait.png&prop=imageinfo&iiprop=url&format=json"
  # 返ってきた url の /revision 以降を /revision/latest/scale-to-width-down/600 にして
  curl -sA "Mozilla/5.0" -o dl/king.png "<その URL>"
  python3 crop.py king      # ずれたら crop_overrides.json に king を追記して再実行
  ```

  取得できたら `260911_onepiece_data.js` の `faces.ids` に `"king"` を追加する。

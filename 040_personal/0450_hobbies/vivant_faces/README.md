# vivant_faces

VIVANT DB（261102_vivant.html）の顔アバター。220px正方形のJPEG、ファイル名は node id。

- 出典: TBS公式サイト『VIVANT』登場人物ページの役柄写真
  - 第2シーズン: https://www.tbs.co.jp/VIVANT_tbs/chara/ （img/<名前>.webp）
  - 第1シーズンのみの人物: https://www.tbs.co.jp/VIVANT_tbs/2023/chara/ （img/<演者名>.jpg）
- 生成: `crop.py`（OpenCV haar で顔検出 → 顔幅×1.9の正方形）。検出がずれた人は `crop_overrides.json` に [一辺(W比), 中心X(W比), 中心Y(H比)] で手動補正。
- 未収録（頭文字アバター）: F, ギリアム, ヤスダ, 上原, 坂本, キメル, 劇中の組織・作戦ノード。
- 実在の俳優の写真のため、ローカル閲覧専用。公開repoには載せない（`git add -f` しない）。

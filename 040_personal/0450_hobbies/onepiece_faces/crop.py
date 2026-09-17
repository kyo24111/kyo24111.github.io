# -*- coding: utf-8 -*-
"""dl/<id>.png  ->  <id>.jpg (220x220 の顔クロップ)

  python3 crop.py           # 全件
  python3 crop.py luffy zoro # 指定IDのみ

顔検出は lbpcascade_animeface（アニメ顔用 LBP カスケード）。
検出できない／ずれる場合は crop_overrides.json に
  "<node id>": [一辺(画像高に対する割合), 中心X(幅に対する割合), 上端Y(高に対する割合)]
を書いて再実行する。
"""
import json, os, sys
import cv2
import numpy as np
from PIL import Image

SIZE = 220
CASCADE = "lbpcascade_animeface.xml"

m = json.load(open("face_map.json"))
OV = json.load(open("crop_overrides.json")) if os.path.exists("crop_overrides.json") else {}
cc = cv2.CascadeClassifier(CASCADE)
only = set(sys.argv[1:])

def detect(path):
    """最も確からしいアニメ顔の矩形を返す。見つからなければ None。

    カスケードは胴体や装束を顔と誤検出しやすいので、
      ・画面上側（中心が高さの 62% より上）
      ・小さすぎず大きすぎない（短辺の 8〜75%）
    に候補を絞ってから「大きい・上にある」ものを選ぶ。
    """
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    if img is None:
        return None, None
    H, W = img.shape[:2]
    # 小さすぎる絵は拡大してから検出（検出窓は 24px）
    scale = max(1.0, 640 / min(H, W))
    small = cv2.resize(img, (int(W * scale), int(H * scale))) if scale > 1 else img
    gh, gw = small.shape[:2]
    gray = cv2.equalizeHist(cv2.cvtColor(small, cv2.COLOR_BGR2GRAY))

    lo, hi = min(gh, gw) * 0.08, min(gh, gw) * 0.75
    cand = []
    for sf in (1.03, 1.05, 1.08, 1.12):
        for mn in (4, 3, 2):
            for f in cc.detectMultiScale(gray, scaleFactor=sf, minNeighbors=mn,
                                         minSize=(int(lo),) * 2):
                x, y, w, h = f
                if not (lo <= h <= hi):
                    continue
                if (y + h / 2) / gh > 0.62:       # 下半身の誤検出を捨てる
                    continue
                cand.append((f, mn))
    if not cand:
        return None, (W, H)
    # 大きさ × 上寄り × 検出の固さ で採点
    def score(c):
        (x, y, w, h), mn = c
        return w * h * (1.7 - (y + h / 2) / gh) * (1 + 0.15 * mn)
    best = max(cand, key=score)[0]
    return [int(v / scale) for v in best], (W, H)

def box_from_face(f, W, H):
    x, y, w, h = f
    side = int(h * 1.95)                 # 髪と肩が入るくらいまで広げる
    cx = x + w / 2
    cy = y + h * 0.42                    # 顔の中心よりやや上に寄せる
    return int(cx - side / 2), int(cy - side / 2), side

def box_fallback(W, H):
    r = H / W
    side = int(H * 0.34) if r > 1.6 else (min(W, H) if r <= 1.35 else int(W * 0.8))
    return (W - side) // 2, 0, side

rows, nodet = [], []
for i in m:
    if only and i not in only:
        continue
    p = "dl/%s.png" % i
    f, wh = detect(p)
    if wh is None:
        print("skip (no file):", i); continue
    W, H = wh
    if f is not None:
        x, y, side = box_from_face(f, W, H)
    else:
        x, y, side = box_fallback(W, H); nodet.append(i)
    o = OV.get(i)
    if isinstance(o, list):              # 手動補正
        side = int(H * o[0]); x = int(W * o[1] - side / 2); y = int(H * o[2])
    side = max(24, min(side, W, H))
    x = max(0, min(W - side, x)); y = max(0, min(H - side, y))
    im = Image.open(p).convert("RGB").crop((x, y, x + side, y + side)).resize((SIZE, SIZE), Image.LANCZOS)
    im.save("%s.jpg" % i, "JPEG", quality=86, optimize=True)
    rows.append(i)

# 目視確認用のコンタクトシート
html = ["<meta charset='utf-8'><style>body{font-family:sans-serif;background:#fff;margin:0;padding:12px}",
        "div{display:inline-block;width:104px;text-align:center;margin:3px;font-size:11px;vertical-align:top}",
        "img{width:96px;height:96px;border-radius:50%;object-fit:cover;border:1px solid #ddd}",
        ".nd img{border:2px solid #c00}</style>"]
for i in m:
    if not os.path.exists("%s.jpg" % i):
        continue
    cls = " class='nd'" if i in nodet else ""
    html.append("<div%s><img src='%s.jpg?v=%d'><br>%s<br><span style='color:#999'>%s</span></div>"
                % (cls, i, os.path.getmtime("%s.jpg" % i), m[i]["name"] or i, i))
open("sheet.html", "w").write("".join(html))
print("done", len(rows), "/ 顔未検出:", nodet)

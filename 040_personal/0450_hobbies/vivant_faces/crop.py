import cv2, json, os, sys, numpy
from PIL import Image
M = {"nogi":"s2_big_nogi.webp","nozaki":"s2_big_nozaki.webp","noko":"s2_big_nokor.webp","kurosu":"s2_big_kurosu.webp",
 "kaoru":"s2_big_yuzuki.webp","sano":"s2_big_sano.webp","shinjo":"s2_big_shinjo.webp","nagano":"s2_big_nagano.webp",
 "tojo":"s2_big_tojo.webp","ali":"s2_big_ali.webp","sakurai":"s2_big_sakurai.webp","hiromichi":"s2_big_hiromichi.webp",
 "chinggis":"s2_big_cinggis.webp","drum":"s2_big_drum.webp","kumagai":"s2_big_kumagai.webp","hirose":"s2_big_hirose.webp",
 "suzuki":"s2_big_suzuki.webp","ota":"s2_big_ota.webp","jamiin":"s2_big_jemaine.webp","usami":"s2_big_usami.webp",
 "mata":"s2_big_mata.webp","adiel":"s2_big_adiel.webp","shichi":"s2_big_shichi.webp","takada":"s2_big_takada.webp",
 "wada":"s2_big_wada.webp","hayato":"s2_big_hayato.webp","chocky":"s2_big_chocky.webp","han":"s2_big_fan.webp",
 "zhang":"s2_big_zhang.webp","liu":"s2_big_liu.webp","elisha":"s2_big_elisha.webp","li":"s2_big_mingze.webp",
 "zhou":"s2_big_zhou.webp","ton":"s2_big_tong.webp","gerun":"s2_big_gern.webp","tashiro":"s2_big_tashiro.webp",
 "isaku":"s2_big_isaac.webp","tairan":"s2_big_taylan.webp","beki":"s2_big_beki.webp","batraka":"s2_big_batraka.webp",
 "piyo":"s2_big_piyo.webp","yamamoto":"s1_sakota.jpg","akemi":"s1_takanashi.jpg","wanizu":"s1_kochi.jpg",
 "nishioka":"s1_dan.jpg","sam":"s1_martin.jpg","iria":"s1_marin.jpg","kawai":"s1_watanabe.jpg","zair":"s1_erkhembayar.jpg"}
OV = json.load(open("crop_overrides.json")) if os.path.exists("crop_overrides.json") else {}
cd = cv2.data.haarcascades
fr = cv2.CascadeClassifier(cd+"haarcascade_frontalface_default.xml")
pr = cv2.CascadeClassifier(cd+"haarcascade_profileface.xml")
os.makedirs("faces", exist_ok=True); log = {}
for i, f in M.items():
    p = "raw/"+f
    im = Image.open(p).convert("RGB"); W, H = im.size
    g = cv2.cvtColor(cv2.imread(p) if not p.endswith(".webp") else cv2.cvtColor(__import__("numpy").array(im), cv2.COLOR_RGB2BGR), cv2.COLOR_BGR2GRAY)
    ms = int(min(W,H)*0.12)
    cands = list(fr.detectMultiScale(g,1.08,6,minSize=(ms,ms)))
    if not cands:
        cands = list(pr.detectMultiScale(g,1.08,5,minSize=(ms,ms)))
        flip = cv2.flip(g,1)
        cands += [(W-x-w,y,w,h) for (x,y,w,h) in pr.detectMultiScale(flip,1.08,5,minSize=(ms,ms))]
    if cands:
        x,y,w,h = max(cands, key=lambda r:r[2]*r[3])
        side = int(w*1.9); cx = x+w/2; cy = y+h*0.45
        src = "det"
    else:
        side = int(W*0.62); cx = W/2; cy = H*0.30; src = "fallback"
    o = OV.get(i)
    if o: side=int(W*o[0]); cx=W*o[1]; cy=H*o[2]; src="override"
    side = max(40, min(side, W, H))
    x0 = int(max(0, min(W-side, cx-side/2))); y0 = int(max(0, min(H-side, cy-side/2)))
    im.crop((x0,y0,x0+side,y0+side)).resize((220,220), Image.LANCZOS).save("faces/%s.jpg"%i, "JPEG", quality=85, optimize=True)
    log[i]=src
# contact sheet
ids=list(M); cols=10; S=110
sheet=Image.new("RGB",(cols*S,((len(ids)+cols-1)//cols)*(S+14)),"white")
from PIL import ImageDraw; d=ImageDraw.Draw(sheet)
for k,i in enumerate(ids):
    t=Image.open("faces/%s.jpg"%i).resize((S-6,S-6)); X=(k%cols)*S; Y=(k//cols)*(S+14)
    sheet.paste(t,(X+3,Y+3)); d.text((X+4,Y+S-2),i+("*" if log[i]!="det" else ""),fill=(200,0,0) if log[i]=="fallback" else (0,0,0))
sheet.save("sheet.jpg")
print({k:v for k,v in log.items() if v!="det"})

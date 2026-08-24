import json,os,sys
from PIL import Image
m=json.load(open("face_map.json"))
OV=json.load(open("crop_overrides.json")) if os.path.exists("crop_overrides.json") else {}
os.makedirs("faces",exist_ok=True)
for i,v in m.items():
    im=Image.open("dl/%s.png"%i).convert("RGBA"); W,H=im.size
    a=im.getchannel("A")
    bbox=a.getbbox() if a.getextrema()[0]<250 else None
    if bbox:
        L,T,R,B=bbox; bw,bh=R-L,B-T
        ratio=bh/max(1,bw)
        side=int(bh*0.20) if ratio>1.6 else (int(bh*0.30) if ratio>1.25 else min(bw,bh))
        side=max(side,int(bw*0.20))
        band=(T,min(B,T+int(side*0.7)))
        px=a.crop((L,band[0],R,band[1])).load()
        hh=band[1]-band[0]; tot=sx=0
        for x in range(0,bw,max(1,bw//200)):
            c=sum(px[x,y] for y in range(0,hh,max(1,hh//30)))
            tot+=c; sx+=c*x
        cx=L+(sx/tot if tot else bw/2)
        x=int(cx-side/2); y=T-int(side*0.10)
    else:
        ratio=H/W
        side=int(H*0.30) if ratio>1.6 else (min(W,H) if ratio<=1.35 else int(W*0.75))
        x=(W-side)//2; y=0
    o=OV.get(i)
    if isinstance(o,list):   # 手動補正: [一辺(H比), 中心X(W比), 上端Y(H比)]
        side=int(H*o[0]); x=int(W*o[1]-side/2); y=int(H*o[2])
    side=max(24,min(side,W,H))
    x=max(0,min(W-side,x)); y=max(0,min(H-side,y))
    c=im.crop((x,y,x+side,y+side)).resize((220,220),Image.LANCZOS)
    bg=Image.new("RGB",(220,220),(255,255,255)); bg.paste(c,(0,0),c)
    bg.save("faces/%s.jpg"%i,"JPEG",quality=85,optimize=True)
html=["<style>body{font-family:sans-serif;background:#fff;margin:0;padding:12px}",
"div{display:inline-block;width:104px;text-align:center;margin:3px;font-size:11px}",
"img{width:96px;height:96px;border-radius:50%;object-fit:cover;border:1px solid #ddd}</style>"]
for i,v in m.items(): html.append(f'<div><img src="faces/{i}.jpg?v={os.path.getmtime("faces/%s.jpg"%i)}"><br>{v["name"]}</div>')
open("sheet.html","w").write("".join(html))
print("done",len(m))

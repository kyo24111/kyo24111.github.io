/* ============================================================
   筋トレメニュー — 種目定義
   1つの定義から「テキスト」「3Dアニメーション」「使用筋のハイライト」を生成する。
   ------------------------------------------------------------
   pose : 関節名 → {x,y,z}（度）。基準姿勢は直立（人体アトラスの素の姿勢）
     関節: root spine chest neck head
           armL armR foreL foreR handL handR
           thighL thighR shinL shinR footL footR
     root は位置も動かせる: {x:90, py:-4} のように py/px/pz で平行移動
   timeline : [{t:0〜1, pose:'名前', label:'表示'}] を線形補間して再生
   targets  : 人体アトラス(260824_body_3d_data.js)の部位idと、働き方
     side  'core'   … 体幹。伸ばしている間ずっと強く働く
           'legExt' … 伸ばしている脚の側
           'legSup' … 床に着いている膝の側
           'armExt' … 伸ばしている腕の側
           'armSup' … 床を押している腕の側
   ============================================================ */

const WORKOUTS = [
{
  id:'birddog', name:'バードドッグ', en:'Bird Dog',
  kind:'体幹（抗回旋・抗伸展）', level:'基礎', equip:'マットのみ',
  reps:'左右交互に各8〜10回 × 3セット',
  tempo:'伸ばす3秒 → キープ3〜5秒 → 戻す3秒',
  summary:'四つ這いから対角の手足を伸ばす。体幹が「捻られない・反らされない」ように耐える種目。',

  aim:'手足を動かすことで体幹に回転と反りの力がかかる。それに抵抗して背中を一直線に保つのが目的。多裂筋と腹横筋を同時に働かせる感覚を覚える種目で、腰痛のリハビリでも最初に出てくる。鍛えるというより「体幹が漏れない状態」を作る練習。',

  how:[
    '四つ這いになる。手は肩の真下、膝は股関節の真下。足幅・手幅は腰幅。',
    '背中を一直線に。腰を反らさず、丸めすぎない。息を吐いて下腹を軽く締める。',
    '右手と左脚を、体と一直線になる高さまでゆっくり伸ばす。上げすぎない。',
    '3〜5秒キープ。呼吸は止めない。',
    'ゆっくり戻して、反対（左手と右脚）。'
  ],

  cues:[
    {t:'手でしっかり地面を押して、胸を床から遠ざける', mus:['serratus_ant','trap_lower'],
     body:'肩がすくんで胸が沈むと、肩甲骨が背中から浮いて体幹が支えられない。床を押し返して胸を天井方向へ遠ざけると前鋸筋が働き、肩甲骨が胸郭に張り付いて土台が固まる。「支えている腕」の仕事。'},
    {t:'頭の位置は背中の一直線の続きに', mus:['deep_neck_flex','splenius'],
     body:'顎が上がると首が反り、その反りが背中に伝わって腰まで反る。顎を軽く引いて、後頭部が背中のラインの延長に乗るところで止める。床を見るのではなく、手の少し前の床を視界に置く。'},
    {t:'手足を上げるときに左右にブレない', mus:['ext_oblique','int_oblique','quadratus_lumb','glute_med'],
     body:'この種目の本題。手足を伸ばすと体が捻られる方向に力がかかる。腰の上にコップを置いて水をこぼさないイメージで、骨盤を床と平行に保つ。ブレるなら可動域を下げてよい。'},
    {t:'伸ばした手足は「体と一直線」まで', mus:['glute_max','longissimus'],
     body:'高く上げるほど効くわけではない。水平を超えると腰が反り、大臀筋ではなく腰で上げていることになる。写真の点線＝肩から踵までが一本の線になる高さが上限。'}
  ],

  mistakes:[
    '腰が反る（＝腹圧が抜けて脊柱起立筋だけで支えている）',
    '骨盤が開く・傾く（＝抗回旋ができていない。上げる高さを下げる）',
    '手足を高く上げすぎる（水平まででよい）',
    '速く動かす（反動で誤魔化せてしまう。ゆっくりが本質）',
    '呼吸を止める（腹圧を息止めで作ると横隔膜が動かない）'
  ],

  progression:'安定してきたら ①キープを10秒に延ばす ②伸ばした手足で小さく円を描く ③膝を床から数cm浮かせる（ベアポジション）。逆に難しければ、手だけ／脚だけの片側から。',

  /* ───────── ポーズ ───────── */
  poses:{
    /* 全ての回転が X 軸まわり＝y-z平面の2次元なので、合成回転は角度の足し算になる。
       腕(肩→手首 53)と大腿(股→膝 40)の長さの差 13 を体幹の傾き 77° で吸収すると、
       手首と膝が同じ高さ（＝両方が床に着く）になる。写真の点線が少し下がるのと同じ。
       各関節角 = 「その体節の合計回転」－「親までの合計」で決めている:
         合計 0   → 真下   / 合計 90  → 後方水平 / 合計 -90 → 前方水平 */
    quad:{
      root:{x:77}, spine:{x:0}, chest:{x:0}, neck:{x:6}, head:{x:2},
      armL:{x:-77}, armR:{x:-77}, foreL:{x:0}, foreR:{x:0}, handL:{x:-90}, handR:{x:-90},
      thighL:{x:-77}, thighR:{x:-77}, shinL:{x:90}, shinR:{x:90}, footL:{x:90}, footR:{x:90}
    },
    /* 右手＋左脚を伸ばした状態（伸ばした手足は水平） */
    extR:{
      root:{x:77}, spine:{x:-1.5}, chest:{x:-1.5}, neck:{x:7}, head:{x:2},
      armR:{x:-167, z:-3}, foreR:{x:0}, handR:{x:0},
      armL:{x:-77}, foreL:{x:0}, handL:{x:-90},
      thighL:{x:13, z:2}, shinL:{x:0}, footL:{x:75},
      thighR:{x:-77}, shinR:{x:90}, footR:{x:90}
    },
    /* 左手＋右脚（左右反転） */
    extL:{
      root:{x:77}, spine:{x:-1.5}, chest:{x:-1.5}, neck:{x:7}, head:{x:2},
      armL:{x:-167, z:3}, foreL:{x:0}, handL:{x:0},
      armR:{x:-77}, foreR:{x:0}, handR:{x:-90},
      thighR:{x:13, z:-2}, shinR:{x:0}, footR:{x:75},
      thighL:{x:-77}, shinL:{x:90}, footL:{x:90}
    }
  },

  cycle:9.0,
  timeline:[
    {t:0.00, pose:'quad', label:'セットアップ'},
    {t:0.07, pose:'quad', label:'セットアップ'},
    {t:0.24, pose:'extR', label:'伸ばす（右手・左脚）'},
    {t:0.43, pose:'extR', label:'キープ'},
    {t:0.51, pose:'quad', label:'戻す'},
    {t:0.57, pose:'quad', label:'四つ這い'},
    {t:0.74, pose:'extL', label:'伸ばす（左手・右脚）'},
    {t:0.93, pose:'extL', label:'キープ'},
    {t:1.00, pose:'quad', label:'戻す'}
  ],
  /* 伸ばしている側（アニメの位相から自動判定するためのヒント） */
  extSide:[{from:0.07, to:0.51, arm:'R', leg:'L'}, {from:0.57, to:1.00, arm:'L', leg:'R'}],
  /* 一直線ガイド（肩→伸ばした踵）を引く */
  guide:true,

  targets:[
    {id:'multifidus',     role:'主働', w:1.00, side:'core',   why:'椎骨1個ずつを押さえて背中を一直線に保つ。この種目の主役。'},
    {id:'transverse_abd', role:'主働', w:0.95, side:'core',   why:'腹圧を作って前から脊柱を支える。息を吐いて下腹が薄くなる感覚。'},
    {id:'glute_max',      role:'主働', w:1.00, side:'legExt', why:'伸ばした脚を水平まで持ち上げる。腰で上げているなら効いていない。'},
    {id:'longissimus',    role:'主働', w:0.90, side:'core',   why:'脊柱の伸展を保つ。ただしここだけ張るのは腹圧が抜けたサイン。'},
    {id:'iliocostalis',   role:'主働', w:0.85, side:'core',   why:'外側の列。側屈方向のブレも止める。'},
    {id:'ext_oblique',    role:'抗回旋', w:0.82, side:'core', why:'手足を伸ばすと体幹が捻られる。その回転に抵抗する。'},
    {id:'int_oblique',    role:'抗回旋', w:0.80, side:'core', why:'外腹斜筋と斜めのペアで、骨盤を床と平行に保つ。'},
    {id:'quadratus_lumb', role:'抗回旋', w:0.75, side:'core', why:'骨盤の左右の落ち込みを止める。片側だけ張るなら左右差のサイン。'},
    {id:'glute_med',      role:'抗回旋', w:0.78, side:'legSup', why:'床側の膝で骨盤が落ちるのを止める。支持側の仕事。'},
    {id:'serratus_ant',   role:'土台', w:0.72, side:'armSup', why:'床を押して胸を遠ざける。肩甲骨を胸郭に張り付けて支持を作る。'},
    {id:'trap_lower',     role:'土台', w:0.66, side:'armSup', why:'肩甲骨を下げて、肩がすくむのを防ぐ。'},
    {id:'biceps_femoris', role:'補助', w:0.68, side:'legExt', why:'大臀筋と一緒に股関節を伸展。ここだけ強く張るなら臀筋が使えていない。'},
    {id:'semitendinosus', role:'補助', w:0.58, side:'legExt', why:'同じく股関節の伸展。膝が曲がらないよう保つ。'},
    {id:'delt_ant',       role:'補助', w:0.60, side:'armExt', why:'伸ばした腕を水平まで保持する。'},
    {id:'spinalis',       role:'補助', w:0.58, side:'core',   why:'最内側の列。多裂筋と協調して分節を制御。'},
    {id:'deep_neck_flex', role:'補助', w:0.56, side:'core',   why:'顎を引いて頭を背中のラインに乗せる。首の反りを止める。'},
    {id:'triceps',        role:'補助', w:0.52, side:'armSup', why:'肘を伸ばしたまま体重を支える。'},
    {id:'pelvic_floor',   role:'補助', w:0.50, side:'core',   why:'腹圧の床。横隔膜・腹横筋・多裂筋と4枚で腹腔を締める。'},
    {id:'diaphragm',      role:'補助', w:0.42, side:'core',   why:'呼吸を止めずに腹圧を保つ。天井側の担当。'},
    {id:'rectus_abd',     role:'補助', w:0.34, side:'core',   why:'反り方向に引っ張られるのを止める。丸める側の主役ではない。'},
    {id:'lats',           role:'補助', w:0.32, side:'armSup', why:'胸腰筋膜を介して腰と腕をつなぐ。支持側で張力を作る。'}
  ]
}
];

if (typeof module !== 'undefined') module.exports = { WORKOUTS };

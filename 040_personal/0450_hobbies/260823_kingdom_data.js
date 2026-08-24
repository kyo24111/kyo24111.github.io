/* ============================================================
   キングダム リサーチDB — データ定義
   収録範囲: 単行本1巻 〜 山陽攻略戦・廉頗登場時点（それ以降のネタバレは未収録）
   巻数は目安。追記するときは KINGDOM.nodes に足すだけでグラフ／表／詳細に反映される。
   ------------------------------------------------------------
   node schema
     id      : 一意キー（英数字）
     name    : 表示名
     yomi    : ふりがな（検索対象）
     kind    : 'person' | 'battle' | 'faction'
     state   : 国・勢力（バッジ色のキー: 秦/趙/魏/山界/蚩尤/複数）
     group   : 所属（飛信隊・王騎軍 など）
     role    : 立場（battle は結果）
     klass   : 分類（武将/軍師/王・王族/文官/山の民/刺客/兵/戦い/勢力）
     first   : 初登場（目安）
     arc     : 登場編
     status  : 存命/戦死/離脱/決着/進行中 など
     tags    : 検索用タグ
     summary : 1行要約
     detail  : [{h: 見出し, body: 本文}]
     battles : 参加した戦い node id
     rel     : [{to: id, label: 関係}]  ← グラフの辺になる
   ============================================================ */

const KINGDOM = {
  meta: {
    title: "キングダム リサーチDB",
    range: "アニメ 第1〜4シリーズ／原作 1〜40巻",
    note: "話数はシリーズごとに1から数えています（第1期38話・第2期39話・第3期26話・第4期26話）。第5シリーズ（鄴攻め編）以降は未収録。話数・巻数は目安です。",
    updated: "2026-08-23"
  },

  nodes: [

  /* ───────────── 勢力 ───────────── */
  {
    id:"f_shin", name:"秦", yomi:"しん", kind:"faction", state:"秦", group:"七国",
    role:"中華西方の大国", klass:"勢力", first:"1巻", arc:"—", status:"—",
    tags:["国","七国","咸陽"],
    summary:"嬴政が王位に就く西方の大国。物語の主舞台。",
    detail:[
      {h:"位置づけ", body:"中華西端の大国。長平の戦いで趙に大打撃を与えて以来、他国から『化け物の国』として恐れられている。"},
      {h:"内政", body:"作中序盤は幼王・嬴政と相国・呂不韋の二頭体制。実権は呂不韋側にあり、王の親政が最初の政治的テーマになる。"},
      {h:"軍", body:"かつて六大将軍という絶対的な将軍位があったが、昭王の死とともに制度は失われ、序盤時点で存命は王騎のみ。"}
    ],
    rel:[]
  },
  {
    id:"f_chou", name:"趙", yomi:"ちょう", kind:"faction", state:"趙", group:"七国",
    role:"秦の宿敵", klass:"勢力", first:"1巻", arc:"—", status:"—",
    tags:["国","七国","長平","邯鄲"],
    summary:"長平の遺恨を抱える秦の宿敵。三大天を擁する軍事国家。",
    detail:[
      {h:"位置づけ", body:"秦の東隣。長平の戦いで四十万を生き埋めにされた恨みが国民感情の底に残っており、対秦感情がもっとも激しい国。"},
      {h:"三大天", body:"趙の将軍位の頂点。廉頗もかつてその一人だったが、王の代替わりで国を追われている。"}
    ],
    rel:[]
  },
  {
    id:"f_gi", name:"魏", yomi:"ぎ", kind:"faction", state:"魏", group:"七国",
    role:"中華中央の国", klass:"勢力", first:"5巻", arc:"蛇甘平原の戦い", status:"—",
    tags:["国","七国","中央"],
    summary:"中華中央に位置する国。序盤の秦の主な相手。",
    detail:[
      {h:"位置づけ", body:"中華の中央にあり、秦にとって東進の通り道。蛇甘平原・山陽と、序盤の大きな戦いの相手になる。"},
      {h:"戦力", body:"武神・呉慶を失った後、他国から亡命してきた廉頗とその四天王を国境の要衝に据えている。"}
    ],
    rel:[]
  },
  {
    id:"f_sankai", name:"山界（山の民）", yomi:"さんかい やまのたみ", kind:"faction", state:"山界", group:"山界",
    role:"山岳の民の連合", klass:"勢力", first:"2巻", arc:"王都奪還編", status:"—",
    tags:["山の民","楊端和","同盟"],
    summary:"秦の西の山岳地帯に住む民。楊端和がまとめ、政と同盟を結ぶ。",
    detail:[
      {h:"歴史", body:"かつて秦の穆公と友好関係にあったが、後の裏切りによって断絶。以来、平地の人間を敵とみなしてきた。"},
      {h:"同盟", body:"嬴政が単身山界に乗り込み、五百年前の盟約を持ち出して再同盟に成功。王都奪還の決定打になる。"}
    ],
    rel:[]
  },
  {
    id:"f_hishin", name:"飛信隊", yomi:"ひしんたい", kind:"faction", state:"秦", group:"秦軍",
    role:"信が率いる部隊", klass:"勢力", first:"10巻", arc:"馬陽の戦い", status:"—",
    tags:["部隊","信","百人将","千人将"],
    summary:"信を隊長とする特務隊。馬陽で百人隊として結成された。",
    detail:[
      {h:"名の由来", body:"王騎が信に与えた名。『飛信隊』の旗を掲げて戦うことになる。"},
      {h:"性格", body:"寄せ集めの歩兵から始まり、少数で敵将首を狙う突撃力が持ち味。軍師役に河了貂が就く。"}
    ],
    rel:[]
  },
  {
    id:"f_ouki", name:"王騎軍（のち騰軍）", yomi:"おうきぐん とうぐん", kind:"faction", state:"秦", group:"秦軍",
    role:"秦最大級の私兵軍団", klass:"勢力", first:"8巻", arc:"馬陽の戦い", status:"—",
    tags:["部隊","王騎","騰"],
    summary:"六大将軍・王騎が率いた精鋭軍団。王騎の死後は騰が引き継ぐ。",
    detail:[
      {h:"規模", body:"数万規模の軍を将軍個人が抱える、秦でも別格の軍団。統率は副官・騰が握っている。"}
    ],
    rel:[]
  },
  {
    id:"f_ryofui", name:"呂不韋派", yomi:"りょふいは", kind:"faction", state:"秦", group:"朝廷",
    role:"相国を頂点とする政治勢力", klass:"勢力", first:"3巻", arc:"王都奪還編", status:"—",
    tags:["政治","朝廷","四柱"],
    summary:"相国・呂不韋を中心とする朝廷の主流派。四柱が支える。",
    detail:[
      {h:"構成", body:"呂不韋を頂点に、昌平君（軍）・李斯（法）・蔡沢（外交）・司馬空（土木）の『四柱』が実務を担う。"},
      {h:"対立軸", body:"王の親政を望む政派（昌文君・壁ら）と、実権を握り続けたい呂不韋派の綱引きが序盤の政治パート。"}
    ],
    rel:[]
  },
  {
    id:"f_seiha", name:"大王派", yomi:"だいおうは", kind:"faction", state:"秦", group:"朝廷",
    role:"嬴政を支える少数派", klass:"勢力", first:"1巻", arc:"王都奪還編", status:"—",
    tags:["政治","朝廷"],
    summary:"嬴政の親政を目指す一派。序盤は圧倒的少数。",
    detail:[
      {h:"顔ぶれ", body:"昌文君を筆頭に、壁ら少数の武官・文官。政治力でも兵力でも呂不韋派に大きく劣る。"}
    ],
    rel:[]
  },
  {
    id:"f_shiyuu", name:"蚩尤（蚩尤族）", yomi:"しゆう", kind:"faction", state:"蚩尤", group:"—",
    role:"暗殺者の一族", klass:"勢力", first:"15巻", arc:"蚩尤編", status:"—",
    tags:["暗殺","羌瘣","儀式"],
    summary:"歴代『蚩尤』の座を継承儀式で争う、山中の暗殺者一族。",
    detail:[
      {h:"儀式", body:"数十年に一度、一族の精鋭が殺し合い、最後の一人が『蚩尤』を襲名する。羌瘣の過去そのもの。"},
      {h:"武", body:"呼吸を用いた『巫舞』により、一時的に人間離れした速度を得る。"}
    ],
    rel:[]
  },

  /* ───────────── 秦：主要人物 ───────────── */
  {
    id:"shin", name:"信", yomi:"しん りしん", kind:"person", state:"秦", group:"飛信隊",
    role:"主人公 / 歩兵 → 百人将 → 千人将 → 三千人将 → 五千人将", klass:"武将", first:"1巻", arc:"王都奪還編", status:"存命",
    tags:["主人公","飛信隊","天下の大将軍","下僕"],
    summary:"下僕から身を起こし、天下の大将軍を目指す少年。",
    detail:[
      {h:"出自", body:"城戸村の戦争孤児で、漂とともに下僕として育つ。剣の腕だけを頼りに『天下の大将軍』を目指す。"},
      {h:"転機", body:"漂の死をきっかけに嬴政と出会い、成蟜の反乱鎮圧で武功を挙げて士官。以後、戦のたびに階級を上げていく。"},
      {h:"戦い方", body:"型より本能。敵将の首だけを見て突っ込む。王騎から矛を受け継ぎ、単騎の武から『将としての視野』へ課題が移っていく。"},
      {h:"人間関係", body:"政とは『同じ夢を語り合った仲』。河了貂・羌瘣とは飛信隊の中核として苦楽をともにする。"},
      {h:"山陽以降", body:"山陽で輪虎を討ち、三千人将へ。合従軍では函谷関で楚軍と、続く蕞で李牧軍と戦い、龐煖と再び相見える。"},
      {h:"黒羊", body:"桓騎の指揮下で黒羊丘へ。将としての正しさを問われながら慶舎を討ち、五千人将となる。"}
    ],
    battles:["b_outo","b_dakan","b_bayou","b_sanyou","b_kankoku","b_sai","b_kokuyou"],
    rel:[
      {to:"hyou", label:"親友"},
      {to:"sei", label:"盟友"},
      {to:"tenn", label:"仲間"},
      {to:"kyoukai", label:"仲間"},
      {to:"ouki", label:"師"},
      {to:"f_hishin", label:"隊長"},
      {to:"ouhon", label:"好敵手"},
      {to:"mouten", label:"好敵手"},
      {to:"houken", label:"因縁"}
    ]
  },
  {
    id:"hyou", name:"漂", yomi:"ひょう", kind:"person", state:"秦", group:"—",
    role:"信の親友 / 王の影武者", klass:"兵", first:"1巻", arc:"王都奪還編", status:"戦死",
    tags:["影武者","1巻","起点"],
    summary:"信の親友。王の影武者に取り立てられ、命を落とす。",
    detail:[
      {h:"役割", body:"昌文君に見出され、政の影武者として王宮へ。反乱の際に襲撃を受け、瀕死で信のもとへたどり着く。"},
      {h:"意味", body:"漂が地図に残した場所へ信が向かったことで、物語のすべてが動き出す。信にとって『大将軍』の夢は二人分になる。"}
    ],
    battles:["b_outo"],
    rel:[{to:"shin", label:"親友"},{to:"sei", label:"影武者"},{to:"shoubunkun", label:"主君"}]
  },
  {
    id:"sei", name:"嬴政", yomi:"えいせい せい", kind:"person", state:"秦", group:"大王派",
    role:"秦王", klass:"王・王族", first:"1巻", arc:"王都奪還編", status:"存命",
    tags:["秦王","中華統一","趙生まれ"],
    summary:"中華統一を掲げる若き秦王。のちの始皇帝。",
    detail:[
      {h:"出自", body:"人質として趙で生まれ育ち、幼少期に凄惨な迫害を受ける。その経験が『戦のない中華』という理想の原点になる。"},
      {h:"即位直後", body:"十三で即位するが実権はなく、弟・成蟜の反乱で王座を追われる。山の民との同盟で王都を奪還した。"},
      {h:"政治", body:"呂不韋との権力闘争が続く。武力ではなく理念で人を動かすタイプで、山の民も、家臣も、その言葉で味方に変えてきた。"},
      {h:"蕞", body:"合従軍に王都の喉元まで攻め込まれたとき、自ら蕞へ入り、兵ではない住民に向かって語りかけた。言葉で人を動かすという資質が、そのまま国の存亡を決める場面。"}
    ],
    battles:["b_outo","b_sai"],
    rel:[
      {to:"shin", label:"盟友"},
      {to:"seikyou", label:"異母弟"},
      {to:"shika", label:"恩人"},
      {to:"taigo", label:"母"},
      {to:"ryofui", label:"対立"},
      {to:"shoubunkun", label:"腹心"},
      {to:"youtanwa", label:"同盟"},
      {to:"f_seiha", label:"中心"}
    ]
  },
  {
    id:"tenn", name:"河了貂", yomi:"かりょうてん", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 軍師", klass:"軍師", first:"1巻", arc:"王都奪還編", status:"存命",
    tags:["軍師","梟鳴","蓑"],
    summary:"梟鳴一族の生き残り。飛信隊の軍師として成長していく。",
    detail:[
      {h:"出自", body:"蓑を被った鳥使いの一族・梟鳴の最後の一人。当初は生き延びるために信と政に同行した。"},
      {h:"転向", body:"戦場で『自分にできること』を突きつけられ、武ではなく軍師の道を選ぶ。昌平君の兵法学校で学び、飛信隊に軍師として戻る。"},
      {h:"役割", body:"突撃一辺倒の飛信隊に、初めて戦術的な意思決定を持ち込む存在。"}
    ],
    battles:["b_outo","b_bayou","b_sanyou","b_kankoku","b_sai","b_kokuyou"],
    rel:[{to:"shin", label:"仲間"},{to:"shouheikun", label:"師"},{to:"f_hishin", label:"軍師"},{to:"kyoukai", label:"仲間"}]
  },
  {
    id:"kyoukai", name:"羌瘣", yomi:"きょうかい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 副長格 / 元蚩尤族の刺客", klass:"刺客", first:"6巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["蚩尤","巫舞","復讐","飛信隊"],
    summary:"蚩尤族出身の暗殺者。仇討ちのため一時飛信隊を離れる。",
    detail:[
      {h:"出自", body:"蚩尤の継承儀式を生き延びた刺客。姉のように慕った羌象を儀式で失い、その仇を追っている。"},
      {h:"巫舞", body:"呼吸を極限まで整えることで一時的に常識外れの速度を得る秘技。使用後の反動が大きい。"},
      {h:"飛信隊", body:"目的のために秦軍へ潜り込んだはずが、信たちと戦ううちに居場所になっていく。復讐のため一度隊を離れる。"},
      {h:"帰還", body:"幽連との決着をつけ、合従軍の危機に飛信隊へ戻る。蕞では隊の中核として城壁を守り抜いた。"}
    ],
    battles:["b_dakan","b_bayou","b_sai","b_kokuyou"],
    rel:[{to:"shin", label:"仲間"},{to:"tenn", label:"仲間"},{to:"kyoushou", label:"姉貴分"},{to:"yuren", label:"仇敵"},{to:"f_shiyuu", label:"出身"}]
  },
  {
    id:"ouki", name:"王騎", yomi:"おうき", kind:"person", state:"秦", group:"王騎軍",
    role:"秦国六大将軍 / 大将軍", klass:"武将", first:"2巻", arc:"王都奪還編", status:"戦死",
    tags:["六大将軍","怪鳥","矛","師"],
    summary:"六大将軍最後の生き残り。信に矛と道筋を残して逝った巨星。",
    detail:[
      {h:"存在感", body:"『秦の怪鳥』の異名を持つ大将軍。独特の口調と、戦場全体を掌の上で転がす戦術眼を併せ持つ。"},
      {h:"復帰", body:"昭王の死後は軍を退いて隠棲していたが、政の器を見定め、馬陽の戦いで前線に復帰する。"},
      {h:"最期", body:"馬陽で趙軍を破る寸前、伏兵として現れた龐煖に致命傷を負う。死に際、信に自らの矛と『天下の大将軍』への道を託した。"},
      {h:"信への影響", body:"『武功だけでは将軍になれない』ことを教えた最初の師。飛信隊の名も王騎が与えたもの。"}
    ],
    battles:["b_outo","b_bayou"],
    rel:[
      {to:"shin", label:"師"},
      {to:"tou", label:"副官"},
      {to:"kyou", label:"想い人"},
      {to:"houken", label:"宿敵"},
      {to:"moubu", label:"盟友"},
      {to:"f_ouki", label:"総大将"}
    ]
  },
  {
    id:"tou", name:"騰", yomi:"とう", kind:"person", state:"秦", group:"騰軍",
    role:"王騎軍副官 → 将軍", klass:"武将", first:"8巻", arc:"馬陽の戦い", status:"存命",
    tags:["王騎軍","副官","ハハハ"],
    summary:"王騎の副官。王騎の死後、その軍を丸ごと引き継いだ実力者。",
    detail:[
      {h:"実力", body:"飄々とした態度の裏に、王騎に長年仕えた確かな武と統率力を持つ。剣技も一流。"},
      {h:"継承", body:"王騎の死後、王騎軍を解散させず引き継いで将軍位に就く。山陽攻略戦では秦軍の主力の一角を担う。"}
    ],
    battles:["b_bayou","b_sanyou","b_kankoku"],
    rel:[{to:"ouki", label:"主君"},{to:"f_ouki", label:"継承"},{to:"rokuomi", label:"配下"},{to:"kanto", label:"配下"}]
  },
  {
    id:"kyou", name:"摎", yomi:"きょう", kind:"person", state:"秦", group:"—",
    role:"元六大将軍", klass:"武将", first:"12巻", arc:"馬陽の戦い（回想）", status:"戦死",
    tags:["六大将軍","回想","王騎"],
    summary:"六大将軍唯一の女将軍。王騎と『城を百獲ったら嫁にする』約束を交わしていた。",
    detail:[
      {h:"経歴", body:"孤児から王騎に拾われ、常識外れの速度で城を落とし続けて六大将軍にまで上り詰めた。"},
      {h:"最期", body:"百個目の城として趙の馬陽を攻め、そこで討たれる。王騎が馬陽に強くこだわる理由。"}
    ],
    battles:[],
    rel:[{to:"ouki", label:"想い人"},{to:"f_shin", label:"六大将軍"}]
  },
  {
    id:"shoubunkun", name:"昌文君", yomi:"しょうぶんくん", kind:"person", state:"秦", group:"大王派",
    role:"政の腹心 / 元武官", klass:"文官", first:"1巻", arc:"王都奪還編", status:"存命",
    tags:["大王派","忠臣","昭王時代"],
    summary:"嬴政を守り続ける忠臣。昭王時代を知る古参。",
    detail:[
      {h:"立場", body:"政が趙から帰国して以来の後見役。少数の兵と人脈だけで、呂不韋派に対抗し続けている。"},
      {h:"過去", body:"若い頃は武官として王騎らと同時代を生きた。そのため王騎や蒙驁ら旧世代とも話が通じる。"}
    ],
    battles:["b_outo","b_sai"],
    rel:[{to:"sei", label:"主君"},{to:"heki", label:"配下"},{to:"hyou", label:"見出した"},{to:"f_seiha", label:"筆頭"}]
  },
  {
    id:"heki", name:"壁", yomi:"へき", kind:"person", state:"秦", group:"大王派",
    role:"将 / 政の側近", klass:"武将", first:"1巻", arc:"王都奪還編", status:"存命",
    tags:["常識人","出世"],
    summary:"昌文君配下の実直な将。序盤から信と縁が深い。",
    detail:[
      {h:"人物", body:"突出した武はないが、誠実さと常識的な判断で信頼を集めるタイプ。読者視点の代弁者になることが多い。"},
      {h:"歩み", body:"王都奪還、蛇甘平原、馬陽と主要な戦いに従軍し、着実に地位を上げていく。"}
    ],
    battles:["b_outo","b_dakan","b_bayou","b_sai"],
    rel:[{to:"shoubunkun", label:"上官"},{to:"shin", label:"戦友"}]
  },
  {
    id:"shouheikun", name:"昌平君", yomi:"しょうへいくん", kind:"person", state:"秦", group:"呂不韋派",
    role:"秦国軍総司令 / 呂氏四柱", klass:"軍師", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","兵法","楚出身","軍総司令"],
    summary:"秦軍全体を差配する軍略の頂点。兵法学校で軍師を育てる。",
    detail:[
      {h:"立場", body:"呂不韋四柱の一人にして秦国軍総司令。巨躯に反して思考は極めて緻密で、戦の全体設計を担う。"},
      {h:"教育者", body:"自ら兵法学校を開き、次代の軍師を育てている。河了貂もその門下。"}
    ],
    battles:["b_sanyou","b_kankoku","b_sai"],
    rel:[{to:"ryofui", label:"四柱"},{to:"tenn", label:"弟子"},{to:"f_ryofui", label:"四柱"},{to:"ousen", label:"起用"}]
  },
  {
    id:"moubu", name:"蒙武", yomi:"もうぶ", kind:"person", state:"秦", group:"秦軍",
    role:"将軍 / 秦国最強の武", klass:"武将", first:"10巻", arc:"馬陽の戦い", status:"存命",
    tags:["最強","猛将","蒙一族"],
    summary:"『秦国最強』を自認する猛将。武で全てをねじ伏せる。",
    detail:[
      {h:"戦い方", body:"軍略を軽んじ、自身の圧倒的な武で敵陣を粉砕する。馬陽では王騎の指揮下に入り、その差を突きつけられた。"},
      {h:"一族", body:"父は老将・蒙驁、子は蒙恬。軍人の家系だが、本人は最も型から外れている。"}
    ],
    battles:["b_bayou","b_sanyou","b_kankoku"],
    rel:[{to:"mougou", label:"父"},{to:"mouten", label:"息子"},{to:"ouki", label:"盟友"},{to:"kanmei", label:"死闘"},{to:"renpa", label:"一騎打ち"}]
  },
  {
    id:"mougou", name:"蒙驁", yomi:"もうごう", kind:"person", state:"秦", group:"秦軍",
    role:"老将軍 / 山陽攻略軍 総大将", klass:"武将", first:"17巻", arc:"呂不韋編", status:"死亡",
    tags:["老将","蒙一族","総大将"],
    summary:"他国から秦に移った老将。山陽攻略戦の総大将を務める。",
    detail:[
      {h:"人物", body:"派手さはないが堅実な用兵で戦果を重ねてきた叩き上げ。呂不韋の後押しで大軍を預かる。"},
      {h:"山陽", body:"廉頗という格上を相手に、数と粘りで攻めるという難しい役どころ。"},
      {h:"最期", body:"合従軍を退けたのち、老いには勝てず陣中で世を去る。旧世代がまた一人退場し、王翦・楊端和・桓騎という新しい将軍位の時代が始まる。"}
    ],
    battles:["b_sanyou"],
    rel:[{to:"moubu", label:"息子"},{to:"mouten", label:"孫"},{to:"renpa", label:"対峙"},{to:"f_ryofui", label:"近い"}]
  },
  {
    id:"mouten", name:"蒙恬", yomi:"もうてん", kind:"person", state:"秦", group:"楽華隊",
    role:"楽華隊 隊長 / 千人将", klass:"武将", first:"20巻", arc:"山陽攻略戦", status:"存命",
    tags:["楽華隊","同世代","蒙一族"],
    summary:"蒙武の子。飄々とした天才肌の同世代ライバル。",
    detail:[
      {h:"人物", body:"武の家系に生まれながら、力任せの父とは正反対の柔軟な思考と器用さを持つ。"},
      {h:"関係", body:"信・王賁と並ぶ同世代の千人将。三者三様の指揮スタイルが山陽で比較される。"}
    ],
    battles:["b_sanyou"],
    rel:[{to:"moubu", label:"父"},{to:"mougou", label:"祖父"},{to:"shin", label:"好敵手"},{to:"ouhon", label:"好敵手"}]
  },
  {
    id:"ouhon", name:"王賁", yomi:"おうほん", kind:"person", state:"秦", group:"玉鳳隊",
    role:"玉鳳隊 隊長 / 千人将", klass:"武将", first:"20巻", arc:"山陽攻略戦", status:"存命",
    tags:["玉鳳隊","名門","同世代","槍"],
    summary:"名門・王一族の御曹司。矜持の高い槍の使い手。",
    detail:[
      {h:"人物", body:"名家の血を誇りにし、下僕上がりの信を露骨に見下す。ただし実力は本物で、槍働きは同世代随一。"},
      {h:"部隊", body:"騎馬中心の玉鳳隊を率い、規律と練度で戦う。飛信隊とは対照的な組織。"}
    ],
    battles:["b_sanyou"],
    rel:[{to:"shin", label:"好敵手"},{to:"mouten", label:"好敵手"}]
  },
  {
    id:"hyoukou", name:"麃公", yomi:"ひょうこう", kind:"person", state:"秦", group:"麃公軍",
    role:"将軍 / 本能型の火", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["本能型","火","蛇甘平原","馬陽","函谷関"],
    summary:"戦場の流れを嗅ぎ分ける本能型の将軍。信の資質を最初に見抜いた。",
    detail:[
      {h:"戦い方", body:"理屈ではなく『火』と呼ばれる直感で動く典型的な本能型。危険な賭けを平然と選ぶ。"},
      {h:"信との縁", body:"蛇甘平原で信を百人将に引き上げた張本人。馬陽でも並走し、馮忌を討ち取っている。"},
      {h:"最期", body:"合従軍を迎え撃つ函谷関の戦いで、王騎を討った龐煖の前に立つ。『火』を燃やし尽くす一騎打ちの末に討たれた。"}
    ],
    battles:["b_dakan","b_bayou","b_kankoku"],
    rel:[{to:"shin", label:"引き上げた"},{to:"gokei", label:"宿敵"},{to:"fuuki", label:"討った"},{to:"houken", label:"相討ち覚悟の一騎打ち"}]
  },
  {
    id:"bakukoshin", name:"縛虎申", yomi:"ばくこしん", kind:"person", state:"秦", group:"麃公軍",
    role:"百人将", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["蛇甘平原","百人将","初陣"],
    summary:"信の初陣を率いた鬼百人将。命令を守り抜いて散った。",
    detail:[
      {h:"役割", body:"荒くれ揃いの歩兵を恐怖で束ねる百人将。信にとって最初の『上官』であり、軍の理不尽さを教えた人物。"},
      {h:"最期", body:"死守命令を受けた丘で、退くことを選ばず戦死。この一戦が信の昇進の起点になる。"}
    ],
    battles:["b_dakan"],
    rel:[{to:"shin", label:"上官"},{to:"hyoukou", label:"配下"}]
  },
  {
    id:"obei", name:"尾平", yomi:"びへい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","古参","農民"],
    summary:"飛信隊の古参兵。弱音を吐きながらも最後まで残る。",
    detail:[{h:"人物", body:"武功より生き延びることを重んじる現実主義者。読者に近い目線で飛信隊を語る役回り。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"shin", label:"部下"},{to:"obito", label:"弟"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"obito", name:"尾到", yomi:"びとう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["飛信隊","兄弟","馬陽"],
    summary:"尾平の弟。馬陽で信を生かすために命を使い切った。",
    detail:[{h:"最期", body:"敵中で消耗し切った信を背負って走り抜き、味方陣地の目前で力尽きる。飛信隊の初期を象徴する死。"}],
    battles:["b_dakan","b_bayou"],
    rel:[{to:"obei", label:"兄"},{to:"shin", label:"部下"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"takuke", name:"澤圭", yomi:"たくけい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 伍長", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","伍長","堅実"],
    summary:"信の最初の伍長。生き残る術に長けた堅実な兵。",
    detail:[{h:"人物", body:"派手な武功より隊の生存を優先する判断ができる。飛信隊の実務を支える一人。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"shin", label:"部下"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"hairou", name:"沛浪", yomi:"はいろう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 古参兵", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","古参"],
    summary:"戦場慣れした古参。若い隊員のまとめ役。",
    detail:[{h:"人物", body:"経験に裏打ちされた冷静さで、突撃しがちな飛信隊にブレーキをかける。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"shin", label:"部下"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"denyuu", name:"田有", yomi:"でんゆう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","古参"],
    summary:"飛信隊の古参兵。尾平とつるむ賑やかし役。",
    detail:[{h:"人物", body:"軽口が多いが、要所では隊のために踏みとどまる。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"f_hishin", label:"隊員"},{to:"obei", label:"相棒"}]
  },
  {
    id:"kyogai", name:"去亥", yomi:"きょがい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"10巻", arc:"馬陽の戦い", status:"存命",
    tags:["飛信隊","戦鼓","巨漢"],
    summary:"戦鼓を打ち鳴らす巨漢の隊員。飛信隊の突撃を鼓舞する。",
    detail:[{h:"役割", body:"太鼓の音で隊の士気と進退を制御する、飛信隊独特のポジション。"}],
    battles:["b_bayou","b_sanyou"],
    rel:[{to:"f_hishin", label:"隊員"},{to:"shin", label:"部下"}]
  },
  {
    id:"en", name:"渕", yomi:"えん", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 副長格", klass:"兵", first:"17巻", arc:"呂不韋編", status:"存命",
    tags:["飛信隊","副長","年長"],
    summary:"年長の実務派。隊の運営を裏で支える副長格。",
    detail:[{h:"役割", body:"隊員の掌握・編成・補給といった、信が苦手な部分を引き受ける。"}],
    battles:["b_sanyou"],
    rel:[{to:"f_hishin", label:"隊員"},{to:"shin", label:"補佐"}]
  },
  {
    id:"youtanwa", name:"楊端和", yomi:"ようたんわ", kind:"person", state:"山界", group:"山の民",
    role:"山界の王", klass:"山の民", first:"2巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","死王","同盟","女王"],
    summary:"『山界の死王』と呼ばれる女王。政と同盟し秦の戦力となる。",
    detail:[
      {h:"人物", body:"美貌と冷徹さを併せ持つ山の民の王。武力で諸部族を束ね、中華統一とは別に『山界統一』の野望を持つ。"},
      {h:"同盟", body:"政の掲げる理念に賭けて共闘を選び、王都奪還の決定打となった。以後、秦の重要な同盟勢力。"},
      {h:"秦の将軍へ", body:"蕞への援軍を含む働きにより、山界の王のまま秦の将軍位に就く。王翦・桓騎と並ぶ新世代の一角。"}
    ],
    battles:["b_outo","b_sai"],
    rel:[{to:"sei", label:"同盟"},{to:"bajio", label:"配下"},{to:"tajifu", label:"配下"},{to:"shunmen", label:"配下"},{to:"f_sankai", label:"王"}]
  },
  {
    id:"bajio", name:"バジオウ", yomi:"ばじおう", kind:"person", state:"山界", group:"山の民",
    role:"楊端和の側近", klass:"山の民", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","仮面","忠誠"],
    summary:"楊端和にもっとも忠実な戦士。仮面の下に過去を隠す。",
    detail:[{h:"過去", body:"かつて人を殺す道具として育てられ、楊端和に救われた。忠誠は絶対。"}],
    battles:["b_outo"],
    rel:[{to:"youtanwa", label:"主君"},{to:"f_sankai", label:"戦士"}]
  },
  {
    id:"tajifu", name:"タジフ", yomi:"たじふ", kind:"person", state:"山界", group:"山の民",
    role:"山の民の戦士", klass:"山の民", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","怪力"],
    summary:"怪力の戦士。信とは軽口を叩き合う仲。",
    detail:[{h:"人物", body:"荒々しいが情に厚い。山の民の中でも屈指の膂力を持つ。"}],
    battles:["b_outo"],
    rel:[{to:"youtanwa", label:"配下"},{to:"f_sankai", label:"戦士"}]
  },
  {
    id:"shunmen", name:"シュンメン", yomi:"しゅんめん", kind:"person", state:"山界", group:"山の民",
    role:"山の民の戦士", klass:"山の民", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","身軽"],
    summary:"軽業に長けた山の民の戦士。",
    detail:[{h:"人物", body:"跳躍力と手数で戦う軽装の戦士。タジフとは対照的なスタイル。"}],
    battles:["b_outo"],
    rel:[{to:"youtanwa", label:"配下"},{to:"f_sankai", label:"戦士"}]
  },
  {
    id:"seikyou", name:"成蟜", yomi:"せいきょう", kind:"person", state:"秦", group:"—",
    role:"秦の王弟", klass:"王・王族", first:"1巻", arc:"王都奪還編", status:"死亡",
    tags:["王弟","反乱","血統主義"],
    summary:"政の異母弟。血統を掲げて王座を奪おうとした。",
    detail:[
      {h:"反乱", body:"『王族の血こそ全て』という思想のもと竭氏らと組んで挙兵し、政を王都から追い落とす。"},
      {h:"その後", body:"敗北して命を拾われる。血統への執着という物差しが揺らぎ始める。"},
      {h:"屯留", body:"合従軍を退けた直後、屯留で起きた反乱の鎮圧に自ら向かう。かつて兄の座を奪おうとした男が、最後は秦の王族としての務めを選び、命を落とす。"}
    ],
    battles:["b_outo"],
    rel:[{to:"sei", label:"異母兄"},{to:"ketsushi", label:"後ろ盾"},{to:"rankai", label:"手駒"},{to:"shiishi", label:"腹心"}]
  },
  {
    id:"ryofui", name:"呂不韋", yomi:"りょふい", kind:"person", state:"秦", group:"呂不韋派",
    role:"秦国相国", klass:"文官", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["相国","商人","四柱","権力"],
    summary:"商人から相国に上り詰めた実権者。政の最大の政敵。",
    detail:[
      {h:"経歴", body:"元は一商人。政の父・子楚を『商品』として王位に押し上げ、その見返りに国政の頂点に立った。"},
      {h:"思想", body:"血統ではなく力と金が世を動かすという合理主義。王を飾りとして扱う。"},
      {h:"体制", body:"四柱（昌平君・李斯・蔡沢・司馬空）を通じて軍・法・外交・土木を掌握している。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"対立"},{to:"taigo", label:"結託"},{to:"shouheikun", label:"四柱"},{to:"risi", label:"四柱"},{to:"saitaku", label:"四柱"},{to:"shibakuu", label:"四柱"},{to:"f_ryofui", label:"頂点"}]
  },
  {
    id:"risi", name:"李斯", yomi:"りし", kind:"person", state:"秦", group:"呂不韋派",
    role:"呂氏四柱 / 法", klass:"文官", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","法家","官僚"],
    summary:"法を司る四柱。冷徹な官僚。",
    detail:[{h:"役割", body:"秦の法制度を握る実務家。合理性のためなら手段を選ばない。"}],
    battles:[],
    rel:[{to:"ryofui", label:"主君"},{to:"f_ryofui", label:"四柱"}]
  },
  {
    id:"saitaku", name:"蔡沢", yomi:"さいたく", kind:"person", state:"秦", group:"呂不韋派",
    role:"呂氏四柱 / 外交", klass:"文官", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","外交","老獪"],
    summary:"外交を担う老獪な四柱。他国との交渉役。",
    detail:[{h:"役割", body:"諸国との折衝を一手に握る。飄々とした態度の裏で国益を計算し尽くす。"}],
    battles:[],
    rel:[{to:"ryofui", label:"主君"},{to:"f_ryofui", label:"四柱"}]
  },
  {
    id:"shibakuu", name:"司馬空", yomi:"しばくう", kind:"person", state:"秦", group:"呂不韋派",
    role:"呂氏四柱 / 土木", klass:"文官", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","土木","インフラ"],
    summary:"治水・土木を担う四柱。国力そのものを作る男。",
    detail:[{h:"役割", body:"戦争ではなく生産基盤で国を強くする担当。地味だが秦の国力の源。"}],
    battles:[],
    rel:[{to:"ryofui", label:"主君"},{to:"f_ryofui", label:"四柱"}]
  },
  {
    id:"taigo", name:"太后（趙姫）", yomi:"たいごう ちょうき", kind:"person", state:"秦", group:"—",
    role:"政の母", klass:"王・王族", first:"10巻", arc:"呂不韋編", status:"存命",
    tags:["母","趙","確執"],
    summary:"政の実母。趙での日々を経て、息子と深い断絶を抱える。",
    detail:[
      {h:"関係", body:"趙での人質時代に政を庇わなかった過去があり、母子の間には埋めがたい溝がある。"},
      {h:"立場", body:"呂不韋と近い位置におり、政治的にも政の障害となる。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"息子"},{to:"ryofui", label:"結託"}]
  },
  {
    id:"rokuomi", name:"録嗚未", yomi:"ろくおみ", kind:"person", state:"秦", group:"騰軍",
    role:"騰軍の将", klass:"武将", first:"20巻", arc:"山陽攻略戦", status:"存命",
    tags:["騰軍","豪快"],
    summary:"騰の下で戦う豪快な将。",
    detail:[{h:"人物", body:"見た目通りの猛将タイプだが、騰の指揮下で規律よく働く。"}],
    battles:["b_sanyou"],
    rel:[{to:"tou", label:"上官"},{to:"f_ouki", label:"所属"}]
  },
  {
    id:"rankai", name:"ランカイ", yomi:"らんかい", kind:"person", state:"秦", group:"—",
    role:"成蟜側の巨人兵", klass:"刺客", first:"4巻", arc:"王都奪還編", status:"存命",
    tags:["巨人","王都奪還","怪力"],
    summary:"鎖に繋がれた巨躯の怪物。王宮での障害となった。",
    detail:[{h:"戦い", body:"人智を超えた膂力を持ち、山の民でさえ止められなかった。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"手駒"},{to:"shin", label:"交戦"}]
  },
  {
    id:"saji", name:"左慈", yomi:"さじ", kind:"person", state:"秦", group:"—",
    role:"暗殺者", klass:"刺客", first:"4巻", arc:"王都奪還編", status:"存命",
    tags:["刺客","王都奪還"],
    summary:"王宮に潜む凄腕の刺客。",
    detail:[{h:"戦い", body:"王都奪還戦で山の民と激突する手練れ。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"側"},{to:"f_sankai", label:"交戦"}]
  },
  {
    id:"shukyou", name:"朱凶", yomi:"しゅきょう", kind:"person", state:"秦", group:"—",
    role:"暗殺集団", klass:"刺客", first:"2巻", arc:"王都奪還編", status:"—",
    tags:["刺客","集団"],
    summary:"政の命を狙って放たれた暗殺集団。",
    detail:[{h:"役割", body:"逃亡中の政・信・河了貂を執拗に追う序盤の脅威。"}],
    battles:["b_outo"],
    rel:[{to:"sei", label:"標的"},{to:"shin", label:"交戦"}]
  },
  {
    id:"ketsushi", name:"竭氏", yomi:"けつし", kind:"person", state:"秦", group:"—",
    role:"成蟜派 筆頭大臣", klass:"文官", first:"2巻", arc:"王都奪還編", status:"—",
    tags:["反乱","大臣"],
    summary:"成蟜を担いだ反乱の首謀者格。",
    detail:[{h:"立場", body:"王弟を旗印に権力を握ろうとした重臣。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"擁立"},{to:"shiishi", label:"同派"}]
  },
  {
    id:"shiishi", name:"肆氏", yomi:"しし", kind:"person", state:"秦", group:"—",
    role:"成蟜派 重臣", klass:"文官", first:"2巻", arc:"王都奪還編", status:"存命",
    tags:["反乱","大臣","変わり身"],
    summary:"成蟜派の重臣。状況に応じて立ち回る現実主義者。",
    detail:[{h:"人物", body:"信念より生存と実利で動く。反乱後もしぶとく政治の場に残る。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"腹心"},{to:"ketsushi", label:"同派"}]
  },

  /* ───────────── 蚩尤 ───────────── */
  {
    id:"kyoushou", name:"羌象", yomi:"きょうしょう", kind:"person", state:"蚩尤", group:"蚩尤族",
    role:"羌瘣の姉貴分", klass:"刺客", first:"15巻", arc:"蚩尤編（回想）", status:"戦死",
    tags:["蚩尤","回想","姉"],
    summary:"羌瘣が唯一心を許した姉貴分。継承の儀式で命を落とす。",
    detail:[{h:"意味", body:"羌瘣が復讐に取り憑かれる理由そのもの。二人で里を出る約束が果たされなかった。"}],
    battles:[],
    rel:[{to:"kyoukai", label:"妹分"},{to:"yuren", label:"殺された"},{to:"f_shiyuu", label:"一族"}]
  },
  {
    id:"yuren", name:"幽連", yomi:"ゆうれん", kind:"person", state:"蚩尤", group:"蚩尤族",
    role:"蚩尤族の刺客", klass:"刺客", first:"17巻", arc:"蚩尤編", status:"戦死",
    tags:["蚩尤","仇","巫舞"],
    summary:"羌象を手にかけた蚩尤族の刺客。羌瘣の仇。",
    detail:[{h:"因縁", body:"羌瘣が飛信隊を一時離れてまで追う相手。巫舞の練度は羌瘣を上回る。"},
      {h:"決着", body:"羌瘣との死闘の末に討たれる。これにより羌瘣は復讐から解放され、飛信隊へ戻る。"}],
    battles:[],
    rel:[{to:"kyoukai", label:"仇敵"},{to:"kyoushou", label:"殺害"},{to:"f_shiyuu", label:"一族"}]
  },

  /* ───────────── 趙 ───────────── */
  {
    id:"houken", name:"龐煖", yomi:"ほうけん", kind:"person", state:"趙", group:"趙軍",
    role:"武神", klass:"武将", first:"10巻", arc:"馬陽の戦い", status:"存命",
    tags:["武神","王騎","最強","因縁"],
    summary:"己を『武神』と称する怪物。王騎を討った男。",
    detail:[
      {h:"思想", body:"人としての一切を捨て、純粋な武の高みだけを求めて生きている。軍略にも兵にも興味がない。"},
      {h:"馬陽", body:"趙軍の切り札として伏せられ、王騎に致命傷を与えた。信にとっても最大の因縁の相手になる。"},
      {h:"合従軍", body:"李牧の軍に加わり函谷関へ。麃公を討ち、さらに蕞へ回って信と再び相対する。"}
    ],
    battles:["b_bayou","b_kankoku","b_sai"],
    rel:[{to:"ouki", label:"宿敵"},{to:"shin", label:"因縁"},{to:"chousou", label:"共闘"},{to:"f_chou", label:"所属"},{to:"riboku", label:"協働"},{to:"hyoukou", label:"討った"}]
  },
  {
    id:"chousou", name:"趙荘", yomi:"ちょうそう", kind:"person", state:"趙", group:"趙軍",
    role:"馬陽 趙軍総大将", klass:"軍師", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["馬陽","総大将","知将"],
    summary:"馬陽の趙軍を率いた知将。王騎を罠に嵌めた策士。",
    detail:[{h:"戦略", body:"龐煖という札を隠し持ち、王騎を戦場の奥へ誘い込む大掛かりな罠を仕掛けた。"}],
    battles:["b_bayou"],
    rel:[{to:"ouki", label:"対峙"},{to:"houken", label:"切り札"},{to:"f_chou", label:"所属"}]
  },
  {
    id:"fuuki", name:"馮忌", yomi:"ふうき", kind:"person", state:"趙", group:"趙軍",
    role:"趙軍の将", klass:"武将", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["馬陽","知将"],
    summary:"馬陽で麃公と激突した趙の将。",
    detail:[{h:"最期", body:"堅実な用兵で秦軍を苦しめたが、麃公の本能的な突撃に討ち取られる。"}],
    battles:["b_bayou"],
    rel:[{to:"hyoukou", label:"討たれた"},{to:"f_chou", label:"所属"}]
  },
  {
    id:"bankyoku", name:"万極", yomi:"まんごく", kind:"person", state:"趙", group:"趙軍",
    role:"趙軍の将", klass:"武将", first:"12巻", arc:"馬陽の戦い", status:"戦死",
    tags:["馬陽","長平","怨嗟"],
    summary:"長平の生き残り。秦への憎悪だけで戦う将。",
    detail:[
      {h:"背景", body:"長平で四十万が生き埋めにされた地獄を生き延びた一人。以来、秦兵を殺すことだけが生きる目的になっている。"},
      {h:"最期", body:"馬陽で飛信隊と激突し、信に討たれる。『戦争が生む怨嗟』を象徴する敵役。"}
    ],
    battles:["b_bayou"],
    rel:[{to:"shin", label:"討たれた"},{to:"f_chou", label:"所属"}]
  },

  /* ───────────── 魏 ───────────── */
  {
    id:"gokei", name:"呉慶", yomi:"ごけい", kind:"person", state:"魏", group:"魏軍",
    role:"蛇甘平原 魏軍総大将 / 魏火竜七師", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["蛇甘平原","総大将","理"],
    summary:"『戦を無くすために戦う』と語った魏の総大将。",
    detail:[
      {h:"思想", body:"滅ぼされた故国を持ち、統一による平定こそが戦を終わらせると考える。政の理想と鏡合わせの存在。"},
      {h:"最期", body:"蛇甘平原で麃公との一騎打ちに敗れる。"}
    ],
    battles:["b_dakan"],
    rel:[{to:"hyoukou", label:"宿敵"},{to:"f_gi", label:"所属"},{to:"kan'ou", label:"配下"}]
  },
  {
    id:"kan'ou", name:"干央", yomi:"かんおう", kind:"person", state:"魏", group:"魏軍",
    role:"魏の将", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["蛇甘平原","騎馬"],
    summary:"蛇甘平原で秦軍を苦しめた魏の騎馬将。",
    detail:[{h:"人物", body:"呉慶配下の実力者。冷静な指揮で戦線を組み立てる。"}],
    battles:["b_dakan"],
    rel:[{to:"gokei", label:"上官"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"kyuugen", name:"宮元", yomi:"きゅうげん", kind:"person", state:"魏", group:"魏軍",
    role:"魏の将", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["蛇甘平原"],
    summary:"蛇甘平原で秦の歩兵部隊と激突した魏の将。",
    detail:[{h:"役割", body:"信たち歩兵にとって、初めて『将を討つ』という目標になった相手。"}],
    battles:["b_dakan"],
    rel:[{to:"gokei", label:"配下"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"renpa", name:"廉頗", yomi:"れんぱ", kind:"person", state:"魏", group:"廉頗軍",
    role:"元趙三大天 / 山陽の守将", klass:"武将", first:"21巻", arc:"山陽攻略戦", status:"存命",
    tags:["三大天","亡命","山陽","四天王"],
    summary:"かつて趙三大天に数えられた老将。魏に身を寄せ山陽を守る。",
    detail:[
      {h:"経歴", body:"趙で最強と謳われた三大天の一人。王の代替わりで冷遇され、国を出て魏に迎えられた。"},
      {h:"格", body:"秦の旧世代の将たちが名を聞いただけで表情を変える『別格』。蒙驁ら攻め手にとって最大の壁。"},
      {h:"四天王", body:"輪虎・玄峰・介子坊・姜燕という腹心を従え、彼らごと一つの軍として機能する。"},
      {h:"山陽の決着", body:"四天王を次々に失い、最後は蒙武との真正面からの一騎打ちに競り負ける。山陽は秦の手に落ち、廉頗は戦場を去った。"}
    ],
    battles:["b_sanyou"],
    rel:[
      {to:"mougou", label:"対峙"},
      {to:"rinko", label:"配下"},
      {to:"genpou", label:"配下"},
      {to:"kaishibou", label:"配下"},
      {to:"kyouen", label:"配下"},
      {to:"f_gi", label:"客将"},
      {to:"f_chou", label:"元三大天"}
    ]
  },
  {
    id:"rinko", name:"輪虎", yomi:"りんこ", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王", klass:"武将", first:"21巻", arc:"山陽攻略戦", status:"戦死",
    tags:["四天王","剣","速さ"],
    summary:"廉頗四天王の一人。異常な速さで敵将の首だけを狩る。",
    detail:[{h:"戦い方", body:"少数の精鋭を率い、戦線を無視して将だけを討ち取る首狩り型。"},
      {h:"最期", body:"秦の将を次々に狩った末、飛信隊の信と一騎打ちになり討たれる。信が『格上の将を討った』最初の戦い。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"genpou", name:"玄峰", yomi:"げんぽう", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王 / 軍師格", klass:"軍師", first:"21巻", arc:"山陽攻略戦", status:"戦死",
    tags:["四天王","知略","老将"],
    summary:"廉頗軍の頭脳。老練な策で戦場を組み立てる。",
    detail:[{h:"役割", body:"四天王の中で唯一の策士型。廉頗の武を最大限に活かす盤面を作る。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"kaishibou", name:"介子坊", yomi:"かいしぼう", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王", klass:"武将", first:"21巻", arc:"山陽攻略戦", status:"存命",
    tags:["四天王","豪傑","巨漢"],
    summary:"廉頗四天王の武の中核。正面からの押し合いに強い。",
    detail:[{h:"戦い方", body:"重装の大部隊で正面から敵を圧殺する、廉頗軍の主砲。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"kyouen", name:"姜燕", yomi:"きょうえん", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王", klass:"武将", first:"21巻", arc:"山陽攻略戦", status:"存命",
    tags:["四天王","冷静","文武"],
    summary:"廉頗四天王の一人。落ち着いた指揮で戦線を保つ。",
    detail:[{h:"人物", body:"四天王の中では理知的で、荒い廉頗軍の中でバランスを取る役割。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },

  /* ───────────── 戦い ───────────── */
  {
    id:"b_outo", name:"王都奪還戦", yomi:"おうとだっかんせん", kind:"battle", state:"秦（内乱）", group:"内乱",
    role:"嬴政側の勝利", klass:"戦い", first:"1巻", arc:"王都奪還編", status:"決着",
    tags:["内乱","咸陽","山の民","成蟜"],
    summary:"王座を奪われた政が、山の民と手を組み咸陽を取り戻した戦い。",
    detail:[
      {h:"構図", body:"王弟・成蟜と竭氏ら重臣が挙兵し、政は王宮を追われる。政は昌文君の兵だけでは足りないと判断し、山界へ向かった。"},
      {h:"転換点", body:"政が単身で楊端和と交渉し、五百年前の盟約を根拠に山の民の参戦を取り付けたこと。"},
      {h:"信にとって", body:"漂の死からわずかな期間で、下僕の少年が王の隣に立ち、武功で士官までたどり着いた最初の戦い。"},
      {h:"収録範囲メモ", body:"単行本1〜5巻あたり。"}
    ],
    battles:[],
    rel:[{to:"sei",label:"参戦"},{to:"shin",label:"参戦"},{to:"seikyou",label:"参戦"},{to:"youtanwa",label:"参戦"},{to:"f_shin",label:"舞台"}]
  },
  {
    id:"b_dakan", name:"蛇甘平原の戦い", yomi:"だかんへいげんのたたかい", kind:"battle", state:"秦 vs 魏", group:"対魏戦",
    role:"秦の勝利", klass:"戦い", first:"5巻", arc:"蛇甘平原の戦い", status:"決着",
    tags:["対魏","初陣","麃公","呉慶"],
    summary:"信の初陣。麃公が呉慶を討ち取り、秦が勝利した対魏戦。",
    detail:[
      {h:"構図", body:"魏の総大将・呉慶に対し、秦は麃公が主将。歩兵として参加した信の初めての本格的な合戦。"},
      {h:"見どころ", body:"縛虎申の死守命令、丘の攻防、そして麃公と呉慶の一騎打ち。『戦をなくすために戦う』という呉慶の思想が政の理想と交差する。"},
      {h:"結果", body:"秦の勝利。信はこの戦の武功で百人将に引き上げられる。"},
      {h:"収録範囲メモ", body:"単行本5〜7巻あたり。羌瘣が登場するのもこの戦い。"}
    ],
    battles:[],
    rel:[{to:"hyoukou",label:"主将"},{to:"gokei",label:"敵主将"},{to:"shin",label:"参戦"},{to:"kyoukai",label:"参戦"},{to:"bakukoshin",label:"参戦"},{to:"f_gi",label:"対戦国"}]
  },
  {
    id:"b_bayou", name:"馬陽の戦い", yomi:"ばようのたたかい", kind:"battle", state:"秦 vs 趙", group:"対趙戦",
    role:"戦術的には秦優勢／王騎を失う", klass:"戦い", first:"10巻", arc:"馬陽の戦い", status:"決着",
    tags:["対趙","王騎","龐煖","飛信隊結成"],
    summary:"王騎が復帰し、そして散った戦い。飛信隊はここで生まれた。",
    detail:[
      {h:"構図", body:"趙が馬陽に侵攻。秦は王騎を総大将に、蒙武・麃公らが加わる布陣で迎え撃つ。趙側の主将は趙荘。"},
      {h:"飛信隊", body:"信は百人隊を任され、王騎から『飛信隊』の名を授かる。万極を討ち取り、隊としての形が固まっていく。"},
      {h:"結末", body:"秦は趙荘を破って戦術的には勝利するが、伏せられていた龐煖の一撃で王騎が致命傷を負い戦死。信は矛を託される。"},
      {h:"意味", body:"物語の第一の区切り。信は『武功を重ねる少年』から『将を目指す者』へ、政は最大の後ろ盾を失う。"},
      {h:"収録範囲メモ", body:"単行本10〜16巻あたり。"}
    ],
    battles:[],
    rel:[{to:"ouki",label:"主将"},{to:"chousou",label:"敵主将"},{to:"houken",label:"参戦"},{to:"moubu",label:"参戦"},{to:"hyoukou",label:"参戦"},{to:"shin",label:"参戦"},{to:"tou",label:"参戦"},{to:"f_chou",label:"対戦国"}]
  },
  {
    id:"b_sanyou", name:"山陽攻略戦", yomi:"さんようこうりゃくせん", kind:"battle", state:"秦 vs 魏", group:"対魏戦",
    role:"秦の勝利（山陽陥落）", klass:"戦い", first:"20巻", arc:"山陽攻略戦", status:"決着",
    tags:["対魏","廉頗","蒙驁","同世代","千人将"],
    summary:"蒙驁率いる秦軍が魏の要衝・山陽へ侵攻。守るは亡命した廉頗。",
    detail:[
      {h:"構図", body:"秦は蒙驁を総大将に、蒙武・騰らが従軍。魏側は趙から亡命した廉頗が四天王とともに山陽を守る。"},
      {h:"世代交代", body:"信・王賁・蒙恬という同世代の千人将が同じ戦場に揃う。三者の指揮スタイルの差が真正面から比較される。"},
      {h:"位置づけ", body:"王騎という師を失った信が、初めて『千人を率いる将』として結果を問われる戦い。"},
      {h:"決着", body:"信が輪虎を討ち、蒙武が廉頗との一騎打ちを制して山陽は秦の手に落ちる。信は三千人将へ。"},
      {h:"収録範囲メモ", body:"単行本20〜25巻あたり。"}
    ],
    battles:[],
    rel:[{to:"mougou",label:"主将"},{to:"renpa",label:"敵主将"},{to:"shin",label:"参戦"},{to:"ouhon",label:"参戦"},{to:"mouten",label:"参戦"},{to:"moubu",label:"参戦"},{to:"tou",label:"参戦"},{to:"f_gi",label:"対戦国"}]
  },

  /* ───────────── 合従軍編で加わる勢力 ───────────── */
  {
    id:"f_so", name:"楚", yomi:"そ", kind:"faction", state:"楚", group:"七国",
    role:"中華最大の版図を持つ国", klass:"勢力", first:"26巻", arc:"合従軍編", status:"—",
    tags:["国","七国","南方","春申君"],
    summary:"中華南方の巨大国家。合従軍の総大将を出す。",
    detail:[
      {h:"位置づけ", body:"領土・人口ともに中華最大級。国が大きすぎるがゆえに一枚岩になりにくいが、動けば桁違いの兵力を出す。"},
      {h:"合従軍", body:"宰相・春申君が合従軍の総大将となり、汗明・臨武君ら大将軍を函谷関に投入した。"}
    ],
    rel:[]
  },
  {
    id:"f_kan", name:"韓", yomi:"かん", kind:"faction", state:"韓", group:"七国",
    role:"七国最小の国", klass:"勢力", first:"26巻", arc:"合従軍編", status:"—",
    tags:["国","七国","小国","毒"],
    summary:"七国で最も小さい国。合従軍には毒を武器に加わる。",
    detail:[{h:"戦い方", body:"正面からの兵力では劣るため、成恢のように毒や搦め手を使う将を前に出す。"}],
    rel:[]
  },
  {
    id:"f_en", name:"燕", yomi:"えん", kind:"faction", state:"燕", group:"七国",
    role:"中華北東の国", klass:"勢力", first:"26巻", arc:"合従軍編", status:"—",
    tags:["国","七国","北方"],
    summary:"北東の寒国。大将軍オルドが合従軍に加わる。",
    detail:[{h:"位置づけ", body:"中華の争いからやや距離があるが、合従軍には騎馬を主体とする軍を送り込んだ。"}],
    rel:[]
  },
  {
    id:"f_gassho", name:"合従軍", yomi:"がっしょうぐん", kind:"faction", state:"複数国", group:"連合",
    role:"五国連合軍", klass:"勢力", first:"26巻", arc:"合従軍編", status:"—",
    tags:["連合","五国","函谷関","蕞"],
    summary:"楚・趙・魏・韓・燕が組んだ対秦連合。総兵力は秦を大きく上回った。",
    detail:[
      {h:"成り立ち", body:"膨張を続ける秦を潰すため、利害の異なる五国が一度だけ手を組んだ。総大将は楚の春申君、実質的な頭脳は趙の李牧。"},
      {h:"構造的な弱点", body:"寄り合い所帯であるため、各国が自国の損得で動く。秦はその継ぎ目を突いて崩すことになる。"}
    ],
    rel:[]
  },

  /* ───────────── 秦（合従軍編で加わる） ───────────── */
  {
    id:"ousen", name:"王翦", yomi:"おうせん", kind:"person", state:"秦", group:"王翦軍",
    role:"将軍 / 謀略型", klass:"軍師", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["謀将","仮面","王賁の父","計算"],
    summary:"仮面を着けた謀略の将。勝ち筋しか踏まない徹底した合理主義者。",
    detail:[
      {h:"人物", body:"感情を見せず、常に自軍の損得を計算して動く。忠誠心よりも『勝てるかどうか』で判断する不気味さがある。"},
      {h:"合従軍", body:"函谷関の戦いで燕のオルド、楚の臨武君と対峙。正面からの消耗を避け、地形と情報で相手を削っていく。"},
      {h:"血筋", body:"名門・王一族の当主で、玉鳳隊を率いる王賁の父。"},
      {h:"将軍位", body:"合従軍撃退の功で正式に将軍位へ。楊端和・桓騎とともに、旧世代の後を継ぐ顔ぶれとなる。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"ouhon", label:"息子"},{to:"shouheikun", label:"起用"},{to:"orudo", label:"対峙"},{to:"rinbukun", label:"討った"}]
  },
  {
    id:"choutou", name:"張唐", yomi:"ちょうとう", kind:"person", state:"秦", group:"秦軍",
    role:"老将軍", klass:"武将", first:"26巻", arc:"合従軍編", status:"戦死",
    tags:["老将","函谷関","韓"],
    summary:"函谷関を守った老将。韓の成恢と刺し違える。",
    detail:[
      {h:"人物", body:"昭王の時代を知る古参の将。若い世代に道を譲る覚悟を持って戦場に立つ。"},
      {h:"最期", body:"毒を用いる成恢の罠にかかり、自らの命と引き換えに成恢を討ち取った。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"seikai", label:"相討ち"},{to:"f_shin", label:"所属"}]
  },
  {
    id:"kanto", name:"干斗", yomi:"かんと", kind:"person", state:"秦", group:"騰軍",
    role:"騰軍の将", klass:"武将", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["騰軍","堅実"],
    summary:"騰軍の将。録嗚未と並ぶ騰の両輪。",
    detail:[{h:"人物", body:"録嗚未と対をなす騰軍の将。派手さはないが崩れない用兵をする。"}],
    battles:["b_kankoku"],
    rel:[{to:"tou", label:"上官"},{to:"rokuomi", label:"同僚"},{to:"f_ouki", label:"所属"}]
  },
  {
    id:"shika", name:"紫夏", yomi:"しか", kind:"person", state:"趙", group:"—",
    role:"趙の商人", klass:"文官", first:"25巻", arc:"呂不韋との対決（回想）", status:"死亡",
    tags:["回想","政の過去","恩人"],
    summary:"趙にいた少年時代の政を、命を懸けて秦へ逃した商人。",
    detail:[
      {h:"出会い", body:"人質として趙で虐げられ、心を閉ざしていた政を引き取った女商人。金のための仕事だったはずが、政を一人の子どもとして扱った。"},
      {h:"逃避行", body:"追手をかわしながら国境を目指し、最後は自らの命と引き換えに政を秦へ送り届けた。"},
      {h:"意味", body:"政が『光』と呼ぶものの原点。呂不韋との論戦で、政が中華統一の理由として語る記憶。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"救った"},{to:"ryofui", label:"（政の論拠）"}]
  },

  /* ───────────── 趙（合従軍編） ───────────── */
  {
    id:"riboku", name:"李牧", yomi:"りぼく", kind:"person", state:"趙", group:"李牧軍",
    role:"趙三大天 / 合従軍の頭脳", klass:"軍師", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["三大天","知将","合従軍","蕞"],
    summary:"合従軍を設計した趙の知将。秦にとって最大の脅威となる男。",
    detail:[
      {h:"人物", body:"穏やかな物腰の裏に、中華全体を盤面として見る視野を持つ。武ではなく構想で秦を追い詰める。"},
      {h:"合従軍の設計", body:"利害の合わない五国をまとめ上げ、函谷関に全軍をぶつけると見せかけて、自らは軍を割いて咸陽の喉元・蕞を突いた。"},
      {h:"蕞", body:"あと一歩まで王都に迫りながら、住民ごと立ち上がった蕞に足止めされ、援軍到着を前に撤退を選ぶ。"},
      {h:"国境戦", body:"合従軍の失敗後は趙の国境防衛に回る。黒羊丘では腹心の慶舎を送り込み、秦の侵攻と削り合う。"}
    ],
    battles:["b_kankoku","b_sai","b_kokuyou"],
    rel:[{to:"kaine", label:"側近"},{to:"houken", label:"協働"},{to:"sei", label:"対峙"},{to:"shunshinkun", label:"連合"},{to:"f_chou", label:"三大天"},{to:"f_gassho", label:"実質の頭脳"}]
  },
  {
    id:"kaine", name:"カイネ", yomi:"かいね", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧の側近", klass:"武将", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["李牧軍","女武将"],
    summary:"李牧に付き従う女武将。趙軍の伝令と護衛を担う。",
    detail:[{h:"人物", body:"李牧に絶対の信頼を寄せ、その意図を汲んで動く。武人としての腕も確か。"}],
    battles:["b_kankoku","b_sai"],
    rel:[{to:"riboku", label:"主君"},{to:"f_chou", label:"所属"}]
  },

  /* ───────────── 魏・楚・韓・燕（合従軍編） ───────────── */
  {
    id:"gohoumei", name:"呉鳳明", yomi:"ごほうめい", kind:"person", state:"魏", group:"魏軍",
    role:"魏軍総司令 / 呉慶の子", klass:"軍師", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["攻城兵器","井闌車","呉慶の子"],
    summary:"呉慶の子。攻城兵器を操る魏の頭脳。",
    detail:[
      {h:"人物", body:"父・呉慶を秦に討たれた過去を持つ。武ではなく設計と運用で戦う技術者型の将。"},
      {h:"函谷関", body:"巨大な井闌車を投入し、難攻不落とされた函谷関の城壁を初めて越えさせた。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"gokei", label:"父"},{to:"f_gi", label:"総司令"},{to:"f_gassho", label:"参加"}]
  },
  {
    id:"shunshinkun", name:"春申君", yomi:"しゅんしんくん", kind:"person", state:"楚", group:"合従軍",
    role:"楚の宰相 / 合従軍総大将", klass:"文官", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["総大将","宰相","合従軍"],
    summary:"合従軍の総大将を務めた楚の宰相。",
    detail:[
      {h:"立場", body:"五国をまとめる旗頭として担がれた総大将。ただし実際の作戦設計は李牧に負うところが大きい。"},
      {h:"合従軍の限界", body:"連合が崩れ始めると、楚の損失を避ける判断に傾いていく。寄り合い所帯の弱さがそのまま出る。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"riboku", label:"連合"},{to:"kanmei", label:"配下"},{to:"f_so", label:"宰相"},{to:"f_gassho", label:"総大将"}]
  },
  {
    id:"kanmei", name:"汗明", yomi:"かんめい", kind:"person", state:"楚", group:"合従軍",
    role:"楚の大将軍", klass:"武将", first:"27巻", arc:"合従軍編", status:"戦死",
    tags:["巨漢","武","蒙武"],
    summary:"『中華最強』を自称した楚の大将軍。蒙武と真正面から激突する。",
    detail:[
      {h:"武", body:"巨躯から繰り出す一撃で秦軍を薙ぎ払う、蒙武と同種の純粋な武の将。"},
      {h:"最期", body:"函谷関で蒙武と一騎打ちになり、力比べの末に討たれる。蒙武が『武でしか語れない男』から一段上がる契機になる。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"moubu", label:"死闘"},{to:"shunshinkun", label:"主君"},{to:"f_so", label:"所属"}]
  },
  {
    id:"rinbukun", name:"臨武君", yomi:"りんぶくん", kind:"person", state:"楚", group:"合従軍",
    role:"楚の将", klass:"武将", first:"27巻", arc:"合従軍編", status:"戦死",
    tags:["楚","函谷関"],
    summary:"函谷関で王翦と対峙した楚の将。",
    detail:[{h:"最期", body:"力押しで攻めるも、王翦の計算ずくの戦い方に絡め取られて討たれる。"}],
    battles:["b_kankoku"],
    rel:[{to:"ousen", label:"討たれた"},{to:"f_so", label:"所属"}]
  },
  {
    id:"seikai", name:"成恢", yomi:"せいかい", kind:"person", state:"韓", group:"合従軍",
    role:"韓の将 / 毒の使い手", klass:"刺客", first:"27巻", arc:"合従軍編", status:"戦死",
    tags:["毒","搦め手","張唐"],
    summary:"毒を武器に函谷関を狙った韓の将。",
    detail:[{h:"戦い方", body:"小国ゆえに正面戦力で劣る韓が送り込んだ搦め手。毒で秦の将を削りにかかる。"},
      {h:"最期", body:"張唐を毒で追い詰めるが、死を覚悟した張唐に道連れにされる。"}],
    battles:["b_kankoku"],
    rel:[{to:"choutou", label:"相討ち"},{to:"f_kan", label:"所属"}]
  },
  {
    id:"orudo", name:"オルド", yomi:"おるど", kind:"person", state:"燕", group:"合従軍",
    role:"燕の大将軍", klass:"武将", first:"27巻", arc:"合従軍編", status:"存命",
    tags:["騎馬","燕","王翦"],
    summary:"騎馬を操る燕の大将軍。函谷関で王翦と読み合う。",
    detail:[{h:"人物", body:"個の武ではなく騎馬軍団の運用で戦う将。王翦との駆け引きは合従軍の中でも異色の展開になる。"}],
    battles:["b_kankoku"],
    rel:[{to:"ousen", label:"対峙"},{to:"f_en", label:"所属"},{to:"f_gassho", label:"参加"}]
  },

  /* ───────────── 戦い（合従軍編） ───────────── */
  {
    id:"b_kankoku", name:"函谷関の戦い", yomi:"かんこくかんのたたかい", kind:"battle", state:"秦 vs 合従軍", group:"合従軍編",
    role:"秦が防衛（関は落ちず）", klass:"戦い", first:"27巻", arc:"合従軍編", status:"決着",
    tags:["合従軍","函谷関","籠城","麃公"],
    summary:"五国連合の総攻撃を、秦が唯一の関で受け止めた総力戦。",
    detail:[
      {h:"構図", body:"秦は函谷関という一点に全軍を集めて迎撃。昌平君が全体を差配し、関の上では蒙武・騰・王翦・張唐・麃公がそれぞれの持ち場を受け持つ。"},
      {h:"持ち場ごとの死闘", body:"蒙武は楚の汗明と、王翦は燕のオルド・楚の臨武君と、張唐は韓の成恢と噛み合う。魏の呉鳳明は巨大な井闌車で城壁を越えにかかった。"},
      {h:"麃公と龐煖", body:"関を出て平地で戦うことを選んだ麃公が、王騎を討った龐煖と一騎打ちに臨む。『火』を燃やし尽くして討たれ、秦はまた一人、旧世代の将を失う。"},
      {h:"意味", body:"物量で押し切られる寸前まで行きながら、秦は関を守り切る。だがこの攻防そのものが、李牧の描いた盤面の一部だった。"},
      {h:"収録範囲メモ", body:"単行本27〜30巻あたり。"}
    ],
    battles:[],
    rel:[{to:"shouheikun",label:"総指揮"},{to:"moubu",label:"参戦"},{to:"tou",label:"参戦"},{to:"ousen",label:"参戦"},{to:"choutou",label:"参戦"},{to:"hyoukou",label:"参戦"},{to:"shin",label:"参戦"},{to:"riboku",label:"敵軍"},{to:"shunshinkun",label:"敵総大将"},{to:"gohoumei",label:"敵将"},{to:"f_gassho",label:"対戦相手"}]
  },
  {
    id:"b_sai", name:"蕞の戦い", yomi:"さいのたたかい", kind:"battle", state:"秦 vs 趙（李牧軍）", group:"合従軍編",
    role:"秦の防衛成功（合従軍撤退）", klass:"戦い", first:"31巻", arc:"合従軍編", status:"決着",
    tags:["合従軍","蕞","籠城","住民","王の言葉"],
    summary:"李牧が咸陽の喉元を突いた奇襲を、王と住民が守り抜いた戦い。",
    detail:[
      {h:"構図", body:"函谷関に全軍が釘付けになっている隙に、李牧は軍を割いて山越えで蕞に迫った。落ちれば次は王都・咸陽という位置で、守るのは寄せ集めの少数兵のみ。"},
      {h:"王が前に出る", body:"嬴政は自ら蕞へ入り、兵ではない住民に向かって語りかけた。命令ではなく理由を示すことで、街ごと戦う集団に変える。"},
      {h:"守る側", body:"信の飛信隊、復帰した羌瘣、軍師となった河了貂、壁や昌文君らが城壁に並ぶ。龐煖も現れ、信は再びその前に立つ。"},
      {h:"決着", body:"数日の総攻撃に耐え切り、援軍の到着を前に李牧は撤退を決断。合従軍は崩れ、秦は滅亡の淵から生還した。"},
      {h:"意味", body:"王の理念が実際に国を救った戦い。政・信・河了貂・羌瘣という始まりの四人が、それぞれの立場で同じ戦場に立つ。"},
      {h:"収録範囲メモ", body:"単行本31〜33巻あたり。このDBはここまでを収録。"}
    ],
    battles:[],
    rel:[{to:"sei",label:"総指揮"},{to:"shin",label:"参戦"},{to:"kyoukai",label:"参戦"},{to:"tenn",label:"参戦"},{to:"heki",label:"参戦"},{to:"shoubunkun",label:"参戦"},{to:"youtanwa",label:"援軍"},{to:"riboku",label:"敵主将"},{to:"houken",label:"敵将"},{to:"f_chou",label:"対戦相手"}]
  },

  /* ───────────── 黒羊丘の戦い（34〜40巻） ───────────── */
  {
    id:"f_kanki", name:"桓騎軍", yomi:"かんきぐん", kind:"faction", state:"秦", group:"秦軍",
    role:"元野盗集団の軍", klass:"勢力", first:"34巻", arc:"黒羊丘の戦い", status:"—",
    tags:["部隊","桓騎","野盗","非道"],
    summary:"野盗上がりの荒くれで固めた異形の軍団。勝つためなら手段を選ばない。",
    detail:[
      {h:"成り立ち", body:"桓騎が率いていた野盗集団がそのまま秦軍に組み込まれた部隊。摩論・雷土・黒桜・ゼノウら、癖の強い将が並ぶ。"},
      {h:"性格", body:"正攻法をほとんど採らず、騙し・急襲・恐怖で敵を崩す。軍としての強さは本物だが、やり口は秦軍内でも異質。"}
    ],
    rel:[]
  },
  {
    id:"kanki", name:"桓騎", yomi:"かんき", kind:"person", state:"秦", group:"桓騎軍",
    role:"将軍 / 元野盗の頭", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["非道","奇襲","将軍位","黒羊"],
    summary:"野盗から将軍位に上り詰めた男。常識の外側から勝ちを取りにいく。",
    detail:[
      {h:"人物", body:"合従軍撃退の功で王翦・楊端和と並び将軍位に就く。飄々として底が読めず、味方でさえその判断を先読みできない。"},
      {h:"戦い方", body:"正面からぶつからず、相手が想定していない一手で盤面を壊す。そのためには住民を巻き込むことも躊躇わない。"},
      {h:"信との対立", body:"黒羊では飛信隊を指揮下に置く。勝つための非道と、信が持つ将としての線引きが真正面から衝突する。"}
    ],
    battles:["b_kokuyou"],
    rel:[{to:"f_kanki", label:"総大将"},{to:"shin", label:"上官・対立"},{to:"maron", label:"配下"},{to:"raido", label:"配下"},{to:"kokuou", label:"配下"},{to:"zenou", label:"配下"},{to:"naki", label:"元配下"},{to:"ousen", label:"同格"},{to:"youtanwa", label:"同格"}]
  },
  {
    id:"maron", name:"摩論", yomi:"まろん", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の将 / 弁の立つ参謀格", klass:"軍師", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","口八丁"],
    summary:"桓騎軍で唯一まともに口が回る参謀格。",
    detail:[{h:"役割", body:"荒くれ揃いの桓騎軍で、交渉や段取りといった『言葉の仕事』を引き受ける。"}],
    battles:["b_kokuyou"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"raido", name:"雷土", yomi:"らいど", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の将", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","荒くれ","忠義"],
    summary:"桓騎軍の主力を担う荒くれ。桓騎への忠義は誰よりも厚い。",
    detail:[{h:"人物", body:"見た目通りの乱暴者だが、部下と桓騎に対する情は深い。実働部隊の要。"}],
    battles:["b_kokuyou"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"kokuou", name:"黒桜", yomi:"こくおう", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の弓将", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","弓","女将"],
    summary:"桓騎軍の弓を束ねる女将。遠距離から確実に将を落とす。",
    detail:[{h:"役割", body:"弓隊を率い、桓騎の奇襲に必要な『確実な一射』を担当する。"}],
    battles:["b_kokuyou"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"zenou", name:"ゼノウ", yomi:"ぜのう", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の怪力", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","怪力","巨漢"],
    summary:"言葉より力で語る桓騎軍の巨漢。人間離れした膂力を持つ。",
    detail:[{h:"人物", body:"一族ぐるみで桓騎軍に属する怪力集団の頭。ぶつければ何でも壊れる、という使い方をされる。"}],
    battles:["b_kokuyou"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"naki", name:"那貴", yomi:"なき", kind:"person", state:"秦", group:"飛信隊",
    role:"桓騎軍 → 飛信隊", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","飛信隊","遊撃"],
    summary:"桓騎軍から飛信隊へ移った遊撃の将。軽やかで抜け目がない。",
    detail:[
      {h:"人物", body:"桓騎軍の中では珍しく計算で動くタイプ。単独行動や偵察に長け、戦場の情報を持ち帰る。"},
      {h:"移籍", body:"黒羊での縁から飛信隊へ加わり、突撃一辺倒だった隊に『裏を取る』選択肢を増やす。"}
    ],
    battles:["b_kokuyou"],
    rel:[{to:"kanki", label:"元主君"},{to:"shin", label:"上官"},{to:"f_hishin", label:"加入"},{to:"f_kanki", label:"元所属"}]
  },
  {
    id:"keisha", name:"慶舎", yomi:"けいしゃ", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧軍の将 / 沈黙の狩人", klass:"軍師", first:"35巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["李牧軍","罠","黒羊"],
    summary:"『沈黙の狩人』と呼ばれる罠の名手。李牧が信を置く腹心。",
    detail:[
      {h:"戦い方", body:"自ら網を張り、相手が踏み込んだ瞬間に閉じる待ちの戦術。動きを読ませないまま将を仕留めてきた。"},
      {h:"最期", body:"黒羊丘で飛信隊と噛み合い、読み合いの果てに信に討たれる。李牧にとって痛恨の損失となる。"}
    ],
    battles:["b_kokuyou"],
    rel:[{to:"riboku", label:"主君"},{to:"shin", label:"討たれた"},{to:"kisui", label:"共闘"},{to:"f_chou", label:"所属"}]
  },
  {
    id:"kisui", name:"紀彗", yomi:"きすい", kind:"person", state:"趙", group:"趙軍",
    role:"黒羊の守将", klass:"武将", first:"36巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["黒羊","民","義"],
    summary:"黒羊の民に慕われる趙の将。土地と人を守るために戦う。",
    detail:[
      {h:"人物", body:"戦果よりも領民を優先する将で、黒羊の住民から絶大に信頼されている。桓騎の非道と最も相性の悪い相手。"},
      {h:"黒羊", body:"慶舎を失った後の趙軍をまとめ、住民を逃がすことを最優先に動く。"}
    ],
    battles:["b_kokuyou"],
    rel:[{to:"keisha", label:"共闘"},{to:"kanki", label:"対峙"},{to:"f_chou", label:"所属"}]
  },
  {
    id:"b_tonryu", name:"屯留の反乱", yomi:"とんりゅうのはんらん", kind:"battle", state:"秦（内乱）", group:"内乱",
    role:"鎮圧（成蟜の死）", klass:"戦い", first:"34巻", arc:"合従軍後", status:"決着",
    tags:["内乱","成蟜","屯留"],
    summary:"合従軍撃退の直後に起きた内乱。成蟜がその鎮圧で命を落とす。",
    detail:[
      {h:"構図", body:"合従軍で疲弊した秦の隙を突く形で、屯留に不穏な動きが生じる。鎮圧に向かったのは、かつて政の王座を狙った王弟・成蟜だった。"},
      {h:"結末", body:"成蟜は秦の王族としての務めを果たして死ぬ。血統に固執していた男の最後の選択が、政にとって重い意味を持つ。"},
      {h:"収録範囲メモ", body:"単行本34巻あたり。"}
    ],
    battles:[],
    rel:[{to:"seikyou",label:"当事者"},{to:"sei",label:"影響"},{to:"f_shin",label:"舞台"}]
  },
  {
    id:"b_kokuyou", name:"黒羊丘の戦い", yomi:"こくようきゅうのたたかい", kind:"battle", state:"秦 vs 趙", group:"対趙戦",
    role:"秦の勝利（黒羊丘を奪取）", klass:"戦い", first:"35巻", arc:"黒羊丘の戦い", status:"決着",
    tags:["対趙","桓騎","慶舎","五千人将","非道"],
    summary:"桓騎の指揮下で戦う初めての戦い。勝ち方の是非が問われる。",
    detail:[
      {h:"構図", body:"秦は趙の要衝・黒羊丘の奪取を狙い、総大将は将軍となったばかりの桓騎。飛信隊はその指揮下に組み込まれる。趙側は李牧の腹心・慶舎と、黒羊の民に慕われる紀彗。"},
      {h:"沈黙の狩人", body:"慶舎は網を張って待つ罠の名手。飛信隊は読み合いの土俵に引きずり込まれ、河了貂の軍師としての力量が正面から試される。"},
      {h:"桓騎のやり方", body:"桓騎は住民を巻き込む非道な手を平然と選び、勝ちを引き寄せる。信は勝利そのものではなく『どう勝つか』を突きつけられ、上官と正面から対立する。"},
      {h:"決着", body:"信が慶舎を討ち取り、秦は黒羊丘を奪う。信は五千人将へ。桓騎軍から那貴が飛信隊に加わる。"},
      {h:"収録範囲メモ", body:"単行本35〜40巻あたり。このDBはここまでを収録。"}
    ],
    battles:[],
    rel:[{to:"kanki",label:"主将"},{to:"keisha",label:"敵将"},{to:"kisui",label:"敵将"},{to:"shin",label:"参戦"},{to:"tenn",label:"参戦"},{to:"kyoukai",label:"参戦"},{to:"naki",label:"参戦"},{to:"riboku",label:"敵軍"},{to:"f_chou",label:"対戦国"}]
  }

  ],

  /* ───────────── あらすじ（大まかな章の束） ─────────────
     読了地点までを5つの束に整理。keys / battles は node id。 */
  arcs: [
  {
    id:"a1", no:"I", name:"下僕と王 — 王都奪還編",
    ep:"第1シリーズ 第1〜11話", vols:"原作 1〜5巻", era:"秦王政 元年ごろ",
    lead:"下僕の少年が王と出会い、奪われた王座を取り戻すまで。すべての始まり。",
    beats:[
      {ep:"1〜2話", h:"二人の下僕", body:"戦争孤児の信と漂は、城戸村で下僕として働きながら剣の稽古だけを続けていた。身分では一生届かない『天下の大将軍』を二人で目指すという約束が、この物語の全ての土台になる。ある日、大臣・昌文君の目に留まった漂だけが王宮に召し上げられていく。"},
      {ep:"2〜3話", h:"漂の死", body:"王宮で起きた政変に巻き込まれ、漂は瀕死で村へ帰り着く。息を引き取る直前に一枚の地図を残し、そこへ向かった信が出会ったのが、漂と瓜二つの少年——秦王・嬴政だった。漂は影武者として死んだのだと知り、信は初めて『国』というものに怒りを向ける。"},
      {ep:"3〜4話", h:"逃亡と河了貂", body:"王座を弟に奪われた政は、信を連れて追手をかわしながら反攻の算段を立てる。道中で加わるのが、鳥使いの一族・梟鳴の生き残り、蓑を被った河了貂。三人はまだ互いを利用し合う関係にすぎない。刺客集団・朱凶の追撃が続く。"},
      {ep:"5〜6話", h:"山界へ", body:"手勢がまるで足りない政が選んだのは、平地の人間を敵とみなす山の民との再同盟だった。かつての裏切りで断絶した相手のもとへ単身で乗り込み、五百年前の穆公との盟約を根拠に交渉する。山界の王・楊端和と、バジオウ・タジフ・シュンメンら戦士たちが姿を見せる。"},
      {ep:"7〜8話", h:"同盟成立", body:"武で従わせるのではなく、理由を示して味方に変える。政の交渉は成立し、楊端和は賭けに乗る。戦力の帳尻が一気に覆り、一行は山を越えて咸陽へ向かう。"},
      {ep:"9〜10話", h:"咸陽突入", body:"王宮に踏み込んだ一行を、鎖に繋がれた巨人ランカイや刺客・左慈が迎え撃つ。信は将としての戦い方をまだ知らず、ひたすら前へ出るしかない。壁ら少数の味方が合流し、王宮の奥へ道が開いていく。"},
      {ep:"11話", h:"成蟜との対決", body:"『王族の血こそすべて』と信じる王弟・成蟜に対し、政は別の物差しを突きつける。王座は政の手に戻り、信は下僕の身分から武功による士官へ。二人の少年が、それぞれの立ち位置で最初の一段を上がる。"},
      {ep:"—", h:"この束のテーマ", body:"血筋か、それを超えるものか。王も将も生まれで決まらない、という物語全体の前提がこの章で置かれる。"}
    ],
    keys:["shin","hyou","sei","tenn","seikyou","youtanwa","bajio","tajifu","shunmen","shoubunkun","heki","rankai","saji","ketsushi","shiishi"],
    battles:["b_outo"]
  },
  {
    id:"a2", no:"II", name:"初陣 — 蛇甘平原の戦い",
    ep:"第1シリーズ 第12〜17話", vols:"原作 5〜7巻", era:"対魏",
    lead:"信が初めて『戦争』を知る戦い。個人の剣と、軍という仕組みの落差。",
    beats:[
      {ep:"12話", h:"歩兵として", body:"魏の侵攻に対し、秦は麃公を主将に迎え撃つ。士官したばかりの信は一兵卒として徴集され、澤圭の伍に組み込まれる。尾平・尾到ら、のちの飛信隊の顔ぶれがここで揃い始める。"},
      {ep:"12〜13話", h:"戦場の仕組み", body:"斬った首の数で功が決まり、功が階級と褒賞になる。剣の腕だけを信じてきた信が、初めて『軍』という装置の中に置かれる。前線の兵にとって、戦は英雄譚ではなく確率の問題だと突きつけられる。"},
      {ep:"13〜14話", h:"縛虎申の丘", body:"鬼百人将・縛虎申の下で、退けば斬るという条件つきで丘の死守を命じられる。命令と生存が真正面から衝突し、縛虎申は最後まで退かずに戦死する。信が『上官』というものを初めて意識した相手。"},
      {ep:"14〜15話", h:"羌瘣の登場", body:"戦場に現れた無名の剣士・羌瘣。人間離れした速度で敵を斬り伏せながら、自分の目的を一切語らない。蚩尤族の暗殺者が別の理由で秦軍に潜り込んでいたことは、まだ誰も知らない。"},
      {ep:"15〜16話", h:"将を討つ", body:"宮元、そして干央。歩兵の集団が将の首を狙うという構図が成立し、信の隊は戦場の駒から目的を持った刃に変わっていく。"},
      {ep:"16〜17話", h:"呉慶と麃公", body:"魏の総大将・呉慶は、滅ぼされた故国を背負い『戦を無くすために戦う』と語る男だった。政の理想と鏡合わせの思想を掲げた彼を、理屈ではなく『火』で動く麃公が一騎打ちで討ち取る。"},
      {ep:"17話", h:"結果", body:"秦の勝利。信はこの戦の武功で百人将へ引き上げられ、初めて人を預かる立場になる。"},
      {ep:"—", h:"この束のテーマ", body:"戦は勇気ではなく仕組みで動く。信が『強い個人』から『隊を率いる者』へ移るための最初の授業。"}
    ],
    keys:["shin","kyoukai","hyoukou","bakukoshin","gokei","kan'ou","kyuugen","takuke","obei","obito","hairou","denyuu"],
    battles:["b_dakan"]
  },
  {
    id:"a3", no:"III", name:"王騎の戦 — 馬陽の戦い",
    ep:"第1シリーズ 第18〜38話", vols:"原作 8〜16巻", era:"対趙",
    lead:"巨星の復帰と退場。飛信隊が生まれ、信の目標が『大将軍』として具体化する。",
    beats:[
      {ep:"18〜20話", h:"王騎、現る", body:"六大将軍最後の生き残り・王騎。昭王の死後は軍を退いて隠棲していたが、若い王の器を自分の目で測るために動き出す。異様な口調と、戦場全体を掌の上で転がす戦術眼を併せ持つ、格の違う存在として登場する。"},
      {ep:"20〜22話", h:"趙の侵攻", body:"趙が馬陽に侵攻し、秦は王騎を総大将に据える。蒙武・麃公という濃い将が同じ盤上に並び、対する趙軍の主将は知将・趙荘。国境の一戦のはずが、両国の主力がぶつかる大戦になる。"},
      {ep:"22〜24話", h:"飛信隊誕生", body:"信は百人隊を預かり、王騎から『飛信隊』の名と旗を授かる。寄せ集めの歩兵が、名前を持った部隊として戦場に立つ。ここから飛信隊は『少数で将首を狙う隊』という性格を固めていく。"},
      {ep:"24〜26話", h:"馮忌と麃公", body:"堅実な用兵で秦軍を削る趙将・馮忌に対し、麃公は理屈を捨てた突撃で首を取る。本能型の将が何を見て動いているのか、その不気味さと強さが描かれる。"},
      {ep:"27〜29話", h:"万極", body:"長平の生き埋めを生き延びた趙将・万極。秦兵を殺すことだけが生きる理由になった男を、飛信隊が討ち取る。戦争が人に何を残すのかという、この作品の暗い側面が正面から出てくる。"},
      {ep:"29〜31話", h:"尾到", body:"敵中で消耗し切った信を背負い、尾到は味方陣地の目前まで走り抜いて力尽きる。飛信隊の初期を象徴する死であり、信が『自分が生きているのは誰かが死んだから』と知る場面。"},
      {ep:"31〜33話", h:"摎という過去", body:"王騎が馬陽にこだわる理由が明かされる。六大将軍唯一の女将軍・摎、孤児から拾われて城を落とし続けた歩み、そして『城を百獲ったら嫁にする』という約束。その百個目がこの地だった。"},
      {ep:"34〜36話", h:"趙荘の罠", body:"趙荘は武神・龐煖という札を伏せたまま、王騎を戦場の奥へ誘い込んでいた。秦は趙荘を破って戦術的には勝つ。だが盤面はすでに相手の設計通りに動いていた。"},
      {ep:"37〜38話", h:"王騎の死", body:"龐煖の一撃で致命傷を負った王騎は、死に際して信に自らの矛を託し、天下の大将軍への道筋を言葉で残す。政は最大の後ろ盾を失い、信は背負うものを一つ増やす。"},
      {ep:"—", h:"この束のテーマ", body:"物語の第一の区切り。信は武功を重ねる少年から、将としての視野を問われる立場へ移る。"}
    ],
    keys:["ouki","shin","tou","kyou","houken","chousou","bankyoku","fuuki","moubu","hyoukou","obito","tenn","kyogai","f_hishin"],
    battles:["b_bayou"]
  },
  {
    id:"a4", no:"IV", name:"内なる戦 — 蚩尤と呂不韋",
    ep:"第2シリーズ 第1〜12話", vols:"原作 16〜19巻", era:"秦の内政 / 羌瘣の過去",
    lead:"戦場が一度止まり、政治と過去の清算が進む。三人がそれぞれ次の形に組み替わる期間。",
    beats:[
      {ep:"1〜3話", h:"王のいない王権", body:"王騎を失った秦で、相国・呂不韋の権力はさらに厚くなる。昌平君（軍）・李斯（法）・蔡沢（外交）・司馬空（土木）の四柱が実務を握り、王はまだ飾りに近い。政は親政に向けた足場を、政治の側から作り始める。"},
      {ep:"3〜4話", h:"政と太后", body:"趙での人質時代に自分を庇わなかった母・太后との断絶が表に出る。政の抱えているものが、単なる理想論ではなく個人史に根を持つことが示される。"},
      {ep:"4〜6話", h:"河了貂の選択", body:"戦場で『自分に何ができるか』を突きつけられた河了貂は、武ではなく軍師の道を選び、昌平君の兵法学校へ入る。突撃一辺倒だった飛信隊に、初めて戦術的な意思決定が持ち込まれる準備が始まる。"},
      {ep:"6〜8話", h:"羌瘣の離隊", body:"羌瘣は仇を討つために飛信隊を離れる。巫舞という秘技が寿命を削る代償の上に成り立っていることも明かされ、彼女が何を捨てて戦っていたのかが見えてくる。"},
      {ep:"8〜10話", h:"蚩尤の里", body:"数十年に一度、一族の精鋭が殺し合って『蚩尤』の座を継ぐ儀式。姉のように慕った羌象と交わした、二人で里を出るという約束。羌瘣の芯にあるものが回想として描かれる。"},
      {ep:"10〜11話", h:"幽連との決着", body:"羌象を手にかけた幽連との死闘。復讐が終わったあと、羌瘣に残るのは目的のない自由と、帰る場所としての飛信隊だった。"},
      {ep:"11〜12話", h:"次の階段", body:"信は三百人将を経て千人将へ。渕のような実務型を加えて隊の規模が増し、『個人の武で勝つ』段階から少しずつ離れていく。"},
      {ep:"—", h:"この束のテーマ", body:"戦の合間に、三人がそれぞれ役割を選び直す章。次の戦場に立つときには、飛信隊は別の生き物になっている。"}
    ],
    keys:["ryofui","shouheikun","risi","saitaku","shibakuu","taigo","sei","tenn","kyoukai","kyoushou","yuren","en","shin","f_ryofui"],
    battles:[]
  },
  {
    id:"a5", no:"V", name:"世代の戦 — 山陽攻略戦",
    ep:"第2シリーズ 第13〜39話", vols:"原作 20〜25巻", era:"対魏",
    lead:"師を失った信が、初めて『千人を率いる将』として結果を問われる戦い。同世代が同じ戦場に並ぶ。",
    beats:[
      {ep:"13〜15話", h:"呂不韋の戦争", body:"秦は老将・蒙驁を総大将に、魏の要衝・山陽へ侵攻する。動かしているのは呂不韋であり、これは軍事の話であると同時に政治の話でもある。蒙武・騰という主力が加わり、大軍が国境を越える。"},
      {ep:"15〜18話", h:"三人の千人将", body:"信の飛信隊、王賁の玉鳳隊、蒙恬の楽華隊。寄せ集めの突撃力、名門の規律、天才肌の柔軟さ。同世代の三人が同じ戦場に置かれ、指揮スタイルの差が正面から比較される。王賁は下僕上がりの信を露骨に見下す。"},
      {ep:"18〜21話", h:"廉頗という壁", body:"守るのは、かつて趙三大天に数えられ、王の代替わりで国を出た老将・廉頗。輪虎・玄峰・介子坊・姜燕の四天王を従え、秦の旧世代の将たちさえ名を聞いて表情を変える『別格』が立ちはだかる。"},
      {ep:"21〜25話", h:"首狩り・輪虎", body:"戦線を無視して秦の将だけを狩り続ける輪虎。前線が崩れるのではなく、頭から順に落とされていく恐怖が秦軍に広がる。飛信隊は組織的に対抗する術を持たないまま、この相手を追うことになる。"},
      {ep:"25〜28話", h:"信 対 輪虎", body:"単騎で追いついた信が、格上の将と真正面から一騎打ちに入る。王騎から受け継いだ矛で仕留めたこの一戦が、信の評価を『武功を重ねる千人将』から一段上へ押し上げる。"},
      {ep:"28〜32話", h:"四天王の持ち場", body:"重装で正面を圧殺する介子坊、戦線を保つ姜燕、盤面を組み立てる軍師格の玄峰。四天王それぞれの役割が崩れていく過程で、廉頗軍という一つの生き物が解体されていく。"},
      {ep:"32〜37話", h:"蒙武 対 廉頗", body:"武だけを信じてきた蒙武と、老いても別格の廉頗が真正面からぶつかる。軍略を軽んじてきた男が、格上との力比べに競り勝つ。蒙武にとっても一つの分岐点になる勝負。"},
      {ep:"37〜39話", h:"山陽陥落", body:"廉頗は戦場を去り、山陽は秦の手に落ちる。信は三千人将へ。同世代三人はそれぞれ実績を持ち帰り、次の戦場では上の位を争う関係になる。"},
      {ep:"—", h:"この束のテーマ", body:"個人の武で勝つ段階の終わり。信は隊をどう動かすかを問われる位置へ移り、世代交代が実際の階級として形になる。"}
    ],
    keys:["mougou","moubu","tou","shin","ouhon","mouten","renpa","rinko","genpou","kaishibou","kyouen","rokuomi","tenn"],
    battles:["b_sanyou"]
  },
  {
    id:"a6", no:"VI", name:"王とは何か — 呂不韋との対決",
    ep:"第3シリーズ 第1〜6話", vols:"原作 24〜26巻", era:"秦の内政 / 政の過去",
    lead:"戦場を離れ、王と相国が言葉だけで殴り合う。政という人間の芯が明かされる章。",
    beats:[
      {ep:"1〜2話", h:"正面からの論戦", body:"山陽を落として勢いに乗る秦で、政と呂不韋がついに面と向かって国のあり方を論じる。金と力で回すのか、それとも別の原理か。武ではなく言葉で決する、この作品では珍しい種類の対決。"},
      {ep:"2〜3話", h:"趙にいた少年", body:"政は自らの過去を語り始める。人質として趙で生まれ、石を投げられ、人として扱われなかった日々。心を閉ざした少年が、なぜ『戦のない中華』を掲げるに至ったのか。"},
      {ep:"3〜4話", h:"紫夏", body:"その少年を引き取ったのが、趙の女商人・紫夏だった。仕事として引き受けたはずの子どもを、一人の人間として扱った。政が『光』と呼ぶものの原点がここにある。"},
      {ep:"4〜5話", h:"逃避行", body:"追手をかわしながら国境を目指す逃避行。紫夏は最後に自らの命と引き換えに政を秦へ送り届ける。理想が誰かの犠牲の上に立っているという構図が、政の言葉に重さを与える。"},
      {ep:"5話", h:"呂不韋の答え", body:"呂不韋は理想を頭ごなしに否定しない。そのうえで『国は金で回る』と返す。どちらも自分の論に一分の隙もないまま、決着は先送りされる。"},
      {ep:"6話", h:"嵐の前", body:"膨張を続ける秦に対し、中華全土で包囲の動きが始まっていた。次の章でそれが形になる。"}
    ],
    keys:["sei","ryofui","shika","shoubunkun","shouheikun","taigo"],
    battles:[]
  },
  {
    id:"a7", no:"VII", name:"五国、来たる — 合従軍編",
    ep:"第3シリーズ 第7〜26話", vols:"原作 26〜33巻", era:"対 楚・趙・魏・韓・燕",
    lead:"中華が束になって秦を潰しに来る。国が滅ぶ寸前まで追い込まれ、王の言葉がそれを押し返す。",
    beats:[
      {ep:"7〜9話", h:"五国が組む", body:"膨張する秦を潰すため、利害の異なる楚・趙・魏・韓・燕が一度だけ手を結ぶ。総大将は楚の宰相・春申君、実質の設計者は趙の李牧。兵力差は絶望的で、秦は函谷関という一点に全てを集めて迎え撃つしかない。"},
      {ep:"9〜11話", h:"函谷関", body:"昌平君が全体を差配し、関の上で各将が持ち場を受け持つ。落ちれば咸陽までの道が開くという条件下で、秦軍は削られながら耐える戦い方を選ぶ。連合側は国ごとに担当を分け、四方から同時に圧をかける。"},
      {ep:"11〜14話", h:"蒙武 対 汗明", body:"『中華最強』を自称する楚の大将軍・汗明と、同種の純粋な武で応じる蒙武。力比べの末に討ち取った蒙武が、武でしか語れない男から一段上がる契機になる。"},
      {ep:"14〜16話", h:"王翦の戦い方", body:"仮面の将・王翦が初めて本格的に描かれる。燕のオルド、楚の臨武君を相手に、正面からの消耗を避けて地形と情報で削る。忠誠より損得で動く不気味さが、秦軍の中でも異質な存在感を出す。"},
      {ep:"16〜18話", h:"張唐と成恢", body:"小国・韓が送り込んだ毒使い・成恢。搦め手で秦の将を削ろうとする相手に対し、老将・張唐は自らの死を対価にして討ち取る。旧世代がまた一人退場する。"},
      {ep:"18〜19話", h:"呉鳳明の井闌車", body:"蛇甘平原で討たれた呉慶の子・呉鳳明。武ではなく設計で戦う技術者型の将が、巨大な井闌車で『落ちないはずの城壁』を初めて越えさせる。"},
      {ep:"19〜21話", h:"麃公の火", body:"関に籠ることを拒んで平地に出た麃公が、王騎を討った龐煖と一騎打ちに臨む。理屈ではなく『火』で戦い続けた将が、その火を燃やし尽くして討たれる。"},
      {ep:"21〜22話", h:"李牧の本手", body:"函谷関に全軍が釘付けになっている隙に、李牧は軍を割いて山を越え、王都・咸陽の喉元にある蕞へ迫る。あの総力戦そのものが、彼の盤面の一部だった。"},
      {ep:"22〜24話", h:"蕞 — 王が前に出る", body:"守る兵はほとんどいない。嬴政は自ら蕞へ入り、兵ではない住民に向かって語りかける。命令ではなく理由を示すことで、街ごと戦う集団に変える。政という王の資質が、そのまま国の存亡を決める場面。"},
      {ep:"24〜25話", h:"四人の城壁", body:"信の飛信隊、復讐を終えて戻った羌瘣、軍師となった河了貂、そして政。始まりの四人が同じ城壁に並ぶ。龐煖も現れ、信は再びその前に立つ。壁や昌文君も含め、序盤からの顔ぶれが総登場する。"},
      {ep:"25〜26話", h:"決着", body:"数日の総攻撃に耐え切り、援軍の到着を前に李牧は撤退を選ぶ。楊端和も駆けつけ、連合は崩れ、秦は滅亡の淵から生還した。"},
      {ep:"—", h:"この束のテーマ", body:"理念は言葉だけでは終わらない、という証明。政が掲げてきたものが、実際に国を救う形で回収される。"}
    ],
    keys:["sei","shin","kyoukai","tenn","shouheikun","moubu","tou","ousen","choutou","hyoukou","heki","youtanwa","riboku","houken","kaine","shunshinkun","kanmei","rinbukun","seikai","orudo","gohoumei","kanto"],
    battles:["b_kankoku","b_sai"]
  },
  {
    id:"a8", no:"VIII", name:"どう勝つか — 黒羊丘の戦い",
    ep:"第4シリーズ 第1〜26話", vols:"原作 34〜40巻", era:"対趙 / 桓騎の下で",
    lead:"世代が入れ替わり、信は初めて『勝ち方』そのものを問われる。桓騎という異物が突きつける問い。",
    beats:[
      {ep:"1〜2話", h:"戦後の秦", body:"合従軍撃退の功で、王翦・楊端和・桓騎が将軍位に就く。六大将軍のような絶対的な制度ではないが、旧世代の後を継ぐ顔ぶれがここで固まる。飛信隊も三千人将の隊として次の戦場を待つ。"},
      {ep:"2〜3話", h:"蒙驁の死", body:"山陽を落とした老将・蒙驁が、老いに勝てず陣中で世を去る。蒙武・蒙恬という三代が並んだ家の、いちばん上が抜ける。旧世代の退場が続く。"},
      {ep:"3〜5話", h:"屯留の反乱と成蟜", body:"疲弊した秦の隙を突く形で屯留に反乱が起きる。鎮圧に向かったのは、かつて政の王座を狙った王弟・成蟜だった。血統に固執していた男が最後に秦の王族としての務めを選び、命を落とす。政にとって重い回収になる。"},
      {ep:"5〜7話", h:"桓騎の下へ", body:"飛信隊は、野盗上がりの将軍・桓騎の指揮下に組み込まれて黒羊丘へ向かう。飄々として底が読めず、味方でさえ次の判断を先読みできない上官。信が初めて『尊敬できない相手の指揮』を受ける。"},
      {ep:"7〜9話", h:"桓騎軍という異物", body:"摩論・雷土・黒桜・ゼノウ。癖の強い顔ぶれが並ぶ、秦軍の中でも異形の軍団。正攻法をほとんど採らず、騙し・急襲・恐怖で敵を崩す。軍としての強さは本物だという事実が、話をややこしくする。"},
      {ep:"9〜13話", h:"沈黙の狩人・慶舎", body:"趙側で待つのは李牧の腹心・慶舎。自ら網を張り、踏み込んだ瞬間に閉じる罠の名手。動きを読ませないまま将を仕留めてきた相手に、飛信隊は真正面から読み合いの土俵へ引きずり込まれる。"},
      {ep:"13〜16話", h:"河了貂の試練", body:"力押しが通じない盤面で、軍師・河了貂の判断がそのまま隊の生死になる。兵法学校で学んだものを実戦で使い切る章であり、飛信隊が『信の隊』から『信と貂の隊』へ変わっていく過程。"},
      {ep:"16〜19話", h:"勝つための非道", body:"桓騎は黒羊の住民を巻き込む手を平然と選び、実際にそれで勝ちを引き寄せる。信は勝利そのものではなく『どう勝つか』を突きつけられ、上官と正面から衝突する。王騎が示した大将軍像との落差が効いてくる。"},
      {ep:"19〜21話", h:"紀彗", body:"黒羊の民に慕われる趙将・紀彗。戦果よりも領民を守ることを優先する将の存在が、桓騎のやり方の意味をもう一段重くする。同じ戦場に、正反対の『正しさ』が二つ立つ。"},
      {ep:"21〜24話", h:"信 対 慶舎", body:"罠を張る側と踏み込む側の読み合いの果てに、信が慶舎を討ち取る。李牧にとって痛恨の損失であり、信にとっては初めて『知略の将』を正面から食った戦い。"},
      {ep:"24〜26話", h:"決着", body:"秦は黒羊丘を奪い、信は五千人将へ。桓騎軍から那貴が飛信隊に加わり、突撃一辺倒だった隊に『裏を取る』選択肢が増える。得たものと、後味の悪さが同時に残る。"},
      {ep:"—", h:"この束のテーマ", body:"強さの次は、正しさ。王騎が示した『大将軍』像と、桓騎が体現する『勝てば官軍』のあいだで、信が自分の線をどこに引くかという章。"}
    ],
    keys:["shin","kanki","tenn","kyoukai","naki","maron","raido","kokuou","zenou","keisha","kisui","riboku","mougou","seikyou","ousen","youtanwa","f_kanki"],
    battles:["b_tonryu","b_kokuyou"]
  }
  ]
};

if (typeof module !== "undefined") { module.exports = KINGDOM; }

/* ============================================================
   VIVANT（TBS日曜劇場）リサーチDB — データ定義
   収録範囲: 第1シーズン（2023年・第1〜10話）＋ 第2シーズン（2026年・第11〜23話）
            第24話（第2シーズン最終話）は 2026-11-08 放送予定のため未収録。
   追記するときは VIVANT.nodes に足すだけでグラフ／表／詳細に反映される。
   ------------------------------------------------------------
   node schema
     id      : 一意キー（英数字）
     name    : 表示名
     yomi    : ふりがな（検索対象）
     kind    : 'person' | 'battle'（＝作戦・事件） | 'faction'（＝組織）
     state   : 陣営（バッジ色のキー）
     crew    : 登場シーズン（S1のみ / S1・S2 / S2から）
     group   : 国籍・出身（チップは先頭語）
     role    : 立場（battle は結果）
     klass   : 分類（工作員/捜査官/幹部/医師/政治家/作戦/事件/組織 など）
     origin  : 表の顔（カバー）・所属
     fruit   : 能力・武器
     ftype   : 能力の系統
     rank    : 年齢（2023年6月末時点の満年齢。公式設定。享年含む）
     epi     : 初登場の章
     first   : 初登場話
     status  : 第23話時点の状態（生存/死亡/死亡偽装→生存/拘束 など）
     tags / summary / detail / battles / rel : ブルーロックDB等と共通
   ============================================================ */

const VIVANT = {
  meta: {
    title: "VIVANT リサーチDB",
    range: "第1シーズン（2023年・第1〜10話）＋第2シーズン（2026年・第11〜23話）",
    note: "第2シーズンは2026年11月8日の第24話で完結予定。本DBは第23話（11月1日放送）までを収録し、最終話の展開は入れていません。ネタバレ制限なし。テーブルは 章 / 陣営 / 登場シーズン / 国籍 / 能力の系統 / 年齢 / 出演話数 を含む全列でソート・絞り込みできます。",
    updated: "2026-11-02"
  },

  /* 顔画像: TBS公式サイト登場人物ページの役柄写真を220px正方形に顔クロップ（vivant_faces/README.md）。ローカル閲覧専用 */
  faces: { dir: "vivant_faces/", ids: ["adiel", "akemi", "ali", "batraka", "beki", "chinggis", "chocky", "drum", "elisha", "gerun", "han", "hayato", "hiromichi", "hirose", "iria", "isaku", "jamiin", "kaoru", "kawai", "kumagai", "kurosu", "li", "liu", "mata", "nagano", "nishioka", "nogi", "noko", "nozaki", "ota", "piyo", "sakurai", "sam", "sano", "shichi", "shinjo", "suzuki", "tairan", "takada", "tashiro", "tojo", "ton", "usami", "wada", "wanizu", "yamamoto", "zair", "zhang", "zhou"] },

  /* 人物プロフィール（node id → 個人データ）
     出典: Wikipedia「VIVANTの登場人物」（演者・年齢・生年月日・出演回）、TBS公式サイト。
     cv=演者 / voice=吹替（外国人キャストの日本語音声） / age=2023年6月末の満年齢 / birth=生年月日
     rank=肩書 / epithet=コードネーム・異名 / eps=第23話までの出演話数（Wikipedia記載の出演回から算出） */
  profiles: {
    "nogi":     {cv:"堺雅人", age:"42歳", birth:"1981年1月25日", rank:"丸菱商事 エネルギー開発事業部2課長", epithet:"別班／丹後隼人（旧名）", eps:23},
    "f":        {cv:"堺雅人", age:"—", birth:"—", rank:"乃木の別人格", epithet:"F", eps:null},
    "nozaki":   {cv:"阿部寛", age:"50歳", birth:"1972年11月10日", rank:"警視庁公安部 外事第4課長→理事官（警視）", epithet:"鶏群の一鶴", eps:22},
    "kaoru":    {cv:"二階堂ふみ", age:"32歳", birth:"1991年8月18日", rank:"WHI医師→日本医療センター 小児心臓外科専攻医", epithet:"—", eps:18},
    "jamiin":   {cv:"Nandin-Erdene Khongorzul（S1）／本間さえ（S2）", age:"—", birth:"—", rank:"ノバク村の少女", epithet:"奇跡の子／本名プリシャ・ママドフ", eps:17},
    "noko":     {cv:"二宮和也", age:"35歳", birth:"—", rank:"テントNo.2→バルカ政府 資源開発担当特別長官", epithet:"乃木の義弟", eps:17},
    "beki":     {cv:"役所広司（40年前：林遣都）", age:"68歳", birth:"1955年8月15日", rank:"テント創設者／元公安部外事第1課 警部補", epithet:"ノゴーン・ベキ（緑の魔術師）", eps:12},
    "kurosu":   {cv:"松坂桃李", age:"—", birth:"—", rank:"JKT資源開発 エンジニア", epithet:"乃木の後輩", eps:16},
    "sakurai":  {cv:"キムラ緑子", age:"—", birth:"—", rank:"別班 司令", epithet:"—", eps:15},
    "hayato":   {cv:"—", voice:"高山みなみ", age:"—", birth:"—", rank:"別班のスーパーコンピュータ", epithet:"AIハヤト", eps:null},
    "nagano":   {cv:"小日向文世", age:"60歳", birth:"1962年10月28日", rank:"丸菱商事 代表取締役専務執行役員", epithet:"fox.777／東南アジア統括の別班員", eps:8},
    "takada":   {cv:"市川笑三郎", age:"53歳", birth:"1969年9月1日", rank:"経済産業省 資源エネルギー庁", epithet:"—", eps:12},
    "wada":     {cv:"平山祐介", age:"享年52", birth:"1970年12月20日", rank:"アイチ自動車 ロシア支社", epithet:"—", eps:10},
    "hirose":   {cv:"珠城りょう", age:"34歳", birth:"1988年8月5日", rank:"株式会社レイシル SE", epithet:"—", eps:12},
    "kumagai":  {cv:"西山潤", age:"29歳", birth:"1993年10月28日", rank:"万俵製作所 エンジニア", epithet:"—", eps:12},
    "tashiro":  {cv:"レイヤマダ", age:"—", birth:"—", rank:"SOCAR勤務（コーカサス担当）", epithet:"—", eps:null},
    "ota":      {cv:"飯沼愛（S1）／花岡すみれ（S2）", age:"24歳", birth:"1998年9月4日", rank:"元・丸菱商事 財務部", epithet:"ブルーウォーカー（bluew@lker）", eps:null},
    "gerun":    {cv:"Pattarapol Kantapoj", voice:"小山力也", age:"—", birth:"—", rank:"長野のエージェント", epithet:"—", eps:null},
    "shinjo":   {cv:"竜星涼", age:"35歳", birth:"1988年3月24日", rank:"公安部外事第4課 警部", epithet:"テントの最上位モニター", eps:18},
    "sano":     {cv:"坂東彌十郎", age:"55歳", birth:"1967年9月8日", rank:"警視庁 公安部長", epithet:"—", eps:10},
    "suzuki":   {cv:"内野謙太", age:"—", birth:"—", rank:"公安部外事第4課 捜査官", epithet:"シンシーの工作員", eps:13},
    "tojo":     {cv:"濱田岳", age:"32歳", birth:"1990年10月9日", rank:"警視庁 サイバー犯罪対策課", epithet:"元ブラックハッカー", eps:16},
    "drum":     {cv:"富栄ドラム", voice:"林原めぐみ（翻訳アプリの声）", age:"—", birth:"—", rank:"公安のバルカ人協力者", epithet:"—", eps:21},
    "chinggis": {cv:"Barslkhagva Batbold", voice:"大塚明夫（第21話〜）", age:"37歳", birth:"—", rank:"バルカ警察 国家警察警備局 大佐", epithet:"—", eps:10},
    "batraka":  {cv:"林泰文（17歳時：今井柊斗）", age:"56歳", birth:"—", rank:"テント最高幹部／Y2K代表", epithet:"—", eps:11},
    "piyo":     {cv:"吉原光夫", age:"48歳", birth:"—", rank:"テント最高幹部", epithet:"狙撃の名手", eps:11},
    "ali":      {cv:"山中崇", age:"—", birth:"—", rank:"GFL社 社長", epithet:"テント最高幹部（日本担当）", eps:10},
    "adiel":    {cv:"Tsaschikher Khatanzorig", age:"—", birth:"—", rank:"ノバク村の住人", epithet:"テント元幹部", eps:6},
    "shichi":   {cv:"井上肇", age:"—", birth:"—", rank:"テント幹部", epithet:"—", eps:11},
    "mata":     {cv:"内村遥", voice:"高木渉", age:"—", birth:"—", rank:"テント幹部", epithet:"—", eps:14},
    "gilliam":  {cv:"海老原恒和", age:"—", birth:"—", rank:"テントのメンバー", epithet:"—", eps:null},
    "zair":     {cv:"Erkhembayar Ganbold", age:"—", birth:"—", rank:"アマン建設", epithet:"テント最上位モニター", eps:1},
    "yamamoto": {cv:"迫田孝也", age:"享年42", birth:"1980年10月18日", rank:"丸菱商事 エネルギー事業部1課長", epithet:"テント最下位モニター", eps:8},
    "chocky":   {cv:"Tanapak Jongjaiphar", voice:"鬼頭明里", age:"30歳", birth:"1993年4月2日", rank:"CTP社 社長", epithet:"テント元上位モニター", eps:null},
    "han":      {cv:"宮下今日子", age:"—", birth:"—", rank:"シンシー最高責任者／元中国公安部第6局長", epithet:"—", eps:null},
    "liu":      {cv:"堺雅人（二役）", age:"—", birth:"—", rank:"シンシー諜報員／元公安捜査官", epithet:"乃木と瓜二つの男", eps:8},
    "zhang":    {cv:"高橋光臣", age:"—", birth:"—", rank:"元・野崎の部下", epithet:"二重スパイ", eps:null},
    "zhou":     {cv:"リンリン", age:"45歳", birth:"1978年4月13日", rank:"シンシー中核", epithet:"—", eps:null},
    "li":       {cv:"木幡竜", age:"享年35", birth:"1988年2月14日", rank:"シンシー中核", epithet:"—", eps:null},
    "ton":      {cv:"東浩", age:"享年40", birth:"1983年5月25日", rank:"シンシー中核（スナイパー）", epithet:"—", eps:4},
    "elisha":   {cv:"Manaf Dadashov", voice:"古川登志夫（第23話）", age:"—", birth:"—", rank:"核融合の研究者", epithet:"—", eps:4},
    "tairan":   {cv:"Mirza Aghabayli", voice:"若本規夫", age:"70歳", birth:"1952年10月19日", rank:"情報ブローカー", epithet:"—", eps:4},
    "akemi":    {cv:"高梨臨", age:"享年27", birth:"1957年10月31日", rank:"乃木の母", epithet:"—", eps:7},
    "hiromichi":{cv:"井上順", age:"—", birth:"—", rank:"乃木家第15代当主", epithet:"—", eps:3},
    "sam":      {cv:"Martin Starr", age:"—", birth:"—", rank:"CIAオフィサー", epithet:"—", eps:1},
    "uehara":   {cv:"橋爪功", age:"—", birth:"—", rank:"内閣官房副長官／元公安部外事1課長", epithet:"—", eps:null},
    "nishioka": {cv:"檀れい", age:"—", birth:"—", rank:"駐バルカ特命全権大使", epithet:"—", eps:3},
    "wanizu":   {cv:"河内大和", age:"—", birth:"—", rank:"バルカ外務大臣", epithet:"—", eps:3},
    "usami":    {cv:"市川猿弥", age:"50歳", birth:"1973年1月13日", rank:"丸菱商事 エネルギー事業部長", epithet:"—", eps:6},
    "iria":     {cv:"真凛", age:"—", birth:"—", rank:"バルカの看護師", epithet:"—", eps:3},
    "sakamoto": {cv:"森田順平", age:"—", birth:"—", rank:"丸菱商事 社長", epithet:"—", eps:null},
    "kawai":    {cv:"渡辺邦斗", age:"—", birth:"—", rank:"丸菱商事 業務監査部", epithet:"—", eps:3},
    "isaku":    {cv:"—", age:"—", birth:"—", rank:"オルコ村 村長", epithet:"—", eps:null},
    "kimel":    {cv:"—", age:"—", birth:"—", rank:"バルカ法務大臣", epithet:"—", eps:null},
    "yasuda":   {cv:"音尾琢真", age:"—", birth:"—", rank:"テント孤児院の施設長", epithet:"—", eps:null}
  },

  nodes: [
  /* ══════════ 別班 ══════════ */
  {id:"nogi", name:"乃木 憂助", yomi:"のぎ ゆうすけ", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本（バルカ生まれ）", role:"主人公", klass:"工作員",
   origin:"丸菱商事 エネルギー開発事業部2課長", fruit:"二重人格F・8か国語・射撃・重さを10g単位で量る", ftype:"諜報・工作", rank:42,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["主人公","別班","F","丹後隼人","二重人格","神田明神"],
   summary:"うだつの上がらない商社マンを装う別班の工作員。テントの創設者ノゴーン・ベキの実子で、父を撃ち、S2では拉致された別班員の奪還を率いる。",
   detail:[
     {h:"表の顔", body:"丸菱商事エネルギー開発事業部2課長。出世レースから脱落した気弱な社員を演じ、海外に飛び回っても怪しまれない立場を作っている。神田明神への参拝が日課。"},
     {h:"生い立ち", body:"1981年バルカ・ノバク村生まれ。1984年の内乱で両親と生き別れ、人身売買の暴力とストレスで記憶を失う。戦場ジャーナリストに日本へ連れ帰られ、舞鶴の児童養護施設で「丹後隼人」として育つ。孤独の中で別人格Fが現れた。"},
     {h:"別班になるまで", body:"Fの勧めで米国のミリタリースクールへ進み首席で卒業。18歳でテレビに映った家紋から島根の乃木本家を突き止め、DNA鑑定で本名を取り戻す。コロンビア大学在学中の9.11で親友サムが入隊したことを機に、日本を家族と思い2003年に陸上自衛隊へ。心理戦防護課程を経て別班に配属された。"},
     {h:"第1シーズン", body:"誤送金事件でバルカへ渡り、テロに巻き込まれて野崎・薫と逃避行。帰国後は黒須と組んでテントのモニター山本を処刑し、テントの創設者が父・乃木卓だと突き止める。ノコル捕縛の場で別班の仲間を撃ってテントへ潜入、40年ぶりに父と再会。最後は日本で復讐に動いた父を自ら狙撃した（急所は外していた）。"},
     {h:"第2シーズン", body:"赤い饅頭の緊急招集で、黒須ら別班員5人の拉致を知る。新庄・アリ・野崎と手がかりを追い、櫻井が救出を断念したあとも長野の叱咤で奮起。ノコル率いるテント勢力、チョッキー、新庄らとゴルバドのシャキ城を襲って4人を救出した。脱出時にFが樊林杏を挑発したことで、東京の薫とジャミーンが狙われる。"}
   ],
   battles:["e_gosokin","e_zair","e_desert","e_yamamoto","e_ali","e_nokocapture","e_fluorite","e_uehara","e_shinjothai","e_shaki","e_escape","e_tokyoraid"],
   rel:[{to:"f",label:"別人格"},{to:"beki",label:"実父"},{to:"noko",label:"義弟"},{to:"nozaki",label:"命の恩人・好敵手"},{to:"kaoru",label:"恋人"},{to:"jamiin",label:"同居"},{to:"kurosu",label:"後輩・相棒"},{to:"sakurai",label:"上官"},{to:"akemi",label:"母"},{to:"hiromichi",label:"伯父"},{to:"sam",label:"親友"},{to:"liu",label:"瓜二つ"},{to:"f_beppan",label:"所属"}]},

  {id:"f", name:"F", yomi:"えふ", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"乃木の別人格", klass:"別人格",
   origin:"乃木の内面", fruit:"冷徹な判断・尋問・制圧", ftype:"戦闘・狙撃", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["二重人格","別人格","尋問","挑発"],
   summary:"乃木だけに見え、聞こえる強気な別人格。尋問や荒事を買って出る。奪還作戦の指揮を執る一方、樊林杏への挑発が薫たちを危険にさらした。",
   detail:[
     {h:"誕生", body:"施設でいじめられ孤立していた少年期の乃木の前に現れた。以後、話し相手として強引に進む道を示してきた。現れる前の乃木を知らないので、乃木がバルカにいたことも、ベキに会いたがる気持ちも理解できない。"},
     {h:"知る者", body:"黒須・櫻井・アリ・ノコルは存在を知っており、乃木とは別人として会話することもある。アリは「Fは大嫌い」と告げ、ノコルは奪還作戦中に気づいた。"},
     {h:"第2シーズン", body:"奪還作戦で乃木に代わって指揮を執り、和田を殺された報復に李を必要以上に撃って射殺。脱出時にシンシーのシステムを乗っ取り樊林杏を挑発した代償として、薫とジャミーンが狙われた。責任を感じ、第23話では乃木に代わって工作員を返り討ちにする。"}
   ],
   battles:["e_ali","e_shaki","e_escape","e_tokyoraid"],
   rel:[{to:"nogi",label:"主人格"},{to:"han",label:"挑発"},{to:"li",label:"射殺"},{to:"ali",label:"嫌われる"}]},

  {id:"kurosu", name:"黒須 駿", yomi:"くろす しゅん", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"乃木の後輩", klass:"工作員",
   origin:"JKT資源開発 エンジニア", fruit:"資源探索の技術・資金調達・強靭な精神力", ftype:"諜報・工作", rank:null,
   epi:"② 誤送金の黒幕と別班", first:"第4話", status:"生存（救出）",
   tags:["別班","拉致","拷問","守り刀"],
   summary:"乃木を誰より信じる別班の後輩。S1で乃木に撃たれ、S2ではシンシーに拉致されてシャキ城で拷問を受けたが、乃木たちに救い出された。",
   detail:[
     {h:"表の顔", body:"世界でも有数の地下資源探索技術を持つJKT資源開発のエンジニア。別班では資金調達を担当する。岐阜県恵那市出身。"},
     {h:"第1シーズン", body:"モニター山本の処刑に加わる。ノコル捕縛の場で乃木に撃たれた際、ほかの別班員と違い弾をかわして肩で受けたため気絶しなかった。乃木を裏切り者と罵ったが、撃たれた仲間が生きていたことで真意を悟り、「自分にだけは話してほしかった」と吐露した。"},
     {h:"拉致と救出", body:"バルカに残ったところでシンシーの工作員に拉致され、乃木家の守り刀を奪われる。シャキ城で激しい拷問を受けても敵の名や人数を把握し続け、「別班員の中で最も精神力が強い」と評された。救出後は満身創痍のまま乃木（F）と固い握手を交わす。"}
   ],
   battles:["e_yamamoto","e_ali","e_nokocapture","e_abduction","e_shaki","e_escape"],
   rel:[{to:"nogi",label:"先輩"},{to:"ota",label:"想いを寄せられる"},{to:"zhou",label:"拉致された"},{to:"f_beppan",label:"所属"}]},

  {id:"sakurai", name:"櫻井 里美", yomi:"さくらい さとみ", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"別班司令", klass:"司令",
   origin:"別班 司令", fruit:"指揮・判断", ftype:"指揮", rank:null,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"生存",
   tags:["司令","布多天神社","奪還断念"],
   summary:"乃木たち別班の司令。S2では和田の殺害と城の堅牢さを受けて救出断念を決めるが、乃木は長野の叱咤で単独の奪還へ動いた。",
   detail:[
     {h:"接触の作法", body:"布多天神社に毎朝参拝する。乃木との接触は茶道具店の店主から短歌を添えた茶葉で場所を暗示するなど、徹底して痕跡を残さない。"},
     {h:"第2シーズン", body:"別班員拉致を受けて乃木を緊急招集。佐野を呼び出して公安と手を組むが、シャキ城への潜入は困難と判断し救出断念を通告した（第17話）。"}
   ],
   battles:["e_nokocapture","e_abduction"],
   rel:[{to:"nogi",label:"部下"},{to:"hayato",label:"運用"},{to:"sano",label:"手を組む"},{to:"f_beppan",label:"司令"}]},

  {id:"hayato", name:"AIハヤト", yomi:"えーあい はやと", kind:"person",
   state:"別班", crew:"S2から", group:"日本", role:"別班のAI", klass:"AI",
   origin:"別班のスーパーコンピュータ", fruit:"情報分析・嘘の判定", ftype:"ハッキング・情報", rank:null,
   epi:"⑦ 別班拉致と新庄追跡", first:"第11話", status:"稼働中",
   tags:["AI","丹後隼人","高山みなみ"],
   summary:"乃木の別人格Fの精神構造をもとに作られた別班のスーパーコンピュータ。名は乃木の旧名・丹後隼人に由来し、新庄を首謀者と推定した。",
   detail:[
     {h:"成り立ち", body:"世界3位の性能。櫻井より上位の権限者に情報が漏れる危険があったため、S1のテント潜入作戦では使用が制限されていた。アバターは乃木（F）をデフォルメしたイラスト。"},
     {h:"役割", body:"ベキの脱獄を手引きした新庄を拉致の首謀者と推定（第12話）。アリの尋問では嘘の判定役を担う。"}
   ],
   battles:["e_abduction"],
   rel:[{to:"f",label:"精神構造のモデル"},{to:"sakurai",label:"叱られる"}]},

  {id:"nagano", name:"長野 利彦", yomi:"ながの としひこ", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"東南アジア統括の別班員", klass:"工作員",
   origin:"丸菱商事 代表取締役専務執行役員", fruit:"タイ警察とのパイプ・後方支援", ftype:"交渉・政治", rank:60,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["専務","fox.777","別班","タイ","不倫疑惑"],
   summary:"誤送金の回収を厳命した丸菱商事の専務。正体は東南アジアを統括する別班員で、救出を諦めかけた乃木に喝を入れた。",
   detail:[
     {h:"S1での疑惑", body:"太田と親密で不倫を疑われ、公安の取り調べでは若い頃の薬物依存と更生施設通いを供述した。いずれも偽装で、太田との関係は山本から彼女を守る護衛、更生施設の記録は防衛大出身の経歴を隠すための工作だった。"},
     {h:"正体の判明", body:"第13話、櫻井の指示で乃木の部屋に来る「別班の仲間」として現れる。タイ警察特別犯罪局のドンと通じ、新庄の確保を段取りした。配偶者も別班員。"},
     {h:"喝", body:"櫻井が奪還を断念すると乃木を叱咤し、続行を指示（第18話）。エージェントのゲルンを奪還作戦へ送り出した。"}
   ],
   battles:["e_gosokin","e_shinjothai"],
   rel:[{to:"ota",label:"護衛していた"},{to:"gerun",label:"エージェント"},{to:"nogi",label:"喝を入れる"},{to:"kumagai",label:"エリシャ捜索で組む"},{to:"f_beppan",label:"所属"},{to:"f_marubishi",label:"専務"}]},

  {id:"takada", name:"高田 明敏", yomi:"たかだ あきとし", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"拉致された別班員", klass:"工作員",
   origin:"経済産業省 資源エネルギー庁", fruit:"黙秘を貫く胆力", ftype:"諜報・工作", rank:53,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第6話", status:"生存（救出）",
   tags:["別班","拉致","テント潜入作戦"],
   summary:"テント潜入作戦に加わった別班員。S1で乃木に撃たれ（急所外し）、S2で拉致されるが拷問に無言を貫いた。",
   detail:[
     {h:"撃たれた理由", body:"乃木が仲間を裏切った芝居をするため、心臓の動脈を外して撃っていた。棺で日本へ運ばれ、旭川の病院で療養していた。"},
     {h:"第2シーズン", body:"療養中にシンシーに拉致され、キプロス経由で運ばれたことがアリへの嫌疑のきっかけになる。救出後、捕らえた周に「どこへ逃げても必ず見つけて殺す」と告げた。"}
   ],
   battles:["e_nokocapture","e_abduction","e_shaki"],
   rel:[{to:"nogi",label:"撃たれる"},{to:"zhou",label:"復讐を誓う"},{to:"f_beppan",label:"所属"}]},

  {id:"wada", name:"和田 貢", yomi:"わだ みつぐ", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"殉職した別班員", klass:"工作員",
   origin:"アイチ自動車 ロシア支社", fruit:"—", ftype:"諜報・工作", rank:52,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第6話", status:"死亡",
   tags:["別班","殉職","守り刀"],
   summary:"拉致された5人の中で「精神が一番弱い」と見なされ、乃木家の守り刀で指を落とされた末に殺された。奪還作戦で唯一の殉職者。",
   detail:[
     {h:"最期", body:"周の命で守り刀により右手の指をすべて切断され、切腹に見立てて腹を裂かれ、李に胸を刺されて殉職。この死を受けて櫻井は救出断念に傾いた。"},
     {h:"その後", body:"シャキ城に踏み込んだ乃木たちが遺体を回収し、バルカで荼毘に付された。Fは和田に敬礼し、とどめを刺した李を射殺している。"}
   ],
   battles:["e_nokocapture","e_abduction","e_shaki"],
   rel:[{to:"zhou",label:"拷問される"},{to:"li",label:"とどめを刺される"},{to:"f_beppan",label:"所属"}]},

  {id:"hirose", name:"廣瀬 瑞樹", yomi:"ひろせ みずき", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"拉致された別班員", klass:"工作員",
   origin:"株式会社レイシル SE", fruit:"—", ftype:"諜報・工作", rank:34,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第6話", status:"生存（救出）",
   tags:["別班","拉致"],
   summary:"テント潜入作戦に参加した女性の別班員。S2で拉致・拷問を受け救出される。辱めた周が捕らわれると守り刀を手に詰め寄った。",
   detail:[{h:"経歴", body:"名古屋大学理学部卒業後に自衛隊入隊、2015年に除隊して別班配置。表向きはEU向けに医療システム機器を売るレイシル社のSE。"}],
   battles:["e_nokocapture","e_abduction","e_shaki"],
   rel:[{to:"zhou",label:"憎悪"},{to:"f_beppan",label:"所属"}]},

  {id:"kumagai", name:"熊谷 一輝", yomi:"くまがい かずてる", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"拉致された別班員", klass:"工作員",
   origin:"万俵製作所 エンジニア", fruit:"—", ftype:"諜報・工作", rank:29,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第6話", status:"生存（救出）",
   tags:["別班","拉致","エリシャ"],
   summary:"最年少の別班員。かつて長野とエリシャ・ママドフの行方を追っていた。S2で拉致され、救出される。",
   detail:[{h:"経歴", body:"コーネル大学工学部、東京大学大学院を経て2018年に自衛隊入隊、2021年に別班配置。航空機器メーカーに部品を卸す万俵製作所のエンジニアを装う。"}],
   battles:["e_nokocapture","e_abduction","e_shaki"],
   rel:[{to:"nagano",label:"エリシャを追った"},{to:"elisha",label:"捜索対象"},{to:"f_beppan",label:"所属"}]},

  {id:"tashiro", name:"田代 久美子", yomi:"たしろ くみこ", kind:"person",
   state:"別班", crew:"S2から", group:"日本", role:"コーカサス担当の別班員", klass:"工作員",
   origin:"SOCAR（アゼルバイジャン国営石油会社）", fruit:"現地情報網", ftype:"諜報・工作", rank:null,
   epi:"⑧ 野崎の裏切りとシンシー", first:"第2シーズン", status:"生存",
   tags:["別班","アゼルバイジャン","ゴルバド"],
   summary:"コーカサスを担当する現地の別班員。ゴルバドで野崎を監視して住居を突き止め、奪還作戦の後方を支えた。",
   detail:[{h:"役割", body:"エージェントのフィルザ・ロマル・ナティックを使い、シャキ城とオルコ村を調査。ドラムが撃たれた際は輸血用の血液を運んだ。"}],
   battles:["e_shaki"],
   rel:[{to:"nozaki",label:"監視"},{to:"nogi",label:"後方支援"},{to:"f_beppan",label:"所属"}]},

  {id:"ota", name:"太田 梨歩", yomi:"おおた りほ", kind:"person",
   state:"別班", crew:"S1・S2", group:"日本", role:"天才ハッカー", klass:"エージェント",
   origin:"元・丸菱商事 財務部", fruit:"ハッキング", ftype:"ハッキング・情報", rank:24,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["ブルーウォーカー","bluew@lker","ハッカー","誤送金"],
   summary:"誤送金のプログラムを仕込んだ財務部員。正体は山本に脅されていた天才ハッカー「ブルーウォーカー」で、救われたあと別班のエージェントになった。",
   detail:[
     {h:"誤送金の実行犯", body:"テントから素性を知らされた山本に脅され、丸菱商事に入社させられて誤送金を仕組んだ。口封じに倉庫へ拉致され暴行を受けるが、公安に発見されて助かる。"},
     {h:"別班へ", body:"別班が用意した1億円で保釈され、山本を処刑した乃木たちを信じてホワイトハッカーとして協力。テントのサーバーから重要な情報を抜き出した。黒須に想いを寄せる。"},
     {h:"第2シーズン", body:"東条とバディを組んでアゼルバイジャンへ渡り、奪還作戦をハッキングで援護した。ハンドルネームの由来は元巨人のアダム・ウォーカー。"}
   ],
   battles:["e_gosokin","e_shaki"],
   rel:[{to:"yamamoto",label:"脅されていた"},{to:"tojo",label:"バディ"},{to:"kurosu",label:"想いを寄せる"},{to:"nagano",label:"護衛されていた"},{to:"f_beppan",label:"エージェント"}]},

  {id:"gerun", name:"ゲルン", yomi:"げるん", kind:"person",
   state:"別班", crew:"S2から", group:"タイ", role:"長野のエージェント", klass:"エージェント",
   origin:"長野のエージェント", fruit:"手裏剣・銃撃戦", ftype:"戦闘・狙撃", rank:null,
   epi:"⑦ 別班拉致と新庄追跡", first:"第2シーズン", status:"生存",
   tags:["和彫り","手裏剣","新庄の死亡偽装"],
   summary:"上腕から胸に和彫りを入れた長野のエージェント。新庄の死亡偽装を仕込み、奪還作戦では手裏剣と鹵獲した銃で無双した。",
   detail:[{h:"活躍", body:"チョッキーの別荘包囲では救急車の運転手として新庄を確保し、顔の型を取って死亡を偽装。ベトナムで新庄の療養に付き添った後、ゴルバドへ。"}],
   battles:["e_shinjothai","e_shaki"],
   rel:[{to:"nagano",label:"主"},{to:"shinjo",label:"死亡偽装"},{to:"chocky",label:"制圧"}]},

  /* ══════════ 公安・警察 ══════════ */
  {id:"nozaki", name:"野崎 守", yomi:"のざき まもる", kind:"person",
   state:"公安・警察", crew:"S1・S2", group:"日本", role:"公安の切れ者", klass:"捜査官",
   origin:"警視庁公安部 外事第4課長→理事官", fruit:"先読み・観察眼・器用さ（車の修理も傷の縫合も）", ftype:"諜報・工作", rank:50,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"拘束（洗脳下）",
   tags:["公安","鶏群の一鶴","ハリー・ポッター","赤飯","潜入","マインドコントロール"],
   summary:"乃木の正体にいち早く辿り着いた公安の切れ者。S2では別班員を売ったふりでシンシーへ潜入したが、劉銘軒に見破られ洗脳下に置かれた。",
   detail:[
     {h:"第1シーズン", body:"在バルカ大使館に駐在し、自爆テロから乃木を救う。乃木の「眼光紙背に徹す」という言葉や「スネイプ社」のヒントから、別班の任務でテントに潜入していると見抜いて協力した。フローライトの採掘権では西岡とチンギスを動かし、ベキたちの死の偽装も手配した。"},
     {h:"劉銘軒という傷", body:"北京の大使館時代、行き過ぎた捜査を管理できず部下の劉を失ったと思っていた。似た面影の乃木を何かと気にかけるのはそのため。"},
     {h:"裏切りの真相", body:"別班員5人の情報を手土産にシンシーの樊林杏へ接触したのは、シンシーの幹部に成りすますための極秘捜査で、佐野も拉致を黙認していた（第14〜16話）。物語の起点は5年前の潜入計画にある。"},
     {h:"監禁と洗脳", body:"死んだはずの劉に見破られ、9日間水と食料を断たれた末に、救世主のように現れた劉にマインドコントロールされる。タイランの尋問で、ジャミーンがプリシャかもしれないこと、乃木の家に住んでいることを自白してしまった。"}
   ],
   battles:["e_zair","e_desert","e_gosokin","e_fluorite","e_uehara","e_nozakiinf"],
   rel:[{to:"nogi",label:"協力・好敵手"},{to:"drum",label:"協力者"},{to:"liu",label:"元部下・洗脳される"},{to:"chinggis",label:"信頼"},{to:"shinjo",label:"部下"},{to:"sano",label:"上司"},{to:"tojo",label:"弱みを握る"},{to:"han",label:"潜入"},{to:"f_koan",label:"所属"}]},

  {id:"shinjo", name:"新庄 浩太郎", yomi:"しんじょう こうたろう", kind:"person",
   state:"公安・警察", crew:"S1・S2", group:"日本", role:"テントのモニター→協力者", klass:"捜査官",
   origin:"公安部外事第4課 警部", fruit:"内部工作・身体能力", ftype:"諜報・工作", rank:35,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"死亡偽装→生存",
   tags:["モニター","納豆","赤飯","タイ","死亡偽装","チョッキー"],
   summary:"野崎の部下で、正体はテントの最上位モニター。ベキらの脱獄を手引きしたが、S2では拉致とは無関係と分かり、死を偽装して乃木側に加わった。",
   detail:[
     {h:"第1シーズン", body:"乃木を別班と疑って追う一方、太田の解析でテントのモニターと判明。投降したふりのベキ・バトラカ・ピヨを留置場から逃がし、住居と車を用意して自分は海外へ逃げた。"},
     {h:"タイでの拘束", body:"拉致の首謀者と見られ、プーケットのチョッキーの別荘に潜伏。好物の納豆を買わせていたことから居場所が割れる。乃木に両親を人質に取られて尋問されるが、拉致に関与していなかった（第13〜14話）。"},
     {h:"死の偽装", body:"護送中に観念してタイ警察の一斉射撃を浴びるが、病院で乃木の手引きにより身代わりの遺体とすり替えられていた。ベトナムで療養後、ノコルの右腕となるためバルカへ。奪還作戦では尻込むチョッキーに檄を飛ばした。"}
   ],
   battles:["e_uehara","e_shinjothai","e_shaki","e_escape"],
   rel:[{to:"nozaki",label:"上司"},{to:"beki",label:"脱獄を手引き"},{to:"chocky",label:"匿われる"},{to:"nogi",label:"尋問される→協力"},{to:"noko",label:"右腕へ"},{to:"f_tent",label:"モニター"},{to:"f_koan",label:"所属"}]},

  {id:"sano", name:"佐野 雄太郎", yomi:"さの ゆうたろう", kind:"person",
   state:"公安・警察", crew:"S1・S2", group:"日本", role:"公安部長", klass:"捜査官",
   origin:"警視庁 公安部長", fruit:"組織の舵取り", ftype:"交渉・政治", rank:55,
   epi:"② 誤送金の黒幕と別班", first:"第3話", status:"生存",
   tags:["公安部長","黙認"],
   summary:"野崎の上司。乃木が別班だと知りつつ部下には伏せていた。S2では野崎の潜入のため別班員の拉致を黙認していたと明かし、別班と手を組む。",
   detail:[
     {h:"第2シーズン", body:"野崎の失踪に動揺してみせたが、乃木には裏切りを知っていたと見抜かれ、特殊作戦群のカメラで自宅を監視される。別班に連行されて車椅子でAIハヤトの部屋へ。5年前からの潜入計画を語った（第16話）。"}
   ],
   battles:["e_nozakiinf"],
   rel:[{to:"nozaki",label:"部下"},{to:"sakurai",label:"手を組む"},{to:"f_koan",label:"部長"}]},

  {id:"suzuki", name:"鈴木 祥", yomi:"すずき しょう", kind:"person",
   state:"シンシー", crew:"S1・S2", group:"日本", role:"公安に潜むシンシーの工作員", klass:"工作員",
   origin:"公安部外事第4課 捜査官", fruit:"監視・情報漏洩", ftype:"諜報・工作", rank:null,
   epi:"② 誤送金の黒幕と別班", first:"第3話", status:"拘束",
   tags:["二重スパイ","AI鈴木"],
   summary:"野崎の部下として働きながら、公安の情報をシンシーへ流していた工作員。乃木（F）に拘束され、以後はAI鈴木が成りすました。",
   detail:[{h:"S1の伏線", body:"乃木の経歴調査で、留学先の公立高校に在籍していなかったという報告を見落としている。"},
           {h:"正体", body:"仕掛けたカメラで公安を監視し本部に報告していた。拘束後は陸上自衛隊の特別収容施設へ。シンシーに怪しまれないよう、別班が作ったAI鈴木が樊とのやりとりを代行した。"}],
   battles:[],
   rel:[{to:"nozaki",label:"上司（欺く）"},{to:"han",label:"報告"},{to:"f",label:"拘束される"},{to:"f_xinxi",label:"工作員"},{to:"f_koan",label:"潜入"}]},

  {id:"tojo", name:"東条 翔太", yomi:"とうじょう しょうた", kind:"person",
   state:"公安・警察", crew:"S1・S2", group:"日本", role:"ホワイトハッカー", klass:"捜査官",
   origin:"警視庁 サイバー犯罪対策課", fruit:"ハッキング", ftype:"ハッキング・情報", rank:32,
   epi:"② 誤送金の黒幕と別班", first:"第3話", status:"生存",
   tags:["ハッカー","ウルトラシリーズ","茨城空港","ウラジオストク"],
   summary:"公安に協力するサイバー対策課の捜査官。前職はブラックハッカーで、その弱みを野崎に握られ乃木をロシアへ誘導していた。S2では太田とバディを組む。",
   detail:[
     {h:"弱み", body:"モナコ空港のサーバーダウンなどを起こした元ブラックハッカー。野崎の指示で茨城空港にノイズを仕掛け、乃木たちをウラジオストクへ誘導した。"},
     {h:"第2シーズン", body:"島根の潜伏先で乃木（F）に尋問され、失禁するほど怯えて野崎に脅されていたと告白（第15話）。以後は別班に協力し、アゼルバイジャンでハッキング支援。"}
   ],
   battles:["e_shaki"],
   rel:[{to:"nozaki",label:"脅されていた"},{to:"ota",label:"バディ"},{to:"f",label:"怯える"}]},

  {id:"drum", name:"ドラム", yomi:"どらむ", kind:"person",
   state:"公安・警察", crew:"S1・S2", group:"バルカ", role:"野崎の相棒", klass:"協力者",
   origin:"警視庁公安部のバルカ人エージェント", fruit:"身体能力（バク転・張り手）・読唇術", ftype:"戦闘・狙撃", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存（重傷）",
   tags:["翻訳アプリ","林原めぐみ","ブルーウォーカー","ちいかわ"],
   summary:"話せないが、翻訳アプリと手話で意思を伝える公安の協力者。野崎を信じてゴルバドへ単身向かい捕らわれ、劉に撃たれたがチンギスに救われた。",
   detail:[
     {h:"人物", body:"母国語のモンゴル語に加え日本語なども聞き取れるが、言葉を発せない。肥満体だが身体能力が高く、張り手もバク転もこなす。ブルーウォーカーに恋心を抱く。"},
     {h:"第2シーズン", body:"乃木と新庄追跡に動いたあと、野崎の裏切りにも彼を信じ続け、手がかりを探しにゴルバドへ。シンシーに捕らわれ、野崎が洗脳されていく様子を見せつけられる。"},
     {h:"銃撃と蘇生", body:"脱出を試みて劉に撃たれ、心肺停止のまま遺棄されるが、潜伏していたチンギスの応急処置で蘇生。意識を取り戻すと、野崎の自白でジャミーンが危ないと伝えた（第22話）。"},
     {h:"キャスティング", body:"演じる富栄ドラムはバルカ警察のエキストラのオーディションに来ていたところを福澤克雄に抜擢された。役作りの参考は『ちいかわ』と『Mr.ビーン』。"}
   ],
   battles:["e_zair","e_desert","e_shinjothai","e_nozakiinf"],
   rel:[{to:"nozaki",label:"全幅の信頼"},{to:"ota",label:"片想い"},{to:"chinggis",label:"救われる"},{to:"liu",label:"撃たれる"},{to:"nogi",label:"居候"},{to:"f_koan",label:"協力者"}]},

  {id:"chinggis", name:"チンギス", yomi:"ちんぎす ばとばやる", kind:"person",
   state:"バルカ", crew:"S1・S2", group:"バルカ", role:"バルカ警察の大佐", klass:"警察官",
   origin:"バルカ警察 国家警察警備局 大佐", fruit:"捜査力・人脈・外交特権", ftype:"交渉・政治", rank:37,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["テントの孤児院出身","ベキに救われた","スピンオフ"],
   summary:"乃木たちを執拗に追ったバルカ一の警察官。テントの孤児院出身でベキを恩人と慕う。S2では奪還チームの脱出を体を張って助け、ドラムを救い出した。",
   detail:[
     {h:"過去", body:"内戦で両親を失い、病気の妹と入った孤児院で運営者の不正を知って命を狙われ、ベキに救われた。スピンオフ『チンギス ―VIVANT THE ORIGIN STORY―』で少年時代が描かれる。"},
     {h:"第1シーズン", body:"爆破事件の容疑者として乃木たちを追うが、嫌疑が晴れると野崎と協力関係に。フローライトでは法務大臣を動かしてワニズを逮捕させ、図らずもテントへの恩返しになった。"},
     {h:"第2シーズン", body:"ノコルの手引きで奪還作戦にひそかに参加し、周とゼキ警部を人質に取って脱出を助ける。自分はゴルバド警察に捕まるが、バルカの外交圧力で釈放。差出人不明のメッセージを頼りにドラムを救出した（第21〜22話）。"}
   ],
   battles:["e_desert","e_fluorite","e_escape","e_tokyoraid"],
   rel:[{to:"beki",label:"命の恩人"},{to:"nozaki",label:"協力"},{to:"drum",label:"救出"},{to:"zhou",label:"人質に取る"},{to:"kimel",label:"釈放を取り付ける"},{to:"f_balkapolice",label:"所属"}]},

  /* ══════════ テント ══════════ */
  {id:"beki", name:"ノゴーン・ベキ（乃木 卓）", yomi:"のごーん べき のぎ すぐる", kind:"person",
   state:"テント", crew:"S1・S2", group:"日本（島根）", role:"テント創設者／乃木の父", klass:"幹部",
   origin:"元・警視庁公安部外事第1課 警部補", fruit:"緑化技術・軍事作戦の立案・日本刀", ftype:"指揮", rank:68,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"死亡偽装→生存",
   tags:["緑の魔術師","たたら製鉄","家紋","上原","復讐","孤児院"],
   summary:"バルカで「緑の魔術師」と呼ばれた元公安の日本人。祖国に見捨てられ、孤児を救うためテントを作った。息子に撃たれて死んだとされたが生きていた。",
   detail:[
     {h:"渡航と喪失", body:"たたら製鉄の名家・乃木家の次男。東大を出て警察官となり、1979年に公安の任務で農業使節団を装ってバルカへ。砂漠を緑化して「ノゴーン・ベキ」と呼ばれた。1984年の内乱で救出ヘリが引き返し、拘束されて憂助と生き別れ、拷問で妻・明美を失う。"},
     {h:"テントの誕生", body:"バトラカに助けられ、4年間憂助を探し回るが日本人孤児が死んだと聞いて自暴自棄に。兄を亡くした乳児ノコルを息子として育て、村の用心棒を請け負ううちに孤児を養うようになった。これがテントの原型。"},
     {h:"復讐", body:"フローライトの採掘権を得たあと公安に投降し日本へ。真の目的は、救出ヘリを退避させた当時の上司・上原史郎への復讐だった。新庄の手引きで脱獄し上原邸を襲うが、駆けつけた憂助に撃たれ「お前は私の誇り」と言い残す。"},
     {h:"生存", body:"憂助は急所を外していた。野崎が手配した遺体で死を偽装し、野崎の兄の執刀で一命を取りとめ、奥出雲の実家で静養後、新しい身分でバルカへ帰った。S2第22話で生存が明かされ、第23話で憂助に、アディエルとプリシャを救った経緯を語る。"}
   ],
   battles:["e_nokocapture","e_fluorite","e_uehara","e_prisha"],
   rel:[{to:"nogi",label:"実子"},{to:"noko",label:"養子"},{to:"akemi",label:"妻"},{to:"batraka",label:"命の恩人・側近"},{to:"piyo",label:"側近"},{to:"uehara",label:"復讐の標的"},{to:"adiel",label:"拾って育てた"},{to:"hiromichi",label:"兄"},{to:"f_tent",label:"創設"}]},

  {id:"noko", name:"ノコル", yomi:"のこる", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"テントNo.2／乃木の義弟", klass:"幹部",
   origin:"ムルーデル代表→バルカ政府 資源開発担当特別長官", fruit:"長距離狙撃・交渉・洞察力", ftype:"戦闘・狙撃", rank:35,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["兄さん","ムルーデル","狙撃","フローライト","嫉妬"],
   summary:"ベキの養子でテントのNo.2。実子の乃木に嫉妬したが、父を止めた乃木を兄と認め、S2では「テントは全勢力をかけて兄さんに協力する」と奪還に加わった。",
   detail:[
     {h:"生い立ち", body:"ベキの食料を盗もうとした少年兵の弟。乳児のころ兄が栄養失調で死に、ベキに引き取られた。ピヨから長距離狙撃を教わる。犯罪歴がつかないよう、ベキに守られて育った。"},
     {h:"第1シーズン", body:"乃木の出現で後継の座が揺らぐのを恐れて冷遇するが、親子の絆を見て変わる。ベキの「復讐」を阻止した乃木を初めて兄と認め、電話で礼を言う。テント解体後はバルカ政府の資源開発担当特別長官に。"},
     {h:"第2シーズン", body:"アリの帰還を歓迎し、ゴビの裏切りに気づけなかったことを詫びる。乃木の頼みに即答で応じ（第18話）、作戦では狙撃で援護し、撤退時に佟吐爾地を射殺。オルコ村の買収交渉も担った。"}
   ],
   battles:["e_nokocapture","e_fluorite","e_shaki","e_escape","e_tokyoraid"],
   rel:[{to:"nogi",label:"兄さん"},{to:"beki",label:"養父"},{to:"piyo",label:"狙撃の師"},{to:"ali",label:"復帰を歓迎"},{to:"ton",label:"射殺"},{to:"adiel",label:"兄弟同然に育つ"},{to:"isaku",label:"買収交渉"},{to:"f_tent",label:"No.2"},{to:"f_muruudel",label:"代表"}]},

  {id:"batraka", name:"バトラカ", yomi:"ばとらか", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"ベキの側近", klass:"幹部",
   origin:"民間軍事会社Y2K 代表", fruit:"軍事会社の運営", ftype:"指揮", rank:56,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"死亡偽装→生存",
   tags:["サングラス","Y2K","家紋をシンボルに"],
   summary:"17歳で瀕死のベキを助けた男。家紋をテントのシンボルにしようと提案し、それが親子再会のきっかけになった。",
   detail:[
     {h:"ベキとの縁", body:"1984年、武装勢力の雑用係だったとき撃たれたベキを密かに治療。自暴自棄になったベキを引き受け、妻ミラとノコルの面倒を見た。"},
     {h:"家紋", body:"憂助を探して日本に何度も問い合わせたが「丹後隼人」になっていたため見つからなかった。ベキの刀の鞘の家紋をテントの旗にしたことが、のちに乃木が父に辿り着く鍵になる。"},
     {h:"その後", body:"ベキ・ピヨと共に脱獄し上原を拘束するが乃木に撃たれ、死を偽装されてバルカへ帰還。第22話で生存が明かされた。"}
   ],
   battles:["e_uehara","e_fluorite"],
   rel:[{to:"beki",label:"命を救った・側近"},{to:"piyo",label:"同郷"},{to:"f_y2k",label:"代表"},{to:"f_tent",label:"最高幹部"}]},

  {id:"piyo", name:"ピヨ", yomi:"ぴよ", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"ノコルの側近", klass:"幹部",
   origin:"テント最高幹部", fruit:"狙撃", ftype:"戦闘・狙撃", rank:48,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"死亡偽装→生存",
   tags:["狙撃","粛清"],
   summary:"12歳からベキと行動を共にした狙撃の名手。ノコルに長距離狙撃を教えた。ベキ・バトラカと共に死を偽装され生還。",
   detail:[{h:"役割", body:"18歳で軍事の統率者となる。着服したエンゾ・パウロを粛清した。上原邸襲撃で乃木に撃たれ、死を偽装されてバルカへ帰還。"}],
   battles:["e_uehara"],
   rel:[{to:"noko",label:"狙撃の師"},{to:"beki",label:"側近"},{to:"batraka",label:"同郷"},{to:"f_tent",label:"最高幹部"}]},

  {id:"ali", name:"アリ・カーン", yomi:"ありかーん", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"テントの日本担当", klass:"幹部",
   origin:"GFL社 社長", fruit:"資金の流れ・洞察", ftype:"資金・ビジネス", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["GFL","誤送金","ベネズエラ","キプロス","暗号キー","Fが嫌い"],
   summary:"誤送金先GFL社の社長でテントの最高幹部。家族を人質に父の正体を白状させられたが、乃木に逃がされ、S2では再びテントへ戻った。",
   detail:[
     {h:"第1シーズン", body:"乃木（F）と黒須に家族を高所から落とされたように見せられ、ベキが乃木の父だと白状。乃木の助けで家族とベネズエラへ逃げ、礼にテントの通信暗号キーを渡した。家族を失っても口を割らなかったとして、ベキは粛清を見送った。"},
     {h:"第2シーズン", body:"キプロスに移り住んでいたが、拉致された高田がキプロス経由だったため乃木とドラムに捕まる。AIハヤトの判定で無関係と分かる。ゴビの裏切りを予見し、それを炙り出すために暗号キーを渡したと明かす。乃木の仲介でテントに復帰し、作戦中はバルカでノコルの代理を務めた。"}
   ],
   battles:["e_gosokin","e_ali"],
   rel:[{to:"nogi",label:"逃がされる・協力"},{to:"f",label:"大嫌い"},{to:"noko",label:"代理を務める"},{to:"f_gfl",label:"社長"},{to:"f_tent",label:"最高幹部"}]},

  {id:"adiel", name:"アディエル", yomi:"あでぃえる くらしー", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"ジャミーンの父（養父）", klass:"元幹部",
   origin:"ノバク村の住人", fruit:"秘密を守ること", ftype:"諜報・工作", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"死亡",
   tags:["ノバク村","プリシャ","核融合","乃木の生家"],
   summary:"砂漠で倒れた乃木を救ったジャミーンの父。自爆テロで死亡。正体はテントの元幹部で、2016年にベキとプリシャを救い出し、娘として育てていた。",
   detail:[
     {h:"第1シーズン", body:"ジャミーンと共に乃木を助ける。ザイールの自爆テロからジャミーンをかばって重傷を負い、薫の治療もむなしく死亡した。"},
     {h:"正体", body:"1987年にベキに拾われ、ノコルと兄弟のように育った。2016年、ベキと共にタイランのアジトからプリシャを救出し、テントを退いてジャミーンとして育てた。エリシャから、プリシャの体に埋め込まれた核融合の情報機器を取り出して隠すよう頼まれていた。"},
     {h:"住まい", body:"ベキから結婚祝いに贈られたノバク村の家は、乃木の生家だった。遺骨はイリアから東京の乃木宅へ送られている。"}
   ],
   battles:["e_zair","e_prisha"],
   rel:[{to:"jamiin",label:"養女"},{to:"beki",label:"拾われた"},{to:"noko",label:"兄弟同然"},{to:"elisha",label:"機密を託される"},{to:"f_tent",label:"元幹部"}]},

  {id:"shichi", name:"シチ", yomi:"しち", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"テント幹部", klass:"幹部",
   origin:"テント幹部", fruit:"—", ftype:"指揮", rank:null,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"生存",
   tags:["ゲルの扉"], summary:"ゲルの扉を開ける役を担うテントの幹部。アリの帰還や奪還作戦会議の場に立ち会う。",
   detail:[], battles:[], rel:[{to:"f_tent",label:"幹部"}]},

  {id:"mata", name:"マタ", yomi:"また", kind:"person",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"テント幹部", klass:"幹部",
   origin:"テント幹部", fruit:"—", ftype:"指揮", rank:null,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"生存",
   tags:["作戦会議"], summary:"奪還作戦の会議で乃木の隣に座り、チョッキーがゴルバド政府に訴えられないかを気にかけたテント幹部。",
   detail:[], battles:["e_shaki"], rel:[{to:"f_tent",label:"幹部"},{to:"nogi",label:"隣に座る"}]},

  {id:"gilliam", name:"ギリアム", yomi:"ぎりあむ", kind:"person",
   state:"テント", crew:"S1のみ", group:"—", role:"粛清されたメンバー", klass:"メンバー",
   origin:"テントのメンバー", fruit:"誤送金工作", ftype:"資金・ビジネス", rank:null,
   epi:"⑤ テントの真実", first:"第1シーズン", status:"死亡",
   tags:["着服","粛清","マテウス社"],
   summary:"ブラジルのマテウス社への誤送金で得た金を、パウロと組んで3年間着服していた。ベキに日本刀で斬られた。",
   detail:[{h:"粛清", body:"病気の家族のためと嘘をついたが現金を隠し持っていたことが露見。ノコルたちは財産没収と国外追放を主張したが、ベキは粛清を選んだ。のちにチンギスはギリアムとパウロの死を「交通事故」と報告し、ムルーデルとテントの関係を断ち切る材料にした。"}],
   battles:[], rel:[{to:"beki",label:"斬られる"},{to:"f_tent",label:"メンバー"}]},

  {id:"yasuda", name:"ヤスダ", yomi:"やすだ", kind:"person",
   state:"テント", crew:"S1のみ", group:"—", role:"孤児院の施設長", klass:"メンバー",
   origin:"テントの孤児院 施設長", fruit:"—", ftype:"資金・ビジネス", rank:null,
   epi:"⑤ テントの真実", first:"第1シーズン", status:"国外追放",
   tags:["米","横領"],
   summary:"子どもが痩せていると米の増量を陳情したが、実は米を横領して横流ししようとしていた。乃木が重さを量る特技で見抜いた。",
   detail:[], battles:[], rel:[{to:"nogi",label:"看破される"},{to:"f_tent",label:"孤児院"}]},

  {id:"zair", name:"アル＝ザイール", yomi:"あるざいーる", kind:"person",
   state:"テント", crew:"S1のみ", group:"バルカ", role:"自爆したモニター", klass:"モニター",
   origin:"セドルのアマン建設", fruit:"—", ftype:"諜報・工作", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"死亡",
   tags:["お前がVIVANTか","自爆テロ","ダイヤモンド"],
   summary:"誤送金の金をダイヤに替えて持ち出したテントの最上位モニター。「お前がVIVANTか？」と問いかけて自爆し、物語の起点を作った。",
   detail:[{h:"第1話", body:"乃木の返金要求を拒み、問いを残して周囲を巻き込み爆死。アディエルもこの爆発で命を落とした。"}],
   battles:["e_zair","e_gosokin"], rel:[{to:"nogi",label:"問いかける"},{to:"f_tent",label:"モニター"}]},

  {id:"yamamoto", name:"山本 巧", yomi:"やまもと たくみ", kind:"person",
   state:"テント", crew:"S1のみ", group:"日本", role:"誤送金の黒幕", klass:"モニター",
   origin:"丸菱商事 エネルギー事業部1課長", fruit:"脅迫・ハッキングの手配", ftype:"諜報・工作", rank:42,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"死亡",
   tags:["モニター","誤送金","潮騒橋","乃木の同期"],
   summary:"乃木の同期。日本への不満からテントに接触し、太田を脅して誤送金を仕組んだ。乃木と黒須に自殺を装って処刑された。",
   detail:[
     {h:"正体", body:"2019年にネパール経由でバルカへ密航しテントの訓練を受けた。ジャミーンのアルバムから正体が割れる。アリいわく最下位のモニター。"},
     {h:"処刑", body:"太田を始末しに行く寸前で乃木と黒須に捕まり、自白剤ですべてを話したあと、潮騒橋で首吊り自殺に見せかけて処刑された（第4話）。乃木が別班であることが明かされる場面でもある。"}
   ],
   battles:["e_gosokin","e_yamamoto"],
   rel:[{to:"ota",label:"脅迫"},{to:"nogi",label:"同期・処刑される"},{to:"kurosu",label:"処刑される"},{to:"f_tent",label:"モニター"},{to:"f_marubishi",label:"社員"}]},

  {id:"chocky", name:"チョッキー", yomi:"ちょっきー てーぱーにっと", kind:"person",
   state:"タイ", crew:"S2から", group:"タイ", role:"新庄を匿った実業家", klass:"実業家",
   origin:"CTP社 社長", fruit:"特異な身体能力・資金力", ftype:"資金・ビジネス", rank:30,
   epi:"⑦ 別班拉致と新庄追跡", first:"第2シーズン", status:"生存",
   tags:["元モニター","プーケット","秘密兵器","赤外線センサー","AIヤス"],
   summary:"新庄を匿ったタイの実業家で元テントのモニター。新庄との再会で一転、奪還作戦の「秘密兵器」として赤外線センサーの関門を突破した。",
   detail:[
     {h:"第2シーズン前半", body:"中国の不動産バブル崩壊で負債を抱え、別班の情報を売ろうとしたが新庄に断られる。別荘を爆破して逃げようとしたがゲルンに制圧され、新庄の「死」を目の前で見て乃木を恨んだ。"},
     {h:"奪還作戦", body:"生きていた新庄と再会して協力に転じる。当初はゴルバド政財界への根回し役だったが、身体能力を買われ潜入組へ。予行演習を超える難度の罠に尻込みしたが新庄の檄で踏み出し、乃木（F）の「成功報酬はCTP社の経営立て直し」で任務を遂行した（第20話）。"}
   ],
   battles:["e_shinjothai","e_shaki"],
   rel:[{to:"shinjo",label:"想いを寄せる・匿う"},{to:"gerun",label:"制圧される"},{to:"nogi",label:"恨む→協力"},{to:"f_tent",label:"元モニター"}]},

  /* ══════════ シンシー ══════════ */
  {id:"han", name:"樊 林杏", yomi:"はん りんしん", kind:"person",
   state:"シンシー", crew:"S2から", group:"中国", role:"シンシー最高責任者", klass:"司令",
   origin:"元・中国公安部第6局長", fruit:"組織力・情報網", ftype:"指揮", rank:null,
   epi:"⑧ 野崎の裏切りとシンシー", first:"第2シーズン", status:"生存",
   tags:["中国の別班","復讐","ジャミーン奪取"],
   summary:"「中国の別班」シンシーのトップ。タイランの依頼でプリシャを探すため別班員を人質に取った。Fに挑発され、復讐に乃木宅を襲わせる。",
   detail:[
     {h:"経歴", body:"党幹部だった父・樊星宇の失脚で2013年に公安部を離れた。流暢な日本語を話す。"},
     {h:"狙い", body:"依頼主タイランが捕らえるエリシャの娘プリシャはテントの関係者に連れ去られていた。テントに潜入した別班員から情報を引き出すため、野崎を通じて5人を人質にした。"},
     {h:"第23話", body:"タイランのアジトにいる隙に奪還され、Fに挑発されて取り逃がす。乃木が薫とジャミーンを守りに帰国すると読んで先回りし襲撃させるが、Fに返り討ちにされた。"}
   ],
   battles:["e_abduction","e_nozakiinf","e_escape","e_tokyoraid"],
   rel:[{to:"tairan",label:"依頼主"},{to:"nozaki",label:"取り込む"},{to:"liu",label:"部下"},{to:"zhou",label:"部下"},{to:"jamiin",label:"奪取を狙う"},{to:"f_xinxi",label:"最高責任者"}]},

  {id:"liu", name:"劉 銘軒", yomi:"りゅう みんしゅえん", kind:"person",
   state:"シンシー", crew:"S2から", group:"中国（日本生まれ・日本育ち）", role:"死んだはずの元部下", klass:"工作員",
   origin:"シンシー諜報員／元・公安捜査官", fruit:"マインドコントロール", ftype:"諜報・工作", rank:null,
   epi:"⑨ 5年前の真実と劉銘軒", first:"第16話", status:"生存",
   tags:["堺雅人二役","二重スパイ","北朝鮮","洗脳","瓜二つ"],
   summary:"乃木と瓜二つの、野崎の元部下。北朝鮮で虐殺されたと思われていたが、5歳からシンシーに育てられた二重スパイだった。野崎の潜入を見破り、洗脳した。",
   detail:[
     {h:"過去", body:"北京の日本大使館時代の野崎の部下。野崎を異常なまでに慕い、功を焦って北朝鮮の秘密会議への潜入に失敗。拷問の末に殺されたとされたが、情報と引き換えに解放されていた。全身に拷問の傷と後遺症が残る。"},
     {h:"見破る", body:"野崎がシンシーに寝返るふりで拉致先を日本に伝えようとしていたと気づき、見捨てられ嘘をつかれた恨みをぶちまける（第17話）。"},
     {h:"洗脳", body:"野崎を絶食で極限まで追い込み、救い手を装ってマインドコントロール。脱出しようとしたドラムを撃った。"}
   ],
   battles:["e_nozakiinf"],
   rel:[{to:"nozaki",label:"元上司・執着"},{to:"nogi",label:"瓜二つ"},{to:"drum",label:"銃撃"},{to:"zhang",label:"同じ二重スパイ"},{to:"han",label:"上司"},{to:"f_xinxi",label:"諜報員"}]},

  {id:"zhang", name:"張 競士", yomi:"ちょう けいし", kind:"person",
   state:"シンシー", crew:"S2から", group:"中国", role:"もう一人の二重スパイ", klass:"工作員",
   origin:"元・野崎の部下", fruit:"—", ftype:"諜報・工作", rank:null,
   epi:"⑨ 5年前の真実と劉銘軒", first:"第2シーズン", status:"死亡",
   tags:["二重スパイ","核融合"],
   summary:"北京時代の野崎の部下。シンシーがエリシャに接触し核融合技術の独占を狙っていると野崎に伝えた。裏切りが露見し射殺されたと劉が告げる。",
   detail:[], battles:["e_nozakiinf"],
   rel:[{to:"nozaki",label:"元上司"},{to:"liu",label:"同僚"},{to:"f_xinxi",label:"二重スパイ"}]},

  {id:"zhou", name:"周 浩然", yomi:"しゅう はおらん", kind:"person",
   state:"シンシー", crew:"S2から", group:"中国（ロシア系）", role:"拉致実行部隊のリーダー", klass:"工作員",
   origin:"シンシー中核", fruit:"拷問", ftype:"戦闘・狙撃", rank:45,
   epi:"⑦ 別班拉致と新庄追跡", first:"第2シーズン", status:"拘束",
   tags:["拷問","守り刀","偽造パスポート"],
   summary:"乃木のゲルに侵入して黒須を拉致した工作員のリーダー。笑いながら拷問し、和田を殺させた。脱出時にチンギスに人質に取られる。",
   detail:[{h:"人物", body:"偽造パスポートで新疆からバルカ、ロシアを経て黒須をゴルバドへ移送。黒須の守り刀を奪い、和田の指を切り落とした。検問所で乃木たちを阻もうとしたが人質にされ、高田の言葉に表情を失う。"}],
   battles:["e_abduction","e_shaki","e_escape"],
   rel:[{to:"kurosu",label:"拉致"},{to:"wada",label:"拷問・殺害を指示"},{to:"hirose",label:"凌辱"},{to:"chinggis",label:"人質にされる"},{to:"han",label:"上司"},{to:"f_xinxi",label:"中核"}]},

  {id:"li", name:"李 茗沢", yomi:"り みんづぁ", kind:"person",
   state:"シンシー", crew:"S2から", group:"中国（ロシア系）", role:"追手", klass:"工作員",
   origin:"シンシー中核", fruit:"—", ftype:"戦闘・狙撃", rank:35,
   epi:"⑦ 別班拉致と新庄追跡", first:"第2シーズン", status:"死亡",
   tags:["和田","追跡","報復"],
   summary:"周の命でためらいながら和田にとどめを刺した工作員。奪還チームを追跡し爆弾で瀕死となったところを、Fに報復として射殺された。",
   detail:[{h:"最期", body:"佟を目の前で殺されて錯乱しながら追跡を続け、通信可能エリアから本部に連絡したことで奪還がシンシーに伝わる。戻ってきた乃木（F）に頭部を撃たれた（第21話）。"}],
   battles:["e_abduction","e_shaki","e_escape"],
   rel:[{to:"wada",label:"とどめを刺す"},{to:"f",label:"射殺される"},{to:"ton",label:"同僚"},{to:"f_xinxi",label:"中核"}]},

  {id:"ton", name:"佟 吐爾地", yomi:"とん とるふぁん", kind:"person",
   state:"シンシー", crew:"S2から", group:"中国（ロシア系）", role:"スナイパー", klass:"工作員",
   origin:"シンシー中核", fruit:"狙撃", ftype:"戦闘・狙撃", rank:40,
   epi:"⑦ 別班拉致と新庄追跡", first:"第11話", status:"死亡",
   tags:["発信機","狙撃"],
   summary:"黒須拉致の工作員。黒須に発信機を付け替えられて仲間を誤射した。奪還作戦の最中、門越しにノコルに撃ち抜かれた。",
   detail:[], battles:["e_abduction","e_shaki"],
   rel:[{to:"noko",label:"射殺される"},{to:"li",label:"同僚"},{to:"f_xinxi",label:"中核"}]},

  /* ══════════ ゴルバド・アゼルバイジャン ══════════ */
  {id:"elisha", name:"エリシャ・ママドフ", yomi:"えりしゃ ままどふ", kind:"person",
   state:"ゴルバド・アゼルバイジャン", crew:"S2から", group:"アゼルバイジャン", role:"核融合の研究者", klass:"研究者",
   origin:"核融合の研究者", fruit:"核融合の持続化", ftype:"科学", rank:null,
   epi:"⑨ 5年前の真実と劉銘軒", first:"第16話", status:"監禁",
   tags:["核融合","プリシャの父","電波暗室"],
   summary:"実用化まで50年と言われた核融合の持続化に成功し、世界秩序を変えかねないとデータを消して自殺を装った研究者。タイランに監禁され、娘がいなければ何も話さないと黙秘を続ける。",
   detail:[
     {h:"2016年", body:"妻ザミーラと娘プリシャと共にタイランに捕まり、妻を殺される。踏み込んだベキとアディエルに、自分がいるとプリシャが危ないとして娘だけを連れて行くよう頼み、娘の体に埋め込んだ情報機器を取り出して隠すようアディエルに託した。"},
     {h:"第23話", body:"アゼルバイジャンのタイランの屋敷に潜入した乃木と黒須から、プリシャがジャミーンとして生きていると知らされ、アディエルに伝えた情報を明かし、ジャミーンへの伝言を頼む。この機密はシンシーも把握していた。"}
   ],
   battles:["e_prisha"],
   rel:[{to:"jamiin",label:"実娘"},{to:"tairan",label:"監禁される"},{to:"adiel",label:"機密を託す"},{to:"nogi",label:"伝言を託す"}]},

  {id:"tairan", name:"タイラン・グリエワ", yomi:"たいらん ぐりえわ", kind:"person",
   state:"ゴルバド・アゼルバイジャン", crew:"S2から", group:"トルコ（シリア生まれ）", role:"情報ブローカー", klass:"ブローカー",
   origin:"情報ブローカー", fruit:"資金と監禁", ftype:"資金・ビジネス", rank:70,
   epi:"⑩ 奪還作戦の始動", first:"第19話", status:"生存",
   tags:["核融合","バクー","年をとったサムライと若いサムライ"],
   summary:"エリシャ一家を捕らえ、妻を殺した情報ブローカー。プリシャを「年をとったサムライと若いサムライ」に奪われ、シンシーにテントの調査を依頼した。",
   detail:[{h:"人物", body:"バクー近郊の豪邸の電波暗室にエリシャを監禁。洗脳された野崎を尋問し、ジャミーンの居場所を引き出した。第23話で乃木に買収され、エリシャとの接触を許す。"}],
   battles:["e_prisha","e_nozakiinf"],
   rel:[{to:"elisha",label:"監禁"},{to:"han",label:"依頼"},{to:"nozaki",label:"尋問"}]},

  {id:"isaku", name:"イサク", yomi:"いさく", kind:"person",
   state:"ゴルバド・アゼルバイジャン", crew:"S2から", group:"ゴルバド", role:"オルコ村の村長", klass:"村長",
   origin:"オルコ村 村長", fruit:"村民の取りまとめ", ftype:"交渉・政治", rank:null,
   epi:"⑩ 奪還作戦の始動", first:"第2シーズン", status:"生存",
   tags:["買収","シャキ城の麓"],
   summary:"シャキ城の麓オルコ村の村長。不審者を密告する契約をシンシーと結んでいたが報酬に不満で、ノコルとの交渉で作戦を黙認するよう村を説得した。",
   detail:[], battles:["e_shaki"], rel:[{to:"noko",label:"交渉"}]},

  /* ══════════ 乃木家・ヒロイン ══════════ */
  {id:"kaoru", name:"柚木 薫", yomi:"ゆずき かおる", kind:"person",
   state:"乃木家", crew:"S1・S2", group:"日本", role:"ヒロイン", klass:"医師",
   origin:"WHI医師→日本医療センター 小児心臓外科", fruit:"医療・機転", ftype:"医療", rank:32,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["WHI","ジャミーン","クラウドファンディング","正体を知る"],
   summary:"ジャミーンの主治医。乃木と逃避行を共にし、恋人となって乃木の家でジャミーンと待つ。第23話でシンシーに襲われ、助けに来た乃木が別班だと知る。",
   detail:[
     {h:"第1シーズン", body:"バルカで医療に従事。アド砂漠でラクダから落ちて命の危機に陥るが救われる。ジャミーンの手術費のクラウドファンディングに乃木が密かに1,470万円を寄付していたと知り、惹かれていく。乃木から財産と鍵を託され、帰りを待つ。"},
     {h:"第2シーズン", body:"自宅を工作員に襲われ、ノコルとチンギスと共に駆けつけた乃木の正体を知る。戸惑いながらも、まだ愛していると受け入れた。"}
   ],
   battles:["e_zair","e_desert","e_tokyoraid"],
   rel:[{to:"nogi",label:"恋人"},{to:"jamiin",label:"家族同然"},{to:"iria",label:"同僚"},{to:"f_whi",label:"所属"}]},

  {id:"jamiin", name:"ジャミーン（プリシャ・ママドフ）", yomi:"じゃみーん ぷりしゃ ままどふ", kind:"person",
   state:"乃木家", crew:"S1・S2", group:"アゼルバイジャン（バルカ育ち）", role:"奇跡の子", klass:"少女",
   origin:"ノバク村の少女", fruit:"人の善悪を直感で見抜く", ftype:"直感", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["サヴァン","ファロー四徴症","優しい人","核融合","奇跡の子"],
   summary:"砂漠で倒れた乃木を見つけた少女。人の善悪を見抜く力を持つ。正体はエリシャの実娘プリシャで、体に核融合の情報機器が埋め込まれていたため、シンシーに狙われる。",
   detail:[
     {h:"第1シーズン", body:"ファロー四徴症の手術のため来日し、薫の執刀で回復。乃木が見ていたベキの写真に「優しい人」と書き、テントの本質を見抜く必要があると乃木に気づかせた。アルバムが山本の正体を割る手がかりにもなった。"},
     {h:"奇跡の子", body:"2歳だった2016年、母ザミーラを目の前で殺され、直後にベキとアディエルに救われてアディエルの娘として育つ。新生児の写真や「母との写真」はテントがCGで作ったもの（第22話で明かされる）。"},
     {h:"第2シーズン", body:"翻訳アプリの声で意思を伝えるようになる。野崎の自白で居場所が漏れ、樊林杏が奪取に動く。"}
   ],
   battles:["e_prisha","e_tokyoraid"],
   rel:[{to:"kaoru",label:"主治医・家族"},{to:"nogi",label:"懐く"},{to:"adiel",label:"養父"},{to:"elisha",label:"実父"},{to:"beki",label:"「優しい人」"}]},

  {id:"akemi", name:"乃木 明美", yomi:"のぎ あけみ", kind:"person",
   state:"乃木家", crew:"S1・S2", group:"日本", role:"乃木の母", klass:"家族",
   origin:"農業使節団（ノバク村）", fruit:"秘密を守り抜く", ftype:"—", rank:27,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"死亡",
   tags:["1984年","拷問","復讐を託す"],
   summary:"ノバク村で子どもたちを教えていた乃木の母。内乱で拘束され1か月の拷問でも秘密を守り、卓に家族の時間を奪った者への復讐を託して息を引き取った。",
   detail:[], battles:[],
   rel:[{to:"beki",label:"夫"},{to:"nogi",label:"息子"},{to:"uehara",label:"ヘリを退避させた男"}]},

  {id:"hiromichi", name:"乃木 寛道", yomi:"のぎ ひろみち", kind:"person",
   state:"乃木家", crew:"S1・S2", group:"日本（島根）", role:"乃木の伯父", klass:"家族",
   origin:"乃木家第15代当主", fruit:"—", ftype:"—", rank:null,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"生存",
   tags:["たたら製鉄","守り刀","DNA鑑定"],
   summary:"たたら製鉄で栄えた島根の乃木家当主。家紋の記憶を頼りに訪ねてきた丹後隼人をDNA鑑定で甥と認め、守り刀を渡した。",
   detail:[], battles:[],
   rel:[{to:"nogi",label:"甥"},{to:"beki",label:"弟"}]},

  {id:"sam", name:"サム", yomi:"さむ", kind:"person",
   state:"日本政府・その他", crew:"S1のみ", group:"アメリカ", role:"乃木の親友", klass:"CIA",
   origin:"CIAオフィサー", fruit:"—", ftype:"諜報・工作", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["9.11","ミリタリースクール","ルパン三世"],
   summary:"ミリタリースクール時代からの乃木の親友。9.11後に家族を守るため入隊し、それが乃木の自衛隊入隊の契機になった。",
   detail:[], battles:[], rel:[{to:"nogi",label:"親友"}]},

  /* ══════════ 丸菱商事 ══════════ */
  {id:"usami", name:"宇佐美 哲也", yomi:"うさみ てつや", kind:"person",
   state:"丸菱商事", crew:"S1・S2", group:"日本", role:"乃木の上司", klass:"会社員",
   origin:"丸菱商事 エネルギー事業部長", fruit:"—", ftype:"資金・ビジネス", rank:50,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["誤送金","役員候補"],
   summary:"誤送金を乃木の横領と疑った上司。フローライトの功績が自分にも加味されて役員が見えると、乃木に愛想よくなった。",
   detail:[], battles:["e_gosokin"], rel:[{to:"nogi",label:"部下"},{to:"f_marubishi",label:"事業部長"}]},

  {id:"kawai", name:"河合 幸二", yomi:"かわい こうじ", kind:"person",
   state:"丸菱商事", crew:"S1のみ", group:"日本", role:"業務監査部", klass:"会社員",
   origin:"丸菱商事 業務監査部", fruit:"—", ftype:"—", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["誤送金","謝罪"],
   summary:"乃木がアリと共謀したと決めつけて追及したが、潔白が証明されると大勢の前でFに暴かれ、謝罪させられた。",
   detail:[], battles:["e_gosokin"], rel:[{to:"nogi",label:"疑う"},{to:"f_marubishi",label:"監査部"}]},

  {id:"sakamoto", name:"坂本 誠司", yomi:"さかもと せいじ", kind:"person",
   state:"丸菱商事", crew:"S1・S2", group:"日本", role:"社長", klass:"会社員",
   origin:"丸菱商事 社長", fruit:"—", ftype:"—", rank:null,
   epi:"⑥ 40年の宿命の決着", first:"第1シーズン", status:"生存",
   tags:["役員昇進"], summary:"フローライト事業に貢献した乃木を役員に推したが、乃木の固辞を受け入れた丸菱商事の社長。",
   detail:[], battles:[], rel:[{to:"nogi",label:"役員に推す"},{to:"f_marubishi",label:"社長"}]},

  /* ══════════ バルカ ══════════ */
  {id:"iria", name:"イリア", yomi:"いりあ さいはん", kind:"person",
   state:"バルカ", crew:"S1・S2", group:"バルカ", role:"薫の同僚", klass:"看護師",
   origin:"バルカの看護師", fruit:"—", ftype:"医療", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"生存",
   tags:["アド砂漠","遺骨"], summary:"薫の同僚の看護師。砂漠越えで薫と別れたジャミーンを預かり、のちにアディエルの遺骨を薫へ渡した。",
   detail:[], battles:[], rel:[{to:"kaoru",label:"同僚"},{to:"f_whi",label:"所属"}]},

  {id:"wanizu", name:"ワニズ", yomi:"わにず", kind:"person",
   state:"バルカ", crew:"S1のみ", group:"バルカ", role:"外務大臣", klass:"政治家",
   origin:"バルカ外務大臣／次期大統領候補", fruit:"権力・脅迫", ftype:"交渉・政治", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第2話", status:"逮捕",
   tags:["フローライト","採掘権","ゴビ"],
   summary:"フローライトの採掘権を政府主導で奪おうとした外務大臣。ゴビを抱き込んだが、ノコルが先にオリベ化学を押さえており失敗。西岡からの裏金映像で逮捕された。",
   detail:[], battles:["e_fluorite"],
   rel:[{to:"nishioka",label:"裏金を受け取る"},{to:"noko",label:"出し抜かれる"},{to:"chinggis",label:"逮捕される"}]},

  {id:"kimel", name:"キメル", yomi:"きめる", kind:"person",
   state:"バルカ", crew:"S1・S2", group:"バルカ", role:"法務大臣", klass:"政治家",
   origin:"バルカ法務大臣", fruit:"—", ftype:"交渉・政治", rank:null,
   epi:"⑥ 40年の宿命の決着", first:"第1シーズン", status:"生存",
   tags:["孤児院","外交官身分"], summary:"孤児院を守るというチンギスの訴えでワニズの逮捕を命じた。S2ではチンギスに外交官の身分を与えて釈放させた。",
   detail:[], battles:["e_fluorite"], rel:[{to:"chinggis",label:"後ろ盾"}]},

  /* ══════════ 日本政府・その他 ══════════ */
  {id:"uehara", name:"上原 史郎", yomi:"うえはら しろう", kind:"person",
   state:"日本政府・その他", crew:"S1のみ", group:"日本", role:"ベキの復讐の標的", klass:"政治家",
   origin:"内閣官房副長官／元公安部外事1課長", fruit:"—", ftype:"交渉・政治", rank:null,
   epi:"⑥ 40年の宿命の決着", first:"第10話", status:"生存",
   tags:["ヘリ","1984年","シビリアンコントロール"],
   summary:"1979年に乃木卓をバルカへ送り、内乱時に自分のキャリアのため救出ヘリを引き返させた張本人。ベキたちに殺されかけ、乃木の狙撃で命拾いした。",
   detail:[{h:"その後", body:"自宅は美術品を運び出したうえで全焼し、ベキたちの焼身自殺として口裏を合わせるよう野崎に求められる。別班の存在を批判したが、どこに潜んでいるか分からないと釘を刺された。"}],
   battles:["e_uehara"],
   rel:[{to:"beki",label:"見捨てた部下"},{to:"akemi",label:"見殺しにした"},{to:"nozaki",label:"口止めされる"}]},

  {id:"nishioka", name:"西岡 英子", yomi:"にしおか えいこ", kind:"person",
   state:"日本政府・その他", crew:"S1のみ", group:"日本", role:"駐バルカ大使", klass:"外交官",
   origin:"駐バルカ特命全権大使", fruit:"—", ftype:"交渉・政治", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第2話", status:"生存",
   tags:["裏切り","大使館","フローライト"],
   summary:"乃木たちを保護すると見せてバルカ警察に引き渡そうとした大使。採掘権の主導権を狙うワニズに圧力をかけられていた。最後は乃木と野崎に説得されムルーデルにつく。",
   detail:[], battles:["e_desert","e_fluorite"],
   rel:[{to:"wanizu",label:"圧力を受ける"},{to:"nozaki",label:"説得される"}]},

  /* ══════════ 組織 ══════════ */
  {id:"f_beppan", name:"別班（VIVANT）", yomi:"べっぱん びばん", kind:"faction",
   state:"別班", crew:"S1・S2", group:"日本", role:"自衛隊の諜報部隊", klass:"組織",
   origin:"陸上自衛隊（日本政府非公認）", fruit:"非合法も辞さない国内テロの未然防止", ftype:"諜報・工作", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第2話", status:"活動中",
   tags:["VIVANT","BEPPAN","赤い饅頭","神社"],
   summary:"タイトル「VIVANT」は別班のモンゴル語読み。自衛隊の非公認諜報部隊で、隊員は民間人として世界中に潜伏し、直属の上司以外は人数も系統も知らない。",
   detail:[{h:"モデル", body:"2013年に共同通信が存在を報じ、政府が否定した陸上幕僚監部の「別班」がモデルとされる。原作の福澤克雄は制作3年前にカーラジオでこの話を聞いて構想した。"},
           {h:"作法", body:"緊急招集は祠に置かれた赤い饅頭。司令の櫻井は神社参拝を習慣にし、接触には茶葉や短歌を使う。"}],
   battles:[], rel:[]},

  {id:"f_koan", name:"公安部 外事第4課", yomi:"こうあんぶ がいじだいよんか", kind:"faction",
   state:"公安・警察", crew:"S1・S2", group:"日本", role:"警視庁公安部", klass:"組織",
   origin:"警視庁公安部", fruit:"国際テロ・スパイの捜査", ftype:"諜報・工作", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"活動中",
   tags:["公安"], summary:"国際テロやスパイを専門に捜査する警視庁公安部の課。野崎が率い、内部にテントのモニター（新庄）とシンシーの工作員（鈴木）が潜んでいた。",
   detail:[], battles:[], rel:[]},

  {id:"f_tent", name:"テント", yomi:"てんと", kind:"faction",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"国際テロ組織（解体）", klass:"組織",
   origin:"バルカ・ロシア国境付近（ゲルで移動）", fruit:"テロ代行・誤送金で孤児院の資金を稼ぐ", ftype:"資金・ビジネス", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"解体（関連組織は存続）",
   tags:["家紋","孤児院","モニター","犯行声明なし"],
   summary:"犯行声明も思想も出さず、乃木家の家紋の旗だけを掲げる国際テロ組織。実態は内乱の戦災孤児を救うための犯罪組織で、S1の結末で解体された。",
   detail:[{h:"構造", body:"本部はゲルで絶えず移動し、幹部でも場所を知らない。工作員「モニター」は三つのランクに分かれて世界で活動する。"},
           {h:"解体後", body:"資源開発会社ムルーデル、民間軍事会社Y2K、GFL社は残り、水面下で活動を続ける。S2の奪還作戦はノコルの号令でこの勢力が動いた。"}],
   battles:[], rel:[]},

  {id:"f_y2k", name:"PMSC Y2K", yomi:"わいつーけー", kind:"faction",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"民間軍事会社", klass:"組織",
   origin:"代表：バトラカ", fruit:"兵士の養成", ftype:"戦闘・狙撃", rank:null,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第1シーズン", status:"存続",
   tags:["ボルト","奪還作戦"], summary:"テントがバルカで経営する民間軍事会社。バルカ軍の7割がここに頼る。リーダーのボルト以下の精鋭が奪還作戦に加わった。",
   detail:[], battles:["e_shaki"], rel:[{to:"f_tent",label:"関連組織"}]},

  {id:"f_muruudel", name:"ムルーデル", yomi:"むるーでる", kind:"faction",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"資源開発会社", klass:"組織",
   origin:"代表：ノコル", fruit:"フローライト採掘", ftype:"資金・ビジネス", rank:null,
   epi:"④ 別班集結とノコル捕縛", first:"第1シーズン", status:"存続",
   tags:["夢","フローライト"], summary:"ノコルが経営する資源開発会社。モンゴル語で「夢」。孤児院の運営も担い、フローライトの採掘権の45％を握った。",
   detail:[], battles:["e_fluorite"], rel:[{to:"f_tent",label:"関連組織"}]},

  {id:"f_gfl", name:"GFL社", yomi:"じーえふえる", kind:"faction",
   state:"テント", crew:"S1・S2", group:"バルカ", role:"誤送金先", klass:"組織",
   origin:"クーダンのインフラ設備会社", fruit:"—", ftype:"資金・ビジネス", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"存続",
   tags:["Global Firm of Lifeline","誤送金"], summary:"丸菱商事の1億ドルが誤送金されたバルカのインフラ会社。社長はテント幹部のアリ・カーン。",
   detail:[], battles:["e_gosokin"], rel:[{to:"f_tent",label:"関連組織"}]},

  {id:"f_xinxi", name:"シンシー（Xinxi）", yomi:"しんしー", kind:"faction",
   state:"シンシー", crew:"S2から", group:"中国", role:"「中国の別班」", klass:"組織",
   origin:"本部：ゴルバド共和国ルモーの古城", fruit:"諜報・拉致・監禁", ftype:"諜報・工作", rank:null,
   epi:"⑧ 野崎の裏切りとシンシー", first:"第2シーズン", status:"活動中",
   tags:["中国公安部","ルモー","シャキ城"], summary:"表向きは多国籍の民間諜報機関だが、中国公安部と密接につながる。ルモーの古城の地下に独自の通信網を持ち、シャキ城に別班員を監禁した。",
   detail:[], battles:[], rel:[]},

  {id:"f_marubishi", name:"丸菱商事", yomi:"まるびししょうじ", kind:"faction",
   state:"丸菱商事", crew:"S1・S2", group:"日本", role:"乃木の勤務先", klass:"組織",
   origin:"東京の大手総合商社", fruit:"バルカの太陽エネルギープラント事業", ftype:"資金・ビジネス", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"存続",
   tags:["誤送金","生涯年収6億"], summary:"乃木が勤める大手総合商社。専務の長野も別班、課長の山本はテントのモニターだった。",
   detail:[], battles:["e_gosokin"], rel:[]},

  {id:"f_balkapolice", name:"バルカ警察", yomi:"ばるかけいさつ", kind:"faction",
   state:"バルカ", crew:"S1・S2", group:"バルカ", role:"バルカの警察", klass:"組織",
   origin:"国家警察警備局", fruit:"—", ftype:"交渉・政治", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"存続",
   tags:["チンギス"], summary:"チンギス率いるバルカの警察。S1前半では乃木たちを爆破事件の容疑者として追った。",
   detail:[], battles:["e_desert"], rel:[]},

  {id:"f_whi", name:"WHI（世界医療機構）", yomi:"だぶりゅーえいちあい", kind:"faction",
   state:"乃木家", crew:"S1のみ", group:"—", role:"国際医療組織", klass:"組織",
   origin:"バルカのザヤで医療活動", fruit:"—", ftype:"医療", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"存続",
   tags:["World Health Institution"], summary:"薫とイリアが所属した国際医療組織。バルカではセドルの隣町ザヤで活動する。",
   detail:[], battles:[], rel:[]},

  /* ══════════ 作戦・事件 ══════════ */
  {id:"e_gosokin", name:"誤送金事件", yomi:"ごそうきんじけん", kind:"battle",
   state:"丸菱商事", crew:"S1のみ", group:"日本／バルカ", role:"黒幕・山本を処刑", klass:"事件",
   origin:"2023年2月9日", fruit:"1億ドル（約140億円）をGFL社へ", ftype:"資金・ビジネス", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"解決",
   tags:["1億ドル","9千万ドル","ダイヤモンド"],
   summary:"丸菱商事がバルカのGFL社に1億ドルを誤送金。差額9千万ドルを回収に行った乃木が、テロとテントの渦に巻き込まれる起点。",
   detail:[{h:"仕組み", body:"山本が脅した太田（ブルーウォーカー）がシステムを改ざん。金はザイールがダイヤに替えて持ち出した。犯人と疑われた乃木の潔白は帰国後に証明される。"}],
   battles:[], rel:[]},

  {id:"e_zair", name:"ザイールの自爆テロ", yomi:"ざいーるのじばくてろ", kind:"battle",
   state:"テント", crew:"S1のみ", group:"バルカ", role:"ザイール・アディエル死亡", klass:"事件",
   origin:"セドル・アマン建設", fruit:"「お前がVIVANTか？」", ftype:"—", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第1話", status:"—",
   tags:["VIVANT"], summary:"乃木に「お前がVIVANTか？」と問いかけたザイールが自爆。野崎が乃木を救い、乃木・野崎・薫は爆破の容疑者として追われる。",
   detail:[], battles:[], rel:[]},

  {id:"e_desert", name:"アド砂漠越え（バルカ脱出）", yomi:"あどさばくごえ", kind:"battle",
   state:"バルカ", crew:"S1のみ", group:"バルカ", role:"帰国に成功", klass:"作戦",
   origin:"日本大使館→アド砂漠", fruit:"ドラムの手引き", ftype:"—", rank:null,
   epi:"① 誤送金とバルカ脱出", first:"第2話", status:"成功",
   tags:["死の砂漠","ラクダ","西岡の裏切り"], summary:"大使・西岡の裏切りで大使館を出た一行が、バルカ人も踏み込まない死の砂漠を越える。途中、薫がラクダから落ちる。",
   detail:[], battles:[], rel:[]},

  {id:"e_yamamoto", name:"山本の処刑", yomi:"やまもとのしょけい", kind:"battle",
   state:"別班", crew:"S1のみ", group:"日本", role:"山本死亡（自殺に偽装）", klass:"作戦",
   origin:"潮騒橋", fruit:"自白剤・偽装", ftype:"諜報・工作", rank:null,
   epi:"② 誤送金の黒幕と別班", first:"第4話", status:"完了",
   tags:["別班の正体"], summary:"乃木と黒須がテントのモニター山本を捕らえ、自白させたあと首吊り自殺に見せかけて処刑。乃木が別班であることが明かされる。",
   detail:[], battles:[], rel:[]},

  {id:"e_ali", name:"アリ・カーンの尋問", yomi:"ありかーんのじんもん", kind:"battle",
   state:"別班", crew:"S1・S2", group:"バルカ／キプロス", role:"ベキ＝乃木卓と判明（S1）", klass:"作戦",
   origin:"S1：バルカ／S2：キプロス", fruit:"家族を人質に取る（実際は無傷）", ftype:"諜報・工作", rank:null,
   epi:"③ 宿命編 ── 乃木の過去とF", first:"第5話", status:"完了",
   tags:["家族","ワイヤー","AIハヤト"], summary:"S1では家族を高所から落としたと見せかけてベキの正体を吐かせ、S2ではキプロスで再び拘束し拉致への関与を確かめた。",
   detail:[], battles:[], rel:[]},

  {id:"e_nokocapture", name:"ノコル捕縛作戦と乃木の銃撃", yomi:"のこるほばくさくせん", kind:"battle",
   state:"別班", crew:"S1のみ", group:"バルカ", role:"乃木がテントへ潜入", klass:"作戦",
   origin:"テントの会合", fruit:"急所を外した狙撃", ftype:"戦闘・狙撃", rank:null,
   epi:"④ 別班集結とノコル捕縛", first:"第7話", status:"成功（偽装裏切り）",
   tags:["裏切り","心臓の上"], summary:"6人の別班精鋭がノコルを捕らえた直後、乃木が仲間を次々と狙撃。別班を裏切ったと見せてテントに入り込み、父と40年ぶりに再会した。",
   detail:[{h:"真相", body:"撃たれた高田・和田・廣瀬・熊谷は致命傷を外されて日本で治療されていた。黒須だけは弾をかわして肩に受けた。第10話で乃木は「別班の任務としてここに来た」とベキに告げる。"}],
   battles:[], rel:[]},

  {id:"e_fluorite", name:"フローライト採掘権争い", yomi:"ふろーらいとさいくつけん", kind:"battle",
   state:"テント", crew:"S1のみ", group:"バルカ", role:"ムルーデル＋オリベ化学で60%", klass:"事件",
   origin:"バルカ北部の鉱脈（純度99%）", fruit:"採掘権の配分", ftype:"交渉・政治", rank:null,
   epi:"⑤ テントの真実", first:"第9話", status:"テント側の勝利",
   tags:["ワニズ","ゴビ","オリベ化学","孤児院"], summary:"孤児ウヌの救出に降りたノコルが見つけた鉱脈を巡る争い。テロをやめる資金源として乃木が後押しし、ワニズの横取りを逆転した。",
   detail:[{h:"決着", body:"ワニズはゴビの30%を抱き込み政府側55%を主張したが、ノコルは西岡に判断を委ねるオリベ化学を裏で押さえており、ムルーデル45%＋オリベ15%で60%。チンギスが西岡の裏金映像でワニズを逮捕させた。ベキは投降を条件に受け入れた。"}],
   battles:[], rel:[]},

  {id:"e_uehara", name:"ベキの逃亡と上原邸襲撃", yomi:"うえはらていしゅうげき", kind:"battle",
   state:"テント", crew:"S1のみ", group:"日本", role:"乃木がベキを狙撃（死亡偽装）", klass:"事件",
   origin:"上原の自宅", fruit:"—", ftype:"戦闘・狙撃", rank:null,
   epi:"⑥ 40年の宿命の決着", first:"第10話", status:"終結",
   tags:["お前は私の誇り","焼死体"], summary:"新庄の手引きで脱獄したベキ・バトラカ・ピヨが上原を襲う。乃木が父を撃ち、上原邸は全焼。3人は死んだとされたが、のちに偽装と判明した。",
   detail:[], battles:[], rel:[]},

  {id:"e_abduction", name:"別班員5人の拉致", yomi:"べっぱんいんらち", kind:"battle",
   state:"シンシー", crew:"S2から", group:"日本／バルカ", role:"5人がシャキ城へ", klass:"事件",
   origin:"日本の病院・バルカの乃木のゲル", fruit:"野崎が売った情報", ftype:"諜報・工作", rank:null,
   epi:"⑦ 別班拉致と新庄追跡", first:"第11話", status:"→奪還",
   tags:["赤い饅頭","黒須"], summary:"S1でテントに撃たれ療養していた4人と、バルカに残った黒須が拉致された。実行はシンシーで、情報を渡したのは野崎だった。",
   detail:[], battles:[], rel:[]},

  {id:"e_shinjothai", name:"新庄追跡（タイ）", yomi:"しんじょうついせき", kind:"battle",
   state:"別班", crew:"S2から", group:"タイ", role:"新庄は無関係と判明・死亡偽装", klass:"作戦",
   origin:"プーケット・チョッキーの別荘", fruit:"薬物入り納豆・タイ警察とのパイプ", ftype:"諜報・工作", rank:null,
   epi:"⑦ 別班拉致と新庄追跡", first:"第13話", status:"完了",
   tags:["納豆","チョッキー","長野"], summary:"新庄の好物の納豆から潜伏先を割り出し、長野のパイプでタイ警察に別荘を包囲させた。拷問の結果、新庄は拉致と無関係だった。",
   detail:[], battles:[], rel:[]},

  {id:"e_nozakiinf", name:"野崎のシンシー潜入", yomi:"のざきのせんにゅう", kind:"battle",
   state:"公安・警察", crew:"S2から", group:"ゴルバド", role:"劉に見破られ失敗", klass:"作戦",
   origin:"ゴルバド共和国ルモー", fruit:"別班員の情報を手土産に", ftype:"諜報・工作", rank:null,
   epi:"⑧ 野崎の裏切りとシンシー", first:"第14話", status:"失敗（野崎は洗脳下）",
   tags:["5年前","佐野の黙認","暗号メッセージ"], summary:"5年前から仕込んだシンシー潜入計画。幹部の座を目前に、死んだはずの劉に見破られ、日本へ送っていた暗号も解読された。",
   detail:[], battles:[], rel:[]},

  {id:"e_shaki", name:"シャキ城 別班奪還作戦", yomi:"しゃきじょうだっかんさくせん", kind:"battle",
   state:"別班", crew:"S2から", group:"ゴルバド", role:"4人救出・和田の遺体回収", klass:"作戦",
   origin:"ゴルバド共和国オルコ村・シャキ城", fruit:"テント×別班×Y2K×チョッキー", ftype:"戦闘・狙撃", rank:null,
   epi:"⑩ 奪還作戦の始動", first:"第19話", status:"成功",
   tags:["赤外線センサー","誰一人死なせない","オルコ村買収"], summary:"櫻井が断念した救出を、乃木とノコル率いるテント勢力が引き受けた。村を買収し、城の罠を越えて牢獄に辿り着き、4人を救出した。",
   detail:[{h:"布陣", body:"潜入：乃木（F）・新庄・チョッキー・ゲルン・Y2K精鋭（ボルト以下）／狙撃援護：ノコル／ハッキング：太田・東条／現地支援：田代とエージェント／脱出支援：チンギス。"}],
   battles:[], rel:[]},

  {id:"e_escape", name:"ゴルバド脱出（ガラマン空港）", yomi:"ごるばどだっしゅつ", kind:"battle",
   state:"別班", crew:"S2から", group:"ゴルバド", role:"脱出成功・チンギス一時拘束", klass:"作戦",
   origin:"ガラマン空港への道", fruit:"人質（周・ゼキ警部）", ftype:"戦闘・狙撃", rank:null,
   epi:"⑪ シャキ城突入と脱出", first:"第21話", status:"成功",
   tags:["検問","挑発"], summary:"李の通報で奪還がシンシー本部に伝わり、工作員と現地警察が空港への道を塞ぐ。駆けつけたチンギスが周とゼキ警部を人質に取り突破、バルカ経由で帰国した。",
   detail:[], battles:[], rel:[]},

  {id:"e_tokyoraid", name:"乃木宅襲撃", yomi:"のぎたくしゅうげき", kind:"battle",
   state:"シンシー", crew:"S2から", group:"日本", role:"Fが返り討ち・薫が正体を知る", klass:"事件",
   origin:"東京・乃木の自宅", fruit:"—", ftype:"戦闘・狙撃", rank:null,
   epi:"⑬ さよなら愛しき人よ", first:"第23話", status:"撃退",
   tags:["薫","ジャミーン","正体"], summary:"樊林杏が復讐とジャミーン奪取のため工作員を差し向ける。助けに行けば正体が知られると分かっていながら乃木は向かい、薫に別班だと知られた。",
   detail:[], battles:[], rel:[]},

  {id:"e_prisha", name:"プリシャ救出（2016年）", yomi:"ぷりしゃきゅうしゅつ", kind:"battle",
   state:"テント", crew:"S2から", group:"トルコ", role:"プリシャはジャミーンに", klass:"事件",
   origin:"タイランのアジト", fruit:"—", ftype:"—", rank:null,
   epi:"⑫ 奇跡の子とベキの生存", first:"第22話", status:"過去",
   tags:["年をとったサムライと若いサムライ","核融合"], summary:"7年前、ベキとアディエルがタイランのアジトを襲い、2歳のプリシャを救い出した。エリシャは娘の体の情報機器を隠すようアディエルに託した。",
   detail:[], battles:[], rel:[]}
  ],

  arcs: [
  {id:"a1", no:"01", name:"① 誤送金とバルカ脱出", ep:"第1〜3話", vols:"第1シーズン 誤送金編", chapters:"—",
   year:"2023年2月", sides:"乃木・野崎・薫 vs バルカ警察", result:"死の砂漠を越えて帰国",
   rank:"誤送金の容疑者", lead:"商社マン乃木が1億ドルの誤送金を回収しに行った先で自爆テロに巻き込まれる。公安の野崎、医師の薫とともに追われる身になり、「VIVANT」という言葉の意味を探り始める。",
   quote:{t:"お前がVIVANTか？", by:"アル＝ザイール"},
   beats:[
     {ep:"第1話", h:"日本から世界へ翔る大冒険が始まる!", body:"丸菱商事がバルカのGFL社に1億ドルを誤送金。差額9千万ドルの回収を命じられた乃木は、金がテロリストのザイールにダイヤで持ち出されたと掴む。ザイールは「お前がVIVANTか？」と言い残して自爆し、居合わせた公安の野崎が乃木を救う。乃木・野崎・薫は爆破の重要参考人としてチンギスに追われる。終盤、二宮和也演じるノコルがサプライズで登場。"},
     {ep:"第2話", h:"裏切りと別れ…明かされるヴィヴァンの意味", body:"協力者ドラムの手引きで日本大使館へ。野崎はザイールの言葉が、日本を陰で守る自衛隊の諜報組織「別班」のモンゴル語読みではないかと推測する。"},
     {ep:"第3話", h:"誤送金完結へ! 絶体絶命の反撃開始", body:"大使・西岡の裏切りに気づき、バルカ人も踏み込まない死の砂漠を越える。薫がラクダから落ちていたことに気づかず進む一行。帰国を果たし、誤送金を仕組んだ人物が財務の太田だと浮かぶ。"}
   ],
   points:["タイトルの「VIVANT」は別班のモンゴル語読み。第2話で早々に示される。","バルカ共和国は架空の国で、言語にはモンゴル語が使われている。ロケはモンゴルで2か月半。","乃木の独り言（F）や重さを量る特技など、後半の伏線が冒頭から置かれている。"],
   checks:[{q:"ザイールが乃木に残した言葉は？",a:"「お前がVIVANTか？」"},{q:"乃木たちが大使館を出ることになった理由は？",a:"大使・西岡がバルカ政府と内通し、彼らを引き渡そうとしたから。"}],
   keys:["nogi","nozaki","kaoru","drum","chinggis","zair","nishioka","adiel","jamiin"], battles:["e_gosokin","e_zair","e_desert"], newcomers:["nogi","nozaki","kaoru","drum","chinggis","jamiin","adiel","zair","noko"], deaths:["zair","adiel"]},

  {id:"a2", no:"02", name:"② 誤送金の黒幕と別班", ep:"第4話", vols:"第1シーズン 誤送金編", chapters:"—",
   year:"2023年", sides:"公安 vs 誤送金の黒幕", result:"山本を処刑・乃木の正体判明",
   rank:"別班の工作員", lead:"誤送金の実行犯・太田を追った先に黒幕の山本がいた。事件が片づいた瞬間、主人公の正体がひっくり返る。",
   quote:{t:"誤送金編完結! 裏切り者は許さない!", by:"第4話サブタイトル"},
   beats:[
     {ep:"第4話", h:"太田の救出", body:"公安が太田の自宅に急行するが不在。太田は口封じのため倉庫に拉致されていた。山本が居場所を漏らしたことで公安が彼女を救う。"},
     {ep:"第4話", h:"乃木と黒須", body:"ジャミーンのアルバムから山本がテントのモニターと知った乃木は、後輩の黒須と山本を捕らえ自白させ、潮騒橋で首吊り自殺に見せかけて処刑する。気弱な商社マンは別班の工作員だった。"}
   ],
   points:["誤送金の実行犯（太田）と黒幕（山本）を分ける二段構え。","乃木の正体が別班だと明かされ、以後の物語は「乃木が何を狙っているか」を読む構造に変わる。"],
   checks:[{q:"山本の正体は？",a:"テントのモニター（のちにアリから最下位と言われる）。"},{q:"太田のハンドルネームは？",a:"ブルーウォーカー（bluew@lker）。"}],
   keys:["nogi","kurosu","yamamoto","ota","nozaki","tojo","sano"], battles:["e_yamamoto"], newcomers:["kurosu","ota","yamamoto","tojo","sano","suzuki"], deaths:["yamamoto"]},

  {id:"a3", no:"03", name:"③ 宿命編 ── 乃木の過去とF", ep:"第5〜6話", vols:"第1シーズン 宿命編", chapters:"—",
   year:"2023年", sides:"乃木（別班） vs テント／公安", result:"ベキ＝実父と確信",
   rank:"テントを追う別班員", lead:"野崎が乃木の過去を掘り、乃木はテントの創設者が生き別れた父だと知る。Fの生まれた理由とジャミーンの手術が並行する。",
   quote:{t:"ヴィヴァンの真実…明かされる運命の絆", by:"第5話サブタイトル"},
   beats:[
     {ep:"第5話", h:"乃木の過去", body:"山本の死に違和感を抱いた野崎が乃木を徹底的に調べる。舞鶴の施設で「丹後隼人」として育ったこと、島根の乃木家を自力で探し当てたことが明らかになる。乃木はアリを家族ごと追い詰め、ノゴーン・ベキが父だと吐かせる。"},
     {ep:"第6話", h:"愛する父は悪魔か!? F誕生の秘密…", body:"野崎も乃木家の家紋とテントの旗の一致からテントとの関係に辿り着く。Fが施設での孤独から生まれたことが描かれ、ジャミーンの手術が行われる。乃木はアリを逃がし、暗号キーを受け取る。"}
   ],
   points:["テントのマークは乃木家の家紋。バトラカの発案で、のちの親子再会の鍵になる。","Fは乃木が孤独だった時期に生まれ、それ以前の乃木（バルカでの記憶）を知らない。"],
   checks:[{q:"施設時代の乃木の名前は？",a:"丹後隼人（AIハヤトの名の由来）。"},{q:"アリが乃木に渡したものは？",a:"テントの通信暗号キー。"}],
   keys:["nogi","f","nozaki","ali","beki","hiromichi","jamiin","kaoru"], battles:["e_ali"], newcomers:["beki","batraka","piyo","sakurai","hiromichi","shichi","mata","takada","wada","hirose","kumagai"], deaths:[]},

  {id:"a4", no:"04", name:"④ 別班集結とノコル捕縛", ep:"第7〜8話", vols:"第1シーズン 宿命編", chapters:"—",
   year:"2023年", sides:"別班精鋭6人 vs テント", result:"乃木が仲間を撃ちテントへ",
   rank:"裏切り者（偽装）", lead:"別班の精鋭がバルカに集結。テントのNo.2ノコルを捕らえた直後、乃木は仲間を撃ち、父のもとへ向かう。",
   quote:{t:"真実への序章…父と二人の息子の宿命", by:"第8話サブタイトル"},
   beats:[
     {ep:"第7話", h:"宿命の兄弟の対峙!! そして…", body:"太田の協力でテントのサーバーから情報を得て、櫻井司令の下に6人の精鋭が集まる。乃木はベキが父で元公安だと仲間に打ち明ける。野崎はチンギスと組んで乃木をマーク。"},
     {ep:"第7〜8話", h:"仲間への銃撃", body:"テントの会合に潜入しノコルを捕らえるが、乃木は次々と仲間を撃つ。黒須だけが弾をかわして肩で受けた。"},
     {ep:"第8話", h:"40年越しの再会", body:"テントに連行された乃木はベキと対面。乃木の自衛隊入隊や別班入りの経緯（サムと9.11、心理戦防護課程の試験）が描かれる。ノコルは乃木を疑い冷遇する。"}
   ],
   points:["乃木は心臓の上を狙い、致命傷を外していた（第10話で判明）。","ノコルにとって乃木は「後継の座を脅かす実子」。兄弟の確執が始まる。"],
   checks:[{q:"乃木の銃弾をかわしたのは誰？",a:"黒須（肩で受けて気絶しなかった）。"},{q:"乃木が自衛隊入りを決めた契機は？",a:"9.11後、親友サムが家族を守るため入隊したこと。"}],
   keys:["nogi","kurosu","noko","beki","sakurai","takada","wada","hirose","kumagai"], battles:["e_nokocapture"], newcomers:["sam"], deaths:[]},

  {id:"a5", no:"05", name:"⑤ テントの真実", ep:"第9話", vols:"第1シーズン 宿命編", chapters:"—",
   year:"1979〜2023年", sides:"テント内部", result:"テロの目的は孤児院の資金",
   rank:"ノコルの会社で働く", lead:"テントは孤児を救う資金のためにテロを請け負っていた。ベキの過去とテント誕生の経緯が明かされ、フローライトの鉱脈がテロをやめる道を開く。",
   quote:{t:"激動の最終回前SP～真実への反撃開始!", by:"第9話サブタイトル"},
   beats:[
     {ep:"第9話", h:"テントの実態", body:"テロや犯罪の請け負いで稼いだ金がバルカの孤児院に回っていた。孤児院の米を横領したヤスダを、乃木は重さを量る特技で見抜く。資金を着服したギリアムはベキに斬られた。"},
     {ep:"第9話", h:"ベキの過去", body:"1979年、公安の任務でバルカへ渡った卓は砂漠を緑化し「緑の魔術師」と呼ばれる。1984年の内乱で救出ヘリが引き返し、妻を失い息子と生き別れた。兄を亡くした乳児ノコルとの出会いと、孤児を養う用心棒稼業がテントの始まり。"},
     {ep:"第9話", h:"フローライト", body:"孤児ウヌを救いに200m地下へ降りたノコルが純度99%のフローライト鉱脈を発見。ベキは乃木をノコルの会社で働かせる。"}
   ],
   points:["テントは「思想なきテロ組織」ではなく、内乱の孤児を救う犯罪組織だった。","ベキの恨みは日本ではなく、ヘリを退避させた上司・上原個人に向いている。"],
   checks:[{q:"テントの活動資金の行き先は？",a:"バルカ国内の児童養護施設（孤児院）の運営。"},{q:"「ノゴーン・ベキ」の意味は？",a:"緑の魔術師。"}],
   keys:["beki","noko","nogi","batraka","piyo","gilliam","yasuda","akemi"], battles:["e_fluorite"], newcomers:["gilliam","yasuda","akemi"], deaths:["gilliam"]},

  {id:"a6", no:"06", name:"⑥ 40年の宿命の決着", ep:"第10話", vols:"第1シーズン 宿命編", chapters:"—",
   year:"2023年", sides:"ベキ vs 上原（そして乃木）", result:"乃木が父を狙撃",
   rank:"父を撃つ息子", lead:"乃木が別班を裏切っていなかったと判明。フローライトの採掘権を取り、ベキは投降する。だが日本で彼が向かったのは40年前の復讐だった。",
   quote:{t:"お前は私の誇り", by:"ノゴーン・ベキ"},
   beats:[
     {ep:"第10話", h:"別班の任務として", body:"「私は、別班の任務としてここに来ました」。撃たれた別班員は生きていた。激昂するノコル、刀を抜くベキ。乃木はテロをやめる代わりにフローライトの採掘を助け、ベキの投降を条件とする取引を示す。"},
     {ep:"第10話", h:"採掘権の逆転", body:"ワニズがゴビを抱き込み政府主導を宣言するが、ノコルは先にオリベ化学を押さえていた。チンギスが西岡の裏金映像でワニズを逮捕させる。"},
     {ep:"第10話", h:"上原邸", body:"日本へ移送されたベキ・バトラカ・ピヨは新庄の手引きで脱獄し、上原を襲う。乃木が父を撃ち、上原邸は全焼。3人の遺骨はバルカで盛大に弔われた。"},
     {ep:"第10話", h:"赤い饅頭", body:"乃木は薫とジャミーンのもとへ帰り抱きしめる。だがFが、緊急招集の合図が出ていると告げる。"}
   ],
   points:["S1最終回は視聴率19.6%で番組最高（S1平均14.3%）。","S2で、ベキたちの死は野崎が手配した偽装だったと明かされる（乃木は急所を外していた）。","新庄がテントのモニターだったことがここで回収される。"],
   checks:[{q:"ベキが日本で狙ったのは誰？",a:"救出ヘリを退避させた当時の上司・上原史郎（内閣官房副長官）。"},{q:"採掘権でノコル側が確保した割合は？",a:"ムルーデル45%＋オリベ化学15%の計60%。"}],
   keys:["nogi","beki","noko","uehara","shinjo","wanizu","nishioka","chinggis","nozaki"], battles:["e_fluorite","e_uehara"], newcomers:["uehara","kimel","sakamoto"], deaths:[]},

  {id:"a7", no:"07", name:"⑦ 別班拉致と新庄追跡", ep:"第11〜13話", vols:"第2シーズン 前半 別班奪還編", chapters:"—",
   year:"2023年5月〜", sides:"乃木 vs 拉致の首謀者", result:"キプロスでアリ拘束・長野が別班と判明",
   rank:"仲間を探す別班員", lead:"赤い饅頭の招集で、黒須ら別班員5人が何者かに拉致されたと知る。AIハヤトが疑うのはベキを逃がした新庄。",
   quote:{t:"冒険には、まだ続きがあった", by:"第11話 公式あらすじ"},
   beats:[
     {ep:"第11話", h:"新たな冒険始まる", body:"祠の赤い饅頭で緊急招集。ベキを撃った「あの日」、薫とジャミーンを抱きしめた「あの日」の裏で何が起きていたのかが描き直され、5人の拉致が明かされる。"},
     {ep:"第12話", h:"陰謀の首謀者判明!? 新たな仲間との対峙", body:"AIハヤトは新庄を首謀者と推定。乃木はバルカでノコルを訪ね、キプロスでアリを捕らえる。カンボジアからタイへ密入国する。"},
     {ep:"第13話", h:"裏切り", body:"アリの尋問から新庄がタイにいると判明。乃木の部屋に「別班の仲間」として現れたのは丸菱商事の長野専務だった。"}
   ],
   points:["S2は2クール14話の予定で、日曜劇場で連ドラが2クール続くのは異例。","アリの尋問はAIハヤトが嘘を判定する形に変わる。"],
   checks:[{q:"別班の緊急招集の合図は？",a:"祠に置かれた赤い饅頭。"},{q:"長野専務の正体は？",a:"東南アジアを統括する別班員。"}],
   keys:["nogi","kurosu","sakurai","hayato","ali","noko","nagano","shinjo","drum"], battles:["e_abduction","e_ali","e_shinjothai"], newcomers:["hayato","gerun","chocky","zhou","li","ton"], deaths:[]},

  {id:"a8", no:"08", name:"⑧ 野崎の裏切りとシンシー", ep:"第14〜15話", vols:"第2シーズン 前半 別班奪還編", chapters:"—",
   year:"2023年", sides:"乃木 vs シンシー（と野崎）", result:"真犯人は野崎",
   rank:"恩人に裏切られた男", lead:"新庄は拉致と無関係だった。5人を売ったのは、バルカで乃木の命を救った野崎。彼が向かった先には今作最大の宿敵がいた。",
   quote:{t:"裏切りの行方、別班を狙った宿敵の全貌", by:"第14話サブタイトル"},
   beats:[
     {ep:"第14話", h:"新庄の拘束", body:"長野の協力で新庄を追い詰め、両親を人質にした尋問で関与がないと分かる。新庄はタイ警察の銃撃を浴びるが、乃木の手引きで死が偽装される。真犯人は野崎だった。野崎がたどり着いた異国の組織はシンシー。"},
     {ep:"第15話", h:"親愛なる仲間の裏切りの果て、希望の光", body:"野崎の手がかりを求め、東条・佐野・チンギスの3人に狙いを絞る。東条は島根の潜伏先で乃木（F）に尋問され、野崎に脅されていたと白状する。"}
   ],
   points:["シンシーは「中国の別班」とも称される民間諜報機関で、中国公安部と密接。","公安内部にもシンシーの工作員（鈴木）が潜んでいた。"],
   checks:[{q:"新庄の潜伏先が割れたきっかけは？",a:"好物の納豆を使用人に買わせていたこと。"},{q:"野崎がシンシーに渡したものは？",a:"拉致された別班員5人の情報。"}],
   keys:["nogi","nozaki","shinjo","chocky","nagano","tojo","sano","chinggis","han"], battles:["e_shinjothai","e_nozakiinf"], newcomers:["han","tashiro","isaku"], deaths:[]},

  {id:"a9", no:"09", name:"⑨ 5年前の真実と劉銘軒", ep:"第16〜17話", vols:"第2シーズン 前半 別班奪還編", chapters:"—",
   year:"2018年〜2023年", sides:"野崎 vs シンシー", result:"潜入が露見・救出断念",
   rank:"非情な通告を受ける", lead:"野崎の裏切りは5年前から仕込まれた潜入捜査だった。だが死んだはずの部下・劉銘軒が現れ、計画は崩れる。",
   quote:{t:"物語の起源は5年前 愛に生きた男の真実", by:"第16話サブタイトル"},
   beats:[
     {ep:"第16話", h:"5年前", body:"佐野の口から、野崎の潜入捜査の真実と、別班員の拉致を黙認していたことが語られる。北京時代の部下・劉と張、核融合の研究者エリシャをめぐる5年前の物語がひもとかれる。"},
     {ep:"第17話", h:"下された非情な決断 試される兄弟の愛!?", body:"死んだはずの劉（堺雅人の二役）が野崎の潜入を見破り、暗号メッセージも解読される。シャキ城では和田が殺され、櫻井は救出断念を乃木に通告する。"}
   ],
   points:["劉は5歳からシンシーに育てられた二重スパイ。野崎への執着が物語を動かす。","乃木と瓜二つの劉の存在が、野崎が乃木を気にかけてきた理由になる。"],
   checks:[{q:"劉銘軒を演じているのは？",a:"堺雅人（二役）。"},{q:"シャキ城で殉職した別班員は？",a:"和田貢。"}],
   keys:["nozaki","liu","zhang","sano","elisha","wada","sakurai","nogi"], battles:["e_nozakiinf","e_abduction"], newcomers:["liu","zhang","elisha"], deaths:["wada","zhang"]},

  {id:"a10", no:"10", name:"⑩ 奪還作戦の始動", ep:"第18〜19話", vols:"第2シーズン 前半→後半", chapters:"—",
   year:"2023年", sides:"乃木＋テント vs シンシー", result:"最強チーム結成・ゴルバドへ",
   rank:"奪還チームの指揮官", lead:"断念の窮地を救ったのは弟ノコルとテントだった。新庄・チョッキー・ゲルンも加わり、ゴルバドへ向かう。",
   quote:{t:"テントは全勢力をかけて、兄さんに協力する", by:"ノコル"},
   beats:[
     {ep:"第18話", h:"前半戦・最終回!! 失われた愛が蘇る!? 最強の勇者たち集結", body:"長野の叱咤で前を向いた乃木がノコルに連絡。テントを壊滅に追い込んだのは自分だと言い淀む乃木に、ノコルは「なんでもっと単刀直入に言わないんだ」と即答する。死を偽装した新庄、恨みを捨てたチョッキーも合流。"},
     {ep:"第19話", h:"運命の奪還作戦開始 襲いかかる悪の刃!! 友の為に命を燃やせ", body:"「誰一人として死なせない、全員生きて帰る」。オルコ村の買収が進む一方、日本では黒須の実家をシンシーの工作員が襲うが、特殊作戦群が撃退する。エリシャを監禁するタイランも姿を現す。"}
   ],
   points:["アジア大会中継のため9月20・27日は休止し、第19話から後半「奪還実行編」。","別班・テント・元公安・元モニターという、S1では敵同士だった面々の連合軍。"],
   checks:[{q:"S2前半と後半の副題は？",a:"前半＝別班奪還編、後半＝奪還実行編。"},{q:"チョッキーが奪還作戦に協力した決め手は？",a:"死んだと思っていた新庄との再会。"}],
   keys:["nogi","noko","nagano","shinjo","chocky","gerun","isaku","tairan"], battles:["e_shaki"], newcomers:["tairan"], deaths:[]},

  {id:"a11", no:"11", name:"⑪ シャキ城突入と脱出", ep:"第20〜21話", vols:"第2シーズン 後半 奪還実行編", chapters:"—",
   year:"2023年", sides:"奪還チーム vs シンシー", result:"4人を救出・李と佟が死亡",
   rank:"Fが指揮を執る", lead:"城の罠を越えて牢獄へ。救い出したのも束の間、追手を振り切れず奪還がシンシー本部に伝わる。",
   quote:{t:"愛しき仲間との再会 決死の奪還決着へ!", by:"第20話サブタイトル"},
   beats:[
     {ep:"第20話", h:"牢獄へ", body:"予行演習を超える難度の赤外線センサーに尻込むチョッキーに新庄が檄を飛ばす。ノコルは門越しに佟を撃ち抜く。牢獄で黒須・高田・廣瀬・熊谷と再会し、和田の遺体を回収。Fは和田に敬礼する。"},
     {ep:"第21話", h:"帰還を阻む魔の手!? 出国への希望、現る", body:"追手の李を処理しきれず、通信可能エリアから本部へ連絡される。爆弾で瀕死の李をFが射殺。ガラマン空港への道を塞ぐシンシーと警察の前に現れたのがチンギスだった。Fはシステムを乗っ取り、樊林杏を挑発する。"}
   ],
   points:["Fの挑発が、のちに薫とジャミーンを危険にさらす代償になる。","チンギスの日本語吹替は第21話から大塚明夫。"],
   checks:[{q:"佟吐爾地を撃ったのは？",a:"ノコル（後方の狙撃援護から）。"},{q:"李を射殺したのは？",a:"乃木（F）。和田を殺された報復として。"}],
   keys:["nogi","f","noko","shinjo","chocky","gerun","kurosu","li","ton","chinggis","han"], battles:["e_shaki","e_escape"], newcomers:[], deaths:["ton","li"]},

  {id:"a12", no:"12", name:"⑫ 奇跡の子とベキの生存", ep:"第22話", vols:"第2シーズン 後半 奪還実行編", chapters:"—",
   year:"2016年／2023年", sides:"奪還チーム／シンシー", result:"ドラム救出・ベキ生存判明",
   rank:"真相に近づく", lead:"脱出は成功したが、野崎とドラムはシンシーの手中、チンギスはゴルバドに残された。シーズン最大の謎「奇跡の子」の真実に迫る。",
   quote:{t:"奇跡の正体、復活", by:"第22話サブタイトル"},
   beats:[
     {ep:"第22話", h:"チンギスとドラム", body:"ゴルバド警察に捕まったチンギスはバルカの外交圧力で釈放される。劉に撃たれ心肺停止で捨てられたドラムを、差出人不明のメッセージを頼りに見つけ蘇生させる。"},
     {ep:"第22話", h:"奇跡の子", body:"意識を取り戻したドラムが伝えたのは、シンシーがジャミーンをエリシャの娘プリシャだと疑っていること、洗脳された野崎がその住所を自白したこと、そしてベキがバトラカ・ピヨと生きていること。ジャミーンの「母との写真」はテントがCGで作ったものだった。"}
   ],
   points:["S1最終回のベキの死は偽装だった。","第22話は日本シリーズ中継延長で45分繰り下げて放送。"],
   checks:[{q:"ジャミーンの本名は？",a:"プリシャ・ママドフ（エリシャの実娘）。"},{q:"ドラムを撃ったのは？",a:"劉銘軒。"}],
   keys:["chinggis","drum","nozaki","liu","jamiin","beki","batraka","piyo","tairan"], battles:["e_escape","e_prisha"], newcomers:[], deaths:[]},

  {id:"a13", no:"13", name:"⑬ さよなら愛しき人よ", ep:"第23話", vols:"第2シーズン 後半 奪還実行編", chapters:"—",
   year:"2023年", sides:"乃木・ノコル・チンギス vs シンシー工作員", result:"薫が正体を知る・エリシャと接触",
   rank:"正体を明かす男", lead:"樊林杏の復讐が、東京の薫とジャミーンに向かう。助けに行けば愛する人に正体が知られる。最終話（第24話・11月8日）の前夜。",
   quote:{t:"最終決戦開幕前夜! さよなら愛しき人よ", by:"第23話サブタイトル"},
   beats:[
     {ep:"第23話", h:"乃木宅襲撃", body:"ノコル、チンギスと急ぎ帰国した乃木。樊は先回りして工作員を差し向ける。乃木（F）が工作員を撃退し、薫は乃木が別班だと知る。戸惑いながらも、まだ愛していると受け入れる。"},
     {ep:"第23話", h:"ベキとの対話", body:"ベキ・バトラカ・ピヨとの対話で、2016年にベキとアディエルがタイランのアジトからプリシャを救い、アディエルがジャミーンとして育てたこと、エリシャがアディエルに機密を託していたことを知る。"},
     {ep:"第23話", h:"アゼルバイジャンへ", body:"乃木と黒須はタイランを買収してエリシャと接触。ジャミーンが生きていると伝え、機密情報と娘への伝言を受け取る。だがシンシーもこれを把握していた。"}
   ],
   points:["乃木が初めて、私生活の側（薫）に正体を明かすことになる回。","最終話は11月8日放送予定（10分拡大）。本DBは第23話までを収録。"],
   checks:[{q:"エリシャがアディエルに託したものは？",a:"プリシャの体に埋め込まれた、核融合に関する情報の入った機器を取り出して隠すこと。"},{q:"第23話で乃木の正体を知った人物は？",a:"柚木薫。"}],
   keys:["nogi","f","kaoru","jamiin","han","noko","chinggis","beki","elisha","kurosu","tairan"], battles:["e_tokyoraid","e_prisha"], newcomers:[], deaths:[]}
  ]
};

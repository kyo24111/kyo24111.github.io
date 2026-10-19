/* ============================================================
   ブルーロック（アニメ）リサーチDB — データ定義
   収録範囲: TVアニメ 第1期（第1〜24話）＋ 第2期『VS. U-20 JAPAN』（第25〜38話）
            ＋ 劇場版『EPISODE 凪』。原作の「新英雄大戦」以降（第3期の範囲）は収録しない。
   追記するときは BLUELOCK.nodes に足すだけでグラフ／表／詳細に反映される。
   ------------------------------------------------------------
   node schema
     id      : 一意キー（英数字）
     name    : 表示名
     yomi    : ふりがな（検索対象）
     kind    : 'person' | 'battle'（＝試合） | 'faction'（＝チーム・組織）
     state   : 一次選考のチーム（バッジ色のキー）。運営・U-20・世界はそれぞれ独立
     crew    : 到達段階（ソート軸②：どこまで勝ち残ったか）
     group   : ポジション（U-20戦の起用位置。不明は FW）
     role    : 立場（battle はスコア）
     klass   : 分類（選手/GK/運営/世界選抜/家族/試合/チーム など）
     origin  : 所属・出身（高校・ユース）
     fruit   : 武器（本人の看板となるプレー）
     ftype   : 武器の系統（ソート軸④）
     rank    : ランキング（数値。小さいほど上位）
     rk      : ランキングの出典段階（「二次」「三次査定」など）
     epi     : 初登場の章（ソート軸①）
     first   : 初登場（アニメ話数）
     status  : 通過/脱落/敗者復活/勝利/敗北 など
     tags    : 検索用タグ
     summary : 1行要約
     detail  : [{h: 見出し, body: 本文}]
     battles : 参加した試合 node id
     rel     : [{to: id, label: 関係}]  ← グラフの辺になる
   ============================================================ */

const BLUELOCK = {
  meta: {
    title: "ブルーロック リサーチDB",
    range: "TVアニメ 第1期（第1〜24話）＋第2期 VS. U-20 JAPAN（第25〜38話）＋劇場版 EPISODE 凪",
    note: "アニメ放送分（U-20日本代表戦の決着まで）を収録。原作の「新英雄大戦」以降は第3期の範囲なので入れていません。テーブルは 章 / 一次選考チーム / 到達段階 / 武器の系統 / ランキング / 身長 を含む全列でソート・絞り込みできます。",
    updated: "2026-10-18"
  },

  faces: { dir: "", ids: [] },

  /* 人物プロフィール（node id → 個人データ）
     出典: Wikipedia「ブルーロック」登場人物節（声優・ランク）＋ Blue Lock Wiki（Fandom）のキャラクター
     インフォボックス（年齢・身長・誕生日。原典は公式キャラクターブック『EGOIST BIBLE』）。
     age はアニメ範囲（登場時）の年齢。cv=声優 / hcm=身長(cm) / birth=誕生日 / epithet=異名 */
  profiles: {
    /* ── チームZ ── */
    "isagi":    {cv:"浦和希", age:"16歳", hcm:175, birth:"4月1日", rank:"一難高校2年", epithet:"—"},
    "bachira":  {cv:"海渡翼", age:"17歳", hcm:176, birth:"8月8日", rank:"—", epithet:"「かいぶつ」を飼う男"},
    "kunigami": {cv:"小野友樹", age:"16歳", hcm:188, birth:"3月11日", rank:"—", epithet:"—"},
    "chigiri":  {cv:"斉藤壮馬", age:"16歳", hcm:177, birth:"12月23日", rank:"—", epithet:"お嬢"},
    "raichi":   {cv:"松岡禎丞", age:"17歳", hcm:182, birth:"10月11日", rank:"碇ヶ丘高校", epithet:"—"},
    "gagamaru": {cv:"仲村宗悟", age:"17歳", hcm:191, birth:"1月2日", rank:"—", epithet:"野生児"},
    "igarashi": {cv:"市川蒼", age:"17歳", hcm:172, birth:"7月6日", rank:"実家は寺", epithet:"イガグリ"},
    "kuon":     {cv:"中澤まさとも", age:"18歳", hcm:185, birth:"11月16日", rank:"—", epithet:"—"},
    "iemon":    {cv:"綿貫竜之介", age:"18歳", hcm:187, birth:"11月19日", rank:"—", epithet:"—"},
    "imamura":  {cv:"千葉翔也", age:"18歳", hcm:178, birth:"7月15日", rank:"—", epithet:"—"},
    "naruhaya": {cv:"梶田大嗣", age:"15歳", hcm:168, birth:"3月20日", rank:"6人兄弟の長男", epithet:"—"},
    "kira":     {cv:"鈴村健一", age:"17歳", hcm:181, birth:"5月23日", rank:"松風黒王高校 エース", epithet:"日本サッカー界の宝"},
    /* ── チームX ── */
    "barou":    {cv:"諏訪部順一", age:"18歳", hcm:187, birth:"6月27日", rank:"—", epithet:"王様（キング）"},
    "meiji":    {cv:"藤澤奨", age:"—", hcm:"—", birth:"—", rank:"—", epithet:"—"},
    "morinaga": {cv:"内田修一", age:"—", hcm:180, birth:"—", rank:"—", epithet:"—"},
    /* ── チームY ── */
    "niko":     {cv:"花江夏樹", age:"15歳", hcm:173, birth:"2月5日", rank:"—", epithet:"—"},
    "okawa":    {cv:"新祐樹", age:"18歳", hcm:177, birth:"6月12日", rank:"熊本県大会得点王", epithet:"—"},
    /* ── チームW ── */
    "wanima_j": {cv:"鈴木崚汰", age:"18歳", hcm:182, birth:"8月20日", rank:"千切と同じ高校", epithet:"鰐間兄弟（兄）"},
    "wanima_k": {cv:"鈴木崚汰", age:"18歳", hcm:182, birth:"8月20日", rank:"千切と同じ高校", epithet:"鰐間兄弟（弟）"},
    /* ── チームV ── */
    "nagi":     {cv:"島﨑信長", age:"17歳", hcm:190, birth:"5月6日", rank:"白宝高校2年", epithet:"サッカー歴半年の天才"},
    "reo":      {cv:"内田雄馬", age:"17歳", hcm:185, birth:"8月12日", rank:"白宝高校／御影コーポレーション御曹司", epithet:"—"},
    "zantetsu": {cv:"興津和幸", age:"17歳", hcm:187, birth:"10月30日", rank:"—", epithet:"バカ斬鉄"},
    "nameoka":  {cv:"木村昴", age:"—", hcm:186, birth:"—", rank:"青森駄々田高校 主将", epithet:"—"},
    "hijikata": {cv:"藤澤奨", age:"—", hcm:"—", birth:"—", rank:"—", epithet:"—"},
    "nemoto":   {cv:"杉林晟人", age:"—", hcm:185, birth:"—", rank:"—", epithet:"—"},
    /* ── 他の棟 ── */
    "rin":      {cv:"内山昂輝", age:"16歳", hcm:187, birth:"9月9日", rank:"—", epithet:"糸師冴の弟"},
    "aryu":     {cv:"小西克幸", age:"18歳", hcm:195, birth:"11月3日", rank:"—", epithet:"オシャ"},
    "tokimitsu":{cv:"立花慎之介", age:"17歳", hcm:183, birth:"3月21日", rank:"—", epithet:"—"},
    "shido":    {cv:"中村悠一", age:"18歳", hcm:185, birth:"7月7日", rank:"別棟の得点王", epithet:"悪魔"},
    "karasu":   {cv:"古川慎", age:"18歳", hcm:183, birth:"8月15日", rank:"バンビ大阪ユース", epithet:"殺し屋／分析屋"},
    "otoya":    {cv:"河西健吾", age:"17歳", hcm:177, birth:"12月3日", rank:"忍者の末裔", epithet:"—"},
    "yukimiya": {cv:"江口拓也", age:"18歳", hcm:184, birth:"4月28日", rank:"モデル兼業", epithet:"—"},
    "hiori":    {cv:"三上瑛士", age:"16歳", hcm:183, birth:"11月30日", rank:"関西のユース出身", epithet:"—"},
    "nanase":   {cv:"波多野翔", age:"15歳", hcm:178, birth:"1月1日", rank:"1年生", epithet:"—"},
    "kurona":   {cv:"小林千晃", age:"16歳", hcm:168, birth:"9月6日", rank:"—", epithet:"—"},
    "kiyora":   {cv:"加藤渉", age:"17歳", hcm:165, birth:"8月31日", rank:"—", epithet:"—"},
    "nishioka": {cv:"—", age:"—", hcm:"—", birth:"5月1日", rank:"—", epithet:"青森のメッシ"},
    "ishikari": {cv:"盆子原康", age:"17歳", hcm:200, birth:"2月10日", rank:"高校No.1の長身", epithet:"—"},
    "tanaka":   {cv:"武田太一", age:"—", hcm:184, birth:"—", rank:"—", epithet:"—"},
    "saramadara":{cv:"橘龍丸", age:"—", hcm:181, birth:"—", rank:"—", epithet:"湘南のプレデター"},
    "shiguma":  {cv:"田所陽向", age:"—", hcm:190, birth:"—", rank:"—", epithet:"鹿児島の巨神兵"},
    "hiiragi":  {cv:"—", age:"18歳", hcm:184, birth:"7月10日", rank:"—", epithet:"—"},
    "himizu":   {cv:"—", age:"—", hcm:"—", birth:"—", rank:"—", epithet:"—"},
    "haiji":    {cv:"—", age:"—", hcm:168, birth:"—", rank:"—", epithet:"—"},
    /* ── U-20日本代表 ── */
    "aiku":     {cv:"日野聡", age:"19歳", hcm:190, birth:"6月30日", rank:"U-20日本代表 主将", epithet:"最後の砦"},
    "sendo":    {cv:"若山晃久", age:"18歳", hcm:181, birth:"10月7日", rank:"国内1部リーグのレギュラーFW", epithet:"—"},
    "nio":      {cv:"佐藤拓也", age:"19歳", hcm:184, birth:"4月14日", rank:"—", epithet:"ドーベルマン"},
    "darai":    {cv:"白井悠介", age:"19歳", hcm:179, birth:"12月21日", rank:"—", epithet:"—"},
    "neru":     {cv:"土岐隼一", age:"19歳", hcm:168, birth:"11月6日", rank:"—", epithet:"—"},
    "hayate":   {cv:"小野賢章", age:"19歳", hcm:186, birth:"4月7日", rank:"—", epithet:"—"},
    "wakatsuki":{cv:"坂泰斗", age:"18歳", hcm:178, birth:"2月27日", rank:"—", epithet:"—"},
    "cho":      {cv:"笠間淳", age:"19歳", hcm:193, birth:"8月19日", rank:"—", epithet:"—"},
    "kitsunezato":{cv:"梶原岳人", age:"19歳", hcm:181, birth:"5月2日", rank:"—", epithet:"—"},
    "fukaku":   {cv:"小林親弘", age:"19歳", hcm:191, birth:"7月8日", rank:"U-20日本代表 守護神", epithet:"—"},
    "sae":      {cv:"櫻井孝宏", age:"18歳", hcm:180, birth:"10月10日", rank:"レ・アール下部組織", epithet:"新世代世界11傑"},
    /* ── 運営・連合 ── */
    "ego":      {cv:"神谷浩史", age:"30歳", hcm:189, birth:"3月31日", rank:"青い監獄 総責任者", epithet:"—"},
    "anri":     {cv:"幸村恵理", age:"22歳", hcm:157, birth:"8月17日", rank:"日本フットボール連合 新入職員", epithet:"—"},
    "buratsuta":{cv:"島田敏", age:"62歳", hcm:178, birth:"11月7日", rank:"日本フットボール連合（アニメでは特別顧問）", epithet:"—"},
    "houichi":  {cv:"関俊彦", age:"—", hcm:"—", birth:"—", rank:"U-20日本代表 監督", epithet:"耳なし法一"},
    /* ── 世界 ── */
    "noa":      {cv:"—", age:"31歳", hcm:184, birth:"4月2日", rank:"フランス代表", epithet:"世界一のストライカー"},
    "loki":     {cv:"下野紘", age:"17歳", hcm:178, birth:"6月9日", rank:"フランス代表", epithet:"神速神童（ゴッドスプリンター）"},
    "luna":     {cv:"神尾晋一郎", age:"27歳", hcm:186, birth:"10月31日", rank:"スペイン代表", epithet:"レ・アールの貴公子"},
    "cavasoz":  {cv:"駒田航", age:"23歳", hcm:"—", birth:"—", rank:"アルゼンチン代表", epithet:"そばかすベイビー"},
    "blake":    {cv:"高橋大輔", age:"26歳", hcm:183, birth:"9月30日", rank:"イングランド代表", epithet:"ゲットゴールジャンキー"},
    "silva":    {cv:"ロバートウォーターマン", age:"28歳", hcm:195, birth:"10月23日", rank:"ブラジル代表", epithet:"重戦車"},
    /* ── 家族ほか ── */
    "isagi_pa": {cv:"相馬康一／中原麻衣", age:"—", hcm:"—", birth:"—", rank:"世一の両親", epithet:"—"},
    "bachira_yu":{cv:"甲斐田裕子", age:"—", hcm:"—", birth:"—", rank:"廻の母／芸術家", epithet:"—"},
    "tada":     {cv:"藤澤奨", age:"—", hcm:"—", birth:"—", rank:"一難高校", epithet:"—"}
  },

  nodes: [
  /* ══════════ チームZ ══════════ */
  {id:"isagi", name:"潔 世一", yomi:"いさぎ よいち", kind:"person",
   state:"チームZ", crew:"青い監獄イレブン", group:"OMF（背番号11）", role:"主人公", klass:"選手",
   origin:"一難高校", fruit:"空間認識能力／ダイレクトシュート", ftype:"視野・頭脳", rank:15, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"勝利",
   tags:["主人公","空間認識","ダイレクトシュート","喰う","U-20戦決勝点"],
   summary:"武器を持たない「平凡な」FWとして入寮し、空間認識と適応力でU-20戦の決勝点まで駆け上がった主人公。",
   detail:[
     {h:"出発点", body:"県大会決勝のゴール前で、監督の教え通りフリーの味方へパスを出して負けた。「あの時自分で打っていたら」という後悔が、300人の中で最初に絵心の誘いへ駆け出す理由になった。"},
     {h:"武器の発見", body:"チームX戦で嗅いだ「ゴールの匂い」を手がかりに、國神・千切の言葉から自分の武器が空間認識だと気づく。フィールドを俯瞰して未来を読み、DFの裏で受けてダイレクトで打つ型ができあがった。"},
     {h:"「喰う」という進化", body:"二次選考で成早や馬狼の動きを取り込み、他人の武器ごと自分のゴールの糧にするスタイルへ。最大の才能は技術ではなく、自分を壊してでも作り直す「適応」だと描かれる。"},
     {h:"U-20戦", body:"トップ下で凛と並ぶ。アディショナルタイム、凛が冴との1対1で蹴り出したボールが愛空の頭上を越えて落ちてきたところを、ダイレクトで沈めて4-3の決勝点。青い監獄存続を決めた。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_s3_top3","b_s2_baro","b_s3_reo","b_s4_top3","b_world1","b_t_a1b1","b_u20"],
   rel:[{to:"bachira",label:"最初の相棒"},{to:"rin",label:"宿敵・共闘"},{to:"nagi",label:"二次選考で組む"},{to:"barou",label:"利用し合う"},{to:"kira",label:"入寮テストで当てた"},{to:"ego",label:"見出された"},{to:"isagi_pa",label:"両親"},{to:"tada",label:"高校の同僚"},{to:"f_teamz",label:"所属"}]},

  {id:"bachira", name:"蜂楽 廻", yomi:"ばちら めぐる", kind:"person",
   state:"チームZ", crew:"青い監獄イレブン", group:"LSB（背番号8）", role:"潔の相棒", klass:"選手",
   origin:"—", fruit:"変幻自在のドリブル", ftype:"テクニック", rank:7, rk:"三次査定",
   epi:"① 入寮テスト", first:"第1話", status:"勝利",
   tags:["ドリブル","かいぶつ","TOP3","シード"],
   summary:"「かいぶつ」と呼ぶ内なる相棒と踊るドリブラー。誰かを探すサッカーから、自分のゴールのためのサッカーへ脱皮した。",
   detail:[
     {h:"かいぶつ", body:"幼少期、周囲になじめずひとりでボールを蹴るうちに生まれたイマジナリーフレンド。部活ではその感性が軋轢の原因になり、ずっと押し込めていた。"},
     {h:"潔との出会い", body:"入寮テストで潔を気に入り、一次選考では事実上の相棒に。チームV戦では折れかけたチームZに火を点けた。"},
     {h:"凛のチームへ", body:"二次選考3rdステージで敗れた潔たちから、TOP3が引き抜いたのが蜂楽。凛に「誰かを探してるサッカー」と見抜かれ、第22〜23話で内なるかいぶつを振り切って自分のエゴに目覚める。"},
     {h:"三次以降", body:"世界選抜戦後の査定で7位。適性試験では端数対策の「2試合出場シード」を担った。U-20戦では左SBとして先発。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_s3_top3","b_s4_top3","b_world1","b_t_a3b3","b_t_a4c3","b_u20"],
   rel:[{to:"isagi",label:"相棒"},{to:"rin",label:"かいぶつを見抜かれる"},{to:"bachira_yu",label:"母"},{to:"f_top3",label:"引き抜かれる"},{to:"f_teamz",label:"所属"}]},

  {id:"kunigami", name:"國神 錬介", yomi:"くにがみ れんすけ", kind:"person",
   state:"チームZ", crew:"二次選考で脱落（敗者復活へ）", group:"FW", role:"ヒーロー志望", klass:"選手",
   origin:"—", fruit:"左足のミドルシュート／フィジカル", ftype:"シュート", rank:50, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"敗者復活",
   tags:["ミドル","無回転","敗者復活戦","ワイルドカード"],
   summary:"正々堂々を好む「青い監獄の良心」。潔に武器のヒントを与えたが、二次選考で士道に敗れ敗者復活戦へ。",
   detail:[
     {h:"潔に与えた問い", body:"一次選考初戦、潔のとっさのアシストで得点し、「なぜ雷市ではなく俺に出した」と問う。この問いが、潔が自分の空間認識に気づく大きな手がかりになった。"},
     {h:"二次選考", body:"自分を待たなかった潔を倒すため、千切・玲王と組む。3rdステージで潔・凪・馬狼に4-5で敗れ、その後の2ndステージで士道と対戦して敗北。脱落者として「敗者復活戦（ワイルドカード）」の扉をくぐった。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_s3_reo","b_kunigami_shido"],
   rel:[{to:"isagi",label:"武器のヒントを与える"},{to:"chigiri",label:"二次で組む"},{to:"reo",label:"二次で組む"},{to:"shido",label:"敗れる"},{to:"f_teamz",label:"所属"}]},

  {id:"chigiri", name:"千切 豹馬", yomi:"ちぎり ひょうま", kind:"person",
   state:"チームZ", crew:"青い監獄イレブン", group:"RSB（背番号4）", role:"快足", klass:"選手",
   origin:"—", fruit:"トップスピード（50m 5秒77）", ftype:"スピード", rank:44, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"勝利",
   tags:["快足","前十字靭帯","お嬢","熱"],
   summary:"右膝の大怪我でスピードを失う恐怖に縛られていた快足。チームW戦で封印を解き、二次選考で潔たちに引き抜かれた。",
   detail:[
     {h:"封じた脚", body:"名門校で実力主義を打ち立てた絶頂期に右膝前十字靭帯を断裂。再断裂すれば選手生命が危ういと言われ、全力で走ること自体を避けていた。青い監獄にも「サッカーをやめる理由を探しに来た」と語る。"},
     {h:"チームW戦", body:"かつての同僚・鰐間兄弟に過去を煽られる。久遠の裏切りで追い詰められた3-4の局面で、ついに全速で駆け抜けて同点ゴールを奪った。"},
     {h:"二次〜U-20", body:"國神・玲王と組んだ3rdステージで敗れ、潔たちに引き抜かれる。U-20戦では右SBで攻守に走り切り、脚をつって氷織と交代した。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_s3_reo","b_s4_top3","b_world2","b_t_a1b1","b_u20"],
   rel:[{to:"wanima_j",label:"元同僚"},{to:"isagi",label:"チームメイト"},{to:"kunigami",label:"二次で組む"},{to:"hiori",label:"U-20戦で交代"},{to:"f_teamz",label:"所属"}]},

  {id:"raichi", name:"雷市 陣吾", yomi:"らいち じんご", kind:"person",
   state:"チームZ", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号22）", role:"チームの声", klass:"選手",
   origin:"碇ヶ丘高校", fruit:"スタミナ・執念のマンマーク", ftype:"守備", rank:95, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"通過",
   tags:["ヘタクソ","キャプテンシー","久遠を殴る"],
   summary:"口が悪く粗暴だがチームを叱咤する声の主。裏切った久遠を一発殴って「これで終い」と遺恨を清算した。",
   detail:[
     {h:"チームZの空気", body:"武器を言えない潔を「ヘタクソ」と罵倒する一方、試合では誰より声を出す。久遠の裏切り後、自分が殴ることでチームのわだかまりを解いた。"},
     {h:"武器", body:"本人いわく華麗なシュートだが、実際に効いているのはスタミナと体格、粘着質なマンマーク。ベンチ入りでU-20戦の青い監獄選抜に名を連ねた。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_t_b2c2"],
   rel:[{to:"kuon",label:"殴って和解"},{to:"isagi",label:"ヘタクソ呼ばわり"},{to:"f_teamz",label:"所属"}]},

  {id:"gagamaru", name:"我牙丸 吟", yomi:"ががまる ぎん", kind:"person",
   state:"チームZ", crew:"青い監獄イレブン", group:"GK（背番号1）", role:"守護神", klass:"GK",
   origin:"—", fruit:"肉体のバネ", ftype:"GK", rank:88, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"勝利",
   tags:["野生児","GK転向","スコーピオン"],
   summary:"素手で食べ山で暮らす謎の野生児FW。全身のバネを買われ、U-20戦では青い監獄のゴールマウスを守った。",
   detail:[
     {h:"FWとして", body:"チームY戦では潔のこぼれを「ナイスパス」と押し込み、チームV戦ではスコーピオンシュートを放つなど、変則的な身体操作で得点に絡んだ。"},
     {h:"GKとして", body:"凪のフェイント気味のシュートに誰より早く反応した反射が、身体能力のGK適性最高値として評価される。U-20戦で先発GKに抜擢され、冴の初得点の直前には閃堂のシュートを止めた。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_t_a2c1","b_u20"],
   rel:[{to:"isagi",label:"チームメイト"},{to:"sae",label:"失点"},{to:"f_teamz",label:"所属"}]},

  {id:"igarashi", name:"五十嵐 栗夢", yomi:"いがらし ぐりむ", kind:"person",
   state:"チームZ", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号76）", role:"お調子者", klass:"選手",
   origin:"実家は寺", fruit:"諦めない心（自称）", ftype:"—", rank:108, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"通過",
   tags:["イガグリ","寺","最下位通過"],
   summary:"通称イガグリ。寺を継がずに済むよう「日本代表になれたら」と父と約束して参加した。一次選考を伍号棟最下位で通過。",
   detail:[
     {h:"立ち位置", body:"自己主張は強いが実力差を自覚している節があり、チームV戦の序盤では完全に士気を失っていた。それでも最後まで残り、U-20戦のベンチ入り23名に入った。"},
     {h:"二次選考", body:"士道・玲王と組んで勝ち上がる（3rdステージで曽倉らに勝利）。二次選考の通過順位は判明している中で最も低い108位。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_t_a2c1"],
   rel:[{to:"shido",label:"二次で組む"},{to:"reo",label:"二次で組む"},{to:"f_teamz",label:"所属"}]},

  {id:"kuon", name:"久遠 渉", yomi:"くおん わたる", kind:"person",
   state:"チームZ", crew:"二次選考で脱落", group:"FW", role:"裏切りと改心", klass:"選手",
   origin:"—", fruit:"ジャンプ力・ヘディング", ftype:"フィジカル", rank:97, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"脱落",
   tags:["裏切り","八百長","レッドカード覚悟"],
   summary:"チームZのまとめ役を装い、チームWに作戦を流した裏切り者。チームV戦で人生を懸けるチームZを見て改心した。",
   detail:[
     {h:"裏切り", body:"無名校でサッカー部を作り、温度差に苦しんだ過去から「自分だけでも勝ち残る」と考えるようになった。チームの先行きを見限り、チームWに八百長を持ちかけて作戦と武器を漏らした。"},
     {h:"改心", body:"チームV戦では試合に参加しなかったが、終盤、レッドカード覚悟で凪を止める。雷市に殴られてチームと和解した。二次選考では悪評で組む相手がおらず、出遅れ組の伊右衛門・今村と組んで脱落。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv"],
   rel:[{to:"wanima_j",label:"八百長を持ちかける"},{to:"raichi",label:"殴られて和解"},{to:"iemon",label:"二次で組む"},{to:"f_teamz",label:"所属"}]},

  {id:"iemon", name:"伊右衛門 送人", yomi:"いえもん おくひと", kind:"person",
   state:"チームZ", crew:"二次選考で脱落", group:"GK（一次選考）", role:"まとめ役", klass:"選手",
   origin:"—", fruit:"オールラウンド", ftype:"—", rank:101, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"脱落",
   tags:["GK","良心","面倒見"],
   summary:"頼まれると断れない面倒見のいい大人。一次選考は全試合GKを引き受け、FWとしてのプレーは描かれないまま脱落した。",
   detail:[{h:"役割", body:"久遠の裏切り後はチームZのまとめ役に。本職FWながらGKとして失点を重ね、終盤のPK場面でファインセーブを見せた。"}],
   battles:["b_zx","b_zy","b_zw","b_zv"],
   rel:[{to:"kuon",label:"二次で組む"},{to:"imamura",label:"二次で組む"},{to:"f_teamz",label:"所属"}]},

  {id:"imamura", name:"今村 遊大", yomi:"いまむら ゆうだい", kind:"person",
   state:"チームZ", crew:"二次選考で脱落", group:"FW", role:"チャラ男", klass:"選手",
   origin:"—", fruit:"スピード＆テクニック", ftype:"スピード", rank:104, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"脱落",
   tags:["女好き","出遅れ組"],
   summary:"サッカーを恋愛に置き換えて語る軽いノリの男。二次選考は出遅れ組で久遠・伊右衛門と組み脱落。",
   detail:[],
   battles:["b_zx","b_zy","b_zw","b_zv"],
   rel:[{to:"iemon",label:"二次で組む"},{to:"f_teamz",label:"所属"}]},

  {id:"naruhaya", name:"成早 朝日", yomi:"なるはや あさひ", kind:"person",
   state:"チームZ", crew:"二次選考で脱落", group:"FW", role:"苦労人", klass:"選手",
   origin:"—", fruit:"裏への飛び出し", ftype:"スピード", rank:38, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"脱落",
   tags:["6人兄弟","キャラメル","喰われた"],
   summary:"両親を亡くし弟妹を養う6人兄弟の長男。2ndステージで潔に動きを「喰われ」、馬狼が選ばれて脱落した。",
   detail:[
     {h:"背負うもの", body:"アルバイトと家事をこなしながら練習してきた。日本代表になって家族を楽にするため参加し、家族からのお守りのキャラメルの箱を持ち歩く。"},
     {h:"潔への餞", body:"二次選考2ndステージで馬狼と組み、潔・凪に4-5で敗北。潔は情けをかけず馬狼を選んだ。成早はそれに感謝し、涙ながらにエールを送って去った。潔は成早の裏抜けの動きを自分の武器に取り込んでいる。"}
   ],
   battles:["b_onigokko","b_zx","b_zy","b_zw","b_zv","b_s2_baro"],
   rel:[{to:"isagi",label:"動きを喰われる"},{to:"barou",label:"2ndで組む"},{to:"f_teamz",label:"所属"}]},

  {id:"kira", name:"吉良 涼介", yomi:"きら りょうすけ", kind:"person",
   state:"チームZ", crew:"入寮テストで脱落", group:"FW", role:"最初の脱落者", klass:"選手",
   origin:"松風黒王高校", fruit:"—", ftype:"—", rank:289, rk:"入寮時",
   epi:"① 入寮テスト", first:"第1話", status:"脱落",
   tags:["日本サッカー界の宝","U-18候補","オニごっこ"],
   summary:"「日本サッカー界の宝」と呼ばれた有名FW。オニごっこで潔にボールを当てられ、最初に青い監獄を去った。",
   detail:[
     {h:"絵心への反発", body:"紳士的で正義感が強く、エゴを説く絵心を真っ向から批判していた。自分が頂点に立って否定するつもりで参加した。"},
     {h:"オニごっこ", body:"ランクが高かったがゆえにジャイアントキリングを狙う蜂楽と潔に狙われ、最後に当てられて失格。抗議する吉良に絵心は「勝負から逃げたお前の負けだ」と告げた。去り際に潔へ向けた憎悪の表情が、第1話の幕切れになる。"}
   ],
   battles:["b_onigokko"],
   rel:[{to:"isagi",label:"当てられて脱落"},{to:"ego",label:"反発"},{to:"f_teamz",label:"同室"}]},

  /* ══════════ チームX ══════════ */
  {id:"barou", name:"馬狼 照英", yomi:"ばろう しょうえい", kind:"person",
   state:"チームX", crew:"青い監獄イレブン", group:"RWG（交代／背番号13）", role:"王様", klass:"選手",
   origin:"—", fruit:"27m射程のミドル／突進ドリブル", ftype:"シュート", rank:18, rk:"二次",
   epi:"② 一次選考 X・Y戦", first:"第3話", status:"勝利",
   tags:["キング","悪役","チョップドリブル","U-20戦同点弾"],
   summary:"「王様」を自称する傲慢なエース。潔に利用される挫折を経て「フィールドの悪役」として甦り、U-20戦で3-3の同点弾を叩き込んだ。",
   detail:[
     {h:"チームX戦", body:"潔に最初の敗北を刻みつけた相手。得点王の復活枠をめぐってボールの奪い合いになった試合で、馬狼一人が流れを支配し5-1。"},
     {h:"王の挫折", body:"二次選考で潔・凪と組むが、自分中心の攻撃が連動から取り残される。主役の座を潔に奪われて膝をつき（第18話）、そこから悪役としてゴールを奪う活路を見出した。"},
     {h:"U-20戦", body:"後半に投入。潔をマークさせる囮を逆手にとって凛を「狩り」、3-3に追いつくゴール。上着を脱いでイエローカードをもらった。"}
   ],
   battles:["b_zx","b_s2_baro","b_s3_reo","b_s4_top3","b_world2","b_t_b2c2","b_u20"],
   rel:[{to:"isagi",label:"互いに喰い合う"},{to:"naruhaya",label:"2ndで組む"},{to:"nagi",label:"二次で組む"},{to:"rin",label:"U-20で狩る"},{to:"f_teamx",label:"エース"}]},

  {id:"meiji", name:"明治 心", yomi:"めいじ はあと", kind:"person",
   state:"チームX", crew:"一次選考で脱落", group:"FW", role:"—", klass:"選手",
   origin:"—", fruit:"—", ftype:"—", rank:251, rk:"一次",
   epi:"② 一次選考 X・Y戦", first:"第3話", status:"脱落",
   tags:["オールバック"],
   summary:"チームXの背番号6。チームZ戦で馬狼にマークが集中した隙を突いて1点を決めた。",
   detail:[], battles:["b_zx"], rel:[{to:"barou",label:"チームメイト"},{to:"f_teamx",label:"所属"}]},

  {id:"morinaga", name:"森永 大弥", yomi:"もりなが だいや", kind:"person",
   state:"チームX", crew:"一次選考で脱落", group:"FW", role:"司令塔", klass:"選手",
   origin:"—", fruit:"—", ftype:"—", rank:246, rk:"一次",
   epi:"② 一次選考 X・Y戦", first:"第3話", status:"脱落",
   tags:[], summary:"チームXの背番号4。馬狼の陰でチームの司令塔役を担っていた。",
   detail:[], battles:["b_zx"], rel:[{to:"barou",label:"チームメイト"},{to:"f_teamx",label:"所属"}]},

  /* ══════════ チームY ══════════ */
  {id:"niko", name:"二子 一揮", yomi:"にこ いっき", kind:"person",
   state:"チームY", crew:"青い監獄イレブン", group:"CB（背番号3）", role:"司令塔", klass:"選手",
   origin:"—", fruit:"空間認識と戦術眼", ftype:"視野・頭脳", rank:63, rk:"二次",
   epi:"② 一次選考 X・Y戦", first:"第4話", status:"勝利",
   tags:["遊戯王","一撃必殺カウンター","CB転向"],
   summary:"潔と同じ空間認識を持つチームYの司令塔。一次選考で潔と「読み合い」を演じ、U-20戦ではCBとして士道を止めた。",
   detail:[
     {h:"チームY戦", body:"フィールドを俯瞰する者同士として潔と読み合う。最後の1分に「一撃必殺カウンター」を仕掛けるが、潔のゴールで2-1と競り負けた。"},
     {h:"原点", body:"もとは遊戯王の公式大会で優勝するほどの腕前。大切なカードを破られたことに激昂し、100日後のサッカーの試合で相手の大切なものを潰すと宣戦布告して勝った。"},
     {h:"U-20戦", body:"ボール奪取力と読みを買われてCBで先発。後半開始直後、決死のブロックで士道を止めるが足首を負傷し、玲王と交代した。"}
   ],
   battles:["b_zy","b_t_b2c2","b_u20"],
   rel:[{to:"isagi",label:"読み合い"},{to:"shido",label:"ブロック"},{to:"reo",label:"U-20で交代"},{to:"f_teamy",label:"司令塔"}]},

  {id:"okawa", name:"大川 響鬼", yomi:"おおかわ ひびき", kind:"person",
   state:"チームY", crew:"一次選考で脱落", group:"FW", role:"—", klass:"選手",
   origin:"熊本県大会得点王", fruit:"フェイントを使ったシュート", ftype:"シュート", rank:254, rk:"一次",
   epi:"② 一次選考 X・Y戦", first:"第1話", status:"脱落",
   tags:["モヒカン","有名選手"],
   summary:"モヒカン頭の熊本県大会得点王。吉良と並ぶ有名選手だったが、チームY敗退に伴い脱落した。",
   detail:[], battles:["b_zy"], rel:[{to:"niko",label:"チームメイト"},{to:"f_teamy",label:"所属"}]},

  /* ══════════ チームW ══════════ */
  {id:"wanima_j", name:"鰐間 淳壱", yomi:"わにま じゅんいち", kind:"person",
   state:"チームW", crew:"青い監獄（ベンチ外）", group:"FW", role:"兄", klass:"選手",
   origin:"千切と同じ高校", fruit:"以心伝心の連携（アイコンタクト）", ftype:"テクニック", rank:79, rk:"二次",
   epi:"③ 一次選考 W戦", first:"第6話", status:"通過",
   tags:["鰐間兄弟","双子","口下手"],
   summary:"鰐間兄弟の兄。弟の計助が代弁して話す口下手だが、二次選考を通過して三次選考まで残った。",
   detail:[{h:"チームW戦", body:"千切の元チームメイトとして過去の怪我を煽る。久遠から流された情報で12対10の数的優位を作ったが、4-4で引き分けた。"}],
   battles:["b_zw","b_t_b2c2"],
   rel:[{to:"wanima_k",label:"双子の弟"},{to:"chigiri",label:"元同僚・煽る"},{to:"kuon",label:"八百長の相手"},{to:"f_teamw",label:"エース"}]},

  {id:"wanima_k", name:"鰐間 計助", yomi:"わにま けいすけ", kind:"person",
   state:"チームW", crew:"一次選考で脱落", group:"FW", role:"弟", klass:"選手",
   origin:"千切と同じ高校", fruit:"以心伝心の連携（アイコンタクト）", ftype:"テクニック", rank:232, rk:"一次",
   epi:"③ 一次選考 W戦", first:"第6話", status:"脱落",
   tags:["鰐間兄弟","双子"],
   summary:"鰐間兄弟の弟で兄の代弁役。チームW敗退で一次選考脱落。",
   detail:[], battles:["b_zw"], rel:[{to:"wanima_j",label:"双子の兄"},{to:"f_teamw",label:"所属"}]},

  /* ══════════ チームV ══════════ */
  {id:"nagi", name:"凪 誠士郎", yomi:"なぎ せいしろう", kind:"person",
   state:"チームV", crew:"青い監獄イレブン", group:"OMF（背番号7）", role:"天才", klass:"選手",
   origin:"白宝高校", fruit:"桁外れのトラップ", ftype:"テクニック", rank:6, rk:"三次査定",
   epi:"④ 一次選考 V戦", first:"第1話", status:"勝利",
   tags:["めんどくさい","トラップ","EPISODE凪","U-20戦同点弾"],
   summary:"サッカー歴半年の天才。チームZに初めて負けてサッカーの面白さに目覚め、玲王と離れて潔と組む道を選んだ。",
   detail:[
     {h:"始まり", body:"サッカーに興味はなかったが、同じ高校の玲王に才能を見込まれて始めた。「めんどくさい」が口癖で、話し相手のサボテン「チョキ」を育てる。"},
     {h:"初めての敗北", body:"一次選考最終戦でチームZに4-5で敗れ、悔しさと同時にサッカーの面白さに目覚める。劇場版『EPISODE 凪』はこの視点から描き直したもの。"},
     {h:"玲王との別れ", body:"二次選考3rdステージで玲王ではなく潔・蜂楽と組む決断をする。以後、トラップを起点に試合ごとに進化した。"},
     {h:"U-20戦", body:"トップ下で先発。凛の即興パスから常識外れのゴールで1-1の同点にした。"}
   ],
   battles:["b_zv","b_s3_top3","b_s2_baro","b_s3_reo","b_s4_top3","b_world2","b_u20"],
   rel:[{to:"reo",label:"相棒→別れ"},{to:"isagi",label:"組む・ライバル"},{to:"zantetsu",label:"チームメイト"},{to:"nameoka",label:"高校時代の相手"},{to:"f_teamv",label:"エース"},{to:"f_hakuho",label:"在籍"}]},

  {id:"reo", name:"御影 玲王", yomi:"みかげ れお", kind:"person",
   state:"チームV", crew:"青い監獄イレブン", group:"CB（交代／背番号14）", role:"参謀", klass:"選手",
   origin:"白宝高校", fruit:"オールラウンド／複写変化（カメレオン）", ftype:"テクニック", rank:10, rk:"二次",
   epi:"④ 一次選考 V戦", first:"第1話", status:"勝利",
   tags:["御曹司","カメレオン","凪の宝物"],
   summary:"総資産7058億円の御影コーポレーション御曹司。凪を見出した張本人で、凪に置いていかれた痛みから「カメレオン」を編み出した。",
   detail:[
     {h:"凪を見つけた男", body:"全てに恵まれ退屈していた中で、W杯優勝という夢に出会った。両親に反対されながら凪を誘い、サッカー歴半年で白宝のキャプテンに。凪とは「最後までいっしょにいる」と約束して入寮した。"},
     {h:"別れ", body:"二次選考で凪が潔を選び、取り残される。國神・千切と組むが潔たちに敗れ、その後も勝ち上がって通過した。"},
     {h:"カメレオン", body:"適性試験で、相手の技を器用にコピーする新戦法「複写変化（カメレオン）」を見せる（第28話）。U-20戦では負傷した二子に代わってCBで投入された。"}
   ],
   battles:["b_zv","b_s3_reo","b_t_a2c1","b_u20"],
   rel:[{to:"nagi",label:"見出した相棒"},{to:"zantetsu",label:"チームメイト"},{to:"kunigami",label:"二次で組む"},{to:"chigiri",label:"二次で組む"},{to:"niko",label:"U-20で交代"},{to:"f_teamv",label:"リーダー"},{to:"f_hakuho",label:"主将"}]},

  {id:"zantetsu", name:"剣城 斬鉄", yomi:"つるぎ ざんてつ", kind:"person",
   state:"チームV", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号15）", role:"世界一尊敬されるバカ志望", klass:"選手",
   origin:"実家は歯医者", fruit:"爆発的な加速と左足シュート", ftype:"スピード", rank:53, rk:"二次",
   epi:"④ 一次選考 V戦", first:"第1話", status:"通過",
   tags:["バカ斬鉄","加速","チームVトリオ"],
   summary:"チームVのスーパートリオの一角。熟語を言い間違えては「バカ斬鉄」と呼ばれるが、加速力は本物。",
   detail:[{h:"二次選考", body:"二子・柊と組むが、凪・千切・馬狼に敗れて引き抜かれ、そのまま第2通過チームとして世界選抜と対戦した。"}],
   battles:["b_zv","b_world2","b_t_a4c3"],
   rel:[{to:"nagi",label:"チームメイト"},{to:"reo",label:"チームメイト"},{to:"hiiragi",label:"二次で組む"},{to:"f_teamv",label:"所属"}]},

  {id:"nameoka", name:"舐岡 了", yomi:"なめおか りょう", kind:"person",
   state:"チームV", crew:"入寮テストで脱落", group:"FW", role:"—", klass:"選手",
   origin:"青森駄々田高校", fruit:"フィジカルの力押し", ftype:"フィジカル", rank:252, rk:"入寮時",
   epi:"⑪ 劇場版 EPISODE 凪", first:"劇場版", status:"脱落",
   tags:["劇場版","白宝戦"],
   summary:"全国常連・青森駄々田の主将。白宝との練習試合で凪・玲王に敗れ、入寮テストでは凪のシュートが直撃して脱落した。",
   detail:[], battles:[], rel:[{to:"nagi",label:"練習試合で敗北"},{to:"f_hakuho",label:"対戦校"}]},

  {id:"hijikata", name:"土方 喜三郎", yomi:"ひじかた きさぶろう", kind:"person",
   state:"チームV", crew:"二次選考で脱落", group:"GK（一次選考）", role:"—", klass:"選手",
   origin:"—", fruit:"—", ftype:"—", rank:228, rk:"一次",
   epi:"④ 一次選考 V戦", first:"第9話", status:"脱落",
   tags:[], summary:"チームVの背番号1。チームZ戦ではGKを務めた。",
   detail:[], battles:["b_zv"], rel:[{to:"f_teamv",label:"所属"}]},

  {id:"nemoto", name:"根本 蒼太", yomi:"ねもと そうた", kind:"person",
   state:"チームV", crew:"二次選考で脱落", group:"FW", role:"—", klass:"選手",
   origin:"—", fruit:"—", ftype:"—", rank:226, rk:"一次",
   epi:"④ 一次選考 V戦", first:"第8話", status:"脱落",
   tags:[], summary:"チームVの背番号3。アニメでは二次選考の待機シーンにも描かれた。",
   detail:[], battles:["b_zv"], rel:[{to:"f_teamv",label:"所属"}]},

  /* ══════════ 他の棟（別の伍号棟） ══════════ */
  {id:"rin", name:"糸師 凛", yomi:"いとし りん", kind:"person",
   state:"他の棟", crew:"青い監獄イレブン", group:"CF（主将／背番号10）", role:"トップランカー", klass:"選手",
   origin:"—", fruit:"精密なキックと試合支配", ftype:"シュート", rank:1, rk:"三次査定",
   epi:"⑤ 二次選考 1st〜3rd", first:"第11話", status:"勝利",
   tags:["TOP3","冴の弟","二次選考1位","主将"],
   summary:"二次選考を1位で抜けた青い監獄の頂点。兄・冴を超えるためだけにここにいる。U-20戦の最後、冴との1対1で決勝点の起点になった。",
   detail:[
     {h:"兄との決裂", body:"幼い頃は「冴が世界一、凛は世界二のストライカー」という夢を兄と追っていた。だが海外から戻った冴は夢を「世界一のMF」に変えたと告げ、1対1で凛を完敗させて突き放した。"},
     {h:"TOP3", body:"蟻生・時光と組み、潔・蜂楽・凪を5-2、再戦の4対4も5-4で下した。勝者の指名で潔を自分のチームへ引き抜く。"},
     {h:"U-20戦", body:"主将・CFで先発。潔と連動して2-1の勝ち越し点。兄と同じ位置から、利き足でない左で冴のゴールを再現しようとする場面もある。"}
   ],
   battles:["b_s3_top3","b_s4_top3","b_world1","b_t_a1b1","b_u20"],
   rel:[{to:"sae",label:"兄・決裂"},{to:"isagi",label:"引き抜く・宿敵"},{to:"bachira",label:"かいぶつを見抜く"},{to:"shido",label:"犬猿"},{to:"f_top3",label:"リーダー"},{to:"f_bl11",label:"主将"}]},

  {id:"aryu", name:"蟻生 十兵衛", yomi:"ありゅう じゅうべえ", kind:"person",
   state:"他の棟", crew:"青い監獄イレブン", group:"CB（背番号2）", role:"オシャ", klass:"選手",
   origin:"—", fruit:"跳躍力と長いリーチ", ftype:"フィジカル", rank:2, rk:"二次",
   epi:"⑤ 二次選考 1st〜3rd", first:"第1話", status:"勝利",
   tags:["TOP3","オシャ","195cm"],
   summary:"「オシャ」を最上位の価値観とするナルシスト。195cmの高さとリーチでU-20戦の前半終了間際、冴のシュートを止めた。",
   detail:[{h:"小ネタ", body:"第1話の強化選手が並ぶ場面にモブとして描かれていたが、原作の金城宗幸が気に入りキャラクターとして採用された。古風な名前にコンプレックスがある。"}],
   battles:["b_s3_top3","b_s4_top3","b_world1","b_t_a2c1","b_u20"],
   rel:[{to:"rin",label:"TOP3"},{to:"tokimitsu",label:"TOP3"},{to:"sae",label:"シュートを阻止"},{to:"f_top3",label:"所属"}]},

  {id:"tokimitsu", name:"時光 青志", yomi:"ときみつ あおし", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号20）", role:"ネガティブな怪物", klass:"選手",
   origin:"—", fruit:"ケタ違いの俊敏反応", ftype:"フィジカル", rank:3, rk:"二次",
   epi:"⑤ 二次選考 1st〜3rd", first:"第1話", status:"通過",
   tags:["TOP3","サッカーオタク","ネガティブ"],
   summary:"後ろ向きな発言で相手を困惑させるTOP3の一人。馬狼と互角以上のフィジカルと無尽蔵のスタミナを持つ。",
   detail:[], battles:["b_s3_top3","b_s4_top3","b_world1","b_t_a4c3"],
   rel:[{to:"rin",label:"TOP3"},{to:"aryu",label:"TOP3"},{to:"f_top3",label:"所属"}]},

  {id:"shido", name:"士道 龍聖", yomi:"しどう りゅうせい", kind:"person",
   state:"他の棟", crew:"U-20日本代表（特別参加）", group:"FW（U-20側／背番号13）", role:"悪魔", klass:"選手",
   origin:"経歴不明", fruit:"どんな体勢からでも決める得点力", ftype:"シュート", rank:2, rk:"三次査定",
   epi:"⑧ 三次選考 適性試験", first:"第24話", status:"敗北",
   tags:["悪魔","フロー","U-20側で出場","2ゴール"],
   summary:"暴力も辞さない別棟の得点王。青い監獄選抜から外され、冴に選ばれてU-20側で出場。2ゴールで試合をひっくり返しかけた。",
   detail:[
     {h:"なぜU-20側に", body:"適性試験では凛と組んで高得点を挙げたが、他の選手と噛み合わずスタメンから外れる。冴が「青い監獄から一人」を条件にU-20参加を受け、その一人に士道を指名した。"},
     {h:"後半の主役", body:"前半はベンチ。後半から投入され、閃堂が囮で得たFKを決めて2-2、さらに冴の導きでフロー状態に入り2-3と勝ち越した。"},
     {h:"國神との因縁", body:"二次選考で敵味方問わず暴力に走った士道を國神が制したことから因縁が生まれ、直後の対戦で國神を脱落させた。"}
   ],
   battles:["b_kunigami_shido","b_t_a1b1","b_u20"],
   rel:[{to:"sae",label:"選ばれる・心酔"},{to:"rin",label:"犬猿"},{to:"kunigami",label:"脱落させる"},{to:"igarashi",label:"二次で組む"},{to:"reo",label:"二次で組む"},{to:"f_u20",label:"特別参加"}]},

  {id:"karasu", name:"烏 旅人", yomi:"からす たびと", kind:"person",
   state:"他の棟", crew:"青い監獄イレブン", group:"DMF（背番号6）", role:"分析屋", klass:"選手",
   origin:"バンビ大阪ユース", fruit:"フェイントとハンドワークのキープ", ftype:"視野・頭脳", rank:3, rk:"三次査定",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"勝利",
   tags:["殺し屋","関西弁","乙夜とコンビ"],
   summary:"「分析屋」を名乗る関西弁のMF。相手の弱点を突き詰める戦い方から「殺し屋」と恐れられる。",
   detail:[
     {h:"適性試験", body:"チームBの固定選手（乙夜と2人）。A1戦では潔・氷織・七星を相手に4-5で競り負けた（第26話「殺し屋と忍者」）。"},
     {h:"氷織への助言", body:"関西のユースで一緒だった氷織の心理を一プレーで見抜き、「まずは自分に『期待』しろ」と核心を突いた。"}
   ],
   battles:["b_t_a1b1","b_t_b2c2","b_u20"],
   rel:[{to:"otoya",label:"相棒"},{to:"hiori",label:"関西ユース仲間"},{to:"f_bl11",label:"DMF"}]},

  {id:"otoya", name:"乙夜 影汰", yomi:"おとや えいた", kind:"person",
   state:"他の棟", crew:"青い監獄イレブン", group:"RWG→RSB（背番号9）", role:"忍者", klass:"選手",
   origin:"忍者の末裔", fruit:"影をすり抜ける俊敏性", ftype:"スピード", rank:4, rk:"三次査定",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"勝利",
   tags:["ちゅーす","烏とコンビ","チャラ男"],
   summary:"忍者の末裔を名乗るノリで生きる男。烏との連携は青い監獄でもトップクラス。",
   detail:[{h:"U-20戦", body:"右WGで先発し、蛇来のマークに苦しむ。後半は氷織投入で右SBへスライド、のちに馬狼と交代した。"}],
   battles:["b_t_a1b1","b_t_b2c2","b_u20"],
   rel:[{to:"karasu",label:"相棒"},{to:"darai",label:"マッチアップ"},{to:"barou",label:"U-20で交代"},{to:"f_bl11",label:"RWG"}]},

  {id:"yukimiya", name:"雪宮 剣優", yomi:"ゆきみや けんゆう", kind:"person",
   state:"他の棟", crew:"青い監獄イレブン", group:"LWG（背番号5）", role:"時間が無い男", klass:"選手",
   origin:"モデル兼業", fruit:"ドリブルとカーブシュート", ftype:"テクニック", rank:5, rk:"三次査定",
   epi:"⑧ 三次選考 適性試験", first:"第24話", status:"勝利",
   tags:["ゴーグル","視神経の病","モデル"],
   summary:"疲れると視界が狭くなる視神経の病を隠して戦う。「俺には時間が無い」が口癖の、謙虚で負けず嫌いなウイング。",
   detail:[{h:"U-20戦", body:"左WGで先発。音留のスピードに封じられるが、潔が走ってパスコースを作った隙に抜け、愛空にブロックされる鋭いシュートを放った。"}],
   battles:["b_t_a2c1","b_u20"],
   rel:[{to:"neru",label:"マッチアップ"},{to:"f_bl11",label:"LWG"}]},

  {id:"hiori", name:"氷織 羊", yomi:"ひおり よう", kind:"person",
   state:"他の棟", crew:"青い監獄イレブン", group:"RWG→RSB（交代／背番号16）", role:"はんなりした天才", klass:"選手",
   origin:"関西のユース出身", fruit:"精密なパスと広い視野", ftype:"視野・頭脳", rank:27, rk:"二次",
   epi:"⑧ 三次選考 適性試験", first:"第24話", status:"勝利",
   tags:["京都弁","極S","優しい世界線"],
   summary:"京都弁で話す常識人だが、本人いわく極S。ゴールへの執念が凡と言われる一方、パスとスポーツIQは非凡。",
   detail:[
     {h:"適性試験", body:"潔・七星とA1に入り、凛・士道の下でプレー。潔は普通の会話が成立するだけで感動した。"},
     {h:"U-20戦", body:"脚をつった千切に代わって後半投入。視野の広さとキックの正確さで崩れかけた均衡を取り戻し、馬狼の投入後は右SBへ。"}
   ],
   battles:["b_t_a1b1","b_u20"],
   rel:[{to:"karasu",label:"関西ユース仲間"},{to:"isagi",label:"A1で組む"},{to:"nanase",label:"A1で組む"},{to:"chigiri",label:"U-20で交代"}]},

  {id:"nanase", name:"七星 虹郎", yomi:"ななせ にじろう", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号17）", role:"1年生", klass:"選手",
   origin:"1年生", fruit:"潔のフォロー", ftype:"—", rank:99, rk:"二次",
   epi:"⑧ 三次選考 適性試験", first:"第24話", status:"通過",
   tags:["方言","ヘアバンド","優しい世界線"],
   summary:"青い監獄のロゴ入りヘアバンドを巻いた1年生。凛の動きについていけず、潔のフォローに徹して生き残った。",
   detail:[], battles:["b_t_a1b1"],
   rel:[{to:"isagi",label:"A1で組む"},{to:"hiori",label:"A1で組む"}]},

  {id:"kurona", name:"黒名 蘭世", yomi:"くろな らんぜ", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号96）", role:"—", klass:"選手",
   origin:"—", fruit:"スピードと小回りのドリブル", ftype:"スピード", rank:4, rk:"二次",
   epi:"⑧ 三次選考 適性試験", first:"第24話", status:"通過",
   tags:["ギザ歯","三つ編み","同じ単語を2回"],
   summary:"同じ単語を二度繰り返す癖のあるドリブラー。二次選考を4位で通過した。",
   detail:[], battles:["b_t_a4c3"], rel:[{to:"kiyora",label:"A4で組む"}]},

  {id:"kiyora", name:"清羅 刃", yomi:"きよら じん", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号19）", role:"—", klass:"選手",
   origin:"—", fruit:"強靭な体幹と地を這うボール", ftype:"フィジカル", rank:21, rk:"二次",
   epi:"⑤ 二次選考 1st〜3rd", first:"第1話", status:"通過",
   tags:["あい","ブレイクダンス","165cm"],
   summary:"165cmと小柄ながら凪に当たられても倒れない体幹。二次選考では凪たちに敗れて引き抜かれ、第2通過チームに入った。",
   detail:[{h:"作画の変遷", body:"アニメ第1期の時点では設定が固まっておらず、黒髪・赤目で描かれていた（本来は紺色）。"}],
   battles:["b_world2","b_t_a4c3"],
   rel:[{to:"nagi",label:"引き抜かれる"},{to:"karasu",label:"二次で組む"},{to:"f_teamv",label:"—"}]},

  {id:"nishioka", name:"西岡 初", yomi:"にしおか はじめ", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ外）", group:"FW", role:"有名選手", klass:"選手",
   origin:"青森", fruit:"—", ftype:"—", rank:29, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"通過",
   tags:["青森のメッシ"],
   summary:"「青森のメッシ」。第1話から名前が挙がる有名選手だが、プレーはほぼ描かれない。",
   detail:[], battles:["b_t_a3b3"], rel:[{to:"barou",label:"二次で組む"}]},

  {id:"ishikari", name:"石狩 幸雄", yomi:"いしかり ゆきお", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号12）", role:"有名選手", klass:"選手",
   origin:"—", fruit:"200cmの高さ", ftype:"フィジカル", rank:13, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"通過",
   tags:["高校No.1の長身","バスケ好き"],
   summary:"身長200cmで高校No.1の長身として有名。サッカーよりバスケットボールを大事にしている節がある。",
   detail:[], battles:["b_t_a2c1"], rel:[{to:"aryu",label:"A2で組む"}]},

  {id:"tanaka", name:"田中 信玄", yomi:"たなか しんげん", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ外）", group:"FW", role:"—", klass:"選手",
   origin:"—", fruit:"—", ftype:"—", rank:5, rk:"二次",
   epi:"① 入寮テスト", first:"第1話", status:"通過",
   tags:["老け顔","ドレッド"],
   summary:"老け顔でドレッドヘア。名前が明かされる前から何度も背景に描かれ、二次選考を5位で通過している。",
   detail:[], battles:["b_t_a2c1"], rel:[{to:"reo",label:"C1で組む"}]},

  {id:"saramadara", name:"皿斑 海琉", yomi:"さらまだら かいる", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ外）", group:"FW", role:"—", klass:"選手",
   origin:"湘南", fruit:"—", ftype:"—", rank:51, rk:"二次",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"通過",
   tags:["湘南のプレデター","流れ"],
   summary:"「湘南のプレデター」。適性試験でB1に指名されたが、FWとしての見せ場はないまま終わった。",
   detail:[], battles:["b_t_a1b1"], rel:[{to:"karasu",label:"B1で組む"}]},

  {id:"shiguma", name:"志熊 恭平", yomi:"しぐま きょうへい", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ外）", group:"FW", role:"—", klass:"選手",
   origin:"鹿児島", fruit:"—", ftype:"フィジカル", rank:55, rk:"二次",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"通過",
   tags:["鹿児島の巨神兵","おばあちゃん子"],
   summary:"「鹿児島の巨神兵」。色黒で無口な大男だが、実はおばあちゃん子。",
   detail:[], battles:["b_t_a1b1"], rel:[{to:"karasu",label:"B1で組む"}]},

  {id:"hiiragi", name:"柊 零次", yomi:"ひいらぎ れいじ", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ）", group:"ベンチ（背番号18）", role:"占い", klass:"選手",
   origin:"—", fruit:"統計で相手を型に嵌める", ftype:"視野・頭脳", rank:22, rk:"二次",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"通過",
   tags:["占い","統計","ビッグデータサッカー"],
   summary:"占いと統計で相手の行動を予測し型に嵌めるビッグデータ派。二子・斬鉄と組んで凪たちに敗れた。",
   detail:[], battles:["b_t_a3b3"], rel:[{to:"zantetsu",label:"二次で組む"},{to:"niko",label:"二次で組む"}]},

  {id:"himizu", name:"日不見 愛基", yomi:"ひみず あいき", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ外）", group:"FW", role:"—", klass:"選手",
   origin:"—", fruit:"嘘を見抜く連続フェイク", ftype:"テクニック", rank:77, rk:"二次",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"通過",
   tags:["蛇の舌","フェイク"],
   summary:"嘘を見抜き、暴くことに快感を覚える。連続フェイクで相手を翻弄するスタイル。",
   detail:[], battles:["b_t_b2c2"], rel:[{to:"karasu",label:"二次で組む"},{to:"nagi",label:"煽って怒らせる"}]},

  {id:"haiji", name:"灰地 静", yomi:"はいじ しずか", kind:"person",
   state:"他の棟", crew:"青い監獄（ベンチ外）", group:"FW", role:"—", klass:"選手",
   origin:"—", fruit:"—", ftype:"—", rank:19, rk:"二次",
   epi:"⑧ 三次選考 適性試験", first:"第28話", status:"通過",
   tags:[], summary:"付箋のようなボサボサ髪。適性試験でA3（蜂楽・西岡）に入った。",
   detail:[], battles:["b_t_a3b3"], rel:[{to:"bachira",label:"A3で組む"}]},

  /* ══════════ U-20日本代表 ══════════ */
  {id:"sae", name:"糸師 冴", yomi:"いとし さえ", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"OMF（背番号10）", role:"新世代世界11傑", klass:"選手",
   origin:"レ・アール下部組織", fruit:"完璧なキックとカウンタードリブル", ftype:"テクニック", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第2話", status:"敗北",
   tags:["凛の兄","世界一のMF","美しく壊す"],
   summary:"世界中のクラブが注目する凛の兄。U-20側の切り札として先制点を奪い、士道を覚醒させた。",
   detail:[
     {h:"夢の転向", body:"かつては世界一のストライカーを目指していたが、海外で世界を知り「世界一のMF」へ夢を切り替えた。それが自分に憧れていた凛との決裂の原因になった。"},
     {h:"参加の条件", body:"U-20の現有FWを見て見切りをつけ、「青い監獄から最低一人をこちらに入れる」ことを条件に参戦。選んだのが士道だった。"},
     {h:"試合", body:"開始早々、50m超のロングパスから流れを作り、こぼれ球を角度のない位置から曲げて先制（0-1）。後半はピンポイントのクロスで士道を導いた。"}
   ],
   battles:["b_u20"],
   rel:[{to:"rin",label:"弟・決裂"},{to:"shido",label:"指名"},{to:"aiku",label:"主将と取引"},{to:"sendo",label:"酷評"},{to:"f_u20",label:"所属"}]},

  {id:"aiku", name:"オリヴァ・愛空", yomi:"おりゔぁ あいく", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"CB（主将／背番号2）", role:"最後の砦", klass:"選手",
   origin:"ストックホルム生まれ", fruit:"身体能力と空間把握", ftype:"守備", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第25話", status:"敗北",
   tags:["主将","警察と泥棒","元FW"],
   summary:"U-20日本代表の主将。DFとストライカーを「警察と泥棒」に例え、青い監獄の前に「日本サッカーが生まれ変わる最後の砦」として立ちはだかった。",
   detail:[
     {h:"なぜDFなのか", body:"中学まではFW。「チームのため」を優先する日本のストライカー像に嫌気が差し、それに染まった自分にも幻滅してDFへ転身した過去がある。"},
     {h:"士道をめぐる賭け", body:"チームの力を試す賭けとして、士道抜きで前半を戦うと冴に交渉。劣勢で冴が試合を降りかけたところを、士道の投入で引き留めた。"},
     {h:"最後の攻撃", body:"終盤、自ら前線へ走ってシュートを狙うが、凛のスライディングに阻まれる。青い監獄の選手たちを「かつて自分が選べなかったアナザーストーリー」と見ていた。"}
   ],
   battles:["b_u20"],
   rel:[{to:"isagi",label:"警察と泥棒"},{to:"sae",label:"取引"},{to:"shido",label:"組み伏せる"},{to:"sendo",label:"鼓舞"},{to:"f_u20",label:"主将"}]},

  {id:"sendo", name:"閃堂 秋人", yomi:"せんどう しゅうと", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"CF（背番号11）", role:"エース", klass:"選手",
   origin:"国内1部リーグ", fruit:"スタミナ", ftype:"シュート", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["ハリウッド女優","囮"],
   summary:"U-20のエースFW。冴に「猿でも決める」と酷評されるが、後半は囮でFKを奪い、終盤には蜂楽のシュートを体で止めた。",
   detail:[{h:"エースの意地", body:"前半無得点でプライドを引き裂かれるが、愛空の言葉で奮い立つ。試合後「ハリウッド女優と結婚する」と世界を目指す宣言をした。"}],
   battles:["b_u20"],
   rel:[{to:"sae",label:"酷評される"},{to:"shido",label:"連携"},{to:"bachira",label:"シュートを死守"},{to:"f_u20",label:"エース"}]},

  {id:"nio", name:"仁王 和真", yomi:"におう かずま", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"CB（背番号3）", role:"—", klass:"選手",
   origin:"—", fruit:"前を向かせない速いプレス", ftype:"守備", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["ドーベルマン","ボクシング"],
   summary:"自らを「ドーベルマン」と称するCB。凪に前を向かせず、愛空との挟み込みでボールを奪った。",
   detail:[], battles:["b_u20"], rel:[{to:"nagi",label:"マーク"},{to:"aiku",label:"CBコンビ"},{to:"f_u20",label:"所属"}]},

  {id:"darai", name:"蛇来 弥勒", yomi:"だらい みろく", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"LSB（背番号5）", role:"—", klass:"選手",
   origin:"—", fruit:"陰と陽を読む先読み", ftype:"守備", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["陰と陽","古風な言葉遣い"],
   summary:"フィールドの「陰と陽」を読み、相手の動きを先回りで封じる左SB。乙夜のオフ・ザ・ボールを追い続けた。",
   detail:[], battles:["b_u20"], rel:[{to:"otoya",label:"マッチアップ"},{to:"f_u20",label:"所属"}]},

  {id:"neru", name:"音留 徹平", yomi:"ねる てっぺい", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"RSB（背番号4）", role:"—", klass:"選手",
   origin:"—", fruit:"電光石火の対応力", ftype:"スピード", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["ポケモン好き"], summary:"千切や雪宮に劣らぬスピードの右SB。雪宮のドリブルを封じた。",
   detail:[], battles:["b_u20"], rel:[{to:"yukimiya",label:"マッチアップ"},{to:"f_u20",label:"所属"}]},

  {id:"hayate", name:"颯 波留", yomi:"はやて はる", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"DMF（背番号7）", role:"—", klass:"選手",
   origin:"—", fruit:"一枚目の壁", ftype:"守備", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["ガーデニング"], summary:"相手ボールで最初に立ちはだかり、DF陣が整う時間を稼ぐボランチ。後半はFWに上がった。",
   detail:[], battles:["b_u20"], rel:[{to:"rin",label:"マーク"},{to:"f_u20",label:"所属"}]},

  {id:"wakatsuki", name:"若月 樹", yomi:"わかつき いつき", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"DMF（背番号6）", role:"—", klass:"選手",
   origin:"—", fruit:"判断力", ftype:"視野・頭脳", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["睡眠オタク"], summary:"そばかすとヘアバンドのボランチ。後半、士道と交代した。",
   detail:[], battles:["b_u20"], rel:[{to:"shido",label:"交代"},{to:"f_u20",label:"所属"}]},

  {id:"cho", name:"超 健人", yomi:"ちょう けんと", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"LWG（背番号8）", role:"—", klass:"選手",
   origin:"—", fruit:"193cmのポストプレー", ftype:"フィジカル", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["ボディメイク"], summary:"台詞の一文字目だけ離して話す長身ウイング。冴のロングパスの受け手になった。",
   detail:[], battles:["b_u20"], rel:[{to:"sae",label:"ロングパスを受ける"},{to:"f_u20",label:"所属"}]},

  {id:"kitsunezato", name:"狐里 輝", yomi:"きつねざと てる", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"RWG（背番号9）", role:"—", klass:"選手",
   origin:"—", fruit:"瞬発力と裏への飛び出し", ftype:"スピード", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["兎好き"], summary:"オレンジの髪を後ろで結んだ右ウイング。",
   detail:[], battles:["b_u20"], rel:[{to:"f_u20",label:"所属"}]},

  {id:"fukaku", name:"不角 源", yomi:"ふかく げん", kind:"person",
   state:"U-20日本代表", crew:"U-20日本代表", group:"GK（背番号1）", role:"守護神", klass:"GK",
   origin:"—", fruit:"準備に時間をかける反応", ftype:"GK", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"敗北",
   tags:["父思い"], summary:"U-20の守護神。凛の左足シュートに指先で触れてポストに当てた。",
   detail:[], battles:["b_u20"], rel:[{to:"rin",label:"シュートを止める"},{to:"f_u20",label:"所属"}]},

  /* ══════════ 運営・連合 ══════════ */
  {id:"ego", name:"絵心 甚八", yomi:"えご じんぱち", kind:"person",
   state:"運営・連合", crew:"運営", group:"—", role:"総責任者", klass:"運営",
   origin:"元プロ（ノアの元チームメイト）", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"勝利",
   tags:["エゴ","監督","ブルーロックプロジェクト"],
   summary:"日本サッカーに足りないのはエゴだと豪語し、300人から世界一のストライカー1人を作ろうとする青い監獄の全権者。",
   detail:[
     {h:"思想", body:"辛辣な言い方をする一方、選手に必要な本質を的確に言語化して与える。選考の一つひとつが「エゴ」の別の側面を試す装置として設計されている（詳解タブ）。"},
     {h:"U-20戦", body:"総指揮としてベンチに座り、交代と配置を指示。逆転を許しても「青い監獄はもう既に勝ってる」と動じなかった。士道もまた青い監獄が生んだ選手だからである。"},
     {h:"ノアとの関係", body:"現世界一のストライカー、ノエル・ノアの現役時代のチームメイト。ノアからは人生最初のライバルと呼ばれている。"}
   ],
   battles:["b_onigokko","b_u20"],
   rel:[{to:"anri",label:"補佐"},{to:"buratsuta",label:"対立"},{to:"noa",label:"元チームメイト"},{to:"isagi",label:"見出す"},{to:"f_bluelock",label:"総責任者"}]},

  {id:"anri", name:"帝襟 アンリ", yomi:"ていえり あんり", kind:"person",
   state:"運営・連合", crew:"運営", group:"—", role:"連合の新入職員", klass:"運営",
   origin:"日本フットボール連合", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"勝利",
   tags:["絵心を指名","マネージャー"],
   summary:"日本のW杯優勝を夢見て、その救世主に絵心を指名した連合の新人職員。U-20戦ではマネージャーとして見守った。",
   detail:[], battles:["b_u20"],
   rel:[{to:"ego",label:"指名した"},{to:"buratsuta",label:"上司と対立"},{to:"f_jfu",label:"職員"},{to:"f_bluelock",label:"補佐"}]},

  {id:"buratsuta", name:"不乱蔦 宏俊", yomi:"ぶらつた ひろとし", kind:"person",
   state:"運営・連合", crew:"運営", group:"—", role:"連合の実力者", klass:"運営",
   origin:"日本フットボール連合", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"敗北",
   tags:["金儲け","特別顧問"],
   summary:"サッカーを金儲けのビジネスと捉え、青い監獄を潰そうとする連合の実力者（原作は会長、アニメでは特別顧問）。",
   detail:[{h:"U-20戦", body:"青い監獄消滅を賭けた特別壮行試合を仕掛け、ハーフタイムにはU-20の監督を壁に押しつけて「何としても勝て」と迫った。"}],
   battles:["b_u20"],
   rel:[{to:"ego",label:"敵視"},{to:"houichi",label:"手を組む"},{to:"f_jfu",label:"実力者"}]},

  {id:"houichi", name:"法一 正次", yomi:"ほういち せいじ", kind:"person",
   state:"運営・連合", crew:"U-20日本代表", group:"監督", role:"U-20監督", klass:"運営",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第2期", status:"敗北",
   tags:["耳なし法一"],
   summary:"連合の言うこと以外聞かない「耳なし法一」。U-20日本代表監督（原作の名は法一保守。アニメで改名、第1期は出番カット）。",
   detail:[], battles:["b_u20"], rel:[{to:"buratsuta",label:"手を組む"},{to:"f_u20",label:"監督"}]},

  /* ══════════ 世界 ══════════ */
  {id:"noa", name:"ノエル・ノア", yomi:"のえる のあ", kind:"person",
   state:"世界", crew:"—", group:"FW", role:"世界一のストライカー", klass:"世界のトップ",
   origin:"フランスのスラム街", fruit:"完全な両利き", ftype:"シュート", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"—",
   tags:["潔の憧れ","バスタード・ミュンヘン"],
   summary:"名実ともに世界一のストライカー。潔が憧れる選手で、絵心の元チームメイト。アニメでは映像・名前での登場が中心。",
   detail:[], battles:[], rel:[{to:"isagi",label:"憧れ"},{to:"ego",label:"元チームメイト"}]},

  {id:"loki", name:"ジュリアン・ロキ", yomi:"じゅりあん ろき", kind:"person",
   state:"世界", crew:"世界選抜", group:"FW", role:"世界選抜", klass:"世界選抜",
   origin:"フランス", fruit:"神速のスピード", ftype:"スピード", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"勝利",
   tags:["神速神童","17歳でフランス代表"],
   summary:"17歳でフランス代表入りした天才。世界選抜戦で凄まじい速度のドリブルを見せ、潔たちを圧倒した。",
   detail:[], battles:["b_world1","b_world2"], rel:[{to:"f_world5",label:"所属"}]},

  {id:"luna", name:"レオナルド・ルナ", yomi:"れおなるど るな", kind:"person",
   state:"世界", crew:"世界選抜", group:"FW", role:"世界選抜", klass:"世界選抜",
   origin:"スペイン", fruit:"ドリブルと器用さ", ftype:"テクニック", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"勝利",
   tags:["レ・アールの貴公子"],
   summary:"「レ・アールの貴公子」。冴の弟である凛に興味を持ち、1on1であっさり抜き去って決めた。",
   detail:[], battles:["b_world1","b_world2"], rel:[{to:"rin",label:"1on1で圧倒"},{to:"f_world5",label:"所属"}]},

  {id:"cavasoz", name:"パブロ・カバソス", yomi:"ぱぶろ かばそす", kind:"person",
   state:"世界", crew:"世界選抜", group:"FW", role:"世界選抜", klass:"世界選抜",
   origin:"アルゼンチン", fruit:"速い振りと高いパス精度", ftype:"テクニック", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"勝利",
   tags:["そばかすベイビー"], summary:"自分が一番可愛いと思っている童顔のアルゼンチン代表。",
   detail:[], battles:["b_world1","b_world2"], rel:[{to:"f_world5",label:"所属"}]},

  {id:"blake", name:"アダム・ブレイク", yomi:"あだむ ぶれいく", kind:"person",
   state:"世界", crew:"世界選抜", group:"FW", role:"世界選抜", klass:"世界選抜",
   origin:"イングランド", fruit:"ブレない体幹", ftype:"フィジカル", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"勝利",
   tags:["ゲットゴールジャンキー"], summary:"イングランド代表。女好きで、着物姿の日本女性に興味がある。",
   detail:[], battles:["b_world1","b_world2"], rel:[{to:"f_world5",label:"所属"}]},

  {id:"silva", name:"ダダ・シウバ", yomi:"だだ しうば", kind:"person",
   state:"世界", crew:"世界選抜", group:"FW", role:"世界選抜", klass:"世界選抜",
   origin:"ブラジルのスラム街", fruit:"高いジャンプ力", ftype:"フィジカル", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"勝利",
   tags:["重戦車"], summary:"「重戦車」の異名を持つブラジル代表。",
   detail:[], battles:["b_world1","b_world2"], rel:[{to:"f_world5",label:"所属"}]},

  /* ══════════ 家族ほか ══════════ */
  {id:"isagi_pa", name:"潔 一生・伊世", yomi:"いさぎ いっせい いよ", kind:"person",
   state:"家族・学校", crew:"—", group:"—", role:"世一の両親", klass:"家族",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"—",
   tags:["とんかつ"], summary:"サッカーはよく分からないが世一の夢を全力で応援するのんびりした両親。県大会決勝の夜にとんかつで験を担いでしまう。",
   detail:[], battles:[], rel:[{to:"isagi",label:"息子"},{to:"bachira_yu",label:"U-20戦の観客席で挨拶"}]},

  {id:"bachira_yu", name:"蜂楽 優", yomi:"ばちら ゆう", kind:"person",
   state:"家族・学校", crew:"—", group:"—", role:"廻の母", klass:"家族",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑨ U-20戦 前半", first:"第2期", status:"—",
   tags:["芸術家"], summary:"著名な芸術家で、廻からは「優」と名前で呼ばれる。U-20戦のハーフタイムには客席から息子に声を飛ばした。",
   detail:[], battles:[], rel:[{to:"bachira",label:"息子"}]},

  {id:"tada", name:"多田 友也", yomi:"ただ ともなり", kind:"person",
   state:"家族・学校", crew:"—", group:"—", role:"潔の高校の同僚", klass:"学校",
   origin:"一難高校", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"—",
   tags:["県大会決勝"], summary:"県大会決勝で潔からのパスを受け、フリーで外したチームメイト。潔の後悔の起点になった場面の当事者。",
   detail:[], battles:[], rel:[{to:"isagi",label:"パスを外した"}]},

  /* ══════════ 試合（battle） ══════════ */
  {id:"b_onigokko", name:"入寮テスト「オニごっこ」", yomi:"にゅうりょうてすと おにごっこ", kind:"battle",
   state:"運営・連合", crew:"—", group:"—", role:"吉良が脱落", klass:"選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"終了",
   tags:["136秒","12人中1人脱落"],
   summary:"12人がPAと同じ広さの部屋で136秒間ボールを当て合い、最後に当てられた1人が失格。潔が吉良に当てて生き残った。",
   detail:[{h:"ルール", body:"300人を25部屋12人ずつに分け、制限時間136秒。最後に当てられていた者が失格し、残り11人がそのままチームになる。合計275人が通過。"},
           {h:"意味", body:"逃げ続ける者ではなく、格上を狙いにいく者が生き残る。ランクの高い吉良が狙われて落ちたのは、この選考の性格をそのまま表している。"}],
   battles:[], rel:[{to:"f_bluelock",label:"選考"}]},

  {id:"b_zx", name:"チームZ vs チームX", yomi:"ちーむぜっと えっくす", kind:"battle",
   state:"チームZ", crew:"—", group:"—", role:"1-5 チームXの勝利", klass:"一次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"② 一次選考 X・Y戦", first:"第3話", status:"敗北",
   tags:["得点王復活枠","馬狼"],
   summary:"一次選考初戦。得点王の復活枠をめぐって敵味方なくボールを奪い合う混戦を、馬狼一人が制した。",
   detail:[{h:"教訓", body:"潔は「ゴールの匂い」を初めて嗅ぎ、絵心に「武器を持て」と言われる。チームZの面々が自分の武器を言語化し始めるきっかけの試合。"}],
   battles:[], rel:[{to:"f_teamz",label:"敗北"},{to:"f_teamx",label:"勝利"}]},

  {id:"b_zy", name:"チームZ vs チームY", yomi:"ちーむぜっと わい", kind:"battle",
   state:"チームZ", crew:"—", group:"—", role:"2-1 チームZの勝利", klass:"一次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"② 一次選考 X・Y戦", first:"第4話", status:"勝利",
   tags:["読み合い","一撃必殺カウンター"],
   summary:"フィールドを俯瞰する潔と二子の読み合い。最後の1分、二子の一撃必殺カウンターを越えて潔が決勝点。",
   detail:[], battles:[], rel:[{to:"f_teamz",label:"勝利"},{to:"f_teamy",label:"敗北"}]},

  {id:"b_zw", name:"チームZ vs チームW", yomi:"ちーむぜっと だぶりゅー", kind:"battle",
   state:"チームZ", crew:"—", group:"—", role:"4-4 引き分け", klass:"一次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"③ 一次選考 W戦", first:"第6話", status:"引き分け",
   tags:["久遠の裏切り","12対10","千切覚醒"],
   summary:"久遠の内通で作戦も武器も筒抜け、12対10の数的不利。3-4から千切が封印した脚で同点に追いついた。",
   detail:[], battles:[], rel:[{to:"f_teamz",label:"引き分け"},{to:"f_teamw",label:"引き分け"}]},

  {id:"b_zv", name:"チームZ vs チームV", yomi:"ちーむぜっと ぶい", kind:"battle",
   state:"チームZ", crew:"—", group:"—", role:"5-4 チームZの勝利", klass:"一次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"④ 一次選考 V戦", first:"第8話", status:"勝利",
   tags:["勝つしかない","凪の覚醒","最後の欠片"],
   summary:"引き分けでも敗退の最終戦。凪・玲王・斬鉄に圧倒されながら、全員の覚醒の連鎖で5-4の逆転勝ち。チームZは2位通過。",
   detail:[{h:"最後の欠片", body:"終盤、久遠がレッドカード覚悟で凪を止め、潔は自分の進化に必要な「最後の欠片」を見つけて決勝点。凪にとっては人生初の敗北になった。"}],
   battles:[], rel:[{to:"f_teamz",label:"勝利"},{to:"f_teamv",label:"敗北"}]},

  {id:"b_s3_top3", name:"潔・蜂楽・凪 vs TOP3", yomi:"とっぷすりー", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"2-5 TOP3の勝利（蜂楽を指名）", klass:"二次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑤ 二次選考 1st〜3rd", first:"第13話", status:"敗北",
   tags:["3rdステージ","凛の一撃"],
   summary:"二次選考3rdステージ。先制して手応えを得た直後、凛のシュート一本で場の空気が変わり、TOP3との差を思い知らされた。",
   detail:[], battles:[], rel:[{to:"f_top3",label:"勝利"},{to:"isagi",label:"敗北"}]},

  {id:"b_s2_baro", name:"潔・凪 vs 馬狼・成早", yomi:"ばろう なるはや", kind:"battle",
   state:"チームZ", crew:"—", group:"—", role:"5-4 潔・凪の勝利（馬狼を指名）", klass:"二次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑤ 二次選考 1st〜3rd", first:"第14話", status:"勝利",
   tags:["2ndステージ","負けたら失格","喰"],
   summary:"負ければ失格の2対2。成早の裏抜けに翻弄された潔が、その動きを「喰って」自分の武器にした。",
   detail:[], battles:[], rel:[{to:"isagi",label:"勝利"},{to:"naruhaya",label:"脱落"}]},

  {id:"b_s3_reo", name:"潔・凪・馬狼 vs 玲王・千切・國神", yomi:"れお ちぎり くにがみ", kind:"battle",
   state:"チームZ", crew:"—", group:"—", role:"5-4 潔チームの勝利（千切を指名）", klass:"二次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑤ 二次選考 1st〜3rd", first:"第16話", status:"勝利",
   tags:["三者融合","主役の座","馬狼の挫折"],
   summary:"連携できない潔チームが、試合中に進化して競り勝つ。主役の座を奪われた馬狼が膝をつき、悪役として再生した。",
   detail:[], battles:[], rel:[{to:"isagi",label:"勝利"},{to:"reo",label:"敗北"}]},

  {id:"b_s4_top3", name:"潔・凪・馬狼・千切 vs TOP3＋蜂楽", yomi:"とっぷすりー さいせん", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"4-5 凛チームの勝利（潔を指名）", klass:"二次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑥ 二次選考 4th", first:"第20話", status:"敗北",
   tags:["再戦","超連動","蜂楽の覚醒","LUCK"],
   summary:"TOP3への雪辱戦。潔と凪の超連動、凛の支配、蜂楽の覚醒がぶつかり、最後は浮いたボールが凛に落ちて決着。凛は潔を指名した。",
   detail:[], battles:[], rel:[{to:"f_top3",label:"勝利"},{to:"isagi",label:"引き抜かれる"}]},

  {id:"b_kunigami_shido", name:"國神 vs 士道（2ndステージ）", yomi:"くにがみ しどう", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"士道の勝利・國神脱落", klass:"二次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"—", status:"終了",
   tags:["敗者復活戦"], summary:"暴れる士道を制した國神が、直後の2ndステージで士道に敗れて脱落。國神は敗者復活戦の扉をくぐった。",
   detail:[], battles:[], rel:[{to:"kunigami",label:"脱落"},{to:"shido",label:"勝利"}]},

  {id:"b_world1", name:"第1通過チーム vs 世界選抜", yomi:"せかいせんばつ", kind:"battle",
   state:"世界", crew:"—", group:"—", role:"1-5 世界選抜の勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"敗北",
   tags:["ワールドファイブ","査定"],
   summary:"凛・蟻生・時光・潔・蜂楽が世界の5人と対戦。潔・蜂楽・凛の連係で先制するが、あっという間に世界の速さと上手さに呑まれた。",
   detail:[{h:"位置づけ", body:"勝敗に関係なく、世界選抜による査定が目的。この結果が三次選考のランキングとチーム分けに使われる。"}],
   battles:[], rel:[{to:"f_world5",label:"勝利"},{to:"f_top3",label:"敗北"}]},

  {id:"b_world2", name:"第2通過チーム vs 世界選抜", yomi:"せかいせんばつ", kind:"battle",
   state:"世界", crew:"—", group:"—", role:"0-5 世界選抜の勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第24話", status:"敗北",
   tags:["凪","馬狼","千切","斬鉄","清羅"],
   summary:"凪・馬狼・千切・斬鉄・清羅の第2通過チームも完封負け。世界との距離が数字ではっきり示された。",
   detail:[], battles:[], rel:[{to:"f_world5",label:"勝利"},{to:"nagi",label:"敗北"}]},

  {id:"b_t_a1b1", name:"適性試験 A1 vs B1", yomi:"てきせいしけん", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"5-4 チームAの勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第26話", status:"勝利",
   tags:["殺し屋と忍者","凛と士道","潔の1点"],
   summary:"凛・士道＋潔・氷織・七星 vs 烏・乙夜＋千切・皿斑・志熊。凛と士道の暴走の間で、潔が自分の居場所と1点をこじ開けた。",
   detail:[], battles:[], rel:[{to:"rin",label:"固定選手A"},{to:"karasu",label:"固定選手B"},{to:"isagi",label:"A1"}]},

  {id:"b_t_a2c1", name:"適性試験 A2 vs C1", yomi:"てきせいしけん", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"5-3 チームAの勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第28話", status:"終了",
   tags:["カメレオン"], summary:"凛・士道＋五十嵐・蟻生・石狩 vs 雪宮・凪＋玲王・我牙丸・田中。玲王が「カメレオン」を見せた試合。",
   detail:[], battles:[], rel:[{to:"reo",label:"C1"},{to:"yukimiya",label:"固定選手C"}]},

  {id:"b_t_b2c2", name:"適性試験 B2 vs C2", yomi:"てきせいしけん", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"5-3 チームBの勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第28話", status:"終了",
   tags:[], summary:"烏・乙夜＋馬狼・二子・雷市 vs 雪宮・凪＋日不見・劈・鰐間。",
   detail:[], battles:[], rel:[{to:"barou",label:"B2"},{to:"karasu",label:"固定選手B"}]},

  {id:"b_t_a3b3", name:"適性試験 A3 vs B3", yomi:"てきせいしけん", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"5-2 チームAの勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第28話", status:"終了",
   tags:[], summary:"凛・士道＋蜂楽・灰地・西岡 vs 烏・乙夜＋柊・曽倉・柚。",
   detail:[], battles:[], rel:[{to:"bachira",label:"A3"},{to:"hiiragi",label:"B3"}]},

  {id:"b_t_a4c3", name:"適性試験 A4 vs C3", yomi:"てきせいしけん", kind:"battle",
   state:"他の棟", crew:"—", group:"—", role:"5-4 チームAの勝利", klass:"三次選考",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第28話", status:"終了",
   tags:["シード"], summary:"凛・士道＋清羅・黒名・時光 vs 雪宮・凪＋蜂楽（シード2試合目）・猿堂寺・斬鉄。",
   detail:[], battles:[], rel:[{to:"kiyora",label:"A4"},{to:"bachira",label:"C3（2試合目）"}]},

  {id:"b_u20", name:"青い監獄イレブン vs U-20日本代表", yomi:"ゆーにじゅう とくべつそうこうしあい", kind:"battle",
   state:"U-20日本代表", crew:"—", group:"—", role:"4-3 青い監獄の勝利", klass:"特別壮行試合",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑨ U-20戦 前半", first:"第29話", status:"勝利",
   tags:["存続を賭けた試合","冴","士道","決勝点は潔"],
   summary:"負ければ青い監獄解体の特別壮行試合。冴の先制から2-1、士道の2発で2-3、馬狼で3-3、潔の決勝点で4-3。",
   detail:[{h:"得点経過", body:"0-1 冴 → 1-1 凪 → 2-1 凛 → 2-2 士道（FK） → 2-3 士道 → 3-3 馬狼 → 4-3 潔。詳しくは詳解タブ。"}],
   battles:[], rel:[{to:"f_bl11",label:"勝利"},{to:"f_u20",label:"敗北"},{to:"f_bluelock",label:"存続"}]},

  /* ══════════ チーム・組織（faction） ══════════ */
  {id:"f_bluelock", name:"青い監獄（ブルーロック）", yomi:"ぶるーろっく", kind:"faction",
   state:"運営・連合", crew:"運営", group:"—", role:"育成施設", klass:"組織",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"存続",
   tags:["300人","伍号棟","ランキング"],
   summary:"W杯優勝のため、高校生FW300人から世界一のストライカー1人を作る施設。脱落者は日本代表入りの資格を永久に失う。",
   detail:[{h:"伍号棟のトリック", body:"壱〜伍号棟の5棟構成と説明されたが、実際は5つ全てが伍号棟。全員が自分は最下層にいると思い込まされ、どの棟にもチームV〜Zしかなかった。"},
           {h:"ランキング", body:"選手ごとに順位がつき、ユニフォームのワッペンで常に可視化される。二次選考では1stステージをクリアした順番がそのままランキングになった。"}],
   battles:[], rel:[{to:"f_jfu",label:"対立"}]},

  {id:"f_jfu", name:"日本フットボール連合", yomi:"にほんふっとぼーるれんごう", kind:"faction",
   state:"運営・連合", crew:"運営", group:"—", role:"JFU", klass:"組織",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"—",
   tags:["JFU"], summary:"サッカーを金儲けの手段と見る上層部が、予算を食い騒動を起こす青い監獄を忌み嫌う。U-20戦はその対立の決着の場。",
   detail:[], battles:[], rel:[{to:"f_u20",label:"管轄"}]},

  {id:"f_teamz", name:"チームZ", yomi:"ちーむぜっと", kind:"faction",
   state:"チームZ", crew:"—", group:"—", role:"伍号棟最弱の下馬評", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"① 入寮テスト", first:"第1話", status:"通過",
   tags:["2勝1敗1分"], summary:"潔の一次選考チーム。下馬評は伍号棟最弱だったが、2勝1敗1分けの2位で通過した。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"一次選考"}]},

  {id:"f_teamx", name:"チームX", yomi:"ちーむえっくす", kind:"faction",
   state:"チームX", crew:"—", group:"—", role:"馬狼のチーム", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"② 一次選考 X・Y戦", first:"第3話", status:"敗退",
   tags:[], summary:"馬狼を軸にしたチーム。チームZに大勝したが一次選考は敗退し、得点王の馬狼だけが復活枠で勝ち上がった。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"一次選考"}]},

  {id:"f_teamy", name:"チームY", yomi:"ちーむわい", kind:"faction",
   state:"チームY", crew:"—", group:"—", role:"二子のチーム", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"② 一次選考 X・Y戦", first:"第4話", status:"敗退",
   tags:[], summary:"二子が指揮するチーム。敗退し、得点王の二子が復活枠で勝ち上がった。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"一次選考"}]},

  {id:"f_teamw", name:"チームW", yomi:"ちーむだぶりゅー", kind:"faction",
   state:"チームW", crew:"—", group:"—", role:"鰐間兄弟のチーム", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"③ 一次選考 W戦", first:"第6話", status:"敗退",
   tags:[], summary:"鰐間兄弟のアイコンタクトが武器。敗退し、兄の淳壱が勝ち上がった。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"一次選考"}]},

  {id:"f_teamv", name:"チームV", yomi:"ちーむぶい", kind:"faction",
   state:"チームV", crew:"—", group:"—", role:"伍号棟最強", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"④ 一次選考 V戦", first:"第8話", status:"通過",
   tags:["凪・玲王・斬鉄"], summary:"凪・玲王・斬鉄のスーパートリオを擁する棟内最強チーム。チームZにだけ敗れた。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"一次選考"}]},

  {id:"f_hakuho", name:"白宝高校", yomi:"はくほうこうこう", kind:"faction",
   state:"チームV", crew:"—", group:"—", role:"凪と玲王の高校", klass:"学校",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑪ 劇場版 EPISODE 凪", first:"劇場版", status:"—",
   tags:["劇場版"], summary:"凪と玲王が通う高校。玲王がコネで作り上げたサッカー部で、全国常連の青森駄々田を破り絵心の目に留まった。",
   detail:[], battles:[], rel:[]},

  {id:"f_top3", name:"TOP3（凛・蟻生・時光）", yomi:"とっぷすりー", kind:"faction",
   state:"他の棟", crew:"—", group:"—", role:"二次選考ランク1〜3位", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑤ 二次選考 1st〜3rd", first:"第13話", status:"通過",
   tags:[], summary:"二次選考の新ランキング上位3人が組んだチーム。蜂楽と潔を順に引き抜き、第1通過チームになった。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"二次選考"}]},

  {id:"f_bl11", name:"青い監獄イレブン", yomi:"ぶるーろっくいれぶん", kind:"faction",
   state:"他の棟", crew:"青い監獄イレブン", group:"—", role:"U-20戦の青い監獄選抜", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第29話", status:"勝利",
   tags:["4-5-1","スタメン11人＋ベンチ12人"],
   summary:"適性試験で選ばれた11傑＋ベンチ。GK我牙丸、DF蟻生・二子・千切・蜂楽、MF烏・乙夜・雪宮・凪・潔、FW凛（主将）。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"代表"}]},

  {id:"f_u20", name:"U-20日本代表", yomi:"ゆーにじゅうにほんだいひょう", kind:"faction",
   state:"U-20日本代表", crew:"U-20日本代表", group:"—", role:"日本の現行U-20", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑧ 三次選考 適性試験", first:"第25話", status:"敗北",
   tags:["4-3-3","鉄壁の4バック"],
   summary:"主将・愛空の「最後の砦」を中心にした守備の代表チーム。糸師冴と士道を加えて青い監獄を迎え撃った。",
   detail:[], battles:[], rel:[]},

  {id:"f_world5", name:"世界選抜（ワールドファイブ）", yomi:"わーるどふぁいぶ", kind:"faction",
   state:"世界", crew:"世界選抜", group:"—", role:"三次選考の査定役", klass:"チーム",
   origin:"—", fruit:"—", ftype:"—", rank:null, rk:"—",
   epi:"⑦ 世界選抜戦", first:"第23話", status:"勝利",
   tags:["ロキ","ルナ","カバソス","ブレイク","シウバ"],
   summary:"絵心が高額で呼んだ世界のトップ5人。二次選考通過チームと5対5で戦い、査定を行った。",
   detail:[], battles:[], rel:[{to:"f_bluelock",label:"招聘"}]}
  ],

  /* ── あらすじ（章ごと）
     ep はアニメの通し話数（Wikipedia 各話リスト準拠：第2期は第25〜38話）。
     beats の見出しは原則アニメ公式サブタイトル。U-20戦（⑨⑩）だけは話数ごとの対応を
     確認しきれていないため、前半／後半の区分と内容見出しにしている。 ── */
  arcs: [
  {id:"a1", no:"01", name:"① 入寮テスト ── 300人と「オニごっこ」", ep:"アニメ 第1〜2話", vols:"第1期", chapters:"—",
   year:"—", sides:"300人の高校生FW", result:"275人が通過・吉良が脱落",
   rank:"299位（ほぼ最下位）", lead:"日本をW杯優勝に導くストライカーを1人作る。そのために300人の高校生FWが集められ、最初の選考でいきなり「格上を狙う者」と「逃げる者」が振り分けられる。",
   quote:{t:"勝負から逃げたお前の負けだ", by:"絵心甚八"},
   beats:[
     {ep:"第1話", h:"夢", body:"県大会決勝のゴール前、潔は監督の教え通りフリーの多田にパスを出し、外れて負けた。その夜に届いた招待状で集められた300人の前に絵心が現れ、「日本に足りないのはエゴだ」と宣言する。"},
     {ep:"第1話", h:"オニごっこ", body:"12人1部屋で136秒、最後にボールを当てられた者が失格。潔は蜂楽と組んで、部屋で最もランクの高い吉良を狙い、最後に当てて生き残った。"},
     {ep:"第2話", h:"かいぶつ", body:"脱落を告げられた吉良が抗議するが、絵心は切り捨てる。残った11人がチームZとして伍号棟に入り、上位5人はU-20W杯のFW登録、脱落者は日本代表資格を永久に失うというルールが明かされる。"}
   ],
   points:["青い監獄の原理は最初から一貫している：協調ではなく「自分のゴール」を取りに行く者だけが残る。","吉良の脱落は、ランクの高さがそのまま「狙われる理由」になることを示す。","潔の出発点は「パスを出して負けた後悔」。以後の物語はこの問いへの答え直しになる。"],
   checks:[{q:"オニごっこで潔たちが吉良を狙った理由は？",a:"部屋で最もランクが高く、彼を落とすことが最大のジャイアントキリングになるから。"},
           {q:"青い監獄で脱落した者が失うものは？",a:"日本代表に入る資格（永久）。"}],
   keys:["isagi","bachira","kira","ego","anri","tada"], battles:["b_onigokko"], newcomers:["isagi","bachira","kira","ego","anri","kunigami","chigiri"], deaths:["kira"]},

  {id:"a2", no:"02", name:"② 一次選考 ── チームX・チームY戦", ep:"アニメ 第3〜5話", vols:"第1期", chapters:"—",
   year:"—", sides:"チームZ vs チームX／チームY", result:"X戦 1-5 敗北 → Y戦 2-1 勝利",
   rank:"武器を探す凡人", lead:"総当たり戦の始まり。馬狼に完敗したチームZは「武器を持て」と言われ、潔は自分だけが武器を言えないことに直面する。",
   quote:{t:"俺のゴールで勝ちたい", by:"潔世一"},
   beats:[
     {ep:"第3話", h:"サッカーの0", body:"同棟5チームの総当たりで上位2チームが勝ち抜け、敗退チームからも得点王1人だけは復活できる。この特例で敵味方なくボールを奪い合う混戦になり、馬狼が一人で試合を支配した。"},
     {ep:"第4話", h:"予感と直感", body:"惨敗を受けて全員が自分の武器を言語化する中、潔だけが答えられない。X戦で嗅いだ「ゴールの匂い」を手がかりにチームY戦へ。國神の「なぜ俺にパスを出した」という問いが効いてくる。"},
     {ep:"第5話", h:"生まれ変わるのは", body:"チームYの司令塔・二子と俯瞰同士の読み合い。最後の1分の一撃必殺カウンターを越え、潔が決勝点。潔の武器が「空間認識」だと形になる。"}
   ],
   points:["得点王の復活枠は、チームの勝利と個人のゴールを意図的に対立させる仕掛け。","潔の武器は技術ではなく「どこにボールが来るかを読む目」として見出される。","二子は潔の鏡像。同じ能力を持つ者同士の対決として描かれる。"],
   checks:[{q:"一次選考で、敗退チームから勝ち上がれるのは誰？",a:"各チームの得点王1人（合計3人）。"},
           {q:"潔が自分の武器に気づく手がかりになった國神の問いは？",a:"「なぜ雷市ではなく自分にアシストを出したのか」。"}],
   keys:["isagi","barou","niko","kunigami","chigiri"], battles:["b_zx","b_zy"], newcomers:["barou","niko","meiji","morinaga"], deaths:[]},

  {id:"a3", no:"03", name:"③ 一次選考 ── チームW戦と久遠の裏切り", ep:"アニメ 第6〜7話", vols:"第1期", chapters:"—",
   year:"—", sides:"チームZ vs チームW", result:"4-4 引き分け",
   rank:"チームの中心", lead:"潔が中心になった矢先、仲間の一人が作戦を敵に売っていた。数的不利の中で、怪我に縛られていた千切が脚を解き放つ。",
   quote:{t:"ごめん", by:"第6話サブタイトル"},
   beats:[
     {ep:"第6話", h:"ごめん", body:"鰐間兄弟のチームWと対戦。兄弟は千切の元チームメイトで、過去の大怪我を煽る。千切は「サッカーをやめる理由を探しに来た」と語る。久遠のプレーで先行するが、潔は違和感を覚える。"},
     {ep:"第7話", h:"滾り", body:"久遠がチームWに作戦と武器を流していたと判明。実質12対10の絶望的な状況でも潔は折れない。その熱に当てられた千切が封印していたスピードで駆け抜け、3-4から同点に追いつく。"}
   ],
   points:["久遠の裏切りは「自分だけ勝ち残る」というエゴの歪んだ形として描かれる。","千切の覚醒は「怪我が怖い」から「自分のゴールが欲しい」への優先順位の転換。","引き分けで、チームZは最終戦で勝つしかない状況に追い込まれる。"],
   checks:[{q:"久遠がチームWにしたことは？",a:"八百長を持ちかけ、チームZの作戦と武器を漏らした。"},
           {q:"千切が全力で走れなかった理由は？",a:"右膝前十字靭帯断裂の再発でスピードを失うのが怖かったから。"}],
   keys:["chigiri","kuon","wanima_j","wanima_k","raichi"], battles:["b_zw"], newcomers:["wanima_j","wanima_k"], deaths:[]},

  {id:"a4", no:"04", name:"④ 一次選考 ── チームV戦と凪の目覚め", ep:"アニメ 第8〜11話", vols:"第1期", chapters:"—",
   year:"—", sides:"チームZ vs チームV", result:"5-4 チームZの勝利・2位通過",
   rank:"ストライカー", lead:"引き分けでも敗退の最終戦。相手は棟内最強、凪・玲王・斬鉄のチームV。ここで潔は「最後の欠片」を手にし、凪は初めて負ける。",
   quote:{t:"最後の欠片（ピース）", by:"第11話サブタイトル"},
   beats:[
     {ep:"第8話", h:"成功の方程式", body:"勝つしかない最終戦に向け、潔は自分がゴールを決めるための「方程式」を探しに動く。チームVはサッカー歴半年で無敗の凪・玲王コンビを擁する。"},
     {ep:"第9話", h:"覚醒", body:"前半はチームVのスーパートリオに圧倒される。心が折れかけたとき、蜂楽のプレーが全員のエゴに火を点け、原石たちの覚醒が始まる。"},
     {ep:"第10話", h:"このままで", body:"同点に追いつき流れを掴むが、それが凪を「目覚め」させる。凪の常識外れのトラップとシュートに対し、潔も武器を使いこなして食らいつく。"},
     {ep:"第11話", h:"最後の欠片", body:"久遠がレッドカード覚悟で凪を止め、裏切りを清算する。最後のプレーで潔は進化に必要な最後の欠片を見つけ、決勝点。5-4でチームZが勝ち、2位通過。"}
   ],
   points:["チームZの勝因は戦術ではなく「覚醒の連鎖」。一人の目覚めが次の目覚めを呼ぶ。","凪にとって初の敗北であり、サッカーを面白いと思った最初の瞬間（劇場版の起点）。","久遠の改心と雷市の一発で、チームZの物語が一区切りつく。"],
   checks:[{q:"チームV戦が「勝つしかない」試合だった理由は？",a:"W戦の引き分けで勝点が足りず、引き分けでは2位以内に入れなかったから。"},
           {q:"凪がサッカーを始めたきっかけは？",a:"同じ白宝高校の玲王に才能を見込まれて誘われたから。"}],
   keys:["isagi","nagi","reo","zantetsu","bachira","kuon"], battles:["b_zv"], newcomers:["nagi","reo","zantetsu","hijikata","nemoto"], deaths:["meiji","okawa","wanima_k"]},

  {id:"a5", no:"05", name:"⑤ 二次選考 ── 奪敵決戦 1st〜3rd", ep:"アニメ 第12〜18話", vols:"第1期", chapters:"—",
   year:"—", sides:"3人1組の奪い合い", result:"潔は2nd→3rdを勝ち上がる",
   rank:"二次選考15位", lead:"勝ったチームが負けたチームから1人を奪う「奪敵決戦」。仲間を選ぶことと、仲間に選ばれないことの残酷さが同時に描かれる。",
   quote:{t:"天才と凡才", by:"第14話サブタイトル"},
   beats:[
     {ep:"第12話", h:"二次選考", body:"1stステージは世界トップGKのデータで作られたホログラムGK相手に100ゴール。クリアした順がそのまま新ランキングになり、潔は15位。"},
     {ep:"第13話", h:"TOP3", body:"潔・蜂楽・凪で3rdステージへ。新ランク1〜3位の凛・蟻生・時光と対戦し、先制したのも束の間、凛の一撃で空気が一変。2-5で敗れ、TOP3は蜂楽を奪っていった。"},
     {ep:"第14〜15話", h:"喰", body:"2ndステージへ落ちた潔・凪は、負ければ失格の2対2で馬狼・成早と対戦。成早の裏抜けを「喰って」自分のものにした潔が5-4で勝ち、馬狼を指名。成早は脱落した。"},
     {ep:"第16〜18話", h:"三者融合／ヘタクソ／主役の座", body:"玲王・千切・國神と3対3。噛み合わない潔チームが試合の中で進化し、潔と凪が連携の形を見つける。主役の座を奪われた馬狼は膝をつく。5-4で勝利、千切を指名。"}
   ],
   points:["「誰を奪うか」は相手の武器を自分の進化の材料にするという意味。潔は情けではなく必要で選ぶ。","凪が玲王ではなく潔と組んだことで、玲王の物語（置いていかれた天才の相棒）が始まる。","潔の武器は「喰う」へ発展する。相手の動きを取り込み、自分のゴールの方程式を更新し続ける。"],
   checks:[{q:"二次選考のランキングは何で決まった？",a:"1stステージ（ホログラムGK相手に100ゴール）をクリアした順番。"},
           {q:"2ndステージで負けて指名されなかった者はどうなる？",a:"失格（脱落）。ただし敗者復活戦に挑む選択肢もある。"}],
   keys:["isagi","nagi","rin","aryu","tokimitsu","barou","naruhaya","reo","chigiri","kunigami"], battles:["b_s3_top3","b_s2_baro","b_s3_reo"], newcomers:["rin","aryu","tokimitsu"], deaths:["naruhaya","kuon","iemon","imamura"]},

  {id:"a6", no:"06", name:"⑥ 二次選考 ── 4thステージ・TOP3との再戦", ep:"アニメ 第19〜23話", vols:"第1期", chapters:"—",
   year:"—", sides:"潔・凪・馬狼・千切 vs 凛・蟻生・時光・蜂楽", result:"4-5 凛チームの勝利・凛が潔を指名",
   rank:"凛に指名される", lead:"蜂楽を奪っていったTOP3への雪辱戦。4対4の中で潔と凛、二つの「支配」がぶつかり、蜂楽は自分の中のかいぶつと別れる。",
   quote:{t:"お前は、誰かを探してるサッカーをしてる", by:"糸師凛（蜂楽へ）"},
   beats:[
     {ep:"第19話", h:"Dancing Boy", body:"勝った潔チームは千切を加えて4人に。一方、TOP3と練習する蜂楽は、凛に内なる「かいぶつ」を見抜かれ、自分のエゴと向き合わされる。"},
     {ep:"第20話", h:"超連動", body:"4対4の再戦。凛たちの個の力に食らいつく中、蜂楽からの一本のパスが試合を進化させ始める。"},
     {ep:"第21話", h:"俺がいない", body:"潔はフィールドの未来を見て、凪が空間を支配する。この連動が凛に火を点け、凛は選手・ボール・戦術すべてを掌握するプレーで再び押し返す。"},
     {ep:"第22話", h:"声", body:"馬狼がジョーカーとなりシーソーゲームに。蜂楽は自分が潔と凛に置いていかれていると気づく。"},
     {ep:"第23話", h:"LUCK", body:"蜂楽が理想としてのかいぶつを振り切り、自分のゴールのためにプレーする。潔は必死のカットに成功するが、浮いたボールは凛の足元に落ちた。5-4で凛チームの勝利。"}
   ],
   points:["蜂楽の覚醒は「誰かと一緒にいたい」から「自分がゴールしたい」への転換。","凛は勝者として潔を指名。宿敵が同じチームになるという構図がここで生まれる。","最後のボールが凛に落ちたことをタイトルは「LUCK」と呼ぶ。実力と運の境目もまたエゴの問題として描かれる。"],
   checks:[{q:"凛が蜂楽のプレーを評した言葉は？",a:"「誰かを探してるサッカー」。"},
           {q:"4thステージの勝者が指名したのは？",a:"凛チームが潔を指名した。"}],
   keys:["isagi","rin","bachira","nagi","barou","chigiri","aryu","tokimitsu"], battles:["b_s4_top3"], newcomers:[], deaths:[]},

  {id:"a7", no:"07", name:"⑦ 世界選抜戦 ── 世界との距離", ep:"アニメ 第23〜24話", vols:"第1期", chapters:"原作 第90〜93話",
   year:"—", sides:"二次選考通過チーム vs 世界選抜5人", result:"第1通過 1-5／第2通過 0-5",
   rank:"二次選考通過", lead:"二次選考を抜けた5人チームが、絵心の呼んだ世界のトップ5人と戦う。勝敗は問わない。測られるのは今の自分が世界でどこにいるか。",
   quote:{t:"時は来たり", by:"第24話サブタイトル"},
   beats:[
     {ep:"第24話", h:"時は来たり", body:"凛に選ばれた潔は蜂楽とともに第1通過。世界選抜（ロキ・ルナ・カバソス・ブレイク・シウバ）との5対5で、潔・蜂楽・凛の連係で先制するが、たちまち圧倒されて1-5。第2通過の凪・馬狼・千切・斬鉄・清羅も0-5で完封された。"},
     {ep:"第24話", h:"新しい段階へ", body:"この査定を経て、青い監獄計画は次の段階へ入る。並行して、二次選考の別の場所では國神が士道に敗れ、敗者復活戦へ向かっていた。"}
   ],
   points:["世界選抜戦は勝敗ではなく査定。結果が三次選考のランキングとチーム分けになる。","世界とのスコア差（1-5、0-5）が、次の選考で何が足りないかの基準になる。"],
   checks:[{q:"世界選抜戦の目的は？",a:"勝敗に関係なく、世界選抜チームによる選手の査定。"},
           {q:"第2通過チームのメンバーは？",a:"凪・馬狼・千切・斬鉄・清羅。"}],
   keys:["isagi","rin","bachira","loki","luna","nagi","kunigami","shido"], battles:["b_world1","b_world2","b_kunigami_shido"], newcomers:["loki","luna","cavasoz","blake","silva","karasu","otoya","shido","yukimiya","hiori"], deaths:["kunigami"]},

  {id:"a8", no:"08", name:"⑧ 三次選考 ── 適性試験（トライアウト）", ep:"アニメ 第25〜29話", vols:"第2期", chapters:"原作 第94〜111話",
   year:"—", sides:"固定選手6人×3チーム＋29人", result:"青い監獄イレブンとベンチが決定",
   rank:"A1（凛・士道チーム）", lead:"連合が青い監獄の打ち切りを狙う中、絵心はU-20日本代表との「存続を賭けた試合」を受ける。メンバーを決めるのが、上位6人を固定した5対5の適性試験。",
   quote:{t:"感じる世界", by:"第27話サブタイトル"},
   beats:[
     {ep:"第25話", h:"適性試験", body:"世界選抜戦後の査定で上位6人（凛・士道／烏・乙夜／雪宮・凪）が各チームの固定選手に。残る29人は1試合だけどれかのチームに加わる。蜂楽は暫定7位のシードで2試合に出る。相手となるU-20日本代表の主将・愛空も姿を見せる。"},
     {ep:"第26話", h:"殺し屋と忍者", body:"潔は氷織・七星とA1に入り、凛・士道の下でプレー。相手は烏・乙夜に千切・皿斑・志熊を加えたB1。"},
     {ep:"第27〜28話", h:"感じる世界／カメレオン", body:"凛と士道という二つの暴力的な才能の間で、潔は自分の居場所を探り、A1は5-4で勝利。続く試合では玲王が相手の技をコピーする「カメレオン」を見せた。"},
     {ep:"第28〜29話", h:"イレブン決定", body:"適性試験の結果、青い監獄イレブンが決定。一方、冴はU-20参加の条件として青い監獄から一人を指名し、それが士道になる。"}
   ],
   points:["三次選考は「誰と組めば一番輝くか」を測る試験。単独の能力ではなく、他者との化学反応が査定される。","士道は青い監獄最強クラスの得点力を持ちながら、噛み合わなさでスタメンから外れ、敵側に回る。","氷織・七星との組み合わせは、潔が「我の強くない」相手とも組めることを示す。"],
   checks:[{q:"適性試験の固定選手6人は？",a:"凛・士道（A）、烏・乙夜（B）、雪宮・凪（C）。"},
           {q:"冴がU-20参加に付けた条件は？",a:"青い監獄から最低一人をU-20側に入れること。冴は士道を選んだ。"}],
   keys:["isagi","rin","shido","karasu","otoya","yukimiya","nagi","hiori","nanase","reo","sae","aiku"], battles:["b_t_a1b1","b_t_a2c1","b_t_b2c2","b_t_a3b3","b_t_a4c3"], newcomers:["aiku","nanase","kurona","haiji","houichi"], deaths:[]},

  {id:"a9", no:"09", name:"⑨ U-20日本代表戦 ── 前半", ep:"アニメ 第29〜33話", vols:"第2期", chapters:"原作 第112〜149話（試合全体）",
   year:"—", sides:"青い監獄イレブン vs U-20日本代表", result:"前半 2-1 青い監獄リード",
   rank:"トップ下（背番号11）", lead:"負ければ青い監獄は解体される特別壮行試合。U-20の鉄壁の4バックと糸師冴を前に、青い監獄は即興の連鎖で前半をリードして折り返す。",
   quote:{t:"警察と泥棒", by:"オリヴァ・愛空（潔へ）"},
   beats:[
     {ep:"前半", h:"警察と泥棒", body:"凛・潔・凪の三角形で前進し、超攻撃的な3-6-1へ可変する。だが蜂楽のクロスは愛空の頭に弾かれる。愛空は潔にDFとFWを「警察と泥棒」に例え、ゴールは盗ませないと宣言。"},
     {ep:"前半", h:"冴の先制", body:"冴が50m超のロングパスから攻撃を組み立て、閃堂のシュートを我牙丸が弾いたこぼれを角度のない位置から曲げて先制（0-1）。"},
     {ep:"前半", h:"即興の連鎖", body:"凛の即興から凪が常識外れのゴールで1-1。絵心は「指示を待たず自分で課題を解く者」を育てたと語る。続いて凛が潔と連動して勝ち越し、2-1。"},
     {ep:"前半〜HT", h:"リードを守る", body:"前半終了間際、冴の強烈なシュートを蟻生がリーチと執念で止め、リードを守る。ハーフタイム、愛空は士道の投入を冴に約束し、試合を降りかけた冴を引き留める。"}
   ],
   points:["前半の青い監獄は「指示ではなく即興」で点を取る。絵心が育てたものが試合で可視化される。","U-20の強みは守備（愛空・仁王・音留・蛇来の4バック）。攻撃は冴一人に依存している。","愛空の「士道抜きで戦う」賭けは、前半で自分たちの非力さを確かめるためのもの。"],
   checks:[{q:"前半の得点者を順に挙げると？",a:"冴（0-1）→ 凪（1-1）→ 凛（2-1）。"},
           {q:"愛空が潔に例えたDFとFWの関係は？",a:"「警察と泥棒」。"}],
   keys:["isagi","rin","nagi","sae","aiku","sendo","gagamaru","aryu","fukaku"], battles:["b_u20"], newcomers:["sendo","nio","darai","neru","hayate","wakatsuki","cho","kitsunezato","fukaku","bachira_yu"], deaths:[]},

  {id:"a10", no:"10", name:"⑩ U-20日本代表戦 ── 後半と決着", ep:"アニメ 第34〜38話", vols:"第2期", chapters:"原作 第112〜149話（試合全体）",
   year:"—", sides:"青い監獄イレブン vs U-20日本代表（＋士道）", result:"4-3 青い監獄の勝利・存続決定",
   rank:"決勝点", lead:"後半、士道の投入で試合は一変する。2-3と逆転された青い監獄は交代と覚醒の連鎖で追いつき、最後は潔が決める。",
   quote:{t:"青い監獄はもう既に勝ってる", by:"絵心甚八"},
   beats:[
     {ep:"後半", h:"士道の投入と交代", body:"二子が決死のブロックで士道を止めるが足首を負傷。閃堂が囮となって二子へのファウルとFKを奪い、士道が決めて2-2。脚をつった千切に代えて氷織、二子に代えて玲王が投入される。"},
     {ep:"後半", h:"フロー", body:"冴の導きで士道がこの試合最初のフロー状態に入り、2-3と逆転。絵心は「士道もまた青い監獄の産物だ」と動じない。"},
     {ep:"後半", h:"王の帰還", body:"投入された馬狼が、潔を狩ると見せて凛を狩り、3-3の同点弾。愛空は青い監獄を「日本サッカーに咲こうともがく新しい花の芽」と感じながら、最後の砦として立ちはだかる。"},
     {ep:"終盤", h:"最後の砦", body:"閃堂が蜂楽のシュートを体で死守し、そのこぼれから愛空・冴を起点にU-20が攻め上がる。愛空自ら前線へ走るが、凛のスライディングに阻まれる。チームが自分を一人にしてくれないと悟った凛は、兄を超えるために自分自身を壊しにいく。"},
     {ep:"第38話", h:"終撃", body:"アディショナルタイム、冴と凛の兄弟の1対1。凛が冴からボールを蹴り出し、愛空の届かない高さで落ちたボールを潔がダイレクトで沈めて4-3。青い監獄の存続が決まり、物語は次の選考へ続く。"}
   ],
   points:["後半の主役は士道と冴。U-20を強くしたのが青い監獄出身の士道だという皮肉が、絵心の「もう勝ってる」の意味。","交代の連鎖（氷織・玲王・馬狼）が流れを取り戻す。ベンチメンバーの化学反応も青い監獄の成果。","潔の決勝点は第1話の後悔（パスを出して負けた）への最終的な答えになる。"],
   checks:[{q:"後半の得点を順に挙げると？",a:"士道（2-2・FK）→ 士道（2-3）→ 馬狼（3-3）→ 潔（4-3）。"},
           {q:"後半に投入された青い監獄の選手3人は？",a:"氷織（千切と交代）、玲王（二子と交代）、馬狼（乙夜と交代）。"}],
   keys:["isagi","shido","sae","barou","hiori","reo","niko","sendo","aiku","ego"], battles:["b_u20"], newcomers:[], deaths:[]},

  {id:"a11", no:"11", name:"⑪ 劇場版 EPISODE 凪 ── 凪の視点で辿り直す", ep:"劇場版（2024年4月19日公開・91分）", vols:"劇場アニメ", chapters:"スピンオフ『ブルーロック -EPISODE 凪-』",
   year:"—", sides:"凪・玲王を軸に", result:"興行収入 18.1億円",
   rank:"（脇役として登場）", lead:"本編の出来事を、めんどくさがりの天才・凪の側から描き直したスピンオフの劇場版。玲王との出会いから、青い監獄での敗北と別れまで。",
   quote:{t:"めんどくさい", by:"凪誠士郎（口癖）"},
   beats:[
     {ep:"—", h:"白宝高校", body:"御曹司の玲王が凪の才能を見出し、サッカーに誘う。サッカー歴半年で全国常連の青森駄々田（主将・舐岡）を破り、二人は青い監獄へ招待される。"},
     {ep:"—", h:"チームV", body:"凪・玲王・斬鉄のトリオで一次選考を勝ち進む。チームZに敗れたことで、凪はサッカーの面白さと悔しさを初めて知る。"},
     {ep:"—", h:"選んだ道", body:"二次選考で凪は玲王ではなく潔と組む道を選ぶ。凪の視点からは、それが「もっと面白いサッカー」を求めた結果として描かれ、玲王との関係の重さが本編より前に出る。"}
   ],
   points:["本編では脇の出来事だった凪・玲王の関係が主題になる。","チームVの試合（W戦・X戦・Y戦など）は本編で描かれなかった部分を補う。"],
   checks:[{q:"劇場版で凪と玲王が高校時代に破った強豪は？",a:"青森駄々田高校（主将・舐岡了）。"}],
   keys:["nagi","reo","zantetsu","nameoka","isagi"], battles:[], newcomers:["nameoka"], deaths:[]}
  ]
};

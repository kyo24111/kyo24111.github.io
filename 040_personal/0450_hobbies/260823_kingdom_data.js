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
    range: "原作 1〜80巻台（全面戦争編まで）／⚠ ネタバレあり",
    note: "⚠ 2026-08-24更新でネタバレ制限を解除。黒羊丘以降（鄴・宜安/肥下・番吾・韓攻略）の展開と、存命キャラの最期まで含みます。巻数・話数は目安です。",
    updated: "2026-08-24"
  },

  /* 顔画像: kingdom_faces/<node id>.jpg があるノードの一覧。
     出典は Fandom Wiki のキャラクター記事（アニメ立ち絵／原作コマ）。著作権は原泰久／集英社および
     各アニメ製作委員会に帰属。ページ側にクレジットを記載し、noindex で公開している。
     画像が無い環境では頭文字アバターに自動フォールバックする。 */
  faces: {
    dir: "kingdom_faces/",
    ids: ["akakin", "akou", "bajio", "bakukoshin", "banaji", "bankyoku", "banyou", "chougaryuu",
      "chousou", "choutou", "chuutetsu", "denei", "denrimi", "denyuu", "en", "futei",
      "fuuki", "gaimou", "gakurai", "garo", "genpou", "gohoumei", "gokei", "gyouun",
      "hairou", "heki", "houken", "hyou", "hyoukou", "kaine", "kaishibou", "kan'ou",
      "kanki", "kanmei", "kanto", "keisha", "ketsushi", "kisui", "kochou", "kokuou",
      "kyogai", "kyou", "kyouen", "kyoukai", "kyoushou", "kyuugen", "makou", "maron",
      "moubu", "mougou", "mouten", "naki", "obei", "obito", "ogiko", "orudo",
      "ouhon", "ouki", "ousen", "raido", "rakushou", "rankai", "renpa", "riboku",
      "rinbukun", "ringyoku", "rinko", "risi", "rokuomi", "ryofui", "ryusen", "ryuyuu",
      "saitaku", "saji", "sei", "seikai", "seikyou", "shibashou", "shiishi", "shika",
      "shin", "shoubunkun", "shouheikun", "shousa", "shunmen", "shunshinkun", "shunsuiju", "soou",
      "sosui", "suugen", "tajifu", "takuke", "tenn", "tou", "youtanwa", "yuren",
      "zenou"]
  },

  /* 人物プロフィール（node id → 詳細）
     出典: キングダム Fandom Wiki の各記事インフォボックス＋公式ガイドブックの能力値
     （str=武力 / ldr=指揮力 / int=知力 / exp=経験 / Charisma=魅力）、CVはアニメ公式サイト優先。
     stats の "＋" は公式表記の伸びしろ記号。src は参照した記事タイトル。 */
  profiles: {
    "shin": {cv:"森田成一", epithet:"天下の大将軍を目指す男", gender:"男", age:"29歳", rank:"将軍", cls:"武将", debutManga:"原作 第1話", debutAnime:"アニメ 第1期 第1話", stats:{bu:93, buP:"＋", shiki:88, chi:76, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Li Xin"},
    "hyou": {cv:"福山 潤", gender:"男", age:"15歳", debutManga:"原作 第1話", debutAnime:"アニメ 第1期 第1話", stats:{bu:78, shiki:75, chi:80, kei:"E"}, statsSrc:"公式ガイドブック3", src:"Li Piao"},
    "sei": {cv:"福山 潤", gender:"男", age:"30歳", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第2話", debutAnime:"アニメ 第1期 第1話", stats:{bu:84, shiki:99, chi:94, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Ying Zheng"},
    "tenn": {cv:"釘宮理恵", gender:"女", age:"20代半ば", cls:"軍師 / 山の民 / 騎兵", debutManga:"原作 第2話", debutAnime:"アニメ 第1期 第1話", stats:{bu:63, shiki:90, chi:91, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ka Ryo Ten"},
    "kyoukai": {cv:"日笠陽子", epithet:"蚩尤の生き残り", gender:"女", age:"28歳", rank:"将軍", cls:"武将 / 騎兵 / 刺客", debutManga:"原作 第49話", debutAnime:"アニメ 第1期 第17話", stats:{bu:96, buP:"＋", shiki:86, chi:89, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kyou Kai"},
    "ouki": {cv:"小山力也", epithet:"秦の怪鳥", gender:"男", age:"50代後半", rank:"大将軍", cls:"部隊長 / 騎兵", arms:"矛", debutManga:"原作 第7話", debutAnime:"アニメ 第1期 第1話", stats:{bu:98, shiki:93, chi:95, kei:"S", miryoku:100}, statsSrc:"公式ガイドブック3", src:"Wang Yi"},
    "tou": {cv:"Akio Kato", epithet:"王騎の副官", gender:"男", age:"50代前半", rank:"大将軍", cls:"部隊長 / 騎兵 / 貴族", arms:"剣", debutManga:"原作 第35話", debutAnime:"アニメ 第1期 第1話", stats:{bu:96, shiki:95, chi:94, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Teng"},
    "kyou": {cv:"Ao Takahashi", epithet:"六大将軍唯一の女将軍", gender:"女", age:"20代後半", rank:"大将軍", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第24話", stats:{bu:94, shiki:97, chi:95, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kyou"},
    "shoubunkun": {cv:"中野 泰佳", gender:"男", cls:"部隊長 / 騎兵", arms:"朴刀 / 槍 / 剣", debutManga:"原作 第1話", debutAnime:"アニメ 第1期 第1話", stats:{bu:75, shiki:87, chi:92, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Lord Changwen"},
    "heki": {cv:"遊佐浩二", gender:"男", age:"30代半ば", rank:"将軍", cls:"部隊長 / 騎兵", arms:"矛 / 剣", debutManga:"原作 第13話", debutAnime:"アニメ 第1期 第7話", stats:{bu:83, shiki:86, chi:87, kei:"B"}, statsSrc:"公式ガイドブック3", src:"He Ki"},
    "shouheikun": {cv:"諏訪部順一", gender:"男", age:"40代半ば", rank:"軍総司令", cls:"部隊長", debutManga:"原作 第96話", debutAnime:"アニメ 第1期 第16話", stats:{bu:90, shiki:97, chi:99, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Shou Hei Kun"},
    "moubu": {cv:"楠 大典", epithet:"秦国最強の武", gender:"男", age:"40代半ば", rank:"大将軍", cls:"部隊長 / 騎兵", debutManga:"原作 第96話", debutAnime:"アニメ 第1期 第16話", stats:{bu:100, shiki:93, chi:87, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Mou Bu"},
    "mougou": {cv:"Itou Kazuaki", gender:"男", rank:"大将軍", cls:"部隊長 / 騎兵", arms:"矛", debutManga:"原作 第2話", debutAnime:"アニメ 第1期 第25話", stats:{bu:85, shiki:90, chi:91, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Mou Gou"},
    "mouten": {cv:"野島裕史", epithet:"楽華隊隊長", gender:"男", age:"31歳", rank:"将軍", cls:"軍師", arms:"剣", debutManga:"原作 第183話", debutAnime:"アニメ 第2期 第1話", stats:{bu:89, shiki:90, chi:92, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Mou Ten"},
    "ouhon": {cv:"細谷佳正", epithet:"玉鳳隊隊長", gender:"男", age:"31歳", rank:"将軍", cls:"武将 / 騎兵", debutManga:"原作 第180話", debutAnime:"アニメ 第2期 第4話", src:"Ou Hon"},
    "hyoukou": {cv:"斉藤志郎", epithet:"火の将軍", gender:"男", rank:"大将軍 / 公", cls:"部隊長 / 騎兵", arms:"矛 / 仮面", debutManga:"原作 第48話", debutAnime:"アニメ 第1期 第17話", stats:{bu:95, shiki:95, chi:70, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Duke Hyou"},
    "bakukoshin": {cv:"宇垣秀成", gender:"男", age:"40代", rank:"千人将", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第53話", stats:{bu:85, shiki:83, chi:81, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Baku Koshin"},
    "obei": {cv:"鳥海浩輔", gender:"男", age:"30代前半", rank:"三百人将", cls:"伍長 / 歩兵", debutManga:"原作 第49話", debutAnime:"アニメ 第1期 第17話", stats:{bu:73, shiki:71, chi:70, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Bi Hei"},
    "obito": {cv:"高塚正也", gender:"男", age:"20代半ば", rank:"伍長", cls:"伍長 / 歩兵", arms:"剣", debutManga:"原作 第49話", debutAnime:"アニメ 第1期 第17話", src:"Bi Tou"},
    "takuke": {cv:"Haruo Sato", gender:"男", age:"40代後半", rank:"三百人将", cls:"伍長 / 歩兵", arms:"剣", debutManga:"原作 第49話", debutAnime:"アニメ 第1期 第17話", src:"Taku Kei"},
    "hairou": {cv:"Tsuyoshi Koyama", gender:"男", age:"50代前半", rank:"二千人将", cls:"隊長 / 騎兵", arms:"矛 / 剣", debutManga:"原作 第51話", debutAnime:"アニメ 第1期 第17話", stats:{bu:80, shiki:81, chi:73, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Hai Rou"},
    "denyuu": {cv:"Kazuyoshi_Hayashi", gender:"男", age:"40代", rank:"二千人将", cls:"部隊長 / 騎兵", arms:"矛 / 槍", debutManga:"原作 第49話", debutAnime:"アニメ 第1期 第17話", stats:{bu:84, shiki:80, chi:70, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Den Yuu"},
    "kyogai": {cv:"Shō Okumura", gender:"男", age:"30代", rank:"百人将", cls:"部隊長 / 騎兵", arms:"朴刀 / 槍", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第26話", stats:{bu:78, shiki:78, chi:72, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Kyo Gai"},
    "en": {cv:"赤城 進", gender:"男", rank:"五千人将", cls:"武将 / 騎兵", debutManga:"原作 第104話", debutAnime:"アニメ 第1期 第24話", stats:{bu:78, shiki:80, chi:80, kei:"B"}, statsSrc:"公式ガイドブック3", src:"En"},
    "youtanwa": {cv:"園崎未恵", epithet:"山界の死王", gender:"女", rank:"大将軍", cls:"部隊長", arms:"双剣", debutManga:"原作 第20話", debutAnime:"アニメ 第1期 第7話", stats:{bu:95, shiki:100, chi:96, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Yo Tan Wa"},
    "bajio": {cv:"新垣樽助", gender:"男", cls:"隊長 / 山の民 / 騎兵", arms:"双剣", debutManga:"原作 第17話", debutAnime:"アニメ 第1期 第7話", stats:{bu:93, buP:"＋", shiki:83, chi:75, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Bajio"},
    "tajifu": {cv:"高橋広樹", gender:"男", age:"30代", rank:"隊長", cls:"山の民 / 騎兵", arms:"鉄槌", debutManga:"原作 第18話", debutAnime:"アニメ 第1期 第7話", stats:{bu:88, shiki:82, chi:71, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Tajifu"},
    "shunmen": {cv:"Aoki Tsuyoshi", gender:"男", age:"30代", cls:"山の民", arms:"剣", debutManga:"原作 第28話", debutAnime:"アニメ 第1期 第7話", stats:{bu:90, shiki:73, chi:81, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Shunmen"},
    "seikyou": {cv:"宮田幸季", gender:"男", cls:"王族", arms:"剣", debutManga:"原作 第4話", debutAnime:"アニメ 第1期 第1話", stats:{bu:70, shiki:80, chi:86, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Cheng Jiao"},
    "ryofui": {cv:"玄田哲章", gender:"男", age:"50代", debutManga:"原作 第15話", debutAnime:"アニメ 第1期 第1話", stats:{bu:60, shiki:90, chi:91, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Ryo Fui"},
    "risi": {cv:"Aoki Tsuyoshi", gender:"男", age:"40代", arms:"筆と巻物", debutManga:"原作 第96話", debutAnime:"アニメ 第1期 第16話", stats:{bu:56, shiki:85, chi:94, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ri Shi"},
    "saitaku": {cv:"Senda Mitsuo", gender:"男", debutManga:"原作 第96話", debutAnime:"アニメ 第1期 第16話", stats:{bu:1, shiki:90, chi:92, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Sai Taku"},
    "rokuomi": {cv:"Tajiri Hiroaki", gender:"男", age:"40代前半", rank:"将軍", cls:"部隊長 / 騎兵 / 貴族", debutManga:"原作 第105話", debutAnime:"アニメ 第1期 第29話", stats:{bu:92, shiki:90, chi:82, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Roku O Mi"},
    "rankai": {cv:"高塚正也", gender:"男", debutManga:"原作 第4話", debutAnime:"アニメ 第1期 第1話", stats:{bu:99, shiki:5, chi:33, kei:"D"}, statsSrc:"公式ガイドブック3", src:"Ran Kai"},
    "saji": {gender:"男", cls:"刺客", arms:"剣", debutManga:"原作 第27話", debutAnime:"アニメ 第1期 第10話", stats:{bu:87, shiki:61, chi:62, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Sa Ji"},
    "ketsushi": {cv:"辻 親八", gender:"男", age:"50代", cls:"相国", debutManga:"原作 第4話", debutAnime:"アニメ 第1期 第1話", stats:{bu:50, shiki:65, chi:80, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Jie Shi"},
    "shiishi": {cv:"Takase Akimitsu", gender:"男", age:"40代", cls:"軍師", debutManga:"原作 第8話", debutAnime:"アニメ 第1期 第3話", stats:{bu:61, shiki:77, chi:91, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Si Shi"},
    "kyoushou": {gender:"女", age:"15歳", cls:"刺客", debutManga:"原作 第94話", debutAnime:"アニメ 第1期 第23話", stats:{bu:90, buP:"＋", shiki:80, chi:85, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Kyou Shou"},
    "yuren": {cv:"小山茉美", gender:"女", age:"20代半ば", cls:"刺客", debutManga:"原作 第94話", debutAnime:"アニメ 第1期 第23話", stats:{bu:95, buP:"＋", shiki:80, chi:83, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Yuu Ren"},
    "houken": {cv:"高塚正也", epithet:"武神", gender:"男", rank:"大将軍", cls:"武神 / 騎兵", arms:"矛", debutManga:"原作 第108話", debutAnime:"アニメ 第1期 第26話", stats:{bu:100, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Hou Ken"},
    "chousou": {cv:"津田健次郎", gender:"男", age:"30代", rank:"将軍", cls:"部隊長 / 軍師 / 騎兵", arms:"剣", debutManga:"原作 第115話", debutAnime:"アニメ 第1期 第26話", stats:{bu:65, shiki:87, chi:91, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Chou Sou"},
    "fuuki": {gender:"男", rank:"将軍", cls:"部隊長 / 軍師 / 騎兵", arms:"剣", debutManga:"原作 第118話", debutAnime:"アニメ 第1期 第27話", stats:{bu:70, shiki:88, chi:90, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Fuu Ki"},
    "bankyoku": {cv:"武藤 正史", gender:"男", age:"30代", rank:"将軍", cls:"部隊長 / 騎兵", arms:"鋸刃の剣", debutManga:"原作 第109話", debutAnime:"アニメ 第1期 第26話", stats:{bu:88, shiki:80, chi:70, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Man Goku"},
    "gokei": {cv:"赤城 進", gender:"男", age:"40代後半", rank:"大将軍", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第50話", debutAnime:"アニメ 第1期 第17話", stats:{bu:89, shiki:92, chi:97, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Go Kei"},
    "kan'ou": {gender:"男", age:"40代", rank:"将軍", cls:"部隊長 / 家臣 / 騎兵", arms:"朴刀 / 剣", debutManga:"原作 第120話", debutAnime:"アニメ 第1期 第27話", stats:{bu:86, shiki:87, chi:82, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kan Ou"},
    "kyuugen": {cv:"Masayuki Omoro", gender:"男", age:"40代", rank:"将軍", cls:"部隊長 / 騎兵", arms:"槍 / 剣", debutManga:"原作 第54話", debutAnime:"アニメ 第1期 第18話", stats:{bu:83, shiki:81, chi:88, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Kyuu Gen"},
    "renpa": {cv:"楠見尚己", epithet:"元・趙三大天", gender:"男", age:"70代", rank:"大将軍", cls:"部隊長 / 騎兵", debutManga:"原作 第193話", debutAnime:"アニメ 第1期 第25話", stats:{bu:97, shiki:98, chi:96, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Ren Pa"},
    "rinko": {cv:"櫻井孝宏", gender:"男", age:"30代", rank:"将軍", cls:"部隊長 / 刺客 / 騎兵", arms:"双剣", debutManga:"原作 第194話", debutAnime:"アニメ 第2期 第14話", stats:{bu:93, shiki:88, chi:87, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Rin Ko"},
    "genpou": {cv:"後藤哲夫", gender:"男", rank:"将軍", cls:"部隊長", debutManga:"原作 第194話", debutAnime:"アニメ 第2期 第14話", stats:{bu:5, shiki:84, chi:96, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Gen Pou"},
    "kaishibou": {cv:"檜山修之", gender:"男", age:"50代前半", rank:"将軍", cls:"隊長 / 騎兵", arms:"朴刀", debutManga:"原作 第194話", debutAnime:"アニメ 第2期 第14話", stats:{bu:91, shiki:88, chi:87, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kai Shi Bou"},
    "kyouen": {cv:"川田紳司", gender:"男", age:"40代", rank:"将軍", cls:"隊長 / 弓兵", arms:"弓 / 矢", debutManga:"原作 第194話", debutAnime:"アニメ 第2期 第14話", stats:{bu:91, shiki:88, chi:88, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kyou En"},
    "ousen": {cv:"堀内賢雄", epithet:"仮面の謀将", gender:"男", age:"50代", rank:"大将軍", cls:"総大将 / 武将 / 騎兵", arms:"矛", debutManga:"原作 第201話", debutAnime:"アニメ 第2期 第17話", stats:{bu:93, shiki:95, chi:99, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Ou Sen"},
    "choutou": {cv:"Urayama Jin", gender:"男", age:"65歳", rank:"大将軍", cls:"部隊長 / 騎兵", arms:"朴刀", debutManga:"原作 第108話", debutAnime:"アニメ 第3期 第3話", stats:{bu:86, shiki:90, chi:88, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Chou Tou"},
    "kanto": {cv:"林 勇", gender:"男", age:"20代", rank:"百人将", debutManga:"原作 第492話", debutAnime:"アニメ 通算 第143話", stats:{bu:80, shiki:65, chi:78, kei:"E"}, statsSrc:"公式ガイドブック3", src:"Kan To"},
    "shika": {cv:"大原さやか", gender:"女", age:"20代半ば", arms:"弓矢", debutManga:"原作 第75話", debutAnime:"アニメ 第2期 第7話", src:"Shi Ka"},
    "riboku": {cv:"森川智之", epithet:"趙三大天", gender:"男", age:"40代", rank:"大将軍", cls:"軍師 / 騎兵", debutAnime:"アニメ 第1期 第29話", stats:{bu:91, shiki:99, chi:100, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Ri Boku"},
    "kaine": {cv:"村井美里", gender:"女", rank:"将軍", cls:"隊長 / 護衛 / 騎兵", arms:"双剣", debutAnime:"アニメ 第1期 第29話", stats:{bu:84, shiki:87, chi:83, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Kaine"},
    "gohoumei": {cv:"浪川大輔", epithet:"魏火竜の遺児", gender:"男", rank:"大将軍", cls:"軍師 / 隊長 / 騎兵", arms:"剣", debutManga:"原作 第266話", debutAnime:"アニメ 第3期 第2話", stats:{bu:63, shiki:91, chi:98, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Go Hou Mei"},
    "shunshinkun": {cv:"内田夕夜", gender:"男", rank:"軍総司令", cls:"部隊長", debutManga:"原作 第173話", debutAnime:"アニメ 第2期 第39話", stats:{bu:70, shiki:90, chi:98, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Shun Shin Kun"},
    "kanmei": {cv:"Tanaka Miou", epithet:"中華最強（自称）", gender:"男", rank:"大将軍", cls:"大将軍", debutManga:"原作 第268話", debutAnime:"アニメ 第3期 第2話", stats:{bu:99, shiki:91, chi:88, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kan Mei"},
    "rinbukun": {cv:"安元洋貴", gender:"男", rank:"将軍", cls:"部隊長 / 騎兵", arms:"鉄槌", debutManga:"原作 第253話", debutAnime:"アニメ 第3期 第1話", stats:{bu:93, shiki:85, chi:85, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Rin Bu Kun"},
    "seikai": {cv:"鳥海浩輔", gender:"男", age:"30代", rank:"大将軍", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第268話", debutAnime:"アニメ 第3期 第2話", stats:{bu:50, shiki:86, chi:88, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Sei Kai"},
    "orudo": {cv:"Kinoshita Hiroyuki", gender:"男", rank:"大将軍", cls:"部隊長 / 騎兵", debutManga:"原作 第268話", debutAnime:"アニメ 第3期 第2話", stats:{bu:93, shiki:95, chi:85, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Ordo"},
    "kanki": {cv:"伊藤健太郎", epithet:"元野盗の将軍", gender:"男", age:"30代半ば", rank:"大将軍 / 将軍", cls:"武将 / 野盗の頭", arms:"剣", debutManga:"原作 第198話", debutAnime:"アニメ 第2期 第17話", stats:{bu:93, shiki:95, chi:96, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kan Ki"},
    "maron": {gender:"男", age:"30代", rank:"五千人将", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第212話", debutAnime:"アニメ 第2期 第21話", stats:{bu:79, shiki:86, chi:90, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ma Ron"},
    "raido": {gender:"男", age:"30代", rank:"将軍", cls:"将軍 / 騎兵", arms:"朴刀 / 剣", debutManga:"原作 第212話", debutAnime:"アニメ 第2期 第21話", stats:{bu:90, shiki:86, chi:80, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Rai Do"},
    "kokuou": {cv:"Kawashima Yuumi", gender:"女", rank:"将軍 / 五千人将", cls:"部隊長 / 弓兵 / 騎兵", arms:"剣 / 弓矢", debutManga:"原作 第212話", debutAnime:"アニメ 第2期 第21話", stats:{bu:82, shiki:85, chi:85, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Koku'Ou"},
    "zenou": {gender:"男", rank:"隊長", cls:"隊長", debutManga:"原作 第447話", debutAnime:"アニメ 通算 第131話", stats:{bu:93, shiki:70, chi:65, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Zenou"},
    "naki": {cv:"小西克幸", gender:"男", age:"30代", rank:"千人将", cls:"隊長 / 野盗の頭", debutManga:"原作 第442話", debutAnime:"アニメ 通算 第130話", stats:{bu:89, shiki:84, chi:87, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Na Ki"},
    "keisha": {cv:"平川大輔", epithet:"沈黙の狩人", gender:"男", age:"20代後半", rank:"将軍", cls:"部隊長 / 騎兵", arms:"剣", debutManga:"原作 第251話", debutAnime:"アニメ 第3期 第4話", stats:{bu:88, shiki:90, chi:91, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Kei Sha"},
    "kisui": {cv:"石井康嗣", gender:"男", age:"44歳", rank:"将軍", cls:"騎兵", arms:"朴刀 / 剣", debutManga:"原作 第443話", debutAnime:"アニメ 通算 第130話", stats:{bu:86, shiki:92, chi:90, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ki Sui"},
    "sosui": {cv:"Ryūichi Hirose", gender:"男", age:"40代", rank:"五千人将", cls:"武将 / 騎兵", arms:"朴刀", debutManga:"原作 第201話", debutAnime:"アニメ 第2期 第17話", stats:{bu:81, shiki:85, chi:85, kei:"B"}, statsSrc:"公式ガイドブック3", src:"So Sui"},
    "ryusen": {cv:"高橋広樹", gender:"男", rank:"千人将", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第26話", stats:{bu:89, shiki:72, chi:65, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Ryuu Sen"},
    "shousa": {cv:"高塚正也", gender:"男", age:"32歳", rank:"百人将", cls:"伍長", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第26話", stats:{bu:83, shiki:85, chi:80, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Shou Sa"},
    "suugen": {cv:"高橋広樹", gender:"男", age:"38歳", rank:"三千人将", arms:"剣", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第26話", stats:{bu:86, shiki:83, chi:78, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Suu Gen"},
    "garo": {cv:"Shinya Hamazoe", gender:"男", age:"30代半ば", rank:"二千人将", cls:"隊長 / 騎兵", arms:"矛 / 剣", debutManga:"原作 第356話", debutAnime:"アニメ 第3期 第25話", stats:{bu:86, shiki:80, chi:84, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ga Ro"},
    "gakurai": {cv:"Hiroshi Shirokuma", gender:"男", age:"40代前半", rank:"千人将", cls:"隊長", arms:"矛", debutManga:"原作 第356話", debutAnime:"アニメ 第3期 第25話", stats:{bu:84, shiki:84, chi:79, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Gaku Rai"},
    "ryuyuu": {cv:"Aoki Tsuyoshi", gender:"男", age:"30代", rank:"五百人将", cls:"部隊長 / 歩兵", arms:"槍", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第28話", src:"Ryuu Yuu"},
    "chuutetsu": {gender:"男", age:"30代後半", rank:"三百人将", arms:"剣 / 矛", debutManga:"原作 第49話", debutAnime:"アニメ 第1期 第17話", src:"Chu Tetsu"},
    "denei": {cv:"Ishiguro Fumitake", gender:"男", rank:"千人将", arms:"槍", debutManga:"原作 第113話", debutAnime:"アニメ 第1期 第26話", stats:{bu:82, shiki:79, chi:73, kei:"C"}, statsSrc:"公式ガイドブック3", src:"Den Ei"},
    "akou": {cv:"武田幸史", gender:"男", age:"40代", rank:"将軍", cls:"隊長 / 騎兵", arms:"朴刀 / 剣", debutManga:"原作 第504話", debutAnime:"アニメ 通算 第146話", stats:{bu:91, shiki:89, chi:87, kei:"B"}, statsSrc:"公式ガイドブック3", src:"A Kou"},
    "makou": {cv:"松本 大", gender:"男", rank:"将軍", cls:"隊長", arms:"朴刀 / 剣", debutManga:"原作 第380話", debutAnime:"アニメ 通算 第146話", stats:{bu:86, shiki:90, chi:88, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ma Kou"},
    "denrimi": {cv:"古川 慎", gender:"男", rank:"将軍", arms:"剣", debutManga:"原作 第535話", debutAnime:"アニメ 通算 第154話", stats:{bu:80, shiki:89, chi:91, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Den Ri Mi"},
    "soou": {gender:"男", age:"30代", rank:"将軍", cls:"部隊長", arms:"矛", debutManga:"原作 第835話", debutAnime:"アニメ 通算 第154話", stats:{bu:85, shiki:87, chi:89, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Sou'Ou"},
    "ringyoku": {cv:"Taku Yashiro", gender:"男", age:"30代", rank:"将軍 / 副官", cls:"隊長 / 野盗の頭", arms:"双剣", debutManga:"原作 第442話", debutAnime:"アニメ 通算 第130話", stats:{bu:83, shiki:82, chi:88, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Rin Gyoku"},
    "ogiko": {cv:"福山 潤", gender:"男", cls:"隊長 / 騎兵", arms:"弓 / 曲刀", debutManga:"原作 第276話", debutAnime:"アニメ 第3期 第4話", stats:{bu:84, shiki:50, chi:5, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ogiko"},
    "banyou": {cv:"高塚正也", gender:"男", age:"60代", rank:"副官", cls:"貴族", arms:"槍", debutManga:"原作 第181話", debutAnime:"アニメ 第2期 第4話", src:"Ban You"},
    "akakin": {cv:"立花慎之介", gender:"男", age:"20代後半", rank:"将軍", cls:"武将", arms:"蛇行剣", debutManga:"原作 第538話", stats:{bu:88, shiki:82, chi:88, kei:"C"}, statsSrc:"公式ガイドブック3", src:"A Ka Kin"},
    "kochou": {gender:"男", rank:"大将軍", cls:"総大将", debutManga:"原作 第500話", debutAnime:"アニメ 通算 第145話", stats:{bu:90, shiki:93, chi:96, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Ko Chou"},
    "shibashou": {cv:"速水 奨", epithet:"趙の新三大天", gender:"男", age:"40代", rank:"大将軍", debutManga:"原作 第502話", debutAnime:"アニメ 通算 第146話", stats:{kei:"A"}, statsSrc:"公式ガイドブック3", src:"Shi Ba Shou"},
    "gyouun": {cv:"真野恭輔", gender:"男", age:"50代", rank:"将軍", cls:"将軍", debutManga:"原作 第516話", debutAnime:"アニメ 通算 第149話", stats:{bu:94, shiki:93, chi:88, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Gyou’un"},
    "futei": {cv:"花江夏樹", gender:"男", age:"31歳", rank:"将軍", cls:"隊長 / 護衛 / 騎兵", arms:"双剣", debutManga:"原作 第332話", debutAnime:"アニメ 第3期 第19話", stats:{bu:91, shiki:86, chi:87, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Fu Tei"},
    "shunsuiju": {cv:"坂 泰斗", gender:"男", age:"30代", rank:"将軍", cls:"将軍", arms:"剣", debutManga:"原作 第484話", debutAnime:"アニメ 通算 第141話", stats:{bu:83, shiki:90, chi:93, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Shun Sui Ju"},
    "banaji": {cv:"手塚秀彰", gender:"男", rank:"将軍", cls:"将軍 / 騎兵", arms:"朴刀", debutManga:"原作 第484話", debutAnime:"アニメ 通算 第141話", stats:{bu:94, shiki:90, chi:84, kei:"B"}, statsSrc:"公式ガイドブック3", src:"Ba Nan Ji"},
    "rakushou": {gender:"男", rank:"将軍", cls:"将軍", arms:"矛", debutManga:"原作 第701話", src:"Gaku Shou"},
    "gaimou": {cv:"大塚明夫", gender:"男", rank:"大将軍", cls:"隊長 / 騎兵", arms:"朴刀 / 剣", debutManga:"原作 第379話", debutAnime:"アニメ 第4期 第6話", stats:{bu:97, shiki:85, chi:80, kei:"S"}, statsSrc:"公式ガイドブック3", src:"Gai Mou"},
    "chougaryuu": {cv:"東地宏樹", gender:"男", age:"50代", rank:"将軍", cls:"将軍", debutManga:"原作 第516話", debutAnime:"アニメ 通算 第149話", stats:{bu:85, shiki:90, chi:93, kei:"A"}, statsSrc:"公式ガイドブック3", src:"Chou Ga Ryuu"},
  },

  nodes: [

  /* ═══════════ 追加: 戦い（黒羊丘以降） ═══════════ */
  {
    id:"b_chakuyou", name:"著雍の戦い", yomi:"ちゃくようのたたかい", kind:"battle", state:"複数", group:"対魏",
    role:"秦の勝利", klass:"戦い", first:"52巻", arc:"著雍編", status:"決着",
    tags:["魏","呉鳳明","凱孟","飛信隊","将軍昇格"],
    summary:"魏の要衝・著雍を落とした戦い。信が将軍位に手を伸ばす一歩。",
    detail:[
      {h:"構図", body:"魏の呉鳳明が守る著雍に、秦が飛信隊・玉鳳・楽華の若手三隊を軸に攻めかかる。魏は十四年ぶりに地下牢から出された猛将・凱孟を投入。"},
      {h:"見どころ", body:"河了貂が荀早隊に囚われ、凱孟に胸の内を語る場面。信と凱孟の一騎討ち。信が魏火龍・霊凰を討ち取り、呉鳳明は霊凰を身代わりにして撤退する。"},
      {h:"結果", body:"著雍陥落。羌瘣が本陣陥落の功で三千人将、信は将軍昇格への道筋をつける。"}
    ],
    rel:[{to:"shin",label:"参加"},{to:"gohoumei",label:"敵将"},{to:"gaimou",label:"敵将"},{to:"kyoukai",label:"参加"},{to:"tenn",label:"参加"}]
  },
  {
    id:"b_gyou", name:"鄴攻略戦（朱海平原の決戦）", yomi:"ぎょうこうりゃくせん", kind:"battle", state:"複数", group:"対趙",
    role:"秦の勝利", klass:"戦い", first:"58巻", arc:"鄴編", status:"決着",
    tags:["王翦","李牧","朱海平原","十四日間","飢餓","龐煖"],
    summary:"趙の穀倉・鄴を奪う大遠征。朱海平原で十四日間の総力戦になる。",
    detail:[
      {h:"構図", body:"王翦を総大将に秦軍十数万が趙深部へ侵攻。鄴を包囲して兵糧攻めにする一方、朱海平原で李牧率いる趙軍主力と正面からぶつかる。"},
      {h:"十四日間", body:"初日に王翦軍第二将・麻鉱が李牧の急襲で戦死。以後、右翼で亜光が尭雲と馬南慈に潰され、左翼では蒙恬が臨時の将軍として紀彗と噛み合う。中央では信が趙峩龍を、王賁が尭雲を討ち取る。"},
      {h:"代償", body:"飛信隊は松左と去亥を失う。信は龐煖を討ち取るが力を使い果たし、羌瘣が蚩尤の蘇生術で命を繋ぐ。"},
      {h:"結果", body:"鄴は飢餓の末に陥落。趙は穀倉地帯を失い、以後の対秦戦の体力を削られる。"}
    ],
    rel:[{to:"ousen",label:"総大将"},{to:"riboku",label:"敵総大将"},{to:"shin",label:"参加"},{to:"houken",label:"討たれる"},{to:"makou",label:"戦死"},{to:"gyouun",label:"戦死"},{to:"chougaryuu",label:"戦死"}]
  },
  {
    id:"b_gian", name:"宜安・肥下の戦い", yomi:"ぎあん・ひかのたたかい", kind:"battle", state:"複数", group:"対趙",
    role:"趙の勝利（桓騎軍壊滅）", klass:"戦い", first:"70巻", arc:"宜安編", status:"決着",
    tags:["桓騎","李牧","肥下","壊滅","毒","罠"],
    summary:"李牧が情報を封じて桓騎軍を趙北部へ誘い込み、包囲して壊滅させた戦い。",
    detail:[
      {h:"構図", body:"平陽・武城を落として勢いに乗る桓騎軍が宜安へ。李牧は情報封鎖で秦軍に趙の戦力を誤認させ、赤麗の井戸に毒を仕込ませて足を止め、趙北部軍全軍で包囲網を作る。"},
      {h:"宜司平野", body:"倍以上の趙軍に囲まれた秦軍が突破を図る。飛信隊は岳雷を青歌将軍・上和龍に一撃で討たれ、蒙恬も楽彰に斬られる。李信が包囲を破って脱出路を開く。"},
      {h:"肥下", body:"桓騎は森で李牧本陣を奇襲し、李牧の右頭部を斬るところまで迫るが、援軍が次々到着して失敗。黒桜・厘玉・那貴が相次いで倒れ、ゼノウは上和龍を握り潰して相打ち。桓騎は最後まで飄々としたまま討たれる。"},
      {h:"結果", body:"秦は将軍・桓騎と一軍を失う。李牧はこの功で武安君に封じられる。摩論とオギコが桓騎の遺言を信に伝えた。"}
    ],
    rel:[{to:"kanki",label:"戦死"},{to:"riboku",label:"敵総大将"},{to:"kokuou",label:"戦死"},{to:"raido",label:"戦死"},{to:"zenou",label:"戦死"},{to:"naki",label:"戦死"},{to:"ringyoku",label:"戦死"},{to:"gakurai",label:"戦死"}]
  },
  {
    id:"b_bango", name:"番吾攻防戦（第二次趙北部攻略戦）", yomi:"ばんごこうぼうせん", kind:"battle", state:"複数", group:"対趙",
    role:"趙の勝利", klass:"戦い", first:"75巻", arc:"番吾編", status:"決着",
    tags:["王翦","李牧","司馬尚","敗戦","亜光"],
    summary:"王翦が総大将として趙北部に再侵攻し、李牧と司馬尚に敗れた戦い。",
    detail:[
      {h:"構図", body:"桓騎を失った秦が王翦を総大将に趙北部へ再侵攻。趙は李牧が全体を、青歌の司馬尚が中央を担う。"},
      {h:"展開", body:"李牧の策で飛信隊と玉鳳隊が秦中央から引き離された隙に、司馬尚が秦中央軍を蹂躙して王翦本陣まで到達。田里弥が本陣を守って力尽き、亜光は倉央に王翦を託して司馬尚に特攻し討たれる。"},
      {h:"結果", body:"秦の敗北。王翦は撤退。この敗戦を受けて昌平君が「三つの柱」を献策し、渕と楚水が五千将に、崇原らが昇進する体制立て直しに入る。"}
    ],
    rel:[{to:"ousen",label:"総大将"},{to:"riboku",label:"敵総大将"},{to:"shibashou",label:"敵将"},{to:"akou",label:"戦死"},{to:"denrimi",label:"戦死"},{to:"soou",label:"参加"}]
  },
  {
    id:"b_shintei", name:"韓攻略戦（新鄭陥落）", yomi:"かんこうりゃくせん", kind:"battle", state:"複数", group:"対韓",
    role:"秦の勝利（韓滅亡）", klass:"戦い", first:"78巻", arc:"韓攻略編", status:"決着",
    tags:["韓","滅亡","騰","李信","初の一国"],
    summary:"七国のうち最初に滅んだ国。秦の統一戦争が現実の形をとりはじめる。",
    detail:[
      {h:"構図", body:"騰を総大将に、李信・録嗚未・玉鳳・楽華が韓へ侵攻。韓は洛亜完・眉景らが迎え撃ち、魏の凱孟や趙の舜水樹・馬南慈が救援に動く。"},
      {h:"展開", body:"東砂平原の会戦で秦が連勝し、王都・新鄭が陥落。救援に向かっていた諸国軍は報せを受けて撤退する。"},
      {h:"意味", body:"中華統一の一国目。以後、秦の戦争は「勝つ」戦争から「滅ぼす」戦争に変わる。"}
    ],
    rel:[{to:"tou",label:"総大将"},{to:"shin",label:"参加"},{to:"rokuomi",label:"参加"},{to:"gaimou",label:"敵援軍"},{to:"shunsuiju",label:"敵援軍"}]
  },

  /* ═══════════ 追加: 飛信隊のサブキャラ ═══════════ */
  {
    id:"sosui", name:"楚水", yomi:"そすい", kind:"person", state:"秦", group:"飛信隊",
    role:"副長兼千人将 → 五千人将", klass:"武将", first:"17巻", arc:"山陽攻略戦", status:"存命",
    tags:["飛信隊","副長","騎兵","元郭備隊","冷静"],
    summary:"元郭備隊の副長。飛信隊の騎兵を預かる、隊で最も冷静な男。",
    detail:[
      {h:"加入の経緯", body:"もともとは秦将・郭備の隊の副長。山陽攻略戦で郭備が魏の輪虎に暗殺され、部下ごと急造千人隊の飛信隊へ転属になった。仇である輪虎を討つことを目標に飛信隊に居続ける。"},
      {h:"誰と戦ったか", body:"山陽の最終局面で、信と輪虎の一騎討ちに割り込もうとした魏将・魏良を討ち取る。その勢いで輪虎にも斬りかかったが返り討ちに遭い、一命を取り留めるのが精一杯だった。著雍編では魏軍師・氷鬼を奇襲して間永ごと生け捕りにしている。"},
      {h:"役割", body:"正規千人隊になってからは補給を一任され、河了貂の加入後は主力の騎兵隊を率いる。信が突っ込む前提で、隊が壊れないように組み立てる側の人間。"},
      {h:"その後", body:"番吾での敗戦後、渕とともに五千将に昇進。飛信隊の中核として存命。"}
    ],
    battles:["b_sanyou","b_kankoku","b_sai","b_chakuyou","b_kokuyou","b_gyou","b_gian","b_bango","b_shintei"],
    rel:[{to:"shin",label:"上官"},{to:"en",label:"同格の副長"},{to:"rinko",label:"仇"},{to:"tenn",label:"軍師"}]
  },
  {
    id:"ryusen", name:"竜川", yomi:"りゅうせん", kind:"person", state:"秦", group:"飛信隊",
    role:"伍長 → 千人将", klass:"兵", first:"9巻", arc:"馬陽の戦い", status:"存命",
    tags:["飛信隊","怪力三人衆","巨漢","家族","初期メンバー"],
    summary:"飛信隊随一の巨漢。田有の三倍の膂力で敵陣に穴をあける。",
    detail:[
      {h:"人物", body:"飛信隊結成時の第十六伍長。妻子持ちで、鄴編の時点で娘が五人。自分の膂力を防御陣の破壊にだけ使う、という割り切りをしている。"},
      {h:"誰と戦ったか", body:"馬陽では趙将・馮忌の奇襲の際、妻子を思って尻込みしたところを信に一喝され、突破口を開いた。蕞では趙の傅抵に重傷を負わされたが、不意を突いて城壁から突き落として返している。"},
      {h:"最大の危機", body:"宜安城攻略で田有・中鉄とともに「怪力三人衆」として身を挺して突破口を開き、三人とも瀕死。同行していた砂鬼一家の治療術で一命を取り留めた。尾平の結婚披露宴の頃には回復して参加している。"},
      {h:"その後", body:"始皇十六年に千人将へ昇進。存命。"}
    ],
    battles:["b_bayou","b_sanyou","b_sai","b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"shin",label:"上官"},{to:"denyuu",label:"怪力三人衆"},{to:"chuutetsu",label:"怪力三人衆"},{to:"futei",label:"交戦"}]
  },
  {
    id:"shousa", name:"松左", yomi:"しょうさ", kind:"person", state:"秦", group:"飛信隊",
    role:"伍長 → 副歩兵長兼百人将", klass:"兵", first:"9巻", arc:"馬陽の戦い", status:"戦死",
    tags:["飛信隊","槍","初期メンバー","戦死","朱海平原"],
    summary:"槍術の達人。飄々としながら核心を突く、隊の精神的な芯。",
    detail:[
      {h:"人物", body:"飛信隊結成時の第十伍長。崇原とは初陣からの付き合い。飄々としているが頭が切れ、隊が迷ったときに一番地に足のついた言葉を出す。"},
      {h:"役割", body:"合従軍編では負傷で療養しており蕞には加われなかった。著雍編で百人将かつ副歩兵長になり、若い兵の面倒を見る側に回る。"},
      {h:"最期", body:"朱海平原の決戦十四日目。視野の広さを買われて渕とともに各隊の救援判断を託され、趙峩龍軍に囲まれて絶体絶命だった干斗たちの救出に向かう。救い出したが自らは致命傷を負い、愛槍を干斗に託して信の腕の中で息を引き取った。"},
      {h:"その後", body:"羌瘣の蘇生術で信が見た精神世界に、去亥とともに現れる。"}
    ],
    battles:["b_bayou","b_sanyou","b_chakuyou","b_kokuyou","b_gyou"],
    rel:[{to:"shin",label:"部下"},{to:"suugen",label:"初陣からの相棒"},{to:"kanto",label:"命を救い槍を託す"},{to:"chougaryuu",label:"交戦"}]
  },
  {
    id:"suugen", name:"崇原", yomi:"すうげん", kind:"person", state:"秦", group:"飛信隊",
    role:"伍長 → 歩兵長兼千人将 → 三千人将", klass:"武将", first:"9巻", arc:"馬陽の戦い", status:"存命",
    tags:["飛信隊","剣","眼帯","合昂剣","初期メンバー"],
    summary:"飛信隊第三位の剣士。田舎剣術「合昂剣」の皆伝。",
    detail:[
      {h:"人物", body:"飛信隊結成時の第五伍長。十七歳の初陣で尿意を我慢していたところに奇襲を受けて漏らし、「小便もらしの崇原」と馬鹿にされた過去を持つ。二大田舎剣術の一つ「合昂剣」の皆伝の使い手。"},
      {h:"左眼", body:"馬陽編の夜襲からの退却で左眼を失い、山陽編以降は眼帯姿になる。"},
      {h:"役割", body:"黒羊編後に歩兵長。入隊試験で食って掛かってきた干斗を叩きのめし、そのうえでもう一度機会を与えて合格させた。後に百人将への昇進も推薦している。育成係。"},
      {h:"その後", body:"信の将軍昇格で千人将、始皇十六年に三千人将。存命。"}
    ],
    battles:["b_bayou","b_sanyou","b_sai","b_chakuyou","b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"shin",label:"部下"},{to:"shousa",label:"初陣からの相棒"},{to:"kanto",label:"育てる"}]
  },
  {
    id:"garo", name:"我呂", yomi:"がろ", kind:"person", state:"秦", group:"飛信隊",
    role:"千人将 → 二千人将", klass:"武将", first:"36巻", arc:"合従軍戦後", status:"存命",
    tags:["飛信隊","赤飛麃","元麃公軍","毒舌","乱戦"],
    summary:"元麃公軍。乱戦特化兵「飛麃」の片翼、赤飛麃の指揮官。",
    detail:[
      {h:"人物", body:"少年兵の頃に岳雷の部隊に配属され、以後ずっと岳雷と死線をくぐってきた。軽い口調で毒舌、作戦会議でも茶々を入れるが、筋の通ったことには義理を尽くす。"},
      {h:"誰と戦ったか", body:"朱海平原十五日目、趙の「十槍」三番槍・平秀に圧倒されたが、蒼仁の矢で平秀が怯んだ一瞬を突いて討ち取った。"},
      {h:"岳雷の死", body:"宜司平野戦で家族同然の岳雷を青歌将軍・上和龍に討たれて激高。李信とともに上和龍へ襲いかかり、側近の雲玄に重傷を負わせて、李信が包囲を破る援護をした。"},
      {h:"その後", body:"始皇十六年に二千人将。存命。"}
    ],
    battles:["b_sai","b_chakuyou","b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"shin",label:"部下"},{to:"gakurai",label:"戦友"},{to:"joukaryuu",label:"仇敵"},{to:"hyoukou",label:"旧主"}]
  },
  {
    id:"gakurai", name:"岳雷", yomi:"がくらい", kind:"person", state:"秦", group:"飛信隊",
    role:"千人将", klass:"武将", first:"36巻", arc:"合従軍戦後", status:"戦死",
    tags:["飛信隊","黒飛麃","元麃公軍","戦死","宜司平野"],
    summary:"元麃公軍。飛麃を鍛え上げた無骨な男。黒飛麃の指揮官。",
    detail:[
      {h:"人物", body:"合従軍戦後に我呂ら元麃公兵五百とともに飛信隊へ配属。無骨で、信を嫌う旨の発言もするが実力は認めている。乱戦特化兵「飛麃」を指揮して猛威を振るった。"},
      {h:"蒼源との縁", body:"かつて蒼源に窮地を救われたことがあり、蒼兄弟が入隊試験を受けたとき、彼らが知らなかった父の活躍を伝え、自分が蒼源の死の遠因を作ったと詫びた。"},
      {h:"最期", body:"宜司平野戦。趙北部軍全軍の包囲を破るため、錘型の陣の先頭を我呂と組んで担い、青歌軍と衝突した直後に将軍・上和龍と遭遇。ただの一撃で討ち取られて戦死した。"}
    ],
    battles:["b_sai","b_chakuyou","b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"shin",label:"部下"},{to:"garo",label:"戦友"},{to:"joukaryuu",label:"討たれる"},{to:"hyoukou",label:"旧主"}]
  },
  {
    id:"ryuyuu", name:"竜有", yomi:"りゅうゆう", kind:"person", state:"秦", group:"飛信隊",
    role:"伍長 → 五百将", klass:"兵", first:"9巻", arc:"馬陽の戦い", status:"存命",
    tags:["飛信隊","料理","初期メンバー","蛇甘平原生存者"],
    summary:"元料理人。飛信隊の飯を作る、隊の胃袋。",
    detail:[
      {h:"人物", body:"蛇甘平原戦第二軍の生存者。気難しく、当初は信たちに悪態をついていた。元料理人で腕は確かで、飛信隊の食事を作っている。"},
      {h:"エピソード", body:"鄴編では斉国の食材を見て心を躍らせ、尾平の結婚披露宴では河了貂と一緒に料理を作って城戸村の子どもたちに配った。"},
      {h:"その後", body:"始皇十六年に五百将。存命。"}
    ],
    battles:["b_dakan","b_bayou","b_sanyou","b_kokuyou","b_gyou"],
    rel:[{to:"shin",label:"部下"},{to:"tenn",label:"厨房仲間"}]
  },
  {
    id:"chuutetsu", name:"中鉄", yomi:"ちゅうてつ", kind:"person", state:"秦", group:"飛信隊",
    role:"伍長 → 三百将", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","怪力三人衆","初期メンバー","富村の殺し屋"],
    summary:"「富村の殺し屋」。伍作りで大人気だった強面の大男。",
    detail:[
      {h:"人物", body:"蛇甘平原編の伍作りで、その強面と体格から大人気だった男。飛信隊結成時の第十五伍長。"},
      {h:"最大の危機", body:"宜安城攻略で田有・竜川とともに怪力三人衆として突破口を開き、三人とも瀕死の重傷。砂鬼一家の治療術で生還した。"},
      {h:"その後", body:"始皇十六年に三百将。存命。"}
    ],
    battles:["b_dakan","b_bayou","b_sanyou","b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"shin",label:"部下"},{to:"ryusen",label:"怪力三人衆"},{to:"denyuu",label:"怪力三人衆"}]
  },
  {
    id:"denei", name:"田永", yomi:"でんえい", kind:"person", state:"秦", group:"飛信隊",
    role:"伍長 → 千人将", klass:"兵", first:"9巻", arc:"馬陽の戦い", status:"存命",
    tags:["飛信隊","騎兵","初期メンバー","沛浪の旧友"],
    summary:"口が悪く喧嘩っ早い。だが本質を見誤らないしっかり者。",
    detail:[
      {h:"人物", body:"旧友の沛浪に誘われて飛信隊に加入し、第六伍長として所属。口が悪く喧嘩っ早く、時に自己中心的だが、大事なところで判断を外さない。"},
      {h:"その後", body:"信の将軍昇格で五百人将となり騎兵隊指揮官の一人に。始皇十六年に千人将。存命。"}
    ],
    battles:["b_bayou","b_sanyou","b_sai","b_kokuyou","b_gyou"],
    rel:[{to:"shin",label:"部下"},{to:"hairou",label:"旧友"},{to:"sosui",label:"騎兵の上官"}]
  },

  /* ═══════════ 追加: 王翦軍 ═══════════ */
  {
    id:"akou", name:"亜光", yomi:"あこう", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下 第一将", klass:"武将", first:"58巻", arc:"鄴編", status:"戦死",
    tags:["王翦軍","第一将","力技","無敗","番吾"],
    summary:"王翦軍の第一将。正面からのぶつかり合いでは無敗の男。",
    detail:[
      {h:"人物", body:"元は小国の武将で、王翦に敗れて捕虜となり、国作りのために配下になれと言われて最終的に従った。策謀を理解しつつも小細工を好まず、自分と自軍の武力で正面から潰す。李牧も高く評価する名将。"},
      {h:"誰と戦ったか", body:"朱海平原では秦軍右翼の指揮を担い、九日目に防陣を破った馬南慈と尭雲の両者に挟まれて重傷。亜花錦と玉鳳隊の救援で命は繋いだが意識不明となり、鄴陥落後に復活した。"},
      {h:"最期", body:"番吾攻防戦。李牧の策で楽彰とフーオンに挟撃され、傅抵にも斬られて重傷を負いながら楽彰の左目を斬り返す。青歌軍が王翦本陣に入ったと知ると重傷のまま駆けつけ、司馬尚の前に立ちはだかった。自分の命が尽きると悟ると倉央に王翦を託して特攻し、司馬尚に討たれて戦死。"}
    ],
    battles:["b_gyou","b_bango"],
    rel:[{to:"ousen",label:"主君"},{to:"makou",label:"同僚"},{to:"denrimi",label:"同僚"},{to:"soou",label:"王翦を託す"},{to:"shibashou",label:"討たれる"},{to:"gyouun",label:"交戦"}]
  },
  {
    id:"makou", name:"麻鉱", yomi:"まこう", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下 第二将", klass:"武将", first:"58巻", arc:"鄴編", status:"戦死",
    tags:["王翦軍","第二将","練兵","戦死","朱海平原初日"],
    summary:"王翦軍最強の練度を作り上げた将。朱海平原の初日に散る。",
    detail:[
      {h:"人物", body:"亜光と並ぶ名将。亜光と違って策謀を好み、徹底した練兵で鍛えた麾下軍の練度は王翦軍最強とされた。"},
      {h:"最期", body:"朱海平原の決戦初日。左翼へ回って、楽華隊に翻弄されていた紀彗軍に波状攻撃を仕掛け追い詰めつつあったところを、李牧の急襲を受けて戦死。この穴を埋めるため蒙恬が臨時の将軍として秦軍左翼大将に立つことになる。"},
      {h:"意味", body:"初日でいきなり第二将が消えたことで、この戦いが「勝つ前提の遠征」ではないことが秦軍全体に突きつけられた。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"ousen",label:"主君"},{to:"riboku",label:"討たれる"},{to:"mouten",label:"後任"},{to:"kisui",label:"交戦"}]
  },
  {
    id:"denrimi", name:"田里弥", yomi:"でんりみ", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下 第三将 → 第二将", klass:"軍師", first:"58巻", arc:"鄴編", status:"戦死",
    tags:["王翦軍","智将","補佐","番吾","戦死"],
    summary:"王翦軍随一の智将。矛を振らず、剛柔を併せ持つ軍を動かす。",
    detail:[
      {h:"人物", body:"主に王翦の補佐を担当。自ら矛は振らないが、麾下軍は戦場で臨機応変に対応する剛柔を持ち「王翦軍最賢」と称される。かつては王翦軍一の殺傷部隊とも謳われた。"},
      {h:"誰と戦ったか", body:"朱海平原十五日目に倉央と共伯軍に対峙。決着後は精鋭以外の残軍を率いて陥落した鄴へ入った。桓騎の計略を警戒し、自軍を囮に使われることを読んでいた側でもある。"},
      {h:"最期", body:"番吾攻防戦。配下の山秀らと出撃してジ・アガを追い詰めるが、突如現れた司馬尚たちの強襲で致命傷。それでも亜光たちを王翦のもとへ行かせるために敵を足止めし続け、カン・サロが目前に来たときにはすでに力尽きていた。"}
    ],
    battles:["b_gyou","b_bango"],
    rel:[{to:"ousen",label:"主君"},{to:"akou",label:"同僚"},{to:"soou",label:"同僚"},{to:"shibashou",label:"交戦"}]
  },
  {
    id:"soou", name:"倉央", yomi:"そうおう", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下 第四将 → 第三将", klass:"武将", first:"58巻", arc:"鄴編", status:"存命",
    tags:["王翦軍","猛将","軽口","戦い専門"],
    summary:"堅物揃いの王翦軍で唯一軽口を叩く猛将。自称「戦い専門」。",
    detail:[
      {h:"人物", body:"王翦傘下の他の将と同じく知略はあるが、自ら先陣を切れる武力を持ち、本人は「自分は戦い専門」と言い切る。"},
      {h:"誰と戦ったか", body:"朱海平原十五日目に田里弥と共伯軍に対峙。宜安戦では、包囲された桓騎軍の様子を窺っていたところで突破を図る李信たちを見つけ、救援に向かった。"},
      {h:"番吾での役割", body:"田里弥たちの尽力で亜光とともに王翦のもとへ到達し司馬尚に立ちはだかるが、敗北が決定的になると亜光から王翦を託され、守りながら撤退した。"},
      {h:"戦後", body:"王賁に王翦を託し、単身で青歌軍に赴いて糸凌の亡骸を返してもらう交渉を命懸けで行う。生きていた糸凌と再会し、カン・サロの情けで両者とも解放された。無断離脱の処罰を願い出たが不問。韓滅亡後に再編された王翦軍の第四将。存命。"}
    ],
    battles:["b_gyou","b_gian","b_bango"],
    rel:[{to:"ousen",label:"主君"},{to:"akou",label:"王翦を託される"},{to:"denrimi",label:"同僚"},{to:"shibashou",label:"交戦"},{to:"shin",label:"救援"}]
  },

  /* ═══════════ 追加: 桓騎軍 ═══════════ */
  {
    id:"ringyoku", name:"厘玉", yomi:"りんぎょく", kind:"person", state:"秦", group:"桓騎軍",
    role:"千人将 → 桓騎傘下将軍", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","騎馬隊","良識派","肥下","戦死"],
    summary:"桓騎軍の精鋭騎馬隊を率いる、曲者揃いの軍で比較的まともな男。",
    detail:[
      {h:"人物", body:"見た目は奇抜だが、桓騎軍のなかでは比較的良識派。精鋭騎馬隊の指揮官。"},
      {h:"エピソード", body:"黒羊では森林地帯で騎馬が使えず桓騎の傍らに待機。桓騎軍と飛信隊が衝突したとき、那貴と入れ替わりで桓騎軍にいた尾平を割って入らせ、同士討ちを止めた。扈輒軍との戦いでは黒桜とともに中央軍を指揮している。"},
      {h:"最期", body:"肥下の森で李牧軍を奇襲し、趙将・傅抵と一騎討ち。奇襲が失敗した後、傅抵から「一騎討ちをした誼で一思いに死なせてやる」と申し出られたが、最期は桓騎の傍にいたいからと断り、桓騎のもとへ向かって最後まで行動を共にし戦死した。"}
    ],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki",label:"配下"},{to:"kokuou",label:"同僚"},{to:"futei",label:"一騎討ち"},{to:"obei",label:"同士討ちを止める"}]
  },
  {
    id:"ogiko", name:"オギコ", yomi:"おぎこ", kind:"person", state:"秦", group:"桓騎軍",
    role:"千人将", klass:"兵", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","阿呆","伝令","桓騎の遺言"],
    summary:"なぜ千人将なのか誰にも分からない男。だが桓騎に一番近い。",
    detail:[
      {h:"人物", body:"知能に難があるとしか思えない言動で周囲を脱力させるが、桓騎からはなぜか可愛がられており千人将の地位にいる。桓騎軍の空気を象徴する存在。"},
      {h:"役割", body:"扈輒軍との戦いでは、追い詰められた雷土に桓騎の作戦を伝える伝令役を果たした。"},
      {h:"肥下での役目", body:"奇襲が崩れ始めた頃、桓騎から摩論への伝言を託されて本陣を離れ、摩論たちとともに李信のもとへ合流。桓騎の最後の言葉を李信に伝えた。桓騎軍が最後に残したものを運んだのは、この男だった。"}
    ],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki",label:"配下"},{to:"maron",label:"同僚"},{to:"shin",label:"遺言を伝える"},{to:"raido",label:"伝令"}]
  },

  /* ═══════════ 追加: 玉鳳軍 ═══════════ */
  {
    id:"banyou", name:"番陽", yomi:"ばんよう", kind:"person", state:"秦", group:"玉鳳軍",
    role:"玉鳳隊副長", klass:"武将", first:"17巻", arc:"山陽攻略戦", status:"存命",
    tags:["玉鳳","副長","王賁の教育係","老練"],
    summary:"王賁の教育係。玉鳳隊の実務を回す老練な副長。",
    detail:[
      {h:"人物", body:"王賁に心酔しているが、やや傲慢。飛信隊や楽華隊には王賁以上に辛辣な言葉を浴びせるが、内心では信と蒙恬の実力を認めている。"},
      {h:"エピソード", body:"朱海平原九日目に討たれかけたところを信に助けられ、影丘の戦いでは岳白軍に討たれかけたところを羌礼たちに助けられた。口の悪さと、助けられる回数が釣り合っていない。"},
      {h:"その後", body:"存命。"}
    ],
    battles:["b_sanyou","b_sai","b_chakuyou","b_gyou","b_gian"],
    rel:[{to:"ouhon",label:"補佐"},{to:"shin",label:"助けられる"},{to:"mouten",label:"認めている"}]
  },
  {
    id:"akakin", name:"亜花錦", yomi:"あかきん", kind:"person", state:"秦", group:"玉鳳軍",
    role:"元王翦軍将校 → 玉鳳隊", klass:"武将", first:"58巻", arc:"鄴編", status:"存命",
    tags:["玉鳳","元王翦軍","亜光の縁者","救援"],
    summary:"亜光の縁者。朱海平原で亜光の命を繋いだ横槍を入れた男。",
    detail:[
      {h:"人物", body:"元は王翦軍の将校で、後に玉鳳隊へ。亜光との縁を背負っている。"},
      {h:"エピソード", body:"朱海平原で馬南慈と尭雲に潰されかけた亜光に横槍を入れ、玉鳳隊の到着とあわせて亜光の命を繋いだ。名将の連携が崩れた場面を、格下が体を張って止めた形。"},
      {h:"その後", body:"存命。"}
    ],
    battles:["b_gyou","b_gian"],
    rel:[{to:"ouhon",label:"配下"},{to:"akou",label:"救援"},{to:"banyou",label:"同僚"}]
  },

  /* ═══════════ 追加: 趙 ═══════════ */
  {
    id:"kochou", name:"扈輒", yomi:"こちょう", kind:"person", state:"趙", group:"趙軍",
    role:"大将軍 / 趙軍総司令", klass:"武将", first:"62巻", arc:"鄴編〜平陽・武城", status:"戦死",
    tags:["趙","邯鄲の守護神","痛み","拷問","戦死"],
    summary:"「邯鄲の守護神」。痛みで自分の平衡を保つ、動じない名将。",
    detail:[
      {h:"人物", body:"かつて燕との戦線で猛威を振るった名将。何事にも動じず、顔に飾りのような物を刺して痛みを感じることで平衡を保っている。悼襄王に気に入られていたが、本人は嫌悪していた。"},
      {h:"誰と戦ったか", body:"鄴編では列尾で介億軍・騰軍と対峙し、舜水樹と列尾を死守しようとしたが増援が来ないと知って全軍を邯鄲へ引いた。その後、大将軍兼趙軍総司令として最前線に立ち、前進を強行する桓騎を討つべく出陣する。"},
      {h:"雷土への拷問", body:"捕らえた雷土に凄惨な拷問を施した。雷土は最期まで口を割らなかったが、この一件が桓騎という男の底を引きずり出すことになる。"},
      {h:"最期", body:"岳白を討った飛信隊が迫ると虎白軍を迎撃させたが、その隙を桓騎軍に突かれて本陣を急襲され、取り囲まれて討死。首を晒され、総大将の死と敵援軍の虚報で数万の扈輒兵が桓騎軍に降伏したが、その捕虜は全員処刑された。"}
    ],
    battles:["b_gyou","b_gian"],
    rel:[{to:"kanki",label:"討たれる"},{to:"raido",label:"拷問"},{to:"shunsuiju",label:"同僚"},{to:"riboku",label:"同僚"},{to:"tou",label:"交戦"}]
  },
  {
    id:"shibashou", name:"司馬尚", yomi:"しばしょう", kind:"person", state:"趙", group:"青歌軍",
    role:"趙三大天 / 青歌城城主", klass:"武将", first:"66巻", arc:"鄴編〜番吾", status:"存命",
    tags:["趙","三大天","青歌","大矛","巨漢"],
    summary:"趙の中枢を無視して青歌に籠る三大天。番吾で王翦を退けた男。",
    detail:[
      {h:"人物", body:"青歌城の城主で、カン・サロたちより長身の巨漢。得物は大矛。表向きは病弱とされるが、実際は趙国中枢を嫌って命令を全て無視しており、李牧の推挙による三大天任命さえ断って青歌から動かなかった。"},
      {h:"誰と戦ったか", body:"鄴編では燕のオルド軍二万に対し兵五千で互角に渡り合い、オルドから「大虎」と評された。李牧が邯鄲を追われた後、要請を受けて李牧軍を青歌に迎え入れる。"},
      {h:"番吾", body:"新三大天として趙中央に布陣。李牧の策で飛信隊と玉鳳隊が引き離された隙に自ら出撃し、秦中央軍を蹂躙して王翦本陣まで到達。立ちはだかった亜光を討ち取り、王翦を撤退に追い込んで勝利した。"},
      {h:"その後", body:"存命。全面戦争では青歌軍を率いて再び王翦軍と対峙する。"}
    ],
    battles:["b_gyou","b_bango"],
    rel:[{to:"riboku",label:"同格・受け入れる"},{to:"akou",label:"討ち取る"},{to:"ousen",label:"撃退"},{to:"orudo",label:"交戦"},{to:"joukaryuu",label:"配下の将"}]
  },
  {
    id:"gyouun", name:"尭雲", yomi:"ぎょううん", kind:"person", state:"趙", group:"藺家十傑",
    role:"藺家十傑 / 麾下軍「雷雲」", klass:"武将", first:"58巻", arc:"鄴編", status:"戦死",
    tags:["趙","藺家十傑","雷雲","藺相如","戦死"],
    summary:"藺相如の遺志を継ぐ本能型の猛将。王賁を一度は殺しかけた。",
    detail:[
      {h:"人物", body:"藺相如から知略を教え込まれた本能型の猛将。精鋭麾下軍「雷雲」を持つ。"},
      {h:"誰と戦ったか", body:"朱海平原三日目に左翼へ回って飛信隊と交戦し、河了貂の裏を悉くかいて優勢を作り、本陣奇襲の際には信と一騎討ちして決着つかず。十三日目には王賁を狙って「雷獄」で追い詰め、瀕死の重傷を負わせながら取り逃がした。"},
      {h:"最期", body:"その際に右腕を負傷して翌日は療養していたが、趙峩龍の最期を聞いて復帰を決意し、趙峩龍軍を吸収。仇を討つため馬南慈の指示を無視して秦軍へ突撃し、再戦した王賁に討たれて戦死。死の間際、信と王賁に藺相如から託されていた遺言を伝えた。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"ouhon",label:"討たれる"},{to:"shin",label:"一騎討ち"},{to:"chougaryuu",label:"同志"},{to:"akou",label:"重傷を負わせる"},{to:"banaji",label:"同僚"}]
  },
  {
    id:"chougaryuu", name:"趙峩龍", yomi:"ちょうがりゅう", kind:"person", state:"趙", group:"藺家十傑",
    role:"藺家十傑 / 麾下軍「土雀」", klass:"武将", first:"58巻", arc:"鄴編", status:"戦死",
    tags:["趙","藺家十傑","土雀","智将","戦死"],
    summary:"尭雲に劣らぬ武を持ちながら、知略で討つことを好んだ智将。",
    detail:[
      {h:"人物", body:"精鋭麾下軍「土雀」を持ち、朱海平原では趙軍左翼の実質的な将として策を巡らせた。武勇より策で殺すことを選ぶ。"},
      {h:"誰と戦ったか", body:"終盤、捨て身に出た飛信隊を包囲して追い詰めたが返り討ちにされ、主力を失って森へ撤退。この包囲戦で松左が命を落としている。"},
      {h:"最期", body:"兵を集めて立て直す前に那貴に発見され襲撃を受ける。兵に撤退を勧められても藺相如の遺言を胸に信と一騎討ちを選び、激闘の末に尭雲へ後を託して討ち取られ戦死した。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"shin",label:"討たれる"},{to:"gyouun",label:"後を託す"},{to:"naki",label:"発見される"},{to:"shousa",label:"交戦"}]
  },
  {
    id:"futei", name:"傅抵", yomi:"ふてい", kind:"person", state:"趙", group:"李牧軍",
    role:"三千人将 → 李牧傘下将軍", klass:"武将", first:"27巻", arc:"合従軍〜番吾", status:"存命",
    tags:["趙","双剣","李牧軍","三大天志望","カイネ"],
    summary:"三大天の座を狙う双剣使い。カイネに片想い中。",
    detail:[
      {h:"人物", body:"三大天の一角になる野望を抱く双剣使い。カイネに好意を寄せているが、いつもあしらわれている。"},
      {h:"誰と戦ったか", body:"蕞では田有と竜川を倒し信を一時圧倒したが、すぐに押し返され、復活した竜川に城壁から落とされた。山の民が現れた際は楊端和を狙ったがランカイに阻まれる。朱海平原では田里弥軍と倉央軍を突破し、馬南慈とともに王翦本陣を挟撃したが、王賁と蒙恬に止められた。"},
      {h:"肥下", body:"李牧が桓騎の奇襲で窮地に立つと引き返して死守に回り、斬り合っていた厘玉に情けで一思いに斬ることを勧めたが、厘玉が桓騎の横で死ぬことを選んだので手を引いた。"},
      {h:"その後", body:"番吾では李牧直属の遊軍として亜光に斬りかかり、囮となって李牧を逃がした。李牧とカイネの結婚を知って一人だけ不貞腐れていた。存命。"}
    ],
    battles:["b_sai","b_gyou","b_gian","b_bango"],
    rel:[{to:"riboku",label:"配下"},{to:"kaine",label:"片想い"},{to:"ringyoku",label:"一騎討ち"},{to:"ryusen",label:"交戦"},{to:"akou",label:"交戦"}]
  },
  {
    id:"shunsuiju", name:"舜水樹", yomi:"しゅんすいじゅ", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧傘下将軍 / 李牧軍副官", klass:"軍師", first:"58巻", arc:"鄴編〜", status:"存命",
    tags:["趙","智将","副官","無表情","橑陽"],
    summary:"李牧軍随一の智将。感情の乏しい顔で盤面だけを見る男。",
    detail:[
      {h:"人物", body:"李牧軍の副官で随一の智将。常に無表情だが、思考を巡らせると雰囲気が一変する。匈奴に縁がある。"},
      {h:"誰と戦ったか", body:"鄴編ではわずかな情報から秦の狙いを見抜いて李牧に報告。橑陽軍総大将として犬戎族を嗾けて楊端和と戦い、九日目に追い詰めたが、楊端和が自らを囮にした裏で猿手族に橑陽を落とされて撤退した。"},
      {h:"エピソード", body:"列尾では扈輒とともに死守を図るが、李牧の投獄と北部軍不動の知らせに激高して撤退。以後は李牧救出のためにカイネらと居所を捜索する。宜安戦では赤麗の井戸に毒を仕込む献策をした。"},
      {h:"その後", body:"番吾では趙軍右翼で楊端和と再戦。韓救援にも動いた。存命。"}
    ],
    battles:["b_gyou","b_gian","b_bango","b_shintei"],
    rel:[{to:"riboku",label:"副官"},{to:"youtanwa",label:"宿敵"},{to:"kochou",label:"共闘"},{to:"banaji",label:"同僚"},{to:"kaine",label:"共闘"}]
  },
  {
    id:"banaji", name:"馬南慈", yomi:"ばなんじ", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧傘下将軍 / 李牧軍副官", klass:"武将", first:"58巻", arc:"鄴編〜", status:"存命",
    tags:["趙","雁門の鬼人","猛将","副官"],
    summary:"「雁門の鬼人」。李牧軍随一の猛将。",
    detail:[
      {h:"人物", body:"李牧軍の副官で、軍随一の武。異名は「雁門の鬼人」。"},
      {h:"誰と戦ったか", body:"朱海平原では趙軍右翼の一角として、中盤に尭雲とともに亜光を追い詰めたが亜花錦の横槍で仕留めきれず。終盤は森を突破して王翦本陣の側面を突き、傅抵隊と挟撃して王翦を追い詰めたが、駆けつけた王賁と蒙恬に阻まれ、蒙恬に右目を斬られた。"},
      {h:"エピソード", body:"跡継ぎ争いの内乱では傅抵と邯鄲軍と戦って李牧を逃がした。宜安戦の前には李牧に伴侶を作ることを勧めている。"},
      {h:"その後", body:"番吾では趙軍右翼で楊端和軍と対峙。韓救援にも動いた。存命。"}
    ],
    battles:["b_gyou","b_gian","b_bango","b_shintei"],
    rel:[{to:"riboku",label:"副官"},{to:"akou",label:"重傷を負わせる"},{to:"mouten",label:"右目を斬られる"},{to:"gyouun",label:"共闘"},{to:"shunsuiju",label:"同僚"}]
  },
  {
    id:"rakushou", name:"楽彰", yomi:"がくしょう", kind:"person", state:"趙", group:"趙北部軍",
    role:"趙北部軍 将軍", klass:"武将", first:"70巻", arc:"宜安編", status:"存命",
    tags:["趙","趙北部軍","宜司平野","蒙恬"],
    summary:"趙北部軍の将。宜司平野で蒙恬を斬った男。",
    detail:[
      {h:"誰と戦ったか", body:"宜司平野戦で、包囲を破ろうとした秦軍にあたり、楽華軍の蒙恬を斬って負傷させた。番吾では李牧の策でフーオンとともに亜光を挟撃し、追い詰めるが左目を斬られている。"},
      {h:"その後", body:"存命。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"riboku",label:"配下"},{to:"mouten",label:"斬る"},{to:"akou",label:"交戦"}]
  },
  {
    id:"joukaryuu", name:"上和龍", yomi:"じょうかりゅう", kind:"person", state:"趙", group:"青歌軍",
    role:"青歌軍 将軍", klass:"武将", first:"71巻", arc:"宜安編", status:"戦死",
    tags:["趙","青歌軍","一撃","岳雷","ゼノウ"],
    summary:"青歌の将。岳雷を一撃で葬り、ゼノウに頭を握り潰された男。",
    detail:[
      {h:"誰と戦ったか", body:"宜司平野戦で、包囲を破ろうと錘型の陣で突っ込んできた飛信隊と衝突し、先頭にいた岳雷をただの一撃で討ち取った。激高した我呂と李信の連撃を側近の雲玄・雲慶で受け、李信に重傷を負わされる。"},
      {h:"最期", body:"倒れたゼノウが桓騎の最後の号令で息を吹き返し、その頭を掴んで握り潰されて相打ちで戦死した。"}
    ],
    battles:["b_gian"],
    rel:[{to:"gakurai",label:"討ち取る"},{to:"zenou",label:"相打ち"},{to:"shin",label:"交戦"},{to:"garo",label:"交戦"},{to:"shibashou",label:"配下"}]
  },

  /* ═══════════ 追加: 魏 ═══════════ */
  {
    id:"gaimou", name:"凱孟", yomi:"がいもう", kind:"person", state:"魏", group:"魏火龍七師",
    role:"魏火龍七師", klass:"武将", first:"52巻", arc:"著雍編", status:"存命",
    tags:["魏","魏火龍七師","剛将","現実主義","地下牢"],
    summary:"殺した武将は百を超える剛将。十四年ぶりに牢から出された男。",
    detail:[
      {h:"人物", body:"戦争とは強者が弱者を蹂躙する殺戮場であり、甘美な夢などないという持論の現実主義者。頭が良いとは言えず、優勢な状況でわざわざ自分の位置を名乗り出るような無茶をする。"},
      {h:"誰と戦ったか", body:"著雍編で十四年ぶりに地下牢から解放され、飛信隊と激突。信と壮絶な一騎討ちを繰り広げたが決着はつかず、霊凰を信に討たれた呉鳳明の撤退命令で著雍から引いた。捕らえた河了貂の答えに感心し、以後は粗略に扱わなかった。"},
      {h:"言葉", body:"王騎や廉頗は自分を恐れて一騎討ちを避けたと豪語したが、信から「志の低さで相手にされなかっただけ」と指摘されている。"},
      {h:"その後", body:"韓救援に派遣され玉鳳軍と対峙したが、新鄭陥落の報で撤退。存命。"}
    ],
    battles:["b_chakuyou","b_shintei"],
    rel:[{to:"shin",label:"一騎討ち"},{to:"gohoumei",label:"同陣営"},{to:"tenn",label:"捕虜にする"},{to:"ouhon",label:"対峙"}]
  }
,

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
      {h:"黒羊", body:"桓騎の指揮下で黒羊丘へ。将としての正しさを問われながら慶舎を討ち、五千人将となる。"},
      {h:"将軍・李信", body:"著雍の功で将軍位に到達し、以後は「李信」として軍を率いる。朱海平原では趙峩龍を討ち、最後に龐煖との一騎討ちを制するが、力を使い果たして倒れ、羌瘣の蚩尤の蘇生術で命を繋いだ。"},
      {h:"その後", body:"宜安では包囲網を破って脱出路を開き、桓騎の最後の言葉を受け取る。韓攻略戦にも参加し、統一戦争の主力の一人になっていく。"}
    ],
    battles:["b_outo","b_dakan","b_bayou","b_sanyou","b_kankoku","b_sai","b_kokuyou","b_chakuyou","b_gyou","b_gian","b_bango","b_shintei"],
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
      {h:"役割", body:"突撃一辺倒の飛信隊に、初めて戦術的な意思決定を持ち込む存在。"},
      {h:"右翼の軍師", body:"黒羊では丘右側を奪う奇策を立てて成功させ、朱海平原の後半では秦軍右翼全軍の軍師を担った。著雍編では荀早隊に囚われ、凱孟の問いに臆せず答えたことで粗略に扱われず生還している。"}
    ],
    battles:["b_outo","b_bayou","b_sanyou","b_kankoku","b_sai","b_kokuyou","b_chakuyou","b_gyou","b_gian"],
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
      {h:"帰還", body:"幽連との決着をつけ、合従軍の危機に飛信隊へ戻る。蕞では隊の中核として城壁を守り抜いた。"},
      {h:"蘇生術", body:"朱海平原で龐煖に再挑戦して再び敗れ戦闘不能になったが、龐煖を討って力を使い果たした信を救うため、蚩尤に伝わる蘇生術を行って信を復活させた。鄴攻略後に五千人将へ昇進。"}
    ],
    battles:["b_dakan","b_bayou","b_sai","b_kokuyou","b_chakuyou","b_gyou","b_gian"],
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
      {h:"継承", body:"王騎の死後、王騎軍を解散させず引き継いで将軍位に就く。山陽攻略戦では秦軍の主力の一角を担う。"},
      {h:"韓攻略の総大将", body:"始皇十七年、韓攻略の総大将として新鄭を落とし、七国で最初の一国を滅ぼした。東砂平原の会戦では韓将・眉景を討ち、洛亜完を討ち取る寸前まで迫っている。"}
    ],
    battles:["b_bayou","b_sanyou","b_kankoku","b_gyou","b_shintei"],
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
      {h:"関係", body:"信・王賁と並ぶ同世代の千人将。三者三様の指揮スタイルが山陽で比較される。"},
      {h:"臨時の将軍", body:"朱海平原初日に麻鉱が戦死したため、王翦の指示で秦軍左翼大将として臨時の将軍に昇進。紀彗を膠着状態に押し込んだ。"},
      {h:"その後", body:"宜司平野では包囲突破の際に趙北部軍の楽彰に斬られて負傷。朱海平原では馬南慈の右目を斬っている。存命。"}
    ],
    battles:["b_sanyou","b_chakuyou","b_gyou","b_gian","b_shintei"],
    rel:[{to:"moubu", label:"父"},{to:"mougou", label:"祖父"},{to:"shin", label:"好敵手"},{to:"ouhon", label:"好敵手"}]
  },
  {
    id:"ouhon", name:"王賁", yomi:"おうほん", kind:"person", state:"秦", group:"玉鳳隊",
    role:"玉鳳隊 隊長 / 千人将", klass:"武将", first:"20巻", arc:"山陽攻略戦", status:"存命",
    tags:["玉鳳隊","名門","同世代","槍"],
    summary:"名門・王一族の御曹司。矜持の高い槍の使い手。",
    detail:[
      {h:"人物", body:"名家の血を誇りにし、下僕上がりの信を露骨に見下す。ただし実力は本物で、槍働きは同世代随一。"},
      {h:"部隊", body:"騎馬中心の玉鳳隊を率い、規律と練度で戦う。飛信隊とは対照的な組織。"},
      {h:"尭雲との決着", body:"朱海平原十三日目に藺家十傑・尭雲の「雷獄」で瀕死の重傷を負わされたが、最終日の再戦で討ち取った。死の間際、尭雲から藺相如の遺言を託される。"},
      {h:"その後", body:"番吾では敗走する王翦を託されて守り抜いた。韓攻略にも参加。存命。"}
    ],
    battles:["b_sanyou","b_chakuyou","b_gyou","b_gian","b_bango","b_shintei"],
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
    role:"飛信隊 隊員", klass:"兵", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["飛信隊","戦鼓","巨漢"],
    summary:"戦鼓を打ち鳴らす巨漢の隊員。飛信隊の突撃を鼓舞する。",
    detail:[{h:"役割", body:"太鼓の音で隊の士気と進退を制御する、飛信隊独特のポジション。"}],
    battles:["b_bayou","b_sanyou","b_kokuyou","b_gyou"],
    rel:[{to:"f_hishin", label:"隊員"},{to:"shin", label:"部下"}]
  },
  {
    id:"en", name:"渕", yomi:"えん", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 副長格", klass:"兵", first:"17巻", arc:"呂不韋編", status:"存命",
    tags:["飛信隊","副長","年長"],
    summary:"年長の実務派。隊の運営を裏で支える副長格。",
    detail:[{h:"役割", body:"隊員の掌握・編成・補給といった、信が苦手な部分を引き受ける。"}],
    battles:["b_sanyou","b_chakuyou","b_kokuyou","b_gyou","b_gian","b_bango"],
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
      {h:"秦の将軍へ", body:"蕞への援軍を含む働きにより、山界の王のまま秦の将軍位に就く。王翦・桓騎と並ぶ新世代の一角。"},
      {h:"鄴編の役割", body:"橑陽攻略を任され、舜水樹に犬戎族を嗾けられて苦戦するが、自らを囮にして別働の猿手族に橑陽を落とさせて勝利。趙深部侵攻の前提を作った。"},
      {h:"その後", body:"番吾でも趙軍右翼の舜水樹・馬南慈と対峙。存命。"}
    ],
    battles:["b_outo","b_sai","b_gyou","b_bango"],
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
    battles:["b_sanyou","b_gian","b_shintei"],
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
    role:"武神", klass:"武将", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["武神","王騎","最強","因縁"],
    summary:"己を『武神』と称する怪物。王騎を討った男。",
    detail:[
      {h:"思想", body:"人としての一切を捨て、純粋な武の高みだけを求めて生きている。軍略にも兵にも興味がない。"},
      {h:"馬陽", body:"趙軍の切り札として伏せられ、王騎に致命傷を与えた。信にとっても最大の因縁の相手になる。"},
      {h:"合従軍", body:"李牧の軍に加わり函谷関へ。麃公を討ち、さらに蕞へ回って信と再び相対する。"},
      {h:"最期", body:"朱海平原。因縁の信との一騎討ちに応じ、壮絶な攻防の末に討ち取られて死亡した。人を超えた存在になるという目標のために王騎・麃公・多くの兵を屠り続けた男の終着点は、かつて自分が半殺しにした少年の刃だった。"}
    ],
    battles:["b_bayou","b_kankoku","b_sai","b_gyou"],
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
      {h:"将軍位", body:"合従軍撃退の功で正式に将軍位へ。楊端和・桓騎とともに、旧世代の後を継ぐ顔ぶれとなる。"},
      {h:"六大将軍として", body:"鄴攻略戦の総大将として趙深部に侵攻し、朱海平原十四日間の総力戦を勝ち切って鄴を落とす。この功で新六大将軍に列せられる。"},
      {h:"番吾の敗戦", body:"始皇十五年の趙北部再侵攻では、李牧の策で若手二隊を引き離され、司馬尚に本陣まで斬り込まれて敗北。麻鉱・亜光・田里弥という傘下の柱を失いながら、倉央と王賁に守られて撤退した。"}
    ],
    battles:["b_kankoku","b_gyou","b_bango"],
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
    battles:["b_kankoku","b_gyou","b_gian"],
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
      {h:"国境戦", body:"合従軍の失敗後は趙の国境防衛に回る。黒羊丘では腹心の慶舎を送り込み、秦の侵攻と削り合う。"},
      {h:"桓騎との決着", body:"始皇十四年の宜安。情報封鎖で秦軍に戦力を誤認させ、桓騎軍を趙北部へ誘い込んで包囲。肥下で桓騎の奇襲を受け右頭部を斬られる重傷を負いながら、桓騎を討ち取ることに成功した。この功で武安君に封じられる。"},
      {h:"番吾", body:"始皇十五年、王翦の再侵攻を司馬尚と迎え撃ち、飛信隊と玉鳳隊を戦場から引き離す策で秦中央を空けて勝利。秦の統一戦争に真正面から立ちはだかり続ける。"},
      {h:"その後", body:"全面戦争の直前に武安城でカイネと結婚。存命。"}
    ],
    battles:["b_kankoku","b_sai","b_kokuyou","b_gyou","b_gian","b_bango"],
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
      {h:"函谷関", body:"巨大な井闌車を投入し、難攻不落とされた函谷関の城壁を初めて越えさせた。"},
      {h:"著雍", body:"著雍防衛の総大将。凱孟・霊凰を投入して飛信隊らを迎え撃つが、信に霊凰を討たれ、自身も襲撃されると咄嗟に霊凰を身代わりにして脱出。立て直し不可能と判断して撤退した。"}
    ],
    battles:["b_kankoku","b_chakuyou"],
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
    role:"将軍 / 元野盗の頭", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["非道","奇襲","将軍位","黒羊"],
    summary:"野盗から将軍位に上り詰めた男。常識の外側から勝ちを取りにいく。",
    detail:[
      {h:"人物", body:"合従軍撃退の功で王翦・楊端和と並び将軍位に就く。飄々として底が読めず、味方でさえその判断を先読みできない。"},
      {h:"戦い方", body:"正面からぶつからず、相手が想定していない一手で盤面を壊す。そのためには住民を巻き込むことも躊躇わない。"},
      {h:"信との対立", body:"黒羊では飛信隊を指揮下に置く。勝つための非道と、信が持つ将としての線引きが真正面から衝突する。"},
      {h:"最期", body:"始皇十四年の肥下。趙北部へ誘い込まれ包囲されたなか、桓騎は森で李牧本陣を奇襲し、李牧の右頭部を斬るところまで迫った。だが趙の援軍が次々到着して奇襲は失敗。黒桜・厘玉・那貴が次々に倒れ、それでも最後まで飄々としたまま討たれ戦死した。首は李牧のもとへ。"},
      {h:"残したもの", body:"摩論とオギコに「生き残った奴らに以前みたいなクソみたいな生き方をさせるな」という言葉を託した。摩論は後に桓騎軍の残党を率いて傭兵団を始める。信にとっては、最後まで理解も肯定もできないまま消えた将になった。"}
    ],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"f_kanki", label:"総大将"},{to:"shin", label:"上官・対立"},{to:"maron", label:"配下"},{to:"raido", label:"配下"},{to:"kokuou", label:"配下"},{to:"zenou", label:"配下"},{to:"naki", label:"元配下"},{to:"ousen", label:"同格"},{to:"youtanwa", label:"同格"}]
  },
  {
    id:"maron", name:"摩論", yomi:"まろん", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の将 / 弁の立つ参謀格", klass:"軍師", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","口八丁"],
    summary:"桓騎軍で唯一まともに口が回る参謀格。",
    detail:[{h:"役割", body:"荒くれ揃いの桓騎軍で、交渉や段取りといった『言葉の仕事』を引き受ける。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"raido", name:"雷土", yomi:"らいど", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の将", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","荒くれ","忠義"],
    summary:"桓騎軍の主力を担う荒くれ。桓騎への忠義は誰よりも厚い。",
    detail:[{h:"人物", body:"見た目通りの乱暴者だが、部下と桓騎に対する情は深い。実働部隊の要。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"kokuou", name:"黒桜", yomi:"こくおう", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の弓将", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","弓","女将"],
    summary:"桓騎軍の弓を束ねる女将。遠距離から確実に将を落とす。",
    detail:[{h:"役割", body:"弓隊を率い、桓騎の奇襲に必要な『確実な一射』を担当する。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"zenou", name:"ゼノウ", yomi:"ぜのう", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の怪力", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","怪力","巨漢"],
    summary:"言葉より力で語る桓騎軍の巨漢。人間離れした膂力を持つ。",
    detail:[{h:"人物", body:"一族ぐるみで桓騎軍に属する怪力集団の頭。ぶつければ何でも壊れる、という使い方をされる。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"naki", name:"那貴", yomi:"なき", kind:"person", state:"秦", group:"飛信隊",
    role:"桓騎軍 → 飛信隊", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","飛信隊","遊撃"],
    summary:"桓騎軍から飛信隊へ移った遊撃の将。軽やかで抜け目がない。",
    detail:[
      {h:"人物", body:"桓騎軍の中では珍しく計算で動くタイプ。単独行動や偵察に長け、戦場の情報を持ち帰る。"},
      {h:"移籍", body:"黒羊での縁から飛信隊へ加わり、突撃一辺倒だった隊に『裏を取る』選択肢を増やす。"},
      {h:"最期", body:"肥下で李牧軍に包囲された桓騎らを見つけて突撃を敢行。雲玄を討ち取ったが趙兵に深傷を負い、桓騎と同じくらい李牧のすぐそばまで接近したところで息絶えた。桓騎軍を離れて飛信隊に移っていながら、最後は桓騎のもとへ戻った。"}
    ],
    battles:["b_kokuyou","b_gyou","b_gian"],
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
      {h:"黒羊", body:"慶舎を失った後の趙軍をまとめ、住民を逃がすことを最優先に動く。"},
      {h:"朱海平原", body:"初日に楽華隊と麻鉱軍に窮地へ追い込まれたが、李牧が麻鉱を討ったことで形勢逆転。麻鉱軍を壊滅させようとしたが失敗し、以後は左翼の将となった蒙恬の策で膠着状態に持ち込まれた。"}
    ],
    battles:["b_kokuyou","b_gyou"],
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
    id:"a1",
    no:"I",
    name:"下僕と王 — 王都奪還編",
    ep:"第1シリーズ 第1〜15話",
    vols:"原作 1〜5巻",
    chapters:"第1〜47話",
    era:"秦の内乱",
    sides:"嬴政・山の民 vs 成蟜・竭氏",
    result:"嬴政が王座を奪還",
    rank:"下僕 → 士官",
    quote:{t:"俺は…天下の大将軍になる男だ。", by:"信"},
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
    keys:["shin", "hyou", "sei", "tenn", "seikyou", "youtanwa", "bajio", "tajifu", "shunmen", "shoubunkun", "heki", "rankai", "saji", "ketsushi", "shiishi"],
    battles:["b_outo"],
    newcomers:["hyou", "shin", "shoubunkun", "mougou", "sei", "tenn", "ketsushi", "rankai", "seikyou", "ouki", "shiishi", "heki", "ryofui", "bajio", "tajifu", "youtanwa", "saji", "shunmen", "tou"],
    deaths:["hyou"]
  },
  {
    id:"a2",
    no:"II",
    name:"初陣 — 蛇甘平原の戦い",
    ep:"第1シリーズ 第16〜22話",
    vols:"原作 5〜7巻",
    chapters:"第48〜73話",
    era:"対魏",
    sides:"麃公軍 vs 呉慶軍",
    result:"秦の勝利",
    rank:"歩兵 → 百人将",
    quote:{t:"戦を無くすために、戦うのだ。", by:"呉慶"},
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
    keys:["shin", "kyoukai", "hyoukou", "bakukoshin", "gokei", "kan'ou", "kyuugen", "takuke", "obei", "obito", "hairou", "denyuu"],
    battles:["b_dakan"],
    newcomers:["hyoukou", "chuutetsu", "denyuu", "kyoukai", "obei", "obito", "takuke", "gokei", "hairou", "bakukoshin", "kyuugen"],
    deaths:["bakukoshin", "gokei", "kyuugen"]
  },
  {
    id:"a3",
    no:"III",
    name:"光をくれた人 — 紫夏編",
    ep:"第2シリーズ 第6〜9話",
    vols:"原作 7〜8巻",
    chapters:"第74〜81話",
    era:"政の過去（趙）",
    sides:"—",
    result:"政が秦へ帰還（紫夏の死）",
    rank:"—",
    quote:{t:"あなたは、私が生きた証。", by:"紫夏（趣意）"},
    lead:"政が趙で人質だった日々と、彼を秦へ送り届けた女商人の話。政という王の芯が明かされる短い章。",
    beats:[
      {ep:"6話", h:"趙にいた少年", body:"政は自らの過去を語り始める。人質として趙で生まれ、石を投げられ、人として扱われなかった日々。心を閉ざした少年が、なぜ『戦のない中華』を掲げるに至ったのか。"},
      {ep:"7話", h:"紫夏", body:"その少年を引き取ったのが、趙の女商人・紫夏だった。仕事として引き受けたはずの子どもを、一人の人間として扱った。政が『光』と呼ぶものの原点がここにある。"},
      {ep:"8〜9話", h:"逃避行", body:"追手をかわしながら国境を目指す逃避行。紫夏は最後に自らの命と引き換えに政を秦へ送り届ける。理想が誰かの犠牲の上に立っているという構図が、政の言葉に重さを与える。"},
      {ep:"9話", h:"残ったもの", body:"紫夏が最後に渡した言葉と、政が『光』と呼ぶものの正体。以後の政の演説はすべてここに根がある。理想が誰かの犠牲の上に立っているという構図が、彼の言葉に重さを与える。"}
    ],
    keys:["sei", "shika", "taigo"],
    battles:[],
    newcomers:["shika"],
    deaths:["shika"]
  },
  {
    id:"a4",
    no:"IV",
    name:"刺客と修行 — 暗殺者編・修行編",
    ep:"第1シリーズ 第23〜24話（暗殺者編はアニメ未放送）",
    vols:"原作 8〜10巻",
    chapters:"第82〜107話",
    era:"秦の内政 / 修行",
    sides:"—",
    result:"次の大戦への準備",
    rank:"百人将",
    quote:{t:"体は、鍛えた分しか動かねェ。", by:"信（趣意）"},
    lead:"王都に戻った政を狙う刃と、次の戦場に向けて力を蓄える期間。羌瘣という存在の異質さが少しずつ明かされる。",
    beats:[
      {ep:"—", h:"政を狙う刃", body:"王座に戻ってもなお、政の命を狙う動きは止まらない。呂不韋派の思惑が絡み、王宮の中と外で緊張が続く。政が『まだ何も持っていない王』であることが改めて突きつけられる。"},
      {ep:"—", h:"羌瘣の異質さ", body:"戦場を離れても羌瘣の強さは説明がつかない。呼吸を整えて一時的に人間離れした速度を得る『巫舞』の存在が示され、彼女が何かを背負っていることだけが分かる。"},
      {ep:"23話", h:"次の階段", body:"百人将になった信は、武功の先にあるものを意識し始める。剣の腕だけでは隊は動かせず、隊を動かせなければ将にはなれない。"},
      {ep:"24話", h:"来たる大戦の影", body:"趙が動き出す気配が濃くなる。次の戦は国境の小競り合いではなく、両国の主力がぶつかる規模になる。"}
    ],
    keys:["shin", "kyoukai", "sei", "ryofui", "moubu", "shouheikun", "risi", "saitaku", "en", "rokuomi", "kyoushou", "yuren"],
    battles:[],
    newcomers:["kyoushou", "yuren", "moubu", "risi", "saitaku", "shouheikun", "en", "rokuomi"],
    deaths:[]
  },
  {
    id:"a5",
    no:"V",
    name:"王騎の戦 — 馬陽の戦い",
    ep:"第1シリーズ 第25〜38話",
    vols:"原作 11〜16巻",
    chapters:"第108〜173話",
    era:"対趙",
    sides:"王騎軍・蒙武軍・麃公軍 vs 趙荘軍・龐煖",
    result:"趙荘を破るが王騎が戦死",
    rank:"百人将（飛信隊 結成）",
    quote:{t:"武将ってのは、そういうもんですよ。", by:"王騎（趣意）"},
    lead:"巨星の復帰と退場。飛信隊が生まれ、信の目標が『大将軍』として具体化する。",
    beats:[
      {ep:"25〜27話", h:"王騎、現る", body:"六大将軍最後の生き残り・王騎。昭王の死後は軍を退いて隠棲していたが、若い王の器を自分の目で測るために動き出す。異様な口調と、戦場全体を掌の上で転がす戦術眼を併せ持つ、格の違う存在として登場する。"},
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
    keys:["ouki", "shin", "tou", "kyou", "houken", "chousou", "bankyoku", "fuuki", "moubu", "hyoukou", "obito", "tenn", "kyogai", "f_hishin"],
    battles:["b_bayou"],
    newcomers:["choutou", "houken", "bankyoku", "denei", "kyogai", "kyou", "ryusen", "ryuyuu", "shousa", "suugen", "chousou", "fuuki", "kan'ou", "shunshinkun"],
    deaths:["ouki", "obito", "chousou", "fuuki", "bankyoku", "kyou"]
  },
  {
    id:"a6",
    no:"VI",
    name:"敵将、来訪 — 同盟編・第三勢力編",
    ep:"第2シリーズ 第1〜10話",
    vols:"原作 17〜18巻",
    chapters:"第174〜188話",
    era:"秦の内政 / 外交",
    sides:"—",
    result:"政の陣営が形になり始める",
    rank:"百人将 → 三百人将",
    quote:{t:"この国には、まだ王がいない。", by:"昌文君（趣意）"},
    lead:"王騎を失った秦に、王騎を討った男が客として現れる。戦のない章だが、以後の勢力図がここで決まる。",
    beats:[
      {ep:"1〜2話", h:"李牧、咸陽へ", body:"王騎を討った趙の李牧が、呂不韋の招きで咸陽に現れる。敵国の将を宴に招くという異常事態の裏で、大人たちの政治が動く。信は仇の顔を初めて見る。"},
      {ep:"2〜3話", h:"三百人将", body:"馬陽の功で信は三百人将へ。隊の規模が上がるほど、突撃だけでは回らない現実が見えてくる。"},
      {ep:"3〜5話", h:"王のいない王権", body:"王騎を失った秦で、相国・呂不韋の権力はさらに厚くなる。昌平君（軍）・李斯（法）・蔡沢（外交）・司馬空（土木）の四柱が実務を握り、王はまだ飾りに近い。政は親政に向けた足場を、政治の側から作り始める。"},
      {ep:"5話", h:"政と太后", body:"趙での人質時代に自分を庇わなかった母・太后との断絶が表に出る。政の抱えているものが、単なる理想論ではなく個人史に根を持つことが示される。"},
      {ep:"6〜8話", h:"河了貂の選択", body:"戦場で『自分に何ができるか』を突きつけられた河了貂は、武ではなく軍師の道を選び、昌平君の兵法学校へ入る。突撃一辺倒だった飛信隊に、初めて戦術的な意思決定が持ち込まれる準備が始まる。"},
      {ep:"8〜10話", h:"第三の勢力", body:"呂不韋派と大王派の二極に、昌平君という軍の頂点がどう動くかが加わる。政は自分の陣営を『数』ではなく『理由』で増やしていく。"},
      {ep:"10話", h:"次の階段", body:"信は三百人将を経て千人将へ。渕のような実務型を加えて隊の規模が増し、『個人の武で勝つ』段階から少しずつ離れていく。"}
    ],
    keys:["riboku", "ryofui", "shouheikun", "tenn", "sei", "shoubunkun", "heki", "risi", "saitaku", "shibakuu", "taigo", "shin", "ouhon", "mouten"],
    battles:[],
    newcomers:["ouhon", "banyou", "mouten"],
    deaths:[]
  },
  {
    id:"a7",
    no:"VII",
    name:"世代の戦 — 山陽攻略戦",
    ep:"第2シリーズ 第11〜39話",
    vols:"原作 18〜24巻",
    chapters:"第189〜256話",
    era:"対魏",
    sides:"蒙驁軍・蒙武軍・騰軍 vs 廉頗軍（四天王）",
    result:"秦の勝利（山陽陥落）",
    rank:"千人将 → 三千人将",
    quote:{t:"格が違う、というのはこういうことだ。", by:"廉頗（趣意）"},
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
    keys:["mougou", "moubu", "tou", "shin", "ouhon", "mouten", "renpa", "rinko", "genpou", "kaishibou", "kyouen", "rokuomi", "tenn"],
    battles:["b_sanyou"],
    newcomers:["renpa", "genpou", "kaishibou", "kyouen", "rinko", "kanki", "ousen", "sosui", "kokuou", "maron", "raido", "keisha", "rinbukun"],
    deaths:["rinko", "genpou"]
  },
  {
    id:"a8",
    no:"VIII",
    name:"五国、来たる — 合従軍編",
    ep:"第3シリーズ 第1〜25話",
    vols:"原作 24〜33巻",
    chapters:"第257〜356話",
    era:"対 楚・趙・魏・韓・燕",
    sides:"秦（函谷関） vs 五国連合",
    result:"秦の防衛成功（連合は崩壊）",
    rank:"三千人将",
    quote:{t:"ここは、俺たちの国だ。", by:"嬴政（趣意）"},
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
    keys:["sei", "shin", "kyoukai", "tenn", "shouheikun", "moubu", "tou", "ousen", "choutou", "hyoukou", "heki", "youtanwa", "riboku", "houken", "kaine", "shunshinkun", "kanmei", "rinbukun", "seikai", "orudo", "gohoumei", "kanto"],
    battles:["b_kankoku", "b_sai"],
    newcomers:["gohoumei", "kanmei", "orudo", "seikai", "ogiko", "futei", "gakurai", "garo"],
    deaths:["hyoukou", "choutou", "kanmei", "rinbukun", "seikai"]
  },
  {
    id:"a9",
    no:"IX",
    name:"仇討ちの果て — 羌瘣の復讐編",
    ep:"第3シリーズ 第25〜26話",
    vols:"原作 33〜34巻",
    chapters:"第357〜365話",
    era:"羌瘣の過去",
    sides:"羌瘣 vs 幽連",
    result:"羌瘣が復讐を終える",
    rank:"三千人将",
    quote:{t:"一緒に里を出よう。", by:"羌象"},
    lead:"合従軍を退けた直後、羌瘣が最後の始末をつける章。飛信隊の一員が、ようやく過去から解放される。",
    beats:[
      {ep:"25話", h:"羌瘣の離隊", body:"羌瘣は仇を討つために飛信隊を離れる。巫舞という秘技が寿命を削る代償の上に成り立っていることも明かされ、彼女が何を捨てて戦っていたのかが見えてくる。"},
      {ep:"25話", h:"蚩尤の里", body:"数十年に一度、一族の精鋭が殺し合って『蚩尤』の座を継ぐ儀式。姉のように慕った羌象と交わした、二人で里を出るという約束。羌瘣の芯にあるものが回想として描かれる。"},
      {ep:"26話", h:"幽連との決着", body:"羌象を手にかけた幽連との死闘。復讐が終わったあと、羌瘣に残るのは目的のない自由と、帰る場所としての飛信隊だった。"},
      {ep:"26話", h:"帰る場所", body:"復讐が終わったあとに残るのは、目的のない自由と、帰る場所としての飛信隊だった。以後の羌瘣は『誰かのために戦う』側に立つ。"}
    ],
    keys:["kyoukai", "kyoushou", "yuren", "shin", "tenn", "f_shiyuu"],
    battles:[],
    newcomers:[],
    deaths:["yuren"]
  },
  {
    id:"a10",
    no:"X",
    name:"王とは何か — 朝廷の陰謀編",
    ep:"第4シリーズ 第1〜5話",
    vols:"原作 34〜35巻",
    chapters:"第366〜378話",
    era:"秦の内政",
    sides:"嬴政 vs 呂不韋",
    result:"決着はつかず、勝負は先送り",
    rank:"三千人将",
    quote:{t:"国は、金で回る。", by:"呂不韋"},
    lead:"戦場を離れ、王と相国が言葉だけで殴り合う。武力ではなく理屈で決する、この作品では珍しい種類の対決。",
    beats:[
      {ep:"1〜2話", h:"正面からの論戦", body:"山陽を落として勢いに乗る秦で、政と呂不韋がついに面と向かって国のあり方を論じる。金と力で回すのか、それとも別の原理か。武ではなく言葉で決する、この作品では珍しい種類の対決。"},
      {ep:"2〜3話", h:"呂不韋という壁", body:"商人から相国に上り詰めた男の論は、理想論では崩せない。政は自分の理念を、相手の土俵である『国の運営』の言葉で語り直さなければならない。"},
      {ep:"4話", h:"呂不韋の答え", body:"呂不韋は理想を頭ごなしに否定しない。そのうえで『国は金で回る』と返す。どちらも自分の論に一分の隙もないまま、決着は先送りされる。"},
      {ep:"4〜5話", h:"朝廷の陰謀", body:"呂不韋派は政の親政を止めるため、王宮の外側から手を回す。太后という切り札の存在が、次の章の火種になる。"},
      {ep:"5話", h:"嵐の前", body:"膨張を続ける秦に対し、中華全土で包囲の動きが始まっていた。次の章でそれが形になる。"}
    ],
    keys:["sei", "ryofui", "shika", "shoubunkun", "shouheikun", "taigo", "risi", "saitaku", "shibakuu"],
    battles:[],
    newcomers:[],
    deaths:[]
  },
  {
    id:"a11",
    no:"XI",
    name:"火竜、立つ — 魏火竜七師編",
    ep:"第4シリーズ 第6〜13話",
    vols:"原作 35〜37巻",
    chapters:"第379〜401話",
    era:"対魏",
    sides:"秦軍 vs 魏火竜七師",
    result:"秦の勝利",
    rank:"三千人将",
    quote:{t:"俺は、強い奴とやりたいだけだ。", by:"凱孟（趣意）"},
    lead:"魏がかつての最強世代『火竜七師』を再び戦場に出す。飛信隊は格上の武将と正面から噛み合う。",
    beats:[
      {ep:"6〜7話", h:"魏の反攻", body:"山陽を失った魏が反撃に出る。秦が押し込む一方だった構図が崩れ、国境の均衡が揺れる。"},
      {ep:"7〜9話", h:"火竜七師", body:"呉慶と同時代に魏の中核を担った猛将たちが再び前線に立つ。個の武と経験で押してくる相手に、若い世代の秦軍がどこまで通じるかが問われる。"},
      {ep:"9〜11話", h:"信 対 凱孟", body:"飛信隊が当たったのは、武を楽しむために戦う男・凱孟。理屈でも大義でもなく『強い奴と斬り合いたい』という単純な動機が、信の価値観を逆から照らす。"},
      {ep:"11〜13話", h:"決着", body:"秦が戦を制し、魏の旧世代がまた一枚落ちる。飛信隊は三千人将の隊として、格上と噛み合っても崩れない練度を証明した。"}
    ],
    keys:["shin", "gaimou", "tenn", "kyoukai", "moubu", "tou", "mouten", "ouhon"],
    battles:[],
    newcomers:["gaimou", "makou"],
    deaths:[]
  },
  {
    id:"a12",
    no:"XII",
    name:"王の親政 — 愛編（屯留の乱）",
    ep:"第4シリーズ 第13〜25話",
    vols:"原作 37〜40巻",
    chapters:"第402〜437話",
    era:"秦の内乱",
    sides:"嬴政派 vs 太后・嫪毐／呂不韋",
    result:"親政の確立（成蟜の死）",
    rank:"三千人将 → 五千人将（黒羊へ）",
    quote:{t:"兄上…先に行きます。", by:"成蟜（趣意）"},
    lead:"政が実権を握るまでの最後の内政戦。血統に固執していた弟が、最後に秦の王族としての務めを選ぶ。",
    beats:[
      {ep:"13〜15話", h:"加冠の儀へ", body:"政が正式に親政を始めるための儀式が近づく。呂不韋派は最後の抵抗として、王宮の外に別の権力の芯を作ろうとする。"},
      {ep:"15〜18話", h:"太后と嫪毐", body:"母・太后が担いだ嫪毐が独自の勢力を築き、秦の内側に『別の国』のような塊ができる。政と母の断絶が、政治の問題として表に出てくる。"},
      {ep:"18〜22話", h:"屯留の反乱と成蟜", body:"疲弊した秦の隙を突く形で屯留に反乱が起きる。鎮圧に向かったのは、かつて政の王座を狙った王弟・成蟜だった。血統に固執していた男が最後に秦の王族としての務めを選び、命を落とす。政にとって重い回収になる。"},
      {ep:"22〜23話", h:"呂不韋の失脚", body:"一連の騒乱の責を負い、相国・呂不韋は権力の座から降りる。序盤から政の前に立ち続けた最大の壁が退場し、秦はようやく王の国になる。"},
      {ep:"23〜24話", h:"蒙驁の死", body:"山陽を落とした老将・蒙驁が、老いに勝てず陣中で世を去る。蒙武・蒙恬という三代が並んだ家の、いちばん上が抜ける。旧世代の退場が続く。"},
      {ep:"24〜25話", h:"戦後の秦", body:"合従軍撃退の功で、王翦・楊端和・桓騎が将軍位に就く。六大将軍のような絶対的な制度ではないが、旧世代の後を継ぐ顔ぶれがここで固まる。飛信隊も三千人将の隊として次の戦場を待つ。"}
    ],
    keys:["sei", "taigo", "seikyou", "ryofui", "shoubunkun", "shouheikun", "mougou", "ousen", "youtanwa", "kanki", "shin"],
    battles:["b_tonryu"],
    newcomers:[],
    deaths:["seikyou", "mougou"]
  },
  {
    id:"a13",
    no:"XIII",
    name:"どう勝つか — 黒羊丘の戦い",
    ep:"第4シリーズ 第26話 〜 第5シリーズ 第13話",
    vols:"原作 41〜45巻",
    chapters:"第438〜484話",
    era:"対趙 / 桓騎の下で",
    sides:"桓騎軍・飛信隊 vs 慶舎軍・紀彗軍",
    result:"秦の勝利（黒羊丘を奪取）",
    rank:"三千人将 → 五千人将",
    quote:{t:"勝てば官軍だ。", by:"桓騎（趣意）"},
    lead:"世代が入れ替わり、信は初めて『勝ち方』そのものを問われる。桓騎という異物が突きつける問い。",
    beats:[
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
    keys:["shin", "kanki", "tenn", "kyoukai", "naki", "maron", "raido", "kokuou", "zenou", "keisha", "kisui", "riboku", "mougou", "seikyou", "ousen", "youtanwa", "f_kanki"],
    battles:["b_kokuyou"],
    newcomers:["naki", "ringyoku", "kisui", "zenou", "banaji", "shunsuiju"],
    deaths:["keisha", "ringyoku"]
  },
  {
    id:"a14",
    no:"XIV",
    name:"城を回す — 官吏編",
    ep:"第5シリーズ 第13話 〜 第6シリーズ 第2話",
    vols:"原作 45〜46巻",
    chapters:"第485〜495話",
    era:"戦後の統治",
    sides:"—",
    result:"次の大戦（西方趙侵攻）の下地",
    rank:"五千人将",
    quote:{t:"戦は、取った後の方が長い。", by:"（趣意）"},
    lead:"奪った土地をどう回すか。剣ではなく書類の章だが、国を大きくするとは何かが具体的に描かれる。",
    beats:[
      {ep:"13話", h:"取った土地の後始末", body:"黒羊を得た秦は、そこを『使える土地』に変えなければならない。戦果は占領した瞬間ではなく、税と人が動き出して初めて国力になる。"},
      {ep:"1〜2話（第6期）", h:"官吏の仕事", body:"飛信隊の面々が行政の実務に触れる。数字と手続きの世界は突撃と正反対だが、河了貂のような頭脳には別の武器になる。"},
      {ep:"2話（第6期）", h:"次の盤面", body:"昌平君の軍総司令部では、すでに趙への大規模侵攻が設計されている。列尾、そして鄴。次章の構図がここで示される。"}
    ],
    keys:["shin", "tenn", "obei", "en", "shouheikun", "sei", "kanto"],
    battles:[],
    newcomers:["kanto"],
    deaths:[]
  },
  {
    id:"a15",
    no:"XV",
    name:"国盗り — 鄴攻略戦（西方趙侵攻）",
    ep:"第6シリーズ 第2話〜（放送中）",
    vols:"原作 46〜59巻",
    chapters:"第496〜642話",
    era:"対趙",
    sides:"王翦軍・桓騎軍・楊端和軍・飛信隊 vs 李牧軍・趙峩龍・尭雲・傅抵",
    result:"秦の勝利（鄴を含む趙西方を奪取）",
    rank:"五千人将 → 将軍",
    quote:{t:"ここを取れば、中華の形が変わる。", by:"昌平君（趣意）"},
    lead:"城ひとつではなく『地方まるごと』を取りに行く、規模が一段変わった戦い。信が将軍位に届く章。",
    beats:[
      {ep:"2〜4話", h:"昌平君の構想", body:"目的は城の奪取ではなく、趙の西方を面で削ぎ取ること。列尾を抜き、その先の大都市・鄴を落とせば、趙の国力そのものが傾く。総大将は王翦。"},
      {ep:"4〜7話", h:"三つの軍", body:"王翦・桓騎・楊端和という毛色の違う将が同じ作戦に並び、その下に飛信隊・玉鳳隊・楽華隊が入る。秦軍が『個の将の軍』から『組織』へ変わっていく過程でもある。"},
      {ep:"7〜11話", h:"兵糧という敵", body:"深く入り込むほど補給線が伸び、冬と飢えが敵になる。剣ではどうにもならない条件下で、王翦の計算と楊端和の山越えが物を言う。"},
      {ep:"11〜", h:"朱海平原", body:"趙軍の主力を率いる李牧との決戦。左翼・中央・右翼で別々の戦いが同時に転がり、飛信隊は趙峩龍・尭雲という藺家十傑を相手に消耗戦を強いられる。"},
      {ep:"—", h:"龐煖との決着", body:"王騎を討ち、麃公を討った武神と、信が最後に向き合う。師二人の分を背負った一騎打ちが、この長い因縁の終着点になる。"},
      {ep:"—", h:"鄴、陥落", body:"趙の西方が秦の手に落ちる。犠牲は大きく、飛信隊も古参を失うが、信はこの戦の功で将軍位に届く。以後は『李信』として軍を率いる。"}
    ],
    keys:["shin", "ousen", "kanki", "youtanwa", "riboku", "houken", "chougaryuu", "gyouun", "futei", "banaji", "shunsuiju", "kisui", "mouten", "ouhon", "tenn", "kyoukai", "akou", "makou", "denrimi", "shibashou", "kochou"],
    battles:["b_gyou", "b_chakuyou"],
    newcomers:["kochou", "shibashou", "akou", "chougaryuu", "gyouun", "denrimi", "akakin"],
    deaths:["houken", "gyouun", "chougaryuu", "akou", "makou", "denrimi"]
  },
  {
    id:"a16",
    no:"XVI",
    name:"間の章 — 趙の内乱・三国戦・蚩尤",
    ep:"アニメ未放送",
    vols:"原作 59〜62巻",
    chapters:"第643〜670話",
    era:"対楚 / 趙の内政",
    sides:"秦・魏連合 vs 楚",
    result:"秦が楚の要衝を落とす",
    rank:"将軍",
    quote:{t:"戦をしていない時間も、戦の一部だ。", by:"（趣意）"},
    lead:"鄴の後、両国が体勢を組み替える期間。趙は内側から崩れかけ、秦は別の方向へ刃を向ける。",
    beats:[
      {ep:"—", h:"趙の危機", body:"鄴を失った趙は内部が乱れ、李牧は幽閉され処刑寸前まで追い込まれる。王の代替わりが趙という国の性格を変えていく。"},
      {ep:"—", h:"秦・魏の同盟", body:"三年の同盟を結んだ秦と魏が、楚の要衝を共同で攻める。蒙武が楚の猛将・満羽と真正面からぶつかり、武で押し切る将の到達点が描かれる。"},
      {ep:"—", h:"蚩尤、再び", body:"羌瘣を名指しで訪ねてくる蚩尤族の剣士が現れる。終わったはずの過去が、別の形で飛信隊の前に戻ってくる。"}
    ],
    keys:["riboku", "moubu", "kyoukai", "shin", "f_shiyuu", "f_so"],
    battles:[],
    newcomers:[],
    deaths:[]
  },
  {
    id:"a17",
    no:"XVII",
    name:"六大将軍、復活 — 平陽・武城攻略戦",
    ep:"アニメ未放送",
    vols:"原作 62〜64巻",
    chapters:"第671〜701話",
    era:"対趙",
    sides:"桓騎軍・飛信隊 vs 扈輒軍",
    result:"秦の勝利（邯鄲へ王手）",
    rank:"将軍",
    quote:{t:"六大将軍を、復活させる。", by:"嬴政（趣意）"},
    lead:"昭王の時代の制度が戻り、将軍たちが王の許可を待たずに動けるようになる。趙の首都・邯鄲が射程に入る章。",
    beats:[
      {ep:"—", h:"制度の復活", body:"政は六大将軍を復活させ、選ばれた将に独断で戦を起こす権限を与える。速度と裁量を得た秦軍は、一気に趙の内側へ踏み込む。"},
      {ep:"—", h:"平陽・武城", body:"邯鄲の目前に残る二つの城が標的になる。守るのは『邯鄲の守護神』と呼ばれる大将軍・扈輒。"},
      {ep:"—", h:"桓騎の戦い方", body:"飛信隊は再び桓騎の戦場に呼ばれる。黒羊で衝突した価値観の差を抱えたまま、同じ勝利のために動くという居心地の悪さがついて回る。"},
      {ep:"—", h:"結果", body:"扈輒を破り、秦は趙の心臓の一歩手前まで到達する。だがこの勝ちが、次の章の反動を呼ぶ。"}
    ],
    keys:["kanki", "shin", "kochou", "riboku", "ousen", "moubu", "tou", "youtanwa", "ouhon", "mouten"],
    battles:[],
    newcomers:["rakushou"],
    deaths:["kochou"]
  },
  {
    id:"a18",
    no:"XVIII",
    name:"将の死 — 宜安・肥下の戦い",
    ep:"アニメ未放送",
    vols:"原作 65〜70巻",
    chapters:"第702〜768話",
    era:"対趙",
    sides:"桓騎軍・秦軍 vs 李牧軍",
    result:"趙の勝利（桓騎軍壊滅）",
    rank:"将軍",
    quote:{t:"…ここまでか。", by:"桓騎（趣意）"},
    lead:"押し切れると思った瞬間に、李牧が盤面をひっくり返す。秦がこの物語で最も重い敗北を負う章。",
    beats:[
      {ep:"—", h:"李牧の復権", body:"処刑寸前だった李牧が軍に戻り、秦の進軍を正面から止めにかかる。王翦と昌平君は決戦場の設定を組み替えざるを得なくなる。"},
      {ep:"—", h:"宜安", body:"選ばれた決戦地で、桓騎軍が李牧の描いた形に呑まれていく。読み合いで一枚上を取られた側がどうなるかが、容赦なく描かれる。"},
      {ep:"—", h:"桓騎軍の壊滅", body:"雷土、黒桜、ゼノウ——黒羊から見てきた顔が次々に落ち、最後に桓騎自身が討たれる。勝ち方を問われ続けた男の退場が、信に別の答えを残す。"},
      {ep:"—", h:"国の空気", body:"六大将軍の一人を失った秦は重い空気に包まれる。政は信と騰を韓へ送り、思想家・韓非子を招くという別の一手を打つ。"}
    ],
    keys:["kanki", "raido", "kokuou", "zenou", "maron", "riboku", "shibashou", "ousen", "shouheikun", "shin", "tou", "joukaryuu", "rakushou"],
    battles:["b_gian"],
    newcomers:[],
    deaths:["kanki", "raido", "kokuou", "zenou", "joukaryuu"]
  },
  {
    id:"a19",
    no:"XIX",
    name:"立て直し — 番吾攻防戦と三本の柱",
    ep:"アニメ未放送",
    vols:"原作 71〜74巻",
    chapters:"第769〜812話",
    era:"対趙 / 軍制改革",
    sides:"秦総動員 vs 李牧・司馬尚",
    result:"趙の勝利（秦は撤退）",
    rank:"将軍",
    quote:{t:"負けた戦から、何を持ち帰るか。", by:"（趣意）"},
    lead:"宜安の借りを返すための総力戦。結果は届かず、秦は勝ち方そのものを設計し直すことになる。",
    beats:[
      {ep:"—", h:"総動員", body:"名誉を取り戻すため、秦は全戦力を番吾に集める。飛信隊も大幅に増員され、隊の顔ぶれが入れ替わった状態で最大規模の決戦に臨む。"},
      {ep:"—", h:"番吾", body:"李牧と司馬尚という趙の最良の二枚が揃い、秦は真正面から受け止め切れない。個の武でも数でも押せない相手に、初めて『届かない』を突きつけられる。"},
      {ep:"—", h:"撤退", body:"秦は退く。二年続けて趙に敗れ、中華統一という言葉の距離が現実として見える。"},
      {ep:"—", h:"三本の柱", body:"昌平君は敗因を制度の問題として捉え、軍を作り直すための三つの柱を打ち出す。信と騰はその三本目を実現するために動き出す。"}
    ],
    keys:["riboku", "shibashou", "shouheikun", "shin", "tou", "ousen", "moubu", "youtanwa", "ouhon", "mouten", "tenn", "kyoukai"],
    battles:["b_bango"],
    newcomers:[],
    deaths:[]
  },
  {
    id:"a20",
    no:"XX",
    name:"最初の一国 — 韓攻略戦",
    ep:"アニメ未放送",
    vols:"原作 75〜77巻",
    chapters:"第813〜844話",
    era:"対韓",
    sides:"秦軍（騰・信） vs 韓軍",
    result:"秦の勝利（韓滅亡・新鄭陥落）",
    rank:"将軍",
    quote:{t:"一国、落とす。", by:"（趣意）"},
    lead:"六国のうち最初の一国が地図から消える章。中華統一が理念から現実の手続きに変わる。",
    beats:[
      {ep:"—", h:"南陽から新鄭へ", body:"秦軍は南陽を起点に韓の首都・新鄭を目指す。狙いは殲滅ではなく、被害を最小にして国を丸ごと接収すること。"},
      {ep:"—", h:"韓の第一将・第二将", body:"小国ながら韓にも守る将がいる。彼らの抵抗の描かれ方が、『滅ぼされる側の国』という視点を物語に持ち込む。"},
      {ep:"—", h:"新鄭陥落", body:"韓は滅び、秦は初めて一国を版図に加える。政が掲げてきた中華統一が、比喩ではない事実として一歩進む。"},
      {ep:"—", h:"次は趙", body:"韓を得た秦の次の標的は、二度敗れた相手。全面戦争の準備が始まる。"}
    ],
    keys:["tou", "shin", "sei", "shouheikun", "f_kan", "soou"],
    battles:["b_shintei"],
    newcomers:["soou"],
    deaths:[]
  },
  {
    id:"a21",
    no:"XXI",
    name:"全面戦争 — 秦趙の総力戦（進行中）",
    ep:"アニメ未放送",
    vols:"原作 78巻〜",
    chapters:"第845話〜",
    era:"対趙",
    sides:"秦国連合軍 vs 李牧・司馬尚の防衛線",
    result:"（連載中）",
    rank:"将軍",
    quote:{t:"中華統一へ、本格始動。", by:"（第6シリーズ 予告文）"},
    lead:"二度負けた相手に、国の全部を賭けて挑む章。原作で現在進行中の最前線。",
    beats:[
      {ep:"—", h:"趙、全面戦争", body:"韓を落とした秦が、いよいよ趙そのものを取りに動く。局地戦の積み上げではなく、国と国が総力でぶつかる形になる。"},
      {ep:"—", h:"鉄壁の防衛線", body:"李牧と司馬尚が組み上げた守りは、これまでの秦の勝ち筋をすべて塞いでいる。数でも速度でも抜けない盤面をどう崩すかが焦点。"},
      {ep:"—", h:"ここが現在地", body:"このDBの収録はここまで。以降は連載の進行に合わせて追記していく。"}
    ],
    keys:["shin", "riboku", "shibashou", "ousen", "tou", "moubu", "youtanwa", "ouhon", "mouten", "sei", "shouheikun", "kyoukai", "tenn"],
    battles:[],
    newcomers:[],
    deaths:[]
  }
  ]
};

if (typeof module !== "undefined") { module.exports = KINGDOM; }

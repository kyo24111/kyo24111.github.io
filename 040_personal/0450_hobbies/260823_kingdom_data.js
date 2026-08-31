/* ============================================================
   キングダム リサーチDB — データ定義
   収録範囲: 単行本1巻 〜 全面戦争編（原作80巻台）。ネタバレ制限なし。
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
    note: "⚠ ネタバレ制限なし。黒羊丘以降（鄴・宜安/肥下・番吾・韓攻略・全面戦争）の展開と、存命キャラの最期まで含みます。2026-08-30に人物101→212名へ拡張（趙王族・青歌軍・扈輒三公・魏火龍七師・毐国・韓/斉/代・砂鬼一家など）、戦い6件・勢力15件を追加。巻数・話数は目安です。",
    updated: "2026-08-30"
  },

  /* 顔画像: kingdom_faces/<node id>.jpg があるノードの一覧。
     出典は Fandom Wiki のキャラクター記事（アニメ立ち絵／原作コマ）。著作権は原泰久／集英社および
     各アニメ製作委員会に帰属。ページ側にクレジットを記載し、noindex で公開している。
     画像が無い環境では頭文字アバターに自動フォールバックする。 */
  faces: {
    dir: "kingdom_faces/",
    ids: ["akakin", "akou", "bajio", "bakukoshin", "banaji", "bankyoku", "banyou", "chougaryuu",
      "chousou", "choutou", "chuutetsu", "denei", "denrimi", "denyuu", "en", "futei",
      "fuuki", "gaimou", "gakurai", "garo", "gekishin", "genpou", "genu", "gohoumei",
      "gokei", "goumasho", "gyouun", "hairou", "hakurei", "heki", "houken", "hyou",
      "hyoukou", "kaine", "kaishibou", "kan'ou", "kanki", "kanmei", "kanpishi", "kanto",
      "karin", "keisha", "ketsushi", "kisui", "kochou", "kokuou", "kouyoku", "kyogai",
      "kyou", "kyouen", "kyoukai", "kyoushou", "kyuugen", "makou", "manu", "maron",
      "moubu", "mougou", "mouten", "naki", "obei", "obito", "ogiko", "orudo",
      "ouhon", "ouki", "ousen", "raido", "rakushou", "rankai", "renpa", "riboku",
      "rinbukun", "ringyoku", "rinko", "risi", "rokuomi", "ryofui", "ryusen", "ryuyuu",
      "saitaku", "saji", "sei", "seikai", "seikyou", "sentoun", "shibashou", "shiishi",
      "shika", "shin", "shoubunkun", "shouheikun", "shousa", "shunmen", "shunshinkun", "shunsuiju",
      "soou", "sosui", "suugen", "tajifu", "takuke", "tenn", "tou", "youtanwa",
      "yuren", "zenou"]
  },

  /* 人物プロフィール（node id → 詳細）
     出典: キングダム Fandom Wiki の各記事インフォボックス＋公式ガイドブックの能力値
     （str=武力 / ldr=指揮力 / int=知力 / exp=経験 / Charisma=魅力）、CVはアニメ公式サイト優先。
     stats の "＋" は公式表記の伸びしろ記号。src は参照した記事タイトル。 */
  profiles: {
    "joukaryuu": {gender:"男", rank:"将軍", cls:"武将", src:"Jou Ka Ryuu"},
    "shibakuu": {gender:"男", cls:"文官（呂氏四柱）", src:"Shiba Kuu"},
    "taigo": {cv:"坪井木の実", gender:"女", rank:"太后", cls:"王族", src:"Zhao Ji"},
    "shukyou": {cls:"刺客集団", src:"Shu Kyou"},
    /* 追加分（出典: Wikipedia「キングダムの登場人物一覧」。能力値は公式ガイドブック未収録のため省略） */
    "rinshoujo": {cv:"置鮎龍太郎", gender:"男", rank:"大将軍", cls:"旧・趙三大天", src:"Rin Shou Jo"},
    "kakukai": {cv:"ふくまつ進紗", gender:"男", rank:"大臣 → 宰相", cls:"文官", src:"Kaku Kai"},
    "youka": {cv:"宮内敦士", gender:"男", cls:"文官 / 間諜", src:"You Ka"},
    "toujouou": {cv:"郷田ほづみ", gender:"男", rank:"趙王（第九代）", cls:"王族", src:"King Daoxiang"},
    "ka": {cv:"石橋陽彩", gender:"男", rank:"趙太子", cls:"王族", src:"Jia"},
    "yuubokuou": {gender:"男", rank:"趙王（第十代）", cls:"王族", src:"King Youmiu"},
    "choukihaku": {cv:"佐々木勝彦", gender:"男", rank:"鄴城主", cls:"王族", src:"Chou Ki Haku"},
    "kansaro": {gender:"男", rank:"将軍", cls:"武将 / 側近筆頭", src:"Kan Saro"},
    "jiaga": {gender:"男", rank:"将軍", cls:"武将", arms:"鎚", src:"Ji Aga"},
    "donsari": {gender:"男", rank:"将軍", cls:"武将", src:"Don Sari"},
    "fuon": {gender:"男", rank:"五千人将", cls:"武将", arms:"曲刀", src:"Fuon"},
    "gakuei": {cv:"松本忍", gender:"男", rank:"将軍", cls:"武将 / 騎兵", src:"Gaku Ei"},
    "kinmou": {cv:"拝真之介", gender:"男", rank:"将軍", cls:"武将 / 騎兵", src:"Kin Mou"},
    "shoumou": {cv:"水島裕", gender:"男", rank:"将軍", cls:"武将 / 騎兵", arms:"月牙鏟", epithet:"破壊の渉孟", src:"Shou Mou"},
    "rihaku": {cv:"桐本琢也", gender:"男", rank:"将軍", cls:"武将", epithet:"守備の李白", src:"Ri Haku"},
    "kousonryuu": {cv:"斉藤次郎", gender:"男", rank:"将軍 → 文官", cls:"武将 / 軍師", epithet:"万能の公孫龍", src:"Kou Son Ryuu"},
    "batei": {cv:"三宅健太", gender:"男", rank:"将軍", cls:"武将 / 騎兵", src:"Ba Tei"},
    "ryuutou": {cv:"川原慶久", gender:"男", rank:"将軍", cls:"武将 / 軍師", src:"Ryuu Tou"},
    "kishou": {cv:"大塚芳忠", gender:"男", rank:"離眼城主", cls:"武将", src:"Ki Shou"},
    "gakuhaku": {gender:"男", rank:"将軍", cls:"武将（扈輒三公）", src:"Gaku Haku"},
    "ryuuhaku": {gender:"男", rank:"将軍", cls:"武将（扈輒三公）", src:"Ryuu Haku"},
    "kohaku": {gender:"男", rank:"将軍", cls:"武将（扈輒三公）", src:"Ko Haku"},
    "kotsuminhaku": {gender:"男", rank:"将軍", cls:"武将", src:"Kotsu Min Haku"},
    "bafuuji": {gender:"男", rank:"五千将 → 将軍", cls:"武将", src:"Ba Fuu Ji"},
    "seikaun": {gender:"男", cls:"弓兵（中華十弓 現一位）", arms:"弓", src:"Sei Ka Un"},
    "gika": {gender:"男", cls:"弓兵（中華十弓）", arms:"弓", src:"Gi Ka"},
    "shinseijou": {cv:"巻島康一", gender:"男", rank:"将軍 / 副将", cls:"武将", src:"Shin Sei Jou"},
    "kouhaku": {gender:"男", rank:"将軍", cls:"武将", src:"Kou Haku"},
    "raihaku": {gender:"男", rank:"将軍", cls:"武将", src:"Rai Haku"},
    "rozo": {cv:"立木文彦", gender:"男", rank:"橑陽城主 / 犬戎族王", cls:"武将", src:"Rozo"},
    "gakujou": {gender:"男", rank:"大将軍", cls:"武将", src:"Gaku Jou"},
    "choukatsu": {cv:"高橋英則", gender:"男", rank:"大将軍", cls:"武将", src:"Chou Katsu"},
    "mouki": {cv:"市川太一", gender:"男", cls:"軍師", src:"Mou Ki"},
    "ryuukoku": {cv:"加藤亮夫", gender:"男", rank:"将軍", cls:"軍師 / 部隊長", src:"Ryuu Koku"},
    "rinbou": {gender:"男", rank:"第三軍長", cls:"武将 / 騎兵", arms:"矛", src:"Rin Bou"},
    "doukin": {gender:"男", rank:"第五軍長", cls:"武将", src:"Dou Kin"},
    "kanjou": {cv:"丹沢晃之", gender:"男", rank:"千人将 → 将軍", cls:"武将", src:"Kan Jou"},
    "shoutaku": {cv:"柳田淳一", gender:"男", cls:"武将", src:"Shou Taku"},
    "kyuukou": {cv:"かぬか光明", gender:"男", cls:"武将", src:"Kyuu Kou"},
    "shiryou": {gender:"女", rank:"将校 / 副官", cls:"武将 / 騎兵", arms:"双剣", src:"Shi Ryou"},
    "dansa": {gender:"男", rank:"将軍", cls:"武将", src:"Dan Sa"},
    "gunei": {gender:"男", rank:"将軍 / 副官", cls:"武将", src:"Gu Nei"},
    "aisen": {gender:"男", rank:"五千人将 → 将軍", cls:"武将", src:"Ai Sen"},
    "rikusen": {cv:"大西弘祐", gender:"男", rank:"五千人将 → 将軍", cls:"武将", arms:"槍", src:"Riku Sen"},
    "kozen": {cv:"山本満太", gender:"男", rank:"副長", cls:"武将", src:"Ko Zen"},
    "kyourei": {gender:"女", cls:"武将 / 蚩尤", arms:"白鳳", src:"Kyou Rei"},
    "kyoushiki": {gender:"女", cls:"蚩尤候補", src:"Kyou Shiki"},
    "soujin": {cv:"小村将", gender:"男", rank:"百人将", cls:"弓兵", arms:"弓", src:"Sou Jin"},
    "soutan": {cv:"林大地", gender:"男", rank:"五十人将", cls:"弓兵", arms:"弓", src:"Sou Tan"},
    "sougen": {gender:"男", cls:"弓兵（中華十弓）", arms:"弓", src:"Sou Gen"},
    "kou": {cv:"奥村翔", gender:"男", rank:"歩兵 → 百将", cls:"歩兵", src:"Kou"},
    "iou": {gender:"女", cls:"砂鬼一家 首領", src:"Io"},
    "shio": {gender:"女", cls:"砂鬼一家 先代首領", src:"Shio"},
    "shou": {gender:"男", cls:"砂鬼一家", src:"Shou"},
    "shuma": {gender:"男", rank:"将軍", cls:"武将", arms:"双剣", src:"Shu Ma"},
    "hanzen": {gender:"男", cls:"攻城部隊", src:"Han Zen"},
    "hakuki": {gender:"男", rank:"大将軍（六将筆頭）", cls:"武将", src:"Haku Ki"},
    "koshou": {gender:"男", rank:"大将軍", cls:"軍師", src:"Ko Shou"},
    "oukotsu": {gender:"男", rank:"大将軍", cls:"武将", arms:"長柄大斧", src:"Ou Kotsu"},
    "shibasaku": {gender:"男", rank:"大将軍", cls:"武将", src:"Shiba Saku"},
    "shouou": {cv:"金尾哲夫", gender:"男", rank:"秦王（第二十八代）", cls:"王族", src:"King Zhaoxiang"},
    "rouai": {cv:"坂詰貴之", gender:"男", cls:"毐国 旗頭", src:"Rou Ai"},
    "choukou": {cv:"竹内栄治", gender:"男", cls:"宦官 / 文官", src:"Zhao Gao"},
    "hanoki": {cv:"小山剛志", gender:"男", rank:"将軍", cls:"武将", src:"Han Oki"},
    "hanruki": {cv:"川島得愛", gender:"男", rank:"将軍", cls:"武将", src:"Han Ruki"},
    "wategi": {cv:"辻親八", gender:"男", rank:"将軍 / 戎籊公", cls:"武将", src:"Wategi"},
    "kou_jo": {cv:"松田利冴", gender:"女", cls:"宮女 → 妃", src:"Kou"},
    "you_jo": {cv:"井上遥乃", gender:"女", cls:"宮女", src:"You"},
    "rui": {cv:"折笠富美子", gender:"女", cls:"王族", src:"Rui"},
    "kaioku": {cv:"松田健一郎", gender:"男", cls:"軍師 / 教官", src:"Kai Oku"},
    "kakubi": {cv:"土田大", gender:"男", rank:"千人将", cls:"武将", src:"Kaku Bi"},
    "gakuga": {cv:"佐久間元輝", gender:"男", rank:"将軍 / 副官", cls:"武将", src:"Gaku Ga"},
    "shihaku": {cv:"田村真", gender:"男", rank:"大将軍", cls:"武将 / 槍術", arms:"槍", src:"Shi Haku"},
    "reiou": {cv:"田丸篤志", gender:"男", rank:"大将軍", cls:"軍師", src:"Rei Ou"},
    "tairoji": {cv:"魚建", gender:"男", rank:"大将軍", cls:"武将", src:"Tai Ro Ji"},
    "shikika": {cv:"茅野愛衣", gender:"女", cls:"—", src:"Shi Ki Ka"},
    "hakukisai": {cv:"青木強", gender:"男", rank:"副将 → 大将軍", cls:"武将", src:"Haku Ki Sai"},
    "junsou": {cv:"新垣樽助", gender:"男", rank:"将軍", cls:"軍師", src:"Jun Sou"},
    "ranbihaku": {cv:"木内太郎", gender:"男", rank:"将軍", cls:"武将", arms:"大矛", epithet:"狂戦士", src:"Ran Bi Haku"},
    "rien": {cv:"咲野俊介", gender:"男", rank:"宰相", cls:"文官", src:"Ri En"},
    "kouretsuou": {cv:"高塚正也", gender:"男", rank:"楚王（第四十三代）", cls:"王族", src:"King Kaoli"},
    "jukoou": {gender:"男", rank:"将軍 / 軍師", cls:"軍師", src:"Ju Ko Ou"},
    "bamyuu": {cv:"岩田光央", gender:"男", rank:"将軍 / 副官", cls:"武将", src:"Bamyuu"},
    "kaen": {gender:"男", rank:"将軍", cls:"武将", src:"Ka En"},
    "gakuki": {gender:"男", rank:"大将軍", cls:"武将", epithet:"軍神", src:"Gaku Ki"},
    "ouanou": {gender:"男", rank:"韓王（第十一代）", cls:"王族", src:"King An"},
    "neihime": {gender:"女", cls:"公主", src:"Nei"},
    "rakuakan": {gender:"男", rank:"韓軍第一将", cls:"武将 / 騎兵", epithet:"凶星", src:"Raku A Kan"},
    "yokoyoko": {gender:"男", rank:"副官 → 将", cls:"武将", src:"Yokoyoko"},
    "hakuoukoku": {gender:"男", rank:"韓軍第二将", cls:"武将", epithet:"凶星", src:"Haku Ou Koku"},
    "choushi": {gender:"男", rank:"宰相", cls:"軍師 / 文官", src:"Chou Shi"},
    "kakouryuu": {gender:"男", rank:"治安維持軍長官", cls:"武将", src:"Ka Kou Ryuu"},
    "ryuuan": {gender:"男", rank:"南陽城主", cls:"文官", src:"Ryuu An"},
    "chouin": {gender:"男", rank:"将軍 / 総大将代理", cls:"武将", src:"Chou In"},
    "oukenou": {cv:"高塚正也", gender:"男", rank:"斉王（第八代）", cls:"王族", src:"King Jian"},
    "ganshu": {gender:"男", rank:"将軍", cls:"武将", src:"Gan Shu"},
    "reijukou": {gender:"男", rank:"代 第一将", cls:"武将", src:"Rei Ju Kou"},
    "dant": {cv:"藤沼建人", gender:"男", rank:"フィゴ族族長", cls:"山の民", arms:"大矛", src:"Danto"},
    "kitari": {cv:"南條愛乃", gender:"女", rank:"メラ族族長", cls:"山の民", arms:"曲剣", src:"Kitari"},
    "katari": {cv:"水中雅章", gender:"男", rank:"メラ族前族長", cls:"山の民", arms:"曲剣", src:"Katari"},
    "enpo": {gender:"男", rank:"猿手族族長", cls:"山の民", src:"Enpo"},
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
    "kouyoku": {cv:"鈴木達央", epithet:"雷", rank:"将軍", arms:"弓矢", debutManga:"原作 第253話", debutAnime:"アニメ 第3期 第1話", stats:{bu:93, shiki:88, chi:79, kei:"A"}, statsSrc:"公式ガイドブック", src:"Kou Yoku"},
    "hakurei": {cv:"上村祐翔", epithet:"十弓の二", rank:"将軍", arms:"弓矢", debutManga:"原作 第253話", debutAnime:"アニメ 第3期 第1話", stats:{bu:92, shiki:86, chi:85, kei:"B"}, statsSrc:"公式ガイドブック", src:"Haku Rei"},
    "karin": {cv:"田中敦子", epithet:"楚軍総司令第二位", age:"30代", rank:"大将軍", arms:"剣", debutManga:"原作 第289話", debutAnime:"アニメ 第3期 第8話", stats:{bu:94, shiki:94, chi:98, kei:"A"}, statsSrc:"公式ガイドブック", src:"Ka Rin"},
    "manu": {epithet:"武の化身", arms:"矛", debutManga:"原作 第650話", stats:{bu:97, shiki:90, chi:85, kei:"A"}, statsSrc:"公式ガイドブック", src:"Man'U"},
    "kouen": {epithet:"楚の虎", rank:"大将軍", debutManga:"原作 第311話", debutAnime:"アニメ 第3期 第13話", src:"Kou En"},
    "sentoun": {arms:"朴刀", debutManga:"原作 第650話", stats:{bu:95, shiki:85, chi:80, kei:"A"}, statsSrc:"公式ガイドブック", src:"Sen To'Un"},
    "genu": {age:"40代", rank:"将軍", arms:"剣", debutManga:"原作 第650話", stats:{bu:88, shiki:88, chi:90, kei:"A"}, statsSrc:"公式ガイドブック", src:"Gen'U"},
    "goumasho": {age:"40代", rank:"将軍", arms:"剣", debutManga:"原作 第295話", debutAnime:"アニメ 第3期 第9話", stats:{bu:80, shiki:86, chi:89, kei:"B"}, statsSrc:"公式ガイドブック", src:"Gou Ma Sho"},
    "gekishin": {epithet:"燕の救世主", rank:"大将軍", arms:"矛", debutManga:"原作 第114話", debutAnime:"アニメ 第2期 第37話", stats:{bu:90, shiki:95, chi:92, kei:"A"}, statsSrc:"公式ガイドブック", src:"Geki Shin"},
    "kanpishi": {age:"40代", debutManga:"原作 第495話", debutAnime:"アニメ 第6期 第2話", src:"Kan Pishi"}
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
      {h:"その後", body:"番吾での敗戦後、渕とともに五千将に昇進。飛信隊の中核として存命。"},
      {h:"人物像", body:"真面目で規律を重んじる男。自分が仕えるに値する将を見極める目があり、そう決めたら私心なく尽くす。飛信隊では信を支える大人枠として機能する。"}
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
      {h:"その後", body:"始皇十六年に千人将へ昇進。存命。"},
      {h:"人物像", body:"家族と故郷を守るという動機で戦場に立ち続ける男。勝ち始めると途端に強気になる分かりやすさがある。"},
      {h:"小ネタ", body:"野心が湧くと妙に悪い顔をする。アニメでは騎兵として描かれている。"}
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
      {h:"その後", body:"羌瘣の蘇生術で信が見た精神世界に、去亥とともに現れる。"},
      {h:"人物像", body:"落ち着いた男で、状況をゆっくり読んでから動くタイプ。戦場を離れるとだらけがちで、河了貂に軽口を叩くような茶目っ気もあった。"}
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
      {h:"その後", body:"信の将軍昇格で千人将、始皇十六年に三千人将。存命。"},
      {h:"人物像", body:"自分の剣の腕に強い自信を持ち、伍長になった直後から信の実力を認めていた数少ない一人。飛信隊らしく忠誠心も厚い。"}
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
      {h:"その後", body:"始皇十六年に二千人将。存命。"},
      {h:"人物像", body:"思ったことを口に出さずにいられない性格で、あえて逆張りの意見を言う役回り。信に惹かれて飛信隊に来たが、旧主・麃公のことは今も忘れていない。"},
      {h:"小ネタ", body:"信が我呂をからかう構図は、騰が録嗚未をいじる関係とよく似ている。"}
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
      {h:"最期", body:"宜司平野戦。趙北部軍全軍の包囲を破るため、錘型の陣の先頭を我呂と組んで担い、青歌軍と衝突した直後に将軍・上和龍と遭遇。ただの一撃で討ち取られて戦死した。"},
      {h:"人物像", body:"口数が少なく常に落ち着いた男で、部下への気配りが厚い指揮官。信に惹かれて飛信隊へ移ったが、麃公への恩義は最後まで持ち続けた。"}
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
      {h:"その後", body:"始皇十六年に五百将。存命。"},
      {h:"小ネタ", body:"竜川を豚呼ばわりして腕相撲を挑み、完膚なきまでに叩き潰されたことがある。"}
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
      {h:"その後", body:"始皇十六年に三百将。存命。"},
      {h:"人物像", body:"無口で得体の知れない男だが、戦場では純粋な殺傷力の塊になる。異名は不村の殺し屋。それでも信と仲間への忠誠は誰よりも固い。"}
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
      {h:"その後", body:"信の将軍昇格で五百人将となり騎兵隊指揮官の一人に。始皇十六年に千人将。存命。"},
      {h:"人物像", body:"認めていない相手には噛みつく喧嘩早い男。馬陽で信の戦いぶりを見てから態度が一変し、以後は誰よりも忠実な部下になる。"}
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
      {h:"エピソード", body:"朱海平原九日目に討たれかけたところを信に助けられ、影丘の戦いでは岳白軍に討たれかけたところを羌礼たちに助けられた。口の悪さと、助けられる回数が釣り合っていない。"}
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
      
      {h:"人物像", body:"元は王翦麾下・亜光軍の所属で「悪童」の蔑称で呼ばれていた。大きく見開いた目と「ギャギャギャ」という妙な笑い方が特徴。性格難ゆえに千人将に置かれていたが、関常から「軍才は亜光軍一」と評価され、その戦術眼は玉鳳隊きってのものである。"},
      {h:"朱海平原", body:"二日目に王賁を援護し、九日目には窮地の亜光を救出。十四日目は自隊の兵を失いながら馬南慈を足止めし、信の趙峩龍討伐の報を聞くとすぐに段茶へ突撃を指示、自らは潰れ役となって馬南慈軍を半壊させた。十五日目には金毛軍に苦戦する飛信隊の援軍に向かい、金毛軍を撃破している。"},
      {h:"その後", body:"鄴編後に亜光軍から玉鳳隊へ転属。命令を無視した勝手な行動が目立つが、王賁は黙認している。影丘では別動隊を率いて三日かけて敵左翼側面に回り込み、挟撃を成立させて趙将軍・紀章を討ち取った。番吾の敗戦後、関常とともに将軍に昇進。"}],
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
      {h:"合従軍〜鄴", body:"合従軍編では李牧の別働軍として参戦。鄴編では最終局面で王翦本陣に迫り、事態の急変後は舜水樹・馬南慈とともに李牧軍を率いて邯鄲軍と交戦し、李牧と太子嘉の脱出を成功させて青歌へ向かった。"},
      {h:"三大天への野望", body:"三千人将から始まり、始皇十四年には将軍へ昇進。三大天の座を狙うと公言しており、その野心が戦場で常に前へ出る理由になっている。"},
      {h:"その後", body:"番吾では李牧直属の遊軍として亜光に斬りかかり、囮となって李牧を逃がした。李牧とカイネの結婚を知って一人だけ不貞腐れていた。全面戦争では自軍を率いて趙忽軍とともに飛信隊と対峙している。存命。"}
    ],
    battles:["b_sai","b_gyou","b_gian","b_bango"],
    rel:[{to:"riboku",label:"配下"},{to:"kaine",label:"片想い"},{to:"ringyoku",label:"一騎討ち"},{to:"ryusen",label:"交戦"},{to:"akou",label:"交戦"},{to:"bafuuji",label:"共闘"},{to:"banaji",label:"共闘"},{to:"f_sandaiten",label:"志望"},{to:"youtanwa",label:"狙う"},{to:"rankai",label:"阻まれる"}]
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
      {h:"その後", body:"存命。"},
      {h:"人物像", body:"冷静で計算的な男。青歌を治める司馬尚のもとで、戦略面を担当する参謀格として動く。"},
      {h:"位置づけ", body:"青歌軍の将軍で青歌の第二将。扈輒の戦死後に李牧が復帰すると、上和龍とともに李牧に同行して邯鄲へ赴いた。"},
      {h:"宜安・肥下", body:"包囲網を突破しようとする飛信隊・楽華軍の両軍に錘型の陣で突撃して動きを止め、蒙恬に重傷を負わせる。しかし駆け付けた愛閃と飛信隊の加勢を受け、李信の攻撃を受け止めた一瞬の隙を愛閃に突かれて重傷を負った。肥下戦では窮地の李牧のもとへ向かおうとするが飛信隊に足止めされる。"},
      {h:"番吾", body:"李牧の策で亜光を誘き出し、フーオンとともに挟み撃ちにして追い詰めた。王翦軍本隊へ向かおうとする亜光を背後から斬って致命傷を負わせるが、反撃を受けて左目を斬られる。それでもカン・サロとともに司馬尚軍へ合流し、王翦本陣を攻撃した。"}],
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
      {h:"人物像", body:"青歌軍の将軍。楽彰がジ・アガを「青歌一の剛将」と評したことに対し、青歌一の剛将は自分だと対抗心をむき出しにした。"},
      {h:"最期", body:"宜安戦では包囲網から脱出しようとする飛信隊・楽華軍の突撃を楽彰とともに迎え撃ち、岳雷を討ち取る。しかし蒼兄弟の矢を捌いた一瞬の隙を突かれ、李信に斬り倒されて重傷を負った。その後、桓騎に包囲された李牧本陣の救援に駆けつけてゼノウと対峙。すでに虫の息だったゼノウに致命傷を与えるが、最期はゼノウに頭部を粉砕されて死亡した。"}],
    battles:["b_gian"],
    rel:[{to:"gakurai", label:"討ち取る"},{to:"zenou", label:"相打ち"},{to:"shin", label:"交戦"},{to:"garo", label:"交戦"},{to:"shibashou", label:"配下"},{to:"rakushou", label:"同僚"}]
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
      {h:"その後", body:"宜安では包囲網を破って脱出路を開き、桓騎の最後の言葉を受け取る。韓攻略戦にも参加し、統一戦争の主力の一人になっていく。"},
      {h:"小ネタ", body:"下僕育ちのわりに炊事も掃除も壊滅的で、そこは何年経っても直らない。史実の李信がモデルだが、原作の信は生まれも育ちも別物として描かれている。"}
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
      {h:"意味", body:"漂が地図に残した場所へ信が向かったことで、物語のすべてが動き出す。信にとって『大将軍』の夢は二人分になる。"},
      {h:"人物像", body:"信の熱さに対して、漂は落ち着いた常識人だった。人当たりがよく笑顔を絶やさないが、頭の回転は速く、何をすべきかを的確に見抜くタイプ。信が剣の腕で野盗になろうと言い出したときも、真っ先に叱ったのは漂だった。"},
      {h:"最期", body:"城戸村（城郊の村）で息絶える。王宮の政変に巻き込まれ、瀕死のまま村まで走り切ったのは、信に地図を渡すためだけだった。"}
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
      {h:"蕞", body:"合従軍に王都の喉元まで攻め込まれたとき、自ら蕞へ入り、兵ではない住民に向かって語りかけた。言葉で人を動かすという資質が、そのまま国の存亡を決める場面。"},
      {h:"小ネタ", body:"モデルは実在の秦王政＝始皇帝。作中の政も、趙での人質時代と母との確執という史実の影を色濃く引き継いでいる。"},
      {h:"冷徹さ", body:"序盤の政は情に薄く見える。信が見逃した刺客をためらいなく斬ったように、王として必要な処理は即断する。理想を語る男が同時に一番現実的だという二面性が、この人物の芯になっている。"}
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
      {h:"右翼の軍師", body:"黒羊では丘右側を奪う奇策を立てて成功させ、朱海平原の後半では秦軍右翼全軍の軍師を担った。著雍編では荀早隊に囚われ、凱孟の問いに臆せず答えたことで粗略に扱われず生還している。"},
      {h:"人物像", body:"五歳で身寄りを失い、それでも生き延びてきた観察眼と要領の良さが持ち味。好奇心が強く、知らないことを知らないままにしない性格が、軍師という職業に噛み合った。"},
      {h:"小ネタ", body:"兵法学校時代には煙管をふかす場面もあり、見た目の幼さと中身の年季がずれているのが河了貂という人物の面白さ。"}
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
      {h:"蘇生術", body:"朱海平原で龐煖に再挑戦して再び敗れ戦闘不能になったが、龐煖を討って力を使い果たした信を救うため、蚩尤に伝わる蘇生術を行って信を復活させた。鄴攻略後に五千人将へ昇進。"},
      {h:"人物像", body:"口数が少なく、他人に興味がないような態度を取る。信が何度話しかけても最初は取り合わなかったが、飛信隊で過ごすうちに感情を表に出すようになっていく。"},
      {h:"小ネタ", body:"史実の羌瘣は男性。キングダムでは女性として描き直された人物の一人で、楊端和と並ぶ大きな改変になっている。"}
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
      {h:"信への影響", body:"『武功だけでは将軍になれない』ことを教えた最初の師。飛信隊の名も王騎が与えたもの。"},
      {h:"人物像", body:"立っているだけで重圧を放つ大将軍だが、実際はよく喋り、冗談も飛ばす社交的な男。昌文君を恋人だと言ってからかうような軽口も叩く。"},
      {h:"小ネタ", body:"モデルは実在の秦の将軍・王齮。史実では記録の少ない人物で、作中の圧倒的な存在感はほぼ原作の創作にあたる。"}
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
      {h:"韓攻略の総大将", body:"始皇十七年、韓攻略の総大将として新鄭を落とし、七国で最初の一国を滅ぼした。東砂平原の会戦では韓将・眉景を討ち、洛亜完を討ち取る寸前まで迫っている。"},
      {h:"人物像", body:"丁寧な物言いと静かな威厳を保つが、戦場では一転して容赦がない。自分の腕と部隊の力量に絶対の自信を持っている。"},
      {h:"小ネタ", body:"王騎からは自分と同等と評された実力者。王騎の口調や笑い方を真似ることがあり、蒙武には悪趣味だと嫌がられている。"}
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
      {h:"最期", body:"百個目の城として趙の馬陽を攻め、そこで討たれる。王騎が馬陽に強くこだわる理由。"},
      {h:"人物像", body:"責任ある立場のわりに気さくで、人を惹きつける明るさがあった。取りこぼしは昌文君が拾ってくれると言って、彼をおっさん呼ばわりする軽さも持っていた。"},
      {h:"小ネタ", body:"愛馬の名は淵（えん）。"}
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
      {h:"過去", body:"若い頃は武官として王騎らと同時代を生きた。そのため王騎や蒙驁ら旧世代とも話が通じる。"},
      {h:"人物像", body:"政への忠誠がすべての行動原理。反乱は止められないと分かっていたからこそ、王を生き延びさせる備えだけは怠らなかった。老いてなお、政治でも軍でも現実的な判断を下す。"}
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
      {h:"歩み", body:"王都奪還、蛇甘平原、馬陽と主要な戦いに従軍し、着実に地位を上げていく。"},
      {h:"人物像", body:"王都奪還のあと、自分の無力さを痛感したところから始まる人物。突出した才はないが、昌文君と政への忠誠と、要所で腹を括れる胆力がある。"},
      {h:"小ネタ", body:"山の民の言葉を習得しており、通訳なしで会話ができる。"}
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
      {h:"教育者", body:"自ら兵法学校を開き、次代の軍師を育てている。河了貂もその門下。"},
      {h:"人物像", body:"冷静で緻密な軍略家。蒙武とは義兄弟の間柄で、あの猛将から一目置かれている数少ない人物。信の資質を早い段階で見抜き、自分の学校に引き込もうとした。"},
      {h:"小ネタ", body:"作戦を練り込むと徹夜が続き、周囲が心配するほど根を詰める。モデルは史実の昌平君。"}
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
      {h:"一族", body:"父は老将・蒙驁、子は蒙恬。軍人の家系だが、本人は最も型から外れている。"},
      {h:"人物像", body:"武がすべてという価値観の男だが、昌平君と義兄弟の契りを交わすなど、意外に人間関係は厚い。王騎に軍略で完敗した経験が、後年の変化の起点になる。"},
      {h:"小ネタ", body:"声が異常に大きい。六大将軍の復活を望んでいたのは、自分がそこに座るためでもあった。"}
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
      {h:"最期", body:"合従軍を退けたのち、老いには勝てず陣中で世を去る。旧世代がまた一人退場し、王翦・楊端和・桓騎という新しい将軍位の時代が始まる。"},
      {h:"人物像", body:"異名は白老。部下には気を抜いて構えろと言い続ける緩さがある一方、自分の任務には異常なほど厳格だった。昭王時代を知る最後の生き残りの一人。"}
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
      {h:"その後", body:"宜司平野では包囲突破の際に趙北部軍の楽彰に斬られて負傷。朱海平原では馬南慈の右目を斬っている。存命。"},
      {h:"人物像", body:"明るく人懐こく、常に軽口を叩いている。ただしその態度は狡猾さを隠す膜で、戦況が動いた瞬間に別の顔が出る。"}
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
      {h:"その後", body:"番吾では敗走する王翦を託されて守り抜いた。韓攻略にも参加。存命。"},
      {h:"人物像", body:"登場時は平民出身を露骨に見下していた。平民が戦うこと自体は認めるが、自分と同列に並ぶことは認めない、という徹底した貴族意識から始まる。"},
      {h:"異名", body:"秦王の剣。名門・王一族の跡取りとして、家の格に見合う戦果を出し続けることを自分に課している。"}
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
      {h:"最期", body:"合従軍を迎え撃つ函谷関の戦いで、王騎を討った龐煖の前に立つ。『火』を燃やし尽くす一騎打ちの末に討たれた。"},
      {h:"人物像", body:"戦場の流れを火と呼び、理屈ではなく嗅覚で動く。麾下の兵からは慕われ、若い信のような跳ねっ返りを面白がって引き上げる度量がある。"},
      {h:"小ネタ", body:"異名は本能型の権化。勝つためなら兵の損耗も辞さない苛烈さがあり、呉慶の策の意図もその嗅覚で見抜いた。"}
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
      {h:"最期", body:"死守命令を受けた丘で、退くことを選ばず戦死。この一戦が信の昇進の起点になる。"},
      {h:"人物像", body:"規律に厳格で、命令違反を絶対に許さない教科書どおりの軍人。同時に自分から真っ先に敵中へ突っ込む無鉄砲さも持っていた。"}
    ],
    battles:["b_dakan"],
    rel:[{to:"shin", label:"上官"},{to:"hyoukou", label:"配下"}]
  },
  {
    id:"obei", name:"尾平", yomi:"びへい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","古参","農民"],
    summary:"飛信隊の古参兵。弱音を吐きながらも最後まで残る。",
    detail:[{h:"人物", body:"武功より生き延びることを重んじる現実主義者。読者に近い目線で飛信隊を語る役回り。"},
      {h:"人物像", body:"武功より生き延びることを優先する現実主義者で、弱音も愚痴も多い。それでも隊を離れず、気づけば飛信隊で最も長く生き残っている古参の一人。"},
      {h:"小ネタ", body:"異名は出っ歯。臆病で見栄っ張り、話を盛る癖がある。それでも戦場に戻り続けるところが尾平という男の芯。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"shin", label:"部下"},{to:"obito", label:"弟"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"obito", name:"尾到", yomi:"びとう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["飛信隊","兄弟","馬陽"],
    summary:"尾平の弟。馬陽で信を生かすために命を使い切った。",
    detail:[{h:"最期", body:"敵中で消耗し切った信を背負って走り抜き、味方陣地の目前で力尽きる。飛信隊の初期を象徴する死。"},
      {h:"人物像", body:"兄の尾平と違って謙虚で地に足がついた男。臆病な面もあったが、いざとなると兄より肝が据わっていた。"},
      {h:"小ネタ", body:"寝ている間に屁をしたのを羌瘣に目撃されている。朦朧とした信に、田んぼの匂いがすると言われたこともある。"}],
    battles:["b_dakan","b_bayou"],
    rel:[{to:"obei", label:"兄"},{to:"shin", label:"部下"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"takuke", name:"澤圭", yomi:"たくけい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 伍長", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","伍長","堅実"],
    summary:"信の最初の伍長。生き残る術に長けた堅実な兵。",
    detail:[{h:"人物", body:"派手な武功より隊の生存を優先する判断ができる。飛信隊の実務を支える一人。"},
      {h:"人物像", body:"信が最初に配属された伍の伍長。派手さはないが、隊員を生かして帰すことを最優先に考える指揮ができる。飛信隊の実務を静かに支える。"},
      {h:"小ネタ", body:"寝言を言う癖があると羌瘣に観察されている。"},
      {h:"弱者の戦い方", body:"信が初陣で伍を組んだ時の伍長。頼りない外見と性格のせいで常に最弱の伍を率いるが、弱者なりの戦い方を熟知しており、蛇甘平原編まで彼の伍からは誰一人死んでいなかった。"},
      {h:"その後", body:"飛信隊結成時に第十一伍長、三百人隊で什長、信が将軍になると二百人将へ。のちに三百将に昇進している。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"shin", label:"部下"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"hairou", name:"沛浪", yomi:"はいろう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 古参兵", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","古参"],
    summary:"戦場慣れした古参。若い隊員のまとめ役。",
    detail:[{h:"人物", body:"経験に裏打ちされた冷静さで、突撃しがちな飛信隊にブレーキをかける。"},
      {h:"人物像", body:"戦場慣れした古参で、突撃しがちな飛信隊にブレーキをかける役回り。経験に裏打ちされた冷静さが、若い隊員の生存率を上げている。"},
      {h:"小ネタ", body:"蛇甘平原で信の戦いぶりを見て以来、この若造は本物だと認めた一人。以後は口うるさく世話を焼く古参ポジションに落ち着く。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"shin", label:"部下"},{to:"f_hishin", label:"隊員"}]
  },
  {
    id:"denyuu", name:"田有", yomi:"でんゆう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い", status:"存命",
    tags:["飛信隊","古参"],
    summary:"飛信隊の古参兵。尾平とつるむ賑やかし役。",
    detail:[{h:"人物", body:"軽口が多いが、要所では隊のために踏みとどまる。"},
      {h:"人物像", body:"軽口が多く隊の空気を回す賑やかし役だが、要所では踏みとどまる。尾平と組んで飛信隊の庶民目線を担当する。"},
      {h:"小ネタ", body:"厳つい見た目に反して謙虚で義理堅い。蛇甘平原で信の働きを見て以来、態度を変えずに敬意を持ち続けている。"}],
    battles:["b_dakan","b_bayou","b_sanyou"],
    rel:[{to:"f_hishin", label:"隊員"},{to:"obei", label:"相棒"}]
  },
  {
    id:"kyogai", name:"去亥", yomi:"きょがい", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 隊員", klass:"兵", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["飛信隊","戦鼓","巨漢"],
    summary:"戦鼓を打ち鳴らす巨漢の隊員。飛信隊の突撃を鼓舞する。",
    detail:[{h:"役割", body:"太鼓の音で隊の士気と進退を制御する、飛信隊独特のポジション。"},
      {h:"小ネタ", body:"顔にある斑点は生まれつきの痣。入隊の動機は手柄目当てだったが、いつの間にか信と仲間への敬意が動機に変わっていた。"},
      {h:"人物像", body:"蛇甘平原編で壊滅状態に陥った秦国第二軍の生存者。第四軍で大功を挙げた信たちには当初不満を募らせていた。飛信隊結成時に第十七伍長となり、三百人隊で什長、千人隊で百人将へと昇進する。"},
      {h:"最期", body:"鄴編で先陣を切って李牧軍に攻め込み、李牧の目前にまで迫るが、立ちはだかった龐煖に斬られて戦死。のちに羌瘣の蘇生術による精神世界に、松左とともに現れる。"}],
    battles:["b_bayou","b_sanyou","b_kokuyou","b_gyou"],
    rel:[{to:"f_hishin", label:"隊員"},{to:"shin", label:"部下"}]
  },
  {
    id:"en", name:"渕", yomi:"えん", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊 副長格", klass:"兵", first:"17巻", arc:"呂不韋編", status:"存命",
    tags:["飛信隊","副長","年長"],
    summary:"年長の実務派。隊の運営を裏で支える副長格。",
    detail:[{h:"役割", body:"隊員の掌握・編成・補給といった、信が苦手な部分を引き受ける。"},
      {h:"人物像", body:"隊員の掌握・編成・補給という、信が苦手な部分を丸ごと引き受ける年長者。飛信隊が数を増やしても崩れないのは、この人がいるからでもある。"},
      {h:"小ネタ", body:"無法地帯の平定に信と長く同行したことが転機。腕っぷしではなく、隊を回す力で自信をつけた珍しいタイプ。"}],
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
      {h:"その後", body:"番吾でも趙軍右翼の舜水樹・馬南慈と対峙。存命。"},
      {h:"人物像", body:"山の民は野蛮と見られているが、楊端和自身は政の話を聞き、理で応じる柔軟さを持つ。女性でありながら山界の全部族に王として敬われている。"},
      {h:"異名", body:"死王、山界の王、そして後には秦の四大将軍の一角。"}
    ],
    battles:["b_outo","b_sai","b_gyou","b_bango"],
    rel:[{to:"sei", label:"同盟"},{to:"bajio", label:"配下"},{to:"tajifu", label:"配下"},{to:"shunmen", label:"配下"},{to:"f_sankai", label:"王"}]
  },
  {
    id:"bajio", name:"バジオウ", yomi:"ばじおう", kind:"person", state:"山界", group:"山の民",
    role:"楊端和の側近", klass:"山の民", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","仮面","忠誠"],
    summary:"楊端和にもっとも忠実な戦士。仮面の下に過去を隠す。",
    detail:[{h:"過去", body:"かつて人を殺す道具として育てられ、楊端和に救われた。忠誠は絶対。"},
      {h:"人物像", body:"真面目で忠誠一筋。他の山の民と違い、秦への偏見を持たない。"},
      {h:"小ネタ", body:"かつては人を喰らう者として育てられ、人肉を口にしたことがある。楊端和に拾われて今がある。"},
      {h:"出自", body:"戦に巻き込まれて滅んだバジ族の生き残り。発見当時は人語すら話せず獣のような気性だった。楊端和に敗れて一族に加わり、次第に人間性を取り戻して山の民と秦の両方の言語を話す戦士に育つ。ただし過去の獣の心は今も持っており、本人の意思で解放できる。実は方向音痴。"},
      {h:"戦歴", body:"王都奪還編では信にランカイを倒させ、シュンメンとともに竭氏を討ち取った。合従軍編では蕞救援に駆けつけて趙将軍・晋成常を討ち取る。鄴編では列尾を陥落させ、橑陽では犬戎将軍・ゴバと対峙し、その後の逃走戦で死力を尽くして端和を死守した。"}],
    battles:["b_outo"],
    rel:[{to:"youtanwa", label:"主君"},{to:"f_sankai", label:"戦士"}]
  },
  {
    id:"tajifu", name:"タジフ", yomi:"たじふ", kind:"person", state:"山界", group:"山の民",
    role:"山の民の戦士", klass:"山の民", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","怪力"],
    summary:"怪力の戦士。信とは軽口を叩き合う仲。",
    detail:[{h:"人物", body:"荒々しいが情に厚い。山の民の中でも屈指の膂力を持つ。"},
      {h:"人物像", body:"山の民でありながら強い者を認める性格で、平地の人間である信を同族から庇ったこともある。巨体だが多くを語らない。"},
      {h:"小ネタ", body:"信と出会った十数年前に割れた仮面を、今もそのまま着け続けている。楊端和の側にいる最古参の一人。"},
      {h:"信との縁", body:"自らの面を折った信を戦士として認めた。王都奪還編では信にランカイを倒させる貢献を果たしている。"},
      {h:"その後", body:"合従軍編では蕞救援に駆けつけ、一騎討ちで疲弊して倒れた信を死守した。鄴編では秦国の言葉を少し覚えたが片言かつ間違っており、まだ上手く話せない。橑陽ではバジオウの指揮下でゴバと対峙し、逃走戦ではシュンメンとともに端和とバジオウを救出した。"}],
    battles:["b_outo"],
    rel:[{to:"youtanwa", label:"配下"},{to:"f_sankai", label:"戦士"}]
  },
  {
    id:"shunmen", name:"シュンメン", yomi:"しゅんめん", kind:"person", state:"山界", group:"山の民",
    role:"山の民の戦士", klass:"山の民", first:"3巻", arc:"王都奪還編", status:"存命",
    tags:["山の民","身軽"],
    summary:"軽業に長けた山の民の戦士。",
    detail:[{h:"人物", body:"跳躍力と手数で戦う軽装の戦士。タジフとは対照的なスタイル。"},
      {h:"人物像", body:"跳躍力と手数で戦う軽装の戦士。タジフの重さ、バジオウの静けさに対して、シュンメンは速さで山の民の三色を完成させている。"},
      {h:"役割", body:"鳥牙族の族長。王都奪還編では信にランカイを倒させる貢献を果たし、バジオウとともに秦国左丞相・竭氏を討ち取った。奪還後は引き取られたランカイの教育係を担当している。"},
      {h:"その後", body:"合従軍編では蕞救援に駆けつけて趙軍を蹂躙。鄴編の橑陽戦では犬戎族との戦いで負傷するが九日目に復帰し、バジオウの指揮下でゴバと対峙。その後の逃走戦ではタジフと共に端和とバジオウを救出した。"}],
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
      {h:"屯留", body:"合従軍を退けた直後、屯留で起きた反乱の鎮圧に自ら向かう。かつて兄の座を奪おうとした男が、最後は秦の王族としての務めを選び、命を落とす。"},
      {h:"人物像", body:"若い頃は目的のためなら手段を選ばない苛烈さで、王族以外の血は価値がないと本気で信じていた。政が王になったこと自体が我慢ならなかった。"},
      {h:"最期", body:"屯留で戦死。かつて兄の王座を狙った男が、最後は秦の王族としての務めを果たして死ぬ。"}
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
      {h:"体制", body:"四柱（昌平君・李斯・蔡沢・司馬空）を通じて軍・法・外交・土木を掌握している。"},
      {h:"人物像", body:"抜け目のない野心家で、賭け事を好み、運を掴む勘に長けている。欲しいものは必ず取りに行き、そのための手段を選ばない。"},
      {h:"小ネタ", body:"虎の子を膝に乗せて酒を飲む場面がある。作中で私生活の享楽まで描かれる数少ない大物。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"対立"},{to:"taigo", label:"結託"},{to:"shouheikun", label:"四柱"},{to:"risi", label:"四柱"},{to:"saitaku", label:"四柱"},{to:"shibakuu", label:"四柱"},{to:"f_ryofui", label:"頂点"}]
  },
  {
    id:"risi", name:"李斯", yomi:"りし", kind:"person", state:"秦", group:"呂不韋派",
    role:"呂氏四柱 / 法", klass:"文官", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","法家","官僚"],
    summary:"法を司る四柱。冷徹な官僚。",
    detail:[{h:"役割", body:"秦の法制度を握る実務家。合理性のためなら手段を選ばない。"},
      {h:"小ネタ", body:"韓非子とは荀子門下の同窓。秦の朝廷の軽い場面では、突っ込み役に回ることが多い。"},
      {h:"人物像", body:"「法の番人」の異名を持つ。確実さを重視する生真面目な性格のため、呂不韋の考えを理解できず振り回されることが多かった。呂不韋の丞相就任後に真っ先に登用され、呂氏四柱の一角となる。"},
      {h:"失脚と復帰", body:"秦国統一編では呂不韋を王位につけるため咸陽の守備兵を減らす暗躍を行い、咸陽攻防戦後に入牢。しかし翌年、その存在が不可欠と判断した昌文君の懇願で復帰し、政の側近に加わった。"},
      {h:"韓非との別れ", body:"招聘された韓非とともに新法の研究に取り掛かるが、のらりくらりと時を過ごす様子を訝しむ。姚賈の報告で韓非の諜報関与が発覚し軟禁するが、事情を聴いて政に報告に向かった留守中に韓非は毒殺される。激高して姚賈を詰問したものの、中華統一のために「隠し持っていた毒での自殺」と報告し、趙を崩壊させるために姚賈を不問として趙へ帰した。その夜、韓非を友達だと思っていたこと、その思いの火を受け継ぎたいことを妻に語っている。"},
      {h:"その後", body:"番吾の敗戦後、昌平君の「三本の柱」の一つ目である秦国全土の戸籍作りと強制徴兵令の作成を、全文官を総動員して一年で完成させた。完成直後に昌文君とともに倒れこむほどの激務だった。"}],
    battles:[],
    rel:[{to:"ryofui", label:"主君"},{to:"f_ryofui", label:"四柱"}]
  },
  {
    id:"saitaku", name:"蔡沢", yomi:"さいたく", kind:"person", state:"秦", group:"呂不韋派",
    role:"呂氏四柱 / 外交", klass:"文官", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","外交","老獪"],
    summary:"外交を担う老獪な四柱。他国との交渉役。",
    detail:[{h:"役割", body:"諸国との折衝を一手に握る。飄々とした態度の裏で国益を計算し尽くす。"},
      {h:"人物像", body:"考えを一切表に出さない切れ者。呂不韋四柱でありながら、最後の仕事は政の中華統一を後押しすることだった。"},
      {h:"経歴", body:"「剛成君」の称号を持つ。昭王時代の丞相であり、秦国筆頭外交官として各国の交渉を担当した。「強者にのみ仕える」という考え方の持ち主。燕に生まれ、身一つで遊説して秦丞相・范雎との舌戦により丞相の席を譲り受けた経歴を持つ。"},
      {h:"斉の離脱", body:"合従軍編では斉王に謁見し、秦国滅亡で得る利益の概算の倍の値を支払うことを条件に、斉を合従軍から離脱させることに成功した。数字だけで一国を戦場から降ろした交渉である。"},
      {h:"最期", body:"始皇十年、容態が悪い中で斉王と李牧を咸陽まで招き、政と斉王の会談を実現させて自らも同席。統治のあり方を問う斉王に政が「法治国家」と答えたことに満足し、李牧との会談へ向かう政を見送って激励した後、眠るように息を引き取った。燕との同盟の段取りも済ませており、国葬並みの葬儀が行われた。"}],
    battles:[],
    rel:[{to:"ryofui", label:"主君"},{to:"f_ryofui", label:"四柱"}]
  },
  {
    id:"shibakuu", name:"司馬空", yomi:"しばくう", kind:"person", state:"秦", group:"呂不韋派",
    role:"呂氏四柱 / 土木", klass:"文官", first:"9巻", arc:"呂不韋編", status:"存命",
    tags:["四柱","土木","インフラ"],
    summary:"治水・土木を担う四柱。国力そのものを作る男。",
    detail:[{h:"役割", body:"戦争ではなく生産基盤で国を強くする担当。地味だが秦の国力の源。"},
      {h:"立場", body:"呂不韋四柱の一人。李斯・昌平君・蔡沢と並ぶ呂不韋政権の中核で、実務を支える文官である。"},
      {h:"位置づけ", body:"呂不韋が王を必要としない「金と人の国」を作ろうとした時、その仕組みを回していたのがこの四柱だった。政の親政とは、この四人をどう扱うかという問題でもあった。"}],
    battles:[],
    rel:[{to:"ryofui", label:"主君"},{to:"f_ryofui", label:"四柱"},{to:"risi",label:"四柱"},{to:"saitaku",label:"四柱"},{to:"shouheikun",label:"四柱"}]
  },
  {
    id:"taigo", name:"太后（趙姫）", yomi:"たいごう ちょうき", kind:"person", state:"秦", group:"—",
    role:"政の母", klass:"王・王族", first:"10巻", arc:"呂不韋編", status:"存命",
    tags:["母","趙","確執"],
    summary:"政の実母。趙での日々を経て、息子と深い断絶を抱える。",
    detail:[
      {h:"関係", body:"趙での人質時代に政を庇わなかった過去があり、母子の間には埋めがたい溝がある。"},
      {h:"立場", body:"呂不韋と近い位置におり、政治的にも政の障害となる。"},
      {h:"人物像", body:"趙での人質時代、幼い政を庇わなかった過去を持つ。母としての情と、身を守るための保身が入り混じった人物で、政との関係は最後まで単純な和解に向かわない。"},
      {h:"愛編", body:"呂不韋派と結んだ末に嫪毐を担ぎ、秦の内側にもう一つの権力の塊を作る。政にとっては、母が政敵として立ちはだかるという最も重い局面になる。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"息子"},{to:"ryofui", label:"結託"}]
  },
  {
    id:"rokuomi", name:"録嗚未", yomi:"ろくおみ", kind:"person", state:"秦", group:"騰軍",
    role:"騰軍の将", klass:"武将", first:"20巻", arc:"山陽攻略戦", status:"存命",
    tags:["騰軍","豪快"],
    summary:"騰の下で戦う豪快な将。",
    detail:[{h:"人物", body:"見た目通りの猛将タイプだが、騰の指揮下で規律よく働く。"},
      {h:"人物像", body:"豪快そのものの見た目どおりの猛将だが、騰の指揮下では規律よく働く。騰にいじられる役回りとしても定着している。"},
      {h:"小ネタ", body:"生前の王騎にも同僚にもよくいじられる立ち位置。田有と声優が同じ。"},
      {h:"戦歴", body:"馬陽では万極軍と交戦中に王騎の死を知って暴走し、万極軍に大打撃を与えた。合従軍編では臨武君に敗れて騰に救出され、その後は媧燐軍戦象隊と干央軍とともに渡り合う。著雍編で将軍に昇進し、魏軍本陣を落とす三主攻の一つを任された。"},
      {h:"韓攻略", body:"英呈平原では騰とともに洛亜完に迫って討ち取る寸前まで追い込んだ。新鄭無血開城の後、蘭城へ撤退した洛亜完ら残党の討伐に赴いて全滅させる。騰が六将を退くと告げた際は驚愕しつつも意思を尊重し、騰軍全軍の指揮を引き継いだ。全面戦争では録嗚未軍として顔聚軍と対峙している。"}],
    battles:["b_sanyou","b_gian","b_shintei"],
    rel:[{to:"tou", label:"上官"},{to:"f_ouki", label:"所属"}]
  },
  {
    id:"rankai", name:"ランカイ", yomi:"らんかい", kind:"person", state:"秦", group:"—",
    role:"成蟜側の巨人兵", klass:"刺客", first:"4巻", arc:"王都奪還編", status:"存命",
    tags:["巨人","王都奪還","怪力"],
    summary:"鎖に繋がれた巨躯の怪物。王宮での障害となった。",
    detail:[{h:"戦い", body:"人智を超えた膂力を持ち、山の民でさえ止められなかった。"},
      {h:"人物像", body:"異名は人猿。成蟜に罰せられることだけを恐れており、その恐怖が他の一切の恐怖を消している。"},
      {h:"最期", body:"王都奪還戦で山の民に討たれる。恐怖で縛られた怪物という存在が、政の掲げる理念と真逆の位置に置かれていた。"},
      {h:"出自", body:"常識外れの巨体と怪力を持つ巨漢。幼少期に化猿の子として売られていたところを成蟜に買われ、「お仕置き」という拷問に近い行為による恐怖で支配されていた。"},
      {h:"その後", body:"反乱鎮圧後は山の民に引き取られ、シュンメンが教育係となる。合従軍編では山の民とともに蕞の救援に駆けつけ、李牧軍相手にその暴威を揮って、信を除く飛信隊の面々を驚愕させた。傅抵が楊端和を狙った際にも、その前に立ちはだかっている。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"手駒"},{to:"shin", label:"交戦"}]
  },
  {
    id:"saji", name:"左慈", yomi:"さじ", kind:"person", state:"秦", group:"—",
    role:"暗殺者", klass:"刺客", first:"4巻", arc:"王都奪還編", status:"存命",
    tags:["刺客","王都奪還"],
    summary:"王宮に潜む凄腕の刺客。",
    detail:[{h:"戦い", body:"王都奪還戦で山の民と激突する手練れ。"},
      {h:"人物像", body:"竭氏傘下の将軍で上級武官。肆氏の片腕にして「竭氏の人斬り長」と呼ばれる。服を汚されただけで相手を真っ二つにするほど気性が荒い。"},
      {h:"最期", body:"王都奪還戦で、肆氏の指示により別働隊が通ると予測した回廊で待ち構え、壁や信たちと対峙。選抜された勇猛な山の民を圧倒するほどの武力を見せ、自らの剣を天下最強と豪語したが、壁に負わされた傷で剣が鈍り、信に敗死した。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"側"},{to:"f_sankai", label:"交戦"}]
  },
  {
    id:"shukyou", name:"朱凶", yomi:"しゅきょう", kind:"person", state:"秦", group:"—",
    role:"暗殺集団", klass:"刺客", first:"2巻", arc:"王都奪還編", status:"—",
    tags:["刺客","集団"],
    summary:"政の命を狙って放たれた暗殺集団。",
    detail:[{h:"役割", body:"逃亡中の政・信・河了貂を執拗に追う序盤の脅威。"},
      {h:"その後", body:"王都奪還の過程で退けられ、以後は表に出てこない。呂不韋派が刺客を放てるという事実だけが後の章に残る。"},
      {h:"集団", body:"呂氏陣営の要請で嬴政の暗殺を請け負った刺客集団。族長は物静かだが実力は確かな燕程で、実働の一人が徐完。"},
      {h:"何をしたか", body:"政と信を執拗に追い、黒卑村では里典の息子・有の脚を刺して信の行き先を尋問した。暗殺そのものは号馬の乱入によって機を失い、燕程は一度捕縛されるも脱走している。"}],
    battles:["b_outo"],
    rel:[{to:"sei", label:"標的"},{to:"shin", label:"交戦"},{to:"ryofui", label:"依頼を受ける"}]
  },
  {
    id:"ketsushi", name:"竭氏", yomi:"けつし", kind:"person", state:"秦", group:"—",
    role:"成蟜派 筆頭大臣", klass:"文官", first:"2巻", arc:"王都奪還編", status:"—",
    tags:["反乱","大臣"],
    summary:"成蟜を担いだ反乱の首謀者格。",
    detail:[
      {h:"人物像", body:"成蟜を担ぎ上げた反乱の首謀者格。王弟という旗印さえあれば国を動かせると踏んだが、政が山の民という想定外の札を持ち帰ったことで計算が崩れた。"},
      {h:"立場", body:"秦の左丞相。呂不韋打倒を目論む野心家で、王位を奪った後の国政委任を約束した成蟜とともに謀反を起こした。"},
      {h:"最期", body:"山の民が咸陽に現れた際、その戦力欲しさと盟を結びたいという言葉を信じ、山の民に紛れた政一派の侵入を許してしまう。本殿の戦いでランカイが敗れると成蟜を見捨てて逃げ出すが、騰に阻まれた上、河了貂の吹き矢を受けて怯んだところをバジオウとシュンメンに斬殺された。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"擁立"},{to:"shiishi", label:"同派"}]
  },
  {
    id:"shiishi", name:"肆氏", yomi:"しし", kind:"person", state:"秦", group:"—",
    role:"成蟜派 重臣", klass:"文官", first:"2巻", arc:"王都奪還編", status:"存命",
    tags:["反乱","大臣","変わり身"],
    summary:"成蟜派の重臣。状況に応じて立ち回る現実主義者。",
    detail:[{h:"人物", body:"信念より生存と実利で動く。反乱後もしぶとく政治の場に残る。"},
      {h:"人物像", body:"常に考え込んでいるような顔つきの生真面目な男。信念より実利で立ち回るため、反乱側にいながら生き残り、その後も朝廷に残る。"},
      {h:"その後", body:"反乱側にいながら生き延び、以後も朝廷に残り続ける。信念で動かない分、権力の風向きを読む嗅覚だけは確かだった。"}],
    battles:["b_outo"],
    rel:[{to:"seikyou", label:"腹心"},{to:"ketsushi", label:"同派"}]
  },

  /* ───────────── 蚩尤 ───────────── */
  {
    id:"kyoushou", name:"羌象", yomi:"きょうしょう", kind:"person", state:"蚩尤", group:"蚩尤族",
    role:"羌瘣の姉貴分", klass:"刺客", first:"15巻", arc:"蚩尤編（回想）", status:"戦死",
    tags:["蚩尤","回想","姉"],
    summary:"羌瘣が唯一心を許した姉貴分。継承の儀式で命を落とす。",
    detail:[{h:"意味", body:"羌瘣が復讐に取り憑かれる理由そのもの。二人で里を出る約束が果たされなかった。"},
      {h:"人物像", body:"面倒見がよく優しい一方、自分の腕には強い自信を持っていた。羌瘣にとっては姉であり、里の外の世界を教えてくれた唯一の相手。"},
      {h:"小ネタ", body:"子どもの生まれ方について、羌瘣にでたらめを教え込んでいたことがある。"},
      {h:"最期", body:"蚩尤となって外の世界を見たいという気持ちと、妹同然の羌瘣を殺めたくないという気持ちが葛藤し、“祭”の日に羌瘣を香で眠らせて一人で挑むが、幽連に謀殺された。白鳳はのちに羌礼へ受け継がれる。"}],
    battles:[],
    rel:[{to:"kyoukai", label:"妹分"},{to:"yuren", label:"殺された"},{to:"f_shiyuu", label:"一族"}]
  },
  {
    id:"yuren", name:"幽連", yomi:"ゆうれん", kind:"person", state:"蚩尤", group:"蚩尤族",
    role:"蚩尤族の刺客", klass:"刺客", first:"17巻", arc:"蚩尤編", status:"戦死",
    tags:["蚩尤","仇","巫舞"],
    summary:"羌象を手にかけた蚩尤族の刺客。羌瘣の仇。",
    detail:[{h:"因縁", body:"羌瘣が飛信隊を一時離れてまで追う相手。巫舞の練度は羌瘣を上回る。"},
      {h:"決着", body:"羌瘣との死闘の末に討たれる。これにより羌瘣は復讐から解放され、飛信隊へ戻る。"},
      {h:"人物像", body:"暗殺者として育てられ、情を断つために実の姉妹まで手にかけた。冷酷で傲慢、手段も選ばない。異名は蚩尤。"},
      {h:"最期", body:"楼山（ろうざん）で羌瘣に討たれる。"}],
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
      {h:"最期", body:"朱海平原。因縁の信との一騎討ちに応じ、壮絶な攻防の末に討ち取られて死亡した。人を超えた存在になるという目標のために王騎・麃公・多くの兵を屠り続けた男の終着点は、かつて自分が半殺しにした少年の刃だった。"},
      {h:"人物像", body:"相手の武の伸びしろを見抜き、子どもであっても将来の脅威になるなら殺す。武の頂点は一人でいいという思想に人生のすべてを捧げた。"},
      {h:"小ネタ", body:"呂布に重ねられることが多い。尾到・番陽と声優が同じ。"}
    ],
    battles:["b_bayou","b_kankoku","b_sai","b_gyou"],
    rel:[{to:"ouki", label:"宿敵"},{to:"shin", label:"因縁"},{to:"chousou", label:"共闘"},{to:"f_chou", label:"所属"},{to:"riboku", label:"協働"},{to:"hyoukou", label:"討った"}]
  },
  {
    id:"chousou", name:"趙荘", yomi:"ちょうそう", kind:"person", state:"趙", group:"趙軍",
    role:"馬陽 趙軍総大将", klass:"軍師", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["馬陽","総大将","知将"],
    summary:"馬陽の趙軍を率いた知将。王騎を罠に嵌めた策士。",
    detail:[{h:"戦略", body:"龐煖という札を隠し持ち、王騎を戦場の奥へ誘い込む大掛かりな罠を仕掛けた。"},
      {h:"人物像", body:"軍師として必要な冷静さと大局観を備えた男。王騎を戦場の奥へ誘い込む長い罠を組み上げた。"},
      {h:"何をしたか", body:"馬陽編では龐煖に代わって趙軍全軍の指揮を執る。策で蒙武軍を壊滅寸前まで追い込み、援軍として現れた王騎軍とも激突した。李牧が姿を現すまでの前半戦は、実質この男が回している。"},
      {h:"最期", body:"騰隊に追い詰められて離脱を試みるが逃げ切れず、騰に討たれた。死の間際、自らが大将代理を務めたことに満足し、王騎の死を見届けられなかったことだけが唯一の無念だと言い残している。"}],
    battles:["b_bayou"],
    rel:[{to:"ouki", label:"対峙"},{to:"houken", label:"切り札"},{to:"f_chou", label:"所属"}]
  },
  {
    id:"fuuki", name:"馮忌", yomi:"ふうき", kind:"person", state:"趙", group:"趙軍",
    role:"趙軍の将", klass:"武将", first:"10巻", arc:"馬陽の戦い", status:"戦死",
    tags:["馬陽","知将"],
    summary:"馬陽で麃公と激突した趙の将。",
    detail:[{h:"最期", body:"堅実な用兵で秦軍を苦しめたが、麃公の本能的な突撃に討ち取られる。"},
      {h:"人物像", body:"異名は知略の将。落ち着いた指揮で秦軍を苦しめたが、飛信隊に本陣を突かれたとき、自分がこの距離まで詰められたことがないと笑った。"},
      {h:"小ネタ", body:"異名は知略の将。飛信隊に本陣まで詰められたとき、ここまで来られたのは初めてだと小さく笑った。"}],
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
      {h:"最期", body:"馬陽で飛信隊と激突し、信に討たれる。『戦争が生む怨嗟』を象徴する敵役。"},
      {h:"人物像", body:"異名は強襲の将。長平で四十万とともに生き埋めにされ、そこから這い出た記憶だけで生きている。存在そのものが長平の亡霊。"}
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
      {h:"最期", body:"蛇甘平原で麃公との一騎打ちに敗れる。"},
      {h:"人物像", body:"魏火竜七師の一角。動く前に読み切るタイプで、戦車で麃公の突撃を分断し、敵陣深くに孤立させる策を打った。"},
      {h:"小ネタ", body:"首に巻いていた布は、亡くした家族の髪で編まれたものだった。"}
    ],
    battles:["b_dakan"],
    rel:[{to:"hyoukou", label:"宿敵"},{to:"f_gi", label:"所属"},{to:"kyuugen", label:"副将"},{to:"hakukisai", label:"副将"},{to:"gohoumei", label:"実子"},{to:"f_gikaryuu", label:"七師"}]
  },
  {
    id:"kan'ou", name:"干央", yomi:"かんおう", kind:"person", state:"秦", group:"騰軍",
    role:"王騎軍第四軍長 → 騰傘下将軍", klass:"武将", first:"11巻", arc:"馬陽の戦い〜", status:"存命",
    tags:["秦","王騎軍","不死身","突破力","韓攻略"],
    summary:"「不死身の干央」。死闘を最も得意とする王騎軍屈指の突破役。",
    detail:[
      {h:"人物像", body:"王騎軍第四軍長からのちに騰傘下将軍。「不死身の干央」の異名を持ち、死闘を最も得意とする。軍の突破力は王騎軍で一二を争う。"},
      {h:"馬陽", body:"序盤で馮忌軍と対峙し、馮忌を討ち取った信の名を戦場に高らかに宣言するという粋な計らいを見せた。信という名が中華に出た最初の瞬間である。その後、龐煖の夜襲にいち早く反応して攻撃を仕掛けたが、援軍に現れた万極と交戦して隙を突かれ負傷した。"},
      {h:"合従軍・著雍", body:"函谷関では媧燐軍の戦象隊に苦戦しながらも堅実な攻めで撤退させ、続く乱戦を生き残って録嗚未軍とともに媧燐軍の背後を急襲。著雍編で将軍に昇進した。"},
      {h:"韓攻略", body:"英呈平原では洛亜完軍の巧みな戦術で一時は殲滅されたかに見えたが、重傷を負いながら敵陣を突破し、丸裸同然の洛亜完に迫って韓軍を大いに動揺させた。この一撃が騰軍の逆転を作った。存命。"}
    ],
    battles:["b_bayou","b_kankoku","b_chakuyou","b_shintei"],
    rel:[{to:"tou", label:"配下"},{to:"ouki", label:"元上官"},{to:"rokuomi", label:"同僚"},{to:"ryuukoku", label:"同僚"},{to:"shin", label:"名を宣言"},{to:"fuuki", label:"追い詰める"},{to:"bankyoku", label:"交戦"},{to:"rakuakan", label:"突破"},{to:"f_ouki", label:"所属"}]
  },
  {
    id:"kyuugen", name:"宮元", yomi:"きゅうげん", kind:"person", state:"魏", group:"魏軍",
    role:"魏の将", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い", status:"戦死",
    tags:["蛇甘平原"],
    summary:"蛇甘平原で秦の歩兵部隊と激突した魏の将。",
    detail:[{h:"役割", body:"信たち歩兵にとって、初めて『将を討つ』という目標になった相手。"},
      {h:"人物像", body:"犠牲を美談にする物言いを嫌う、実利一辺倒の将。その視野の狭さが最後に命取りになった。"},
      {h:"戦い方", body:"呉慶軍の副将。戦略家でありながら武勇にも優れ、刃渡りが長く柄の短い槍を扱う。"},
      {h:"最期", body:"蛇甘平原戦では秦軍手前の丘に陣取り、地の利と戦車隊を駆使して秦軍に多大な被害を与えた。頂上まで突破してきた千人将・縛虎申との一騎討ちで、彼を槍で貫いたところを捉えられ、相討ちに倒れて死亡した。"}],
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
      {h:"山陽の決着", body:"四天王を次々に失い、最後は蒙武との真正面からの一騎打ちに競り負ける。山陽は秦の手に落ち、廉頗は戦場を去った。"},
      {h:"人物像", body:"戦を求めて渡り歩く生ける伝説。故国の兵とすら戦うことを厭わない一方、飢えていた輪虎を拾うような情の厚さも持つ。"},
      {h:"その後", body:"山陽を失った後は魏を離れ、最終的に楚の陳城に身を寄せる。三つの国を渡り歩いてなお、戦場から降りない男。"},
      {h:"小ネタ", body:"秦の六大将軍を、自分を理解できる数少ない友と見なしていた。昭王時代の大将軍で唯一、現在も存命の人物。"}
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
      {h:"最期", body:"秦の将を次々に狩った末、飛信隊の信と一騎打ちになり討たれる。信が『格上の将を討った』最初の戦い。"},
      {h:"人物像", body:"異名は廉頗の飛槍。普段は軽口が多く真面目に見えないが、積み上げた経験の量が桁違いで、戦場では別人になる。"},
      {h:"小ネタ", body:"おまけ話によると、若い頃は下働きをしていた時期がある。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"genpou", name:"玄峰", yomi:"げんぽう", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王 / 軍師格", klass:"軍師", first:"21巻", arc:"山陽攻略戦", status:"戦死",
    tags:["四天王","知略","老将"],
    summary:"廉頗軍の頭脳。老練な策で戦場を組み立てる。",
    detail:[{h:"役割", body:"四天王の中で唯一の策士型。廉頗の武を最大限に活かす盤面を作る。"},
      {h:"人物像", body:"廉頗四天王の一人で、かつては廉頗の師でもあった大軍略家。傲岸な性格で口癖は「阿呆」。策を巡らせて一方的に相手を殺戮する戦いを身上とする。"},
      {h:"柔軟さ", body:"武将特有の意地を持たないため、ある程度戦果を挙げた上で少数でも敵が迫ればあっさり撤退する柔軟さを持つ。輪虎に戦術を教えたのもこの男である。"},
      {h:"最期", body:"山陽編では緒戦で中央軍の第二陣を指揮し、奇策で秦軍に大打撃を与えた。その後、ゲリラ戦法に苦しむ介子坊に代わって左軍の指揮を執り、桓騎軍本陣の所在を見破る。しかし伝令に変装した桓騎たちの接近を許し、桓騎に首を刎ねられて戦死した。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"kaishibou", name:"介子坊", yomi:"かいしぼう", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王", klass:"武将", first:"21巻", arc:"山陽攻略戦", status:"存命",
    tags:["四天王","豪傑","巨漢"],
    summary:"廉頗四天王の武の中核。正面からの押し合いに強い。",
    detail:[
      {h:"人物像", body:"異名は廉頗の右腕。百を超える戦功を持つ猛将で、桓騎のような相手には、兵の心に恐怖が染み込むことを厄介だと評した。"},
      {h:"その後", body:"廉頗とともに魏を離れ、最終的に楚の陳城に落ち着く。"},
      {h:"戦い方", body:"廉頗四天王の筆頭。辮髪と大柄な体躯が特徴で、得物は長柄斧矛。変則的な戦い方は苦手だが、正面からのぶつかり合いでは廉頗に匹敵する。配下に巨漢ばかりの精鋭部隊を持つ。"},
      {h:"山陽", body:"序盤は左軍の指揮を執り、桓騎のゲリラ戦法と非道な精神攻撃に翻弄されるが、玄峰が見つけた桓騎軍本陣を襲撃して半壊させた。最終局面では断崖を騎馬で駆け上って廉頗に加勢し、蒙驁本陣で猛威を振るう。戦後は廉頗に従って楚へ亡命した。"}],
    battles:["b_sanyou"],
    rel:[{to:"renpa", label:"主君"},{to:"f_gi", label:"所属"}]
  },
  {
    id:"kyouen", name:"姜燕", yomi:"きょうえん", kind:"person", state:"魏", group:"廉頗軍",
    role:"廉頗四天王", klass:"武将", first:"21巻", arc:"山陽攻略戦", status:"存命",
    tags:["四天王","冷静","文武"],
    summary:"廉頗四天王の一人。落ち着いた指揮で戦線を保つ。",
    detail:[{h:"人物", body:"四天王の中では理知的で、荒い廉頗軍の中でバランスを取る役割。"},
      {h:"人物像", body:"言葉を選んでから話す落ち着いた男。獲物を追い詰めるように、休みなく圧をかけ続けるのが基本戦術。異名は中華十弓の一人。"},
      {h:"小ネタ", body:"首まわりが弱点で、廉頗に抱きつかれると本気で嫌がる。"},
      {h:"戦い方", body:"廉頗四天王の一人で「中華十弓」の一人。かつて小国の雄として廉頗と五分に渡り合い、国が滅んだ後に廉頗へ仕えた。矢は常人の何倍もの飛距離を誇り、自ら鏑矢を飛ばして離れた部隊へ指示を出し、軍を自在に操る。"},
      {h:"山陽", body:"右軍の指揮を執って王翦軍と渡り合う。壁の誘い込みの罠を見抜いて逆に嵌めるが、さらにそれを読んでいた王翦の罠に嵌って包囲された。降伏と勧誘を拒み、駆け付けた廉頗と合流。天然の要塞に立て籠もる王翦軍を包囲したまま戦いを終えた。戦後は廉頗に従って楚へ亡命。"}],
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
      {h:"番吾の敗戦", body:"始皇十五年の趙北部再侵攻では、李牧の策で若手二隊を引き離され、司馬尚に本陣まで斬り込まれて敗北。麻鉱・亜光・田里弥という傘下の柱を失いながら、倉央と王賁に守られて撤退した。"},
      {h:"人物像", body:"秦で最も危険な男と呼ばれる。内心を誰にも読ませず、勝てる戦にしか興味がないと公言する。息子の王賁でさえ、その冷たい計算を持て余す。"},
      {h:"小ネタ", body:"第16巻あたりの群衆に、仮面をつけた将らしき人物が紛れている。騰と並ぶ新六大将軍の古参。"}
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
      {h:"人物像", body:"十五歳で初陣して以来五十年間、戦歴を重ねた老将。昭王時代には六大将軍の影に隠れており、それゆえ彼らを嫌っていた。性格は頑固そのもので、秦国軍人であることを誇りに思っている。反目する桓騎の才能だけは認めていた。"},
      {h:"最期", body:"合従軍編で咸陽に招集され、函谷関の守将の一人となる。韓軍の毒兵器に侵されて余命を悟ると、桓騎軍とともに韓軍を襲撃し、韓大将軍・成恢を討ち取った。桓騎には「秦国一の武将となれ」と言い残して力尽き、死亡した。"}],
    battles:["b_kankoku"],
    rel:[{to:"seikai", label:"相討ち"},{to:"f_shin", label:"所属"}]
  },
  {
    id:"kanto", name:"干斗", yomi:"かんと", kind:"person", state:"秦", group:"騰軍",
    role:"騰軍の将", klass:"武将", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["騰軍","堅実"],
    summary:"騰軍の将。録嗚未と並ぶ騰の両輪。",
    detail:[{h:"人物", body:"録嗚未と対をなす騰軍の将。派手さはないが崩れない用兵をする。"},
      {h:"人物像", body:"異名は口だけ。怒りも喜びもすぐ顔に出る分かりやすい男だが、飛信隊の一員であることに強い誇りを持ち、先輩たちに恥じない働きをしようと必死になる。"},
      {h:"小ネタ", body:"先代の飛信隊員たちに憧れが強く、隊の名を汚さないことを行動基準にしている。"}],
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
      {h:"意味", body:"政が『光』と呼ぶものの原点。呂不韋との論戦で、政が中華統一の理由として語る記憶。"},
      {h:"人物像", body:"商人としては交渉で容赦なく押すが、根は情の深い人物。一度結んだ約束は最後まで守り抜くと決めていた。仲間からは頭（かしら）と呼ばれ慕われていた。"},
      {h:"最期", body:"秦趙の国境で命を落とす。追手を引き受け、政を秦側へ渡し切ってからの死だった。"}
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
      {h:"その後", body:"全面戦争の直前に武安城でカイネと結婚。存命。"},
      {h:"人物像", body:"名声にも栄達にも興味がなく、本心では農場で家族と静かに暮らしたいと願っている。穏やかで腰が低く、それが逆に底の見えなさになっている。"},
      {h:"異名", body:"雁門の救世主。北の異民族から国境を守り抜いた実績が、趙における彼の地位の土台になっている。"}
    ],
    battles:["b_kankoku","b_sai","b_kokuyou","b_gyou","b_gian","b_bango"],
    rel:[{to:"kaine", label:"側近"},{to:"houken", label:"協働"},{to:"sei", label:"対峙"},{to:"shunshinkun", label:"連合"},{to:"f_chou", label:"三大天"},{to:"f_gassho", label:"実質の頭脳"}]
  },
  {
    id:"kaine", name:"カイネ", yomi:"かいね", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧の側近", klass:"武将", first:"26巻", arc:"合従軍編", status:"存命",
    tags:["李牧軍","女武将"],
    summary:"李牧に付き従う女武将。趙軍の伝令と護衛を担う。",
    detail:[{h:"人物", body:"李牧に絶対の信頼を寄せ、その意図を汲んで動く。武人としての腕も確か。"},
      {h:"人物像", body:"極めて生真面目で、常に周囲を広く見ている。人の力量を見抜く目があり、敵味方に関係なく実力者とは通じ合える柔軟さも持つ。"},
      {h:"小ネタ", body:"朱海平原では、李牧の意図を汲んで単独で動く場面がある。武人としても伝令としても信頼されている。"}],
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
      {h:"著雍", body:"著雍防衛の総大将。凱孟・霊凰を投入して飛信隊らを迎え撃つが、信に霊凰を討たれ、自身も襲撃されると咄嗟に霊凰を身代わりにして脱出。立て直し不可能と判断して撤退した。"},
      {h:"人物像", body:"戦のことだけを冷静に考え抜く技術者型。父・呉慶の遺志を継ぎ、秦に一矢報いることを自分の使命にしている。異名は魏の筆頭将軍、そして火竜。"}
    ],
    battles:["b_kankoku","b_chakuyou"],
    rel:[{to:"gokei", label:"父"},{to:"f_gi", label:"総司令"},{to:"f_gassho", label:"参加"}]
  },
  {
    id:"shunshinkun", name:"春申君", yomi:"しゅんしんくん", kind:"person", state:"楚", group:"合従軍",
    role:"楚の宰相 / 合従軍総大将", klass:"文官", first:"26巻", arc:"合従軍編", status:"死亡",
    tags:["総大将","宰相","合従軍"],
    summary:"合従軍の総大将を務めた楚の宰相。",
    detail:[
      {h:"立場", body:"五国をまとめる旗頭として担がれた総大将。ただし実際の作戦設計は李牧に負うところが大きい。"},
      {h:"合従軍の限界", body:"連合が崩れ始めると、楚の損失を避ける判断に傾いていく。寄り合い所帯の弱さがそのまま出る。"},
      {h:"人物像", body:"項翼いわく毒舌家。苛立ちを隠さず、相手を突然こき下ろすような物言いをする。戦国四君の一人に数えられる大物でもある。"},
      {h:"最期", body:"のちに楚の陳城で命を落とす。合従軍の総大将を務めた男の退場は、楚という国の主導権が別の人物へ移ることを意味した。"}
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
      {h:"最期", body:"函谷関で蒙武と一騎打ちになり、力比べの末に討たれる。蒙武が『武でしか語れない男』から一段上がる契機になる。"},
      {h:"人物像", body:"異名は楚の巨人。超人的な膂力と連戦連勝の記録に裏打ちされた絶対の自信を持ち、退屈こそが自分の敵だと言い切った。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"moubu", label:"死闘"},{to:"shunshinkun", label:"主君"},{to:"f_so", label:"所属"},{to:"kouyoku", label:"配下"},{to:"hakurei", label:"配下"}]
  },
  {
    id:"rinbukun", name:"臨武君", yomi:"りんぶくん", kind:"person", state:"楚", group:"合従軍",
    role:"楚の将", klass:"武将", first:"27巻", arc:"合従軍編", status:"戦死",
    tags:["楚","函谷関"],
    summary:"函谷関で王翦と対峙した楚の将。",
    detail:[
      {h:"人物像", body:"のんびりした性格で、項翼が飛信隊に無茶な挑発をしても止めなかった。自分の力量には強い自信を持っていた。"},
      {h:"小ネタ", body:"項翼が飛信隊に無茶な挑発を仕掛けても止めなかった。放任に見えて、自分の武への自信がそうさせていた。"},
      {h:"戦い方", body:"「楚の剛将」の異名を持つ猛将で、得物は大錘。常人より一回り大きな巨漢で、怪力と卓越した武勇を持つ。楚南部の異民族・百越を相手に長年戦い、百を超える勇猛な将を討ち取ってきた。白麗の姉・白翠を妻に持つ。"},
      {h:"最期", body:"合従軍編では氾斗平原で騰軍と相対し、軍長の一人・同金を名乗った直後に瞬殺。函谷関では録嗚未をも圧倒する力を見せた。しかし騰との一騎討ちで逆に力の差を見せつけられ敗死する。遺体は当日夜に火葬された。"}],
    battles:["b_kankoku"],
    rel:[{to:"ousen", label:"討たれた"},{to:"f_so", label:"所属"}]
  },
  {
    id:"seikai", name:"成恢", yomi:"せいかい", kind:"person", state:"韓", group:"合従軍",
    role:"韓の将 / 毒の使い手", klass:"刺客", first:"27巻", arc:"合従軍編", status:"戦死",
    tags:["毒","搦め手","張唐"],
    summary:"毒を武器に函谷関を狙った韓の将。",
    detail:[
      {h:"人物像", body:"軍議でもほとんど喋らず、戦況が動いても表情を変えない。笑うこと自体が稀な男だった。"},
      {h:"戦い方", body:"様々な毒物を集めて日々研究を重ねた結果、高い即効性と殺傷力を誇る多種の奇毒を扱う。かつては男も色を覚えるほどの美男子だったが、長期間の猛毒研究の悪影響で現在の醜悪な容貌に変貌した。"},
      {h:"最期", body:"合従軍編では韓軍総大将を務め、自慢の毒兵器で張唐軍の弱体化に成功する。しかし桓騎・張唐の混合部隊の奇襲を受け、毒に侵されて余命を悟った張唐に討たれて死亡した。"}],
    battles:["b_kankoku"],
    rel:[{to:"choutou", label:"相討ち"},{to:"f_kan", label:"所属"}]
  },
  {
    id:"orudo", name:"オルド", yomi:"おるど", kind:"person", state:"燕", group:"合従軍",
    role:"燕の大将軍", klass:"武将", first:"27巻", arc:"合従軍編", status:"存命",
    tags:["騎馬","燕","王翦"],
    summary:"騎馬を操る燕の大将軍。函谷関で王翦と読み合う。",
    detail:[{h:"人物", body:"個の武ではなく騎馬軍団の運用で戦う将。王翦との駆け引きは合従軍の中でも異色の展開になる。"},
      {h:"人物像", body:"異名は五十の山岳民族の王。大将軍でありながら気さくでよく笑い、劇辛を失ったことでも趙や李牧を恨まない割り切りの良さを持つ。"},
      {h:"小ネタ", body:"劇辛を失っても趙や李牧を恨まず、むしろ笑い飛ばす。合従軍という寄り合い所帯の中では珍しく、感情ではなく損得で動ける将。"}],
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
      {h:"収録範囲メモ", body:"単行本27〜30巻あたり。"},
      {h:"布陣（西→東）", body:"西端で王翦軍が燕のオルド軍を受け、関そのものには蒙驁軍・桓騎軍・張唐軍が入って魏の呉鳳明軍と韓の成恢軍を迎える。東側は騰軍と蒙武軍が楚の臨武君軍・媧燐軍・汗明軍と噛み合い、さらに東で麃公軍が趙の慶舎軍と当たった。"},
      {h:"一日目", body:"呉鳳明の井闌車が二基取り付き、一基は張唐の持ち場に到達、もう一基は桓騎が焼き払う。趙戦線では信が万極を、楚戦線では騰が臨武君を討ち取った。"},
      {h:"二日目以降", body:"楚第一軍の残存が無策で突撃し、関は通常の攻城戦に戻る。媧燐は堅実に攻めれば十日で落ちると本営に報告し、時間切れの圧力が秦にかかり続けた。"},
      {h:"勝負どころ", body:"蒙武が汗明を、張唐が成恢と刺し違え、王翦が燕と楚の将を削る。だが関を守り切っても、李牧が本陣を離れていた事実が判明した時点で戦の意味が変わっていた。"},
      {h:"この戦いの意味", body:"秦は関を落とされなかったが、勝ったのではなく耐えただけ。合従軍の設計者である李牧の狙いは最初から函谷関ではなかった。"}
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
      {h:"収録範囲メモ", body:"単行本31〜33巻あたり。このDBはここまでを収録。"},
      {h:"守りの配置", body:"北壁を介億、東壁を壁、西壁を昌文君、南の正門を信が担当。本営には河了貂と蒙毅が軍師として入り、政は四つの壁を巡回して士気を保つ役に回った。介億は昌平君が送った騎兵百と指揮官五十を連れて到着している。"},
      {h:"一日目", body:"四方同時攻撃。南壁は飛信隊が押し返したが、風を味方につけた趙の弓に東壁が追い詰められる。河了貂が麃公軍の生き残りを予備兵として投入し、崩れかけた東壁を戻した。"},
      {h:"一日目の夜", body:"李牧は軍を二分し、半分を休ませて残り半分で夜襲の音だけを立てる。実体が見えない蕞側は一晩中矢を射続け、睡眠を奪われた。"},
      {h:"二日目", body:"消耗した状態で新手を受ける。カイネと傅抵が壁に取り付き、傅抵は竜川と田有を瞬時に斬った。信は羌瘣との稽古で得た読みで傅抵を沈め、河了貂を狙ったカイネを壁から落とす。"},
      {h:"三〜四日目", body:"限界を超えたはずの民兵が四つの壁すべてで押し返し始める。昌文君はこれを未知の領域と呼び、李牧自身もこの粘りの正体を掴めずにいた。籠城に必要な日数は八日と示されている。"},
      {h:"五日目", body:"兵が攻撃を受ける前に倒れ始める。政は自ら南壁に立ち、子どもたちを助けるために親衛隊を出した末に首元を斬られて重傷を負う。秦王が蕞にいることが趙側に知れ、李牧は予備兵を全投入した。"},
      {h:"六日目", body:"王の負傷で戦意が消えかけるが、政は馬上に立ち上がって再び壁を巡る。街はもう一度立ち上がり、介億が北壁の余力を東西へ回して均衡を保った。"},
      {h:"七日目・決着", body:"西壁が抜かれ、内側から門を開けられて趙兵が流れ込む。そこへ楊端和の三万が到着。政が誰にも告げずに送っていた使者が届いていた。信は龐煖と再戦し、胸を突いて王騎の古傷の上を斬る。李牧は撤退を選び、殿を務めた晋成常はバジオウに討たれた。"}
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
      {h:"残したもの", body:"摩論とオギコに「生き残った奴らに以前みたいなクソみたいな生き方をさせるな」という言葉を託した。摩論は後に桓騎軍の残党を率いて傭兵団を始める。信にとっては、最後まで理解も肯定もできないまま消えた将になった。"},
      {h:"人物像", body:"異名は首斬り桓騎。殺気とも違う何かを放っており、対峙した者が理由も分からず剣を抜いてしまうと言われる。"},
      {h:"小ネタ", body:"兵の鎧を着るのを嫌がっていた。理由は動きにくいからではなく、単に趣味に合わないから。"}
    ],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"f_kanki", label:"総大将"},{to:"shin", label:"上官・対立"},{to:"maron", label:"配下"},{to:"raido", label:"配下"},{to:"kokuou", label:"配下"},{to:"zenou", label:"配下"},{to:"naki", label:"元配下"},{to:"ousen", label:"同格"},{to:"youtanwa", label:"同格"}]
  },
  {
    id:"maron", name:"摩論", yomi:"まろん", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の将 / 弁の立つ参謀格", klass:"軍師", first:"34巻", arc:"黒羊丘の戦い", status:"存命",
    tags:["桓騎軍","口八丁"],
    summary:"桓騎軍で唯一まともに口が回る参謀格。",
    detail:[{h:"役割", body:"荒くれ揃いの桓騎軍で、交渉や段取りといった『言葉の仕事』を引き受ける。"},
      {h:"小ネタ", body:"料理が非常に上手い。一方で武力は桓騎軍の主要メンバーで最も低い。"},
      {h:"人物像", body:"桓騎軍随一の智将。黒桜と同じく野盗時代からの配下で、自称「紳士」。常に丁寧な口調で話すが、どこか相手を見下す慇懃無礼な性格。料理が得意。"},
      {h:"捕虜処刑", body:"扈輒軍との戦いで桓騎たちが扈輒を討つと、その死を敵全体に報せて投降を促し数万を捕虜とした。しかし桓騎の命令で全員が処刑される。乗り込んできた政が桓騎の斬首を命じた際には、慌てて割って入って弁明し、斬首を取り止めさせた。"},
      {h:"その後", body:"肥下では桓騎の指示で本陣から離れた場所に配置され、生き残る。桓騎の「生き残った奴らに以前みたいなクソみたいな生き方をさせるな」という遺言通り、桓騎軍の残党を率いて傭兵団を始める意向を李信に語った。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"raido", name:"雷土", yomi:"らいど", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の将", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","荒くれ","忠義"],
    summary:"桓騎軍の主力を担う荒くれ。桓騎への忠義は誰よりも厚い。",
    detail:[{h:"人物", body:"見た目通りの乱暴者だが、部下と桓騎に対する情は深い。実働部隊の要。"},
      {h:"人物像", body:"粗暴な性格だが戦況を見極めることに長け、野盗時代に培った知恵と経験を駆使する。かつて桓騎が雷土とその一家を取り込もうとした時には相当苦労したという。今は桓騎の考えが読めなくても黙って信じるほど信頼が厚い。"},
      {h:"火兎", body:"黒羊では左翼軍大将として岳嬰軍と戦い、初日に慶舎の策で危機に陥ると、ゼノウとともに野盗時代の笛「火兎」を吹いて脱出。その後ゼノウらと中央丘の趙軍を襲撃した。"},
      {h:"最期", body:"扈輒軍との戦いでは右翼軍を指揮し、龍白軍と対峙。オギコから桓騎の作戦を聞いて後退する最中、龍白を誘い出して討つが、駆け付けた竜布に捕らえられる。扈輒軍本陣に連行され、凄惨な拷問の末に死亡した。どれだけ拷問されても最期まで口を割らなかった。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"kokuou", name:"黒桜", yomi:"こくおう", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の弓将", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","弓","女将"],
    summary:"桓騎軍の弓を束ねる女将。遠距離から確実に将を落とす。",
    detail:[{h:"役割", body:"弓隊を率い、桓騎の奇襲に必要な『確実な一射』を担当する。"},
      {h:"小ネタ", body:"泳げず、桓騎軍が川を渡った際に溺れかけたことがある。"},
      {h:"人物像", body:"配下から「姐さん」と呼び慕われる女傑。弓の名手で一流の戦術家。面食いで部下の扱いに容姿の差が出る。桓騎に惚れており、料理は非常に下手。"},
      {h:"戦歴", body:"黒羊では副官として中央丘の右翼で紀彗軍と戦い、紀彗を戦の鍵を握る人物だと警戒した。扈輒軍との戦いでは厘玉とともに中央軍を指揮し、扈輒討ち死に後は竜布軍を撃退している。政の尋問では、桓騎の斬首を命じられた豹司牙に立ちはだかり、逆に剣を折られた。"},
      {h:"最期", body:"肥下城への森林地帯で李牧軍を奇襲し、討ち取る寸前まで追い詰めるが、趙軍の援軍が次々と駆け付けて果たせず。背後から趙兵の槍で腹部を貫かれ、桓騎軍の最後の突撃の寸前で力尽き、騎馬から転げ落ちて息絶えた。"}],
    battles:["b_kokuyou","b_gyou","b_gian"],
    rel:[{to:"kanki", label:"主君"},{to:"f_kanki", label:"所属"}]
  },
  {
    id:"zenou", name:"ゼノウ", yomi:"ぜのう", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍の怪力", klass:"武将", first:"34巻", arc:"黒羊丘の戦い", status:"戦死",
    tags:["桓騎軍","怪力","巨漢"],
    summary:"言葉より力で語る桓騎軍の巨漢。人間離れした膂力を持つ。",
    detail:[{h:"人物", body:"一族ぐるみで桓騎軍に属する怪力集団の頭。ぶつければ何でも壊れる、という使い方をされる。"},
      {h:"人物像", body:"異名は桓騎の斧。言葉より力で語る一族の頭で、ぶつければ何でも壊れるという使われ方をする。"},
      {h:"戦い方", body:"桓騎軍最強の武力かつ随一の獰猛さを誇るゼノウ一家の棟梁。死地にも嬉々として突っ込むため戦狂いとまで言われる。蒙武よりも一回り大きい体格と、野牛の首を素手で捩じ切る膂力の持ち主。"},
      {h:"黒羊・鄴", body:"黒羊では初日に慶舎の策で危機に陥るが、雷土に促されて野盗時代の笛「火兎」を使い脱出。四日目には飛信隊を襲撃した慶舎を逆に追い詰めた。鄴では、開門と同時に李牧軍との交戦を勝手に止め、難民を押し除けて真っ先に入城している。"},
      {h:"最期", body:"肥下城への森林地帯で李牧軍に奇襲をかけるが、駆け付けた上和龍に致命傷を負わされる。しかし桓騎の最後の号令で息を吹き返し、上和龍の頭を掴んで握り潰して相打ちとなり戦死した。"}],
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
      {h:"最期", body:"肥下で李牧軍に包囲された桓騎らを見つけて突撃を敢行。雲玄を討ち取ったが趙兵に深傷を負い、桓騎と同じくらい李牧のすぐそばまで接近したところで息絶えた。桓騎軍を離れて飛信隊に移っていながら、最後は桓騎のもとへ戻った。"},
      {h:"人物像", body:"落ち着いた物腰で表情をあまり変えないが、常に周囲をよく見ている。桓騎が彼を単独行動に使った理由でもある。"}
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
      {h:"最期", body:"黒羊丘で飛信隊と噛み合い、読み合いの果てに信に討たれる。李牧にとって痛恨の損失となる。"},
      {h:"人物像", body:"物腰は丁寧で礼儀正しい。自分の罠に敵が引き裂かれていく様を眺めるのを好む一方、相手が期待外れだと露骨に苛立った。"},
      {h:"小ネタ", body:"沈黙の狩人という異名を付けたのは李牧本人。おまけ話では、李牧に拾われる前は孤児だったことが明かされている。"}
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
      {h:"朱海平原", body:"初日に楽華隊と麻鉱軍に窮地へ追い込まれたが、李牧が麻鉱を討ったことで形勢逆転。麻鉱軍を壊滅させようとしたが失敗し、以後は左翼の将となった蒙恬の策で膠着状態に持ち込まれた。"},
      {h:"人物像", body:"故郷・李岸への愛が桁外れで、それが兵の士気の源になっている。民を大切にする統治者であり、義兄弟との絆も深い。"}
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
      {h:"収録範囲メモ", body:"単行本41〜45巻あたり（アニメ第4シリーズ終盤〜第5シリーズ）。"}
    ],
    battles:[],
    rel:[{to:"kanki",label:"主将"},{to:"keisha",label:"敵将"},{to:"kisui",label:"敵将"},{to:"shin",label:"参戦"},{to:"tenn",label:"参戦"},{to:"kyoukai",label:"参戦"},{to:"naki",label:"参戦"},{to:"riboku",label:"敵軍"},{to:"f_chou",label:"対戦国"}]
  },

  /* ───────────── 楚（合従軍〜三国戦） ───────────── */
  {
    id:"kouyoku", name:"項翼", yomi:"こうよく", kind:"person", state:"楚", group:"合従軍",
    role:"楚の将軍 / 汗明の下の若手", klass:"武将", first:"25巻", arc:"合従軍編", status:"存命",
    tags:["楚","合従軍","函谷関","雷","若手"],
    summary:"『雷』の異名を持つ楚の若き猛将。汗明とともに函谷関へ攻め上る。",
    detail:[
      {h:"人物", body:"楚の名門・項一族に連なる若い将。直情的で戦を楽しむ質だが、武の伸びしろは楚軍でも屈指。白麗と二人で『楚の次の世代』として扱われる。"},
      {h:"函谷関", body:"汗明の指揮下で秦の関に取り付き、蒙武軍と正面から噛み合う。単騎の突破力で秦兵を薙ぎ倒し、若さゆえの粗さも含めて強い印象を残す。"},
      {h:"その後", body:"合従軍が崩れた後も生き延び、楚が再び秦と刃を交える戦いに姿を見せる。"},
      {h:"人物像", body:"無礼で騒がしいが根は明るく、戦になると一気に凄みが増す。その気質は好敵手である信とよく似ている。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"kanmei", label:"上官"},{to:"hakurei", label:"同僚"},{to:"moubu", label:"交戦"},{to:"f_so", label:"所属"},{to:"f_gassho", label:"参加"},{to:"kouen", label:"同族"}]
  },
  {
    id:"hakurei", name:"白麗", yomi:"はくれい", kind:"person", state:"楚", group:"合従軍",
    role:"楚の将軍 / 弓の名手", klass:"武将", first:"25巻", arc:"合従軍編", status:"存命",
    tags:["楚","合従軍","函谷関","弓","若手"],
    summary:"『十弓』の二位を自称する楚の弓将。項翼と並ぶ楚の次世代。",
    detail:[
      {h:"人物", body:"中華の弓の名手を並べた『十弓』で自分は二番目だと言い切る、冷静で自信家の将。突っ込む項翼とは正反対に、距離を取って戦う。"},
      {h:"函谷関", body:"高所から秦兵を精確に射抜き、関の守りを削る。武で押す楚軍の中で唯一『間合いを支配する』タイプとして機能する。"},
      {h:"その後", body:"合従軍の失敗後も楚軍に残り、項翼とともに後の戦線へ出てくる。"},
      {h:"人物像", body:"生真面目で気が短く、任務には極めて忠実。項翼が羽目を外すたびに叱りつける、二人組の常識枠。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"kanmei", label:"上官"},{to:"kouyoku", label:"同僚"},{to:"f_so", label:"所属"},{to:"f_gassho", label:"参加"}]
  },
  {
    id:"karin", name:"媧燐", yomi:"かりん", kind:"person", state:"楚", group:"楚軍",
    role:"楚の大将軍 / 軍総司令第二位", klass:"軍師", first:"29巻", arc:"合従軍編〜三国戦", status:"存命",
    tags:["楚","大将軍","知略","女将軍"],
    summary:"知略98を誇る楚の大将軍。武ではなく算術で戦を組み立てる女将。",
    detail:[
      {h:"人物", body:"楚軍の序列で総司令に次ぐ位置にいる大将軍。豪快な見た目に反して思考は徹底して計算的で、戦を『損得の勘定』として捉える。"},
      {h:"合従軍編", body:"連合の中で姿を見せるが、この時点では前面に出てこない。楚が汗明のような武だけの国ではないことを示す存在。"},
      {h:"三国戦", body:"秦・魏の連合が楚の要衝を攻めた戦いで本格的に指揮を執り、秦の将たちと知略をぶつけ合う。"},
      {h:"人物像", body:"冷酷で読めない性格で、味方にとっても危険な存在。部下の魯金を自ら処断したことがあり、春申君にすらそう評されていた。"},
      {h:"小ネタ", body:"自分の身長にはやや複雑な感情を持っている。それでも部下からの忠誠は厚い。"}
    ],
    battles:[],
    rel:[{to:"f_so", label:"大将軍"},{to:"shunshinkun", label:"同国"},{to:"kouen", label:"同格"},{to:"manu", label:"配下"},{to:"f_gassho", label:"参加"}]
  },
  {
    id:"kouen", name:"項燕", yomi:"こうえん", kind:"person", state:"楚", group:"楚軍",
    role:"楚の大将軍 / 項一族の当主格", klass:"武将", first:"31巻", arc:"合従軍編〜", status:"存命",
    tags:["楚","大将軍","項一族","楚の虎"],
    summary:"『楚の虎』と呼ばれる大将軍。楚軍の頂点に立つ将。",
    detail:[
      {h:"人物", body:"楚の武の象徴で、名門・項一族を束ねる立場にある大将軍。中華全体で見ても最上位に数えられ、その名が出るだけで盤面の重さが変わる。"},
      {h:"位置づけ", body:"合従軍の時点では楚の後方にいて、直接は秦と刃を交えない。楚が本気で動いたときに何が出てくるのかを示す『まだ抜いていない札』として置かれている。"},
      {h:"小ネタ", body:"楚の頂点として名前だけが先行している状態。作中で本格的に動いたとき、楚という国の格が一段変わることになる。"}
    ],
    battles:[],
    rel:[{to:"f_so", label:"大将軍"},{to:"kouyoku", label:"同族"},{to:"karin", label:"同格"},{to:"shunshinkun", label:"同国"}]
  },
  {
    id:"goumasho", name:"剛摩諸", yomi:"ごうましょ", kind:"person", state:"楚", group:"合従軍",
    role:"楚の将軍", klass:"軍師", first:"30巻", arc:"合従軍編", status:"存命",
    tags:["楚","合従軍","知略型"],
    summary:"武より読みで戦う楚の将。合従軍の一角を担う。",
    detail:[{h:"役割", body:"力押しの多い楚軍の中で、戦況を読んで部隊を動かすタイプ。寄り合い所帯の連合の中で、楚の損得を計算しながら動く。"},
      {h:"人物像", body:"詳細は多く語られていないが、真面目で肝の据わった男。汗明が討たれた場面では、それまでの自信が揺らぐ様子を見せた。"},
      {h:"小ネタ", body:"汗明が討たれた場面では、それまでの自信ありげな態度が崩れた。楚軍にとって汗明という柱がどれほど大きかったかを示す反応でもある。"}],
    battles:["b_kankoku"],
    rel:[{to:"f_so", label:"所属"},{to:"f_gassho", label:"参加"},{to:"shunshinkun", label:"配下"}]
  },
  {
    id:"manu", name:"満羽", yomi:"まんう", kind:"person", state:"楚", group:"楚軍",
    role:"楚の将軍 / 武の化身", klass:"武将", first:"60巻", arc:"三国戦", status:"存命",
    tags:["楚","三国戦","武力97","蒙武"],
    summary:"武力97を誇る楚の猛将。蒙武と真正面からぶつかる男。",
    detail:[
      {h:"武", body:"楚軍でも別格の膂力を持ち、正面からの押し合いで相手を壊す純粋な武の将。蒙武・汗明と同じ系統の強さでありながら、その戦い方には別の陰がある。"},
      {h:"蒙武との死闘", body:"秦・魏連合が楚の要衝を攻めた戦いで蒙武と一騎打ちに入る。武でしか語れなかった蒙武が、もう一段先へ行くための相手になる。"},
      {h:"人物像", body:"故郷・僻（へき）では英雄として愛された男で、国を守るためなら何でもする覚悟を持っていた。その愛国心が、ある出来事を境に別の形へ変わっていく。"}
    ],
    battles:[],
    rel:[{to:"moubu", label:"死闘"},{to:"karin", label:"上官"},{to:"f_so", label:"所属"}]
  },
  {
    id:"sentoun", name:"千斗雲", yomi:"せんとうん", kind:"person", state:"楚", group:"楚軍",
    role:"楚の将軍", klass:"武将", first:"60巻", arc:"三国戦", status:"存命",
    tags:["楚","三国戦","武力95"],
    summary:"武力95の楚将。満羽と並ぶ楚の攻め手。",
    detail:[{h:"戦い方", body:"速さと膂力で敵陣を割るタイプ。楚が『武の国』と呼ばれる所以を体現する将の一人。"},
      {h:"人物像", body:"十曲軍の将たちに共通して、楚そのものへの忠誠は薄い。満羽とどちらが先に敵本陣へ届くかを競うような戦好き。服装への常識も薄い。"},
      {h:"小ネタ", body:"服装への頓着がなく、常識の枠から外れた振る舞いが多い。十曲軍という集団の異常さを分かりやすく体現している。"}],
    battles:[],
    rel:[{to:"karin", label:"上官"},{to:"f_so", label:"所属"},{to:"manu", label:"同僚"}]
  },
  {
    id:"genu", name:"玄右", yomi:"げんう", kind:"person", state:"楚", group:"楚軍",
    role:"楚の将軍（元大将軍）", klass:"軍師", first:"60巻", arc:"三国戦", status:"存命",
    tags:["楚","三国戦","知略型","元大将軍"],
    summary:"かつて大将軍位にあった楚の老練な将。",
    detail:[{h:"人物", body:"大将軍を退いた後も前線に立ち続ける古参。武で押す若手の後ろで、戦全体の形を整える役目を担う。"},
      {h:"人物像", body:"十曲軍の一人で、こちらも楚への忠誠は薄い。満羽や千斗雲のように侵攻の報せに沸き立つことはなく、静かに戦況を見ている。"},
      {h:"小ネタ", body:"侵攻の報せに沸き立つ満羽や千斗雲と違い、玄右は静かに戦況だけを見ている。同じ十曲軍でも温度がまるで違う。"}],
    battles:[],
    rel:[{to:"karin", label:"同陣"},{to:"f_so", label:"所属"}]
  },

  /* ───────────── 燕・韓（追加） ───────────── */
  {
    id:"gekishin", name:"劇辛", yomi:"げきしん", kind:"person", state:"燕", group:"燕軍",
    role:"燕の大将軍", klass:"武将", first:"12巻", arc:"馬陽の戦い（言及）", status:"戦死",
    tags:["燕","大将軍","龐煖","救世主"],
    summary:"『燕の救世主』と呼ばれた大将軍。龐煖に討たれた過去を持つ。",
    detail:[
      {h:"人物", body:"元は趙の出でありながら燕に迎えられ、傾いた国を立て直した名将。指揮95・知略92と、武偏重の中華では珍しくバランスの取れた将だった。"},
      {h:"龐煖との因縁", body:"武神・龐煖に討たれ、燕は最大の柱を失う。龐煖という怪物が『国を一つ傾ける』規模の存在であることを示す前史になっている。"},
      {h:"人物像", body:"貪欲で野心的、そして裏切りも辞さない性格。王騎の死を聞いて笑うような男で、傭兵的な価値観で動いていた。"},
      {h:"最期", body:"燕の中山で龐煖に討たれる。"}
    ],
    battles:[],
    rel:[{to:"houken", label:"討たれた"},{to:"f_en", label:"大将軍"},{to:"orudo", label:"同国"}]
  },
  {
    id:"kanpishi", name:"韓非子", yomi:"かんぴし", kind:"person", state:"韓", group:"—",
    role:"韓の思想家（法家）", klass:"文官", first:"46巻", arc:"官吏編〜", status:"死亡",
    tags:["韓","法家","思想","李斯"],
    summary:"法によって国を治める思想を説いた韓の公子。政が招こうとした男。",
    detail:[
      {h:"思想", body:"人は善では動かない、法と仕組みで動かすべきだという法家の思想を突き詰めた人物。秦が中華統一の後に何をするのかという問いに直接つながる。"},
      {h:"秦との関わり", body:"嬴政はその著述に強く惹かれ、彼を朝廷に招こうとする。信と騰が韓へ向かう理由にもなる。"},
      {h:"人物像", body:"秦の使者を前にしても平然と秦を批判する胆力の持ち主。人間の本質を知りたいという欲求が、法家思想の探究に向かわせた。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"招かれる"},{to:"risi", label:"同門"},{to:"f_kan", label:"公子"},{to:"shin", label:"接点"},{to:"tou", label:"接点"}]
  },

  /* ───────────── 追加: 趙（王族・廷臣・青歌・慶舎・扈輒・紀彗・犬戎ほか） ───────────── */
  {
    id:"rinshoujo", name:"藺相如", yomi:"りんしょうじょ", kind:"person", state:"趙", group:"藺相如軍",
    role:"旧・趙三大天", klass:"武将", first:"52巻", arc:"鄴編（回想）", status:"病死",
    tags:["趙","三大天","藺家十傑","刎頸の交わり","予言"],
    summary:"敵味方すべてを掌で転がして勝つ、と言い切った大戦略家。趙三大天の一角。",
    detail:[
      {h:"人物", body:"旧・趙三大天の一人で、廉頗と刎頸の交わりを結んだ間柄。兄弟に例えられる関係だった。李牧からは「智」と「勇」を兼ね備えた大戦略家と評される。"},
      {h:"戦い方", body:"大将軍とは敵味方すべてを掌で転がして勝つ者だ、という考えの持ち主。自分に足りない「武」を担わせるため、藺家十傑と呼ばれる十人の将を配下に置いた。尭雲と趙峩龍はその生き残りである。"},
      {h:"予知にも近い先見", body:"生前に一度だけ秦六将・王騎と会い、中華の行く末を語り合っている。全盛期に突然病に倒れ、病死した。"},
      {h:"最期の遺言", body:"死の間際、尭雲と趙峩龍の二人に朱海平原での奮戦を匂わせる予言を残し、まだ役目があるから殉死はするなと言い置いた。二人はその二つの遺言を抱えたまま数十年を生き、朱海平原で信と王賁に託して死んだ。"}
    ],
    battles:[],
    rel:[{to:"gyouun",label:"配下"},{to:"chougaryuu",label:"配下"},{to:"renpa",label:"刎頸の交わり"},{to:"ouki",label:"対話"},{to:"riboku",label:"先代三大天"},{to:"f_chou",label:"三大天"}]
  },
  {
    id:"kakukai", name:"郭開", yomi:"かくかい", kind:"person", state:"趙", group:"趙朝廷",
    role:"趙大臣 → 宰相", klass:"文官", first:"52巻", arc:"鄴編〜", status:"存命",
    tags:["趙","佞臣","宰相","呂不韋と内通","李牧失脚"],
    summary:"李牧を投獄し趙の政権を奪った佞臣。裏で呂不韋と繋がっている。",
    detail:[
      {h:"人物", body:"趙の大臣からのちに宰相。李牧を失脚させて政権を握った佞臣で、裏では秦の呂不韋と繋がっている。趙という国が内側から腐っていく過程そのものを体現する男。"},
      {h:"やったこと", body:"鄴編では朱海平原敗戦の罪を李牧一人に着せて地下牢に投獄し、公開処刑を言い渡した。李牧の助言はことごとく握り潰している。悼襄王の急死で立場が危うくなるが、末子・遷が次期王に指名されたことで再び実権を得て、太子嘉と李牧一派の粛清に動いた。"},
      {h:"矛盾", body:"一方で、握り潰していたはずの李牧の助言を使って対秦防衛網を築いている。扈輒の戦死の報に愕然とし、廉頗の帰国要請は拒みながら、結局は李牧を頼らざるを得なくなった。"},
      {h:"その後", body:"李牧が肥下で桓騎を討った時は些細な難癖で幽繆王に讒言したが聞き入れられず、番吾の大勝でますます自分の立場が危うくなり、手を打とうと躍起になっている。存命。"}
    ],
    battles:[],
    rel:[{to:"riboku",label:"失脚させる"},{to:"ryofui",label:"内通"},{to:"youka",label:"取り入られる"},{to:"yuubokuou",label:"仕える"},{to:"ka",label:"粛清対象にする"},{to:"f_chou",label:"宰相"}]
  },
  {
    id:"youka", name:"姚賈", yomi:"ようか", kind:"person", state:"趙", group:"趙朝廷",
    role:"趙家臣（実は秦の間諜）", klass:"文官", first:"52巻", arc:"鄴編〜", status:"存命",
    tags:["趙","間諜","昌文君","李斯","韓非"],
    summary:"郭開に取り入った趙の家臣。その正体は昌文君が送り込んだ間諜。",
    detail:[
      {h:"正体", body:"郭開に取り入って李牧失脚に貢献した趙の家臣。だがその正体は昌文君が送り込んだ間諜で、得た情報を秦へ流していた。郭開と呂不韋の繋がりを報せようとした使者が李斯の部下に捕まり、以後は李斯の密偵として働くことになる。"},
      {h:"韓非の死", body:"李斯の屋敷で偶然韓非とすれ違い、その様子から韓非が韓の情報機関の上位にいると見抜く。報告を受けて韓非の屋敷が臨検され、諜報活動が露見。自分が間者であることを隠すため、李斯の留守中に韓非を獄に入れ、毒薬を渡して自害を勧めた。"},
      {h:"言い分", body:"激怒した李斯の詰問に対し、中華統一には表の力である軍と裏の力である諜報の両方が要ると語り、韓非の死の隠蔽を頼んだ。李斯はそれを呑み、姚賈は趙に戻っている。"},
      {h:"その後", body:"全面戦争の直前、邯鄲の民に熱狂的に支持される李牧を眺める幽繆王を遠くから観察し、王の異変を察している。存命。"}
    ],
    battles:[],
    rel:[{to:"kakukai",label:"取り入る"},{to:"shoubunkun",label:"送り込まれる"},{to:"risi",label:"密偵となる"},{to:"kanpishi",label:"死に追いやる"},{to:"riboku",label:"失脚に加担"}]
  },
  {
    id:"toujouou", name:"悼襄王", yomi:"とうじょうおう", kind:"person", state:"趙", group:"趙王族",
    role:"第九代 趙王", klass:"王・王族", first:"52巻", arc:"鄴編", status:"死亡（毒殺）",
    tags:["趙","王","暗君","桃泉殿"],
    summary:"国の行く末に一切関心のない自分本位の趙王。廉頗いわく「先代以上のバカ王」。",
    detail:[
      {h:"人物", body:"第九代趙王。自分本位で身勝手。病弱で長くないことを自覚しており、国の行く末には全く関心がない。李牧をはじめ臣下から失望されており、廉頗からは「先代以上のバカ王」と酷評された。桃泉殿という浴場で大勢の童子と湯治しているのが日常。"},
      {h:"鄴での判断", body:"秦軍侵攻の報告を受けても邯鄲軍の出陣を認めず、自分が生きている間に王都さえ落ちなければよいと言い切った。鄴が陥落しても援軍を出さず、それどころか朱海平原敗北の責で李牧を強引に呼び戻して投獄し、鄴一帯を秦に奪われる結果を招く。"},
      {h:"最期", body:"舜水樹ら李牧の腹心たちと邯鄲で内戦状態に陥ったのち、湯治中に何者かに毒を盛られて死亡した。遺言で末子・遷を次期王に指名し、聡明な太子嘉から実権を奪う形になった。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"riboku",label:"投獄する"},{to:"kakukai",label:"重用"},{to:"ka",label:"実子"},{to:"yuubokuou",label:"実子"},{to:"f_chou",label:"王"}]
  },
  {
    id:"ka", name:"嘉（太子嘉）", yomi:"か たいしか", kind:"person", state:"趙", group:"趙王族",
    role:"趙太子 → 代王", klass:"王・王族", first:"56巻", arc:"鄴編〜", status:"存命",
    tags:["趙","太子","代","李牧の希望"],
    summary:"父と違い聡明な趙の太子。李牧が「真の光明」と期待した唯一の王族。",
    detail:[
      {h:"人物", body:"悼襄王の太子。父とは違い聡明で、李牧から趙の「真の光明」と期待されていた。"},
      {h:"父との対立", body:"李牧の処刑を取り止めるよう父に必死に訴え、その反感を買って右耳を噛み千切られた。"},
      {h:"短い実権", body:"悼襄王の死後、次期趙王として実権を握り、囚われていた李牧ら賢人を解放して国の立て直しを図る。しかし悼襄王の遺言で末子・遷が次期王に指名され、実権を奪われた。"},
      {h:"その後", body:"逆臣として遷一派の刺客や追手に命を狙われ、李牧たちと共に小城の法紹まで落ち延びる。父以上の暗愚が王位を継いだことに趙の未来を絶望して慟哭した。存命。"}
    ],
    battles:[],
    rel:[{to:"riboku",label:"守られる"},{to:"toujouou",label:"実父"},{to:"yuubokuou",label:"異母弟"},{to:"kakukai",label:"追われる"},{to:"kaine",label:"守られる"}]
  },
  {
    id:"yuubokuou", name:"幽繆王（遷）", yomi:"ゆうぼくおう せん", kind:"person", state:"趙", group:"趙王族",
    role:"第十代 趙王", klass:"王・王族", first:"57巻", arc:"鄴編〜", status:"存命",
    tags:["趙","王","暗君","李牧に指揮権"],
    summary:"享楽しか頭にない最後の趙王。だが李牧に全軍の指揮権を与えたのもこの王。",
    detail:[
      {h:"人物", body:"悼襄王の末子で嘉の異母弟。日頃から行いが悪く、奴隷を連れ歩いて甚振る快楽に浸っている。悼襄王の遺言で次期王に指名され、即位して「幽繆王」を名乗った。"},
      {h:"父との違い", body:"国のありように関心がなく自分のことしか頭にないのは父と同じだが、父と違い李牧を特に嫌ってはいない。自分の享楽を守る手段として、李牧に趙全軍の指揮権を与えた。肥下で桓騎を討った時は郭開の讒言を退け、李牧を武安君に封じている。"},
      {h:"芽生えた不信", body:"全面戦争の直前、邯鄲に入城した李牧を冷やかしに見に行き、民の熱狂的な支持と「李牧の方が王にふさわしい」という臣下の陰口を耳にして不信感が芽生え始める。それでも王都軍五万を預け、秦軍迎撃を命じた。"},
      {h:"言葉", body:"李牧に対し「普通のことが簡単ではない人間もいることを知れ」と忠告している。暗君でありながら、この一言だけは自分の弱さを正確に語っている。"}
    ],
    battles:[],
    rel:[{to:"riboku",label:"指揮権を与える"},{to:"kakukai",label:"重用"},{to:"toujouou",label:"実父"},{to:"ka",label:"異母兄"},{to:"f_chou",label:"王"}]
  },
  {
    id:"choukihaku", name:"趙季伯", yomi:"ちょうきはく", kind:"person", state:"趙", group:"趙王族",
    role:"鄴城主", klass:"王・王族", first:"52巻", arc:"鄴編", status:"自害",
    tags:["趙","鄴","民想い","兵糧攻め"],
    summary:"民は国の礎という信念で難民を全員城内に入れ、その結果として鄴を失った城主。",
    detail:[
      {h:"人物", body:"悼襄王の伯父で鄴城主。民は国の礎であるという考えを持つ民想いの人物で、李牧からは賢人と評されていた。"},
      {h:"民を入れた代償", body:"鄴攻防戦で、王翦軍に落とされた周辺の小城から避難してきた民を全員城内に収容した。それが結果として兵糧攻めを成立させてしまう。当初は秦軍より兵糧があると安堵していたが、朱海平原十三日目の夜に王翦兵の焼き討ちで兵糧の大半を失い窮地に陥る。"},
      {h:"最期", body:"兵糧が尽きると難民が暴徒と化して抑えきれず、十八日目に彼らの手で城門が開かれ、桓騎軍の侵入を許した。最期は楼閣に登り、鄴を守れなかったことを悔いながら飛び降りて自害した。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"riboku",label:"賢人と評される"},{to:"kanki",label:"城を落とされる"},{to:"ousen",label:"兵糧攻めを受ける"},{to:"toujouou",label:"甥"}]
  },
  {
    id:"kansaro", name:"カン・サロ", yomi:"かんさろ", kind:"person", state:"趙", group:"青歌軍",
    role:"青歌軍将軍 / 司馬尚側近筆頭", klass:"武将", first:"66巻", arc:"宜安編〜", status:"存命",
    tags:["趙","青歌","司馬尚","義兄弟","狼孟"],
    summary:"司馬尚を除けば青歌最強と評される側近筆頭。ジ・アガとは義兄弟。",
    detail:[
      {h:"人物", body:"青歌軍の将軍で司馬尚側近衆の筆頭。その強さは、司馬尚を除けば青歌最強の武将と楽彰に評される。ジ・アガとは互いに一匹狼の傭兵だった頃に知り合い、やがて義兄弟の誓いを交わすまでになった。"},
      {h:"狼孟の奇襲", body:"宜安戦の年の初頭、李牧の指示でジ・アガと共に狼孟城へ派遣され、城主・公孫布と半年間練兵して狼孟軍を鍛え上げた。秦北東部軍が太原から侵攻すると崖上から奇襲し、総大将・曹波広を一撃で討ち取って勝利する。"},
      {h:"糸凌への情け", body:"番吾攻防戦では、半身も同然だった義兄弟ジ・アガを糸凌に討たれる。しかし討った糸凌を勇者と認め、ジ・アガが与えた傷で死なせるべきだとしてとどめを刺さず放置した。のちに命を懸けて交渉に来た倉央に対しても、情けで二人とも解放している。"},
      {h:"その後", body:"武安城の軍議に司馬尚の傍らでドン・サリと共に参加。全面戦争では青歌軍右翼の将として王翦軍・壁軍と対峙している。存命。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"shibashou",label:"側近筆頭"},{to:"jiaga",label:"義兄弟"},{to:"shiryou",label:"見逃す"},{to:"soou",label:"解放する"},{to:"rakushou",label:"同僚"},{to:"denrimi",label:"討つ"}]
  },
  {
    id:"jiaga", name:"ジ・アガ", yomi:"じあが", kind:"person", state:"趙", group:"青歌軍",
    role:"青歌軍将軍", klass:"武将", first:"66巻", arc:"宜安編〜番吾", status:"戦死",
    tags:["趙","青歌","剛将","鎚","糸凌"],
    summary:"「青歌一の剛将」と呼ばれた豪傑。糸凌との死闘の末に相討ち同然で果てた。",
    detail:[
      {h:"人物", body:"青歌軍の将軍。あまり賢くないが、楽彰から「青歌一の剛将」と評されるほどの豪傑。得物は鎚。カン・サロとは傭兵時代からの義兄弟。"},
      {h:"狼孟", body:"秦北東部軍との戦いでは狼孟軍副将として敵中央に突撃してこれを粉砕し、その後は後軍を食い荒らして約十五万を太原へ退却させた。"},
      {h:"最期", body:"番吾攻防戦で糸凌と死闘を繰り広げる。首に刃が食い込む重傷を負いながら鎚で糸凌の胸部に一撃を叩き込み左腕をへし折るが、最後は糸凌に斬られて戦死した。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"kansaro",label:"義兄弟"},{to:"shibashou",label:"配下"},{to:"shiryou",label:"相討ち"},{to:"rakushou",label:"同僚"}]
  },
  {
    id:"donsari", name:"ドン・サリ", yomi:"どんさり", kind:"person", state:"趙", group:"青歌軍",
    role:"青歌軍将軍", klass:"武将", first:"78巻", arc:"全面戦争編", status:"存命",
    tags:["趙","青歌","司馬尚","側近"],
    summary:"司馬尚の側近として現れた青歌軍の将。檄が難しすぎて兵に不評。",
    detail:[
      {h:"人物", body:"青歌軍の将軍。檄を飛ばしても青歌兵たちには難しすぎると不評である。"},
      {h:"登場", body:"全面戦争の直前、カン・サロと共に司馬尚の側近として現れ、武安城での軍議に参加した。"},
      {h:"その後", body:"全面戦争では司馬尚軍の左翼の将として参戦し、王翦軍と対峙している。存命。"}
    ],
    battles:[],
    rel:[{to:"shibashou",label:"側近"},{to:"kansaro",label:"同僚"},{to:"fuon",label:"後方に配置"}]
  },
  {
    id:"fuon", name:"フーオン", yomi:"ふーおん", kind:"person", state:"趙", group:"青歌軍",
    role:"青歌軍五千人将", klass:"武将", first:"66巻", arc:"宜安編〜", status:"存命",
    tags:["趙","青歌","曲刀","亜光"],
    summary:"曲刀を使う青歌軍の青年将。楽彰と組んで亜光を挟撃した。",
    detail:[
      {h:"人物", body:"青歌軍の五千将を務める青年で、曲刀を使う。"},
      {h:"誰と戦ったか", body:"宜安戦では包囲網を突破しようとする楽華軍の陸仙と交戦し、その右手を切り裂いた。しかし愛閃の到着と飛信隊の羌礼の加勢を受け、羌礼に斬られて重傷を負う。肥下戦では、窮地の李牧のもとへ向かおうとして飛信隊に足止めされた。"},
      {h:"番吾", body:"李牧の策で誘き出された亜光を楽彰と共に挟み撃ちにして重傷を負わせたが、亜光の反撃で自身も負傷している。"},
      {h:"その後", body:"全面戦争では一万の軍を率いてドン・サリ軍の後方で待機。存命。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"shibashou",label:"配下"},{to:"rakushou",label:"共闘"},{to:"akou",label:"挟撃"},{to:"rikusen",label:"交戦"},{to:"kyourei",label:"斬られる"}]
  },
  {
    id:"gakuei", name:"岳嬰", yomi:"がくえい", kind:"person", state:"趙", group:"慶舎軍",
    role:"慶舎傘下将軍", klass:"武将", first:"41巻", arc:"黒羊編〜鄴編", status:"戦死",
    tags:["趙","慶舎","黒羊","朱海平原","復讐"],
    summary:"慶舎に心酔した気性の荒い猛将。仇討ちに走って信に討たれた。",
    detail:[
      {h:"人物", body:"慶舎傘下の将軍。気性が荒い猛将で、横柄かつ一匹狼な性格だが、慶舎には心酔していた。"},
      {h:"黒羊", body:"右翼として雷土軍と戦い、緒戦は奇襲で翻弄したが、「火兎」で逃げに徹する敵を追い切れなかった。離眼へ戻ろうとする紀彗たちを殺してでも止めようとし、金毛にその短絡さを叱責されている。討たれた慶舎の遺体を見た時は、味方を死傷させるほど怒り狂った。"},
      {h:"最期", body:"鄴編では李牧に従軍し、慶舎を討った飛信隊に並々ならぬ憎悪と復讐心を燃やして朱海平原左翼の一角を担う。九日目、仇討ちのため自ら信の首を取りに行き、逆に討たれて戦死した。この時、信の中に王騎の気配を感じ取った龐煖が動き出す。"}
    ],
    battles:["b_kokuyou","b_gyou"],
    rel:[{to:"keisha",label:"心酔"},{to:"shin",label:"討たれる"},{to:"kinmou",label:"同僚"},{to:"kisui",label:"諍い"},{to:"raido",label:"交戦"},{to:"houken",label:"死が引き金"}]
  },
  {
    id:"kinmou", name:"金毛", yomi:"きんもう", kind:"person", state:"趙", group:"慶舎軍",
    role:"慶舎傘下将軍", klass:"武将", first:"41巻", arc:"黒羊編〜鄴編", status:"戦死",
    tags:["趙","慶舎","黒羊","朱海平原","紀彗"],
    summary:"折れかけた心を紀彗に立て直された将。最期は蒼淡の豪弓に射られた。",
    detail:[
      {h:"人物", body:"慶舎傘下の将軍。岳嬰と違って冷静で、短絡的な同僚を叱責できる分別がある。"},
      {h:"黒羊", body:"中央丘で摩論軍と対峙。四日目に慶舎の危機を察知して救出に向かおうとするが摩論に止められ、激闘の最中に慶舎を失う。心が折れかかるが紀彗の説得で奮い立ち、継戦を懇願する紀彗を総大将に立てた。その紀彗軍が離眼のためにやむなく離脱すると、攻めてきた桓騎軍を防ぎきれず黒羊から撤退する。"},
      {h:"最期", body:"鄴編では朱海平原中央軍の一角を担う。終盤、左翼を突破した飛信隊と交戦して善戦するが、援軍の亜光軍に敗れて李牧軍まで離脱。その後、飛信隊の要である河了貂を討つべく奇襲を仕掛けたが蒼兄弟に阻まれ、蒼淡に射られて戦死した。"}
    ],
    battles:["b_kokuyou","b_gyou"],
    rel:[{to:"keisha",label:"配下"},{to:"kisui",label:"総大将に立てる"},{to:"maron",label:"交戦"},{to:"soutan",label:"討たれる"},{to:"tenn",label:"狙う"},{to:"gakuei",label:"同僚"}]
  },
  {
    id:"shoumou", name:"渉孟", yomi:"しょうもう", kind:"person", state:"趙", group:"趙荘軍",
    role:"趙将軍", klass:"武将", first:"12巻", arc:"馬陽の戦い", status:"戦死",
    tags:["趙","馬陽","月牙鏟","三大天志望"],
    summary:"「破壊の渉孟」。三大天を狙った傲慢な猛将で、王騎に格の違いを見せられて散った。",
    detail:[
      {h:"人物", body:"「破壊の渉孟」の異名を持つ趙将軍。頭上で結った辮髪と太めの体躯が特徴で、得物は月牙鏟。鱗坊に危険と言わしめるほどの武力を持つが、それゆえに尊大で傲慢。"},
      {h:"野心", body:"龐煖を嫌い、自分が軍功で三大天になることを目指していた。秦六将についても実力は認めつつ「過去の遺物」と見下していた。"},
      {h:"最期", body:"馬陽編の初戦で凄まじい武勇を見せる。しかし秦六将・王騎と相見えて一騎討ちを挑んだ直前、格の違いを目の当たりにしたまま討たれた。"}
    ],
    battles:["b_bayou"],
    rel:[{to:"chousou",label:"配下"},{to:"ouki",label:"討たれる"},{to:"houken",label:"嫌う"},{to:"rinbou",label:"交戦"}]
  },
  {
    id:"rihaku", name:"李白", yomi:"りはく", kind:"person", state:"趙", group:"趙荘軍",
    role:"趙将軍", klass:"武将", first:"12巻", arc:"馬陽の戦い〜", status:"存命",
    tags:["趙","守備","扈輒軍出身","合従軍"],
    summary:"「守備の李白」。八千で五万の燕軍を撃退した守戦の達人。",
    detail:[
      {h:"人物", body:"「守備の李白」の異名を持つ趙将軍。元は扈輒軍の所属で、対燕国前線では扈輒の下、八千の寡兵だけで六倍以上の五万の燕軍を撃退した守戦の達人。"},
      {h:"誰と戦ったか", body:"馬陽編では蒙武軍と対峙。初戦は斜陣で蒙武軍を防いだが、翌日に蒙武に突破されて大きな損害を被った。合従軍編では初日は慶舎の指示で敢えて何もせず、翌日からは堅実な守りで飛信隊を終始翻弄している。"},
      {h:"その後", body:"鄴を攻略された後は平陽に配置。全面戦争の直前には武安城での軍議に参加し、一万の自軍を率いて舜水樹軍の後方に待機している。存命。"}
    ],
    battles:["b_bayou","b_kankoku"],
    rel:[{to:"chousou",label:"配下"},{to:"kochou",label:"元上官"},{to:"moubu",label:"交戦"},{to:"keisha",label:"指示を受ける"},{to:"shin",label:"翻弄する"}]
  },
  {
    id:"kousonryuu", name:"公孫龍", yomi:"こうそんりゅう", kind:"person", state:"趙", group:"趙荘軍",
    role:"趙将軍 → 文官", klass:"武将", first:"12巻", arc:"馬陽の戦い〜", status:"存命",
    tags:["趙","隻眼","橑陽","李牧派"],
    summary:"「万能の公孫龍」。右手を失って前線を退き、朝廷で李牧派の筆頭になった。",
    detail:[
      {h:"人物", body:"「万能の公孫龍」の異名を持つ趙将軍。隻眼で、左眼を縦断する傷痕が特徴。"},
      {h:"誰と戦ったか", body:"馬陽編では趙荘の副将を務めた。鄴編では橑陽軍の指揮を任されるが、後に命令で舜水樹と指揮官を交代。橑陽戦九日目にバジオウに右手を斬り落とされた。"},
      {h:"転身", body:"右手を失って前線から一線を引き、李牧が青歌へ向かった後は朝廷に留まって李牧と内通し、現状を報告し続けた。その後は文官となり、趙朝廷における李牧派の筆頭を務めている。"},
      {h:"その後", body:"全面戦争では邯鄲で難民の誘導を指示している。存命。"}
    ],
    battles:["b_bayou","b_gyou"],
    rel:[{to:"chousou",label:"副将"},{to:"shunsuiju",label:"指揮を交代"},{to:"bajio",label:"右手を斬られる"},{to:"riboku",label:"内通"}]
  },
  {
    id:"batei", name:"馬呈", yomi:"ばてい", kind:"person", state:"趙", group:"紀彗軍",
    role:"紀彗傘下将軍", klass:"武将", first:"41巻", arc:"黒羊編〜", status:"存命",
    tags:["趙","離眼","紀彗","猛将","糸凌"],
    summary:"紀彗の幼馴染で離眼軍随一の猛将。離眼の悲劇を悔い続ける男。",
    detail:[
      {h:"人物", body:"紀彗傘下の将軍。紀彗の幼馴染で、紀彗軍随一の猛将。劉冬とともに前城主・紀昌に育てられた。"},
      {h:"離眼の悲劇", body:"味方が旦虎の戦いで勝利した一方、傷病兵として劉冬と共に離眼で療養していたところを唐鈞軍に襲撃される。応戦するも力およばず城を失い、紀昌の前で劉冬と共に深く悔いた。"},
      {h:"誰と戦ったか", body:"黒羊編では飛信隊と対峙して一時的に撃退するが、渕隊の奇襲で後退。桓騎軍が離眼に向かったことで撤退した。鄴編では朱海平原右翼の一角を担い、終盤に紀彗の指示で中央軍へ救援に向かい、カイネの代わりに糸凌と対峙するが決着はつかなかった。"},
      {h:"その後", body:"全面戦争では二万の軍を率いて飛信隊・羌瘣隊と対峙している。存命。"}
    ],
    battles:["b_kokuyou","b_gyou"],
    rel:[{to:"kisui",label:"幼馴染"},{to:"ryuutou",label:"幼馴染"},{to:"kishou",label:"育ての親"},{to:"shiryou",label:"交戦"},{to:"kaine",label:"援護"},{to:"shin",label:"交戦"}]
  },
  {
    id:"ryuutou", name:"劉冬", yomi:"りゅうとう", kind:"person", state:"趙", group:"紀彗軍",
    role:"紀彗傘下将軍", klass:"武将", first:"41巻", arc:"黒羊編", status:"戦死",
    tags:["趙","離眼","紀彗","智将","羌瘣"],
    summary:"紀彗軍随一の智将。羌瘣と二度斬り合い、二度目に討たれた。",
    detail:[
      {h:"人物", body:"紀彗傘下の将軍。紀彗の幼馴染で紀彗軍随一の智将だが、羌瘣の不意打ちにも冷静に対処して互角に渡り合うほど武勇にも優れる。"},
      {h:"最期", body:"黒羊戦では飛信隊と対峙して一時的に勝利するが、深夜に押し入ってきた羌瘣の奇襲を受ける。攻防の末に羌瘣へ重傷を負わせて撃退したものの自身も深手を負い、一時戦線を離脱。怪我を押して復帰し、羌瘣との再戦の末に戦死した。"}
    ],
    battles:["b_kokuyou"],
    rel:[{to:"kisui",label:"幼馴染"},{to:"batei",label:"幼馴染"},{to:"kyoukai",label:"相討ち同然"},{to:"kishou",label:"育ての親"}]
  },
  {
    id:"kishou", name:"紀昌", yomi:"きしょう", kind:"person", state:"趙", group:"紀彗軍",
    role:"前・離眼城城主", klass:"武将", first:"41巻", arc:"黒羊編（回想）", status:"処刑",
    tags:["趙","離眼","名君","火刑"],
    summary:"紀彗の父。人質の助命と引き換えに火刑に処された離眼の名君。",
    detail:[
      {h:"人物", body:"紀彗の父で、馬呈と劉冬の育ての親。戦上手で民思いの名君だった。"},
      {h:"最期", body:"唐釣に隙を突かれて離眼城を落とされる。勅命により、城内の人質の助命と引き換えに唐釣の手で火刑に処され、紀彗に後を託して死んだ。この一件が、紀彗が離眼の民を何よりも優先する理由になっている。"}
    ],
    battles:[],
    rel:[{to:"kisui",label:"実父"},{to:"batei",label:"育ての親"},{to:"ryuutou",label:"育ての親"}]
  },
  {
    id:"gakuhaku", name:"岳白", yomi:"がくはく", kind:"person", state:"趙", group:"扈輒軍",
    role:"扈輒傘下将軍（三公）", klass:"武将", first:"62巻", arc:"平陽・影丘の戦い", status:"戦死",
    tags:["趙","扈輒","三公","影丘","閃叫"],
    summary:"常に微笑む巨漢。騎馬を吹き飛ばす怪力で影丘の桓騎左翼を圧倒した。",
    detail:[
      {h:"人物", body:"扈輒傘下の将軍で、側近「三公」の一人。常に微笑みを浮かべている巨漢で、近衛兵団「閃叫」を有する。騎馬兵を吹き飛ばす怪力と奇妙な体術の使い手。"},
      {h:"最期", body:"扈輒軍の右翼を担当し、影丘で桓騎左翼軍を圧倒して飛信隊と対峙する。右翼を攻略された末に李信と一騎討ちを行い、敗死した。"}
    ],
    battles:["b_heiyou"],
    rel:[{to:"kochou",label:"配下"},{to:"shin",label:"討たれる"},{to:"ryuuhaku",label:"三公"},{to:"kohaku",label:"三公"},{to:"ouhon",label:"交戦"}]
  },
  {
    id:"ryuuhaku", name:"龍白", yomi:"りゅうはく", kind:"person", state:"趙", group:"扈輒軍",
    role:"扈輒傘下将軍（三公）", klass:"武将", first:"62巻", arc:"平陽・影丘の戦い", status:"戦死",
    tags:["趙","扈輒","三公","影丘","雷土"],
    summary:"扈輒軍左翼を率いた三公の一人。息子を助けに向かって雷土に討たれた。",
    detail:[
      {h:"人物", body:"扈輒傘下の将軍で側近「三公」の一人。扈輒軍の左翼を担当した。"},
      {h:"最期", body:"雷土率いる桓騎右翼軍と対峙。乱戦の中で息子の曹還が雷土軍に捕らわれ、救出に向かったところを雷土に討たれて戦死した。この因縁が、後の雷土への凄惨な拷問につながっていく。"}
    ],
    battles:["b_heiyou"],
    rel:[{to:"kochou",label:"配下"},{to:"raido",label:"討たれる"},{to:"gakuhaku",label:"三公"},{to:"kohaku",label:"三公"}]
  },
  {
    id:"kohaku", name:"虎白", yomi:"こはく", kind:"person", state:"趙", group:"扈輒軍",
    role:"扈輒傘下将軍（三公）", klass:"武将", first:"62巻", arc:"平陽・影丘の戦い〜肥下", status:"戦死",
    tags:["趙","扈輒","三公","肥下","桓騎"],
    summary:"三公で唯一影丘を生き延び、肥下で桓騎の最後の突撃の前に立ちはだかった男。",
    detail:[
      {h:"人物", body:"扈輒傘下の将軍で側近「三公」の一人。若輩な風貌の男。扈輒軍の中央軍を担当した。"},
      {h:"影丘", body:"黒桜・厘玉率いる桓騎中央軍と対峙し、両軍を分断して総崩れとなった黒桜軍の殲滅を図る。だが扈輒討ち死にの報せを受けて本陣へ向かい、その後撤退した。"},
      {h:"最期", body:"閼与戦では秦軍に特攻して死のうとしたが舜水樹に諌められ、竜布とともに特攻して自部隊だけ生き残る。肥下戦では、李牧に最後の特攻を仕掛けた桓騎の前に立ちはだかり、厘玉の片手を斬り落としたが、桓騎に頭を両断されて戦死した。"}
    ],
    battles:["b_heiyou","b_gian"],
    rel:[{to:"kochou",label:"配下"},{to:"kanki",label:"討たれる"},{to:"ringyoku",label:"腕を斬る"},{to:"shunsuiju",label:"諌められる"},{to:"kokuou",label:"交戦"}]
  },
  {
    id:"kotsuminhaku", name:"骨珉伯", yomi:"こつみんはく", kind:"person", state:"趙", group:"雁門軍",
    role:"雁門軍将軍", klass:"武将", first:"65巻", arc:"宜安編〜", status:"存命",
    tags:["趙","雁門","李牧","十一年"],
    summary:"李牧と再び戦える日を十一年待ち、その文を読んで震えて泣いた雁門の将。",
    detail:[
      {h:"人物", body:"雁門軍の将軍。李牧が雁門を離れてから十一年もの間、再び共に戦える日を待ち望んでおり、李牧からの文を読んだ時には震えて泣いていた。"},
      {h:"誰と戦ったか", body:"宜安戦に馬風慈と共に参戦。桓騎討死後は、撤退する楽華軍を舜水樹とともに追撃した。番吾攻防戦では趙軍右翼に舜水樹・馬南慈・馬風慈とともに九万で布陣し、楊端和軍と対峙している。"},
      {h:"その後", body:"武安城での軍議に参加。全面戦争では二万の軍を率いて楽華軍と対峙している。存命。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"riboku",label:"配下"},{to:"bafuuji",label:"共闘"},{to:"shunsuiju",label:"共闘"},{to:"mouten",label:"追撃"},{to:"youtanwa",label:"対峙"}]
  },
  {
    id:"bafuuji", name:"馬風慈", yomi:"ばふうじ", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧軍五千将 → 将軍", klass:"武将", first:"65巻", arc:"宜安編〜", status:"存命",
    tags:["趙","雁門","馬南慈の息子","肥下"],
    summary:"馬南慈の息子。肥下で傅抵とともに引き返し、李牧を守り切った。",
    detail:[
      {h:"人物", body:"李牧軍傘下の五千将で、馬南慈の息子。"},
      {h:"肥下", body:"傅抵とともに先行して肥下に向かっていたが、李牧が桓騎軍の奇襲で窮地に立たされると、傅抵とともに引き返して李牧のもとへ急行。死守すべく奮闘し、味方援軍の到着まで守り切った。"},
      {h:"その後", body:"番吾攻防戦では趙軍右翼に九万で布陣して楊端和軍と対峙。のちに将軍へ昇進し、武安城の軍議に参加している。全面戦争では雁門軍の一角として楽華軍と対峙。存命。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"banaji",label:"実父"},{to:"futei",label:"共闘"},{to:"riboku",label:"配下"},{to:"kotsuminhaku",label:"共闘"},{to:"mouten",label:"対峙"}]
  },
  {
    id:"seikaun", name:"青華雲", yomi:"せいかうん", kind:"person", state:"趙", group:"李牧軍",
    role:"中華十弓 現一位", klass:"武将", first:"78巻", arc:"全面戦争編", status:"戦死",
    tags:["趙","中華十弓","弓","楊端和","蒼兄弟"],
    summary:"中華十弓の現一位。引退していたところを李牧に口説き落とされ、楊端和とダントを射抜いた。",
    detail:[
      {h:"人物", body:"「中華十弓」の現一位と評される弓術の達人で、大柄な男性。"},
      {h:"復帰", body:"すでに現役を引退していたが、隠居所を何度も自ら訪ねてきた李牧の説得を受けて現役復帰した。"},
      {h:"何をしたか", body:"全面戦争の序盤、山の民のダントと楊端和を一矢で射貫いて瀕死の重傷を負わせ、次の獲物として李信を狙った。"},
      {h:"最期", body:"存在に勘付いた飛信隊の蒼兄弟と勝負になり、蒼淡との一騎討ちで負傷しつつも撃破するが、蒼仁との一騎討ちで喉を射抜かれて戦死した。"}
    ],
    battles:[],
    rel:[{to:"riboku",label:"口説かれる"},{to:"youtanwa",label:"射抜く"},{to:"dant",label:"射抜く"},{to:"soujin",label:"討たれる"},{to:"soutan",label:"交戦"},{to:"f_juukyuu",label:"現一位"}]
  },
  {
    id:"gika", name:"魏加", yomi:"ぎか", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧軍将校 / 中華十弓", klass:"武将", first:"16巻", arc:"馬陽の戦い", status:"戦死",
    tags:["趙","中華十弓","弓","王騎","汚名"],
    summary:"汚名を覚悟で王騎に一矢を放ち、物語の流れを変えた弓兵。",
    detail:[
      {h:"人物", body:"李牧軍の将校で「中華十弓」の一人。"},
      {h:"最期", body:"馬陽編で、新時代の幕開けに自らの軌跡を残すことと龐煖を守るため、汚名を覚悟で王騎へ一矢を報いた。その一射が生んだ一瞬の隙で龐煖が王騎を貫き、六将・王騎は死ぬことになる。直後、激高した信に討たれて死亡した。"}
    ],
    battles:["b_bayou"],
    rel:[{to:"riboku",label:"配下"},{to:"ouki",label:"射る"},{to:"houken",label:"守る"},{to:"shin",label:"討たれる"},{to:"f_juukyuu",label:"十弓"}]
  },
  {
    id:"shinseijou", name:"晋成常", yomi:"しんせいじょう", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧傘下将軍 / 李牧軍副将", klass:"武将", first:"30巻", arc:"合従軍編", status:"戦死",
    tags:["趙","合従軍","蕞","殿軍","老将"],
    summary:"常に笑みを絶やさぬ老将。蕞の敗北が決まると自ら殿軍を買って出た。",
    detail:[
      {h:"人物", body:"李牧傘下の将軍。常に笑みを絶やさぬ老将で、陽気ながら峻烈な言動が目立つ。"},
      {h:"最期", body:"合従軍編で李牧軍の副将を務める。蕞の戦いの敗北が決定的になると、李牧や龐煖を諭して自ら殿軍を引き受け、最期はバジオウに討たれて戦死した。"}
    ],
    battles:["b_sai"],
    rel:[{to:"riboku",label:"副将"},{to:"bajio",label:"討たれる"},{to:"houken",label:"諭す"}]
  },
  {
    id:"kouhaku", name:"共伯", yomi:"こうはく", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧傘下将軍", klass:"武将", first:"57巻", arc:"鄴編", status:"戦死",
    tags:["趙","朱海平原","李牧の戦術","糸凌"],
    summary:"麾下ごと李牧の戦術を叩き込まれた将。糸凌に討たれた。",
    detail:[
      {h:"人物", body:"李牧傘下の将軍。雷伯と同じく、麾下の兵ともども李牧の戦術を徹底的に仕込まれている。李牧の頭脳を軍単位で複製した存在といえる。"},
      {h:"最期", body:"朱海平原十五日目に田里弥・倉央軍と対峙し、李牧の戦術で二人を翻弄した。その後、本陣に迫ってきた糸凌と一騎討ちになり、討ち取られて死亡。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"riboku",label:"配下"},{to:"raihaku",label:"同僚"},{to:"shiryou",label:"討たれる"},{to:"denrimi",label:"翻弄"},{to:"soou",label:"翻弄"}]
  },
  {
    id:"raihaku", name:"雷伯", yomi:"らいはく", kind:"person", state:"趙", group:"李牧軍",
    role:"李牧傘下将軍", klass:"武将", first:"57巻", arc:"鄴編", status:"存命",
    tags:["趙","朱海平原","李牧の戦術","鄴包囲"],
    summary:"共伯と対をなす李牧戦術の使い手。王翦に絡繰りを見抜かれた。",
    detail:[
      {h:"人物", body:"李牧傘下の将軍。共伯とともに、麾下の兵と一体で李牧の戦術を徹底的に仕込まれている。"},
      {h:"誰と戦ったか", body:"朱海平原十五日目に王翦本軍と対峙するが、共伯軍と田里弥・倉央軍の交戦を見て戦術の絡繰りを見抜いた王翦に破られ、苦戦を強いられた。"},
      {h:"その後", body:"退却後、邯鄲に連行される李牧に代わって鄴包囲の指揮を執る。鄴を完全に秦へ奪われたため、扈輒に従って撤退した。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"riboku",label:"配下"},{to:"kouhaku",label:"同僚"},{to:"ousen",label:"見抜かれる"},{to:"kochou",label:"従う"}]
  },
  {
    id:"rozo", name:"ロゾ", yomi:"ろぞ", kind:"person", state:"趙", group:"犬戎族",
    role:"橑陽城城主 / 犬戎族の王", klass:"武将", first:"53巻", arc:"鄴編（橑陽）", status:"戦死",
    tags:["趙","犬戎","橑陽","恐怖支配","壁"],
    summary:"恐怖だけで軍を支配した犬戎の王。味方ごと敵を討つのが通常の策。",
    detail:[
      {h:"人物", body:"橑陽城城主にして犬戎族の王。自軍を徹底的な恐怖で支配し、敵を味方もろとも討つ策を奇策ではなく通常の策として用いる。将兵の家族はすべて人質にし、わずかでも失敗したり怖気づいた者は家族もろとも処刑する残虐な性格。"},
      {h:"評価", body:"悼襄王のことは侮蔑しているが、李牧のことは評価している。"},
      {h:"最期", body:"鄴編では、無断で山民族軍を橑陽までおびき寄せた舜水樹を部下に斬殺させようとしたが、取引に応じて山民族軍と戦う。楊端和を捕える寸前まで追い詰めたが、別動隊に橑陽城を落とされ、フィゴ王ダントとの一騎討ちで気を取られた隙を突かれ、壁に討たれた。"}
    ],
    battles:["b_ryouyou","b_gyou"],
    rel:[{to:"shunsuiju",label:"取引"},{to:"youtanwa",label:"追い詰める"},{to:"heki",label:"討たれる"},{to:"dant",label:"一騎討ち"},{to:"f_kenjuu",label:"王"}]
  },
  {
    id:"gakujou", name:"楽乗", yomi:"がくじょう", kind:"person", state:"趙", group:"趙軍",
    role:"趙大将軍", klass:"武将", first:"18巻", arc:"山陽編（回想）", status:"亡命",
    tags:["趙","廉頗","腹六分目","亡命"],
    summary:"廉頗と二十年共に戦い、王命で刃を向けて「腹六分目」と評された第二位。",
    detail:[
      {h:"人物", body:"趙の大将軍。廉頗と二十年間ともに戦い、趙軍第二位の大将軍に位置した。"},
      {h:"最期の対決", body:"王命に従ってやむなく廉頗軍と戦い、数で圧倒したものの、単騎で切り抜けてきた廉頗に矛を突きつけられて降伏。廉頗からは「腹六分目」と評され、格の差を痛感した。後に他国へ亡命している。"}
    ],
    battles:[],
    rel:[{to:"renpa",label:"降伏"},{to:"f_chou",label:"大将軍"}]
  },
  {
    id:"choukatsu", name:"趙括", yomi:"ちょうかつ", kind:"person", state:"趙", group:"趙軍",
    role:"趙大将軍", klass:"武将", first:"18巻", arc:"長平の戦い（回想）", status:"戦死",
    tags:["趙","長平","趙奢の息子","王騎"],
    summary:"長平で廉頗の後任に据えられ、四十万を失う敗北の当事者となった大将軍。",
    detail:[
      {h:"人物", body:"趙の大将軍で、旧三大天・趙奢の息子。"},
      {h:"最期", body:"長平の戦いで、王命により廉頗の後任として秦軍と戦うが、王騎に討たれて死亡した。この敗北で投降した趙兵四十万が白起に生き埋めにされ、趙の秦への憎悪と万極という怪物を生む原因になっている。"}
    ],
    battles:["b_chouhei"],
    rel:[{to:"ouki",label:"討たれる"},{to:"renpa",label:"後任"},{to:"hakuki",label:"敗北"},{to:"bankyoku",label:"悲劇の起点"}]
  },

  /* ───────────── 追加: 秦（王騎軍・玉鳳・楽華・王翦軍・砂鬼一家・毐国・六将ほか） ───────────── */
  {
    id:"mouki", name:"蒙毅", yomi:"もうき", kind:"person", state:"秦", group:"昌平君派",
    role:"昌平君側近 / 軍師", klass:"軍師", first:"11巻", arc:"馬陽の戦い〜", status:"存命",
    tags:["秦","蒙家","軍師","河了貂","什虎"],
    summary:"蒙家の次男。河了貂を軍師学校に誘った男で、蒙恬も認める軍才の持ち主。",
    detail:[
      {h:"人物", body:"蒙家の次男で、蒙武の次男・蒙恬の弟。昌平君の軍師養成学校で学び、そのまま側近になった。若輩ながら兄の蒙恬も認める軍才の持ち主。"},
      {h:"河了貂との縁", body:"河了貂と知り合い、彼女を軍師養成学校に勧誘した。馬陽編では河了貂を連れて戦場の見学に赴いている。飛信隊に軍師が生まれた起点はここにある。"},
      {h:"戦歴", body:"合従軍編では蕞攻防戦に、秦国統一編では昌平君に同行して咸陽攻防戦に参陣。昌平君たちと共に鄴攻略の戦略の練り上げにも参加した。"},
      {h:"什虎", body:"楚の什虎侵攻に軍師として従軍。魏の返答を待たずに出撃しようとする父・蒙武を諫めようとするが、止められなかった。存命。"}
    ],
    battles:["b_sai","b_aikoku","b_jukyo"],
    rel:[{to:"shouheikun",label:"側近"},{to:"tenn",label:"軍師学校へ誘う"},{to:"mouten",label:"実兄"},{to:"moubu",label:"実父"},{to:"mougou",label:"祖父"}]
  },
  {
    id:"ryuukoku", name:"隆国", yomi:"りゅうこく", kind:"person", state:"秦", group:"騰軍",
    role:"王騎軍第二軍長 → 騰傘下将軍", klass:"軍師", first:"11巻", arc:"馬陽の戦い〜", status:"存命",
    tags:["秦","王騎軍","智将","信の教育","南陽"],
    summary:"王騎軍随一の智将。礼儀も用兵も知らない信を厳しく仕込んだ男。",
    detail:[
      {h:"人物", body:"王騎軍第二軍長からのちに騰傘下将軍。軍内随一の智将で、前線に出る録嗚未・干央とは対照的に参謀の役割を担う。"},
      {h:"馬陽", body:"驀進する蒙武を止められず、趙荘の策によって壊滅的な被害を負った。王騎の最期に立ち会い、騰が王騎軍を託されたことの証人となる。"},
      {h:"信との関係", body:"合従軍編では前線で暴れる騰に代わって本陣で総指揮を代行。著雍編で将軍に昇進し、戦後は魏国境での総指揮を任されて飛信隊と共に転戦した。礼儀作法も用兵術も知らない信を厳しく指導している。"},
      {h:"南陽", body:"南陽の無血開城後、前領主・龍安の処遇を巡って一触即発になる騰と剛京の間に割って入り、咸陽の指示を仰ぐ間はこの問題を自分が預かるとして仲裁した。存命。"}
    ],
    battles:["b_bayou","b_kankoku","b_chakuyou","b_shintei"],
    rel:[{to:"tou",label:"配下"},{to:"ouki",label:"元上官"},{to:"shin",label:"指導"},{to:"rokuomi",label:"同僚"},{to:"kan'ou",label:"同僚"},{to:"ryuuan",label:"仲裁"}]
  },
  {
    id:"rinbou", name:"鱗坊", yomi:"りんぼう", kind:"person", state:"秦", group:"騰軍",
    role:"王騎軍第三軍長 → 騰軍第三軍長", klass:"武将", first:"11巻", arc:"馬陽の戦い〜合従軍編", status:"戦死",
    tags:["秦","王騎軍","毒舌","矛","白麗"],
    summary:"毒舌家の王騎軍第三軍長。臨武君に飛びかかろうとして白麗の矢に射抜かれた。",
    detail:[
      {h:"人物", body:"王騎軍第三軍長からのちに騰軍第三軍長。毒舌家で、得物は矛。"},
      {h:"馬陽", body:"渉孟と争った。王騎の死の知らせを受けると、言葉を発せず泣き崩れている。"},
      {h:"最期", body:"合従軍編では氾斗平原で騰・同金とともに楚軍を迎撃。函谷関攻防戦で録嗚未とともに臨武君に襲い掛かろうとしたところを、白麗の矢で頭部を撃ち抜かれて戦死した。"}
    ],
    battles:["b_bayou","b_kankoku"],
    rel:[{to:"tou",label:"配下"},{to:"ouki",label:"元上官"},{to:"shoumou",label:"交戦"},{to:"hakurei",label:"討たれる"},{to:"rinbukun",label:"交戦"}]
  },
  {
    id:"doukin", name:"同金", yomi:"どうきん", kind:"person", state:"秦", group:"騰軍",
    role:"王騎軍第五軍長 → 騰軍第五軍長", klass:"武将", first:"16巻", arc:"合従軍編", status:"戦死",
    tags:["秦","王騎軍","氾斗平原","臨武君"],
    summary:"名乗った直後に臨武君に頭部を粉砕された、合従軍の凄惨さを告げる一撃。",
    detail:[
      {h:"人物", body:"王騎軍第五軍長からのちに騰軍第五軍長。馬陽編では王騎の死の知らせを受けて号泣していた。"},
      {h:"最期", body:"合従軍編で、秦に侵攻した楚軍を氾斗平原で騰・鱗坊とともに迎撃。対峙した臨武君に名乗った直後、頭部を粉砕されて戦死した。楚軍の格が読者に伝わる最初の一撃である。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"tou",label:"配下"},{to:"rinbukun",label:"討たれる"},{to:"rinbou",label:"同僚"}]
  },
  {
    id:"kanjou", name:"関常", yomi:"かんじょう", kind:"person", state:"秦", group:"玉鳳隊",
    role:"玉鳳隊千人将 → 将軍", klass:"武将", first:"52巻", arc:"鄴編〜", status:"存命",
    tags:["秦","玉鳳隊","元王翦軍","軽口","将軍昇進"],
    summary:"軽口ばかりの元王翦軍。王賁からは父の監視役と思われている実力者。",
    detail:[
      {h:"人物", body:"玉鳳隊の千人将からのちに将軍。元は王翦軍の所属。よく軽口を叩き不真面目な印象が強いが、実力は将軍に匹敵する。王賁からは「王翦からの監視役」と思われている。"},
      {h:"役割", body:"元王翦軍だけに王翦軍の内情に詳しく、王賁に王翦軍の将軍のことや軍の特徴を教える役でもある。"},
      {h:"誰と戦ったか", body:"朱海平原十三日目、雷獄に捕まった王賁を逃がすため尭雲の前に立ち塞がって重傷を負い、十五日目には負傷した体を押して復帰。影丘の戦いでも王賁を逃がすため自ら囮となった。"},
      {h:"その後", body:"番吾での敗戦後、亜花錦と共に将軍に昇進し、玉鳳軍は五万に増強される。存命。デザインのモデルは作者と親交の深いスキマスイッチの常田真太郎。"}
    ],
    battles:["b_gyou","b_heiyou","b_bango"],
    rel:[{to:"ouhon",label:"配下"},{to:"gyouun",label:"足止め"},{to:"akakin",label:"同僚"},{to:"ousen",label:"元上官"},{to:"shoutaku",label:"側近"},{to:"kyuukou",label:"側近"}]
  },
  {
    id:"shoutaku", name:"松琢", yomi:"しょうたく", kind:"person", state:"秦", group:"玉鳳隊",
    role:"玉鳳隊将校", klass:"武将", first:"52巻", arc:"鄴編〜", status:"存命",
    tags:["秦","玉鳳隊","関常の側近","宮康","十槍"],
    summary:"宮康と「兄弟」と呼び合った関常の側近。相棒の死後は十槍を討つことに執心する。",
    detail:[
      {h:"人物", body:"玉鳳隊の将校で関常の側近。宮康とは長年ともに戦ってきた間柄で、「兄弟」と呼び合うほどの絆があった。"},
      {h:"相棒の死", body:"朱海平原十三日目、王賁を死守する中で、自分に代わり捨て身の殿軍を買って出た宮康に王賁を託され、その最期を看取った。以降は「十槍」を討つことに執心している。存命。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"kanjou",label:"側近"},{to:"kyuukou",label:"兄弟分"},{to:"ouhon",label:"守る"},{to:"gyouun",label:"因縁"}]
  },
  {
    id:"kyuukou", name:"宮康", yomi:"きゅうこう", kind:"person", state:"秦", group:"玉鳳隊",
    role:"玉鳳隊将校", klass:"武将", first:"52巻", arc:"鄴編", status:"戦死",
    tags:["秦","玉鳳隊","殿軍","十槍","松琢"],
    summary:"尭雲に敗れた王賁を救うため、捨て身の殿を引き受けて散った。",
    detail:[
      {h:"人物", body:"玉鳳隊の将校で関常の側近。松琢とは「兄弟」と呼び合う仲だった。"},
      {h:"最期", body:"朱海平原十三日目、尭雲に敗れた王賁を救うべく捨て身の殿を引き受け、尭雲軍の精鋭「十槍」に討たれて戦死した。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"kanjou",label:"側近"},{to:"shoutaku",label:"兄弟分"},{to:"ouhon",label:"救う"},{to:"gyouun",label:"討たれる"}]
  },
  {
    id:"shiryou", name:"糸凌", yomi:"しりょう", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下将校 / 倉央軍副官", klass:"武将", first:"57巻", arc:"鄴編〜", status:"存命",
    tags:["秦","王翦軍","双剣","倉央と恋仲","ジ・アガ"],
    summary:"倉央と恋仲の双剣使い。ジ・アガを討ち、左腕と引き換えに生還した。",
    detail:[
      {h:"人物", body:"王翦傘下の将校で倉央軍副官。得物は双剣。倉央とは恋仲で、彼と同じく自ら先陣を切れる高い武力を持つ。常に左目が髪で隠れた姿で描かれる。"},
      {h:"朱海平原", body:"十五日目、王翦の指示で倉央と共に共伯軍へ先陣を切って猛威を振るう。李牧軍本陣まであと一歩まで迫るが龐煖に阻まれて一時退却。再度本陣を狙い、立ちはだかった趙将軍・共伯を一騎討ちで討ち取り、駆けつけた馬呈と対峙するが決着はつかなかった。"},
      {h:"番吾", body:"青歌の剛将ジ・アガと交戦。倉央を王翦のもとへ行かせ、自らはジ・アガと戦い続ける。左腕を折られ胸に一撃を喰らいながらもジ・アガを討ち取ったが、身動きできないほどの重傷を負い、カン・サロに助からないと判断されて放置された。"},
      {h:"その後", body:"息絶える前に捕虜となり、使い物にならなくなった左腕を切断されつつ手当てを受けて一命を取り留める。命を懸けて交渉に来た倉央と再会し、カン・サロの情けで二人とも釈放された。全面戦争でも倉央の傍らにいる。存命。"}
    ],
    battles:["b_gyou","b_bango"],
    rel:[{to:"soou",label:"恋仲"},{to:"kouhaku",label:"討つ"},{to:"jiaga",label:"相討ち"},{to:"kansaro",label:"解放される"},{to:"batei",label:"交戦"},{to:"ousen",label:"配下"},{to:"kaine",label:"圧倒"}]
  },
  {
    id:"dansa", name:"段茶", yomi:"だんさ", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下将軍 / 亜光軍所属", klass:"武将", first:"52巻", arc:"鄴編", status:"存命",
    tags:["秦","王翦軍","亜光軍","大将代理","信を大将に据える"],
    summary:"倒れた亜光の代理として、信を右翼の大将に据えた男。",
    detail:[
      {h:"人物", body:"王翦傘下の将軍で亜光軍所属。柔軟な思考ができる良将で、勝ち戦では能力以上の力を発揮する。娘が五人いる。"},
      {h:"信を大将に", body:"朱海平原九日目、意識不明の重体となった亜光に代わって大将代理を担当。亜光と王賁が不在の戦場で、信を新たに大将に据えるという判断を下した。"},
      {h:"読み違い", body:"終盤は馬南慈軍を足止めしていたが、その機動力を読み違えて森からの王翦軍本陣への突破を許してしまう。存命。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"akou",label:"代理"},{to:"shin",label:"大将に据える"},{to:"banaji",label:"足止め"},{to:"akakin",label:"共闘"},{to:"ousen",label:"配下"}]
  },
  {
    id:"gunei", name:"虞寧", yomi:"ぐねい", kind:"person", state:"秦", group:"王翦軍",
    role:"王翦傘下将軍 / 亜光軍副官", klass:"武将", first:"52巻", arc:"鄴編", status:"戦死",
    tags:["秦","王翦軍","王賁の教育係","老将"],
    summary:"四十五年戦い続けた老将にして王賁の元教育係。尭雲の足止めに失敗して散った。",
    detail:[
      {h:"人物", body:"王翦傘下の将軍で亜光軍副官。王賁の元教育係で、四十五年間戦場に出続けた歴戦の老将。"},
      {h:"最期", body:"朱海平原九日目、藺家十傑・尭雲の足止めに失敗して戦死した。この失敗が亜光の重体に直結する。"}
    ],
    battles:["b_gyou"],
    rel:[{to:"akou",label:"副官"},{to:"ouhon",label:"元教育係"},{to:"gyouun",label:"討たれる"}]
  },
  {
    id:"aisen", name:"愛閃", yomi:"あいせん", kind:"person", state:"秦", group:"楽華隊",
    role:"楽華隊副長（五千人将） → 将軍", klass:"武将", first:"65巻", arc:"宜安編〜", status:"存命",
    tags:["秦","楽華隊","猛将","元蒙武軍","将軍昇進"],
    summary:"楽華隊に足りなかった圧倒的な武を持ち込んだ剛将。中性的な見た目で口汚く荒ぶる。",
    detail:[
      {h:"人物", body:"楽華隊副長の五千人将からのちに将軍。元は蒙武軍の所属で、鄴攻略戦後に胡漸の後任として配属された。中性的な見た目だが実際はかなりの武闘派で、麾下兵団も武闘派揃い。楽華隊にそれまで足りなかった圧倒的な武力を持ち込んだ。"},
      {h:"性格", body:"普段は冷静で口数が少ないが、戦いになると口汚く荒ぶりながら敵を蹂躙する。"},
      {h:"誰と戦ったか", body:"宜安戦では、包囲網突破を図る飛信隊・楽華軍が楽彰に押し込まれた局面に駆けつけ、李信の攻撃を受け止めた楽彰の一瞬の隙を突いて重傷を負わせた。番吾での敗戦後、陸仙と共に将軍に昇進。存命。"}
    ],
    battles:["b_gian","b_bango"],
    rel:[{to:"mouten",label:"副長"},{to:"rikusen",label:"同僚"},{to:"kozen",label:"後任"},{to:"rakushou",label:"重傷を負わせる"},{to:"moubu",label:"元上官"}]
  },
  {
    id:"rikusen", name:"陸仙", yomi:"りくせん", kind:"person", state:"秦", group:"楽華隊",
    role:"楽華隊副長（五千人将） → 将軍", klass:"武将", first:"52巻", arc:"鄴編〜", status:"存命",
    tags:["秦","楽華隊","槍","若手","将軍昇進"],
    summary:"胡漸の過保護に苦言を呈す若手。王賁に劣らぬ槍の腕と評される。",
    detail:[
      {h:"人物", body:"楽華隊副長の五千人将からのちに将軍。若手の将校で、蒙恬に過保護な胡漸に苦言を呈すことが多い。胡漸からは王賁に劣らぬ槍の腕を持つと評されているが、本人は否定している。"},
      {h:"誰と戦ったか", body:"宜安戦で青歌軍の五千将フーオンに右手を裂かれるが、それでも戦闘を続行した。番吾での敗戦後、愛閃と共に将軍に昇進。存命。"}
    ],
    battles:["b_gyou","b_gian","b_bango"],
    rel:[{to:"mouten",label:"副長"},{to:"kozen",label:"苦言"},{to:"aisen",label:"同僚"},{to:"fuon",label:"交戦"}]
  },
  {
    id:"kozen", name:"胡漸", yomi:"こぜん", kind:"person", state:"秦", group:"楽華隊",
    role:"楽華隊副長", klass:"武将", first:"27巻", arc:"合従軍編〜鄴編", status:"戦死",
    tags:["秦","楽華隊","じい","蒙恬の教育係","龐煖"],
    summary:"蒙恬に「じい」と呼ばれた教育係。龐煖の前に立ちはだかって死んだ。",
    detail:[
      {h:"人物", body:"楽華隊の副長。蒙武に頼まれて幼少期から蒙恬の教育係を務め、過保護な面が多い。蒙恬からは「じい」と呼ばれている。"},
      {h:"最期", body:"朱海平原十四日目の夜、楽華隊本陣に忽然と現れた龐煖に襲われて重傷を負う。それでも蒙恬のもとへ行かせまいと立ちはだかり、剣で刺して一矢報いた後、討ち死にした。"}
    ],
    battles:["b_kankoku","b_gyou"],
    rel:[{to:"mouten",label:"教育係"},{to:"houken",label:"討たれる"},{to:"moubu",label:"託される"},{to:"rikusen",label:"同僚"}]
  },
  {
    id:"kyourei", name:"羌礼", yomi:"きょうれい", kind:"person", state:"秦", group:"羌瘣隊",
    role:"羌族の少女 / 現・蚩尤", klass:"武将", first:"61巻", arc:"間の章〜", status:"存命",
    tags:["秦","飛信隊","羌瘣隊","蚩尤","白鳳","羌識"],
    summary:"羌象の形見「白鳳」を継いだ現・蚩尤。羌瘣を殺しに来て、飛信隊に残った少女。",
    detail:[
      {h:"人物", body:"羌族の少女で現・蚩尤。羌瘣の側近で、得物は羌象の形見でもある「白鳳」。15巻の巻末おまけ漫画で初登場し、663話で本編に登場した。"},
      {h:"祭", body:"幽連の死が知れ渡って行われた“祭”で、姉貴分の羌識とともに最後まで勝ち残る。一騎討ちの寸前で羌識が斬るのを止めた隙に勢いで刺し殺してしまい、蚩尤となった。しかしそのことで精神に異常をきたし、殺すことを楽しむ残忍な性格に変貌する。"},
      {h:"飛信隊へ", body:"鄴編後に邯鄲南部戦線に突如現れ、趙兵を殺し回って飛信隊のもとに来る。捕虜も平然と殺す軍律違反を重ねて崇原に追放を言い渡され、真の目的は羌瘣を殺すことだと明かす。羌瘣との決闘の最中に羌識の最期の言葉を思い出して正気に戻り、和解した。"},
      {h:"その後", body:"以降は明朗な性格に戻り、羌瘣の側近として歩兵隊の主力に。影丘では瀕死の王賁を救い、難所攻めでは先陣を切って拠点確保に貢献した。尾平の結婚披露宴のあと、昂に求婚されている。存命。"}
    ],
    battles:["b_heiyou","b_gian","b_bango"],
    rel:[{to:"kyoukai",label:"側近"},{to:"kyoushiki",label:"姉貴分を殺す"},{to:"kyoushou",label:"形見を継ぐ"},{to:"kou",label:"求婚される"},{to:"suugen",label:"追放を言い渡される"},{to:"ouhon",label:"救う"},{to:"fuon",label:"斬る"}]
  },
  {
    id:"kyoushiki", name:"羌識", yomi:"きょうしき", kind:"person", state:"蚩尤", group:"羌族",
    role:"羌族の蚩尤候補", klass:"刺客", first:"61巻", arc:"間の章（回想）", status:"死亡",
    tags:["蚩尤","羌族","祭","羌礼"],
    summary:"斬るのを躊躇って羌礼に刺された姉貴分。その最期の一言が羌礼を正気に戻した。",
    detail:[
      {h:"人物", body:"羌族の次の代の蚩尤候補で、羌礼の姉貴分。非常に寡黙だが、外の世界に少なからず興味を抱いていた。"},
      {h:"最期", body:"“祭”では羌礼とともに最後まで残り一騎討ちになるが、寸前で羌礼を斬るのを躊躇って止めたことで、逆に刺されて死亡。死の間際、羌礼に生き延びてほしかったと告げて息を引き取った。この言葉が、後に狂った羌礼を正気に戻すきっかけになる。"}
    ],
    battles:[],
    rel:[{to:"kyourei",label:"妹分に討たれる"},{to:"f_shiyuu",label:"羌族"}]
  },
  {
    id:"soujin", name:"蒼仁", yomi:"そうじん", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊弓兵 → 弓部隊百人将", klass:"武将", first:"46巻", arc:"鄴編〜", status:"存命",
    tags:["秦","飛信隊","弓","蒼源の息子","蒼兄弟"],
    summary:"中華十弓・蒼源の長男。指がぼろぼろになるまで弓を引き、河了貂を守り抜いた。",
    detail:[
      {h:"人物", body:"飛信隊の弓兵からのちに弓部隊百人将。黒羊戦後の入隊試験に臨んだ狩人の少年で、蒼淡の兄。秦国で唯一の「中華十弓」だった蒼源の息子である。"},
      {h:"入隊", body:"体力検査では弟と共に不合格となるが、信と河了貂の前で卓越した弓術を披露し、兄弟そろって特例合格した。"},
      {h:"父のこと", body:"父・蒼源は「麃公の無茶な突撃命令で死んだ」と聞かされていたが、元麃公軍の岳雷から、実は自分たちの部隊を助けに行った末の戦死だったと明かされる。岳雷を責めることはせず、知らなかった父の活躍を知れたことを喜んだ。"},
      {h:"戦歴", body:"初陣の列尾城攻略では躊躇を捨てて将校を正確に狙い撃ち、陥落に貢献。朱海平原最終決戦では指がぼろぼろになるまで弓を引き続け、金毛軍の奇襲で窮地の河了貂を、弓が壊れても身を挺して死守した。宜安では蒼淡とともに雲慶を射殺し、上和龍を負傷させて岳雷の仇を討っている。全面戦争では中華十弓一位の青華雲を射抜いた。存命。"}
    ],
    battles:["b_gyou","b_gian","b_bango"],
    rel:[{to:"soutan",label:"弟"},{to:"sougen",label:"実父"},{to:"gakurai",label:"父の真実を聞く"},{to:"tenn",label:"守る"},{to:"seikaun",label:"討つ"},{to:"shin",label:"配下"}]
  },
  {
    id:"soutan", name:"蒼淡", yomi:"そうたん", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊弓兵 → 弓部隊五十人将", klass:"武将", first:"46巻", arc:"鄴編〜", status:"存命",
    tags:["秦","飛信隊","弓","蒼兄弟","金毛"],
    summary:"人を射ることができなかった弟。兄の負傷に激高して覚醒し、金毛を討った。",
    detail:[
      {h:"人物", body:"飛信隊の弓兵からのちに弓部隊五十人将。兄・蒼仁とともに入隊試験に臨んだ狩人の少年。弓の腕前は父や兄譲りだが、気が弱い一面がある。思ったことをすぐ口にするので度々兄に叱られる。"},
      {h:"覚醒", body:"初陣の列尾城戦では敵を射ることを躊躇って力を出せず、兄に叱られて落ち込んだ。朱海平原では兄の助言で人ではなく馬を射て敵を圧倒する。その後も人を射れず補佐に徹していたが、金毛軍によって蒼仁が重傷を負ったことで激高し、ついに人を射られるようになった。人体を吹き飛ばすほどの豪弓で金毛軍を圧倒し、趙将軍・金毛を討ち取っている。存命。"}
    ],
    battles:["b_gyou","b_gian","b_bango"],
    rel:[{to:"soujin",label:"兄"},{to:"sougen",label:"実父"},{to:"kinmou",label:"討つ"},{to:"seikaun",label:"交戦"},{to:"shin",label:"配下"}]
  },
  {
    id:"sougen", name:"蒼源", yomi:"そうげん", kind:"person", state:"秦", group:"麃公軍",
    role:"麃公軍将校 / 蒼弓隊隊長", klass:"武将", first:"46巻", arc:"鄴編（回想）", status:"戦死",
    tags:["秦","中華十弓","麃公軍","蒼兄弟の父"],
    summary:"秦で唯一「中華十弓」に名を連ねた弓の名手。蒼仁・蒼淡の父。",
    detail:[
      {h:"人物", body:"麃公軍の将校で、特殊弓騎兵団「蒼弓隊」の隊長。蒼仁と蒼淡の父親で、かつて秦国唯一の「中華十弓」に名を連ねた名手。"},
      {h:"経歴", body:"同じ中華十弓の馬朱離と戦うために幼い二人を置いて戦場へ赴き、その弓の実力を麃公に認められて特殊部隊の指揮を任される。魏の中華十弓・白公を討ち取ったことで「中華十弓」と認められた。"},
      {h:"最期", body:"ある戦場で敵の伏兵に遭って戦死。実際は岳雷たちの部隊を救うための死だったが、息子たちにはその活躍は知らされていなかった。"}
    ],
    battles:[],
    rel:[{to:"soujin",label:"実子"},{to:"soutan",label:"実子"},{to:"hyoukou",label:"配下"},{to:"gakurai",label:"救う"},{to:"f_juukyuu",label:"十弓"}]
  },
  {
    id:"kou", name:"昂", yomi:"こう", kind:"person", state:"秦", group:"飛信隊",
    role:"飛信隊歩兵 → 百将", klass:"兵", first:"5巻", arc:"蛇甘平原の戦い〜", status:"存命",
    tags:["秦","飛信隊","尾平隊","羌礼","出世"],
    summary:"母に楽をさせたい一心で出世した信の同郷。羌礼に求婚した男。",
    detail:[
      {h:"人物", body:"飛信隊の尾平隊所属の少年歩兵からのちに百将。信の同郷で、当初は小柄で気が弱かったが、「母親に楽をさせるために出世したい」という熱意を持つようになった。空気が読めず余計な一言が多い。"},
      {h:"羌礼との縁", body:"鄴の戦いの後、趙軍に殺されそうになったところを羌礼に助けられ、以来彼女を気に掛けるようになる。尾平の結婚披露宴の後、羌礼にいつか戦いが終わって両方生き残っていたら結婚してほしいと告げ、返事を聞かずに走り去った。存命。"}
    ],
    battles:["b_dakan","b_bayou","b_gyou","b_gian"],
    rel:[{to:"obei",label:"隊長"},{to:"kyourei",label:"求婚"},{to:"shin",label:"同郷"}]
  },
  {
    id:"iou", name:"衣央", yomi:"いお", kind:"person", state:"秦", group:"砂鬼一家",
    role:"砂鬼一家 首領", klass:"武将", first:"41巻", arc:"黒羊編〜", status:"存命",
    tags:["秦","桓騎軍","砂鬼一家","拷問","桓騎の過去"],
    summary:"覆面の下は黒髪の美女。桓騎の過去を語った、砂鬼一家の首領。",
    detail:[
      {h:"人物", body:"残虐さでは桓騎軍随一とされる、奇妙な覆面の怪人らの集団・砂鬼一家の首領。宜安城攻略の前に李信たちの前で覆面を脱ぎ、黒髪の美女であることが判明した。"},
      {h:"砂鬼一家", body:"拷問を好み、桓騎軍の兵からは「ゼノウ一家と並んで最もヤバい一家」「拷問し死体を弄ぶ」「砂鬼に捕まることが中華一の不運」と言われる。常に凄まじい死臭を纏い、桓騎軍で尋問や拷問を担当する。"},
      {h:"やったこと", body:"黒羊編では捕らえた趙兵を拷問し、黒羊丘近辺の村人の屍で作った「贈り物」を紀彗に届けて脅し、勝敗を決定づけた。扈輒軍との戦いでは、雷土を拷問した拷問官の生き残りに顛末を吐かせている。"},
      {h:"桓騎を語る", body:"宜安戦で森に潜伏中に飛信隊と遭遇。那貴の「砂鬼が桓騎一家の最古参」という認識を否定し、「桓騎が砂鬼一家の最古参だ」と訂正した上で、桓騎の過去を語り始めた。砂鬼は桓騎一家に属しておらず、昔のよしみで横にいるだけだとも語っている。戦後、摩論の傭兵団の誘いを断り、一家と共に自分たちの「聖地」に帰る意向を告げた。存命。"}
    ],
    battles:["b_kokuyou","b_heiyou","b_gian"],
    rel:[{to:"kanki",label:"昔のよしみ"},{to:"shio",label:"実姉"},{to:"shou",label:"一家"},{to:"naki",label:"取引"},{to:"kisui",label:"脅す"},{to:"shin",label:"取引"},{to:"f_saki",label:"首領"}]
  },
  {
    id:"shio", name:"偲央", yomi:"しお", kind:"person", state:"秦", group:"砂鬼一家",
    role:"先代 砂鬼一家 首領", klass:"—", first:"68巻", arc:"宜安編（回想）", status:"死亡",
    tags:["秦","砂鬼一家","桓騎の過去","聖地"],
    summary:"桓騎を拾った少女。その凄惨な死が、桓騎という怪物を完成させた。",
    detail:[
      {h:"人物", body:"桓騎が拾われた当時の一家の首領で、衣央の姉。当時はまだ名前のない、行き場のない孤児たちの野盗団だった。"},
      {h:"始まり", body:"桓騎を拾った後、自分たちを虐待する狼甫一家の住み処に桓騎の提案で潜入し、頭目・狼甫を寝込みで殺す。報復を逃れて「聖地」と呼ぶ住み処を放棄し、一家で旅立った。桓騎が狼甫一家の二人を「解体」して晒し、それが「この先お前たちが誰一人傷つけられないための手段」だと告げたことが、砂鬼一家の始まりになった。"},
      {h:"最期", body:"桓騎たちの勢力拡大を疎んだ紀巴城城主の部下に拉致され、乱暴された末に手足を斬り落とされるという凄惨な死を遂げる。これを契機に桓騎は砂鬼一家を離れて桓騎一家を作り、妹の衣央が砂鬼一家の首領となった。"}
    ],
    battles:[],
    rel:[{to:"kanki",label:"拾う"},{to:"iou",label:"実妹"},{to:"f_saki",label:"先代首領"}]
  },
  {
    id:"shou", name:"召", yomi:"しょう", kind:"person", state:"秦", group:"砂鬼一家",
    role:"砂鬼一家", klass:"—", first:"68巻", arc:"宜安編", status:"戦死",
    tags:["秦","砂鬼一家","頭巾","桓騎の怒り"],
    summary:"顔を焼かれた過去を持つ男。桓騎の根底にある「怒り」の正体を語り残した。",
    detail:[
      {h:"人物", body:"砂鬼一家の一員で、設立前から常に頭巾を被っていた。幼い頃に親に売られて領主の下僕にされ、その変態領主に面白半分で顔を焼かれて逃げ出したという過去があるためである。"},
      {h:"桓騎の怒り", body:"宜安城陥落後、桓騎たちが自分の顔を焼いた領主を襲った日のことを李信たちに語る。桓騎が領主の顔を半分焼いた上で、砂鬼一家の「仇」は高い身分の者だけでなくその中間にいる普通の連中も含まれると告げたこと──つまり桓騎が底辺の者以外の全人間を憎悪し否定していることを語り、李信と那貴を絶句させた。"},
      {h:"最期", body:"森林地帯での戦いで楽彰軍に重傷を負わされ、那貴一家に助け出されるが致命傷。桓騎の過去を語り終えると、衣央たちに先に「聖地」で待っていると言い残して息を引き取った。"}
    ],
    battles:["b_gian"],
    rel:[{to:"iou",label:"一家"},{to:"kanki",label:"仇を討ってもらう"},{to:"shin",label:"語る"},{to:"naki",label:"救われる"},{to:"f_saki",label:"一家"}]
  },
  {
    id:"shuma", name:"朱摩", yomi:"しゅま", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎傘下将軍 / 朱摩一家頭領", klass:"武将", first:"63巻", arc:"平陽・影丘の戦い〜肥下", status:"戦死",
    tags:["秦","桓騎軍","双剣","扈輒","カイネ"],
    summary:"ゼノウ一家に匹敵する武を持つ双剣の頭領。扈輒を死に至らしめた男。",
    detail:[
      {h:"人物", body:"桓騎傘下の将軍。数は少ないがゼノウ一家に匹敵する武力を持つ朱摩一家の頭領で、双剣の使い手。"},
      {h:"扈輒討ち", body:"扈輒軍との戦いでは敵本陣襲撃に従軍し、逃亡を図る扈輒たちを桓騎とともに先回りして護衛を殲滅、扈輒を死に至らしめた。"},
      {h:"最期", body:"宜安城から肥下城へ向かう森林地帯の戦いで、手薄になった李牧軍本陣を桓騎たちと共に奇襲。カイネと交戦して追い詰めるが、助けに来た李牧の突きの一撃で頭部を左目ごと貫かれて戦死した。"}
    ],
    battles:["b_heiyou","b_gian"],
    rel:[{to:"kanki",label:"配下"},{to:"kochou",label:"討つ"},{to:"kaine",label:"交戦"},{to:"riboku",label:"討たれる"}]
  },
  {
    id:"hanzen", name:"氾善", yomi:"はんぜん", kind:"person", state:"秦", group:"桓騎軍",
    role:"桓騎軍将校 / 攻城部隊", klass:"武将", first:"63巻", arc:"平陽・影丘の戦い〜", status:"存命",
    tags:["秦","桓騎軍","井蘭車","紅春","攻城戦"],
    summary:"自作の井蘭車「紅春」を操る攻城戦専門の将校。ふらつくので敵に酷評される。",
    detail:[
      {h:"人物", body:"桓騎軍の将校で、攻城戦専門の部隊を率いる。独自に設計と製造を重ねて井蘭車を作り上げ、かつて交際していた女性の名前から「紅春」と名付けた。移動中に揺れたりふらついたりするため、敵軍からは「ふざけた井蘭車」と酷評されている。"},
      {h:"戦歴", body:"平陽城攻略戦では紅春で城を落とすことに貢献。宜安城攻略戦では本軍とは別の道から向かい、飛信隊・楽華軍と共に宜安城を攻略した。"},
      {h:"その後", body:"戦闘には不向きだったため、一命を取り留めた田有たちを運ぶ荷車の陰に隠れて生き延びる。帰国の途中、摩論の傭兵団で新たな「紅春」を製造することを李信たちに告げた。存命。"}
    ],
    battles:["b_heiyou","b_gian"],
    rel:[{to:"kanki",label:"配下"},{to:"maron",label:"合流"},{to:"iou",label:"共に行動"},{to:"mouten",label:"共闘"},{to:"shin",label:"共闘"}]
  },
  {
    id:"hakuki", name:"白起", yomi:"はくき", kind:"person", state:"秦", group:"秦六大将軍（旧）",
    role:"六大将軍 筆頭", klass:"武将", first:"18巻", arc:"長平の戦い（回想）", status:"故人",
    tags:["秦","六大将軍","長平","四十万","怪物"],
    summary:"長平で投降兵四十万を生き埋めにした六将筆頭。趙の憎悪の源。",
    detail:[
      {h:"人物", body:"秦六大将軍の筆頭。危険を冒さず、相手がムキになるほど力を抜いて勢いをかわす戦い方をする。廉頗から「六大将軍の中でも最もやりづらい」「正真正銘の怪物」と評された。"},
      {h:"長平", body:"長平の戦いで秦軍総大将を務め、投降した趙兵四十万人を全員生き埋めにするという決断を下した。この一件が趙の秦への憎悪を決定的にし、万極という怪物を生み、幼い政が趙で虐げられる原因にもなっている。故人。"}
    ],
    battles:["b_chouhei"],
    rel:[{to:"renpa",label:"評される"},{to:"choukatsu",label:"破る"},{to:"bankyoku",label:"憎悪の起点"},{to:"ouki",label:"同僚"},{to:"f_rokushou_old",label:"筆頭"}]
  },
  {
    id:"koshou", name:"胡傷", yomi:"こしょう", kind:"person", state:"秦", group:"秦六大将軍（旧）",
    role:"六大将軍", klass:"軍師", first:"18巻", arc:"—", status:"故人",
    tags:["秦","六大将軍","軍師","昌平君の師"],
    summary:"六将唯一の軍師出身。自由に見えた六将の戦略の大枠を描いていた男。",
    detail:[
      {h:"人物", body:"六大将軍で唯一の軍師出身にして随一の智将。自由に戦っていたとされる六将も、実際は胡傷が戦略の大枠を作り、皆がそれに従っていたと言われている。"},
      {h:"影響", body:"昌平君の師であり、王翦を高く評価していた。秦の戦略思想の源流にあたる人物。故人。"}
    ],
    battles:[],
    rel:[{to:"shouheikun",label:"師"},{to:"ousen",label:"評価"},{to:"ouki",label:"同僚"},{to:"f_rokushou_old",label:"六将"}]
  },
  {
    id:"oukotsu", name:"王齕", yomi:"おうこつ", kind:"person", state:"秦", group:"秦六大将軍（旧）",
    role:"六大将軍", klass:"武将", first:"27巻", arc:"合従軍編（言及）", status:"故人",
    tags:["秦","六大将軍","怪力","長柄大斧","汗明"],
    summary:"六将随一の怪力豪将。汗明が「自分が撃退した」と語った相手。",
    detail:[
      {h:"人物", body:"秦六大将軍の一人。六将随一の怪力豪将と呼ばれ、得物は長柄大斧。"},
      {h:"逸話", body:"かつて人知れず楚へ侵攻した際、汗明との一騎討ちに敗れて撤退した──と汗明本人は語ったが、真偽は不明。故人。"}
    ],
    battles:[],
    rel:[{to:"kanmei",label:"因縁"},{to:"ouki",label:"同僚"},{to:"f_rokushou_old",label:"六将"}]
  },
  {
    id:"shibasaku", name:"司馬錯", yomi:"しばさく", kind:"person", state:"秦", group:"秦六大将軍（旧）",
    role:"六大将軍", klass:"武将", first:"18巻", arc:"—", status:"故人",
    tags:["秦","六大将軍"],
    summary:"六大将軍の一人。作中では名のみが語られる。",
    detail:[
      {h:"人物", body:"秦六大将軍の一人。作中では名前が挙がるのみで、詳細はほとんど語られていない。故人。"}
    ],
    battles:[],
    rel:[{to:"ouki",label:"同僚"},{to:"f_rokushou_old",label:"六将"}]
  },
  {
    id:"shouou", name:"昭王（昭襄王）", yomi:"しょうおう しょうじょうおう", kind:"person", state:"秦", group:"秦王族",
    role:"第二十八代 秦王", klass:"王・王族", first:"11巻", arc:"馬陽の戦い（回想）", status:"故人",
    tags:["秦","王","戦神","六大将軍","摎の父"],
    summary:"在位五十五年の大半を戦に費やした戦神。六大将軍を生んだ王。",
    detail:[
      {h:"人物", body:"秦国第二十八代の王で、政と成蟜の曽祖父。在位五十五年の大半を戦に費やし、「戦神」と呼ばれて秦国中の武人に慕われた。晩年は目元を隠す仮面のようなものを付けていた。"},
      {h:"六大将軍", body:"将軍たちに戦争の自由を与える「六大将軍」制度を作った王であり、王騎・白起・摎らはその下で中華を席巻した。王騎が心酔し、その死後に一線を退いた相手でもある。"},
      {h:"摎", body:"六将・摎の実の父。生母の身分が低く暗殺を危惧されたため公にはできず、対面で互いに親子と感じ取りながら暗黙の了解のままだった。故人。"}
    ],
    battles:[],
    rel:[{to:"ouki",label:"心酔される"},{to:"kyou",label:"実の娘"},{to:"shoubunkun",label:"仕えられる"},{to:"hyoukou",label:"認める"},{to:"f_rokushou_old",label:"創設"}]
  },
  {
    id:"rouai", name:"嫪毐", yomi:"ろうあい", kind:"person", state:"秦", group:"毐国",
    role:"宦官（偽） → 毐国の旗頭", klass:"—", first:"37巻", arc:"愛編", status:"処刑",
    tags:["秦","毐国","趙姫","車裂き","反乱"],
    summary:"太后の伽のためだけに送り込まれた男が、最後は反乱の全責任を背負って死んだ。",
    detail:[
      {h:"人物", body:"宦官の一人として後宮に入った男性。実際は宦官ではなく、呂氏陣営の命で太后の伽を務めることだけを任務としていた。"},
      {h:"毐国", body:"著雍戦から二か月後、山陽長官に推す趙姫に伴われて朝廷に現れる。その後、趙姫とともに山陽から太原へ移り、建国に至った。廷臣を押しとどめる才覚もなく、ただ毐国造反の旗頭として祭り上げられてしまう。"},
      {h:"転機", body:"しかし趙姫が心中に隠している悲哀を見て取ったことで、趙姫のために忠誠を尽くし生きることを決意する。以降は愚鈍ながらも一角の男としての器量と風格を見せるようになった。"},
      {h:"最期", body:"反乱鎮圧後に捕えられ車裂きの刑に処され、一族もすべて誅殺された。取り調べでは反乱をすべて自らの計画として趙姫を庇い通し、最期まで趙姫への愛に殉じて感謝を述べたのち、従容として刑に臨んだ。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"taigo",label:"愛する"},{to:"ryofui",label:"送り込まれる"},{to:"choukou",label:"実務を担われる"},{to:"sei",label:"処刑される"},{to:"f_ai",label:"旗頭"}]
  },
  {
    id:"choukou", name:"趙高", yomi:"ちょうこう", kind:"person", state:"秦", group:"毐国",
    role:"後宮の宦官 / 趙姫傘下家臣", klass:"文官", first:"37巻", arc:"愛編", status:"流刑",
    tags:["秦","毐国","宦官","趙姫","蜀"],
    summary:"毐国を実務面で作り上げた宦官。史実では秦を滅ぼす男。",
    detail:[
      {h:"人物", body:"後宮に仕える宦官で趙姫傘下の家臣。趙姫に従順だが、彼自身の思惑を垣間見せる時もある。"},
      {h:"毐国", body:"その才能を高く買う趙姫には個人的な秘書官のように重用され、実務面から毐国建国を担った。嫪毐が飾りでも、趙高の実務能力があれば国は作れる──という算段だった。"},
      {h:"その後", body:"反乱失敗後は蜀に流刑となった。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"taigo",label:"重用される"},{to:"rouai",label:"支える"},{to:"f_ai",label:"実務"}]
  },
  {
    id:"hanoki", name:"樊於期", yomi:"はんおき", kind:"person", state:"秦", group:"毐国",
    role:"毐国将軍", klass:"武将", first:"38巻", arc:"愛編", status:"逃亡（消息不明）",
    tags:["秦","毐国","反乱","逃亡"],
    summary:"反乱に加わり、息子の処刑を変装して見届けたのち消息を絶った将。",
    detail:[
      {h:"人物", body:"毐国の将軍で、嫪毐の反乱に参加した。"},
      {h:"その後", body:"咸陽を攻めるもワテギの討ち死にで反乱失敗を悟って逃亡。その後、変装して咸陽での息子・樊琉期の処刑を見届けた。以降は消息不明。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"rouai",label:"従う"},{to:"hanruki",label:"実子"},{to:"wategi",label:"同僚"},{to:"f_ai",label:"将軍"}]
  },
  {
    id:"hanruki", name:"樊琉期", yomi:"はんるき", kind:"person", state:"秦", group:"毐国",
    role:"毐国将軍", klass:"武将", first:"38巻", arc:"愛編", status:"処刑",
    tags:["秦","毐国","後宮襲撃","残虐"],
    summary:"弱者を殺すのは軍を持つ者の特権と考えた歪んだ将。信に右腕を落とされた。",
    detail:[
      {h:"人物", body:"毐国の将軍で樊於期の息子。常に笑みを浮かべているが、弱者を殺すのは軍を持つ者の特権と考える残虐で歪んだ性格で、そのため人望がなかった。"},
      {h:"最期", body:"咸陽を攻めて民を虐殺し、後宮に侵入して向たちを狙うが、駆け付けた信に右腕を切断される。さらに部下に見捨てられて捕縛され、反乱鎮圧後に咸陽で処刑された。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"hanoki",label:"実父"},{to:"shin",label:"腕を落とされる"},{to:"kou_jo",label:"狙う"},{to:"f_ai",label:"将軍"}]
  },
  {
    id:"wategi", name:"ワテギ", yomi:"わてぎ", kind:"person", state:"秦", group:"毐国",
    role:"毐国将軍 / 戎籊族の王", klass:"武将", first:"38巻", arc:"愛編", status:"戦死",
    tags:["秦","毐国","異民族","戎籊公","昌平君"],
    summary:"昌平君の包雷を見抜いた異民族の王。反乱軍の総指揮を任された猛将。",
    detail:[
      {h:"人物", body:"毐国の将軍で、異民族・戎籊族の王。通称は戎籊公。領土を制圧された過去から秦国に恨みを持つ。"},
      {h:"最期", body:"嫪毐の反乱で総指揮を任され、昌平君の包雷を見抜くほどの猛将ぶりを見せたが、その昌平君に敗死した。彼の死が反乱の帰趨を決めた。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"rouai",label:"総指揮を任される"},{to:"shouheikun",label:"討たれる"},{to:"hanoki",label:"同僚"},{to:"f_ai",label:"将軍"}]
  },
  {
    id:"kou_jo", name:"向", yomi:"こう", kind:"person", state:"秦", group:"後宮",
    role:"宮女 → 政の妃", klass:"—", first:"25巻", arc:"合従軍編〜", status:"存命",
    tags:["秦","後宮","麗の母","政"],
    summary:"貧商の娘。政を本心から慕い、呂不韋と趙姫の密通を命がけで伝えた宮女。",
    detail:[
      {h:"人物", body:"宮廷に仕える宮女で貧商の娘。何度も夜伽で政の相手を務めたが、政が伽の時間に書を読んだり話し相手になっているだけで、長い間手はつけられなかった。"},
      {h:"命がけの報せ", body:"宮女という立場としてだけではなく本心から政を慕っており、呂不韋と趙姫の密通を目撃した際には宦官に刺されながらも逃げ出し、政にことの次第を伝えた。"},
      {h:"その後", body:"のちに政との娘・麗を出産。秦国統一編では毐国軍に追い詰められたが、間一髪で信と飛信隊に救われた。反乱鎮圧後、嫪毐の処刑の際に政を責め立てる趙姫に対し、涙ながらに怒りを露わにして政に愛情を向けない趙姫を責めた。存命。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"sei",label:"妃"},{to:"taigo",label:"糾弾"},{to:"shin",label:"救われる"},{to:"you_jo",label:"親友"},{to:"hanruki",label:"狙われる"}]
  },
  {
    id:"you_jo", name:"陽", yomi:"よう", kind:"person", state:"秦", group:"後宮",
    role:"宮女", klass:"—", first:"25巻", arc:"合従軍編〜", status:"存命",
    tags:["秦","後宮","向の親友"],
    summary:"向の親友。高貴な生まれでありながら、身を挺して向と麗を守ろうとした。",
    detail:[
      {h:"人物", body:"宮廷に仕える宮女で向の親友。向とは対照的に高貴な生まれ。"},
      {h:"やったこと", body:"重傷を負った向を助けるため、夜伽の順番を無視して政に助けを求めた。秦国統一編では向と麗を逃がすために身を挺して毐国軍の前に立ちはだかり、間一髪で信と飛信隊に救われている。"},
      {h:"その後", body:"韓侵攻の終戦後、政との娘を出産した。存命。"}
    ],
    battles:["b_aikoku"],
    rel:[{to:"kou_jo",label:"親友"},{to:"sei",label:"妃"},{to:"shin",label:"救われる"}]
  },
  {
    id:"rui", name:"瑠衣", yomi:"るい", kind:"person", state:"秦", group:"成蟜一派",
    role:"成蟜の正室 / 秦国公女", klass:"王・王族", first:"37巻", arc:"愛編〜", status:"存命",
    tags:["秦","成蟜","屯留","呂不韋打倒"],
    summary:"成蟜の正室。夫の遺志を継いで一派を束ね、呂不韋打倒を誓った公女。",
    detail:[
      {h:"人物", body:"成蟜の正室で秦国公女。北東の大都市・屯留の出身。幼い頃に成蟜のもとへ先の王妃として嫁ぐも、嬴政が邯鄲から戻ったことでその地位を失い、そのことで嬴政を敵視していた。"},
      {h:"屯留", body:"高齢の曾祖母を見舞いに屯留へ帰郷していたところ趙軍の奇襲を受ける。趙軍を撃退した成蟜軍が蒲鶮によって反乱軍に仕立て上げられ、自身も幽閉された。"},
      {h:"継承", body:"鎮圧軍との戦闘中に成蟜に助け出され、末期の夫から一派の取りまとめを託されて呂不韋打倒を誓う。秦国統一編では政の加冠の儀に列席し、政と呂不韋の対談にも立ち会って、政の語る中華統一の真意に涙した。存命。"}
    ],
    battles:["b_tonryu"],
    rel:[{to:"seikyou",label:"正室"},{to:"sei",label:"敵視から和解"},{to:"ryofui",label:"打倒を誓う"}]
  },
  {
    id:"kaioku", name:"介億", yomi:"かいおく", kind:"person", state:"秦", group:"昌平君派",
    role:"昌平君傘下家臣 / 軍師学校教官", klass:"軍師", first:"30巻", arc:"合従軍編〜", status:"存命",
    tags:["秦","軍師","蕞","守城兵器","鄴の戦略"],
    summary:"蕞の北壁を守り抜いた軍師学校の教官。鄴攻略の戦略を作った一人。",
    detail:[
      {h:"人物", body:"昌平君傘下の家臣で、軍師養成学校の教官。"},
      {h:"蕞", body:"合従軍編では昌平君の命により百の兵を率いて蕞攻防戦に参戦。北壁を担当し、特製の守城兵器で防衛しつつ、絶妙な采配で各所に兵を送って蕞防衛に貢献した。"},
      {h:"その後", body:"加冠の儀の直後に昌平君と共に呂不韋陣営から離反し、咸陽攻防戦に参戦。鄴編では昌平君たちと共に鄴攻略の戦略を苦労して完成させた。鄴陥落後は兵糧輸送のため出陣し、列尾で扈輒・舜水樹軍と対峙するが、これは黄河を渡る青忠水軍の陽動であり、李牧に見抜かれていた。桓騎戦死後は、韓非を招聘する使節団の長を務める。存命。"}
    ],
    battles:["b_sai","b_aikoku","b_gyou"],
    rel:[{to:"shouheikun",label:"配下"},{to:"kochou",label:"対峙"},{to:"riboku",label:"見抜かれる"},{to:"kanpishi",label:"招聘"},{to:"mouki",label:"同僚"}]
  },
  {
    id:"kakubi", name:"郭備", yomi:"かくび", kind:"person", state:"秦", group:"蒙驁軍",
    role:"蒙驁軍千人将", klass:"武将", first:"20巻", arc:"山陽攻略戦", status:"暗殺",
    tags:["秦","蒙驁軍","下僕出身","輪虎","信の下地"],
    summary:"下僕から千人将になった良将。輪虎に暗殺され、その兵が信の隊になった。",
    detail:[
      {h:"人物", body:"蒙驁軍の千人将。知勇兼備で将来を期待された良将。実は下僕出身で、子のいない郭家の養子となった経歴を持ち、そのため信の活躍に共感と親近感を覚えていた。"},
      {h:"最期", body:"山陽編では近利関攻めで敵が玉鳳隊と飛信隊に集中している隙に別門から突破して陥落させる。戦後、軍議へ向かう途中に飛信隊と対面して激励するも、直後に輪虎に暗殺された。"},
      {h:"残したもの", body:"信が臨時千人将に抜擢された時、七百人が郭備隊から補充される。生前に信を好意的に語っていたため、彼らはすんなり信の指揮下に入ることを受け入れた。"}
    ],
    battles:["b_sanyou"],
    rel:[{to:"mougou",label:"配下"},{to:"rinko",label:"暗殺される"},{to:"shin",label:"兵を託す"}]
  },
  {
    id:"gakuga", name:"岳牙", yomi:"がくが", kind:"person", state:"秦", group:"麃公軍",
    role:"麃公傘下将軍 / 麃公軍副官", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い〜合従軍編", status:"戦死",
    tags:["秦","麃公軍","副官","李牧","老将"],
    summary:"麃公が若い頃から仕えた副官。李牧本陣まで肉薄して散った。",
    detail:[
      {h:"人物", body:"麃公傘下の将軍で麃公軍副官。麃公が若いころから仕える歴戦の猛将。"},
      {h:"最期", body:"蛇甘平原編でも合従軍編でも麃公の傍に仕え、終盤には李牧軍を猛追して麃公と共に敵本陣まで辿り着く。趙三大天・李牧を討とうと奮戦するも戦死した。"}
    ],
    battles:["b_dakan","b_kankoku"],
    rel:[{to:"hyoukou",label:"副官"},{to:"riboku",label:"追い詰める"},{to:"bakukoshin",label:"同僚"}]
  },

  /* ───────────── 追加: 魏火龍七師・楚・燕・韓・斉・代・山の民 ───────────── */
  {
    id:"shihaku", name:"紫伯", yomi:"しはく", kind:"person", state:"魏", group:"魏火龍七師",
    role:"魏火龍七師", klass:"武将", first:"35巻", arc:"魏火竜七師編", status:"戦死",
    tags:["魏","魏火龍","槍術","紫季歌","王賁"],
    summary:"魏国史最強の槍術師。妹への愛が七師の内乱を起こし、王賁に討たれた。",
    detail:[
      {h:"人物", body:"魏国史上最強の槍術師と言われるほどの達人で、知略にも長けた知勇兼備の名将。「紫伯」は紫家における当主名であり、本名は紫詠。"},
      {h:"出自", body:"義父・紫太が囲っていた女性の連れ子。直接の血の繋がりがないため、母を流行病で亡くすと存在を疎まれ、激戦地へ送られる日々を過ごした。この経験が槍術を実戦形式で徹底的に鍛え上げ、紫太に実子が生まれなかったことから紫伯の名を継ぐ。"},
      {h:"内乱の理由", body:"あらゆる物事に興味を持たず、妹の紫季歌だけを心の拠り所としていた。その絆は義兄妹を超え、妻として娶ることを願い出るほどだった。しかし紫太が遠征中に紫季歌の婚儀を強引に執り行い、その相手が魏火龍・太呂慈。不貞を働いたと見なされた紫季歌は斬殺され、激怒した紫詠は紫太を殺害、太呂慈とその味方についた晶仙・馬統の三人も討ち取った。これが魏火龍七師の同士討ちである。"},
      {h:"最期", body:"著雍戦で十四年ぶりに地下牢から解放される。知略と武勇で玉鳳隊を苦戦させ、王賁に重傷を負わせた。しかし三日目の再戦で自身の弱点を見抜かれ、王賁に討たれて戦死した。"}
    ],
    battles:["b_chakuyou"],
    rel:[{to:"ouhon",label:"討たれる"},{to:"tairoji",label:"討つ"},{to:"shikika",label:"義妹にして想い人"},{to:"gohoumei",label:"呼び戻される"},{to:"reiou",label:"味方"},{to:"f_gikaryuu",label:"七師"}]
  },
  {
    id:"reiou", name:"霊凰", yomi:"れいおう", kind:"person", state:"魏", group:"魏火龍七師",
    role:"魏火龍七師", klass:"軍師", first:"35巻", arc:"魏火竜七師編", status:"戦死",
    tags:["魏","魏火龍","軍略家","呉鳳明の師","身代わり"],
    summary:"呉鳳明の師である冷酷な軍略家。その教え子に身代わりにされて死んだ。",
    detail:[
      {h:"人物", body:"冷酷無慈悲な軍略家で、呉鳳明の師。魏火龍の同士討ちの際は凱孟とともに紫伯に味方し、先王によって表向き病死扱いとされて地下牢に幽閉された。"},
      {h:"思想", body:"戦争とは領土の奪い合いではなく、武将の殺り合いだと考えている。"},
      {h:"最期", body:"十四年ぶりに解放されて著雍戦に参戦。魏軍本陣からの狼煙で陥落を悟り、少数で離脱してきた呉鳳明と合流して形勢逆転の策を示す。しかし直後に信の襲撃に遭うと、教え子である呉鳳明に身代わりにされ、討たれて戦死した。"}
    ],
    battles:["b_chakuyou"],
    rel:[{to:"gohoumei",label:"師（身代わりにされる）"},{to:"shin",label:"討たれる"},{to:"shihaku",label:"味方"},{to:"gaimou",label:"同僚"},{to:"f_gikaryuu",label:"七師"}]
  },
  {
    id:"tairoji", name:"太呂慈", yomi:"たいろじ", kind:"person", state:"魏", group:"魏火龍七師",
    role:"魏火龍七師", klass:"武将", first:"36巻", arc:"魏火竜七師編（回想）", status:"戦死",
    tags:["魏","魏火龍","独占欲","紫季歌"],
    summary:"二十人の妻を不貞の名目で殺した異常者。紫季歌を殺し、紫伯に討たれた。",
    detail:[
      {h:"人物", body:"魏火龍七師の一人。女性に対して異常に独占欲が強く、二十名もの妻を不貞を働いたとして殺害した異常者。"},
      {h:"最期", body:"紫太の計略によって妻となった紫季歌を殺害。火龍の晶仙・馬統を味方につけて紫伯たちを迎え撃つが、紫伯によって討たれた。七師の内乱と十四年の幽閉は、この男から始まっている。"}
    ],
    battles:[],
    rel:[{to:"shihaku",label:"討たれる"},{to:"shikika",label:"殺害"},{to:"f_gikaryuu",label:"七師"}]
  },
  {
    id:"shikika", name:"紫季歌", yomi:"しきか", kind:"person", state:"魏", group:"—",
    role:"紫家の娘", klass:"—", first:"36巻", arc:"魏火竜七師編（回想）", status:"死亡",
    tags:["魏","紫伯","大梁一の美女","悲劇"],
    summary:"紫伯の義妹にして恋人。大梁一の美女と呼ばれ、無理やり嫁がされて殺された。",
    detail:[
      {h:"人物", body:"紫伯の義妹で恋人。幼少期は義兄の紫詠と同様、義父・紫太から愛されず屋敷では虐げられていたが、のちに大梁一の美女と評判を得た。"},
      {h:"最期", body:"義父に無理やり魏火龍七師・太呂慈と結婚させられ、彼を拒絶したことから殺害された。この死が紫伯を暴走させ、魏火龍七師という国の柱を折った。"}
    ],
    battles:[],
    rel:[{to:"shihaku",label:"義兄にして恋人"},{to:"tairoji",label:"殺される"}]
  },
  {
    id:"hakukisai", name:"白亀西", yomi:"はくきさい", kind:"person", state:"魏", group:"魏軍",
    role:"呉慶軍副将 → 魏大将軍", klass:"武将", first:"5巻", arc:"蛇甘平原の戦い〜山陽攻略戦", status:"戦死",
    tags:["魏","凡将","国民に人気","山陽","桓騎"],
    summary:"特に秀でたものはないが国民に親しまれた凡将。命乞いを拒んで桓騎に惨殺された。",
    detail:[
      {h:"人物", body:"呉慶軍副将からのちに魏大将軍。特別何かに秀でたものは無い凡将だが、国民から親しまれていた。"},
      {h:"誰と戦ったか", body:"蛇甘平原編では真ん中の丘に陣取り、呉慶のもとへ駆け付ける途中で王騎に止められて退散。山陽編では、蒙驁率いる秦軍に対し名目上の魏軍総大将となる。"},
      {h:"最期", body:"桓騎軍によって本陣が陥落した際に捕えられるが、総大将としての誇りから命乞いを拒み、桓騎に惨殺された。彼の死を知った廉頗が和睦に踏み切ることになる。"}
    ],
    battles:["b_dakan","b_sanyou"],
    rel:[{to:"gokei",label:"副将"},{to:"kanki",label:"討たれる"},{to:"renpa",label:"名目上の総大将"},{to:"ouki",label:"止められる"}]
  },
  {
    id:"junsou", name:"荀早", yomi:"じゅんそう", kind:"person", state:"魏", group:"凱孟軍",
    role:"凱孟軍将軍", klass:"軍師", first:"36巻", arc:"魏火竜七師編", status:"存命",
    tags:["魏","凱孟","軍師","人質交換","羌瘣"],
    summary:"凱孟軍の頭脳そのもの。羌瘣に人質にされ、河了貂と交換された。",
    detail:[
      {h:"人物", body:"凱孟軍の将軍。常に投げやりな口調で話すが、戦術や兵法に精通しており、凱孟軍の頭脳そのもの。"},
      {h:"人質交換", body:"凱孟からの信頼は厚く、羌瘣に人質に囚われた際もその人命を尊ばれ、河了貂と引き換えに凱孟のもとへ戻された。あの凱孟が部下一人のために取引に応じたという事実そのものが、この男の価値を示している。存命。"}
    ],
    battles:["b_chakuyou"],
    rel:[{to:"gaimou",label:"配下"},{to:"kyoukai",label:"人質にされる"},{to:"tenn",label:"人質交換"}]
  },
  {
    id:"ranbihaku", name:"乱美迫", yomi:"らんびはく", kind:"person", state:"魏", group:"呉鳳明軍",
    role:"呉鳳明傘下将軍", klass:"武将", first:"36巻", arc:"魏火竜七師編〜什虎", status:"存命",
    tags:["魏","狂戦士","鉄仮面","大矛","什虎"],
    summary:"「狂戦士」と呼ばれる鉄仮面の巨漢。味方ごと敵を斬ろうとする見境のなさ。",
    detail:[
      {h:"人物", body:"呉鳳明傘下の将軍で元は霊凰軍所属。「狂戦士」の異名を持つ鉄仮面の巨漢で、得物は大矛。"},
      {h:"誰と戦ったか", body:"著雍編では騰軍を圧倒するも、本陣陥落と霊凰討ち死にによる敗北で撤退。什虎攻めにも従軍し、録嗚未と共に千斗雲軍を挟撃するが、録嗚未もろとも千斗雲を斬ろうとするなど見境がない。"},
      {h:"その後", body:"呉鳳明の命令で一時離脱し、蒙武・騰軍を援護するため満羽・項翼軍の側面を攻めて勝利に貢献した。存命。"}
    ],
    battles:["b_chakuyou","b_jukyo"],
    rel:[{to:"gohoumei",label:"配下"},{to:"reiou",label:"元上官"},{to:"tou",label:"交戦"},{to:"rokuomi",label:"共闘と乱入"},{to:"sentoun",label:"挟撃"}]
  },
  {
    id:"rien", name:"李園", yomi:"りえん", kind:"person", state:"楚", group:"楚朝廷",
    role:"春申君食客 → 楚宰相", klass:"文官", first:"40巻", arc:"愛編〜", status:"存命",
    tags:["楚","宰相","春申君暗殺","媧燐"],
    summary:"春申君を暗殺して宰相の座を得た男。媧燐を宰相に引き入れた。",
    detail:[
      {h:"人物", body:"春申君の食客からのちに楚の宰相。"},
      {h:"王位継承の企て", body:"考烈王と春申君の王位継承の企てに、自身の妹を通じて関わっていた。考烈王の死後に考えを翻した春申君を暗殺する。"},
      {h:"その後", body:"楚を立て直すため、廉頗を通じて媧燐と対談し、共に宰相になるよう嘆願。媧燐とともに宰相となった。存命。"}
    ],
    battles:[],
    rel:[{to:"shunshinkun",label:"暗殺"},{to:"karin",label:"共に宰相"},{to:"renpa",label:"仲介される"},{to:"kouretsuou",label:"共謀"},{to:"f_so",label:"宰相"}]
  },
  {
    id:"kouretsuou", name:"考烈王", yomi:"こうれつおう", kind:"person", state:"楚", group:"楚王族",
    role:"第四十三代 楚王", klass:"王・王族", first:"27巻", arc:"合従軍編〜", status:"崩御",
    tags:["楚","王","面子","跡継ぎ"],
    summary:"とにかく面子を気にする楚王。跡継ぎに恵まれず、王位継承の企てに走った。",
    detail:[
      {h:"人物", body:"第四十三代の楚王。気位が高く激しやすい性格で、とにかく面子を気にしている。"},
      {h:"合従軍", body:"開戦の号令を楚軍が掛けることを要望したり、臨武君・汗明が戦死して楚軍が足を引っ張っている状況に怒りをあらわにしていた。"},
      {h:"最期", body:"跡継ぎに恵まれず、崩御前に、精神に異常のある王弟より李園の妹が産んだ春申君の子を自身の子として次の楚王に即位させるよう、春申君・李園の三人で企てた。その後崩御。この企てが春申君暗殺の伏線になる。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"shunshinkun",label:"宰相"},{to:"rien",label:"共謀"},{to:"kanmei",label:"叱責"},{to:"renpa",label:"厚遇"},{to:"f_so",label:"王"}]
  },
  {
    id:"jukoou", name:"寿胡王", yomi:"じゅこおう", kind:"person", state:"楚", group:"什虎軍",
    role:"楚軍将軍 / 満羽軍軍師", klass:"軍師", first:"56巻", arc:"什虎攻略戦", status:"捕縛",
    tags:["楚","什虎","賢者","荀子","性悪説"],
    summary:"「賢者」と名を馳せる大軍略家。荀子に性悪説を学んだ儒学者でもある。",
    detail:[
      {h:"人物", body:"楚軍の将軍で満羽軍の軍師。元は楚に吸収された亡国の王族。満羽や千斗雲と違い冷静沈着で、十分の一ほどしか手の内を見せずに勝つほどの大軍略家として国内外に「賢者」と名を馳せる。荀子のもとで性悪説などを学んだ儒学者でもある。"},
      {h:"什虎", body:"蒙武軍侵攻時に満羽に従って出陣し本陣で指揮。いつも通りあっけなく終わりそうな戦いに落胆しかけるが、魏軍の援軍襲来で本気の指揮を執る。しかし満羽の異変で本来の指揮が取れず、不利を悟って什虎城への撤退を決断した。"},
      {h:"最期", body:"本陣まで突破した騰に捕縛される。その際、蒙武たちに満羽たちの過去を教えた。騰に自身の斬首を望んだが拒絶され、秦に連行された。"}
    ],
    battles:["b_jukyo"],
    rel:[{to:"manu",label:"軍師"},{to:"tou",label:"捕縛される"},{to:"sentoun",label:"同僚"},{to:"genu",label:"同僚"},{to:"moubu",label:"語る"}]
  },
  {
    id:"bamyuu", name:"バミュウ", yomi:"ばみゅう", kind:"person", state:"楚", group:"媧燐軍",
    role:"媧燐傘下将軍 / 媧燐軍副官", klass:"武将", first:"27巻", arc:"合従軍編〜", status:"存命",
    tags:["楚","媧燐","副官","常識人"],
    summary:"媧燐に理不尽な制裁を受け続ける常識人。だが本人も満更ではない。",
    detail:[
      {h:"人物", body:"媧燐傘下の将軍で媧燐軍副官。ちゃらちゃらした風貌ながら常識人。たびたび媧燐から理不尽な制裁を受けるが、本人も満更ではない様子である。存命。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"karin",label:"副官"},{to:"kaen",label:"同僚"}]
  },
  {
    id:"kaen", name:"媧偃", yomi:"かえん", kind:"person", state:"楚", group:"媧燐軍",
    role:"媧燐傘下将軍", klass:"武将", first:"31巻", arc:"合従軍編", status:"存命",
    tags:["楚","媧燐の弟","一騎討ちに乱入"],
    summary:"姉の命で蒙武の背を貫こうとした媧燐の実弟。蒙恬に阻まれた。",
    detail:[
      {h:"人物", body:"媧燐傘下の将軍で媧燐の実弟。"},
      {h:"合従軍", body:"汗明と蒙武の一騎討ちの際、姉の命で蒙武の背を貫こうとしたが、蒙恬に妨害されて失敗。この横槍が蒙恬の重傷と、蒙武の怒りによる汗明討ち取りにつながった。存命。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"karin",label:"実姉"},{to:"moubu",label:"背後を狙う"},{to:"mouten",label:"阻まれる"},{to:"kanmei",label:"加勢"}]
  },
  {
    id:"gakuki", name:"楽毅", yomi:"がくき", kind:"person", state:"燕", group:"燕軍",
    role:"前・燕大将軍", klass:"武将", first:"27巻", arc:"合従軍編（言及）", status:"故人",
    tags:["燕","軍神","斉","合従軍の先例"],
    summary:"「軍神」。滅亡寸前の燕を復興させ、逆に斉を滅亡寸前まで追い込んだ伝説。",
    detail:[
      {h:"人物", body:"前・燕大将軍で「軍神」の異名を持つ。滅亡寸前の燕を復興させ、逆に斉に対して合従軍を作り上げて滅亡寸前まで追い込んだ伝説的な存在。故人。"},
      {h:"影響", body:"劇辛は楽毅を超えるべく、外聞を気にせず徹底的にその戦術を見て盗んで学んでいた。李牧が起こす合従軍の先例でもある。"}
    ],
    battles:[],
    rel:[{to:"gekishin",label:"目標にされる"},{to:"f_en",label:"大将軍"},{to:"f_gassho",label:"先例"}]
  },
  {
    id:"ouanou", name:"王安王", yomi:"おうあんおう", kind:"person", state:"韓", group:"韓王族",
    role:"第十一代 韓王", klass:"王・王族", first:"75巻", arc:"韓攻略戦", status:"降伏",
    tags:["韓","王","東龍の鐘","降伏","寧姫"],
    summary:"「普通の人」を自称した最後の韓王。娘とともに鐘を鳴らして国を畳んだ。",
    detail:[
      {h:"人物", body:"第十一代の韓王。自らを「王としては普通の人」と称し、一人では何も決断できないと自虐的に語る。公主の寧を溺愛しており、嫁入りの話が出た時は引き籠って泣いていたほど。"},
      {h:"敗戦", body:"新鄭攻略に動き出した秦軍に対し、洛亜完と博王谷を必勝を期して見送った。しかし韓軍の敗北で朝廷が荒れる中、傍観することしかできなかった。"},
      {h:"決断", body:"治安維持軍長官・夏侯龍から国民を死地に向かわせる檄を求められると、一度退席して園庭で寧を待つ。韓を守って国民を死なせるか、国民を守るために韓を滅ぼすかの葛藤を吐露し、降伏を告げる東龍の鐘のことを娘に教えた。そして自らも鐘のもとへ赴き、寧とともに韓滅亡の業を背負う覚悟で鐘を鳴らし、韓の歴史の幕を下ろす。"},
      {h:"その後", body:"心労で白髪となるが、朝廷に戻ると徹底抗戦を叫んで怒り狂う夏侯龍を衛兵に命じて処刑し、張宰相に秦へ統治権を譲る準備を命じた。朝廷に来た騰たちに王冠を下ろして平伏し、降伏した。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"neihime",label:"実娘"},{to:"tou",label:"降伏"},{to:"kakouryuu",label:"処刑を命じる"},{to:"choushi",label:"宰相"},{to:"rakuakan",label:"送り出す"},{to:"f_kan",label:"王"}]
  },
  {
    id:"neihime", name:"寧姫", yomi:"ねいひめ ねい", kind:"person", state:"韓", group:"韓王族",
    role:"韓の公主", klass:"王・王族", first:"70巻", arc:"韓攻略戦", status:"存命",
    tags:["韓","公主","韓非の弟子","東龍の鐘","騰"],
    summary:"韓非を師と仰いだ公主。国を滅ぼす鐘を自ら鳴らし、騰に命を救われた。",
    detail:[
      {h:"人物", body:"韓の公主で、韓非を師と仰いで尊敬している。"},
      {h:"信との出会い", body:"韓非を秦へ招聘しようとする使節団の前に現れ、槍を突き付けて韓非は行かせないと告げた。李信と韓非の問答を見届けた後、翌日に再度現れて韓非を大事にするよう念を押し、同時に中華統一のために韓を滅ぼそうとする李信が嫌いだと告げている。韓非の服毒自殺の報には涙を流した。"},
      {h:"騰との対面", body:"新鄭攻略の最中、密かに戦場近くの森で騰と対面。韓非を死なせたことで平手打ちをするが、騰も守れなかったことを謝罪して受け入れる。無血開城の要求は断固拒否したが、騰に強引に連れられて初めて直に見た戦場の惨状に絶句し、降伏の決断を委ねられた。"},
      {h:"鐘", body:"夏侯龍の暴走で新鄭が血の海になることを危惧し、父から東龍の鐘のことを教わって鳴らしに向かう。決断の重さに躊躇っていたところへ王安王も駆け付け、共に鐘を鳴らした。"},
      {h:"その後", body:"韓滅亡後、歴史と犠牲を踏み躙った罪悪感で憔悴し、城壁の上から投身自殺を図るが、身を挺した騰に救われた。存命。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"kanpishi",label:"師"},{to:"tou",label:"救われる"},{to:"ouanou",label:"実父"},{to:"shin",label:"因縁"},{to:"rakuakan",label:"仲裁"}]
  },
  {
    id:"rakuakan", name:"洛亜完", yomi:"らくあかん", kind:"person", state:"韓", group:"洛亜完軍",
    role:"韓軍第一将", klass:"武将", first:"70巻", arc:"韓攻略戦", status:"戦死",
    tags:["韓","第一将","凶星","月光","騰"],
    summary:"騰と渡り合った韓最後の名将。「凶星」と呼ばれた英傑。",
    detail:[
      {h:"人物", body:"韓軍第一将。上から見通しているかのような戦術眼と、騰とも渡り合えるほどの武勇を持つ知勇兼備の将。配下に精鋭の直下兵団「月光」を有する。"},
      {h:"凶星", body:"二十数年前、韓へ侵略してきた趙・魏を、千人将になったばかりの洛亜完と博王谷が悉く打ち破って韓を守り、二人は「凶星」と呼ばれた英傑である。"},
      {h:"英呈平原", body:"騰と李信率いる秦軍を迎え撃つべく博王谷とともに十九万を率いて出陣。相手の短期決戦の狙いを見抜き、ヨコヨコを李信に向かわせ、突出した騰軍を各個撃破で苦しめた。しかし殲滅したはずの干央が陣を突破して迫り、その動揺の隙に騰・録嗚未にも迫られて劣勢に。博王谷討ち死にの報を受けて退却を決断した。"},
      {h:"最期", body:"東砂平原の第二戦にも敗れて新鄭へ撤退。王と公主が鐘を鳴らして降伏を決めた後、納得しない将兵とともに西の門で騰軍と対峙するが、寧姫もろとも突撃しようとする兵を制止し、立て直しを名目に一部の手勢と蘭城へ向かう。その後、討伐に来た録嗚未軍と交戦して全滅した。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"tou",label:"渡り合う"},{to:"hakuoukoku",label:"盟友"},{to:"yokoyoko",label:"副官"},{to:"rokuomi",label:"討たれる"},{to:"kan'ou",label:"突破される"},{to:"neihime",label:"守る"}]
  },
  {
    id:"yokoyoko", name:"ヨコヨコ", yomi:"よこよこ", kind:"person", state:"韓", group:"洛亜完軍",
    role:"洛亜完の副官 → 旧韓軍の将", klass:"武将", first:"75巻", arc:"韓攻略戦〜", status:"存命",
    tags:["韓","最強の武","異民族","洛亜完","旧韓軍"],
    summary:"韓軍最強の武を誇る異民族の豪傑。今は秦軍の一角として趙と戦っている。",
    detail:[
      {h:"人物", body:"洛亜完の副官。被り物を被った長身の異民族の男で、異様な見かけに反して理知的な言動をする。韓軍最強の武を誇り、凱孟に匹敵するほどの武勇を持つ。素顔は逞しく整っている。"},
      {h:"忠誠の理由", body:"かつては旧い血筋のせいで妻子とともに迫害を受けていたところを洛亜完に保護される。妻と子が亡くなった時に手厚く葬られたことで、洛亜完に忠誠を誓った。"},
      {h:"誰と戦ったか", body:"英呈平原では洛亜完の指示で飛信隊に急襲をかけ、博王谷たちとともに李信を仕留めようとするが、田有たちと蒼兄弟に阻まれる。その間に博王谷が討たれ、立て直し不可能と悟って退却を進言し、自ら殿軍を担った。"},
      {h:"その後", body:"洛亜完が蘭城へ向かう際、残る韓軍の面倒を託される。全面戦争では秦軍の一角として五万の旧韓軍を率い、飛信隊の左翼の将として趙忽軍と対峙している。存命。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"rakuakan",label:"忠誠"},{to:"shin",label:"共闘へ"},{to:"denyuu",label:"阻まれる"},{to:"soujin",label:"阻まれる"},{to:"hakuoukoku",label:"共闘"}]
  },
  {
    id:"hakuoukoku", name:"博王谷", yomi:"はくおうこく", kind:"person", state:"韓", group:"博王谷軍",
    role:"韓軍第二将", klass:"武将", first:"75巻", arc:"韓攻略戦", status:"戦死",
    tags:["韓","第二将","凶星","豪将","信"],
    summary:"洛亜完と並ぶ「凶星」の片割れ。李信との一騎討ちに敗れた。",
    detail:[
      {h:"人物", body:"韓軍第二将で軍人気質の豪将。二十数年前、洛亜完とともに趙・魏の侵略から韓を守った英傑で、二人合わせて「凶星」と呼ばれた。"},
      {h:"南陽", body:"秦軍侵攻の際は南陽の防衛を担当していたが、飛信隊六万とその後続の騰軍十万、さらに後ろに十万という報告を受けた韓王の命で、七万を率いて新鄭まで撤退した。"},
      {h:"最期", body:"翌年、洛亜完とともに出陣して英呈平原で飛信隊と対峙。短期決戦を仕掛けてきた李信を集中的に狙って仕留めようとするが、一騎討ちの末に討ち取られ戦死した。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"rakuakan",label:"盟友"},{to:"shin",label:"討たれる"},{to:"yokoyoko",label:"共闘"}]
  },
  {
    id:"choushi", name:"張氏", yomi:"ちょうし", kind:"person", state:"韓", group:"韓朝廷",
    role:"韓の宰相", klass:"文官", first:"70巻", arc:"韓攻略戦", status:"存命",
    tags:["韓","宰相","賢者","張良の血縁"],
    summary:"中華で賢者と名高い韓の宰相。長年韓軍総司令を務めた名軍師。",
    detail:[
      {h:"人物", body:"韓の宰相。中華で賢者と名高い賢臣で、長年にわたって韓軍総司令を務めた名軍師。政の戴冠式にも参加している。前漢三傑の一人・張良の血縁者。"},
      {h:"最後の判断", body:"洛亜完たちの出陣後に訪れた南陽の使者・条世からの無血開城の勧告を一蹴した。しかし英呈平原の敗北と博王谷の戦死で重臣たちの混乱を抑えきれず、鎮静化のため治安維持軍の夏侯龍に強権を与えるが、想像以上の暴走で手に負えなくなる。王安王の降伏後、秦へ統治権を譲る準備を命じられた。存命。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"ouanou",label:"仕える"},{to:"kakouryuu",label:"強権を与える"},{to:"ryuuan",label:"評価"},{to:"f_kan",label:"宰相"}]
  },
  {
    id:"kakouryuu", name:"夏侯龍", yomi:"かこうりゅう", kind:"person", state:"韓", group:"韓朝廷",
    role:"新鄭 治安維持軍長官", klass:"武将", first:"76巻", arc:"韓攻略戦", status:"処刑",
    tags:["韓","治安維持","暴走","強制徴兵"],
    summary:"国家防衛のためなら手段を選ばない男。五歳以上を民兵にする徴兵令を出した。",
    detail:[
      {h:"人物", body:"新鄭の治安維持軍長官。国家防衛のためなら過激な手段も厭わない冷酷な男。"},
      {h:"暴走", body:"韓軍の大敗で荒れる新鄭を鎮めるため張宰相から強権を与えられると、降伏を唱える者を捕らえ、逃げようとする者を処刑して見せしめにした。さらに新鄭にいる動ける五歳以上の者すべてを民兵とする強制徴兵令を発するなど暴走を始める。"},
      {h:"最期", body:"王と寧姫が降伏を決断した時は怒り狂い、戻ってきた王安王を反逆者として処刑するよう衛兵に命じたが、逆に王安王の命を受けた衛兵に処刑された。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"choushi",label:"強権を得る"},{to:"ouanou",label:"処刑される"},{to:"neihime",label:"暴走が引き金"}]
  },
  {
    id:"ryuuan", name:"龍安", yomi:"りゅうあん", kind:"person", state:"韓", group:"南陽",
    role:"南陽城主", klass:"文官", first:"75巻", arc:"韓攻略戦", status:"存命",
    tags:["韓","南陽","無血開城","融和"],
    summary:"朝廷に見捨てられても恨まず民に残った城主。秦との融和の起点になった男。",
    detail:[
      {h:"人物", body:"南陽の城主。張宰相から韓の城主の中でも最も優秀だと評されている。"},
      {h:"南陽開城", body:"朝廷が南陽の放棄を決定した時も朝廷を恨まず、他の臣下たちに脱出を促し、自らは留まることを決めた。無血開城後も降伏の意志を示したことで騰から丁重な立場に置かれる。"},
      {h:"その後", body:"新長官・剛京が反乱を未然に防ぐため処刑しようとしたが、騰と隆国が咸陽の判断を仰ぐことにした結果、処刑は中止され、以降は剛京の補佐を務めた。秦と韓の民が共存する南陽の現状が、周辺小城からの出兵を抑える材料になっている。存命。"}
    ],
    battles:["b_shintei"],
    rel:[{to:"tou",label:"庇われる"},{to:"ryuukoku",label:"仲裁される"},{to:"choushi",label:"評価される"}]
  },
  {
    id:"chouin", name:"張印", yomi:"ちょういん", kind:"person", state:"韓", group:"成恢軍",
    role:"成恢傘下将軍 → 韓軍総大将代理", klass:"武将", first:"31巻", arc:"合従軍編〜韓攻略戦", status:"存命",
    tags:["韓","合従軍","東龍の門","開門"],
    summary:"合従軍では影の薄い代理総大将。韓の最後には自ら門を開いた。",
    detail:[
      {h:"人物", body:"成恢傘下の将軍で、成恢の後任として韓軍総大将代理を務めた。他国の総大将たちの前では気圧されており、媧燐に絡まれていた。秦六将復活の際に楚へ使者として訪れたが、媧燐には忘れられていた。"},
      {h:"最後の役目", body:"韓攻略編では新鄭の東の門（東龍の門）の守備に就いており、東龍の鐘のことを知っていた。王安王と寧姫が鐘を鳴らして降伏を決めた時は、韓の滅亡を悔やみつつも民を守ったと受け入れ、自ら門を開いた。騰に王の降伏を伝え、混乱する城内の鎮静化に奔走している。存命。"}
    ],
    battles:["b_kankoku","b_shintei"],
    rel:[{to:"seikai",label:"配下"},{to:"tou",label:"開門"},{to:"ouanou",label:"仕える"},{to:"karin",label:"絡まれる"}]
  },
  {
    id:"oukenou", name:"王建王", yomi:"おうけんおう", kind:"person", state:"斉", group:"斉王族",
    role:"第八代 斉王", klass:"王・王族", first:"27巻", arc:"合従軍編〜", status:"存命",
    tags:["斉","王","蛇","蔡沢","法治国家"],
    summary:"口に蛇を咥えた斉王。政の「法治国家」という答えに、事実上の降伏を告げた。",
    detail:[
      {h:"人物", body:"第八代の斉王。常に口に蛇を咥えている癖があり、あけすけな物言いを好み、戦争を大金を得るための仕事と断言する。蔡沢とは若い時からの関係で、苦しい時に何度も助けられた恩を感じている。昌平君からは、合従軍を起こせる数少ない人物の一人として警戒されていた。"},
      {h:"合従軍", body:"動きこそ見せたが、蔡沢の説得と交渉に応えて合従軍への参戦を中止。その後、函谷関から撤退して腹いせに攻めてきた合従軍を迎撃した。参戦をやめた本当の理由は、秦を滅ぼした後の世が見るに耐えない汚濁になることを避けるためだった。"},
      {h:"咸陽での会談", body:"黒羊戦後、蔡沢の手引きで極秘に李牧とともに単身咸陽を訪れ、政と会談する。中華統一後の統治のあり方を問い、返答次第では李牧と共に合従軍を起こして秦を滅ぼすと告げたが、政の「法治国家」という答えに感嘆し、事実上の降伏宣言をした。対談を見届けて息を引き取った蔡沢の亡骸に、自分が代わりに結末を見届けると誓っている。"},
      {h:"その後", body:"鄴編では、秘かに昌平君から相場の倍の値で買われた兵糧を黄河を渡って王翦軍に届けた。「秦が倍で買うというのだから売らぬ手はない」と満足している。存命。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"saitaku",label:"旧知"},{to:"sei",label:"会談"},{to:"riboku",label:"同行"},{to:"shouheikun",label:"警戒される"},{to:"f_sei",label:"王"}]
  },
  {
    id:"ganshu", name:"顔聚", yomi:"がんしゅ", kind:"person", state:"斉", group:"顔聚軍",
    role:"斉将軍 → 趙の将軍", klass:"武将", first:"27巻", arc:"合従軍編〜全面戦争編", status:"存命",
    tags:["斉","趙","反旗","額の三日月","全面戦争"],
    summary:"王建の静観を不服として趙へ走った斉の将。今は趙軍として録嗚未と対峙する。",
    detail:[
      {h:"人物", body:"斉の将軍で、額に三日月の刺青をしている。"},
      {h:"転向", body:"合従軍編では名前のみの登場で、王建王から田赫とともに、函谷関から引き返して斉へ攻めてきた合従軍の迎撃を命じられた。しかし王建王が静観を決めたことを不服とし、反旗を翻して趙へ赴く。"},
      {h:"その後", body:"全面戦争の直前には趙の将軍として趙忽と共に軍議に参加。全面戦争では自軍を率いて録嗚未軍と対峙している。存命。"}
    ],
    battles:["b_kankoku"],
    rel:[{to:"oukenou",label:"反旗"},{to:"riboku",label:"合流"},{to:"rokuomi",label:"対峙"},{to:"f_sei",label:"元・斉将"}]
  },
  {
    id:"reijukou", name:"霊咒公", yomi:"れいじゅこう", kind:"person", state:"代", group:"代軍",
    role:"代 第一将", klass:"武将", first:"78巻", arc:"全面戦争編", status:"存命",
    tags:["代","援軍","玉鳳軍"],
    summary:"代からの援軍として趙の軍議に参加した第一将。玉鳳軍と対峙する。",
    detail:[
      {h:"人物", body:"代の第一将。全面戦争の直前、代からの援軍として趙の軍議に参加した。"},
      {h:"その後", body:"全面戦争では自軍を率いて玉鳳軍と対峙している。存命。"}
    ],
    battles:[],
    rel:[{to:"riboku",label:"援軍"},{to:"ouhon",label:"対峙"},{to:"f_dai",label:"第一将"}]
  },
  {
    id:"dant", name:"ダント", yomi:"だんと", kind:"person", state:"山界", group:"フィゴ族",
    role:"フィゴ族族長", klass:"山の民", first:"53巻", arc:"鄴編〜", status:"存命（重傷）",
    tags:["山界","フィゴ王","大矛","楊端和に惚れる","青華雲"],
    summary:"「フィゴ王」と呼ばれる猛将。楊端和に惚れ込んで従軍している巨漢。",
    detail:[
      {h:"人物", body:"フィゴ族の族長で得物は大矛。カプロという鷹をペットにしている。下ネタを好み、タジフ並の巨漢で、周囲から「フィゴ王」と呼ばれる猛将。かつては楊端和と幾度も死闘を繰り広げたが、今は彼女に惚れ込み、自分に惚れさせることを狙って従軍している。"},
      {h:"橑陽", body:"九日目にトアク軍と対峙し、常に先陣に立って自軍の兵の半数を失いながら犬戎将軍・トアクを瞬殺。その後、端和救出の際にはロゾ軍と趙軍に遭遇し、舜水樹にわざと策の全貌を伝えて趙軍を戦場から離脱させ、ロゾとの一騎討ちでは自らを囮にして壁を援護し、ロゾ討伐の一助を成した。"},
      {h:"その後", body:"全面戦争では中華十弓一位・青華雲の狙撃で首を射抜かれて倒れ、部下に「恐ろしい弓使いがいる」と楊端和へ知らせるよう伝えた。"}
    ],
    battles:["b_ryouyou","b_gyou","b_bango"],
    rel:[{to:"youtanwa",label:"惚れ込む"},{to:"rozo",label:"一騎討ち"},{to:"heki",label:"援護"},{to:"seikaun",label:"射抜かれる"},{to:"shunsuiju",label:"策を告げる"}]
  },
  {
    id:"kitari", name:"キタリ", yomi:"きたり", kind:"person", state:"山界", group:"メラ族",
    role:"メラ族族長", klass:"山の民", first:"53巻", arc:"鄴編〜", status:"存命",
    tags:["山界","メラ族","曲剣","カタリの妹","壁"],
    summary:"兄を失って族長を継いだ女戦士。ブネンを瞬殺して仇を討った。",
    detail:[
      {h:"人物", body:"メラ族の族長で、二振りの曲剣を得物とするカタリの妹。勇猛な女戦士で、兄と違って秦国の言葉は流暢に話せず、血気盛んで毒舌。"},
      {h:"仇討ち", body:"橑陽戦では壁軍と共にブネン軍と対峙。カタリを失って激高し単騎突貫するが、討ち死に寸前で壁に救われた。復活後は当初壁に激高したものの、役割を思い出してメラ族族長を継承。ブネン軍を追撃してブネンを瞬殺し、仇を討った。"},
      {h:"番吾", body:"頭佐平原戦で敵軍を抜けて、壁たちが囚われている番吾へ急行。城壁を乗り越えて脱走中の壁たちを発見し、救出して番吾を脱出した。存命。"}
    ],
    battles:["b_ryouyou","b_gyou","b_bango"],
    rel:[{to:"katari",label:"実兄"},{to:"heki",label:"救われ、救う"},{to:"youtanwa",label:"側近"}]
  },
  {
    id:"katari", name:"カタリ", yomi:"かたり", kind:"person", state:"山界", group:"メラ族",
    role:"メラ族前族長", klass:"山の民", first:"53巻", arc:"鄴編（橑陽）", status:"戦死",
    tags:["山界","メラ族","曲剣","温和","ブネン"],
    summary:"山民族では珍しく温和で礼儀正しい青年。ブネンに味方ごと刺された。",
    detail:[
      {h:"人物", body:"メラ族の前族長で得物は曲剣。妹のキタリと共に楊端和の側近を務めていた。秦国の言葉も話せる有能な青年で、山民族では珍しく温和で礼儀正しく冷静な性格。"},
      {h:"最期", body:"橑陽戦では壁軍と共にブネン軍と対峙するが、ジリたちに纏わりつかれたところを犬戎将軍・ブネンに彼らごと刺され、致命傷を受けて戦死した。"}
    ],
    battles:["b_ryouyou","b_gyou"],
    rel:[{to:"kitari",label:"実妹"},{to:"youtanwa",label:"側近"},{to:"heki",label:"共闘"}]
  },
  {
    id:"enpo", name:"エンポ", yomi:"えんぽ", kind:"person", state:"山界", group:"猿手族",
    role:"猿手族族長", klass:"山の民", first:"55巻", arc:"鄴編（橑陽）", status:"存命",
    tags:["山界","猿手族","壁登り","橑陽城"],
    summary:"「壁を走る者」。橑陽城を一夜で落とした猿手族の老族長。",
    detail:[
      {h:"人物", body:"猿手族の族長で、「壁を走る者」と言われる猿手族随一の壁登りの達人。小柄な老人だが、周囲から「エンポじぃ」と呼ばれ一目置かれる老将。端和を「マンタンワ」と間違えて呼ぶ。"},
      {h:"橑陽城", body:"端和から橑陽攻略の特命を受け、猿手族を率いて城を一夜で陥落させた。楊端和が自らを囮にした裏で成立した、この作戦の実行者である。存命。"}
    ],
    battles:["b_ryouyou","b_gyou"],
    rel:[{to:"youtanwa",label:"特命を受ける"},{to:"rozo",label:"城を落とす"},{to:"shunsuiju",label:"敗北させる"}]
  },

  /* ───────────── 追加: 戦い・勢力（追加分） ───────────── */
  {
    id:"b_chouhei", name:"長平の戦い", yomi:"ちょうへいのたたかい", kind:"battle", state:"秦 vs 趙", group:"対趙戦（過去）",
    role:"秦の勝利（趙兵四十万を生き埋め）", klass:"戦い", first:"18巻", arc:"回想", status:"決着",
    tags:["白起","趙括","四十万","万極","憎悪の起点"],
    summary:"投降した趙兵四十万を生き埋めにした戦い。作中すべての対趙戦の前提。",
    detail:[
      {h:"構図", body:"秦の総大将は六将筆頭・白起。趙は当初、廉頗が守りに徹して膠着させていたが、王命で趙奢の息子・趙括に総大将が挿げ替えられる。"},
      {h:"何が起きたか", body:"趙括は王騎に討たれ、趙軍は壊滅。投降した趙兵四十万人を、白起は全員生き埋めにするという決断を下した。"},
      {h:"残したもの", body:"この一件が趙の対秦感情を決定づけた。万極は父と兄とともに生き埋めにされて自力で這い上がった生存者であり、その憎悪が「特攻の万極」を作る。人質として趙にいた幼い政が虐げられた理由でもある。"},
      {h:"位置づけ", body:"作中では回想でしか描かれないが、趙という国が秦に向ける憎悪の全量がここから発している。"}
    ],
    battles:[],
    rel:[{to:"hakuki",label:"総大将"},{to:"choukatsu",label:"敵総大将"},{to:"ouki",label:"参戦"},{to:"renpa",label:"更迭される"},{to:"bankyoku",label:"生存者"},{to:"f_chou",label:"対戦国"}]
  },
  {
    id:"b_choen", name:"趙燕戦争（劇辛の最期）", yomi:"ちょうえんせんそう", kind:"battle", state:"趙 vs 燕", group:"他国間の戦い",
    role:"趙の勝利", klass:"戦い", first:"25巻", arc:"合従軍編（回想）", status:"決着",
    tags:["李牧","龐煖","劇辛","燕","武神"],
    summary:"李牧が龐煖を総大将に据えて燕を叩いた戦い。龐煖が劇辛を討った。",
    detail:[
      {h:"構図", body:"馬陽の後、宰相となった李牧が龐煖を総大将に据えて燕へ侵攻。燕は救国の英雄・劇辛が迎え撃つ。"},
      {h:"劇辛という男", body:"劇辛は元々趙人で、金目当てで燕へ移住した。蔡沢からは「趙に居れば三大天の一人になっていた」と評されている。若い頃に『武神』を称する者を何人も倒した武勇の持ち主で、楽毅を超えるべくその戦術を徹底的に盗んで学んでいた。"},
      {h:"決着", body:"劇辛は李牧の策略を見破って本陣にまで迫るが、龐煖との一騎討ちで想像を超える力に敵わず、「偽者」と言い捨てられて討たれた。趙は圧勝する。"},
      {h:"意味", body:"王騎を討ってなお納得できなかった龐煖が、修行の迷いのまま引き受けた戦い。彼が求める『答え』が武勇の高さでは埋まらないことを示す一戦でもある。"}
    ],
    battles:[],
    rel:[{to:"riboku",label:"立案"},{to:"houken",label:"総大将"},{to:"gekishin",label:"討たれる"},{to:"gakuki",label:"目標とされた"},{to:"f_en",label:"敗戦国"}]
  },
  {
    id:"b_aikoku", name:"嫪毐の乱（咸陽攻防戦）", yomi:"ろうあいのらん かんようこうぼうせん", kind:"battle", state:"秦（内乱）", group:"内乱",
    role:"政の勝利（毐国の壊滅）", klass:"戦い", first:"38巻", arc:"愛編", status:"決着",
    tags:["毐国","趙姫","嫪毐","昌平君","呂不韋"],
    summary:"太后が作った国が咸陽へ攻め上る内乱。政が親政を掴む最後の関門。",
    detail:[
      {h:"構図", body:"太后・趙姫が嫪毐を旗頭に太原一帯で「毐国」の建国を宣言。国としての体裁を整える前に、楚の間諜・虎歴が趙姫と嫪毐の子二人を人質に取って造反へ追い込み、毐国軍は咸陽へ進軍する。"},
      {h:"戦い", body:"総指揮はワテギ（戎籊公）。昌平君が迎撃し、包雷を見抜いたワテギを最後は自ら討ち取る。樊琉期は後宮に侵入して向たちを狙うが、駆け付けた信に右腕を切断されて捕縛された。"},
      {h:"母と子", body:"鎮圧後、嫪毐は反乱をすべて自らの計画として趙姫を庇い通し、車裂きの刑に処された。趙姫は雍に軟禁されながらも助命され、嫪毐との子二人も政によって密かに逃される。この過程で、政と趙姫は母子の繋がりを取り戻した。"},
      {h:"結果", body:"呂不韋は責任を問われて相国の座を失い、政の親政が確立する。秦は初めて『一人の王が決める国』になった。"}
    ],
    battles:[],
    rel:[{to:"sei",label:"勝者"},{to:"rouai",label:"旗頭"},{to:"taigo",label:"首謀"},{to:"shouheikun",label:"鎮圧"},{to:"wategi",label:"敵総指揮"},{to:"shin",label:"参戦"},{to:"ryofui",label:"失脚"},{to:"f_ai",label:"敵勢力"}]
  },
  {
    id:"b_ryouyou", name:"橑陽の戦い", yomi:"りょうようのたたかい", kind:"battle", state:"山界 vs 趙", group:"鄴編の側面戦",
    role:"山の民の勝利（橑陽陥落）", klass:"戦い", first:"53巻", arc:"鄴編", status:"決着",
    tags:["楊端和","舜水樹","ロゾ","犬戎","猿手族","壁"],
    summary:"鄴攻略の側面で行われた山の民と犬戎族の九日間。楊端和が自らを囮にした。",
    detail:[
      {h:"構図", body:"鄴攻略の一翼として、楊端和率いる山民族軍が趙北西の橑陽を攻める。趙側は李牧の命で舜水樹が橑陽軍総大将となり、橑陽城主で犬戎族の王・ロゾを嗾けて山の民にぶつけた。"},
      {h:"犬戎の戦い方", body:"ロゾは恐怖だけで軍を支配し、味方ごと敵を討つ策を常用する。将兵の家族はすべて人質。バジオウ・タジフ・シュンメンらが血みどろの消耗戦を強いられ、メラ族のカタリが討たれる。"},
      {h:"九日目の逆転", body:"舜水樹は九日目に楊端和を追い詰めたが、それは彼女が自らを囮にした裏で、猿手族のエンポが一夜で橑陽城を落とすための時間だった。城を失ったロゾはダントとの一騎討ちの隙を突かれ、壁に討たれる。"},
      {h:"結果", body:"橑陽陥落。楊端和は犬戎族を配下に組み込み、舜水樹は生涯の雪辱として番吾までこの敗戦を引きずる。"}
    ],
    battles:[],
    rel:[{to:"youtanwa",label:"総大将"},{to:"shunsuiju",label:"敵総大将"},{to:"rozo",label:"敵将"},{to:"heki",label:"参戦"},{to:"bajio",label:"参戦"},{to:"enpo",label:"城を落とす"},{to:"katari",label:"戦死"},{to:"kitari",label:"仇を討つ"},{to:"dant",label:"参戦"}]
  },
  {
    id:"b_heiyou", name:"平陽・武城攻略戦（影丘の戦い）", yomi:"へいよう・ぶじょうこうりゃくせん かげおか", kind:"battle", state:"秦 vs 趙", group:"対趙戦",
    role:"秦の勝利（扈輒討ち死に）", klass:"戦い", first:"62巻", arc:"六大将軍復活編", status:"決着",
    tags:["六大将軍","桓騎","扈輒","影丘","十万人斬り","雷土"],
    summary:"復活した六大将軍の初陣。桓騎が扈輒を討ち、降兵十万を斬った戦い。",
    detail:[
      {h:"構図", body:"六大将軍が復活し、桓騎が趙の平陽・武城の攻略を担う。趙側は「邯鄲の守護神」扈輒。桓騎軍の下に王賁の玉鳳軍と信の飛信隊が入り、最大の難所・影丘の攻略を命じられる。"},
      {h:"影丘", body:"扈輒側近の三公――岳白・龍白・虎白が三方を固める。王賁は難所攻めで意識不明の重体となり、駆け付けた飛信隊に救われ、目を覚ますと怪我を押して攻め所を教えた。信が岳白を討ち、亜花錦が本陣を急襲して紀章を討つ。"},
      {h:"雷土", body:"龍白の息子・曹還を捕らえて惨殺した雷土は、その報いとして捕らわれ、扈輒によって凄惨な拷問を受ける。桓騎軍が最も深く傷ついた戦いでもある。"},
      {h:"十万人斬り", body:"本陣を急襲された扈輒は朱摩・桓騎に追い込まれて討ち死に。首は晒され、総大将討ち死にと敵援軍の虚報で数万の扈輒兵が降伏したが、桓騎はその捕虜をすべて処刑した。政は激怒し、桓騎を斬首しかけている。"},
      {h:"結果", body:"平陽・武城は陥落。だが『どう勝つか』を巡る信と桓騎、そして政と桓騎の断絶が決定的になる。"}
    ],
    battles:[],
    rel:[{to:"kanki",label:"総大将"},{to:"kochou",label:"敵総大将"},{to:"shin",label:"参戦"},{to:"ouhon",label:"参戦"},{to:"gakuhaku",label:"戦死"},{to:"ryuuhaku",label:"戦死"},{to:"raido",label:"拷問死"},{to:"shuma",label:"参戦"},{to:"sei",label:"激怒"},{to:"f_kanki",label:"主力"}]
  },
  {
    id:"b_jukyo", name:"什虎攻略戦", yomi:"じゅうここうりゃくせん", kind:"battle", state:"秦・魏 vs 楚", group:"三国戦",
    role:"秦・魏の勝利（什虎制圧）", klass:"戦い", first:"56巻", arc:"三国戦", status:"決着",
    tags:["蒙武","騰","満羽","呉鳳明","三年同盟","什虎"],
    summary:"秦が魏と組んで楚の要衝を落とした異例の三国戦。蒙武と満羽が激突する。",
    detail:[
      {h:"構図", body:"秦は魏に三年同盟を持ちかけ、楚の什虎を譲るという条件で参戦させる。蒙武が三万で侵攻し、魏の返答を待たずに開戦。什虎側は城主・満羽と千斗雲、軍師・寿胡王、玄右という亡国出身の集団。"},
      {h:"什虎軍の正体", body:"満羽は楚に吸収された小国・汨の大将軍で、王の勝手な降伏によって帰る場所を失い、かつての同胞と戦わされて精神が壊れた男。千斗雲も同様の過去を持つ。楚への忠誠心は皆無で、郢から離れた什虎を根城にしていた。"},
      {h:"戦い", body:"魏軍が援軍に到着して仕切り直した後、蒙武・騰が満羽・項翼軍と対峙。乱美迫の助攻を得て突撃し、蒙武は近衛兵団『迅戈』を撃破して満羽と一騎討ちに入る。並行して騰が本陣を落とし、寿胡王を生け捕りにした。"},
      {h:"結果", body:"本陣陥落により什虎軍は撤退し、呉鳳明の別動隊が什虎城を制圧。蒙武と満羽は決着をつけないまま再戦を誓う。この功で蒙武は六大将軍第一将、騰は第二将となる。"}
    ],
    battles:[],
    rel:[{to:"moubu",label:"総大将"},{to:"tou",label:"参戦"},{to:"manu",label:"敵将"},{to:"sentoun",label:"敵将"},{to:"jukoou",label:"捕縛"},{to:"gohoumei",label:"同盟軍"},{to:"kouyoku",label:"敵将"},{to:"rokuomi",label:"参戦"},{to:"mouki",label:"軍師"}]
  },
  {
    id:"f_sei", name:"斉", yomi:"せい", kind:"faction", state:"斉", group:"七国",
    role:"中華東方の商業国", klass:"勢力", first:"27巻", arc:"—", status:"—",
    tags:["国","七国","商業","王建","蔡沢"],
    summary:"戦争を「金を得る仕事」と割り切る東方の大国。合従軍に参加しなかった国。",
    detail:[
      {h:"位置づけ", body:"中華東端の大国。かつて楽毅の合従軍に滅亡寸前まで追い込まれた過去を持ち、以後は戦より商いを選ぶ姿勢を貫いている。"},
      {h:"合従軍での選択", body:"合従軍への参加を蔡沢の説得で取りやめ、逆に撤退してきた合従軍を迎撃した。参加をやめた本当の理由は、秦を滅ぼした後の中華が見るに耐えない汚濁になることを避けるためだった。"},
      {h:"秦との関係", body:"王建は李牧とともに極秘で咸陽を訪れ、政に統一後の統治のあり方を問う。政の『法治国家』という答えに感嘆し、事実上の降伏を告げた。鄴編では倍値で秦へ兵糧を売っている。"}
    ],
    rel:[{to:"oukenou",label:"王"},{to:"ganshu",label:"離反した将"},{to:"saitaku",label:"秦との窓口"}]
  },
  {
    id:"f_dai", name:"代", yomi:"だい", kind:"faction", state:"代", group:"その他勢力",
    role:"趙北方の勢力", klass:"勢力", first:"78巻", arc:"全面戦争編", status:"—",
    tags:["代","援軍","趙"],
    summary:"全面戦争で趙に援軍を出した北方の勢力。太子嘉の落ち行く先でもある。",
    detail:[
      {h:"位置づけ", body:"趙の北方に位置する勢力。全面戦争では第一将・霊咒公が援軍として趙の軍議に参加し、玉鳳軍と対峙している。"},
      {h:"太子嘉との縁", body:"遷一派に追われた太子嘉は、史実では代へ落ち延びて代王を名乗ることになる。趙が滅んだ後の受け皿という位置づけ。"}
    ],
    rel:[{to:"reijukou",label:"第一将"},{to:"ka",label:"縁"},{to:"f_chou",label:"援軍"}]
  },
  {
    id:"f_ai", name:"毐国", yomi:"あいこく", kind:"faction", state:"秦", group:"内乱勢力",
    role:"太后が太原に作った国", klass:"勢力", first:"37巻", arc:"愛編", status:"壊滅",
    tags:["毐国","趙姫","嫪毐","太原","趙高"],
    summary:"太后・趙姫が太原一帯に宣言した国。体裁が整う前に反乱へ追い込まれた。",
    detail:[
      {h:"成り立ち", body:"呂不韋が太后との関係を断ち切るために送り込んだ嫪毐と、趙姫の間に二人の子が生まれる。趙姫は嫪毐を山陽長官に任じさせ、太原一帯に兵民を集めて『毐国』の建国を宣言した。"},
      {h:"構造", body:"嫪毐は旗頭にすぎず、実務は宦官・趙高が担っていた。国としての体裁を整える前に、楚の間諜・虎歴が趙姫と嫪毐の子を人質に取って造反へ追い込む。"},
      {h:"最期", body:"咸陽攻防戦で昌平君に鎮圧され壊滅。嫪毐は車裂き、樊琉期は処刑、趙高は蜀へ流刑となった。この乱の後始末として呂不韋は失脚し、政の親政が始まる。"}
    ],
    rel:[{to:"taigo",label:"首謀"},{to:"rouai",label:"旗頭"},{to:"choukou",label:"実務"},{to:"wategi",label:"総指揮"},{to:"hanoki",label:"将軍"},{to:"f_shin",label:"反乱"}]
  },
  {
    id:"f_kenjuu", name:"犬戎族", yomi:"けんじゅうぞく", kind:"faction", state:"趙", group:"異民族",
    role:"橑陽を治めた異民族", klass:"勢力", first:"53巻", arc:"鄴編", status:"山界に併合",
    tags:["犬戎","橑陽","ロゾ","恐怖支配"],
    summary:"恐怖だけで統率された橑陽の異民族。敗北後は山の民に組み込まれた。",
    detail:[
      {h:"位置づけ", body:"趙北西の橑陽城を治める異民族。王のロゾは将兵の家族をすべて人質に取り、失敗した者は家族もろとも処刑するという恐怖で軍を支配していた。"},
      {h:"戦い方", body:"敵を味方もろとも討つ策を、奇策ではなく通常の策として用いる。ゴバ・ブネン・トアクというロゾの血族が実働を担った。"},
      {h:"その後", body:"橑陽戦で山民族軍に敗れ、楊端和が配下に組み込んだ。以後は山の民の一角として秦側で戦うことになる。"}
    ],
    rel:[{to:"rozo",label:"王"},{to:"youtanwa",label:"配下となる"},{to:"shunsuiju",label:"嗾けられる"},{to:"f_sankai",label:"併合"}]
  },
  {
    id:"f_rinke", name:"藺家十傑", yomi:"りんけじっけつ", kind:"faction", state:"趙", group:"趙軍",
    role:"藺相如が「武」を託した十将", klass:"勢力", first:"52巻", arc:"鄴編", status:"事実上消滅",
    tags:["藺相如","尭雲","趙峩龍","雷雲","土雀"],
    summary:"藺相如が自分に足りない「武」を担わせるために揃えた十人の将。",
    detail:[
      {h:"成り立ち", body:"旧・趙三大天の藺相如は、智と勇に長ける代わりに武を持っていなかった。それを担わせるために配下に置いたのが、藺家十傑と呼ばれる十将である。"},
      {h:"生き残り", body:"鄴編に登場するのは尭雲と趙峩龍の二人。尭雲は精鋭麾下軍『雷雲』と、その中の選りすぐり十人『十槍』を、趙峩龍は精鋭麾下軍『土雀』を率いる。"},
      {h:"二つの遺言", body:"二人は藺相如から中華の行く末を聞かされ、二つの遺言を託されていた。朱海平原で信と王賁に討たれる際、その遺言を伝えて死ぬ。藺相如の予言が三十年越しに回収される場面である。"}
    ],
    rel:[{to:"rinshoujo",label:"主"},{to:"gyouun",label:"十傑"},{to:"chougaryuu",label:"十傑"},{to:"f_chou",label:"趙軍"}]
  },
  {
    id:"f_gikaryuu", name:"魏火龍七師", yomi:"ぎかりゅうしちし", kind:"faction", state:"魏", group:"魏軍",
    role:"魏の最強将軍位", klass:"勢力", first:"35巻", arc:"魏火竜七師編", status:"事実上消滅",
    tags:["魏","呉慶","凱孟","紫伯","霊凰","太呂慈"],
    summary:"魏最強の七将。内乱で半数を失い、生き残りは十四年間地下牢にいた。",
    detail:[
      {h:"位置づけ", body:"魏の将軍位の頂点にあった七人。呉慶・凱孟・紫伯・霊凰・太呂慈らがその名を連ね、秦六大将軍や趙三大天と鎬を削った。"},
      {h:"内乱", body:"太呂慈が紫伯の義妹・紫季歌を殺したことに端を発し、七師は同士討ちに至る。紫伯が太呂慈・晶仙・馬統を討ち、凱孟と霊凰は紫伯側についた。唯一どちらにも付かなかった呉慶が生き残りの処刑を阻止し、三人は表向き病死扱いで地下牢に幽閉される。"},
      {h:"復活と終わり", body:"著雍編で呉鳳明が三人を十四年ぶりに解放。紫伯は王賁に、霊凰は信に討たれ、凱孟だけが生き残った。呉鳳明が『新・魏火龍』としてその名を継いでいる。"}
    ],
    rel:[{to:"gokei",label:"七師"},{to:"gaimou",label:"七師"},{to:"shihaku",label:"七師"},{to:"reiou",label:"七師"},{to:"tairoji",label:"七師"},{to:"gohoumei",label:"新・魏火龍"},{to:"f_gi",label:"魏軍"}]
  },
  {
    id:"f_rokushou_old", name:"秦六大将軍（旧）", yomi:"しんろくだいしょうぐん きゅう", kind:"faction", state:"秦", group:"秦軍",
    role:"昭王が作った将軍位", klass:"勢力", first:"7巻", arc:"—", status:"消滅",
    tags:["六大将軍","昭王","王騎","白起","摎"],
    summary:"戦争の自由を与えられた六人。昭王の死とともに制度ごと消えた。",
    detail:[
      {h:"制度", body:"昭王が作った将軍位で、王の許可なく戦争を起こす自由を与えられた六人。中華全土を席巻したが、昭王の死とともに制度は失われた。"},
      {h:"顔ぶれ", body:"筆頭・白起、王騎、摎、王齕、胡傷、司馬錯の六人。実際には胡傷が戦略の大枠を作り、他の五人がその上で自由に戦っていたと言われる。"},
      {h:"作中での位置", body:"序盤時点で存命は王騎のみ。摎は昭王の実の娘で、龐煖に討たれて病死扱いにされていた。この制度の復活が、信たち世代の目標として物語後半の軸になる。"}
    ],
    rel:[{to:"shouou",label:"創設"},{to:"ouki",label:"六将"},{to:"hakuki",label:"筆頭"},{to:"kyou",label:"六将"},{to:"oukotsu",label:"六将"},{to:"koshou",label:"六将"},{to:"shibasaku",label:"六将"},{to:"f_rokushou_new",label:"後継"}]
  },
  {
    id:"f_rokushou_new", name:"秦六大将軍（新）", yomi:"しんろくだいしょうぐん しん", kind:"faction", state:"秦", group:"秦軍",
    role:"政が復活させた将軍位", klass:"勢力", first:"62巻", arc:"六大将軍復活編〜", status:"—",
    tags:["六大将軍","蒙武","騰","王翦","楊端和","桓騎"],
    summary:"政が中華統一のために復活させた六将。第六の椅子はまだ空いている。",
    detail:[
      {h:"制度の復活", body:"中華統一を現実の日程に乗せるため、政が六大将軍を復活させた。旧制度と同じく、王の許可なく戦争を起こす自由を与えられる。"},
      {h:"顔ぶれ", body:"第一将・蒙武、第二将・騰、第三将・王翦、第四将・楊端和、第五将・桓騎。第六の椅子は空席のまま残され、信の目標となっている。"},
      {h:"その後", body:"桓騎は肥下で戦死。騰は韓滅亡後、寧姫たち旧韓の人々を支えるとして自ら六将を退き、昌平君に羽飾りを返上した。制度は少しずつ形を変えながら続いている。"}
    ],
    rel:[{to:"sei",label:"復活させる"},{to:"moubu",label:"第一将"},{to:"tou",label:"第二将"},{to:"ousen",label:"第三将"},{to:"youtanwa",label:"第四将"},{to:"kanki",label:"第五将"},{to:"shin",label:"空席を狙う"},{to:"f_rokushou_old",label:"先代"}]
  },
  {
    id:"f_sandaiten", name:"趙三大天", yomi:"ちょうさんだいてん", kind:"faction", state:"趙", group:"趙軍",
    role:"趙の将軍位の頂点", klass:"勢力", first:"12巻", arc:"—", status:"—",
    tags:["三大天","廉頗","藺相如","趙奢","李牧","龐煖","司馬尚"],
    summary:"趙の将軍位の頂点。旧三大天と新三大天で顔ぶれが総入れ替えになる。",
    detail:[
      {h:"制度", body:"趙の将軍位の頂点にあたる三つの椅子。秦の六大将軍に対応する存在で、趙という軍事国家の象徴でもある。"},
      {h:"旧三大天", body:"廉頗・藺相如・趙奢。藺相如は病死、趙奢も故人、廉頗は悼襄王との確執で更迭され、魏へ亡命した。"},
      {h:"新三大天", body:"李牧・龐煖・司馬尚。司馬尚は李牧の推挙による任命すら断って青歌から動かなかったが、番吾の前に正式に任命される。龐煖は信に討たれ、その席は空いたままである。"},
      {h:"周辺", body:"三大天の座を狙う将は多く、渉孟や傅抵はその野心を公言している。"}
    ],
    rel:[{to:"renpa",label:"旧三大天"},{to:"rinshoujo",label:"旧三大天"},{to:"riboku",label:"新三大天"},{to:"houken",label:"新三大天"},{to:"shibashou",label:"新三大天"},{to:"futei",label:"志望"},{to:"f_chou",label:"趙軍"}]
  },
  {
    id:"f_seika", name:"青歌軍", yomi:"せいかぐん", kind:"faction", state:"趙", group:"趙軍",
    role:"司馬尚が率いる独立勢力", klass:"勢力", first:"57巻", arc:"鄴編〜", status:"—",
    tags:["青歌","司馬尚","カン・サロ","楽彰","番吾"],
    summary:"趙中枢の命令を全て無視してきた司馬尚の軍。番吾で王翦を敗走させた。",
    detail:[
      {h:"位置づけ", body:"青歌城を拠点とする司馬尚の軍。司馬尚は趙国中枢を嫌って命令をすべて無視しており、三大天の任命すら断って青歌から動かなかった。事実上の独立勢力である。"},
      {h:"顔ぶれ", body:"側近筆頭のカン・サロ、青歌の第二将・楽彰、剛将ジ・アガ、上和龍、ドン・サリ、五千将フーオン。傭兵上がりや異民族が混じる荒くれの集団。"},
      {h:"転機", body:"李牧が邯鄲を追われた後、その要請を受け入れて李牧軍を青歌に迎え入れた。ここから青歌は趙の主戦力として表舞台に出る。"},
      {h:"番吾", body:"番吾攻防戦では司馬尚が自ら出撃して秦中央軍を蹂躙し、王翦本陣まで攻め入って亜光を討ち取り、王翦を撤退に追い込んだ。秦が李牧に完敗した戦いである。"}
    ],
    rel:[{to:"shibashou",label:"総大将"},{to:"kansaro",label:"側近筆頭"},{to:"rakushou",label:"第二将"},{to:"jiaga",label:"剛将"},{to:"joukaryuu",label:"将軍"},{to:"riboku",label:"受け入れる"},{to:"f_chou",label:"趙軍"}]
  },
  {
    id:"f_saki", name:"砂鬼一家", yomi:"さきいっか", kind:"faction", state:"秦", group:"桓騎軍",
    role:"桓騎軍の拷問部隊", klass:"勢力", first:"41巻", arc:"黒羊編〜", status:"—",
    tags:["砂鬼一家","衣央","桓騎","拷問","聖地"],
    summary:"覆面の怪人たち。桓騎の「解体」はここから始まり、桓騎の原点でもある。",
    detail:[
      {h:"位置づけ", body:"桓騎軍で尋問と拷問を担当する集団。桓騎兵からは「ゼノウ一家と並んで桓騎軍で最もヤバい一家」と言われ、常に凄まじい死臭を纏っている。首領は衣央。"},
      {h:"始まり", body:"元は行き場のない孤児たちの野盗団で、首領は衣央の姉・偲央。そこへ桓騎が拾われた。狼甫一家の報復から逃れるため、桓騎が敵を『解体』して晒すという手段を教えたことが、砂鬼一家の始まりである。"},
      {h:"桓騎との関係", body:"衣央いわく、砂鬼は桓騎一家に属してはおらず、昔のよしみで横にいるだけ。那貴の「砂鬼が最古参」という認識は誤りで、正しくは「桓騎が砂鬼一家の最古参」である。"},
      {h:"その後", body:"偲央の凄惨な死を契機に桓騎は一家を離れ、自分の桓騎一家を作った。宜安戦の後、衣央たちは摩論の傭兵団の誘いを断り、自分たちの『聖地』へ帰る意向を告げている。"}
    ],
    rel:[{to:"iou",label:"首領"},{to:"shio",label:"先代首領"},{to:"shou",label:"一家"},{to:"kanki",label:"最古参"},{to:"f_kanki",label:"桓騎軍"}]
  },
  {
    id:"f_gyokuhou", name:"玉鳳隊（玉鳳軍）", yomi:"ぎょくほうたい ぎょくほうぐん", kind:"faction", state:"秦", group:"秦軍",
    role:"王賁が率いる若手三隊の一つ", klass:"勢力", first:"18巻", arc:"山陽攻略戦〜", status:"—",
    tags:["王賁","番陽","関常","亜花錦","槍"],
    summary:"王家嫡男・王賁の隊。真面目でエリート志向、そして独断専行が多い。",
    detail:[
      {h:"位置づけ", body:"王翦の息子・王賁が率いる部隊。飛信隊・楽華隊と並ぶ若手三隊の一つで、信の最大のライバル。山陽編で独自に用意した井蘭車を投入して以来、攻城戦にも強い。"},
      {h:"顔ぶれ", body:"副長で王賁の教育係の番陽、元王翦軍の関常と亜花錦、関常の側近の松琢と宮康。番吾での敗戦後、関常と亜花錦が将軍に昇進して五万の軍に増強された。"},
      {h:"戦歴", body:"著雍で紫伯を、朱海平原で藺家十傑・尭雲を討ち取っている。影丘では王賁が意識不明の重体となり、飛信隊に救われた。"}
    ],
    rel:[{to:"ouhon",label:"隊長"},{to:"banyou",label:"副長"},{to:"kanjou",label:"将軍"},{to:"akakin",label:"将軍"},{to:"shoutaku",label:"将校"},{to:"kyuukou",label:"将校"},{to:"f_hishin",label:"好敵手"}]
  },
  {
    id:"f_gakuka", name:"楽華隊（楽華軍）", yomi:"がくかたい がくかぐん", kind:"faction", state:"秦", group:"秦軍",
    role:"蒙恬が率いる若手三隊の一つ", klass:"勢力", first:"18巻", arc:"山陽攻略戦〜", status:"—",
    tags:["蒙恬","胡漸","愛閃","陸仙","軍師学校"],
    summary:"蒙家嫡男・蒙恬の隊。飄々とした天才が率いる、頭で戦う部隊。",
    detail:[
      {h:"位置づけ", body:"蒙驁の孫・蒙武の長男である蒙恬が率いる部隊。飛信隊・玉鳳隊と並ぶ若手三隊の一つ。蒙恬は昌平君の軍師養成学校を卒業しており、才能の底が見えないと評される。"},
      {h:"顔ぶれ", body:"副長は蒙恬の教育係だった胡漸（じい）。胡漸が龐煖に討たれた後、蒙武軍から猛将・愛閃が配属され、それまで足りなかった武力が補われた。若手の陸仙も副長を務める。"},
      {h:"戦歴", body:"朱海平原では麻鉱の戦死後、蒙恬が臨時の将軍として左翼大将を務めて紀彗と噛み合った。番吾での敗戦後、愛閃と陸仙が将軍に昇進して五万の軍に増強される。"}
    ],
    rel:[{to:"mouten",label:"隊長"},{to:"kozen",label:"副長"},{to:"aisen",label:"副長"},{to:"rikusen",label:"副長"},{to:"moubu",label:"父の軍"},{to:"f_hishin",label:"好敵手"}]
  },
  {
    id:"f_kyoukaitai", name:"羌瘣隊", yomi:"きょうかいたい", kind:"faction", state:"秦", group:"秦軍",
    role:"羌瘣が独立して率いる隊", klass:"勢力", first:"71巻", arc:"番吾編〜", status:"—",
    tags:["羌瘣","羌礼","蚩尤","独立"],
    summary:"飛信隊から分かれた羌瘣の軍。蚩尤の二人が並ぶ部隊。",
    detail:[
      {h:"位置づけ", body:"飛信隊の副長だった羌瘣が独立して率いる隊。番吾の頃から編成され、韓攻略後に本格的に再編された。"},
      {h:"顔ぶれ", body:"副長は髭面の老将・山能。羌瘣を篤く崇拝する南陳、歩兵長の文玄、田典、田堀、川歳らが二千人将・千人将を務める。現・蚩尤の羌礼は自由兵として羌瘣の側近に付く。"},
      {h:"意味", body:"かつて一族の掟に縛られて生きた羌瘣が、自分の名前で軍を持つに至った到達点。全面戦争では馬呈軍・紀彗軍と対峙している。"}
    ],
    rel:[{to:"kyoukai",label:"隊長"},{to:"kyourei",label:"側近"},{to:"shin",label:"元所属"},{to:"f_hishin",label:"分派"},{to:"f_shiyuu",label:"蚩尤"}]
  },
  {
    id:"f_juukyuu", name:"中華十弓", yomi:"ちゅうかじっきゅう", kind:"faction", state:"複数国", group:"称号",
    role:"中華最高の弓の使い手十人", klass:"勢力", first:"16巻", arc:"—", status:"—",
    tags:["弓","称号","魏加","姜燕","白麗","青華雲","馬朱離"],
    summary:"国をまたいで数えられる弓の名手十人。物語の要所で戦況をひっくり返す。",
    detail:[
      {h:"位置づけ", body:"国境を越えて数えられる、中華最高の弓の使い手十人の称号。武将の一騎討ちを外から壊す力を持つため、要所で戦況を決定的に動かす。"},
      {h:"顔ぶれ", body:"第一位は「神弓」馬朱離（魏・引退）、現一位は趙の青華雲。他に趙の魏加、魏の黄離弦、廉頗四天王の姜燕、楚の白麗（自称三位）、秦で唯一名を連ねた蒼源など。"},
      {h:"物語での役割", body:"魏加の一矢が王騎の死を生み、蒼源の息子である蒼兄弟が飛信隊の弓部隊を担い、その蒼仁が現一位の青華雲を射抜く。弓の系譜がそのまま世代交代の線になっている。"}
    ],
    rel:[{to:"gika",label:"十弓"},{to:"seikaun",label:"現一位"},{to:"kyouen",label:"十弓"},{to:"hakurei",label:"十弓"},{to:"sougen",label:"十弓"},{to:"soujin",label:"継承者"}]
  }

  ],

  /* ───────────── あらすじ（大まかな章の束） ─────────────
     読了地点までを5つの束に整理。keys / battles は node id。 */

  /* 詳解: 章ひとつを日単位・戦線単位まで分解した長文パート。tab「詳解」に出る。 */
  deepdives: [
  {id:"dd_gassho", title:"合従軍編 詳解", sub:"アニメ 第3シリーズ 第1〜25話 ／ 原作 24〜33巻・第257〜356話", lead:"中華が束になって秦を潰しに来る章。函谷関で全戦力を受け止めながら、その裏で李牧が王都の喉元を突く。開戦の報せから蕞の七日間、そして撤退までを、日単位・戦線単位で追う。", parts:[
    {h:"1. 開戦まで", ep:"第1〜4話 ／ 原作 第257〜270話", body:["秦の膨張を止めるため、趙の李牧が動いて楚・魏・韓・燕をまとめ上げる。総大将は楚の宰相・春申君、実質の設計者は李牧。秦は四方から同時に踏み込まれる形になる。", "咸陽に届く報せが順に絶望を積み上げていく。南の函谷から楚五万が野戦の位置まで到達、次いで魏十万が合陵一帯の城を制圧、趙が馬陽を包囲、燕十二万が北の防衛拠点・随を陥落させ、さらに韓五万。加えて斉まで趙を通って向かっているという報まで入る。", "合従軍という言葉に朝廷が凍りついたのは、四十年前に標的にされた斉が二城まで削られた前例を全員が知っていたから。大国でも合従軍を受ければ国が消える。動きを止めた廷臣を立て直したのは政の言葉だった。"], items:[
      ["蔡沢、斉を抜く", "昌平君の策で蔡沢が斉王・王建と交渉。合従軍に加わって得られる分の倍の土地・財・人を約束し、国境を越える前に斉の五万を離脱させる。連合の背後に不安を作る一手でもあった。"],
      ["五分の一の賭け", "咸陽が出した結論は全軍を函谷関へ引くこと。国門と呼ばれるこの関を抜かれれば咸陽まで一直線という一点に、蒙武・張唐・騰・王翦・桓騎・蒙驁・麃公を集める。昌平君の見立てで成功率は五分の一。"]
    ]},
    {h:"2. 函谷関の布陣", ep:"第4〜5話 ／ 原作 第270話前後", body:["西から東へ、四つの戦線が同時に走る。関そのものを守る中央と、その左右で関の背後に回られないようにする両翼という構造になっている。"], table:{head:["秦", "相手"], rows:[
      ["王翦軍", "燕 ・ オルド軍"],
      ["蒙驁軍 ・ 桓騎軍 ・ 張唐軍（関本体）", "魏 ・ 呉鳳明軍 ＋ 韓 ・ 成恢軍"],
      ["騰軍 ・ 蒙武軍", "楚 ・ 臨武君軍 ／ 媧燐軍 ／ 汗明軍"],
      ["麃公軍", "趙 ・ 慶舎軍"]
    ]}, note:"媧燐は楚の三軍の一角として函谷関に布陣している。慶舎もこの時点で趙軍として前線に出ており、黒羊丘より前に一度、秦と噛み合っている。"},
    {h:"3. 一日目", ep:"第5〜8話 ／ 原作 第273〜285話", items:[
      ["井闌車", "呉鳳明が持ち込んだ巨大な攻城塔が二基取り付く。一基は張唐の持ち場に到達してしまい、もう一基は桓騎が焼き払う。落ちないはずの城壁を初めて越えさせた技術が、この戦の性格を決めた。"],
      ["信の覚醒", "麃公とともに趙軍へ突っ込んだ信が、戦場全体の流れを掴む感覚に触れる。一万を率いて麃公軍を救い、本能型の将としての第一歩を踏む。"],
      ["万極を討つ", "長平の生き埋めを生き延び、秦兵殺しだけで生きてきた万極を信が討つ。二度と長平のようなことは起こさせないと言い切った上での討伐だった。"],
      ["騰、臨武君を斬る", "楚戦線では騰が臨武君の首を取る。ただし副官・輪冕が臨武君を狙った際には白麗の遠射で仕留められており、楚の若手二枚の厄介さも同時に見えてくる。"]
    ]},
    {h:"4. 二日目以降", ep:"第9〜12話 ／ 原作 第291〜302話", items:[
      ["膠着", "楚第一軍の残存が第二軍の支援なしに無策で突撃し、関は通常の攻城戦へ戻る。媧燐は全軍が堅実に戦えば十日で函谷関は落ちると本営に伝えさせ、時間切れの圧力を秦にかけ続けた。"],
      ["楚第二軍と戦象", "動かなかった楚の第二軍が前に出る。戦象部隊という秦が想定していなかった駒が投入され、関の東側の均衡が一気に傾く。"],
      ["項翼と白麗", "五千人将として名乗りを上げた項翼が飛信隊の前に立ち、白麗が距離から削る。信と同世代の楚の二枚が、この戦で初めて本格的に噛み合う。"]
    ]},
    {h:"5. 決着どころ", ep:"第13〜18話 ／ 原作 第307〜325話", items:[
      ["蒙武 対 汗明", "楚の巨人・汗明と、秦国最強を自称してきた蒙武の一騎打ち。純粋な武の押し合いで蒙武が勝つ。武でしか語れなかった男が、初めてその武で格上を超えた瞬間になる。"],
      ["黒幕の不在", "秦側がここで気づく。趙軍の本陣に李牧がいない。函谷関の総力戦そのものが、彼の描いた盤面の一部だった。"],
      ["麃公 対 龐煖", "関に籠らず平地へ出た麃公が、王騎を討った龐煖と一騎打ちに臨む。腕一本と引き換えに龐煖の腕を折るところまで持っていったが、最後は討たれる。信は二人目の師を失う。"],
      ["李牧の南道", "李牧は三万余りを率いて秦の南の道を進み、金氏・蜀・楼といった城を落としながら咸陽へ向かう。追った麃公軍の五千は竜洞で分断され、麃公戦死後は二千まで削られた。"]
    ]},
    {h:"6. 蕞・守りの配置", ep:"第19〜20話 ／ 原作 第328〜333話", body:["咸陽の手前に残る最後の砦が蕞。政は昌平君の同意を得て、自らの親衛隊だけを連れて秘密裏に蕞へ入る。逃げ延びた信たちも合流した。", "兵はほとんどいない。政は集めた住民の前に立ち、命令ではなく理由を語る。街ごと戦う集団に変わったこの演説が、この章の核心になる。"], table:{head:["持ち場", "担当"], rows:[
      ["北壁", "介億（昌平君が送った騎兵100・指揮官50を連れて到着）"],
      ["東壁", "壁"],
      ["西壁", "昌文君"],
      ["南壁（正門）", "信 ・ 飛信隊"],
      ["本営", "河了貂 ・ 蒙毅（軍師）／ 政は四つの壁を巡回"]
    ]}},
    {h:"7. 蕞の七日間", ep:"第20〜24話 ／ 原作 第334〜348話", table:{head:["日", "何が起きたか"], rows:[
      ["一日目", "四方同時攻撃。南壁は飛信隊が押し返すが、風を味方につけた趙の弓に東壁が追い詰められる。河了貂が麃公軍の生き残りを予備兵として投入し、崩れかけた東壁を戻した。"],
      ["一日目の夜", "李牧が軍を二分。半分を休ませ、残り半分で音だけを立てる偽装夜襲。実体が見えない蕞側は一晩中当てもなく矢を射続け、睡眠を奪われた。"],
      ["二日目", "消耗した状態で新手を受ける。傅抵が竜川と田有を瞬時に斬るが、信は羌瘣との稽古で得た読みで誘いを見抜き一撃で沈める。カイネは河了貂を人質に取ろうとして壁から落ち、その河了貂に腕を掴まれて助けられる。"],
      ["二日目の夜", "眠れない兵のもとを政が回る。王としてではなく一人の人間として言葉をかけ、麃公軍の生き残りには死に場所ではなく、麃公の話を次の世代へ伝えるという生きる理由を与えた。必要な籠城日数は八日と示される。"],
      ["三日目", "限界を超えたはずの民兵が、四つの壁すべてで押し返し始める。昌文君はこれを未知の領域と呼んだ。"],
      ["四日目", "日没まで持ちこたえる。趙兵は当初の侮りを消し、正体の掴めない何かと戦っている感覚に襲われる。李牧自身もこの粘りの正体を掴みかねていた。"],
      ["五日目", "兵が攻撃を受ける前に倒れ始める。政は制止を振り切って南壁に立ち、子どもたちを助けるために親衛隊を出した末に首元を斬られて重傷。秦王が蕞にいることが趙側に知れ渡り、李牧は予備兵を全投入した。"],
      ["六日目", "王の負傷で戦意が消えかけるが、政は馬上に立ち上がり傷を押して再び壁を回る。街はもう一度立ち上がり、介億が北壁の余力を東西へ回して均衡を保った。"],
      ["七日目", "総攻撃で西壁が抜かれ、内側から門を開けられて趙兵が流れ込む。誰もが終わりを覚悟したところに、三万の楊端和軍が到着する。政が誰にも知らせず単独で送っていた使者が届いていた。"]
    ]}},
    {h:"8. 撤退と戦後", ep:"第24〜25話 ／ 原作 第349〜356話", items:[
      ["信 対 龐煖", "乱入してきた山の民に苛立った龐煖が暴れ、楊端和を狙う。信はそれを引き受け、愛馬・楢の犠牲で相手を落馬させ、武器を狙う捨て身の攻めで胸を突き、王騎が刻んだ古傷の上を斬った。"],
      ["李牧、退く", "勝敗は決したと見た李牧は、副官・晋成常の説得で撤退を選ぶ。晋成常は殿を務めて味方を逃がし切り、最後はバジオウに討たれた。函谷関側の各軍も動きを止め、合従軍は崩壊する。"],
      ["戦後", "蕞は守り抜かれ、秦は滅亡の淵から生還する。政は楊端和に礼を述べ、山の民は即座に自分たちの遠征へ戻っていった。信はこの戦の功で三千人将となる。"]
    ]}
  ], battles:["b_kankoku", "b_sai"], keys:["sei", "shin", "tenn", "kyoukai", "heki", "shoubunkun", "shouheikun", "saitaku", "moubu", "tou", "ousen", "kanki", "choutou", "hyoukou", "youtanwa", "bajio", "riboku", "houken", "keisha", "kaine", "futei", "bankyoku", "gohoumei", "shunshinkun", "kanmei", "rinbukun", "karin", "kouyoku", "hakurei", "goumasho", "seikai", "orudo"], src:"典拠: Fandom の Battle of Kankoku Pass / Battle of Sai と、合従軍編 全71話のサブタイトル。"}
  ],
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
    keys:["shin", "kyoukai", "hyoukou", "bakukoshin", "gokei", "kyuugen", "hakukisai", "gakuga", "takuke", "obei", "obito", "hairou", "denyuu"],
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
    newcomers:["choutou", "houken", "bankyoku", "denei", "kyogai", "kyou", "ryusen", "ryuyuu", "shousa", "suugen", "chousou", "fuuki", "kan'ou", "shunshinkun", "gekishin"],
    deaths:["ouki", "obito", "chousou", "fuuki", "kyou"]
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
    newcomers:["renpa", "genpou", "kaishibou", "kyouen", "rinko", "kanki", "ousen", "sosui", "kokuou", "maron", "raido", "keisha", "rinbukun", "kouyoku", "hakurei"],
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
      {ep:"1〜2話", h:"中華、秦を潰しにかかる", body:"秦の膨張を止めるため、趙の李牧が動いて楚・魏・韓・燕をまとめ上げる。楚の宰相・春申君が総大将、魏王・韓王とも話がつき、総勢は諸説あるが桁違いの大軍。秦は四方から同時に踏み込まれる形になる。"},
      {ep:"2〜3話", h:"四方からの侵攻報告", body:"咸陽に届く報せが順に絶望を積み上げる。南の函谷から楚五万、次いで魏十万が合陵一帯の城を制圧、趙が馬陽を包囲、燕十二万が北の防衛拠点・随を陥落、さらに韓五万。加えて斉まで趙を通って向かっているという報まで入る。"},
      {ep:"3話", h:"四十年前の記憶", body:"合従軍という言葉に朝廷が凍りつく。四十年前、標的にされた斉が二城まで削られた前例があるからで、大国でも合従軍を受ければ国が消えると全員が知っている。動きを止めた廷臣を立て直したのは政の言葉だった。"},
      {ep:"3〜4話", h:"蔡沢、斉を抜く", body:"昌平君の策で蔡沢が斉王・王建と交渉。合従軍に加わって得られる分の倍の土地・財・人を約束し、国境を越える前に斉の五万を離脱させる。連合の背後に不安を作る一手でもあった。"},
      {ep:"4話", h:"五分の一の賭け", body:"咸陽が出した結論は、全軍を函谷関へ引くこと。国門と呼ばれるこの関を抜かれれば咸陽まで一直線という一点に、蒙武・張唐・騰・王翦・桓騎・蒙驁・麃公を集める。昌平君の見立てで、成功率は五分の一。"},
      {ep:"4〜5話", h:"布陣（西から東へ）", body:"王翦軍が燕のオルド軍。関そのものには蒙驁軍・桓騎軍・張唐軍が入り、魏の呉鳳明軍と韓の成恢軍を受ける。東側は騰軍と蒙武軍が楚の臨武君軍・媧燐軍・汗明軍と噛み合い、さらに東で麃公軍が趙の慶舎軍と当たる。"},
      {ep:"5〜6話", h:"一日目・井闌車", body:"呉鳳明が持ち込んだ巨大な井闌車が関に取り付く。一基目は張唐の持ち場に届いてしまい、二基目は桓騎が焼き払う。落ちないはずの城壁を初めて越えさせた技術が、この戦の性格を決めた。"},
      {ep:"6〜7話", h:"一日目・信の覚醒", body:"麃公とともに趙軍へ突っ込んだ信が、戦場全体の流れを掴む感覚を掴みかける。一万を率いて麃公軍を救い、本能型の将としての第一歩を踏む。"},
      {ep:"7〜8話", h:"一日目・万極を討つ", body:"長平の生き埋めを生き延び、秦兵殺しだけで生きてきた万極を信が討つ。二度と長平のようなことは起こさせないと言い切った上での討伐で、この戦争が生む怨嗟に対する信なりの答えになっている。"},
      {ep:"8話", h:"一日目・騰、臨武君を斬る", body:"楚戦線では騰が臨武君の首を取る。ただし副官・輪冕が臨武君を狙った際には白麗の遠射で仕留められており、楚の若手二枚の厄介さも同時に見えてくる。"},
      {ep:"9〜10話", h:"二日目・膠着", body:"楚第一軍の残りが第二軍の支援なしに無策で突っ込み、関は通常の攻城戦へ戻る。媧燐は全軍が堅実に戦えば十日で函谷関は落ちると本営に伝えさせ、時間が秦の敵であることを突きつける。"},
      {ep:"10〜12話", h:"楚第二軍と戦象", body:"動かなかった楚の第二軍が前に出る。戦象部隊という秦が想定していなかった駒が投入され、関の東側の均衡が一気に傾く。"},
      {ep:"12〜13話", h:"項翼と白麗", body:"五千人将として名乗りを上げた項翼が飛信隊の前に立ち、白麗が距離から削る。信と同世代の楚の二枚が、この戦で初めて本格的に噛み合う。"},
      {ep:"13〜16話", h:"蒙武 対 汗明", body:"楚の巨人・汗明と、秦国最強を自称してきた蒙武の一騎打ち。純粋な武の押し合いで、蒙武は自分の全部を出し切って勝つ。武でしか語れなかった男が、初めてその武で格上を超えた瞬間になる。"},
      {ep:"16話", h:"関の内側", body:"函谷関そのものにも敵が到達し、関の内部での攻防が始まる。落ちる寸前の状態で秦は耐え続ける。"},
      {ep:"16〜17話", h:"黒幕の不在", body:"ここで秦側が気づく。趙軍の本陣に李牧がいない。函谷関の総力戦そのものが、彼の描いた盤面の一部だった。"},
      {ep:"17〜18話", h:"麃公 対 龐煖", body:"関に籠らず平地へ出た麃公が、王騎を討った龐煖と一騎打ちに臨む。腕一本と引き換えに龐煖の腕を折るところまで持っていったが、最後は討たれる。信は二人目の師を失う。"},
      {ep:"18〜19話", h:"南道を抜く李牧", body:"李牧は三万余りを率いて秦の南の道を進み、金氏・蜀・楼といった城を落としながら咸陽へ向かう。麃公軍の残り五千が追いつくも、竜洞を使って分断され、麃公戦死後は二千まで削られた。"},
      {ep:"19話", h:"蕞へ", body:"咸陽の手前に残る最後の砦が蕞。政は昌平君の同意を得て、自らの親衛隊だけを連れて秘密裏に蕞へ入る。逃げ延びた信たちも合流する。"},
      {ep:"19〜20話", h:"政、告げる", body:"蕞に兵はほとんどいない。政は集めた住民の前に立ち、命令ではなく理由を語る。街ごと戦う集団に変わったこの演説が、この章そのものの核心になる。"},
      {ep:"20話", h:"四つの壁", body:"昌平君が送った介億が騎兵百と指揮官五十を連れて到着。北壁を介億、東壁を壁、西壁を昌文君、南の正門を信が受け持ち、本営には河了貂と蒙毅が軍師として詰める。政は四つの壁を回って士気を保つ役に就く。"},
      {ep:"20話", h:"蕞・一日目", body:"趙軍は四方の壁に同時に取り付く。南壁は飛信隊が押し返すが、風向きを味方につけた李牧の弓が東壁を追い詰める。河了貂は麃公軍の生き残りを予備兵として壁に入れ、崩れかけた東壁を戻した。"},
      {ep:"20〜21話", h:"一日目の夜襲", body:"日没後、李牧は軍を二つに割って半分を休ませ、残り半分で夜襲の音だけを立てる。暗闇では実体が分からず、蕞側は一晩中当てもなく矢を射続け、眠る機会を奪われた。"},
      {ep:"21話", h:"蕞・二日目", body:"河了貂が夜襲の仕掛けに気づいた時には手遅れ。消耗した状態で新手を受ける。カイネと傅抵が壁に取り付き、傅抵は百人将の竜川と田有を瞬時に斬った。"},
      {ep:"21〜22話", h:"信 対 傅抵、貂とカイネ", body:"速さで上回る傅抵に対し、信は羌瘣との稽古で得た読みで誘いを見抜き一撃で沈める。カイネは河了貂を人質に取ろうとして壁から落ち、その河了貂に腕を掴まれて助けられるという場面も生まれた。"},
      {ep:"22話", h:"二日目の夜・王の巡回", body:"眠れない兵たちのもとを政が回る。王としてではなく一人の人間として言葉をかけ、麃公軍の生き残りには死に場所ではなく、麃公の話を次の世代へ伝えるという生きる理由を与えた。信が昌文君に確認した籠城の必要日数は八日。"},
      {ep:"22話", h:"三日目・未知の領域", body:"限界を超えたはずの民兵が、四つの壁すべてで押し返し始める。昌文君が未知の領域と呼んだこの現象が、蕞という戦いの異常さを示す。"},
      {ep:"22〜23話", h:"四日目", body:"蕞は日没まで持ちこたえる。趙兵は当初の侮りを消し、正体の掴めない何かと戦っている感覚に襲われる。李牧自身も、この粘りの正体を掴みかねていた。"},
      {ep:"23話", h:"五日目・王、壁に立つ", body:"兵が攻撃を受ける前に倒れ始める。政は制止を振り切って自ら南壁に立ち、子どもたちを助けるために親衛隊を出す。だが敵兵に首元を斬られ重傷を負い、秦王が蕞にいることが趙側に知れ渡る。"},
      {ep:"23話", h:"五日目の夜", body:"王が蕞にいると確信した李牧は予備兵を全て投入し、四方から逃げ道を塞ぐ。壁の指揮官までが前線に出る消耗戦になり、昌文君の西壁が最も危うくなった。"},
      {ep:"23〜24話", h:"六日目・空っぽの街", body:"政の負傷で蕞から戦意が消えかける。そこで政は馬上に立ち上がり、傷を押して再び壁を回る。王が生きていると分かった瞬間に、街全体がもう一度立ち上がった。飛信隊も信の演説で限界を超えていく。"},
      {ep:"24話", h:"七日目・西壁陥落", body:"総攻撃で西壁が抜かれ、趙兵が内側から門を開ける。蕞に敵が流れ込み、誰もが終わりを覚悟したところに、三万の楊端和軍が到着する。政が誰にも知らせず単独で送っていた使者が届いていた。"},
      {ep:"24〜25話", h:"信 対 龐煖", body:"乱入してきた山の民に苛立った龐煖が暴れ、楊端和を狙う。信はそれを引き受け、愛馬・楢の犠牲で相手を落馬させ、武器を狙う捨て身の攻めで胸を突き、王騎が刻んだ古傷の上を斬った。"},
      {ep:"25話", h:"撤退", body:"勝敗は決したと見た李牧は、副官・晋成常の説得で撤退を選ぶ。晋成常は殿を務めて味方を逃がし切り、最後はバジオウに討たれた。函谷関側の各軍も動きを止め、合従軍は崩壊する。"},
      {ep:"25話", h:"戦後", body:"蕞は守り抜かれ、秦は滅亡の淵から生還する。政は楊端和に礼を述べ、山の民は即座に自分たちの遠征へ戻っていった。信はこの戦の功で三千人将となる。"}
    ],
    keys:["sei", "shin", "kyoukai", "tenn", "shouheikun", "moubu", "tou", "ousen", "choutou", "hyoukou", "heki", "youtanwa", "riboku", "houken", "kaine", "shunshinkun", "kanmei", "rinbukun", "seikai", "orudo", "gohoumei", "kanto", "kouyoku", "hakurei", "karin", "kouen", "goumasho"],
    battles:["b_kankoku", "b_sai"],
    newcomers:["gohoumei", "kanmei", "orudo", "seikai", "ogiko", "futei", "gakurai", "garo", "karin", "goumasho", "kouen"],
    deaths:["hyoukou", "choutou", "kanmei", "rinbukun", "seikai", "bankyoku"]
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
    deaths:["keisha"]
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
    newcomers:["kanto", "kanpishi"],
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
    deaths:["houken", "gyouun", "chougaryuu", "makou", "shousa", "kyogai"]
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
    keys:["riboku", "moubu", "kyoukai", "shin", "f_shiyuu", "f_so", "karin", "manu", "sentoun", "genu", "kouen"],
    battles:[],
    newcomers:["manu", "sentoun", "genu"],
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
    deaths:["kochou", "raido"]
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
    keys:["kanki", "raido", "kokuou", "zenou", "maron", "riboku", "shibashou", "ousen", "shouheikun", "shin", "tou", "joukaryuu", "rakushou", "kanpishi"],
    battles:["b_gian"],
    newcomers:[],
    deaths:["kanki", "kokuou", "zenou", "joukaryuu", "naki", "ringyoku", "gakurai"]
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
    deaths:["akou", "denrimi"]
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

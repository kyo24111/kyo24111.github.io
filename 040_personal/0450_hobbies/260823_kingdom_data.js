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
    note: "⚠ ネタバレ制限なし。黒羊丘以降（鄴・宜安/肥下・番吾・韓攻略・全面戦争）の展開と、存命キャラの最期まで含みます。2026-09-04にあらすじタブを改稿し、アニメ既放送分（第1〜6シリーズ 全155話）は「1話＝1項目」で公式サブタイトルを見出しに採用。未放送分は巻数ベース。各章末に要点と復習チェックあり。巻数・話数は目安です。",
    updated: "2026-09-04"
  },

  /* 顔画像: kingdom_faces/<node id>.jpg があるノードの一覧。
     出典は Fandom Wiki のキャラクター記事（アニメ立ち絵／原作コマ）。著作権は原泰久／集英社および
     各アニメ製作委員会に帰属。ページ側にクレジットを記載し、noindex で公開している。
     画像が無い環境では頭文字アバターに自動フォールバックする。 */
  faces: {
    dir: "kingdom_faces/",
    ids: ["akakin", "akou", "bajio", "bakukoshin", "banaji", "bankyoku", "banyou", "chougaryuu",
      "chousou", "choutou", "chuutetsu", "denei", "denrimi", "denyuu", "en", "entei",
      "futei", "fuuki", "gaimou", "gakurai", "gakyou", "garo", "gekishin", "genpou",
      "genu", "gohoumei", "gokei", "goumasho", "gyouun", "hairou", "hakurei", "heki",
      "houken", "hyou", "hyoukou", "jokan", "kaine", "kaishibou", "kan'ou", "kanki",
      "kanmei", "kanpishi", "kanto", "karin", "keisha", "ketsushi", "kisui", "kochou",
      "kokuou", "kouyoku", "kyogai", "kyou", "kyouen", "kyoukai", "kyoumei", "kyoushou",
      "kyuugen", "makou", "manu", "maron", "moubu", "mougou", "mouten", "muta",
      "naki", "obei", "obito", "ogiko", "orudo", "ouhon", "ouki", "ousen",
      "raido", "rakushou", "rankai", "renpa", "riboku", "rinbukun", "ringyoku", "rinko",
      "risi", "rokuomi", "ryofui", "ryusen", "ryuyuu", "saitaku", "saji", "sei",
      "seikai", "seikyou", "sentoun", "shibashou", "shiishi", "shika", "shin", "shoubunkun",
      "shouheikun", "shousa", "shunmen", "shunshinkun", "shunsuiju", "soou", "sosui", "suugen",
      "tajifu", "takuke", "tenn", "tou", "youtanwa", "yuren", "zenou"]
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
    "kanpishi": {age:"40代", debutManga:"原作 第495話", debutAnime:"アニメ 第6期 第2話", src:"Kan Pishi"},
    "kyoumei": {epithet:"儀式から逃げた者", debutManga:"原作 第357話", src:"Kyou Mei"},
    "gakyou": {debutManga:"原作 第94話（回想）", src:"Ga Kyou"},
    "entei": {stats:{bu:88, shiki:70, chi:75, kei:"D"}, statsSrc:"公式ガイドブック", debutManga:"原作 第82話", src:"En Tei"},
    "jokan": {epithet:"漂を討った刺客", debutManga:"原作 第5話", src:"Jo Kan"},
    "muta": {epithet:"毒使い", debutManga:"原作 第7話", debutAnime:"アニメ 第1期 第3話", src:"Muta"}
  },

  nodes: [

  /* ═══════════ 追加: 戦い（黒羊丘以降） ═══════════ */
  {
    id:"b_chakuyou", name:"著雍の戦い", yomi:"ちゃくようのたたかい", kind:"battle", state:"複数", group:"対魏",
    role:"秦の勝利", klass:"戦い", first:"35巻", arc:"魏火竜七師編", status:"決着",
    tags:["魏","呉鳳明","凱孟","飛信隊","将軍昇格"],
    summary:"魏の要衝・著雍を落とした戦い。信が将軍位に手を伸ばす一歩。",
    detail:[
      {h:"構図", body:"魏の呉鳳明が守る著雍に、秦が飛信隊・玉鳳・楽華の若手三隊を軸に攻めかかる。魏は十四年ぶりに地下牢から出された猛将・凱孟を投入。"},
      {h:"見どころ", body:"河了貂が荀早隊に囚われ、凱孟に胸の内を語る場面。信と凱孟の一騎討ち。信が魏火龍・霊凰を討ち取り、呉鳳明は霊凰を身代わりにして撤退する。"},
      {h:"結果", body:"著雍陥落。羌瘣が本陣陥落の功で三千人将、信は将軍昇格への道筋をつける。"},
      {h:"背景", body:"合従軍のあと、趙は山陽を取り返せず、秦の国境は急速に動き始めていた。太原の先にある著雍は、秦が中華の中央へ出るのを塞ぐ要衝で、魏はここに国力を注いで守っていた。秦は総大将に騰を立て、魏は序列第一位の大将軍・呉鳳明が七万で受ける。"},
      {h:"緒戦", body:"初日から呉鳳明は罠を仕掛けてくる。左翼の隆国は三千から五千の敵が背後に回り込む動きを察知して全軍を全速で退かせ、包囲を寸前で回避した。前日までとは戦術の質がまるで違うことから、騰は大梁から出てきた男が呉鳳明本人だと確信する。"},
      {h:"援軍を求めるか", body:"魏が六万を増派したため、騰は趙との国境・巨陽方面にいる王翦軍へ援軍を要請しようとする。それを止めたのが王賁だった。巨陽が抜ければ趙は東側から一気に南下でき、著雍と山陽を背後から囲われる。つまり援軍要請そのものが敵の狙い通りになる、という指摘だった。"},
      {h:"王賁の策", body:"王賁は魏の布陣に三つの弱点を見つけていた。北西・南西・川向かいの三点は森に隔てられ、伝令と援軍がわずかに遅れる。一点だけなら意味はないが、三点を同時に突けば効いてくる。突破に長けた録嗚未軍・玉鳳隊・飛信隊の三隊で同時に本陣を狙い、騰は目を引きつける囮に回る、という設計。"},
      {h:"呉鳳明の切り札", body:"対する呉鳳明は、十四年ぶりに地下牢から出した魏火竜七師の残り三人を配した。信の前に凱孟、王賁の前に紫伯、騰の前に霊凰。三人は火竜同士の内輪の殺し合いの罪で幽閉されていた身で、十四年ぶんの渇きを秦軍にぶつけてくる。"},
      {h:"一日目", body:"三隊は打ち合わせなしで開戦の呼吸を合わせた。騰は霊凰の旗を見た瞬間に相手を看破し、側面から来る刃を読んで軍を退かせる。そこへ狂戦士・蘭美迫が突っ込み、一撃を交換して騰の頬に傷、蘭美迫の腕当てに罅が入った。王騎と摎が手を焼いた相手と分かっていたため、騰は深追いせず囮の役に徹する。"},
      {h:"河了貂、捕らわれる", body:"飛信隊の正面は一万、左右の予備軍にも各一万、本陣には三万。数の不利のなかで、凱孟の副官・荀早が河了貂を捕らえる。翌日の人質交換で戻ってくるが、この一件で飛信隊は貴重な半日を失った。"},
      {h:"二日目", body:"玉鳳隊は初日に前線を無傷で抜き、二日目には予備軍の第一波まで潰す。王賁自身の成長、隊の練度、そして半年前に配属された元王翦軍の千人将・関常という三つが、五千人隊とは思えない突破力を生んでいた。一方の飛信隊は初日でつまずいた遅れを、河了貂の戦術で取り戻す形になる。"},
      {h:"三日目・王賁 対 紫伯", body:"王賁は半日で本陣前まで詰めると宣言し、関常に中央突破を任せて自分は紫伯が出てくる瞬間だけを待った。関常は無理だと反対したが、王賁は不可能な状況で勝つからこそ名が上がると押し切る。魏国最強の槍と正面から噛み合い、王賁は紫伯を討ち取った。"},
      {h:"三日目・飛信隊", body:"河了貂の策は、信と二千を凱孟軍一万三千の中に置き去りにするというもの。右翼を本陣へ通すために信が凱孟と荀早を釘付けにする役で、脱出の目処はない。それでも戦い続ければ助けが来ると言い切り、信はこれを受けた。"},
      {h:"本陣陥落", body:"三隊が本陣に到達し、最初に届いたのは羌瘣だった。だが討った相手は呉鳳明の影武者で、本人は霊凰と落ち合って反撃を練っていた。そこへ信が現れ、呉鳳明と間違えて霊凰を討つ。呉鳳明は自分がまだ魏に必要だと判断して戦場を離れた。"},
      {h:"決着", body:"著雍は秦の手に落ちる。魏は土地と、大将軍・紫伯と霊凰を同時に失った。信本人は凱孟を倒せなかったため、霊凰の首は転がってきた拾い物だと不本意そうにしていたが、王騎と摎が認めた相手の首という価値は動かない。"},
      {h:"戦後の要塞", body:"騰には出発前から昌平君の密命があった。著雍に拠点を築くのではなく、地形を使って一年かけて巨大な要塞を建てる。攻められたら何としても守れ、人手はいくらでも送る、という指示だった。前線に恒久的な楔を打ち込み、魏という国そのものを継続的に削り始める布石で、国が滅びる時代の入口になっている。"}
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
      {h:"その後", body:"存命。全面戦争では青歌軍を率いて再び王翦軍と対峙する。"},
      {h:"青歌の主", body:"寡黙で物憂げに見えるが、実際は青歌の民を深く大切にする人物。失脚して行き場を失った李牧とその一党を庇護したのもこの男である。"},
      {h:"聞く将", body:"部下の意見を、自分と食い違っていても最後まで聞いたうえで決める。そのうえで判断は直截で、遠回りを好まない。"},
      {h:"三大天級", body:"正式に三大天となる前から、その水準の将だと見られていた。燕との戦いでの働きを受け、李牧は国境近くに眠っていた虎だと評されている。"}
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
      {h:"その後", body:"韓救援に派遣され玉鳳軍と対峙したが、新鄭陥落の報で撤退。存命。"},
      {h:"十四年の渇き", body:"火竜七師の内乱の後、紫伯・霊凰とともに十四年間を地下牢の暗闇で過ごした。表向きは病死として処理され、そのため呉慶以外の火竜は秦六大将軍ほど名が知られていない。凱孟が戦場で見せる異様な生気は、その十四年の裏返しでもある。"},
      {h:"著雍での立ち回り", body:"飛信隊の相手として配されるが、本人は面白い相手を探して自分から前へ出てしまう。副官の荀早に本陣に叱られると諌められても止まらず、河了貂を捕らえた荀早を殴って、面倒を増やすなと文句を言った。"},
      {h:"生き残り", body:"紫伯と霊凰が討たれたのに対し、凱孟は生き延びた三人目。魏火竜の名は呉鳳明が新・魏火竜として継ぐことになる。"}
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
      {h:"武", body:"呼吸を用いた『巫舞』により、一時的に人間離れした速度を得る。"},
      {h:"千年の一族", body:"戦国の世よりはるか以前から活動してきた暗殺者の一族で、千年以上にわたって鬼と恐れられてきた。秦と魏の山中に散らばりながら、どの国にも属していない。"},
      {h:"十九の族", body:"歴史のある時点で十九の族に分かれ、それぞれが蚩尤の名を継ぐ者を育てることに一族の全部を懸けている。作中で名が出るのは羌族・幽族・峨族の三つ。族ごとに衣装も鉢巻の紋様も違う。"},
      {h:"剣は神具だった", body:"元来は舞で神を祀る巫女の一族で、剣は人を斬る道具ではなく天を敬うための神具だった。やがて人が天より人の強さを恐れるようになり、一族は闇へ降りて別のものに変わっていった。"},
      {h:"儀式の設計", body:"情は強さに要らないという教えのもと、あえて仲の良い二人を同じ族の候補に選ぶ。そのうえで一人しか生き残れない儀式に放り込む。候補同士の共闘は禁じられているが、長老の同意があれば例外が認められる。"},
      {h:"蚩尤の条件", body:"蚩尤と呼ばれる条件は二つ。人間離れした剣技と、行く手を阻む者なら肉親でも斬れる非情さ。幽連はその両方を満たして名を継いだ。"},
      {h:"武神との関係", body:"武神の側からは神降ろしと呼ばれている。両者の流派は五百年以上前に同じ一本から分かれたとされ、羌瘣と龐煖の対立は、その分岐した二つの道の衝突でもある。"},
      {h:"朱凶という配下", body:"のちに朱凶となる一族は、二百年以上にわたって蚩尤に仕えてきた。蚩尤の巫女に強い敬意を払う立場で、暗殺集団としての朱凶の背景はここにある。"}
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
      {h:"小ネタ", body:"下僕育ちのわりに炊事も掃除も壊滅的で、そこは何年経っても直らない。史実の李信がモデルだが、原作の信は生まれも育ちも別物として描かれている。"},
      {h:"怒りの燃料", body:"漂の仇を討つと誓った時点から、信の強さの燃料は一貫して身内にある。仲間が傷つけられた瞬間に別人のような怒りを見せ、それが最大の武器にも最大の隙にもなる。"},
      {h:"本能型という型", body:"兵法の型を持たない代わりに、戦場の流れを読む嗅覚を極限まで研いだ。本陣で指揮するのではなく先頭で突っ込み、敵陣を縦に割る。飛信隊が数の不利でも勝てるのは、この一点に全部を寄せているから。"},
      {h:"王騎の評価", body:"初対面に近い段階で、王騎は信に将軍の匂いがあると評した。この遠征で斬ってきた千人将たちより上だという言い方で、信の目標が漠然とした夢から具体的な階段に変わる。"},
      {h:"からかい癖", body:"熱血一辺倒に見えて、仲間を茶化すのが好き。飛信隊の空気の軽さは隊長のこの性格から来ている部分が大きい。河了貂とは幼い頃から兄妹のように言い合いを続けている。"},
      {h:"下僕だった時間", body:"漂と過ごした下僕の日々は、その後も繰り返し立ち返る原点になっている。身分では一生届かないはずの場所を目指すという構図そのものが、この物語の背骨になっている。"}
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
      {h:"冷徹さ", body:"序盤の政は情に薄く見える。信が見逃した刺客をためらいなく斬ったように、王として必要な処理は即断する。理想を語る男が同時に一番現実的だという二面性が、この人物の芯になっている。"},
      {h:"信という剣", body:"出会った当初、政は信を人ではなく剣として扱うと言い切った。それでも力尽きた信を文句ひとつ言わず背負って運ぶなど、言葉と行動が食い違う場面が積み重なっていく。"},
      {h:"王座を託した瞬間", body:"成蟜との決着では、政が外の護衛を引き受け、王座の間そのものを信に任せた。周囲が驚くほどの預け方で、この判断が二人の関係を決定づけた。"},
      {h:"言葉で動かす", body:"山の民、蕞の住民、そして廷臣。政は一貫して武力ではなく理由を語ることで味方を増やしてきた。合従軍で国を救ったのも、最終的にはこの資質だった。"},
      {h:"趙での日々", body:"母に守られず、石を投げられ、人として扱われなかった少年時代が冷たさの根にある。紫夏と出会うまで、政は誰のことも信用していなかった。"},
      {h:"矛盾を引き受ける", body:"戦のない中華を掲げながら、そのために誰よりも多くの戦を起こす。この矛盾を自覚したうえで進むと決めているところが、他の王との決定的な違いになっている。"}
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
      {h:"小ネタ", body:"兵法学校時代には煙管をふかす場面もあり、見た目の幼さと中身の年季がずれているのが河了貂という人物の面白さ。"},
      {h:"生存能力", body:"五歳で身寄りを失い、それでも一人で生き延びた。旺盛な好奇心と観察眼はその生活で身についたもので、軍師としての資質の土台になっている。"},
      {h:"目と記憶", body:"数里離れた位置から趙軍の旗の文字を読み取れるほどの視力と、戦場の情報を保持し続ける記憶力が武器。飛信隊の判断速度はここに支えられている。"},
      {h:"山の民ではなくなった", body:"平地で長く暮らしたことで、自分をもう山の民だとは思っていない。仮に一族が見つかっても馴染めないだろうと本人が語っている。"},
      {h:"動機", body:"天下一の軍師になることが目標だが、その根にあるのは信の夢を叶えて一緒に幸せになりたいという、もっと個人的な願いのほう。"},
      {h:"折れない", body:"武はないが、極限の盤面で投げ出さない粘りがある。蕞でも朱海平原でも、崩れかけた状況の中で指示を出し続けた。"}
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
      {h:"小ネタ", body:"史実の羌瘣は男性。キングダムでは女性として描き直された人物の一人で、楊端和と並ぶ大きな改変になっている。"},
      {h:"無関心の裏", body:"静かで淡々としているが、線を越えた場面では必ず動く。蛇甘平原では呉慶軍の歩兵に殺されかけた尾平を一切の躊躇なく助けているし、呂不韋の暗殺計画の夜には遠回しに信へ王宮へ近づくなと警告している。信との決闘でも本気で殺す気配はなかった。"},
      {h:"剣の格", body:"人間業を超えると評される剣の使い手で、一振りで複数人を両断できる。同時に制御も精確で、初対決では信を出血させずに服だけを切り、体格差を無視して叩き伏せた。以後の稽古でも一貫して信の上を行き続けている。"},
      {h:"敵からの評価", body:"李牧は羌瘣について、まともに当たるなら倍の兵が要ると評した。信・王賁・蒙恬と並んで、同世代でもっとも危険な指揮官の一人として敵国側から認識されている。"},
      {h:"儀式の器", body:"蚩尤の継承儀式に出ていれば蚩尤の座を得ていただろうと言われるほどの器だった。その座ではなく羌象との約束を選んで里を出たことが、彼女の生き方の出発点になっている。"},
      {h:"常識の欠落", body:"里で育ち、姉貴分の羌象からでたらめな知識を教わったせいで、世間一般の常識が丸ごと抜け落ちている。距離感や作法のずれで飛信隊の笑いになる場面の根はここにある。"},
      {h:"信との距離", body:"当初は目的のための潜伏先でしかなかった飛信隊が、いつの間にか帰る場所になっていく。信に対しても、稽古で叩きのめす相手から、隣に並んで戦う相手へと関係が変わっていった。"}
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
      {h:"小ネタ", body:"モデルは実在の秦の将軍・王齮。史実では記録の少ない人物で、作中の圧倒的な存在感はほぼ原作の創作にあたる。"},
      {h:"六大将軍最強", body:"攻めと守りのどちらも高い水準でこなす稀有な将で、蒙武のような偏りがない。死の時点で敵国から最も憎まれていた秦の将であり、六将の中でも最強だと噂されていた。"},
      {h:"摎との約束", body:"城を百獲ったら嫁にするという約束を交わしていた。摎に言い寄った他隊の兵を惨たらしく処分した逸話が残るほど、この件についてだけは冗談抜きだった。"},
      {h:"戦況の読み", body:"戦場全体を掌の上で転がすと評される差配で、蒙武の突撃さえ駒として使い切る。馬陽では趙軍の罠の気配を承知したうえで、あえて踏み込んでいる。"},
      {h:"軽口の人", body:"昌文君を恋人だと言ってからかい、信を口説くような冗談も飛ばす。相手を挑発して反応を楽しむ癖があり、圧倒的な重圧と軽口が同居しているのが王騎という人物。"}
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
      {h:"小ネタ", body:"王騎からは自分と同等と評された実力者。王騎の口調や笑い方を真似ることがあり、蒙武には悪趣味だと嫌がられている。"},
      {h:"隙のない将", body:"王騎の副官として無数の戦場を生き延びた経験から、付け入る隙がほとんどない。蒙武・桓騎・王翦がそれぞれ致命的な弱点を抱えるのに対し、欠点がない唯一の将と評される。"},
      {h:"冷静な観察者", body:"最悪の状況でも表情を変えず、戦場を分析してから動く。自分の力量にも、認めた相手の力量にも絶対の確信を持っている。"},
      {h:"王騎の影", body:"口調も笑い方も亡き主君に似せており、蒙武からは悪趣味だと嫌がられた。それでも、王騎の軍をそのまま引き継いで解散させなかったのはこの男だけができたこと。"},
      {h:"軽口", body:"真面目な物腰の裏で、隙あらば冗談を挟む。標的はたいてい録嗚未で、王騎の代からの構図がそのまま続いている。"}
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
      {h:"小ネタ", body:"愛馬の名は淵（えん）。"},
      {h:"父に認められず", body:"将としての実力がありながら、父に正当に認められなかったことを悲しんでいた。それでも剣を置かず、天下の大将軍になると誓い続けた。"},
      {h:"攻めの将", body:"攻撃型の指揮官で、廉頗にも評価されるほどの戦の才を持っていた。第一次六大将軍の一角として、当時の中華を支配した軍人の一人である。"},
      {h:"戦う理由", body:"昌文君には、自分が戦うのは子どもの頃に王騎と交わした約束のためだと語っていた。城を落とし続けた動機は、出世でも名声でもなかった。"}
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
      {h:"小ネタ", body:"作戦を練り込むと徹夜が続き、周囲が心配するほど根を詰める。モデルは史実の昌平君。"},
      {h:"軍総司令", body:"秦の軍を差配する立場にあり、その知略は李牧・媧燐・春申君といった各国の頭脳と同列に語られる。加えて本人の武もかなり高いという珍しい型。"},
      {h:"才能を見抜く目", body:"信の資質を早い段階で見抜き、自ら引き込もうとした。相手が隠しているつもりの情報を、わずかな挙動から読み取る勘の鋭さがある。"},
      {h:"呂不韋との距離", body:"もともと呂不韋の四柱でありながら、自分の目的を持ち続け、恩人の汚れ仕事からは距離を取っていた。どちらの側とも言い切れない立ち位置が長く続く。"},
      {h:"感情を出さない", body:"常に眉間に皺を寄せていて、何を考えているか読み取りにくい。戦の設計に入ると徹夜が続き、周囲が心配するほど根を詰める。"}
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
      {h:"小ネタ", body:"声が異常に大きい。六大将軍の復活を望んでいたのは、自分がそこに座るためでもあった。"},
      {h:"傲慢だった頃", body:"当初は自分こそ中華最強の将軍だと信じ、六大将軍の復活を自分が中心になって果たすつもりでいた。当時最も敬われていた王騎を過去の遺物と切り捨てるほどだった。"},
      {h:"馬陽で折られる", body:"その傲慢さが馬陽で命取りになりかける。判断の甘さが戦局を悪くし、王騎の死という結果に自分も関わってしまう。この経験がその後の蒙武を変えていく。"},
      {h:"戦術を超える力", body:"策を積み上げるのではなく、純粋な力で盤面をひっくり返すのが蒙武の戦い方。策より強い力というものが実在することを、この男は戦場で証明してみせる。"},
      {h:"昌平君との関係", body:"義兄弟の契りを交わした親友であり、あの昌平君から一目置かれている数少ない相手。頭でも腕でも敵わないと昌平君に言わせた場面もある。"}
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
      {h:"人物像", body:"明るく人懐こく、常に軽口を叩いている。ただしその態度は狡猾さを隠す膜で、戦況が動いた瞬間に別の顔が出る。"},
      {h:"軽さの裏", body:"明るく人懐こく、常に冗談を飛ばしている。だがそれは狡猾な思考を隠す膜で、局面が動いた瞬間に別の顔が出る。必要なら父や祖父の影響力を使うことにも躊躇がない。"},
      {h:"身分を見ない", body:"名門の出でありながら、相手の身分で態度を変えない。信のような平民出身とも自然に付き合える点が、王賁との対比になっている。"},
      {h:"家族", body:"蒙家では三代でもっとも才があると祖父・蒙驁に言われた。その祖父が廉頗軍に傷つけられた場面では、無謀とも言える突撃を見せている。"},
      {h:"楽華隊", body:"知略と柔軟さで戦う部隊で、力の飛信隊・規律の玉鳳隊とは第三の型を担う。三隊が並ぶことで秦の若い世代の層の厚さが可視化される。"}
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
      {h:"異名", body:"秦王の剣。名門・王一族の跡取りとして、家の格に見合う戦果を出し続けることを自分に課している。"},
      {h:"階級への意識", body:"身分が下の者が戦うこと自体は認めるが、自分たち貴族と同列に並ぶことは認めない。一方で秩序には忠実で、政が現れれば即座に膝をつき、王を貶める発言には真っ先に反論する。"},
      {h:"玉鳳という型", body:"速さと精度の槍から始まり、後には魏火竜七師の紫伯級の破壊力を伴うと味方に評されるまでになる。同世代でも総合力は最上位に位置づけられている。"},
      {h:"誇りと孤独", body:"軍の指揮官であることに強い誇りを持ち、それが傲慢に見えるほど徹底している。名門の看板を背負っているぶん、負けが自分だけの問題では済まない。"},
      {h:"信と蒙恬", body:"下僕上がりの信を露骨に見下すところから始まった関係が、戦場を重ねるごとに相互承認へ変わっていく。蒙恬を含めた三人は、比べられ続けることで伸びた世代でもある。"}
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
      {h:"小ネタ", body:"異名は本能型の権化。勝つためなら兵の損耗も辞さない苛烈さがあり、呉慶の策の意図もその嗅覚で見抜いた。"},
      {h:"火の思想", body:"戦は燃え盛る炎のようなもので、最も勢いのある瞬間に叩くべきだという考えを持っていた。勝つためなら兵の損耗も辞さない苛烈さがある。"},
      {h:"読みの鋭さ", body:"呉慶が蛇甘平原へ戦場を誘導した意図を見抜き、その地形が魏の戦車に有利であることまで理解していた。本能型と呼ばれるが、勘の中身は極めて具体的である。"},
      {h:"軍師殺し", body:"麃公の意図を読むのは至難だと敵将に言わしめ、挑んできた策士型の将を何人も踏み潰してきた。理屈で来る相手ほど、この男には勝てない。"},
      {h:"敵への敬意", body:"呉慶の強さを認めたうえで一騎打ちに応じるなど、強敵には敬意を払う。信を引き上げたのも、身分ではなく戦場での中身だけを見ていたから。"}
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
      {h:"異名", body:"死王、山界の王、そして後には秦の四大将軍の一角。"},
      {h:"王としての資質", body:"山の民は野蛮と見られているが、楊端和自身は政の提案を聞き、理で応じる柔軟さを持つ。強い意志と統率力で全部族を従わせており、命令に逆らう者はいない。"},
      {h:"戦場での顔", body:"盤外では冷静でも、戦場では敵を皆殺しにしろと命じ、自ら先頭で突っ込む苛烈さを見せる。同時に部下のためなら自分の命を危険に晒すことも厭わない。"},
      {h:"李牧の評価", body:"合従軍の折、李牧は楊端和を正面から倒すなら自軍の戦力の半分以上を失うと認めていた。秦の同盟者という以前に、単体で恐れられる存在である。"},
      {h:"目的", body:"中華統一を目指す政に対し、楊端和が見ているのは山界の統一。方向の違う二つの野心が同じ盤上で噛み合っているという関係になっている。"}
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
    role:"秦国相国 / 失脚後に自害", klass:"文官", first:"3巻", arc:"王都奪還編〜鄴攻略戦", status:"自害",
    tags:["相国","商人","四柱","権力"],
    summary:"商人から相国に上り詰めた実権者。政の最大の政敵。",
    detail:[
      {h:"経歴", body:"元は一商人。政の父・子楚を『商品』として王位に押し上げ、その見返りに国政の頂点に立った。"},
      {h:"思想", body:"血統ではなく力と金が世を動かすという合理主義。王を飾りとして扱う。"},
      {h:"体制", body:"四柱（昌平君・李斯・蔡沢・司馬空）を通じて軍・法・外交・土木を掌握している。"},
      {h:"人物像", body:"抜け目のない野心家で、賭け事を好み、運を掴む勘に長けている。欲しいものは必ず取りに行き、そのための手段を選ばない。"},
      {h:"小ネタ", body:"虎の子を膝に乗せて酒を飲む場面がある。作中で私生活の享楽まで描かれる数少ない大物。"},
      {h:"賭け事の男", body:"抜け目のない野心家で、賭け事を好み、運を引き寄せる勘がある。欲しいものは必ず取りに行き、そのためにどんな手段も選ばない。"},
      {h:"王を作った男", body:"権力を得るために、自分の許嫁を先代の秦王に差し出してまで信を得た。政の父を商品として王位に押し上げ、その見返りに国政の頂点へ上っている。"},
      {h:"暗殺を認める", body:"王への暗殺未遂を自分の仕業だと公然と認めてみせた。それを罰する力が政にないことを突きつけるための行動で、権力闘争のやり方が徹底している。"},
      {h:"圧と求心力", body:"趙との同盟の場では、李牧軍の兵すら怯むほどの圧を放った。人を惹きつける力も本物で、四柱をはじめとする巨大な派閥を作り上げている。"}
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
      {h:"何をしたか", body:"政と信を執拗に追い、黒卑村では里典の息子・有の脚を刺して信の行き先を尋問した。暗殺そのものは号馬の乱入によって機を失い、燕程は一度捕縛されるも脱走している。"},
      {h:"蚩尤の配下だった一族", body:"朱凶はもともと蚩尤に二百年以上仕えてきた一族で、蚩尤の巫女に対して強い敬意を持っていた。序盤では単なる刺客集団に見えるが、羌瘣の一族と主従で繋がっている背景がある。"}],
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
      {h:"最期", body:"蚩尤となって外の世界を見たいという気持ちと、妹同然の羌瘣を殺めたくないという気持ちが葛藤し、“祭”の日に羌瘣を香で眠らせて一人で挑むが、幽連に謀殺された。白鳳はのちに羌礼へ受け継がれる。"},
      {h:"二歳上の姉貴分", body:"羌瘣より二歳上で、里では姉のように振る舞っていた。十五で死にたくない、外の世界を見てから死にたいと願う一方、羌瘣の手にかかるならそれでもいいとまで思っていた。"},
      {h:"眠り薬", body:"儀式の前夜、羌象は羌瘣に眠り薬を盛って儀式に出られないようにした。自分が勝って蚩尤になり、そのうえで二人で里を出るというのが本来の計画だった。"},
      {h:"包囲", body:"計画は幽連に読まれる。最大の脅威として全候補の包囲を受け、それでも一人で全員を相手に持ちこたえた末に討たれた。羌瘣を除けば、候補の中で頭ひとつ抜けた腕前だったと語られている。"}],
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
      {h:"最期", body:"楼山（ろうざん）で羌瘣に討たれる。"},
      {h:"正式な蚩尤", body:"幽連は儀式を勝ち抜いて蚩尤の名を正式に継いだ人物。腕だけでなく策で勝った点が特徴で、暗殺という仕事に合わせて、影に潜み相手を欺くための訓練を積み重ねてきた。"},
      {h:"掟の抜け道", body:"候補同士の共闘は掟で禁じられているが、長老の同意があれば例外が認められる。幽連はこれを利用し、最大の脅威である羌象を全員で潰すよう他の候補たちを説得した。羌象を仕留めた後、残りの候補も自分で片付けている。"},
      {h:"妹殺し", body:"究極の蚩尤に至るため、最後に残った実の妹を自らの手にかけた。情を断って空になることが強さだという一族の教えを、誰よりも忠実に実行した人物だった。"},
      {h:"最期の問い", body:"羌瘣に敗れて死ぬ間際、巫舞の思想と蚩尤の教えに対する反証が存在することに恐怖する。自分が最強でないなら、これまでやってきたことは何だったのかと問い、羌瘣も同じ場所に堕ちると言い残して息絶えた。"}],
    battles:[],
    rel:[{to:"kyoukai", label:"仇敵"},{to:"kyoushou", label:"殺害"},{to:"f_shiyuu", label:"一族"}]
  },

  /* ───────────── 蚩尤族（羌瘣の一族） ───────────── */
  {
    id:"kyoumei", name:"羌明", yomi:"きょうめい", kind:"person", state:"蚩尤", group:"羌族",
    role:"蚩尤族の元候補", klass:"刺客", first:"34巻", arc:"羌瘣の復讐編", status:"存命",
    tags:["蚩尤","儀式","逃亡"],
    summary:"儀式の前夜に恐怖から逃げ出した候補。追手を斬り殺して生き延びた。",
    detail:[
      {h:"逃亡",body:"十五の時、自分は誰にも負けないと信じていたが、各族の候補が次々に集まってくるのを見て、自分の順位がどれほど低いかを思い知る。勝ち目がないと悟った儀式の前夜、羌明は里から逃げ出した。"},
      {h:"追手を斬る",body:"追ってきた同族八人のうち七人を斬り殺して逃げ延びる。正気を失いかけた獣のような生存本能で、里の掟より自分の命を選んだ。"},
      {h:"意味",body:"儀式に出て死んだ者、勝って蚩尤になった者、そして逃げた者。羌明は三つ目の道を示す存在で、羌瘣が選ばなかった選択肢そのものとして置かれている。"}
    ],
    battles:[],
    rel:[{to:"f_shiyuu", label:"羌族"},{to:"kyoukai", label:"同族"},{to:"yuren", label:"同期の候補"}]
  },
  {
    id:"gakyou", name:"峨郷", yomi:"がきょう", kind:"person", state:"蚩尤", group:"峨族",
    role:"蚩尤族 峨族の候補", klass:"刺客", first:"10巻（回想）", arc:"蚩尤編（回想）", status:"戦死",
    tags:["蚩尤","峨族","儀式"],
    summary:"峨族から儀式に出た剣士。羌象を潰すための包囲に加わった一人。",
    detail:[
      {h:"峨族",body:"蚩尤の十九の族のうち、作中で名前が出る三族のひとつ峨族の候補。族ごとに衣装も鉢巻の紋様も異なり、峨郷もその族の印を背負って儀式に臨んだ。"},
      {h:"儀式",body:"幽連の説得に乗り、最大の脅威だった羌象へ全員で襲いかかる側に回る。掟では候補同士の共闘は禁じられているが、長老の同意があれば例外が認められるという抜け道が使われた。"},
      {h:"最期",body:"羌象を仕留めた後、幽連によって残りの候補もろとも片付けられる。共闘を持ちかけた側が最後に全部を刈り取るという構図だった。"}
    ],
    battles:[],
    rel:[{to:"yuren", label:"共闘"},{to:"kyoushou", label:"襲撃"},{to:"f_shiyuu", label:"峨族"}]
  },
  {
    id:"entei", name:"円貞", yomi:"えんてい", kind:"person", state:"蚩尤", group:"朱凶",
    role:"朱凶の刺客", klass:"刺客", first:"9巻", arc:"暗殺者編", status:"存命",
    tags:["朱凶","蚩尤","刺客","暗殺者編"],
    summary:"朱凶に属する刺客。武力88の使い手で、蚩尤の系譜に連なる。",
    detail:[
      {h:"朱凶と蚩尤",body:"朱凶はもともと二百年以上にわたって蚩尤に仕えてきた一族で、蚩尤の巫女に強い敬意を払ってきた。円貞はその朱凶の刺客であり、羌瘣の一族とは主従の側から繋がっている。"},
      {h:"腕",body:"武力88と、名のある将にも届く水準の使い手。暗殺という仕事に最適化された動きで、正面からの戦いを前提とする武将とは戦い方の質が違う。"},
      {h:"暗殺者編",body:"呂不韋側の意を受けて政の命を狙う一連の動きの中で姿を見せる。朱凶という集団が単なる雑兵ではなく、背景を持った一族であることを示す人物。"}
    ],
    battles:[],
    rel:[{to:"shukyou", label:"所属"},{to:"f_shiyuu", label:"仕える"},{to:"sei", label:"標的"},{to:"kyoukai", label:"同系譜"}]
  },

  /* ───────────── 蚩尤の族 ───────────── */
  {
    id:"f_kyouzoku", name:"羌族", yomi:"きょうぞく", kind:"faction", state:"蚩尤", group:"蚩尤の十九族",
    role:"蚩尤族の一族", klass:"勢力", first:"9巻", arc:"蚩尤編", status:"—",
    tags:["蚩尤","羌瘣","十九族"],
    summary:"羌瘣・羌象・羌礼・羌識を育てた族。作中でもっとも深く描かれる蚩尤の一族。",
    detail:[
      {h:"育て方", body:"長老が幼い娘たちを引き取り、巫舞・剣術・暗殺術を叩き込む。羌象・羌瘣・羌識・羌礼の四人は姉妹のように育てられ、そのうえで一人しか生き残れない儀式に送り出される。"},
      {h:"儀式で失ったもの", body:"羌象を儀式で失い、後年の祭では羌識も失った。族としては蚩尤を二度輩出しながら、その代償に何人もの娘を失っている。"},
      {h:"現在", body:"羌瘣は秦の将となり、羌礼は現・蚩尤として羌瘣のもとにいる。里の外へ出た二人が族の系譜をそのまま平地へ持ち出した形になっている。"}
    ],
    rel:[{to:"f_shiyuu", label:"十九族の一"},{to:"kyoukai", label:"出身"},{to:"kyoushou", label:"出身"},{to:"kyourei", label:"出身"},{to:"kyoushiki", label:"出身"},{to:"kyoumei", label:"出身"}]
  },
  {
    id:"f_yuuzoku", name:"幽族", yomi:"ゆうぞく", kind:"faction", state:"蚩尤", group:"蚩尤の十九族",
    role:"蚩尤族の一族", klass:"勢力", first:"17巻", arc:"蚩尤編", status:"—",
    tags:["蚩尤","幽連","楼山","十九族"],
    summary:"先代の蚩尤・幽連を出した族。趙の楼山に本拠を置く。",
    detail:[
      {h:"本拠", body:"趙の楼山に拠点を構えており、羌瘣が仇を追ってたどり着いたのもこの山。あの山が今の蚩尤・幽連の本拠だ、という言い方で作中に登場する。"},
      {h:"幽連の代", body:"幽連が蚩尤の名を継いだことで、族としての力も一族の中で大きくなった。蚩尤という称号が、単なる個人の名誉ではなく族の勢力に直結することが分かる。"},
      {h:"終わり方", body:"羌瘣が楼山で幽連を討ったことで、幽族が握っていた蚩尤の座は空く。次にその座を継ぐのは羌族の羌礼になる。"}
    ],
    rel:[{to:"f_shiyuu", label:"十九族の一"},{to:"yuren", label:"出身"},{to:"kyoukai", label:"討たれる"}]
  },
  {
    id:"f_gazoku", name:"峨族", yomi:"がぞく", kind:"faction", state:"蚩尤", group:"蚩尤の十九族",
    role:"蚩尤族の一族", klass:"勢力", first:"10巻（回想）", arc:"蚩尤編（回想）", status:"—",
    tags:["蚩尤","峨郷","十九族"],
    summary:"峨郷を儀式に送り出した族。作中で名前の出る三族のひとつ。",
    detail:[
      {h:"位置づけ", body:"羌族・幽族と並んで作中で名前が確認できる蚩尤の族。族ごとに候補者の衣装も鉢巻の紋様も異なり、峨郷もその印を背負って儀式に出た。"},
      {h:"儀式での役回り", body:"峨郷は幽連の説得に乗り、最大の脅威だった羌象を全員で潰す側に加わる。族の垣根を越えた共闘が、掟の例外として認められた場面でもある。"}
    ],
    rel:[{to:"f_shiyuu", label:"十九族の一"},{to:"gakyou", label:"出身"}]
  },

  /* ───────────── 蚩尤以外の暗殺者一族 ───────────── */
  {
    id:"f_shukyou", name:"朱凶一族", yomi:"しゅきょう", kind:"faction", state:"複数", group:"暗殺者一族",
    role:"暗殺者の氏族", klass:"勢力", first:"2巻", arc:"王都奪還編〜", status:"—",
    tags:["暗殺者","蚩尤","破門","円貞"],
    summary:"二百年以上蚩尤に仕え、のちに破門された暗殺者一族。頭領は円貞。",
    detail:[
      {h:"蚩尤との関係", body:"二百年以上前から蚩尤に仕えてきた一族で、いまも蚩尤の巫女には強い敬意を払う。秦での氏族会合では、他の一族が見ている前で羌瘣に膝をついたほど。"},
      {h:"破門", body:"ある時点で理由の明かされないまま蚩尤から破門され、追放された。にもかかわらず敬意だけは残しているという、ねじれた関係が続いている。"},
      {h:"見た目", body:"深紅と黒の長衣をまとい、目の周りに紋様を入れる。作中で確認できるのは男性の構成員のみ。"},
      {h:"作中での役回り", body:"序盤では成蟜派や呂不韋派に雇われて政の命を狙う実行部隊として現れる。頭領の円貞は、かなりの遣い手だと噂される人物。"}
    ],
    rel:[{to:"f_shiyuu", label:"元・臣従"},{to:"entei", label:"頭領"},{to:"shukyou", label:"同一勢力"},{to:"jokan", label:"構成員"},{to:"kyoukai", label:"敬意"}]
  },
  {
    id:"f_kensen", name:"剣仙一族", yomi:"けんせん", kind:"faction", state:"複数", group:"暗殺者一族",
    role:"暗殺者の氏族", klass:"勢力", first:"9巻", arc:"暗殺者編", status:"—",
    tags:["暗殺者","誇り","暗殺者編"],
    summary:"暗殺者は影で働くべきという信条を持つ主要氏族。蚩尤にだけは敬意を払う。",
    detail:[
      {h:"信条", body:"暗殺者は影で仕事をするものであり、戦場に出るべきではないという考えを持つ。自分たちの腕への誇りが強く、他の氏族には敵意を向けるが、蚩尤に対してだけは一定の敬意を示す。"},
      {h:"暗殺者編", body:"呂不韋に雇われ、蚩尤・朱凶・剛摩・赫力とともに王宮へ潜入する。しかし信に真正面から七人を斬られ、残った二人は態勢を立て直すために退いた。"},
      {h:"意味", body:"暗殺者という職能が一つの巨大な世界を成していることを示す一族。羌瘣の異常さが、その世界の中でどれだけ突出しているかを測る物差しにもなっている。"}
    ],
    rel:[{to:"f_shiyuu", label:"敬意"},{to:"shin", label:"交戦"},{to:"ryofui", label:"雇われる"}]
  },
  {
    id:"f_gouma", name:"剛摩一族", yomi:"ごうま", kind:"faction", state:"複数", group:"暗殺者一族",
    role:"暗殺者の氏族", klass:"勢力", first:"9巻", arc:"暗殺者編", status:"—",
    tags:["暗殺者","選民意識","暗殺者編"],
    summary:"闇に溶ける装束をまとう氏族。他の暗殺者を格下と見なす選民意識が強い。",
    detail:[
      {h:"装束", body:"背景に溶ける暗色の衣をまとい、口と鼻を覆う面をつける。髪は後ろで束ね、剣は背中に負う。"},
      {h:"気質", body:"他の暗殺者一族を格下と見下す傲慢さがある一方、警戒すべき相手には全力を出す慎重さも持つ。標的を潰すためなら数の有利を平然と使う。"},
      {h:"蚩尤への態度", body:"見下し癖のある一族だが、蚩尤に対してだけは相応の敬意を示す。暗殺者の世界における蚩尤の別格ぶりが、ここでも確認できる。"}
    ],
    rel:[{to:"f_shiyuu", label:"敬意"},{to:"ryofui", label:"雇われる"},{to:"f_kensen", label:"同席"}]
  },
  {
    id:"f_kakuriki", name:"赫力一族", yomi:"かくりき", kind:"faction", state:"複数", group:"暗殺者一族",
    role:"暗殺者の氏族", klass:"勢力", first:"9巻", arc:"暗殺者編", status:"—",
    tags:["暗殺者","怪力","暗殺者編"],
    summary:"筋骨隆々の男たちで構成される力任せの氏族。技より膂力で殺す。",
    detail:[
      {h:"見た目", body:"眉のない坊主頭で、衣の下に異様に発達した肉体を持つ。力を出すときは顔に血管が浮き上がる。"},
      {h:"やり方", body:"言葉づかいは粗く、目の前の敵には即座に襲いかかる。技巧で仕留める他の一族と違い、単純な膂力で標的を潰しにいく。"},
      {h:"暗殺者編", body:"王宮に潜入した際、迷い込んできた河了貂の首を掴んで殺そうとしたところへ羌瘣が現れる。この場面が、羌瘣という個人と暗殺者一族の格差をはっきり見せた。"}
    ],
    rel:[{to:"f_shiyuu", label:"同席"},{to:"tenn", label:"襲う"},{to:"kyoukai", label:"制圧される"},{to:"ryofui", label:"雇われる"}]
  },
  {
    id:"f_bessa", name:"伯紗族", yomi:"はくさぞく", kind:"faction", state:"楚", group:"南方の部族",
    role:"南方の毒の部族", klass:"勢力", first:"1巻", arc:"王都奪還編", status:"—",
    tags:["毒","楚","南方","ムタ"],
    summary:"かすり傷でも人が死ぬ毒を扱う、楚の南東に住む部族。",
    detail:[
      {h:"毒", body:"吹き矢に塗られた毒は、かすっただけで命を奪う。技でも力でもなく毒で殺すという、暗殺者の世界でも異質な手段を持つ。"},
      {h:"土地", body:"かつて越と呼ばれた地域の南、楚の南東の海沿いに住む。中華の戦乱からは距離のある場所で、外から来た依頼を受けて動く。"},
      {h:"作中での登場", body:"王都奪還編で、ムタが政・信・河了貂を追う刺客として現れる。匂いで標的を追う嗅覚と追跡能力を見せた。後年、秦が楚を攻めた際には楚の側で戦っている。"}
    ],
    rel:[{to:"muta", label:"出身"},{to:"f_so", label:"協力"},{to:"sei", label:"標的"}]
  },

  /* ───────────── 刺客（個人） ───────────── */
  {
    id:"jokan", name:"徐完", yomi:"じょかん", kind:"person", state:"複数", group:"朱凶",
    role:"朱凶の刺客", klass:"刺客", first:"1巻", arc:"王都奪還編", status:"戦死",
    tags:["朱凶","刺客","漂","初戦"],
    summary:"漂を死に至らしめた刺客。信が生涯で最初に討った敵。",
    detail:[
      {h:"何をした男か", body:"成蟜派に雇われて政の暗殺を請け負った朱凶の刺客。王騎軍が王の護衛部隊を襲った混乱の中で、影武者だった漂に致命傷を与えた張本人にあたる。"},
      {h:"人物", body:"自分の腕に自信を持つ一方、追い込まれると搦め手に走る。同情を引いて相手の警戒を緩めさせようとするなど、狡猾で傲慢な質だった。"},
      {h:"最期", body:"信との命のやり取りに敗れて討たれる。信が生死を賭けた戦いで倒した最初の相手であり、この一戦から信の戦歴が始まる。"}
    ],
    battles:["b_outo"],
    rel:[{to:"hyou", label:"討った"},{to:"shin", label:"討たれた"},{to:"f_shukyou", label:"所属"},{to:"seikyou", label:"雇われる"},{to:"sei", label:"標的"}]
  },
  {
    id:"muta", name:"ムタ", yomi:"むた", kind:"person", state:"楚", group:"伯紗族",
    role:"伯紗族の刺客", klass:"刺客", first:"1巻", arc:"王都奪還編", status:"戦死",
    tags:["毒","伯紗族","刺客","王都奪還編"],
    summary:"楚の南から来た毒使い。逃亡中の政たちを執拗に追った。",
    detail:[
      {h:"毒使い", body:"我が毒に敵はいないと言い切る吹き矢の使い手。かすり傷でも致命傷になる伯紗族の毒を武器に、正面からの戦闘力とは別の脅威として立ちはだかる。"},
      {h:"人物", body:"自分の部族と戦い方に強い誇りを持ち、伯紗族の流儀が他のどの流派にも劣らないと繰り返し証明しようとした。標的に至る道を塞ぐ者は誰であれ殺す。"},
      {h:"見た目", body:"蓑のような外套を羽織り、顔には塗料を入れている。河了貂の格好とよく似ており、中華の外から来た者という印象を強く与える。"}
    ],
    battles:["b_outo"],
    rel:[{to:"f_bessa", label:"出身"},{to:"sei", label:"標的"},{to:"shin", label:"交戦"},{to:"tenn", label:"交戦"}]
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
      {h:"小ネタ", body:"呂布に重ねられることが多い。尾到・番陽と声優が同じ。"},
      {h:"武神という思想", body:"天が畏れる存在は一人でいいという確信のもとに生きている。武の伸びしろを見抜く目を持ち、まだ子どもだった信や羌瘣ですら、将来の脅威になり得るなら殺そうとした。"},
      {h:"その場に凍る圧", body:"対面した兵が動けなくなるほどの威圧を放つ。武の結晶と呼ばれ、恐ろしいほど純粋だと評される。大将軍を複数討ち取り、羌瘣の巫舞の最深部すら破っている。"},
      {h:"割り切り", body:"王騎を仕留めた際、魏加の背後からの矢によって崩れたところを突いた事実を、龐煖は特に恥じていない。武の高みを目指す一方で、勝敗そのものには現実的な割り切りがある。"},
      {h:"古い口調", body:"一貫して古めかしい言葉づかいで話す。時代からずれた存在であることが、話し方の面でも徹底されている。"}
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
      {h:"小ネタ", body:"秦の六大将軍を、自分を理解できる数少ない友と見なしていた。昭王時代の大将軍で唯一、現在も存命の人物。"},
      {h:"三つの顔", body:"戦が始まる前は緻密な策を組む戦略型、始まれば流れを直感で読む本能型に切り替わる将。この使い分けができる点が、廉頗を別格にしている。"},
      {h:"六大将軍は友", body:"秦の六大将軍を最も憎い敵であると同時に、自分を理解できる数少ない友だと語った。王騎を自宅に招いて酒を酌み交わしたこともある。"},
      {h:"四天王を抱く", body:"戦の前に四天王を一人ずつ抱きしめて士気を上げるのが廉頗軍の習慣。飢えていた輪虎を拾って育てたのもこの男で、荒々しさと情の深さが同居している。"},
      {h:"戦を求めて渡る", body:"趙を出て魏へ、魏を出て楚へ。国を替えてでも戦場に立ち続ける生き方を選んでいる。昭王時代の大将軍で唯一、いまも生きている人物でもある。"}
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
    role:"将軍 / 謀略型", klass:"軍師", first:"19巻", arc:"山陽攻略戦〜", status:"存命",
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
      {h:"小ネタ", body:"第16巻あたりの群衆に、仮面をつけた将らしき人物が紛れている。騰と並ぶ新六大将軍の古参。"},
      {h:"必ず勝てる戦しかしない", body:"廉頗に向かって、自分は必ず勝てる戦以外に興味がないと言い切った男。無駄な感情を全部捨てたうえで、常に最も効率のよい手だけを組み立てる。その冷たさこそが王翦の強さだと評されている。"},
      {h:"言葉が少ない", body:"命令の理由をほとんど説明せず、声を荒げることもない。息子の王賁は、この父を余計な感情を捨て去った人間だと表現した。本人も自分は言葉が足りない質だと認めている。"},
      {h:"読めない野心", body:"王翦には、自分の国を建てたいという野心があるのではないかと噂される。秦の将でありながら、どこまで秦のために動いているのかが最後まで見えない。"},
      {h:"圧", body:"対峙した相手が感じる重圧は六大将軍級と評される。戦場では前に出ずに全体を組み替え続け、気づいたときには相手の負け筋だけが残っている。"}
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
      {h:"最期", body:"秦趙の国境で命を落とす。追手を引き受け、政を秦側へ渡し切ってからの死だった。"},
      {h:"交渉人", body:"趙の闇商人の世界では名の知れた存在で、交渉では容赦なく押す。一度結んだ約束は自分の命が懸かっても守り抜くという一線を持っていた。"},
      {h:"戦える商人", body:"弓の名手でもあり、逃避行では趙の騎兵を複数射殺している。剣もある程度使えた。ただの守られる側の人物ではない。"},
      {h:"政に与えたもの", body:"仕事として引き受けた子どもを、一人の人間として扱った。政が光と呼ぶものの正体はこの扱われ方そのもので、後年の演説の芯にもなっている。"}
    ],
    battles:[],
    rel:[{to:"sei", label:"救った"},{to:"ryofui", label:"（政の論拠）"}]
  },

  /* ───────────── 趙（合従軍編） ───────────── */
  {
    id:"riboku", name:"李牧", yomi:"りぼく", kind:"person", state:"趙", group:"李牧軍",
    role:"趙三大天 / 合従軍の頭脳", klass:"軍師", first:"16巻", arc:"馬陽の戦い〜", status:"存命",
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
      {h:"異名", body:"雁門の救世主。北の異民族から国境を守り抜いた実績が、趙における彼の地位の土台になっている。"},
      {h:"農夫でありたかった男", body:"名声にも地位にも興味がなく、本心では農場で家族と静かに暮らしたいと願っている。肉体労働をむしろ好み、雁門にいた頃も、失脚して追放された後もそうしていた。"},
      {h:"手段を選ばない", body:"温厚な物腰とは裏腹に、勝つためなら卑怯と呼ばれる手を平然と使う。王騎と龐煖の一騎打ちで背後から射ることを是とした判断が、その本質を端的に示している。"},
      {h:"史上最強の三大天", body:"王騎や劇辛といった旧世代を超えた存在として、趙の三大天の歴史でも最強と位置づけられる。政も蔡沢も、中華統一の最大の障害はこの男だと認めていた。"},
      {h:"同盟を裏切る", body:"山陽を秦に取られた後、同盟関係にありながら秦を裏切る判断を下す。感情ではなく、国の損得だけで動けるという点でこの人物は徹底している。"}
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
      {h:"人物像", body:"戦のことだけを冷静に考え抜く技術者型。父・呉慶の遺志を継ぎ、秦に一矢報いることを自分の使命にしている。異名は魏の筆頭将軍、そして火竜。"},
      {h:"父の仇", body:"呉慶を討った麃公の首を取ると誓っていた。国への愛国心と父の遺志が、この男の行動原理をすべて説明する。"},
      {h:"駒として使う", body:"勝つためなら人を駒として使うことに躊躇がない。身代わりを仕立てて飛信隊の追撃から逃れ、かつての師である霊凰さえ戦場で切り捨てている。"},
      {h:"魏の頂点", body:"合従軍では媧燐と並んで戦の天才と呼ばれた。侵攻後は魏軍の序列第一位となり、国そのものの軍事を背負う立場になる。"}
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
    role:"将軍 / 元野盗の頭", klass:"武将", first:"19巻", arc:"山陽攻略戦〜宜安・肥下の戦い", status:"戦死",
    tags:["非道","奇襲","将軍位","黒羊"],
    summary:"野盗から将軍位に上り詰めた男。常識の外側から勝ちを取りにいく。",
    detail:[
      {h:"人物", body:"合従軍撃退の功で王翦・楊端和と並び将軍位に就く。飄々として底が読めず、味方でさえその判断を先読みできない。"},
      {h:"戦い方", body:"正面からぶつからず、相手が想定していない一手で盤面を壊す。そのためには住民を巻き込むことも躊躇わない。"},
      {h:"信との対立", body:"黒羊では飛信隊を指揮下に置く。勝つための非道と、信が持つ将としての線引きが真正面から衝突する。"},
      {h:"最期", body:"始皇十四年の肥下。趙北部へ誘い込まれ包囲されたなか、桓騎は森で李牧本陣を奇襲し、李牧の右頭部を斬るところまで迫った。だが趙の援軍が次々到着して奇襲は失敗。黒桜・厘玉・那貴が次々に倒れ、それでも最後まで飄々としたまま討たれ戦死した。首は李牧のもとへ。"},
      {h:"残したもの", body:"摩論とオギコに「生き残った奴らに以前みたいなクソみたいな生き方をさせるな」という言葉を託した。摩論は後に桓騎軍の残党を率いて傭兵団を始める。信にとっては、最後まで理解も肯定もできないまま消えた将になった。"},
      {h:"人物像", body:"異名は首斬り桓騎。殺気とも違う何かを放っており、対峙した者が理由も分からず剣を抜いてしまうと言われる。"},
      {h:"小ネタ", body:"兵の鎧を着るのを嫌がっていた。理由は動きにくいからではなく、単に趣味に合わないから。"},
      {h:"野盗から六将へ", body:"兵法を学んだことは一度もない。それでも敵将に李牧級の戦術眼を持つと言わしめ、ほとんど負けなかった。第二次六大将軍の五人目に選ばれる。"},
      {h:"敵への態度", body:"玄峰を老いぼれ、ゴミと呼んでから斬るなど、相手への敬意が一切ない。対峙した者が理由も分からず剣を抜いてしまうほどの、殺気とも違う圧を放っていた。"},
      {h:"人事の基準", body:"弓の腕が最低のオギコを千人将にした理由を問われ、面白いから、と軽く答えている。実力主義でも情実でもない、桓騎だけの物差しで軍が回っていた。"},
      {h:"首斬り", body:"異名は首斬り桓騎。降伏した相手も民も平然と殺す一方で、自分の部下の弔いには異常な執着を見せる。この落差が、信が最後まで飲み込めなかった部分でもある。"}
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
      {h:"小ネタ", body:"沈黙の狩人という異名を付けたのは李牧本人。おまけ話では、李牧に拾われる前は孤児だったことが明かされている。"},
      {h:"三大天の空席", body:"趙の三大天に残った最後の一席を狙っていた将。李牧が最も信頼した部下であり、死の時点で趙の主要な将の五指に数えられていた。"},
      {h:"罠の思想", body:"自ら網を張って待ち、相手が引き裂かれる様を眺めるのを好む。逆に相手が罠に乗らず正体を見せないと苛立ちを募らせ、その短気が李牧の言うとおり弱点になった。"},
      {h:"礼儀正しさ", body:"言葉づかいも所作も丁寧で、獰猛さは表に出さない。沈黙の狩人という異名は、その静けさと仕掛けの精度から李牧が付けたもの。"}
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
      {h:"小ネタ", body:"自分の身長にはやや複雑な感情を持っている。それでも部下からの忠誠は厚い。"},
      {h:"味方にとっても危険", body:"臨武君の副官・魯金が忠誠を誓っている最中に処断するなど、身内であっても容赦がない。春申君ですら彼女を危険な存在だと認めていた。"},
      {h:"戦の天才", body:"楚軍の序列第二位で、春申君や騰からも戦の天才と評される。合従軍では呉鳳明と並ぶ二枚看板として扱われた。"},
      {h:"見下す言葉", body:"格下と見なした相手には徹底して侮蔑的な口をきく。それでいて部下からの忠誠は厚く、この落差が媧燐という人物の掴みにくさになっている。"}
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
      {h:"その後", body:"以降は明朗な性格に戻り、羌瘣の側近として歩兵隊の主力に。影丘では瀕死の王賁を救い、難所攻めでは先陣を切って拠点確保に貢献した。尾平の結婚披露宴のあと、昂に求婚されている。存命。"},
      {h:"四人の里", body:"羌族の里では、羌象・羌瘣・羌識とともに長老に育てられた。幼い頃の回想では、食事当番なのに蛙を一匹しか獲ってこなかった羌瘣を、三人がかりで責めている場面がある。殺し屋の養成所であると同時に、姉妹の家でもあった。"},
      {h:"腕", body:"公式の数値では武力93に伸びしろの記号が付く、蚩尤の名に恥じない使い手。巫舞を扱える体質と、そのための修練を幼少期から積んでいる。"},
      {h:"外の世界", body:"蚩尤の里の外に対する好奇心が異常に強く、見るもの触れるものを片端から面白がる。里に閉じ込められた候補たちが本当は何を見たかったのかを、そのまま体現している人物でもある。"}
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
      {h:"最期", body:"“祭”では羌礼とともに最後まで残り一騎討ちになるが、寸前で羌礼を斬るのを躊躇って止めたことで、逆に刺されて死亡。死の間際、羌礼に生き延びてほしかったと告げて息を引き取った。この言葉が、後に狂った羌礼を正気に戻すきっかけになる。"},
      {h:"四人の里", body:"羌象・羌瘣・羌礼とともに長老に育てられた四人のうちの一人。寡黙だが妹分の羌礼を誰より気にかけており、羌瘣に対して、自分ではなく羌礼に技を教えてやってほしいと頼んだこともある。"}
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
      {h:"最期", body:"著雍戦で十四年ぶりに地下牢から解放される。知略と武勇で玉鳳隊を苦戦させ、王賁に重傷を負わせた。しかし三日目の再戦で自身の弱点を見抜かれ、王賁に討たれて戦死した。"},
      {h:"魏国最強の槍", body:"公式の数値は武力96・指揮90・知力86・経験S。異名のとおり槍の技量で魏の頂点に立つ男で、火竜七師の内乱では三人を自ら討っている。"}
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
      {h:"最期", body:"十四年ぶりに解放されて著雍戦に参戦。魏軍本陣からの狼煙で陥落を悟り、少数で離脱してきた呉鳳明と合流して形勢逆転の策を示す。しかし直後に信の襲撃に遭うと、教え子である呉鳳明に身代わりにされ、討たれて戦死した。"},
      {h:"数字が語る型", body:"公式の数値では武力38に対して知力97・指揮90・経験S。武で押す魏火竜のなかで唯一、頭だけで大将軍位に座っている異物。騰は旗印を見ただけで相手を看破し、側面から来る刃まで読み切った。"}
    ],
    battles:["b_chakuyou"],
    rel:[{to:"gohoumei",label:"師（身代わりにされる）"},{to:"shin",label:"討たれる"},{to:"shihaku",label:"味方"},{to:"gaimou",label:"同僚"},{to:"f_gikaryuu",label:"七師"}]
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
    id:"ranbihaku", name:"乱美迫", yomi:"らんびはく", kind:"person", state:"魏", group:"呉鳳明軍",
    role:"呉鳳明傘下将軍", klass:"武将", first:"36巻", arc:"魏火竜七師編〜什虎", status:"存命",
    tags:["魏","狂戦士","鉄仮面","大矛","什虎"],
    summary:"「狂戦士」と呼ばれる鉄仮面の巨漢。味方ごと敵を斬ろうとする見境のなさ。",
    detail:[
      {h:"人物", body:"呉鳳明傘下の将軍で元は霊凰軍所属。「狂戦士」の異名を持つ鉄仮面の巨漢で、得物は大矛。"},
      {h:"誰と戦ったか", body:"著雍編では騰軍を圧倒するも、本陣陥落と霊凰討ち死にによる敗北で撤退。什虎攻めにも従軍し、録嗚未と共に千斗雲軍を挟撃するが、録嗚未もろとも千斗雲を斬ろうとするなど見境がない。"},
      {h:"その後", body:"呉鳳明の命令で一時離脱し、蒙武・騰軍を援護するため満羽・項翼軍の側面を攻めて勝利に貢献した。存命。"},
      {h:"数字が語る型", body:"公式の数値では武力94に対して指揮70・知力45。指揮も策も期待されず、前に出て斬るためだけに置かれる駒。霊凰のような頭脳型の将にとっては、正確に狙って放つための刃という使い方になる。"},
      {h:"騰との一撃", body:"著雍の一日目、霊凰の読みに沿って騰軍の側面へ突っ込む。交差した一撃で騰の頬に傷、蘭美迫の腕当てに罅が入った。王騎と摎が手を焼いた相手だと知っていた騰は、深追いせず囮の役目に戻っている。"}
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

  /* ───────────── あらすじ（章ごとの精読版） ─────────────
     読了地点までを21の束に整理。beats = 出来事の流れ / points = 要点 / checks = 復習用の一問一答。
     keys / battles / newcomers / deaths は node id。
     典拠: Wikipedia「キングダム (漫画)」あらすじ・年表、および各巻。 */
  arcs: [
  {
    id:"a1",
    no:"I",
    name:"下僕と王 — 王都奪還編",
    ep:"第1シリーズ 第1〜15話",
    vols:"原作 1〜5巻",
    chapters:"第1〜47話",
    year:"紀元前245年",
    era:"秦の内乱",
    sides:"嬴政・山の民 vs 成蟜・竭氏",
    result:"嬴政が王座を奪還",
    rank:"下僕 → 士官",
    quote:{t:"俺は…天下の大将軍になる男だ。", by:"信"},
    lead:"下僕の少年が王と出会い、奪われた王座を取り戻すまで。すべての始まり。",
    beats:[
      {ep:"第1話", h:"無名の少年", body:"紀元前245年、秦の片田舎・城戸村。戦災孤児で下僕の信と漂は、天下の大将軍を目指して日々剣を打ち合っていた。そこへ大臣・昌文君が現れ、漂だけを王宮で仕官させると告げる。『行き着く場所は同じだ』と誓い合って別れた直後、王弟の反乱が勃発し、深手を負った漂が村へ帰り着く。"},
      {ep:"第2話", h:"運命の出会い", body:"漂が死の間際に託した地図をたどって黒卑村へ向かった信は、漂と瓜二つの少年・政と出会う。そこへ現れた刺客・朱凶が『漂を殺したのは自分だ』と嘲笑う。我を忘れて斬りかかった信は手も足も出ずに倒れるが、漂の無念を誰より背負っている男は、ぼろぼろの体で再び立ち上がる。"},
      {ep:"第3話", h:"友よ…!", body:"信は驚異的な気力で朱凶を倒すが、今度は王弟の大軍に一帯を囲まれる。逃げ場を失った二人の前に河了貂が現れ、抜け道を教える。その道中、政の口から『漂は万が一のための影武者だった』と明かされて信は逆上するが、政は『漂はそれを十分にわかっていた』と声を荒げる。"},
      {ep:"第4話", h:"王と剣", body:"漂の覚悟を知った信は、自分たちの路のために政につくと決める。『利用するだけだ』『お前はただの剣だ』と言い合う関係のまま、金のために加わった貂と三人で昌文君らとの合流地——四百年前の秦王・穆公の隠れ避暑地を目指す。そこへ新たな刺客・ムタが襲いかかる。"},
      {ep:"第5話", h:"折れない心", body:"初めて浴びる殺気に怯み、本来の力を出せない信。だが政の檄で自分が無意識に退がっていたと気づき、不退こそが自分の武器だと確信して前に出る。戦いの最中で進化する信がついに反撃に転じる。一方、咸陽には王騎の手で無残な姿になった昌文君の首が届けられていた。"},
      {ep:"第6話", h:"大将軍への道", body:"死んだと思われた昌文君は生きていた。漂の死の怒りをぶつけようとする信の手を止めたのは副官・壁。壁は最後まで漂の傍にいた者として、その最期を語る。堂々たる王として振る舞った漂の姿に打たれ、己の未熟さを知った信は、改めて将軍になる路を政に問う。"},
      {ep:"第7話", h:"恐ろしき山の民", body:"王宮奪還の加勢を求めて山の王のもとへ向かう道中、一行は壁から山の民の凶暴性を聞かされる。恐怖に沈む一同の中で信だけが『味方にする値打ちがある』と先を志す。その背中に政と昌文君は何かを感じ取る。やがて一行は、無数の奇妙な仮面の山の民に取り囲まれていた。"},
      {ep:"第8話", h:"それぞれの夢", body:"政はたった一人で山の王のもとへ連れられていく。政を託された信、貂、壁は断崖を登って山の民の王国へ乗り込み、想像を絶する堅牢な要塞を目にする。一方、山の王・楊端和は助力の申し出を一蹴し、積年の恨みを晴らすために政の首を刎ねると宣告する。"},
      {ep:"第9話", h:"いざ咸陽へ", body:"楊端和の心を動かした一行は山の民と共に戻り、咸陽攻めの軍議を始める。政側は約三千、対する竭氏は八万。兵力差に喚く信に対し、政は『悪くない』と瞳を光らせる。王宮では大局へ向けた準備が進み、自らに従う大軍勢を前にした成蟜が笑みを浮かべていた。"},
      {ep:"第10話", h:"王都突入", body:"咸陽に到着した一行は、政の策で全員が山の民に扮装して城門を潜り抜ける。王宮へ通じる門の前でふと立ち止まった政は『全ての始まりはここだった』と語る。政と漂が出会い、信と政が巡り合った運命の場所で、決着の戦いが幕を開ける。"},
      {ep:"第11話", h:"激戦開始", body:"信の活躍で朱亀の門を突破し、おびき出した竭氏へ襲いかかる。だが喉元に刃が迫った瞬間、不審を感じていた肆氏の弩行隊が山の民を射抜いた。にらみ合いの中、政は自ら敵前に姿を現して注意を引き付け、その間に信・壁らが別働隊として本殿へ攻め入る。"},
      {ep:"第12話", h:"究極の一刀", body:"右龍の回廊に立ちふさがったのは人斬り長・左慈。常に一刀で仕留めるその剣は山の民すら真っ二つに斬り捨てる。味方が立ちすくむ中、信は迷わず挑む。互いに一歩も引かない打ち合いの末、信の剣がわずかに左慈を傷つけると、激高した左慈が頭上へ強烈な一撃を撃ち込む。"},
      {ep:"第13話", h:"ﾗﾝｶｲ吠える", body:"死力を尽くした壁の援護を受け、信は左慈を倒して本殿へ躍り込む。大臣たちが震え上がる中、成蟜は玉座に悠然と構えて一同を下等な輩と蔑む。真っ向から挑みかかる信の前に、成蟜のペットであり護衛役の巨大な化け物・ランカイが牙をむき、凄まじい破壊力で信たちを蹴散らす。"},
      {ep:"第14話", h:"剣の力", body:"野獣と化したランカイにバジオウらもなぎ倒される。だが壁の言葉を受け、剣と一体となった信の渾身の一撃と気迫がランカイの戦意を打ち砕く。後がなくなった成蟜は半狂乱で逃げ出し、竭氏は最後のあがきの末に討ち取られる。そして広間には、突如王騎が現れる。"},
      {ep:"第15話", h:"王の資格", body:"王騎は宝刀を光らせながら、志すべき王の在り方を政に問う。政は表情を変えず『中華の唯一王だ』と言い切り、その言葉の重みを受けた王騎は目を輝かせて撤収していく。入れ替わりに逃げ込んできた成蟜が『こいつを殺せ』と喚くが応える者はなく、政は自らの拳で決着をつける。"},
      {ep:"—", h:"この束のテーマ", body:"血筋か、それを超えるものか。王も将も生まれで決まらない、という物語全体の前提がこの章で置かれる。"}
    ],
    points:[
      "漂は『影武者として』死んだ。信の出発点は復讐ではなく、代わりに死んだ友の夢を継ぐこと。",
      "政は最初の味方を、武力ではなく『理由』で獲得した（山の民との再同盟）。以後の政のやり方はすべてこの型。",
      "成蟜＝血統主義の体現者。この章の対立軸が、そのまま作品全体のテーマになる。",
      "王騎はここで一度だけ顔を出して去る。次の登場（馬陽）までの空白が、彼の格を作っている。"
    ],
    checks:[
      {q:"漂が王宮に召し上げられた本当の理由は？", a:"剣の腕ではなく、秦王・嬴政と顔が瓜二つだったため。影武者として使うためだった。"},
      {q:"政が山の民を味方にできた根拠は？", a:"五百年前の秦公・穆公と山の民が結んだ盟約。政はそれを持ち出し、『王の道』を説いて楊端和を説得した。"},
      {q:"王宮突入で信が討った刺客は？また誰の援護があった？", a:"回廊で待ち構えていた左慈。昌文君の副官・壁の援護を受けて討ち取った。"},
      {q:"この反乱を起こした二人は誰と誰？", a:"王弟・成蟜と、秦の左丞相・竭氏。"},
      {q:"章の終わりで信の身分はどう変わった？", a:"下僕から解放され、武功として土地と家を与えられた（士官）。"}
    ],
    keys:["shin", "hyou", "sei", "tenn", "seikyou", "youtanwa", "bajio", "tajifu", "shunmen", "shoubunkun", "heki", "rankai", "saji", "ketsushi", "shiishi", "jokan", "muta", "ouki", "f_shukyou", "f_bessa"],
    battles:["b_outo"],
    newcomers:["hyou", "shin", "shoubunkun", "mougou", "sei", "tenn", "ketsushi", "rankai", "seikyou", "ouki", "shiishi", "heki", "ryofui", "bajio", "tajifu", "youtanwa", "saji", "shunmen", "tou", "jokan", "muta"],
    deaths:["hyou"]
  },
  {
    id:"a2",
    no:"II",
    name:"初陣 — 蛇甘平原の戦い",
    ep:"第1シリーズ 第16〜22話",
    vols:"原作 5〜7巻",
    chapters:"第48〜73話",
    year:"始皇二年",
    era:"対魏",
    sides:"麃公軍 十五万 vs 呉慶軍",
    result:"秦の勝利（滎陽奪取は失敗）",
    rank:"士官 → 百人将",
    quote:{t:"戦を無くすために、戦うのだ。", by:"呉慶"},
    lead:"信が初めて『戦争』を知る戦い。個人の剣と、軍という仕組みの落差。",
    beats:[
      {ep:"第16話", h:"呂不韋", body:"反乱鎮圧の平穏も束の間、秦国の丞相・呂不韋が遠征から戻ってくる。後ろ盾の弱い政につけこんで竭氏と権力を二分し、此度の反乱では手を貸さず傍観していた男である。飄々と戻る呂不韋に怒りを隠せない信だが、いざ姿を現すとその底知れぬ気に呑まれて言葉を失う。"},
      {ep:"第17話", h:"初陣", body:"中華統一の第一歩として、政は隣国・魏へ十五万を超える大軍を侵攻させる。歩兵軍の中には天下の大将軍を目指す信もいて、戦の雰囲気に気合十分で行軍する。だが入城するはずだった秦の城が魏の何者かの手で落とされ、攻め込むはずの秦軍が逆に翻弄され始める。"},
      {ep:"第18話", h:"戦車隊の脅威", body:"すでに戦場と化した蛇甘平原へ到着した信は、命をかえりみず突撃する猛将・縛虎申の隊に配属される。最弱と目された部隊ながら、信の剣術と部隊長・澤圭たちの結束でいびつな集団戦法が成立し始める。だが魏が最強を自負する戦車隊が現れ、逃げ場を失った秦軍が蹂躙されていく。"},
      {ep:"第19話", h:"烈火の戦い", body:"それまで沈黙していた謎の剣客・羌瘣の策と信の活躍で戦車隊を撃破。この僅かな戦局の変化を読み取った総大将・麃公は騎馬の大軍を突撃させ、一帯は大乱戦となる。勢いに乗った信たちは縛虎申の号令で、生き残ったわずか数十の兵で丘上の魏軍副将・宮元の首を狙う。"},
      {ep:"第20話", h:"王騎乱入", body:"鬼神のような突撃は多くの犠牲を出しつつ丘上奪取を果たす。だが喜ぶ間もなく、魏軍総大将・呉慶が自ら軍を率いて丘へ迫る。対抗できる戦力もなく丘を下ろうとした信たちの前に、この戦には参戦していないはずの王騎の騎馬隊が突如現れ、敵を粉砕していく。"},
      {ep:"第21話", h:"将軍の意味", body:"初めて目の当たりにした王騎の存在感に圧倒される信。だが王騎は信に目もくれず『期待外れ』と一刀両断する。屈辱に吠える信に全く動じないまま、王騎は眼下で急速に変化を始めた戦を眺め、この状況を導き出したのはたった二人の将軍だと語り始める。"},
      {ep:"第22話", h:"知将対猛将", body:"戦を理詰めの盤と捉え、地の利を先に取り陣形を変えて秦軍を追い詰めた呉慶。戦を燃え盛る一つの大炎と捉え、わずかな変化を逃さず最後は自ら先頭に立った麃公。相反する二人の戦は最終決戦を迎え、魏軍の陣へ突撃した麃公と、それを迎え撃つ呉慶が対峙する。"},
      {ep:"—", h:"戦の後", body:"呉慶は討たれ、魏兵は退却して秦軍が勝利する。ただし本来の目的だった滎陽の奪取には至らず、秦軍は帰国する。戦術の勝ちと戦略の達成は別物だという最初の実例。信は武功により百人将へ昇格する。"},
      {ep:"—", h:"この束のテーマ", body:"戦は勇気ではなく仕組みで動く。信が『強い個人』から『隊を率いる者』へ移るための最初の授業。"}
    ],
    points:[
      "秦軍の目的は滎陽の奪取。呉慶を討って勝ったが目的は達していない——勝利＝達成ではない。",
      "縛虎申は千人将。『退けば斬る』という命令の理不尽さと、丘を取るという合理が同時に成り立っている。",
      "呉慶は『戦を無くすために戦う』と語る。政と同じ理想を、敵が先に口にしている構図。",
      "羌瘣はこの時点では目的不明の同僚。彼女の正体は刺客急襲編で明かされる。"
    ],
    checks:[
      {q:"この戦いの秦軍総大将と、目標だった城は？", a:"総大将は大将軍・麃公、兵は十五万。目標は魏の要衝・滎陽（結果として奪取できていない）。"},
      {q:"縛虎申はどの敵将と刺し違えたか？", a:"魏軍副将・宮元。丘を登り切った末の相打ちで、秦軍は丘を奪取した。"},
      {q:"呉慶が戦う理由は？", a:"かつて自分の故国が滅ぼされた経験から、『戦を無くすために戦う』という思想を掲げていた。"},
      {q:"この戦い後の信の階級は？", a:"百人将。初めて部隊を預かる立場になった。"}
    ],
    keys:["shin", "kyoukai", "hyoukou", "bakukoshin", "gokei", "kyuugen", "hakukisai", "gakuga", "takuke", "obei", "obito", "hairou", "denyuu", "ouki", "heki"],
    battles:["b_dakan"],
    newcomers:["hyoukou", "chuutetsu", "denyuu", "kyoukai", "obei", "obito", "takuke", "gokei", "hairou", "bakukoshin", "kyuugen"],
    deaths:["bakukoshin", "gokei", "kyuugen"]
  },
  {
    id:"a3",
    no:"III",
    name:"光をくれた人 — 紫夏編",
    ep:"第2シリーズ 第7〜9話",
    vols:"原作 8巻",
    chapters:"第75〜82話",
    year:"回想（政が九歳の頃）",
    era:"政の過去（趙・邯鄲）",
    sides:"紫夏一行 vs 趙の追手",
    result:"政が秦へ帰還（紫夏の死）",
    rank:"—",
    quote:{t:"あなたは、私が生きた証。", by:"紫夏（趣意）"},
    lead:"政が趙で人質だった日々と、彼を秦へ送り届けた女商人の話。政という王の芯が明かされる短い章。",
    beats:[
      {ep:"第7話", h:"呪われた王子", body:"長平の戦いで秦が行った未曾有の大虐殺は、趙に深い恨みを残した。その恨みは趙に残された秦の王子・嬴政に向けられ、政は幼い頃から侮蔑と虐待の日々を送る。時の秦王崩御を機に、政を秦へ逃がす極秘の計画が趙の闇商人・紫夏のもとに持ち込まれ、紫夏は受けるかどうかを決めるために政に会うことを要求する。"},
      {ep:"第8話", h:"政と紫夏", body:"失敗すれば命がないと知りながら、紫夏は政を秦へ送り届けると決め、一行は趙を抜けるための五つの関門へ向かう。紫夏の手腕で一つ目を通過するが、政は虚ろな目で何かに怯えるように夢にうなされ続ける。二つ目の関門で、政が隠れている俵に突如矢が射ち込まれる。"},
      {ep:"第9話", h:"つなぐ願い", body:"味も匂いも痛みも感じられず『自分は壊れてしまっている』と語る政。過去の亡霊に縛られて動けなかった政を、紫夏の手が闇から強く引き上げる。最後の関門を抜けた一行はついに趙の騎馬隊に追いつかれ、仲間が次々と倒れていく中、紫夏は決意の表情を浮かべる。"},
      {ep:"—", h:"光の中身", body:"紫夏は自らの命と引き換えに政を秦側へ送り届けた。最後に残した言葉——お前は私が生きた証だ——が、政の芯になる。以後の政の演説はすべてここに根がある。"},
      {ep:"—", h:"この束のテーマ", body:"政の理想は思想ではなく債務。返す相手がすでに死んでいるという点で、信の『天下の大将軍』と同じ構造をしている。"}
    ],
    points:[
      "政の中華統一は理念ではなく、紫夏の死に対する返済として語られている。",
      "母・太后が政を庇わなかったという事実が、のちの毐国反乱編（太后との断絶）に直結する。",
      "『光』は紫夏が政に残した言葉。作品を通じて政が繰り返す語彙の出所はここ。",
      "信と政は『死んだ誰かの夢を背負っている』という点で同型。この章がそれを明示する。"
    ],
    checks:[
      {q:"政はどこで生まれ、どんな扱いを受けていたか？", a:"趙の王都・邯鄲。秦人の子として石を投げられ、人として扱われずに育った。母・太后も庇わなかった。"},
      {q:"紫夏の職業と、政に関わった当初の立場は？", a:"趙の女商人。政を秦へ送り届ける仕事を請けた——つまり最初は商売として関わった。"},
      {q:"紫夏はどうなったか？", a:"追手を振り切る逃避行の末、自らの命と引き換えに政を秦側へ送り届けて死んだ。"},
      {q:"政が繰り返す『光』とは何を指すか？", a:"紫夏が最後に残した言葉と、彼女が政を人として扱ったこと。政の中華統一の動機の根。"}
    ],
    keys:["sei", "shika", "taigo", "shin"],
    battles:[],
    newcomers:["shika"],
    deaths:["shika"]
  },
  {
    id:"a4",
    no:"IV",
    name:"刺客、王宮へ — 刺客急襲編・修行編",
    ep:"第1シリーズ 第23〜24話（刺客急襲編は未放送）",
    vols:"原作 8〜10巻",
    chapters:"第83〜107話",
    year:"始皇二年（蛇甘平原の三ヶ月後）",
    era:"秦の内政 / 修行",
    sides:"嬴政・信・羌瘣 vs 各刺客団（黒幕＝呂不韋）",
    result:"刺客を撃退。首謀者が呂不韋と判明",
    rank:"百人将",
    quote:{t:"体は、鍛えた分しか動かねェ。", by:"信（趣意）"},
    lead:"政の首を狙う刃が王宮の内側まで入り込む。羌瘣の正体と、呂不韋という敵の輪郭がここで確定する。",
    beats:[
      {ep:"第23話", h:"夜語り", body:"初陣の活躍で百人将へ昇格した信は、魏戦で共に戦った仲間から『再び同じ隊で』と言われるほど成長していた。その頼もしい横顔に貂が寂しさを覚える中、羌瘣が現れる。再会を喜ぶ信に対し相変わらず多くを語らないが、貂が強さの秘密に迫ると突如殺気を放ち、壮絶な過去を語り出す。"},
      {ep:"第24話", h:"新たなる試練", body:"羌瘣から己の未熟さを指摘された信は、自分なりに『強さ』を考え、世話役の渕を無理やり連れ出して王騎の城へ教えを乞いに向かう。相手にもされないが決意は揺るがず、修業場所へ連れて行かれる。道すがら秦国六大将軍の話を聞いて決心を固めた矢先、王騎は信を崖から突き落とす。"},
      {ep:"—", h:"（原作）刺客急襲編", body:"アニメでは省かれているが、原作ではこの間に王宮での暗殺劇がある。昌文君の協力者が次々暗殺され、真の標的は政。肆氏の手配で王宮に入った信は、脱出路を塞がれたところで蚩尤——羌瘣と対峙し、別の刺客団の襲撃で一時休戦して共闘する。"},
      {ep:"—", h:"（原作）首謀者は呂不韋", body:"撃退後に発覚した首謀者は秦右丞相・呂不韋だった。呂不韋は昌平君（軍）・蒙武（武）・李斯（法）・蔡沢（外交）の四柱を率いて参内し、力量差を見せつける。政の側は肆氏ら竭氏残党を吸収して数を作るのが精一杯だった。"},
      {ep:"—", h:"（原作）河了貂、軍師を選ぶ", body:"河了貂は武ではなく軍師の道を選び、昌平君の軍師学校に入学して蒙毅らと兵法を学び始める。飛信隊に戦術的な意思決定が入る準備がここで始まる。"},
      {ep:"—", h:"この束のテーマ", body:"敵の顔が確定する章。政の敵は他国ではなく自国の丞相であり、信の課題は強さではなく将としての器だと定義される。"}
    ],
    points:[
      "秦王暗殺の黒幕は右丞相・呂不韋。以後40巻まで続く政の最大の敵がここで確定する。",
      "呂不韋四柱＝昌平君（軍）・蒙武（武）・李斯（法）・蔡沢（外交）。政側との実力差が可視化される。",
      "羌瘣＝蚩尤族の暗殺者。巫舞もここで初めて明かされる。彼女の目的（幽連への復讐）はまだ語られない。",
      "河了貂が軍師を志し、昌平君の軍師学校へ。飛信隊が『信の隊』から『信と貂の隊』へ変わる起点。"
    ],
    checks:[
      {q:"秦王暗殺計画の首謀者は誰だったか？", a:"秦右丞相・呂不韋。事件後に発覚した。"},
      {q:"呂不韋の『四柱』を挙げよ。", a:"昌平君（軍）・蒙武（武）・李斯（法）・蔡沢（外交）。"},
      {q:"羌瘣の正体と、王宮で信と最終的にどうなったか？", a:"蚩尤族の暗殺者。一時は対峙したが、別の刺客団の襲撃で一時休戦して共闘し、政を討たずに去った。"},
      {q:"河了貂がこの章で決めた進路は？", a:"武ではなく軍師。昌平君の軍師学校に入学し、蒙毅らと兵法を学んだ。"},
      {q:"信はこの期間、誰に修行を乞ったか？", a:"王騎。蛇甘平原で『武将とは何か』を教わった縁から弟子入りした。"}
    ],
    keys:["shin", "kyoukai", "sei", "ryofui", "moubu", "shouheikun", "risi", "saitaku", "shibakuu", "en", "rokuomi", "kyoushou", "yuren", "entei", "shiishi", "tenn", "mouki", "ouki", "f_kensen", "f_gouma", "f_kakuriki", "f_shukyou"],
    battles:[],
    newcomers:["kyoushou", "yuren", "moubu", "risi", "saitaku", "shouheikun", "en", "rokuomi", "entei", "gakyou"],
    deaths:[]
  },
  {
    id:"a5",
    no:"V",
    name:"王騎の戦 — 馬陽の戦い",
    ep:"第1シリーズ 第25〜38話",
    vols:"原作 11〜16巻",
    chapters:"第108〜173話",
    year:"始皇三年 二月",
    era:"対趙",
    sides:"王騎軍 十万（副将 蒙武） vs 龐煖・趙荘 十二万",
    result:"趙荘を討つが王騎が戦死",
    rank:"百人将（飛信隊 結成）→ 三百人将",
    quote:{t:"武将ってのは、そういうもんですよ。", by:"王騎（趣意）"},
    lead:"巨星の復帰と退場。飛信隊が生まれ、信の目標が『大将軍』として具体化する。",
    beats:[
      {ep:"第25話", h:"任命", body:"信が修業をしている頃、王都に未曾有の危機が迫る。大国・趙が攻め込んできたのだ。長平の戦いで四十万を生き埋めにされた趙の憎しみは尋常ではなく、馬央へ進軍した趙兵は一帯で大虐殺を行う。秦軍の大半は別国を攻めており、一般兵に緊急徴兵が発せられる。同時に、この大戦を任せられる唯一の将軍・王騎も動き出す。"},
      {ep:"第26話", h:"武神 龐煖", body:"馬央は陥落し、守備前線の要である馬陽も猛攻を受ける。秦は王騎を総大将に任命して援軍を向かわせ、百人将となった信も将としての第一歩として戦場へ赴く。王宮では趙軍総大将が『龐煖』という男だと伝えられ、誰も聞いたことのない名に一同が困惑する中、昌文君だけが驚愕に体を震わせる。"},
      {ep:"第27話", h:"飛信隊誕生", body:"馬陽に到着した両軍が陣形を整え、突撃の号令が下る。待機を続けていた信の部隊に王騎から特命が下る——大乱戦の秦左軍の戦場に突入し、敵将・馮忌の首を取れ。あまりに無謀な作戦に兵たちは声を失うが、信に臆するところはなく不敵に笑う。"},
      {ep:"第28話", h:"王騎の飛矢", body:"『飛信隊』の名を与えられた信たちは、わずか百人で馮忌の本陣へ突撃する。敵の虚をついた攻撃は威力を発揮し、信自ら先頭に立つ姿に隊の士気も上がる。だが虚をつく効果が失せて単純な消耗戦になると寡兵の飛信隊は窮地に陥り、限界を感じた副将・渕がある決断を下す。"},
      {ep:"第29話", h:"戦局急転", body:"仲間の援護で敵陣を切り抜けた信は馮忌を討ち取り、一日目は飛信隊の勝利で終わる。二日目、守備を得意とする敵将・李白に苦戦していたかに見えた主攻・蒙武軍が動き出す。前日の動きはすべて蒙武の作戦通りであり、一変して鬼神のような武力で李白の陣を食い破っていく。"},
      {ep:"第30話", h:"天災", body:"飛信隊の活躍と蒙武の武力で勢いがついた秦軍。王騎は蒙武に全軍を預けて趙軍本陣へ総攻撃を仕掛ける。だが本陣の山へ突入するや否や趙軍が奇妙な撤退を始める。不審を感じつつ後を追う王騎。観戦していた貂と蒙毅は、謎の青年・李牧とその護衛・カイネと共に移動することになる。その夜、夜営地に龐煖が現れる。"},
      {ep:"第31話", h:"集の力", body:"自らを『天の災い』と称した龐煖が兵を次々と斬り倒し、その矛は飛信隊の隊員の命も奪う。怒りに震えた信は羌瘣と共に挑むが、圧倒的な武力の前になす術もない。さらに趙将・万極の襲撃で夜営地は大混戦となる。一度は退がろうとした信は、仲間のため、そして漂と誓った夢のため、再び龐煖に向き合う。"},
      {ep:"第32話", h:"敗走の飛信隊", body:"飛信隊の一斉攻撃が龐煖の意識をそらし、その隙を狙った信の剣が龐煖を切り裂く。だが致命傷には至らず、逆に一撃をくらった信は気絶する。絶体絶命の中、飛信隊は身を挺して信を守り、趙軍の追撃の中で多くの犠牲を出しながら山中へ逃れる。"},
      {ep:"第33話", h:"王騎 出陣！", body:"追撃を逃れた飛信隊は旗を頼りに自軍と合流しようとするが、それは趙将・渉孟の罠だった。危機に現れた王騎が渉孟を一蹴し、飛信隊は王騎軍と共に森の奥へ進む。同じ頃、趙軍本陣を目前に捉えた蒙武軍は、味方の到着を待たず王騎配下・隆国の軍と共に本陣を急襲する。"},
      {ep:"第34話", h:"真打ち", body:"本陣で龐煖を見つけた蒙武は単身挑むが、龐煖は刃を交えずに去る。策の臭いを感じつつ後を追った蒙武軍は罠にかかり、生き残った兵も断崖に追い詰められる。全滅かと思われたその窮地に王騎たちが到着。一方王宮には、楊端和から趙軍に潜む思わぬ伏兵の存在が知らされる。"},
      {ep:"第35話", h:"総大将見える", body:"釣鐘状の地で両軍が対峙。まず騰の騎馬隊が先制攻撃で趙軍の陣を突き崩し、続いて信ら歩兵が囮となる。乱れた敵陣へ王騎自らが出陣し、策略の気配を感じながらもそれより早く決着をつけるべく趙荘の本陣へ迫る。その前に、九年前の因縁に決着をつけるべく龐煖が立ちふさがる。"},
      {ep:"第36話", h:"王騎と摎", body:"九年前、龐煖に敗れて命を落とした秦国六大将軍の一人・摎。天下に名を響かせながら素性を知られなかった摎は、実は王騎の妻になるはずの女だった。昌文君の口から語られる事実に政は言葉を失う。摎の出生の秘密と、王騎・龐煖の間に生まれた因縁の日が明かされる。"},
      {ep:"第37話", h:"我、死線にあり", body:"王騎と龐煖の戦いは一歩も譲らない打ち合いが続く。倒れた者たちの思いを背負った王騎は徐々に龐煖を追い詰め、防戦一方となった相手を斬り伏せようとする。だがその時、この戦を影で操っていた李牧の軍が到着。形勢は一気に逆転し、秦軍の士気は打ち砕かれる。その死地の中で、王騎は笑みを浮かべる。"},
      {ep:"第38話", h:"継承", body:"とどめを振り下ろす直前、趙将・魏加の一矢が背後から王騎を襲い、それを機に龐煖の一刀が胸を貫く。秦兵が次々と戦意を失う中、死が明白になってもなお王騎は立ち上がり、その檄で闘志を取り戻した秦軍は趙軍を蹴散らして死地を脱する。王騎は信に矛を託し、天下の大将軍への道筋を言葉で残して世を去る。"},
      {ep:"—", h:"戦の後", body:"趙軍は撤退し、秦は馬陽を守り切る。論功行賞で信は三百人将へ昇格。王騎軍は副官・騰が引き継ぐ。政は最大の後ろ盾を失い、信は背負うものを一つ増やす。"},
      {ep:"—", h:"この束のテーマ", body:"物語の第一の区切り。信は武功を重ねる少年から、将としての視野を問われる立場へ移る。同時に李牧という『盤面を設計する敵』が初めて姿を見せる。"}
    ],
    points:[
      "趙軍の総大将は龐煖だが、実際に盤面を設計していたのは趙荘。王騎は趙荘を討って戦術的には勝っている。",
      "王騎の死因は一騎打ちの敗北ではなく、李牧の挟撃＋背後からの狙撃という盤面の負け。",
      "王騎が馬陽に固執した理由＝六年前にこの地で摎を龐煖に討たれたこと（城百個の約束）。",
      "尾到の死が飛信隊の初期を決定づける。信の『生き延びた理由』が他人の死になる最初の例。",
      "この戦いで飛信隊が結成され、王騎の矛が信に引き継がれる。以後の因縁（龐煖・李牧）がすべてここで発生する。"
    ],
    checks:[
      {q:"馬陽への侵攻を秦が防げなかった直接の理由は？", a:"蒙驁の二十万が韓侵攻に出ており（一ヶ月で十一城）、主力が空いていた隙を趙に突かれた。"},
      {q:"飛信隊はどの戦いで、どんな部隊として結成されたか？", a:"馬陽の戦い。信のもとに置かれた特殊百人部隊として結成された。"},
      {q:"信が討ち取った趙将は？", a:"趙右軍の将・馮忌。飛信隊が側面から突撃し、干央・壁の反撃で本陣が乱戦になった隙に討った。"},
      {q:"王騎が討った趙の将は誰で、王騎自身はどう倒れたか？", a:"趙荘を討った。その後、龐煖との一騎打ちの最中に李牧の大軍が挟撃し、背後からの狙撃を受けた隙に龐煖に胸を貫かれた。"},
      {q:"摎とは誰で、王騎とどんな約束をしていたか？", a:"六大将軍唯一の女将軍。王騎が拾って育てた。『城を百獲ったら嫁にする』という約束で、百個目が馬陽だった。龐煖に討たれている。"},
      {q:"尾到はどうなったか？", a:"敵中で消耗した信を背負って味方陣地の目前まで走り、力尽きて死んだ。"}
    ],
    keys:["ouki", "shin", "tou", "kyou", "houken", "chousou", "bankyoku", "fuuki", "moubu", "hyoukou", "obito", "tenn", "kyogai", "riboku", "kan'ou", "heki", "gika", "f_hishin", "f_rokushou_old"],
    battles:["b_bayou", "b_chouhei"],
    newcomers:["houken", "bankyoku", "denei", "kyogai", "kyou", "ryusen", "ryuyuu", "shousa", "suugen", "chousou", "fuuki", "kan'ou", "mouki", "riboku", "gika"],
    deaths:["ouki", "obito", "chousou", "fuuki", "kyou"]
  },
  {
    id:"a6",
    no:"VI",
    name:"敵将、来訪 — 秦趙同盟編",
    ep:"第2シリーズ 第1〜6話",
    vols:"原作 17〜18巻",
    chapters:"第174〜188話",
    year:"始皇四年",
    era:"秦の内政 / 外交",
    sides:"—",
    result:"秦趙同盟が締結／政陣営が攻勢へ転じる",
    rank:"三百人将",
    quote:{t:"この国には、まだ王がいない。", by:"昌文君（趣意）"},
    lead:"王騎を失った秦に、王騎を討った男が客として現れる。戦のない章だが、以後の勢力図がここで決まる。",
    beats:[
      {ep:"第1話", h:"新時代", body:"田舎村の下僕から武功を重ねて三百人将となった信。率いる飛信隊は秦の特殊部隊として戦場を駆けまわり、その名は敵にも味方にも知られ始めていた。一方、王宮では若き王・嬴政と国の実権を握る丞相・呂不韋の権力争いが激化。思惑と野望が渦巻き、新しい時代が動き出す。"},
      {ep:"第2話", h:"静かなる戦場", body:"王騎を討った趙の宰相・李牧が突如秦へ来訪する。発端は呂不韋であり、軍事総司令・昌平君に呼ばれた信と羌瘣は衛兵に化けて会見へ紛れ込む。緊迫する一同とは裏腹に和やかに話を進める呂不韋と李牧。その様子に戸惑う信たちの前で、呂不韋は不意に『李牧を殺す』と言い放つ。"},
      {ep:"第3話", h:"嵐の祝宴", body:"激しい駆け引きの末に秦趙同盟が成り、両国はそれを祝して盛大な宴会を催す。華やかな光景の裏で両国の間には張り詰めた空気が漂う。意気揚々と席に付いた信の向かいにいたのは仇敵・李牧。大将軍・王騎を殺した張本人に対し、信は思わず殺気を漲らせる。"},
      {ep:"第4話", h:"王と蟻", body:"五年で将軍になると政に誓って戦場へ戻った信は、ひたすら武功を求めるが大きな手柄に恵まれず焦る。そんな中、前線で魏軍が思わぬ大軍と化す。この好機に飛信隊は単独で敵本陣を急襲するが、防陣を突破した先にいたのは、既に敵将を討ち取って悠然と佇む秦の若き将・王賁だった。"},
      {ep:"第5話", h:"第三勢力", body:"貴士族のエリートで構成された特殊三百人隊・玉鳳隊を率いる王賁は、素人集団の飛信隊を『蟻』と呼び蔑む。剣を抜いた信は王賁の槍に圧倒され、力の差を見せつけられる。その夜、飛信隊は玉鳳隊を出し抜くべく自分たちにしかできない過酷な作戦を決意する。一方王宮では、予期せぬ人物が政陣営に接触してきた。"},
      {ep:"第6話", h:"美しき猛毒", body:"大王派・呂不韋派とは別の第三勢力・後宮。政の母・太后が支配し絶大な勢力を持ちながら、これまで権力争いを静観してきた領域から、大王派の肆氏へ突如書簡が届く。取り込めば陣営強化になるが、太后の闇を知る昌文君は強く警戒する。議論が続く中、政は誰にも話さず一人で後宮へ向かう。"},
      {ep:"—", h:"この束のテーマ", body:"戦場ではなく朝廷で盤面が動く章。政の敵は他国ではなく自国の丞相であり、味方は血縁ではなく理由で繋がると確認される。同時に王賁という同世代の壁が現れる。"}
    ],
    points:[
      "秦趙同盟は呂不韋の画策＋李牧の提言。互いに時間と手柄が欲しかっただけで、信頼はどこにもない。",
      "信が宴席で李牧に『戦場で倒す』と宣言。以後の全編にわたる因縁の宣言。",
      "第6話で政が単独で後宮（太后）へ向かう。太后の密通が判明するのは次章（第10〜12話）。",
      "王賁・蒙恬が同世代のライバルとして本格登場。以後の階級レースの三人が揃う。"
    ],
    checks:[
      {q:"李牧が咸陽に来た経緯は？", a:"呂不韋の画策による招待。李牧の提言で秦趙同盟が締結された。"},
      {q:"信は宴席で李牧に何を言ったか？", a:"必ず戦場でお前を倒す、と豪語した。"},
      {q:"太后から届いた書簡と、その後判明したことは？", a:"白紙の書簡が届いた。政が直接会いに行くと、太后はすでに呂不韋と密通していた。"},
      {q:"太后の密通を政に伝えたのは誰か？", a:"宮女・向。大怪我を負いながら政のもとへ辿り着いて伝えた。"},
      {q:"この章の時点での信の階級は？", a:"三百人将（馬陽の功による昇格）。"}
    ],
    keys:["riboku", "ryofui", "shouheikun", "tenn", "sei", "shoubunkun", "heki", "risi", "saitaku", "shibakuu", "taigo", "shin", "ouhon", "mouten", "kou_jo", "en", "kaine"],
    battles:[],
    newcomers:["ouhon", "banyou", "mouten", "kou_jo"],
    deaths:[]
  },
  {
    id:"a7",
    no:"VII",
    name:"世代の戦 — 山陽攻略戦",
    ep:"第2シリーズ 第10〜39話",
    vols:"原作 18〜24巻",
    chapters:"第189〜256話",
    year:"始皇五年",
    era:"対魏",
    sides:"蒙驁軍 二十万強（副将 王翦・桓騎） vs 廉頗軍 十四万（四天王）",
    result:"秦の勝利（和睦・山陽獲得）",
    rank:"三百人将 → 臨時千人将 → 千人将",
    quote:{t:"格が違う、というのはこういうことだ。", by:"廉頗（趣意）"},
    lead:"師を失った信が、初めて『千人を率いる将』として結果を問われる戦い。同世代が同じ戦場に並ぶ。",
    beats:[
      {ep:"第10話", h:"砕けた愛", body:"始皇五年、秦は魏の山陽一帯を領土とすべく大軍を興す。飛信隊は総大将・蒙驁率いる本軍に組み込まれ、大功を狙う信は気合十分で行進する。その頃王宮では後宮の実力者たちが政のもとへ来訪し、大臣たちは助力を得られると沸き立つ。だがある夜、宮女・向は呂不韋と仲睦まじく歩く太后の姿を目撃してしまう。"},
      {ep:"第11話", h:"揃い踏み", body:"実の子に協力したかと思われた太后は、裏で政の宿敵・呂不韋と繋がっていた。密会を目撃した向は身を潜めるが、気配に気づいた宦官の手で深手を負う。王宮に異変が起き始めたその頃、戦場では信・王賁・蒙恬の三人がそれぞれ大きな武功を目指し、最初の城・高狼へ到着する。"},
      {ep:"第12話", h:"高狼城攻略", body:"向の命がけの証言で呂不韋と太后の不義を知った政陣営は、その事実を触れ回って敵陣営を大きく揺るがす。一方、高狼城を攻める秦軍は巧みな防御術の前に苦戦し、幾日たっても戦局が動かず士気が下がっていく。強固な城壁に飛信隊も手が出せない中、玉鳳隊が単独で前へ出る。"},
      {ep:"第13話", h:"俺の戦り方", body:"井闌車で城壁の上へ攻め込んだ王賁は城門を奪うが、開いた扉から城内へ攻め込んだのは蒙恬の楽華隊。電光石火の早業で城は陥落する。ところがその城で秦兵による魏の民への凌辱が始まる。戦がきれいごとだけではないと知りつつ、あまりの惨状に信は激高し、相手が秦兵でも剣を向ける。"},
      {ep:"第14話", h:"その男、廉頗", body:"かつて趙三大天の一人として天下を恐れさせ、秦国六大将軍とも互角に戦った廉頗。趙王の命に背いて国を追われ魏へ亡命した後、一度も軍を率いていなかったが、この度魏王の命で再び戦場に立つ。そして大戦を前に、共に死線を潜り抜けてきた四天王の一人・輪虎が密かに動き出す。"},
      {ep:"第15話", h:"武将の空気", body:"秦軍は三つ目の城・近利関も落とし、飛信隊も敵将を討つ武功を上げる。だが喜びも束の間、輪虎の暗躍で千人将が次々と斬られていく。警備を強化しても捕えられない。翌日、出立した秦軍に再び輪虎が襲いかかる。その殺気に誰もが怯む中、信は真っ向から斬りかかる。"},
      {ep:"第16話", h:"真夜中の大将軍", body:"廉頗出陣の報に秦軍は焦りを隠せないが、総大将・蒙驁だけは柔和な笑みを崩さない。実のところ蒙驁は若き頃、幾度も廉頗と戦って一度も勝ったことがなかった。その夜、不思議な癖を持つ蒙驁は老人歩兵に化け、陣内をこっそり徘徊する。"},
      {ep:"第17話", h:"開戦前夜", body:"多数の千人将を失った秦軍は、三百人将から二名を千人将へ昇格させる。選ばれたのは王賁と蒙恬。悔しさを隠せない信だったが、総大将・蒙驁の推挙で臨時千人将となる。新しく加わった仲間と共に千人隊となった飛信隊は、信の檄で心を一つにする。"},
      {ep:"第18話", h:"激突！", body:"決戦の地・流尹平野に両軍が到着。副将に桓騎と王翦という二人の武将を率いた蒙驁は、穏やかな中に決意を秘めて長年の敵に挑む。対する廉頗も四天王を従え、余裕の笑みで激突の刻を待つ。両軍の陣形が整い、ついに第一陣が激突する。"},
      {ep:"第19話", h:"玄峰の奇策", body:"序盤は勢いで勝った秦軍だが、急造の千人隊は統率が取れず押し込まれていく。玉鳳隊も同様で、その隙を狙った輪虎が王賁に襲いかかる。第二陣も次々と崩される中、飛信隊だけは怒涛の攻撃を見せる。"},
      {ep:"第20話", h:"飛信隊逆襲", body:"一時は勢いを取り戻したかに見えた秦軍。だが第二陣を率いる四天王・玄峰の策で辺り一面が煙に覆われ、混乱した秦軍は弓兵に為す術もなく、煙から現れた装甲戦車に蹂躙される。唯一策を見抜いた飛信隊は逆に攪乱し、強行突破で敵本陣へ迫るが、玄峰は悠然と待ち構えていた。"},
      {ep:"第21話", h:"盗賊対軍略家", body:"玄峰は秦軍を壊滅させると早々に退却し、秦軍は大敗を喫する。その頃、副将・桓騎は四天王・介子坊と交戦していた。奇襲攻撃に正攻法の介子坊は苦しみ、やむなく玄峰と将を交代する。玄峰は隠されていた桓騎本陣を言い当てて潰しにかかるが、その玄峰の本陣に桓騎が姿を現す。"},
      {ep:"第22話", h:"蒙恬の提案", body:"桓騎が玄峰を討ち取ったとの報が届き、信は続いて輪虎を討とうと闘志を燃やす。だが蒙恬は今の戦い方では到底太刀打ちできないと語る。輪虎はかつて王騎に一太刀浴びせた強者であり、まだ本気を出していない。その輪虎を倒すため、蒙恬は信と王賁にある提案をする。"},
      {ep:"第23話", h:"三隊共闘", body:"守備に徹する秦中央軍の中で、蒙恬の楽華隊が独断で遊軍と化して単独で前へ出る。敵も味方も驚く中、信と王賁だけは戦況を見つめて合図を待つ。これが前日に蒙恬が提案した、三隊で輪虎を討つ作戦だった。楽華隊は輪虎本陣へ突撃するが、その前に屈強な輪虎兵が立ちはだかる。"},
      {ep:"第24話", h:"越えるべき壁", body:"蒙恬の合図で飛信隊と玉鳳隊が輪虎本陣へ攻め入る。だが輪虎は動じず、その猛攻に王賁は反撃できず、信も深手を負う。一方左軍では本陣が後退する中、壁だけがその場に留まって奮戦していた。そこへ、本陣とともに退いていたはずの副将・王翦が現れる。"},
      {ep:"第25話", h:"裏の裏", body:"王翦の命で五千の将となった壁は、四天王・姜燕の迎撃に向かう。絶好の地形に追い込んで討ち取ろうとした瞬間、新たな敵軍が現れて逆に窮地に陥る。これまでの優位はすべて姜燕の罠だった。絶体絶命の壁の前に現れたのは、迎撃を命じた王翦その人だった。"},
      {ep:"第26話", h:"将の器", body:"姜燕軍を追い詰めた王翦軍だが、その行動すら読んでいた廉頗が自軍を率いて現れる。士気の上がった魏軍が襲いかかろうとする中、王翦はあっさりと自軍の砦へ撤退する。一方、死闘の末に痛烈な一撃を撃ち込んだ信も輪虎を討ち取れず退却を余儀なくされ、各々が決戦の近づきを感じていた。"},
      {ep:"第27話", h:"決着の刻", body:"開戦六日目、信は決戦を待つが、この日の飛信隊は後方支援として待機を命じられる。不満がる信だが、これは輪虎に当たりやすいようにという配慮だった。改めて闘志を燃やす信。戦いが始まると、守備に徹する秦中央軍に対し、輪虎はかつて王騎軍の守備すら貫いたという特殊な戦術を仕掛けてくる。"},
      {ep:"第28話", h:"最後の策", body:"中央軍の激戦と同時に、蒙驁本陣の背後に廉頗が自軍を率いて現れる。側近たちがうろたえる中、蒙驁だけは動じず、長年練り上げてきた布陣で挑む。一方中央では輪虎が圧倒的な破壊力で陣形を突破してくる。その進撃を止めたのは隊を分離して突撃した飛信隊であり、信は再び輪虎と対峙する。"},
      {ep:"第29話", h:"一瞬", body:"蒙驁の布陣をことごとくかわし、廉頗が頂上へ駆け上がる。突入は時間の問題だった。中央では、左腕を負傷したままの輪虎が信の足に深手を負わせる。だが信は驚異的な精神力で立ち上がる。二人の戦いは一騎打ちの様相を呈し、そこへ割って入ろうとする者がいた。"},
      {ep:"第30話", h:"大事な仲間", body:"注意がそれた一瞬の隙をついて信が輪虎を斬り伏せる。手ごたえはあったが輪虎は再び立ち上がり、廉頗のために負けられないと語る。同じ頃、負傷兵を率いて待機していた羌瘣の前に巨体の騎馬隊が突撃してくる。深い傷を負っていた羌瘣は一瞬躊躇するも、飛信隊副長として仲間のために挑む。"},
      {ep:"第31話", h:"蒙驁､退かず", body:"激戦の末、信が輪虎との一騎打ちに勝利する。羌瘣の無事を確認した信は休む間もなく本陣へ急ぐ。その本陣では廉頗が陣内へ攻め込んでいた。圧倒的な威圧感に兵たちが動けなくなる中、蒙驁がただ一人前へ進み出る。そして四十年間の熱き想いを武器に、廉頗へ一騎打ちを挑む。"},
      {ep:"第32話", h:"色あせぬ時代", body:"蒙驁の矛は廉頗の武力に届かず、重傷を負わされる。駆けつけた信も息をのむ。だが廉頗が大将軍・王騎を侮蔑するような発言をすると、信はたまらず怒声を上げ、真っ向から挑む。信に向かって歩を進める廉頗。一方、魏本陣には行方を眩ませていた桓騎軍が攻め込み、魏の総大将・白亀西を捕えていた。"},
      {ep:"第33話", h:"勝利…そして", body:"白亀西討ち取りの報を受け、介子坊は戦を五分に持ち込むため蒙驁を討とうとする。だが戦が詰んでいると感じた廉頗は介子坊を制し、蒙驁に和睦を申し入れる。この瞬間、秦軍の勝利が決まった。改めて向かい合った信は廉頗から大将軍の条件を突きつけられ、決意を新たにする。一方羌瘣は、この戦を機に飛信隊を離れ一人旅立とうとしていた。"},
      {ep:"第34話", h:"軍師の到着", body:"武功を上げた信は正式に千人将へ昇格する。新生飛信隊は勢いのまま新たな戦場へ出るが、そこから連戦連敗を重ねる。作戦立案を担っていた羌瘣が抜けたことで隊が機能しなくなっていたのだ。それを見かねた蒙恬の紹介で新たな軍師が加入するが、戦場を共にしていないよそ者の加入に隊は強い拒絶反応を示す。"},
      {ep:"第35話", h:"試練と覚悟", body:"新たな軍師としてやってきたのは、あの河了貂だった。新参者の指示には従えないと拒絶されるが、そうなることを理解していた貂は怯まず彼らと向き合い、戦場に留まる覚悟を語る。信は決意を受け止めつつ戦いへの口出しは認めない。だが状況は好転せず、更なる苦境の中でついに河了貂が指揮をとる。"},
      {ep:"第36話", h:"上を行く", body:"貂の機転で飛信隊は迫る魏軍をかわし、隊の立て直しに成功する。動きの違いに違和感を覚えた敵軍師は新たな参謀の加入を確信し、力量を測る策を仕掛ける。だが貂の指示で圧倒的優勢を作り出した飛信隊は混乱した敵先鋒を葬り、続く一手も上回って勝利を収める。"},
      {ep:"第37話", h:"遠雷", body:"本来を上回る力を得た飛信隊は次々と敵を撃破し、新たな土地の平定に成功した秦は『山陽東郡宣言』——領土拡大のための宣戦布告を行う。この動きを注視していた李牧は大軍を興し、なぜか燕軍との戦に動き出す。一方咸陽では呂不韋が『相国』の座に就き、さらなる権力を握ろうとしていた。"},
      {ep:"第38話", h:"謀略の舞台", body:"政は幽閉されていた成蟜と対面し、一派の解放と引き換えに呂不韋への対抗への協力を求める。成蟜も呂不韋への不満からその取り引きに応じる。一方飛信隊は東の前線基地へ向かう途中、韓軍に攻め込まれていた徐という国を救出し、当初と別の道を進むことになる。その最中、数千の兵を率いた李牧と遭遇する。"},
      {ep:"第39話", h:"新たなる伝説", body:"成蟜と手を組んだ政陣営は勢いを取り戻し、左丞相に昌文君を据えることに成功して秦国掌握への足掛りを得る。一方、李牧と相対した信はその言動から、中華全土に更なる嵐が起こることを予感し、それを乗り切るべく決意を新たにする。中華統一を目指す政と、天下の大将軍を目指す信。二人の目はそれぞれの道を見据えていた。"},
      {ep:"—", h:"この束のテーマ", body:"個人の武で勝つ段階の終わり。信は隊をどう動かすかを問われる位置へ移り、世代交代が実際の階級として形になる。羌瘣が抜けて河了貂が入るという交代も、この章で起きている。"}
    ],
    points:[
      "太后は呂不韋と密通していた。宮女・向が命がけで運んだ証言で政陣営は攻勢に転じる（第10〜12話）。政と母の断絶は毐国反乱編の火種になる。",
      "秦軍の編成＝総大将 蒙驁／副将 王翦（左軍）・桓騎（右軍）。王翦と桓騎の初登場はこの戦い（19巻／アニメは第18話）。",
      "廉頗四天王＝輪虎・玄峰・介子坊・姜燕。玄峰は桓騎が討ち、輪虎は信が討った。",
      "廉頗と一騎討ちしたのは蒙驁（左腕を失う）。蒙武はこの戦いには参加していない。",
      "決着をつけたのは前線ではなく、桓騎が魏本陣を落として総大将・白亀西を討ったこと。廉頗は敗北を認めて和睦した。",
      "戦後、廉頗は楚へ亡命。羌瘣は羌象の仇討ちのため離脱し、合従軍編の最後まで不在になる。",
      "幕間で河了貂が正式加入。飛信隊の戦い方が『突撃』から『軍師つきの隊』へ変わる。"
    ],
    checks:[
      {q:"秦軍の総大将と二人の副将は？", a:"総大将は大将軍・蒙驁。副将は王翦（左軍）と桓騎（右軍）で、二人はこの戦いが初登場。"},
      {q:"廉頗四天王のうち、誰が誰に討たれたか？", a:"玄峰は桓騎が潜入して討ち、輪虎は信が一騎討ちで討った。介子坊・姜燕は生き残り、廉頗と共に楚へ移る。"},
      {q:"廉頗と一騎討ちした秦の将は？結果は？", a:"総大将・蒙驁。本陣まで攻め込まれて一騎討ちとなり、蒙驁は左腕を失った。"},
      {q:"この戦いの決着はどうついたか？", a:"桓騎が魏本陣を陥落させたことで廉頗が敗北を認め、和睦。秦は山陽を獲得した。"},
      {q:"信・王賁・蒙恬が臨時千人将になった理由は？", a:"輪虎が秦の千人将を次々暗殺し、千人将が不足したため軍を再編成した結果。"},
      {q:"戦後、羌瘣はどうしたか？", a:"姉同然だった羌象の仇（幽連）を討つため飛信隊を一時離脱。合従軍編の最後まで不在になる。"}
    ],
    keys:["mougou", "ousen", "kanki", "tou", "shin", "ouhon", "mouten", "renpa", "rinko", "genpou", "kaishibou", "kyouen", "rokuomi", "tenn", "heki", "kyoukai", "kyoushou", "ryofui", "rui", "gekishin", "f_gyokuhou", "f_gakuka"],
    battles:["b_sanyou", "b_choen"],
    newcomers:["ousen", "kanki", "renpa", "genpou", "kaishibou", "kyouen", "rinko", "sosui", "kokuou", "maron", "raido", "keisha", "rinbukun", "kouyoku", "hakurei"],
    deaths:["rinko", "genpou", "gekishin"]
  },
  {
    id:"a8",
    no:"VIII",
    name:"五国、来たる — 合従軍編",
    ep:"第3シリーズ 第1〜24話",
    vols:"原作 25〜34巻",
    chapters:"第257〜356話",
    year:"始皇六年",
    era:"対 楚・趙・魏・韓・燕",
    sides:"秦（函谷関・蕞） vs 六国連合（総大将 春申君／参謀 李牧）",
    result:"秦の防衛成功（連合は崩壊）",
    rank:"千人将 → 三千人将",
    quote:{t:"ここは、俺たちの国だ。", by:"嬴政（趣意）"},
    lead:"中華が束になって秦を潰しに来る。国が滅ぶ寸前まで追い込まれ、王の言葉がそれを押し返す。",
    beats:[
      {ep:"第1話", h:"迫り来る合従軍", body:"千人将となり軍師・河了貂を迎えた飛信隊。そんな中、各地の様子を探っていた王騎軍の軍長・録嗚未、干央と再会した信は、趙を中心に各国が不穏に動いていると聞く。それは秦に未曽有の危機をもたらす大きな嵐の前触れだった。"},
      {ep:"第2話", h:"一堂に会す", body:"列強六国から成る合従軍が秦への侵攻を開始。危機打開のため昌平君は東の斉と交渉し、合従軍からの離反を促そうと考える。一方、状況を把握しきれないまま雷原で魏軍に追いついた飛信隊が見たのは、呉鳳明自ら指揮する大軍を相手に少ない兵数で善戦する麃公軍の姿だった。"},
      {ep:"第3話", h:"函谷関攻防戦", body:"昌平君に召集された秦の名だたる将軍が一堂に会す。発表された作戦は、全軍で国門・函谷関に敵を迎え撃つこと。秦を挙げた大軍勢が函谷関へ集結し、その中には飛信隊、王賁の玉鳳隊、蒙恬の楽華隊もいた。国の命運を握る戦いの幕が切って落とされる。"},
      {ep:"第4話", h:"二つの戦場", body:"麃公将軍の下に配属された飛信隊は趙軍を次々と撃破していく。だが勢いに乗っていた麃公軍の動きが突然止まる。李牧が全幅の信頼を寄せる副将・慶舎の罠に、いつの間にか絡めとられていたのだ。一転して追い詰められた麃公軍。そのとき、この窮地を救う者が現れる。"},
      {ep:"第5話", h:"若き将の台頭", body:"呉鳳明が造った新型の井闌車で函谷関が危機に陥るが、望楼の桓騎は不敵に笑ってそれを見据える。一方、楚の大軍と対する蒙武・騰の連合軍では、いつも血気盛んな蒙武が静かに戦況を見守っていた。父の意図を汲んだ蒙恬が楽華隊を率いて激闘するが、その行く手に項翼と白麗が立ち塞がる。"},
      {ep:"第6話", h:"互いの自負", body:"蒙恬と王賁、項翼と白麗——若き将たちが戦場で熱い火花を散らす。一方、録嗚未は楚国第一軍を率いる臨武君と戦い、自らの武力に絶対の自信を持つ相手に苦戦を強いられる。そこへ王騎に認められ、その死後に軍を引き継いだ副官・騰が現れる。誇りをかけた闘いの幕が上がる。"},
      {ep:"第7話", h:"穴だらけの荒野", body:"命尽きるまで戦う兵たちを振り切り、信はついに趙将・万極のもとへ辿り着く。数多の怨念を背負う姿を見た信は、万極が長平で白起が行った大虐殺の生き残りだと知る。無差別に秦の民を殺してきた相手に激しい怒りと同情を同時に抱きながら、信は自分が今なすべきことを見出す。"},
      {ep:"第8話", h:"女傑・媧燐", body:"早くも合従軍から二人の将を討ち取った秦軍。だが敵にはまだ多くの将がいる。楚は第二軍の媧燐に第一軍の指揮も任せるが、媧燐は自身の第二軍を動かさず第一軍にのみ戦いを強いる。さらに本陣へ『全軍大いなる凡戦を連ねて十日後に函谷関を落とすべし』と進言。その意味に李牧は気づく。"},
      {ep:"第9話", h:"蒙武の檄", body:"開戦十五日目、双方全軍を挙げての戦いが始まる。力を温存していた蒙武軍も進軍を開始するが、なぜか味方の後続が来ない。困惑が広がる中、蒙武はこれまでの自らの戦い方を覆す戦法に打って出る。そして本陣に謎の進言をした媧燐は、次の作戦の準備を着々と整えていた。"},
      {ep:"第10話", h:"窮地の大抜擢", body:"媧燐の奇策で秦軍が混乱に陥る。録嗚未と干央が奮闘して危機を脱するも、媧燐の本当の狙いは別にあり秦軍は再び窮地に立つ。騰は急遽左右の軍の指揮官を入れ替え、新たな指揮官として蒙恬と王賁を抜擢する。一方函谷関では、呉鳳明の新兵器が守将たちを驚愕させ、毒に冒された張唐の軍に更なる難局が迫る。"},
      {ep:"第11話", h:"武将の矜持", body:"魏軍になりすました桓騎と張唐の隊が、大軍勢の中を韓軍本陣へ進む。あまりに大胆な奇策に、張唐は将軍・桓騎の才を垣間見る。そして自らも誇りをかけ、毒に冒された身をおして敵陣を進む。一方、猛攻にさらされる函谷関の上では、指揮を託された蒙驁がその覚悟に答えるべく奮起する。"},
      {ep:"第12話", h:"媧燐軍の突撃", body:"函谷関防衛の要となる山岳地帯では、王翦軍と燕軍総大将オルドの軍が戦っていた。山間戦を得意とするオルド軍に苦戦する王翦が、ここで思いもよらない行動に出る。一方、媧燐の策で窮地の騰軍は騰自らが出撃するが、五千の兵を与えられた項翼の執拗な攻撃で身動きが取れなくなる。"},
      {ep:"第13話", h:"至強", body:"高度な戦術で汗明の布陣の弱点を突いた蒙武軍。だが汗明の三人の側近に勢いを止められ追い詰められていく。軍全体に焦りが広がる中、蒙武は泰然と『全て作戦通りだ』と告げて動かない。そしてとうとう、残った五千を引き連れた蒙武が打って出る。中華最強を自負する漢・汗明への挑戦。"},
      {ep:"第14話", h:"最強の漢(おとこ)", body:"蒙武と汗明の一騎打ちが始まる。戦歴と大将軍としての格で遥かに上回る汗明に対し、蒙武は互角の戦いを見せる。両軍の兵が固唾を呑んで見守る中、媧燐が人知れず不穏な動きを見せる。移動する媧燐軍を追う途中でこれに気づいた蒙恬は、胸騒ぎを覚えて父のもとへひた走る。"},
      {ep:"第15話", h:"函谷関の裏", body:"蒙武の活躍で戦況を盛り返した秦軍。内側まで攻め込まれていた函谷関の守備軍も勢いに乗り、敵を押し戻し始める。しかし突如、この流れを覆す事態が国門を襲う。開戦後まもなく媧燐が合従軍本陣に伝えた言葉——十日後に落とせという進言の意味が、ここで形になる。"},
      {ep:"第16話", h:"李牧の行方", body:"蒙武軍に続き王翦軍の活躍で戦局は秦有利へ大きく傾き、国家存亡の危機を脱したかと思われた。ところが麃公はこれを『物足りない』と感じ、信も同じ思いを抱く。その頃、軍議を行う咸陽に奇妙な報告が届く。趙軍本陣に李牧がいない。秦を滅ぼす新たな一手が王都に迫っていた。"},
      {ep:"第17話", h:"本能型の極み", body:"飛信隊を引き連れ王都の危機を救うため動いた麃公は、仕掛けられた戦術を打ち破り、ついに李牧のもとへ辿り着く。だが李牧は剣を抜かず、代わりに立ちはだかったのは馬陽で王騎を討った龐煖だった。自らを武神と名乗る相手を前に不敵に笑う麃公。存亡を賭けた一騎討ちが始まる。"},
      {ep:"第18話", h:"政の決断", body:"李牧軍の進軍の速さは昌平君の想像を上回り、秦は函谷関の兵も呼び戻せず打つ手がない。呂不韋が不穏に動き、都では民の暴動も起きる。そんな中、政は国を救うある手立てのために動き始めた。一方、麃公の命を受けて咸陽へ向かう信たちは、激しい追撃に疲弊しながら王都手前の城・蕞に辿り着く。"},
      {ep:"第19話", h:"政､語りかける", body:"王都から兵を率いて蕞に現れた秦王・嬴政。ぼろぼろの信は思わぬ再会に安堵する。蕞のすべての者を集めた政は、大王自身も剣を取り民と共に敵を迎え撃つと語る。戸惑い恐怖していた民たちは、その言葉と覚悟に心を動かされ奮い立つ。秦最後の砦・蕞での決死の攻防戦が始まる。"},
      {ep:"第20話", h:"最初の夜", body:"昌平君の命を受けた介億が援軍を従えて到着し、防衛線の役者が揃う。信の飛信隊は不慣れながら奮闘する民兵とともに獅子奮迅の戦いを見せ、その様子を李牧の側近・傅抵が興味深げに見つめる。壁が将を務める東壁は風上の敵の猛攻に苦戦するが、そこには河了貂の秘策があった。"},
      {ep:"第21話", h:"秘密の露見", body:"飛信隊が守る南壁を、李牧の側近カイネと傅抵の隊が襲撃。素早い動きに翻弄される信の脳裏に、かつて羌瘣が投げかけた言葉が甦る。一方、戦慣れしていない民兵の弱点を突いて揺さぶりをかける李牧は、想像以上の抵抗を続ける蕞に不審を抱き、唯一彼らを奮い立たせられる人物に思い当たる。"},
      {ep:"第22話", h:"出し尽くす", body:"秦王が蕞にいるという事実が露見し、李牧は政を捕えるべく全軍を投入した総攻撃を開始する。連日の戦いで民兵が次々に力尽きる中、政の檄と各壁の将たちの奮闘で何とか闘志を繋ぎとめる。だが自力で勝る敵の攻勢に、とうとう蕞の士気は限界に達する。もはや奇跡にしか活路がない。"},
      {ep:"第23話", h:"破格の加勢", body:"陥落したかと思われた蕞に姿を見せたのは、山界の死王・楊端和率いる山の民。政と結んだ同盟に従い、圧倒的武力で李牧軍を撃破していく。予想だにしない事態に敗色濃厚となった李牧軍だが、そのとき武神・龐煖が現れる。誰もが圧倒される中、信は因縁の相手を倒すべく立ち向かう。"},
      {ep:"第24話", h:"深謝", body:"満身創痍で龐煖との一騎打ちに挑む信。龐煖はどんなに打ちのめしても折れない信の強さに戸惑いと苛立ちを隠せない。激闘の中、何度も打ち込んだ信の一刀がついに龐煖の身体を捉える。王騎を、そして麃公を破った宿敵に深手を負わせて退かせ、蕞は守り抜かれる。李牧は撤退し、合従軍は崩壊した。"},
      {ep:"—", h:"戦の後", body:"秦は滅亡の淵から生還する。政は楊端和に礼を述べ、山の民は即座に自分たちの遠征へ戻っていった。信はこの戦の功で三千人将となる。"},
      {ep:"—", h:"この束のテーマ", body:"中華が束になって秦を潰しに来た章。関を守る戦いと、王の言葉で街を戦う集団に変える戦い——同じ戦争の中に、まるで性質の違う二つの防衛戦が並んでいる。"}
    ],
    points:[
      "合従軍は総大将＝楚宰相・春申君、参謀＝李牧の六国連合。蔡沢の交渉で斉だけが開戦前に離脱した。",
      "函谷関の戦いと蕞の戦いは別の戦い。函谷関を守り切った直後に、李牧が別動隊で南から回り込む。",
      "麃公は龐煖に討たれる。王騎に続いて信は二人目の師を失う。",
      "蕞は兵ではなく住民が守った城。政の演説が兵力の代わりになったという、この作品の中心的な場面。",
      "信は蕞で龐煖に深手を負わせて退かせた（討ち取ってはいない）。決着は鄴攻略戦まで持ち越される。",
      "救援に来たのは楊端和の山の民三万。政が誰にも告げず単独で送っていた使者が届いていた。"
    ],
    checks:[
      {q:"合従軍の総大将と参謀は誰か？", a:"総大将は楚の宰相・春申君、参謀は趙の李牧。楚・趙・魏・韓・燕・斉の六国連合として組まれた。"},
      {q:"斉はどうやって連合から抜けたか？", a:"昌平君の策で蔡沢が斉王・王建と交渉し、合従軍に加わって得られる分の倍の土地・財・人を約束して離脱させた。"},
      {q:"函谷関の攻防で呉鳳明が投入した兵器は？", a:"巨大井闌車。城壁を越えさせるための攻城兵器で、桓騎が一台を焼き払った。"},
      {q:"蒙武が一騎討ちで討ち取った楚の将は？", a:"楚軍総大将・汗明。純粋な武の押し合いで勝った。"},
      {q:"麃公はどうなったか？", a:"函谷関を出て李牧の別動隊を追撃し、龐煖との一騎討ちの末に討たれた。"},
      {q:"蕞で四つの壁を守ったのは誰か？", a:"北壁を介億、東壁を壁、西壁を昌文君、南の正門を信。本営には河了貂と蒙毅が詰め、政は四つの壁を回って士気を保った。"},
      {q:"七日目に西壁が破られた後、戦況を覆したのは？", a:"楊端和率いる山の民三万の到着。政が単独で送っていた使者によるもの。"},
      {q:"この戦いで信は龐煖をどうしたか？", a:"愛馬・楢を犠牲にして落馬させ、胸を突いて王騎が刻んだ古傷の上を斬り、深手を負わせて退かせた。討ち取ってはいない。"}
    ],
    keys:["sei", "shin", "tenn", "shouheikun", "moubu", "tou", "ousen", "choutou", "hyoukou", "heki", "youtanwa", "riboku", "houken", "kaine", "shunshinkun", "kanmei", "rinbukun", "seikai", "orudo", "gohoumei", "kanto", "kouyoku", "hakurei", "karin", "kouen", "goumasho", "kanki", "kaioku", "mouki", "shinseijou", "futei", "oukenou", "saitaku", "f_gassho"],
    battles:["b_kankoku", "b_sai"],
    newcomers:["gohoumei", "kanmei", "orudo", "seikai", "ogiko", "futei", "gakurai", "garo", "karin", "goumasho", "kouen", "kaioku", "you_jo", "kaine", "choutou", "shunshinkun", "oukenou", "ganshu", "kozen", "chouin", "kouretsuou", "shinseijou"],
    deaths:["hyoukou", "choutou", "kanmei", "rinbukun", "seikai", "bankyoku", "shinseijou"]
  },
  {
    id:"a9",
    no:"IX",
    name:"仇討ちの果て — 羌瘣の復讐編",
    ep:"第3シリーズ 第25〜26話",
    vols:"原作 33〜34巻",
    chapters:"第357〜365話",
    year:"始皇六年（合従軍の直後）",
    era:"羌瘣の過去",
    sides:"羌瘣 vs 幽連",
    result:"羌瘣が復讐を終え、飛信隊へ復帰",
    rank:"三千人将（飛信隊）",
    quote:{t:"一緒に里を出よう。", by:"羌象"},
    lead:"山陽の後に姿を消していた羌瘣が、最後の始末をつける章。飛信隊の一員が、ようやく過去から解放される。",
    beats:[
      {ep:"第25話", h:"巫舞の違い", body:"秦が国の命運を握る戦いに全軍を挙げていた頃、飛信隊副長・羌瘣は姉と慕った羌象の仇討ちのため隊を離れ、趙にいた。蚩尤の里から逃げ出し、今は里の外で協力者として働く羌明から仇・幽連の居所を聞き、老山の山中へ足を踏み入れる。だが卑劣な手段もいとわない現・蚩尤の幽連に苦戦を強いられる。"},
      {ep:"第26話", h:"別の道", body:"現・蚩尤の幽連と、誰よりも蚩尤の才があると言われた羌瘣。最強同士の戦いは熾烈を極める。現世へのしがらみや想いを全て断ち切った幽連の圧倒的な強さに追い詰められ、抗う力もないまま意識を失いかけた羌瘣は、一筋の光を見る。その光に巫舞の秘密を垣間見た羌瘣は、辛くも勝利する。"},
      {ep:"—", h:"帰る場所", body:"復讐が終わったあとに残ったのは、目的のない自由と、帰る場所としての飛信隊だった。羌瘣は隊へ復帰する。以後の彼女の強さは、私怨ではなく隊の生存に使われる。"},
      {ep:"—", h:"この束のテーマ", body:"羌瘣は『誰かのために戦う』側へ移る。巫舞が寿命を削る技であることも含め、彼女の強さには常に代償がついている。"}
    ],
    points:[
      "羌瘣が飛信隊を離れたのは山陽の直後（23巻）。この章は合従軍編を挟んだ後の決着。",
      "巫舞は寿命を削る秘技。羌瘣の強さには常に代償がついている。",
      "羌象＝姉同然の存在で、蚩尤の祭で幽連に殺された。羌瘣の行動原理はすべてここに由来する。",
      "復讐の完了は喪失でもある。以後の羌瘣は目的を飛信隊に置き換えていく。"
    ],
    checks:[
      {q:"蚩尤の祭とはどんな儀式か？", a:"数十年に一度、蚩尤族の精鋭が殺し合って『蚩尤』の座を継ぐ祭。羌瘣と羌象はそこから二人で抜け出す約束をしていた。"},
      {q:"羌瘣が討った仇は誰か？", a:"幽連。蚩尤の座を継いだ相手で、羌象を殺した当人。"},
      {q:"巫舞の代償は？", a:"寿命を削ること。使うほど自分の生きる時間が短くなる。"},
      {q:"復讐後、羌瘣はどうしたか？", a:"飛信隊へ復帰した。目的を失った代わりに、帰る場所として隊を選んだ。"}
    ],
    keys:["kyoukai", "kyoushou", "yuren", "shin", "tenn", "kyoumei", "gakyou", "entei", "f_shiyuu", "f_kyouzoku", "f_yuuzoku"],
    battles:[],
    newcomers:["kyoumei"],
    deaths:["yuren"]
  },
  {
    id:"a10",
    no:"X",
    name:"弟の証明 — 屯留の反乱",
    ep:"第4シリーズ 第1〜5話",
    vols:"原作 34〜35巻",
    chapters:"第366〜378話",
    year:"始皇七年〜八年",
    era:"秦の内乱",
    sides:"壁の討伐軍 四万・飛信隊 vs 屯留軍 七万（蒲鶮）・趙軍 一万",
    result:"屯留を奪還（成蟜の死）",
    rank:"三千人将",
    quote:{t:"兄上…先に行きます。", by:"成蟜（趣意）"},
    lead:"王座を狙った弟が、最後に秦の王族としての務めを選ぶ章。呂不韋との権力争いが、地方の反乱という形で火を噴く。",
    beats:[
      {ep:"第1話", h:"戦後の七国", body:"函谷関攻防戦での働きを認められ、信は三千人将へ昇格。一時隊を離れていた羌瘣も戻り飛信隊は活気づく。咸陽も政に御子が誕生して沸いていた。大きな戦で疲弊した各国がそれぞれ国力を試される内乱期へ突入する中、秦もまた新たな波乱の時を迎える。"},
      {ep:"第2話", h:"不穏な影", body:"復興が進む一方、政と呂不韋の争いはますます激化。弟・成蟜の力添えで勢力を拡げる政陣営と、財力で陣営を増やす呂不韋はほぼ互角となる。そんな折、成蟜の第一夫人・瑠衣が帰省中の故郷・屯留へ趙軍が侵攻。北東の要所だが有力な将軍は各方面に遠征中で、この状況に成蟜が自ら出陣を申し出る。"},
      {ep:"第3話", h:"討伐軍出陣", body:"趙軍制圧に向かったはずの成蟜軍が一転、屯留で反乱を起こしたとの報に咸陽が騒然とする。呂不韋は北東部での成蟜の人気を考え、拡大前に討伐軍を送るべきだと言い放つ。だが謀略の気配を感じ取った政は、成蟜を生きて連れ帰ることを目的に、壁の軍と別働隊の飛信隊を屯留へ向かわせる。"},
      {ep:"第4話", h:"屯留攻城戦", body:"飛信隊と壁軍が合流し、屯留攻城戦が幕を開ける。早さが勝負となる役目のため、河了貂は信と羌瘣をそろって成蟜のもとへ向かわせる。一方、策略で牢に囚われた成蟜は、城主代行・蒲鶮から反乱のカラクリを聞き出し、別の牢の瑠衣を救出して蒲鶮の野望を阻止すべく脱獄を企てる。"},
      {ep:"第5話", h:"剣と盾", body:"信たちが探す屯留城内は乱戦状態で、成蟜も首謀者・蒲鶮も見つけられない。一方、交戦で深手を負った成蟜は、救い出した瑠衣に援軍を連れてくるよう頼み、自らはその場に留まって蒲鶮ら追手を迎え撃つ。成蟜は蒲鶮と刺し違え、瑠衣に政への協力を頼み、信に政を託して落命する。"},
      {ep:"—", h:"反乱終結と蒙驁の死", body:"討伐軍が屯留を奪還し、反乱は終結する。政は最大の政敵の一角を削った代わりに、たった一人の弟を失う。原作ではこの前後に大将軍・蒙驁が危篤に陥り、駆けつけた蒙恬と信に英雄への道を示して世を去る。"},
      {ep:"—", h:"この束のテーマ", body:"第一章で政の前に立った弟が、政の側で死ぬ。血統主義の体現者が『王を選ぶ』側に回るという、物語で最も重い回収の一つ。"}
    ],
    points:[
      "蒙驁の死はこの章（34巻）。山陽を落とした老将の退場で、蒙家は蒙武・蒙恬の二代になる。",
      "反乱の実行者は屯留代官・蒲鶮。呂不韋の後援を受け、成蟜を投獄して成蟜の名で挙兵した。",
      "討伐軍を率いたのは将軍・壁（四万）。屯留軍七万＋内通していた趙軍一万に対して数で劣勢だった。",
      "成蟜は蒲鶮と刺し違えて死ぬ。最後に瑠衣を逃がし、信に政を託した。",
      "この時点で呂不韋はまだ健在。失脚は次の毐国反乱編、死はさらに後（鄴攻略戦のあと）。"
    ],
    checks:[
      {q:"屯留の反乱を実際に起こしたのは誰か？", a:"屯留代官・蒲鶮。呂不韋の後援を受け、成蟜を投獄してその名を使って挙兵した。"},
      {q:"討伐軍の将と兵力、相手の兵力は？", a:"将軍・壁が四万。相手は屯留軍七万に、内通していた趙軍一万が加わった。"},
      {q:"戦局を変えたのは何だったか？", a:"趙軍一万の側面奇襲で討伐軍が崩れかけたところに飛信隊が参戦し、趙軍を撃退した。"},
      {q:"成蟜の最期は？", a:"自力で脱獄して瑠衣を救出し、逃げ切れないと判断して瑠衣を逃がし、蒲鶮と刺し違えて死んだ。政への協力を瑠衣に頼み、信に政を託した。"},
      {q:"この章で亡くなった大将軍は？", a:"蒙驁。危篤の床で蒙恬と信に英雄への道を示して世を去った。"}
    ],
    keys:["seikyou", "rui", "heki", "shin", "sei", "mougou", "mouten", "ryofui", "shoubunkun", "shouheikun", "tenn", "kou_jo", "ousen", "kanki", "taigo", "rouai"],
    battles:["b_tonryu"],
    newcomers:["rui", "rouai", "choukou"],
    deaths:["seikyou", "mougou"]
  },
  {
    id:"a11",
    no:"XI",
    name:"火竜、立つ — 著雍攻略戦",
    ep:"第4シリーズ 第6〜12話",
    vols:"原作 35〜37巻",
    chapters:"第379〜401話",
    year:"始皇八年",
    era:"対魏",
    sides:"騰軍・録嗚未軍・玉鳳隊・飛信隊 vs 呉鳳明軍・魏火龍七師（霊凰・凱孟・紫伯）",
    result:"秦の勝利（著雍を奪取・要塞化）",
    rank:"三千人将 → 五千人将",
    quote:{t:"俺は、強い奴とやりたいだけだ。", by:"凱孟（趣意）"},
    lead:"魏がかつての最強世代『魏火龍七師』を牢から出す。信と王賁が、格上の武将と正面から噛み合う戦い。",
    beats:[
      {ep:"第6話", h:"新たな要所", body:"秦魏国境の著雍で呉鳳明率いる魏軍と交戦中の将軍・騰により、飛信隊と玉鳳隊が増援として召集される。ところが魏に謎の三軍が合流し、秦軍は戦力的不利に陥る。打破のため騰は拡陽の王翦軍へ援軍を要請しようとするが、王翦の嫡男・王賁がこれに反対する。その真意とは。"},
      {ep:"第7話", h:"呼びかけ", body:"王賁の進言により、秦は録嗚未軍・玉鳳隊・飛信隊の三軍を主攻として、魏軍の布陣の僅かな隙を攻める策に出る。本陣を目指す飛信隊は、戦力差を克服するため河了貂の指揮でまず敵第一陣を徹底的に叩く。そこへ魏火龍の一人・凱孟が自ら前線に現れ、信に一騎打ちを持ちかける。"},
      {ep:"第8話", h:"貂の存在", body:"乱戦の最中、河了貂が凱孟軍の本陣へ拉致された。救出を優先するか作戦を続行するかで飛信隊の意見が分かれる中、羌瘣が試す手立てが一つあると言う。一方、初日で躓いた飛信隊とは対照的に、王賁の玉鳳隊は王翦の側近・関常の千人隊の働きもあって快進撃を続けていた。"},
      {ep:"第9話", h:"紫伯の名", body:"進撃を続ける玉鳳隊の前に、もう一人の魏火龍・紫伯の軍が立ちはだかる。知と武勇を併せ持つ紫伯は優れた戦術で玉鳳隊を翻弄し、極みに達した槍で次々と隊員を葬る。これを見た関常は即座の離脱を進言するが、王賁は自らが立てた作戦の遂行のため、このまま紫伯を討つと言い放つ。"},
      {ep:"第10話", h:"中華の注目", body:"三日目、飛信隊・玉鳳隊に続き録嗚未軍も本格参戦し、決戦の時が近づく。飛信隊はついに凱孟軍本隊と激突するが、河了貂の作戦に従って奮闘しても軍師・荀早の隙のない布陣を破れない。紫伯軍と戦う玉鳳隊も、余力のある関常隊を主攻に攻略を目指すが苦戦を強いられる。"},
      {ep:"第11話", h:"修練の日々", body:"一度敗れた槍の紫伯に再び挑む王賁。幼い頃からの鍛錬で達人の域と称される槍術をもってしても、死地で鍛え抜かれた紫伯の槍捌きをかいくぐれない。関常が副長・番陽に王賁を退かせるよう告げる中、王賁の槍が紫伯を捉え始める。王一族宗家を継ぐ者としての強い思いが、その差を埋めていく。"},
      {ep:"第12話", h:"傑物達の世代", body:"飛信隊・玉鳳隊・録嗚未軍が目の前の敵を突破し、一斉に魏軍本陣を襲撃する。呉鳳明の首を狙う最後の激闘。予想外の展開に魏軍は混乱するが、冷静に思考を巡らせた呉鳳明は秦軍の作戦の唯一の欠点を突くべく即座に動き出す。若き将たちは著雍攻略を果たせるのか。"},
      {ep:"—", h:"決着と昇格", body:"王賁が紫伯を、信が霊凰を討ち取り、魏軍は撤退。秦は著雍を奪取して要塞化を進める。論功行賞で信と王賁はともに五千人将へ昇格し、飛信隊は八千人隊になる。同世代の二人が初めて同じ位で並ぶ。"},
      {ep:"—", h:"この束のテーマ", body:"格上と噛み合っても崩れない練度を、信と王賁がそれぞれの流儀で証明する章。以後この二人は競争相手であり、同時に互いの策を前提にできる関係になる。"}
    ],
    points:[
      "秦の総大将は騰（王騎軍の後継）。魏の総大将は呉鳳明で、増援が魏火龍七師の霊凰・凱孟・紫伯。",
      "作戦の設計者は王賁。『三日目の正午に三軍同時突入』という時刻決め打ちの策だった。",
      "紫伯を討ったのは王賁、霊凰を討ったのは信。凱孟は生き残る（のちに秦へ）。",
      "河了貂が拉致され、凱孟の軍師との人質交換で戻った。軍師が隊の急所であることが露呈する。",
      "戦後、信と王賁がそろって五千人将へ。飛信隊は八千人隊になる。"
    ],
    checks:[
      {q:"この戦いの秦・魏の総大将は？", a:"秦は騰（王騎軍を継いだ）。魏は呉鳳明。"},
      {q:"魏火龍七師のうち、この戦いに出てきた三人は？", a:"霊凰・凱孟・紫伯。長く幽閉されていた旧世代の猛将たち。"},
      {q:"王賁が立てた作戦は？", a:"録嗚未軍・玉鳳隊・飛信隊の三軍が、三日目の正午に同時に魏軍本陣へ突入する策。"},
      {q:"紫伯と霊凰は誰が討ったか？", a:"紫伯は王賁（一騎討ち）、霊凰は信。"},
      {q:"河了貂に起きたことは？", a:"一日目の混戦で敵に拉致され、飛信隊が捕らえていた凱孟の軍師との人質交換で取り戻された。"},
      {q:"戦後の昇格は？", a:"信と王賁がともに五千人将。飛信隊は八千人隊になった。"}
    ],
    keys:["tou", "shin", "ouhon", "kyoukai", "tenn", "rokuomi", "gohoumei", "gaimou", "shihaku", "reiou", "junsou", "tairoji", "ranbihaku", "shikika", "ryuukoku", "kanjou", "banyou", "garo", "en", "sosui", "f_gikaryuu", "f_gyokuhou"],
    battles:["b_chakuyou"],
    newcomers:["shihaku", "reiou", "junsou", "tairoji", "ranbihaku", "shikika", "kisui"],
    deaths:["shihaku", "reiou"]
  },
  {
    id:"a12",
    no:"XII",
    name:"王の親政 — 加冠の儀・毐国反乱編",
    ep:"第4シリーズ 第13〜25話",
    vols:"原作 37〜40巻",
    chapters:"第402〜437話",
    year:"始皇九年",
    era:"秦の内乱",
    sides:"嬴政・飛信隊・蕞の兵 vs 毐国軍 三万（太后・嫪毐／呂不韋）",
    result:"政の完全勝利（呂不韋失脚・嫪毐処刑）",
    rank:"五千人将",
    quote:{t:"国は、金で回る。", by:"呂不韋"},
    lead:"政が実権を握るまでの最後の内政戦。武ではなく言葉で決する、この作品では珍しい種類の決戦。",
    beats:[
      {ep:"第13話", h:"咸陽の動き", body:"著雍の戦いを終え、秦は軍事重要拠点の更なる強化を目指す。咸陽が慌ただしくなる中、大王派・相国派に並ぶもう一つの勢力——政の実母・太后を頂点とする後宮派が突如、軍事拠点の一つ山陽一帯の統治を申し出、三大宮家が推す宦官の嫪毐に山陽長官を任せると告げに現れる。"},
      {ep:"第14話", h:"新しい国", body:"三大宮家の後見で山陽の統治に着手した太后と嫪毐は、山陽を越えて秦最北の地・太原で『一帯を毐国とする』と宣言する。宮廷に激震が走るが、政治とは無縁の者たちによる建国は頓挫すると考えられた。ところが毐国は順調に建国を進め、この機に乗じた楚が秦へ侵攻を開始する。"},
      {ep:"第15話", h:"何もない男", body:"秦は著雍戦で功績のあった者を昇格させ、軍の強化を図る。一方、列国の援助で勢力を増す毐国では、想定以上に強大化する状況を太后が警戒して嫪毐に忠告する。偽りの宦官から太后の愛人となり、毐国の王と祭り上げられた自身の立場に、嫪毐は改めて恐れを抱く。そこへ大臣・虎歴がある話を持ちかける。"},
      {ep:"第16話", h:"加冠の儀", body:"太后と嫪毐の間に隠し子がいたことが咸陽に露見し、制裁は免れないとの情報に毐国は騒然とする。虎歴は挙兵か、太后・嫪毐とその子らの首を差し出して降伏かの二択を迫る。後戻りのできない状況で太后が下す決断。その一方で、旧都・雍では第31代秦王・嬴政の加冠の儀の準備が進められていた。"},
      {ep:"第17話", h:"三方ゆずらず", body:"旧都・雍に国内外の要人が集まり、加冠の儀が執り行われる。堂々たる姿の政に皆が息を呑む中、式典は厳かに進む。ところがその最中、何らかの方法で函谷関をすり抜けた毐国軍が咸陽に迫っているとの急報が入る。中止を告げる呂不韋を政は制し、そのまま続行を宣言する。"},
      {ep:"第18話", h:"渡河の戦い", body:"危機にいち早く気づいた飛信隊が咸陽近くの渭水へ辿り着く。川を渡れば王都はすぐそこ。そこへ、合従軍戦で政とともに戦った民兵を含む蕞の兵たちが援軍として現れる。大王の危機に奮起した蕞の兵と共に舟で渭水を渡ろうとするが、対岸を押さえた敵の激しい攻撃で渡河は困難を極める。"},
      {ep:"第19話", h:"袂を分かつ", body:"鎮圧軍と合流した飛信隊と蕞の兵が、攻城戦の只中の咸陽に到着する。守備が手薄なところを狙われた咸陽は、敵と通じる者の裏切りもあってすでに都の中に敵が攻め入り、鎮圧軍は大軍に阻まれて近づけない。一方、加冠の儀を見届けた昌文君に、思いもよらない人物が声をかける。"},
      {ep:"第20話", h:"夢のような国", body:"加冠の儀を終えた政は、この先の未来を見据えて呂不韋と対峙する。呂不韋は政の抱く中華統一を『血の通った人間の歩む道ではない』と一刀両断し、自身が考える天下の起源と人について語り始める。その頃咸陽では、宮女・向が政の血を引く我が子・麗を守り抜く決意をし、親友・陽らと避難を急いでいた。"},
      {ep:"第21話", h:"唯一の勝機", body:"中華統一で戦国時代を終わらせると志す政に対し、呂不韋は『戦う動機は人それぞれにあり、人の世から戦はなくならない』と言い切る。政は『世の中をより良い方向へ進めることこそが為政者の役目』と述べ、人の心の本質とそれを教えてくれた恩人のことを語り始める。咸陽では戎翟公の軍に押し込まれた秦軍が劣勢を覆せずにいた。"},
      {ep:"第22話", h:"命がけの逃避", body:"王女・麗を守るべく走る向と陽の前に、後宮まで入り込んだ敵の一隊が現れる。二人を逃がすため身を挺する覚悟を決めた陽。そこへ信が駆けつける。一方、城外で指揮を執る河了貂は、劣勢の続く秦軍に焦りを募らせていた。これ以上敵を城内に入れないため、陣を仕切り直す猶予もない。"},
      {ep:"第23話", h:"逆転の猛進", body:"昌文君とともに軍総司令・昌平君が軍を率いて咸陽に到着する。戦況を確認した昌平君は自ら先頭に立ち、敵将・戎翟公を討つべく進撃を開始。その猛々しい姿に兵たちが目を見張る中、直下部隊は河了貂らと連携して陣形を整え、戎翟公を追い詰めていく。"},
      {ep:"第24話", h:"内乱の終着点", body:"咸陽の戦いが終わり、政と呂不韋の権勢争いもついに決着する。首謀者として捕らえられた嫪毐は経緯を包み隠さず自供して刑に処されることとなるが、そこへ太后が現れ、自身の罪を語って嫪毐とともに刑を受けることを望む。これを聞き入れない政に対し、太后は思わぬことを口走り、その場の全員を驚かせる行動に出る。"},
      {ep:"第25話", h:"雄飛の刻", body:"関係者がそれぞれの罪で処分を受ける中、最も深く関わった呂不韋は国の中枢にいたため精査すべきことが多く、いまだ裁けずにいた。そんな中、信は政から中華統一に向けた今後の構想を聞く。一見無謀とも思える計画に驚く信だが、『六大将軍を復活させる』という政の言葉に奮い立つ。"},
      {ep:"—", h:"この束のテーマ", body:"物語の第一部の終わり。武ではなく言葉で決する対決の末に、政はようやく秦の実権を握る。以後の敵は国内の権力ではなく、六国そのものになる。"}
    ],
    points:[
      "毐国は秦の内側に建てられた別国家。太后が担ぎ、嫪毐が王を名乗った。",
      "政と呂不韋の論戦（金で回す／戦争を無くすために統一する）はこの章。決着は咸陽の戦いに委ねられた。",
      "昌平君がここで呂不韋を離反する。軍の頂点が政側についたことで力関係が確定した。",
      "呂不韋はここで失脚するが、まだ死んでいない。自殺の報が入るのは鄴攻略戦の後（始皇十二年）。",
      "政は信に『十五年で中華統一』という工程を明かす。以後の全戦役はこの計画の中にある。"
    ],
    checks:[
      {q:"毐国とは何か。誰が作ったか？", a:"太后と嫪毐が太原で建国を宣言した、秦の内側の別国家。呂不韋の後押しがあった。"},
      {q:"咸陽へ侵攻した毐国軍と、迎え撃った秦側の兵は？", a:"毐国軍三万に対し、飛信隊一千と蕞の兵一万。"},
      {q:"呂不韋と政の主張をそれぞれ一言で。", a:"呂不韋は『国は金で回る（金を操って国を治める）』、政は『戦争を無くすために中華を統一する』。"},
      {q:"昌平君はこの章で何をしたか？", a:"加冠の儀の後、呂不韋を離反して昌文君と共に毐国軍討伐へ向かった。"},
      {q:"嫪毐と呂不韋はそれぞれどうなったか？", a:"嫪毐は咸陽で処刑。呂不韋は相国の座を失って失脚した（死ぬのはさらに後）。"},
      {q:"章の最後に政が信に明かした構想は？", a:"十五年で中華を統一するという工程。"}
    ],
    keys:["sei", "ryofui", "taigo", "rouai", "shouheikun", "shoubunkun", "shin", "kanki", "risi", "saitaku", "shibakuu", "heki", "tenn", "kou_jo", "choukou", "hanoki", "hanruki", "wategi", "f_ai", "f_ryofui", "f_seiha"],
    battles:["b_aikoku"],
    newcomers:["hanoki", "hanruki", "wategi"],
    deaths:["rouai"]
  },
  {
    id:"a13",
    no:"XIII",
    name:"どう勝つか — 黒羊丘の戦い",
    ep:"第4シリーズ 第26話 〜 第5シリーズ 第12話",
    vols:"原作 41〜45巻",
    chapters:"第438〜484話",
    year:"始皇十年",
    era:"対趙 / 桓騎の下で",
    sides:"桓騎軍 五万・飛信隊 vs 慶舎軍・紀彗軍 七万",
    result:"秦の勝利（黒羊丘を占領・信の武功は取り消し）",
    rank:"五千人将",
    quote:{t:"勝てば官軍だ。", by:"桓騎（趣意）"},
    lead:"世代が入れ替わり、信は初めて『勝ち方』そのものを問われる。桓騎という異物が突きつける問い。",
    beats:[
      {ep:"4期26話", h:"六将の行方", body:"秦が生まれ変わろうとしていた頃、大国・楚も歴史的な局面を迎える。国を支えてきた考烈王と宰相・春申君が倒れ、国政が混乱。これにより思いもよらない人物——李園が楚の宰相に就く。一方秦では、信・王賁・蒙恬が『六大将軍の復活』へ向けて更なる飛躍を誓い合う。"},
      {ep:"5期1話", h:"化物達の出陣", body:"数々の武功を上げ、将軍の一歩手前・五千人将となった信。更なる武功のため、総大将・桓騎の下で趙の黒羊丘攻略に挑む。だが樹海に囲まれた戦場に戸惑う飛信隊を、趙軍副将・紀彗の側近らが密かに狙っていた。波乱の黒羊丘攻略戦の幕が開く。"},
      {ep:"5期2話", h:"戦場の匂い", body:"黒羊丘は五つの丘を巡る密林の戦場。飛信隊は紀彗の副官・馬呈と劉冬の奇襲に翻弄され、秦左軍は慶舎とその副官・岳嬰の急襲を受けて敗走する。一方で桓騎側近・雷土らは趙軍の砦を焼き討ちにする。正攻法をほとんど採らない桓騎軍の性格が、緒戦から出てくる。"},
      {ep:"5期3話", h:"黒羊の夜", body:"慶舎と紀彗の軍に阻まれ、秦軍は前線を押し上げられないまま夜を迎える。前線を大きく後退させたため、斥候に出た羌瘣の小隊は趙軍側に取り残される。だが羌瘣は逆にこの状況を利用して密かに敵将を狙う。一方、敵の策に嵌った責任を問われた信は、河了貂と共に翌日以降の反撃を誓う。"},
      {ep:"5期4話", h:"副長の責任", body:"樹海中央の巨大な丘を巡る陣取り合戦が始まる。飛信隊は信が宣言した『中央丘横まで軍を進める』を最低条件に戦うが、目の前に川の対岸に陣取った敵軍が立ちはだかる。河了貂は、師の昌平君も『無手』と断言する橋も舟もない渡河を攻略するため、要となる役割を最古参の副長・渕に任せる。"},
      {ep:"5期5話", h:"執念の渡河", body:"渕と別働隊の奮闘により、浅瀬で猛攻に晒されていた信たちも対岸への上陸に成功し、飛信隊の反撃が始まる。一方、中央丘の陣取り合戦では桓騎軍の副官・黒桜の隊が紀彗軍を大いに押し込んでいた。だが総攻撃を仕掛けようとしたその時、敵軍前線に将軍・紀彗が姿を現す。"},
      {ep:"5期6話", h:"黒羊の大一番", body:"馬呈・劉冬軍から主導権を奪い取った飛信隊は、勢いに乗って中央丘を狙う次の攻撃に出る。戦いを有利に進める絶好の機会を得た秦軍。この好機に総大将・桓騎の動きへ注目が集まる。一方、劉冬との戦いで重傷を負った羌瘣は、樹海のとある集落で目を覚ましていた。"},
      {ep:"5期7話", h:"離眼の悲劇", body:"思いもよらない桓騎の行動——三日目に何もしないという判断——により、飛信隊は立て直した馬呈・劉冬軍と再び激闘する。膠着が続く中、慶舎は桓騎を追い詰めるため標的の一つ・飛信隊の壊滅に動き出す。一方、集落で手当てを受ける羌瘣は、長の混バァから紀彗が城主を務める離眼城の悲劇を聞く。"},
      {ep:"5期8話", h:"一瞬の出来事", body:"自ら精鋭を率いた慶舎の急襲と、呼応して包囲へ切り替えた馬呈・劉冬軍によって飛信隊は絶体絶命に陥る。秦軍は大打撃を受けるかと思われた。ところが紀彗と慶舎の副官・金毛は、上策であるはずの急襲になぜか奇妙な違和感と不安を覚える。その違和感の正体とは。"},
      {ep:"5期9話", h:"\"凶\"", body:"信の一言で、飛信隊は趙軍総大将・慶舎を討ち取る作戦を決行する。気づいた劉冬に行く手を阻まれる中、ようやく戻った羌瘣が合流。劉冬軍を羌瘣隊に任せ、信は隊を率いて慶舎本陣を駆け抜ける。起死回生の一手を狙う信の刃が、ついに慶舎に届く。"},
      {ep:"5期10話", h:"矜持の咆哮", body:"総大将を失っても紀彗と金毛の軍は徹底抗戦に出る。猛攻が続く中、桓騎は突如自軍に丘からの撤退を命じ、中央丘は趙軍の手に落ちる。納得しない黒桜ら副官に桓騎はあることを告げる。一方、樹海の異変に気づいて駆け出した羌瘣を追った飛信隊は、集落で驚愕の光景を目にする。"},
      {ep:"5期11話", h:"尾平と飛信隊", body:"桓騎軍の非道を目の当たりにし、信と羌瘣は激しい怒りに駆られ、飛信隊と桓騎軍は一触即発になる。桓騎軍に組み込まれていた尾平がこの場を収める役目を任されるが、その懐には桓騎の手下に無理やり手渡された略奪品があった。弁解もできないまま、尾平は飛信隊からの追放を言い渡される。"},
      {ep:"5期12話", h:"勝敗の夜ふけ", body:"桓騎から中央丘の奪還を任された飛信隊だが、砦化が進む丘を落とすのは難しい。その頃、趙軍本陣では桓騎に揺さぶりをかけられた紀彗が、趙将として、離眼城の城主として究極の選択を迫られていた。離眼での虐殺を予告された紀彗は撤退を選び、その隙に桓騎が黒羊丘を占領して勝利する。"},
      {ep:"—", h:"武功の取り消し", body:"羌瘣が起こした桓騎軍との刃傷沙汰が取沙汰され、信の武功は取り消される。勝ったのに何も残らない。後味の悪さだけを持って飛信隊は内地へ帰還する。なお、この戦いの後に桓騎軍から那貴が飛信隊へ加わる。"},
      {ep:"—", h:"この束のテーマ", body:"強さの次は、正しさ。王騎が示した『大将軍』像と、桓騎が体現する『勝てば官軍』のあいだで、信が自分の線をどこに引くかという章。"}
    ],
    points:[
      "趙軍の総大将は慶舎（李牧の腹心）、副将が離眼城主・紀彗。慶舎は罠の名手、紀彗は領民に慕われる将。",
      "桓騎の三日間の『何もしない』は、四日目に慶舎を引き出すための仕掛けだった。",
      "羌瘣は二日目に劉冬の返り討ちで重傷。復帰後、桓騎軍の虐殺に暴発して味方を殺傷する。",
      "最後の決め手は戦闘ではなく、桓騎が紀彗に離眼での虐殺を予告した脅迫。紀彗は領民を守るため撤退した。",
      "信は慶舎を討ったが、羌瘣の刃傷沙汰のため武功が取り消される。勝ったのに何も得ていない。",
      "この戦いの後、桓騎軍から那貴が飛信隊に加わる。"
    ],
    checks:[
      {q:"黒羊丘の地形と、両軍の目標は？", a:"密林地帯。そこにある五つの丘の奪取が両軍の目標だった。"},
      {q:"趙軍の総大将と副将は誰か？それぞれどんな将か。", a:"総大将は李牧の腹心・慶舎（罠を張る沈黙の狩人）、副将は離眼城主・紀彗（領民に慕われ、領民の安全を優先する）。"},
      {q:"桓騎が三日目に何もしなかったのはなぜか？", a:"四日目に慶舎自身を前へ引き出すため。実際に慶舎は飛信隊へ猛攻を掛け、そこへ桓騎軍が乱入して混戦になった。"},
      {q:"羌瘣がこの戦いで負った傷と、その後の暴発の理由は？", a:"一日目の夜に劉冬へ夜襲を仕掛けて返り討ちに遭い瀕死の重傷。復帰後、桓騎軍の集落虐殺を知って桓騎本陣に乗り込み、桓騎兵を殺傷した。"},
      {q:"最終的に黒羊丘はどう決着したか？", a:"桓騎が紀彗に離眼での虐殺を予告して脅迫し、紀彗が撤退。その隙に桓騎軍が黒羊丘を占領した。"},
      {q:"信の武功はどうなったか？", a:"羌瘣の刃傷沙汰が問題になり、取り消された。"}
    ],
    keys:["shin", "kanki", "tenn", "kyoukai", "naki", "maron", "raido", "kokuou", "zenou", "keisha", "kisui", "gakuei", "kinmou", "batei", "ryuutou", "riboku", "youtanwa", "rien", "karin", "shunshinkun", "kouretsuou", "f_kanki", "f_saki"],
    battles:["b_kokuyou"],
    newcomers:["naki", "ringyoku", "zenou", "gakuei", "kinmou", "batei", "ryuutou", "iou", "rien"],
    deaths:["keisha", "ryuutou", "shunshinkun", "kouretsuou"]
  },
  {
    id:"a14",
    no:"XIV",
    name:"幕間 — 斉趙来朝と鄴の献策",
    ep:"第5シリーズ 第13話 〜 第6シリーズ 第2話",
    vols:"原作 45〜46巻",
    chapters:"第485〜495話",
    year:"始皇十年",
    era:"外交 / 戦後の統治",
    sides:"—",
    result:"次の大戦（鄴攻略戦）の下地",
    rank:"五千人将",
    quote:{t:"法で、国を治める。", by:"嬴政（趣意）"},
    lead:"剣ではなく言葉と書類の章。斉が事実上降り、李牧の提案が退けられ、鄴という次の標的が決まる。",
    beats:[
      {ep:"5期13話", h:"蔡沢の矜持", body:"黒羊丘の戦い後、他国の動きを警戒する秦。そうした中、蔡沢が斉の王建王と趙の宰相・李牧を伴って咸陽に帰国する。蔡沢の仲介で急遽開かれた政と斉王の会談で、政は中華統一が成れば『人が人を殺さなくてすむ世界がくる』と断言。斉王はこれを『空論だ』と断じる。大国の王同士が思い描く中華の未来が突き合わされる。"},
      {ep:"6期1話", h:"秦の障壁", body:"信は隊をさらなる高みへ導くため、厳しい試験による新兵の選抜を行っていた。その頃咸陽では李牧が政に謁見。李牧が持ちかけた七国同盟の構想を政は空論と一蹴し、政の宿願・中華統一を李牧が批判して両者は激しく対立する。目的は同じで手段だけが違う二人が、正面から擦れ違う。"},
      {ep:"6期2話", h:"激動の起こり", body:"黒羊を新たな拠点に趙攻略を進めようとする秦軍。ところが李牧の戦略によって戦いは長期化を免れない状況となり、これを避けたい昌平君は大胆な奇策による突破を狙う。一方、左丞相・昌文君は『中華統一後に法が治める国を作る』という政の言葉を受け、対立関係にあった法家・李斯を密かに訪ねて協力を求める。"},
      {ep:"—", h:"斉、事実上の降伏", body:"政の『法で治める』という答えに感嘆した斉王は、事実上の降伏宣言を告げて帰る。一国が戦わずに勝負を投げた。飛信隊も募兵で新兵千人を増員し、次の大戦に向けて隊の形を作り直す。"},
      {ep:"—", h:"鄴を狙う", body:"そして昌平君が奇策を献言する——趙王都・邯鄲の喉元にある大都市・鄴を取る。城ひとつではなく地方まるごとを削ぎ取るという、規模が一段変わった構想。"},
      {ep:"—", h:"この束のテーマ", body:"戦の勝敗ではなく、国の運営が主題になる短い章。政の統一が『占領』ではなく『統治』として設計されていることが示される。"}
    ],
    points:[
      "斉は戦わずに事実上の降伏宣言をした。政の『法で治める』という答えがそれを引き出した。",
      "李牧の七国同盟案は政に一蹴される。李牧と政は目的（戦を無くす）が同じで手段が違う、という構図の確認。",
      "飛信隊は募兵で新兵千人を増員。黒羊で武功を失った後の立て直し。",
      "昌平君が鄴攻略を献策。城ではなく地方を面で取るという、それまでと規模の違う作戦。"
    ],
    checks:[
      {q:"咸陽に来朝したのは誰と誰で、手引きしたのは？", a:"斉王・王建と趙の李牧。蔡沢が手引きした。"},
      {q:"斉王が事実上の降伏宣言をした理由は？", a:"政が『法で国を治める』と語ったことに感嘆したため。"},
      {q:"李牧が提案し、政が退けたものは？", a:"七国同盟。政は空論だと一蹴した。"},
      {q:"昌平君が献策した次の作戦は？なぜ奇策なのか。", a:"趙王都・邯鄲の喉元にある鄴の攻略。城ひとつではなく趙の西方を面で削ぎ取る規模のため。"}
    ],
    keys:["sei", "saitaku", "oukenou", "riboku", "shouheikun", "shoubunkun", "risi", "shin", "tenn", "en", "obei", "kanto"],
    battles:[],
    newcomers:["kanto", "kanpishi"],
    deaths:[]
  },
  {
    id:"a15",
    no:"XV",
    name:"国盗り — 鄴攻略戦",
    ep:"第6シリーズ 第3〜13話（放送中）",
    vols:"原作 46〜60巻",
    chapters:"第496〜642話",
    year:"始皇十一年",
    era:"対趙",
    sides:"王翦軍・桓騎軍・楊端和軍・飛信隊 二十万超 vs 李牧軍・藺家十傑・龐煖",
    result:"秦の勝利（鄴を含む趙王都圏南部を獲得）",
    rank:"五千人将 → 将軍（李信）",
    quote:{t:"ここを取れば、中華の形が変わる。", by:"昌平君（趣意）"},
    lead:"城ひとつではなく『地方まるごと』を取りに行く、規模が一段変わった戦い。信が将軍位に届く章。",
    beats:[
      {ep:"第3話", h:"秦軍の陣容", body:"李牧率いる趙軍との総力戦に向け、咸陽に大軍が集められた。昌平君は今回が桓騎・楊端和・王翦による連合軍戦になることを告げ、全軍の総大将が発表される。一方、侵攻開始の報を受けた李牧は迎え撃つ軍を西部前線の城に召集し、情報収集を担う腹心・舜水樹にある助言を与える。"},
      {ep:"第4話", h:"趙の国門", body:"最前線で情報を集めていた舜水樹から、戦いの行く末を左右する報せが李牧に届く。一方、兵糧の中継地点・金安に到着した秦連合軍では将たちが集められ、今回の戦いの真の目的が明かされる。作戦の要となる趙の国門・列尾を押さえるべく行軍を速める秦軍と、これを阻もうとする趙軍。総力戦の火蓋が切られる。"},
      {ep:"第5話", h:"列尾攻城戦", body:"楊端和率いる山の民軍と飛信隊による列尾城攻めが始まる。女王の檄を合図に勇猛果敢に攻め込む山の民の凄まじさに信たちが唖然とする中、城壁の攻め所を見つけた楊端和は、最強の戦士バジオウを送り込むため飛信隊に腕のいい弓使いによる援護を要請する。信はこの役目を新入りの蒼兄弟——仁と淡に任せる。"},
      {ep:"第6話", h:"列尾の罠", body:"秦軍の狙いに気づいて王都圏へ向かう李牧のもとに列尾陥落の知らせが届く。李牧は動揺する兵たちに『列尾には私の施した秘密がある』と告げる。一方、列尾城に入った秦連合軍では総大将が姿を消す中、桓騎・楊端和・信・河了貂・蒙恬・王賁らが重要な軍議に臨もうとしていた。"},
      {ep:"第7話", h:"陥落の武器", body:"李牧の戦略で当初の予定が無に帰し、秦連合軍は総大将・王翦の策で列尾を捨てることになる。王翦は鄴へ直接向かわず、小都市・吾多を皮切りに趙王都圏の中小都市を次々と陥落させ、民間人を傷つけずに別の城へ向かうよう厳命する。連合軍内も咸陽も困惑させる王翦の行動、その狙いとは。"},
      {ep:"第8話", h:"火蓋を切る", body:"ついに秦連合軍が趙第二の都市・鄴に到達。ここで桓騎軍・楊端和軍と袂を分かった王翦軍は、飛信隊・楽華隊・玉鳳隊と共に朱海平原へ向かい、李牧率いる趙軍と対峙する。戦いは楽華隊五千と離眼城城主・紀彗率いる趙軍三万の激突で幕を開ける。圧倒的な兵力差をものともせず、蒙恬が敵陣へ斬り込む。"},
      {ep:"第9話", h:"覚悟の比重", body:"数で優る紀彗軍を翻弄する楽華隊のもとに、主攻となる王翦軍第二将・麻鉱の軍が到着。王翦軍最強の攻撃力と言われる麻鉱軍が波状攻撃で紀彗軍を追い詰めていく。一方反対側の戦場では、第一将・亜光の軍に従う玉鳳隊に伝えられた命令は『待機』だった。参戦を求める王賁が強く反発する。"},
      {ep:"第10話", h:"犬戎の末裔", body:"総大将・王翦から飛信隊に重要な役目が与えられる。別働隊として趙将・紀彗を狙う信たちが、密かに敵陣へ迫る。その頃、朱海平原から離れた橑陽では楊端和軍が趙軍を圧倒していた。一方、李牧から指揮を任された舜水樹は、この戦いに勝つため独自の自治権を持つ犬戎族を援軍に引き入れようと目論む。"},
      {ep:"第11話", h:"必殺の別働隊", body:"乱戦の中、麻鉱軍と楽華隊の間を抜けた信の別働隊が紀彗軍本陣を急襲。紀彗を追い詰めたその時、李牧自らが『必殺の別働隊』として現れ、戦いの流れが変わる。李牧の一撃で総崩れの危機に陥る麻鉱軍。楽華隊と合流した信たちは、蒙恬の指揮の下で麻鉱軍の戦力を復活させる策に打って出る。"},
      {ep:"第12話", h:"格不足", body:"信らと楽華隊の奮闘で麻鉱軍に士気が戻る。蒙恬はこの勢いに乗って前線を押し戻す次の一手を打つ。その頃、反対側の戦場では亜光軍と共に戦う玉鳳隊に対し、趙軍の陰の英傑と呼ばれる趙峩龍軍が王賁を討ち取ろうと出撃。防戦一方の王賁の脳裏に、以前蒙恬が語ったある言葉がよみがえる。"},
      {ep:"第13話", h:"大将軍の景色", body:"絶体絶命で反撃の策を見出した王賁が、隊を率いて敵陣内を強行突破する。無謀に見える行動の中にある狙いに気づいた趙峩龍は驚愕する。一方、予想を超える楽華隊と玉鳳隊に苦戦を強いられる李牧は、趙峩龍と並ぶもう一人の陰の英傑・尭雲に出陣を要請する。飛信隊がさらなる武功を狙って機を伺う中、戦いは新たな局面を迎える。"},
      {ep:"51巻", h:"朱海三日目・尭雲", body:"ここから先はアニメ未放送。秦右軍へ合流した飛信隊は藺家十傑・尭雲と対峙し、互角以上の戦いを繰り広げる。趙の旧世代最強格が、飛信隊の実力を測る基準になる。"},
      {ep:"51〜52巻", h:"膠着", body:"李牧は鄴の兵糧が秦軍より多いと分かると長期戦に切り替える。兵糧責めのはずが、兵糧で負けているのは秦だった。戦局は膠着し、時間が敵になる。"},
      {ep:"52巻", h:"朱海九日目・亜光重体", body:"膠着を破るため秦右軍は飛信隊・玉鳳隊の両隊で岳嬰を挟撃する。だが尭雲・馬南慈の反撃で総大将・亜光が意識不明の重体に陥る。亜光救出のため玉鳳隊が離脱し、信は岳嬰を一刀両断にする。"},
      {ep:"52〜53巻", h:"橑陽・犬戎の加勢", body:"橑陽では舜水樹の到着で趙軍が城まで整然と撤退し、城主ロゾ率いる犬戎族が加勢して膠着する。さらに二日目の夜、援軍に赴いた壁が預かっていた兵糧が焼かれ、楊端和軍は勝ち筋ではなく期限と戦うことになる。"},
      {ep:"53巻", h:"橑陽・落城", body:"兵糧が尽きかけた八日目の夜、楊端和は明日で犬戎三兄弟を討つと宣言する。九日目、三軍主攻の総攻撃で三兄弟を討つが反撃で軍は散り散りになる。楊端和が執拗に狙われる隙に別働隊が橑陽城を陥落させ、最終的にロゾを壁が討ち取った。残存の犬戎族を従属させた楊端和は城を接収する。"},
      {ep:"53巻", h:"橑陽・転進", body:"敗れた舜水樹ら趙軍は、秦軍の退路を断つべく列尾へ転進する。勝っても盤面は楽にならない。"},
      {ep:"53〜54巻", h:"朱海・絶望的な右軍", body:"亜光を欠いた秦右軍は本陣からの指示も無く、兵糧も尽きかけて絶望的な状況に陥る。将がいない軍が、指示のないまま数日を持たせなければならない。"},
      {ep:"54〜55巻", h:"朱海十二日目・覚醒", body:"隊長からの渾身の檄によって覚醒した飛信隊・玉鳳隊が趙左軍を圧倒し、大きく後退させる。数でも策でもなく、意志が盤面を動かした局面。"},
      {ep:"55〜56巻", h:"朱海十三日目・王賁重傷", body:"尭雲が玉鳳隊に奇襲を仕掛ける。王賁は尭雲の右腕を粉砕するが、自らも重傷を負う。互いに致命傷を交換する形の決着になる。"},
      {ep:"56巻", h:"信、右軍の大将に", body:"その夜、秦右軍は信を大将に据える決断をする。同時に鄴では、王翦の兵によって城内の兵糧の殆どが焼失していた。兵糧責めがようやく機能し始める。"},
      {ep:"56〜57巻", h:"朱海十四日目・趙峩龍", body:"飛信隊は決死の突撃の末に趙峩龍を討ち取る。藺家十傑という趙の旧世代が、一枚ずつ落ちていく。"},
      {ep:"57巻", h:"朱海十五日目・李牧の攻勢", body:"鄴の一報を受けた李牧は攻勢に転じ、王翦軍と激戦を繰り広げる。守勢に徹していた側が、時間を失った瞬間に前に出てくる。"},
      {ep:"57〜58巻", h:"尭雲、討たれる", body:"秦右軍では王賁が尭雲を討ち、趙左軍を突破して李牧本軍へ挟撃を仕掛ける。趙側も傅抵・馬南慈が王翦本軍へ挟撃を仕掛けるが、そこへ王賁・蒙恬が駆け付ける。"},
      {ep:"58巻", h:"信 対 龐煖", body:"飛信隊は金毛を討ち、李牧の目前にまで迫る。そこへ立ちはだかったのが龐煖だった。王騎と麃公、二人の師の分を背負った一騎打ちの末、信は死力を出し尽くしてついに討ち取る。"},
      {ep:"58巻", h:"李牧、撤退", body:"李牧は朱海平原から撤退し、全軍で鄴へ向かう。戦術で勝った側が、戦略の締め切りに間に合わなかった。"},
      {ep:"58〜59巻", h:"鄴、内から開く", body:"王翦軍は精鋭部隊で追撃し、李牧軍は幾度も足止めされる。一方の鄴では兵糧不足による暴動が発生し、十八日目には内側から城門が開き、突入した桓騎軍によって陥落する。"},
      {ep:"59巻", h:"兵糧と列尾", body:"入城した秦軍は兵糧不足が深刻化するが、斉から買い入れて解決する。さらに騰軍が列尾へ進攻。列尾を守備する扈輒は、李牧が敗戦の咎で投獄・斬首になると知ると全軍を邯鄲へ撤退させる。秦は趙王都圏南部を獲得した。"},
      {ep:"59〜60巻", h:"李信、将軍へ", body:"咸陽に凱旋した信は政から李姓を与えられ、以後『李信』と名乗る。論功行賞では蒙恬・王賁と共に将軍へ昇進。下僕から将軍までが、ここで一続きになる。"},
      {ep:"60巻", h:"趙の内乱", body:"邯鄲では李牧救出を目論む者により内乱状態となり、悼襄王が毒殺される。太子・嘉が李牧を解放するが、悼襄王の遺言により末子・遷が次期趙王となる。李牧と嘉は遷の派閥に命を狙われ邯鄲を脱出し、李牧は司馬尚のいる青歌城へ向かう。"},
      {ep:"60巻", h:"呂不韋の死", body:"始皇十二年、河南に隠遁していた呂不韋のもとに不穏な勢力が集結する。政は呂不韋と対談するが状況は悪化し、咸陽が処罰を下したところで呂不韋自殺の報が入る。最初の敵が、戦場ではない場所で退場する。"},
      {ep:"—", h:"この束のテーマ", body:"物語の転換点。信が『李信将軍』になり、龐煖という因縁が終わり、趙は王都圏の南半分と国の正気を同時に失う。以後の戦いは国同士の潰し合いになる。"}
    ],
    points:[
      "王翦の当初の策は列尾からの侵攻。だが列尾が意図的に弱くされていたことに気づき、列尾を放棄して鄴を兵糧責めにする策へ組み替えた。",
      "戦場は三つ（朱海平原＝王翦軍 vs 李牧／橑陽＝楊端和軍 vs 舜水樹・ロゾ／鄴＝桓騎軍の包囲）。同時並行で読むのがこの章の要点。",
      "麻鉱を討ったのは李牧本人。亜光は尭雲・馬南慈の反撃で意識不明の重体になり、以後の秦右軍は信が大将を務める。",
      "藺家十傑では岳嬰を信、趙峩龍を飛信隊、尭雲を王賁が討った。龐煖は信が討ち取り、王騎・麃公の因縁がここで終わる。",
      "鄴は戦闘ではなく兵糧切れで落ちた（城内の暴動で内側から門が開いた）。秦側も兵糧が尽きかけ、斉から買い入れて凌いだ。",
      "戦後、信は政から李姓を賜り『李信』となり、王賁・蒙恬と共に将軍へ昇進。趙では悼襄王が毒殺され、幽繆王（遷）の代になる。",
      "呂不韋は始皇十二年に自殺。政の最初の敵が退場する。"
    ],
    checks:[
      {q:"鄴攻略軍の総大将と、各軍の大将は？", a:"総大将は王翦。各軍の大将に楊端和と桓騎。総勢二十万超の連合軍。"},
      {q:"列尾が半日で落ちたことを、王翦はどう解釈したか？", a:"列尾が意図的に弱くしてあると気づき、戦略の破綻を悟った。そこで列尾を放棄し、全軍で攻め込んで鄴を兵糧責めにする策に組み替えた。"},
      {q:"朱海平原の一日目に麻鉱を討ったのは誰か？", a:"李牧本人。麻鉱軍は崩壊寸前に陥り、蒙恬が立て直して臨時将軍に昇格した。"},
      {q:"藺家十傑の岳嬰・趙峩龍・尭雲は、それぞれ誰が討ったか？", a:"岳嬰は信（一刀両断）、趙峩龍は飛信隊の決死の突撃、尭雲は王賁。"},
      {q:"橑陽の戦いで、ロゾを討ったのは誰か？", a:"壁。楊端和が執拗に狙われる隙に別働隊が橑陽城を落とし、最終的に壁がロゾを討ち取った。"},
      {q:"龐煖の最期は？", a:"朱海平原十五日目、李牧の目前で飛信隊の前に立ちはだかり、信との一騎打ちの末に討たれた。"},
      {q:"鄴はどうやって落ちたか？", a:"兵糧不足による城内の暴動で、十八日目に内側から城門が開き、桓騎軍が突入して陥落した。"},
      {q:"戦後、信の名前と階級はどう変わったか？", a:"政から李姓を賜り『李信』と名乗る。王賁・蒙恬と共に将軍へ昇進した。"},
      {q:"この章で趙の王位はどう動いたか？", a:"悼襄王が毒殺され、太子・嘉ではなく遺言により末子・遷（のちの幽繆王）が趙王になった。李牧と嘉は邯鄲を脱出し、李牧は青歌城の司馬尚のもとへ向かった。"}
    ],
    keys:["shin", "ousen", "kanki", "youtanwa", "riboku", "houken", "chougaryuu", "gyouun", "gakuei", "kinmou", "futei", "banaji", "shunsuiju", "kisui", "mouten", "ouhon", "tenn", "kyoukai", "akou", "makou", "denrimi", "kochou", "heki", "rozo", "dant", "kitari", "katari", "orudo", "shibashou", "tou", "sei", "ryofui", "toujouou", "ka", "yuubokuou", "kakukai", "shousa", "kyogai", "f_rinke", "f_kenjuu", "f_seika"],
    battles:["b_gyou", "b_ryouyou"],
    newcomers:["akou", "makou", "denrimi", "chougaryuu", "gyouun", "banaji", "shunsuiju", "soou", "akakin", "rozo", "dant", "kitari", "katari", "enpo", "kakukai", "youka", "toujouou", "ka", "yuubokuou", "shibashou", "soujin", "soutan", "kanjou", "shoutaku", "kyuukou", "dansa", "gunei", "rikusen", "shiryou", "choukihaku"],
    deaths:["houken", "gyouun", "chougaryuu", "gakuei", "kinmou", "makou", "rozo", "shousa", "kyogai", "ryofui", "toujouou"]
  },
  {
    id:"a16",
    no:"XVI",
    name:"同盟と継承 — 什虎攻略戦・六大将軍復活",
    ep:"アニメ未放送",
    vols:"原作 60〜62巻",
    chapters:"第643〜670話",
    year:"始皇十二年〜十三年",
    era:"対楚 / 秦の軍制",
    sides:"蒙武軍・騰軍・呉鳳明の魏軍 vs 什虎軍（満羽）・項翼・白麗",
    result:"秦魏連合の勝利（什虎陥落・三年の秦魏同盟）",
    rank:"将軍",
    quote:{t:"戦をしていない時間も、戦の一部だ。", by:"（趣意）"},
    lead:"邯鄲へ届かない秦が、外交と軍制で足場を作り直す章。羌瘣の過去が別の形で戻り、六大将軍が復活する。",
    beats:[
      {ep:"60巻", h:"抜けない防衛線", body:"鄴を得た秦軍は邯鄲攻略を目指すが、その前の防衛線すら抜けずにいた。地図の上では王手だが、実際には一歩も進めない。"},
      {ep:"60巻", h:"魏への取引", body:"昌平君は魏に取引を打診する——楚の要衝・什虎を合同で落とし、落とした什虎は魏へ譲渡する。その代わりに三年間の同盟を結ぶ。自国の戦果を差し出して時間を買う交渉。"},
      {ep:"60巻", h:"月地平原", body:"蒙武が什虎へ進軍し、亡国の残党たちで構成された什虎軍が迎え撃つ。両軍は月地平原で激突し、そこへ騰軍、楚の項翼・白麗軍、同盟を了承した呉鳳明率いる魏軍が次々に参戦する。"},
      {ep:"60〜61巻", h:"主攻と助攻", body:"秦魏が楚軍を挟撃しても崩せない。そこで呉鳳明は秦軍を主攻、魏軍を助攻とする形に組み替える。合従軍で秦を追い詰めた男が、今度は秦のために盤面を設計する。"},
      {ep:"61巻", h:"蒙武 対 満羽", body:"優勢に転じた秦魏軍のなか、蒙武は什虎軍総大将・満羽と一騎討ちに入る。武で押し切ることを信条にしてきた男が、同格の相手と正面から噛み合う。"},
      {ep:"61巻", h:"什虎陥落", body:"決着をつけたのは騰軍で、楚軍の本陣を落として勝利する。什虎城も魏軍別働隊によって陥落し、楚軍は王都・郢へ退却する。"},
      {ep:"61巻", h:"同盟の効果", body:"秦魏同盟が締結され、魏は韓への侵攻を開始し、秦は趙への侵攻を強める。前線では楽華軍・玉鳳軍が活躍する一方、飛信隊は劣勢が続いていた。"},
      {ep:"61巻", h:"羌礼の来訪", body:"そこへ現蚩尤・羌礼が飛信隊に加入する。だが加入の目的は羌瘣を殺すことだった。蚩尤の座を継いだ者にとって、里を出た羌瘣は決着のついていない相手である。"},
      {ep:"61〜62巻", h:"果たし合い", body:"羌礼は羌瘣に果たし合いを挑む。羌瘣はその中で羌礼を闇から救い出す。かつて自分が羌象に救われた側だった者が、救う側に回る。"},
      {ep:"62巻", h:"飛信隊、再び", body:"羌礼は飛信隊に正式加入し、隊は再び躍進する。羌瘣隊・羌礼という二枚の蚩尤を抱えた部隊になる。"},
      {ep:"62巻", h:"六大将軍、復活", body:"始皇十三年、秦で六大将軍が復活する。任命されたのは蒙武・騰ら五将で、一席は空位。選ばれた将は王の許可を待たずに独断で戦を起こせる。速度と裁量を秦軍が取り戻す。"},
      {ep:"62巻", h:"次の標的", body:"六将となった王翦・楊端和・桓騎が、武城・平陽の攻略を目指して出陣する。邯鄲の目前に残る二つの城が、次の戦場になる。"},
      {ep:"—", h:"この束のテーマ", body:"戦っていない時間の使い方が主題の章。外交で三年を買い、軍制で裁量を取り戻し、羌瘣は過去との決着を『殺す』以外の形でつける。"}
    ],
    points:[
      "什虎攻略は秦魏の共同作戦。落とした什虎は魏へ譲渡する条件で、三年間の同盟を得た。",
      "作戦を組み替えたのは呉鳳明（秦を主攻、魏を助攻）。決着をつけたのは騰軍が楚本陣を落としたこと。",
      "羌礼は現蚩尤で、飛信隊への加入目的は羌瘣を殺すこと。果たし合いを経て正式加入する。",
      "六大将軍が復活し、蒙武・騰・王翦・楊端和・桓騎の五将が任命（一席は空位）。王の許可なしに戦を起こせる権限を持つ。"
    ],
    checks:[
      {q:"什虎攻略戦の秦魏同盟の条件は？", a:"什虎を合同で落とし、落とした什虎は魏へ譲渡する。その代わりに三年間の同盟を結ぶ。"},
      {q:"什虎軍の総大将は誰で、誰と一騎討ちしたか？", a:"満羽。蒙武と一騎討ちになった。戦の決着は騰軍が楚本陣を落としたことでついた。"},
      {q:"羌礼が飛信隊に来た本当の目的は？", a:"羌瘣を殺すこと。羌礼は羌瘣が里を出た後に蚩尤の座を継いだ現蚩尤だった。"},
      {q:"復活した六大将軍に任命されたのは誰か？", a:"蒙武・騰・王翦・楊端和・桓騎の五将（一席は空位）。王の許可を待たずに戦を起こせる権限を持つ。"}
    ],
    keys:["moubu", "tou", "gohoumei", "manu", "sentoun", "genu", "kouyoku", "hakurei", "karin", "rien", "kyourei", "kyoushiki", "kyoukai", "shin", "tenn", "ousen", "youtanwa", "kanki", "shouheikun", "sei", "riboku", "f_rokushou_new", "f_shiyuu", "f_kyoukaitai"],
    battles:["b_jukyo"],
    newcomers:["manu", "sentoun", "genu", "kyourei", "kyoushiki"],
    deaths:[]
  },
  {
    id:"a17",
    no:"XVII",
    name:"影丘 — 武城・平陽攻略戦",
    ep:"アニメ未放送",
    vols:"原作 62〜64巻",
    chapters:"第671〜701話",
    year:"始皇十三年〜十四年",
    era:"対趙",
    sides:"桓騎軍 八万・飛信隊・玉鳳軍 vs 扈輒軍 二十四万",
    result:"秦の勝利（扈輒討死・武城平陽陥落）",
    rank:"将軍",
    quote:{t:"六大将軍を、復活させる。", by:"嬴政（趣意）"},
    lead:"邯鄲の守護神と呼ばれた大将軍を、圧倒的な兵数差の中で討ち取る戦い。桓騎の異常さが決定的になる章。",
    beats:[
      {ep:"62巻", h:"三倍の敵", body:"桓騎軍八万は趙軍に猛攻を掛けるが、趙軍総司令・扈輒が動くと兵数差が露わになる。扈輒軍二十四万に対し、桓騎軍は劣勢が続く。"},
      {ep:"62〜63巻", h:"影丘の壊滅", body:"桓騎軍の左軍が険地・影丘に差し掛かってほぼ壊滅する。救援に呼ばれた玉鳳軍も同じ地形に呑まれ、壊滅状態に陥る。地形そのものが敵として機能している。"},
      {ep:"63巻", h:"八日目・飛信隊の救出", body:"八日目、飛信隊は壊滅状態の玉鳳軍を救出し、扈輒側近・岳白公軍と対峙する。王賁の助言を受けて、飛信隊は影丘の断崖の攻略に出る。正面ではなく崖を登るという選択。"},
      {ep:"63巻", h:"九日目・雷土の最期", body:"九日目、飛信隊は断崖に到達して登り切る。同じ日、右軍の雷土は敵将・龍白公を討つが捕虜となり、拷問を受けて死亡する。桓騎軍の中核が、最も惨い形で失われる。"},
      {ep:"63〜64巻", h:"九日目・退却する桓騎軍", body:"桓騎軍は右軍・中央軍ともに逃亡者を多数出しながら退却を続ける。傍目には崩壊にしか見えない状況が、後から意味を持つ。"},
      {ep:"64巻", h:"李信 対 岳白公", body:"影丘を制した飛信隊は岳白公本陣へ突撃し、李信は岳白公を一騎討ちの末に討ち取る。将軍として初めて挙げた、格上の首。"},
      {ep:"64巻", h:"扈輒本陣", body:"飛信隊はそのまま扈輒本陣へ進軍して守備隊と激突する。その隙を突いて桓騎軍の伏兵が扈輒本陣を急襲し、脱出した扈輒を討ち取る。退却は伏兵を置くための芝居だった。"},
      {ep:"64巻", h:"投降兵の皆殺し", body:"その後、数万の扈輒軍が投降する。だが桓騎は彼らを皆殺しにしてしまう。黒羊で線を引いた問題が、規模を変えて再発する。"},
      {ep:"64巻", h:"政の尋問", body:"報告を受けた嬴政は激昂し、自ら桓騎を尋問する。だが結論は不問だった。中華統一を続けるために、王が自分の理念を曲げた場面として残る。"},
      {ep:"64巻", h:"李牧、呼び戻される", body:"趙では扈輒討死を受け、郭開が李牧を呼び戻す。李牧を追放したのと同じ人間が、必要になった瞬間に連れ戻す。"},
      {ep:"64巻", h:"長城", body:"始皇十四年、秦軍は武城・平陽を陥落させる。だが邯鄲の南には、李牧の手で長城が築かれていた。落とした先に、また別の壁がある。"},
      {ep:"—", h:"この束のテーマ", body:"勝ったのに何も晴れない章。李信は将軍としての実力を証明し、桓騎は勝つために越えてはいけない線を越え、政はそれを不問にする。次章の敗北の下地がここで全部そろう。"}
    ],
    points:[
      "兵力差は桓騎軍八万 vs 扈輒軍二十四万。影丘という険地で桓騎軍左軍と玉鳳軍が壊滅した。",
      "飛信隊は王賁の助言で影丘の断崖を登り、岳白公を李信が一騎討ちで討ち取った。",
      "桓騎軍の退却は伏兵を置くための芝居で、脱出した扈輒を伏兵が討ち取って決着した。",
      "雷土は龍白公を討った後に捕虜となり、拷問を受けて死亡。桓騎軍の崩壊の始まり。",
      "投降した数万の扈輒軍を桓騎が皆殺しにし、政は激昂して尋問するも不問とした。",
      "趙では郭開が李牧を呼び戻す。邯鄲の南には李牧が長城を築いており、次章の宜安攻略の理由になる。"
    ],
    checks:[
      {q:"この戦いの兵力差は？", a:"桓騎軍八万に対し、趙軍総司令・扈輒の軍が二十四万。"},
      {q:"影丘で何が起きたか？", a:"桓騎軍左軍がほぼ壊滅し、救援に呼ばれた玉鳳軍も壊滅状態になった。八日目に飛信隊が玉鳳軍を救出し、王賁の助言で断崖の攻略に出た。"},
      {q:"李信が討った将は？", a:"扈輒側近・岳白公。影丘を制した後、本陣へ突撃して一騎討ちで討ち取った。"},
      {q:"扈輒はどうやって討たれたか？", a:"飛信隊が扈輒本陣の守備隊と激突している隙に、桓騎軍の伏兵が本陣を急襲。脱出した扈輒を討ち取った。桓騎軍の退却は伏兵を置くための芝居だった。"},
      {q:"雷土の最期は？", a:"敵将・龍白公を討った後に捕虜となり、拷問を受けて死亡した。"},
      {q:"戦後、桓騎は何をして、政はどう対応したか？", a:"投降した数万の扈輒軍を皆殺しにした。政は激昂して自ら尋問したが、最終的に不問とした。"}
    ],
    keys:["kanki", "shin", "ouhon", "kochou", "gakuhaku", "ryuuhaku", "kohaku", "raido", "kokuou", "zenou", "maron", "naki", "kyoukai", "kyourei", "tenn", "sei", "riboku", "kakukai", "shuma", "hanzen", "f_kanki", "f_saki", "f_gyokuhou"],
    battles:["b_heiyou"],
    newcomers:["kochou", "gakuhaku", "ryuuhaku", "kohaku", "shuma", "hanzen"],
    deaths:["kochou", "raido", "gakuhaku", "ryuuhaku"]
  },
  {
    id:"a18",
    no:"XVIII",
    name:"将の死 — 宜安・肥下の戦い",
    ep:"アニメ未放送",
    vols:"原作 65〜70巻",
    chapters:"第702〜768話",
    year:"始皇十五年",
    era:"対趙",
    sides:"桓騎軍 十四万・飛信隊・楽華軍 vs 李牧軍 三十一万・青歌軍",
    result:"趙の勝利（桓騎軍全滅・桓騎討死）",
    rank:"将軍",
    quote:{t:"…ここまでか。", by:"桓騎（趣意）"},
    lead:"押し切れると思った瞬間に、李牧が盤面をひっくり返す。秦がこの物語で最も重い敗北を負う章。",
    beats:[
      {ep:"65巻", h:"長城を迂回する", body:"邯鄲南の長城を知った昌平君は、趙北部の要衝・宜安の攻略を図る。王翦軍・桓騎軍には長城を迂回して北上させ、さらに秦北東部で二十一万の大軍を興して両軍へ向かわせる。"},
      {ep:"65巻", h:"閼与の代償", body:"王翦軍は宜安の途上にある閼与を攻略するが、その際に多くの犠牲を出して戦線から離脱する。総大将格の軍が一つ欠けた状態で、作戦が続く。"},
      {ep:"65〜66巻", h:"合流できない援軍", body:"秦北東部軍は趙軍の奇襲によって多くが敗走する。それでも風范率いる五万が桓騎軍に合流する。計画された数は、戦場に届いた時点で目減りしている。"},
      {ep:"66巻", h:"赤麗奪取", body:"桓騎率いる秦軍十四万は宜安へ向けて東進し、赤麗を奪取する。ここまでは桓騎の速度が完全に効いていた。"},
      {ep:"66〜67巻", h:"三十一万の包囲", body:"宜司平野で、情報封鎖によって隠されていた李牧率いる趙軍三十一万に包囲攻撃を受ける。見えていなかったのは兵数ではなく、そこに軍がいるという事実そのものだった。"},
      {ep:"67巻", h:"飛信隊、左翼へ", body:"包囲を破るため、右翼の飛信隊は左翼の楽華軍のもとへ移って共闘する。李信と蒙恬が同じ盤面で一つの脱出口を作りにいく。"},
      {ep:"67巻", h:"青歌軍と岳雷", body:"両軍は司馬尚の青歌軍と激突する。激戦の末、飛信隊は黒飛藨の指揮官・岳雷を失いながら包囲を突破する。趙にもう一枚、底の知れない軍がいると分かる。"},
      {ep:"67〜68巻", h:"未知の陣形", body:"桓騎は見たことのない陣形を築いて時間を稼ぎ、闇夜に紛れて包囲から脱出する。三十一万の中から十四万を抜き出すという、この男にしかできない撤退。"},
      {ep:"68巻", h:"宜安、落ちる", body:"包囲から脱した飛信隊と楽華軍は桓騎軍別働隊と合流し、夜明けに桓騎軍の井闌車を用いて宜安城を攻略する。そこへ桓騎が入城する。負けたはずの戦で、目標だけは達成される。"},
      {ep:"68巻", h:"赤麗の毒", body:"一方、赤麗には包囲を脱した壁を含む多くの兵が入城するが、住民が井戸水に盛った毒でほぼ全滅する。武器を持たない者が最も多くの秦兵を殺した。"},
      {ep:"68〜69巻", h:"肥下へ", body:"赤麗を取り戻した趙軍は宜安へ進軍するが、既に秦軍はいない。行先が肥下だと判断した趙軍が急ぐ、その隙をついて桓騎軍は李牧本隊へ奇襲を掛ける。"},
      {ep:"69巻", h:"あと一歩", body:"楽華軍・飛信隊は李牧救援に向かう軍の足止めを図る。桓騎軍は李牧を幾度も追い詰めるが、わずかに及ばない。そして李牧のもとに援軍が届く。"},
      {ep:"69巻", h:"桓騎軍、全滅", body:"形勢は逆転し、桓騎軍は趙軍に包囲される。楽華軍・飛信隊も脱出に動く。桓騎軍は李牧と刺し違えるべく突撃するが、あと一歩及ばず全滅。桓騎は討死する。"},
      {ep:"69巻", h:"脱出", body:"楽華軍・飛信隊は趙北部からの脱出に成功する。生き延びたことしか持ち帰れなかった戦いだった。"},
      {ep:"69〜70巻", h:"幕間・韓非子招聘", body:"六将の一角を失う大敗北を喫した秦。帰還した李信のもとに嬴政が訪れ、騰たちと共に韓への使節団の護衛を命じる。目的は韓の王族で法家の思想家・韓非子の招聘だった。"},
      {ep:"70巻", h:"人の本質とは何か", body:"新鄭で兵士に変装した韓非子が李信に『人の本質とは何か』と問う。謁見の場で再び同じ問いを受けた李信は『人の本質は火』と答え、その理由を聞いた韓非子は政に関心を抱いて招聘を承諾する。"},
      {ep:"70巻", h:"韓非子の死", body:"だが李斯の間諜・姚賈が咸陽で韓非子とすれ違い、韓の諜報機関の者だと知って李斯に報告する。臨検で諜報活動が明るみとなり韓非子らは拘束され、姚賈は自身の正体を知る韓非子に毒薬を渡して自害させる。"},
      {ep:"70巻", h:"幕間・城戸村", body:"李信は漂の死以来の城戸村へ帰郷し、尾平の結婚式を飛信隊とともに祝う。その席で李信は羌瘣に、中華統一の戦争が終わったら結婚してほしいと告げる。"},
      {ep:"—", h:"この束のテーマ", body:"読み合いで一枚上を取られた側がどうなるかを、容赦なく描く章。勝ち方を問われ続けた桓騎の退場が、李信に別の答えを残す。"}
    ],
    points:[
      "李牧は情報封鎖で三十一万を隠していた。桓騎の敗因は兵数差ではなく、そこに軍がいると気づけなかったこと。",
      "宜安城は落ちている。戦術目標は達成しながら、肥下で桓騎軍が全滅するという構造。",
      "赤麗では住民が井戸水に毒を盛り、入城した秦兵がほぼ全滅した（壁は包囲を脱して入城していた）。",
      "桓騎は李牧と刺し違えるべく突撃したが届かず討死。六大将軍の一角が失われる。",
      "幕間で韓非子招聘。李信の答えは『人の本質は火』。韓非子は姚賈に毒薬を渡され自害する。",
      "李信は城戸村で羌瘣に、統一が終わったら結婚してほしいと告げる。"
    ],
    checks:[
      {q:"桓騎軍が包囲された場所と、趙軍の兵力は？", a:"宜司平野。李牧率いる趙軍三十一万で、情報封鎖により存在自体が隠されていた（桓騎軍は十四万）。"},
      {q:"包囲からの脱出はどう行われたか？", a:"飛信隊は左翼の楽華軍と共闘して青歌軍を突破（黒飛藨の岳雷を失う）。桓騎は未知の陣形で時間を稼ぎ、闇夜に紛れて脱出した。"},
      {q:"宜安城はどうなったか？", a:"包囲を脱した飛信隊・楽華軍が桓騎軍別働隊と合流し、夜明けに井闌車で攻略。桓騎が入城した。"},
      {q:"赤麗で秦兵がほぼ全滅した原因は？", a:"赤麗の住民が井戸水に毒を盛ったため。"},
      {q:"桓騎の最期は？", a:"肥下で李牧本隊を奇襲して幾度も追い詰めたが、李牧に援軍が届いて形勢逆転。李牧と刺し違えるべく突撃したが及ばず、桓騎軍は全滅し桓騎は討死した。"},
      {q:"韓非子は李信に何を問い、李信はどう答えたか？", a:"『人の本質とは何か』。李信は『人の本質は火』と答えた。"},
      {q:"韓非子はどうなったか？", a:"李斯の間諜・姚賈に韓の諜報活動を告発されて拘束され、自身の正体を知る韓非子に姚賈が毒薬を渡し、自害させた。"}
    ],
    keys:["kanki", "raido", "kokuou", "zenou", "maron", "riboku", "shibashou", "ousen", "shouheikun", "shin", "tou", "mouten", "ouhon", "kyoukai", "tenn", "heki", "joukaryuu", "rakushou", "kanpishi", "risi", "youka", "gakurai", "naki", "kotsuminhaku", "obei", "sei", "f_saki", "f_seika"],
    battles:["b_gian"],
    newcomers:["joukaryuu", "rakushou", "kotsuminhaku", "aisen", "bafuuji", "kansaro", "jiaga", "fuon", "shio", "shou"],
    deaths:["kanki", "kokuou", "zenou", "joukaryuu", "naki", "ringyoku", "gakurai", "kanpishi"]
  },
  {
    id:"a19",
    no:"XIX",
    name:"届かない — 番吾攻防戦",
    ep:"アニメ未放送",
    vols:"原作 70〜73巻",
    chapters:"第769〜812話",
    year:"始皇十五年",
    era:"対趙",
    sides:"王翦軍 二十五万（飛信隊・楊端和軍・玉鳳軍） vs 李牧・司馬尚 三十万",
    result:"趙の勝利（秦は撤退・亜光ら戦死）",
    rank:"将軍",
    quote:{t:"負けた戦から、何を持ち帰るか。", by:"（趣意）"},
    lead:"宜安の借りを返すための第二次趙北部攻略戦。二年続けて趙に敗れ、中華統一という言葉の距離が現実として見える。",
    beats:[
      {ep:"70〜71巻", h:"第二次趙北部攻略戦", body:"始皇十五年、秦は再び大軍を起こして趙北部へ向かう。飛信隊は八千を率いて出陣し、太原で秦北東部軍二十万と合流すると兵を分け与えられ、三万の軍になる。"},
      {ep:"71巻", h:"狼孟城", body:"飛信隊と秦北東部軍は早々に狼孟城を落とし、そのまま進軍して王翦軍本隊と合流。楊端和軍・玉鳳軍とも合流する。秦の主力がひとつの盤面に集まる。"},
      {ep:"71巻", h:"目標変更", body:"最初の軍議で、王翦は攻略目標を宜安から番吾に変更すると告げる。総勢二十五万が番吾へ進軍する。前年の失敗をそのまま繰り返さないための組み替え。"},
      {ep:"71巻", h:"三十万の迎撃", body:"李牧も王翦の狙いを読み、新たに三大天となった司馬尚ら青歌軍を含む総勢三十万を率いて出陣する。両軍は番吾手前の頭佐平原で対峙する。"},
      {ep:"71巻", h:"番吾の壁", body:"一方、番吾で一年以上も過酷な労働を強いられていた壁たちは、戦いに乗じて脱出を図るために動き出す。宜安で毒を生き延びた者たちが、まだ盤上にいる。"},
      {ep:"72巻", h:"緒戦・両翼", body:"秦軍右翼の飛信隊が趙軍左翼と交戦し、左翼の楊端和軍も趙軍右翼と交戦する。中央でも亜光軍が敵と衝突しようとしていた。"},
      {ep:"72巻", h:"李牧、姿を見せる", body:"そこへ右側から李牧が現れる。亜光は標的を李牧に変更して突撃し、李牧はすぐに撤収する。李信たちも李牧の出現を知り、彼を討つべく追跡を始める。"},
      {ep:"72巻", h:"外される", body:"だが李牧の目的は、最も危険視している李信を戦局から外すことだった。追跡している間、李信は戦場のどこにも影響を与えられない。"},
      {ep:"72〜73巻", h:"青歌軍、進攻", body:"その隙に司馬尚率いる青歌軍が王翦軍本隊へ進攻する。想像以上の力の前に王翦軍は押されていき、ついには王翦の目の前まで迫られる。"},
      {ep:"73巻", h:"王翦の撤退", body:"王翦は敗北を悟って撤退を決断する。亜光、田里弥など側近を含む多くの配下を失う大敗北。個の武でも数でも押せない相手に、初めて『届かない』を突きつけられる。"},
      {ep:"73巻", h:"壁の脱出", body:"番吾の壁たちは脱走に成功するが、すぐに包囲されて絶体絶命に陥る。そこへ助けに来たキタリたち山の民によって救出される。"},
      {ep:"—", h:"この束のテーマ", body:"二年続けての敗北で、秦は勝ち方そのものを設計し直すしかなくなる。次章の『三つの柱』は、この負けから逆算して出てくる答え。"}
    ],
    points:[
      "王翦は攻略目標を宜安から番吾へ変更。総勢二十五万に対し、趙は李牧・司馬尚の三十万。",
      "司馬尚はこの時点で新たな三大天。青歌軍の力が王翦軍本隊を正面から押し切った。",
      "李牧が自ら姿を見せたのは、李信を戦局から外すための囮。李信は追跡している間、盤面に関与できなかった。",
      "秦は亜光・田里弥ら王翦の側近を多数失う大敗北。二年連続で趙に敗れた。",
      "番吾で強制労働させられていた壁たちは脱走し、キタリら山の民に救出された。"
    ],
    checks:[
      {q:"王翦が変更した攻略目標は？兵力は？", a:"宜安から番吾へ変更。秦は総勢二十五万、趙は李牧・司馬尚の三十万。"},
      {q:"李牧が自ら前線に姿を見せた目的は？", a:"最も危険視していた李信を追跡させ、戦局から外すこと。その隙に青歌軍が王翦軍本隊を攻めた。"},
      {q:"王翦軍が敗れた直接の原因は？", a:"司馬尚率いる青歌軍の想像以上の力に本隊が押され、王翦の目前まで迫られたため。王翦は撤退を決断した。"},
      {q:"この戦いで秦が失った主な将は？", a:"亜光、田里弥など王翦の側近を含む多くの配下。"},
      {q:"壁はどうなったか？", a:"番吾で一年以上強制労働させられていたが脱走に成功。包囲されたところをキタリら山の民に救出された。"}
    ],
    keys:["ousen", "riboku", "shibashou", "shin", "ouhon", "mouten", "youtanwa", "akou", "denrimi", "heki", "kitari", "dant", "katari", "kyoukai", "tenn", "kyourei", "kaine", "shouheikun", "f_seika"],
    battles:["b_bango"],
    newcomers:[],
    deaths:["akou", "denrimi"]
  },
  {
    id:"a20",
    no:"XX",
    name:"最初の一国 — 三つの柱と韓攻略戦",
    ep:"アニメ未放送",
    vols:"原作 73〜78巻",
    chapters:"第813〜844話",
    year:"始皇十六年〜十七年",
    era:"対韓 / 軍制改革",
    sides:"飛信隊 六万・騰軍 十万 vs 韓軍 十九万（洛亜完・博王谷）",
    result:"秦の勝利（新鄭が無血開城・韓滅亡）",
    rank:"将軍（大将軍一歩手前）",
    quote:{t:"一国、落とす。", by:"（趣意）"},
    lead:"六国のうち最初の一国が地図から消える章。中華統一が理念から現実の手続きに変わる。",
    beats:[
      {ep:"73巻", h:"三つの柱", body:"二度の大敗で統一が不可能になりかけた秦に、昌平君が起死回生の『三つの柱』を献策する。国のかたちを作り直してから戦うという発想の転換。"},
      {ep:"73巻", h:"第一の柱・戸籍", body:"一つ目は秦全土の領民の戸籍を作ること。朝廷が認知していない小さな村や、流民の無国籍地帯まで含めて全領民を登録し、増えた人口から徴兵する。二度の大戦で失った兵力を、統治の精度で取り戻す。"},
      {ep:"73〜74巻", h:"第二の柱・軍の編成改革", body:"二つ目は軍の編成改革。李信・王賁・蒙恬の位を大将軍一歩手前まで引き上げて軍容を増大させ、重要な役目と責任を担わせる。世代交代を制度として確定させる一手。"},
      {ep:"74巻", h:"第三の柱・韓を滅ぼす", body:"三つ目は七雄の一角である韓を滅ぼすこと。李信が韓侵攻に抜擢され、王賁と蒙恬は他国からの援軍を阻止する要所の防衛を任される。"},
      {ep:"74巻", h:"戸籍、完成", body:"文官を総動員した戸籍作りは膨大な労力と資金を費やし、少なくない犠牲を出しながら始皇十六年に完了する。続いて第二の柱として徴兵が進み、先の大戦で失った以上の増員に成功する。"},
      {ep:"74〜75巻", h:"布陣", body:"玉鳳軍は黄河を渡って魏の洛紫を占拠して魏に備え、楽華軍は鄴と橑陽の中間にある黄都に駐屯して趙に備える。各国が注目する中、飛信隊六万と騰軍十万が韓へ侵攻を開始する。"},
      {ep:"75巻", h:"南陽・無血開城", body:"最初の要所である南陽は、韓の将軍・博王谷に放棄させることで無血開城となり、秦軍は入城する。殲滅ではなく、被害を最小にして国を丸ごと接収するという方針。"},
      {ep:"75巻", h:"占領地の統治", body:"残された南陽の民は侵略者を恐れ、敵愾心も抱いていた。騰は秦兵の狼藉を固く禁じ、元南陽城主・龍安と朝廷から派遣された長官・剛京と共に統治を行い、李信にも住民との交流を頼む。"},
      {ep:"75巻", h:"刺そうとした老人", body:"交流の場で、かつて秦兵に娘と孫を惨殺された老人が李信を刺そうとする。李信はそれを防ぐが、老人の凶行を咎めず、憎む気持ちを理解して許す。ここから南陽市民との蟠りが解けていく。"},
      {ep:"75巻", h:"半年の練兵", body:"騰と李信は新鄭攻略を見据え、増員した新兵たちの練兵に励む。占領地を敵に回さないことが、次の戦の前提条件になっている。"},
      {ep:"75〜76巻", h:"英呈平原", body:"始皇十七年、騰と李信は南陽を出て新鄭攻略に動く。韓は洛亜完・博王谷が十九万を率いて出陣し、英呈平原で激突する。南陽の統治が良好だと知った周辺城主が兵を出し惜しみしたため、韓軍は想定より集まらなかった。"},
      {ep:"76巻", h:"寧と騰", body:"韓の王女・寧は騰に呼ばれて密かに新鄭を出て、森の中で対面する。和平交渉だと思っていた寧に対し、騰が求めたのは新鄭の無血開城だった。寧は断固拒否する。"},
      {ep:"76巻", h:"戦場を見せる", body:"騰は寧を戦場の近くへ連れて行き、初めて戦の惨状を目の当たりにさせる。この光景を新鄭で起こさないために決断せよ、と促して騰は戦場へ駆けていく。"},
      {ep:"76巻", h:"李信 対 博王谷", body:"短期決戦を狙う秦軍に対し、韓軍も目論見を見抜いて戦術を巡らせる。だが李信が博王谷を一騎打ちの末に討ち取ったことで戦況が傾き、洛亜完も不利を悟って退却。初日は秦の大勝となる。"},
      {ep:"76〜77巻", h:"東砂平原", body:"翌日、東砂平原で第二戦。羌瘣軍の猛攻で勢いを得た秦軍が再び大勝し、洛亜完は立て直しが不可能になって新鄭へ退却する。"},
      {ep:"77巻", h:"新鄭の暴走", body:"二度の大敗で韓の朝廷は大荒れになり、民衆も新鄭からの脱出を図って暴動を起こす。張宰相は治安維持軍長官・夏侯龍に強権を与えるが、夏侯龍は逃亡者を処刑して見せしめにし、五歳以上の者全員を民兵とする強制徴兵令まで出して暴走する。"},
      {ep:"77巻", h:"東龍の鐘", body:"父・王安王のもとへ行った寧は、降服を知らせる東龍の鐘の存在を教えられる。寧は民を守るべく鐘のもとへ向かう。一方、秦軍は新鄭を包囲するが、騰は寧の決断を信じて号令を掛けずに待ち続ける。"},
      {ep:"77巻", h:"二人で鳴らす", body:"鳴らせば韓の歴史を閉ざし、すべての犠牲が無に帰する。決断できない寧のもとへ王安王も駆け付け、すべての業を背負う覚悟で二人で鐘を鳴らす。新鄭東の東龍の門が開く。"},
      {ep:"77巻", h:"洛亜完の撤退", body:"王族の独断による降服だったため城内は混乱する。降服を認めない洛亜完軍が徹底抗戦の構えを見せて騰たちと対峙するが、駆け付けた寧が説得。一部の兵が寧もろとも攻撃しようとしたのを洛亜完が制止し、立て直しを名目に一部の兵を連れて新鄭から撤退する。"},
      {ep:"77巻", h:"韓、滅亡", body:"朝廷に戻った王安王は徹底抗戦を叫ぶ夏侯龍を処刑し、張宰相に統治権を譲る準備を命じる。後に現れた騰たちに降服を示し、韓は滅亡。戦国七雄の一角が消滅する。"},
      {ep:"77〜78巻", h:"幕間・寧の罪", body:"韓の滅亡を受け入れられず自ら命を絶つ者が現れ始める。深い罪悪感に苛まれた寧を騰が励まそうとするが、かえって自害を決断させてしまう。投身自殺を図った寧を騰は庇って救うが、背骨を傷める。"},
      {ep:"78巻", h:"幕間・騰の六将辞任", body:"咸陽から昌平君らが新鄭へ来訪し、後難を覚悟で王安王ら王族を助命して旧韓領の統治を始める。騰は新鄭統治に尽力するため六将を降りることを告げ、李信に李牧打倒を託す。朝廷では政と陽の子が産まれ、後に末子・胡亥も産まれる。"},
      {ep:"—", h:"この束のテーマ", body:"『滅ぼす側』の物語に、初めて『滅ぼされる側』の視点が正面から入る章。統一が理念ではなく、誰かの国を消す手続きだと突きつけられる。"}
    ],
    points:[
      "三つの柱＝①秦全土の戸籍作成（人口把握→徴兵）②軍の編成改革（李信・王賁・蒙恬を大将軍一歩手前へ）③韓を滅ぼす。",
      "南陽は博王谷に放棄させて無血開城。占領後の統治（狼藉禁止・住民との交流）が次の戦の前提になっている。",
      "李信が博王谷を一騎打ちで討ち、二戦目は羌瘣軍の猛攻で大勝。洛亜完は新鄭へ退却した。",
      "新鄭は戦闘ではなく、寧と王安王が東龍の鐘を鳴らしたことで無血開城した。騰は号令を掛けずに待っていた。",
      "夏侯龍は五歳以上全員を民兵にする強制徴兵令まで出して暴走し、最後は王安王に処刑された。",
      "幕間で騰が六将を辞任し、新鄭統治に回る。李牧打倒は李信に託される。"
    ],
    checks:[
      {q:"昌平君の『三つの柱』を挙げよ。", a:"①秦全土の領民の戸籍を作る（人口を把握して徴兵する）②軍の編成改革（李信・王賁・蒙恬を大将軍一歩手前まで引き上げる）③韓を滅ぼす。"},
      {q:"南陽はどのように秦の手に入ったか？", a:"韓の将軍・博王谷に放棄させたことで、無血開城で入城した。"},
      {q:"李信が一騎打ちで討った韓の将は？", a:"博王谷。英呈平原の初日、これで戦況が秦へ傾いた。"},
      {q:"新鄭はどう落ちたか？", a:"戦闘ではなく、王女・寧と王安王が降服を知らせる東龍の鐘を二人で鳴らし、東龍の門が開いた（無血開城）。騰は寧の決断を信じて包囲したまま待っていた。"},
      {q:"夏侯龍は何をしたか？", a:"治安維持軍長官として強権を与えられ、脱出しようとする者を処刑して見せしめにし、五歳以上の全員を民兵とする強制徴兵令を出して暴走。最後は王安王に処刑された。"},
      {q:"戦後、騰はどうしたか？", a:"新鄭統治に尽力するため六大将軍を辞任し、李牧打倒を李信に託した。"}
    ],
    keys:["tou", "shin", "kyoukai", "ouhon", "mouten", "shouheikun", "sei", "ouanou", "neihime", "rakuakan", "hakuoukoku", "choushi", "kakouryuu", "ryuuan", "yokoyoko", "rokuomi", "tenn", "kyourei", "you_jo", "f_kan"],
    battles:["b_shintei"],
    newcomers:["ouanou", "neihime", "rakuakan", "hakuoukoku", "choushi", "kakouryuu", "ryuuan", "yokoyoko"],
    deaths:["hakuoukoku", "kakouryuu"]
  },
  {
    id:"a21",
    no:"XXI",
    name:"全面戦争 — 趙完全攻略編（進行中）",
    ep:"アニメ未放送",
    vols:"原作 78巻〜",
    chapters:"第845話〜",
    year:"始皇十八年〜",
    era:"対趙",
    sides:"秦軍 四十四万 vs 趙軍 四十万超（李牧・司馬尚・紀彗）",
    result:"（連載中）",
    rank:"将軍",
    quote:{t:"中華統一へ、本格始動。", by:"（第6シリーズ 予告文）"},
    lead:"二度負けた相手に、国の全部を賭けて挑む章。原作で現在進行中の最前線。",
    beats:[
      {ep:"78巻", h:"両軍の立て直し", body:"王翦が軍の立て直しを終え、秦は趙攻略へ動き出す。李牧も武安に司馬尚・紀彗ら名だたる趙将を集結させ、秦軍の迎撃に動く。"},
      {ep:"78巻", h:"王の不信", body:"始皇十八年、邯鄲では幽繆王が相変わらず享楽に耽っていた。だが出陣前の謁見で入城した李牧に民衆が熱狂し、『李牧こそが王に相応しい』という陰口を耳にして、王は李牧への不信感を抱き始める。"},
      {ep:"78巻", h:"王都軍五万", body:"それでも幽繆王は謁見で李牧に王都軍五万を預け、秦軍の迎撃を命じる。国の存亡と王の嫉妬が、同じ場面に同居している。"},
      {ep:"78巻", h:"李牧とカイネ", body:"邯鄲を出立した李牧は、カイネを連れ出して二人になると想いを伝え、ひっそりと婚姻の儀を執り行う。決戦を前に、この男が私的な決着をつける。"},
      {ep:"78巻", h:"四十四万", body:"李信は飛信隊のほか、ヨコヨコ率いる旧韓軍・録嗚未率いる騰軍とともに新鄭から出陣して趙へ侵攻する。王翦・楊端和ら他の秦軍も各方面から侵攻を開始し、秦軍総勢四十四万が邯鄲を目指す。"},
      {ep:"78巻", h:"趙の防衛線", body:"趙軍も四十万以上の大軍勢で邯鄲西方面に大規模な防衛線を敷いて迎え撃つ。数でも速度でも抜けない盤面をどう崩すかが焦点になる。"},
      {ep:"78巻", h:"青華雲の一矢", body:"開戦して早々、趙軍の中華十弓一位・青華雲が山の民のダントと楊端和を射抜くという大波乱が起きる。武将の一騎討ちを外から壊す駒が、最初に最大の獲物を撃つ。"},
      {ep:"78巻", h:"蒼兄弟", body:"青華雲は次の標的として李信を狙い、彼のいる戦場へ向かう。中華十弓の存在を感じ取った飛信隊の蒼兄弟が李信を守るために勝負を挑み、兄の蒼仁が青華雲を仕留めて新たな十弓となる。弓の系譜が、そのまま世代交代の線になっている。"},
      {ep:"—", h:"ここが現在地", body:"このDBの収録はここまで。以降は連載の進行に合わせて追記していく。"}
    ],
    points:[
      "秦軍総勢四十四万 vs 趙軍四十万超。邯鄲西方面の大規模防衛線を挟んだ総力戦。",
      "幽繆王は李牧に王都軍五万を預けながら、民衆の熱狂を見て李牧への不信を抱き始めている（後の伏線）。",
      "李牧はカイネと婚姻の儀を済ませて出陣した。",
      "開戦直後、中華十弓一位・青華雲がダントと楊端和を射抜く。仕留めたのは蒼仁で、新たな十弓となった。"
    ],
    checks:[
      {q:"両軍の兵力は？", a:"秦軍総勢四十四万、趙軍は四十万以上。趙は邯鄲西方面に大規模な防衛線を敷いた。"},
      {q:"幽繆王が李牧に抱き始めた感情と、その原因は？", a:"不信感。出陣前の謁見で入城した李牧に民衆が熱狂し、『李牧こそが王に相応しい』という陰口を耳にしたため。"},
      {q:"開戦直後に青華雲が射抜いたのは誰か？", a:"山の民のダントと、楊端和。"},
      {q:"青華雲を仕留めたのは誰で、その結果どうなったか？", a:"飛信隊の蒼仁（蒼兄弟の兄）。李信を守るために勝負を挑んで仕留め、新たな中華十弓となった。"}
    ],
    keys:["shin", "riboku", "shibashou", "kisui", "ousen", "youtanwa", "ouhon", "mouten", "moubu", "sei", "shouheikun", "kyoukai", "tenn", "kaine", "yuubokuou", "kakukai", "seikaun", "soujin", "soutan", "dant", "yokoyoko", "rokuomi", "reijukou", "donsari", "f_juukyuu"],
    battles:[],
    newcomers:["seikaun", "reijukou", "donsari"],
    deaths:["seikaun"]
  }
  ]
};

if (typeof module !== "undefined") { module.exports = KINGDOM; }

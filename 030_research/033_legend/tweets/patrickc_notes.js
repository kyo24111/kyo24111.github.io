/* ==========================================================================
   Patrick Collison ツイート ── 和訳・解説・英単語（手書きの正本）
   - 原文・数字は patrickc_raw.js（fetch_tweets.py が生成）。ここには書かない
   - キー = ツイートID。1件 = { title, ja:[段落], qja, notes:[{h,b}], vocab:[{w,pos,ja,note}] }
     ja    : 原文を空行（\n\n）で割った段落と同じ数・同じ順で
     qja   : 引用元ツイートの和訳（引用がある時だけ）
     notes : 知識の解説。b は HTML 可
     vocab : 英単語。w=見出し語 / pos=品詞 / ja=意味 / note=ニュアンス・語源・本文での使われ方
   - 長文ツイート（Karamazov / agents）は patrickc_notes_long.js
   ========================================================================== */
window.TWEET_NOTES = Object.assign(window.TWEET_NOTES || {}, {

/* ---------------------------------------------------------------- 10/18 */
'2111487279349022762': {
  title: '大西洋の両岸は、互いを「憐れんで」いる',
  ja: [
    `最近つくづく思うのは、大西洋の両岸が互いに抱いている支配的な感情が、ある種の「憐れみ」になっていることだ。ヨーロッパはアメリカが独裁へと滑り落ちつつある（とされる）ことを案じ、アメリカはヨーロッパの臆病さと窮乏化を案じている。`
  ],
  notes: [
    { h: '何を言っているか', b: `米欧はかつて互いに「羨望」や「ライバル心」を向け合っていたが、今はどちらも相手を<b>「かわいそうな国」</b>として見ている、という観察。欧州側は第2次トランプ政権下の米国を民主主義の後退（autocracy＝独裁）として見、米国側は欧州を「規制ばかりで成長しない・防衛もリスクも取れない（pusillanimity）・豊かさが削れていく（immiseration）」と見ている。` },
    { h: '“supposed” の一語', b: `「the US’s <b>supposed</b> slide into autocracy」の supposed は「〜とされる、いわゆる」。欧州側の見立てに対して、Patrick自身は全面的には同意していない距離感が出ている。一方で欧州側の問題（pusillanimity and immiseration）には supposed が付いていない。アイルランド出身・米国在住の彼の立ち位置がにじむ書き方。` },
    { h: '背景：欧州の成長停滞論', b: `2024年のドラギ・レポート（EU競争力報告）以来、「EUと米国の1人あたりGDP・生産性の差が開き続けている」「テック大手がEUから生まれない」という議論が定番化。Patrickは以前から欧州の起業環境・規制に批判的な発信が多い（UK統計の精度問題を論じたツイートもある）。` }
  ],
  vocab: [
    { w: 'be struck by', pos: 'phr', ja: '〜に強く印象づけられる、〜にハッとする', note: 'Patrickの口癖。"I’m struck by how ..." で「〜なのが気になっている」。' },
    { w: 'dominant mood', pos: 'n', ja: '支配的なムード・空気', note: '' },
    { w: 'pity', pos: 'n', ja: '憐れみ、同情（上から目線を含む）', note: 'sympathy より「下に見る」含みが強い。"It’s a pity" は「残念だ」。' },
    { w: 'fret about', pos: 'v', ja: '〜をくよくよ心配する', note: 'worry より落ち着きのない、ソワソワした心配。' },
    { w: 'supposed', pos: 'adj', ja: '〜とされている、いわゆる', note: '話者が真偽に留保をつけるときに使う。' },
    { w: 'slide into', pos: 'phr', ja: '（悪い状態へ）ずるずる陥る', note: 'slide into recession（景気後退に陥る）など。' },
    { w: 'autocracy', pos: 'n', ja: '独裁制、専制政治', note: 'auto（自分）+ -cracy（支配）。democracy の対。' },
    { w: 'pusillanimity', pos: 'n', ja: '臆病、小心、気概のなさ', note: 'ラテン語 pusillus（とても小さい）+ animus（心）＝「心が小さい」。magnanimity（度量の大きさ）の対義語。かなり硬い語。' },
    { w: 'immiseration', pos: 'n', ja: '窮乏化、貧しくなっていくこと', note: 'マルクス経済学の「窮乏化論（Verelendung）」の英訳語として有名。ここでは「欧州が相対的に貧しくなっていく」こと。' }
  ]
},

'2111476578907820433': {
  title: 'NSFの調査レポートを推す',
  ja: [
    `Matt FahertyによるNSFについての素晴らしいレポート：https://newscience.org/nsf/ 。米国、EU、その他の地域の政府機関について、こういう深い調査・評価がもっとあればいいのにと思う。`
  ],
  notes: [
    { h: 'NSF とは', b: `<b>National Science Foundation（全米科学財団）</b>。1950年設立の米連邦機関で、医学以外の基礎研究（数学・物理・CS・工学・社会科学など）に研究費を配る。年間予算はおよそ90億ドル規模。医学系は NIH（国立衛生研究所）が担当。` },
    { h: 'New Science', b: `newscience.org は、科学の資金配分や研究機関のあり方を研究・提言する非営利団体。「科学はどう資金提供されるべきか」というメタサイエンスの論点を扱う。` },
    { h: 'Patrickとの接点', b: `Patrickはメタサイエンス（科学の進め方そのものの研究）の代表的な発信者。2019年にTyler Cowenと「Progress Studies（進歩学）」を提唱し、コロナ禍では審査48時間の研究助成 <b>Fast Grants</b> を立ち上げ、2021年には研究者に長期・無条件で資金を出す <b>Arc Institute</b> を共同創業した。政府の研究資金機関を外から深く評価する仕事は、まさに彼の関心のど真ん中。` }
  ],
  vocab: [
    { w: 'report on', pos: 'n', ja: '〜についての報告書', note: '' },
    { w: 'deep investigation', pos: 'n', ja: '踏み込んだ調査', note: '' },
    { w: 'assessment', pos: 'n', ja: '評価、査定', note: 'assess（評価する）の名詞。evaluation とほぼ同義だが、状況把握のニュアンスが強い。' },
    { w: 'government agency', pos: 'n', ja: '政府機関、行政機関', note: 'agency は「庁・局」。' },
    { w: 'I wish there were ...', pos: 'phr', ja: '〜があればいいのに', note: '仮定法過去。現実にはそうなっていない、という不満を柔らかく言う。' }
  ]
},

/* ---------------------------------------------------------------- 10/16 */
'2110873873948528983': {
  title: '【リポスト】@stablecoin は過小評価されている',
  ja: [
    `ちょっと逆張りかもしれないけど、@stablecoin はいまだに過小評価されてる。プロダクトは最高だし、ワールドクラスのチームがひたすら出荷し続けている。`
  ],
  notes: [
    { h: '誰のどんな投稿か', b: `stepan（@SimkinStepan）の投稿をPatrickがリポストしたもの。@stablecoin は、同じ週のPatrickのPrivy投稿で「Stripeが提供する <i>@stablecoin payment rails and licenses</i>」と書かれているアカウントで、文脈上 Stripe傘下のステーブルコイン基盤 <b>Bridge</b> 系のアカウントとみられる。` },
    { h: 'Bridge', b: `ステーブルコインの発行・送金APIを提供するスタートアップ。Stripeが2024年10月に約11億ドルで買収を発表し、2025年2月に完了。Stripeの暗号資産事業の柱のひとつ（他に Privy＝ウォレット、Tempo＝決済用ブロックチェーン）。` }
  ],
  vocab: [
    { w: 'hot take', pos: 'n', ja: '（あえて刺激的な）物議を醸しそうな意見', note: 'SNS頻出。"potentially a hot take but ..." は「逆張りっぽいけど」と前置きする定型。' },
    { w: 'underrated', pos: 'adj', ja: '過小評価されている', note: '対義語 overrated。' },
    { w: 'world class', pos: 'adj', ja: '世界トップレベルの', note: '' },
    { w: 'keep shipping', pos: 'phr', ja: '（新機能・製品を）出し続ける', note: 'ship＝リリースする。テック業界の定番動詞。' }
  ]
},

'2110833525394166249': {
  title: 'イギリスの大聖堂を見に行ってほしい',
  ja: [
    `イギリスの偉大な大聖堂、たとえばリンカーンやダラムを訪れることを強く勧めたい。今年の初めに行ったのだが、いまだにしょっちゅう思い出してしまう。世界で最も美しい建物のいくつかだ。`
  ],
  notes: [
    { h: 'リンカーン大聖堂（Lincoln Cathedral）', b: `イングランド東部リンカーンにあるゴシック様式の大聖堂。1311年に中央塔の尖塔が完成し、<b>ギザの大ピラミッドを抜いて約240年間（1548年に尖塔が倒壊するまで）「世界一高い建造物」</b>だったとされる。ジョン・ラスキンが「英国で最も貴重な建築」と評したことでも知られる。` },
    { h: 'ダラム大聖堂（Durham Cathedral）', b: `イングランド北東部。1093年着工のノルマン（ロマネスク）様式の代表作で、ダラム城とともに1986年にUNESCO世界遺産。ゴシック建築の先駆けとなる<b>リブ・ヴォールト（肋骨状の天井）</b>を大規模に使った最初期の例とされる。映画『ハリー・ポッター』のホグワーツのロケ地としても有名。` },
    { h: 'Patrickらしさ', b: `彼は個人サイト（patrickcollison.com）で「Fast」（人類が速く成し遂げた事例集）や美しい建築・都市の写真を集めたページを公開しており、「美しいものを作れなくなった現代」への問題意識を何度も書いている。大聖堂は数十年〜数百年かけて建てられた「超長期プロジェクト」の象徴でもある。` }
  ],
  vocab: [
    { w: 'highly recommend', pos: 'v', ja: '強く勧める', note: '"very highly" とさらに強調している。' },
    { w: 'cathedral', pos: 'n', ja: '大聖堂（司教座のある教会）', note: 'ギリシャ語 kathedra（座席）＝司教の椅子が置かれた教会。' },
    { w: 'e.g.', pos: 'abbr', ja: 'たとえば', note: 'ラテン語 exempli gratia の略。i.e.（すなわち）と混同しない。' },
    { w: 'reminisce about', pos: 'v', ja: '〜を懐かしく思い出す', note: 'remember より情緒的。名詞 reminiscence。' },
    { w: 'find oneself -ing', pos: 'phr', ja: '気づくと〜している', note: '"find myself reminiscing" ＝思わず思い出してしまう。' }
  ]
},

'2110755264484041076': {
  title: 'Privy買収から1年：25倍に伸びたウォレット基盤',
  ja: [
    `今日は、@stripe の一員になって1年あまりが経った @privy_io の近況を振り返るのにちょうどいいタイミングだろう。`,
    `私たちの買収は3つの前提に基づいていた。ステーブルコインの成長、より広いグローバル展開を可能にする鍵としてのセルフカストディ（自己管理型ウォレット）、そしてプログラマブルな金融インフラへの急速に高まる需要だ。当時も言ったように、「お金はどこかに置かれていなければならない。そしてPrivyは世界最高のプログラマブルな金庫を作っている」。`,
    `それ以来、Privyチームの実行は見事だった。Privyウォレット内の資産は約25倍、月間アクティブ開発者は約3倍、売上は約9倍になり、Privyはいまや月間250億ドル近い取引量を処理している。@tryramp、@Deel、@Klarna、@felixpago、@HyperliquidX をはじめ何千もの企業が、Privyの上に組み込み型の銀行機能を構築している。`,
    `Stripeの中では、PrivyをTreasury、@Link、Connectに深く統合している。どれについても、Privyは私たちのグローバル展開を加速し、より良い機能をより速く作れるようにしてくれている。（近日公開：@Link 残高。）`,
    `また、Privyのウォレット基盤がエージェントが取引し、稼ぐための理想的な土台（substrate）であることも見えてきた。@merit_systems、@orthogonal_sh、@Nevermined_ai、@prlnet などですでに稼働中だ。開発者はプログラマブルな金融インフラを「好む」が、エージェントはそれを「必要とする」。エージェント経済はこれからも極めて速く成長し続けると見ている。`,
    `Privyチームは驚くべきプロダクト開発速度を維持しており、今年の主要リリースには、入金用アドレス、Privy残高での利回り獲得、デジタル資産口座、カストディアル型ウォレット、そしてStripe自身のステーブルコイン・カードがある。`,
    `Stripeによって Privy が加速されていく様子を見るのも面白かった。より良いオンランプ（法定通貨→暗号資産の入口）、@stablecoin の決済レールとライセンス、Stripeの法定通貨機能とカード発行スタック、そして @Tempo との統合。`,
    `私たちは一緒に、ステーブルコイン残高の保有と利回り獲得、法定通貨との出し入れ、そしてカードによる支出の制御を、ひとつのAPIで実現しようとしている。やるべきことはまだたくさんある。特に Privy、Bridge、そしてStripeの他の部分すべての統合だ。機能と能力があまりに広がったので、全体の整合を取る時間がまだあまり取れていない。それでも全体としては、うまくいっていることにとても満足しているし、これらの能力が向かう先にワクワクしている。`,
    `ステーブルコイン、エージェント決済、そして現実世界での暗号資産の活用の未来に取り組むことに興味がある人は、@sternhenri（現在 @StripeCrypto 全体を率いている）やチームの誰かに連絡してほしい。`
  ],
  notes: [
    { h: 'Privy とは', b: `メールやSNSログインだけで暗号資産ウォレットを作れる「組み込み型ウォレット」のインフラ企業。ユーザーは秘密鍵を意識せずに済み、アプリ側はAPIでウォレットを持たせられる。共同創業者・CEOは Henri Stern（@sternhenri）。Stripeは<b>2025年6月に買収を発表</b>。` },
    { h: 'Stripeのクリプト3点セット', b: `<table class="mini"><tr><th>会社</th><th>役割</th></tr><tr><td>Bridge</td><td>ステーブルコインの発行・送金・法定通貨との交換（ライセンス持ち）。2024/10買収発表</td></tr><tr><td>Privy</td><td>ウォレット（残高を置く場所）。2025/6買収発表</td></tr><tr><td>Tempo</td><td>決済向けのブロックチェーン。Stripe×Paradigm が2025年に発表</td></tr></table>Patrickの言う「one API」は、これらを1つにまとめて「残高を持つ→利回りを得る→法定通貨と出し入れ→カードで使う」まで一気通貫にする構想。` },
    { h: 'Stripe の既存プロダクト', b: `<b>Treasury</b>＝プラットフォームが自社ユーザーに銀行口座的な残高機能を提供できるBaaS。<b>Link</b>＝ワンクリック決済（保存済みの支払い情報）。<b>Connect</b>＝マーケットプレイス等の複数当事者への入金・分配の仕組み。そこに Privy のウォレットを入れて「残高」を持てるようにしている。` },
    { h: '数字の読み方', b: `資産25倍・開発者3倍・売上9倍。開発者数より資産と売上が大きく伸びている＝<b>1社あたりの利用が深くなっている</b>（大口顧客化）ことを示す。月間取引量 約250億ドルは年換算で約3,000億ドル規模。` },
    { h: '「開発者は好む、エージェントは必要とする」', b: `人間の開発者は従来の銀行APIでもなんとかなるが、AIエージェントは銀行口座を開けない・KYCを通れない。だから「APIだけで持てて動かせるお金」（＝プログラマブルなウォレット＋ステーブルコイン）がエージェントには必須になる、という主張。10/9のエージェント経済の長文ツイートとつながる論点。` },
    { h: '名前が出てくる企業', b: `Ramp（法人カード・経費精算）、Deel（グローバル給与・業務委託支払い）、Klarna（後払い）、Felix Pago（米国→中南米の送金をWhatsAppで）、Hyperliquid（暗号資産のデリバティブ取引所）。後半の merit_systems / Orthogonal / Nevermined / prlnet はAIエージェント向け決済まわりのスタートアップ。` }
  ],
  vocab: [
    { w: 'check in on', pos: 'phr', ja: '〜の様子を確認する、近況を見る', note: '' },
    { w: 'acquisition', pos: 'n', ja: '買収', note: 'M&A の A。動詞 acquire。' },
    { w: 'be predicated on', pos: 'phr', ja: '〜を前提としている', note: 'be based on より論理的・硬い。Patrickの頻出語（10/9のツイートにも登場）。' },
    { w: 'self-custody', pos: 'n', ja: 'セルフカストディ（資産を自分で保管すること）', note: 'custody＝保管・管理。取引所に預けず自分で鍵を持つ形。対：custodial（預かり型）。' },
    { w: 'enabler', pos: 'n', ja: '可能にするもの、実現要因', note: '' },
    { w: 'reside', pos: 'v', ja: '（ある場所に）存在する、置かれている', note: 'resident（居住者）と同根。' },
    { w: 'vault', pos: 'n', ja: '金庫、金庫室', note: '' },
    { w: 'execute', pos: 'v', ja: '実行する、やり遂げる', note: '"executed exceptionally well"＝実行が見事だった。経営の文脈では「計画を形にする力」。' },
    { w: 'facilitate', pos: 'v', ja: '（取引などを）仲介する、円滑にする', note: '' },
    { w: 'transaction volume', pos: 'n', ja: '取引量（金額）', note: 'TPV（Total Payment Volume）と並ぶ決済業界の基本指標。' },
    { w: 'embedded banking', pos: 'n', ja: '組み込み型の銀行機能', note: '非金融企業が自社サービス内に口座・カード等を組み込むこと。embedded finance とも。' },
    { w: 'substrate', pos: 'n', ja: '基盤、土台', note: '化学・生物では「基質」「基板」。テック文脈では「上に何かが育つ土台」。' },
    { w: 'agentic', pos: 'adj', ja: 'エージェント的な、AIエージェントによる', note: 'agentic economy / agentic payments は2025年以降の流行語。' },
    { w: 'velocity', pos: 'n', ja: '速度', note: 'product velocity＝プロダクト開発の速さ。speed より「継続的なペース」の含み。' },
    { w: 'onramp', pos: 'n', ja: 'オンランプ（法定通貨から暗号資産への入口）', note: '高速道路の入口ランプから。出口は offramp。' },
    { w: 'orchestrate', pos: 'v', ja: '（複数の要素を）統合して制御する', note: 'オーケストラを指揮する、から。' },
    { w: 'not least', pos: 'phr', ja: 'とりわけ、特に', note: '"not least in integrating ..."＝特に統合の部分で。' },
    { w: 'reconcile', pos: 'v', ja: '整合させる、すり合わせる', note: '会計では「突合する」。10/11のツイートでは「調和させる」の意味でも出る。' }
  ]
},

/* ---------------------------------------------------------------- 10/15 */
'2110724563181121704': {
  title: 'ステーブルコイン・カードで、残高が1億社で使える',
  ja: [
    `ステーブルコイン担保のカードは、世界中の残高を1億以上の事業者で即座に使えるようにする。@plasma と一緒にこの分野を前進させていくのを楽しみにしている。`
  ],
  qja: `Stripeの法定通貨インフラと暗号資産インフラを組み合わせ、通貨や市場をまたいで使えるステーブルコイン担保カードを企業がより簡単に作れるようにします。\n\n@Plasma と一緒に作っているものの詳細はこちら（記事リンク）`,
  notes: [
    { h: 'ステーブルコイン担保カードとは', b: `ユーザーの残高はUSDCなどのステーブルコインで持ち、支払う瞬間にカードネットワーク（Visa等）経由で法定通貨に換えて決済するカード。店側は普通のカード決済として受け取れるので、<b>既存の加盟店網（1億社以上）でそのまま使える</b>のがミソ。ドル建て資産を持ちたい新興国ユーザーと相性がいい。` },
    { h: 'Plasma', b: `ステーブルコイン（特にUSDT）の送金に特化したブロックチェーン（レイヤー1）。手数料ゼロのUSDT送金などを売りにする。リポストされた @pauliepunt（Paul）はPlasma側の人物とみられる。` },
    { h: '原文の誤植', b: `"make <b>make</b> global balances" と make が重複している（原文ママ）。` }
  ],
  vocab: [
    { w: '-backed', pos: 'adj', ja: '〜に裏付けられた、〜担保の', note: 'asset-backed（資産担保）、VC-backed（VC出資の）など。' },
    { w: 'balance', pos: 'n', ja: '残高', note: '' },
    { w: 'instantly usable', pos: 'adj', ja: '即座に使える', note: '' },
    { w: 'look forward to -ing', pos: 'phr', ja: '〜を楽しみにしている', note: 'to の後は動名詞。' },
    { w: 'advance the space', pos: 'phr', ja: 'この分野を前進させる', note: 'space＝（業界の）領域・分野。テック英語の定番。' }
  ]
},

'2110722524614963301': {
  title: '【リポスト】銀行の未来はステーブルコインの上で動く',
  ja: [
    `銀行の未来はステーブルコインの上で動く。\nPlasma上で、@StripeCrypto と提携して。`
  ],
  qja: `Stripeの法定通貨インフラと暗号資産インフラを組み合わせ、通貨や市場をまたいで使えるステーブルコイン担保カードを企業がより簡単に作れるようにします。\n\n@Plasma と一緒に作っているものの詳細はこちら（記事リンク）`,
  notes: [
    { h: '位置づけ', b: `直前の Stripe Crypto × Plasma 発表を、Plasma側の Paul（@pauliepunt）が引用した投稿をPatrickがリポスト。提携先の発信を拡散する、典型的な「発表日のリポスト」。` }
  ],
  vocab: [
    { w: 'run on', pos: 'phr', ja: '〜の上で動く、〜を基盤に稼働する', note: '"runs on electricity"、"run on AWS" など。' },
    { w: 'in partnership with', pos: 'phr', ja: '〜と提携して', note: '' }
  ]
},

'2110425940006219914': {
  title: '【リポスト】クラツィオスOSTP局長との対談動画',
  ja: [
    `Science: A New Golden Age Summit での @patrickc との対談のフルバージョン。`,
    `発見のための新しい組織づくり、科学の進歩の加速、そしてアメリカが最も難しい科学的課題にどうすればもっと速く取り組めるかについて話した。`
  ],
  notes: [
    { h: 'Michael Kratsios', b: `第2次トランプ政権の<b>ホワイトハウス科学技術政策局（OSTP）局長</b>（大統領の科学顧問にあたるポスト）。第1次政権では米国CTOを務め、Peter Thiel の元側近（Thiel Capital）としても知られる。` },
    { h: 'Patrick が呼ばれる理由', b: `Arc Institute（スタンフォード・UCバークレー・UCSFと連携する非営利の生物医学研究所）の共同創業者であり、「科学の生産性が落ちている」「研究資金の配り方を変えるべき」という論を長年発信してきたため。"building new institutions for discovery" はまさにArcのような新しい研究組織のこと。` },
    { h: 'fireside conversation', b: `暖炉（fireside）のそばで話すような、くだけた対談形式。ルーズベルト大統領のラジオ演説「炉辺談話（fireside chats）」が語源。カンファレンスの1対1トークの定番フォーマット。` }
  ],
  vocab: [
    { w: 'fireside conversation / chat', pos: 'n', ja: '（壇上の）対談、炉辺談話', note: '' },
    { w: 'summit', pos: 'n', ja: 'サミット、首脳会議、大規模会合', note: '' },
    { w: 'institution', pos: 'n', ja: '組織、機関、制度', note: 'Patrickの重要語。大学・研究所・財団など「長く続く仕組み」を指す。' },
    { w: 'discovery', pos: 'n', ja: '（科学的）発見', note: '' },
    { w: 'accelerate', pos: 'v', ja: '加速させる', note: '' }
  ]
},

'2110373917957505379': {
  title: '【リポスト】ステーブルコインはプライベートであるべき（Tempo Zones）',
  ja: [
    `ステーブルコインを現実世界の用途で使っているなら、それがプライベート（秘匿）でないなんて、すぐに考えられないことになるだろう。`,
    `暗号資産のあまりに多くが、プライバシーではなく仮名性（pseudonymity）に頼っている。AIの時代にはオンチェーンの取引を追跡し、相互に紐づけるのがますます簡単になるので、なおさらだ。`,
    `Tempoは、オンチェーンのプライバシーに対するスケーラブルで、技術的に練られていて、きわめて実用的な解決策として Tempo Zones に取り組んできた。`,
    `そして最初の Tempo Zone が Deel で稼働を開始し、彼らのグローバルな業務委託者への支払いにプライバシーを加えている。`,
    `誰もが現実世界のお金の流れをオンチェーンでスケールさせたいと思っていて、プライバシーはその明確な前提条件だ。Tempoチームは実用的な解決策を作り上げるために懸命に取り組んできた。詳しく知りたい方はぜひチームに連絡を！`
  ],
  qja: `Tempoでプライバシーが使えるようになりました。\n\nTempo Zones を使えば、企業はコンプライアンス管理機能を組み込みつつ、グローバルな流動性にもアクセスしながら、顧客のステーブルコイン残高と支払いを非公開に保てます。\n\n@deel が Zones を本番稼働させた最初の顧客です。`,
  notes: [
    { h: 'Matt Huang と Tempo', b: `Matt Huang は暗号資産VC <b>Paradigm</b> の共同創業者。Stripe と Paradigm が共同で立ち上げた決済特化ブロックチェーン <b>Tempo</b> を率いる（Stripe の取締役でもある）。` },
    { h: '仮名性とプライバシーの違い', b: `ビットコイン等のパブリックチェーンでは取引は全部公開されていて、名前の代わりにアドレスが見えるだけ（＝<b>仮名性</b>）。アドレスと実在の人・会社が一度紐づくと、残高も取引履歴も丸見えになる。企業が給与や取引先への支払いを流すと、取引先・金額・給与額が競合に見えてしまうので、企業利用には<b>本当のプライバシー</b>（中身を隠す）が必須、という主張。AIで取引パターンの照合が容易になるほど仮名性は破られやすくなる。` },
    { h: 'Deel の事例', b: `Deel は世界中の業務委託者・社員への支払いを代行するHR/給与SaaS。委託者の報酬額が公開チェーンに載るのは困るので、プライバシー付きの「Zone」で払う、という最初の本番事例。` }
  ],
  vocab: [
    { w: 'unthinkable', pos: 'adj', ja: '考えられない、ありえない', note: '' },
    { w: 'pseudonymity', pos: 'n', ja: '仮名性', note: 'pseudo（偽の）+ onym（名前）。anonymity（匿名性）とは違い、同じ仮名で追跡はできる。' },
    { w: 'correlate', pos: 'v', ja: '相互に関連づける、突き合わせる', note: '' },
    { w: 'onchain', pos: 'adj/adv', ja: 'ブロックチェーン上の（で）', note: '対：offchain。' },
    { w: 'nuanced', pos: 'adj', ja: '微妙な差異をくんだ、繊細に練られた', note: '"technically nuanced"＝技術的に単純化しすぎていない。' },
    { w: 'payout', pos: 'n', ja: '支払い（金）、払い出し', note: 'contractor payouts＝業務委託者への報酬支払い。' },
    { w: 'prerequisite', pos: 'n', ja: '前提条件', note: 'pre（前に）+ requisite（必要なもの）。' },
    { w: 'craft', pos: 'v', ja: '（手間をかけて）作り上げる', note: '' },
    { w: 'liquidity', pos: 'n', ja: '流動性', note: '' }
  ]
},

/* ---------------------------------------------------------------- 10/14 */
'2110065299076907064': {
  title: 'Stripe Press新刊：営業の決定版ガイド『Built to Grow』',
  ja: [
    `@stripepress の新刊：営業についての決定版ガイド。`,
    `最近のスタートアップは、かつてないほど速く営業組織をスケールさせている。だからこそ、最初から組織構造とインセンティブを正しく設計しておくことの価値が上がっていると感じる。`
  ],
  qja: `発売しました！『Built to Grow: A Handbook for High-Performance Sales Teams（成長のために作る：高業績営業チームのためのハンドブック）』Stephanie Friedman著：https://press.stripe.com/built-to-grow\n\nカタログの本はどれも大好きですが、特に愛しているのは “turpentine collection” です：『High Growth Handbook』『An Elegant Puzzle』『Scaling People』、そして今回の『Built to Grow』！\n\n営業組織を作るのは——特に今は——科学というより芸術です。Stephanie は100人超の営業チームを20年以上作り続け、世界で最も急成長している企業のいくつかにもその方法を助言してきました。\n\n私たちと同じくらい気に入ってもらえたら嬉しいです。`,
  notes: [
    { h: 'Stripe Press', b: `Stripe が2018年に始めた出版レーベル。進歩・科学・経営に関する良書の復刊や新刊を、装丁にこだわって出している。引用元の Tamara Winter は Stripe Press の編集責任者。` },
    { h: '実務書シリーズの系譜', b: `<b>High Growth Handbook</b>（Elad Gil：急成長スタートアップの経営）、<b>An Elegant Puzzle</b>（Will Larson：エンジニアリング組織の運営）、<b>Scaling People</b>（Claire Hughes Johnson：元Stripe COO による組織拡大）。今回の Built to Grow は営業組織版。“turpentine collection” は原文ママで、Stripe Press 内でのこの実務書ラインの呼び名とみられる。` },
    { h: 'Patrick のコメントの意味', b: `AI時代のスタートアップは売上の立ち上がりが速く（数ヶ月でARR数十億円など）、営業チームも急拡大する。そのとき<b>報酬設計（コミッション）や担当分けの構造を後から直すのは非常に痛い</b>ので、最初から正しく作る価値が上がっている、という指摘。` }
  ],
  vocab: [
    { w: 'definitive', pos: 'adj', ja: '決定版の、最も権威ある', note: 'definite（明確な）と区別。' },
    { w: 'scale', pos: 'v', ja: '（規模を）拡大する', note: '"scaling sales faster than ever"。' },
    { w: 'incentive', pos: 'n', ja: 'インセンティブ、動機づけ（報酬設計）', note: '' },
    { w: 'from the outset', pos: 'phr', ja: '最初から', note: 'from the start より硬め。' },
    { w: 'handbook', pos: 'n', ja: '手引き書、ハンドブック', note: '' },
    { w: 'catalogue', pos: 'n', ja: '（出版社の）刊行目録', note: '英綴り。米 catalog。' }
  ]
},

'2110064626289594485': {
  title: '新しい Works in Progress 誌は傑作',
  ja: [
    `かなり身内びいきだけど、新しい @WorksInProgMag はデザインと中身の両面で、私見では傑作だ。`,
    `https://worksinprogress.co/print/`
  ],
  qja: `@WorksInProgMag チームは今回、自分たちを超えてきた。そんなことが可能だとは知らなかった。\n折り込みページ（フラップ）まである！\nなんて見事なアート作品！`,
  notes: [
    { h: 'Works in Progress', b: `「進歩」をテーマにしたアイデア誌。2020年に Sam Bowman、Ben Southwood（@bswud）らが創刊し、2022年に <b>Stripe 傘下</b>に入った。住宅・都市計画・科学政策・経済成長などを、データと歴史で掘る長文記事が特徴。オンラインに加え紙の印刷版も出している。` },
    { h: '“I’m very biased” の理由', b: `自社（Stripe）が持っている雑誌なので、褒めるのは身内びいきだと先に断っている。` }
  ],
  vocab: [
    { w: 'biased', pos: 'adj', ja: '偏った、ひいき目の', note: '"I’m biased, but ..."＝利害関係を先に開示する定型。' },
    { w: 'IMO', pos: 'abbr', ja: '私の意見では（in my opinion）', note: 'IMHO（in my humble opinion）も。' },
    { w: 'masterpiece', pos: 'n', ja: '傑作', note: '' },
    { w: 'outdo oneself', pos: 'phr', ja: '自己ベストを超える、いつも以上の出来', note: '' },
    { w: 'flap', pos: 'n', ja: '折り込み・垂れ蓋（本のカバーの袖など）', note: '' },
    { w: 'stunning', pos: 'adj', ja: '息をのむほど美しい', note: '' }
  ]
}

});

/* industrial news — data
 * 1件 = NEWS.push({...}) 1ブロック。index.html はこの配列だけを読む。
 *
 * 本文(en)中の難しめの単語は {{word|和訳|解説}} で囲む → hover/tapで和訳と解説が出る。
 *   解説は省略可: {{word|和訳}}
 * fields:
 *   id, industry(Steel/Data Center/Robotics/Cooling/Aluminum/Copper), type, region, startup(bool),
 *   company, title_en, title_ja, amount, amount_sub, date(ニュース日), posted(掲載日),
 *   players, en[], ja[], expr[{en,ja,note,ex}], context[{h,b}], sources[{t,u}], link(深掘りページ・任意)
 */
var NEWS = [];

/* ================================================================ STEEL */

NEWS.push({
  id: 'hertha-series-a',
  industry: 'Steel', type: 'Funding', region: 'JP×US', startup: true,
  company: 'Hertha Metals',
  title_en: 'Hertha Metals raises $133.65M Series A and breaks ground on a high-purity iron plant in Texas',
  title_ja: 'Hertha Metals、$133.65MのSeries Aを調達。テキサスで高純度鉄の工場に着工',
  amount: '$133.65M', amount_sub: 'Series A（うち米政府 $65M）',
  date: '2026-10-01', posted: '2026-10-14',
  players: 'Khosla Ventures, Doerr Capital（共同リード）／Toyota Ventures／Niterra CVC（運用: Global Brain）／Gates Frontier／US Government',
  en: [
    'Texas-based Hertha Metals has closed a $133.65 million Series A, including a $65 million {{equity investment|株式出資|融資(debt)と違い返済義務がなく、代わりに株を受け取る出資。政府が株主になるのは米国では異例で、国家安全保障案件の証拠と読める。}} from the US government.',
    'The round was {{co-led|共同リード|lead investorは条件（評価額・取締役席）を決める主導役。co-leadは2社以上でその役を分け合うことで、大型・人気ラウンドに多い。}} by Khosla Ventures and Doerr Capital, with participation from Toyota Ventures and the corporate venture fund of Niterra, managed by Global Brain.',
    'Hertha\'s FLEX-HERS process replaces the conventional multi-stage, {{coal-dependent|石炭に依存した|-dependent は「〜頼みの」を作る接尾辞（oil-dependent, export-dependent）。高炉はコークス（石炭を蒸し焼きにしたもの）で鉄鉱石を還元するため、CO2排出の大半がここから出る。}} {{blast furnace|高炉|blast＝熱風を吹き込むことから来た名前。高さ100m級の巨大設備で、一度火を入れると十数年は止めずに動かし続ける。}} route with a single continuous {{reduction|還元|化学の reduction は「量を減らす」ではなく「還元」。Fe2O3から酸素(O)を奪ってFeにする反応で、製鉄の本質はこの1工程。}} reactor.',
    'The money will fund Hertha Chalyx, a facility in Conroe, Texas, designed to produce 10,000 metric tons a year of steel-grade and magnet-grade iron, with operations expected in late 2027.',
    'The company pitches the output as a {{domestic|国内の|経済記事では foreign/imported の対義語として「国産の」。domestic demand（内需）、domestic production（国内生産）のように使う。}} {{feedstock|原料|化学・素材の業界語で、工程に投入する原料（ナフサ、鉄鉱石、スクラップなど）。raw material よりプロセス寄りの響きがある。}} for rare earth magnets used in fighter jets and missile guidance systems — an area where the US is heavily {{reliant on|〜に依存している|dependent on とほぼ同義で、heavily reliant on ~（〜に大きく依存）が定番。サプライチェーン記事では対中依存を語る文脈で頻出。}} China.'
  ],
  ja: [
    'テキサスのHertha MetalsがSeries Aで$133.65Mを調達した。このうち$65Mは米政府による株式出資。',
    'Khosla VenturesとDoerr Capitalが共同でリードし、Toyota Venturesと、Global Brainが運用するNiterra（旧・日本特殊陶業）のCVCも参加した。',
    'Hertha独自のFLEX-HERSプロセスは、石炭に頼る多段階の高炉ルートを、1基の連続還元リアクターに置き換える。',
    '資金はテキサス州ConroeのHertha Chalyxに充てる。鉄鋼グレードと磁石グレードの鉄を年1万t生産する施設で、稼働は2027年末の見込み。',
    '同社は、戦闘機やミサイル誘導装置に使うレアアース磁石の国産原料として売り込んでいる。米国が中国に大きく依存している領域だ。'
  ],
  expr: [
    { en: 'close a round', ja: '（資金調達ラウンドを）クローズする＝着金・確定させる', note: 'announceは「発表」、closeは「完了」。報道では "is raising"（調達中）と "has closed"（完了）が厳密に使い分けられる。', ex: 'The startup closed its Series B in just six weeks.' },
    { en: 'with participation from ~', ja: '〜も参加して', note: '資金調達記事の定型句。リード投資家の後にフォロー投資家を並べるときに使う。', ex: 'The round was led by Sequoia, with participation from Nvidia and M12.' },
    { en: 'break ground (on ~)', ja: '（〜の）工事に着手する、着工する', note: '文字通り「地面を掘り始める」。groundbreaking ceremony＝起工式。形容詞の groundbreaking は「画期的な」の意味でもよく使う。', ex: 'The company broke ground on its first plant in Texas.' },
    { en: 'pitch A as B', ja: 'AをBとして売り込む', note: '投資家・顧客向けの「位置づけ」を示すときの動詞。position A as B もほぼ同義。', ex: 'They pitch the product as a drop-in replacement for copper.' },
    { en: 'metric ton', ja: 'メートルトン（1,000kg）', note: '米国の short ton（約907kg）と区別するために metric を付ける。業界記事では "tonnes" と綴られることも多い。', ex: 'The plant will produce 10,000 metric tons a year.' }
  ],
  context: [
    { h: '高純度鉄が「磁石」の話になる理由', b: 'ネオジム磁石（NdFeB）の重量の約2/3は鉄。不純物が少ないほど磁気特性が上がるため、磁石グレードの鉄は鉄鋼向けよりもはるかに高い純度を求められる。レアアースの脱中国だけでなく、その相方の鉄も国産化しようという流れ。' },
    { h: '高炉ルートとDRI / 電気炉ルート', b: '鉄の主流は「高炉（BF）→転炉（BOF）」で、コークスで還元するためCO2が多い。代替が「直接還元鉄（DRI）→電気炉（EAF）」。Herthaは還元を1つの連続炉にまとめ、天然ガスや水素を使えるようにした。' },
    { h: '日本勢の座組み', b: 'Toyota Venturesに加え、Niterra（旧・日本特殊陶業、点火プラグやセンサーのメーカー）のCVCが入っている。CVCとはCorporate Venture Capitalの略で、事業会社が戦略目的で出すVC。日本の部品メーカーが米国の素材スタートアップに張る典型パターン。' }
  ],
  sources: [
    { t: 'Steel Market Update', u: 'https://www.steelmarketupdate.com/2026/10/01/hertha-metals-receives-funding-to-produce-high-purity-iron/' },
    { t: 'Construction Mirror（投資家一覧）', u: 'https://constructionmirror.com/texas-startup-raises-133-65-million-to-build-magnet-grade-iron-plant/' },
    { t: 'IndexBox（Conroe着工）', u: 'https://www.indexbox.io/blog/hertha-metals-breaks-ground-on-100m-chalyx-plant-in-conroe-texas/' }
  ]
});

NEWS.push({
  id: 'electra-offtakes',
  industry: 'Steel', type: 'Offtake', region: 'JP×US', startup: true,
  company: 'Electra',
  title_en: 'Electra lines up Meta, Nucor and Toyota Tsusho as early buyers of its clean iron',
  title_ja: 'Electra、クリーン鉄の初期顧客にMeta・Nucor・豊田通商を確保',
  amount: '$186M', amount_sub: 'Series B（2025）＋BE Catalyst $50M grant',
  date: '2025-11-03', posted: '2026-10-14',
  players: 'Nucor（出資＋顧客）／Meta（EAC購入）／Toyota Tsusho／INTERFER／Breakthrough Energy Catalyst',
  en: [
    'Colorado-based Electra, which makes iron through a low-temperature {{electrochemical|電気化学の|電池・めっき・アルミ製錬と同じく、電気で化学反応を起こす分野。Electraは60℃程度の低温の溶液中で鉄を析出させる。}} process, has signed {{advance purchase agreements|事前購入契約|まだ量産前の製品を将来買う約束。量産前のスタートアップには需要の証明そのものになり、次の資金調達や政府融資の材料になる。}} with several industrial buyers.',
    'Nucor, the largest US steelmaker and also an investor, will use Electra\'s iron in the {{electric arc furnaces|電気炉|略してEAF。電極間のアーク放電の熱でスクラップや還元鉄を溶かす。米国の粗鋼の約7割はすでにEAF製で、Nucorはその最大手。}} at its sheet mills.',
    'Toyota Tsusho and INTERFER Edelstahl have also agreed to buy {{offtake|引き取り量|資源・エネルギーの業界語で、生産物を引き取る（買い取る）こと。offtake agreement が付いているとプロジェクトファイナンスが組みやすくなる。}} volumes.',
    'Meta, in a less obvious move, made the first purchase of {{environmental attribute credits|環境価値クレジット|略してEAC。モノと「環境価値」を切り離して、後者だけを売買する仕組み。電力のRECと同じ発想を鉄に持ち込んだもの。}} tied to the emissions Electra avoids.',
    'The company is building a 500-ton-a-year demonstration plant in Jefferson County, Colorado, originally slated to start up in mid-2026.'
  ],
  ja: [
    '低温の電気化学プロセスで鉄をつくるコロラドのElectraが、複数の産業顧客と事前購入契約を結んだ。',
    '米国最大の鉄鋼メーカーで出資者でもあるNucorは、薄板工場の電気炉でElectraの鉄を使う。',
    '豊田通商とINTERFER Edelstahlも引き取りに合意した。',
    'やや意外なのがMeta。Electraが削減した排出量にひもづく環境価値クレジットの最初の買い手になった。',
    '同社はコロラド州Jefferson Countyに年産500tのデモプラントを建設中で、当初は2026年半ばの稼働予定だった。'
  ],
  expr: [
    { en: 'line up ~', ja: '〜を揃える、確保する', note: '顧客・投資家・登壇者などを「並べて確保する」。line-up（名詞）は顔ぶれ。', ex: 'The startup has lined up three anchor customers.' },
    { en: 'in a less obvious move', ja: 'やや意外な動きとして', note: '記事の中で「予想外の当事者」を紹介する前置き。a surprising move / an unusual step も同様。', ex: 'In a less obvious move, the bank invested in a fusion startup.' },
    { en: 'slated to ~', ja: '〜する予定になっている', note: 'scheduled to のジャーナリズム的な言い換え。be slated for + 時期 でも使う。', ex: 'The plant is slated to open in 2027.' },
    { en: 'tied to ~', ja: '〜にひもづいた、連動した', note: '金融・契約の文脈で頻出。pegged to / linked to も近い。', ex: 'Bonuses are tied to performance.' }
  ],
  context: [
    { h: 'なぜMetaが鉄を？', b: 'ハイパースケーラーはScope 3（サプライチェーン排出）の削減目標を持つ。DCの建屋に大量の鉄鋼を使うため、製品そのものではなく削減価値（EAC）を買って帳尻を合わせる。DCと製鉄がつながる接点。' },
    { h: 'Nucorの立ち位置', b: 'Nucorは電気炉（EAF）専業の米国最大手。電気炉はスクラップが主原料だが、高級鋼板には不純物の少ない「バージン鉄」が要る。Electraの鉄はその不足を埋めるピースになる。' },
    { h: '状況（2026-10時点）', b: 'デモプラントが予定どおり稼働したかの続報は、まだ確認できていない。同じ電解系のBoston Metalが失速しているため、Electraの立ち上げは業界の試金石になる。' }
  ],
  sources: [
    { t: 'Canary Media', u: 'https://www.canarymedia.com/articles/green-steel/electra-meta-nucor-clean-iron-production' },
    { t: 'ESG Dive', u: 'https://www.esgdive.com/news/electra-inks-deals-with-meta-nucor-toyota-to-scale-low-carbon/803386/' },
    { t: 'Latitude Media（Meta EAC）', u: 'https://www.latitudemedia.com/news/meta-is-buying-green-ironmaker-electras-first-eacs/' }
  ]
});

NEWS.push({
  id: 'boston-metal-woburn',
  industry: 'Steel', type: 'Setback', region: 'US', startup: true,
  company: 'Boston Metal',
  title_en: 'Boston Metal lays off 71 and closes its Massachusetts operations after an equipment failure in Brazil',
  title_ja: 'Boston Metal、ブラジルでの設備故障を受け71人を解雇。マサチューセッツの拠点を閉鎖',
  amount: '—', amount_sub: '71人解雇',
  date: '2026-03', posted: '2026-10-14',
  players: 'Boston Metal（MIT発）／ブラジル子会社',
  en: [
    'Boston Metal, an MIT {{spinout|スピンアウト（大学・企業から独立した会社）|spin out（スピンアウトする）の名詞形。spinoff もほぼ同義だが、大学発のものは spinout と言われることが多い（MIT spinout など）。}} developing {{molten oxide electrolysis|溶融酸化物電解|略してMOE。アルミ製錬（ホール・エルー法）の鉄版のようなもので、排出は酸素だけ。代わりに超高温に耐える電極と炉材が技術的な壁になる。}}, said it would lay off 71 workers and close its operations in Woburn, Massachusetts.',
    'The move followed a {{critical equipment failure|重大な設備故障|critical は「重大な、致命的な」。critical minerals（重要鉱物）、critical path（クリティカルパス）でも「欠かせない」のニュアンスで使われる。}} at its Brazilian facility that {{derailed|頓挫させた|rail（線路）から外れる＝脱線。計画・交渉・キャリアが「狂わされる」比喩として、受動態の be derailed by ~ でもよく出る。}} its scale-up plans.',
    'The company will {{shift its focus|軸足を移す|pivot よりも穏やかで前向きに聞こえるので、リストラ発表の定番表現。refocus on ~ もよく使われる。}} to its Brazilian subsidiary, which recovers high-value metals from mining waste.',
    'The setback is a reminder of how hard it is to {{scale|規模拡大する|動詞の scale は「規模を大きくする」。scale up（拡大）/ scale back（縮小）/ at scale（大規模に）のセットで覚える。}} high-temperature electrochemistry from the lab to industrial volumes.'
  ],
  ja: [
    '溶融酸化物電解を開発するMIT発のBoston Metalが、71人を解雇し、マサチューセッツ州Woburnの拠点を閉じると発表した。',
    'ブラジル拠点で重大な設備故障が起き、スケールアップ計画が頓挫したのがきっかけ。',
    '今後は、鉱山廃棄物から高価値金属を回収するブラジル子会社に軸足を移す。',
    '高温の電気化学をラボから工業規模へ持っていく難しさを改めて示す一件だ。'
  ],
  expr: [
    { en: 'derail ~', ja: '〜を頓挫させる', note: '「脱線させる」の比喩。計画・交渉・キャリアなどに使える。be derailed by ~ の受動態も頻出。', ex: 'Rising rates could derail the IPO.' },
    { en: 'a reminder of ~', ja: '〜を改めて思い出させるもの', note: '失敗事例を一般化して締めるときの定番。a stark reminder（厳しい教訓）とも。', ex: 'The outage is a stark reminder of grid fragility.' },
    { en: 'shift focus to ~', ja: '〜へ軸足を移す', note: 'pivot to ~ より穏やかな言い方。リストラ発表で多用される。', ex: 'The company is shifting focus to enterprise customers.' }
  ],
  context: [
    { h: 'グリーン鉄の3つのルート', b: '①水素DRI（Stegraなど。H2で還元）、②溶融酸化物電解（Boston Metal。高温電解）、③低温電解（Electra。溶液中で電解）。②は最もCO2が少ないが、高温の炉の材料と耐久性が壁になる。' },
    { h: '読み', b: '「技術は正しいが、スケールで死ぬ」がdeeptech製造業の典型的な失敗パターン。Herthaのように既存の工業プロセスに近い方式の方が、資金が集まりやすい局面に入っている可能性がある。' }
  ],
  sources: [
    { t: 'Boston Metal (Wikipedia)', u: 'https://en.wikipedia.org/wiki/Boston_Metal' },
    { t: 'NewsBytes', u: 'https://www.newsbytesapp.com/news/business/electra-and-boston-metal-develop-cleaner-steelmaking-amid-setbacks/tldr' }
  ]
});

NEWS.push({
  id: 'worldsteel-outlook-cut',
  industry: 'Steel', type: 'Market', region: 'Global', startup: false,
  company: 'World Steel Association',
  title_en: 'worldsteel\'s October outlook sees 2026 steel demand roughly flat to slightly down; India remains the growth engine',
  title_ja: 'worldsteelの10月見通し、2026年の鉄鋼需要は横ばい〜わずかな縮小。成長をけん引するのはインド',
  amount: '1,722Mt', amount_sub: '2026年 世界需要（4月予測は1,724Mt）',
  date: '2026-10', posted: '2026-10-14',
  players: 'World Steel Association',
  en: [
    'In its October short-range outlook, the World Steel Association {{revised|修正した|予測・ガイダンスを「改める」。上方修正は revise up / upgrade、下方修正は revise down / cut と言う。}} its 2026 forecast for global steel demand to about 1,722 million tonnes, {{down|下方に|revise ~ down で「下方修正する」。副詞を後ろに置くのが英語らしい形で、mark down（値下げ）、write down（減損）も同じ型。}} slightly from 1,724 million tonnes in April — essentially flat, though some outlets {{framed|（〜と）表現した|frame は「枠にはめる」→ 物事をどういう切り口で伝えるか。how the media frames the story（報道の切り取り方）。}} it as a slight contraction.',
    'India is still expected to be the main source of growth, with domestic demand projected to {{surge|急増する|急騰・急増。jump < surge < soar の順に勢いが強くなるイメージ。名詞でも a surge in demand のように使う。}} 7.9% this year.',
    'Weakness in China\'s property sector and {{sluggish|低調な、伸び悩む|slug（ナメクジ）が語源で、のろのろした様子。景気・需要・売上が「伸び悩む」ときの定番形容詞。}} manufacturing in Europe continue to {{weigh on|〜の重しになる|「〜の上に重くのしかかる」。株価・需要・景況感が下がる原因を語るときの市況記事の定番。対義語のイメージは lift / boost。}} consumption elsewhere.'
  ],
  ja: [
    '世界鉄鋼協会（worldsteel）が10月の短期見通しで、2026年の世界鉄鋼需要の予測を約1,722Mtに改めた。4月の1,724Mtからわずかに下げた形で、ほぼ横ばいだが、「わずかな縮小」と報じたメディアもある。',
    '主な成長源は引き続きインドで、国内需要は今年7.9%の急増が見込まれる。',
    '中国の不動産不振と欧州製造業の伸び悩みが、ほかの地域の消費の重しになり続けている。'
  ],
  expr: [
    { en: 'revise ~ down / downward', ja: '〜を下方修正する', note: '予測・ガイダンスの修正に使う。上方修正は revise up。"cut its forecast" はより口語的。', ex: 'The IMF revised its growth forecast down to 2.8%.' },
    { en: 'weigh on ~', ja: '〜の重しになる', note: '市況記事の超頻出表現。株価・需要・センチメントが主語の受け手になる。', ex: 'Higher rates weighed on tech stocks.' },
    { en: 'call', ja: '（名詞）予想、判断', note: '"an earlier call" で「以前の予想」。アナリストの判断全般を指す口語的な名詞。', ex: 'It was a bold call to sell before the crash.' }
  ],
  context: [
    { h: '※補足', b: '中国・欧州の弱さは、一般的な背景として補足したもの。worldsteelの今回の発表文で、その具体的な数字までは確認できていない。' },
    { h: '世界の鉄鋼需要の構図', b: '世界需要の約半分が中国。中国の不動産が沈むと世界全体が横ばいから縮小に傾く。インドはインフラ投資で伸びており、日本の鉄鋼メーカー（日本製鉄＝AM/NS India、JFE＝JSW提携）もインドに張っている。' }
  ],
  sources: [
    { t: 'SMM', u: 'https://news.metal.com/newscontent/104154947-world-steel-revises-2026-demand-outlook-to-slight-contraction' },
    { t: 'worldsteel press releases', u: 'https://worldsteel.org/media/press-releases/2026/' }
  ]
});

NEWS.push({
  id: 'arcelormittal-kryvyi-rih',
  industry: 'Steel', type: 'Market', region: 'Global', startup: false,
  company: 'ArcelorMittal Kryvyi Rih',
  title_en: 'ArcelorMittal puts its Kryvyi Rih steelworks in Ukraine into cold standby after missile strikes',
  title_ja: 'ArcelorMittal、ミサイル攻撃を受けウクライナのKryvyi Rih製鉄所をcold standbyへ',
  amount: '—', amount_sub: '2ヶ月かけて休止',
  date: '2026-10', posted: '2026-10-14',
  players: 'ArcelorMittal',
  en: [
    'ArcelorMittal is placing its Kryvyi Rih steelworks in Ukraine into {{cold standby|冷間待機|高炉の火を落とした休止。再稼働に数ヶ月と多額の費用がかかる。火を残して短期間で戻せる状態は hot standby / banking と呼ぶ。}} after severe missile attacks {{halted|停止させた|stop より硬い報道語。trading was halted（売買停止）、production halted（生産停止）のように受動態でも自動詞でも使う。}} primary steel production.',
    'The shutdown will take about two months to complete.',
    'Kryvyi Rih is one of Ukraine\'s largest {{integrated|一貫（製鉄所）|integrated steel plant＝一貫製鉄所。原料から製品まで一拠点で作る形態で、日本の大手高炉メーカーの製鉄所もこの形。}} steel plants, and the move further {{erodes|侵食する、削る|波が岸を削るように、じわじわ減らす。margin erosion（利益率の低下）、erosion of trust（信頼の低下）のように名詞形も頻出。}} the country\'s output.'
  ],
  ja: [
    'ArcelorMittalが、ウクライナのKryvyi Rih製鉄所をcold standbyに移す。激しいミサイル攻撃で一次製鋼が止まったためだ。',
    '停止の完了までには約2ヶ月かかる。',
    'Kryvyi Rihはウクライナ最大級の一貫製鉄所で、今回の休止で同国の生産はさらに細る。'
  ],
  expr: [
    { en: 'place ~ into standby', ja: '〜を待機（休止）状態にする', note: '設備の「休止」は idle / mothball / put on standby で表現する。mothballは長期の休止。', ex: 'The smelter was mothballed in 2022.' },
    { en: 'erode ~', ja: '〜を（じわじわ）削る', note: '利益率・シェア・信頼などが徐々に減るときに使う。margin erosion（利益率の低下）。', ex: 'Cheap imports eroded domestic producers\' margins.' }
  ],
  context: [
    { h: '高炉は止めにくい', b: '高炉は一度火を落とすと、炉内の固化した銑鉄を取り除くなど再稼働に数ヶ月と多額の費用がかかる。cold standbyにする判断は重く、事実上、長期の生産喪失を意味する。' }
  ],
  sources: [
    { t: 'AIST Steel News', u: 'https://www.aist.org/steel-news' },
    { t: 'SMM（ウクライナ生産統計）', u: 'https://news.metal.com/newscontent/104152543-ukrainian-steel-output-reaches-131000-tonnes-in-september' }
  ]
});

NEWS.push({
  id: 'cliffs-middletown',
  industry: 'Steel', type: 'Project', region: 'US', startup: false,
  company: 'Cleveland-Cliffs / Nucor',
  title_en: 'Cleveland-Cliffs\' $1B Middletown blast furnace overhaul awaits Ohio EPA\'s final permit; Nucor adds $105M for utility structures',
  title_ja: 'Cleveland-CliffsのMiddletown高炉改修（$1B）、Ohio EPAの最終許可待ち。Nucorは送電鉄塔・電柱の工場に$105M',
  amount: '$1B', amount_sub: '高炉改修＋コージェネ／Nucor $105M',
  date: '2026-10', posted: '2026-10-14',
  players: 'Cleveland-Cliffs／Ohio EPA／Nucor（Towers & Structures）',
  en: [
    'Cleveland-Cliffs is moving ahead with a roughly $1 billion project at its Middletown Works in Ohio, but the plan is no longer the {{hydrogen-ready|水素対応の|将来は水素で鉄鉱石を還元できる設計。Cliffsは当初、高炉をこの方式のDRIに置き換える計画だった。}} plant it once promised.',
    'Instead of replacing the {{coal-fired|石炭を燃料とする|ここでは高炉がコークス（石炭由来）を使うこと。}} blast furnace, Cliffs will {{refurbish|改修する|設備を全面的に手入れして使い続けること。高炉の場合は炉内の耐火物を張り替える「巻き替え（reline）」が中心。}} it and add {{cogeneration|コージェネ（熱電併給）|1つの燃料から電気と熱を同時に取り出す設備。工場の排ガスを発電に回して電力コストを下げる。}} equipment.',
    'Ohio EPA has issued a draft air permit for the project; as of the latest reports, a final decision was still expected within months.',
    'Separately, Nucor is investing $105 million to expand its utility tower and pole operations, a bet on the {{build-out|整備・拡張|インフラを大規模に作り広げること。grid build-out＝送電網の拡充。}} of the power grid rather than on new steelmaking capacity.'
  ],
  ja: [
    'Cleveland-CliffsがオハイオのMiddletown製鉄所で約$1Bの計画を進めている。ただし、以前に約束していた水素対応の設備ではなくなった。',
    'Cliffsは、石炭を使う高炉を置き換えるのではなく改修し、コージェネ設備を追加する。',
    'Ohio EPAは計画の大気許可のドラフトを出している。最新の報道では、最終判断は数ヶ月以内とされていた。',
    'これとは別に、Nucorは送電鉄塔・電柱の事業の拡張に$105Mを投じる。新しい製鋼能力ではなく、送電網の拡充に賭ける投資だ。'
  ],
  expr: [
    { en: 'no longer ~', ja: 'もはや〜ではない', note: '方針転換を語る定番。"is no longer the plan it once promised" で「かつて約束した計画ではなくなった」。', ex: 'The company is no longer pursuing the hydrogen plant.' },
    { en: 'instead of ~ing', ja: '〜する代わりに', note: '計画変更の中身を対比で示す。rather than ~ もほぼ同義（最終文の rather than on new capacity）。', ex: 'Instead of building a new plant, they upgraded the old one.' },
    { en: 'a bet on ~', ja: '〜への賭け', note: '投資の意図を一言で言い表す定番。a bet on AI demand / a bet on the grid。', ex: 'The acquisition is a bet on rising electricity demand.' }
  ],
  context: [
    { h: '脱炭素からの後退', b: 'Cliffsは以前、Middletownの高炉を水素対応のDRI＋電気炉に置き換える計画（米エネルギー省の補助金つき）を掲げていたが、それを取りやめて高炉の延命に切り替えた。グリーンスチールの政策支援が細るなかでの象徴的な判断。' },
    { h: '※報道の揺れ', b: 'ニュースのまとめサイトには「Ohio EPAが許可を出した」とあるが、一次報道（7〜8月）ではドラフト段階。最終許可が出たかは確認できていない。' },
    { h: 'Nucorの$105Mは「鉄塔」', b: 'Nucorの投資は製鋼ではなく、Towers & Structures事業（送電鉄塔・電柱）の拡張。AI DCの電力需要で送電網の工事が増えていることの裏返し。' }
  ],
  sources: [
    { t: 'Steel on the Net', u: 'https://www.steelonthenet.com/news/latest-news.php' },
    { t: 'AIST Steel News', u: 'https://www.aist.org/steel-news' }
  ]
});

/* ================================================================ DATA CENTER */

NEWS.push({
  id: 'nuvacore-raise',
  industry: 'Data Center', type: 'Funding', region: 'US', startup: true,
  company: 'Nuvacore',
  title_en: 'Sequoia-backed Nuvacore, six months old, seeks funding at a ~$2.5B valuation for a data center CPU',
  title_ja: '設立6ヶ月・Sequoia出資のNuvacore、DC向けCPUで評価額約$2.5Bの調達を交渉中',
  amount: '数億ドル', amount_sub: 'val ~$2.5B（交渉中）',
  date: '2026-10-10', posted: '2026-10-14',
  players: 'Sequoia Capital（シードをリード）／創業: Gerard Williams, John Bruno, Ram Srinivasan',
  en: [
    'Nuvacore, a San Jose chip startup backed by Sequoia Capital, is raising hundreds of millions of dollars at a valuation of about $2.5 billion, Reuters reported, citing people {{familiar with the matter|事情に詳しい|Reuters/Bloombergが匿名の情報源を示す定型句。この表現が付いた記事は「公式発表前の観測報道」と読むのが基本。}}.',
    'The company is only about six months old and has no product yet.',
    'It was founded by Gerard Williams, John Bruno and Ram Srinivasan; Williams previously founded Nuvia, which Qualcomm {{acquired|買収した|acquire は M&A の基本動詞。buy より硬く、買収側は acquirer、被買収側は target と呼ぶ。}} for about $1.4 billion in 2021.',
    'Unusually, Nuvacore plans to design the core first and choose an {{instruction set architecture|命令セットアーキテクチャ（ISA）|略してISA。ソフトとハードの境界となる「命令の語彙」。x86はIntel/AMD、ArmはApple/スマホ、RISC-Vはオープンな新興勢力。}} later, so its chip is not {{locked into|〜に縛られた、固定された|抜け出せない状態に固定されること。vendor lock-in（特定ベンダーへの依存）の動詞版で、IT・クラウドの文脈で頻出。}} x86 or Arm.',
    'The round has not closed, and the terms could still change.'
  ],
  ja: [
    'Sequoia Capitalが出資するSan JoseのチップスタートアップNuvacoreが、評価額約$2.5Bで数億ドルを調達しようとしている。事情に詳しい関係者の話としてReutersが報じた。',
    '設立から約6ヶ月で、製品はまだない。',
    '創業者はGerard Williams、John Bruno、Ram Srinivasanの3人。WilliamsはNuviaの創業者で、同社は2021年に約$1.4BでQualcommに買収された。',
    '珍しいのは、先にコアを設計し、命令セット（ISA）は後から選ぶ方針である点。チップがx86にもArmにも縛られない。',
    'ラウンドはまだ確定しておらず、条件は変わる可能性がある。'
  ],
  expr: [
    { en: 'people familiar with the matter', ja: '事情に詳しい関係者', note: 'Reuters/Bloombergの匿名ソース定型句。"according to people with knowledge of the talks" も同じ意味。記事の確度は「関係者筋」レベルと読む。', ex: 'The deal could be announced next week, according to people familiar with the matter.' },
    { en: 'be locked into ~', ja: '〜に縛られる、ロックインされる', note: 'vendor lock-in（特定ベンダーへの依存）の動詞版。', ex: 'Customers don\'t want to be locked into a single cloud.' },
    { en: 'pre-product', ja: '製品前（の段階）', note: '記事中にはないが関連語。pre-revenue（売上前）、pre-seed と並ぶスタートアップ用語。', ex: 'Investors are writing big checks into pre-product companies.' }
  ],
  context: [
    { h: 'Nuviaの系譜', b: 'Gerard WilliamsはAppleでA7〜A12XなどiPhone/iPad用チップの主任設計者を務めたあと、Nuviaを創業。QualcommはNuviaの技術で「Oryon」コアを作った。AppleのSoC設計陣がDCのCPUに来る構図。' },
    { h: 'なぜ今DC向けCPUか', b: 'AIの学習・推論の主役はGPUだが、エージェント型のワークロードではCPU側の処理（オーケストレーションやツール呼び出し）が増える。Nvidia（Grace）、AWS（Graviton）、Google（Axion）も自社CPUを作っている。' },
    { h: '※報道の揺れ', b: 'KuCoinの見出しは「$250M valuation」だが、本文は$2.5B。誤記とみられる。' }
  ],
  sources: [
    { t: 'Reuters via Yahoo Finance', u: 'https://finance.yahoo.com/technology/articles/sequoia-backed-nuvacore-seeks-2-013834219.html' },
    { t: 'Converge Digest', u: 'https://convergedigest.com/?p=109969' }
  ]
});

NEWS.push({
  id: 'veir-series-c',
  industry: 'Data Center', type: 'Funding', region: 'US', startup: true,
  company: 'VEIR',
  title_en: 'VEIR raises $110M Series C to replace copper with superconductors inside AI data centers',
  title_ja: 'VEIR、$110MのSeries Cを調達。AI DCの給電を銅線から超電導へ',
  amount: '$110M', amount_sub: 'Series C／累計 $225M',
  date: '2026-10-08', posted: '2026-10-14',
  players: 'Matter Venture Partners, Tyche Partners（共同リード）／LG Technology Ventures／Gates Frontier／Engine Ventures ほか',
  en: [
    'Massachusetts-based VEIR has closed an {{oversubscribed|応募超過の|募集枠を上回る出資希望が集まった状態。IPOでは「◯倍の応募」と言い、人気の裏付けとしてプレスリリースに必ず書かれる。}} $110 million Series C, bringing its total funding to $225 million.',
    'VEIR builds {{superconducting|超電導の|超電導。ある温度以下で電気抵抗がゼロになる現象で、大電流を発熱も損失もなく流せる。MRIやリニアモーターカーで実用化されている。}} power delivery systems that pair superconducting cables with {{cryogenic|極低温の|一般に-150℃以下の極低温。液体窒素（-196℃）はその代表で、超電導ケーブルの冷却に使われる。}} cooling.',
    'The company argues that reliance on copper-based infrastructure is becoming a {{bottleneck|ボトルネック|瓶の首のように、全体の流れを制限する一番細い部分。AIインフラでは電力・変圧器・冷却が典型的なボトルネックとされる。}} for large AI data center {{deployments|導入・展開|deploy は元は軍事用語の「（部隊を）配備する」。IT・インフラでは本番環境への導入・展開を指す。}}, as power densities climb.',
    '"This financing gives us the resources to move from demonstrating the potential of superconducting power delivery to manufacturing and deploying systems at commercial scale," said CEO Tim Heidel.'
  ],
  ja: [
    'マサチューセッツのVEIRが、応募超過となった$110MのSeries Cをクローズした。累計の調達額は$225Mになる。',
    'VEIRが作るのは、超電導ケーブルと極低温冷却を組み合わせた給電システム。',
    '電力密度が上がるにつれ、銅線ベースのインフラへの依存が、大規模AI DCを展開するうえでのボトルネックになりつつある、というのが同社の主張だ。',
    'CEOのTim Heidelは「この資金で、超電導給電の可能性を実証する段階から、商用規模でシステムを製造・展開する段階へ進める」と述べた。'
  ],
  expr: [
    { en: 'oversubscribed', ja: '応募超過の', note: 'IPOや調達ラウンドで「枠より多く希望が来た」。人気の裏付けとして必ずプレスリリースに書かれる。', ex: 'The IPO was ten times oversubscribed.' },
    { en: 'bring total funding to ~', ja: '累計調達額を〜にする', note: '資金調達記事の定型。bringing its total raised to ~ とも。', ex: 'The round brings total funding to $1.2 billion.' },
    { en: 'move from A to B', ja: 'AからBの段階へ進む', note: 'フェーズの移行を語るCEOコメントの定型（from pilot to production など）。', ex: 'We\'re moving from pilots to full production.' },
    { en: 'at commercial scale', ja: '商用規模で', note: 'deeptechの重要な区切り。lab scale → pilot scale → commercial scale と進む。', ex: 'No one has produced it at commercial scale yet.' }
  ],
  context: [
    { h: '超電導ケーブルの何がうれしいか', b: '同じ電流を流すのに、銅より細く・軽く・発熱しない。ラックあたりの電力が100kWを超えるAI DCでは、銅のバスバーやケーブルの太さ・重さ・発熱そのものが設計上の制約になる。VEIRはもともと送電線向けの技術から始め、DCへ軸足を移した。' },
    { h: '冷却テーマとの接点', b: '超電導を保つには液体窒素などで極低温に冷やす必要がある。DCの「冷却」と「給電」が一体化していく流れの一例。' }
  ],
  sources: [
    { t: 'Business Wire（一次）', u: 'https://www.businesswire.com/news/home/20261008239548/en/VEIR-Raises-$110-Million-Series-C-to-Accelerate-Commercialization-of-Superconducting-Power-Delivery-Technology-for-AI-Data-Centers' },
    { t: 'The Next Web', u: 'https://thenextweb.com/news/veir-110m-series-c-superconducting-power-ai-data-centres' },
    { t: 'Pulse 2.0（投資家）', u: 'https://pulse2.com/veir-raises-110-million-series-c-co-led-by-matter-venture-partners-and-tyche-partners/' }
  ]
});

NEWS.push({
  id: 'emerald-ai-series-a',
  industry: 'Data Center', type: 'Funding', region: 'US', startup: true,
  company: 'Emerald AI',
  title_en: 'Emerald AI becomes a unicorn with a $150M Series A for power-flexible data centers',
  title_ja: 'Emerald AI、$150MのSeries Aでユニコーン入り。電力を柔軟に調整できるDCを目指す',
  amount: '$150M', amount_sub: 'Series A／val $1.05B',
  date: '2026-08-25', posted: '2026-10-14',
  players: 'Energize Capital, DCVC（共同リード）／Nvidia（前ラウンドで出資）',
  en: [
    'Emerald AI has raised a $150 million Series A at a $1.05 billion valuation, {{co-led|共同リード|lead investorは条件（評価額・取締役席）を決める主導役。co-leadは2社以上でその役を分け合うことで、大型・人気ラウンドに多い。}} by Energize Capital and DCVC.',
    'Its software lets data centers {{flex|柔軟に増減させる|本来は「（筋肉を）曲げる」。電力業界では demand flexibility（需要の柔軟性）から、消費を上げ下げすることを flex と言う。}} their power draw when the grid is {{stressed|逼迫した|電力網が限界近くまで使われている状態。grid stress event は需給ひっ迫のこと。人に使えば「ストレスを受けた」の意味。}}, for example by shifting or slowing {{non-urgent|急ぎでない|non- を付けて否定形を作る。AIでは学習や一括(batch)処理が後回しにできる仕事、チャットの応答のような対話は急ぐ仕事とされる。}} AI workloads.',
    'The pitch is that flexible data centers can connect to the grid faster, because utilities do not have to plan for their full {{peak load|ピーク負荷|需要が最大になる瞬間の負荷。送電網はピークに合わせて設備を作るため、ピークを下げられれば同じ設備でより多くの需要を受け入れられる。}} at all times.'
  ],
  ja: [
    'Emerald AIが、評価額$1.05BでSeries A $150Mを調達した。Energize CapitalとDCVCが共同でリードした。',
    '同社のソフトウェアは、送電網が逼迫したときに、急ぎでないAI処理をずらしたり遅くしたりして、DCの消費電力を柔軟に増減させる。',
    '売り文句は、柔軟なDCなら送電網への接続が早くなるという点。電力会社がピーク負荷を常に満額で見込まなくて済むからだ。'
  ],
  expr: [
    { en: 'power draw', ja: '消費電力（電力の引き込み量）', note: 'draw は「引き出す」。power consumption より機器・設備寄りの言い方。', ex: 'Each rack has a power draw of 130 kW.' },
    { en: 'the grid is stressed', ja: '送電網が逼迫している', note: 'grid stress / grid constraints は電力業界の基本語。', ex: 'Utilities issue alerts when the grid is stressed.' },
    { en: 'flex', ja: '柔軟に増減させる', note: 'demand flexibility（需要の柔軟性）から来た動詞用法。"flex up/down" とも言う。', ex: 'Factories can flex their demand during heat waves.' }
  ],
  context: [
    { h: '接続待ち（interconnection queue）問題', b: '米国では新しいDCが送電網につながるまで数年待つ地域がある。ピーク時に消費を下げると約束できれば、電力会社は既存設備のまま受け入れられる。ハードを増やすのではなく、運用で電力制約を解くアプローチ。' },
    { h: '同じ文脈のプレイヤー', b: 'ハード側では蓄電池（Antora Energyは熱電池で$550M調達）、オンサイト発電、原子力PPA（Constellation）などがある。Emeraldはソフトウェアだけで解く点が軽い。' }
  ],
  sources: [
    { t: 'Business Wire（一次）', u: 'https://www.businesswire.com/news/home/20260825127649/en/Emerald-AI-Raises-$150-Million-Series-A-at-$1.05-Billion-Valuation-to-Scale-Power-Flexible-AI-Data-Centers' },
    { t: 'SiliconANGLE', u: 'https://siliconangle.com/2026/08/25/data-center-power-startup-emerald-ai-raises-150m-at-1-05b-valuation/' }
  ]
});

NEWS.push({
  id: 'constellation-nuclear-ppa',
  industry: 'Data Center', type: 'Offtake', region: 'US', startup: false,
  company: 'Constellation × Google / Amazon',
  title_en: 'Constellation signs 20-year nuclear power deals with Google and Amazon, backing ~1.1 GW of expansions',
  title_ja: 'Constellation、GoogleとAmazonの両社と20年の原子力PPAを締結。約1.1GWの増設を支える',
  amount: '~1.1GW', amount_sub: '20-year PPA',
  date: '2026-10-06', posted: '2026-10-14',
  players: 'Constellation Energy／Google／Amazon',
  en: [
    'Constellation has signed 20-year {{power purchase agreements|電力購入契約（PPA）|略してPPA。10〜20年の長期・固定条件で電力を売買する契約。発電所はこれを担保に建設資金を借りられる。}} with Google and Amazon that support almost 1.1 gigawatts of nuclear {{expansions|増設|原子力の文脈では、新しい炉を作るのではなく、既存の炉の出力増強や運転延長を指すことが多い。}}.',
    'The deals give Constellation the long-term {{revenue certainty|収益の確実性|将来の売上の見通しが立つこと。巨額の設備投資をする電力・インフラ業界では、これが借入の可否を左右する。}} it needs to invest in {{uprates|出力増強|原子力の業界語で、既存の原子炉の出力を設備改修で引き上げること。新設より早く安いので、PPAで資金が付きやすい。}} and other capacity additions.',
    'Hyperscalers are increasingly {{locking in|確保する|価格・供給・人材などを先に押さえて確定させる。lock in gains（利益を確定する）は投資の文脈でも使う。}} firm, carbon-free power for AI data centers years in advance.'
  ],
  ja: [
    'ConstellationがGoogleおよびAmazonと20年の電力購入契約（PPA）を結んだ。合わせて約1.1GW分の原子力の増設を支える。',
    'この契約で、Constellationは出力増強などの設備追加に投資するために必要な、長期の収益の確実性を得る。',
    'ハイパースケーラーは、AI DC向けに安定したカーボンフリー電源を、何年も前から押さえる動きを強めている。'
  ],
  expr: [
    { en: 'lock in ~', ja: '〜を（条件ごと）確保する', note: '価格・金利・供給を先に固める。lock in a rate（金利を固定する）。', ex: 'They locked in power prices for 20 years.' },
    { en: 'firm power', ja: '安定電源（出力が保証された電力）', note: '天候で変動する太陽光・風力（intermittent）の対義語。原子力・ガス・地熱など。', ex: 'Data centers need firm power around the clock.' },
    { en: 'uprate', ja: '出力増強', note: '原子力業界の用語。power uprate。', ex: 'The utility filed for a 10% uprate.' }
  ],
  context: [
    { h: '契約の中身', b: 'Amazon（9/30）はCalvert Cliffs原発から690MW（うち新規の出力増強は約190MW、$3B超、2030〜32年稼働）。Google（10/6）は6サイト11基の出力増強で890MW（$4.3B超、2028年から）。合計で約1.08GW。詳しくは解説（Deep Dive）へ。' },
    { h: '原子力×DCの流れ', b: '2024年のMicrosoft×Constellation（Three Mile Island再稼働）以降、既存原発の電力をハイパースケーラーが長期で買う契約が相次いでいる。新設よりも、既存炉の延命・出力増強の方が早いのがポイント。' }
  ],
  sources: [
    { t: 'Mission Critical News Oct 8', u: 'https://missioncriticalconnections.substack.com/p/mission-critical-news-october-8-2026' }
  ]
});

NEWS.push({
  id: 'dc-ballot-backlash',
  industry: 'Data Center', type: 'Policy', region: 'US', startup: false,
  company: 'US local governments',
  title_en: 'Data center backlash heads to the ballot box in dozens of US communities',
  title_ja: 'データセンター反対が投票へ。全米数十の自治体で住民投票',
  amount: '36+', amount_sub: '自治体で住民投票',
  date: '2026-10-12', posted: '2026-10-14',
  players: 'Stateline／Memphis市議会（xAI）',
  en: [
    'Voters in at least three dozen cities, counties and townships will consider {{ballot measures|住民投票にかける案件|ballot は投票用紙。住民が直接賛否を投じる条例案・住民投票案件のことで、米国では選挙のたびに州・郡レベルで多数かけられる。}} in November that could ban data centers in their communities, Stateline reports.',
    'Residents cite rising electricity bills, water use, noise and the {{loss of farmland|農地の喪失|米国のDCは中西部の農地に建つことが多く、地方部での反対の主な理由になっている。}}.',
    'In Memphis, home to xAI\'s data centers, the city council {{postponed|延期した|delay より計画的な「延期」。日程を明確に後ろへずらすニュアンスがある。push back も口語でほぼ同じ意味。}} a vote on a year-long {{moratorium|モラトリアム（一時停止）|一定期間、新規の許可などを凍結すること。借金の返済猶予の意味もある。ラテン語の mora（遅延）が語源。}} despite protests.',
    'The {{backlash|反発|機械の「反動・がた」が原義で、強い反発・揺り戻しを指す。public backlash、political backlash の形が多い。}} is turning local {{permitting|許認可|許認可手続き全体を指す。米国では環境審査（NEPA）を含めて数年かかることもあり、permitting reform は超党派の政策テーマになっている。}} into a real constraint on where AI infrastructure can be built.'
  ],
  ja: [
    '11月、少なくとも30数の市・郡・町で、地域へのデータセンター建設を禁じうる住民投票が行われる。Statelineが報じた。',
    '住民が挙げる理由は、電気料金の上昇、水の使用、騒音、農地の喪失だ。',
    'xAIのDCがあるMemphisでは、抗議が起きるなか、市議会が1年間のモラトリアムの採決を先送りした。',
    'こうした反発で、地元の許認可が、AIインフラをどこに建てられるかを左右する現実の制約になりつつある。'
  ],
  expr: [
    { en: 'three dozen', ja: '36（30数）', note: 'dozen=12。"dozens of" は「数十の」。ニュースではきっちりした数字を避けたいときに使う。', ex: 'Dozens of protesters gathered outside city hall.' },
    { en: 'backlash', ja: '（強い）反発', note: 'against を伴う。public backlash / political backlash。', ex: 'The policy sparked a backlash among farmers.' },
    { en: 'cite ~', ja: '〜を理由として挙げる', note: '「引用する」だけでなく「理由に挙げる」の意味で頻出。', ex: 'The company cited weak demand for the layoffs.' }
  ],
  context: [
    { h: '反対の中身', b: '電気料金・水・騒音・農地という住民の懸念は、その後の報道でも確認できた。Ballotpediaの集計では8州で39件、うち約20件がオハイオ州。' },
    { h: 'AIインフラの3制約＋1', b: 'Power / Cooling / Location の3つの制約に、「Social license（地域の同意）」が4つ目として加わりつつある。日本でも千葉・印西や北海道の誘致で同じ論点が出てくる可能性がある。' }
  ],
  sources: [
    { t: 'Stateline', u: 'https://stateline.org/2026/10/12/data-center-backlash-set-to-sway-midterm-elections/' },
    { t: 'Mission Critical News Oct 12', u: 'https://missioncriticalconnections.substack.com/p/mission-critical-news-october-12' }
  ]
});

NEWS.push({
  id: 'aws-homer-city',
  industry: 'Data Center', type: 'Project', region: 'US', startup: false,
  company: 'AWS / Homer City',
  title_en: 'AWS plans a 36-building campus at the former Homer City coal plant in Pennsylvania',
  title_ja: 'AWS、ペンシルベニアの旧Homer City石炭火力跡地に36棟のキャンパスを計画',
  amount: '36棟', amount_sub: 'Homer City Energy Campus',
  date: '2026-10', posted: '2026-10-14',
  players: 'Amazon Web Services／Homer City Energy Campus',
  en: [
    'AWS is planning a 36-building data center campus in Indiana County, Pennsylvania, at the Homer City Energy Campus — the site of what was once the state\'s largest coal-fired power plant.',
    'The {{redevelopment|再開発|既存の用地を作り直すこと。発電所や工場の跡地（brownfield）は、送電線や用地の許可を引き継げるのが強み。}} pairs new gas-fired generation with data center capacity on the same site, {{sidestepping|回避する|横に一歩よけてかわす。問題や規制をうまく回避するニュアンスで、sidestep the question（質問をはぐらかす）とも言う。}} long waits for grid connections.',
    'Former coal plants are attractive because they already have {{transmission|送電|電力業界では高圧の「送電」を指し、家庭に近い低圧の distribution（配電）と区別する。車ならトランスミッション（変速機）。}} lines, water rights and {{industrial zoning|工業用の用途地域|zoning は用途地域の規制。工業用地として指定済みなら住民合意のハードルが下がり、DCの立地では大きな武器になる。}}.'
  ],
  ja: [
    'AWSが、ペンシルベニア州Indiana CountyのHomer City Energy Campusに、36棟のデータセンターキャンパスを計画している。かつて州最大の石炭火力発電所があった場所だ。',
    'この再開発では、新設のガス火力発電とデータセンターを同じ敷地に置き、送電網への接続を長く待たずに済むようにする。',
    '石炭火力の跡地は、送電線・水利権・工業用の用途地域がすでに揃っている点が魅力になる。'
  ],
  expr: [
    { en: 'sidestep ~', ja: '〜を回避する、かわす', note: 'avoid より「うまくすり抜ける」感じ。sidestep the question（質問をはぐらかす）。', ex: 'On-site power lets developers sidestep grid delays.' },
    { en: 'brownfield', ja: '既存の産業跡地', note: '関連語。更地の新規開発は greenfield。跡地の再利用は brownfield redevelopment。', ex: 'Brownfield sites often come with existing grid connections.' }
  ],
  context: [
    { h: '計画の中身', b: 'AWSは8/28に計画を提出。約1,100エーカーに36棟、建設は2026年12月〜2036年6月。電源は4.5GW級のガス火力（GE Vernovaのタービン7基、約$10B）で、石炭火力（1,884MW）は2023年7月に閉鎖済み。' },
    { h: '「電源ごと立地」モデル', b: '送電網の空きを待つのではなく、発電所の跡地に電源ごと構える。日本でも、旧火力・原発の周辺がDC立地の候補になる論点と地続き。' }
  ],
  sources: [
    { t: 'Mission Critical News Oct 8', u: 'https://missioncriticalconnections.substack.com/p/mission-critical-news-october-8-2026' }
  ]
});

/* ================================================================ ROBOTICS */

NEWS.push({
  id: 'fieldai-700m',
  industry: 'Robotics', type: 'Funding', region: 'US', startup: true,
  company: 'FieldAI',
  title_en: 'FieldAI nears a $700M round at a $10B valuation for its universal robot brain',
  title_ja: 'FieldAI、汎用の「ロボットの脳」で評価額$10B・約$700Mのラウンドが目前に',
  amount: '~$700M', amount_sub: 'val $10B（2025年8月の約5倍）',
  date: '2026-10-07', posted: '2026-10-14',
  players: '前回: Bezos Expeditions, Prysm Capital, Temasek（今回のリードは非公表）',
  en: [
    'FieldAI, which builds software it calls a "universal general-purpose brain" for robots, has signed a {{term sheet|タームシート|出資・M&Aの主要条件をまとめた数ページの書面。法的拘束力はほぼなく、このあとデューデリジェンスを経て本契約に進む。}} to raise about $700 million at a $10 billion valuation, according to reports.',
    'That is roughly five times the $2 billion valuation it {{commanded|（価値・評価を）得た|command は「（価格・敬意などを）当然のものとして得る」。command a premium（プレミアムがつく）の形でよく使う。}} in August 2025, when it raised $405 million from investors including Bezos Expeditions and Temasek.',
    'FieldAI does not make hardware; it licenses its models to run humanoids, robot dogs, drones and industrial {{rovers|探査・作業車両|もとは「放浪者」。火星探査車（Mars rover）のように、不整地を自走する車両を指す。}}.',
    'The company says revenue plus signed contracts exceed $135 million across more than 30 customers.'
  ],
  ja: [
    'ロボット向けに「汎用の脳」と称するソフトを作るFieldAIが、評価額$10Bで約$700Mを調達するタームシートに署名したと報じられた。',
    '2025年8月の評価額約$2Bの約5倍。そのときはBezos ExpeditionsやTemasekなどから$405Mを集めた。',
    'FieldAIはハードを作らない。ヒューマノイド、ロボット犬、ドローン、産業用ローバーを動かすモデルをライセンスで提供する。',
    '売上と契約済み額の合計は、30社超の顧客で$135Mを超えるという。'
  ],
  expr: [
    { en: 'term sheet', ja: 'タームシート（出資条件の概要書）', note: '"signed a term sheet" は確定前。"closed the round" で確定。報道の確度を読むときの重要な区別。', ex: 'They signed a term sheet but the deal fell apart in diligence.' },
    { en: 'command a valuation', ja: '（その）評価額がつく', note: 'command＝（尊敬・価格などを）集める・得る。command a premium（プレミアムがつく）。', ex: 'Top AI startups command sky-high valuations.' },
    { en: 'revenue plus signed contracts', ja: '売上＋契約済み額', note: '認識済みの売上（recognized revenue）ではない点に注意。bookings / backlog / RPO などの用語と一緒に覚える。', ex: 'Its backlog of signed contracts exceeds $1 billion.' }
  ],
  context: [
    { h: 'ロボットの「脳」の3強', b: 'Physical Intelligence（約$11B）、Skild AI（$14B超、SoftBankがリード）、FieldAI（$10B）。どれも機体の形を問わない基盤モデルを狙う。FieldAIは屋外・非構造環境（建設現場・鉱山など）に強いのが出自。' },
    { h: '※報道の揺れ', b: 'タームシート段階とする報道と「クローズ」とする報道がある。$6.47Bと記載するデータベースもある。' }
  ],
  sources: [
    { t: 'Dealroom', u: 'https://dealroom.co/news/158623-fieldai-set-to-raise-700m-at-10b-valuation-for-its-robot-brain/' },
    { t: 'Tekedia', u: 'https://www.tekedia.com/fieldai-raises-700-million-at-10-billion-valuation-as-investors-bet-on-general-purpose-robot-brain/' },
    { t: 'TechCrunch（2025年 $405M）', u: 'https://techcrunch.com/2025/08/20/fieldai-raises-405m-to-build-universal-robot-brains' }
  ]
});

NEWS.push({
  id: 'softbank-rai-institute',
  industry: 'Robotics', type: 'M&A', region: 'JP×US', startup: false,
  company: 'SoftBank × RAI Institute',
  title_en: 'SoftBank agrees to buy Marc Raibert\'s Robotics and AI Institute from Hyundai, pending CFIUS review',
  title_ja: 'SoftBank、Marc RaibertのRobotics and AI InstituteをHyundaiから買収で合意。CFIUSの審査待ち',
  amount: '非公表', amount_sub: 'Hyundaiは設立時に$400M超を拠出',
  date: '2026-09', posted: '2026-10-14',
  players: 'SoftBank Group／Hyundai Motor Group／Marc Raibert（Boston Dynamics創業者）',
  en: [
    'SoftBank has agreed to acquire the Robotics and AI Institute, the research lab founded by Boston Dynamics founder Marc Raibert, from Hyundai Motor Group.',
    'The deal is under review by the {{Committee on Foreign Investment in the United States|対米外国投資委員会（CFIUS）|略してCFIUS（シフィアス）。外国企業による米国企業の買収を、安全保障の観点から審査し、阻止することもできる。日本製鉄のUS Steel買収でも焦点になった。}}, and the price was not {{disclosed|開示された|公式に明らかにする。M&Aの記事は Terms were not disclosed（条件非公表）で締めることが多い。}}.',
    'Hyundai launched the institute in 2022 with more than $400 million to work on robot learning, {{athletic intelligence|身体的知能|RAI Instituteが掲げる研究テーマで、走る・跳ぶ・バランスを取るといった動的な身体能力を指す。Boston Dynamicsのパルクールの系譜。}} and related fields.',
    'The purchase {{adds to|〜に加わる、上積みになる|〜に上積みする、〜をさらに増やす。adds to concerns（懸念を強める）のように、ネガティブな文脈でもよく使う。}} SoftBank\'s growing robotics bets, alongside its planned acquisition of ABB\'s robotics business for roughly $5.4 billion.'
  ],
  ja: [
    'SoftBankが、Boston Dynamics創業者のMarc Raibertが立ち上げた研究所「Robotics and AI Institute」を、Hyundai Motor Groupから買収することで合意した。',
    '取引は対米外国投資委員会（CFIUS）の審査中で、価格は開示されていない。',
    'Hyundaiは2022年に$400M超を投じて同研究所を設立し、ロボット学習や身体的知能などに取り組ませてきた。',
    '今回の買収で、SoftBankのロボットへの賭けがさらに積み上がる。ABBのロボット事業を約$5.4Bで買う計画も進めている。'
  ],
  expr: [
    { en: 'pending ~', ja: '〜待ちで、〜を条件に', note: '前置詞的に使う。pending regulatory approval（規制当局の承認待ち）はM&A記事の定番。', ex: 'The merger is pending shareholder approval.' },
    { en: 'terms were not disclosed', ja: '条件は非公表', note: 'financial terms were not disclosed もよく使う。', ex: 'Financial terms of the deal were not disclosed.' },
    { en: 'add to ~', ja: '〜に上積みする、加わる', note: 'adds to concerns（懸念を強める）など、ネガティブな文脈でも使う。', ex: 'The deal adds to its portfolio of AI bets.' }
  ],
  context: [
    { h: 'Raibertの系譜', b: 'Marc RaibertはMITの教授を経て1992年にBoston Dynamicsを創業（Google→SoftBank→Hyundaiと親会社が変わった）。SoftBankは2017〜2021年にBoston Dynamicsを保有しており、Raibertとは「出戻り」の関係になる。' },
    { h: 'SoftBankのフィジカルAI全張り', b: 'Skild AIのリード（$14B）、ABBロボティクスの買収、そして今回のRAI Institute。基盤モデル（脳）・産業用ロボット（体）・研究所（人材）を縦に揃えにいっている。' },
    { h: '※報道の揺れ', b: '一部のアグリゲーターは$700M・10月と記載しているが、一次報道では価格非公表・合意は9月。' }
  ],
  sources: [
    { t: 'Humanoids Daily', u: 'https://www.humanoidsdaily.com/news/softbank-rai-acquisition-marc-raibert' },
    { t: 'Dealroom（CFIUS）', u: 'https://dealroom.co/news/154603-softbank-to-acquire-robotics-and-ai-institute-deal-under-us-review/' },
    { t: 'Robotics Business News', u: 'https://roboticsbusinessnews.com/report/10/3662/softbank-agrees-to-acquire-robotics-and-ai-institute-founded-by-boston-dynamics-creator.html' }
  ]
});

NEWS.push({
  id: 'mecka-series-b',
  industry: 'Robotics', type: 'Funding', region: 'US', startup: true,
  company: 'Mecka',
  title_en: 'Robot data startup Mecka raises $60M from Sequoia to teach humanoids how humans move',
  title_ja: 'ロボット学習データのMecka、Sequoiaから$60M。人間の動きでヒューマノイドを学習させる',
  amount: '$60M', amount_sub: 'Series B／val ~$500M（報道）',
  date: '2026-10-07', posted: '2026-10-14',
  players: 'Sequoia Capital（リード）／Nvidia／M12（Microsoft）',
  link: '../039_startup_news/261009_mecka_series_b.html',
  en: [
    'Mecka has raised a $60 million Series B led by Sequoia, with Nvidia and Microsoft\'s venture fund M12 participating.',
    'The startup pays people to record themselves doing everyday tasks while wearing body sensors and using smartphones, then turns the footage into motion and hand-pose data for training robots.',
    'It is a bet that human demonstrations, rather than {{teleoperation|遠隔操作|人がロボットを遠隔で操縦し、その操作をデータとして集める方式。品質は高いが、1時間のデータに1時間の人手がかかるので規模が出ない。}}, can supply the {{sheer volume|圧倒的な量|sheer は「純然たる、とてつもない」。量や規模の大きさそのものに圧倒されるニュアンスで、sheer size / sheer luck とも言う。}} of data that robot foundation models need.'
  ],
  ja: [
    'MeckaがSequoiaのリードで$60MのSeries Bを調達した。NvidiaとMicrosoftのVCであるM12も参加した。',
    '人にお金を払い、身体センサーを着けてスマホを使いながら日常の作業を記録してもらう。その映像を、ロボット学習用の動きと手指姿勢のデータに変換する。',
    'ロボットの基盤モデルが必要とする膨大なデータは、遠隔操作ではなく人間のデモでこそ賄える、という賭けだ。'
  ],
  expr: [
    { en: 'sheer volume', ja: '圧倒的な量', note: 'sheer は「純然たる、とてつもない」。sheer size / sheer scale / sheer luck。', ex: 'The sheer volume of data is overwhelming.' },
    { en: 'a bet that ~', ja: '〜という賭け', note: '投資・戦略を「賭け」として語るのは英語ビジネス記事の基本トーン。make a big bet on ~。', ex: 'It\'s a bet that consumers will pay for privacy.' }
  ],
  context: [
    { h: '深掘りページあり', b: '詳細（$100M run rate、Skildとの評価差、integratorへの転換）は startup news の深掘りページへ。' }
  ],
  sources: [
    { t: 'TechCrunch', u: 'https://techcrunch.com/2026/10/07/robot-data-startup-mecka-ai-nabs-60m-from-sequoia/' }
  ]
});

/* ================================================================ COOLING */

NEWS.push({
  id: 'frore-series-d',
  industry: 'Cooling', type: 'Funding', region: 'US', startup: true,
  company: 'Frore Systems',
  title_en: 'Liquid cooling unicorn Frore Systems raises $143M Series D at a $1.6B valuation',
  title_ja: '液冷ユニコーンのFrore Systems、評価額$1.6BでSeries D $143Mを調達',
  amount: '$143M', amount_sub: 'Series D／val $1.6B',
  date: '2026-03', posted: '2026-10-14',
  players: 'MVP Ventures（リード）／Fidelity／Mayfield／Qualcomm Ventures',
  en: [
    'Frore Systems has raised $143 million in a Series D that values the company at $1.6 billion.',
    'The round was led by MVP Ventures, with participation from Fidelity, Mayfield and Qualcomm Ventures.',
    'Frore makes {{cold plates|コールドプレート|GPUに直接密着させる金属板で、内部の細い流路に冷却液を流して熱を奪う。direct-to-chip液冷の中核部品。}} for AI chips, built around technology that grew out of its {{solid-state|半導体（可動部のない）|モーターや回転部品のような機械的な可動部を持たないこと。solid-state battery（全固体電池）、SSD（solid-state drive）と同じ solid-state。}} cooling chips for laptops.',
    'As GPU {{thermal design power|熱設計電力（TDP）|略してTDP。チップが出す熱の設計上の上限。最新のAI GPUは1チップで1,000Wを超え、空冷では追いつかなくなっている。}} rises, air cooling is reaching its limits, pushing operators toward {{direct-to-chip|チップ直接（冷却）|略してDTC/D2C。冷却液をチップ直上まで引き込んで冷やす方式。サーバーごと液体に沈める immersion（液浸）と並ぶ二大液冷方式。}} liquid cooling.'
  ],
  ja: [
    'Frore SystemsがSeries Dで$143Mを調達した。評価額は$1.6B。',
    'MVP Venturesがリードし、Fidelity、Mayfield、Qualcomm Venturesが参加した。',
    'FroreはAIチップ用のコールドプレートを作る。もとはノートPC向けのソリッドステート冷却チップの会社で、その技術から発展した製品だ。',
    'GPUの熱設計電力が上がるにつれ空冷は限界に近づき、事業者はチップを直接冷やす液冷へ向かっている。'
  ],
  expr: [
    { en: 'value the company at ~', ja: '企業価値を〜と評価する', note: '"at a valuation of ~" と並ぶ定番の言い方。valued at ~ の受動態も多い。', ex: 'The deal values the company at $3 billion.' },
    { en: 'grow out of ~', ja: '〜から発展して生まれる', note: '事業の出自を語るときに便利。spin out of（〜からスピンアウトする）とセットで覚える。', ex: 'The product grew out of an internal hackathon.' },
    { en: 'reach its limits', ja: '限界に達する', note: 'hit a wall / hit a ceiling もほぼ同義。', ex: 'Air cooling is reaching its limits at 40 kW per rack.' }
  ],
  context: [
    { h: '冷却方式の階段', b: '空冷（〜20〜40kW/ラック）→ リアドア熱交換 → direct-to-chip（コールドプレート、〜100kW超）→ 液浸（immersion）。NvidiaのGB200/GB300世代でdirect-to-chipが標準になった。' },
    { h: '※補足', b: 'ノートPC用冷却チップ（AirJet）が出自という点と、TDPの話は、一般的な背景として補ったもの。' }
  ],
  sources: [
    { t: 'Data Center Richness', u: 'https://datacenterrichness.substack.com/p/liquid-cooling-unicorn-frore-systems' }
  ]
});

NEWS.push({
  id: 'zutacore-mitsubishi',
  industry: 'Cooling', type: 'Funding', region: 'JP×US', startup: true,
  company: 'ZutaCore',
  title_en: 'ZutaCore raises $100M Series C led by Mitsubishi Electric, Carrier and Samsung for waterless chip cooling',
  title_ja: 'ZutaCore、三菱電機・Carrier・Samsungのリードで$100MのSeries C。水を使わないチップ冷却',
  amount: '$100M', amount_sub: 'Series C／val ~$600M（推定）',
  date: '2026-06-02', posted: '2026-10-14',
  players: 'Mitsubishi Electric／Carrier／Samsung Ventures（共同リード）',
  en: [
    'ZutaCore, an Israeli startup, has raised a $100 million Series C to scale its waterless, {{two-phase|二相式の|phase は相（固体・液体・気体）。冷媒が沸騰して気体になるときの潜熱を使うので、同じ流量で単相よりはるかに多くの熱を運べる。}} direct-to-chip cooling.',
    'The round was led by three {{strategic investors|戦略的投資家|リターンだけでなく自社事業とのシナジーを目的に出資する事業会社。対義語は financial investor（VC・PE）。将来の買収の布石と読まれることも多い。}}: Mitsubishi Electric, Carrier and Samsung Electronics through Samsung Ventures.',
    'Calcalist estimates the company\'s valuation at close to $600 million.',
    'Because its {{dielectric|絶縁性の|電気を通さない絶縁性の。冷却液が漏れてもサーバーがショートしないのが利点で、液浸冷却の液体もこの性質を持つ。}} fluid boils on the chip and never touches water, ZutaCore pitches the system as safer and more water-efficient than conventional liquid cooling.'
  ],
  ja: [
    'イスラエルのスタートアップZutaCoreが、水を使わない二相式direct-to-chip冷却の拡大に向けて、$100MのSeries Cを調達した。',
    'リードは3社の戦略的投資家、三菱電機、Carrier、そしてSamsung Ventures経由のSamsung Electronics。',
    'Calcalistは評価額を$600M近くと推定している。',
    '絶縁性の冷媒がチップ上で沸騰し、水に一切触れないため、従来の液冷より安全で水も節約できるとZutaCoreは売り込む。'
  ],
  expr: [
    { en: 'strategic investor', ja: '戦略的投資家（事業会社）', note: '対義語は financial investor（VC・PEなど財務目的）。strategic が入るとM&Aや提携の布石と読まれる。', ex: 'Having a strategic investor can open doors to distribution.' },
    { en: 'through ~', ja: '〜を通じて（経由で）', note: 'CVC経由の出資を示すときの定番。via ~ も同じ。', ex: 'Google invested through its growth fund, CapitalG.' },
    { en: 'close to ~', ja: '〜近く', note: 'nearly / almost と同義。数字のぼかしに使う。', ex: 'Revenue reached close to $1 billion.' }
  ],
  context: [
    { h: '三菱電機の米国シフト', b: '三菱電機は2026年7月、オハイオ州の自動車部品工場の一部を転用し、米国DC向けの空調・水冷システムを作ると発表した。ZutaCoreへの出資と合わせて、米国のAI DC冷却を本気で取りに行く布陣。' },
    { h: '空調大手 vs 冷却スタートアップ', b: 'Carrier・三菱電機・ダイキン・Vertiv・Schneiderといった空調・電源の大手が、液冷の技術を「出資」か「買収」で取り込む構図。ZutaCoreは出資型、ダイキン（Chilldyne）は買収型。' }
  ],
  sources: [
    { t: 'SiliconANGLE', u: 'https://siliconangle.com/2026/06/02/zutacore-raises-100m-scale-waterless-cooling-ai-data-centers/' },
    { t: 'Calcalist（評価額）', u: 'https://www.calcalistech.com/ctechnews/article/ryzxms2ezx' },
    { t: 'Nikkei Asia（三菱電機 米国生産）', u: 'https://asia.nikkei.com/business/companies/japan-s-mitsubishi-electric-to-make-data-center-cooling-systems-in-us' }
  ]
});

NEWS.push({
  id: 'daikin-chilldyne-ddc',
  industry: 'Cooling', type: 'M&A', region: 'JP×US', startup: true,
  company: 'Daikin × Chilldyne / DDC Solutions',
  title_en: 'Daikin Applied buys two US cooling startups, Chilldyne and DDC Solutions, to build a rack-level cooling platform',
  title_ja: 'ダイキン（Daikin Applied）、米国の冷却スタートアップChilldyneとDDC Solutionsを相次ぎ買収。ラック単位の冷却基盤へ',
  amount: '非公表', amount_sub: '＋ミネソタ研究所 $163M',
  date: '2025-11', posted: '2026-10-14',
  players: 'Daikin Applied（ダイキン工業の米国子会社）／Chilldyne／DDC Solutions',
  en: [
    'Daikin Applied, the US arm of Japan\'s Daikin Industries, has acquired Chilldyne, a maker of direct-to-chip liquid cooling systems whose {{coolant distribution units|冷却液分配ユニット（CDU）|略してCDU。ラックへ冷却液を送り、温まった液の熱を施設側の冷水に渡す中継装置。液冷の心臓部とされる。}} offer up to 300 kW of cooling capacity.',
    'The deal came months after Daikin agreed to buy DDC Solutions, a California company that makes high-density server cabinets and cooling management software.',
    'Terms of neither deal were disclosed.',
    'Daikin is also investing $163 million in a data center R&D lab in Plymouth, Minnesota, expected to open in 2027, as it moves from {{facility-level|施設レベルの|建物全体の単位。DCの冷却は、施設（チラー）→ 部屋（CRAH）→ ラック（CDU）→ チップ（コールドプレート）の階層で考える。}} chillers {{down to|〜まで（踏み込んで）|move down to ~ で「（より細かいレベルまで）踏み込む」。down to the last detail（細部に至るまで）の down to と同じ感覚。}} the rack.'
  ],
  ja: [
    'ダイキン工業の米国子会社Daikin Appliedが、Chilldyneを買収した。Chilldyneはdirect-to-chip液冷システムのメーカーで、同社のCDU（冷却液分配ユニット）は最大300kWの冷却能力を持つ。',
    'その数ヶ月前には、高密度サーバーキャビネットと冷却管理ソフトを作るカリフォルニアのDDC Solutionsの買収でも合意していた。',
    'いずれも条件は非公表。',
    'ダイキンはミネソタ州PlymouthにDC向けの研究所（$163M、2027年開設予定）も建てている。施設レベルのチラーから、ラックの中まで踏み込もうとしている。'
  ],
  expr: [
    { en: 'US arm', ja: '米国部門（子会社）', note: 'arm＝（組織の）部門・腕。the investment arm of ~（〜の投資部門）。', ex: 'Toyota\'s venture arm led the round.' },
    { en: 'months after ~', ja: '〜の数ヶ月後に', note: '時系列でディールを並べる記事の定番。weeks after / days after。', ex: 'The deal came weeks after its IPO.' },
    { en: 'move down to ~', ja: '〜まで（下流へ）踏み込む', note: 'move up/down the stack（技術スタックを上下に広げる）とセットで覚える。', ex: 'The chipmaker is moving up the stack into software.' }
  ],
  context: [
    { h: '空調メーカーが液冷を買う理由', b: 'DCの冷却の付加価値は、建屋全体（チラー・CRAH）からラック内（CDU・コールドプレート）へ移っている。ダイキンは建屋側で強いが、ラック内の技術はゼロから作るより買う方が早い。' },
    { h: '日本勢の比較', b: '出資型＝三菱電機（ZutaCore）、買収型＝ダイキン（Chilldyne/DDC）、自社開発型＝ニデック（2026年9月にCDUのラインナップを発表）、三菱重工（10MW級のチラー）。' }
  ],
  sources: [
    { t: 'DCD（Chilldyne）', u: 'https://www.datacenterdynamics.com/en/news/daikin-acquires-liquid-cooling-firm-chilldyne/' },
    { t: 'PR Newswire（Chilldyne）', u: 'https://www.prnewswire.com/news-releases/daikin-applied-expands-data-center-offering-with-acquisition-of-chilldyne-302603220.html' },
    { t: 'Facilities Dive（DDC）', u: 'https://www.facilitiesdive.com/news/daikin-acquires-tech-for-cooling-data-center-server-racks/757200/' },
    { t: 'TCB（$163M lab）', u: 'https://tcbmag.com/daikin-applied-to-invest-163m-in-lab-amid-data-center-growth/' }
  ]
});

/* ================================================================ ALUMINUM */

NEWS.push({
  id: 'voya-energy',
  industry: 'Aluminum', type: 'Funding', region: 'US', startup: true,
  company: 'Voya Energy',
  title_en: 'Voya Energy raises $35M to turn scrap aluminum into backup power for data centers',
  title_ja: 'Voya Energy、$35Mを調達。スクラップのアルミをDCのバックアップ電源に',
  amount: '$35M', amount_sub: 'リード: Energy Impact Partners',
  date: '2026-08-26', posted: '2026-10-14',
  players: 'Energy Impact Partners（リード）／John Doerr／Founders Fund／Mantis VC／StepStone',
  en: [
    'California startup Voya Energy has raised $35 million to build generators that run on an aluminum-based fuel made from {{scrap|スクラップ、くず|金属くず。工場で出る端材（new scrap）と、使い終わった製品から出る老廃スクラップ（old scrap）に分かれる。}}.',
    'The round was led by Energy Impact Partners and included {{billionaire venture capitalist|億万長者のベンチャーキャピタリスト|billion＝10億で、billionaire は資産10億ドル以上の人。John DoerrはGoogleとAmazonの初期投資家として知られる。}} John Doerr, Founders Fund, Mantis VC and StepStone, Bloomberg reported.',
    'Aluminum stores a lot of energy for its weight; when it reacts with water it releases heat and hydrogen, which can be used to {{generate|発電する|電力業界では「発電する」。power generation（発電）、generator（発電機）、generation capacity（発電容量）とセットで使う。}} electricity without {{combustion|燃焼|燃焼。internal combustion engine（内燃機関、ICE）のcombustionで、EVの対義語としても頻出する。}} emissions at the site.',
    'Voya plans to test its generators at customer sites by the end of 2027, {{positioning|位置づける|position A as B（AをBとして位置づける）。マーケティングのポジショニングと同じ語で、pitch A as B と言い換えられる。}} them as a cleaner alternative to diesel backup for data centers.'
  ],
  ja: [
    'カリフォルニアのスタートアップVoya Energyが$35Mを調達した。スクラップから作るアルミ系燃料で動く発電機を開発する。',
    'Bloombergによると、リードはEnergy Impact Partnersで、億万長者のベンチャーキャピタリストJohn Doerr、Founders Fund、Mantis VC、StepStoneが参加した。',
    'アルミは重さあたりに多くのエネルギーを蓄えている。水と反応させると熱と水素が出るので、現場で燃焼による排出を出さずに発電できる。',
    'Voyaは2027年末までに顧客サイトで発電機を試験する計画。DCのディーゼル非常用電源に代わるクリーンな選択肢として位置づける。'
  ],
  expr: [
    { en: 'run on ~', ja: '〜で動く', note: '燃料・電源を示す。run on diesel / run on batteries / run on caffeine（比喩）。', ex: 'The trucks run on hydrogen.' },
    { en: 'for its weight', ja: '重さのわりに', note: 'for its size / for its age と同じ「〜のわりに」の for。', ex: 'It\'s surprisingly strong for its weight.' },
    { en: 'a cleaner alternative to ~', ja: '〜に代わるクリーンな選択肢', note: 'alternative は to を取る。a cheaper alternative to ~ など。', ex: 'Heat pumps are a cleaner alternative to gas boilers.' }
  ],
  context: [
    { h: 'Founders Fund × John Doerr', b: 'Peter ThielらのFounders Fundと、Kleiner PerkinsのJohn Doerr（Google・Amazonの初期投資家で、気候テックに巨額を張る）が同じラウンドに並ぶ。著名投資家ウォッチの観点で押さえたい案件。' },
    { h: '※補足', b: 'アルミと水の反応で熱と水素が出るという原理は一般論として補ったもの。Voyaの具体的な燃料サイクル（使用後の酸化アルミをどう再生するか）は要確認で、ここが経済性の肝になる。' },
    { h: 'LOOPARTSとの接点', b: 'アルミを「素材として再生する」（LOOPARTS・Sortera）か、「エネルギー媒体として使う」（Voya）か。スクラップアルミの出口が増えるほど、スクラップの価格形成も変わる。' }
  ],
  sources: [
    { t: 'Bloomberg', u: 'https://www.bloomberg.com/news/articles/2026-08-26/startup-bets-on-aluminum-as-cleaner-fuel-to-power-data-centers' },
    { t: 'Yahoo Finance', u: 'https://finance.yahoo.com/energy/articles/startup-bets-aluminum-cleaner-fuel-110000151.html' }
  ]
});

NEWS.push({
  id: 'ega-century-oklahoma',
  industry: 'Aluminum', type: 'Project', region: 'US', startup: false,
  company: 'EGA × Century Aluminum',
  title_en: 'EGA and Century Aluminum team up on the first new US aluminum smelter since 1980',
  title_ja: 'EGAとCentury Aluminum、1980年以来となる米国のアルミ製錬所を共同で新設',
  amount: '750kt/年', amount_sub: 'EGA 60% / Century 40%',
  date: '2026-01-26', posted: '2026-10-14',
  players: 'Emirates Global Aluminium（UAE）／Century Aluminum（Nasdaq: CENX）',
  en: [
    'Emirates Global Aluminium and Century Aluminum have signed a joint development agreement to build a {{primary aluminum|一次アルミ（新地金）|鉱石から作る新地金。製錬に大量の電力（1tあたり約14,000kWh）を使う。リサイクル材（secondary）は、その約5%のエネルギーで作れる。}} {{smelter|製錬所|鉱石から金属を取り出す製錬所。smelt は「溶かして精錬する」。アルミ・銅・亜鉛などの非鉄で使われることが多い。}} in Inola, Oklahoma — the first new one in the US since 1980.',
    'EGA will hold 60% of the {{joint venture|合弁事業|略してJV。複数の企業が出資して作る共同事業会社。持分比率（今回は60/40）で主導権と利益配分が決まる。}} and Century 40%.',
    'At 750,000 tonnes a year, the plant would more than double current US primary aluminum production.',
    'Construction is expected to start in late 2026 or early 2027, {{subject to|〜を条件として|「〜を条件として、〜次第で」。契約・M&A記事の最重要表現の一つで、subject to regulatory approval（当局の承認が条件）が定番。}} engineering work and a power supply agreement with the local utility.'
  ],
  ja: [
    'Emirates Global AluminiumとCentury Aluminumが共同開発契約を結び、オクラホマ州Inolaに一次アルミの製錬所を建設する。米国で新しい製錬所ができるのは1980年以来。',
    '合弁の持分はEGAが60%、Centuryが40%。',
    '年産75万tで、米国の現在の一次アルミ生産を倍以上にする規模。',
    '着工は2026年末か2027年初めの見込み。エンジニアリングの作業と、地元電力会社との電力供給契約が前提条件になる。'
  ],
  expr: [
    { en: 'joint development agreement', ja: '共同開発契約', note: '本契約（definitive agreement）の前段階。JDA。', ex: 'The two firms signed a JDA, with a definitive agreement expected next year.' },
    { en: 'subject to ~', ja: '〜を条件として', note: '契約・M&A記事の最重要表現の一つ。subject to regulatory approval。', ex: 'The deal is subject to customary closing conditions.' },
    { en: 'more than double ~', ja: '〜を倍以上にする', note: 'double は動詞。more than triple / nearly double なども。', ex: 'The new line will more than double capacity.' }
  ],
  context: [
    { h: 'アルミ＝電気の缶詰', b: '一次アルミの製錬（ホール・エルー法）は大量の電気を食い、コストの3〜4割が電力。米国で40年以上新設がなかったのは、電力が高く安定的に確保できなかったから。DCと同じく「電力の取り合い」の当事者になる。' },
    { h: '地元の反発と電力', b: 'Inola市は建設許可の凍結を2027年4月7日まで延長し、住民投票を行うことにした。州司法長官による提訴や、エネルギー省の環境審査をめぐる住民訴訟も起きている。2026年6月末の時点でも、電力会社PSOとの電力契約は結ばれていない。' },
    { h: '※報道の揺れ', b: '着工時期は、Centuryの決算資料では2026年末、9月のEGAインタビューでは2027年初め。発表日にCENXの株価は7.4%下落した（少数持分への後退と受け止められた）。' }
  ],
  sources: [
    { t: 'Metal Packager', u: 'https://metalpackager.com/2026/01/century-aluminum-ega-oklahoma/' },
    { t: 'AL Circle（EGAインタビュー）', u: 'https://www.alcircle.com/news/interview/can-oklahoma-reshape-us-aluminium-supply-egas-ziad-fares-explains-the-project-121131' },
    { t: 'Fintool（株価反応）', u: 'https://fintool.com/news/century-aluminum-ega-oklahoma-smelter' }
  ]
});

NEWS.push({
  id: 'sortera-45m',
  industry: 'Aluminum', type: 'Funding', region: 'JP×US', startup: true,
  company: 'Sortera',
  title_en: 'Sortera raises $45M and opens a second plant to sort mixed aluminum scrap by alloy with AI',
  title_ja: 'Sortera、$45Mを調達しテネシー第2工場を稼働。混合アルミくずをAIで合金ごとに選別',
  amount: '$45M', amount_sub: 'Equity $20M＋Debt $25M（報道）',
  date: '2025-11-20', posted: '2026-10-14',
  players: 'T. Rowe Price, VXI Capital（リード）／三菱商事（前ラウンド）／Yamaha Motor Ventures',
  link: '../039_startup_news/261013_sortera_aluminum.html',
  en: [
    'Indiana-based Sortera has raised $45 million and is opening a second plant in Lebanon, Tennessee, nearly doubling its capacity.',
    'The company uses {{X-ray fluorescence|蛍光X線分析（XRF）|略してXRF。X線を当て、物質が返す蛍光X線のエネルギーから元素の組成を測る。スクラップの合金判別で標準的に使われる技術。}}, optical sensors and AI to sort {{shredded|破砕された|shredder（シュレッダー）で細かく破砕された。廃車は丸ごと破砕され、鉄・非鉄・樹脂に選り分けられる。}} mixed aluminum from scrapped cars into individual {{alloys|合金|合金。アルミは添加元素（Si, Mg, Cuなど）で番手が変わり（6061、380など）、混ざると価値が大きく下がる。}}.',
    'Rather than selling machines, Sortera runs its own plants and earns the {{spread|価格差、スプレッド|2つの価格の差。トレーディングの bid-ask spread と同じ発想で、Sorteraは安い混合スクラップと高い選別済み合金の差で稼ぐ。}} between low-value mixed scrap and high-value sorted alloys.'
  ],
  ja: [
    'インディアナのSorteraが$45Mを調達し、テネシー州Lebanonで第2工場を稼働させる。処理能力はほぼ倍になる。',
    '蛍光X線分析（XRF）、光学センサー、AIを使い、廃車を破砕して出る混合アルミを合金ごとに選別する。',
    'Sorteraは機械を売るのではなく自社で工場を運営し、価値の低い混合スクラップと、価値の高い選別済み合金との価格差で稼ぐ。'
  ],
  expr: [
    { en: 'earn the spread', ja: '価格差（スプレッド）で稼ぐ', note: '金融・商社的な言い方。bid-ask spread / credit spread。', ex: 'Traders earn the spread between buying and selling prices.' },
    { en: 'nearly double', ja: 'ほぼ倍にする', note: 'more than double（倍以上）とのニュアンスの差に注意。', ex: 'The acquisition nearly doubles its customer base.' }
  ],
  context: [
    { h: '深掘りページあり', b: '詳細（調達履歴、三菱商事の参加、関税・圧延工場の新設が追い風になっている構図）は startup news の深掘りページへ。' }
  ],
  sources: [
    { t: 'PR Newswire（一次）', u: 'https://www.prnewswire.com/news-releases/sortera-scales-solution-to-the-mixed-aluminum-problem-with-45-million-in-funding-and-new-tennessee-facility-302620885.html' },
    { t: 'Canary Media', u: 'https://www.canarymedia.com/articles/clean-aluminum/aluminum-recycler-sortera-funding-ai' }
  ]
});

/* ================================================================ COPPER */

NEWS.push({
  id: 'mariana-minerals-series-b',
  industry: 'Copper', type: 'Funding', region: 'US', startup: true,
  company: 'Mariana Minerals',
  title_en: 'Khosla leads $310M round for Mariana Minerals, a two-year-old startup running mines with its own software',
  title_ja: 'Khoslaのリードで$310M。自社ソフトで鉱山を運営する設立2年のMariana Minerals',
  amount: '$310M', amount_sub: 'Series B／val $1.5B',
  date: '2026-08-03', posted: '2026-10-14',
  players: 'Khosla Ventures（リード）／a16z（Fortune報道）',
  en: [
    'Mariana Minerals, a two-year-old startup, has raised a $310 million Series B led by Khosla Ventures, valuing it at $1.5 billion.',
    'The company runs copper and lithium mining and processing operations with its own software, aiming to make them more {{autonomous|自律的な|自律的な。autonomous vehicle（自動運転車）、autonomous mining（無人化された鉱山）のように使い、automated（自動化された）より判断まで任せるニュアンスが強い。}} and cheaper to operate.',
    'Its first site, Copper One in Utah, is restarting a previously {{idled|休止していた|idle（アイドリング）の動詞用法で、「休止させる」。閉山（close）とは違い、市況が戻れば再開できる状態を指す。}} copper mine.',
    'Investors are {{betting|賭けている|bet on ~（〜に賭ける）。英語のビジネス記事は、投資を「賭け」として語るのが基本トーン。make a big bet / hedge one\'s bets（両賭けする）。}} that AI demand — from data centers to power grids — will keep copper in short supply for years.'
  ],
  ja: [
    '設立2年のスタートアップMariana Mineralsが、Khosla VenturesのリードでSeries B $310Mを調達した。評価額は$1.5B。',
    '銅とリチウムの採掘・処理を自社ソフトで運営し、より自律的で低コストにすることを目指す。',
    '最初の現場はユタ州の「Copper One」で、休止していた銅鉱山を再稼働させる。',
    '投資家は、DCから送電網までAIがらみの需要が続き、銅の不足が何年も続くことに賭けている。'
  ],
  expr: [
    { en: 'idled', ja: '休止中の', note: 'idle は動詞で「（工場などを）休止させる」。an idled plant / idle a mine。', ex: 'The company idled two furnaces due to weak demand.' },
    { en: 'in short supply', ja: '不足して', note: 'scarce と同義。be in short supply が定型。', ex: 'Skilled electricians are in short supply.' },
    { en: 'restart', ja: '再稼働させる', note: 'reopen / bring back online も使う。原発なら restart a reactor。', ex: 'They plan to restart the mine next year.' }
  ],
  context: [
    { h: '※補足', b: '「AI需要で銅不足が続くことへの賭け」という一文は、記事の文脈から筆者がまとめたもの。' },
    { h: '銅とAI', b: '銅はDCの配線・変圧器・送電網・モーターに大量に使う。新しい鉱山は発見から生産開始まで15年前後かかるため、休止鉱山の再稼働や回収率の改善が短期の供給源になる。' },
    { h: 'a16z American Dynamism', b: 'a16zは防衛・製造・エネルギーなど米国の産業基盤への投資を「American Dynamism」として括っている。Marianaは鉱山版のAmerican Dynamism案件と読める。' }
  ],
  sources: [
    { t: 'Fortune', u: 'https://fortune.com/2026/08/03/power-ai-khosla-a16z-bet-startup-reinvent-mining-mariana-minerals/' },
    { t: 'The Next Web', u: 'https://thenextweb.com/news/mariana-minerals-310m-series-b-autonomous-critical-minerals' }
  ]
});

NEWS.push({
  id: 'giraffe-bio-seed',
  industry: 'Copper', type: 'Funding', region: 'Global', startup: true,
  company: 'Giraffe Bio',
  title_en: 'Giraffe Bio raises $6.4M seed to boost copper recovery with custom biomolecules',
  title_ja: 'Giraffe Bio、$6.4Mのシード調達。カスタムのバイオ分子で銅の回収率を上げる',
  amount: '$6.4M', amount_sub: 'Seed',
  date: '2026-10-13', posted: '2026-10-14',
  players: 'Orion Industrial Ventures（リード）／BHP Ventures／Twynam／Air Capital',
  en: [
    'Giraffe Bio, based in Argentina and Chile, has raised a $6.4 million seed round led by Orion Industrial Ventures, with BHP Ventures participating.',
    'The startup designs {{mine-specific|鉱山ごとに最適化された|-specific は「〜に特化した、〜固有の」。country-specific、customer-specific のように何にでも付けられる便利な接尾辞。}} biomolecules that raise copper recovery during {{flotation|浮遊選鉱|粉砕した鉱石を水と薬剤に入れて泡立て、目的の鉱物だけを泡に付着させて浮かせる選鉱法。銅の大半はこの工程を経て精鉱になる。}}.',
    'The compounds are produced by {{engineered microbes|遺伝子改変微生物|engineered＝遺伝子を設計・改変した。合成生物学（synthetic biology）の基本語で、engineered yeast（改変酵母）のようにも使う。}} grown in {{bioreactors|バイオリアクター（培養槽）|微生物や細胞を培養するタンク。発酵食品や医薬品（バイオ医薬）の製造で使われるのと同じ設備。}} and can be added to a mine\'s existing process without new equipment.',
    'The company\'s CEO says the molecules can lift recovery by up to five percentage points, while many mines would be happy with an {{uptick|わずかな上昇|小さな上昇。市況記事の頻出語で、対義語は downtick。an uptick in demand / hiring のように使う。}} of just one or two.'
  ],
  ja: [
    'アルゼンチンとチリを拠点とするGiraffe Bioが、Orion Industrial Venturesのリードで$6.4Mのシード調達を行った。BHP Venturesも参加した。',
    '同社は、浮遊選鉱の工程で銅の回収率を上げる、鉱山ごとに最適化したバイオ分子を設計する。',
    'この化合物は、バイオリアクターで培養した遺伝子改変微生物が作る。新しい設備なしで、鉱山の既存プロセスに加えられる。',
    'CEOによれば回収率を最大5ポイント上げられるという。多くの鉱山は1〜2ポイントの改善でも満足するとされる。'
  ],
  expr: [
    { en: 'uptick', ja: 'わずかな上昇', note: '市況記事の頻出語。対義語は downtick。an uptick in demand。', ex: 'There was an uptick in hiring last quarter.' },
    { en: 'drop-in', ja: '既存のものにそのまま差し込める', note: '記事中にはないが関連語。drop-in replacement（そのまま置き換え可能な代替品）は素材・燃料系スタートアップの定番の売り文句。', ex: 'It\'s a drop-in replacement for diesel.' }
  ],
  context: [
    { h: '※補足', b: '「最大+5ポイント」はCEOの発言で、試験した鉱山名や結果はまだ公開されていない。金額への換算は解説（Deep Dive）のQ&Aに試算として載せている。' },
    { h: 'BHPの張り方', b: 'BHP Venturesは、Electra（鉄）、Cuprum Metals（銅の浸出）、Giraffe Bio（銅の選鉱）と、上流の素材スタートアップに幅広く出資している。世界最大の鉱山会社が「回収率の改善」に張っているのは、新しい鉱山を開くより早く安いからだ。' }
  ],
  sources: [
    { t: 'TechCrunch', u: 'https://techcrunch.com/2026/10/13/giraffe-bio-aims-its-bespoke-biomolecules-at-the-looming-copper-shortage' },
    { t: 'GlobeNewswire via Manila Times', u: 'https://manilatimes.net/2026/10/13/tmt-newswire/globenewswire/giraffe-bio-raises-64m-seed-to-scale-next-generation-reagents-for-copper-mining/2444823' }
  ]
});

NEWS.push({
  id: 'cuprum-metals-series-a',
  industry: 'Copper', type: 'Funding', region: 'US', startup: true,
  company: 'Cuprum Metals',
  title_en: 'Cuprum Metals raises $19.4M Series A for a water-based copper leaching process that can use seawater',
  title_ja: 'Cuprum Metals、$19.4MのSeries A。海水も使える水系の銅浸出プロセス',
  amount: '$19.4M', amount_sub: 'Series A／累計 ~$22M',
  date: '2026-06', posted: '2026-10-14',
  players: 'Lundin Family Office（リード）／Woodline Partners／BHP Ventures',
  en: [
    'Cuprum Metals has raised a $19.4 million Series A led by the Lundin Family Office, with support from Woodline Partners and BHP Ventures.',
    'Its water-based chemical {{leach|浸出|薬液で鉱石から金属を溶かし出す浸出。heap leaching（鉱石を野積みして薬液を散布する方式）は、低品位の銅鉱石で広く使われる。}} can extract copper from ores that conventional methods struggle with, and can even run on seawater.',
    'That matters in {{arid|乾燥した|雨がほとんど降らない乾燥した土地。チリのアタカマ砂漠は世界最大の銅産地で、水の確保が鉱山運営の大きな論点になっている。}} mining regions such as Chile, where {{freshwater|淡水|海水(seawater)に対する淡水。鉱山・半導体工場・DCは、どれも淡水の大口消費者として地域と利害がぶつかりやすい。}} is scarce and politically sensitive.'
  ],
  ja: [
    'Cuprum Metalsが、Lundin Family OfficeのリードでSeries A $19.4Mを調達した。Woodline PartnersとBHP Venturesも支援した。',
    '同社の水系の化学浸出は、従来法が苦手とする鉱石からも銅を取り出せ、海水でも動かせる。',
    '淡水が乏しく、政治的にも敏感なチリのような乾燥した鉱山地域では、これが大きな意味を持つ。'
  ],
  expr: [
    { en: 'struggle with ~', ja: '〜に苦戦する、うまく扱えない', note: '人だけでなく方法・技術が主語にもなる。', ex: 'Older models struggle with long documents.' },
    { en: 'politically sensitive', ja: '政治的に敏感な', note: 'sensitive は「扱いに注意が要る」。commercially sensitive（商業上の機密）。', ex: 'Water rights are politically sensitive in the region.' }
  ],
  context: [
    { h: '※補足', b: '「従来法が苦手な鉱石」「チリの水問題」は、浸出技術の一般的な意義として補ったもの。' },
    { h: 'Lundin一族', b: 'スウェーデン系の資源財閥。Lundin Mining（銅）などを率いる。鉱山を本業とするファミリーオフィスがリードした点が、技術の目利きとしてのシグナルになる。' }
  ],
  sources: [
    { t: 'PR Newswire（一次）', u: 'https://www.prnewswire.com/news-releases/cuprum-metals-raises-19-4m-series-a-to-accelerate-copper-extraction-technology-302804344.html' },
    { t: 'Pulse 2.0', u: 'https://pulse2.com/cuprum-metals-raises-19-4-million-to-scale-copper-extraction-technology/' }
  ]
});

/* ================================================================ ENERGY */

NEWS.push({
  id: 'type-one-series-b',
  industry: 'Energy', type: 'Funding', region: 'US', startup: true,
  company: 'Type One Energy',
  title_en: 'Fusion startup Type One Energy raises $200M Series B to build a stellarator power plant at TVA\'s Bull Run site',
  title_ja: '核融合のType One Energy、$200MのSeries Bを調達。TVAのBull Run跡地にステラレーター型の発電所を建設へ',
  amount: '$200M', amount_sub: 'Series B／累計 ~$400M（報道・補助金等込みとみられる）',
  date: '2026-10-06', posted: '2026-10-14',
  players: 'Breakthrough Energy Ventures, Clutterbuck Capital（共同リード）／Lowercarbon Capital／Siemens Energy Ventures／TVA',
  en: [
    'Knoxville-based fusion company Type One Energy has raised a $200 million Series B, {{co-led|共同リード|lead investorは条件（評価額・取締役席）を決める主導役。co-leadは2社以上でその役を分け合うことで、大型・人気ラウンドに多い。}} by Breakthrough Energy Ventures and Clutterbuck Capital.',
    'New investors include Lowercarbon Capital and Siemens Energy Ventures, bringing the company\'s total funding to about $400 million.',
    'The money will fund Project Infinity at the Tennessee Valley Authority\'s former Bull Run coal plant, where Type One plans an engineering prototype followed by a commercial {{stellarator|ステラレーター|ねじれた磁場コイルでプラズマを閉じ込める核融合炉の方式。トカマクより設計は難しいが、連続運転に向くとされる。}} power plant.',
    'The round follows the company\'s receipt of an initial operating {{license|許認可|米国では核融合は原子炉(fission)と別枠で、州レベルの放射性物質規制の枠組みで扱う方針になっている。}} from the State of Tennessee.',
    'TVA, the largest public power {{utility|電力会社|発電・送配電を担う事業者。TVAは連邦政府が所有する公社で、米国最大の公営電力会社。}} in the US, has agreed to work with Type One on the plant, which targets deployment by the mid-2030s.'
  ],
  ja: [
    'Knoxvilleの核融合企業Type One Energyが、$200MのSeries Bを調達した。Breakthrough Energy VenturesとClutterbuck Capitalが共同でリードした。',
    'Lowercarbon CapitalとSiemens Energy Venturesが新たに加わり、累計の調達額は約$400Mになった。',
    '資金は、テネシー川流域開発公社（TVA）の旧Bull Run石炭火力跡地で進めるProject Infinityに充てる。まず工学的な試作機を作り、その後ステラレーター型の商用発電所を建てる計画だ。',
    '今回の調達は、テネシー州から最初の運転許可を得たのに続くもの。',
    '米国最大の公営電力会社であるTVAが発電所の建設で協力することに合意しており、2030年代半ばの稼働を目指す。'
  ],
  expr: [
    { en: 'follow ~', ja: '〜に続く（〜を受けて）', note: '"The round follows ~" は「この調達は〜に続くものだ」という因果・時系列の定型。comes on the heels of ~ も同義で、より勢いのある言い方。', ex: 'The announcement follows months of speculation.' },
    { en: 'bring total funding to ~', ja: '累計調達額を〜にする', note: '資金調達記事の定型。bringing its total raised to ~ とも。', ex: 'The round brings total funding to $400 million.' },
    { en: 'target ~ by ~', ja: '〜までに〜を目指す', note: 'aim for より報道的。targets deployment by the mid-2030s のように、目標の時期とセットで使う。', ex: 'The company targets first power by 2030.' },
    { en: 'mid-2030s', ja: '2030年代半ば', note: 'early- / mid- / late- + 年代で、ざっくりした時期を言う。具体的な年を約束していないことに注意。', ex: 'Commercial fusion is unlikely before the late 2030s.' }
  ],
  context: [
    { h: 'Breakthrough Energy × Lowercarbon', b: 'Breakthrough Energy VenturesはBill Gatesが率いる気候テックファンド。Lowercarbon CapitalはChris Sacca（Twitter・Uberの初期投資家）のファンド。著名投資家が核融合に張っている例。' },
    { h: 'トカマク vs ステラレーター', b: '最大手のCommonwealth Fusion Systems（CFS）はトカマク型で、三菱商事・三井物産・NTT・関西電力・JERAなど日本企業12社が出資している。Type Oneはステラレーター型。ねじれたコイルの製造は難しいが、プラズマが安定しやすく連続運転に向く。' },
    { h: '※報道の揺れ', b: '発電所の出力は、会社発表では400MWe、2025年のTVAとの合意では350MWe。「2034年」の目標年を書いた見出しもあるが、裏が取れたのは「2030年代半ば」まで。' },
    { h: 'また石炭火力跡地', b: 'AWSのHomer Cityと同じく、旧石炭火力の跡地（送電線・用地・許認可を引き継げる）が次世代の電源の立地になっている。' }
  ],
  sources: [
    { t: 'TechCrunch', u: 'https://techcrunch.com/2026/10/06/type-one-energy-raised-200m-to-build-a-fusion-power-plant-by-2034/' },
    { t: 'ESG Today', u: 'https://esgtoday.com/type-one-raises-200-million-to-build-first-ever-commercial-fusion-energy-plant' },
    { t: 'Neutron Bytes（TVA 350MW）', u: 'https://neutronbytes.com/2025/09/20/tva-and-type-one-energy-to-build-350-mw-fusion-plant/' }
  ]
});

NEWS.push({
  id: 'quaise-jera-series-b',
  industry: 'Energy', type: 'Funding', region: 'JP×US', startup: true,
  company: 'Quaise Energy × JERA / Idemitsu',
  title_en: 'Superhot geothermal startup Quaise raises a Series B with strategic backing from JERA and Idemitsu',
  title_ja: '超高温地熱のQuaise、Series Bを調達。JERAと出光が戦略出資',
  amount: '$134M', amount_sub: 'Series B 1st close → 最終 $180M',
  date: '2026-07-07', posted: '2026-10-14',
  players: 'Prelude Ventures（リード）／JERA Ventures／Idemitsu（出光興産）／Nabors Industries（報道）',
  en: [
    'Quaise Energy, a Houston-based MIT spinout, has raised $134 million in the first close of its Series B, led by Prelude Ventures with {{strategic investments|戦略出資|リターンだけでなく自社事業とのシナジーを目的にした事業会社の出資。JERAは発電、出光は掘削・資源の知見を持つ。}} from Japan\'s JERA and Idemitsu.',
    'Quaise is developing {{millimeter-wave drilling|ミリ波掘削|ドリルの刃で岩を削るのではなく、核融合研究由来の大出力ミリ波で岩を溶かし蒸発させて掘る。深く硬い岩盤ほど有利とされる。}} to reach {{superhot|超高温の|地熱業界では概ね374℃（水の臨界点）以上を指す。超臨界水は通常の地熱より桁違いに多くのエネルギーを運ぶ。}} rock at 300 to 500 degrees Celsius, far deeper than conventional geothermal wells.',
    'The funding supports Project Obsidian in Oregon, which Quaise calls the world\'s first commercial superhot geothermal plant; its first 50-megawatt phase could come online as early as 2030.',
    'JERA, Japan\'s largest power generator, invested through its corporate venture arm, JERA Ventures.'
  ],
  ja: [
    'MIT発でHoustonに拠点を置くQuaise Energyが、Series Bの1次クローズで$134Mを調達した。リードはPrelude Venturesで、日本のJERAと出光が戦略出資した。',
    'Quaiseが開発するのはミリ波掘削で、通常の地熱井よりはるかに深い、300〜500℃の超高温の岩盤まで掘ることを目指す。',
    '資金は、オレゴン州のProject Obsidianに充てる。Quaiseが「世界初の商用の超高温地熱発電所」と呼ぶ案件で、第1期の50MWは早ければ2030年に稼働する。',
    '日本最大の発電会社JERAは、CVCのJERA Venturesを通じて出資した。'
  ],
  expr: [
    { en: 'first close', ja: '1次クローズ', note: '大型ラウンドは何回かに分けて締める。first close で一部が着金し、final close で全額が確定する。報道で金額が割れる原因になりやすい。', ex: 'The fund held a first close at $300 million.' },
    { en: 'come online', ja: '稼働を始める', note: '発電所・データセンター・設備が「動き出す」。bring ~ online（〜を稼働させる）、go offline（停止する）。', ex: 'The new reactor is expected to come online in 2029.' },
    { en: 'as early as ~', ja: '早ければ〜に', note: '最速のシナリオであることを示す。as soon as とほぼ同じだが、時期の見込みを報じるときはこちらが定番。', ex: 'A decision could come as early as next week.' }
  ],
  context: [
    { h: '次世代地熱の2つの流派', b: '①Fervo型：シェール掘削の技術（水平掘り・水圧破砕）で人工的に貯留層を作るEGS。②Quaise型：超深く掘って超高温の岩盤から熱を取る。②は当たれば出力が桁違いだが、技術リスクは大きい。' },
    { h: '日本勢が地熱に張る理由', b: '日本は地熱資源量で世界3位だが、国立公園規制や温泉事業者との調整で開発が進まなかった。米国で技術を獲得して国内へ持ち帰る、という読みができる。JERAはCFS（核融合）にも出資している。' },
    { h: '※報道の揺れ', b: '7月の1次クローズは$134M（累計$230M）。その後、掘削大手Nabors Industriesの$35Mを含めて$180Mで最終クローズした（累計$280M、複数ソースで確認）。' }
  ],
  sources: [
    { t: 'Energy Global（1st close）', u: 'https://www.energyglobal.com/other-renewables/10072026/quaise-energy-raises-us134-million-in-first-close-of-series-b/' },
    { t: 'Insurance Edge（JERA）', u: 'https://insurance-edge.net/2026/07/14/jera-invests-in-us-based-geothermal-energy-company/' },
    { t: 'Runtime Wire（$180M final）', u: 'https://runtimewire.com/article/quaise-energy-180m-series-b-nabors-geothermal' }
  ]
});

NEWS.push({
  id: 'fervo-series-e-mitsui',
  industry: 'Energy', type: 'Funding', region: 'JP×US', startup: true,
  company: 'Fervo Energy × Mitsui / MHI / Google',
  title_en: 'Fervo Energy raises $462M with Google, Mitsui and Mitsubishi Heavy Industries to scale next-generation geothermal',
  title_ja: 'Fervo Energy、Google・三井物産・三菱重工から$462Mを調達。次世代地熱を拡大',
  amount: '$462M', amount_sub: 'Series E＋$421M project debt（2026/3）',
  date: '2025-12-10', posted: '2026-10-14',
  players: 'Google／Mitsui & Co.（三井物産）／Mitsubishi Heavy Industries（三菱重工）／Sumitomo Mitsui Trust Bank（融資）',
  en: [
    'Fervo Energy has raised $462 million in a Series E, with Google, Mitsui & Co. and Mitsubishi Heavy Industries among the new investors.',
    'Fervo adapts {{horizontal drilling|水平掘削|垂直に掘ったあと横に曲げて掘り進める技術。シェール革命を起こした手法で、Fervoはこれを地熱に持ち込んだ。}} and other techniques from the shale industry to create {{enhanced geothermal systems|強化地熱システム（EGS）|天然の熱水がない高温の岩盤に人工的に割れ目と水の通り道を作り、熱を取り出す方式。}} in hot rock that lacks natural reservoirs.',
    'The money will help complete Cape Station in Utah, a 500-megawatt project, while starting development on several others.',
    'In March 2026, Fervo also closed $421 million in {{non-recourse|ノンリコース（非遡及型）の|返済原資をそのプロジェクトの収益だけに限定する融資。親会社に請求が及ばないので、プロジェクトの事業性そのものが評価されたことを意味する。}} project financing for the first phase of Cape Station.'
  ],
  ja: [
    'Fervo EnergyがSeries Eで$462Mを調達した。新たな投資家にGoogle、三井物産、三菱重工が入った。',
    'Fervoは水平掘削などシェール業界の技術を応用し、天然の貯留層がない高温の岩盤に強化地熱システム（EGS）を作る。',
    '資金は、ユタ州の500MW案件Cape Stationの完成に充てつつ、ほかの複数案件の開発にも着手する。',
    'Fervoは2026年3月、Cape Station第1期向けに$421Mのノンリコースのプロジェクトファイナンスも組成した。'
  ],
  expr: [
    { en: 'among ~', ja: '〜の中に（含まれて）', note: '"with A, B and C among the new investors" で「新たな投資家にはA・B・Cが含まれる」。全員を列挙していないことを示す便利な形。', ex: 'Toyota was among the backers.' },
    { en: 'adapt A from B', ja: 'Bの技術をAに応用する', note: 'adapt は「（別の用途に）合わせて作り変える」。adopt（採用する）と混同しやすいので注意。', ex: 'They adapted techniques from the oil and gas industry.' },
    { en: 'project financing', ja: 'プロジェクトファイナンス', note: '会社の信用ではなく、個別プロジェクトの将来キャッシュフローを返済原資にする融資。発電所・インフラの標準的な資金調達法。', ex: 'The solar farm was funded through project financing.' }
  ],
  context: [
    { h: 'Googleとの電力契約', b: 'FervoはGoogleと396MWのPPAを結んでいて、2030年6月までに約1GWまで拡大するオプションがある。地熱は天候に左右されないfirm powerなので、DCとの相性がいい。' },
    { h: '三井グループの多層的な関与', b: '三井物産が株式出資、三井住友信託銀行（NY支店）がプロジェクト融資に参加している。三菱重工はタービンなどの機器面での関与が見込まれる。日本の商社・重工・銀行がそろって米国の地熱に入っている構図。' },
    { h: '※補足', b: '三井物産の出資額は非公表。三菱重工の役割（機器供給など）は筆者の読み。' }
  ],
  sources: [
    { t: 'TechCrunch', u: 'https://techcrunch.com/2025/12/10/google-invests-in-fervos-462m-round-to-unlock-even-more-geothermal-energy' },
    { t: 'Business Wire（$421M project financing）', u: 'https://www.businesswire.com/news/home/20260319005742/en/Fervo-Energy-Secures-$421-Million-in-Non-Recourse-Project-Financing-for-Cape-Station' },
    { t: 'Nikkei Asia（三井物産）', u: 'https://asia.nikkei.com/business/energy/mitsui-co.-to-invest-in-us-geothermal-startup-eyeing-data-center-power' },
    { t: 'Renewable Energy World（Google PPA）', u: 'https://www.renewableenergyworld.com/energy-business/new-project-development/fervo-energy-and-google-ink-largest-ever-geothermal-ppa-to-power-data-centers/' }
  ]
});

NEWS.push({
  id: 'bwrx300-japan-us',
  industry: 'Energy', type: 'Project', region: 'JP×US', startup: false,
  company: 'GE Vernova Hitachi × Japan-US deal',
  title_en: 'GE Vernova Hitachi SMRs to be deployed in Tennessee and Alabama under the $550B Japan-US investment deal',
  title_ja: '日米の$550B投資合意の一環で、GE Vernova日立のSMRをテネシー・アラバマに建設へ',
  amount: '最大 $40B', amount_sub: 'BWRX-300（300MWe級）',
  date: '2026-03-25', posted: '2026-10-14',
  players: 'GE Vernova Hitachi Nuclear Energy／US Department of Commerce／日本政府（$550B投資枠）',
  en: [
    'The US Commerce Department has announced a deal under which GE Vernova Hitachi will deploy its BWRX-300 {{small modular reactors|小型モジュール炉（SMR）|出力300MW前後以下の小型原子炉。工場でモジュールを作って現地で組み立てるため、工期とコストの削減が期待される。}} at sites in Tennessee and Alabama.',
    'The projects, valued at up to $40 billion, are part of the $550 billion Japan-US trade and investment {{agreement|合意|2025年の日米関税交渉の合意。日本が米国に$550Bを投資する枠組みで、案件は米国側が選ぶ。}}.',
    'The BWRX-300 is a 300-megawatt {{boiling water reactor|沸騰水型原子炉（BWR）|炉心で水を沸騰させ、その蒸気で直接タービンを回す方式。日本では東京電力・中部電力などが採用している。}} designed by the joint venture of GE Vernova and Japan\'s Hitachi.',
    'The deal signals that Japanese capital is being {{channeled|振り向けられる|channel＝水路。資金や努力を特定の方向に流し込むこと。}} into US nuclear power to meet rising electricity demand from AI data centers.'
  ],
  ja: [
    '米商務省が、GE Vernova日立がBWRX-300という小型モジュール炉（SMR）をテネシー州とアラバマ州の用地に建設する案件を発表した。',
    '総額は最大$40Bで、日米の$550Bの通商・投資合意の一部になる。',
    'BWRX-300は出力300MWの沸騰水型原子炉で、GE Vernovaと日本の日立の合弁が設計した。',
    'AIデータセンターによる電力需要の増加に応えるため、日本の資金が米国の原子力に振り向けられていることを示す案件だ。'
  ],
  expr: [
    { en: 'under which ~', ja: 'その下で〜する（〜という内容の）', note: '"a deal under which A will do B" は契約・合意の中身を説明する定型。関係代名詞の前に前置詞が来る形に慣れておくと、契約書も読みやすくなる。', ex: 'They signed an agreement under which the city will buy the power.' },
    { en: 'valued at ~', ja: '〜と評価される、総額〜の', note: '案件規模・企業価値の両方に使う。up to を付けると上限額。', ex: 'The contract is valued at up to $2 billion.' },
    { en: 'signal that ~', ja: '〜ということを示す', note: 'show より「兆し・シグナルを送る」ニュアンス。市場や政策の意図を読む記事で頻出。', ex: 'The rate cut signals that the Fed is worried about growth.' }
  ],
  context: [
    { h: '日米$550B投資の中身', b: '2025年の関税交渉で、日本は米国への$550Bの投資枠に合意した。案件は米国側が選び、エネルギー・半導体・重要鉱物などが対象。SMRと原子力に10兆円規模が向かうという報道もある。' },
    { h: 'BWRX-300の位置づけ', b: 'カナダ・オンタリオ州（OPG）で北米初の建設が進んでいて、TVAも導入を検討している。日立は、GEとの合弁を通じて原子炉の設計そのものに関与している。' },
    { h: '※補足', b: '「AI DCの電力需要に応えるため」という位置づけは、報道の文脈から筆者がまとめたもの。NuScaleへの約$25Bの日本出資という報道もあるが、未確認。' }
  ],
  sources: [
    { t: 'ANS Nuclear Newswire', u: 'https://www.ans.org/news/2026-03-25/article-7878/new-us-bwrx300-projects-get-japanese-investment/' },
    { t: 'Nuclear Engineering International', u: 'https://www.neimagazine.com/news/us-japan-in-smr-deal/' },
    { t: 'Seoul Economic Daily（第3弾・SMR）', u: 'https://en.sedaily.com/international/2026/06/12/japans-third-us-investment-targets-smrs-with-over-10' }
  ]
});

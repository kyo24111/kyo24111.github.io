/* ==========================================================================
   統合 Term DB ── 全ページの Terms タブとルー大柴表示の正本
   1行 = 1用語。
     id     : 一意キー（英語のslug）。✓の保存キーになるので後から変えない
     en     : 英語（known になると本文がこれに置き換わる）
     ja     : 日本語（本文中で探す語）
     alt    : 日本語の別表記（任意）。本文中でこれも探す
     field  : 大分類  science / industry / market / finance / law / general
     sub    : 小分類  chemistry / physics / metals / energy / battery ... 自由
     def    : 英語の短い定義（英英）
     note   : 日本語の補足（任意）
     src    : 初出ページ（リポジトリルートからの相対パス）
     known  : Kyo が理解済み = true（Export を貼ってもらったら更新する）
     added  : 追加日
   ※ 本文マッチは「長い語が優先」。短い語（銅）より長い語（青銅）を先に拾う
   ========================================================================== */
window.TERMS = [
  // ---------- industry / metals ----------
  { id:"base-metal", en:"base metal", ja:"ベースメタル", field:"industry", sub:"metals", def:"A common, non-precious metal that oxidizes or corrodes relatively easily, such as copper or zinc.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"non-ferrous-metal", en:"non-ferrous metal", ja:"非鉄金属", field:"industry", sub:"metals", def:"Any metal that does not contain significant amounts of iron.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"precious-metal", en:"precious metal", ja:"貴金属", field:"industry", sub:"metals", def:"A rare, high-value metal that resists corrosion, such as gold, silver or platinum.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"rare-metal", en:"rare metal", ja:"レアメタル", alt:["マイナーメタル"], field:"industry", sub:"metals", def:"A metal produced in small volumes but critical for high-tech uses, such as lithium or cobalt.", note:"和製英語寄り。英語では minor metal / critical mineral が普通", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"rare-earth", en:"rare earth", ja:"レアアース", field:"industry", sub:"metals", def:"A group of 17 elements, mainly the lanthanides, used in magnets and electronics.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"metal", en:"metal", ja:"金属", field:"science", sub:"chemistry", def:"A solid material that is typically shiny, conducts electricity and heat, and can be shaped.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"copper", en:"copper", ja:"銅", field:"industry", sub:"metals", def:"A reddish metal (Cu) that conducts electricity extremely well.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"aluminium", en:"aluminium", ja:"アルミ", alt:["アルミニウム"], field:"industry", sub:"metals", def:"A light, silvery metal (Al) that resists corrosion. Spelled 'aluminum' in the US.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"zinc", en:"zinc", ja:"亜鉛", field:"industry", sub:"metals", def:"A bluish-white metal (Zn) mainly used to coat steel against rust.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"nickel", en:"nickel", ja:"ニッケル", field:"industry", sub:"metals", def:"A hard, silvery metal (Ni) used in stainless steel and batteries.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"lead", en:"lead", ja:"鉛", field:"industry", sub:"metals", def:"A heavy, soft metal (Pb), used mainly in car batteries. Pronounced /led/.", note:"動詞の lead（/liːd/）と発音が違う", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"tin", en:"tin", ja:"錫", field:"industry", sub:"metals", def:"A soft, silvery metal (Sn) with a low melting point, used in solder.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"silver", en:"silver", ja:"銀", field:"industry", sub:"metals", def:"A precious metal (Ag) and the best electrical conductor of all metals.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"iron", en:"iron", ja:"鉄", field:"industry", sub:"metals", def:"A strong, common metal (Fe); the main ingredient of steel.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"steel", en:"steel", ja:"鉄鋼", alt:["鋼材"], field:"industry", sub:"metals", def:"An alloy of iron and a small amount of carbon, stronger than pure iron.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"stainless-steel", en:"stainless steel", ja:"ステンレス", alt:["ステンレス鋼"], field:"industry", sub:"metals", def:"Steel mixed with chromium (and often nickel) so that it does not rust.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"alloy", en:"alloy", ja:"合金", field:"industry", sub:"metals", def:"A metal made by mixing two or more elements.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"superalloy", en:"superalloy", ja:"超合金", field:"industry", sub:"metals", def:"A high-performance alloy that stays strong at very high temperatures, used in jet engines.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"brass", en:"brass", ja:"真鍮", alt:["黄銅"], field:"industry", sub:"metals", def:"An alloy of copper and zinc.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"bronze", en:"bronze", ja:"青銅", field:"industry", sub:"metals", def:"An alloy of copper and tin.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"solder", en:"solder", ja:"はんだ", field:"industry", sub:"metals", def:"A low-melting alloy used to join electronic parts together.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"tinplate", en:"tinplate", ja:"ブリキ", field:"industry", sub:"metals", def:"Thin steel sheet coated with tin, used for food cans.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"galvanized-steel", en:"galvanized steel", ja:"トタン", field:"industry", sub:"metals", def:"Steel sheet coated with zinc to protect it from rust.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"plating", en:"plating", ja:"メッキ", field:"industry", sub:"metals", def:"Covering a metal surface with a thin layer of another metal.", note:"亜鉛メッキは galvanizing", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"die-casting", en:"die casting", ja:"ダイカスト", field:"industry", sub:"metals", def:"Forcing molten metal into a steel mold under high pressure to make parts.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"primary-aluminium", en:"primary aluminium", ja:"一次地金", alt:["一次アルミ"], field:"industry", sub:"metals", def:"Aluminium made from ore, as opposed to recycled (secondary) aluminium.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"refining", en:"refining", ja:"精錬", field:"industry", sub:"metals", def:"Removing impurities to produce a pure metal.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"radiation-shielding", en:"radiation shielding", ja:"放射線遮蔽", alt:["放射線を遮る"], field:"science", sub:"physics", def:"Using dense material to block X-rays or gamma rays.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },

  // ---------- industry / energy ----------
  { id:"transmission-line", en:"transmission line", ja:"送電線", field:"industry", sub:"energy", def:"A high-voltage cable that carries electricity over long distances.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"power-grid", en:"power grid", ja:"送電網", field:"industry", sub:"energy", def:"The network that delivers electricity from power plants to users.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"electrification", en:"electrification", ja:"電化", field:"industry", sub:"energy", def:"Switching machines and systems to run on electricity instead of fossil fuels.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"renewable-energy", en:"renewable energy", ja:"再エネ", alt:["再生可能エネルギー"], field:"industry", sub:"energy", def:"Energy from sources that are naturally replenished, such as solar and wind.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"data-center", en:"data center", ja:"データセンター", field:"industry", sub:"energy", def:"A facility that houses large numbers of servers.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"motor", en:"motor", ja:"モーター", field:"industry", sub:"energy", def:"A machine that turns electricity into motion.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },

  // ---------- market ----------
  { id:"market-size", en:"market size", ja:"市場規模", field:"market", sub:"general", def:"The total value of sales in a market over a year.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"demand", en:"demand", ja:"需要", field:"market", sub:"general", def:"How much of something buyers want.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"production-volume", en:"production volume", ja:"生産量", field:"market", sub:"general", def:"The amount produced in a given period.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"application", en:"application", ja:"用途", field:"general", sub:"general", def:"What something is used for.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"definition", en:"definition", ja:"定義", field:"general", sub:"general", def:"A statement of exactly what a word or idea means.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },

  // ---------- science / chemistry & physics ----------
  { id:"electrical-conductivity", en:"electrical conductivity", ja:"電気伝導率", alt:["導電率"], field:"science", sub:"physics", def:"How easily a material lets electric current flow through it.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"free-electron", en:"free electron", ja:"自由電子", field:"science", sub:"physics", def:"An electron not bound to a single atom, free to move through a metal.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"density", en:"density", ja:"密度", field:"science", sub:"physics", def:"Mass per unit volume, e.g. g/cm³.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"melting-point", en:"melting point", ja:"融点", field:"science", sub:"physics", def:"The temperature at which a solid turns into a liquid.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"rust", en:"rust", ja:"錆", alt:["サビ"], field:"science", sub:"chemistry", def:"The reddish-brown oxide that forms on iron exposed to air and water.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"corrosion", en:"corrosion", ja:"腐食", field:"science", sub:"chemistry", def:"The gradual destruction of a metal by chemical reaction with its environment.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"oxidation", en:"oxidation", ja:"酸化", field:"science", sub:"chemistry", def:"A reaction in which a substance combines with oxygen or loses electrons.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"oxide-film", en:"oxide film", ja:"酸化被膜", field:"science", sub:"chemistry", def:"A thin oxide layer on a metal surface that protects the metal underneath.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"passivation", en:"passivation", ja:"不動態", field:"science", sub:"chemistry", def:"A state in which a protective surface layer stops a metal from reacting further.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"reactivity-series", en:"reactivity series", ja:"イオン化傾向", field:"science", sub:"chemistry", def:"The ranking of metals by how easily they lose electrons and react.", note:"直訳 ionization tendency より reactivity series が通じる", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"sacrificial-protection", en:"sacrificial protection", ja:"犠牲防食", field:"science", sub:"chemistry", def:"Protecting a metal by attaching a more reactive metal that corrodes first.", note:"sacrificial anode / cathodic protection とも", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"electrolysis", en:"electrolysis", ja:"電気分解", field:"science", sub:"chemistry", def:"Using electric current to drive a chemical reaction, such as splitting a compound.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"molten-salt-electrolysis", en:"molten salt electrolysis", ja:"溶融塩電解", field:"science", sub:"chemistry", def:"Electrolysis carried out in melted salt instead of water, used to make aluminium.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"aqueous-solution", en:"aqueous solution", ja:"水溶液", field:"science", sub:"chemistry", def:"A solution in which water is the solvent.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"alumina", en:"alumina", ja:"アルミナ", field:"science", sub:"chemistry", def:"Aluminium oxide (Al₂O₃), the raw material for aluminium smelting.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"cryolite", en:"cryolite", ja:"氷晶石", field:"science", sub:"chemistry", def:"A mineral (Na₃AlF₆) melted to dissolve alumina during aluminium smelting.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"hydrogen", en:"hydrogen", ja:"水素", field:"science", sub:"chemistry", def:"The lightest element (H).", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"verdigris", en:"verdigris", ja:"緑青", field:"science", sub:"chemistry", def:"The green coating that forms on copper exposed to air.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"antibacterial", en:"antibacterial", ja:"抗菌", field:"science", sub:"biology", def:"Able to kill bacteria or stop them from growing.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"crystal-structure", en:"crystal structure", ja:"結晶構造", field:"science", sub:"physics", def:"The regular, repeating arrangement of atoms in a solid.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"austenite", en:"austenite", ja:"オーステナイト", field:"science", sub:"metals", def:"A crystal form of iron that nickel stabilizes; makes stainless steel tough and non-magnetic.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"ferromagnetism", en:"ferromagnetic", ja:"強磁性", field:"science", sub:"physics", def:"Strongly attracted to magnets, like iron, nickel and cobalt.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"toxicity", en:"toxicity", ja:"毒性", field:"science", sub:"biology", def:"How harmful a substance is to living things.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"non-toxic", en:"non-toxic", ja:"無毒", field:"science", sub:"biology", def:"Not poisonous.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"atomic-weight", en:"atomic weight", ja:"原子量", field:"science", sub:"chemistry", def:"The average mass of an element's atoms relative to carbon-12.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },

  // ---------- science / battery ----------
  { id:"lead-acid-battery", en:"lead-acid battery", ja:"鉛蓄電池", field:"science", sub:"battery", def:"A rechargeable battery using lead plates and sulfuric acid, common in cars.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"lithium-ion-battery", en:"lithium-ion battery", ja:"リチウムイオン電池", field:"science", sub:"battery", def:"A rechargeable battery in which lithium ions move between the electrodes.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"alkaline-battery", en:"alkaline battery", ja:"アルカリ乾電池", field:"science", sub:"battery", def:"A common disposable battery using zinc and manganese dioxide.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"battery", en:"battery", ja:"電池", field:"science", sub:"battery", def:"A device that stores chemical energy and releases it as electricity.", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"cathode", en:"cathode", ja:"正極", field:"science", sub:"battery", def:"The positive electrode of a battery during discharge.", note:"電気分解では cathode = 陰極 になるので注意", src:"030_research/036_industry/0372_base_metals/261017_base_metals.html", known:false, added:"2026-10-17" },
  { id:"anode", en:"anode", ja:"負極", field:"science", sub:"battery", def:"The negative electrode of a battery during discharge.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"energy-density", en:"energy density", ja:"エネルギー密度", field:"science", sub:"battery", def:"How much energy a battery stores per unit of mass or volume.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"electrolyte", en:"electrolyte", ja:"電解液", field:"science", sub:"battery", def:"The liquid or gel in a battery that lets ions move between electrodes.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"dilute-sulfuric-acid", en:"dilute sulfuric acid", ja:"希硫酸", field:"science", sub:"chemistry", def:"Sulfuric acid mixed with water.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"lead-sulfate", en:"lead sulfate", ja:"硫酸鉛", field:"science", sub:"chemistry", def:"PbSO₄, formed on both plates when a lead-acid battery discharges.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"discharge", en:"discharge", ja:"放電", field:"science", sub:"battery", def:"Releasing stored electrical energy from a battery.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
  { id:"charging", en:"charging", ja:"充電", field:"science", sub:"battery", def:"Putting electrical energy back into a battery.", src:"030_research/034_science/260707_elements.html", known:false, added:"2026-10-17" },
];

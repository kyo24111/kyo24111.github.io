/* Body Atlas 3D — viewer
   REGIONS / PARTS / SKIN は 260824_body_3d_data.js（先行する classic script）で定義 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildSpec } from './260824_body_3d_geom.js';

const D = Math.PI / 180;
const stage = document.getElementById('stage');
const canvas = document.getElementById('cv');
const tipEl = document.getElementById('tip');

/* ───────── scene ───────── */
let renderer = null;                                   // WebGL が無い端末でも検索と解説は動かす
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
} catch (e) { renderer = null; }
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 1, 2000);
camera.position.set(112, 118, 296);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.075;
controls.target.set(0, 92, 0);
controls.minDistance = 16;
controls.maxDistance = 640;
controls.zoomSpeed = 0.9;
controls.rotateSpeed = 0.85;
if ('zoomToCursor' in controls) controls.zoomToCursor = true;   // Google Earth 風のカーソル寄せズーム
controls.autoRotateSpeed = 0.9;

scene.add(new THREE.HemisphereLight(0xffffff, 0xbdb7b0, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 1.05); key.position.set(90, 200, 180); scene.add(key);
const fill = new THREE.DirectionalLight(0xffffff, 0.35); fill.position.set(-140, 60, 120); scene.add(fill);
const rim = new THREE.DirectionalLight(0xffffff, 0.45);  rim.position.set(-120, 110, -170); scene.add(rim);

if (renderer) {                                        // 室内環境マップで陰影と艶を出す
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  pmrem.dispose();
}

/* 接地影（板ポリ＋放射グラデーション） */
(function shadow() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d').createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(0,0,0,.30)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  const cx = c.getContext('2d'); cx.fillStyle = g; cx.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(96, 60),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
  );
  m.rotation.x = -Math.PI / 2; m.position.y = 0.2; m.renderOrder = -1;
  scene.add(m);
})();

/* ───────── materials / colors ───────── */
const BASE = { muscle: 0xb06055, bone: 0xcdc6b4, organ: 0x8a7480 };
const SEL = 0x201d1c;
const tint = (lay, i) => {
  const c = new THREE.Color(BASE[lay]);
  const j = ((i * 2654435761) % 1000) / 1000;              // 決定的なばらつき
  const k = ((i * 40503 + 7) % 997) / 997;
  c.offsetHSL((k - 0.5) * 0.028, (k - 0.5) * 0.10, (j - 0.5) * 0.20);  // 隣接筋を見分けるため
  return c;
};

const group = new THREE.Group();
scene.add(group);
const rec = {};            // id → { part, meshes[], mat, box, center, radius }
const pickables = [];

PARTS.forEach((part, i) => {
  const geo = buildSpec(part.g);
  const mat = new THREE.MeshStandardMaterial({
    color: tint(part.lay, i + 3),
    roughness: part.lay === 'bone' ? 0.5 : part.lay === 'organ' ? 0.42 : 0.56,
    metalness: 0.0, envMapIntensity: 0.55,
    transparent: true, opacity: 1, side: THREE.DoubleSide, flatShading: false
  });
  mat.userData.base = mat.color.clone();
  const meshes = [];
  const m = new THREE.Mesh(geo, mat); m.userData.pid = part.id; meshes.push(m);
  if (part.sym) {
    const m2 = new THREE.Mesh(geo, mat);
    m2.scale.x = -1; m2.userData.pid = part.id; meshes.push(m2);
  }
  meshes.forEach(x => { group.add(x); pickables.push(x); });

  const box = new THREE.Box3();
  meshes.forEach(x => { x.updateMatrixWorld(); box.expandByObject(x); });
  const center = box.getCenter(new THREE.Vector3());
  rec[part.id] = { part, meshes, mat, box, center, radius: box.getSize(new THREE.Vector3()).length() / 2 };
});

/* skin shell */
const skin = new THREE.Mesh(buildSpec(SKIN), new THREE.MeshStandardMaterial({
  color: 0xdacfc7, roughness: 0.9, metalness: 0, envMapIntensity: 0.3,
  transparent: true, opacity: 0.15, depthWrite: false, side: THREE.DoubleSide
}));
skin.visible = false;
scene.add(skin);

/* ───────── state ───────── */
const layers = { muscle: true, bone: false, organ: false, skin: true, deep: false };
let selected = null, hovered = null, focusMode = true, regionFilter = null, query = '', flag = null;

const shown = (p) => layers[p.lay] && (!p.deep || layers.deep);
function applyLayers() {
  PARTS.forEach(p => {
    const on = shown(p);
    rec[p.id].meshes.forEach(m => { m.visible = on; });
  });
  skin.visible = layers.skin;
  paint();
  refreshList();
}

function paint() {
  const anySel = !!selected;
  PARTS.forEach(p => {
    const r = rec[p.id];
    const isSel = selected === p.id, isHov = hovered === p.id;
    r.mat.color.copy(isSel ? new THREE.Color(SEL) : r.mat.userData.base);
    if (isHov && !isSel) r.mat.color.offsetHSL(0, 0, 0.14);
    /* 選択中は素の色をわずかに発光させ、真っ黒の塊に見えないようにする */
    r.mat.emissive.copy(isSel ? r.mat.userData.base.clone().multiplyScalar(0.22) : new THREE.Color(0x000000));
    const dim = focusMode && anySel && !isSel;
    r.mat.opacity = dim ? 0.06 : 1;
    r.mat.depthWrite = !dim;
  });
  skin.material.opacity = (focusMode && anySel) ? 0.03 : 0.14;
}

/* ───────── camera fly ───────── */
let fly = null;
/* 対象のバウンディングボックスが画面に収まる距離を fov から逆算する */
function fitDist(size, pad = 1.9) {
  const half = Math.tan(camera.fov * D / 2);
  const dV = Math.max(size.y, 2) / 2 / half;
  const dH = Math.max(size.x, size.z, 2) / 2 / (half * Math.max(camera.aspect, .5));
  return Math.max(dV, dH) * pad + 6;
}
function flyTo(center, size, ms = 720, pad = 1.9) {
  const dist = THREE.MathUtils.clamp(fitDist(size, pad), controls.minDistance, controls.maxDistance);
  const dir = camera.position.clone().sub(controls.target).normalize();
  fly = {
    t0: performance.now(), ms,
    p0: camera.position.clone(), p1: center.clone().add(dir.multiplyScalar(dist)),
    g0: controls.target.clone(), g1: center.clone()
  };
}
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function frameAll() { flyTo(new THREE.Vector3(0, 92, 0), new THREE.Vector3(62, 194, 40), 600); }

function regionBox(rgId) {
  const box = new THREE.Box3();
  PARTS.filter(p => p.rg === rgId && shown(p)).forEach(p => box.union(rec[p.id].box));
  return box.isEmpty() ? null : box;
}

/* ───────── select ───────── */
function select(id, opts = {}) {
  selected = id;
  if (id) {
    const p = rec[id].part;
    if (!shown(p)) {                                   // 深層や非表示レイヤーは自動で開く
      layers[p.lay] = true;
      if (p.deep) layers.deep = true;
      syncLayerBtns(); applyLayers();
    }
    if (opts.fly !== false) {
      const size = rec[id].box.getSize(new THREE.Vector3());
      flyTo(rec[id].center, size, 720, opts.tight ? 1.5 : 2.7);
    }
    history.replaceState(null, '', '#' + id);
  }
  paint(); renderDetail(); refreshList();
}

function renderDetail() {
  const el = document.getElementById('det');
  const ix = document.getElementById('detIdx');
  if (!selected) {
    el.innerHTML = '<div class="det-empty">モデルをタップ、または下のリストから選択すると解説が出ます。</div>';
    ix.textContent = ''; return;
  }
  const p = rec[selected].part;
  const rg = REGIONS.find(r => r.id === p.rg);
  const layJp = { muscle: '筋肉', bone: '骨格', organ: '内臓' }[p.lay];
  ix.textContent = (PARTS.indexOf(p) + 1) + ' / ' + PARTS.length;
  el.innerHTML =
    `<div class="det-lay lay-${p.lay}">${layJp}${p.deep ? ' · 深層' : ''}${p.sym ? ' · 左右' : ''}</div>
     <div class="det-jp">${p.jp}${p.key ? ' ★' : ''}</div>
     <div class="det-en">${p.en}</div>
     <div class="det-rg">部位：${rg ? rg.jp : '—'}</div>` +
    p.f.map(([k, v]) => `<div class="f"><div class="f-k">${k}</div><div class="f-v">${v}</div></div>`).join('') +
    (p.key ? '<div class="note"><b>Kyoの継続テーマ</b>腹式呼吸の獲得に直結する部位。★印はこのテーマの関連筋・関連器官。</div>' : '');
}

/* ───────── list & search ───────── */
const ORDER = { muscle: 0, bone: 1, organ: 2 };
function matches(p) {
  if (!layers[p.lay]) return false;
  if (p.deep && !layers.deep && !query) return false;   // 検索語があれば深層もヒットさせる
  if (flag && !p[flag]) return false;
  if (regionFilter && p.rg !== regionFilter) return false;
  if (!query) return true;
  const rg = REGIONS.find(r => r.id === p.rg);
  const hay = [p.jp, p.en, p.al || '', rg ? rg.jp : '', p.lay,
    { muscle: '筋肉', bone: '骨格 骨', organ: '内臓 臓器' }[p.lay],
    p.deep ? '深層' : '', ...p.f.map(f => f[0] + f[1])].join(' ').toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every(t => hay.includes(t));
}
function refreshList() {
  const el = document.getElementById('list');
  const hits = PARTS.filter(matches).sort((a, b) =>
    (ORDER[a.lay] - ORDER[b.lay]) || (REGIONS.findIndex(r => r.id === a.rg) - REGIONS.findIndex(r => r.id === b.rg)));
  document.getElementById('listN').textContent = hits.length + ' items';
  el.innerHTML = hits.length ? hits.map(p => {
    const rg = REGIONS.find(r => r.id === p.rg);
    return `<div class="item ${selected === p.id ? 'on' : ''}" data-id="${p.id}">
      <span class="i-jp">${p.jp}${p.key ? ' ★' : ''}</span>
      <span class="i-en">${p.en}</span>
      <span class="i-rg">${rg ? rg.jp : ''}</span></div>`;
  }).join('') : '<div class="empty">該当なし。レイヤー（筋肉/骨格/内臓）が絞られていないか確認。</div>';
  el.querySelectorAll('.item').forEach(n => n.onclick = () => select(n.dataset.id));
  const sel = el.querySelector('.item.on');
  if (sel) {                                            // ページ全体を動かさずリスト内だけスクロール
    const top = sel.offsetTop - el.clientHeight / 2 + sel.clientHeight / 2;
    el.scrollTop = Math.max(0, top);
  }
}

/* region chips */
(function chips() {
  const el = document.getElementById('chips');
  el.innerHTML = `<button class="chip on" data-rg="">すべて<span class="n">${PARTS.length}</span></button>` +
    REGIONS.map(r => {
      const n = PARTS.filter(p => p.rg === r.id).length;
      return `<button class="chip" data-rg="${r.id}">${r.jp}<span class="n">${n}</span></button>`;
    }).join('') +
    `<button class="chip" data-rg="__iu">インナーユニット<span class="n">${PARTS.filter(p => p.iu).length}</span></button>` +
    `<button class="chip" data-rg="__deep">深層のみ<span class="n">${PARTS.filter(p => p.deep).length}</span></button>` +
    `<button class="chip" data-rg="__key">★ 呼吸<span class="n">${PARTS.filter(p => p.key).length}</span></button>`;
  el.querySelectorAll('.chip').forEach(c => c.onclick = () => {
    el.querySelectorAll('.chip').forEach(x => x.classList.remove('on'));
    c.classList.add('on');
    const v = c.dataset.rg;
    flag = null;
    if (v === '__key' || v === '__iu' || v === '__deep') {
      flag = { __key: 'key', __iu: 'iu', __deep: 'deep' }[v];
      regionFilter = null;
      layers.muscle = true; layers.deep = true;
      if (flag === 'key') layers.organ = true;
      syncLayerBtns(); applyLayers();
      const b = new THREE.Box3();
      PARTS.filter(p => p[flag]).forEach(p => b.union(rec[p.id].box));
      if (!b.isEmpty()) flyTo(b.getCenter(new THREE.Vector3()), b.getSize(new THREE.Vector3()), 720, 2.2);
      refreshList(); return;
    }
    regionFilter = v || null;
    refreshList();
    if (regionFilter) {
      const b = regionBox(regionFilter);
      if (b) flyTo(b.getCenter(new THREE.Vector3()), b.getSize(new THREE.Vector3()), 720, 2.0);
    } else frameAll();
  });
})();

/* ───────── UI wiring ───────── */
function syncLayerBtns() {
  document.querySelectorAll('[data-layer]').forEach(b =>
    b.classList.toggle('on', !!layers[b.dataset.layer]));
}
document.querySelectorAll('[data-layer]').forEach(b => b.onclick = () => {
  layers[b.dataset.layer] = !layers[b.dataset.layer];
  if (selected && !layers[rec[selected].part.lay]) { selected = null; renderDetail(); }
  syncLayerBtns(); applyLayers();
});
const qEl = document.getElementById('q');
qEl.oninput = () => { query = qEl.value.trim(); refreshList(); };
qEl.onkeydown = (e) => {
  if (e.key !== 'Enter') return;
  const first = PARTS.filter(matches)[0];
  if (first) select(first.id);
};
document.getElementById('qClear').onclick = () => { qEl.value = ''; query = ''; refreshList(); qEl.focus(); };
document.getElementById('bReset').onclick = () => { selected = null; paint(); renderDetail(); refreshList(); frameAll(); };
document.getElementById('bIn').onclick = () => zoomBy(0.72);
document.getElementById('bOut').onclick = () => zoomBy(1 / 0.72);
function zoomBy(f) {
  const off = camera.position.clone().sub(controls.target);
  const d = THREE.MathUtils.clamp(off.length() * f, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(off.setLength(d));
}
document.querySelectorAll('[data-view]').forEach(b => b.onclick = () => {
  const d = camera.position.distanceTo(controls.target);
  const v = { front: [0, 0, 1], back: [0, 0, -1], side: [1, 0, 0.02] }[b.dataset.view];
  const t = selected ? rec[selected].center.clone() : new THREE.Vector3(0, 92, 0);
  const dist = selected ? d : 296;
  camera.position.set(t.x + v[0] * dist, t.y + (selected ? 0 : 26), t.z + v[2] * dist);
  controls.target.copy(t); fly = null;
});

const bFocus = document.getElementById('bFocus');
bFocus.onclick = () => { focusMode = !focusMode; bFocus.classList.toggle('on', focusMode); paint(); };
const bSpin = document.getElementById('bSpin');
bSpin.onclick = () => { controls.autoRotate = !controls.autoRotate; bSpin.classList.toggle('on', controls.autoRotate); };
addEventListener('keydown', e => { if (e.key === 'Escape') { selected = null; paint(); renderDetail(); refreshList(); } });

/* ───────── picking ───────── */
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pick(ev) {
  if (!renderer) return null;
  const r = canvas.getBoundingClientRect();
  ndc.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
  ndc.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(pickables.filter(m => m.visible), false)[0];
  return hit ? hit.object.userData.pid : null;
}
let down = null;
canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
canvas.addEventListener('pointerup', e => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  const quick = performance.now() - down.t < 450;
  down = null;
  if (moved > 7 || !quick) return;                      // ドラッグ操作はタップ扱いにしない
  const id = pick(e);
  if (id) select(id); else { selected = null; paint(); renderDetail(); refreshList(); }
});
canvas.addEventListener('dblclick', e => { const id = pick(e); if (id) select(id, { tight: true }); });
canvas.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse' || down) return;
  const id = pick(e);
  if (id !== hovered) { hovered = id; paint(); canvas.style.cursor = id ? 'pointer' : 'grab'; }
  if (id) {
    const r = stage.getBoundingClientRect();
    tipEl.textContent = rec[id].part.jp;
    tipEl.style.left = (e.clientX - r.left) + 'px';
    tipEl.style.top = (e.clientY - r.top) + 'px';
    tipEl.classList.add('show');
  } else tipEl.classList.remove('show');
});
canvas.addEventListener('pointerleave', () => { tipEl.classList.remove('show'); if (hovered) { hovered = null; paint(); } });

/* ───────── resize / loop ───────── */
function resize() {
  if (!renderer) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / Math.max(h, 1);
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
resize();

if (renderer) renderer.setAnimationLoop(() => {
  if (fly) {
    const t = Math.min((performance.now() - fly.t0) / fly.ms, 1), k = ease(t);
    camera.position.lerpVectors(fly.p0, fly.p1, k);
    controls.target.lerpVectors(fly.g0, fly.g1, k);
    if (t >= 1) fly = null;
  }
  controls.update();
  renderer.render(scene, camera);
});

/* ───────── init ───────── */
document.getElementById('kMus').textContent = PARTS.filter(p => p.lay === 'muscle').length;
document.getElementById('kBon').textContent = PARTS.filter(p => p.lay === 'bone').length;
document.getElementById('kOrg').textContent = PARTS.filter(p => p.lay === 'organ').length;
document.getElementById('kReg').textContent = REGIONS.length;
syncLayerBtns(); applyLayers(); renderDetail();
const loadEl = document.getElementById('loading');
if (renderer) {
  loadEl.style.display = 'none';
} else {
  loadEl.innerHTML = '<div style="text-align:center;padding:0 24px;line-height:1.9">この端末では3D表示（WebGL）が使えません。<br>下の検索・リスト・解説はそのまま使えます。</div>';
  canvas.style.display = 'none';
  document.querySelector('.stage-tools').style.display = 'none';
  document.querySelector('.stage-hint').style.display = 'none';
  stage.style.height = '160px';
}

window.__atlas = { camera, controls, scene, rec, select, layers, applyLayers };   // デバッグ用フック

const hash = location.hash.replace('#', '');
if (hash && rec[hash]) select(hash);

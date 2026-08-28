/* 筋トレメニュー — 3Dアニメーション
   人体アトラス(260824_body_3d_geom.js / _data.js)の部位をそのまま使い、
   部位を体節グループに割り振って関節で回すことで動きをつける。
   PARTS / SKIN は先行の classic script、WORKOUTS は種目定義から。 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildSpec } from './260824_body_3d_geom.js';

const D = Math.PI / 180;
const stage = document.getElementById('stage');
const canvas = document.getElementById('cv');
const tipEl = document.getElementById('tip');

/* ───────── scene ───────── */
let renderer = null, glError = '';
(function makeRenderer() {
  /* 条件を落としながら数回試す。
     ・antialias や alpha が原因で落ちる端末がある
     ・3Dページを複数開いているとブラウザのWebGLコンテキスト上限で失敗する */
  const tries = [
    { antialias: true,  alpha: true },
    { antialias: false, alpha: true },
    { antialias: false, alpha: true, powerPreference: 'low-power' },
    { antialias: false, alpha: false, failIfMajorPerformanceCaveat: false },
  ];
  for (const o of tries) {
    try { renderer = new THREE.WebGLRenderer(Object.assign({ canvas }, o)); break; }
    catch (e) { glError = (e && e.message) ? e.message : String(e); }
  }
  if (!renderer) {
    const probe = document.createElement('canvas');
    const has = !!(probe.getContext('webgl2') || probe.getContext('webgl'));
    glError = (has ? 'WebGLは有効だがコンテキストを作れませんでした（3Dページを複数開いていると上限に達します）'
                   : 'このブラウザでWebGLが無効になっています（ハードウェアアクセラレーションの設定を確認）')
              + (glError ? ' / ' + glError : '');
  }
})();
if (renderer) renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 1, 2000);
camera.position.set(330, 56, 6);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 30, 0);
controls.minDistance = 30;
controls.maxDistance = 620;
controls.minPolarAngle = Math.PI * 0.04;
controls.maxPolarAngle = Math.PI * 0.52;          // 床下には潜らない
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.PAN };
controls.screenSpacePanning = true;

scene.add(new THREE.HemisphereLight(0xffffff, 0xbdb7b0, 0.5));
const key = new THREE.DirectionalLight(0xffffff, 1.1);
key.position.set(-90, 210, 150);
scene.add(key);
const fill = new THREE.DirectionalLight(0xffffff, 0.32); fill.position.set(140, 70, 120); scene.add(fill);
const rim = new THREE.DirectionalLight(0xffffff, 0.4); rim.position.set(60, 120, -180); scene.add(rim);

if (renderer) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  pmrem.dispose();
  const heavy = innerWidth >= 700 && !/Android|iPhone|iPad/i.test(navigator.userAgent);
  renderer.shadowMap.enabled = heavy;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  key.castShadow = heavy;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 40; key.shadow.camera.far = 520;
  key.shadow.camera.left = -140; key.shadow.camera.right = 140;
  key.shadow.camera.top = 140; key.shadow.camera.bottom = -140;
  key.shadow.bias = -0.0012; key.shadow.normalBias = 0.5;
}

/* ───────── 床（マット） ───────── */
const mat0 = new THREE.Mesh(
  new THREE.BoxGeometry(76, 2.6, 238),   // 体は z 方向に伸びるので、マットも z を長くする
  new THREE.MeshStandardMaterial({ color: 0xeae7e2, roughness: 0.92, metalness: 0 })
);
mat0.position.set(0, -1.3, 0);
mat0.receiveShadow = true;
scene.add(mat0);

/* ───────── リグ（関節の親子関係） ───────── */
const JOINTS = [
  ['root',   null,     [0, 92, 0]],
  ['spine',  'root',   [0, 100, -2.5]],
  ['chest',  'spine',  [0, 122, -3]],
  ['neck',   'chest',  [0, 150, -2]],
  ['head',   'neck',   [0, 158, 0]],
  ['armL',   'chest',  [19, 147, 0]],
  ['foreL',  'armL',   [22, 117, 0]],
  ['handL',  'foreL',  [24, 94, 1]],
  ['thighL', 'root',   [8.5, 90, 0]],
  ['shinL',  'thighL', [9, 50, 1]],
  ['footL',  'shinL',  [8, 11, 1]],
];
const joint = {}, pivotOf = {};
function addJoint(name, parent, p) {
  const g = new THREE.Object3D();
  const par = parent ? joint[parent] : scene;
  const pp = parent ? pivotOf[parent] : new THREE.Vector3();
  g.position.set(p[0] - pp.x, p[1] - pp.y, p[2] - pp.z);
  par.add(g);
  joint[name] = g;
  pivotOf[name] = new THREE.Vector3(p[0], p[1], p[2]);
}
JOINTS.forEach(([n, par, p]) => {
  addJoint(n, par, p);
  if (n.endsWith('L')) {                                   // 右側は x を反転して同じ構造を作る
    const rn = n.slice(0, -1) + 'R';
    const rpar = par && par.endsWith('L') ? par.slice(0, -1) + 'R' : par;
    addJoint(rn, rpar, [-p[0], p[1], p[2]]);
  }
});

/* 部位の重心から所属する体節を決める */
function segOf(cx, cy) {
  const ax = Math.abs(cx), s = cx >= 0 ? 'L' : 'R';
  if (ax > 21 && cy < 93) return 'hand' + s;
  if (ax > 19.5 && cy < 117) return 'fore' + s;
  if (ax > 13 && cy > 112) return 'arm' + s;
  if (cy >= 148 && ax < 13) return 'head';
  if (cy >= 122) return 'chest';
  if (cy >= 99) return 'spine';
  if (cy >= 86) return 'root';
  if (cy >= 49) return 'thigh' + s;
  if (cy >= 12) return 'shin' + s;
  return 'foot' + s;
}

/* ───────── 材質 ───────── */
function fiberTexture(lines, contrast) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#808080'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < lines; i++) {
    const y = (i / lines) * 256, w = 0.6 + ((i * 37) % 11) / 11 * 1.9;
    const v = THREE.MathUtils.clamp(128 + (((i * 53) % 17) / 17 - 0.5) * 255 * contrast, 0, 255);
    x.strokeStyle = 'rgb(' + [v, v, v].map(Math.round).join(',') + ')';
    x.lineWidth = w; x.beginPath();
    for (let px = 0; px <= 256; px += 8) {
      const yy = y + Math.sin((px / 256) * Math.PI * 2 + i) * 0.8;
      px === 0 ? x.moveTo(px, yy) : x.lineTo(px, yy);
    }
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  t.repeat.set(1, 2.2);
  return t;
}
const FIBER = renderer ? fiberTexture(46, 0.55) : null;

const COLD = new THREE.Color(0x8d5c56);     // 働いていない筋
const HOT  = new THREE.Color(0xd8352a);     // 全力で働いている筋
const REST = new THREE.Color(0x9c473c);     // ハイライトOFF時の素の色

const rec = {};          // part id → { part, items:[{mesh, side, mat}] }
const pickables = [];

PARTS.forEach((part, i) => {
  if (part.lay === 'organ' || part.lay === 'tendon') return;      // 動作解説では骨と筋だけ
  const geo = buildSpec(part.g);
  const box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
  const c = box.getCenter(new THREE.Vector3());
  const isMus = part.lay === 'muscle';
  const items = [];
  const sides = part.sym ? [1, -1] : [1];
  sides.forEach(sg => {
    const m = new THREE.MeshPhysicalMaterial({
      color: isMus ? REST.clone() : new THREE.Color(0xcdc6b4),
      roughness: isMus ? 0.48 : 0.55, metalness: 0, envMapIntensity: 0.5,
      clearcoat: isMus ? 0.22 : 0.08, clearcoatRoughness: 0.45,
      vertexColors: true,
      bumpMap: isMus ? FIBER : null, bumpScale: 0.6,
      transparent: true, opacity: 1, side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, m);
    if (sg < 0) mesh.scale.x = -1;
    const seg = segOf(c.x * sg, c.y);
    const g = joint[seg] || joint.root;
    mesh.position.copy(pivotOf[seg] || pivotOf.root).negate();
    mesh.castShadow = mesh.receiveShadow = true;
    mesh.userData = { pid: part.id, side: sg > 0 ? 'L' : 'R' };
    g.add(mesh);
    items.push({ mesh, side: sg > 0 ? 'L' : 'R', mat: m, seg });
    if (isMus) pickables.push(mesh);
  });
  rec[part.id] = { part, items, base: null };
});

/* 輪郭は blob ごとに体節へ割り振る（1メッシュだと動かせない） */
const skinMats = [];
SKIN.forEach(b => {
  const geo = buildSpec([b]);
  const box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
  const c = box.getCenter(new THREE.Vector3());
  const seg = segOf(c.x, c.y);
  const m = new THREE.MeshPhysicalMaterial({
    color: 0xdccfc6, roughness: 0.85, metalness: 0, envMapIntensity: 0.35,
    clearcoat: 0.16, clearcoatRoughness: 0.6,
    transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geo, m);
  mesh.position.copy(pivotOf[seg]).negate();
  joint[seg].add(mesh);
  skinMats.push(m);
});

/* 一直線ガイド（肩→伸ばした踵） */
const guideGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
const guideMat = new THREE.LineDashedMaterial({ color: 0x2f6fd0, dashSize: 4.5, gapSize: 3.4, transparent: true, opacity: 0 });
const guide = new THREE.Line(guideGeo, guideMat);
guide.computeLineDistances();
scene.add(guide);

/* ───────── ポーズ ───────── */
const AXES = ['x', 'y', 'z'];
function applyPose(pose) {
  Object.keys(joint).forEach(n => {
    const j = pose[n] || {};
    joint[n].rotation.set((j.x || 0) * D, (j.y || 0) * D, (j.z || 0) * D);
  });
  const r = pose.root || {};
  joint.root.position.set((r.px || 0), floorY + (r.py || 0), (r.pz || 0));
}
function blend(a, b, k) {
  const out = {};
  new Set([...Object.keys(a), ...Object.keys(b)]).forEach(n => {
    const p = a[n] || {}, q = b[n] || {}, o = {};
    AXES.forEach(ax => { o[ax] = THREE.MathUtils.lerp(p[ax] || 0, q[ax] || 0, k); });
    ['px', 'py', 'pz'].forEach(ax => { o[ax] = THREE.MathUtils.lerp(p[ax] || 0, q[ax] || 0, k); });
    out[n] = o;
  });
  return out;
}
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/* 床に接地させる縦オフセットを最初に測る */
let floorY = 0;
let EX = WORKOUTS[0];
applyPose(EX.poses[EX.timeline[0].pose]);
scene.updateMatrixWorld(true);
{
  const bb = new THREE.Box3();
  Object.values(joint).forEach(g => g.children.forEach(m => { if (m.isMesh) bb.expandByObject(m); }));
  floorY = -bb.min.y;
}

/* ───────── 状態 ───────── */
let playing = true, phase = 0, speed = 1, solo = null;
let showHighlight = true, showBone = false, showSkin = true, showDeep = false;
let extNow = { amt: 0, arm: 'R', leg: 'L' }, label = '';
const clock = new THREE.Clock();

function sampleTimeline(p) {
  const tl = EX.timeline;
  let i = 0;
  for (; i < tl.length - 1; i++) if (p >= tl[i].t && p <= tl[i + 1].t) break;
  const a = tl[i], b = tl[Math.min(i + 1, tl.length - 1)];
  const span = Math.max(b.t - a.t, 1e-6);
  const k = ease(THREE.MathUtils.clamp((p - a.t) / span, 0, 1));
  const extOf = n => (n === 'quad' ? 0 : 1);
  const named = a.pose !== 'quad' ? a.pose : b.pose;
  const side = named === 'extR' ? { arm: 'R', leg: 'L' } : { arm: 'L', leg: 'R' };
  return {
    pose: blend(EX.poses[a.pose], EX.poses[b.pose], k),
    amt: THREE.MathUtils.lerp(extOf(a.pose), extOf(b.pose), k),
    side, label: k < 0.5 ? a.label : b.label
  };
}

/* 部位ごとの「今の働き具合」 */
function activation(t) {
  const { amt, arm, leg } = extNow;
  if (t.side === 'core') return t.w * (0.3 + 0.7 * amt);
  if (t.side === 'legExt') return t.w * (0.05 + 0.95 * amt);
  if (t.side === 'armExt') return t.w * (0.05 + 0.95 * amt);
  if (t.side === 'legSup') return t.w * (0.35 + 0.65 * amt);
  if (t.side === 'armSup') return t.w * (0.4 + 0.6 * amt);
  return t.w * amt;
}
function sideOfTarget(t) {                                  // その筋が光る側
  if (t.side === 'legExt') return extNow.leg;
  if (t.side === 'armExt') return extNow.arm;
  if (t.side === 'legSup') return extNow.leg === 'L' ? 'R' : 'L';
  if (t.side === 'armSup') return extNow.arm === 'L' ? 'R' : 'L';
  return null;                                              // 両側
}

function paint() {
  const map = new Map();
  if (showHighlight) EX.targets.forEach(t => map.set(t.id, t));
  PARTS.forEach(p => {
    const r = rec[p.id]; if (!r) return;
    const isMus = p.lay === 'muscle';
    const t = map.get(p.id);
    r.items.forEach(it => {
      if (!isMus) { it.mesh.visible = showBone; it.mat.color.set(0xcdc6b4); it.mat.opacity = 0.9; return; }
      /* 深層筋は使用筋のときだけ出す（全部出すと中が見えない） */
      it.mesh.visible = showDeep || !p.deep || !!t;
      const soloMiss = solo && solo !== p.id;
      if (!t || soloMiss) {
        it.mat.color.copy(showHighlight ? COLD : REST);
        it.mat.emissive.setRGB(0, 0, 0);
        it.mat.opacity = showHighlight ? (soloMiss ? 0.1 : 0.34) : 1;   // 奥の使用筋を透かす
        it.mat.depthWrite = !showHighlight;
        return;
      }
      const sd = sideOfTarget(t);
      const act = (sd && sd !== it.side) ? 0 : activation(t);
      it.mat.color.copy(COLD).lerp(HOT, THREE.MathUtils.clamp(act, 0, 1));
      it.mat.emissive.copy(HOT).multiplyScalar(0.42 * Math.pow(act, 1.5));
      it.mat.opacity = 1;
      it.mat.depthWrite = true;
    });
  });
  skinMats.forEach(m => { m.visible = showSkin; m.opacity = showSkin ? 0.07 : 0; });
}

/* ───────── UI ───────── */
const exBar = document.getElementById('exBar');
exBar.innerHTML = WORKOUTS.map((w, i) =>
  `<button class="ex-btn ${i === 0 ? 'on' : ''}" data-ex="${w.id}">${w.name}<span class="n">${w.targets.length}筋</span></button>`
).join('') + '<span class="ex-soon">＋ 種目はここに足していく</span>';
exBar.querySelectorAll('[data-ex]').forEach(b => b.onclick = () => {
  exBar.querySelectorAll('.ex-btn').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  EX = WORKOUTS.find(w => w.id === b.dataset.ex);
  phase = 0; solo = null; renderInfo(); renderMuscles();
});

function renderInfo() {
  const w = EX;
  document.getElementById('exInfo').innerHTML =
    `<div class="ex-name">${w.name}</div><div class="ex-en">${w.en}</div>
     <div class="ex-meta">
       <span class="mchip">${w.kind}</span><span class="mchip">${w.level}</span><span class="mchip">${w.equip}</span>
     </div>
     <div class="f"><div class="f-k">回数</div><div class="f-v">${w.reps}<br>${w.tempo}</div></div>
     <div class="f"><div class="f-k">狙い</div><div class="f-v">${w.aim}</div></div>
     <div class="f"><div class="f-k">やり方</div><div class="f-v"><ol>${w.how.map(h => `<li>${h}</li>`).join('')}</ol></div></div>
     <div class="f"><div class="f-k">意識すること</div><div class="f-v">${w.cues.map(c =>
        `<div style="margin-bottom:9px"><b style="font-size:12.5px">${c.t}</b><br><span style="color:var(--mid)">${c.body}</span>
         <div style="margin-top:3px">${c.mus.map(m => `<span class="mchip" style="font-size:9.5px;cursor:pointer" data-mus="${m}">${(rec[m] ? rec[m].part.jp : m)}</span>`).join(' ')}</div></div>`
      ).join('')}</div></div>
     <div class="f"><div class="f-k">よくある失敗</div><div class="f-v"><ul>${w.mistakes.map(m => `<li>${m}</li>`).join('')}</ul></div></div>
     <div class="note"><b>進め方</b>${w.progression}</div>`;
  document.querySelectorAll('[data-mus]').forEach(el => el.onclick = () => {
    solo = solo === el.dataset.mus ? null : el.dataset.mus;
    renderMuscles(); paint();
  });
}

function renderMuscles() {
  const el = document.getElementById('musList');
  el.innerHTML = EX.targets.map(t => {
    const jp = rec[t.id] ? rec[t.id].part.jp : t.id;
    return `<div class="mrow ${solo === t.id ? 'on' : ''}" data-m="${t.id}" title="${t.why}">
      <span class="m-bar"><i style="width:0%"></i></span>
      <span class="m-jp">${jp}</span><span class="m-role">${t.role}</span></div>`;
  }).join('');
  el.querySelectorAll('.mrow').forEach(n => n.onclick = () => {
    solo = solo === n.dataset.m ? null : n.dataset.m;
    renderMuscles(); paint();
  });
}
function updateBars() {
  const rows = document.querySelectorAll('#musList .mrow');
  EX.targets.forEach((t, i) => {
    const bar = rows[i] && rows[i].querySelector('i');
    if (bar) bar.style.width = Math.round(THREE.MathUtils.clamp(activation(t), 0, 1) * 100) + '%';
  });
}

const bPlay = document.getElementById('bPlay');
bPlay.onclick = () => { playing = !playing; bPlay.textContent = playing ? '❚❚' : '▶'; bPlay.classList.toggle('on', playing); };
const scrub = document.getElementById('scrub');
scrub.oninput = () => { playing = false; bPlay.textContent = '▶'; bPlay.classList.remove('on'); phase = +scrub.value / 1000; };
const bSpeed = document.getElementById('bSpeed');
bSpeed.onclick = () => {
  speed = speed === 1 ? 0.5 : speed === 0.5 ? 1.6 : 1;
  bSpeed.textContent = '×' + speed;
};
const bMus = document.getElementById('bMus'); bMus.classList.add('on');
bMus.onclick = () => { showHighlight = !showHighlight; bMus.classList.toggle('on', showHighlight); paint(); };
const bDeep = document.getElementById('bDeep');
bDeep.onclick = () => { showDeep = !showDeep; bDeep.classList.toggle('on', showDeep); paint(); };
const bBone = document.getElementById('bBone');
bBone.onclick = () => { showBone = !showBone; bBone.classList.toggle('on', showBone); paint(); };
const bSkin = document.getElementById('bSkin'); bSkin.classList.add('on');
bSkin.onclick = () => { showSkin = !showSkin; bSkin.classList.toggle('on', showSkin); paint(); };
const VIEWS = [
  { n: '横', p: [330, 56, 6],    t: [0, 30, 0] },  // 写真と同じ真横（頭が左）
  { n: '斜', p: [250, 156, 170], t: [0, 28, 0] },
  { n: '上', p: [24, 430, 46],   t: [0, 8, 0] },   // 背中側。一直線と骨盤の水平を見る
  { n: '頭', p: [34, 78, 390],   t: [0, 28, 0] },  // 頭側から。左右のブレを見る
];
let vi = 0;
const bSide = document.getElementById('bSide');
bSide.onclick = () => {
  vi = (vi + 1) % VIEWS.length;
  const v = VIEWS[vi];
  bSide.textContent = VIEWS[(vi + 1) % VIEWS.length].n;
  camera.position.set(...v.p); controls.target.set(...v.t);
};
document.getElementById('bReset').onclick = () => {
  vi = 0; bSide.textContent = VIEWS[1].n;
  camera.position.set(...VIEWS[0].p); controls.target.set(...VIEWS[0].t);
};

/* 筋肉のタップ・ホバー */
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pick(ev) {
  if (!renderer) return null;
  const r = canvas.getBoundingClientRect();
  ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const h = ray.intersectObjects(pickables.filter(m => m.visible), false)[0];
  return h ? h.object.userData.pid : null;
}
let down = null;
canvas.addEventListener('pointerdown', e => {
  down = e.button === 0 ? { x: e.clientX, y: e.clientY, t: performance.now() } : null;
});
canvas.addEventListener('pointerup', e => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  const quick = performance.now() - down.t < 450; down = null;
  if (moved > 7 || !quick) return;
  const id = pick(e);
  solo = (id && EX.targets.some(t => t.id === id)) ? (solo === id ? null : id) : null;
  renderMuscles(); paint();
});
canvas.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse' || down) return;
  const id = pick(e);
  if (id) {
    const r = stage.getBoundingClientRect();
    const t = EX.targets.find(x => x.id === id);
    tipEl.textContent = rec[id].part.jp + (t ? '（' + t.role + '）' : '');
    tipEl.style.left = (e.clientX - r.left) + 'px';
    tipEl.style.top = (e.clientY - r.top) + 'px';
    tipEl.classList.add('show');
    canvas.style.cursor = 'pointer';
  } else { tipEl.classList.remove('show'); canvas.style.cursor = 'grab'; }
});
canvas.addEventListener('pointerleave', () => tipEl.classList.remove('show'));

/* ───────── loop ───────── */
function resize() {
  if (!renderer) return;
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / Math.max(h, 1);
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
resize();

function updateGuide() {
  if (!EX.guide || extNow.amt < 0.25) { guideMat.opacity = 0; return; }
  const sh = new THREE.Vector3(), ft = new THREE.Vector3();
  joint['arm' + extNow.arm].getWorldPosition(sh);
  joint['foot' + extNow.leg].getWorldPosition(ft);
  const dir = ft.clone().sub(sh).normalize();
  const a = sh.clone().addScaledVector(dir, -26), b = ft.clone().addScaledVector(dir, 12);
  guideGeo.setFromPoints([a, b]);
  guide.computeLineDistances();
  guideMat.opacity = Math.min((extNow.amt - 0.25) / 0.3, 1) * 0.85;
}

if (renderer) renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (playing) {
    phase = (phase + dt * speed / EX.cycle) % 1;
    scrub.value = Math.round(phase * 1000);
  }
  const s = sampleTimeline(phase);
  applyPose(s.pose);
  extNow = { amt: s.amt, arm: s.side.arm, leg: s.side.leg };
  if (s.label !== label) {
    label = s.label;
    document.getElementById('phase').textContent = label;
  }
  paint();
  updateBars();
  scene.updateMatrixWorld(true);
  updateGuide();
  controls.update();
  renderer.render(scene, camera);
});

/* ───────── init ───────── */
renderInfo();
renderMuscles();
paint();
bSide.textContent = VIEWS[1].n;
const load = document.getElementById('loading');
if (renderer) load.style.display = 'none';
else {
  load.innerHTML = '3D表示を開始できませんでした。<br>右のテキスト（狙い・やり方・意識すること・使用筋）はそのまま読めます。<br>'
    + '<span style="font-size:9px;color:#aaa">' + glError + '</span><br>'
    + '<button onclick="location.reload()" style="margin-top:8px;font-size:11px;padding:5px 12px;border:1px solid #d8d8d8;background:#fff;border-radius:7px;cursor:pointer">再読み込み</button>';
  canvas.style.display = 'none';
  document.querySelector('.playbar').style.display = 'none';
  document.querySelector('.stage-tools').style.display = 'none';
  document.getElementById('hint').style.display = 'none';
  stage.style.height = '150px';
}
window.__wk = { camera, controls, joint, rec, EX, applyPose, setPhase: p => { phase = p; }, pause: () => { playing = false; } };

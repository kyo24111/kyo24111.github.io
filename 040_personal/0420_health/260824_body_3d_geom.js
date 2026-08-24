/* Body Atlas 3D — geometry library
   人体の「断面テーブル」を1つ持ち、そこから
     shell : 体表に沿って巻きつく板状筋（大胸筋・広背筋・僧帽筋など）
     loft  : 曲線に沿って中央が膨らむ紡錘形の筋腹（二頭筋・大腿四頭筋など）
     body  : 断面をそのまま閉じた体の輪郭
   を生成する。断面を共有するので、筋も骨も輪郭も互いにズレない。            */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const D = Math.PI / 180;
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

/* ───────── 体幹の断面テーブル ─────────
   [ y, a=半幅, b=半奥行, cz=前後中心, pow=角ばり(2=楕円/大きいほど四角) ] */
const TORSO_ST = [
  [ 80, 15.6, 10.8, -0.6, 2.5],
  [ 88, 16.4, 11.0, -0.8, 2.5],
  [ 95, 16.6, 10.8, -0.9, 2.5],
  [101, 15.8, 10.2, -0.7, 2.4],
  [107, 14.0,  9.5, -0.4, 2.3],
  [113, 13.2,  9.2, -0.1, 2.3],
  [119, 14.2,  9.8,  0.1, 2.3],
  [125, 15.4, 10.4,  0.2, 2.3],
  [131, 15.7, 10.5,  0.2, 2.3],
  [137, 15.0,  9.9,  0.1, 2.3],
  [143, 13.2,  8.8, -0.1, 2.2],
  [148, 10.8,  7.6, -0.5, 2.2],
  [153,  6.6,  5.8, -0.9, 2.2],
  [158,  5.6,  5.4, -1.0, 2.2],
];

/* y から断面パラメータを線形補間 */
export function torsoAt(y) {
  const T = TORSO_ST;
  if (y <= T[0][0]) return { a: T[0][1], b: T[0][2], cz: T[0][3], pow: T[0][4] };
  const last = T[T.length - 1];
  if (y >= last[0]) return { a: last[1], b: last[2], cz: last[3], pow: last[4] };
  for (let i = 0; i < T.length - 1; i++) {
    if (y >= T[i][0] && y <= T[i + 1][0]) {
      const k = (y - T[i][0]) / (T[i + 1][0] - T[i][0]);
      const s = k * k * (3 - 2 * k);                       // smoothstep で段差を消す
      return { a: lerp(T[i][1], T[i + 1][1], s), b: lerp(T[i][2], T[i + 1][2], s),
               cz: lerp(T[i][3], T[i + 1][3], s), pow: lerp(T[i][4], T[i + 1][4], s) };
    }
  }
}

/* 断面上の点。phi: 0=正面(+z) / 90=左(+x) / 180=背面(-z) */
function sect(y, phi, base) {
  const s = base || torsoAt(y);
  const e = 2 / s.pow;
  const sn = Math.sin(phi * D), cs = Math.cos(phi * D);
  const x = (s.cx || 0) + s.a * Math.sign(sn) * Math.pow(Math.abs(sn), e);
  const z = s.cz + s.b * Math.sign(cs) * Math.pow(Math.abs(cs), e);
  return new THREE.Vector2(x, z);
}
/* 断面の外向き法線（数値微分） */
function sectN(y, phi, base) {
  const p0 = sect(y, phi - 2, base), p1 = sect(y, phi + 2, base);
  const t = p1.clone().sub(p0);
  const n = new THREE.Vector2(t.y, -t.x).normalize();
  const c = new THREE.Vector2((base?.cx) || 0, (base || torsoAt(y)).cz);
  const p = sect(y, phi, base);
  return n.dot(p.clone().sub(c)) < 0 ? n.negate() : n;
}

/* 配列ステーションの Catmull-Rom 補間（成分ごと） */
function interpSt(st, t) {
  const n = st.length;
  if (n === 1) return st[0].slice();
  const x = clamp(t, 0, 1) * (n - 1);
  const i = Math.min(Math.floor(x), n - 2), k = x - i;
  const p0 = st[Math.max(i - 1, 0)], p1 = st[i], p2 = st[i + 1], p3 = st[Math.min(i + 2, n - 1)];
  const out = [];
  for (let c = 0; c < p1.length; c++) {
    const a0 = p0[c] ?? p1[c], a1 = p1[c], a2 = p2[c] ?? p1[c], a3 = p3[c] ?? a2;
    out.push(0.5 * ((2 * a1) + (-a0 + a2) * k + (2 * a0 - 5 * a1 + 4 * a2 - a3) * k * k
                    + (-a0 + 3 * a1 - 3 * a2 + a3) * k * k * k));
  }
  return out;
}

/* ───────── shell : 体表に巻きつく板状の筋 ─────────
   st: [ y, phi0, phi1, off(浮き上がり), th(厚み), a?, b?, cz?, cx? ]
   縁と両端は薄くテーパーさせ、板ではなく筋腹に見せる                        */
export function shellGeo(spec) {
  const st = spec.st, NV = spec.nv || 18, NU = spec.nu || 22;
  const pos = [], idx = [];
  const rowsO = [], rowsI = [];
  for (let iv = 0; iv <= NV; iv++) {
    const v = iv / NV;
    const s = interpSt(st, v);
    const [y, f0, f1, off, th] = s;
    const base = s.length > 5 ? { a: s[5], b: s[6], cz: s[7] ?? 0, cx: s[8] ?? 0, pow: spec.pow || 2.2 } : null;
    const fadeV = Math.pow(Math.sin(Math.PI * clamp(v, 0.001, 0.999)), spec.tv ?? 0.32);
    const ro = [], ri = [];
    for (let iu = 0; iu <= NU; iu++) {
      const u = iu / NU;
      const phi = lerp(f0, f1, u);
      const fadeU = Math.pow(Math.sin(Math.PI * clamp(u, 0.001, 0.999)), spec.tu ?? 0.42);
      const p = sect(y, phi, base), n = sectN(y, phi, base);
      const t = th * fadeU * fadeV;
      ro.push([p.x + n.x * (off + t), y, p.y + n.y * (off + t)]);
      ri.push([p.x + n.x * off, y, p.y + n.y * off]);
    }
    rowsO.push(ro); rowsI.push(ri);
  }
  const push = (rows) => { const start = pos.length / 3; rows.forEach(r => r.forEach(p => pos.push(p[0], p[1], p[2]))); return start; };
  const O = push(rowsO), I = push(rowsI);
  const W = NU + 1;
  const quad = (a, b, c, d) => idx.push(a, b, c, a, c, d);
  for (let iv = 0; iv < NV; iv++) for (let iu = 0; iu < NU; iu++) {
    const o = O + iv * W + iu, i2 = I + iv * W + iu;
    quad(o, o + W, o + W + 1, o + 1);                  // 外面
    quad(i2, i2 + 1, i2 + W + 1, i2 + W);              // 内面
  }
  for (let iv = 0; iv < NV; iv++) {                    // 左右の縁を塞ぐ
    const o = O + iv * W, i2 = I + iv * W;
    quad(i2, i2 + W, o + W, o);                        // phi0 側
    const o2 = o + NU, i3 = i2 + NU;
    quad(o2, o2 + W, i3 + W, i3);                      // phi1 側
  }
  for (let iu = 0; iu < NU; iu++) {                    // 上下の縁
    const o = O + iu, i2 = I + iu;
    quad(o, o + 1, i2 + 1, i2);
    const o2 = O + NV * W + iu, i3 = I + NV * W + iu;
    quad(o2, i3, i3 + 1, o2 + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ───────── loft : 曲線に沿った紡錘形の筋腹 ─────────
   p: 中心線の制御点 / r: [[t, 奥行, 幅], ...] / up: 断面の向きの基準       */
export function loftGeo(spec) {
  const pts = spec.p.map(v => new THREE.Vector3(v[0], v[1], v[2]));
  const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', spec.tension ?? 0.4);
  const NV = spec.nv || 26, NU = spec.nu || 18;
  const up0 = new THREE.Vector3(...(spec.up || [0, 0, 1])).normalize();
  const pos = [], idx = [];
  const twist = spec.twist || 0;
  for (let iv = 0; iv <= NV; iv++) {
    const t = iv / NV;
    const c = curve.getPointAt(t), T = curve.getTangentAt(t).normalize();
    let N = up0.clone().sub(T.clone().multiplyScalar(up0.dot(T)));
    if (N.lengthSq() < 1e-6) N.set(1, 0, 0).sub(T.clone().multiplyScalar(T.x));
    N.normalize();
    const B = new THREE.Vector3().crossVectors(T, N).normalize();
    const [, d, w] = interpSt(spec.r, t);
    const rot = twist * D * t;
    for (let iu = 0; iu <= NU; iu++) {
      const th = (iu / NU) * Math.PI * 2 + rot;
      const p = c.clone()
        .add(N.clone().multiplyScalar(Math.max(d, 0.02) * Math.cos(th)))
        .add(B.clone().multiplyScalar(Math.max(w, 0.02) * Math.sin(th)));
      pos.push(p.x, p.y, p.z);
    }
  }
  const W = NU + 1;
  for (let iv = 0; iv < NV; iv++) for (let iu = 0; iu < NU; iu++) {
    const a = iv * W + iu;
    idx.push(a, a + W, a + W + 1, a, a + W + 1, a + 1);
  }
  const capA = pos.length / 3; const pa = curve.getPointAt(0); pos.push(pa.x, pa.y, pa.z);
  const capB = pos.length / 3; const pb = curve.getPointAt(1); pos.push(pb.x, pb.y, pb.z);
  for (let iu = 0; iu < NU; iu++) {
    idx.push(capA, iu + 1, iu);
    const o = NV * W;
    idx.push(capB, o + iu, o + iu + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ───────── dome : 横隔膜・骨盤底のようなお椀 ───────── */
export function domeGeo(b) {
  const g = new THREE.SphereGeometry(1, b.seg || 30, b.seg2 || 14, 0, Math.PI * 2, 0, Math.PI / 2 * (b.open ?? 1.15));
  g.scale(b.r[0], b.r[1] * (b.fl ? -1 : 1), b.r[2]);
  if (b.fl) g.scale(-1, 1, 1);                          // 反転で法線の巻きを戻す
  if (b.q) { g.rotateX((b.q[0] || 0) * D); g.rotateY((b.q[1] || 0) * D); g.rotateZ((b.q[2] || 0) * D); }
  g.translate(b.p[0], b.p[1], b.p[2]);
  return g;
}

/* ───────── 体の輪郭（断面テーブルをそのまま閉じる） ───────── */
export function bodyGeo(spec) {
  const y0 = spec.y0, y1 = spec.y1, NV = spec.nv || 44, NU = spec.nu || 44;
  const pos = [], idx = [];
  for (let iv = 0; iv <= NV; iv++) {
    const y = lerp(y0, y1, iv / NV);
    const grow = spec.sc ? interpSt(spec.sc, iv / NV)[1] : 1;
    for (let iu = 0; iu <= NU; iu++) {
      const phi = (iu / NU) * 360;
      const s = torsoAt(y);
      const p = sect(y, phi, { a: s.a * grow, b: s.b * grow, cz: s.cz, pow: s.pow });
      pos.push(p.x, y, p.y);
    }
  }
  const W = NU + 1;
  for (let iv = 0; iv < NV; iv++) for (let iu = 0; iu < NU; iu++) {
    const a = iv * W + iu;
    idx.push(a, a + W, a + W + 1, a, a + W + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}

/* ───────── 基本形状（小さな器官・骨端など） ───────── */
export function ellGeo(b) {
  const g = new THREE.SphereGeometry(1, b.seg || 26, b.seg2 || 18);
  g.scale(b.r[0], b.r[1], b.r[2]);
  if (b.q) { g.rotateX(b.q[0] * D); g.rotateY(b.q[1] * D); g.rotateZ(b.q[2] * D); }
  g.translate(b.p[0], b.p[1], b.p[2]);
  return g;
}
export function capGeo(b) {
  const A = new THREE.Vector3(...b.a), B = new THREE.Vector3(...b.b);
  const dir = B.clone().sub(A), len = dir.length();
  const g = new THREE.CapsuleGeometry(b.r, len, 8, 20);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize()));
  const mid = A.clone().add(B).multiplyScalar(0.5);
  g.translate(mid.x, mid.y, mid.z);
  return g;
}
/* 平たい板（肩甲骨・腸骨など）: 輪郭点列を押し出して角を丸める */
export function plateGeo(b) {
  const shape = new THREE.Shape(b.o.map(v => new THREE.Vector2(v[0], v[1])));
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: b.d, bevelEnabled: true, bevelSize: b.bs ?? 0.45, bevelThickness: b.bt ?? 0.35, bevelSegments: 3, curveSegments: 6
  });
  g.translate(0, 0, -b.d / 2);
  if (b.q) { g.rotateX((b.q[0] || 0) * D); g.rotateY((b.q[1] || 0) * D); g.rotateZ((b.q[2] || 0) * D); }
  g.translate(b.p[0], b.p[1], b.p[2]);
  return g;
}

const BUILDERS = { s: shellGeo, l: loftGeo, e: ellGeo, c: capGeo, p: plateGeo, d: domeGeo, body: bodyGeo };

/* 属性を position/normal だけに揃える。
   ビルトイン形状(uv付き)と自作形状(uv無し)は、揃えないと merge できない */
function normalize(g) {
  Object.keys(g.attributes).forEach(k => { if (k !== 'position' && k !== 'normal') g.deleteAttribute(k); });
  if (!g.attributes.normal) g.computeVertexNormals();
  if (!g.index) {                                       // 非indexed(ExtrudeGeometry等)に自明なindexを付ける
    const n = g.attributes.position.count;
    const arr = n > 65535 ? new Uint32Array(n) : new Uint16Array(n);
    for (let i = 0; i < n; i++) arr[i] = i;
    g.setIndex(new THREE.BufferAttribute(arr, 1));
  }
  g.clearGroups();
  return g;
}

export function buildSpec(spec) {
  const gs = spec.map(b => {
    const f = BUILDERS[b.t];
    if (!f) throw new Error('unknown geometry type: ' + b.t);
    const g = normalize(f(b));
    if (b.mv) g.translate(b.mv[0], b.mv[1], b.mv[2]);
    return g;
  });
  return gs.length === 1 ? gs[0] : mergeGeometries(gs, false);
}

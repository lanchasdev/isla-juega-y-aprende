/* memoria-x12 — Encaja la pieza que le falta al puzle */
(function () {
'use strict';
const K = window.Kids, U = K.util;
const W = 320, H = 240;
let uid = 0;

/* dibuja un dibujo del catálogo anidado en la escena */
function art(name, x, y, s, flip, ...args) {
  let a = K.art.get(name, ...args).replace(/^\s*<svg/, `<svg x="${x}" y="${y}" width="${s}" height="${s}" overflow="visible"`);
  return flip ? `<g transform="translate(${2 * x + s} 0) scale(-1 1)">${a}</g>` : a;
}
const sky = (c1, c2) => `<defs><linearGradient id="mx12-sk${c1.slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#mx12-sk${c1.slice(1)})"/>`;
const hill = (c, y, k) => `<path d="M-10 ${H} V${y} Q${80 + k} ${y - 46} ${160} ${y - 6} T${W + 10} ${y - 10} V${H}Z" fill="${c}"/>`;

/* Escenas: bg + lista de capas (cada capa devuelve svg). spots: centros de interés para recortes (el primero es el hueco) */
const SCENES = [
  { n: 'granja', draw: () => sky('#BFE6FF', '#F4FBFF') + hill('#9FDB8B', 168, 0) + `<rect x="0" y="186" width="${W}" height="60" fill="#86CC74"/>` +
      art('sun', 16, 10, 52) + art('cloud', 210, 14, 60) + art('tree', 236, 82, 84) + art('cow', 100, 74, 112) + art('sheep', 22, 128, 66) + art('flower', 40, 190, 34, 0, '#FF7EA8') + art('flower', 250, 192, 30, 0, '#FFD23F') + art('hen', 190, 160, 46, 1),
    spots: [[156, 130], [48, 160], [264, 120], [44, 40], [240, 40], [270, 205]] },
  { n: 'casita', draw: () => sky('#CDEBFF', '#FFF6DA') + hill('#A4E08E', 180, 10) + `<rect x="0" y="198" width="${W}" height="50" fill="#8FD37D"/>` +
      art('rainbow', 30, 0, 130) + art('cloud', 230, 12, 56) + art('house', 90, 66, 130) + art('tree', 6, 96, 84) + art('tree', 244, 104, 70) + art('flower', 214, 196, 32, 0, '#E86FD0') + art('flower', 60, 200, 30, 0, '#FF7E69') + art('ball', 160, 188, 34),
    spots: [[155, 140], [90, 80], [52, 140], [278, 140], [180, 190], [250, 40]] },
  { n: 'mar', draw: () => sky('#9ED9F5', '#E5F6FF') + `<rect y="110" width="${W}" height="130" fill="#3FA9DE"/><path d="M0 128 Q20 118 40 128 T80 128 T120 128 T160 128 T200 128 T240 128 T280 128 T320 128" fill="none" stroke="#BDE8FF" stroke-width="4" stroke-linecap="round"/><rect y="200" width="${W}" height="40" fill="#F6E3AE"/>` +
      art('sun', 252, 6, 56) + art('cloud', 24, 10, 60) + art('boat', 100, 62, 96) + art('whale', 14, 128, 82) + art('fish', 196, 140, 48) + art('crab', 236, 190, 50) + art('dolphin', 188, 90, 62, 1),
    spots: [[150, 110], [56, 168], [220, 164], [280, 40], [50, 40], [262, 214]] },
  { n: 'bosque', draw: () => sky('#D3F0FF', '#F1FFE8') + `<rect x="0" y="176" width="${W}" height="70" fill="#8ED070"/>` +
      art('tree', -6, 56, 110) + art('tree', 218, 50, 112) + art('bear', 110, 96, 98) + art('rabbit', 46, 150, 56) + art('fox', 234, 142, 68, 1) + art('butterfly', 108, 40, 36) + art('leaf', 190, 66, 30) + art('flower', 170, 196, 30, 0, '#FF7EA8'),
    spots: [[160, 146], [60, 100], [270, 100], [60, 180], [270, 190], [125, 56]] }
];

const KNOB = 'M0 0H.35C.35-.12 .3-.2 .5-.2C.7-.2 .65-.12 .65 0H1V.35C1.12.35 1.2.3 1.2.5C1.2.7 1.12.65 1 .65V1H.65C.65 1.12 .7 1.2 .5 1.2C.3 1.2 .35 1.12 .35 1H0V.65C-.12.65 -.2.7 -.2.5C-.2.3 -.12.35 0 .35Z';
const pieceTr = (x, y, s) => `translate(${x} ${y}) scale(${s})`;

/* L3: dos grupos gemelos de globos/flores; el de la derecha tiene hueco en el del medio */
const PAL = ['#E03131', '#3B82F6', '#FFC31F', '#3DBE6B', '#F06FB6', '#8C7BE0', '#FF8A3D'];
function twin(kind, cols, mid) {
  const grp = (cx, c) => {
    const it = (p, col) => kind === 'balloon' ? art('balloon', p[0], p[1], 66, 0, col) : art('flower', p[0], p[1], 62, 0, col);
    const y0 = kind === 'balloon' ? 70 : 108;
    return it([cx - 66, y0 + 22], c[0]) + it([cx + 6, y0 + 22], c[2]) + it([cx - 30, y0], c[1]);
  };
  const bg = kind === 'balloon' ? sky('#CFEBFF', '#FFF2D6') + art('cloud', 120, 6, 70) + art('sun', 252, 8, 46) + `<rect y="206" width="${W}" height="40" fill="#92D57D"/>` :
    sky('#D7EEFF', '#F6FFE8') + `<rect y="168" width="${W}" height="80" fill="#8ED070"/>` + art('sun', 18, 8, 50) + art('butterfly', 150, 40, 40);
  return bg + grp(82, cols) + grp(238, [cols[0], mid, cols[2]]);
}

function makeRound(level) {
  const sz = level === 1 ? 92 : level === 2 ? 72 : 56;
  let drawFull, hx, hy, pieces, kind;
  if (level < 3) {
    const sc = U.pick(SCENES); drawFull = sc.draw;
    const [cx, cy] = sc.spots[0];
    hx = Math.round(cx - sz / 2 + U.rnd(-6, 6)); hy = Math.round(cy - sz / 2 + U.rnd(-6, 6));
    hx = Math.max(20, Math.min(W - sz - 20, hx)); hy = Math.max(20, Math.min(H - sz - 20, hy));
    const dis = [];
    if (level === 1) { /* recortes de otros sitios de la escena: muy distintos */
      const others = U.shuffle(sc.spots.slice(1));
      for (const [ox, oy] of others) { if (dis.length >= 2) break; const x = Math.max(20, Math.min(W - sz - 20, Math.round(ox - sz / 2))), y = Math.max(20, Math.min(H - sz - 20, Math.round(oy - sz / 2))); if (Math.hypot(x - hx, y - hy) > sz * .95 && dis.every(p => Math.hypot(p[0] - x, p[1] - y) > sz * .8)) dis.push([x, y]); }
    } else { /* mismos colores: la misma zona desplazada, el borde no cuadra */
      const dirs = U.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]);
      for (const [dx, dy] of dirs) { if (dis.length >= 3) break; const d = sz * U.pick([.4, .5]); const x = Math.round(hx + dx * d), y = Math.round(hy + dy * d);
        if (x < 6 || y < 6 || x + sz > W - 6 || y + sz > H - 6) continue; if (dis.every(p => Math.hypot(p[0] - x, p[1] - y) > sz * .3)) dis.push([x, y]); }
    }
    pieces = [{ x: hx, y: hy, ok: true, draw: drawFull }, ...dis.map(p => ({ x: p[0], y: p[1], ok: false, draw: drawFull }))];
  } else {
    kind = U.pick(['balloon', 'flower']);
    const cols = U.sample(PAL, 3);
    const rest = PAL.filter(c => c !== cols[1]);
    const near = U.sample(rest, 3);
    drawFull = null;
    const cx = 238, cy = kind === 'balloon' ? 96 : 134;
    hx = Math.round(cx - sz / 2); hy = Math.round(cy - sz / 2);
    pieces = [{ x: hx, y: hy, ok: true, draw: () => twin(kind, cols, cols[1]) }, ...near.map(c => ({ x: hx, y: hy, ok: false, draw: () => twin(kind, cols, c) }))];
    drawFull = () => twin(kind, cols, cols[1]);
  }
  return { sz, hx, hy, drawFull, pieces: U.shuffle(pieces), level };
}

K.css(`
.g-memoria-x12{gap:.8rem}
.g-memoria-x12 .pz{position:relative;width:min(94%,calc(44vh*1.3333),42rem);aspect-ratio:4/3;background:#fff;border:.4rem solid #fff;border-radius:1.6rem;box-shadow:0 .4rem 0 var(--line);flex:none}
.g-memoria-x12 .pz svg.scene{width:100%;height:100%;display:block;border-radius:1.2rem}
.g-memoria-x12 .hole{position:absolute;border-radius:1rem;transition:background .2s}
.g-memoria-x12 .hole.hot{background:rgba(255,211,63,.35)}
.g-memoria-x12 .pz.solved .holeshape{opacity:0}
.g-memoria-x12 .holeshape{transition:opacity .4s}
.g-memoria-x12 .pcs{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap}
.g-memoria-x12 .pcs button{width:var(--pw);height:var(--pw);background:#fff;border-radius:1.2rem;box-shadow:0 .3rem 0 var(--line);padding:.15rem;transition:transform .15s}
.g-memoria-x12 .pcs button svg{width:100%;height:100%;display:block;pointer-events:none;overflow:visible}
.g-memoria-x12 .pcs button.dragging{z-index:60}
.g-memoria-x12 .pcs button.bad{opacity:.4;background:#FFD3CF}
.g-memoria-x12 .pcs button.right{background:#BDEFC8}
.g-memoria-x12 .pcs button.help{animation:pulse 1s infinite;box-shadow:0 0 0 .25rem #F2B93B}
.g-memoria-x12 .pcs{--pw:min(21vw,16vh,8.5rem)}
@media (max-width:640px){.g-memoria-x12 .pcs{--pw:min(21vw,14vh)}.g-memoria-x12 .pcs{gap:.5rem}}
`);

K.game({
  id: 'memoria-x12', group: 'memoria', num: 16, title: 'Encaja la pieza que le falta al puzle',
  blurb: 'Busca la pieza que completa el dibujo.',
  how: 'Falta un trozo del dibujo. Mira las piezas de abajo y arrastra, o toca, la que encaja en el hueco.',
  icon: 'key', levels: ['Hueco grande', 'Colores parecidos', 'Casi iguales'], rounds: 4,
  round(g) {
    const R = makeRound(g.level), id = ++uid, sz = R.sz;
    g.ask(g.level === 3 ? 'Mira el otro grupo igual. ¿Qué pieza encaja en el hueco?' : '¿Qué pieza encaja en el hueco?');
    const pct = v => (v / W * 100) + '%';
    const clipId = 'mx12-c' + id;
    const full = R.drawFull();
    const holeSvg = `<g class="holeshape"><g transform="${pieceTr(R.hx, R.hy, sz)}"><path d="${KNOB}" fill="#F4EBD6" stroke="#B9A57A" stroke-width="2.5" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/></g></g>`;
    const pz = U.el(`<div class="pz"><svg class="scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="Dibujo con un hueco">${full}${holeSvg}</svg></div>`);
    const hole = U.el('<div class="hole"></div>');
    hole.style.left = ((R.hx - sz * .2) / W * 100) + '%'; hole.style.top = ((R.hy - sz * .2) / H * 100) + '%';
    hole.style.width = (sz * 1.4 / W * 100) + '%'; hole.style.height = (sz * 1.4 / H * 100) + '%';
    pz.appendChild(hole);
    const pcs = U.el('<div class="pcs"></div>');
    g.area.append(pz, pcs);
    let done = false;
    const btns = R.pieces.map((p, k) => {
      const cid = clipId + 'p' + k, vb = [p.x - sz * .22, p.y - sz * .22, sz * 1.44, sz * 1.44].map(v => v.toFixed(1)).join(' ');
      const b = U.el(`<button aria-label="Pieza ${k + 1}"><svg viewBox="${vb}"><defs><clipPath id="${cid}"><path d="${KNOB}" transform="${pieceTr(p.x, p.y, sz)}"/></clipPath></defs>
        <g transform="translate(1.5 2.5)" opacity=".28"><path d="${KNOB}" transform="${pieceTr(p.x, p.y, sz)}" fill="#14235B"/></g>
        <g clip-path="url(#${cid})">${p.draw()}</g>
        <path d="${KNOB}" transform="${pieceTr(p.x, p.y, sz)}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke" opacity=".9"/></svg></button>`);
      b._p = p; pcs.appendChild(b);
      const tryIt = () => {
        if (done || b.disabled) return false;
        if (p.ok) {
          done = true; b.classList.add('right'); pz.classList.add('solved'); K.sound.pop();
          btns.forEach(x => { if (x !== b) x.disabled = true; });
          b.style.visibility = 'hidden';
          g.t(() => g.right(), 500); return true;
        }
        b.classList.add('bad'); b.disabled = true; g.shake(b);
        g.wrong(g.level === 3 ? 'Casi... fíjate en los colores del otro grupo.' : 'Esa no encaja. Mira los bordes del hueco.'); return false;
      };
      K.drag(b, { targets: () => [hole], onDrop: () => { const ok = tryIt(); return ok; }, onTap: tryIt });
      return b;
    });
    g.helpHint = () => {
      const ok = btns.find(b => b._p.ok); if (!ok || done) return;
      btns.forEach(b => { if (!b._p.ok && !b.disabled) b.style.opacity = '.45'; });
      ok.classList.add('help'); g.toast('Una de las piezas brilla: ¡prueba con ella!'); g.say('Una de las piezas brilla. Prueba con ella.');
    };
  }
});
})();

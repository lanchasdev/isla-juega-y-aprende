/* Tangram fácil: forma figuras con las 7 piezas del tangram */
(function () {
'use strict';
const U = Kids.util;
/* Piezas estándar del tangram, en unidades de la red (cateto de la pequeña = 1):
   L grande (2 igual), M mediana, S pequeña (2), Q cuadrado, P paralelogramo. Total = 8. */
const CANON = { L: [[0, 0], [2, 0], [0, 2]], M: [[0, 0], [2, 0], [1, 1]], S: [[0, 0], [1, 0], [0, 1]], Q: [[0, 0], [1, 0], [1, 1], [0, 1]], P: [[0, 0], [1, 0], [2, 1], [1, 1]] };
const COLOR = { L: '#4C8DF6', M: '#5CC77A', S: '#FFD23F', Q: '#FF9F43', P: '#8C7BE0' };
const TNAME = { L: 'triángulo grande', M: 'triángulo mediano', S: 'triángulo pequeño', Q: 'cuadrado', P: 'paralelogramo' };
/* figuras: piezas ya colocadas (tipo + vértices) y el nombre */
const F = {
  barco: { n: 'un barco', pcs: [['Q', [2, 0, 3, 0, 3, 1, 2, 1]], ['L', [2, 3, 0, 3, 2, 1]], ['L', [2, 3, 2, 1, 4, 3]], ['M', [0, 3, 2, 3, 1, 4]], ['S', [2, 4, 1, 4, 2, 3]], ['P', [4, 3, 3, 3, 2, 4, 3, 4]], ['S', [2, 3, 3, 3, 2, 4]]] },
  casa: { n: 'una casa', pcs: [['L', [2, 2, 0, 2, 2, 0]], ['L', [2, 2, 2, 0, 4, 2]], ['P', [0, 2, 1, 2, 2, 3, 1, 3]], ['S', [0, 3, 0, 2, 1, 3]], ['M', [1, 2, 3, 2, 2, 3]], ['S', [3, 3, 2, 3, 3, 2]], ['Q', [3, 2, 4, 2, 4, 3, 3, 3]]] },
  gato: { n: 'un gato', pcs: [['L', [0, 2, 0, 0, 2, 2]], ['S', [3, 1, 2, 1, 3, 0]], ['M', [1, 1, 3, 1, 2, 2]], ['L', [3, 3, 1, 3, 3, 1]], ['Q', [0, 2, 1, 2, 1, 3, 0, 3]], ['S', [1, 2, 2, 2, 1, 3]], ['P', [4, 4, 4, 3, 3, 2, 3, 3]]] },
  pez: { n: 'un pez', pcs: [['L', [5, 2, 3, 2, 5, 0]], ['M', [1, 1, 1, 3, 0, 2]], ['P', [1, 1, 2, 1, 3, 2, 2, 2]], ['S', [1, 2, 1, 1, 2, 2]], ['Q', [1, 2, 2, 2, 2, 3, 1, 3]], ['S', [2, 2, 3, 2, 2, 3]], ['L', [5, 2, 5, 4, 3, 2]]] }
};
const pairs = a => { const r = []; for (let i = 0; i < a.length; i += 2) r.push([a[i], a[i + 1]]); return r; };
const norm = p => { const mx = Math.min(...p.map(a => a[0])), my = Math.min(...p.map(a => a[1])); return p.map(([x, y]) => [x - mx, y - my]); };
const key = p => norm(p).map(a => a.join()).sort().join('|');
/* orientación: giro (0..3, cuartos de vuelta a la derecha) + volteo */
function tf(type, rot, flip) {
  let p = CANON[type].map(([x, y]) => [flip ? -x : x, y]);
  for (let k = 0; k < rot; k++) p = p.map(([x, y]) => [-y, x]);
  return norm(p);
}
function validOr(type, targetPts) {
  const tk = key(targetPts), res = [];
  for (let f = 0; f < 2; f++) for (let r = 0; r < 4; r++) if (key(tf(type, r, f)) === tk) res.push([r, f]);
  return res;
}
function inPoly(p, [x, y]) {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; }
  return c;
}
const cen = p => [p.reduce((s, a) => s + a[0], 0) / p.length, p.reduce((s, a) => s + a[1], 0) / p.length];
const pts = p => p.map(a => a.join()).join(' ');
let figs = [];
Kids.css(`
.g-memoria-x5{padding:.5rem 1rem .8rem}
.g-memoria-x5 .tg-wrap{display:flex;align-items:center;justify-content:center;gap:1.4rem;width:100%}
.g-memoria-x5 .tg-wrap.col{flex-direction:column;gap:.7rem}
.g-memoria-x5 .tg-board{background:#fff;border-radius:1.6rem;border:.2rem solid var(--line);box-shadow:0 .4rem 0 var(--line);flex:none;touch-action:none}
.g-memoria-x5 .tg-board svg{display:block;width:100%;height:100%}
.g-memoria-x5 .tg-side{display:flex;flex-direction:column;align-items:center;gap:.7rem}
.g-memoria-x5 .tg-tray{display:grid;gap:.4rem;background:var(--gl);border-radius:1.4rem;padding:.5rem}
.g-memoria-x5 .tg-pc{background:#fff;border-radius:1rem;border:.2rem solid transparent;box-shadow:0 .25rem 0 rgba(20,35,91,.12);display:flex;align-items:center;justify-content:center;transition:transform .12s,border-color .12s}
.g-memoria-x5 .tg-pc svg{width:100%;height:100%;pointer-events:none;overflow:visible}
.g-memoria-x5 .tg-pc.sel{border-color:var(--g);transform:scale(1.07);box-shadow:0 0 0 .25rem var(--gl),0 .25rem 0 var(--g)}
.g-memoria-x5 .tg-pc.gone{visibility:hidden;pointer-events:none}
.g-memoria-x5 .tg-pc.dragging{z-index:9;position:relative}
.g-memoria-x5 .tg-ctl{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center}
.g-memoria-x5 .tg-hint{animation:pulse .7s infinite}
.game-screen:has(.g-memoria-x5) .toast{pointer-events:none}
`);
function trayPoly(type, rot, flip, tu) {
  const p = tf(type, rot, flip), w = Math.max(...p.map(a => a[0])), h = Math.max(...p.map(a => a[1]));
  const ox = (2.3 - w) / 2, oy = (2.3 - h) / 2;
  return `<svg viewBox="0 0 2.3 2.3"><polygon points="${pts(p.map(([x, y]) => [x + ox, y + oy]))}" fill="${COLOR[type]}" stroke="#fff" stroke-width=".07" stroke-linejoin="round"/></svg>`;
}
Kids.game({
  id: 'memoria-x5', group: 'memoria', num: 9, title: 'Tangram fácil',
  blurb: 'Coloca las siete piezas del tangram para formar un barco y otras figuras.',
  how: 'Toca una pieza de la bandeja, gírala si hace falta, y toca el sitio donde encaja en la figura. También puedes arrastrarla.',
  icon: 'boat', levels: ['Con colores', 'Solo el contorno', 'Solo la silueta'], rounds: 2,
  stars(m) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; },
  round(g, i) {
    const L = g.level;
    if (i === 0) { const rest = U.shuffle(['casa', 'gato', 'pez']); figs = L === 1 ? ['barco', rest[0]] : U.shuffle(['barco'].concat(rest)).slice(0, 2); }
    const fk = figs[i], fig = F[fk];
    g.ask('Forma ' + fig.n + ' con las piezas');
    /* objetivos */
    const T = fig.pcs.map(([type, flat], k) => { const p = pairs(flat); return { k, type, p, c: cen(p), ors: validOr(type, p), filled: false }; });
    const allx = T.flatMap(t => t.p.map(a => a[0])), ally = T.flatMap(t => t.p.map(a => a[1]));
    const vx = Math.min(...allx) - .5, vy = Math.min(...ally) - .5, vw = Math.max(...allx) - vx + .5, vh = Math.max(...ally) - vy + .5, ar = vw / vh;
    /* tamaños */
    const Wd = g.area.clientWidth - 8, Hd = g.area.clientHeight - 6, land = Wd > Hd * 1.15, cols = land ? 2 : 4, rows = Math.ceil(7 / cols);
    let bw;
    if (land) bw = Math.min(Wd * .56, Hd * ar * .98); else bw = Math.min(Wd, Hd * .52 * ar);
    const bh = bw / ar, bu = bw / vw;
    let cell = land ? Math.min(bu * 1.1, (Wd - bw - 40) / cols - 10, (Hd - 90) / rows - 6) : Math.min(bu * 1.1, (Wd - 20) / cols - 6, (Hd - bh - 110) / rows - 6);
    cell = Math.max(cell, 56);
    /* DOM */
    const root = U.el(`<div class="tg-wrap ${land ? '' : 'col'}">
      <div class="tg-board" style="width:${bw}px;height:${bh}px"><svg viewBox="${vx} ${vy} ${vw} ${vh}" role="img" aria-label="Silueta de ${fig.n}"></svg></div>
      <div class="tg-side"><div class="tg-tray" style="grid-template-columns:repeat(${cols},${cell}px)"></div>
        <div class="tg-ctl"><button class="btn blue sm" id="rot" aria-label="Girar la pieza">${Kids.icons.redo} Girar</button><button class="btn white sm" id="flip" aria-label="Dar la vuelta a la pieza" style="display:none">Dar la vuelta</button></div></div></div>`);
    g.area.appendChild(root);
    const svg = root.querySelector('svg'), tray = root.querySelector('.tg-tray'), board = root.querySelector('.tg-board');
    let sh = '';
    if (L === 3) sh = `<g fill="#CFC6EE" stroke="#CFC6EE" stroke-width=".05" stroke-linejoin="round">${T.map(t => `<polygon points="${pts(t.p)}"/>`).join('')}</g>`;
    else if (L === 2) sh = T.map(t => `<polygon points="${pts(t.p)}" fill="#F4F0FD" stroke="#9C8FD9" stroke-width=".05" stroke-dasharray=".16 .1" stroke-linejoin="round"/>`).join('');
    else sh = T.map(t => `<polygon points="${pts(t.p)}" fill="${COLOR[t.type]}" fill-opacity=".28" stroke="${COLOR[t.type]}" stroke-width=".06" stroke-linejoin="round"/>`).join('');
    svg.innerHTML = sh + '<g class="tg-placed"></g><g class="tg-hl"></g>';
    const placedG = svg.querySelector('.tg-placed'), hlG = svg.querySelector('.tg-hl');
    /* piezas de la bandeja: nivel 1 con la orientación correcta de un hueco suyo */
    const free = {}; T.forEach(t => (free[t.type] = free[t.type] || []).push(t));
    const P = U.shuffle(T.map(t => t.type)).map((type, k) => {
      let rot = U.rnd(0, 3), flip = type === 'P' ? U.rnd(0, 1) : 0;
      if (L === 1) { const t = free[type].shift(), o = t.ors[0]; rot = o[0]; flip = o[1]; }
      const el = U.el(`<button class="tg-pc" style="width:${cell}px;height:${cell}px" aria-label="Pieza: ${TNAME[type]}"></button>`);
      const pc = { type, rot, flip, el, placed: false };
      tray.appendChild(el); return pc;
    });
    const draw = pc => { pc.el.innerHTML = trayPoly(pc.type, pc.rot, pc.flip); };
    P.forEach(draw);
    let sel = null, hits = 0;
    const flipB = root.querySelector('#flip');
    function select(pc) {
      if (sel) sel.el.classList.remove('sel');
      sel = pc; if (pc) pc.el.classList.add('sel');
      flipB.style.display = pc && pc.type === 'P' ? '' : 'none';
    }
    P.forEach(pc => Kids.drag(pc.el, {
      targets: () => [board],
      onStart: () => select(pc),
      onTap: () => select(pc),
      onDrop: (t, el) => {
        const r = el.getBoundingClientRect(), b = svg.getBoundingClientRect();
        const x = vx + (r.left + r.width / 2 - b.left) / b.width * vw, y = vy + (r.top + r.height / 2 - b.top) / b.height * vh;
        drop(pc, [x, y]); return false;
      }
    }));
    root.querySelector('#rot').onclick = () => { if (!sel) { g.toast('Primero toca una pieza'); return; } sel.rot = (sel.rot + 1) % 4; draw(sel); Kids.sound.tap(); };
    flipB.onclick = () => { if (sel) { sel.flip ^= 1; draw(sel); Kids.sound.tap(); } };
    const fits = (pc, t) => t.type === pc.type && t.ors.some(o => o[0] === pc.rot && o[1] === pc.flip);
    function place(pc, t) {
      t.filled = true; pc.placed = true; hits++;
      placedG.insertAdjacentHTML('beforeend', `<polygon points="${pts(t.p)}" fill="${COLOR[t.type]}" stroke="#fff" stroke-width=".07" stroke-linejoin="round" style="animation:pop .4s;transform-box:fill-box;transform-origin:center"/>`);
      pc.el.classList.remove('sel'); pc.el.classList.add('gone'); pc.el.dataset.locked = 1; sel = null; flipB.style.display = 'none';
      Kids.sound.pop();
      if (hits === T.length) g.t(() => g.right('¡Has formado ' + fig.n + '!'), 400);
    }
    function attempt(pc, t) {
      if (t.type !== pc.type) { g.shake(pc.el); g.wrong('Esa pieza no es de ahí, ¡prueba otra!'); return; }
      if (!fits(pc, t)) { g.shake(pc.el); g.toast('Casi… ¡gira o da la vuelta a la pieza!'); return; }
      place(pc, t);
    }
    /* soltar arrastrando: imán a la posición correcta cercana, o intento sobre el hueco que toca */
    function drop(pc, pt) {
      const cand = T.filter(t => !t.filled && fits(pc, t)).map(t => ({ t, d: Math.hypot(t.c[0] - pt[0], t.c[1] - pt[1]) })).sort((a, b) => a.d - b.d)[0];
      if (cand && cand.d < 1.15) { place(pc, cand.t); return; }
      const under = T.find(t => !t.filled && inPoly(t.p, pt));
      if (under) attempt(pc, under);
    }
    /* tocar el tablero: colocar la pieza elegida */
    board.addEventListener('click', e => {
      const b = svg.getBoundingClientRect();
      const pt = [vx + (e.clientX - b.left) / b.width * vw, vy + (e.clientY - b.top) / b.height * vh];
      const t = T.find(t => !t.filled && inPoly(t.p, pt));
      if (!t) return;
      if (!sel) { g.toast('Primero toca una pieza de la bandeja'); return; }
      attempt(sel, t);
    });
    g.helpHint = () => {
      const pc = sel || P.find(p => !p.placed);
      const t = T.find(t => !t.filled && t.type === pc.type);
      if (!t) return;
      hlG.innerHTML = `<polygon class="tg-hint" points="${pts(t.p)}" fill="#FFF3BF" fill-opacity=".8" stroke="#E0A800" stroke-width=".1"/>`;
      g.t(() => { hlG.innerHTML = ''; }, 2800);
    };
  }
});
})();

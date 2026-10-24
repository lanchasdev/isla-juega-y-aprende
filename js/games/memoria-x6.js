/* Sudoku de frutas 4x4 */
(function () {
'use strict';
const U = Kids.util;
const FR = ['apple', 'pear', 'orange', 'strawberry'];
const FN = ['la manzana', 'la pera', 'la naranja', 'la fresa'];
const GIVEN = { 1: 10, 2: 8, 3: 6 };

/* cuenta soluciones (hasta limit) de una cuadrícula de 16 con -1 = vacío */
function countSol(grid, limit) {
  const g = grid.slice(); let n = 0;
  const ok = (p, v) => {
    const r = p >> 2, c = p & 3, br = r & 2, bc = c & 2;
    for (let k = 0; k < 4; k++) if (g[r * 4 + k] === v || g[k * 4 + c] === v) return false;
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) if (g[(br + a) * 4 + bc + b] === v) return false;
    return true;
  };
  (function rec(p) {
    if (n >= limit) return;
    while (p < 16 && g[p] !== -1) p++;
    if (p === 16) { n++; return; }
    for (let v = 0; v < 4; v++) if (ok(p, v)) { g[p] = v; rec(p + 1); g[p] = -1; }
  })(0);
  return n;
}
/* cuadrícula resuelta aleatoria (permutando una base válida) */
function fullGrid() {
  const base = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]];
  const sym = U.shuffle([0, 1, 2, 3]);
  const band = U.shuffle([0, 1]), rin = [U.shuffle([0, 1]), U.shuffle([0, 1])];
  const rows = []; band.forEach(b => rin[b].forEach(r => rows.push(b * 2 + r)));
  const cb = U.shuffle([0, 1]), cin = [U.shuffle([0, 1]), U.shuffle([0, 1])];
  const cols = []; cb.forEach(b => cin[b].forEach(c => cols.push(b * 2 + c)));
  const g = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) g.push(sym[base[rows[r]][cols[c]]]);
  return g;
}
/* puzle con solución única y `target` casillas dadas */
function makePuzzle(target) {
  let best = null;
  for (let t = 0; t < 300; t++) {
    const sol = fullGrid(), p = sol.slice(); let given = 16;
    for (const i of U.shuffle(U.range(16))) {
      if (given <= target) break;
      const keep = p[i]; p[i] = -1;
      if (countSol(p, 2) === 1) given--; else p[i] = keep;
    }
    if (!best || given < best.given) best = { sol, p: p.slice(), given };
    if (given <= target) break;
  }
  return best;
}
/* 8 puzles de reserva ya verificados al cargar (por si algo fallara) */
function conflictsOf(v) {
  const bad = new Set();
  for (let a = 0; a < 16; a++) {
    if (v[a] < 0) continue;
    for (let b = a + 1; b < 16; b++) {
      if (v[b] !== v[a]) continue;
      const ra = a >> 2, ca = a & 3, rb = b >> 2, cb = b & 3;
      if (ra === rb || ca === cb || ((ra >> 1) === (rb >> 1) && (ca >> 1) === (cb >> 1))) { bad.add(a); bad.add(b); }
    }
  }
  return bad;
}

Kids.css(`
.g-memoria-x6{gap:.8rem}
.g-memoria-x6 .sd{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1rem 2rem;width:100%}
.g-memoria-x6 .sd-board{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:.45rem;background:var(--g);padding:.45rem;border-radius:1.6rem;box-shadow:0 .4rem 0 var(--gd);width:min(23rem,86vw,47vh);aspect-ratio:1}
.g-memoria-x6 .sd-box{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;min-height:0;min-width:0;gap:.25rem;background:var(--gl);padding:.25rem;border-radius:1rem}
.g-memoria-x6 .sd-c{background:#fff;border-radius:.7rem;display:flex;align-items:center;justify-content:center;padding:6%;position:relative;transition:background .2s,transform .12s;min-width:0;min-height:0}
.g-memoria-x6 .sd-c svg{width:100%;height:100%}
.g-memoria-x6 .sd-c.fx{background:#FFF1C9;box-shadow:inset 0 0 0 .18rem #E8C46A}
.g-memoria-x6 .sd-c.fx::after{content:'';position:absolute;right:.2rem;top:.2rem;width:.45rem;height:.45rem;border-radius:50%;background:#E8C46A}
.g-memoria-x6 .sd-c.sel{background:#DDEBFF;box-shadow:inset 0 0 0 .22rem var(--blue);transform:scale(1.04);z-index:2}
.g-memoria-x6 .sd-c.dup{background:#FFE0D3;box-shadow:inset 0 0 0 .2rem #FF9A6B}
.g-memoria-x6 .sd-c.oops{background:#FFE9B8;box-shadow:inset 0 0 0 .2rem #F2B93B;animation:shake .4s}
.g-memoria-x6 .sd-c.hint{animation:pop .6s}
.g-memoria-x6 .sd-side{display:flex;flex-direction:column;align-items:center;gap:.8rem}
.g-memoria-x6 .sd-pal{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem}
.g-memoria-x6 .sd-f{width:4.6rem;height:4.6rem;background:#fff;border-radius:1.2rem;padding:.35rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);display:flex;align-items:center;justify-content:center;transition:transform .12s}
.g-memoria-x6 .sd-f svg{width:100%;height:100%}
.g-memoria-x6 .sd-f.on{background:#DDEBFF;border-color:var(--blue);transform:translateY(-.25rem) scale(1.06);box-shadow:0 .45rem 0 var(--blue)}
.g-memoria-x6 .sd-f.er{color:var(--ink2)}
.g-memoria-x6 .sd-f.er svg{width:70%;height:70%}
.g-memoria-x6 .sd-f.cnt{opacity:.45}
@media (max-width:640px){.g-memoria-x6 .sd-pal{grid-template-columns:repeat(5,1fr)}.g-memoria-x6 .sd-f{width:3.6rem;height:3.6rem}}
`);
const ERASER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16l9-10a2 2 0 013 0l3 3a2 2 0 010 3l-6 6H8z"/><path d="M8 20h12M7 11l6 6"/></svg>';

Kids.game({
  id: 'memoria-x6', group: 'memoria', num: 10,
  title: 'Sudoku de frutas',
  blurb: 'Pon las cuatro frutas en cada fila, columna y cuadro sin repetir.',
  how: 'Elige una fruta y toca una casilla vacía para ponerla. En cada fila, cada columna y cada cuadro de cuatro casillas tienen que estar las cuatro frutas, sin repetir ninguna.',
  icon: 'strawberry',
  levels: ['10 frutas puestas', '8 frutas puestas', '6 frutas puestas'],
  rounds: 1,
  stars(m) { return m <= 1 ? 3 : m <= 4 ? 2 : 1; },
  round(g) {
    const pz = makePuzzle(GIVEN[g.level]);
    const sol = pz.sol, v = pz.p.slice(), fixed = pz.p.map(x => x >= 0);
    let selCell = -1, brush = null; // brush: 0..3 fruta, 'x' goma
    g.ask('¿Qué fruta falta? ¡Que no se repita!');
    const root = U.el(`<div class="sd">
      <div class="sd-board" role="grid" aria-label="Tablero de 4 por 4"></div>
      <div class="sd-side">
        <div class="sd-pal">${FR.map((f, i) => `<button class="sd-f" data-f="${i}" aria-label="Poner ${FN[i]}">${Kids.art.get(f)}</button>`).join('')}<button class="sd-f er" data-f="x" aria-label="Borrar fruta">${ERASER}</button></div>
        <button class="btn sm" id="chk" aria-label="Comprobar el tablero">Comprobar</button>
      </div></div>`);
    g.area.appendChild(root);
    const board = root.querySelector('.sd-board');
    const boxes = U.range(4).map(() => { const b = U.el('<div class="sd-box"></div>'); board.appendChild(b); return b; });
    const cells = [];
    for (let i = 0; i < 16; i++) {
      const r = i >> 2, c = i & 3, b = ((r >> 1) << 1) + (c >> 1);
      const el = U.el(`<button data-i="${i}" class="sd-c ${fixed[i] ? 'fx' : ''}" aria-label="Casilla fila ${r + 1} columna ${c + 1}"></button>`);
      el.onclick = () => tapCell(i);
      boxes[b].appendChild(el); cells.push(el);
    }
    const fbtns = [...root.querySelectorAll('.sd-f')];
    function paint() {
      const bad = conflictsOf(v);
      cells.forEach((el, i) => {
        el.dataset.v = v[i]; el.innerHTML = v[i] >= 0 ? Kids.art.get(FR[v[i]]) : '';
        el.classList.toggle('sel', i === selCell);
        el.classList.toggle('dup', bad.has(i));
        if (!bad.has(i)) el.classList.remove('dup');
      });
      fbtns.forEach(b => b.classList.toggle('on', String(brush) === b.dataset.f));
      // fruta ya completa (4 usadas): se atenúa
      FR.forEach((_, f) => fbtns[f].classList.toggle('cnt', v.filter(x => x === f).length >= 4));
    }
    function place(i, val) {
      if (fixed[i]) { g.shake(cells[i]); return; }
      v[i] = val === 'x' ? -1 : (v[i] === val ? -1 : val);
      cells[i].classList.remove('oops'); K_tap();
      paint(); checkDone();
    }
    function K_tap() { Kids.sound.tap(); }
    function tapCell(i) {
      if (fixed[i]) { g.shake(cells[i]); g.toast('Esa fruta ya estaba puesta'); return; }
      if (brush !== null) { place(i, brush); return; }
      selCell = selCell === i ? -1 : i; Kids.sound.pop(); paint();
    }
    function tapFruit(f) {
      if (selCell >= 0) { const i = selCell; selCell = -1; place(i, f); return; }
      brush = String(brush) === String(f) ? null : (f === 'x' ? 'x' : +f); Kids.sound.pop(); paint();
    }
    fbtns.forEach(b => b.onclick = () => tapFruit(b.dataset.f === 'x' ? 'x' : +b.dataset.f));
    function checkDone() {
      if (v.every((x, i) => x === sol[i])) { cells.forEach(c => c.classList.add('hint')); g.right('¡Sudoku resuelto!'); }
    }
    root.querySelector('#chk').onclick = () => {
      const miss = v.map((x, i) => (x >= 0 && x !== sol[i]) ? i : -1).filter(i => i >= 0);
      const empty = v.filter(x => x < 0).length;
      if (miss.length) {
        miss.forEach(i => { cells[i].classList.remove('oops'); void cells[i].offsetWidth; cells[i].classList.add('oops'); });
        g.wrong('Mira las casillas amarillas: ahí hay que cambiar algo');
      } else if (empty) g.toast('¡Muy bien por ahora! Faltan ' + empty + ' casillas');
      else checkDone();
    };
    g.helpHint = () => {
      const cand = U.shuffle(U.range(16).filter(i => !fixed[i] && v[i] !== sol[i]));
      if (!cand.length) return;
      const i = cand[0]; v[i] = sol[i]; fixed[i] = false; selCell = -1; brush = null;
      paint(); cells[i].classList.add('hint'); g.toast('Te ayudo: he puesto ' + FN[sol[i]]); checkDone();
    };
    paint();
  }
});
})();

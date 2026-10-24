/* Mates x17 — Simetría */
(function () {
'use strict';
const U = Kids.util;
const COLS = ['#FF7EA8', '#4C8DF6', '#FFD23F', '#5CC77A', '#8C7BE0', '#FF9A4D'];
const NAMES = { '#FF7EA8': 'rosa', '#4C8DF6': 'azul', '#FFD23F': 'amarillo', '#5CC77A': 'verde', '#8C7BE0': 'lila', '#FF9A4D': 'naranja' };
/* silueta de la mitad izquierda: x 0 (borde) → 1 (eje), y 0 (arriba) → 1 (abajo) */
const FIG = {
  butterfly: { n: 'de la mariposa', f: (x, y) => (y < .55 && Math.pow((x - .5) / .55, 2) + Math.pow((y - .3) / .32, 2) < 1) || (y >= .45 && Math.pow((x - .62) / .42, 2) + Math.pow((y - .74) / .28, 2) < 1) || x > .86 },
  heart: { n: 'del corazón', f: (x, y) => { const X = (x - 1) * 1.25, Y = (.55 - y) * 1.6; return Math.pow(X * X + Y * Y - 1, 3) - X * X * Y * Y * Y < 0; } },
  tree: { n: 'del árbol', f: (x, y) => (Math.pow((x - .6) / .62, 2) + Math.pow((y - .36) / .42, 2) < 1) || (y > .68 && x > .72) },
  flower: { n: 'de la flor', f: (x, y) => (Math.hypot((x - 1) * 1.0, y - .36) < .55 && y < .72) || (y >= .62 && x > .86) || (y > .72 && x > .55 && x < .75 && y < .92) },
  house: { n: 'de la casa', f: (x, y) => (y < .42 && x >= 1 - (y / .42)) || (y >= .4 && x > .06) }
};

/* máscaras hechas a mano de la mitad izquierda (el eje está a la derecha de cada fila), por nº de filas */
const MASK = {
  butterfly: { 3: ['##.#', '####', '.#.#'], 4: ['###.#', '#####', '#####', '.##.#'], 5: ['##...#', '####.#', '######', '.###.#', '..##.#'] },
  heart: { 3: ['.##.', '####', '..##'], 4: ['.##..', '#####', '.####', '...##'], 5: ['.###..', '######', '######', '..####', '....##'] },
  tree: { 4: ['..###', '.####', '#####', '....#'], 5: ['...###', '..####', '.#####', '######', '.....#'] },
  house: { 3: ['...#', '####', '####'], 4: ['....#', '..###', '#####', '#.###'], 5: ['.....#', '...###', '.#####', '######', '#.####'] }
};

Kids.css(`
.g-mates-x17 .x17-wrap{display:flex;flex-direction:column;align-items:center;gap:.9rem}
.g-mates-x17 .x17-grid{position:relative;display:grid;gap:.18rem;padding:.6rem;background:#fff;border-radius:1.6rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line)}
.g-mates-x17 .x17-c{width:var(--cs);height:var(--cs);border-radius:.5rem;padding:0;border:.12rem solid #EFE6D2;background:#FBF6EA;transition:transform .1s,background .15s}
.g-mates-x17 .x17-c.src{border-color:rgba(20,35,91,.1);cursor:default}
.g-mates-x17 .x17-c.tgt:hover{transform:scale(1.07)}
.g-mates-x17 .x17-c.tgt{border:.15rem dashed #BFD0F2;background:#F3F7FF}
.g-mates-x17 .x17-c.paint{border:.12rem solid rgba(20,35,91,.1);animation:pop .25s}
.g-mates-x17 .x17-c.err{box-shadow:inset 0 0 0 .22rem #FF9A4D}
.g-mates-x17 .x17-c.hint{animation:pulse .9s infinite;box-shadow:0 0 0 .3rem #FFD23F;z-index:2}
.g-mates-x17 .x17-axis{position:absolute;top:.3rem;bottom:.3rem;width:0;border-left:.22rem dashed var(--g);left:50%;pointer-events:none;opacity:.85}
.g-mates-x17 .x17-tools{display:flex;gap:.7rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-mates-x17 .x17-col{width:3.6rem;height:3.6rem;border-radius:50%;border:.28rem solid #fff;box-shadow:0 .25rem 0 rgba(20,35,91,.2);padding:0}
.g-mates-x17 .x17-col.on{outline:.28rem solid var(--ink);transform:scale(1.15)}
.g-mates-x17 .x17-er{background:#fff;color:var(--ink);font-family:'Baloo 2';font-size:1.1rem;display:flex;align-items:center;justify-content:center}
.g-mates-x17 .x17-er svg{width:1.6rem;height:1.6rem}
.g-mates-x17 .x17-ok{font-size:1.3rem;padding:.35rem 1.4rem}
`);

function makePattern(R, C, fig, ncol) {
  const pal = U.sample(COLS, ncol), off = U.rnd(0, 5), mul = U.rnd(0, 1) ? 1 : 2;
  let cells;
  for (let t = 0; t < 8; t++) {
    cells = [];
    for (let r = 0; r < R; r++) { cells[r] = []; for (let c = 0; c < C; c++) {
      const x = (c + .5) / C, y = (r + .5) / R;
      const mk = MASK[fig] && MASK[fig][R];
      cells[r][c] = (mk ? mk[r][c] === '#' : FIG[fig].f(x, y)) ? pal[(r * mul + c * (t % 2 ? 3 : 1) + off + (t > 3 ? r * c : 0)) % ncol] : null;
    } }
    const cnt = cells.flat().filter(Boolean).length;
    if (cnt >= R * C * .5 && cnt <= R * C * .95) break;
    if (t === 7) cells = cells.map(row => row.map((v, c) => v || pal[0]));
  }
  // asegurar que se usan todos los colores
  const used = new Set(cells.flat().filter(Boolean));
  pal.forEach(p => { if (!used.has(p)) { const free = []; cells.forEach((row, r) => row.forEach((v, c) => { if (v) free.push([r, c]); })); const [r, c] = U.pick(free); cells[r][c] = p; } });
  return { cells, pal };
}

const FIGS_BY = { 1: ['butterfly', 'heart', 'house'], 2: ['butterfly', 'heart', 'tree', 'flower', 'house'], 3: ['butterfly', 'heart', 'tree', 'flower', 'house'] };
let lastFig = '';

Kids.game({
  id: 'mates-x17', group: 'mates', num: 22,
  title: 'Simetría',
  blurb: 'Pinta la otra mitad como si fuera un espejo.',
  how: 'La mitad izquierda ya está pintada. Elige un color y pinta la otra mitad igual, como un espejo.',
  icon: 'butterfly',
  levels: ['Pequeño, 2 colores', 'Mediano, 3 colores', 'Grande, 4 colores'],
  rounds: 4,
  round(g, i) {
    const lv = g.level, R = [3, 4, 5][lv - 1], C = [4, 5, 6][lv - 1], ncol = lv + 1;
    let fig; do { fig = U.pick(FIGS_BY[lv]); } while (fig === lastFig);
    lastFig = fig;
    const { cells, pal } = makePattern(R, C, fig, ncol);
    g.ask(`Pinta la otra mitad ${FIG[fig].n}`);
    const cs = `min(${(88 / (2 * C)).toFixed(2)}vw, ${(40 / R).toFixed(1)}vh, 4.6rem)`;
    const grid = U.el(`<div class="x17-grid" style="--cs:${cs};grid-template-columns:repeat(${2 * C},var(--cs))"></div>`);
    const state = U.range(R).map(() => Array(C).fill(null)); // mitad derecha, índice c' = 0..C-1 (0 junto al eje)
    const btnR = [];
    let cur = pal[0];
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < 2 * C; c++) {
        if (c < C) {
          const v = cells[r][c];
          const e = U.el(`<div class="x17-c src" ${v ? `style="background:${v}"` : ''}></div>`);
          grid.appendChild(e);
        } else {
          const cc = c - C; // 0 junto al eje
          const b = U.el(`<button class="x17-c tgt" aria-label="Casilla fila ${r + 1}, columna ${cc + 1}"></button>`);
          b.onclick = () => {
            if (state[r][cc] === cur) { state[r][cc] = null; b.style.background = ''; b.classList.remove('paint'); }
            else { state[r][cc] = cur; b.style.background = cur; b.classList.add('paint'); Kids.sound.pop(); }
            b.classList.remove('err', 'hint');
            if (done()) win();
          };
          btnR[r * C + cc] = b; grid.appendChild(b);
        }
      }
    }
    const want = (r, cc) => cells[r][C - 1 - cc] || null;
    function wrongCells() { const w = []; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (state[r][c] !== want(r, c)) w.push([r, c]); return w; }
    const done = () => wrongCells().length === 0;
    let won = false;
    function win() { if (won) return; won = true; btnR.forEach(b => b.disabled = true); grid.querySelectorAll('.x17-c').forEach(x => x.classList.remove('hint')); g.right('¡Es un espejo perfecto!'); }
    // hueco entre mitades: separación visual con margen en la última columna izquierda (ya aplicada) + eje
    const axis = U.el('<div class="x17-axis"></div>');
    grid.appendChild(axis);
    const wrap = U.el('<div class="x17-wrap"></div>');
    wrap.appendChild(grid);
    const tools = U.el('<div class="x17-tools"></div>');
    const colBtns = pal.map(c => {
      const b = U.el(`<button class="x17-col ${c === cur ? 'on' : ''}" style="background:${c}" aria-label="Color ${NAMES[c]}"></button>`);
      b.onclick = () => { cur = c; colBtns.forEach(x => x.classList.toggle('on', x === b)); Kids.sound.tap(); };
      tools.appendChild(b); return b;
    });
    const er = U.el('<button class="x17-col x17-er" aria-label="Borrar todo lo pintado">Borrar</button>');
    er.style.width = 'auto'; er.style.borderRadius = '2rem'; er.style.padding = '0 1.1rem';
    er.onclick = () => { for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { state[r][c] = null; const b = btnR[r * C + c]; b.style.background = ''; b.classList.remove('paint', 'err', 'hint'); } };
    tools.appendChild(er);
    const ok = U.el('<button class="btn x17-ok" aria-label="Comprobar">Comprobar</button>');
    ok.onclick = () => {
      if (won) return;
      const w = wrongCells();
      if (!w.length) { win(); return; }
      btnR.forEach(b => b.classList.remove('err'));
      const empty = w.filter(([r, c]) => state[r][c] === null && want(r, c)).length;
      w.forEach(([r, c]) => { if (state[r][c] !== null) btnR[r * C + c].classList.add('err'); });
      g.wrong(empty === w.length ? 'Faltan casillas por pintar. ¡Sigue!' : 'Algunas casillas no son iguales al espejo. Mira las naranjas');
    };
    tools.appendChild(ok);
    wrap.appendChild(tools);
    g.area.appendChild(wrap);
    g.helpHint = () => {
      const w = wrongCells(); if (!w.length) return;
      const [r, c] = w[0];
      const col = want(r, c);
      g.toast(col ? `Mira la casilla del otro lado: es ${NAMES[col]}` : 'Esa casilla se queda vacía');
      btnR[r * C + c].classList.add('hint');
    };
  },
  stars(m, r) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; }
});
})();

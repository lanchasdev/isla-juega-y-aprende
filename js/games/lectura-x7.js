/* Lectura x7 — Sopa de letras con dibujos como pista */
(function () {
'use strict';
const U = Kids.util;
/* [palabra, dibujo] */
const BANK = [
  ['sol', 'sun'], ['luna', 'moon'], ['pato', 'duck'], ['gato', 'cat'], ['oso', 'bear'], ['pez', 'fish'], ['rana', 'frog'], ['vaca', 'cow'],
  ['casa', 'house'], ['mesa', 'table'], ['pera', 'pear'], ['tren', 'train'], ['cama', 'bed'], ['taza', 'cup'], ['nube', 'cloud'], ['flor', 'flower'],
  ['mono', 'monkey'], ['silla', 'chair'], ['fresa', 'strawberry'], ['coche', 'car'], ['libro', 'book'], ['globo', 'balloon'], ['barco', 'boat'],
  ['cerdo', 'pig'], ['tarta', 'cake'], ['perro', 'dog'], ['llave', 'key'], ['zorro', 'fox'], ['oveja', 'sheep'], ['abeja', 'bee'], ['árbol', 'tree'],
  ['ratón', 'mouse'], ['conejo', 'rabbit'], ['jirafa', 'giraffe'], ['cereza', 'cherry'], ['tambor', 'drum'], ['cometa', 'kite'], ['caballo', 'horse']
].map(([w, a]) => ({ w, a, u: w.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase() }));
const CFG = { 1: { n: 4, words: 2, min: 3, max: 4, vert: false }, 2: { n: 5, words: 3, min: 3, max: 5, vert: false }, 3: { n: 6, words: 4, min: 3, max: 6, vert: true } };
const COLS = ['#C9B8FF', '#9FE0E6', '#FFE08A', '#FFB3C7', '#A8E6B6', '#A9CCFA'];
const FILL = 'AAAEEEIIOOOUBCDFGLMNPRSTV';

function make(cfg, picks) {
  const N = cfg.n;
  for (let att = 0; att < 300; att++) {
    const grid = Array.from({ length: N }, () => Array(N).fill(''));
    const placed = []; let ok = true;
    const order = picks.slice().sort((a, b) => b.u.length - a.u.length);
    for (let k = 0; k < order.length && ok; k++) {
      const wd = order[k], L = wd.u.length; let done = false;
      for (let t = 0; t < 80 && !done; t++) {
        const vert = cfg.vert && (placed.length ? Math.random() < .5 : false) || (cfg.vert && k === order.length - 1 && !placed.some(p => p.vert));
        const r = U.rnd(0, vert ? N - L : N - 1), c = U.rnd(0, vert ? N - 1 : N - L);
        const cells = U.range(L).map(j => vert ? [r + j, c] : [r, c + j]);
        if (cells.every(([y, x], j) => grid[y][x] === '' || grid[y][x] === wd.u[j])) {
          cells.forEach(([y, x], j) => grid[y][x] = wd.u[j]);
          placed.push({ wd, cells, vert }); done = true;
        }
      }
      if (!done) ok = false;
    }
    if (!ok) continue;
    /* relleno, evitando que aparezcan las palabras de más */
    for (let f = 0; f < 20; f++) {
      const g2 = grid.map(r => r.map(ch => ch || U.pick(FILL.split(''))));
      const rows = g2.map(r => r.join('')), cols = U.range(N).map(x => g2.map(r => r[x]).join(''));
      const lines = rows.concat(cols).map(s => s + '|' + s.split('').reverse().join(''));
      const count = w => lines.reduce((n, s) => n + (s.split(w).length - 1), 0);
      const reverse = w => w.split('').reverse().join('');
      if (picks.every(p => count(p.u) <= (p.u === reverse(p.u) ? 2 : 1))) {
        /* cada palabra aparece una vez en cada sentido de lectura contado: líneas duplicadas (directa+inversa) -> máx 1 */
        return { grid: g2, placed };
      }
    }
  }
  return null;
}

Kids.css(`
.g-lectura-x7{gap:.8rem}
.g-lectura-x7 .x7-wrap{display:flex;flex-wrap:wrap;gap:1.2rem 2rem;justify-content:center;align-items:center}
.g-lectura-x7 .x7-grid{display:grid;gap:.35rem;padding:.7rem;background:#fff;border-radius:1.6rem;box-shadow:0 .4rem 0 var(--line);touch-action:none;grid-template-columns:repeat(var(--n),var(--cs))}
.g-lectura-x7 .x7-cell{width:var(--cs);height:var(--cs);border-radius:.9rem;background:var(--cream);border:.15rem solid var(--line);font-family:'Baloo 2',sans-serif;font-weight:800;font-size:calc(var(--cs) * .56);line-height:1;color:var(--ink);display:flex;align-items:center;justify-content:center;touch-action:none;transition:background .12s,transform .12s}
.g-lectura-x7 .x7-cell.sel{background:#FFE9A3;border-color:var(--yellow);transform:scale(1.08)}
.g-lectura-x7 .x7-cell.first{background:var(--gl);border-color:var(--g)}
.g-lectura-x7 .x7-cell.found{border-color:transparent;box-shadow:inset 0 -.2rem 0 rgba(20,35,91,.12)}
.g-lectura-x7 .x7-cell.hint{animation:pulse .9s infinite;border-color:#5CC77A;background:#E3F8E8}
.g-lectura-x7 .x7-clues{display:flex;flex-direction:column;gap:.7rem}
.g-lectura-x7 .x7-clue{display:flex;align-items:center;gap:.7rem;background:#fff;border-radius:1.4rem;padding:.35rem 1rem .35rem .4rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);min-width:11rem}
.g-lectura-x7 .x7-clue .ic{width:4.2rem;height:4.2rem;flex:none}
.g-lectura-x7 .x7-clue .ic svg{width:100%;height:100%}
.g-lectura-x7 .x7-clue .wd{font-family:'Baloo 2',sans-serif;font-size:1.5rem;letter-spacing:.15rem;color:var(--ink2);line-height:1}
.g-lectura-x7 .x7-clue .wd small{display:block;font-size:.85rem;letter-spacing:0}
.g-lectura-x7 .x7-clue.done{background:#EAFBEE;border-color:#5CC77A}
.g-lectura-x7 .x7-clue.done .wd{color:var(--ink);letter-spacing:.05rem;font-size:1.7rem}
.g-lectura-x7 .x7-clue.hint{animation:pulse .9s infinite}
@media (max-width:700px){.g-lectura-x7 .x7-clues{flex-direction:row;flex-wrap:wrap;justify-content:center}.g-lectura-x7 .x7-clue{min-width:0;padding-right:.7rem}.g-lectura-x7 .x7-clue .ic{width:3.4rem;height:3.4rem}.g-lectura-x7 .x7-clue .wd{font-size:1.1rem}.g-lectura-x7 .x7-clue.done .wd{font-size:1.3rem}}
`);

Kids.game({
  id: 'lectura-x7', group: 'lectura', num: 11,
  title: 'Sopa de letras', icon: 'turtle', rounds: 2,
  blurb: 'Encuentra en la sopa de letras las palabras de los dibujos.',
  how: 'Mira los dibujos y busca su palabra en la sopa de letras. Arrastra el dedo sobre las letras, o toca la primera letra y luego la última.',
  levels: ['4×4, 2 palabras', '5×5, 3 palabras', '6×6, con vertical'],
  stars(m, r) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; },
  round(g, i) {
    const cfg = CFG[g.level], N = cfg.n;
    let res = null, picks;
    for (let t = 0; t < 30 && !res; t++) {
      picks = []; U.shuffle(BANK.filter(b => b.u.length >= cfg.min && b.u.length <= cfg.max)).forEach(b => { if (picks.length < cfg.words && !picks.some(p => p.a === b.a || p.u[0] === b.u[0])) picks.push(b); });
      res = make(cfg, picks);
    }
    const sopa = res, grid = sopa.grid;
    g.ask(cfg.vert ? 'Busca las palabras: izquierda a derecha o de arriba abajo' : 'Busca las palabras de los dibujos');
    const wrap = U.el('<div class="x7-wrap"></div>');
    const gridEl = U.el('<div class="x7-grid" role="group" aria-label="Sopa de letras"></div>');
    const cs = N === 4 ? 'min(5.8rem,16vmin)' : N === 5 ? 'min(5.2rem,13.5vmin)' : 'min(4.8rem,11.8vmin)';
    gridEl.style.setProperty('--n', N); gridEl.style.setProperty('--cs', cs);
    const cell = [];
    for (let r = 0; r < N; r++) { cell[r] = []; for (let c = 0; c < N; c++) {
      const b = U.el(`<button class="x7-cell" aria-label="Letra ${grid[r][c]}">${grid[r][c]}</button>`); b._r = r; b._c = c; gridEl.appendChild(b); cell[r][c] = b; } }
    const clues = U.el('<div class="x7-clues"></div>');
    const state = sopa.placed.map((p, k) => ({ p, k, found: false, el: null }));
    U.shuffle(state).forEach(s => {
      s.el = U.el(`<div class="x7-clue"><span class="ic">${Kids.art.get(s.p.wd.a)}</span><span class="wd"><small>${s.p.wd.u.length} letras</small>${'· '.repeat(s.p.wd.u.length).trim()}</span></div>`);
      clues.appendChild(s.el); s.el.onclick = () => Kids.sound.tap();
    });
    wrap.appendChild(gridEl); wrap.appendChild(clues); g.area.appendChild(wrap);

    let start = null, tapStart = null, dragging = false, cur = [], finished = false;
    const clear = () => { cell.forEach(r => r.forEach(b => b.classList.remove('sel', 'first'))); };
    function line(a, b) {
      let dr = b._r - a._r, dc = b._c - a._c;
      if (!cfg.vert) dr = 0; else if (Math.abs(dr) > Math.abs(dc)) dc = 0; else dr = 0;
      const L = Math.max(Math.abs(dr), Math.abs(dc)), res = [];
      for (let j = 0; j <= L; j++) res.push(cell[a._r + Math.sign(dr) * j][a._c + Math.sign(dc) * j]);
      return res;
    }
    function show(cells) { clear(); cells.forEach(b => b.classList.add('sel')); }
    function evaluate(cells) {
      clear(); if (cells.length < 2) return;
      const s = cells.map(b => b.textContent).join(''), rs = s.split('').reverse().join('');
      const hit = state.find(x => !x.found && (x.p.wd.u === s || x.p.wd.u === rs));
      if (hit) {
        hit.found = true; const col = COLS[hit.k % COLS.length];
        hit.p.cells.forEach(([r, c]) => { cell[r][c].classList.add('found'); cell[r][c].style.background = col; cell[r][c].disabled = false; });
        hit.el.classList.add('done', 'pop'); hit.el.querySelector('.wd').textContent = hit.p.wd.w;
        hit.el.style.borderColor = ''; Kids.sound.pop(); g.say(hit.p.wd.w);
        if (state.every(x => x.found)) { finished = true; g.t(() => g.right('¡Has encontrado todas!'), 700); }
      } else if (cells.length >= 2) { cells.forEach(b => g.shake(b)); g.wrong('Esa no es. ¡Sigue buscando!'); }
    }
    const under = e => { const el = document.elementFromPoint(e.clientX, e.clientY); return el && el.closest ? el.closest('.x7-cell') : null; };
    gridEl.addEventListener('pointerdown', e => {
      if (finished) return; const c = under(e); if (!c) return;
      start = c; dragging = false; e.preventDefault();
      if (tapStart) { show(line(tapStart, c)); } else { clear(); c.classList.add('sel'); }
    });
    gridEl.addEventListener('pointermove', e => {
      if (!start || finished) return; const c = under(e); if (!c) return;
      if (c !== start) dragging = true;
      if (dragging) { cur = line(start, c); show(cur); }
    });
    const up = e => {
      if (!start) return; const c = under(e) || start; const s0 = start; start = null;
      if (dragging) { tapStart = null; evaluate(line(s0, c)); dragging = false; return; }
      /* toque */
      if (!tapStart) { tapStart = s0; clear(); s0.classList.add('first'); Kids.sound.tap(); g.toast('Ahora toca la última letra'); }
      else if (tapStart === s0) { tapStart = null; clear(); }
      else { const t = tapStart; tapStart = null; evaluate(line(t, s0)); }
    };
    gridEl.addEventListener('pointerup', up);
    gridEl.addEventListener('click', e => { if (e.detail !== 0) return; const c = e.target.closest('.x7-cell'); if (!c) return; start = c; dragging = false; up({ clientX: -1, clientY: -1 }); });
    gridEl.addEventListener('pointercancel', () => { start = null; dragging = false; clear(); });
    /* teclado: Enter/Espacio en una celda actúa como toque (el puntero ya lo cubre) */
    g.helpHint = () => {
      const s = state.find(x => !x.found); if (!s) return; const [r, c] = s.p.cells[0];
      cell[r][c].classList.add('hint'); s.el.classList.add('hint');
      g.t(() => { cell[r][c].classList.remove('hint'); s.el.classList.remove('hint'); }, 3500);
      g.toast('Empieza por la letra que brilla');
    };
  }
});
})();

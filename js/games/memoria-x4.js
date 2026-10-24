/* Laberintos para el perro */
(function () {
'use strict';
const U = Kids.util;
Kids.art.add({
  'mx4-bone': '<svg viewBox="0 0 100 100"><g transform="rotate(-35 50 50)"><g fill="#FFF6E0" stroke="#E2C98F" stroke-width="3"><circle cx="22" cy="40" r="11"/><circle cx="22" cy="60" r="11"/><circle cx="78" cy="40" r="11"/><circle cx="78" cy="60" r="11"/></g><rect x="22" y="38" width="56" height="24" rx="4" fill="#FFF6E0"/><path d="M24 38H76M24 62H76" stroke="#E2C98F" stroke-width="3" stroke-linecap="round"/></g></svg>'
});
const WALLS = ['#8C7BE0', '#47B5BF', '#FF7E69', '#4C8DF6', '#E2679A', '#3FAE60'];
const DIRS = { N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1] };
const OPP = { N: 'S', S: 'N', E: 'W', W: 'E' };
function gen(n) {
  const c = U.range(n).map(() => U.range(n).map(() => ({ N: true, E: true, S: true, W: true, v: false })));
  const st = [[0, 0]]; c[0][0].v = true;
  while (st.length) {
    const [r, q] = st[st.length - 1];
    const nb = U.shuffle(Object.keys(DIRS)).filter(d => { const a = r + DIRS[d][0], b = q + DIRS[d][1]; return a >= 0 && b >= 0 && a < n && b < n && !c[a][b].v; });
    if (!nb.length) { st.pop(); continue; }
    const d = nb[0], a = r + DIRS[d][0], b = q + DIRS[d][1];
    c[r][q][d] = false; c[a][b][OPP[d]] = false; c[a][b].v = true; st.push([a, b]);
  }
  return c;
}
function path(c, n, from, to) {   // BFS: lista de celdas desde from hasta to
  const prev = {}, key = (r, q) => r * n + q, Q = [from]; prev[key(...from)] = null;
  while (Q.length) {
    const [r, q] = Q.shift();
    if (r === to[0] && q === to[1]) break;
    for (const d in DIRS) {
      if (c[r][q][d]) continue;
      const a = r + DIRS[d][0], b = q + DIRS[d][1];
      if (prev[key(a, b)] === undefined) { prev[key(a, b)] = [r, q]; Q.push([a, b]); }
    }
  }
  const res = []; let cur = to;
  while (cur) { res.unshift(cur); cur = prev[key(...cur)]; }
  return res;
}
Kids.css(`
.g-memoria-x4{padding:.4rem .5rem .8rem;gap:.6rem}
.g-memoria-x4 .mz-wrap{display:flex;flex-direction:column;align-items:center;gap:.7rem}
.g-memoria-x4 .mz-board{position:relative;width:min(97vw,calc(100vh - 27rem));aspect-ratio:1;display:grid;grid-template-columns:repeat(var(--n),1fr);background:var(--gl);border-radius:1rem;box-shadow:0 .4rem 0 rgba(20,35,91,.14),0 0 0 .35rem var(--wc);touch-action:none;margin:.35rem}
.g-memoria-x4 .mz-c{position:relative;border:0 solid var(--wc);transition:background .4s}
.g-memoria-x4 .mz-c.N{border-top-width:var(--wt)}.g-memoria-x4 .mz-c.W{border-left-width:var(--wt)}
.g-memoria-x4 .mz-c.S{border-bottom-width:var(--wt)}.g-memoria-x4 .mz-c.E{border-right-width:var(--wt)}
.g-memoria-x4 .mz-c.seen{background:rgba(255,255,255,.85)}
.g-memoria-x4 .mz-c.hint::after{content:"";position:absolute;left:36%;top:36%;width:28%;height:28%;border-radius:50%;background:var(--yellow);box-shadow:0 0 .5rem #FFD23F}
.g-memoria-x4 .mz-dog,.g-memoria-x4 .mz-bone{position:absolute;width:calc(100% / var(--n));aspect-ratio:1;padding:9%;pointer-events:none;display:block}
.g-memoria-x4 .mz-dog{transition:left .16s,top .16s;z-index:3}
.g-memoria-x4 .mz-dog svg,.g-memoria-x4 .mz-bone svg{position:absolute;inset:9%;width:82%;height:82%}
.g-memoria-x4 .mz-dog.bump{animation:shake .3s}
.g-memoria-x4 .mz-bone{animation:bounce 1.2s infinite;z-index:2}
.g-memoria-x4 .mz-pad{display:grid;grid-template-columns:repeat(3,max(4.1rem,64px));grid-template-rows:repeat(2,max(4.1rem,64px));gap:.5rem}
.g-memoria-x4 .mz-pad button{border-radius:1.2rem;background:#fff;color:var(--gd);border:.2rem solid var(--line);box-shadow:0 .3rem 0 var(--line);display:flex;align-items:center;justify-content:center}
.g-memoria-x4 .mz-pad button:active{transform:translateY(.2rem);box-shadow:none}
.g-memoria-x4 .mz-pad svg{width:2.2rem;height:2.2rem}
.g-memoria-x4 .mz-pad .u{grid-column:2;grid-row:1}.g-memoria-x4 .mz-pad .l{grid-column:1;grid-row:2}.g-memoria-x4 .mz-pad .d{grid-column:2;grid-row:2}.g-memoria-x4 .mz-pad .r{grid-column:3;grid-row:2}
@media (min-aspect-ratio:5/4){
  .g-memoria-x4 .mz-wrap{flex-direction:row;gap:2.5rem}
  .g-memoria-x4 .mz-board{width:min(60vw,calc(100vh - 12rem))}
  .g-memoria-x4 .mz-side{display:flex;flex-direction:column;align-items:center;gap:1rem}
}
.g-memoria-x4 .mz-side{display:flex;flex-direction:column;align-items:center;gap:.7rem}
`);
const ARR = {
  u: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  d: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
  l: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>',
  r: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
};
Kids.game({
  id: 'memoria-x4', group: 'memoria', num: 8, title: 'Laberintos para el perro',
  blurb: 'Lleva al perrito hasta su hueso por el laberinto.',
  how: 'Lleva al perrito hasta su hueso. Arrastra al perro por los pasillos o toca las flechas. Las paredes no se pueden atravesar.',
  icon: 'dog', levels: ['5 × 5, pasillos anchos', '7 × 7', '9 × 9'], rounds: 3,
  round(g, i) {
    const L = g.level, n = [5, 7, 9][L - 1];
    const maze = gen(n), wc = WALLS[(i + U.rnd(0, 5)) % WALLS.length];
    const goal = [n - 1, n - 1];
    g.ask('Lleva al perrito hasta su hueso');
    const root = U.el(`<div class="mz-wrap"><div class="mz-board" style="--n:${n};--wc:${wc};--wt:${n > 7 ? '.2rem' : '.28rem'}">
        ${maze.map((row, r) => row.map((c, q) => `<div class="mz-c ${c.N ? 'N' : ''} ${c.W ? 'W' : ''} ${r === n - 1 && c.S ? 'S' : ''} ${q === n - 1 && c.E ? 'E' : ''}" data-r="${r}" data-q="${q}"></div>`).join('')).join('')}
        <div class="mz-bone" style="left:${(n - 1) * 100 / n}%;top:${(n - 1) * 100 / n}%">${Kids.art.get('mx4-bone')}</div>
        <div class="mz-dog" style="left:0;top:0">${Kids.art.get('dog')}</div></div>
      <div class="mz-side"><div class="mz-pad">${['u', 'l', 'd', 'r'].map(k => `<button class="${k}" data-d="${k}" aria-label="${{ u: 'Arriba', d: 'Abajo', l: 'Izquierda', r: 'Derecha' }[k]}">${ARR[k]}</button>`).join('')}</div>
        <button class="btn blue sm" id="hint" aria-label="Ver el camino">Pista</button></div></div>`);
    g.area.appendChild(root);
    const board = root.querySelector('.mz-board'), dog = root.querySelector('.mz-dog');
    const cells = [...board.querySelectorAll('.mz-c')], cell = (r, q) => cells[r * n + q];
    let pos = [0, 0], bumps = 0, won = false, drag = false;
    cell(0, 0).classList.add('seen');
    function place() { dog.style.left = pos[1] * 100 / n + '%'; dog.style.top = pos[0] * 100 / n + '%'; cell(pos[0], pos[1]).classList.add('seen'); if (pos[0] === goal[0] && pos[1] === goal[1] && !won) { won = true; Kids.sound.ok(); g.t(() => g.right('¡Has llegado al hueso!'), 350); } }
    function step(d) {   // d: N/E/S/W
      if (won) return false;
      if (maze[pos[0]][pos[1]][d]) {
        dog.classList.remove('bump'); void dog.offsetWidth; dog.classList.add('bump'); Kids.sound.tap();
        if (++bumps % 5 === 0) g.wrong('¡Las paredes no se pueden pasar! Busca otro camino');
        return false;
      }
      pos = [pos[0] + DIRS[d][0], pos[1] + DIRS[d][1]]; Kids.sound.tap(); place(); return true;
    }
    root.querySelectorAll('.mz-pad button').forEach(b => b.onclick = () => step({ u: 'N', d: 'S', l: 'W', r: 'E' }[b.dataset.d]));
    const onKey = e => {
      if (!root.isConnected) { document.removeEventListener('keydown', onKey); return; }
      const d = { ArrowUp: 'N', ArrowDown: 'S', ArrowLeft: 'W', ArrowRight: 'E' }[e.key];
      if (d) { e.preventDefault(); step(d); }
    };
    document.addEventListener('keydown', onKey);
    /* arrastrar al perro (o deslizar el dedo desde cerca de él) */
    const cellAt = e => { const R = board.getBoundingClientRect(); return [Math.floor((e.clientY - R.top) / R.height * n), Math.floor((e.clientX - R.left) / R.width * n)]; };
    board.addEventListener('pointerdown', e => {
      const t = cellAt(e);
      if (Math.abs(t[0] - pos[0]) + Math.abs(t[1] - pos[1]) <= 2) { drag = true; try { board.setPointerCapture(e.pointerId); } catch (_) {} }
    });
    board.addEventListener('pointermove', e => {
      if (!drag || won) return;
      const t = cellAt(e);
      if (t[0] < 0 || t[1] < 0 || t[0] >= n || t[1] >= n) return;
      for (let k = 0; k < 3; k++) {
        if (t[0] === pos[0] && t[1] === pos[1]) break;
        const p = path(maze, n, pos, t);
        if (p.length > 4) break;
        const nx = p[1], d = Object.keys(DIRS).find(x => pos[0] + DIRS[x][0] === nx[0] && pos[1] + DIRS[x][1] === nx[1]);
        step(d);
      }
    });
    const up = () => { drag = false; };
    board.addEventListener('pointerup', up); board.addEventListener('pointercancel', up);
    function showHint() {
      cells.forEach(c => c.classList.remove('hint'));
      const p = path(maze, n, pos, goal);
      p.slice(1, -1).forEach(([r, q]) => cell(r, q).classList.add('hint'));
      g.t(() => cells.forEach(c => c.classList.remove('hint')), 3200);
    }
    root.querySelector('#hint').onclick = showHint;
    g.helpHint = showHint;
  }
});
})();

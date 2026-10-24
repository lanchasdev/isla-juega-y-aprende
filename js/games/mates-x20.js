/* Mates x20 — Laberinto de sumas */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
let lastKey = '';

Kids.css(`
.g-mates-x20 .x20-top{display:flex;align-items:center;gap:.7rem;font-family:'Baloo 2';font-weight:800;font-size:1.5rem;background:#fff;border-radius:999px;padding:.2rem 1.2rem;box-shadow:0 .3rem 0 var(--line)}
.g-mates-x20 .x20-top b{background:var(--yellow);border-radius:999px;padding:0 .8rem;font-size:1.8rem}
.g-mates-x20 .x20-grid{display:grid;gap:.4rem;padding:.6rem;background:#fff;border-radius:1.6rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line)}
.g-mates-x20 .x20-c{position:relative;width:var(--cs);height:var(--cs);border-radius:1rem;padding:0;background:var(--a3);font-family:'Baloo 2';font-weight:800;color:var(--ink);font-size:var(--fz);display:flex;align-items:center;justify-content:center;box-shadow:0 .25rem 0 rgba(20,35,91,.16);transition:transform .12s,background .2s;line-height:1;text-align:center}
.g-mates-x20 .x20-c:nth-child(odd){background:var(--a1)}
.g-mates-x20 .x20-c:hover{transform:translateY(-.1rem)}
.g-mates-x20 .x20-c svg{width:80%;height:80%}
.g-mates-x20 .x20-c.start,.g-mates-x20 .x20-c.goal{background:#E8F9EC;box-shadow:0 .25rem 0 #8BD79B}
.g-mates-x20 .x20-c.vis{background:#BDEFC8!important;box-shadow:0 .25rem 0 #5CC77A}
.g-mates-x20 .x20-c.vis .x20-t{opacity:.55}
.g-mates-x20 .x20-c.bad{background:#FFD3CF!important;animation:shake .4s}
.g-mates-x20 .x20-c.hint{animation:pulse .9s infinite;box-shadow:0 0 0 .35rem #FFD23F;z-index:2}
.g-mates-x20 .x20-c.here{box-shadow:0 0 0 .3rem var(--ink)}
.g-mates-x20 .x20-hero{position:absolute;inset:-12% -8% 6% -8%;pointer-events:none;z-index:3;animation:bounce 1.4s infinite}
.g-mates-x20 .x20-hero svg{width:100%;height:100%}
.g-mates-x20 .x20-f{position:absolute;right:4%;top:2%;width:34%;height:34%}
`);

/* camino aleatorio sin repetir casillas, de (0,0) a (N-1,N-1) */
function randomPath(N) {
  const goal = N * N - 1, minLen = 2 * N + 1, maxLen = Math.max(minLen, Math.round(N * N * .55));
  for (let tries = 0; tries < 300; tries++) {
    const seen = new Set([0]), path = [0];
    let steps = 0;
    const dfs = (c) => {
      if (c === goal) return path.length >= minLen && path.length <= maxLen;
      if (++steps > 4000) return false;
      const r = Math.floor(c / N), cc = c % N;
      const nb = U.shuffle([[r - 1, cc], [r + 1, cc], [r, cc - 1], [r, cc + 1]]).filter(([a, b]) => a >= 0 && b >= 0 && a < N && b < N && !seen.has(a * N + b));
      for (const [a, b] of nb) {
        const n = a * N + b;
        if (n === goal && path.length + 1 < minLen) continue;
        seen.add(n); path.push(n);
        if (dfs(n)) return true;
        seen.delete(n); path.pop();
      }
      return false;
    };
    if (dfs(0)) return path;
  }
  // fallback: serpiente simple
  const p = []; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) p.push(r * N + (r % 2 ? N - 1 - c : c));
  return p.slice(0, p.indexOf(N * N - 1) + 1);
}

/* expresión cuyo resultado es v. */
function expr(v, lv, allowSub) {
  if (allowSub && Math.random() < .45) {
    const b = U.rnd(1, Math.max(1, Math.min(9, 30 - v)));
    const a = v + b; if (a <= 30 && !(lv === 1)) return a + ' − ' + b;
  }
  if (v < 2) return (v + 1) + ' − 1';
  const a = U.rnd(1, v - 1); return a + ' + ' + (v - a);
}

function make(lv, N) {
  const target = lv === 2 ? U.pick([10, 10, 20]) : 10;
  const path = randomPath(N);
  const onPath = new Set(path.slice(1, -1));
  const vals = [];
  for (let c = 0; c < N * N; c++) {
    if (c === 0 || c === N * N - 1) { vals.push(null); continue; }
    let v;
    if (onPath.has(c)) v = target;
    else {
      if (lv === 1) { do { v = U.rnd(3, 12); } while (v === target); }
      else if (lv === 2) { do { v = target === 20 ? U.rnd(12, 28) : U.rnd(4, 16); } while (v === target); }
      else { v = Math.random() < .75 ? U.pick([9, 11, 9, 11, 8, 12]) : U.rnd(5, 15); if (v === target) v = 9; }
    }
    vals.push({ v, t: expr(v, lv, lv >= 2) });
  }
  return { path, vals, target };
}

Kids.game({
  id: 'mates-x20', group: 'mates', num: 25,
  title: 'Laberinto de sumas',
  blurb: 'Llega a la meta solo por las casillas con el resultado justo.',
  how: 'Lolo quiere llegar a la meta. Solo puede pisar las casillas cuya cuenta da el número que te dicen. Toca las casillas pegadas, una a una.',
  icon: 'lion',
  levels: ['4 por 4, sumas', '5 por 5, con restas', '6 por 6, casi iguales'],
  rounds: 4,
  round(g, i) {
    const lv = g.level, N = [4, 5, 6][lv - 1];
    let m; do { m = make(lv, N); } while (m.path.join() + m.target === lastKey);
    lastKey = m.path.join() + m.target;
    const { path, vals, target } = m;
    g.ask(`Lleva a Lolo hasta la meta por las casillas que dan ${target}`);
    const top = U.el(`<div class="x20-top">Solo vale <b>${target}</b></div>`);
    const cs = `min(${(78 / N).toFixed(1)}vw, ${(52 / N).toFixed(1)}vh, 6rem)`;
    const fz = lv === 3 ? '1.35rem' : '1.55rem';
    const grid = U.el(`<div class="x20-grid" style="--cs:${cs};--fz:clamp(${lv === 3 ? '.8rem,3.6vw,1.35rem' : '.9rem,4vw,1.6rem'});grid-template-columns:repeat(${N},var(--cs))"></div>`);
    const cells = [];
    for (let c = 0; c < N * N; c++) {
      let inner = '';
      if (c === N * N - 1) inner = A.get('cake');
      else if (c === 0) inner = '';
      else inner = `<span class="x20-t">${vals[c].t}</span>`;
      const b = U.el(`<button class="x20-c ${c === 0 ? 'start vis' : c === N * N - 1 ? 'goal' : ''}" aria-label="${c === 0 ? 'Salida' : c === N * N - 1 ? 'Meta' : vals[c].t}">${inner}</button>`);
      cells.push(b); grid.appendChild(b);
    }
    const hero = U.el(`<div class="x20-hero">${A.get('lion')}</div>`);
    let cur = 0, trail = [0], won = false;
    const place = () => {
      cells.forEach(c => c.classList.remove('here', 'hint'));
      cells[cur].classList.add('here'); cells[cur].appendChild(hero);
    };
    const adj = (a, b) => Math.abs(Math.floor(a / N) - Math.floor(b / N)) + Math.abs(a % N - b % N) === 1;
    cells.forEach((b, c) => {
      b.onclick = () => {
        if (won) return;
        if (c === cur) { Kids.voice.say(c === 0 ? 'Aquí empieza Lolo' : vals[c] ? vals[c].v + '' : ''); return; }
        if (trail.length > 1 && c === trail[trail.length - 2]) { // volver un paso
          cells[cur].classList.remove('vis'); trail.pop(); cur = c; place(); Kids.sound.tap(); return;
        }
        if (!adj(cur, c)) { g.toast('Toca una casilla pegada a Lolo'); return; }
        if (trail.includes(c)) return;
        const isGoal = c === N * N - 1;
        if (isGoal || vals[c].v === target) {
          cur = c; trail.push(c); b.classList.add('vis'); place(); Kids.sound.pop();
          if (isGoal) { won = true; g.right('¡Lolo llegó a la meta!'); }
        } else {
          b.classList.add('bad'); g.shake(b); g.wrong(`${vals[c].t} no da ${target}. ¡Cuéntalo con calma!`);
          g.t(() => b.classList.remove('bad'), 600);
        }
      };
    });
    place();
    const wrap = U.el('<div style="display:flex;flex-direction:column;align-items:center;gap:.8rem"></div>');
    wrap.appendChild(top); wrap.appendChild(grid); g.area.appendChild(wrap);
    g.helpHint = () => {
      // siguiente casilla del camino desde la posición actual: BFS por casillas válidas
      const ok = c => c === N * N - 1 || (c !== 0 && vals[c].v === target);
      const prev = new Map([[cur, -1]]), q = [cur]; let found = -1;
      while (q.length) {
        const a = q.shift(); if (a === N * N - 1) { found = a; break; }
        const r = Math.floor(a / N), cc = a % N;
        [[r - 1, cc], [r + 1, cc], [r, cc - 1], [r, cc + 1]].forEach(([x, y]) => {
          if (x < 0 || y < 0 || x >= N || y >= N) return; const n = x * N + y;
          if (!prev.has(n) && ok(n) && !trail.includes(n)) { prev.set(n, a); q.push(n); }
        });
      }
      if (found < 0) { g.toast('Vuelve un paso atrás tocando la casilla de antes'); return; }
      let s = found; while (prev.get(s) !== cur) s = prev.get(s);
      g.toast('Mira la casilla que brilla');
      cells[s].classList.add('hint');
    };
  },
  stars(m, r) { return m <= 3 ? 3 : m <= 9 ? 2 : 1; }
});
})();

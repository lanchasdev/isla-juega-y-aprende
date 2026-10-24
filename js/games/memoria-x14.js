/* memoria-x14 — Programa al robot con flechas */
(function () {
'use strict';
const K = window.Kids, U = K.util;

K.art.add({
  'mx14-robot': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="92" rx="30" ry="5" fill="#14235B" opacity=".12"/>
    <line x1="50" y1="10" x2="50" y2="22" stroke="#6F7FA8" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="9" r="6" fill="#FF7E69"/>
    <rect x="18" y="20" width="64" height="44" rx="16" fill="#8FB9F5"/><rect x="18" y="20" width="64" height="44" rx="16" fill="none" stroke="#5E93E0" stroke-width="3"/>
    <rect x="26" y="29" width="48" height="27" rx="11" fill="#fff"/>
    <circle cx="40" cy="42" r="6.5" fill="#14235B"/><circle cx="60" cy="42" r="6.5" fill="#14235B"/><circle cx="42" cy="40" r="2.3" fill="#fff"/><circle cx="62" cy="40" r="2.3" fill="#fff"/>
    <path d="M43 50 Q50 56 57 50" fill="none" stroke="#14235B" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="30" cy="52" r="3.5" fill="#FF9AA2" opacity=".75"/><circle cx="70" cy="52" r="3.5" fill="#FF9AA2" opacity=".75"/>
    <rect x="28" y="66" width="44" height="18" rx="8" fill="#FFD23F"/><rect x="28" y="66" width="44" height="18" rx="8" fill="none" stroke="#E0A800" stroke-width="2.5"/>
    <circle cx="50" cy="75" r="4" fill="#FF7E69"/>
    <circle cx="30" cy="87" r="7" fill="#6F7FA8"/><circle cx="70" cy="87" r="7" fill="#6F7FA8"/><circle cx="30" cy="87" r="2.8" fill="#DDE5F7"/><circle cx="70" cy="87" r="2.8" fill="#DDE5F7"/></svg>`,
  'mx14-rock': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="84" rx="34" ry="7" fill="#14235B" opacity=".12"/>
    <path d="M14 82 Q10 52 30 38 Q40 20 60 26 Q86 30 88 62 Q90 80 80 84Z" fill="#A9A39A"/><path d="M14 82 Q10 52 30 38 Q40 20 60 26 Q70 28 70 40 Q50 36 40 56 Q34 72 40 84Z" fill="#C6C0B6"/>
    <path d="M58 60 Q66 56 70 64" fill="none" stroke="#8A847A" stroke-width="3" stroke-linecap="round"/><circle cx="76" cy="56" r="3" fill="#8A847A"/></svg>`,
  'mx14-water': `<svg viewBox="0 0 100 100"><rect x="4" y="4" width="92" height="92" rx="18" fill="#58B8EE"/><rect x="4" y="4" width="92" height="92" rx="18" fill="none" stroke="#3A9AD6" stroke-width="3"/>
    <g fill="none" stroke="#DDF2FF" stroke-width="5" stroke-linecap="round"><path d="M16 36 Q27 26 38 36 T60 36 T82 36"/><path d="M16 62 Q27 52 38 62 T60 62 T82 62"/></g></svg>`,
  'mx14-flag': `<svg viewBox="0 0 100 100"><ellipse cx="46" cy="90" rx="22" ry="5" fill="#14235B" opacity=".12"/><rect x="30" y="12" width="6" height="76" rx="3" fill="#8A6A44"/>
    <path d="M36 14 L82 28 L36 46Z" fill="#FF5E7E"/><path d="M36 14 L82 28 L36 46Z" fill="none" stroke="#D93A5C" stroke-width="3" stroke-linejoin="round"/><circle cx="33" cy="12" r="6" fill="#FFD23F"/></svg>`
});

const DIRS = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
const ANG = { U: 0, R: 90, D: 180, L: 270 };
const NAMEDIR = { U: 'arriba', D: 'abajo', L: 'a la izquierda', R: 'a la derecha' };
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M5 11l7-7 7 7"/></svg>';
const arrow = d => `<span class="ar" style="transform:rotate(${ANG[d]}deg)">${ARROW}</span>`;

/* BFS sobre (posición, estrellas recogidas). Devuelve la lista de movimientos o null */
function solve(N, blocks, start, stars) {
  const bk = new Set(blocks.map(b => b.join(','))), sk = stars.map(s => s.join(','));
  const maskAt = (r, c, m) => { const i = sk.indexOf(r + ',' + c); return i >= 0 ? m | (1 << i) : m; };
  const full = (1 << stars.length) - 1;
  const q = [[start[0], start[1], 0, []]], seen = new Set([start.join(',') + ',0']);
  while (q.length) {
    const [r, c, m, path] = q.shift();
    if (m === full) return path;
    for (const d in DIRS) {
      const nr = r + DIRS[d][0], nc = c + DIRS[d][1];
      if (nr < 0 || nc < 0 || nr >= N || nc >= N || bk.has(nr + ',' + nc)) continue;
      const nm = maskAt(nr, nc, m), k = nr + ',' + nc + ',' + nm;
      if (seen.has(k)) continue; seen.add(k); q.push([nr, nc, nm, path.concat(d)]);
    }
  }
  return null;
}
function level(lv) {
  const N = [0, 4, 5, 6][lv];
  for (let t = 0; t < 3000; t++) {
    const all = []; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) all.push([r, c]);
    const sh = U.shuffle(all);
    const start = sh[0], nStars = lv === 3 ? 2 : 1, stars = sh.slice(1, 1 + nStars);
    const nb = lv === 1 ? 0 : lv === 2 ? U.rnd(3, 5) : U.rnd(6, 8);
    const blocks = sh.slice(1 + nStars, 1 + nStars + nb);
    const path = solve(N, blocks, start, stars); if (!path) continue;
    const n = path.length;
    if (lv === 1 && !(n === 3 || n === 4)) continue;
    if (lv === 2 && !(n >= 5 && n <= 7)) continue;
    if (lv === 3 && !(n >= 7 && n <= 10)) continue;
    if (lv === 2) { const man = Math.abs(start[0] - stars[0][0]) + Math.abs(start[1] - stars[0][1]); if (n === man) continue; }
    return { N, start, stars, blocks: blocks.map((b, i) => ({ r: b[0], c: b[1], t: lv === 1 ? 'rock' : (i % 3 === 2 ? 'water' : 'rock') })), path, slots: Math.min(12, n + 2) };
  }
  return { N: 4, start: [3, 0], stars: [[0, 3]], blocks: [], path: ['U', 'U', 'U', 'R', 'R', 'R'], slots: 8 };
}

K.css(`
.g-memoria-x14{gap:.7rem}
.g-memoria-x14 .wrap{display:flex;flex-wrap:wrap;gap:1rem 1.6rem;justify-content:center;align-items:center;width:100%}
.g-memoria-x14 .board{position:relative;width:var(--bw);height:var(--bw);display:grid;grid-template-columns:repeat(var(--n),1fr);grid-template-rows:repeat(var(--n),1fr);background:#fff;border-radius:1.4rem;padding:.35rem;box-shadow:0 .4rem 0 var(--line);flex:none;box-sizing:content-box;--bw:min(86vw,45vh,25rem)}
.g-memoria-x14 .cell{border-radius:.7rem;background:#E3F6D3;position:relative;display:flex;align-items:center;justify-content:center;margin:1px}
.g-memoria-x14 .cell:nth-child(even){background:#D5F0C0}
.g-memoria-x14 .cell.alt{background:#D5F0C0}
.g-memoria-x14 .cell svg{width:88%;height:88%}
.g-memoria-x14 .cell.trail::after{content:'';position:absolute;width:26%;height:26%;border-radius:50%;background:#F2B93B;animation:pulse 1s infinite}
.g-memoria-x14 .cell.hasstar.trail::after{display:none}
.g-memoria-x14 .robot{position:absolute;pointer-events:none;transition:left .38s ease-in-out,top .38s ease-in-out;z-index:3}
.g-memoria-x14 .robot svg{width:100%;height:100%;display:block}
.g-memoria-x14 .robot.bump{animation:shake .45s}
.g-memoria-x14 .robot.hop svg{animation:bounce .4s}
.g-memoria-x14 .ctl{display:flex;flex-direction:column;gap:.7rem;align-items:center;min-width:0;width:min(100%,26rem)}
.g-memoria-x14 .pal{display:flex;gap:.55rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-memoria-x14 .pal .ab{width:4.3rem;height:4.3rem;border-radius:1.2rem;background:var(--g);color:#fff;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 .3rem 0 var(--gd);position:relative}
.g-memoria-x14 .pal .ab:active{transform:translateY(.2rem);box-shadow:0 .1rem 0 var(--gd)}
.g-memoria-x14 .ab .ar{display:inline-flex;width:2.6rem;height:2.6rem}
.g-memoria-x14 .ab .ar svg{width:100%;height:100%}
.g-memoria-x14 .pal .x2{width:4.3rem;height:4.3rem;border-radius:1.2rem;background:#fff;color:var(--ink);font-family:'Baloo 2';font-weight:800;font-size:1.4rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--gl);line-height:1}
.g-memoria-x14 .pal .x2.on{background:#FFF3BF;border-color:#F2B93B}
.g-memoria-x14 .prog{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:center;background:rgba(255,255,255,.75);border-radius:1.2rem;padding:.5rem;width:100%;box-sizing:border-box}
.g-memoria-x14 .prog.hot{background:#FFF3BF}
.g-memoria-x14 .ps{width:3.1rem;height:3.1rem;border:.2rem dashed #9CB5E8;border-radius:.9rem;display:flex;align-items:center;justify-content:center;color:var(--ink);position:relative;background:transparent;padding:0}
.g-memoria-x14 .ps.f{border:.2rem solid var(--g);background:var(--gl)}
.g-memoria-x14 .ps.run{background:#FFF3BF;border-color:#F2B93B;transform:scale(1.12)}
.g-memoria-x14 .ps .ar{width:1.9rem;height:1.9rem;display:inline-flex}
.g-memoria-x14 .ps .ar svg{width:100%;height:100%}
.g-memoria-x14 .ps .m2{position:absolute;right:-.3rem;bottom:-.4rem;background:#F2B93B;border-radius:999px;font-family:'Baloo 2';font-size:.85rem;line-height:1;padding:.1rem .3rem}
.g-memoria-x14 .acts{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center}
.g-memoria-x14 .acts .btn svg{width:1.2em;height:1.2em}
.g-memoria-x14 .acts button[disabled]{opacity:.5;pointer-events:none}
@media (max-width:640px){
  .g-memoria-x14 .pal .ab,.g-memoria-x14 .pal .x2{width:3.6rem;height:3.6rem}
  .g-memoria-x14 .ps{width:2.6rem;height:2.6rem}
  .g-memoria-x14 .ps .ar{width:1.6rem;height:1.6rem}
  .g-memoria-x14 .board{--bw:min(80vw,36vh,25rem)}
  .g-memoria-x14 .btn{font-size:1.25rem;padding:.4rem 1.2rem}
}
`);

const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>';
const BACKSP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h11v14H9L3 12z"/><path d="M13 9l5 6M18 9l-5 6"/></svg>';
const TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';

K.game({
  id: 'memoria-x14', group: 'memoria', num: 18, title: 'Programa al robot con flechas',
  blurb: 'Dale órdenes con flechas para que llegue a la estrella.',
  how: 'Pon flechas en el programa para decirle al robot por dónde ir. Luego pulsa el botón de ir y mira cómo las sigue. Cuidado con las rocas y el agua.',
  icon: 'robot', levels: ['4×4 sin obstáculos', '5×5 con rocas', '6×6 con 2 estrellas'], rounds: 3,
  round(g) {
    const L = level(g.level), N = L.N;
    g.ask(L.stars.length > 1 ? 'Programa al robot para que recoja las dos estrellas.' : 'Programa al robot para que llegue a la meta.');
    const blockAt = (r, c) => L.blocks.find(b => b.r === r && b.c === c);
    const board = U.el(`<div class="board" style="--n:${N}"></div>`);
    const cellEls = {};
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const b = blockAt(r, c), isStar = L.stars.findIndex(s => s[0] === r && s[1] === c);
      const e = U.el(`<div class="cell ${(r + c) % 2 ? 'alt' : ''} ${isStar >= 0 ? 'hasstar' : ''}">${b ? K.art.get(b.t === 'water' ? 'mx14-water' : 'mx14-rock') : isStar >= 0 ? K.art.get(g.level === 3 ? 'star' : 'mx14-flag') : ''}</div>`);
      cellEls[r + ',' + c] = e; board.appendChild(e);
    }
    const robot = U.el(`<div class="robot" aria-label="Robot">${K.art.get('mx14-robot')}</div>`);
    const place = (r, c) => { robot.style.left = `calc(.35rem + (100% - .7rem) * ${c / N})`; robot.style.top = `calc(.35rem + (100% - .7rem) * ${r / N})`; };
    robot.style.width = `calc((100% - .7rem) / ${N})`; robot.style.height = robot.style.width;
    board.appendChild(robot);
    let pos = L.start.slice(); place(...pos);

    const prog = []; let x2 = false, running = false, done = false;
    const ctl = U.el('<div class="ctl"></div>');
    const pal = U.el('<div class="pal"></div>');
    const progEl = U.el('<div class="prog" aria-label="Programa"></div>');
    const acts = U.el(`<div class="acts"><button class="btn teal go" aria-label="Ejecutar el programa">${PLAY}Ir</button><button class="btn white del" aria-label="Borrar la última flecha">${BACKSP}Borrar</button><button class="btn white clr" aria-label="Limpiar el programa">${TRASH}Limpiar</button></div>`);
    ctl.append(pal, progEl, acts);
    const wrap = U.el('<div class="wrap"></div>'); wrap.append(board, ctl); g.area.appendChild(wrap);

    const draw = (runIdx) => {
      progEl.innerHTML = '';
      for (let k = 0; k < L.slots; k++) {
        const it = prog[k];
        const s = U.el(it ? `<button class="ps f ${runIdx === k ? 'run' : ''}" aria-label="Quitar flecha ${NAMEDIR[it.d]}">${arrow(it.d)}${it.n > 1 ? '<span class="m2">×2</span>' : ''}</button>` : '<div class="ps"></div>');
        if (it) s.onclick = () => { if (running) return; prog.splice(k, 1); K.sound.tap(); draw(); };
        progEl.appendChild(s);
      }
    };
    const add = d => {
      if (running || done) return;
      if (prog.length >= L.slots) { g.toast('El programa está lleno. Quita alguna flecha.'); return; }
      prog.push({ d, n: x2 ? 2 : 1 }); if (x2) { x2 = false; x2b.classList.remove('on'); x2b.setAttribute('aria-pressed', 'false'); }
      K.sound.tap(); draw();
    };
    Object.keys(DIRS).forEach(d => {
      const b = U.el(`<button class="ab" aria-label="Flecha ${NAMEDIR[d]}">${arrow(d)}</button>`);
      pal.appendChild(b);
      K.drag(b, { targets: () => [progEl], onDrop: () => { add(d); return false; }, onTap: () => add(d) });
    });
    const x2b = U.el('<button class="x2" aria-label="Repite la siguiente flecha 2 veces" aria-pressed="false">×2</button>');
    if (g.level === 3) { pal.appendChild(x2b); x2b.onclick = () => { x2 = !x2; x2b.classList.toggle('on', x2); x2b.setAttribute('aria-pressed', x2); K.sound.tap(); }; }
    draw();
    const goB = acts.querySelector('.go'), delB = acts.querySelector('.del'), clrB = acts.querySelector('.clr');
    delB.onclick = () => { if (running) return; prog.pop(); draw(); };
    clrB.onclick = () => { if (running) return; prog.length = 0; draw(); };

    const collected = new Set();
    const reset = () => {
      running = false; pos = L.start.slice(); place(...pos); collected.clear();
      L.stars.forEach(s => { const e = cellEls[s.join(',')]; e.querySelector('svg') || (e.innerHTML = K.art.get(g.level === 3 ? 'star' : 'mx14-flag')); });
      goB.disabled = delB.disabled = clrB.disabled = false; draw();
    };
    goB.onclick = () => {
      if (running || done) return;
      if (!prog.length) { g.toast('Primero pon algunas flechas en el programa.'); g.say('Primero pon algunas flechas en el programa.'); return; }
      running = true; goB.disabled = delB.disabled = clrB.disabled = true;
      const steps = []; prog.forEach((it, k) => { for (let j = 0; j < it.n; j++) steps.push([it.d, k]); });
      let si = 0;
      const next = () => {
        if (si >= steps.length) {
          draw();
          if (collected.size === L.stars.length) { done = true; g.t(() => g.right('¡Lo has programado muy bien!'), 400); }
          else { g.wrong(L.stars.length > 1 ? 'Casi... todavía faltan estrellas. ¡Cambia el programa!' : 'Casi... el robot no ha llegado. ¡Cambia el programa!'); g.t(reset, 900); }
          return;
        }
        const [d, k] = steps[si++]; draw(k);
        const nr = pos[0] + DIRS[d][0], nc = pos[1] + DIRS[d][1], b = blockAt(nr, nc);
        if (nr < 0 || nc < 0 || nr >= N || nc >= N || b) {
          robot.classList.remove('bump'); void robot.offsetWidth; robot.classList.add('bump');
          g.wrong(b ? (b.t === 'water' ? '¡Cuidado, ahí hay agua! El robot vuelve a empezar.' : '¡Ups, una roca! El robot vuelve a empezar.') : '¡Ups, el borde! El robot vuelve a empezar.');
          g.t(reset, 1100); return;
        }
        pos = [nr, nc]; place(nr, nc); K.sound.tap();
        const si_ = L.stars.findIndex(s => s[0] === nr && s[1] === nc);
        if (si_ >= 0 && !collected.has(si_)) { collected.add(si_); g.t(() => { const e = cellEls[nr + ',' + nc]; const sv = e.querySelector('svg'); sv && sv.remove(); K.sound.pop(); robot.classList.remove('hop'); void robot.offsetWidth; robot.classList.add('hop'); }, 300); }
        g.t(next, 560);
      };
      g.t(next, 150);
    };
    g.helpHint = () => {
      let r = L.start[0], c = L.start[1];
      L.path.forEach(d => { r += DIRS[d][0]; c += DIRS[d][1]; cellEls[r + ',' + c].classList.add('trail'); });
      g.toast('Sigue los puntitos amarillos: ' + L.path.slice(0, 2).map(d => NAMEDIR[d]).join(', luego ') + '…'); g.say('Sigue los puntitos amarillos.');
    };
  }
});
})();

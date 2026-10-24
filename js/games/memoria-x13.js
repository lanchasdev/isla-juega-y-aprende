/* memoria-x13 — Gira la figura */
(function () {
'use strict';
const K = window.Kids, U = K.util;

/* ---- geometría de celdas ---- */
const norm = cs => { const mx = Math.min(...cs.map(c => c[0])), my = Math.min(...cs.map(c => c[1])); return cs.map(c => [c[0] - mx, c[1] - my]); };
const rot = cs => norm(cs.map(([x, y]) => [-y, x]));            // 90° en sentido del reloj
const mir = cs => norm(cs.map(([x, y]) => [-x, y]));            // espejo izquierda-derecha
const key = cs => norm(cs).map(c => c.join(',')).sort().join(';');
const rotN = (cs, n) => { let r = norm(cs); for (let i = 0; i < n; i++) r = rot(r); return r; };
const forms = cs => { const s = new Set(); let r = norm(cs); for (let i = 0; i < 4; i++) { s.add(key(r)); s.add(key(mir(r))); r = rot(r); } return s; };
function chiral(cs) {  // las 4 rotaciones distintas y ningún espejo es una rotación
  const rs = new Set(); let r = norm(cs); for (let i = 0; i < 4; i++) { rs.add(key(r)); r = rot(r); }
  if (rs.size < 4) return false;
  return !rs.has(key(mir(cs)));
}
/* El primer elemento de cada lista es la celda "marcada" (se pinta con un punto) */
const SHAPES = {
  F: [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]], L: [[0, 2], [0, 0], [0, 1], [1, 2]], N: [[0, 3], [1, 0], [1, 1], [0, 1], [0, 2]],
  P: [[0, 2], [0, 0], [1, 0], [0, 1], [1, 1]], Y: [[1, 3], [1, 0], [0, 1], [1, 1], [1, 2]], R: [[2, 0], [0, 0], [1, 0], [1, 1], [1, 2]]
};
const PAIRS = ['F', 'L', 'N', 'P', 'Y'].filter(k => chiral(SHAPES[k]));
const COLORS = ['#8C7BE0', '#FF7E69', '#3FB6A8', '#F2B93B', '#4C8DF6', '#EE6FA6'];

function randomChiral() {
  for (let t = 0; t < 400; t++) {
    let cs = [[1, 1]];
    while (cs.length < 5) {
      const b = U.pick(cs), d = U.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), n = [b[0] + d[0], b[1] + d[1]];
      if (n[0] < 0 || n[1] < 0 || n[0] > 3 || n[1] > 3 || cs.some(c => c[0] === n[0] && c[1] === n[1])) continue;
      cs.push(n);
    }
    cs = norm(cs);
    const w = Math.max(...cs.map(c => c[0])) + 1, h = Math.max(...cs.map(c => c[1])) + 1;
    if (Math.max(w, h) < 3 || Math.min(w, h) < 2) continue;
    if (chiral(cs)) return cs;
  }
  return SHAPES.F;
}
function modified(cs) {  // mueve una celda: queda parecida pero NO es giro ni espejo
  const f = forms(cs), out = [];
  cs.forEach((c, i) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => {
    const n = [c[0] + d[0], c[1] + d[1]]; if (cs.some(o => o[0] === n[0] && o[1] === n[1])) return;
    const t = cs.map((o, j) => j === i ? n : o);
    // conexo
    const seen = [t[0]], q = [t[0]]; while (q.length) { const p = q.pop(); t.forEach(o => { if (!seen.includes(o) && Math.abs(o[0] - p[0]) + Math.abs(o[1] - p[1]) === 1) { seen.push(o); q.push(o); } }); }
    if (seen.length === t.length && !f.has(key(t))) out.push(norm(t));
  }));
  return out.length ? U.pick(out) : null;
}

function cellsSvg(cs, color, mark) {
  const mnx = Math.min(...cs.map(c => c[0])), mny = Math.min(...cs.map(c => c[1])); cs = cs.map(c => [c[0] - mnx, c[1] - mny]);
  const w = Math.max(...cs.map(c => c[0])) + 1, h = Math.max(...cs.map(c => c[1])) + 1, c = Math.min(78 / Math.max(w, h), 26);
  const ox = 50 - w * c / 2, oy = 50 - h * c / 2;
  const dark = '#14235B';
  let s = `<svg viewBox="0 0 100 100">`;
  cs.forEach(([x, y]) => { s += `<rect x="${(ox + x * c + 1).toFixed(1)}" y="${(oy + y * c + 1).toFixed(1)}" width="${(c - 2).toFixed(1)}" height="${(c - 2).toFixed(1)}" rx="${(c * .22).toFixed(1)}" fill="${color}" stroke="${dark}" stroke-opacity=".18" stroke-width="1"/>`; });
  if (mark) { const m = cs[0]; s += `<circle cx="${(ox + m[0] * c + c / 2).toFixed(1)}" cy="${(oy + m[1] * c + c / 2).toFixed(1)}" r="${(c * .22).toFixed(1)}" fill="#fff"/><circle cx="${(ox + m[0] * c + c / 2).toFixed(1)}" cy="${(oy + m[1] * c + c / 2).toFixed(1)}" r="${(c * .1).toFixed(1)}" fill="${dark}"/>`; }
  return s + '</svg>';
}
/* cualquier figura = {cells?,color,mark} o {art} ; operaciones sobre la figura */
function render(f, rotN_, mirrored) {
  if (f.art) return `<div class="fg" style="transform:rotate(${rotN_ * 90}deg)${mirrored ? ' scaleX(-1)' : ''}">${K.art.get(f.art)}</div>`;
  let cs = f.cells; if (mirrored) cs = mirNoNorm(cs); cs = rotNoNorm(cs, rotN_);
  return `<div class="fg">${cellsSvg(cs, f.color, f.mark)}</div>`;
}
/* versiones que conservan el orden (la celda marcada es la 0) */
const rotNoNorm = (cs, n) => { let r = cs; for (let i = 0; i < n; i++) r = r.map(([x, y]) => [-y, x]); return r; };
const mirNoNorm = cs => cs.map(([x, y]) => [-x, y]);
const ANIMALS = ['fish', 'whale', 'train', 'boat', 'bird', 'dolphin', 'turtle', 'shoe', 'boot', 'key'];

function build(level) {
  const colors = U.sample(COLORS, 2), mark = level < 3;
  const mk = k => ({ cells: SHAPES[k], color: colors[0], mark });
  let ref, opts = [];
  if (level === 1) {
    const useArt = Math.random() < .5;
    const pool = useArt ? ANIMALS.map(a => ({ art: a })) : PAIRS.map(mk);
    const [a, b, c] = U.sample(pool, 3); ref = a;
    const r = U.pick([1, 2, 3]);
    opts = [{ f: a, r, m: false, ok: true }, { f: b, r: U.rnd(0, 3), m: false }, { f: c, r: U.rnd(0, 3), m: false }];
  } else if (level === 2) {
    const useArt = Math.random() < .4;
    const pool = useArt ? ANIMALS.map(a => ({ art: a })) : PAIRS.map(mk);
    const [a, b] = U.sample(pool, 2); ref = a;
    const r = U.pick([1, 2, 3]), rm = U.pick([0, 1, 2, 3]);
    opts = [{ f: a, r, m: false, ok: true }, { f: a, r: rm, m: true }, { f: b, r: U.rnd(0, 3), m: U.pick([false, true]) }];
  } else {
    for (let t = 0; t < 50; t++) {
      const cs = randomChiral(), mod = modified(cs); if (!mod) continue;
      const rs = U.shuffle([0, 1, 2, 3]), r = U.pick([1, 2, 3]);
      const o = [{ f: { cells: cs, color: colors[0], mark: false }, r, m: false, ok: true },
        { f: { cells: cs, color: colors[0], mark: false }, r: rs[0], m: true }, { f: { cells: cs, color: colors[0], mark: false }, r: rs[1], m: true },
        { f: { cells: mod, color: colors[0], mark: false }, r: U.rnd(0, 3), m: U.pick([false, true]) }];
      /* sin figuras repetidas entre las opciones */
      const sig = o.map(x => { let c = x.m ? mir(x.f.cells) : norm(x.f.cells); return key(rotN(c, x.r)); });
      if (new Set(sig).size < 4) continue;
      ref = o[0].f; opts = o; break;
    }
    if (!ref) { ref = { cells: SHAPES.F, color: colors[0] }; opts = [{ f: ref, r: 1, ok: true }, { f: ref, r: 0, m: true }, { f: ref, r: 2, m: true }]; }
  }
  return { ref, opts: U.shuffle(opts) };
}

K.css(`
.g-memoria-x13{gap:.9rem}
.g-memoria-x13 .top{display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap;justify-content:center}
.g-memoria-x13 .refc{background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);padding:.6rem;width:min(34vh,44vw,15rem);aspect-ratio:1;position:relative;border:.25rem solid var(--g)}
.g-memoria-x13 .refc .lbl{position:absolute;left:50%;top:-1.1rem;transform:translateX(-50%);background:var(--g);color:#fff;font-family:'Baloo 2';font-size:1rem;padding:0 .8rem;border-radius:999px}
.g-memoria-x13 .fg{width:100%;height:100%;transition:transform 1s cubic-bezier(.5,0,.3,1)}
.g-memoria-x13 .fg svg{width:100%;height:100%;display:block}
.g-memoria-x13 .turn{display:inline-flex;align-items:center;gap:.5rem}
.g-memoria-x13 .turn svg{width:1.4em;height:1.4em}
.g-memoria-x13 .turn.help{animation:pulse 1s infinite}
.g-memoria-x13 .os{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;align-items:center;width:100%}
.g-memoria-x13 .os .ans{width:var(--ow);height:var(--ow);min-width:0;min-height:0;padding:.5rem;background:#fff!important;box-shadow:0 .4rem 0 var(--line);border:.25rem solid transparent}
.g-memoria-x13 .os .ans:hover{border-color:var(--gl)}
.g-memoria-x13 .os .ans.right{border-color:#5CC77A}
.g-memoria-x13 .os .ans.bad{background:#FFD3CF!important;opacity:.55}
.g-memoria-x13 .os .ans.help{box-shadow:0 0 0 .3rem #F2B93B;animation:pulse 1s infinite}
.g-memoria-x13 .os{--ow:min(28vw,24vh,12rem)}
.g-memoria-x13 .os.n4{--ow:min(21vw,21vh,10.5rem)}
@media (max-width:640px){.g-memoria-x13 .os{--ow:min(27vw,16vh)}.g-memoria-x13 .os.n4{--ow:min(40vw,15vh)}}
`);

const CW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 8a8.5 8.5 0 1 0 1.5 6"/><path d="M20 3v5h-5"/></svg>';
K.game({
  id: 'memoria-x13', group: 'memoria', num: 17, title: 'Gira la figura',
  blurb: 'Encuentra la figura que es la misma pero girada.',
  how: 'Mira la figura de arriba. Toca la que es igual pero girada, no la que está al revés como en un espejo.',
  icon: 'robot', levels: ['Giros sencillos', 'Con espejo', 'Piezas de tetris'], rounds: 5,
  round(g) {
    const R = build(g.level);
    g.ask('¿Cuál es la misma figura, pero girada?');
    const okOpt = R.opts.find(o => o.ok);
    const refEl = U.el(`<div class="refc"><span class="lbl">Mira esta</span>${render(R.ref, 0, false)}</div>`);
    const turn = U.el(`<button class="btn turn" aria-label="Girar la figura de ejemplo">${CW}Gírala</button>`);
    const top = U.el('<div class="top"></div>'); top.append(refEl, turn);
    const os = U.el(`<div class="os ${R.opts.length > 3 ? 'n4' : ''}"></div>`);
    g.area.append(top, os);
    let busy = false, done = false;
    const fg = refEl.querySelector('.fg');
    const spin = () => {
      if (busy || done) return; busy = true;
      fg.style.transform = `rotate(${okOpt.r * 90}deg)`;
      g.t(() => { fg.style.transition = 'transform .6s'; fg.style.transform = ''; g.t(() => { fg.style.transition = ''; busy = false; }, 650); }, 2000);
    };
    turn.onclick = spin;
    const btns = R.opts.map((o, k) => {
      const b = U.el(`<button class="ans" aria-label="Figura ${k + 1}">${render(o.f, o.r, o.m)}</button>`);
      b._o = o; os.appendChild(b);
      b.onclick = () => {
        if (done || b.disabled) return; K.sound.tap();
        if (o.ok) { done = true; b.classList.add('right'); btns.forEach(x => { if (x !== b) x.disabled = true; }); g.right(); }
        else { b.classList.add('bad'); b.disabled = true; g.wrong(o.m ? 'Esa está como en un espejo, ¡no está solo girada!' : 'Esa es otra figura. ¡Sigue buscando!'); }
      };
      return b;
    });
    g.helpHint = () => { turn.classList.add('help'); g.toast('Pulsa «Gírala» y mira cómo gira.'); g.say('Pulsa Gírala y mira cómo gira.'); spin(); };
  }
});
})();

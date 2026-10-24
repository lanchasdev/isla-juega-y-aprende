/* memoria-x11 — Agrupa por color, forma o tamaño */
(function () {
'use strict';
const K = window.Kids, U = K.util;

const COL = {
  red: { hex: '#E03131', f: 'rojas', fm: 'rojos', n: 'rojo' },
  blue: { hex: '#3B82F6', f: 'azules', fm: 'azules', n: 'azul' },
  yellow: { hex: '#FFC31F', f: 'amarillas', fm: 'amarillos', n: 'amarillo' },
  green: { hex: '#3DBE6B', f: 'verdes', fm: 'verdes', n: 'verde' }
};
const SHP = { circle: 'círculos', square: 'cuadrados', triangle: 'triángulos', star: 'estrellas', heart: 'corazones' };
const SIZE = { s: { rem: 2.6, f: 'pequeñas' }, m: { rem: 4.0, f: 'medianas' }, l: { rem: 5.6, f: 'grandes' } };
const SHAPES = Object.keys(SHP), COLS = Object.keys(COL);

/* una figura = {shape,color,size}. Una caja = {label, icon, test(fig)} */
function figs(n, gen) { return U.shuffle(Array.from({ length: n }, (_, i) => gen(i))); }

function build(level, i, last) {
  let mode;
  if (level === 1) mode = 'color';
  else if (level === 2) mode = i % 2 ? 'size' : 'shape';
  else mode = ['not', 'both', 'color', 'shape', 'size', 'not', 'both'][i % 4 === 0 ? U.rnd(0, 6) : U.rnd(0, 6)];
  if (level === 3 && mode === last) mode = mode === 'not' ? 'both' : 'not';
  const items = [], boxes = [];
  let rule, say;
  const sw = c => K.art.get('shape', 'circle', COL[c].hex);
  if (mode === 'color') {
    const cs = U.sample(COLS, 2);
    cs.forEach(c => boxes.push({ label: COL[c].f, icon: sw(c), test: f => f.color === c }));
    for (let k = 0; k < 6; k++) items.push({ shape: U.pick(['circle', 'square', 'triangle', 'star']), color: cs[k % 2], size: 'm' });
    rule = `Las ${COL[cs[0]].f} en una caja y las ${COL[cs[1]].f} en la otra.`;
    say = `Pon las figuras ${COL[cs[0]].f} en una caja y las ${COL[cs[1]].f} en la otra.`;
  } else if (mode === 'shape') {
    const ss = U.sample(SHAPES, 3), cnt = [3, 3, 2];
    ss.forEach(s => boxes.push({ label: SHP[s], icon: K.art.get('shape', s, '#8C7BE0'), test: f => f.shape === s }));
    ss.forEach((s, j) => { for (let k = 0; k < cnt[j]; k++) items.push({ shape: s, color: U.pick(COLS), size: 'm' }); });
    rule = `Cada forma en su caja: ${ss.map(s => SHP[s]).join(', ')}.`;
    say = `Pon cada forma en su caja: ${ss.map(s => SHP[s]).join(', ').replace(/, ([^,]*)$/, ' y $1')}.`;
  } else if (mode === 'size') {
    const cnt = [3, 3, 2];
    ['s', 'm', 'l'].forEach((z, j) => {
      boxes.push({ label: SIZE[z].f, icon: K.art.get('shape', 'star', '#F2B93B'), iconRem: [1.4, 2.2, 3.1][j], test: f => f.size === z });
      for (let k = 0; k < cnt[j]; k++) items.push({ shape: U.pick(SHAPES), color: U.pick(COLS), size: z });
    });
    rule = 'Las figuras pequeñas, las medianas y las grandes, cada una en su caja.';
    say = 'Pon las figuras pequeñas, las medianas y las grandes, cada una en su caja.';
  } else if (mode === 'not') {
    const c = U.pick(COLS), others = COLS.filter(x => x !== c);
    boxes.push({ label: COL[c].f, icon: sw(c), test: f => f.color === c });
    boxes.push({ label: `NO son ${COL[c].f}`, icon: sw(U.pick(others)), not: true, test: f => f.color !== c });
    const nr = U.rnd(3, 4);
    for (let k = 0; k < 8; k++) items.push({ shape: U.pick(SHAPES), color: k < nr ? c : U.pick(others), size: 'm' });
    rule = `Las ${COL[c].f} aquí. Las que NO son ${COL[c].f}, allí.`;
    say = `Pon las figuras ${COL[c].f} en una caja. Las que no son ${COL[c].f}, en la otra.`;
  } else { /* both: grandes y de un color */
    const c = U.pick(COLS), others = COLS.filter(x => x !== c);
    boxes.push({ label: `grandes ${COL[c].f}`, icon: sw(c), iconRem: 3.2, test: f => f.size === 'l' && f.color === c });
    boxes.push({ label: 'todo lo demás', icon: null, test: f => !(f.size === 'l' && f.color === c) });
    for (let k = 0; k < 3; k++) items.push({ shape: U.pick(SHAPES), color: c, size: 'l' });
    items.push({ shape: U.pick(SHAPES), color: c, size: 's' }, { shape: U.pick(SHAPES), color: U.pick(others), size: 'l' },
      { shape: U.pick(SHAPES), color: U.pick(others), size: 'l' }, { shape: U.pick(SHAPES), color: c, size: 's' }, { shape: U.pick(SHAPES), color: U.pick(others), size: 's' });
    rule = `Las GRANDES y ${COL[c].f} aquí. Todo lo demás, allí.`;
    say = `Pon aquí solo las figuras grandes y ${COL[c].f}. Todo lo demás, en la otra caja.`;
  }
  items.forEach(f => { f.box = boxes.findIndex(b => b.test(f)); });
  return { mode, items: U.shuffle(items), boxes, rule, say };
}

K.css(`
.g-memoria-x11{gap:.8rem;justify-content:flex-start}
.g-memoria-x11 .rule{font-family:'Baloo 2';font-size:1.45rem;line-height:1.1;text-align:center;padding:.55rem 1.4rem;background:#fff;border:.2rem solid var(--gl);border-radius:1.4rem;max-width:min(96%,44rem)}
.g-memoria-x11 .boxes{display:grid;grid-template-columns:repeat(var(--n),1fr);gap:.9rem;width:min(100%,56rem)}
.g-memoria-x11 .box{background:var(--gl);border:.28rem dashed var(--g);border-radius:1.6rem;min-height:11rem;padding:.4rem .5rem .6rem;display:flex;flex-direction:column;align-items:center;gap:.3rem;transition:transform .15s,background .15s;text-align:center;color:var(--ink)}
.g-memoria-x11 .box.hot,.g-memoria-x11 .box.aim{background:#FFF3BF;border-color:#F2B93B;transform:scale(1.03)}
.g-memoria-x11 .box.help{animation:pulse 1s infinite}
.g-memoria-x11 .box .lab{display:flex;align-items:center;gap:.4rem;font-family:'Baloo 2';font-size:1.25rem;line-height:1;font-weight:800;background:#fff;border-radius:999px;padding:.2rem .8rem .2rem .3rem;min-height:2.6rem}
.g-memoria-x11 .box .lab.noic{padding-left:.8rem}
.g-memoria-x11 .box .lab i{display:inline-flex;align-items:center;justify-content:center;width:2.4rem;height:2.4rem;flex:none}
.g-memoria-x11 .box .lab i svg{width:var(--ir,100%);height:var(--ir,100%)}
.g-memoria-x11 .box .in{display:flex;flex-wrap:wrap;gap:.15rem;justify-content:center;align-content:flex-start;flex:1;width:100%}
.g-memoria-x11 .tray{display:flex;flex-wrap:wrap;gap:.5rem .7rem;justify-content:center;align-items:center;min-height:7rem;width:min(100%,56rem);padding:.6rem;background:rgba(255,255,255,.7);border-radius:1.6rem}
.g-memoria-x11 .fig{width:calc(var(--s)*.33rem + .4rem);height:calc(var(--s)*.33rem + .4rem);padding:.15rem;border-radius:1rem;background:transparent;display:inline-flex;align-items:center;justify-content:center;transition:transform .15s;position:relative}
.g-memoria-x11 .fig svg{width:100%;height:100%;pointer-events:none}
.g-memoria-x11 .fig.sel{background:#fff;box-shadow:0 0 0 .22rem #F2B93B,0 .3rem 0 rgba(0,0,0,.12);transform:translateY(-.2rem) scale(1.08)}
.g-memoria-x11 .fig.dragging{z-index:50}
.g-memoria-x11 .box .fig{width:calc(var(--s)*.17rem + .8rem);height:calc(var(--s)*.17rem + .8rem)}
.g-memoria-x11 .fig.pl{animation:pop .4s}
.g-memoria-x11 .fig.help::after{content:'';position:absolute;inset:-.2rem;border-radius:1rem;border:.2rem solid #F2B93B;animation:pulse 1s infinite}
@media (max-width:640px){
  .g-memoria-x11 .box{min-height:9rem;padding:.3rem}
  .g-memoria-x11 .box .lab{font-size:1rem}
  .g-memoria-x11 .box .lab i{width:1.8rem;height:1.8rem}
  .g-memoria-x11 .rule{font-size:1.15rem}
  .g-memoria-x11 .boxes{gap:.5rem}
}
`);

let lastMode = '';
K.game({
  id: 'memoria-x11', group: 'memoria', num: 15, title: 'Agrupa por color, forma o tamaño',
  blurb: 'Mete cada figura en la caja que le toca según la regla.',
  how: 'Mira la regla del cartel. Toca una figura y luego la caja donde va, o arrástrala hasta la caja.',
  icon: 'shape', levels: ['Por color', 'Forma o tamaño', 'Reglas que cambian'], rounds: 4,
  round(g, i) {
    if (!K.art.has('shape')) { /* por si acaso */ }
    const R = build(g.level, i, lastMode); lastMode = R.mode;
    g.ask(R.say);
    const n = R.boxes.length;
    const rule = U.el(`<div class="rule">${U.esc(R.rule)}</div>`);
    const boxesEl = U.el(`<div class="boxes" style="--n:${n}"></div>`);
    const tray = U.el('<div class="tray"></div>');
    g.area.append(rule, boxesEl, tray);
    let sel = null, left = R.items.length;
    const boxEls = R.boxes.map((b, bi) => {
      const e = U.el(`<button class="box" aria-label="Caja: ${U.esc(b.label)}"><span class="lab ${b.icon ? '' : 'noic'}">${b.icon ? `<i style="--ir:${b.iconRem ? b.iconRem * 100 / 3.4 + '%' : '100%'}">${b.icon}</i>` : ''}${U.esc(b.label)}</span><div class="in"></div></button>`);
      e.dataset.i = bi; boxesEl.appendChild(e);
      e.onclick = () => { if (sel) drop(sel, e); };
      return e;
    });
    const figEls = R.items.map((f, k) => {
      const e = U.el(`<button class="fig" style="--s:${[0, 0, 0].length && SIZE[f.size].rem * 2.4}" aria-label="${U.esc(f.shape + ' ' + COL[f.color].n)}">${K.art.get('shape', f.shape, COL[f.color].hex)}</button>`);
      e.style.setProperty('--s', SIZE[f.size].rem * 2.7);
      e._f = f; tray.appendChild(e);
      K.drag(e, {
        targets: () => boxEls,
        onDrop: (t, el) => { drop(el, t); return true; },
        onTap: () => select(e, true)
      });
      return e;
    });
    function select(e, toggle) {
      if (e.dataset.done) return;
      figEls.forEach(x => x.classList.remove('sel', 'help'));
      boxEls.forEach(x => x.classList.remove('help'));
      if (toggle && sel === e) { sel = null; boxEls.forEach(x => x.classList.remove('aim')); return; }
      sel = e; e.classList.add('sel'); boxEls.forEach(x => x.classList.add('aim')); K.sound.tap();
    }
    function drop(e, boxEl) {
      if (e.dataset.done) return;
      boxEls.forEach(x => x.classList.remove('aim'));
      const f = e._f, bi = +boxEl.dataset.i;
      if (f.box === bi) {
        e.dataset.done = 1; e.disabled = true; e.classList.remove('sel', 'help'); e.classList.add('pl');
        e.style.transform = ''; e.style.touchAction = '';
        boxEl.querySelector('.in').appendChild(e); sel = null; K.sound.pop();
        if (--left === 0) g.t(() => g.right(), 350);
      } else {
        sel = null; e.classList.remove('sel');
        g.shake(boxEl); g.wrong(R.boxes[bi].not ? 'Mmm, esa sí es de ese color. Mira bien la regla.' : 'Esa figura va en otra caja. ¡Mira bien la regla!');
      }
    }
    g.helpHint = () => {
      const e = figEls.find(x => !x.dataset.done); if (!e) return;
      e.classList.add('help'); boxEls[e._f.box].classList.add('help');
      g.toast('Esta figura va en la caja que brilla.'); g.say('Esta figura va en la caja que brilla.');
    };
  }
});
})();

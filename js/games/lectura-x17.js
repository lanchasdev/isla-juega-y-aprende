/* Letras confundidas — lectura-x17 */
(function () {
'use strict';
const K = window.Kids, U = K.util, A = K.art;

const S = (inner) => `<svg viewBox="0 0 100 100">${inner}</svg>`;
A.add({
  'lx17-dado': S(`<rect x="22" y="26" width="56" height="56" rx="12" fill="#fff" stroke="#E4DCFA" stroke-width="4"/><path d="M22 38q28-18 56 0" fill="none" stroke="#EADFC8" stroke-width="3"/><g fill="#8C7BE0"><circle cx="38" cy="46" r="5"/><circle cx="62" cy="46" r="5"/><circle cx="38" cy="66" r="5"/><circle cx="62" cy="66" r="5"/><circle cx="50" cy="56" r="5"/></g>`),
  'lx17-dedo': S(`<path d="M40 88V38q0-18 12-18t12 18v50z" fill="#FFD7B5" stroke="#F3B58F" stroke-width="3"/><path d="M26 88V58q0-8 8-8M74 88V58q0-8-8-8" fill="none" stroke="#F3B58F" stroke-width="3"/><path d="M44 28q4-4 10 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="52" cy="40" r="2.5" fill="#F3B58F"/>`),
  'lx17-queso': S(`<path d="M12 62l60-34 16 14v28H12z" fill="#FFD23F"/><path d="M12 62l60-34 16 14-60 20z" fill="#FFE27A"/><path d="M12 62h76" stroke="#F2B93B" stroke-width="3"/><circle cx="34" cy="76" r="5" fill="#F2B93B"/><circle cx="62" cy="72" r="6" fill="#F2B93B"/><circle cx="76" cy="80" r="3.5" fill="#F2B93B"/><circle cx="52" cy="42" r="4" fill="#F2B93B"/>`),
  'lx17-dino': S(`<ellipse cx="46" cy="64" rx="30" ry="20" fill="#7FCB8A"/><path d="M70 60q20-4 22-24-12 6-20 6z" fill="#7FCB8A"/><path d="M62 64q16 10 28 4-8-10-24-10z" fill="#7FCB8A"/><circle cx="26" cy="46" r="16" fill="#7FCB8A"/><path d="M34 44L40 28 46 44M48 48l6-14 4 16M60 54l8-10 2 14" fill="#5FB070"/><circle cx="22" cy="44" r="4" fill="#fff"/><circle cx="22" cy="44" r="2" fill="#14235B"/><path d="M14 54q6 5 12 0" stroke="#14235B" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="30" y="76" width="8" height="12" rx="4" fill="#5FB070"/><rect x="54" y="76" width="8" height="12" rx="4" fill="#5FB070"/>`)
});

const artOf = x => x.startsWith('coin:') ? A.get('coin', x.slice(5)) : A.get(x);
/* [palabra, dibujo] */
const LIST = {
  b: [['barco', 'boat'], ['balón', 'ball'], ['bota', 'boot'], ['botón', 'button'], ['ballena', 'whale'], ['búho', 'owl'], ['bufanda', 'scarf']],
  d: [['dado', 'lx17-dado'], ['dedo', 'lx17-dedo'], ['delfín', 'dolphin'], ['dinosaurio', 'lx17-dino']],
  p: [['pato', 'duck'], ['pera', 'pear'], ['perro', 'dog'], ['pez', 'fish'], ['pollito', 'chick'], ['pingüino', 'penguin']],
  q: [['queso', 'lx17-queso'], ['quince', 'coin:15']],
  m: [['mono', 'monkey'], ['mesa', 'table'], ['manzana', 'apple'], ['mariposa', 'butterfly']],
  n: [['nube', 'cloud'], ['naranja', 'orange'], ['nieve', 'snowflake']]
};
/* huecos en medio de la palabra: no forman otra palabra con la letra gemela */
const INNER = [
  { w: 'dado', i: 2, art: 'lx17-dado' }, { w: 'mono', i: 2, art: 'monkey' }, { w: 'luna', i: 2, art: 'moon' }, { w: 'manzana', i: 2, art: 'apple' },
  { w: 'sombrero', i: 3, art: 'hat' }
];
const TWIN = { b: 'd', d: 'b', p: 'q', q: 'p', m: 'n', n: 'm' };
const PAIRS = [['b', 'd'], ['p', 'q'], ['m', 'n']];
const SAY = { b: 'be', d: 'de', p: 'pe', q: 'cu', m: 'eme', n: 'ene' };
const TIP = {
  bd: 'La <b>b</b> tiene el palito primero y la barriga mira hacia delante. La <b>d</b> tiene la barriga mirando hacia atrás.',
  pq: 'La <b>p</b> tiene el palito hacia abajo y la barriga mira hacia delante. La <b>q</b> tiene la barriga mirando hacia atrás.',
  mn: 'La <b>m</b> tiene dos arcos, como dos jorobas. La <b>n</b> tiene un solo arco.'
};
const key = pair => pair.slice().sort().join('');

Kids.css(`
.g-lectura-x17 .wrap{width:100%;max-width:46rem;display:flex;flex-direction:column;align-items:center;gap:.9rem}
.g-lectura-x17 .pic.big{width:clamp(7rem,22vh,10rem);height:clamp(7rem,22vh,10rem)}
.g-lectura-x17 .pic.big svg{width:100%;height:100%;max-width:none;max-height:none}
.g-lectura-x17 .tiles{display:flex;gap:.35rem;justify-content:center;flex-wrap:wrap}
.g-lectura-x17 .tile{min-width:3rem;height:4.2rem;padding:0 .3rem;border-radius:1rem;background:#fff;box-shadow:0 .3rem 0 var(--line);display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:800;font-size:clamp(2.2rem,6vh,3.2rem);line-height:1}
.g-lectura-x17 .tile.gap{background:#FFF3BF;border:.2rem dashed var(--yellow);color:var(--gd)}
.g-lectura-x17 .tile.got{background:#BDEFC8;color:var(--ink)}
.g-lectura-x17 .ans.let{font-size:clamp(3rem,9vh,4.6rem);min-width:6.5rem;min-height:6rem}
.g-lectura-x17 .odd{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center;max-width:100%}
.g-lectura-x17 .odd .ans{font-size:clamp(2.6rem,7.5vh,3.8rem);min-width:4.4rem;min-height:5rem;padding:.1rem .8rem}
.g-lectura-x17 .wopts .pic{width:clamp(6.5rem,19vw,9rem)}
.g-lectura-x17 .wopts .pic svg{height:5.2rem;width:100%}
.g-lectura-x17 .wopts .pic .lbl{font-size:clamp(1.3rem,3vh,1.7rem)}
.g-lectura-x17 .wopts .pic.txt{min-height:4.5rem;padding:.6rem 1.2rem}
.g-lectura-x17 .wopts .pic.txt .lbl{font-size:clamp(1.6rem,4vh,2.2rem)}
.g-lectura-x17 .tip{background:#FFF3BF;border-radius:1.4rem;padding:.6rem 1.2rem;font-family:'Baloo 2';font-size:clamp(1.1rem,2.6vh,1.4rem);text-align:center;max-width:36rem;box-shadow:0 .3rem 0 #F2D77A;animation:pop .4s}
.g-lectura-x17 .tip b{font-size:1.5em;color:var(--lecturaD)}
.g-lectura-x17 .help{animation:pulse .9s infinite;outline:.25rem solid var(--yellow)}
`);

let last = '';
const MODES = { 1: ['fill', 'start', 'odd'], 2: ['fill', 'start', 'odd'], 3: ['fill', 'start', 'odd'] };

K.game({
  id: 'lectura-x17', group: 'lectura', num: 21,
  title: 'Letras confundidas', icon: 'book', rounds: 8,
  blurb: 'b y d, p y q, m y n: ¡no te líes! Busca la letra o la palabra correcta.',
  how: 'Mira bien las letras. Completa la palabra, toca la palabra que empieza por la letra pedida o busca la letra que es distinta.',
  levels: ['b y d con dibujos', 'p y q, m y n', 'Todas mezcladas'],
  round(g, i) {
    const lv = g.level;
    let mode; do { mode = U.pick(MODES[lv]); } while (mode === last && Math.random() < .8); last = mode;
    const pairs = lv === 1 ? [PAIRS[0]] : lv === 2 ? [PAIRS[1], PAIRS[2]] : PAIRS;
    const pair = U.shuffle(U.pick(pairs));
    const tip = TIP[key(pair)];
    const root = U.el('<div class="wrap"></div>'); g.area.appendChild(root);
    let tipEl = null;
    const showTip = () => {
      if (tipEl) return;
      tipEl = U.el(`<div class="tip">${tip}</div>`); root.appendChild(tipEl);
    };
    g.helpHint = () => { showTip(); g.say(tip.replace(/<[^>]+>/g, '')); };
    const mark = (btns, ok) => { const b = btns.find(x => ok(x)); if (b) b.classList.add('help'); };

    if (mode === 'fill') {
      /* palabra con un hueco */
      let item;
      const inner = lv > 1 && Math.random() < .4 ? INNER.filter(x => pairs.some(p => p.includes(x.w[x.i]))) : [];
      if (inner.length) { item = U.pick(inner); }
      else {
        const L = U.pick(pair); const e = U.pick(LIST[L]); item = { w: e[0], i: 0, art: e[1] };
      }
      const ch = item.w[item.i];
      const pr = PAIRS.find(p => p.includes(ch)); const opt = U.shuffle(pr);
      const tipX = TIP[key(pr)];
      g.helpHint = () => { if (!tipEl) { tipEl = U.el(`<div class="tip">${tipX}</div>`); root.appendChild(tipEl); } g.say(tipX.replace(/<[^>]+>/g, '')); mark(btns, b => b._l === ch); };
      g.ask('¿Qué letra falta en la palabra?');
      root.innerHTML = `<div class="pic big" aria-label="${U.esc(item.w)}">${artOf(item.art)}</div>
        <div class="tiles">${item.w.split('').map((c, k) => k === item.i ? '<span class="tile gap">?</span>' : `<span class="tile">${U.esc(c)}</span>`).join('')}</div>
        <div class="opts"></div>`;
      const gap = root.querySelector('.gap'); let done = false;
      const btns = opt.map(l => {
        const b = U.el(`<button class="ans let" aria-label="Letra ${l}">${l}</button>`); b._l = l;
        b.onclick = () => {
          if (done || b.disabled) return; g.say(SAY[l]);
          if (l === ch) { done = true; btns.forEach(x => x.classList.remove('help')); b.classList.add('right'); gap.textContent = ch; gap.classList.remove('gap'); gap.classList.add('got'); g.t(() => g.say(item.w), 500); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong('Casi. Mira bien hacia dónde mira la barriga'); }
        };
        root.querySelector('.opts').appendChild(b); return b;
      });
    } else if (mode === 'start') {
      const L = U.pick(pair), T = TWIN[L];
      const target = U.pick(LIST[L]);
      const nd = lv === 1 ? 2 : lv === 2 ? 2 : 3;
      const ds = U.sample(LIST[T], Math.min(nd, LIST[T].length));
      const all = U.shuffle([target].concat(ds));
      g.ask(`Toca la palabra que empieza por la ${L}`);
      root.innerHTML = `<div class="tiles"><span class="tile got" style="min-width:4.5rem;height:5rem;font-size:3.6rem">${L}</span></div><div class="opts wopts"></div>`;
      let done = false;
      const btns = all.map(e => {
        const noPic = lv === 3;
        const b = U.el(noPic ? `<button class="pic txt"><span class="lbl">${U.esc(e[0])}</span></button>` : `<button class="pic" aria-label="${U.esc(e[0])}">${artOf(e[1])}<span class="lbl">${U.esc(e[0])}</span></button>`);
        b._e = e;
        b.onclick = () => {
          if (done || b.disabled) return; g.say(e[0]);
          if (e === target) { done = true; btns.forEach(x => x.classList.remove('help')); b.classList.add('right'); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong('Mira la primera letra con calma'); }
        };
        root.querySelector('.opts').appendChild(b); return b;
      });
      g.helpHint = () => { showTip(); g.say(tip.replace(/<[^>]+>/g, '')); mark(btns, b => b._e === target); };
    } else {
      /* busca la letra distinta */
      const n = lv === 1 ? 5 : lv === 2 ? 6 : U.rnd(8, 9);
      const [x, y] = pair;
      const oddAt = U.rnd(0, n - 1);
      const letters = U.range(n).map(k => k === oddAt ? y : x);
      g.ask('Busca la letra que es distinta');
      root.innerHTML = '<div class="odd"></div>';
      let done = false;
      const btns = letters.map((l, k) => {
        const b = U.el(`<button class="ans" aria-label="Letra ${l}">${l}</button>`); b._odd = k === oddAt;
        b.onclick = () => {
          if (done || b.disabled) return; g.say(SAY[l]);
          if (b._odd) { done = true; btns.forEach(z => z.classList.remove('help')); b.classList.add('right'); g.right('¡La has encontrado!'); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong('Esa es igual que las otras. ¡Busca otra!'); }
        };
        root.querySelector('.odd').appendChild(b); return b;
      });
      g.helpHint = () => { showTip(); g.say(tip.replace(/<[^>]+>/g, '')); mark(btns, b => b._odd); };
    }
  }
});
})();

/* memoria-13 — ¿Qué sigue? : completar series y patrones */
(function () {
'use strict';
const K = window.Kids, U = K.util;

const COLORS = [
  { c: '#E03131', m: 'rojo', f: 'roja' }, { c: '#339AF0', m: 'azul', f: 'azul' }, { c: '#40C057', m: 'verde', f: 'verde' },
  { c: '#FAB005', m: 'amarillo', f: 'amarilla' }, { c: '#9C36B5', m: 'morado', f: 'morada' }, { c: '#FD7E14', m: 'naranja', f: 'naranja' }
];
const SHAPES = { circle: ['círculo', 0], square: ['cuadrado', 0], triangle: ['triángulo', 0], diamond: ['rombo', 0], star: ['estrella', 1], heart: ['corazón', 0] };
const THINGS = {
  apple: 'manzana', banana: 'plátano', pear: 'pera', orange: 'naranja', strawberry: 'fresa', cherry: 'cereza', watermelon: 'sandía',
  duck: 'pato', cat: 'gato', dog: 'perro', pig: 'cerdo', cow: 'vaca', rabbit: 'conejo', frog: 'rana', bear: 'oso', mouse: 'ratón',
  sheep: 'oveja', bird: 'pájaro', fish: 'pez', car: 'coche', ball: 'pelota', boat: 'barco', kite: 'cometa', drum: 'tambor'
};

/* ---- elementos de una serie ---- */
function shape(sh, col, s) { return { sh, col, k: sh + col.c + (s || 1), html: K.art.get('shape', sh, col.c), n: SHAPES[sh][0] + ' ' + (SHAPES[sh][1] ? col.f : col.m), s: s || 1 }; }
function thing(t) { return { k: t, html: K.art.get(t), n: THINGS[t], s: 1 }; }
function sized(base, s) {
  const w = ['muy pequeño', 'pequeño', 'grande', 'muy grande'][[.4, .6, .8, 1].indexOf(s)], f = /a$/.test(base.n.split(' ')[0]);
  return { k: base.k + '@' + s, html: base.html, n: base.n + ' ' + (f ? w.replace(/o$/, 'a') : w), s };
}
function num(v) { return { k: 'n' + v, num: v, n: String(v) }; }

function twoDifferent() {          // dos elementos distintos (colores de una forma o cosas distintas)
  if (Math.random() < .5) {
    const sh = U.pick(Object.keys(SHAPES)), cs = U.sample(COLORS, 4);
    return cs.map(c => shape(sh, c));
  }
  return U.sample(Object.keys(THINGS), 4).map(thing);
}

/* devuelve { seq:[items vistos], ans:item, dis:[items distractores], hint } */
const KINDS = {
  /* nivel 1: AB */
  ab() {
    const [A, B, C, D] = twoDifferent();
    const first = Math.random() < .5 ? [A, B] : [B, A];
    const seq = [0, 1, 2, 3, 4].map(i => first[i % 2]);
    return { seq, ans: first[1], dis: [first[0], C, D], hint: 'Mira cómo se repiten: uno, otro, uno, otro…' };
  },
  /* nivel 2 */
  abc() {
    const [A, B, C, D] = twoDifferent();
    return { seq: [A, B, C, A, B], ans: C, dis: [A, B, D], hint: 'Son tres que se repiten una y otra vez.' };
  },
  aab() {
    const [A, B, C, D] = twoDifferent();
    return { seq: [A, A, B, A, A], ans: B, dis: [A, C, D], hint: 'Primero van dos iguales y luego uno distinto.' };
  },
  abb() {
    const [A, B, C, D] = twoDifferent();
    return { seq: [A, B, B, A, B], ans: B, dis: [A, C, D], hint: 'Primero uno y luego dos iguales.' };
  },
  grow() {
    const base = Math.random() < .5 ? shape(U.pick(Object.keys(SHAPES)), U.pick(COLORS)) : thing(U.pick(Object.keys(THINGS)));
    const S = [.4, .6, .8, 1], up = Math.random() < .6;
    const order = up ? S : S.slice().reverse();
    const ans = sized(base, order[3]);
    return { seq: order.slice(0, 3).map(s => sized(base, s)), ans, dis: S.filter(s => s !== order[3]).map(s => sized(base, s)).slice(0, 2),
      hint: up ? 'Cada vez es más grande.' : 'Cada vez es más pequeño.', sizeMode: true };
  },
  /* nivel 3 */
  combo() {
    const shs = U.sample(Object.keys(SHAPES), 2), cs = U.sample(COLORS, 2);
    const A = shape(shs[0], cs[0]), B = shape(shs[1], cs[1]);
    const first = Math.random() < .5 ? [A, B] : [B, A];
    const P = first[0], Q = first[1];
    return { seq: [0, 1, 2, 3, 4].map(i => first[i % 2]), ans: Q,
      dis: [shape(Q.sh, P.col), shape(P.sh, Q.col), P],
      hint: 'Fíjate en la forma y en el color: los dos se repiten.' };
  },
  two() {
    const shs = U.sample(Object.keys(SHAPES), 2), cs = U.sample(COLORS, 3);
    const at = i => shape(shs[i % 2], cs[i % 3]);
    return { seq: [0, 1, 2, 3, 4].map(at), ans: at(5),
      dis: [shape(shs[1], cs[0]), shape(shs[0], cs[2]), shape(shs[1], cs[1])],
      hint: 'La forma cambia de dos en dos y el color de tres en tres.' };
  },
  num() {
    const kinds = [
      { st: 1, a: () => U.rnd(1, 5), t: 'Cada número es uno más.' }, { st: 2, a: () => U.pick([2, 1, 3]), t: 'Cuenta de dos en dos.' },
      { st: 5, a: () => U.pick([5, 10, 0]), t: 'Cuenta de cinco en cinco.' }, { st: 10, a: () => U.pick([10, 0, 5]), t: 'Cuenta de diez en diez.' },
      { st: -1, a: () => U.rnd(8, 12), t: 'Cada número es uno menos.' }, { st: -2, a: () => U.rnd(10, 14), t: 'Cuenta hacia atrás de dos en dos.' }
    ];
    const k = U.pick(kinds), a0 = k.a(), v = U.range(5).map(i => a0 + k.st * i);
    const ans = v[4], last = v[3];
    const cand = [...new Set([ans - 1, ans + 1, ans - 2, ans + 2, last, ans + k.st * 2, ans - k.st])].filter(x => x >= 0 && x !== ans);
    return { seq: v.slice(0, 4).map(num), ans: num(ans), dis: U.sample(cand, 3).map(num), hint: k.t, numeric: true };
  }
};
const PLAN = {
  1: () => U.shuffle(['ab', 'ab', 'ab', 'ab', 'ab', 'ab', 'ab', 'ab']),
  2: () => U.shuffle(['abc', 'abc', 'aab', 'aab', 'abb', 'grow', 'grow', 'abc']),
  3: () => U.shuffle(['combo', 'combo', 'two', 'two', 'num', 'num', 'num', 'num'])
};
let plan = [];

K.css(`
.g-memoria-13{gap:1.2rem}
.g-memoria-13 .seq{display:flex;gap:.55rem;justify-content:center;align-items:center;width:100%;flex:none}
.g-memoria-13 .cell{--c:clamp(3.2rem,min(13vw,17vh),7.4rem);width:var(--c);height:var(--c);padding:.2rem;flex:none;box-sizing:border-box;border-radius:1.2rem}
.g-memoria-13 .cell .in{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.g-memoria-13 .cell .in svg{width:calc(var(--s,1)*100%);height:calc(var(--s,1)*100%);max-width:none;max-height:none}
.g-memoria-13 .cell b{font-family:'Baloo 2';font-weight:800;font-size:calc(var(--c)*.5);line-height:1;color:var(--ink)}
.g-memoria-13 .slot.cell{font-size:calc(var(--c)*.55);color:#7a93d0}
.g-memoria-13 .opts{gap:1rem;flex:none}
.g-memoria-13 .opts .pic{--c:clamp(5rem,min(24vw,22vh),9.5rem);width:var(--c);height:var(--c);padding:.4rem;box-sizing:border-box}
.g-memoria-13 .opts .pic .in{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.g-memoria-13 .opts .pic .in svg{width:calc(var(--s,1)*100%);height:calc(var(--s,1)*100%);max-width:none;max-height:none}
.g-memoria-13 .opts .ans{min-width:5.5rem}
.g-memoria-13 .chip svg{width:1.2rem;height:1.2rem}
.g-memoria-13 .fly{position:absolute;z-index:50;pointer-events:none;transition:left .55s cubic-bezier(.4,1.2,.5,1),top .55s cubic-bezier(.4,1.2,.5,1),width .55s,height .55s}
.g-memoria-13 .fly .in{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.g-memoria-13 .fly svg{width:calc(var(--s,1)*100%);height:calc(var(--s,1)*100%)}
.g-memoria-13 .fly b{font-family:'Baloo 2';font-weight:800;font-size:3rem}
`);

const inner = it => it.num !== undefined ? `<b>${it.num}</b>` : `<span class="in" style="--s:${it.s}">${it.html}</span>`;

K.game({
  id: 'memoria-13', group: 'memoria', num: 3, title: '¿Qué sigue?',
  blurb: 'Mira la serie, dila en voz alta y toca lo que va en el hueco.',
  how: 'Mira la serie de dibujos. Toca cada uno para oírlo y di la serie en voz alta. Después elige lo que va en el hueco.',
  icon: 'balloon', levels: ['Patrones AB', 'Patrones más largos', 'Formas, colores y números'], rounds: 8,
  round(g, i) {
    if (i === 0 || !plan.length) plan = PLAN[g.level]();
    const sc = KINDS[plan[i % plan.length]]();
    const seqNames = sc.seq.map(x => x.n).join(', ');
    const slot = U.el('<div class="slot cell" aria-label="hueco">?</div>');
    const seq = U.el('<div class="seq"></div>');
    sc.seq.forEach(it => {
      const b = U.el(`<button class="pic cell" aria-label="${U.esc(it.n)}">${inner(it)}</button>`);
      b.onclick = () => { K.sound.tap(); g.say(it.n); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); };
      seq.appendChild(b);
    });
    seq.appendChild(slot);
    const hear = U.el(`<button class="chip" type="button">${K.icons.speaker} Escuchar la serie</button>`);
    hear.onclick = () => g.say(seqNames);
    const opts = U.el('<div class="opts"></div>');
    g.area.append(seq, hear, opts);
    g.ask(sc.numeric ? '¿Qué número sigue? Di la serie en voz alta.' : '¿Qué sigue? Di la serie en voz alta.');

    const uniq = [sc.ans, ...sc.dis].filter((d, ix, a) => a.findIndex(e => e.k === d.k) === ix);
    const all = U.shuffle(uniq.slice(0, g.level === 1 ? 3 : 4));
    let busy = false;
    const els = all.map(it => {
      const b = U.el(it.num !== undefined ? `<button class="ans" aria-label="${it.num}">${it.num}</button>` : `<button class="pic" aria-label="${U.esc(it.n)}">${inner(it)}</button>`);
      b.onclick = () => {
        if (busy) return;
        if (it.k !== sc.ans.k) { b.classList.add('bad'); b.disabled = true; g.wrong(); return; }
        busy = true; K.sound.pop();
        const scr = g.screen.getBoundingClientRect(), r1 = b.getBoundingClientRect(), r2 = slot.getBoundingClientRect();
        const fl = U.el(`<div class="fly pic" style="left:${r1.left - scr.left}px;top:${r1.top - scr.top}px;width:${r1.width}px;height:${r1.height}px;padding:0;border:0;background:transparent;box-shadow:none">${inner(it)}</div>`);
        g.screen.appendChild(fl); b.style.visibility = 'hidden';
        void fl.offsetWidth;
        fl.style.left = r2.left - scr.left + 'px'; fl.style.top = r2.top - scr.top + 'px'; fl.style.width = r2.width + 'px'; fl.style.height = r2.height + 'px';
        g.t(() => {
          fl.remove(); slot.innerHTML = inner(it); slot.classList.add('filled', 'pop');
          g.say(seqNames + ', ' + it.n);
          g.t(() => g.right(), 900);
        }, 600);
      };
      opts.appendChild(b); return b;
    });
    g.helpHint = () => {
      const k = all.findIndex(o => o.k === sc.ans.k);
      els[k] && els[k].classList.add('pulse');
      g.toast(sc.hint); g.say(sc.hint);
    };
  }
});
})();

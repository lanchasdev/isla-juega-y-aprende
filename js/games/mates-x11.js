/* Mates X11 — Problemas con dibujos */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

/* Banco de problemas: cada uno con su dibujo, su historia y cómo entran / salen los dibujos.
   inA = cómo llegan los nuevos; outA = cómo se van los que se quitan. */
const BANK = [
  { art: 'balloon', arg: ['#FF7E69', '#4C8DF6', '#FFD23F', '#8C7BE0', '#47B5BF'], sc: 'sky', start: 'Tengo {n} globos', add: ['me regalan', 'me regalan'], addT: ' más', sub: ['se escapa', 'se escapan'], inA: 'rise', outA: 'up', q: '¿Cuántos globos tengo ahora?' },
  { art: 'apple', sc: 'meadow', start: 'Tengo {n} manzanas', add: ['me dan', 'me dan'], addT: ' más', sub: ['me como', 'me como'], subT: '', inA: 'drop', outA: 'shrink', q: '¿Cuántas manzanas tengo ahora?' },
  { art: 'bird', sc: 'sky', deco: 'tree', start: 'Hay {n} pájaros en el árbol', add: ['llega', 'llegan'], addT: ' más', sub: ['se va', 'se van'], inA: 'left', outA: 'flyRight', q: '¿Cuántos pájaros hay ahora?' },
  { art: 'duck', sc: 'pond', start: 'Hay {n} patos en el estanque', add: ['llega', 'llegan'], addT: ' más', sub: ['se va', 'se van'], inA: 'left', outA: 'right', q: '¿Cuántos patos hay ahora?' },
  { art: 'fish', sc: 'pond', start: 'Hay {n} peces en el agua', add: ['llega', 'llegan'], addT: ' más', sub: ['se va nadando', 'se van nadando'], inA: 'right', outA: 'left', q: '¿Cuántos peces hay ahora?' },
  { art: 'butterfly', sc: 'meadow', start: 'Hay {n} mariposas en el jardín', add: ['llega', 'llegan'], addT: ' más', sub: ['se va volando', 'se van volando'], inA: 'left', outA: 'flyRight', q: '¿Cuántas mariposas hay ahora?' },
  { art: 'frog', sc: 'pond', start: 'Hay {n} ranas en el estanque', add: ['llega saltando', 'llegan saltando'], addT: ' más', sub: ['se va saltando', 'se van saltando'], inA: 'drop', outA: 'jump', q: '¿Cuántas ranas hay ahora?' },
  { art: 'chick', sc: 'meadow', start: 'Hay {n} pollitos en la granja', add: ['llega', 'llegan'], addT: ' más', sub: ['se va', 'se van'], inA: 'right', outA: 'right', q: '¿Cuántos pollitos hay ahora?' },
  { art: 'cow', sc: 'meadow', start: 'Hay {n} vacas en el prado', add: ['llega', 'llegan'], addT: ' más', sub: ['se va', 'se van'], inA: 'left', outA: 'right', q: '¿Cuántas vacas hay ahora?' },
  { art: 'bee', sc: 'sky', start: 'Hay {n} abejas en la flor', add: ['llega', 'llegan'], addT: ' más', sub: ['se va volando', 'se van volando'], inA: 'right', outA: 'flyRight', q: '¿Cuántas abejas hay ahora?' },
  { art: 'rabbit', sc: 'meadow', start: 'Hay {n} conejos en el campo', add: ['llega', 'llegan'], addT: ' más', sub: ['se va saltando', 'se van saltando'], inA: 'left', outA: 'jump', q: '¿Cuántos conejos hay ahora?' },
  { art: 'cherry', sc: 'meadow', start: 'Tengo {n} cerezas', add: ['me dan', 'me dan'], addT: ' más', sub: ['me como', 'me como'], subT: '', inA: 'drop', outA: 'shrink', q: '¿Cuántas cerezas tengo ahora?' },
  { art: 'car', sc: 'meadow', start: 'Hay {n} coches en el parking', add: ['llega', 'llegan'], addT: ' más', sub: ['se va', 'se van'], inA: 'left', outA: 'right', q: '¿Cuántos coches hay ahora?' },
  { art: 'star', sc: 'sky', start: 'Hay {n} estrellas en el cielo', add: ['sale', 'salen'], addT: ' más', sub: ['se apaga', 'se apagan'], inA: 'pop', outA: 'shrink', q: '¿Cuántas estrellas hay ahora?' }
];
let lastKey = '';

Kids.css(`
.g-mates-x11{gap:.9rem}
.g-mates-x11 .px-scene{width:min(46rem,96%);min-height:15rem;padding:1rem .8rem 1.2rem;display:flex;align-items:center;justify-content:center;border:.2rem solid rgba(20,35,91,.08)}
.g-mates-x11 .px-scene.pond{background:linear-gradient(#CDEBFA 0 22%,#7FD0F0 22%)}
.g-mates-x11 .px-deco{position:absolute;pointer-events:none;opacity:.9}
.g-mates-x11 .px-deco.tree{right:-1rem;bottom:-.5rem;width:11rem}
.g-mates-x11 .px-stage{position:relative;z-index:2;display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:.25rem .35rem;width:100%}
.g-mates-x11 .px-it{width:var(--is,4rem);height:var(--is,4rem);flex:none;position:relative}
.g-mates-x11 .px-it svg{width:100%;height:100%;display:block}
.g-mates-x11 .px-it.off{visibility:hidden}
.g-mates-x11 .px-it .px-b{position:absolute;right:-.1rem;top:-.2rem;min-width:1.5rem;height:1.5rem;border-radius:999px;background:var(--g);color:#fff;border:.13rem solid #fff;font-family:'Baloo 2';font-weight:800;font-size:1rem;line-height:1.2rem;text-align:center;animation:pop .3s both;padding:0 .2rem}
.g-mates-x11 .px-bar{display:flex;gap:.8rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-mates-x11 .px-again{font-size:1.25rem;padding:.3rem 1.3rem}
.g-mates-x11 .px-story{font-family:'Baloo 2';font-weight:800;font-size:1.35rem;line-height:1.15;background:#fff;border-radius:1.4rem;padding:.4rem 1.2rem;box-shadow:0 .3rem 0 var(--line);text-align:center;max-width:min(46rem,96%)}
.g-mates-x11 .opts .ans.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
@media (max-width:640px){.g-mates-x11 .px-scene{min-height:12rem}.g-mates-x11 .px-story{font-size:1.1rem}.g-mates-x11 .px-deco.tree{width:7rem}}
`);

const plural = (n, pair) => pair[n === 1 ? 0 : 1];

/* genera la secuencia de pasos [{t:'add'|'sub', n}] y el resultado */
function make(lv) {
  for (let t = 0; t < 80; t++) {
    let a, steps;
    if (lv === 1) {
      if (Math.random() < .5) { const tot = U.rnd(3, 5), a0 = U.rnd(2, tot - 1); a = a0; steps = [{ t: 'add', n: tot - a0 }]; }
      else { a = U.rnd(3, 5); steps = [{ t: 'sub', n: U.rnd(1, a - 1) }]; }
    } else if (lv === 2) {
      if (Math.random() < .5) { const tot = U.rnd(5, 10); a = U.rnd(2, tot - 1); steps = [{ t: 'add', n: tot - a }]; }
      else { a = U.rnd(5, 10); steps = [{ t: 'sub', n: U.rnd(1, a - 2) }]; }
    } else {
      a = U.rnd(2, 12);
      if (Math.random() < .5) { const b = U.rnd(1, Math.min(8, 20 - a)); steps = [{ t: 'add', n: b }, { t: 'sub', n: U.rnd(1, a + b - 2) }]; }
      else { const b = U.rnd(1, a - 1); const c = U.rnd(1, Math.min(8, 20 - (a - b))); steps = [{ t: 'sub', n: b }, { t: 'add', n: c }]; }
    }
    let cur = a, max = a, ok = true;
    steps.forEach(s => { cur += s.t === 'add' ? s.n : -s.n; max = Math.max(max, cur); if (cur < 1 || cur > 20) ok = false; });
    if (!ok) continue;
    const key = a + steps.map(s => s.t + s.n).join('');
    if (key === lastKey) continue;
    lastKey = key;
    return { a, steps, r: cur, max };
  }
  return { a: 3, steps: [{ t: 'add', n: 2 }], r: 5, max: 5 };
}

function choices(c, count, max) {
  const pool = [];
  for (let d = -3; d <= 3; d++) { const v = c + d; if (d && v >= 1 && v <= max) pool.push(v); }
  const near = U.shuffle(pool.filter(v => Math.abs(v - c) <= 1)), rest = U.shuffle(pool.filter(v => Math.abs(v - c) > 1));
  return U.shuffle([c].concat(near, rest).slice(0, count));
}

Kids.game({
  id: 'mates-x11', group: 'mates', num: 16,
  title: 'Problemas con dibujos',
  blurb: 'Mira la historia animada y elige el resultado.',
  how: 'Mira lo que pasa en el dibujo: algo llega o algo se va. Luego toca el número que dice cuántos hay ahora. Si quieres, pulsa Ver otra vez.',
  icon: 'balloon',
  levels: ['Hasta 5', 'Hasta 10', 'Hasta 20, dos pasos'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, p = make(lv);
    let it; do { it = U.pick(BANK); } while (g._lastArt === it.art);
    g._lastArt = it.art;
    const artName = it.art;
    const colors = it.arg;
    const mk = k => A.get(artName, colors ? colors[k % colors.length] : undefined);

    /* texto de la historia */
    const part = (s, first) => {
      const v = plural(s.n, s.t === 'add' ? it.add : it.sub);
      const tail = s.t === 'add' ? it.addT : (it.subT || '');
      return v + ' ' + s.n + tail;
    };
    let story = it.start.replace('{n}', p.a);
    if (p.steps.length === 1) story += ' y ' + part(p.steps[0]) + '.';
    else story += ', ' + part(p.steps[0]) + ' y ' + part(p.steps[1]) + '.';
    story = story.replace(' y me ', ' y me ');

    /* simulación de huecos */
    const present = []; let S = 0, cnt = 0;
    for (let k = 0; k < p.a; k++) present[k] = true; cnt = p.a; S = p.a;
    const plan = [];   // acciones: {t, idx:[…]}
    const sim = present.slice();
    p.steps.forEach(s => {
      const idx = [];
      if (s.t === 'add') {
        for (let n = 0; n < s.n; n++) { let k = 0; while (sim[k]) k++; sim[k] = true; idx.push(k); }
      } else {
        for (let n = 0; n < s.n; n++) { let k = sim.length - 1; while (!sim[k]) k--; sim[k] = false; idx.push(k); }
      }
      S = Math.max(S, sim.length);
      plan.push({ t: s.t, idx });
    });
    S = Math.max(p.a, sim.length);
    const size = S <= 5 ? '5.2rem' : S <= 8 ? '4.4rem' : S <= 12 ? '3.7rem' : '3rem';

    g.ask(story + ' ' + it.q);
    const scene = U.el(`<div class="scene ${it.sc} px-scene">${it.deco ? `<div class="px-deco ${it.deco}" aria-hidden="true">${A.get(it.deco)}</div>` : ''}<div class="px-stage" style="--is:${size}"></div></div>`);
    const stage = scene.querySelector('.px-stage');
    const bar = U.el('<div class="px-bar"></div>');
    const again = U.el('<button class="btn white px-again" aria-label="Ver otra vez la historia">↻ Ver otra vez</button>');
    bar.appendChild(again);
    const optsBox = U.el('<div class="opts"></div>');
    g.area.appendChild(scene); g.area.appendChild(bar); g.area.appendChild(optsBox);

    let anim = [], timers = [], playing = false;
    const clearAnim = () => { anim.forEach(a => { try { a.cancel(); } catch (e) {} }); anim = []; timers.forEach(clearTimeout); timers = []; };
    const T = (fn, ms) => { const id = g.t(fn, ms); timers.push(id); return id; };

    function build() {
      clearAnim(); stage.innerHTML = '';
      const els = [];
      for (let k = 0; k < S; k++) {
        const e = U.el(`<span class="px-it ${k < p.a ? '' : 'off'}">${mk(k)}</span>`);
        e.dataset.k = k; stage.appendChild(e); els.push(e);
      }
      return els;
    }
    let els = build();

    const run = (el, frames, opt) => { const a = el.animate(frames, Object.assign({ fill: 'forwards' }, opt)); anim.push(a); return a; };
    function enter(el, how, delay) {
      el.classList.remove('off'); el.style.opacity = '0';
      const sr = scene.getBoundingClientRect(), r = el.getBoundingClientRect();
      const from = { drop: `translate(0,${-(r.top - sr.top + r.height + 20)}px)`, rise: `translate(0,${sr.bottom - r.top + 20}px)`, left: `translate(${-(r.left - sr.left + r.width + 30)}px,0)`, right: `translate(${sr.right - r.left + 30}px,0)`, pop: 'scale(0)' }[how] || 'scale(0)';
      const a = run(el, [{ transform: from, opacity: 1 }, { transform: how === 'drop' ? 'translate(0,0)' : 'none', opacity: 1 }], { duration: how === 'pop' ? 500 : 1000, delay, easing: how === 'drop' ? 'cubic-bezier(.3,0,.6,1.4)' : 'ease-out' });
      T(() => { Kids.sound.pop(); }, delay + 700);
      return a;
    }
    function leave(el, how, delay) {
      const sr = scene.getBoundingClientRect(), r = el.getBoundingClientRect();
      const to = {
        up: `translate(${U.rnd(-30, 30)}px,${-(r.top - sr.top + r.height + 30)}px)`,
        right: `translate(${sr.right - r.left + 40}px,0)`,
        left: `translate(${-(r.left - sr.left + r.width + 40)}px,0)`,
        flyRight: `translate(${sr.right - r.left + 40}px,${-Math.min(r.top - sr.top + r.height, 120)}px)`,
        jump: `translate(${sr.right - r.left + 40}px,0)`,
        shrink: 'scale(0) rotate(40deg)'
      }[how];
      let frames = [{ transform: 'none', opacity: 1 }, { transform: to, opacity: how === 'shrink' ? 0 : 1 }];
      if (how === 'jump') {
        const dx = sr.right - r.left + 40;
        frames = [{ transform: 'none' }, { transform: `translate(${dx * .25}px,-60px)` }, { transform: `translate(${dx * .5}px,0)` }, { transform: `translate(${dx * .75}px,-60px)` }, { transform: `translate(${dx}px,0)` }];
      }
      const a = run(el, frames, { duration: how === 'shrink' ? 700 : how === 'jump' ? 1300 : 1500, delay, easing: how === 'up' ? 'ease-in' : 'ease-in-out' });
      T(() => { Kids.sound.tap(); }, delay + 100);
      return a;
    }

    function play() {
      if (playing) return;
      els = build(); playing = true; again.disabled = true;
      let t = 700;
      plan.forEach(pl => {
        pl.idx.forEach((k, n) => {
          const el = els[k], d = n * 450;
          T(() => { pl.t === 'add' ? enter(el, it.inA, 0) : leave(el, it.outA, 0); }, t + d);
        });
        t += pl.idx.length * 450 + 1400;
      });
      T(() => { playing = false; again.disabled = false; }, t);
    }
    again.onclick = () => { Kids.sound.tap(); playing = false; play(); };

    const vals = choices(p.r, lv === 1 ? 3 : 4, lv === 1 ? 6 : lv === 2 ? 11 : 20);
    const btns = vals.map(v => {
      const b = U.el(`<button class="ans" aria-label="${v}">${v}</button>`);
      b.onclick = () => {
        if (v === p.r) {
          btns.forEach(x => x.disabled = true); b.classList.add('right');
          g.right();
        } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
      };
      optsBox.appendChild(b); return b;
    });

    g.helpHint = () => {
      g.toast('Vamos a contar los que quedan');
      clearAnim(); playing = false; again.disabled = false;
      /* estado final con números */
      els = build();
      els.forEach(e => e.classList.add('off'));
      const finalIdx = []; sim.forEach((v, k) => { if (v) finalIdx.push(k); });
      /* mostrar sólo los que quedan al final */
      finalIdx.forEach(k => els[k].classList.remove('off'));
      finalIdx.forEach((k, n) => T(() => {
        els[k].appendChild(U.el(`<span class="px-b">${n + 1}</span>`)); Kids.sound.pop();
        if (n === finalIdx.length - 1) btns.forEach(b => { if (+b.textContent === p.r && !b.disabled) b.classList.add('hint'); });
      }, 420 * (n + 1)));
    };

    g.t(play, 500);
  }
});
})();

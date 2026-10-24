/* Mates 2 — Sumas con frutas */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const FRUITS = [
  { a: 'apple', p: 'manzanas' }, { a: 'pear', p: 'peras' }, { a: 'banana', p: 'plátanos' },
  { a: 'orange', p: 'naranjas' }, { a: 'strawberry', p: 'fresas' }, { a: 'cherry', p: 'cerezas' }
];
let lastKey = '', lastFruit = '';

Kids.css(`
.g-mates-2 .m2-eq{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.8rem 1rem;width:100%}
.g-mates-2 .m2-grp{display:flex;flex-direction:column;align-items:center;gap:.4rem}
.g-mates-2 .m2-fr{background:#fff;border-radius:1.6rem;padding:.7rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line);display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:.15rem;min-width:5.5rem;max-width:min(26rem,44vw);position:relative}
.g-mates-2 .m2-fr.wide{max-width:min(36rem,90vw)}
.g-mates-2 .m2-f{width:var(--fs,4rem);height:var(--fs,4rem);position:relative;display:block;flex:none}
.g-mates-2 .m2-f svg{width:100%;height:100%;display:block}
.g-mates-2 .m2-f.gone{opacity:.45}
.g-mates-2 .m2-f.gone svg{filter:grayscale(.8)}
.g-mates-2 .m2-f.gone::after{content:'';position:absolute;left:8%;right:8%;top:46%;height:.45rem;border-radius:.3rem;background:#E5484D;transform:rotate(-35deg)}
.g-mates-2 .m2-f.have{opacity:.55}
.g-mates-2 .m2-b{position:absolute;right:-5%;top:-5%;min-width:1.5rem;height:1.5rem;border-radius:999px;background:var(--g);color:#fff;border:.13rem solid #fff;font-family:'Baloo 2';font-weight:800;font-size:1rem;line-height:1.2rem;text-align:center;animation:pop .3s both}
.g-mates-2 .m2-sym{font-family:'Baloo 2';font-weight:800;font-size:3.2rem;line-height:1;color:var(--ink)}
.g-mates-2 .m2-num{font-family:'Baloo 2';font-weight:800;font-size:2.4rem;line-height:1;background:var(--gl);border-radius:.9rem;padding:0 .8rem;min-width:2.6rem;text-align:center}
.g-mates-2 .slot{min-width:5.5rem;min-height:5.5rem;font-size:3rem;color:var(--ink);font-weight:800}
.g-mates-2 .slot.filled{animation:pop .45s}
.g-mates-2 .m2-big{display:flex;align-items:center;justify-content:center;gap:.7rem;flex-wrap:wrap;font-family:'Baloo 2';font-weight:800;font-size:4.4rem;line-height:1;color:var(--ink);background:#fff;border-radius:1.8rem;padding:.4rem 1.4rem;box-shadow:0 .4rem 0 var(--line)}
.g-mates-2 .m2-big .slot{min-width:5rem;min-height:5rem;font-size:3.4rem}
.g-mates-2 .opts .ans.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
@media (max-width:640px){.g-mates-2 .m2-big{font-size:3rem}.g-mates-2 .m2-sym{font-size:2.4rem}.g-mates-2 .m2-fr{max-width:42vw}.g-mates-2 .m2-fr.wide{max-width:92vw}}
`);

const fruits = (kind, n, size, gone, have, wide) => {
  let h = '';
  for (let k = 0; k < n; k++) h += `<span class="m2-f ${k >= n - gone ? 'gone' : ''} ${k < have ? 'have' : ''}">${A.get(kind.a)}</span>`;
  return `<div class="m2-fr ${wide ? 'wide' : ''}" style="--fs:${size}">${h}</div>`;
};

function choices(c, count, max, min) {
  const pool = [];
  for (let d = -3; d <= 3; d++) { const v = c + d; if (d && v >= min && v <= max) pool.push(v); }
  const near = U.shuffle(pool.filter(v => Math.abs(v - c) <= 1)), rest = U.shuffle(pool.filter(v => Math.abs(v - c) > 1));
  return U.shuffle([c].concat(near, rest).slice(0, count));
}

function make(lv) {
  for (let t = 0; t < 50; t++) {
    let p;
    if (lv === 1) { const tot = U.rnd(2, 5), a = U.rnd(1, tot - 1); p = { type: 'add', a, b: tot - a, r: tot }; }
    else if (lv === 2) { const tot = U.rnd(4, 10), a = U.rnd(1, tot - 1); p = { type: 'add', a, b: tot - a, r: tot }; }
    else {
      const k = Math.random();
      if (k < .4) { const tot = U.rnd(11, 20), a = U.rnd(Math.max(2, tot - 10), Math.min(tot - 2, 12)); p = { type: 'add', a, b: tot - a, r: tot }; }
      else if (k < .72) { const a = U.rnd(6, 16), b = U.rnd(2, Math.min(a - 1, 9)); p = { type: 'sub', a, b, r: a - b }; }
      else { const tot = U.rnd(7, 18), a = U.rnd(2, tot - 2); p = { type: 'miss', a, b: tot - a, r: tot - a, tot }; }
    }
    const key = p.type + p.a + '.' + p.b;
    if (key !== lastKey) { lastKey = key; return p; }
  }
  return { type: 'add', a: 2, b: 3, r: 5 };
}

Kids.game({
  id: 'mates-2', group: 'mates', num: 2,
  title: 'Sumas con frutas',
  blurb: 'Junta las frutas y toca el resultado.',
  how: 'Mira las frutas, júntalas y toca el número que falta.',
  icon: 'apple',
  levels: ['Sumas hasta 5', 'Sumas hasta 10', 'Sumas y restas hasta 20'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, p = make(lv);
    let kind; do { kind = U.pick(FRUITS); } while (kind.a === lastFruit);
    lastFruit = kind.a;
    const big = Math.max(p.a, p.b, p.tot || 0);
    const fs = lv < 3 ? (Math.max(p.a, p.b) <= 3 ? '4.6rem' : Math.max(p.a, p.b) <= 5 ? '3.6rem' : Math.max(p.a, p.b) <= 6 ? '2.8rem' : '2.8rem') : (big > 14 ? '2.5rem' : '3rem');
    const slot = U.el('<div class="slot" aria-label="Hueco para el resultado">?</div>');
    const box = U.el('<div class="m2-eq"></div>');
    const answer = p.r;
    let ask, hintFn;
    const sym = s => `<div class="m2-sym">${s}</div>`;
    const grp = (n, num, gone, have, wide) => `<div class="m2-grp">${fruits(kind, n, fs, gone || 0, have || 0, wide)}${num ? `<div class="m2-num">${num}</div>` : ''}</div>`;
    const all = () => { const fr = [...box.querySelectorAll('.m2-f')]; return { items: fr, n: fr.length }; };

    if (lv < 3) {
      const nums = lv === 2;
      ask = lv === 1 ? '¿Cuántas ' + kind.p + ' hay en total?' : p.a + ' más ' + p.b + ' son…';
      box.innerHTML = grp(p.a, nums && p.a) + sym('+') + grp(p.b, nums && p.b) + sym('=');
      box.appendChild(slot); hintFn = all;
    } else if (p.type === 'add') {
      ask = p.a + ' más ' + p.b + ', ¿cuánto es?';
      box.innerHTML = `<div class="m2-big"><span>${p.a}</span><span>+</span><span>${p.b}</span><span>=</span></div>`;
      box.firstChild.appendChild(slot);
      box.appendChild(U.el(`<div class="m2-eq" style="margin-top:.2rem">${grp(p.a)}${sym('+')}${grp(p.b)}</div>`));
      hintFn = all;
    } else if (p.type === 'sub') {
      ask = 'Tengo ' + p.a + ' ' + kind.p + ' y me como ' + p.b + '. ¿Cuántas me quedan?';
      box.innerHTML = `<div class="m2-big"><span>${p.a}</span><span>−</span><span>${p.b}</span><span>=</span></div>`;
      box.firstChild.appendChild(slot);
      box.appendChild(U.el(`<div class="m2-eq" style="margin-top:.2rem">${grp(p.a, 0, p.b, 0, true)}</div>`));
      hintFn = () => { const fr = [...box.querySelectorAll('.m2-f:not(.gone)')]; return { items: fr, n: fr.length }; };
    } else {
      ask = p.a + ' más ¿cuántas? son ' + p.tot + '. ¿Qué número falta?';
      box.innerHTML = `<div class="m2-big"><span>${p.a}</span><span>+</span></div>`;
      box.firstChild.appendChild(slot);
      box.firstChild.appendChild(U.el('<span>=</span>'));
      box.firstChild.appendChild(U.el(`<span>${p.tot}</span>`));
      box.appendChild(U.el(`<div class="m2-eq" style="margin-top:.2rem">${grp(p.tot, 0, 0, p.a, true)}</div>`));
      hintFn = () => { const fr = [...box.querySelectorAll('.m2-f:not(.have)')]; return { items: fr, n: fr.length }; };
    }
    g.ask(ask);
    g.area.appendChild(box);

    const ansBox = U.el('<div class="opts"></div>');
    const vals = choices(answer, lv === 1 ? 3 : 4, lv === 1 ? 6 : lv === 2 ? 11 : 20, p.type === 'miss' ? 1 : 0);
    const btns = vals.map(v => {
      const b = U.el(`<button class="ans">${v}</button>`);
      b.onclick = () => {
        if (v === answer) {
          btns.forEach(x => x.disabled = true); b.classList.add('right');
          slot.textContent = v; slot.classList.add('filled');
          g.right();
        } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
      };
      ansBox.appendChild(b); return b;
    });
    g.area.appendChild(ansBox);

    g.helpHint = () => {
      g.toast('Vamos a contarlas juntos');
      const h = hintFn();
      h.items.forEach((f, k) => g.t(() => {
        f.appendChild(U.el(`<span class="m2-b">${k + 1}</span>`)); Kids.sound.pop();
        if (k === h.n - 1) btns.forEach(b => { if (+b.textContent === answer && !b.disabled) b.classList.add('hint'); });
      }, 380 * (k + 1)));
    };
  }
});
})();

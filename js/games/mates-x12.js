/* Mates X12 — Completa el 10 */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
let lastKey = '';

A.add({
  'mx12-egg': (c, d) => {
    c = c || '#FFF4E0'; d = d || '#F0D9B0';
    return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="90" rx="22" ry="5" fill="rgba(20,35,91,.12)"/><path d="M50 8C30 8 17 40 17 62c0 18 14 29 33 29s33-11 33-29C83 40 70 8 50 8z" fill="${c}" stroke="${d}" stroke-width="3"/><ellipse cx="38" cy="36" rx="7" ry="12" fill="#fff" opacity=".55" transform="rotate(18 38 36)"/><circle cx="40" cy="62" r="3.6" fill="#14235B"/><circle cx="60" cy="62" r="3.6" fill="#14235B"/><path d="M43 71q7 6 14 0" fill="none" stroke="#14235B" stroke-width="3" stroke-linecap="round"/><circle cx="31" cy="69" r="4" fill="#FF9DB3" opacity=".6"/><circle cx="69" cy="69" r="4" fill="#FF9DB3" opacity=".6"/></svg>`;
  },
  'mx12-nest': '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="72" rx="44" ry="22" fill="#C99A5B"/><ellipse cx="50" cy="66" rx="38" ry="16" fill="#E2B877"/><path d="M14 66q8 8 18 4M86 66q-8 8-18 4M30 80q20 8 40 0" fill="none" stroke="#A97B3F" stroke-width="3" stroke-linecap="round"/></svg>'
});

Kids.css(`
.g-mates-x12{gap:.8rem}
.g-mates-x12 .eg-cartons{display:flex;flex-wrap:wrap;gap:.8rem 1.4rem;justify-content:center;align-items:center}
.g-mates-x12 .eg-carton{background:#D8BE95;border-radius:1.4rem;padding:.7rem;box-shadow:0 .4rem 0 #B79A6B;display:grid;grid-template-columns:repeat(5,var(--hs,3.6rem));gap:.35rem;position:relative}
.g-mates-x12 .eg-hole{width:var(--hs,3.6rem);height:var(--hs,3.6rem);border-radius:50%;background:#B79A6B;box-shadow:inset 0 .3rem .4rem rgba(70,45,10,.45);position:relative;display:flex;align-items:center;justify-content:center;padding:0;transition:transform .15s,background .15s}
.g-mates-x12 .eg-hole.empty:hover{background:#C3A675}
.g-mates-x12 .eg-hole.hot{background:#FFE9A8;transform:scale(1.08)}
.g-mates-x12 .eg-hole.hint{animation:pulse 1s infinite;box-shadow:inset 0 .3rem .4rem rgba(70,45,10,.45),0 0 0 .3rem #FFD23F}
.g-mates-x12 .eg-hole .eg{width:118%;height:118%;position:absolute;left:-9%;top:-15%;pointer-events:none;animation:pop .35s both}
.g-mates-x12 .eg-hole .eg svg{width:100%;height:100%;display:block}
.g-mates-x12 .eg-hole.mine{cursor:pointer}
.g-mates-x12 .eg-b{position:absolute;right:-.2rem;top:-.4rem;min-width:1.5rem;height:1.5rem;border-radius:999px;background:var(--g);color:#fff;border:.13rem solid #fff;font-family:'Baloo 2';font-weight:800;font-size:1rem;line-height:1.2rem;text-align:center;animation:pop .3s both;padding:0 .2rem;z-index:3}
.g-mates-x12 .eg-src{display:flex;align-items:center;gap:.6rem;background:#fff;border-radius:1.6rem;padding:.3rem 1.1rem .3rem .5rem;box-shadow:0 .3rem 0 var(--line);font-family:'Baloo 2';font-size:1.15rem;line-height:1.05}
.g-mates-x12 .eg-nestbox{position:relative;width:5.4rem;height:5.4rem;flex:none}
.g-mates-x12 .eg-nestbox>svg{position:absolute;inset:0;width:100%;height:100%}
.g-mates-x12 .eg-egg{position:absolute;left:18%;top:-8%;width:64%;height:64%;display:block;padding:0;background:none}
.g-mates-x12 .eg-egg svg{width:100%;height:100%;display:block;pointer-events:none}
.g-mates-x12 .eg-eq{display:flex;align-items:center;justify-content:center;gap:.7rem;font-family:'Baloo 2';font-weight:800;font-size:3.6rem;line-height:1;color:var(--ink);background:#fff;border-radius:1.6rem;padding:.2rem 1.2rem;box-shadow:0 .4rem 0 var(--line)}
.g-mates-x12 .eg-eq .blank{min-width:4.2rem;min-height:4.2rem;border:.25rem dashed #9CB5E8;border-radius:1rem;background:#F4F8FF;display:inline-flex;align-items:center;justify-content:center}
.g-mates-x12 .eg-eq .blank.filled{border-style:solid;border-color:var(--green);background:#E8F9EC}
.g-mates-x12 .opts .ans.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
.g-mates-x12 .eg-lbl{font-family:'Baloo 2';font-size:1.1rem;color:var(--ink2);text-align:center;line-height:1}
@media (max-width:640px){.g-mates-x12{gap:.5rem}.g-mates-x12 .eg-eq{font-size:2.6rem}.g-mates-x12 .eg-nestbox{width:4.2rem;height:4.2rem}}
`);

function choices(c, count, min, max) {
  const pool = [];
  for (let d = -4; d <= 4; d++) { const v = c + d; if (d && v >= min && v <= max) pool.push(v); }
  const near = U.shuffle(pool.filter(v => Math.abs(v - c) <= 1)), rest = U.shuffle(pool.filter(v => Math.abs(v - c) > 1));
  return U.shuffle([c].concat(near, rest).slice(0, count));
}

Kids.game({
  id: 'mates-x12', group: 'mates', num: 17,
  title: 'Completa el 10',
  blurb: 'Rellena el cartón de huevos y di cuántos faltaban.',
  how: 'En el cartón hay huevos y huecos. Pon huevos en los huecos tocando o arrastrando hasta completar el diez. Después toca el número de huevos que has puesto.',
  icon: 'mx12-egg',
  levels: ['Completa el 10 (faltan hasta 5)', 'Cualquier número del 1 al 9', 'Completa el 20 y sumas con hueco'],
  rounds: 8,
  round(g, i) {
    const lv = g.level;
    /* datos del problema */
    let mode, total, placed, eqKind;
    for (let t = 0; t < 40; t++) {
      if (lv === 1) { mode = 'one'; total = 10; placed = U.rnd(5, 9); }
      else if (lv === 2) { mode = 'one'; total = 10; placed = U.rnd(1, 9); }
      else if (Math.random() < .5) { mode = 'two'; total = 20; placed = U.rnd(11, 19); }
      else { mode = 'eq'; total = 10; placed = U.rnd(1, 9); eqKind = Math.random() < .5 ? 'left' : 'right'; }
      const key = mode + placed + (eqKind || '');
      if (key !== lastKey) { lastKey = key; break; }
    }
    const missing = total - placed;
    const nCart = mode === 'two' ? 2 : 1;
    const wide = typeof window !== 'undefined' && window.innerWidth < 640;
    const hs = mode === 'two' ? (wide ? '2.5rem' : '3.1rem') : (wide ? '2.8rem' : '3.7rem');

    /* pregunta */
    let ask;
    if (mode === 'eq') {
      ask = eqKind === 'left' ? placed + ' más ¿cuántos? son 10. ¿Qué número falta?' : '¿Cuántos más ' + placed + ' son 10? ¿Qué número falta?';
    } else if (mode === 'two') ask = 'Hay ' + placed + ' huevos. ¿Cuánto le falta a ' + placed + ' para llegar a 20?';
    else ask = '¿Cuánto le falta a ' + placed + ' para llegar a 10?';
    g.ask(ask);

    /* ecuación */
    let blank = null;
    if (mode === 'eq') {
      blank = U.el('<span class="blank" aria-label="Hueco para el número">?</span>');
      const eq = U.el('<div class="eg-eq"></div>');
      if (eqKind === 'left') { eq.append(document.createTextNode(placed + ' + '), blank, document.createTextNode(' = 10')); }
      else { eq.append(blank, document.createTextNode(' + ' + placed + ' = 10')); }
      g.area.appendChild(eq);
    }

    /* cartones */
    const cartonsBox = U.el('<div class="eg-cartons"></div>');
    const holes = [];
    for (let c = 0; c < nCart; c++) {
      const car = U.el(`<div class="eg-carton" style="--hs:${hs}"></div>`);
      for (let k = 0; k < 10; k++) {
        const idx = c * 10 + k;
        const h = U.el(`<button class="eg-hole empty" aria-label="Hueco ${idx + 1}"></button>`);
        h.dataset.i = idx; car.appendChild(h); holes.push(h);
      }
      cartonsBox.appendChild(car);
    }
    g.area.appendChild(cartonsBox);
    const mine = new Set();
    const putEgg = (h, pre) => {
      h.classList.remove('empty'); h.classList.toggle('mine', !pre);
      h.setAttribute('aria-label', pre ? 'Huevo puesto' : 'Huevo que has añadido (toca para quitarlo)');
      h.appendChild(U.el(`<span class="eg">${A.get('mx12-egg', pre ? '#FFF4E0' : '#FFE08A', pre ? '#F0D9B0' : '#EBB93A')}</span>`));
      h.dataset.full = '1';
      if (!pre) mine.add(h);
    };
    const takeEgg = h => {
      const e = h.querySelector('.eg'); if (e) e.remove();
      h.classList.add('empty'); h.classList.remove('mine'); h.setAttribute('aria-label', 'Hueco ' + (+h.dataset.i + 1)); delete h.dataset.full; mine.delete(h);
    };
    holes.slice(0, placed).forEach(h => putEgg(h, true));
    /* los huecos por encima del total no existen (en one/eq sólo 10) */
    const empties = () => holes.filter(h => !h.dataset.full);
    const fullCount = () => holes.length - empties().length;

    /* origen de huevos */
    const src = U.el(`<div class="eg-src"><div class="eg-nestbox"><span aria-hidden="true">${A.get('mx12-nest')}</span><button class="eg-egg" aria-label="Huevo: arrástralo a un hueco o tócalo">${A.get('mx12-egg', '#FFE08A', '#EBB93A')}</button></div><span>Arrastra el huevo a un hueco<br>o toca los huecos</span></div>`);
    g.area.appendChild(src);
    const srcEgg = src.querySelector('.eg-egg');

    let done = false;
    function check() { /* cuando se llena */
      if (fullCount() === total && !done) {
        Kids.sound.tone(784, 0, .15, 'triangle'); Kids.sound.tone(1047, .12, .25, 'triangle');
        g.toast('¡Ya hay ' + total + '!');
      }
    }
    function addAt(h) {
      if (done || h.dataset.full) return false;
      putEgg(h, false); Kids.sound.pop(); check(); return true;
    }
    holes.forEach(h => {
      h.onclick = () => {
        if (done) return;
        if (h.dataset.full) { if (h.classList.contains('mine')) { takeEgg(h); Kids.sound.tap(); } }
        else addAt(h);
      };
    });
    Kids.drag(srcEgg, {
      targets: () => empties(),
      onDrop: (t) => { addAt(t); return false; },
      onTap: () => { const e = empties()[0]; if (e) addAt(e); }
    });

    /* opciones */
    const optsBox = U.el('<div class="opts"></div>');
    const max = mode === 'two' ? 9 : 9;
    const vals = choices(missing, 4, 1, max);
    const btns = vals.map(v => {
      const b = U.el(`<button class="ans" aria-label="${v}">${v}</button>`);
      b.onclick = () => {
        if (done) return;
        if (v === missing) {
          done = true; btns.forEach(x => x.disabled = true); b.classList.add('right');
          /* completa los huecos que falten */
          empties().forEach((h, n) => g.t(() => putEgg(h, false), 120 * n));
          if (blank) { blank.textContent = v; blank.classList.add('filled'); }
          g.right();
        } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
      };
      optsBox.appendChild(b); return b;
    });
    g.area.appendChild(optsBox);

    g.helpHint = () => {
      g.toast('Mira los huecos vacíos y cuéntalos');
      [...mine].forEach(takeEgg);
      const emp = empties();
      emp.forEach((h, n) => g.t(() => {
        h.classList.add('hint'); h.appendChild(U.el(`<span class="eg-b">${n + 1}</span>`)); Kids.sound.pop();
        if (n === emp.length - 1) {
          const need = missing;
          btns.forEach(b => { if (+b.textContent === need && !b.disabled) b.classList.add('hint'); });
        }
      }, 380 * (n + 1)));
    };
  }
});
})();

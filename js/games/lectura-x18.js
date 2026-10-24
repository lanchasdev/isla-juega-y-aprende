/* El abecedario perdido — lectura-x18 */
(function () {
'use strict';
const K = window.Kids, U = K.util;

const ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const NAME = { A: 'a', B: 'be', C: 'ce', D: 'de', E: 'e', F: 'efe', G: 'ge', H: 'hache', I: 'i', J: 'jota', K: 'ka', L: 'ele', M: 'eme', N: 'ene', 'Ñ': 'eñe', O: 'o', P: 'pe', Q: 'cu', R: 'erre', S: 'ese', T: 'te', U: 'u', V: 'uve', W: 'uve doble', X: 'equis', Y: 'i griega', Z: 'zeta' };
const VOW = 'AEIOU'.split(''), CON = ABC.filter(l => !VOW.includes(l));

Kids.css(`
.g-lectura-x18 .wrap{width:100%;max-width:52rem;display:flex;flex-direction:column;align-items:center;gap:.9rem}
.g-lectura-x18 .strip{display:flex;flex-wrap:wrap;justify-content:center;gap:.25rem;background:#fff;border-radius:1.2rem;padding:.45rem .6rem;box-shadow:0 .3rem 0 var(--line);max-width:100%}
.g-lectura-x18 .strip i{font-style:normal;font-family:'Baloo 2';font-weight:800;font-size:clamp(1rem,2.6vh,1.35rem);width:1.9em;height:1.9em;display:flex;align-items:center;justify-content:center;border-radius:.6rem;background:var(--a1);color:var(--ink)}
.g-lectura-x18 .strip i:nth-child(3n+2){background:var(--a2)}
.g-lectura-x18 .strip i:nth-child(3n){background:var(--a3)}
.g-lectura-x18 .strip i.v{box-shadow:inset 0 0 0 .15rem var(--lecturaD)}
.g-lectura-x18 .strip i.hi{background:var(--green);color:#fff;transform:scale(1.2)}
.g-lectura-x18 .slots{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center}
.g-lectura-x18 .s18{width:clamp(3rem,8vh,4.2rem);height:clamp(3.6rem,10vh,5rem);padding:0;font-size:2rem}
.g-lectura-x18 .tray{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;min-height:5rem;padding:.6rem;border-radius:1.4rem;background:rgba(255,255,255,.55);width:100%}
.g-lectura-x18 .t18{width:clamp(3rem,8vh,4.2rem);height:clamp(3.6rem,10vh,5rem);border-radius:1rem;background:var(--a2);box-shadow:0 .3rem 0 rgba(20,35,91,.16);font-family:'Baloo 2';font-weight:800;font-size:clamp(1.8rem,5vh,2.6rem);color:var(--ink);display:flex;align-items:center;justify-content:center}
.g-lectura-x18 .tray .t18:nth-child(3n+1){background:var(--a1)}
.g-lectura-x18 .tray .t18:nth-child(3n+2){background:var(--a3)}
.g-lectura-x18 .t18.sel{outline:.25rem solid var(--yellow);transform:translateY(-.3rem)}
.g-lectura-x18 .slot.filled .t18{box-shadow:none;background:transparent}
.g-lectura-x18 .t18.ok{background:#BDEFC8!important}
.g-lectura-x18 .slot.help{animation:pulse .9s infinite;border-color:var(--yellow)}
.g-lectura-x18 .ans.l{font-size:clamp(2.6rem,8vh,4rem);min-width:6rem}
.g-lectura-x18 .ans.help{animation:pulse .9s infinite;outline:.25rem solid var(--yellow)}
.g-lectura-x18 .quest{font-family:'Baloo 2';font-weight:800;font-size:clamp(1.8rem,5vh,2.8rem);text-align:center;background:#fff;border-radius:1.6rem;padding:.4rem 1.6rem;box-shadow:0 .4rem 0 var(--line)}
.g-lectura-x18 .quest b{display:inline-block;min-width:1.6em;padding:0 .2em;border-radius:.5rem;background:var(--lecturaL);color:var(--lecturaD)}
.g-lectura-x18 .quest u{text-decoration:none;display:inline-block;min-width:1.6em;border-bottom:.2rem dashed var(--yellow)}
`);

let plan = [];
const stripEl = (hiRange) => {
  const d = U.el('<div class="strip" role="img" aria-label="El abecedario: A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z"></div>');
  ABC.forEach((l, k) => { const c = U.el(`<i>${l}</i>`); if (hiRange && k >= hiRange[0] && k < hiRange[1]) c.classList.add('v'); d.appendChild(c); });
  return d;
};

K.game({
  id: 'lectura-x18', group: 'lectura', num: 22,
  title: 'El abecedario perdido', icon: 'book', rounds: 6,
  blurb: 'Ordena las letras del abecedario y descubre cuál va antes o después.',
  how: 'Toca una letra y luego su hueco, o arrástrala, para ordenar el abecedario. También contesta qué letra va antes, después o entre otras.',
  levels: ['Ordenar de la A a la E', 'Tramos y antes o después', 'Abecedario completo'],
  round(g, i) {
    const lv = g.level;
    if (i === 0 || !plan.length) {
      plan = lv === 1 ? ['order', 'after', 'order', 'after', 'order', 'after']
        : lv === 2 ? U.shuffle(['order', 'order', 'order', 'after', 'before', 'after'])
        : U.shuffle(['order', 'order', 'order', 'between', 'between', 'vowel']);
    }
    const type = plan[i];
    const root = U.el('<div class="wrap"></div>'); g.area.appendChild(root);
    const strip = stripEl(null);
    const peek = lv === 3 ? U.el('<button class="btn sm white" aria-label="Ver u ocultar el abecedario">Ver el abecedario</button>') : null;
    let stripShown = lv !== 3;
    const syncStrip = () => { strip.style.display = stripShown ? '' : 'none'; if (peek) peek.textContent = stripShown ? 'Esconder el abecedario' : 'Ver el abecedario'; };
    if (peek) peek.onclick = () => { stripShown = !stripShown; syncStrip(); K.sound.pop(); };
    const readAll = () => g.say(ABC.map(l => NAME[l]).join(', '));

    if (type === 'order') {
      const n = lv === 1 ? 5 : lv === 2 ? U.rnd(6, 8) : U.rnd(9, 10);
      const s = lv === 1 ? 0 : U.rnd(0, ABC.length - n);
      const seg = ABC.slice(s, s + n);
      g.ask(lv === 1 ? 'Ordena las letras, empezando por la A' : 'Ordena las letras del abecedario');
      if (lv === 1) strip.querySelectorAll('i').forEach((c, k) => { if (k >= s && k < s + n) c.classList.add('v'); });
      root.appendChild(strip); if (peek) root.appendChild(peek);
      syncStrip();
      const slotsEl = U.el('<div class="slots"></div>'), tray = U.el('<div class="tray"></div>');
      root.appendChild(slotsEl); root.appendChild(tray);
      let sel = null, busy = false;
      const slots = seg.map((l, k) => {
        const d = U.el(`<button class="slot s18" aria-label="Hueco ${k + 1}"></button>`); d._tile = null;
        d.onclick = () => { if (sel && !d._tile && !busy) put(sel, d); };
        slotsEl.appendChild(d); return d;
      });
      let order; do { order = U.shuffle(seg); } while (order.join() === seg.join());
      const tiles = order.map(l => {
        const t = U.el(`<button class="t18" aria-label="Letra ${l}">${l}</button>`); t._l = l;
        K.drag(t, {
          targets: () => slots,
          onDrop: (slot, el) => { if (busy || slot._tile) return false; place(el, slot); return true; },
          onTap: tap
        });
        t.addEventListener('click', e => { if (e.detail === 0) tap(t); });
        tray.appendChild(t); return t;
      });
      function unsel() { if (sel) sel.classList.remove('sel'); sel = null; }
      function tap(t) {
        if (t.dataset.locked || busy) return;
        g.say(NAME[t._l]); K.sound.tap();
        if (t.parentNode.classList.contains('slot')) { ret(t); return; }
        if (sel === t) { unsel(); return; }
        unsel(); sel = t; t.classList.add('sel');
      }
      function ret(t) { const sl = t.parentNode; sl._tile = null; sl.classList.remove('filled'); tray.appendChild(t); t.classList.remove('sel'); }
      function place(t, slot) {
        const from = t.parentNode;
        if (from.classList.contains('slot')) { from._tile = null; from.classList.remove('filled'); }
        slot.appendChild(t); slot._tile = t; slot.classList.add('filled'); slot.classList.remove('help'); t.classList.remove('sel');
        if (sel === t) sel = null; else unsel();
        check();
      }
      function put(t, slot) { place(t, slot); }
      function check() {
        if (slots.some(s => !s._tile)) return;
        const bad = slots.filter((s, k) => s._tile._l !== seg[k]);
        if (!bad.length) {
          busy = true; tiles.forEach(t => { t.classList.add('ok'); t.dataset.locked = 1; });
          g.say(seg.map(l => NAME[l]).join(', '));
          strip.querySelectorAll('i').forEach((c, k) => { if (k >= s && k < s + n) c.classList.add('v'); });
          g.right(); return;
        }
        busy = true; g.wrong('Casi. Mira el orden del abecedario');
        bad.forEach(sl => g.shake(sl._tile));
        g.t(() => { bad.forEach(sl => ret(sl._tile)); busy = false; }, 800);
      }
      g.helpHint = () => {
        stripShown = true; syncStrip();
        const k = slots.findIndex((sl, j) => !sl._tile || sl._tile._l !== seg[j]);
        if (k < 0 || busy) return;
        const t = tiles.find(x => x._l === seg[k]);
        if (slots[k]._tile) ret(slots[k]._tile);
        if (t.parentNode.classList.contains('slot')) ret(t);
        place(t, slots[k]); if (!t.classList.contains('ok')) { t.classList.add('ok'); t.dataset.locked = 1; }
        g.toast('Te he puesto una letra. ¡Sigue tú!');
      };
      return;
    }

    /* preguntas */
    let q, ans, given = [], pool;
    if (type === 'after') {
      const k = lv === 1 ? U.rnd(0, 4) : U.rnd(0, ABC.length - 2);
      ans = ABC[k + 1]; given = [k];
      q = `¿Qué letra va después de la <b>${ABC[k]}</b>?`; g.ask(`¿Qué letra va después de la ${ABC[k]}?`);
    } else if (type === 'before') {
      const k = U.rnd(1, ABC.length - 1);
      ans = ABC[k - 1]; given = [k];
      q = `¿Qué letra va antes de la <b>${ABC[k]}</b>?`; g.ask(`¿Qué letra va antes de la ${ABC[k]}?`);
    } else if (type === 'between') {
      const k = U.rnd(1, ABC.length - 2);
      ans = ABC[k]; given = [k - 1, k + 1];
      q = `¿Qué letra va entre la <b>${ABC[k - 1]}</b> y la <b>${ABC[k + 1]}</b>?`; g.ask(`¿Qué letra va entre la ${ABC[k - 1]} y la ${ABC[k + 1]}?`);
    }
    let opts, ansIdx = ABC.indexOf(ans);
    if (type === 'vowel') {
      const wantV = Math.random() < .5;
      ans = U.pick(wantV ? VOW : CON);
      opts = U.shuffle([ans].concat(U.sample(wantV ? CON : VOW, 3)));
      q = `Toca una <b>${wantV ? 'vocal' : 'consonante'}</b>`; g.ask(wantV ? 'Toca una vocal' : 'Toca una consonante');
    } else {
      const near = U.shuffle([-3, -2, -1, 1, 2, 3].map(d => ansIdx + d).filter(x => x >= 0 && x < ABC.length && x !== ansIdx && !given.includes(x)).map(x => ABC[x]));
      opts = U.shuffle([ans].concat(near.slice(0, lv === 1 ? 2 : 3)));
    }
    const qEl = U.el(`<div class="quest">${q}</div>`);
    root.appendChild(qEl); root.appendChild(strip); if (peek) root.appendChild(peek); syncStrip();
    const box = U.el('<div class="opts"></div>'); root.appendChild(box);
    let done = false;
    const btns = opts.map(l => {
      const b = U.el(`<button class="ans l" aria-label="Letra ${l}">${l}</button>`); b._l = l;
      b.onclick = () => {
        if (done || b.disabled) return; g.say(NAME[l]);
        if (l === ans) {
          done = true; btns.forEach(x => x.classList.remove('help')); b.classList.add('right');
          const c = strip.querySelectorAll('i')[ABC.indexOf(l)]; if (c) c.classList.add('hi');
          if (type !== 'vowel') { stripShown = true; syncStrip(); }
          g.right();
        } else { b.classList.add('bad'); b.disabled = true; g.wrong('Mira el abecedario. ¡Casi!'); }
      };
      box.appendChild(b); return b;
    });
    g.helpHint = () => {
      stripShown = true; syncStrip();
      if (type === 'vowel') { g.toast('Las vocales son A, E, I, O, U'); g.say('Las vocales son a, e, i, o, u'); }
      else { g.toast('Mira la tira del abecedario'); readAll(); }
      const b = btns.find(x => x._l === ans); if (b) b.classList.add('help');
    };
  }
});
})();

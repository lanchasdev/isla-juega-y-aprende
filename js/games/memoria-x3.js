/* Sombras: une cada objeto con su sombra */
(function () {
'use strict';
const U = Kids.util;
const NAMES = { ball: 'pelota', car: 'coche', house: 'casa', boat: 'barco', tree: 'árbol', star: 'estrella', umbrella: 'paraguas', key: 'llave', cup: 'taza', hat: 'sombrero', kite: 'cometa', lamp: 'lámpara', heart: 'corazón', duck: 'pato', dog: 'perro', cat: 'gato', fox: 'zorro', rabbit: 'conejo', mouse: 'ratón', bear: 'oso', lion: 'león', pig: 'cerdito', sheep: 'oveja', cow: 'vaca', monkey: 'mono', fish: 'pez', elephant: 'elefante' };
const EASY = ['ball', 'car', 'house', 'boat', 'tree', 'star', 'umbrella', 'key', 'cup', 'hat', 'kite', 'lamp', 'heart', 'duck', 'fish', 'elephant'];
const LIKE = ['dog', 'cat', 'fox', 'rabbit', 'mouse', 'bear', 'lion', 'pig', 'sheep', 'cow', 'monkey'];
const LC = ['#F26B6B', '#4C8DF6', '#E8A800', '#3FAE60', '#8C7BE0', '#E2679A'];
Kids.css(`
.g-memoria-x3{gap:.6rem}
.g-memoria-x3 .sx3-board{position:relative;display:flex;justify-content:space-between;gap:20%;width:min(100%,30rem);flex:1;min-height:0;max-height:100%}
.g-memoria-x3 .sx3-col{display:flex;flex-direction:column;justify-content:space-around;align-items:center;gap:.5rem;flex:0 0 auto;position:relative;z-index:2}
.g-memoria-x3 .sx3-it{height:min(7.6rem,calc((100vh - 19rem) / var(--n)));aspect-ratio:1;border-radius:1.3rem;display:flex;align-items:center;justify-content:center;padding:.3rem;transition:transform .15s,opacity .3s,box-shadow .15s;position:relative}
.g-memoria-x3 .sx3-it.o{background:#fff;border:.2rem solid var(--line);box-shadow:0 .3rem 0 var(--line)}
.g-memoria-x3 .sx3-it.s{background:#D9D1F2;border:.2rem solid #B9AEE6;box-shadow:0 .3rem 0 #B9AEE6}
.g-memoria-x3 .sx3-it svg{width:100%;height:100%;pointer-events:none}
.g-memoria-x3 .sx3-it.s span{display:block;width:100%;height:100%;pointer-events:none}
.g-memoria-x3 .sx3-it.s svg{filter:brightness(0);opacity:.82}
.g-memoria-x3 .sx3-it.sel{transform:scale(1.1);border-color:var(--g);box-shadow:0 0 0 .3rem var(--gl),0 .3rem 0 var(--g)}
.g-memoria-x3 .sx3-it.hot{background:#FFF3BF}
.g-memoria-x3 .sx3-it.done{opacity:.55;pointer-events:none}
.g-memoria-x3 .sx3-it.pulse{animation:bounce .7s infinite;border-color:var(--yellow)}
.g-memoria-x3 .sx3-lines{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;overflow:visible}
.g-memoria-x3 .draggable{cursor:grab}.g-memoria-x3 .dragging{z-index:9;cursor:grabbing}
`);
Kids.game({
  id: 'memoria-x3', group: 'memoria', num: 7, title: 'Sombras',
  blurb: 'Une cada objeto con su sombra: toca el objeto y luego su sombra, o arrástralo.',
  how: 'Mira los objetos de colores y las sombras negras. Toca un objeto y luego su sombra para unirlos. También puedes arrastrar el objeto hasta su sombra.',
  icon: 'owl', levels: ['3 objetos', '5 objetos', '6 sombras parecidas'], rounds: 3,
  round(g, i) {
    const L = g.level, n = [3, 5, 6][L - 1];
    let items;
    if (L < 3) items = U.sample(EASY, n);
    else { const trio = U.sample(['dog', 'cat', 'fox', 'rabbit'], 3); items = trio.concat(U.sample(LIKE.filter(x => !trio.includes(x)), n - 3)); }
    items = U.shuffle(items);
    let order = U.shuffle(U.range(n));
    if (order.every((v, k) => v === k)) order.push(order.shift());   // sombras en otro orden
    g.ask('Une cada objeto con su sombra');
    const root = U.el(`<div class="sx3-board" style="--n:${n}"><svg class="sx3-lines"></svg><div class="sx3-col l"></div><div class="sx3-col r"></div></div>`);
    g.area.appendChild(root);
    const colL = root.querySelector('.l'), colR = root.querySelector('.r'), svg = root.querySelector('svg');
    const objs = [], shs = [];
    items.forEach((nm, k) => {
      const b = U.el(`<button class="sx3-it o" aria-label="Objeto: ${NAMES[nm]}">${Kids.art.get(nm)}</button>`);
      colL.appendChild(b); objs[k] = b;
    });
    order.forEach((k, pos) => {
      const nm = items[k];
      const rot = L === 3 ? U.pick([-1, 1]) * U.rnd(12, 28) : 0, sc = L === 3 ? (0.78 + Math.random() * .3).toFixed(2) : 1;
      const b = U.el(`<button class="sx3-it s" aria-label="Sombra ${pos + 1}"><span style="transform:rotate(${rot}deg) scale(${sc})">${Kids.art.get(nm)}</span></button>`);
      b.dataset.k = k; colR.appendChild(b); shs[k] = b;
    });
    let sel = null, matched = 0;
    function line(k) {
      const R = root.getBoundingClientRect(), a = objs[k].getBoundingClientRect(), b = shs[k].getBoundingClientRect();
      const x1 = a.right - R.left, y1 = a.top + a.height / 2 - R.top, x2 = b.left - R.left, y2 = b.top + b.height / 2 - R.top;
      const col = LC[k % LC.length];
      svg.insertAdjacentHTML('beforeend', `<path d="M${x1} ${y1} C ${x1 + (x2 - x1) * .5} ${y1}, ${x1 + (x2 - x1) * .5} ${y2}, ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="6" fill="${col}"/><circle cx="${x2}" cy="${y2}" r="6" fill="${col}"/>`);
    }
    function clearSel() { if (sel) { sel.el.classList.remove('sel'); sel = null; } }
    function attempt(k, sk, drag) {
      clearSel();
      if (k === sk) {
        objs[k].classList.add('done'); shs[k].classList.add('done'); objs[k].dataset.locked = 1; if (drag) g.t(() => line(k), 320); else line(k); matched++;
        Kids.sound.pop();
        if (matched === n) g.right();
      } else { g.shake(shs[sk]); g.shake(objs[k]); g.wrong(); }
    }
    function pickO(k) {
      if (objs[k].classList.contains('done')) return;
      if (sel && sel.t === 'o' && sel.k === k) { clearSel(); return; }
      if (sel && sel.t === 's') { attempt(k, sel.k); return; }
      clearSel(); sel = { t: 'o', k, el: objs[k] }; objs[k].classList.add('sel');
    }
    function pickS(k) {
      if (shs[k].classList.contains('done')) return;
      if (sel && sel.t === 'o') { attempt(sel.k, k); return; }
      if (sel && sel.t === 's' && sel.k === k) { clearSel(); return; }
      clearSel(); sel = { t: 's', k, el: shs[k] }; shs[k].classList.add('sel');
    }
    objs.forEach((b, k) => Kids.drag(b, {
      targets: () => shs.filter(s => !s.classList.contains('done')),
      onStart: () => {},
      onDrop: (t) => { attempt(k, +t.dataset.k, true); return false; },
      onTap: () => pickO(k)
    }));
    shs.forEach((b, k) => b.onclick = () => pickS(k));
    window.addEventListener('resize', redraw);
    function redraw() { if (!root.isConnected) { window.removeEventListener('resize', redraw); return; } svg.innerHTML = ''; objs.forEach((o, k) => { if (o.classList.contains('done')) line(k); }); }
    g.helpHint = () => {
      let k = sel && sel.t === 'o' ? sel.k : objs.findIndex(o => !o.classList.contains('done'));
      if (sel && sel.t === 's') { k = sel.k; }
      if (k < 0) return;
      objs[k].classList.add('pulse'); shs[k].classList.add('pulse');
      g.t(() => { objs[k].classList.remove('pulse'); shs[k].classList.remove('pulse'); }, 2600);
    };
  }
});
})();

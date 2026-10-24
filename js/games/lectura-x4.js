/* Lectura x4 — Ordena la frase */
(function () {
'use strict';
const U = Kids.util;
/* [frase, [dibujos], nivel] */
const S = [
  ['El gato duerme.', ['cat', 'moon'], 1], ['El pato nada.', ['duck'], 1], ['La vaca come.', ['cow'], 1], ['El perro corre.', ['dog'], 1],
  ['El león ruge.', ['lion'], 1], ['La rana salta.', ['frog'], 1], ['El sol brilla.', ['sun'], 1], ['El loro habla.', ['parrot'], 1],
  ['El pez nada.', ['fish'], 1], ['La abeja vuela.', ['bee'], 1],
  ['El conejo come una zanahoria.', ['rabbit', 'carrot'], 2], ['El perro tiene una pelota.', ['dog', 'ball'], 2],
  ['La rana salta muy alto.', ['frog'], 2], ['El mono come un plátano.', ['monkey', 'banana'], 2], ['La vaca da leche.', ['cow'], 2],
  ['El pingüino tiene frío.', ['penguin', 'snowflake'], 2], ['La mariposa vuela alto.', ['butterfly'], 2],
  ['El búho mira la luna.', ['owl', 'moon'], 2], ['La tortuga camina despacio.', ['turtle'], 2], ['El oso come miel.', ['bear'], 2],
  ['La niña come una manzana roja.', ['apple'], 3], ['El perro corre detrás de la pelota.', ['dog', 'ball'], 3],
  ['La abeja vuela sobre la flor amarilla.', ['bee', 'flower'], 3], ['El pato nada feliz en el lago.', ['duck', 'cloud'], 3],
  ['¿Qué come el conejo en el jardín?', ['rabbit', 'carrot'], 3], ['El elefante grande bebe agua fresca.', ['elephant'], 3],
  ['La jirafa come hojas de un árbol.', ['giraffe', 'tree'], 3], ['Mi tortuga lenta camina por el jardín.', ['turtle', 'flower'], 3],
  ['La rana verde salta sobre una hoja.', ['frog', 'leaf'], 3], ['¡Hoy hace mucho sol en el parque!', ['sun', 'tree'], 3]
].map(([t, a, l]) => ({ t, a, l, w: t.split(' ') }));

Kids.css(`
.g-lectura-x4{gap:.9rem}
.g-lectura-x4 .x4-scene{display:flex;gap:.6rem;justify-content:center;align-items:center;padding:.5rem 1.2rem;background:linear-gradient(#CDEBFA 0 60%,#BFE8A8 60%);border-radius:1.8rem;box-shadow:0 .4rem 0 rgba(20,35,91,.12);flex:none}
.g-lectura-x4 .x4-scene svg{width:clamp(4.6rem,15vmin,8rem);height:clamp(4.6rem,15vmin,8rem)}
.g-lectura-x4 .x4-line{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;align-items:center;max-width:100%;padding:.5rem .8rem;background:#fff;border-radius:1.4rem;box-shadow:0 .3rem 0 var(--line);min-width:min(100%,20rem)}
.g-lectura-x4 .x4-slot{min-width:clamp(3.2rem,11vmin,5.4rem);height:clamp(3rem,9vmin,4.2rem);border-radius:.9rem;border:.2rem dashed #9CB5E8;background:rgba(255,255,255,.8);font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(1.3rem,4.4vmin,2.1rem);color:var(--ink);padding:0 .5rem;line-height:1}
.g-lectura-x4 .x4-slot.sel{border-color:var(--yellow);background:#FFF3BF}
.g-lectura-x4 .x4-slot.hot{background:#FFF3BF;border-color:var(--yellow)}
.g-lectura-x4 .x4-slot.filled{border-style:solid;border-color:var(--green);background:#E8F9EC;animation:pop .3s}
.g-lectura-x4 .x4-words{gap:.7rem}
.g-lectura-x4 .x4-w{min-width:0;min-height:clamp(3.2rem,10vmin,4.4rem);font-size:clamp(1.3rem,4.6vmin,2.2rem);padding:.1rem 1rem;border-radius:1.1rem}
.g-lectura-x4 .x4-w.used{opacity:.25;pointer-events:none}
.g-lectura-x4 .x4-w.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x4 .x4-done{font-family:'Baloo 2',sans-serif;font-size:clamp(1.4rem,4.6vmin,2.2rem);text-align:center;min-height:1.3em;color:var(--gd)}
`);

Kids.game({
  id: 'lectura-x4', group: 'lectura', num: 8,
  title: 'Ordena la frase', icon: 'book', rounds: 6,
  blurb: 'Toca las palabras en orden para formar la frase del dibujo.',
  how: 'Mira el dibujo y toca las palabras en orden para formar la frase. También puedes arrastrarlas a su hueco.',
  levels: ['Frases de 3 palabras', 'Frases de 4 o 5', 'Frases largas con signos'],
  round(g, i) {
    const lv = g.level, sh = g.shared = g.shared || { used: [] };
    if (i === 0) sh.used = [];
    let pool = S.filter(x => x.l === lv); let cand = pool.filter(x => !sh.used.includes(x.t)); if (!cand.length) cand = pool;
    const s = U.pick(cand); sh.used.push(s.t);
    const n = s.w.length;
    /* lv 1 y 2: sin punto final visible; la 1.ª palabra conserva su mayúscula */
    const shown = s.w.map((w, k) => lv < 3 ? w.replace(/[.!?¿¡]/g, '') : w);
    let order = U.shuffle(shown.map((w, k) => k)); let tries = 0;
    while (order.every((v, k) => shown[v] === shown[k]) && tries++ < 20) order = U.shuffle(order);

    const scene = U.el(`<div class="x4-scene">${s.a.map(a => Kids.art.get(a)).map(x => x).join('')}</div>`);
    const line = U.el('<div class="x4-line"></div>');
    const done = U.el('<div class="x4-done" aria-live="polite">&nbsp;</div>');
    const wordsEl = U.el('<div class="opts x4-words"></div>');
    g.area.append(scene, line, done, wordsEl);
    let sel = null, over = false;
    const filled = Array(n).fill(false);
    const nextEmpty = () => filled.indexOf(false);
    const slots = shown.map((w, k) => {
      const b = U.el(`<button class="x4-slot" aria-label="Hueco ${k + 1} de ${n}"></button>`);
      b.onclick = () => { if (filled[k] || over) return; sel = sel === k ? null : k; slots.forEach((x, q) => x.classList.toggle('sel', sel === q && !filled[q])); Kids.sound.tap(); };
      line.appendChild(b); return b;
    });
    const tiles = order.map(k => ({ w: shown[k], el: null }));
    function place(tile, k) {
      if (over || filled[k] || tile.el.classList.contains('used')) return false;
      if (tile.w === shown[k]) {
        filled[k] = true; sel = null; slots.forEach(x => x.classList.remove('sel'));
        slots[k].textContent = tile.w; slots[k].classList.add('filled'); tile.el.classList.add('used'); tile.el.disabled = true; Kids.sound.pop();
        wordsEl.querySelectorAll('.hint').forEach(x => x.classList.remove('hint'));
        if (filled.every(Boolean)) {
          over = true; done.textContent = s.t; g.say(s.t); g.right();
        }
        return true;
      }
      tile.el.classList.add('bad'); g.shake(tile.el); g.t(() => tile.el.classList.remove('bad'), 450); g.wrong(); return false;
    }
    tiles.forEach(tile => {
      const b = tile.el = U.el(`<button class="ans x4-w">${U.esc(tile.w)}</button>`); wordsEl.appendChild(b);
      const tapGo = () => { const k = sel != null && !filled[sel] ? sel : nextEmpty(); if (k >= 0) place(tile, k); };
      Kids.drag(b, {
        targets: () => slots.filter((x, k) => !filled[k]),
        onDrop: t => { place(tile, slots.indexOf(t)); return false; },
        onTap: tapGo
      });
      b.addEventListener('click', e => { if (e.detail === 0) tapGo(); });
    });
    g.helpHint = () => {
      const k = nextEmpty(); if (k < 0) return;
      const tl = tiles.find(x => x.w === shown[k] && !x.el.classList.contains('used'));
      if (tl) { tl.el.classList.add('hint'); g.toast('Sigue con «' + U.esc(shown[k]) + '»'); }
    };
    g.ask(lv === 3 ? 'Ordena las palabras para formar la frase' : 'Ordena la frase');
  }
});
})();

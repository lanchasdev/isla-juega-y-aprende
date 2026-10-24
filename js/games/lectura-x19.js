/* Palabras escondidas — lectura-x19 */
(function () {
'use strict';
const K = window.Kids, U = K.util, A = K.art;

const S = (inner) => `<svg viewBox="0 0 100 100">${inner}</svg>`;
A.add({
  'lx19-pan': S(`<ellipse cx="50" cy="82" rx="38" ry="6" fill="rgba(20,35,91,.1)"/><path d="M14 56q-4-26 36-30t36 30q0 22-36 22T14 56z" fill="#E9A64A"/><path d="M20 52q2-16 30-18t30 18q-2-6-30-6t-30 6z" fill="#F4C47E"/><path d="M34 40l6 18M50 38l2 20M66 40l-4 18" stroke="#C8832A" stroke-width="4" stroke-linecap="round"/>`)
});

const H = (h, def, art) => ({ h, def, art });
const SOL = 'Brilla en el cielo durante el día';
const WORDS = [
  { w: 'girasol', hs: [H('sol', SOL, 'sun')] },
  { w: 'soldado', hs: [H('sol', SOL, 'sun'), H('dado', 'Un cubo con puntos para jugar')] },
  { w: 'pantalón', hs: [H('pan', 'Se come en el desayuno y está blandito', 'lx19-pan'), H('talón', 'La parte de atrás del pie')] },
  { w: 'panadero', hs: [H('pan', 'Se come en el desayuno y está blandito', 'lx19-pan')] },
  { w: 'zapato', hs: [H('pato', 'Un animal que hace cuac y nada en el estanque', 'duck')] },
  { w: 'florero', hs: [H('flor', 'Tiene pétalos de colores y huele bien', 'flower')] },
  { w: 'lunares', hs: [H('luna', 'Sale de noche y brilla en el cielo', 'moon')] },
  { w: 'cochecito', hs: [H('coche', 'Tiene cuatro ruedas y lleva a la familia', 'car')] },
  { w: 'paraguas', hs: [H('agua', 'Sale del grifo y cae cuando llueve', 'raindrop')] },
  { w: 'cumpleaños', hs: [H('años', 'Los que cumples cada vez que soplas las velas'), H('cumple', 'Fiesta con tarta, velas y regalos')] },
  { w: 'mediodía', hs: [H('día', 'Lo contrario de la noche'), H('medio', 'La mitad de algo')] },
  { w: 'sacapuntas', hs: [H('puntas', 'Lo que pincha del lápiz'), H('saca', 'Lo contrario de «mete»')] },
  { w: 'abrelatas', hs: [H('latas', 'Botes de metal donde viene el atún'), H('abre', 'Lo contrario de «cierra»')] },
  { w: 'lavaplatos', hs: [H('platos', 'Donde pones la comida para comer'), H('lava', 'Limpia con agua y jabón')] },
  { w: 'rompecabezas', hs: [H('cabezas', 'Las que tenemos sobre el cuello'), H('rompe', 'Lo contrario de «arregla»')] }
];
/* distractores con dibujo */
const ARTW = { sol: 'sun', luna: 'moon', flor: 'flower', pato: 'duck', coche: 'car', agua: 'raindrop', pan: 'lx19-pan', casa: 'house', nube: 'cloud', mesa: 'table', pez: 'fish', gato: 'cat', libro: 'book', tren: 'train', pera: 'pear', llave: 'key' };
const EXTRA = ['mano', 'rata', 'boca', 'cama', 'tela', 'nido', 'rosa', 'mar', 'pelo', 'lana', 'perro', 'tarta', 'nariz'];
const COLS = ['#FFD23F', '#8CD4F5', '#FFB3C7'];

Kids.css(`
.g-lectura-x19 .wrap{width:100%;max-width:50rem;display:flex;flex-direction:column;align-items:center;gap:.9rem}
.g-lectura-x19 .word{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center}
.g-lectura-x19 .lt{width:min(3.2rem,8.6vw);height:min(4.2rem,11vw);border-radius:.9rem;background:#fff;box-shadow:0 .3rem 0 var(--line);display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:800;font-size:clamp(1.7rem,5vh,2.6rem);color:var(--ink);padding:0;transition:background .2s,transform .15s}
.g-lectura-x19 button.lt:hover{transform:translateY(-.15rem)}
.g-lectura-x19 .lt.sel{background:#FFF3BF;box-shadow:0 .3rem 0 #F2D77A;outline:.2rem solid var(--yellow);transform:translateY(-.25rem)}
.g-lectura-x19 .lt.help{animation:pulse .9s infinite}
.g-lectura-x19 .lt.found{color:var(--ink);animation:pop .5s}
.g-lectura-x19 .clue{font-family:'Baloo 2';font-size:clamp(1.15rem,2.8vh,1.5rem);color:var(--ink2);text-align:center;background:#fff;border-radius:1.2rem;padding:.4rem 1.2rem;box-shadow:0 .3rem 0 var(--line);max-width:100%}
.g-lectura-x19 .clues{display:flex;flex-direction:column;gap:.4rem;width:100%;max-width:34rem}
.g-lectura-x19 .clues .clue{text-align:left;display:flex;gap:.6rem;align-items:center}
.g-lectura-x19 .clues .clue i{flex:none;width:1.6rem;height:1.6rem;border-radius:50%;background:var(--a1);display:inline-block;font-style:normal;text-align:center;line-height:1.6rem;color:#fff}
.g-lectura-x19 .clues .clue.ok i{background:var(--green)}
.g-lectura-x19 .wopts .pic{width:clamp(6.5rem,19vw,9rem)}
.g-lectura-x19 .wopts .pic svg{height:5.4rem;width:100%}
.g-lectura-x19 .ans.w{font-size:clamp(1.7rem,4.4vh,2.4rem);min-height:4.2rem;padding:.2rem 1.4rem}
.g-lectura-x19 .help{animation:pulse .9s infinite;outline:.25rem solid var(--yellow)}
.g-lectura-x19 .found-cap{display:flex;align-items:center;gap:.6rem;font-family:'Baloo 2';font-weight:800;font-size:2rem;color:var(--lecturaD);animation:pop .5s}
.g-lectura-x19 .found-cap svg{width:3.4rem;height:3.4rem}
`);

let deck = [];
K.game({
  id: 'lectura-x19', group: 'lectura', num: 23,
  title: 'Palabras escondidas', icon: 'book', rounds: 6,
  blurb: 'Dentro de una palabra larga se esconde otra palabra. ¡Encuéntrala!',
  how: 'Mira la palabra larga. Dentro hay una palabra escondida. Elige cuál es, o toca sus letras.',
  levels: ['Palabras cortas con dibujo', 'Cuatro opciones de texto', 'Toca las letras'],
  round(g, i) {
    const lv = g.level;
    if (i === 0 || !deck.length) {
      const ok = WORDS.filter(e => lv === 1 ? e.hs[0].art && e.hs[0].h.length <= 5 : lv === 2 ? e.hs.some(x => x.h.length >= 4 && x.h.length <= 5) : true);
      deck = U.sample(ok, g.rounds);
    }
    const e = deck.pop(), word = e.w;
    const root = U.el('<div class="wrap"></div>'); g.area.appendChild(root);
    const wEl = U.el('<div class="word"></div>'); root.appendChild(wEl);
    const lts = word.split('').map((c, k) => { const b = U.el(`<${lv === 3 ? 'button' : 'div'} class="lt" ${lv === 3 ? `aria-label="Letra ${c}"` : ''}>${U.esc(c)}</${lv === 3 ? 'button' : 'div'}>`); wEl.appendChild(b); return b; });
    const paint = (h, col) => { const st = word.indexOf(h.h); for (let k = st; k < st + h.h.length; k++) { lts[k].style.background = col; lts[k].classList.add('found'); lts[k].classList.remove('sel', 'help'); } };

    if (lv < 3) {
      const target = lv === 1 ? e.hs[0] : U.pick(e.hs.filter(x => x.h.length >= 4 && x.h.length <= 5));
      g.ask(`¿Qué palabra hay escondida dentro de ${word}?`);
      const nOpt = lv === 1 ? 3 : 4;
      const pool = (lv === 1 ? Object.keys(ARTW) : Object.keys(ARTW).concat(EXTRA)).filter(x => !word.includes(x) && x !== target.h);
      const opts = U.shuffle([target.h].concat(U.sample(pool, nOpt - 1)));
      if (lv === 2) root.appendChild(U.el(`<div class="clue">Pista: ${U.esc(target.def)}</div>`));
      const box = U.el(`<div class="opts wopts"></div>`); root.appendChild(box);
      let done = false;
      const btns = opts.map(h => {
        const art = lv === 1 ? (h === target.h ? target.art : ARTW[h]) : null;
        const b = U.el(art ? `<button class="pic" aria-label="${U.esc(h)}">${A.get(art)}<span class="lbl">${U.esc(h)}</span></button>` : `<button class="ans w">${U.esc(h)}</button>`);
        b._h = h;
        b.onclick = () => {
          if (done || b.disabled) return; g.say(h);
          if (h === target.h) {
            done = true; btns.forEach(x => x.classList.remove('help')); b.classList.add('right');
            paint(target, COLS[0]);
            g.t(() => g.say(`${target.h}, dentro de ${word}`), 500);
            g.right('¡Palabra encontrada!');
          } else { b.classList.add('bad'); b.disabled = true; g.wrong('Mira bien las letras de la palabra'); }
        };
        box.appendChild(b); return b;
      });
      g.helpHint = () => {
        const st = word.indexOf(target.h); if (lts[st]) lts[st].classList.add('help');
        g.toast(U.esc(target.def)); g.say(target.def);
        const b = btns.find(x => x._h === target.h); if (b) b.classList.add('help');
      };
      return;
    }

    /* nivel 3: tocar las letras */
    const hs = e.hs, found = new Set(); let sel = new Set(), done = false;
    g.ask(hs.length > 1 ? `Hay ${hs.length === 2 ? 'dos palabras escondidas' : 'varias palabras escondidas'} en ${word}. Toca las letras de cada una.` : `Toca las letras de la palabra escondida en ${word}`);
    const clues = U.el('<div class="clues"></div>'); root.appendChild(clues);
    const ce = hs.map(h => { const c = U.el(`<div class="clue"><i>·</i><span>${U.esc(h.def)}</span></div>`); clues.appendChild(c); return c; });
    const go = U.el('<button class="btn sm" aria-label="Comprobar">¡Ya está!</button>'); root.appendChild(go);
    go.disabled = true; go.style.opacity = .5;
    const upd = () => { go.disabled = sel.size < 2; go.style.opacity = sel.size < 2 ? .5 : 1; };
    lts.forEach((b, k) => b.onclick = () => {
      if (done || b.classList.contains('found')) return;
      g.say(word[k]); K.sound.tap();
      if (sel.has(k)) { sel.delete(k); b.classList.remove('sel'); } else { sel.add(k); b.classList.add('sel'); }
      upd();
    });
    go.onclick = () => {
      if (done || sel.size < 2) return;
      const idx = hs.findIndex((h, n) => { if (found.has(n)) return false; const st = word.indexOf(h.h); return sel.size === h.h.length && U.range(h.h.length, st).every(k => sel.has(k)); });
      if (idx >= 0) {
        found.add(idx); paint(hs[idx], COLS[idx % 3]); sel = new Set(); upd();
        ce[idx].classList.add('ok'); ce[idx].querySelector('i').textContent = '✓';
        g.say(hs[idx].h);
        if (found.size === hs.length) { done = true; g.right(hs.length > 1 ? '¡Las has encontrado todas!' : '¡Palabra encontrada!'); }
        else g.toast('¡Una encontrada! Busca la otra');
      } else {
        g.shake(wEl); lts.forEach(b => b.classList.remove('sel')); sel = new Set(); upd();
        g.wrong('Esas letras no forman la palabra. ¡Prueba otra vez!');
      }
    };
    g.helpHint = () => {
      const n = hs.findIndex((h, m) => !found.has(m)); if (n < 0) return;
      const st = word.indexOf(hs[n].h);
      lts[st].classList.add('help'); lts[st + hs[n].h.length - 1].classList.add('help');
      g.toast(`Empieza en «${word[st].toUpperCase()}» y acaba en «${word[st + hs[n].h.length - 1].toUpperCase()}»`);
    };
  }
});
})();

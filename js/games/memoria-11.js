/* Memory de parejas */
(function () {
'use strict';
const U = Kids.util;
/* banco de dibujos con su nombre (artículo + palabra) y palabra suelta */
const BANK = [
  ['duck', 'el pato', 'pato'], ['dog', 'el perro', 'perro'], ['cat', 'el gato', 'gato'], ['rabbit', 'el conejo', 'conejo'],
  ['cow', 'la vaca', 'vaca'], ['pig', 'el cerdito', 'cerdito'], ['horse', 'el caballo', 'caballo'], ['sheep', 'la oveja', 'oveja'],
  ['frog', 'la rana', 'rana'], ['turtle', 'la tortuga', 'tortuga'], ['bear', 'el oso', 'oso'], ['lion', 'el león', 'león'],
  ['owl', 'el búho', 'búho'], ['penguin', 'el pingüino', 'pingüino'], ['fish', 'el pez', 'pez'], ['butterfly', 'la mariposa', 'mariposa'],
  ['apple', 'la manzana', 'manzana'], ['banana', 'el plátano', 'plátano'], ['pear', 'la pera', 'pera'], ['orange', 'la naranja', 'naranja'],
  ['strawberry', 'la fresa', 'fresa'], ['grapes', 'las uvas', 'uvas'], ['cherry', 'las cerezas', 'cerezas'], ['watermelon', 'la sandía', 'sandía'],
  ['carrot', 'la zanahoria', 'zanahoria'], ['cake', 'la tarta', 'tarta'], ['car', 'el coche', 'coche'], ['ball', 'la pelota', 'pelota'],
  ['teddy', 'el osito', 'osito'], ['kite', 'la cometa', 'cometa'], ['drum', 'el tambor', 'tambor'], ['train', 'el tren', 'tren'],
  ['house', 'la casa', 'casa'], ['key', 'la llave', 'llave'], ['book', 'el libro', 'libro'], ['shoe', 'el zapato', 'zapato'],
  ['boat', 'el barco', 'barco'], ['cup', 'la taza', 'taza'], ['sun', 'el sol', 'sol'], ['moon', 'la luna', 'luna'], ['tree', 'el árbol', 'árbol']
];
const CFG = { 1: { pairs: 3, words: 0 }, 2: { pairs: 6, words: 0 }, 3: { pairs: 8, words: 3 } };
let lastPairs = 3;

const BACK = '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#8C7BE0"/><g fill="#A596EB"><circle cx="0" cy="0" r="22"/><circle cx="100" cy="0" r="22"/><circle cx="0" cy="100" r="22"/><circle cx="100" cy="100" r="22"/></g><rect x="7" y="7" width="86" height="86" rx="14" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/><path d="M50 22l7.8 17.2 18.7 2-14 12.6 4 18.4L50 62.6 33.5 72.2l4-18.4-14-12.6 18.7-2z" fill="#FFD23F" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';

Kids.css(`
.g-memoria-11{gap:.7rem}
.g-memoria-11 .mtop{display:flex;align-items:center;justify-content:center;gap:.8rem;flex-wrap:wrap}
.g-memoria-11 .mpill{background:#fff;border-radius:999px;padding:.3rem 1.1rem;font-family:'Baloo 2',sans-serif;font-size:1.25rem;box-shadow:0 .25rem 0 var(--line);display:flex;align-items:center;gap:.5rem}
.g-memoria-11 .mpill b{color:var(--gd);font-size:1.5rem}
.g-memoria-11 .mboard{display:grid;gap:var(--gap,.7rem);justify-content:center;align-content:center}
.g-memoria-11 .mc{width:var(--cs);height:var(--cs);perspective:60rem;position:relative}
.g-memoria-11 .mc .in{position:absolute;inset:0;transition:transform .5s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d;border-radius:1.2rem}
.g-memoria-11 .mc.flip .in{transform:rotateY(180deg)}
.g-memoria-11 .mc:hover:not(.flip) .in{transform:translateY(-.2rem) rotate(-2deg)}
.g-memoria-11 .face{position:absolute;inset:0;border-radius:1.2rem;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 .35rem 0 rgba(20,35,91,.16)}
.g-memoria-11 .face.back{background:var(--g);border:.2rem solid #fff}
.g-memoria-11 .face.back svg{width:100%;height:100%}
.g-memoria-11 .face.front{background:#fff;transform:rotateY(180deg);border:.25rem solid var(--line);padding:6%}
.g-memoria-11 .face.front svg{width:100%;height:100%;min-height:0}
.g-memoria-11 .face.front.word{font-family:'Baloo 2',sans-serif;font-weight:800;color:var(--gd);background:var(--gl);padding:2%}
.g-memoria-11 .mc.ok .face.front{background:#E4F8E9;border-color:#5CC77A;box-shadow:0 .35rem 0 #5CC77A}
.g-memoria-11 .mc.ok .face.front.word{background:#E4F8E9}
.g-memoria-11 .mc.ok .tick{opacity:1;transform:scale(1)}
.g-memoria-11 .tick{position:absolute;right:-.3rem;top:-.4rem;width:1.7rem;height:1.7rem;border-radius:50%;background:#5CC77A;color:#fff;padding:.25rem;opacity:0;transform:scale(0);transition:.3s .4s;z-index:3;box-shadow:0 .15rem 0 #3FA25E}
.g-memoria-11 .mc.ok .in{animation:mpop .5s .5s}
@keyframes mpop{50%{transform:rotateY(180deg) scale(1.12)}}
.g-memoria-11 .mc.hint .face.back{animation:mhint .6s 3}
@keyframes mhint{50%{filter:brightness(1.25);transform:scale(1.06)}}
`);

Kids.game({
  id: 'memoria-11', group: 'memoria', num: 1,
  title: 'Memory de parejas',
  blurb: 'Da la vuelta a las cartas y encuentra las parejas iguales.',
  how: 'Toca dos cartas para darles la vuelta. Si son iguales, ¡es una pareja! Encuentra todas las parejas.',
  icon: 'strawberry',
  levels: ['6 cartas', '12 cartas', '16 cartas'],
  rounds: 1,
  stars(mistakes) { return mistakes <= lastPairs ? 3 : mistakes <= 2 * lastPairs ? 2 : 1; },
  round(g) {
    const cfg = CFG[g.level], area = g.area;
    lastPairs = cfg.pairs;
    g.ask('Encuentra las parejas');
    const top = U.el(`<div class="mtop"><div class="mpill">Parejas <b class="np">0</b> de ${cfg.pairs}</div><div class="mpill">Intentos <b class="nt">0</b></div><button class="btn sm blue">Barajar otra vez</button></div>`);
    const board = U.el('<div class="mboard"></div>');
    area.appendChild(top); area.appendChild(board);
    const np = top.querySelector('.np'), nt = top.querySelector('.nt');
    let cols = 3, rows = 2, cards = [], open = [], busy = false, found = 0, tries = 0;

    function fit() {
      if (!board.isConnected) return;
      const W = area.clientWidth - parseFloat(getComputedStyle(area).fontSize) * 3, H = area.clientHeight - top.offsetHeight - parseFloat(getComputedStyle(area).fontSize) * 3.6;
      const gap = Math.max(6, Math.min(W, H) * 0.025);
      const portrait = W < H * 0.95;
      const n = cfg.pairs * 2;
      const dims = n === 6 ? (portrait ? [2, 3] : [3, 2]) : n === 12 ? (portrait ? [3, 4] : [4, 3]) : [4, 4];
      cols = dims[0]; rows = dims[1];
      const cs = Math.max(40, Math.min((W - gap * (cols - 1)) / cols, (H - gap * (rows - 1)) / rows, 200));
      board.style.setProperty('--cs', cs + 'px'); board.style.setProperty('--gap', gap + 'px');
      board.style.gridTemplateColumns = `repeat(${cols}, ${cs}px)`;
    }
    const onResize = () => { if (!board.isConnected) window.removeEventListener('resize', onResize); else fit(); };
    window.addEventListener('resize', onResize);

    function deal() {
      board.innerHTML = ''; open = []; busy = false; found = 0; tries = 0; np.textContent = 0; nt.textContent = 0;
      const items = U.sample(BANK, cfg.pairs);
      const list = [];
      items.forEach((it, k) => {
        list.push({ key: it[0], say: it[1], word: false, it });
        list.push({ key: it[0], say: it[1], word: k < cfg.words, it });
      });
      cards = U.shuffle(list).map(c => {
        const face = c.word ? `<div class="face front word" style="font-size:calc(var(--cs)*${Math.min(0.26, 1.75 / c.it[2].length).toFixed(3)})">${U.esc(c.it[2])}</div>` : `<div class="face front">${Kids.art.get(c.key)}</div>`;
        const b = U.el(`<button class="mc" aria-label="Carta"><div class="in"><div class="face back">${BACK}</div>${face}</div><span class="tick">${Kids.icons.check}</span></button>`);
        c.el = b; b.onclick = () => flip(c); board.appendChild(b); return c;
      });
      fit();
    }
    function flip(c) {
      if (busy || c.done || open.includes(c)) return;
      Kids.sound.pop(); c.el.classList.add('flip'); c.el.classList.remove('hint'); open.push(c); g.say(c.say);
      if (open.length < 2) return;
      tries++; nt.textContent = tries;
      const [a, b] = open;
      if (a.key === b.key) {
        a.done = b.done = true; open = []; found++; np.textContent = found;
        g.t(() => { a.el.classList.add('ok'); b.el.classList.add('ok'); Kids.sound.ok(); }, 450);
        if (found === cfg.pairs) g.t(() => g.right('¡Has encontrado todas las parejas!'), 1100);
      } else {
        busy = true; g.wrong('¡Casi! Recuerda dónde están');
        g.t(() => { a.el.classList.remove('flip'); b.el.classList.remove('flip'); open = []; busy = false; }, 1300);
      }
    }
    top.querySelector('button').onclick = () => { Kids.sound.tap(); deal(); };
    deal();
    /* ayuda: tras varios fallos, hace brillar una carta cuya pareja ya se ha visto */
    g.helpHint = () => {
      const free = cards.filter(c => !c.done && !c.el.classList.contains('flip'));
      if (free.length) { const c = U.pick(free); c.el.classList.add('hint'); g.t(() => c.el.classList.remove('hint'), 2000); }
    };
  }
});
})();

/* Mates x18 — Números escritos */
(function () {
'use strict';
const U = Kids.util;
const W = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
  'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const TENS = { 30: 'treinta', 40: 'cuarenta', 50: 'cincuenta' };
function word(n) {
  if (n <= 29) return W[n];
  const t = Math.floor(n / 10) * 10, u = n % 10;
  return u ? TENS[t] + ' y ' + W[u] : TENS[t];
}
const POOL = {
  1: () => U.range(10, 1),
  2: () => U.range(20, 1).filter(n => n > 5 || Math.random() < 0.6),
  3: () => U.range(41, 10)
};
function pickNums(lv) {
  if (lv === 1) return U.sample(U.range(10, 1), 5);
  if (lv === 2) { // 11..20 casi siempre, algunos pequeños
    return U.sample(U.range(10, 11), 4).concat(U.sample(U.range(10, 1), 1)).slice(0, 5);
  }
  // nivel 3: 2 decenas, 2-3 compuestos de 21..49, hasta 50
  const tens = U.sample([20, 30, 40, 50], 2);
  const comp = U.sample(U.range(29, 21).filter(n => n % 10 !== 0), 3);
  return tens.concat(comp);
}
let lastKey = '';

Kids.css(`
.g-mates-x18 .x18-board{position:relative;display:grid;grid-template-columns:1fr 18% 1fr;grid-auto-rows:minmax(4rem,5.2rem);width:min(40rem,94%);row-gap:.5rem;align-items:stretch}
.g-mates-x18 .x18-lines{grid-column:2;grid-row:1/-1;width:100%;height:100%;overflow:visible;pointer-events:none}
.g-mates-x18 .x18-w,.g-mates-x18 .x18-n{font-family:'Baloo 2';font-weight:800;color:var(--ink);border-radius:1.2rem;border:.2rem solid transparent;box-shadow:0 .35rem 0 rgba(20,35,91,.16);padding:0 .6rem;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1;transition:transform .12s}
.g-mates-x18 .x18-w{grid-column:1;background:var(--a1);font-size:clamp(1.15rem,3.9vw,1.9rem)}
.g-mates-x18 .x18-n{grid-column:3;background:var(--a3);font-size:clamp(1.8rem,6vw,2.8rem)}
.g-mates-x18 .x18-w.on,.g-mates-x18 .x18-n.on{border-color:var(--ink);transform:scale(1.07);background:#FFF3BF}
.g-mates-x18 .x18-w.done,.g-mates-x18 .x18-n.done{background:#BDEFC8;box-shadow:0 .35rem 0 #5CC77A;pointer-events:none}
.g-mates-x18 .x18-w.bad,.g-mates-x18 .x18-n.bad{background:#FFD3CF}
.g-mates-x18 .x18-w.hint,.g-mates-x18 .x18-n.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .4rem #FFD23F}
.g-mates-x18 .x18-lines line{stroke-width:5px;stroke-linecap:round;vector-effect:non-scaling-stroke}
@media (max-width:640px){.g-mates-x18 .x18-board{grid-template-columns:1.25fr 11% 1fr;width:96%}.g-mates-x18 .x18-w{font-size:clamp(1.2rem,4.6vw,1.9rem)}}
`);

Kids.game({
  id: 'mates-x18', group: 'mates', num: 23,
  title: 'Números escritos',
  blurb: 'Une cada palabra con su número.',
  how: 'Toca una palabra y luego el número que dice. Se dibuja una línea. Toca la palabra para oírla.',
  icon: 'book',
  levels: ['Del uno al diez', 'Hasta veinte', 'Decenas y números hasta 50'],
  rounds: 3,
  round(g, i) {
    const lv = g.level;
    let nums, key;
    do { nums = pickNums(lv); key = nums.slice().sort().join(); } while (key === lastKey);
    lastKey = key;
    const n = nums.length;
    const left = U.shuffle(nums), right = U.shuffle(nums);
    g.ask('Une cada palabra con su número');
    const board = U.el('<div class="x18-board"></div>');
    const COLS = ['#8C7BE0', '#F2B93B', '#47B5BF', '#FF7EA8', '#5CC77A'];
    board.style.gridTemplateRows = `repeat(${n},minmax(3.6rem,5.2rem))`;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'x18-lines'); svg.setAttribute('viewBox', `0 0 100 ${n}`); svg.setAttribute('preserveAspectRatio', 'none');
    board.appendChild(svg);
    let selW = null, selN = null, matched = 0, lineCount = 0;
    const wEls = {}, nEls = {};
    left.forEach((v, k) => {
      const b = U.el(`<button class="x18-w" data-v="${v}" style="grid-row:${k + 1}" aria-label="${word(v)}">${word(v)}</button>`);
      wEls[v] = b; board.appendChild(b);
    });
    right.forEach((v, k) => {
      const b = U.el(`<button class="x18-n" data-v="${v}" style="grid-row:${k + 1}" aria-label="${v}">${v}</button>`);
      nEls[v] = b; board.appendChild(b);
    });
    function line(v, bad) {
      const y1 = left.indexOf(v) + .5, y2 = right.indexOf(v) + .5;
      const l = document.createElementNS(svgNS, 'line');
      l.setAttribute('x1', 0); l.setAttribute('x2', 100); l.setAttribute('y1', y1); l.setAttribute('y2', y2);
      l.setAttribute('stroke', COLS[lineCount++ % COLS.length]); svg.appendChild(l);
    }
    function clear() { if (selW) wEls[selW].classList.remove('on'); if (selN) nEls[selN].classList.remove('on'); selW = selN = null; }
    function tryPair() {
      if (selW === null || selN === null) return;
      const a = selW, b = selN;
      if (a === b) {
        clear(); wEls[a].classList.add('done'); nEls[a].classList.add('done'); line(a); matched++; Kids.sound.pop();
        if (matched === n) g.right('¡Todas unidas!');
      } else {
        const x = wEls[a], y = nEls[b];
        clear(); x.classList.add('bad'); y.classList.add('bad'); g.shake(x); g.shake(y);
        g.t(() => { x.classList.remove('bad'); y.classList.remove('bad'); }, 600);
        g.wrong();
      }
    }
    Object.keys(wEls).forEach(k => {
      const v = +k;
      wEls[v].onclick = () => {
        Kids.voice.say(word(v));
        if (selW !== null) wEls[selW].classList.remove('on');
        selW = selW === v ? null : v; if (selW !== null) wEls[v].classList.add('on');
        tryPair();
      };
      nEls[v].onclick = () => {
        Kids.voice.say(String(v));
        if (selN !== null) nEls[selN].classList.remove('on');
        selN = selN === v ? null : v; if (selN !== null) nEls[v].classList.add('on');
        tryPair();
      };
    });
    g.area.appendChild(board);
    g.helpHint = () => {
      const pend = left.filter(v => !wEls[v].classList.contains('done'));
      const v = (selW !== null && pend.includes(selW)) ? selW : pend[0];
      g.toast(`Busca «${word(v)}»: ¡es el ${v}!`);
      wEls[v].classList.add('hint'); nEls[v].classList.add('hint');
      g.t(() => { wEls[v].classList.remove('hint'); nEls[v].classList.remove('hint'); }, 3500);
    };
  },
  stars(m, r) { return m <= 2 ? 3 : m <= 6 ? 2 : 1; }
});
})();

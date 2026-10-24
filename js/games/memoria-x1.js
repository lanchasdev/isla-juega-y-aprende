/* Simón dice: repetir una secuencia de colores y sonidos */
(function () {
'use strict';
const U = Kids.util;
const COLS = [
  { n: 'roja', c: '#F26B6B', d: '#C94A4A', l: '#FFB3B3', f: 262 },
  { n: 'azul', c: '#4C8DF6', d: '#2F6BCF', l: '#A8C9FB', f: 330 },
  { n: 'amarilla', c: '#FFD23F', d: '#D9A800', l: '#FFEC9E', f: 392 },
  { n: 'verde', c: '#5CC77A', d: '#3A9F58', l: '#B3EBC3', f: 523 }
];
/* rotación de la hoja para que apunte al centro (2x2) */
const ROT = [135, 225, 45, -45];
function leaf(k, three) {
  const C = COLS[k], rot = three ? [-20, 0, 20][k] : ROT[k];
  return `<svg viewBox="0 0 100 100"><g transform="rotate(${rot} 50 50)">
    <path d="M50 4 C 90 20 96 72 50 96 C 4 72 10 20 50 4Z" fill="${C.c}" stroke="${C.d}" stroke-width="3"/>
    <path d="M50 14 L50 88" stroke="${C.l}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <path d="M50 40 L66 28 M50 56 L68 44 M50 40 L34 28 M50 56 L32 44" stroke="${C.l}" stroke-width="2.4" stroke-linecap="round" opacity=".6"/></g>
    <circle cx="40" cy="46" r="6" fill="#fff"/><circle cx="60" cy="46" r="6" fill="#fff"/><circle cx="41" cy="47" r="3.2" fill="#14235B"/><circle cx="61" cy="47" r="3.2" fill="#14235B"/>
    <path d="M40 60 Q50 70 60 60" fill="none" stroke="#14235B" stroke-width="3" stroke-linecap="round"/></svg>`;
}
Kids.css(`
.g-memoria-x1{gap:.9rem}
.g-memoria-x1 .sx1-pads{display:grid;gap:.9rem;grid-template-columns:repeat(2,auto);justify-content:center}
.g-memoria-x1 .sx1-pads.three{grid-template-columns:repeat(3,auto)}
.g-memoria-x1 .sx1-pad{width:min(13rem,38vw,26vh);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.7);padding:.2rem;transition:transform .12s,filter .12s;box-shadow:0 .4rem 0 rgba(20,35,91,.12);position:relative}
.g-memoria-x1 .sx1-pad svg{width:100%;height:100%;filter:saturate(.85)}
.g-memoria-x1 .sx1-pad:active:not([disabled]){transform:scale(.96)}
.g-memoria-x1 .sx1-pad.lit{transform:scale(1.14);background:#fff;box-shadow:0 0 0 .5rem var(--lc),0 0 2.4rem 1rem var(--lc);z-index:2}
.g-memoria-x1 .sx1-pad.lit svg{filter:saturate(1.5) brightness(1.15)}
.g-memoria-x1 .sx1-pad[disabled]{cursor:default}
.g-memoria-x1 .sx1-st{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;justify-content:center}
.g-memoria-x1 .sx1-say{font-family:'Baloo 2';font-size:1.5rem;background:#fff;border-radius:999px;padding:.2rem 1.2rem;box-shadow:var(--shadow);min-width:9rem;text-align:center}
.g-memoria-x1 .sx1-prog{display:flex;gap:.45rem;justify-content:center;min-height:1.2rem}
.g-memoria-x1 .sx1-prog i{width:1.1rem;height:1.1rem;border-radius:50%;background:var(--gl);border:.18rem solid var(--g);transition:all .2s}
.g-memoria-x1 .sx1-prog i.on{background:var(--yellow);border-color:#D9A800;transform:scale(1.2)}
`);
Kids.game({
  id: 'memoria-x1', group: 'memoria', num: 5, title: 'Simón dice',
  blurb: 'Mira qué hojas se iluminan y suenan, y tócalas en el mismo orden.',
  how: 'Mira con atención qué hojas se iluminan. Luego tócalas en el mismo orden. Si te equivocas, ¡no pasa nada! Puedes ver la secuencia otra vez.',
  icon: 'parrot', levels: ['3 colores, lento', '4 colores', '4 colores, rápido'], rounds: 5,
  round(g, i) {
    const L = g.level, ncol = L === 1 ? 3 : 4, start = [2, 3, 4][L - 1], step0 = [950, 760, 540][L - 1];
    const len = start + i;
    const seq = [];
    while (seq.length < len) {
      const k = U.rnd(0, ncol - 1), n = seq.length;
      if (n >= 2 && seq[n - 1] === k && seq[n - 2] === k) continue;
      seq.push(k);
    }
    g.ask(i === 0 ? 'Mira las hojas y repite la secuencia' : '¡Una más! Mira y repite');
    const root = U.el(`<div style="display:flex;flex-direction:column;align-items:center;gap:.9rem">
      <div class="sx1-prog"></div>
      <div class="sx1-pads ${ncol === 3 ? 'three' : ''}">${U.range(ncol).map(k => `<button class="sx1-pad" data-k="${k}" aria-label="Hoja ${COLS[k].n}" style="--lc:${COLS[k].l}">${leaf(k, ncol === 3)}</button>`).join('')}</div>
      <div class="sx1-st"><div class="sx1-say">&nbsp;</div><button class="btn blue sm" id="again" aria-label="Ver otra vez">${Kids.icons.redo} Ver otra vez</button></div>
    </div>`);
    g.area.appendChild(root);
    const pads = [...root.querySelectorAll('.sx1-pad')], say = root.querySelector('.sx1-say'), prog = root.querySelector('.sx1-prog'), again = root.querySelector('#again');
    let pos = 0, token = 0, input = false, slow = false, done = false;
    const drawProg = () => { prog.innerHTML = seq.map((_, k) => `<i class="${k < pos ? 'on' : ''}"></i>`).join(''); };
    const enable = on => { input = on; pads.forEach(p => p.disabled = !on); again.disabled = false; };
    function flash(k, dur) {
      const p = pads[k]; p.classList.add('lit');
      Kids.sound.tone(COLS[k].f, 0, Math.max(.18, dur / 1000), 'sine', .28);
      g.t(() => p.classList.remove('lit'), dur);
    }
    function play() {
      if (done) return;
      const my = ++token; pos = 0; drawProg(); enable(false); say.textContent = 'Mira…';
      const step = slow ? step0 * 1.45 : step0;
      seq.forEach((k, n) => g.t(() => { if (my === token) flash(k, step * .62); }, 650 + n * step));
      g.t(() => { if (my === token) { enable(true); say.textContent = '¡Tu turno!'; } }, 650 + seq.length * step);
    }
    pads.forEach((p, k) => p.onclick = () => {
      if (!input) return;
      flash(k, 280);
      if (k === seq[pos]) {
        pos++; drawProg();
        if (pos === seq.length) { done = true; enable(false); say.textContent = '¡Genial!'; g.t(() => g.right(), 450); }
      } else {
        enable(false); say.textContent = 'Casi…';
        g.wrong('¡Casi! Mira otra vez con calma');
        g.t(play, 1500);
      }
    });
    again.onclick = () => { if (!done) play(); };
    g.helpHint = () => { slow = true; g.toast('Vamos más despacito'); };
    drawProg(); enable(false);
    g.t(play, 500);
  }
});
})();

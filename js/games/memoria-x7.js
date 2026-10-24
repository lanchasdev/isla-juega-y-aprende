/* Une los puntos */
(function () {
'use strict';
const U = Kids.util;
const N = { 1: 10, 2: 20, 3: 30 };

function starPts() {
  const p = [];
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 19 : 44; p.push([50 + r * Math.cos(a), 54 + r * Math.sin(a)]); }
  return p;
}
/* cada figura: contorno cerrado de vértices clave (≤10), relleno y detalles que aparecen al terminar */
const FIGS = [
  { name: 'una estrella', fill: '#FFD23F', edge: '#F2A900', pts: starPts(),
    deco: '<circle cx="42" cy="50" r="3.4" fill="#14235B"/><circle cx="58" cy="50" r="3.4" fill="#14235B"/><path d="M43 60q7 7 14 0" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/><circle cx="36" cy="58" r="3.4" fill="#FF9AA2" opacity=".8"/><circle cx="64" cy="58" r="3.4" fill="#FF9AA2" opacity=".8"/>' },
  { name: 'una casa', fill: '#FFE2B8', edge: '#E08A3C',
    pts: [[50, 12], [94, 50], [78, 50], [78, 88], [22, 88], [22, 50], [6, 50]],
    deco: '<path d="M50 12L94 50H6Z" fill="#E4572E"/><rect x="42" y="62" width="16" height="26" rx="3" fill="#9B6B3A"/><circle cx="54" cy="76" r="1.6" fill="#FFD23F"/><rect x="26" y="56" width="12" height="12" rx="2" fill="#CFE6FB" stroke="#fff" stroke-width="2"/><rect x="62" y="56" width="12" height="12" rx="2" fill="#CFE6FB" stroke="#fff" stroke-width="2"/><rect x="68" y="18" width="8" height="16" fill="#C98A6B"/>' },
  { name: 'un pez', fill: '#FF9A5C', edge: '#E56A22',
    pts: [[6, 50], [26, 30], [54, 24], [78, 40], [94, 24], [94, 76], [78, 60], [54, 76], [26, 70]],
    deco: '<path d="M40 27Q52 14 62 30Z" fill="#FFC27A"/><path d="M40 73Q52 86 62 70Z" fill="#FFC27A"/><circle cx="24" cy="46" r="5.2" fill="#fff"/><circle cx="23" cy="46" r="2.8" fill="#14235B"/><path d="M13 56q5 4 9 1" fill="none" stroke="#B64A12" stroke-width="2.2" stroke-linecap="round"/><g fill="none" stroke="#FFC27A" stroke-width="2.4" stroke-linecap="round"><path d="M50 38q4 12 0 24"/><path d="M62 40q4 10 0 20"/></g>' },
  { name: 'un barco', fill: '#FFFFFF', edge: '#4C8DF6',
    pts: [[24, 86], [6, 62], [46, 62], [46, 10], [92, 60], [76, 86]],
    deco: '<path d="M46 10L92 60H46Z" fill="#FF7E69"/><path d="M6 62h86L76 86H24Z" fill="#4C8DF6"/><path d="M46 62V10" stroke="#8A5A2B" stroke-width="3"/><path d="M46 10l12 4-12 5z" fill="#FFD23F"/><circle cx="36" cy="73" r="3.4" fill="#fff"/><circle cx="50" cy="73" r="3.4" fill="#fff"/><circle cx="64" cy="73" r="3.4" fill="#fff"/><path d="M8 93q8-6 16 0t16 0 16 0 16 0 16 0" fill="none" stroke="#8FD6F2" stroke-width="3" stroke-linecap="round"/>' },
  { name: 'un gato', fill: '#FFB866', edge: '#E08A3C',
    pts: [[14, 12], [38, 28], [62, 28], [86, 12], [90, 56], [78, 80], [50, 90], [22, 80], [10, 56]],
    deco: '<path d="M18 20l14 9-12 10z" fill="#FF9AA2"/><path d="M82 20L68 29l12 10z" fill="#FF9AA2"/><ellipse cx="36" cy="54" rx="6" ry="7" fill="#fff"/><ellipse cx="64" cy="54" rx="6" ry="7" fill="#fff"/><circle cx="37" cy="55" r="3.4" fill="#14235B"/><circle cx="63" cy="55" r="3.4" fill="#14235B"/><path d="M45 66h10l-5 5z" fill="#FF6B8B"/><path d="M50 71v3q-4 4-8 1M50 74q4 4 8 1" fill="none" stroke="#14235B" stroke-width="2.2" stroke-linecap="round"/><g stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M28 68l-14-3M28 72l-14 4M72 68l14-3M72 72l14 4"/></g>' },
  { name: 'un corazón', fill: '#FF7EA8', edge: '#E0457E',
    pts: [[50, 28], [64, 12], [84, 16], [94, 38], [80, 66], [50, 92], [20, 66], [6, 38], [16, 16], [36, 12]],
    deco: '<path d="M26 28q6-8 14-6" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/><circle cx="42" cy="50" r="3.4" fill="#14235B"/><circle cx="58" cy="50" r="3.4" fill="#14235B"/><path d="M43 60q7 7 14 0" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/>' }
];
/* sube el nº de puntos subdividiendo los lados más largos */
function densify(pts, n) {
  const a = pts.map(p => p.slice());
  while (a.length < n) {
    let bi = 0, bl = -1;
    for (let i = 0; i < a.length; i++) { const p = a[i], q = a[(i + 1) % a.length], l = Math.hypot(p[0] - q[0], p[1] - q[1]); if (l > bl) { bl = l; bi = i; } }
    const p = a[bi], q = a[(bi + 1) % a.length];
    a.splice(bi + 1, 0, [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]);
  }
  return a;
}
let lastFig = -1;

Kids.css(`
.g-memoria-x7{gap:.6rem}
.g-memoria-x7 .dt{position:relative;width:min(100%,56vh,34rem);aspect-ratio:1;background:#fff;border-radius:2rem;box-shadow:0 .4rem 0 var(--line);border:.25rem solid var(--gl)}
.g-memoria-x7 .dt svg.bd{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;border-radius:1.8rem}
.g-memoria-x7 .dp{position:absolute;transform:translate(-50%,-50%);border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2',sans-serif;font-weight:800;display:flex;align-items:center;justify-content:center;line-height:1;box-shadow:0 .15rem 0 var(--gd);transition:transform .15s,background .2s;padding:0;z-index:3}
.g-memoria-x7 .dp.d1{width:2.7rem;height:2.7rem;font-size:1.5rem}
.g-memoria-x7 .dp.d2{width:2.1rem;height:2.1rem;font-size:1.15rem}
.g-memoria-x7 .dp.d3{width:1.65rem;height:1.65rem;font-size:.9rem}
.g-memoria-x7 .dp.done{background:#5CC77A;box-shadow:0 .15rem 0 #3FA25E}
.g-memoria-x7 .dp.next.glow{animation:dtp .9s infinite;background:#F2A900;box-shadow:0 0 0 .35rem rgba(255,210,63,.55)}
.g-memoria-x7 .dp.start::before{content:'';position:absolute;inset:-.35rem;border-radius:50%;border:.18rem dashed var(--gd);opacity:.7}
.g-memoria-x7 .dp.hide{display:none}
.g-memoria-x7 .dp.next{z-index:6}
@keyframes dtp{50%{transform:translate(-50%,-50%) scale(1.3)}}
.g-memoria-x7 .dt-fig{opacity:0;transition:opacity .6s}
.g-memoria-x7 .dt-fig.show{opacity:1}
.g-memoria-x7 .dt-wig{transform-origin:50% 60%;animation:dtw 1s ease-in-out 3}
@keyframes dtw{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-4deg) scale(1.03)}75%{transform:rotate(4deg) scale(1.03)}}
.g-memoria-x7 .dt-prog{font-family:'Baloo 2',sans-serif;font-size:1.2rem;background:#fff;border-radius:999px;padding:.1rem 1rem;box-shadow:var(--shadow)}
@media (max-width:640px){.g-memoria-x7 .dp.d3{width:1.35rem;height:1.35rem;font-size:.72rem}.g-memoria-x7 .dp.d2{width:1.8rem;height:1.8rem;font-size:1rem}}
`);

Kids.game({
  id: 'memoria-x7', group: 'memoria', num: 11,
  title: 'Une los puntos',
  blurb: 'Toca los puntos en orden, del 1 en adelante, y descubre el dibujo sorpresa.',
  how: 'Toca los puntos en orden: primero el uno, luego el dos, y así hasta el último. ¡Saldrá un dibujo sorpresa!',
  icon: 'star',
  levels: ['Del 1 al 10', 'Del 1 al 20', 'Del 1 al 30'],
  rounds: 2,
  stars(m) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; },
  round(g, ri) {
    let fi; do { fi = U.rnd(0, FIGS.length - 1); } while (fi === lastFig); lastFig = fi;
    const F = FIGS[fi], n = N[g.level], pts = densify(F.pts, n);
    g.ask('Toca los puntos en orden: 1, 2, 3…');
    const cls = 'd' + g.level;
    const wrap = U.el(`<div class="dt"><svg class="bd" viewBox="0 0 100 100" aria-hidden="true"><g class="dt-fig"><g><polygon points="${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" fill="${F.fill}" stroke="${F.edge}" stroke-width="4" stroke-linejoin="round"/>${F.deco}</g></g><g class="dt-lines" fill="none" stroke="${'#8C7BE0'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></g></svg></div>`);
    const prog = U.el('<div class="dt-prog"></div>');
    g.area.appendChild(wrap); g.area.appendChild(prog);
    const lines = wrap.querySelector('.dt-lines'), fig = wrap.querySelector('.dt-fig');
    const btns = pts.map((p, i) => {
      const b = U.el(`<button class="dp ${cls} ${i === 0 ? 'start' : ''}" style="left:${p[0]}%;top:${p[1]}%" aria-label="Punto ${i + 1}">${i + 1}</button>`);
      b.onclick = () => tap(i); wrap.appendChild(b); return b;
    });
    let next = 0, hinted = false;
    const showHint = () => hinted = true;
    function refresh() {
      btns.forEach((b, i) => { b.classList.toggle('next', i === next); b.classList.toggle('glow', i === next && (g.level === 1 || hinted)); });
      prog.textContent = next >= n ? '¡Completo!' : 'Punto ' + (next + 1) + ' de ' + n;
    }
    function seg(a, b) {
      const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
      l.style.strokeDasharray = 200; l.style.strokeDashoffset = 200; l.style.transition = 'stroke-dashoffset .35s';
      lines.appendChild(l); void l.getBoundingClientRect(); l.style.strokeDashoffset = 0;
    }
    function tap(i) {
      if (next >= n) return;
      if (i === next) {
        btns[i].classList.add('done'); btns[i].classList.remove('glow'); Kids.sound.tone(440 + i * 22, 0, .14, 'triangle', .12);
        if (i > 0) seg(pts[i - 1], pts[i]);
        next++;
        if (next >= n) finish(); else refresh();
      } else if (i > next) { g.shake(btns[i]); g.wrong('Busca el número ' + (next + 1)); }
    }
    function finish() {
      refresh();
      seg(pts[n - 1], pts[0]);
      g.t(() => {
        lines.style.transition = 'opacity .5s'; lines.style.opacity = 0;
        btns.forEach(b => b.classList.add('hide'));
        fig.classList.add('show'); fig.firstChild.classList.add('dt-wig');
        Kids.sound.win();
        g.say('¡Es ' + F.name + '!');
        g.t(() => g.right('¡Es ' + F.name + '!'), 900);
      }, 450);
    }
    g.helpHint = () => { showHint(); refresh(); g.toast('Mira el punto que brilla'); };
    refresh();
  }
});
})();

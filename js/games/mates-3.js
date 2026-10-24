/* Mates 3 — ¿Cuál tiene más? */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

/* cesta de mimbre (dibujo propio). color = franja decorativa */
A.add({
  'mates3-basket': (c) => {
    c = c || '#FF7E69';
    return `<svg viewBox="0 0 100 100">
<ellipse cx="50" cy="94" rx="40" ry="5" fill="#14235B" opacity=".10"/>
<path d="M10 46 L18 88 Q19 94 26 94 L74 94 Q81 94 82 88 L90 46Z" fill="#E8B26A"/>
<path d="M13 58 H87 M15 70 H85 M17 82 H83" stroke="#C98F43" stroke-width="2.4" stroke-linecap="round" fill="none"/>
<path d="M30 48 L34 92 M44 48 L45 92 M58 48 L57 92 M72 48 L68 92" stroke="#D49A50" stroke-width="2.2" stroke-linecap="round" fill="none"/>
<rect x="6" y="40" width="88" height="12" rx="6" fill="#F3C985"/>
<rect x="6" y="40" width="88" height="5" rx="2.5" fill="#fff" opacity=".35"/>
<rect x="6" y="52" width="88" height="5" fill="${c}" opacity=".0"/>
<path d="M12 64 H88" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".85"/>
</svg>`;
  }
});

const THINGS = [
  { a: 'orange', p: 'naranjas' }, { a: 'apple', p: 'manzanas' }, { a: 'star', p: 'estrellas' },
  { a: 'ball', p: 'pelotas' }, { a: 'pear', p: 'peras' }, { a: 'strawberry', p: 'fresas' },
  { a: 'banana', p: 'plátanos' }, { a: 'cherry', p: 'cerezas' }, { a: 'heart', p: 'corazones' }
];
const COLORS = ['#FF7E69', '#4C8DF6', '#8C7BE0', '#47B5BF'];
const ASPECT = 1.3; // ancho / alto de cada tarjeta
let lastThing = '';

Kids.css(`
.g-mates-3 .m3-row{display:flex;gap:1.6rem;justify-content:center;align-items:stretch;width:100%}
.g-mates-3 .m3-card{flex:1 1 0;max-width:30rem;aspect-ratio:1.3;padding:0;display:block;border-radius:2rem;cursor:pointer;background:#fff;overflow:hidden}
.g-mates-3 .m3-card.pic{padding:0}
.g-mates-3 .m3-it{position:absolute;aspect-ratio:1;transform:translate(-50%,-50%);pointer-events:none}
.g-mates-3 .m3-it svg{width:100%;height:100%;display:block}
.g-mates-3 .m3-bk{position:absolute;left:0;right:0;bottom:0;height:62%;pointer-events:none;z-index:900}
.g-mates-3 .m3-bk svg{width:100%;height:100%;max-width:none;max-height:none;display:block}
.g-mates-3 .m3-n{position:absolute;right:-6%;top:-6%;min-width:1.5rem;height:1.5rem;border-radius:999px;background:var(--g);color:#fff;border:.13rem solid #fff;font-family:'Baloo 2';font-weight:800;font-size:1rem;line-height:1.2rem;text-align:center;animation:pop .3s both}
.m3-w{display:inline-block;padding:0 .55rem;margin:0 .1rem;border-radius:.7rem;color:#fff;background:var(--g);font-weight:800}
.m3-w.less{background:#E8590C}
.g-mates-3 .m3-card.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .45rem #FFD23F}
.g-mates-3 .m3-eq{font-size:2.2rem;min-height:4.5rem;padding:.2rem 2.4rem;background:#FFF1C9}
.g-mates-3 .m3-eq.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .45rem #FFD23F}
@media (max-aspect-ratio:1/1){
  .g-mates-3 .m3-row{flex-direction:column;align-items:center;gap:.9rem}
  .g-mates-3 .m3-card{flex:none;width:min(94%,34vh)}
}
`);

function scatter(n, s, h, ymin, ymax) {
  let minD = s * 0.95;
  for (let tries = 0; tries < 40; tries++) {
    const pts = []; let ok = true;
    for (let k = 0; k < n && ok; k++) {
      let placed = false;
      for (let t = 0; t < 120; t++) {
        const x = U.rnd(Math.round(s / 2 * 10) + 40, Math.round((100 - s / 2) * 10) - 40) / 10, y = U.rnd(Math.round(ymin * 10), Math.round(ymax * 10)) / 10;
        if (pts.every(p => Math.hypot(p.x - x, p.y - y) >= minD)) { pts.push({ x, y }); placed = true; break; }
      }
      if (!placed) ok = false;
    }
    if (ok) return pts;
    minD *= 0.92;
  }
  return Array.from({ length: n }, () => ({ x: U.rnd(15, 85), y: U.rnd(ymin, ymax) }));
}

/* devuelve [x, y] cantidades según nivel */
function counts(lv, want) {
  let a, b;
  if (lv === 1) {                    // hasta 5, gran diferencia, siempre "más"
    do { a = U.rnd(1, 5); b = U.rnd(1, 5); } while (Math.abs(a - b) < 2);
  } else if (lv === 2) {             // hasta 10, diferencia >= 2
    do { a = U.rnd(1, 10); b = U.rnd(1, 10); } while (Math.abs(a - b) < 2);
  } else if (want === 'eq') {        // iguales
    a = b = U.rnd(6, 18);
  } else {                           // hasta 20, diferencia de 1 o 2
    a = U.rnd(5, 19); b = a + U.pick([-2, -1, 1, 2]); if (b > 20) b = a - 1;
  }
  return Math.random() < .5 ? [a, b] : [b, a];
}

Kids.game({
  id: 'mates-3', group: 'mates', num: 3,
  title: '¿Cuál tiene más?',
  blurb: 'Mira las dos cestas y toca la que tiene más o menos.',
  how: 'Mira las dos cestas. Toca la que tiene más, o la que tiene menos, según te pregunte.',
  icon: 'orange',
  levels: ['Hasta 5', 'Hasta 10', 'Hasta 20 y parecidos'],
  rounds: 8,
  round(g, i) {
    const lv = g.level;
    let th; do { th = U.pick(THINGS); } while (th.a === lastThing);
    lastThing = th.a;
    const wantEq = lv === 3 && Math.random() < 0.28;
    const more = lv === 1 ? true : Math.random() < 0.5;       // true: MÁS, false: MENOS
    const [na, nb] = counts(lv, wantEq ? 'eq' : 'diff');
    const nums = [na, nb];
    const target = wantEq ? -1 : (more ? (na > nb ? 0 : 1) : (na < nb ? 0 : 1));
    const colors = U.shuffle(COLORS).slice(0, 2);
    const maxN = Math.max(na, nb);
    const s = maxN <= 5 ? 24 : maxN <= 10 ? 19 : 14.5;
    const h = 100 / ASPECT;

    g.ask('¿Qué cesta tiene ' + (more ? 'más ' : 'menos ') + th.p + '?');
    const qt = g.screen.querySelector('.ask .txt');
    qt.innerHTML = '¿Qué cesta tiene <span class="m3-w ' + (more ? '' : 'less') + '">' + (more ? 'MÁS' : 'MENOS') + '</span> ' + th.p + '?';

    const row = U.el('<div class="m3-row"></div>');
    const cards = [], nodes = [[], []];
    nums.forEach((n, k) => {
      const card = U.el(`<button class="pic big m3-card" aria-label="Cesta ${k + 1}"></button>`);
      const pts = scatter(n, s, h, s * 0.5 + 3, h * 0.60 + s * 0.12);
      pts.forEach((p, j) => {
        const rot = U.rnd(-14, 14), sc = U.rnd(90, 108) / 100;
        const it = U.el(`<span class="m3-it" style="left:${p.x}%;top:${p.y / h * 100}%;width:${s * sc}%;z-index:${Math.round(p.y * 10)}"><span style="display:block;transform:rotate(${rot}deg)">${A.get(th.a)}</span></span>`);
        card.appendChild(it); nodes[k].push(it);
      });
      card.appendChild(U.el(`<span class="m3-bk">${A.get('mates3-basket', colors[k])}</span>`));
      card.onclick = () => choose(k, card);
      row.appendChild(card); cards.push(card);
    });
    g.area.appendChild(row);

    let eqBtn = null;
    if (lv === 3) {
      eqBtn = U.el('<button class="ans m3-eq">Son iguales</button>');
      eqBtn.onclick = () => choose(-1, eqBtn);
      g.area.appendChild(eqBtn);
    }

    function choose(k, el) {
      if (k === target) {
        el.classList.add('right'); cards.forEach(c => c.disabled = true); eqBtn && (eqBtn.disabled = true);
        g.right(wantEq ? '¡Sí, son iguales!' : undefined);
      } else {
        el.classList.add('bad'); el.disabled = true; g.wrong();
      }
    }

    g.helpHint = () => {
      g.toast('Vamos a contar cada cesta');
      let delay = 0;
      nodes.forEach((list, k) => {
        list.forEach((it, j) => { delay += 260; g.t(() => { it.appendChild(U.el(`<span class="m3-n">${j + 1}</span>`)); Kids.sound.tap(); }, delay); });
        delay += 500;
      });
      g.t(() => { const t = target === -1 ? eqBtn : cards[target]; if (t && !t.disabled) t.classList.add('hint'); }, delay + 200);
    };
  }
});
})();

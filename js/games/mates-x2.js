/* Mates X2 — Pares e impares */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const SOCK = ['#FF9AA2', '#FFD23F', '#8FD1F0', '#B9A6F0', '#8EDB9A', '#FFB86B'];

A.add({
  'mx2-sock': (c, n) => `<svg viewBox="0 0 100 100"><path d="M30 8h34q4 0 4 4v36q0 6 6 10l12 8q10 8 4 20-6 12-22 12H40q-18 0-20-16-1-12 10-18V12q0-4 0-4z" fill="${c || '#8FD1F0'}"/>
  <path d="M30 8h38v16H30z" fill="#fff" opacity=".8"/><path d="M30 16h38" stroke="${c || '#8FD1F0'}" stroke-width="3" opacity=".6"/>
  <path d="M20 78q0 14 20 14h22q16 0 22-12-6 6-22 6H40q-18 0-20-8z" fill="#14235B" opacity=".12"/>
  <text x="49" y="55" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="${String(n).length > 1 ? 27 : 34}" text-anchor="middle" fill="#14235B">${n}</text></svg>`,
  'mx2-drawer': (c, dots) => `<svg viewBox="0 0 100 100"><rect x="6" y="14" width="88" height="76" rx="14" fill="${c}"/><rect x="12" y="20" width="76" height="64" rx="10" fill="#fff" opacity=".35"/><rect x="38" y="64" width="24" height="8" rx="4" fill="#14235B" opacity=".55"/>${dots}</svg>`
});

Kids.css(`
.g-mates-x2 .x2-wrap{display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%;max-width:62rem}
.g-mates-x2 .x2-pile{display:flex;flex-wrap:wrap;gap:.7rem;justify-content:center;align-items:center;min-height:7.4rem;width:100%;padding:.5rem;background:rgba(255,255,255,.6);border-radius:1.6rem;border:.2rem dashed var(--line)}
.g-mates-x2 .x2-sock{width:min(6.4rem,17vw);height:min(6.4rem,17vw);padding:0;border-radius:1rem;transition:transform .15s;position:relative}
.g-mates-x2 .x2-sock svg{width:100%;height:100%;filter:drop-shadow(0 .2rem 0 rgba(20,35,91,.15))}
.g-mates-x2 .x2-sock.sel{transform:scale(1.18) rotate(-5deg);filter:drop-shadow(0 0 .35rem #FFD23F)}
.g-mates-x2 .x2-sock.hint{animation:pulse 1s infinite}
.g-mates-x2 .x2-drs{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;width:100%}
.g-mates-x2 .x2-dr{border-radius:1.8rem;padding:.6rem .8rem .8rem;display:flex;flex-direction:column;align-items:center;gap:.4rem;border:.25rem solid transparent;box-shadow:0 .4rem 0 rgba(20,35,91,.14);transition:all .15s;min-height:10rem}
.g-mates-x2 .x2-dr.par{background:#CFE6FB}.g-mates-x2 .x2-dr.imp{background:#FFD9E2}
.g-mates-x2 .x2-dr.hot{border-color:var(--yellow);transform:scale(1.03)}
.g-mates-x2 .x2-dr.hint{animation:pulse 1s infinite;border-color:var(--yellow)}
.g-mates-x2 .x2-dr b{font-family:'Baloo 2';font-size:1.8rem;line-height:1}
.g-mates-x2 .x2-dr small{font-size:.95rem;color:var(--ink2);line-height:1}
.g-mates-x2 .x2-in{display:flex;flex-wrap:wrap;gap:.1rem;justify-content:center;min-height:3rem;width:100%}
.g-mates-x2 .x2-mini{width:min(4.2rem,11vw);height:min(4.2rem,11vw);animation:pop .35s both}
.g-mates-x2 .x2-mini svg{width:100%;height:100%}
.g-mates-x2 .x2-help{background:#FFF3BF;border-radius:1rem;padding:.3rem 1rem;font-size:1.1rem;text-align:center}
.g-mates-x2 .x2-help i{font-style:normal;font-family:'Baloo 2';font-weight:800;color:#C48A12;font-size:1.3rem}
`);

function pickNums(lv) {
  const n = lv === 1 ? 6 : lv === 2 ? 7 : 8, max = lv === 1 ? 10 : lv === 2 ? 20 : 50;
  const nums = new Set();
  const pars = Math.floor(n / 2) + U.rnd(-1, 1);
  const all = U.range(max, 1), ev = all.filter(x => x % 2 === 0), od = all.filter(x => x % 2);
  U.sample(ev, pars).forEach(x => nums.add(x));
  U.sample(od, n - pars).forEach(x => nums.add(x));
  return U.shuffle([...nums]);
}

Kids.game({
  id: 'mates-x2', group: 'mates', num: 7,
  title: 'Pares e impares',
  blurb: 'Guarda cada calcetín en el cajón de los pares o de los impares.',
  how: 'Lleva cada calcetín al cajón correcto. Los pares son 2, 4, 6, 8 y 10. Los impares son 1, 3, 5, 7 y 9. Arrastra el calcetín, o tócalo y toca el cajón.',
  icon: 'shoe',
  levels: ['Del 1 al 10', 'Hasta 20', 'Hasta 50, con ayuda'],
  rounds: 4,
  round(g, i) {
    const lv = g.level, nums = pickNums(lv);
    g.ask('Pares a un lado, impares al otro');
    const wrap = U.el('<div class="x2-wrap"></div>');
    if (lv === 3) wrap.appendChild(U.el('<div class="x2-help">Los números pares terminan en <i>0 2 4 6 8</i></div>'));
    else if (lv === 2) wrap.appendChild(U.el('<div class="x2-help">Par = se puede hacer parejas sin que sobre ninguno</div>'));
    const pile = U.el('<div class="x2-pile"></div>');
    wrap.appendChild(pile);
    const drs = U.el('<div class="x2-drs"></div>');
    const mk = (cls, name, sub, color) => {
      const d = U.el(`<button class="x2-dr ${cls}" aria-label="Cajón de los ${name}"><b>${name}</b><small>${sub}</small><div class="x2-in"></div></button>`);
      drs.appendChild(d); return d;
    };
    const dp = mk('par', 'PARES', 'de dos en dos', '#8FD1F0'), di = mk('imp', 'IMPARES', 'siempre sobra uno', '#FF9AA2');
    wrap.appendChild(drs); g.area.appendChild(wrap);
    let sel = null, left = nums.length;
    const socks = nums.map((n, k) => {
      const b = U.el(`<button class="x2-sock" aria-label="Calcetín número ${n}" data-n="${n}">${A.get('mx2-sock', SOCK[k % SOCK.length], n)}</button>`);
      pile.appendChild(b); return b;
    });
    const drop = (dr, b) => {
      const n = +b.dataset.n, isPar = dr === dp;
      if ((n % 2 === 0) === isPar) {
        const m = U.el(`<span class="x2-mini">${b.innerHTML}</span>`);
        dr.querySelector('.x2-in').appendChild(m);
        b.remove(); if (sel === b) sel = null; left--; Kids.sound.pop();
        if (!left) g.right();
        return true;
      }
      g.shake(dr); g.wrong(n % 2 === 0 ? 'Ese es par: se hacen parejas sin sobrar' : 'Ese es impar: siempre sobra uno'); return false;
    };
    socks.forEach(b => {
      Kids.drag(b, {
        targets: () => [dp, di],
        onDrop(t) { b.style.transform = ''; return drop(t, b); },
        onTap() { socks.forEach(x => x.classList.remove('sel')); sel = b; b.classList.add('sel'); }
      });
      b.addEventListener('click', e => { if (e.detail === 0) { socks.forEach(x => x.classList.remove('sel')); sel = b; b.classList.add('sel'); } });
    });
    [dp, di].forEach(d => d.addEventListener('click', () => { if (sel && sel.isConnected) { const s = sel; s.classList.remove('sel'); drop(d, s); } else g.toast('Primero toca un calcetín'); }));
    g.helpHint = () => {
      g.toast('Mira el último número: 0, 2, 4, 6 u 8 es par');
      socks.forEach(s => { if (s.isConnected) s.querySelector('text').setAttribute('fill', +s.dataset.n % 2 ? '#D6336C' : '#1971C2'); });
      dp.classList.add('hint'); di.classList.add('hint');
    };
  }
});
})();

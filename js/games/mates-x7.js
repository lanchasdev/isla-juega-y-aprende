/* Mates x7 — Dobles y mitades (repartir galletas) */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

A.add({
  'mx7-cookie': '<svg viewBox="0 0 100 100"><ellipse cx="52" cy="90" rx="34" ry="6" fill="rgba(20,35,91,.12)"/><circle cx="50" cy="48" r="38" fill="#E5A85C"/><circle cx="50" cy="45" r="38" fill="#F2BE72"/><circle cx="50" cy="45" r="38" fill="none" stroke="#D9964A" stroke-width="3"/><g fill="#7A4A2B"><ellipse cx="34" cy="34" rx="6" ry="5"/><ellipse cx="62" cy="30" rx="5" ry="6"/><ellipse cx="68" cy="56" rx="6" ry="5"/><ellipse cx="40" cy="60" rx="5" ry="6"/><ellipse cx="52" cy="46" rx="4" ry="4"/></g></svg>',
  'mx7-plate': '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="74" rx="46" ry="16" fill="rgba(20,35,91,.12)"/><ellipse cx="50" cy="62" rx="46" ry="20" fill="#fff" stroke="#CFD8EE" stroke-width="3"/><ellipse cx="50" cy="62" rx="32" ry="12" fill="#EEF3FF" stroke="#DCE4F7" stroke-width="2"/></svg>'
});

const FRIENDS = [['bear', 'el oso'], ['rabbit', 'el conejo'], ['dog', 'el perro'], ['cat', 'el gato'], ['mouse', 'el ratón'], ['pig', 'el cerdito'], ['monkey', 'el mono'], ['fox', 'el zorro'], ['duck', 'el patito'], ['sheep', 'la oveja']];

Kids.css(`
.g-mates-x7 .x7-top{display:flex;gap:min(5vw,3rem);justify-content:center;align-items:flex-end;width:100%}
.g-mates-x7 .x7-fr{display:flex;flex-direction:column;align-items:center;gap:0;position:relative}
.g-mates-x7 .x7-an{width:min(8rem,22vw);height:min(8rem,22vw);margin-bottom:-.6rem;z-index:1}
.g-mates-x7 .x7-an svg{width:100%;height:100%}
.g-mates-x7 .x7-plate{position:relative;width:min(17rem,40vw);min-height:min(8rem,22vw);padding:.2rem;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0;border-radius:50%;background:radial-gradient(ellipse at 50% 55%,#fff 0 58%,#E6EDFB 60% 68%,#fff 70%);border:.2rem solid #CFD8EE;box-shadow:0 .4rem 0 #CFD8EE;transition:transform .15s}
.g-mates-x7 .x7-plate.hot{transform:scale(1.05);box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 #CFD8EE}
.g-mates-x7 .x7-plate.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 #CFD8EE}
.g-mates-x7 .x7-nm{font-family:'Baloo 2';font-size:1.1rem;line-height:1;margin-top:.3rem;color:var(--ink2)}
.g-mates-x7 .x7-cnt{position:absolute;right:.1rem;top:62%;min-width:2rem;height:2rem;border-radius:999px;background:var(--g);color:#fff;font-family:'Baloo 2';font-size:1.3rem;display:flex;align-items:center;justify-content:center;border:.15rem solid #fff;z-index:2}
.g-mates-x7 .x7-ck{width:var(--cs,3.6rem);height:var(--cs,3.6rem);flex:none;background:none;padding:0;display:block;border-radius:50%;position:relative}
.g-mates-x7 .x7-ck svg{width:100%;height:100%;pointer-events:none}
.g-mates-x7 .x7-ck.sel{box-shadow:0 0 0 .25rem var(--yellow);background:#FFF3BF}
.g-mates-x7 .x7-tray{min-height:5rem;width:min(40rem,96%);background:#fff;border-radius:1.6rem;padding:.5rem .8rem;box-shadow:0 .4rem 0 var(--line);border:.2rem dashed var(--line);display:flex;flex-wrap:wrap;gap:.1rem .3rem;justify-content:center;align-content:center;align-items:center}
.g-mates-x7 .x7-tray:empty::after{content:'¡Ya no quedan galletas!';font-family:'Baloo 2';color:var(--ink2);font-size:1.2rem}
.g-mates-x7 .x7-row{display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-mates-x7 .x7-no{font-family:'Baloo 2';font-size:1.7rem;padding:.4rem 1.6rem;border-radius:999px;background:var(--a4);box-shadow:0 .3rem 0 #EDA9BA;min-height:3.4rem}
.g-mates-x7 .x7-no.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .3rem var(--yellow),0 .3rem 0 #EDA9BA}
.g-mates-x7 .x7-no.bad{animation:shake .4s}
.g-mates-x7 .x7-no.right{background:#BDEFC8;box-shadow:0 .3rem 0 #5CC77A}
.g-mates-x7 .x7-dbl{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap}
.g-mates-x7 .x7-bag{background:#fff;border-radius:1.6rem;padding:.6rem;border:.2rem solid var(--line);box-shadow:0 .4rem 0 var(--line);display:flex;flex-wrap:wrap;justify-content:center;gap:.1rem;min-width:6rem;max-width:min(22rem,42vw)}
.g-mates-x7 .x7-bag .x7-ck{--cs:3rem;pointer-events:none}
.g-mates-x7 .x7-big{font-family:'Baloo 2';font-weight:800;font-size:3.4rem;line-height:1;background:#fff;border-radius:1.8rem;padding:.3rem 1.4rem;box-shadow:0 .4rem 0 var(--line)}
.g-mates-x7 .x7-big b{color:var(--gd)}
.g-mates-x7 .x7-sym{font-family:'Baloo 2';font-weight:800;font-size:2.6rem}
@media (max-width:640px){.g-mates-x7 .x7-big{font-size:2.4rem}.g-mates-x7 .x7-bag .x7-ck{--cs:2.3rem}}
`);

function choices(c, max) {
  const pool = [];
  for (let d = -3; d <= 3; d++) { const v = c + d; if (d && v >= 1 && v <= max) pool.push(v); }
  return U.shuffle([c].concat(U.sample(pool, 3)));
}

let lastKind = '';

Kids.game({
  id: 'mates-x7', group: 'mates', num: 12,
  title: 'Dobles y mitades',
  blurb: 'Reparte galletas a partes iguales y calcula dobles.',
  how: 'Reparte las galletas entre los dos amigos para que tengan las mismas. También resuelve dobles y mitades.',
  icon: 'mx7-cookie',
  levels: ['Repartir 2, 4 o 6', 'Hasta 12 y dobles', 'Mitades, dobles y números impares'],
  rounds: 8,
  round(g, i) {
    const lv = g.level;
    let kind;
    if (lv === 1) kind = 'share';
    else if (lv === 2) kind = i % 2 === 0 ? 'share' : 'double';
    else kind = ['share', 'double', 'half', 'share', 'double', 'half', 'share', 'half'][i % 8] ;
    if (kind === 'share') shareRound(g); else numRound(g, kind);
  }
});

function shareRound(g) {
  const lv = g.level;
  let n;
  if (lv === 1) n = U.pick([2, 4, 6]);
  else if (lv === 2) n = U.pick([4, 6, 8, 10, 12, 6, 8]);
  else n = U.rnd(3, 20);
  const odd = n % 2 === 1;
  const [f1, f2] = U.sample(FRIENDS, 2);
  g.ask(odd || lv === 3 ? 'Reparte las ' + n + ' galletas entre ' + f1[1] + ' y ' + f2[1] + '. Si no se puede igual, toca «No se puede».' : 'Reparte las ' + n + ' galletas a partes iguales entre ' + f1[1] + ' y ' + f2[1] + '.');
  const top = U.el('<div class="x7-top"></div>');
  const plates = [f1, f2].map(f => {
    const w = U.el(`<div class="x7-fr"><div class="x7-an">${A.get(f[0])}</div><button class="x7-plate" aria-label="Plato de ${f[1]}"></button><div class="x7-nm">${f[1].replace(/^./, c => c.toUpperCase())}</div><span class="x7-cnt" style="display:none">0</span></div>`);
    top.appendChild(w); return w;
  });
  const plateEls = plates.map(w => w.querySelector('.x7-plate'));
  const cnts = plates.map(w => w.querySelector('.x7-cnt'));
  const tray = U.el('<div class="x7-tray" aria-label="Galletas por repartir"></div>');
  const cs = n > 14 ? '2.9rem' : n > 8 ? '3.3rem' : '3.9rem';
  top.style.setProperty('--cs', cs); tray.style.setProperty('--cs', cs);
  g.area.appendChild(top); g.area.appendChild(tray);
  let sel = null, done = false;
  const cookies = [];
  const update = () => {
    plateEls.forEach((p, k) => { const c = p.querySelectorAll('.x7-ck').length; cnts[k].textContent = c; cnts[k].style.display = c ? 'flex' : 'none'; });
  };
  const select = c => { if (sel) sel.classList.remove('sel'); sel = (sel === c) ? null : c; if (sel) sel.classList.add('sel'); };
  const check = () => {
    if (done || tray.children.length) return;
    const a = plateEls[0].querySelectorAll('.x7-ck').length, b = plateEls[1].querySelectorAll('.x7-ck').length;
    if (a === b) { done = true; plateEls.forEach(p => p.classList.remove('hint')); if (noBtn) noBtn.disabled = true; g.right(a + ' y ' + b + ': ¡iguales!'); }
    else if ((a + b) % 2 === 0) g.wrong('Uno tiene más. Toca una galleta del plato para devolverla.');
    else g.wrong('Con ' + n + ' galletas no sale igual… ¿probamos «No se puede»?');
  };
  const moveTo = (c, target) => {
    if (done) return;
    target.appendChild(c); c.classList.remove('sel'); if (sel === c) sel = null; Kids.sound.pop(); update(); check();
  };
  for (let k = 0; k < n; k++) {
    const c = U.el(`<button class="x7-ck" aria-label="Galleta">${A.get('mx7-cookie')}</button>`);
    cookies.push(c); tray.appendChild(c);
    Kids.drag(c, {
      targets: () => plateEls,
      onDrop: (t, el) => { if (done) return false; moveTo(el, t); return true; },
      onTap: el => {
        if (done) return;
        if (el.parentNode !== tray) { moveTo(el, tray); return; }
        select(el);
      }
    });
  }
  plateEls.forEach(p => p.onclick = () => {
    if (done) return;
    const c = sel || tray.querySelector('.x7-ck');
    if (c && c.parentNode === tray) moveTo(c, p);
  });
  let noBtn = null;
  if (lv === 3) {
    noBtn = U.el('<button class="x7-no" aria-label="No se puede repartir igual">No se puede</button>');
    noBtn.onclick = () => {
      if (done) return;
      if (odd) { done = true; noBtn.classList.add('right'); g.right('¡Sí! ' + n + ' es impar: sobra una'); }
      else { noBtn.classList.add('bad'); g.shake(noBtn); g.wrong('¡Sí se puede! Prueba a repartir de una en una.'); }
    };
    const row = U.el('<div class="x7-row"></div>'); row.appendChild(noBtn); g.area.appendChild(row);
  }
  g.helpHint = () => {
    if (odd && noBtn) { g.toast('Reparte de una en una: ¿sobra alguna?'); noBtn.classList.add('hint'); return; }
    g.toast('Da una galleta a cada uno, y otra a cada uno…');
    plateEls.forEach(p => p.classList.add('hint')); g.t(() => plateEls.forEach(p => p.classList.remove('hint')), 3000);
  };
}

function cookiesHtml(k) { return U.range(k).map(() => `<span class="x7-ck">${A.get('mx7-cookie')}</span>`).join(''); }

function numRound(g, kind) {
  const lv = g.level;
  let x, ans, q, ask, vis;
  if (kind === 'double') {
    x = lv === 2 ? U.rnd(1, 10) : U.rnd(2, 10);
    ans = 2 * x; ask = 'El doble de ' + x + ', ¿cuánto es?';
    q = `<div class="x7-big">El doble de <b>${x}</b> es …</div>`;
    vis = `<div class="x7-dbl"><div class="x7-bag">${cookiesHtml(x)}</div><span class="x7-sym">+</span><div class="x7-bag">${cookiesHtml(x)}</div></div>`;
  } else {
    x = U.pick([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
    ans = x / 2; ask = 'La mitad de ' + x + ', ¿cuánto es?';
    q = `<div class="x7-big">La mitad de <b>${x}</b> es …</div>`;
    vis = `<div class="x7-dbl"><div class="x7-bag">${cookiesHtml(x)}</div></div>`;
  }
  g.ask(ask);
  g.area.appendChild(U.el(q));
  const visEl = U.el(vis);
  g.area.appendChild(visEl);
  const opts = U.el('<div class="opts"></div>');
  const btns = choices(ans, kind === 'double' ? 20 : 10).map(v => {
    const b = U.el(`<button class="ans">${v}</button>`);
    b.onclick = () => {
      if (v === ans) { btns.forEach(z => z.disabled = true); b.classList.add('right'); g.right(); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
    };
    opts.appendChild(b); return b;
  });
  g.area.appendChild(opts);
  g.helpHint = () => {
    g.toast(kind === 'double' ? 'El doble es juntar dos iguales. ¡Cuenta todas!' : 'La mitad: repártelas en dos montones iguales');
    const cks = [...visEl.querySelectorAll('.x7-ck')];
    cks.forEach((c, k) => g.t(() => { c.style.outline = '.2rem solid var(--yellow)'; c.style.borderRadius = '50%'; Kids.sound.pop(); if (kind === 'half') c.style.opacity = k < cks.length / 2 ? 1 : .35; }, 220 * (k + 1)));
    g.t(() => btns.forEach(b => { if (+b.textContent === ans && !b.disabled) b.classList.add('pulse'); }), 220 * (cks.length + 1));
  };
}
})();

/* mundo-x12 — Reciclaje */
(function () {
'use strict';
const U = Kids.util;
const SH = '<ellipse cx="50" cy="92" rx="30" ry="4.5" fill="#14235B" opacity=".1"/>';
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';

Kids.art.add({
  'wx12-pbottle': V(`${SH}<path d="M42 14h16v10l9 12v46q0 8 -8 8H41q-8 0 -8 -8V36l9 -12z" fill="#CBEFFB" stroke="#6CB8E0" stroke-width="3" stroke-linejoin="round"/><rect x="41" y="6" width="18" height="10" rx="3" fill="#4C8DF6"/><rect x="34" y="48" width="32" height="20" fill="#fff"/><path d="M40 55h20M40 62h12" stroke="#4C8DF6" stroke-width="3" stroke-linecap="round"/><path d="M39 36v36" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`),
  'wx12-can': V(`${SH}<rect x="28" y="20" width="44" height="68" rx="8" fill="#E1E6EE" stroke="#9AA7BD" stroke-width="3"/><rect x="28" y="40" width="44" height="30" fill="#FF7E69"/><path d="M36 55h28" stroke="#fff" stroke-width="4" stroke-linecap="round"/><ellipse cx="50" cy="20" rx="22" ry="6" fill="#F3F6FA" stroke="#9AA7BD" stroke-width="3"/><ellipse cx="50" cy="19" rx="7" ry="2.4" fill="#9AA7BD"/><path d="M35 26v58" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`),
  'wx12-brik': V(`${SH}<path d="M30 28 L50 16 L70 28 V86 Q70 90 66 90 H34 Q30 90 30 86Z" fill="#fff" stroke="#9CB5E8" stroke-width="3" stroke-linejoin="round"/><path d="M30 28 L50 38 L70 28" fill="none" stroke="#9CB5E8" stroke-width="3" stroke-linejoin="round"/><rect x="30" y="52" width="40" height="26" fill="#FFB347"/><circle cx="50" cy="65" r="9" fill="#FF8F3A"/><path d="M50 56 q4 -4 7 -2" stroke="#4DBD6E" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M62 24 L68 6 H78" stroke="#FF7EA8" stroke-width="3.4" fill="none" stroke-linecap="round"/>`),
  'wx12-news': V(`${SH}<rect x="14" y="20" width="72" height="66" rx="5" fill="#F4F0E4" stroke="#C9BFA3" stroke-width="3"/><path d="M50 20v66" stroke="#C9BFA3" stroke-width="2"/><rect x="20" y="27" width="24" height="12" rx="2" fill="#8C8C9E"/><g stroke="#B5AD94" stroke-width="3" stroke-linecap="round"><path d="M20 47h24M20 54h24M20 61h24M20 68h18M56 30h24M56 38h24M56 52h24M56 59h24M56 66h24"/></g><rect x="56" y="42" width="24" height="6" fill="#B5AD94" opacity=".6"/>`),
  'wx12-box': V(`${SH}<path d="M16 38 L50 24 L84 38 V78 L50 92 L16 78Z" fill="#D9A566" stroke="#B07C3E" stroke-width="3" stroke-linejoin="round"/><path d="M16 38 L50 52 L84 38 M50 52 V92" fill="none" stroke="#B07C3E" stroke-width="3" stroke-linejoin="round"/><path d="M38 31 L72 45 V56 L38 42Z" fill="#F0DDB4" opacity=".9"/>`),
  'wx12-gbottle': V(`${SH}<path d="M43 8h14v28q14 10 14 24v24q0 6 -6 6H35q-6 0 -6 -6V60q0 -14 14 -24z" fill="#7ED9A0" stroke="#3FA66A" stroke-width="3" stroke-linejoin="round"/><rect x="42" y="6" width="16" height="7" rx="2" fill="#3FA66A"/><rect x="31" y="58" width="38" height="20" fill="#E9FBEF"/><path d="M38 66h24" stroke="#3FA66A" stroke-width="3" stroke-linecap="round"/><path d="M37 44v30" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`),
  'wx12-jar': V(`${SH}<path d="M30 26h40v6q8 6 8 16v34q0 8 -8 8H30q-8 0 -8 -8V48q0 -10 8 -16z" fill="#E4F7F1" stroke="#5FB9A0" stroke-width="3" stroke-linejoin="round"/><rect x="30" y="22" width="40" height="8" rx="3" fill="none" stroke="#5FB9A0" stroke-width="3"/><rect x="26" y="52" width="48" height="22" fill="#fff" opacity=".9"/><path d="M34 63h32" stroke="#5FB9A0" stroke-width="3" stroke-linecap="round"/><path d="M31 44v36" stroke="#fff" stroke-width="3" opacity=".8" stroke-linecap="round"/>`),
  'wx12-lid': V(`<ellipse cx="50" cy="84" rx="32" ry="4.5" fill="#14235B" opacity=".1"/><ellipse cx="50" cy="56" rx="32" ry="15" fill="#C9A63B" stroke="#9A7C1E" stroke-width="3"/><path d="M18 56v8q0 15 32 15t32 -15v-8" fill="#E0BE4F" stroke="#9A7C1E" stroke-width="3"/><ellipse cx="50" cy="54" rx="22" ry="9" fill="#F3D874"/><g stroke="#9A7C1E" stroke-width="2"><path d="M26 62v9M36 66v9M46 68v9M56 68v9M66 66v9M74 62v9"/></g>`),
  'wx12-bag': V(`${SH}<path d="M34 28 q-4 -18 8 -18 M66 28 q4 -18 -8 -18" fill="none" stroke="#9CB5E8" stroke-width="3.4" stroke-linecap="round"/><path d="M26 30h48l6 52q1 8 -7 8H27q-8 0 -7 -8z" fill="#E6EEFF" stroke="#9CB5E8" stroke-width="3" stroke-linejoin="round"/><path d="M36 42l-3 38M62 40l3 40" stroke="#fff" stroke-width="3" opacity=".8" stroke-linecap="round"/><circle cx="50" cy="62" r="9" fill="#FFB3C7"/><path d="M45 62h10M50 57v10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),
  'wx12-tub': V(`${SH}<path d="M24 36h52l-6 50q-1 5 -6 5H36q-5 0 -6 -5z" fill="#FFE0EC" stroke="#FF8FB1" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="36" rx="26" ry="7" fill="#E1E6EE" stroke="#9AA7BD" stroke-width="3"/><circle cx="50" cy="62" r="11" fill="#fff"/><circle cx="46" cy="60" r="3" fill="#FF4F81"/><circle cx="54" cy="64" r="3" fill="#FF4F81"/>`),
  'wx12-egg': V(`${SH}<path d="M12 46 L22 30 H78 L88 46 V70 Q88 76 82 76 H18 Q12 76 12 70Z" fill="#C9C0B1" stroke="#A39980" stroke-width="3" stroke-linejoin="round"/><g fill="#B3AA97" stroke="#A39980" stroke-width="2"><ellipse cx="26" cy="46" rx="9" ry="10"/><ellipse cx="50" cy="46" rx="9" ry="10"/><ellipse cx="74" cy="46" rx="9" ry="10"/><ellipse cx="26" cy="64" rx="9" ry="8"/><ellipse cx="50" cy="64" rx="9" ry="8"/><ellipse cx="74" cy="64" rx="9" ry="8"/></g>`),
  'wx12-peel': V(`${SH}<path d="M50 22 Q38 30 30 52 Q26 66 36 78 Q50 70 50 44z" fill="#FFD23F" stroke="#E0A800" stroke-width="3" stroke-linejoin="round"/><path d="M50 22 Q62 30 70 52 Q74 66 64 78 Q50 70 50 44z" fill="#FFE066" stroke="#E0A800" stroke-width="3" stroke-linejoin="round"/><path d="M50 22 L50 14" stroke="#8B6A55" stroke-width="5" stroke-linecap="round"/><path d="M34 70q-6 6 -2 12q8 -2 10 -8M66 70q6 6 2 12q-8 -2 -10 -8" fill="#C9A63B" opacity=".9"/><circle cx="40" cy="56" r="1.8" fill="#B88A1E"/><circle cx="60" cy="52" r="1.8" fill="#B88A1E"/>`),
  'wx12-core': V(`${SH}<path d="M50 14 Q26 12 24 40 Q22 60 36 72 Q42 68 42 50 Q52 44 58 50 Q58 68 64 72 Q78 60 76 40 Q74 12 50 14z" fill="#FF7E69" stroke="#E0503C" stroke-width="3" stroke-linejoin="round"/><path d="M38 38 Q50 30 62 38 Q60 56 50 64 Q40 56 38 38z" fill="#FFF3D1"/><path d="M40 70 Q50 86 60 70" fill="#FFF3D1" stroke="#E0503C" stroke-width="3" stroke-linejoin="round"/><circle cx="46" cy="48" r="2.4" fill="#6B4A3A"/><circle cx="55" cy="46" r="2.4" fill="#6B4A3A"/><path d="M50 14 L52 6" stroke="#8B5E3C" stroke-width="3" stroke-linecap="round"/>`)
});

/* contenedores (España): amarillo envases, azul papel y cartón, verde vidrio, marrón orgánico */
const BINS = {
  amarillo: { n: 'Envases',        col: 'Amarillo', c: '#F6C327', d: '#D49B0E', l: '#FFE27A' },
  azul:     { n: 'Papel y cartón', col: 'Azul',     c: '#3F8CE8', d: '#2468BE', l: '#8FBFF5' },
  verde:    { n: 'Vidrio',         col: 'Verde',    c: '#4DBD6E', d: '#2F9450', l: '#97E0AC' },
  marron:   { n: 'Orgánico',       col: 'Marrón',   c: '#A87449', d: '#7F5330', l: '#D0A57F' }
};
const SYM = {
  amarillo: '<path d="M46 62h8v6l4 5v14q0 3 -3 3h-10q-3 0 -3 -3V73l4 -5z" fill="#fff"/>',
  azul: '<rect x="41" y="62" width="18" height="24" rx="2" fill="#fff"/><path d="M45 69h10M45 74h10M45 79h6" stroke="#3F8CE8" stroke-width="2" stroke-linecap="round"/>',
  verde: '<path d="M46 62h8v8q6 4 6 10v6q0 3 -3 3H43q-3 0 -3 -3v-6q0 -6 6 -10z" fill="#fff"/>',
  marron: '<path d="M50 66 q-9 -2 -9 8 q0 12 9 12 q9 0 9 -12 q0 -10 -9 -8z" fill="#fff"/><path d="M50 66 q2 -6 8 -6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>'
};
const binSvg = (k) => { const b = BINS[k]; return `<svg viewBox="0 0 100 120" aria-hidden="true"><ellipse cx="50" cy="114" rx="38" ry="5" fill="#14235B" opacity=".12"/><path d="M18 40 L23 106 Q24 112 30 112 H70 Q76 112 77 106 L82 40Z" fill="${b.c}"/><path d="M18 40 L21 70 H79 L82 40Z" fill="${b.l}" opacity=".35"/><path d="M23 106 Q24 112 30 112 H70 Q76 112 77 106 L78 96 H22Z" fill="${b.d}" opacity=".35"/><circle cx="50" cy="76" r="20" fill="${b.d}" opacity=".55"/>${SYM[k]}<circle cx="28" cy="114" r="5" fill="#4B5A8A"/><circle cx="72" cy="114" r="5" fill="#4B5A8A"/><g class="lid"><rect x="11" y="26" width="78" height="17" rx="7" fill="${b.d}"/><rect x="40" y="19" width="20" height="9" rx="4.5" fill="${b.d}"/><rect x="14" y="29" width="72" height="4" rx="2" fill="#fff" opacity=".25"/></g></svg>`; };

const IT = {
  pbottle: { art: 'wx12-pbottle', n: 'la botella de plástico', bin: 'amarillo' },
  can:     { art: 'wx12-can',     n: 'la lata', bin: 'amarillo' },
  brik:    { art: 'wx12-brik',    n: 'el brik', bin: 'amarillo', tip: 'El brik es un envase: va al amarillo.' },
  bag:     { art: 'wx12-bag',     n: 'la bolsa de plástico', bin: 'amarillo', tip: 'Las bolsas de plástico son envases: van al amarillo.' },
  tub:     { art: 'wx12-tub',     n: 'la tarrina de yogur', bin: 'amarillo', tip: 'La tarrina es de plástico: va al amarillo.' },
  lid:     { art: 'wx12-lid',     n: 'la tapa de metal', bin: 'amarillo', tip: 'La tapa de metal es un envase: va al amarillo, no con el vidrio.' },
  news:    { art: 'wx12-news',    n: 'el periódico', bin: 'azul' },
  box:     { art: 'wx12-box',     n: 'la caja de cartón', bin: 'azul' },
  book:    { art: 'book',         n: 'el libro viejo', bin: 'azul' },
  egg:     { art: 'wx12-egg',     n: 'la caja de huevos', bin: 'azul', tip: 'La caja de huevos es de cartón: va al azul.' },
  gbottle: { art: 'wx12-gbottle', n: 'la botella de cristal', bin: 'verde' },
  jar:     { art: 'wx12-jar',     n: 'el tarro de cristal', bin: 'verde', tip: 'El tarro es de vidrio: va al verde (sin la tapa).' },
  peel:    { art: 'wx12-peel',    n: 'la cáscara de plátano', bin: 'marron' },
  core:    { art: 'wx12-core',    n: 'el corazón de la manzana', bin: 'marron' }
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const OF = b => Object.keys(IT).filter(k => IT[k].bin === b);
const L1 = { amarillo: ['pbottle', 'can'], azul: ['news', 'box', 'book'], verde: ['gbottle', 'jar'] };
const L2 = { amarillo: ['pbottle', 'can', 'brik'], azul: ['news', 'box', 'book'], verde: ['gbottle', 'jar'], marron: ['peel', 'core'] };
const TRICKY = ['brik', 'lid', 'bag', 'tub', 'egg', 'jar'];
const QS = [
  { q: '¿Qué contenedor es para el papel?', b: 'azul', say: 'El papel y el cartón van al contenedor azul' },
  { q: '¿Qué contenedor es para el vidrio?', b: 'verde', say: 'El vidrio va al contenedor verde' },
  { q: '¿Qué contenedor es para los envases de plástico y las latas?', b: 'amarillo', say: 'Los envases van al contenedor amarillo' },
  { q: '¿Qué contenedor es para las cáscaras de fruta?', b: 'marron', say: 'Los restos de comida van al contenedor marrón' }
];

function pickItems(map, total) {
  const bins = Object.keys(map), first = bins.map(b => U.pick(map[b]));
  const rest = U.shuffle([].concat(...bins.map(b => map[b])).filter(k => first.indexOf(k) < 0));
  return U.shuffle(first.concat(rest.slice(0, Math.max(0, total - first.length))));
}

Kids.css(`
.g-mundo-x12{--sz:clamp(4.4rem,12vmin,6.4rem)}
.g-mundo-x12 .wx12-bins{display:flex;gap:clamp(.4rem,1.6vw,1.2rem);justify-content:center;align-items:flex-end;width:100%;max-width:62rem;flex:0 1 auto;min-height:0}
.g-mundo-x12 .wx12-bin{flex:1 1 0;max-width:14rem;min-width:0;display:flex;flex-direction:column;align-items:center;gap:.2rem;padding:.3rem .2rem .4rem;border-radius:1.6rem;background:rgba(255,255,255,.55);border:.2rem solid transparent;transition:transform .15s,background .15s;cursor:pointer;position:relative}
.g-mundo-x12 .wx12-bin svg{width:100%;height:auto;max-height:26vh;overflow:visible;display:block}
.g-mundo-x12 .wx12-bin .lid{transform-origin:12px 34px;transition:transform .25s}
.g-mundo-x12 .wx12-bin.open .lid{transform:rotate(-32deg)}
.g-mundo-x12 .wx12-bin.hot{transform:scale(1.05);background:#FFF3BF;border-color:var(--yellow)}
.g-mundo-x12 .wx12-bin.hint{animation:pulse .7s 6}
.g-mundo-x12 .wx12-bin.gulp{animation:pop .45s}
.g-mundo-x12 .wx12-bin .nm{font-family:'Baloo 2';font-weight:800;font-size:1.25rem;line-height:1;text-align:center}
.g-mundo-x12 .wx12-bin .cl{font-family:'Baloo 2';font-weight:700;font-size:.95rem;line-height:1;color:var(--ink2);text-align:center}
.g-mundo-x12 .wx12-bin .cnt{position:absolute;right:.3rem;top:.2rem;min-width:1.7rem;height:1.7rem;border-radius:999px;background:#fff;box-shadow:0 .15rem 0 var(--line);font-family:'Baloo 2';font-weight:800;font-size:1rem;display:none;align-items:center;justify-content:center;z-index:2}
.g-mundo-x12 .wx12-bin.has .cnt{display:flex}
.g-mundo-x12 .wx12-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem;min-height:calc(var(--sz) + 1.4rem);flex:none;position:relative;z-index:5}
.g-mundo-x12 .wx12-it{width:var(--sz);height:var(--sz);background:#fff;border-radius:1.2rem;padding:.3rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);position:relative}
.g-mundo-x12 .wx12-it svg{width:100%;height:100%;display:block;pointer-events:none}
.g-mundo-x12 .wx12-it.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x12 .wx12-it.hint{animation:bounce .6s 5}
.g-mundo-x12 .wx12-it.focus{border-color:var(--g)}
.g-mundo-x12 .wx12-it.in{animation:wx12-in .35s forwards}
@keyframes wx12-in{to{transform:translateY(-4rem) scale(.1) rotate(40deg);opacity:0}}
.g-mundo-x12 .wx12-q{display:flex;gap:clamp(.4rem,1.6vw,1.2rem);justify-content:center;width:100%;max-width:62rem}
@media (max-width:640px){.g-mundo-x12 .wx12-bin .nm{font-size:.95rem}.g-mundo-x12 .wx12-bin .cl{font-size:.8rem}}
`);

function binEl(k, aria) {
  return U.el(`<div class="wx12-bin" role="button" tabindex="0" data-b="${k}" aria-label="${aria || ('Contenedor ' + BINS[k].col.toLowerCase() + ': ' + BINS[k].n)}">${binSvg(k)}<span class="cnt">0</span><span class="nm">${BINS[k].n}</span><span class="cl">${BINS[k].col}</span></div>`);
}

Kids.game({
  id: 'mundo-x12', group: 'mundo', num: 15,
  title: 'Reciclaje',
  blurb: 'Lleva cada residuo a su contenedor: amarillo, azul, verde o marrón.',
  how: 'Arrastra cada residuo al contenedor correcto. El amarillo es para envases, el azul para papel y cartón, el verde para vidrio y el marrón para restos de comida. También puedes tocar el residuo y luego tocar el contenedor.',
  icon: 'leaf',
  levels: ['3 contenedores', '4 contenedores', 'Residuos difíciles'],
  rounds: 3,
  round(g, i) {
    if (g.level === 3 && i === 1) return question(g);
    let bins, list;
    if (g.level === 1) { bins = ['amarillo', 'azul', 'verde']; list = pickItems(L1, 5); }
    else if (g.level === 2) { bins = ['amarillo', 'azul', 'verde', 'marron']; list = pickItems(L2, i === 0 ? 8 : 6); }
    else {
      bins = ['amarillo', 'azul', 'verde', 'marron'];
      const tr = U.sample(TRICKY, 4), others = U.shuffle(['peel', 'core', 'news', 'box', 'pbottle', 'can', 'gbottle']).slice(0, 2);
      list = U.shuffle(tr.concat(others));
    }
    sortRound(g, bins, list);
  }
});

function sortRound(g, bins, list) {
  const row = U.el('<div class="wx12-bins"></div>');
  bins.forEach(k => row.appendChild(binEl(k)));
  const tray = U.el('<div class="wx12-tray"></div>');
  g.area.appendChild(row); g.area.appendChild(tray);
  let remaining = list.length, selected = null, focus = null, lastTried = null;
  const binOf = k => row.querySelector(`[data-b="${k}"]`);
  const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };
  function nextFocus() {
    if (focus) focus.classList.remove('focus');
    focus = tray.querySelector('.wx12-it');
    if (focus) { focus.classList.add('focus'); g.ask('¿Dónde va ' + IT[focus.dataset.a].n + '?'); }
  }
  function attempt(it, be) {
    const a = it.dataset.a, b = be.dataset.b; lastTried = it;
    if (IT[a].bin === b) {
      clearSel(); it.dataset.locked = '1'; Kids.sound.pop();
      be.classList.add('open', 'has', 'gulp');
      const c = be.querySelector('.cnt'); c.textContent = (+c.textContent) + 1;
      it.classList.add('in');
      g.t(() => { it.remove(); be.classList.remove('open', 'gulp'); }, 420);
      remaining--;
      if (g.level === 3 && IT[a].tip) g.toast(IT[a].tip);
      if (remaining === 0) { g.say('¡Todo reciclado!'); g.t(() => g.right('¡Todo reciclado! Gracias por cuidar el planeta'), 600); }
      else { if (it === focus) focus = null; g.t(nextFocus, 450); }
      return true;
    }
    g.shake(it);
    g.wrong('Mmm, ' + IT[a].n + ' no va en el contenedor ' + BINS[b].col.toLowerCase() + '. ¡Prueba otra vez!');
    return false;
  }
  g.helpHint = () => {
    const it = (lastTried && lastTried.isConnected) ? lastTried : tray.querySelector('.wx12-it'); if (!it) return;
    const b = IT[it.dataset.a].bin, be = binOf(b);
    it.classList.add('hint'); be.classList.add('hint');
    g.t(() => { it.classList.remove('hint'); be.classList.remove('hint'); }, 3800);
    g.toast('Pista: ' + cap(IT[it.dataset.a].n) + ' va al contenedor ' + BINS[b].col.toLowerCase() + ' (' + BINS[b].n.toLowerCase() + ')');
  };
  list.forEach(a => {
    const it = U.el(`<button class="wx12-it" data-a="${a}" aria-label="${cap(IT[a].n)}">${Kids.art.get(IT[a].art)}</button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(row.children),
      onStart: el => { clearSel(); if (focus !== el) { if (focus) focus.classList.remove('focus'); focus = el; el.classList.add('focus'); g.ask('¿Dónde va ' + IT[el.dataset.a].n + '?'); } },
      onDrop: (be, el) => attempt(el, be),
      onTap: el => { clearSel(); selected = el; el.classList.add('sel'); }
    });
  });
  row.querySelectorAll('.wx12-bin').forEach(be => {
    const act = () => { if (selected) attempt(selected, be); else g.toast('Toca primero un residuo'); };
    be.addEventListener('click', act);
    be.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
  nextFocus();
}

function question(g) {
  const qd = U.pick(QS);
  g.ask(qd.q);
  const row = U.el('<div class="wx12-bins"></div>');
  U.shuffle(Object.keys(BINS)).forEach(k => row.appendChild(binEl(k)));
  g.area.appendChild(row);
  g.helpHint = () => { const b = row.querySelector(`[data-b="${qd.b}"]`); b.classList.add('hint'); g.toast('Pista: mira el contenedor ' + BINS[qd.b].col.toLowerCase()); };
  let done = false;
  row.querySelectorAll('.wx12-bin').forEach(be => {
    const act = () => {
      if (done) return;
      if (be.dataset.b === qd.b) { done = true; be.classList.add('open', 'gulp'); Kids.sound.pop(); g.right(qd.say); }
      else { g.shake(be); g.wrong('Ese no es. ¡Mira bien los colores!'); }
    };
    be.addEventListener('click', act);
    be.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
}
})();

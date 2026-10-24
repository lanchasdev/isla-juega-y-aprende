/* mundo-x10 — ¿Qué come cada animal? */
(function () {
'use strict';
const U = Kids.util;
const S = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';

Kids.art.add({
  'mx10-grass': S(`<ellipse cx="50" cy="88" rx="38" ry="5" fill="#3b2a1a" opacity=".12"/><g fill="none" stroke-linecap="round" stroke-width="7"><path d="M20 88Q16 60 12 40" stroke="#5CC77A"/><path d="M34 88Q34 56 30 28" stroke="#7FD68F"/><path d="M50 88V20" stroke="#4DBD6E"/><path d="M66 88Q66 56 72 30" stroke="#7FD68F"/><path d="M80 88Q84 60 90 42" stroke="#5CC77A"/></g>`),
  'mx10-hay': S(`<ellipse cx="50" cy="88" rx="38" ry="5" fill="#3b2a1a" opacity=".12"/><rect x="14" y="40" width="72" height="46" rx="12" fill="#F2CE6B"/><g stroke="#D9A93A" stroke-width="3" stroke-linecap="round"><path d="M22 52h56M22 64h56M22 76h56"/></g><path d="M14 40l-4-8M24 40l-2-10M40 40l-2-9M60 40l2-10M76 40l4-8" stroke="#F2CE6B" stroke-width="4" stroke-linecap="round"/><path d="M36 42V86M64 42V86" stroke="#C8923A" stroke-width="3"/>`),
  'mx10-meat': S(`<ellipse cx="50" cy="88" rx="34" ry="4" fill="#3b2a1a" opacity=".12"/><path d="M22 52Q18 26 46 24Q76 22 80 46Q84 70 58 74Q30 80 22 52Z" fill="#E9605F"/><path d="M30 50Q30 36 46 34Q64 34 68 48" fill="none" stroke="#F59A99" stroke-width="4" stroke-linecap="round"/><circle cx="62" cy="52" r="10" fill="#FFF0DC"/><rect x="66" y="62" width="22" height="9" rx="4.500" fill="#FFF0DC" transform="rotate(35 70 66)"/><circle cx="86" cy="76" r="6" fill="#FFF0DC"/><circle cx="80" cy="82" r="5" fill="#FFF0DC"/>`),
  'mx10-honey': S(`<ellipse cx="50" cy="90" rx="30" ry="4" fill="#3b2a1a" opacity=".12"/><path d="M26 34H74V80Q74 90 64 90H36Q26 90 26 80Z" fill="#F2B93B"/><rect x="22" y="24" width="56" height="14" rx="6" fill="#C98E52"/><path d="M26 34H74V46Q62 52 50 46T26 46Z" fill="#FFD23F"/><path d="M26 48Q38 60 50 52T74 50V50" fill="none"/><rect x="34" y="60" width="32" height="20" rx="8" fill="#FFF0C7"/><text x="50" y="76" font-family="Baloo 2,sans-serif" font-weight="800" font-size="14" text-anchor="middle" fill="#C48A12">miel</text><path d="M40 90Q40 96 44 96Q48 96 48 90" fill="#FFD23F"/>`),
  'mx10-seeds': S(`<ellipse cx="50" cy="86" rx="36" ry="5" fill="#3b2a1a" opacity=".12"/><path d="M16 60Q16 84 50 84T84 60Z" fill="#C98E52"/><path d="M16 60H84" stroke="#A56F3E" stroke-width="3"/><g fill="#F2CE6B" stroke="#C48A12" stroke-width="1.5"><ellipse cx="32" cy="54" rx="5" ry="3" transform="rotate(-20 32 54)"/><ellipse cx="44" cy="48" rx="5" ry="3" transform="rotate(15 44 48)"/><ellipse cx="56" cy="52" rx="5" ry="3" transform="rotate(-10 56 52)"/><ellipse cx="68" cy="47" rx="5" ry="3" transform="rotate(25 68 47)"/><ellipse cx="38" cy="58" rx="5" ry="3"/><ellipse cx="62" cy="58" rx="5" ry="3" transform="rotate(-15 62 58)"/><ellipse cx="50" cy="40" rx="5" ry="3" transform="rotate(-5 50 40)"/></g>`),
  'mx10-insect': S(`<ellipse cx="50" cy="84" rx="26" ry="4" fill="#3b2a1a" opacity=".12"/><path d="M30 38Q16 28 22 20M70 38Q84 28 78 20" fill="none" stroke="#3C4A7A" stroke-width="3" stroke-linecap="round"/><g stroke="#3C4A7A" stroke-width="3.5" stroke-linecap="round"><path d="M30 60L16 66M30 70L18 80M70 60L84 66M70 70L82 80"/></g><ellipse cx="50" cy="62" rx="24" ry="22" fill="#FF6B5B"/><path d="M50 40V84" stroke="#3C4A7A" stroke-width="3"/><circle cx="50" cy="40" r="13" fill="#3C4A7A"/><g fill="#3C4A7A"><circle cx="38" cy="58" r="4"/><circle cx="62" cy="58" r="4"/><circle cx="40" cy="72" r="3.500"/><circle cx="60" cy="72" r="3.500"/></g><circle cx="45" cy="38" r="3" fill="#fff"/><circle cx="55" cy="38" r="3" fill="#fff"/>`),
  'mx10-bamboo': S(`<ellipse cx="50" cy="92" rx="32" ry="4" fill="#3b2a1a" opacity=".12"/><g stroke-linecap="round"><path d="M34 92V10" stroke="#7FD68F" stroke-width="13"/><path d="M62 92V16" stroke="#5CC77A" stroke-width="13"/></g><g stroke="#3F9A5A" stroke-width="3" stroke-linecap="round"><path d="M28 30h12M28 56h12M28 78h12M56 36h12M56 62h12M56 82h12"/></g><path d="M40 40Q58 28 70 34Q56 44 40 40Z M68 70Q84 60 92 68Q80 78 68 70Z" fill="#4DBD6E"/>`),
  'mx10-panda': S(`<ellipse cx="50" cy="93" rx="27" ry="3.8" fill="#3b2a1a" opacity=".14"/><ellipse cx="50" cy="78" rx="23" ry="15" fill="#fff"/><ellipse cx="32" cy="84" rx="8" ry="7" fill="#2B3556"/><ellipse cx="68" cy="84" rx="8" ry="7" fill="#2B3556"/><path d="M28 70Q50 62 72 70" fill="none" stroke="#2B3556" stroke-width="8" stroke-linecap="round"/>
    <circle cx="26" cy="26" r="11" fill="#2B3556"/><circle cx="74" cy="26" r="11" fill="#2B3556"/><ellipse cx="50" cy="48" rx="29" ry="25" fill="#fff"/>
    <ellipse cx="36" cy="46" rx="9" ry="12" fill="#2B3556" transform="rotate(20 36 46)"/><ellipse cx="64" cy="46" rx="9" ry="12" fill="#2B3556" transform="rotate(-20 64 46)"/>
    <circle cx="37" cy="45" r="3.800" fill="#fff"/><circle cx="63" cy="45" r="3.800" fill="#fff"/><circle cx="38" cy="45.500" r="2.200" fill="#2b2118"/><circle cx="62" cy="45.500" r="2.200" fill="#2b2118"/>
    <ellipse cx="50" cy="56" rx="5" ry="3.600" fill="#2B3556"/><path d="M50 59q-4 4-8 1M50 59q4 4 8 1" fill="none" stroke="#2B3556" stroke-width="1.800" stroke-linecap="round"/><ellipse cx="30" cy="58" rx="4" ry="2.800" fill="#FF8FA3" opacity=".6"/><ellipse cx="70" cy="58" rx="4" ry="2.800" fill="#FF8FA3" opacity=".6"/>`),
  'mx10-both': S(`<g transform="translate(0 6) scale(.62)"><g transform="translate(-4 6)">${'<path d="M20 88Q16 60 12 40" stroke="#5CC77A" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M50 88V20" stroke="#4DBD6E" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M80 88Q84 60 90 42" stroke="#5CC77A" stroke-width="9" fill="none" stroke-linecap="round"/>'}</g></g><g transform="translate(34 30) scale(.62)"><path d="M22 52Q18 26 46 24Q76 22 80 46Q84 70 58 74Q30 80 22 52Z" fill="#E9605F"/><circle cx="62" cy="52" r="10" fill="#FFF0DC"/></g>`)
});

/* alimentos */
const FOOD = {
  grass:  { n: 'la hierba',    art: 'mx10-grass' },
  hay:    { n: 'el heno',      art: 'mx10-hay' },
  carrot: { n: 'la zanahoria', art: 'carrot' },
  meat:   { n: 'la carne',     art: 'mx10-meat' },
  fish:   { n: 'el pescado',   art: 'fish' },
  honey:  { n: 'la miel',      art: 'mx10-honey' },
  apple:  { n: 'la manzana',   art: 'apple' },
  banana: { n: 'el plátano',   art: 'banana' },
  seeds:  { n: 'las semillas', art: 'mx10-seeds' },
  insect: { n: 'el bichito',   art: 'mx10-insect' },
  bamboo: { n: 'el bambú',     art: 'mx10-bamboo' }
};
/* animales: dieta (plants | meat | all), comida principal y comidas válidas (acc) */
const AN = {
  cow:    { n: 'la vaca',     d: 'plants', f: 'grass',  acc: ['grass', 'hay'] },
  horse:  { n: 'el caballo',  d: 'plants', f: 'apple',  acc: ['apple', 'grass', 'hay', 'carrot'] },
  rabbit: { n: 'el conejo',   d: 'plants', f: 'carrot', acc: ['carrot', 'grass'] },
  sheep:  { n: 'la oveja',    d: 'plants', f: 'grass',  acc: ['grass', 'hay'] },
  giraffe:{ n: 'la jirafa',   d: 'plants' },
  elephant:{ n: 'el elefante', d: 'plants' },
  lion:   { n: 'el león',     d: 'meat', f: 'meat', acc: ['meat'] },
  cat:    { n: 'el gato',     d: 'meat', f: 'fish', acc: ['fish', 'meat'] },
  owl:    { n: 'el búho',     d: 'meat' },
  dolphin:{ n: 'el delfín',   d: 'meat' },
  penguin:{ n: 'el pingüino', d: 'meat' },
  frog:   { n: 'la rana',     d: 'meat', f: 'insect', acc: ['insect'] },
  bear:   { n: 'el oso',      d: 'all', f: 'honey', acc: ['honey', 'fish', 'meat', 'apple', 'insect'] },
  pig:    { n: 'el cerdo',    d: 'all' },
  hen:    { n: 'la gallina',  d: 'all', f: 'seeds', acc: ['seeds', 'insect'] },
  mouse:  { n: 'el ratón',    d: 'all' },
  monkey: { n: 'el mono',     f: 'banana', acc: ['banana', 'apple'] },
  bird:   { n: 'el pájaro',   f: 'seeds', acc: ['seeds', 'insect'] },
  panda:  { n: 'el panda',    art: 'mx10-panda', d: 'plants', f: 'bamboo', acc: ['bamboo'] }
};
const art = k => AN[k].art || k;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const DIETS = {
  plants: { name: 'Comen plantas', art: 'mx10-grass', say: 'plantas' },
  meat:   { name: 'Comen carne',   art: 'mx10-meat',  say: 'carne o pescado' },
  all:    { name: 'Comen de todo', art: 'mx10-both',  say: 'de todo' }
};
const OF = d => Object.keys(AN).filter(k => AN[k].d === d);

Kids.css(`
.g-mundo-x10 .toast{pointer-events:none}
.g-mundo-x10{--sz:clamp(4rem,12vmin,6.2rem)}
.g-mundo-x10 .x10-row{display:flex;flex-wrap:wrap;gap:.9rem;justify-content:center;width:100%;max-width:62rem;flex:0 1 auto}
.g-mundo-x10 .x10-an{width:clamp(7rem,22vmin,11rem);background:#fff;border-radius:1.6rem;border:.22rem solid var(--line);box-shadow:0 .35rem 0 var(--line);padding:.4rem;display:flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-size:1.3rem;line-height:1;position:relative;transition:transform .15s}
.g-mundo-x10 .x10-an>svg{width:100%;aspect-ratio:1;display:block;pointer-events:none}
.g-mundo-x10 .x10-an.hot{transform:scale(1.05);border-color:var(--yellow);box-shadow:0 0 0 .25rem var(--yellow)}
.g-mundo-x10 .x10-an.hint{animation:pulse .7s 6}
.g-mundo-x10 .x10-an.fed{border-color:var(--green);background:#E7F8EA}
.g-mundo-x10 .x10-an .eat{position:absolute;right:-.3rem;top:-.4rem;width:46%;aspect-ratio:1;background:#fff;border-radius:50%;border:.18rem solid var(--green);padding:.15rem;animation:pop .5s}
.g-mundo-x10 .x10-an .eat svg{width:100%;height:100%;display:block}
.g-mundo-x10 .x10-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem;min-height:calc(var(--sz) + 2.4rem);flex:none;position:relative;z-index:5}
.g-mundo-x10 .x10-it{width:var(--sz);background:#fff;border-radius:1.2rem;padding:.25rem .25rem .1rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);font-family:'Baloo 2';font-size:.95rem;line-height:1;display:flex;flex-direction:column;align-items:center}
.g-mundo-x10 .x10-it svg{width:100%;aspect-ratio:1;display:block;pointer-events:none}
.g-mundo-x10 .x10-it.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x10 .x10-it.hint{animation:bounce .6s 5}
.g-mundo-x10 .x10-it.focus{border-color:var(--g)}
.g-mundo-x10 .x10-bins{display:grid;gap:.9rem;width:100%;max-width:62rem;grid-template-columns:repeat(var(--n),1fr);flex:0 1 auto;min-height:0}
.g-mundo-x10 .x10-bin{position:relative;border-radius:1.8rem;border:.25rem solid #fff;box-shadow:0 .4rem 0 rgba(20,35,91,.14);padding:.5rem .5rem .6rem;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-height:clamp(9rem,28vh,16rem);transition:transform .15s}
.g-mundo-x10 .x10-bin:nth-child(1){background:#D5F4D2}.g-mundo-x10 .x10-bin:nth-child(2){background:#FFD9D4}.g-mundo-x10 .x10-bin:nth-child(3){background:#FFEDB0}
.g-mundo-x10 .x10-bin.hot{transform:scale(1.03);box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 rgba(20,35,91,.14)}
.g-mundo-x10 .x10-bin.hint{animation:pulse .7s 6}
.g-mundo-x10 .x10-bin .hd{display:flex;align-items:center;gap:.4rem;font-family:'Baloo 2';font-weight:800;font-size:1.35rem;line-height:1.05;text-align:center}
.g-mundo-x10 .x10-bin .hd svg{width:2.8rem;height:2.8rem;flex:none}
.g-mundo-x10 .x10-bin .in{display:flex;flex-wrap:wrap;justify-content:center;gap:.1rem;pointer-events:none}
.g-mundo-x10 .x10-bin .in i{display:block;width:3.6rem;aspect-ratio:1;animation:pop .5s}
.g-mundo-x10 .x10-bin .in svg{width:100%;height:100%;display:block}
.g-mundo-x10 .x10-hero{width:min(9rem,22vmin)}
.g-mundo-x10 .x10-hero svg{width:100%;height:auto;display:block}
.g-mundo-x10 .x10-ch{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;width:100%}
.g-mundo-x10 .x10-ch .pic{width:clamp(8rem,26vmin,12rem);min-height:9rem;font-size:1.3rem;text-align:center}
.g-mundo-x10 .x10-ch .pic svg{max-width:7rem;max-height:7rem}
@media (max-width:640px){.g-mundo-x10 .x10-bins.t3{grid-template-columns:1fr}.g-mundo-x10 .x10-bin{min-height:6.5rem}.g-mundo-x10 .x10-bin .in i{width:2.8rem}.g-mundo-x10 .x10-bin .hd{font-size:1.15rem}}
`);

/* ---------- nivel 1: unir comida con animal ---------- */
function matchRound(g) {
  let ans, foods, tries = 0;
  const cand = Object.keys(AN).filter(k => AN[k].f);
  do {
    ans = U.sample(cand, 3); foods = ans.map(k => AN[k].f); tries++;
  } while (tries < 80 && (new Set(foods).size < 3 || ans.some(k => foods.some(f => f !== AN[k].f && AN[k].acc.indexOf(f) >= 0))));
  const row = U.el('<div class="x10-row"></div>');
  ans.forEach(k => row.appendChild(U.el(`<div class="x10-an" data-k="${k}" role="button" tabindex="0" aria-label="${cap(AN[k].n)}">${Kids.art.get(art(k))}<span>${cap(AN[k].n)}</span></div>`)));
  const tray = U.el('<div class="x10-tray"></div>');
  g.area.appendChild(row); g.area.appendChild(tray);
  let left = 3, sel = null, last = null;
  g.ask('¿Qué come cada animal? Lleva la comida a su animal.');
  const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
  function attempt(it, an) {
    const f = it.dataset.f, k = an.dataset.k; last = it;
    if (AN[k].acc.indexOf(f) >= 0) {
      clear(); it.dataset.locked = '1'; it.remove(); an.classList.add('fed');
      an.appendChild(U.el(`<div class="eat">${Kids.art.get(FOOD[f].art)}</div>`)); Kids.sound.pop();
      g.say(cap(AN[k].n) + ' come ' + FOOD[f].n.replace(/^(el|la|las) /, ''));
      if (--left === 0) g.t(() => g.right('¡Todos tienen su comida!'), 600);
      return true;
    }
    g.shake(it); g.wrong('Mmm, ' + AN[k].n + ' no come ' + FOOD[f].n.replace(/^el /, 'eso: ').replace(/^(la|las) /, 'eso: ') + '. ¡Prueba otra vez!');
    return false;
  }
  g.helpHint = () => {
    const it = (last && last.isConnected) ? last : tray.querySelector('.x10-it');
    if (!it) return;
    const an = ans.map(k => row.querySelector(`[data-k=${k}]`)).find(a => AN[a.dataset.k].acc.indexOf(it.dataset.f) >= 0 && !a.classList.contains('fed'));
    it.classList.add('hint'); if (an) an.classList.add('hint');
    g.t(() => { it.classList.remove('hint'); if (an) an.classList.remove('hint'); }, 3800);
    if (an) g.toast(cap(AN[an.dataset.k].n) + ' come ' + FOOD[it.dataset.f].n);
  };
  U.shuffle(foods).forEach(f => {
    const it = U.el(`<button class="x10-it" data-f="${f}" aria-label="${cap(FOOD[f].n)}">${Kids.art.get(FOOD[f].art)}<span>${cap(FOOD[f].n.replace(/^(el|la|las) /, ''))}</span></button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(row.children),
      onStart: () => clear(),
      onDrop: (an, el) => attempt(el, an),
      onTap: el => { clear(); sel = el; el.classList.add('sel'); }
    });
  });
  row.querySelectorAll('.x10-an').forEach(an => {
    const act = () => { if (sel) attempt(sel, an); else g.toast('Toca primero una comida'); };
    an.addEventListener('click', act);
    an.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
}

/* ---------- nivel 2 y 3: clasificar ---------- */
function sortRound(g) {
  const bins = g.level === 2 ? ['plants', 'meat'] : ['plants', 'meat', 'all'];
  let list;
  if (g.level === 2) list = U.shuffle(U.sample(OF('plants'), 3).concat(U.sample(OF('meat'), 3)));
  else list = U.shuffle(U.sample(OF('plants'), 3).concat(U.sample(OF('meat'), 3), U.sample(OF('all'), 2)));
  const wrap = U.el('<div style="display:contents"></div>');
  const bx = U.el(`<div class="x10-bins ${bins.length === 3 ? 't3' : ''}" style="--n:${bins.length}"></div>`);
  bins.forEach(d => bx.appendChild(U.el(`<div class="x10-bin" role="button" tabindex="0" data-d="${d}" aria-label="${DIETS[d].name}"><div class="hd">${Kids.art.get(DIETS[d].art)}<span>${DIETS[d].name}</span></div><div class="in"></div></div>`)));
  const tray = U.el('<div class="x10-tray"></div>');
  wrap.appendChild(bx); wrap.appendChild(tray); g.area.appendChild(wrap);
  let left = list.length, sel = null, last = null, focus = null;
  const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
  const askFor = k => g.ask('¿Qué come ' + AN[k].n + '? Llévalo a su casilla.');
  function nextFocus() { if (focus) focus.classList.remove('focus'); focus = tray.querySelector('.x10-it'); if (focus) { focus.classList.add('focus'); askFor(focus.dataset.k); } }
  function attempt(it, bin) {
    const k = it.dataset.k, d = bin.dataset.d; last = it;
    if (AN[k].d === d) {
      clear(); it.dataset.locked = '1'; it.remove();
      bin.querySelector('.in').appendChild(U.el(`<i>${Kids.art.get(art(k))}</i>`)); Kids.sound.pop();
      if (--left === 0) { g.say('¡Todos clasificados!'); g.t(() => g.right('¡Cada animal en su casilla!'), 500); }
      else { if (it === focus) focus = null; nextFocus(); }
      return true;
    }
    g.shake(it);
    const real = DIETS[AN[k].d].say;
    g.wrong('Mmm, ' + AN[k].n + ' no es de "' + DIETS[d].name.toLowerCase() + '". ¡Prueba otra vez!');
    return false;
  }
  g.helpHint = () => {
    const it = (last && last.isConnected) ? last : tray.querySelector('.x10-it'); if (!it) return;
    const bin = bx.querySelector(`[data-d="${AN[it.dataset.k].d}"]`);
    it.classList.add('hint'); bin.classList.add('hint'); g.t(() => { it.classList.remove('hint'); bin.classList.remove('hint'); }, 3800);
    g.toast(cap(AN[it.dataset.k].n) + ': ' + DIETS[AN[it.dataset.k].d].name.toLowerCase());
  };
  list.forEach(k => {
    const it = U.el(`<button class="x10-it" data-k="${k}" aria-label="${cap(AN[k].n)}">${Kids.art.get(art(k))}<span>${cap(AN[k].n.replace(/^(el|la) /, ''))}</span></button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(bx.children),
      onStart: el => { clear(); if (focus !== el) { if (focus) focus.classList.remove('focus'); focus = el; el.classList.add('focus'); askFor(el.dataset.k); } },
      onDrop: (bin, el) => attempt(el, bin),
      onTap: el => { clear(); sel = el; el.classList.add('sel'); }
    });
  });
  bx.querySelectorAll('.x10-bin').forEach(bin => {
    const act = () => { if (sel) attempt(sel, bin); else g.toast('Toca primero un animal'); };
    bin.addEventListener('click', act);
    bin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
  nextFocus();
}

/* ---------- nivel 3: preguntas ---------- */
function askRound(g) {
  const k = U.pick(Object.keys(AN).filter(x => AN[x].f));
  const right = AN[k].f;
  const wrongs = U.sample(Object.keys(FOOD).filter(f => AN[k].acc.indexOf(f) < 0 && !(AN[k].d === 'plants' && f === 'meat') ), 2);
  const opts = U.shuffle([right].concat(wrongs));
  const hero = U.el(`<div class="x10-hero">${Kids.art.get(art(k))}</div>`);
  const box = U.el('<div class="x10-ch"></div>');
  const btns = opts.map(f => { const b = U.el(`<button class="pic" data-f="${f}" aria-label="${cap(FOOD[f].n)}">${Kids.art.get(FOOD[f].art)}<span class="lbl">${cap(FOOD[f].n)}</span></button>`); box.appendChild(b); return b; });
  g.area.appendChild(hero); g.area.appendChild(box);
  g.ask('¿Qué come ' + AN[k].n + '?');
  g.helpHint = () => { btns.forEach(b => { if (b.dataset.f === right) b.style.animation = 'bounce .6s 5'; }); g.toast('Piensa: ¿qué le gusta comer a ' + AN[k].n + '?'); };
  btns.forEach(b => b.addEventListener('click', () => {
    if (AN[k].acc.indexOf(b.dataset.f) >= 0) { b.classList.add('right'); btns.forEach(x => x.disabled = true); g.right('¡Sí! ' + cap(AN[k].n) + ' come ' + FOOD[b.dataset.f].n.replace(/^(el|la|las) /, '')); }
    else { b.classList.add('bad'); g.wrong('Eso no lo come ' + AN[k].n + '. ¡Prueba otra vez!'); }
  }));
}

Kids.game({
  id: 'mundo-x10', group: 'mundo', num: 13,
  title: '¿Qué come cada animal?',
  blurb: 'Descubre qué come cada animal y quién come plantas, carne o de todo.',
  how: 'Lleva cada comida a su animal. Después clasifica los animales según lo que comen. Puedes arrastrar o tocar.',
  icon: 'rabbit',
  levels: ['Unir comida', 'Plantas o carne', 'De todo y preguntas'],
  rounds: 4,
  round(g, i) {
    if (g.level === 1) return matchRound(g);
    if (g.level === 2) return sortRound(g);
    return (i % 2 === 0) ? sortRound(g) : askRound(g);
  }
});
})();

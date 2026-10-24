/* mundo-x15 — La casa */
(function () {
'use strict';
const U = Kids.util;
const SH = '<ellipse cx="50" cy="92" rx="34" ry="4.5" fill="#14235B" opacity=".1"/>';
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';

Kids.art.add({
  'wx15-bath': V(`${SH}<path d="M34 24q-6 0 -6 8v10" stroke="#9AA7BD" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M14 44h72v12q0 22 -22 22H36Q14 78 14 56z" fill="#fff" stroke="#9AA7BD" stroke-width="3" stroke-linejoin="round"/><path d="M18 50h64" stroke="#BFE3FA" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="38" r="6" fill="#fff" stroke="#9CD3F5" stroke-width="2"/><circle cx="52" cy="34" r="8" fill="#fff" stroke="#9CD3F5" stroke-width="2"/><circle cx="64" cy="39" r="5" fill="#fff" stroke="#9CD3F5" stroke-width="2"/><path d="M26 78l-4 10M74 78l4 10" stroke="#9AA7BD" stroke-width="5" stroke-linecap="round"/>`),
  'wx15-toilet': V(`${SH}<path d="M28 12h38v30H28z" fill="#fff" stroke="#9AA7BD" stroke-width="3" stroke-linejoin="round"/><rect x="40" y="19" width="14" height="4" rx="2" fill="#9AA7BD"/><path d="M20 46h60q0 22 -22 30v12H42V76Q20 68 20 46z" fill="#fff" stroke="#9AA7BD" stroke-width="3" stroke-linejoin="round"/><ellipse cx="50" cy="50" rx="24" ry="5.5" fill="#BFE3FA"/>`),
  'wx15-toothbrush': V(`${SH}<g transform="rotate(-35 50 50)"><rect x="8" y="42" width="58" height="12" rx="6" fill="#47B5BF"/><rect x="60" y="36" width="28" height="22" rx="6" fill="#fff" stroke="#47B5BF" stroke-width="3"/><g stroke="#FF7EA8" stroke-width="3.4" stroke-linecap="round"><path d="M67 34v-7M74 34v-7M81 34v-7"/></g></g>`),
  'wx15-towel': V(`${SH}<rect x="20" y="14" width="60" height="6" rx="3" fill="#9AA7BD"/><path d="M26 20h48v62q0 6 -6 6H32q-6 0 -6 -6z" fill="#4C8DF6"/><rect x="26" y="40" width="48" height="8" fill="#fff" opacity=".85"/><rect x="26" y="58" width="48" height="8" fill="#fff" opacity=".85"/>`),
  'wx15-fridge': V(`${SH}<rect x="26" y="8" width="48" height="82" rx="9" fill="#DCEFFB" stroke="#7CB6DB" stroke-width="3"/><path d="M26 36h48" stroke="#7CB6DB" stroke-width="3"/><rect x="62" y="16" width="4" height="14" rx="2" fill="#7CB6DB"/><rect x="62" y="44" width="4" height="22" rx="2" fill="#7CB6DB"/><rect x="33" y="48" width="12" height="12" rx="3" fill="#FF8FA3"/><rect x="36" y="64" width="10" height="10" rx="3" fill="#FFD23F"/>`),
  'wx15-sofa': V(`${SH}<rect x="10" y="32" width="80" height="34" rx="14" fill="#B79CFF"/><rect x="20" y="22" width="60" height="30" rx="12" fill="#C9B8F5"/><rect x="4" y="44" width="22" height="34" rx="10" fill="#9B80F0"/><rect x="74" y="44" width="22" height="34" rx="10" fill="#9B80F0"/><rect x="22" y="54" width="56" height="22" rx="8" fill="#B79CFF"/><path d="M32 82v6M68 82v6" stroke="#6B4A3A" stroke-width="5" stroke-linecap="round"/>`),
  'wx15-tv': V(`${SH}<rect x="8" y="16" width="84" height="56" rx="9" fill="#3A4570"/><rect x="14" y="22" width="72" height="44" rx="5" fill="#8FD8F0"/><circle cx="62" cy="38" r="8" fill="#FFD23F"/><path d="M14 58q20 -16 38 -2t34 -8v18H14z" fill="#7ED9A0"/><path d="M36 78h28M50 72v6" stroke="#3A4570" stroke-width="5" stroke-linecap="round"/>`),
  'wx15-pan': V(`${SH}<circle cx="42" cy="54" r="30" fill="#6E7A99" stroke="#4B5878" stroke-width="3"/><circle cx="42" cy="54" r="22" fill="#8E9AB8"/><path d="M70 50h24q4 0 4 4t-4 4H70z" fill="#B98556" stroke="#8B5E3C" stroke-width="2.4"/><circle cx="36" cy="48" r="8" fill="#FFF3D1"/><circle cx="36" cy="48" r="3.4" fill="#FFB300"/>`),
  'wx15-wcan': V(`${SH}<path d="M24 36h40v44q0 8 -8 8H32q-8 0 -8 -8z" fill="#5CC77A" stroke="#3FA66A" stroke-width="3" stroke-linejoin="round"/><path d="M64 52L90 30" stroke="#3FA66A" stroke-width="6" stroke-linecap="round"/><ellipse cx="92" cy="28" rx="6" ry="9" fill="#3FA66A" transform="rotate(35 92 28)"/><path d="M28 38q-4 -18 18 -18t18 18" fill="none" stroke="#3FA66A" stroke-width="5"/><g fill="#6CB8F0"><path d="M98 42q-2 4 0 6q2 -2 0 -6z"/><path d="M92 50q-2 4 0 6q2 -2 0 -6z"/></g>`)
});

/* habitaciones */
const ROOM = { cocina: 'Cocina', salon: 'Salón', dormitorio: 'Dormitorio', bano: 'Baño', jardin: 'Jardín' };
const ROOMDET = { cocina: 'la cocina', salon: 'el salón', dormitorio: 'el dormitorio', bano: 'el baño', jardin: 'el jardín' };
function roomSvg(k) {
  const floor = (c) => `<rect y="108" width="200" height="32" fill="${c}"/><rect y="106" width="200" height="4" fill="rgba(20,35,91,.12)"/>`;
  const win = (x, y, sky) => `<g><rect x="${x}" y="${y}" width="46" height="46" rx="5" fill="${sky}" stroke="#fff" stroke-width="5"/><path d="M${x + 23} ${y}v46M${x} ${y + 23}h46" stroke="#fff" stroke-width="3"/></g>`;
  let inner;
  if (k === 'cocina') inner = `<rect width="200" height="140" fill="#FFE8B5"/>${[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => ((r + c) % 2 ? `<rect x="${c * 20}" y="${70 + r * 7.4}" width="20" height="7.4" fill="#FFF6DC"/>` : '')).join('')).join('')}${win(130, 14, '#BDE6FB')}<circle cx="46" cy="38" r="18" fill="#fff" stroke="#E0A02F" stroke-width="4"/><path d="M46 38V27M46 38l8 5" stroke="#E0A02F" stroke-width="3" stroke-linecap="round"/>${floor('#E5C98F')}`;
  else if (k === 'salon') inner = `<rect width="200" height="140" fill="#D9E8FF"/>${win(14, 16, '#BDE6FB')}<path d="M8 12h20v54l-10 -10 -10 10z" fill="#FF9A89" opacity=".9"/><path d="M60 12h-20v54l10 -10 10 10z" fill="#FF9A89" opacity=".9"/><rect x="104" y="22" width="34" height="26" rx="3" fill="#fff" stroke="#B79CFF" stroke-width="3"/><path d="M108 44l9 -12 8 8 6 -6 8 10z" fill="#7ED9A0"/><rect x="148" y="30" width="24" height="30" rx="3" fill="#fff" stroke="#FFB347" stroke-width="3"/><circle cx="160" cy="42" r="6" fill="#FF8FB1"/>${floor('#D9B58A')}<ellipse cx="100" cy="124" rx="62" ry="9" fill="#FF9A89" opacity=".55"/>`;
  else if (k === 'dormitorio') inner = `<rect width="200" height="140" fill="#E6DCFF"/><g fill="#F0E8FF">${[0, 1, 2, 3, 4].map(c => `<rect x="${c * 40 + 20}" y="0" width="20" height="108"/>`).join('')}</g>${win(120, 16, '#2E3D8A')}<path d="M139 36a8 8 0 1 0 6 12a6.4 6.4 0 1 1 -6 -12z" fill="#FFE98F"/><circle cx="154" cy="30" r="1.8" fill="#FFE98F"/><circle cx="132" cy="54" r="1.6" fill="#FFE98F"/><path d="M20 22h26v30H20z" fill="#fff" stroke="#8C7BE0" stroke-width="3"/><path d="M24 46l8 -10 6 6 4 -4 4 8z" fill="#9B80F0"/>${floor('#C9A878')}`;
  else if (k === 'bano') inner = `<rect width="200" height="140" fill="#CFF1F2"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => `<path d="M${c * 20} 0V108" stroke="#fff" stroke-width="2" opacity=".8"/>`).join('')}${[0, 1, 2, 3, 4].map(r => `<path d="M0 ${r * 22}H200" stroke="#fff" stroke-width="2" opacity=".8"/>`).join('')}<ellipse cx="60" cy="48" rx="26" ry="30" fill="#EAF8FF" stroke="#9AA7BD" stroke-width="5"/><path d="M46 36q8 -8 18 -4" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>${floor('#9ED0D2')}<circle cx="140" cy="40" r="3" fill="#7CCBD0"/><circle cx="156" cy="30" r="3" fill="#7CCBD0"/><circle cx="170" cy="44" r="3" fill="#7CCBD0"/>`;
  else inner = `<defs><linearGradient id="wx15-gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CD0F5"/><stop offset="1" stop-color="#D5F1FD"/></linearGradient></defs><rect width="200" height="140" fill="url(#wx15-gs)"/><circle cx="168" cy="28" r="18" fill="#FFD23F"/><g fill="#fff"><ellipse cx="60" cy="26" rx="22" ry="8"/><ellipse cx="78" cy="22" rx="14" ry="8"/></g><path d="M0 78Q60 62 120 78T200 72V140H0z" fill="#A8DC7C"/><rect y="104" width="200" height="36" fill="#85C86B"/><g fill="#fff" stroke="#E4E4E4" stroke-width="1.5"><rect x="4" y="68" width="10" height="38" rx="3"/><rect x="26" y="68" width="10" height="38" rx="3"/><rect x="48" y="68" width="10" height="38" rx="3"/><rect x="70" y="68" width="10" height="38" rx="3"/><rect x="0" y="78" width="90" height="6"/><rect x="0" y="94" width="90" height="6"/></g><rect x="148" y="50" width="9" height="56" rx="4" fill="#8B5E3C"/><circle cx="152" cy="44" r="24" fill="#58B96A"/><circle cx="136" cy="56" r="13" fill="#58B96A"/><circle cx="170" cy="56" r="13" fill="#58B96A"/>`;
  return `<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
}

const IT = {
  bed:        { art: 'bed',             n: 'la cama',                 r: ['dormitorio'] },
  teddy:      { art: 'teddy',           n: 'el osito de peluche',     r: ['dormitorio'] },
  lamp:       { art: 'lamp',            n: 'la lámpara',              r: ['salon', 'dormitorio'] },
  table:      { art: 'table',           n: 'la mesa',                 r: ['cocina', 'salon'] },
  chair:      { art: 'chair',           n: 'la silla',                r: ['cocina', 'salon'] },
  cup:        { art: 'cup',             n: 'la taza',                 r: ['cocina'] },
  book:       { art: 'book',            n: 'el libro',                r: ['salon', 'dormitorio'] },
  bath:       { art: 'wx15-bath',       n: 'la bañera',               r: ['bano'] },
  toilet:     { art: 'wx15-toilet',     n: 'el inodoro',              r: ['bano'] },
  toothbrush: { art: 'wx15-toothbrush', n: 'el cepillo de dientes',   r: ['bano'] },
  towel:      { art: 'wx15-towel',      n: 'la toalla',               r: ['bano'] },
  fridge:     { art: 'wx15-fridge',     n: 'la nevera',               r: ['cocina'] },
  pan:        { art: 'wx15-pan',        n: 'la sartén',               r: ['cocina'] },
  sofa:       { art: 'wx15-sofa',       n: 'el sofá',                 r: ['salon'] },
  tv:         { art: 'wx15-tv',         n: 'la tele',                 r: ['salon'] },
  ball:       { art: 'ball',            n: 'el balón',                r: ['jardin'] },
  kite:       { art: 'kite',            n: 'la cometa',               r: ['jardin'] },
  flower:     { art: 'flower',          n: 'la flor',                 r: ['jardin'] },
  wcan:       { art: 'wx15-wcan',       n: 'la regadera',             r: ['jardin'] }
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const singles = (room) => Object.keys(IT).filter(k => IT[k].r.length === 1 && IT[k].r[0] === room);
const AMBIG = ['lamp', 'book', 'chair', 'table'];

Kids.css(`
.g-mundo-x15{--sz:clamp(4.2rem,11vmin,6rem)}
.g-mundo-x15 .wx15-house{width:100%;max-width:56rem;flex:0 1 auto;min-height:0;display:flex;flex-direction:column;align-items:stretch}
.g-mundo-x15 .wx15-roof{height:clamp(2.2rem,6vh,3.6rem);margin-bottom:-.15rem;position:relative;z-index:1}
.g-mundo-x15 .wx15-roof svg{width:100%;height:100%;display:block}
.g-mundo-x15 .wx15-grid{display:grid;gap:.4rem;background:#B98556;padding:.4rem;border-radius:0 0 1.2rem 1.2rem;box-shadow:0 .4rem 0 rgba(20,35,91,.16);grid-template-columns:repeat(var(--cols),1fr);grid-auto-rows:clamp(5.4rem,15.5vh,9rem)}
.g-mundo-x15 .wx15-grid.c3{grid-auto-rows:clamp(8rem,26vh,14rem)}
.g-mundo-x15 .wx15-room{position:relative;overflow:hidden;border-radius:.6rem;cursor:pointer;transition:transform .15s,box-shadow .15s;min-height:0;border:0;padding:0}
.g-mundo-x15 .wx15-room>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-x15 .wx15-grid.has-g{grid-template-rows:repeat(2,clamp(5.4rem,15.5vh,9rem)) clamp(4rem,10vh,7rem)}
@media (max-width:640px){.g-mundo-x15 .wx15-grid.has-g{grid-template-rows:repeat(2,clamp(5.6rem,15vh,8rem)) clamp(4.5rem,12vh,6.5rem)}}
.g-mundo-x15 .wx15-room.garden{grid-column:1/-1}
.g-mundo-x15 .wx15-room.hot{box-shadow:inset 0 0 0 .3rem var(--yellow);transform:scale(1.015);z-index:2}
.g-mundo-x15 .wx15-room.hint{animation:wx15-hl .8s 5}
@keyframes wx15-hl{0%,100%{box-shadow:inset 0 0 0 0 var(--yellow)}50%{box-shadow:inset 0 0 0 .5rem var(--yellow)}}
.g-mundo-x15 .wx15-room .lbl{position:absolute;left:.4rem;top:.3rem;background:#fff;border-radius:999px;padding:0 .8rem;font-family:'Baloo 2';font-weight:800;font-size:1.25rem;line-height:1.4;box-shadow:0 .15rem 0 rgba(20,35,91,.14);z-index:3}
.g-mundo-x15 .wx15-layer{position:absolute;left:2%;right:2%;bottom:4%;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:.1rem;z-index:2;pointer-events:none}
.g-mundo-x15 .wx15-layer>i{display:block;width:min(30%,3.8rem);aspect-ratio:1;animation:pop .5s}
.g-mundo-x15 svg{display:block}
.g-mundo-x15 .wx15-layer svg,.g-mundo-x15 .wx15-it svg{width:100%;height:100%}
.g-mundo-x15 .wx15-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.5rem;min-height:calc(var(--sz) + 1.2rem);flex:none;position:relative;z-index:5}
.g-mundo-x15 .wx15-it{width:var(--sz);height:var(--sz);background:#fff;border-radius:1.2rem;padding:.3rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);position:relative}
.g-mundo-x15 .wx15-it.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x15 .wx15-it.hint{animation:bounce .6s 5}
.g-mundo-x15 .wx15-it.focus{border-color:var(--g)}
.g-mundo-x15 .wx15-it svg{pointer-events:none}
@media (max-width:640px){
 .g-mundo-x15 .wx15-grid.c3{--cols:1!important}
 .g-mundo-x15 .wx15-room .lbl{font-size:1rem}
 .g-mundo-x15 .wx15-grid{grid-auto-rows:clamp(5.6rem,15vh,8rem)}
 .g-mundo-x15 .wx15-grid.c3{grid-auto-rows:clamp(5rem,13vh,7.5rem)}
}
`);

Kids.game({
  id: 'mundo-x15', group: 'mundo', num: 18,
  title: 'La casa',
  blurb: '¿En qué habitación va cada cosa? Llévala a la cocina, el salón, el dormitorio, el baño o el jardín.',
  how: 'Arrastra cada objeto a la habitación donde va. También puedes tocar el objeto y luego tocar la habitación. Algunas cosas pueden ir en dos habitaciones.',
  icon: 'house',
  levels: ['3 habitaciones', '4 habitaciones', '5 habitaciones'],
  rounds: 3,
  round(g, i) {
    const rooms = g.level === 1 ? ['cocina', 'dormitorio', 'bano'] : g.level === 2 ? ['cocina', 'salon', 'dormitorio', 'bano'] : ['cocina', 'salon', 'dormitorio', 'bano', 'jardin'];
    let list;
    if (g.level < 3) {
      const total = g.level === 1 ? 5 : 7;
      const first = rooms.map(r => U.pick(singles(r)));
      const rest = U.shuffle([].concat(...rooms.map(singles)).filter(k => first.indexOf(k) < 0));
      list = U.shuffle(first.concat(rest.slice(0, total - first.length)));
    } else {
      const amb = U.sample(AMBIG, 3), garden = U.pick(singles('jardin'));
      const others = ['cocina', 'dormitorio', 'bano'].map(r => U.pick(singles(r)));
      list = U.shuffle(amb.concat([garden], others));
    }
    play(g, rooms, list);
  }
});

function play(g, rooms, list) {
  const n = rooms.length, hasG = rooms.indexOf('jardin') >= 0, main = rooms.filter(r => r !== 'jardin');
  const house = U.el('<div class="wx15-house"></div>');
  house.appendChild(U.el('<div class="wx15-roof"><svg viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 L200 6 L400 60Z" fill="#E8604C"/><path d="M0 60 L200 6 L400 60" fill="none" stroke="#B93C2C" stroke-width="5" stroke-linejoin="round"/><g fill="#C94A38" opacity=".5"><path d="M80 60l45 -30 20 30z"/><path d="M270 60l-40 -26 -20 26z"/></g><rect x="290" y="14" width="22" height="28" fill="#B98556"/></svg></div>'));
  const cols = main.length === 3 ? 3 : 2;
  const grid = U.el(`<div class="wx15-grid ${hasG ? 'has-g' : ''} ${main.length === 3 ? 'c3' : ''}" style="--cols:${cols}"></div>`);
  rooms.forEach(r => grid.appendChild(U.el(`<div class="wx15-room ${r === 'jardin' ? 'garden' : ''}" role="button" tabindex="0" data-r="${r}" aria-label="${ROOM[r]}">${roomSvg(r)}<span class="lbl">${ROOM[r]}</span><div class="wx15-layer"></div></div>`)));
  house.appendChild(grid);
  const tray = U.el('<div class="wx15-tray"></div>');
  g.area.appendChild(house); g.area.appendChild(tray);
  let remaining = list.length, selected = null, focus = null, lastTried = null;
  const roomEl = r => grid.querySelector(`[data-r="${r}"]`);
  const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };
  function nextFocus() {
    if (focus) focus.classList.remove('focus');
    focus = tray.querySelector('.wx15-it');
    if (focus) { focus.classList.add('focus'); g.ask('¿En qué habitación va ' + IT[focus.dataset.a].n + '?'); }
  }
  function attempt(it, re) {
    const a = it.dataset.a, r = re.dataset.r; lastTried = it;
    if (IT[a].r.indexOf(r) >= 0) {
      clearSel(); it.dataset.locked = '1';
      re.querySelector('.wx15-layer').appendChild(U.el(`<i>${Kids.art.get(IT[a].art)}</i>`));
      it.remove(); Kids.sound.pop(); remaining--;
      const other = IT[a].r.filter(x => x !== r && rooms.indexOf(x) >= 0)[0];
      if (other) g.toast('¡Bien! ' + cap(IT[a].n) + ' también podría ir en ' + ROOMDET[other]);
      if (remaining === 0) { g.say('¡Toda la casa en orden!'); g.t(() => g.right('¡Toda la casa en orden!'), 600); }
      else { if (it === focus) focus = null; nextFocus(); }
      return true;
    }
    g.shake(it);
    g.wrong('Mmm, ' + IT[a].n + ' no va en ' + ROOMDET[r] + '. ¡Prueba otra vez!');
    return false;
  }
  g.helpHint = () => {
    const it = (lastTried && lastTried.isConnected) ? lastTried : tray.querySelector('.wx15-it'); if (!it) return;
    const r = IT[it.dataset.a].r.filter(x => rooms.indexOf(x) >= 0)[0], re = roomEl(r);
    it.classList.add('hint'); re.classList.add('hint');
    g.t(() => { it.classList.remove('hint'); re.classList.remove('hint'); }, 3800);
    g.toast('Pista: ' + cap(IT[it.dataset.a].n) + ' va en ' + ROOMDET[r]);
  };
  list.forEach(a => {
    const it = U.el(`<button class="wx15-it" data-a="${a}" aria-label="${cap(IT[a].n)}">${Kids.art.get(IT[a].art)}</button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(grid.children),
      onStart: el => { clearSel(); if (focus !== el) { if (focus) focus.classList.remove('focus'); focus = el; el.classList.add('focus'); g.ask('¿En qué habitación va ' + IT[el.dataset.a].n + '?'); } },
      onDrop: (re, el) => attempt(el, re),
      onTap: el => { clearSel(); selected = el; el.classList.add('sel'); }
    });
  });
  grid.querySelectorAll('.wx15-room').forEach(re => {
    const act = () => { if (selected) attempt(selected, re); else g.toast('Toca primero un objeto'); };
    re.addEventListener('click', act);
    re.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
  nextFocus();
}
})();

/* mundo-x11 — El día y la noche */
(function () {
'use strict';
const U = Kids.util;
const SH = '<ellipse cx="50" cy="90" rx="34" ry="5" fill="#14235B" opacity=".1"/>';
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const nest = (name, x, y, w, arg) => `<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="0 0 100 100">${Kids.art.get(name, arg).replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</svg>`;

Kids.art.add({
  'wx11-breakfast': V(`${SH}<path d="M12 50h76q0 36 -38 36q-38 0 -38 -36z" fill="#fff" stroke="#8C7BE0" stroke-width="3"/><path d="M17 62h66" stroke="#B7A8F0" stroke-width="5"/><ellipse cx="50" cy="50" rx="38" ry="8" fill="#FFF3D1" stroke="#8C7BE0" stroke-width="3"/><g fill="#F2B24C"><circle cx="34" cy="49" r="4"/><circle cx="48" cy="52" r="4"/><circle cx="62" cy="49" r="4"/><circle cx="55" cy="46" r="3.4"/></g><path d="M72 20 L58 48" stroke="#C9C9D6" stroke-width="5" stroke-linecap="round"/><ellipse cx="74" cy="18" rx="6" ry="8" fill="#C9C9D6" transform="rotate(25 74 18)"/>`),
  'wx11-school': V(`${SH}<path d="M30 30 q20 -22 40 0" fill="none" stroke="#C0392B" stroke-width="5"/><rect x="20" y="28" width="60" height="60" rx="18" fill="#FF7E69"/><rect x="30" y="56" width="40" height="26" rx="9" fill="#FFB3A5"/><rect x="40" y="62" width="20" height="5" rx="2.5" fill="#fff"/><rect x="26" y="34" width="48" height="16" rx="8" fill="#FF9A89"/><circle cx="50" cy="42" r="4" fill="#FFD23F"/>`),
  'wx11-park': V(`<ellipse cx="50" cy="90" rx="42" ry="5" fill="#14235B" opacity=".1"/><path d="M14 88 L34 16 M86 88 L66 16" stroke="#B98556" stroke-width="6" stroke-linecap="round"/><path d="M28 16 H72" stroke="#B98556" stroke-width="7" stroke-linecap="round"/><path d="M42 18 V62 M58 18 V62" stroke="#8a7a55" stroke-width="2.4"/><rect x="36" y="62" width="28" height="7" rx="3.5" fill="#FF7EA8"/><circle cx="50" cy="48" r="7" fill="#FFD7B5"/><rect x="44" y="53" width="12" height="9" rx="4" fill="#4C8DF6"/><circle cx="47.5" cy="47" r="1.2" fill="#14235B"/><circle cx="52.5" cy="47" r="1.2" fill="#14235B"/>`),
  'wx11-lunch': V(`${SH}<ellipse cx="50" cy="58" rx="38" ry="26" fill="#fff" stroke="#47B5BF" stroke-width="3"/><ellipse cx="50" cy="58" rx="26" ry="16" fill="#F0FAFB"/><ellipse cx="42" cy="56" rx="12" ry="9" fill="#F4C25C"/><path d="M36 54 q6 -4 12 0" stroke="#E0A02F" stroke-width="2" fill="none"/><g fill="#5CC77A"><circle cx="58" cy="52" r="4"/><circle cx="64" cy="58" r="4"/><circle cx="57" cy="62" r="4"/></g><path d="M6 30 V72 M3 30 v12 M9 30 v12" stroke="#C9C9D6" stroke-width="3" stroke-linecap="round"/><path d="M94 30 q-6 10 0 24 V74" stroke="#C9C9D6" stroke-width="3.4" stroke-linecap="round" fill="none"/>`),
  'wx11-dinner': V(`${SH}<path d="M12 50h76q0 34 -38 34q-38 0 -38 -34z" fill="#fff" stroke="#E0603A" stroke-width="3"/><ellipse cx="50" cy="50" rx="38" ry="8" fill="#FFA24C" stroke="#E0603A" stroke-width="3"/><g fill="#FFD9A0"><circle cx="38" cy="50" r="3"/><circle cx="56" cy="52" r="3"/><circle cx="66" cy="49" r="2.6"/></g><path d="M36 38 q-5 -8 0 -14 M52 36 q-5 -8 0 -14 M68 38 q-5 -8 0 -14" fill="none" stroke="#B9B9C9" stroke-width="3" stroke-linecap="round"/><path d="M80 12a10 10 0 1 0 8 14a8 8 0 1 1 -8 -14z" fill="#FFE98F"/>`),
  'wx11-teeth': V(`${SH}<g transform="rotate(-35 50 50)"><rect x="8" y="42" width="60" height="12" rx="6" fill="#4C8DF6"/><rect x="62" y="38" width="26" height="20" rx="6" fill="#fff" stroke="#4C8DF6" stroke-width="3"/><g stroke="#4C8DF6" stroke-width="3" stroke-linecap="round"><path d="M68 36v-6M75 36v-6M82 36v-6"/></g><rect x="64" y="40" width="22" height="6" rx="3" fill="#5CC77A"/></g><g fill="#FFD23F"><path d="M20 22l3 -7 3 7 7 3 -7 3 -3 7 -3 -7 -7 -3z"/></g>`),
  'wx11-merienda': () => V(`${SH}${nest('apple', 4, 14, 62)}${nest('cup', 46, 38, 52)}`),
  'wx11-sleep': () => V(`${nest('bed', 4, 22, 76)}<g font-family="Baloo 2,sans-serif" font-weight="800" fill="#8C7BE0"><text x="64" y="30" font-size="22">Z</text><text x="78" y="18" font-size="15">z</text></g>`),
  'wx11-stars': () => V(`${nest('star', 22, 24, 56)}${nest('star', 2, 6, 28)}${nest('star', 70, 8, 26)}${nest('star', 70, 60, 24)}`),
  'wx11-story': () => V(`${nest('book', 8, 18, 74)}<g fill="#FFD23F"><path d="M80 14l2 -6 2 6 6 2 -6 2 -2 6 -2 -6 -6 -2z"/></g>`)
});

/* actividades: art, nombre, pregunta y momentos válidos */
const ACT = {
  desayunar: { art: 'wx11-breakfast', n: 'Desayunar',            q: '¿Cuándo desayunamos?',            ok: ['dia', 'manana'] },
  cole:      { art: 'wx11-school',    n: 'Ir al cole',           q: '¿Cuándo vamos al cole?',           ok: ['dia', 'manana'] },
  parque:    { art: 'wx11-park',      n: 'Jugar en el parque',   q: '¿Cuándo jugamos en el parque?',    ok: ['dia', 'tarde'] },
  comer:     { art: 'wx11-lunch',     n: 'Comer',                q: '¿Cuándo comemos?',                 ok: ['dia', 'tarde'] },
  merendar:  { art: 'wx11-merienda',  n: 'Merendar',             q: '¿Cuándo merendamos?',              ok: ['dia', 'tarde'] },
  cenar:     { art: 'wx11-dinner',    n: 'Cenar',                q: '¿Cuándo cenamos?',                 ok: ['noche'] },
  dientes:   { art: 'wx11-teeth',     n: 'Cepillarse los dientes', q: '¿Cuándo nos cepillamos antes de dormir?', ok: ['noche'] },
  dormir:    { art: 'wx11-sleep',     n: 'Dormir',               q: '¿Cuándo dormimos?',                ok: ['noche'] },
  cuento:    { art: 'wx11-story',     n: 'Leer un cuento',       q: '¿Cuándo leemos un cuento para dormir?', ok: ['noche'] },
  estrellas: { art: 'wx11-stars',     n: 'Ver las estrellas',    q: '¿Cuándo vemos las estrellas?',     ok: ['noche'] }
};
const ZONES = {
  dia:    { n: 'De día' },
  noche:  { n: 'De noche' },
  manana: { n: 'Por la mañana' },
  tarde:  { n: 'Por la tarde' }
};
const ZSCENE = { dia: 'day', noche: 'night', manana: 'morning', tarde: 'afternoon' };
const DAY1 = ['desayunar', 'cole', 'parque', 'comer', 'merendar'], NIGHT1 = ['cenar', 'dormir', 'cuento', 'estrellas'];
const MAN2 = ['desayunar', 'cole'], TAR2 = ['merendar', 'parque'], NOC2 = ['cenar', 'dormir', 'cuento', 'estrellas'];
const ORDER = ['desayunar', 'cole', 'comer', 'merendar', 'cenar', 'dientes', 'cuento', 'dormir'];
const QUESTIONS = [
  { q: '¿Qué comemos al mediodía?', a: 'comer', d: ['desayunar', 'cenar', 'merendar'], say: 'La comida' },
  { q: '¿Qué tomamos nada más levantarnos por la mañana?', a: 'desayunar', d: ['comer', 'cenar', 'merendar'], say: 'El desayuno' },
  { q: '¿Qué hacemos antes de dormir, ya en la cama?', a: 'cuento', d: ['cole', 'parque', 'desayunar'], say: 'Leer un cuento' },
  { q: '¿Qué tomamos por la tarde, después de jugar?', a: 'merendar', d: ['cenar', 'desayunar', 'dormir'], say: 'La merienda' },
  { q: '¿Qué hacemos después de cenar?', a: 'dientes', d: ['cole', 'desayunar', 'parque'], say: 'Cepillarse los dientes' }
];

/* escenas 200x140 */
function scene(k) {
  const hills = (a, b) => `<path d="M0 100 Q50 78 110 98 T200 92 V140 H0Z" fill="${a}"/><path d="M0 120 Q80 104 150 118 T200 114 V140 H0Z" fill="${b}"/>`;
  const house = (wall, roof, win) => `<rect x="30" y="78" width="46" height="34" rx="3" fill="${wall}"/><path d="M24 80 L53 56 L82 80Z" fill="${roof}"/><rect x="45" y="92" width="14" height="20" rx="2" fill="${roof}" opacity=".85"/><rect x="34" y="86" width="9" height="9" rx="1.5" fill="${win}"/><rect x="63" y="86" width="9" height="9" rx="1.5" fill="${win}"/>`;
  const tree = (c) => `<rect x="150" y="84" width="7" height="28" rx="3" fill="#8B5E3C"/><circle cx="153" cy="76" r="18" fill="${c}"/><circle cx="143" cy="84" r="10" fill="${c}"/><circle cx="164" cy="84" r="10" fill="${c}"/>`;
  const defs = (id, a, b) => `<defs><linearGradient id="wx11-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="200" height="140" fill="url(#wx11-${id})"/>`;
  let inner;
  if (k === 'day') inner = defs('sd', '#7CD0F5', '#D5F1FD') + `<circle cx="150" cy="34" r="30" fill="#FFE98F" opacity=".45"/><circle cx="150" cy="34" r="21" fill="#FFD23F"/><g fill="#fff"><ellipse cx="50" cy="30" rx="20" ry="8"/><ellipse cx="66" cy="26" rx="13" ry="8"/><ellipse cx="108" cy="52" rx="14" ry="6"/></g>` + hills('#9BDD8A', '#7CCB7A') + house('#FFE0B5', '#E8604C', '#BDE6FB') + tree('#58B96A');
  else if (k === 'morning') inner = defs('sm', '#FFC7A0', '#FFF0D2') + `<circle cx="150" cy="82" r="30" fill="#FFD9A0" opacity=".6"/><circle cx="150" cy="82" r="20" fill="#FFB347"/><g fill="#fff" opacity=".85"><ellipse cx="46" cy="34" rx="18" ry="7"/><ellipse cx="108" cy="24" rx="14" ry="6"/></g>` + hills('#B6E39A', '#8ED69A') + house('#FFE0B5', '#E8604C', '#FFE98F') + tree('#6CC57A');
  else if (k === 'afternoon') inner = defs('sa', '#8FD3F2', '#FFE9B8') + `<circle cx="110" cy="38" r="28" fill="#FFE98F" opacity=".45"/><circle cx="110" cy="38" r="19" fill="#FFC53D"/><g fill="#fff" opacity=".9"><ellipse cx="40" cy="30" rx="18" ry="7"/><ellipse cx="168" cy="48" rx="16" ry="6"/></g>` + hills('#A8DC7C', '#85C86B') + house('#FFE0B5', '#E8604C', '#BDE6FB') + tree('#4FAE62');
  else inner = defs('sn', '#1B2A6B', '#4A4A9E') + `<path d="M150 14a22 22 0 1 0 18 36a17 17 0 1 1 -18 -36z" fill="#FFF3B0"/><g fill="#FFE98F"><path d="M30 24l2.5 -6 2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5z"/><path d="M90 18l2 -5 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2z"/><path d="M112 54l2 -5 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2z"/><circle cx="60" cy="52" r="1.8"/><circle cx="14" cy="60" r="1.8"/><circle cx="184" cy="64" r="1.8"/><circle cx="130" cy="20" r="1.6"/></g>` + hills('#2F6B5A', '#265448') + house('#5B5FA8', '#2E2E6E', '#FFE98F') + tree('#1F5A47');
  return `<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
}

Kids.css(`
.g-mundo-x11{--sz:clamp(4.4rem,12vmin,6.4rem)}
.g-mundo-x11 .wx11-zs{display:grid;gap:.9rem;width:100%;max-width:70rem;flex:0 1 auto;min-height:0;grid-template-columns:repeat(var(--n),1fr);grid-auto-rows:clamp(11rem,38vh,21rem)}
.g-mundo-x11 .wx11-z{position:relative;border-radius:1.8rem;overflow:hidden;box-shadow:0 .4rem 0 rgba(20,35,91,.14);border:.25rem solid #fff;transition:transform .15s,box-shadow .15s;cursor:pointer;min-height:0}
.g-mundo-x11 .wx11-z>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-x11 .wx11-z.hot{transform:scale(1.03);box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 rgba(20,35,91,.14)}
.g-mundo-x11 .wx11-z.hint{animation:pulse .7s 6}
.g-mundo-x11 .wx11-z .lbl{position:absolute;left:50%;top:.5rem;transform:translateX(-50%);background:#fff;border-radius:999px;padding:.05rem 1.1rem;font-family:'Baloo 2';font-weight:800;font-size:1.5rem;line-height:1.35;box-shadow:0 .2rem 0 rgba(20,35,91,.14);z-index:3;white-space:nowrap}
.g-mundo-x11 .wx11-layer{position:absolute;left:3%;right:3%;bottom:3%;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:.1rem;z-index:2;pointer-events:none}
.g-mundo-x11 .wx11-layer>i{display:block;width:min(30%,4.4rem);aspect-ratio:1;animation:pop .5s;background:rgba(255,255,255,.8);border-radius:1rem;padding:.15rem}
.g-mundo-x11 svg{display:block}
.g-mundo-x11 .wx11-layer svg,.g-mundo-x11 .wx11-it svg{width:100%;height:100%}
.g-mundo-x11 .wx11-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem;min-height:calc(var(--sz) + 1.4rem);flex:none;position:relative;z-index:5}
.g-mundo-x11 .wx11-it{width:var(--sz);height:var(--sz);background:#fff;border-radius:1.2rem;padding:.3rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);position:relative}
.g-mundo-x11 .wx11-it.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x11 .wx11-it.hint{animation:bounce .6s 5}
.g-mundo-x11 .wx11-it.focus{border-color:var(--g)}
.g-mundo-x11 .wx11-it svg{pointer-events:none}
.g-mundo-x11 .wx11-ord{display:grid;gap:.5rem;width:100%;max-width:64rem;grid-template-columns:repeat(var(--c),1fr)}
.g-mundo-x11 .wx11-slot{aspect-ratio:1;position:relative;min-width:0}
.g-mundo-x11 .wx11-slot .num{position:absolute;left:.3rem;top:.1rem;font-family:'Baloo 2';font-weight:800;font-size:1.3rem;color:#6a7bb5;z-index:1}
.g-mundo-x11 .wx11-slot.slot{font-size:1rem}
.g-mundo-x11 .wx11-slot .wx11-it,.g-mundo-x11 .wx11-otray .wx11-it{width:100%;height:100%;padding:.2rem .2rem 0;display:flex;flex-direction:column;align-items:center}
.g-mundo-x11 .wx11-otray{display:grid;gap:.5rem;width:100%;max-width:64rem;grid-template-columns:repeat(var(--c),1fr);background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem}
.g-mundo-x11 .wx11-otray>button{aspect-ratio:1;min-width:0}
.g-mundo-x11 .wx11-it .t{font-family:'Baloo 2';font-weight:700;font-size:.85rem;line-height:1;text-align:center;margin-top:auto;padding-bottom:.15rem}
.g-mundo-x11 .wx11-it>svg{flex:1;min-height:0;width:100%}
.g-mundo-x11 .wx11-q{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;width:100%;max-width:60rem}
.g-mundo-x11 .wx11-q .pic{width:clamp(9rem,28%,13rem);aspect-ratio:1}
.g-mundo-x11 .wx11-q .pic svg{max-width:7rem;max-height:7rem}
@media (max-width:640px){
 .g-mundo-x11 .wx11-zs.three{grid-template-columns:1fr;grid-auto-rows:clamp(6.5rem,17vh,9rem)}
 .g-mundo-x11 .wx11-z .lbl{font-size:1.2rem}
 .g-mundo-x11 .wx11-ord.big,.g-mundo-x11 .wx11-otray.big{--c:4!important}
 .g-mundo-x11 .wx11-it .t{font-size:.7rem}
}
`);

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

Kids.game({
  id: 'mundo-x11', group: 'mundo', num: 14,
  title: 'El día y la noche',
  blurb: '¿Qué hacemos por la mañana, por la tarde y por la noche? Llévalo a su momento del día.',
  how: 'Arrastra cada actividad al momento del día en que la hacemos. También puedes tocar la actividad y luego tocar el momento. En el nivel difícil, ordena el día completo.',
  icon: 'sun',
  levels: ['De día o de noche', 'Mañana, tarde y noche', 'Ordena el día'],
  rounds: 4,
  round(g, i) {
    if (g.level === 3) return g.i % 2 === 0 ? orderRound(g, i) : questionRound(g, i);
    return sortRound(g);
  }
});

function sortRound(g) {
  let zones, list;
  if (g.level === 1) {
    zones = ['dia', 'noche'];
    list = U.shuffle(U.sample(DAY1, 2).concat(U.sample(NIGHT1, 2)));
  } else {
    zones = ['manana', 'tarde', 'noche'];
    list = U.shuffle(U.sample(MAN2, 2).concat(U.sample(TAR2, 2), U.sample(NOC2, 2)));
  }
  const zs = U.el(`<div class="wx11-zs ${zones.length === 3 ? 'three' : ''}" style="--n:${zones.length}"></div>`);
  zones.forEach(z => zs.appendChild(U.el(`<div class="wx11-z" role="button" tabindex="0" data-z="${z}" aria-label="${ZONES[z].n}">${scene(ZSCENE[z])}<span class="lbl">${ZONES[z].n}</span><div class="wx11-layer"></div></div>`)));
  const tray = U.el('<div class="wx11-tray"></div>');
  g.area.appendChild(zs); g.area.appendChild(tray);
  let remaining = list.length, selected = null, focus = null, lastTried = null;
  const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };
  function nextFocus() {
    if (focus) focus.classList.remove('focus');
    focus = tray.querySelector('.wx11-it');
    if (focus) { focus.classList.add('focus'); g.ask(ACT[focus.dataset.a].q); }
  }
  function attempt(it, ze) {
    const a = it.dataset.a, z = ze.dataset.z; lastTried = it;
    if (ACT[a].ok.indexOf(z) >= 0) {
      clearSel(); it.dataset.locked = '1';
      ze.querySelector('.wx11-layer').appendChild(U.el(`<i>${Kids.art.get(ACT[a].art)}</i>`));
      it.remove(); Kids.sound.pop(); remaining--;
      if (remaining === 0) { g.say('¡Todo en su momento!'); g.t(() => g.right('¡Cada cosa en su momento del día!'), 500); }
      else { if (it === focus) focus = null; nextFocus(); }
      return true;
    }
    g.shake(it);
    g.wrong('Mmm, ' + ACT[a].n.toLowerCase() + ' no es ' + ZONES[z].n.toLowerCase() + '. ¡Prueba otra vez!');
    return false;
  }
  g.helpHint = () => {
    const it = (lastTried && lastTried.isConnected) ? lastTried : tray.querySelector('.wx11-it'); if (!it) return;
    const z = ACT[it.dataset.a].ok.filter(x => zones.indexOf(x) >= 0)[0];
    const ze = zs.querySelector(`[data-z="${z}"]`);
    it.classList.add('hint'); ze.classList.add('hint');
    g.t(() => { it.classList.remove('hint'); ze.classList.remove('hint'); }, 3800);
    g.toast('Mira: «' + ACT[it.dataset.a].n + '» va en «' + ZONES[z].n + '»');
  };
  list.forEach(a => {
    const it = U.el(`<button class="wx11-it" data-a="${a}" aria-label="${ACT[a].n}">${Kids.art.get(ACT[a].art)}</button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(zs.children),
      onStart: el => { clearSel(); if (focus !== el) { if (focus) focus.classList.remove('focus'); focus = el; el.classList.add('focus'); g.ask(ACT[el.dataset.a].q); } },
      onDrop: (ze, el) => attempt(el, ze),
      onTap: el => { clearSel(); selected = el; el.classList.add('sel'); }
    });
  });
  zs.querySelectorAll('.wx11-z').forEach(ze => {
    const act = () => { if (selected) attempt(selected, ze); else g.toast('Toca primero una actividad'); };
    ze.addEventListener('click', act);
    ze.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
  nextFocus();
}

function orderRound(g, i) {
  const pickd = i === 0 ? ORDER : U.sample(ORDER, 5);
  const chosen = ORDER.filter(k => pickd.indexOf(k) >= 0);
  const n = chosen.length, C = n > 5 ? 8 : n;
  g.ask(i === 0 ? 'Ordena el día: ¿qué hacemos primero y qué hacemos al final?' : 'Ordena estas ' + n + ' cosas, desde que nos levantamos hasta que nos dormimos.');
  const ord = U.el(`<div class="wx11-ord ${n > 5 ? 'big' : ''}" style="--c:${C}"></div>`);
  for (let k = 0; k < n; k++) ord.appendChild(U.el(`<div class="wx11-slot slot" data-k="${k}" role="button" tabindex="0" aria-label="Lugar ${k + 1}"><span class="num">${k + 1}</span></div>`));
  const tray = U.el(`<div class="wx11-otray ${n > 5 ? 'big' : ''}" style="--c:${C}"></div>`);
  let sh; do { sh = U.shuffle(chosen); } while (sh.every((a, k) => a === chosen[k]));
  g.area.appendChild(ord); g.area.appendChild(tray);
  let placed = 0, selected = null, lastTried = null;
  const slotAt = k => ord.children[k];
  function attempt(it, slot) {
    const a = it.dataset.a, idx = chosen.indexOf(a), k = +slot.dataset.k; lastTried = it;
    if (idx === k && !slot.querySelector('.wx11-it')) {
      if (selected) selected.classList.remove('sel'); selected = null;
      it.dataset.locked = '1'; it.style.transform = ''; slot.appendChild(it); slot.classList.add('filled'); Kids.sound.pop(); placed++;
      const nxt = chosen[placed];
      if (placed === n) g.t(() => g.right('¡El día completo, en orden!'), 500);
      else g.toast('¡Bien! ¿Qué viene después de «' + ACT[a].n.toLowerCase() + '»?');
      return true;
    }
    g.shake(it);
    g.wrong('Ese todavía no. Piensa qué pasa antes en el día.');
    return false;
  }
  g.helpHint = () => {
    const a = chosen[placed], it = tray.querySelector(`[data-a="${a}"]`); if (!it) return;
    it.classList.add('hint'); slotAt(placed).classList.add('hot');
    g.t(() => { it.classList.remove('hint'); slotAt(placed) && slotAt(placed).classList.remove('hot'); }, 3800);
    g.toast('Ahora toca: «' + ACT[a].n + '»');
  };
  sh.forEach(a => {
    const it = U.el(`<button class="wx11-it" data-a="${a}" aria-label="${ACT[a].n}">${Kids.art.get(ACT[a].art)}<span class="t">${ACT[a].n}</span></button>`);
    tray.appendChild(it);
    Kids.drag(it, {
      targets: () => Array.from(ord.children),
      onStart: () => { if (selected) selected.classList.remove('sel'); selected = null; },
      onDrop: (slot, el) => attempt(el, slot),
      onTap: el => {
        // tocar: se coloca en el primer hueco libre; si no es el suyo, fallo suave
        attempt(el, slotAt(placed));
      }
    });
  });
}

function questionRound(g, i) {
  const pool = QUESTIONS.slice(), qd = U.pick(pool);
  g.ask(qd.q);
  const keys = U.shuffle([qd.a].concat(U.sample(qd.d, 3)));
  const wrap = U.el('<div class="wx11-q"></div>');
  keys.forEach(a => wrap.appendChild(U.el(`<button class="pic big" data-a="${a}" aria-label="${ACT[a].n}">${Kids.art.get(ACT[a].art)}<span class="lbl">${ACT[a].n}</span></button>`)));
  g.area.appendChild(wrap);
  g.helpHint = () => { const b = wrap.querySelector(`[data-a="${qd.a}"]`); b.classList.add('pulse'); g.toast('Pista: mira «' + ACT[qd.a].n + '»'); };
  wrap.addEventListener('click', e => {
    const b = e.target.closest('.pic'); if (!b || b.disabled) return;
    if (b.dataset.a === qd.a) { b.classList.add('right'); wrap.querySelectorAll('.pic').forEach(x => x.disabled = true); g.right('¡Sí! ' + qd.say); }
    else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
  });
}
})();

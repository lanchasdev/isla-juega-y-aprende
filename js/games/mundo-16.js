/* mundo-16 — ¿Dónde vive? (animales y sus hábitats) */
(function () {
'use strict';
const U = Kids.util;

/* ---------- escenas de hábitat (viewBox 200x140, se recortan con "slice") ---------- */
const S = (inner) => '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>';
const palm = (x, y, lean, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q${lean} -34 ${lean * 1.4} -62" fill="none" stroke="#9A6A3F" stroke-width="7" stroke-linecap="round"/><path d="M0 0 Q${lean} -34 ${lean * 1.4} -62" fill="none" stroke="#B98556" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/><g transform="translate(${lean * 1.4} -62)"><ellipse cx="-17" cy="-3" rx="19" ry="6.5" fill="#3FAF63" transform="rotate(-18 -17 -3)"/><ellipse cx="17" cy="-3" rx="19" ry="6.5" fill="#3FAF63" transform="rotate(18 17 -3)"/><ellipse cx="-9" cy="-13" rx="15" ry="6" fill="#58C777" transform="rotate(-55 -9 -13)"/><ellipse cx="9" cy="-13" rx="15" ry="6" fill="#58C777" transform="rotate(55 9 -13)"/><ellipse cx="0" cy="-17" rx="6" ry="14" fill="#4DBD6E"/><circle cx="-3" cy="2" r="3.5" fill="#C98A3A"/><circle cx="3" cy="3" r="3.5" fill="#B97A2E"/></g></g>`;

Kids.art.add({
  'mundo16-sea': S(`<defs><linearGradient id="mundo16-sea-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBF1FC"/><stop offset=".3" stop-color="#76CBF0"/><stop offset="1" stop-color="#2F86C9"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo16-sea-g)"/>
    <path d="M30 0 L60 0 L100 140 L40 140Z M120 0 L140 0 L190 140 L140 140Z" fill="#fff" opacity=".13"/>
    <path d="M-5 20 q12.5 -9 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0" fill="none" stroke="#fff" stroke-width="3.5" opacity=".75" stroke-linecap="round"/>
    <path d="M-5 34 q12.5 -7 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0" fill="none" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"/>
    <path d="M0 122 Q45 106 100 119 T200 112 V140 H0Z" fill="#F6E3AE"/><path d="M0 130 Q60 120 110 130 T200 126 V140 H0Z" fill="#EBD28F"/>
    <ellipse cx="164" cy="118" rx="23" ry="15" fill="#A99BD6"/><ellipse cx="180" cy="124" rx="17" ry="10" fill="#8C7BE0"/><ellipse cx="158" cy="112" rx="9" ry="4" fill="#C6BBEB" opacity=".8"/>
    <g fill="none" stroke="#3FB27F" stroke-width="5" stroke-linecap="round"><path d="M22 124 q-9 -14 0 -26 q9 -12 0 -26"/><path d="M34 126 q8 -10 0 -20 q-8 -10 0 -18" stroke="#58C98F"/><path d="M130 124 q-8 -12 0 -22 q8 -10 0 -20" stroke="#58C98F"/></g>
    <g fill="none" stroke="#fff" stroke-width="1.8" opacity=".85"><circle cx="70" cy="70" r="4"/><circle cx="78" cy="52" r="2.6"/><circle cx="150" cy="60" r="3.4"/><circle cx="104" cy="88" r="2.4"/><circle cx="46" cy="44" r="2"/></g>
    <path d="M96 122l3 -7 3 7 -7 -4.3h8z" fill="#FF8F7A"/><ellipse cx="120" cy="127" rx="5" ry="3.4" fill="#FFB7A8"/>`),
  'mundo16-farm': S(`<defs><linearGradient id="mundo16-farm-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AEDDF8"/><stop offset="1" stop-color="#E8F7FF"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo16-farm-g)"/>
    <circle cx="168" cy="30" r="22" fill="#FFE98F" opacity=".5"/><circle cx="168" cy="30" r="14" fill="#FFD23F"/>
    <g fill="#fff"><ellipse cx="46" cy="30" rx="18" ry="8"/><ellipse cx="60" cy="26" rx="12" ry="8"/><ellipse cx="110" cy="42" rx="14" ry="6"/><ellipse cx="120" cy="38" rx="9" ry="6"/></g>
    <path d="M0 78 Q50 52 100 74 T200 66 V140 H0Z" fill="#A9DE9A"/><path d="M0 98 Q70 78 130 96 T200 90 V140 H0Z" fill="#8ED69A"/><path d="M0 122 Q80 108 200 120 V140 H0Z" fill="#78C887"/>
    <g transform="translate(24 0)"><rect x="22" y="62" width="62" height="48" rx="3" fill="#E8574A"/><polygon points="14,64 53,36 92,64" fill="#B83A3A"/><polygon points="26,63 53,42 80,63" fill="#D14A44"/><rect x="40" y="76" width="26" height="34" rx="2" fill="#fff"/><path d="M40 76 L66 110 M66 76 L40 110" stroke="#E8574A" stroke-width="3"/><circle cx="53" cy="52" r="5" fill="#FFF3D6"/><rect x="26" y="70" width="10" height="10" rx="2" fill="#FFF3D6"/><rect x="70" y="70" width="10" height="10" rx="2" fill="#FFF3D6"/></g>
    <g fill="#EBC58C"><rect x="112" y="96" width="5" height="26" rx="2"/><rect x="134" y="96" width="5" height="26" rx="2"/><rect x="156" y="96" width="5" height="26" rx="2"/><rect x="178" y="96" width="5" height="26" rx="2"/><rect x="108" y="102" width="80" height="4.5" rx="2"/><rect x="108" y="112" width="80" height="4.5" rx="2"/></g>
    <g><circle cx="100" cy="124" r="2.6" fill="#fff"/><circle cx="96" cy="128" r="2.2" fill="#FF8FA3"/><circle cx="14" cy="126" r="2.6" fill="#FFD23F"/><circle cx="196" cy="128" r="2.6" fill="#fff"/><circle cx="150" cy="130" r="2.2" fill="#FFD23F"/></g>`),
  'mundo16-jungle': S(`<defs><linearGradient id="mundo16-jungle-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6F7B5"/><stop offset=".5" stop-color="#8ED69A"/><stop offset="1" stop-color="#3FA56A"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo16-jungle-g)"/>
    <circle cx="100" cy="22" r="26" fill="#FFF4B8" opacity=".6"/>
    <path d="M0 96 Q50 70 100 92 T200 84 V140 H0Z" fill="#6CC27F"/>
    ${palm(40, 118, -6, 1)}${palm(162, 120, 8, 1.1)}
    <g fill="none" stroke="#2F8F55" stroke-width="3" stroke-linecap="round"><path d="M92 0 q6 30 -4 56 q-4 10 2 22"/><path d="M118 0 q-8 24 2 44"/><path d="M70 0 q-4 16 2 28"/></g>
    <g fill="#2F8F55"><ellipse cx="88" cy="62" rx="5" ry="3" transform="rotate(40 88 62)"/><ellipse cx="120" cy="40" rx="5" ry="3" transform="rotate(-40 120 40)"/><ellipse cx="72" cy="26" rx="4" ry="2.6"/></g>
    <path d="M0 140 Q0 104 36 112 Q22 126 30 140Z" fill="#2F9E5E"/><path d="M200 140 Q204 104 168 112 Q184 126 176 140Z" fill="#2F9E5E"/>
    <path d="M100 140 Q94 124 70 124 Q88 134 96 140Z M100 140 Q106 124 130 124 Q112 134 104 140Z" fill="#4DBD6E"/>
    <g><circle cx="58" cy="128" r="4" fill="#FF7E69"/><circle cx="58" cy="128" r="1.6" fill="#FFD23F"/><circle cx="144" cy="132" r="4" fill="#FF8FA3"/><circle cx="144" cy="132" r="1.6" fill="#FFD23F"/></g>`),
  'mundo16-pole': S(`<defs><linearGradient id="mundo16-pole-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3C4AA8"/><stop offset=".55" stop-color="#7C8FE0"/><stop offset="1" stop-color="#C8E1FF"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo16-pole-g)"/>
    <path d="M0 40 Q40 6 80 32 T170 22 T210 36 V56 Q160 40 120 56 T40 54 T0 62Z" fill="#6BF0B0" opacity=".45"/><path d="M0 52 Q50 22 90 44 T200 34 V46 Q150 40 100 58 T0 66Z" fill="#E88CF0" opacity=".3"/>
    <g fill="#fff"><circle cx="20" cy="14" r="1.4"/><circle cx="64" cy="8" r="1.2"/><circle cx="110" cy="16" r="1.5"/><circle cx="150" cy="6" r="1.2"/><circle cx="184" cy="14" r="1.5"/><circle cx="40" cy="30" r="1"/></g>
    <polygon points="112,100 134,52 148,70 162,40 186,100" fill="#EAF6FF"/><polygon points="148,70 162,40 186,100 150,100" fill="#C8E4F8"/><polygon points="30,104 52,66 66,84 80,60 104,104" fill="#F4FAFF"/><polygon points="66,84 80,60 104,104 70,104" fill="#CFE6F9"/>
    <path d="M0 96 Q60 84 110 96 T200 92 V140 H0Z" fill="#F4FAFF"/><path d="M0 114 Q70 102 130 114 T200 110 V140 H0Z" fill="#E1F0FC"/><path d="M0 130 Q80 122 200 130 V140 H0Z" fill="#CFE6F9"/>
    <g fill="#fff" opacity=".9"><circle cx="150" cy="124" r="2"/><circle cx="26" cy="124" r="2"/><circle cx="90" cy="132" r="1.6"/></g>`)
});

/* ---------- datos ---------- */
const HABS = {
  mar:    { name: 'Mar',    art: 'mundo16-sea',    where: 'en el mar',    animals: ['dolphin', 'fish', 'crab', 'whale'] },
  granja: { name: 'Granja', art: 'mundo16-farm',   where: 'en la granja', animals: ['cow', 'pig', 'horse', 'sheep', 'hen'] },
  selva:  { name: 'Selva',  art: 'mundo16-jungle', where: 'en la selva',  animals: ['monkey', 'parrot', 'lion', 'elephant', 'giraffe'] },
  polo:   { name: 'Polo',   art: 'mundo16-pole',   where: 'en el polo',   animals: ['penguin', 'polarbear'] }
};
const NAMES = {
  dolphin: 'el delfín', fish: 'el pez', crab: 'el cangrejo', whale: 'la ballena',
  cow: 'la vaca', pig: 'el cerdo', horse: 'el caballo', sheep: 'la oveja', hen: 'la gallina',
  monkey: 'el mono', parrot: 'el loro', lion: 'el león', elephant: 'el elefante', giraffe: 'la jirafa',
  penguin: 'el pingüino', polarbear: 'el oso polar'
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const homeOf = {};
Object.keys(HABS).forEach(h => HABS[h].animals.forEach(a => { homeOf[a] = h; }));

Kids.css(`
.g-mundo-16 .m16-habs{display:grid;gap:.9rem;width:100%;max-width:70rem;flex:0 1 auto;min-height:0;grid-template-columns:repeat(var(--n),1fr);grid-auto-rows:clamp(11rem,40vh,23rem)}
.g-mundo-16 .m16-hab{position:relative;border-radius:1.8rem;overflow:hidden;box-shadow:0 .4rem 0 rgba(20,35,91,.14);border:.25rem solid #fff;transition:transform .15s,box-shadow .15s;cursor:pointer;min-height:0}
.g-mundo-16 .m16-hab>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-16 .m16-hab.hot{transform:scale(1.03);box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 rgba(20,35,91,.14)}
.g-mundo-16 .m16-hab.hint{animation:pulse .7s 6}
.g-mundo-16 .m16-hab .lbl{position:absolute;left:50%;top:.5rem;transform:translateX(-50%);background:#fff;border-radius:999px;padding:.05rem 1.1rem;font-family:'Baloo 2';font-weight:800;font-size:1.5rem;line-height:1.35;box-shadow:0 .2rem 0 rgba(20,35,91,.14);z-index:3;white-space:nowrap}
.g-mundo-16 .m16-layer{position:absolute;left:3%;right:3%;bottom:3%;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:.1rem;z-index:2;pointer-events:none}
.g-mundo-16 .m16-layer>i{display:block;width:min(30%,4.6rem);aspect-ratio:1;animation:pop .5s}
.g-mundo-16 .m16-layer svg,.g-mundo-16 .m16-an svg{width:100%;height:100%;display:block}
.g-mundo-16 .m16-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem;min-height:calc(var(--sz) + 1.4rem);flex:none;position:relative;z-index:5}
.g-mundo-16{--sz:clamp(4rem,12vmin,6.2rem)}
.g-mundo-16 .m16-an{width:var(--sz);height:var(--sz);background:#fff;border-radius:1.2rem;padding:.25rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);position:relative}
.g-mundo-16 .m16-an.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-16 .m16-an.hint{animation:bounce .6s 5}
.g-mundo-16 .m16-an svg{pointer-events:none}
.g-mundo-16 .m16-habs.quad{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(9rem,25vh,16rem)}
@media (max-width:640px){.g-mundo-16 .m16-habs.many{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(8rem,23vh,14rem)}.g-mundo-16 .m16-hab .lbl{font-size:1.2rem}}
`);

Kids.game({
  id: 'mundo-16', group: 'mundo', num: 1,
  title: '¿Dónde vive?',
  blurb: 'Lleva cada animal a la casa donde vive.',
  how: 'Arrastra cada animal hasta el sitio donde vive. También puedes tocar el animal y luego tocar su casa.',
  icon: 'penguin',
  levels: ['2 casas', '3 casas', '4 casas'],
  rounds: 3,
  round(g, i) {
    const nh = g.level + 1;
    const habIds = U.sample(Object.keys(HABS), nh);
    // al menos un animal de cada casa, luego el resto al azar
    const total = g.level === 1 ? 3 : g.level === 2 ? 5 : U.rnd(6, 8);
    let list = habIds.map(h => U.pick(HABS[h].animals));
    const rest = U.shuffle([].concat(...habIds.map(h => HABS[h].animals)).filter(a => list.indexOf(a) < 0));
    list = U.shuffle(list.concat(rest.slice(0, total - list.length)));

    const wrap = U.el('<div style="display:contents"></div>');
    const habsEl = U.el(`<div class="m16-habs ${nh >= 3 ? 'many' : ''} ${nh >= 4 ? 'quad' : ''}" style="--n:${nh}"></div>`);
    habIds.forEach(h => {
      const d = U.el(`<div class="m16-hab" role="button" tabindex="0" data-h="${h}" aria-label="${HABS[h].name}">${Kids.art.get(HABS[h].art)}<span class="lbl">${HABS[h].name}</span><div class="m16-layer"></div></div>`);
      habsEl.appendChild(d);
    });
    const tray = U.el('<div class="m16-tray"></div>');
    wrap.appendChild(habsEl); wrap.appendChild(tray); g.area.appendChild(wrap);

    let remaining = list.length, selected = null, lastTried = null;
    const habEl = h => habsEl.querySelector(`[data-h="${h}"]`);
    const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };

    function attempt(an, hab) {
      const a = an.dataset.a, h = hab.dataset.h;
      lastTried = an;
      if (homeOf[a] === h) {
        clearSel();
        an.dataset.locked = '1';
        hab.querySelector('.m16-layer').appendChild(U.el(`<i>${Kids.art.get(a)}</i>`));
        an.remove(); Kids.sound.pop();
        g.say(cap(NAMES[a]) + ' vive ' + HABS[h].where);
        remaining--;
        if (remaining === 0) g.t(() => g.right('¡Todos están en casa!'), 700);
        return true;
      }
      g.shake(an);
      g.wrong('Mmm, ¿' + NAMES[a] + ' vive ' + HABS[h].where + '? ¡Prueba otra vez!');
      return false;
    }
    g.helpHint = () => {
      const an = (lastTried && lastTried.isConnected) ? lastTried : tray.querySelector('.m16-an');
      if (!an) return;
      const hb = habEl(homeOf[an.dataset.a]);
      an.classList.add('hint'); hb.classList.add('hint');
      g.t(() => { an.classList.remove('hint'); hb.classList.remove('hint'); }, 3800);
      g.toast('Mira: ' + cap(NAMES[an.dataset.a]) + ' vive ' + HABS[homeOf[an.dataset.a]].where);
    };

    list.forEach(a => {
      const an = U.el(`<button class="m16-an" data-a="${a}" aria-label="${cap(NAMES[a])}">${Kids.art.get(a)}</button>`);
      tray.appendChild(an);
      Kids.drag(an, {
        targets: () => Array.from(habsEl.children),
        onStart: () => { clearSel(); },
        onDrop: (hab, el) => attempt(el, hab),
        onTap: el => {
          if (selected === el) { clearSel(); return; }
          clearSel(); selected = el; el.classList.add('sel'); g.say(cap(NAMES[el.dataset.a]));
        }
      });
    });
    habsEl.querySelectorAll('.m16-hab').forEach(hb => {
      const act = () => { if (selected) attempt(selected, hb); else g.toast('Toca primero un animal'); };
      hb.addEventListener('click', act);
      hb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
    g.ask('¿Dónde vive cada animal? Llévalo a su casa');
  }
});
})();

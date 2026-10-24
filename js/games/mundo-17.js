/* mundo-17 — Las estaciones */
(function () {
'use strict';
const U = Kids.util;
const S = (inner) => '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>';

Kids.art.add({
  'mundo17-spring': S(`<defs><linearGradient id="mundo17-sp-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BDE6FB"/><stop offset="1" stop-color="#F0FAFF"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo17-sp-g)"/>
    <g fill="#fff"><ellipse cx="150" cy="24" rx="18" ry="8"/><ellipse cx="164" cy="20" rx="12" ry="8"/><ellipse cx="40" cy="34" rx="14" ry="6"/></g>
    <path d="M0 86 Q50 64 110 84 T200 76 V140 H0Z" fill="#B3E59C"/><path d="M0 108 Q80 88 150 106 T200 102 V140 H0Z" fill="#8ED69A"/>
    <rect x="42" y="62" width="9" height="44" rx="4" fill="#A37350"/>
    <g fill="#FFB3C7"><circle cx="46" cy="52" r="24"/><circle cx="26" cy="64" r="14"/><circle cx="66" cy="64" r="15"/></g><g fill="#FFD0DD"><circle cx="38" cy="46" r="10"/><circle cx="58" cy="54" r="9"/><circle cx="30" cy="62" r="7"/></g>
    <g fill="#FF8FB1"><circle cx="40" cy="58" r="2.4"/><circle cx="56" cy="44" r="2.4"/><circle cx="66" cy="66" r="2.4"/></g>
    <g><g transform="translate(110 120)"><path d="M0 0v-14" stroke="#4DBD6E" stroke-width="2.4"/><circle cy="-17" r="5" fill="#FF7EA8"/><circle cy="-17" r="2.2" fill="#FFD23F"/></g>
    <g transform="translate(136 124)"><path d="M0 0v-12" stroke="#4DBD6E" stroke-width="2.4"/><circle cy="-15" r="5" fill="#FFD23F"/><circle cy="-15" r="2.2" fill="#fff"/></g>
    <g transform="translate(160 118)"><path d="M0 0v-16" stroke="#4DBD6E" stroke-width="2.4"/><circle cy="-19" r="5" fill="#fff"/><circle cy="-19" r="2.2" fill="#FF8F3A"/></g>
    <g transform="translate(88 128)"><path d="M0 0v-10" stroke="#4DBD6E" stroke-width="2.4"/><circle cy="-13" r="4.4" fill="#B79CFF"/><circle cy="-13" r="2" fill="#FFD23F"/></g></g>
    <g transform="translate(112 52)"><path d="M0 0 C-12 -12 -14 4 0 2Z M0 0 C12 -12 14 4 0 2Z" fill="#FF9A5C"/><path d="M0 2 C-9 4 -8 12 0 5Z M0 2 C9 4 8 12 0 5Z" fill="#FFC27A"/><rect x="-1" y="-3" width="2" height="9" rx="1" fill="#6B4A3A"/></g>
    <g transform="translate(150 66) scale(.8)"><path d="M0 0 C-12 -12 -14 4 0 2Z M0 0 C12 -12 14 4 0 2Z" fill="#8C7BE0"/><path d="M0 2 C-9 4 -8 12 0 5Z M0 2 C9 4 8 12 0 5Z" fill="#B7A8F0"/><rect x="-1" y="-3" width="2" height="9" rx="1" fill="#6B4A3A"/></g>`),
  'mundo17-summer': S(`<defs><linearGradient id="mundo17-su-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CD0F5"/><stop offset="1" stop-color="#D5F1FD"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo17-su-g)"/>
    <circle cx="160" cy="34" r="32" fill="#FFE98F" opacity=".45"/><circle cx="160" cy="34" r="22" fill="#FFD23F"/>
    <g stroke="#FFC107" stroke-width="3" stroke-linecap="round"><path d="M160 4v-4M160 64v4M130 34h-5M195 34h5M138 12l-3 -3M182 56l3 3M182 12l3 -3M138 56l-3 3"/></g>
    <path d="M0 78 Q50 68 100 78 T200 76 V100 H0Z" fill="#3FA9DE"/><path d="M0 84 q12.5 -5 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".75"/>
    <path d="M0 98 Q60 88 120 98 T200 96 V140 H0Z" fill="#F8E4A8"/><path d="M0 118 Q70 108 140 118 T200 116 V140 H0Z" fill="#F0D488"/>
    <g><rect x="48" y="62" width="4" height="52" rx="2" fill="#B98556"/><path d="M20 66 Q50 30 80 66Z" fill="#FF7E69"/><path d="M50 66 Q50 38 80 66Z" fill="#FFB347" opacity=".9"/><path d="M20 66 Q35 52 50 66 Q65 52 80 66" fill="none" stroke="#fff" stroke-width="2.4"/></g>
    <ellipse cx="50" cy="118" rx="22" ry="5" fill="#E2BF6B" opacity=".6"/>
    <path d="M110 120 l8 -8 l8 8z" fill="#FFB3C7"/><circle cx="150" cy="124" r="4" fill="#FF8FA3"/><path d="M148 124 l4 3" stroke="#fff" stroke-width="1.4"/>
    <path d="M168 124l3 -6 3 6 -6 -3.6h6z" fill="#FF8F7A"/>`),
  'mundo17-autumn': S(`<defs><linearGradient id="mundo17-au-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD9A8"/><stop offset="1" stop-color="#FFF1D6"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo17-au-g)"/>
    <ellipse cx="40" cy="30" rx="20" ry="7" fill="#fff" opacity=".7"/><ellipse cx="156" cy="40" rx="18" ry="6" fill="#fff" opacity=".7"/>
    <path d="M0 88 Q50 70 110 88 T200 80 V140 H0Z" fill="#E3B867"/><path d="M0 112 Q80 94 150 110 T200 106 V140 H0Z" fill="#C9954A"/>
    <rect x="94" y="64" width="12" height="52" rx="5" fill="#8B5E3C"/>
    <g fill="#F28A30"><circle cx="100" cy="48" r="28"/><circle cx="76" cy="62" r="17"/><circle cx="124" cy="62" r="17"/></g><g fill="#FFB347"><circle cx="90" cy="40" r="12"/><circle cx="114" cy="50" r="10"/><circle cx="76" cy="58" r="8"/></g><g fill="#D9541E"><circle cx="106" cy="36" r="6"/><circle cx="124" cy="64" r="6"/><circle cx="84" cy="70" r="5"/></g>
    <g fill="#E8602C"><path d="M30 60 q8 -4 10 4 q-6 6 -10 -4z" transform="rotate(20 35 62)"/><path d="M158 52 q8 -4 10 4 q-6 6 -10 -4z" transform="rotate(-30 163 54)"/><path d="M52 92 q8 -4 10 4 q-6 6 -10 -4z"/></g>
    <g fill="#F5B83D"><path d="M170 86 q8 -4 10 4 q-6 6 -10 -4z" transform="rotate(40 175 88)"/><path d="M20 100 q8 -4 10 4 q-6 6 -10 -4z"/></g>
    <g fill="#D9541E"><path d="M60 124 q8 -4 10 4 q-6 6 -10 -4z"/><path d="M140 126 q8 -4 10 4 q-6 6 -10 -4z"/></g><g fill="#F28A30"><path d="M104 128 q8 -4 10 4 q-6 6 -10 -4z"/><path d="M26 126 q8 -4 10 4 q-6 6 -10 -4z"/></g>`),
  'mundo17-winter': S(`<defs><linearGradient id="mundo17-wi-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FB6E8"/><stop offset="1" stop-color="#E6F1FF"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mundo17-wi-g)"/>
    <g fill="#fff"><circle cx="20" cy="14" r="2"/><circle cx="60" cy="30" r="2.4"/><circle cx="96" cy="12" r="2"/><circle cx="140" cy="26" r="2.6"/><circle cx="180" cy="12" r="2"/><circle cx="40" cy="58" r="2"/><circle cx="120" cy="50" r="2"/><circle cx="170" cy="60" r="2.4"/><circle cx="80" cy="64" r="1.8"/></g>
    <path d="M0 82 Q50 60 110 80 T200 72 V140 H0Z" fill="#F4F9FF"/><path d="M0 104 Q80 86 150 102 T200 98 V140 H0Z" fill="#fff"/><path d="M0 126 Q80 114 200 124 V140 H0Z" fill="#E4EEFB"/>
    <rect x="152" y="60" width="7" height="46" rx="3" fill="#8B6A55"/><g fill="#5FB07A"><polygon points="156,26 138,60 174,60"/><polygon points="156,40 134,76 178,76"/><polygon points="156,56 130,92 182,92"/></g><g fill="#fff"><path d="M156 26 l-9 17 q9 -4 18 0z"/><path d="M156 42 l-12 20 q12 -5 24 0z"/><path d="M156 58 l-14 22 q14 -5 28 0z"/></g>
    <g transform="translate(60 110)"><ellipse cx="0" cy="12" rx="22" ry="5" fill="#C5D6F0" opacity=".7"/><circle cy="-2" r="16" fill="#fff"/><circle cy="-26" r="12" fill="#fff"/><circle cx="-4" cy="-28" r="1.8" fill="#14235B"/><circle cx="4" cy="-28" r="1.8" fill="#14235B"/><path d="M0 -25 l9 2 -9 2z" fill="#FF8F3A"/><path d="M-4 -21 q4 3 8 0" fill="none" stroke="#14235B" stroke-width="1.2"/><circle cy="-4" r="1.6" fill="#14235B"/><circle cy="3" r="1.6" fill="#14235B"/><path d="M-12 -2 L-26 -12 M12 -2 L26 -12" stroke="#8B6A55" stroke-width="2.4" stroke-linecap="round"/></g>`)
});

/* cada objeto tiene UNA estación clara */
const SEASONS = {
  primavera: { name: 'Primavera', art: 'mundo17-spring', items: ['blossom', 'butterfly', 'flower', 'kite'] },
  verano:    { name: 'Verano',    art: 'mundo17-summer', items: ['swimsuit', 'sandal', 'hat', 'sun', 'tshirt'] },
  otono:     { name: 'Otoño',     art: 'mundo17-autumn', items: ['leaf', 'umbrella', 'raindrop'] },
  invierno:  { name: 'Invierno',  art: 'mundo17-winter', items: ['beanie', 'scarf', 'snowman', 'snowflake'] }
};
/* nombre y frase de pregunta */
const ITEMS = {
  blossom:   { n: 'la flor de cerezo', q: '¿En qué estación florecen los cerezos?' },
  butterfly: { n: 'la mariposa', q: '¿En qué estación salen las mariposas?' },
  flower:    { n: 'la flor', q: '¿En qué estación se llenan de flores los campos?', arg: '#FF7EA8' },
  kite:      { n: 'la cometa', q: '¿En qué estación volamos la cometa con el viento suave?' },
  swimsuit:  { n: 'el bañador', q: '¿En qué estación usamos el bañador?' },
  sandal:    { n: 'la sandalia', q: '¿En qué estación usamos las sandalias?' },
  hat:       { n: 'el sombrero', q: '¿En qué estación usamos el sombrero para el sol?' },
  sun:       { n: 'el sol', q: '¿En qué estación hace más calor con el sol?' },
  tshirt:    { n: 'la camiseta', q: '¿En qué estación usamos camiseta de manga corta?' },
  leaf:      { n: 'la hoja', q: '¿En qué estación caen las hojas de los árboles?' },
  umbrella:  { n: 'el paraguas', q: '¿En qué estación usamos el paraguas en los días de lluvia?' },
  raindrop:  { n: 'la gota', q: '¿En qué estación llueve y llueve?' },
  beanie:    { n: 'el gorro', q: '¿En qué estación usamos el gorro?' },
  scarf:     { n: 'la bufanda', q: '¿En qué estación usamos la bufanda?' },
  snowman:   { n: 'el muñeco de nieve', q: '¿En qué estación hacemos un muñeco de nieve?' },
  snowflake: { n: 'el copo de nieve', q: '¿En qué estación caen los copos de nieve?' }
};
const homeOf = {};
Object.keys(SEASONS).forEach(s => SEASONS[s].items.forEach(a => { homeOf[a] = s; }));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

Kids.css(`
.g-mundo-17{--sz:clamp(4rem,12vmin,6.2rem)}
.g-mundo-17 .m17-ss{display:grid;gap:.9rem;width:100%;max-width:70rem;flex:0 1 auto;min-height:0;grid-template-columns:repeat(var(--n),1fr);grid-auto-rows:clamp(11rem,40vh,23rem)}
.g-mundo-17 .m17-s{position:relative;border-radius:1.8rem;overflow:hidden;box-shadow:0 .4rem 0 rgba(20,35,91,.14);border:.25rem solid #fff;transition:transform .15s,box-shadow .15s;cursor:pointer;min-height:0}
.g-mundo-17 .m17-s>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-17 .m17-s.hot{transform:scale(1.03);box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 rgba(20,35,91,.14)}
.g-mundo-17 .m17-s.hint{animation:pulse .7s 6}
.g-mundo-17 .m17-s .lbl{position:absolute;left:50%;top:.5rem;transform:translateX(-50%);background:#fff;border-radius:999px;padding:.05rem 1.1rem;font-family:'Baloo 2';font-weight:800;font-size:1.5rem;line-height:1.35;box-shadow:0 .2rem 0 rgba(20,35,91,.14);z-index:3;white-space:nowrap}
.g-mundo-17 .m17-layer{position:absolute;left:3%;right:3%;bottom:3%;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:.1rem;z-index:2;pointer-events:none}
.g-mundo-17 .m17-layer>i{display:block;width:min(30%,4.4rem);aspect-ratio:1;animation:pop .5s}
.g-mundo-17 .m17-layer svg,.g-mundo-17 .m17-it svg{width:100%;height:100%;display:block}
.g-mundo-17 .m17-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem;min-height:calc(var(--sz) + 1.4rem);flex:none;position:relative;z-index:5}
.g-mundo-17 .m17-it{width:var(--sz);height:var(--sz);background:#fff;border-radius:1.2rem;padding:.3rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);position:relative}
.g-mundo-17 .m17-it.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-17 .m17-it.hint{animation:bounce .6s 5}
.g-mundo-17 .m17-it.focus{border-color:var(--g)}
.g-mundo-17 .m17-it svg{pointer-events:none}
.g-mundo-17 .m17-ss.quad{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(9rem,25vh,16rem)}
@media (max-width:640px){.g-mundo-17 .m17-ss.many{grid-template-columns:repeat(2,1fr);grid-auto-rows:clamp(8rem,23vh,14rem)}.g-mundo-17 .m17-s .lbl{font-size:1.2rem}}
`);

Kids.game({
  id: 'mundo-17', group: 'mundo', num: 2,
  title: 'Las estaciones',
  blurb: 'Lleva cada cosa a la estación del año donde la usamos o la vemos.',
  how: 'Arrastra cada cosa a su estación del año. También puedes tocar la cosa y luego tocar la estación.',
  icon: 'leaf',
  levels: ['2 estaciones', '3 estaciones', '4 estaciones'],
  rounds: 3,
  round(g, i) {
    const ids = g.level === 1 ? ['verano', 'invierno'] : U.sample(Object.keys(SEASONS), g.level + 1);
    const total = g.level === 1 ? 3 : g.level === 2 ? 5 : U.rnd(6, 8);
    let list = ids.map(s => U.pick(SEASONS[s].items));
    const rest = U.shuffle([].concat(...ids.map(s => SEASONS[s].items)).filter(a => list.indexOf(a) < 0));
    list = U.shuffle(list.concat(rest.slice(0, total - list.length)));

    const wrap = U.el('<div style="display:contents"></div>');
    const ssEl = U.el(`<div class="m17-ss ${ids.length >= 3 ? 'many' : ''} ${ids.length >= 4 ? 'quad' : ''}" style="--n:${ids.length}"></div>`);
    U.shuffle(ids).forEach(s => ssEl.appendChild(U.el(`<div class="m17-s" role="button" tabindex="0" data-s="${s}" aria-label="${SEASONS[s].name}">${Kids.art.get(SEASONS[s].art)}<span class="lbl">${SEASONS[s].name}</span><div class="m17-layer"></div></div>`)));
    const tray = U.el('<div class="m17-tray"></div>');
    wrap.appendChild(ssEl); wrap.appendChild(tray); g.area.appendChild(wrap);

    let remaining = list.length, selected = null, lastTried = null, focus = null;
    const sEl = s => ssEl.querySelector(`[data-s="${s}"]`);
    const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };
    const artOf = a => Kids.art.get(a, ITEMS[a].arg);

    function nextFocus() {
      if (focus) focus.classList.remove('focus');
      focus = tray.querySelector('.m17-it');
      if (focus) { focus.classList.add('focus'); g.ask(ITEMS[focus.dataset.a].q); }
    }
    function attempt(it, se) {
      const a = it.dataset.a, s = se.dataset.s;
      lastTried = it;
      if (homeOf[a] === s) {
        clearSel(); it.dataset.locked = '1';
        se.querySelector('.m17-layer').appendChild(U.el(`<i>${artOf(a)}</i>`));
        it.remove(); Kids.sound.pop();
        remaining--;
        if (remaining === 0) { g.say('¡Todo en su estación!'); g.t(() => g.right('¡Cada cosa en su estación!'), 600); }
        else { if (it === focus) focus = null; nextFocus(); }
        return true;
      }
      g.shake(it);
      g.wrong('Mmm, ' + ITEMS[a].n + ' no es de ' + SEASONS[s].name.toLowerCase() + '. ¡Prueba otra vez!');
      return false;
    }
    g.helpHint = () => {
      const it = (lastTried && lastTried.isConnected) ? lastTried : tray.querySelector('.m17-it');
      if (!it) return;
      const se = sEl(homeOf[it.dataset.a]);
      it.classList.add('hint'); se.classList.add('hint');
      g.t(() => { it.classList.remove('hint'); se.classList.remove('hint'); }, 3800);
      g.toast('Mira: ' + cap(ITEMS[it.dataset.a].n) + ' va en ' + SEASONS[homeOf[it.dataset.a]].name);
    };

    list.forEach(a => {
      const it = U.el(`<button class="m17-it" data-a="${a}" aria-label="${cap(ITEMS[a].n)}">${artOf(a)}</button>`);
      tray.appendChild(it);
      Kids.drag(it, {
        targets: () => Array.from(ssEl.children),
        onStart: el => { clearSel(); if (focus !== el) { if (focus) focus.classList.remove('focus'); focus = el; el.classList.add('focus'); g.ask(ITEMS[el.dataset.a].q); } },
        onDrop: (se, el) => attempt(el, se),
        onTap: el => {
          clearSel(); selected = el; el.classList.add('sel');
        }
      });
    });
    ssEl.querySelectorAll('.m17-s').forEach(se => {
      const act = () => { if (selected) attempt(selected, se); else g.toast('Toca primero una cosa'); };
      se.addEventListener('click', act);
      se.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
    nextFocus();
  }
});
})();

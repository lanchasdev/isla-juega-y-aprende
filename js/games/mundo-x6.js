/* mundo-x6 — Medios de transporte */
(function () {
'use strict';
const U = Kids.util;
const S = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const Z = (inner) => '<svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>';
const sh = '<ellipse cx="50" cy="90" rx="34" ry="3.5" fill="#3b2a1a" opacity=".14"/>';
const wheel = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3C4A7A"/><circle cx="${x}" cy="${y}" r="${r * .5}" fill="#DDE4F5"/><circle cx="${x}" cy="${y}" r="${r * .16}" fill="#3C4A7A"/>`;

Kids.art.add({
  'mx6-bus': S(`${sh}<rect x="8" y="30" width="84" height="48" rx="11" fill="#FFB347"/><rect x="8" y="62" width="84" height="8" fill="#F29A1E"/>
    <g fill="#CFEAFB"><rect x="14" y="37" width="15" height="14" rx="3"/><rect x="33" y="37" width="15" height="14" rx="3"/><rect x="52" y="37" width="15" height="14" rx="3"/><rect x="71" y="37" width="15" height="22" rx="3"/></g>
    <rect x="86" y="68" width="6" height="5" rx="2" fill="#FFF3A8"/>${wheel(28, 80, 8)}${wheel(72, 80, 8)}`),
  'mx6-bike': S(`<ellipse cx="50" cy="90" rx="36" ry="3.5" fill="#3b2a1a" opacity=".14"/>
    <circle cx="24" cy="68" r="16" fill="none" stroke="#3C4A7A" stroke-width="4"/><circle cx="76" cy="68" r="16" fill="none" stroke="#3C4A7A" stroke-width="4"/>
    <path d="M24 68L40 44H62L76 68M40 44L50 68H24M50 68L62 44M62 44L68 36" fill="none" stroke="#FF7E69" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 40h12" stroke="#3C4A7A" stroke-width="5" stroke-linecap="round"/><path d="M63 35h9" stroke="#3C4A7A" stroke-width="4.5" stroke-linecap="round"/><circle cx="50" cy="68" r="4" fill="#FFD23F"/>`),
  'mx6-moto': S(`<ellipse cx="50" cy="90" rx="38" ry="3.5" fill="#3b2a1a" opacity=".14"/>
    ${wheel(24, 72, 14)}${wheel(78, 72, 14)}
    <path d="M24 72L40 52H58L78 72" fill="none" stroke="#3C4A7A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M32 54Q42 38 58 46L64 58Q50 66 34 62Z" fill="#8C7BE0"/><rect x="30" y="46" width="22" height="8" rx="4" fill="#3C4A7A"/>
    <path d="M70 52L74 38H84" fill="none" stroke="#3C4A7A" stroke-width="4" stroke-linecap="round"/><circle cx="74" cy="53" r="4" fill="#FFF3A8"/>`),
  'mx6-sailboat': S(`<ellipse cx="50" cy="90" rx="34" ry="3.5" fill="#3b2a1a" opacity=".12"/>
    <rect x="48" y="12" width="4" height="58" rx="2" fill="#8B5E3C"/><path d="M52 14L84 62H52Z" fill="#fff" stroke="#DDE4F5" stroke-width="1.5"/><path d="M47 24L20 62H47Z" fill="#FF7E69"/>
    <path d="M12 68H88L78 84Q50 90 22 84Z" fill="#4C8DF6"/><path d="M12 68H88" stroke="#fff" stroke-width="3"/><path d="M52 12l10 4-10 4z" fill="#FFD23F"/>`),
  'mx6-sub': S(`<ellipse cx="50" cy="88" rx="34" ry="3" fill="#3b2a1a" opacity=".1"/>
    <path d="M46 34V24H58" fill="none" stroke="#C48A12" stroke-width="4" stroke-linecap="round"/><rect x="40" y="32" width="22" height="10" rx="4" fill="#F2B93B"/>
    <ellipse cx="50" cy="56" rx="40" ry="20" fill="#FFD23F"/><ellipse cx="46" cy="64" rx="32" ry="8" fill="#F2B93B" opacity=".5"/>
    <path d="M86 56l10-14v28z" fill="#F2B93B"/><g fill="#CFEAFB" stroke="#C48A12" stroke-width="2.5"><circle cx="30" cy="54" r="6"/><circle cx="50" cy="54" r="6"/><circle cx="70" cy="54" r="6"/></g>
    <circle cx="86" cy="76" r="3" fill="#BFE4F7"/><circle cx="92" cy="68" r="2" fill="#BFE4F7"/>`),
  'mx6-ship': S(`<ellipse cx="50" cy="90" rx="38" ry="3" fill="#3b2a1a" opacity=".12"/>
    <rect x="30" y="36" width="34" height="16" rx="3" fill="#fff"/><rect x="38" y="24" width="18" height="14" rx="3" fill="#FFF0C7"/><rect x="44" y="14" width="8" height="12" rx="2" fill="#FF7E69"/>
    <g fill="#8EC9F0"><circle cx="38" cy="44" r="3"/><circle cx="48" cy="44" r="3"/><circle cx="58" cy="44" r="3"/></g>
    <path d="M8 54H92L82 80Q50 86 18 80Z" fill="#E4572E"/><path d="M8 54H92" stroke="#fff" stroke-width="3"/><path d="M14 66H86" stroke="#B83F1D" stroke-width="2" opacity=".5"/>`),
  'mx6-plane': S(`${sh}<path d="M8 50Q10 38 30 38H72Q92 40 94 50Q92 60 72 60H28Q10 60 8 50Z" fill="#fff" stroke="#CFD9EE" stroke-width="2"/>
    <path d="M18 38L8 20H22L36 38Z" fill="#4C8DF6"/><path d="M42 56L30 80H46L66 56Z" fill="#4C8DF6"/><path d="M44 42L34 22H50L64 42Z" fill="#8EB8FA"/>
    <g fill="#8EC9F0"><circle cx="58" cy="47" r="3"/><circle cx="68" cy="47" r="3"/><circle cx="78" cy="47" r="3"/></g><path d="M80 44Q90 44 92 50Q86 50 80 50Z" fill="#8EC9F0"/>`),
  'mx6-heli': S(`<ellipse cx="46" cy="90" rx="30" ry="3" fill="#3b2a1a" opacity=".12"/>
    <path d="M14 14H78M46 14V26" stroke="#3C4A7A" stroke-width="4" stroke-linecap="round"/>
    <path d="M62 52H90L94 40" fill="none" stroke="#E4572E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M90 30V50" stroke="#3C4A7A" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 56Q14 26 44 26Q68 26 70 52Q70 68 48 68H24Q14 66 14 56Z" fill="#FF7E69"/><path d="M20 54Q20 34 38 32V54Z" fill="#CFEAFB"/><path d="M40 32Q58 32 62 48H40Z" fill="#CFEAFB"/>
    <path d="M18 78H66M28 68V78M54 68V78" stroke="#3C4A7A" stroke-width="3.5" stroke-linecap="round"/>`),
  'mx6-hotair': S(`<path d="M50 6C20 6 14 34 28 50Q38 60 40 66H60Q62 60 72 50C86 34 80 6 50 6Z" fill="#FF7E69"/><path d="M50 6C38 14 38 52 42 66H58C62 52 62 14 50 6Z" fill="#FFD23F"/><path d="M32 22Q40 40 44 64" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>
    <path d="M42 68L40 78M58 68L60 78" stroke="#8B5E3C" stroke-width="2"/><rect x="36" y="78" width="28" height="14" rx="4" fill="#C98E5A"/><path d="M36 84H64" stroke="#A56F3E" stroke-width="2"/>`),
  'mx6-rocket': S(`<path d="M50 6C66 20 68 46 64 64H36C32 46 34 20 50 6Z" fill="#fff" stroke="#CFD9EE" stroke-width="2"/><path d="M50 6C58 12 63 20 65 28H35C37 20 42 12 50 6Z" fill="#FF7E69"/>
    <circle cx="50" cy="42" r="8" fill="#8EC9F0" stroke="#4C8DF6" stroke-width="3"/><path d="M36 50L22 70L36 64ZM64 50L78 70L64 64Z" fill="#FF7E69"/>
    <path d="M40 66H60L50 92Z" fill="#FFB347"/><path d="M44 66H56L50 82Z" fill="#FFE98F"/>`),
  /* zonas */
  'mx6-zland': Z(`<defs><linearGradient id="mx6-zl-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBEBFB"/><stop offset="1" stop-color="#EAF7FF"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mx6-zl-g)"/><ellipse cx="40" cy="26" rx="22" ry="8" fill="#fff"/><ellipse cx="150" cy="36" rx="18" ry="7" fill="#fff"/>
    <path d="M0 70Q40 56 90 70T200 64V100H0Z" fill="#A9DB8F"/><rect y="86" width="200" height="54" fill="#8ED69A"/>
    <rect y="94" width="200" height="40" fill="#6C7A9C"/><path d="M0 114H200" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/><rect y="90" width="200" height="5" fill="#B9C4DD"/>
    <g><rect x="150" y="48" width="7" height="30" fill="#A37350"/><circle cx="153" cy="40" r="17" fill="#5FB070"/><circle cx="142" cy="48" r="10" fill="#7FCB8A"/></g>
    <g><rect x="22" y="56" width="30" height="26" fill="#FFE0B2"/><path d="M18 58L37 40L56 58Z" fill="#FF7E69"/><rect x="32" y="66" width="10" height="16" fill="#8B5E3C"/></g>`),
  'mx6-zsea': Z(`<defs><linearGradient id="mx6-zs-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BDE6FB"/><stop offset=".45" stop-color="#E8F7FF"/><stop offset=".46" stop-color="#4FB4E8"/><stop offset="1" stop-color="#2C86C8"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mx6-zs-g)"/><circle cx="160" cy="26" r="14" fill="#FFD23F"/><ellipse cx="50" cy="26" rx="22" ry="8" fill="#fff"/>
    <g fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".8"><path d="M10 80q10 -6 20 0t20 0"/><path d="M90 96q10 -6 20 0t20 0"/><path d="M30 118q10 -6 20 0t20 0"/><path d="M140 76q10 -6 20 0t20 0"/><path d="M150 122q10 -6 20 0t20 0"/></g>
`),
  'mx6-zair': Z(`<defs><linearGradient id="mx6-za-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6EC1F2"/><stop offset="1" stop-color="#D8F0FD"/></linearGradient></defs>
    <rect width="200" height="140" fill="url(#mx6-za-g)"/><circle cx="168" cy="30" r="16" fill="#FFE27A"/>
    <g fill="#fff"><ellipse cx="46" cy="40" rx="26" ry="10"/><ellipse cx="62" cy="34" rx="16" ry="10"/><ellipse cx="130" cy="94" rx="30" ry="11"/><ellipse cx="148" cy="86" rx="17" ry="10"/><ellipse cx="34" cy="108" rx="22" ry="8"/></g>
    <g fill="#fff"><circle cx="110" cy="20" r="1.6"/><circle cx="20" cy="70" r="1.6"/></g>`)
});

/* vehículos: zona clara cada uno */
const V = {
  car:       { n: 'el coche',      z: 'tierra', art: 'car' },
  train:     { n: 'el tren',       z: 'tierra', art: 'train' },
  bus:       { n: 'el autobús',    z: 'tierra', art: 'mx6-bus' },
  bike:      { n: 'la bicicleta',  z: 'tierra', art: 'mx6-bike' },
  moto:      { n: 'la moto',       z: 'tierra', art: 'mx6-moto' },
  boat:      { n: 'el barco',      z: 'mar',    art: 'boat' },
  sailboat:  { n: 'el velero',     z: 'mar',    art: 'mx6-sailboat' },
  sub:       { n: 'el submarino',  z: 'mar',    art: 'mx6-sub' },
  ship:      { n: 'el crucero',    z: 'mar',    art: 'mx6-ship' },
  plane:     { n: 'el avión',      z: 'aire',   art: 'mx6-plane' },
  heli:      { n: 'el helicóptero',z: 'aire',   art: 'mx6-heli' },
  hotair:    { n: 'el globo aerostático', z: 'aire', art: 'mx6-hotair' },
  rocket:    { n: 'el cohete',     z: 'aire',   art: 'mx6-rocket' }
};
const ZONES = {
  tierra: { name: 'Tierra', art: 'mx6-zland', phrase: 'por la carretera o la vía' },
  mar:    { name: 'Mar',    art: 'mx6-zsea',  phrase: 'por el mar' },
  aire:   { name: 'Aire',   art: 'mx6-zair',  phrase: 'por el cielo' }
};
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const byZone = z => Object.keys(V).filter(k => V[k].z === z);

Kids.css(`
.g-mundo-x6 .toast{pointer-events:none}
.g-mundo-x6{--sz:clamp(4rem,12vmin,6.2rem)}
.g-mundo-x6 .x6-zs{display:grid;gap:.9rem;width:100%;max-width:70rem;grid-template-columns:repeat(var(--n),1fr);grid-auto-rows:clamp(11rem,38vh,22rem);flex:0 1 auto;min-height:0}
.g-mundo-x6 .x6-z{position:relative;border-radius:1.8rem;overflow:hidden;box-shadow:0 .4rem 0 rgba(20,35,91,.14);border:.25rem solid #fff;transition:transform .15s,box-shadow .15s;cursor:pointer;min-height:0;padding:0}
.g-mundo-x6 .x6-z>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-x6 .x6-z.hot{transform:scale(1.03);box-shadow:0 0 0 .3rem var(--yellow),0 .4rem 0 rgba(20,35,91,.14)}
.g-mundo-x6 .x6-z.hint{animation:pulse .7s 6}
.g-mundo-x6 .x6-z .lbl{position:absolute;left:50%;top:.5rem;transform:translateX(-50%);background:#fff;border-radius:999px;padding:.05rem 1.2rem;font-family:'Baloo 2';font-weight:800;font-size:1.5rem;line-height:1.35;box-shadow:0 .2rem 0 rgba(20,35,91,.14);z-index:3;white-space:nowrap}
.g-mundo-x6 .x6-layer{position:absolute;left:2%;right:2%;bottom:4%;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;z-index:2;pointer-events:none}
.g-mundo-x6 .x6-layer>i{display:block;width:min(33%,4.6rem);aspect-ratio:1;animation:pop .5s}
.g-mundo-x6 .x6-layer svg,.g-mundo-x6 .x6-it svg{width:100%;height:100%;display:block}
.g-mundo-x6 .x6-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:60rem;background:rgba(255,255,255,.8);border-radius:1.8rem;padding:.6rem;min-height:calc(var(--sz) + 1.4rem);flex:none;position:relative;z-index:5}
.g-mundo-x6 .x6-it{width:var(--sz);height:var(--sz);background:#fff;border-radius:1.2rem;padding:.3rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);position:relative}
.g-mundo-x6 .x6-it.sel{border-color:var(--yellow);background:#FFF7D1;transform:translateY(-.3rem)}
.g-mundo-x6 .x6-it.hint{animation:bounce .6s 5}
.g-mundo-x6 .x6-it.focus{border-color:var(--g)}
.g-mundo-x6 .x6-it svg{pointer-events:none}
.g-mundo-x6 .x6-q{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;width:100%}
.g-mundo-x6 .x6-q .pic{width:clamp(9rem,28vmin,13rem);min-height:10rem;font-size:1.3rem;text-align:center}
.g-mundo-x6 .x6-q .pic svg{max-width:8rem;max-height:8rem}
@media (max-width:640px){.g-mundo-x6 .x6-zs.three{grid-template-columns:1fr;grid-auto-rows:clamp(6.5rem,17vh,10rem)}.g-mundo-x6 .x6-z .lbl{font-size:1.2rem}.g-mundo-x6 .x6-layer>i{width:min(20%,3.4rem)}}
`);

Kids.game({
  id: 'mundo-x6', group: 'mundo', num: 9,
  title: 'Medios de transporte',
  blurb: 'Lleva cada vehículo al lugar por donde viaja: tierra, mar o aire.',
  how: 'Arrastra cada vehículo a su sitio: la carretera, el mar o el cielo. También puedes tocar el vehículo y luego tocar el lugar.',
  icon: 'car',
  levels: ['Tierra y aire', 'Tierra, mar y aire', 'Más vehículos y preguntas'],
  rounds: 4,
  round(g, i) {
    if (g.level === 3 && i === 3) return question(g);
    const zids = g.level === 1 ? ['tierra', 'aire'] : ['tierra', 'mar', 'aire'];
    const total = g.level === 1 ? 4 : g.level === 2 ? 6 : 8;
    // al menos uno de cada zona, el resto al azar
    let list = zids.map(z => U.pick(byZone(z)));
    const rest = U.shuffle([].concat(...zids.map(byZone)).filter(a => list.indexOf(a) < 0));
    list = U.shuffle(list.concat(rest.slice(0, total - list.length)));

    const wrap = U.el('<div style="display:contents"></div>');
    const zs = U.el(`<div class="x6-zs ${zids.length === 3 ? 'three' : ''}" style="--n:${zids.length}"></div>`);
    zids.forEach(z => zs.appendChild(U.el(`<div class="x6-z" role="button" tabindex="0" data-z="${z}" aria-label="${ZONES[z].name}">${Kids.art.get(ZONES[z].art)}<span class="lbl">${ZONES[z].name}</span><div class="x6-layer"></div></div>`)));
    const tray = U.el('<div class="x6-tray"></div>');
    wrap.appendChild(zs); wrap.appendChild(tray); g.area.appendChild(wrap);

    let remaining = list.length, selected = null, lastTried = null, focus = null;
    const zEl = z => zs.querySelector(`[data-z="${z}"]`);
    const clearSel = () => { if (selected) selected.classList.remove('sel'); selected = null; };
    const askFor = a => g.ask('¿Por dónde va ' + V[a].n + '?');
    function nextFocus() {
      if (focus) focus.classList.remove('focus');
      focus = tray.querySelector('.x6-it');
      if (focus) { focus.classList.add('focus'); askFor(focus.dataset.a); }
    }
    function attempt(it, ze) {
      const a = it.dataset.a, z = ze.dataset.z;
      lastTried = it;
      if (V[a].z === z) {
        clearSel(); it.dataset.locked = '1';
        ze.querySelector('.x6-layer').appendChild(U.el(`<i>${Kids.art.get(V[a].art)}</i>`));
        it.remove(); Kids.sound.pop(); remaining--;
        if (remaining === 0) { g.say('¡Todos en su sitio!'); g.t(() => g.right('¡Cada vehículo en su sitio!'), 500); }
        else { if (it === focus) focus = null; nextFocus(); }
        return true;
      }
      g.shake(it);
      g.wrong('Mmm, ' + V[a].n + ' no va ' + ZONES[z].phrase + '. ¡Prueba otra vez!');
      return false;
    }
    g.helpHint = () => {
      const it = (lastTried && lastTried.isConnected) ? lastTried : tray.querySelector('.x6-it');
      if (!it) return;
      const ze = zEl(V[it.dataset.a].z);
      it.classList.add('hint'); ze.classList.add('hint');
      g.t(() => { it.classList.remove('hint'); ze.classList.remove('hint'); }, 3800);
      g.toast(cap(V[it.dataset.a].n) + ' va ' + ZONES[V[it.dataset.a].z].phrase);
    };
    list.forEach(a => {
      const it = U.el(`<button class="x6-it" data-a="${a}" aria-label="${cap(V[a].n)}">${Kids.art.get(V[a].art)}</button>`);
      tray.appendChild(it);
      Kids.drag(it, {
        targets: () => Array.from(zs.children),
        onStart: el => { clearSel(); if (focus !== el) { if (focus) focus.classList.remove('focus'); focus = el; el.classList.add('focus'); askFor(el.dataset.a); } },
        onDrop: (ze, el) => attempt(el, ze),
        onTap: el => { clearSel(); selected = el; el.classList.add('sel'); }
      });
    });
    zs.querySelectorAll('.x6-z').forEach(ze => {
      const act = () => { if (selected) attempt(selected, ze); else g.toast('Toca primero un vehículo'); };
      ze.addEventListener('click', act);
      ze.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
    nextFocus();
  }
});

function question(g) {
  const sea = Math.random() < .7;
  const goal = sea ? 'mar' : 'aire';
  const right = U.pick(byZone(goal).filter(k => k !== 'rocket'));
  const wrongs = U.sample(byZone(sea ? 'tierra' : 'mar').concat(sea ? [] : byZone('tierra')), 2);
  const opts = U.shuffle([right].concat(wrongs));
  g.ask(sea ? '¿Qué usamos para cruzar el mar?' : '¿Qué usamos para viajar por el cielo?');
  const box = U.el('<div class="x6-q"></div>');
  const btns = opts.map(k => {
    const b = U.el(`<button class="pic" data-a="${k}" aria-label="${cap(V[k].n)}">${Kids.art.get(V[k].art)}<span class="lbl">${cap(V[k].n)}</span></button>`);
    box.appendChild(b); return b;
  });
  g.area.appendChild(box);
  g.helpHint = () => { btns.forEach(b => { if (b.dataset.a === right) b.style.animation = 'bounce .6s 5'; }); g.toast('Piensa por dónde viaja cada uno'); };
  btns.forEach(b => b.addEventListener('click', () => {
    if (b.dataset.a === right) {
      b.classList.add('right'); btns.forEach(x => x.disabled = true);
      g.right('¡Sí! ' + cap(V[right].n) + ' va ' + ZONES[goal].phrase);
    } else { b.classList.add('bad'); g.shake(b); g.wrong('Ese va ' + ZONES[V[b.dataset.a].z].phrase + '. ¡Prueba otra vez!'); }
  }));
}
})();

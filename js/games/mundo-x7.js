/* mundo-x7 — Educación vial */
(function () {
'use strict';
const U = Kids.util;
const S = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';

/* hombrecito del semáforo */
const man = (x, y, c, walk) => `<g fill="${c}"><circle cx="${x}" cy="${y - 11}" r="4.2"/><rect x="${x - 4}" y="${y - 6}" width="8" height="12" rx="3.5"/>` +
  (walk ? `<path d="M${x - 3} ${y + 4}L${x - 8} ${y + 15}M${x + 3} ${y + 4}L${x + 7} ${y + 15}" stroke="${c}" stroke-width="3.6" stroke-linecap="round"/><path d="M${x - 4} ${y - 4}L${x - 10} ${y + 4}M${x + 4} ${y - 4}L${x + 10} ${y}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`
        : `<path d="M${x - 2.5} ${y + 5}V${y + 16}M${x + 2.5} ${y + 5}V${y + 16}" stroke="${c}" stroke-width="3.6" stroke-linecap="round"/><path d="M${x - 4} ${y - 4}L${x - 9} ${y + 6}M${x + 4} ${y - 4}L${x + 9} ${y + 6}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`) + '</g>';
const pedLight = (st) => S(`<rect x="46" y="62" width="8" height="32" fill="#7B86A8"/><rect x="26" y="4" width="48" height="62" rx="12" fill="#2B3556"/>
  <rect x="32" y="9" width="36" height="25" rx="8" fill="${st === 'red' ? '#FF5A4F' : '#4B3A44'}"/><rect x="32" y="37" width="36" height="25" rx="8" fill="${st === 'green' ? '#4FE08A' : '#2F4A45'}"/>
  ${man(50, 22, st === 'red' ? '#fff' : '#6A5560', false)}${man(50, 49, st === 'green' ? '#fff' : '#4E6B63', true)}
  ${st === 'red' ? '<circle cx="50" cy="21" r="22" fill="#FF5A4F" opacity=".18"/>' : '<circle cx="50" cy="49" r="22" fill="#4FE08A" opacity=".18"/>'}`);
const carLight = (st) => S(`<rect x="46" y="68" width="8" height="26" fill="#7B86A8"/><rect x="29" y="2" width="42" height="70" rx="12" fill="#2B3556"/>
  <circle cx="50" cy="19" r="10" fill="${st === 'red' ? '#FF5A4F' : '#5A3C42'}"/><circle cx="50" cy="37" r="10" fill="${st === 'amber' ? '#FFC93C' : '#5E5440'}"/><circle cx="50" cy="55" r="10" fill="${st === 'green' ? '#4FE08A' : '#2F4A45'}"/>`);
const octagon = (cx, cy, r) => { let p = []; for (let k = 0; k < 8; k++) { const a = (k * 45 + 22.5) * Math.PI / 180; p.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)); } return p.join(' '); };
const fig = (x, h, c, hat) => `<circle cx="${x}" cy="${88 - h}" r="${h * .13}" fill="#F6C9A0"/><rect x="${x - h * .14}" y="${88 - h * .86}" width="${h * .28}" height="${h * .48}" rx="${h * .1}" fill="${c}"/><path d="M${x - h * .07} ${88 - h * .4}V88M${x + h * .07} ${88 - h * .4}V88" stroke="#3C4A7A" stroke-width="${h * .1}" stroke-linecap="round"/>`;

Kids.art.add({
  'mx7-ped-red': () => pedLight('red'),
  'mx7-ped-green': () => pedLight('green'),
  'mx7-car-red': () => carLight('red'),
  'mx7-car-amber': () => carLight('amber'),
  'mx7-car-green': () => carLight('green'),
  'mx7-lamp-red': S('<circle cx="50" cy="50" r="38" fill="#FF5A4F"/><circle cx="38" cy="38" r="9" fill="#fff" opacity=".35"/>'),
  'mx7-lamp-amber': S('<circle cx="50" cy="50" r="38" fill="#FFC93C"/><circle cx="38" cy="38" r="9" fill="#fff" opacity=".35"/>'),
  'mx7-lamp-green': S('<circle cx="50" cy="50" r="38" fill="#4FE08A"/><circle cx="38" cy="38" r="9" fill="#fff" opacity=".35"/>'),
  'mx7-sign-stop': S(`<rect x="46" y="70" width="8" height="26" fill="#9AA3BD"/><polygon points="${octagon(50, 40, 38)}" fill="#E63946" stroke="#fff" stroke-width="3"/><text x="50" y="50" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="25" text-anchor="middle" fill="#fff">STOP</text>`),
  'mx7-sign-walk': S(`<rect x="46" y="76" width="8" height="20" fill="#9AA3BD"/><rect x="12" y="4" width="76" height="76" rx="12" fill="#2F6FE0" stroke="#fff" stroke-width="3"/><path d="M50 14L80 62H20Z" fill="#fff"/><path d="M50 22L72 58H28Z" fill="#2F6FE0"/>${man(50, 42, '#fff', true)}<path d="M26 66H74" stroke="#fff" stroke-width="3" stroke-dasharray="6 4"/>`),
  'mx7-sign-no': S(`<rect x="46" y="76" width="8" height="20" fill="#9AA3BD"/><circle cx="50" cy="40" r="36" fill="#E63946" stroke="#fff" stroke-width="3"/><circle cx="50" cy="40" r="26" fill="#fff"/><rect x="26" y="34" width="48" height="12" rx="3" fill="#E63946"/>`),
  'mx7-sign-yield': S(`<rect x="46" y="62" width="8" height="34" fill="#9AA3BD"/><path d="M8 10H92L50 80Z" fill="#E63946" stroke="#E63946" stroke-width="6" stroke-linejoin="round"/><path d="M20 17H80L50 66Z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>`),
  'mx7-sign-kids': S(`<rect x="46" y="76" width="8" height="20" fill="#9AA3BD"/><path d="M50 6L92 76H8Z" fill="#E63946" stroke="#E63946" stroke-width="6" stroke-linejoin="round"/><path d="M50 18L80 68H20Z" fill="#FFE27A"/><g fill="#14235B"><circle cx="42" cy="38" r="3.4"/><circle cx="58" cy="42" r="3"/><rect x="39" y="42" width="6" height="10" rx="2.5"/><rect x="55.5" y="45" width="5.5" height="8" rx="2.5"/><path d="M42 51V62M44 51V62M58 53V62M60 53V62" stroke="#14235B" stroke-width="2.4"/></g>`),
  'mx7-hold': S(`<ellipse cx="50" cy="90" rx="36" ry="3.5" fill="#3b2a1a" opacity=".14"/><circle cx="32" cy="22" r="10" fill="#F6C9A0"/><rect x="21" y="32" width="22" height="34" rx="9" fill="#8C7BE0"/><path d="M27 66V88M37 66V88" stroke="#3C4A7A" stroke-width="7" stroke-linecap="round"/>
    <circle cx="70" cy="48" r="8" fill="#F6C9A0"/><rect x="62" y="56" width="16" height="22" rx="7" fill="#FFB347"/><path d="M66 78V88M74 78V88" stroke="#3C4A7A" stroke-width="5" stroke-linecap="round"/><path d="M42 46Q56 56 64 64" fill="none" stroke="#F6C9A0" stroke-width="5" stroke-linecap="round"/>`),
  'mx7-run': S(`<ellipse cx="50" cy="90" rx="30" ry="3.5" fill="#3b2a1a" opacity=".14"/><circle cx="56" cy="24" r="10" fill="#F6C9A0"/><path d="M52 36Q44 52 50 62L38 84M50 62L66 70L62 86" fill="none" stroke="#3C4A7A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 36L66 50M52 36L34 44" stroke="#FFB347" stroke-width="7" stroke-linecap="round"/><path d="M50 36V58" stroke="#FFB347" stroke-width="14" stroke-linecap="round"/><path d="M14 40h14M10 56h16M16 72h12" stroke="#BFD3F2" stroke-width="3" stroke-linecap="round"/>`),
  'mx7-phone': S(`<ellipse cx="50" cy="90" rx="26" ry="3.5" fill="#3b2a1a" opacity=".14"/><circle cx="48" cy="22" r="10" fill="#F6C9A0"/><rect x="36" y="34" width="24" height="32" rx="9" fill="#FF7E69"/><path d="M42 66V88M54 66V88" stroke="#3C4A7A" stroke-width="7" stroke-linecap="round"/><path d="M40 42L58 54" stroke="#FF7E69" stroke-width="7" stroke-linecap="round"/><rect x="56" y="48" width="12" height="18" rx="3" fill="#3C4A7A" transform="rotate(-18 62 57)"/><rect x="58" y="50" width="8" height="12" rx="2" fill="#8EC9F0" transform="rotate(-18 62 57)"/>`),
  'mx7-zebra': S(`<rect width="100" height="100" rx="10" fill="#6C7A9C"/><g fill="#fff"><rect x="12" y="10" width="76" height="9" rx="2"/><rect x="12" y="26" width="76" height="9" rx="2"/><rect x="12" y="42" width="76" height="9" rx="2"/><rect x="12" y="58" width="76" height="9" rx="2"/><rect x="12" y="74" width="76" height="9" rx="2"/></g>`),
  'mx7-between': S(`<rect width="100" height="100" rx="10" fill="#6C7A9C"/><rect x="0" y="0" width="100" height="14" fill="#C9D3E8"/><g><rect x="2" y="34" width="34" height="32" rx="8" fill="#FF7E69"/><rect x="64" y="34" width="34" height="32" rx="8" fill="#4C8DF6"/><rect x="8" y="40" width="22" height="10" rx="3" fill="#CFEAFB"/><rect x="70" y="40" width="22" height="10" rx="3" fill="#CFEAFB"/></g><path d="M50 22V90" stroke="#FFD23F" stroke-width="3" stroke-dasharray="5 5"/><path d="M44 84L50 94L56 84" fill="none" stroke="#FFD23F" stroke-width="4" stroke-linecap="round"/>`),
  'mx7-bend': S(`<rect width="100" height="100" rx="10" fill="#9ED98A"/><path d="M0 70Q40 70 55 50T70 0H100V100H0Z" fill="#6C7A9C" opacity=".0"/><path d="M-10 78Q44 74 56 50T66 -10H96Q86 40 76 62T0 100Z" fill="#6C7A9C"/><path d="M-4 86Q50 80 66 54T80 -4" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/><ellipse cx="22" cy="44" rx="20" ry="16" fill="#5FB070"/><ellipse cx="34" cy="38" rx="14" ry="12" fill="#7FCB8A"/>`),
  'mx7-eye': S('<path d="M8 50Q50 12 92 50Q50 88 8 50Z" fill="#fff" stroke="#14235B" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="50" r="17" fill="#4C8DF6"/><circle cx="50" cy="50" r="8" fill="#14235B"/><circle cx="55" cy="45" r="4" fill="#fff"/>'),
  'mx7-arrow': S('<path d="M70 20L32 50L70 80" fill="none" stroke="#14235B" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>'),
  'mx7-street': '<svg viewBox="0 0 200 112" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="mx7-st-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBEBFB"/><stop offset="1" stop-color="#F3FBFF"/></linearGradient></defs>' +
    '<rect width="200" height="112" fill="url(#mx7-st-g)"/><rect y="0" width="200" height="26" fill="#E8D9B8"/><g fill="#FFB3A0"><rect x="6" y="2" width="30" height="22" rx="3"/><rect x="150" y="0" width="38" height="24" rx="3"/></g><g fill="#FFE27A"><rect x="12" y="7" width="7" height="7" rx="1"/><rect x="24" y="7" width="7" height="7" rx="1"/><rect x="158" y="6" width="8" height="8" rx="1"/><rect x="172" y="6" width="8" height="8" rx="1"/></g>' +
    '<rect y="24" width="200" height="8" fill="#D9C79F"/><rect y="32" width="200" height="50" fill="#6C7A9C"/><path d="M0 57H200" stroke="#fff" stroke-width="1.6" stroke-dasharray="9 7" opacity=".85"/><rect y="82" width="200" height="8" fill="#D9C79F"/><rect y="90" width="200" height="22" fill="#B7DF9C"/>' +
    '<g fill="#fff"><rect x="76" y="33" width="9" height="48" rx="1.5"/><rect x="90" y="33" width="9" height="48" rx="1.5"/><rect x="104" y="33" width="9" height="48" rx="1.5"/><rect x="118" y="33" width="9" height="48" rx="1.5"/></g>' +
    '<g fill="#7FCB8A"><ellipse cx="22" cy="100" rx="20" ry="9"/><ellipse cx="178" cy="102" rx="22" ry="9"/></g></svg>'
});

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
Kids.css(`
.g-mundo-x7 .toast{pointer-events:none}
.g-mundo-x7 .x7-scene{position:relative;width:min(100%,52rem,calc((100vh - 27rem) * 1.7));aspect-ratio:16/9;border-radius:2rem;overflow:hidden;border:.25rem solid #fff;box-shadow:0 .4rem 0 rgba(20,35,91,.14);flex:none;background:#CBEBFB}
.g-mundo-x7 .x7-scene>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-x7 .x7-lolo{position:absolute;width:19%;aspect-ratio:1;left:50.5%;transform:translateX(-50%);top:62%;transition:top 1.6s ease-in-out;z-index:4}
.g-mundo-x7 .x7-lolo.up{top:-8%}
.g-mundo-x7 .x7-lolo svg,.g-mundo-x7 .x7-lt svg,.g-mundo-x7 .x7-veh svg{width:100%;height:100%;display:block}
.g-mundo-x7 .x7-lt{position:absolute;left:66%;top:40%;width:18%;aspect-ratio:1;z-index:3}
.g-mundo-x7 .x7-veh{position:absolute;width:15%;aspect-ratio:1;top:30%;z-index:2}
.g-mundo-x7 .x7-veh.l{left:2%}.g-mundo-x7 .x7-veh.r{right:2%;transform:scaleX(-1)}
.g-mundo-x7 .x7-veh.go-r{animation:x7r 2.4s linear forwards}
.g-mundo-x7 .x7-veh.go-l{animation:x7l 2.4s linear forwards}
@keyframes x7r{from{left:-18%;right:auto}to{left:110%;right:auto}}
@keyframes x7l{from{right:-18%;left:auto}to{right:110%;left:auto}}
.g-mundo-x7 .x7-bubble{position:absolute;top:8%;width:12%;aspect-ratio:1;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:800;font-size:1.6rem;box-shadow:0 .2rem 0 rgba(20,35,91,.2);z-index:5}
.g-mundo-x7 .x7-bubble.l{left:12%}.g-mundo-x7 .x7-bubble.r{right:12%}
.g-mundo-x7 .x7-bubble.ok{background:#BDEFC8}.g-mundo-x7 .x7-bubble.no{background:#FFD3CF}
.g-mundo-x7 .x7-bar{display:flex;flex-wrap:wrap;gap:.9rem;justify-content:center;align-items:center;width:100%}
.g-mundo-x7 .x7-bar .btn{font-size:1.5rem;min-height:4rem}
.g-mundo-x7 .x7-bar .btn svg{width:2.2rem;height:2.2rem}
.g-mundo-x7 .x7-bar .btn.done{opacity:.55}
.g-mundo-x7 .x7-hero{width:min(12rem,26vmin);flex:none}
.g-mundo-x7 .x7-hero svg{width:100%;height:auto;display:block}
.g-mundo-x7 .x7-ch{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;width:100%}
.g-mundo-x7 .x7-ch .pic{width:clamp(8rem,24vmin,12rem);min-height:9rem;font-size:1.25rem;text-align:center;line-height:1.1}
.g-mundo-x7 .x7-ch .pic svg{max-width:7rem;max-height:7rem}
.g-mundo-x7 .x7-ch .ans{font-size:1.5rem;min-width:9rem;padding:.5rem 1.2rem;text-align:center;line-height:1.15}
.g-mundo-x7 .x7-row{display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap;width:100%}
.g-mundo-x7 .x7-flip{transform:scaleX(-1)}
.g-mundo-x7 .x7-hint{animation:bounce .6s 5}
@media (max-width:640px){.g-mundo-x7 .x7-bubble{font-size:1.1rem}}
`);

/* ---------- piezas de ronda ---------- */
function scene(opts) {
  const sc = U.el('<div class="x7-scene"></div>');
  sc.innerHTML = Kids.art.get('mx7-street');
  const lolo = U.el(`<div class="x7-lolo" role="img" aria-label="Lolo">${Kids.art.get('lion')}</div>`);
  sc.appendChild(lolo);
  let lt = null;
  if (opts && opts.light) { lt = U.el(`<div class="x7-lt">${Kids.art.get('mx7-ped-' + opts.light)}</div>`); sc.appendChild(lt); }
  return { sc, lolo, setLight(st) { if (lt) lt.innerHTML = Kids.art.get('mx7-ped-' + st); } };
}

/* ronda de elegir: opts [{t, art, ok}] */
function choice(g, o) {
  const wrap = U.el('<div style="display:contents"></div>');
  if (o.top) wrap.appendChild(o.top);
  const box = U.el('<div class="x7-ch"></div>');
  const btns = o.opts.map(op => {
    const b = op.art ? U.el(`<button class="pic" aria-label="${U.esc(op.t)}">${Kids.art.get(op.art)}<span class="lbl">${U.esc(op.t)}</span></button>`)
                     : U.el(`<button class="ans" aria-label="${U.esc(op.t)}">${U.esc(op.t)}</button>`);
    b._ok = !!op.ok; box.appendChild(b); return b;
  });
  wrap.appendChild(box); g.area.appendChild(wrap);
  g.ask(o.q);
  g.helpHint = () => { btns.forEach(b => { if (b._ok) b.classList.add('x7-hint'); }); g.toast(o.hint || 'Piensa con calma. ¡Tú puedes!'); };
  btns.forEach(b => b.addEventListener('click', () => {
    if (b._ok) { b.classList.add('right'); btns.forEach(x => x.disabled = true); g.right(o.okMsg); }
    else { b.classList.add('bad'); g.wrong(o.badMsg || 'Mmm, mejor otra. ¡Prueba otra vez!'); }
  }));
}

/* ---------- tipos de ronda ---------- */
const T = {};

T.canCross = g => {
  const st = U.pick(['red', 'green']);
  const s = scene({ light: st });
  const sayRed = 'El muñeco del semáforo está rojo.', sayGreen = 'El muñeco del semáforo está verde.';
  choice(g, {
    top: s.sc, q: (st === 'red' ? sayRed : sayGreen) + ' ¿Podemos cruzar?',
    opts: U.shuffle([{ t: 'Sí, cruzamos', ok: st === 'green' }, { t: 'No, esperamos', ok: st === 'red' }]),
    okMsg: st === 'green' ? '¡Verde: podemos cruzar!' : '¡Rojo: esperamos!',
    badMsg: st === 'green' ? 'El muñeco está verde, ¡podemos cruzar con cuidado!' : 'Con el muñeco rojo no se cruza. ¡Esperamos!',
    hint: 'Rojo: esperamos. Verde: cruzamos.'
  });
  if (st === 'green') g.t(() => { }, 0);
};

T.colorTap = g => {
  const want = U.pick(['red', 'green', 'amber']);
  const q = { red: 'Toca la luz roja: nos dice que paremos', green: 'Toca la luz verde: nos dice que podemos cruzar', amber: 'Toca la luz amarilla: nos dice que esperemos, va a cambiar' }[want];
  const hero = U.el(`<div class="x7-hero" style="width:min(9rem,22vmin)">${Kids.art.get('mx7-car-' + want)}</div>`);
  const names = { red: 'Roja', amber: 'Amarilla', green: 'Verde' };
  const ord = ['red', 'amber', 'green'];
  choice(g, {
    top: hero, q,
    opts: ord.map(c => ({ t: names[c], art: 'mx7-lamp-' + c, ok: c === want })),
    okMsg: '¡Esa es la luz ' + names[want].toLowerCase().replace('roja', 'roja') + '!',
    badMsg: 'Esa no es. ¡Mira bien los colores!',
    hint: want === 'red' ? 'La roja es la de arriba: ¡parar!' : want === 'green' ? 'La verde es la de abajo: ¡cruzar!' : 'La amarilla va en medio.'
  });
};

T.say = g => {
  const st = U.pick(['red', 'green']);
  const hero = U.el(`<div class="x7-hero">${Kids.art.get('mx7-ped-' + st)}</div>`);
  choice(g, {
    top: hero, q: '¿Qué dice el semáforo?',
    opts: U.shuffle([{ t: 'Parar', ok: st === 'red' }, { t: 'Cruzar', ok: st === 'green' }, { t: 'Saltar', ok: false }]),
    okMsg: st === 'red' ? '¡Rojo dice parar!' : '¡Verde dice cruzar!',
    badMsg: 'No es eso. ¡Mira el color del muñeco!',
    hint: 'Rojo: parar. Verde: cruzar.'
  });
};

T.sim = g => {
  const s = scene({ light: 'red' });
  const veh = U.el(`<div class="x7-veh l">${Kids.art.get('car')}</div>`);
  veh.style.display = 'none'; s.sc.appendChild(veh);
  const bar = U.el('<div class="x7-bar"><button class="btn" aria-label="Cruzar la calle">Cruzar</button></div>');
  g.area.appendChild(s.sc); g.area.appendChild(bar);
  g.ask('Pulsa «Cruzar» solo cuando el muñeco esté verde.');
  let st = 'red', busy = false;
  const cycle = () => {
    if (busy) return;
    st = st === 'red' ? 'green' : 'red'; s.setLight(st);
    if (st === 'red') { veh.style.display = 'block'; veh.className = 'x7-veh l'; void veh.offsetWidth; veh.classList.add('go-r'); } else { veh.style.display = 'none'; }
    g.t(cycle, st === 'red' ? 3600 : 4000);
  };
  g.t(cycle, 1800);
  veh.style.display = 'block'; veh.classList.add('go-r');
  g.helpHint = () => g.toast('Espera al muñeco verde y pulsa «Cruzar»');
  bar.firstChild.addEventListener('click', () => {
    if (busy) return;
    if (st === 'green') {
      busy = true; s.lolo.classList.add('up'); Kids.sound.pop();
      g.t(() => g.right('¡Cruzaste con el verde!'), 1800);
    } else {
      g.shake(s.lolo); g.toast('Está en rojo: ¡esperamos un poquito!');
      g.say('Está en rojo. Esperamos un poquito.');
    }
  });
};

T.look = g => {
  const sides = { l: U.pick([true, false, false]), r: U.pick([true, false, false]) };
  if (!sides.l && !sides.r && Math.random() < .35) sides.r = true;
  const clear = !sides.l && !sides.r;
  const s = scene();
  s.sc.querySelector('.x7-lolo').style.left = '50.5%';
  const mk = d => { const b = U.el(`<div class="x7-bubble ${d}" aria-hidden="true">?</div>`); s.sc.appendChild(b); return b; };
  const bub = { l: mk('l'), r: mk('r') };
  const cars = { l: U.el(`<div class="x7-veh l">${Kids.art.get('car')}</div>`), r: U.el(`<div class="x7-veh r">${Kids.art.get('car')}</div>`) };
  cars.l.style.display = cars.r.style.display = 'none';
  s.sc.appendChild(cars.l); s.sc.appendChild(cars.r);
  const bar = U.el(`<div class="x7-bar"><button class="btn white" data-s="l" aria-label="Mirar a la izquierda">${Kids.art.get('mx7-eye')}<span>Mirar a la izquierda</span></button><button class="btn white" data-s="r" aria-label="Mirar a la derecha">${Kids.art.get('mx7-eye')}<span>Mirar a la derecha</span></button></div>`);
  const dec = U.el(`<div class="x7-bar"><button class="btn" data-d="go" aria-label="Cruzar">Cruzar</button><button class="btn" data-d="wait" aria-label="Esperar">Esperar</button></div>`);
  g.area.appendChild(s.sc); g.area.appendChild(bar); g.area.appendChild(dec);
  g.ask('Antes de cruzar, mira a la izquierda y a la derecha. ¿Viene algún coche?');
  const seen = { l: false, r: false };
  let busy = false;
  g.helpHint = () => { bar.querySelectorAll('.btn:not(.done)').forEach(b => b.classList.add('x7-hint')); g.toast('Mira primero a los dos lados'); };
  bar.querySelectorAll('.btn').forEach(b => b.addEventListener('click', () => {
    const d = b.dataset.s; if (seen[d] || busy) return;
    seen[d] = true; b.classList.add('done'); b.classList.remove('x7-hint'); Kids.sound.tap();
    bub[d].textContent = sides[d] ? '' : '✓'; bub[d].classList.add(sides[d] ? 'no' : 'ok');
    if (sides[d]) { bub[d].innerHTML = Kids.art.get('car'); bub[d].firstChild.style.width = '80%'; bub[d].firstChild.style.height = '80%'; }
    g.say(sides[d] ? 'Viene un coche' : 'No viene nadie');
    if (seen.l && seen.r) g.toast(clear ? 'No viene nadie por ningún lado' : 'Viene un coche. ¿Qué hacemos?');
  }));
  dec.querySelectorAll('.btn').forEach(b => b.addEventListener('click', () => {
    if (busy) return;
    if (!(seen.l && seen.r)) { g.toast('Primero mira a la izquierda y a la derecha'); g.say('Primero mira a los dos lados'); return; }
    const goes = b.dataset.d === 'go';
    if (goes === clear) {
      busy = true;
      if (goes) { s.lolo.classList.add('up'); g.t(() => g.right('¡Miraste bien y cruzaste!'), 1800); }
      else {
        ['l', 'r'].forEach(d => { if (sides[d]) { cars[d].style.display = 'block'; cars[d].classList.add(d === 'l' ? 'go-r' : 'go-l'); bub[d].style.display = 'none'; } });
        g.t(() => g.right('¡Esperaste a que pasara el coche!'), 2600);
      }
    } else if (goes) { g.shake(s.lolo); g.wrong('¡Viene un coche! Mejor esperamos a que pase.'); }
    else { g.wrong('No viene nadie: podemos cruzar con cuidado.'); }
  }));
};

T.zebra = g => {
  choice(g, {
    q: '¿Por dónde cruzamos la calle?',
    opts: U.shuffle([{ t: 'Por el paso de cebra', art: 'mx7-zebra', ok: true }, { t: 'Entre dos coches', art: 'mx7-between' }, { t: 'En una curva', art: 'mx7-bend' }]),
    okMsg: '¡Por el paso de cebra!', badMsg: 'Ahí es peligroso. ¡Busca las rayas blancas!', hint: 'Las rayas blancas son el paso de cebra.'
  });
};
T.hand = g => {
  choice(g, {
    q: '¿Cómo cruzamos la calle?',
    opts: U.shuffle([{ t: 'De la mano de un adulto', art: 'mx7-hold', ok: true }, { t: 'Corriendo solo', art: 'mx7-run' }, { t: 'Mirando el móvil', art: 'mx7-phone' }]),
    okMsg: '¡De la mano de un adulto!', badMsg: 'Mejor no. ¡Cruzamos de la mano!', hint: 'Se cruza despacio y de la mano de un adulto.'
  });
};

const SIGNS = {
  'mx7-sign-stop':  { n: 'Stop', m: 'Hay que parar', fq: 'Toca la señal de stop' },
  'mx7-sign-walk':  { n: 'Paso de peatones', m: 'Aquí cruzan las personas', fq: 'Toca la señal de paso de peatones' },
  'mx7-sign-no':    { n: 'Prohibido el paso', m: 'No se puede pasar', fq: 'Toca la señal de prohibido el paso' },
  'mx7-sign-yield': { n: 'Ceda el paso', m: 'Hay que dejar pasar a los demás', fq: 'Toca la señal de ceda el paso' },
  'mx7-sign-kids':  { n: 'Cuidado, niños', m: 'Cerca hay niños: cuidado', fq: 'Toca la señal de cuidado, niños' }
};
let used = {};
const fresh = (tag, arr) => { const u = used[tag] || (used[tag] = []); let c = arr.filter(x => u.indexOf(x) < 0); if (!c.length) { u.length = 0; c = arr; } const v = U.pick(c); u.push(v); return v; };
T.signFind = g => {
  const keys = Object.keys(SIGNS), want = fresh('f', keys), n = g.level === 3 ? 4 : 3;
  const opts = U.shuffle([want].concat(U.sample(keys.filter(k => k !== want), n - 1)));
  choice(g, { q: SIGNS[want].fq, opts: opts.map(k => ({ t: SIGNS[k].n, art: k, ok: k === want })), okMsg: '¡Esa es la señal!', badMsg: 'Esa es otra señal. ¡Mira otra vez!', hint: 'Fíjate en la forma y los colores.' });
};
T.signMeaning = g => {
  const keys = Object.keys(SIGNS), k = fresh('m', keys);
  const hero = U.el(`<div class="x7-hero" style="width:min(10rem,24vmin)">${Kids.art.get(k)}</div>`);
  const opts = U.shuffle([k].concat(U.sample(keys.filter(x => x !== k), 2))).map(x => ({ t: SIGNS[x].m, ok: x === k }));
  choice(g, { top: hero, q: '¿Qué quiere decir esta señal?', opts, okMsg: '¡Ya sabes lo que dice!', badMsg: 'No quiere decir eso. ¡Piénsalo otra vez!', hint: 'Mírala bien: ¿qué dibujo tiene?' });
};

const SITS = [
  { top: 'ball', q: 'La pelota ha caído a la calle. ¿Qué hago?', good: 'Aviso a un adulto', bad: ['Corro a por ella', 'Cruzo sin mirar'], hint: 'La pelota se puede esperar; ¡tú eres más importante!' },
  { q: 'El semáforo se pone en rojo cuando estoy en la acera. ¿Qué hago?', good: 'Espero en la acera', bad: ['Corro para cruzar', 'Cruzo despacio'], hint: 'Rojo siempre es esperar.' },
  { q: 'Voy en coche. ¿Qué me pongo?', good: 'El cinturón', bad: ['Nada', 'Me pongo de pie'], hint: 'En el coche vamos bien sujetos.' },
  { q: 'Voy por la calle con un adulto. ¿Por dónde ando?', good: 'Por la acera', bad: ['Por la carretera', 'Pegado a los coches'], hint: 'La acera es para las personas.' },
  { q: 'Voy a cruzar y viene un coche muy deprisa. ¿Qué hago?', good: 'Espero a que pase', bad: ['Cruzo corriendo', 'Le hago señas y cruzo'], hint: 'Si viene un coche, esperamos.' },
  { q: 'Quiero cruzar y no hay semáforo. ¿Dónde busco?', good: 'El paso de cebra', bad: ['Un hueco entre coches', 'Una curva'], hint: 'Las rayas blancas ayudan a cruzar.' }
];
T.situation = g => {
  const s = fresh('s', SITS);
  const top = s.top ? U.el(`<div class="x7-hero" style="width:min(7rem,18vmin)">${Kids.art.get(s.top)}</div>`) : null;
  choice(g, { top, q: s.q, opts: U.shuffle([{ t: s.good, ok: true }].concat(s.bad.map(t => ({ t })))), okMsg: '¡Muy bien pensado!', badMsg: 'Eso no es seguro. ¡Piénsalo otra vez!', hint: s.hint });
};

let plan = [];
const POOL = {
  1: ['colorTap', 'canCross', 'say', 'sim', 'colorTap', 'canCross'],
  2: ['look', 'zebra', 'look', 'hand', 'sim', 'canCross'],
  3: ['signFind', 'signMeaning', 'situation', 'signFind', 'situation', 'signMeaning']
};

Kids.game({
  id: 'mundo-x7', group: 'mundo', num: 10,
  title: 'Educación vial',
  blurb: 'Aprende cuándo cruzar la calle y qué dicen las señales.',
  how: 'Mira el semáforo y las señales y elige qué hacer para cruzar la calle con seguridad.',
  icon: 'car',
  levels: ['El semáforo', 'Mirar y cruzar', 'Señales y situaciones'],
  rounds: 6,
  round(g, i) {
    if (i === 0) {
      used = {};
      plan = U.shuffle(POOL[g.level]);
      /* que la primera no sea la simulación */
      if (plan[0] === 'sim') plan.push(plan.shift());
    }
    T[plan[i]](g);
  }
});
})();

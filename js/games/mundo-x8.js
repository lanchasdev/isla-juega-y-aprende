/* mundo-x8 — El tiempo atmosférico */
(function () {
'use strict';
const U = Kids.util;
const S = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const B = (inner) => '<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>';
const cloud = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c || '#fff'}"><ellipse cx="0" cy="0" rx="22" ry="9"/><ellipse cx="-10" cy="-7" rx="12" ry="9"/><ellipse cx="8" cy="-9" rx="14" ry="11"/></g>`;
const ground = (c1, c2) => `<path d="M0 112Q60 102 120 110T200 106V150H0Z" fill="${c1}"/><path d="M0 130Q70 120 140 128T200 126V150H0Z" fill="${c2}"/>`;

Kids.art.add({
  'mx8-bg-sol': B(`<defs><linearGradient id="mx8-g-sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6EC1F2"/><stop offset="1" stop-color="#D5F1FD"/></linearGradient></defs><rect width="200" height="150" fill="url(#mx8-g-sol)"/>
    <circle cx="160" cy="34" r="30" fill="#FFE98F" opacity=".5"/><circle cx="160" cy="34" r="20" fill="#FFD23F"/><g stroke="#FFC107" stroke-width="3.5" stroke-linecap="round"><path d="M160 6v-5M160 62v5M132 34h-5M188 34h5M140 14l-3 -3M180 54l3 3M180 14l3 -3M140 54l-3 3"/></g>
    ${cloud(40, 30, 1, '#fff')}${ground('#F8E4A8', '#F0D488')}<g fill="#FFB3C7"><circle cx="20" cy="120" r="3.5"/><circle cx="178" cy="132" r="3.5"/></g>`),
  'mx8-bg-lluvia': B(`<defs><linearGradient id="mx8-g-llu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7C8DAE"/><stop offset="1" stop-color="#C3CEE2"/></linearGradient></defs><rect width="200" height="150" fill="url(#mx8-g-llu)"/>
    ${cloud(40, 26, 1.5, '#5E6C8C')}${cloud(130, 20, 1.7, '#6B7A9B')}${cloud(170, 46, 1.1, '#58668A')}${ground('#8FC79A', '#6FB07E')}
    <ellipse cx="60" cy="140" rx="22" ry="4" fill="#9FB6D6" opacity=".7"/><ellipse cx="150" cy="136" rx="16" ry="3.5" fill="#9FB6D6" opacity=".7"/>`),
  'mx8-bg-nieve': B(`<defs><linearGradient id="mx8-g-nie" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FB6E8"/><stop offset="1" stop-color="#E6F1FF"/></linearGradient></defs><rect width="200" height="150" fill="url(#mx8-g-nie)"/>
    ${cloud(150, 28, 1.3, '#E9F0FB')}${cloud(34, 40, 1, '#E9F0FB')}
    <path d="M0 102Q60 88 120 100T200 94V150H0Z" fill="#F4F9FF"/><path d="M0 126Q70 114 140 124T200 120V150H0Z" fill="#fff"/>
    <g><rect x="22" y="70" width="6" height="30" fill="#8B6A55"/><g fill="#5FB07A"><polygon points="25,36 12,66 38,66"/><polygon points="25,50 8,80 42,80"/></g><g fill="#fff"><path d="M25 36l-7 12q7 -3 14 0z"/><path d="M25 50l-9 14q9 -4 18 0z"/></g></g>`),
  'mx8-bg-viento': B(`<defs><linearGradient id="mx8-g-vie" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD0F0"/><stop offset="1" stop-color="#E4F6FD"/></linearGradient></defs><rect width="200" height="150" fill="url(#mx8-g-vie)"/>
    ${cloud(34, 28, 1.2, '#fff')}${cloud(150, 50, 1.3, '#fff')}${ground('#B3E59C', '#8ED69A')}
    <g fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".95"><path d="M10 64h56q10 0 10 -9t-9 -8"/><path d="M120 84h50q9 0 9 8t-8 7"/><path d="M30 92h40q8 0 8 7t-8 6"/></g>
    <g transform="translate(168 108) rotate(-40)" fill="#E8602C"><path d="M0 0q8 -4 10 4q-6 6 -10 -4z"/></g><g transform="translate(110 40) rotate(30)" fill="#F5B83D"><path d="M0 0q8 -4 10 4q-6 6 -10 -4z"/></g>`),
  'mx8-bg-fresquito': B(`<defs><linearGradient id="mx8-g-fre" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9C8DC"/><stop offset="1" stop-color="#EAF0F7"/></linearGradient></defs><rect width="200" height="150" fill="url(#mx8-g-fre)"/>
    ${cloud(40, 28, 1.6, '#fff')}${cloud(140, 38, 1.8, '#F7FAFD')}${cloud(100, 66, 1.1, '#fff')}${ground('#C9D9A8', '#B3C78E')}
    <g fill="#E8602C"><path d="M30 120q8 -4 10 4q-6 6 -10 -4z"/><path d="M160 130q8 -4 10 4q-6 6 -10 -4z"/></g><g fill="#F5B83D"><path d="M96 134q8 -4 10 4q-6 6 -10 -4z"/></g>`),
  /* ropa propia */
  'mx8-raincoat': S(`<path d="M22 22Q22 6 50 6T78 22L90 82Q50 92 10 82Z" fill="#FFD23F"/><path d="M26 24Q50 44 74 24" fill="none" stroke="#E0A800" stroke-width="3"/><path d="M50 40V86" stroke="#E0A800" stroke-width="3"/><g fill="#E0A800"><circle cx="50" cy="50" r="2.6"/><circle cx="50" cy="62" r="2.6"/><circle cx="50" cy="74" r="2.6"/></g><path d="M10 82Q50 92 90 82L88 74Q50 84 12 74Z" fill="#F2B93B"/>`),
  'mx8-coat': S(`<path d="M24 14L50 24L76 14L92 38L84 84H16L8 38Z" fill="#4C8DF6"/><path d="M24 14L50 40L76 14L50 24Z" fill="#8EB8FA"/><path d="M50 40V84" stroke="#2F6FE0" stroke-width="3"/><g fill="#FFD23F"><circle cx="44" cy="52" r="3"/><circle cx="44" cy="66" r="3"/><circle cx="56" cy="52" r="3"/><circle cx="56" cy="66" r="3"/></g><path d="M8 38L16 84M92 38L84 84" stroke="#2F6FE0" stroke-width="3"/>`),
  'mx8-shades': S(`<path d="M6 40Q50 30 94 40" fill="none" stroke="#14235B" stroke-width="5" stroke-linecap="round"/><path d="M10 38H44Q46 66 28 66Q10 66 10 38Z" fill="#2B3556"/><path d="M56 38H90Q90 66 72 66Q54 66 56 38Z" fill="#2B3556"/><path d="M44 42Q50 38 56 42" fill="none" stroke="#14235B" stroke-width="5"/><path d="M16 44L26 44M62 44L72 44" stroke="#8EB8FA" stroke-width="3" stroke-linecap="round"/>`)
});

/* prendas: slot y posición sobre Lolo (en % de su caja) */
const ITEMS = {
  beanie:   { n: 'el gorro',          art: 'beanie',      slot: 'head', pos: [24, -6, 52] },
  hat:      { n: 'el sombrero',       art: 'hat',         slot: 'head', pos: [21, -7, 58] },
  shades:   { n: 'las gafas de sol',  art: 'mx8-shades',  slot: 'face', pos: [29, 28, 42] },
  scarf:    { n: 'la bufanda',        art: 'scarf',       slot: 'neck', pos: [28, 57, 44] },
  tshirt:   { n: 'la camiseta',       art: 'tshirt',      slot: 'body', pos: [27, 60, 46] },
  swimsuit: { n: 'el bañador',        art: 'swimsuit',    slot: 'body', pos: [31, 64, 38] },
  coat:     { n: 'el abrigo',         art: 'mx8-coat',    slot: 'body', pos: [27, 58, 46] },
  raincoat: { n: 'el chubasquero',    art: 'mx8-raincoat',slot: 'body', pos: [27, 58, 46] },
  boot:     { n: 'las botas',         art: 'boot',        slot: 'feet', pos: [27, 76, 21], two: true },
  sandal:   { n: 'las sandalias',     art: 'sandal',      slot: 'feet', pos: [27, 78, 19], two: true },
  umbrella: { n: 'el paraguas',       art: 'umbrella',    slot: 'hand', pos: [56, 14, 50] }
};
const WEATHER = {
  sol:      { n: 'sol',      say: 'Hace sol y mucho calor', bg: 'mx8-bg-sol',      good: ['tshirt', 'swimsuit', 'sandal', 'hat', 'shades'], lbl: 'Sol' },
  lluvia:   { n: 'lluvia',   say: 'Está lloviendo',          bg: 'mx8-bg-lluvia',   good: ['raincoat', 'boot', 'umbrella'], lbl: 'Lluvia' },
  nieve:    { n: 'nieve',    say: 'Está nevando y hace mucho frío', bg: 'mx8-bg-nieve', good: ['beanie', 'scarf', 'coat', 'boot'], lbl: 'Nieve' },
  viento:   { n: 'viento',   say: 'Hace mucho viento y fresquito', bg: 'mx8-bg-viento', good: ['coat', 'scarf', 'beanie'], lbl: 'Viento' },
  fresquito:{ n: 'fresquito',say: 'Está nublado y fresquito', bg: 'mx8-bg-fresquito', good: ['coat', 'scarf', 'boot'], lbl: 'Fresquito' }
};
const ALL = Object.keys(ITEMS);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const SLOT_ES = { head: 'la cabeza', face: 'la cara', neck: 'el cuello', body: 'el cuerpo', feet: 'los pies', hand: 'la mano' };

Kids.css(`
.g-mundo-x8 .toast{pointer-events:none}
.g-mundo-x8 .x8-scene{position:relative;width:min(100%,34rem);aspect-ratio:4/3;max-height:42vh;border-radius:2rem;overflow:hidden;border:.25rem solid #fff;box-shadow:0 .4rem 0 rgba(20,35,91,.14);flex:none}
.g-mundo-x8 .x8-scene>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.g-mundo-x8 .x8-fx{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}
.g-mundo-x8 .x8-fx i{position:absolute;top:-10%;display:block}
.g-mundo-x8 .x8-fx i.r{width:.18rem;height:1.2rem;background:#4C8DF6;border-radius:1rem;opacity:.8;animation:x8rain .7s linear infinite}
.g-mundo-x8 .x8-fx i.s{width:.6rem;height:.6rem;background:#fff;border-radius:50%;animation:x8snow 3.4s linear infinite}
.g-mundo-x8 .x8-fx i.w{height:.25rem;width:3rem;background:#fff;border-radius:1rem;opacity:.8;left:-20%;animation:x8wind 1.8s linear infinite}
@keyframes x8rain{to{transform:translateY(55vh) translateX(-1rem)}}
@keyframes x8snow{0%{transform:translate(0,0)}50%{transform:translate(1rem,15vh)}100%{transform:translate(-.5rem,36vh)}}
@keyframes x8wind{to{transform:translateX(70vw)}}
.g-mundo-x8 .x8-lolo{position:absolute;left:50%;bottom:0;height:96%;aspect-ratio:1;transform:translateX(-50%);z-index:2}
.g-mundo-x8 .x8-lolo>svg{width:100%;height:100%;display:block;position:absolute;inset:0}
.g-mundo-x8 .x8-w{position:absolute;aspect-ratio:1;animation:pop .35s}
.g-mundo-x8 .x8-w svg{width:100%;height:100%;display:block}
.g-mundo-x8 .x8-w.sl{z-index:5}
.g-mundo-x8 .x8-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;width:100%;max-width:56rem;flex:none}
.g-mundo-x8 .x8-it{width:clamp(4.4rem,13vmin,6.4rem);background:#fff;border-radius:1.2rem;padding:.3rem .3rem .2rem;box-shadow:0 .3rem 0 var(--line);border:.2rem solid var(--line);display:flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-size:.95rem;line-height:1.05;text-align:center;gap:.1rem}
.g-mundo-x8 .x8-it svg{width:100%;aspect-ratio:1;display:block;pointer-events:none}
.g-mundo-x8 .x8-it.on{border-color:var(--green);background:#E7F8EA;transform:translateY(-.25rem)}
.g-mundo-x8 .x8-it.hint{animation:bounce .6s 5}
.g-mundo-x8 .x8-it.bad{background:#FFD3CF}
.g-mundo-x8 .x8-bar{display:flex;gap:1rem;justify-content:center;align-items:center}
.g-mundo-x8 .x8-ch{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;width:100%}
.g-mundo-x8 .x8-ch .pic{width:clamp(8rem,24vmin,12rem);padding:.3rem;overflow:hidden}
.g-mundo-x8 .x8-ch .pic svg{max-width:none;max-height:none;width:100%;height:auto;border-radius:1rem}
.g-mundo-x8 .x8-hint{animation:bounce .6s 5}
`);

function buildScene(wk, worn) {
  const w = WEATHER[wk];
  const sc = U.el('<div class="x8-scene"></div>');
  sc.innerHTML = Kids.art.get(w.bg);
  const fx = U.el('<div class="x8-fx" aria-hidden="true"></div>');
  const n = wk === 'lluvia' ? 26 : wk === 'nieve' ? 22 : wk === 'viento' ? 7 : 0;
  for (let k = 0; k < n; k++) {
    const i = document.createElement('i');
    i.className = wk === 'lluvia' ? 'r' : wk === 'nieve' ? 's' : 'w';
    if (wk === 'viento') i.style.top = (8 + k * 11) + '%'; else i.style.left = (Math.random() * 100) + '%';
    i.style.animationDelay = (-Math.random() * 3) + 's';
    fx.appendChild(i);
  }
  sc.appendChild(fx);
  const lolo = U.el(`<div class="x8-lolo" role="img" aria-label="Lolo">${Kids.art.get('lion')}</div>`);
  sc.appendChild(lolo);
  const slots = {};
  function put(k) {
    const it = ITEMS[k];
    const mk = (left) => {
      const d = U.el(`<div class="x8-w sl" data-k="${k}">${Kids.art.get(it.art)}</div>`);
      d.style.left = left + '%'; d.style.top = it.pos[1] + '%'; d.style.width = it.pos[2] + '%';
      lolo.appendChild(d); return d;
    };
    const els = it.two ? [mk(it.pos[0]), mk(100 - it.pos[0] - it.pos[2])] : [mk(it.pos[0])];
    if (it.two) els[1].style.transform = 'scaleX(-1)';
    slots[it.slot] = { k, els };
  }
  function take(slot) { if (slots[slot]) { slots[slot].els.forEach(e => e.remove()); delete slots[slot]; } }
  return { sc, lolo, slots, put, take };
}

function chooseWeather(g) {
  const keys = ['sol', 'lluvia', 'nieve'];
  const w = U.pick(keys);
  const set = U.sample(WEATHER[w].good, 3);
  const s = buildScene('fresquito'); s.sc.querySelector('.x8-fx').innerHTML = '';
  /* fondo neutro: crema */
  s.sc.firstChild.remove(); s.sc.style.background = '#FFF0C7';
  set.forEach(k => { s.take(ITEMS[k].slot); s.put(k); });
  const box = U.el('<div class="x8-ch"></div>');
  const btns = keys.map(k => { const b = U.el(`<button class="pic" data-k="${k}" aria-label="${WEATHER[k].lbl}">${Kids.art.get(WEATHER[k].bg)}<span class="lbl">${WEATHER[k].lbl}</span></button>`); box.appendChild(b); return b; });
  g.area.appendChild(s.sc); g.area.appendChild(box);
  g.ask('Lolo se ha vestido así. ¿Qué tiempo hace? Elige el tiempo para esta ropa.');
  g.helpHint = () => { btns.forEach(b => { if (b.dataset.k === w) b.classList.add('x8-hint'); }); g.toast('Mira la ropa: ¿para qué tiempo es?'); };
  btns.forEach(b => b.addEventListener('click', () => {
    if (b.dataset.k === w) { b.classList.add('right'); btns.forEach(x => x.disabled = true); g.right('¡Sí! Esa ropa es para ' + WEATHER[w].n); }
    else { b.classList.add('bad'); g.wrong('Con ese tiempo no llevaríamos esa ropa. ¡Prueba otra!'); }
  }));
}

let seq = [];
Kids.game({
  id: 'mundo-x8', group: 'mundo', num: 11,
  title: 'El tiempo atmosférico',
  blurb: 'Viste a Lolo con la ropa adecuada para el tiempo que hace.',
  how: 'Mira el tiempo que hace y toca las prendas para ponérselas a Lolo. Cuando esté listo, toca el botón de listo.',
  icon: 'sun',
  levels: ['Sol o nieve', 'Sol, lluvia o nieve', 'Más tiempos y preguntas'],
  rounds: 6,
  round(g, i) {
    if (g.level === 3 && i >= 4) return chooseWeather(g);
    const pool = g.level === 1 ? ['sol', 'nieve'] : g.level === 2 ? ['sol', 'lluvia', 'nieve'] : ['sol', 'lluvia', 'nieve', 'viento', 'fresquito'];
    if (i === 0) seq = [];
    if (!seq.length) seq = U.shuffle(pool.slice());
    const wk = seq.pop(), w = WEATHER[wk];
    const total = g.level === 1 ? 4 : g.level === 2 ? 6 : 8;
    const need = g.level === 1 ? 2 : 3;
    const nGood = Math.min(w.good.length, need + (g.level === 3 ? 1 : g.level === 2 ? 1 : 0));
    const bad = ALL.filter(k => w.good.indexOf(k) < 0);
    /* evitar dos prendas buenas incompatibles en el mismo hueco: da igual, se reemplazan */
    let goods = U.sample(w.good, nGood), tries = 0;
    while (new Set(goods.map(k => ITEMS[k].slot)).size < Math.min(need, 3) && tries++ < 20) goods = U.sample(w.good, nGood);
    const list = U.shuffle(goods.concat(U.sample(bad, total - goods.length)));
    const s = buildScene(wk);
    const tray = U.el('<div class="x8-tray"></div>');
    const bar = U.el('<div class="x8-bar"><button class="btn" aria-label="Lolo está listo">¡Listo!</button></div>');
    g.area.appendChild(s.sc); g.area.appendChild(tray); g.area.appendChild(bar);
    g.ask(w.say + '. Viste a Lolo con ' + (need === 2 ? 'dos o más prendas' : 'tres o más prendas') + ' adecuadas.');
    const worn = new Set();
    const btnOf = {};
    list.forEach(k => {
      const b = U.el(`<button class="x8-it" data-k="${k}" aria-label="${cap(ITEMS[k].n)}" aria-pressed="false">${Kids.art.get(ITEMS[k].art)}<span>${cap(ITEMS[k].n)}</span></button>`);
      btnOf[k] = b; tray.appendChild(b);
      b.addEventListener('click', () => {
        Kids.sound.pop(); b.classList.remove('hint', 'bad');
        if (worn.has(k)) { worn.delete(k); s.take(ITEMS[k].slot); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); return; }
        const prev = s.slots[ITEMS[k].slot];
        if (prev) { worn.delete(prev.k); btnOf[prev.k].classList.remove('on'); btnOf[prev.k].setAttribute('aria-pressed', 'false'); s.take(ITEMS[k].slot); }
        worn.add(k); s.put(k); b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
      });
    });
    g.helpHint = () => {
      const bw = Array.from(worn).filter(k => w.good.indexOf(k) < 0)[0];
      const k = bw || list.find(x => w.good.indexOf(x) >= 0 && !worn.has(x));
      if (!k) return;
      btnOf[k].classList.add('hint'); g.t(() => btnOf[k].classList.remove('hint'), 3600);
      g.toast(bw ? 'Quítale ' + ITEMS[bw].n + ': con ' + w.n + ' no hace falta' : 'Prueba con ' + ITEMS[k].n + ': ¡va muy bien con ' + w.n + '!');
    };
    bar.firstChild.addEventListener('click', () => {
      const badWorn = Array.from(worn).filter(k => w.good.indexOf(k) < 0);
      const goodWorn = Array.from(worn).filter(k => w.good.indexOf(k) >= 0);
      if (badWorn.length) {
        const k = badWorn[0]; btnOf[k].classList.add('bad'); g.shake(btnOf[k]);
        g.wrong('Con ' + w.n + ', ' + ITEMS[k].n + ' no es lo mejor. ¡Cámbialo!');
      } else if (goodWorn.length < need) {
        g.toast('¡Casi! A Lolo aún le falta ropa para el ' + w.n); g.say('A Lolo todavía le falta ropa');
      } else {
        Object.keys(btnOf).forEach(k => btnOf[k].disabled = true);
        g.right('¡Lolo va perfecto para ' + (wk === 'fresquito' ? 'el fresquito' : wk === 'viento' ? 'el viento' : w.n === 'sol' ? 'el sol' : w.n === 'lluvia' ? 'la lluvia' : 'la nieve') + '!');
      }
    });
  }
});
})();

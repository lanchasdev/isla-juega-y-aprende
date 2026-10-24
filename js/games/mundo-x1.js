/* mundo-x1 — Los sentidos */
(function () {
'use strict';
const U = Kids.util;
const SKIN = '#F6C9A0', SKIN2 = '#EDB187', HAIR = '#6B3E1E';

/* ---------- dibujos propios ---------- */
const hand = (cx, cy, flip) => {
  let f = '';
  [-52, -22, 8, 38].forEach((a, k) => { f += `<ellipse cx="0" cy="-17" rx="4.6" ry="10" fill="${SKIN}" stroke="${SKIN2}" stroke-width=".8" transform="rotate(${a * 0.6}) translate(${(k - 1.5) * 1.5} 0)"/>`; });
  return `<g transform="translate(${cx} ${cy}) scale(${flip ? -1 : 1} 1)">${f}<circle r="15" fill="${SKIN}"/><ellipse cx="-14" cy="3" rx="5" ry="9" fill="${SKIN}" transform="rotate(30 -14 3)"/></g>`;
};
function faceSvg() {
  return `<svg viewBox="0 0 200 200" role="img" aria-label="Una cara de niño con las manos">
  <ellipse cx="100" cy="195" rx="70" ry="5" fill="#14235B" opacity=".1"/>
  <path d="M50 200 Q54 158 100 154 Q146 158 150 200Z" fill="#4C8DF6"/>
  <rect x="88" y="136" width="24" height="26" rx="10" fill="${SKIN}"/>
  <ellipse cx="43" cy="96" rx="9" ry="13" fill="${SKIN}"/><ellipse cx="157" cy="96" rx="9" ry="13" fill="${SKIN}"/>
  <ellipse cx="44" cy="97" rx="4" ry="7" fill="#F0A982"/><ellipse cx="156" cy="97" rx="4" ry="7" fill="#F0A982"/>
  <circle cx="100" cy="92" r="56" fill="${SKIN}"/>
  <path d="M46 86 Q38 28 100 26 Q162 28 154 86 Q142 58 120 60 Q100 48 80 60 Q58 58 46 86Z" fill="${HAIR}"/>
  <ellipse cx="78" cy="88" rx="9" ry="11" fill="#fff"/><ellipse cx="122" cy="88" rx="9" ry="11" fill="#fff"/>
  <circle cx="79" cy="89" r="6" fill="#14235B"/><circle cx="121" cy="89" r="6" fill="#14235B"/><circle cx="81" cy="86.5" r="2.2" fill="#fff"/><circle cx="123" cy="86.5" r="2.2" fill="#fff"/>
  <path d="M66 74 Q78 68 90 73 M110 73 Q122 68 134 74" fill="none" stroke="${HAIR}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="62" cy="108" r="7" fill="#FF9AA2" opacity=".55"/><circle cx="138" cy="108" r="7" fill="#FF9AA2" opacity=".55"/>
  <ellipse cx="100" cy="106" rx="6" ry="5" fill="#F0A982"/>
  <path d="M80 122 Q100 148 120 122Z" fill="#E8574A" stroke="#C9344E" stroke-width="1.5" stroke-linejoin="round"/><ellipse cx="100" cy="135" rx="9" ry="5.5" fill="#FF8FA3"/>
  ${hand(26, 166, false)}${hand(174, 166, true)}
  <g class="x1-hs">
   <ellipse class="hs" data-p="ojos" cx="78" cy="88" rx="13" ry="14"/><ellipse class="hs" data-p="ojos" cx="122" cy="88" rx="13" ry="14"/>
   <ellipse class="hs" data-p="orejas" cx="43" cy="96" rx="13" ry="18"/><ellipse class="hs" data-p="orejas" cx="157" cy="96" rx="13" ry="18"/>
   <ellipse class="hs" data-p="nariz" cx="100" cy="106" rx="12" ry="11"/>
   <ellipse class="hs" data-p="boca" cx="100" cy="130" rx="22" ry="15"/>
   <circle class="hs" data-p="manos" cx="26" cy="166" r="24"/><circle class="hs" data-p="manos" cx="174" cy="166" r="24"/>
  </g></svg>`;
}
Kids.art.add({
  'wx1-eye': `<svg viewBox="0 0 100 100"><path d="M6 52 Q50 12 94 52 Q50 90 6 52Z" fill="#fff" stroke="#8C9BCB" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="52" r="21" fill="#4C8DF6"/><circle cx="50" cy="52" r="10" fill="#14235B"/><circle cx="56" cy="46" r="4.5" fill="#fff"/><path d="M26 30 L20 20 M50 22 L50 10 M74 30 L80 20" stroke="#8C9BCB" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  'wx1-ear': `<svg viewBox="0 0 100 100"><path d="M52 10 C26 10 20 34 24 52 C28 70 38 72 40 86 C42 98 62 98 66 82 C68 74 72 68 78 58 C88 38 78 10 52 10Z" fill="${SKIN}" stroke="${SKIN2}" stroke-width="3"/><path d="M52 27 C40 27 38 42 42 52 C46 60 52 62 54 72" fill="none" stroke="#E39A74" stroke-width="5" stroke-linecap="round"/></svg>`,
  'wx1-nose': `<svg viewBox="0 0 100 100"><path d="M50 10 Q44 40 34 62 Q22 74 30 84 Q40 92 50 86 Q60 92 70 84 Q78 74 66 62 Q56 40 50 10Z" fill="${SKIN}" stroke="${SKIN2}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="40" cy="80" rx="5" ry="4" fill="#D98E6A"/><ellipse cx="60" cy="80" rx="5" ry="4" fill="#D98E6A"/></svg>`,
  'wx1-tongue': `<svg viewBox="0 0 100 100"><path d="M10 36 Q50 16 90 36 Q88 84 50 88 Q12 84 10 36Z" fill="#E8574A" stroke="#C9344E" stroke-width="3" stroke-linejoin="round"/><path d="M18 34 Q50 22 82 34 Q80 46 50 46 Q20 46 18 34Z" fill="#fff"/><path d="M30 62 Q50 50 70 62 Q72 86 50 88 Q28 86 30 62Z" fill="#FF8FA3"/><path d="M50 58 L50 74" stroke="#E86A86" stroke-width="3" stroke-linecap="round"/></svg>`,
  'wx1-hand': `<svg viewBox="0 0 100 100"><g fill="${SKIN}" stroke="${SKIN2}" stroke-width="2.5"><rect x="24" y="22" width="13" height="42" rx="6.5"/><rect x="38" y="10" width="13" height="50" rx="6.5"/><rect x="52" y="12" width="13" height="48" rx="6.5"/><rect x="66" y="24" width="12" height="40" rx="6"/><rect x="8" y="46" width="13" height="34" rx="6.5" transform="rotate(-28 14 62)"/><path d="M22 56 H78 Q80 90 50 92 Q22 90 22 56Z"/></g></svg>`,
  'wx1-icon': `<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="38" fill="#F6C9A0"/><path d="M14 46 Q10 14 50 12 Q90 14 86 46 Q74 28 60 30 Q50 22 40 30 Q26 28 14 46Z" fill="#6B3E1E"/><ellipse cx="36" cy="52" rx="6" ry="7.5" fill="#fff"/><ellipse cx="64" cy="52" rx="6" ry="7.5" fill="#fff"/><circle cx="37" cy="53" r="4" fill="#14235B"/><circle cx="63" cy="53" r="4" fill="#14235B"/><ellipse cx="50" cy="62" rx="4" ry="3" fill="#F0A982"/><path d="M38 72 Q50 84 62 72Z" fill="#E8574A"/><path d="M8 54 q-6 -8 0 -16 M92 54 q6 -8 0 -16" stroke="#47B5BF" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="84" cy="86" r="10" fill="#FFD23F"/></svg>`
});

const SENSES = {
  vista:  { name: 'la vista',  part: 'los ojos',   hot: 'ojos',   verb: 'vemos',      icon: 'wx1-eye' },
  oido:   { name: 'el oído',   part: 'las orejas', hot: 'orejas', verb: 'oímos',      icon: 'wx1-ear' },
  olfato: { name: 'el olfato', part: 'la nariz',   hot: 'nariz',  verb: 'olemos',     icon: 'wx1-nose' },
  gusto:  { name: 'el gusto',  part: 'la boca',    hot: 'boca',   verb: 'saboreamos', icon: 'wx1-tongue' },
  tacto:  { name: 'el tacto',  part: 'las manos',  hot: 'manos',  verb: 'tocamos',    icon: 'wx1-hand' }
};
const IDS = Object.keys(SENSES);
const BYHOT = {}; IDS.forEach(k => BYHOT[SENSES[k].hot] = k);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* L2: situaciones con un solo sentido claro */
const SITS = [
  ['flower', 'Una flor con un perfume muy rico', 'olfato'], ['drum', 'Suena un tambor: ¡pum, pum!', 'oido'],
  ['rainbow', 'Un arcoíris lleno de colores', 'vista'], ['strawberry', 'Una fresa dulce en la boca', 'gusto'],
  ['teddy', 'Un peluche suave y blandito', 'tacto'], ['bird', 'Un pajarito que canta', 'oido'],
  ['snowman', 'La nieve está fría en las manos', 'tacto'], ['cake', 'Probamos un trozo de tarta', 'gusto'],
  ['sun', 'Miramos el sol y las nubes del cielo', 'vista'], ['orange', 'Una naranja con olor a fruta fresca', 'olfato'],
  ['dog', 'Un perro que ladra: ¡guau, guau!', 'oido'], ['lemon', 'Un limón muy ácido en la lengua', 'gusto']
];
Kids.art.add({ 'wx1-lemon': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="26" ry="4" fill="#14235B" opacity=".12"/><path d="M10 54 Q14 22 50 22 Q86 22 90 54 Q86 84 50 84 Q14 84 10 54Z" fill="#FFE04A"/><path d="M8 54 L16 52 M84 52 L92 54" stroke="#F2C41B" stroke-width="5" stroke-linecap="round"/><ellipse cx="38" cy="40" rx="12" ry="6" fill="#fff" opacity=".45" transform="rotate(-20 38 40)"/><path d="M50 22 Q56 12 66 14 Q62 22 50 22Z" fill="#5CC77A"/></svg>` });
/* L3: qué sentidos se usan con cada cosa (todos válidos) */
const ITEMS = [
  ['apple', 'una manzana', ['vista', 'olfato', 'gusto', 'tacto']], ['flower', 'una flor', ['vista', 'olfato', 'tacto']],
  ['drum', 'un tambor', ['vista', 'oido', 'tacto']], ['teddy', 'un peluche', ['vista', 'tacto']],
  ['bird', 'un pajarito', ['vista', 'oido']], ['cake', 'una tarta', ['vista', 'olfato', 'gusto', 'tacto']],
  ['rainbow', 'un arcoíris', ['vista']], ['snowman', 'un muñeco de nieve', ['vista', 'tacto']],
  ['strawberry', 'una fresa', ['vista', 'olfato', 'gusto', 'tacto']], ['dog', 'un perro', ['vista', 'oido', 'tacto']]
];
const art = n => n === 'lemon' ? 'wx1-lemon' : n;

Kids.css(`
.g-mundo-x1 .x1-stage{flex:1 1 0;min-height:0;width:100%;display:flex;justify-content:center;align-items:stretch}
.g-mundo-x1 .x1-card{width:min(100%,34rem);background:linear-gradient(#DDF1F3,#F4FBFB);border-radius:2rem;box-shadow:var(--shadow);padding:.4rem;display:flex;min-height:0}
.g-mundo-x1 .x1-card svg{width:100%;height:100%;display:block;min-height:0}
.g-mundo-x1 .hs{fill:transparent;cursor:pointer;stroke:none}
.g-mundo-x1 .hs.on{fill:rgba(255,210,63,.45);stroke:#FF9F1C;stroke-width:3}
.g-mundo-x1 .hs.hint{animation:x1b .55s 8 alternate}
@keyframes x1b{from{fill:rgba(255,210,63,0);stroke:rgba(255,159,28,0);stroke-width:2}to{fill:rgba(255,210,63,.6);stroke:#FF9F1C;stroke-width:4}}
.g-mundo-x1 .x1-hint{font-family:'Baloo 2';font-size:1.2rem;color:var(--ink2);text-align:center}
.g-mundo-x1 .x1-scene{display:flex;align-items:center;gap:1rem;background:#fff;border-radius:2rem;box-shadow:0 .4rem 0 var(--line);padding:.6rem 1.4rem .6rem .8rem;max-width:100%}
.g-mundo-x1 .x1-scene .pi{width:clamp(5.5rem,22vmin,10rem);height:clamp(5.5rem,22vmin,10rem);flex:none}
.g-mundo-x1 .x1-scene .pi svg{width:100%;height:100%}
.g-mundo-x1 .x1-scene b{font-family:'Baloo 2';font-size:clamp(1.3rem,3.6vmin,2rem);line-height:1.1}
.g-mundo-x1 .x1-opts{display:flex;flex-wrap:wrap;gap:.9rem;justify-content:center;width:100%}
.g-mundo-x1 .x1-s{width:clamp(6.2rem,17vmin,9rem);min-height:clamp(6.5rem,19vmin,9.5rem);flex-direction:column;font-size:clamp(1rem,2.6vmin,1.4rem);padding:.4rem .5rem;gap:.1rem;line-height:1.05}
.g-mundo-x1 .x1-s .ic{width:clamp(3.2rem,9vmin,5rem);height:clamp(3.2rem,9vmin,5rem)}
.g-mundo-x1 .x1-s .ic svg{width:100%;height:100%}
.g-mundo-x1 .x1-s.pulse{animation:pulse .7s 5}
.g-mundo-x1 .x1-s.right{opacity:1}
`);

let PLAN = [];
Kids.game({
  id: 'mundo-x1', group: 'mundo', num: 4,
  title: 'Los sentidos',
  blurb: 'Descubre con qué parte del cuerpo vemos, oímos, olemos, probamos y tocamos.',
  how: 'Toca la parte del cuerpo que te pedimos, o elige el sentido que usamos en cada situación.',
  icon: 'wx1-icon',
  levels: ['Partes del cuerpo', 'Situaciones', 'Varios sentidos'],
  rounds: 8,
  round(g, i) {
    const L = g.level;
    if (L === 1) {
      if (i === 0) { PLAN = U.shuffle(IDS); while (PLAN.length < 8) { const c = U.pick(IDS); if (c !== PLAN[PLAN.length - 1]) PLAN.push(c); } }
      const sid = PLAN[i], S = SENSES[sid];
      const root = U.el(`<div class="x1-stage"><div class="x1-card">${faceSvg()}</div></div>`);
      g.area.appendChild(root);
      const svg = root.querySelector('svg'), all = p => Array.from(svg.querySelectorAll(`.hs[data-p="${p}"]`));
      let done = false;
      svg.addEventListener('click', e => {
        const h = e.target.closest('.hs'); if (!h || done) return;
        const p = h.dataset.p, k = BYHOT[p];
        if (k === sid) { done = true; Kids.sound.pop(); all(p).forEach(x => x.classList.add('on')); g.say(cap(S.part)); g.right('¡Sí! Con ' + S.part + ' ' + S.verb); }
        else g.wrong(`Eso ${/s$/.test(SENSES[k].part.split(' ')[0]) ? 'son' : 'es'} ${SENSES[k].part}. ¡Sigue buscando!`);
      });
      g.helpHint = () => { if (done) return; all(S.hot).forEach(x => x.classList.add('hint')); g.t(() => all(S.hot).forEach(x => x.classList.remove('hint')), 4600); g.toast('Mira, parpadea la parte que buscas'); };
      g.ask('¿Con qué parte del cuerpo ' + S.verb + '?');
      return;
    }
    if (L === 2) {
      if (i === 0) PLAN = U.sample(SITS, 8);
      const [a, txt, sid] = PLAN[i];
      const opts = U.shuffle([sid].concat(U.sample(IDS.filter(x => x !== sid), 3)));
      const root = U.el(`<div class="x1-scene"><div class="pi">${Kids.art.get(art(a))}</div><b>${txt}</b></div>`);
      const row = U.el('<div class="x1-opts"></div>');
      opts.forEach(k => row.appendChild(U.el(`<button class="ans x1-s" data-k="${k}" aria-label="${cap(SENSES[k].name)}"><span class="ic">${Kids.art.get(SENSES[k].icon)}</span>${cap(SENSES[k].name)}</button>`)));
      g.area.appendChild(root); g.area.appendChild(row);
      let done = false;
      row.querySelectorAll('.x1-s').forEach(b => b.onclick = () => {
        if (done) return; const k = b.dataset.k;
        if (k === sid) { done = true; b.classList.add('right'); g.say(cap(SENSES[k].name)); g.right('¡Sí! Usamos ' + SENSES[k].name); }
        else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, no es ' + SENSES[k].name + '. ¡Piensa otra vez!'); }
      });
      g.helpHint = () => { const b = row.querySelector(`[data-k="${sid}"]`); b && b.classList.add('pulse'); g.toast('Pista: mira el botón que se mueve'); };
      g.ask('¿Qué sentido usamos? ' + txt);
      return;
    }
    // nivel 3
    if (i === 0) PLAN = U.sample(ITEMS, 7);
    if (i === 7) {
      const row = U.el('<div class="x1-opts"></div>');
      g.area.appendChild(U.el(`<div class="x1-scene"><div class="pi">${Kids.art.get('heart')}</div><b>Tú eliges: no hay respuesta mala</b></div>`));
      IDS.forEach(k => row.appendChild(U.el(`<button class="ans x1-s" data-k="${k}" aria-label="${cap(SENSES[k].name)}"><span class="ic">${Kids.art.get(SENSES[k].icon)}</span>${cap(SENSES[k].name)}</button>`)));
      g.area.appendChild(row);
      row.querySelectorAll('.x1-s').forEach(b => b.onclick = () => { const k = b.dataset.k; b.classList.add('right'); g.say(cap(SENSES[k].name)); g.right('¡Qué buena elección! ' + cap(SENSES[k].name)); });
      g.ask('¿Cuál es tu sentido favorito?');
      return;
    }
    const [a, nm, valid] = PLAN[i];
    const found = new Set();
    g.area.appendChild(U.el(`<div class="x1-scene"><div class="pi">${Kids.art.get(art(a))}</div><b>${cap(nm)}</b></div>`));
    g.area.appendChild(U.el(`<div class="x1-hint">Toca todos los sentidos que podemos usar (${valid.length === 1 ? 'hay 1' : 'hay ' + valid.length})</div>`));
    const row = U.el('<div class="x1-opts"></div>');
    U.shuffle(IDS).forEach(k => row.appendChild(U.el(`<button class="ans x1-s" data-k="${k}" aria-label="${cap(SENSES[k].name)}"><span class="ic">${Kids.art.get(SENSES[k].icon)}</span>${cap(SENSES[k].name)}</button>`)));
    g.area.appendChild(row);
    row.querySelectorAll('.x1-s').forEach(b => b.onclick = () => {
      const k = b.dataset.k; if (found.has(k)) return;
      if (valid.includes(k)) {
        found.add(k); b.classList.add('right'); b.disabled = true; Kids.sound.pop(); g.say(cap(SENSES[k].name));
        if (found.size === valid.length) g.right('¡Los has encontrado todos!');
      } else { g.shake(b); b.classList.add('bad'); g.t(() => b.classList.remove('bad'), 700); g.wrong(`Con ${nm} no usamos ${SENSES[k].name}. ¡Sigue!`); }
    });
    g.helpHint = () => { const k = valid.find(v => !found.has(v)); const b = row.querySelector(`[data-k="${k}"]`); b && b.classList.add('pulse'); g.toast('Pista: uno de ellos se mueve'); };
    g.ask('¿Qué sentidos usamos con ' + nm + '? Toca todos.');
  },
  stars(m, r) { return m <= 2 ? 3 : m <= 6 ? 2 : 1; }
});
})();

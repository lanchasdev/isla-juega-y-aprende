/* mundo-x4 — De dónde viene */
(function () {
'use strict';
const U = Kids.util;
const SH = '<ellipse cx="50" cy="94" rx="28" ry="4" fill="#14235B" opacity=".12"/>';
Kids.art.add({
  'wx4-milk': `<svg viewBox="0 0 100 100">${SH}<rect x="40" y="8" width="20" height="12" rx="3" fill="#47B5BF"/><path d="M38 20 H62 Q70 30 70 44 V86 Q70 92 64 92 H36 Q30 92 30 86 V44 Q30 30 38 20Z" fill="#fff" stroke="#BFD6EE" stroke-width="3"/><path d="M31 52 H69 V86 Q69 91 64 91 H36 Q31 91 31 86Z" fill="#E3F1FB"/><circle cx="43" cy="66" r="3" fill="#14235B"/><circle cx="57" cy="66" r="3" fill="#14235B"/><path d="M44 74 Q50 79 56 74" fill="none" stroke="#14235B" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  'wx4-egg': `<svg viewBox="0 0 100 100">${SH}<path d="M50 10 Q80 30 78 62 Q76 90 50 90 Q24 90 22 62 Q20 30 50 10Z" fill="#F3E2C2" stroke="#E0C99B" stroke-width="3"/><ellipse cx="40" cy="40" rx="6" ry="10" fill="#fff" opacity=".6" transform="rotate(20 40 40)"/></svg>`,
  'wx4-wool': `<svg viewBox="0 0 100 100">${SH}<circle cx="50" cy="50" r="36" fill="#FF8FB1"/><g fill="none" stroke="#FF5D8F" stroke-width="3.5" stroke-linecap="round"><path d="M20 40 Q50 60 80 36"/><path d="M16 56 Q50 76 84 52"/><path d="M30 20 Q60 40 74 22"/><path d="M26 74 Q54 88 76 74"/></g><path d="M78 70 Q94 80 90 94" fill="none" stroke="#FF8FB1" stroke-width="4" stroke-linecap="round"/></svg>`,
  'wx4-honey': `<svg viewBox="0 0 100 100">${SH}<rect x="30" y="14" width="40" height="10" rx="4" fill="#8A5A33"/><path d="M26 26 H74 Q80 34 80 50 V84 Q80 92 72 92 H28 Q20 92 20 84 V50 Q20 34 26 26Z" fill="#FFB020"/><path d="M26 26 H74 Q76 28 77 32 H23 Q24 28 26 26Z" fill="#FFD36B"/><rect x="30" y="50" width="40" height="24" rx="6" fill="#FFF8EA"/><path d="M50 55 l5 4 v7 l-5 4 l-5 -4 v-7z" fill="#FFC21A"/><ellipse cx="32" cy="44" rx="3" ry="9" fill="#fff" opacity=".4"/></svg>`,
  'wx4-bread': `<svg viewBox="0 0 100 100">${SH}<path d="M10 62 Q6 30 38 26 H62 Q94 30 90 62 Q90 82 70 84 H30 Q10 82 10 62Z" fill="#E9A957"/><path d="M14 60 Q12 34 38 31 H62 Q88 34 86 60Z" fill="#F2BE75"/><path d="M32 38 q7 9 0 20 M50 36 q7 10 0 22 M68 38 q7 9 0 20" fill="none" stroke="#C97F2E" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  'wx4-wheat': `<svg viewBox="0 0 100 100">${SH}<path d="M50 94 V30" stroke="#C9A24A" stroke-width="3.5" stroke-linecap="round"/><g fill="#F2C94C" stroke="#D8A92F" stroke-width="1.2">${[[0, 26], [1, 38], [2, 50]].map(r => `<ellipse cx="42" cy="${r[1]}" rx="5" ry="9" transform="rotate(-28 42 ${r[1]})"/><ellipse cx="58" cy="${r[1]}" rx="5" ry="9" transform="rotate(28 58 ${r[1]})"/>`).join('')}<ellipse cx="50" cy="14" rx="5" ry="10"/></g><path d="M50 74 Q36 70 30 56 M50 80 Q64 76 70 62" fill="none" stroke="#C9A24A" stroke-width="3" stroke-linecap="round"/></svg>`,
  'wx4-flour': `<svg viewBox="0 0 100 100">${SH}<path d="M24 22 Q50 12 76 22 L82 86 Q50 96 18 86Z" fill="#F3E6C8" stroke="#DCC79A" stroke-width="3" stroke-linejoin="round"/><path d="M24 22 Q50 34 76 22" fill="none" stroke="#DCC79A" stroke-width="3"/><text x="50" y="66" font-size="17" font-weight="800" text-anchor="middle" fill="#B8863B" font-family="Baloo 2,sans-serif">harina</text><path d="M44 36 q6 -10 12 0" stroke="#F2C94C" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  'wx4-juice': `<svg viewBox="0 0 100 100">${SH}<path d="M62 4 L56 40" stroke="#47B5BF" stroke-width="5" stroke-linecap="round"/><path d="M24 26 H76 L68 88 Q50 94 32 88Z" fill="#E9F5FA" stroke="#BFD6EE" stroke-width="3" stroke-linejoin="round"/><path d="M27 40 H73 L67 86 Q50 91 33 86Z" fill="#FF9F1C"/><circle cx="76" cy="30" r="12" fill="#FFB347"/><circle cx="76" cy="30" r="8" fill="#FFD28A"/><path d="M76 22 V38 M68 30 H84" stroke="#FFB347" stroke-width="2"/></svg>`,
  'wx4-cheese': `<svg viewBox="0 0 100 100">${SH}<path d="M8 62 L82 26 Q94 28 94 42 V72 H8Z" fill="#FFD23F"/><path d="M8 62 L82 26 Q94 28 94 42 L20 64Z" fill="#FFE680"/><circle cx="34" cy="72" r="6" fill="#F2B93B"/><circle cx="62" cy="62" r="7" fill="#F2B93B"/><circle cx="80" cy="56" r="4" fill="#F2B93B"/></svg>`,
  'wx4-paper': `<svg viewBox="0 0 100 100">${SH}<rect x="24" y="12" width="52" height="72" rx="5" fill="#fff" stroke="#D5DDEC" stroke-width="3" transform="rotate(-8 50 50)"/><rect x="26" y="10" width="52" height="72" rx="5" fill="#fff" stroke="#D5DDEC" stroke-width="3" transform="rotate(5 50 50)"/><path d="M36 28 H66 M36 40 H66 M36 52 H66 M36 64 H54" stroke="#9CC5EE" stroke-width="3.5" stroke-linecap="round" transform="rotate(5 50 50)"/></svg>`,
  'wx4-log': `<svg viewBox="0 0 100 100">${SH}<rect x="14" y="34" width="62" height="46" rx="6" fill="#A9763F"/><path d="M24 44 H66 M22 56 H70 M24 68 H64" stroke="#8A5A33" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="74" cy="57" rx="16" ry="23" fill="#E5BE86" stroke="#A9763F" stroke-width="3"/><ellipse cx="74" cy="57" rx="10" ry="15" fill="none" stroke="#C99560" stroke-width="2.5"/><ellipse cx="74" cy="57" rx="4" ry="6" fill="none" stroke="#C99560" stroke-width="2.5"/></svg>`,
  'wx4-sweater': `<svg viewBox="0 0 100 100">${SH}<path d="M34 16 Q50 26 66 16 L86 30 L92 70 L80 74 L74 48 V86 H26 V48 L20 74 L8 70 L14 30Z" fill="#FF8FB1" stroke="#F0709A" stroke-width="2.5" stroke-linejoin="round"/><path d="M34 16 Q50 26 66 16 Q60 34 50 34 Q40 34 34 16Z" fill="#FFD0DE"/><path d="M26 80 H74 M30 62 H70 M30 70 H70" stroke="#F0709A" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  'wx4-icon': `<svg viewBox="0 0 100 100"><circle cx="30" cy="34" r="22" fill="#FFF3BF"/><circle cx="72" cy="66" r="24" fill="#CFE6FB"/><path d="M42 40 H58" stroke="#8C7BE0" stroke-width="5" stroke-linecap="round"/><path d="M54 34 l8 6 -8 6" fill="none" stroke="#8C7BE0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 26 Q30 22 38 28 V46 Q30 52 22 46Z" fill="#fff" stroke="#E0C99B" stroke-width="2.5"/><path d="M66 66 H80 M66 56 q6 -6 12 0" stroke="#FF9F1C" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="73" cy="73" r="8" fill="#FF9F1C"/></svg>`
});

/* elementos: id → [etiqueta, dibujo] */
const IT = {
  leche: ['la leche', 'wx4-milk'], huevo: ['el huevo', 'wx4-egg'], lana: ['la lana', 'wx4-wool'], miel: ['la miel', 'wx4-honey'],
  pan: ['el pan', 'wx4-bread'], zumo: ['el zumo', 'wx4-juice'], papel: ['el papel', 'wx4-paper'], queso: ['el queso', 'wx4-cheese'], jersey: ['el jersey', 'wx4-sweater'],
  harina: ['la harina', 'wx4-flour'], madera: ['la madera', 'wx4-log'],
  vaca: ['la vaca', 'cow'], gallina: ['la gallina', 'hen'], oveja: ['la oveja', 'sheep'], abeja: ['la abeja', 'bee'],
  trigo: ['el trigo', 'wx4-wheat'], naranja: ['la naranja', 'orange'], arbol: ['el árbol', 'tree']
};
const nm = k => IT[k][0].replace(/^(el|la) /, '').replace(/^./, c => c.toUpperCase());
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const PAIRS1 = [['leche', 'vaca'], ['huevo', 'gallina'], ['lana', 'oveja'], ['miel', 'abeja']];
const PAIRS2 = PAIRS1.concat([['pan', 'trigo'], ['zumo', 'naranja'], ['papel', 'arbol']]);
const CHAINS = [['pan', 'harina', 'trigo'], ['queso', 'leche', 'vaca'], ['jersey', 'lana', 'oveja'], ['papel', 'madera', 'arbol']];
const pic = k => Kids.art.get(IT[k][1]);

Kids.css(`
.g-mundo-x4 .x4-board{display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:.7rem 1.2rem;width:100%;max-width:56rem}
.g-mundo-x4 .x4-pair{display:flex;align-items:center;justify-content:center;gap:.4rem;background:#fff;border-radius:1.6rem;box-shadow:0 .3rem 0 var(--line);padding:.35rem .6rem}
.g-mundo-x4 .x4-p{display:flex;flex-direction:column;align-items:center;width:clamp(4.6rem,13vmin,7rem);font-family:'Baloo 2';font-size:clamp(.85rem,2.2vmin,1.2rem);line-height:1}
.g-mundo-x4 .x4-p svg{width:100%;aspect-ratio:1;display:block}
.g-mundo-x4 .x4-from{color:var(--g);font-family:'Baloo 2';font-size:clamp(.8rem,2vmin,1.1rem);display:flex;flex-direction:column;align-items:center;line-height:1;width:3.2rem;text-align:center}
.g-mundo-x4 .x4-from svg{width:1.6rem;height:1.6rem}
.g-mundo-x4 .x4-slot{width:clamp(4.6rem,13vmin,7rem);aspect-ratio:1;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:1.2rem;font-size:2rem;color:var(--ink2);padding:.15rem;font-family:'Baloo 2';line-height:1}
.g-mundo-x4 .x4-slot svg{width:100%;height:auto;max-height:78%}
.g-mundo-x4 .x4-slot small{font-size:clamp(.8rem,2vmin,1.1rem)}
.g-mundo-x4 .x4-slot.filled{animation:pop .4s}
.g-mundo-x4 .x4-slot.pulse{animation:pulse .7s 5}
.g-mundo-x4 .x4-tray{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;width:100%}
.g-mundo-x4 .x4-card{width:clamp(4.6rem,13vmin,7rem);background:#fff;border-radius:1.3rem;border:.18rem solid var(--line);box-shadow:0 .35rem 0 var(--line);padding:.25rem;display:flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-size:clamp(.85rem,2.2vmin,1.2rem);line-height:1;touch-action:none}
.g-mundo-x4 .x4-card svg{width:100%;aspect-ratio:1;display:block}
.g-mundo-x4 .x4-card.sel{border-color:#FF9F1C;background:#FFF3BF;transform:translateY(-.25rem)}
.g-mundo-x4 .x4-card.dragging{z-index:60;position:relative;box-shadow:0 .8rem 1rem rgba(20,35,91,.2)}
.g-mundo-x4 .x4-card.pulse{animation:pulse .7s 5}
.g-mundo-x4 .x4-chain{display:flex;align-items:center;justify-content:center;gap:clamp(.2rem,1.5vmin,.8rem);flex-wrap:nowrap}
.g-mundo-x4 .x4-chain .x4-slot,.g-mundo-x4 .x4-chain .x4-p{width:clamp(4.6rem,17vmin,9rem)}
.g-mundo-x4 .x4-chain .x4-p{background:#fff;border-radius:1.3rem;box-shadow:0 .3rem 0 var(--line);padding:.3rem}
.g-mundo-x4 .x4-ar{color:var(--g);width:clamp(1.2rem,4vmin,2.2rem);flex:none}
.g-mundo-x4 .x4-ar svg{width:100%;display:block}
.g-mundo-x4 .x4-note{font-family:'Baloo 2';font-size:clamp(1rem,2.4vmin,1.4rem);color:var(--ink2);text-align:center}
@media (max-width:760px){.g-mundo-x4 .x4-board{grid-template-columns:1fr 1fr;gap:.5rem}.g-mundo-x4 .x4-pair{padding:.2rem .3rem;gap:.1rem}.g-mundo-x4 .x4-from{width:1rem;font-size:0}.g-mundo-x4 .x4-from svg{width:1rem;height:1rem}.g-mundo-x4 .x4-p,.g-mundo-x4 .x4-slot{width:17vw}.g-mundo-x4 .x4-card{width:17vw}.g-mundo-x4 .x4-board{max-width:100%}}
`);
const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 5l7 7-7 7"/></svg>';
const LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H5M11 5l-7 7 7 7"/></svg>';

/* arrastrar o tocar: card (data-k) → slot */
function wire(g, tray, slots, attempt) {
  let sel = null;
  const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
  tray.querySelectorAll('.x4-card').forEach(c => Kids.drag(c, {
    targets: () => slots.filter(s => !s.classList.contains('filled')),
    onDrop: (t, e) => { clear(); return attempt(e, t); },
    onTap: e => { Kids.sound.tap(); g.say(IT[e.dataset.k][0]); const was = sel === e; clear(); if (!was) { sel = e; e.classList.add('sel'); } }
  }));
  slots.forEach(s => s.addEventListener('click', () => { if (s.classList.contains('filled')) return; if (!sel) { g.toast('Primero toca una tarjeta'); return; } const c = sel; clear(); attempt(c, s); }));
}
const card = k => U.el(`<button class="x4-card" data-k="${k}" aria-label="${IT[k][0]}">${pic(k)}<span>${nm(k)}</span></button>`);

Kids.game({
  id: 'mundo-x4', group: 'mundo', num: 7,
  title: 'De dónde viene',
  blurb: 'Descubre de dónde viene la leche, el pan, la miel y muchas cosas más.',
  how: 'Arrastra o toca cada tarjeta y llévala junto a lo que da: la vaca da la leche, la abeja da la miel.',
  icon: 'wx4-icon',
  levels: ['Animales y sus cosas', 'Animales y plantas', 'Cadenas de dos pasos'],
  rounds: 4,
  round(g, i) {
    const L = g.level;
    if (L < 3) {
      const pool = L === 1 ? PAIRS1 : PAIRS2, pairs = U.sample(pool, L === 1 ? 3 : 5);
      const board = U.el('<div class="x4-board"></div>'), slots = [];
      pairs.forEach(p => {
        const row = U.el(`<div class="x4-pair"><div class="x4-p">${pic(p[0])}<span>${nm(p[0])}</span></div><div class="x4-from">${LEFT}viene de</div><button class="slot x4-slot" data-want="${p[1]}" data-prod="${p[0]}" aria-label="Hueco de dónde viene ${IT[p[0]][0]}">?</button></div>`);
        board.appendChild(row); slots.push(row.querySelector('.x4-slot'));
      });
      let origins = pairs.map(p => p[1]);
      if (L === 2) origins = origins.concat(U.sample(pool.filter(p => !pairs.includes(p)), 1).map(p => p[1]));
      const tray = U.el('<div class="x4-tray"></div>'); U.shuffle(origins).forEach(k => tray.appendChild(card(k)));
      g.area.append(board, tray);
      let n = 0;
      const attempt = (c, s) => {
        const k = c.dataset.k;
        if (k !== s.dataset.want) { g.shake(c); g.wrong(`${cap(IT[k][0])} no nos da ${IT[s.dataset.prod][0]}. ¡Prueba otra!`); return false; }
        s.classList.add('filled'); s.innerHTML = pic(k) + ''; c.remove(); Kids.sound.pop(); g.say(`${cap(IT[s.dataset.prod][0])} viene de ${IT[k][0]}`); n++;
        if (n === pairs.length) g.right('¡Todo bien unido!');
        return true;
      };
      wire(g, tray, slots, attempt);
      g.helpHint = () => {
        const s = slots.find(x => !x.classList.contains('filled')); if (!s) return;
        s.classList.add('pulse'); const c = tray.querySelector(`.x4-card[data-k="${s.dataset.want}"]`); c && c.classList.add('pulse');
        g.toast('Pista: ' + IT[s.dataset.prod][0] + ' viene de lo que se mueve');
      };
      g.ask('¿De dónde viene cada cosa? Une cada una con lo que la da');
      return;
    }
    // nivel 3: cadenas ordenadas
    if (i === 0) CH = U.shuffle(CHAINS);
    const ch = CH[i % CH.length], [prod, mid, org] = ch;
    const others = U.shuffle(CHAINS.filter(c => c !== ch).flatMap(c => [c[1], c[2]]).filter(x => x !== mid && x !== org));
    const opts = U.shuffle([mid, org].concat(others.slice(0, 2)));
    const chain = U.el(`<div class="x4-chain"><button class="slot x4-slot" data-want="${org}" aria-label="Primer hueco: el origen">?</button><span class="x4-ar">${ARR}</span><button class="slot x4-slot" data-want="${mid}" aria-label="Segundo hueco">?</button><span class="x4-ar">${ARR}</span><div class="x4-p">${pic(prod)}<span>${nm(prod)}</span></div></div>`);
    const slots = Array.from(chain.querySelectorAll('.x4-slot'));
    const tray = U.el('<div class="x4-tray"></div>'); opts.forEach(k => tray.appendChild(card(k)));
    g.area.append(U.el(`<div class="x4-note">¿Cómo llega ${IT[prod][0]} hasta nosotros? Primero el origen, después el paso del medio</div>`), chain, tray);
    let n = 0;
    const attempt = (c, s) => {
      const k = c.dataset.k;
      if (k !== s.dataset.want) {
        g.shake(c);
        if (k === mid || k === org) g.wrong(`${cap(IT[k][0])} sí es de esta cadena, pero va en el otro hueco.`);
        else g.wrong(`${cap(IT[k][0])} no tiene que ver con ${IT[prod][0]}. ¡Prueba otra!`);
        return false;
      }
      s.classList.add('filled'); s.innerHTML = pic(k); c.remove(); Kids.sound.pop(); g.say(IT[k][0]); n++;
      if (n === 2) g.right(`¡${cap(IT[org][0])}, ${IT[mid][0]} y ${IT[prod][0]}!`);
      return true;
    };
    wire(g, tray, slots, attempt);
    g.helpHint = () => {
      const s = slots.find(x => !x.classList.contains('filled')); if (!s) return;
      s.classList.add('pulse'); const c = tray.querySelector(`.x4-card[data-k="${s.dataset.want}"]`); c && c.classList.add('pulse');
      g.toast('Pista: la tarjeta que se mueve va en el hueco que se mueve');
    };
    g.ask('¿Cómo se hace ' + IT[prod][0] + '? Ordena los dos pasos');
  },
  stars(m) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; }
});
let CH = [];
})();

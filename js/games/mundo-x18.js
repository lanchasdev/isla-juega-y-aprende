/* mundo-x18 — Banderas y países */
(function () {
'use strict';
const U = Kids.util;
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const shadow = '<ellipse cx="50" cy="91" rx="32" ry="5" fill="#14235B" opacity=".10"/>';

/* banderas 3:2 dibujadas en un lienzo de 92x62 centrado en el cuadrado de 100 */
function flag(id, inner) {
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="wx18-fc-${id}"><rect x="4" y="19" width="92" height="62" rx="7"/></clipPath></defs>
  <ellipse cx="50" cy="86" rx="38" ry="4" fill="#14235B" opacity=".10"/>
  <g clip-path="url(#wx18-fc-${id})"><g transform="translate(4 19)">${inner}</g></g>
  <rect x="4" y="19" width="92" height="62" rx="7" fill="none" stroke="#14235B" stroke-opacity=".18" stroke-width="1.6"/></svg>`;
}
function pentagram(cx, cy, r) {
  const p = [0, 1, 2, 3, 4].map(k => { const a = (-90 + 72 * k) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  return [0, 2, 4, 1, 3].map((k, j) => (j ? 'L' : 'M') + p[k][0].toFixed(1) + ' ' + p[k][1].toFixed(1)).join('') + 'Z';
}
const food = (inner) => V(shadow + inner);

Kids.art.add({
  'wx18-flag-es': flag('es', `<rect width="92" height="62" fill="#C60B1E"/><rect y="15.5" width="92" height="31" fill="#FFC400"/>
    <rect x="23" y="22" width="8" height="3" fill="#B58A00"/><path d="M22 25h10v7q0 6-5 8q-5-2-5-8z" fill="#C60B1E" stroke="#B58A00" stroke-width="1.4"/><path d="M22 29h10" stroke="#fff" stroke-width="1.4"/>`),
  'wx18-flag-pt': flag('pt', `<rect width="92" height="62" fill="#FF0000"/><rect width="36.8" height="62" fill="#006600"/>
    <circle cx="36.8" cy="31" r="10" fill="#FFE000" stroke="#FF0000" stroke-width="1.4"/><path d="M32 25.5h9.6v7q0 5-4.8 6.4q-4.8-1.4-4.8-6.4z" fill="#fff" stroke="#FF0000" stroke-width="1.8"/><circle cx="36.8" cy="31" r="2.2" fill="#1F4AA8"/>`),
  'wx18-flag-fr': flag('fr', `<rect width="92" height="62" fill="#fff"/><rect width="30.7" height="62" fill="#0055A4"/><rect x="61.3" width="30.7" height="62" fill="#EF4135"/>`),
  'wx18-flag-ad': flag('ad', `<rect width="92" height="62" fill="#FEDD00"/><rect width="30.7" height="62" fill="#10069F"/><rect x="61.3" width="30.7" height="62" fill="#D50032"/>
    <path d="M38 21h16v13q0 8-8 11q-8-3-8-11z" fill="#fff" stroke="#B58A00" stroke-width="1.6"/><rect x="40.2" y="23.4" width="5.2" height="10" fill="#FEDD00"/><rect x="46.6" y="23.4" width="5.2" height="10" fill="#D50032"/><path d="M40.2 35q5.8 1 11.6 0q-1 6-5.8 8q-4.8-2-5.8-8z" fill="#FEDD00"/>`),
  'wx18-flag-ma': flag('ma', `<rect width="92" height="62" fill="#C1272D"/><path d="${pentagram(46, 32, 16)}" fill="none" stroke="#006233" stroke-width="2.8" stroke-linejoin="miter"/>`),
  'wx18-flag-it': flag('it', `<rect width="92" height="62" fill="#fff"/><rect width="30.7" height="62" fill="#009246"/><rect x="61.3" width="30.7" height="62" fill="#CE2B37"/>`),

  'wx18-paella': food(`<ellipse cx="50" cy="56" rx="40" ry="30" fill="#4A4A55"/><path d="M8 56h-6M92 56h6" stroke="#4A4A55" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="50" cy="54" rx="34" ry="24" fill="#FFD04A"/><ellipse cx="42" cy="46" rx="14" ry="6" fill="#FFE27A" opacity=".7"/>
    <g fill="#E8452C"><path d="M26 50q8-4 14 2q-6 4-14-2z"/><path d="M58 60q8-4 14 2q-6 4-14-2z"/><path d="M44 66q8-4 14 0q-6 4-14 0z"/></g>
    <g fill="#5CC77A"><circle cx="36" cy="60" r="2.4"/><circle cx="62" cy="48" r="2.4"/><circle cx="70" cy="56" r="2.4"/><circle cx="50" cy="44" r="2.4"/></g>
    <g fill="#FF9F5A"><path d="M48 52q8-6 14 0q-2 8-10 6q-4-2-4-6z"/><path d="M26 58q6-5 12 0q-2 6-8 5q-4-1-4-5z"/></g><g fill="#3B3B55"><ellipse cx="58" cy="64" rx="5" ry="3.2"/><ellipse cx="36" cy="48" rx="5" ry="3.2"/></g>
    <path d="M70 40l8 4-4 8-8-4z" fill="#FFE04A" stroke="#E3B900" stroke-width="1.4" stroke-linejoin="round"/>`),
  'wx18-tortilla': food(`<ellipse cx="50" cy="60" rx="42" ry="26" fill="#C9954A"/><ellipse cx="50" cy="55" rx="40" ry="26" fill="#F2C14E"/><ellipse cx="50" cy="55" rx="34" ry="21" fill="#F8D872"/>
    <path d="M50 55L84 40Q92 52 78 66Z" fill="#FFF0B3"/><path d="M50 55L84 40M50 55L78 66" stroke="#E0A93A" stroke-width="2.2" stroke-linecap="round"/>
    <g fill="#E8B84A"><ellipse cx="66" cy="52" rx="5" ry="3.4"/><ellipse cx="72" cy="58" rx="4" ry="3"/><ellipse cx="76" cy="48" rx="3.6" ry="2.6"/></g>
    <g fill="#F4B63A"><ellipse cx="30" cy="50" rx="6" ry="3.4"/><ellipse cx="42" cy="64" rx="6" ry="3.2"/><ellipse cx="38" cy="44" rx="4" ry="2.4"/></g>`),
  'wx18-jamon': food(`<path d="M10 62 Q14 28 50 28 Q86 30 82 58 Q80 80 52 82 Q20 84 10 62Z" fill="#C9524A"/><path d="M14 56 Q18 34 48 34 Q70 34 78 48" fill="none" stroke="#F7D9CF" stroke-width="5" stroke-linecap="round"/>
    <path d="M18 70 Q40 80 74 74" fill="none" stroke="#9E3A36" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    <ellipse cx="46" cy="52" rx="14" ry="9" fill="#E27A6F" opacity=".8"/><path d="M80 52 L94 44" stroke="#EFE3CC" stroke-width="7" stroke-linecap="round"/><circle cx="95" cy="43" r="5.4" fill="#EFE3CC"/><circle cx="96" cy="39" r="4.4" fill="#EFE3CC"/>
    <path d="M78 46q6 -1 8 3l-3 8q-5 1 -8 -3z" fill="#fff" opacity=".9"/><ellipse cx="38" cy="44" rx="8" ry="3" fill="#fff" opacity=".35" transform="rotate(-10 38 44)"/>`),
  'wx18-nata': food(`<path d="M16 50 L22 80 Q50 90 78 80 L84 50Z" fill="#E3A24E"/><path d="M20 66 Q50 74 80 66" fill="none" stroke="#C97F2E" stroke-width="2" opacity=".6"/>
    <path d="M12 50 Q16 40 28 42 Q38 36 50 40 Q62 36 72 42 Q84 40 88 50 Q80 56 50 58 Q20 56 12 50Z" fill="#F2B866"/>
    <ellipse cx="50" cy="48" rx="32" ry="10" fill="#FFE9A0"/><g fill="#C9742B" opacity=".85"><ellipse cx="38" cy="46" rx="5" ry="2.4"/><ellipse cx="58" cy="50" rx="6" ry="2.6"/><ellipse cx="68" cy="45" rx="3.6" ry="2"/><ellipse cx="48" cy="50" rx="3" ry="1.6"/></g>
    <ellipse cx="38" cy="44" rx="10" ry="3" fill="#fff" opacity=".4"/>`),
  'wx18-croissant': food(`<g fill="#E59A45"><ellipse cx="14" cy="66" rx="11" ry="7" transform="rotate(-55 14 66)"/><ellipse cx="86" cy="66" rx="11" ry="7" transform="rotate(55 86 66)"/></g>
    <g fill="#EBA650" stroke="#C9772E" stroke-width="1.6"><ellipse cx="26" cy="52" rx="13" ry="10" transform="rotate(-38 26 52)"/><ellipse cx="74" cy="52" rx="13" ry="10" transform="rotate(38 74 52)"/><ellipse cx="50" cy="42" rx="17" ry="14"/></g>
    <g fill="#F3BC6B"><ellipse cx="44" cy="36" rx="9" ry="4.4" opacity=".8"/><ellipse cx="22" cy="46" rx="5" ry="3" transform="rotate(-38 22 46)" opacity=".8"/><ellipse cx="70" cy="46" rx="5" ry="3" transform="rotate(38 70 46)" opacity=".6"/></g>`),
  'wx18-baguette': food(`<g transform="rotate(-24 50 50)"><rect x="4" y="38" width="92" height="24" rx="12" fill="#D9A24E"/><rect x="6" y="39" width="88" height="10" rx="5" fill="#EBC278" opacity=".8"/>
    <g fill="none" stroke="#B9772D" stroke-width="3" stroke-linecap="round"><path d="M20 42l8 12M36 42l8 12M52 42l8 12M68 42l8 12"/></g></g>`),
  'wx18-pizza': food(`<path d="M50 90 L8 30 Q50 6 92 30Z" fill="#F5CE5A" stroke="#E0A93A" stroke-width="2" stroke-linejoin="round"/><path d="M8 30 Q50 6 92 30" fill="none" stroke="#D9923A" stroke-width="9" stroke-linecap="round"/>
    <g fill="#E8452C"><circle cx="34" cy="42" r="6.4"/><circle cx="62" cy="40" r="6.4"/><circle cx="48" cy="60" r="6"/></g><g fill="#B83223" opacity=".5"><circle cx="32" cy="41" r="1.6"/><circle cx="36" cy="44" r="1.4"/><circle cx="60" cy="39" r="1.6"/><circle cx="64" cy="42" r="1.4"/></g>
    <g fill="#5CC77A"><path d="M48 44q4-4 6 0q-3 3-6 0z"/><path d="M50 74q4-4 6 0q-3 3-6 0z"/><path d="M42 26q4-4 6 0q-3 3-6 0z"/></g>`),
  'wx18-tajin': food(`<ellipse cx="50" cy="78" rx="42" ry="10" fill="#D9753A"/><path d="M14 74 Q50 86 86 74 Q84 66 50 66 Q16 66 14 74Z" fill="#E88A4A"/>
    <path d="M24 68 Q28 44 46 30 L46 22 Q50 16 54 22 L54 30 Q72 44 76 68 Q50 76 24 68Z" fill="#C7632C"/><circle cx="50" cy="17" r="5" fill="#E8A14A"/>
    <path d="M32 62 Q50 68 68 62" fill="none" stroke="#F4C27A" stroke-width="3" stroke-linecap="round"/><path d="M38 48 Q50 54 62 48" fill="none" stroke="#F4C27A" stroke-width="3" stroke-linecap="round"/><path d="M44 36 Q50 40 56 36" fill="none" stroke="#F4C27A" stroke-width="3" stroke-linecap="round"/>
    <g fill="#fff" opacity=".4"><path d="M34 54 Q36 46 42 40" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>`),
  'wx18-cuscus': food(`<path d="M10 52 Q12 86 50 88 Q88 86 90 52Z" fill="#4C8DF6"/><path d="M10 52 Q50 62 90 52" fill="none" stroke="#2F6FD6" stroke-width="3"/><path d="M14 66 Q50 78 86 66" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>
    <path d="M12 54 Q16 24 50 22 Q84 24 88 54 Q50 64 12 54Z" fill="#F4D58A"/>
    <g fill="#E0B25A"><circle cx="30" cy="40" r="1.8"/><circle cx="44" cy="30" r="1.8"/><circle cx="58" cy="36" r="1.8"/><circle cx="70" cy="44" r="1.8"/><circle cx="40" cy="48" r="1.8"/><circle cx="54" cy="48" r="1.8"/><circle cx="24" cy="48" r="1.8"/><circle cx="76" cy="36" r="1.8"/></g>
    <g><circle cx="38" cy="36" r="6" fill="#F0842E"/><circle cx="62" cy="30" r="5" fill="#5CC77A"/><circle cx="64" cy="46" r="5.4" fill="#F0842E"/><circle cx="48" cy="42" r="4" fill="#E8452C"/></g>`)
});

const C = {
  espana:   { n: 'España', d: 'España', flag: 'wx18-flag-es', foods: ['paella', 'tortilla', 'jamon'], fill: '#F7C25B' },
  portugal: { n: 'Portugal', d: 'Portugal', flag: 'wx18-flag-pt', foods: ['nata'], fill: '#7BC67E' },
  francia:  { n: 'Francia', d: 'Francia', flag: 'wx18-flag-fr', foods: ['croissant', 'baguette'], fill: '#86B6F2' },
  andorra:  { n: 'Andorra', d: 'Andorra', flag: 'wx18-flag-ad', foods: [], fill: '#B79CFF' },
  marruecos:{ n: 'Marruecos', d: 'Marruecos', flag: 'wx18-flag-ma', foods: ['tajin', 'cuscus'], fill: '#F29A7C' },
  italia:   { n: 'Italia', d: 'Italia', flag: 'wx18-flag-it', foods: ['pizza'], fill: '#F4A9C6' }
};
const F = {
  paella: { n: 'La paella', art: 'wx18-paella', c: 'espana' }, tortilla: { n: 'La tortilla de patatas', art: 'wx18-tortilla', c: 'espana' },
  jamon: { n: 'El jamón', art: 'wx18-jamon', c: 'espana' }, nata: { n: 'El pastel de nata', art: 'wx18-nata', c: 'portugal' },
  croissant: { n: 'El cruasán', art: 'wx18-croissant', c: 'francia' }, baguette: { n: 'La baguette', art: 'wx18-baguette', c: 'francia' },
  pizza: { n: 'La pizza', art: 'wx18-pizza', c: 'italia' }, tajin: { n: 'El tajín', art: 'wx18-tajin', c: 'marruecos' }, cuscus: { n: 'El cuscús', art: 'wx18-cuscus', c: 'marruecos' }
};
const fl = c => Kids.art.get(C[c].flag);
const fd = f => Kids.art.get(F[f].art);
const short = f => F[f].n.replace(/^(El|La) /, '');

/* mapa esquemático */
const POLY = {
  portugal: 'M38 122L52 118L60 128L66 148L62 170L66 190L66 208L50 200L44 182L38 160L40 140Z',
  espana: 'M34 112L150 106L190 110L205 125L190 150L178 170L160 190L140 208L110 214L84 214L66 208L66 190L62 170L66 148L60 128L52 118L38 122Z',
  francia: 'M150 106L205 125L222 112L236 90L232 60L214 40L190 22L150 28L100 34L96 60L116 84L140 100Z',
  marruecos: 'M58 236L84 226L100 226L140 224L172 236L176 260L30 260L40 246Z',
  italia: 'M242 100L262 76L290 70L308 84L300 100L284 112L288 130L306 150L316 168L300 176L286 160L270 140L262 118L250 112Z'
};
const LAB = { portugal: [53, 168, -90, 9], espana: [118, 160, 0, 15], francia: [158, 66, 0, 15], marruecos: [102, 248, 0, 14], italia: [282, 96, 0, 12], andorra: [172, 96, 0, 9] };
const mapSvg = () => `<svg viewBox="0 0 320 260" role="group" aria-label="Mapa de España y sus vecinos">
  <rect width="320" height="260" rx="22" fill="#CDEBFA"/>
  <g fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"><path d="M10 30q8-5 16 0t16 0"/><path d="M260 210q8-5 16 0t16 0"/><path d="M12 150q8-5 16 0"/><path d="M200 190q8-5 16 0t16 0"/></g>
  ${Object.keys(POLY).map(k => `<path class="x18-z" data-c="${k}" role="button" tabindex="0" aria-label="${C[k].n}" d="${POLY[k]}" fill="${C[k].fill}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`).join('')}
  <g class="x18-z" data-c="andorra" role="button" tabindex="0" aria-label="Andorra"><circle cx="172" cy="112" r="17" fill="#fff" opacity="0"/><circle cx="172" cy="112" r="5.4" fill="${C.andorra.fill}" stroke="#fff" stroke-width="2"/></g>
  <g class="x18-lb" style="display:none" font-family="Baloo 2,sans-serif" font-weight="800" fill="#14235B" text-anchor="middle">${Object.keys(LAB).map(k => `<text x="${LAB[k][0]}" y="${LAB[k][1]}" font-size="${LAB[k][3]}" transform="rotate(${LAB[k][2]} ${LAB[k][0]} ${LAB[k][1]})">${C[k].n}</text>`).join('')}</g>
</svg>`;

Kids.css(`
.g-mundo-x18{gap:.8rem}
.g-mundo-x18 .x18-ref .pic{width:clamp(7rem,24vmin,12rem)}
.g-mundo-x18 .x18-opts .pic{width:clamp(6rem,23vmin,12rem);cursor:pointer}
.g-mundo-x18 .x18-opts .pic svg{max-width:100%;aspect-ratio:1;height:auto}
.g-mundo-x18 .x18-opts .pic .lbl{font-size:clamp(.85rem,2.4vmin,1.15rem);text-align:center;line-height:1.05}
.g-mundo-x18 .x18-opts .ans{font-size:clamp(1.4rem,4.4vmin,2.2rem);min-width:8rem}
.g-mundo-x18 .x18-flagref{display:flex;align-items:center;gap:.6rem}
.g-mundo-x18 .x18-flagref .fl{width:clamp(5rem,16vmin,8rem)}
.g-mundo-x18 .x18-map{display:flex;justify-content:center;width:100%;flex:0 1 auto;min-height:0}
.g-mundo-x18 .x18-map svg{width:min(100%,38rem,calc(54vh * 1.2308));height:auto;aspect-ratio:320/260;display:block;border-radius:1.6rem;box-shadow:0 .4rem 0 rgba(20,35,91,.14)}
.g-mundo-x18 .x18-z{cursor:pointer;transition:filter .15s}
.g-mundo-x18 .x18-z:hover{filter:brightness(1.08)}
.g-mundo-x18 .x18-z.right{fill:#5CC77A!important}
.g-mundo-x18 .x18-z.bad{animation:shake .4s}
.g-mundo-x18 .x18-z.hint{animation:pulse .7s 6;fill:#FFD23F!important}
.g-mundo-x18 .x18-z:focus{outline:none;stroke:var(--yellow)}
`);

function choose(g, o) {
  g.ask(o.ask);
  if (o.ref) g.area.appendChild(U.el(`<div class="x18-ref"><div class="pic big" role="img" aria-label="${U.esc(o.refLabel || '')}">${o.ref}</div></div>`));
  const box = U.el('<div class="opts x18-opts"></div>');
  let right = null;
  U.shuffle(o.opts).forEach(op => {
    const b = op.text ? U.el(`<button class="ans" aria-label="${U.esc(op.text)}">${U.esc(op.text)}</button>`)
      : U.el(`<button class="pic" aria-label="${U.esc(op.label)}">${op.html}${op.show ? '<span class="lbl">' + U.esc(op.label) + '</span>' : ''}</button>`);
    if (op.k === o.correct) right = b;
    b.onclick = () => {
      if (b.disabled) return;
      if (op.k === o.correct) { b.classList.add('right'); box.querySelectorAll('button').forEach(x => x.disabled = true); g.right(o.praise); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, casi. ¡Prueba otra vez!'); }
    };
    box.appendChild(b);
  });
  g.area.appendChild(box);
  g.helpHint = () => { right.style.animation = 'bounce .6s 5'; g.toast(o.help || 'Mira bien con calma'); };
}
const flagOpt = c => ({ k: c, html: fl(c), label: C[c].n });
const foodOpt = f => ({ k: f, html: fd(f), label: F[f].n, show: true });
const ALL = Object.keys(C);
let seq = [], lastC = null;
function pickC(list) { let c; do { c = U.pick(list); } while (c === lastC && list.length > 1); lastC = c; return c; }

Kids.game({
  id: 'mundo-x18', group: 'mundo', num: 21,
  title: 'Banderas y países',
  blurb: 'Conoce España y sus vecinos: sus banderas, su mapa y su comida.',
  how: 'Mira las banderas y la comida, y toca la respuesta. En el nivel difícil, toca los países en el mapa.',
  icon: 'house',
  levels: ['Bandera y comida de España', 'Cuatro países', 'El mapa'],
  rounds: 6,
  round(g, i) {
    if (i === 0) { seq = []; lastC = null; }
    if (g.level === 1) return lv1(g, i);
    if (g.level === 2) return lv2(g, i);
    return lv3(g, i);
  }
});

function lv1(g, i) {
  if (!seq.length) seq = U.shuffle(['flag', 'food', 'flag', 'food', 'flag', 'food']);
  if (seq.pop() === 'flag') {
    const others = U.sample(ALL.filter(c => c !== 'espana'), 2);
    return choose(g, { ask: '¿Cuál es la bandera de España?', opts: ['espana'].concat(others).map(flagOpt), correct: 'espana', help: 'La de España es roja y amarilla.' });
  }
  const mine = U.pick(C.espana.foods);
  const foreign = U.sample([].concat(...ALL.filter(c => c !== 'espana').map(c => C[c].foods)), 2);
  choose(g, { ask: '¿Cuál es una comida típica de España?', ref: fl('espana'), refLabel: 'Bandera de España', opts: [mine].concat(foreign).map(foodOpt), correct: mine, help: 'Mira, esta se come mucho en España.' });
}

function lv2(g, i) {
  const four = ['espana', 'portugal', 'francia', 'marruecos'];
  if (!seq.length) seq = U.shuffle(['f2n', 'n2f', 'food2c', 'c2food', 'food2c', 'f2n']);
  const t = seq.pop(); const c = pickC(four);
  if (t === 'f2n') return choose(g, { ask: '¿De qué país es esta bandera?', ref: fl(c), refLabel: 'Una bandera', opts: four.map(x => ({ k: x, text: C[x].n })), correct: c, help: 'Piensa en los colores de la bandera.' });
  if (t === 'n2f') return choose(g, { ask: '¿Cuál es la bandera de ' + C[c].d + '?', opts: four.map(flagOpt), correct: c, help: 'Fíjate en los colores y las formas.' });
  if (t === 'food2c') {
    const f = U.pick(C[c].foods);
    return choose(g, { ask: '¿De qué país es ' + F[f].n.toLowerCase() + '?', ref: fd(f), refLabel: F[f].n, opts: four.map(flagOpt), correct: c, help: 'Busca la bandera de ' + C[c].d + '.' });
  }
  const mine = U.pick(C[c].foods);
  const foreign = U.sample([].concat(...four.filter(x => x !== c).map(x => C[x].foods)), 3);
  choose(g, { ask: '¿Cuál es una comida típica de ' + C[c].d + '?', ref: fl(c), refLabel: 'Bandera de ' + C[c].d, opts: [mine].concat(foreign).map(foodOpt), correct: mine, help: 'Esa comida es de ' + C[c].d + '.' });
}

const TASKS = [
  { t: 'name', c: 'portugal' }, { t: 'name', c: 'francia' }, { t: 'name', c: 'marruecos' }, { t: 'name', c: 'italia' }, { t: 'name', c: 'espana' },
  { t: 'flag', c: 'portugal' }, { t: 'flag', c: 'marruecos' }, { t: 'flag', c: 'italia' }, { t: 'flag', c: 'francia' }, { t: 'flag', c: 'andorra' },
  { t: 'dir', c: 'portugal', q: '¿Qué país está al oeste de España?' }, { t: 'dir', c: 'francia', q: '¿Qué país está al norte de España?' },
  { t: 'dir', c: 'marruecos', q: '¿Qué país está al sur de España, al otro lado del mar?' }, { t: 'dir', c: 'italia', q: '¿Qué país está al este de Francia?' },
  { t: 'dir', c: 'andorra', q: '¿Qué país pequeñito está entre España y Francia?' }
];
function lv3(g, i) {
  if (!seq.length) {
    const dirs = U.shuffle(TASKS.filter(x => x.t === 'dir')), rest = U.shuffle(TASKS.filter(x => x.t !== 'dir'));
    seq = U.shuffle(dirs.slice(0, 2).concat(rest.slice(0, 4)));
    // evitar repetir país
    const seen = {}; seq = seq.filter(x => !seen[x.c] && (seen[x.c] = 1)); while (seq.length < 6) { const x = U.pick(TASKS); if (!seen[x.c]) { seen[x.c] = 1; seq.push(x); } }
  }
  const task = seq.pop(); const c = task.c;
  const q = task.t === 'name' ? 'Toca ' + (c === 'espana' ? 'España' : C[c].d) + ' en el mapa.' : task.t === 'flag' ? 'Toca en el mapa el país de esta bandera.' : task.q;
  g.ask(q);
  if (task.t === 'flag') g.area.appendChild(U.el(`<div class="x18-flagref"><div class="fl" role="img" aria-label="Una bandera">${fl(c)}</div></div>`));
  const wrap = U.el(`<div class="x18-map">${mapSvg()}</div>`); g.area.appendChild(wrap);
  const zs = Array.from(wrap.querySelectorAll('.x18-z'));
  let done = false;
  const showLabels = () => { wrap.querySelector('.x18-lb').style.display = ''; };
  zs.forEach(z => {
    const act = () => {
      if (done) return;
      const k = z.dataset.c; Kids.sound.tap();
      if (k === c) { done = true; z.classList.add('right'); showLabels(); g.right(); }
      else { z.classList.remove('bad'); void z.getBoundingClientRect(); z.classList.add('bad'); g.wrong('Ese es ' + C[k].d + '. ¡Busca otro!'); }
    };
    z.addEventListener('click', act);
    z.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
  g.helpHint = () => { showLabels(); const z = zs.find(x => x.dataset.c === c); z.classList.add('hint'); g.toast('Mira: está iluminado.'); };
}
})();

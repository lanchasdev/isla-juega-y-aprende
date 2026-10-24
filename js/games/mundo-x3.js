/* mundo-x3 — El ciclo de la planta */
(function () {
'use strict';
const U = Kids.util;

/* ---------- dibujos propios de las etapas ---------- */
const SOIL = '<path d="M0 68 H100 V88 Q100 100 88 100 H12 Q0 100 0 88Z" fill="#B98558"/><path d="M0 68 H100 V74 H0Z" fill="#9A6A42"/><path d="M0 68 Q10 61 20 68 T40 68 T60 68 T80 68 T100 68 V71 H0Z" fill="#7FCB8A"/><circle cx="16" cy="86" r="3" fill="#9A6A42"/><circle cx="84" cy="90" r="3.5" fill="#9A6A42"/><circle cx="26" cy="94" r="2.2" fill="#A97A4E"/>';
const scene = inner => `<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="#DFF3FF"/><circle cx="84" cy="17" r="9" fill="#FFD23F"/><path d="M12 24 q6 -8 14 -2 q6 -6 12 2z" fill="#fff" opacity=".9"/>${SOIL}${inner}</svg>`;
const leaf = (x, y, r, s) => `<ellipse cx="${x}" cy="${y}" rx="${9 * (s || 1)}" ry="${4.5 * (s || 1)}" fill="#5CC77A" transform="rotate(${r} ${x} ${y})"/>`;
const seed = () => scene('<path d="M50 74 Q63 83 50 96 Q37 83 50 74Z" fill="#7A4A26"/><ellipse cx="45" cy="83" rx="2.5" ry="5" fill="#A4693A" transform="rotate(-10 45 83)"/>');
const roots = '<path d="M50 72 Q46 82 38 92 M50 74 Q55 84 62 90 M50 76 V95" fill="none" stroke="#F6E8D0" stroke-width="2.4" stroke-linecap="round"/>';
const sprout = () => scene(`${roots}<path d="M50 71 V52" stroke="#3FA55B" stroke-width="4.5" stroke-linecap="round"/>${leaf(41, 50, -30)}${leaf(59, 50, 30)}`);
const petals = (c, cx, cy, r) => { let s = ''; for (let k = 0; k < 6; k++) { const a = k * 60 * Math.PI / 180; s += `<circle cx="${(cx + Math.sin(a) * r).toFixed(1)}" cy="${(cy - Math.cos(a) * r).toFixed(1)}" r="${(r * .75).toFixed(1)}" fill="${c}"/>`; } return s; };
const flower = c => scene(`<path d="M50 71 V32" stroke="#3FA55B" stroke-width="4.5" stroke-linecap="round"/>${leaf(39, 58, -35, 1.2)}${leaf(61, 52, 35, 1.2)}${petals(c, 50, 27, 10)}<circle cx="50" cy="27" r="7" fill="#FFD23F"/>`);
const fruitPlant = c => scene(`<path d="M50 71 V34" stroke="#3FA55B" stroke-width="4.5" stroke-linecap="round"/><g fill="#5CC77A"><circle cx="38" cy="46" r="11"/><circle cx="62" cy="46" r="11"/><circle cx="50" cy="34" r="12"/></g><g fill="#3FA55B" opacity=".5"><circle cx="44" cy="52" r="8"/><circle cx="58" cy="40" r="6"/></g>${[[36, 52], [63, 50], [50, 40]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="7.5" fill="${c}"/><ellipse cx="${p[0] - 2.5}" cy="${p[1] - 2.5}" rx="2.2" ry="1.6" fill="#fff" opacity=".55"/>`).join('')}`);
const tinyTree = () => scene('<path d="M50 70 V44" stroke="#8A5A33" stroke-width="5.5" stroke-linecap="round"/><g fill="#5CC77A"><circle cx="50" cy="36" r="14"/><circle cx="40" cy="44" r="9"/><circle cx="60" cy="44" r="9"/></g>');
const bigTreeBody = '<rect x="43" y="40" width="14" height="30" rx="4" fill="#8A5A33"/><path d="M50 56 L40 46 M50 60 L60 48" stroke="#8A5A33" stroke-width="4" stroke-linecap="round"/><g fill="#5CC77A"><circle cx="50" cy="24" r="19"/><circle cx="31" cy="36" r="14"/><circle cx="69" cy="36" r="14"/><circle cx="50" cy="40" r="13"/></g><g fill="#3FA55B" opacity=".45"><circle cx="40" cy="42" r="8"/><circle cx="62" cy="30" r="7"/></g>';
const bigTree = () => scene(bigTreeBody);
const fruitTree = c => scene(bigTreeBody + [[38, 26], [58, 20], [68, 38], [28, 38], [50, 40], [46, 14]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="5.6" fill="${c}"/><ellipse cx="${p[0] - 1.8}" cy="${p[1] - 1.8}" rx="1.6" ry="1.2" fill="#fff" opacity=".6"/>`).join(''));
Kids.art.add({
  'wx3-seed': seed(), 'wx3-sprout': sprout(), 'wx3-treeS': tinyTree(), 'wx3-treeB': bigTree(),
  'wx3-flower': flower, 'wx3-fruitP': fruitPlant, 'wx3-fruitT': fruitTree,
  'wx3-soil': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="90" rx="38" ry="5" fill="#14235B" opacity=".12"/><path d="M8 84 Q14 40 50 38 Q86 40 92 84 Q50 94 8 84Z" fill="#A9763F"/><path d="M20 70 Q30 52 50 50" stroke="#C99560" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/><circle cx="68" cy="66" r="4" fill="#8A5A33"/><circle cx="36" cy="78" r="3.5" fill="#8A5A33"/><circle cx="58" cy="76" r="3" fill="#8A5A33"/></svg>`,
  'wx3-icon': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="94" rx="34" ry="4" fill="#14235B" opacity=".12"/><path d="M10 78 H90 V88 Q90 96 80 96 H20 Q10 96 10 88Z" fill="#B98558"/><path d="M50 78 V44" stroke="#3FA55B" stroke-width="5" stroke-linecap="round"/><ellipse cx="38" cy="58" rx="12" ry="6" fill="#5CC77A" transform="rotate(-30 38 58)"/><ellipse cx="62" cy="52" rx="12" ry="6" fill="#5CC77A" transform="rotate(30 62 52)"/>${petals('#FF7EA8', 50, 30, 11)}<circle cx="50" cy="30" r="8" fill="#FFD23F"/><path d="M14 40 A38 38 0 0 1 40 8" fill="none" stroke="#47B5BF" stroke-width="5" stroke-linecap="round"/><path d="M40 8 l-9 0 l6 8z" fill="#47B5BF"/></svg>`
});
const FLOWERS = [['la flor rosa', '#FF7EA8'], ['la flor roja', '#E8574A'], ['la flor amarilla', '#FFC21A'], ['la flor azul', '#6FA8F7'], ['la flor lila', '#A98BEA']];
const FRUITS = [['la tomatera', '#FF5A4D'], ['la planta de fresas', '#E8335A'], ['la planta de pimientos', '#FFB020']];
const TREES = [['el manzano', '#FF5A4D'], ['el naranjo', '#FF9F1C'], ['el cerezo', '#C9244E']];
const de = n => n.replace(/^el /, 'del ').replace(/^la /, 'de la ');
const ST1 = [['Semilla', () => Kids.art.get('wx3-seed')], ['Brote', () => Kids.art.get('wx3-sprout')]];

Kids.css(`
.g-mundo-x3 .x3-wrap{display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%;max-width:60rem}
.g-mundo-x3 .x3-row{display:flex;align-items:center;justify-content:center;gap:.3rem;width:100%}
.g-mundo-x3 .x3-slot{flex:1 1 0;max-width:11rem;aspect-ratio:1;position:relative;padding:.2rem;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:1.4rem;font-size:1rem}
.g-mundo-x3 .x3-slot .n{position:absolute;top:-.8rem;left:50%;transform:translateX(-50%);width:1.9rem;height:1.9rem;border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2';font-size:1.2rem;display:flex;align-items:center;justify-content:center;z-index:2}
.g-mundo-x3 .x3-slot svg{width:100%;height:100%;border-radius:1rem;display:block}
.g-mundo-x3 .x3-slot.filled{padding:.15rem;animation:pop .4s}
.g-mundo-x3 .x3-slot.pulse{animation:pulse .7s 5}
.g-mundo-x3 .x3-arrow{flex:none;width:clamp(1rem,3.2vmin,1.8rem);color:var(--g)}
.g-mundo-x3 .x3-arrow svg{width:100%;height:auto;display:block}
.g-mundo-x3 .x3-lbl{font-family:'Baloo 2';font-size:clamp(.85rem,2.2vmin,1.2rem);line-height:1;color:var(--ink);text-align:center;margin-top:.15rem}
.g-mundo-x3 .x3-card{flex:1 1 0;max-width:10rem;min-width:4.6rem;background:#fff;border-radius:1.3rem;border:.18rem solid var(--line);box-shadow:0 .35rem 0 var(--line);padding:.25rem;display:flex;flex-direction:column;align-items:center;touch-action:none;transition:transform .12s}
.g-mundo-x3 .x3-card svg{width:100%;aspect-ratio:1;display:block;border-radius:1rem}
.g-mundo-x3 .x3-card.sel{border-color:#FF9F1C;background:#FFF3BF;transform:translateY(-.25rem)}
.g-mundo-x3 .x3-card.dragging{z-index:60;position:relative;box-shadow:0 .8rem 1rem rgba(20,35,91,.2)}
.g-mundo-x3 .x3-card.pulse{animation:pulse .7s 5}
.g-mundo-x3 .x3-circle{position:absolute;right:.6rem;top:.2rem;width:clamp(2.6rem,7vmin,4rem);opacity:.85}
.g-mundo-x3 .x3-circle svg{width:100%;height:auto;display:block}
.g-mundo-x3 .x3-title{font-family:'Baloo 2';font-size:clamp(1.1rem,2.8vmin,1.6rem);color:var(--ink2);text-align:center;display:flex;align-items:center;gap:.6rem}
.g-mundo-x3 .x3-title svg{width:2.4rem;height:2.4rem;color:var(--g);animation:x3spin 8s linear infinite}
@keyframes x3spin{to{transform:rotate(360deg)}}
.g-mundo-x3 .x3-needs{display:flex;flex-wrap:wrap;gap:.9rem;justify-content:center;max-width:46rem}
.g-mundo-x3 .x3-n{width:clamp(6.2rem,19vmin,9rem);min-height:clamp(6.6rem,20vmin,9.6rem);flex-direction:column;font-size:clamp(1rem,2.6vmin,1.5rem);padding:.4rem;gap:.1rem;line-height:1}
.g-mundo-x3 .x3-n svg{width:clamp(3.4rem,10vmin,5.6rem);height:clamp(3.4rem,10vmin,5.6rem)}
.g-mundo-x3 .x3-n.pulse{animation:pulse .7s 5}
@media (max-width:760px){.g-mundo-x3 .x3-arrow{display:none}.g-mundo-x3 .x3-row{gap:.35rem}.g-mundo-x3 .x3-slot{min-width:0}}
`);
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5l8 7-8 7"/></svg>';
const CYCLE = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M38 20 A15 15 0 0 0 10 16"/><path d="M10 7 V16 H19"/><path d="M10 28 A15 15 0 0 0 38 32"/><path d="M38 41 V32 H29"/></svg>';

const NEEDS_OK = [['sun', 'Sol'], ['raindrop', 'Agua'], ['wx3-soil', 'Tierra']];
const NEEDS_NO = [['cake', 'Pastel'], ['ball', 'Pelota'], ['car', 'Coche'], ['teddy', 'Peluche'], ['drum', 'Tambor']];

Kids.game({
  id: 'mundo-x3', group: 'mundo', num: 6,
  title: 'El ciclo de la planta',
  blurb: 'Ordena cómo crece una planta: de la semilla hasta el fruto.',
  how: 'Arrastra o toca las tarjetas y colócalas en orden: primero la semilla, al final la planta grande.',
  icon: 'wx3-icon',
  levels: ['3 etapas', '4 etapas', 'Árbol y necesidades'],
  rounds: 5,
  round(g, i) {
    const L = g.level;
    if (L === 3 && i === 2) { needs(g); return; }
    let stages, plant;
    if (L === 1) { plant = U.pick(FLOWERS); stages = [['Semilla', Kids.art.get('wx3-seed')], ['Brote', Kids.art.get('wx3-sprout')], ['Flor', Kids.art.get('wx3-flower', plant[1])]]; }
    else if (L === 2) { plant = U.pick(FRUITS); stages = [['Semilla', Kids.art.get('wx3-seed')], ['Brote', Kids.art.get('wx3-sprout')], ['Flor', Kids.art.get('wx3-flower', U.pick(['#fff', '#FFE04A']))], ['Fruto', Kids.art.get('wx3-fruitP', plant[1])]]; }
    else { plant = U.pick(TREES); stages = [['Semilla', Kids.art.get('wx3-seed')], ['Brote', Kids.art.get('wx3-sprout')], ['Arbolito', Kids.art.get('wx3-treeS')], ['Árbol', Kids.art.get('wx3-treeB')], ['Con frutos', Kids.art.get('wx3-fruitT', plant[1])]]; }
    const n = stages.length, labels = L < 3;
    const wrap = U.el('<div class="x3-wrap"></div>');
    wrap.appendChild(U.el(`<div class="x3-title">${CYCLE}<span>Así crece ${plant[0]}</span></div>`));
    const row = U.el('<div class="x3-row"></div>'), slots = [];
    for (let k = 0; k < n; k++) {
      if (k) row.appendChild(U.el(`<span class="x3-arrow" aria-hidden="true">${ARROW}</span>`));
      const s = U.el(`<button class="slot x3-slot" data-k="${k}" aria-label="Hueco número ${k + 1}"><span class="n">${k + 1}</span></button>`);
      row.appendChild(s); slots.push(s);
    }
    const tray = U.el('<div class="x3-row" style="gap:.7rem"></div>');
    U.shuffle(stages.map((s, k) => k)).forEach(k => tray.appendChild(U.el(`<button class="x3-card" data-k="${k}" aria-label="${labels ? stages[k][0] : 'Tarjeta de planta'}">${stages[k][1]}${labels ? `<span class="x3-lbl">${stages[k][0]}</span>` : ''}</button>`)));
    wrap.append(row, tray); g.area.appendChild(wrap);
    let placed = 0, sel = null;
    const clear = () => { if (sel) sel.classList.remove('sel'); sel = null; };
    const attempt = (card, slot) => {
      if (slot.classList.contains('filled')) { g.toast('Ese hueco ya está lleno'); return false; }
      const ck = +card.dataset.k, sk = +slot.dataset.k;
      if (ck !== sk) {
        g.shake(card);
        g.wrong(sk === 0 ? 'Al principio va la semilla pequeñita. ¡Prueba otra!' : ck < sk ? 'Esa etapa va antes. ¡Casi!' : 'Esa etapa va después. ¡Casi!');
        return false;
      }
      slot.classList.add('filled'); slot.innerHTML = `<span class="n">${sk + 1}</span>${stages[ck][1]}`;
      slot.insertAdjacentHTML('beforeend', ''); card.remove(); Kids.sound.pop(); g.say(stages[ck][0]); placed++;
      if (placed === n) g.right('¡La planta ha crecido!');
      return true;
    };
    tray.querySelectorAll('.x3-card').forEach(c => Kids.drag(c, {
      targets: () => slots, onDrop: (t, e) => { clear(); return attempt(e, t); },
      onTap: e => { Kids.sound.tap(); const was = sel === e; clear(); if (!was) { sel = e; e.classList.add('sel'); } }
    }));
    slots.forEach(s => s.addEventListener('click', () => { if (!sel) { g.toast('Primero toca una tarjeta'); return; } const c = sel; clear(); attempt(c, s); }));
    g.helpHint = () => {
      const s = slots.find(x => !x.classList.contains('filled')); if (!s) return;
      const c = tray.querySelector(`.x3-card[data-k="${s.dataset.k}"]`); c && c.classList.add('pulse'); s.classList.add('pulse');
      g.toast('Pista: la tarjeta que se mueve va en el hueco ' + (+s.dataset.k + 1));
    };
    g.ask(L === 1 ? 'Ordena: ¿cómo crece una flor? Primero va la semilla' : L === 2 ? 'Ordena las 4 etapas ' + de(plant[0]) : 'Ordena las 5 etapas ' + de(plant[0]));
  },
  stars(m) { return m <= 3 ? 3 : m <= 8 ? 2 : 1; }
});

function needs(g) {
  const opts = U.shuffle(NEEDS_OK.concat(U.sample(NEEDS_NO, 2)));
  const wrap = U.el('<div class="x3-wrap"></div>');
  wrap.appendChild(U.el(`<div class="x3-title">${CYCLE}<span>Elige 3 cosas. Toca todas las que necesita</span></div>`));
  const row = U.el('<div class="x3-needs"></div>');
  opts.forEach(o => row.appendChild(U.el(`<button class="ans x3-n" data-a="${o[0]}" aria-label="${o[1]}">${Kids.art.get(o[0])}${o[1]}</button>`)));
  wrap.appendChild(row); g.area.appendChild(wrap);
  let found = 0;
  row.querySelectorAll('.x3-n').forEach(b => b.onclick = () => {
    const a = b.dataset.a, ok = NEEDS_OK.some(o => o[0] === a), nm = b.textContent.trim().toLowerCase();
    if (ok) { b.classList.add('right'); b.disabled = true; Kids.sound.pop(); g.say(b.textContent); if (++found === 3) g.right('¡Sol, agua y tierra!'); }
    else { b.classList.add('bad'); b.disabled = true; g.wrong('Una planta no necesita ' + (a === 'cake' ? 'pastel' : a === 'ball' ? 'pelota' : a === 'car' ? 'coche' : a === 'teddy' ? 'peluche' : 'tambor') + '. ¡Sigue!'); }
  });
  g.helpHint = () => { const b = Array.from(row.querySelectorAll('.x3-n')).find(x => NEEDS_OK.some(o => o[0] === x.dataset.a) && !x.disabled); b && b.classList.add('pulse'); g.toast('Pista: una planta bebe y toma luz'); };
  g.ask('¿Qué necesita una planta para crecer? Elige 3');
}
})();
